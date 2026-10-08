---
title: 'Azure VPN Client versions'
description: This article shows the Azure VPN Client versions.
titleSuffix: Azure VPN Gateway
author: duongau
ms.service: azure-vpn-gateway
ms.custom: linux-related-content
ms.topic: concept-article
ms.date: 05/26/2026
ms.author: duau
# Customer intent: "As a network administrator, I want to access the latest versions of the Azure VPN Client, so that I can ensure compatibility and optimize secure connections for our remote users."
---
# Azure VPN Client versions

This article helps you view each of the versions of the Azure VPN Client. As new client versions become available, they're added to this article. To view the version number of an installed Azure VPN Client, launch the client and select **Help**. For the list of Azure VPN Client instructions, including how to download the Azure VPN Client, see the table in [VPN Client configuration requirements](point-to-site-about.md#client).

## Azure VPN Client - Windows

### Supported Windows Versions

While it's possible that the Azure VPN Client for Windows might work on other operating system versions, the Azure VPN Client for Windows is only supported on the following releases:

* Supported Windows releases: Windows 11 on x64, x86, and ARM64 architectures.


### Release notes and version information


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



## Azure VPN Client - Linux


> **Important:**
> The Azure VPN Client for Linux (Preview) retired on 31 August, 2026. After this date, the client is no longer supported. For more information, see the **Azure VPN Client for Linux Retirement overview and migration guide** for [VPN Gateway](azure-vpn-client-linux-retirement.md) and [Virtual WAN](../virtual-wan/azure-vpn-client-linux-retirement.md).


## Azure VPN Client - macOS


| Version | Release Date | New in this release |
| --- | --- | --- |
| 3.0.100 | Apr 2026 | - Always On Feature supported<br> - Feedback Prompts Feature<br> - Accessibility bug fixes<br> - SSO Phantom screen bug fixes |
| 2.8.100 | Oct 2025 | - macOS min version supported: 13.0<br> - Server HA feature disabled<br> - Phantom window bug fix during Entra login |
| 2.7.101 | Aug 2024 | - Auto reconnect on unintentional disconnects<br> - Released universal build (Arm64 and x86_64)<br> - Removed the dependency on Rosetta software<br> - Performance and stability improvements |
| 2.5.3 | May 2024 | - Rebranding of Azure Active Directory to Microsoft Entra |
| 2.5.0 | Apr 2024 | - Microsoft-registered App ID support for Microsoft Entra ID authentication Audience<br> - TLSv 1.3 support<br> - version rolled back |
| 2.4.0 | Nov 2023 | - Multiple server root certificate feature |


## Next steps

For more information about VPN point-to-site, see [About point-to-site configurations](point-to-site-about.md).
