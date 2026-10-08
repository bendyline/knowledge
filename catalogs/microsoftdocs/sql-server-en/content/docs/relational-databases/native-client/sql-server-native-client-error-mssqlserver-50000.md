---
title: "MSSQLSERVER_50000"
description: "SQL Server Native Client Error MSSQLSERVER_50000"
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
helpviewer_keywords:
  - "50000 [SQL Server Native Client setup error]"
---
# SQL Server Native Client Error MSSQLSERVER_50000

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





> **Important:**
> [SQL Server Native Client](sql-server-native-client.md) (SNAC) isn't shipped with:

-  SQL Server 2022 (16.x) 
 and later versions
-  SQL Server Management Studio 
 19 and later versions

The SQL Server Native Client (SQLNCLI or SQLNCLI11) and the legacy Microsoft OLE DB Provider for SQL Server (SQLOLEDB) aren't recommended for new application development.

For new projects, use one of the following drivers:

- [Microsoft ODBC Driver for SQL Server](../../connect/odbc/microsoft-odbc-driver-for-sql-server.md)
- [Microsoft OLE DB Driver for SQL Server](../../connect/oledb/oledb-driver-for-sql-server.md)

For SQLNCLI that ships as a component of  SQL Server Database Engine 
 (versions 2012 through 2019), see this [Support Lifecycle exception](applications/support-policies-for-sql-server-native-client.md#support-lifecycle-exception).

    
## Details  
  
| Attribute | Value |
| --- | --- |
| Product Name | SQL Server |
| Product Version | 11.0 |
| Event ID | 50000 |
| Event Source | SETUP |
| Component | SQL Server |
 | Native Client |
| Symbolic Name |  |
| Message Text | A network error occurred while attempting to read from the file '%.*ls'. |
  
## Explanation  
 An attempt was made to install (or update)  SQL Server 
 Native Client on a computer where  SQL Server 
 Native Client is already installed, and where the existing installation was from an MSI file that was renamed from sqlncli.msi.  
  
## User Action  
 To resolve this error, uninstall the existing version of  SQL Server 
 Native Client. To prevent this error, do not install  SQL Server 
 Native Client from an MSI file that is not named sqlncli.msi.
