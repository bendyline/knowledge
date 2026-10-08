---
title: 'Virtual WAN: Create virtual hub route table to NVA: Azure portal'
description: Virtual WAN virtual hub route table to steer traffic to a network virtual appliance using the portal.
services: virtual-wan
author: duongau
ms.service: azure-virtual-wan
ms.topic: how-to
ms.date: 03/27/2025
ms.author: duau
ms.custom: sfi-image-nochange
# Customer intent: As someone with a networking background, I want to create a route table using the portal.
---

# Create a Virtual WAN hub route table for NVAs: Azure portal

This article shows you how to steer traffic from a branch (on-premises site) connected to the Virtual WAN hub to a Spoke virtual network (VNet) via a Network Virtual Appliance (NVA).

Screenshot of Virtual WAN diagram.

## Before you begin

Verify that you have met the following criteria:

* You have a Network Virtual Appliance (NVA). A Network Virtual Appliance is a third-party software of your choice that is typically provisioned from Azure Marketplace in a virtual network.

  * A private IP address must be assigned to the NVA network interface.

  * The NVA isn't deployed in the virtual hub. It must be deployed in a separate virtual network.

  * The NVA virtual network can have one or many virtual networks connected to it. In this article, we refer to the NVA virtual network as an 'indirect spoke VNet'. These virtual networks can be connected to the NVA VNet by using VNet peering. The VNet Peering links are depicted by black arrows in the previous figure between VNet 1, VNet 2, and NVA VNet.

* You have created two virtual networks. They'll be used as spoke VNets.

  * The VNet spoke address spaces are: VNet1: 10.0.2.0/24 and VNet2: 10.0.3.0/24. If you need information on how to create a virtual network, see [Create a virtual network](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/quick-create-portal.md).

  * Ensure there are no virtual network gateways in any of the VNets.

  * The VNets don't require a gateway subnet.

## <a name="signin"></a>1. Sign in

From a browser, navigate to the [Azure portal](https://portal.azure.com) and sign in with your Azure account.

## <a name="vwan"></a>2. Create a virtual WAN

Create a virtual WAN. You can use the following example values, or replace with your own.

* **Virtual WAN name:** myVirtualWAN
* **Resource group:** testRG
* **Location:** West US


1. In the portal, in the **Search resources** bar, type **Virtual WAN** in the search box and select **Enter**.

1. Select **Virtual WANs** from the results. On the Virtual WANs page, select **+ Create** to open the **Create WAN** page.

1. On the **Create WAN** page, on the **Basics** tab, fill in the fields. Modify the example values to apply to your environment.

   Screenshot shows the Create WAN pane with the Basics tab selected.

   * **Subscription**: Select the subscription that you want to use.
   * **Resource group**: Create new or use existing.
   * **Resource group location**: Choose a resource location from the dropdown. A WAN is a global resource and doesn't live in a particular region. However, you must select a region in order to manage and locate the WAN resource that you create.
   * **Name**: Type the Name that you want to call your virtual WAN.
   * **Type**: Basic or Standard. Select **Standard**. If you select Basic, understand that Basic virtual WANs can only contain Basic hubs. Basic hubs can only be used for site-to-site connections.

1. After you finish filling out the fields, at the bottom of the page, select **Review +Create**.

1. Once validation passes, click **Create** to create the virtual WAN.


## <a name="hub"></a>3. Create a hub

Create the hub. You can use the following example values, or replace with your own.

* **Location:** West US
* **Name:** westushub
* **Hub private address space:** 10.0.1.0/24


1. Go to the virtual WAN that you created. On the virtual WAN page left pane, under the **Connectivity**, select **Hubs**.

1. On the **Hubs** page, select **+New Hub** to open the **Create virtual hub** page.

   Screenshot shows the Create virtual hub pane with the Basics tab selected.

1. On the **Create virtual hub** page **Basics** tab, complete the following fields:

   * **Region**: Select the region in which you want to deploy the virtual hub.
   * **Name**: The name by which you want the virtual hub to be known.
   * **Hub private address space**: The hub's address range in CIDR notation. The minimum address space is /24 to create a hub.
   * **Virtual hub capacity**: Select from the dropdown. For more information, see [Virtual hub settings](https://learn.microsoft.com/azure/virtual-wan/hub-settings).
   * **Hub routing preference**: Leave the setting as the default, **ExpressRoute** unless you have a specific need to change this field. For more information, see [Virtual hub routing preference](https://learn.microsoft.com/azure/virtual-wan/about-virtual-hub-routing-preference).


## <a name="route"></a>4. Create and apply a hub route table

Update the hub with a hub route table. Use the following example values:

* **Spoke VNet address spaces:** (VNet1 and VNet2) 10.0.2.0/24 and 10.0.3.0/24
* **DMZ NVA network interface private IP address:** 10.0.4.5

1. Navigate to your virtual WAN.
1. Click the hub for which you want to create a route table.
1. Click the **...**, and then click **Edit virtual hub**.
1. On the **Edit virtual hub** page, scroll down and select the checkbox **Use table for routing**.
1. In the **If destination prefix is** column, add the address spaces. In the **Send to next hop** column, add the DMZ NVA network interface private IP address.

   > **Note:**
   > The DMZ NVA network is applicable to the local hub.

1. Click **Confirm** to update the hub resource with the route table settings.

## <a name="connections"></a>5. Create the VNet connections

Create a virtual network connection from each indirect spoke VNet (VNet1 and VNet2) to the hub. These virtual network connections are depicted by the blue arrows in the previous figure. Then, create a VNet connection from the NVA VNet to the hub (black arrow in the figure).

 For this step, you can use the following values:

| Virtual network name | Connection name |
| --- | --- |
| VNet1 | testconnection1 |
| VNet2 | testconnection2 |
| NVAVNet | testconnection3 |

Repeat the following procedure for each virtual network that you want to connect.

1. On the page for your virtual WAN, click **Virtual network connections**.
1. On the virtual network connection page, click **+Add connection**.
1. On the **Add connection** page, fill in the following fields:

    * **Connection name** - Name your connection.
    * **Hubs** - Select the hub you want to associate with this connection.
    * **Subscription** - Verify the subscription.
    * **Virtual network** - Select the virtual network you want to connect to this hub. The virtual network can't have an already existing virtual network gateway.
1. Click **OK** to create the connection.

## Next steps

To learn more about Virtual WAN, see the [Virtual WAN Overview](virtual-wan-about.md) page.
