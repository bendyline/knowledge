---
title: "MSSQLSERVER_10001"
description: "MSSQLSERVER_10001"
author: MashaMSFT
ms.author: mathoma
ms.date: "04/04/2017"
ms.service: sql
ms.subservice: supportability
ms.topic: "reference"
ms.custom:
  - ignite-2025
helpviewer_keywords:
  - "10001 (Database Engine error)"
---
# MSSQLSERVER_10001

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)


  
## Details  
  
| Attribute | Value |
| :--- | :--- |
| Product Name | SQL Server |
| Event ID | 10001 |
| Event Source | MSSQLSERVER |
| Component | SQLEngine |
| Symbolic Name | HR_E_UNEXPECTED |
| Message Text | The provider reported an unexpected catastrophic failure. |
  
## Explanation  
Distributed query processing encountered a generic error while calling into the OLE DB provider.  
  
## User Action  
Collect OLE DB trace events using  SQL Server Profiler 
 and  provide this data to product support for the OLE DB provider.  
  
## Related content

- [SQL Server Profiler templates and permissions](../../tools/sql-server-profiler/sql-server-profiler-templates-and-permissions.md)
- [SQL Server Native Client (OLE DB)](../native-client/ole-db/sql-server-native-client-ole-db.md)
