---
title: Troubleshoot lab VM access
titleSuffix: Azure Lab Services
description: Learn the different approaches for troubleshooting lab VMs in Azure Lab Services. Understand how each approach affects user data.
services: lab-services
ms.service: azure-lab-services
author: RoseHJM
ms.author: rosemalcolm
ms.topic: troubleshooting
ms.date: 03/15/2024
---

# Troubleshoot accessing lab VMs in Azure Lab Services


> **Important:**
> Azure Lab Services will be retired on June 28, 2027. For more information, see the [retirement guide](https://aka.ms/azlabs-retirementguide). To simplify your migration, Microsoft has published automation scripts to help you clean up Lab Services resources, these are available in the [Azure Lab Services Retirement Scripts
 GitHub repository](https://github.com/microsoft/Azure-Lab-Services-Retirement-Scripts).


In this article, you learn about the different approaches for troubleshooting lab VMs. Understand how each approach affects your lab environment and user data on the lab VM. There can be different reasons why you're unable to access to a lab VM in Azure Lab Services, or why you're stuck to complete a course. For example, the underlying VM is experiencing issues, your organization's firewall settings changed, or a software change in the lab VM operating system.

## Prerequisites

- To change settings for the lab plan, your Azure account needs the Owner or Contributor role on the lab plan. Learn more about the [Azure Lab Services built-in roles](concept-lab-services-role-based-access-control.md).

- To redeploy or reimage a lab VM, you need to be either the lab user that is assigned to the VM, or your Azure account has the Owner, Contributor, Lab Creator, or Lab Contributor role. Learn more about the [Azure Lab Services built-in roles](concept-lab-services-role-based-access-control.md).

## Symptoms

To use and access a lab VM, you connect to it by using Remote Desktop (RDP) or Secure Shell (SSH). You may experience difficulties to access your lab VM:

- You're unable to start the lab VM

- You're unable to connect to the lab VM from your computer by using RDP or SSH 

- You're unable to log in to the lab VM

- After connecting to the lab VM, the VM isn't working correctly

## Troubleshooting steps

### Unable to start lab VM
When our service is unable to maintain connection with a lab VM, a warning appears next to the lab VM name. 

Screenshot that shows an alert next the lab VM name.

If you see a lab VM alert next to its name, then hover over it to read the error message. This message might state that _"Our cloud virtual machine has become non-responsive and will be stopped automatically to avoid overbilling."_

Screenshot that shows an alert message when the cursor hovers over an alert next to the lab VM name.

Scenarios might include:

| Scenario | Cause | Resolution |
| --- | --- | --- |
| Lab Services Agent | Disabling the Lab Services agent on the lab VM in any form, including: <br> • Changing system files or folders under C:\WindowsAzure <br> • Modifying services by either starting or stopping the Azure agent | •  If the Lab Services agent is deleted, then the lab VM will need to be [reimaged](how-to-reset-and-redeploy-vm.md#reimage-a-lab-vm) which deletes data local to that machine. <br> • Students should avoid making changes to any files/folders under C:\WindowsAzure |
| OS disk full | • Limited disk space prevents the lab VM from starting <br> • A nested virtualization template with a full host disk prevents the lab from publishing | Ensure at least 1 GB of space is available on the primary disk |
| Network configuration | • Installing a firewall that has outbound rule blocking 443 port <br> • Changing DNS setting, custom DNS solution, can't find our DNS endpoint <br> • Changing DHCP settings or IP address in the VM | Learn more about [supported networking scenarios and topologies for advanced networking](concept-lab-services-supported-networking-scenarios.md) and review [troubleshooting lab VM connection](troubleshoot-connect-lab-vm.md) |

If you have questions or need help, review the [Advanced troubleshooting](#advanced-troubleshooting) section.

### Unable to connect to the lab VM with Remote Desktop (RDP) or Secure Shell (SSH)

1. [Redeploy your lab VM](how-to-reset-and-redeploy-vm.md#redeploy-a-lab-vm) to another infrastructure node, while maintaining the user data 

    This approach might help resolve issues with the underlying virtual machine. Learn more about [redeploying versus reimaging a lab VM](#redeploy-versus-reimage-a-lab-vm) and how they affect your user data.

1. [Verify your organization's firewall settings for your lab](how-to-configure-firewall-settings.md) with the educator and IT admin

    A change in the organization's firewall or network settings might prevent your computer to connect to the lab VM.

1. If you still can't connect to the lab VM, [reimage the lab VM](how-to-reset-and-redeploy-vm.md#reimage-a-lab-vm)

    > **Important:**
    > Reimaging a lab VM deletes the user data in the VM. Make sure to [store the user data outside the lab VM](#store-user-data-outside-the-lab-vm).

### Unable to login with the credentials you used for creating the lab

When you create a new lab from an exported lab VM image, perform the following steps:

1. Reuse the same credentials that were used in the original, exported, template VM.

1. After the lab creation finishes, you can [reset the password](how-to-set-virtual-machine-passwords.md).

### After logging in, the lab VM isn't working correctly

The lab VM might be malfunctioning as a result of installing a software component, or making a change to the operating system configuration.

1. If the lab VM uses Windows, you might use the Windows System Restore built-in functionality to undo a previous change to the operating system. Verify with an educator or IT admin how to use [System Restore](https://support.microsoft.com/windows/use-system-restore-a5ae3ed9-07c4-fd56-45ee-096777ecd14e).

1. If the lab VM is still in an incorrect state, [reimage the lab VM](how-to-reset-and-redeploy-vm.md#reimage-a-lab-vm).

    > **Important:**
    > Reimaging a lab VM deletes the user data in the VM. Make sure to [store the user data outside the lab VM](#store-user-data-outside-the-lab-vm).

## Redeploy versus reimage a lab VM

Azure Lab Services lets you redeploy or reimage a lab VM. Both operations are similar, and result in the creation of a new virtual machine instance. However, there are fundamental differences that affect the user data on the lab VM.

When you redeploy a lab VM, Azure Lab Services will shut down the VM, move the VM to a new node in within the Azure infrastructure, and then power it back on. You can think of a redeploy operation as a refresh of the underlying VM for your lab. All data that you saved in the [OS disk](https://learn.microsoft.com/azure/virtual-machines/managed-disks-overview#os-disk) (usually the C: drive on Windows) of the VM will still be available after the redeploy operation. Any data on the [temporary disk](https://learn.microsoft.com/azure/virtual-machines/managed-disks-overview#temporary-disk) (usually the D: drive on Windows) is lost after a redeploy operation and after a VM shutdown.

Learn more about how to [redeploy a lab VM in the Azure Lab Services website](how-to-reset-and-redeploy-vm.md#redeploy-a-lab-vm).

When you reimage a lab VM, Azure Lab Services will shut down the VM, delete it, and recreate a new lab VM from the original template VM. You can think of a reimage as a refresh of the entire VM. After you reimage a lab VM, all the data that you saved on the OS disk (usually the C: drive on Windows), and the temporary disk (usually the D: drive on Windows), is lost. To avoid losing data on the VM, [store the user data outside the lab VM](#store-user-data-outside-the-lab-vm).

Learn more about how to [reimage a lab VM in the Azure Lab Services website](how-to-reset-and-redeploy-vm.md#reimage-a-lab-vm).

> **Note:**
> Redeploying a VM is only available for lab VMs that you created in a lab plan. VMs that are connected to a lab account only support the reimage operation.

## Store user data outside the lab VM

When you reimage a lab VM, all user data on the VM is lost. To avoid losing this data, you have to store the user data outside of the lab VM. You have different options to configure the template VM:

- [Use OneDrive to store user data](how-to-prepare-windows-template.md#install-and-configure-onedrive).

## Create multiple labs for a course

As students use a lab VM to advance through a course, they might get stuck at specific steps. For example, they're unable to install and configure a software component on the lab VM. To unblock students, you can create multiple labs, based off different template VMs, for each of the key stages in the course.

Learn how to [set up a new lab](tutorial-setup-lab.md#create-a-lab) and how to [create and manage templates](how-to-create-manage-template.md).

## Advanced troubleshooting


If you have questions or need help, [create a support request](https://ms.portal.azure.com/#blade/Microsoft_Azure_Support/HelpAndSupportBlade/overview?DMC=troubleshoot), or ask [Azure community support](https://learn.microsoft.com/answers/topics/azure-labservices.html).

When you create an Azure support request, provide the following information in the request details to accelerate the problem resolution:

- The lab plan ID. Select the lab plan in the [Azure portal](https://portal.azure.com), and go to the **Properties** page.
- The lab ID. Select lab in the [Azure portal](https://portal.azure.com), and go to the **Properties** page. Alternately, select the URL of the lab in the [Azure Lab Services website](https://labs.azure.com).
- The approximate time the issues occurred.
- Any errors listed in the Azure activity log. Select the lab plan or lab in the [Azure portal](https://portal.azure.com), and go to the **Activity log** page. Learn how you can [view and download the activity log](https://learn.microsoft.com/azure/azure-monitor/essentials/activity-log#view-the-activity-log).


## Next steps

- As a lab user, learn how to [reimage or redeploy lab VMs](how-to-reset-and-redeploy-vm.md).
- As a lab creator, [use OneDrive to store user data](how-to-prepare-windows-template.md#install-and-configure-onedrive).
