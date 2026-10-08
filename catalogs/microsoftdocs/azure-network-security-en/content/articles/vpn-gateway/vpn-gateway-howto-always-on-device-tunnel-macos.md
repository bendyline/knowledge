---
title: 'Configure an Always-On VPN device tunnel for macOS'
titleSuffix: Azure VPN Gateway
description: Learn how to configure an Always On VPN device tunnel for your VPN gateway on macOS.
author: flapinski
ms.service: azure-vpn-gateway
ms.topic: how-to
ms.date: 02/02/2026
ms.author: flapinski

# Customer intent: As a network administrator, I want to configure an Always On VPN device tunnel, so that I can maintain persistent, secure connections for remote users without manual intervention.
---
# Configure an Always On VPN device tunnel for macOS


The Always On feature was introduced in the Windows 10 VPN client (this feature is also supported for [macOS](vpn-gateway-howto-always-on-device-tunnel-macos.md)). Always On is the ability to maintain a VPN connection. With Always On, the active VPN profile can connect automatically and remain connected based on triggers, such as:
- **Network transitions** - Switching between Wi-Fi networks or moving from Wi-Fi to a cellular hotspot can cause the VPN tunnel to drop silently.
- **Sleep/wake cycles** - When macOS enters sleep mode, the VPN session may time out and not automatically re-establish when the device wakes.
- **Temporary network interruptions** - Brief network outages, such as signal loss or router restarts, terminate the VPN connection and require manual reconnection.
- **Idle session timeouts** - If no traffic passes through the tunnel for a period, the VPN gateway may tear down the idle session.
- **Device restarts and user sign-out** - After a restart or sign-out, the VPN connection isn't restored unless the user manually reconnects.

These gaps leave the device unprotected and without access to corporate resources. Enabling Always On ensures the VPN client automatically reconnects after any disruption, maintaining a persistent and secure tunnel without user intervention.

You can use gateways with Always On to establish persistent user tunnels and device tunnels to Azure.

Always On VPN connections include either of two types of tunnels:

* **Device tunnel**: Connects to specified VPN servers before users sign in to the device. Pre-sign-in connectivity scenarios and device management use a device tunnel.

* **User tunnel**: Connects only after users sign in to the device. By using user tunnels, you can access organization resources through VPN servers.

Device tunnels and user tunnels operate independent of their VPN profiles. They can be connected at the same time, and they can use different authentication methods and other VPN configuration settings, as appropriate.

This article helps you configure an Always On VPN device tunnel for macOS. For information about configuring a device tunnel, see [Configure an Always On VPN device tunnel](vpn-gateway-howto-always-on-device-tunnel.md).

## Prerequisites
Note the following prerequisites for Always On VPN device tunnels on macOS:
 - The Azure VPN Client for macOS must be [version 3.0.100](azure-vpn-client-versions.md) or later.
 - Always On must be configured per profile - there's no default Always On profile.
 - Only one profile can have Always On enabled at a time.
 - Always On can only be enabled when the VPN connection is disconnected.
 - Disconnecting an Always On profile disables the Always On feature for that profile.

## Configure the gateway
Always On VPN device tunnels are supported for all authentication types for the Azure VPN Client for macOS.

This includes [certificate authentication](point-to-site-certificate-gateway.md) and [Microsoft Entra ID Authentication](point-to-site-entra-gateway.md).

## Configure a device tunnel

> **Note:**
> Note the following prerequisites for Always On VPN device tunnels on macOS:
> - The Azure VPN Client for macOS must be version 3.0.100 or later.
> - Always On must be configured per profile - there's no default Always On profile.
> - Only one profile can have Always On enabled at a time.
> - Always On can only be enabled when the VPN connection is disconnected. It is grayed out in any other state.
> - Disconnecting an Always On profile disables the Always On feature for that profile.

1. Open the Azure VPN Client for macOS.
1. Select the profile you want to configure for Always On. If there isn't a client profile downloaded, follow the steps in **[this document](vpn-gateway-howto-always-on-device-tunnel-macos.md)** to configure a profile for your VPN client.
1. Ensure the connection is in disconnected mode.
1. Select the checkbox for **Connect-Automatically**. 
1. If the connection succeeds, you successfully configured an Always On device tunnel. 

Diagram showing the always on feature in client.

## Troubleshooting Always On VPN
### Connection failed - Repeated connection failures
Diagram showing the connection failed repeated connection failures popup.

Always on was disabled because connection can't be established even after max retry attempts. It could mean gateway isn’t reachable, incorrect connection configuration, etc. Admins should check the VPN configuration, validate gateway is up, and then try to re-enable connect-automatically. 

### Always On Checkbox enabled but connection remains disconnected
Diagram showing the checkbox on but connection remaining disconnected.

Some unexpected error was hit. Try one of these mitigations: 
- Disable and re-enable 'Connect Automatically'
- Remove profile and then import again 


## To remove a profile

Use the following steps:
1. Open the Azure VPN Client for Mac.
1. Disconnect the connection, and clear the **Connect automatically** check box (this can also be managed in settings).

     Diagram of user settings in Azure VPN Client.
1. Open the '...' menu next to the profile name, and select **Remove**

## Next steps

To troubleshoot any connection issues that might occur, see [Azure point-to-site connection problems](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/vpn-gateway/vpn-gateway-troubleshoot-vpn-point-to-site-connection-problems.md).
