---
title: Prepare generalized image from Windows VHD to deploy VMs on Azure Stack Edge Pro GPU
description: Describes how to create a generalized VM image starting from a Windows VHD or VHDX. Use this generalized VM image to deploy virtual machines on your Azure Stack Edge Pro GPU device.
services: databox
author: sipastak

ms.service: azure-stack-edge
ms.topic: how-to
ms.date: 06/12/2025
ms.author: sipastak
#Customer intent: As an IT admin, I need to understand how to create and upload Azure VM images that I can use to deploy virtual machines on my Azure Stack Edge Pro GPU device.
---

# Prepare generalized image from Windows VHD to deploy VMs on Azure Stack Edge Pro GPU


**APPLIES TO:** Yes for Pro GPU SKUAzure Stack Edge Pro - GPUYes for Pro 2 SKUAzure Stack Edge Pro 2Yes for Pro R SKUAzure Stack Edge Pro RYes for Mini R SKUAzure Stack Edge Mini R&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;  &nbsp;


To deploy VMs on your Azure Stack Edge Pro GPU device, you need to be able to create custom VM images that you can use to create VMs. This article describes how to prepare a generalized image from a Windows VHD or VHDX, which you can use to deploy virtual machines on Windows Stack Edge Pro GPU devices.

To prepare a generalized VM image using an ISO, see [Prepare a generalized image from an ISO to deploy VMs on Azure Stack Edge Pro GPU](azure-stack-edge-gpu-prepare-windows-generalized-image-iso.md).

## About VM images

A Windows VHD or VHDX can be used to create a *specialized* image or a *generalized* image. The following table summarizes key differences between the *specialized* and the *generalized* images.


| Image type | Generalized | Specialized |
| --- | --- | --- |
| Target | Deployed on any system. | Targeted to a specific system. |
| Setup after boot | Setup required at first boot of the VM. | No setup needed. <br> Platform turns on the VM. |
| Configuration | Hostname, admin-user, and other VM-specific settings required. | Preconfigured. |
| Used when | Creating multiple new VMs from the same image. | Migrating a specific machine or restoring a VM from previous backup. |


## Workflow

The high-level workflow to prepare a Windows VHD to use as a generalized image, starting from the VHD or VHDX of an existing virtual machine, has the following steps:

1. Prepare the source VM from a Windows VHD:
   1. Convert the source VHD or VHDX to a fixed-size VHD.
   1. Use that VHD to create a new virtual machine.<!--Can this procedure be generalized and moved to an include file?-->
1. Start the VM, and install the Windows operating system.
1. Generalize the VHD using the *sysprep* utility.
1. Copy the generalized image to Blob storage.

## Prerequisites

Before you prepare a Windows VHD for use as a generalized image on an Azure Stack Edge Pro GPU device, make sure that:

- You have a VHD or a VHDX containing a supported version of Windows. 
- You have access to a Windows client with Hyper-V Manager installed. 
- You have access to an Azure Blob storage account to store your VHD after it's prepared.

## Prepare source VM from Windows VHD

When your VM source is a Windows VHD or VHDX, you first need to convert the Windows VHD to a fixed-size VHD. You'll use the fixed-size VHD to create a new virtual machine.

> **Important:**
> These procedures don't cover cases where the source VHD is configured with custom configurations and settings. For example, additional actions may be required to generalize a VHD containing custom firewall rules or proxy settings. For more information on these additional actions, see [Prepare a Windows VHD to upload to Azure - Azure Virtual Machines](https://learn.microsoft.com/azure/virtual-machines/windows/prepare-for-upload-vhd-image).

#### Convert source VHD to a fixed-size VHD

For your device, you need fixed-size VHDs to create VM images. You must convert your source Windows VHD or VHDX to a fixed VHD. 

Follow these steps:

1. Open Hyper-V Manager on your client system. Go to **Edit Disk**.

    Open Hyper-V manager

1. On the **Before you begin** page, select **Next>**.

1. On the **Locate virtual hard disk** page, browse to the location of the source Windows VHD or VHDX that you wish to convert. Select **Next>**.

    Locate virtual hard disk page

1. On the **Choose action** page, select **Convert** and select **Next>**.

    Choose action page

1. On the **Choose disk format** page, select **VHD** format and then select **Next>**.

   Choose disk format page

