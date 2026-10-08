---
title: 'Delete a virtual network gateway: portal'
titleSuffix: Azure VPN Gateway
description: Learn how to delete a virtual network gateway using the Azure portal.
author: duongau
ms.service: azure-vpn-gateway
ms.date: 08/07/2024
ms.author: duau
ms.topic: how-to
# Customer intent: "As a network administrator, I want to delete a virtual network gateway, so that I can remove unused resources and potentially reconfigure my network setup."
---
# Delete a virtual network gateway using the portal

> 
> * [Azure portal](vpn-gateway-delete-vnet-gateway-portal.md)
> * [PowerShell](vpn-gateway-delete-vnet-gateway-powershell.md)

This article helps you delete a virtual network gateway. There are a couple of different approaches you can take when you want to delete a gateway.

* If you want to delete everything and start over, you can delete the resource group. When you delete a resource group, it deletes all the resources within the group. This method is only recommended if you don't want to keep any of the resources in the resource group. You can't selectively delete only a few resources using this approach.

* If you want to keep some of the resources in your resource group, deleting a virtual network gateway becomes slightly more complicated. Before you can delete the virtual network gateway, you must first delete any resources that are dependent on the gateway. The steps you follow depend on the type of connections that you created and the dependent resources for each connection.

## Delete a VPN gateway

To delete a virtual network gateway, you must first delete each resource that pertains to the virtual network gateway. Resources must be deleted in a certain order due to dependencies.

### Step 1: Go to the virtual network gateway

1. In the [Azure portal](https://portal.azure.com), go to **All resources**.
2. To open the virtual network gateway page, go to the virtual network gateway and click to select it.

### Step 2: Delete connections

1. On the page for your virtual network gateway, click **Connections** to view all connections to the gateway.
2. Click the **'...'** on the row of the name of the connection, then select **Delete** from the dropdown.
3. Click **Yes** to confirm that you want to delete the connection. If you have multiple connections, delete each connection.

### Step 3: Delete the virtual network gateway

If you have a P2S configuration to this VNet in addition to your S2S configuration, deleting the virtual network gateway will automatically disconnect all P2S clients without warning.

1. On the virtual network gateway page, click **Overview**.
2. On the **Overview** page, click **Delete** to delete the gateway.


At this point, the virtual network gateway is deleted.

### To delete additional resources

The following steps help you delete any resources that are no longer being used.

#### To delete the local network gateway

1. In **All resources**, locate local network gateways that were associated with each connection.
1. On the **Overview** page for the local network gateway, click **Delete**.

#### To delete the Public IP address resource for the gateway

1. In **All resources**, locate the Public IP address resource that was associated to the gateway. If the virtual network gateway was active-active, you'll see two Public IP addresses.
1. On the **Overview** page for the Public IP address, click **Delete**, then **Yes** to confirm.

#### To delete the gateway subnet

1. In **All resources**, locate the virtual network. 
1. On the **Subnets** page, click the **GatewaySubnet**, then click **Delete**. 
1. Click **Yes** to confirm that you want to delete the gateway subnet.

## <a name="deleterg"></a>Delete a VPN gateway by deleting the resource group

If you aren't concerned about keeping any of your resources in the resource group and you just want to start over, you can delete an entire resource group. This is a quick way to remove everything. The following steps apply only to the [Resource Manager deployment model](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/deployment-models.md).

1. In **All resources**, locate the resource group and click to open the page.
1. Click **Delete**. On the Delete page, view the affected resources. Make sure that you want to delete all of these resources. If not, use the steps in Delete a VPN gateway at the top of this article.
1. To proceed, type the name of the resource group that you want to delete, then click **Delete**.

## Next steps

For FAQ information, see the [Azure VPN Gateway FAQ](vpn-gateway-vpn-faq.md).
