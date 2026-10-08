---
title: "Using Catalog Functions"
description: "Using Catalog Functions"
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
helpviewer_keywords:
  - "ODBC, functions"
  - "SQLLinkedCatalogs function"
  - "SQL Server Native Client ODBC driver, catalog functions"
  - "SQLLinkedServers function"
  - "catalog functions [ODBC]"
  - "functions [ODBC]"
---
# Using Catalog Functions

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


  All databases have a structure containing the data stored in the database. A definition of this structure, along with other information such as permissions, is stored in a catalog (implemented as a set of system tables), also known as a data dictionary.  
  
 The  SQL Server 
 Native Client ODBC driver enables an application to determine the database structure through calls to ODBC catalog functions. Catalog functions return information in result sets and are implemented using catalog stored procedures to query the system tables in the catalog. For example, an application might request a result set containing information about all the tables on the system or all the columns in a particular table. The standard ODBC catalog functions are used to get catalog information from the  SQL Server 
 to which the application connected.  
  
  SQL Server 
 supports distributed queries in which data from multiple, heterogeneous OLE DB data sources is accessed in a single query. One of the methods of accessing a remote OLE DB data source is to define the data source as a linked server. This can be done by using [sp_addlinkedserver](../../system-stored-procedures/sp-addlinkedserver-transact-sql.md). After the linked server has been defined, objects in that server can be referenced in Transact-SQL statements by using a four-part name:  
  
 *linked_server_name.catalog.schema.object_name*.  
  
 The  SQL Server 
 Native Client ODBC driver supports two driver-specific functions that help get catalog information from linked servers:  
  
-   **SQLLinkedServers**  
  
     Returns a list of the linked servers defined to the local server.  
  
-   **SQLLinkedCatalogs**  
  
     Returns a list of the catalogs contained in a linked server.  
  
 After you have a linked server name and a catalog name, the  SQL Server 
 Native Client ODBC driver supports getting information from the catalog by using a two-part name of _linked_server_name_**.**_catalog_ for *CatalogName* on the following ODBC catalog functions:  
  
-   **SQLColumnPrivileges**  
  
-   **SQLColumns**  
  
-   **SQLPrimaryKeys**  
  
-   **SQLStatistics**  
  
-   **SQLTablePrivileges**  
  
-   **SQLTables**  
  
 The two-part _linked_server_name_**.**_catalog_ is also supported for *FKCatalogName* and *PKCatalogName* on [SQLForeignKeys](../../native-client-odbc-api/sqlforeignkeys.md).  
  
 Using SQLLinkedServers and SQLLinkedCatalogs requires the following files:  
  
-   sqlncli.h  
  
     Includes function prototypes and constant definitions for the linked server catalog functions. sqlncli.h must be included in the ODBC application and must be in the include path when the application is compiled.  
  
-   sqlncli11.lib  
  
     Must be in the library path of the linker and specified as a file to be linked. sqlncli11.lib is distributed with the  SQL Server 
 Native Client ODBC driver.  
  
-   sqlncli11.dll  
  
     Must be present at execution time. sqlncli11.dll is distributed with the  SQL Server 
 Native Client ODBC driver.  
  
## Related content

- [SQL Server Native Client (ODBC)](sql-server-native-client-odbc.md)
- [SQLColumnPrivileges](../../native-client-odbc-api/sqlcolumnprivileges.md)
- [SQLColumns](../../native-client-odbc-api/sqlcolumns.md)
- [SQLPrimaryKeys](../../native-client-odbc-api/sqlprimarykeys.md)
- [SQLTablePrivileges](../../native-client-odbc-api/sqltableprivileges.md)
- [SQLTables](../../native-client-odbc-api/sqltables.md)
- [SQLStatistics](../../native-client-odbc-api/sqlstatistics.md)
