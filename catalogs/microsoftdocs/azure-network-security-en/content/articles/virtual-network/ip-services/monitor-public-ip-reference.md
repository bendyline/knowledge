---
title: Monitoring data reference for Public IP addresses
description: This article contains important reference material you need when you monitor Azure Public IP addresses.
ms.date: 07/21/2024
ms.custom: horz-monitor
ms.topic: reference
author: mbender-ms
ms.author: mbender
ms.service: azure-virtual-network
ms.subservice: ip-services
# Customer intent: "As a network administrator, I want to access monitoring metrics and logs for Public IP addresses, so that I can effectively track and manage network traffic and troubleshoot connectivity issues."
---

# Public IP addresses monitoring data reference

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-intro.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/ip-services/monitor-public-ip-reference.md)

See [Monitor Public IP addresses](monitor-public-ip.md) for details on the data you can collect for Public IP addresses and how to use it.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-metrics-intro.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/ip-services/monitor-public-ip-reference.md)

### Supported metrics for Microsoft.Network/publicIPAddresses

The following table lists the metrics available for the Microsoft.Network/publicIPAddresses resource type.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-metrics-tableheader.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/ip-services/monitor-public-ip-reference.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/reference/metrics/microsoft-network-publicipaddresses-metrics-include.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/ip-services/monitor-public-ip-reference.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-metrics-dimensions-intro.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/ip-services/monitor-public-ip-reference.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-metrics-dimensions.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/ip-services/monitor-public-ip-reference.md)

| Dimension name | Description |
| :--- | :--- |
| Port | The port of the traffic. |
| Direction | The direction of the traffic: inbound or outbound. |

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-resource-logs.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/ip-services/monitor-public-ip-reference.md)

### Supported resource logs for Microsoft.Network/publicIPAddresses

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/reference/logs/microsoft-network-publicipaddresses-logs-include.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/ip-services/monitor-public-ip-reference.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-logs-tables.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/ip-services/monitor-public-ip-reference.md)

### Public IP addresses Microsoft.Network/publicIPAddresses

- [AzureActivity](https://learn.microsoft.com/azure/azure-monitor/reference/tables/azureactivity#columns)
- [AzureMetrics](https://learn.microsoft.com/azure/azure-monitor/reference/tables/azuremetrics#columns)
- [AzureDiagnostics](https://learn.microsoft.com/azure/azure-monitor/reference/tables/azurediagnostics#columns)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-activity-log.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/ip-services/monitor-public-ip-reference.md)

- [Networking resource provider operations](https://learn.microsoft.com/azure/role-based-access-control/resource-provider-operations#networking)

The following table lists the operations that Public IP addresses can record in the Activity log. This list is a subset of the possible entries you might find in the activity log.

| Namespace | Description |
| :--- | :--- |
| Microsoft.Network/publicIPAddresses/read | Gets a public ip address definition. |
| Microsoft.Network/publicIPAddresses/write | Creates a public IP address or updates an existing public IP address. |
| Microsoft.Network/publicIPAddresses/delete | Deletes a public IP address. |
| Microsoft.Network/publicIPAddresses/join/action | Joins a public IP address. Not Alertable. |
| Microsoft.Network/publicIPAddresses/dnsAliases/read | Gets a Public IP Address Dns Alias resource. |
| Microsoft.Network/publicIPAddresses/dnsAliases/write | Creates a Public IP Address Dns Alias resource. |
| Microsoft.Network/publicIPAddresses/dnsAliases/delete | Deletes a Public IP Address Dns Alias resource. |
| Microsoft.Network/publicIPAddresses/providers/Microsoft.Insights/diagnosticSettings/read | Get the diagnostic settings of Public IP Address. |
| Microsoft.Network/publicIPAddresses/providers/Microsoft.Insights/diagnosticSettings/write | Create or update the diagnostic settings of Public IP Address. |
| Microsoft.Network/publicIPAddresses/providers/Microsoft.Insights/logDefinitions/read | Get the log definitions of Public IP Address. |
| Microsoft.Network/publicIPAddresses/providers/Microsoft.Insights/metricDefinitions/read | Get the metrics definitions of Public IP Address. |

## Related content

- See [Monitor Public IP addresses](monitor-public-ip.md) for a description of monitoring Public IP addresses.
- See [Monitor Azure resources with Azure Monitor](https://learn.microsoft.com/azure/azure-monitor/essentials/monitor-azure-resource) for details on monitoring Azure resources.
