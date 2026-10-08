---
title: Commit or Submit a Changeset
description: Commit or Submit a Changeset (Master Data Services)
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: how-to
ms.custom:
  - build-2025
---
# Commit or Submit a Changeset (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  A changeset is a collection of the pending changes on the master data. If entity changes don't require administrator approval, you can commit the changeset. If the entity changes require administrator approval, you can submit the changeset for approval.  
  
## Prerequisites  
  
-   You must have permission to access the **Explorer** functional area. For more information, see [Functional Area Permissions (Master Data Services)](functional-area-permissions-master-data-services.md)  
  
-   If the entity changes don't require administrator approval, you can commit the changeset only if you own the changeset and the changeset status is open.  
  
-   If the entity changes require administrator approval, you can submit the changeset for approval only if you own the changeset and the changeset status is open or rejected.  
  
## To commit a local changeset  
 The commit option is only available for local changesets on entities where the Entity Administrator has not enabled the need for approval.  
  
1.  On the  Master Data Manager 
 home page, select the model and version and then click **Explorer**.  
  
2.  Click an entity on the **Entities** menu.  
  
3.  In the right pane, select **Changesets** and double-click the changeset you want to commit.  
  
4.  Click **Commit**.  
  
## To submit a changeset  
 The submit option is only available on changesets on entities where the Entity Administrator has enabled the need for approval.  
  
1.  On the  Master Data Manager 
 home page, select the model and version and then click **Explorer**.  
  
2.  Click an entity on the **Entities** menu.  
  
3.  In the right pane, select **Changesets** and double-click the changeset you want to submit.  
  
4.  Click **Submit**.  
  
## Related content

- [Create a Changeset (Master Data Services)](create-a-changeset-master-data-services.md)
- [Apply and Update a Changeset (Master Data Services)](apply-and-update-a-changeset-master-data-services.md)
- [Approve or Reject a Changeset (Master Data Services)](approve-or-reject-a-changeset-master-data-services.md)
