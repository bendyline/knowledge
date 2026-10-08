---
title: Configure and manage Azure Route Server
description: Learn how to configure and manage Azure Route Server using the Azure portal, Azure PowerShell, or Azure CLI.
author: duongau
ms.author: duau
ms.service: azure-route-server
ms.topic: how-to
ms.date: 09/17/2025
---

# Configure and manage Azure Route Server

This article shows you how to configure and manage Azure Route Server using the Azure portal, Azure PowerShell, or Azure CLI. You learn how to add and remove Border Gateway Protocol (BGP) peers, configure route exchange with virtual network gateways, and manage routing preferences.

## Prerequisites

# [**Portal**](#tab/portal)

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

- A route server.

# [**PowerShell**](#tab/powershell)

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

- A route server.

- Azure Cloud Shell or Azure PowerShell.

    The steps in this article run the Azure PowerShell cmdlets interactively in [Azure Cloud Shell](https://learn.microsoft.com/azure/cloud-shell/overview). To run the cmdlets in the Cloud Shell, select **Open Cloud Shell** at the upper-right corner of a code block. Select **Copy** to copy the code and then paste it into Cloud Shell to run it. You can also run the Cloud Shell from within the Azure portal.

    You can also [install Azure PowerShell locally](https://learn.microsoft.com/powershell/azure/install-azure-powershell) to run the cmdlets. If you run PowerShell locally, sign in to Azure using the [Connect-AzAccount](https://learn.microsoft.com/powershell/module/az.accounts/connect-azaccount) cmdlet.

# [**Azure CLI**](#tab/cli)

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

- A route server.

- Azure Cloud Shell or Azure CLI.

    The steps in this article run the Azure CLI commands interactively in [Azure Cloud Shell](https://learn.microsoft.com/azure/cloud-shell/overview). To run the commands in the Cloud Shell, select **Open Cloud Shell** at the upper-right corner of a code block. Select **Copy** to copy the code, and paste it into Cloud Shell to run it. You can also run the Cloud Shell from within the Azure portal.

    You can also [install Azure CLI locally](https://learn.microsoft.com/cli/azure/install-azure-cli) to run the commands. If you run Azure CLI locally, sign in to Azure using the [az login](https://learn.microsoft.com/cli/azure/reference-index#az-login) command.

---

## Add a BGP peer

In this section, you learn how to add a BGP peering between your route server and a network virtual appliance (NVA). This establishes a BGP session that allows the route server and NVA to exchange routing information.

# [**Portal**](#tab/portal)

1. Go to the route server that you want to peer with an NVA.

1. under **Settings**, select **Peers**. 

1. Select **+ Add** to add a new peer.

1. On the **Add Peer** page, enter the following information:

    | Setting | Value |
    | --- | --- |
    | Name | A name to identify the peer. It doesn't have to be the same name of the NVA. |
    | ASN | The Autonomous System Number (ASN) of the NVA. For more information, see [What Autonomous System Numbers (ASNs) can I use?](route-server-faq.md#what-autonomous-system-numbers-asns-can-i-use) |
    | IPv4 Address | The private IP address of the NVA. |

1. Select **Add** to save the configuration.

    Screenshot that shows how to add the NVA to the route server as a peer.

    Once the peer NVA is successfully added, you can see it in the list of peers with a **Succeeded** provisioning state.

    Screenshot that shows the route server's peers.

    To complete the peering setup, you must configure the NVA to establish a BGP session with the route server using its IP addresses and ASN. You can find the route server's IP addresses and ASN in the **Overview** page:

    Screenshot that shows the Overview page of a route server.&#x20;

    > **Important:**
> Peer the NVA with both route server instance IPs to ensure virtual network routes are advertised over the NVA connections and achieve high availability.


# [**PowerShell**](#tab/powershell)

Use [Add-AzRouteServerPeer](https://learn.microsoft.com/powershell/module/az.network/add-azrouteserverpeer) cmdlet to add a new peer to the route server.

```azurepowershell-interactive
Add-AzRouteServerPeer -PeerName 'myNVA' -PeerAsn '65001' -PeerIp '10.0.0.4' -ResourceGroupName 'myResourceGroup' -RouteServerName 'myRouteServer'
```

| Parameter | Value |
| --- | --- |
| `-PeerName` | A name to identify the peer. It doesn't have to be the same name of the NVA. |
| `-PeerAsn` | The Autonomous System Number (ASN) of the NVA. For more information, see [What Autonomous System Numbers (ASNs) can I use?](route-server-faq.md#what-autonomous-system-numbers-asns-can-i-use) |
| `-PeerIp` | The private IP address of the NVA. |
| `-ResourceGroupName` | The resource group name of your route server. |
| `-RouteServerName` | The route server name. This parameter is required when there are more than one route server in the same resource group. |

After you successfully add the peer NVA, you must configure the NVA to establish a BGP session with the route server's peer IPs and ASN. Use [Get-AzRouteServer](https://learn.microsoft.com/powershell/module/az.network/get-azrouteserver) cmdlet to find the route server's peer IPs and ASN:

```azurepowershell-interactive
Get-AzRouteServer -ResourceGroupName 'myResourceGroup' -RouteServerName 'myRouteServer'
```

| Parameter | Value |
| --- | --- |
| `-ResourceGroupName` | The resource group name of your route server. |
| `-RouteServerName` | The route server name. You need this parameter when there are more than one route server in the same resource group. |

> **Important:**
> Peer the NVA with both route server instance IPs to ensure virtual network routes are advertised over the NVA connections and achieve high availability.


# [**Azure CLI**](#tab/cli)

Use [az network routeserver peering create](https://learn.microsoft.com/cli/azure/network/routeserver/peering#az-network-routeserver-peering-create) command to add a new peer to the route server.

```azurecli-interactive
az network routeserver peering create --name 'myNVA' --peer-asn '65001' --peer-ip '10.0.0.4' --resource-group 'myResourceGroup' --routeserver 'myRouteServer' 
```

| Parameter | Value |
| --- | --- |
| `--name` | A name to identify the peer. It doesn't have to be the same name of the NVA. |
| `--peer-asn` | The Autonomous System Number (ASN) of the NVA. For more information, see [What Autonomous System Numbers (ASNs) can I use?](route-server-faq.md#what-autonomous-system-numbers-asns-can-i-use) |
| `--peer-ip` | The private IP address of the NVA. |
| `--resource-group` | The resource group name of your route server. |
| `--routeserver` | The route server name. |

After you successfully add the peer NVA, you must configure the NVA to establish a BGP session with the route server's peer IPs and ASN. Use [az network routeserver show](https://learn.microsoft.com/cli/azure/network/routeserver#az-network-routeserver-show) command to find the route server's peer IPs and ASN:

```azurecli-interactive
az network routeserver show --name 'myRouteServer' --resource-group 'myResourceGroup' 
```

| Parameter | Value |
| --- | --- |
| `--name` | The route server name. |
| `--resource-group` | The resource group name of your route server. |

> **Important:**
> Peer the NVA with both route server instance IPs to ensure virtual network routes are advertised over the NVA connections and achieve high availability.


---

## Configure route exchange with virtual network gateways

In this section, you learn how to enable route exchange between your route server and virtual network gateways (ExpressRoute or VPN) in the same virtual network. This feature is also known as *branch-to-branch* connectivity.

> **Important:**
> The Azure VPN gateway must be configured in [**active-active**](../vpn-gateway/about-active-active-gateways.md) mode and have the ASN set to **65515**. It's not a requirement to have BGP enabled on the VPN gateway to communicate with the route server.


> **Warning:**
> When you create or delete a route server in a virtual network that contains a virtual network gateway (ExpressRoute or VPN), expect downtime until the operation is complete. If you have an ExpressRoute circuit connected to the virtual network where you're creating or deleting the route server, the downtime doesn't affect the ExpressRoute circuit or its connections to other virtual networks.


# [**Portal**](#tab/portal)

1. Go to the route server that you want to configure.

1. Under **Settings**, select **Configuration**.

1. Select **Enabled** for the **Branch-to-branch** setting and then select **Save**.

    Screenshot that shows how to enable route exchange in a route server.

# [**PowerShell**](#tab/powershell)

Use [Update-AzRouteServer](https://learn.microsoft.com/powershell/module/az.network/update-azrouteserver) cmdlet to enable or disable route exchange between the route server and the virtual network gateway.

```azurepowershell-interactive
Update-AzRouteServer -RouteServerName 'myRouteServer' -ResourceGroupName 'myResourceGroup' -AllowBranchToBranchTraffic 1
```

| Parameter | Value |
| --- | --- |
| `-RouteServerName` | The route server name. |
| `-ResourceGroupName` | The resource group name of your route server. |
| `-AllowBranchToBranchTraffic` | The route exchange parameter. Accepted values: `1` and `0`. |

To disable route exchange, set the `-AllowBranchToBranchTraffic` parameter to `0`.

Use [Get-AzRouteServer](https://learn.microsoft.com/powershell/module/az.network/get-azrouteserver) cmdlet to verify the configuration.

# [**Azure CLI**](#tab/cli)

Use [az network routeserver update](https://learn.microsoft.com/cli/azure/network/routeserver#az-network-routeserver-update) command to enable or disable route exchange between the route server and the virtual network gateway.

```azurecli-interactive
az network routeserver update --name 'myRouteServer' --resource-group 'myResourceGroup' --allow-b2b-traffic true
```

| Parameter | Value |
| --- | --- |
| `--name` | The route server name. |
| `--resource-group` | The resource group name of your route server. |
| `--allow-b2b-traffic` | The route exchange parameter. Accepted values: `true` and `false`. |

To disable route exchange, set the `--allow-b2b-traffic` parameter to `false`.

Use [az network routeserver show](https://learn.microsoft.com/cli/azure/network/routeserver#az-network-routeserver-show) command to verify the configuration.

---

## Configure routing preference

In this section, you learn how to configure routing preference to control how your route server selects routes when multiple paths are available. Routing preference affects route learning and selection behavior.

# [**Portal**](#tab/portal)

1. Go to the route server that you want to configure.

1. Under **Settings**, select **Configuration**.

1. Select the routing preference that you want. Available options: **ExpressRoute** (default), **VPN**, and **ASPath**.

1. Select **Save**

    Screenshot that shows how to configure routing preference in a route server.

# [**PowerShell**](#tab/powershell)

Use [Update-AzRouteServer](https://learn.microsoft.com/powershell/module/az.network/update-azrouteserver) cmdlet to configure the routing preference setting of your route server.

```azurepowershell-interactive
Update-AzRouteServer -RouteServerName 'myRouteServer' -ResourceGroupName 'myResourceGroup' -HubRoutingPreference 'ASPath'
```

| Parameter | Value |
| --- | --- |
| `-RouteServerName` | The route server name. |
| `-ResourceGroupName` | The resource group name of your route server. |
| `-HubRoutingPreference` | The routing preference. Accepted values: `ExpressRoute` (default), `VpnGateway`, and `ASPath`. |

Use [Get-AzRouteServer](https://learn.microsoft.com/powershell/module/az.network/get-azrouteserver) cmdlet to verify the configuration.

# [**Azure CLI**](#tab/cli)

Use [az network routeserver update](https://learn.microsoft.com/cli/azure/network/routeserver#az-network-routeserver-update) command to configure the routing preference setting of your route server.

```azurecli-interactive
az network routeserver update --name 'myRouteServer' --resource-group 'myResourceGroup' --hub-routing-preference 'ASPath'
```

| Parameter | Value |
| --- | --- |
| `--name` | The route server name. |
| `--resource-group` | The resource group name of your route server. |
| `--hub-routing-preference` | The routing preference. Accepted values: `ExpressRoute` (default), `VpnGateway`, and `ASPath`. |

Use [az network routeserver show](https://learn.microsoft.com/cli/azure/network/routeserver#az-network-routeserver-show) command to verify the configuration.

---


## View BGP peer details

In this section, you learn how to view the configuration details of a BGP peer, including its name, ASN, IP address, and provisioning state.

# [**Portal**](#tab/portal)

1. Go to the route server that you want to peer with an NVA.

1. under **Settings**, select **Peers**. 

1. In the list of peers, you can see the name, ASN, IP address, and provisioning state of any of the configured peers.

    Screenshot that shows the configuration of a route server's peer.


# [**PowerShell**](#tab/powershell)

Use [Get-AzRouteServerPeer](https://learn.microsoft.com/powershell/module/az.network/get-azrouteserverpeer) cmdlet to view a route server peering.

```azurepowershell-interactive
Get-AzRouteServerPeer -PeerName 'myNVA' -ResourceGroupName 'myResourceGroup' -RouteServerName 'myRouteServer'
```

| Parameter | Value |
| --- | --- |
| `-PeerName` | The peer name. |
| `-ResourceGroupName` | The resource group name of your route server. |
| `-RouteServerName` | The route server name. |


# [**Azure CLI**](#tab/cli)

Use [az network routeserver peering show](https://learn.microsoft.com/cli/azure/network/routeserver/peering#az-network-routeserver-peering-show) command to view a route server peering.

```azurecli-interactive
az network routeserver peering show --name 'myNVA' --resource-group 'myResourceGroup' --routeserver 'myRouteServer' 
```

| Parameter | Value |
| --- | --- |
| `--name` | The peer name. |
| `--resource-group` | The resource group name of your route server. |
| `--routeserver` | The route server name. |


---
## View routes that Route Server learns

Navigate to **Effective Routes** under **Routing** to see the list of effective routes that Route Server learns from ExpressRoute connections, VPN connections, NVA BGP peers, and spoke virtual networks. 

### <a name="output"></a>View output

The page output shows the following fields:

* **Prefix**: Address prefix known to the current entity (learned from Route Server)
* **Next hop type**: Can be VPN, HubBgpConnection (NVA BGP peers), Virtual Network Connection, or ExpressRoute.
* **Next hop**: This is the IP address of the next hop (For virtual network connections, this will be "on-link". For ExpressRoute, this will be the IP address of the Microsoft Enterprise Edge Router)
* **Origin**: Link to the resource ID of the next hop (This will be empty for Virtual Network Connections)
* **AS Path**: BGP Attribute AS (autonomous system) path lists all the AS numbers that need to be traversed to reach the location where the prefix that the path is attached to, is advertised from.


### <a name="example"></a>Example

The values in the following example table imply that Route Server has learned the route of 10.2.0.0/24 (a branch prefix). It has learned the route due to the **VPN Next hop type** VPN with **Next hop** VPN Gateway IP address. **Origin** points to the resource ID of the originating VPN gateway/Connection. **AS Path** indicates the AS Path for the branch.

Use the scroll bar at the bottom of the table to view the 'AS Path'.

| **Prefix** | **Next hop type** | **Next hop** | **Origin** | **AS Path** |
| --- | --- | --- | --- | --- |
| 10.2.0.0/24 | VPN | 10.0.2.14 | /subscriptions/`<sub id>`/resourceGroups/`<resource group name>`/providers/Microsoft.Network/virtualNetworkGateways/vpngw | 20000 |


> **Note:**
> If a spoke VNet is peered with "use remote gateway" disabled, the spoke VNet's address range may still get advertised to on-premises even if the prefix does not appear in the **Effective Routes**.
>

### <a name="view-advertised-and-learned-routes"></a> View advertised and learned routes to BGP peers

In this section, you learn how to view the routes that your route server advertises to BGP peers and the routes it learns from those peers. This information is useful for troubleshooting routing issues and understanding traffic flow.

# [**Portal**](#tab/portal)

Use [PowerShell](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/route-server/configure-route-server.md?tabs=powershell#view-advertised-and-learned-routes) or [Azure CLI](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/route-server/configure-route-server.md?tabs=cli#view-advertised-and-learned-routes) to view the advertised and learned routes.

# [**PowerShell**](#tab/powershell)

Use the [Get-AzRouteServerPeerAdvertisedRoute](https://learn.microsoft.com/powershell/module/az.network/get-azrouteserverpeeradvertisedroute) cmdlet to view routes advertised by a route server.

```azurepowershell-interactive
Get-AzRouteServerPeerAdvertisedRoute -PeerName 'myNVA' -ResourceGroupName 'myResourceGroup' -RouteServerName 'myRouteServer'
```

Use the [Get-AzRouteServerPeerLearnedRoute](https://learn.microsoft.com/powershell/module/az.network/get-azrouteserverpeerlearnedroute) cmdlet to view routes learned by a route server.

```azurepowershell-interactive
Get-AzRouteServerPeerLearnedRoute -PeerName 'myNVA' -ResourceGroupName 'myResourceGroup' -RouteServerName 'myRouteServer'
```

| Parameter | Value |
| --- | --- |
| `-PeerName` | The peer name. |
| `-ResourceGroupName` | The resource group name of your route server. |
| `-RouteServerName` | The route server name. |


# [**Azure CLI**](#tab/cli)

Use the [az network routeserver peering list-advertised-routes](https://learn.microsoft.com/cli/azure/network/routeserver/peering#az-network-routeserver-peering-list-advertised-routes) command to view routes advertised by a route server.


```azurecli-interactive
az network routeserver peering list-advertised-routes --name 'myNVA' --resource-group 'myResourceGroup' --routeserver 'myRouteServer' 
```

Use the [az network routeserver peering list-learned-routes](https://learn.microsoft.com/cli/azure/network/routeserver/peering#az-network-routeserver-peering-list-learned-routes) command to view routes learned by a route server.

```azurecli-interactive
az network routeserver peering list-learned-routes --name 'myNVA' --resource-group 'myResourceGroup' --routeserver 'myRouteServer' 
```

| Parameter | Value |
| --- | --- |
| `--name` | The peer name. |
| `--resource-group` | The resource group name of your route server. |
| `--routeserver` | The route server name. |

---

## Delete a BGP peer

In this section, you learn how to delete an existing BGP peering between your route server and a network virtual appliance (NVA). This removes the BGP session and stops route exchange between the devices.

# [**Portal**](#tab/portal)

1. Go to the route server that you want to delete its NVA peering.

1. under **Settings**, select **Peers**. 

1. Select the ellipses **...** next to the peer that you want to delete, and then select **Delete**.

    Screenshot that shows how to delete a route server's peer.

# [**PowerShell**](#tab/powershell)

Use [Remove-AzRouteServerPeer](https://learn.microsoft.com/powershell/module/az.network/remove-azrouteserverpeer) cmdlet to delete a route server peering.

```azurepowershell-interactive
Remove-AzRouteServerPeer -PeerName 'myNVA' -ResourceGroupName 'myResourceGroup' -RouteServerName 'myRouteServer'
```

| Parameter | Value |
| --- | --- |
| `-PeerName` | The peer name. |
| `-ResourceGroupName` | The resource group name of your route server. |
| `-RouteServerName` | The route server name. |

# [**Azure CLI**](#tab/cli)

Use [az network routeserver peering delete](https://learn.microsoft.com/cli/azure/network/routeserver/peering#az-network-routeserver-peering-delete) command to delete a route server peering.

```azurecli-interactive
az network routeserver peering delete --name 'myNVA' --resource-group 'myResourceGroup' --routeserver 'myRouteServer' 
```

| Parameter | Value |
| --- | --- |
| `--name` | The peer name. |
| `--resource-group` | The resource group name of your route server. |
| `--routeserver` | The route server name. |

---

## Delete Azure Route Server

In this section, you learn how to delete an existing Azure Route Server. Deleting a route server removes all BGP peerings and stops all route advertisements.

# [**Portal**](#tab/portal)

1. Go to the route server that you want to delete.

1. Select **Delete** from the **Overview** page.

1. Select **Confirm** to delete the route server.

    Screenshot that shows how to delete a route server.

# [**PowerShell**](#tab/powershell)

Use [Remove-AzRouteServer](https://learn.microsoft.com/powershell/module/az.network/remove-azrouteserver) cmdlet to delete a route server.

```azurepowershell-interactive
Remove-AzRouteServer -RouteServerName 'myRouteServer' -ResourceGroupName 'myResourceGroup'
```

| Parameter | Value |
| --- | --- |
| `-RouteServerName` | The route server name. |
| `-ResourceGroupName` | The resource group name of your route server. |

# [**Azure CLI**](#tab/cli)

Use [az network routeserver delete](https://learn.microsoft.com/cli/azure/network/routeserver#az-network-routeserver-delete) command to delete a route server.

```azurecli-interactive
az network routeserver delete --name 'myRouteServer' --resource-group 'myResourceGroup'
```

| Parameter | Value |
| --- | --- |
| `--name` | The route server name. |
| `--resource-group` | The resource group name of your route server. |

---

## Next steps

- [Create Azure Route Server using the Azure portal](quickstart-create-route-server-portal.md)
- [Configure BGP peering between Azure Route Server and network virtual appliances](peer-route-server-with-virtual-appliance.md)
- [Monitor Azure Route Server](monitor-route-server.md)
