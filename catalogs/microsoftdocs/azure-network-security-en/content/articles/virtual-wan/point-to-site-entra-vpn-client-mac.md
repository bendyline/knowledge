---
title: Configure Azure VPN Client - P2S Microsoft Entra ID authentication - macOS
titleSuffix: Azure Virtual WAN
description: Learn how to configure the Azure VPN Client on macOS for Virtual WAN P2S configurations that use Microsoft Entra ID authentication.
ms.service: azure-virtual-wan
ms.topic: how-to
ms.date: 03/07/2025
ms.author: duau
author: duongau
---

# Configure Azure VPN Client - Microsoft Entra ID authentication - macOS

This article helps you configure your macOS client computer to connect to an Azure virtual network using a Virtual WAN User VPN point-to-site (P2S) connection. These steps apply to Azure VPN gateways configured for Microsoft Entra ID authentication. Microsoft Entra ID authentication only supports OpenVPN® protocol connections and requires the Azure VPN Client. The Azure VPN client for macOS is currently not available in France and China due to local regulations and requirements.

## Before you begin

Verify that you are on the correct article. The following table shows the configuration articles available for Azure Virtual WAN point-to-site (P2S) VPN clients. Steps differ, depending on the authentication type, tunnel type, and the client OS.


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

## Prerequisites

This article assumes that you've already performed the following prerequisites:

* You configured a virtual WAN according to the steps in the [Configure a User VPN (P2S) gateway for Microsoft Entra ID authentication](point-to-site-entra-gateway.md) article. Your User VPN configuration must use Microsoft Entra ID (Azure Active Directory) authentication and the OpenVPN tunnel type.
* You generated and downloaded the VPN client configuration files. For steps to generate a VPN client profile configuration package, see [Download global and hub profiles](global-hub-profile.md).

* Verify the client computer is running a supported OS on a supported processor.

  * Supported macOS releases: 15 (Sequoia), 14 (Sonoma), 13 (Ventura), 12 (Monterey)
  * Supported processors: x64, Arm64

