---
title: Build Real-Time Power BI Dashboards With Stream Analytics
description: Use no code editor to compute aggregations and write to Azure Synapse Analytics and build real-time dashboards using Power BI.
#customer intent: As a data analyst, I want to build a real-time dashboard using Power BI so that I can visualize streaming data from Azure services.
ms.reviewer: spelluru
ms.service: azure-stream-analytics
ms.topic: how-to
ms.date: 03/25/2026
ms.custom: sfi-image-nochange
---

# Build real-time Power BI dashboards with Stream Analytics no code editor
This tutorial shows how to use the Stream Analytics no code editor to compute aggregates on real-time data streams and store them in Azure Synapse Analytics. 

In this tutorial, you learn how to:

> 
> * Deploy an event generator that sends data to your event hub
> * Create a Stream Analytics job by using the no code editor
> * Review input data and schema
> * Select fields to group by and define aggregations like count
> * Configure Azure Synapse Analytics to which results are written
> * Run the Stream Analytics job
> * Visualize data in Power BI

## Prerequisites

Before you start, make sure you complete the following steps:

1. If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
1. Deploy the TollApp event generator to Azure. Use this link to [Deploy TollApp Azure Template](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FAzure%2Fazure-stream-analytics%2Fmaster%2FSamples%2FTollApp%2FVSProjects%2FTollAppDeployment%2Fazuredeploy.json). Set the `interval` parameter to 1. Use a new resource group for this step.
1. Create an [Azure Synapse Analytics workspace](../synapse-analytics/get-started-create-workspace.md) with a [Dedicated SQL pool](../synapse-analytics/get-started-analyze-sql-pool.md#create-a-dedicated-sql-pool).
1. [Create a table](../synapse-analytics/sql/get-started-visual-studio.md) named `carsummary` by using your Dedicated SQL pool. Run the following SQL script:
    ```SQL
    CREATE TABLE carsummary   
    (  
        Make nvarchar(20),  
        CarCount int,
    	times datetime
    )
    WITH ( CLUSTERED COLUMNSTORE INDEX ) ;
    ``` 


## Use no code editor to create a Stream Analytics job
1. Locate the resource group where you deployed the TollApp event generator. 
1. Select the Azure Event Hubs **namespace**. 
1. On the **Event Hubs namespace** page, select **Event Hubs** under **Entities** in the left menu. 
1. Select the `entrystream` instance.

    Screenshot showing the selection of the event hub.
1. Under the **Features** section, go to **Process data** and then select **start** on the **Start with blank canvas** template.

    Screenshot showing the selection of the Start button on the Start with a blank canvas tile.
1. Name your job `carsummary` and select **Create**.

    Screenshot of the New Stream Analytics job page.
1. On the **event hub** configuration page, confirm the following settings, and then select **Connect**.
    1. For **Consumer group**, select **Use existing**, and then select **Default**. 
    1. For **Serialization type**, confirm that **JSON** is selected. 
    1. For **Authentication mode**, confirm that **Connection String** is used to connect to your event hub: Connection string. 

        Screenshot of the configuration page for your event hub.
1. Within a few seconds, you see sample input data and the schema. You can choose to drop fields, rename fields, or change data types.

    Screenshot showing the preview of data in the event hub and the fields.
1. Select **Operations** on the command bar and then select **Group by**. 

    Screenshot showing the Operations menu with Group by selected option on the command bar.
1. Select the **Group by** tile on the canvas and connect it to the event hub tile. 

    Screenshot showing the Group tile connected to the Event Hubs tile.
1. Configure the **Group by** tile by specifying:
    1. Aggregation as **Count**.
    1. Field as **Make**, which is a nested field inside **CarModel**.
    1. Select **Add**.

        Screenshot of the Aggregations setting in the Group by configuration page.
    1. In the **Settings** section: 
        1. For **Group aggregations by**, select **Make**.
        1. For **Time window**, confirm that the value is set to **Tumbling**. 
        1. For **Duration**, enter **3 minutes**.
        1. Select **Done** at the bottom of the page. 

            Screenshot of the Group by configuration page.
1. Select **Group by**, and notice the grouped data in the **Data preview** tab at the bottom of the page. 

    Screenshot that shows the Data Preview tab for the Group by operation.
1. On the command bar, select **Operations** and then **Manage fields**. 
1. Connect **Group by** and **Manage fields** tiles. 
1. On the **Manage fields** page, follow these steps:
    1. Add the **Make** field as shown in the following image, and then select **Add**. 

        Screenshot showing the addition of the Make field.
    1. Select **Add**.
    
        Screenshot showing the Add button on the Manage fields page.
1. Select **Add all fields** on the **Manage fields** configuration page. 

    Screenshot of the Manage fields page.
1. Select **...** next to the fields, and select **Edit** to rename them.
    - **COUNT_make** to **CarCount**
    - **Window_End_Time** to **times**

        Screenshot of the Manage fields page with the fields renamed.
1. Select **Done** on the **Manage fields** page. The **Manage fields** page should look as shown in the following image.
    
    Screenshot of the Manage fields page with three fields.
1. Select **Manage fields** tile, and see the data flowing into the operation in the **Data preview** tab at the bottom of the page. 

    Screenshot that shows the Data Preview tab for the Managed Fields operation.
1. On the command bar, select **Outputs**, and then select **Synapse**. 

    Screenshot of command bar with Outputs, Synapse selected.
1. Connect the **Synapse** tile to the **Manage fields** tile on your canvas.
1. On the **Synapse** settings page, follow these steps:
    1. If the **Job storage account** isn't already set, select the Azure Data Lake Storage account in the resource group. It's the  storage account that is used by Synapse SQL to load data into your data warehouse.
    
        Screenshot that shows the Synapse with selection of storage account.
    1. Select the Azure subscription where your Azure Synapse Analytics is located.
    1. Select the database of the Dedicated SQL pool that you used to create the `carsummary` table in the previous section.
    1. Enter username and password to authenticate.
    1. Enter table name as `carsummary`.
    1. Select **Connect**. You see sample results that are written to your Synapse SQL table.

        Screenshot of the Synapse tile settings.
1. Select **Synapse** tile and see the **Data preview** tab at the bottom of the page. You see the data flowing into the dedicated SQL pool. 

    Screenshot that shows Data Preview for the Synapse tile.
1. Select **Save** in the top ribbon to save your job and then select **Start**. 
    Screenshot that shows the Start button on the command bar.
1. On the **Start Stream Analytics Job** page, select **Start** to run your job. 

    Screenshot of the Start Stream Analytics Job page.
1. You then see a list of all Stream Analytics jobs created using the no code editor. And within two minutes, your job goes to a **Running** state. Select the **Refresh** button on the page to see the status change from Created -> Starting -> Running.

    Screenshot showing the list of jobs.

## Create a Power BI visualization
1. Download the latest version of [Power BI Desktop](https://powerbi.microsoft.com/desktop).
1. Use the Power BI connector for Azure Synapse SQL. 

    Screenshot that shows the Power BI Desktop with Azure and Synapse Analytics SQL selected.
1. Connect to your database by using **DirectQuery**, and use this query to fetch data from your database

    ```SQL
    SELECT [Make],[CarCount],[times]
    FROM [dbo].[carsummary]
    WHERE times >= DATEADD(day, -1, GETDATE())
    ```

    Screenshot that shows the configuration of Power BI Desktop to connect to Azure Synapse SQL Database.

    Switch to the **Database** tab, and enter your credentials (user name and password) to connect to the database and run the query.
1. Select **Load** to load data into Power BI. 
1. You can then create a line chart with
    * X-axis as times
    * Y-axis as CarCount
    * Legend as Make
    You see a chart that you can publish. You can configure [automatic page refresh](https://learn.microsoft.com/power-bi/create-reports/desktop-automatic-page-refresh#authoring-reports-with-automatic-page-refresh-in-power-bi-desktop) and set it to 3 minutes to get a real-time view.
[Screenshot of Power BI dashboard showing car summary data.](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/stream-analytics/media/stream-analytics-no-code/no-code-power-bi-real-time-dashboard.png#lightbox)


## More options

Besides Azure Synapse SQL, you can also use SQL Database as the no-code editor output to receive the streaming data. Then use the Power BI connector to connect to the SQL Database with your database by using **DirectQuery** to build the real-time dashboard.

It's also a good option to build the real-time dashboard with your streaming data. For more information about the SQL Database output, see [Transform and ingest to SQL Database](no-code-transform-filter-ingest-sql.md).


## Clean up resources
1. Locate your Event Hubs instance and see the list of Stream Analytics jobs under the **Process Data** section. Stop any running jobs.
1. Go to the resource group you used while deploying the TollApp event generator.
1. Select **Delete resource group**. To confirm deletion, type the name of the resource group.

## Next steps
In this tutorial, you created a Stream Analytics job by using the no code editor to define aggregations and write results to Azure Synapse Analytics. You then used Power BI to build a real-time dashboard to see the results produced by the job.

> 
> [No code stream processing with Azure Stream Analytics](https://aka.ms/asanocodeux)
