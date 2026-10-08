---
title: Updating data in rowsets (OLE DB driver)
description: Learn how the OLE DB Driver for SQL Server updates SQL Server data when a consumer updates a modifiable rowset that contains that data.
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
  - "updating data [SQL Server]"
  - "rowsets [OLE DB], updating data"
  - "OLE DB Driver for SQL Server, rowsets"
  - "OLE DB rowsets, updating data"
  - "OLE DB Driver for SQL Server, data updates"
  - "data updates [SQL Server], OLE DB"
---
# Updating Data in Rowsets

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
](../../../sql-server/sql-docs-navigation-guide.md#applies-to)






  The OLE DB Driver for SQL Server updates  SQL Server 
 data when a consumer updates a modifiable rowset that contains that data. A modifiable rowset is created when the consumer requests support for either the **IRowsetChange** or **IRowsetUpdate** interface.  
  
 All OLE DB Driver for SQL Server-modifiable rowsets use  SQL Server 
 cursors to support the rowset. The rowset property DBPROP_LOCKMODE alters  SQL Server 
 concurrency control behavior in cursors and determines the behavior of rowset row fetching and data integrity error generation in updatable rowsets.  
  
 The OLE DB Driver for SQL Server supports row synchronization before or after an update.  
  
> **Note:**  
>  IRowChange::SetColumns is available to set the values of one or more named columns of a row object.  
  
## In This Section  
  
-   [Updating Data in SQL Server Cursors](updating-data-in-sql-server-cursors.md)  
  
-   [Resynchronizing Rows](updating-data-in-rowsets-resynchronizing-rows.md)  
  
## Related content

- [Rowsets](rowsets.md)
