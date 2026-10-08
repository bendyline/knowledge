---
title: Create your function app resources using Azure Resource Manager templates
description: Create and deploy to Azure a simple HTTP triggered serverless function by using an Azure Resource Manager template (ARM template).
ms.date: 03/17/2025
ms.topic: quickstart
ms.service: azure-functions
zone_pivot_groups: programming-languages-set-functions-no-go
ms.custom: subject-armqs, mode-arm, devx-track-arm-template
---

# Quickstart: Create and deploy Azure Functions resources from an ARM template

In this article, you use an Azure Resource Manager template (ARM template) to create a function app in a Flex Consumption plan in Azure, along with its required Azure resources. The function app provides a serverless execution context for your function code executions. The app uses Microsoft Entra ID with managed identities to connect to other Azure resources.    

Completing this quickstart incurs a small cost of a few USD cents or less in your Azure account. 

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/resource-manager-quickstart-introduction.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-create-first-function-resource-manager.md)

If your environment meets the prerequisites and you're familiar with using ARM templates, select the **Deploy to Azure** button. The template opens in the Azure portal.

Button to deploy the Resource Manager template to Azure.

After you create the function app, you can deploy your Azure Functions project code to that app. A final code deployment step is outside the scope of this quickstart article.

## Prerequisites

### Azure account 

Before you begin, you must have an Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

## Review the template

