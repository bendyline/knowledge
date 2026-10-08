---
title: "Heterogeneous Database Replication"
description: "Heterogeneous Database Replication"
author: "MashaMSFT"
ms.author: "mathoma"
ms.date: 09/25/2024
ms.service: sql
ms.subservice: replication
ms.topic: concept-article
ms.custom:
  - updatefrequency5
helpviewer_keywords:
  - "heterogeneous database replication, about heterogeneous database replication"
  - "replication [SQL Server], heterogeneous database replication"
  - "heterogeneous database replication"
---
# Heterogeneous Database Replication  

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

 SQL Server 
 supports the following heterogeneous scenarios for transactional and snapshot replication:  
  
-   Publishing data from  SQL Server 
 to non- SQL Server 
 Subscribers.  

-   Publishing data to and from Oracle has the following restrictions:  

  | Scenario | 2016 or earlier | 2017 or later |
  | --- | --- | --- |
  | Replication from Oracle | Only support Oracle 10g or earlier | Only support Oracle 10g or earlier |
  | Replication to Oracle | All versions prior to Oracle 12c | Not supported |


 Heterogeneous replication to non-SQL Server subscribers is deprecated. Oracle Publishing is deprecated. To move data, create solutions using change data capture and  SSIS 
.  
  
> **Caution:**  
>  This feature will be removed in a future version of  SQL Server 
. Avoid using this feature in new development work, and plan to modify applications that currently use this feature.   
  
## Publishing Data from Oracle  
 You can use  SQL Server 
 to publish data from Oracle with most of the same features and ease-of-use as  SQL Server 
 snapshot and transactional replication. This feature requires Oracle version 10G or earlier. Publishing data from Oracle is ideal for the following scenarios:  
  
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
  
 For more information, see [Oracle Publishing Overview](oracle-publishing-overview.md).  
  
## Publishing Data to Non-SQL Server Subscribers  
 The following non-  SQL Server 
 databases are supported as Subscribers to snapshot and transactional publications:  
  
-   Oracle for all platforms that Oracle supports.  
  
-   IBM Db2 for AS400, MVS, Unix, Linux, and Windows.  
  
 For more information, see [Non-SQL Server Subscribers](non-sql-server-subscribers.md).
