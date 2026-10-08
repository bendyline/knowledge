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

[Include unavailable in this source snapshot: ../articles/networking/includes/vpn-gateway/modify-ip-prefix-cli.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/includes/vpn-gateway-common-tasks-cli-include.md)

[Include unavailable in this source snapshot: ../articles/networking/includes/vpn-gateway/modify-lng-gateway-ip-cli.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/includes/vpn-gateway-common-tasks-cli-include.md)

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
