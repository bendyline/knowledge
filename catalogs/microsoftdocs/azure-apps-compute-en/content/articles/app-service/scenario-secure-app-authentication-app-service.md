---
title: Quickstart - Add app authentication to a web app
description: Learn how to enable app authentication for a web app running on Azure App Service. Limit access to the web app to users in your organization​.
author: cephalin
ms.author: cephalin
ms.service: azure-app-service
ms.topic: tutorial
ms.date: 04/17/2026
ms.reviewer: mahender
ms.custom: azureday1, AppServiceIdentity
#Customer intent: As an application developer, enable authentication and authorization for a web app running on Azure App Service.
---

# Quickstart: Add app authentication to your web app running on Azure App Service


Learn how to enable authentication for your web app running on Azure App Service and limit access to users in your organization.

In this tutorial, you learn how to:

> 
>
> * Configure authentication for the web app.
> * Limit access to the web app to users in your organization by using Microsoft Entra as the identity provider.

## Automatic authentication provided by App Service

App Service provides built-in authentication and authorization support, so you can sign in users with no code in your web app. Using the optional App Service authentication/authorization module simplifies authentication and authorization for your app. When you're ready for custom authentication and authorization, you build on this architecture.

App service authentication provides:

* Easily turn on and configure through the Azure portal and app settings. 
* No SDKs, specific languages, or changes to application code are required.​ 
* Several identity providers are supported:
    * Microsoft Entra
    * Microsoft Account
    * Facebook
    * Google
    * X

When the authentication/authorization module is enabled, every incoming HTTP request passes through it before being handled by your app code.​​ To learn more, see [Authentication and authorization in Azure App Service](overview-authentication-authorization.md).



## 1. Prerequisites

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/quickstarts-free-trial-note.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/app-service/scenario-secure-app-authentication-app-service.md)

## 2. Create and publish a web app on App Service

For this tutorial, you need a web app deployed to App Service. You can use an existing web app, or you can follow one of the quickstarts to create and publish a new web app to App Service:

* [ASP.NET Core](quickstart-dotnetcore.md)
* [Node.js](quickstart-nodejs.md) 
* [Python](quickstart-python.md)
* [Java](quickstart-java.md)

Whether you use an existing web app or create a new one, take note of the following: 

* **Web app name**.
* **Resource group** that the web app is deployed to. 

You need these names throughout this tutorial. 

## 3. Configure authentication and authorization

Now that you have a web app running on App Service, enable authentication and authorization. You use Microsoft Entra as the identity provider. For more information, see [Configure Microsoft Entra authentication for your App Service application](configure-authentication-provider-aad.md).

# [Workforce configuration](#tab/workforce-configuration)

