---
description: "Learn more about: AD Forest Recovery - Cleanup"
title: AD Forest Recovery - Cleanup
ms.author: roharwoo
author: robinharwood
ms.date: 05/12/2025
ms.topic: how-to
ms.custom: 5a291f65-794e-4fc3-996e-094c5845a383, inhenkel
---

# Active Directory Forest Recovery - Cleanup

Perform the following post recovery steps as needed:

## Revert to the original DNS configuration

After the entire forest is recovered, you can revert to the original DNS configuration, including configuration of the preferred and alternate DNS servers on each of the DCs. After the DNS servers are configured as they were before the malfunction, their previous name resolution capabilities will be restored. Delete any DNS records for DCs that haven't been recovered.

## Delete Windows Internet Name Service (WINS) records

Delete Windows Internet Name Service (WINS) records for all DCs that haven't been recovered.

## Transfer operations master roles to other DCs

You can transfer the operations master roles to other DCs in the domain or forest and add more global catalog servers based on the configuration before the failure.

## Recreate missing objects

Because the entire forest is restored to a previous state, any objects (such as users and computers) that were added and all updates (such as password changes) that were made to existing objects after this point are lost. Therefore, you should recreate these missing objects and reapply the missing updates as appropriate.

## Restore outgoing domains and trusts
You might also need to restore outgoing trusts with external domains and forests, because these external trust relationships aren't restored automatically from backups.

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
