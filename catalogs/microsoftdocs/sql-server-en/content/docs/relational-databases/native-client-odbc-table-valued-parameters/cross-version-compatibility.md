---
title: "Cross-Version Compatibility"
description: "Cross-Version Compatibility"
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
helpviewer_keywords:
  - "table-valued parameters (ODBC), cross-version compatibility"
---
# Cross-Version Compatibility

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





  Cross-version conflicts can occur when client or server instances of  SQL Server 
 earlier than  SQL Server 2008 (10.0.x) 
 are expected to process table-valued parameters.  
  
 In general, table-valued parameter functionality is only available to  SQL Server 2008 (10.0.x) 
 clients (using SQL Server Native Client 10.0) or later that are connected to  SQL Server 2008 (10.0.x) 
 (or later) servers. New columns in catalog function result sets will only be present when connected to a  SQL Server 2008 (10.0.x) 
 (or later) server.  
  
 If a client application compiled with an earlier version of  SQL Server 
 Native Client executes statements that expect table-valued parameters, the server detects this condition through a data conversion error, and ODBC returns this as a SQLSTATE 07006 and the message "Restricted data type attribute violation".  
  
 If a client application that was compiled with  SQL Server 
 Native Client 10.0 or later tries to use table-valued parameters when connected to a server instance earlier than  SQL Server 2008 (10.0.x) 
,  SQL Server 
 Native Client will detect this, and SQLBindCol, SQLBindParameter, SQLSetDescFields, and SQLSetDescRec calls will fail with SQLSTATE 07006 and the message "Restricted data type attribute violation (the version of SQL Server for this connection does not support table-valued parameters)".  
  
## Related content

- [Table-Valued Parameters (ODBC)](table-valued-parameters-odbc.md)
