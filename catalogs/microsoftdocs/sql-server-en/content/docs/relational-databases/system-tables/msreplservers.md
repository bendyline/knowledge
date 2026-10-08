---
title: "MSreplservers (Transact-SQL)"
description: MSreplservers persists server metadata and shares it among the distribution database availability group replicas.
author: tameikal-msft
ms.author: talawren
ms.reviewer: randolphwest
ms.date: 03/28/2023
ms.service: sql
ms.subservice: replication
ms.topic: "reference"
f1_keywords:
  - "MSreplservers_tsql"
  - "MSreplservers"
helpviewer_keywords:
  - "MSreplservers system table"
dev_langs:
  - "TSQL"
---
# MSreplservers (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SQL Server Replication involves complex user-defined topologies across publisher(s), distributor(s), and subscriber(s). Architecturally, replication needs to track and validate the servers associated with any given publication. Historically, the server information was tracked in the [sys.sysservers](../system-compatibility-views/sys-sysservers-transact-sql.md) table in the `master` database, in addition to replication metadata tables.

When support was added for the Distribution database in Always On availability groups (AGs), the `MSreplservers` table was added to the Distribution database, to persist server metadata and share it among the Distribution database AG replicas, instead of being stored as a local table to each instance. The AG persists the data on all replicas and ensures the server IDs and names are the same.

This table was introduced in  SQL Server 2016 (13.x) 
 SP 2 CU 3, and  SQL Server 2017 (14.x) 
 CU 6.

| Column name | Data type | Description |
| --- | --- | --- |
| **srvid** | **smallint** | ID of the remote server. |
| **srvname** | **sysname** | Name of the server. May be a listener record if appropriate. |

## Related content

- [Replication Tables (Transact-SQL)](replication-tables-transact-sql.md)
- [Replication Views (Transact-SQL)](../system-views/replication-views-transact-sql.md)
- [sys.sysservers (Transact-SQL)](../system-compatibility-views/sys-sysservers-transact-sql.md)
