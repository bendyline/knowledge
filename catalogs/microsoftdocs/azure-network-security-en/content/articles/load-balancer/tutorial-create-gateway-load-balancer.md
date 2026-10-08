---
title: 'Tutorial: Create a gateway load balancer'
titleSuffix: Azure Load Balancer
description: Use this tutorial to learn how to create a gateway load balancer using the Azure portal, Azure PowerShell, and Azure CLI.
author: mbender-ms
ms.author: mbender
ms.service: azure-load-balancer
ms.topic: tutorial
ms.date: 03/21/2025
ms.custom: template-tutorial
# Customer intent: "As a cloud architect, I want to create a gateway load balancer using the appropriate tools, so that I can ensure high performance and scalability for my network virtual appliances."
---

# Tutorial: Create a gateway load balancer

Azure Load Balancer consists of Standard and Gateway SKUs. Use Gateway Load Balancer for transparent insertion of Network Virtual Appliances (NVA). Choose Gateway Load Balancer for scenarios that require high performance and high scalability of NVAs.

In this tutorial, you learn how to:

> 
> * Create virtual network.
> * Create network security group.
> * Create a gateway load balancer.
> * Chain a load balancer frontend to gateway load balancer.

You can choose to create a gateway load balancer using the Azure portal, Azure CLI, or Azure PowerShell.

## Prerequisites

# [Azure portal](#tab/azureportal)

- An Azure subscription. If you don’t have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.
- Two **standard** sku Azure Load Balancers with backend pools deployed in two different Azure regions.
    - For information on creating a regional standard load balancer and virtual machines for backend pools, see [Quickstart: Create a public load balancer to load balance VMs using the Azure portal](quickstart-load-balancer-standard-public-portal.md).

# [Azure CLI](#tab/azurecli/)

[Include unavailable in this source snapshot: ~/reusable-content/azure-cli/azure-cli-prepare-your-environment-no-header.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/load-balancer/tutorial-create-gateway-load-balancer.md)

- This tutorial requires version 2.0.28 or later of the Azure CLI. If using Azure Cloud Shell, the latest version is already installed.

