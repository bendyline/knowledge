---
title: Quickstart - Create an Azure API Center Using the VS Code Extension
description: Learn how to quickly create an Azure API Center resource using the Azure API Center extension for Visual Studio Code. Use the extension to build, register, govern, and discover your APIs.


ms.date: 06/25/2025
ms.topic: quickstart
ms.service: azure-api-center

---

# Quickstart: Create your API center using the Visual Studio Code extension


Create your [API center](overview.md) to start an inventory of your organization's APIs. Azure API Center enables tracking APIs in a centralized location for discovery, reuse, and governance.

After creating your API center, follow the steps in the tutorials to add custom metadata, APIs, versions, definitions, and other information.

In this quickstart, you create an Azure API center using the [Azure API Center extension for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=apidev.azure-api-center). The extension provides a streamlined way to set up your API center and to build, register, govern, and discover your APIs.


## Prerequisites

* If you don't have an Azure subscription, create an [Azure free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.

* At least a Contributor role assignment or equivalent permissions in the Azure subscription. 

* [Visual Studio Code](https://code.visualstudio.com/) 

* [Azure API Center extension for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=apidev.azure-api-center) 


## Extension setup

Set up the extension by following these steps:

1. Install the Azure API Center extension for Visual Studio Code from the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=apidev.azure-api-center). Install other extensions as needed.

   > **Note:**
   > The `[PREVIEW]` notation indicates features available only in the prerelease version of the Azure API Center extension. 
When you install the extension from the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=apidev.azure-api-center&ssr=false#overview), you can choose to install the release version or a prerelease version (as available). To switch between installed versions, select the extension's **Manage** button (gear icon) in the **Extensions** view in Visual Studio Code. 

1. In Visual Studio Code, in the Activity bar, select API Center:

   Screenshot of API Center extension icon in the Visual Studio Code Activity bar.

1. If you're not signed in to your Azure account, select **Sign in to Azure**, and follow the prompts to sign in. 

1. Select an Azure subscription with the API center (or API centers) that has the APIs you want to view. If you have multiple accounts, you can filter on specific subscriptions.  

## Create an API center 

1. In the Azure API Center view, right-click your subscription and select **Create API Center Service in Azure**. 
    
    Alternatively, use the **Ctrl+Shift+P** keyboard shortcut to open the Command Palette. Type **Azure API Center: Create API Center Service in Azure** and hit **Enter**.
1. Enter a name for your API center.
1. Select a location for the resource.

 The extension will show progress and notify you when the resource is ready. The API center is created in the Free plan in a resource group of the same name.

## Verify your API center

Once deployment completes, refresh the Azure API Center view. Your new API center appears in the list and is ready to use.

Screenshot of an API center created in Visual Studio Code.

* Expand the resource to start registering APIs and explore features. Find Azure API Center commands in the Command Palette by typing **Azure API Center**.

* If you want to interact with the API center in the Azure portal, right-click the API center name and select **Open in Azure Portal**.

## Next steps

* [Build and register APIs with the Azure API Center extension for Visual Studio Code](build-register-apis-vscode-extension.md)
* [Govern APIs with the Azure API Center extension for Visual Studio Code](govern-apis-vscode-extension.md)
* [Discover and consume APIs with the Azure API Center extension for Visual Studio Code](discover-apis-vscode-extension.md)
