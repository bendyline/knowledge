---
title: Resynchronizing rows (Native Client OLE DB provider)
description: "Updating Data in Rowsets - Resynchronizing Rows in SQL Server Native Client"
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
helpviewer_keywords:
  - "synchronization [OLE DB]"
  - "IRowsetResynch interface"
  - "resynchronizing rows"
  - "data updates [SQL Server], OLE DB"
---
# Updating Data in Rowsets - Resynchronizing Rows in SQL Server Native Client

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





  The  SQL Server 
 Native Client OLE DB provider supports **IRowsetResynch** on  SQL Server 
 cursor-supported rowsets only. **IRowsetResynch** is not available on demand. The consumer must request the interface before opening the rowset.  
  
## Related content

- [Updating Data in Rowsets in SQL Server Native Client](updating-data-in-rowsets.md)
