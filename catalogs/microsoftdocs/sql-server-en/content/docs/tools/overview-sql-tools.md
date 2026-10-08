---
title: SQL Tools Overview
description: SQL query and management tools for SQL Server, Azure SQL (Azure SQL database, Azure SQL managed instance, SQL virtual machines), and Azure Synapse Analytics.
author: rwestMSFT
ms.author: randolphwest
ms.reviewer: erinstellato, iqrashaikh, mbarickman, drskwier, roblescarlos
ms.date: 03/09/2026
ms.service: sql
ms.subservice: tools-other
ms.topic: overview
ms.collection:
  - data-tools
ms.custom:
  - ignite-2025
ai-usage: ai-assisted
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =fabric-sqldb"
---

# SQL tools overview


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
](../sql-server/sql-docs-navigation-guide.md#applies-to)



To manage your database, you need a tool. Whether your databases run in the cloud, on Windows, on macOS, or on [Linux](../linux/sql-server-linux-overview.md), your tool doesn't need to run on the same platform as the database.

## Free tools for your business case

 Microsoft 
 provides the following free tools and extensions to work with our [ SQL Server Database Engine 
](../database-engine/sql-database-engine.md) products, based on your business role and function.


### [Database administrator (DBA)](#tab/dba)

The **database administrator (DBA)** manages backup and restore, performance tuning, security, and high availability.

Recommended tools:

- **[SQL Server Management Studio (SSMS)](overview-sql-tools.md#ssms)**: Full-featured management with a graphical user interface
- **[MSSQL extension for Visual Studio Code](overview-sql-tools.md#mssql)**: Lightweight tasks and scripting
- **[sqlcmd](overview-sql-tools.md#sqlcmd)**: Lightweight command-line interface (CLI) for deployment and automation
- **[SQL Database Projects extension for Visual Studio Code](overview-sql-tools.md#projects)**: Manage and develop database schema in projects in source control
- **[SQL Server Migration Assistant (SSMA)](overview-sql-tools.md#ssma)**: Migrate to SQL Server and Azure SQL from Microsoft Access, Db2, MySQL, Oracle, and Sybase


### [Developer](#tab/dev)

The **database/application developer** writes Transact-SQL queries, debugs stored procedures, and integrates data access in applications.

Recommended tools:

- **[MSSQL extension for Visual Studio Code](overview-sql-tools.md#mssql)**: Connect, manage database schemas, and run queries directly in Visual Studio Code
- **[SQL Database Projects extension for Visual Studio Code](overview-sql-tools.md#projects)**: Manage and develop database schema in projects in source control
- **[SQL Server Management Studio (SSMS)](overview-sql-tools.md#ssms)**: Create objects, run queries, and perform lightweight tasks
- **[SQL Server Data Tools (SSDT)](overview-sql-tools.md#ssdt)** for Visual Studio: Schema and project-based development
- **[.NET libraries](https://learn.microsoft.com/azure/azure-sql/database/connect-query-dotnet-core)**: Programmatic access using libraries such as `Microsoft.Data.SqlClient`
- **[Data API builder](https://learn.microsoft.com/azure/data-api-builder/)**: Connect apps to the database over [automatic REST](https://learn.microsoft.com/azure/data-api-builder/concept/rest/overview) or [GraphQL endpoints](https://learn.microsoft.com/azure/data-api-builder/concept/graphql/overview).
- **[SQL MCP Server](https://learn.microsoft.com/azure/data-api-builder/mcp/overview)**: Connect custom and [Foundry agents](https://learn.microsoft.com/azure/data-api-builder/mcp/quickstart-azure-ai-foundry) to the database with a secure MCP Server.

### [Data analyst](#tab/analyst)

The **data analyst** runs queries and generates reports.

Recommended tools:

- **[SQL Server Management Studio (SSMS)](overview-sql-tools.md#ssms)**: Run queries and perform lightweight tasks
- **[sqlcmd](overview-sql-tools.md#sqlcmd)**: Lightweight CLI for automation
- **[MSSQL extension for Visual Studio Code](overview-sql-tools.md#mssql)**: Lightweight tasks and scripting

### [Data engineer](#tab/engineer)

The **data engineer** manages extract-transform-load (ETL) or extract-load-transform (ELT) pipelines, bulk data imports, and data flows.

Recommended tools:

- **[bcp](overview-sql-tools.md#bcp)**: Bulk copy data
- **[SqlPackage](overview-sql-tools.md#sqlpackage)**: Deploy DACPACs

---


## Description and use case examples

The following table lists available tools and extensions.

| Tool | Description | Operating system | Feedback |
| --- | --- | --- | --- |
| **Graphical&nbsp;tools** |  |  |
| <a id="ssms"></a> **[SQL Server Management Studio (SSMS)](https://learn.microsoft.com/ssms/install/install)** | Manage SQL Server and Azure SQL databases with full GUI support. Access, configure, manage, administer, and develop all components of the [SQL Database Engine](../database-engine/sql-database-engine.md) on-premises and the cloud, including Azure Synapse Analytics and SQL database for Microsoft Fabric. SSMS is a comprehensive application that combines a broad group of graphical tools and a rich script editor to provide access to SQL for database administrators and developers of all skill levels. | Windows only | [Feedback](https://aka.ms/ssms-feedback) |
| <a id="ssdt"></a> **[SQL Server Data Tools (SSDT)](../ssdt/download-sql-server-data-tools-ssdt.md)** | A modern development tool for building SQL Server relational databases, Azure SQL databases, Analysis Services (AS) data models, Integration Services (IS) packages, and Reporting Services (RS) reports. With SQL Server Data tools (SSDT), you can design and deploy any SQL Server content type with the same ease as you would develop an application in **[Visual Studio](https://visualstudio.microsoft.com/downloads/)**. | Windows only | [Feedback](https://aka.ms/vs-feedback) |
| <a id="mssql"></a> **[MSSQL extension for Visual Studio Code](visual-studio-code-extensions/mssql/mssql-extension-visual-studio-code.md)** | The official SQL Server extension that supports connections to SQL Server and Azure SQL, and a rich editing experience for Transact-SQL (T-SQL). Write T-SQL scripts in a lightweight editor. | Windows, macOS, Linux | [Feedback](https://github.com/microsoft/vscode-mssql) |
| <a id="projects"></a> **[SQL Database Projects extension for Visual Studio Code](visual-studio-code-extensions/sql-database-projects/sql-database-projects-extension.md)** | Manage and develop databases as projects in source control in Visual Studio Code. The SQL Database Projects extension uses the [DacFx (Data-Tier Application Framework) package](https://learn.microsoft.com/sql/tools/sqlpackage/sqlpackage) to build and publish database projects, compare schemas, script changes, and extract or deploy `.dacpac` files. | Windows, macOS, Linux | [Feedback](https://github.com/microsoft/vscode-mssql) |
| <a id="ads"></a> **[Azure Data Studio](https://learn.microsoft.com/azure-data-studio/download-azure-data-studio)** | **Azure Data Studio is retiring on February 28, 2026.** | Windows, macOS, Linux |  |
| **Command-line&nbsp;utilities** |  |  |  |
| <a id="bcp"></a> **[bcp utility](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/tools/bcp-utility.md)** | The **b**ulk **c**opy **p**rogram utility (**bcp**) bulk copies data between an instance of  SQL Server |
 | and a data file in a user-specified format. | Windows, macOS, Linux |  |
| <a id="mssql-conf"></a> **[mssql-conf](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/linux/sql-server-linux-configure-mssql-conf.md)** | **mssql-conf** configures SQL Server running on Linux or Linux containers. | Linux only |  |
| <a id="sqlcmd"></a> **[sqlcmd utility](sqlcmd/sqlcmd-utility.md)** | **sqlcmd** lets you enter Transact-SQL statements, system procedures, and script files at the command prompt. With sqlcmd (Go), you can also deploy Linux containers for development purposes. | Windows, macOS, Linux | [Feedback](https://github.com/microsoft/go-sqlcmd) |
| <a id="sqlpackage"></a> **[SqlPackage](sqlpackage/sqlpackage.md)** | **sqlpackage** is a command-line utility that automates several database development tasks. | Windows, macOS, Linux | [Feedback](https://github.com/microsoft/dacfx) |
| <a id="powershell"></a> **[SQL Server PowerShell](https://learn.microsoft.com/powershell/sql-server/sql-server-powershell)** | **SQL Server PowerShell** provides cmdlets for working with SQL. | Windows, macOS, Linux | [Feedback](https://github.com/microsoft/SqlServerPSModule) |

## Migration, configuration, and other tools

The following table lists tools that are used to migrate, configure, and provide other features for SQL databases.

These tools are available for Windows only.

| Tool | Description |
| --- | --- |
| <a id="sscm"></a> **[SQL Server Configuration Manager](configuration-manager/sql-server-configuration-manager-help.md)** | Use SQL Server Configuration Manager to configure SQL Server services and configure network connectivity. |
| <a id="dreplay"></a> **[Distributed Replay](distributed-replay/install-distributed-replay.md)** <sup>1</sup> | Use the Distributed Replay feature to help you assess the impact of future SQL Server upgrades. Also use Distributed Replay to help assess the impact of hardware and operating system upgrades, and SQL Server tuning. |
| <a id="ssbdiagnose"></a> **[ssbdiagnose](ssbdiagnose/ssbdiagnose-utility-service-broker.md)** | **ssbdiagnose** reports issues in Service Broker conversations or the configuration of Service Broker services. |
| <a id="ssma"></a> **[SQL Server Migration Assistant (SSMA)](../ssma/sql-server-migration-assistant.md)** | Use SQL Server Migration Assistant to automate database migration to SQL Server and Azure SQL from Microsoft Access, Db2, MySQL, Oracle, and Sybase. |

<sup>1</sup> Distributed Replay is supported on  SQL Server 2016 (13.x) 
 through  SQL Server 2019 (15.x) 
 only.

## Product roadmaps and feedback

- [Feedback: SQL database in Microsoft Fabric](https://community.fabric.microsoft.com/t5/Fabric-Ideas/idb-p/fbc_ideas/label-name/databases%20%7C%20sql%20database)
- [Feedback: SQL Server Management Studio](https://aka.ms/ssms-feedback)
- [Feedback: SQL Server](https://feedback.azure.com/d365community/forum/04fe6ee0-3b25-ec11-b6e6-000d3a4f0da0)
- [Feedback: SqlPackage and DacFx](https://github.com/microsoft/dacfx)
- [Feedback: sql-action GitHub action](https://github.com/azure/sql-action)
- [Roadmap: MSSQL extension for Visual Studio Code](https://github.com/microsoft/vscode-mssql/wiki/roadmap)
- [Roadmap: SQL Server Management Studio](https://learn.microsoft.com/ssms/roadmap)
- [What's happening with Azure Data Studio](whats-happening-azure-data-studio.md)

## Additional tools

If you're looking for other tools that aren't mentioned in this article, see:

- [SQL command-line utilities (Database Engine)](command-prompt-utility-reference-database-engine.md)
- [Download SQL Server extended features and tools](download-sql-feature-packs.md)

## Related content

- [SQL Server](https://learn.microsoft.com/sql/sql-server/)
- [Azure SQL Database](https://learn.microsoft.com/azure/azure-sql/database/)
- [Azure Database for PostgreSQL](https://learn.microsoft.com/azure/postgresql/)
- [Azure Database for MySQL](https://learn.microsoft.com/azure/mysql/)
- [Azure Cosmos DB](https://learn.microsoft.com/azure/cosmos-db/introduction)
- [SQL database in Microsoft Fabric](https://learn.microsoft.com/fabric/database/sql/overview)
