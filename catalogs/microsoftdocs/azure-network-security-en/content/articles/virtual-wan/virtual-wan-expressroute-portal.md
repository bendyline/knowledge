---
title: 'Tutorial: Create an ExpressRoute association to Azure Virtual WAN'
description: In this tutorial, learn how to use Azure Virtual WAN to create ExpressRoute connections to Azure and on-premises environments.
author: duongau
ms.service: azure-virtual-wan
ms.topic: tutorial
ms.date: 12/12/2024
ms.author: duau
# Customer intent: As someone with a networking background, I want to connect my corporate on-premises network(s) to my VNets using Virtual WAN and ExpressRoute.
---
# Tutorial: Create an ExpressRoute association to Virtual WAN - Azure portal

This tutorial shows you how to use Virtual WAN to connect to your resources in Azure over an ExpressRoute circuit. For more conceptual information about ExpressRoute in Virtual WAN, see [About ExpressRoute in Virtual WAN](virtual-wan-expressroute-about.md). You can also create this configuration using the [PowerShell](expressroute-powershell.md) steps.

In this tutorial, you learn how to:

> 
> * Create a virtual WAN
> * Create a hub and a gateway
> * Connect a VNet to a hub
> * Connect a circuit to a hub gateway
> * Test connectivity
> * Change a gateway size
> * Advertise a default route

## Prerequisites

Verify that you've met the following criteria before beginning your configuration:

* You have a virtual network that you want to connect to. Verify that none of the subnets of your on-premises networks overlap with the virtual networks that you want to connect to. To create a virtual network in the Azure portal, see the [Quickstart](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/quick-create-portal.md).

* Your virtual network doesn't have any virtual network gateways. If your virtual network has a gateway (either VPN or ExpressRoute), you must remove all gateways. This configuration requires that virtual networks are connected instead to the Virtual WAN hub gateway.

* Obtain an IP address range for your hub region. The hub is a virtual network that is created and used by Virtual WAN. The address range that you specify for the hub can't overlap with any of your existing virtual networks that you connect to. It also can't overlap with your address ranges that you connect to on-premises. If you're unfamiliar with the IP address ranges located in your on-premises network configuration, coordinate with someone who can provide those details for you.

* The following ExpressRoute circuit SKUs can be connected to the hub gateway: Local, Standard, and Premium.

* If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

* If you plan to remove Azure BGP communities from virtual network and UDR routes, don't advertise these routes back into Azure, as this causes routing issues. We don't recommend advertising Azure routes back into Azure.

## <a name="openvwan"></a>Create a virtual WAN


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


## <a name="hub"></a>Create a virtual hub and gateway

In this section, you'll create an ExpressRoute gateway for your virtual hub. You can either create the gateway when you [create a new virtual hub](#newhub), or you can create the gateway in an [existing hub](#existinghub) by editing it.


### <a name="newhub"></a>To create a new virtual hub and a gateway

Create a new virtual hub. Once a hub is created, you'll be charged for the hub, even if you don't attach any sites.

#### Basics page


1. Go to the virtual WAN that you created. On the virtual WAN page left pane, under the **Connectivity**, select **Hubs**.

1. On the **Hubs** page, select **+New Hub** to open the **Create virtual hub** page.

   Screenshot shows the Create virtual hub pane with the Basics tab selected.