- An Azure account with an active subscription.[Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

- An existing public standard SKU Azure Load Balancer. For more information on creating a load balancer, see **[Create a public load balancer using the Azure CLI](quickstart-load-balancer-standard-public-cli.md)**.
    - For the purposes of this tutorial, the existing load balancer in the examples is named **myLoadBalancer**.

# [Azure PowerShell](#tab/azurepowershell/)

- An Azure account with an active subscription.[Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- An existing public standard SKU Azure Load Balancer. For more information on creating a load balancer, see **[Create a public load balancer using Azure PowerShell](quickstart-load-balancer-standard-public-powershell.md)**.
    - For the purposes of this tutorial, the existing load balancer in the examples is named **myLoadBalancer**.
- Azure PowerShell installed locally or Azure Cloud Shell

If you choose to install and use PowerShell locally, this article requires the Azure PowerShell module version 5.4.1 or later. Run `Get-Module -ListAvailable Az` to find the installed version. If you need to upgrade, see [Install Azure PowerShell module](https://learn.microsoft.com/powershell/azure/install-azure-powershell). If you're running PowerShell locally, you also need to run `Connect-AzAccount` to create a connection with Azure.

---

## Create a virtual network and associated resources

# [Azure portal](#tab/azureportal)


The following procedure creates a virtual network with a resource subnet, an Azure Bastion subnet, and an Azure Bastion host.

> **Important:**
> [Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/bastion-pricing.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/load-balancer/tutorial-create-gateway-load-balancer.md)

1. In the portal, search for and select **Virtual networks**.

1. On the **Virtual networks** page, select **+ Create**.

1. On the **Basics** tab of **Create virtual network**, enter, or select the following information:

    | Setting | Value |
    | --- | --- |
    | **Project details** |  |
    | Subscription | Select your subscription. |
    | Resource group | Select **Create new**. </br> Enter **load-balancer-rg** in Name. </br> Select **OK**. |
    | **Instance details** |  |
    | Name | Enter **lb-vnet**. |
    | Region | Select **East US**. |

1. Select the **Security** tab or **Next** button at the bottom of the page.
1. Under **Azure Bastion**, enter or select the following information:

    | Setting | Value |
    | --- | --- |
    | **Azure Bastion** |  |
    | Enable Azure Bastion | Select checkbox. |
    | Azure Bastion host name | Enter **lb-bastion**. |
    | Azure Bastion public IP address | Select **Create new**. </br> Enter **lb-bastion-ip** in Name. </br> Select **OK**. |

1. Select the **IP addresses** tab, or **Next** at the bottom of the page.
1. On **Create virtual network** page, enter or select the following information:

    | Setting | Value |
    | --- | --- |
    | **Add IPv4 address space** |  |
    | IPv4 address space | Enter **10.0.0.0/16 (65,356 addresses)**. |
    | **Subnets** | Select the **default** subnet link to edit. |
    | Subnet template | Leave the default **Default**. |
    | Name | Enter **backend-subnet**. |
    | Starting address | Enter **10.0.0.0**. |
    | Subnet size | Enter **/24(256 addresses)**. |
    | **Security** |  |
    | NAT Gateway | Select **None**. |

1. Select **Save**.

1. Select **Review + create** at the bottom of the screen, and when validation passes, select **Create**.

# [Azure CLI](#tab/azurecli/)

The following sections describe how to create a virtual network and associated resources. The virtual network is needed for the resources that are in the backend pool of the gateway load balancer.

The resources include a bastion host, network security group, and network security group rules.

### Create a resource group

An Azure resource group is a logical container into which Azure resources are deployed and managed.

Create a resource group with [az group create](https://learn.microsoft.com/cli/azure/group#az-group-create):

```azurecli-interactive
  az group create \
    --name TutorGwLB-rg \
    --location eastus

```

## Create virtual network

A virtual network is needed for the resources that are in the backend pool of the gateway load balancer.  

Use [az network virtual network create](https://learn.microsoft.com/cli/azure/network/vnet#az-network-vnet-create) to create the virtual network.

```azurecli-interactive
  az network vnet create \
    --resource-group TutorGwLB-rg \
    --location eastus \
    --name myVNet \
    --address-prefixes 10.1.0.0/16 \
    --subnet-name myBackendSubnet \
    --subnet-prefixes 10.1.0.0/24
```

## Create bastion public IP address

Use [az network public-ip create](https://learn.microsoft.com/cli/azure/network/public-ip#az-network-public-ip-create) to create a public IP address for the Azure Bastion host

```azurecli-interactive
az network public-ip create \
    --resource-group TutorGwLB-rg \
    --name myBastionIP \
    --sku Standard \
    --zone 1 2 3
```

## Create bastion subnet

Use [az network vnet subnet create](https://learn.microsoft.com/cli/azure/network/vnet/subnet#az-network-vnet-subnet-create) to create the bastion subnet.

```azurecli-interactive
az network vnet subnet create \
    --resource-group TutorGwLB-rg \
    --name AzureBastionSubnet \
    --vnet-name myVNet \
    --address-prefixes 10.1.1.0/27
```

## Create bastion host

Use [az network bastion create](https://learn.microsoft.com/cli/azure/network/bastion#az-network-bastion-create) to deploy a bastion host for secure management of resources in virtual network.

```azurecli-interactive
az network bastion create \
    --resource-group TutorGwLB-rg \
    --name myBastionHost \
    --public-ip-address myBastionIP \
    --vnet-name myVNet \
    --location eastus
```

It can take a few minutes for the Azure Bastion host to deploy.

> **Important:**
> [Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/bastion-pricing.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/load-balancer/tutorial-create-gateway-load-balancer.md)

## Create NSG

Use the following example to create a network security group. You configure the NSG rules needed for network traffic in the virtual network created previous

Use [az network nsg create](https://learn.microsoft.com/cli/azure/network/nsg#az-network-nsg-create) to create the NSG.

```azurecli-interactive
  az network nsg create \
    --resource-group TutorGwLB-rg \
    --name myNSG
```

## Create NSG Rules

Use [az network nsg rule create](https://learn.microsoft.com/cli/azure/network/nsg/rule#az-network-nsg-rule-create) to create rules for the NSG.

```azurecli-interactive
  az network nsg rule create \
    --resource-group TutorGwLB-rg \
    --nsg-name myNSG \
    --name myNSGRule-AllowAll \
    --protocol '*' \
    --direction inbound \
    --source-address-prefix '0.0.0.0/0' \
    --source-port-range '*' \
    --destination-address-prefix '0.0.0.0/0' \
    --destination-port-range '*' \
    --access allow \
    --priority 100

  az network nsg rule create \
    --resource-group TutorGwLB-rg \
    --nsg-name myNSG \
    --name myNSGRule-AllowAll-TCP-Out \
    --protocol 'TCP' \
    --direction outbound \
    --source-address-prefix '0.0.0.0/0' \
    --source-port-range '*' \
    --destination-address-prefix '0.0.0.0/0' \
    --destination-port-range '*' \
    --access allow \
    --priority 100
```

# [Azure PowerShell](#tab/azurepowershell/)

The following sections describe how to create a virtual network and associated resources. The virtual network is needed for the resources that are in the backend pool of the gateway load balancer.

The resources include a bastion host, network security group, and network security group rules.

## Create a resource group

An Azure resource group is a logical container into which Azure resources are deployed and managed.

Create a resource group with [New-AzResourceGroup](https://learn.microsoft.com/powershell/module/az.resources/new-azresourcegroup):

```azurepowershell-interactive
New-AzResourceGroup -Name 'TutorGwLB-rg' -Location 'eastus'

```

## Create virtual network

A virtual network is needed for the resources that are in the backend pool of the gateway load balancer. Use [New-AzVirtualNetwork](https://learn.microsoft.com/powershell/module/az.network/new-azvirtualnetwork) to create the virtual network. Use [New-AzBastion](https://learn.microsoft.com/powershell/module/az.network/new-azbastion) to deploy a bastion host for secure management of resources in virtual network.

> **Important:**

> [Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/bastion-pricing.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/load-balancer/tutorial-create-gateway-load-balancer.md)

>

```azurepowershell-interactive
## Create backend subnet config ##
$subnet = @{
    Name = 'myBackendSubnet'
    AddressPrefix = '10.1.0.0/24'
}
$subnetConfig = New-AzVirtualNetworkSubnetConfig @subnet 

## Create Azure Bastion subnet. ##
$bastsubnet = @{
    Name = 'AzureBastionSubnet' 
    AddressPrefix = '10.1.1.0/24'
}
$bastsubnetConfig = New-AzVirtualNetworkSubnetConfig @bastsubnet

## Create the virtual network ##
$net = @{
    Name = 'myVNet'
    ResourceGroupName = 'TutorGwLB-rg'
    Location = 'eastus'
    AddressPrefix = '10.1.0.0/16'
    Subnet = $subnetConfig,$bastsubnetConfig
}
$vnet = New-AzVirtualNetwork @net

## Create public IP address for bastion host. ##
$ip = @{
    Name = 'myBastionIP'
    ResourceGroupName = 'TutorGwLB-rg'
    Location = 'eastus'
    Sku = 'Standard'
    AllocationMethod = 'Static'
}
$publicip = New-AzPublicIpAddress @ip

## Create bastion host ##
$bastion = @{
    ResourceGroupName = 'TutorGwLB-rg'
    Name = 'myBastion'
    PublicIpAddress = $publicip
    VirtualNetwork = $vnet
}
New-AzBastion @bastion -AsJob

```

## Create NSG

Use the following example to create a network security group. You configure the NSG rules needed for network traffic in the virtual network created previously.

Use [New-AzNetworkSecurityRuleConfig](https://learn.microsoft.com/powershell/module/az.network/new-aznetworksecurityruleconfig) to create rules for the NSG. Use [New-AzNetworkSecurityGroup](https://learn.microsoft.com/powershell/module/az.network/new-aznetworksecuritygroup) to create the NSG.

```azurepowershell-interactive
## Create rule for network security group and place in variable. ##
$nsgrule1 = @{
    Name = 'myNSGRule-AllowAll'
    Description = 'Allow all'
    Protocol = '*'
    SourcePortRange = '*'
    DestinationPortRange = '*'
    SourceAddressPrefix = '0.0.0.0/0'
    DestinationAddressPrefix = '0.0.0.0/0'
    Access = 'Allow'
    Priority = '100'
    Direction = 'Inbound'
}
$rule1 = New-AzNetworkSecurityRuleConfig @nsgrule1

$nsgrule2 = @{
    Name = 'myNSGRule-AllowAll-TCP-Out'
    Description = 'Allow all TCP Out'
    Protocol = 'TCP'
    SourcePortRange = '*'
    DestinationPortRange = '*'
    SourceAddressPrefix = '0.0.0.0/0'
    DestinationAddressPrefix = '0.0.0.0/0'
    Access = 'Allow'
    Priority = '100'
    Direction = 'Outbound'
}
$rule2 = New-AzNetworkSecurityRuleConfig @nsgrule2

## Create network security group ##
$nsg = @{
    Name = 'myNSG'
    ResourceGroupName = 'TutorGwLB-rg'
    Location = 'eastus'
    SecurityRules = $rule1,$rule2
}
New-AzNetworkSecurityGroup @nsg
```

---

## Create and configure a gateway load balancer

# [Azure portal](#tab/azureportal)

In this section, you create the configuration and deploy the gateway load balancer. 

1. In the search box at the top of the portal, enter **Load balancer**. Select **Load balancers** in the search results.

1. In the **Load Balancer** page, select **Create**.

1. In the **Basics** tab of the **Create load balancer** page, enter, or select the following information: 

    | **Setting** | **Value** |
    | --- | --- |
    | **Project details** |  |
    | Subscription | Select your subscription. |
    | Resource group | Select **load-balancer-rg**. |
    | **Instance details** |  |
    | Name | Enter **gateway-load-balancer** |
    | Region | Select **(US) East US**. |
    | SKU | Select **Gateway**. |
    | Type | Select **Internal**. |

    Screenshot of create standard load balancer basics tab.

1. Select **Next: Frontend IP configuration** at the bottom of the page.

1. In **Frontend IP configuration**, select **+ Add a frontend IP**.
1. In **Add frontend IP configuration**, enter or select the following information:
   
    | **Setting** | **Value** |
    | --- | --- |
    | Name | Enter **lb-frontend-IP**. |
    | Virtual network | Select **lb-vnet**. |
    | Subnet | Select **backend-subnet**. |
    | Assignment | Select **Dynamic** |

1. Select **Save**.

1.  Select **Next: Backend pools** at the bottom of the page.

1.  In the **Backend pools** tab, select **+ Add a backend pool**.

5.  In **Add backend pool**, enter or select the following information.

    | **Setting** | **Value** |
    | --- | --- |
    | Name | Enter **lb-backend-pool**. |
    | Backend Pool Configuration | Select **NIC**. |
    | **Gateway load balancer configuration** |  |
    | Type | Select **Internal and External**. |
    | Internal port | Leave the default of **10800**. |
    | Internal identifier | Leave the default of **800**. |
    | External port | Leave the default of **10801**. |
    | External identifier | Leave the default of **801**. |

6.  Select **Save**.

7.  Select the **Next: Inbound rules** button at the bottom of the page.

8.  In **Load balancing rule** in the **Inbound rules** tab, select **+ Add a load balancing rule**.

9.  In **Add load balancing rule**, enter or select the following information:

    | **Setting** | **Value** |
    | --- | --- |
    | Name | Enter **lb-rule** |
    | IP Version | Select **IPv4** or **IPv6** depending on your requirements. |
    | Frontend IP address | Select **lb-frontend-IP**. |
    | Backend pool | Select **lb-backend-pool**. |
    | Health probe | Select **Create new**.</br> In **Name**, enter **lb-health-probe**.</br> Select **TCP** in **Protocol**.</br> Leave the rest of the defaults, and select **Save**. |
    | Session persistence | Select **None**. |
    | Enable TCP reset | Leave default of unchecked. |
    | Enable floating IP | Leave default of unchecked. |

    Screenshot of create load-balancing rule.

10. Select **Save**.

11. Select the blue **Review + create** button at the bottom of the page.

12. Select **Create**.

# [Azure CLI](#tab/azurecli/)

In this section, you create a gateway load balancer and configure it with a backend pool and frontend IP configuration. The backend pool is associated with the existing load balancer created in the prerequisites.

## Create Gateway Load Balancer

To create the load balancer, use [az network lb create](https://learn.microsoft.com/cli/azure/network/lb#az-network-lb-create).

```azurecli-interactive
  az network lb create \
    --resource-group TutorGwLB-rg \
    --name myLoadBalancer-gw \
    --sku Gateway \
    --vnet-name myVNet \
    --subnet myBackendSubnet \
    --backend-pool-name myBackendPool \
    --frontend-ip-name myFrontEnd
```

## Create tunnel interface

An internal interface is automatically created with Azure CLI with the **`--identifier`** of **900** and **`--port`** of **10800**.

You use [az network lb address-pool tunnel-interface add](https://learn.microsoft.com/cli/azure/network/lb/address-pool/tunnel-interface#az-network-lb-address-pool-tunnel-interface-add) to create external tunnel interface for the load balancer. 

```azurecli-interactive
  az network lb address-pool tunnel-interface add \
    --address-pool myBackEndPool \
    --identifier '901' \
    --lb-name myLoadBalancer-gw \
    --protocol VXLAN \
    --resource-group TutorGwLB-rg \
    --type External \
    --port '10801'
```

## Create health probe

A health probe is required to monitor the health of the backend instances in the load balancer. Use [az network lb probe create](https://learn.microsoft.com/cli/azure/network/lb/probe#az-network-lb-probe-create) to create the health probe.

```azurecli-interactive
  az network lb probe create \
    --resource-group TutorGwLB-rg \
    --lb-name myLoadBalancer-gw \
    --name myHealthProbe \
    --protocol http \
    --port 80 \
    --path '/' \
    --interval '5' \
    --threshold '2'
    
```

## Create load-balancing rule

Traffic destined for the backend instances is routed with a load-balancing rule. Use [az network lb rule create](https://learn.microsoft.com/cli/azure/network/lb/probe#az-network-lb-rule-create)  to create the load-balancing rule.

```azurecli-interactive
  az network lb rule create \
    --resource-group TutorGwLB-rg \
    --lb-name myLoadBalancer-gw \
    --name myLBRule \
    --protocol All \
    --frontend-port 0 \
    --backend-port 0 \
    --frontend-ip-name myFrontEnd \
    --backend-pool-name myBackEndPool \
    --probe-name myHealthProbe
```

# [Azure PowerShell](#tab/azurepowershell/)

In this section, you create the configuration and deploy the gateway load balancer. Use [New-AzLoadBalancerFrontendIpConfig](https://learn.microsoft.com/powershell/module/az.network/new-azloadbalancerfrontendipconfig) to create the frontend IP configuration of the load balancer. 

You use [New-AzLoadBalancerTunnelInterface](https://learn.microsoft.com/powershell/module/az.network/new-azloadbalancerfrontendipconfig) to create two tunnel interfaces for the load balancer. 

Create a backend pool with [New-AzLoadBalancerBackendAddressPoolConfig](https://learn.microsoft.com/powershell/module/az.network/new-azloadbalancerbackendaddresspoolconfig) for the NVAs. 

A health probe is required to monitor the health of the backend instances in the load balancer. Use [New-AzLoadBalancerProbeConfig](https://learn.microsoft.com/powershell/module/az.network/new-azloadbalancerprobeconfig) to create the health probe.

Traffic destined for the backend instances is routed with a load-balancing rule. Use [New-AzLoadBalancerRuleConfig](https://learn.microsoft.com/powershell/module/az.network/new-azloadbalancerruleconfig)  to create the load-balancing rule.

To create the deploy the load balancer, use [New-AzLoadBalancer](https://learn.microsoft.com/powershell/module/az.network/new-azloadbalancer).

```azurepowershell-interactive
## Place virtual network configuration in a variable for later use. ##
$net = @{
    Name = 'myVNet'
    ResourceGroupName = 'TutorGwLB-rg'
}
$vnet = Get-AzVirtualNetwork @net

## Create load balancer frontend configuration and place in variable. ## 
$fe = @{
    Name = 'myFrontend'
    SubnetId = $vnet.subnets[0].id
}
$feip = New-AzLoadBalancerFrontendIpConfig @fe

## Create backend address pool configuration and place in variable. ## 
$int1 = @{
    Type = 'Internal'
    Protocol = 'Vxlan'
    Identifier = '800'
    Port = '10800'
}
$tunnelInterface1 = New-AzLoadBalancerBackendAddressPoolTunnelInterfaceConfig @int1

$int2 = @{
    Type = 'External'
    Protocol = 'Vxlan'
    Identifier = '801'
    Port = '10801'
}
$tunnelInterface2 = New-AzLoadBalancerBackendAddressPoolTunnelInterfaceConfig @int2

$pool = @{
    Name = 'myBackendPool'
    TunnelInterface = $tunnelInterface1,$tunnelInterface2
}
$bepool = New-AzLoadBalancerBackendAddressPoolConfig @pool

## Create the health probe and place in variable. ## 
$probe = @{
    Name = 'myHealthProbe'
    Protocol = 'http'
    Port = '80'
    IntervalInSeconds = '360'
    ProbeCount = '5'
    RequestPath = '/'
}
$healthprobe = New-AzLoadBalancerProbeConfig @probe

## Create the load balancer rule and place in variable. ## 
$para = @{
    Name = 'myLBRule'
    Protocol = 'All'
    FrontendPort = '0'
    BackendPort = '0'
    FrontendIpConfiguration = $feip
    BackendAddressPool = $bepool
    Probe = $healthprobe
}
$rule = New-AzLoadBalancerRuleConfig @para

## Create the load balancer resource. ## 
$lb = @{
    ResourceGroupName = 'TutorGwLB-rg'
    Name = 'myLoadBalancer-gw'
    Location = 'eastus'
    Sku = 'Gateway'
    LoadBalancingRule = $rule
    FrontendIpConfiguration = $feip
    BackendAddressPool = $bepool
    Probe = $healthprobe
}
New-AzLoadBalancer @lb

```

---

## Add network virtual appliances to the Gateway Load Balancer backend pool
> **Note:**
> If leveraging your own custom network virtual appliance in the backend pool of a Gateway Load Balancer, please ensure the MTU of all NVA virtual machines are raised to a minimum of 1550 bytes to accommodate for the VXLAN encapsulated headers. This will allow source packets up to the limit of 1500 byte packets in Azure, avoiding fragmentation.

# [Azure portal](#tab/azureportal)

Deploy NVAs through the Azure Marketplace. Once deployed, add the NVA virtual machines to the backend pool of the gateway load balancer. To add the virtual machines, go to the backend pools tab of your gateway load balancer.

# [Azure CLI](#tab/azurecli/)

Deploy NVAs through the Azure Marketplace. Once deployed, add the virtual machines to the backend pool with [az network nic ip-config address-pool add](https://learn.microsoft.com/cli/azure/network/nic/ip-config/address-pool#az-network-nic-ip-config-address-pool-add).

# [Azure PowerShell](#tab/azurepowershell/)

Deploy NVAs through the Azure Marketplace. Once deployed, add the virtual machines to the backend pool with [Set-AzNetworkInterfaceIpConfig -LoadBalancerBackendAddressPool](https://learn.microsoft.com/powershell/module/az.network/set-aznetworkinterfaceipconfig).

---

## Chain load balancer frontend to Gateway Load Balancer

# [Azure portal](#tab/azureportal)

In this example, you'll chain the frontend of a standard load balancer to the gateway load balancer. 

You add the frontend to the frontend IP of an existing load balancer in your subscription.

1. In the search box in the Azure portal, enter **Load balancer**. In the search results, select **Load balancers**.

2. In **Load balancers**, select **load-balancer** or your existing load balancer name.

3. In the load balancer page, select **Frontend IP configuration** in **Settings**.

4. Select the frontend IP of the load balancer. In this example, the name of the frontend is **lb-frontend-IP**.

    Screenshot of frontend IP configuration.

5. Select **lb-frontend-IP (10.1.0.4)** in the pull-down box next to **Gateway load balancer**.

6. Select **Save**.

    Screenshot of addition of gateway load balancer to frontend IP.

# [Azure CLI](#tab/azurecli/)

In this example, you'll chain the frontend of a standard load balancer to the gateway load balancer. 

You add the frontend to the frontend IP of an existing load balancer in your subscription.

Use [az network lb frontend-ip show](https://learn.microsoft.com/cli/azure/network/lb/frontend-ip#az-az-network-lb-frontend-ip-show) to place the resource ID of your gateway load balancer frontend into a variable.

Use [az network lb frontend-ip update](https://learn.microsoft.com/cli/azure/network/lb/frontend-ip#az-network-lb-frontend-ip-update) to chain the gateway load balancer frontend to your existing load balancer.

```azurecli-interactive
  feid=$(az network lb frontend-ip show \
    --resource-group TutorGwLB-rg \
    --lb-name myLoadBalancer-gw \
    --name myFrontend \
    --query id \
    --output tsv)

  az network lb frontend-ip update \
    --resource-group CreatePubLBQS-rg \
    --name myFrontendIP \
    --lb-name myLoadBalancer \
    --public-ip-address myPublicIP \
    --gateway-lb $feid

```

# [Azure PowerShell](#tab/azurepowershell/)

In this example, you'll chain the frontend of a standard load balancer to the gateway load balancer. 

You add the frontend to the frontend IP of an existing load balancer in your subscription.

Use [Set-AzLoadBalancerFrontendIpConfig](https://learn.microsoft.com/powershell/module/az.network/set-azloadbalancerfrontendipconfig) to chain the gateway load balancer frontend to your existing load balancer.

```azurepowershell-interactive
## Place the gateway load balancer configuration into a variable. ##
$par1 = @{
    ResourceGroupName = 'TutorGwLB-rg'
    Name = 'myLoadBalancer-gw'
}
$gwlb = Get-AzLoadBalancer @par1

## Place the existing load balancer into a variable. ##
$par2 = @{
    ResourceGroupName = 'CreatePubLBQS-rg'
    Name = 'myLoadBalancer'
}
$lb = Get-AzLoadBalancer @par2

## Place the existing public IP for the existing load balancer into a variable.
$par3 = @{
    ResourceGroupName = 'CreatePubLBQS-rg'
    Name = 'myPublicIP'
}
$publicIP = Get-AzPublicIPAddress @par3

## Chain the gateway load balancer to your existing load balancer frontend. ##
$par4 = @{
    Name = 'myFrontEndIP'
    PublicIPAddress = $publicIP
    LoadBalancer = $lb
    GatewayLoadBalancerId = $gwlb.FrontendIpConfigurations.Id
}
$config = Set-AzLoadBalancerFrontendIpConfig @par4

$config | Set-AzLoadBalancer

```

---

## Chain virtual machine to Gateway Load Balancer

# [Azure portal](#tab/azureportal)

Alternatively, you can chain a VM's NIC IP configuration to the gateway load balancer.

You add the gateway load balancer's frontend to an existing VM's NIC IP configuration.

> **Important:**
> A virtual machine must have a public IP address assigned before attempting to chain the NIC configuration to the frontend of the gateway load balancer.

1. In the search box in the Azure portal, enter **Virtual machine**. In the search results, select **Virtual machines**.

2. In **Virtual machines**, select the virtual machine that you want to add to the gateway load balancer. In this example, the virtual machine is named **myVM1**.

3. In the overview of the virtual machine, select **Networking** in **Settings**.

4. In **Networking**, select the name of the network interface attached to the virtual machine. In this example, it's **myvm1229**.

    Screenshot of virtual machine networking overview.

5. In the network interface page, select **IP configurations** in **Settings**.

6. Select **lb-frontend-IP** in **Gateway Load balancer**.

    Screenshot of nic IP configuration.

7. Select **Save**.

# [Azure CLI](#tab/azurecli/)

Alternatively, you can chain a VM's NIC IP configuration to the gateway load balancer. 

You add the gateway load balancer's frontend to an existing VM's NIC IP configuration.

Use [az network lb frontend-ip show](https://learn.microsoft.com/cli/azure/network/lb/frontend-ip#az-az-network-lb-frontend-ip-show) to place the resource ID of your gateway load balancer frontend into a variable.

Use [az network lb frontend-ip update](https://learn.microsoft.com/cli/azure/network/nic/ip-config#az-network-nic-ip-config-update) to chain the gateway load balancer frontend to your existing VM's NIC IP configuration.

```azurecli-interactive
 feid=$(az network lb frontend-ip show \
    --resource-group TutorGwLB-rg \
    --lb-name myLoadBalancer-gw \
    --name myFrontend \
    --query id \
    --output tsv)
    
  az network nic ip-config update \
    --resource-group MyResourceGroup
    --nic-name MyNIC 
    --name MyIPconfig 
    --gateway-lb $feid

```

# [Azure PowerShell](#tab/azurepowershell/)

Alternatively, you can chain a VM's NIC IP configuration to the gateway load balancer. 

You add the gateway load balancer's frontend to an existing VM's NIC IP configuration.

Use [Set-AzNetworkInterfaceIpConfig](https://learn.microsoft.com/powershell/module/az.network/set-aznetworkinterfaceipconfig) to chain the gateway load balancer frontend to your existing VM's NIC IP configuration.

```azurepowershell-interactive
 ## Place the gateway load balancer configuration into a variable. ##
$par1 = @{
    ResourceGroupName = 'TutorGwLB-rg'
    Name = 'myLoadBalancer-gw'
}
$gwlb = Get-AzLoadBalancer @par1

## Place the existing NIC into a variable. ##
$par2 = @{
    ResourceGroupName = 'MyResourceGroup'
    Name = 'myNic'
}
$nic = Get-AzNetworkInterface @par2

## Chain the gateway load balancer to your existing VM NIC. ##
$par3 = @{
    Name = 'myIPconfig'
    NetworkInterface = $nic
    GatewayLoadBalancerId = $gwlb.FrontendIpConfigurations.Id
}
$config = Set-AzNetworkInterfaceIpConfig @par3

$config | Set-AzNetworkInterface

```

---

## Clean up resources

# [Azure portal](#tab/azureportal)

When no longer needed, delete the resource group, load balancer, and all related resources. To do so, select the resource group **load-balancer-rg** that contains the resources and then select **Delete**.

# [Azure CLI](#tab/azurecli/)

When no longer needed, you can use the [az group delete](https://learn.microsoft.com/cli/azure/group#az-group-delete) command to remove the resource group, load balancer, and the remaining resources.

```azurecli-interactive
  az group delete \
    --name TutorGwLB-rg
```

# [Azure PowerShell](#tab/azurepowershell/)

When no longer needed, you can use the [Remove-AzResourceGroup](https://learn.microsoft.com/powershell/module/az.resources/remove-azresourcegroup) command to remove the resource group, load balancer, and the remaining resources.

```azurepowershell-interactive
Remove-AzResourceGroup -Name 'TutorGwLB-rg'
```

---

## Next steps

Create Network Virtual Appliances in Azure. 

When creating the NVAs, choose the resources created in this tutorial:

* Virtual network

* Subnet

* Network security group

* Gateway load balancer

Advance to the next article to learn how to create a cross-region Azure Load Balancer.
> 
> [Global load balancer](tutorial-cross-region-portal.md)
