---
title: SharePoint Cross-tenant SharePoint migration Step 1
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
description: "Step 1 of the SharePoint Cross-tenant migration feature"
---
# Step 1: Connect to the source and target tenants (SharePoint)

This article is Step 1 in a solution designed to complete a **Cross-tenant SharePoint migration**. To learn more, see [Cross-tenant SharePoint migration overview](cross-tenant-sharepoint-migration.md).

- **Step 1: [Connect to the source and the target tenants](cross-tenant-sharepoint-migration-step1.md)**
- Step 2: [Establish trust between the source and the target tenant](cross-tenant-sharepoint-migration-step2.md) 
- Step 3: [Verify trust is established](cross-tenant-sharepoint-migration-step3.md) 
- Step 4: [Precreate users and groups](cross-tenant-sharepoint-migration-step4.md)  
- Step 5: [Prepare identity mapping](cross-tenant-sharepoint-migration-step5.md)
- Step 6: [Start a Cross-tenant SharePoint migration](cross-tenant-sharepoint-migration-step6.md)
- Step 7: [Post migration steps](cross-tenant-sharepoint-migration-step7.md)

## Before you begin

- **Microsoft SharePoint Powershell**. Confirm you have the most recent version installed. If not, [Download SharePoint Management Shell from Official Microsoft Download Center](https://www.microsoft.com/download/details.aspx?id=35588).
- Be a SharePoint admin or Microsoft 365 Global admin on both the source and target tenants.

> **Important:**
> Microsoft recommends that you use roles with the fewest permissions. This usage helps improve security for your organization. Global Administrator is a highly privileged role that should be limited to emergency scenarios when you can't use an existing role.

### Connect to both tenants

1. Sign in to the SharePoint Management Shell as a SharePoint admin or Microsoft 365 Global admin.
2. Run the following entering the **source** tenant URL: 

    ```powershell
    Connect-SPOService -url https://<TenantName>-admin.sharepoint.com
    ```

3. When prompted, sign in to the **source** tenant using your Admin username and password.
 
4. Run the following entering the **target** tenant URL: 

    ```powershell
    Connect-SPOService -url https://<TenantName>-admin.sharepoint.com
    ```

5. When prompted, sign in to the **target** tenant using your Admin username and password.

> **Important:**
> **Microsoft 365 Multi-Geo customers:** You must treat each geography as a separate tenant. Provide the correct geography-specific URLs throughout the migration process.

## Step 2: [Establish trust between the source and target tenants](cross-tenant-sharepoint-migration-step2.md)
