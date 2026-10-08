---
 title: Include file for PowerShell for Azure DNS
 description: include file for PowerShell for Azure DNS
 services: dns
 author: asudbring
 ms.service: azure-dns
 ms.topic: Include file for PowerShell for Azure DNS
 ms.date: 03/07/2025
 ms.author: allensu
 ms.custom: Include file for PowerShell for Azure DNS, devx-track-azurepowershell
---

## Set up Azure PowerShell for Azure DNS

### Before you begin

> **Important:**
>
> Using this Azure feature from PowerShell requires the `AzureRM` module installed. This
> is an older module only available for Windows PowerShell 5.1 that no longer receives new features.
> The `Az` and `AzureRM` modules are __not__ compatible when installed for the same versions of PowerShell.
> If you need both versions:
>
> 1. [Uninstall the Az module](https://learn.microsoft.com/powershell/azure/uninstall-az-ps) from a PowerShell 5.1 session.
> 2. [Install the AzureRM module](https://learn.microsoft.com/previous-versions/powershell/azure/install-azurerm-ps) from a PowerShell 5.1 session.
> 3. [Download and install PowerShell Core 6.x or later](https://learn.microsoft.com/powershell/scripting/install/installing-powershell-core-on-windows).
> 4. [Install the Az module](https://learn.microsoft.com/powershell/azure/install-azure-powershell) in a PowerShell Core session.



Verify that you have the following items before beginning your configuration.

* An Azure subscription. If you don't already have an Azure subscription, you can activate your [MSDN subscriber benefits](https://azure.microsoft.com/pricing/member-offers/msdn-benefits-details/) or sign up for a [free account](https://azure.microsoft.com/pricing/free-trial/).
* You need to install the latest version of the Azure Resource Manager PowerShell cmdlets. For more information, see [How to install and configure Azure PowerShell](https://learn.microsoft.com/powershell/azureps-cmdlets-docs).

### Sign in to your Azure account

Open your PowerShell console and connect to your account. For more information, see [Sign in with Azure PowerShell](https://learn.microsoft.com/powershell/azure/authenticate-interactive).

```azurepowershell-interactive
Connect-AzAccount
```

### Select the subscription
 
Check the subscriptions for the account.

```azurepowershell-interactive
Get-AzSubscription
```

Choose which of your Azure subscriptions to use.

```azurepowershell-interactive
Select-AzSubscription -SubscriptionName "your_subscription_name"
```

### Create a resource group

Azure Resource Manager requires that all resource groups specify a location. This location is used as the default location for resources in that resource group. However, because all DNS resources are global, not regional, the choice of resource group location has no impact on Azure DNS.

You can skip this step if you are using an existing resource group.

```azurepowershell-interactive
New-AzResourceGroup -Name MyDNSResourceGroup -location "West US"
```
