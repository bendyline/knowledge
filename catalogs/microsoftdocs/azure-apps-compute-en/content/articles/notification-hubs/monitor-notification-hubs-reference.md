---
title: Monitoring data reference for Azure Notification Hubs
description: This article contains important reference material you need when you monitor Azure Notification Hubs.
ms.date: 03/21/2024
ms.custom: horz-monitor
ms.topic: reference
author: sethmanheim
ms.author: sethm
ms.service: azure-notification-hubs
---

# Azure Notification Hubs monitoring data reference

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-intro.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/notification-hubs/monitor-notification-hubs-reference.md)

See [Monitor Notification Hubs](monitor-notification-hubs.md) for details on the data you can collect for Azure Notification Hubs and how to use it.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-metrics-intro.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/notification-hubs/monitor-notification-hubs-reference.md)

### Supported metrics for Microsoft.NotificationHubs/namespaces/notificationHubs
The following table lists the metrics available for the Microsoft.NotificationHubs/namespaces/notificationHubs resource type.
[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-metrics-tableheader.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/notification-hubs/monitor-notification-hubs-reference.md)
[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/reference/metrics/microsoft-notificationhubs-namespaces-notificationhubs-metrics-include.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/notification-hubs/monitor-notification-hubs-reference.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-metrics-dimensions-intro.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/notification-hubs/monitor-notification-hubs-reference.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-no-metrics-dimensions.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/notification-hubs/monitor-notification-hubs-reference.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-resource-logs.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/notification-hubs/monitor-notification-hubs-reference.md)

### Supported resource logs for Microsoft.NotificationHubs/namespaces
[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/reference/logs/microsoft-notificationhubs-namespaces-logs-include.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/notification-hubs/monitor-notification-hubs-reference.md)

### Supported resource logs for Microsoft.NotificationHubs/namespaces/notificationHubs
[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/reference/logs/microsoft-notificationhubs-namespaces-notificationhubs-logs-include.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/notification-hubs/monitor-notification-hubs-reference.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-logs-tables.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/notification-hubs/monitor-notification-hubs-reference.md)
<!-- No table(s) at https://learn.microsoft.com/azure/azure-monitor/reference/tables/tables-resourcetype. -->

Azure Notification Hubs supports operational logs, which capture management operations that are performed on the Notification Hubs namespace. All logs are stored in JavaScript Object Notation (JSON) format in the following two locations:

- **AzureActivity**: Displays logs from operations and actions that are conducted against the namespace in the Azure portal or through Azure Resource Manager template deployments.
- **AzureDiagnostics**: Displays logs from operations and actions that are conducted against the namespace by using the API, or through management clients on the language SDK.

Diagnostic log JSON strings include the elements listed in the following table:

| Name | Description |
| --- | --- |
| time | UTC timestamp of the log |
| resourceId | Relative path to the Azure resource |
| operationName | Name of the management operation |
| category | Log category. Valid values: `OperationalLogs` |
| callerIdentity | Identity of the caller who initiated the management operation |
| resultType | Status of the management operation. Valid values: `Succeeded` or `Failed` |
| resultDescription | Description of the management operation |
| correlationId | Correlation ID of the management operation (if specified) |
| callerIpAddress | The caller IP address. Empty for calls that originated from the Azure portal |

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-activity-log.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/notification-hubs/monitor-notification-hubs-reference.md)

Operational logs capture all management operations that are performed on the Azure Notification Hubs namespace. Data operations aren't captured, because of the high volume of data operations that are conducted on notification hubs.

[Microsoft.NotificationHubs resource provider operations](https://learn.microsoft.com/azure/role-based-access-control/permissions/integration#microsoftnotificationhubs) lists all the management operations that are captured in operational logs.

## Related content

- See [Monitor Notification Hubs](monitor-notification-hubs.md) for a description of monitoring Notification Hubs.
- See [Monitor Azure resources with Azure Monitor](https://learn.microsoft.com/azure/azure-monitor/essentials/monitor-azure-resource) for details on monitoring Azure resources.
