---
title: 'About NAT (Network Address Translation) on VPN Gateway'
titleSuffix: Azure VPN Gateway
description: Learn about NAT (Network Address Translation) in Azure VPN to connect networks with overlapping address spaces.
author: duongau
ms.service: azure-vpn-gateway
ms.topic: concept-article
ms.date: 10/16/2024
ms.author: duau
ms.custom: template-concept
# Customer intent: As a network administrator, I want to configure NAT on a VPN gateway, so that I can connect multiple networks with overlapping IP addresses and avoid communication failures.
---
# About NAT on Azure VPN Gateway

This article provides an overview of NAT (Network Address Translation) support in Azure VPN Gateway. NAT defines the mechanisms to translate one IP address to another in an IP packet. There are multiple scenarios for NAT:

* Connect multiple networks with overlapping IP addresses
* Connect from networks with private IP addresses (RFC1918) to the Internet (Internet breakout)
* Connect IPv6 networks to IPv4 networks (NAT64)

> **Important:**
> Azure VPN Gateway NAT supports the first scenario to connect on-premises networks or branch offices to an Azure virtual network with overlapping IP addresses. Internet breakout and NAT64 are **NOT** supported.

## <a name="why"></a>Overlapping address spaces

Organizations commonly use private IP addresses defined in RFC1918 for internal communication in their private networks. When these networks are connected using VPN over the Internet or across private WAN, the address spaces **must not** overlap otherwise the communication would fail. To connect two or more networks with overlapping IP addresses, NAT is deployed on the gateway devices connecting the networks.

## <a name="type"></a>NAT type: static & dynamic

NAT on a gateway device translates the source and/or destination IP addresses, based on the NAT policies or rules to avoid address conflict. There are different types of NAT translation rules:

* **Static NAT**: Static rules define a fixed address mapping relationship. For a given IP address, it will be mapped to the same address from the target pool. The mappings for static rules are stateless because the mapping is fixed.

* **Dynamic NAT**: For dynamic NAT, an IP address can be translated to different target IP addresses based on availability, or with a different combination of IP address and TCP/UDP port. The latter is also called NAPT, Network Address and Port Translation. Dynamic rules will result in stateful translation mappings depending on the traffic flows at any given time.

> **Note:**
> When Dynamic NAT rules are used, traffic is unidirectional which means communication must be initiated from the site that is represented in the Internal Mapping field of the rule. If traffic is initiated from the External Mapping, the connection will not be established. If you require bidirectional traffic initiation, then use a static NAT rule to define a 1:1 mapping.

Another consideration is the address pool size for translation. If the target address pool size is the same as the original address pool, use static NAT rule to define a 1:1 mapping in a sequential order. If the target address pool is smaller than the original address pool, use dynamic NAT rule to accommodate the differences.

> **Important:**
> * NAT is supported on the following SKUs: VpnGw2~5, VpnGw2AZ~5AZ.
> * NAT is supported on IPsec cross-premises connections only. VNet-to-VNet connections or P2S connections are not supported.
> * Every Dynamic NAT rule can be assigned to a single connection.

## <a name="mode"></a>NAT mode: ingress & egress

Each NAT rule defines an address mapping or translating relationship for the corresponding network address space:

* Ingress: An **IngressSNAT** rule maps an on-premises network address space to a translated address space to avoid address overlap.

* Egress: An **EgressSNAT** rule maps the Azure VNet address space to another translated address space. 

For each NAT rule, the following two fields specify the address spaces before and after the translation:

* **Internal Mappings**: The address space **before** the translation. For an ingress rule, this field corresponds to the original address space of the on-premises network. For an egress rule, this is the original VNet address space.

* **External Mappings**: The address space **after** the translation for on-premises networks (ingress) or VNet (egress). For different networks connected to an Azure VPN gateway, the address spaces for all **External Mappings** must not overlap with each other and with the networks connected without NAT.

## <a name="routing"></a>NAT and routing

Once a NAT rule is defined for a connection, the effective address space for the connection will change with the rule. If BGP is enabled on the Azure VPN gateway, select the "Enable BGP Route Translation" to automatically convert the routes learned and advertised on connections with NAT rules:

