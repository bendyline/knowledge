---
title: Monitor Azure DDoS Protection monitoring data reference
description: This article contains important reference material you need when you monitor Azure DDoS Protection by using Azure Monitor.
ms.date: 03/17/2026
ms.custom: horz-monitor
ms.topic: reference
author: duongau
ms.author: duau
ms.service: azure-ddos-protection
# Customer intent: As a network administrator, I want to monitor Azure DDoS Protection metrics and logs, so that I can effectively manage traffic and identify potential threats to ensure the security and performance of my network.
---

# Azure DDoS Protection monitoring data reference

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-intro.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/ddos-protection/monitor-ddos-protection-reference.md)

See [Monitor Azure DDoS Protection](monitor-ddos-protection.md) for details on the data you can collect for Azure DDoS Protection and how to use it.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-metrics-intro.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/ddos-protection/monitor-ddos-protection-reference.md)

### Supported metrics for Microsoft.Network/publicIPAddresses

The following table lists the metrics available for the Microsoft.Network/publicIPAddresses resource type.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-metrics-tableheader.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/ddos-protection/monitor-ddos-protection-reference.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/reference/metrics/microsoft-network-publicipaddresses-metrics-include.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/ddos-protection/monitor-ddos-protection-reference.md)

The metric names present different packet types, and bytes vs. packets, with a basic construct of tag names on each metric as follows:

- **Dropped tag name** (for example, **Inbound Packets Dropped DDoS**): The number of packets dropped/scrubbed by the DDoS protection system.

- **Forwarded tag name** (for example **Inbound Packets Forwarded DDoS**): The number of packets forwarded by the DDoS system to the destination VIP – traffic that wasn't filtered.

- **No tag name** (for example **Inbound Packets DDoS**): The total number of packets that came into the scrubbing system – representing the sum of the packets dropped and forwarded.

> **Note:**
> While multiple options for **Aggregation** are displayed on Azure portal, only the aggregation types listed in the table are supported for each metric. We apologize for this confusion and we are working to resolve it.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-metrics-dimensions-intro.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/ddos-protection/monitor-ddos-protection-reference.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-metrics-dimensions.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/ddos-protection/monitor-ddos-protection-reference.md)

- Direction
- Port

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-resource-logs.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/ddos-protection/monitor-ddos-protection-reference.md)

### Supported resource logs for Microsoft.Network/publicIPAddresses

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/reference/logs/microsoft-network-publicipaddresses-logs-include.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/ddos-protection/monitor-ddos-protection-reference.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-logs-tables.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/ddos-protection/monitor-ddos-protection-reference.md)

### Azure DDoS Protection Microsoft.Network/publicIPAddresses

- [AzureActivity](https://learn.microsoft.com/azure/azure-monitor/reference/tables/azureactivity#columns)
- [AzureMetrics](https://learn.microsoft.com/azure/azure-monitor/reference/tables/azuremetrics#columns)
- [AzureDiagnostics](https://learn.microsoft.com/azure/azure-monitor/reference/tables/azurediagnostics#columns)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-activity-log.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/ddos-protection/monitor-ddos-protection-reference.md)

- [Microsoft.Network resource provider operations](https://learn.microsoft.com/azure/role-based-access-control/resource-provider-operations#microsoftnetwork)

## Related content

- See [Monitor Azure DDoS Protection](monitor-ddos-protection.md) for a description of monitoring Azure DDoS Protection.
- See [Monitor Azure resources with Azure Monitor](https://learn.microsoft.com/azure/azure-monitor/essentials/monitor-azure-resource) for details on monitoring Azure resources.
