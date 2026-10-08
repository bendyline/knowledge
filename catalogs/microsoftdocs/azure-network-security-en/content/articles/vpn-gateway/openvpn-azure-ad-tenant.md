---
title: 'Configure a P2S VPN - Microsoft Entra ID authentication - manually registered Azure VPN Client App ID'
titleSuffix: Azure VPN Gateway
description: Learn how to set up a Microsoft Entra tenant and P2S gateway for P2S Microsoft Entra authentication - OpenVPN protocol.
author: duongau
ms.service: azure-vpn-gateway
ms.topic: how-to
ms.date: 02/25/2025
ms.author: duau
ms.custom: sfi-image-nochange

#Note that Audience values are not sensitive data. 

# Customer intent: As a network administrator, I want to configure a point-to-site VPN gateway for Microsoft Entra ID authentication, so that I can securely connect users to the virtual network using OpenVPN protocol.
---

# Configure P2S VPN gateway for Microsoft Entra ID authentication – manually registered app

This article helps you configure a point-to-site (P2S) VPN gateway for Microsoft Entra ID authentication and manually register the Azure VPN client. This type of configuration is supported only for OpenVPN protocol connections. While the steps and Audience values in this article do result in a working configuration, we recommend that you use the [Configure P2S VPN Gateway for Microsoft Entra ID authentication](point-to-site-entra-gateway.md) article instead.

> **Important:**
>Manually registered Azure VPN Clients used for Point-to-Site (P2S) connections with Microsoft Entra ID authentication will retire on March 31, 2028 in Azure Public Cloud, and on March 31, 2029 in Azure Government and Microsoft Azure operated by 21Vianet clouds.
>After these dates, manually registered clients will no longer function, and only Microsoft-registered VPN clients will be supported after the retirement dates.
>
>To avoid any service disruption, [migrate manually registered VPN clients](point-to-site-entra-gateway-update.md) to a Microsoft-registered VPN client for point-to-site connections with Microsoft Entra ID authentication before the applicable retirement dates.

## Prerequisites

The steps in this article require a Microsoft Entra tenant. If you don't have a Microsoft Entra tenant, you can create one using the steps in the [Create a new tenant](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/fundamentals/active-directory-access-create-new-tenant.md) article. Note the following fields when creating your directory:

* Organizational name
* Initial domain name

If you already have an existing P2S gateway, the steps in this article help you configure the gateway for Microsoft Entra ID authentication. You can also create a new VPN gateway. The link to create a new gateway is included in this article.

> **Note:**
> Microsoft Entra ID authentication is supported only for OpenVPN® protocol connections and requires the Azure VPN Client.
>


## <a name='create-azure-ad-tenant-users'></a>Create Microsoft Entra tenant users

