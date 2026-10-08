---
title: "Subscriber Types"
description: "Subscriber Types"
author: "MashaMSFT"
ms.author: "mathoma"
ms.date: 09/25/2024
ms.service: sql
ms.subservice: replication
ms.topic: ui-reference
ms.custom:
  - updatefrequency5
f1_keywords:
  - "sql13.rep.newpubwizard.subscribertypes.f1"
monikerRange: "=azuresqldb-current || >=sql-server-2017"
---
# Subscriber Types

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)



  Merge replication allows you to specify the types of Subscribers that a publication must support. Selecting Subscriber types sets the *publication compatibility level*, which determines which features can be used by a publication.  
  
 After a publication snapshot is created, the publication compatibility level can be increased (made more restrictive) on the **General** page of the **Publication Properties** dialog box; the compatibility level cannot be decreased.  

  > **Note:** 
  > Azure SQL Managed Instance can be a publisher, distributor, and subscriber for snapshot and transactional replication. Databases in Azure SQL Database can only be push subscribers for snapshot and transactional replication. For more information, see Transactional replication with [Azure SQL Database](https://learn.microsoft.com/azure/azure-sql/database/replication-to-sql-database) and [Azure SQL Managed Instance](https://learn.microsoft.com/azure/azure-sql/managed-instance/replication-transactional-overview).

  
## Options  
 Select each Subscriber type that this publication must support.  
  
  SQL Server 
  
 The publication can use all features.  
  
  SQL Server Compact 
  
 The publication requires snapshot files to be in character format (this is handled automatically by the Snapshot Agent).  SQL Server Compact 
 also has a number of restrictions not related to compatibility level.  
  
 If this option is selected, the Web synchronization option is enabled for the publication. For more information about Web synchronization, see [Web Synchronization for Merge Replication](web-synchronization-for-merge-replication.md).  
  
## Related content

- [Publish Data and Database Objects](publish/publish-data-and-database-objects.md)
- [Create a publication](publish/create-a-publication.md)
- [View and Modify Distributor and Publisher Properties](view-and-modify-distributor-and-publisher-properties.md)
