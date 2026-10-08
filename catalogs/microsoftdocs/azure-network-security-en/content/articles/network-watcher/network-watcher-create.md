---
title: Enable or Disable Azure Network Watcher
description: Learn how to enable or disable Azure Network Watcher in your region by creating a Network Watcher instance using the Azure portal, PowerShell, the Azure CLI, REST API, or ARM template.
author: halkazwini
ms.author: halkazwini
ms.service: azure-network-watcher
ms.topic: how-to
ms.date: 09/23/2025
ms.custom: devx-track-azurepowershell, devx-track-azurecli, devx-track-arm-template

#CustomerIntent: As an Azure administrator, I want to manage Network Watcher instance in Azure regions, so that I can effectively utilize Network Watcher capabilities in those regions to ensure optimal performance and reliability of my Azure resources.
---

# Enable or disable Azure Network Watcher

Azure Network Watcher is a regional service that enables you to monitor and diagnose conditions at a network scenario level in, to, and from Azure. Scenario level monitoring enables you to diagnose problems at an end to end network level view. Network diagnostic and visualization tools available with Network Watcher help you understand, diagnose, and gain insights to your network in Azure.

Network Watcher is enabled in an Azure region through the creation of a Network Watcher instance in that region. This instance allows you to utilize Network Watcher capabilities in that particular region.

