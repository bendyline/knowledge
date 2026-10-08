---
title: 'Configure Azure VPN Client - Microsoft Entra ID authentication - Windows'
titleSuffix: Azure Virtual WAN
description: Learn how to use Virtual WAN User VPN (point-to-site) to connect to your virtual network using Microsoft Entra ID authentication and the Azure VPN Client.
services: virtual-wan
author: duongau
ms.service: azure-virtual-wan
ms.topic: how-to
ms.date: 03/20/2025
ms.author: duau

#Audience and custom App ID values are not sensitive data. Please do not remove. They are required for the configuration.
---

# Configure the Azure VPN Client – Microsoft Entra ID authentication – Windows

This article helps you configure the Azure VPN Client on a Windows computer to connect to a virtual network using a Virtual WAN User VPN (point-to-site) and Microsoft Entra ID authentication. The Azure VPN Client is supported with Windows FIPS mode by using the [KB4577063](https://support.microsoft.com/help/4577063/windows-10-update-kb4577063) hotfix.

> **Note:**
> Microsoft Entra ID authentication is supported only for OpenVPN® protocol connections.

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

## Workflow

This article continues on from the [Configure a User VPN (P2S) gateway for Microsoft Entra ID authentication](point-to-site-entra-gateway.md) steps. This article helps you:

1. Download and install the Azure VPN Client for Windows.
1. Extract the VPN client profile configuration files.
1. Update the profile configuration files with a custom audience value (if applicable).
1. Import the client profile settings to the VPN client.
1. Create a connection and connect to Azure.

## <a name="download"></a>Download the Azure VPN Client

The features and settings that are available for the Azure VPN Client are dependent on the version of the client that you're using. For Azure VPN Client version information, see [Azure VPN Client versions](azure-vpn-client-versions.md).

1. Download the latest version of the Azure VPN Client install files using one of the following links:
   
   * Install using Client Install files: [https://aka.ms/azvpnclientdownload](https://aka.ms/azvpnclientdownload).
   * Install directly, when signed in on a client computer: [Microsoft Store](https://go.microsoft.com/fwlink/?linkid=2117554).
   * Install using the Windows Package Manager (WinGet). You can run the following command to install and learn more about the WinGet method in [this document](../vpn-gateway/point-to-site-vpn-client-winget.md).

       ```azurecli-interactive
       winget install Microsoft.AzureVPNClient --source winget
       ```

1. Install the Azure VPN Client to each computer.

1. Verify that the Azure VPN Client has permission to run in the background. For steps, see [Windows background apps](https://support.microsoft.com/windows/windows-background-apps-and-your-privacy-83f2de44-d2d9-2b29-4649-2afe0913360a#ID0EBD=Windows_11).

1. To verify the installed client version, open the Azure VPN Client. Go to the bottom of the client and select  **... -> ? Help**. In the right pane, you can see the client version number.


## <a name="generate"></a>Extract client profile configuration files

To configure your Azure VPN Client profile, you must first download the VPN client profile configuration package from the Azure P2S gateway. This package is specific to the configured VPN gateway and contains the necessary settings to configure the VPN client. If you used the P2S server configuration steps as mentioned in the [Prerequisites](#prerequisites) section, you've already generated and downloaded the VPN client profile configuration package that contains the VPN profile configuration files.

After you obtain the VPN client profile configuration package, extract the zip file. The zip file contains the **AzureVPN** folder. The **AzureVPN** folder contains the **azurevpnconfig_aad.xml** file or the **azurevpnconfig.xml** file, depending on whether your P2S configuration includes multiple authentication types. If you don't see **azurevpnconfig_aad.xml** or **azurevpnconfig.xml**, or you don't have an **AzureVPN** folder, verify that your VPN gateway is configured to use the OpenVPN tunnel type and that Azure Active Directory (Microsoft Entra ID) authentication is selected.

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

## <a name="import"></a>Configure the Azure VPN Client and connect

> **Note:**
> 
We're in the process of changing the Azure VPN Client fields for Azure Active Directory to Microsoft Entra ID. If you see Microsoft Entra ID fields referenced in this article, but don't yet see those values reflected in the client, select the comparable Azure Active Directory values.




1. Open the Azure VPN Client.

1. Select **+** on the bottom left of the page, then select **Import**.

1. Browse to the Azure VPN Client profile configuration folder that you extracted. Open the **AzureVPN** folder and select the client profile configuration file (azurevpnconfig_aad.xml or azurevpnconfig.xml). Select **Open** to import the file.

1. On the client profile page, notice that many of the settings are already specified. The preconfigured settings are contained in the VPN client profile package that you imported. Even though most of the settings are already specified, you need to configure settings specific to the client computer.

1. Change the name of the Connection name (optional). In this example, notice that the Audience value shown is the value that's associated to the Microsoft-registered Azure VPN Client App ID. The value in this field must match the value that your P2S VPN gateway is configured to use.

   Screenshot shows Save the profile.

1. Click **Save** to save the connection profile.

1. In the left pane, select the connection profile that you want to use. Then click **Connect** to initiate the connection.

1. Authenticate using your credentials, if prompted.

1. Once connected, the icon turns green and shows  **Connected**.
1. 
The Azure VPN Client system tray, available in version 4.0.0.0 and later, lets you close the Azure VPN Client application while keeping the connection active. When you close the application, you can see the application in the Windows system tray. You can reopen the Azure VPN Client app in compact mode by clicking the tray icon.

   Screenshot of the Azure VPN Client.


### <a name="export"></a>Export and distribute a client profile

Once you have a working profile and need to distribute it to other users, you can export it using the following steps:

1. Highlight the VPN client profile that you want to export, select the **...**, then select **Export**.

   Screenshot that shows the Azure VPN Client page, with the ellipsis selected and Export highlighted.

1. Select the location that you want to save this profile to, leave the file name as is, then select **Save** to save the xml file.

### <a name="delete"></a>Delete a client profile

1. Highlight the VPN client profile that you want to export, select the **...**, then select **Remove**.

1. On the confirmation popup, select **Remove** to delete.

## Working with connections

### <a name="autoconnect"></a>Connect automatically

You can configure your connection to connect automatically with Always-on.

1. On the home page for your VPN client, select **VPN Settings**. If you see the switch apps dialogue box, select **Yes**.

   Screenshot of the VPN home page with VPN Settings selected.

1. If the profile that you want to configure is connected, disconnect the connection, then highlight the profile and select the **Connect automatically** check box.

   Screenshot of the Settings window, with the Connect automatically box checked.

1. Select **Connect** to initiate the VPN connection.

### <a name="diagnose"></a>Diagnose connection issues

#### Prerequisites check

If your Azure VPN Client is version 4.0.0.0 or later, you can run a prerequisites check to verify that your computer has the necessary items configured and installed in order to successfully connect. To view the version number of an installed Azure VPN Client, launch the client and select **Help**.

1. Click the **...** at the bottom of the Azure VPN Client page and select **Prerequisites**.
1. On the **Test Application Prerequisites** page, select **Run Prerequisites Test**.
1. Fix any issues and try connecting again. For more information, see [Azure VPN Client prerequisites check](azure-vpn-client-prerequisites-check.md).

#### Diagnostics tool

1. Select the **...** next to the VPN connection that you want to diagnose to reveal the menu. Then select **Diagnose**.
1. On the **Connection Properties** page, select **Run Diagnostics**. If asked, sign in with your credentials, then view the results.

   Screenshot of the ellipsis and Diagnose selected.

## Configure custom settings: DNS and routing

You can configure the Azure VPN Client with optional configuration settings such as additional DNS servers, custom DNS, forced tunneling, custom routes, and other settings. For more information, see [Configure Azure VPN Client optional settings](azure-vpn-client-optional-configurations.md).

## Next steps

For more information about Microsoft-registered Azure VPN Client, see [Configure P2S User VPN for Microsoft Entra ID authentication](point-to-site-entra-gateway.md).