* If your device has an M-series chip and VPN client release earlier 2.7.101, you must install Rosetta software. For more information, see the [Apple support article](https://support.apple.com/en-us/HT211861)
* If you’re using Azure VPN Client version 2.7.101 or later, you don’t need to install Rosetta software.


## Workflow

1. Download and install the Azure VPN Client for macOS.
1. Extract the VPN client profile configuration files.
1. Import the client profile settings to the VPN client.
1. Create a connection and connect to Azure.

## Download the Azure VPN Client

1. Download the latest [Azure VPN Client](https://apps.apple.com/us/app/azure-vpn-client/id1553936137) from the Apple Store.
1. Install the client on your computer.

## <a name="generate"></a>Extract client profile configuration files

Locate the VPN client profile configuration package that you generated. If you need to generate these files again, see the [Prerequisites](#prerequisites) section. The VPN client profile configuration package contains the VPN profile configuration files.

When you generate and download a VPN client profile configuration package, all the necessary configuration settings for VPN clients are contained in a VPN client profile configuration zip file. The VPN client profile configuration files are specific to the P2S VPN gateway configuration for the virtual network. If there are any changes to the P2S VPN configuration after you generate the files, such as changes to the VPN protocol type or authentication type, you need to generate new VPN client profile configuration files and apply the new configuration to all of the VPN clients that you want to connect.

Locate and unzip the VPN client profile configuration package and open the **AzureVPN** folder. In this folder, you'll see either the **azurevpnconfig_aad.xml** file or the **azurevpnconfig.xml** file, depending on whether your P2S configuration includes multiple authentication types. The .xml file contains the settings you use to configure the VPN client profile.

## <a name="modify"></a>Modify profile configuration files


If your P2S configuration uses a custom audience with your Microsoft-registered App ID, you might receive popups each time you connect that require you to enter your credentials again and complete authentication. Retrying authentication usually resolves the issue. This happens because the VPN client profile needs both the custom audience ID, and the Microsoft application ID. To prevent this, modify your profile configuration .xml file to include both the custom application ID and the Microsoft application ID.

> **Note:**
> This step is necessary for P2S gateway configurations that use a custom audience value and your registered app is associated with the [Microsoft-registered Azure VPN Client app ID](../vpn-gateway/point-to-site-entra-gateway.md). If this doesn't apply to your P2S gateway configuration, you can skip this step.

1. To modify the Azure VPN Client configuration .xml file, open the file using a text editor such as Notepad.
1. Next, add the value for `applicationid` and save your changes. The following example shows the application ID value `c632b3df-fb67-4d84-bdcf-b95ad541b5c8`.

   **Example**

   ```xml
   <aad>
      <audience>{customAudienceID}</audience>
      <issuer>https://sts.windows.net/{tenant ID value}/</issuer>
      <tenant>https://login.microsoftonline.com/{tenant ID value}/</tenant>
      <applicationid>c632b3df-fb67-4d84-bdcf-b95ad541b5c8</applicationid> 
   </aad>
   ```
For Windows Azure VPN Client profiles, an additional field for Device Single Sign On (SSO) is enabled for ease of user authentication. Read more on [Azure VPN Client and Device SSO](../vpn-gateway/point-to-site-entra-vpn-client-windows-device-sso.md).

## Import VPN client profile configuration files

> **Note:**
> 
We're in the process of changing the Azure VPN Client fields for Azure Active Directory to Microsoft Entra ID. If you see Microsoft Entra ID fields referenced in this article, but don't yet see those values reflected in the client, select the comparable Azure Active Directory values.


1. On the Azure VPN Client page, select **Import**.

1. Navigate to the folder containing the file that you want to import, select it, then click **Open**.

1. On this screen, notice the connection values are populated using the values in the imported VPN client configuration file.

   * Verify that the **Certificate Information** value shows **DigiCert Global Root G2**, rather than the default or blank. Adjust the value if necessary.
   * Notice the Client Authentication values align with the values that were used to configure the VPN gateway for Microsoft Entra ID authentication. This field must reflect the same value that your gateway is configured to use.

   Screenshot of Azure VPN Client saving the imported profile settings.

1. Click **Save** to save the connection profile configuration.
1. In the VPN connections pane, select the connection profile that you saved. Then, click **Connect**.
1. Once connected, the status changes to **Connected**. To disconnect from the session, click **Disconnect**.

## Create a connection manually

1. Open the Azure VPN Client. At the bottom of the client, select **Add** to create a new connection.

1. On the **Azure VPN Client** page, you can configure the profile settings. Change the **Certificate Information** value to show **DigiCert Global Root G2**, rather than the default or blank, then click **Save**.

   Configure the following settings:

   * **Connection Name:** The name by which you want to refer to the connection profile.
   * **VPN Server:** This name is the name that you want to use to refer to the server. The name you choose here doesn't need to be the formal name of a server.
   * **Server Validation**
     * **Certificate Information:** DigiCert Global Root G2
     * **Server Secret:** The server secret.
   * **Client Authentication**
     * **Authentication Type:** Microsoft Entra ID
     * **Tenant:** Name of the tenant.
     * **Audience:** The Audience value must match the value that your P2S gateway is configured to use. Typically, this value is `c632b3df-fb67-4d84-bdcf-b95ad541b5c8`.
     * **Issuer:** Name of the issuer.
1. After filling in the fields, click **Save**.
1. In the VPN connections pane, select the connection profile that you configured. Then, click **Connect**.

## Remove a VPN connection profile

You can remove the VPN connection profile from your computer.

1. Open the Azure VPN Client.
1. Select the VPN connection that you want to remove, then click **Remove**.

## Optional client configuration settings

You can configure the Azure VPN Client with optional configuration settings such as additional DNS servers, custom DNS, forced tunneling, custom routes, and other additional settings. For a description of the available optional settings and configuration steps, see [Azure VPN Client optional settings](azure-vpn-client-optional-configurations.md).

## Next steps

For more information about Microsoft-registered Azure VPN Client, see [Configure P2S User VPN for Microsoft Entra ID authentication](point-to-site-entra-gateway.md).
