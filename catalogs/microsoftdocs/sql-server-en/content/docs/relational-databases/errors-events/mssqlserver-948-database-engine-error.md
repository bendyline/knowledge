---
title: "MSSQLSERVER_948"
description: "MSSQLSERVER_948"
author: MashaMSFT
ms.author: mathoma
ms.date: "04/04/2017"
ms.service: sql
ms.subservice: supportability
ms.topic: "reference"
f1_keywords:
  - "948"
helpviewer_keywords:
  - "948 (Database Engine error)"
---
# MSSQLSERVER_948
 
**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
  
## Details  
  
| Attribute | Value |
| :--- | :--- |
| Product Name | SQL Server |
| Event ID | 948 |
| Event Source | MSSQLSERVER |
| Component | SQLEngine |
| Symbolic Name | NA |
| Message Text | The database '%.*ls' cannot be opened because it is version %d. This server supports version %d and earlier. A downgrade path is not supported. |
  
## Explanation  
Certain features in  SQL Server 
 affect the structure of the database files. When you attach a database to another instance of  SQL Server 
, the file format might not be compatible with a different version of the  Database Engine 
.  
  
For example, this error can be caused by using the vardecimal storage format in a later version of  SQL Server 
 and then trying to attach the database files in a version earlier than  SQL Server 2005 (9.x) 
 Service Pack 2.  
  
## User Action  
Determine the version of  SQL Server 
 that is running on the originating server. In  SQL Server Management Studio 
, either right-click the server and then click **Properties** or type **SELECT @@VERSION** in a query window. Open the database by using the original version of  SQL Server 
. Investigate the features that are enabled on the original database in the instance of  SQL Server 
. Modify these settings to work with the version of  SQL Server 
 in which the database will be attached.
