---
title: "Create rowset with IOpenRowset (Native Client OLE DB provider)"
description: "Create rowset with IOpenRowset (Native Client OLE DB provider)"
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
helpviewer_keywords:
  - "IOpenRowset interface"
  - "rowsets [OLE DB], creating"
  - "SQL Server Native Client OLE DB provider, rowsets"
  - "OLE DB rowsets, creating"
---
# Creating a Rowset with IOpenRowset in SQL Server Native Client

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





  The  SQL Server 
 Native Client OLE DB provider supports the **IOpenRowset::OpenRowset** method with the following restrictions:  
  
-   A base table or view must be specified in a database ID (DBID) structure that the *pTableID* parameter points to.  
  
-   The DBID *eKind* member must indicate DBKIND_NAME.  
  
-   The DBID *uName* member must specify the name of an existing base table or a view as a Unicode character string.  
  
-   The *pIndexID* parameter of **OpenRowset** must be NULL.  
  
 The result set of **IOpenRowset::OpenRowset** contains a single rowset. Result sets that contain a single rowset can be supported by  Microsoft 
  SQL Server 
 cursors. Cursor support allows the developer to use  SQL Server 
 concurrency mechanisms.  
  
## Related content

- [Rowsets (Native Client OLE DB provider)](rowsets.md)
