---
title: 'About Azure VPN Gateway'
description: Learn what VPN Gateway is, and how to use a VPN gateway to connect to IPsec IKE site-to-site, VNet-to-VNet, and point-to-site VPN virtual networks.
author: duongau
ms.service: azure-vpn-gateway
ms.topic: overview
ms.date: 06/08/2026
ms.author: duau
ms.custom: e2e-hybrid
# Customer intent: As someone with a basic network background, but is new to Azure, I want to understand the capabilities of Azure VPN Gateway so that I can securely connect to my Azure virtual networks.
---

# What is Azure VPN Gateway?

Azure VPN Gateway service can be used to send encrypted traffic between an Azure virtual network and on-premises locations over the public Internet. You can also use VPN Gateway to send encrypted traffic between Azure virtual networks over the Microsoft network. VPN Gateway uses a specific type of Azure virtual network gateway called a VPN gateway. Multiple connections can be created to the same VPN gateway. When you create multiple connections, all VPN tunnels share the available gateway bandwidth.

> **Note:**
> Azure VPN Gateway is one of the services that make up the Hybrid Connectivity category in Azure. Other services in this category include [ExpressRoute](../expressroute/expressroute-introduction.md) and [Virtual WAN](../virtual-wan/virtual-wan-about.md). Each service has its own unique features and use cases. For more information on this service category, see [Hybrid Connectivity](../networking/hybrid-connectivity/hybrid-connectivity.md).

## Why use VPN Gateway?

Here are some of the key scenarios for VPN Gateway:

* Send encrypted traffic between an Azure virtual network and on-premises locations over the public Internet using one of the following types of connections:

  * **Site-to-site connection:** A cross-premises IPsec/IKE VPN tunnel connection between the VPN gateway and an on-premises VPN device.

  * **Point-to-site connection:** VPN over OpenVPN, IKEv2, or SSTP. This type of connection lets you connect to your virtual network from a remote location, such as from a conference or from home.

* Send encrypted traffic between Azure virtual networks using the following types of connections:

  * **VNet-to-VNet:** An IPsec/IKE VPN tunnel connection between the VPN gateway and another Azure VPN gateway that uses a *VNet-to-VNet* connection type. This connection type is designed specifically for VNet-to-VNet connections.

  * **Site-to-site connection:** An IPsec/IKE VPN tunnel connection between the VPN gateway and another Azure VPN gateway. This type of connection, when used in the VNet-to-VNet architecture, uses the *Site-to-site (IPsec)* connection type, which allows cross-premises connections to the gateway in addition connections between VPN gateways.

* Configure a site-to-site VPN as a secure failover path for [ExpressRoute](../expressroute/expressroute-introduction.md) using:

  * **ExpressRoute + VPN Gateway:** A combination of ExpressRoute + VPN Gateway connections (coexisting connections).

* Use site-to-site VPNs to connect to sites that aren't connected through [ExpressRoute](../expressroute/expressroute-introduction.md) using:

  * **ExpressRoute + VPN Gateway:** A combination of ExpressRoute + VPN Gateway connections (coexisting connections).

## <a name="connectivity"></a> Planning and design

Because you can create multiple connection configurations using VPN Gateway, you need to determine which configuration best fits your needs. Point-to-site, site-to-site, and coexisting ExpressRoute/site-to-site connections all have different instructions and resource configuration requirements.

See the [VPN Gateway topology and design](design.md) article for design topologies and links to configuration instructions. The following sections of the article highlight some of the design topologies that are most often used.

