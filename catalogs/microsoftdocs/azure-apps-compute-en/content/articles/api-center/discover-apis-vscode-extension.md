---
title: Discover APIs - VS Code extension
description: API developers can use the Azure API Center extension for Visual Studio Code to discover APIs in their organization's API center.

ms.service: azure-api-center
ms.topic: how-to
ms.date: 05/27/2025
 
ms.custom: 
# Customer intent: As an API developer, I want to use my Visual Studio Code environment to discover and consume APIs in my organizations API center.
---

# Discover and consume APIs with the Azure API Center extension for Visual Studio Code

API developers in your organization can discover and consume APIs in your [API center](overview.md) by using the Azure API Center extension for Visual Studio Code. The extension provides the following features:

* **Discover APIs** - Browse the APIs in your API center, and view their details and documentation.

* **Consume APIs** - Generate API SDK clients in their favorite language including JavaScript, TypeScript, .NET, Python, and Java, using the Microsoft Kiota engine that generates SDKs for Microsoft Graph, GitHub, and more. 

API developers can also take advantage of features in the extension to [register APIs](build-register-apis-vscode-extension.md) in the API center and ensure [API governance](govern-apis-vscode-extension.md).

> **Tip:**
> If you want enterprise app developers to discover your APIs in a centralized location, optionally enable the read-only [API Center portal view](enable-api-center-portal-vs-code-extension.md) in Visual Studio Code. 


## Prerequisites

* [Visual Studio Code](https://code.visualstudio.com/)
    
* [Azure API Center extension for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=apidev.azure-api-center)

* One or more API centers in your Azure subscription. You can [create an API center by using the Azure API Center extension](set-up-api-center-vs-code-extension.md) or other tools.

   * To manage APIs with the extension, you currently need the Azure API Center Service Contributor role or higher permissions on an API center.
  
    
* [REST client extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) - to send HTTP requests and view the responses in Visual Studio Code directly
* [Microsoft Kiota extension](https://marketplace.visualstudio.com/items?itemName=ms-graph.kiota) - to generate API clients
- [Microsoft 365 Agents Toolkit](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension) - to create Microsoft 365 declarative agents


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

## Discover APIs

API center resources appear in the tree view on the left-hand side. Expand an API center resource to see APIs, versions, definitions, environments, and deployments.

Screenshot of API Center tree view in Visual Studio Code.

Search for APIs within an API Center by using the search icon shown in the **APIs** tree view item.

## View API documentation

You can view the documentation for an API definition in your API center and try API operations. This feature is only available for OpenAPI-based APIs in your API center.

1. Expand the API Center tree view to show an API definition. 
1. Right-click on the definition, and select **Open API Documentation**. A new tab appears with the Swagger UI for the API definition.

    Screenshot of API documentation in Visual Studio Code.

1. To try the API, select an endpoint, select **Try it out**, enter required parameters, and select **Execute**.

    > **Note:**
    > Depending on the API, you might need to provide authorization credentials or an API key to try the API.

    > **Tip:**
    > You can generate API documentation in Markdown, a format that's easy to maintain and share with end users. Right-click on the definition, and select **Generate Markdown**.

## Generate HTTP file

You can view a `.http` file based on the API definition in your API center. If the REST Client extension is installed, you can make requests directory from the Visual Studio Code editor. This feature is only available for OpenAPI-based APIs in your API center.

1. Expand the API Center tree view to show an API definition. 
1. Right-click on the definition, and select **Generate HTTP File**. A new tab appears that renders a .http document populated by the API specification.

    Screenshot of generating a .http file in Visual Studio Code.

1. To make a request, select an endpoint, and select **Send Request**.

    > **Note:**
    > Depending on the API, you might need to provide authorization credentials or an API key to make the request.

## Generate API client

Use the Microsoft Kiota extension to generate an API client for your favorite language. This feature is only available for OpenAPI-based APIs in your API center.

1. Expand the API Center tree view to show an API definition.    
1. Right-click on the definition, and select **Generate API Client**. The **Kiota OpenAPI Generator** pane appears.
1. Select the API endpoints and HTTP operations you wish to include in your SDKs.
1. Select **Generate API client**.
    1. Enter configuration details about the SDK name, namespace, and output directory.
    1. Select the language for the generated SDK.
    
        Screenshot of Kiota OpenAPI Explorer in Visual Studio Code.
    
The client is generated.

For details on using the Kiota extension, see [Microsoft Kiota extension for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ms-graph.kiota).

## Export API specification

You can export an API specification from a definition and then download it as a file.

To export a specification in the extension's tree view:

1. Expand the API Center tree view to show an API definition.    
1. Right-click on the definition, and select **Export API Specification Document**. A new tab appears that renders an API specification document.

    Screenshot of exporting API specification in Visual Studio Code.

You can also export a specification using the Command Palette:

1. Type the **Ctrl+Shift+P** keyboard shortcut to open the Command Palette. 
1. Select **Azure API Center: Export API Specification Document**.
1. Make selections to navigate to an API definition. A new tab appears that renders an API specification document.

    
## Create M365 declarative agent

You can create a [declarative agent for Microsoft Copilot](https://learn.microsoft.com/microsoft-365-copilot/extensibility/overview-declarative-agent) from an OpenAPI definition in your API center. With a declarative agent, you customize Microsoft Copilot to help you meet the unique business needs of your users. When you build a declarative agent, you provide the instructions, actions, and knowledge to tailor Copilot for your business scenarios. 

To export a declarative agent in the extension's tree view:

1. Expand the API Center tree view to show an OpenAPI definition.
1. Right-click on the definition, and select **Export M365 Declarative Agent**. 
1. When prompted:
    1. Select one or more API operations that Copilot can interact with.
    1. Select a workspace folder.
    1. Enter an application name.

The declarative agent is created in the selected workspace folder. Use the Microsoft 365 Agents Toolkit to further customize and deploy the agent.

* [Azure API Center - key concepts](key-concepts.md)
* [Build and register APIs with the Azure API Center extension for Visual Studio Code](build-register-apis-vscode-extension.md)
* [Govern APIs with the Azure API Center extension for Visual Studio Code](govern-apis-vscode-extension.md)
* [Enable API Center portal view in Visual Studio Code](enable-api-center-portal-vs-code-extension.md)
