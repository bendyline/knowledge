---
title: "Quickstart: Deploy a Dapr App with Azure Resource Manager or Bicep"
description: Learn how to deploy a Dapr application to Azure Container Apps by using an Azure Resource Manager or Bicep file.
services: container-apps
author: greenie-msft
ms.service: azure-container-apps
ms.subservice: dapr
ms.topic: quickstart
ms.date: 01/28/2026
ms.author: nigreenf
ms.reviewer: hannahhunter
ms.custom:
  - devx-track-bicep
  - devx-track-arm-template
  - devx-track-azurepowershell
  - build-2025
zone_pivot_groups: container-apps
---

# Quickstart: Deploy a Dapr application to Azure Container Apps by using an Azure Resource Manager or Bicep file

[Dapr](dapr-overview.md) (Distributed Application Runtime) helps developers build resilient, reliable microservices. In this quickstart, you enable Dapr sidecars to run alongside two container apps that produce and consume messages, stored in an Azure Blob Storage state store. Using either Azure Resource Manager or Bicep files, you'll:

> 
>
> - Pass Azure CLI commands to [deploy a template](https://github.com/Azure-Samples/Tutorial-Deploy-Dapr-Microservices-ACA) that launches everything you need to run microservices.  
> - Verify the interaction between the two microservices in the Azure portal.

Architecture diagram of Dapr Hello World microservices on Azure Container Apps.

This quickstart mirrors the applications you deploy in the open-source Dapr [Hello World](https://github.com/dapr/quickstarts/tree/master/tutorials/hello-world) quickstart.

## Prerequisites

- An Azure account with an active subscription. If you don't already have one, you can [create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- A GitHub account. If you don't already have one, [sign up for free](https://github.com/join).
- Install [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli).
- Install [Git](https://git-scm.com/downloads).
**Applies to: container-apps-bicep**

- Install [Bicep tools](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/bicep/install.md).



## Setup

To sign in to Azure from the CLI, run the following command and follow the prompts to complete the authentication process.

# [Bash](#tab/bash)

```azurecli
az login
```

# [PowerShell](#tab/powershell)

```azurepowershell
Connect-AzAccount
```

---

To ensure you're running the latest version of the CLI, run the upgrade command.

# [Bash](#tab/bash)

```azurecli
az upgrade
```

# [PowerShell](#tab/powershell)

```azurepowershell
Install-Module -Name Az -Scope CurrentUser -Repository PSGallery -Force
```

Ignore any warnings about modules currently in use.

---

Next, install or update the Azure Container Apps extension for the CLI.

If you receive errors about missing parameters when you run `az containerapp` commands in Azure CLI or cmdlets from the `Az.App` module in PowerShell, be sure you have the latest version of the Azure Container Apps extension installed.

# [Bash](#tab/bash)

```azurecli
az extension add --name containerapp --upgrade
```

> **Note:**
> Starting in May 2024, Azure CLI extensions no longer enable preview features by default. To access Container Apps [preview features](whats-new.md), install the Container Apps extension with `--allow-preview true`.
> ```azurecli
> az extension add --name containerapp --upgrade --allow-preview true
> ```

# [PowerShell](#tab/powershell)

```azurepowershell
Install-Module -Name Az.App
```

Make sure to update the `Az.App` module to the latest version.

```azurepowershell
Update-Module -Name Az.App
```

---

Now that the current extension or module is installed, register the `Microsoft.App` and `Microsoft.OperationalInsights` namespaces.

# [Bash](#tab/bash)

```azurecli
az provider register --namespace Microsoft.App
```

```azurecli
az provider register --namespace Microsoft.OperationalInsights
```

# [PowerShell](#tab/powershell)

```azurepowershell
Register-AzResourceProvider -ProviderNamespace Microsoft.App
```

```azurepowershell
Register-AzResourceProvider -ProviderNamespace Microsoft.OperationalInsights
```

---



## Set environment variables

Set the following environment variables. Replace the `<placeholders>` with your values.

# [Bash](#tab/bash)

```azurecli
RESOURCE_GROUP="<new-resource-group>"
LOCATION="<location>"
CONTAINERAPPS_ENVIRONMENT="<containerapps-environment>"
```

# [PowerShell](#tab/powershell)

```azurepowershell
$ResourceGroupName = '<new-resource-group>'
$Location = '<location>'
$ContainerAppsEnvironment = '<containerapps-environment>'
```

---



## Create an Azure resource group

Create a resource group to organize the services related to your container app deployment.

# [Bash](#tab/bash)

```azurecli
az group create \
  --name $RESOURCE_GROUP \
  --location $LOCATION
```

# [PowerShell](#tab/powershell)

```azurepowershell
New-AzResourceGroup -Location $Location -Name $ResourceGroupName
```

---


## Prepare the GitHub repository

Go to the repository holding the ARM and Bicep files that's used to deploy the solution.

Select the **Fork** button at the top of the [repository](https://github.com/Azure-Samples/Tutorial-Deploy-Dapr-Microservices-ACA) to fork the repo to your account.

Now you can clone your fork to work with it locally. Use the following git command to clone your forked repo into the _acadapr-templates_ directory.

```git
git clone https://github.com/<your-github-username>/Tutorial-Deploy-Dapr-Microservices-ACA.git acadapr-templates
```

## Deploy

Navigate to the _acadapr-templates_ directory and run the following command:

**Applies to: container-apps-arm**


# [Bash](#tab/bash)

```azurecli
az deployment group create \
  --resource-group $RESOURCE_GROUP \
  --template-file ./azuredeploy.json \
  --parameters environment_name=$CONTAINERAPPS_ENVIRONMENT
```

# [PowerShell](#tab/powershell)

```azurepowershell
$params = @{
  environment_name = $ContainerAppsEnvironment
}

New-AzResourceGroupDeployment `
  -ResourceGroupName $ResourceGroupName `
  -TemplateParameterObject $params `
  -TemplateFile ./azuredeploy.json `
  -SkipTemplateParameterPrompt
```



**Applies to: container-apps-bicep**


# [Bash](#tab/bash)

```azurecli
az deployment group create \
  --resource-group $RESOURCE_GROUP \
  --template-file ./azuredeploy.bicep \
  --parameters environment_name=$CONTAINERAPPS_ENVIRONMENT
```

# [PowerShell](#tab/powershell)

```azurepowershell
$params = @{
  environment_name = $ContainerAppsEnvironment

}

New-AzResourceGroupDeployment `
  -ResourceGroupName $ResourceGroupName `
  -TemplateParameterObject $params `
  -TemplateFile ./azuredeploy.bicep `
  -SkipTemplateParameterPrompt
```

A warning (BCP081) might appear. This warning has no effect on the successful deployment of the application.



---

This command deploys:

- The Container Apps environment and associated Log Analytics workspace for hosting the hello world Dapr solution.
- An Application Insights instance for Dapr distributed tracing.
- The `nodeapp` app server running on `targetPort: 3000` with Dapr enabled and configured using:
  - `"appId": "nodeapp"`
  - `"appPort": 3000`
  - A user-assigned identity with access to the Azure Blob storage via a Storage Data Contributor role assignment
- A Dapr component of `"type": "state.azure.blobstorage"` scoped for use by the `nodeapp` for storing state.
- The Dapr-enabled, headless `pythonapp` that invokes the `nodeapp` service using Dapr service invocation.
- A Microsoft Entra ID role assignment for the Node.js app used by the Dapr component to establish a connection to Blob storage.

## Verify the result

### Confirm successful state persistence

You can confirm that the services are working correctly by viewing data in your Azure Storage account.

1. Open the [Azure portal](https://portal.azure.com) in your browser.

1. Go to the newly created storage account in your resource group.

1. Select **Data storage** > **Containers** from the sidebar menu.

1. Select the created container.

1. Verify that you can see the file named *order* in the container.

1. Select the file.

1. Select the **Edit** tab.

1. Select the **Refresh** button to observe updates.

### View logs

Logs from container apps are stored in the `ContainerAppConsoleLogs_CL` custom table in the Log Analytics workspace. You can view logs through the Azure portal or via the CLI. There might be a small delay initially for the table to appear in the workspace.

Use the following command to view logs in Bash or PowerShell.

# [Bash](#tab/bash)

```azurecli
LOG_ANALYTICS_WORKSPACE_CLIENT_ID=`az containerapp env show --name $CONTAINERAPPS_ENVIRONMENT --resource-group $RESOURCE_GROUP --query properties.appLogsConfiguration.logAnalyticsConfiguration.customerId --out tsv`
```

```azurecli
az monitor log-analytics query \
  --workspace $LOG_ANALYTICS_WORKSPACE_CLIENT_ID \
  --analytics-query "ContainerAppConsoleLogs_CL | where ContainerAppName_s == 'nodeapp' and (Log_s contains 'persisted' or Log_s contains 'order') | project ContainerAppName_s, Log_s, TimeGenerated | take 5" \
  --out table
```

# [PowerShell](#tab/powershell)

```azurepowershell
$WorkspaceId = (Get-AzContainerAppManagedEnv -ResourceGroupName $ResourceGroupName -EnvName $ContainerAppsEnvironment).LogAnalyticConfigurationCustomerId
```

```azurepowershell
$queryResults = Invoke-AzOperationalInsightsQuery -WorkspaceId $WorkspaceId -Query "ContainerAppConsoleLogs_CL | where ContainerAppName_s == 'nodeapp' and (Log_s contains 'persisted' or Log_s contains 'order') | project ContainerAppName_s, Log_s, TimeGenerated | take 5"
$queryResults.Results
```

---

The following output demonstrates the type of response to expect from the command.

```console
ContainerAppName_s    Log_s                            TableName      TimeGenerated
--------------------  -------------------------------  -------------  ------------------------
nodeapp               Got a new order! Order ID: 61    PrimaryResult  2021-10-22T21:31:46.184Z
nodeapp               Successfully persisted state.    PrimaryResult  2021-10-22T21:31:46.184Z
nodeapp               Got a new order! Order ID: 62    PrimaryResult  2021-10-22T22:01:57.174Z
nodeapp               Successfully persisted state.    PrimaryResult  2021-10-22T22:01:57.174Z
nodeapp               Got a new order! Order ID: 63    PrimaryResult  2021-10-22T22:45:44.618Z
```

## Clean up resources

Since `pythonapp` continuously makes calls to `nodeapp` with messages that get persisted into your configured state store, it's important to complete these cleanup steps to avoid ongoing billable operations.

If you'd like to delete the resources created as a part of this walkthrough, run the following command.

# [Bash](#tab/bash)

```azurecli
az group delete \
  --resource-group $RESOURCE_GROUP
```

# [PowerShell](#tab/powershell)

```azurepowershell
Remove-AzResourceGroup -Name $ResourceGroupName -Force
```

---

> **Tip:**
> Having issues? Let us know on GitHub by opening an issue in the [Azure Container Apps repo](https://github.com/microsoft/azure-container-apps).

## Next step

> 
> [Learn about Dapr components in Azure Container Apps](dapr-components.md)
