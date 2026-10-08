---
title: 'Deploy Bastion: CLI'
titleSuffix: Azure Bastion
description: Learn how to deploy Azure Bastion using CLI
author: asudbring
ms.service: azure-bastion
ms.topic: how-to
ms.date: 04/05/2024
ms.author: allensu
ms.custom: devx-track-azurecli
ms.devlang: azurecli
# Customer intent: As someone with a networking background, I want to deploy Bastion and connect to a VM.
---

# Deploy Bastion using Azure CLI

This article shows you how to deploy Azure Bastion using CLI. Azure Bastion is a PaaS service that's maintained for you, not a bastion host that you install on your VM and maintain yourself. An Azure Bastion deployment is per virtual network, not per subscription/account or virtual machine. For more information about Azure Bastion, see [What is Azure Bastion?](bastion-overview.md) 

Once you deploy Bastion to your virtual network, you can connect to your VMs via private IP address. This seamless RDP/SSH experience is available to all the VMs in the same virtual network. If your VM has a public IP address that you don't need for anything else, you can remove it. 

Diagram showing Azure Bastion architecture.

In this article, you create a virtual network (if you don't already have one), deploy Azure Bastion using CLI, and connect to a VM. You can also deploy Bastion by using the following other methods:

* [Azure portal](quickstart-host-portal.md)
* [Azure PowerShell](bastion-create-host-powershell.md)
* [Quickstart - Deploy Bastion with default settings and the Standard SKU](quickstart-host-portal.md)

> **Note:**
> The use of Azure Bastion with Azure Private DNS zones is supported. However, there are restrictions. For more information, see the [Azure Bastion FAQ](bastion-faq.md#dns).


## Before beginning

### Azure subscription

Verify that you have an Azure subscription. If you don't already have an Azure subscription, you can activate your [MSDN subscriber benefits](https://azure.microsoft.com/pricing/member-offers/msdn-benefits-details) or sign up for a [free account](https://azure.microsoft.com/pricing/free-trial).

### Azure CLI


This article uses the Azure CLI. To run commands, you can use Azure Cloud Shell. The Azure Cloud Shell is a free interactive shell that you can use to run the steps in this article. It has common Azure tools preinstalled and configured to use with your account.

To open the Cloud Shell, just select **Try it** from the upper right corner of a code block. You can also launch Cloud Shell in a separate browser tab by going to [https://shell.azure.com](https://shell.azure.com) and toggle the dropdown in the left corner to reflect Bash or PowerShell. Select **Copy** to copy the blocks of code, paste it into the Cloud Shell, and press enter to run it.


## <a name="createhost"></a>Deploy Bastion

This section helps you deploy Azure Bastion using Azure CLI.

> **Important:**
> [Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/bastion-pricing.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/bastion/create-host-cli.md)
>

1. If you don't already have a virtual network, create a resource group and a virtual network using [az group create](https://learn.microsoft.com/cli/azure/group#az-group-create) and [az network vnet create](https://learn.microsoft.com/cli/azure/network/vnet#az-network-vnet-create).

   ```azurecli-interactive
   az group create --name TestRG1 --location eastus
   ```

   ```azurecli-interactive
   az network vnet create --resource-group TestRG1 --name VNet1 --address-prefix 10.1.0.0/16 --subnet-name default --subnet-prefix 10.1.0.0/24
   ```

1. Use [az network vnet subnet create](https://learn.microsoft.com/cli/azure/network/vnet/subnet#az-network-vnet-subnet-create) to create the subnet to which Bastion will be deployed. The subnet you create must be named **AzureBastionSubnet**. This subnet is reserve exclusively for Azure Bastion resources. If you don't have a subnet with the naming value **AzureBastionSubnet**, Bastion won't deploy.

   * The smallest subnet AzureBastionSubnet size you can create is /26. We recommend that you create a /26 or larger size to accommodate host scaling.
  * For more information about scaling, see [Configuration settings - Host scaling](configuration-settings.md#instance).
  * For more information about settings, see [Configuration settings - AzureBastionSubnet](configuration-settings.md#instance).
* Create the **AzureBastionSubnet** without any route tables or delegations. 
* If you use Network Security Groups on the **AzureBastionSubnet**, refer to the [Work with NSGs](bastion-nsg.md) article.


   ```azurecli-interactive
   az network vnet subnet create --name AzureBastionSubnet --resource-group TestRG1 --vnet-name VNet1 --address-prefix 10.1.1.0/26
   ```

1. Create a public IP address for Azure Bastion. The public IP is the public IP address the Bastion resource on which RDP/SSH will be accessed (over port 443). The public IP address must be in the same region as the Bastion resource you're creating. For this reason, pay particular attention to the `--location` value that you specify.

   ```azurecli-interactive
   az network public-ip create --resource-group TestRG1 --name VNet1-ip --sku Standard --location eastus
   ```

1. Use [az network bastion create](https://learn.microsoft.com/cli/azure/network/bastion#az-network-bastion-create) to create a new Azure Bastion resource for your virtual network. It takes about 10 minutes for the Bastion resource to create and deploy.

   The following example deploys Bastion using the **Basic** SKU. You can also deploy using other SKUs. The SKU determines the features that your Bastion deployment supports. If you don't specify a SKU in your command, the SKU defaults to Standard. For more information, see [Bastion SKUs](bastion-sku-comparison.md).

   ```azurecli-interactive
   az network bastion create --name VNet1-bastion --public-ip-address VNet1-ip --resource-group TestRG1 --vnet-name VNet1 --location eastus --sku Basic
   ```
   
## <a name="connect"></a>Connect to a VM

If you don't already have VMs in your virtual network, you can create a VM using [Quickstart: Create a Windows VM](https://learn.microsoft.com/azure/virtual-machines/windows/quick-create-portal), or [Quickstart: Create a Linux VM](https://learn.microsoft.com/azure/virtual-machines/linux/quick-create-portal) 

You can use any of the following articles, or the steps in the following section, to help you connect to a VM. Some connection types require the Bastion [Standard SKU or higher](bastion-sku-comparison.md).

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


### <a name="steps"></a>Connect using the portal

The following steps walk you through one type of connection using the Azure portal.


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
* To understand VNet peering, see [VNet peering and Azure Bastion](vnet-peering.md).
