---
title: "IBCPSession (Native Client OLE DB provider)"
description: "IBCPSession (Native Client OLE DB provider)"
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
helpviewer_keywords:
  - "IBCPSession interface"
apitype: "COM"
---
# IBCPSession (Native Client OLE DB Provider)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





> **Important:**
> The [SQL Server Native Client](../native-client/sql-server-native-client.md) (often abbreviated SNAC) has been removed from  SQL Server 2022 (16.x) 
 and  SQL Server Management Studio 
 19 (SSMS). Both the SQL Server Native Client OLE DB provider (SQLNCLI or SQLNCLI11) and the legacy Microsoft OLE DB Provider for SQL Server (SQLOLEDB) are not recommended for new development. Switch to the new [Microsoft OLE DB Driver (MSOLEDBSQL) for SQL Server](../../connect/oledb/oledb-driver-for-sql-server.md) going forward. 

  The **IBCPSession** interface exposes support for  SQL Server 
 file-based bulk copy operations. The **IBCPSession** interface is exposed in the  SQL Server 
 Native Client OLE DB provider under the same level as Sessions. In the  SQL Server 
 Native Client OLE DB provider, data source objects are factories for Session objects, and bulk copy operations are specified in the connection property SSPROP_ENABLEBULKCOPY. In addition, the SSPROP_ENABLEFASTLOAD property should be set to true.  
  
 Calling the **IDBCreateSession::CreateSession** method will then result in the creation of a **BulkCopySession** object. All the file-based bulk copy methods exposed through the **IBCPSession** object are then callable with nearly similar signatures on this **IBCPSession** object's **IBCPSession** interface.  
  
> **Note:**  
>  The  SQL Server 
 Native Client OLE DB provider supports memory-based bulk copy operations through the [IRowsetFastLoad](irowsetfastload-ole-db.md) interface.  
  
 For more information about using the  SQL Server 
 Native Client OLE DB provider for bulk copy operations, see [Performing Bulk Copy Operations](../native-client/features/performing-bulk-copy-operations.md).  
  
 For a sample showing how to use the **IBCPSession** interface, see [IBCPSession::BCPDone (OLE DB)](ibcpsession-bcpdone-ole-db.md).  
  
## In This Section  
  
| Method | Description |
| --- | --- |
| [IBCPSession::BCPColFmt (OLE DB)](ibcpsession-bcpcolfmt-ole-db.md) | Creates a binding between program variables and  SQL Server |
 | columns. |
| [IBCPSession::BCPColumns (OLE DB)](ibcpsession-bcpcolumns-ole-db.md) | Sets the number of fields that are to be bound to the columns in a  SQL Server |
 | table. |
| [IBCPSession::BCPControl (OLE DB)](ibcpsession-bcpcontrol-ole-db.md) | Sets the options for a bulk copy operation. |
| [IBCPSession::BCPDone (OLE DB)](ibcpsession-bcpdone-ole-db.md) | Commits the remaining rows to be sent to  SQL Server |
| . |
| [IBCPSession::BCPExec (OLE DB)](ibcpsession-bcpexec-ole-db.md) | Performs the bulk copy operation. |
| [IBCPSession::BCPInit (OLE DB)](ibcpsession-bcpinit-ole-db.md) | Initializes the bulk copy structure, performs some error checking, verifies that the data and format file names are correct, and then opens them. |
| [IBCPSession::BCPReadFmt (OLE DB)](ibcpsession-bcpreadfmt-ole-db.md) | Reads format information for each column from the format file. |
| [IBCPSession::BCPWriteFmt (OLE DB)](ibcpsession-bcpwritefmt-ole-db.md) | Writes format information for each column to the format file. |
  
## Related content

- [SQL Server Native Client (OLE DB) Interfaces](sql-server-native-client-ole-db-interfaces.md)
