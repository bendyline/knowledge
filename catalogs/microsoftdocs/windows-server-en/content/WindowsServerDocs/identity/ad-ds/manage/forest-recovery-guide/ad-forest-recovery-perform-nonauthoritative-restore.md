---
title: Active Directory Forest Recovery - Performing a nonauthoritative restore of Active Directory Domain Services
description: The following procedures use the wbadmin.exe to perform a nonauthoritative restore of Active Directory or Active Directory Domain Services (AD DS). If you're using a different backup solution or if you intend to complete the authoritative restore of SYSVOL later in the forest recovery process...
perform an authoritative restore of SYSVOL by using these alternative methods:
ms.author: roharwoo
author: robinharwood
ms.date: 06/21/2023
ms.topic: how-to
---

# Active Directory Forest Recovery - Perform a nonauthoritative restore of Active Directory Domain Services

> 

To perform a nonauthoritative restore, complete the following procedure.

The following procedures use the wbadmin.exe to perform a nonauthoritative
restore of Active Directory or Active Directory Domain Services (AD DS). If you're using a different backup solution or if you intend to complete the
authoritative restore of SYSVOL later in the forest recovery process, you can
perform an authoritative restore of SYSVOL by using these alternative methods:

- Determine if SYSVOL is replicated by FRS, see [Determining Whether a Domain Controller's SYSVOL Folder is Replicated by DFSR or FRS](https://learn.microsoft.com/windows/win32/vss/backing-up-and-restoring-an-frs-replicated-sysvol-folder#determining_whether_a_domain_controller_s_sysvol_folder_is_replicated_by_dfsr_or_frs).
- If you're still using File Replication Service (FRS), please consider switching to Distributed File System (DFS) Replication as soon as possible.  
    If you still use FRS to replicate SYSVOL, follow the steps in [article 290762](https://learn.microsoft.com/troubleshoot/windows-server/networking/use-burflags-to-reinitialize-frs)
    in the Microsoft Knowledge Base, using the **BurFlags** registry key to
    reinitialize FRS replica sets, or if necessary, article
    [315457](https://support.microsoft.com/kb/315457) to rebuild the SYSVOL
    tree.
- If you're using Distributed File System (DFS) Replication to replicate
    SYSVOL, see [Perform an authoritative synchronization of DFSR-replicated SYSVOL](ad-forest-recovery-authoritative-recovery-sysvol.md).

## Perform a nonauthoritative restore

Use the following procedure to perform a nonauthoritative restore of AD DS and
an authoritative restore of SYSVOL at the same time by using wbadmin.exe. The
backup must explicitly include system state data; a full server backup that is
used for full server recovery won't work. A Bare Metal Recovery Backup (BMR)
will contain a system state backup. For more information about creating a system
state backup, see [Backing up the System State data](ad-forest-recovery-backing-up-system-state.md).

### Perform a nonauthoritative restore of AD DS and authoritative restore of SYSVOL using wbadmin.exe**

Include the **-authsysvol** switch in your recovery command, as shown in the following example:

`wbadmin start systemstaterecovery \<otheroptions\> -authsysvol`

For example:

`wbadmin start systemstaterecovery -version:01/01/2023-13:00 -authsysvol`

Restore

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
