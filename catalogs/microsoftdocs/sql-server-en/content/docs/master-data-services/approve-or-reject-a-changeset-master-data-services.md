---
title: Approve or Reject a Changeset
description: Approve or Reject a Changeset (Master Data Services)
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: how-to
ms.custom:
  - build-2025
---
# Approve or Reject a Changeset (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  A changeset is a collection of the pending changes on the master data. If the entity changes require administrator approval and a changeset is submitted for approval, you can review and then approve or reject the changeset.  
  
## Prerequisites  
  
-   You must have permission to access the **Explorer** functional area. For more information, see [Functional Area Permissions (Master Data Services)](functional-area-permissions-master-data-services.md).  
  
-   You must have administrator permission for the entity.  
  
-   The entity changes must require administrator approval.  
  
-   If the changeset status is pending, you can review and then approve or reject the changeset.  
  
-   Users are not allowed to approve their own changes. If you are the entity administrator, you must assign a secondary administrator to approve your own changeset.  
  
## To approve or reject a changeset  
  
1.  On the  Master Data Manager 
 home page, select the model and version and then click **Explorer**.  
  
2.  Click an entity on the **Entities** menu.  
  
3.  In the right pane, select **Changesets** and double-click the changeset you want to approve or reject.  
  
4.  Click **Apply** to apply the changeset and review the pending changes.  
  
5.  Click **Reject** to reject the changeset and send it back to the owner.  
  
6.  Click **Approve** to approve the changeset. The changeset is committed automatically.  
  
## Related content

- [Create a Changeset (Master Data Services)](create-a-changeset-master-data-services.md)
- [Apply and Update a Changeset (Master Data Services)](apply-and-update-a-changeset-master-data-services.md)
- [Commit or Submit a Changeset (Master Data Services)](commit-or-submit-a-changeset-master-data-services.md)
