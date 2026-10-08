---
title: "MSSQLSERVER_3169"
description: "MSSQLSERVER_3169"
author: MashaMSFT
ms.author: mathoma
ms.date: "04/04/2017"
ms.service: sql
ms.subservice: supportability
ms.topic: "reference"
f1_keywords:
  - "3169"
helpviewer_keywords:
  - "3169 (Database Engine error)"
---
# MSSQLSERVER_3169
 
**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
  
## Details  
  
| Attribute | Value |
| :--- | :--- |
| Product Name | SQL Server |
| Event ID | 3169 |
| Event Source | MSSQLSERVER |
| Component | SQLEngine |
| Symbolic Name | NA |
| Message Text | The database was backed up on a server running version %ls. That version is incompatible with this server, which is running version %ls. Either restore the database on a server that supports the backup, or use a backup that is compatible with this server. |
  
## Explanation  
Certain features in  SQL Server 
 affect the structure of the database files. When you restore a database to another instance of  SQL Server 
, the file format might not be compatible with a different version of the  SQL Server Database Engine 
.  
  
For example, this error can be caused by using the vardecimalstorage format in a later version of  SQL Server 
 and then trying to restore the database files in a version earlier than  SQL Server 2005 (9.x) 
 Service Pack 2.  
  
## User Action  
Determine the version of  SQL Server 
 that is running on the originating server. In  SQL Server Management Studio 
, either right-click the server and then click **Properties** or type **SELECT \@\@VERSION** in a query window. Open the database by using the original version of  SQL Server 
. Investigate the features that are enabled on the original database in the instance of  SQL Server 
. Modify these settings to work with the version of  SQL Server 
 in which the database will be restored.
