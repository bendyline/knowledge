---
title: Connect to a lab VM from Chromebook
titleSuffix: Azure Lab Services
description: Learn how to connect from your Chromebook system to a virtual machine in Azure Lab Services by using RDP.
services: lab-services
ms.service: azure-lab-services
author: RoseHJM
ms.author: rosemalcolm
ms.topic: how-to
ms.date: 05/22/2024
ms.custom: sfi-image-nochange
#customer intent: As a student or trainee, I want to connect to an Azure Lab Services VM from my Chromebook over RDP in order to use the lab resources.
---

# Connect to a VM using Remote Desktop Protocol on a Chromebook


> **Important:**
> Azure Lab Services will be retired on June 28, 2027. For more information, see the [retirement guide](https://aka.ms/azlabs-retirementguide). To simplify your migration, Microsoft has published automation scripts to help you clean up Lab Services resources, these are available in the [Azure Lab Services Retirement Scripts
 GitHub repository](https://github.com/microsoft/Azure-Lab-Services-Retirement-Scripts).


In this article, you learn how to connect to a lab virtual machine (VM) in Azure Lab Services from a Chromebook by using Remote Desktop Protocol (RDP).

## Install Microsoft Remote Desktop on a Chromebook

To connect to the lab VM by using RDP, use the Microsoft Remote Desktop app.

To install the Microsoft Remote Desktop app:

1. In the Google Play store, open the Microsoft [Remote Desktop](https://play.google.com/store/apps/details?id=com.microsoft.rdc.androidx&pli=1) page, or search for **Microsoft Remote Desktop**.

    Screenshot of the Microsoft Remote Desktop app in the app store.

1. Verify that the app is available for your device.

    Screenshot of the Microsoft Remote Desktop app in the app store with the app availability message highlighted.

1. Select **Install** to install the app. If prompted, select the device on which to install the app.

    Screenshot of the Microsoft Remote Desktop app select device dialog.


## Access the VM from your Chromebook using RDP

Connect to the lab VM by using the remote desktop application. You can retrieve the connection information for the lab VM from the Azure Lab Services website.

1. Navigate to the [Azure Lab Services website](https://labs.azure.com), and sign in with your credentials.

1. On the tile for your VM, ensure the [VM is running](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/lab-services/how-to-use-lab.md#start-or-stop-the-vm) and select the **Connect** icon.

    Screenshot of My virtual machines page for Azure Lab Services with the connect icon button on the VM tile highlighted.

1. When you connect to a Linux VM, you see two options to connect to the VM: SSH and RDP. Select the **Connect via RDP** option. If you're connecting to a Windows VM, you don't need to choose a connection option. The RDP file downloads.

    Screenshot that shows VM tile for student with the RDP and SSH connection options highlighted.

1. Open the **RDP** file on your computer with **Microsoft Remote Desktop** installed. It should start connecting to the VM.

    Screenshot of the Microsoft Remote Desktop app connecting to VM.

1. When prompted, enter your user name and password.

    Screenshot that shows the sign-in screen where you enter your username and password.

1. If you receive a certificate warning, you can select **Continue**.

    Screenshot that shows certificate warning when connecting to lab VM.

1. After the connection is established, you see the desktop of your lab VM.
 
> **Note:**
> The Microsoft Remote Desktop app is the recommended client for connecting to Azure Lab Services VMs. While you can connect to a lab VM from a Chromebook using RDP clients like Chrome Remote Desktop, third-party apps often need software installation and configuration on the VM. Coordinate with your lab administrator to confirm third-party app usage is permitted. 

For more information about Microsoft Remote Desktop app, see:
- [What's new in the Remote Desktop client for Android and Chrome OS](https://learn.microsoft.com/windows-server/remote/remote-desktop-services/clients/android-whatsnew)
- [Connect to Azure Virtual Desktop with the Remote Desktop client for Android and Chrome OS](https://learn.microsoft.com/azure/virtual-desktop/users/connect-android-chrome-os)


## Related content

- As an educator, [configure RDP for Linux VMs](how-to-enable-remote-desktop-linux.md)
- As a student, [stop the VM](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/lab-services/how-to-use-lab.md#start-or-stop-the-vm)
