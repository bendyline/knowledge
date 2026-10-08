---
title: Connect with sqlcmd
description: Use sqlcmd command-line utility to connect to and query a dedicated SQL pool in Azure Synapse Analytics.
author: joannapea
ms.author: joanpo

ms.date: 04/17/2018
ms.service: azure-synapse-analytics
ms.subservice: sql-dw
ms.topic: quickstart
ms.custom:
  - azure-synapse
---

# Connect to a dedicated SQL pool in Azure Synapse Analytics with sqlcmd

> **Tip:**
> [Microsoft Fabric Data Warehouse](https://learn.microsoft.com/fabric/data-warehouse) is an enterprise scale relational warehouse on a data lake foundation, with a future-ready architecture, built-in AI, and new features. If you're new to data warehousing, start with Fabric Data Warehouse. Existing [dedicated SQL pool workloads can upgrade to Fabric](https://learn.microsoft.com/fabric/data-warehouse/migration-synapse-dedicated-sql-pool-warehouse) to access new capabilities across data science, real-time analytics, and reporting.
> 
> - [Start a Fabric free trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
> - [Migration Assistant for Fabric Data Warehouse](https://learn.microsoft.com/fabric/data-warehouse/migration-assistant).

> 
>
> * [Power BI](https://learn.microsoft.com/power-bi/connect-data/service-azure-sql-data-warehouse-with-direct-connect)
> * [Azure Machine Learning](sql-data-warehouse-get-started-analyze-with-azure-machine-learning.md)
> * [Visual Studio](sql-data-warehouse-query-visual-studio.md)
> * [sqlcmd](sql-data-warehouse-get-started-connect-sqlcmd.md)
> * [SSMS](sql-data-warehouse-query-ssms.md)

Use the [sqlcmd][sqlcmd] command-line utility to connect to and query a dedicated SQL pool.  

## 1. Connect

To get started with [sqlcmd][sqlcmd], open the command prompt and enter **sqlcmd** followed by the connection string for your dedicated SQL pool. The connection string requires the following parameters:

* **Server (-S):** Server in the form `<`Server Name`>`.database.windows.net
* **Database (-d):** dedicated SQL pool name.
* **Enable Quoted Identifiers (-I):** Quoted identifiers must be enabled to connect to a dedicated SQL pool instance.

To use SQL Server Authentication, you need to add the username/password parameters:

* **User (-U):** Server user in the form `<`User`>`
* **Password (-P):** Password associated with the user.

For example, your connection string might look like the following:

```sql
C:\>sqlcmd -S MySqlDw.database.windows.net -d Adventure_Works -U myuser -P myP@ssword -I
```

To use Microsoft Entra integrated authentication, you need to add the Microsoft Entra parameters:

* **Microsoft Entra authentication (-G):** use Microsoft Entra ID for authentication

For example, your connection string might look like the following:

```sql
C:\>sqlcmd -S MySqlDw.database.windows.net -d Adventure_Works -G -I
```

> **Note:**
> You need to [enable Microsoft Entra authentication](sql-data-warehouse-authentication.md) to authenticate using Microsoft Entra ID.

## 2. Query

After connection, you can issue any supported Transact-SQL statements against the instance.  In this example, queries are submitted in interactive mode.

```sql
C:\>sqlcmd -S MySqlDw.database.windows.net -d Adventure_Works -U myuser -P myP@ssword -I
1> SELECT name FROM sys.tables;
2> GO
3> QUIT
```

These next examples show how you can run your queries in batch mode using the -Q option or piping your SQL to sqlcmd.

```sql
sqlcmd -S MySqlDw.database.windows.net -d Adventure_Works -U myuser -P myP@ssword -I -Q "SELECT name FROM sys.tables;"
```

```sql
"SELECT name FROM sys.tables;" | sqlcmd -S MySqlDw.database.windows.net -d Adventure_Works -U myuser -P myP@ssword -I > .\tables.out
```

## Next steps

For more about details about the options available in sqlcmd, see [sqlcmd documentation](https://learn.microsoft.com/sql/tools/sqlcmd-utility?toc=/azure/synapse-analytics/sql-data-warehouse/toc.json\&bc=/azure/synapse-analytics/sql-data-warehouse/breadcrumb/toc.json\&view=azure-sqldw-latest\&preserve-view=true).
