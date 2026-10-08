---
title: Azure VPN Gateway FAQ
description: Get answers to frequently asked questions about VPN Gateway connections and configuration settings.
author: duongau
ms.service: azure-vpn-gateway
ms.topic: concept-article
ms.date: 06/04/2026
ms.author: duau
# Customer intent: As a network administrator, I want to understand the configuration options and limitations of Azure VPN Gateway, so that I can effectively manage cross-premises connections and optimize my organization’s hybrid network architecture.
---

# VPN Gateway FAQ

This article answers frequently asked questions about Azure VPN Gateway cross-premises connections, hybrid configuration connections, and virtual network (VNet) gateways. It contains comprehensive information about point-to-site (P2S), site-to-site (S2S), and VNet-to-VNet configuration settings, including the Internet Protocol Security (IPsec) and Internet Key Exchange (IKE) protocols.

## <a name="connecting"></a>Connecting to virtual networks

### Can I connect virtual networks in different Azure regions?

Yes. There's no region constraint. One virtual network can connect to another virtual network in the same Azure region or in a different region.

### Can I connect virtual networks in different subscriptions?

Yes.

### Can I specify private DNS servers in my VNet when configuring a VPN gateway?

If you specify a Domain Name System (DNS) server or servers when you create your virtual network, the virtual private network (VPN) gateway uses those DNS servers. Verify that your specified DNS servers can resolve the domain names needed for Azure.

### Can I connect to multiple sites from a single virtual network?

