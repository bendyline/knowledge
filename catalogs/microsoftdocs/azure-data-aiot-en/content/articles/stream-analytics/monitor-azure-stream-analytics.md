---
title: Monitor Azure Stream Analytics
description: Start here to learn how to monitor Azure Stream Analytics.
ms.date: 03/21/2024
ms.custom: horz-monitor
ms.topic: how-to
author: spelluru
ms.author: spelluru
ms.service: azure-stream-analytics
---

# Monitor Azure Stream Analytics

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-intro.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/stream-analytics/monitor-azure-stream-analytics.md)

For instructions on how to monitor and manage Azure Stream Analytics resources with Azure PowerShell cmdlets and PowerShell scripting, see [Monitor and manage Stream Analytics jobs with Azure PowerShell cmdlets](stream-analytics-monitor-and-manage-jobs-use-powershell.md).

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-resource-types.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/stream-analytics/monitor-azure-stream-analytics.md)
For more information about the resource types for Azure Stream Analytics, see [Azure Stream Analytics monitoring data reference](monitor-azure-stream-analytics-reference.md).

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-data-storage.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/stream-analytics/monitor-azure-stream-analytics.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-platform-metrics.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/stream-analytics/monitor-azure-stream-analytics.md)

### Azure Stream Analytics metrics

For a description of how to monitor metrics in the Azure portal, see [Monitor Stream Analytics job with Azure portal](stream-analytics-monitoring.md).

>**Note:**
>Azure Stream Analytics jobs that are created via REST APIs, Azure SDK, or PowerShell don't have monitoring enabled by default. To enable monitoring, follow the steps in [Programmatically create a Stream Analytics job monitor](stream-analytics-monitor-jobs.md). The monitoring data then appears in the **Metrics** area of the Azure portal page for your Stream Analytics job.

The following table lists conditions and corrective actions for some commonly monitored Azure Stream Analytics metrics.


| Metric | Condition | Time aggregation | Threshold | Corrective actions |
| --- | --- | --- | --- | --- |
| **SU (Memory) % Utilization** | Greater than | Average | 80 | Multiple factors increase the utilization of SUs. You can scale with query parallelization or increase the number of SUs. For more information, see [Leverage query parallelization in Azure Stream Analytics](stream-analytics-parallelization.md). |
| **CPU % Utilization** | Greater than | Average | 90 | This likely means that some operations (such as user-defined functions, user-defined aggregates, or complex input deserialization) are requiring a lot of CPU cycles. You can usually overcome this problem by increasing the number of SUs for the job. |
| **Runtime Errors** | Greater than | Total | 0 | Examine the activity or resource logs and make appropriate changes to the inputs, query, or outputs. |
| **Watermark Delay** | Greater than | Average | When the average value of this metric over the last 15 minutes is greater than the late arrival tolerance (in seconds). If you haven't modified the late arrival tolerance, the default is set to 5 seconds. | Try increasing the number of SUs or parallelizing your query. For more information on SUs, see [Understand and adjust streaming units](stream-analytics-streaming-unit-consumption.md#how-many-sus-are-required-for-a-job). For more information on parallelizing your query, see [Leverage query parallelization in Azure Stream Analytics](stream-analytics-parallelization.md). |
| **Input Deserialization Errors** | Greater than | Total | 0 | Examine the activity or resource logs and make appropriate changes to the input. For more information on resource logs, see [Troubleshoot Azure Stream Analytics by using resource logs](stream-analytics-job-diagnostic-logs.md). |


For a list and descriptions of all available metrics for Azure Stream Analytics, see [Azure Stream Analytics monitoring data reference](monitor-azure-stream-analytics-reference.md#metrics).

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-resource-logs.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/stream-analytics/monitor-azure-stream-analytics.md)

### Azure Stream Analytics logs



Azure Stream Analytics captures two categories of resource logs:

* **Authoring**: Captures log events that are related to job authoring operations, such as job creation, adding and deleting inputs and outputs, adding and updating the query, and starting or stopping the job.

* **Execution**: Captures events that occur during job execution.
    * Connectivity errors
    * Data processing errors, including:
        * Events that don’t conform to the query definition (mismatched field types and values, missing fields, and so on)
        * Expression evaluation errors
    * Other events and errors

For the available resource log categories, their associated Log Analytics tables, and the log schemas for Azure Stream Analytics, see [Azure Stream Analytics monitoring data reference](monitor-azure-stream-analytics-reference.md#resource-logs).

For a detailed walkthrough of how to troubleshoot Azure Stream Analytics job failures by using resource logs, see [Troubleshoot Azure Stream Analytics by using resource logs](stream-analytics-job-diagnostic-logs.md).

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-activity-log.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/stream-analytics/monitor-azure-stream-analytics.md)

For a detailed walkthrough of how to troubleshoot Azure Stream Analytics job failures by using the activity log, see [Debug Stream Analytics jobs by using activity logs](stream-analytics-job-diagnostic-logs.md#debug-stream-analytics-jobs-by-using-activity-logs).

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-analyze-data.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/stream-analytics/monitor-azure-stream-analytics.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-external-tools.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/stream-analytics/monitor-azure-stream-analytics.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-kusto-queries.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/stream-analytics/monitor-azure-stream-analytics.md)

