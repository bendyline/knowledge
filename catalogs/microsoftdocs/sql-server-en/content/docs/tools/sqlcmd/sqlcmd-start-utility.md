---
title: Start the sqlcmd Utility
description: Learn how to start the sqlcmd utility, which lets you enter Transact-SQL statements, system procedures, and script files, in SQLCMD mode or in scripts and jobs.
author: rwestMSFT
ms.author: randolphwest
ms.reviewer: mahyon
ms.date: 07/02/2025
ms.service: sql
ms.subservice: tools-other
ms.topic: how-to
ms.collection:
  - data-tools
ms.custom:
  - ignite-2025
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---
# Start the sqlcmd utility


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



The [sqlcmd utility](sqlcmd-utility.md) lets you enter Transact-SQL statements, system procedures, and script files at the command prompt, in [SQLCMD mode](https://learn.microsoft.com/ssms/scripting/sqlcmd-scripts-query-editor) in [SQL Server Management Studio](https://learn.microsoft.com/ssms/sql-server-management-studio-ssms), and in a Windows script file or in [an operating system (Cmd.exe) job step](https://learn.microsoft.com/ssms/agent/create-a-cmdexec-job-step) of a SQL Server Agent job.

> **Note:**  
> Windows Authentication is the default authentication mode for **sqlcmd**. To use SQL Server Authentication, you must specify a user name and password by using the `-U` and `-P` options.

By default,  SQL Server Express 
 installs as the named instance `sqlexpress`.

## Start the sqlcmd utility and connect to a default instance of SQL Server

1. On the Start menu, select **Run**. In the **Open** box type **cmd**, and then select **OK** to open a Command Prompt window. (If you haven't connected to this instance of the  SQL Server Database Engine 
 before, you might have to configure  SQL Server 
 to accept connections.)

1. At the command prompt, type `sqlcmd`.

1. Press `ENTER`.

     You now have a trusted connection to the default instance of  SQL Server 
 that is running on your computer.

     `1>` is the **sqlcmd** prompt that specifies the line number. Each time you press `ENTER`, the number increases by one.

1. To end the **sqlcmd** session, type `EXIT` at the **sqlcmd** prompt.

## Start the sqlcmd utility and connect to a named instance of SQL Server

1. Open a Command Prompt window, and type `sqlcmd -S<myServer\instanceName>`. Replace `<myServer\instanceName>` with the name of the computer and the instance of the  SQL Server Database Engine 
 that you want to connect to.

1. Press `ENTER`.

   The **sqlcmd** prompt (`1>`) indicates that you're connected to the specified instance of  SQL Server 
.

   The Transact-SQL statements you enter are stored in a buffer. They're executed as a batch when the `GO` command is encountered.

## Related content

- [Edit SQLCMD scripts with Query Editor](https://learn.microsoft.com/ssms/scripting/sqlcmd-scripts-query-editor)
- [Execute T-SQL from a script file with sqlcmd](sqlcmd-run-transact-sql-script-files.md)
- [Use sqlcmd](sqlcmd-use-utility.md)
- [SQL Server Utilities Statements - GO](../../t-sql/language-elements/sql-server-utilities-statements-go.md)
