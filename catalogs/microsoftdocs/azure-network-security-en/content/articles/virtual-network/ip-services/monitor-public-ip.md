---
title: Monitor Public IP addresses
description: Start here to learn how to monitor Azure Public IP addresses by using Azure Monitor.
ms.date: 07/21/2024
ms.topic: concept-article
author: mbender-ms
ms.author: mbender
ms.service: azure-virtual-network
ms.subservice: ip-services
ms.custom:
  - horz-monitor
  - devx-track-azurecli
  - devx-track-azurepowershell
  - sfi-image-nochange
# Customer intent: As an IT administrator, I want to monitor public IP addresses using Azure Monitor, so that I can gain insights on traffic data and DDoS attacks to ensure the security and performance of our network.
---

# Monitor Public IP addresses

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-intro.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/ip-services/monitor-public-ip.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-insights.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/ip-services/monitor-public-ip.md)

Public IP Address insights provide:

- Traffic data
- DDoS information

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-resource-types.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/ip-services/monitor-public-ip.md)

For more information about the resource types for Public IP addresses, see [Public IP addresses monitoring data reference](monitor-public-ip-reference.md).

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-data-storage.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/ip-services/monitor-public-ip.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-platform-metrics.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/ip-services/monitor-public-ip.md)

For a list of available metrics for Public IP addresses, see [Public IP addresses monitoring data reference](monitor-public-ip-reference.md#metrics).

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-resource-logs.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/ip-services/monitor-public-ip.md)

For the available resource log categories, their associated Log Analytics tables, and the log schemas for Public IP addresses, see [Public IP addresses monitoring data reference](monitor-public-ip-reference.md#resource-logs).

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-activity-log.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/ip-services/monitor-public-ip.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-analyze-data.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/ip-services/monitor-public-ip.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-external-tools.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/ip-services/monitor-public-ip.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-kusto-queries.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/ip-services/monitor-public-ip.md)

The following image is an example of the built-in queries for Public IP addresses that are found within the Long Analytics queries interface in the Azure portal.

Screenshot of the built-in queries for Public IP addresses.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-alerts.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/ip-services/monitor-public-ip.md)

### Public IP addresses alert rules

The following table lists some suggested alert rules for Public IP addresses. These alerts are just examples. You can set alerts for any metric, log entry, or activity log entry listed in the [Public IP addresses monitoring data reference](monitor-public-ip-reference.md).

| Alert type | Condition | Description |
| :--- | :--- | :--- |
| Under DDoS attack or not | **GreaterThan** 0.</br> **1** is currently under attack.</br> **0** indicates normal activity | As part of Azure's edge protection, public IP addresses are monitored for DDoS attacks. An alert allows you to be notified if your public IP address is affected. |

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-advisor-recommendations.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/ip-services/monitor-public-ip.md)

## Related content

- See [Public IP addresses monitoring data reference](monitor-public-ip-reference.md) for a reference of the metrics, logs, and other important values created for Public IP addresses.
- See [Monitoring Azure resources with Azure Monitor](https://learn.microsoft.com/azure/azure-monitor/essentials/monitor-azure-resource) for general details on monitoring Azure resources.
