---
title: "Working with Snapshot Isolation"
description: "Working with Snapshot Isolation in SQL Server Native Client"
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
helpviewer_keywords:
  - "data access [SQL Server Native Client], snapshot isolation"
  - "SQLNCLI, snapshot isolation"
  - "isolation levels [SQL Server], snapshot"
  - "DBPROPSET_SESSION property set"
  - "DBDROPSET_DATASOURCEINFO property set"
  - "snapshot isolation [SQL Server Native Client]"
  - "SQL Server Native Client OLE DB provider, snapshot isolation"
  - "SQL Server Native Client ODBC driver, snapshot isolation"
  - "SQL Server Native Client, snapshot isolation"
  - "SQLGetInfo function"
  - "concurrency [SQL Server Native Client]"
  - "SQLSetConnectAttr function"
---
# Working with Snapshot Isolation in SQL Server Native Client

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


   SQL Server 2005 (9.x) 
 introduced a new "snapshot" isolation level that is intended to enhance concurrency for online transaction processing (OLTP) applications. In earlier versions of  SQL Server 
, concurrency was based solely on locking, which can cause blocking and deadlocking problems for some applications. Snapshot isolation depends on enhancements to row versioning and is intended to improve performance by avoiding reader-writer blocking scenarios.  
  
 Transactions that start under snapshot isolation read a database snapshot as of the time when the transaction starts. One result of this is that keyset, dynamic and static server cursors, when opened within a snapshot transaction context, behave much like static cursors opened within serializable transactions. However, when the cursors are opened under the snapshot isolation level locks are not taken, which can reduce blocking on the server.  
  
## SQL Server Native Client OLE DB Provider  
 The  SQL Server 
 Native Client OLE DB provider has enhancements that take advantage of the snapshot isolation introduced in  SQL Server 2005 (9.x) 
. These enhancements include changes to the DBPROPSET_DATASOURCEINFO and DBPROPSET_SESSION property sets.  
  
### DBPROPSET_DATASOURCEINFO  
 The DBPROPSET_DATASOURCEINFO property set has been changed to indicate that the snapshot isolation level is supported by the addition of the DBPROPVAL_TI_SNAPSHOT value that is used in the DBPROP_SUPPORTEDTXNISOLEVELS property. This new value indicates that the snapshot isolation level is supported whether or not versioning has been enabled on the database. The following is a list of the DBPROP_SUPPORTEDTXNISOLEVELS values:  
  
| Property ID | Description |
| --- | --- |
| DBPROP_SUPPORTEDTXNISOLEVELS | Type: VT_I4<br /><br /> R/W: Read only<br /><br /> Description: A bitmask specifying the supported transaction isolation levels. A combination of zero or more of the following:<br /><br /> DBPROPVAL_TI_CHAOS<br /><br /> DBPROPVAL_TI_READUNCOMMITTED<br /><br /> DBPROPVAL_TI_BROWSE<br /><br /> DBPROPVAL_TI_CURSORSTABILITY<br /><br /> DBPROPVAL_TI_READCOMMITTED<br /><br /> DBPROPVAL_TI_REPEATABLEREAD<br /><br /> DBPROPVAL_TI_SERIALIZABLE<br /><br /> DBPROPVAL_TI_ISOLATED<br /><br /> DBPROPVAL_TI_SNAPSHOT |
  
### DBPROPSET_SESSION  
 The DBPROPSET_SESSION property set has been changed to indicate that the snapshot isolation level is supported by the addition of the DBPROPVAL_TI_SNAPSHOT value that is used in the DBPROP_SESS_AUTOCOMMITISOLEVELS property. This new value indicates that the snapshot isolation level is supported whether or not versioning has been enabled on the database. The following is a list of the DBPROP_SESS_AUTOCOMMITISOLEVELS values:  
  
| Property ID | Description |
| --- | --- |
| DBPROP_SESS_AUTOCOMMITISOLEVELS | Type: VT_I4<br /><br /> R/W: Read only<br /><br /> Description: Specifies a bitmask that indicates the transaction isolation level while in auto-commit mode. The values that can be set in this bitmask are the same as those that can be set for DBPROP_SUPPORTEDTXNISOLEVELS. |
  
> **Note:**  
>  The errors DB_S_ERRORSOCCURRED or DB_E_ERRORSOCCURRED will occur if DBPROPVAL_TI_SNAPSHOT is set when using versions of  SQL Server 
 earlier than  SQL Server 2005 (9.x) 
.  
  
 For information about how snapshot isolation is supported in transactions, see [Supporting Local Transactions](../../native-client-ole-db-transactions/supporting-local-transactions.md).  
  
## SQL Server Native Client ODBC Driver  
 The  SQL Server 
 Native Client ODBC driver provides support for snapshot isolation though enhancements made to the [SQLSetConnectAttr](../../native-client-odbc-api/sqlsetconnectattr.md) and [SQLGetInfo](../../native-client-odbc-api/sqlgetinfo.md) functions.  
  
### SQLSetConnectAttr  
 The **SQLSetConnectAttr** function now supports the use of the SQL_COPT_SS_TXN_ISOLATION attribute. Setting SQL_COPT_SS_TXN_ISOLATION to SQL_TXN_SS_SNAPSHOT indicates that the transaction will take place under the snapshot isolation level.  
  
### SQLGetInfo  
 The [SQLGetInfo](../../native-client-odbc-api/sqlgetinfo.md) function now supports the SQL_TXN_SS_SNAPSHOT value that has been added to the SQL_TXN_ISOLATION_OPTION info type.  
  
 For information about how snapshot isolation is supported in transactions, see [Cursor Transaction Isolation Level](../../native-client-odbc-cursors/properties/cursor-transaction-isolation-level.md).  
  
## Related content

- [SQL Server Native Client Features](sql-server-native-client-features.md)
- [Rowset Properties and Behaviors (Native Client OLE DB provider)](../../native-client-ole-db-rowsets/rowset-properties-and-behaviors.md)
