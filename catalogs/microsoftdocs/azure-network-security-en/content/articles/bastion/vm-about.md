---
title: 'About VM connections and features'
titleSuffix: Azure Bastion
description: Learn about VM connections and features when connecting using Azure Bastion.
author: asudbring
ms.service: azure-bastion
ms.topic: concept-article
ms.date: 03/03/2025
ms.author: allensu

# Customer intent: As a system administrator, I want to understand the features available for connecting to a VM using a secure gateway, so that I can effectively manage remote access and enhance user productivity while ensuring compliance and security.
---

# About VM connections and features

The sections in this article show you various features and settings that are available when you connect to a VM using Azure Bastion.

## <a name="connect"></a>Connect to a VM
> **Note:**
> Entra ID authentication for RDP connections is now available in public preview! See [Microsoft Entra ID](bastion-connect-vm-rdp-windows.md#microsoft-entra-id-authentication-preview) for details.

You can use various different methods to connect to a target VM. Some connection types require Bastion to be configured with the Standard SKU. Use the following articles to connect.

* Connect to a Windows VM
  * [RDP](bastion-connect-vm-rdp-windows.md)
  * [SSH](bastion-connect-vm-ssh-windows.md)
* Connect to a Linux VM
  * [SSH](bastion-connect-vm-ssh-linux.md)
* [Connect to a scale set](bastion-connect-vm-scale-set.md)
* [Connect via IP address](connect-ip-address.md)
* Connect from a native client
  * [Windows client](connect-vm-native-client-windows.md)
  * [Linux/SSH client](connect-vm-native-client-linux.md)


## <a name="copy-paste"></a>Copy and paste

You can copy and paste text between your local device and the remote session. Only text copy/paste is supported. By default, this feature is enabled. If you want to disable this feature for web-based clients, you can change the setting on the configuration page for your bastion host. To disable, your bastion host must be configured with the Standard SKU.

For steps and more information, see [Copy and paste - Windows VMs](bastion-vm-copy-paste.md).

## <a name="full-screen"></a>Full screen view

You can change to full screen view and back using your browser. For steps and more information, see [Change to full screen view](bastion-vm-full-screen.md).

## <a name="upload-download"></a>Upload or download files

Azure Bastion offers support for file transfer between your target VM and local computer using Bastion and a native RDP or native SSH client. It may also be possible to use certain third-party clients and tools to upload and download files.

For steps and more information, see [Upload or download files to a VM using a native client](vm-upload-download-native.md).

## <a name="audio"></a>Remote audio

You can enable remote audio output for your VM. Some VMs automatically enable this setting, whereas others require you to enable audio settings manually. The settings are changed on the VM itself. Your Bastion deployment doesn't need any special configuration settings to enable remote audio output. Audio input is not supported at the moment.

> **Note:**
> Audio output uses bandwidth on your internet connection.

To enable remote audio output on a Windows VM:

1. After you're connected to the VM, an audio button appears on the lower-right corner of the toolbar. Right-click the audio button, and then select **Sounds**.
1. A pop-up message asks if you want to enable the Windows Audio Service. Select **Yes**. You can configure more audio options in **Sound preferences**.
1. To verify sound output, hover over the audio button on the toolbar.


## <a name="faq"></a>FAQ

For FAQs, see [Bastion FAQ - VM connections and features](bastion-faq.md#vm).

## Next steps

[Quickstart: Deploy Azure Bastion with default settings and Standard SKU](quickstart-host-portal.md)
