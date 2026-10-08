---
title: Monitor Azure Virtual Network
description: Start here to learn how to monitor Azure virtual networks by using Azure Monitor.
ms.date: 07/21/2024
ms.custom: horz-monitor
ms.topic: concept-article
author: asudbring
ms.author: allensu
ms.service: azure-virtual-network
# Customer intent: As a network administrator, I want to monitor Azure Virtual Networks using Azure Monitor, so that I can analyze performance metrics and set alerts for configurations and activities to ensure optimal network performance and security.
---

# Monitor Azure Virtual Network

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-intro.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/monitor-virtual-network.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-resource-types.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/monitor-virtual-network.md)

For more information about the resource types for Virtual Network, see [Azure Virtual Network monitoring data reference](monitor-virtual-network-reference.md).

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-data-storage.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/monitor-virtual-network.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-platform-metrics.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/monitor-virtual-network.md)

For a list of available metrics for Virtual Network, see [Azure Virtual Network monitoring data reference](monitor-virtual-network-reference.md#metrics).

> **Important:**
> Enabling these settings requires additional Azure services (storage account, event hub, or Log Analytics), which might increase your cost. To calculate an estimated cost, visit the [Azure pricing calculator](https://azure.microsoft.com/pricing/calculator).

### Analyzing metrics

Azure Monitor currently doesn't support analyzing *Azure virtual network* metrics from the metrics explorer. To view *Azure virtual network* metrics, select **Metrics** under **Monitoring** from the virtual network you want to analyze.

Screenshot of the metrics dashboard for Virtual Network.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-non-monitor-metrics.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/monitor-virtual-network.md)

For more information, see [Monitor and visualize network configurations with Azure Network Policy Manager](kubernetes-network-policies.md#monitor-and-visualize-network-configurations-with-azure-npm).

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-resource-logs.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/monitor-virtual-network.md)

For the available resource log categories, their associated Log Analytics tables, and the log schemas for Virtual Network, see [Azure Virtual Network monitoring data reference](monitor-virtual-network-reference.md#resource-logs).

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-activity-log.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/monitor-virtual-network.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-analyze-data.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/monitor-virtual-network.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-external-tools.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/monitor-virtual-network.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-kusto-queries.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/monitor-virtual-network.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-alerts.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/monitor-virtual-network.md)

### Virtual Network alert rules

The following table lists some suggested alert rules for Virtual Network. These alerts are just examples. You can set alerts for any metric, log entry, or activity log entry listed in the [Azure Virtual Network monitoring data reference](monitor-virtual-network-reference.md).

The following table lists common and recommended activity alert rules for Azure virtual network.

| Alert type | Condition | Description |
| :--- | :--- | :--- |
| Create or Update Virtual Network | Event Level: All selected, Status: All selected, Event initiated by: All services and users | When a user creates or makes configuration changes to the virtual network |
| Delete Virtual Network | Event Level: All selected, Status: Started | When a user deletes a virtual network |

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-advisor-recommendations.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/monitor-virtual-network.md)

## Related content

- See [Azure Virtual Network monitoring data reference](monitor-virtual-network-reference.md) for a reference of the metrics, logs, and other important values created for Virtual Network.
- See [Monitoring Azure resources with Azure Monitor](https://learn.microsoft.com/azure/azure-monitor/essentials/monitor-azure-resource) for general details on monitoring Azure resources.
