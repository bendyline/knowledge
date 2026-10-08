---
title: Operationalize Data Pipelines
description: Learn about how to deliver service level agreements for data pipelines
ms.subservice: orchestration
author: kromerm
ms.author: makromer
ms.reviewer: whhender
ms.topic: tutorial
ms.date: 05/15/2024
---

# Deliver service level agreement for data pipelines

**APPLIES TO:** Azure Data Factory Azure Synapse Analytics


> **Tip:**
> [Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory) is the next generation of Azure Data Factory, with a simpler architecture, built-in AI, and new features. If you're new to data integration, start with Fabric Data Factory. Existing ADF workloads can upgrade to Fabric to access new capabilities across data science, real-time analytics, and reporting.
>
> - [Start a Fabric free trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
> - [Upgrade from Azure Data Factory to Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory/migrate-planning-azure-data-factory).


Azure Data Factory is loved and trusted by corporations around the world. As Azure's native cloud ETL service for scale-out server-less data integration and data transformation, it's widely used to implement Data Pipelines to prepare, process, and load data into enterprise data warehouse or data lake.

Once data pipelines are published, either through [continuous integration and delivery (CI/CD)](continuous-integration-delivery.md) in Git mode or directly in live mode, they typically run on autopilot. They may run on a pre-defined timetable, with a [Schedule Trigger](how-to-create-schedule-trigger.md) or a [Tumbling Window Trigger](how-to-create-tumbling-window-trigger.md), or they may run in an event driven architecture, with a [Storage Event Trigger](how-to-create-event-trigger.md) or a [Custom Event Trigger](how-to-create-custom-event-trigger.md). They're entrusted with mission critical workloads, preparing data for business reports or data analytics and machine learning projects.

## Preemptive warnings for long-running jobs

There are two major challenges delivering service level agreements (SLAs) for these data pipelines:

* Compute environment for activities, for instance SQL for a Stored Procedure activity, may throttle, slowing down the whole data pipeline and jeopardizing pipeline SLA.
* Pipeline developers aren't always actively monitoring the factory, and proactively seeking out long running pipelines that will miss SLAs.

To address these issues, when configured properly, pipeline runs emit _Elapsed Time Pipeline Run_ metrics in cases of missing SLA. Combined with [Data Factory Alerts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/data-factory/monitor-metrics-alerts.md#data-factory-alerts), we empower data pipelines developers to better deliver SLAs to their customers: you tell us how long a pipeline should run, and we'll notify you, proactively, when the pipeline runs longer than expected.

For each pipeline you want to create alerts on, during authoring phase, go to pipeline settings, by clicking on the blank space in the pipeline canvas.

Screenshot showing how to specify expected run duration for a pipeline.

Under __Settings__ tab, check Elapsed time metric, and specify expected pipeline run duration, with format `D.HH:MM:SS`. We strongly recommend you to set it to your business SLA, the amount of time that the pipeline can take to meet your business needs. Once a pipeline duration exceeds this setting, Data Factory will log an _Elapsed Time Pipeline Run_ metric (metric ID: `PipelineElapsedTimeRuns`) in Azure Monitor. In other words, you'll get notified about long running pipelines _preemptively_, before the pipeline eventually finishes.

We understand some pipelines will naturally take more time to finish than others, since they have more steps, or move more data. There isn't any one-size-fit-all definition for long running pipelines. We kindly ask you to define the threshold for every pipeline that you need a SLA on. And when logging the metric for a particular pipeline, we'll compare to its user-defined setting for expected run duration.

> **Note:**
> This is a per pipeline opt in feature. No metric will ever be logged for a pipeline, if no expected run duration is specified for the aforementioned pipeline.

Follow the steps to set up [Data Factory Alerts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/data-factory/monitor-metrics-alerts.md#data-factory-alerts) on the metric. Your engineers will get notified to intervene and take steps to meet the SLAs, through emails or SMSs.

## Related content

[Data Factory metrics and alerts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/data-factory/monitor-metrics-alerts.md)

[Monitor Visually](monitor-visually.md#alerts)
