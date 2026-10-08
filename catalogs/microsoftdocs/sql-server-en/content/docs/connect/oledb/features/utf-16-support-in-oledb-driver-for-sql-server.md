---
title: "UTF-16 Support in OLE DB Driver for SQL Server| Microsoft Docs"
description: Learn about UTF-16 support in OLE DB Driver for SQL Server and when it adds a high surrogate code point to the buffer.
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: vanto, randolphwest, davidengel, sunilbs, vbeiranvand
ms.date: "06/12/2018"
ms.service: sql
ms.subservice: connectivity
ms.topic: "reference"
ms.custom:
  - ignite-2025
---
# UTF-16 Support in OLE DB Driver for SQL Server

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
](../../../sql-server/sql-docs-navigation-guide.md#applies-to)






  Beginning in  SQL Server 2012 (11.x) 
, if you supply a fixed-length buffer when binding a column result or output parameter and if the **wchar** character written into the buffer before the terminating character is a high surrogate code point of a surrogate pair, and if the next **wchar** character is a low surrogate code point, OLE DB Driver for SQL Server will not add the high surrogate code point to the buffer.  
  
## Related content

- [OLE DB Driver for SQL Server Features](oledb-driver-for-sql-server-features.md)
