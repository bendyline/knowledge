---
title: "dbo.systargetservergroupmembers (Transact-SQL)"
description: dbo.systargetservergroupmembers (Transact-SQL)
author: VanMSFT
ms.author: vanto
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "dbo.systargetservergroupmembers_TSQL"
  - "dbo.systargetservergroupmembers"
  - "systargetservergroupmembers"
  - "systargetservergroupmembers_TSQL"
helpviewer_keywords:
  - "systargetservergroupmembers system table"
dev_langs:
  - "TSQL"
---
# dbo.systargetservergroupmembers (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

  Records which target servers are currently enlisted in this multiserver group.  
  
| Column name | Data type | Description |
| --- | --- | --- |
| **servergroup_id** | **int** | Server group ID |
| **server_id** | **int** | Server ID |
