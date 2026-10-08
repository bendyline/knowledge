---
title: Administration Tool Command-Line Options
titleSuffix: SQL Server Distributed Replay
description: The SQL Server Distributed Replay administration tool, DReplay.exe, is a command-line tool to communicate with the distributed replay controller.
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

# Administration Tool Command-line Options (Distributed Replay Utility)


**Applies to:**
 

 



 







> **Important:**  
> SQL Server Distributed Replay isn't available with  SQL Server 2022 (16.x) 
 and later versions.


The Microsoft SQL Server Distributed Replay administration tool, **DReplay.exe**, is a command-line tool to communicate with the distributed replay controller. Use the administration tool to initiate, monitor, and cancel operations on the controller.



## Syntax

```dos
dreplay {preprocess|replay|status|cancel} [options] [-?]}

Usage:

  dreplay preprocess [-m controller] -i input_trace_file  
    -d controller_working_dir [-c config_file] [-f status_interval]

  dreplay replay [-m controller] -d controller_working_dir [-o]  
    [-s target_server] -w clients [-c config_file]  
    [-f status_interval]

  dreplay status [-m controller] [-f status_interval]

  dreplay cancel [-m controller] [-q]   
```

## Remarks

You can issue the following command-line options with **DReplay.exe**:  

**preprocess**  
Initiates the preprocess stage. The controller prepares the input trace data, which you captured from the production environment, for replay against the target server. 

**replay**  
Initiates the event replay stage. The controller dispatches replay data to the specified clients, launches the distributed replay, and synchronizes the clients. Optionally, each client that was selected records the replay activity and saves result trace files locally.

**status**  
Queries the controller and displays the current status.

**cancel**  
Cancels the current operation that is running on the controller.

For detailed syntax information that includes the command arguments and examples, see the following topics:  

- [Preprocess Option (Distributed Replay Administration Tool)](preprocess-option-distributed-replay-administration-tool.md)

- [Replay Option (Distributed Replay Administration Tool)](replay-option-distributed-replay-administration-tool.md)

- [Status Option (Distributed Replay Administration Tool)](status-option-distributed-replay-administration-tool.md)

- [Cancel Option (Distributed Replay Administration Tool)](cancel-option-distributed-replay-administration-tool.md)

RPCs are replayed as RPCs and not as language events.

## Permissions

You must run the administration tool as an interactive user, as either a local user or a domain user account. To use a local user account, the administration tool and controller must be running on the same computer.

For more information, see [Distributed Replay Security](distributed-replay-security.md).

## Related content

- [SQL Server Distributed Replay overview](sql-server-distributed-replay.md)
