---
title: AD Forest Recovery - Verify Replication
description: Learn more about resources to verify replication.
ms.topic: how-to
ms.author: roharwoo
author: robinharwood
ms.date: 09/25/2025
---

# Active Directory Forest Recovery - Verify Replication

After you've restored or reinstalled all domain controllers (DCs), you can verify that AD DS, and the sysvol folder has recovered and is replicating correctly by using `repadmin /replsum`. `repadmin /replsum` runs on any version of Windows Server.

Check the DFS Replication event logs for Event ID 4602 (or File Replication Service event ID 13516). This log event indicates sysvol replication has been initialized.

If the first recovered DC has Event ID 4614 in the DFS Replication log (“the domain controller is waiting to perform initial replication"), the replicated folder remains in the initial synchronization state until it has replicated with its partner. If Event ID 4602 doesn't appear, you need to perform the following manual steps to recover the sysvol folder if it's replicated using DFSR.

1. If DFSR Event 4612 appears on the first restored DC, perform a manual authoritative restore as described in [2218556: How to force authoritative and nonauthoritative synchronization for DFSR-replicated sysvol replication)](https://support.microsoft.com/kb/2218556).
1. Set **SysvolReady Flag** to 1 manually, as described in [947022 The NETLOGON share isn't present after you install Active Directory Domain Services on a new full or read-only Windows Server 2008-based domain controller](https://support.microsoft.com/kb/947022).

You can also create a diagnostic report DFS Replication. For more information, see [Create a Diagnostic Report for DFS Replication](https://learn.microsoft.com/previous-versions/windows/it-pro/windows-server-2008-R2-and-2008/cc754227\(v=ws.11\)) and [DFS Step-by-Step Guide for Windows Server 2008](https://learn.microsoft.com/previous-versions/windows/it-pro/windows-server-2008-R2-and-2008/cc754227\(v=ws.11\)). If the server is running Windows Server 2008 R2, you can use [dfsrdiag.exe ReplicationState command line switch](https://learn.microsoft.com/previous-versions/windows/it-pro/windows-server-2008-R2-and-2008/cc754227\(v=ws.11\)).

You can also run the Replications test using dcdiag.exe to check for replication errors. For more information, see Knowledge Base [Active Directory replication error 8452 - Windows Server](https://learn.microsoft.com/troubleshoot/windows-server/identity/replication-error-8452).

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
