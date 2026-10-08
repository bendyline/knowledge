---
title: "Table-Valued Parameters"
description: "Table-Valued Parameters (SQL Server Native Client)"
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
helpviewer_keywords:
  - "SQL Server Native Client, table-valued parameters"
  - "table-valued parameters (SQL Server Native Client)"
---
# Table-Valued Parameters (SQL Server Native Client)

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





> **Important:** 
> [SQL Server Native Client](../sql-server-native-client.md) (SNAC) isn't shipped with:

-  SQL Server 2022 (16.x) 
 and later versions
-  SQL Server Management Studio 
 19 and later versions

The SQL Server Native Client (SQLNCLI or SQLNCLI11) and the legacy Microsoft OLE DB Provider for SQL Server (SQLOLEDB) aren't recommended for new application development.

For new projects, use one of the following drivers:

- [Microsoft ODBC Driver for SQL Server](../../../connect/odbc/microsoft-odbc-driver-for-sql-server.md)
- [Microsoft OLE DB Driver for SQL Server](../../../connect/oledb/oledb-driver-for-sql-server.md)

For SQLNCLI that ships as a component of  SQL Server Database Engine 
 (versions 2012 through 2019), see this [Support Lifecycle exception](../applications/support-policies-for-sql-server-native-client.md#support-lifecycle-exception).


  Table-valued parameters were introduced in  SQL Server 2008 (10.0.x) 
, and provide an efficient way to pass multiple rows of data to the server. Table-valued parameters provide functionality similar to parameter arrays, but they offer more flexibility and closer integration with  Transact-SQL , and can frequently improve performance. Table-valued parameters can also participate in set-based operations, whereas parameter arrays cannot.  
  
 For information about table-valued parameters and ODBC, see [Table-Valued Parameters (ODBC)](../../native-client-odbc-table-valued-parameters/table-valued-parameters-odbc.md).  
  
 For information about table-valued parameters and OLE DB, see [Table-Valued Parameters (OLE DB)](../../native-client-ole-db-table-valued-parameters/table-valued-parameters-ole-db.md).  
  
## Related content

- [SQL Server Native Client Features](sql-server-native-client-features.md)
