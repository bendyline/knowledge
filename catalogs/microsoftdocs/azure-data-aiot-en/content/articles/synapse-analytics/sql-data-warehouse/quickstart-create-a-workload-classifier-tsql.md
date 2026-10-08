---
title: "Quickstart: Create a workload classifier - T-SQL"
description: Use T-SQL to create a workload classifier with high importance.
author: ajagadish-24
ms.author: ajagadish
ms.date: 02/04/2020
ms.service: azure-synapse-analytics
ms.subservice: sql-dw
ms.topic: quickstart
ms.custom:
  - azure-synapse
  - mode-other
  - sfi-ropc-nochange
---

# Quickstart: Create a workload classifier using T-SQL

> **Tip:**
> [Microsoft Fabric Data Warehouse](https://learn.microsoft.com/fabric/data-warehouse) is an enterprise scale relational warehouse on a data lake foundation, with a future-ready architecture, built-in AI, and new features. If you're new to data warehousing, start with Fabric Data Warehouse. Existing [dedicated SQL pool workloads can upgrade to Fabric](https://learn.microsoft.com/fabric/data-warehouse/migration-synapse-dedicated-sql-pool-warehouse) to access new capabilities across data science, real-time analytics, and reporting.
> 
> - [Start a Fabric free trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
> - [Migration Assistant for Fabric Data Warehouse](https://learn.microsoft.com/fabric/data-warehouse/migration-assistant).

In this quickstart, you'll quickly create a workload classifier with high importance for the CEO of your organization. This workload classifier will allow CEO queries to take precedence over other queries with lower importance in the queue.

If you don't have an Azure subscription, create a [free Azure account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.

> **Note:**
> Creating a dedicated SQL pool instance in Azure Synapse Analytics may result in a new billable service.  For more information, see [Azure Synapse Analytics pricing](https://azure.microsoft.com/pricing/details/sql-data-warehouse/).
>
>

## Prerequisites

This quickstart assumes you have already provisioned a dedicated SQL pool in Azure Synapse Analytics and that you have CONTROL DATABASE permissions. If you need to create one, use [Create and Connect - portal](create-data-warehouse-portal.md) to create a dedicated SQL pool called **mySampleDataWarehouse**.

## Sign in to the Azure portal

Sign in to the [Azure portal](https://portal.azure.com/).

## Create login for TheCEO

Create a SQL Server authentication login in the `master` database using [CREATE LOGIN](https://learn.microsoft.com/sql/t-sql/statements/create-login-transact-sql?toc=/azure/synapse-analytics/sql-data-warehouse/toc.json\&bc=/azure/synapse-analytics/sql-data-warehouse/breadcrumb/toc.json\&view=azure-sqldw-latest\&preserve-view=true) for 'TheCEO'.

```sql
IF NOT EXISTS (SELECT * FROM sys.sql_logins WHERE name = 'TheCEO')
BEGIN
CREATE LOGIN [TheCEO] WITH PASSWORD='<strongpassword>'
END
;
```

## Create user

[Create user](https://learn.microsoft.com/sql/t-sql/statements/create-user-transact-sql?toc=/azure/synapse-analytics/sql-data-warehouse/toc.json\&bc=/azure/synapse-analytics/sql-data-warehouse/breadcrumb/toc.json\&view=azure-sqldw-latest\&preserve-view=true), "TheCEO", in mySampleDataWarehouse

```sql
IF NOT EXISTS (SELECT * FROM sys.database_principals WHERE name = 'THECEO')
BEGIN
CREATE USER [TheCEO] FOR LOGIN [TheCEO]
END
;
```

## Create a workload classifier

Create a [workload classifier](https://learn.microsoft.com/sql/t-sql/statements/create-workload-classifier-transact-sql?toc=/azure/synapse-analytics/sql-data-warehouse/toc.json\&bc=/azure/synapse-analytics/sql-data-warehouse/breadcrumb/toc.json\&view=azure-sqldw-latest\&preserve-view=true) for "TheCEO" with high importance.

```sql
DROP WORKLOAD CLASSIFIER [wgcTheCEO];
CREATE WORKLOAD CLASSIFIER [wgcTheCEO]
WITH (WORKLOAD_GROUP = 'xlargerc'
      ,MEMBERNAME = 'TheCEO'
      ,IMPORTANCE = HIGH);
```

## View existing classifiers

```sql
SELECT * FROM sys.workload_management_workload_classifiers
```

## Clean up resources

```sql
DROP WORKLOAD CLASSIFIER [wgcTheCEO]
DROP USER [TheCEO]
;
```

You're being charged for data warehouse units and data stored in your dedicated SQL pool. These compute and storage resources are billed separately.

- If you want to keep the data in storage, you can pause compute when you aren't using the dedicated SQL pool. By pausing compute, you're only charged for data storage. When you're ready to work with the data, resume compute.
- If you want to remove future charges, you can delete the dedicated SQL pool.

Follow these steps to clean up resources.

1. Sign in to the [Azure portal](https://portal.azure.com), select your dedicated SQL pool.

    Clean up resources

2. To pause compute, select the **Pause** button. When the dedicated SQL pool is paused, you see a **Start** button.  To resume compute, select **Start**.

3. To remove the dedicated SQL pool so you're not charged for compute or storage, select **Delete**.

## Next steps

- You've now created a workload classifier. Run a few queries as TheCEO to see how they perform. See [sys.dm_pdw_exec_requests](https://learn.microsoft.com/sql/relational-databases/system-dynamic-management-views/sys-dm-pdw-exec-requests-transact-sql?toc=/azure/synapse-analytics/sql-data-warehouse/toc.json\&bc=/azure/synapse-analytics/sql-data-warehouse/breadcrumb/toc.json\&view=azure-sqldw-latest\&preserve-view=true) to view queries and the importance assigned.
- For more information about dedicated SQL pool workload management, see [Workload Importance](sql-data-warehouse-workload-importance.md) and [Workload Classification](sql-data-warehouse-workload-classification.md).
- See the how-to articles to [Configure Workload Importance](sql-data-warehouse-how-to-configure-workload-importance.md) and how to [Manage and monitor Workload Management](sql-data-warehouse-how-to-manage-and-monitor-workload-importance.md).
