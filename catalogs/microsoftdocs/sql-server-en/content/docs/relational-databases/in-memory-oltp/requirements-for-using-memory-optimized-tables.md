---
title: Requirements for using memory-optimized tables
description: Learn about the requirements for using In-Memory OLTP, including SQL Database version, memory & storage considerations, and installation.
author: rwestMSFT
ms.author: randolphwest
ms.reviewer: randolphwest
ms.date: 10/05/2023
ms.service: sql
ms.subservice: in-memory-oltp
ms.topic: checklist
---
# Requirements for using memory-optimized tables


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

This article describes the requirements for adoption of In-Memory features in SQL Server.

## Requirements

In addition to the [SQL Server 2022: Hardware and software requirements](../../sql-server/install/hardware-and-software-requirements-for-installing-sql-server-2022.md), the following are requirements to use  In-Memory OLTP 
:

-  SQL Server 2016 (13.x) 
 SP 1 and later versions, any edition. For  SQL Server 2014 (12.x)
 and  SQL Server 2016 (13.x) 
 RTM (pre-SP1), you need Enterprise, Developer, or Evaluation edition.

-  In-Memory OLTP 
 requires the 64-bit version of  SQL Server 
.

-  SQL Server 
 needs enough memory to hold the data in memory-optimized tables and indexes, and extra memory to support the online workload. For more information, see [Estimate Memory Requirements for Memory-Optimized Tables](estimate-memory-requirements-for-memory-optimized-tables.md).

- When running  SQL Server 
 in a virtual machine (VM), ensure there's enough memory allocated to the VM to support the memory needed for memory-optimized tables and indexes. Depending on the VM host application, the configuration option to guarantee memory allocation for the VM could be called Memory Reservation or, when using Dynamic Memory, Minimum RAM. Make sure these settings are sufficient for the needs of the databases in  SQL Server 
.

- Free disk space that is two times the size of your durable memory-optimized tables.

- A processor needs to support the instruction `cmpxchg16b` to use  In-Memory OLTP 
. All modern 64-bit processors support `cmpxchg16b`.

  If you use a virtual machine and  SQL Server 
 displays an error caused by an older processor, see if the VM host application has a configuration option to allow `cmpxchg16b`. If not, you could use Hyper-V, which supports `cmpxchg16b` without needing to modify a configuration option.

-  In-Memory OLTP 
 is installed as part of **Database Engine Services**.

  To install report generation ([Determining if a Table or Stored Procedure Should Be Ported to In-Memory OLTP](determining-if-a-table-or-stored-procedure-should-be-ported-to-in-memory-oltp.md)), install the latest version of [SQL Server Management Studio (SSMS)](https://learn.microsoft.com/ssms/install/install) (to manage  In-Memory OLTP 
 via  SQL Server Management Studio 
 Object Explorer).

> **Note:**
> - For more information specific to in-memory data in Azure SQL Database, see [Optimize performance by using in-memory technologies in Azure SQL Database](https://learn.microsoft.com/azure/azure-sql/database/in-memory-oltp-overview?view=azuresql-db\&preserve-view=true) and [Blog:  In-Memory OLTP 
 in Azure SQL Database](https://azure.microsoft.com/blog/in-memory-oltp-in-azure-sql-database/).
> - For more information specific to in-memory data in Azure SQL Managed Instance, see [Optimize performance by using in-memory technologies in Azure SQL Managed Instance](https://learn.microsoft.com/azure/azure-sql/managed-instance/in-memory-oltp-overview?view=azuresql-mi\&preserve-view=true).

## Important notes on using  In-Memory OLTP 


- In  SQL Server 2016 (13.x) 
 and later versions, there is no limit on the size of memory-optimized tables, other than available memory.

- In  SQL Server 2014 (12.x)
, the total in-memory size of all durable tables in a database shouldn't exceed 250 GB. For more information, see [Estimate Memory Requirements for Memory-Optimized Tables](estimate-memory-requirements-for-memory-optimized-tables.md).

> **Note:**  
> Starting with  SQL Server 2016 (13.x) 
 SP 1, Standard and Express editions support  In-Memory OLTP 
, but they impose quotas on the amount of memory you can use for memory-optimized tables in a given database. In Standard edition this is 32 GB per database; in Express edition this is 352MB per database.

- If you create one or more databases with memory-optimized tables, you should enable Instant File Initialization (IFI) by granting the  SQL Server 
 service startup account the *SE_MANAGE_VOLUME_NAME* user right. Without IFI, memory-optimized storage files (data and delta files) are initialized on creation, which can have a negative effect on the performance of your workload. For more information about IFI, including how to enable it, see [Database instant file initialization](../databases/database-instant-file-initialization.md).

- **Known issue**: For databases with memory-optimized tables, performing a transactional log backup with no recovery, and later executing a transaction log restore with recovery, could result in an unresponsive database restore process. This issue can also affect log shipping functionality. To work around this problem, the  SQL Server 
 instance can be restarted before initiating the restore process.


## Related content

- [In-Memory OLTP overview and usage scenarios](overview-and-usage-scenarios.md)
- [Database instant file initialization](../databases/database-instant-file-initialization.md)
- [Memory management architecture guide](../memory-management-architecture-guide.md)
