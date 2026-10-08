---
title: Configure VPN gateway for P2S RADIUS authentication - Azure portal
titleSuffix: Azure VPN Gateway
description: Learn how to configure VPN Gateway server settings for point-to-site configurations using the Azure portal - RADIUS authentication.
author: duongau
ms.service: azure-vpn-gateway
ms.topic: how-to
ms.date: 06/08/2026
ms.author: duau
# Customer intent: As a network administrator, I want to configure RADIUS authentication for point-to-site VPN connections, so that remote users can securely connect to the virtual network using their organizational credentials.
---

# Configure server settings for P2S VPN Gateway RADIUS authentication

This article helps you create a point-to-site (P2S) connection that uses RADIUS authentication. You can create this configuration using either PowerShell, or the Azure portal. The steps in this article work for both active-active mode VPN gateways and active-standby mode VPN gateways.

P2S VPN connections are useful when you want to connect to your virtual network from a remote location, such as when you're telecommuting from home or a conference. You can also use P2S instead of a site-to-site (S2S) VPN when you have only a few clients that need to connect to a virtual network. P2S connections don't require a VPN device or a public-facing IP address. There are various different configuration options available for P2S. For more information about point-to-site VPN, see [About point-to-site VPN](point-to-site-about.md).

This type of connection requires:

* A RouteBased VPN gateway using a VPN gateway SKU other than the Basic SKU.
* A RADIUS server to handle user authentication. The RADIUS server can be deployed on-premises, or in the Azure virtual network (VNet). You can also configure two RADIUS servers for high availability.
* The VPN client profile configuration package. The VPN client profile configuration package is a package that you generate. It contains the settings required for a VPN client to connect over P2S.

Limitations:

* If you're using IKEv2 with RADIUS, only EAP-based authentication is supported.
* An ExpressRoute connection can't be used to connect to an on-premises RADIUS server.

## <a name="aboutad"></a>About Active Directory (AD) Domain Authentication for P2S VPNs

AD Domain authentication allows users to sign in to Azure using their organization domain credentials. It requires a RADIUS server that integrates with the AD server. Organizations can also use their existing RADIUS deployment.

The RADIUS server can reside on-premises, or in your Azure virtual network. During authentication, the VPN gateway acts as a pass-through and forwards authentication messages back and forth between the RADIUS server and the connecting device. It's important for the VPN gateway to be able to reach the RADIUS server. If the RADIUS server is located on-premises, then a VPN site-to-site connection from Azure to the on-premises site is required.

Apart from Active Directory, a RADIUS server can also integrate with other external identity systems. This opens up plenty of authentication options for P2S VPNs, including MFA options. Check your RADIUS server vendor documentation to get the list of identity systems it integrates with.

Diagram of RADIUS authentication P2S connection.

## <a name="radius"></a>Set up your RADIUS server

Before you configure the virtual network gateway point-to-site settings, your RADIUS server must be configured correctly for authentication.

1. If you don’t have a RADIUS server deployed, deploy one. For deployment steps, refer to the setup guide provided by your RADIUS vendor.  
1. Configure the VPN gateway as a RADIUS client on the RADIUS. When adding this RADIUS client, specify the virtual network GatewaySubnet that you created.
1. Once the RADIUS server is set up, get the RADIUS server's IP address and the shared secret that RADIUS clients should use to talk to the RADIUS server. If the RADIUS server is in the Azure virtual network, use the CA IP of the RADIUS server virtual machine.

