---
title: "Non-SQL Server Publishers"
description: "Non-SQL Server Publishers"
author: "MashaMSFT"
ms.author: "mathoma"
ms.date: 09/25/2024
ms.service: sql
ms.subservice: replication
ms.topic: concept-article
ms.custom:
  - updatefrequency5
helpviewer_keywords:
  - "heterogeneous database replication, non-SQL Server Publishers"
  - "non-SQL Server Publishers"
  - "heterogeneous data sources, non-SQL Server Publishers"
  - "Publishers [SQL Server replication], Oracle"
---
# Non-SQL Server Publishers  

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Publishing data from non-  SQL Server 
 sources allows you to consolidate data in  Microsoft 
  SQL Server 
.  SQL Server 
 can subscribe to snapshot or transactional data published from an Oracle database. For more information about publishing from Oracle, see [Oracle Publishing Overview](oracle-publishing-overview.md).  
  
 SQL Server 
 supports the following heterogeneous scenarios for transactional and snapshot replication:  
  
-   Publishing data from  SQL Server 
 to non- SQL Server 
 Subscribers.  

-   Publishing data to and from Oracle has the following restrictions:  

  | Replication | 2016 or earlier | 2017 or later |
  | :--- | :--- | :--- |
  | Replication from Oracle | Only support Oracle 10g or earlier | Only support Oracle 10g or earlier |
  | Replication to Oracle | Up to Oracle 12c | Not supported |


 Heterogeneous replication to non-SQL Server subscribers is deprecated. Oracle Publishing is deprecated. To move data, create solutions using change data capture and  SSIS 
.  
  
  
> **Caution:**  
>  This feature will be removed in a future version of  SQL Server 
. Avoid using this feature in new development work, and plan to modify applications that currently use this feature.   
  
 Publishing from non-  SQL Server 
 databases is ideal for the following scenarios:  
  
| Scenario | Description |
| --- | --- |
| Microsoft |
 | .NET Framework application deployments | Develop with  Microsoft |
 | Visual Studio and  SQL Server |
 | while operating on data replicated from a non- SQL Server |
 | database. |
| Data warehousing staging servers | Keep  SQL Server |
 | staging databases synchronized with a non- SQL Server |
 | database. |
| Migration to  SQL Server |
| Test your application in real time against  SQL Server |
 | while replicating the source system's changes. Switch to  SQL Server |
 | when satisfied with the migration. |
  
## Related content

- [Heterogeneous Database Replication](heterogeneous-database-replication.md)
