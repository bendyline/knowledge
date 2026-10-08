---
title: Status Option in Admin Tool
titleSuffix: SQL Server Distributed Replay
description: This article describes the status command-line option and syntax of the SQL Server Distributed Replay administration tool, which displays the current status.
author: rwestMSFT
ms.author: randolphwest
ms.date: 06/20/2022
ms.service: sql
ms.subservice: distributed-replay
ms.topic: concept-article
ms.collection:
  - data-tools
monikerRange: ">=sql-server-2017 || >=sql-server-linux-2017"
---

# Status Option (Distributed Replay Administration Tool)


**Applies to:**
 

 



 







> **Important:**  
> SQL Server Distributed Replay isn't available with  SQL Server 2022 (16.x) 
 and later versions.


The Microsoft  SQL Server 
 Distributed Replay administration tool, **DReplay.exe**, is a command-line tool that you can use to communicate with the distributed replay controller. This topic describes the **status** command-line option and corresponding syntax.

The **status** option queries the controller and displays the current status.



## Syntax

```dos

dreplay status [-m controller] [-f status_interval]  
```

### Parameters

**-m** _controller_  
Specifies the computer name of the controller. You can use "`localhost`" or "`.`" to refer to the local computer.

If the **-m** parameter isn't specified, the local computer is used.

**-f** _status_interval_  
Specifies the frequency (in seconds) at which to display the status.

If the **-f** parameter isn't specified, the default interval is 30 seconds.

## Examples

In the following example, the current status is displayed every 60 seconds. The value `localhost` indicates that the controller service is running on the same computer as the administration tool.

```dos
dreplay status -m localhost -f 60  
```

## Permissions

You must run the administration tool as an interactive user, as either a local user or a domain user account. To use a local user account, the administration tool and controller must be running on the same computer.

For more information, see [Distributed Replay Security](distributed-replay-security.md).

## Related content

- [SQL Server Distributed Replay overview](sql-server-distributed-replay.md)
- [Transact-SQL debugger](../../ssdt/debugger/transact-sql-debugger.md)
