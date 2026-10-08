---
description: "Learn more about: AD Forest Recovery - Removing the global catalog"
title: AD Forest Recovery - Remove the global catalog
ms.author: roharwoo
author: robinharwood
ms.date: 05/12/2025
ms.topic: how-to
---

# Active Directory Forest Recovery - Remove the global catalog

 Use the following procedure to remove the global catalog from a DC.

 Restoring a global catalog server from backup could result in the global catalog holding newer data for one of its partial replicas than the corresponding domain that is authoritative for that partial replica. In such a case, the newer data won't be removed from the global catalog and might even replicate to other global catalog servers. As a result, even if you did restore a DC that was a global catalog server, either inadvertently or because that was the solitary backup you trusted, you should remove the global catalog soon after the restore operation is complete. When the global catalog is removed, the computer removes all its partial replicas.

## Remove the global catalog using Active Directory Sites and Services

1. Open Server Manager, select **Tools** and select **Active Directory Sites and Services**.
1. In the console tree, expand the **Sites** container, and then select the appropriate site that contains the target server.
1. Expand the **Servers** container, and then expand the *server* object for the DC from which you want to remove the global catalog.
1. Right-click **NTDS Settings**, and then select **Properties**.
1. Clear the **Global Catalog** check box.
   Remove GC
1. Select **Apply**.

## Remove the global catalog using Repadmin

Open an elevated command prompt, type the following command, and press ENTER:

   ```cli
   repadmin.exe /options DC_NAME –IS_GC
   ```

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
