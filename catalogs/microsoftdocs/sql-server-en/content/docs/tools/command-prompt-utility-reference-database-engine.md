---
title: "SQL Command-Line Utilities (Database Engine)"
description: Command prompt utilities enable you to script SQL Server operations. This article lists many command-line utilities that ship with SQL Server.
author: rwestMSFT
ms.author: randolphwest
ms.reviewer: maghan
ms.date: 12/16/2025
ms.service: sql
ms.subservice: tools-other
ms.topic: concept-article
ms.collection:
  - data-tools
helpviewer_keywords:
  - "command prompt utilities [SQL Server]"
  - "command prompt utilities [SQL Server], about command prompt utilities"
  - "command prompt [SQL Server]"
  - "utilities [SQL Server], command prompt"
  - "command prompt [SQL Server], utilities"
  - "command-line utilities [SQL Server]"
  - "command-line utilities [SQL Server], about command-line utilities"
  - "command-line [SQL Server]"
  - "utilities [SQL Server], command-line"
  - "command-line [SQL Server], utilities"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017"
---

# SQL command-line utilities (Database Engine)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





Command-line utilities enable you to script  SQL Server Database Engine 
 operations. The following table contains a list of several command-line utilities that ship with  SQL Server 
.

For information on the *main* SQL graphical and command-line tools, see [SQL tools overview](overview-sql-tools.md).

| Utility | Description | Installed in |
| --- | --- | --- |
| [bcp](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/tools/bcp-utility.md) | Used to copy data between an instance of  SQL Server |
 | and a data file in a user-specified format. | `<drive>:\Program Files\Microsoft SQL Server\Client SDK\ODBC\110\Tools\Binn` |
| [dta](dta/dta-utility.md) | Used to analyze a workload and recommend physical design structures to optimize server performance for that workload. | `<drive>:\Program Files\Microsoft SQL Server\<nnn>\Tools\Binn` |
| [dtexec](../integration-services/packages/dtexec-utility.md) | Used to configure and execute an  Integration Services |
 | package. A user interface version of this command-line utility is called **DTExecUI**, which brings up the Execute Package Utility. | `<drive>:\Program Files\Microsoft SQL Server\<nnn>\DTS\Binn` |
| [dtutil](../integration-services/dtutil-utility.md) | Used to manage SQL Server Integration Services (SSIS) packages. | `<drive>:\Program Files\Microsoft SQL Server\<nnn>\DTS\Binn` |
| [Deploy Model Solutions with the Deployment](https://learn.microsoft.com/analysis-services/multidimensional-models/deploy-model-solutions-with-the-deployment-utility) | Used to deploy  Analysis Services |
 | projects to instances of  Analysis Services |
| . | `<drive>:\Program Files\Microsoft SQL Server\<nnn>\Tools\Binn\VShell\Common7\IDE` |
| [osql](osql-utility.md) | Allows you to enter  Transact-SQL  statements, system procedures, and script files at the command prompt. | `<drive>:\Program Files\Microsoft SQL Server\<nnn>\Tools\Binn` |
| [Profiler](profiler-utility.md) | Used to start  SQL Server Profiler |
 | from a command prompt. | `<drive>:\Program Files\Microsoft SQL Server\<nnn>\Tools\Binn` |
| [RS.exe (SSRS)](../reporting-services/tools/rs-exe-utility-ssrs.md) | Used to run scripts designed for managing  Reporting Services |
 | report servers. | `<drive>:\Program Files\Microsoft SQL Server\<nnn>\Tools\Binn` |
| [rsconfig (SSRS)](../reporting-services/tools/rsconfig-utility-ssrs.md) | Used to configure a report server connection. | `<drive>:\Program Files\Microsoft SQL Server\<nnn>\Tools\Binn` |
| [rskeymgmt (SSRS)](../reporting-services/tools/rskeymgmt-utility-ssrs.md) | Used to manage encryption keys on a report server. | `<drive>:\Program Files\Microsoft SQL Server\<nnn>\Tools\Binn` |
| [sqlagent application](sqlagent-application.md) | Used to start  SQL Server |
 | Agent from a command prompt. | `<drive>:\Program Files\Microsoft SQL Server\<instance_name>\MSSQL\Binn` |
| [sqlcmd](sqlcmd/sqlcmd-utility.md) | Allows you to enter  Transact-SQL  statements, system procedures, and script files at the command prompt. | `<drive>:\Program Files\Microsoft SQL Server\Client SDK\ODBC\110\Tools\Binn` |
| [SQLdiag](sqldiag-utility.md) | Used to collect diagnostic information for Customer Service and Support. | `<drive>:\Program Files\Microsoft SQL Server\<nnn>\Tools\Binn` |
| [sqllogship](sqllogship-application.md) | Used by applications to perform backup, copy, and restore operations and associated clean-up tasks for a log shipping configuration, without running the backup, copy, and restore jobs. | `<drive>:\Program Files\Microsoft SQL Server\<nnn>\Tools\Binn` |
| [SqlLocalDB](sqllocaldb-utility.md) | An execution mode of  SQL Server |
 | targeted to program developers. | `<drive>:\Program Files\Microsoft SQL Server\<nnn>\Tools\Binn` |
| [sqlmaint](sqlmaint-utility.md) | Used to execute database maintenance plans created in previous versions of  SQL Server |
| . | `<drive>:\Program Files\Microsoft SQL Server\<nnn>\MSSQL\Binn` |
| [sqlps](sqlps-utility.md) | Used to run PowerShell commands and scripts. Loads and registers the  SQL Server |
 | PowerShell provider and cmdlets. | `<drive>:\Program Files\Microsoft SQL Server\<nnn>\Tools\Binn` |
| [sqlservr](sqlservr-application.md) | Used to start and stop an instance of  Database Engine |
 | from the command prompt for troubleshooting. | `<drive>:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\Binn` |
| [ssms](https://learn.microsoft.com/ssms/ssms-utility) | Used to start  SQL Server Management Studio |
 | from a command prompt. | `<drive>:\Program Files\Microsoft SQL Server\<nnn>\Tools\Binn\VSShell\Common7\IDE` |
| [tablediff](tablediff-utility.md) | Used to compare the data in two tables for nonconvergence, which is useful when troubleshooting a replication topology. | `<drive>:\Program Files\Microsoft SQL Server\<nnn>\COM` |

## Command-line utilities syntax conventions

| Convention | Used for |
| --- | --- |
| UPPERCASE | Statements and terms used at the operating system level. |
| `monospace` | Sample commands and program code. |
| *italic* | User-supplied parameters. |
| **bold** | Commands, parameters, and other syntax that must be typed exactly as shown. |

## Related content

- [Replication Distribution Agent](../relational-databases/replication/agents/replication-distribution-agent.md)
- [Replication Log Reader Agent](../relational-databases/replication/agents/replication-log-reader-agent.md)
- [Replication Merge Agent](../relational-databases/replication/agents/replication-merge-agent.md)
- [Replication Queue Reader Agent](../relational-databases/replication/agents/replication-queue-reader-agent.md)
- [Replication Snapshot Agent](../relational-databases/replication/agents/replication-snapshot-agent.md)
