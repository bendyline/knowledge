---
title: "OLE DB"
description: The SQL Server Native Client OLE DB provider is a COM API for accessing data, used for tools, utilities, or low-level components that need high performance.
author: markingmyname
ms.author: maghan
ms.date: "03/17/2017"
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
helpviewer_keywords:
  - "SQL Server Native Client OLE DB provider, about SQL Server Native Client OLE DB provider"
  - "OLE DB, SQL Server Native Client OLE DB provider"
  - "data access [SQL Server Native Client], OLE DB"
  - "SQLNCLI, OLE DB"
  - "OLE DB"
  - "SQL Server Native Client OLE DB provider"
  - "SQL Server Native Client, OLE DB"
---
# SQL Server Native Client (OLE DB)

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





> **Important:** 
> The [SQL Server Native Client](../sql-server-native-client.md) (often abbreviated SNAC) has been removed from  SQL Server 2022 (16.x) 
 and  SQL Server Management Studio 
 19 (SSMS). Both the SQL Server Native Client OLE DB provider (SQLNCLI or SQLNCLI11) and the legacy Microsoft OLE DB Provider for SQL Server (SQLOLEDB) are not recommended for new development. Switch to the new [Microsoft OLE DB Driver (MSOLEDBSQL) for SQL Server](../../../connect/oledb/oledb-driver-for-sql-server.md) going forward. 

The  SQL Server 
 Native Client OLE DB provider (SQLNCLI) is a low-level COM API that is used for accessing data. The  SQL Server 
 Native Client OLE DB provider is recommended for developing tools, utilities, or low-level components that need high performance. The  SQL Server 
 Native Client OLE DB provider is a native, high performance provider that accesses the  SQL Server 
 Tabular Data Stream (TDS) protocol directly.  
  
  SQL Server 
 Native Client provides OLE DB support to applications connecting to  SQL Server 
.  
  
 The  SQL Server 
 Native Client OLE DB provider is an OLE DB version 2.0-compliant provider.  
 
> **Important:**
> The  SQL Server 
 Native Client OLE DB (SQLNCLI) remains deprecated and it is not recommended to use it for new development work. Instead, use the new [Microsoft OLE DB Driver for SQL Server](../../../connect/oledb/oledb-driver-for-sql-server.md) (MSOLEDBSQL) which will be updated with the most recent server features.
  
## In This Section  
  
-   [Creating a SQL Server Native Client OLE DB Provider Application](../../native-client-ole-db-provider/creating-a-sql-server-native-client-ole-db-provider-application.md)  
  
-   [Data Source Objects (OLE DB)](../../native-client-ole-db-data-source-objects/data-source-objects-ole-db.md)  
  
-   [Commands](../../native-client-ole-db-commands/commands.md)  
  
-   [Rowsets](../../native-client-ole-db-rowsets/rowsets.md)  
  
-   [Stored Procedures](stored-procedures.md)  
  
-   [BLOBs and OLE Objects](../../native-client-ole-db-blobs/blobs-and-ole-objects.md)  
  
-   [Tables and Indexes](../../native-client-ole-db-tables-indexes/tables-and-indexes.md)  
  
-   [Data Types (OLE DB)](../../native-client-ole-db-data-types/data-types-ole-db.md)  
  
-   [Schema Rowset Support (OLE DB)](schema-rowset-support-ole-db.md)  
  
-   [Table-Valued Parameters (OLE DB)](../../native-client-ole-db-table-valued-parameters/table-valued-parameters-ole-db.md)  
  
-   [Date and Time Improvements (OLE DB)](../../native-client-ole-db-date-time/date-and-time-improvements-ole-db.md)  
  
-   [Large CLR User-Defined Types (OLE DB)](large-clr-user-defined-types-ole-db.md)  
  
-   [FILESTREAM Support (OLE DB)](filestream-support-ole-db.md)  
  
-   [Transactions](../../native-client-ole-db-transactions/transactions.md)  
  
-   [Errors](../../native-client-ole-db-errors/errors.md)  
  
-   [Service Principal Names (SPNs) in Client Connections (OLE DB)](service-principal-names-spns-in-client-connections-ole-db.md)  
  
-   [Sparse Columns Support (OLE DB)](sparse-columns-support-ole-db.md)  
  
-   [SQL Server Native Client (OLE DB) Reference](../../native-client-ole-db-interfaces/sql-server-native-client-ole-db-interfaces.md)  
  
-   [OLE DB How-to Topics](../../native-client-ole-db-how-to/ole-db-how-to-topics.md)  
  
## Related content

- [SQL Server Native Client Programming](../sql-server-native-client-programming.md)
