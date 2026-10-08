---
title: "Processing Stored Procedure Results"
description: Learn about the mechanisms SQL Server stored procedures use to return data to applications. Applications must be able to handle all these types.
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
helpviewer_keywords:
  - "ODBC, stored procedures"
  - "SQL Server Native Client ODBC driver, stored procedures"
  - "stored procedures [ODBC], results"
---
# Processing Stored Procedure Results

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





   SQL Server 
 stored procedures have four mechanisms used to return data:  
  
-   Each SELECT statement in the procedure generates a result set.  
  
-   The procedure can return data through output parameters.  
  
-   A cursor output parameter can pass back a  Transact-SQL  server cursor.  
  
-   The procedure can have an integer return code.  
  
 Applications must be able to handle all these outputs from stored procedures. The CALL or EXECUTE statement should include parameter markers for the return code and output parameters. Use [SQLBindParameter](../native-client-odbc-api/sqlbindparameter.md) to bind them all as output parameters and the  SQL Server 
 Native Client ODBC driver will transfer the output values to the bound variables. Output parameters and return codes are the last items returned to the client by  SQL Server 
; they are not returned to the application until [SQLMoreResults](../native-client-odbc-api/sqlmoreresults.md) returns SQL_NO_DATA.  
  
 ODBC does not support binding  Transact-SQL  cursor parameters. Because all output parameters must be bound before executing a procedure, any  Transact-SQL  stored procedure that contains an output cursor parameter cannot be called by ODBC applications.  
  
## Related content

- [Running Stored Procedures](running-stored-procedures.md)
