---
title: AD Forest Recovery - Cleaning metadata of removed writable domain controllers  
description: Metadata cleanup removes Active Directory data that identifies a DC to the replication system. Note that outside of a Forest Recovery, metadata cleanup is part of the demotion process of domain controllers, however, when they aren't reachable anymore, this process also applies. Use the following procedure to delete the DC objects for DCs that you plan to add back to the network by reinstalling AD DS.
ms.author: roharwoo
author: robinharwood
ms.date: 06/21/2023
ms.topic: how-to
---

# Active Directory Forest Recovery -  Clean the metadata of removed writable domain controllers

> 

Metadata cleanup removes Active Directory data that identifies a DC to the
replication system.

Note that outside of a Forest Recovery, metadata cleanup is part of the
demotion process of domain controllers, however, when they aren't reachable
anymore, this process also applies.

Use the following procedure to delete the DC objects for DCs that you plan to
add back to the network by reinstalling AD DS.

## Delete a domain controller using Active Directory Users and Computers

When you use the version of Active Directory Users and Computers or Active
Directory Administrative Center in Remote Server Administration Tools (RSAT),
metadata cleanup is performed automatically when you delete the DC object. The
server object and the computer object are also deleted automatically.

As an alternative, you can also use Active Directory Sites and Services in RSAT
to delete a DC object. If you use Active Directory Sites and Services, you must
delete the associated server object and NTDS Settings object before you can
delete the DC object. Metadata cleanup can also be done through command line,
via NTDSUtil or using PowerShell with Active Directory Module.

For information about installing RSAT, see the article [Remote Server Administration Tools](https://learn.microsoft.com/windows-server/remote/remote-server-administration-tools).

**To delete a domain controller object using Active Directory Users and
Computers in RSAT**

1. Select **Start**, select **Administrative Tools**, and then select **Active
    Directory Users and Computers**.
1. In the console tree, double-click the domain container, and then
    double-click the **Domain Controllers** organizational unit (OU).
1. In the details pane, right-click the DC that you want to delete, and then
    select **Delete**.
    Delete
1. Select **Yes** to confirm the deletion. Select the **This Domain Controller
    is permanently offline and can no longer be demoted using the Active
    Directory Domain Services Installation Wizard (DCPROMO)** check box and
    select **Delete**.
1. If the DC was a global catalog server, select **Yes** confirm that the
    deletion.

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
