---
title: 'Configure P2S VPN clients: certificate authentication: OpenVPN Client 3.x series - Windows'
titleSuffix: Azure Virtual WAN
description: Learn how to configure VPN clients for P2S User VPN configurations that use certificate authentication. This article applies to Windows and the OpenVPN Client 3.x series.
author: duongau
ms.service: azure-virtual-wan
ms.topic: how-to
ms.date: 02/04/2025
ms.author: duau
---

# Configure OpenVPN Connect 3.x clients for P2S User VPN certificate authentication connections - Windows

If your point-to-site (P2S) VPN gateway is configured to use OpenVPN and certificate authentication, you can connect to your virtual network using the OpenVPN Client. This article walks you through the steps to configure the **OpenVPN Connect client 3.x** and connect to your virtual network. There are some configuration differences between the [OpenVPN 2.x](point-to-site-vpn-client-certificate-windows-openvpn-client-version-2.md) client and the OpenVPN Connect 3.x client.

> **Note:**
> The OpenVPN client is independently managed and not under Microsoft's control. This means Microsoft doesn't oversee its code, builds, roadmap, or legal aspects. Should customers encounter any bugs or issues with the OpenVPN client, they should directly contact OpenVPN Inc. support. The guidelines in this article are provided 'as is' and haven't been validated by OpenVPN Inc. They're intended to assist customers who are already familiar with the client and wish to use it to connect to the Azure VPN gateway in a User VPN point-to-site VPN setup.

For other VPN client configuration articles, see the following table:


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

## Before you begin

Before beginning, make sure you've configured a virtual WAN according to the steps in the [Create User VPN point-to-site connections](virtual-wan-point-to-site-portal.md) article. Your User VPN configuration must use certificate authentication.

### Prerequisites

This article assumes that you've already performed the following prerequisites:

