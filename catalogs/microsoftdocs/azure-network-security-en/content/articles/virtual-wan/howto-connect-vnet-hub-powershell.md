---
title: 'Connect a VNet to a Virtual WAN hub - PowerShell'
titleSuffix: Azure Virtual WAN
description: Learn how to connect a VNet to a Virtual WAN hub using PowerShell.
author: duongau
ms.service: azure-virtual-wan
ms.custom: devx-track-azurepowershell
ms.topic: how-to
ms.date: 06/15/2023
ms.author: duau
---
# Connect a virtual network to a Virtual WAN hub - PowerShell

This article helps you connect your virtual network to your virtual hub using PowerShell. You can also use [Azure portal](howto-connect-vnet-hub.md) to complete this task. Repeat these steps for each VNet that you want to connect.

Before you create a connection, be aware of the following:

* A virtual network can only be connected to one virtual hub at a time.
* In order to connect it to a virtual hub, the remote virtual network can't have a gateway (ExpressRoute or VPN) or RouteServer.
* To connect a cross-tenant remote virtual network to the virtual hub, refer to [Connect cross-tenant virtual networks to a Virtual WAN hub](cross-tenant-vnet.md).
* Make sure to check if you'd like to enable [bypass next hop IP for workloads within this VNet](howto-connect-vnet-hub.md#bypassexplained) for your connection.

* Some configuration settings, such as **Propagate static route**, can only be configured in the Azure portal at this time. See the [Azure portal](howto-connect-vnet-hub.md) version of this article for steps.

> **Important:**
> If VPN gateways are present in the virtual hub, this operation as well as any other write operation on the connected VNet can cause disconnection to point-to-site clients as well as reconnection of site-to-site tunnels and BGP sessions.

## Prerequisites

* Verify that you have an Azure subscription. If you don't already have an Azure subscription, you can activate your [MSDN subscriber benefits](https://azure.microsoft.com/pricing/member-offers/msdn-benefits-details) or sign up for a [free account](https://azure.microsoft.com/pricing/free-trial).
* The following steps assume that you have already created a [site-to-site Virtual WAN VPN gateway](site-to-site-powershell.md).

### Azure PowerShell




This article uses PowerShell cmdlets. To run the cmdlets, you can use Azure Cloud Shell. Cloud Shell is a free interactive shell that you can use to run the steps in this article. It has common Azure tools preinstalled and configured to use with your account.

To open Cloud Shell, just select **Open Cloudshell** from the upper-right corner of a code block. You can also open Cloud Shell on a separate browser tab by going to [https://shell.azure.com/powershell](https://shell.azure.com/powershell). Select **Copy** to copy the blocks of code, paste them into Cloud Shell, and select the Enter key to run them.


You can also install and run the Azure PowerShell cmdlets locally on your computer. PowerShell cmdlets are updated frequently. If you haven't installed the latest version, the values specified in the instructions may fail. To find the versions of Azure PowerShell installed on your computer, use the `Get-Module -ListAvailable Az` cmdlet. To install or update, see [Install the Azure PowerShell module](https://learn.microsoft.com/powershell/azure/install-azure-powershell).



## <a name="signin"></a>Sign in

**If you're using Azure Cloud Shell** you'll automatically be directed to sign into your account after you open Cloudshell. You don't need to run `Connect-AzAccount`. Once signed in, you can still change subscriptions if necessary by using `Get-AzSubscription` and `Select-AzSubscription`.

**If you're running PowerShell locally**, open the PowerShell console with elevated privileges and connect to your Azure account. The `Connect-AzAccount` cmdlet prompts you for credentials. After you authenticate, it downloads your account settings so that they're available to Azure PowerShell. You can change subscription by using `Get-AzSubscription` and `Select-AzSubscription -SubscriptionName "Name of subscription"`.

## Add a connection

1. Declare the variables for the existing resources, including the existing virtual network.

   ```azurepowershell-interactive
   $resourceGroup = Get-AzResourceGroup -ResourceGroupName "TestRG" 
   $virtualWan = Get-AzVirtualWan -ResourceGroupName "TestRG" -Name "TestVWAN1"
   $virtualHub = Get-AzVirtualHub -ResourceGroupName "TestRG" -Name "Hub1"
   $remoteVirtualNetwork = Get-AzVirtualNetwork -Name "VNet1" -ResourceGroupName "TestRG" 
   ```

1. Create a connection to peer the virtual network to the virtual hub.

   ```azurepowershell-interactive
   New-AzVirtualHubVnetConnection -ResourceGroupName "TestRG" -VirtualHubName "Hub1" -Name "VNet1-connection" -RemoteVirtualNetwork $remoteVirtualNetwork
   ```

## Next steps

For more information about Virtual WAN, see the [Virtual WAN FAQ](virtual-wan-faq.md).
