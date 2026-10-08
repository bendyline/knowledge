---
title: Monitoring data reference for Azure Event Hubs
description: This article contains important reference material you need when you monitor Azure Event Hubs by using Azure Monitor.
ms.date: 07/14/2025
ms.custom: horz-monitor, subject-monitoring
ms.topic: reference
---

# Azure Event Hubs monitoring data reference

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-intro.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-hubs/monitor-event-hubs-reference.md)

See [Monitor Azure Event Hubs](monitor-event-hubs.md) for details on the data you can collect for Event Hubs and how to use it.

Azure Event Hubs creates monitoring data using [Azure Monitor](https://learn.microsoft.com/azure/azure-monitor/overview), which is a full stack monitoring service in Azure. Azure Monitor provides a complete set of features to monitor your Azure resources. It can also monitor resources in other clouds and on-premises.

Azure Event Hubs collects the same kinds of monitoring data as other Azure resources that are described in [Monitoring data from Azure resources](https://learn.microsoft.com/azure/azure-monitor/essentials/monitor-azure-resource#monitoring-data).

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-metrics-intro.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-hubs/monitor-event-hubs-reference.md)

### Supported metrics for Microsoft.EventHub/clusters

The following table lists the metrics available for the Microsoft.EventHub/clusters resource type.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-metrics-tableheader.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-hubs/monitor-event-hubs-reference.md)
[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/reference/metrics/microsoft-eventhub-clusters-metrics-include.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-hubs/monitor-event-hubs-reference.md)

### Supported metrics for Microsoft.EventHub/Namespaces

The following table lists the metrics available for the Microsoft.EventHub/Namespaces resource type.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-metrics-tableheader.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-hubs/monitor-event-hubs-reference.md)
[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/reference/metrics/microsoft-eventhub-namespaces-metrics-include.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-hubs/monitor-event-hubs-reference.md)

The following tables list all the automatically collected platform metrics collected for Azure Event Hubs. The resource provider for these metrics is `Microsoft.EventHub/clusters` or `Microsoft.EventHub/namespaces`.

*Request metrics* count the number of data and management operations requests. This table provides more information about values from the preceding tables.

| Metric name | Description |
| :--- | :--- |
| Incoming Requests | The number of requests made to the Event Hubs service over a specified period. This metric includes all the data and management plane operations. |
| Successful Requests | The number of successful requests made to the Event Hubs service over a specified period. |
| Throttled Requests | The number of requests that were throttled because the usage was exceeded. |

This table provides more information for message metrics from the preceding tables.

| Metric name | Description |
| :--- | :--- |
| Incoming Messages | The number of events or messages sent to Event Hubs over a specified period. |
| Outgoing Messages | The number of events or messages received from Event Hubs over a specified period. |
| Captured Messages | The number of captured messages. |
| Incoming Bytes | Incoming bytes for an event hub over a specified period. |
| Outgoing Bytes | Outgoing bytes for an event hub over a specified period. |
| Size | Size of an event hub in bytes. |

> **Note:**
> - These values are point-in-time values. Incoming messages that are consumed immediately after that point-in-time might not be reflected in these metrics.
> - The Incoming Requests metric includes all the data and management plane operations. The Incoming Messages metric gives you the total number of events that are sent to the event hub. For example, if you send a batch of 100 events to an event hub, it counts as 1 incoming request and 100 incoming messages.

This table provides more information for capture metrics from the preceding tables.

| Metric name | Description |
| :--- | :--- |
| Captured Messages | The number of captured messages. |
| Captured Bytes | Captured bytes for an event hub. |
| Capture Backlog | Capture backlog for an event hub. |

This table provides more information for connection metrics from the preceding tables.

| Metric name | Description |
| :--- | :--- |
| Active Connections | The number of active connections on a namespace and on an entity (event hub) in the namespace. Value for this metric is a point-in-time value. Connections that were active immediately after that point-in-time might not be reflected in the metric. |
| Connections Opened | The number of open connections. |
| Connections Closed | The number of closed connections. |

This table provides more information for error metrics from the preceding tables.

| Metric name | Description |
| :--- | :--- |
| Server Errors | The number of requests not processed because of an error in the Event Hubs service over a specified period. |
| User Errors | The number of requests not processed because of user errors over a specified period. |
| Quota Exceeded Errors | The number of errors caused by exceeding quotas over a specified period. |

The following two types of errors are classified as *user errors*:

1. Client-side errors (In HTTP that would be 400 errors).
2. Errors that occur while processing messages.

> **Note:**
> Logic Apps creates epoch receivers. Receivers can be moved from one node to another depending on the service load. During those moves, `ReceiverDisconnection` exceptions might occur. They are counted as user errors on the Event Hubs service side. Logic Apps can collect failures from Event Hubs clients so that you can view them in user logs.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-metrics-dimensions-intro.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-hubs/monitor-event-hubs-reference.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-metrics-dimensions.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-hubs/monitor-event-hubs-reference.md)

| Dimension name | Description |
| :--- | :--- |
| EntityName | Name of the event hub. With the 'Incoming Requests' metric, the Entity Name dimension has a value of `-NamespaceOnlyMetric-` in addition to all your event hubs. It represents the requests that were made at the namespace level. Examples include a  request to list all event hubs in the namespace or requests to entities that failed authentication or authorization. |
| OperationResult | Either indicates `success` or the appropriate error state, such as `serverbusy`, `clienterror` or `quotaexceeded`. |

Adding dimensions to your metrics is optional. If you don't add dimensions, metrics are specified at the namespace level.

