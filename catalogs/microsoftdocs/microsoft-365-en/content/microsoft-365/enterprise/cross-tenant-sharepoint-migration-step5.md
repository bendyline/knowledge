---
title: SharePoint Cross-tenant SharePoint migration Step 5
ms.author: heidip
author: MicrosoftHeidi
manager: dansimp
ms.date: 10/01/2025
recommendations: true
audience: ITPro
ms.topic: how-to
ms.service: microsoft-365-migration
ms.localizationpriority: high
ms.collection:
- SPMigration
- M365-collaboration
- m365initiative-migratetom365
search.appverid: MET150
description: "Step 5 of the SharePoint Cross-tenant migration feature"
---
# Step 5: SharePoint Identity mapping

This article is Step 5 in a solution designed to complete a Cross-tenant SharePoint migration. To learn more, see [Cross-tenant SharePoint migration overview](cross-tenant-sharepoint-migration.md).

- Step 1: [Connect to the source and the target tenants](cross-tenant-sharepoint-migration-step1.md)
- Step 2: [Establish trust between the source and the target tenant](cross-tenant-sharepoint-migration-step2.md)
- Step 3: [Verify trust is established](cross-tenant-sharepoint-migration-step3.md)
- Step 4: [Precreate users and groups](cross-tenant-sharepoint-migration-step4.md)
- **Step 5: [Prepare identity mapping](cross-tenant-sharepoint-migration-step5.md)**
- Step 6: [Start a Cross-tenant SharePoint migration](cross-tenant-sharepoint-migration-step6.md)
- Step 7: [Post migration steps](cross-tenant-sharepoint-migration-step7.md)\n

## Create the identity mapping file

In this step of the cross-tenant migration process, you're going to create a single CSV (comma separated values) file that contains the mapping of the users and groups on the source tenant to their corresponding users and groups on the target tenant.

We recommend you take the time to verify your mappings, ensuring they're accurate before starting any migrations to the target tenant.

There's a one-to-one relationship in the identity mapping file. You can't map the same user to multiple users in the target tenant. For example, if you have instances where the admin is the owner of multiple SharePoint accounts, the ownership must be changed to match the corresponding user you wish to migrate from Source to Target. If you don't, those account files don't migrate.

**Example:** In this example, the admin owns multiple SharePoint accounts.

| Source Tenant Owner | Target Tenant User |
| --- | --- |
| `admin@source.com` | `new.userA@target.com` |
| `admin@source.com` | `new.userB@target.com` |
| `admin@source.com` | `new.userC@target.com` |

Cross-tenant migration supports this scenario:

**Example**:

| Source Tenant Owner | Target Tenant User |
| --- | --- |
| `userA@source.com` | `new.userA@target.com` |
| `userB@source.com` | `new.userB@target.com` |
| `userC@source.com` | `new.userC@target.com` |

### Create the CSV file

There are six columns needed in your CSV file. The first three are your source values, each providing detail about where your data is currently located. The remaining three columns are the corresponding info on the target tenant. All six columns must be accounted for in the file. Create your file in Excel and save it as a .csv file.

Users and groups are included in the same file. Depending on whether it's a user or group, what you enter in the column is different. In each of the columns enter values as shown in the examples. **Do NOT include column headings.**

| Column | User | Group | Microsoft 365 Group |
| --- | --- | --- | --- |
| 1 | User | Group | Group |
| 2 | SourceTenantCompanyID | SourceTenantCompanyID | SourceTenantCompanyID |
| 3 | SourceUserUpn | SourceGroupObjectID | SourceGroupObjectID |
| 4 | TargetUserUpn | TargetGroupObjectID | TargetGroupObjectID |
| 5 | TargetUserEmail | GroupName | M365GroupAlias |
| 6 | UserType | GroupType | GroupType |

> **Important:**
> When you create your Identity Mapping for Group Connected sites, the Target site URL **must** align with the alias of the new Group created on the Target tenant.
>
> **Example:**
>
> - Source site: `https://contoso.sharepoint.com/teams/O365SourceGroup`
> - New Target Group Alias = O365TargetGroup
>
> In your Identity Mapping file, the Target site needs to be: `https://fabrikam.sharepoint.com/teams/O365TargetGroup`.
>
> If the Target Alias and Target URL don't align, the migration fails.
>
> **Do NOT include column headings in your CSV file.** In the examples below we include them for illustrative purposes only.

**Users**. Enter your values as shown in this example for Users:

An image of a format to use for mapping users.

An example of a CSV file for users.

**Guest users**. You can map guest accounts in the source tenant to member accounts in the target tenant. You can map a source guest account to a target guest account if the guest already exists. Enter your values as shown in this example for guests:

