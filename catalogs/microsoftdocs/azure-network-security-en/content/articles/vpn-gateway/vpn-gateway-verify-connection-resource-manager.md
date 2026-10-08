---
title: 'Verify a gateway connection'
titleSuffix: Azure VPN Gateway
description: Learn how to verify a virtual network VPN Gateway connection.
author: duongau
ms.service: azure-vpn-gateway
ms.custom: devx-track-azurecli
ms.topic: how-to
ms.date: 03/31/2025
ms.author: duau
# Customer intent: As a network administrator, I want to verify the VPN gateway connection, so that I can ensure secure and reliable communication between my networks.
---
# Verify a connection for VPN Gateway

This article shows you how to verify a VPN gateway connection for both the classic and the [Resource Manager deployment model](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/deployment-models.md).

## Azure portal

In the Azure portal, you can view the connection status of a VPN gateway by going to the connection. The following steps show one way to navigate to your connection and verify.

1. In the [Azure portal](https://portal.azure.com), go to your virtual network gateway.
1. On the page for your virtual network gateway, click **Connections**. You can see the status of each connection.
1. Click the name of the connection that you want to verify. In **Essentials**, you can view more information about your connection. The **Status** values are 'Succeeded' and 'Connected' when you have made a successful connection.


## PowerShell

You can verify that your connection succeeded by using the 'Get-AzVirtualNetworkGatewayConnection' cmdlet, with or without '-Debug'. 

1. Use the following cmdlet example, configuring the values to match your own. If prompted, select 'A' in order to run 'All'. In the example, '-Name' refers to the name of the connection that you want to test.

   ```azurepowershell-interactive
   Get-AzVirtualNetworkGatewayConnection -Name VNet1toSite1 -ResourceGroupName TestRG1
   ```

1. After the cmdlet has finished, view the values. In the example below, the connection status shows as 'Connected' and you can see ingress and egress bytes.

   ```
   "connectionStatus": "Connected",
   "ingressBytesTransferred": 33509044,
   "egressBytesTransferred": 4142431
   ``` 

## Azure CLI

You can verify that your connection succeeded by using the [az network vpn-connection show](https://learn.microsoft.com/cli/azure/network/vpn-connection) command. In the example, '--name' refers to the name of the connection that you want to test. When the connection is in the process of being established, its connection status shows 'Connecting'. Once the connection is established, the status changes to 'Connected'. Modify the following example with the values for your environment.

```azurecli-interactive
az network vpn-connection show --name <connection-name> --resource-group <resource-group-name>
```


## Azure portal (classic)

In the Azure portal, you can view the connection status for a classic VNet VPN Gateway by navigating to the connection. The following steps show one way to navigate to your connection and verify.

1. In the [Azure portal](https://portal.azure.com), go to your classic virtual network (VNet).
1. On the virtual network page, click the type of connection you want to view. For example, **Site-to-site connections**.
1. On the **Site-to-site connections** page, under **Name**, select the site connection you want to view.
1. On the **Properties** page, view the information about the connection.

## PowerShell (classic)

To verify your VPN gateway connection for the classic deployment model using PowerShell, install the latest versions of the Azure PowerShell cmdlets. Be sure to download and install the [Service Management](https://www.powershellgallery.com/packages/Azure/) module. Use 'Add-AzureAccount' to log in to the classic deployment model.

You can verify that your connection succeeded by using the 'Get-AzureVNetConnection' cmdlet.

1. Use the following cmdlet example, configuring the values to match your own. The name of the virtual network must be in quotes if it contains spaces.

   ```azurepowershell
   Get-AzureVNetConnection "Group ClassicRG TestVNet1"
   ```
1. After the cmdlet has finished, view the values. In the example below, the Connectivity State shows as 'Connected' and you can see ingress and egress bytes.

   ```output
   ConnectivityState         : Connected
   EgressBytesTransferred    : 181664
   IngressBytesTransferred   : 182080
   LastConnectionEstablished : 10/19/22020 12:40:54 AM
   LastEventID               : 24401
   LastEventMessage          : The connectivity state for the local network site 'F7F7BFC7_SiteVNet4' changed from Connecting to
                               Connected.
   LastEventTimeStamp        : 10/19/2020 12:40:54 AM
   LocalNetworkSiteName      : F7F7BFC7_SiteVNet4
   ```


## Next steps

* You can add virtual machines to your virtual networks. See [Create a Virtual Machine](https://learn.microsoft.com/azure/virtual-machines/windows/quick-create-portal) for steps.
