---
title: "Quickstart: Create and query a dedicated SQL pool (formerly SQL DW) (Azure portal)"
description: Create and query a dedicated SQL pool (formerly SQL DW) using the Azure portal
author: pimorano
ms.author: pimorano

ms.date: 02/21/2023
ms.service: azure-synapse-analytics
ms.subservice: sql-dw
ms.topic: quickstart
ms.custom:
  - azure-synapse
  - mode-ui
  - sfi-image-nochange
---

# Quickstart: Create and query a dedicated SQL pool (formerly SQL DW) in Azure Synapse Analytics  using the Azure portal

> **Tip:**
> [Microsoft Fabric Data Warehouse](https://learn.microsoft.com/fabric/data-warehouse) is an enterprise scale relational warehouse on a data lake foundation, with a future-ready architecture, built-in AI, and new features. If you're new to data warehousing, start with Fabric Data Warehouse. Existing [dedicated SQL pool workloads can upgrade to Fabric](https://learn.microsoft.com/fabric/data-warehouse/migration-synapse-dedicated-sql-pool-warehouse) to access new capabilities across data science, real-time analytics, and reporting.
> 
> - [Start a Fabric free trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
> - [Migration Assistant for Fabric Data Warehouse](https://learn.microsoft.com/fabric/data-warehouse/migration-assistant).

Quickly create and query a dedicated SQL pool (formerly SQL DW) in Azure Synapse Analytics using the Azure portal.

> **Important:**  
> This quickstart helps you to create a dedicated SQL pool (formerly SQL DW). To create a dedicated SQL pool in Azure Synapse Analytics workspace and take advantage of the latest features and integration in your Azure Synapse Analytics workspace, instead use [Quickstart: Create a dedicated SQL pool using Synapse Studio](../quickstart-create-sql-pool-studio.md).

## Prerequisites

1. If you don't have an Azure subscription, create a [free Azure account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.

   > **Note:**  
   > Creating a dedicated SQL pool (formerly SQL DW) in Azure Synapse may result in a new billable service. For more information, see [Azure Synapse Analytics pricing](https://azure.microsoft.com/pricing/details/synapse-analytics/).

1. Download and install the newest version of [SQL Server Management Studio (SSMS)](https://learn.microsoft.com/sql/ssms/download-sql-server-management-studio-ssms?toc=/azure/synapse-analytics/sql-data-warehouse/toc.json\&bc=/azure/synapse-analytics/sql-data-warehouse/breadcrumb/toc.json\&view=azure-sqldw-latest\&preserve-view=true). Note: SSMS is only available on Windows based platforms, see the [full list of supported platforms](https://learn.microsoft.com/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver15\&preserve-view=true#supported-operating-systems-ssms-185t).

## Sign in to the Azure portal

Sign in to the [Azure portal](https://portal.azure.com/).

## Create a SQL pool

Data warehouses are created using dedicated SQL pool (formerly SQL DW) in Azure Synapse Analytics. A dedicated SQL pool (formerly SQL DW) is created with a defined set of [compute resources](memory-concurrency-limits.md). The database is created within an [Azure resource group](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/overview.md?toc=/azure/synapse-analytics/sql-data-warehouse/toc.json\&bc=/azure/synapse-analytics/sql-data-warehouse/breadcrumb/toc.json) and in a [logical SQL server](../sql/logical-servers.md).

Follow these steps to create a dedicated SQL pool (formerly SQL DW) that contains the `AdventureWorksDW` sample data.

1. Select **Create a resource** in the upper left-hand corner of the Azure portal.

   A screenshot of the Azure portal. Create a resource in Azure portal.

1. In the search bar, type "dedicated SQL pool" and select dedicated SQL pool (formerly SQL DW). Select **Create** on the page that opens.

   A screenshot of the Azure portal. Create an empty data warehouse.

1. In **Basics**, provide your subscription, resource group, dedicated SQL pool (formerly SQL DW) name, and server name:

   | Setting | Suggested value | Description  |
   | :--- | :--- | :--- |
   | **Subscription** | Your subscription | For details about your subscriptions, see [Subscriptions](https://account.windowsazure.com/Subscriptions). |
   | **Resource group** | myResourceGroup | For valid resource group names, see [Naming rules and restrictions](https://learn.microsoft.com/azure/architecture/best-practices/resource-naming?toc=/azure/synapse-analytics/sql-data-warehouse/toc.json\&bc=/azure/synapse-analytics/sql-data-warehouse/breadcrumb/toc.json). |
   | **SQL pool name** | Any globally unique name (An example is *mySampleDataWarehouse*) | For valid database names, see [Database Identifiers](https://learn.microsoft.com/sql/relational-databases/databases/database-identifiers?toc=/azure/synapse-analytics/sql-data-warehouse/toc.json\&bc=/azure/synapse-analytics/sql-data-warehouse/breadcrumb/toc.json\&view=azure-sqldw-latest\&preserve-view=true). |
   | **Server** | Any globally unique name | Select existing server, or create a new server name, select **Create new**. For valid server names, see [Naming rules and restrictions](https://learn.microsoft.com/azure/architecture/best-practices/resource-naming?toc=/azure/synapse-analytics/sql-data-warehouse/toc.json\&bc=/azure/synapse-analytics/sql-data-warehouse/breadcrumb/toc.json). |

   A screenshot of the Azure portal. Create a data warehouse basic details.

1. Under **Performance level**, select **Select performance level** to optionally change your configuration with a slider.

   A screenshot of the Azure portal. Change data warehouse performance level.

   For more information about performance levels, see [Manage compute in Azure Synapse Analytics](sql-data-warehouse-manage-compute-overview.md).

1. Select **Additional Settings**, under **Use existing data**, choose **Sample** so that `AdventureWorksDW` will be created as the sample database.

    A screenshot of the Azure portal. Select Use existing data.

1. Now that you've completed the Basics tab of the Azure Synapse Analytics form, select **Review + Create** and then **Create** to create the SQL pool. Provisioning takes a few minutes.

   A screenshot of the Azure portal. Select Review + Create.

   A screenshot of the Azure portal. Select create.

1. On the toolbar, select **Notifications** to monitor the deployment process.

   A screenshot of the Azure portal shows Notifications with Deployment in progress.

## Create a server-level firewall rule

The Azure Synapse service creates a firewall at the server-level. This firewall prevents external applications and tools from connecting to the server or any databases on the server. To enable connectivity, you can add firewall rules that enable connectivity for specific IP addresses. Follow these steps to create a [server-level firewall rule](https://learn.microsoft.com/azure/azure-sql/database/firewall-configure?toc=/azure/synapse-analytics/sql-data-warehouse/toc.json\&bc=/azure/synapse-analytics/sql-data-warehouse/breadcrumb/toc.json) for your client's IP address.

> **Note:**  
> Azure Synapse communicates over port 1433. If you are trying to connect from within a corporate network, outbound traffic over port 1433 might not be allowed by your network's firewall. If so, you cannot connect to your server unless your IT department opens port 1433.

1. After the deployment completes, select **All services** from the menu. Select **Databases**, select the star next to **Azure Synapse Analytics** to add Azure Synapse Analytics to your favorites.

1. Select **Azure Synapse Analytics** from the left-hand menu and then select **mySampleDataWarehouse** on the **Azure Synapse Analytics** page. The overview page for your database opens, showing you the fully qualified server name (such as `sqlpoolservername.database.windows.net`) and provides options for further configuration.

1. Copy this fully qualified server name for use to connect to your server and its databases in this and other quick starts. To open server settings, select the server name.

   A screenshot of the Azure portal. Find server name and copy the server name to clipboard.

1. Select **Show firewall settings**.

   A screenshot of the Azure portal. Server settings, Show firewall settings.

1. The **Firewall settings** page for the server opens.

   A screenshot of the Azure portal. Server firewall rule via the Add Client IP button.

1. To add your current IP address to a new firewall rule, select **Add client IP** on the toolbar. A firewall rule can open port 1433 for a single IP address or a range of IP addresses.

1. Select **Save**. A server-level firewall rule is created for your current IP address opening port 1433 on the server.

1. Select **OK** and then close the **Firewall settings** page.

You can now connect to the server and its SQL pools using this IP address. The connection works from SQL Server Management Studio or another tool of your choice. When you connect, use the ServerAdmin account you created previously.

> **Important:**  
> By default, access through the SQL Database firewall is enabled for all Azure services. Select **OFF** on this page and then select **Save** to disable the firewall for all Azure services.

## Get the fully qualified server name

Get the fully qualified server name for your server in the Azure portal. Later you use the fully qualified name when connecting to the server.

1. Sign in to the [Azure portal](https://portal.azure.com/).

1. Select **Azure Synapse Analytics** from the left-hand menu, and select your workspace on the **Azure Synapse Analytics** page.

1. In the **Essentials** pane in the Azure portal page for your database, locate and then copy the **Server name**. In this example, the fully qualified name is `sqlpoolservername.database.windows.net`.

    A screenshot of the Azure portal. Connection information.

## Connect to the server as server admin

This section uses [SQL Server Management Studio (SSMS)](https://learn.microsoft.com/sql/ssms/download-sql-server-management-studio-ssms?toc=/azure/synapse-analytics/sql-data-warehouse/toc.json\&bc=/azure/synapse-analytics/sql-data-warehouse/breadcrumb/toc.json\&view=azure-sqldw-latest\&preserve-view=true) to establish a connection to your server.

1. Open SQL Server Management Studio.

1. In the **Connect to Server** dialog box, enter the following information:

   | Setting | Suggested value | Description  |
   | :--- | :--- | :--- |
   | Server type | Database engine | This value is required |
   | Server name | The fully qualified server name | Here's an example: `sqlpoolservername.database.windows.net`. |
   | Authentication | SQL Server Authentication | SQL Authentication is the only authentication type that is configured in this tutorial. |
   | Login | The server admin account | Account that you specified when you created the server. |
   | Password | The password for your server admin account | Password that you specified when you created the server. |

   A screenshot of SQL Server Management Studio (SSMS). Connect to server.

1. Select **Connect**. The Object Explorer window opens in SSMS.

1. In Object Explorer, expand **Databases**. Then expand **mySampleDatabase** to view the objects in your new database.

   A screenshot of SQL Server Management Studio (SSMS), showing database objects in Object Explorer.

## Run some queries

It is not recommended to run large queries while being logged as the server admin, as it uses a [limited resource class](resource-classes-for-workload-management.md). Instead configure [Workload Isolation](quickstart-configure-workload-isolation-tsql.md) as [illustrated in the tutorials](load-data-wideworldimportersdw.md#create-a-user-for-loading-data).

Azure Synapse Analytics uses T-SQL as the query language. To open a query window and run some T-SQL queries, use the following steps in SQL Server Management Studio (SSMS):

1. In Object Explorer, right-click **mySampleDataWarehouse** and select **New Query**. A new query window opens.

1. In the query window, enter the following command to see a list of databases.

    ```sql
    SELECT * FROM sys.databases
    ```

1. Select **Execute**. The query results show two databases: `master` and `mySampleDataWarehouse`.

   A screenshot of SQL Server Management Studio (SSMS). Query databases in SSMS, showing master and mySampleDataWarehouse in the resultset.

1. To look at some data, use the following command to see the number of customers with last name of Adams that have three children at home. The results list six customers.

    ```sql
    SELECT LastName, FirstName FROM dbo.dimCustomer
    WHERE LastName = 'Adams' AND NumberChildrenAtHome = 3;
    ```

   A screenshot of the SQL Server Management Studio (SSMS) query window. Query dbo.dimCustomer.

## Clean up resources

You're being charged for data warehouse units and data stored your dedicated SQL pool (formerly SQL DW). These compute and storage resources are billed separately.

- If you want to keep the data in storage, you can pause compute when you aren't using the dedicated SQL pool (formerly SQL DW). By pausing compute, you're only charged for data storage. You can resume compute whenever you're ready to work with the data.

- If you want to remove future charges, you can delete the dedicated SQL pool (formerly SQL DW).

Follow these steps to clean up resources you no longer need.

1. Sign in to the [Azure portal](https://portal.azure.com), select your dedicated SQL pool (formerly SQL DW).

   A screenshot of the Azure portal. Clean up resources.

1. To pause compute, select the **Pause** button. When the dedicated SQL pool (formerly SQL DW) is paused, you see a **Resume** button. To resume compute, select **Resume**.

1. To remove the dedicated SQL pool (formerly SQL DW) so you aren't charged for compute or storage, select **Delete**.

1. To remove the server you created, select **sqlpoolservername.database.windows.net** in the previous image, and then select **Delete**. Be careful with this deletion, since deleting the server also deletes all databases assigned to the server.

1. To remove the resource group, select **myResourceGroup**, and then select **Delete resource group**.

Want to optimize and save on your cloud spending?


Azure services cost money. To help control spending, you can use Microsoft Cost Management to set budgets and configure alerts.

You can analyze, manage, and optimize your Azure costs by using Cost Management. To learn more, see the [quickstart on analyzing your costs](https://learn.microsoft.com/azure/cost-management-billing/costs/quick-acm-cost-analysis?WT.mc_id=costmanagementcontent_docsacmhorizontal_-inproduct-learn).


## Next steps

- To learn more about loading data into your dedicated SQL pool (formerly SQL DW), continue to the [Load data into a dedicated SQL pool](load-data-from-azure-blob-storage-using-copy.md) article.
