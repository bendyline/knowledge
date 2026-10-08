---
title: Self-host the API Center portal
description: How to self-host the API Center portal, a customer-managed website that enables discovery of the API inventory in your Azure API center.

ms.service: azure-api-center
ms.topic: how-to
ms.date: 05/01/2026
 
ms.custom: 
# Customer intent: As an API program manager, I want to self-host a portal for developers and other API stakeholders in my organization to discover the APIs in my organization's API center.
---

# Self-host your API Center portal

This article shows how to self-host the *API Center portal*, a website that developers and other stakeholders in your organization can use to discover the APIs in your [API center](overview.md). Deploy a reference implementation of the portal from the [API Center portal starter](https://github.com/Azure/APICenter-Portal-Starter.git) repository.

Self-hosting is an alternative to using the Azure-managed version of the API Center portal. For more information on the Azure-managed portal, see [Set up the API Center portal](set-up-api-center-portal.md).

Screenshot of the API Center portal after user sign-in.

## About self-hosting the portal

You can build and deploy a reference implementation of the portal using code in the [API Center portal starter](https://github.com/Azure/APICenter-Portal-Starter.git) repository. The portal uses the [Azure API Center data plane API](https://learn.microsoft.com/rest/api/dataplane/apicenter/operation-groups) to retrieve data from your API center. 

The API Center portal reference implementation provides:

* A framework for publishing and maintaining a customer-managed API portal using GitHub Actions
* A portal platform that customers can modify or extend to meet their needs
* Flexibility to host on different infrastructures, including deployment to services such as Azure Static Web Apps.  

> **Note:**
> When you self-host the API Center portal, you become its maintainer and you're responsible for its upgrades. Azure support is limited.


## Prerequisites

* An API center in your Azure subscription. If you haven't created one already, see [Quickstart: Create your API center](set-up-api-center.md).

* Permissions to create an app registration in a Microsoft Entra tenant associated with your Azure subscription, and permissions to grant access to data in your API center. 

* To build and deploy the portal, you need a GitHub account and the following tools installed on your local machine:

    * [Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
    * [Vite package](https://www.npmjs.com/package/vite)

## Create Microsoft Entra app registration


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


> **Note:**
> When you're self-hosting the portal and want to test it locally before deploying to Azure, set the redirect URI in the app registration to `https://localhost:5173`. 

## Configure local environment

Follow these steps to build and test the API Center portal locally.

1. Clone the [API Center portal starter](https://github.com/Azure/APICenter-Portal-Starter.git) repository to your local machine.

    ```bash
    git clone https://github.com/Azure/APICenter-Portal-Starter.git
    ```
1. Change to the `APICenter-Portal-Starter` directory.

    ```bash
    cd APICenter-Portal-Starter
    ```
1. Check out the main branch.

    ```bash
    git checkout main
    ```  
1. To configure the service, copy or rename the `config.example.json` file to `config.json`.
1. Then edit the `config.json` file to point to your service. Update the values in the file as follows:
    1. Replace `<service name>` and `<region>` with the name of your API center and the location where it's deployed
    1. Replace `<client ID>` and `<tenant ID>` with the **Application (client) ID** and **Directory (tenant) ID** of the app registration you created in the previous section.
    1. Update the value of `title` to a name that you want to appear in the top bar of the portal.

    ```json
    {
      "dataApiHostName": "<service name>.data.<region>.azure-apicenter.ms",
      "title": "API portal",
      "authentication": {
          "clientId": "<client ID>",
          "tenantId": "<tenant ID>",
          "scopes": ["https://azure-apicenter.net/Data.Read.All"],
          "authority": "https://login.microsoftonline.com/"
      }
    }
    ```

1. Install required packages.

    ```bash
    npm install
    ```

1. Start the development server. The following command starts the portal in development mode running locally:

    ```bash
    npm start
    ```

    Browse to the portal at `https://localhost:5173`.

## Deploy to Azure

For steps to deploy the portal to Azure Static Web Apps, see the [API Center portal starter](https://github.com/Azure/APICenter-Portal-Starter.git) repository.

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

## Troubleshooting

### Error: "You are not authorized to access this portal"

Under certain conditions, a user might encounter the following error message after signing into the API Center portal with a configured user account:

`You are not authorized to access this portal. Please contact your portal administrator for assistance.`
`

First, confirm that the user is assigned the **Azure API Center Data Reader** role in your API center.

If the user is assigned the role, there might be a problem with the registration of the **Microsoft.ApiCenter** resource provider in your subscription, and you might need to re-register the resource provider. To do this, run the following command in the Azure CLI:

```azurecli
az provider register --namespace Microsoft.ApiCenter
```

### Unable to sign in to portal

If users who have been assigned the **Azure API Center Data Reader** role can't complete the sign-in flow after selecting **Sign in** in the API Center portal, there might be a problem with the configuration of the Microsoft Entra ID identity provider.

In the Microsoft Entra app registration, review and, if needed, update the **Redirect URI** settings to ensure that the URI matches the URI of the API Center portal deployment.

### Unable to select Azure API Center permissions in Microsoft Entra app registration

If you're unable to request API permissions to Azure API Center in your Microsoft Entra app registration for the API Center portal, check that you are searching for **Azure API Center** (or application ID `c3ca1a77-7a87-4dba-b8f8-eea115ae4573`). 

If the app isn't present, there might be a problem with the registration of the **Microsoft.ApiCenter** resource provider in your subscription. You might need to re-register the resource provider. To do this, run the following command in the Azure CLI:

```azurecli
az provider register --namespace Microsoft.ApiCenter
```

After re-registering the resource provider, try again to request API permissions.

## Support policy

Provide feedback, request features, and get support for the API Center portal reference implementation in the [API Center portal starter](https://github.com/Azure/APICenter-Portal-Starter.git) repository.

## Related content

* [Set up the API Center portal](set-up-api-center-portal.md)
* [What is Azure role-based access control (RBAC)?](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/overview.md)
* [Best practices for Azure RBAC](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/best-practices.md)
* [Register a resource provider](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/resource-providers-and-types.md#register-resource-provider)
