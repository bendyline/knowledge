---
title: "Sqlagent Application"
description: The sqlagent application starts SQL Server Agent from the command prompt. Use it when diagnosing SQL Server Agent or when directed by your support provider.
author: rwestMSFT
ms.author: randolphwest
ms.date: 12/16/2025
ms.service: sql
ms.subservice: tools-other
ms.topic: concept-article
ms.collection:
  - data-tools
helpviewer_keywords:
  - "starting SQL Server Agent"
  - "sqlagent90 application"
  - "sqlagent application"
  - "SQL Server Agent, starting"
  - "command prompt utilities [SQL Server], sqlagent90"
  - "command prompt utilities [SQL Server], sqlagent"
---
# sqlagent application


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 

The **sqlagent** application starts  SQL Server 
 Agent from the command prompt. Usually,  SQL Server 
 Agent should be run from  SQL Server Management Studio 
 or by using SQL-SMO methods in an application. Only run **sqlagent** from the command prompt when you're diagnosing  SQL Server 
 Agent, or when you're directed to it by your primary support provider.

## Syntax

```console
sqlagent
-c [ -v ] [ -i instance_name ]
```

## Arguments

#### -c

Indicates that  SQL Server 
 Agent is running from the command prompt and is independent of the Microsoft Windows Services Control Manager. When `-c` is used,  SQL Server 
 Agent can't be controlled from either the Services application in Administrative Tools or  SQL Server 
 Configuration Manager. This argument is mandatory.

#### -v

Indicates that  SQL Server 
 Agent runs in verbose mode and writes diagnostic information to the command-prompt window. The diagnostic information is the same as the information written to the  SQL Server 
 Agent error log.

#### -i *instance_name*

Indicates that  SQL Server 
 Agent connects to the named  SQL Server 
 instance specified by *instance_name*.

## Remarks

After it displays a copyright message, **sqlagent** displays output in the command prompt window only when the `-v` switch is specified. To stop **sqlagent**, press **Ctrl**+**C** at the command prompt. Don't close the command-prompt window before stopping **sqlagent**.

## Related content

- [Automated Administration Tasks (SQL Server Agent)](https://learn.microsoft.com/ssms/agent/automated-administration-tasks-sql-server-agent)
