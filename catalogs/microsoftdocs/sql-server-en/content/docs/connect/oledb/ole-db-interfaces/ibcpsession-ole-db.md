---
title: "IBCPSession (OLE DB driver)"
description: Learn how OLE DB Driver for SQL Server uses IBCPSession to support SQL Server file-based bulk copy operations, and about its members.
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: vanto, randolphwest, davidengel, sunilbs, vbeiranvand
ms.date: "06/14/2018"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
ms.custom:
  - ignite-2025
helpviewer_keywords:
  - "IBCPSession interface"
apitype: "COM"
---
# IBCPSession (OLE DB)

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
](../../../sql-server/sql-docs-navigation-guide.md#applies-to)






  The **IBCPSession** interface exposes support for  SQL Server 
 file-based bulk copy operations. The **IBCPSession** interface is exposed in the OLE DB Driver for SQL Server under the same level as Sessions. In the OLE DB Driver for SQL Server, data source objects are factories for Session objects, and bulk copy operations are specified in the connection property SSPROP_ENABLEBULKCOPY. In addition, the SSPROP_ENABLEFASTLOAD property should be set to true.  
  
 Calling the **IDBCreateSession::CreateSession** method will then result in the creation of a **BulkCopySession** object. All the file-based bulk copy methods exposed through the **IBCPSession** object are then callable with nearly similar signatures on this **IBCPSession** object's **IBCPSession** interface.  
  
> **Note:**  
>  The OLE DB Driver for SQL Server supports memory-based bulk copy operations through the [IRowsetFastLoad](irowsetfastload-ole-db.md) interface.  
  
 For more information about using the OLE DB Driver for SQL Server for bulk copy operations, see [Performing Bulk Copy Operations](../features/performing-bulk-copy-operations.md).  
  
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

- [OLE DB Driver for SQL Server (OLE DB) Interfaces](oledb-driver-for-sql-server-ole-db-interfaces.md)
