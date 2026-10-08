---
title: 'Quickstart: Create a private endpoint - Azure PowerShell'
description: In this quickstart, you learn how to create a private endpoint using Azure PowerShell.
services: private-link
author: asudbring
ms.service: azure-private-link
ms.topic: quickstart
ms.date: 03/25/2025
ms.author: allensu
ms.custom: devx-track-azurepowershell, mode-api, template-quickstart
#Customer intent: As someone who has a basic network background but is new to Azure, I want to create a private endpoint by using Azure PowerShell.
# Customer intent: As a network administrator new to Azure, I want to create a private endpoint using Azure PowerShell, so that I can ensure secure connections to Azure services within my virtual network.
---

# Quickstart: Create a private endpoint by using Azure PowerShell

Get started with Azure Private Link by creating and using a private endpoint to connect securely to an Azure App Services web app.

In this quickstart, create a private endpoint for an Azure App Services web app and then create and deploy a virtual machine (VM) to test the private connection.  

You can create private endpoints for various Azure services, such as Azure SQL and Azure Storage.

Diagram of resources created in private endpoint quickstart.

## Prerequisites

- An Azure account with an active subscription. If you don't already have an Azure account, [create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

- An Azure web app with a **PremiumV2-tier** or higher app service plan, deployed in your Azure subscription.  

    - For more information and an example, see [Quickstart: Create an ASP.NET Core web app in Azure](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/app-service/quickstart-dotnetcore.md). 
    
    - The example webapp in this article is named **webapp-1**. Replace the example with your webapp name.

