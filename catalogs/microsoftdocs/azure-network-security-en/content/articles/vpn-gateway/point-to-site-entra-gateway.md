---
title: 'Configure P2S VPN gateway for Microsoft Entra ID authentication: Microsoft-registered client'
titleSuffix: Azure VPN Gateway
description: Learn how to configure P2S gateway settings and Microsoft Entra ID authentication using Microsoft-registered Azure VPN Client.
author: duongau
ms.service: azure-vpn-gateway
ms.topic: how-to
ms.date: 02/13/2025
ms.author: duau
ms.custom:
  - linux-related-content
  - sfi-image-nochange
# Customer intent: As an VPN Gateway administrator, I want to configure point-to-site to allow Microsoft Entra ID authentication using the Microsoft-registered Azure VPN Client APP ID.
---

# Configure P2S VPN Gateway for Microsoft Entra ID authentication

This article helps you configure your point-to-site (P2S) VPN gateway for Microsoft Entra ID authentication using the new **Microsoft-registered Azure VPN Client App ID**.

VPN Gateway now supports a new Microsoft-registered App ID and corresponding Audience values for the latest versions of the Azure VPN Client. When you configure a P2S VPN gateway using the new Audience values, you skip the previously required Azure VPN Client app manual registration process for your Microsoft Entra tenant. The App ID is already created and your tenant is automatically able to use it with no extra registration steps. This process is more secure than manually registering the Azure VPN Client because you don't need to authorize the app or assign permissions via the Cloud App Administrator role. To better understand the difference between the types of application objects, see [How and why applications are added to Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/how-applications-are-added).

* If your P2S User VPN gateway is configured using the Audience values for the manually configured Azure VPN Client app, you can easily [change](point-to-site-entra-gateway-update.md) the gateway and client settings to take advantage of the new Microsoft-registered App ID.
* If you want to create or modify a custom Audience value, see [Create a custom audience app ID for P2S VPN](point-to-site-entra-register-custom-app.md).
* If you want to configure or restrict access to P2S based on users and groups, see [Scenario: Configure P2S VPN access based on users and groups](point-to-site-entra-users-access.md).

**Considerations**

> **Important:**
> The Azure VPN Client for Linux (Preview) retired on 31 August, 2026. After this date, the client is no longer supported. For more information, see the **Azure VPN Client for Linux Retirement overview and migration guide** for [VPN Gateway](azure-vpn-client-linux-retirement.md) and [Virtual WAN](../virtual-wan/azure-vpn-client-linux-retirement.md).


* A P2S VPN gateway can only support one Audience value. It can't support multiple Audience values simultaneously.

While it's possible that the Azure VPN Client for Windows might work on other operating system versions, the Azure VPN Client for Windows is only supported on the following releases:

* Supported Windows releases: Windows 11 on x64, x86, and ARM64 architectures.

* The latest versions of the Azure VPN Clients for macOS and Windows are backward compatible with P2S gateways configured to use the older Audience values that align with the manually registered app. These clients also support Custom Audience values.

> **Important:**
>Manually registered Azure VPN Clients used for Point-to-Site (P2S) connections with Microsoft Entra ID authentication will retire on March 31, 2028 in Azure Public Cloud, and on March 31, 2029 in Azure Government and Microsoft Azure operated by 21Vianet clouds.
>After these dates, manually registered clients will no longer function, and only Microsoft-registered VPN clients will be supported after the retirement dates.
>
>To avoid any service disruption, [migrate manually registered VPN clients](point-to-site-entra-gateway-update.md) to a Microsoft-registered VPN client for point-to-site connections with Microsoft Entra ID authentication before the applicable retirement dates.

**Azure VPN Client Audience values**

The following table shows the versions of the Azure VPN Client that are supported for each App ID and the corresponding available Audience values.


| App ID | Supported Audience values | Supported clients |
| --- | --- | --- |
| Microsoft-registered | The audience value `c632b3df-fb67-4d84-bdcf-b95ad541b5c8` applies to:<br>- Azure Public<br>- Azure Government<br>- Azure Germany<br>- Microsoft Azure operated by 21Vianet | - Windows<br>- macOS |
| Manually registered | - Azure Public: `41b23e61-6c1e-4545-b367-cd054e0ed4b4`<br>- Azure Government: `51bb15d4-3a4f-4ebf-9dca-40096fe32426`<br>- Azure Germany: `538ee9e6-310a-468d-afef-ea97365856a9`<br>- Microsoft Azure operated by 21Vianet: `49f817b6-84ae-4cc0-928c-73f27289b3aa` | - Windows<br> - macOS |
| Custom | `<custom-app-id>` | - Windows<br> - macOS |



## Point-to-site workflow

Successfully configuring a P2S connection using Microsoft Entra ID authentication requires a sequence of steps.

This article helps you:

1. Verify your tenant.
1. Configure the VPN gateway with the appropriate required settings.
1. Generate and download the VPN Client configuration package.

