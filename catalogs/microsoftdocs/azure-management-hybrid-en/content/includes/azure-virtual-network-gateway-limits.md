---
 ms.topic: include
 author: cherylmc
 ms.service: azure-vpn-gateway
 ms.date: 01/04/2024
 ms.author: cherylmc

---

| Resource | Limit |
| --- | --- |
| VNet Address Prefixes | 600 per VPN gateway |
| Aggregate BGP routes | 4,000 per VPN gateway |
| Local Network Gateway address prefixes | 1000 per local network gateway |
| S2S connections | Limit depends on the gateway SKU. See the [Limits by gateway SKU](#limits-by-gateway-sku) table. |
| P2S connections | Limit depends on the gateway SKU. See the [Limits by gateway SKU](#limits-by-gateway-sku) table. |
| P2S route limit - IKEv2 | 256 for non-Windows **/** 25 for Windows |
| P2S route limit - OpenVPN | 1000 |
| Max. flows | 500K inbound and 500K outbound for VpnGw1-5/AZ |
| Traffic Selector Policies | 100 |
| Custom APIPA BGP addresses | 32 |
| Supported number of VMs in the virtual network | Limit depends on the gateway SKU. See the [Limits by gateway SKU](#limits-by-gateway-sku) table. |

#### Limits by gateway SKU


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


VpnGw1~5 are slated for migration and should not be used to create new VPN gateways. For more information, see [VPN Gateway SKU consolidation and migration](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/vpn-gateway/gateway-sku-consolidation.md).

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


For more information about gateway SKUs and limits, see [About gateway SKUs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/vpn-gateway/about-gateway-skus.md#benchmark).

#### Gateway performance limits

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
