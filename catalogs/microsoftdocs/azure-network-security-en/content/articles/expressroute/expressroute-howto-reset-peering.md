---
title: 'Azure ExpressRoute: Reset circuit peering using Azure PowerShell'
description: Learn how to enable and disable peerings for an Azure ExpressRoute circuit using Azure PowerShell.
author:  duongau
ms.service: azure-expressroute
ms.custom: devx-track-azurepowershell
ms.topic: how-to
ms.date: 03/11/2026
ms.author: duau
---

# Reset ExpressRoute circuit peerings using Azure PowerShell

This article describes how to enable and disable peerings of an ExpressRoute circuit using PowerShell. Peerings are enabled by default when you create them. When you disable a peering, the BGP session on both the primary and the secondary connection of your ExpressRoute circuit disconnects. You lose connectivity for this peering to Microsoft. When you enable a peering, the BGP session on both the primary and the secondary connection of your ExpressRoute circuit establishes. The connectivity to Microsoft reconnects for this peering. You can enable and disable peering for Microsoft Peering and Azure Private Peering independently on the ExpressRoute circuit.

There are a two scenarios where you can find it helpful to reset your ExpressRoute peerings.
* If you want to test your disaster recovery design and implementation. For example, you have two ExpressRoute circuits. You can disable the peerings on one circuit and force your network traffic to fail over to the other circuit.
* Enable Bidirectional Forwarding Detection (BFD) on either Azure Private Peering or Microsoft Peering of your ExpressRoute circuit. BFD gets enabled by default on Azure Private Peering if you created your ExpressRoute circuit after August 1, 2018 and for Microsoft Peering after January 10, 2020. If your circuit was created before the date listed, you need reset the peering to enable BFD. 

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


## Reset a peering

1. If you're running PowerShell locally, open your PowerShell console with elevated privileges, and connect to your account. Use the following example to help you connect:

   ```azurepowershell
   Connect-AzAccount
   ```
2. If you have multiple Azure subscriptions, check the subscriptions for the account.

   ```azurepowershell-interactive
   Get-AzSubscription
   ```
3. Specify the subscription that you want to use.

   ```azurepowershell-interactive
   Select-AzSubscription -SubscriptionName "Replace_with_your_subscription_name"
   ```
4. Run the following commands to retrieve your ExpressRoute circuit.

   ```azurepowershell-interactive
   $ckt = Get-AzExpressRouteCircuit -Name "ExpressRouteARMCircuit" -ResourceGroupName "ExpressRouteResourceGroup"
   ```