### Sample queries

Following are sample queries that you can use to help monitor your Azure Stream Analytics resources:

- List all input data errors. The following query shows all errors that occurred while processing the data from inputs. 

    ```kusto
    AzureDiagnostics 
    | where ResourceProvider == "MICROSOFT.STREAMANALYTICS" and parse_json(properties_s).Type == "DataError" 
    | project TimeGenerated, Resource, Region_s, OperationName, properties_s, Level, _ResourceId        
    ```
- Events that arrived late. The following query shows errors due to events where difference between application time and arrival time is greater than the late arrival policy. 

    ```kusto
    AzureDiagnostics
    | where ResourceProvider == "MICROSOFT.STREAMANALYTICS" and  parse_json(properties_s).DataErrorType == "LateInputEvent"
    | project TimeGenerated, Resource, Region_s, OperationName, properties_s, Level, _ResourceId
    ```
- Events that arrived early. The following query shows errors due to events where difference between Application time and Arrival time is greater than 5 minutes. 
    
    ```kusto
    AzureDiagnostics
    | where ResourceProvider == "MICROSOFT.STREAMANALYTICS" and parse_json(properties_s).DataErrorType == "EarlyInputEvent"
    | project TimeGenerated, Resource, Region_s, OperationName, properties_s, Level, _ResourceId    
    ```
- Events that arrived out of order. The following query shows errors due to events that arrive out of order according to the out-of-order policy. 
    
    ```kusto
    // To create an alert for this query, click '+ New alert rule'
    AzureDiagnostics
    | where ResourceProvider == "MICROSOFT.STREAMANALYTICS" and parse_json(properties_s).DataErrorType == "OutOfOrderEvent"
    | project TimeGenerated, Resource, Region_s, OperationName, properties_s, Level, _ResourceId    
    ```
- All output data errors. The following query shows all errors that occurred while writing the results of the query to the outputs in your job. 

    ```kusto
    AzureDiagnostics
    | where ResourceProvider == "MICROSOFT.STREAMANALYTICS" and parse_json(properties_s).DataErrorType in ("OutputDataConversionError.RequiredColumnMissing", "OutputDataConversionError.ColumnNameInvalid", "OutputDataConversionError.TypeConversionError", "OutputDataConversionError.RecordExceededSizeLimit", "OutputDataConversionError.DuplicateKey")
    | project TimeGenerated, Resource, Region_s, OperationName, properties_s, Level, _ResourceId
    ```
- The following query shows the summary of failed operations in the last seven days. 

    ```kusto
    AzureDiagnostics
    | where TimeGenerated > ago(7d) //last 7 days
    | where ResourceProvider == "MICROSOFT.STREAMANALYTICS" and status_s == "Failed" 
    | summarize Count=count(), sampleEvent=any(properties_s) by JobName=Resource        
    ```

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-alerts.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/stream-analytics/monitor-azure-stream-analytics.md)

### Azure Stream Analytics alert rules

The following table lists some suggested alert rules for Azure Stream Analytics. These alerts are just examples. You can set alerts for any metric, log entry, or activity log entry listed in the [Azure Stream Analytics monitoring data reference](monitor-azure-stream-analytics-reference.md).

| Alert type | Condition | Description |
| :--- | :--- | :--- |
| Platform metrics | Streaming unit (SU) Memory Utilization | Whenever average SU (Memory) % Utilization is greater than 80% |
| Activity log | Failed operations | Whenever the activity log has an event with Category='Administrative', Signal name='All Administrative operations', Status='Failed' |

For detailed instructions on how to set up an alert for Azure Stream Analytics, see [Set up alerts for Azure Stream Analytics jobs](stream-analytics-set-up-alerts.md).

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-advisor-recommendations.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/stream-analytics/monitor-azure-stream-analytics.md)

## Related content

- See [Monitoring Azure resources with Azure Monitor](https://learn.microsoft.com/azure/azure-monitor/essentials/monitor-azure-resource) for general details on monitoring Azure resources.
- See [Azure Stream Analytics monitoring data reference](monitor-azure-stream-analytics-reference.md) for a reference of the metrics, logs, and other important values created for Azure Stream Analytics.
- See the following Azure Stream Analytics monitoring and troubleshooting articles:
  - [Monitor jobs using Azure portal](stream-analytics-monitoring.md)
  - [Monitor jobs using Azure PowerShell](stream-analytics-monitor-and-manage-jobs-use-powershell.md)
  - [Monitor jobs using Azure .NET SDK](stream-analytics-monitor-jobs.md)
  - [Set up alerts](stream-analytics-set-up-alerts.md)
  - [Troubleshoot Azure Stream Analytics by using resource logs](stream-analytics-job-diagnostic-logs.md)
  - [Use activity and resource logs](stream-analytics-job-diagnostic-logs.md)
