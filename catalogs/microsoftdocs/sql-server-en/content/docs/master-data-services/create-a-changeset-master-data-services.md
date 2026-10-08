---
title: Create a Changeset
description: Create a Changeset (Master Data Services)
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: how-to
ms.custom:
  - build-2025
---
# Create a Changeset (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  A changeset is a collection of the pending changes on the master data. If the entity requires approval for changes, the pending changes must be saved in a changeset and then submitted for administrator approval.  
  
## Prerequisites  
  
-   You must have permission to access the Explorer functional area. For more information, see [Functional Area Permissions (Master Data Services)](functional-area-permissions-master-data-services.md)  
  
-   You must have at least read access to the entity or one of its attributes.  
  
## To create a local changeset  
  
1.  On the  Master Data Manager 
 home page, select  the model and version and then click **Explorer**.  
  
2.  Click an entity on the **Entities** menu.  
  
3.  In the right pane, select **Changesets** and click **Create**.  
  
4.  Enter a name for the changeset, and click **Save**.  
  
     The name of the changeset must be unique within a model.  
  
## To create a changeset for approval  
  
1.  On the  Master Data Manager 
 home page, select  the model and version and then click **Explorer**.  
  
2.  Click an entity on the **Entities** menu.  
  
3.  Make changes to the entity and click **OK**.  
  
4.  **Choose A changeset** dialog box is displayed.  
  
5.  Click **New**, enter a name for the changeset, and click **Save**. The changeset name must be unique within a model.  
  
6.  To use  an existing changeset, click **Existing** and choose the changeset from the list. Only changesets that are in an open or rejected state are available.  
  
## Related content

- [Commit or Submit a Changeset (Master Data Services)](commit-or-submit-a-changeset-master-data-services.md)
- [Approve or Reject a Changeset (Master Data Services)](approve-or-reject-a-changeset-master-data-services.md)
- [Apply and Update a Changeset (Master Data Services)](apply-and-update-a-changeset-master-data-services.md)