1. On the **Create virtual hub** page **Basics** tab, complete the following fields:

   * **Region**: Select the region in which you want to deploy the virtual hub.
   * **Name**: The name by which you want the virtual hub to be known.
   * **Hub private address space**: The hub's address range in CIDR notation. The minimum address space is /24 to create a hub.
   * **Virtual hub capacity**: Select from the dropdown. For more information, see [Virtual hub settings](https://learn.microsoft.com/azure/virtual-wan/hub-settings).
   * **Hub routing preference**: Leave the setting as the default, **ExpressRoute** unless you have a specific need to change this field. For more information, see [Virtual hub routing preference](https://learn.microsoft.com/azure/virtual-wan/about-virtual-hub-routing-preference).


#### ExpressRoute page

1. Select **ExpressRoute** to open the ExpressRoute page. Select **Yes** to reveal ExpressRoute configuration settings. Fill out the necessary fields. For information about gateway scale units, see the [FAQ](virtual-wan-faq.md#what-are-virtual-wan-gateway-scale-units).

   Screenshot shows the ExpressRoute tab where you can enter values.

1. Select **Review + Create** to validate.
1. Select **Create** to create the hub with an ExpressRoute gateway. A hub can take about 30 minutes to complete. After 30 minutes, **Refresh** to view the hub on the **Hubs** page. Select **Go to resource** to navigate to the resource.

### <a name="existinghub"></a>To create a gateway in an existing hub

You can also create a gateway in an existing hub by editing the hub.

1. Go to the virtual WAN.
1. In the left pane, select **Hubs**.
1. On the **Virtual WAN | Hubs** page, select the hub that you want to edit.
1. On the **Virtual HUB** page, at the top of the page, select **Edit virtual hub**.
1. On the **Edit virtual hub** page, select the checkbox **Include ExpressRoute gateway** and adjust any other settings that you require.
1. Select **Confirm** to confirm your changes. It takes about 30 minutes for the hub and hub resources to fully create.

### To view a gateway

Once you've created an ExpressRoute gateway, you can view gateway details. Navigate to the hub, select **ExpressRoute**, and view the gateway.

Screenshot shows viewing a gateway.

## <a name="connectvnet"></a>Connect your VNet to the hub

In this section, you create the peering connection between your hub and a VNet. Repeat these steps for each VNet that you want to connect.

1. On the page for your virtual WAN, select **Virtual network connection**.
2. On the virtual network connection page, select **+Add connection**.
3. On the **Add connection** page, fill in the following fields:

    * **Connection name** - Name your connection.
    * **Hubs** - Select the hub you want to associate with this connection.
    * **Subscription** - Verify the subscription.
    * **Virtual network** - Select the virtual network you want to connect to this hub. The virtual network can't have an already existing virtual network gateway (i.e. VPN, ExpressRoute).

## <a name="connectcircuit"></a>Connect your circuit to the hub gateway

Once the gateway is created, you can connect an [ExpressRoute circuit](../expressroute/expressroute-howto-circuit-portal-resource-manager.md) to it.

### To connect the circuit to the hub gateway

First, verify that your circuit's peering status is provisioned in the **ExpressRoute circuit -> Peerings** page in Portal. Then, go to the **Virtual hub -> Connectivity -> ExpressRoute** page. If you have access in your subscription to an ExpressRoute circuit, you'll see the circuit you want to use in the list of circuits. If you don’t see any circuits, but have been provided with an authorization key and peer circuit URI, you can redeem and connect a circuit. See [To connect by redeeming an authorization key](#authkey).

1. Select the circuit.
1. Select **Connect circuit(s)**.

### <a name="authkey"></a>To connect by redeeming an authorization key

Use the authorization key and circuit URI you were provided in order to connect.

1. On the ExpressRoute page, select **+Redeem authorization key**
2. On the Redeem authorization key page, fill in the values.
3. Select **Add** to add the key.
4. View the circuit. A redeemed circuit only shows the name (without the type, provider and other information) because it is in a different subscription than that of the user.

## To test connectivity

After the circuit connection is established, the hub connection status will indicate 'this hub', implying the connection is established to the hub ExpressRoute gateway. Wait approximately 5 minutes before you test connectivity from a client behind your ExpressRoute circuit, for example, a VM in the VNet that you created earlier.

To test failover after you establish connectivity, see [ExpressRoute Gateway Resiliency Validation](../expressroute/resiliency-validation.md). Resiliency Validation is in preview for Virtual WAN and requires connections to circuits in at least two distinct peering locations. Unlike the connectivity check, a resiliency validation test temporarily disconnects the gateway from the selected circuit and can interrupt traffic on nonredundant routes. Review the prerequisites and test warnings before starting.

## To change the size of a gateway

If you want to change the size of your ExpressRoute gateway, locate the ExpressRoute gateway inside the hub, and select the scale units from the dropdown. Save your change. It will take approximately 30 minutes to update the hub gateway.

## To advertise default route 0.0.0.0/0 to endpoints

If you would like the Azure virtual hub to advertise the default route 0.0.0.0/0 to your ExpressRoute end points, you'll need to enable 'Propagate default route'.

1. Select your **Circuit ->…-> Edit connection**.

   Screenshot shows Edit ExpressRoute Gateway page.
1. Select **Enable** to propagate the default route.


## To see your Virtual WAN connection from the ExpressRoute circuit blade

Navigate to the **Connections** page for your ExpressRoute circuit to see each ExpressRoute gateway that your ExpressRoute circuit is connected to. If the gateway is in a different subscription than the circuit, then the **Peer** field will be the circuit authorization key.
   Screenshot shows the initial container page.

## Enable or disable VNet to Virtual WAN traffic over ExpressRoute

By default, VNet to Virtual WAN traffic is disabled over ExpressRoute. You can enable this connectivity by using the following steps.

1. In the "Edit virtual hub" blade, enable **Allow traffic from non Virtual WAN networks**.
1. In the **Virtual network gateway** blade, enable **Allow traffic from remote Virtual WAN networks**. See [Enable VNet-to-VNet or VNet-to-Virtual WAN traffic](../expressroute/expressroute-howto-add-gateway-portal-resource-manager.md#enable-or-disable-vnet-to-vnet-or-vnet-to-virtual-wan-traffic-through-expressroute).

We recommend that you keep these toggles disabled and instead create a Virtual Network connection between the standalone virtual network and Virtual WAN hub. This offers better performance and lower latency, as conveyed in our [FAQ.](virtual-wan-faq.md#when-theres-an-expressroute-circuit-connected-as-a-bow-tie-to-a-virtual-wan-hub-and-a-standalone-vnet-what-is-the-path-for-the-standalone-vnet-to-reach-the-virtual-wan-hub)

## <a name="modify"></a> Modify an ExpressRoute circuit

You can modify certain properties of an ExpressRoute circuit without impacting connectivity. Learn more about [Modifying an ExpressRoute circuit](../expressroute/expressroute-howto-circuit-portal-resource-manager.md#modify).

## <a name="delete-connection"></a> Delete your ExpressRoute Connection to the hub
When deleting an ExpressRoute connection to a Virtual WAN hub, you can delete the ExpressRoute Connection by navigating to:
* The circuit connected to the hub: Your Virtual WAN -> Hubs -> The Relevant Hub -> Overview -> ExpressRoute -> Select the relevant circuit -> Connections -> Select the relevant connection -> Delete
* The ExpressRoute Gateway in the hub: Your Virtual WAN -> Hubs -> The Relevant Hub -> Overview -> ExpressRoute -> Select the ExpressRoute gateway link in the top right -> ExpressRoute Connections -> Select the relevant connection -> Delete

Make sure to review the following guidance for your ExpressRoute Connections as well:
* Review how you'd like to manage your connection authorization keys. Learn more about [Managing ExpressRoute circuit authorization keys](../expressroute/expressroute-howto-linkvnet-portal-resource-manager.md#circuit-owner-operations).

> **Note:**
> If you encounter difficulties when deleting ExpressRoute connections, try using alternative deletion methods. You can delete connections through the Azure portal, PowerShell, or Azure CLI. Using a different method may resolve any transient issues you experience during the deletion process.
>

## <a name="delete-circuit"></a> Deprovision and delete your ExpressRoute Circuit

You can deprovision and delete your ExpressRoute Circuit by following the steps in [Deprovisioning and deleting an ExpressRoute circuit](../expressroute/expressroute-howto-circuit-portal-resource-manager.md#delete).

## <a name="cleanup"></a>Clean up resources

When you no longer need the resources that you created, delete them. Some of the Virtual WAN resources must be deleted in a certain order due to dependencies. Deleting can take about 30 minutes to complete.


1. Open the virtual WAN that you created.

1. Select a virtual hub associated to the virtual WAN to open the hub page.

1. Delete all gateway entities following the below order for each gateway type. This can take 30 minutes to complete.

   **VPN:**  
   * Disconnect VPN sites  
   * Delete VPN connections  
   * Delete VPN gateways  

   **ExpressRoute:**  
   * Delete ExpressRoute connections  
   * Delete ExpressRoute gateways

1. Repeat for all hubs associated to the virtual WAN.

1. You can either delete the hubs at this point, or delete the hubs later when you delete the resource group.

1. Navigate to the resource group in the Azure portal.

1. Select **Delete resource group**. This deletes the other resources in the resource group, including the hubs and the virtual WAN.

## Next steps

Next, to learn more about ExpressRoute in Virtual WAN, see:

> 
> * [About ExpressRoute in Virtual WAN](virtual-wan-expressroute-about.md)
