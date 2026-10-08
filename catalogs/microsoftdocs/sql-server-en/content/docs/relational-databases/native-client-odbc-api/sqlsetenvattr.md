---
title: "SQLSetEnvAttr"
description: "SQLSetEnvAttr"
author: markingmyname
ms.author: maghan
ms.date: "03/16/2017"
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
helpviewer_keywords:
  - "SQLSetEnvAttr function"
apitype: "DLLExport"
---
# SQLSetEnvAttr

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





  The [ODBC Programmer's Reference](../../odbc/reference/odbc-programmer-s-reference.md) defines how ODBC drivers should interpret the **SQLSetEnvAttr** attribute specifications from applications written to either the ODBC 2.*x* or ODBC 3.*x* API. The  SQL Server 
 Native Client ODBC driver complies with those rules.  
  
 One of the attributes controlled by **SQLSetEnvAttr** is whether connection pooling is to be used. If connection pooling is used with the  SQL Server 
 Native Client ODBC driver, the *DriverCompletion* parameter must be set to SQL_DRIVER_NOPROMPT when connecting with either [SQLDriverConnect](sqldriverconnect.md) or **SQLConnect**.  
  
## Related content

- [SQLSetEnvAttr Function](../../odbc/reference/syntax/sqlsetenvattr-function.md)
- [ODBC API implementation details](odbc-api-implementation-details.md)
