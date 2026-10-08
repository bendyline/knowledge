---
title: Manage DNS zones in Azure DNS - PowerShell | Microsoft Docs
description: You can manage DNS zones using Azure PowerShell. This article describes how to update, delete, and create DNS zones on Azure DNS
services: dns
author: asudbring
ms.service: azure-dns
ms.topic: how-to
ms.date: 03/07/2025
ms.author: allensu
ms.custom: devx-track-azurepowershell
# Customer intent: As a network administrator, I want to create, update, and delete DNS zones using PowerShell, so that I can efficiently manage my domain's DNS infrastructure within Azure.
---

# How to manage DNS Zones using PowerShell

> 
> * [Portal](dns-operations-dnszones-portal.md)
> * [PowerShell](dns-operations-dnszones.md)
> * [Azure classic CLI](dns-operations-dnszones-cli.md)
> * [Azure CLI](dns-operations-dnszones-cli.md)

This article shows you how to manage your DNS zones by using Azure PowerShell. You can also manage your DNS zones using the cross-platform [Azure CLI](dns-operations-dnszones-cli.md) or the Azure portal.

This guide specifically deals with Public DNS zones. For information on using Azure PowerShell to manage Private Zones in Azure DNS, see [Get started with Azure DNS Private Zones using Azure PowerShell](private-dns-getstarted-powershell.md).

A DNS zone is used to host the DNS records for a particular domain. To start hosting your domain in Azure DNS, you need to create a DNS zone for that domain name. Each DNS record for your domain is then created inside this DNS zone.

For example, the domain 'contoso.com' may contain several DNS records, such as 'mail.contoso.com' (for a mail server) and 'www.contoso.com' (for a web site).

When creating a DNS zone in Azure DNS:

* The name of the zone must be unique within the resource group, and the zone must not exist already. Otherwise, the operation fails.
* The same zone name can be reused in a different resource group or a different Azure subscription.
* Where multiple zones share the same name, each instance is assigned different name server addresses. Only one set of addresses can be configured with the domain name registrar.

> **Note:**
> You do not have to own a domain name to create a DNS zone with that domain name in Azure DNS. However, you do need to own the domain to configure the Azure DNS name servers as the correct name servers for the domain name with the domain name registrar.
> 
> For more information, see [Delegate a domain to Azure DNS](dns-domain-delegation.md).


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


## Create a DNS zone

A DNS zone is created by using the `New-AzDnsZone` cmdlet.

The following example creates a DNS zone called *contoso.com* in the resource group called *MyDNSResourceGroup*:

```azurepowershell-interactive
New-AzDnsZone -Name contoso.com -ResourceGroupName MyDNSResourceGroup
```

