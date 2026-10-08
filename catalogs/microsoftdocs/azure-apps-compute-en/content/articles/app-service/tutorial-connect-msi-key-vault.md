---
title: 'Tutorial: Secure Foundry Tools Connection from .NET App Service Using Key Vault'
description: Learn how to secure connectivity to back-end Azure services that don't support managed identity natively from a .NET web app.
ms.devlang: csharp
# ms.devlang: csharp, azurecli
ms.topic: tutorial
ms.date: 04/06/2026
author: cephalin
ms.author: cephalin

ms.reviewer: jordanselig 
ms.custom: devx-track-azurecli, devx-track-dotnet, AppServiceConnectivity
ms.service: azure-app-service
---

# Tutorial: Secure Foundry Tools connection from .NET App Service using Key Vault



[Azure App Service](overview.md) can use [managed identities](overview-managed-identity.md) to connect to back-end services without a connection string. This approach eliminates connection secrets to manage and keeps your back-end connectivity secure in a production environment. When you're finished, you have an app that makes programmatic calls to Foundry Tools without storing any connection secrets in App Service.

For back-end services that don't support managed identities and still require connection secrets, you can use Azure Key Vault to manage connection secrets. This tutorial uses Foundry Tools as an example. When you're finished, you have an app that makes programmatic calls to Foundry Tools without storing any connection secrets inside App Service.

