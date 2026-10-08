---
title: 'P2S VPN client profile configuration files - Microsoft Entra authentication'
titleSuffix: Azure VPN Gateway
description: Learn how to generate P2S VPN client profile configuration files for Microsoft Entra ID authentication.
author: duongau
ms.service: azure-vpn-gateway
ms.custom: devx-track-azurepowershell
ms.topic: how-to
ms.date: 03/31/2025
ms.author: duau
# Customer intent: "As a network administrator, I want to generate VPN client profile configuration files for Microsoft Entra ID authentication, so that I can properly configure VPN clients for secure point-to-site connections."
---
# Generate VPN Client profile configuration files - Microsoft Entra ID authentication

This article helps you generate and extract VPN client profile configuration files. Client profile configuration files contain information that's used to configure your VPN client. The sections in this article explain the information needed to configure the Azure VPN Client profile for Azure VPN Gateway point-to-site configurations that use Microsoft Entra ID authentication.

## <a name="generate"></a>Generate profile configuration files

You can generate VPN client profile configuration files either with PowerShell, or the Azure portal. Either method returns the same zip file.

### Azure portal


1. In the Azure portal, go to the virtual network gateway for the virtual network to which you want to connect.
1. On the virtual network gateway page, select **Point-to-site configuration** to open the Point-to-site configuration page.
1. At the top of the **Point-to-site configuration** page, select **Download VPN client**. This doesn't download VPN client software, it generates the configuration package used to configure VPN clients. It takes a few minutes for the client configuration package to generate. During this time, you might not see any indications until the packet generates.

   Screenshot of Point-to-site configuration page.

1. Once the configuration package is generated, your browser indicates that a client configuration zip file is available. It's named the same name as your gateway.
1. Unzip the file to view the folders. You'll use some, or all, of these files to configure your VPN client. The files that are generated correspond to the authentication and tunnel type settings that you configured on the P2S server.


### PowerShell

To generate the VPN client profile configuration files using PowerShell, you can use the following example:


When you generate VPN client configuration files, the value for '-AuthenticationMethod' is 'EapTls'. Generate the VPN client configuration files using the following command:

```azurepowershell-interactive
$profile=New-AzVpnClientConfiguration -ResourceGroupName "TestRG" -Name "VNet1GW" -AuthenticationMethod "EapTls"

$profile.VPNProfileSASUrl
```

Copy the URL to your browser to download the zip file.

## <a name="extract"></a>Extract the zip file

Extract the zip file. The file contains the following folders:

* **AzureVPN**: The AzureVPN folder contains the **Azurevpnconfig.xml** file that is used to configure the Azure VPN Client.
* **Generic**: The generic folder contains the public server certificate and the VpnSettings.xml file. The VpnSettings.xml file contains information needed to configure a generic client

## <a name="get"></a>Retrieve file information

In the **AzureVPN** folder, go to the ***azurevpnconfig.xml*** file and open it with Notepad. Make a note of the text between the following tags. This information is used later when configuring the Azure VPN Client.

```
<audience>          </audience>
<issuer>            </issuer>
<tenant>            </tenant>
<fqdn>              </fqdn>
<serversecret>      </serversecret>
```

## <a name="details"></a>Profile details

When you add a connection, use the information you collected in the previous step for the profile details page. The fields correspond to the following information:

* **Audience:** Identifies the recipient resource the token is intended for.
* **Issuer:** Identifies the Security Token Service (STS) that emitted the token, and the Microsoft Entra tenant.
* **Tenant:** Contains an immutable, unique identifier of the directory tenant that issued the token.
* **FQDN:** The fully qualified domain name (FQDN) on the Azure VPN gateway.
* **ServerSecret:** The VPN gateway preshared key.


## Next steps

Configure the Azure VPN client. See [Configure a VPN client for P2S Microsoft Entra ID authentication connections](point-to-site-entra-vpn-client.md).

For more information about point-to-site, see [About point-to-site](point-to-site-about.md).
