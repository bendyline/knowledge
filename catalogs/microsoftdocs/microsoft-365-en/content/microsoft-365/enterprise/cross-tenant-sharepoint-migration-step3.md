---
title: SharePoint Cross-tenant SharePoint migration Step 3
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
description: "Step 3 of the SharePoint Cross-tenant migration feature"
---

# Step 3: Verifying trust (SharePoint)

This article is Step 3 in a solution designed to complete a **Cross-tenant SharePoint migration.** To learn more, see [Cross-tenant SharePoint migration overview](cross-tenant-sharepoint-migration.md).

- Step 1: [Connect to the source and the target tenants](cross-tenant-sharepoint-migration-step1.md)
- Step 2: [Establish trust between the source and the target tenant](cross-tenant-sharepoint-migration-step2.md) 
- **Step 3: [Verify trust is established](cross-tenant-sharepoint-migration-step3.md)** 
- Step 4: [Precreate users and groups](cross-tenant-sharepoint-migration-step4.md)  
- Step 5: [Prepare identity mapping](cross-tenant-sharepoint-migration-step5.md)
- Step 6: [Start a Cross-tenant SharePoint migration](cross-tenant-sharepoint-migration-step6.md)
- Step 7: [Post migration steps](cross-tenant-sharepoint-migration-step7.md)

Before proceeding with your migration,  you need to verify the trust is complete. A status of *GoodToProceed* confirms that the trust is verified.

## To verify trust is established

1. On the **source tenant** run:
 
```powershell

Verify-SPOCrossTenantRelationship -Scenario MnA -PartnerRole Target -PartnerCrossTenantHostUrl <TARGETCrossTenantHostUrl>

```
2. On the **target tenant** run:

```powershell 

Verify-SPOCrossTenantRelationship -Scenario MnA -PartnerRole Source -PartnerCrossTenantHostUrl <SOURCECrossTenantHostUrl>
```

## Troubleshooting trust issues

When you verify the trust, the possible values are:

| Value | Description |
| :--- | :--- |
| NotEstablished | Trust wasn't requested locally. |
| NotEstablishedByPartner | Partner didn't request the Trust. |
| DormantByPartner | Partner’s requested trust is within the seven days waiting period after creation. |
| CouldNotContactPartner | Couldn't contact the partner to determine status. |
| GoodToProceed | Verified to proceed. |

## Step 4: [Precreate users and groups](cross-tenant-sharepoint-migration-step4.md)