The following example shows how to create a DNS zone with two [Azure Resource Manager tags](dns-zones-records.md#tags), *project = demo* and *env = test*:

```azurepowershell-interactive
New-AzDnsZone -Name contoso.com -ResourceGroupName MyDNSResourceGroup -Tag @{ project="demo"; env="test" }
```

## Get a DNS zone

To retrieve a DNS zone, use the `Get-AzDnsZone` cmdlet. This operation returns a DNS zone object corresponding to an existing zone in Azure DNS. The object contains data about the zone (such as the number of record sets), but doesn't contain the record sets themselves (see `Get-AzDnsRecordSet`).

```azurepowershell-interactive
Get-AzDnsZone -Name contoso.com –ResourceGroupName MyDNSResourceGroup

Name                  : contoso.com
ResourceGroupName     : myresourcegroup
Etag                  : 00000003-0000-0000-8ec2-f4879750d201
Tags                  : {project, env}
NameServers           : {ns1-01.azure-dns.com., ns2-01.azure-dns.net., ns3-01.azure-dns.org.,
                        ns4-01.azure-dns.info.}
NumberOfRecordSets    : 2
MaxNumberOfRecordSets : 5000
```

## List DNS zones

By omitting the zone name from `Get-AzDnsZone`, you can enumerate all zones in a resource group. This operation returns an array of zone objects.

```azurepowershell-interactive
$zoneList = Get-AzDnsZone -ResourceGroupName MyDNSResourceGroup
$zoneList
```

By omitting both the zone name and the resource group name from `Get-AzDnsZone`, you can enumerate all zones in the Azure subscription.

```azurepowershell-interactive
$zoneList = Get-AzDnsZone
$zoneList
```

## Update a DNS zone

Changes to a DNS zone resource can be made by using `Set-AzDnsZone`. This cmdlet doesn't update any of the DNS record sets within the zone (see [How to Manage DNS records](dns-operations-recordsets.md)). It's only used to update properties of the zone resource itself. The writable zone properties are currently limited to the [Azure Resource Manager ‘tags’ for the zone resource](dns-zones-records.md#tags).

Use one of the following two ways to update a DNS zone:

### Specify the zone using the zone name and resource group

This approach replaces the existing zone tags with the values specified.

```azurepowershell-interactive
Set-AzDnsZone -Name contoso.com -ResourceGroupName MyDNSResourceGroup -Tag @{ project="demo"; env="test" }
```

### Specify the zone using a $zone object

This approach retrieves the existing zone object, modifies the tags, and then commits the changes. In this way, existing tags can be preserved.

```azurepowershell-interactive
# Get the zone object
$zone = Get-AzDnsZone -Name contoso.com -ResourceGroupName MyDNSResourceGroup

# Remove an existing tag
$zone.Tags.Remove("project")

# Add a new tag
$zone.Tags.Add("status","approved")

# Commit changes
Set-AzDnsZone -Zone $zone
```

When you use `Set-AzDnsZone` with a $zone object, [Etag checks](dns-zones-records.md#etags) are used to ensure concurrent changes aren't overwritten. You can use the optional `-Overwrite` switch to suppress these checks.

## Delete a DNS Zone

DNS zones can be deleted using the `Remove-AzDnsZone` cmdlet.

> **Note:**
> Deleting a DNS zone also deletes all DNS records within the zone. This operation cannot be undone. If the DNS zone is in use, services using the zone will fail when the zone is deleted.
>
>To protect against accidental zone deletion, see [How to protect DNS zones and records](dns-protect-zones-recordsets.md).


Use one of the following two ways to delete a DNS zone:

### Specify the zone using the zone name and resource group name

```azurepowershell-interactive
Remove-AzDnsZone -Name contoso.com -ResourceGroupName MyDNSResourceGroup
```

### Specify the zone using a $zone object

You can specify the zone to be deleted using a `$zone` object returned by `Get-AzDnsZone`.

```azurepowershell-interactive
$zone = Get-AzDnsZone -Name contoso.com -ResourceGroupName MyDNSResourceGroup
Remove-AzDnsZone -Zone $zone
```

The zone object can also be piped instead of being passed as a parameter:

```azurepowershell-interactive
Get-AzDnsZone -Name contoso.com -ResourceGroupName MyDNSResourceGroup | Remove-AzDnsZone

```

As with `Set-AzDnsZone`, specifying the zone using a `$zone` object enables Etag checks to ensure concurrent changes aren't deleted. Use the `-Overwrite` switch to suppress these checks.

## Confirmation prompts

The `New-AzDnsZone`, `Set-AzDnsZone`, and `Remove-AzDnsZone` cmdlets all support confirmation prompts.

Both `New-AzDnsZone` and `Set-AzDnsZone` prompt for confirmation if the `$ConfirmPreference` PowerShell preference variable has a value of `Medium` or lower. Since deleting a DNS zone can potentially cause unwanted conditions, the `Remove-AzDnsZone` cmdlet prompts for confirmation if the `$ConfirmPreference` PowerShell variable has any value other than `None`.

Since the default value for `$ConfirmPreference` is `High`, only `Remove-AzDnsZone` prompts for confirmation by default.

You can override the current `$ConfirmPreference` setting using the `-Confirm` parameter. If you specify `-Confirm` or `-Confirm:$True` , the cmdlet prompts you for confirmation before it runs. If you specify `-Confirm:$False` , the cmdlet doesn't prompt you for confirmation.

For more information about `-Confirm` and `$ConfirmPreference`, see [About Preference Variables](https://learn.microsoft.com/powershell/module/microsoft.powershell.core/about/about_preference_variables).

## Next steps

Learn how to [manage record sets and records](dns-operations-recordsets.md) in your DNS zone.
<br>
Learn how to [delegate your domain to Azure DNS](dns-domain-delegation.md).
<br>
Review the [Azure DNS PowerShell reference documentation](https://learn.microsoft.com/powershell/module/Az.dns).
