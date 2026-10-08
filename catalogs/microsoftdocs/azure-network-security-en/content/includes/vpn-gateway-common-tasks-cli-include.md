---
ms.author: duau
author: duongau
ms.date: 12/02/2024
ms.service: azure-vpn-gateway
ms.topic: include
---
### To view local network gateways

To view a list of the local network gateways, use the [az network local-gateway list](https://learn.microsoft.com/cli/azure/network/local-gateway) command.

```azurecli
az network local-gateway list --resource-group TestRG1
```


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


### To verify the shared key values

Verify that the shared key value is the same value that you used for your VPN device configuration. If it isn't, either run the connection again using the value from the device, or update the device with the value from the return. The values must match. To view the shared key, use the [az network vpn-connection-list](https://learn.microsoft.com/cli/azure/network/vpn-connection).

```azurecli
az network vpn-connection shared-key show --connection-name VNet1toSite2 --resource-group TestRG1
```

### To view the VPN gateway Public IP address

To find the public IP address of your virtual network gateway, use the [az network public-ip list](https://learn.microsoft.com/cli/azure/network/public-ip) command. For easy reading, the output for this example is formatted to display the list of public IPs in table format.

```azurecli
az network public-ip list --resource-group TestRG1 --output table
```
