---
title: About Azure Point-to-Site VPN connections
titleSuffix: Azure VPN Gateway
description: Learn about Point-to-Site VPN.
author: duongau
ms.service: azure-vpn-gateway
ms.topic: concept-article
ms.date: 08/17/2026
ms.author: duau
ms.custom:
  - linux-related-content
  - sfi-image-nochange
# Customer intent: "As a telecommuter, I want to set up a Point-to-Site VPN connection to my Azure virtual network, so that I can securely access company resources from remote locations."
---
# About Point-to-Site VPN

A Point-to-Site (P2S) VPN gateway connection lets you create a secure connection to your virtual network from an individual client computer. A P2S connection is established by starting it from the client computer. This solution is useful for telecommuters who want to connect to Azure virtual networks from a remote location, such as from home or a conference. P2S VPN is also a useful solution to use instead of site-to-site (S2S) VPN when you have only a few clients that need to connect to a virtual network. Point-to-site configurations require a **route-based** VPN type.

## <a name="protocol"></a>What protocol does P2S use?

Point-to-site VPN can use one of the following protocols:

* **OpenVPN® Protocol**, an SSL/TLS based VPN protocol. A TLS VPN solution can penetrate firewalls, since most firewalls open TCP port 443 outbound, which TLS uses. Use OpenVPN to connect from Android, iOS (versions 11.0 and above), Windows, Linux, and Mac devices (macOS versions 13.0 and above). Supported versions are TLS 1.2 and TLS 1.3 based on TLS handshake.

* **Secure Socket Tunneling Protocol (SSTP)**, a proprietary TLS-based VPN protocol. A TLS VPN solution can penetrate firewalls, since most firewalls open TCP port 443 outbound, which TLS uses. SSTP is only supported on Windows devices. 

* **IKEv2 VPN**, a standards-based IPsec VPN solution. Use IKEv2 VPN to connect from Mac devices (macOS versions 13.0 and above).

P2S VPN gateways support IPv6 with IKEv2 and OpenVPN. P2S VPN gateways don't support IPv6 with SSTP.

## <a name="authentication"></a>How are P2S VPN clients authenticated?

Before Azure accepts a P2S VPN connection, the user has to be authenticated first. There are three authentication types that you can select when you configure your P2S gateway. The options are:

