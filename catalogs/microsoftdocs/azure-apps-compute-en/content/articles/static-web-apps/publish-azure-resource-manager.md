---
title: "Tutorial: Publish Azure Static Web Apps using an ARM template"
description: Create and deploy an ARM Template for Static Web Apps
services: static-web-apps
author: cjk7989
ms.service: azure-static-web-apps
ms.custom: devx-track-arm-template
ms.topic:  tutorial
ms.date: 07/13/2021
ms.author: jikunchen
---

# Tutorial: Publish Azure Static Web Apps using an ARM Template

This article demonstrates how to deploy [Azure Static Web Apps](overview.md) using an [Azure Resource Manager template](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/templates/overview.md) (ARM template).

In this tutorial, you learn to:

> 
> - Create an ARM Template for Azure Static Web Apps
> - Deploy the ARM Template to create an Azure Static Web App instance

## Prerequisites

- **Active Azure account:** If you don't have one, you can [create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- **GitHub Account:** If you don't have one, you can [create a GitHub Account for free](https://github.com)
- **Editor for ARM Templates:** Reviewing and editing templates requires a JSON editor. Visual Studio Code with the [Azure Resource Manager Tools extension](https://marketplace.visualstudio.com/items?itemName=msazurermtools.azurerm-vscode-tools) is well suited for editing ARM Templates. For instructions on how to install and configure Visual Studio Code, see [Quickstart: Create ARM templates with Visual Studio Code](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/templates/quickstart-create-templates-use-visual-studio-code.md).

- **Azure CLI or Azure PowerShell**: Deploying ARM templates requires a command line tool. For the installation instructions, see:
  - [Install Azure CLI on Windows OS](https://learn.microsoft.com/cli/azure/install-azure-cli-windows)
  - [Install Azure CLI on Linux OS](https://learn.microsoft.com/cli/azure/install-azure-cli-linux)
  - [Install Azure CLI on macOS](https://learn.microsoft.com/cli/azure/install-azure-cli-macos)
  - [Install Azure PowerShell](https://learn.microsoft.com/powershell/azure/install-azure-powershell)

## Create a GitHub personal access token

One of the parameters in the ARM template is `repositoryToken`, which allows the ARM deployment process to interact with the GitHub repo holding the static site source code. 

1. From your GitHub Account Profile (in the upper right corner), select **Settings**.

1. Select **Developer Settings**.

1. Select **Personal Access Tokens**.

1. Select **Generate New Token**.

1. Provide a name for this token in the _Name_ field, for example *myfirstswadeployment*.

1. Select an _Expiration_ for the token, the default is 30 days.

1. Specify the following *scopes*: **repo, workflow, write:packages**

1. Select **Generate token**.

1. Copy the token value and paste it into a text editor for later use.

> **Important:**
> Make sure you copy this token and store it somewhere safe. Consider storing this token in [Azure Key Vault](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/templates/template-tutorial-use-key-vault.md) and access it in your ARM Template.

## Create a GitHub repo

This article uses a GitHub template repository to make it easy for you to get started. The template features a starter app used to deploy using Azure Static Web Apps.

1. Go to the following location to create a new repository:
    1. [https://github.com/staticwebdev/vanilla-basic/generate](https://github.com/login?return_to=/staticwebdev/vanilla-basic/generate)

1. Name your repository **myfirstswadeployment**

    > **Note:**
    > Azure Static Web Apps requires at least one HTML file to create a web app. The repository you create in this step includes a single _index.html_ file.

1. Select **Create repository**.

    screenshot of the Create repository button.

## Create the ARM Template

With the prerequisites in place, the next step is to define the ARM deployment template file.

1. Create a new folder to hold the ARM Templates.

1. Create a new file and name it **azuredeploy.json**.

1. Paste the following ARM template snippet into _azuredeploy.json_.

    ```json
        {
            "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
            "contentVersion": "1.0.0.0",
            "parameters": {
                "name": {
                    "type": "string"
                },
                "location": {
                    "type": "string"
                },
                "sku": {
                    "type": "string"
                },
                "skucode": {
                    "type": "string"
                },
                "repositoryUrl": {
                    "type": "string"
                },
                "branch": {
                    "type": "string"
                },
                "repositoryToken": {
                    "type": "securestring"
                },
                "appLocation": {
                    "type": "string"
                },
                "apiLocation": {
                    "type": "string"
                },
                "appArtifactLocation": {
                    "type": "string"
                },
                "resourceTags": {
                    "type": "object"
                },
                "appSettings": {
                    "type": "object"
                }
            },
            "resources": [
                {
                    "apiVersion": "2021-01-15",
                    "name": "[parameters('name')]",
                    "type": "Microsoft.Web/staticSites",
                    "location": "[parameters('location')]",
                    "tags": "[parameters('resourceTags')]",
                    "properties": {
                        "repositoryUrl": "[parameters('repositoryUrl')]",
                        "branch": "[parameters('branch')]",
                        "repositoryToken": "[parameters('repositoryToken')]",
                        "buildProperties": {
                            "appLocation": "[parameters('appLocation')]",
                            "apiLocation": "[parameters('apiLocation')]",
                            "appArtifactLocation": "[parameters('appArtifactLocation')]"
                        }
                    },
                    "sku": {
                        "Tier": "[parameters('sku')]",
                        "Name": "[parameters('skuCode')]"
                    },
                    "resources":[
                        {
                            "apiVersion": "2021-01-15",
                            "name": "appsettings",
                            "type": "config",
                            "location": "[parameters('location')]",
                            "properties": "[parameters('appSettings')]",
                            "dependsOn": [
                                "[resourceId('Microsoft.Web/staticSites', parameters('name'))]"
                            ]
                        }
                    ]
                }
            ]
        }

    ```

1. Create a new file and name it **azuredeploy.parameters.json**.

1. Paste the following ARM template snippet into _azuredeploy.parameters.json_.

    ```json
        {
            "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentParameters.json#",
            "contentVersion": "1.0.0.0",
            "parameters": {
                "name": {
                    "value": "myfirstswadeployment"
                },
                "location": { 
                    "value": "Central US"
                },   
                "sku": {
                    "value": "Free"
                },
                "skucode": {
                    "value": "Free"
                },
                "repositoryUrl": {
                    "value": "https://github.com/<YOUR-GITHUB-USER-NAME>/<YOUR-GITHUB-REPOSITORY-NAME>"
                },
                "branch": {
                    "value": "main"
                },
                "repositoryToken": {
                    "value": "<YOUR-GITHUB-PAT>" 
                },
                "appLocation": {
                    "value": "/"
                },
                "apiLocation": {
                    "value": ""
                },
                "appArtifactLocation": {
                    "value": "src"
                },
                "resourceTags": {
                    "value": {
                        "Environment": "Development",
                        "Project": "Testing SWA with ARM",
                        "ApplicationName": "myfirstswadeployment"
                    }
                },
                "appSettings": {
                    "value": {
                        "MY_APP_SETTING1": "value 1",
                        "MY_APP_SETTING2": "value 2"
                    }
                }
            }
        }
    ```

1. Update the following parameters.

    | Parameter | Expected value |
    | --- | --- |
    | `repositoryUrl` | Provide the URL to your Static Web Apps GitHub repository. |
    | `repositoryToken` | Provide the GitHub PAT token. |

1. Save the updates before running the deployment in the next step.

## Running the deployment

You need either Azure CLI or Azure PowerShell to deploy the template.

### Sign in to Azure

To deploy a template, sign in to either the Azure CLI or Azure PowerShell.

# [Azure CLI](#tab/azure-cli)

```azurecli
az login
```

# [PowerShell](#tab/azure-powershell)

```azurepowershell
Connect-AzAccount
```

---

If you have multiple Azure subscriptions, select the subscription you want to use. Replace `<SUBSCRIPTION-ID>` with your subscription information:

# [Azure CLI](#tab/azure-cli)

```azurecli
az account set --subscription <SUBSCRIPTION-ID>
```

# [PowerShell](#tab/azure-powershell)

```azurepowershell
Set-AzContext <SUBSCRIPTION-ID>
```

---

## Create a resource group

When you deploy a template, you specify a resource group that contains related resources. Before running the deployment command, create the resource group with either Azure CLI or Azure PowerShell.

> **Note:**
> The CLI examples in this article are written for the Bash shell.

# [Azure CLI](#tab/azure-cli)

```azurecli
resourceGroupName="myfirstswadeployRG"

az group create \
  --name $resourceGroupName \
  --location "Central US"
```

# [PowerShell](#tab/azure-powershell)

```azurepowershell
$resourceGroupName = "myfirstswadeployRG"

New-AzResourceGroup `
  -Name $resourceGroupName `
  -Location "Central US"
```

---

## Deploy template

Use one of these deployment options to deploy the template.

# [Azure CLI](#tab/azure-cli)

```azurecli

az deployment group create \
  --name DeployLocalTemplate \
  --resource-group $resourceGroupName \
  --template-file <PATH-TO-AZUREDEPLOY.JSON> \
  --parameters <PATH-TO-AZUREDEPLOY.PARAMETERS.JSON> \
  --verbose
```

To learn more about deploying templates using the Azure CLI, see [Deploy resources with ARM templates and Azure CLI](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/templates/deploy-cli.md).

# [PowerShell](#tab/azure-powershell)

```azurepowershell
$templateFile = Read-Host -Prompt "Enter the template file path and file name"
$templateparameterFile = Read-Host -Prompt "Enter the template parameter file path and file name"

New-AzResourceGroupDeployment `
  -Name DeployLocalTemplate `
  -ResourceGroupName $resourceGroupName `
  -TemplateFile $templateFile `
  -TemplateParameterFile $templateparameterfile `
  -verbose
```

To learn more about deploying templates using Azure PowerShell, see [Deploy resources with ARM templates and Azure PowerShell](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/templates/deploy-powershell.md).

---


## View the website

There are two aspects to deploying a static app. The first provisions the underlying Azure resources that make up your app. The second is a GitHub Actions workflow that builds and publishes your application.

Before you can navigate to your new static site, the deployment build must first finish running.

The Static Web Apps overview window displays a series of links that help you interact with your web app.

Overview window

1. Clicking on the banner that says, _Click here to check the status of your GitHub Actions runs_ takes you to the GitHub Actions running against your repository. Once you verify the deployment job is complete, then you can navigate to your website via the generated URL.

2. Once GitHub Actions workflow is complete, you can click on the _URL_ link to open the website in new tab.


## Clean up resources

Clean up the resources you deployed by deleting the resource group.

1. From the Azure portal, select **Resource group** from the left menu.
2. Enter the resource group name in the **Filter by name** field.
3. Select the resource group name.
4. Select **Delete resource group** from the top menu.

## Next steps

> 
> [Configure your static web app](configuration.md)
