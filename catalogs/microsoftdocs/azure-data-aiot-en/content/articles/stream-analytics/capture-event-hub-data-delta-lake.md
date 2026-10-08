---
title: Capture data from Event Hubs into Azure Data Lake Storage Gen2 in Delta Lake format
description: Learn how to use the no code editor to automatically capture the streaming data in Event Hubs in an Azure Data Lake Storage Gen2 account in Delta Lake format.
ms.service: azure-stream-analytics
ms.topic: how-to
ms.date: 04/29/2026
ms.custom:
  - mvc
  - sfi-image-nochange
---
# Capture data from Event Hubs in Delta Lake format 

This article explains how to use the no-code editor to automatically capture streaming data in Event Hubs to an Azure Data Lake Storage Gen2 account in Delta Lake format.


## Prerequisites

- You must make your Azure Event Hubs and Azure Data Lake Storage Gen2 resources publicly accessible. Don't place them behind a firewall or secure them in an Azure Virtual Network.
- You must serialize the data in your Event Hubs in JSON, CSV, or Avro format.

## Configure a job to capture data

Use the following steps to configure a Stream Analytics job to capture data in Azure Data Lake Storage Gen2.

1. In the Azure portal, go to your event hub. 
1. Select **Features** > **Process Data**, and select **Start** on the **Capture data to ADLS Gen2 in Delta Lake format** card.  
    Screenshot showing the Process Event Hubs data start cards.

    Alternatively, select **Features** > **Capture**, and select the **Delta Lake** option under **Output event serialization format**. Then, select **Start data capture configuration**.
    Screenshot showing the entry point of the capture data creation.

1. Enter a **name** to identify your Stream Analytics job. Select **Create**.  
    Screenshot showing the New Stream Analytics job window where you enter the job name.
1. Specify the **Serialization** type of your data in the Event Hubs and the **Authentication method** that the job uses to connect to Event Hubs. Then select **Connect**.
    Screenshot showing the Event Hubs connection configuration.
1. When the connection is established successfully, you see:
    - Fields that are present in the input data. You can choose **Add field** or you can select the three dot symbol next to a field to optionally remove, rename, or change its name.
    - A live sample of incoming data in the **Data preview** table under the diagram view. It refreshes periodically. You can select **Pause streaming preview** to view a static view of the sample input.  
        Screenshot showing sample data under Data Preview.
1. Select the **Azure Data Lake Storage Gen2** tile to edit the configuration. 
1. On the **Azure Data Lake Storage Gen2** configuration page, follow these steps:     
    1. Select the subscription, storage account name, and container from the drop-down menu. 
    1. After you select the subscription, the authentication method and storage account key are automatically filled in.  
    1. For **Delta table path**, specify the location and name of your Delta Lake table stored in Azure Data Lake Storage Gen2. You can choose to use one or more path segments to define the path to the delta table and the delta table name. To learn more, see [Write to Delta Lake table](write-to-delta-lake.md).  
    1. Select **Connect**.
    
        First screenshot showing the Blob window where you edit a blob's connection configuration.
    
1. When the connection is established, you see fields that are present in the output data.
1. Select **Save** on the command bar to save your configuration.
1. Select **Start** on the command bar to start the streaming flow to capture data. Then in the **Start Stream Analytics job** window:
    1. Choose the output start time.
    1. Select the number of Streaming Units (SU) that the job runs with. SU represents the computing resources that are allocated to execute a Stream Analytics job. For more information, see [Streaming Units in Azure Stream Analytics](stream-analytics-streaming-unit-consumption.md).  
        Screenshot showing the Start Stream Analytics job window where you set the output start time, streaming units, and error handling.


1. After you select **Start**, the job starts running within two minutes, and the metrics open in the tab section as shown in the following image.
    Screenshot showing the metrics chart.

1. You can see the new job on the **Stream Analytics jobs** tab.
    Screenshot showing Open Metrics link selected.


## Verify output
Verify that the parquet files with Delta lake format are generated in the Azure Data Lake Storage container. 

Screenshot showing the generated Parquet files in the Azure Data Lake Storage (ADLS) container.


## Considerations when using the Event Hubs Geo-replication feature
Azure Event Hubs recently launched the [Geo-Replication](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-hubs/geo-replication.md) feature in public preview. This feature is different from the [Geo Disaster Recovery](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-hubs/event-hubs-geo-dr.md) feature of Azure Event Hubs.

When the failover type is **Forced** and replication consistency is **Asynchronous**, Stream Analytics job doesn't guarantee exactly once output to an Azure Event Hubs output. 

Azure Stream Analytics, as **producer** with an event hub an output, might observe watermark delay on the job during failover duration and during throttling by Event Hubs in case replication lag  between primary and secondary reaches the maximum configured lag.

Azure Stream Analytics, as **consumer** with Event Hubs as Input, might observe watermark delay on the job during failover duration and might skip data or find duplicate data after failover is complete. 

Due to these caveats, restart the Stream Analytics job with appropriate start time right after Event Hubs failover is complete. Also, since Event Hubs Geo-replication feature is in public preview, don't use this pattern for production Stream Analytics jobs at this point. The current Stream Analytics behavior will improve before the Event Hubs Geo-replication feature is generally available and can be used in Stream Analytics production jobs.

## Next steps

Now you know how to use the Stream Analytics no code editor to create a job that captures Event Hubs data to Azure Data Lake Storage Gen2 in Delta lake format. Next, you can learn more about Azure Stream Analytics and how to monitor the job that you created.

* [Introduction to Azure Stream Analytics](stream-analytics-introduction.md)
* [Monitor Stream Analytics job with Azure portal](stream-analytics-monitoring.md)
