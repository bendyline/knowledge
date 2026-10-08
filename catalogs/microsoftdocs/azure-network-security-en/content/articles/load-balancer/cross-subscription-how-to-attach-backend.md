---
title: Attach a cross-subscription backend to an Azure Load Balancer
titleSuffix: Azure Load Balancer
description: Learn how to attach a cross-subscription backend to an Azure Load Balancer.
services: load-balancer
author: mbender-ms
ms.service: azure-load-balancer
ms.topic: how-to
ms.date: 10/17/2024
ms.author: mbender
ms.custom: devx-track-azurecli, devx-track-azurepowershell
# Customer intent: As a cloud architect, I want to attach a cross-subscription backend to an Azure Load Balancer, so that I can efficiently manage and distribute network traffic across virtual networks in different subscriptions.
---

# Attach a cross-subscription backend to an Azure Load Balancer
In this article, you learn how to attach a cross-subscription backend to an Azure Load Balancer by creating a cross-subscription backend pool and attaching cross-subscription network interfaces to the backend pool of the load balancer.

A [cross-subscription load balancer](cross-subscription-overview.md) can reference a virtual network that resides in a different subscription other than the load balancers. This feature allows you to deploy a load balancer in one subscription and reference a virtual network in another subscription.


## Prerequisites

# [Azure PowerShell](#tab/azurepowershell)

- Two Azure subscriptions. 
- An Azure account with active subscriptions. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
- An existing [Virtual Network](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/quick-create-powershell.md). deployed in one of the subscriptions. For this example, the virtual network is in **Azure Subscription A**.
- Azure PowerShell installed locally or Azure Cloud Shell.

If you choose to install and use PowerShell locally, this article requires the Azure PowerShell module version 5.4.1 or later. Run `Get-Module -ListAvailable Az` to find the installed version. If you need to upgrade, see Install Azure PowerShell module. If you're running PowerShell locally, you also need to run `Connect-AzAccount` to create a connection with Azure.

> **Important:**
> All of the code samples will use example names and placeholders. Be sure to replace these with the values from your environment.
> The values needing replacement will be enclosed in angle brackets, like this: `<example value>`.
> 
  
# [Azure CLI](#tab/azurecli/)

- Two Azure subscriptions. One subscription for the virtual network (**Azure Subscription A**) and another subscription for the load balancer(**Azure Subscription B**).
- An Azure account with active subscriptions. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
- An existing [Virtual Network](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/quick-create-cli.md). deployed in one of the subscriptions. For this example, the virtual network is in **Azure Subscription A**.

[Include unavailable in this source snapshot: ~/reusable-content/azure-cli/azure-cli-prepare-your-environment-no-header.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/load-balancer/cross-subscription-how-to-attach-backend.md)

If you choose to install and use the CLI locally, this quickstart requires Azure CLI version 2.60 or later. To find the version, run az --version. If you need to install or upgrade, see Install the Azure CLI.

> **Important:**
> All of the code samples will use example names and placeholders. Be sure to replace these with the values from your environment.
> The values needing replacement will be enclosed in angle brackets, like this: `<example value>`.

---


## Sign in to Azure

# [Azure PowerShell](#tab/azurepowershell)