> **Note:**
> When you enable metrics in a diagnostic setting, dimension information isn't currently included as part of the information sent to a storage account, event hub, or log analytics.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-resource-logs.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-hubs/monitor-event-hubs-reference.md)

### Supported resource logs for Microsoft.EventHub/Namespaces

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/reference/logs/microsoft-eventhub-namespaces-logs-include.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-hubs/monitor-event-hubs-reference.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-logs-tables.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-hubs/monitor-event-hubs-reference.md)

### Event Hubs Microsoft.EventHub/namespaces

- [AzureActivity](https://learn.microsoft.com/azure/azure-monitor/reference/tables/azureactivity#columns)
- [AzureMetrics](https://learn.microsoft.com/azure/azure-monitor/reference/tables/azuremetrics#columns)
- [AzureDiagnostics](https://learn.microsoft.com/azure/azure-monitor/reference/tables/azurediagnostics#columns)
- [AZMSApplicationMetricLogs](https://learn.microsoft.com/azure/azure-monitor/reference/tables/azmsapplicationmetriclogs#columns)
- [AZMSOperationalLogs](https://learn.microsoft.com/azure/azure-monitor/reference/tables/azmsoperationallogs#columns)
- [AZMSRunTimeAuditLogs](https://learn.microsoft.com/azure/azure-monitor/reference/tables/azmsruntimeauditlogs#columns)
- [AZMSDiagnosticErrorLogs](https://learn.microsoft.com/azure/azure-monitor/reference/tables/azmsdiagnosticerrorlogs#columns)
- [AZMSVnetConnectionEvents](https://learn.microsoft.com/azure/azure-monitor/reference/tables/azmsvnetconnectionevents#columns)
- [AZMSArchiveLogs](https://learn.microsoft.com/azure/azure-monitor/reference/tables/azmsarchivelogs#columns)
- [AZMSAutoscaleLogs](https://learn.microsoft.com/azure/azure-monitor/reference/tables/azmsautoscalelogs#columns)
- [AZMSKafkaCoordinatorLogs](https://learn.microsoft.com/azure/azure-monitor/reference/tables/azmskafkacoordinatorlogs#columns)
- [AZMSKafkaUserErrorLogs](https://learn.microsoft.com/azure/azure-monitor/reference/tables/azmskafkausererrorlogs#columns)
- [AZMSCustomerManagedKeyUserLogs](https://learn.microsoft.com/azure/azure-monitor/reference/tables/azmscustomermanagedkeyuserlogs#columns)

### Event Hubs resource logs

Azure Event Hubs now has the capability to dispatch logs to either of two destination tables: Azure Diagnostic or [Resource specific tables](https://learn.microsoft.com/azure/azure-monitor/essentials/resource-logs) in Log Analytics. You could use the toggle available on Azure portal to choose destination tables.

Screenshot of dialog box to set destination table.

Azure Event Hubs uses Kusto tables from Azure Monitor Logs. You can query these tables with Log Analytics. 

You can view our sample queries to get started with different log categories.

> **Important:**
> Dimensions aren't exported to a Log Analytics workspace.


Event Hubs captures diagnostic logs for the following categories:

| Category | Description |
| --- | --- |
| Archive Logs | Captures information about [Event Hubs Capture](event-hubs-capture-overview.md) operations, specifically, logs related to capture errors. |
| Operational Logs | Capture all management operations that are performed on the Azure Event Hubs namespace. Data operations aren't captured, because of the high volume of data operations that are conducted on Azure Event Hubs. |
| Auto scale logs | Captures autoinflate operations done on an Event Hubs namespace. |
| Kafka coordinator logs | Captures Kafka coordinator operations related to Event Hubs. |
| Kafka user error logs | Captures information about Kafka APIs called on Event Hubs. |
| Event Hubs virtual network connection event | Captures information about IP addresses and virtual networks sending traffic to Event Hubs. |
| Customer-managed key user logs | Captures operations related to customer-managed key. |
| Runtime Audit Logs | Capture aggregated diagnostic information for all data plane access operations (such as send or receive events) in Event Hubs. |
| Application Metric Logs | Capture the aggregated information on certain metrics related to data plane operations. |


All logs are stored in JavaScript Object Notation (JSON) format. Each entry has string fields that use the format described in the following sections.

### Archive logs schema

Archive log JSON strings include elements listed in the following table:

| Name | Description | Supported in Azure Diagnostics | Supported in AZMSArchiveLogs (Resource specific table) |
| --- | --- | --- | --- |
| `TaskName` | Description of the task that failed | Yes | Yes |
| `ActivityId` | Internal ID, used for tracking | Yes | Yes |
| `trackingId` | Internal ID, used for tracking | Yes | Yes |
| `resourceId` | Azure Resource Manager resource ID | yes | Yes |
| `eventHub` | Event hub full name (includes namespace name) | Yes | No |
| `EventhubName` | Name of event hub entity | No | Yes |
| `partitionId` | Event hub's partition being written to | Yes | Yes |
| `archiveStep` | possible values: ArchiveFlushWriter, DestinationInit | Yes | Yes |
| `startTime` | Failure start time | Yes | No |
| `Time Generated (UTC)` | Timestamp of operation | No | Yes |
| `failures` | Number of times the failure occurred | Yes | Yes |
| `durationInSeconds` | Duration of failure | Yes | Yes |
| `message` | Error message | Yes | Yes |
| `category` | Log Category | Yes | No |
 | `Provider` | Name of the service emitting the logs, for example, Event Hubs | No | Yes |
 | `Type` | Type of log emitted | No | Yes |

The following code is an example of an archive log JSON string:

AzureDiagnostics: 

```json
{
   "TaskName": "EventHubArchiveUserError",
   "ActivityId": "000000000-0000-0000-0000-0000000000000",
   "trackingId": "0000000-0000-0000-0000-00000000000000000",
   "resourceId": "/SUBSCRIPTIONS/000000000-0000-0000-0000-0000000000000/RESOURCEGROUPS/<Resource Group Name>/PROVIDERS/MICROSOFT.EVENTHUB/NAMESPACES/<Event Hubs Namespace Name>",
   "eventHub": "<Event Hub full name>",
   "partitionId": "1",
   "archiveStep": "ArchiveFlushWriter",
   "startTime": "9/22/2016 5:11:21 AM",
   "failures": 3,
   "durationInSeconds": 360,
   "message": "Microsoft.WindowsAzure.Storage.StorageException: The remote server returned an error: (404) Not Found. ---> System.Net.WebException: The remote server returned an error: (404) Not Found.\r\n   at Microsoft.WindowsAzure.Storage.Shared.Protocol.HttpResponseParsers.ProcessExpectedStatusCodeNoException[T](HttpStatusCode expectedStatusCode, HttpStatusCode actualStatusCode, T retVal, StorageCommandBase`1 cmd, Exception ex)\r\n   at Microsoft.WindowsAzure.Storage.Blob.CloudBlockBlob.<PutBlockImpl>b__3e(RESTCommand`1 cmd, HttpWebResponse resp, Exception ex, OperationContext ctx)\r\n   at Microsoft.WindowsAzure.Storage.Core.Executor.Executor.EndGetResponse[T](IAsyncResult getResponseResult)\r\n   --- End of inner exception stack trace ---\r\n   at Microsoft.WindowsAzure.Storage.Core.Util.StorageAsyncResult`1.End()\r\n   at Microsoft.WindowsAzure.Storage.Core.Util.AsyncExtensions.<>c__DisplayClass4.<CreateCallbackVoid>b__3(IAsyncResult ar)\r\n--- End of stack trace from previous location where exception was thrown ---\r\n   at System.",
   "category": "ArchiveLogs"
}
```
Resource specific table entry:
```json
{
   "TaskName": "EventHubArchiveUserError",
   "ActivityId": "000000000-0000-0000-0000-0000000000000",
   "trackingId": "0000000-0000-0000-0000-00000000000000000",
   "resourceId": "/SUBSCRIPTIONS/000000000-0000-0000-0000-0000000000000/RESOURCEGROUPS/<Resource Group Name>/PROVIDERS/MICROSOFT.EVENTHUB/NAMESPACES/<Event Hubs Namespace Name>",
   "EventHubName": "<Event Hub full name>",
   "partitionId": "1",
   "archiveStep": "ArchiveFlushWriter",
   "TimeGenerated(UTC)": "9/22/2016 5:11:21 AM",
   "failures": 3,
   "durationInSeconds": 360,
   "message": "Microsoft.WindowsAzure.Storage.StorageException: The remote server returned an error: (404) Not Found. ---> System.Net.WebException: The remote server returned an error: (404) Not Found.\r\n   at Microsoft.WindowsAzure.Storage.Shared.Protocol.HttpResponseParsers.ProcessExpectedStatusCodeNoException[T](HttpStatusCode expectedStatusCode, HttpStatusCode actualStatusCode, T retVal, StorageCommandBase`1 cmd, Exception ex)\r\n   at Microsoft.WindowsAzure.Storage.Blob.CloudBlockBlob.<PutBlockImpl>b__3e(RESTCommand`1 cmd, HttpWebResponse resp, Exception ex, OperationContext ctx)\r\n   at Microsoft.WindowsAzure.Storage.Core.Executor.Executor.EndGetResponse[T](IAsyncResult getResponseResult)\r\n   --- End of inner exception stack trace ---\r\n   at Microsoft.WindowsAzure.Storage.Core.Util.StorageAsyncResult`1.End()\r\n   at Microsoft.WindowsAzure.Storage.Core.Util.AsyncExtensions.<>c__DisplayClass4.<CreateCallbackVoid>b__3(IAsyncResult ar)\r\n--- End of stack trace from previous location where exception was thrown ---\r\n   at System.",
   "Provider":"EVENTHUB",
   "Type":"AZMSArchiveLogs"
}
```

### Operational logs schema

Operational log JSON strings include elements listed in the following table:

| Name | Description | Supported in AzureDiagnostics | Supported in AZMSOperationalLogs (Resource specific table) |
| --- | --- | --- | --- |
| `ActivityId` | Internal ID, used for tracking purposes | Yes | Yes |
| `EventName` | Operation name. For a list of values for this element, see the [Event names](#event-names) | Yes | Yes |
| `resourceId` | Azure Resource Manager resource ID | Yes | Yes |
| `SubscriptionId` | Subscription ID | Yes | Yes |
| `EventTimeString` | Operation time | Yes | No |
| `Time Generated (UTC)` | Timestamp of operation | No | Yes |
| `EventProperties` | Properties for the operation. This element provides more information about the event as shown in the following example. | Yes | Yes |
| `Status` | Operation status. The value can be either **Succeeded** or **Failed**. | Yes | Yes |
| `Caller` | Caller of operation (Azure portal or management client) | Yes | Yes |
| `Category` | Log Category | Yes | No |
| `Provider` | Name of the service emitting the logs, for example, Event Hubs | No | Yes |
 | `Type` | Type of logs emitted | No | Yes |

The following code is an example of an operational log JSON string:

AzureDiagnostics:

```json
Example:
{
   "ActivityId": "00000000-0000-0000-0000-00000000000000",
   "EventName": "Create EventHub",
   "resourceId": "/SUBSCRIPTIONS/00000000-0000-0000-0000-0000000000000/RESOURCEGROUPS/<Resource Group Name>/PROVIDERS/MICROSOFT.EVENTHUB/NAMESPACES/<Event Hubs namespace name>",
   "SubscriptionId": "000000000-0000-0000-0000-000000000000",
   "EventTimeString": "9/28/2016 8:40:06 PM +00:00",
   "EventProperties": "{\"SubscriptionId\":\"0000000000-0000-0000-0000-000000000000\",\"Namespace\":\"<Namespace Name>\",\"Via\":\"https://<Namespace Name>.servicebus.windows.net/f8096791adb448579ee83d30e006a13e/?api-version=2016-07\",\"TrackingId\":\"5ee74c9e-72b5-4e98-97c4-08a62e56e221_G1\"}",
   "Status": "Succeeded",
   "Caller": "ServiceBus Client",
   "category": "OperationalLogs"
}
```
Resource specific table entry:

```json
Example:
{
   "ActivityId": "00000000-0000-0000-0000-00000000000000",
   "EventName": "Create EventHub",
   "resourceId": "/SUBSCRIPTIONS/00000000-0000-0000-0000-0000000000000/RESOURCEGROUPS/<Resource Group Name>/PROVIDERS/MICROSOFT.EVENTHUB/NAMESPACES/<Event Hubs namespace name>",
   "SubscriptionId": "000000000-0000-0000-0000-000000000000",
   "TimeGenerated (UTC)": "9/28/2016 8:40:06 PM +00:00",
   "EventProperties": "{\"SubscriptionId\":\"0000000000-0000-0000-0000-000000000000\",\"Namespace\":\"<Namespace Name>\",\"Via\":\"https://<Namespace Name>.servicebus.windows.net/f8096791adb448579ee83d30e006a13e/?api-version=2016-07\",\"TrackingId\":\"5ee74c9e-72b5-4e98-97c4-08a62e56e221_G1\"}",
   "Status": "Succeeded",
   "Caller": "ServiceBus Client",
   "Provider": "EVENTHUB",
   "Type":"AZMSOperationalLogs"
}
```

#### Event names
Event name is populated as operation type + resource type from the following enumerations. For example, `Create Queue`, `Retrieve Event Hub`, or `Delete Rule`. 

| Operation type | Resource type |
| --- | --- |
| - Create<br>- Update<br>- Delete<br>- Retrieve<br>- Unknown | - Namespace<br>- Queue<br>- Topic<br>- Subscription<br>- Event Hubs<br>- SharedAccessPolicy<br>- UsageCredit<br>- Rule<br>- ConsumerGroup |


### Autoscale logs schema
Autoscale log JSON includes elements listed in the following table:

| Name | Description | Supported in Azure Diagnostics | Supported in AZMSAutoscaleLogs (Resource specific table) |
| --- | --- | --- | --- |
| `TrackingId` | Internal ID, which is used for tracing purposes | Yes | Yes |
| `ResourceId` | Azure Resource Manager resource ID. | Yes | Yes |
| `Message` | Informational message, which provides details about autoinflate action. The message contains previous and current value of throughput unit for a given namespace and what triggered the inflate of the TU. | Yes | Yes |
| `Time Generated (UTC)` | Timestamp of operation | No | Yes |
| `Provider` | Name of Service emitting the logs, for example, Event Hubs | No | Yes |
| `Type` | Type of logs emitted | No | Yes |

Here's an example autoscale event: 

AzureDiagnostics:

```json
{
    "TrackingId": "fb1b3676-bb2d-4b17-85b7-be1c7aa1967e",
    "Message": "Scaled-up EventHub TUs (UpdateStartTimeUTC: 5/13/2021 7:48:36 AM, PreviousValue: 1, UpdatedThroughputUnitValue: 2, AutoScaleReason: 'IncomingMessagesPerSecond reached 2170')",
    "ResourceId": "/subscriptions/0000000-0000-0000-0000-000000000000/resourcegroups/testrg/providers/microsoft.eventhub/namespaces/namespace-name"
}
```
Resource specific table entry:

```json
{
    "TrackingId": "fb1b3676-bb2d-4b17-85b7-be1c7aa1967e",
    "Message": "Scaled-up EventHub TUs (UpdateStartTimeUTC: 5/13/2021 7:48:36 AM, PreviousValue: 1, UpdatedThroughputUnitValue: 2, AutoScaleReason: 'IncomingMessagesPerSecond reached 2170')",
    "ResourceId": "/subscriptions/0000000-0000-0000-0000-000000000000/resourcegroups/testrg/providers/microsoft.eventhub/namespaces/namespace-name",
    "timeGenerated (UTC)" : "9/28/2022 8:40:06 PM +00:00",
    "Provider" : "EVENTHUB",
    "Type" : "AZMSAutoscaleLogs"
}
```
### Kafka coordinator logs schema
Kafka coordinator log JSON includes elements listed in the following table:

| Name | Description | Supported in Azure Diagnostics | Supported in AZMSKafkaCoordinatorLogs (Resource specific table) |
| --- | --- | --- | --- |
| `RequestId` | Request ID, which is used for tracing purposes | Yes | Yes |
| `ResourceId` | Azure Resource Manager resource ID | Yes | Yes |
| `Operation` | Name of the operation done during the group coordination | Yes | Yes |
| `ClientId` | Client ID | Yes | Yes |
| `NamespaceName` | Namespace name | Yes | Yes |
| `SubscriptionId` | Azure subscription ID | Yes | Yes |
| `Message` | Informational or warning message, which provides details about actions done during the group coordination. | Yes | Yes |
| `Time Generated (UTC)` | Timestamp of operation | No | Yes |
| `Provider` | Name of Service emitting the logs, for example, ServiceBus | No | Yes |
| `Type` | Type of log emitted | No | Yes |

#### Example

AzureDiagnostics:

```json
{
    "RequestId": "FE01001A89E30B020000000304620E2A_KafkaExampleConsumer#0",
    "Operation": "Join.Start",
    "ClientId": "KafkaExampleConsumer#0",
    "Message": "Start join group for new member namespace-name:c:$default:I:KafkaExampleConsumer#0-cc40856f7f3c4607915a571efe994e82, current group size: 0, API version: 2, session timeout: 10000ms, rebalance timeout: 300000ms.",
    "SubscriptionId": "0000000-0000-0000-0000-000000000000",
    "NamespaceName": "namespace-name",
    "ResourceId": "/subscriptions/0000000-0000-0000-0000-000000000000/resourcegroups/testrg/providers/microsoft.eventhub/namespaces/namespace-name",
    "Category": "KafkaCoordinatorLogs"
}
```
Resource Specific table entry:

```json
{
    "RequestId": "FE01001A89E30B020000000304620E2A_KafkaExampleConsumer#0",
    "Operation": "Join.Start",
    "ClientId": "KafkaExampleConsumer#0",
    "Message": "Start join group for new member namespace-name:c:$default:I:KafkaExampleConsumer#0-cc40856f7f3c4607915a571efe994e82, current group size: 0, API version: 2, session timeout: 10000ms, rebalance timeout: 300000ms.",
    "SubscriptionId": "0000000-0000-0000-0000-000000000000",
    "NamespaceName": "namespace-name",
    "ResourceId": "/subscriptions/0000000-0000-0000-0000-000000000000/resourcegroups/testrg/providers/microsoft.eventhub/namespaces/namespace-name",
    "Time Generated (UTC) ": "9/28/2022 8:40:06 PM +00:00", 
    "Provider" : "EVENTHUB",
    "Type" : "AZMSKafkaCoordinatorLogs"
}
```

### Kafka user error logs schema

Kafka user error log JSON includes elements listed in the following table:

| Name | Description | Supported in Azure Diagnostics | Supported in AZMSKafkaUserErrorLogs (Resource specific table) |
| --- | --- | --- | --- |
| `TrackingId` | Tracking ID, which is used for tracing purposes. | Yes | Yes |
| `NamespaceName` | Namespace name | Yes | Yes |
| `Eventhub` | Event hub name | Yes | Yes |
| `PartitionId` | Partition ID | Yes | Yes |
| `GroupId` | Group ID | Yes | Yes |
| `ClientId` | Client ID | Yes | Yes |
| `ResourceId` | Azure Resource Manager resource ID. | Yes | Yes |
| `Message` | Informational message, which provides details about an error | Yes | Yes |
| `TimeGenerated (UTC)` | Timestamp for executed operation | No | Yes |
| `Provider` | Name of service emitting the logs, for example, Event Hubs | No | Yes |
| `Type` | Type of log emitted | NO | Yes |

### Event Hubs virtual network connection event schema
Event Hubs virtual network (virtual network) connection event JSON includes elements listed in the following table:

| Name | Description | Supported in Azure Diagnostics | Supported in AZMSVNetConnectionevents (Resource specific table) |
| --- | --- | --- | --- |
| `SubscriptionId` | Azure subscription ID | Yes | Yes |
| `NamespaceName` | Namespace name | Yes | Yes |
| `IPAddress` | IP address of a client connecting to the Event Hubs service | Yes | Yes |
| `Action` | Action done by the Event Hubs service when evaluating connection requests. Supported actions are **Accept Connection** and **Deny Connection**. | Yes | Yes |
| `Reason` | Provides a reason why the action was done | Yes | No |
| `Message` | Provides a reason why the action was done | No | Yes |
| `Count` | Number of occurrences for the given action | Yes | Yes |
| `ResourceId` | Azure Resource Manager resource ID. | Yes | Yes |
| `Time Generated (UTC)` | Timestamp of operation | No | Yes |
| `Provider` | Name of Service emitting the logs, for example, ServiceBus | No | Yes |
| `Type` | AZMSVNetConnectionevents | No | Yes |

Virtual network logs are generated only if the namespace allows access from **selected networks** or from **specific IP addresses** (IP filter rules). If you don't want to restrict the access to your namespace using these features and still want to get virtual network logs to track IP addresses of clients connecting to the Event Hubs namespace, you could use the following workaround. [Enable IP filtering](event-hubs-ip-filtering.md), and add the total addressable IPv4 range  (`0.0.0.0/1` - `128.0.0.0/1`) and IPv6 range (`::/1` - `8000::/1`). Event Hubs IP filtering doesn't support IPv6 ranges. You might see private endpoint addresses in the IPv6 format in the log. 

#### Example

AzureDiagnostics:

```json
{
    "SubscriptionId": "0000000-0000-0000-0000-000000000000",
    "NamespaceName": "namespace-name",
    "IPAddress": "1.2.3.4",
    "Action": "Deny Connection",
    "Reason": "IPAddress doesn't belong to a subnet with Service Endpoint enabled.",
    "Count": "65",
    "ResourceId": "/subscriptions/0000000-0000-0000-0000-000000000000/resourcegroups/testrg/providers/microsoft.eventhub/namespaces/namespace-name",
    "Category": "EventHubVNetConnectionEvent"
}
```
Resource specific table entry:

```json
{
    "SubscriptionId": "0000000-0000-0000-0000-000000000000",
    "NamespaceName": "namespace-name",
    "IPAddress": "1.2.3.4",
    "Action": "Deny Connection",
    "Message": "IPAddress doesn't belong to a subnet with Service Endpoint enabled.",
    "Count": "65",
    "ResourceId": "/subscriptions/0000000-0000-0000-0000-000000000000/resourcegroups/testrg/providers/microsoft.eventhub/namespaces/namespace-name",
    "Provider": "EVENTHUB",
    "Time Generated (UTC) ": "9/28/2022 8:40:06 PM +00:00",
    "Type" : "AZMSKafkauserErrorlogs"
     
}
```
### Customer-managed key user logs schema
Customer-managed key user log JSON includes elements listed in the following table:

| Name | Description | Supported in Azure Diagnostics | Supported in AZMSCustomerManagedKeyUserLogs (Resource specific table) |
| --- | --- | --- | --- |
| `Category` | Type of category for a message. It's one of the following values: **error** and **info**. For example, if the key from your key vault is being disabled, then it would be an information category or if a key can't be unwrapped, it could fall under error. | Yes | Yes |
| `ResourceId` | Internal resource ID, which includes Azure subscription ID and namespace name | Yes | Yes |
| `KeyVault` | Name of the Key Vault resource | Yes | Yes |
| `Key` | Name of the Key Vault key that's used to encrypt the Event Hubs namespace. | Yes | Yes |
| `Version` | Version of the Key Vault key. | Yes | Yes |
| `Operation` | The operation that's performed on the key in your key vault. For example, disable/enable the key, wrap, or unwrap. | Yes | Yes |
| `Code` | The code associated with the operation. Example: Error code, 404 means that key wasn't found. | Yes | Yes |
| `Message` | Message, which provides details about an error or informational message | Yes | Yes |
| `Time Generated (UTC)` | Timestamp of operation | No | Yes |
| `Provider` | Name of Service emitting the logs, for example, ServiceBus | No | Yes |
| `Type` | Type of log emitted | No | Yes |

Here's an example of the  log for a customer managed key:

AzureDiagnostics:

```json
{
   "TaskName": "CustomerManagedKeyUserLog",
   "ActivityId": "11111111-1111-1111-1111-111111111111",
   "category": "error"
   "resourceId": "/SUBSCRIPTIONS/11111111-1111-1111-1111-11111111111/RESOURCEGROUPS/DEFAULT-EVENTHUB-CENTRALUS/PROVIDERS/MICROSOFT.EVENTHUB/NAMESPACES/FBETTATI-OPERA-EVENTHUB",
   "keyVault": "https://mykeyvault.vault.azure.net",
   "key": "mykey",
   "version": "1111111111111111111111111111111",
   "operation": "wrapKey",
   "code": "404",
   "message": "Key not found: ehbyok0/111111111111111111111111111111"
}
{
   "TaskName": "CustomerManagedKeyUserLog",
   "ActivityId": "11111111111111-1111-1111-1111111111111",
   "category": "info"
   "resourceId": "/SUBSCRIPTIONS/111111111-1111-1111-1111-11111111111/RESOURCEGROUPS/DEFAULT-EVENTHUB-CENTRALUS/PROVIDERS/MICROSOFT.EVENTHUB/NAMESPACES/FBETTATI-OPERA-EVENTHUB",
   "keyVault": "https://mykeyvault.vault.azure.net",
   "key": "mykey",
   "version": "111111111111111111111111111111",
   "operation": "disable | restore",
   "code": "",
   "message": ""
}
```
Resource specific table entry:

```json
{
   "TaskName": "CustomerManagedKeyUserLog",
   "ActivityId": "11111111-1111-1111-1111-111111111111",
   "category": "error"
   "resourceId": "/SUBSCRIPTIONS/11111111-1111-1111-1111-11111111111/RESOURCEGROUPS/DEFAULT-EVENTHUB-CENTRALUS/PROVIDERS/MICROSOFT.EVENTHUB/NAMESPACES/FBETTATI-OPERA-EVENTHUB",
   "keyVault": "https://mykeyvault.vault.azure.net",
   "key": "mykey",
   "version": "1111111111111111111111111111111",
   "operation": "wrapKey",
   "code": "404",
   "message": "Key not found: ehbyok0/111111111111111111111111111111",
   "Provider": "EVENTHUB",
   "Time Generated (UTC) ": "9/28/2022 8:40:06 PM +00:00",
   "Type" : "AZMSCustomerManagedKeyUserLogs"
}
{
   "TaskName": "CustomerManagedKeyUserLog",
   "ActivityId": "11111111111111-1111-1111-1111111111111",
   "category": "info"
   "resourceId": "/SUBSCRIPTIONS/111111111-1111-1111-1111-11111111111/RESOURCEGROUPS/DEFAULT-EVENTHUB-CENTRALUS/PROVIDERS/MICROSOFT.EVENTHUB/NAMESPACES/FBETTATI-OPERA-EVENTHUB",
   "keyVault": "https://mykeyvault.vault.azure.net",
   "key": "mykey",
   "version": "111111111111111111111111111111",
   "operation": "disable | restore",
   "code": "",
   "message": "",
   "Provider": "EVENTHUB",
   "Time Generated (UTC) ": "9/28/2022 8:40:06 PM +00:00",
   "Type" : "AZMSCustomerManagedKeyUserLogs"
  
}
```
Following are the common errors codes to look for when BYOK encryption is enabled.

| Action | Error code | Resulting state of data |
| --- | --- | --- |
| Remove wrap/unwrap permission from a key vault | 403 | Inaccessible |
| Remove Microsoft Entra ID role membership from a Microsoft Entra principal that granted the wrap/unwrap permission | 403 | Inaccessible |
| Delete an encryption key from the key vault | 404 | Inaccessible |
| Delete the key vault | 404 | Inaccessible (assumes soft-delete is enabled, which is a required setting.) |
| Changing the expiration period on the encryption key such that it's already expired | 403 | Inaccessible |
| Changing the NBF (not before) such that key encryption key isn't active | 403 | Inaccessible |
| Selecting the **Allow MSFT Services** option for the key vault firewall or otherwise blocking network access to the key vault that has the encryption key | 403 | Inaccessible |
| Moving the key vault to a different tenant | 404 | Inaccessible |
| Intermittent network issue or DNS/AAD/MSI outage |  | Accessible using cached data encryption key |



### Runtime audit logs

Runtime audit logs capture aggregated diagnostic information for all data plane access operations (such as send or receive events) in Event Hubs.

> **Note:**
> Runtime audit logs are available only in **premium** and **dedicated** tiers.  

Runtime audit logs include the elements listed in the following table:

| Name | Description | Supported in Azure Diagnostics | Supported in Resource Specific table |
| :--- | :--- | :--- | :--- |
| `ActivityId` | A randomly generated UUID that ensures uniqueness for the audit activity. | Yes | Yes |
| `ActivityName` | Runtime operation name. | Yes | Yes |
| `ResourceId` | Resource associated with the activity. | Yes | Yes |
| `Timestamp` | Aggregation time. | Yes | No |
| `TimeGenerated [UTC]` | Time of executed operation (in UTC) | No | Yes |
| `Status` | Status of the activity (success or failure). | Yes | Yes |
| `Protocol` | Type of the protocol associated with the operation. | Yes | Yes |
| `AuthType` | Type of authentication (Microsoft Entra ID or SAS Policy). | Yes | Yes |
| `AuthKey` | Microsoft Entra ID application ID or SAS policy name that's used to authenticate to a resource. | Yes | Yes |
| `NetworkType` | Type of the network access: `Public` or `Private`. | Yes | Yes |
| `ClientIP` | IP address of the client application. | Yes | Yes |
| `Count` | Total number of operations performed during the aggregated period of 1 minute. | Yes | Yes |
| `Properties` | Metadata that are specific to the data plane operation. | Yes | Yes |
| `Category` | Log category | Yes | No |
| `Provider` | Name of Service emitting the logs, such as EventHubs | No | Yes |
| `Type` | Type of logs emitted | No | Yes |

Here's an example of a runtime audit log entry:

AzureDiagnostics:

```json
{
    "ActivityId": "<activity id>",
    "ActivityName": "ConnectionOpen | Authorization | SendMessage | ReceiveMessage",
    "ResourceId": "/SUBSCRIPTIONS/xxx/RESOURCEGROUPS/<Resource Group Name>/PROVIDERS/MICROSOFT.EVENTHUB/NAMESPACES/<Event Hubs namespace>/eventhubs/<event hub name>",
    "Time": "1/1/2021 8:40:06 PM +00:00",
    "Status": "Success | Failure",
    "Protocol": "AMQP | KAFKA | HTTP | Web Sockets", 
    "AuthType": "SAS | Azure Active Directory", 
    "AuthId": "<AAD application name | SAS policy name>",
    "NetworkType": "Public | Private", 
    "ClientIp": "x.x.x.x",
    "Count": 1,
    "Category": "RuntimeAuditLogs"
 }

```

Resource specific table entry:

```json 
{
    "ActivityId": "<activity id>",
    "ActivityName": "ConnectionOpen | Authorization | SendMessage | ReceiveMessage",
    "ResourceId": "/SUBSCRIPTIONS/xxx/RESOURCEGROUPS/<Resource Group Name>/PROVIDERS/MICROSOFT.EVENTHUB/NAMESPACES/<Event Hubs namespace>/eventhubs/<event hub name>",
    "TimeGenerated (UTC)": "1/1/2021 8:40:06 PM +00:00",
    "Status": "Success | Failure",
    "Protocol": "AMQP | KAFKA | HTTP | Web Sockets", 
    "AuthType": "SAS | Azure Active Directory", 
    "AuthId": "<AAD application name | SAS policy name>",
    "NetworkType": "Public | Private", 
    "ClientIp": "x.x.x.x",
    "Count": 1,
    "Type": "AZMSRuntimeAUditLogs",
    "Provider":"EVENTHUB"
 }

```

### Application metrics logs

Application metrics logs capture the aggregated information on certain metrics related to data plane operations. The captured information includes the following runtime metrics.

> **Note:**
> Application metrics logs are available only in **premium** and **dedicated** tiers.

| Name | Description |
| :--- | :--- |
| `ConsumerLag` | Indicate the lag between consumers and producers.  For more details, see [ConsumerLag](#consumerlag) section. |
| `NamespaceActiveConnections` | Details of active connections established from a client to the event hub. |
| `GetRuntimeInfo` | Obtain run time information from Event Hubs. |
| `GetPartitionRuntimeInfo` | Obtain the approximate runtime information for a logical partition of an event hub. |
| `IncomingMessages` | Details of number of messages published to Event Hubs using AMQP protocol. |
| `IncomingBytes` | Details of Publisher throughput sent to Event Hubs |
| `OutgoingMessages` | Details of number of messages consumed from Event Hubs using AMQP protocol. |
| `OutgoingBytes` | Details of Consumer throughput from Event Hubs. |
| `OffsetCommit` | Number of offset commit calls made to the event hub |
| `OffsetFetch` | Number of offset fetch calls made to the event hub. |

#### ConsumerLag

Consumer lag is reported per partition and per consumer group. 

**Kafka consumers.**
For Kafka, consumer lag is commit lag: the difference between the last sequence number in the partition and the last offset the consumer group committed for that partition. It measures how far behind a group's committed position is, not how far behind its reads are.
•	Lag is evaluated once a minute per partition, whether or not the group fetched any events.
•	Emission is decided per partition, for all groups at once. If at least one consumer group committed an offset on that partition within the last hour, lag is emitted for every group holding a committed offset on that partition. If no group committed within the last hour, no lag is emitted for that partition at all, for any group.
•	Because emission is all-or-nothing per partition, a group that stopped committing continues to be reported as long as another group is active on the same partition. Its committed position is frozen while the partition keeps receiving events, so its reported lag grows steadily. A large, steadily increasing lag for a group that is no longer running as expected.
•	After a group's committed offset ages past the offset retention period, its entry is eventually removed and it stops being reported.

**AMQP consumers**
For AMQP, consumer lag is delivery lag: the difference between the last sequence number in the partition and the sequence number of the last event delivered to the receiver.
•	It's recorded when events are actually delivered. A receiver that is fully caught up and receiving nothing produces no records — an absence of records does not mean lag is zero.
•	It reflects an individual receiver's position at delivery time, not a stored checkpoint, so it is unaffected by whether or where your application checkpoints.
•	Emission stops when the receiver stops receiving events or the link closes.

### Diagnostic Error Logs

Diagnostic error logs capture error messages for any client side, throttling, and Quota exceeded errors. They provide detailed diagnostics for error identification.

Diagnostic Error Logs include elements listed in following table:

| Name | Description | Supported in Azure Diagnostics | Supported in AZMSDiagnosticErrorLogs (Resource specific table) |
| :--- | :--- | :--- | :--- |
| `ActivityId` | A randomly generated UUID that ensures uniqueness for the audit activity. | Yes | Yes |
| `ActivityName` | Operation name | Yes | Yes |
| `NamespaceName` | Name of Namespace | Yes | yes |
| `EntityType` | Type of Entity | Yes | Yes |
| `EntityName` | Name of Entity | Yes | Yes |
| `OperationResult` | Type of error in Operation (`clienterror` or `serverbusy` or `quotaexceeded`) | Yes | Yes |
| `ErrorCount` | Count of identical errors during the aggregation period of 1 minute. | Yes | Yes |
| `ErrorMessage` | Detailed Error Message | Yes | Yes |
| `ResourceProvider` | Name of Service emitting the logs. Possible values: `Microsoft.EventHub` and `Microsoft.ServiceBus` | Yes | Yes |
| `Time Generated (UTC)` | Operation time | No | Yes |
| `EventTimestamp` | Operation Time | Yes | No |
| `Category` | Log category | Yes | No |
| `Type` | Type of Logs emitted | No | Yes |

Here's an example of Diagnostic error log entry:

```json
{
    "ActivityId": "0000000000-0000-0000-0000-00000000000000",
    "SubscriptionId": "<Azure Subscription Id",
    "NamespaceName": "Name of Event Hubs Namespace",
    "EntityType": "EventHub",
    "EntityName": "Name of Event Hub",
    "ActivityName": "SendMessage",
    "ResourceId": "/SUBSCRIPTIONS/xxx/RESOURCEGROUPS/<Resource Group Name>/PROVIDERS/MICROSOFT.EVENTHUB/NAMESPACES/<Event hub namespace name>",,
    "OperationResult": "ServerBusy",
    "ErrorCount": 1,
    "EventTimestamp": "3/27/2024 1:02:29.126 PM +00:00",
    "ErrorMessage": "the request was terminated because the entity is being throttled by the application group with application group name <application group name> and policy name <throttling policy name>.error code: 50013.",
    "category": "DiagnosticErrorLogs"
 }

```

Resource specific table entry:

```json
{
    "ActivityId": "0000000000-0000-0000-0000-00000000000000",
    "NamespaceName": "Name of Event Hubs Namespace",
    "EntityType": "Event Hub",
    "EntityName": "Name of Event Hub",
    "ActivityName": "SendMessage",
    "ResourceId": "/SUBSCRIPTIONS/xxx/RESOURCEGROUPS/<Resource Group Name>/PROVIDERS/MICROSOFT.EVENTHUB/NAMESPACES/<Event hub namespace name>",,
    "OperationResult": "ServerBusy",
    "ErrorCount": 1,
    "TimeGenerated [UTC]": "1/27/2024 4:02:29.126 PM +00:00",
    "ErrorMessage": "The request was terminated because the entity is being throttled by the application group with application group name <application group name> and policy name <throttling policy name>.error code: 50013.",
    "Type": "AZMSDiagnosticErrorLogs"
 }

```

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-activity-log.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-hubs/monitor-event-hubs-reference.md)

- [Microsoft.EventHub resource provider operations](https://learn.microsoft.com/azure/role-based-access-control/permissions/integration#microsofteventhub)

## Related content

- See [Monitor Azure Event Hubs](monitor-event-hubs.md) for a description of monitoring Event Hubs.
- See [Monitor Azure resources with Azure Monitor](https://learn.microsoft.com/azure/azure-monitor/essentials/monitor-azure-resource) for details on monitoring Azure resources.
