---
title: 'Modify gateway IP address settings: Azure CLI'
titleSuffix: Azure VPN Gateway
description: Learn how to change IP address prefixes for your local network gateway using the Azure CLI.
author: duongau
ms.service: azure-vpn-gateway
ms.custom: devx-track-azurecli
ms.topic: how-to
ms.date: 10/28/2021
ms.author: duau
# Customer intent: As a network administrator, I want to modify the IP address settings of my local network gateway using the command line so that I can efficiently manage network configurations and minimize downtime during adjustments.
---
# Modify local network gateway settings using the Azure CLI

Sometimes the settings for your local network gateway Address Prefix or Gateway IP Address change. This article shows you how to modify your local network gateway settings. You can also modify these settings using a different method by selecting a different option from the following list:

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

Install the latest version of the CLI commands (2.0 or later). For information about installing the CLI commands, see [Install the Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli).

Sign in to your Azure subscription with the [az login](https://learn.microsoft.com/cli/azure/) command and follow the on-screen directions. For more information about signing in, see [Get Started with Azure CLI](https://learn.microsoft.com/cli/azure/get-started-with-azure-cli).

```azurecli
az login
```

If you have more than one Azure subscription, list the subscriptions for the account.

```azurecli
az account list --all
```

Specify the subscription that you want to use.

```azurecli
az account set --subscription <replace_with_your_subscription_id>
```


## <a name="ipaddprefix"></a>Modify IP address prefixes


### <a name="noconnection"></a>To modify local network gateway IP address prefixes - no gateway connection

If you want to add or remove IP address prefixes and your gateway doesn't have a connection yet, you can update the prefixes using [az network local-gateway create](https://learn.microsoft.com/cli/azure/network/local-gateway). To overwrite the current settings, use the existing name of your local network gateway. If you use a different name, you create a new local network gateway, instead of overwriting the existing one. You can also use this command to update the gateway IP address for the VPN device.

Each time you make a change, the entire list of prefixes must be specified, not just the prefixes that you want to change. Specify only the prefixes that you want to keep. In this case, 10.0.0.0/24 and 10.3.0.0/16

```azurecli
az network local-gateway create --gateway-ip-address 203.0.113.34 --name Site2 -g TestRG1 --local-address-prefixes 10.0.0.0/24 10.3.0.0/16
```

### <a name="withconnection"></a>To modify local network gateway IP address prefixes - existing gateway connection

If you have a gateway connection and want to add or remove IP address prefixes, you can update the prefixes using [az network local-gateway update](https://learn.microsoft.com/cli/azure/network/local-gateway). This results in some downtime for your VPN connection.

Each time you make a change, the entire list of prefixes must be specified, not just the prefixes that you want to change. In this example, 10.0.0.0/24 and 10.3.0.0/16 are already present. We add the prefixes 10.5.0.0/16 and 10.6.0.0/16 and specify all 4 of the prefixes when updating.

```azurecli
az network local-gateway update --local-address-prefixes 10.0.0.0/24 10.3.0.0/16 10.5.0.0/16 10.6.0.0/16 --name VNet1toSite2 -g TestRG1
```


## <a name="gwip"></a>Modify the gateway IP address

### To modify the local network gateway 'gatewayIpAddress'

If you change the public IP address for your VPN device, you need to modify the local network gateway with the updated IP address. When modifying the gateway, be sure to specify the existing name of your local network gateway. If you use a different name, you create a new local network gateway, instead of overwriting the existing gateway information.

To modify the gateway IP address, replace the values 'Site2' and 'TestRG1' with your own using the [az network local-gateway update](https://learn.microsoft.com/cli/azure/network/local-gateway) command.

```azurecli-interactive
az network local-gateway update --gateway-ip-address 203.0.113.170 --name Site2 --resource-group TestRG1
```

Verify that the IP address is correct in the output:

```azurecli-interactive
"gatewayIpAddress": "203.0.113.170",
```


## Next steps

You can verify your gateway connection. See [Verify a gateway connection](vpn-gateway-verify-connection-resource-manager.md).
