---
title: Reset the password on VMs for your Azure Stack Edge Pro GPU device via the Azure portal
description: Describes how to reset the password on virtual machines (VMs) on an Azure Stack Edge Pro GPU device via the Azure portal.
services: databox
author: sipastak

ms.service: azure-stack-edge
ms.topic: how-to
ms.date: 04/29/2022
ms.author: sipastak
ms.custom:
  - linux-related-content
  - sfi-image-nochange
#Customer intent: As an IT admin, I need to understand how reset or change the password on virtual machines (VMs) on my Azure Stack Edge Pro GPU device via the Azure portal.
---
# Reset VM password for your Azure Stack Edge Pro GPU device via the Azure portal


**APPLIES TO:** Yes for Pro GPU SKUAzure Stack Edge Pro - GPUYes for Pro 2 SKUAzure Stack Edge Pro 2Yes for Pro R SKUAzure Stack Edge Pro RYes for Mini R SKUAzure Stack Edge Mini R&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;  &nbsp;


This article covers steps to reset the password on both Windows and Linux VMs using the Azure portal. To reset a password using PowerShell and local Azure Resource Manager templates, see [Install the VM password reset extension](azure-stack-edge-gpu-deploy-virtual-machine-install-password-reset-extension.md).

## Reset Windows VM password

Use the following steps to reset the VM password for your Azure Stack Edge Pro GPU device:

1. In the Azure portal, go to the Azure Stack Edge resource for your device, then go to **Edge services** > **Virtual machines**.

    Screenshot of the Azure portal showing your Azure Stack Edge resource for your device, and how to navigate to your Windows V M.

1. From the Azure portal VM list view, select the VM name with the password you would like to reset.

    Screenshot of the Azure portal Windows V M list view.

1. Select **Reset password**.

    Screenshot of the Azure portal Windows V M change password tab.

1. Specify the username and the new password. Confirm the new password, and then select **Save**.

    For more information about Windows VM password requirements, see [Password requirements for a Windows VM](https://learn.microsoft.com/azure/virtual-machines/windows/faq#what-are-the-password-requirements-when-creating-a-vm-).

    Screenshot of the Azure portal Windows V M change password control.

1. While the operation is in progress, you can view the notification that shows the status of the operation. Select **Refresh** to update status of the operation.

    Screenshot of the Azure portal Windows V M change password progress.

1. When the operation is complete, you can see that the *windowsVMAccessExt* extension is installed for the VM.

    Screenshot of the Azure portal Windows V M change password confirmation.

1. Connect to the VM with the new password.

## Reset Linux VM password

Use the following steps to reset the VM password for your Azure Stack Edge Pro GPU device:

1. In the Azure portal, go to the Azure Stack Edge resource for your device, then go to **Edge services** > **Virtual machines**.

    Screenshot of the Azure portal, Azure Stack Edge resource for your device, and how to navigate to your Windows V M.

1. From the Azure portal VM list view, select the VM name with the password you would like to reset.

    Screenshot of the Azure portal Linux V M list view.

1. Select **Reset password**.

    Screenshot of the Azure portal Linux V M change password tab.

1. Specify the username and the new password. Confirm the new password, and then select **Save**.

    For more information about Linux VM password requirements, see [Password requirements for a Linux VM](https://learn.microsoft.com/azure/virtual-machines/linux/faq#what-are-the-password-requirements-when-creating-a-vm-).

    Screenshot of the Azure portal Linux V M change password control.

1. While the operation is in progress, you can view the notification that shows the status of the operation. Select **Refresh** to update status of the operation.

    Screenshot of the Azure portal Linux V M change password progress.

1. When the operation is complete, you can see that the *linuxVMAccessExt* extension is installed for the VM.

    Screenshot of the Azure portal Linux V M change password confirmation.

1. Connect to the VM with the new password.

## Next steps

 - Learn about [Deploy VMs on your Azure Stack Edge Pro GPU device via the Azure portal](azure-stack-edge-gpu-deploy-virtual-machine-portal.md).

 - Learn about [Install the password reset extension on VMs for your Azure Stack Edge Pro GPU device](azure-stack-edge-gpu-deploy-virtual-machine-install-password-reset-extension.md).
