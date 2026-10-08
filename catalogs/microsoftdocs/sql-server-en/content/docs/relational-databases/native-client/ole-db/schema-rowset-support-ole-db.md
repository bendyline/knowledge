---
title: "Schema Rowset Support (OLE DB)"
description: "Schema Rowset Support in SQL Server Native Client (OLE DB)"
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
helpviewer_keywords:
  - "schema rowsets [OLE DB]"
  - "OLE DB, schema rowsets"
  - "OLE DB rowsets, schema"
  - "SQL Server Native Client OLE DB provider, schema rowsets"
  - "rowsets [OLE DB], schema"
---
# Schema Rowset Support in SQL Server Native Client (OLE DB)

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





> **Important:** 
> The [SQL Server Native Client](../sql-server-native-client.md) (often abbreviated SNAC) has been removed from  SQL Server 2022 (16.x) 
 and  SQL Server Management Studio 
 19 (SSMS). Both the SQL Server Native Client OLE DB provider (SQLNCLI or SQLNCLI11) and the legacy Microsoft OLE DB Provider for SQL Server (SQLOLEDB) are not recommended for new development. Switch to the new [Microsoft OLE DB Driver (MSOLEDBSQL) for SQL Server](../../../connect/oledb/oledb-driver-for-sql-server.md) going forward. 

  The  SQL Server 
 Native Client OLE DB provider also supports returning schema information from a linked server when processing  Transact-SQL  distributed queries.  
  
> **Note:**  
>  Although  SQL Server 
 supports synonyms, metadata for synonyms is not returned by  SQL Server 
 Native Client.  
  
 The following tables list schema rowsets and the restriction columns supported by the  SQL Server 
 Native Client OLE DB provider.  
  
| Schema rowset | Restriction columns |
| --- | --- |
| DBSCHEMA_CATALOGS | CATALOG_NAME |
| DBSCHEMA_COLUMN_PRIVILEGES | All the restrictions are supported.<br /><br /> TABLE_CATALOG TABLE_SCHEMA TABLE_NAME COLUMN_NAME GRANTOR GRANTEE |
| DBSCHEMA_COLUMNS | All the restrictions are supported.<br /><br /> TABLE_CATALOG TABLE_SCHEMA TABLE_NAME COLUMN_NAME<br /><br /> The following additional columns are specific to  SQL Server |
| :<br /><br /> COLUMN_LCID, which is the locale ID of the collation. COLUMN_LCID is the same value as a Windows LCID.<br /><br /> COLUMN_COMPFLAGS defines which comparisons are supported for the collation. The data format is the same as DBPROP_FINDCOMPAREOPS.<br /><br /> COLUMN_SORTID, which is the  SQL Server |
 | sorting style for the collation.<br /><br /> COLUMN_TDSCOLLATION, which is the  SQL Server |
 | collation for the column.<br /><br /> IS_COMPUTED, which is VARIANT_TRUE if the column is a computed column and VARIANT_FALSE otherwise. |
| DBSCHEMA_FOREIGN_KEYS | All restrictions are supported.<br /><br /> PK_TABLE_CATALOG PK_TABLE_SCHEMA PK_TABLE_NAME FK_TABLE_CATALOG FK_TABLE_SCHEMA FK_TABLE_NAME |
| DBSCHEMA_INDEXES | Restrictions 1, 2, 3, and 5 are supported.<br /><br /> TABLE_CATALOG TABLE_SCHEMA INDEX_NAME TABLE_NAME |
| DBSCHEMA_PRIMARY_KEYS | All restrictions are supported.<br /><br /> TABLE_CATALOG TABLE_SCHEMA TABLE_NAME |
| DBSCHEMA_PROCEDURE_PARAMETERS | All restrictions are supported.<br /><br /> PROCEDURE_CATALOG PROCEDURE_SCHEMA PROCEDURE_NAME PARAMETER_NAME |
| DBSCHEMA_PROCEDURES | Restrictions 1, 2, and 3 are supported.<br /><br /> PROCEDURE_CATALOG PROCEDURE_SCHEMA PROCEDURE_NAME<br /><br /> DBSCHEMA_PROCEDURES returns only procedures that can be executed by the current user, or for which the current user has been granted VIEW DEFINITION permission. |
| DBSCHEMA_PROVIDER_TYPES | All restrictions are supported.<br /><br /> DATA_TYPE BEST_MATCH |
| DBSCHEMA_SCHEMATA | All restrictions are supported.<br /><br /> CATALOG_NAME SCHEMA_NAME SCHEMA_OWNER |
| DBSCHEMA_STATISTICS | All restrictions are supported.<br /><br /> TABLE_CATALOG TABLE_SCHEMA TABLE_NAME |
| DBSCHEMA_TABLE_CONSTRAINTS | All restrictions are supported.<br /><br /> CONSTRAINT_CATALOG CONSTRAINT_SCHEMA CONSTRAINT_NAME TABLE_CATALOG TABLE_SCHEMA TABLE_NAME CONSTRAINT_TYPE |
| DBSCHEMA_TABLE_PRIVILEGES | All restrictions are supported.<br /><br /> TABLE_CATALOG TABLE_SCHEMA TABLE_NAME GRANTOR GRANTEE |
| DBSCHEMA_TABLES | All restrictions are supported.<br /><br /> TABLE_CATALOG TABLE_SCHEMA TABLE_NAME TABLE_TYPE |
| DBSCHEMA_TABLES_INFO | All restrictions are supported.<br /><br /> TABLE_CATALOG TABLE_SCHEMA TABLE_NAME TABLE_TYPE |
  
## In This Section  
 [Distributed Query Support in Schema Rowsets](schema-rowsets-distributed-query-support.md)  
  
 [LINKEDSERVERS Rowset (OLE DB)](schema-rowsets-linkedservers-rowset.md)  
  
## Related content

- [SQL Server Native Client (OLE DB)](sql-server-native-client-ole-db.md)
- [Using User-Defined Types in SQL Server Native Client](../features/using-user-defined-types.md)
