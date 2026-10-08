---
title: Monitoring data reference for Azure NAT Gateway
description: This article contains important reference material you need when you monitor Azure NAT Gateway by using Azure Monitor.
ms.date: 08/10/2026
ms.custom: horz-monitor
ms.topic: reference
author: asudbring
ms.author: allensu
ms.service: azure-nat-gateway
# Customer intent: "As a cloud administrator, I want to access and understand the monitoring metrics for Azure NAT Gateway, so that I can effectively track network performance and troubleshoot connectivity issues."
---
# Azure NAT Gateway monitoring data reference

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-intro.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/nat-gateway/monitor-nat-gateway-reference.md)

See [Monitor Azure NAT Gateway](monitor-nat-gateway.md) for details on the data you can collect for Azure NAT Gateway and how to use it.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-metrics-intro.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/nat-gateway/monitor-nat-gateway-reference.md)

NAT gateway metrics can be found in the following locations in the Azure portal.

- **Metrics** page under **Monitoring** from a NAT gateway's resource page.

- **Insights** page under **Monitoring** from a NAT gateway's resource page.

  Screenshot of the insights and metrics options in NAT gateway overview.

- Azure Monitor page under **Metrics**.

  Screenshot of the metrics section of Azure Monitor.

### Supported metrics for Microsoft.Network/natgateways

The following table lists the metrics available for the Microsoft.Network/natgateways resource type.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-metrics-tableheader.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/nat-gateway/monitor-nat-gateway-reference.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/reference/metrics/microsoft-network-natgateways-metrics-include.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/nat-gateway/monitor-nat-gateway-reference.md)

> **Note:**
> Count aggregation is not recommended for any of the NAT gateway metrics. Count aggregation adds up the number of metric values and not the metric values themselves. Use Sum aggregation instead to get the best representation of data values for connection count, bytes, and packets metrics.
>
> Use Average for best represented health data for the datapath availability metric.
>
> For information about aggregation types, see [aggregation types](https://learn.microsoft.com/azure/azure-monitor/essentials/metrics-aggregation-explained#aggregation-types).

For more information, see [How to use NAT gateway metrics](nat-metrics.md#how-to-use-nat-gateway-metrics).

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-metrics-dimensions-intro.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/nat-gateway/monitor-nat-gateway-reference.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-metrics-dimensions.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/nat-gateway/monitor-nat-gateway-reference.md)

- ConnectionState: Attempted, Failed
- Direction: In, Out
- Protocol: 6 TCP, 17 UDP

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-activity-log.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/nat-gateway/monitor-nat-gateway-reference.md)

- [Microsoft.Network resource provider operations](https://learn.microsoft.com/azure/role-based-access-control/resource-provider-operations#microsoftnetwork)

## Related content

- See [Monitor Azure NAT Gateway](monitor-nat-gateway.md) for a description of monitoring Azure NAT Gateway.
- See [Monitor Azure resources with Azure Monitor](https://learn.microsoft.com/azure/azure-monitor/essentials/monitor-azure-resource) for details on monitoring Azure resources.
