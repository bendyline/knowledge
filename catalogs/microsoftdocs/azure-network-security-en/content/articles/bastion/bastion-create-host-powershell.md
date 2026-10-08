---
title: 'Deploy Bastion:PowerShell'
titleSuffix: Azure Bastion
description: Learn how to deploy Azure Bastion using PowerShell.
author: asudbring
ms.service: azure-bastion
ms.topic: how-to
ms.date: 08/10/2026
ms.author: allensu
ms.custom: devx-track-azurepowershell
# Customer intent: As someone with a networking background, I want to deploy Bastion and connect to a VM.
---

# Deploy Bastion using Azure PowerShell

This article shows you how to deploy Azure Bastion using PowerShell. Azure Bastion is a PaaS service that's maintained for you, not a bastion host that you install on your VM and maintain yourself. An Azure Bastion deployment is per virtual network, not per subscription/account or virtual machine. For more information about Azure Bastion, see [What is Azure Bastion?](bastion-overview.md)

Once you deploy Bastion to your virtual network, you can connect to your VMs via private IP address. This seamless RDP/SSH experience is available to all the VMs in the same virtual network. If your VM has a public IP address that you don't need for anything else, you can remove it.

Diagram showing Azure Bastion architecture.

In this article, you create a virtual network (if you don't already have one), deploy Azure Bastion using PowerShell, and connect to a VM. The examples show Bastion deployed using the Standard SKU, but you can use a different Bastion SKU, depending on the features you'd like to use. For more information, see [Bastion SKUs](bastion-sku-comparison.md).

You can also deploy Bastion by using the following other methods:

* [Azure portal - Deploy Bastion](quickstart-host-portal.md)
* [Azure portal - Deploy Bastion with default settings and Standard SKU](quickstart-host-portal.md)
* [Deploy using Azure CLI](create-host-cli.md)

> **Note:**
> The use of Azure Bastion with Azure Private DNS zones is supported. However, there are restrictions. For more information, see the [Azure Bastion FAQ](bastion-faq.md#dns).


## Before beginning

Verify that you have an Azure subscription. If you don't already have an Azure subscription, you can activate your [MSDN subscriber benefits](https://azure.microsoft.com/pricing/member-offers/msdn-benefits-details) or sign up for a [free account](https://azure.microsoft.com/pricing/free-trial).


### PowerShell


This article uses PowerShell cmdlets. To run the cmdlets, you can use Azure Cloud Shell. Cloud Shell is a free interactive shell that you can use to run the steps in this article. It has common Azure tools preinstalled and configured to use with your account.

To open Cloud Shell, just select **Open Cloudshell** from the upper-right corner of a code block. You can also open Cloud Shell on a separate browser tab by going to [https://shell.azure.com/powershell](https://shell.azure.com/powershell). Select **Copy** to copy the blocks of code, paste them into Cloud Shell, and select the Enter key to run them.


You can also install and run the Azure PowerShell cmdlets locally on your computer. PowerShell cmdlets are updated frequently. If you haven't installed the latest version, the values specified in the instructions may fail. To find the versions of Azure PowerShell installed on your computer, use the `Get-Module -ListAvailable Az` cmdlet. To install or update, see [Install the Azure PowerShell module](https://learn.microsoft.com/powershell/azure/install-azure-powershell).


### Example values

You can use the following example values when creating this configuration, or you can substitute your own.

**Example VNet and VM values:**

| **Name** | **Value** |
| --- | --- |
| Virtual machine | TestVM |
| Resource group | TestRG1 |
| Region | East US |
| Virtual network | VNet1 |
| Address space | 10.1.0.0/16 |
| Subnets | FrontEnd: 10.1.0.0/24 |

**Azure Bastion values:**

| **Name** | **Value** |
| --- | --- |
| Name | VNet1-bastion |
| Subnet Name | FrontEnd |
| Subnet Name | AzureBastionSubnet |
| AzureBastionSubnet addresses | A subnet within your virtual network address space with a subnet mask /26 or larger.<br> For example, 10.1.1.0/26. |
| SKU | Standard |
| Public IP address | Create new |
| Public IP address name | VNet1-ip |
| Public IP address SKU | Standard |
| Assignment | Static |

## Deploy Bastion

This section helps you create a virtual network, subnets, and deploy Azure Bastion using Azure PowerShell.

> **Important:**
> [Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/bastion-pricing.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/bastion/bastion-create-host-powershell.md)
>

1. Create a resource group, a virtual network, and a front end subnet to which you deploy the VMs that you'll connect to via Bastion. If you're running PowerShell locally, open your PowerShell console with elevated privileges and connect to Azure using the `Connect-AzAccount` command.

   ```azurepowershell-interactive
   New-AzResourceGroup -Name TestRG1 -Location EastUS ` 
   $frontendSubnet = New-AzVirtualNetworkSubnetConfig -Name FrontEnd `
   -AddressPrefix "10.1.0.0/24" ` 
   $virtualNetwork = New-AzVirtualNetwork `
   -Name TestVNet1 -ResourceGroupName TestRG1 `
   -Location EastUS -AddressPrefix "10.1.0.0/16" `
   -Subnet $frontendSubnet ` 
   $virtualNetwork | Set-AzVirtualNetwork
   ```

1. Configure and set the Azure Bastion subnet for your virtual network. This subnet is reserved exclusively for Azure Bastion resources. You must create this subnet using the name value **AzureBastionSubnet**. This value lets Azure know which subnet to deploy the Bastion resources to. The example in the following section helps you add an Azure Bastion subnet to an existing VNet.

   * The smallest subnet AzureBastionSubnet size you can create is /26. We recommend that you create a /26 or larger size to accommodate host scaling.
  * For more information about scaling, see [Configuration settings - Host scaling](configuration-settings.md#instance).
  * For more information about settings, see [Configuration settings - AzureBastionSubnet](configuration-settings.md#instance).
* Create the **AzureBastionSubnet** without any route tables or delegations. 
* If you use Network Security Groups on the **AzureBastionSubnet**, refer to the [Work with NSGs](bastion-nsg.md) article.


   Set the variable.

   ```azurepowershell-interactive
   $vnet = Get-AzVirtualNetwork -Name "TestVNet1" -ResourceGroupName "TestRG1"
   ```

   Add the subnet.

   ```azurepowershell-interactive
   Add-AzVirtualNetworkSubnetConfig `
   -Name "AzureBastionSubnet" -VirtualNetwork $vnet `
   -AddressPrefix "10.1.1.0/26" | Set-AzVirtualNetwork
   ```

1. Create a public IP address for Azure Bastion. The public IP is the public IP address of the Bastion resource on which RDP/SSH will be accessed (over port 443). The public IP address must be in the same region as the Bastion resource you're creating.

   ```azurepowershell-interactive
   $publicip = New-AzPublicIpAddress -ResourceGroupName "TestRG1" `
   -name "VNet1-ip" -location "EastUS" `
   -AllocationMethod Static -Sku Standard
   ```

1. Create a new Azure Bastion resource in the AzureBastionSubnet using the [New-AzBastion](https://learn.microsoft.com/powershell/module/az.network/new-azbastion) command. The following example uses the **Basic SKU**. However, you can also deploy Bastion using a different SKU by changing the -Sku value. The SKU you select determines the Bastion features and connect to VMs using more connection types. For more information, see [Bastion SKUs](bastion-sku-comparison.md).

   ```azurepowershell-interactive
   New-AzBastion -ResourceGroupName "TestRG1" -Name "VNet1-bastion" `
   -PublicIpAddressRgName "TestRG1" -PublicIpAddressName "VNet1-ip" `
   -VirtualNetworkRgName "TestRG1" -VirtualNetworkName "TestVNet1" `
   -Sku "Basic"
   ```

1. It takes about 10 minutes for the Bastion resources to deploy. You can create a VM in the next section while Bastion deploys to your virtual network.

## <a name="create-vm"></a>Create a VM

You can create a VM using the [Quickstart: Create a VM using PowerShell](https://learn.microsoft.com/azure/virtual-machines/windows/quick-create-powershell) or [Quickstart: Create a VM using the portal](https://learn.microsoft.com/azure/virtual-machines/windows/quick-create-portal) articles. Be sure you deploy the VM to the same virtual network to which you deployed Bastion. The VM you create in this section isn't a part of the Bastion configuration and doesn't become a bastion host. You connect to this VM later in this tutorial via Bastion.

The following required roles for your resources.

* Required roles:

  * Reader role on the virtual machine.
  * Reader role on the NIC with private IP of the virtual machine.
  * Reader role on the Azure Bastion resource.
  * Reader role on the virtual network of the target virtual machine (if the Bastion deployment is in a peered virtual network).

* Required inbound ports:

  * For Windows VMS - RDP (3389)
  * For Linux VMs - SSH (22)

## <a name="connect"></a>Connect to a VM

You can use the [Connection steps](#steps) in the following section to connect to your VM. You can also use any of the following articles to connect to a VM. Some connection types require the Bastion [Standard SKU](bastion-sku-comparison.md).

* Connect to a Windows VM
  * [RDP](bastion-connect-vm-rdp-windows.md)
  * [SSH](bastion-connect-vm-ssh-windows.md)
* Connect to a Linux VM
  * [SSH](bastion-connect-vm-ssh-linux.md)
* [Connect to a scale set](bastion-connect-vm-scale-set.md)
* [Connect via IP address](connect-ip-address.md)
* Connect from a native client
  * [Windows client](connect-vm-native-client-windows.md)
  * [Linux/SSH client](connect-vm-native-client-linux.md)


### <a name="steps"></a>Connection steps


1. In the [Azure portal](https://portal.azure.com), go to the virtual machine that you want to connect to. 
1. At the top of the pane, select **Connect** > **Bastion** to go to the **Bastion** pane. You can also go to the **Bastion** pane by using the left menu.
1. The options available on the **Bastion** pane depend on the Bastion SKU.

   If you're using the **Standard or higher SKU**, you have more connection protocol and port options available. Expand **Connection Settings** to see the options. Typically, unless you configure different settings for your VM, you connect to a Windows computer by using RDP and port 3389. You connect to a Linux computer by using SSH and port 22.

   If you're using the **Basic SKU**, you connect to a Windows computer by using RDP and port 3389. Also for the Basic SKU, you connect to a Linux computer by using SSH and port 22. You don't have options to change the port number or the protocol. However, you can change the keyboard language for RDP by expanding **Connection Settings** on this pane.

   If you're using the **Developer SKU**, Bastion deploys automatically when you connect for the first time. You connect to a Windows computer by using RDP and port 3389, or to a Linux computer by using SSH and port 22. The Developer SKU uses a shared pool architecture and is available at no extra cost in [select regions](quickstart-host-portal.md?tabs=developer).

1. For **Authentication Type**, select the authentication type from the dropdown list. The protocol determines the available authentication types. Complete the required authentication values.

1. To open the VM session in a new browser tab, leave **Open in new browser tab** selected.
1. Select **Connect** to connect to the VM.
1. Confirm that the connection to the virtual machine opens directly in the Azure portal (over HTML5) by using port 443 and the Bastion service.

Using keyboard shortcut keys while you're connected to a VM might not result in the same behavior as shortcut keys on a local computer. For example, when you're connected to a Windows VM from a Windows client, Ctrl+Alt+End is the keyboard shortcut for Ctrl+Alt+Delete on a local computer. To do this from a Mac while you're connected to a Windows VM, the keyboard shortcut is fn+control+option+delete.

### <a name="audio"></a>To enable audio output

You can enable remote audio output for your VM. Some VMs automatically enable this setting, whereas others require you to enable audio settings manually. The settings are changed on the VM itself. Your Bastion deployment doesn't need any special configuration settings to enable remote audio output. Audio input is not supported at the moment.

> **Note:**
> Audio output uses bandwidth on your internet connection.

To enable remote audio output on a Windows VM:

1. After you're connected to the VM, an audio button appears on the lower-right corner of the toolbar. Right-click the audio button, and then select **Sounds**.
1. A pop-up message asks if you want to enable the Windows Audio Service. Select **Yes**. You can configure more audio options in **Sound preferences**.
1. To verify sound output, hover over the audio button on the toolbar.


## <a name="ip"></a>Remove VM public IP address

Azure Bastion doesn't use the public IP address to connect to the client VM. If you don't need the public IP address for your VM, you can disassociate the public IP address. See [Dissociate a public IP address from an Azure VM](../virtual-network/ip-services/remove-public-ip-address-vm.md).

## Next steps

* To use Network Security Groups with the Azure Bastion subnet, see [Work with NSGs](bastion-nsg.md).
* To understand VNet peering, see [Virtual Network peering and Azure Bastion](vnet-peering.md).
