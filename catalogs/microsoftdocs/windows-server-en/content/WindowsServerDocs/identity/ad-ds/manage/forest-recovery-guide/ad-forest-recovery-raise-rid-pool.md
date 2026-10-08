---
description: "Learn more about: AD Forest Recovery - Raising the value of available RID pools"
title: AD Forest Recovery - Raising RID pools
ms.author: roharwoo
author: robinharwood
ms.date: 05/12/2025
ms.topic: how-to
ms.custom:
  - c37bc129-a5e0-4219-9ba7-b4cf3a9fc9a4
  - inhenkel
  - sfi-image-nochange
---

# Active Directory Forest Recovery - Raise the value of available RID pools

Use the following procedure to raise the value of the relative ID (RID) pools that the RID operations master will allocate after that DC is restored. By raising the value of the available RID pools, you can ensure that no DC allocates a RID for a security principal that was created after the backup that was used to restore the domain.

## Active Directory RID Pools and rIDAvailablePool

Each domain has an object **CN=RID Manager$,CN=System,DC**=<*domain_name*>. This object has an attribute named **rIDAvailablePool**. This attribute value maintains the global RID space for an entire domain. The value is a large integer with upper and lower parts. The upper part defines the number of security principals that can be allocated for each domain (0x3FFFFFFF or just over 1 billion). The lower part is the number of RIDs that have been allocated in the domain.

> **Note:**
> In Windows Server 2016 and 2012, the number of security principals that can be allocated is increased to just over 2 billion. For more information, see [Managing RID issuance](../Managing-RID-Issuance.md).

- Sample Value: 4611686014132422708
- Low Part: 2100 (beginning of the next RID pool to be allocated)
- Upper Part: 1073741823 (total number of RIDs that can be created in a domain)

When you increase the value of the large integer, you increase the value of the low part. For example, if you add 100,000 to the sample value of 4611686014132422708 for a sum of 4611686014132522708, the new low part is 102100. This indicates that the next RID pool that will be allocated by the RID master will begin with 102100 instead of 2100.

### Raise the value of available RID pools using adsiedit and the calculator

1. Open Server Manager, select **Tools** and select **ADSI Edit**.
1. Right-click, select **Connect to** and connect do the Default Naming Context and select **OK**.
    Screenshot that shows how to connect to the Default Naming Context
1. Browse to the following distinguished name path: **CN=RID Manager$,CN=System,DC=\<domain name>**.
    Screenshot that shows how to browse to the distinguished name path.
1. Right-click and select the properties of **CN=RID Manager$**.
1. Select the attribute **rIDAvailablePool**, select **Edit**, and then copy the large integer value to the clipboard.
    Screenshot that shows the selected rIDAvailablePool attribute.
1. Start calculator, and from the **View** menu, select **Scientific Mode**.
1. Add 100,000 to the current value.
    Screenshot that shows where to add 100,000 to the current value.
1. Using ctrl-c, or the **Copy** command from the **Edit** menu, copy the value to the clipboard.
1. In the edit dialog of adsiedit, paste this new value.
    ADSI Edit
1. Select **OK** in the dialog, and **Apply** in the property sheet to update the **rIDAvailablePool** attribute.

### Raise the value of available RID pools using LDP

1. At the command prompt, type the following command, and then press ENTER:
   **ldp**
1. Select **Connection**, select **Connect**, type the name of RID manager, and then select **OK**.
   Screenshot that shows where to type the name of the RID manager.
1. Select **Connection**, select **Bind**, select **Bind with credentials** and type your administrative credentials, and then select **OK**.
   Screenshot that shows the Bind with credentials option.
1. Select **View**, select **Tree** and then type the following distinguished name path:  CN=RID Manager$,CN=System,DC=*domain name*
   Screenshot that shows where you type the distinguished name path.
1. Select **Browse**, and then select **Modify**.
1. Add 100,000 to the current **rIDAvailablePool** value, and then type the sum into **Values**.
1. In **Dn**, type `cn=RID Manager$,cn=System,dc=`*<domain name\>*.
1. In **Edit Entry Attribute**, type `rIDAvailablePool`.
1. Select **Replace** as the operation, and then select **Enter**.
   Screenshot that shows the Replace option.
1. Select **Run** to run the operation. Select **Close**.
1. To validate the change, select **View**, select **Tree**, and then type the following distinguished name path:   CN=RID Manager$,CN=System,DC=*domain name*.   Check the **rIDAvailablePool** attribute.
   LDP

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
