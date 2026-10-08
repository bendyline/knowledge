---
title: "High Availability Support"
description: "High Availability Support"
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: concept-article
---
# High Availability Support


> **Important:**
> Change Data Capture for Oracle by Attunity is deprecated now. For details, refer to [the announcement](https://www.microsoft.com/sql-server/blog/2024/02/28/sql-server-integration-services-ssis-change-data-capture-attunity-feature-deprecations/).

  The CDC Service for Oracle is designed for high availability. The following features provide part of the high availability support:  
  
-   The CDC Service for Oracle does not use any file resource (local or otherwise). Its entire state is stored in the target  SQL Server 
 instance. This makes it easy to start the service on a different computer that uses the same  SQL Server 
 instance if the computer the service runs on fails. To reduce recovery time, long or long-running Oracle transactions are kept in a staging table in the target  SQL Server 
, preventing the need to re-scan many Oracle transaction logs following a failure (or service restart).  
  
-   The CDC Service for Oracle can use clustered  SQL Server 
 instances so it can recover after the  SQL Server 
 instance fails over to another cluster node. The Oracle CDC Service Computer Administrator only needs to specify the connection information to the clustered  SQL Server 
 instance when creating an Oracle CDC Service.  
  
-   The CDC Service for Oracle can use the  SQL Server 
**Always On** database mirroring feature. This support requires that the MSXDBCDC and all the CDC databases are in the same availability group. It also requires the Oracle CDC Service Computer Administrator to specify the appropriate **Always On** connection information to the  SQL Server 
 availability group (for example, the connection properties `Failover_Partner and Network=dbmssocn`). This allows the CDC service to automatically resume processing on a secondary replication of the databases following a failover.  
  
-   The CDC Service for Oracle can be configured as a generic service resource on a Windows Server failover cluster (along with, or separate from  SQL Server 
), making it simple to fail over and fall back CDC processing with the cluster. To configure the CDC Service for Oracle as a resource in a failover cluster, the system administrator must set the CDC Service for Oracle as a Generic Service Resource on each node on the failover cluster.  
  
-   The CDC Service for Oracle supports Oracle RAC, which allows it to communicate with the Oracle database and process logs even when one of the Oracle RAC nodes is down.
