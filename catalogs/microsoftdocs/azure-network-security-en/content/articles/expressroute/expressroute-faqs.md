---
title: FAQ - Azure ExpressRoute | Microsoft Docs
description: The ExpressRoute FAQ contains information about Supported Azure Services, Cost, Data and Connections, SLA, Providers and Locations, Bandwidth, and other Technical Details.
services: expressroute
author: duongau
ms.service: azure-expressroute
ms.topic: faq
ms.date: 03/31/2026
ms.author: duau

---
# ExpressRoute FAQ

## What is ExpressRoute?

ExpressRoute is an Azure service that lets you create private connections between Microsoft datacenters and infrastructure that's on your premises or in a colocation facility.

### What are the benefits of using ExpressRoute and private network connections?

ExpressRoute connections don't go over the public internet. They offer higher security, reliability, and speeds, with lower and consistent latencies than typical connections over the internet. In some cases, using ExpressRoute connections to transfer data between on-premises devices and Azure can yield significant cost benefits.

### Where is the service available?

For service location and availability, see [ExpressRoute partners and locations](expressroute-locations.md).

### How can I use ExpressRoute to connect to Microsoft if I don't have partnerships with one of the ExpressRoute-carrier partners?

You can select a regional carrier and land Ethernet connections to one of the supported exchange provider locations and then peer with Microsoft at the provider location. See [connect through another service provider](expressroute-locations.md#connectivity-through-additional-service-providers) to see if your service provider is present in any of the exchange locations. You can order an ExpressRoute circuit through the service provider to connect to Azure.

If your provider does not support ExpressRoute or does not support the location you would like to use, please reach out to the provider to request that they add support.

### How much does ExpressRoute cost?

For a breakdown of ExpressRoute cost, see [pricing details](https://azure.microsoft.com/pricing/details/expressroute/).

### Is bandwidth for ExpressRoute allocated for ingress and egress traffic separately?

Yes, the ExpressRoute circuit bandwidth is duplex. For example, if you purchase a 200-Mbps ExpressRoute circuit, you're procuring 200 Mbps for ingress traffic and 200 Mbps for egress traffic.

### Do I have to purchase a private connection of the same speed as the ExpressRoute circuit I purchase?

No. You can purchase a private connection of any speed from your service provider. However, your connection to Azure is limited to the ExpressRoute circuit bandwidth that you purchase.

### Is it possible to use more bandwidth than I procured for my ExpressRoute circuit?

Yes, you can use up to two times the bandwidth limit you procured by spreading the traffic across both links of your ExpressRoute circuit and using the redundant bandwidth available. The built-in redundancy of your circuit is configured using redundant links, each with procured bandwidth, to two Microsoft Enterprise Edge routers (MSEEs). The bandwidth available through your secondary link can be used for more traffic if necessary. Since the second link is meant for redundancy, it isn't guaranteed and shouldn't be used for extra traffic for a sustained period of time. To learn more about how to use both connections to transmit traffic, see [use AS PATH prepending](expressroute-optimize-routing.md#solution-use-as-path-prepending).

If you plan to use only your primary link to transmit traffic, the bandwidth for the connection is fixed, and attempting to oversubscribe it results in increased packet drops. If traffic flows through an ExpressRoute Gateway, the bandwidth for the Gateway SKU is fixed and not burstable. For the bandwidth of each Gateway SKU, see [About ExpressRoute virtual network gateways](expressroute-about-virtual-network-gateways.md#aggthroughput).

### If I pay for unlimited data, do I get unlimited egress data transfer for services accessed over Microsoft peering?

If you're connecting to a service using Microsoft Peering with unlimited data, then ExpressRoute skips charges for egress data. Egress data is still charged for services such as compute, storage, or any other services that are accessed over Microsoft peering, even if the destination is a Microsoft peering public IP address.

### Can I use the same private network connection with virtual network and other Azure services simultaneously?

Yes. An ExpressRoute circuit, once set up, allows you to access services within a virtual network and other Azure services simultaneously. You connect to virtual networks over the private peering path, and to other services over the Microsoft peering path.

### How are virtual networks advertised on ExpressRoute private peering?

The ExpressRoute gateway advertises one or more *Address Space* of the Azure virtual network, which you can't include/exclude at the subnet level. It's always the virtual network address space that gets advertised. If virtual network peering is used and the peered virtual network has "Use remote gateway" enabled, the address spaces of the peered virtual network also get advertised.

### How many prefixes can be advertised from a virtual network to on-premises on ExpressRoute private peering?

There's a maximum of 1000 IPv4 prefixes advertised on a single ExpressRoute connection, or through virtual networking peering using gateway transit. For example, if you have 999 address spaces on a single virtual network connected to an ExpressRoute circuit, all 999 prefixes gets advertised to on-premises. Alternatively, if you have a virtual network enabled to allow gateway transit with 1 address space and 500 spoke virtual network enabled using the "Allow Remote Gateway" option, the virtual network deployed with the gateway advertises 501 prefixes to on-premises.

If you're using a dual-stack circuit, there's a maximum of 100 IPv6 prefixes on a single ExpressRoute connection, or through virtual network peering using gateway transit. This limit is in addition to the limits described previously.

### What happens if the prefix limit on an ExpressRoute connection gets exceeded?

The connection between the ExpressRoute circuit and the gateway disconnects including peered virtual network using gateway transit. Connectivity re-establishes when the prefix limit is no longer exceeded.

### How can I reduce the number of prefixes advertised from Azure to on-premises?

ExpressRoute private peering has a maximum number of IPv4 prefixes that can be advertised on a single ExpressRoute connection (for example, 1,000 IPv4 prefixes and 100 IPv6 prefixes).

For hub-and-spoke topologies, the default behavior is to advertise the hub address space and peered spoke address spaces to on-premises. To reduce the number of prefixes advertised from Azure to on-premises, configure advertised gateway prefixes on the gateway virtual network using the `summarizedGatewayPrefixes` property. When populated, Azure VPN Gateway and ExpressRoute Gateway advertise the summarized prefixes instead and suppress advertisement of covered spoke address spaces.

> **Note:**
> The `summarizedGatewayPrefixes` property only affects virtual networks with a gateway subnet.

For more information, see [Advertised gateway prefixes overview](https://learn.microsoft.com/azure/virtual-network/advertised-gateway-prefixes-overview).

## How can I adjust the number of prefixes advertised to the gateway to ensure it's within the maximum limitation?

ExpressRoute supports up to 11,000 routes, covering virtual network address spaces, on-premises networks, and virtual network peering connections. If the ExpressRoute gateway exceeds this limit, update the prefixes to be within the allowed range.

To make this change in the Azure portal:

1. GNavigate to the Advisor resource, and select the "Performance" pillar.
2. Select the recommendation for "Max prefix reached for ExpressRoute Gateway."
3. Select the Gateway with this recommendation.
4. In the Gateway resource, select the "Virtual network" to which the Gateway is attached.
5. In the Virtual Network resource, select "Address Space" blade under settings on the left menu.
6. Reduce the advertised address space to within the limit.

### Can routes from the on-premises network get filtered?

The only way to filter or include routes is on the on-premises edge router. User-defined routes can be added in the VNet to affect specific routing, but is only static and not part of the BGP advertisement.

### Does ExpressRoute offer a Service Level Agreement (SLA)?

For information, see the [ExpressRoute SLA](https://azure.microsoft.com/support/legal/sla/).

## Supported services

ExpressRoute supports [two routing domains](expressroute-circuit-peerings.md) for various types of services: private peering and Microsoft peering.

### Private peering

**Supported:**

* Virtual networks, including all virtual machines and cloud services like [Azure Virtual Desktop RDP Shortpath](https://learn.microsoft.com/azure/virtual-desktop/shortpath)

### Microsoft peering

If your ExpressRoute circuit is enabled for Azure Microsoft peering, you can access the [public IP address ranges](../virtual-network/ip-services/public-ip-addresses.md#public-ip-addresses) used in Azure over the circuit. Azure Microsoft peering provides access to services currently hosted on Azure (with geo-restrictions depending on your circuit's SKU). To validate availability for a specific service, you can check the documentation for that service to see if there's a reserved range published for that service. Then, look up the IP ranges of the target service and compare with the ranges listed in the [Azure IP Ranges and Service Tags – Public Cloud XML file](https://www.microsoft.com/download/details.aspx?id=56519). Alternatively, you can open a support ticket for the service in question for clarification.

**Supported:**

* [Microsoft 365](https://learn.microsoft.com/microsoft-365/enterprise/azure-expressroute)
* Power BI - Available via an Azure Regional Community, see [here](https://learn.microsoft.com/power-bi/service-admin-where-is-my-tenant-located) for how to find out the region of your Power BI tenant.
* Microsoft Entra ID
* [Azure DevOps](https://blogs.msdn.microsoft.com/devops/2018/10/23/expressroute-for-azure-devops/) (Azure Global Services community)
* [Microsoft PSTN services](using-expressroute-for-microsoft-pstn.md)
* Azure Public IP addresses for IaaS (Virtual Machines, Virtual Network Gateways, Load Balancers, etc.)  
* Most of the other Azure services are also supported. Check directly with the service that you want to use to verify support.

**Not supported:**

* CDN
* Azure Front Door
* Multifactor Authentication Server (legacy)
* Traffic Manager
* Logic Apps
* [Intune](https://learn.microsoft.com/mem/intune/fundamentals/intune-endpoints?tabs=north-america#intune-core-service)

### Why does the **Advertised public prefixes** status show *Validation needed*, while configuring Microsoft peering?

Microsoft verifies if the specified **Advertised public prefixes** and **Peer ASN** or **Customer ASN** are assigned to you in the Internet Routing Registry. If you get public prefixes from another entity and the assignment isn't recorded in the routing registry, the automatic validation doesn't complete. You need to manually validate. If the automatic validation fails, you see the message *Validation needed*.

If you see *Validation needed*, collect documents that show the entity listed as the owner of the prefixes in the routing registry assigning your public prefixes to your organization. Then submit these documents for manual validation by opening a support ticket.

Screenshot of a new support request for proof of ownership for public prefixes.

### Is Dynamics 365 supported on ExpressRoute?

Dynamics 365 and Common Data Service (CDS) environments are hosted on Azure and therefore customers benefit from the underlying ExpressRoute support for Azure resources. You can connect to its service endpoints if your router filter includes the Azure regions your Dynamics 365/CDS environments are hosted in.

> **Note:**
> [ExpressRoute Premium](#expressroute-premium) is **not** required for Dynamics 365 connectivity via Azure ExpressRoute if the ExpressRoute circuit is deployed within the same [geopolitical region](expressroute-locations-providers.md#expressroute-locations).

## Data and connections

### Are there limits on the amount of data that I can transfer using ExpressRoute?

Microsoft doesn't set a limit on the amount of data transfer. See [pricing details](https://azure.microsoft.com/pricing/details/expressroute/) for information on bandwidth rates.

### Why can't I see connection details on the circuit page of the Azure portal?

When a circuit and its associated connections reside in different subscriptions, the resources from other subscriptions aren’t visible by default. To view the connection details, you’ll need to manually refresh the circuit page. This triggers an API call that fetches and displays the connection information on the circuit page.

### What connection speeds are supported for ExpressRoute?

Supported bandwidth offers:

50 Mbps, 100 Mbps, 200 Mbps, 500 Mbps, 1 Gbps, 2 Gbps, 5 Gbps, 10 Gbps

> **Note:**
> ExpressRoute supports redundant pair of cross connection. If you exceed the configured bandwidth of your ExpressRoute circuit in a cross connection, your traffic would be subjected to rate limiting within that cross connection.
>

### What's the maximum MTU supported?

ExpressRoute supports the MTU of 1,400 bytes. See [TCP/IP performance tuning for Azure VMs](../virtual-network/virtual-network-tcpip-performance-tuning.md) for tuning the MTU of your VMs.

### Which service providers are available?

See [ExpressRoute partners and locations](expressroute-locations.md) for the list of service providers and locations.

## Technical details

### What are the technical requirements for connecting my on-premises location to Azure?

See [ExpressRoute prerequisites page](expressroute-prerequisites.md) for requirements.

### Are connections to ExpressRoute redundant?

Yes. Each ExpressRoute circuit has a redundant pair of cross connections configured to provide high availability.

### Is connectivity lost if one of my ExpressRoute links fails?

You don't lose connectivity if one of the cross connections fails. A redundant connection is available to support the load of your network and provide high availability of your ExpressRoute circuit. You can additionally create a circuit in a different peering location to achieve circuit-level resilience.

### How is redundancy implemented for private peering?

All ExpressRoute Circuits include 2 redundant physical links. This design protects against loss of connectivity due to hardware failures, device maintenance, or other causes of downtime. We also recommend multi-site architectures for critical workloads. This can be achieved by deploying multiple ExpressRoute Circuits in different peering locations connected to the same virtual network or through ExpressRoute Metro. ExpressRoute Metro is a single ExpressRoute Circuit with the physical links residing in two separate locations in the same city. Multi-site deployments protect your connectivity in the case of a location becoming unavailable. 

See [here](designing-for-high-availability-with-expressroute.md) for designing for high availability and [here](designing-for-disaster-recovery-with-expressroute-privatepeering.md) for designing for disaster recovery.  

### How is redundancy implemented for Microsoft peering?

We recommend when you're using Microsoft peering to access Azure public services like Azure Storage, Azure SQL, or you're using Microsoft peering for Microsoft 365 that you implement multiple circuits in different peering locations to avoid single points of failure. You can either advertise the same prefix on both circuits and use [AS PATH prepending](expressroute-optimize-routing.md#solution-use-as-path-prepending) or advertise different prefixes to determine path from on-premises.

See [here](designing-for-high-availability-with-expressroute.md) for designing for high availability.

### How can I ensure high availability for a virtual network connected to ExpressRoute?

You can achieve high availability by connecting up to 4 ExpressRoute circuits in the same peering location to your virtual network. You can also connect up to 16 ExpressRoute circuits in different peering locations to your virtual network. For example, Singapore and Singapore2. If one ExpressRoute circuit disconnects, connectivity fails over to another ExpressRoute circuit. By default, traffic leaving your virtual network is routed based on Equal Cost Multi-path Routing (ECMP). You can use **connection weight** to prefer one circuit to another. For more information, see [Optimizing ExpressRoute Routing](expressroute-optimize-routing.md).

> **Note:**
> - Although it's possible to connect up to 16 circuits to your virtual network, you can use Equal-Cost Multipath (ECMP) across a maximum of four circuits to load-balance outgoing traffic from your virtual network.
> - Equal-Cost Multipath (ECMP) in ExpressRoute uses the Per-Flow (based on 5-tuple) load balancing method. Accordingly, traffic flow between a given source and destination host pair is guaranteed to take the same path, even if multiple ECMP paths are available.

### Which resiliency option should I choose for my ExpressRoute Circuit? 

ExpressRoute Circuits are available in 3 different resiliency tiers: standard, high, and max. The best option will depend on your specific requirements and use case, but Microsoft recommends high resiliency at minimum for all production workloads. In some locations, the creation of standard resiliency has been disabled for service providers that support high resiliency. This policy is in place to ensure that customers use the optimal service architecture – as ExpressRoute Metro (high resiliency) offers improved availability at the same cost as a standard resiliency ExpressRoute Circuit. 

For more information, see [designing for high availability with ExpressRoute](designing-for-high-availability-with-expressroute.md).

### How do I ensure that my traffic destined for Azure Public services like Azure Storage and Azure SQL on Microsoft peering is preferred on the ExpressRoute path?

You must implement the *Local Preference* attribute on your routers to ensure that the path from on-premises to Azure is always preferred on your ExpressRoute circuits.

For more information, see [BGP path selection and common router configurations](expressroute-optimize-routing.md#path-selection-for-microsoft-peering).

### <a name="onep2plink"></a>If I'm not colocated at a cloud exchange and my service provider offers point-to-point connection, do I need to order two physical connections between my on-premises network and Microsoft?

If your service provider can establish two Ethernet virtual circuits over the physical connection, you only need one physical connection. The physical connection (for example, an optical fiber) is terminated on a layer 1 (L1) device (see the image). The two Ethernet virtual circuits are tagged with different VLAN IDs, one for the primary circuit, and one for the secondary. Those VLAN IDs are in the outer 802.1Q Ethernet header. The inner 802.1Q Ethernet header (not shown) is mapped to a specific [ExpressRoute routing domain](expressroute-circuit-peerings.md).

Diagram highlighting the layer 1 (L1) Primary and Secondary virtual circuits that make up the physical connection between the switches on a Customer Site and an ExpressRoute Location.

### Can I extend one of my VLANs to Azure using ExpressRoute?

No. We don't support layer 2 connectivity extensions into Azure.

### Can I have more than one ExpressRoute circuit in my subscription?

Yes. You can have more than one ExpressRoute circuit in your subscription. The default limit is set to 50. You can contact Microsoft Support to increase the limit, if needed.

### Can I have ExpressRoute circuits from different service providers?

Yes. You can have ExpressRoute circuits with many service providers. Each ExpressRoute circuit is associated with one service provider only. 

### I see two ExpressRoute peering locations in the same metro, for example, Singapore and Singapore2. Which peering location should I choose to create my ExpressRoute circuit?
If your service provider offers ExpressRoute at both sites, you can work with your provider and pick either site to set up ExpressRoute. 

### Can I have multiple ExpressRoute circuits in the same metro? Can I link them to the same virtual network?

Yes. You can have multiple ExpressRoute circuits with the same or different service providers. If the metro has multiple ExpressRoute peering locations and the circuits are created at different peering locations, you can link them to the same virtual network. If the circuits are created at the same peering location, you can link up to four circuits to the same virtual network.

### How do I connect my virtual networks to an ExpressRoute circuit?

The basic steps are:

* Establish an ExpressRoute circuit, and have the service provider enable it.
* You or the provider must configure the BGP peerings.
* Link the virtual network to the ExpressRoute circuit.

For more information, see [ExpressRoute workflows for circuit provisioning and circuit states](expressroute-workflows.md).

### Are there connectivity boundaries for my ExpressRoute circuit?

Yes. The [ExpressRoute partners and locations](expressroute-locations.md) article provides an overview of the connectivity boundaries for an ExpressRoute circuit. Connectivity for an ExpressRoute circuit is limited to a single geopolitical region. Connectivity can be expanded to cross geopolitical regions by enabling the ExpressRoute premium feature.

### Can I link to more than one virtual network to an ExpressRoute circuit?

Yes. You can have up to 10 virtual networks connections on a standard ExpressRoute circuit, and up to 100 on a [premium ExpressRoute circuit](#expressroute-premium). 

### I have multiple Azure subscriptions that contain virtual networks. Can I connect virtual networks that are in separate subscriptions to a single ExpressRoute circuit?

Yes. You can link up to 10 virtual networks in the same subscription as the circuit or different subscriptions using a single ExpressRoute circuit. This limit can be increased by enabling the ExpressRoute premium feature. Connectivity and bandwidth charges for the dedicated circuit gets applied to the ExpressRoute circuit owner and all virtual networks share the same bandwidth.

For more information, see [sharing an ExpressRoute circuit across multiple subscriptions](expressroute-howto-linkvnet-arm.md).

<a name='i-have-multiple-azure-subscriptions-associated-to-different-azure-active-directory-tenants-or-enterprise-agreement-enrollments-can-i-connect-virtual-networks-that-are-in-separate-tenants-and-enrollments-to-a-single-expressroute-circuit-not-in-the-same-tenant-or-enrollment'></a>

### I have multiple Azure subscriptions associated to different Microsoft Entra tenants or Enterprise Agreement enrollments. Can I connect virtual networks that are in separate tenants and enrollments to a single ExpressRoute circuit not in the same tenant or enrollment?

Yes. ExpressRoute authorizations can span subscription, tenant, and enrollment boundaries with no extra configuration required. Connectivity and bandwidth charges for the dedicated circuit gets applied to the ExpressRoute circuit owner and all virtual networks share the same bandwidth.

For more information, see [sharing an ExpressRoute circuit across multiple subscriptions](expressroute-howto-linkvnet-arm.md).

### Are virtual networks connected to the same circuit isolated from each other?

No. From a routing perspective, all virtual networks linked to the same ExpressRoute circuit are part of the same routing domain and aren't isolated from each other. If you need route isolation, you need to create a separate ExpressRoute circuit.

### Can a virtual network connect to more than one ExpressRoute circuit?

Yes. You can link a single virtual network with up to four ExpressRoute circuits in the same location or up to 16 ExpressRoute circuits in different peering locations. 

### Service Endpoint Policy on the Gateway Subnet?

Configuring a Service Endpoint Policy (SEP) on the Gateway Subnet isn't advisable due to potential issues, including:
* Failures in gateway service deployment
* Challenges with scaling and service healing

### Do virtual networks connected to ExpressRoute circuits have Internet connectivity?

Yes. If you don't advertise a default route (0.0.0.0/0) or internet route prefixes through the BGP session, you can connect to the internet from a virtual network linked to an ExpressRoute circuit.

### Can Internet traffic be blocked for virtual networks connected to ExpressRoute circuits?

Yes. You can advertise a default route **0.0.0.0/0** to block all Internet connectivity to virtual machines deployed within a virtual network and route all traffic out through the ExpressRoute circuit.

> **Note:**
> If an outage or misconfiguration causes the advertised route of 0.0.0.0/0 to be withdrawn, Azure uses a [system route](../virtual-network/virtual-networks-udr-overview.md#system-routes) to resources on the connected virtual network to provide connectivity to the internet. To ensure egress traffic to the internet is blocked, place a Network Security Group on all subnets with an **Outbound Deny** rule for internet traffic.

If you advertise default routes, you force traffic to services offered over Microsoft peering (such as Azure storage and SQL DB) back to your premises. You must configure your routers to return traffic to Azure through the Microsoft peering path or over the internet. If you enable a service endpoint for the service, the traffic to the service isn't forced to your premises. The traffic remains within the Azure backbone network. To learn more about service endpoints, see [Virtual network service endpoints](../virtual-network/virtual-network-service-endpoints-overview.md?toc=%2fazure%2fexpressroute%2ftoc.json).

### Can virtual networks linked to the same ExpressRoute circuit talk to each other?

Yes. Virtual machines deployed in virtual networks connected to the same ExpressRoute circuit can communicate with each other. We recommend setting up [virtual network peering](../virtual-network/virtual-network-peering-overview.md) to facilitate this communication.

### Can I set up a site-to-site VPN connection to my virtual network along with ExpressRoute?

Yes. ExpressRoute can coexist with site-to-site VPNs. See [Configure ExpressRoute and site-to-site coexisting connections](expressroute-howto-coexist-resource-manager.md).

### How can routing between site-to-site VPN connection and ExpressRoute be established?

If you want to enable routing between your branches connected to ExpressRoute and branches connected to a site-to-site VPN connection, you need to set up [Azure Route Server](../route-server/expressroute-vpn-support.md).

### Why is there a public IP address associated with the ExpressRoute gateway on a virtual network?

The public IP address is used for internal management only, and doesn't constitute a security exposure of your virtual network.

### Are there limits on the number of routes I can advertise?

Yes. ExpressRoute accepts up to 4,000 prefixes for private peering and 200 prefixes for Microsoft peering. You can increase the limit to 10,000 routes for private peering when using ExpressRoute premium.

> **Note:**
> Advertising prefixes received over Microsoft Peering to Private Peering carries the risk of exceeding prefix limits, as Microsoft prefixes are updated monthly and can grow significantly. To manage this risk, configure Service Health to review prefix updates, implement monitoring to detect changes, and consider upgrading the SKU or summarizing routes to control the number of prefixes advertised from on-premises.

### Are there restrictions on IP ranges I can advertise over the BGP session?

We don't accept private prefixes (RFC1918) for the Microsoft peering BGP session. We accept any prefix size up to /32 prefix on both the Microsoft and the private peering. 

### What happens if the BGP route limit gets exceeded?

BGP sessions disconnect. BGP sessions are restored once the prefix count gets below the limit.

### What is the ExpressRoute BGP hold time and can it be adjusted?

The BGP hold timer is 180 seconds. The keep-alive messages are sent every 60 seconds. These values are fixed settings on the Microsoft side and can't be changed. It's possible for you to configure different timers, and the BGP session parameters are negotiated accordingly.

### Can the bandwidth of an ExpressRoute circuit be changed?

Yes, you can attempt to increase the bandwidth of your ExpressRoute circuit in the Azure portal, or by using PowerShell. If there's capacity available on the physical port on which your circuit was created, your change succeeds. 

If your change failed, it means there isn't enough capacity left on the current port and you need to create a new ExpressRoute circuit with the higher bandwidth. It could also mean that there's no other capacity at that location, in which case you can't increase the bandwidth. 

You need to follow up with your connectivity provider to ensure that they update the throttles within their networks to support the bandwidth increase. You can't, however, reduce the bandwidth of your ExpressRoute circuit. You have to create a new ExpressRoute circuit with lower bandwidth and delete the old circuit.

### How can I change the bandwidth of an ExpressRoute circuit?

You can update the bandwidth of the ExpressRoute circuit using the Azure portal, REST API, PowerShell, or Azure CLI.

### I received a notification about maintenance on my ExpressRoute circuit. What is the technical effect of this maintenance?

You should experience minimal to no disruption during maintenance if you operate your circuit in [active-active mode](designing-for-high-availability-with-expressroute.md#active-active-connections). Maintenance gets performed on the primary and secondary connections of your circuit separately. During maintenance, you might see longer AS-path prepend over one of the connections. The reason is to gracefully shift traffic from one connection to another. You must not ignore longer AS path, as it can cause asymmetric routing, resulting in a service outage. It's advisable to configure [BFD](expressroute-bfd.md) for faster BGP failover between Primary and Secondary connection in the event a BGP failure is detected during maintenance. Scheduled maintenance is performed outside of business hours in the time zone of the peering location, and you can't select a maintenance time.

### I received a notification about a software upgrade or maintenance on my ExpressRoute gateway. What is the technical effect of this maintenance?

You should experience minimal to no disruption during a software upgrade or maintenance on your gateway. The ExpressRoute gateway is composed of multiple instances and during upgrades, instances are taken offline one at a time. There might be temporarily lower network throughput to the virtual network but the gateway itself doesn't experience any downtime.

### Why are certain ports opened on my ExpressRoute gateway?

They're required for Azure infrastructure to communicate. They're protected by Azure certificates. Without proper certificates, you can't establish a connection to the ports. 

An ExpressRoute gateway is fundamentally a multi-homed device with one NIC tapping into the customer private network, and one NIC facing the public network. Azure infrastructure entities can't tap into customer private networks for compliance reasons, so they need to utilize public endpoints for infrastructure communication. The public endpoints get periodically scanned by Azure security audit.

## ExpressRoute SKU scope access

### What is the connectivity scope for different ExpressRoute circuit SKUs?

The following diagram shows the connectivity scope of different ExpressRoute circuit SKUs. In this example, your on-premises network is connected to an ExpressRoute peering site in London. With a Local SKU ExpressRoute circuit, you can connect to resources in Azure regions in the same metro as the peering site. In this case, your on-premises network can access UK South Azure resources over ExpressRoute. For more information, see [What is ExpressRoute Local?](#what-is-expressroute-local) When you configure a Standard SKU ExpressRoute circuit, connectivity to Azure resources expand to all Azure regions in a geopolitical area. As explained in the diagram, your on-premises can connect to resources in West Europe and France Central. To allow your on-premises network to access resources globally across all Azure regions, you need to configure an ExpressRoute premium SKU circuit. For more information, see [What is ExpressRoute premium?](#what-is-expressroute-premium)

Diagram of connectivity scope for different ExpressRoute circuit SKUs.

## ExpressRoute FastPath

### What happens when the IP address limits are reached?
When the limit is reached, new routes don't get programmed on FastPath, and instead traffic flows through the ExpressRoute gateway.
All other limits for the ExpressRoute gateway, the ExpressRoute circuit, and the virtual network still apply.

### Can I use Azure Firewall with FastPath?
Yes. To support traffic traversing from on-premises to Azure workloads via Azure Firewall, it should be deployed in same VNET as ExpressRoute Gateway and UDR has to be configured on the Gateway Subnet.

### How do I enable FastPath for Virtual WAN?

If you're using ExpressRoute FastPath with Azure Virtual WAN, FastPath is enabled by default for ExpressRoute direct circuits connected to Virtual WAN ExpressRoute Gateways deployed with a minimum of 5 scale units. No additional configuration is required.

For Virtual WAN-specific eligibility and supported scenarios, see [ExpressRoute FastPath in Virtual WAN](../virtual-wan/virtual-wan-expressroute-about.md#expressroute-fastpath-in-virtual-wan).

## ExpressRoute premium

### What is ExpressRoute premium?

ExpressRoute premium is a collection of the following features:

* Increased routing table limit from 4000 routes to 10,000 routes for private peering.
* Increased number of VNets and ExpressRoute Global Reach connections that can be enabled on an ExpressRoute circuit (default is 10). For more information, see the [ExpressRoute Limits](#limits) table.
* Connectivity to Microsoft 365
* Global connectivity over the Microsoft core network. You can now link a VNet in one geopolitical region with an ExpressRoute circuit in another region.<br>
    **Examples:**

    *  You can link a VNet created in Europe West to an ExpressRoute circuit created in Silicon Valley. 
    *  On the Microsoft peering, prefixes from other geopolitical regions are advertised such that you can connect to, for example, SQL Azure in Europe West from a circuit in Silicon Valley.


### <a name="limits"></a>How many VNets and ExpressRoute Global Reach connections can I enable on an ExpressRoute circuit if I enabled ExpressRoute premium?

The following tables show the ExpressRoute limits and the number of VNets and ExpressRoute Global Reach connections per ExpressRoute circuit:


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



### How do I enable ExpressRoute premium?

ExpressRoute premium features can be enabled when the feature is enabled and can be shut down by updating the circuit state. You can enable ExpressRoute premium at circuit creation time, or can call the REST API / PowerShell cmdlet.

### How do I disable ExpressRoute premium?

You can disable ExpressRoute premium by calling the REST API or PowerShell cmdlet. You must make sure to scale your connectivity needs to meet the default limits before you disable ExpressRoute premium. If your utilization scales beyond the default limits, the request to disable ExpressRoute premium fails.

### Can I pick and choose the features I want from the premium feature set?

No. You can't pick the features. We enable all features when you turn on ExpressRoute premium.

### How much does ExpressRoute premium cost?

For cost information, see [pricing details](https://azure.microsoft.com/pricing/details/expressroute/).

### Do I pay for ExpressRoute premium in addition to standard ExpressRoute charges?

Yes. ExpressRoute premium charges apply on top of ExpressRoute circuit charges and charges required by the connectivity provider.

## ExpressRoute Local

### What is ExpressRoute Local?

ExpressRoute Local is a SKU of ExpressRoute circuit, in addition to the Standard SKU and the Premium SKU. A key feature of Local is that a Local circuit at an ExpressRoute peering location gives you access only to one or two Azure regions in or near the same metro. In contrast, a Standard circuit gives you access to all Azure regions in a geopolitical area and a Premium circuit to all Azure regions globally. Specifically, with a Local SKU you can only advertise routes over Microsoft and private peering from the corresponding local region of the ExpressRoute circuit. You don't receive routes for other regions different than the defined local region.

ExpressRoute Local might not be available for an ExpressRoute Location. For peering location and supported Azure local region, see [locations and connectivity providers](expressroute-locations-providers.md#partners).

### What are the benefits of ExpressRoute Local?

While you need to pay egress data transfer for your Standard or Premium ExpressRoute circuit, you don't pay egress data transfer separately for your ExpressRoute Local circuit. In other words, the price of ExpressRoute Local includes data transfer fees. ExpressRoute Local is an economical solution if you have massive amount of data to transfer and want to have your data over a private connection to an ExpressRoute peering location near your desired Azure regions. 

### What features are available and what aren't on ExpressRoute Local?

Compared to a Standard ExpressRoute circuit, a Local circuit has the same set of features except:
* Scope of access to Azure regions is limited to one or two Azure regions in or near the same metro as the ExpressRoute peering location.
* ExpressRoute Global Reach isn't available on Local

ExpressRoute Local also has the same limits on resources as Standard.

### Where is ExpressRoute Local available and to which Azure region is each peering location mapped?

ExpressRoute Local is available at the peering locations where one or two Azure regions are close-by. It isn't available at a peering location where there's no Azure region in that state or province or country/region. See the exact mappings on [ExpressRoute Locations page](expressroute-locations-providers.md#partners).  

## ExpressRoute for Microsoft 365

Microsoft 365 was created to be accessed securely and reliably via the Internet. Because of this, we recommend ExpressRoute for specific scenarios. For information about using ExpressRoute to access Microsoft 365, visit [Azure ExpressRoute for Microsoft 365](https://learn.microsoft.com/microsoft-365/enterprise/azure-expressroute).

### How do I create an ExpressRoute circuit to connect to Microsoft 365 services?

1. Review the [ExpressRoute prerequisites page](expressroute-prerequisites.md) to make sure you meet the requirements.
2. To ensure that your connectivity needs are met, review the list of service providers and locations in the [ExpressRoute partners and locations](expressroute-locations.md) article.
3. Plan your capacity requirements by reviewing [Network planning and performance tuning for Microsoft 365](https://learn.microsoft.com/microsoft-365/enterprise/network-planning-and-performance).
4. Follow the steps listed in the workflows to set up connectivity [ExpressRoute workflows for circuit provisioning and circuit states](expressroute-workflows.md).

> **Important:**
> Make sure to enable ExpressRoute premium add-on when configuring connectivity to Microsoft 365 services.

### Can my existing ExpressRoute circuits support connectivity to Microsoft 365 services?

Yes. You can configure your existing ExpressRoute circuit to support connectivity to Microsoft 365 services. Make sure you have enough capacity to connect to Microsoft 365 services and to enable the premium add-on. [Network planning and performance tuning for Microsoft 365](https://learn.microsoft.com/microsoft-365/enterprise/network-planning-and-performance) helps you plan your connectivity needs. Also, see [Create and modify an ExpressRoute circuit](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/expressroute/expressroute-howto-circuit-classic.md).

### What Microsoft 365 services can be accessed over an ExpressRoute connection?

For a current list of services supported over ExpressRoute, see the [Microsoft 365 URLs and IP address ranges](https://learn.microsoft.com/microsoft-365/enterprise/urls-and-ip-address-ranges) page.

### How much does ExpressRoute for Microsoft 365 services cost?

Microsoft 365 services require premium add-on to be enabled. See the [pricing details page](https://azure.microsoft.com/pricing/details/expressroute/) for costs.

### What regions are ExpressRoute for Microsoft 365 supported in?

See [ExpressRoute partners and locations](expressroute-locations.md) for information.

### Can I access Microsoft 365 over the internet, even if I configured ExpressRoute for my organization?

Yes. Microsoft 365 service endpoints are reachable through the internet as ExpressRoute is configured for your network. Check with your organization's networking team if the network at your location is configured to connect to Microsoft 365 services through ExpressRoute.

### How can I plan for high availability for Microsoft 365 network traffic on Azure ExpressRoute?
See the recommendation for [High availability and failover with Azure ExpressRoute](designing-for-high-availability-with-expressroute.md)

### Can I access Office 365 US Government Community (GCC) services over an Azure US Government ExpressRoute circuit?

Yes. Office 365 GCC service endpoints are reachable through the Azure US Government ExpressRoute. However, you first need to open a support ticket on the Azure portal to provide the prefixes you intend to advertise to Microsoft. Your connectivity to Office 365 GCC services will be established after the support ticket is resolved.

### Can I have ExpressRoute Private Peering in an Azure Government environment with Virtual Network Gateways in Azure commercial cloud?

No, it's not possible to establish ExpressRoute Private peering in an Azure Government environment with a virtual network gateway in Azure commercial cloud environments. Furthermore, the scope of the ExpressRoute Government Microsoft Peering is limited to only public IPs within Azure Government regions and doesn't extend to the broader ranges of commercial public IPs.

## Route filters for Microsoft peering

### Are Azure service routes advertised when I first configure Microsoft peering?

You don't see any routes until you attach a route filter to your circuit to start prefix advertisements. For more information, see [Configure route filters for Microsoft peering](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/expressroute/how-to-routefilter-powershell.md).

### I'm unable to select Exchange Online when I'm creating a route filter for Microsoft peering. What is the reason?

When you're using route filters, anyone can turn on Microsoft peering. However, for consuming Microsoft 365 services, you still need to get authorized by Microsoft 365.

### I enabled Microsoft peering before August 1, 2017, how can I take advantage of route filters?

Your existing circuit continues advertising the prefixes for Microsoft 365. If you want to add Azure public prefixes advertisements over the same Microsoft peering, you can create a route filter, select the services you need advertised, and attach the filter to your Microsoft peering. For more information, see [Configure route filters for Microsoft peering](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/expressroute/how-to-routefilter-powershell.md).

### I have Microsoft peering at one location, now I'm trying to enable it at another location and I'm not seeing any prefixes.

* Microsoft peering of ExpressRoute circuits that were configured before August 1, 2017 will have all service prefixes advertised through Microsoft peering, even if route filters aren't defined.

* Microsoft peering of ExpressRoute circuits that are configured on or after August 1, 2017 won't have any prefixes advertised until a route filter is attached to the circuit. You see no prefixes by default.

### If I have multiple virtual networks connected to the same ExpressRoute circuit, can I use ExpressRoute for VNet-to-VNet connectivity?

VNet-to-VNet connectivity over ExpressRoute isn't recommended. Instead, configure [Virtual Network peering](../virtual-network/virtual-network-peering-overview.md?msclkid=b64a7b6ac19e11eca60d5e3e5d0764f5).

## <a name="expressRouteDirect"></a>ExpressRoute Direct

### What is ExpressRoute Direct?

ExpressRoute Direct provides customers with the ability to connect directly into Microsoft’s global network at peering locations strategically distributed across the world. ExpressRoute Direct provides dual 100 Gbps or 10-Gbps connectivity, which supports Active/Active connectivity at scale. 

### How do customers connect to ExpressRoute Direct? 

Customers need to work with their local carriers and colocation providers to get connectivity to ExpressRoute routers to take advantage of ExpressRoute Direct.

### What locations currently support ExpressRoute Direct? 

Check the availability on the [location page](expressroute-locations-providers.md). 

### What is the SLA for ExpressRoute Direct?

ExpressRoute Direct utilizes the same [enterprise-grade of ExpressRoute](https://azure.microsoft.com/support/legal/sla/expressroute/v1_3/). 

### What scenarios should customers consider with ExpressRoute Direct?  

ExpressRoute Direct provides customers with direct 100 Gbps or 10-Gbps port pairs into the Microsoft global backbone. The scenarios that provide customers with the greatest benefits include: Massive data ingestion, physical isolation for regulated markets, and dedicated capacity for burst scenario, like rendering. 

### What is the billing model for ExpressRoute Direct? 

ExpressRoute Direct is billed for the port pair at a fixed amount. Standard circuits are included at no extra charge and premium has a slight add-on charge. Egress is billed on a per circuit basis based on the zone of the peering location.

### When does billing start and stop for the ExpressRoute Direct port pairs?

ExpressRoute Direct's port pairs gets billed 45 days into the creation of the ExpressRoute Direct resource or when one or both of the links get enabled, whichever comes first. The 45-day grace period is granted to allow customers to complete the cross-connection process with the colocation provider.

You'll stop being charged for ExpressRoute Direct's port pairs after you delete the direct ports and remove the cross-connects.

### How do I request Express Route Direct Port if bandwidth isn't available at a peering location?

If bandwidth is unavailable in the target peering location, open a [support request in the Azure portal](https://portal.azure.com/#view/Microsoft_Azure_Support/HelpAndSupportBlade/%7E/overview) and select the ExpressRoute Direct support topic.


## <a name="globalreach"></a>Global Reach

### What is ExpressRoute Global Reach?

ExpressRoute Global Reach is an Azure service that connects your on-premises networks via the ExpressRoute service through Microsoft's global network. For example, if you have a private data center in California connected to ExpressRoute in Silicon Valley and another private data center in Texas connected to ExpressRoute in Dallas, with ExpressRoute Global Reach, you can connect your private data centers together through the two ExpressRoute connections and your cross data center traffic traverses through Microsoft's network backbone.

### How do I enable or disable ExpressRoute Global Reach?

You enable ExpressRoute Global Reach by connecting your ExpressRoute circuits together. You disable the feature by disconnecting the circuits. See the [configuration](expressroute-howto-set-global-reach.md).

### Do I need ExpressRoute Premium for ExpressRoute Global Reach?

If your ExpressRoute circuits are in the same geopolitical region, you don't need ExpressRoute Premium to connect them together. If two ExpressRoute circuits are in different geopolitical regions, you need ExpressRoute Premium for both circuits in order to enable connectivity between them. 

### What are ExpressRoute Global Reach pricing charges?

ExpressRoute enables connectivity from your on-premises network to Microsoft cloud services. ExpressRoute Global Reach enables connectivity between your own on-premises networks through your existing ExpressRoute circuits, using Microsoft's global network. ExpressRoute Global Reach is billed separately from the existing ExpressRoute service. There's an Add-on fee for enabling this feature on each ExpressRoute circuit. Traffic between your on-premises networks enabled by ExpressRoute Global Reach gets billed for an egress rate at the source and for an ingress rate at the destination. The rates are based on the zone at which the circuits are located.

### Where is ExpressRoute Global Reach supported?

ExpressRoute Global Reach is supported in [select countries/regions or places](expressroute-global-reach.md). The ExpressRoute circuits must be created at the peering locations in those countries/regions or places.

### I have more than two on-premises networks, each connected to an ExpressRoute circuit. Can I enable ExpressRoute Global Reach to connect all of my on-premises networks together?

Yes, you can, as long as the circuits are in the supported countries/regions. You need to connect two ExpressRoute circuits at a time. To create a fully meshed network, you need to enumerate all circuit pairs and repeat the configuration. 

### Can I enable ExpressRoute Global Reach between two ExpressRoute circuits at the same peering location?

No. The two circuits must be from different peering locations. If a metro in a supported country/region has more than one ExpressRoute peering location, you can connect together the ExpressRoute circuits created at different peering locations in that metro. 

### If ExpressRoute Global Reach gets enabled between circuit A and circuit B, and between circuit B and circuit C, will my on-premises networks connected to circuit A and circuit C talk to each other via Microsoft's network?

No. To enable connectivity between any two of your on-premises networks, you must connect the corresponding ExpressRoute circuits explicitly. In the above example, you must connect circuit A and circuit C. 

### What is the network throughput I can expect between my on-premises networks after I enable ExpressRoute Global Reach?

The network throughput between your on-premises networks, enabled by ExpressRoute Global Reach, gets capped by the smaller of the two ExpressRoute circuits. Premises-to-Azure traffic and premises-to-premises traffic share the same circuit and are subject to the same bandwidth cap. 

### With ExpressRoute Global Reach, what are the limits on the number of routes I can advertise and the number of routes I receive?

The number of routes you can advertise to Microsoft on Azure private peering remains at 4000 on a Standard circuit or 10000 on a Premium circuit. The number of routes you receive from Microsoft on Azure private peering is the sum of the routes of your Azure virtual networks and the routes from your other on-premises networks connected through ExpressRoute Global Reach. Make sure you set an appropriate maximum prefix limit on your on-premises router.

### Can I send IPv6 traffic over an ExpressRoute Global Reach connection?

IPv6 is supported for Global Reach. See [Enable Global Reach](expressroute-global-reach.md) to learn more. 

### What is the SLA for ExpressRoute Global Reach?

ExpressRoute Global Reach provides the same [availability SLA](https://azure.microsoft.com/support/legal/sla/expressroute/v1_3/) as the regular ExpressRoute service.


## ExpressRoute Traffic Collector

### Does ExpressRoute Traffic Collector store customer data?

ExpressRoute Traffic Collector does not store any customer data.

### What is the sampling rate used by ExpressRoute Traffic Collector?

ExpressRoute Traffic Collector uses a sampling rate of 1:4096, which means 1 out of 4,096 packets are captured.

### How many flows can ExpressRoute Traffic Collector handle?

ExpressRoute Traffic Collector can handle up to 300,000 flows a minute. In the event this limit is reached, excess flows are dropped. For more information, see [count of flows metric](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/expressroute/expressroute-monitoring-metrics-alerts.md#count-of-flow-records-processed---split-by-instances-or-expressroute-circuit) on a circuit.

### Does ExpressRoute Traffic Collector support Virtual WAN?

Yes, you can use ExpressRoute Traffic Collector with ExpressRoute circuits used in a Virtual WAN deployment. 

### Does ExpressRoute Traffic Collector support ExpressRoute provider ports?

Yes. ExpressRoute Traffic Collector supports both ExpressRoute Provider and ExpressRoute Direct circuits with a bandwidth of 1 Gbps or greater.

### What is the effect of maintenance on flow logging?

You should experience minimal to no disruption during maintenance on your ExpressRoute Traffic Collector. ExpressRoute Traffic Collector has multiple instances on different update domains; during an upgrade, instances are taken offline one at a time. While you might experience lower ingestion of sample flows into the Log Analytics workspace, the ExpressRoute Traffic Collector itself doesn't experience any downtime. Loss of sampled flows during maintenance shouldn't affect network traffic analysis, when sampled data is aggregated over a longer time frame.

### Does ExpressRoute Traffic Collector support availability zones?

ExpressRoute Traffic Collector deployment by default has availability zones enabled in the regions where it is available. For information about region availability, see [Availability zones supported regions](https://learn.microsoft.com/azure/reliability/availability-zones-region-support). 

### How should I incorporate ExpressRoute Traffic Collector into my disaster recovery plan?

You can associate a single ExpressRoute Circuit with multiple ExpressRoute Traffic Collectors deployed in different Azure region within a given geo-political region. It is recommended that you associate your ExpressRoute Circuit with multiple ExpressRoute Traffic Collectors as part of your disaster recovery and high availability plan.

### Will my ExpressRoute Circuit experience any downtime while configuring ExpressRoute Traffic Collector?

No. ExpressRoute Traffic Collector setup does not cause any ExpressRoute Circuit downtime.

### Does ExpressRoute Traffic Collector need to be deployed to the same subscription as my ExpressRoute Circuit?

No. ExpressRoute Traffic Collector can be deployed to a different subscription from your ExpressRoute Circuit. However, ExpressRoute Traffic Collector must be deployed to the same geopolitical region as the ExpressRoute Circuit peering location.

## <a name="customer-controlled"></a>Customer-controlled gateway maintenance


### Which services are included in maintenance configuration for the Network Gateways scope? 

The Network Gateways scope includes gateway resources in networking services including below resource types:

* Virtual network gateway in the ExpressRoute service
* Virtual network gateway in the VPN Gateway service
* VPN gateway (site-to-site) in the Azure Virtual WAN service
* VPN gateway (User VPN or point-to-site) in the Azure Virtual WAN service
* ExpressRoute gateway in the Virtual WAN service

### Which maintenance does customer-controlled maintenance support?

Azure services go through periodic maintenance updates to improve functionality, reliability, performance, and security. After you configure a maintenance window for your resources, guest OS maintenance and service maintenance are performed during that window. Customer-controlled maintenance doesn't cover host updates (beyond the host updates for Power, for example) and critical security updates.

### Can I get advanced notification of the maintenance?

At this time, you can't get advanced notification for the maintenance of Network Gateway resources.

### Can I configure a maintenance window shorter than five hours?

At this time, you need to configure a minimum of a five-hour window in your preferred time zone.

### Can I configure a maintenance window other than a daily schedule?

At this time, you need to configure a daily maintenance window.

### Are there cases where I can't control certain updates?

Customer-controlled maintenance supports guest OS and service updates. These updates account for most of the maintenance items that cause concern for customers. Some other types of updates, including host updates, are outside the scope of customer-controlled maintenance.

If a high-severity security issue might endanger customers, Azure might need to override customer control of the maintenance window and push a change. These changes are rare occurrences that we use only in extreme cases.

### Do maintenance configuration resources need to be in the same region as the gateway resource?

Yes.

### Which gateway SKUs can I configure to use customer-controlled maintenance?

All the Azure VPN Gateway SKUs (except the Basic SKU) can be configured to use customer-controlled maintenance.

### How long does it take for a maintenance configuration policy to become effective after it's assigned to the gateway resource?

It might take up to 24 hours for Network Gateways to follow the maintenance schedule after the maintenance policy is associated with the gateway resource.  

### Are there any limitations on using customer-controlled maintenance based on the Basic SKU public IP address?

Yes. Customer-controlled maintenance doesn't work for resources that use Basic SKU public IP addresses, except in the case of service updates. For these gateways, guest OS maintenance does *not* follow the customer-controlled maintenance schedule because of infrastructure limitations.

### How should I plan maintenance windows when using VPN and ExpressRoute in a coexistence scenario?

When you work with VPN and ExpressRoute in a coexistence scenario or whenever you have resources that act as backups, we recommend setting up separate maintenance windows. This approach ensures that maintenance doesn't affect your backup resources at the same time.

### I scheduled a maintenance window for a future date for one of my resources. Are maintenance activities paused on this resource until then?

No, maintenance activities aren't paused on your resource during the period before the scheduled maintenance window. For the days not covered in your maintenance schedule, maintenance continues as usual on the resource.


### How do I find out more about customer-controlled gateway maintenance?

For more information, see the [ExpressRoute customer-controlled gateway maintenance](customer-controlled-gateway-maintenance.md) article.

## Privacy

### Does the ExpressRoute service store customer data?

No.
