---
title: "IBCPSession2 (Native Client OLE DB provider)"
description: "IBCPSession2 (Native Client OLE DB provider)"
author: markingmyname
ms.author: maghan
ms.date: "03/16/2017"
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
helpviewer_keywords:
  - "IBCPSession2 interface"
---
# IBCPSession2 (Native Client OLE DB Provider)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





> **Important:**
> The [SQL Server Native Client](../native-client/sql-server-native-client.md) (often abbreviated SNAC) has been removed from  SQL Server 2022 (16.x) 
 and  SQL Server Management Studio 
 19 (SSMS). Both the SQL Server Native Client OLE DB provider (SQLNCLI or SQLNCLI11) and the legacy Microsoft OLE DB Provider for SQL Server (SQLOLEDB) are not recommended for new development. Switch to the new [Microsoft OLE DB Driver (MSOLEDBSQL) for SQL Server](../../connect/oledb/oledb-driver-for-sql-server.md) going forward. 

The IBCPSession2 interface is an extension to IBCPSession that provides a member function that is an alternative to calling IBCPSession::BCPColFmt for each column.  IBCPSession2 inherits from IBCPSession and adds one new method: [IBCPSession2::BCPSetBulkMode](ibcpsession2-bcpsetbulkmode.md).  
  
## Related content

- [SQL Server Native Client (OLE DB) Interfaces](sql-server-native-client-ole-db-interfaces.md)
