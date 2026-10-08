---
title: Monitoring data reference for Azure Resource Manager
description: This article contains important reference material you need when you monitor Azure Resource Manager.
ms.date: 10/29/2025
ms.custom: horz-monitor, devx-track-arm-template
ms.topic: reference
---

# Azure Resource Manager monitoring data reference

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-intro.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/monitor-resource-manager-reference.md)

See [Monitor Azure Resource Manager](monitor-resource-manager.md) for details on the data you can collect for Azure Resource Manager and how to use it.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-metrics-intro.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/monitor-resource-manager-reference.md)

### Supported metrics for microsoft.resources/subscriptions

The following table lists the metrics available for the microsoft.resources/subscriptions resource type.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-metrics-tableheader.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/monitor-resource-manager-reference.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/reference/metrics/microsoft-resources-subscriptions-metrics-include.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/monitor-resource-manager-reference.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-metrics-dimensions-intro.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/monitor-resource-manager-reference.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-metrics-dimensions.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/monitor-resource-manager-reference.md)

| Dimension name | Description |
| :--- | :--- |
| IsCustomerOriginated |  |
| Microsoft.SubscriptionId |  |
| Method | The HTTP method used in the request made to Azure Resource Manager. Possible values are: <br/>- GET<br/>- HEAD<br/>- PUT<br/>- POST<br/>- PATCH<br/>- DELETE |
| Namespace | The namespace for the Resource Provider, in all caps, like *MICROSOFT.COMPUTE*. |
| RequestRegion | The Azure Resource Manager region where your control plane requests land, like *EastUS2*. This region isn't the resource's location. |
| ResourceType | Any resource type in Azure that you created or sent a request to, in all caps, like *VIRTUALMACHINES*. |
| StatusCode | Response type from Azure Resource Manager for your control plane request. Possible values are (but not limited to): <br/>- 0<br/>- 200<br/>- 201<br/>- 400<br/>- 404<br/>- 429<br/>- 500<br/>- 502 |
| StatusCodeClass | The class for the status code returned from Azure Resource Manager. Possible values are: <br/>- 2xx<br/>- 4xx<br/>- 5xx |

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-activity-log.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/monitor-resource-manager-reference.md)

- [Microsoft.Resources resource provider operations](https://learn.microsoft.com/azure/role-based-access-control/resource-provider-operations#management-and-governance)

## Related content

- See [Monitor Azure Resource Manager](monitor-resource-manager.md) for a description of monitoring Resource Manager.
- See [Monitor Azure resources with Azure Monitor](https://learn.microsoft.com/azure/azure-monitor/essentials/monitor-azure-resource) for details on monitoring Azure resources.
