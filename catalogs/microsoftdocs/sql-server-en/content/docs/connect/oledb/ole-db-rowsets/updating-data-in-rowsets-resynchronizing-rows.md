---
title: Resynchronizing rows (OLE DB driver)
description: For updating data in rowsets, the OLE DB Driver for SQL Server supports IRowsetResynch on SQL Server cursor-supported rowsets only.
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: vanto, randolphwest, davidengel, sunilbs, vbeiranvand
ms.date: "06/14/2018"
ms.service: sql
ms.subservice: connectivity
ms.topic: "reference"
ms.custom:
  - ignite-2025
helpviewer_keywords:
  - "synchronization [OLE DB]"
  - "IRowsetResynch interface"
  - "resynchronizing rows"
  - "data updates [SQL Server], OLE DB"
---
# Updating Data in Rowsets - Resynchronizing Rows

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
](../../../sql-server/sql-docs-navigation-guide.md#applies-to)






  The OLE DB Driver for SQL Server supports **IRowsetResynch** on  SQL Server 
 cursor-supported rowsets only. **IRowsetResynch** is not available on demand. The consumer must request the interface before opening the rowset.  
  
## Related content

- [Updating Data in Rowsets](updating-data-in-rowsets.md)
