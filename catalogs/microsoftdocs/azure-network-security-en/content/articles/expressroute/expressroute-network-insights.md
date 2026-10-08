---
title: 'Azure ExpressRoute Insights using Network Insights'
description: Learn about Azure ExpressRoute Insights using Network Insights.
author: duongau
ms.service: azure-expressroute
ms.topic: how-to
ms.date: 03/11/2026
ms.author: duau
---

# Azure ExpressRoute Insights using Network Insights

This article explains how Network Insights can help you view  your ExpressRoute metrics and configurations all in one place. Through Network Insights, you can view topological maps and health dashboards containing important ExpressRoute information without needing to complete any extra setup.

Screenshot of Networks monitor landing page.

## Visualize functional dependencies

1. Navigate to the *Azure Monitor* page, then select *Networks*.

1. Select the *ExpressRoute Circuits* card. 

1. Then, select the topology button for the circuit you would like to view.

   Screenshot of ExpressRoute monitor landing page.

1. The functional dependency view provides a clear picture of your ExpressRoute setup, outlining the relationship between different ExpressRoute components (peerings, connections, gateways).

    Screenshot of topology view for network insights.

1. Hover over any component in the topology map to view configuration information. For example, hover over an ExpressRoute peering component to view details such as circuit bandwidth and Global Reach enablement.

    Screenshot of hovering over topology view resources.

## View a detailed and preloaded metrics dashboard

Once you review the topology of your ExpressRoute setup using the functional dependency view, select **View detailed metrics** to navigate to the detailed metrics view to understand the performance of your circuit. This view offers an organized list of linked resources and a rich dashboard of important ExpressRoute metrics.

The **Linked Resources** section lists the connected ExpressRoute gateways and configured peerings, which you can select on to navigate to the corresponding resource page.

Screenshot of linked resource on monitor page.


The **ExpressRoute Metrics** section includes charts of important circuit metrics across the categories of **Availability**, **Throughput**, **Packet Drops**, and **Gateway Metrics**.

### Availability

The *Availability* tab tracks ARP and BGP availability, plotting the data for both the circuit as a whole and individual connection (primary and secondary). 

Screenshot of availability metric graphs.

>**Note:**
>During maintenance between the Microsoft edge and core network, BGP availability will appear down even if the BGP session between the customer edge and Microsoft edge remains up. For information about maintenance between the Microsoft edge and core network, make sure to have your [maintenance alerts turned on and configured](maintenance-alerts.md).
>

### Throughput

Similarly, the *Throughput* tab plots the total throughput of ingress and egress traffic for the circuit in bits/second. You can also view throughput for individual connections and each type of configured peering.

Screenshot of throughput metric graphs.

### Packet Drops

The *Packet Drops* tab plots the dropped bits/second for ingress and egress traffic through the circuit. This tab provides an easy way to monitor performance issues that may occur if you regularly need or exceed your circuit bandwidth.

Screenshot of dropped packets graphs.

### Gateway Metrics

Lastly, the Gateway Metrics tab populates with key metrics charts for a selected ExpressRoute gateway (from the Linked Resources section). Use this tab when you need to monitor your connectivity to specific virtual networks.

Screenshot of gateway throughput and CPU metrics.

## Next steps

Configure your ExpressRoute connection.
  
* Learn more about [Azure ExpressRoute](expressroute-introduction.md), [Network Insights](../network-watcher/network-insights-overview.md), and [Network Watcher](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/network-watcher/network-watcher-monitoring-overview.md)
* [Create and modify a circuit](expressroute-howto-circuit-arm.md)
* [Create and modify peering configuration](expressroute-howto-routing-arm.md)
* [Link a VNet to an ExpressRoute circuit](expressroute-howto-linkvnet-arm.md)
* [Customize your metrics](monitor-expressroute-reference.md) and create a [Connection Monitor](../network-watcher/connection-monitor-overview.md)