An image of a CSV example when mapping a guest to a member.

An image of a CSV example when mapping a guest to a guest.

**Groups**. Enter your values as shown in this example for groups:
</br>
An image showing the format for the CSV file for groups.
</br>

*Example*:

An example of adding groups to the CSV file.

**Microsoft 365 Groups**. Enter your values as shown in this example for Microsoft 365 groups:

An image of the format for the CSV file for Microsoft 365 groups.

**Multiple users and groups in a CSV file:** </br>

*Example:*

A screenshot of an example of both users and groups in mapping file.

#### Obtain the source tenant company ID

To obtain Source Tenant Company ID:

1. Sign in as Admin to your [Azure portal](https://ms.portal.azure.com/).
2. Select or Search for **Microsoft Entra ID**.
3. Scroll down on the left-hand panel and select **Properties**.
4. Locate the **Tenant ID Field**. The required Tenant ID is in that box.

An image showing how you get the source tenant ID.

#### To obtain source group object ID:

1. Sign in to source tenant as Admin to [Azure Groups](https://ms.portal.azure.com).
2. Search for your required groups.
3. Select the required group instance and then **Copy to clipboard**. Paste this value in the sourceGroupObjectId column of your mapping CSV file.
4. If you have multiple groups to map, then repeat these steps for each group.

    An image showing how you get the source group object ID.

#### To obtain target group object ID:

1. Sign in to Target tenant as Admin to [Azure Groups](https://ms.portal.azure.com)
2. Search for your required groups.
3. Select the required group instance and then **Copy to clipboard**. Paste this value in the targetGroupObjectId column of your mapping CSV file.
4. If you have multiple groups to map, then repeat this process to obtain those specific targetGroupObjectId's.
5. For the GroupName, use the same ID as the *TargetGroupObjectId* you obtained.

    how to get the target object ID

## Upload the identity map

Once the identity mapping file is prepared, the SharePoint Administrator on the target tenant uploads the file to SharePoint. This file allows identity mapping to occur automatically as part of the cross-tenant migration.

> **Important:**
> Before you run the *Add-SPOTenantIdentityMap -IdentityMapPath* command, save and close the identitymap.csv file on your Desktop/SharePoint/SharePoint.
>
>If the file remains open, you receive the following error.
> *Add-SPOTenantIdentityMap: The process cannot access the file 'C:\Users\myuser\Test-Identity-Map.csv' because it is being used by another process.*

1. To upload the identity Map on the target tenant, run the following command. For *-IdentityMapPath*, provide the full path and filename of the identity mapping CSV file.

   ```powershell
   Add-SPOTenantIdentityMap -IdentityMapPath <identitymap.csv>
   ```

> **Important:**
> If you make or need to make any changes to your Identity Map during the lifecycle of the migration you must run the `Add-SPOTenantIdentityMap -IdentityMapPath <identitymap.csv>` command **every time** a change is made to ensure those changes are applied to the migration.

Uploading any new identity map overwrites the current one. Make sure that any revision or addition includes ALL users and groups for the full migration. Your identity map should always include everyone you're wanting to migrate.

To look at the mapping entries in the identity mapping file for a particular user: Use the command Get-SPOTenantIdentityMappingUser to view mapping entries. Set Field to SourceUserKey and Value to the user’s UPN.

**Example:**

```powershell
Get-SPOTenantIdentityMappingUser -Field SourceUserKey -Value usera@Contoso.onmicrosoft.com
```

## Verify cross-tenant compatibility status

Before starting any cross-tenant migrations, make sure that both SharePoint database schemas are up to date and compatible between source and target.

To perform this check, run this cmdlet on your Source tenant.

```powershell
Get-SPOCrossTenantCompatibilityStatus -PartnerCrossTenantHostURL [Target tenant hostname]

Get-SPOCrossTenantCompatibilityStatus -PartnerCrossTenantHostURL https://m365x12395529-my.sharepoint.com
```

- If the tenant status shows as **Compatible** or **Warning**, you can then proceed with the next step of starting cross-tenant migrations.
- If the tenant status shows as **Incompatible**, your tenants need to be patched/updated to ensure compatibility.

    | Status | Can proceed with migration |
    | --- | --- |
    | Compatible | Yes |
    | Warning | Yes |
    | Incompatible | No |

    > **Important:**
    > We recommend waiting a period of **48 hours**. If your tenants are still reporting as *incompatible*, contact support.
    >
    > We recommend performing the compatibility status check on a frequent basis before starting ANY instances of cross tenant migrations. If the tenants are incompatible, this incompatibility can result in cross-tenant migrations failing.


## Step 6: [Start a SharePoint cross-tenant migration](cross-tenant-sharepoint-migration-step6.md)
