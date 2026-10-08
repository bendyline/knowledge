---
title: "IDBProperties (OLE DB driver)"
description: "Learn about the IDBProperties interface in OLE DB Driver for SQL Server, including the IDBProperties::GetPropertyInfo method."
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: vanto, randolphwest, davidengel, sunilbs, vbeiranvand
ms.date: "06/14/2018"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
ms.custom:
  - ignite-2025
---
# IDBProperties (OLE DB)

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
](../../../sql-server/sql-docs-navigation-guide.md#applies-to)






  The OLE DB standard specification allows providers to specify VT_EMPTY for **DBPROPINFO::vValues**. However, OLE DB Driver for SQL Server OLE DB always returns VT_EMPTY when you call **IDBProperties::GetPropertyInfo** with **DBPROPSET_ROWSETALL** to retrieve rowset properties.  
  
## Related content

- [OLE DB Driver for SQL Server (OLE DB) Interfaces](oledb-driver-for-sql-server-ole-db-interfaces.md)