- Azure Cloud Shell or Azure PowerShell.

  The steps in this quickstart run the Azure PowerShell cmdlets interactively in [Azure Cloud Shell](https://learn.microsoft.com/azure/cloud-shell/overview). To run the commands in the Cloud Shell, select **Open Cloudshell** at the upper-right corner of a code block. Select **Copy** to copy the code and then paste it into Cloud Shell to run it. You can also run the Cloud Shell from within the Azure portal.

  You can also [install Azure PowerShell locally](https://learn.microsoft.com/powershell/azure/install-azure-powershell) to run the cmdlets. The steps in this article require Azure PowerShell module version 5.4.1 or later. Run `Get-Module -ListAvailable Az` to find your installed version. If you need to upgrade, see [Update the Azure PowerShell module](https://learn.microsoft.com/powershell/azure/install-Az-ps#update-the-azure-powershell-module).

  If you run PowerShell locally, run `Connect-AzAccount` to connect to Azure.

## Create a resource group

An Azure resource group is a logical container where Azure resources are deployed and managed.

Create a resource group with [New-AzResourceGroup](https://learn.microsoft.com/powershell/module/az.resources/new-azresourcegroup):

```azurepowershell-interactive
$rg = @{
    Name = 'test-rg'
    Location = 'eastus2'
}
New-AzResourceGroup @rg
```

## Create a virtual network

1. Use [New-AzVirtualNetwork](https://learn.microsoft.com/powershell/module/az.network/new-azvirtualnetwork) to create a virtual network named **vnet-1** with IP address prefix **10.0.0.0/16** in the **test-rg** resource group and **eastus2** location.

    ```azurepowershell-interactive
    $vnet = @{
        Name = 'vnet-1'
        ResourceGroupName = 'test-rg'
        Location = 'eastus2'
        AddressPrefix = '10.0.0.0/16'
    }
    $virtualNetwork = New-AzVirtualNetwork @vnet
   ```

1. Azure deploys resources to a subnet within a virtual network. Use [Add-AzVirtualNetworkSubnetConfig](https://learn.microsoft.com/powershell/module/az.network/add-azvirtualnetworksubnetconfig) to create a subnet configuration named **subnet-1** with address prefix **10.0.0.0/24**.

    ```azurepowershell-interactive
    $subnet = @{
        Name = 'subnet-1'
        VirtualNetwork = $virtualNetwork
        AddressPrefix = '10.0.0.0/24'
    }
    $subnetConfig = Add-AzVirtualNetworkSubnetConfig @subnet
    ```

1. Then associate the subnet configuration to the virtual network with [Set-AzVirtualNetwork](https://learn.microsoft.com/powershell/module/az.network/Set-azVirtualNetwork).

    ```azurepowershell-interactive
    $virtualNetwork | Set-AzVirtualNetwork
    ```

## Deploy Azure Bastion

Azure Bastion uses your browser to connect to VMs in your virtual network over secure shell (SSH) or remote desktop protocol (RDP) by using their private IP addresses. The VMs don't need public IP addresses, client software, or special configuration. For more information about Azure Bastion, see [Azure Bastion](https://learn.microsoft.com/azure/bastion/bastion-overview).

>**Note:**
>[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/bastion-pricing.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/private-link/create-private-endpoint-powershell.md)

1. Configure an Azure Bastion subnet for your virtual network. This subnet is reserved exclusively for Azure Bastion resources and must be named **AzureBastionSubnet**.

    ```azurepowershell-interactive
    $subnet = @{
        Name = 'AzureBastionSubnet'
        VirtualNetwork = $virtualNetwork
        AddressPrefix = '10.0.1.0/26'
    }
    $subnetConfig = Add-AzVirtualNetworkSubnetConfig @subnet
    ```

1. Set the configuration.

    ```azurepowershell-interactive
    $virtualNetwork | Set-AzVirtualNetwork
    ```

1. Create a public IP address for Azure Bastion. The bastion host uses the public IP to access secure shell (SSH) and remote desktop protocol (RDP) over port 443.

    ```azurepowershell-interactive
    $ip = @{
            ResourceGroupName = 'test-rg'
            Name = 'public-ip'
            Location = 'eastus2'
            AllocationMethod = 'Static'
            Sku = 'Standard'
            Zone = 1,2,3
    }
    New-AzPublicIpAddress @ip
    ```

1. Use the [New-AzBastion](https://learn.microsoft.com/powershell/module/az.network/new-azbastion) command to create a new Standard SKU Azure Bastion host in the AzureBastionSubnet.

    ```azurepowershell-interactive
    $bastion = @{
        Name = 'bastion'
        ResourceGroupName = 'test-rg'
        PublicIpAddressRgName = 'test-rg'
        PublicIpAddressName = 'public-ip'
        VirtualNetworkRgName = 'test-rg'
        VirtualNetworkName = 'vnet-1'
        Sku = 'Basic'
    }
    New-AzBastion @bastion
    ```

It takes several minutes for the Bastion resources to deploy.

## Create a private endpoint

An Azure service that supports private endpoints is required to set up the private endpoint and connection to the virtual network. For the examples in this article, we're using an Azure App Services WebApp from the prerequisites. For more information on the Azure services that support a private endpoint, see [Azure Private Link availability](availability.md).

A private endpoint can have a static or dynamically assigned IP address.

> **Important:**
> You must have a previously deployed Azure App Services WebApp to proceed with the steps in this article. For more information, see [Prerequisites](#prerequisites).

In this section, you'll:

- Create a private link service connection with [New-AzPrivateLinkServiceConnection](https://learn.microsoft.com/powershell/module/az.network/new-azprivatelinkserviceconnection).

- Create the private endpoint with [New-AzPrivateEndpoint](https://learn.microsoft.com/powershell/module/az.network/new-azprivateendpoint).

- Optionally create the private endpoint static IP configuration with [New-AzPrivateEndpointIpConfiguration](https://learn.microsoft.com/powershell/module/az.network/new-azprivateendpointipconfiguration).

# [**Dynamic IP**](#tab/dynamic-ip)

```azurepowershell-interactive
## Place the previously created webapp into a variable. ##
$webapp = Get-AzWebApp -ResourceGroupName test-rg -Name webapp-1

## Create the private endpoint connection. ## 
$pec = @{
    Name = 'connection-1'
    PrivateLinkServiceId = $webapp.ID
    GroupID = 'sites'
}
$privateEndpointConnection = New-AzPrivateLinkServiceConnection @pec

## Place the virtual network you created previously into a variable. ##
$vnet = Get-AzVirtualNetwork -ResourceGroupName 'test-rg' -Name 'vnet-1'

## Create the private endpoint. ##
$pe = @{
    ResourceGroupName = 'test-rg'
    Name = 'private-endpoint'
    Location = 'eastus2'
    Subnet = $vnet.Subnets[0]
    PrivateLinkServiceConnection = $privateEndpointConnection
}
New-AzPrivateEndpoint @pe

```

# [**Static IP**](#tab/static-ip)

```azurepowershell-interactive
## Place the previously created webapp into a variable. ##
$webapp = Get-AzWebApp -ResourceGroupName test-rg -Name webapp-1

## Create the private endpoint connection. ## 
$pec = @{
    Name = 'connection-1'
    PrivateLinkServiceId = $webapp.ID
    GroupID = 'sites'
}
$privateEndpointConnection = New-AzPrivateLinkServiceConnection @pec

## Place the virtual network you created previously into a variable. ##
$vnet = Get-AzVirtualNetwork -ResourceGroupName 'test-rg' -Name 'vnet-1'

## Create the static IP configuration. ##
$ip = @{
    Name = 'ipconfig-1'
    GroupId = 'sites'
    MemberName = 'sites'
    PrivateIPAddress = '10.0.0.10'
}
$ipconfig = New-AzPrivateEndpointIpConfiguration @ip

## Create the private endpoint. ##
$pe = @{
    ResourceGroupName = 'test-rg'
    Name = 'private-endpoint'
    Location = 'eastus2'
    Subnet = $vnet.Subnets[0]
    PrivateLinkServiceConnection = $privateEndpointConnection
    IpConfiguration = $ipconfig
}
New-AzPrivateEndpoint @pe

```
- When creating a private endpoint for storage, the connection name shown in a private endpoint tab is auto generated and is not editable.
---

## Configure the private DNS zone

A private DNS zone is used to resolve the DNS name of the private endpoint in the virtual network. For this example, we're using the DNS information for an Azure App Services web app, for more information on the DNS configuration of private endpoints, see [Azure Private Endpoint DNS configuration](private-endpoint-dns.md).

In this section, you'll:

- Create a new private Azure DNS zone with [New-AzPrivateDnsZone](https://learn.microsoft.com/powershell/module/az.privatedns/new-azprivatednszone)

- Link the DNS zone to the virtual network you created previously with [New-AzPrivateDnsVirtualNetworkLink](https://learn.microsoft.com/powershell/module/az.privatedns/new-azprivatednsvirtualnetworklink)

- Create a DNS zone configuration with [New-AzPrivateDnsZoneConfig](https://learn.microsoft.com/powershell/module/az.network/new-azprivatednszoneconfig)

- Create a DNS zone group with [New-AzPrivateDnsZoneGroup](https://learn.microsoft.com/powershell/module/az.network/new-azprivatednszonegroup)

```azurepowershell-interactive
## Place the virtual network into a variable. ##
$vnet = Get-AzVirtualNetwork -ResourceGroupName 'test-rg' -Name 'vnet-1'

## Create the private DNS zone. ##
$zn = @{
    ResourceGroupName = 'test-rg'
    Name = 'privatelink.azurewebsites.net'
}
$zone = New-AzPrivateDnsZone @zn

## Create a DNS network link. ##
$lk = @{
    ResourceGroupName = 'test-rg'
    ZoneName = 'privatelink.azurewebsites.net'
    Name = 'dns-link'
    VirtualNetworkId = $vnet.Id
}
$link = New-AzPrivateDnsVirtualNetworkLink @lk

## Configure the DNS zone. ##
$cg = @{
    Name = 'privatelink.azurewebsites.net'
    PrivateDnsZoneId = $zone.ResourceId
}
$config = New-AzPrivateDnsZoneConfig @cg

## Create the DNS zone group. ##
$zg = @{
    ResourceGroupName = 'test-rg'
    PrivateEndpointName = 'private-endpoint'
    Name = 'zone-group'
    PrivateDnsZoneConfig = $config
}
New-AzPrivateDnsZoneGroup @zg

```

## Create a test virtual machine

To verify the static IP address and the functionality of the private endpoint, a test virtual machine connected to your virtual network is required.

In this section, you'll:

- Create a sign-in credential for the virtual machine with [Get-Credential](https://learn.microsoft.com/powershell/module/microsoft.powershell.security/get-credential)

- Create a network interface for the virtual machine with [New-AzNetworkInterface](https://learn.microsoft.com/powershell/module/az.network/new-aznetworkinterface)

- Create a virtual machine configuration with [New-AzVMConfig](https://learn.microsoft.com/powershell/module/az.compute/new-azvmconfig), [Set-AzVMOperatingSystem](https://learn.microsoft.com/powershell/module/az.compute/set-azvmoperatingsystem), [Set-AzVMSourceImage](https://learn.microsoft.com/powershell/module/az.compute/set-azvmsourceimage), and [Add-AzVMNetworkInterface](https://learn.microsoft.com/powershell/module/az.compute/add-azvmnetworkinterface)

- Create the virtual machine with [New-AzVM](https://learn.microsoft.com/powershell/module/az.compute/new-azvm)

```azurepowershell-interactive
## Create the credential for the virtual machine. Enter a username and password at the prompt. ##
$cred = Get-Credential

## Place the virtual network into a variable. ##
$vnet = Get-AzVirtualNetwork -Name vnet-1 -ResourceGroupName test-rg

## Create a network interface for the virtual machine. ##
$nic = @{
    Name = 'nic-1'
    ResourceGroupName = 'test-rg'
    Location = 'eastus2'
    Subnet = $vnet.Subnets[0]
}
$nicVM = New-AzNetworkInterface @nic

## Create the configuration for the virtual machine. ##
$vm1 = @{
    VMName = 'vm-1'
    VMSize = 'Standard_DS1_v2'
}
$vm2 = @{
    ComputerName = 'vm-1'
    Credential = $cred
}
$vm3 = @{
    PublisherName = 'MicrosoftWindowsServer'
    Offer = 'WindowsServer'
    Skus = '2022-Datacenter'
    Version = 'latest'
}
$vmConfig = 
New-AzVMConfig @vm1 | Set-AzVMOperatingSystem -Windows @vm2 | Set-AzVMSourceImage @vm3 | Add-AzVMNetworkInterface -Id $nicVM.Id

## Create the virtual machine. ##
New-AzVM -ResourceGroupName 'test-rg' -Location 'eastus2' -VM $vmConfig

```

>**Note:**
>Virtual machines in a virtual network with a bastion host don't need public IP addresses. Bastion provides the public IP, and the VMs use private IPs to communicate within the network. You can remove the public IPs from any VMs in bastion hosted virtual networks. For more information, see [Dissociate a public IP address from an Azure VM](../virtual-network/ip-services/remove-public-ip-address-vm.md).

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ephemeral-ip-note.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/private-link/create-private-endpoint-powershell.md)

## Test connectivity to the private endpoint

Use the virtual machine that you created earlier to connect to the web app across the private endpoint.

1. In the search box at the top of the portal, enter **Virtual machine**. Select **Virtual machines**.

1. Select **vm-1**.

1. On the overview page for **vm-1**, select **Connect**, and then select the **Bastion** tab.

1. Select **Use Bastion**.

1. Enter the username and password that you used when you created the VM.

1. Select **Connect**.

1. After you've connected, open PowerShell on the server.

1. Enter `nslookup webapp-1.azurewebsites.net`. You receive a message that's similar to the following example:

    ```output
    Server:  UnKnown
    Address:  168.63.129.16

    Non-authoritative answer:
    Name:    webapp-1.privatelink.azurewebsites.net
    Address:  10.0.0.10
    Aliases:  webapp-1.azurewebsites.net
    ```

    A private IP address of **10.0.0.10** is returned for the web app name if you chose static IP address in the previous steps. This address is in the subnet of the virtual network you created earlier.

1. In the bastion connection to **vm-1**, open the web browser.

1. Enter the URL of your web app, `https://webapp-1.azurewebsites.net`.

   If your web app hasn't been deployed, you get the following default web app page:

    Screenshot of the default web app page on a browser.

## Clean up resources

When no longer needed, you can use the [Remove-AzResourceGroup](https://learn.microsoft.com/powershell/module/az.resources/remove-azresourcegroup) command to remove the resource group, virtual network, and the remaining resources.

```azurepowershell-interactive
Remove-AzResourceGroup -Name 'test-rg'
```

## Next steps

For more information about the services that support private endpoints, see:
> 
> [What is Azure Private Link?](private-link-overview.md#availability)