1. In the [Azure portal](https://portal.azure.com) menu, select **Resource groups**, or search for and select **Resource groups** from any page.

1. In **Resource groups**, find and select your resource group. In **Overview**, select your app's management page.

    Screenshot that shows selecting your app's management page.
    
1. On your app's left menu, select **Authentication**, and then select **Add identity provider**.

1. In the **Add an identity provider** page, select **Microsoft** as the **Identity provider** to sign in Microsoft and Microsoft Entra identities.

1. For **Tenant type**, select **Workforce configuration (current tenant)** for employees and business guests.

1. For **App registration** > **App registration type**, select **Create new app registration** to create a new app registration in Microsoft Entra.

1. Enter a display **Name** for your application. Users of your application might see the display name when they use the app, for example during sign-in.

1. For **Client secret expiration**, select **Recommended: 180 days**.

1. For **App registration** > **Supported account types**, select **Current tenant-single tenant** so only users in your organization can sign in to the web app.

1. In the **Additional checks** section, select:

    - **Allow requests only from this application itself** for **Client application requirement**
    - **Allow requests from any identity** for **Identity requirement**
    - **Allow requests only from the issuer tenant** for **Tenant requirement** 

1. In the **App Service authentication settings** section, set:
    - **Require authentication** for **Authentication**
    - **HTTP 302 Found redirect: recommended for websites** for **Unauthenticated requests**
    - **Token store** box

1. At the bottom of the **Add an identity provider** page, select **Add** to enable authentication for your web app.

    Screenshot that shows configuring authentication.
    
    You now have an app that's secured by the App Service authentication and authorization.

    > **Note:**
    > To allow accounts from other tenants, change the 'Issuer URL' to 'https://login.microsoftonline.com/common/v2.0' by editing your 'Identity Provider' from the 'Authentication' blade.
    >

# [External configuration](#tab/external-configuration)

1. In the [Azure portal](https://portal.azure.com) menu, select **Resource groups**, or search for and select **Resource groups** from any page.

1. In **Resource groups**, find and select your resource group. In **Overview**, select your app's management page.

    Screenshot that shows selecting your app's management page.
    
1. On your app's left menu, select **Authentication**, and then select **Add identity provider**.

1. In the **Add an identity provider** page, select **Microsoft** as the **Identity provider** to sign in Microsoft and Microsoft Entra identities.

1. For **Tenant type**, select **External configuration** for external users.

1. Select **Create new app registration** to create a new app registration.

1. Select an existing tenant to use from the drop-down, or select **Create new** to create a new [external tenant](https://learn.microsoft.com/entra/external-id/customers/quickstart-tenant-setup).

    Screenshot that shows the Select a tenant dropdown.

1. (Optional) In the **Create a tenant** page, add the *Tenant Name** and **Domain Name**.  Select a **Location** and select **Review and create** and then **Create**.

    Screenshot the Create a tenant page.

1. Select **Configure** to configure external authentication.

1. The browser opens **Configure customer authentication**.  In **Setup sign-in**, select **Create new** to create a sign-in experience for your external users.

1. Enter a **Name** for the user flow.

1. For this quickstart, select **Email and password** which allows new users to sign up and sign in using an email address as the sign-in name and a password as their first factor credential.

1. Select **Create** to create the user flow.

    Screenshot that shows creating a user flow.

1. Select **Next** to customize branding.

1. Add your company logo, select a background color, and select a sign-in layout.

    Screenshot that shows the customized branding tab.

1. Select **Next**.  If the tenant you selected already has a branding configuration you will need to confirm that you want to override it.

1. Select **Configure** in the **Review** tab to confirm external tenant update. 

1. The browser returns to the **Add an identity provider** page.

1. In the **Additional checks** section, select:

    - **Allow requests only from this application itself** for **Client application requirement**
    - **Allow requests from any identity** for **Identity requirement**
    - **Allow requests only from the issuer tenant** for **Tenant requirement**    

1. In the **App Service authentication settings** section, set:
    - **Require authentication** for **Authentication**
    - **HTTP 302 Found redirect: recommended for websites** for **Unauthenticated requests**
    - **Token store** box

1. At the bottom of the **Add an identity provider** page, select **Add** to enable authentication for your web app.

    Screenshot that shows the Additional checks and authentication settings sections.
---

## 4. Verify limited access to the web app

When you enabled the App Service authentication/authorization module in the previous section, an app registration was created in your workforce or external tenant. The app registration has the display name you created in a previous step. 

1. To check the settings, sign in to the [Microsoft Entra admin center](https://entra.microsoft.com) as at least an [Application Developer](https://learn.microsoft.com/entra/identity/role-based-access-control/permissions-reference#application-developer).
1. If you chose external configuration, use the **Settings** icon in the top menu to switch to the external tenant with your web app from the **Directories** + **subscriptions** menu. 

1. Browse to **Entra ID** > **App registrations**, and select **App registrations** from the menu. 
1. Select the app registration that was created. 
1. In the overview, verify that **Supported account types** is set to **My organization only**.
    
1. To verify that access to your app is limited to users in your organization, go to your web app **Overview** and select the **Default domain** link.

    Screenshot that shows verifying access.

1. You should be directed to a secured sign-in page, verifying that unauthenticated users aren't allowed access to the site.
1. Sign in as a user in your organization to gain access to the site.

1. To verify that users outside the organization don't have access, open another incognito or private browser window and try to sign in by using a personal Microsoft account. The sign-in should fail or be denied.

## 5. Clean up resources


If you completed all the steps in this multipart tutorial, you created an App Service, App Service hosting plan, and a storage account in a resource group. You also created an app registration in Microsoft Entra ID. If you chose external configuration, you might have created a new external tenant. When no longer needed, delete these resources and app registration so that you don't continue to accrue charges.

In this tutorial, you learn how to:

> 
>
> - Delete the Azure resources created while following the tutorial.

### Delete the resource group

1. In the [Azure portal](https://portal.azure.com), from the Azure portal menu, select **Resource groups**.
1. Select the resource group that contains your App Service and App Service plan.
1. Select **Delete resource group** to delete the resource group and all the resources.

   Screenshot that shows deleting the resource group.

This action might take several minutes.

### Delete the app registration

1. In the [Microsoft Entra admin center](https://entra.microsoft.com), select **App registrations**. Then select the application you created.

   Screenshot that shows selecting app registration.

1. In the app registration overview, select **Delete**.

   Screenshot that shows deleting the app registration.

### Delete the external tenant

If you created a new external tenant, you can [delete it](https://learn.microsoft.com/entra/external-id/customers/how-to-delete-external-tenant-portal).  

1. In the [Microsoft Entra admin center](https://entra.microsoft.com), browse to **Entra ID** > **Overview** > **Manage tenants**.

1. Select the tenant you want to delete, and then select **Delete**.

   You might need to complete required actions before you can delete the tenant. For example, you might need to delete all user flows and app registrations in the tenant.

1. If you're ready to delete the tenant, select **Delete**.


## Next steps

In this tutorial, you learned how to:

> 
>
> * Configure authentication for the web app.
> * Limit access to the web app to users in your organization.


> 
> [App Service accesses storage](scenario-secure-app-access-storage.md)
