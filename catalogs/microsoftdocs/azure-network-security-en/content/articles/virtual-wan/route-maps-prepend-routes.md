---
title: 'How to configure Route-maps to prepend routes'
titleSuffix: Azure Virtual WAN
description: Learn how to configure Route-maps to prepend routes.
author: cfields475
ms.service: azure-virtual-wan
ms.topic: how-to
ms.date: 03/04/2025
ms.author: cfields
ms.custom: references_region

---
# How to configure Route-maps to prepend routes

This article helps you use the Route-maps feature to prepend routes using the Azure portal. For more information about Virtual WAN Route-maps, see [About Route-maps](route-maps-about.md).

## Prerequisites

Verify that you have met the following criteria before beginning your configuration:

* You have virtual WAN (VWAN) with a connection (S2S, P2S, or ExpressRoute) already configured.

  * For steps to create a VWAN with a S2S connection, see [Tutorial - Create a S2S connection with Virtual WAN](virtual-wan-site-to-site-portal.md).
  * For steps to create a virtual WAN with a P2S User VPN connection, see [Tutorial - Create a User VPN P2S connection with Virtual WAN](virtual-wan-point-to-site-portal.md).
* Be sure to view [About Route-maps](route-maps-about.md#considerations-and-limitations) for considerations and limitations before proceeding with configuration steps.

## Design
In this situation, we have two hubs. Hub 1 has 2 VNets and a VPN branch office. One of the VNets has an NVA (network virtual appliance) peered with the hub. Hub 2 also has 2 VNets and a VPN branch office. 

   Screenshot to show the environment.

Here's the addressing for this environment:  

| Resource | Address Space |
| --- | --- |
| Hub 1 | 192.168.1.0/24 |
| Hub 2 | 192.168.2.0/24 |
| Virtual network 1 | 10.1.0.0/24 |
| Virtual network 2 | 10.2.0.0/24 |
| Virtual network 3 | 10.3.0.0/24 |
| Virtual network 4 | 10.4.0.0/24 |
| VPN Branch 1 | 10.122.1.0/24, 10.122.2.0/24, 10.122.3.0/24, 10.100.0.0/16 |
| VPN Branch 2 | 10.200.0.0/16 |
| NVA 1 | 10.150.1.0/24, 10.150.2.0/24, 10.150.3.0/24, 10.150.4.0/24 |

## Scenario: Using ASNs to prepend routes 

In this scenario, the goal is to prepend route 10.5.0.192/26 from virtual network 3 on Hub 2 with ASN 65533.  
> **Important:**
> 
When using Route-maps, don't use private ASNs (Autonomous System Numbers) for AS prepending. If you're using ExpressRoute, the gateway strips private ASNs. 

Don't use ASNs reserved by Azure for AS prepending:

* Public ASNs: 8074, 8075, 12076

* Private ASNs: 65515, 65517, 65518, 65519, 65520 



   Screenshot that shows the Scenario.

## Workflow

1. Use the Route-Map dashboard in hub 2 to verify the ASNs on routes are being advertised from the virtual network connection. 

   Screenshot that shows the routes before Route-Map being applied.

   Look at the Route-Map dashboard for the VPN branch 2 to verify the ASNs for route 10.5.0.192/26 that are being sent to the branch office. 

   Screenshot that shows the routes before Route-Map being applied to the VPN branch.

2. Create a Route-Map to tag the route. If this is your first time creating a Route-Map, see [How to configure Route-maps](route-maps-how-to.md) for more information. 

   The Route-Map will have a match rule for route 10.5.0.192/26. The action **modify** will be selected. Route Modification has a **Prepend** for **AS Path** 65533.  

   Screenshot that shows the Route-Map.

3. Apply the Route-Map on the virtual network 3 connection. The Route-Map will be applied in the inbound direction. 

   Screenshot of the Route-map being applied.

4. Using the Route-Map dashboard in Hub 2, Verify that route 10.5.0.192/26 has an ASN of 65533 added.    

   Screenshot showing routes after Route-map was applied.

   look at the Route-Map dashboard for VPN branch 2 connection to verify route 10.5.0.192/26 has the ASNs 65533 advertised to VPN branch 2.

   Screenshot of routes after Route-map being applied for the VPN branch.

## Next steps

* Use the [Route-maps dashboard](route-maps-dashboard.md) to monitor routes, AS Path, and BGP communities.
* To learn more about Route-maps, see [About Route-maps](route-maps-about.md).
