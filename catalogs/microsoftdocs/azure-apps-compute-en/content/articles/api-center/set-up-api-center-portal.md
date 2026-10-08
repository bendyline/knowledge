---
title: Set Up the API Center Portal
description: How to set up the API Center portal, a managed website that enables discovery of the API inventory in your Azure API center.

ms.service: azure-api-center
ms.topic: how-to
ms.date: 06/02/2026
ms.update-cycle: 180-days
 
ms.custom: 
ms.collection: 
# Customer intent: As an API program manager, I want to enable an Azure-managed portal for developers and other API stakeholders in my organization to discover the APIs in my organization's API center.
---

# Set up and customize your API Center portal

This article shows you how to set up and customize the *API Center portal*, an Azure-managed website for discovering APIs, MCP servers, and related assets in your [API center](overview.md). 

The API Center portal supports and streamlines the work of developers who use and create APIs within your organization. Users with access can:

* **Search for APIs** by name or use AI-assisted semantic search.
* **Filter APIs** by type, lifecycle stage, and other properties.
* **View API details and definitions** including endpoints, methods, parameters, and response formats.
* **Download API definitions** to their computer or open in Visual Studio Code.
* **Try out APIs** with API key or OAuth 2.0 authentication.

Screenshot of the API Center portal after user sign-in.

