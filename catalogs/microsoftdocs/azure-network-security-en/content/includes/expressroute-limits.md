---
 title: include file
 description: include file
 services: expressroute
 author: duongau
 ms.service: azure-expressroute
 ms.topic: include
 ms.date: 10/09/2023
 ms.author: duau
 ms.custom: include file
---

| Resource | Limit |
| --- | --- |
| ExpressRoute circuits per subscription | 50 (Submit a support request to increase limit) |
| ExpressRoute circuits per region per subscription, with Azure Resource Manager | 10 |
| Maximum number of circuits in the same peering location linked to the same virtual network | 4 |
| Maximum number of circuits in different peering locations linked to the same virtual network | Standard / ERGw1Az - 4 </br> High Perf / ERGw2Az - 8 </br> Ultra Performance / ErGw3Az - 16 |
| Maximum number of IPs for ExpressRoute provider circuit with Fastpath | 25,000 |
| Maximum number of IPs for ExpressRoute Direct 10 Gbps with Fastpath | 100,000 |
| Maximum number of IPs for ExpressRoute Direct 100 Gbps with Fastpath | 200,000 |
| Maximum number of flows for ExpressRoute Traffic Collector | 300,000 |

#### Route advertisement limits

| Resource | Local / Standard SKU | Premium SKU |
| --- | --- | --- |
| Maximum number of IPv4 on-prem routes advertised over Azure private peering to the ExpressRoute circuit | 4,000 | 10,000 |
| Maximum number of IPv6 on-prem routes advertised over Azure private peering to the ExpressRoute circuit | 100 | 100 |
| Maximum number of IPv4 Virtual Network routes advertised by the Gateway to the ExpressRoute circuit over Azure private peering | 1,000 | 1,000 |
| Maximum number of IPv6 Virtual Network routes advertised by the Gateway to the ExpressRoute circuit over Azure private peering | 100 | 100 |
| Maximum number of IPv4 routes advertised to Microsoft peering from on-premises | 200 | 200 |
| Maximum number of IPv6 routes advertised to Microsoft peering from on-premises | 200 | 200 |

#### Virtual networks links allowed for each ExpressRoute circuit limit

| Circuit size | Local / Standard SKU | Premium SKU |
| --- | --- | --- |
| 50 Mbps | 10 | 20 |
| 100 Mbps | 10 | 25 |
| 200 Mbps | 10 | 25 |
| 500 Mbps | 10 | 40 |
| 1 Gbps | 10 | 50 |
| 2 Gbps | 10 | 60 |
| 5 Gbps | 10 | 75 |
| 10 Gbps | 10 | 100 |
| 40 Gbps* | 10 | 100 |
| 100 Gbps* | 10 | 100 |

**100-Gbps ExpressRoute Direct Only*

> **Note:**
> Global Reach connections count against the limit of virtual network connections per ExpressRoute Circuit. For example, a 10 Gbps Premium Circuit would allow for 5 Global Reach connections and 95 connections to the ExpressRoute Gateways or 95 Global Reach connections and 5 connections to the ExpressRoute Gateways or any other combination up to the limit of 100 connections for the circuit.

#### ExpressRoute gateway performance limits


The following tables provide an overview of the different types of gateways, their respective limitations, and their expected performance metrics.


#### Maximum supported limits

This table applies to both the Azure Resource Manager and classic deployment models.

| Gateway SKU | Megabits per second | Packets per second | Supported number of VMs in the virtual network <sup>1</sup> | Flow count limit | Number of routes learned by gateway |
| --- | --- | --- | --- | --- | --- |
| **Standard/ERGw1Az** | 1,000 | 100,000 | 2,000 | 200,000 | 4,000 |
| **High Performance/ERGw2Az** | 2,000 | 200,000 | 4,500 | 400,000 | 9,500 |
| **Ultra Performance/ErGw3Az** | 10,000 | 1,000,000 | 11,000 | 1,000,000 | 9,500 |
| **ErGwScale (per scale unit 1-10)** | 1,000 per scale unit | 100,000 per scale unit | 2,000 per scale unit | 100,000 per scale unit | 9,500 total per gateway |
| **ErGwScale (per scale unit 11-40)** | 1,000 per scale unit | 200,000 per scale unit | 1,000 per scale unit | 100,000 per scale unit | 9,500 total per gateway |

<sup>1</sup> "Supported number of VMs in the virtual network" refers to the count of resources that communicate through the gateway. This includes:

- Virtual Machines in the hub virtual network
- Virtual Machines in peered spoke virtual networks (Hub-Spoke topology)
- Private Endpoints
- Network Virtual Appliances (such as Application Gateway, Azure Firewall)
- Backend instances of PaaS services deployed in virtual networks (such as SQL Managed Instance, App Service Environment, Azure API Management in VNet mode)

The values in the table are estimates and vary depending on the CPU utilization of the gateway. If the CPU utilization is high and the number of supported VMs is exceeded, the gateway will start to drop packets.
> **Note:**
> ExpressRoute can facilitate up to 11,000 routes that span virtual network address spaces, on-premises networks, and any relevant virtual network peering connections. To ensure stability of your ExpressRoute connection, refrain from advertising more than 11,000 routes to ExpressRoute. The maximum number of routes advertised by gateway is 1,000 routes.

> **Important:**
> * Application performance depends on multiple factors, such as end-to-end latency and the number of traffic flows that the application opens. The numbers in the table represent the upper limit that the application can theoretically achieve in an ideal environment. Additionally, we perform routine host and OS maintenance on the ExpressRoute virtual network gateway, to maintain reliability of the service. During a maintenance period, the control plane and data path capacity of the gateway is reduced.
> * During a maintenance period, you might experience intermittent connectivity problems to private endpoint resources.
> * ExpressRoute supports a maximum TCP and UDP packet size of 1,400 bytes. Fragmented packets are not supported by ExpressRoute Gateways. Please adjust your application to prevent IP fragmentation. If IP fragmentation support is required, enable the [ExpressRoute FastPath](https://learn.microsoft.com/azure/expressroute/about-fastpath) feature to bypass the ExpressRoute gateway.
> * Azure Route Server can support up to 4,000 VMs. This limit includes VMs in virtual networks that are peered. For more information, see [Azure Route Server limitations](https://learn.microsoft.com/azure/route-server/overview#route-server-limits).
> * The values in the table above represent the limits at each Gateway SKU.
