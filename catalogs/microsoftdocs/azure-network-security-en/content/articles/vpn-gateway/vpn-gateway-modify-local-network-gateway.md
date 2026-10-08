---
title: 'Modify gateway IP address settings: PowerShell'
description: Learn how to change IP address prefixes for your local network gateway using PowerShell.
titleSuffix: Azure VPN Gateway
author: duongau
ms.service: azure-vpn-gateway
ms.custom: devx-track-azurepowershell
ms.topic: how-to
ms.date: 10/28/2021
ms.author: duau
# Customer intent: As a network administrator, I want to modify the IP address settings of my local network gateway using PowerShell, so that I can ensure the network configuration is up-to-date and maintain connectivity without downtime.
---
# Modify local network gateway settings using PowerShell

Sometimes the settings for your local network gateway AddressPrefix or GatewayIPAddress change. This article shows you how to modify your local network gateway settings. You can also modify these settings using a different method by selecting a different option from the following list:

> 
> * [Azure portal](vpn-gateway-modify-local-network-gateway-portal.md)
> * [PowerShell](vpn-gateway-modify-local-network-gateway.md)
> * [Azure CLI](vpn-gateway-modify-local-network-gateway-cli.md)
>
>

>**Note:**
> Making changes to a local network gateway that has a connection may cause tunnel disconnects and downtime.
>

## <a name="before"></a>Before you begin

Install the latest version of the Azure Resource Manager PowerShell cmdlets. See [How to install and configure Azure PowerShell](https://learn.microsoft.com/powershell/azure/) for more information about installing the PowerShell cmdlets.

## <a name="ipaddprefix"></a>Modify IP address prefixes


To add more address prefixes:

1. Set the variable for the LocalNetworkGateway.

   ```azurepowershell-interactive
   $local = Get-AzLocalNetworkGateway -Name Site1 -ResourceGroupName TestRG1
   ```

1. Modify the prefixes. The values you specify overwrite the previous values.

   ```azurepowershell-interactive
   Set-AzLocalNetworkGateway -LocalNetworkGateway $local `
   -AddressPrefix @('10.101.0.0/24','10.101.1.0/24','10.101.2.0/24')
   ```

To remove address prefixes:

Leave out the prefixes that you no longer need. In this example, we no longer need prefix 10.101.2.0/24 (from the previous example), so we update the local network gateway and exclude that prefix.

1. Set the variable for the LocalNetworkGateway.

   ```azurepowershell-interactive
   $local = Get-AzLocalNetworkGateway -Name Site1 -ResourceGroupName TestRG1
   ```

1. Set the gateway with the updated prefixes.

   ```azurepowershell-interactive
   Set-AzLocalNetworkGateway -LocalNetworkGateway $local `
   -AddressPrefix @('10.101.0.0/24','10.101.1.0/24')
   ```


## <a name="gwip"></a>Modify the gateway IP address


If you change the public IP address for your VPN device, you need to modify the local network gateway with the updated IP address. When modifying this value, you can also modify the address prefixes at the same time. When modifying, be sure to use the existing name of your local network gateway. If you use a different name, you create a new local network gateway, instead of overwriting the existing gateway information.

```azurepowershell-interactive
New-AzLocalNetworkGateway -Name Site1 `
-Location "East US" -AddressPrefix @('10.101.0.0/24','10.101.1.0/24') `
-GatewayIpAddress "5.4.3.2" -ResourceGroupName TestRG1
```


## Next steps

You can verify your gateway connection. See [Verify a gateway connection](vpn-gateway-verify-connection-resource-manager.md).
