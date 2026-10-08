---
title: What's new in Azure VPN Gateway?
description: Learn what's new with Azure VPN Gateway such as the latest release notes, known issues, bug fixes, deprecated functionality, and upcoming changes.
author: duongau
ms.service: azure-vpn-gateway
ms.topic: concept-article
ms.date: 05/26/2026
ms.author: duau
ms.custom:
  - build-2025
# Customer intent: "As a network administrator, I want to stay informed about the latest updates and planned changes for the VPN Gateway service, so that I can ensure optimal usage and compliance with upcoming migrations and deprecations."
---

# What's new in Azure VPN Gateway?

Azure VPN Gateway is updated regularly. Stay up to date with the latest announcements. This article provides you with information about:

* Projected changes
* Recent releases
* Previews underway with known limitations (if applicable)
* Known issues
* Deprecated functionality (if applicable)
* Azure VPN Client versions

You can also find the latest VPN Gateway updates and subscribe to the RSS feed [here](https://azure.microsoft.com/updates?filters=%5B%22VPN+Gateway%22%5D).

## Upcoming projected changes

> **Note:**
> Timelines are subject to change.<br>
> Basic IP deprecation timeline for all **VPN Gateways** is moved to **End of June 2026**<br>
> Azure VPN Client for Linux (Preview) retirement date is **August 31, 2026**.

| Event | Customer impact | Anticipated timelines | Customer action/ prerequisites | Documentation | Announcement Links |
| --- | --- | --- | --- | --- | --- |
| Azure VPN Client for Linux (Preview) Retirement | - Azure VPN Client for Linux no longer supported.<br>- End user clients may fail to connect after the retirement date if using Azure VPN Client for Linux. | - **August 31, 2026**: Azure VPN Client for Linux (Preview) is retired | - Update gateway configuration and end clients following guidance in documentation | - [How to migrate to a new Linux Client](azure-vpn-client-linux-retirement.md) | [Azure VPN Client for Linux (Preview) Retirement](https://azure.microsoft.com/updates?filters=%5B%22VPN+Gateway%22%5D) |
| Basic SKU public IP address migration - For all VPN SKUs except Basic SKU gateway | - New [pricing changes](https://azure.microsoft.com/pricing/details/ip-addresses/).<br>- Up to 10 minutes downtime during migration.<br>- IP address unchanged. | - **Jan 2026**: General Availability for Active-Passive gateways. <br>- **Apr 2026**: General Availability for Active-Active gateways. | - Verify IP address space and subnet size [here](basic-public-ip-migrate-about.md#considerations). <br>- Migrate Basic to Standard SKU public IP. <br> - No action if already on Standard SKU. | - [About Basic SKU Public IP address migration](basic-public-ip-migrate-about.md) <br>  - [How to migrate Basic SKU public IP address to Standard](basic-public-ip-migrate-howto.md?tabs=portal) | [Basic SKU public IP address retirement](https://azure.microsoft.com/updates?id=upgrade-to-standard-sku-public-ip-addresses-in-azure-by-30-september-2025-basic-sku-will-be-retired) |
| Basic SKU public IP address - For Basic SKU gateway | - IP address unchanged.<br> - No connectivity interruption. | - **Mar 2026**: Available. <br> | - Removing Basic public IP reference from VPN Gateway virtual network gateways. [FAQ](basic-sku-public-ip-remove.md) | [Remove Basic Public IP Reference from Basic SKU VPN Gateway](basic-sku-public-ip-remove.md) | [Basic SKU public IP address retirement](https://azure.microsoft.com/updates?id=upgrade-to-standard-sku-public-ip-addresses-in-azure-by-30-september-2025-basic-sku-will-be-retired) |
| Non-AZ gateway SKU retirement | - New AZ SKUs pricing applied since Jan 2025.<br>- No downtime expected.<br>- New Non-AZ SKU creates blocked in 2025. | - **Jan 2025**: New pricing activated.<br> - **May 2025 - Sep 2026**: Non-AZ SKU migration.<br> - **Sep 2026**: Non-AZ SKU retirement. | - Migrate Basic IP address to Standard IP if applicable. <br> - Upgrade the gateway SKU from portal. | [VPN Gateway SKU consolidation and migration](gateway-sku-consolidation.md) | [Non-AZ gateway SKU retirement](https://azure.microsoft.com/updates?id=vpngw1-5-non-az-skus-will-be-retired-on-30-september-2026) |
| Legacy SKU retirement: Standard and High Performance SKUs | - New creations blocked in 2024.<br> - Up to 10 minutes of downtime. | - **May 2025 - Jun 2026**: Migration.<br>- **Jun 2026**: Legacy SKU retirement. | - **Nov 2025** Migrate Basic IP address (Active-Passive gateway).  <br>- **Jan 2026** Migrate Basic IP address (Active-Active gateway). | [Working with VPN Gateway legacy SKUs](vpn-gateway-about-skus-legacy.md) | [Standard and HighPerf gateway SKU retirement](https://azure.microsoft.com/updates?id=standard-and-highperformance-vpn-gateway-skus-will-be-retired-on-30-september-2025) |
| Classic VPN gateways retired | - Classic VPN gateways will be decommissioned. | - **Aug 2024**: Retirement.<br>- **By Aug 2025**: Decommission. | - Migrate your classic VPN gateway to an Azure Resource Manager gateway. | [VPN Gateway classic to Resource Manager migration](vpn-gateway-classic-resource-manager-migration.md) | [Classic resource retirement](https://azure.microsoft.com/updates?id=cloud-services-retirement-announcement) |


## Recent releases and announcements

| Type | Area | Name | Description | Date added | Limitations |
| --- | --- | --- | --- | --- | --- |
| Feature | S2S | [S2S VPN Gateway certificate authentication connection](site-to-site-certificate-authentication-gateway-about.md) | Azure VPN Gateway supports site-to-site VPN with digital certificate authentication. View the [configuration instructions](site-to-site-certificate-authentication-gateway.md) to enable it by using the Azure portal, Azure PowerShell, or Azure CLI. | May 2026 | N/A |
| Feature | P2S | [User Groups and client address pools](point-to-site-user-groups-create.md) | Azure VPN Gateway supports user groups and client address pools. View the [portal](point-to-site-user-groups-create-portal.md) and [Powershell](point-to-site-user-groups-create.md) instructions to enable it. | May 2026 | N/A |
| IPv6 Preview | N/A | [VPN Gateway IPv6](site-to-site-ipv6-azure.md) | Azure VPN Gateway supports IPv6 in dual stack. View the announcement [here](https://aka.ms/vpnipv6preview). | May 2025 | N/A |
| SKU Consolidation | N/A | [VpnGw1-5 non-AZ VPN Gateway SKU](gateway-sku-consolidation.md) | VpnGw1-5 non-AZ SKU will be deprecated on 30 Sep 2026. View the announcement [here](https://azure.microsoft.com/updates/v2/vpngw1-5-non-az-skus-will-be-retired-on-30-september-2026). | Sep 2024 | N/A |
| P2S VPN | P2S VPN Client | [Azure VPN Client for Linux](#linux) | [Certificate](point-to-site-vpn-client-certificate.md) authentication, [Microsoft Entra ID](point-to-site-entra-vpn-client.md?pivots=linux) authentication. | May 2024 | N/A |
| P2S VPN | P2S VPN Client | [Azure VPN Client for macOS](#macos) | Microsoft Entra ID authentication updates, additional features. | Sept 2024 | N/A |
| P2S VPN | P2S VPN Client | [Azure VPN Client for Windows](#windows) | Microsoft Entra ID authentication updates, additional features. | May 2024 | N/A |
| SKU deprecation | N/A | [Standard/High performance VPN gateway SKU](vpn-gateway-about-skus-legacy.md#sku-deprecation) | Legacy SKUs (Standard and HighPerformance) will be deprecated on 30 Sep 2025. View the announcement [here](https://go.microsoft.com/fwlink/?linkid=2255127). | Nov 2023 | N/A |
| Feature | All | [Customer-controlled gateway maintenance](customer-controlled-gateway-maintenance.md) | Customers can schedule maintenance (Guest OS and Service updates) during a time of the day that best suits their business needs. | Nov 2023 (Public preview) | See the [FAQ](vpn-gateway-vpn-faq.md#customer-controlled) |
| Feature | All | [APIPA for VPN Gateway (General availability)](configure-bgp.md#2-create-testvnet1-gateway-with-bgp) | All SKUs of active-active VPN gateways now support multiple custom BGP APIPA addresses for each instance. | Jan 2022 | N/A |
| Feature | P2S VPN Client | [Feedback Hub support for Azure VPN Client connections](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/vpn-gateway/feedback-hub-azure-vpn-client.md) | Customers can use Feedback Hub to file a bug/allow feedback triage for Azure VPN Client connections. | May 2024 | Windows 10, Windows 11 only |

### <a name="windows"></a>Azure VPN Client - Windows


| Version | Release Date | New in this release |
| --- | --- | --- |
| 4.0.8.0 | Oct 2026 | - Accessibility improvements <br> - Improved UI error messages and toast notifications for scenarios requiring user interaction <br> - Added the ability to disable certificate pinning from the profile <br> - Improved error messages for failed prerequisite test <br> <br> Some bug fixes and reliability improvements: <br> - Improved badge notification behavior by resolving sync issues and clearing the badge when the app is closed <br> - Improved system tray reliability by addressing issues caused by concurrent updates |
| 4.0.5.0 | Feb 2026 | - Device SSO authentication enabled <br> - Reduced the toast notification frequency for certain user interaction required scenarios |
| 4.0.4.0 | Nov 2025 | - Accessibility Improvements - Narrator improvements, keyboard use improvements, color contrast improvements <br> - UI error messages enhancements <br> <br> Major Bug Fixes <br> - Fixed frequent disconnects occurring due to the Windows Push Notification Service unavailability <br> - Fix for preventing Port Already Open Issue <br>  - Fixed one cause of connection failure due to Key Material sent error |
| 4.0.1.0 | Jun 2025 | - Feedback prompt enhancements <br> Feedback prompts are disabled by default <br>  The previous forced feedback prompt has been replaced with a passive option. Users can now choose to provide feedback by clicking a button available on the Help page. <br> - Resolved crashes that occurred when a disconnect action was triggered during an active connection or datapath <br> - Accessibility Improvements: Users can now access status logs and related settings directly in compact view, without needing to maximize the screen <br> - Bug fixes include adding UI support to display excluded routes |
| 4.0.0.0 | Jan 2025 | - Pre-requisites check for P2S <br> - XAML Upgrade <br> - Feedback prompts <br> - System Tray support <br> - Compact View Mode <br> - Rekey with Entra ID Authentication <br> - Support to Close UI with active connections |
| 3.4.1.0 | Oct 2024 | - Temporary rollback prerequisites check for P2S |
| 3.4.0.0 | Sept 2024 | - Prerequisites check for P2S <br> - Behavior change for rekey with Entra ID Authentication. For information about disconnects, see [Why am I getting disconnected from my Azure VPN Client?](vpn-gateway-vpn-faq.md#vpn-disconnect) |
| 3.3.1.0 | Jun 2024 | - Microsoft-registered App ID Audience support for Microsoft Entra ID authentication <br> - TLS 1.3 support (requires TLS1.3 in Azure VPN Gateway) <br> - Better integrations with Feedback Hub (also valid for previous versions)<br> - Client stability improvements <br>- Minor bug fixes |
| 3.2.0.0 | Nov 2023 | - Microsoft Entra authentication is now available from the settings page<br> - Accessibility Improvements<br>- Connection logs in UTCM<br>- Minor bug fixes |



### <a name="linux"></a>Azure VPN Client - Linux


> **Important:**
> The Azure VPN Client for Linux (Preview) retired on 31 August, 2026. After this date, the client is no longer supported. For more information, see the **Azure VPN Client for Linux Retirement overview and migration guide** for [VPN Gateway](azure-vpn-client-linux-retirement.md) and [Virtual WAN](../virtual-wan/azure-vpn-client-linux-retirement.md).


### <a name="macos"></a>Azure VPN Client - macOS


| Version | Release Date | New in this release |
| --- | --- | --- |
| 3.0.100 | Apr 2026 | - Always On Feature supported<br> - Feedback Prompts Feature<br> - Accessibility bug fixes<br> - SSO Phantom screen bug fixes |
| 2.8.100 | Oct 2025 | - macOS min version supported: 13.0<br> - Server HA feature disabled<br> - Phantom window bug fix during Entra login |
| 2.7.101 | Aug 2024 | - Auto reconnect on unintentional disconnects<br> - Released universal build (Arm64 and x86_64)<br> - Removed the dependency on Rosetta software<br> - Performance and stability improvements |
| 2.5.3 | May 2024 | - Rebranding of Azure Active Directory to Microsoft Entra |
| 2.5.0 | Apr 2024 | - Microsoft-registered App ID support for Microsoft Entra ID authentication Audience<br> - TLSv 1.3 support<br> - version rolled back |
| 2.4.0 | Nov 2023 | - Multiple server root certificate feature |


## Next steps

* [What is Azure VPN Gateway?](vpn-gateway-about-vpngateways.md)
* [VPN Gateway FAQ](vpn-gateway-vpn-faq.md)
