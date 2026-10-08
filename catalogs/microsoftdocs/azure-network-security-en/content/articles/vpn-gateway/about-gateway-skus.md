---
title: 'About gateway SKUs'
description: Learn about VPN Gateway SKUs.
author: duongau
ms.service: azure-vpn-gateway
ms.topic: concept-article
ms.date: 06/11/2026
ms.author: duau

# Customer intent: As a cloud network architect, I want to choose the appropriate VPN Gateway SKU, so that I can optimize the performance and reliability of our network connections based on workload requirements and feature support.
---
# About gateway SKUs

When you create a VPN Gateway virtual network gateway, you specify the gateway SKU that you want to use. This article describes the factors that you should take into consideration when selecting a gateway SKU. If you're looking for information about ExpressRoute gateway SKUs, see [Virtual network gateways for ExpressRoute](../expressroute/expressroute-about-virtual-network-gateways.md). For Virtual WAN gateways, see [Virtual WAN gateway settings](../virtual-wan/gateway-settings.md).

When you configure a virtual network gateway SKU, select the SKU that satisfies your requirements based on the types of workloads, throughput, features, and SLAs. The following sections show the relevant information that you should use when deciding.

> **Note:**
> We're simplifying our VPN Gateway SKU portfolio and will be transitioning all non availability zone (AZ) supported SKUs to AZ supported SKUs. For more information and timelines, see [VPN Gateway SKU consolidation and migration](gateway-sku-consolidation.md).

## <a name="benchmark"></a>Gateway SKUs by tunnel, connection, and throughput


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

**Additional information**

* When you create a new VPN gateway, you must use a Standard SKU public IP address. 
  
* The Basic gateway SKU doesn't support IPv6 and can only be configured using PowerShell or Azure CLI. Additionally, the Basic gateway SKU doesn't support RADIUS authentication.

* These connection limits are separate. For example, you can have 128 SSTP connections and also 250 IKEv2 connections on a VpnGw1AZ SKU.

* If you have numerous P2S connections, it can negatively impact your S2S connections. The Aggregate Throughput Benchmarks were tested by maximizing a combination of S2S and P2S connections. A single P2S or S2S connection can have a much lower throughput.

