---
title: "Drop SQL Server table (OLE DB driver)"
description: "Learn how to remove a SQL Server table from a database by using the ITableDefinition::DropTable function in the OLE DB Driver for SQL Server."
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
  - "tables [OLE DB]"
  - "deleting tables"
  - "OLE DB Driver for SQL Server, tables"
  - "removing tables"
  - "dropping tables"
---
# Dropping a SQL Server Table

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
](../../../sql-server/sql-docs-navigation-guide.md#applies-to)






  The OLE DB Driver for SQL Server exposes the **ITableDefinition::DropTable** function to remove a  Microsoft 
  SQL Server 
 table from a database.  
  
 Specify the table name as a Unicode character string in the *pwszName* member of the *uName* union in the *pTableID* parameter. The *eKind* member of *pTableID* must be DBKIND_NAME.  
  
## Related content

- [Tables and Indexes](tables-and-indexes.md)
