---
title: "XTP (In-Memory OLTP) Performance Counters"
description: SQL Server provides objects and counters that can be used by Performance Monitor to monitor In-Memory OLTP activity.
author: rwestMSFT
ms.author: randolphwest
ms.date: 12/04/2023
ms.service: sql
ms.subservice: performance
ms.topic: reference
---
# SQL Server XTP (In-memory OLTP) Performance Counters
 
**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

   SQL Server 
 provides objects and counters that can be used by Performance Monitor to monitor In-Memory OLTP activity. The objects and counters are shared across all instances of a given version of  SQL Server 
 on the machine, starting in  SQL Server 2014 (12.x)
.  
  
 In the past the object and counter names began with *XTP*, as in **XTP Cursors**. Now starting with  SQL Server 2016 (13.x) 
, the names are like the following pattern:  
  
-   **SQL Server** *\<version>* **XTP Cursors**  
  
 For *\<version>* the value is the SQL Server XTP version year, for example, 2017.  
  
## <a id="SQLServerPOs"></a> SQL Server XTP Performance Objects
 The following table describes  SQL Server 
 performance objects.  
  
| Performance object | Description |
| --- | --- |
| [SQL Server XTP Cursors](sql-server-xtp-cursors.md) | The SQL Server XTP Cursors performance object contains counters related to internal In-Memory OLTP engine cursors. Cursors are the low-level building blocks the In-Memory OLTP engine uses to process  Transact-SQL  queries. As such, you do not typically have direct control over them. |
| [SQL Server XTP Databases](sql-server-xtp-databases.md) | The SQL Server XTP Databases performance object provides In-Memory OLTP database-specific counters. |
| [SQL Server XTP Garbage Collection](sql-server-xtp-garbage-collection.md) | The SQL Server XTP Garbage Collection performance object contains counters related to the In-Memory OLTP engine's garbage collector. |
| [SQL Server 2016 XTP IO Governor](sql-server-xtp-io-governor.md) | The SQL Server XTP IO Governor performance object contains counters related to the In-Memory OLTP IO Rate Governor. |
| [SQL Server XTP Phantom Processor](sql-server-xtp-phantom-processor.md) | The SQL Server XTP Phantom Processor performance object contains counters related to the In-Memory OLTP engine's phantom processing subsystem. This component is responsible for detecting phantom rows in transactions running at the SERIALIZABLE isolation level. |
| [SQL Server XTP Storage](sql-server-xtp-storage.md) | The SQL Server XTP Storage performance object contains counters related to In-Memory OLTP storage in  SQL Server |
| . |
| [SQL Server XTP Transaction Log](sql-server-xtp-transaction-log.md) | The SQL Server XTP Transaction Log performance object contains counters related to In-Memory OLTP transaction logging in  SQL Server |
| . |
| [SQL Server XTP Transactions](sql-server-xtp-transactions.md) | The SQL Server XTP Transactions performance object contains counters related to In-Memory OLTP engine transactions in  SQL Server |
| . |
  
## Related content

- [In-Memory OLTP overview and usage scenarios](../in-memory-oltp/overview-and-usage-scenarios.md)
