---
title: Integrate P2S RADIUS authentication with NPS for MFA
titleSuffix: Azure VPN Gateway
description: Learn about integrating P2S RADIUS authentication with Network Policy Server (NPS) for point-to-site multifactor authentication (MFA).
author: duongau
ms.service: azure-vpn-gateway
ms.topic: how-to
ms.date: 11/13/2024
ms.author: duau
ms.custom: sfi-image-nochange

# Customer intent: As a network administrator, I want to integrate RADIUS authentication with Azure VPN for multifactor authentication, so that I can enhance security for point-to-site VPN connections.
---
# Integrate P2S RADIUS authentication with NPS for multifactor authentication

The article helps you integrate Network Policy Server (NPS) with Azure VPN Gateway RADIUS authentication to deliver multifactor authentication (MFA) for point-to-site (P2S) VPN connections.

## Prerequisites

* **Microsoft Entra ID**: In order to enable MFA, the users must be in Microsoft Entra ID, which must be synced from either the on-premises environment, or the cloud environment.

  * The user must have completed the autoenrollment process for MFA. For more information, see [Set up my account for two-step verification](https://support.microsoft.com/account-billing/how-to-use-the-microsoft-authenticator-app-9783c865-0308-42fb-a519-8cf666fe0acc).

  * If your MFA is text-based (SMS, mobile app verification code, etc.) and requires the user to enter a code or text in the VPN client UI, authentication won't succeed and isn't a supported scenario.

* **Route-based VPN gateway**: You must already have a route-based VPN gateway. For steps to create a route-based VPN gateway, see [Tutorial: Create and manage a VPN gateway](tutorial-create-gateway-portal.md).

* **NPS**: You must already have installed the Network Policy Server and configured the VPN policy for RADIUS.

  * For steps to install the Network Policy Server, see [Install the Network Policy Server (NPS)](https://learn.microsoft.com/windows-server/networking/technologies/nps/nps-manage-install).

  * For steps to create a VPN policy for RADIUS, see [Create a VPN policy for RADIUS](https://learn.microsoft.com/windows-server/networking/technologies/nps/nps-np-configure).

## Create RADIUS client

1. Create the RADIUS client by specifying the following settings:
   * **Friendly Name**: Type any name.
   * **Address (IP or DNS)**: Use the value specified for your VPN gateway Gateway Subnet. For example, 10.1.255.0/27.
   * **Shared secret**: Type any secret key, and remember it for later use.
1. On the **Advanced** tab, set the vendor name to **RADIUS Standard** and make sure that the **Additional Options** check box isn't selected. Then, select **OK**.
1. Go to **Policies** > **Network Policies**. Double-click **Connections to Microsoft Routing and Remote Access server** policy. Select **Grant access**, and then select **OK**.

## Configure the VPN gateway


1. In the Azure portal, open your virtual network gateway (VPN gateway).
1. On the **Overview** page, verify that the Gateway type is set to **VPN** and that the VPN type is **route-based**.
1. In the left pane, expand **Settings** and select **Point to site configuration** > **Configure now**.
1. View the **Point-to-site configuration** page.

   Screenshot that shows point-to-site configuration page.
1. On the **Point-to-site configuration** page, configure the following settings:

    * **Address pool**: This value specifies the client address pool from which the VPN clients receive an IP address when they connect to the VPN gateway. The address pool must be a private IP address range that doesn't overlap with the virtual network address range. For example, **172.16.201.0/24**.
    * **Tunnel type**: Select the tunnel type. For example, select **IKEv2 and OpenVPN (SSL)**.
    * **Authentication type**: Select **RADIUS authentication**.
    * If you have an active-active VPN gateway, a third public IP address is required. You can create a new public IP address using the example value **VNet1GWpip3**.
    * **Primary Server IP address**: Type the IP address of the Network Policy Server (NPS).
    * **Primary Server secret**: Type the shared secret that you specified when you created the RADIUS client on the NPS.
1. At the top of the page, **Save** the configuration settings.


After the settings are saved, you can click **Download VPN Client** to download the VPN client configuration package and use the settings to configure the VPN client. For more information about P2S VPN client configuration, see the [Point-to-site client configuration requirements](point-to-site-about.md#client) table.

## Integrate NPS with Microsoft Entra MFA

Use the following links to integrate your NPS infrastructure with Microsoft Entra multifactor authentication:

* [How it works: Microsoft Entra multifactor authentication](https://learn.microsoft.com/entra/identity/authentication/concept-mfa-howitworks)
* [Integrate your existing NPS infrastructure with Microsoft Entra multifactor authentication](https://learn.microsoft.com/entra/identity/authentication/howto-mfa-nps-extension)

## Next steps

For steps to configure your VPN client, see the [Point-to-site client configuration requirements](point-to-site-about.md#client) table.
