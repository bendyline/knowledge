---
title: SQL Server message results (OLE DB driver)
description: Learn about Transact-SQL statements that don't generate OLE DB Driver for SQL Server rowsets or a count, and their expected return values.
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: vanto, randolphwest, davidengel, sunilbs, vbeiranvand
ms.date: "06/14/2018"
ms.service: sql
ms.subservice: connectivity
ms.topic: "reference"
ms.custom:
  - ignite-2025
helpviewer_keywords:
  - "OLE DB Driver for SQL Server, errors"
  - "errors [OLE DB], SQL Server message results"
  - "OLE DB error handling, SQL Server message results"
---
# SQL Server Message Results

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
](../../../sql-server/sql-docs-navigation-guide.md#applies-to)






The following  Transact-SQL  statements don't generate OLE DB Driver for SQL Server rowsets or a count of affected rows when executed:  
  
-   PRINT  
  
-   RAISERROR with a severity of 10 or lower  
  
-   DBCC  
  
-   SET SHOWPLAN  
  
-   SET STATISTICS  
  
 These statements either return one or more informational messages or cause  SQL Server 
 to return informational messages in place of rowset or count results. On successful execution, the OLE DB Driver for SQL Server returns S_OK, and the messages are available to the OLE DB Driver for SQL Server consumer.  
  
 The OLE DB Driver for SQL Server returns S_OK and has one or more informational messages available following the execution of many  Transact-SQL  statements or the consumer execution of an OLE DB Driver for SQL Server member function.  
  
The OLE DB Driver for SQL Server consumer is allowed dynamic specification of query text. The consumer should check error interfaces after _every_ member function execution. It should always perform these checks; whatever the value of the return code; whether or not an interface reference to an `IRowset` or `IMultipleResults` is returned; whatever the count of affected rows.
  
## Related content

- [Errors](errors.md)
