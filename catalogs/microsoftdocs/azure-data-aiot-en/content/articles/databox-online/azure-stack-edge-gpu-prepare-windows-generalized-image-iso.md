---
title: Prepare generalized image from ISO to deploy VMs on Azure Stack Edge Pro GPU
description: Describes how to create a generalized Windows VM image starting from an ISO. Use this generalized image to deploy virtual machines on your Azure Stack Edge Pro GPU device.
services: databox
author: sipastak

ms.service: azure-stack-edge
ms.topic: how-to
ms.date: 06/12/2025
ms.author: sipastak
#Customer intent: As an IT admin, I need to be able to quickly deploy new Windows virtual machines on my Azure Stack Edge Pro GPU device, and I want to use an ISO image for OS installation.
---

# Prepare generalized image from ISO to deploy VMs on Azure Stack Edge Pro GPU 


**APPLIES TO:** Yes for Pro GPU SKUAzure Stack Edge Pro - GPUYes for Pro 2 SKUAzure Stack Edge Pro 2Yes for Pro R SKUAzure Stack Edge Pro RYes for Mini R SKUAzure Stack Edge Mini R&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;  &nbsp;


To deploy VMs on your Azure Stack Edge Pro GPU device, you need to be able to create custom virtual machine (VM) images that you can use to create VMs. This article describes how to prepare a Windows VM image using ISO installation media, and then generalize that image so you can use it to deploy multiple new VMs on your Azure Stack Edge Pro GPU device.

To prepare a generalized image created from a Windows VHD or VHDX, see [Prepare a generalized image from a Windows VHD to deploy VMs on Azure Stack Edge Pro GPU](azure-stack-edge-gpu-prepare-windows-vhd-generalized-image.md).

## About VM images

A Windows VHD or VHDX can be used to create a *specialized* image or a *generalized* image. The following table summarizes key differences between the *specialized* and the *generalized* images.


| Image type | Generalized | Specialized |
| --- | --- | --- |
| Target | Deployed on any system. | Targeted to a specific system. |
| Setup after boot | Setup required at first boot of the VM. | No setup needed. <br> Platform turns on the VM. |
| Configuration | Hostname, admin-user, and other VM-specific settings required. | Preconfigured. |
| Used when | Creating multiple new VMs from the same image. | Migrating a specific machine or restoring a VM from previous backup. |


## Workflow 

The high-level workflow to create a generalized Windows VHD using an ISO is:

1. Prepare the source VM using an ISO image:
   1. Create a new, blank, fixed-size VHD in Hyper-V Manager.
   1. Use that VHD to create a new virtual machine.
   1. Mount your ISO image on the DVD drive of the new VM.
1. Start the VM, and install the Windows operating system.
1. Generalize the VHD using the *sysprep* utility.
1. Copy the generalized image to Azure Blob storage.

## Prerequisites

Before you can create a generalized Windows VHD by using an ISO image, make sure that:

