---
title: "Drop SQL Server table (Native Client OLE DB provider)"
description: "Drop SQL Server table (Native Client OLE DB provider)"
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
helpviewer_keywords:
  - "tables [OLE DB]"
  - "deleting tables"
  - "SQL Server Native Client OLE DB provider, tables"
  - "removing tables"
  - "dropping tables"
---
# Dropping a SQL Server Native Client Table

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





  The  SQL Server 
 Native Client OLE DB provider exposes the **ITableDefinition::DropTable** function to remove a  Microsoft 
  SQL Server 
 table from a database.  
  
 Specify the table name as a Unicode character string in the *pwszName* member of the *uName* union in the *pTableID* parameter. The *eKind* member of *pTableID* must be DBKIND_NAME.  
  
## Related content

- [Tables and Indexes in SQL Server Native Client](tables-and-indexes.md)
