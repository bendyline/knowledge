---
title: Updating data in rowsets (Native Client OLE DB provider)
description: "Updating Data in Rowsets in SQL Server Native Client"
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
helpviewer_keywords:
  - "updating data [SQL Server]"
  - "rowsets [OLE DB], updating data"
  - "SQL Server Native Client OLE DB provider, rowsets"
  - "OLE DB rowsets, updating data"
  - "SQL Server Native Client OLE DB provider, data updates"
  - "data updates [SQL Server], OLE DB"
---
# Updating Data in Rowsets in SQL Server Native Client

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





  The  SQL Server 
 Native Client OLE DB provider updates  SQL Server 
 data when a consumer updates a modifiable rowset that contains that data. A modifiable rowset is created when the consumer requests support for either the **IRowsetChange** or **IRowsetUpdate** interface.  
  
 All  SQL Server 
 Native Client OLE DB provider-modifiable rowsets use  SQL Server 
 cursors to support the rowset. The rowset property DBPROP_LOCKMODE alters  SQL Server 
 concurrency control behavior in cursors and determines the behavior of rowset row fetching and data integrity error generation in updatable rowsets.  
  
 The  SQL Server 
 Native Client OLE DB provider supports row synchronization before or after an update.  
  
> **Note:**  
>  IRowChange::SetColumns is available to set the values of one or more named columns of a row object.  
  
## In This Section  
  
-   [Updating Data in SQL Server Cursors](updating-data-in-sql-server-cursors.md)  
  
-   [Resynchronizing Rows](updating-data-in-rowsets-resynchronizing-rows.md)  
  
## Related content

- [Rowsets (Native Client OLE DB provider)](rowsets.md)
