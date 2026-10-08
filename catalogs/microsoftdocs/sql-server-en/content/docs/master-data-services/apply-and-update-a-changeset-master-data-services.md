---
title: Apply and Update a Changeset
description: Apply and Update a Changeset (Master Data Services)
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: how-to
ms.custom:
  - build-2025
---
# Apply and Update a Changeset (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  A changeset is a collection of the pending changes on the master data. You can apply the changeset locally to view, add, update and delete the pending changes in the changeset.  
  
## Prerequisites  
  
-   You must have permission to access the **Explorer** functional area. For more information, see [Functional Area Permissions (Master Data Services)](functional-area-permissions-master-data-services.md).  
  
-   You must have at least update access to the entity or one of its attributes.  
  
-   You can view only the changeset you own or the changeset submitted for approval when you are the entity administrator.  
  
-   You can modify only the changeset you own and when the changeset status is open or rejected.  
  
## To apply and update a changeset  
  
1.  On the  Master Data Manager 
 home page, select a model and version and then click **Explorer**.  
  
2.  Click an entity on the **Entities** menu.  
  
3.  In the right pane, select **Changesets** and double-click the changeset you want to view and change.  
  
4.  Click **Apply**.  
  
     The pending changes are applied to the entity member in the grid. The pending changes are highlighted.  
  
     Creating, deleting and updating members result in the changes in the changeset.  
  
5.  To revert pending changes, in the **Changesets** pane, right-click in the  grid and then click **Revert**.  
  
## Related content

- [Create a Changeset (Master Data Services)](create-a-changeset-master-data-services.md)
- [Approve or Reject a Changeset (Master Data Services)](approve-or-reject-a-changeset-master-data-services.md)
- [Commit or Submit a Changeset (Master Data Services)](commit-or-submit-a-changeset-master-data-services.md)
