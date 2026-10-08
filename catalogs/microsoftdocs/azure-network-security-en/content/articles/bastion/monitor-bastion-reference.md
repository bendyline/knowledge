---
title: Monitoring data reference for Azure Bastion
description: This article contains important reference material you need when you monitor Azure Bastion by using Azure Monitor.
ms.date: 12/02/2024
ms.custom: horz-monitor
ms.topic: reference
author: asudbring
ms.author: allensu
ms.service: azure-bastion
# Customer intent: As a cloud administrator, I want to monitor the performance metrics and logs of Azure Bastion, so that I can ensure its availability and optimize resource utilization for my organization's needs.
---
# Azure Bastion monitoring data reference

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-intro.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/bastion/monitor-bastion-reference.md)

See [Monitor Azure Bastion](monitor-bastion.md) for details on the data you can collect for and how to use it.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-metrics-intro.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/bastion/monitor-bastion-reference.md)

> **Note:**
> We don't recommend that your use *Classic Metrics*.

### Supported metrics for microsoft.network/bastionHosts

The following table lists the metrics available for the microsoft.network/bastionHosts resource type.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-metrics-tableheader.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/bastion/monitor-bastion-reference.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/reference/metrics/microsoft-network-bastionhosts-metrics-include.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/bastion/monitor-bastion-reference.md)

> **Note:**
> The Bastion Communication Status metric only applies to Azure Bastion hosts deployed after November 2020.

### Metrics details

The following sections give details about the metrics in the preceding table.

#### Bastion communication status

You can view the communication status of Azure Bastion, aggregated across all instances comprising the bastion host.

- A value of **1** indicates that the bastion is available.
- A value of **0** indicates that the bastion service is unavailable.

Screenshot that shows the communication status metric in the Azure portal.

Bastion communication status is an Availability metric.

#### Session count

You can view the count of active sessions per bastion instance, aggregated across each session type (RDP and SSH). Each Azure Bastion can support a range of active RDP and SSH sessions. Monitoring this metric helps you to understand if you need to adjust the number of instances running the bastion service. For more information about the session count Azure Bastion can support, see the [Azure Bastion FAQ](bastion-faq.md).

The recommended values for this metric's configuration are:

- **Aggregation:** Avg
- **Granularity:** 5 or 15 minutes
- Splitting by instances is recommended to get a more accurate count

Screenshot that shows the session count metric in the Azure portal.

Session count is a Traffic metric.

#### Total memory

You can view the total memory of Azure Bastion, split across each bastion instance.

Screenshot that shows the total memory metric in the Azure portal.

Total memory is a Saturation metric.

#### CPU usage

You can view the CPU utilization of Azure Bastion, split across each bastion instance. Monitoring this metric helps gauge the availability and capacity of the instances that comprise Azure Bastion.

Screenshot that shows the CPU used metric in the Azure portal.

CPU usage is a Saturation metric.

#### Memory usage

You can view memory utilization across each bastion instance, split across each bastion instance. Monitoring this metric helps gauge the availability and capacity of the instances that comprise Azure Bastion.

Screenshot that shows the memory used metric in the Azure portal.

Memory usage is a Saturation metric.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-metrics-dimensions-intro.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/bastion/monitor-bastion-reference.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-metrics-dimensions.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/bastion/monitor-bastion-reference.md)

- cpu
- host

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-resource-logs.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/bastion/monitor-bastion-reference.md)

### Supported resource logs for microsoft.network/bastionHosts

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/reference/logs/microsoft-network-bastionhosts-logs-include.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/bastion/monitor-bastion-reference.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-logs-tables.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/bastion/monitor-bastion-reference.md)

### Azure Bastion microsoft.network/bastionHosts

- [AzureActivity](https://learn.microsoft.com/azure/azure-monitor/reference/tables/azureactivity#columns)
- [AzureMetrics](https://learn.microsoft.com/azure/azure-monitor/reference/tables/azuremetrics#columns)
- [MicrosoftAzureBastionAuditLogs](https://learn.microsoft.com/azure/azure-monitor/reference/tables/microsoftazurebastionauditlogs#columns)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-activity-log.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/bastion/monitor-bastion-reference.md)

- [Networking resource provider operations](https://learn.microsoft.com/azure/role-based-access-control/resource-provider-operations#microsoftnetwork)

## Related content

- See [Monitor Azure Bastion](monitor-bastion.md) for a description of monitoring Azure Bastion.
- See [Monitor Azure resources with Azure Monitor](https://learn.microsoft.com/azure/azure-monitor/essentials/monitor-azure-resource) for details on monitoring Azure resources.
