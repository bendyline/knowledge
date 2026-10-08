---
title: Monitor Azure Private Link
description: Learn how to monitor Azure Private Link using Azure Monitor, including data collection, analysis, and alerting.
ms.date: 03/30/2026
ms.custom: horz-monitor
ms.topic: concept-article
author: asudbring
ms.author: allensu
ms.service: azure-private-link
# Customer intent: As a cloud administrator, I want to monitor Azure Private Link using Azure Monitor, so that I can effectively collect, analyze, and set alerts on service performance metrics and logs to ensure optimal service availability and troubleshooting.
---

# Monitor Azure Private Link

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/azmon-horz-intro.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/private-link/monitor-private-link.md)

## Collect data with Azure Monitor

This table describes how you can collect data to monitor your service, and what you can do with the data once collected:

| Data to collect | Description | How to collect and route the data | Where to view the data | Supported data |
| --- | --- | --- | --- | --- |
| Metric data | Metrics are numerical values that describe an aspect of a system at a particular point in time. Metrics can be aggregated using algorithms, compared to other metrics, and analyzed for trends over time. | - Collected automatically at regular intervals.</br> - You can route some platform metrics to a Log Analytics workspace to query with other data. Check the **DS export** setting for each metric to see if you can use a diagnostic setting to route the metric data. | [Metrics explorer](https://learn.microsoft.com/azure/azure-monitor/essentials/metrics-getting-started) | [Private Link metrics supported by Azure Monitor](monitor-private-link-reference.md#metrics) |
| Resource log data | Logs are recorded system events with a timestamp. Logs can contain different types of data, and be structured or free-form text. You can route resource log data to Log Analytics workspaces for querying and analysis. | [Create a diagnostic setting](https://learn.microsoft.com/azure/azure-monitor/essentials/create-diagnostic-settings) to collect and route resource log data. | [Log Analytics](https://learn.microsoft.com/azure/azure-monitor/learn/quick-create-workspace) |  |
| Activity log data | The Azure Monitor activity log provides insight into subscription-level events. The activity log includes information like when a resource is modified or a virtual machine is started. | - Collected automatically.</br> - [Create a diagnostic setting](https://learn.microsoft.com/azure/azure-monitor/essentials/create-diagnostic-settings) to a Log Analytics workspace at no charge. | [Activity log](https://learn.microsoft.com/azure/azure-monitor/essentials/activity-log) |  |

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/azmon-horz-supported-data.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/private-link/monitor-private-link.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/azmon-horz-tools.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/private-link/monitor-private-link.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/azmon-horz-export-data.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/private-link/monitor-private-link.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/azmon-horz-kusto.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/private-link/monitor-private-link.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/azmon-horz-alerts-part-one.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/private-link/monitor-private-link.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/azmon-horz-alerts-part-two.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/private-link/monitor-private-link.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/azmon-horz-advisor.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/private-link/monitor-private-link.md)

## Related content

- [Azure Private Link monitoring data reference](monitor-private-link-reference.md) 
- [Monitoring Azure resources with Azure Monitor](https://learn.microsoft.com/azure/azure-monitor/essentials/monitor-azure-resource)
