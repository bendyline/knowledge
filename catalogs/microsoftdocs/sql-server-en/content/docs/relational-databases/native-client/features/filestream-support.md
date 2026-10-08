---
title: "FILESTREAM Support"
description: "FILESTREAM Support"
author: markingmyname
ms.author: maghan
ms.date: "03/17/2017"
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
helpviewer_keywords:
  - "FILESTREAM [SQL Server], SQL Server Native Client"
  - "SQL Server Native Client [FILESTREAM support]"
---
# FILESTREAM Support

**Applies to:**
 

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


  FILESTREAM provides a way to store and access large binary values, either through  SQL Server 
 or by direct access to the Windows file system. A large binary value is a value larger than 2 gigabytes (GB). For more information about enhanced FILESTREAM support, see [FILESTREAM (SQL Server)](../../blob/filestream-sql-server.md).  
  
 When a database connection is opened, **\@\@TEXTSIZE** will be set to -1 ("unlimited"), by default.  
  
 It is also possible to access and update FILESTREAM columns using Windows file system APIs.  
  
 For more information, see the following topics:  
  
-   [FILESTREAM Support (OLE DB)](../ole-db/filestream-support-ole-db.md)  
  
-   [FILESTREAM Support (ODBC)](../odbc/filestream-support-odbc.md)  
  
-   [Access FILESTREAM Data with OpenSqlFilestream](../../blob/access-filestream-data-with-opensqlfilestream.md)  
  
## Querying for FILESTREAM Columns  
 Schema rowsets in OLE DB will not report whether a column is a FILESTREAM column. ITableDefinition in OLE DB cannot be used to create a FILESTREAM column.  
  
 Catalog functions such as SQLColumns in ODBC will not report whether a column is a FILESTREAM column.  
  
 To create FILESTREAM columns or to detect which existing columns are FILESTREAM columns, you can use the **is_filestream** column of the [sys.columns](../../system-catalog-views/sys-columns-transact-sql.md) catalog view.  
  
 The following is an example:  
  
```  
-- Create a table with a FILESTREAM column.  
CREATE TABLE Bob_01 (GuidCol1 uniqueidentifier ROWGUIDCOL NOT NULL UNIQUE DEFAULT NEWID(), IntCol2 int, varbinaryCol3 varbinary(max) FILESTREAM);  
  
-- Find FILESTREAM columns.  
SELECT name FROM sys.columns WHERE is_filestream=1;  
  
-- Determine whether a column is a FILESTREAM column.  
SELECT is_filestream FROM sys.columns WHERE name = 'varbinaryCol3' AND object_id IN (SELECT object_id FROM sys.tables WHERE name='Bob_01');  
```  
  
## Down-Level Compatibility  
 If your client was compiled using the version of  SQL Server 
 Native Client that was included with  SQL Server 2005 (9.x) 
, and the application connects to a newer version of  SQL Server 
, **varbinary(max)** behavior will be compatible with  SQL Server 2005 (9.x) 
. That is, the maximum size of returned data will be limited to 2 GB. For result values larger that 2 GB, truncation will occur and a "string data right truncation" warning will be returned.  
  
 When data-type compatibility is set to 80, client behavior will be consistent with down-level client behavior.  
  
 For clients that use SQLOLEDB or other providers that were released before the  SQL Server 2005 (9.x) 
 version of  SQL Server 
 Native Client, **varbinary(max)** will be mapped to image.  
  
## Related content

- [SQL Server Native Client Features](sql-server-native-client-features.md)
