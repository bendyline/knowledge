---
title: Monitoring data reference for Azure Virtual Network
description: This article contains important reference material you need when you monitor Azure Virtual Network by using Azure Monitor.
ms.date: 07/21/2024
ms.custom: horz-monitor
ms.topic: reference
author: asudbring
ms.author: allensu
ms.service: azure-virtual-network
# Customer intent: As a network administrator, I want to access detailed monitoring metrics and logs for Azure Virtual Network, so that I can effectively analyze performance and troubleshoot issues in my network infrastructure.
---

# Azure Virtual Network monitoring data reference

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-intro.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/monitor-virtual-network-reference.md)

See [Monitor Azure Virtual Network](monitor-virtual-network.md) for details on the data you can collect for Virtual Network and how to use it.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-metrics-intro.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/monitor-virtual-network-reference.md)

### Supported metrics for Microsoft.Network/virtualNetworks

The following table lists the metrics available for the Microsoft.Network/virtualNetworks resource type.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-metrics-tableheader.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/monitor-virtual-network-reference.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/reference/metrics/microsoft-network-virtualnetworks-metrics-include.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/monitor-virtual-network-reference.md)

### Supported metrics for Microsoft.Network/networkInterfaces

The following table lists the metrics available for the Microsoft.Network/networkInterfaces resource type.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-metrics-tableheader.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/monitor-virtual-network-reference.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/reference/metrics/microsoft-network-networkinterfaces-metrics-include.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/monitor-virtual-network-reference.md)

### Supported metrics for Microsoft.Network/publicIPAddresses

The following table lists the metrics available for the Microsoft.Network/publicIPAddresses resource type.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-metrics-tableheader.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/monitor-virtual-network-reference.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/reference/metrics/microsoft-network-publicipaddresses-metrics-include.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/monitor-virtual-network-reference.md)

### Supported metrics for Microsoft.Network/natGateways

The following table lists the metrics available for the Microsoft.Network/natGateways resource type.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-metrics-tableheader.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/monitor-virtual-network-reference.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/reference/metrics/microsoft-network-natgateways-metrics-include.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/monitor-virtual-network-reference.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-metrics-dimensions-intro.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/monitor-virtual-network-reference.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-metrics-dimensions.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/monitor-virtual-network-reference.md)

Dimensions for Microsoft.Network/virtualNetworks:

| Dimension name | Description |
| :--- | :--- |
| DestinationCustomerAddress |  |
| ProtectedIPAddress |  |
| SourceCustomerAddress |  |

Dimensions for Microsoft.Network/networkInterfaces:

None.

Dimensions for Microsoft.Network/publicIPAddresses:

| Dimension name | Description |
| :--- | :--- |
| Direction |  |
| Port |  |

Dimensions for Microsoft.Network/natGateways:

| Dimension name | Description |
| :--- | :--- |
| Direction | The direction of traffic flow. The supported values are `In` and `Out`. |
| Protocol | The type of transport protocol. The supported values are `TCP` and `UDP`. |
| ConnectionState |  |

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-resource-logs.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/monitor-virtual-network-reference.md)

### Supported resource logs for Microsoft.Network/networksecuritygroups

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/reference/logs/microsoft-network-networksecuritygroups-logs-include.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/monitor-virtual-network-reference.md)

### Supported resource logs for Microsoft.Network/publicIPAddresses

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/reference/logs/microsoft-network-publicipaddresses-logs-include.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/monitor-virtual-network-reference.md)

### Supported resource logs for Microsoft.Network/virtualNetworks

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/reference/logs/microsoft-network-virtualnetworks-logs-include.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/monitor-virtual-network-reference.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-logs-tables.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/monitor-virtual-network-reference.md)

### Virtual Network Microsoft.Network/virtualNetworks

- [AzureActivity](https://learn.microsoft.com/azure/azure-monitor/reference/tables/azureactivity#columns)
- [AzureMetrics](https://learn.microsoft.com/azure/azure-monitor/reference/tables/azuremetrics#columns)
- [AzureDiagnostics](https://learn.microsoft.com/azure/azure-monitor/reference/tables/azurediagnostics#columns)

### Virtual Network Microsoft.Network/networkinterfaces

- [AzureActivity](https://learn.microsoft.com/azure/azure-monitor/reference/tables/azureactivity#columns)
- [AzureMetrics](https://learn.microsoft.com/azure/azure-monitor/reference/tables/azuremetrics#columns)
- [AzureDiagnostics](https://learn.microsoft.com/azure/azure-monitor/reference/tables/azurediagnostics#columns)

### Virtual Network Microsoft.Network/PublicIpAddresses

- [AzureActivity](https://learn.microsoft.com/azure/azure-monitor/reference/tables/azureactivity#columns)
- [AzureMetrics](https://learn.microsoft.com/azure/azure-monitor/reference/tables/azuremetrics#columns)
- [AzureDiagnostics](https://learn.microsoft.com/azure/azure-monitor/reference/tables/azurediagnostics#columns)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-activity-log.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/monitor-virtual-network-reference.md)

- [Microsoft.Network resource provider operations](https://learn.microsoft.com/azure/role-based-access-control/resource-provider-operations#microsoftnetwork)

The following table lists the operations related to Azure virtual network that might be created in the Activity log.

| Operation | Description |
| :--- | :--- |
| All administrative operations | All administrative operations including create, update, and delete of an Azure virtual network. |
| Create or update virtual network | A virtual network was created or updated. |
| Deletes virtual network | A virtual network was deleted. |

## Related content

- See [Monitor Azure Virtual Network](monitor-virtual-network.md) for a description of monitoring Virtual Network.
- See [Monitor Azure resources with Azure Monitor](https://learn.microsoft.com/azure/azure-monitor/essentials/monitor-azure-resource) for details on monitoring Azure resources.
