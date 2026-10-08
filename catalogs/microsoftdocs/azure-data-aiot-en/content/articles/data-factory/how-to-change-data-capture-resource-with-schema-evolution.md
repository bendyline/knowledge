---
title: Capture changed data with schema evolution by using a change data capture resource
description: Get step-by-step instructions on how to capture changed data with schema evolution from Azure SQL Database to a Delta sink by using a change data capture (CDC) resource.
author: KrishnakumarRukmangathan
ms.author: krirukm
ms.topic: how-to
ms.date: 05/15/2024
ms.subservice: authoring
ms.custom: sfi-image-nochange
---

# Capture changed data with schema evolution from Azure SQL Database to a Delta sink by using a change data capture resource

**APPLIES TO:** Azure Data Factory Azure Synapse Analytics


> **Tip:**
> [Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory) is the next generation of Azure Data Factory, with a simpler architecture, built-in AI, and new features. If you're new to data integration, start with Fabric Data Factory. Existing ADF workloads can upgrade to Fabric to access new capabilities across data science, real-time analytics, and reporting.
>
> - [Start a Fabric free trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
> - [Upgrade from Azure Data Factory to Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory/migrate-planning-azure-data-factory).


In this article, you use the Azure Data Factory user interface to create a change data capture (CDC) resource. The resource picks up changed data from an Azure SQL Database source and adds it to Delta Lake stored in Azure Data Lake Storage Gen2, in real time. This activity showcases the support of schema evolution by using a CDC resource between source and sink.

In this article, you learn how to:

* Create a CDC resource.
* Make dynamic schema changes to a source table.
* Validate schema changes at the target Delta sink.

You can modify and expand the configuration pattern in this article.

## Prerequisites

Before you begin the procedures in this article, make sure that you have these resources:

* **Azure subscription**. If you don't have an Azure subscription, create a [free Azure account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
* **SQL database**. You use Azure SQL Database as a source data store. If you don't have a SQL database, create one in the Azure portal.
* **Storage account**. You use Delta Lake stored in Azure Data Lake Storage Gen2 as a target data store. If you don't have a storage account, see [Create a storage account](https://learn.microsoft.com/azure/storage/common/storage-account-create) for the steps to create one.

## Create a CDC artifact

1. Go to the **Author** pane in your data factory. Below **Pipelines**, a new top-level artifact called **Change Data Capture (preview)** appears.
  
   Screenshot of a new top-level artifact for change data capture on the Factory Resources pane.
  
1. Hover over **Change Data Capture (preview)** until three dots appear. Then select **Change Data Capture (preview) Actions**.

   Screenshot of the button for change data capture actions appearing over the new top-level artifact.

1. Select **New CDC (preview)**. This step opens a flyout to begin the guided process.

   Screenshot of a list of change data capture actions.
  
1. You're prompted to name your CDC resource. By default, the name is "adfcdc" with a number that increments by 1. You can replace this default name with a name that you choose.

   Screenshot of the text box to update the name of a resource.
  
1. Use the dropdown list to choose your data source. For this article, select **Azure SQL Database**.

   Screenshot of the guided process flyout with source options in a dropdown list.

1. You're prompted to select a linked service. Create a new linked service or select an existing one.

   Screenshot of the box to choose or create a linked service.

1. After you select a linked service, you're prompted to select source tables. Use the checkboxes to select the source tables, and then select the **Incremental column** value by using the dropdown list.

   Screenshot that shows selection of a source table and an incremental column.

   The pane lists only tables that have supported incremental column data types.

   > **Note:**
   > To enable CDC with schema evolution in an Azure SQL Database source, choose tables based on watermark columns rather than tables that are native SQL CDC enabled.

1. After you select the source tables, select **Continue** to set your data target.

   Screenshot of the Continue button in the guided process to select a data target.

1. Select a **Target type** value by using the dropdown list. For this article, select **Delta**.

   Screenshot of a dropdown menu of all data target types.

1. You're prompted to select a linked service. Create a new linked service or select an existing one.

   Screenshot of the box to choose or create a linked service to your data target.

1. Select your target data folder. You can use either:

   * The **Browse** button under **Target base path**, which helps you automatically populate the browse path for all the new tables selected for a source.
   * The **Browse** button outside to individually select the folder path.

   Screenshot of a folder icon to browse for a folder path.

1. After you select a folder path, select the **Continue** button.

   Screenshot of the Continue button in the guided process to proceed to the next step.

1. A new tab for capturing change data appears. This tab is the CDC studio, where you can configure your new resource.

   Screenshot of the change data capture studio.
  
   A new mapping is automatically created for you. You can update the **Source Table** and **Target Table** selections for your mapping by using the dropdown lists.

   Screenshot of the source-to-target mapping in the change data capture studio.

1. After you select your tables, their columns are mapped by default with the **Auto map** toggle turned on. **Auto map** automatically maps the columns by name in the sink, picks up new column changes when the source schema evolves, and flows this information to the supported sink types.

   Screenshot of the toggle for automatic mapping turned on.

   > **Note:**
   > Schema evolution works only when the **Auto map** toggle is turned on. To learn how to edit column mappings or include transformations, see [Capture changed data with a change data capture resource](how-to-change-data-capture-resource.md).

1. Select the **Keys** link, and then select the **Keys** column to be used for tracking the delete operations.

   Screenshot of the link to enable Keys column selection.

   Screenshot of selecting a Keys column for the selected source.

1. After your mappings are complete, set your CDC latency by using the **Set Latency** button.

   Screenshot of the Set Latency button at the top of the canvas.

1. Select the latency of your CDC, and then select **Apply** to make the changes.

   By default, latency is set to **15 minute**. The example in this article uses the **Real-time** option for latency. Real-time latency continuously picks up changes in your source data in intervals of less than 1 minute.

   For other latencies (for example, if you select 15 minutes), your change data capture will process your source data and pick up any changed data since the last processed time.

   Screenshot of the options for setting latency.

1. After you finish configuring your CDC, select **Publish all** to publish your changes.

   Screenshot of the publish button at the top of the canvas.

   > **Note:**
   > If you don't publish your changes, you won't be able to start your CDC resource. The **Start** button in the next step will be unavailable.

1. Select **Start** to start running your change data capture.

   Screenshot of the Start button at the top of the canvas.

Now that your change data capture is running, you can:

* Use the monitoring page to see how many changes (insert, update, or delete) were read and written, along with other diagnostic information.

  Screenshot of the monitoring page of a selected change data capture.

  Screenshot of the monitoring page of a selected change data capture with a detailed view.

* Validate that the change data arrived in Delta Lake stored in Azure Data Lake Storage Gen2, in Delta format.

  Screenshot of a target Delta folder.
  
* Validate the schema of the change data that arrived.

  Screenshot of a Delta file.

## Make dynamic schema-level changes to the source tables

1. Add a new **PersonalEmail** column to the source table by using an `ALTER TABLE` T-SQL statement, as shown in the following example.

   Screenshot of the ALTER command in Azure Data Studio.

1. Validate that the new **PersonalEmail** column appears in the existing table.

   Screenshot of a new table design with a column added for personal email.
  
## Validate schema changes at the Delta sink

Confirm that the new column **PersonalEmail** appears in the Delta sink. You now know that change data with schema changes arrived at the target.

Screenshot of a Delta file with a schema change.

## Related content

* [Learn more about the CDC resource](concepts-change-data-capture-resource.md)