* You configured a virtual WAN according to the steps in the [Create User VPN point-to-site connections](virtual-wan-point-to-site-portal.md) article. Your User VPN configuration must use certificate authentication.
* You generated and downloaded the VPN client configuration files. For steps to generate a VPN client profile configuration package, see [Generate VPN client configuration files](virtual-wan-point-to-site-portal.md#p2sconfig).
* You can either generate client certificates, or acquire the appropriate client certificates necessary for authentication.

### Connection requirements

To connect to Azure using the OpenVPN Connect 3.x client using certificate authentication, each connecting client computer requires the following items:

* The OpenVPN Connect client software must be installed and configured on each client computer.
* The client computer must have a client certificate that's installed locally.
* If your certificate chain includes an intermediate certificate, see the [Intermediate certificates](#intermediate) section first to verify that your P2S VPN gateway configuration is set up to support this certificate chain. The certificate authentication behavior for 3.x clients is different than previous versions, where you could specify the intermediate certificate in the client profile.

### Workflow

The workflow for this article is:

1. Generate and install client certificates, if you haven't already done so.
1. View the VPN client profile configuration files contained in the VPN client profile configuration package that you generated.
1. Configure the OpenVPN Connect client.
1. Connect to Azure.

## Generate and install client certificates

For certificate authentication, a client certificate must be installed on each client computer. The client certificate you want to use must be exported with the private key, and must contain all certificates in the certification path. Additionally, for some configurations, you'll also need to install root certificate information.

In many cases, you can install the client certificate directly on the client computer by double-clicking. However, for some OpenVPN client configurations, you might need to extract information from the client certificate in order to complete the configuration.

* For information about working with certificates, see [Generate and export certificates](certificates-point-to-site.md#clientcert).
* To view an installed client certificate, open **Manage User Certificates**. The client certificate is installed in **Current User\Personal\Certificates**.

### Install the client certificate

Each computer needs a client certificate in order to authenticate. If the client certificate isn't already installed on the local computer, you can install it using the following steps:

1. Locate the client certificate. For more information about client certificates, see [Install client certificates](install-client-certificates.md).
1. Install the client certificate. Typically, you can install a certificate by double-clicking the certificate file and providing a password (if required).
1. You'll also use the client certificate later in this exercise to configure the OpenVPN Connect client profile settings.

## View client profile configuration files

The VPN client profile configuration package contains specific folders. The files within the folders contain the settings needed to configure the VPN client profile on the client computer. The files and the settings they contain are specific to the VPN gateway and the type of authentication and tunnel your VPN gateway is configured to use.

Locate and unzip the VPN client profile configuration package you generated. For Certificate authentication and OpenVPN, you should see  the **OpenVPN** folder. If you don't see the folder, verify the following items:

* Verify that your VPN gateway is configured to use the OpenVPN tunnel type.
* If you're using Microsoft Entra ID authentication, you might not have an OpenVPN folder. See the [Microsoft Entra ID](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-wan/openvpn-azure-ad-client.md) configuration article instead.

## Configure the client


1. Download and install the OpenVPN client version 3.x from the official [OpenVPN website](https://openvpn.net/client/client-connect-vpn-for-windows/).
1. Locate the VPN client profile configuration package that you generated and downloaded to your computer. Extract the package. Go to the OpenVPN folder and open the *vpnconfig.ovpn* configuration file using Notepad.
1. Next, locate the child certificate you created. If you don't have the certificate, use one of the following links for steps to export the certificate. You'll use the certificate information in the next step.

   * [VPN Gateway](https://learn.microsoft.com/azure/vpn-gateway/vpn-gateway-certificates-point-to-site#clientexport) instructions
   * [Virtual WAN](https://learn.microsoft.com/azure/virtual-wan/certificates-point-to-site#clientexport) instructions
1. From the child certificate, extract the private key and the base64 thumbprint from the *.pfx*. There are multiple ways to do this. Using OpenSSL on your computer is one way. The *profileinfo.txt* file contains the private key and the thumbprint for the CA and the Client certificate. Be sure to use the thumbprint of the client certificate.

   ```
   openssl pkcs12 -in "filename.pfx" -nodes -out "profileinfo.txt"
   ```
1. Switch to the **vpnconfig.ovpn** file you opened in Notepad. Fill in the section between `<cert>` and `</cert>`, getting the values for `$CLIENT_CERTIFICATE`, and `$ROOT_CERTIFICATE` as shown in the following example.

   ```
      # P2S client certificate
      # please fill this field with a PEM formatted cert
      <cert>
      $CLIENT_CERTIFICATE
      $ROOT_CERTIFICATE
      </cert>
      ```

   * Open **profileinfo.txt** from the previous step in Notepad. You can identify each certificate by looking at the `subject=` line. For example, if your child certificate is called P2SChildCert, your client certificate will be after the `subject=CN = P2SChildCert` attribute.
   * For each certificate in the chain, copy the text (including and between) "-----BEGIN CERTIFICATE-----" and "-----END CERTIFICATE-----".

1. Open the *profileinfo.txt* in Notepad. To get the private key, select the text (including and between) "-----BEGIN PRIVATE KEY-----" and "-----END PRIVATE KEY-----" and copy it.
1. Go back to the vpnconfig.ovpn file in Notepad and find this section. Paste the private key replacing everything between and `<key>` and `</key>`.

   ```
   # P2S client root certificate private key
   # please fill this field with a PEM formatted key
   <key>
   $PRIVATEKEY
   </key>
   ```

1. Comment out the "log openvpn.log" line. If it's not commented out, the OpenVPN client reports that the log is no longer a supported option. See the [User profile example](#example) for an example of how to comment out the log line. After commenting out the log line, you can still access logs via the OpenVPN client interface. To access, click the log icon at the top right corner of the client UI. Microsoft recommends that customers check the OpenVPN connect documentation for log file location because logging is controlled by the OpenVPN client.
1. Don't change any other fields. Use the filled in configuration in client input to connect to the VPN.
1. Import the vpnconfig.ovpn file in OpenVPN client.
1. Right-click the OpenVPN icon in the system tray and click **Connect**.


### <a name="example"></a>User profile example


The following example shows a user profile configuration file for 3.x OpenVPN Connect clients. This example shows the log file commented out and the "ping-restart 0" option added to prevent periodic reconnects due to no traffic being sent to the client.

```
client
remote <vpnGatewayname>.ln.vpn.azure.com 443
verify-x509-name <IdGateway>.ln.vpn.azure.com name
remote-cert-tls server

dev tun
proto tcp
resolv-retry infinite
nobind

auth SHA256
cipher AES-256-GCM
persist-key
persist-tun

tls-timeout 30
tls-version-min 1.2
key-direction 1

#log openvpn.log
#inactive 0
ping-restart 0 
verb 3

# P2S CA root certificate
<ca>
-----BEGIN CERTIFICATE-----
……
……..
……..
……..

-----END CERTIFICATE-----
</ca>

# Pre Shared Key
<tls-auth>
-----BEGIN OpenVPN Static key V1-----
……..
……..
……..

-----END OpenVPN Static key V1-----
</tls-auth>

# P2S client certificate
# Please fill this field with a PEM formatted client certificate
# Alternatively, configure 'cert PATH_TO_CLIENT_CERT' to use input from a PEM certificate file.
<cert>
-----BEGIN CERTIFICATE-----
……..
……..
……..
-----END CERTIFICATE-----
</cert>

# P2S client certificate private key
# Please fill this field with a PEM formatted private key of the client certificate.
# Alternatively, configure 'key PATH_TO_CLIENT_KEY' to use input from a PEM key file.
<key>
-----BEGIN PRIVATE KEY-----
……..
……..
……..
-----END PRIVATE KEY-----
</key>
```

## <a name="intermediate"></a>Intermediate certificates

If your certificate chain includes intermediate certificates, you must upload the intermediate certificates to the Azure VPN gateway.
This is the preferred method to use, regardless of the VPN client you choose to connect from. In previous versions, you could specify intermediate certificates in the user profile. This is no longer supported in OpenVPN Connect client version 3.x.

When you're working with intermediate certificates, the intermediate certificate must be uploaded after the root certificate.

## Reconnects

If you experience periodic reconnects due to no traffic being sent to client, you can add the "ping-restart 0" option to the profile to prevent disconnections from causing reconnects. This is described in the OpenVPN Connect documentation as follows: " --ping-restart n Similar to --ping-exit, but trigger a SIGUSR1 restart after n seconds pass without reception of a ping or other packet from remote."

See the [User profile example](#example) for an example of how to add this option.

## Next steps

Follow up with any additional server or connection settings. See [Tutorial: Create a P2S User VPN connection](virtual-wan-point-to-site-portal.md).
