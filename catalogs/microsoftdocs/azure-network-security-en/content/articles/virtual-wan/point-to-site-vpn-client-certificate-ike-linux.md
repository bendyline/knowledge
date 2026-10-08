---
title: 'Configure User VPN clients - certificate authentication IKEv2 - Linux'
titleSuffix: Azure Virtual WAN
description: Learn how to configure an Ubuntu Linux strongSwan VPN client solution for User VPN Configurations that use certificate authentication.
author: duongau
ms.service: azure-virtual-wan
ms.custom: linux-related-content
ms.topic: how-to
ms.date: 02/06/2025
ms.author: duau
---

# Configure strongSwan VPN for User VPN P2S certificate authentication IKEv2 connections - Linux

This article helps you connect to your Azure virtual network (VNet) using Virtual WAN User VPN point-to-site (P2S) VPN and **Certificate authentication** from an Ubuntu Linux client using strongSwan.

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

* You configured a virtual WAN according to the steps in the [Create a User VPN point-to-site connection](virtual-wan-point-to-site-portal.md) article. Your User VPN configuration must use certificate authentication and the IKEv2 tunnel type.
* You generated and downloaded the VPN client configuration files. For steps to generate a VPN client profile configuration package, see [Generate VPN client configuration files](virtual-wan-point-to-site-portal.md#download).
* You have permissions to either generate client certificates, or acquire the appropriate client certificates necessary for authentication.


### Connection requirements

To connect to Azure using the strongSwan client and certificate authentication via IKEv2 tunnel type, each connecting client requires the following items:

* Each client must be configured to use strongSwan.
* The client must have the correct certificates installed locally.

### Workflow

The workflow for this article is:

1. Install strongSwan.
1. View the VPN client profile configuration files contained in the VPN client profile configuration package that you generated.
1. Locate any necessary client certificates.
1. Configure strongSwan.
1. Connect to Azure.

### About certificates

For certificate authentication, a client certificate must be installed on each client computer. The client certificate you want to use must be exported with the private key, and must contain all certificates in the certification path. Additionally, for some configurations, you'll also need to install root certificate information.

For more information about certificates for Linux, see the following articles:

* [Generate certificates - OpenSSL](../vpn-gateway/point-to-site-certificates-linux-openssl.md)
* [Generate certificates - strongSwan](../vpn-gateway/vpn-gateway-certificates-point-to-site-linux.md)

## Install strongSwan


The following configuration was used when specifying commands:

* Computer: Ubuntu Server 18.04
* Dependencies: strongSwan

Use the following commands to install the required strongSwan configuration:

```CLI
sudo apt-get update
```

```CLI
sudo apt-get upgrade
```

```CLI
sudo apt install strongswan
```

```CLI
sudo apt install strongswan-pki
```

```CLI
sudo apt install libstrongswan-extra-plugins
```

```CLI
sudo apt install libtss2-tcti-tabrmd0
```

## View strongSwan VPN client profile configuration files

When you generate a VPN client profile configuration package, all the necessary configuration settings for VPN clients are contained in a VPN client profile configuration zip file. The VPN client profile configuration files are specific to the P2S VPN gateway configuration for the virtual network. If there are any changes to the P2S VPN configuration after you generate the files, such as changes to the VPN protocol type or authentication type, you need to generate new VPN client profile configuration files and apply the new configuration to all of the VPN clients that you want to connect.

Locate and unzip the VPN client profile configuration package you generated and downloaded. You can find all of the information that you need for configuration in the **Generic** folder. Azure doesn’t provide a *mobileconfig* file for this configuration.

If you don't see the Generic folder, check the following items, then generate the zip file again.

* Check the tunnel type for your configuration. It's likely that IKEv2 wasn’t selected as a tunnel type.
* On the VPN gateway, verify that the SKU isn’t Basic. The VPN Gateway Basic SKU doesn’t support IKEv2. Then, select IKEv2 and generate the zip file again to retrieve the Generic folder.

The Generic folder contains the following files:

* **VpnSettings.xml**, which contains important settings like server address and tunnel type.
* **VpnServerRoot.cer**, which contains the root certificate required to validate the Azure VPN gateway during P2S connection setup.

## Configure the VPN client

After viewing the VPN client profile files, continue with the steps that you want to use:

* [GUI steps](#gui)
* [CLI steps](#cli)

### <a name="gui"></a>GUI steps

This section walks you through the configuration using the strongSwan GUI. The following instructions were created on Ubuntu 18.0.4. Ubuntu 16.0.10 doesn’t support strongSwan GUI. If you want to use Ubuntu 16.0.10, you’ll have to use the [command line](#cli). The following examples might not match screens that you see, depending on your version of Linux and strongSwan.

1. Open the **Terminal** to install **strongSwan** and its Network Manager by running the command in the example.

   ```
   sudo apt install network-manager-strongswan
   ```

1. Select **Settings**, then select **Network**. Select the **+** button to create a new connection.

   Screenshot shows the network connections page.

1. On the **Add VPN** page, select **IPsec/IKEv2 (strongSwan)** from the  menu, and double-click.

1. On the **Add VPN** page, add a name for your VPN connection.

1. Open the **VpnSettings.xml** file from the **Generic** folder contained in the downloaded VPN client profile configuration package files. Find the tag called **VpnServer** and copy the name, beginning with 'azuregateway' and ending with '.cloudapp.net'.

   Screenshot shows copy data.

1. Paste the name in the **Address** field of your new VPN connection in the **Gateway** section. Next, select the folder icon at the end of the **Certificate** field, browse to the **Generic** folder, and select the **VpnServerRoot** file.

1. In the **Client** section of the connection, for **Authentication**, select **Certificate/private key**. For **Certificate** and **Private key**, choose the certificate and the private key that were created earlier. In **Options**, select **Request an inner IP address**. Then, select **Add**.

   Screenshot shows Request an inner IP address.

1. Turn the connection **On**.

   Screenshot shows copy.

### <a name="cli"></a>CLI steps

This section walks you through the configuration using the strongSwan CLI.

1. From the VPN client profile configuration files **Generic** folder, copy or move the **VpnServerRoot.cer** to **/etc/ipsec.d/cacerts**.

1. Copy or move the files you generated to **/etc/ipsec.d/certs** and **/etc/ipsec.d/private/** respectively. These files are the client certificate and the private key, they need to be located in their corresponding directories. Use the following commands:

   ```cli
   sudo cp ${USERNAME}Cert.pem /etc/ipsec.d/certs/
   sudo cp ${USERNAME}Key.pem /etc/ipsec.d/private/
   sudo chmod -R go-rwx /etc/ipsec.d/private /etc/ipsec.d/certs
   ```

1. Run the following command to take note of your hostname. You’ll use this value in the next step.

   ```cli
   hostnamectl --static
   ```

1. Open the **VpnSettings.xml** file and copy the `<VpnServer>` value. You’ll use this value in the next step.

1. Adjust the values in the following example, then add the example to the **/etc/ipsec.conf** configuration.
  
   ```cli
   conn azure
         keyexchange=ikev2
         type=tunnel
         leftfirewall=yes
         left=%any
         # Replace ${USERNAME}Cert.pem with the key filename inside /etc/ipsec.d/certs  directory. 
         leftcert=${USERNAME}Cert.pem
         leftauth=pubkey
         leftid=%client # use the hostname of your machine with % character prepended. Example: %client
         right= #Azure VPN gateway address. Example: azuregateway-xxx-xxx.vpn.azure.com
         rightid=% #Azure VPN gateway FQDN with % character prepended. Example: %azuregateway-xxx-xxx.vpn.azure.com
         rightsubnet=0.0.0.0/0
         leftsourceip=%config
         auto=add
         esp=aes256gcm16
   ```

1. Add the secret values to **/etc/ipsec.secrets**.

   The name of the PEM file must match what you have used earlier as your client key file.

   ```cli
   : RSA ${USERNAME}Key.pem  # Replace ${USERNAME}Key.pem with the key filename inside /etc/ipsec.d/private directory. 
   ```

1. Run the following commands:

   ```cli
   sudo ipsec restart
   sudo ipsec up azure
   ```


## Next steps

For additional steps, return to the [Create a Virtual WAN P2S User VPN connection](virtual-wan-point-to-site-portal.md) article.
