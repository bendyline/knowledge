---
title: "Remote Blob Store (RBS) with availability groups"
description: "A description of how to use the Remote Blob Store (RBS) with databases that are part of an Always On availability group. "
author: MashaMSFT
ms.author: mathoma
ms.date: "05/17/2016"
ms.service: sql
ms.subservice: availability-groups
ms.topic: concept-article
---
# Use Remote Blob Store (RBS) with Always On availability groups

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

   Always On availability groups 
 can provide a high-availability and disaster recovery solution for  SQL Server 
[Remote Blob Store (RBS)](../../../relational-databases/blob/remote-blob-store-rbs-sql-server.md) BLOB objects (blobs).  Always On availability groups 
 protects any RBS metadata and schemas stored in an availability database by replicating them to the secondary replicas. This is the SharePoint Content Database. Generally speaking,  SQL Server 
 stores this RBS metadata independently from the blob.  
  
 The protection for RBS BLOB data depends on the BLOB Store Location, as follows:  
  
| BLOB Store Location | Can Availability Groups Protect This BLOB Data? |
| --- | --- |
| The same database that contains the RBS metadata  (stored using a RBS remote FILESTREAM provider) | Yes |
| Another database in the same instance of  SQL Server |
 | (stored using a RBS remote FILESTREAM provider) | Yes<br /><br /> We recommend that you put this database in the same availability group as the database that contains the RBS metadata. |
| Another database in a different instance of  SQL Server |
 | (stored using a RBS remote FILESTREAM provider) | Yes<br /><br /> This database must be in a separate availability group. |
| A third-party BLOB store | No<br /><br /> To protect this BLOB data, use the high-availability mechanisms of the BLOB store provider. |
  
##  <a name="Limitations"></a> Limitations  
  
-   RBS maintainers need to be targeted on the primary replica.  
  
##  <a name="Recommendations"></a> Recommendations  
  
-   Use an availability group listener. For more information, see [Availability Group Listeners, Client Connectivity, and Application Failover (SQL Server)](listeners-client-connectivity-application-failover.md).  
  
## Related content

- [Maintaining Remote BLOB Store](https://msdn.microsoft.com/library/gg316773\(SQL.105\).aspx)
- [Running RBS Maintainer](https://learn.microsoft.com/archive/blogs/sqlrbs/running-rbs-maintainer)
- [Configure Remote BLOB Storage (RBS) with the FILESTREAM provider (SharePoint 2010)](https://learn.microsoft.com/archive/blogs/mvpawardprogram/configure-remote-blob-storage-rbs-with-the-filestream-provider-sharepoint-2010)
- [Driver and client connectivity support for availability groups](always-on-client-connectivity-sql-server.md)
- [Remote Blob Store (RBS) (SQL Server)](../../../relational-databases/blob/remote-blob-store-rbs-sql-server.md)
