---
title: Getting started with wrangling data flow in Azure Data Factory 
description: A tutorial on how to prepare data in Azure Data Factory using wrangling data flow 
author: kromerm
ms.author: makromer
ms.subservice: data-flows
ms.topic: tutorial
ms.date: 05/15/2024
ms.custom: sfi-image-nochange
---

# Prepare data with data wrangling

**APPLIES TO:** Azure Data Factory Azure Synapse Analytics


> **Tip:**
> [Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory) is the next generation of Azure Data Factory, with a simpler architecture, built-in AI, and new features. If you're new to data integration, start with Fabric Data Factory. Existing ADF workloads can upgrade to Fabric to access new capabilities across data science, real-time analytics, and reporting.
>
> - [Start a Fabric free trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
> - [Upgrade from Azure Data Factory to Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory/migrate-planning-azure-data-factory).


Data wrangling in data factory allows you to build interactive Power Query mash-ups natively in ADF and then execute those at scale inside of an ADF pipeline.

## Create a Power Query activity

There are two ways to create a Power Query in Azure Data Factory. One way is to click the plus icon and select **Power Query** in the factory resources pane.

Screenshot that shows Power Query in the factory resources pane.

The other method is in the activities pane of the pipeline canvas. Open the **Power Query** accordion and drag the **Power Query** activity onto the canvas.

Screenshot that highlights the data wrangling option.

## Author a Power Query data wrangling activity

> [!VIDEO https://learn-video.azurefd.net/vod/player?id=09ee032a-9660-4f48-a1f4-0b805e18dd5d]
> 
Add a **Source dataset** for your Power Query mash-up. You can either choose an existing dataset or create a new one. After you have saved your mash-up, you can then create a pipeline, add the Power Query data wrangling activity to your pipeline and select a sink dataset to tell ADF where to land your data. While you can choose one or more source datasets, only one sink is allowed at this time. Choosing a sink dataset is optional, but at least one source dataset is required.

Wrangling

Click **Create** to open the Power Query Online mashup editor.

First, you will choose a dataset source for the mashup editor.

Power Query source.

Once you have completed building your Power Query, you can save it and then create a pipeline. You need to add the mashup as an activity to your pipeline. That is when you will create/select the sink dataset to land your data. You can also set the sink dataset properties by clicking on the second button on the right side of the sinked dataset. Remember to change the "partition option" under "Optimize" to "Single partition" if you only want to get a single output file.

Power Query sink.

Author your wrangling Power Query using code-free data preparation. For the list of available functions, see [transformation functions](wrangling-functions.md). ADF translates the M script into a data flow script so that you can execute your Power Query at scale using the Azure Data Factory data flow Spark environment.

Screenshot that shows the process for authoring your data wrangling Power Query.

## Running and monitoring a Power Query data wrangling activity

To execute a pipeline debug run of a Power Query activity, click **Debug** in the pipeline canvas. Once you publish your pipeline, **Trigger now** executes an on-demand run of the last published pipeline. Power Query pipelines can be schedule with all existing Azure Data Factory triggers.

Screenshot that shows how to add a Power Query data wrangling activity.

Go to the **Monitor** tab to visualize the output of a triggered Power Query activity run.

Screenshot that shows the output of a triggered wrangling Power Query activity run.

## Related content

Learn how to [create a mapping data flow](tutorial-data-flow.md).