You can connect to multiple sites by using Windows PowerShell and the Azure REST APIs. See the [Multi-site and VNet-to-VNet connectivity](#V2VMulti) FAQ section.

### Is there an additional cost for setting up a VPN gateway as active-active?

No. However, costs for any additional public IPs are charged accordingly. See [IP address pricing](https://azure.microsoft.com/pricing/details/ip-addresses/).

### What are my cross-premises connection options?

Azure VPN Gateway supports the following cross-premises gateway connections:

* **Site-to-site**: VPN connection over IPsec (IKEv1 and IKEv2). This type of connection requires a VPN device or Windows Server Routing and Remote Access. For more information, see [Create a site-to-site VPN connection in the Azure portal](tutorial-site-to-site-portal.md).
* **Point-to-site**: VPN connection over Secure Socket Tunneling Protocol (SSTP) or IKEv2. This connection doesn't require a VPN device. For more information, see [Configure server settings for point-to-site VPN Gateway certificate authentication](point-to-site-certificate-gateway.md).
* **VNet-to-VNet**: This type of connection is the same as a site-to-site configuration. VNet-to-VNet is a VPN connection over IPsec (IKEv2). It doesn't require a VPN device. For more information, see [Configure a VNet-to-VNet VPN gateway connection](vpn-gateway-howto-vnet-vnet-resource-manager-portal.md).
* **Azure ExpressRoute**: ExpressRoute is a private connection to Azure from your wide area network (WAN), not a VPN connection over the public internet. For more information, see the [ExpressRoute technical overview](../expressroute/expressroute-introduction.md) and the [ExpressRoute FAQ](../expressroute/expressroute-faqs.md).

For more information about VPN gateway connections, see [What is Azure VPN Gateway?](vpn-gateway-about-vpngateways.md)

### What is the difference between site-to-site and point-to-site connections?

* *Site-to-site* (IPsec/IKE VPN tunnel) configurations are between your on-premises location and Azure. You can connect from any of your computers located on your premises to any virtual machine (VM) or role instance within your virtual network, depending on how you choose to configure routing and permissions. It's a great option for an always-available cross-premises connection and is well suited for hybrid configurations.

  This type of connection relies on an IPsec VPN appliance (hardware device or soft appliance). The appliance must be deployed at the edge of your network. To create this type of connection, you must have an externally facing IPv4 address.

* *Point-to-site* (VPN over SSTP) configurations let you connect from a single computer from anywhere to anything located in your virtual network. It uses the Windows built-in VPN client.

  As part of the point-to-site configuration, you install a certificate and a VPN client configuration package. The package contains the settings that allow your computer to connect to any virtual machine or role instance within the virtual network.
  
  This configuration is useful when you want to connect to a virtual network but aren't located on-premises. It's also a good option when you don't have access to VPN hardware or an externally facing IPv4 address, both of which are required for a site-to-site connection.

You can configure your virtual network to use both site-to-site and point-to-site concurrently, as long as you create your site-to-site connection by using a route-based VPN type for your gateway. Route-based VPN types are called *dynamic gateways* in the classic deployment model.

### Does a misconfiguration of custom DNS break the normal operation of a VPN gateway?

For normal functioning, the VPN gateway must establish a secure connection with the Azure control plane, facilitated through public IP addresses. This connection relies on resolving communication endpoints via public URLs. By default, Azure VNets use the built-in Azure DNS service (168.63.129.16) to resolve these public URLs. This default behavior helps ensure seamless communication between the VPN gateway and the Azure control plane.

When you're implementing a custom DNS within a VNet, it's crucial to configure a DNS forwarder that points to Azure DNS (168.63.129.16). This configuration helps maintain uninterrupted communication between the VPN gateway and the control plane. Failure to set up a DNS forwarder to Azure DNS can prevent Microsoft from performing operations and maintenance on the VPN gateway, which poses a security risk.

To help ensure proper functionality and healthy state for your VPN gateway, consider one of the following DNS configurations in the VNet:

* Revert to the Azure DNS default by removing the custom DNS within the VNet settings (recommended configuration).
* Add in your custom DNS configuration a DNS forwarder that points to Azure DNS (168.63.129.16). Depending on the specific rules and nature of your custom DNS, this setup might not resolve the issue as expected.

When configuring the Azure DNS Private Resolver's forwarding rule in the VNet where the VPN Gateway is deployed, if you include a wildcard in the DNS forwarding ruleset, ensure that the forwarding destination IP points to the built-in Azure DNS service (168.63.129.16) to resolve public URLs.

### Can a private DNS zone linked to a virtual network affect the operation of an Azure VPN gateway?

Yes. Azure VPN Gateway requires access to Azure Blob Storage endpoints for certain service operations. If you link the privatelink.blob.core.windows.net private DNS zone to the gateway virtual network, DNS queries for Blob Storage are evaluated against that zone. When the required storage account doesn't have a private endpoint or a matching private DNS record in the zone, the query can return **NXDOMAIN** instead of resolving the storage account's public endpoint. As a result, the VPN gateway might be unable to reach the required Blob Storage endpoint, which can affect its normal operation.
To prevent this issue, enable [Fallback to internet for Azure Private DNS zones](https://learn.microsoft.com/azure/dns/private-dns-fallback) on the virtual network link for the **privatelink.blob.core.windows.net** private DNS zone. When the **NxDomainRedirect** resolution policy is enabled on a virtual network link, the Azure recursive resolver retries the query. This allows the VPN gateway to resolve and access the required public Blob Storage endpoint when no private DNS record is available in private DNS Zone.

### Can two VPN clients connected in point-to-site to the same VPN gateway communicate?

Yes. VPN clients connected in point-to-site to the same VPN gateway can communicate with each other.

When two VPN clients are connected to the same point-to-site VPN gateway, the gateway can automatically route traffic between them by determining the IP address that each client is assigned from the address pool.

### Could a potential vulnerability known as "tunnel vision" affect point-to-site VPN connections?

Microsoft is aware of reports about a network technique that bypasses VPN encapsulation. This is an industry-wide issue. It affects any operating system that implements a Dynamic Host Configuration Protocol (DHCP) client according to its RFC specification and has support for DHCP option 121 routes, including Windows.

As the research notes, mitigations include running the VPN inside a VM that obtains a lease from a virtualized DHCP server to prevent the local network's DHCP server from installing routes altogether. You can find more information about this vulnerability in the [NIST National Vulnerability Database](https://nvd.nist.gov/vuln/detail/CVE-2024-3661).

## <a name="privacy"></a>Privacy

### Does the VPN service store or process customer data?

No.

## <a name="gateways"></a>Virtual network gateways

### Is a VPN gateway a virtual network gateway?

A VPN gateway is a type of virtual network gateway. A VPN gateway sends encrypted traffic between your virtual network and your on-premises location across a public connection. You can also use a VPN gateway to send traffic between virtual networks. When you create a VPN gateway, you use the `-GatewayType` value `Vpn`. For more information, see [About VPN Gateway configuration settings](vpn-gateway-about-vpn-gateway-settings.md).

### Why can't I specify policy-based and route-based VPN types?

As of October 1, 2023, you can't create a policy-based VPN gateway through the Azure portal. All new VPN gateways are automatically created as route-based. If you already have a policy-based gateway, you don't need to upgrade your gateway to route-based. You can use Azure PowerShell or the Azure CLI to create the policy-based gateways.

Previously, the older gateway product tiers (SKUs) didn't support IKEv1 for route-based gateways. Now, most of the current gateway SKUs support both IKEv1 and IKEv2.

| Gateway VPN type | Gateway SKU | IKE versions supported |
| --- | --- | --- |
| Policy-based gateway | Basic | IKEv1 |
| Route-based gateway | Basic | IKEv2 |
| Route-based gateway | VpnGw1AZ, VpnGw2AZ, VpnGw3AZ, VpnGw4AZ, VpnGw5AZ | IKEv1 and IKEv2 |

### Can I update my policy-based VPN gateway to route-based?

No. A gateway type can't be changed from policy-based to route-based, or from route-based to policy-based. To change a gateway type, you must delete and re-create the gateway by taking the following steps. This process takes about 60 minutes. When you create the new gateway, you can't retain the IP address of the original gateway.

1. Delete any connections associated with the gateway.
1. Delete the gateway by using one of the following articles:

   * [Azure portal](vpn-gateway-delete-vnet-gateway-portal.md)
   * [Azure PowerShell](vpn-gateway-delete-vnet-gateway-powershell.md)
   * [Azure PowerShell - classic](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/vpn-gateway/vpn-gateway-delete-vnet-gateway-classic-powershell.md)
1. Create a new gateway by using the gateway type that you want, and then complete the VPN setup. For steps, see the [site-to-site tutorial](tutorial-site-to-site-portal.md#VNetGateway).

### Can I specify my own policy-based traffic selectors?

Yes, you can define traffic selectors by using the `trafficSelectorPolicies` attribute on a connection via the [New-AzIpsecTrafficSelectorPolicy](https://learn.microsoft.com/powershell/module/az.network/new-azipsectrafficselectorpolicy) Azure PowerShell command. For the specified traffic selector to take effect, be sure to [enable policy-based traffic selectors](vpn-gateway-connect-multiple-policybased-rm-ps.md#enablepolicybased).

The custom-configured traffic selectors are proposed only when a VPN gateway initiates the connection. A VPN gateway accepts any traffic selectors proposed by a remote gateway (on-premises VPN device). This behavior is consistent among all connection modes (`Default`, `InitiatorOnly`, and `ResponderOnly`).

### Do I need a gateway subnet?

Yes. The gateway subnet contains the IP addresses that the virtual network gateway services use. You need to create a gateway subnet for your virtual network in order to configure a virtual network gateway.

All gateway subnets must be named `GatewaySubnet` to work properly. Don't name your gateway subnet something else. And don't deploy VMs or anything else to the gateway subnet.

When you create the gateway subnet, you specify the number of IP addresses that the subnet contains. The IP addresses in the gateway subnet are allocated to the gateway service.

Some configurations require more IP addresses to be allocated to the gateway services than do others. Make sure that your gateway subnet contains enough IP addresses to accommodate future growth and possible new connection configurations.

Although you can create a gateway subnet as small as /29, we recommend that you create a gateway subnet of /27 or larger (/27, /26, /25, and so on). Verify that your existing gateway subnet meets the requirements for the configuration that you want to create.

### Can I deploy virtual machines or role instances to my gateway subnet?

No.

### Can I get my VPN gateway IP address before I create it?

Azure Standard SKU public IP resources must use a static allocation method. You have the public IP address for your VPN gateway as soon as you create the Standard SKU public IP resource that you intend to use for it.

### Can I request a static public IP address for my VPN gateway?

Standard SKU public IP address resources use a static allocation method. Going forward, you must use a Standard SKU public IP address when you create a new VPN gateway.

For non-zone-redundant and non-zonal gateways that were previously created (gateway SKUs that don't have *AZ* in the name), dynamic IP address assignment is supported but is being phased out. When you use a dynamic IP address, the IP address doesn't change after it's assigned to your VPN gateway. The only time that the VPN gateway IP address changes is when the gateway is deleted and then re-created. The public IP address doesn't change when you upgrade (resize), reset, or complete other internal maintenance and upgrades of your VPN gateway.

### How does the retirement of Basic SKU public IP addresses affect my VPN gateways?

Basic SKU public IP addresses are being phased out. Going forward, when you create a VPN gateway, you must use the Standard SKU public IP address.

You can find details on the retirement of Basic SKU public IP addresses in the [Azure Updates announcement](https://azure.microsoft.com/updates/upgrade-to-standard-sku-public-ip-addresses-in-azure-by-30-september-2025-basic-sku-will-be-retired).

> **Note:**
> The timeline for VPN Gateway using Azure Basic public IP addresses is subject to frequent updates.
> For the latest migration timeline, please see the VPN Gateway [What's New](https://learn.microsoft.com/azure/vpn-gateway/whats-new#upcoming-projected-changes) page.

### How is my VPN tunnel authenticated?

Azure VPN Gateway uses preshared key (PSK) authentication. We generate a PSK when we create the VPN tunnel. You can change the automatically generated PSK to your own by using the Set Pre-Shared Key REST API or PowerShell cmdlet.

### Can I use the Set Pre-Shared Key REST API to configure my policy-based (static routing) gateway VPN?

Yes. You can use the Set Pre-Shared Key REST API and PowerShell cmdlet to configure both Azure policy-based (static) VPNs and route-based (dynamic) routing VPNs.

### Can I use other authentication options?

You're limited to using preshared keys for authentication.

### Does Azure VPN Gateway support IPv6?

Yes. For more information, see [Create a site-to-site VPN connection in IPv4 and IPv6 dual stack](site-to-site-ipv6-azure.md) and [About Point-to-Site VPN](point-to-site-about.md#protocol).

### How do I specify which traffic goes through the VPN gateway?

For the Azure Resource Manager deployment model:

* Azure PowerShell: Use `AddressPrefix` to specify traffic for the local network gateway.
* Azure portal: Go to *local network gateway* > **Configuration** > **Address space**.

For the classic deployment model:

* Azure portal: Go to the classic virtual network, and then go to **VPN connections** > **Site-to-site VPN connections** > *local site name* > *local site* > **Client address space**.

### Can I use NAT-T on my VPN connections?

Yes, network address translation traversal (NAT-T) is supported. Azure VPN Gateway does *not* perform any NAT-like functionality on the inner packets to or from the IPsec tunnels. In this configuration, ensure that the on-premises device initiates the IPSec tunnel.

### Can I set up my own VPN server in Azure and use it to connect to my on-premises network?

Yes. You can deploy your own VPN gateways or servers in Azure from Azure Marketplace or by creating your own VPN routers. You must configure user-defined routes in your virtual network to ensure that traffic is routed properly between your on-premises networks and your virtual network subnets.

### <a name="gatewayports"></a>Why are certain ports opened on my virtual network gateway?

They're required for Azure infrastructure communication. Azure certificates help protect them by locking them down. Without proper certificates, external entities, including the customers of those gateways, can't cause any effect on those endpoints.

A virtual network gateway is fundamentally a multihomed device. One network adapter taps into the customer private network, and one network adapter faces the public network. Azure infrastructure entities can't tap into customer private networks for compliance reasons, so they need to use public endpoints for infrastructure communication. An Azure security audit periodically scans the public endpoints.

### Where can I find information about gateway types, requirements, and throughput?

See the following articles:

* [About VPN Gateway configuration settings](vpn-gateway-about-vpn-gateway-settings.md)
* [About gateway SKUs](about-gateway-skus.md)

### Is IP fragmentation in site-to-site VPN tunnels supported?
No. IP fragmentation is not supported for ESP packets or for any packets encapsulated within the site-to-site VPN tunnel.

## <a name="root-certificate"></a>Root Certificate Migration for point-to-site VPN gateways

Azure periodically requires migration of the gateway root certificate used by VPN gateways for point-to-site (P2S) connections. When a certificate migration occurs, VPN administrators must download an updated VPN client profile and redistribute it to all P2S users. To determine if you’re affected and for instructions to update your client profiles, see [About gateway certificate migration](point-to-site-about-gateway-certificate-migration.md).

## <a name="sku-deprecate"></a>Deprecation of older SKUs

The Standard and High Performance SKUs are retired. You can view the announcement on the [Azure Updates site](https://go.microsoft.com/fwlink/?linkid=2255127). For more information, see the [VPN Gateway legacy SKUs](vpn-gateway-about-skus-legacy.md#sku-deprecation) article.

For information about timelines, see the VPN Gateway [What's New](https://learn.microsoft.com/azure/vpn-gateway/whats-new#upcoming-projected-changes) page.


### Can I create a new gateway that uses a Standard or High Performance SKU after the deprecation?
  
No.

### How long will my existing gateways be supported on the Standard and High Performance SKUs?

The customer initiated migration as well the gateways will be supported until the retirement date.

### Will my IP address change when my legacy VPN gateway SKU is migrated?

No, the IP address won't change when you migrate by using the Azure portal. You can choose to migrate a Basic SKU IP address to a Standard SKU IP address. For more information, see [About migrating a Basic SKU public IP address to Standard SKU for VPN Gateway](basic-public-ip-migrate-about.md).

### Do I need to migrate my gateways from the Standard or High Performance SKU right now?
  
You must migrate the Basic IP address on your gateway by using the Azure portal, if you want to retain the IP address. As part of this migration, your gateways are automatically migrated to gateway SKUs that are supported by availability zones.

### Will there be any pricing difference for my gateways after migration?

Your SKUs are automatically migrated and upgraded to SKUs that are supported by availability zones, as part of Basic IP address migration. See [VPN Gateway pricing](https://azure.microsoft.com/pricing/details/vpn-gateway/) for more details.

### Will there be any performance impact on my gateways with this migration?

Yes. You get better performance with the VpnGw1AZ and VpnGw2AZ SKUs. For more information about SKU throughput, see [About gateway SKUs](https://go.microsoft.com/fwlink/?linkid=2256302).

### What happens if I don't migrate by retirement date?

To ensure a smooth transition, we strongly recommend that customers use the Basic IP migration tool to migrate their Basic IPs and associated gateways. After Jun 2026, we'll attempt to automatically migrate all gateways that still use the Standard or High Performance SKU:

* Gateways on the Standard SKU will be automatically upgraded to VpnGw1AZ.
* Gateways on the High Performance SKU will be automatically upgraded to VpnGw2AZ.

If we encounter constraints such as an insufficient subnet size, **the automatic gateway migration cannot be completed**. In this case, you’ll need to take the required steps to resolve the issue. You can continue migrating your gateway using the Azure portal until backend migration support is available.

### Is the VPN Gateway Basic SKU also retiring?

No, the VPN Gateway Basic SKU isn't retiring. You can create a VPN gateway by using the Basic SKU via Azure PowerShell or the Azure CLI. The VPN Gateway Basic SKU currently supports only the Basic SKU public IP address resource.


## Migrating a Basic SKU public IP address to Standard SKU

For information about migrating from a Basic SKU public IP address to a Standard SKU public IP address for VPN Gateway deployments currently using a Basic SKU public IP address, see [About Basic SKU public IP address migration](basic-public-ip-migrate-about.md). For timelines, see the VPN Gateway [What's New](https://learn.microsoft.com/azure/vpn-gateway/whats-new#upcoming-projected-changes) page.

## <a name="s2s"></a>Site-to-site connections and VPN devices

### What should I consider when selecting a VPN device?

We've validated a set of standard site-to-site VPN devices in partnership with device vendors. You can find a list of known compatible VPN devices, their corresponding configuration instructions or samples, and device specifications in the [About VPN devices](vpn-gateway-about-vpn-devices.md) article.

All devices in the device families listed as known compatible should work with virtual networks. To help configure your VPN device, refer to the device configuration sample or link that corresponds to the appropriate device family.

### Where can I find VPN device configuration settings?


Depending on the VPN device that you have, you might be able to download a VPN device configuration script. For more information, see [Download VPN device configuration scripts](vpn-gateway-download-vpndevicescript.md).

The following links provide more configuration information:

- For information about compatible VPN devices, see [About VPN devices](vpn-gateway-about-vpn-devices.md).

- For links to device configuration settings, see [Validated VPN devices](vpn-gateway-about-vpn-devices.md#devicetable). We provide the device configuration links on a best-effort basis, but it's always best to check with your device manufacturer for the latest configuration information.

  The list shows the versions that we tested. If the OS version for your VPN device isn't on the list, it still might be compatible. Check with your device manufacturer.

- For basic information about VPN device configuration, see [Overview of partner VPN device configurations](vpn-gateway-3rdparty-device-config-overview.md).

- For information about editing device configuration samples, see [Editing samples](vpn-gateway-about-vpn-devices.md#editing).

- For cryptographic requirements, see [About cryptographic requirements and Azure VPN gateways](vpn-gateway-about-compliance-crypto.md).

- For information about parameters that you need to complete your configuration, see [Default IPsec/IKE parameters](vpn-gateway-about-vpn-devices.md#ipsec). The information includes IKE version, Diffie-Hellman (DH) group, authentication method, encryption and hashing algorithms, security association (SA) lifetime, perfect forward secrecy (PFS), and Dead Peer Detection (DPD).

- For IPsec/IKE policy configuration steps, see [Configure custom IPsec/IKE connection policies for S2S VPN and VNet-to-VNet](vpn-gateway-ipsecikepolicy-rm-powershell.md).

- To connect multiple policy-based VPN devices, see [Connect a VPN gateway to multiple on-premises policy-based VPN devices](vpn-gateway-connect-multiple-policybased-rm-ps.md).


### How do I edit VPN device configuration samples?

See [Editing device configuration samples](vpn-gateway-about-vpn-devices.md#editing).

### Where do I find IPsec and IKE parameters?

See [Default IPsec/IKE parameters](vpn-gateway-about-vpn-devices.md#ipsec).

### Why does my policy-based VPN tunnel go down when traffic is idle?

This behavior is expected for policy-based (also known as *static routing*) VPN gateways. When the traffic over the tunnel is idle for more than five minutes, the tunnel is torn down. When traffic starts flowing in either direction, the tunnel is reestablished immediately.

### Can I use software VPNs to connect to Azure?

We support Windows Server 2012 Routing and Remote Access servers for site-to-site cross-premises configuration.

Other software VPN solutions should work with the gateway, as long as they conform to industry-standard IPsec implementations. For configuration and support instructions, contact the vendor of the software.

### Can I connect to a VPN gateway via point-to-site when located at a site that has an active site-to-site connection?

Yes, but the public IP addresses of the point-to-site client must be different from the public IP addresses that the site-to-site VPN device uses, or else the point-to-site connection won't work. Point-to-site connections with IKEv2 can't be initiated from the same public IP addresses where a site-to-site VPN connection is configured on the same VPN gateway.

### How does Azure VPN Gateway handle traffic flow in Active-Active mode, and what should I consider if my on-premises setup requires symmetric routing?

In Azure VPN Gateway Active-Active mode, each gateway instance has its own public IP and tunnel, and Azure may send traffic over either tunnel. For a given TCP/UDP flow, Azure will try to use the same tunnel in one direction, but there’s no guarantee that return traffic will follow the same path. This means flows can be asymmetric, which Azure handles natively, but if your on-premises firewall or VPN device requires strict symmetry, you’ll need to adjust routing policies (e.g., with BGP attributes or traffic selectors) or consider Active-Standby mode instead.

### Does Azure guarantee symmetric routing for a given flow in Active-Active VPN mode?

No, Azure does not guarantee symmetric routing for a given flow in Active-Active VPN mode.
* An Active-Active VPN Gateway has two gateway instances (Gateway0 and Gateway1), each with its own public IP.
* The on-premises VPN device(s) typically establish two tunnels (one per gateway instance).
* Azure’s BGP advertisements make both tunnels available for routing.
* Depending on the on-premises routing policy and Azure’s route selection, packets may egress one tunnel and ingress the other.

## <a name="P2S"></a>Point-to-site connections

### How many VPN client endpoints can I have in my point-to-site configuration?

It depends on the gateway SKU. For more information on the supported number of connections, see [Gateway SKUs](vpn-gateway-about-vpngateways.md#gwsku).

### <a name="supportedclientos"></a>What client operating systems can I use with point-to-site?

The following client operating systems are supported:

* Windows 11
* macOS version 13.0 or later
* Linux (strongSwan)
* iOS

### Can I traverse proxies and firewalls by using point-to-site capability?

Azure supports three types of point-to-site VPN options:

* **Secure Socket Tunneling Protocol (SSTP)**: A Microsoft proprietary SSL-based solution that can penetrate firewalls because most firewalls open the outbound TCP port that 443 SSL uses.

* **OpenVPN**: A SSL-based solution that can penetrate firewalls because most firewalls open the outbound TCP port that 443 SSL uses.

* **IKEv2 VPN**: A standards-based IPsec VPN solution that uses outbound UDP ports 500 and 4500, along with IP protocol number 50. Firewalls don't always open these ports, so there's a possibility that IKEv2 VPN can't traverse proxies and firewalls.

### If I restart a client computer that I configured for point-to-site, will the VPN automatically reconnect?

Automatic reconnection is a function of the client that you use. Windows supports automatic reconnection through the **Always On VPN** client feature.

### Does point-to-site support DDNS on the VPN clients?

Dynamic DNS (DDNS) is currently not supported in point-to-site VPNs.

### Can site-to-site and point-to-site configurations coexist for the same virtual network?

Yes. For the Resource Manager deployment model, you must have a route-based VPN type for your gateway. For the classic deployment model, you need a dynamic gateway. We don't support point-to-site for static routing VPN gateways or policy-based VPN gateways.

### Can I configure a point-to-site client to connect to multiple virtual network gateways at the same time?

Depending on the VPN client software that you use, you might be able to connect to multiple virtual network gateways. But that's the case only if the virtual networks that you're connecting to don't have conflicting address spaces between them or with the network that the client is connecting from. Although the Azure VPN client supports many VPN connections, you can have only one connection at any time.

### Can I configure a point-to-site client to connect to multiple virtual networks at the same time?

Yes. Point-to-site client connections to a VPN gateway deployed in a VNet that's peered with other VNets can have access to the other peered VNets, as long as they meet certain configuration criteria. For a point-to-site client to have access to a peered VNet, the peered VNet (the VNet without the gateway) must be configured with the **Use remote gateways** attribute. The VNet with the VPN gateway must be configured with **Allow gateway transit**. For more information, see [About point-to-site VPN routing](vpn-gateway-about-point-to-site-routing.md).

### How much throughput can I expect through site-to-site or point-to-site connections?

It's difficult to maintain the exact throughput of the VPN tunnels. IPsec and SSTP are crypto-heavy VPN protocols. The latency and bandwidth between your premises and the internet can also limit throughput.

For a VPN gateway with only IKEv2 point-to-site VPN connections, the total throughput that you can expect depends on the gateway SKU. For more information on throughput, see [Gateway SKUs](vpn-gateway-about-vpngateways.md#gwsku).

### Can I use any software VPN client for point-to-site that supports SSTP or IKEv2?

 No. You can use only the native VPN client on Windows for SSTP, and the native VPN client on Mac for IKEv2. However, you can use the OpenVPN client on all platforms to connect over the OpenVPN protocol. Refer to the [list of supported client operating systems](#supportedclientos).

### Can I change the authentication type for a point-to-site connection?

Yes. In the portal, go to **VPN gateway** > **Point-to-site configuration**. For **Authentication type**, select the authentication type that you want to use.

After you change the authentication type, current clients might not be able to connect until you generate a new VPN client configuration profile, download it, and apply it to each VPN client.

### When do I need to generate a new configuration package for the VPN client profile?

When you make changes to the configuration settings for the P2S VPN gateway, such as adding a tunnel type or changing an authentication type, you need to generate a new configuration package for the VPN client profile. The new package includes the updated settings that VPN clients need for connecting to the P2S gateway. After you generate the package, use the settings in the files to update the VPN clients.

### Does Azure support IKEv2 VPN with Windows?

IKEv2 is supported on Windows 10 and Windows Server 2016. However, to use IKEv2 in certain OS versions, you must install updates and set a registry key value locally. OS versions earlier than Windows 10 aren't supported and can use only SSTP or the OpenVPN protocol.

> **Note:**
> Windows OS builds newer than Windows 10 Version 1709 and Windows Server 2016 Version 1607 don't require these steps.

> **Note:**
>Microsoft recommends using Windows 11 with Point-to-Site VPN connections. Windows 10 reached end of support in October 2025. For more information, see [Supported Windows versions for Azure VPN Client](azure-vpn-client-versions.md#supported-windows-versions).

To prepare Windows 10 or Windows Server 2016 for IKEv2:

1. Install the update based on your OS version:

   | OS version | Date | Number/Link |
   | --- | --- | --- |
   | Windows Server 2016<br>Windows 10 Version 1607 | January 17, 2018 | [KB4057142](https://support.microsoft.com/help/4057142/windows-10-update-kb4057142) |
   | Windows 10 Version 1703 | January 17, 2018 | [KB4057144](https://support.microsoft.com/help/4057144/windows-10-update-kb4057144) |
   | Windows 10 Version 1709 | March 22, 2018 | [KB4089848](https://www.catalog.update.microsoft.com/search.aspx?q=kb4089848) |
   |  |  |  |

2. Set the registry key value. Create or set the `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\RasMan\ IKEv2\DisableCertReqPayload` `REG_DWORD` key in the registry to `1`.

### What is the IKEv2 traffic selector limit for point-to-site connections?

Windows 10 version 2004 (released September 2021) increased the traffic selector limit to 255. Earlier versions of Windows have a traffic selector limit of 25.

The traffic selector limit in Windows determines the maximum number of address spaces in your virtual network and the maximum sum of your local networks, VNet-to-VNet connections, and peered VNets connected to the gateway. Windows-based point-to-site clients fail to connect via IKEv2 if they surpass this limit.

### What is the OpenVPN traffic selector limit for point-to-site connections?

The traffic selector limit for OpenVPN is 1,000 routes.

### What happens when I configure both SSTP and IKEv2 for P2S VPN connections?

When you configure both SSTP and IKEv2 in a mixed environment that consists of Windows and Mac devices, the Windows VPN client always tries the IKEv2 tunnel first. The client falls back to SSTP if the IKEv2 connection isn't successful. macOS connects only via IKEv2.

When you have both SSTP and IKEv2 enabled on the gateway, the point-to-site address pool is statically split between the two, so clients that use different protocols are IP addresses from either subrange. The maximum number of SSTP clients is always 128, even if the address range is larger than /24. The result is a larger number of addresses available for IKEv2 clients. For smaller ranges, the pool is equally halved. Traffic selectors that the gateway uses might not include the Classless Inter-Domain Routing (CIDR) block for the point-to-site address range but include the CIDR block for the two subranges.

### Which platforms does Azure support for P2S VPN?

Azure supports Windows, Mac, and Linux for P2S VPN.

### I already have a VPN gateway deployed. Can I enable RADIUS or IKEv2 VPN on it?

Yes. If the gateway SKU that you're using supports RADIUS or IKEv2, you can enable these features on gateways that you already deployed by using Azure PowerShell or the Azure portal. The Basic SKU doesn't support RADIUS or IKEv2.

###  <a name="vpn-disconnect"></a>Why am I getting disconnected from my Azure VPN client? What can I do to reduce the frequency of disconnection?

You may see one of the following messages: 
- In Azure VPN client for Windows **ver. 3.4.0.0**: "Your authentication with Microsoft Entra is expired. You need to re-authenticate in Entra to acquire a new token. Authentication timeout can be tuned by your administrator." 
- In Azure VPN client for macOS **ver. 2.7.101**: "Your authentication with Microsoft Entra has expired so you need to re-authenticate to acquire a new token. Please try connecting again. Authentication policies and timeout are configured by your administrator in Entra tenant." 

The point-to-site connection disconnects because the current refresh token in the Azure VPN client, acquired from Entra ID, has expired or become invalid. This token is renewed approximately every hour. Entra tenant administrators can extend the sign-in frequency by adding conditional access policies. Please work with your Entra tenant administrators to extend the refresh token expiration interval. 

For more information, see: [VPN client error: Your authentication with Microsoft Entra expired](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/vpn-gateway/vpn-gateway-troubleshoot-vpn-point-to-site-connection-problems.md#entra-expired).

### <a name="removeconfig"></a>How do I remove the configuration of a P2S connection?

You can remove a P2S configuration by using the following Azure PowerShell or Azure CLI commands:

```azurepowershell-interactive
$gw=Get-AzVirtualNetworkGateway -name <gateway-name>`  
$gw.VPNClientConfiguration = $null`  
Set-AzVirtualNetworkGateway -VirtualNetworkGateway $gw`
```

```azurecli-interactive
az network vnet-gateway update --name <gateway-name> --resource-group <resource-group name> --remove "vpnClientConfiguration"
```


## <a name="P2S-cert"></a>Point-to-site connections with certificate authentication


### What certificate types does Azure VPN Gateway support for Point-to-Site (P2S) certificate authentication?

Azure VPN Gateway supports RSA-based X.509 certificates for Point-to-Site (P2S) certificate authentication. Currently, it doesn't support ECC/ECDSA certificates for IKEv2-based P2S authentication. 

### What should I do if I get a certificate mismatch for a point-to-site certificate authentication connection?

Clear the **Verify the server's identity by validating the certificate** checkbox. Or, add the server's fully qualified domain name (FQDN) along with the certificate when you're creating a profile manually. You can do this by running `rasphone` from a command prompt and selecting the profile from the dropdown list.

We don't recommend bypassing validation of server identity in general. But with Azure certificate authentication, the same certificate is used for server validation in the VPN tunneling protocol (IKEv2 or SSTP) and the Extensible Authentication Protocol (EAP). Because the VPN tunneling protocol is already validating the server certificate and FQDN, it's redundant to validate them again in EAP.

Screenshot that shows properties for point-to-site authentication.

### Can I use my own internal PKI root CA to generate certificates for point-to-site connectivity?

Yes. Previously, you could use only self-signed root certificates. You can still upload 20 root certificates.

### Can I use certificates from Azure Key Vault?

No.

### What tools can I use to create certificates?

You can use your enterprise public key infrastructure (PKI) solution (your internal PKI), Azure PowerShell, MakeCert, and OpenSSL.

### <a name="certsettings"></a>Are there instructions for certificate settings and parameters?

For .cer and .pfx file formats, see:

* [PowerShell](vpn-gateway-certificates-point-to-site.md)
* [MakeCert](vpn-gateway-certificates-point-to-site-makecert.md)

For .pem file format, see:

* [Linux: OpenSSL](point-to-site-certificates-linux-openssl.md)
* [Linux: strongSwan](vpn-gateway-certificates-point-to-site-linux.md)


## <a name="P2SRADIUS"></a>Point-to-site connections with RADIUS authentication

### Is RADIUS authentication supported on all Azure VPN Gateway SKUs?

RADIUS authentication is supported for all SKUs except the Basic SKU.

For earlier SKUs, RADIUS authentication is supported on Standard and High Performance SKUs.

### Is RADIUS authentication supported for the classic deployment model?

No.

### What is the timeout period for RADIUS requests sent to the RADIUS server?

RADIUS requests are set to time out after 30 seconds. User-defined timeout values aren't currently supported.

### Are third-party RADIUS servers supported?

Yes.

### What are the connectivity requirements to ensure that the Azure gateway can reach an on-premises RADIUS server?

You need a site-to-site VPN connection to the on-premises site, with the proper routes configured.

### Can traffic to an on-premises RADIUS server (from the VPN gateway) be routed over an ExpressRoute connection?

No. It can be routed only over a site-to-site connection.

### Is there a change in the number of supported SSTP connections with RADIUS authentication? What is the maximum number of supported SSTP and IKEv2 connections?

There's no change in the maximum number of supported SSTP connections on a gateway with RADIUS authentication. It remains 128 for SSTP, but it depends on the gateway SKU for IKEv2. For more information on the number of supported connections, see [About gateway SKUs](about-gateway-skus.md).

### What is the difference between certificate authentication through a RADIUS server and Azure native certificate authentication through the upload of a trusted certificate?

In RADIUS certificate authentication, the authentication request is forwarded to a RADIUS server that handles the certificate validation. This option is useful if you want to integrate with a certificate authentication infrastructure that you already have through RADIUS.

When you use Azure for certificate authentication, the VPN gateway performs the validation of the certificate. You need to upload your certificate public key to the gateway. You can also specify list of revoked certificates that shouldn't be allowed to connect.

### Does RADIUS authentication support Network Policy Server integration for multifactor authentication?

If your multifactor authentication is text based (for example, SMS or a mobile app verification code) and requires the user to enter a code or text in the VPN client UI, the authentication won't succeed and isn't a supported scenario. See [Integrate Azure VPN gateway RADIUS authentication with NPS server for multifactor authentication](vpn-gateway-radius-mfa-nsp.md).

### Does RADIUS authentication work with both IKEv2 and SSTP VPN?

Yes, RADIUS authentication is supported for both IKEv2 and SSTP VPN.

### Does RADIUS authentication work with the OpenVPN client?

RADIUS authentication is supported for the OpenVPN protocol.

## <a name="V2VMulti"></a>VNet-to-VNet and multi-site connections

The VNet-to-VNet information in this section applies to VPN gateway connections. For information about VNet peering, see [Virtual network peering](../virtual-network/virtual-network-peering-overview.md).

### Does Azure charge for traffic between VNets?

VNet-to-VNet traffic within the same region is free for both directions when you use a VPN gateway connection. Cross-region VNet-to-VNet egress traffic is charged with the outbound inter-VNet data transfer rates based on the source regions. For more information, see [Azure VPN Gateway pricing](https://azure.microsoft.com/pricing/details/vpn-gateway/). If you're connecting your VNets by using VNet peering instead of a VPN gateway, see [Azure Virtual Network pricing](https://azure.microsoft.com/pricing/details/virtual-network/).

### Does VNet-to-VNet traffic travel across the internet?

No. VNet-to-VNet traffic travels across the Microsoft Azure backbone, not the internet.

<a name='can-i-establish-a-vnet-to-vnet-connection-across-azure-active-directory-tenants'></a>

### Can I establish a VNet-to-VNet connection across Microsoft Entra tenants?

Yes. VNet-to-VNet connections that use VPN gateways work across Microsoft Entra tenants.

### Is VNet-to-VNet traffic secure?

IPsec and IKE encryption help protect VNet-to-VNet traffic.

### Do I need a VPN device to connect VNets together?

No. Connecting multiple Azure virtual networks together doesn't require a VPN device unless you need cross-premises connectivity.

### Do my VNets need to be in the same region?

No. The virtual networks can be in the same or different Azure regions (locations).

### If VNets aren't in the same subscription, do the subscriptions need to be associated with the same Microsoft Entra tenant?

No.

### Can I use VNet-to-VNet to connect virtual networks in separate Azure instances?

No. VNet-to-VNet supports connecting virtual networks within the same Azure instance. For example, you can't create a connection between global Azure and Chinese, German, or US government Azure instances. Consider using a site-to-site VPN connection for these scenarios.

### Can I use VNet-to-VNet along with multi-site connections?

Yes. You can use virtual network connectivity simultaneously with multi-site VPNs.

### How many on-premises sites and virtual networks can one virtual network connect to?

See the [gateway requirements](about-gateway-skus.md#benchmark) table.

### Can I use VNet-to-VNet to connect VMs or cloud services outside a VNet?

No. VNet-to-VNet supports connecting virtual networks. It doesn't support connecting virtual machines or cloud services that aren't in a virtual network.

### Can a cloud service or a load-balancing endpoint span VNets?

No. A cloud service or a load-balancing endpoint can't span virtual networks, even if they're connected together.

### Can I use a policy-based VPN type for VNet-to-VNet or multi-site connections?

No. VNet-to-VNet and multi-site connections require VPN gateways with route-based (previously called *dynamic routing*) VPN types.

### Can I connect a VNet with a route-based VPN type to another VNet with a policy-based VPN type?

No. Both virtual networks must use route-based (previously called *dynamic routing*) VPNs.

### Do VPN tunnels share bandwidth?

Yes. All VPN tunnels of the virtual network share the available bandwidth on the VPN gateway and the same service-level agreement for VPN gateway uptime in Azure.

### Are redundant tunnels supported?

Redundant tunnels between a pair of virtual networks are supported when one virtual network gateway is configured as active-active.

### Can I have overlapping address spaces for VNet-to-VNet configurations?

No. You can't have overlapping IP address ranges.

### Can there be overlapping address spaces among connected virtual networks and on-premises local sites?

No. You can't have overlapping IP address ranges.
 

### How do I configure a cross tenant scenario?

 * If you're using REST API or ARM templates for connection resources referencing a gateway in a different tenant, follow this authentication procedure: [Header values for authentication](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/authenticate-multi-tenant.md#header-values-for-authentication).
 * For [site-to-site](vpn-gateway-create-site-to-site-rm-powershell.md#tenants).
 * For [VNet-to-VNet](vpn-gateway-vnet-vnet-rm-ps.md#tenant).

If you are using PowerShell commands, verify that you're running [Az.Network 7.15.1](https://www.powershellgallery.com/packages/Az.Network/7.15.1)

### How do I enable routing between my site-to-site VPN connection and ExpressRoute?

If you want to enable routing between your branch connected to ExpressRoute and your branch connected to a site-to-site VPN, you need to set up [Azure Route Server](../route-server/expressroute-vpn-support.md).

### Can I use a VPN gateway to transit traffic between my on-premises sites or to another virtual network?

* **Resource Manager deployment model**

  Yes. See the [BGP and routing](#bgp) section for more information.

* **Classic deployment model**

  Transiting traffic via a VPN gateway is possible when you use the classic deployment model, but it relies on statically defined address spaces in the network configuration file. Border Gateway Protocol (BGP) isn't currently supported with Azure virtual networks and VPN gateways via the classic deployment model. Without BGP, manually defining transit address spaces is error prone and not recommended.

### Does Azure generate the same IPsec/IKE preshared key for all my VPN connections for the same virtual network?

No. By default, Azure generates different preshared keys for different VPN connections. However, you can use the Set VPN Gateway Key REST API or PowerShell cmdlet to set the key value that you prefer. The key must contain only printable ASCII characters, except space, hyphen (-), or tilde (~).

### Do I get more bandwidth with more site-to-site VPNs than for a single virtual network?

No. All VPN tunnels, including point-to-site VPNs, share the same VPN gateway and the available bandwidth.

### Can I configure multiple tunnels between my virtual network and my on-premises site by using multi-site VPN?

Yes, but you must configure BGP on both tunnels to the same location.

### Does Azure VPN Gateway honor AS path prepending to influence routing decisions between multiple connections to my on-premises sites?

Yes, Azure VPN Gateway honors autonomous system (AS) path prepending to help make routing decisions when BGP is enabled. A shorter AS path is preferred in BGP path selection.

### Can I use the RoutingWeight property when creating a new VPN VirtualNetworkGateway connection?

No. Such a setting is reserved for ExpressRoute gateway connections. If you want to influence routing decisions between multiple connections, you need to use AS path prepending.

### Can I use point-to-site VPNs with my virtual network with multiple VPN tunnels?

Yes. You can use point-to-site VPNs with the VPN gateways connecting to multiple on-premises sites and other virtual networks.

### Can I connect a virtual network with IPsec VPNs to my ExpressRoute circuit?

Yes, this is supported. For more information, see [Configure ExpressRoute and site-to-site coexisting connections](../expressroute/expressroute-howto-coexist-classic.md).

## <a name="ipsecike"></a>IPsec/IKE policy

### Is a custom IPsec/IKE policy supported on all Azure VPN Gateway SKUs?

A custom IPsec/IKE policy is supported on all Azure VPN Gateway SKUs except the Basic SKU.

### How many policies can I specify on a connection?

You can specify only one policy combination for a connection.

### Can I specify a partial policy on a connection (for example, only IKE algorithms but not IPsec)?

No, you must specify all algorithms and parameters for both IKE (Main Mode) and IPsec (Quick Mode). Partial policy specification isn't allowed.

### What algorithms and key strengths does the custom policy support?

The following table lists the supported cryptographic algorithms and key strengths that you can configure. You must select one option for every field.


| IPsec/IKEv2 | Options |
| --- | --- |
| IKEv2 encryption | GCMAES256, GCMAES128, AES256, AES192, AES128 |
| IKEv2 integrity | SHA384, SHA256, SHA1, MD5 |
| DH group | DHGroup24, ECP384, ECP256, DHGroup14, DHGroup2048, DHGroup2, DHGroup1, None |
| IPsec encryption | GCMAES256, GCMAES192, GCMAES128, AES256, AES192, AES128, DES3, DES, None |
| IPsec integrity | GCMAES256, GCMAES192, GCMAES128, SHA256, SHA1, MD5 |
| PFS group | PFS24, ECP384, ECP256, PFS2048, PFS2, PFS1, None |
| Quick Mode SA lifetime | (Optional; default values if not specified)<br>Seconds (integer; minimum 300, default 27,000)<br>Kilobytes (integer; minimum 1,024, default 102,400,000) |
| Traffic selector | `UsePolicyBasedTrafficSelectors` (`$True` or `$False`, but optional; default `$False` if not specified) |
| DPD timeout | Seconds (integer; minimum 9, maximum 3,600, default 45) |



* Your on-premises VPN device configuration must match or contain the following algorithms and parameters that you specify on the Azure IPsec or IKE policy:

  * IKE encryption algorithm (Main Mode, Phase 1)
  * IKE integrity algorithm (Main Mode, Phase 1)
  * DH group (Main Mode, Phase 1)
  * IPsec encryption algorithm (Quick Mode, Phase 2)
  * IPsec integrity algorithm (Quick Mode, Phase 2)
  * PFS group (Quick Mode, Phase 2)
  * Traffic selector (if you use `UsePolicyBasedTrafficSelectors`)
  * SA lifetimes (local specifications that don't need to match)

* If you use GCMAES for the IPsec encryption algorithm, you must select the same GCMAES algorithm and key length for IPsec integrity. For example, use GCMAES128 for both.

* In the table of algorithms and keys:

  * IKE corresponds to Main Mode or Phase 1.
  * IPsec corresponds to Quick Mode or Phase 2.
  * DH group specifies the Diffie-Hellman group used in Main Mode or Phase 1.
  * PFS group specifies the Diffie-Hellman group used in Quick Mode or Phase 2.

* IKE Main Mode SA lifetime is fixed at 28,800 seconds on the Azure VPN gateways.

* `UsePolicyBasedTrafficSelectors` is an optional parameter on the connection. If you set `UsePolicyBasedTrafficSelectors` to `$True` on a connection, it configures the VPN gateway to connect to an on-premises policy-based VPN firewall.

  If you enable `UsePolicyBasedTrafficSelectors`, ensure that your VPN device has the matching traffic selectors defined with all combinations of your on-premises network (local network gateway) prefixes to or from the Azure virtual network prefixes, instead of any-to-any. The VPN gateway accepts whatever traffic selector the remote VPN gateway proposes, irrespective of what's configured on the VPN gateway.

  For example, if your on-premises network prefixes are 10.1.0.0/16 and 10.2.0.0/16, and your virtual network prefixes are 192.168.0.0/16 and 172.16.0.0/16, you need to specify the following traffic selectors:

  * 10.1.0.0/16 <====> 192.168.0.0/16
  * 10.1.0.0/16 <====> 172.16.0.0/16
  * 10.2.0.0/16 <====> 192.168.0.0/16
  * 10.2.0.0/16 <====> 172.16.0.0/16

  For more information about policy-based traffic selectors, see [Connect a VPN gateway to multiple on-premises policy-based VPN devices](vpn-gateway-connect-multiple-policybased-rm-ps.md).

* Setting the timeout to shorter periods causes IKE to rekey more aggressively. The connection can then appear to be disconnected in some instances. This situation might not be desirable if your on-premises locations are farther away from the Azure region where the VPN gateway resides, or if the physical link condition could incur packet loss. We generally recommend that you set the timeout to *between 30 and 45* seconds.


### How do I troubleshoot a PFS group mismatch?

The PFS group in a custom IPsec/IKE policy is the Diffie-Hellman group used for Quick Mode (Phase 2). Your on-premises VPN device configuration must match or contain the PFS group configured in the Azure IPsec/IKE policy. If it doesn't, the connection can't establish. For inspection and remediation steps, see [Step 7 in Troubleshoot Azure Site-to-Site VPN disconnects intermittently](https://learn.microsoft.com/troubleshoot/azure/vpn-gateway/vpn-gateway-troubleshoot-site-to-site-disconnected-intermittently#step-7-check-whether-the-on-premises-vpn-device-has-perfect-forward-secrecy-enabled), [Configure custom IPsec/IKE policies in the Azure portal](https://learn.microsoft.com/azure/vpn-gateway/ipsec-ike-policy-howto#step-3-configure-a-custom-ipsecike-policy-on-the-s2s-vpn-connection), and [Configure custom IPsec/IKE policies with Azure PowerShell](https://learn.microsoft.com/azure/vpn-gateway/vpn-gateway-ipsecikepolicy-rm-powershell#managepolicy).

For more information, see [Connect a VPN gateway to multiple on-premises policy-based VPN devices](vpn-gateway-connect-multiple-policybased-rm-ps.md).

### <a name ="DH"></a>Which Diffie-Hellman groups does the custom policy support?

The following table lists the corresponding Diffie-Hellman groups that the custom policy supports:


| Diffie-Hellman group | DHGroup | PFSGroup | Key length |
| --- | --- | --- | --- |
| 1 | DHGroup1 | PFS1 | 768-bit MODP |
| 2 | DHGroup2 | PFS2 | 1024-bit MODP |
| 14 | DHGroup14<br>DHGroup2048 | PFS2048 | 2048-bit MODP |
| 19 | ECP256 | ECP256 | 256-bit ECP |
| 20 | ECP384 | ECP384 | 384-bit ECP |
| 24 | DHGroup24 | PFS24 | 2048-bit MODP |

For more information, refer to [RFC3526](https://tools.ietf.org/html/rfc3526) and [RFC5114](https://tools.ietf.org/html/rfc5114).

### Does the custom policy replace the default IPsec/IKE policy sets for VPN gateways?

Yes. After you specify a custom policy on a connection, Azure VPN Gateway uses only that policy on the connection, both as IKE initiator and IKE responder.

### If I remove a custom IPsec/IKE policy, does the connection become unprotected?

No, IPsec/IKE still helps protect the connection. After you remove the custom policy from a connection, the VPN gateway reverts to the [default list of IPsec/IKE proposals](vpn-gateway-about-vpn-devices.md#RouteBasedOffers) and restarts the IKE handshake with your on-premises VPN device.

### Would adding or updating an IPsec/IKE policy disrupt my VPN connection?

Yes. It could cause a small disruption (a few seconds) as the VPN gateway tears down the existing connection and restarts the IKE handshake to reestablish the IPsec tunnel with the new cryptographic algorithms and parameters. Ensure that your on-premises VPN device is also configured with the matching algorithms and key strengths to minimize the disruption.

### Can I use different policies on different connections?

Yes. A custom policy is applied on a per-connection basis. You can create and apply different IPsec/IKE policies on different connections.

You can also choose to apply custom policies on a subset of connections. The remaining ones use the Azure default IPsec/IKE policy sets.

### Can I use a custom policy on VNet-to-VNet connections?

Yes. You can apply a custom policy on both IPsec cross-premises connections and VNet-to-VNet connections.

### Do I need to specify the same policy on both VNet-to-VNet connection resources?

Yes. A VNet-to-VNet tunnel consists of two connection resources in Azure, one for each direction. Make sure both connection resources have the same policy. Otherwise, the VNet-to-VNet connection won't be established.

### What is the default DPD timeout value? Can I specify a different DPD timeout?

The default DPD timeout is 45 seconds on VPN gateways. You can specify a different DPD timeout value on each IPsec or VNet-to-VNet connection, from 9 seconds to 3,600 seconds.

> **Note:**
> Setting the timeout to shorter periods causes IKE to rekey more aggressively. The connection can then appear to be disconnected in some instances. This situation might not be desirable if your on-premises locations are farther away from the Azure region where the VPN gateway resides, or if the physical link condition could incur packet loss. We generally recommend that you set the timeout to *between 30 and 45* seconds.

### Does a custom IPsec/IKE policy work on ExpressRoute connections?

No. An IPsec/IKE policy works only on S2S VPN and VNet-to-VNet connections via the VPN gateways.

### How do I create connections with the IKEv1 or IKEv2 protocol type?

You can create IKEv1 connections on all route-based VPN-type SKUs, except the Basic SKU, Standard SKU, and other [earlier SKUs](vpn-gateway-about-skus-legacy.md#gwsku).

You can specify a connection protocol type of IKEv1 or IKEv2 while creating connections. If you don't specify a connection protocol type, IKEv2 is used as default option where applicable. For more information, see the [Azure PowerShell cmdlet](https://learn.microsoft.com/powershell/module/az.network/new-azvirtualnetworkgatewayconnection) documentation.

For information about SKU types and support for IKEv1 and IKEv2, see [Connect a VPN gateway to multiple on-premises policy-based VPN devices](vpn-gateway-connect-multiple-policybased-rm-ps.md).

### Is transit between IKEv1 and IKEv2 connections allowed?

Yes.

### Can I have IKEv1 site-to-site connections on the Basic SKU for the route-based VPN type?

No. The Basic SKU doesn't support this configuration.

### Can I change the connection protocol type after the connection is created (IKEv1 to IKEv2 and vice versa)?

No. After you create the connection, you can't change IKEv1 and IKEv2 protocols. You must delete and re-create a new connection with the desired protocol type.

### Why is my IKEv1 connection frequently reconnecting?

If your static routing or route-based IKEv1 connection is disconnecting at routine intervals, it's likely because your VPN gateways don't support in-place rekeys. When Main Mode is being rekeyed, your IKEv1 tunnels disconnect and take up to 5 seconds to reconnect. Your Main Mode negotiation timeout value determines the frequency of rekeys. To prevent these reconnects, you can switch to using IKEv2, which supports in-place rekeys.

If your connection is reconnecting at random times, follow the [troubleshooting guide](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/vpn-gateway/vpn-gateway-troubleshoot-site-to-site-disconnected-intermittently.md).

### Where can I find more information and steps for configuration?

See the following articles:

* [Configure custom IPsec/IKE connection policies for S2S VPN and VNet-to-VNet: Azure portal](ipsec-ike-policy-howto.md)
* [Configure custom IPsec/IKE connection policies for S2S VPN and VNet-to-VNet: PowerShell](vpn-gateway-ipsecikepolicy-rm-powershell.md)


## <a name="bgp"></a>BGP and routing

### Is BGP supported on all Azure VPN Gateway SKUs?

BGP is supported on all Azure VPN Gateway SKUs except the Basic SKU.

### Can I use BGP with Azure Policy VPN gateways?

No, BGP is supported on route-based VPN gateways only.

### What ASNs can I use?

You can use your own public Autonomous System Numbers (ASNs) or private ASNs for both your on-premises networks and Azure virtual networks.

You can't use the following reserved ASNs:

* Reserved by Azure:

  * Public ASNs: 8074, 8075, 12076
  * Private ASNs: 65515, 65517, 65518, 65519, 65520
* [Reserved by IANA](http://www.iana.org/assignments/iana-as-numbers-special-registry/iana-as-numbers-special-registry.xhtml):

  * 23456, 64496-64511, 65535-65551, 429496729

You can't specify these ASNs for your on-premises VPN devices when you're connecting to VPN gateways.

### Can I use 32-bit (4-byte) ASNs?

Yes, Azure VPN Gateway now supports 32-bit (4-byte) ASNs. To configure by using ASN in decimal format, use Azure PowerShell, the Azure CLI, or the Azure SDK.

### What private ASNs can I use?

The usable ranges of private ASNs are:

* 64512-65514 and 65521-65534

Neither IANA nor Azure reserves these ASNs, so you can assign them to your VPN gateway.

### What address does Azure VPN Gateway use for BGP peer IP?

By default, Azure VPN Gateway allocates a single IP address from the `GatewaySubnet` range for active-standby VPN gateways, or two IP addresses for active-active VPN gateways. These addresses are allocated automatically when you create the VPN gateway.

You can find the allocated BGP IP address by using Azure PowerShell or the Azure portal. In PowerShell, use `Get-AzVirtualNetworkGateway`, and look for the `bgpPeeringAddress` property. In the Azure portal, on the **Gateway Configuration** page, look under the **Configure BGP ASN** property.

If your on-premises VPN routers use Automatic Private IP Addressing (APIPA) IP addresses (169.254.x.x) as the BGP IP addresses, you must specify one or more Azure APIPA BGP IP addresses on your VPN gateway. Azure VPN Gateway selects the APIPA addresses to use with the on-premises APIPA BGP peer specified in the local network gateway, or the private IP address for a non-APIPA, on-premises BGP peer. For more information, see [Configure BGP for Azure VPN Gateway](configure-bgp.md).

### What are the requirements for the BGP peer IP addresses on my VPN device?

Your on-premises BGP peer address must not be the same as the public IP address of your VPN device or from the VNet address space of the VPN gateway. Use a different IP address on the VPN device for your BGP peer IP. It can be an address assigned to the loopback interface on the device (either a regular IP address or an APIPA address).

If your device uses an APIPA address for BGP, you must specify one or more APIPA BGP IP addresses on your VPN gateway, as described in [Configure BGP for Azure VPN Gateway](configure-bgp.md). Specify these addresses in the corresponding local network gateway that represents the location.

### What should I specify as my address prefixes for the local network gateway when I use BGP?

> **Important:**
> This is a change from the previously documented requirement.

Azure VPN Gateway adds a host route internally to the on-premises BGP peer IP over the IPsec tunnel. Don't add the /32 route in the **Address space** field, because it's redundant. If you use an APIPA address as the on-premises VPN device BGP IP, you can't add it to this field.

If you add any other prefixes in the **Address space** field, they're added as static routes on the Azure VPN gateway, in addition to the routes learned via BGP.

### Can I use the same ASN for both on-premises VPN networks and Azure virtual networks?

No. You must assign different ASNs between your on-premises networks and your Azure virtual networks if you're connecting them together with BGP.

Azure VPN gateways have a default ASN of 65515 assigned, whether BGP is enabled or not for your cross-premises connectivity. You can override this default by assigning a different ASN when you're creating the VPN gateway, or you can change the ASN after the gateway is created. You need to assign your on-premises ASNs to the corresponding Azure local network gateways.

### What address prefixes do Azure VPN gateways advertise to me?

The gateways advertise the following routes to your on-premises BGP devices:

* Your VNet address prefixes
* Address prefixes for each local network gateway connected to the VPN gateway
* Routes learned from other BGP peering sessions connected to the VPN gateway, except for the default route or routes that overlap with any virtual network prefix

### How many prefixes can I advertise to Azure VPN Gateway?

Azure VPN Gateway supports up to 4,000 prefixes. The BGP session is dropped if the number of prefixes exceeds the limit.

### Can I advertise the default route (0.0.0.0/0) to VPN gateways?

Yes. Keep in mind that advertising the default route forces all VNet egress traffic toward your on-premises site. It also prevents the virtual network VMs from accepting public communication from the internet directly, such as Remote Desktop Protocol (RDP) or Secure Shell (SSH) from the internet to the VMs.

### <a name="advertise-exact-prefixes"></a>In site-to-site tunnel setups, can I advertise the exact prefixes as my virtual network prefixes?

The ability to advertise exact prefixes depends on whether gateway transit is enabled or not enabled.

*	**When gateway transit is enabled:** You cannot advertise the exact prefixes as your virtual network (including peered virtual networks) prefixes. Azure blocks or filters the advertisement of any prefixes that match your virtual network address prefixes. However, you can advertise a prefix that is a superset of your virtual network's address space. For example, if your virtual network uses the address space 10.0.0.0/16, you can advertise 10.0.0.0/8, but not 10.0.0.0/16 or 10.0.0.0/24.
*	**When gateway transit is not enabled:** The gateway does not learn peered virtual network prefixes, allowing you to advertise the exact prefixes as your peered virtual network.

### Can I use BGP with my connections between virtual networks?

Yes. You can use BGP for both cross-premises connections and connections between virtual networks.

### Can I mix BGP with non-BGP connections for my Azure VPN gateways?

Yes, you can mix both BGP and non-BGP connections for the same Azure VPN gateway.

### Does Azure VPN Gateway support BGP transit routing?

Yes. BGP transit routing is supported, with the exception that VPN gateways don't advertise default routes to other BGP peers. To enable transit routing across multiple VPN gateways, you must enable BGP on all intermediate connections between virtual networks. For more information, see [About BGP and VPN Gateway](vpn-gateway-bgp-overview.md).

### Can I have more than one tunnel between a VPN gateway and my on-premises network?

Yes, you can establish more than one site-to-site VPN tunnel between a VPN gateway and your on-premises network. All these tunnels are counted against the total number of tunnels for your Azure VPN gateways, and you must enable BGP on both tunnels.

For example, if you have two redundant tunnels between your VPN gateway and one of your on-premises networks, they consume two tunnels out of the total quota for your VPN gateway.

### Can I have multiple tunnels between two Azure virtual networks with BGP?

Yes, but at least one of the virtual network gateways must be in an active-active configuration.

### Can I use BGP for an S2S VPN in an Azure ExpressRoute and S2S VPN coexistence configuration?

Yes.

### What should I add to my on-premises VPN device for the BGP peering session?

Add a host route of the Azure BGP peer IP address on your VPN device. This route points to the IPsec S2S VPN tunnel.

For example, if the Azure VPN peer IP is 10.12.255.30, you add a host route for 10.12.255.30 with a next-hop interface of the matching IPsec tunnel interface on your VPN device.

### Does the Azure VPN Gateway support BFD for site-to-site (S2S) VPN connections with BGP?

No. Azure VPN Gateways do not support Bidirectional Forwarding Detection (BFD) for site-to-site (S2S) VPN connections.

### What are the BGP timer settings for site-to-site (S2S) VPN connections?

The BGP keepalive timer is 60 seconds, and the hold timer is 180 seconds. Azure VPN Gateways use fixed timer values and do not support configurable keepalive or hold timers. To maintain stable BGP sessions, on-premises devices should be configured with matching timer values, as mismatched settings may result in BGP instability.

### Do VPN gateways initiate BGP peering sessions or connections?

VPN gateways initiate BGP peering sessions to the on-premises BGP peer IP addresses specified in the local network gateway resources by using the private IP addresses on the VPN gateways. This process is irrespective of whether the on-premises BGP IP addresses are in the APIPA range or are regular private IP addresses. If your on-premises VPN devices use APIPA addresses as the BGP IP, you need to configure your BGP speaker to initiate the connections.


### Can I configure forced tunneling?

Yes. See [Configure forced tunneling](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/vpn-gateway/vpn-gateway-about-forced-tunneling.md).

## <a name="nat"></a>NAT

### Is NAT supported on all Azure VPN Gateway SKUs?

NAT is supported on VpnGw2 to VpnGw5 and on VpnGw2AZ to VpnGw5AZ.

### Can I use NAT on VNet-to-VNet or P2S connections?

No.

### How many NAT rules can I use on a VPN gateway?

You can create up to 500 NAT rules (ingress and egress rules combined) on a VPN gateway.

### Can I use a slash (/) in a NAT rule name?

No. You'll receive an error.

### Is NAT applied to all connections on a VPN gateway?

NAT is applied to the connections that have NAT rules. If a connection doesn't have a NAT rule, NAT won't take effect on that connection. On the same VPN gateway, you can have some connections with NAT and other connections without NAT working together.

### What types of NAT do VPN gateways support?

VPN gateways support only static 1:1 NAT and dynamic NAT. They don't support NAT64.

### Does NAT work on active-active VPN gateways?

Yes. NAT works on both active-active and active-standby VPN gateways.
Each NAT rule is applied to a single instance of the VPN gateway. In active-active gateways, create a separate NAT rule for each gateway instance through the **IP configuration ID** field.

### Does NAT work with BGP connections?

Yes, you can use BGP with NAT. Here are some important considerations:

* To ensure that the learned routes and advertised routes are translated to post-NAT address prefixes (external mappings) based on the NAT rules associated with the connections, select **Enable BGP Route Translation** on the configuration page for NAT rules. The on-premises BGP routers must advertise the exact prefixes as defined in the **IngressSNAT** rules.

* If the on-premises VPN router uses a regular, non-APIPA address and it collides with the VNet address space or other on-premises network spaces, ensure that the **IngressSNAT** rule will translate the BGP peer IP to a unique, non-overlapped address. Put the post-NAT address in the **BGP peer IP address** field of the local network gateway.
* NAT isn't supported with BGP APIPA addresses.

### Do I need to create the matching DNAT rules for the SNAT rule?

No. A single source network address translation (SNAT) rule defines the translation for *both* directions of a particular network:

* An **IngressSNAT** rule defines the translation of the source IP addresses coming into the  VPN gateway from the on-premises network. It also handles the translation of the destination IP addresses leaving from the virtual network to the same on-premises network.

* An **EgressSNAT** rule defines the translation of the VNet source IP addresses leaving the VPN gateway to on-premises networks. It also handles the translation of the destination IP addresses for packets coming into the virtual network via the connections that have the **EgressSNAT** rule.

In either case, you don't need destination network address translation (DNAT) rules.

### What do I do if my VNet or local network gateway address space has two or more prefixes? Can I apply NAT to all of them or just a subset?

You need to create one NAT rule for each prefix, because each NAT rule can include only one address prefix for NAT. For example, if the address space for the local network gateway consists of 10.0.1.0/24 and 10.0.2.0/25, you can create two rules:

* **IngressSNAT** rule 1: Map 10.0.1.0/24 to 192.168.1.0/24.
* **IngressSNAT** rule 2: Map 10.0.2.0/25 to 192.168.2.0/25.

The two rules must match the prefix lengths of the corresponding address prefixes. The same guideline applies to **EgressSNAT** rules for the VNet address space.

> **Important:**
> If you link only one rule to the preceding connection, the other address space won't be translated.

### What IP ranges can I use for external mapping?

You can use any suitable IP range that you want for external mapping, including public and private IPs.

### Can I use different EgressSNAT rules to translate my VNet address space to different prefixes for on-premises networks?

Yes. You can create multiple **EgressSNAT** rules for the same VNet address space, and then apply the **EgressSNAT** rules to different connections.

### Can I use the same IngressSNAT rule on different connections?

Yes. You typically use the same **IngressSNAT** rule when the connections are for the same on-premises network, to provide redundancy. You can't use the same ingress rule if the connections are for different on-premises networks.

### Do I need both ingress and egress rules on a NAT connection?

You need both ingress and egress rules on the same connection when the on-premises network address space overlaps with the VNet address space. If the VNet address space is unique among all connected networks, you don't need the **EgressSNAT** rule on those connections. You can use the ingress rules to avoid address overlap among the on-premises networks.

### What do I choose as the IP configuration ID?

**IP configuration ID** is simply the name of the IP configuration object that you want the NAT rule to use. With this setting, you're simply choosing which gateway public IP address applies to the NAT rule. If you haven't specified any custom name at gateway creation time, the gateway's primary IP address is assigned to the **default** IP configuration, and the secondary IP is assigned to the **activeActive** IP configuration.


## <a name="vms"></a>Cross-premises connectivity and VMs

### If my virtual machine is in a virtual network and I have a cross-premises connection, how should I connect to the VM?

If you have RDP enabled for your VM, you can connect to your virtual machine by using the private IP address. In that case, you specify the private IP address and the port that you want to connect to (typically 3389). You need to configure the port on your virtual machine for the traffic.

You can also connect to your virtual machine by private IP address from another virtual machine that's located on the same virtual network. You can't RDP to your virtual machine by using the private IP address if you're connecting from a location outside your virtual network. For example, if you have a point-to-site virtual network configured and you don't establish a connection from your computer, you can't connect to the virtual machine by private IP address.

### If my virtual machine is in a virtual network with cross-premises connectivity, does all the traffic from my VM go through that connection?

No. Only the traffic that has a destination IP that's contained in the virtual network's local network IP address ranges that you specified goes through the virtual network gateway.

Traffic that has a destination IP located within the virtual network stays within the virtual network. Other traffic is sent through the load balancer to the public networks. Or if you use forced tunneling, the traffic is sent through the VPN gateway.

### How do I troubleshoot an RDP connection to a VM

If you're having trouble connecting to a virtual machine over your VPN connection, check the following items:

* Verify that your VPN connection is successful.
* Verify that you're connecting to the private IP address for the VM.
* If you can connect to the VM by using the private IP address but not the computer name, verify that you configured DNS properly. For more information about how name resolution works for VMs, see [Name resolution for resources in Azure virtual networks](../virtual-network/virtual-networks-name-resolution-for-vms-and-role-instances.md).

When you connect over point-to-site, check the following additional items:

* Use `ipconfig` to check the IPv4 address assigned to the Ethernet adapter on the computer from which you're connecting. If the IP address is within the address range of the virtual network that you're connecting to, or within the address range of your VPN client address pool, it's an overlapping address space. When your address space overlaps in this way, the network traffic doesn't reach Azure. It stays on the local network.
* Verify that the VPN client configuration package was generated after you specified the DNS server IP addresses for the virtual network. If you updated the DNS server IP addresses, generate and install a new VPN client configuration package.

For more information about troubleshooting an RDP connection, see [Troubleshoot Remote Desktop connections to a VM](https://learn.microsoft.com/troubleshoot/azure/virtual-machines/troubleshoot-rdp-connection).


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

For more information, see the [Configure customer-controlled gateway maintenance for VPN Gateway](customer-controlled-gateway-maintenance.md) article.

## Related content

* For more information about VPN Gateway, see [What is Azure VPN Gateway?](vpn-gateway-about-vpngateways.md)
* For more information about VPN Gateway configuration settings, see [About VPN Gateway configuration settings](vpn-gateway-about-vpn-gateway-settings.md).

**"OpenVPN" is a trademark of OpenVPN Inc.**
