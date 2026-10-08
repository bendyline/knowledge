---
title: SQL Server message results (Native Client OLE DB provider)
description: "SQL Server Native Client Message Results"
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
helpviewer_keywords:
  - "SQL Server Native Client OLE DB provider, errors"
  - "errors [OLE DB], SQL Server message results"
  - "OLE DB error handling, SQL Server message results"
---
# SQL Server Native Client Message Results

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





  The following  Transact-SQL  statements do not generate  SQL Server 
 Native Client OLE DB provider rowsets or a count of affected rows when executed:  
  
-   PRINT  
  
-   RAISERROR with a severity of 10 or lower  
  
-   DBCC  
  
-   SET SHOWPLAN  
  
-   SET STATISTICS  
  
 These statements either return one or more informational messages or cause  SQL Server 
 to return informational messages in place of rowset or count results. On successful execution, the  SQL Server 
 Native Client OLE DB provider returns S_OK, and the messages are available to the  SQL Server 
 Native Client OLE DB provider consumer.  
  
 The  SQL Server 
 Native Client OLE DB provider returns S_OK and has one or more informational messages available following the execution of many  Transact-SQL  statements or the consumer execution of a  SQL Server 
 Native Client OLE DB provider member function.  
  
 The  SQL Server 
 Native Client OLE DB provider consumer allowing dynamic specification of query text should check error interfaces after every member function execution regardless of the value of the return code, the presence or absence of a returned **IRowset** or **IMultipleResults** interface reference, or a count of affected rows.  
  
## Related content

- [SQL Server Native Client Errors](errors.md)