1. Create two accounts in the newly created Microsoft Entra tenant. For steps, see [Add or delete a new user](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/fundamentals/add-users-azure-active-directory.md).

   * [Cloud Application Administrator role](https://learn.microsoft.com/entra/identity/role-based-access-control/permissions-reference#cloud-application-administrator)
   * User account

   The Cloud Application Administrator role is used to grant consent to the Azure VPN app registration. The user account can be used to test OpenVPN authentication.
1. Assign one of the accounts the **Cloud Application Administrator** role. For steps, see  [Assign administrator and non-administrator roles to users with Microsoft Entra ID](https://learn.microsoft.com/azure/active-directory-b2c/tenant-management-read-tenant-name).

## Authorize the Azure VPN application

1. Sign in to the Azure portal as a user that is assigned the **Cloud Application Administrator** role.

1. Next, grant admin consent for your organization. This allows the Azure VPN application to sign in and read user profiles. Copy and paste the URL that pertains to your deployment location in the address bar of your browser:

    Public

    ```
    https://login.microsoftonline.com/common/oauth2/authorize?client_id=41b23e61-6c1e-4545-b367-cd054e0ed4b4&response_type=code&redirect_uri=https://portal.azure.com&nonce=1234&prompt=admin_consent
    ````

    Azure Government

    ```
    https://login.microsoftonline.us/common/oauth2/authorize?client_id=51bb15d4-3a4f-4ebf-9dca-40096fe32426&response_type=code&redirect_uri=https://portal.azure.us&nonce=1234&prompt=admin_consent
    ````

    Microsoft Cloud Germany

    ```
    https://login-us.microsoftonline.de/common/oauth2/authorize?client_id=538ee9e6-310a-468d-afef-ea97365856a9&response_type=code&redirect_uri=https://portal.microsoftazure.de&nonce=1234&prompt=admin_consent
    ````

    Microsoft Azure operated by 21Vianet

    ```
    https://login.chinacloudapi.cn/common/oauth2/authorize?client_id=49f817b6-84ae-4cc0-928c-73f27289b3aa&response_type=code&redirect_uri=https://portal.azure.cn&nonce=1234&prompt=admin_consent
    ```

   > **Note:**
   > If you're using a Cloud Application Administrator account that is not native to the Microsoft Entra tenant to provide consent, replace "common" with the Microsoft Entra tenant ID in the URL. You may also have to replace "common" with your tenant ID in certain other cases as well. For help with finding your tenant ID, see [How to find your Microsoft Entra tenant ID](https://learn.microsoft.com/azure/active-directory-b2c/tenant-management-read-tenant-name).
   >

1. Select the account that has the **Cloud Application Administrator** role if prompted.

1. On the **Permissions requested** page, select **Accept**.

1. Go to **Microsoft Entra ID**. In the left pane, click **Enterprise applications**. You'll see **Azure VPN** listed.

   Screenshot of the Enterprise application page showing Azure V P N listed.


## <a name="enable-authentication"></a>Configure the VPN gateway

> **Important:**
> 
The Azure portal is in the process of updating Azure Active Directory fields to Entra. If you see Microsoft Entra ID referenced and you don't see those values in the portal yet, you can select Azure Active Directory values.


1. Locate the tenant ID of the directory that you want to use for authentication. It's listed in the properties section of the Active Directory page. For help with finding your tenant ID, see [How to find your Microsoft Entra tenant ID](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/fundamentals/how-to-find-tenant.md).

1. If you don't already have a functioning point-to-site environment, follow the instruction to create one. See [Create a point-to-site VPN](point-to-site-certificate-gateway.md) to create and configure a point-to-site VPN gateway. When you create a VPN gateway, the Basic SKU isn't supported for OpenVPN.

1. Go to the virtual network gateway. In the left pane, select **Point-to-site configuration**.

   Screenshot showing settings for Tunnel type, Authentication type, and Microsoft Entra settings.

   Configure the following values:

   * **Address pool**: client address pool
   * **Tunnel type:** OpenVPN (SSL)
   * **Authentication type**: Microsoft Entra ID

   For **Microsoft Entra ID** values, use the following guidelines for **Tenant**, **Audience**, and **Issuer** values. Replace {TenantID} with your tenant ID, taking care to remove **{}** from the examples when you replace this value.

   * **Tenant:** TenantID for the Microsoft Entra tenant. Enter the tenant ID that corresponds to your configuration. Make sure the Tenant URL doesn't have a `\` (backslash) at the end. Forward slash is permissible.

     * Azure Public AD: `https://login.microsoftonline.com/{TenantID}`
     * Azure Government AD: `https://login.microsoftonline.us/{TenantID}`
     * Azure Germany AD: `https://login-us.microsoftonline.de/{TenantID}`
     * China 21Vianet AD: `https://login.chinacloudapi.cn/{TenantID}`

   * **Audience**: The Application ID of the "Azure VPN" Microsoft Entra Enterprise App.

     * Azure Public: `41b23e61-6c1e-4545-b367-cd054e0ed4b4`
     * Azure Government: `51bb15d4-3a4f-4ebf-9dca-40096fe32426`
     * Azure Germany: `538ee9e6-310a-468d-afef-ea97365856a9`
     * Microsoft Azure operated by 21Vianet: `49f817b6-84ae-4cc0-928c-73f27289b3aa`

   * **Issuer**: URL of the Secure Token Service. Include a trailing slash at the end of the **Issuer** value. Otherwise, the connection might fail. Example:

     * `https://sts.windows.net/{TenantID}/`

1. When you finish configuring settings, select **Save** at the top of the page.

## Download the Azure VPN Client profile configuration package

In this section, you generate and download the Azure VPN Client profile configuration package. This package contains the settings that you can use to configure the Azure VPN Client profile on client computers.


1. At the top of the **Point-to-site configuration** page, click **Download VPN client**. It takes a few minutes for the client configuration package to generate.

1. Your browser indicates that a client configuration zip file is available. It's named the same name as your gateway.

1. Extract the downloaded zip file.

1. Browse to the unzipped "AzureVPN" folder.

1. Make a note of the location of the “azurevpnconfig.xml” file. The azurevpnconfig.xml contains the setting for the VPN connection. You can also distribute this file to all the users that need to connect via e-mail or other means. The user will need valid Microsoft Entra ID credentials to connect successfully.


## Next steps

* To connect to your virtual network, you must configure the Azure VPN client on your client computers. See [Configure a VPN client for P2S Microsoft Entra ID authentication connections](point-to-site-entra-vpn-client.md).
* For frequently asked questions, see the **Point-to-site** section of the [VPN Gateway FAQ](vpn-gateway-vpn-faq.md#P2S).
