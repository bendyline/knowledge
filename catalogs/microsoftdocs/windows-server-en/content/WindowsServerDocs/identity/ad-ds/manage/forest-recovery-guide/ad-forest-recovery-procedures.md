---
title: Active Directory Forest Recovery - Procedures
description: View a list of procedures that are used in backing up and restoring domain controllers and Active Directory.
ms.author: roharwoo
author: robinharwood
ms.date: 07/09/2025
ms.topic: how-to
---

# Active Directory forest recovery - procedures


This section contains procedures related to the forest recovery process.

Following is a list of procedures that are used in backing up and restoring
domain controllers and Active Directory.

- [Back up a full server](ad-forest-recovery-backing-up-a-full-server.md)
- [Back up the system state data](ad-forest-recovery-backing-up-system-state.md)
- [Perform a full server recovery](ad-forest-recovery-perform-full-server-recovery.md)
- [Perform an authoritative synch of DFSR-replicated SYSVOL](ad-forest-recovery-authoritative-recovery-sysvol.md)
- [Perform a nonauthoritative restore of Active Directory Domain Services](ad-forest-recovery-perform-nonauthoritative-restore.md)

These steps explain how to perform an authoritative restore of SYSVOL at the
same time.

- [Configure the DNS Server service](ad-forest-recovery-configure-dns.md)
- [Remove the global catalog](ad-forest-recovery-remove-gc.md)
- [Increase the value of available RID pools](ad-forest-recovery-raise-rid-pool.md)
- [Invalidate the current RID pool](ad-forest-recovery-invaildate-rid-pool.md)
- [Seize an operations master role](ad-forest-recovery-seizing-operations-master-role.md)
- [Clean up after a restore](ad-forest-recovery-cleanup.md)
- [Clean the metadata of removed writable domain controllers](ad-forest-recovery-cleaning-metadata-of-removed-dcs.md)
- [Reset the computer account password of the domain controller](ad-forest-recovery-reset-computer-account-dc.md)
- [Reset the krbtgt password](ad-forest-recovery-reset-the-krbtgt-password.md)
- [Reset a trust password on one side of the trust](ad-forest-recovery-reset-trust.md)
- [Add the global catalog](ad-forest-recovery-add-gc.md)
- [Resources to verify replication is working](ad-forest-recovery-verify-replication.md)

## Related content


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
