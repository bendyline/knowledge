---
title: Member Revision History
description: Member Revision History (Master Data Services)
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: concept-article
ms.custom:
  - build-2025
---
# Member Revision History (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  A member revision history is recorded each time a member is changed, if the entity transaction log type is member.  
  
 For information on transaction log types, see [Change the Entity Transaction Log Type (Master Data Services)](change-the-entity-transaction-log-type-master-data-services.md).  
  
 Member revision histories are recorded when the following changes occur.  
  
-   Members are created, deleted, reactivated or purged.  
  
-   Attribute values are changed.  
  
-   Members are moved in a hierarchy or collection  
  
## View and Manage Revision History by Entity  
 In the Explorer functional area, you can view the revisions for all members in the entity. If you have update permissions, you can roll back the member to a previous revision.  
  
 **To view and manage revision history**  
  
1.  In  Master Data Manager 
, select the model and version and then click **Explorer**.  
  
2.  Select the entity from the **Entities** menu.  
  
3.  Click **View History** to view all the historical data of the entity.  
  
4.  Click **Filter** to filter the data.  
  
5.  Click the column header to sort the data.  
  
6.  If you have update permissions, click **Revert Member** to roll back to the selected version.  
  
## View and Manage Revision History by Member  
 In the Explorer functional area, you can view the revisions for a member if you have read permissions on the member. If you have update permissions, you can roll back the member to a previous revision or add annotations to the revision.  
  
1.  In  Master Data Manager 
, select the model and version and then click **Explorer**.  
  
2.  Select the entity from the **Entities** menu.  
  
3.  Select the member.  
  
4.  Click **View History** in the right pane.  
  
## Log Retention Setting  
 You can configure how long historical data is retained by setting the **Log retention in Days** property in system settings for the  Master Data Manager 
 database, and by setting **Log Retention Days** when you create or edit a model.  
  
## Related Task  
  
| Task Description | Topic |
| --- | --- |
| Rollback the member revision history | [Rollback Member Revision History (Master Data Services)](rollback-member-revision-history-master-data-services.md) |
  
## Related content

- [Create a Model (Master Data Services)](create-a-model-master-data-services.md)
- [System Settings (Master Data Services)](system-settings-master-data-services.md)
