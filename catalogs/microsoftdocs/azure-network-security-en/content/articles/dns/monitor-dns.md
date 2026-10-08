---
title: Monitor Azure DNS
description: Learn how to monitor Azure DNS using Azure Monitor, including data collection, analysis, and alerting.
ms.date: 01/06/2025
ms.custom: horz-monitor
ms.topic: concept-article
author: asudbring
ms.author: allensu
ms.service: azure-dns
# Customer intent: "As a cloud administrator, I want to monitor Azure DNS using Azure Monitor, so that I can collect data and set up alerts to ensure optimal performance and availability of my DNS services."
---

# Monitor Azure DNS

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/azmon-horz-intro.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/dns/monitor-dns.md)

## Collect data with Azure Monitor

This table describes how you can collect data to monitor your service, and what you can do with the data once collected:

| Data to collect | Description | How to collect and route the data | Where to view the data | Supported data |
| --- | --- | --- | --- | --- |
| Metric data | Metrics are numerical values that describe an aspect of a system at a particular point in time. Metrics can be aggregated using algorithms, compared to other metrics, and analyzed for trends over time. | - Collected automatically at regular intervals.</br> - You can route some platform metrics to a Log Analytics workspace to query with other data. Check the **DS export** setting for each metric to see if you can use a diagnostic setting to route the metric data. | [Metrics explorer](https://learn.microsoft.com/azure/azure-monitor/essentials/metrics-getting-started) | [Azure DNS metrics supported by Azure Monitor](monitor-dns-reference.md#metrics) |
| Resource log data | Logs are recorded system events with a timestamp. Logs can contain different types of data, and be structured or free-form text. You can route resource log data to Log Analytics workspaces for querying and analysis. | [Create a diagnostic setting](https://learn.microsoft.com/azure/azure-monitor/essentials/create-diagnostic-settings) to collect and route resource log data. | [Log Analytics](https://learn.microsoft.com/azure/azure-monitor/learn/quick-create-workspace) | [Azure DNS resource log data supported by Azure Monitor](monitor-dns-reference.md#resource-logs) |
| Activity log data | The Azure Monitor activity log provides insight into subscription-level events. The activity log includes information like when a resource is modified or a virtual machine is started. | - Collected automatically.</br> - [Create a diagnostic setting](https://learn.microsoft.com/azure/azure-monitor/essentials/create-diagnostic-settings) to a Log Analytics workspace at no charge. | [Activity log](https://learn.microsoft.com/azure/azure-monitor/essentials/activity-log) |  |

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/azmon-horz-supported-data.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/dns/monitor-dns.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/azmon-horz-tools.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/dns/monitor-dns.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/azmon-horz-export-data.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/dns/monitor-dns.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/azmon-horz-kusto.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/dns/monitor-dns.md)

For Kusto queries in Azure Resource Graph Explorer, see [Private DNS information in Azure Resource Graph](private-dns-arg.md).

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/azmon-horz-alerts-part-one.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/dns/monitor-dns.md)

To configure alerting for Azure DNS zones:

1. Select **Alerts** from *Monitor* page in the Azure portal. Then select **+ New alert rule**.

   Screenshot of Alert button on Monitor page.

1. Select the **Select resource** link in the Scope section to open the *Select a resource* page. Filter by **DNS zones** and then select the Azure DNS zone you want as the target resource. Select **Done** after you choose the zone.

   Screenshot of select resource page in configuring alerts.

1. Next, select the **Add condition** link in the Conditions section to open the *Select a signal* page. Select one of the three *Metric* signal types you want to configure the alert for.

   Screenshot of available metrics on the select a signal page.

1. On the *Configure signal logic* page, configure the threshold and frequency of evaluation for the metric selected.

   Screenshot of configure signal logic page.

1. To send a notification or invoke an action triggered by the alert, select the **Add action groups**. On the *Add action groups* page, select **+ Create action group**. For more information, see [Action Group](https://learn.microsoft.com/azure/azure-monitor/alerts/action-groups).

1. Enter an *Alert rule name* then select **Create alert rule** to save your configuration.

   Screenshot of create alert rule page with the Alert rule name highlighted.

For more information on how to configure alerting for Azure Monitor metrics, see [Create, view, and manage alerts using Azure Monitor](https://learn.microsoft.com/azure/azure-monitor/alerts/alerts-metric).

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/azmon-horz-alerts-part-two.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/dns/monitor-dns.md)

## Related content

- [Azure DNS monitoring data reference](monitor-dns-reference.md)
- [Monitoring Azure resources with Azure Monitor](https://learn.microsoft.com/azure/azure-monitor/essentials/monitor-azure-resource)