1. On the **Choose disk type** page, choose **Fixed size** and select **Next>**.

   Choose disk type page

1. On the **Configure disk** page, browse to the location and specify a name for the fixed size VHD disk. Select **Next>**.

   Configure disk page

1. Review the summary and select **Finish**. The VHD or VHDX conversion takes a few minutes. The time for conversion depends on the size of the source disk.

<!--
1. Run PowerShell on your Windows client.
1. Run the following command:

    ```powershell
    Convert-VHD -Path <source VHD path> -DestinationPath <destination-path.vhd> -VHDType Fixed 
    ```
-->
Use this fixed-size VHD for all the subsequent steps in this article.

#### Create Hyper-V VM from the fixed-size VHD

1. In **Hyper-V Manager**, in the scope pane, right-click your system node to open the context menu, and then select **New** > **Virtual Machine**.

    Select new virtual machine in scope pane

1. On the **Before you begin** page of the New Virtual Machine Wizard, select **Next**.

1. On the **Specify name and location** page, provide a **Name** and **location** for your virtual machine. Select **Next**.

    Specify name and location for your VM

1. On the **Specify generation** page, choose **Generation 1** or **Generation 2** for the .vhd device image type, and then select **Next**.    

    Specify generation

1. Assign your desired memory and networking configurations.

1. On the **Connect virtual hard disk** page, choose **Use an existing virtual hard disk**, specify the location of the Windows fixed VHD that we created earlier, and then select **Next**.

    Connect virtual hard disk page

1. Review the **Summary** and then select **Finish** to create the virtual machine.

Creation of the virtual machine takes several minutes.

The VM shows in the list of the virtual machines on your client system.

## Start VM, and install operating system

To finish building your virtual machine, you need to start the virtual machine and walk through the operating system installation.



1. In **Hyper-V Manager**, in the scope pane, right-click the VM to open the context menu, and then select **Start**. 

    Select VM and start it

2. When the VM state is **Running**, select the VM, and then right-click and select **Connect**.

    Connect to VM

3. The virtual machine boots into setup, and you can walk through the installation like you would on a physical computer.
 
   Configure the operating system of the VM<!--Reshot. How best to generalize client name?-->

<!--Compare with the Hyper-V VM steps in https://learn.microsoft.com/virtualization/hyper-v-on-windows/quick-start/create-virtual-machine#complete-the-operating-system-deployment. Should licensing be raised as an issue in the Azure Stack Edge version?-->


After you're connected to the VM, complete the Machine setup wizard, and then sign into the VM.<!--It's not clear what they are doing here. Where does the Machine setup wizard come in?-->

## Generalize the VHD

Use the *sysprep* utility to generalize the VHD. 


1. Inside the VM, open a command prompt.

1. Run the following command to generalize the VHD. 

    ```
    c:\windows\system32\sysprep\sysprep.exe /oobe /generalize /shutdown /mode:vm
    ```
    
    For details, see [Sysprep (system preparation) overview](https://learn.microsoft.com/windows-hardware/manufacture/desktop/sysprep--system-preparation--overview).

1.  After the command is complete, the VM will shut down. **Do not restart the VM**.


Your VHD can now be used to create a generalized image to use on Azure Stack Edge Pro GPU.

## Upload generalized VHD to Azure Blob storage


1. Upload the VHD to Azure blob storage. See the detailed instructions in [Upload a VHD using Azure Storage Explorer](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/devtest-labs/devtest-lab-upload-vhd-using-storage-explorer.md).

1. After the upload is complete, you can use the uploaded image to create VM images and VMs.

<!-- this should be added to deploy VM articles - If you experience any issues creating VMs from your new image, you can use VM console access to help troubleshoot. For information on console access, see [link].-->

## Next steps

Depending on the nature of deployment, you can choose one of the following procedures.

- [Deploy a VM from a generalized image via Azure portal](azure-stack-edge-gpu-deploy-virtual-machine-portal.md)
- [Prepare a generalized image from an ISO to deploy VMs on Azure Stack Edge Pro GPU](azure-stack-edge-gpu-prepare-windows-generalized-image-iso.md)
- [Prepare a specialized image and deploy VMs using the image](azure-stack-edge-gpu-deploy-vm-specialized-image-powershell.md)
