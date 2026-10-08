---
title: Configure Azure VPN Client - P2S Microsoft Entra ID authentication - Linux
titleSuffix: Azure Virtual WAN
description: Learn how to configure the Azure VPN Client for Virtual WAN P2S configurations that use Microsoft Entra ID authentication.
ms.service: azure-virtual-wan
ms.custom: linux-related-content
ms.topic: how-to
ms.date: 02/10/2025
ms.author: duau
author: duongau
---

# Configure Azure VPN Client – Microsoft Entra ID authentication – Linux (Retired)


> **Important:**
> The Azure VPN Client for Linux (Preview) retired on 31 August, 2026. After this date, the client is no longer supported. For more information, see the **Azure VPN Client for Linux Retirement overview and migration guide** for [VPN Gateway](../vpn-gateway/azure-vpn-client-linux-retirement.md) and [Virtual WAN](azure-vpn-client-linux-retirement.md).


This article helps you configure the Azure VPN Client on a Linux computer (Ubuntu) to connect to a virtual network using a Virtual WAN User VPN (point-to-site) and Microsoft Entra ID authentication.

The steps in this article apply to Microsoft Entra ID authentication using the Microsoft-registered Azure VPN Client app with associated App ID and Audience values. This article doesn't apply to the older, manually registered Azure VPN Client app for your tenant. For more information, see [Point-to-site User VPN for Microsoft Entra ID authentication: Microsoft-registered app](point-to-site-entra-gateway.md).

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

### Workflow

After your Virtual WAN  server configuration is complete, your next steps are as follows:

1. Download and install the Azure VPN Client for Linux.
1. Import the client profile settings to the VPN client.
1. Create a connection.

## Install the Azure VPN Client


Use the following steps to download and install the latest version of the Azure VPN Client for Linux.

> **Note:**
> Add only the repository list of your Ubuntu version 20.04 or 22.04.
> For more information, see the [Linux Software Repository for Microsoft Products](https://learn.microsoft.com/linux/packages).

```CLI
# install curl utility
sudo apt-get install curl

# Install Microsoft's public key
curl -sSl https://packages.microsoft.com/keys/microsoft.asc | sudo tee /etc/apt/trusted.gpg.d/microsoft.asc

# Install the production repo list for focal
# For Ubuntu 20.04
curl https://packages.microsoft.com/config/ubuntu/20.04/prod.list | sudo tee /etc/apt/sources.list.d/microsoft-
ubuntu-focal-prod.list

# Install the production repo list for jammy
# For Ubuntu 22.04
curl https://packages.microsoft.com/config/ubuntu/22.04/prod.list | sudo tee /etc/apt/sources.list.d/microsoft-
ubuntu-jammy-prod.list

sudo apt-get update
sudo apt-get install microsoft-azurevpnclient
```


## Extract the VPN client profile configuration package

To configure your Azure VPN Client profile, you download a VPN Client profile configuration package from the Azure P2S gateway. This package contains the necessary settings to configure the VPN client.

If your P2S gateway configuration was previously configured to use the older, manually registered App ID versions, your P2S configuration doesn't support the Linux VPN client. You'll need to change your P2S configuration to use the Microsoft-registered App ID version. For more information, see [Configure P2S User VPN for Microsoft Entra ID authentication – Microsoft-registered app](point-to-site-entra-gateway-update.md).

1. Locate and extract the zip file that contains the VPN client profile configuration package. The zip file contains the **AzureVPN** folder.
1. In the AzureVPN folder, you'll see either the **azurevpnconfig_aad.xml** file, or the **azurevpnconfig.xml** file, depending on whether your P2S configuration includes multiple authentication types. The .xml file contains the settings you use to configure the VPN client profile.

## Modify VPN profile configuration files


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

## Import VPN client profile configuration settings


In this section, you configure the Azure VPN client for Linux.

1. On the Azure VPN Client page, in the lower left pane, select **Import**.

1. Select **Import Profile** and browse to find the profile xml file. Select the file. With the file selected, select **OK**.

   Screenshot of Azure VPN Client showing the file to be imported.

1. View the connection profile information. Change the **Certificate Information** value to show the default **DigiCert_Global_Root G2.pem** or **DigiCert_Global_Root_CA.pem**. Don't leave blank.

1. If your VPN client profile contains multiple client authentications, for **Client Authentication, Authentication Type** select **Microsoft Entra ID** from the dropdown.

   Screenshot Server Validation and Client Authentication fields.

1. For the **Tenant** field, specify the URL of your Microsoft Entra Tenant. Make sure the Tenant URL doesn't have a `\` (backslash) at the end. Forward slash is permissible.

   The Tenant ID has the following structure:
`https://login.microsoftonline.com/{Entra TenantID}`

1. For the **Audience** field, specify the Application ID (App ID).

   The App ID for the Microsoft-registered Azure VPN Client is: `c632b3df-fb67-4d84-bdcf-b95ad541b5c8`. We also support  custom App ID for this field.

1. For the **Issuer** field, specify the URL of the Secure Token Service. Include a trailing slash at the end of the Issuer value. Otherwise, the connection might fail.

   **Example:** `https://sts.windows.net/{AzureAD TenantID}/`

1. When the fields are filled in, click **Save**.

1. In the **VPN Connections** pane, select the connection profile that you saved. Then, from the dropdown, click **Connect**.

   Screenshot showing the connection profile and the area to find connect in the dropdown.

1. The web browser automatically appears. Fill in the username/password credentials for Microsoft Entra ID authentication, then connect.

1. When the VPN connection completes successfully, the client profile shows a green icon and the **Status Logs** window shows **Status = Connected** in the left pane.

1. Once connected, the status changes to **Connected**. To disconnect from the session, from the dropdown, select **Disconnect**.

## Delete a VPN client profile

1. On the Azure VPN client, select the connection you want to remove. Then, from the dropdown, select **Remove**.

   Screenshot of the vpn client with the dropdown showing three options: Connect, Configure, Remove.

1. On **Remove VPN Connection?**, select **OK**.

## Check logs

To diagnose issues, you can use the Azure VPN Client **Logs**.

1. In the Azure VPN Client, go to **Settings**. In the right pane, select **Show Logs Directory**.

1. To access the log file, go to the **/var/log/azurevpnclient** folder and locate the **AzureVPNClient.log** file.

## Next steps

For more information about Microsoft-registered Azure VPN Client, see [Configure P2S User VPN for Microsoft Entra ID authentication](point-to-site-entra-gateway.md).
