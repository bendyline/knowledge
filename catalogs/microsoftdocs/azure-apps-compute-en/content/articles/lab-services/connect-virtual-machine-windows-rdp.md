---
title: Connect to Azure Lab Services VMs from Windows
titleSuffix: Azure Lab Services
description: Learn how to connect using remote desktop (RDP) from Windows to a virtual machine in Azure Lab Services.
services: lab-services
ms.service: azure-lab-services
author: RoseHJM
ms.author: rosemalcolm
ms.topic: how-to
ms.date: 03/06/2024
#customer intent: As a student, I want to connect to virtual machines in a lab by using RDP in order to use the lab resources. 
---

# Connect to a VM using Remote Desktop Protocol on Windows


> **Important:**
> Azure Lab Services will be retired on June 28, 2027. For more information, see the [retirement guide](https://aka.ms/azlabs-retirementguide). To simplify your migration, Microsoft has published automation scripts to help you clean up Lab Services resources, these are available in the [Azure Lab Services Retirement Scripts
 GitHub repository](https://github.com/microsoft/Azure-Lab-Services-Retirement-Scripts).


In this article, you learn how to connect to a lab VM in Azure Lab Services from Windows by using Remote Desktop Protocol (RDP).

## Connect to VM from Windows using RDP

You can use RDP to connect to your lab VMs in Azure Lab Services. If the lab VM is a Linux VM, the lab creator must [enable RDP for the lab](how-to-enable-remote-desktop-linux.md) and install GUI packages for a Linux graphical desktop. For Windows-based lab VMs, no extra configuration is needed.

Typically, the [Remote Desktop client software](https://learn.microsoft.com/windows-server/remote/remote-desktop-services/clients/remote-desktop-clients) is already present on Windows. To connect to the lab VM, you open the RDP connection file to start the remote session.

To connect to a lab VM in Azure Lab Services:

1. Navigate to the Azure Lab Services website (https://labs.azure.com), and sign in with your credentials.

1. On the tile for your VM, select the **Connect** icon.

    To connect to a lab VM, the virtual machine must be running. Learn how you can [start a VM](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/lab-services/how-to-use-lab.md#start-or-stop-the-vm).

    Screenshot of My virtual machines page for Azure Lab Services, highlighting the connect button on the VM tile.

1. To connect to a Linux VM, select the **Connect via RDP** option.

    Screenshot that shows VM tile for student, highlighting the connect button and showing the SSH and RDP connection options.

1. After the RDP connection file download finishes, open the RDP file to launch the RDP client.

1. Optionally, adjust the RDP connection settings, and then select **Connect** to start the remote session.

## Optimize RDP client settings

The RDP client software has various settings for optimizing your connection experience. The default settings optimize your experience based on your network connection. Typically, you don't need to change the default settings.

Learn more about the [RDP client's Experience settings](https://learn.microsoft.com/windows-server/administration/performance-tuning/role/remote-desktop/session-hosts#client-experience-settings).

If you're using a Linux lab VM with a graphical desktop and the RDP client, the following settings might help to optimize performance:

- On the **Display** tab, set the color depth to **High Color (15 bit)**.

    Screenshot of display tab of the Windows R D P client, highlighting the color depth setting.

- On the **Experience** tab, set the connection speed to **Modem (56 kbps)**.

    Screenshot of experience tab of the Windows RDP client, highlighting the connection speed setting.

## Related content

- [As an educator, enabled RDP on Linux](how-to-enable-remote-desktop-linux.md)
- [As a student, stop the VM](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/lab-services/how-to-use-lab.md#start-or-stop-the-vm)
