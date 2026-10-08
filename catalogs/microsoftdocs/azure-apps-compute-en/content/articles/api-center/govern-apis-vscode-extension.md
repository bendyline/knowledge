---
title: Govern APIs - Visual Studio Code Extension
description: API developers can use the Azure API Center extension for Visual Studio Code to govern their organization's APIs.

ms.service: azure-api-center
ms.topic: how-to
ms.date: 02/19/2026
ms.custom:
  - sfi-image-nochange
# Customer intent: As an API developer, I want to use my Visual Studio Code environment to check API compliance in my organization's API center.
---

# Govern APIs with the Azure API Center extension for Visual Studio Code

To maximize success of your API governance efforts, it's critical to shift-left governance early into the API development cycle. This approach allows API developers to create APIs correctly from the beginning, saving them from wasted development effort and mitigating noncompliant APIs later in the development process. 

The Azure API Center extension for Visual Studio Code includes the following governance capabilities for API developers:
 
* Evaluating API designs against API style guides as the API is developed in Visual Studio Code. 
* Early detection of breaking changes so APIs remain reliable and function as expected, preserving the trust of end-users and stakeholders. 

API developers can also take advantage of features in the extension to [register APIs](build-register-apis-vscode-extension.md) in the API center and [discover and consume APIs](discover-apis-vscode-extension.md).


## Prerequisites

* [Visual Studio Code](https://code.visualstudio.com/)
    
* [Azure API Center extension for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=apidev.azure-api-center)

* One or more API centers in your Azure subscription. You can [create an API center by using the Azure API Center extension](set-up-api-center-vs-code-extension.md) or other tools.

   * To manage APIs with the extension, you currently need the Azure API Center Service Contributor role or higher permissions on an API center.
  

* [Spectral extension for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=stoplight.spectral) to run shift-left API design conformance checks in Visual Studio Code.

* [Optic CLI](https://github.com/opticdev/optic) to detect breaking changes between API specification documents.


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

## API design conformance

To ensure design conformance with organizational standards as you build APIs, the Azure API Center extension for Visual Studio Code provides integrated support for API specification linting with [Spectral](https://stoplight.io/open-source/spectral).

1. Use the **Ctrl**+**Shift**+**P** keyboard shortcut to open the Command Palette. Type **Azure API Center: Set active API Style Guide** followed by the **Enter** key.

1. Select one of the default rules provided. If your organization has a style guide already available, select the **Select Local File** or **Input Remote URL** option and specify the active ruleset in Visual Studio Code. Select **Enter**.

After an active API style guide is set, opening any OpenAPI or AsyncAPI-based specification file triggers a local linting operation in Visual Studio Code. Results are displayed both inline in the editor and in the **Problems** window (**View** > **Problems** or **Ctrl**+**Shift**+**M**).

Screenshot of local-linting in Visual Studio Code.

## Breaking change detection

When introducing new versions of your API, it's important to ensure that changes introduced don't break API consumers on previous versions of your API. The Azure API Center extension for Visual Studio Code makes this task easy with breaking change detection for OpenAPI specification documents powered by [Optic](https://github.com/opticdev/optic).

1. Use the **Ctrl**+**Shift**+**P** keyboard shortcut to open the Command Palette. Type **Azure API Center: Detect Breaking Change** followed by the **Enter** key.

1. Select the first API specification document to compare. Valid options include API specifications found in your API center, a local file, or the active editor in Visual Studio Code.

1. Select the second API specification document to compare. Valid options include API specifications found in your API center, a local file, or the active editor in Visual Studio Code.

Visual Studio Code opens a diff view between the two API specifications. Any breaking changes are displayed both inline in the editor and in the **Problems** window (**View** > **Problems** or **Ctrl**+**Shift**+**M**).

Screenshot of breaking changes detected in Visual Studio Code.

## Related content

* [Azure API Center - key concepts](key-concepts.md)
* [Build and register APIs with the Azure API Center extension for Visual Studio Code](build-register-apis-vscode-extension.md)
* [Discover and consume APIs with the Azure API Center extension for Visual Studio Code](discover-apis-vscode-extension.md)
* [Enable and view the API Center portal in Visual Studio Code](enable-api-center-portal-vs-code-extension.md)
