---
title: "Sqlservr Application"
description: The sqlservr application starts, stops, pauses, and continues an instance of SQL Server from a command prompt.
author: rwestMSFT
ms.author: randolphwest
ms.date: 12/16/2025
ms.service: sql
ms.subservice: tools-other
ms.topic: concept-article
ms.collection:
  - data-tools
helpviewer_keywords:
  - "command prompt utilities [SQL Server], sqlservr"
  - "command prompt [SQL Server], pausing/resuming instance of SQL Server"
  - "starting instance of SQL Server"
  - "command prompt [SQL Server], continuing instance of SQL Server"
  - "sqlservr utility"
  - "pausing instance of SQL Server"
  - "stopping instance of SQL Server"
  - "resuming SQL Server"
  - "command prompt [SQL Server], stopping instance of SQL Server"
  - "command prompt [SQL Server], starting instance of SQL Server"
  - "continuing instance of SQL Server"
---

# sqlservr application


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 

The **sqlservr** application starts, stops, pauses, and continues an instance of  SQL Server 
 from a command prompt. Use this procedure to start  SQL Server 
 only for troubleshooting purposes.

## Syntax

```console
sqlservr [ -s instance_name ] [ -c ] [ -d master_path ] [ -f ]
     [ -e error_log_path ] [ -l master_log_path ] [ -m ]
     [ -n ] [ -T trace# ] [ -v ] [ -x ]
```

## Arguments

#### -s *instance_name*

Specifies the instance of  SQL Server 
 to connect to. If no named instance is specified, **sqlservr** starts the default instance of  SQL Server 
.

> **Important:**  
> When starting an instance of  SQL Server 
, you must use the **sqlservr** application in the appropriate directory for that instance. For the default instance, run **sqlservr** from the \MSSQL\Binn directory. For a named instance, run **sqlservr** from the \MSSQL$*instance_name*\Binn directory.

#### -c

Indicates that an instance of  SQL Server 
 is started independently of the Windows Service Control Manager. This option is used when starting  SQL Server 
 from a command prompt, to shorten the amount of time it takes for  SQL Server 
 to start.

> **Note:**  
> When you use this option, you can't stop  SQL Server 
 by using  SQL Server 
 Service Manager or the **net stop** command, and if you sign out of the computer,  SQL Server 
 is stopped.

#### -d *master_path*

Indicates the fully qualified path for the `master` database file. There are no spaces between `-d` and *master_path*. If you don't provide this option, the existing registry parameters are used.

#### -f

Starts an instance of  SQL Server 
 with minimal configuration. This option is useful if the setting of a configuration value (for example, over-committing memory) prevents the server from starting.

#### -e *error_log_path*

Indicates the fully qualified path for the error log file. If not specified, the default location is `*\<Drive>*:\Program Files\Microsoft SQL Server\MSSQL\Log\Errorlog` for the default instance and `*\<Drive>*:\Program Files\Microsoft SQL Server\MSSQL$*instance_name*\Log\Errorlog` for a named instance. There are no spaces between `-e` and *error_log_path*.

#### -l *master_log_path*

Indicates the fully qualified path for the `master` database transaction log file. There are no spaces between `-l` and *master_log_path*.

#### -m

Indicates to start an instance of  SQL Server 
 in single-user mode. Only a single user can connect when  SQL Server 
 is started in single-user mode. The `CHECKPOINT` mechanism, which guarantees that completed transactions are regularly written from the disk cache to the database device, isn't started. (Typically, this option is used if you experience problems with system databases that require repair.) Enables the **sp_configure allow updates** option. By default, **allow updates** is disabled.

#### -n

Allows you to start a named instance of  SQL Server 
. Without the `-s` parameter set, the default instance attempts to start. You must switch to the appropriate `binn` directory for the instance at a command prompt before starting **sqlservr.exe**. For example, if `Instance1` were to use `\mssql$Instance1` for its binaries, the user must be in the `\mssql$Instance1\binn` directory to start `sqlservr.exe -s instance1`. If you start an instance of  SQL Server 
 with the `-n` option, it's advisable to use the `-e` option too, or  SQL Server 
 events aren't logged.

#### -T *trace#*

Indicates that an instance of  SQL Server 
 should be started with a specified trace flag (*trace#*) in effect. Trace flags are used to start the server with nonstandard behavior. For more information, see [Set trace flags with DBCC TRACEON](../t-sql/database-console-commands/dbcc-traceon-trace-flags-transact-sql.md).

> **Important:**  
> When specifying a trace flag, use `-T` to pass the trace flag number. A lowercase `t` (`-t`) is accepted by  SQL Server 
; however, `-t` sets other internal trace flags required by  SQL Server 
 support engineers.

#### -v

Displays the server version number.

#### -x

Disables the keeping of CPU time and cache-hit ratio statistics. Allows maximum performance.

## Remarks

You should use the methods described in [Database Engine Service startup options](../database-engine/configure-windows/database-engine-service-startup-options.md) instead of using the sqlservr.exe program to start  SQL Server 
. In most cases, the sqlservr.exe program is only used for advanced troubleshooting or major maintenance. When  SQL Server 
 is started from the command prompt with sqlservr.exe,  SQL Server 
 doesn't start as a service, so you can't stop  SQL Server 
 using **net** commands. Users can connect to  SQL Server 
, but  SQL Server 
 tools show the status of the service, so  SQL Server 
 Configuration Manager correctly indicates that the service is stopped.  SQL Server Management Studio 
 can connect to the server, but it also indicates that the service is stopped.

## Compatibility support

The following parameters are obsolete and not supported in  SQL Server 2019 (15.x) 
.

| Parameter | More information |
| --- | --- |
| `-h` | In earlier versions of 32-bit instances of  SQL Server |
 | to reserve virtual memory address space for Hot Add memory metadata when AWE is enabled. Supported through  SQL Server 2014 (12.x) |
| . For more information, see [Discontinued Database Engine functionality in SQL Server](../database-engine/discontinued-database-engine-functionality-in-sql-server.md). |
| `-g` | *memory_to_reserve*<br /><br />Applies to earlier versions of 32-bit instances of  SQL Server |
| . Supported through  SQL Server 2014 (12.x) |
| . Specifies an integer number of megabytes (MB) of memory that  SQL Server |
 | leaves available for memory allocations within the  SQL Server |
 | process, but outside the  SQL Server |
 | memory pool. For more information, see [the SQL Server 2014 documentation on Server Memory Configuration Options](https://learn.microsoft.com/previous-versions/sql/2014/database-engine/configure-windows/server-memory-server-configuration-options?view=sql-server-2014\&preserve-view=true). |

## Related content

- [Database Engine Service startup options](../database-engine/configure-windows/database-engine-service-startup-options.md)
