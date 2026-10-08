---
title: "Performance Event Category"
description: "Performance Event Category"
author: rwestMSFT
ms.author: randolphwest
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: supportability
ms.topic: reference
ms.custom:
  - ignite-2025
helpviewer_keywords:
  - "SQL Server event classes, Performance event category"
  - "Performance event category [SQL Server]"
  - "event classes [SQL Server], Performance event category"
monikerRange: "=azuresqldb-current || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---
# Performance Event Category

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)


  Use the **Performance** event category to monitor **Showplan** event classes and event classes that are produced from the execution of SQL data manipulation language (DML) operators.  
  
## In This Section  
  
| Topic | Description |
| --- | --- |
| [Auto Stats Event Class](auto-stats-event-class.md) | Indicates that an automatic updating of index and column statistics has occurred. |
| [Degree of Parallelism (7.0 Insert) Event Class](degree-of-parallelism-7-0-insert-event-class.md) | Indicates that  SQL Server |
 | has executed a SELECT, INSERT, UPDATE, or DELETE statement using either a serial or parallel plan. The number of CPUs used to perform the operation is also reported. |
| [Performance Statistics Event Class](performance-statistics-event-class.md) | Monitors performance of the queries that are being executed. |
| [Showplan All Event Class](showplan-all-event-class.md) | Identifies **Showplan** operators within a SQL statement. |
| [Showplan All for Query Compile Event Class](showplan-all-for-query-compile-event-class.md) | Displays compile time data for **Showplan** operators. |
| [Showplan Statistics Profile Event Class](showplan-statistics-profile-event-class.md) | Displays the estimated cost of a query. |
| [Showplan XML Event Class](showplan-xml-event-class.md) | Identifies the **Showplan** operators in a SQL statement. The event class stores each event as a well defined XML document. |
| [Showplan XML for Query Compile Event Class](showplan-xml-for-query-compile-event-class.md) | Displays compile time data for **Showplan** operators in XML format. |
| [Showplan XML Statistics Profile Event Class](showplan-xml-statistics-profile-event-class.md) | Identifies the **Showplan** operators associated with a SQL statement. The output is an XML document. |
| [SQL:FullTextQuery Event Class](sql-fulltextquery-event-class.md) | Indicates that  SQL Server |
 | has executed a full-text query. |
| [Plan Guide Successful Event Class](plan-guide-successful-event-class.md) | Indicates that  SQL Server |
 | successfully produced an execution plan for a query or batch that contained a plan guide. |
| [Plan Guide Unsuccessful Event Class](plan-guide-unsuccessful-event-class.md) | Indicates that  SQL Server |
 | could not produce an execution plan for a query or batch that contained a plan guide. |
  
## Related content

- [Extended Events overview](../extended-events/extended-events.md)
