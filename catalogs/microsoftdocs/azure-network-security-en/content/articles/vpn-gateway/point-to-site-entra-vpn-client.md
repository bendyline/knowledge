---
title: 'Configure a VPN client for P2S Microsoft Entra ID authentication connections'
titleSuffix: Azure VPN Gateway
description: Learn how to configure the Azure VPN Client for Windows and macOS with Microsoft Entra ID authentication, and review the Linux client retirement guidance.
author: duongau
ms.service: azure-vpn-gateway
ms.topic: how-to
ms.date: 08/31/2026
ms.author: duau
ms.custom:
  - linux-related-content
  - sfi-image-nochange
zone_pivot_groups: vpn-client-os-desktop

# Audience and custom App ID values aren't sensitive data. Don't remove them. They're required for the configuration.

# Customer intent: "As a network administrator, I want to configure the Azure VPN Client with Microsoft Entra ID authentication, so that I can securely connect to virtual networks via point-to-site VPN."
---

# Configure a VPN client for P2S Microsoft Entra ID authentication connections

This article helps you configure the Azure VPN Client to connect to a virtual network using a VPN Gateway point-to-site (P2S) VPN and Microsoft Entra ID authentication. Microsoft Entra ID authentication requires the OpenVPN® protocol and the Azure VPN Client. Select Windows or macOS for configuration steps, or Linux for retirement and migration guidance. For more information about point-to-site connections, see [About point-to-site connections](point-to-site-about.md).

The steps in this article apply to Microsoft Entra ID authentication by using the Microsoft-registered Azure VPN Client app with associated App ID and Audience values. This article doesn't apply to the older, manually registered Azure VPN Client app for your tenant. For more information, see [About point-to-site VPN - Microsoft Entra ID authentication](point-to-site-about.md#entra-id).

## Prerequisites

Configure your VPN gateway for point-to-site VPN connections that specify Microsoft Entra ID authentication. See [Configure a P2S VPN gateway for Microsoft Entra ID authentication](point-to-site-entra-gateway.md).

**Applies to: windows**


