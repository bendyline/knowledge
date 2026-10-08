---
title: Enable API Center portal view - Azure API Center - VS Code extension
description: Enable enterprise developers to view the enterprise's API Center portal view including API definitions using the Visual Studio Code Extension for Azure API Center.

ms.service: azure-api-center
ms.topic: how-to
ms.date: 05/27/2025
 
ms.custom: 
# Customer intent: As an API program manager, I want to enable an API catalog so that app developers in my organization can discover and consume the APIs in my organization's API center without needing to manage the API inventory itself.
---

# Enable and view Azure API Center portal view - VS Code extension

This article shows how to provide enterprise developers access to the Azure API Center portal view in the Visual Studio Code extension for [Azure API Center](overview.md). Using the portal view, developers can discover APIs in your Azure API center, view API definitions, and optionally generate API clients when they don't have access to manage the API center itself or add APIs to the inventory. Access to the API Center portal view is managed using Microsoft Entra ID and Azure role-based access control.

> **Tip:**
> The Visual Studio Code extension provides more features for API developers who have permissions to manage an Azure API center. For example, API developers can register APIs in the API center directly or using CI/CD pipelines. [Learn more](build-register-apis-vscode-extension.md) 

## Prerequisites

### For API center administrators

* An API center in your Azure subscription. If you haven't created one already, see [Quickstart: Create your API center](set-up-api-center.md).

* Permissions to create an app registration in a Microsoft Entra tenant associated with your Azure subscription, and permissions to grant access to data in your API center. 

### For app developers

* [Azure API Center extension for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=apidev.azure-api-center)
    
The following Visual Studio Code extensions are optional:

* [Microsoft Kiota extension](https://marketplace.visualstudio.com/items?itemName=ms-graph.kiota) - to generate API clients
* GitHub Copilot and GitHub Copilot Chat, provided with [access to GitHub Copilot](https://code.visualstudio.com/docs/copilot/setup) - to use language model tools in agent mode for discovering APIs 

## Steps for API center administrators to enable access to API Center portal view

The following sections provide steps for API center administrators to enable enterprise developers to access the API Center portal view.

### Create Microsoft Entra app registration


To configure Microsoft Entra ID as an identity provider, first configure an app registration in your Microsoft Entra ID tenant. The app registration enables the API Center portal to access data from your API center on behalf of a signed-in user.

API Center can set up the app registration automatically, or you can create the app registration manually. 

#### Set up the app registration automatically (recommended)

To set up the app registration automatically, follow these steps:

1. In the [Azure portal](https://portal.azure.com), go to your API center.
1. In the sidebar menu, select **Consumption** > **Portal settings**.
1. On the **Access** tab, select **Configure Entra ID**. 
    Screenshot showing configuration of Entra ID in the portal.

1. On the **Set up user sign-in with Microsoft Entra ID** page, select **Configure**.
1. On the **Access** tab, select **Save + publish**.

If you need to access the app registration later, you can find it in the portal under **App registrations**. The application is named with the following format: **\<api-center-name>-apic-aad**. 

#### Set up the app registration manually

If you want to create the app registration manually, follow these steps:

1. In the [Azure portal](https://portal.azure.com), go to **Microsoft Entra ID** > **Manage** > **App registrations**.
1. Select **+ New registration**. 
1. On the **Register an application** page, set the values as follows:
    
    1. Set **Name** to a meaningful name such as *api-center-portal*
    1. Under **Supported account types**, select **Accounts in this organizational directory only (\<Directory name> - Single tenant)**. 
    1. In **Redirect URI**, select **Single-page application (SPA)** and set the URI. 
        Enter the URI of your API Center portal deployment, in the following form: `https://<service-name>.portal.<location>.azure-apicenter.ms`. Replace `<service name>` and `<location>` with the name of your API center and the location where it's deployed, Example: `https://myapicenter.portal.eastus.azure-apicenter.ms`.
    1. Select **Register**.

#### Configure additional redirect URIs for VS Code extension

When enabling the API Center portal view in the Visual Studio Code extension for API Center, also configure the following redirect URIs in the app registration:

1. In the [Azure portal](https://portal.azure.com), navigate to your app registration.
1. On the **Manage** > **Authentication** page, select **Add a platform** and select **Mobile and desktop applications**. 
1. Configure the following three custom redirect URIs:<br/>
    `https://vscode.dev/redirect`<br/>
    `http://localhost`<br/>
    `ms-appx-web://Microsoft.AAD.BrokerPlugin/<application-client-id>`<br/>
    
    Replace `<application-client-id>` with the application (client) ID of this app. You can find this value on the **Overview** page of the app registration. 


### Enable sign-in to API Center portal view by Microsoft Entra users and groups 

Enterprise developers must sign in with a Microsoft account to see the API Center portal view for your API center. If needed, [add or invite developers](https://learn.microsoft.com/entra/external-id/b2b-quickstart-add-guest-users-portal) to your Microsoft Entra tenant. 


When Microsoft Entra ID is configured for portal access, users must sign in to the API Center portal to access APIs. To enable sign-in, assign the **Azure API Center Data Reader** role to users or groups in your organization, scoped to your API center.

> **Note:**
> * When the Microsoft Entra ID app registration is set up automatically, the user who configures the portal is automatically assigned the **Azure API Center Data Reader** role. 
> * Be sure to assign the **Azure API Center Data Reader** role to other administrators of the API center.  

For detailed prerequisites and steps to assign a role to users and groups, see [Assign Azure roles using the Azure portal](https://learn.microsoft.com/azure/role-based-access-control/role-assignments-portal). Brief steps follow:

1. In the [Azure portal](https://portal.azure.com), go to your API center.
1. In the sidebar menu, select **Access control (IAM)** > **+ Add role assignment**.
1. In the **Add role assignment** pane, set the values as follows:
    1. On the **Role** page, search for and select **Azure API Center Data Reader**. Select **Next**.
    1. On the **Members** page, In **Assign access to**, select **User, group, or service principal** > **+ Select members**.
    1. On the **Select members** page, search for and select the users or groups to assign the role to. Click **Select** and then **Next**.
    1. Review the role assignment, and select **Review + assign**.

> **Note:**
> To streamline access configuration for new users, we recommend that you assign the role to a Microsoft Entra group and configure a dynamic group membership rule. To learn more, see [Create or update a dynamic group in Microsoft Entra ID](https://learn.microsoft.com/entra/identity/users/groups-create-rule).

After you configure access to the portal, users can sign in to the portal and view the APIs in your API center.

> **Note:**
> The first user to sign in to the portal is prompted to consent to the permissions requested by the API Center portal app registration. Thereafter, other configured users aren't prompted to consent.

## Steps for enterprise developers to access the API Center portal view

Developers can follow these steps to connect and sign in to an API Center portal view using the Visual Studio Code extension. Settings to connect to the API center need to be provided by the API center administrator. After connecting, developers can discover and consume the APIs in the API center.

### Connect to an API center

1. In Visual Studio Code, in the Activity Bar on the left, select API Center.

    Screenshot of the API Center icon in the Activity Bar.

1. Use the **Ctrl+Shift+P** keyboard shortcut to open the Command Palette. Type **Azure API Center: Connect to an API Center** and hit **Enter**.
1. Answer the prompts to input the following information:
   1. The runtime URL of your API center, in the format `<service name>.data.<region>.azure-apicenter.ms` (don't prefix with `https://`). Example: `contoso-apic.data.eastus.azure-apicenter.ms`. This runtime URL appears on the **Overview** page of the API center in the Azure portal view.
      
    1. The application (client) ID from the app registration configured by the administrator in the previous section.
    1. The directory (tenant) ID from the app registration configured by the administrator in the previous section.

    > **Tip:**
    > An API center administrator needs to provide the preceding connection details to developers, or provide a direct link in the following format:  
    > `vscode://apidev.azure-api-center?clientId=<Client ID>&tenantId=<tenant ID>&runtimeUrl=<service-name>.data.<region>.azure-apicenter.ms`

    After you connect to the API center, the name of the API center appears in the API Center portal view. 
   
1. To view the APIs in the API center, under the API center name, select **Sign in to Azure**. Sign-in is allowed with a Microsoft account that is assigned the **Azure API Center Data Reader** role in the API center. 

    Screenshot of the API Center portal view in API Center extension.
   
1. After signing in, select **APIs** to list the APIs in the API center. Expand an API to explore its versions and definitions.

    Screenshot of the API Center API definitions in API Center extension.
   
1. Repeat the preceding steps to connect to more API centers, if access is configured.

### Discover and consume APIs in the API Center portal view

The API Center portal view helps enterprise developers discover API details and start API client development. Developers can access the following features by right-clicking on an API definition in the API Center portal view:

* **Export API specification document** - Export an API specification from a definition and then download it as a file
* **Generate API client** - Use the Microsoft Kiota extension to generate an API client for their favorite language
* **Generate Markdown** - Generate API documentation in Markdown format
* **OpenAPI documentation** - View the documentation for an API definition and try operations in a Swagger UI (only available for OpenAPI definitions)

## Use language model tools 

Developers with access to the API Center portal view can add API Center language model tools to use in GitHub Copilot's agent mode. [Learn more about using tools in agent mode](https://code.visualstudio.com/docs/copilot/chat/chat-agent-mode#_agent-mode-tools). 

The API Center tools can be used in agent mode to help search for APIs and API versions, API definitions and specifications, deployments, and more using natural language prompts.

To add and use API Center language mode tools in GitHub Copilot's agent mode:

1. [Connect to an API center](#create-microsoft-entra-app-registration) as described in a previous section.
1. Open GitHub Copilot Chat in Visual Studio Code. 
1. Set the mode of GitHub Copilot Chat to **Agent**.
1. Select the **Tools** icon in the chat window.

    Screenshot of GitHub Copilot chat window in Visual Studio Code.

1. Select one or more API Center tools to be available in the chat.

    Screenshot of selecting API Center tools in Visual Studio Code.

1. Enter a prompt in the chat window to use the available tools. For example:

    ```copilot-prompt
    Find potential MCP servers for a project I'm working on. I need the deployment URLs from my API center of any MCP servers that can run code snippets.
    ```

1. Review the responses from GitHub Copilot Chat. Continue with the conversation to refine the results or ask follow-up questions.


## Troubleshooting

### Unable to sign in to Azure

If users who have been assigned the **Azure API Center Data Reader** role can't complete the sign-in flow after selecting **Sign in to Azure** in the API Center portal view, there might be a problem with the configuration of the connection.

Check the settings in the app registration you configured in Microsoft Entra ID. Confirm the values of the application (client) ID and the directory (tenant) ID in the app registration and the runtime URL of the API center. Then, set up the connection to the API center again.

## Related content

* [Build and register APIs with the Azure API Center extension for Visual Studio Code](build-register-apis-vscode-extension.md)
* [Best practices for Azure RBAC](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/best-practices.md)

* [Register a resource provider](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/resource-providers-and-types.md#register-resource-provider)