The template used in this quickstart is from [Azure Quickstart Templates](https://learn.microsoft.com/samples/azure/azure-quickstart-templates/function-app-flex-managed-identities/).

[Code reference unavailable in this source snapshot: ~/quickstart-templates/quickstarts/microsoft.web/function-app-flex-managed-identities/azuredeploy.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-create-first-function-resource-manager.md)

This template creates these Azure resources needed by a function app that securely connects to Azure services:


+ [**Microsoft.Web/sites**](https://learn.microsoft.com/azure/templates/microsoft.web/sites): creates your function app.
+ [**Microsoft.Web/serverfarms**](https://learn.microsoft.com/azure/templates/microsoft.web/serverfarms): creates a serverless Flex Consumption hosting plan for your app.
+ [**Microsoft.Storage/storageAccounts**](https://learn.microsoft.com/azure/templates/microsoft.storage/storageaccounts): creates an Azure Storage account, which is required by Functions.
+ [**Microsoft.Insights/components**](https://learn.microsoft.com/azure/templates/microsoft.insights/components): creates an Application Insights instance for monitoring your app. 
+ [**Microsoft.OperationalInsights/workspaces**](https://learn.microsoft.com/azure/templates/microsoft.operationalinsights/workspaces): creates a workspace required by Application Insights.
+ [**Microsoft.ManagedIdentity/userAssignedIdentities**](https://learn.microsoft.com/azure/templates/microsoft.managedidentity/userassignedidentities): creates a user-assigned managed identity that's used by the app to authenticate with other Azure services using Microsoft Entra. 
+ [**Microsoft.Authorization/roleAssignments**](https://learn.microsoft.com/azure/templates/microsoft.authorization/roleassignments): creates role assignments to the user-assigned managed identity, which provide the app with least-privilege access when connecting to other Azure services.


Deployment considerations:

+ The storage account is used to store important app data, including the application code deployment package. This deployment creates a storage account that is accessed using Microsoft Entra ID authentication and managed identities. Identity access is granted on a least-permissions basis.
+ The Bicep file defaults to creating a C# app that uses .NET 8 in an isolated process. For other languages, use the `functionAppRuntime` and `functionAppRuntimeVersion` parameters to specify the specific language and version on which to run your app. Make sure to select your programming language at the [top](#top) of the article.

## Deploy the template

These scripts are designed for and tested in [Azure Cloud Shell](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/cloud-shell/overview.md). Choose **Try It** to open a Cloud Shell instance right in your browser. When prompted, enter the name of a region that [supports the Flex Consumption plan](flex-consumption-how-to.md#view-currently-supported-regions), such as `eastus` or `northeurope`.

### [Azure CLI](#tab/azure-cli)
**Applies to: programming-language-csharp**

```azurecli-interactive 
read -p "Enter a supported Azure region: " location &&
resourceGroupName=exampleRG &&
templateUri="https://raw.githubusercontent.com/Azure/azure-quickstart-templates/master/quickstarts/microsoft.web/function-app-flex-managed-identities/azuredeploy.json" &&
az group create --name $resourceGroupName --location "$location" &&
az deployment group create --resource-group $resourceGroupName --template-uri  $templateUri --parameters functionAppRuntime=dotnet-isolated functionAppRuntimeVersion=8.0 &&
echo "Press [ENTER] to continue ..." &&
read
```

**Applies to: programming-language-java**

```azurecli-interactive 
read -p "Enter a supported Azure region: " location &&
resourceGroupName=exampleRG &&
templateUri="https://raw.githubusercontent.com/Azure/azure-quickstart-templates/master/quickstarts/microsoft.web/function-app-flex-managed-identities/azuredeploy.json" &&
az group create --name $resourceGroupName --location "$location" &&
az deployment group create --resource-group $resourceGroupName --template-uri  $templateUri --parameters functionAppRuntime=java functionAppRuntimeVersion=17 &&
echo "Press [ENTER] to continue ..." &&
read
```

**Applies to: programming-language-javascript,programming-language-typescript**

```azurecli-interactive 
read -p "Enter a supported Azure region: " location &&
resourceGroupName=exampleRG &&
templateUri="https://raw.githubusercontent.com/Azure/azure-quickstart-templates/master/quickstarts/microsoft.web/function-app-flex-managed-identities/azuredeploy.json" &&
az group create --name $resourceGroupName --location "$location" &&
az deployment group create --resource-group $resourceGroupName --template-uri  $templateUri --parameters functionAppRuntime=node functionAppRuntimeVersion=20 &&
echo "Press [ENTER] to continue ..." &&
read
```

**Applies to: programming-language-python**

```azurecli-interactive 
read -p "Enter a supported Azure region: " location &&
resourceGroupName=exampleRG &&
templateUri="https://raw.githubusercontent.com/Azure/azure-quickstart-templates/master/quickstarts/microsoft.web/function-app-flex-managed-identities/azuredeploy.json" &&
az group create --name $resourceGroupName --location "$location" &&
az deployment group create --resource-group $resourceGroupName --template-uri  $templateUri --parameters functionAppRuntime=python functionAppRuntimeVersion=3.11 &&
echo "Press [ENTER] to continue ..." &&
read
```

**Applies to: programming-language-powershell**

```azurecli-interactive 
read -p "Enter a supported Azure region: " location &&
resourceGroupName=exampleRG &&
templateUri="https://raw.githubusercontent.com/Azure/azure-quickstart-templates/master/quickstarts/microsoft.web/function-app-flex-managed-identities/azuredeploy.json" &&
az group create --name $resourceGroupName --location "$location" &&
az deployment group create --resource-group $resourceGroupName --template-uri  $templateUri --parameters functionAppRuntime=powerShell functionAppRuntimeVersion=7.6 &&
echo "Press [ENTER] to continue ..." &&
read
```


### [Azure PowerShell](#tab/azure-powershell)
**Applies to: programming-language-csharp**

```powershell-interactive
$resourceGroupName = "exampleRG"
$location = Read-Host -Prompt "Enter a supported Azure region"
$templateUri = "https://raw.githubusercontent.com/Azure/azure-quickstart-templates/master/quickstarts/microsoft.web/function-app-flex-managed-identities/azuredeploy.json"

New-AzResourceGroup -Name $resourceGroupName -Location "$location"
New-AzResourceGroupDeployment -ResourceGroupName $resourceGroupName -TemplateUri $templateUri -functionAppRuntime "dotnet-isolated" -functionAppRuntimeVersion "8.0"

Read-Host -Prompt "Press [ENTER] to continue ..."
```

**Applies to: programming-language-java**

```powershell-interactive
$resourceGroupName = "exampleRG"
$location = Read-Host -Prompt "Enter a supported Azure region"
$templateUri = "https://raw.githubusercontent.com/Azure/azure-quickstart-templates/master/quickstarts/microsoft.web/function-app-flex-managed-identities/azuredeploy.json"

New-AzResourceGroup -Name $resourceGroupName -Location "$location"
New-AzResourceGroupDeployment -ResourceGroupName $resourceGroupName -TemplateUri $templateUri -functionAppRuntime "java" -functionAppRuntimeVersion "17"

Read-Host -Prompt "Press [ENTER] to continue ..."
```

**Applies to: programming-language-javascript,programming-language-typescript**

```powershell-interactive
$resourceGroupName = "exampleRG"
$location = Read-Host -Prompt "Enter a supported Azure region"
$templateUri = "https://raw.githubusercontent.com/Azure/azure-quickstart-templates/master/quickstarts/microsoft.web/function-app-flex-managed-identities/azuredeploy.json"

New-AzResourceGroup -Name $resourceGroupName -Location "$location"
New-AzResourceGroupDeployment -ResourceGroupName $resourceGroupName -TemplateUri $templateUri -functionAppRuntime "node" -functionAppRuntimeVersion "20"

Read-Host -Prompt "Press [ENTER] to continue ..."
```

**Applies to: programming-language-python**

```powershell-interactive
$resourceGroupName = "exampleRG"
$location = Read-Host -Prompt "Enter a supported Azure region"
$templateUri = "https://raw.githubusercontent.com/Azure/azure-quickstart-templates/master/quickstarts/microsoft.web/function-app-flex-managed-identities/azuredeploy.json"

New-AzResourceGroup -Name $resourceGroupName -Location "$location"
New-AzResourceGroupDeployment -ResourceGroupName $resourceGroupName -TemplateUri $templateUri -functionAppRuntime "python" -functionAppRuntimeVersion "3.11"

Read-Host -Prompt "Press [ENTER] to continue ..."
```

**Applies to: programming-language-powershell**

```powershell-interactive
$resourceGroupName = "exampleRG"
$location = Read-Host -Prompt "Enter a supported Azure region"
$templateUri = "https://raw.githubusercontent.com/Azure/azure-quickstart-templates/master/quickstarts/microsoft.web/function-app-flex-managed-identities/azuredeploy.json"

New-AzResourceGroup -Name $resourceGroupName -Location "$location"
New-AzResourceGroupDeployment -ResourceGroupName $resourceGroupName -TemplateUri $templateUri -functionAppRuntime "powershell" -functionAppRuntimeVersion "7.6"

Read-Host -Prompt "Press [ENTER] to continue ..."
```



---

When the deployment finishes, you should see a message indicating the deployment succeeded.


## Visit function app welcome page

1. Use the output from the previous validation step to retrieve the unique name created for your function app.

1. Open a browser and enter the following URL: **\<https://<appName.azurewebsites.net\>**. Make sure to replace **<\appName\>** with the unique name created for your function app.

    When you visit the URL, you should see a page like this:

    Function app welcome page


## Clean up resources


Now that you have deployed a function app and related resources to Azure, can continue to the next step of publishing project code to your app. Otherwise, use these commands to delete the resources, when you no longer need them. 

### [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az group delete --name exampleRG
```

### [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Remove-AzResourceGroup -Name exampleRG
```

---

You can also remove resources by using the [Azure portal](https://portal.azure.com). 


## Next steps


You can now deploy a code project to the function app resources you created in Azure. 

You can create, verify, and deploy a code project to your new function app from these local environments:

### [Command prompt](#tab/core-tools)

1. [Create the local code project](functions-run-local.md#create-your-local-project)
1. [Verify locally](functions-run-local.md#run-a-local-function)
1. [Publish to Azure](functions-run-local.md#publish)

### [Visual Studio Code](#tab/vs-code)

1. [Create the local code project](functions-develop-vs-code.md#create-an-azure-functions-project)
1. [Verify locally](functions-develop-vs-code.md#run-functions-locally)
1. [Publish to Azure](functions-develop-vs-code.md#republish-project-files)
 
### [Visual Studio](#tab/vs)

1. [Create the local code project](functions-develop-vs.md#create-an-azure-functions-project)
1. [Verify locally](functions-develop-vs.md#run-functions-locally)
1. [Publish to Azure](functions-develop-vs.md#publish-to-azure)

---
