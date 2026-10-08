---
title: 'Configure P2S User VPN native VPN client - certificate authentication - macOS'
description: Learn how to configure the VPN client for Virtual WAN User VPN configurations that use certificate authentication and IKEv2. This article applies to macOS.
author: duongau
ms.service: azure-virtual-wan
ms.topic: how-to
ms.date: 02/04/2025
ms.author: duau
---

# Configure P2S User VPN clients: certificate authentication - native VPN client - macOS

If your point-to-site (P2S) User VPN gateway is configured to use IKEv2 and certificate authentication, you can connect to your virtual network using the native VPN client that's part of your macOS operating system. This article walks you through the steps to configure the native VPN client and connect to your virtual network.

## Prerequisites

This article assumes that you've already performed the following prerequisites:

* You completed the necessary configuration steps in the [Tutorial: Create a P2S User VPN connection using Azure Virtual WAN](virtual-wan-point-to-site-portal.md).
* You generated and downloaded the VPN client configuration files. The VPN client configuration files that you generate are specific to the Virtual WAN User VPN profile that you download.

   Virtual WAN has two different types of configuration profiles: WAN-level (global), and hub-level. For more information, see [Download global and hub VPN profiles](global-hub-profile.md). If there are any changes to the P2S VPN configuration after you generate the files, or you change to a different profile type, you need to generate new VPN client configuration files and apply the new configuration to all of the VPN clients that you want to connect.
* You have acquired the necessary certificates. You can either [generate client certificates](certificates-point-to-site.md), or acquire the appropriate client certificates necessary for authentication. Make sure you have both the client certificate and the root server certificate information.

### Connection requirements

To connect to Azure using the native VPN client software and certificate authentication, each connecting client requires the following items:

* The client must have a client certificate that's installed locally.
* The client must be running a supported version of macOS.

### Workflow

The workflow for this article is as follows:

1. Generate client certificates if you haven't already done so.
1. View the VPN client profile configuration files contained in the VPN client profile configuration package that you generated.
1. Install certificates.
1. Configure the native VPN client that's already installed your OS.
1. Connect to Azure.

## Generate certificates

For certificate authentication, a client certificate must be installed on each client computer. The client certificate you want to use must be exported with the private key, and must contain all certificates in the certification path. Additionally, for some configurations, you'll also need to install root certificate information.

For information about working with certificates, see [Generate and export certificates](certificates-point-to-site.md).

## View the VPN client profile configuration files

All of the necessary configuration settings for the VPN clients are contained in a VPN client profile configuration zip file. You can generate client profile configuration files using PowerShell, or by using the Azure portal. Either method returns the same zip file.

The VPN client profile configuration files are specific to the P2S VPN gateway configuration for the virtual network. If there are any changes to the P2S VPN configuration after you generate the files, such as changes to the VPN protocol type or authentication type, you need to generate new VPN client profile configuration files and apply the new configuration to all of the VPN clients that you want to connect.

Unzip the file to view the folders. When you configure macOS native clients, you use the files in the **Generic** folder. The Generic folder is present if IKEv2 was configured on the gateway. If you don't see the Generic folder, check the following items, then generate the zip file again.

* Check the tunnel type for your configuration. It's likely that IKEv2 wasn’t selected as a tunnel type.

The **Generic** folder contains the following files.

* **VpnSettings.xml**, which contains important settings like server address and tunnel type.
* **VpnServerRoot.cer**, which contains the root certificate required to validate the Azure VPN gateway during P2S connection setup.

## Install certificates

You'll need both the root certificate and the child certificate installed on your Mac. The child certificate must be exported with the private key and must contain all certificates in the certification path.

### Root certificate

1. Copy the root certificate file (the .cer file) - to your Mac. Double-click the certificate. Depending on your operating system, the certificate will either automatically install, or you'll see the **Add Certificates** page.
1. If you see the **Add Certificates** page, for **Keychain:** click the arrows and select **login** from the dropdown.
1. Click **Add** to import the file.

### Client certificate

The client certificate (.pfx file) is used for authentication and is required. Typically, you can just click the client certificate to install.

### Verify certificates are installed

Verify that both the client and the root certificate are installed.

1. Open **Keychain Access**.
1. Go to the **Certificates** tab.
1. Verify that both the client and the root certificate are installed.

## Configure VPN client profile

Use the steps in the [Mac User Guide](https://support.apple.com/guide/mac-help/set-up-a-vpn-connection-on-mac-mchlp2963/mac) that are appropriate for your operating system version  to add a VPN client profile configuration with the following settings.

* Select **IKEv2** as the VPN type.
* For **Display Name**, select a friendly name for the profile.
* For both **Server Address** and **Remote ID**, use the value from the **VpnServer** tag in the **VpnSettings.xml** file.

   Screenshot to click Select.

* For **Authentication** settings, select **Certificate**.
* For the **Certificate**, choose the child certificate you want to use for authentication. If you have multiple certificates, you can select **Show Certificate** to see more information about each certificate.
* For **Local ID**, type the name of the child certificate that you selected.

Once you finished configuring the VPN client profile, save the profile.

## Connect

The steps to connect are specific to the macOS operating system version. Refer to the [Mac User Guide](https://support.apple.com/guide/mac-help/set-up-a-vpn-connection-on-mac-mchlp2963/mac). Select the operating system version that you're using and follow the steps to connect.

Once the connection has been established, the status shows as **Connected**. The IP address is allocated from the VPN client address pool.

## Next steps

Follow up with any additional server or connection settings. See [Tutorial: Create a P2S User VPN connection using Azure Virtual WAN](virtual-wan-point-to-site-portal.md).
