---
title: 'Configure custom BGP communities for Azure ExpressRoute private peering'
description: Learn how to apply or update BGP community value for a new or an existing virtual network.
author: duongau
ms.service: azure-expressroute
ms.custom: devx-track-azurepowershell
ms.topic: how-to
ms.date: 03/11/2026
ms.author: duau
# Customer intent: As a network administrator, I want to configure custom BGP community values for virtual networks, so that I can better manage routing decisions for traffic between my on-premises infrastructure and Azure through ExpressRoute.
---

# Configure custom BGP communities for Azure ExpressRoute private peering

BGP communities are groupings of IP prefixes tagged with a community value. This value can be used to make routing decisions on the router's infrastructure. You can apply filters or specify routing preferences for traffic sent to your on-premises from Azure with BGP community tags. This article explains how to apply a custom BGP community value for your virtual networks using Azure PowerShell. Once configured, you can view the regional BGP community value and the custom community value of your virtual network. This value will be used for outbound traffic sent over ExpressRoute when originating from that virtual network.

## Prerequisites

* Review the [prerequisites](expressroute-prerequisites.md), [routing requirements](expressroute-routing.md), and [workflows](expressroute-workflows.md) before you begin configuration.

* You must have an active ExpressRoute circuit.
  * Follow the instructions to [create an ExpressRoute circuit](expressroute-howto-circuit-arm.md) and have the circuit enabled by your connectivity provider. 
  * Ensure that you have Azure private peering configured for your circuit. See the [configure routing](expressroute-howto-routing-arm.md) article for routing instructions. 
  * Ensure that Azure private peering gets configured and establishes BGP peering between your network and Microsoft for end-to-end connectivity.

> **Note:**
> Use of Virtual Network BGP communities and ExpressRoute is not currently compatible with Azure Virtual WAN.
  
### Working with Azure PowerShell


The steps and examples in this article use Azure PowerShell Az modules. To install the Az modules locally on your computer, see [Install Azure PowerShell](https://learn.microsoft.com/powershell/azure/install-azure-powershell). To learn more about the new Az module, see [Introducing the new Azure PowerShell Az module](https://learn.microsoft.com/powershell/azure/new-azureps-module-az). PowerShell cmdlets are updated frequently. If you are not running the latest version, the values specified in the instructions may fail. To find the installed versions of PowerShell on your system, use the `Get-Module -ListAvailable Az` cmdlet.


You can use Azure Cloud Shell to run most PowerShell cmdlets and CLI commands, instead of installing Azure PowerShell or CLI locally. Azure Cloud Shell is a free interactive shell that has common Azure tools preinstalled and is configured to use with your account. To run any code contained in this article on Azure Cloud Shell, open a Cloud Shell session, use the **Copy** button on a code block to copy the code, and paste it into the Cloud Shell session with __Ctrl+Shift+V__ on Windows and Linux, or __Cmd+Shift+V__ on macOS. Pasted text is not automatically executed, press **Enter** to run code.

There are a few ways to launch the Cloud Shell:

| Option | Link |
| --- | --- |
| Click **Try It** in the upper right corner of a code block. | Cloud Shell in this article |
| Open Cloud Shell in your browser. | [https\://shell.azure.com/powershell](https://shell.azure.com/powershell) |
| Click the **Cloud Shell** button on the menu in the upper right of the Azure portal. | [Cloud Shell in the portal](https://portal.azure.com) |
|  |  |


## Apply a custom BGP community value for a new virtual network

1. To start the configuration, sign in to your Azure account and select the subscription that you want to use.

   
 If you are using the Azure Cloud Shell, you sign in to your Azure account automatically after clicking 'Try it'. To sign in locally, open your PowerShell console with elevated privileges and run the cmdlet to connect.

```azurepowershell
Connect-AzAccount
```

If you have more than one subscription, get a list of your Azure subscriptions.

```azurepowershell-interactive
Get-AzSubscription
```

Specify the subscription that you want to use.

```azurepowershell-interactive
Select-AzSubscription -SubscriptionName "Name of subscription"
```


1. Create a resource group to store the new virtual network.

    ```azurepowershell-interactive
    $rg = @{
        Name = 'myERRG'
        Location = 'WestUS'
    }
    New-AzResourceGroup @rg
    ```

1. Create a new virtual network with the `-BgpCommunity` flag to apply a BGP community value.

    ```azurepowershell-interactive
    $vnet = @{
        Name = 'myVirtualNetwork'
        ResourceGroupName = 'myERRG'
        Location = 'WestUS'
        AddressPrefix = '10.0.0.0/16'
        BgpCommunity = '12076:20001'    
    }
    New-AzVirtualNetwork @vnet
    ```
    
    > **Note:**
    > The `12076:` is required before your custom community value.
    >

1. Retrieve your virtual network and review its properties. You'll notice a *BgpCommunities* section that contains a **RegionalCommunity** value and a **VirtualNetworkCommunity** value. The *RegionalCommunity* value is predefined based on the Azure region of the virtual network. The *VirtualNetworkCommunity* value should match your custom definition.

    ```azurepowershell-interactive
    $virtualnetwork = @{
        Name = 'myVirtualNetwork'
        ResourceGroupName = 'myERRG'
    } 
    Get-AzVirtualNetwork @virtualnetwork
    ```

## Applying or updating the custom BGP value for an existing virtual network

1. Get the virtual network you want to apply or update the BGP community value and store it to a variable.

    ```azurepowershell-interactive
    $virtualnetwork = @{
        Name = 'myVirtualNetwork'
        ResourceGroupName = 'myERRG'
    } 
    $vnet = Get-AzVirtualNetwork @virtualnetwork
    ```

1. Update the `VirtualNetworkCommunity` value for your virtual network.

    ```azurepowershell-interactive
    $vnet.BgpCommunities = @{VirtualNetworkCommunity = '12076:20002'}
    $vnet | Set-AzVirtualNetwork
    ```

    > **Note:**
    > The `12076:` is required before your custom community value.
    >

1. Retrieve your virtual network and review its updated properties. The **RegionalCommunity** value is predefined based on the Azure region of the virtual network; to view the regional BGP community values for private peering, see [ExpressRoute routing requirements](expressroute-routing.md#bgp). The **VirtualNetworkCommunity** value should match your custom definition.

    ```azurepowershell-interactive
    $virtualnetwork = @{
        Name = 'myVirtualNetwork'
        ResourceGroupName = 'myERRG'
    } 
    Get-AzVirtualNetwork @virtualnetwork
    ```


## Next steps

- [Verify ExpressRoute connectivity](https://learn.microsoft.com/troubleshoot/azure/expressroute/expressroute-troubleshooting-expressroute-overview).
- [Troubleshoot your network performance](https://learn.microsoft.com/troubleshoot/azure/expressroute/expressroute-troubleshooting-network-performance)