With Azure PowerShell, you sign into Azure with [`Connect-AzAccount`](https://learn.microsoft.com/powershell/module/az.accounts/connect-azaccount), and change your subscription context with [`Set-AzContext`](https://learn.microsoft.com/powershell/module/az.accounts/set-azcontext) to **Azure Subscription A**. Then get the virtual network information with [`Get-AzVirtualNetwork`](https://learn.microsoft.com/powershell/module/az.network/get-azvirtualnetwork). You need the Azure subscription ID, resource group name, and virtual network name from your environment.
 

```azurepowershell

# Sign in to Azure
Connect-AzAccount

# Set the subscription context to Azure Subscription A
Set-AzContext -Subscription '<Azure Subscription A>'     

# Get the Virtual Network information with Get-AzVirtualNetwork
$net = @{
    Name = 'virtual-network-subA'
    ResourceGroupName = 'resource-group-v2'
}
$vnet = Get-AzVirtualNetwork @net
```

# [Azure CLI](#tab/azurecli/)

```azurecli

With Azure CLI, you'll sign into Azure with [az login](/cli/azure/reference-index#az-login), and change your subscription context with [`az account set`](/cli/azure/account#az_account_set) to **Azure Subscription A**.

```azurecli

# Sign in to Azure CLI and change subscription to Azure Subscription A
Az login
Az account set –subscription <Azure Subscription A>
```

---


## Create a resource group

In this section, you create a resource group in **Azure Subscription B**. This resource group is for all of your resources associate with your load balancer.

# [Azure PowerShell](#tab/azurepowershell)

With Azure PowerShell, you switch the subscription context with [`Set-AzContext`](https://learn.microsoft.com/powershell/module/az.accounts/set-azcontext) and create a resource group with [`New-AzResourceGroup`](https://learn.microsoft.com/powershell/module/az.resources/new-azresourcegroup).

```azurepowershell

# Set the subscription context to Azure Subscription B
Set-AzContext -Subscription '<Azure Subscription B>'  

# Create a resource group  
$rg = @{
    Name = 'myResourceGroupLB'
    Location = 'westus'
}
New-AzResourceGroup @rg
```
> **Note:**
> When create the resource group for your load balancer, use the same Azure region as the virtual network in **Azure Subscription A**.

# [Azure CLI](#tab/azurecli/)

With Azure CLI, you switch the subscription context with [`az account set`](https://learn.microsoft.com/cli/azure/account#az_account_set) and create a resource group with [`az group create`](https://learn.microsoft.com/cli/azure/group#az_group_create).

```azurecli
# Create a resource group in Azure Subscription B
az group create --name 'myResourceGroupLB' --location westus
```

> **Note:**
> When create the resource group for your load balancer, use the same Azure region as the virtual network in **Azure Subscription A**.

---


## Create a load balancer 

In this section, you create a load balancer in **Azure Subscription B**. You create a load balancer with a frontend IP address.

# [Azure PowerShell](#tab/azurepowershell)
With Azure PowerShell, you'll:

- A load balancer with [`New-AzLoadBalancer`](https://learn.microsoft.com/powershell/module/az.network/new-azloadbalancer)
- Create a public IP address with [`New-AzPublicIpAddress`](https://learn.microsoft.com/powershell/module/az.network/new-azpublicipaddress)
- Add a frontend IP configuration with [`Add-AzLoadBalancerFrontendIpConfig`](https://learn.microsoft.com/powershell/module/az.network/add-azloadbalancerfrontendipconfig)
- Create a backend address pool with [`New-AzLoadBalancerBackendAddressPool`](https://learn.microsoft.com/powershell/module/az.network/new-azloadbalancerbackendaddresspool).

```azurepowershell
# Create a load balancer
$loadbalancer = @{
    ResourceGroupName = 'resource group B'
    Name = 'LB Name'
    Location = 'eastus'
    Sku = 'Standard'
}
$LB = New-AzLoadBalancer @loadbalancer

$LBinfo = @{
    ResourceGroupName = 'resource group B'
    Name = 'my-lb'
}

# Create a public IP address
$publicip = @{
    Name = 'IP Address Name'
    ResourceGroupName = 'resource group B'
    Location = 'eastus'
    Sku = 'Standard'
    AllocationMethod = 'static'
    Zone = 1,2,3
}
New-AzPublicIpAddress @publicip


# Place public IP created in previous steps into variable
$pip = @{
    Name = 'IP Address Name'
    ResourceGroupName = 'resource group B'
}
$publicIp = Get-AzPublicIpAddress @pip

## Create load balancer frontend configuration and place in variable
$fip = @{
    Name = 'Frontend Name'
    PublicIpAddress = $publicip
}
$LB = $LB | Add-AzLoadBalancerFrontendIpConfig @fip
$LB = $LB | Set-AzLoadBalancer

# Create backend address pool configuration and place in variable. ##

$be = @{
    ResourceGroupName= "resource group B"
    Name= "myBackEndPool"
    LoadBalancerName= "LB Name"
    VirtualNetwork=$vnet.id
    SyncMode= "Automatic"
}

#Create the backend pool
$backend = New-AzLoadBalancerBackendAddressPool @be
$LB = Get-AzLoadBalancer @LBinfo
```
# [Azure CLI](#tab/azurecli)

With Azure CLI, you create a load balancer with [`az network lb create`](https://learn.microsoft.com/cli/azure/network/lb#az_network_lb_create) and update the backend pool. This example configures the following resources:

- A frontend IP address that receives the incoming network traffic on the load balancer.
- A backend address pool where the frontend IP sends the load balanced network traffic.

```azurecli

# Create a load balancer
az network lb create --resource-group myResourceGroupLB --name myLoadBalancer --sku Standard --public-ip-address myPublicIP   --frontend-ip-name myFrontEnd --backend-pool-name BackendPool1 --tags 'IsRemoteFrontend=true'

```

In order to utilize the cross-subscription feature of Azure load balancer, backend pools need to have the syncMode property enabled and a virtual network reference. This section updates the backend pool created prior by attaching the cross-subscription virtual network and enabling the syncMode property. 

```azurecli
## Configure the backend address pool and syncMode property
az network lb address-pool update --lb-name myLoadBalancer --resource-group myResourceGroupLB -n myResourceGroupLB --vnet ‘/subscriptions/<subscription A ID>/resourceGroups/{resource group name}/providers/Microsoft.Network/virtualNetwork/{VNet name}’ --sync-mode Automatic
```

---


## Create a health probe and load balancer rule

Create a health probe that determines the health of the backend VM instances and a load balancer rule that defines the frontend IP configuration for the incoming traffic, the backend IP pool to receive the traffic, and the required source and destination port.

# [Azure PowerShell](#tab/azurepowershell)

With Azure PowerShell, create a health probe with [`Add-AzLoadBalancerProbeConfig`](https://learn.microsoft.com/powershell/module/az.network/add-azloadbalancerprobeconfig) that determines the health of the backend VM instances. Then create a load balancer rule with [`Add-AzLoadBalancerRuleConfig`](https://learn.microsoft.com/powershell/module/az.network/add-azloadbalancerruleconfig) that defines the frontend IP configuration for the incoming traffic, the backend IP pool to receive the traffic, and the required source and destination port.

```azurepowershell
## Create the health probe and place in variable. ##
$probe = @{
    Name = 'myHealthProbe2'
    Protocol = 'tcp'
    Port = '80'
    IntervalInSeconds = '360'
    ProbeCount = '5'
}

## Create the load balancer rule and place in variable. ##
$lbrule = @{
    Name = 'myHTTPRule2'
    Protocol = 'tcp'
    FrontendPort = '80'
    BackendPort = '80'
    IdleTimeoutInMinutes = '15'
    FrontendIpConfiguration = $LB.FrontendIpConfigurations[0]
    BackendAddressPool = $backend
}
## Set the load balancer resource. ##
$LB | Add-AzLoadBalancerProbeConfig @probe
$LB | Add-AzLoadBalancerRuleConfig  @lbrule
$LB | Set-AzLoadBalancer
```
# [Azure CLI](#tab/azurecli/)

With Azure CLI, create a health probe with [`az network lb probe create`](https://learn.microsoft.com/cli/azure/network/lb/probe#az_network_lb_probe_create) that determines the health of the backend VM instances. Then create a load balancer rule with [`az network lb rule create`](https://learn.microsoft.com/cli/azure/network/lb/rule#az_network_lb_rule_create) that defines the frontend IP configuration for the incoming traffic, the backend IP pool to receive the traffic, and the required source and destination port.

```azurecli
# Create a health probe
az network lb probe create --resource-group myResourceGroupLB --lb-name myLoadBalancer --name myHealthProbe --protocol tcp --port 80

# Create a load balancer rule
az network lb rule create --resource-group myResourceGroupLB --lb-name myLoadBalancer --name myHTTPRule --protocol tcp --frontend-port 80 --backend-port 80 --frontend-ip-name myFrontEnd --backend-pool-name myBackEndPool --probe-name myHealthProbe --disable-outbound-snat true --idle-timeout 15 --enable-tcp-reset true

```

---



## Attach network interface cards to the load balancer

# [Azure PowerShell](#tab/azurepowershell)
In this section, you attach the network interface card (NIC) in **Azure Subscription A** to the load balancer in **Azure Subscription B**. You create a network interface with [`New-AzNetworkInterface`](https://learn.microsoft.com/powershell/module/az.network/new-aznetworkinterface) and then create an IP configuration for the network interface card with [`New-AzNetworkInterfaceIpConfig`](https://learn.microsoft.com/powershell/module/az.network/new-aznetworkinterfaceipconfig).

> **Note:**
> The network interface card (NIC) must be in the same VNet as the load balancer’s backend pool.

```azurepowershell

# Set the subscription context to **Azure Subscription A**
Set-AzContext -Subscription 'Sub A' 

# Create a network interface card
$IP1 = @{
    Name = 'MyIpConfig'
    subnetID= $vnet.subnets[0].Id
    PrivateIpAddressVersion = 'IPv4'
}
$IP1Config = New-AzNetworkInterfaceIpConfig @IP1 -Primary
$nic = @{
    Name = 'MyNic'
    ResourceGroupName = '<Resource Group Subscription A>'
    Location = 'eastus'
    IpConfiguration = $IP1Config
    LoadBalancerBackendAddressPool = "/subscriptions/<Subscription B ID>/resourceGroups/myResourceGroupLB/providers/Microsoft.Network/loadBalancers/myLoadBalancer/backendAddressPools/BackendPool1"
}
New-AzNetworkInterface @nic
```

# [Azure CLI](#tab/azurecli)

In this section, you attach the network interface card (NIC) in **Azure Subscription A** to the load balancer in **Azure Subscription B** with [`az network nic create`](https://learn.microsoft.com/cli/azure/network/nic#az-network-nic-create)

> **Note:**
> The network interface card (NIC) must be in the same VNet as the load balancer’s backend pool.

```azurecli
# Set the subscription context to **Azure Subscription A**
Az account set –subscription 'Sub A'

# Attach the network interface card to the load balancer
az network nic create --name NIC --resource-group NIC-rg --vnet VNET-name --lb-address-pool "/subscriptions/<Subscription B ID>/resourceGroups/myResourceGroupLB/providers/Microsoft.Network/loadBalancers/myLoadBalancer/backendAddressPools/BackendPool1"
```
---



## Clean up resources

When no longer needed, you can use the Remove-AzResourceGroup command to remove the resource group you created along with the load balancer, and the remaining resources.

# [Azure PowerShell](#tab/azurepowershell)

```azurepowershell
Remove-AzResourceGroup -Name 'myResourceGroupLB'
```

# [Azure CLI](#tab/azurecli)

```azurecli
az group delete --name myResourceGroupLB
```
---

## Next steps

> 
> [Create a cross-subscription internal load balancer](cross-subscription-how-to-internal-load-balancer.md)
