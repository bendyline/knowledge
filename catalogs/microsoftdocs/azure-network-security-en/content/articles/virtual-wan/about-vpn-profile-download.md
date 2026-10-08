---
title: 'Azure Virtual WAN: User VPN client profiles'
description: This helps you work with the client profile file
services: virtual-wan
author: duongau

ms.service: azure-virtual-wan
ms.topic: how-to
ms.date: 02/04/2025
ms.author: duau

---
# Working with User VPN client profile files

The profile files contain information that is necessary to configure a VPN connection. This article helps you obtain and understand the information necessary for a User VPN client profile.

## Download the profile

You can use the steps in the [Download profiles](global-hub-profile.md) article to download the client profile zip file.


## Extract the zip file

Extract the zip file. The file contains the following folders:

* AzureVPN
* Generic
* OpenVPN (If you have enabled the OpenVPN with **Azure certificate** or **RADIUS authentication** settings on the gateway). Select the appropriate article that corresponds to your configuration to create a tenant.

  * [VPN Gateway- Create a tenant](../vpn-gateway/openvpn-azure-ad-tenant.md)
  * [Virtual WAN - Create a tenant](openvpn-azure-ad-tenant.md)

## Retrieve information

In the **AzureVPN** folder, navigate to the ***azurevpnconfig.xml*** file and open it with Notepad. Make a note of the text between the following tags.

```
<audience>          </audience>
<issuer>            </issuer>
<tenant>            </tenant>
<fqdn>              </fqdn>
<serversecret>      </serversecret>
```

## Profile details

When you add a connection, use the information you collected in the previous step for the profile details page. The fields correspond to the following information:

* **Audience:** Identifies the recipient resource the token is intended for.
* **Issuer:** Identifies the Security Token Service (STS) that emitted the token as well as the Microsoft Entra tenant.
* **Tenant:** Contains an immutable, unique identifier of the directory tenant that issued the token.
* **FQDN:** The fully qualified domain name (FQDN) on the Azure VPN gateway.
* **ServerSecret:** The VPN gateway preshared key.

## Folder contents

* The **generic folder** contains the public server certificate and the VpnSettings.xml file. The VpnSettings.xml file contains information needed to configure a generic client.

* The downloaded zip file may also contain **WindowsAmd64** and **WindowsX86** folders. These folders contain the installer for SSTP and IKEv2 for Windows clients. You need admin rights on the client to install them.


* The **OpenVPN folder** contains the *ovpn* profile that needs to be modified to include the key and the certificate.

For information about how to configure a VPN client, select the article from the following table that corresponds to you P2S gateway configuration and client.


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

For more information about Virtual WAN User VPN, see [Create a User VPN connection](virtual-wan-point-to-site-portal.md).