* See the [Pricing](https://azure.microsoft.com/pricing/details/vpn-gateway) page for pricing information.

* See the [SLA](https://azure.microsoft.com/support/legal/sla/vpn-gateway) page for SLA (Service Level Agreement) information.

* All benchmarks aren't guaranteed due to Internet traffic conditions and your application behaviors.

## <a name="performance"></a>Gateway SKUs by performance

The table in this section lists the results of performance tests for VpnGw SKUs. A VPN tunnel connects to a VPN gateway instance. Each instance throughput is mentioned in the throughput table in the previous section and is available aggregated across all tunnels connecting to that instance. The table shows the observed bandwidth and packets per second throughput per tunnel for the different gateway SKUs. All testing was performed between gateways (endpoints) within Azure across different regions with 100 connections and under standard load conditions. We used publicly available iPerf and CTSTraffic tools to measure performances for site-to-site connections

* The best performance was obtained when we used the GCMAES256 algorithm for both IPsec Encryption and Integrity.
* Average performance was obtained when using AES256 for IPsec Encryption and SHA256 for Integrity.
* The lowest performance was obtained when we used DES3 for IPsec Encryption and SHA256 for Integrity.

| **Generation** | **SKU** | **Algorithms<br>used** | **Throughput<br>observed per tunnel** | **Packets per second per tunnel<br>observed** |
| --- | --- | --- | --- | --- |
| **Generation1** | **VpnGw1** | GCMAES256<br>AES256 & SHA256<br>DES3 & SHA256 | 650 Mbps<br>500 Mbps<br>130 Mbps | 62,000<br>47,000<br>12,000 |
| **Generation1** | **VpnGw2** | GCMAES256<br>AES256 & SHA256<br>DES3 & SHA256 | 1.2 Gbps<br>650 Mbps<br>140 Mbps | 100,000<br>61,000<br>13,000 |
| **Generation1** | **VpnGw3** | GCMAES256<br>AES256 & SHA256<br>DES3 & SHA256 | 1.25 Gbps<br>700 Mbps<br>140 Mbps | 120,000<br>66,000<br>13,000 |
| **Generation1** | **VpnGw1AZ** | GCMAES256<br>AES256 & SHA256<br>DES3 & SHA256 | 650 Mbps<br>500 Mbps<br>130 Mbps | 62,000<br>47,000<br>12,000 |
| **Generation1** | **VpnGw2AZ** | GCMAES256<br>AES256 & SHA256<br>DES3 & SHA256 | 1.2 Gbps<br>650 Mbps<br>140 Mbps | 110,000<br>61,000<br>13,000 |
| **Generation1** | **VpnGw3AZ** | GCMAES256<br>AES256 & SHA256<br>DES3 & SHA256 | 1.25 Gbps<br>700 Mbps<br>140 Mbps | 120,000<br>66,000<br>13,000 |
|  |  |
| **Generation2** | **VpnGw2** | GCMAES256<br>AES256 & SHA256<br>DES3 & SHA256 | 1.25 Gbps<br>550 Mbps<br>130 Mbps | 120,000<br>52,000<br>12,000 |
| **Generation2** | **VpnGw3** | GCMAES256<br>AES256 & SHA256<br>DES3 & SHA256 | 1.5 Gbps<br>700 Mbps<br>140 Mbps | 140,000<br>66,000<br>13,000 |
| **Generation2** | **VpnGw4** | GCMAES256<br>AES256 & SHA256<br>DES3 & SHA256 | 2.3 Gbps<br>700 Mbps<br>140 Mbps | 220,000<br>66,000<br>13,000 |
| **Generation2** | **VpnGw5** | GCMAES256<br>AES256 & SHA256<br>DES3 & SHA256 | 2.3 Gbps<br>700 Mbps<br>140 Mbps | 220,000<br>66,000<br>13,000 |
| **Generation2** | **VpnGw2AZ** | GCMAES256<br>AES256 & SHA256<br>DES3 & SHA256 | 1.25 Gbps<br>550 Mbps<br>130 Mbps | 120,000<br>52,000<br>12,000 |
| **Generation2** | **VpnGw3AZ** | GCMAES256<br>AES256 & SHA256<br>DES3 & SHA256 | 1.5 Gbps<br>700 Mbps<br>140 Mbps | 140,000<br>66,000<br>13,000 |
| **Generation2** | **VpnGw4AZ** | GCMAES256<br>AES256 & SHA256<br>DES3 & SHA256 | 2.3 Gbps<br>700 Mbps<br>140 Mbps | 220,000<br>66,000<br>13,000 |
| **Generation2** | **VpnGw5AZ** | GCMAES256<br>AES256 & SHA256<br>DES3 & SHA256 | 2.3 Gbps<br>700 Mbps<br>140 Mbps | 220,000<br>66,000<br>13,000 |


## <a name="feature"></a>Gateway SKUs by feature set

| **SKU** | **Features** |
| --- | --- |
| **Basic** (**) | **Route-based VPN**: 10 tunnels for S2S/connections; no RADIUS authentication for P2S; no IKEv2 for P2S<br>**Policy-based VPN**: (IKEv1): 1 S2S/connection tunnel; no P2S |
| **All Generation1 and Generation2 SKUs except Basic** | **Route-based VPN**: up to 100 tunnels (*), P2S, BGP, active-active, custom IPsec/IKE policy, ExpressRoute/VPN coexistence |

(*) You can configure "PolicyBasedTrafficSelectors" to connect a route-based VPN gateway to multiple on-premises policy-based firewall devices. Refer to [Connect VPN gateways to multiple on-premises policy-based VPN devices using PowerShell](vpn-gateway-connect-multiple-policybased-rm-ps.md) for details.

(\*\*) The Basic SKU has certain feature and performance limitations, limited support and shouldn't be used for production purposes. Verify that the feature that you need is supported before you use the Basic SKU. The Basic SKU doesn't support IPv6 or RADIUS authentication.

## <a name="workloads"></a>Gateway SKUs - Production vs. Dev-Test workloads

Due to the differences in SLAs and feature sets, we recommend the following SKUs for production vs. dev-test:

| **Workload** | **SKUs** |
| --- | --- |
| **Production, critical workloads** | All Generation1 and Generation2 SKUs, except Basic |
| **Dev-test or proof of concept** | Basic (**) |

(\*\*) The Basic SKU has certain feature and performance limitations, limited support and shouldn't be used for production purposes. Verify that the feature that you need is supported before you use the Basic SKU. The Basic SKU doesn't support IPv6 or RADIUS authentication.

If you're using the old SKUs (legacy), the production SKU recommendations are Standard and HighPerformance. For information and instructions for old SKUs, see [Gateway SKUs (legacy)](vpn-gateway-about-skus-legacy.md).

## About legacy SKUs

For information about working with the legacy gateway SKUs (Standard and High Performance), including SKU deprecation, see [Managing legacy gateway SKUs](vpn-gateway-about-skus-legacy.md).

## Specify a SKU

You specify the gateway SKU when you create your VPN Gateway. See the following article for steps:

* [Azure portal](tutorial-create-gateway-portal.md)
* [PowerShell - Basic SKU](create-gateway-basic-sku-powershell.md)
* [PowerShell](create-gateway-powershell.md)
* [Azure CLI](create-routebased-vpn-gateway-cli.md)

## <a name="resizechange"></a>Upgrade a SKU

For most VPN gateways, you can upgrade a gateway SKU. For more information, see [Upgrade a VPN Gateway SKU](gateway-sku-upgrade.md).

> **Note:**
> If you're working with a legacy gateway SKU (Standard and High Performance), see [Managing Legacy gateway SKUs](vpn-gateway-about-skus-legacy.md).

## Next steps

For more information about available connection configurations, see [About VPN Gateway](vpn-gateway-about-vpngateways.md).