The [Network Policy Server (NPS)](https://learn.microsoft.com/windows-server/networking/technologies/nps/nps-top) article provides guidance about configuring a Windows RADIUS server (NPS) for AD domain authentication.

## Verify your VPN gateway

You must have a route-based VPN gateway that's compatible with the P2S configuration that you want to create and the connecting VPN clients. To help determine the P2S configuration that you need, see the [VPN client table](#type). If your gateway uses the Basic SKU, understand that the Basic SKU has P2S limitations and doesn't support IKEv2 or RADIUS authentication. For more information, see [About gateway SKUs](about-gateway-skus.md).

If you don't yet have a functioning VPN gateway that's compatible with the P2S configuration that you want to create, see [Create and manage a VPN gateway](tutorial-create-gateway-portal.md). Create a compatible VPN gateway, then return to this article to configure P2S settings.

## <a name="addresspool"></a>Add the VPN client address pool


The client address pool is a range of private IP addresses that you specify. The clients that connect over a point-to-site VPN dynamically receive an IP address from this range. Use a private IP address range that doesn't overlap with the on-premises location that you connect from, or the virtual network that you want to connect to. If you configure multiple protocols and SSTP is one of the protocols, then the configured address pool is split between the configured protocols equally.

1. In the Azure portal, go to your VPN gateway.
1. On the page for your gateway, in the left pane, select **Point-to-site configuration**.
1. On the **Point-to-site configuration** page, click **Configure now**.
1. On the point-to-site configuration page, you'll see the configuration box for **Address pool**.
1. In the **Address pool** box, add the private IP address range that you want to use. For example, if you add the address range `172.16.201.0/24`, connecting VPN clients receive one of the IP addresses from this range. The minimum subnet mask is 29 bit for active/passive and 28 bit for active/active configuration.

After you add the range, continue to the next sections to configure the rest of the required settings.

## <a name="type"></a>Specify the tunnel and authentication type

In this section, you specify the tunnel type and the authentication type. These settings can become complex. You can select options that contain multiple tunnel types from the dropdown, such as *IKEv2 and OpenVPN(SSL)* or *IKEv2 and SSTP (SSL)*. Only certain combinations of tunnel types and authentication types are available.

The tunnel type and the authentication type must correspond to the VPN client software you want use to connect to Azure. When you have various VPN clients connecting from different operating systems, planning the tunnel type and authentication type is important.

> **Note:**
> If you don't see tunnel type or authentication type on the **Point-to-site configuration** page, your gateway is using the Basic SKU. The Basic SKU doesn't support IKEv2 or RADIUS authentication. If you want to use these settings, you need to delete and re-create the gateway using a different gateway SKU.

1. For **Tunnel type**, select the tunnel type that you want to use.

1. For **Authentication type**, from the dropdown, select **RADIUS authentication**.

   Screenshot of Point-to-site configuration page - authentication type.

## <a name="publicip3"></a>Add another public IP address


If you have an active-active mode gateway, you need to specify a third public IP address to configure point-to-site. In the example, we create the third public IP address using the example value **VNet1GWpip3**. If your gateway isn't in active-active mode, you don't need to add another public IP address.

Screenshot of Point-to-site configuration page - public IP address.

## <a name="addradius"></a>Specify the RADIUS server

In the portal, specify the following settings:

* Primary Server IP address
* Primary Server secret. This is the RADIUS secret and must match what is configured on your RADIUS server.

Optional settings:

* You can optionally specify Secondary Server IP address and Secondary Server secret. This is useful for high availability scenarios.
* Additional routes to advertise. For more information about this setting, see [Advertise custom routes](vpn-gateway-p2s-advertise-custom-routes.md).

When you finish specifying your point-to-site configuration, select **Save** at the top of the page.

## <a name="vpnclient"></a>Configure the VPN client and connect

The VPN client profile configuration packages contain the settings that help you configure VPN client profiles for a connection to the Azure virtual network.

To generate a VPN client configuration package and configure a VPN client, see [Configure a VPN client for point-to-site: RADIUS authentication](point-to-site-vpn-client-configuration-radius.md).

After you configure the VPN client, connect to Azure.

## <a name="verify"></a>To verify your connection

1. To verify that your VPN connection is active, on the client computer, open an elevated command prompt, and run *ipconfig/all*.
1. View the results. Notice that the IP address you received is one of the addresses within the P2S VPN Client Address Pool that you specified in your configuration. The results are similar to this example:

   ```
   PPP adapter VNet1:
      Connection-specific DNS Suffix .:
      Description.....................: VNet1
      Physical Address................:
      DHCP Enabled....................: No
      Autoconfiguration Enabled.......: Yes
      IPv4 Address....................: 172.16.201.3(Preferred)
      Subnet Mask.....................: 255.255.255.255
      Default Gateway.................:
      NetBIOS over Tcpip..............: Enabled
   ```

To troubleshoot a P2S connection, see [Troubleshooting Azure point-to-site connections](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/vpn-gateway/vpn-gateway-troubleshoot-vpn-point-to-site-connection-problems.md).

## <a name="faq"></a>FAQ

For FAQ information, see the [Point-to-site - RADIUS authentication](vpn-gateway-vpn-faq.md#P2SRADIUS) section of the FAQ.

## Next steps

For more information about point-to-site VPN, see [About point-to-site VPN](point-to-site-about.md).
