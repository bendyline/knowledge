---
title: 'Configure P2S VPN clients - certificate authentication - OpenVPN - Linux'
titleSuffix: Azure Virtual WAN
description: Learn how to configure a Linux VPN client solution for Virtual WAN P2S configurations that use certificate authentication and an OpenVPN client.
author: duongau
ms.service: azure-virtual-wan
ms.custom: linux-related-content
ms.topic: how-to
ms.date: 08/27/2026
ms.author: duau
---

# Configure OpenVPN client for User VPN P2S certificate authentication connections - Linux

This article helps you connect to your Azure virtual network (VNet) using Virtual WAN User VPN (point-to-site) and **Certificate authentication** from Linux using an OpenVPN client.

## Before you begin

Verify that you are on the correct article. The following table shows the configuration articles available for Azure Virtual WAN P2S VPN clients. Steps differ, depending on the authentication type, tunnel type, and the client OS.


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

### Prerequisites

This article assumes that you completed the following prerequisites:

* You configured a virtual WAN according to the steps in the [Create a User VPN point-to-site connection](virtual-wan-point-to-site-portal.md) article. Your User VPN configuration must use certificate authentication and the OpenVPN tunnel type.
* You generated and downloaded the VPN client configuration files. For steps to generate a VPN client profile configuration package, see [Generate VPN client configuration files](virtual-wan-point-to-site-portal.md#p2sconfig).
* You have permissions to either generate client certificates, or acquire the appropriate client certificates necessary for authentication.

### Connection requirements

To connect to Azure using the OpenVPN client using certificate authentication, each connecting client requires the following items:

* The Open VPN Client software must be installed and configured on each client.
* The client must have the correct certificates installed locally.

### Workflow

The workflow for this article is:

1. Install the OpenVPN client.
1. View the VPN client profile configuration files contained in the VPN client profile configuration package that you generated.
1. Configure the OpenVPN client.
1. Connect to Azure.

### About certificates

For certificate authentication, a client certificate must be installed on each client computer. The client certificate you want to use must be exported with the private key, and must contain all certificates in the certification path. Additionally, for some configurations, you'll also need to install root certificate information.

The OpenVPN client in this article uses certificates exported with a *.pfx* format. You can export a client certificate easily to this format using the Windows instructions. See [Export a client certificate - pfx](certificates-point-to-site.md#clientexport). If you don't have a Windows computer, as a workaround, you can use a small Windows VM to export certificates to the needed *.pfx* format. At this time, the [OpenSSL](point-to-site-certificates-linux-openssl.md) Linux instructions we provide only result in the *.pem* format.

## <a name="openvpn"></a>Configuration steps

This section helps you configure Linux clients for certificate authentication that uses the OpenVPN tunnel type. To connect to Azure, download the OpenVPN client and configure the connection profile.



> **Note:**
> OpenVPN Client version 2.6 is not yet supported.
> 

1. Open a new Terminal session. You can open a new session by pressing 'Ctrl + Alt + t' at the same time.

1. Enter the following command to install needed components:

   ```
   sudo apt-get install openvpn
   sudo apt-get -y install network-manager-openvpn
   sudo service network-manager restart
   ```

1. Next, go to the VPN client profile folder and unzip to view the files.

1. Export the P2S client certificate you created and uploaded to your P2S configuration on the gateway. For steps, see [VPN Gateway point-to-site](../vpn-gateway/vpn-gateway-certificates-point-to-site.md#clientexport).

1. Extract the private key and the base64 thumbprint from the .pfx. There are multiple ways to do this. Using OpenSSL on your computer is one way.

   ```
   openssl pkcs12 -in "filename.pfx" -nodes -out "profileinfo.txt"
   ```

   The *profileinfo.txt* file contains the private key and the thumbprint for the CA, and the Client certificate. Be sure to use the thumbprint of the client certificate.

1. Open *profileinfo.txt* in a text editor. To get the thumbprint of the client (child) certificate, select the text including and between "-----BEGIN CERTIFICATE-----" and "-----END CERTIFICATE-----" for the child certificate and copy it. You can identify the child certificate by looking at the subject=/ line.

1. Open the *vpnconfig.ovpn* file and find the section in the following example. Replace everything between "cert" and "/cert".

   ```
   # P2S client certificate
   # please fill this field with a PEM formatted cert
   <cert>
   $CLIENTCERTIFICATE
   </cert>
   ```

1. Open the profileinfo.txt in a text editor. To get the private key, select the text including and between "-----BEGIN PRIVATE KEY-----" and "-----END PRIVATE KEY-----" and copy it.

1. Open the vpnconfig.ovpn file in a text editor and find this section. Paste the private key replacing everything between "key" and "/key".

   ```
   # P2S client root certificate private key
   # please fill this field with a PEM formatted key
   <key>
   $PRIVATEKEY
   </key>
   ```

1. Don't change any other fields. Use the filled in configuration in client input to connect to the VPN.

   - To connect using the command line, type the following command:
  
     ```
     sudo openvpn --config <name and path of your VPN profile file>&
     ```

   - To disconnect using command line, type the following command:

     ```
     sudo pkill openvpn
     ```

   - To connect using the GUI, go to system settings.

1. Select **+** to add a new VPN connection.

1. Under **Add VPN**, pick **Import from file…**.

1. Browse to the profile file and double-click or pick **Open**.

1. Select **Add** on the **Add VPN** window.
  
   Screenshot shows Import from file on the Add VPN page.

1. You can connect by turning the VPN **ON** on the **Network Settings** page, or under the network icon in the system tray.


## Next steps

For additional steps, return to the [Create a Virtual WAN P2S User VPN connection](virtual-wan-point-to-site-portal.md) article.
