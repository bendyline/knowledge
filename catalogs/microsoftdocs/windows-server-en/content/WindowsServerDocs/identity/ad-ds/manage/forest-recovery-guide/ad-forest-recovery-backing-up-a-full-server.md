---
title: AD Forest Recovery - Backing up a full server 
description: A Bare Metal Recovery (BMR) backup is recommended to prepare for a forest recovery because it can be restored to different hardware or a different operating system instance. Using Windows Server Backup you can perform a Bare-Metal Recovery (BMR) backup of your server. 
ms.author: roharwoo
author: robinharwood
ms.date: 06/21/2023
ms.topic: how-to
---

# Active Directory Forest Recovery - Back up a full server

> 

A Bare Metal Recovery (BMR) backup is recommended to prepare for a forest recovery because it can be restored to different hardware or a different operating system instance. Using Windows Server Backup you can perform a Bare-Metal Recovery (BMR) backup of your server.

## Windows Server Backup

Windows Server Backup isn't installed by default. In Windows Server 2012 R2, Windows Server 2016 and newer, install it by following the steps below.

> **Note:**
> Please be aware that the steps may vary slightly between Windows Server 2012 R2 and Windows Server 2016+.

## Install Windows Server Backup

1. Open **Server Manager** and select **Add roles and features**.
1. On the **Add Roles and Features Wizard** select **Next**.
1. On the **Installation Type** screen, leave the default **Role-based or feature-based installation** and select **Next**.
1. On the **Server Selection** screen, select **Next**.
1. On the Server Roles screen, select **Next**.
1. On the **Features** screen, select **Windows Server Backup** and select **Next**
    Screenshot that highlights the selected Windows Server Backup option.
1. Select **Install**.
1. Once the installation is complete, select **Close**.

## Perform a backup with Windows Server Backup

1. Open **Server Manager**, select **Tools**, and then select **Windows Server Backup**.
    Screenshot that shows where to point to Administrative Tools and then select Windows Server Backup.
1. If you're prompted, in the **User Account Control** dialog box, provide Backup Operator credentials, and then select **OK**.
1. Select **Local Backup**.
1. On the **Action** menu, select **Backup once**.
1. In the Backup Once Wizard, on the **Backup options** page, select **Different options**, and then select **Next**.
    Screenshot that shows the Different Options option selected.
1. On the **Select backup configuration** page, select **Full server (recommended)**, and then select **Next**.  Or when you select “Custom”, make sure to select “Bare metal recovery” and the items is selected automatically:  
    Graphical user interface, text, application, email Description automatically generated
1. On the **Specify destination type** page, select **Local drives** or **Remote
    shared folder**, and then select **Next**.
1. On the **Select Backup Destination** page, choose the backup location. If you selected local drive choose a local drive or if you selected remote share choose a network share.
1. On the confirmation screen, select **Backup**.
    Screenshot that shows the Backup Progress screen.
1. Once this has completed select **Close**.
1. Close Windows Server Backup.

> **Note:**
> If you get an error stating that no backup storage location is available, you will need to either exclude one of the volumes that has been selected or add a new volume or remote share. If you get a warning stating that the selected volume is also included in the list of items to backup, determine whether or not to remove and click **OK**.

## Use `wbadmin.exe` to back up a Windows Server

`Wbadmin.exe` is a command-line utility that enables you to back up and restore your operating system, volumes, files, folders, and applications from a command prompt.

## Perform a full server backup using `wbadmin.exe`

- Open an elevated command prompt, type the following command and press ENTER:

    For bare-metal backup:

    `wbadmin start backup -allCritical -backuptarget:\<Drive_letter_to_store_backup\>:`

    For full server backup:

    `wbadmin start backup -backuptarget:\<Drive_letter_to_store_backup\>: -include:\<Drive_letter_to_include\>:`

    Install backup

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
