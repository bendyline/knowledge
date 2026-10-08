---
title: Monitoring data reference for Azure DNS
description: This article contains important reference material you need when you monitor Azure DNS by using Azure Monitor.
ms.date: 01/06/2025
ms.custom: horz-monitor
ms.topic: reference
author: asudbring
ms.author: allensu
ms.service: azure-dns
# Customer intent: "As a network administrator, I want to monitor Azure DNS metrics, so that I can track query volume, record set counts, and capacity utilization to ensure reliable and efficient DNS performance."
---

# Azure DNS monitoring data reference

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-intro.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/dns/monitor-dns-reference.md)

See [Monitor Azure DNS](monitor-dns.md) for details on the data you can collect for Azure DNS and how to use it.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-metrics-intro.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/dns/monitor-dns-reference.md)

### Supported metrics for Microsoft.Network/dnsForwardingRulesets

The following table lists the metrics available for the Microsoft.Network/dnsForwardingRulesets resource type.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-metrics-tableheader.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/dns/monitor-dns-reference.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/reference/metrics/microsoft-network-dnsforwardingrulesets-metrics-include.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/dns/monitor-dns-reference.md)

### Supported metrics for Microsoft.Network/dnsResolverDomainLists

The following table lists the metrics available for the Microsoft.Network/dnsResolverDomainLists type.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-metrics-tableheader.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/dns/monitor-dns-reference.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/reference/metrics/microsoft-network-dnsresolverdomainlists-metrics-include.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/dns/monitor-dns-reference.md)

### Supported metrics for Microsoft.Network/dnsResolverPolicies

The following table lists the metrics available for the Microsoft.Network/dnsResolverPolicies type.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-metrics-tableheader.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/dns/monitor-dns-reference.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/reference/metrics/microsoft-network-dnsresolverpolicies-metrics-include.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/dns/monitor-dns-reference.md)

### Supported metrics for Microsoft.Network/dnsResolvers

The following table lists the metrics available for the Microsoft.Network/dnsResolvers type.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-metrics-tableheader.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/dns/monitor-dns-reference.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/reference/metrics/microsoft-network-dnsresolvers-metrics-include.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/dns/monitor-dns-reference.md)

### Supported metrics for Microsoft.Network/dnszones

The following table lists the metrics available for the Microsoft.Network/dnszones type.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-metrics-tableheader.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/dns/monitor-dns-reference.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/reference/metrics/microsoft-network-dnszones-metrics-include.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/dns/monitor-dns-reference.md)

### Supported metrics for Microsoft.Network/privateDnsZones

The following table lists the metrics available for the Microsoft.Network/privateDnsZones type.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-metrics-tableheader.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/dns/monitor-dns-reference.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/reference/metrics/microsoft-network-privatednszones-metrics-include.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/dns/monitor-dns-reference.md)

### Using Azure DNS metrics

Azure DNS provides metrics for you to monitor specific aspects of your DNS zones. With the metrics in Azure DNS, you can configure alerting based on conditions that are met. Azure DNS provides the following metrics to Azure Monitor for your DNS zones:

- QueryVolume
- RecordSetCount
- RecordSetCapacityUtilization

> **Note:**
> At this time, these metrics are only available for Public DNS zones hosted in Azure DNS. If you have Private Zones hosted in Azure DNS, these metrics don't provide data for those zones. In addition, the metrics and alerting feature is only supported in Azure Public cloud. Support for sovereign clouds will follow at a later time.

The most granular element that you can see metrics for is a DNS zone. You currently can't see metrics for individual resource records within a zone.

#### Query volume

The *Query Volume* metric shows the number of DNS queries received by Azure DNS for your DNS zone. The unit of measurement is `Count` and the aggregation is the `Sum` of all the queries received over a period of time.

To view this metric, select **Metrics** explorer experience from the **Monitor** page in the Azure portal. Scope down to your DNS zone and then select **Apply**. In the drop-down for *Metrics*, select`Query Volume`, and then select `Sum` from the drop-down for *Aggregation*.

Screenshot shows a graph of the Query Volume metric in the Azure portal.

### Record Set Count

The *Record Set Count* metric shows the number of Record sets in Azure DNS for your DNS zone. All the Record sets defined in your zone are counted. The unit of measurement is `Count` and the aggregation is the `Maximum` of all the Record sets.

To view this metric, select **Metrics** explorer experience from the **Monitor** tab in the Azure portal. Scope down to your DNS zone and then select **Apply**. In the drop-down for *Metrics*, select `Query Volume`, and then select `Sum` from the drop-down for *Aggregation*.

Select your DNS zone from the **Resource** drop-down, select the **Record Set Count** metric, and then select **Max** as the **Aggregation**. 

Screenshot shows a graph of the Record Set Count metric in the Azure portal.

### Record Set Capacity Utilization

The *Record Set Capacity Utilization* metric shows the percentage used of your Record set capacity for a DNS Zone. Each Azure DNS zone has a Recordset limit that defines the maximum number of Record sets allowed for the zone. For more information, see [DNS limits](dns-zones-records.md#limits) section. The unit of measurement is a `Percentage` and the aggregation type is `Maximum`.

For example, if you have 500 Record sets configured in your DNS zone, and the zone has the default Record set limit of 5000. The RecordSetCapacityUtilization metric shows the value of 10%, which is obtained by dividing 500 by 5000. 

To view this metric, select **Metrics** explorer experience from the **Monitor** tab in the Azure portal. Scope down to your DNS zone and then select **Apply**. In the drop-down for *Metrics*, select `Record Set Capacity Utilization`, and then select `Sum` from the drop-down for *Aggregation*.

Screenshot shows a graph of the Record Set Capacity Utilization metric in the Azure portal.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-metrics-dimensions-intro.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/dns/monitor-dns-reference.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-metrics-dimensions.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/dns/monitor-dns-reference.md)

- EndpointId

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-resource-logs.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/dns/monitor-dns-reference.md)

### Supported resource logs for Microsoft.Network/dnsResolverPolicies

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/reference/logs/microsoft-network-dnsresolverpolicies-logs-include.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/dns/monitor-dns-reference.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-logs-tables.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/dns/monitor-dns-reference.md)

### Azure DNS Microsoft.Network/dnsResolverPolicies

- [AzureActivity](https://learn.microsoft.com/azure/azure-monitor/reference/tables/azureactivity#columns)
- [DNSQueryLogs](https://learn.microsoft.com/azure/azure-monitor/reference/tables/dnsquerylogs#columns)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-activity-log.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/dns/monitor-dns-reference.md)

- [Microsoft.Network resource provider operations](https://learn.microsoft.com/azure/role-based-access-control/resource-provider-operations#microsoftnetwork)

## Related content

- See [Monitor Azure DNS](monitor-dns.md) for a description of monitoring Azure DNS.
- See [Monitor Azure resources with Azure Monitor](https://learn.microsoft.com/azure/azure-monitor/essentials/monitor-azure-resource) for details on monitoring Azure resources.
