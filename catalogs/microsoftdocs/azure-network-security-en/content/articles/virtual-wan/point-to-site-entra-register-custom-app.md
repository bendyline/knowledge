---
title: Create custom app ID for P2S VPN Microsoft Entra ID authentication
titleSuffix: Azure Virtual WAN
description: Learn how to create or modify a custom audience App ID or upgrade an existing custom App ID to the new Microsoft-registered Azure VPN Client app values for Azure Virtual WAN.
author: duongau
ms.service: azure-virtual-wan
ms.topic: concept-article
ms.date: 02/25/2025
ms.author: duau
---

# Create or modify a custom audience app ID for User VPN Microsoft Entra ID authentication

The steps in this article help you create a Microsoft Entra ID custom App ID (custom audience) for the new Microsoft-registered Azure VPN Client for User VPN point-to-site (P2S) connections. You can also update your existing tenant to [change the new Microsoft-registered Azure VPN Client app](#change) from the previous Azure VPN Client app.

This article provides high-level steps. The screenshots to register an application might be slightly different, depending on the way you access the user interface, but the settings are the same. For more information, see [Quickstart: Register an application](https://learn.microsoft.com/entra/identity-platform/quickstart-register-app).

## Prerequisites

* This article assumes that you already have a Microsoft Entra tenant and the permissions to create an Enterprise Application, typically the [Cloud Application Administrator role](https://learn.microsoft.com/entra/identity/role-based-access-control/permissions-reference#cloud-application-administrator) or higher. For more information, see [Create a new tenant in Microsoft Entra ID](https://learn.microsoft.com/entra/fundamentals/create-new-tenant) and [Assign user roles with Microsoft Entra ID](https://learn.microsoft.com/entra/fundamentals/users-assign-role-azure-portal).

* We recommend that you use the audience value `c632b3df-fb67-4d84-bdcf-b95ad541b5c8` to configure your custom app. This value has global consent, which means you don't need to manually register it to provide consent for your organization.

> **Important:**
>Manually registered Azure VPN Clients used for Point-to-Site (P2S) connections with Microsoft Entra ID authentication will retire on March 31, 2028 in Azure Public Cloud, and on March 31, 2029 in Azure Government and Microsoft Azure operated by 21Vianet clouds. \
>After these dates, manually registered clients will no longer function, and only Microsoft-registered VPN clients will be supported after the retirement dates.
>
>To avoid any service disruption, [migrate manually registered VPN clients](point-to-site-entra-gateway-update.md) to a Microsoft-registered VPN client for point-to-site connections with Microsoft Entra ID authentication before the applicable retirement dates.

  1. To grant admin consent for your organization, modify the following command to contain the desired `client_id` value. See the [table](../vpn-gateway/point-to-site-about.md#entra-id) for additional supported values.

     ```https://login.microsoftonline.com/common/oauth2/authorize?client_id=41b23e61-6c1e-4545-b367-cd054e0ed4b4&response_type=code&redirect_uri=https://portal.azure.com&nonce=1234&prompt=admin_consent```

  1. Copy and paste the URL that pertains to your deployment location in the address bar of your browser.
  1. Select the account that has the [Cloud Application Administrator role](https://learn.microsoft.com/entra/identity/role-based-access-control/permissions-reference#cloud-application-administrator) if prompted.
  1. On the **Permissions** requested page, select **Accept**.


## Register an application

There are a couple of different ways to get to the **App registrations** page. One way is through the [Microsoft Entra admin center](https://entra.microsoft.com). You can also use the Azure portal and **Microsoft Entra ID**. Sign in with an account that has the [Cloud Application Administrator](https://learn.microsoft.com/entra/identity/role-based-access-control/permissions-reference#cloud-application-administrator) role or higher.

1. If you have access to multiple tenants, use the **Settings** icon in the top menu to switch to the tenant in which you want to register the application from the **Directories + subscriptions** menu.
1. Go to **App registrations** and select **New registration**.

   Screenshot shows the app registrations page with new registration selected.
1. On the **Register an application** page, enter a display **Name** for your application. Users of your application might see the display name when they use the app, for example during sign-in. You can change the display name at any time. Multiple app registrations can share the same name. The app registration's automatically generated Application (client) ID uniquely identifies your app within the identity platform.

   Screenshot shows the register an application page.
1. Specify who can use the application, sometimes called its *sign-in audience*. Select **Accounts in this organizational directory only (nameofyourdirectory only - Single tenant)**.
1. Leave **Redirect URI (optional)** alone for now as you configure a redirect URI in the next section.
1. Select **Register** to complete the initial app registration.

When registration finishes, the Microsoft Entra admin center displays the app registration's **Overview** pane. You see the **Application (client) ID**. Also called the *client ID*, this value uniquely identifies your application in the Microsoft identity platform. This is the custom audience value that you use when you configure your P2S gateway. Even though this value is present, you still need to complete the next sections to associate the Microsoft-registered application to your application ID.

## Expose an API and add a scope

In this section, you create a scope to assign granular permissions.

1. In the left pane for the registered app, select **Expose an API**.

   Screenshot shows the Expose an API page.
1. Select **Add a scope**. On the **Add a scope** pane, view the Application ID URI. This field is generated automatically. This defaults to `api://<application-client-id>`. The App ID URI acts as the prefix for the scopes that you reference in your API's code, and it must be globally unique.

   Screenshot shows the Add a scope pane with the Application ID URI.

1. Select **Save and continue** to proceed to the next **Add a scope** pane.
1. In this **Add a scope** pane, specify the scope's attributes. For this walk-through, you can use the example values or specify your own.

   Screenshot shows the Add a scope pane with more settings.

    | Field | Value |
    | --- | --- |
    | **Scope name** | Example: *p2s-vpn1* |
    | **Who can consent** | **Admins only** |
    | **Admin consent display name** | Example: *p2s-vpn1-users* |
    | **Admin consent description** | Example: *Access to the P2S VPN* |
    | **State** | **Enabled** |

1. Select **Add scope** to add the scope.

## Add the Azure VPN Client application

In this section, you associate the Microsoft-registered Azure VPN Client application ID.

1. On the **Expose an API** page, select **+ Add a client application**.

   Screenshot shows the Add a client application selected.
1. On the **Add a client application** pane, for **Client ID**, use the Azure Public Application ID for the Microsoft-registered Azure VPN Client app, `c632b3df-fb67-4d84-bdcf-b95ad541b5c8` unless you know you need a different value.

   Screenshot shows the add a client application pane.
1. Make sure **Authorized scopes** is selected.
1. Select **Add application**.

## Gather values

On the **Overview** page for your application, make a note of the following values that you need when you configure your point-to-site VPN gateway for Microsoft Entra ID authentication.

* Application (client) ID: This is the custom Audience ID that you use for the **Audience** field when you configure your P2S VPN gateway.
* Directory (tenant) ID: This value is part of the value required for the **Tenant** and **Issuer** field for the P2S VPN gateway.


## Configure the gateway

After you've completed the steps in the previous sections, continue to [Configure Virtual WAN User VPN for Microsoft Entra ID authentication](point-to-site-entra-gateway.md).

## <a name="change"></a>Update to Microsoft-registered VPN app Client ID

> **Note:**
> While these steps can be used for any of the supported values associated with the Azure VPN Client app, we recommend that you associate the Microsoft-registered App ID value `c632b3df-fb67-4d84-bdcf-b95ad541b5c8` to your custom app.


If you've already configured your P2S VPN gateway to use a custom value for the **Audience ID** field and you want to change to the new Microsoft-registered Azure VPN Client, you can authorize the new application by adding the client application to your API. Using this method, you don't need to change the settings on the Azure VPN gateway or your Azure VPN Clients if they're using the latest version of the client.

In the following steps, you add another authorized client application using the Microsoft-registered Azure VPN client App ID audience value. You don't change the value of the existing authorized client application. You can always delete the existing authorized client application if you're no longer using it.

1. There are a couple of different ways to get to the App registrations page. One way is through the [Microsoft Entra admin center](https://entra.microsoft.com). You can also use the Azure portal and **Microsoft Entra ID**. Sign in with an account that has the [Cloud Application Administrator](https://learn.microsoft.com/entra/identity/role-based-access-control/permissions-reference#cloud-application-administrator) role or higher.
1. If you have access to multiple tenants, use the **Settings** icon in the top menu to switch to the tenant you want to use from the **Directories + subscriptions** menu.
1. Go to **App registrations** and locate display name for the registered app. Click to open the page.
1. Click **Expose an API**. On the **Expose an API** page, notice the previous Azure VPN Client audience value `Client Id` is present.

   Screenshot shows the Expose an API page with Add a client application highlighted.
1. Select **+ Add a client application**.
1. On the **Add a client application** pane, for **Client ID**, use the Application ID for the Microsoft-registered Azure VPN Client app, `c632b3df-fb67-4d84-bdcf-b95ad541b5c8`.
1. Make sure **Authorized scopes** is selected. Then, click **Add application**.
1. On the **Expose an API** page, you'll now see both Client ID values listed. If you want to delete the previous version, click the value to open the **Edit a client application** page, and click **Delete**.
1. On the **Overview** page, notice that the values haven't changed. If you've already configured your gateway and clients using the custom Application (client) ID shown for the gateway **Audience ID** field and your clients are already configured to use this custom value, you don't need to make any additional changes.


## Next steps

[Configure Virtual WAN P2S User VPN for Microsoft Entra ID authentication](point-to-site-entra-gateway.md).
