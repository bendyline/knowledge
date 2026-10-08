---
ms.author: duau
author: duongau
ms.date: 02/04/2025
ms.service: azure-virtual-wan
ms.topic: include
---

**IKEv2**

In the User VPN configuration, if you specified the IKEv2 VPN tunnel type, you can configure the native VPN client (Windows and macOS Catalina or later).

The following steps are for Windows. For macOS, see [Configure P2S User VPN clients - native VPN client - macOS](../../../virtual-wan/point-to-site-vpn-client-cert-mac.md) steps.

1. Select the VPN client configuration files that correspond to the architecture of the Windows computer. For a 64-bit processor architecture, choose the 'VpnClientSetupAmd64' installer package. For a 32-bit processor architecture, choose the 'VpnClientSetupX86' installer package.

1. Double-click the package to install it. If you see a SmartScreen popup, select **More info**, then **Run anyway**.

1. On the client computer, navigate to **Network Settings** and select **VPN**. The VPN connection shows the name of the virtual network that it connects to.

1. Install a client certificate on each computer that you want to connect through this User VPN configuration. You need a client certificate for authentication when using the native Azure certificate authentication type. For more information about generating certificates, see [Generate Certificates](../../../virtual-wan/certificates-point-to-site.md). For information about how to install a client certificate, see [Install a client certificate](../../../virtual-wan/install-client-certificates.md).

**OpenVPN**

In the User VPN configuration, if you specified the OpenVPN tunnel type, you can download and configure the Azure VPN Client or, in some cases, you can use OpenVPN client software. For steps, use the link that corresponds to your configuration.

**Client configuration**


| Authentication method | Tunnel type | Client OS | VPN client |
| --- | --- | --- | --- |
| Certificate | IKEv2, SSTP | Windows | [Native VPN client](../../../virtual-wan/point-to-site-vpn-client-certificate-windows-native.md) |
|  | IKEv2 | macOS | [Native VPN client](../../../virtual-wan/point-to-site-vpn-client-cert-mac.md) |
|  | IKEv2 | Linux | [strongSwan](../../../virtual-wan/point-to-site-vpn-client-certificate-ike-linux.md) |
|  | OpenVPN | Windows | [Azure VPN client](../../../virtual-wan/vpn-client-certificate-windows.md)<br>[OpenVPN client version 2.x](../../../virtual-wan/point-to-site-vpn-client-certificate-windows-openvpn-client-version-2.md)<br>[OpenVPN client version 3.x](../../../virtual-wan/point-to-site-vpn-client-certificate-windows-openvpn-client-version-3.md) |
|  | OpenVPN | macOS | [OpenVPN client](../../../virtual-wan/point-to-site-vpn-client-certificate-openvpn-mac.md) |
|  | OpenVPN | iOS | [OpenVPN client](../../../virtual-wan/point-to-site-vpn-client-certificate-openvpn-ios.md) |
|  | OpenVPN | Linux | [OpenVPN client](../../../virtual-wan/point-to-site-vpn-client-certificate-openvpn-linux.md) |
| Microsoft Entra ID | OpenVPN | Windows | [Azure VPN client](../../../virtual-wan/point-to-site-entra-vpn-client-windows.md) |
|  | OpenVPN | macOS | [Azure VPN client](../../../virtual-wan/point-to-site-entra-vpn-client-mac.md) |
