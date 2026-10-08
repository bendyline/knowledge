---
description: "Learn more about: AD Forest Recovery - Seizing an operations master role"
title: AD Forest Recovery - Seizing an Operations Master Role
ms.author: roharwoo
author: robinharwood
ms.date: 05/12/2025
ms.topic: how-to
ms.custom: 7e6bb370-f840-4416-b5e2-86b0ba715f4f, inhenkel
---

# Active Directory Forest Recovery - Seize an operations master role

Use the following procedure to seize an operations master role (also known as a flexible single master operations (FSMO) role). You can use Ntdsutil.exe, a command-line tool that is installed automatically on all DCs.

## Seize an operations master role

1. At the command prompt, type the following command, and then press ENTER:

   ```cli
   ntdsutil
   ```

1. At the **ntdsutil:** prompt, type the following command, and then press ENTER:

   ```cli
   roles
   ```

1. At the **FSMO maintenance:** prompt, type the following command, and then press ENTER:

   ```cli
   connections
   ```

1. At the **server connections:** prompt, type the following command, and then press ENTER:

   ```cli
   Connect to server ServerFQDN
   ```

   Where *ServerFQDN* is the fully qualified domain name (FQDN) of this DC, for example: **connect to server nycdc01.example.com**.

   If *ServerFQDN* does not succeed, use the NetBIOS name of the DC.

1. At the **server connections:** prompt, type the following command, and then press ENTER:

   ```cli
   quit
   ```

1. Depending on the role that you want to seize, at the **FSMO maintenance:** prompt, type the appropriate command as described in the following table, and then press ENTER.

| Role | Credentials | Command |
| --- | --- | --- |
| Domain naming master | Enterprise Admins | **Seize naming master** |
| Schema master | Schema Admins | **Seize schema master** |
| Infrastructure master **Note:**  After you seize the infrastructure master role, you may receive an error later if you need to run Adprep /Rodcprep. For more information, see KB article [949257](https://support.microsoft.com/kb/949257). | Domain Admins | **Seize infrastructure master** |
| PDC emulator master | Domain Admins | **Seize pdc** |
| RID master | Domain Admins | **Seize rid master** |

After you confirm the request, Active Directory or AD DS attempts to transfer the role. When the transfer fails, some error information appears, and Active Directory or AD DS proceeds with the seizure. After the seizure is complete, a list of the roles and the Lightweight Directory Access Protocol (LDAP) name of the server that currently holds each role appears. You can also run **Netdom Query FSMO** at an elevated command prompt to verify current role holders.

> **Note:**
> If this computer was not a RID master before the failure and you attempt to seize the RID master role, the computer tries to synchronize with a replication partner before accepting this role. However, because this step is performed when the computer is isolated, it will not succeed in synchronizing with a partner. Therefore, a dialog box appears asking you whether you want to continue with the operation despite this computer not being able to synchronize with a partner. Click **Yes**.

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
