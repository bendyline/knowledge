---
title: Incrementally copy new files based on time partitioned file name
description: Create an Azure data factory and then use the Copy Data tool to incrementally load new files only based on time partitioned file name.
author: kromerm
ms.author: makromer
ms.topic: tutorial
ms.date: 10/03/2024
ms.subservice: data-movement
ms.custom: sfi-image-nochange
---

# Incrementally copy new files based on time partitioned file name by using the Copy Data tool

**APPLIES TO:** Azure Data Factory Azure Synapse Analytics



> **Tip:**
> [Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory) is the next generation of Azure Data Factory, with a simpler architecture, built-in AI, and new features. If you're new to data integration, start with Fabric Data Factory. Existing ADF workloads can upgrade to Fabric to access new capabilities across data science, real-time analytics, and reporting.
>
> - [Start a Fabric free trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
> - [Upgrade from Azure Data Factory to Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory/migrate-planning-azure-data-factory).


In this tutorial, you use the Azure portal to create a data factory. Then, you use the Copy Data tool to create a pipeline that incrementally copies new files based on time partitioned file name from Azure Blob storage to Azure Blob storage.

> **Note:**
> If you're new to Azure Data Factory, see [Introduction to Azure Data Factory](introduction.md).

In this tutorial, you perform the following steps:

> 
> * Create a data factory.
> * Use the Copy Data tool to create a pipeline.
> * Monitor the pipeline and activity runs.

## Prerequisites

* **Azure subscription**: If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.
* **Azure storage account**: Use Blob storage as the _source_  and _sink_ data store. If you don't have an Azure storage account, see the instructions in [Create a storage account](../storage/common/storage-account-create.md).

### Create two containers in Blob storage

Prepare your Blob storage for the tutorial by performing these steps.

1. Create a container named **source**.  Create a folder path as **2021/07/15/06** in your container. Create an empty text file, and name it as **file1.txt**. Upload the file1.txt to the folder path **source/2021/07/15/06** in your storage account.  You can use various tools to perform these tasks, such as [Azure Storage Explorer](https://storageexplorer.com/).

    upload files

    > **Note:**
    > Please adjust the folder name with your UTC time.  For example, if the current UTC time is 6:10 AM on July 15, 2021, you can create the folder path as **source/2021/07/15/06/** by the rule of **source/{Year}/{Month}/{Day}/{Hour}/**.

2. Create a container named **destination**. You can use various tools to perform these tasks, such as [Azure Storage Explorer](https://storageexplorer.com/).

## Create a data factory

1. On the top menu, select **Create a resource** > **Analytics** > **Data Factory** :

   Data Factory selection in the \&quot;New\&quot; pane

2. On the **New data factory** page, under **Name**, enter **ADFTutorialDataFactory**.

    The name for your data factory must be _globally unique_. You might receive the following error message:

   New data factory error message for duplicate name.

   If you receive an error message about the name value, enter a different name for the data factory. For example, use the name _**yourname**_**ADFTutorialDataFactory**. For the naming rules for Data Factory artifacts, see [Data Factory naming rules](naming-rules.md).
3. Select the Azure **subscription** in which to create the new data factory.
4. For **Resource Group**, take one of the following steps:

    a. Select **Use existing**, and select an existing resource group from the drop-down list.

    b. Select **Create new**, and enter the name of a resource group. 
         
    To learn about resource groups, see [Use resource groups to manage your Azure resources](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/overview.md).

5. Under **version**, select **V2** for the version.
6. Under **location**, select the location for the data factory. Only supported locations are displayed in the drop-down list. The data stores (for example, Azure Storage and SQL Database) and computes (for example, Azure HDInsight) that are used by your data factory can be in other locations and regions.
7. Select **Create**.
8. After creation is finished, the **Data Factory** home page is displayed.
9. To launch the Azure Data Factory user interface (UI) in a separate tab, select **Open** on the **Open Azure Data Factory Studio** tile.

    Home page for the Azure Data Factory, with the Open Azure Data Factory Studio tile.

## Use the Copy Data tool to create a pipeline

1. On the Azure Data Factory home page, select the **Ingest** title to launch the Copy Data tool.

   Screenshot that shows the ADF home page.

2. On the **Properties** page, take the following steps:
    1. Under **Task type**, choose **Built-in copy task**.

    1. Under **Task cadence or task schedule**, select **Tumbling window**.

    1. Under **Recurrence**, enter **1 Hour(s)**.

    1. Select **Next**.

    Properties page
3. On the **Source data store** page, complete the following steps:

    a. Select **+ New connection** to add a connection.
    
    b. Select **Azure Blob Storage** from the gallery, and then select **Continue**.
    
    c. On the **New connection (Azure Blob Storage)** page, enter a name for the connection. Select your Azure subscription, and select your storage account from the **Storage account name** list. Test connection and then select **Create**.

    Source data store page

    d. On the **Source data store** page, select the newly created connection in the **Connection** section.

    e. In the **File or folder** section, browse and select the **source** container, then select **OK**.

    f. Under **File loading behavior**, select **Incremental load: time-partitioned folder/file names**.

    g. Write the dynamic folder path as **source/{year}/{month}/{day}/{hour}/**, and change the format as shown in the following screenshot. 
    
    h. Check **Binary copy** and select **Next**.

    Screenshot that shows the configuration of Source data store page.


4. On the **Destination data store** page, complete the following steps:
    1. Select the **AzureBlobStorage**, which is the same storage account as data source store.

    1. Browse and select the **destination** folder, then select **OK**.

    1. Write the dynamic folder path as **destination/{year}/{month}/{day}/{hour}/**, and change the format as shown in the following screenshot.

    1. Select **Next**.

    Screenshot that shows the configuration of Destination data store page.

5. On the **Settings** page, under **Task name**, enter **DeltaCopyFromBlobPipeline**, and then select **Next**. The Data Factory UI creates a pipeline with the specified task name.

    Screenshot that shows the configuration of settings page.

6. On the **Summary** page, review the settings, and then select **Next**.

    Summary page

7. On the **Deployment** page, select **Monitor** to monitor the pipeline (task).
    Deployment page

8. Notice that the **Monitor** tab on the left is automatically selected.  You need wait for the pipeline run when it is triggered automatically (about after one hour). When it runs, select the pipeline name link **DeltaCopyFromBlobPipeline** to view activity run details or rerun the pipeline. Select **Refresh** to refresh the list.

    Screenshot shows the Pipeline runs pane.
9. There's only one activity (copy activity) in the pipeline, so you see only one entry. Adjust the column width of the **Source** and **Destination** columns (if necessary) to display more details, you can see the source file (file1.txt) has been copied from  *source/2021/07/15/06/* to *destination/2021/07/15/06/* with the same file name. 

    Screenshot shows pipeline run details.

    You can also verify the same by using Azure Storage Explorer (https://storageexplorer.com/) to scan the files.

    Screenshot shows pipeline run details for the destination.

10. Create another empty text file with the new name as **file2.txt**. Upload the file2.txt file to the folder path **source/2021/07/15/07** in your storage account. You can use various tools to perform these tasks, such as [Azure Storage Explorer](https://storageexplorer.com/).

    > **Note:**
    > You might be aware that a new folder path is required to be created. Please adjust the folder name with your UTC time.  For example, if the current UTC time is 7:30 AM on July. 15th, 2021, you can create the folder path as **source/2021/07/15/07/** by the rule of **{Year}/{Month}/{Day}/{Hour}/**.

11. To go back to the **Pipeline runs** view, select **All pipelines runs**, and wait for the same pipeline being triggered again automatically after another one hour.  

    Screenshot shows the All pipeline runs link to return to that page.

12. Select the new **DeltaCopyFromBlobPipeline** link for the second pipeline run when it comes, and do the same to review details. You will see the source file (file2.txt) has been copied from  **source/2021/07/15/07/**  to **destination/2021/07/15/07/** with the same file name. You can also verify the same by using Azure Storage Explorer (https://storageexplorer.com/) to scan the files in **destination** container.


## Related content
Advance to the following tutorial to learn about transforming data by using a Spark cluster on Azure:

> 
>[Transform data using Spark cluster in cloud](tutorial-transform-data-spark-portal.md)