The articles in the [Next steps](#next-steps) section help you:

1. Download the Azure VPN Client on the client computer.
1. Configure the client using the settings from the VPN Client configuration package.
1. Connect.

## Prerequisites

This article assumes the following prerequisites:

* **A VPN gateway**

  * Certain gateway options are incompatible with P2S VPN gateways that use Microsoft Entra ID authentication. The VPN gateway can't use the Basic SKU  or a policy-based VPN type. For more information about gateway SKUs, see [About gateway SKUs](about-gateway-skus.md). For more information about VPN types, see [VPN Gateway settings](vpn-gateway-about-vpn-gateway-settings.md#vpntype).

  * If you don't already have a functioning VPN gateway that's compatible with Microsoft Entra ID authentication, see [Create and manage a VPN gateway - Azure portal](tutorial-create-gateway-portal.md). Create a compatible VPN gateway, then return to this article to configure P2S settings.

* **A Microsoft Entra tenant**

  * The steps in this article require a Microsoft Entra tenant. For more information, see [Create a new tenant in Microsoft Entra ID](https://learn.microsoft.com/entra/fundamentals/create-new-tenant).

## <a name="addresspool"></a>Add the VPN client address pool


The client address pool is a range of private IP addresses that you specify. The clients that connect over a point-to-site VPN dynamically receive an IP address from this range. Use a private IP address range that doesn't overlap with the on-premises location that you connect from, or the virtual network that you want to connect to. If you configure multiple protocols and SSTP is one of the protocols, then the configured address pool is split between the configured protocols equally.

1. In the Azure portal, go to your VPN gateway.
1. On the page for your gateway, in the left pane, select **Point-to-site configuration**.
1. On the **Point-to-site configuration** page, click **Configure now**.
1. On the point-to-site configuration page, you'll see the configuration box for **Address pool**.
1. In the **Address pool** box, add the private IP address range that you want to use. For example, if you add the address range `172.16.201.0/24`, connecting VPN clients receive one of the IP addresses from this range. The minimum subnet mask is 29 bit for active/passive and 28 bit for active/active configuration.

After you add the range, continue to the next sections to configure the rest of the required settings.

## <a name="configure-vpn"></a>Configure tunnel type and authentication

> **Important:**
> 
The Azure portal is in the process of updating Azure Active Directory fields to Entra. If you see Microsoft Entra ID referenced and you don't see those values in the portal yet, you can select Azure Active Directory values.


1. Locate the tenant ID of the directory that you want to use for authentication. For help with finding your tenant ID, see [How to find your Microsoft Entra tenant ID](https://learn.microsoft.com/entra/fundamentals/how-to-find-tenant).

1. Configure tunnel type and authentication values.

   Screenshot showing settings for Tunnel type, Authentication type, and Microsoft Entra ID settings.

   Configure the following values:

   * **Address pool**: client address pool
   * **Tunnel type:** OpenVPN (SSL)
   * **Authentication type**: Microsoft Entra ID

   For **Microsoft Entra ID** values, use the following guidelines for **Tenant**, **Audience**, and **Issuer** values. Replace {Microsoft ID Entra Tenant ID} with your tenant ID, taking care to remove **{}** from the examples when you replace this value.

   * **Tenant:** TenantID for the Microsoft Entra ID tenant. Enter the tenant ID that corresponds to your configuration. Make sure the Tenant URL doesn't have a `\` (backslash) at the end. Forward slash is permissible.

     * Azure Public: `https://login.microsoftonline.com/{TenantID}`
     * Azure Government: `https://login.microsoftonline.us/{TenantID}`
     * Azure Germany: `https://login-us.microsoftonline.de/{TenantID}`
     * China 21Vianet: `https://login.chinacloudapi.cn/{TenantID}`

   * **Audience**: The corresponding value for the Microsoft-registered Azure VPN Client App ID. [Custom audience](point-to-site-entra-register-custom-app.md) is also supported for this field.

     * `c632b3df-fb67-4d84-bdcf-b95ad541b5c8`

   * **Issuer**: URL of the Secure Token Service. Include a trailing slash at the end of the **Issuer** value. Otherwise, the connection might fail. Example:

     * `https://sts.windows.net/{Microsoft ID Entra Tenant ID}/`

1. You don't need to select **Grant administrator consent for Azure VPN client application**. This link is only for manually registered VPN clients that use the older Audience values. It opens a page in the Azure portal.
1. When you finish configuring settings, select **Save** at the top of the page.

## <a name="download"></a>Download the VPN client profile configuration package

In this section, you generate and download the Azure VPN client profile configuration package. This package contains the settings that you can use to configure the Azure VPN client profile on client computers.


1. At the top of the **Point-to-site configuration** page, click **Download VPN client**. It takes a few minutes for the client configuration package to generate.

1. Your browser indicates that a client configuration zip file is available. It's named the same name as your gateway.

1. Extract the downloaded zip file.

1. Browse to the unzipped "AzureVPN" folder.

1. Make a note of the location of the “azurevpnconfig.xml” file. The azurevpnconfig.xml contains the setting for the VPN connection. You can also distribute this file to all the users that need to connect via e-mail or other means. The user will need valid Microsoft Entra ID credentials to connect successfully.


## <a name="configure-client"></a>Configure the Azure VPN Client

Next, you examine the profile configuration package, configure the Azure VPN Client for the client computers, and connect to Azure. See the articles listed in the Next steps section.

## Next steps

Configure the Azure VPN Client. See [Configure a VPN client for P2S Microsoft Entra ID authentication connections](point-to-site-entra-vpn-client.md).