- You have an ISO image for the supported Windows version that you want to turn into a generalized VHD. Windows ISO images can be downloaded from the [Microsoft Evaluation Center](https://www.microsoft.com/en-us/evalcenter/).

- You have access to a Windows client with Hyper-V Manager installed.

- You have access to an Azure blob storage account to store your VHD after it's prepared.

## Prepare source VM using an ISO

When you use an ISO image to install the operating system on your VM image, you start by creating a blank, fixed-size VHD in Hyper-V Manager. You then use that VHD to create a virtual machine. Then you attach the ISO image to the VM.

#### Create new VHD in Hyper-V Manager

Your first step is to create a new Generation 1 VHD in Hyper-V Manager, which is the source VHD for a new virtual machine.

To create the VHD, follow these steps:

1. Open Hyper-V Manager on your client system. On the **Action** menu, select **New** and then **Hard Disk**.

   Select New and then Hard Disk

1. Under **Choose Disk Format**, select **VHD**. Then select **Next >**. 

   Choose VHD as the disk format

2. Under **Choose Disk Type**, select **Fixed size**. Then select **Next >**.

   Choose Fixed size as the disk type

3. Under **Specify Name and Location**, enter a name and location for your new VHD. Then select **Next >**.

   Enter the name and location for the VHD

4. Under **Configure Disk**, select **Create a new blank virtual hard disk**, and enter the size of disk you would like to create (generally 20 GB or more for Windows Server). Then select **Next >**.

   Settings for creating a new blank virtual hard disk and specifying the size

5. Under **Summary**, review your selections, and select **Finish** to create the new VHD. The process takes five or more minutes depending on the size of the VHD created.

   Summary of VHD settings

#### Create Hyper-V VM from VHD

Now use the VHD you just created to create a new virtual machine.

To create your new virtual machine, follow these steps:

1. Open Hyper-V Manager on your Windows client.

2. On the **Actions** pane, select **New** and then **Virtual Machine**.

   Select New and then Virtual Machine from the menu on the right.

3. In the New Virtual Machine Wizard, specify the name and location of your VM.

   New Virtual Machine wizard, Specify Name and Location

4. Under **Specify Generation**, select **Generation 1** or **Generation 2**. Then select **Next >**.

   New Virtual Machine wizard, Choose the generation of virtual machine to create

5. Under **Assign Memory**, assign the desired memory to the virtual machine. Then select **Next >**.

   New Virtual Machine wizard, Assign Memory

6. Under **Configure Networking**, enter your network configuration. Then select **Next >**.

   New Virtual Machine wizard, Configure Networking

7. Under **Connect Virtual Hard Disk**, select **Use an existing virtual hard disk** and browse to the fixed VHD you created in the previous procedure. Then select **Next >**. 

   New Virtual Machine wizard, Select an existing virtual hard disk as the source

8. Review the summary, and select **Finish** to create the virtual machine. 

#### Mount ISO image on DVD drive of VM

After creating the new virtual machine, follow these steps to mount your ISO image on the DVD drive of the virtual machine:

1. In Hyper-V Manager, select the VM you created, and then select **Settings**.
 
   In Hyper-V Manager, open Settings for your virtual machine

2. Under **BIOS**, ensure that **CD** is at the top of the **Startup order** list.

   In BIOS settings, the first item under Startup order should be CD


3. Under **DVD Drive**, select **Image file**, and browse to your ISO image.  

   In DVD drive settings, select the image file for your VHD

4. Select **OK** to save your VM settings.

## Start VM, and complete OS installation

To finish building your virtual machine, you need to start the virtual machine and walk through the operating system installation.



1. In **Hyper-V Manager**, in the scope pane, right-click the VM to open the context menu, and then select **Start**. 

    Select VM and start it

2. When the VM state is **Running**, select the VM, and then right-click and select **Connect**.

    Connect to VM

3. The virtual machine boots into setup, and you can walk through the installation like you would on a physical computer.
 
   Configure the operating system of the VM<!--Reshot. How best to generalize client name?-->

<!--Compare with the Hyper-V VM steps in https://learn.microsoft.com/virtualization/hyper-v-on-windows/quick-start/create-virtual-machine#complete-the-operating-system-deployment. Should licensing be raised as an issue in the Azure Stack Edge version?-->


> **Note:**
> If you installed the Windows Server 2019 Standard operating system on your virtual machine, you must change the **BIOS** setting to **IDE** before you [generalize the VHD](#generalize-the-vhd). 

## Generalize the VHD

Use the *sysprep* utility to generalize the VHD.

1. If you're generalizing a Windows Server 2019 Standard VM, before you generalize the VHD, make IDE the first **BIOS** setting for the virtual machine.

    1. In Hyper-V Manager, select the VM, and then select **Settings**.
 
       Screenshot showing how to open Settings for a selected VM in Hyper-V Manager

     1. Under **BIOS**, ensure that **IDE** is at the top of the **Startup order** list. Then select **OK** to save the setting.

        Screenshot showing IDE at top of startup order in BIOS settings for a VM in Hyper-V Manager

1. Inside the VM, open a command prompt.

1. Run the following command to generalize the VHD. 

    ```
    c:\windows\system32\sysprep\sysprep.exe /oobe /generalize /shutdown /mode:vm
    ```
    
    For details, see [Sysprep (system preparation) overview](https://learn.microsoft.com/windows-hardware/manufacture/desktop/sysprep--system-preparation--overview).

1.  After the command is complete, the VM will shut down. **Do not restart the VM**.

<!--[!INCLUDE [Generalize the VHD](../../includes/azure-stack-edge-generalize-vhd.md)]-->

Your VHD can now be used to create a generalized image to use on Azure Stack Edge Pro GPU.

## Upload generalized VHD to Azure Blob storage


1. Upload the VHD to Azure blob storage. See the detailed instructions in [Upload a VHD using Azure Storage Explorer](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/devtest-labs/devtest-lab-upload-vhd-using-storage-explorer.md).

1. After the upload is complete, you can use the uploaded image to create VM images and VMs.

## Next steps

- [Deploy a VM from a generalized image via Azure portal](azure-stack-edge-gpu-deploy-virtual-machine-portal.md)
- [Prepare a generalized image from a Windows VHD to deploy VMs on Azure Stack Edge Pro GPU](azure-stack-edge-gpu-prepare-windows-vhd-generalized-image.md)
- [Prepare a specialized image and deploy VMs using the image](azure-stack-edge-gpu-deploy-vm-specialized-image-powershell.md)
