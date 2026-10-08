---
title: "SQLTablePrivileges"
description: "SQLTablePrivileges"
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
helpviewer_keywords:
  - "SQLTablePrivileges function"
apitype: "DLLExport"
---
# SQLTablePrivileges

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





  **SQLTablePrivileges** can be executed on a static cursor. An attempt to execute **SQLTablePrivileges** on an updatable (keyset-driven or dynamic) returns SQL_SUCCESS_WITH_INFO indicating the cursor type has been changed.  
  
 The  SQL Server 
 Native Client ODBC driver supports reporting information for tables on linked servers by accepting a two-part name for the *CatalogName* parameter: *Linked_Server_Name.Catalog_Name*.  
  
## Related content

- [SQLTablePrivileges Function](https://go.microsoft.com/fwlink/?LinkId=59373\)
- [ODBC API implementation details](odbc-api-implementation-details.md)