* Learned routes: The destination prefixes of the routes learned over a connection with the IngressSNAT rules will be translated from the Internal Mapping prefixes (pre-NAT) to the External Mapping prefixes (post-NAT) of those rules.

* Advertised routes: Azure VPN gateway will advertise the External Mapping (post-NAT) prefixes of the EgressSNAT rules for the VNet address space, and the learned routes with post-NAT address prefixes from other connections.

* BGP peer IP address consideration for a NAT'ed on-premises network:
   * APIPA (169.254.0.1 to 169.254.255.254) address: NAT isn't supported with BGP APIPA addresses.
   * Non-APIPA address: Exclude the BGP Peer IP addresses from the NAT range.

> **Note:**
> The learned routes on connections without IngressSNAT rules will not be converted. The VNet routes advertised to connections without EgressSNAT rules will also not be converted.
>

## <a name="example"></a>NAT example

The following diagram shows an example of Azure VPN NAT configurations:

Diagram showing NAT configuration and rules.

The diagram shows an Azure VNet and two on-premises networks, all with address space of 10.0.1.0/24. To connect these two networks to the Azure VNet and VPN gateway, create the following rules:

* IngressSNAT rule 1: This rule translates the on-premises address space 10.0.1.0/24 192.168.2.0/24.

* IngressSNAT rule 2: This rule translates the on-premises address space 10.0.1.0/24 to 192.168.3.0/24.

* EgressSNAT rule 1: This rule translates the VNet address space 10.0.1.0/24 to 192.168.1.0/24.

In the diagram, each connection resource has the following rules:

* Connection 1 (VNet-Branch1):
  * IngressSNAT rule 1
  * EgressSNAT rule 1

* Connection 2 (VNet-Branch2)
  * IngressSNAT rule 2
  * EgressSNAT rule 1

Based on the rules associated with the connections, here are the address spaces for each network:

| Network | Original | Translated |
| --- | --- | --- |
| VNet | 10.0.1.0/24 | 192.168.1.0/24 |
| Branch 1 | 10.0.1.0/24 | 192.168.2.0/24 |
| Branch 2 | 10.0.1.0/24 | 192.168.3.0/24 |

The following diagram shows an IP packet from Branch 1 to VNet, before and after the NAT translation:

Diagram showing before and after NAT translation.

> **Important:**
> A single SNAT rule defines the translation for **both** directions of a particular network:
>
> * An IngressSNAT rule defines the translation of the source IP addresses coming **into** the Azure VPN gateway from the on-premises network. It also handles the translation of the destination IP addresses leaving from the VNet to the same on-premises network.
> * An EgressSNAT rule defines the translation of the source IP addresses leaving the Azure VPN gateway to on-premises networks. It also handles the translation of the destination IP addresses for packets coming into the VNet via those connections with the EgressSNAT rule.
> * In either case, no **DNAT** rules are needed.

## <a name="config"></a>NAT configuration

To implement the NAT configuration shown in the previous section, first create the NAT rules in your Azure VPN gateway, then create the connections with the corresponding NAT rules associated. See [Configure NAT on Azure VPN gateways](nat-howto.md) for steps to configure NAT for your cross-premises connections.

## NAT limitations and considerations


> **Important:**
> There are a few constraints for the NAT feature.

* NAT is supported on the following SKUs: VpnGw2~5, VpnGw2AZ~5AZ.
* NAT is supported for IPsec/IKE cross-premises connections only. VNet-to-VNet connections or P2S connections aren't supported.
* NAT rules aren't supported on connections that have Use Policy Based Traffic Selectors enabled and Policy-based VPNs. NAT rules are supported only on Route-based VPNs.
* The maximum supported external mapping subnet size for Dynamic NAT is /26.
* Port mappings can be configured with Static NAT types only. Dynamic NAT scenarios aren't applicable for port mappings.
* Port mappings can't take ranges at this time. Individual port needs to be entered.
* Port mappings can be used for both TCP and UDP protocols.


## <a name="faq"></a>NAT FAQ

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


## Next steps

See [Configure NAT on Azure VPN gateways](nat-howto.md) for steps to configure NAT for your cross-premises connections.
