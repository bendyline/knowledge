---
title: Replay a Transact-SQL Script
titleSuffix: SQL Server Profiler
description: Discover how to use SQL Server Profiler to replay Transact-SQL scripts so that you can compare different possible solutions to a performance problem.
author: rwestMSFT
ms.author: randolphwest
ms.date: 06/05/2025
ms.service: sql
ms.subservice: profiler
ms.topic: how-to
ms.collection:
  - data-tools
---

# Replay a Transact-SQL script (SQL Server Profiler)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 





When you test possible solutions to a performance problem, use  SQL Server Profiler 
 to replay  Transact-SQL  scripts, and compare performance before and after your changes.

## Replay a Transact-SQL script

1. On the **File** menu, point to **Open**, and then select **Script File**.

1. Select the  Transact-SQL  script file you want to open. Make sure that the  Transact-SQL  script contains events necessary for replay. For more information, see [Replay Requirements](replay-requirements.md).

1. On the **Replay** menu, select **Start**, and connect to the server where you want to replay the script.

1. In the **Replay Configuration** dialog box, verify the settings, and then select **OK**.

## Related content

- [Replay Traces](replay-traces.md)
- [SQL Server Profiler](sql-server-profiler.md)
