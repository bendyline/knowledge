---
title: "MSSQLSERVER_9955"
description: "MSSQLSERVER_9955"
author: MashaMSFT
ms.author: mathoma
ms.date: "04/04/2017"
ms.service: sql
ms.subservice: supportability
ms.topic: "reference"
helpviewer_keywords:
  - "9955 (Database Engine error)"
---
# MSSQLSERVER_9955
 
**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
  
## Details  
  
| Attribute | Value |
| :--- | :--- |
| Product Name | SQL Server |
| Event ID | 9955 |
| Event Source | MSSQLSERVER |
| Component | SQLEngine |
| Symbolic Name | FTXT2_MSSEARCHACCESSDENY |
| Message Text | SQL Server failed to create named pipe '%ls' to communicate with the full-text filter daemon (Windows error: %d). Either a named pipe already exists for a filter daemon host process, the system is low on resources, or the security identification number (SID) lookup for the filter daemon account group failed. To resolve this error, terminate any running full-text filter daemon processes, and if necessary reconfigure the full-text daemon launcher service account. |
  
## Explanation  
This message occurs because  SQL Server 
 failed to create a named pipe to communicate with the full-text filter daemon. Either a named pipe already exists for a filter daemon host process, the system is low on resources, or the security identification number (SID) lookup for the filter daemon account group failed.  
  
## User Action  
To resolve this error, terminate any running full-text filter daemon processes, and if necessary reconfigure the full-text daemon host account by using the SQL Server Configuration Manager.  
  
## Related content

- [SQL Server Configuration Manager](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/relational-databases/sql-server-configuration-manager.md)
- [Set the service account for the full-text Filter Daemon Launcher](../search/set-the-service-account-for-the-full-text-filter-daemon-launcher.md)
- [Full-Text Search](../search/full-text-search.md)
