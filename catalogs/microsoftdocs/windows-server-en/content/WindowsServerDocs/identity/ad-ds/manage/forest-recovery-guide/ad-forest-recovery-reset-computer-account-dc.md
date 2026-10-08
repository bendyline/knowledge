---
description: "Learn more about: AD Forest Recovery - Resetting the computer account on the recovered DC"
title: AD Forest Recovery - Resetting the computer account on the recovered DC
ms.author: roharwoo
author: robinharwood
ms.date: 05/12/2025
ms.topic: how-to
---

# Active Directory Forest Recovery - Reset the computer account on the recovered DC

 Use the following procedure to reset the computer account password of the Domain Controller (DC).

## Reset the computer account password of the domain controller

1. Open PowerShell as an Administrator, type the following command, and then press ENTER:

   ```cli
   Reset-ComputerMachinePassword
   ```

2. Run the same command again to ensure other Domain Controllers from before the Forest Recovery can't replicate from it.

> **Warning:**
> This should only be carried out on the sole recovered DC during a forest recovery exercise.
> Using this command <i>will</i> break replication with other DCs.

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
