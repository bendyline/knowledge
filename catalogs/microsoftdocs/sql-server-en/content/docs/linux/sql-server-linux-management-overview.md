---
title: Manage SQL Server on Linux
description: This article provides links to common management tasks and tools for SQL Server running on Linux.
author: rwestMSFT
ms.author: randolphwest
ms.date: 05/07/2026
ms.service: sql
ms.subservice: linux
ms.topic: concept-article
ms.custom:
  - linux-related-content
monikerRange: ">=sql-server-linux-2017 || >=sql-server-2017"
---
# Choose the right tool to manage SQL Server on Linux


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Linux


There are several ways to manage  SQL Server 
 on Linux. The following section provides a quick overview of different management tools and techniques with pointers to more resources.

## mssql-conf

The **`mssql-conf`** tool configures  SQL Server 
 on Linux. For more information, see [Configure SQL Server on Linux with the mssql-conf tool](configure/mssql-conf.md).

## Transact-SQL

Almost everything you can do in a client tool can also be accomplished with Transact-SQL (T-SQL) statements.  SQL Server 
 provides [System dynamic management views](../relational-databases/system-dynamic-management-objects/system-dynamic-management-objects.md) that query the status and configuration of  SQL Server 
. There are also [T-SQL commands](../t-sql/language-reference.md) for database management tasks. You can run these commands in any client tool that supports connecting to  SQL Server 
 and running T-SQL queries, for example [sqlcmd](../tools/sqlcmd/sqlcmd-use-utility.md) or [Visual Studio Code](../tools/visual-studio-code-extensions/mssql/mssql-run-first-query.md).

## MSSQL extension for Visual Studio Code

Visual Studio Code is a cross-platform tool, and you can install the MSSQL extension to manage SQL Server. For more information, see [MSSQL extension for Visual Studio Code](../tools/visual-studio-code-extensions/mssql/mssql-extension-visual-studio-code.md).

## Named Pipes

The Named Pipes protocol isn't supported for  SQL Server 
 on Linux.

## SQL Server Management Studio on Windows

SQL Server Management Studio (SSMS) is a Windows application that provides a graphical user interface for managing  SQL Server 
. SSMS runs only on Windows, but you can use it to remotely connect to your Linux  SQL Server 
 instances. For more information on using SSMS to manage  SQL Server 
, see [Use SQL Server Management Studio on Windows to manage SQL Server on Linux](sql-server-linux-manage-ssms.md).

## PowerShell

PowerShell provides a rich command-line environment to manage  SQL Server 
 on Linux. For more information, see [Use PowerShell on Windows to manage SQL Server on Linux](sql-server-linux-manage-powershell.md).

## Related content

- [What is SQL Server on Linux?](sql-server-linux-overview.md)
- [Start, stop, and restart SQL Server services on Linux](sql-server-linux-start-stop-restart-sql-server-services.md)