* [Certificate](#certificate)
* [Microsoft Entra ID](#entra-id)
* [RADIUS and Active Directory Domain Server](#active-directory)

You can select multiple authentication types for your P2S gateway configuration. If you select multiple authentication types, the VPN client you use must be supported by at least one authentication type and corresponding tunnel type. For example, if you select "IKEv2 and OpenVPN" for tunnel types, and "Microsoft Entra ID and Radius" or "Microsoft Entra ID and Azure Certificate" for authentication type, Microsoft Entra ID will only use the OpenVPN tunnel type since it's not supported by IKEv2.

The following table shows authentication mechanisms that are compatible with selected tunnel types. Each mechanism requires corresponding VPN client software on the connecting device to be configured with the proper settings available in the VPN client profile configuration files.


| Tunnel Type | Authentication Mechanism |
| --- | --- |
| OpenVPN | Any subset of Microsoft Entra ID, Radius Auth and Azure Certificate |
| SSTP | Radius Auth/ Azure Certificate |
| IKEv2 | Radius Auth/ Azure Certificate |
| IKEv2 and OpenVPN | Radius Auth/ Azure Certificate/ Microsoft Entra ID and Radius Auth/ Microsoft Entra ID and Azure Certificate |
| IKEv2 and SSTP | Radius Auth/ Azure Certificate |


### <a name="certificate"></a>Certificate authentication

When you configure your P2S gateway for certificate authentication, you upload the trusted root certificate public key to the Azure gateway. You can use a root certificate that was generated using an Enterprise solution, or you can generate a self-signed certificate.

To authenticate, each client that connects must have an installed client certificate that's generated from the trusted root certificate. This is in addition to VPN client software. The validation of the client certificate is performed by the VPN gateway and happens during establishment of the P2S VPN connection.

#### <a name="certificate-workflow"></a>Certificate authentication workflow

At a high level, you need to perform the following steps to configure Certificate authentication:

1. Enable Certificate authentication on the P2S gateway, along with the additional required settings (client address pool, etc.), and upload the root CA public key information.
1. Generate and download VPN client profile configuration files (profile configuration package).
1. Install the client certificate on each connecting client computer.
1. Configure the VPN client on the client computer using the settings found in the VPN profile configuration package.
1. Connect.

### <a name="entra-id"></a>Microsoft Entra ID authentication

You can configure your P2S gateway to allow VPN users to authenticate using Microsoft Entra ID credentials. With Microsoft Entra ID authentication, you can use Microsoft Entra Conditional Access and multifactor authentication (MFA) features for VPN. Microsoft Entra ID authentication is supported only for the OpenVPN protocol. To authenticate and connect, clients must use the Azure VPN Client.

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



#### <a name="entra-workflow"></a>Microsoft Entra ID authentication workflow

At a high level, you need to perform the following steps to configure Microsoft Entra ID authentication:

1. If using manual app registration, perform the necessary steps on the Microsoft Entra tenant.
1. Enable Microsoft Entra ID authentication on the P2S gateway, along with the additional required settings (client address pool, etc.).
1. Generate and download VPN client profile configuration files (profile configuration package).
1. Download, install, and configure the Azure VPN Client on the client computer.
1. Connect.

### <a name="active-directory"></a>RADIUS - Active Directory (AD) Domain Server authentication

AD Domain authentication allows users to connect to Azure using their organization domain credentials. It requires a RADIUS server that integrates with the AD server. Organizations can also use their existing RADIUS deployment.

The RADIUS server could be deployed on-premises or in your Azure virtual network. During authentication, the Azure VPN Gateway acts as a pass through and forwards authentication messages back and forth between the RADIUS server and the connecting device. So Gateway reachability to the RADIUS server is important. If the RADIUS server is present on-premises, then a VPN S2S connection from Azure to the on-premises site is required for reachability.

The RADIUS server can also integrate with AD certificate services. This lets you use the RADIUS server and your enterprise certificate deployment for P2S certificate authentication as an alternative to the Azure certificate authentication. The advantage is that you don’t need to upload root certificates and revoked certificates to Azure.

A RADIUS server can also integrate with other external identity systems. This opens up plenty of authentication options for P2S VPN, including multi-factor options.

Diagram that shows a point-to-site VPN with an on-premises site.

For P2S gateway configuration steps, see [Configure P2S - RADIUS](point-to-site-how-to-radius-ps.md).

## <a name="client"></a>What are the client configuration requirements?

The client configuration requirements vary, based on the VPN client that you use, the authentication type, and the protocol. The following table shows the available clients and the corresponding articles for each configuration.


| Authentication method | Tunnel type | Client OS | VPN client |
| --- | --- | --- | --- |
| Certificate |  |  |  |
|  | IKEv2, SSTP, OpenVPN | Windows, macOS, Linux, iOS | [VPN client configuration - certificate authentication](point-to-site-vpn-client-certificate.md) |
| Microsoft Entra ID |  |  |  |
|  | OpenVPN | Windows, macOS | [VPN client configuration - Microsoft Entra ID authentication](point-to-site-entra-vpn-client.md) |


## What versions of the Azure VPN Client are available?

For information about available Azure VPN Client versions, release dates, and what's new in each release, see  [Azure VPN Client versions](azure-vpn-client-versions.md).

## <a name="gwsku"></a>Which gateway SKUs support P2S VPN?

See [About Gateway SKUs](about-gateway-skus.md) for the list of SKUs that support P2S VPN, and the number of tunnels and connections supported on each SKU.

> **Note:**
> The Basic SKU has limitations and does not support IKEv2, IPv6, or RADIUS authentication. For more information, see [VPN Gateway settings](vpn-gateway-about-vpn-gateway-settings.md#gwsku).

### <a name="certificate-migration"></a>What is P2S gateway root certificate migration?

Azure periodically rotates the root certificates that VPN gateways use for point-to-site (P2S) VPN connections. Root certificate migration (also called root certificate rotation) is the scheduled process of transitioning a VPN gateway from an older root certificate to a new one. Microsoft provides advance notice before each migration. This change affects all P2S client connections, not just clients that connect via Certificate Authentication. When a gateway server certificate is migrated, the gateway continues to function as normal, but you must generate and update your VPN client profile to maintain connectivity. For more information, see [VPN Gateway certificate migration](point-to-site-about-gateway-certificate-migration.md).


## <a name="IKE/IPsec policies"></a>What IKE/IPsec policies are configured on VPN gateways for P2S?

The tables in this section show the values for the default policies. However, they don't reflect the available supported values for custom policies. For custom policies, see the **Accepted values** listed in the [New-AzVpnClientIpsecParameter](https://learn.microsoft.com/powershell/module/az.network/new-azvpnclientipsecparameter) PowerShell cmdlet.

**IKEv2**

| **Cipher** | **Integrity** | **PRF** | **DH Group** |
| --- | --- | --- | --- |
| GCM_AES256 | GCM_AES256 | SHA384 | GROUP_24 |
| GCM_AES256 | GCM_AES256 | SHA384 | GROUP_14 |
| GCM_AES256 | GCM_AES256 | SHA384 | GROUP_ECP384 |
| GCM_AES256 | GCM_AES256 | SHA384 | GROUP_ECP256 |
| GCM_AES256 | GCM_AES256 | SHA256 | GROUP_24 |
| GCM_AES256 | GCM_AES256 | SHA256 | GROUP_14 |
| GCM_AES256 | GCM_AES256 | SHA256 | GROUP_ECP384 |
| GCM_AES256 | GCM_AES256 | SHA256 | GROUP_ECP256 |
| AES256 | SHA384 | SHA384 | GROUP_24 |
| AES256 | SHA384 | SHA384 | GROUP_14 |
| AES256 | SHA384 | SHA384 | GROUP_ECP384 |
| AES256 | SHA384 | SHA384 | GROUP_ECP256 |
| AES256 | SHA256 | SHA256 | GROUP_24 |
| AES256 | SHA256 | SHA256 | GROUP_14 |
| AES256 | SHA256 | SHA256 | GROUP_ECP384 |
| AES256 | SHA256 | SHA256 | GROUP_ECP256 |
| AES256 | SHA256 | SHA256 | GROUP_2 |

**IPsec**

| **Cipher** | **Integrity** | **PFS Group** |
| --- | --- | --- |
| GCM_AES256 | GCM_AES256 | GROUP_NONE |
| GCM_AES256 | GCM_AES256 | GROUP_24 |
| GCM_AES256 | GCM_AES256 | GROUP_14 |
| GCM_AES256 | GCM_AES256 | GROUP_ECP384 |
| GCM_AES256 | GCM_AES256 | GROUP_ECP256 |
| AES256 | SHA256 | GROUP_NONE |
| AES256 | SHA256 | GROUP_24 |
| AES256 | SHA256 | GROUP_14 |
| AES256 | SHA256 | GROUP_ECP384 |
| AES256 | SHA256 | GROUP_ECP256 |
| AES256 | SHA1 | GROUP_NONE |

## <a name="TLS policies"></a>What TLS policies are configured on VPN gateways for P2S?


**TLS**

| **Policies** |
| --- |
| TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384 |
| TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256 |
| TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384 |
| TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256 |
| **TLS_AES_256_GCM_SHA384 |
| **TLS_AES_128_GCM_SHA256 |

**Only supported on TLS1.3 with OpenVPN


## <a name="configure"></a>How do I configure a P2S connection?

A P2S configuration requires quite a few specific steps. The following articles contain the steps to walk you through common P2S configuration steps.

* [Certificate authentication](point-to-site-certificate-gateway.md)
* [Microsoft Entra ID authentication](point-to-site-entra-gateway.md)
* [RADIUS authentication](point-to-site-how-to-radius-ps.md)

### To remove the configuration of a P2S connection

You can remove the configuration of a connection by using PowerShell or CLI. For examples, see the [FAQ](vpn-gateway-vpn-faq.md#removeconfig).

## How does P2S routing work?

See the following articles:

* [About Point-to-Site VPN routing](vpn-gateway-about-point-to-site-routing.md)
* [How to advertise custom routes](vpn-gateway-p2s-advertise-custom-routes.md)

## FAQs

There are multiple FAQ entries for point-to-site. See the [VPN Gateway FAQ](vpn-gateway-vpn-faq.md), paying particular attention to the [Certificate authentication](vpn-gateway-vpn-faq.md#P2S) and [RADIUS](vpn-gateway-vpn-faq.md#P2SRADIUS) sections, as appropriate.

## Next Steps

* [Configure a P2S connection - Azure certificate authentication](point-to-site-certificate-gateway.md)
* [Configure a P2S connection - Microsoft Entra ID authentication](point-to-site-entra-gateway.md)

**"OpenVPN" is a trademark of OpenVPN Inc.**
