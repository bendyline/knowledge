---
title: Monitor Azure VPN Gateway
description: Start here to learn how to monitor Azure VPN Gateway by using Azure Monitor metrics and resource logs.
ms.date: 03/31/2025
ms.topic: concept-article
author: duongau
ms.author: duau
ms.service: azure-vpn-gateway
ms.custom:
  - horz-monitor
  - sfi-image-nochange
# Customer intent: As a network administrator, I want to utilize monitoring tools for Azure VPN Gateway, so that I can effectively track performance metrics and logs to ensure secure and reliable connectivity.
---
# Monitor Azure VPN Gateway

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-intro.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/vpn-gateway/monitor-vpn-gateway.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-resource-types.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/vpn-gateway/monitor-vpn-gateway.md)

For more information about the resource types for VPN Gateway, see [Azure VPN Gateway monitoring data reference](monitor-vpn-gateway-reference.md).

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-data-storage.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/vpn-gateway/monitor-vpn-gateway.md)

See [Create diagnostic setting to collect platform logs and metrics in Azure](https://learn.microsoft.com/azure/azure-monitor/essentials/diagnostic-settings) for the detailed process for creating a diagnostic setting using the Azure portal, CLI, or PowerShell. When you create a diagnostic setting, you specify which categories of logs to collect. The categories for VPN Gateway are listed in [VPN Gateway monitoring data reference](monitor-vpn-gateway-reference.md).

> **Important:**
> Enabling these settings requires additional Azure services (storage account, event hub, or Log Analytics), which might increase your cost. To calculate an estimated cost, visit the [Azure pricing calculator](https://azure.microsoft.com/pricing/calculator).

Data in Azure Monitor Logs is stored in tables where each table has its own set of unique properties.  

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-platform-metrics.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/vpn-gateway/monitor-vpn-gateway.md)

For a list of available metrics for VPN Gateway, see [Azure VPN Gateway monitoring data reference](monitor-vpn-gateway-reference.md#metrics).

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-resource-logs.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/vpn-gateway/monitor-vpn-gateway.md)

For the available resource log categories, their associated Log Analytics tables, and the log schemas for VPN Gateway, see [Azure VPN Gateway monitoring data reference](monitor-vpn-gateway-reference.md#resource-logs).

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-activity-log.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/vpn-gateway/monitor-vpn-gateway.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-analyze-data.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/vpn-gateway/monitor-vpn-gateway.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-external-tools.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/vpn-gateway/monitor-vpn-gateway.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-kusto-queries.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/vpn-gateway/monitor-vpn-gateway.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-alerts.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/vpn-gateway/monitor-vpn-gateway.md)

### VPN Gateway alert rules

You can set alerts for any metric, log entry, or activity log entry listed in the [Azure VPN Gateway monitoring data reference](monitor-vpn-gateway-reference.md).

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-advisor-recommendations.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/vpn-gateway/monitor-vpn-gateway.md)

## View BGP metrics and status

You can view BGP metrics and status by using the Azure portal, or by using Azure PowerShell.

### Azure portal

In the Azure portal, you can view BGP peers, learned routes, and advertised routes. You can also download .csv files containing this data.

