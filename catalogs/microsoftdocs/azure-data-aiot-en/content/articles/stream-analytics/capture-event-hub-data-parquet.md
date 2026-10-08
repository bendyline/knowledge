---
title: Event Hubs Data Capture to Azure Data Lake Parquet
description: Learn how to use the node code editor to automatically capture the streaming data in Event Hubs in an Azure Data Lake Storage Gen2 account in Parquet format.
ms.reviewer: spelluru
ms.service: azure-stream-analytics
ms.topic: how-to
ms.date: 03/26/2026
ms.custom:
  - mvc
  - sfi-image-nochange
# Customer intent: I want to lean how to use the no-code editor to automatically capture streaming data in Azure Event Hubs to an Azure Data Lake Storage Gen2 account in the Parquet format. 
---
# Capture data from Event Hubs in Parquet format
This article explains how to use the no code editor to automatically capture streaming data in Event Hubs in an Azure Data Lake Storage Gen2 account in the Parquet format. 

## Prerequisites

- An Azure Event Hubs namespace with an event hub and an Azure Data Lake Storage Gen2 account with a container to store the captured data. These resources must be publicly accessible and can't be behind a firewall or secured in an Azure virtual network. 

    If you don't have an event hub, create one by following instructions from [Quickstart: Create an event hub](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-hubs/event-hubs-create.md). 

    If you don't have a Data Lake Storage Gen2 account, create one by following instructions from [Create a storage account](../storage/blobs/create-data-lake-storage-account.md).
- The data in your Event Hubs instance (event hub) must be serialized in either JSON, CSV, or Avro format. On the **Event Hubs Instance** page for your event hub, follow these steps:  
    1. On the left menu, select **Data Explorer**. 
    1. In the middle pane, select **Send events**. 
    1. In the **Send events** pane, for **Select dataset**, select **Stocks data**.
    1. Select **Send**. 

        Screenshot showing the Generate data page to generate sample stocks data.

## Configure a job to capture data

Use the following steps to configure a Stream Analytics job to capture data in Azure Data Lake Storage Gen2.

1. In the Azure portal, go to your event hub. 
1. On the left menu, under **Features**, select **Process Data**. Then, select **Start** on the **Capture data to ADLS Gen2 in Parquet format** card.  

    Screenshot showing the Process Event Hubs data start cards.
1. Enter a **name** for your Stream Analytics job, and then select **Create**.  

    Screenshot showing the New Stream Analytics job window where you enter the job name.
1. Specify the **Serialization** type of your data in the Event Hubs and the **Authentication method** that the job uses to connect to Event Hubs. For this tutorial, keep the default settings. Then select **Connect**.

    Screenshot showing the Event Hubs connection configuration.
1. When the connection is established successfully, you see:
    - Fields that are present in the input data. You can choose **Add field** or you can select the three dot symbol next to a field to optionally remove, rename, or change its name.
    - A live sample of incoming data in the **Data preview** table under the diagram view. It refreshes periodically. You can select **Pause streaming preview** to view a static view of the sample input.  
    
        Screenshot showing sample data under Data Preview.
1. Select the **Azure Data Lake Storage Gen2** tile to edit the configuration. 
1. On the **Azure Data Lake Storage Gen2** configuration page, follow these steps:     
    1. Select the subscription, storage account name, and container from the drop-down menu. 
    1. After you select the subscription, the authentication method and storage account key are automatically filled in.  
    1. Select **Parquet** for **Serialization** format. 
    
        Screenshot showing the Data Lake Storage Gen2 configuration page.
    1. For streaming blobs, the directory path pattern is a dynamic value. The date must be part of the file path for the blob – referenced as `{date}`. To learn about custom path patterns, see [Azure Stream Analytics custom blob output partitioning](stream-analytics-custom-path-patterns-blob-storage-output.md).  
    
        First screenshot showing the Blob window where you edit a blob's connection configuration.
    1. Select **Connect**
1. When the connection is established, you see fields that are present in the output data.
1. Select **Save** on the command bar to save your configuration.

    Screenshot showing the Save button on the command bar.
1. Select **Start** on the command bar to start the streaming flow to capture data. Then in the **Start Stream Analytics job** window:
    1. Choose the output start time.
    1. Select the pricing plan.
    1. Select the number of Streaming Units (SU) that the job runs with. SU represents the computing resources that are allocated to execute a Stream Analytics job. For more information, see [Streaming Units in Azure Stream Analytics](stream-analytics-streaming-unit-consumption.md).
    
        Screenshot showing the Start Stream Analytics job window where you set the output start time, streaming units, and error handling.
1. Select **X** at the top-right corner to close the **Stream Analytics job** window.
1. You see the Stream Analytic job in the **Stream Analytics job** tab of the **Process data** page for your event hub. 

    Screenshot showing the Stream Analytics job on the Process data page.
    

## Verify output

1. On the Event Hubs instance page for your event hub, follow these steps:
    1. On the left menu, select **Data Explorer**. 
    1. In the middle pane, select **Send events**. 
    1. In the **Send events** pane, for **Select dataset**, select **Stocks data**.
    1. Select **Send**. 
1. Verify that the Parquet files are generated in the Azure Data Lake Storage container. 

    Screenshot showing the generated Parquet files in the Azure Data Lake Storage container.
1. Now, on the Event Hubs instance page, select **Process data** in the left menu. Switch to the **Stream Analytics jobs** tab. Select **Open metrics** to monitor it. Add **Input metrics** to the chart using the **Add metric** on the toolbar. If you don't see the metrics in the chart, wait for a few minutes, and refresh the page. 

    Screenshot showing Open Metrics link selected.
    
    Here's an example screenshot of metrics showing input and output events. 

    Screenshot showing metrics of the Stream Analytics job.



## Considerations when using the Event Hubs Geo-replication feature
Azure Event Hubs recently launched the [Geo-Replication](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-hubs/geo-replication.md) feature in public preview. This feature is different from the [Geo Disaster Recovery](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-hubs/event-hubs-geo-dr.md) feature of Azure Event Hubs.

When the failover type is **Forced** and replication consistency is **Asynchronous**, Stream Analytics job doesn't guarantee exactly once output to an Azure Event Hubs output. 

Azure Stream Analytics, as **producer** with an event hub an output, might observe watermark delay on the job during failover duration and during throttling by Event Hubs in case replication lag  between primary and secondary reaches the maximum configured lag.

Azure Stream Analytics, as **consumer** with Event Hubs as Input, might observe watermark delay on the job during failover duration and might skip data or find duplicate data after failover is complete. 

Due to these caveats, restart the Stream Analytics job with appropriate start time right after Event Hubs failover is complete. Also, since Event Hubs Geo-replication feature is in public preview, don't use this pattern for production Stream Analytics jobs at this point. The current Stream Analytics behavior will improve before the Event Hubs Geo-replication feature is generally available and can be used in Stream Analytics production jobs.

## Related content

Now you know how to use the Stream Analytics no code editor to create a job that captures Event Hubs data to Azure Data Lake Storage Gen2 in Parquet format. Next, you can learn more about Azure Stream Analytics and how to monitor the job that you created.


* [Introduction to Azure Stream Analytics](stream-analytics-introduction.md)
* [Monitor Stream Analytics job with Azure portal](stream-analytics-monitoring.md)
