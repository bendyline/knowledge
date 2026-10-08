---
title: Encrypt Disks with Customer-Managed Keys
description: Learn how to manage disk encryption by using customer-managed keys in Azure DevTest Labs. 
ms.topic: how-to
ms.author: rosemalcolm
author: RoseHJM
ms.date: 07/15/2025
ms.custom:
  - subject-rbac-steps
  - UpdateFrequency2
  - sfi-image-nochange

#customer intent: As a lab owner, I want to use customer-managed keys to manage disk encryption so that I can manage access control with more flexibility.  
---

# Encrypt disks with customer-managed keys in Azure DevTest Labs

This article shows how a lab owner can set up encryption with a customer-managed key.

Server-side encryption (SSE) protects your data and helps you meet your organizational security and compliance commitments. SSE automatically encrypts data stored on managed disks in Azure (OS and data disks) at rest by default when it's persisted to the cloud. For more information about disk encryption on Azure, see [Server-side encryption](https://learn.microsoft.com/azure/virtual-machines/disk-encryption).

In Azure DevTest Labs, all OS disks and data disks created in a lab are encrypted via platform-managed keys. However, as a lab owner, you can choose to manage the encryption of lab virtual machine disks by using your own keys. If you choose to manage encryption by using your own keys, you can specify a *customer-managed key* to use for encrypting data in lab disks. To learn more about SSE with customer-managed keys, and other managed disk encryption types, see [Customer-managed keys](https://learn.microsoft.com/azure/virtual-machines/disk-encryption#customer-managed-keys). Also see [restrictions with using customer-managed keys](https://learn.microsoft.com/azure/virtual-machines/disks-enable-customer-managed-keys-portal#restrictions).

> **Note:**
> The disk encryption setting applies to newly created disks in the lab. If you change the disk encryption set, older disks in the lab continue to be encrypted with the previous disk encryption set.

## Prerequisites

- If you don't have a disk encryption set, [complete the steps in this article to set up a key vault and a disk encryption set](https://learn.microsoft.com/azure/virtual-machines/disks-enable-customer-managed-keys-portal). Note the following requirements for the disk encryption set:

  - The disk encryption set needs to be in same region and subscription as your lab.
  - The lab owner needs to have at least reader-level access to the disk encryption set that will be used to encrypt lab disks.

- For labs created before August 1, 2020, the lab owner needs to ensure that lab system-assigned identity is enabled. To do so, the lab owner can go to the lab, select **Configuration and policies**, select **Identity** in the left menu, change the system-assigned identity **Status** to **On**, and then select **Save**. For labs created after August 1, 2020, the system-assigned identity is enabled by default.

    
    Screenshot that shows the steps for enabling system-assigned identity.

- For the lab to handle encryption for all lab disks, the lab owner needs to explicitly grant the lab's system-assigned identity reader role on the disk encryption set and the virtual machine contributor role on the underlying Azure subscription. The lab owner can do that by completing the following steps:

    1. Ensure that you're a member of the [User Access Administrator role](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles.md#user-access-administrator) at the Azure-subscription level so that you can manage user access to Azure resources.

    1. On the **Disk Encryption Set** page, assign at least the Reader role to the lab for which the disk encryption set will be used.

       For detailed steps, see [Assign Azure roles using the Azure portal](https://learn.microsoft.com/azure/role-based-access-control/role-assignments-portal).

    1. Go to the **Subscription** page in the Azure portal.

    1. Assign the Virtual Machine Contributor role to the lab (system-assigned identity for the lab).

## Encrypt lab OS disks with a customer-managed key

1. On the overview page for your lab in the Azure portal, select **Configuration and policies** in the left pane.
1. In the left pane of the **Configuration and policies** page, select **Disks (Preview)** in the **Encryption** section. By default, **Encryption type** is set to **Encryption at-rest with a platform managed key**.

    Screenshot that shows the Disks pane in Configuration and policies.

1. In the **Encryption type** box, select **Encryption at-rest with a customer managed key**.
1. In the **Disk encryption set** box, select the disk encryption set you created earlier. It's the same disk encryption set that the system-assigned identity of the lab can access.
1. Select **Save** at the top of the pane.

    Screenshot that shows the steps to complete in Configuration and policies.

1. A message box appears with the following message: *This setting will apply to newly created machines in the lab. Old OS disk will remain encrypted with the old disk encryption set*. Select **OK**.

    After this configuration, lab disks are encrypted with the customer-managed key provided in the disk encryption set.

## Validate that disks are being encrypted

1. Go to a lab virtual machine that you created after enabling disk encryption with a customer-managed key on the lab.

    
    Screenshot that shows a VM with disk encryption enabled.

1. Select the resource group of the VM and then select the OS disk.

     
    Screenshot that shows the VM in its resource group.

1. In the left pane, under **Settings**, select **Encryption**. Validate that encryption is set to customer-managed key with the disk encryption set that you selected.

     
    Screenshot that shows the encryption type of the VM.
  
## Related content

- [Azure disk encryption](https://learn.microsoft.com/azure/virtual-machines/disk-encryption)
- [Customer-managed keys](https://learn.microsoft.com/azure/virtual-machines/disk-encryption#customer-managed-keys)
