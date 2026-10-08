---
title: 'Install a User VPN P2S client certificate'
titleSuffix: Azure Virtual WAN
description: Learn how to install client certificates for User VPN P2S certificate authentication - Windows, Mac, Linux.
author: duongau
ms.service: azure-virtual-wan
ms.custom: linux-related-content
ms.topic: how-to
ms.date: 02/13/2025
ms.author: duau
---
# Install client certificates for User VPN connections

When a Virtual WAN User VPN P2S configuration is configured for certificate authentication, each client computer must have a client certificate installed locally. This article helps you install a client certificate locally on a client computer. You can also use [Intune](https://learn.microsoft.com/mem/intune/configuration/vpn-settings-configure) to install certain VPN client profiles and certificates.

If you want to generate a client certificate, see [Generate and export certificates for User VPN connections](certificates-point-to-site.md).

## <a name="installwin"></a>Windows

1. Once the client certificate is exported, locate and copy the *.pfx* file to the client computer.
1. On the client computer, double-click the *.pfx* file to install. Leave the **Store Location** as **Current User**, and then select **Next**.
1. On the **File** to import page, don't make any changes. Select **Next**.
1. On the **Private key protection** page, input the password for the certificate, or verify that the security principal is correct, then select **Next**.
1. On the **Certificate Store** page, leave the default location, and then select **Next**.
1. Select **Finish**. On the **Security Warning** for the certificate installation, select **Yes**. You can comfortably select 'Yes' for this security warning because you generated the certificate.
1. The certificate is now successfully imported.


## <a name="installmac"></a>macOS

1. Locate the .pfx certificate file and copy it to your Mac. You can get the certificate to the Mac in several ways. For example, you can email the certificate file.
1. Double-click the certificate. You'll either be asked to input the password and the certificate will automatically install, or the **Add Certificates** box will appear. On the **Add Certificates** box, click **Add** to begin the install.
1. Select **login** from the dropdown.
1. Enter the password that you created when the client certificate was exported. The password protects the private key of the certificate. Click **OK**.
1. Click **Add** to add the certificate.
1. To view the added certificate, open the **Keychain Access** application and navigate to the **Certificates** tab.


## <a name="installlinux"></a>Linux

The Linux client certificate is installed on the client as part of the client configuration. There are a few different methods to install certificates. You can use [strongSwan](point-to-site-vpn-client-certificate-ike-linux.md), or [OpenVPN client](point-to-site-vpn-client-certificate-openvpn-linux.md) steps.

## <a name="vpn-clients"></a>Configure VPN clients

To continue configuration, go back to the VPN client instructions that you were working with. You can use this table to locate the link:


| Authentication method | Tunnel type | Client OS | VPN client |
| --- | --- | --- | --- |
| Certificate | IKEv2, SSTP | Windows | [Native VPN client](point-to-site-vpn-client-certificate-windows-native.md) |
|  | IKEv2 | macOS | [Native VPN client](point-to-site-vpn-client-cert-mac.md) |
|  | IKEv2 | Linux | [strongSwan](point-to-site-vpn-client-certificate-ike-linux.md) |
|  | OpenVPN | Windows | [Azure VPN client](vpn-client-certificate-windows.md)<br>[OpenVPN client version 2.x](point-to-site-vpn-client-certificate-windows-openvpn-client-version-2.md)<br>[OpenVPN client version 3.x](point-to-site-vpn-client-certificate-windows-openvpn-client-version-3.md) |
|  | OpenVPN | macOS | [OpenVPN client](point-to-site-vpn-client-certificate-openvpn-mac.md) |
|  | OpenVPN | iOS | [OpenVPN client](point-to-site-vpn-client-certificate-openvpn-ios.md) |
|  | OpenVPN | Linux | [OpenVPN client](point-to-site-vpn-client-certificate-openvpn-linux.md) |
| Microsoft Entra ID | OpenVPN | Windows | [Azure VPN client](point-to-site-entra-vpn-client-windows.md) |
|  | OpenVPN | macOS | [Azure VPN client](point-to-site-entra-vpn-client-mac.md) |

## Next steps

For P2S server configuration, see [Configure User VPN settings for certificate authentication](virtual-wan-point-to-site-portal.md#p2sconfig) configuration steps.
