---
title: 'Azure VPN Client for Linux - Retirement Overview and Migration Guide'
titleSuffix: Azure VPN Gateway
description: Learn how to migrate from the Azure VPN Client for Linux to a supported client for Azure VPN Gateway P2S connections.
author: flapinski
ms.service: azure-vpn-gateway
ms.topic: concept-article
ms.date: 05/27/2026
ms.author: duau
# Customer intent: As a Linux user, I want to migrate from the Azure VPN Client for Linux to a supported client so that I can securely connect to my organization's virtual network.
---
# Azure VPN Client for Linux (Retired): Retirement overview and migration guide - VPN Gateway

The Azure VPN Client for Linux (preview), the Microsoft-provided VPN client application used to establish Point-to-Site (P2S) connections from Linux devices to Azure VPN gateways, retired on August 31, 2026.

The client remained in public preview since its release and doesn't have a path to general availability (GA). As part of Microsoft's ongoing effort to align Azure networking services with current security and reliability standards, we have made the decision to retire this preview client rather than continue to maintain an unsupported preview indefinitely.

This retirement doesn't affect Azure VPN gateway itself, Azure VPN Client for Windows, Azure VPN Client for macOS, or any Site-to-Site VPN functionality. Only the Linux preview client application (microsoft-azurevpnclient package) retires.

* See the [FAQ and additional resources](#faq) section of this article for more details on the rationale, timing, alternatives, and impact of this retirement
* For Virtual WAN, see the [Virtual WAN article](../virtual-wan/azure-vpn-client-linux-retirement.md).

## <a name="steps"></a>What steps do I need to take?

Transition your Linux VPN users to one of the following supported alternatives for Azure VPN Gateway Point-to-Site (P2S) connections, as the Azure VPN Client for Linux retired on August 31, 2026.

| Client | Tunnel Type | Authentication Type | Gateway Configuration | Client Configuration |
| --- | --- | --- | --- | --- |
| OpenVPN client | OpenVPN | Certificate | [Configure your Azure VPN gateway to Support Certificate authentication](point-to-site-certificate-gateway.md) | [Configure a VPN client for P2S certificate authentication connections - Linux](point-to-site-vpn-client-certificate.md?pivots=linux#openvpn-client) |
| strongSwan | IKEv2 | Certificate | [Configure your Azure VPN gateway to Support Certificate authentication](point-to-site-certificate-gateway.md) | [Configure a VPN client for P2S certificate authentication connections - Linux](point-to-site-vpn-client-certificate.md?pivots=linux#strongswan) |
|  |  | RADIUS Authentication | [Configure your Azure VPN gateway to Support RADIUS authentication](point-to-site-radius-gateway.md) | [Configure strongSwan for P2S IKEv2 — Linux](point-to-site-vpn-client-configuration-radius.md?pivots=password#linux-vpn-client---strongswan) |

## <a name="high-level"></a>High-level migration steps


The process for updating your gateway and Linux client are as follows:

1. Update your P2S gateway configuration to support the tunnel type required by your chosen alternative (IKEv2 for strongSwan, OpenVPN for the OpenVPN client). 
2. Generate new VPN client profile configuration files from the gateway.
3. Install and configure the replacement VPN client on each Linux device.
4. Test connectivity and roll out to your user base.
5. Uninstall the Azure VPN Client for Linux.

## <a name="faq"></a>FAQ and additional resources

### When was the Azure VPN Client for Linux retired?

The Azure VPN Client for Linux retired on August 31, 2026. Microsoft no longer supports the client for VPN Gateway Point-to-Site (P2S) connections.

### Why was the Azure VPN Client for Linux retired?

The Azure VPN Client for Linux remained in public preview throughout its lifecycle and didn't have a path to general availability. To align with Microsoft's security and reliability standards, Microsoft retired the preview client.

### What happens if I keep using the Azure VPN Client for Linux after August 31, 2026?

The client is no longer supported. While existing installations might continue to function, Microsoft no longer provides bug fixes, security patches, or technical support. The package is also removed from the Microsoft Linux repository. Don't rely on it for production connectivity.

### Does this retirement affect the Azure VPN Client on Windows or macOS?

No. The [Azure VPN Client for Windows and macOS](azure-vpn-client-versions.md) are generally available and aren't affected by this retirement.

### Does this retirement affect my VPN gateway or site-to-site VPN?

No. Only the Linux preview client application was retired. Your VPN Gateway, P2S gateway configuration, and any Site-to-Site (S2S) VPN connections remain unaffected.

### Does Microsoft Entra ID (AAD) authentication work with the alternative Linux clients?

No. The OpenVPN and strongSwan open-source clients don't support Microsoft Entra ID (AAD) authentication with Azure VPN Gateway P2S connections. Microsoft Entra ID authentication on Linux was only available through the Azure VPN Client for Linux.

If you require Microsoft Entra ID authentication for Linux users, you need to evaluate alternative approaches such as certificate-based authentication or connecting through a Windows or macOS client that supports Microsoft Entra ID authentication.

### Did Azure VPN Client for Linux support User Groups and IP address pools for Point-to-Site configurations?

No. User Groups and IP address pools for Point-to-Site configurations weren't supported on the Linux VPN client.

### Do I need to change my VPN gateway configuration?

It depends on your current tunnel type setting and authentication method. If your gateway is configured for OpenVPN only with certificates, you can migrate to the open-source OpenVPN client without changing the gateway configuration.

If you choose to use strongSwan, ensure that IKEv2 is enabled on the gateway. You can enable multiple tunnel types, such as IKEv2 and OpenVPN, simultaneously on the same gateway.

If your gateway was configured to use Microsoft Entra ID (AAD) authentication only, you need to configure an alternative authentication method, such as [certificate](point-to-site-certificate-gateway.md) or [RADIUS authentication](point-to-site-radius-gateway.md), for Linux clients.

### Is the Microsoft Azure VPN Client for Linux package still available for download?

No. The package has been removed from Microsoft's Linux software repository. Use one of the supported alternatives for Linux connectivity.

### What are the supported alternatives for connecting from Linux?

The following supported options are available:

* OpenVPN client - uses the OpenVPN tunnel type with [certificate authentication](point-to-site-vpn-client-certificate.md?pivots=linux#openvpn-client). Works broadly across Linux distributions.
* strongSwan - uses the IKEv2 tunnel type with [certificate authentication](point-to-site-vpn-client-certificate.md?pivots=linux#strongswan) or [RADIUS authentication](point-to-site-vpn-client-configuration-radius.md?pivots=password#linux-vpn-client---strongswan). Works on a wide range of Linux distributions.

Both options support more Linux distributions than the preview client, which was limited to Ubuntu 20.04 and 22.04.


### Where can I get help with migration?

See the Azure VPN Gateway documentation for configuration guidance, or contact Azure Support for migration assistance.

## Next steps

* [Azure VPN FAQ](vpn-gateway-vpn-faq.md)
* [About Point-to-Site VPN](point-to-site-about.md)
* [Configure P2S gateway — Certificate authentication](point-to-site-certificate-gateway.md)
