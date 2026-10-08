---
title: "LINKEDSERVERS Rowset (OLE DB)"
description: "Schema Rowsets - LINKEDSERVERS Rowset in SQL Server Native Client"
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
helpviewer_keywords:
  - "LINKEDSERVERS rowset"
  - "enumerating data sources [OLE DB]"
---
# Schema Rowsets - LINKEDSERVERS Rowset in SQL Server Native Client

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





> **Important:** 
> The [SQL Server Native Client](../sql-server-native-client.md) (often abbreviated SNAC) has been removed from  SQL Server 2022 (16.x) 
 and  SQL Server Management Studio 
 19 (SSMS). Both the SQL Server Native Client OLE DB provider (SQLNCLI or SQLNCLI11) and the legacy Microsoft OLE DB Provider for SQL Server (SQLOLEDB) are not recommended for new development. Switch to the new [Microsoft OLE DB Driver (MSOLEDBSQL) for SQL Server](../../../connect/oledb/oledb-driver-for-sql-server.md) going forward. 

  The **LINKEDSERVERS** rowset enumerates organization data sources that can participate in  SQL Server 
 distributed queries.  
  
 The **LINKEDSERVERS** rowset contains the following columns.  
  
| Column name | Type indicator | Description |
| --- | --- | --- |
| SVR_NAME | DBTYPE_WSTR | Name of a linked server. |
| SVR_PRODUCT | DBTYPE_WSTR | Manufacturer or other name identifying the type of data store represented by the name of the linked server. |
| SVR_PROVIDERNAME | DBTYPE_WSTR | Friendly name of the OLE DB provider used to consume data from the server. |
| SVR_DATASOURCE | DBTYPE_WSTR | OLE DB DBPROP_INIT_DATASOURCE string used to acquire a data source from the provider. |
| SVR_PROVIDERSTRING | DBTYPE_WSTR | OLE DB DBPROP_INIT_PROVIDERSTRING value used to acquire a data source from the provider. |
| SVR_LOCATION | DBTYPE_WSTR | OLE DB DBPROP_INIT_LOCATION string used to acquire a data source from the provider. |
  
 The rowset is sorted on SRV_NAME and a single restriction is supported on SRV_NAME.  
  
## Related content

- [Schema Rowset Support in SQL Server Native Client (OLE DB)](schema-rowset-support-ole-db.md)
