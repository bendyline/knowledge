---
 title: include file
 author: duongau
 ms.service: azure-vpn-gateway
 ms.date: 09/26/2023
 ms.author: duau
---
This FAQ applies to P2S connections that use the classic deployment model.

### What client operating systems can I use with point-to-site?

The following client operating systems are supported:

* Windows 7 (32-bit and 64-bit)
* Windows Server 2008 R2 (64-bit only)
* Windows 8 (32-bit and 64-bit)
* Windows 8.1 (32-bit and 64-bit)
* Windows Server 2012 (64-bit only)
* Windows Server 2012 R2 (64-bit only)
* Windows 10
* Windows 11

### Can I use any software VPN client that supports SSTP for point-to-site?

No. Support is limited only to the listed Windows operating system versions.

### How many VPN client endpoints can exist in my point-to-site configuration?

The number of VPN client endpoints depends on your gateway sku and protocol.

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


### Can I use my own internal PKI root CA for point-to-site connectivity?

Yes. Previously, only self-signed root certificates could be used. You can still upload up to 20 root certificates.

### Can I traverse proxies and firewalls by using point-to-site?

Yes. We use Secure Socket Tunneling Protocol (SSTP) to tunnel through firewalls. This tunnel appears as an HTTPS connection.

### If I restart a client computer configured for point-to-site, will the VPN automatically reconnect?

By default, the client computer won't reestablish the VPN connection automatically.

### Does point-to-site support auto reconnect and DDNS on the VPN clients?

No. Auto reconnect and DDNS are currently not supported in point-to-site VPNs.

### Can I have Site-to-Site and point-to-site configurations for the same virtual network?

Yes. Both solutions will work if you have a RouteBased VPN type for your gateway. For the classic deployment model, you need a dynamic gateway. We don't support point-to-site for static routing VPN gateways or gateways that use the **-VpnType PolicyBased** cmdlet.

### Can I configure a point-to-site client to connect to multiple virtual networks at the same time?

Yes. However, the virtual networks can't have overlapping IP prefixes and the point-to-site address spaces must not overlap between the virtual networks.

### How much throughput can I expect through Site-to-Site or point-to-site connections?

It's difficult to maintain the exact throughput of the VPN tunnels. IPsec and SSTP are crypto-heavy VPN protocols. Throughput is also limited by the latency and bandwidth between your premises and the internet.