The Azure VPN Client supports Windows FIPS mode by using the [KB4577063](https://support.microsoft.com/help/4577063/windows-10-update-kb4577063) hotfix.

While it's possible that the Azure VPN Client for Windows might work on other operating system versions, the Azure VPN Client for Windows is only supported on the following releases:

* Supported Windows releases: Windows 11 on x64, x86, and ARM64 architectures.


## Windows workflow

This article continues on from the [Configure a P2S VPN gateway for Microsoft Entra ID authentication](point-to-site-entra-gateway.md) steps. This section helps you:

1. Download and install the Azure VPN Client for Windows.
1. Extract the VPN client profile configuration files.
1. Update the profile configuration files with a custom audience value (if applicable).
1. Import the client profile settings to the VPN client.
1. Create a connection and connect to Azure.

## <a name="download"></a>Download the Azure VPN Client for Windows

The features and settings that are available for the Azure VPN Client are dependent on the version of the client that you're using. For Azure VPN Client version information, see [Azure VPN Client versions](azure-vpn-client-versions.md).

1. Download the latest version of the Azure VPN Client install files using one of the following links:
   
   * Install using Client Install files: [https://aka.ms/azvpnclientdownload](https://aka.ms/azvpnclientdownload).
   * Install directly, when signed in on a client computer: [Microsoft Store](https://go.microsoft.com/fwlink/?linkid=2117554).
   * Install using the Windows Package Manager (WinGet). You can run the following command to install and learn more about the WinGet method in [this document](point-to-site-vpn-client-winget.md).

       ```azurecli-interactive
       winget install Microsoft.AzureVPNClient --source winget
       ```

1. Install the Azure VPN Client to each computer.

1. Verify that the Azure VPN Client has permission to run in the background. For steps, see [Windows background apps](https://support.microsoft.com/windows/windows-background-apps-and-your-privacy-83f2de44-d2d9-2b29-4649-2afe0913360a#ID0EBD=Windows_11).

1. To verify the installed client version, open the Azure VPN Client. Go to the bottom of the client and select  **... -> ? Help**. In the right pane, you can see the client version number.


## <a name="generate"></a>Extract Windows client profile configuration files

To configure your Azure VPN Client profile, you must first download the VPN client profile configuration package from the Azure P2S gateway. This package is specific to the configured VPN gateway and contains the necessary settings to configure the VPN client. If you used the P2S server configuration steps as mentioned in the [Prerequisites](#prerequisites) section, you've already generated and downloaded the VPN client profile configuration package that contains the VPN profile configuration files. If you need to generate configuration files, see [Download the VPN client profile configuration package](point-to-site-entra-gateway.md#download).

After you obtain the VPN client profile configuration package, extract the zip file. The zip file contains the **AzureVPN** folder. The **AzureVPN** folder contains the **azurevpnconfig_aad.xml** file or the **azurevpnconfig.xml** file, depending on whether your P2S configuration includes multiple authentication types. If you don't see **azurevpnconfig_aad.xml** or **azurevpnconfig.xml**, or you don't have an **AzureVPN** folder, verify that your VPN gateway is configured to use the OpenVPN tunnel type and that Azure Active Directory (Microsoft Entra ID) authentication is selected.

## <a name="modify"></a>Modify Windows profile configuration files


If your P2S configuration uses a custom audience with your Microsoft-registered App ID, you might receive popups each time you connect that require you to enter your credentials again and complete authentication. Retrying authentication usually resolves the issue. This happens because the VPN client profile needs both the custom audience ID, and the Microsoft application ID. To prevent this, modify your profile configuration .xml file to include both the custom application ID and the Microsoft application ID.

> **Note:**
> This step is necessary for P2S gateway configurations that use a custom audience value and your registered app is associated with the [Microsoft-registered Azure VPN Client app ID](point-to-site-entra-gateway.md). If this doesn't apply to your P2S gateway configuration, you can skip this step.

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
For Windows Azure VPN Client profiles, an additional field for Device Single Sign On (SSO) is enabled for ease of user authentication. Read more on [Azure VPN Client and Device SSO](point-to-site-entra-vpn-client-windows-device-sso.md).

## <a name="import"></a>Configure the Azure VPN Client for Windows and connect

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

## Work with Windows connections

### <a name="autoconnect"></a>Connect automatically

You can configure your connection to connect automatically with Always-on.

1. On the home page for your VPN client, select **VPN Settings**. If you see the switch apps dialog box, select **Yes**.

   Screenshot of the VPN home page with VPN Settings selected.

1. If the profile that you want to configure is connected, disconnect the connection, then highlight the profile and select the **Connect automatically** check box.

   Screenshot of the Settings window, with the Connect automatically box checked.

1. Select **Connect** to initiate the VPN connection.

### <a name="diagnose"></a>Diagnose connection issues

#### Prerequisites check

If your Azure VPN Client is version 4.0.0.0 or later, you can run a prerequisites check to verify that your computer has the necessary items configured and installed to successfully connect. To view the version number of an installed Azure VPN Client, launch the client and select **Help**.

1. Select the **...** at the bottom of the Azure VPN Client page, and then select **Prerequisites**.
1. On the **Test Application Prerequisites** page, select **Run Prerequisites Test**.
1. Fix any issues and try connecting again. For more information, see [Azure VPN Client prerequisites check](azure-vpn-client-prerequisites-check.md).

#### Diagnostics tool

1. Select the **...** next to the VPN connection that you want to diagnose to reveal the menu. Then select **Diagnose**.
1. On the **Connection Properties** page, select **Run Diagnostics**. If asked, sign in with your credentials, then view the results.

   Screenshot of the ellipsis and Diagnose selected.

## Configure Windows custom settings: DNS and routing

You can configure the Azure VPN Client with optional configuration settings such as additional DNS servers, custom DNS, forced tunneling, custom routes, and other settings. For more information, see [Azure VPN Client - optional settings](azure-vpn-client-optional-configurations.md).

## Configure Device SSO for Windows

Device Single Sign On (SSO) allows users to sign in to their devices once and use that authentication while using the Azure VPN Client. For steps, see [Configure Device SSO for Windows - Azure VPN Client – Microsoft Entra ID authentication](point-to-site-entra-vpn-client-windows-device-sso.md).



**Applies to: macos**


Microsoft Entra ID authentication only supports OpenVPN protocol connections and requires the Azure VPN Client. The Azure VPN client for macOS isn't available in France and China due to local regulations and requirements.

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
> This step is necessary for P2S gateway configurations that use a custom audience value and your registered app is associated with the [Microsoft-registered Azure VPN Client app ID](point-to-site-entra-gateway.md). If this doesn't apply to your P2S gateway configuration, you can skip this step.

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
For Windows Azure VPN Client profiles, an additional field for Device Single Sign On (SSO) is enabled for ease of user authentication. Read more on [Azure VPN Client and Device SSO](point-to-site-entra-vpn-client-windows-device-sso.md).

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

## Optional macOS client configuration settings

You can configure the Azure VPN Client with optional settings, such as additional DNS servers, custom DNS, forced tunneling, and custom routes. For a description of the available settings and configuration steps, see [Azure VPN Client optional settings](azure-vpn-client-optional-configurations.md).



**Applies to: linux**



> **Important:**
> The Azure VPN Client for Linux (Preview) retired on 31 August, 2026. After this date, the client is no longer supported. For more information, see the **Azure VPN Client for Linux Retirement overview and migration guide** for [VPN Gateway](azure-vpn-client-linux-retirement.md) and [Virtual WAN](../virtual-wan/azure-vpn-client-linux-retirement.md).


Microsoft Entra ID authentication on Linux was available only through the retired Azure VPN Client for Linux. The supported OpenVPN and strongSwan alternatives don't support Microsoft Entra ID authentication with Azure VPN Gateway P2S connections.

To continue using Linux, change the gateway to a supported authentication method and migrate to a supported client. For available options and migration steps, see [Migrate from the Azure VPN Client for Linux](azure-vpn-client-linux-retirement.md).

If Microsoft Entra ID authentication is required, use the Azure VPN Client for [Windows](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/vpn-gateway/point-to-site-entra-vpn-client.md?pivots=windows) or [macOS](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/vpn-gateway/point-to-site-entra-vpn-client.md?pivots=macos).



## Next steps

* For more information about VPN Gateway, see the [VPN Gateway FAQ](vpn-gateway-vpn-faq.md).
* For more information about point-to-site connections, see [About point-to-site connections](point-to-site-about.md).
