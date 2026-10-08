---
title: "IRowsetFastLoad (Native Client OLE DB provider)"
description: "IRowsetFastLoad (Native Client OLE DB provider)"
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
helpviewer_keywords:
  - "IRowsetFastLoad interface"
apitype: "COM"
---
# IRowsetFastLoad (Native Client OLE DB Provider)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





> **Important:**
> The [SQL Server Native Client](../native-client/sql-server-native-client.md) (often abbreviated SNAC) has been removed from  SQL Server 2022 (16.x) 
 and  SQL Server Management Studio 
 19 (SSMS). Both the SQL Server Native Client OLE DB provider (SQLNCLI or SQLNCLI11) and the legacy Microsoft OLE DB Provider for SQL Server (SQLOLEDB) are not recommended for new development. Switch to the new [Microsoft OLE DB Driver (MSOLEDBSQL) for SQL Server](../../connect/oledb/oledb-driver-for-sql-server.md) going forward. 

  The **IRowsetFastLoad** interface exposes support for  SQL Server 
 memory-based bulk-copy operations.  SQL Server 
 Native Client OLE DB provider consumers use the interface to rapidly add data to an existing  SQL Server 
 table.  
  
 If you set SSPROP_ENABLEFASTLOAD to VARIANT_TRUE for a session, you cannot read data from rowsets subsequently returned from that session. When SSPROP_ENABLEFASTLOAD is set to VARIANT_TRUE, all rowsets created on the session will be of type IRowsetFastLoad. IRowsetFastLoad rowsets do not support rowset fetch functionality; therefore, data from these rowsets cannot be read.  
  
## In This Section  
  
| Method | Description |
| --- | --- |
| [IRowsetFastLoad::Commit (OLE DB)](irowsetfastload-commit-ole-db.md) | Marks the end of a batch of inserted rows and writes the rows to the  SQL Server |
 | table. |
| [IRowsetFastLoad::InsertRow (OLE DB)](irowsetfastload-insertrow-ole-db.md) | Adds a row to the bulk copy rowset. |
  
## Related content

- [SQL Server Native Client (OLE DB) Interfaces](sql-server-native-client-ole-db-interfaces.md)
- [Bulk Copy Data Using IRowsetFastLoad (OLE DB) in  SQL Server Native Client](../native-client-ole-db-how-to/bulk-copy-data-using-irowsetfastload-ole-db.md)
- [Send BLOB Data to SQL SERVER Using IROWSETFASTLOAD and ISEQUENTIALSTREAM in (Native Client OLE DB)](../native-client-ole-db-how-to/send-blob-data-to-sql-server-using-irowsetfastload-and-isequentialstream-ole-db.md)
