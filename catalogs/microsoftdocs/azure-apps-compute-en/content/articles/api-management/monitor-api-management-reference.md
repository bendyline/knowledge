---
title: Monitoring Data Reference for Azure API Management
description: This article contains important reference material you need when you monitor Azure API Management by using Azure Monitor.
ms.date: 09/05/2025
ms.custom:
  - horz-monitor
  - build-2025
ms.topic: reference
ms.service: azure-api-management
---

# API Management monitoring data reference

**APPLIES TO: All API Management tiers**



[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-intro.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-management/monitor-api-management-reference.md)

See [Monitor API Management](monitor-api-management.md) for details on the data you can collect for Azure API Management and how to use it.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-metrics-intro.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-management/monitor-api-management-reference.md)

### Supported metrics for Microsoft.ApiManagement/service

The following tables list the metrics available for the Microsoft.ApiManagement/service resource type.

> **Note:**
> Event Hubs event metrics are currently unavailable for API Management v2 tiers.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-metrics-tableheader.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-management/monitor-api-management-reference.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/reference/metrics/microsoft-apimanagement-service-metrics-include.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-management/monitor-api-management-reference.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-metrics-dimensions-intro.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-management/monitor-api-management-reference.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-metrics-dimensions.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-management/monitor-api-management-reference.md)

- ApiId
- BackendResponseCode
- BackendResponseCodeCategory
- Destination
- GatewayResponseCode
- GatewayResponseCodeCategory
- Hostname
- LastErrorReason
- Location
- ResourceType
- Source
- State

### Supported metrics for Microsoft.ApiManagement/gateways

The following table lists the metrics available for the Microsoft.ApiManagement/gateways resource type.  
  
[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/reference/metrics/metrics-headings.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-management/monitor-api-management-reference.md)  
  
[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/reference/metrics/microsoft-apimanagement-gateways-metrics-include.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-management/monitor-api-management-reference.md)  


[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-resource-logs.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-management/monitor-api-management-reference.md)

### Supported resource logs for Microsoft.ApiManagement/service

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/reference/logs/microsoft-apimanagement-service-logs-include.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-management/monitor-api-management-reference.md)

### Supported resource logs for Microsoft.ApiManagement/service/workspaces

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/reference/logs/microsoft-apimanagement-service-workspaces-logs-include.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-management/monitor-api-management-reference.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-logs-tables.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-management/monitor-api-management-reference.md)

### API Management Microsoft.ApiManagement/service

- [APIMDevPortalAuditDiagnosticLog](https://learn.microsoft.com/azure/azure-monitor/reference/tables/apimdevportalauditdiagnosticlog#columns)
- [AzureActivity](https://learn.microsoft.com/azure/azure-monitor/reference/tables/azureactivity#columns)
- [AzureMetrics](https://learn.microsoft.com/azure/azure-monitor/reference/tables/azuremetrics#columns)
- [AzureDiagnostics](https://learn.microsoft.com/azure/azure-monitor/reference/tables/azurediagnostics#columns)
- [ApiManagementGatewayLogs](https://learn.microsoft.com/azure/azure-monitor/reference/tables/apimanagementgatewaylogs#columns)
- [ApiManagementWebSocketConnectionLogs](https://learn.microsoft.com/azure/azure-monitor/reference/tables/apimanagementwebsocketconnectionlogs#columns)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-activity-log.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-management/monitor-api-management-reference.md)

- [Microsoft.ApiManagement resource provider operations](https://learn.microsoft.com/azure/role-based-access-control/resource-provider-operations#microsoftapimanagement)

## Related content

- See [Monitor API Management](monitor-api-management.md) for a description of monitoring Azure API Management.
- See [Monitor Azure resources with Azure Monitor](https://learn.microsoft.com/azure/azure-monitor/essentials/monitor-azure-resource) for details on monitoring Azure resources.
