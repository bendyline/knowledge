---
title: AD Forest Recovery - Steps for Restoring the forest
description: This section provides an overview of the recommended path for recovering a forest. The forest recovery steps are described in detail later.
ms.author: roharwoo
author: robinharwood
ms.date: 06/21/2023
ms.topic: how-to
---

# Active Directory Forest Recovery - Steps to restore the forest

> 

This section provides an overview of the recommended path for recovering a forest. The forest recovery steps are described in detail later.

We recommend you run through a forest recovery on a regular basis to:

- Practice the recovery.
- Ensure the custom steps you defined for your environment are still working.
- If steps don't work, you notice and update the existing plan to adopt for a new kind of potential failure.
- Verify the defaults you have for selecting the DCs to restore in each of the domains is still a good choice.

The following list summarizes the recovery steps at a high level:

1. [Identify the problem](ad-forest-recovery-identify-the-problem.md)
    Work with IT and Microsoft Support to determine the scope of the problem and
    potential causes, and evaluate possible remedies with all business
    stakeholders. In many cases, total forest recovery should be the last option.
1. [Determine how to recover the forest](ad-forest-recovery-determine-how-to-recover.md)
    After you determine that forest recovery is necessary, complete preliminary
    steps to prepare for it.
1. [Perform initial recovery](ad-forest-recovery-perform-initial-recovery.md)
    In isolation, recover one DC for each domain, clean it, and reconnect the
    domains. Reset privileged accounts, and rectify problems caused by security
    breaches in this phase.
1. [Redeploy remaining DCs](ad-forest-recovery-restore-additional-dcs.md)
    Redeploy the forest to return it to its state before the failure. Adapt this step to your specific design and requirements. Virtualized domain controller cloning can help expedite this process.
1. [Cleanup](ad-forest-recovery-cleanup.md)
    After functionality has been restored, reconfigure name resolution as
    needed, and get LOB applications working.

The steps in this guide are designed to minimize the possibility of
reintroducing dangerous data into the recovered forest. You may have to modify
these steps to account for such factors as:

- Scalability
- Remote manageability
- Speed of recovery

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