- [Sample application](https://github.com/Azure-Samples/app-service-language-detector)

> **Tip:**
> Foundry Tools [supports authentication through managed identities](https://learn.microsoft.com/azure/ai-services/authentication#authorize-access-to-managed-identities). This tutorial uses [subscription key authentication](https://learn.microsoft.com/azure/ai-services/authentication#authenticate-with-a-single-service-resource-key) to demonstrate how you could connect to an Azure service that doesn't support managed identities from App Service.

Diagram that shows the user connecting to a service, which in turn, connects to a key vault to access Cognitive Services.

In this architecture: 

- Managed identities secure connectivity to the key vault.
- App Service accesses the secrets by using [Key Vault references](app-service-key-vault-references.md) as app settings.
- Access to the key vault is restricted to the app. App contributors, such as administrators, might have complete control of the App Service resources and at the same time have no access to the Key Vault secrets.
- If your application code already accesses connection secrets with app settings, no change is required.

In this tutorial, you learn:

> 
> - Enable managed identities
> - Use managed identities to connect to Key Vault
> - Use Key Vault references
> - Access Foundry Tools

## Prerequisites

Prepare your environment for the Azure CLI.

[Include unavailable in this source snapshot: ~/reusable-content/azure-cli/azure-cli-prepare-your-environment-no-header.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/app-service/tutorial-connect-msi-key-vault.md)

<a name='create-app-with-connectivity-to-cognitive-services'></a>

## Create an app with connectivity to Foundry Tools

1. Create a resource group to contain all of your resources:

    ```azurecli-interactive
    # Save the resource group name as a variable for convenience
    groupName=myKVResourceGroup
    region=canadacentral

    az group create --name $groupName --location $region
    ```

1. Create a Foundry Tools resource. Replace *\<cs-resource-name>* with a unique name.

    ```azurecli-interactive
    # Save the resource name as a variable for convenience. 
    csResourceName=<cs-resource-name>

    az cognitiveservices account create --resource-group $groupName --name $csResourceName --location $region --kind TextAnalytics --sku F0 --custom-domain $csResourceName
    ```

    > **Note:**
    > `--sku F0` creates a free-tier Foundry Tools resource. Each subscription is limited to a quota of one free-tier `TextAnalytics` resource. If you've already used your quota, use `--sku S` instead.


## Configure a .NET app

Clone the sample repository locally and deploy the sample application to App Service. Replace *\<app-name>* with a unique name.

```azurecli-interactive
# Save the app name as a variable for convenience
appName=<app-name>

# Clone the sample application
git clone https://github.com/Azure-Samples/app-service-language-detector.git
cd app-service-language-detector/dotnet

az webapp up --sku F1 --resource-group $groupName --name $appName --plan $appName --location $region
```

## Configure secrets as app settings


1. Configure the Foundry Tools secrets as app settings `CS_ACCOUNT_NAME` and `CS_ACCOUNT_KEY`.

    ```azurecli-interactive
    # Get the subscription key for the Foundry Tools resource
    csKey1=$(az cognitiveservices account keys list --resource-group $groupName --name $csResourceName --query key1 --output tsv)

    az webapp config appsettings set --resource-group $groupName --name $appName --settings CS_ACCOUNT_NAME="$csResourceName" CS_ACCOUNT_KEY="$csKey1"
    ````

1. In a browser, go to your deployed app at `<app-name>.azurewebsites.net`. Try the language detector by entering strings in various languages.

   Screenshot that shows the deployed language detector app in App Service.

   If you look at the application code, the debug output for the detection results might be in the same font color as the background. You can see the output by highlighting the white space directly below the result.

## Secure back-end connectivity

Connection secrets are now stored as app settings in your App Service app. This approach already secures connection secrets from your application codebase. However, any contributor who can manage your app can also see the app settings. In this section, you move the connection secrets to a key vault. You lock down access so that only you can manage it and only the App Service app can read it by using its managed identity.

1. Create a key vault. Replace *\<vault-name>* with a unique name.

    ```azurecli-interactive
    # Save the key vault name as a variable for convenience
    vaultName=<vault-name>

    az keyvault create --resource-group $groupName --name $vaultName --location $region --sku standard --enable-rbac-authorization
    ```

    The `--enable-rbac-authorization` parameter [sets Azure role-based access control (RBAC) as the permission model](https://learn.microsoft.com/azure/key-vault/general/rbac-guide#using-azure-rbac-secret-key-and-certificate-permissions-with-key-vault). This setting invalidates all access policies permissions by default.

1. Give yourself the *Key Vault Secrets Officer* RBAC role for the vault.
    
    ```azurecli-interactive
    vaultResourceId=$(az keyvault show --name $vaultName --query id --output tsv)
    myId=$(az ad signed-in-user show --query id --output tsv)
    az role assignment create --role "Key Vault Secrets Officer" --assignee-object-id $myId --assignee-principal-type User --scope $vaultResourceId
    ```

1. Enable the system-assigned managed identity for your app, and give it the *Key Vault Secrets User* RBAC role for the vault.

    ```azurecli-interactive
    az webapp identity assign --resource-group $groupName --name $appName --scope $vaultResourceId --role  "Key Vault Secrets User"
    ```

1. Add the Foundry Tools resource name and subscription key as secrets to the vault, and save their IDs as environment variables for the next step.

    ```azurecli-interactive
    csResourceKVUri=$(az keyvault secret set --vault-name $vaultName --name csresource --value $csResourceName --query id --output tsv)
    csKeyKVUri=$(az keyvault secret set --vault-name $vaultName --name cskey --value $csKey1 --query id --output tsv)
    ```

1. Previously, you set the secrets as app settings `CS_ACCOUNT_NAME` and `CS_ACCOUNT_KEY` in your app. Now, set them as [key vault references](app-service-key-vault-references.md) instead.

    ```azurecli-interactive
    az webapp config appsettings set --resource-group $groupName --name $appName --settings CS_ACCOUNT_NAME="@Microsoft.KeyVault(SecretUri=$csResourceKVUri)" CS_ACCOUNT_KEY="@Microsoft.KeyVault(SecretUri=$csKeyKVUri)"
    ```

1. In a browser, go to `<app-name>.azurewebsites.net` again. If you get detection results back, you're connecting to the Foundry Tools endpoint by using key vault references.

Congratulations, your app now connects to Foundry Tools by using secrets kept in your key vault, and you didn't make any changes to your application code.

## Clean up resources

In the preceding steps, you created Azure resources in a resource group. If you don't expect to need these resources in the future, delete the resource group by running the following command in the Cloud Shell:

```azurecli-interactive
az group delete --name $groupName
```

This command might take a minute to run.

## Related content

- [Tutorial: Isolate back-end communication with Virtual Network integration](tutorial-networking-isolate-vnet.md)
- [Integrate your app with an Azure virtual network](overview-vnet-integration.md)
- [App Service networking features](networking-features.md)