* [Site-to-site VPN connections](design.md#s2smulti)
* [Point-to-site VPN connections](design.md#P2S)
* [VNet-to-VNet VPN connections](design.md#V2V)

### <a name="planningtable"></a>Planning table

The following table can help you decide the best connectivity option for your solution.

|  | **Point-to-Site** | **Site-to-Site** |
| --- | --- | --- |
| **Azure Supported Services** | Cloud Services and Virtual Machines | Cloud Services and Virtual Machines |
| **Typical Bandwidths** | Based on the gateway SKU | Typically < 10 Gbps aggregate |
| **Protocols Supported** | Secure Sockets Tunneling Protocol (SSTP), OpenVPN, and IPsec | IPsec |
| **Routing** | RouteBased (dynamic) | We support PolicyBased (static routing) and RouteBased (dynamic routing VPN) |
| **Connection resiliency** | active-passive or active-active | active-passive or active-active |
| **Typical use case** | Secure access to Azure virtual networks for remote users | Dev, test, and lab scenarios and small to medium scale production workloads for cloud services and virtual machines |
| **SLA** | [SLA](https://azure.microsoft.com/support/legal/sla/) | [SLA](https://azure.microsoft.com/support/legal/sla/) |
| **Pricing** | [Pricing](https://azure.microsoft.com/pricing/details/vpn-gateway/) | [Pricing](https://azure.microsoft.com/pricing/details/vpn-gateway/) |
| **Technical Documentation** | [VPN Gateway](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/vpn-gateway/index.yml) | [VPN Gateway](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/vpn-gateway/index.yml) |
| **FAQ** | [VPN Gateway FAQ](vpn-gateway-vpn-faq.md) | [VPN Gateway FAQ](vpn-gateway-vpn-faq.md) |


### <a name="availability"></a>Availability Zones

VPN gateways can be deployed in Azure Availability Zones. Availability zone deployments bring resiliency, scalability, and higher availability to virtual network gateways. Deploying gateways in Azure Availability Zones physically and logically separates gateways within a region, while protecting your on-premises network connectivity to Azure from zone-level failures. See [About zone-redundant virtual network gateways in Azure Availability Zones](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/vpn-gateway/about-zone-redundant-vnet-gateways.md).

## <a name="configuring"></a>Configuring VPN Gateway

A VPN gateway connection relies on multiple resources that are configured with specific settings. In some cases, resources must be configured in a certain order. The settings that you chose for each resource are critical to creating a successful connection.

For information about individual resources and settings for VPN Gateway, see [About VPN Gateway settings](vpn-gateway-about-vpn-gateway-settings.md) and [About gateway SKUs](about-gateway-skus.md). 

For design diagrams and links to configuration articles, see the [VPN Gateway topology and design](design.md) article.

## <a name="gwsku"></a>Gateway SKUs

When you create a virtual network gateway, you specify the gateway SKU that you want to use. Select the SKU that satisfies your requirements based on the types of workloads, throughputs, features, and SLAs. For more information about gateway SKUs, including supported features, performance tables, configuration steps, and production vs. dev-test workloads, see [About gateway SKUs](about-gateway-skus.md).


The following SKUs can be used to deploy new VPN gateways. They have zone-redundant options and are recommended for all new deployments.

| **VPN<br>Gateway<br>Generation** | **SKU** | **S2S/VNet-to-VNet<br>Tunnels** | **P2S<br> SSTP Connections** | **P2S<br> IKEv2/OpenVPN Connections** | **Aggregate<br>Throughput Benchmark** | **BGP** | **Zone-redundant** | **Supported Number of VMs in the Virtual Network** |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Generation1** | **Basic** | Max. 10 | Max. 128 | Not Supported | 100 Mbps | Not Supported | No | 200 |
| **Generation1** | **VpnGw1AZ** | Max. 30 | Max. 128 | Max. 250 | 650 Mbps | Supported | Yes | 1000 |
| **Generation1** | **VpnGw2AZ** | Max. 30 | Max. 128 | Max. 500 | 1 Gbps | Supported | Yes | 2000 |
| **Generation1** | **VpnGw3AZ** | Max. 30 | Max. 128 | Max. 1000 | 1.25 Gbps | Supported | Yes | 5000 |
|  |  |  |  |  |  |  |  |  |
| **Generation2** | **VpnGw2AZ** | Max. 30 | Max. 128 | Max. 500 | 1.25 Gbps | Supported | Yes | 2000 |
| **Generation2** | **VpnGw3AZ** | Max. 30 | Max. 128 | Max. 1000 | 2.5 Gbps | Supported | Yes | 3300 |
| **Generation2** | **VpnGw4AZ** | Max. 100* | Max. 128 | Max. 5000 | 5 Gbps | Supported | Yes | 4400 |
| **Generation2** | **VpnGw5AZ** | Max. 100* | Max. 128 | Max. 10000 | 10 Gbps | Supported | Yes | 9000 |


VpnGw1~5 are slated for migration and should not be used to create new VPN gateways. For more information, see [VPN Gateway SKU consolidation and migration](gateway-sku-consolidation.md).

| **VPN<br>Gateway<br>Generation** | **SKU** | **S2S/VNet-to-VNet<br>Tunnels** | **P2S<br> SSTP Connections** | **P2S<br> IKEv2/OpenVPN Connections** | **Aggregate<br>Throughput Benchmark** | **BGP** | **Zone-redundant** | **Supported Number of VMs in the Virtual Network** |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Generation1** | **VpnGw1** | Max. 30 | Max. 128 | Max. 250 | 650 Mbps | Supported | No | 450 |
| **Generation1** | **VpnGw2** | Max. 30 | Max. 128 | Max. 500 | 1 Gbps | Supported | No | 1300 |
| **Generation1** | **VpnGw3** | Max. 30 | Max. 128 | Max. 1000 | 1.25 Gbps | Supported | No | 4000 |
|  |  |  |  |  |  |  |  |  |
| **Generation2** | **VpnGw2** | Max. 30 | Max. 128 | Max. 500 | 1.25 Gbps | Supported | No | 685 |
| **Generation2** | **VpnGw3** | Max. 30 | Max. 128 | Max. 1000 | 2.5 Gbps | Supported | No | 2240 |
| **Generation2** | **VpnGw4** | Max. 100* | Max. 128 | Max. 5000 | 5 Gbps | Supported | No | 5300 |
| **Generation2** | **VpnGw5** | Max. 100* | Max. 128 | Max. 10000 | 10 Gbps | Supported | No | 6700 |

> **Note:**
> "Supported Number of VMs in the Virtual Network" refers to the count of resources that communicate through the gateway. This includes:
> - Virtual Machines in the hub and peered spoke virtual networks
> - Private Endpoints
> - Network Virtual Appliances (such as Application Gateway, Azure Firewall)
> - Backend instances of PaaS services deployed in virtual networks (such as SQL Managed Instance, App Service Environment)

(*) If you need more than 100 S2S VPN tunnels, use [Virtual WAN](../virtual-wan/virtual-wan-about.md) instead of VPN Gateway.

## <a name="pricing"></a>Pricing

You pay for two things: the hourly compute costs for the virtual network gateway, and the egress data transfer from the virtual network gateway. Pricing information can be found on the [Pricing](https://azure.microsoft.com/pricing/details/vpn-gateway) page. For legacy gateway SKU pricing, see the [ExpressRoute pricing page](https://azure.microsoft.com/pricing/details/expressroute) and scroll to the **Virtual Network Gateways** section.

**Virtual network gateway compute costs**<br>Each virtual network gateway has an hourly compute cost. The price is based on the gateway SKU that you specify when you create a virtual network gateway. The cost is for the gateway itself and is in addition to the data transfer that flows through the gateway. Cost of an active-active setup is the same as active-passive. For more information about gateway SKUs for VPN Gateway, see [Gateway SKUs](vpn-gateway-about-vpn-gateway-settings.md#gwsku).

**Data transfer costs**<br>Data transfer costs are calculated based on egress traffic from the source virtual network gateway.

* If you're sending traffic to your on-premises VPN device, the charges areas per the Internet egress data transfer rate.
* If you're sending traffic between virtual networks in different regions, the pricing is based on the region.
* If you're sending traffic only between virtual networks that are in the same region, there are no data costs. Traffic between VNets in the same region is free.

## <a name="new"></a>What's new in VPN Gateway?

Azure VPN Gateway is updated regularly. To stay current with the latest announcements, see the [What's new?](whats-new.md) article. The article highlights the following points of interest:

* Recent releases
* Previews underway with known limitations (if applicable)
* Known issues
* Deprecated functionality (if applicable)

You can also subscribe to the RSS feed and view the latest VPN Gateway feature updates on the [Azure Updates](https://azure.microsoft.com/updates?filters=%5B%22VPN+Gateway%22%5D) page.

## <a name="faq"></a>FAQ

For frequently asked questions about VPN gateway, see the [VPN Gateway FAQ](vpn-gateway-vpn-faq.md).

## Next steps

* [Tutorial: Create and manage a VPN Gateway](tutorial-create-gateway-portal.md).
* [Learn module: Introduction to Azure VPN Gateway](https://learn.microsoft.com/training/modules/intro-to-azure-vpn-gateway).
* [Learn module: Connect your on-premises network to Azure with VPN Gateway](https://learn.microsoft.com/training/modules/connect-on-premises-network-with-vpn-gateway/).
* [Subscription and service limits](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/azure-subscription-service-limits.md#azure-vpn-gateway-limits).
