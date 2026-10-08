---
ms.topic: include
ms.date: 04/24/2026
ms.reviewer: jordanselig 
ms.custom: devx-track-azurecli
ms.service: azure-app-service
---

[Azure App Service](../../overview.md) can use [managed identities](../../overview-managed-identity.md) to connect to back-end services without a connection string. This approach eliminates connection secrets to manage and keeps your back-end connectivity secure in a production environment. When you're finished, you have an app that makes programmatic calls to Foundry Tools without storing any connection secrets in App Service.

For back-end services that don't support managed identities and still require connection secrets, you can use Azure Key Vault to manage connection secrets. This tutorial uses Foundry Tools as an example. When you're finished, you have an app that makes programmatic calls to Foundry Tools without storing any connection secrets inside App Service.

- [Sample application](https://github.com/Azure-Samples/app-service-language-detector)

> **Tip:**
> Foundry Tools [supports authentication through managed identities](https://learn.microsoft.com/azure/ai-services/authentication#authorize-access-to-managed-identities). This tutorial uses [subscription key authentication](https://learn.microsoft.com/azure/ai-services/authentication#authenticate-with-a-single-service-resource-key) to demonstrate how you could connect to an Azure service that doesn't support managed identities from App Service.

Diagram that shows the user connecting to a service, which in turn, connects to a key vault to access Cognitive Services.

In this architecture: 

- Managed identities secure connectivity to the key vault.
- App Service accesses the secrets by using [Key Vault references](../../app-service-key-vault-references.md) as app settings.
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

[Include unavailable in this source snapshot: ~/reusable-content/azure-cli/azure-cli-prepare-your-environment-no-header.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/app-service/includes/tutorial-connect-msi-key-vault/introduction.md)

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
