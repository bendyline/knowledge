---
title: 'Configure P2S VPN clients - certificate authentication - Azure VPN Client - Linux'
titleSuffix: Azure Virtual WAN
description: Learn how to configure a Linux client to connect to Azure using a User VPN point-to-site connection, Open VPN, and the Azure VPN Client for Linux.
author: duongau
ms.service: azure-virtual-wan
ms.custom: linux-related-content
ms.topic: how-to
ms.date: 05/26/2026
ms.author: duau
---
# Configure Azure VPN Client – P2S User VPN certificate authentication – Linux (Retired)


> **Important:**
> The Azure VPN Client for Linux (Preview) retired on 31 August, 2026. After this date, the client is no longer supported. For more information, see the **Azure VPN Client for Linux Retirement overview and migration guide** for [VPN Gateway](../vpn-gateway/azure-vpn-client-linux-retirement.md) and [Virtual WAN](azure-vpn-client-linux-retirement.md).


This article helps you connect to your Azure virtual network (VNet) using the Azure VPN Client for Linux. These instructions apply to User VPN point-to-site (P2S) and **Certificate authentication** connections. The Azure VPN Client for Linux requires the **OpenVPN** tunnel type.

The VPN client configuration files that you generate are specific to the P2S User VPN gateway configuration. If there are changes to the P2S VPN configuration after you generate the files, such as changes to the VPN protocol type or authentication type, you need to generate new VPN client configuration files and apply the new configuration to all of the VPN clients that you want to connect.


Before retirement, the Azure VPN Client for Linux (Preview) supported only the following releases:

- Ubuntu 20.04
- Ubuntu 22.04

While the client might have worked on other distributions and releases, support was limited to the versions listed earlier.


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

This article assumes that you've already performed the following prerequisites:

* You configured a virtual WAN according to the steps in the [Create User VPN point-to-site connections](virtual-wan-point-to-site-portal.md) article. Your User VPN configuration must use certificate authentication and the OpenVPN tunnel type.
* You generated and downloaded the VPN client configuration files. For steps to generate a VPN client profile configuration package, see [Generate VPN client configuration files](virtual-wan-point-to-site-portal.md#p2sconfig).
* You can either generate client certificates, or acquire the appropriate client certificates necessary for authentication.


### Connection requirements

To connect to Azure using the Azure VPN Client and certificate authentication, each connecting client requires the following items:

* The Azure VPN Client software must be installed and configured on each client.
* The client must have the correct certificates installed locally.

### Workflow

The workflow for this article is:

1. Generate and install client certificates.
1. Locate and view the VPN client profile configuration files contained in the VPN client profile configuration package that you generated.
1. Download and configure the Azure VPN Client for Linux.
1. Connect to Azure.

## Generate certificates

For certificate authentication, a client certificate must be installed on each client computer. The client certificate you want to use must be exported with the private key, and must contain all certificates in the certification path. Additionally, for some configurations, you'll also need to install root certificate information.

Generate the client public certificate data and private key in **.pem** format using the following commands. To run the commands, you need to have the public Root certificate **caCert.pem** and the private key of Root certificate **caKey.pem**. For more information, see [Generate and export certificates - Linux - OpenSSL](../vpn-gateway/point-to-site-certificates-linux-openssl.md).

> **Note:**
> Microsoft recommends that you use the most secure authentication flow available. The authentication flow described in this procedure requires a very high degree of trust in the application, and carries risks that aren't present in other flows. You should only use this flow when other more secure flows, such as managed identities, aren't viable.

```
export PASSWORD="password"
export USERNAME=$(hostnamectl --static)
 
# Generate a private key
openssl genrsa -out "${USERNAME}Key.pem" 2048 
 
# Generate a CSR
openssl req -new -key "${USERNAME}Key.pem" -out "${USERNAME}Req.pem" -subj "/CN=${USERNAME}" 
 
# Sign the CSR using the CA certificate and key
openssl x509 -req -days 365 -in "${USERNAME}Req.pem" -CA caCert.pem -CAkey caKey.pem -CAcreateserial -out "${USERNAME}Cert.pem" -extfile <(echo -e "subjectAltName=DNS:${USERNAME}\nextendedKeyUsage=clientAuth")
```

## View Azure VPN Client profile configuration files

When you generate and download a VPN client profile configuration package, all the necessary configuration settings for VPN clients are contained in a VPN client profile configuration zip file. The VPN client profile configuration files are specific to the P2S VPN gateway configuration for the virtual network. If there are any changes to the P2S VPN configuration after you generate the files, such as changes to the VPN protocol type or authentication type, you need to generate new VPN client profile configuration files and apply the new configuration to all of the VPN clients that you want to connect.

Locate and unzip the VPN client profile configuration package you generated and downloaded (listed in the [Prerequisites](#prerequisites)). Open the **AzureVPN** folder. In this folder, you'll see either the **azurevpnconfig_cert.xml** file or the **azurevpnconfig.xml** file, depending on whether your P2S configuration includes multiple authentication types. The .xml file contains the settings you use to configure the VPN client profile.

If you don't see either file, or you don't have an **AzureVPN** folder, verify that your VPN gateway is configured to use the OpenVPN tunnel type and that certificate authentication is selected.

## Download the Azure VPN Client

Add the Microsoft repository list and install the Azure VPN Client for Linux using the following commands:

```
# install curl utility
sudo apt-get install curl

# Install Microsoft's public key
curl -sSl https://packages.microsoft.com/keys/microsoft.asc | sudo tee /etc/apt/trusted.gpg.d/microsoft.asc

# Install the production repo list for focal
# For Ubuntu 20.04
curl https://packages.microsoft.com/config/ubuntu/20.04/prod.list | sudo tee /etc/apt/sources.list.d/microsoft-ubuntu-focal-prod.list

# Install the production repo list for jammy
# For Ubuntu 22.04
curl https://packages.microsoft.com/config/ubuntu/22.04/prod.list | sudo tee /etc/apt/sources.list.d/microsoft-ubuntu-jammy-prod.list

sudo apt-get update

sudo apt-get install microsoft-azurevpnclient
```

For more information about the repository, see [Linux Software Repository for Microsoft Products](https://learn.microsoft.com/linux/packages).

## Configure the Azure VPN Client profile

1. Open the Azure VPN Client.
1. On the bottom left of the page of the Linux VPN client, select **Import**.

   Screenshot of Azure VPN Client for Linux with Import.
1. In the window, navigate to either the **azurevpnconfig.xml** or **azurevpnconfig_cert.xml** file, select it, then select **Open**.
1. To add **Client Certificate Public Data**, use the file picker and locate the related **.pem** files.

   Screenshot of Azure VPN Client for Linux with client certificate data selected.
1. To add the **Client Certificate Private Key**, use the picker and select the certificate files path in the text boxes for the private key, with file extension **.pem**.
1. After the import validates (imports with no errors), select **Save**.
1. In the left pane, locate the VPN connection profile you created. Select **Connect**.
1. When the client is successfully connected, the status shows as **Connected** with a green icon.
1. You can view the connection logs summary in the **Status Logs** on the main screen of the VPN client.

   Screenshot of Azure VPN Client for Linux with client showing the status logs.

## Uninstall the Azure VPN Client

If you want to uninstall the Azure VPN Client, use the following command in the terminal:

```
sudo apt remove microsoft-azurevpnclient
```

## Next steps

For additional steps, return to the [Create a Virtual WAN P2S User VPN connection](virtual-wan-point-to-site-portal.md) article.
