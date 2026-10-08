---
title: 'Quickstart: Create an Azure Virtual Network'
description: Learn how to use the various deployment methods in Azure to create a virtual network.
author: asudbring
ms.author: allensu
ms.service: azure-virtual-network
ms.topic: quickstart  #Don't change
ms.date: 07/10/2025

#customer intent: As an administrator or network engineer, I want to create a virtual network and test traffic between virtual machines in the same virtual network.

# Customer intent: "As a network engineer, I want to deploy a virtual network with multiple subnets and virtual machines, so that I can establish secure communication and test connectivity between the resources within the network."
---

# Quickstart: Create an Azure Virtual Network
 
Learn how to create an Azure Virtual Network using the Azure portal, Azure CLI, Azure PowerShell, Azure Resource Manager (ARM) template, Bicep template, and Terraform. Two virtual machines and an Azure Bastion host are deployed to test connectivity between the virtual machines in the same virtual network. The Azure Bastion host facilitates secure and seamless RDP and SSH connectivity to the virtual machines directly in the Azure portal over SSL.

Diagram of resources created in the virtual network quickstart.

A virtual network is the fundamental building block for private networks in Azure. Azure Virtual Network enables Azure resources such as virtual machines to securely communicate with each other and the internet.

>[!VIDEO https://learn-video.azurefd.net/vod/player?id=6b5b138e-8406-406e-8b34-40bdadf9fc6d]

If you don't have an Azure account with an active subscription, [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

## Prerequisites

### [Portal](#tab/portal)

- An Azure account with an active subscription. You can [create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

### [PowerShell](#tab/powershell)

- An Azure account with an active subscription. You can [create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

- Azure Cloud Shell or Azure PowerShell.

  The steps in this quickstart run the Azure PowerShell cmdlets interactively in [Azure Cloud Shell](https://learn.microsoft.com/azure/cloud-shell/overview). To run the commands in the Cloud Shell, select **Open Cloud shell** at the upper-right corner of a code block. Select **Copy** to copy the code, and then paste it into Cloud Shell to run it. You can also run Cloud Shell from within the Azure portal.

  You can also [install Azure PowerShell locally](https://learn.microsoft.com/powershell/azure/install-azure-powershell) to run the cmdlets. The steps in this article require Azure PowerShell module version 5.4.1 or later. Run `Get-Module -ListAvailable Az` to find your installed version. If you need to upgrade, see [Update the Azure PowerShell module](https://learn.microsoft.com/powershell/azure/install-Az-ps#update-the-azure-powershell-module).

  If you run PowerShell locally, run `Connect-AzAccount` to connect to Azure.

### [CLI](#tab/cli)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/quickstarts-free-trial-note.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/quickstart-create-virtual-network.md)

[Include unavailable in this source snapshot: ~/reusable-content/azure-cli/azure-cli-prepare-your-environment-no-header.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/quickstart-create-virtual-network.md)

- This article requires version 2.0.28 or later of the Azure CLI. If using Azure Cloud Shell, the latest version is already installed.

If you're running Azure CLI locally, use Azure CLI version 2.0.31 or later.

### [ARM template](#tab/arm)

- An Azure account with an active subscription. You can [create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/resource-manager-quickstart-introduction.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/quickstart-create-virtual-network.md)

### [Bicep](#tab/bicep)

- An Azure account with an active subscription. You can [create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

- To deploy the Bicep files, either the Azure CLI or Azure PowerShell installed.

### [Terraform](#tab/terraform)

- An Azure account with an active subscription. You can [create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

- [Installation and configuration of Terraform](https://learn.microsoft.com/azure/developer/terraform/quickstart-configure).

---

## Resource values

Use the following values to replace the placeholders of resources in this article:

| Setting | Placeholder | Value |
| --- | --- | --- |
| Resource group | `<resource-group>` | **test-rg** |
| Region | `<region>` | **East US 2** |
| Virtual network | `<virtual-network>` | **vnet-1** |
| Subnet | `<subnet>` | **subnet-1** |
| Network security group | `<network-security-group>` | **nsg-1** |
| Bastion | `<bastion>` | **bastion** |
| Virtual machine 1 | `<virtual-machine-1>` | **vm-1** |
| Virtual machine 2 | `<virtual-machine-2>` | **vm-2** |

### [Portal](#tab/portal)


<!-- This file is the canonical portal procedure for creating a resource group in the networking include set. articles/networking/includes/azure-virtual-network-manager/create-resource-group.md mirrors these steps. Update this file first, then mirror the change there. -->

## Create a resource group

1. Sign in to the [Azure portal](https://portal.azure.com) with your Azure account.

1. In the search box at the top of the portal, enter **Resource group**. Select **Resource groups** in the search results.

1. Select **+ Create**.

1. In the **Basics** tab of **Create a resource group**, enter or select the following information:

    | Setting | Value |
    | --- | --- |
    | Subscription | Select your subscription. |
    | Resource group | Enter **\<resource-group\>**. |
    | Region | Select **\<region\>**. |

1. Select **Review + create**.

1. Select **Create**.



## <a name="create-a-virtual-network"></a> Create a virtual network

1. In the search box at the top of the portal, enter **Virtual network**. Select **Virtual networks** in the search results.

1. Select **+ Create**.

1. On the **Basics** tab of **Create virtual network**, enter, or select the following information:

    | Setting | Value |
    | --- | --- |
    | **Project details** |  |
    | Subscription | Select your subscription. |
    | Resource group | Select **\<resource-group\>**. |
    | **Instance details** |  |
    | Name | Enter **\<virtual-network\>**. |
    | Region | Select **\<region\>**. |

1. Select **Next** to proceed to the **Security** tab.

1. Select **Next** to proceed to the **IP Addresses** tab.

1. In the address space box in **Subnets**, select the **default** subnet.

1. In **Edit subnet**, enter, or select the following information:

    | Setting | Value |
    | --- | --- |
    | **Subnet details** |  |
    | Subnet template | Leave the default **Default**. |
    | Name | Enter **\<subnet\>**. |
    | Starting address | Leave the default of **10.0.0.0**. |
    | Subnet size | Leave the default of **/24 (256 addresses)**. |

1. Select **Save**.

1. Select **Review + create** at the bottom of the screen, and when validation passes, select **Create**.



## Deploy Azure Bastion

Azure Bastion uses your browser to connect to virtual machines (VMs) in your virtual network over Secure Shell (SSH) or Remote Desktop Protocol (RDP) by using their private IP addresses. The virtual machines don't need public IP addresses, client software, or special configuration. For more information about Azure Bastion, see [What is Azure Bastion?](https://learn.microsoft.com/azure/bastion/bastion-overview).

>**Note:**
>[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/bastion-pricing.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/quickstart-create-virtual-network.md)

This procedure deploys the **Developer** tier, which uses shared infrastructure and doesn't require an **AzureBastionSubnet** or a public IP address. The Azure CLI and Azure PowerShell versions of this procedure deploy the **Basic** SKU, which requires both. For a comparison of features and deployment requirements, see [Choose the right Azure Bastion SKU](https://learn.microsoft.com/azure/bastion/bastion-sku-comparison).

1. In the search box at the top of the portal, enter **Bastion**. Select **Bastions** in the search results.

1. Select **+ Create**.

1. In the **Basics** tab of **Create a Bastion**, enter, or select the following information:

    | Setting | Value |
    | --- | --- |
    | **Project details** |  |
    | Subscription | Select your subscription. |
    | Resource group | Select **\<resource-group\>**. |
    | **Instance details** |  |
    | Name | Enter **\<bastion\>**. |
    | Region | Select **\<region\>**. |
    | Tier | Select **Developer**. |
    | **Configure virtual networks** |  |
    | Virtual network | Select **\<virtual-network\>**. |

1. Select **Review + create**.

1. Select **Create**.



## Create virtual machines

The following procedure creates two VMs named **\<virtual-machine-1\>** and **\<virtual-machine-2\>** in the virtual network:

1. In the portal, search for and select **Virtual machines**.

1. In **Virtual machines**, select **+ Create**, and then select **Azure virtual machine**.

1. On the **Basics** tab of **Create a virtual machine**, enter, or select the following information:

    | Setting | Value |
    | --- | --- |
    | **Project details** |  |
    | Subscription | Select your subscription. |
    | Resource group | Select **\<resource-group\>**. |
    | **Instance details** |  |
    | Virtual machine name | Enter **\<virtual-machine-1\>**. |
    | Region | Select **\<region\>**. |
    | Availability options | Select **No infrastructure redundancy required**. |
    | Security type | Leave the default of **Standard**. |
    | Image | Select **Ubuntu Server 22.04 LTS - x64 Gen2**. |
    | VM architecture | Leave the default of **x64**. |
    | Size | Select a size. |
    | **Administrator account** |  |
    | Authentication type | Select **SSH public key**. |
    | Username | Enter **azureuser**. |
    | SSH public key source | Select **Generate new key pair**. |
    | Key pair name | Enter **\<virtual-machine-1\>-key**. |
    | **Inbound port rules** |  |
    | Public inbound ports | Select **None**. |

1. Select the **Networking** tab. Enter or select the following information:

    | Setting | Value |
    | --- | --- |
    | **Network interface** |  |
    | Virtual network | Select **\<virtual-network\>**. |
    | Subnet | Select **\<subnet\> (10.0.0.0/24)**. |
    | Public IP | Select **None**. |
    | NIC network security group | Select **Advanced**. |
    | Configure network security group | Select **Create new**.</br> Enter **\<network-security-group\>** for the name.</br> Leave the rest at the defaults and select **OK**. |

1. Leave the rest of the settings at the defaults and select **Review + create**.

1. Review the settings and select **Create**.

1. Wait for the first virtual machine to deploy then repeat the previous steps to create a second virtual machine with the following settings:

    | Setting | Value |
    | --- | --- |
    | Virtual machine name | Enter **\<virtual-machine-2\>**. |
    | SSH public key source | Select **Generate new key pair**. |
    | Key pair name | Enter **\<virtual-machine-2\>-key**. |
    | Virtual network | Select **\<virtual-network\>**. |
    | Subnet | Select **\<subnet\> (10.0.0.0/24)**. |
    | Public IP | Select **None**. |
    | NIC network security group | Select **Advanced**. |
    | Configure network security group | Select **\<network-security-group\>**. |

> **Note:**
> Virtual machines in a virtual network with an Azure Bastion host don't need public IP addresses. Bastion provides the public IP, and the VMs use private IPs to communicate within the network. You can remove the public IPs from any VMs in Bastion-hosted virtual networks. For more information, see [Dissociate a public IP address from an Azure VM](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/networking/includes/azure-virtual-network/~/articles/virtual-network/ip-services/remove-public-ip-address-vm.md).

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ephemeral-ip-note.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/quickstart-create-virtual-network.md)


### [PowerShell](#tab/powershell)


## Create a resource group

Use [New-AzResourceGroup](https://learn.microsoft.com/powershell/module/az.Resources/New-azResourceGroup) to create a resource group for the virtual network. Run the following code to create a resource group named **\<resource-group\>** in the **\<region\>** Azure region:

```azurepowershell-interactive
# Variable declarations
$resourceGroupName = 'test-rg'       # <resource-group>
$location = 'eastus2'                # <region>

$rg = @{
    Name = $resourceGroupName
    Location = $location
}
New-AzResourceGroup @rg
```



## Create a virtual network

1. Use [New-AzVirtualNetwork](https://learn.microsoft.com/powershell/module/az.network/new-azvirtualnetwork) to create a virtual network named **\<virtual-network\>** with IP address prefix **10.0.0.0/16** in the **\<resource-group\>** resource group and **\<region\>** location:

    ```azurepowershell-interactive
    # Variable declarations
    $virtualNetworkName = 'vnet-1'       # <virtual-network>
    $resourceGroupName = 'test-rg'       # <resource-group>
    $location = 'eastus2'                # <region>

    $vnet = @{
        Name = $virtualNetworkName
        ResourceGroupName = $resourceGroupName
        Location = $location
        AddressPrefix = '10.0.0.0/16'
    }
    $virtualNetwork = New-AzVirtualNetwork @vnet
   ```

1. Azure deploys resources to a subnet within a virtual network. Use [Add-AzVirtualNetworkSubnetConfig](https://learn.microsoft.com/powershell/module/az.network/add-azvirtualnetworksubnetconfig) to create a subnet configuration named **\<subnet\>** with address prefix **10.0.0.0/24**:

    ```azurepowershell-interactive
    # Variable declarations
    $subnetName = 'subnet-1'             # <subnet>

    $subnet = @{
        Name = $subnetName
        VirtualNetwork = $virtualNetwork
        AddressPrefix = '10.0.0.0/24'
    }
    $subnetConfig = Add-AzVirtualNetworkSubnetConfig @subnet
    ```

1. Associate the subnet configuration to the virtual network by using [Set-AzVirtualNetwork](https://learn.microsoft.com/powershell/module/az.network/Set-azVirtualNetwork):

    ```azurepowershell-interactive
    $virtualNetwork | Set-AzVirtualNetwork
    ```



## Deploy Azure Bastion

Azure Bastion uses your browser to connect to virtual machines (VMs) in your virtual network over Secure Shell (SSH) or Remote Desktop Protocol (RDP) by using their private IP addresses. The virtual machines don't need public IP addresses, client software, or special configuration. For more information about Azure Bastion, see [What is Azure Bastion?](https://learn.microsoft.com/azure/bastion/bastion-overview).

 [Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/bastion-pricing.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/quickstart-create-virtual-network.md)

This procedure deploys the **Basic** SKU, which requires a dedicated **AzureBastionSubnet** and a Standard SKU public IP address. The Azure portal version of this procedure deploys the **Developer** tier, which requires neither. For a comparison of features and deployment requirements, see [Choose the right Azure Bastion SKU](https://learn.microsoft.com/azure/bastion/bastion-sku-comparison).

1. Configure a Bastion subnet for your virtual network. This subnet is reserved exclusively for Bastion resources and must be named **AzureBastionSubnet**.

    ```azurepowershell-interactive
    $subnet = @{
        Name = 'AzureBastionSubnet'
        VirtualNetwork = $virtualNetwork
        AddressPrefix = '10.0.1.0/26'
    }
    $subnetConfig = Add-AzVirtualNetworkSubnetConfig @subnet
    ```

1. Set the configuration:

    ```azurepowershell-interactive
    $virtualNetwork | Set-AzVirtualNetwork
    ```

1. Create a public IP address for Bastion. The Bastion host uses the public IP to access SSH and RDP over port 443.

    ```azurepowershell-interactive
    # Variable declarations
    $resourceGroupName = 'test-rg'       # <resource-group>
    $location = 'eastus2'                # <region>

    $ip = @{
            ResourceGroupName = $resourceGroupName
            Name = 'public-ip'
            Location = $location
            AllocationMethod = 'Static'
            Sku = 'Standard'
            Zone = 1,2,3
    }
    New-AzPublicIpAddress @ip
    ```

1. Use the [New-AzBastion](https://learn.microsoft.com/powershell/module/az.network/new-azbastion) command to create a new Basic SKU Bastion host in **AzureBastionSubnet**:

    ```azurepowershell-interactive
    # Variable declarations
    $bastionName = 'bastion'             # <bastion>
    $resourceGroupName = 'test-rg'       # <resource-group>
    $virtualNetworkName = 'vnet-1'       # <virtual-network>

    $bastion = @{
        Name = $bastionName
        ResourceGroupName = $resourceGroupName
        PublicIpAddressRgName = $resourceGroupName
        PublicIpAddressName = 'public-ip'
        VirtualNetworkRgName = $resourceGroupName
        VirtualNetworkName = $virtualNetworkName
        Sku = 'Basic'
    }
    New-AzBastion @bastion
    ```

It takes about 10 minutes to deploy the Bastion resources. You can create virtual machines in the next section while Bastion deploys to your virtual network.



## Create virtual machines

### Create the first virtual machine

Create a virtual machine with [New-AzVM](https://learn.microsoft.com/powershell/module/az.compute/new-azvm). The following example creates a virtual machine named **\<virtual-machine-1\>** in the **\<virtual-network\>** virtual network.

```azurepowershell-interactive
# Variable declarations
$resourceGroupName = 'test-rg'       # <resource-group>
$location = 'eastus2'                # <region>
$vm1Name = 'vm-1'                    # <virtual-machine-1>
$virtualNetworkName = 'vnet-1'       # <virtual-network>
$subnetName = 'subnet-1'             # <subnet>

# Create a credential object
$cred = Get-Credential

# Define the virtual machine parameters
$vmParams = @{
    ResourceGroupName = $resourceGroupName
    Location = $location
    Name = $vm1Name
    Image = "Ubuntu2204"
    Size = "Standard_DS1_v2"
    Credential = $cred
    VirtualNetworkName = $virtualNetworkName
    SubnetName = $subnetName
    PublicIpAddressName = ""  # No public IP address
    SshKeyName = "$vm1Name-ssh-key"
    GenerateSshKey = $true
}

# Create the virtual machine
New-AzVM @vmParams
```

### Create the second virtual machine

```azurepowershell-interactive
# Variable declarations
$resourceGroupName = 'test-rg'       # <resource-group>
$location = 'eastus2'                # <region>
$vm2Name = 'vm-2'                    # <virtual-machine-2>
$virtualNetworkName = 'vnet-1'       # <virtual-network>
$subnetName = 'subnet-1'             # <subnet>

# Create a credential object
$cred = Get-Credential

# Define the virtual machine parameters
$vmParams = @{
    ResourceGroupName = $resourceGroupName
    Location = $location
    Name = $vm2Name
    Image = "Ubuntu2204"
    Size = "Standard_DS1_v2"
    Credential = $cred
    VirtualNetworkName = $virtualNetworkName
    SubnetName = $subnetName
    PublicIpAddressName = ""  # No public IP address
    SshKeyName = "$vm2Name-ssh-key"
    GenerateSshKey = $true
}

# Create the virtual machine
New-AzVM @vmParams
```

Azure takes a few minutes to create the virtual machines. When Azure finishes creating the virtual machines, it returns the output to PowerShell.

> **Note:**
> Virtual machines in a virtual network with a Bastion host don't need public IP addresses. Bastion provides the public IP, and the virtual machines use private IPs to communicate within the network. You can remove the public IPs from any virtual machines in Bastion-hosted virtual networks. For more information, see [Dissociate a public IP address from an Azure Virtual Machine](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/networking/includes/azure-virtual-network/~/articles/virtual-network/ip-services/remove-public-ip-address-vm.md).

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ephemeral-ip-note.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/quickstart-create-virtual-network.md)


### [CLI](#tab/cli)


## Create a resource group

Use [az group create](https://learn.microsoft.com/cli/azure/group#az-group-create) to create a resource group to host the virtual network. Use the following code to create a resource group named **\<resource-group\>** in the **\<region\>** Azure region:

```azurecli-interactive
# Variable declarations
resourceGroupName="test-rg"       # <resource-group>
location="eastus2"                # <region>

az group create \
    --name $resourceGroupName \
    --location $location
```



## Create a virtual network and subnet

Use [az network vnet create](https://learn.microsoft.com/cli/azure/network/vnet#az-network-vnet-create) to create a virtual network named **\<virtual-network\>** with a subnet named **\<subnet\>** in the **\<resource-group\>** resource group:

```azurecli-interactive
# Variable declarations
virtualNetworkName="vnet-1"       # <virtual-network>
resourceGroupName="test-rg"       # <resource-group>
subnetName="subnet-1"             # <subnet>

az network vnet create \
    --name $virtualNetworkName \
    --resource-group $resourceGroupName \
    --address-prefix 10.0.0.0/16 \
    --subnet-name $subnetName \
    --subnet-prefixes 10.0.0.0/24
```



## Deploy Azure Bastion

Azure Bastion uses your browser to connect to virtual machines (VMs) in your virtual network over Secure Shell (SSH) or Remote Desktop Protocol (RDP) by using their private IP addresses. The virtual machines don't need public IP addresses, client software, or special configuration. For more information about Azure Bastion, see [What is Azure Bastion?](https://learn.microsoft.com/azure/bastion/bastion-overview).

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/bastion-pricing.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/quickstart-create-virtual-network.md)

This procedure deploys the **Basic** SKU, which requires a dedicated **AzureBastionSubnet** and a Standard SKU public IP address. The Azure portal version of this procedure deploys the **Developer** tier, which requires neither. For a comparison of features and deployment requirements, see [Choose the right Azure Bastion SKU](https://learn.microsoft.com/azure/bastion/bastion-sku-comparison).

1. Use [az network vnet subnet create](https://learn.microsoft.com/cli/azure/network/vnet/subnet#az-network-vnet-subnet-create) to create a Bastion subnet for your virtual network. This subnet is reserved exclusively for Bastion resources and must be named **AzureBastionSubnet**.

    ```azurecli-interactive
    # Variable declarations
    resourceGroupName="test-rg"       # <resource-group>
    virtualNetworkName="vnet-1"       # <virtual-network>

    az network vnet subnet create \
        --name AzureBastionSubnet \
        --resource-group $resourceGroupName \
        --vnet-name $virtualNetworkName \
        --address-prefix 10.0.1.0/26
    ```

1. Create a public IP address for Bastion. This IP address is used to connect to the Bastion host from the internet. Use [az network public-ip create](https://learn.microsoft.com/cli/azure/network/public-ip#az-network-public-ip-create) to create a public IP address named **public-ip** in the **\<resource-group\>** resource group:

    ```azurecli-interactive
    # Variable declarations
    resourceGroupName="test-rg"       # <resource-group>
    location="eastus2"                # <region>

    az network public-ip create \
        --resource-group $resourceGroupName \
        --name public-ip \
        --sku Standard \
        --location $location \
        --zone 1 2 3
    ```

1. Use [az network bastion create](https://learn.microsoft.com/cli/azure/network/bastion#az-network-bastion-create) to create a Bastion host in **AzureBastionSubnet** for your virtual network:

    ```azurecli-interactive
    # Variable declarations
    bastionName="bastion"             # <bastion>
    resourceGroupName="test-rg"       # <resource-group>
    virtualNetworkName="vnet-1"       # <virtual-network>
    location="eastus2"                # <region>

    az network bastion create \
        --name $bastionName \
        --public-ip-address public-ip \
        --resource-group $resourceGroupName \
        --vnet-name $virtualNetworkName \
        --location $location \
        --sku Basic
    ```

It takes about 10 minutes to deploy the Bastion resources. You can create virtual machines in the next section while Bastion deploys to your virtual network.



## Create virtual machines

### Create the first virtual machine

Create a virtual machine with [az vm create](https://learn.microsoft.com/cli/azure/vm#az-vm-create). The following example creates a virtual machine named **\<virtual-machine-1\>** in the **\<virtual-network\>** virtual network. If SSH keys don't already exist in a default key location, the command creates them. The `--no-wait` option creates the virtual machine in the background, so you can continue to the next step.

```azurecli-interactive
# Variable declarations
resourceGroupName="test-rg"       # <resource-group>
vm1Name="vm-1"                    # <virtual-machine-1>
virtualNetworkName="vnet-1"       # <virtual-network>
subnetName="subnet-1"             # <subnet>

az vm create \
    --resource-group $resourceGroupName \
    --name $vm1Name \
    --image Ubuntu2204 \
    --vnet-name $virtualNetworkName \
    --subnet $subnetName \
    --public-ip-address "" \
    --admin-username azureuser \
    --generate-ssh-keys \
    --no-wait
```

### Create the second virtual machine

Create a virtual machine named **\<virtual-machine-2\>** in the **\<virtual-network\>** virtual network.

```azurecli-interactive
# Variable declarations
resourceGroupName="test-rg"       # <resource-group>
vm2Name="vm-2"                    # <virtual-machine-2>
virtualNetworkName="vnet-1"       # <virtual-network>
subnetName="subnet-1"             # <subnet>

az vm create \
    --resource-group $resourceGroupName \
    --name $vm2Name \
    --image Ubuntu2204 \
    --vnet-name $virtualNetworkName \
    --subnet $subnetName \
    --public-ip-address "" \
    --admin-username azureuser \
    --generate-ssh-keys
```

The virtual machine takes a few minutes to create.

> **Note:**
> Virtual machines in a virtual network with a Bastion host don't need public IP addresses. Bastion provides the public IP, and the virtual machines use private IPs to communicate within the network. You can remove the public IPs from any virtual machines in Bastion-hosted virtual networks. For more information, see [Dissociate a public IP address from an Azure VM](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/networking/includes/azure-virtual-network/~/articles/virtual-network/ip-services/remove-public-ip-address-vm.md).

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ephemeral-ip-note.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/quickstart-create-virtual-network.md)


### [ARM template](#tab/arm)

## Review the template

The template that you use in this quickstart is from [Azure Quickstart Templates](https://github.com/Azure/azure-quickstart-templates/blob/master/quickstarts/microsoft.network/vnet-two-subnets/azuredeploy.json).

[Code reference unavailable in this source snapshot: ~/quickstart-templates/quickstarts/microsoft.network/vnet-two-subnets/azuredeploy.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/quickstart-create-virtual-network.md)

The template defines the following Azure resources:

- [Microsoft.Network/virtualNetworks](https://learn.microsoft.com/azure/templates/microsoft.network/virtualnetworks): Creates a virtual network.
- [Microsoft.Network/virtualNetworks/subnets](https://learn.microsoft.com/azure/templates/microsoft.network/virtualnetworks/subnets): Creates a subnet.

## Deploy the template

Deploy the Resource Manager template to Azure:

1. Select **Deploy to Azure** to sign in to Azure and open the template. The template creates a virtual network with two subnets.

   Button to deploy the Resource Manager template to Azure.

1. In the portal, on the **Create a Virtual Network with two Subnets** page, enter, or select the following values:
   - **Resource group**: Select **Create new**, enter **CreateVNetQS-rg** for the resource group name, and then select **OK**.
   - **Virtual Network Name**: Enter a name for the new virtual network.
1. Select **Review + create**, and then select **Create**.
1. When deployment finishes, select the **Go to resource** button to review the resources that you deployed.

## Review deployed resources

Explore the resources that you created with the virtual network by browsing through the settings panes for **VNet1**:

- The **Overview** tab shows the defined address space of **10.0.0.0/16**.

- The **Subnets** tab shows the deployed subnets of **Subnet1** and **Subnet2** with the appropriate values from the template.

To learn about the JSON syntax and properties for a virtual network in a template, see [Microsoft.Network/virtualNetworks](https://learn.microsoft.com/azure/templates/microsoft.network/virtualnetworks).

### [Bicep](#tab/bicep)

## Create the virtual network and virtual machines

This quickstart uses the [Two VMs in virtual network](https://github.com/Azure/azure-quickstart-templates/blob/master/quickstarts/microsoft.compute/2-vms-internal-load-balancer/main.bicep) Bicep template from [Azure Resource Manager Quickstart Templates](https://github.com/Azure/azure-quickstart-templates) to create the virtual network, resource subnet, and virtual machines. The Bicep template defines the following Azure resources:

- [Microsoft.Network virtualNetworks](https://learn.microsoft.com/azure/templates/microsoft.network/virtualnetworks): Creates an Azure virtual network.
- [Microsoft.Network virtualNetworks/subnets](https://learn.microsoft.com/azure/templates/microsoft.network/virtualnetworks/subnets): Creates a subnet for the virtual machines.
- [Microsoft.Compute virtualMachines](https://learn.microsoft.com/azure/templates/microsoft.compute/virtualmachines): Creates the virtual machines.
- [Microsoft.Compute availabilitySets](https://learn.microsoft.com/azure/templates/microsoft.compute/availabilitysets): Creates an availability set.
- [Microsoft.Network networkInterfaces](https://learn.microsoft.com/azure/templates/microsoft.network/networkinterfaces): Creates network interfaces.
- [Microsoft.Network loadBalancers](https://learn.microsoft.com/azure/templates/microsoft.network/loadbalancers): Creates an internal load balancer.
- [Microsoft.Storage storageAccounts](https://learn.microsoft.com/azure/templates/microsoft.storage/storageaccounts): Creates a storage account.

Review the Bicep file:

[Code reference unavailable in this source snapshot: ~/quickstart-templates/quickstarts/microsoft.compute/2-vms-internal-load-balancer/main.bicep](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/quickstart-create-virtual-network.md)

### Deploy the Bicep template

1. Save the Bicep file to your local computer as *main.bicep*.
1. Deploy the Bicep file by using either the Azure CLI or Azure PowerShell:

   ### CLI

    ```azurecli
    az group create \
        --name TestRG \
        --location eastus
   
    az deployment group create \
        --resource-group TestRG \
        --template-file main.bicep
    ```

   ### PowerShell

   ```azurepowershell
    $rgParams = @{
        Name     = 'TestRG'
        Location = 'eastus'
    }
    New-AzResourceGroup @rgParams

    $deploymentParams = @{
        ResourceGroupName = 'TestRG'
        TemplateFile      = 'main.bicep'
    }
    New-AzResourceGroupDeployment @deploymentParams
    ```

When the deployment finishes, a message indicates the deployment succeeded.

## Deploy Azure Bastion

Bastion uses your browser to connect to virtual machines in your virtual network over Secure Shell (SSH) or Remote Desktop Protocol (RDP) by using their private IP addresses. The virtual machines don't need public IP addresses, client software, or special configuration. For more information about Azure Bastion, see [What is Azure Bastion?](../bastion/bastion-overview.md)

> **Note:**
> [Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/bastion-pricing.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/quickstart-create-virtual-network.md)

Use the [Azure Bastion as a Service](https://github.com/Azure/azure-quickstart-templates/blob/master/quickstarts/microsoft.network/azure-bastion/main.bicep) Bicep template from [Azure Resource Manager Quickstart Templates](https://github.com/Azure/azure-quickstart-templates) to deploy and configure Bastion in your virtual network. This Bicep template defines the following Azure resources:

- [Microsoft.Network virtualNetworks/subnets](https://learn.microsoft.com/azure/templates/microsoft.network/virtualnetworks/subnets): Creates an **AzureBastionSubnet** subnet.
- [Microsoft.Network bastionHosts](https://learn.microsoft.com/azure/templates/microsoft.network/bastionhosts): Creates the Bastion host.
- [Microsoft.Network publicIPAddresses](https://learn.microsoft.com/azure/templates/microsoft.network/publicipaddresses): Creates a public IP address for the Bastion host.
- [Microsoft.Network networkSecurityGroups](https://learn.microsoft.com/azure/templates/microsoft.network/networksecuritygroups): Controls the settings for network security groups.

Review the Bicep file:

[Code reference unavailable in this source snapshot: ~/quickstart-templates/quickstarts/microsoft.network/azure-bastion/main.bicep](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/quickstart-create-virtual-network.md)

### Deploy the Bicep template

1. Save the Bicep file to your local computer as *bastion.bicep*.
1. Use a text or code editor to make the following changes in the file:

   - Line 2: Change `param vnetName string` from `'vnet01'` to `'VNet'`.
   - Line 5: Change `param vnetIpPrefix string` from `'10.1.0.0/16'` to `'10.0.0.0/16'`.
   - Line 12: Change `param vnetNewOrExisting string` from `'new'` to `'existing'`.
   - Line 15: Change `param bastionSubnetIpPrefix string` from `'10.1.1.0/26'` to `'10.0.1.0/26'`.
   - Line 18: Change `param bastionHostName string` to `param bastionHostName = 'VNet-bastion'`.

   The first 18 lines of your Bicep file should now look like this example:

   ```bicep
   @description('Name of new or existing vnet to which Azure Bastion should be deployed')
   param vnetName string = 'VNet'
   
   @description('IP prefix for available addresses in vnet address space')
   param vnetIpPrefix string = '10.0.0.0/16'
   
   @description('Specify whether to provision new vnet or deploy to existing vnet')
   @allowed([
     'new'
     'existing'
   ])
   param vnetNewOrExisting string = 'existing'
   
   @description('Bastion subnet IP prefix MUST be within vnet IP prefix address space')
   param bastionSubnetIpPrefix string = '10.0.1.0/26'
   
   @description('Name of Azure Bastion resource')
   param bastionHostName = 'VNet-bastion'
   
   ```

1. Save the *bastion.bicep* file.

1. Deploy the Bicep file by using either the Azure CLI or Azure PowerShell:

   #### CLI

   ```azurecli
   az deployment group create \
        --resource-group TestRG \
        --template-file bastion.bicep
   ```

   ### PowerShell

    ```azurepowershell
    $deploymentParams = @{
        ResourceGroupName = 'TestRG'
        TemplateFile      = 'bastion.bicep'
    }
    New-AzResourceGroupDeployment @deploymentParams
    ```

When the deployment finishes, a message indicates the deployment succeeded.

> **Note:**
> Virtual machines in a virtual network with a Bastion host don't need public IP addresses. Bastion provides the public IP, and the virtual machines use private IPs to communicate within the network. You can remove the public IPs from any virtual machines in Bastion-hosted virtual networks. For more information, see [Dissociate a public IP address from an Azure VM](ip-services/remove-public-ip-address-vm.md).

## Review deployed resources

Use the Azure CLI, Azure PowerShell, or the Azure portal to review the deployed resources:

### CLI

```azurecli
az resource list --resource-group TestRG
```

### PowerShell

```azurepowershell
Get-AzResource -ResourceGroupName TestRG
```

### Portal

1. In the [Azure portal](https://portal.azure.com), search for and select **resource groups**. On the **Resource groups** page, select **TestRG** from the list of resource groups.

1. On the **Overview** page for **TestRG**, review all the resources that you created, including the virtual network, the two virtual machines, and the Bastion host.

1. Select the **VNet** virtual network. On the **Overview** page for **VNet**, note the defined address space of **10.0.0.0/16**.

1. On the left menu, select **Subnets**. On the **Subnets** page, note the deployed subnets of **backendSubnet** and **AzureBastionSubnet** with the assigned values from the Bicep files.

### [Terraform](#tab/terraform)

The script uses the Azure Resource Manager (`azurerm`) provider to interact with Azure resources. It uses the Random (`random`) provider to generate random pet names for the resources.

The script creates the following resources:

- A resource group: A container that holds related resources for an Azure solution.

- A virtual network: A fundamental building block for your private network in Azure.

- Two subnets: Segments of a virtual network's IP address range where you can place groups of isolated resources.

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/abstract.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/quickstart-create-virtual-network.md)

## Implement the Terraform code

> **Note:**
> The sample code for this article is in the [Azure Terraform GitHub repo](https://github.com/Azure/terraform/tree/master/quickstart/101-virtual-network-create-two-subnets). You can view the log file that contains the [test results from current and previous versions of Terraform](https://github.com/Azure/terraform/tree/master/quickstart/101-virtual-network-create-two-subnets/TestRecord.md).
>
> For more articles and sample code that show how to use Terraform to manage Azure resources, see the [documentation page for Terraform on Azure](https://learn.microsoft.com/azure/terraform).

1. Create a directory in which to test and run the sample Terraform code, and make it the current directory.

1. Create a file named *main.tf* and insert the following code:

    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-virtual-network-create-two-subnets/main.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/quickstart-create-virtual-network.md)

1. Create a file named *outputs.tf* and insert the following code:

    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-virtual-network-create-two-subnets/outputs.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/quickstart-create-virtual-network.md)

1. Create a file named *providers.tf* and insert the following code:

    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-virtual-network-create-two-subnets/providers.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/quickstart-create-virtual-network.md)

1. Create a file named *variables.tf* and insert the following code:

    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-virtual-network-create-two-subnets/variables.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/quickstart-create-virtual-network.md)

## Initialize Terraform

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-init.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/quickstart-create-virtual-network.md)

## Create a Terraform execution plan

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-plan.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/quickstart-create-virtual-network.md)

## Apply a Terraform execution plan

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-apply-plan.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/quickstart-create-virtual-network.md)

## Verify the results

1. Get the Azure resource group name:

    ```console
    resource_group_name=$(terraform output -raw resource_group_name)
    ```

1. Get the virtual network name:

    ```console
    virtual_network_name=$(terraform output -raw virtual_network_name)
    ```

1. Use [`az network vnet show`](https://learn.microsoft.com/cli/azure/network/vnet#az-network-vnet-show) to show the details of your newly created virtual network:

    ```azurecli
    az network vnet show \
        --resource-group $resource_group_name \
        --name $virtual_network_name
    ```

## Troubleshoot Terraform on Azure

For information about troubleshooting Terraform, see [Troubleshoot common problems when using Terraform on Azure](https://learn.microsoft.com/azure/developer/terraform/troubleshoot).

---

## Connect to a virtual machine

1. In the search box at the top of the portal, enter **Virtual machine**. Select **Virtual machines** in the search results.

1. In **Virtual machines**, select **vm-1**.

1. Select **Connect** then **Connect via Bastion** in the **Overview** section.

1. In the **Bastion** connection page, enter or select the following information:

    | Setting | Value |
    | --- | --- |
    | **Authentication Type** | Select **SSH Private Key from Local File**. |
    | **Username** | Enter **azureuser**. |
    | **Local File** | Select the private key file you downloaded or created. |

1. Select **Connect**.

## Start communication between virtual machines

1. At the bash prompt for **vm-1**, enter `ping -c 4 vm-2`.

   You get a reply similar to the following message:

    ```output
    azureuser@vm-1:~$ ping -c 4 vm-2
    PING vm-2.3bnkevn3313ujpr5l1kqop4n4d.cx.internal.cloudapp.net (10.0.0.5) 56(84) bytes of data.
    64 bytes from vm-2.internal.cloudapp.net (10.0.0.5): icmp_seq=1 ttl=64 time=1.83 ms
    64 bytes from vm-2.internal.cloudapp.net (10.0.0.5): icmp_seq=2 ttl=64 time=0.987 ms
    64 bytes from vm-2.internal.cloudapp.net (10.0.0.5): icmp_seq=3 ttl=64 time=0.864 ms
    64 bytes from vm-2.internal.cloudapp.net (10.0.0.5): icmp_seq=4 ttl=64 time=0.890 ms
    ```

1. Close the Bastion session.

1. In the search box at the top of the portal, enter **Virtual machine**. Select **Virtual machines** in the search results.

1. In **Virtual machines**, select **vm-2**.

1. Select **Connect** then **Connect via Bastion** in the **Overview** section.

1. In the **Bastion** connection page, enter or select the following information:

    | Setting | Value |
    | --- | --- |
    | **Authentication Type** | Select **SSH Private Key from Local File**. |
    | **Username** | Enter **azureuser**. |
    | **Local File** | Select the private key file you downloaded or created. |

1. Select **Connect**.

1. At the bash prompt for **vm-2**, enter `ping -c 4 vm-1`.

   You get a reply similar to the following message:

    ```output
    azureuser@vm-2:~$ ping -c 4 vm-1
    PING vm-1.3bnkevn3313ujpr5l1kqop4n4d.cx.internal.cloudapp.net (10.0.0.4) 56(84) bytes of data.
    64 bytes from vm-1.internal.cloudapp.net (10.0.0.4): icmp_seq=1 ttl=64 time=0.695 ms
    64 bytes from vm-1.internal.cloudapp.net (10.0.0.4): icmp_seq=2 ttl=64 time=0.896 ms
    64 bytes from vm-1.internal.cloudapp.net (10.0.0.4): icmp_seq=3 ttl=64 time=3.43 ms
    64 bytes from vm-1.internal.cloudapp.net (10.0.0.4): icmp_seq=4 ttl=64 time=0.780 ms
    ```

1. Close the Bastion session.

## Clean up resources

### [Portal](#tab/portal)


When you finish using the resources that you created, you can delete the resource group and all its resources.

1. In the Azure portal, search for and select **Resource groups**.

1. On the **Resource groups** page, select the **\<resource-group\>** resource group.

1. On the **\<resource-group\>** page, select **Delete resource group**.

1. Enter **\<resource-group\>** in **Enter resource group name to confirm deletion**, and then select **Delete**.


### [PowerShell](#tab/powershell)


When you finish using the virtual network and the virtual machines, use [Remove-AzResourceGroup](https://learn.microsoft.com/powershell/module/az.resources/remove-azresourcegroup) to remove the resource group and all its resources:

```azurepowershell-interactive
# Variable declarations
$resourceGroupName = 'test-rg'       # <resource-group>

$rgParams = @{
    Name = $resourceGroupName
    Force = $true
}
Remove-AzResourceGroup @rgParams
```


### [CLI](#tab/cli)


When you finish using the virtual network and the virtual machines, use [az group delete](https://learn.microsoft.com/cli/azure/group#az-group-delete) to remove the resource group and all its resources.

```azurecli-interactive
# Variable declarations
resourceGroupName="test-rg"       # <resource-group>

az group delete \
    --name $resourceGroupName \
    --yes
```


### [ARM template](#tab/arm)

When you no longer need the resources that you created with the virtual network, delete the resource group. This action removes the virtual network and all the related resources.

To delete the resource group, call the `Remove-AzResourceGroup` cmdlet:

```azurepowershell-interactive
Remove-AzResourceGroup -Name <your resource group name>
```

### [Bicep](#tab/bicep)

1. In the Azure portal, on the **Resource groups** page, select the **TestRG** resource group.

1. At the top of the **TestRG** page, select **Delete resource group**.

1. On the **Delete a resource group** page, under **Enter resource group name to confirm deletion**, enter **TestRG**, and then select **Delete**.

1. Select **Delete** again.

### [Terraform](#tab/terraform)

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-plan-destroy.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/quickstart-create-virtual-network.md)

---
## Related content

- [Filter network traffic](tutorial-filter-network-traffic.md)

- [Learn more about using Terraform on Azure](https://learn.microsoft.com/azure/terraform)