> **Note:**
> - By default, Network Watcher is automatically enabled. When you create or update a virtual network in your subscription, Network Watcher will be automatically enabled in your Virtual Network's region.
> - Automatically enabling Network Watcher doesn't affect your resources or associated charge.
> - If you previously chose to [opt out of Network Watcher automatic enablement](#opt-out-of-network-watcher-automatic-enablement), you must manually [enable Network Watcher](#enable-network-watcher-for-your-region) in each region where you want to use Network Watcher capabilities.

## Prerequisites

# [**Portal**](#tab/portal)

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

- Sign in to the [Azure portal](https://portal.azure.com/?WT.mc_id=A261C142F) with your Azure account.

# [**PowerShell**](#tab/powershell)

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

- Azure Cloud Shell or Azure PowerShell.

    The steps in this article run the Azure PowerShell cmdlets interactively in [Azure Cloud Shell](https://learn.microsoft.com/azure/cloud-shell/overview). To run the commands in the Cloud Shell, select **Open Cloud Shell** at the upper-right corner of a code block. Select **Copy** to copy the code and then paste it into Cloud Shell to run it. You can also run the Cloud Shell from within the Azure portal.

    You can also [install PowerShell locally](https://learn.microsoft.com/powershell/scripting/install/installing-powershell) to run the cmdlets. This article requires the Az PowerShell module. For more information, see [How to install Azure PowerShell](https://learn.microsoft.com/powershell/azure/install-azure-powershell). To find the installed version, run [Get-Module -ListAvailable Az](https://learn.microsoft.com/powershell/module/microsoft.powershell.core/get-module) cmdlet. If you run PowerShell locally, sign in to Azure using the [Connect-AzAccount](https://learn.microsoft.com/powershell/module/az.accounts/connect-azaccount) cmdlet.

# [**Azure CLI**](#tab/cli)

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

- Azure Cloud Shell or Azure CLI.
    
    The steps in this article run the Azure CLI commands interactively in [Azure Cloud Shell](https://learn.microsoft.com/azure/cloud-shell/overview). To run the commands in the Cloud Shell, select **Open Cloud Shell** at the upper-right corner of a code block. Select **Copy** to copy the code, and paste it into Cloud Shell to run it. You can also run the Cloud Shell from within the Azure portal.
    
    You can also [install Azure CLI locally](https://learn.microsoft.com/cli/azure/install-azure-cli) to run the commands. To find the installed version, run [az version](https://learn.microsoft.com/cli/azure/reference-index#az-version) command. If you run Azure CLI locally, sign in to Azure using the [az login](https://learn.microsoft.com/cli/azure/reference-index#az-login) command.

---

## Enable Network Watcher for your region

If you choose to [opt out of Network Watcher automatic enablement](#opt-out-of-network-watcher-automatic-enablement), you must manually enable Network Watcher in each region where you want to use Network Watcher capabilities. To enable Network Watcher in a region, create a Network Watcher instance in that region using the [Azure portal](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/network-watcher/network-watcher-create.md?tabs=portal#enable-network-watcher-for-your-region), [PowerShell](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/network-watcher/network-watcher-create.md?tabs=powershell#enable-network-watcher-for-your-region), the [Azure CLI](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/network-watcher/network-watcher-create.md?tabs=cli#enable-network-watcher-for-your-region), [REST API](https://learn.microsoft.com/rest/api/network-watcher/network-watchers/create-or-update), or an [Azure Resource Manager template (ARM template)](https://github.com/Azure/azure-quickstart-templates/tree/master/quickstarts/microsoft.network/networkwatcher-create).


# [**Portal**](#tab/portal)

1. In the search box at the top of the portal, enter *network watcher*. Select **Network Watcher** from the search results.

    Screenshot shows how to search for Network Watcher in the Azure portal.

1. On the **Overview** page, select **+ Create**.

1. On **Add network watcher**, select your Azure subscription, then select the region that you want to enable Azure Network Watcher for.

1. Select **Add**.

    Screenshot shows how to create a Network Watcher in the Azure portal.

> **Note:**
> When you create a Network Watcher instance using the Azure portal:
> - The name of the Network Watcher instance is automatically set to **NetworkWatcher_{region}**, where *region* corresponds to the Azure region of the Network Watcher instance. For example, a Network Watcher enabled in the East US region is named **NetworkWatcher_eastus**.
> - The Network Watcher instance is created in a resource group named **NetworkWatcherRG**. The resource group is created if it doesn't already exist.

If you wish to customize the name of a Network Watcher instance and resource group, you can use [PowerShell](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/network-watcher/network-watcher-create.md?tabs=powershell#enable-network-watcher-for-your-region) or [REST API](https://learn.microsoft.com/rest/api/network-watcher/network-watchers/create-or-update) methods. In each option, the resource group must exist before you create a Network Watcher in it.  

# [**PowerShell**](#tab/powershell)

Create a Network Watcher instance using [New-AzNetworkWatcher](https://learn.microsoft.com/powershell/module/az.network/new-aznetworkwatcher) cmdlet:

```azurepowershell-interactive
# Create a resource group for the Network Watcher instance (if it doesn't already exist).
New-AzResourceGroup -Name 'NetworkWatcherRG' -Location 'eastus'

# Create an instance of Network Watcher in East US region.
New-AzNetworkWatcher -Name 'NetworkWatcher_eastus' -ResourceGroupName 'NetworkWatcherRG' -Location 'eastus'
```

> **Note:**
> When you create a Network Watcher instance using PowerShell, you can customize the name of a Network Watcher instance and resource group. However, the resource group must exist before you create a Network Watcher instance in it.

# [**Azure CLI**](#tab/cli)

Create a Network Watcher instance using [az network watcher configure](https://learn.microsoft.com/cli/azure/network/watcher#az-network-watcher-configure) command:

```azurecli-interactive
# Create a resource group for the Network Watcher instance (if it doesn't already exist).
az group create --name 'NetworkWatcherRG' --location 'eastus'

# Create an instance of Network Watcher in East US region.
az network watcher configure --resource-group 'NetworkWatcherRG' --locations 'eastus' --enabled
```

> **Note:**
> When you create a Network Watcher instance using the Azure CLI:
> - The name of the Network Watcher instance is automatically set to **{region}-watcher**, where *region* corresponds to the Azure region of the Network Watcher instance. For example, a Network Watcher enabled in the East US region is named **eastus-watcher**.
> - You can customize the name of the Network Watcher resource group. However, the resource group must exist before you create a Network Watcher instance in it.

If you wish to customize the name of the Network Watcher instance, you can use [PowerShell](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/network-watcher/network-watcher-create.md?tabs=powershell#enable-network-watcher-for-your-region) or [REST API](https://learn.microsoft.com/rest/api/network-watcher/network-watchers/create-or-update) methods.

---

## Disable Network Watcher for your region

You can disable Network Watcher for a region by deleting the Network Watcher instance in that region. You can delete a Network Watcher instance using the [Azure portal](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/network-watcher/network-watcher-create.md?tabs=portal#disable-network-watcher-for-your-region), [PowerShell](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/network-watcher/network-watcher-create.md?tabs=powershell#disable-network-watcher-for-your-region), the [Azure CLI](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/network-watcher/network-watcher-create.md?tabs=cli#disable-network-watcher-for-your-region), or [REST API](https://learn.microsoft.com/rest/api/network-watcher/network-watchers/delete).

> **Warning:**
> Deleting a Network Watcher instance deletes all Network Watcher running operations, historical data, and alerts with no option to revert. For example, if you delete `NetworkWatcher_eastus` instance, all flow logs, connection monitors, and packet captures in East US region will be deleted.

# [**Portal**](#tab/portal)

1. In the search box at the top of the portal, enter *network watcher*. Select **Network Watcher** from the search results.

1. On the **Overview** page, select the Network Watcher instances that you want to delete, then select **Disable**.

    Screenshot shows how to delete a Network Watcher instance in the Azure portal.

1. Enter *yes*, then select **Delete**.

    Screenshot showing the confirmation page before deleting a Network Watcher in the Azure portal.

# [**PowerShell**](#tab/powershell)

Delete a Network Watcher instance using [Remove-AzNetworkWatcher](https://learn.microsoft.com/powershell/module/az.network/remove-aznetworkwatcher):

```azurepowershell-interactive
# Disable Network Watcher in the East US region by deleting its East US instance.
Remove-AzNetworkWatcher -Location 'eastus'
```

# [**Azure CLI**](#tab/cli)

Use [az network watcher configure](https://learn.microsoft.com/cli/azure/network/watcher#az-network-watcher-configure) to delete an instance of Network Watcher:

```azurecli-interactive
# Disable Network Watcher in the East US region.
az network watcher configure --locations 'eastus' --enabled 'false'
```

---

## Opt out of Network Watcher automatic enablement

You can opt out of Network Watcher automatic enablement using Azure PowerShell or Azure CLI.

> **Caution:**
> Opting-out of Network Watcher automatic enablement is a permanent change. Once you opt out, you can't opt in without contacting [Azure support](https://azure.microsoft.com/support/options/).

# [**Portal**](#tab/portal)

Opting-out of Network Watcher automatic enablement isn't available in the Azure portal. Use [PowerShell](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/network-watcher/network-watcher-create.md?tabs=powershell#opt-out-of-network-watcher-automatic-enablement) or [Azure CLI](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/network-watcher/network-watcher-create.md?tabs=cli#opt-out-of-network-watcher-automatic-enablement) to opt out of Network Watcher automatic enablement.

# [**PowerShell**](#tab/powershell)

To opt out of Network Watcher automatic enablement, use [Register-AzProviderFeature](https://learn.microsoft.com/powershell/module/az.resources/register-azproviderfeature) cmdlet to register the `DisableNetworkWatcherAutocreation` feature for the `Microsoft.Network` resource provider. Then, use [Register-AzResourceProvider](https://learn.microsoft.com/powershell/module/az.resources/register-azresourceprovider) cmdlet to register the `Microsoft.Network` resource provider.

```azurepowershell-interactive
# Register the "DisableNetworkWatcherAutocreation" feature.
Register-AzProviderFeature -FeatureName 'DisableNetworkWatcherAutocreation' -ProviderNamespace 'Microsoft.Network'

# Register the "Microsoft.Network" resource provider.
Register-AzResourceProvider -ProviderNamespace 'Microsoft.Network'
```

# [**Azure CLI**](#tab/cli)

To opt out of Network Watcher automatic enablement, use [az feature register](https://learn.microsoft.com/cli/azure/feature#az-feature-register) command to register the `DisableNetworkWatcherAutocreation` feature for the `Microsoft.Network` resource provider. Then, use [az provider register](https://learn.microsoft.com/cli/azure/provider#az-provider-register) command to register the `Microsoft.Network` resource provider.

```azurecli-interactive
# Register the "DisableNetworkWatcherAutocreation" feature.
az feature register --name 'DisableNetworkWatcherAutocreation' --namespace 'Microsoft.Network'

# Register the "Microsoft.Network" resource provider.
az provider register --name 'Microsoft.Network'
```

---

> **Note:**
> After you opt out of Network Watcher automatic enablement, you must manually enable Network Watcher in each region where you want to use Network Watcher capabilities. For more information, see [Enable Network Watcher for your region](#enable-network-watcher-for-your-region). 

## List Network Watcher instances

You can view all regions where Network Watcher is enabled in your subscription by listing available Network Watcher instances in your subscription. Use the [Azure portal](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/network-watcher/network-watcher-create.md?tabs=portal#list-network-watcher-instances), [PowerShell](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/network-watcher/network-watcher-create.md?tabs=powershell#list-network-watcher-instances), the [Azure CLI](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/network-watcher/network-watcher-create.md?tabs=cli#list-network-watcher-instances), or [REST API](https://learn.microsoft.com/rest/api/network-watcher/network-watchers/list-all) to list Network Watcher instances in your subscription.

# [**Portal**](#tab/portal)

1. In the search box at the top of the portal, enter *network watcher*. Select **Network Watcher** from the search results.

1. On the **Overview** page, you can see all Network Watcher instances in your subscription.

    Screenshot shows how to list all Network Watcher instances in your subscription in the Azure portal.

# [**PowerShell**](#tab/powershell)

List all Network Watcher instances in your subscription using [Get-AzNetworkWatcher](https://learn.microsoft.com/powershell/module/az.network/get-aznetworkwatcher).

```azurepowershell-interactive
# List all Network Watcher instances in your subscription.
Get-AzNetworkWatcher
```

# [**Azure CLI**](#tab/cli)

List all Network Watcher instances in your subscription using [az network watcher list](https://learn.microsoft.com/cli/azure/network/watcher#az-network-watcher-list).

```azurecli-interactive
# List all Network Watcher instances in your subscription.
az network watcher list --out table
```

---

## Related content

To get started with Network Watcher, see:

- [Virtual network flow logs](vnet-flow-logs-overview.md)
- [Connection monitor](connection-monitor-overview.md)
- [Connection troubleshoot](connection-troubleshoot-overview.md)
