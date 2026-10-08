---
title: Filter and ingest to Azure Synapse SQL using the Stream Analytics no code editor
description: Learn how to use the no code editor to easily create a Stream Analytics job. It continuously reads from your Event Hubs, filters the incoming data, and then writes the results continuously to a Synapse SQL table.
ms.service: azure-stream-analytics
ms.topic: how-to
ms.date: 10/12/2022
ms.custom:
  - mvc
  - sfi-image-nochange
---

# Filter and ingest to Azure Synapse SQL using the Stream Analytics no code editor

This article describes how you can use the no code editor to easily create a Stream Analytics job. It continuously reads from your Event Hubs, filters the incoming data, and then writes the results continuously to Synapse SQL table.

## Prerequisites

- Your Azure Event Hubs resources must be publicly accessible and can't be behind a firewall or secured in an Azure Virtual Network.
- The data in your Event Hubs must be serialized in either JSON, CSV, or Avro format.

## Develop a Stream Analytics job to filter and ingest data

Use the following steps to develop a Stream Analytics job to filter and ingest real time data into a Synapse SQL table.

1. In the Azure portal, locate and select your Azure Event Hubs instance.
1. Select **Features** > **Process Data**, and select **Start** on the **Filter and ingest to Synapse SQL** card.  
    Screenshot showing the Process Event Hubs data start cards.
1. Enter a name to identify your Stream Analytics job, then select **Create**.  
    Screenshot showing the New Stream Analytics job window where you enter the job name.
1. Specify the **Serialization type** of your data in the Event Hubs window and the **Authentication method** that the job will use to connect to the Event Hubs. Then select **Connect**.  
    Screenshot showing the Event Hubs connection configuration.
1. When the connection is established successfully and you have data streams flowing into your Event Hubs instance, you'll immediately see two things:
    - Fields that are present in the input data. You can choose **Add field** or select the three dot symbol next to a field to remove, rename, or change its type.  
        Screenshot showing the Event Hubs field list where you can remove, rename, or change the field type.
    - A live sample of incoming data in the **Data preview** table under the diagram view. It automatically refreshes periodically. You can select **Pause streaming preview** to see a static view of the sample input data.  
        Screenshot showing sample data under Data Preview.
1. In the Filter area, select a field to filter the incoming data with a condition.  
    Screenshot showing the Filter area where you can filter incoming data with a condition.
1. Select the Synapse SQL table to send your filtered data:
    1. Select the **Subscription**, **Database (dedicated SQL pool name)** and **Authentication method** from the drop-down menu.
    1. Enter Table name where the filtered data will be ingested. Select **Connect**.  
        Screenshot showing Synapse SQL table connection details.
    > **Note:**
    > The table schema must exactly match the number of fields and their types that your data preview generates.  
1. Optionally, select **Get static preview/Refresh static preview** to see the data preview that will be ingested in selected Synapse SQL table.  
    Screenshot showing the Get static preview/Refresh static preview option.
1. Select **Save** and then select **Start** the Stream Analytics job.  
    Screenshot showing the Save and Start options.
1. To start the job, specify:  
    - The number of **Streaming Units (SUs)** the job runs with. SUs represents the amount of compute and memory allocated to the job. We recommended that you start with three and then adjust as needed. 
    - **Output data error handling** – It allows you to specify the behavior you want when a job’s output to your destination fails due to data errors. By default, your job retries until the write operation succeeds. You can also choose to drop such output events.  
        Screenshot showing the Start Stream Analytics job options where you can change the output time, set the number of streaming units, and select the Output data error handling options.
1. After you select **Start**, the job starts running within two minutes and the metrics will be open in tab section below.   

    You can also see the job under the Process Data section on the **Stream Analytics jobs** tab. Select **Open metrics** to monitor it or stop and restart it, as needed.

    Screenshot of the Stream Analytics jobs tab where you view the running jobs status.


## Considerations when using the Event Hubs Geo-replication feature
Azure Event Hubs recently launched the [Geo-Replication](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-hubs/geo-replication.md) feature in public preview. This feature is different from the [Geo Disaster Recovery](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-hubs/event-hubs-geo-dr.md) feature of Azure Event Hubs.

When the failover type is **Forced** and replication consistency is **Asynchronous**, Stream Analytics job doesn't guarantee exactly once output to an Azure Event Hubs output. 

Azure Stream Analytics, as **producer** with an event hub an output, might observe watermark delay on the job during failover duration and during throttling by Event Hubs in case replication lag  between primary and secondary reaches the maximum configured lag.

Azure Stream Analytics, as **consumer** with Event Hubs as Input, might observe watermark delay on the job during failover duration and might skip data or find duplicate data after failover is complete. 

Due to these caveats, restart the Stream Analytics job with appropriate start time right after Event Hubs failover is complete. Also, since Event Hubs Geo-replication feature is in public preview, don't use this pattern for production Stream Analytics jobs at this point. The current Stream Analytics behavior will improve before the Event Hubs Geo-replication feature is generally available and can be used in Stream Analytics production jobs.

## Next steps

Learn more about Azure Stream Analytics and how to monitor the job you've created.

* [Introduction to Azure Stream Analytics](stream-analytics-introduction.md)
* [Monitor Stream Analytics job with Azure portal](stream-analytics-monitoring.md)
