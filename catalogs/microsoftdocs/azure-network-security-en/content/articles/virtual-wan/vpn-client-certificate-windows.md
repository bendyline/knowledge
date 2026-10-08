---
title: 'Configure User VPN clients: certificate authentication: Azure VPN client: Windows'
titleSuffix: Azure Virtual WAN
description: Learn how to configure the Azure VPN Client on a Windows operating system for P2S configurations that use certificate authentication.
author: duongau
ms.service: azure-virtual-wan
ms.topic: how-to
ms.date: 03/20/2025
ms.author: duau
ms.custom: sfi-image-nochange
---

# Configure Azure VPN Client for User VPN P2S certificate authentication connections - Windows

If your User VPN point-to-site (P2S) VPN gateway is configured to use OpenVPN and certificate authentication, you can connect to your virtual network using the Azure VPN Client. This article walks you through the steps to configure the **Azure VPN Client** and connect to your virtual network.

This article applies to Windows operating system clients. For more information about other VPN client configuration articles, see the following table:

## Before you begin

Before beginning client configuration steps, verify that you're on the correct VPN client configuration article. The following table shows the configuration articles available for Virtual WAN point-to-site VPN clients. Steps differ, depending on the authentication type, tunnel type, and the client OS.


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
* You generated and downloaded the VPN client configuration files. For steps to generate a VPN client profile configuration package, see [Generate VPN client configuration files](virtual-wan-point-to-site-portal.md#download).
* You can either generate client certificates, or acquire the appropriate client certificates necessary for authentication.

### Workflow

The workflow for this article is as follows:

1. Generate and install client certificates if you haven't already done so.
1. View the VPN client profile configuration files contained in the VPN client profile configuration package that you generated.
1. Configure the Azure VPN Client.
1. Connect to Azure.

## <a name="certificates"></a>Install client certificates

When your User VPN configuration settings are configured for certificate authentication, in order to authenticate, a client certificate must be installed on each connecting client computer. Later in this article, you specify the client certificates that you install in this section. The client certificate that you install must have been exported with its private key, and must contain all certificates in the certification path.

* For steps to generate a client certificate, see [Generate and export certificates](certificates-point-to-site.md#clientcert).

* For steps to install a client certificate see [Install client certificates](install-client-certificates.md).

* To view an installed client certificate, open **Manage User Certificates**. The client certificate is installed in **Current User\Personal\Certificates**.

## <a name="generate"></a>View configuration files

The VPN client profile configuration package contains specific folders. The files within the folders contain the settings needed to configure the VPN client profile on the client computer. The files and the settings they contain are specific to the P2S VPN gateway and the type of authentication and tunnel your VPN gateway is configured to use.

Locate and unzip the VPN client profile configuration package you generated. For Certificate authentication and OpenVPN, you'll see the **AzureVPN** folder. In this folder, you'll see either the **azurevpnconfig_cert.xml** file or the **azurevpnconfig.xml** file, depending on whether your P2S configuration includes multiple authentication types. The .xml file contains the settings you use to configure the VPN client profile.

If you don't see either file, or you don't have an **AzureVPN** folder, verify that your VPN gateway is configured to use the OpenVPN tunnel type and that certificate authentication is selected.

## Download the Azure VPN Client

The features and settings that are available for the Azure VPN Client are dependent on the version of the client that you're using. For information about Azure VPN Client versions, see the [Azure VPN Client versions](azure-vpn-client-versions.md) article.

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


## Configure the Azure VPN Client and connect



1. Open the Azure VPN Client.

1. Select **+** on the bottom left of the page, then select **Import**.

1. In the window, navigate to the **azurevpnconfig.xml** or **azurevpnconfig_cert.xml** file, depending on your configuration. Select the file, then select **Open**.

1. On the client profile page, notice that many of the settings are already specified. The preconfigured settings are contained in the VPN client profile package that you imported. Even though most of the settings are already specified, you need to configure settings specific to the client computer.

   From the **Certificate Information** dropdown, select the name of the child certificate (the client certificate). For example, **P2SChildCert**. For this exercise, for secondary profile, select **None**.

   Screenshot showing Azure VPN client profile configuration page.

   If you don't see a client certificate in the **Certificate Information** dropdown, you'll need to cancel the profile configuration import and fix the issue before proceeding. It's possible that one of the following things is true:

   * The client certificate isn't installed locally on the client computer.
   * There are multiple certificates with exactly the same name installed on your local computer (common in test environments).
   * The child certificate is corrupt.

1. After the import validates (imports with no errors), select **Save**.

1. In the left pane, locate the **VPN connection**, then select **Connect**.
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

These steps help you configure your connection to connect automatically with Always-on.

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

You can configure the Azure VPN Client with optional configuration settings such as more DNS servers, custom DNS, forced tunneling, custom routes, and other settings. For a description of the available settings and configuration steps, see [Azure VPN Client optional settings](azure-vpn-client-optional-configurations.md).

## Next steps

To modify additional P2S User VPN connection settings, see [Tutorial: Create a P2S User VPN connection](virtual-wan-point-to-site-portal.md).