1. In the [Azure portal](https://portal.azure.com), navigate to your virtual network gateway.
1. Under **Monitoring**, select **BGP peers** to open the BGP peers page.

#### Learned routes

1. You can view up to 50 learned routes in the portal.

   Screenshot of learned routes.

1. You can also download the learned routes file. If you have more than 50 learned routes, the only way to view all of them is by downloading and viewing the .csv file. To download, select **Download learned routes**.

   Screenshot of downloading learned routes.
1. Then, view the file.

   Screenshot of downloaded learned routes.

#### Advertised routes

1. To view advertised routes, select the **...** at the end of the network that you want to view, then select **View advertised routes**.

   Screenshot showing how to view advertised routes.
1. On the **Routes advertised to peer** page, you can view up to 50 advertised routes.

   Screenshot of advertised routes.
1. You can also download the advertised routes file. If you have more than 50 advertised routes, the only way to view all of them is by downloading and viewing the .csv file. To download, select **Download advertised routes**.

   Screenshot of selecting downloaded advertised routes.
1. Then, view the file.

   Screenshot of downloaded advertised routes.

#### BGP peers

1. You can view up to 50 BGP peers in the portal.

   Screenshot of BGP peers.
1. You can also download the BGP peers file. If you have more than 50 BGP peers, the only way to view all of them is by downloading and viewing the .csv file. To download, select **Download BGP peers** on the portal page.

   Screenshot of downloading BGP peers.
1. Then, view the file.

   Screenshot of downloaded BGP peers.

### PowerShell

Use **Get-AzVirtualNetworkGatewayBGPPeerStatus** to view all BGP peers and the status.




This article uses PowerShell cmdlets. To run the cmdlets, you can use Azure Cloud Shell. Cloud Shell is a free interactive shell that you can use to run the steps in this article. It has common Azure tools preinstalled and configured to use with your account.

To open Cloud Shell, just select **Open Cloudshell** from the upper-right corner of a code block. You can also open Cloud Shell on a separate browser tab by going to [https://shell.azure.com/powershell](https://shell.azure.com/powershell). Select **Copy** to copy the blocks of code, paste them into Cloud Shell, and select the Enter key to run them.


You can also install and run the Azure PowerShell cmdlets locally on your computer. PowerShell cmdlets are updated frequently. If you haven't installed the latest version, the values specified in the instructions may fail. To find the versions of Azure PowerShell installed on your computer, use the `Get-Module -ListAvailable Az` cmdlet. To install or update, see [Install the Azure PowerShell module](https://learn.microsoft.com/powershell/azure/install-azure-powershell).



```azurepowershell-interactive
Get-AzVirtualNetworkGatewayBgpPeerStatus -ResourceGroupName resourceGroup -VirtualNetworkGatewayName gatewayName

Asn               : 65515
ConnectedDuration : 9.01:04:53.5768637
LocalAddress      : 10.1.0.254
MessagesReceived  : 14893
MessagesSent      : 14900
Neighbor          : 10.0.0.254
RoutesReceived    : 1
State             : Connected
```

Use **Get-AzVirtualNetworkGatewayLearnedRoute** to view all the routes that the gateway learned through BGP.

```azurepowershell-interactive
Get-AzVirtualNetworkGatewayLearnedRoute -ResourceGroupName resourceGroup -VirtualNetworkGatewayname gatewayName

AsPath       :
LocalAddress : 10.1.0.254
Network      : 10.1.0.0/16
NextHop      :
Origin       : Network
SourcePeer   : 10.1.0.254
Weight       : 32768

AsPath       :
LocalAddress : 10.1.0.254
Network      : 10.0.0.254/32
NextHop      :
Origin       : Network
SourcePeer   : 10.1.0.254
Weight       : 32768

AsPath       : 65515
LocalAddress : 10.1.0.254
Network      : 10.0.0.0/16
NextHop      : 10.0.0.254
Origin       : EBgp
SourcePeer   : 10.0.0.254
Weight       : 32768
```

Use **Get-AzVirtualNetworkGatewayAdvertisedRoute** to view all the routes that the gateway is advertising to its peers through BGP.

```azurepowershell-interactive
Get-AzVirtualNetworkGatewayAdvertisedRoute -VirtualNetworkGatewayName gatewayName -ResourceGroupName resourceGroupName -Peer 10.0.0.254
```

### Rest API

You can also use the GetBgpPeerStatus [Rest API call](https://learn.microsoft.com/rest/api/network-gateway/virtual-network-gateways/get-bgp-peer-status) to retrieve the information. This Async operation returns a 202 status code. You need to fetch the results via a separate GET call. For more information, see [Azure-AsyncOperation request and response](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/async-operations.md#azure-asyncoperation-request-and-response).

## Related content

- See [Azure VPN Gateway monitoring data reference](monitor-vpn-gateway-reference.md) for a reference of the metrics, logs, and other important values created for VPN Gateway.
- See [Monitoring Azure resources with Azure Monitor](https://learn.microsoft.com/azure/azure-monitor/essentials/monitor-azure-resource) for general details on monitoring Azure resources.
