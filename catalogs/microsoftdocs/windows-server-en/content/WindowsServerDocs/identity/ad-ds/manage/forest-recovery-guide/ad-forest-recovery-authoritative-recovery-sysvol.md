---
title: AD Forest Recovery - Performing an authoritative synchronization of DFSR-replicated SYSVOL
description: There are different ways to perform an authoritative restore of SYSVOL. You can either edit the **msDFSR-Options** attribute or perform a system state restore using wbadmin –authsysvol. If you have the option to restore a system state backup (that is, you're restoring AD DS to the same hardware and operating system instance) then using wbadmin –authsysvol is simpler. But if you need to perform a bare metal restore, then you need to edit the **msDFSR-Options** attribute.
ms.author: roharwoo
author: robinharwood
ms.date: 06/21/2023
ms.topic: how-to
ms.custom: sfi-image-nochange
---

# Active Directory Forest Recovery - Perform an authoritative synchronization of DFSR-replicated SYSVOL

> 

There are different ways to perform an authoritative restore of SYSVOL. You can
either edit the **msDFSR-Options** attribute or perform a system state restore
using wbadmin –authsysvol. If you have the option to restore a system state
backup (that is, you're restoring AD DS to the same hardware and operating
system instance) then using wbadmin –authsysvol is simpler. But if you need to
perform a bare metal restore, then you need to edit the **msDFSR-Options**
attribute.

Use the following steps to perform an authoritative synchronization of SYSVOL
(if it's replicated using DFSR) by editing the **msDFSR-Options** attribute.
Note it can also be done using PowerShell.

**To perform an authoritative synchronization of DFSR-replicated SYSVOL using
Active Directory Users and Computers**

1. Open Active Directory Users and Computers.
1. Select **View**, and then select **Users, Contacts, Groups, and Computers as
    containers** and **Advanced Features**.
    Screenshot that shows the Advanced Features option and Users, Contacts, Groups, and Computers option selected.
1. In the tree-view, select **Domain Controllers**, the name of the DC you
    restored, **DFSR-LocalSettings**, and then **Domain System Volume**.
    Screenshot that highlights the Domain System Volume folder.
1. In the Details pane, right-click **SYSVOL Subscription**, select
    **Properties**, and select **Attribute Editor**.
    Screenshot that shows the Attribute Editor tab in the SYSVOL Subscriptions Properties dialog box.
1. Select **msDFSR-Options**, select **Edit**, type **1**, and select **OK**.
    <!-- can't find this image :::image type="content" source="media/ad4b6bd016052f8e5f7bd416.png" alt-text="SYSVOL."::: -->

1. Select **OK** to close the Attribute Editor.

## Verify if the authoritative restore is successful using PowerShell

1. After the previous operation, restart the DFSR service:  

    **Restart-Service DFSR -PassThru**
    Restart the DFSR service.

2. Verify the presence if Event ID 4602  

    **Get-WinEvent -LogName 'DFS Replication' \| Where-Object ID -EQ 4602 \|
    Format-Table -AutoSize -Wrap**
    Verify the present of Event ID

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
