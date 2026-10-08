---
title: Enrich data and ingest to event hub using the Stream Analytics no code editor
description: Learn how to use the no code editor to easily create a Stream Analytics job to enrich the data and ingest to event hub.
ms.service: azure-stream-analytics
ms.topic: how-to
ms.date: 10/12/2022
ms.custom: sfi-image-nochange
---

# Enrich data and ingest to event hub using the Stream Analytics no code editor

This article describes how you can use the no code editor to easily create a Stream Analytics job. It continuously reads from your Event Hubs, enrich the incoming data with SQL reference data, and then writes the results continuously to event hub.

## Prerequisites

- Your Azure Event Hubs and SQL reference data resources must be publicly accessible and not be behind a firewall or secured in an Azure Virtual Network
- The data in your Event Hubs must be serialized in either JSON, CSV, or Avro format.

## Develop a Stream Analytics job to enrich event hub data

1. In the Azure portal, locate and select the Azure Event Hubs instance.
1. Select **Features** > **Process Data** and then select **Start** on the **Enrich data and ingest to Event Hub** card.
  
    Screenshot showing the Filter and ingest to ADLS Gen2 card where you select Start.

1. Enter a name for the Stream Analytics job, then select **Create**.  
    
    Screenshot showing where to enter a job name.

1. Specify the **Serialization type** of your data in the Event Hubs window and the **Authentication method** that the job will use to connect to the Event Hubs. Then select **Connect**.  
    Screenshot showing the Event Hubs connection configuration.

1. When the connection is established successfully and you have data streams flowing into your Event Hubs instance, you'll immediately see two things:
    - Fields that are present in the input data. You can choose **Add field** or select the three dot symbol next to a field to remove, rename, or change its type.  
        Screenshot showing the Event Hubs field list where you can remove, rename, or change the field type.
    - A live sample of incoming data in the **Data preview** table under the diagram view. It automatically refreshes periodically. You can select **Pause streaming preview** to see a static view of the sample input data.  
        Screenshot showing sample data under Data Preview.

1. Select the **Reference SQL input** tile to connect to the reference SQL database.  
    Screenshot that shows the sql reference data connection configuration.

1. Select the **Join** tile. In the right configuration panel, choose a field from each input to join the incoming data from the two inputs.

    Screenshot that shows the join operator configuration.

1. Select the **Manage** tile. In the **Manage fields** configuration panel, choose the fields you want to output to event hub. If you want to add all the fields, select **Add all fields**.

    Screenshot that shows the manage field operator configuration.

1. Select **Event Hub** tile. In the **Event Hub** configuration panel, fill in needed parameters and connect, similarly to the input event hub configuration.

1. Optionally, select **Get static preview/Refresh static preview** to see the data preview that will be ingested in event hub.  
    Screenshot showing the Get static preview/Refresh static preview option.

1. Select **Save** and then select **Start** the Stream Analytics job.  
    Screenshot showing the Save and Start options.

1. To start the job, specify:  
    - The number of **Streaming Units (SUs)** the job runs with. SUs represents the amount of compute and memory allocated to the job. We recommended that you start with three and then adjust as needed. 
    - **Output data error handling** – It allows you to specify the behavior you want when a job’s output to your destination fails due to data errors. By default, your job retries until the write operation succeeds. You can also choose to drop such output events.  
        Screenshot showing the Start Stream Analytics job options where you can change the output time, set the number of streaming units, and select the Output data error handling options.

1. After you select **Start**, the job starts running within two minutes, and the metrics will be open in tab section below.   

    Screenshot that shows the job metrics data after it's started.

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