> **Tip:**
> Both Azure API Management and Azure API Center provide API portal experiences for developers. [Compare the portals](#api-management-and-api-center-portals).


## Prerequisites

* An API center in your Azure subscription. If you haven't created one already, see [Quickstart: Create your API center](set-up-api-center.md).

* Permissions to create an app registration in a Microsoft Entra tenant associated with your Azure subscription, and permissions to grant access to data in your API center. 

## Configure access to the API Center portal

First, choose how you want users to access the API Center portal. You can set up Microsoft Entra ID as an identity provider or allow anonymous access.

### Option 1: Configure Microsoft Entra ID authentication for the portal (recommended)


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


### Option 2: Allow anonymous access to the portal

To enable anonymous access, follow these steps.

> **Caution:**
> If you configure anonymous access, anyone can view the APIs in your API center without signing in. Don't expose sensitive information in API definitions or settings.

1. In the [Azure portal](https://portal.azure.com), go to your API center.
1. In the sidebar menu, select **Consumption** > **Portal settings**.
1. On the **Access** tab, select **Allow anonymous access**.

    Screenshot showing configuration of anonymous access in the portal.
1. To configure access, select **Confirm and Enable**.

<a id="access-the-portal"></a> 
## View the portal

After configuring access, open the API Center portal by selecting **View API Center portal** on the **Portal settings** page, or visit:<br/>
`https://<service-name>.portal.<location>.azure-apicenter.ms`

(Replace `<service-name>` and `<location>` with your API center name and deployment location.)

By default, the portal home page is publicly reachable. If Microsoft Entra ID is configured for access, users must select **Sign-in** to access APIs. See [Enable sign-in to portal by Microsoft Entra users and groups](#enable-sign-in) for details on configuring user access.

* Add filters on the home page to display assets of certain types or that match certain metadata values.
* Select an API or other registered asset to view its details, such as endpoints, methods, parameters, and response formats. You can also download API definitions or open them in Visual Studio Code.

<a id="enable-sign-in"></a>
## Enable sign-in to portal by Microsoft Entra users and groups 


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

## Customize the API Center portal

The following sections show you how to customize the API Center portal experience for users. For more extensive customization, you can also choose to [self-host the API Center portal](self-host-api-center-portal.md).

> **Important:**
> Select **Save + publish** after making changes. Changes aren't visible until published.
> Screenshot of Save + Publish button in the Azure portal.

### Site profile

On the **Site profile** tab of the API Center portal settings, optionally provide a custom name to appear in the top bar of the portal.

Screenshot of custom name in API Center portal.

### API visibility

On the **Consumption** > **Data API settings** page, control which APIs are discoverable (visible) to API Center portal users. Visibility settings apply to all users of the API Center portal and related consumption features that use the API Center data plane API.

> **Note:**
> The API Center portal uses the [Azure API Center data plane API](https://learn.microsoft.com/rest/api/dataplane/apicenter/operation-groups) to retrieve and display APIs in your API center. By default, it makes all APIs visible to users with access. 
> 

To make only specific APIs visible, add filter conditions for APIs based on built-in properties. For example, display APIs only of certain types, like REST or GraphQL, or based on certain specification formats, such as OpenAPI.

Screenshot of adding API visibility conditions in the portal.

### Semantic search

If you enable semantic search on the **Semantic search** tab, the API Center portal supplements basic name-based API search with AI-assisted *semantic search* built on API names, descriptions, and optionally custom metadata. Semantic search is available in the **Standard** plan only.

Users can search for APIs by using natural language queries to find APIs based on their intent. For example, if a developer searches for "I need an API for inventory management," the portal can suggest relevant APIs, even if the API names or descriptions don't include those exact words.

> **Tip:**
> If you use the **Free** plan of Azure API Center, you can [upgrade](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-center/frequently-asked-questions.yml#how-do-i-upgrade-my-api-center-from-the-free-plan-to-the-standard-plan) to the **Standard** plan to enable full service features including semantic search in the API Center portal.

To use AI-assisted search when signed in to the API Center portal, select the search box, choose **Search with AI**, and enter a query.

Screenshot of semantic search results in API Center portal.

### Custom metadata

On the **Metadata** tab, optionally select [custom metadata](metadata.md) properties that you want to expose in API details and semantic search.

### Contributions

On the **Contribution** tab, optionally enter a Git repo URL to enable visitors to share their own assets by using the repo. For example, visitors can browse the repo, or submit PRs to add or update plugins, agents, or skills. 

After you enter a Git repo URL, the portal displays a **Contribute** button on the home page. Visitors can select this button to open the repo in a new browser tab.

Screenshot of the Contribute button in the API Center portal.

## Enable access to test console for APIs

You can configure user settings to granularly authorize access to APIs and specific versions in your API center. For example, configure certain API versions to use API keys for authentication, and create an access policy that permits specific users to authenticate by using those keys. 

Access policies also apply to the "Try this API" capability for APIs in the API Center portal, ensuring that only portal users with the appropriate access policy can use the test console for those API versions. [Learn more about authorizing access to APIs](authorize-api-access.md).


## API Management and API Center portals

The [Azure API Management](../api-management/api-management-key-concepts.md) and [Azure API Center](overview.md) services both provide portals for developers to discover and consume APIs:

* The *API Management developer portal* allows users to find managed APIs (including groups of APIs managed as products), learn how to use them, request access, and test them.
* The *API Center portal* is a multigateway portal where users can discover and filter the organization's complete API inventory.

While the two portals share some features, they also have distinct differences. The following table compares current capabilities to help determine which portal to use. Some organizations might prefer one portal, while others might need both.

| Feature | API Management developer portal | API Center portal |
| --- | --- | --- |
| Search and filter API inventory | API Management instance only | All APIs<sup>1</sup> |
| View API details and definitions | ✔️ | ✔️ |
| View API documentation | ✔️ | ✔️ |
| Customize with branding | ✔️ | Name only |
| Integrate with Microsoft Entra ID | ✔️ | ✔️ |
| Add custom widgets | ✔️ | ❌ |
| Customize with WordPress | ✔️ | ❌ |
| Test APIs in test console | ✔️ | ✔️ |
| Subscribe to APIs and products | ✔️ | ❌ |
| View API usage analytics | ✔️ | ❌ |

<sup>1</sup> The API Center portal can contain all APIs in your organization, including those managed in Azure API Management and other platforms, as well as unmanaged APIs and APIs under development.

## Related content

* [Enable and view Azure API Center portal in Visual Studio Code](enable-api-center-portal-vs-code-extension.md)
* [Self-host the API Center portal](self-host-api-center-portal.md)
