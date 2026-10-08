---
title: Active Directory Forest Recovery - Virtualization  
description: Virtualized domain controller (DC) cloning simplifies and expedites the process for installing additional virtualized DCs in a domain, especially in centralized locations such as datacenters where several DCs run on hypervisors. After you restore one virtual DC in each domain from backup, additional DCs in each domain can be rapidly brought online by using the virtualized DC cloning process. You can prepare the first virtualized DC that you recover, shut it down, and then copy that virtual hard disk as many times as is necessary to create cloned virtualized DCs and build out the domain.
ms.author: roharwoo
author: robinharwood
ms.date: 06/21/2023
ms.topic: how-to
---

# Active Directory Forest Recovery - Virtualization

> 

## Use virtualized domain controller cloning to expedite forest recovery

Virtualized domain controller (DC) cloning simplifies and expedites the process
for installing additional virtualized DCs in a domain, especially in centralized
locations such as datacenters where several DCs run on hypervisors.

After you restore one virtual DC in each domain from backup, additional DCs in each domain
can be rapidly brought online by using the virtualized DC cloning process.

You can prepare the first virtualized DC that you recover, shut it down, and then
copy that virtual hard disk as many times as is necessary to create cloned
virtualized DCs and build out the domain.

## Requirements for virtualized DC cloning

The requirements for virtualized DC cloning are:

- The hypervisor must support `VM-GenerationID`. For example, Hyper-V supports that mechanism from Windows Server 2012, Windows 8, and newer operating systems. Check with your hypervisor vendor to find out if `VM-GenerationID` is supported.
- The virtualized DC that is used as a source for cloning must be a member of the Cloneable Domain Controllers group.

The PDC Emulator must be available during cloning operations.For step-by-step instructions for virtualized DC cloning, see [Safely virtualizing Active Directory Domain Services (AD DS)](https://learn.microsoft.com/windows-server/identity/ad-ds/introduction-to-active-directory-domain-services-ad-ds-virtualization-level-100). For details about how virtualized DC cloning works, see [Virtualized Domain Controller Technical Reference](https://learn.microsoft.com/windows-server/identity/ad-ds/deploy/virtual-dc/virtualized-domain-controller-technical-reference--level-300-).

## Next steps


- [AD Forest Recovery - Prerequisites](ad-forest-recovery-prerequisites.md)
- [AD Forest Recovery - Devise a custom forest recovery plan](ad-forest-recovery-devise-a-plan.md)
- [AD Forest Recovery - Steps to restore the forest](ad-forest-recovery-steps-for-restoring-the-forest.md)
- [AD Forest Recovery - Identify the problem](ad-forest-recovery-identify-the-problem.md)
- [AD Forest Recovery - Determine how to recover](ad-forest-recovery-determine-how-to-recover.md)
- [AD Forest Recovery - Perform initial recovery](ad-forest-recovery-perform-initial-recovery.md)
- [AD Forest Recovery - Procedures](ad-forest-recovery-procedures.md)
- [AD Forest Recovery - Frequently Asked Questions (FAQ)](https://github.com/MicrosoftDocs/windowsserverdocs/blob/b30da775fdeb9df0c446fda330fd0f101422edbe/WindowsServerDocs/identity/ad-ds/manage/forest-recovery-guide/ad-forest-recovery-faq.yml)
- [AD Forest Recovery - Recover a single domain within a multidomain forest](ad-forest-recovery-recover-single-domain-multidomain-forest.md)
- [AD Forest Recovery - Redeploy remaining DCs](ad-forest-recovery-restore-additional-dcs.md)
- [AD Forest Recovery - Virtualization](ad-forest-recovery-virtualization.md)
- [AD Forest Recovery - Cleanup](ad-forest-recovery-cleanup.md)
