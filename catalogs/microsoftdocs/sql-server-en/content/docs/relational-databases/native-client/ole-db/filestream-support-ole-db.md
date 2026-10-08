---
title: "FILESTREAM Support (OLE DB)"
description: "FILESTREAM Support (OLE DB)"
author: markingmyname
ms.author: maghan
ms.date: "03/17/2017"
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
helpviewer_keywords:
  - "OLE DB [FILESTREAM support]"
  - "FILESTREAM [SQL Server], OLE DB"
---
# FILESTREAM Support (OLE DB)

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

> **Important:** 
> The [SQL Server Native Client](../sql-server-native-client.md) (often abbreviated SNAC) has been removed from  SQL Server 2022 (16.x) 
 and  SQL Server Management Studio 
 19 (SSMS). Both the SQL Server Native Client OLE DB provider (SQLNCLI or SQLNCLI11) and the legacy Microsoft OLE DB Provider for SQL Server (SQLOLEDB) are not recommended for new development. Switch to the new [Microsoft OLE DB Driver (MSOLEDBSQL) for SQL Server](../../../connect/oledb/oledb-driver-for-sql-server.md) going forward. 

  Beginning with  SQL Server 2008 (10.0.x) 
 and  SQL Server 
 Native Client 10.0, OLE DB supports the enhanced FILESTREAM feature. For more information about this feature, see [FILESTREAM Support](../features/filestream-support.md). For samples, see [Filestream and OLE DB](../../native-client-ole-db-how-to/filestream/filestream-and-ole-db.md).  
  
 To send and receive **varbinary(max)** values greater than 2 GB, an application uses **DBTYPE_IUNKNOWN** in parameter and result bindings. For parameters the provider must call IUnknown::QueryInterface for ISequentialStream and for results that return ISequentialStream.  
  
 For OLE DB, checking related to ISequentialStream values will be relaxed. When *wType* is **DBTYPE_IUNKNOWN** in the **DBBINDING** struct, length checking can be disabled either by omitting **DBPART_LENGTH** from *dwPart* or by setting the length of the data (at offset *obLength* in the data buffer) to ~0. In this case, the provider will not check the length of the value and will request and return all of the data available through the stream. This change will be applied to all large object (LOB) types and XML, but only when connected to  SQL Server 2005 (9.x) 
 (or later) servers. This will provide greater flexibility for developers, while maintaining consistency and backward compatibility for existing applications and downlevel servers.  
  
 This change affects all interfaces that transfer data, principally IRowset::GetData, ICommand::Execute, and IRowsetFastLoad::InsertRow.  
  
## Related content

- [SQL Server Native Client Programming](../sql-server-native-client-programming.md)