5. Identify the peering you want to disable or enable. *Peerings* is an array. In the following example, Peerings[0] is Azure Private Peering and Peerings[1] Microsoft Peering.

   ```azurepowershell-interactive
   Name                             : ExpressRouteARMCircuit
   ResourceGroupName                : ExpressRouteResourceGroup
   Location                         : westus
   Id                               : /subscriptions/aaaa0a0a-bb1b-cc2c-dd3d-eeeeee4e4e4e/resourceGroups/ExpressRouteResourceGroup/providers/Microsoft.Network/expressRouteCircuits/ExpressRouteARMCircuit
   Etag                             : W/"aaaa0000-bb11-2222-33cc-444444dddddd"
   ProvisioningState                : Succeeded
   Sku                              : {
                                     "Name": "Standard_MeteredData",
                                     "Tier": "Standard",
                                     "Family": "MeteredData"
                                   }
   CircuitProvisioningState         : Enabled
   ServiceProviderProvisioningState : Provisioned
   ServiceProviderNotes             :
   ServiceProviderProperties        : {
                                     "ServiceProviderName": "Coresite",
                                     "PeeringLocation": "Los Angeles",
                                     "BandwidthInMbps": 50
                                   }
   ServiceKey                       : aaaa0a0a-bb1b-cc2c-dd3d-eeeeee4e4e4e
   Peerings                         : [
                                     {
                                       "Name": "AzurePrivatePeering",
                                       "Etag": "W/\"aaaa0000-bb11-2222-33cc-444444dddddd\"",
                                       "Id": "/subscriptions/aaaa0a0a-bb1b-cc2c-dd3d-eeeeee4e4e4e/resourceGroups/ExpressRouteResourceGroup/providers/Microsoft.Network/expressRouteCircuits/ExpressRouteARMCircuit/peerings/AzurePrivatePeering",
                                       "PeeringType": "AzurePrivatePeering",
                                       "State": "Enabled",
                                       "AzureASN": 12076,
                                       "PeerASN": 123,
                                       "PrimaryPeerAddressPrefix": "10.0.0.0/30",
                                       "SecondaryPeerAddressPrefix": "10.0.0.4/30",
                                       "PrimaryAzurePort": "",
                                       "SecondaryAzurePort": "",
                                       "VlanId": 789,
                                       "MicrosoftPeeringConfig": {
                                         "AdvertisedPublicPrefixes": [],
                                         "AdvertisedCommunities": [],
                                         "AdvertisedPublicPrefixesState": "NotConfigured",
                                         "CustomerASN": 0,
                                         "LegacyMode": 0,
                                         "RoutingRegistryName": "NONE"
                                       },
                                       "ProvisioningState": "Succeeded",
                                       "GatewayManagerEtag": "",
                                       "LastModifiedBy": "Customer",
                                       "Connections": []
                                     },
                                     {
                                       "Name": "MicrosoftPeering",
                                       "Etag": "W/\"aaaa0000-bb11-2222-33cc-444444dddddd\"",
                                       "Id": "/subscriptions/aaaa0a0a-bb1b-cc2c-dd3d-eeeeee4e4e4e/resourceGroups/ExpressRouteResourceGroup/providers/Microsoft.Network/expressRouteCircuits/ExpressRouteARMCircuit/peerings/MicrosoftPeering",
                                       "PeeringType": "MicrosoftPeering",
                                       "State": "Enabled",
                                       "AzureASN": 12076,
                                       "PeerASN": 123,
                                       "PrimaryPeerAddressPrefix": "3.0.0.0/30",
                                       "SecondaryPeerAddressPrefix": "3.0.0.4/30",
                                       "PrimaryAzurePort": "",
                                       "SecondaryAzurePort": "",
                                       "VlanId": 345,
                                       "MicrosoftPeeringConfig": {
                                         "AdvertisedPublicPrefixes": [
                                           "3.0.0.3/32"
                                         ],
                                         "AdvertisedCommunities": [],
                                         "AdvertisedPublicPrefixesState": "ValidationNeeded",
                                         "CustomerASN": 0,
                                         "LegacyMode": 0,
                                         "RoutingRegistryName": "NONE"
                                       },
                                       "ProvisioningState": "Succeeded",
                                       "GatewayManagerEtag": "",
                                       "LastModifiedBy": "Customer",
                                       "Connections": []
                                     }
                                   ]
   Authorizations                   : []
   AllowClassicOperations           : False
   GatewayManagerEtag               :
   ```
6. Run the following commands to change the peering state to disabled.

   ```azurepowershell-interactive
   $ckt.Peerings[0].State = "Disabled"
   Set-AzExpressRouteCircuit -ExpressRouteCircuit $ckt
   ```
   The peering should be in a disabled state you set. 

7. Run the following commands to change the peering state back to enabled.

   ```azurepowershell-interactive
   $ckt.Peerings[0].State = "Enabled"
   Set-AzExpressRouteCircuit -ExpressRouteCircuit $ckt
   ```
   The peering should be in an enabled state you set.
   
## Next steps
If you need help with troubleshooting an ExpressRoute problem, see the following articles:
* [Verifying ExpressRoute connectivity](https://learn.microsoft.com/troubleshoot/azure/expressroute/expressroute-troubleshooting-expressroute-overview)
* [Troubleshooting network performance](https://learn.microsoft.com/troubleshoot/azure/expressroute/expressroute-troubleshooting-network-performance)
