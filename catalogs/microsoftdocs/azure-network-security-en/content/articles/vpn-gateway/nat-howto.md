---
title: 'Configure NAT on VPN Gateway'
titleSuffix: Azure VPN Gateway
description: Learn how to configure NAT for Azure VPN Gateway.
author: duongau
ms.service: azure-vpn-gateway
ms.topic: how-to
ms.date: 10/16/2024
ms.author: duau
ms.custom: sfi-image-nochange

# Customer intent: As a network engineer, I want to configure NAT settings on a VPN gateway, so that I can manage IP address translations for seamless connectivity between overlapping networks.
---
# How to configure NAT for Azure VPN Gateway

This article helps you configure NAT (Network Address Translation) for Azure VPN Gateway using the Azure portal.

## <a name="about"></a>About NAT

NAT defines the mechanisms to translate one IP address to another in an IP packet. It's commonly used to connect networks with overlapping IP address ranges. NAT rules or policies on the gateway devices connecting the networks specify the address mappings for the address translation on the networks.

For more information about NAT support for Azure VPN Gateway, see [About NAT and Azure VPN Gateway](nat-overview.md).

> **Important:**
> * NAT is supported on the following SKUs: VpnGw2~5, VpnGw2AZ~5AZ.

## Getting started

Each part of this article helps you form a basic building block for configuring NAT in your network connectivity. If you complete all three parts, you build the topology as shown in Diagram 1.

### <a name="diagram"></a>Diagram 1

Diagram showing NAT configuration and rules.

### Prerequisites

Verify that you have an Azure subscription. If you don't already have an Azure subscription, you can activate your [MSDN subscriber benefits](https://azure.microsoft.com/pricing/member-offers/msdn-benefits-details/) or sign up for a [free account](https://azure.microsoft.com/pricing/free-trial/).

## <a name ="vnet"></a>Part 1: Create VNet and gateways

In this section, you create a virtual network, a VPN gateway, and the local network gateway resources to correspond to the resources shown in [Diagram 1](#diagram). To create these resources, you can use the steps in the [Site-to-Site Tutorial](tutorial-site-to-site-portal.md) article. Complete the following sections of the article, but don't create any connections.

* [VNet](tutorial-site-to-site-portal.md#CreateVNet)
* [VPN gateway](tutorial-site-to-site-portal.md#VNetGateway)
* [Local network gateway](tutorial-site-to-site-portal.md#LocalNetworkGateway)
* [Configure your VPN device](tutorial-site-to-site-portal.md#VPNDevice)

> **Important:**
> Don't create any connections. If you try to create connection resources, the operation fails because the IP address spaces are the same between the VNet, Branch1, and Branch2. You'll create connection resources later in this article.

The following screenshots show examples of the resources to create.

* **VNet**

   Screenshot showing VNet address space.
* **VPN gateway**

   Screenshot showing the gateway.

* **Branch1 local network gateway**

   Screenshot showing Branch1 local network gateway.

* **Branch2 local network gateway**

   Screenshot showing Branch2 local network gateway.

## <a name ="nat-rules"></a>Part 2: Create NAT rules

Before you create connections, you must create and save NAT rules on the VPN gateway. The following table shows the required NAT rules. Refer to [Diagram 1](#diagram) for the topology.

**NAT rules table**

| Name | Type | Mode | Internal | External | Connection |
| --- | --- | --- | --- | --- | --- |
| VNet | Static | EgressSNAT | 10.0.1.0/24 | 192.168.1.0/24 | Both connections |
| Branch1 | Static | IngressSNAT | 10.0.1.0/24 | 192.168.2.0/24 | Branch1 connection |
| Branch2 | Static | IngressSNAT | 10.0.1.0/24 | 192.168.3.0/24 | Branch2 connection |

Use the following steps to create all the NAT rules on the VPN gateway. If you're using BGP, select **Enable** for the Enable Bgp Route Translation setting.

1. In the Azure portal, navigate to the **Virtual Network Gateway** resource page and select **NAT Rules** from the left pane.
1. Using the **NAT rules table**, fill in the values. If you're using BGP, select **Enable** for the **Enable Bgp Route Translation** setting.

   Screenshot showing NAT rules.
1. Click **Save** to save the NAT rules to the VPN gateway resource. This operation can take up to 10 minutes to complete.

## <a name ="connections"></a>Part 3: Create connections and link NAT rules

In this section, you create the connections and associate the NAT rules in the same step. Note that if you create the connection objects first, without linking the NAT rules at the same time, the operation fails because the IP address spaces are the same between the VNet, Branch1, and Branch2.

The connections and the NAT rules are specified in the sample topology shown in [Diagram 1](#diagram).

1. Go to the VPN gateway.
1. On the **Connections** page, select **+Add** to open the **Add connection** page.
1. On the **Add connection** page, fill in the values for the VNet-Branch1 connection, specifying the associated NAT rules, as shown in the following screenshot. For Ingress NAT rules, select Branch1. For Egress NAT rules, select VNet. If you are using BGP, you can select **Enable BGP**.

   Screenshot showing the VNet-Branch1 connection.
1. Click **OK** to create the connection.
1. Repeat the steps to create the VNet-Branch2 connection. For Ingress NAT rules, select Branch2. For Egress NAT rules, select VNet.
1. After configuring both connections, your configuration should look similar to the following screenshot. The status changes to **Connected** when the connection is established.

   Screenshot showing all connections.

1. When you have completed the configuration, the NAT rules look similar to the following screenshot, and you'll have a topology that matches the topology shown in [Diagram 1](#diagram). Notice that the table now shows the connections that are linked with each NAT rule.

   If you want to enable BGP Route Translation for your connections, select **Enable** then click **Save**.

   Screenshot showing the NAT rules.

## NAT limitations


> **Important:**
> There are a few constraints for the NAT feature.

* NAT is supported on the following SKUs: VpnGw2~5, VpnGw2AZ~5AZ.
* NAT is supported for IPsec/IKE cross-premises connections only. VNet-to-VNet connections or P2S connections aren't supported.
* NAT rules aren't supported on connections that have Use Policy Based Traffic Selectors enabled and Policy-based VPNs. NAT rules are supported only on Route-based VPNs.
* The maximum supported external mapping subnet size for Dynamic NAT is /26.
* Port mappings can be configured with Static NAT types only. Dynamic NAT scenarios aren't applicable for port mappings.
* Port mappings can't take ranges at this time. Individual port needs to be entered.
* Port mappings can be used for both TCP and UDP protocols.


## Next steps

Once your connection is complete, you can add virtual machines to your virtual networks. See [Create a Virtual Machine](https://learn.microsoft.com/azure/virtual-machines/windows/quick-create-portal) for steps.
