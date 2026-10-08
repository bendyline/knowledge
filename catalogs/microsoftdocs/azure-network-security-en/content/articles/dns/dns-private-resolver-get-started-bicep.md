---
title: 'Quickstart: Create an Azure DNS Private Resolver - Bicep'
titleSuffix: Azure DNS Private resolver
description: Learn how to create Azure DNS Private Resolver. This article is a step-by-step quickstart to create and manage your first Azure DNS Private Resolver using Bicep.
services: dns
author: asudbring
ms.author: allensu
ms.date: 02/28/2024
ms.topic: quickstart
ms.service: azure-dns
ms.custom:
  - devx-track-azurepowershell
  - subject-armqs
  - mode-arm
  - devx-track-azurecli
  - devx-track-bicep
  - sfi-image-nochange
#Customer intent: As an administrator or developer, I want to learn how to create Azure DNS Private Resolver using Bicep so I can use Azure DNS Private Resolver as forwarder.
# Customer intent: "As a network administrator, I want to create an Azure DNS Private Resolver using Bicep so that I can manage DNS resolutions for both Azure and on-premises domains efficiently."
---

# Quickstart: Create an Azure DNS Private Resolver using Bicep

This quickstart describes how to use Bicep to create Azure DNS Private Resolver.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/resource-manager-quickstart-bicep-introduction.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/dns/dns-private-resolver-get-started-bicep.md)

The following figure summarizes the general setup used. Subnet address ranges used in templates are slightly different than those shown in the figure.

Conceptual figure displaying components of the private resolver.

## Prerequisites

If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.

## Review the Bicep file

The Bicep file used in this quickstart is from [Azure Quickstart Templates](https://learn.microsoft.com/samples/azure/azure-quickstart-templates/azure-dns-private-resolver/).

This Bicep file is configured to create a:

- Virtual network
- DNS resolver
- Inbound & outbound endpoints
- Forwarding Rules & rulesets.

[Code reference unavailable in this source snapshot: ~/quickstart-templates/quickstarts/microsoft.network/azure-dns-private-resolver/main.bicep](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/dns/dns-private-resolver-get-started-bicep.md)

Seven resources are defined in this template:

- [**Microsoft.Network/virtualnetworks**](https://learn.microsoft.com/azure/templates/microsoft.network/virtualnetworks)
- [**Microsoft.Network/dnsResolvers**](https://learn.microsoft.com/azure/templates/microsoft.network/dnsresolvers)
- [**Microsoft.Network/dnsResolvers/inboundEndpoints**](https://learn.microsoft.com/azure/templates/microsoft.network/dnsresolvers/inboundendpoints)
- [**Microsoft.Network/dnsResolvers/outboundEndpoints**](https://learn.microsoft.com/azure/templates/microsoft.network/dnsresolvers/outboundendpoints)
- [**Microsoft.Network/dnsForwardingRulesets**](https://learn.microsoft.com/azure/templates/microsoft.network/dnsforwardingrulesets)
- [**Microsoft.Network/dnsForwardingRulesets/forwardingRules**](https://learn.microsoft.com/azure/templates/microsoft.network/dnsforwardingrulesets/forwardingrules)
- [**Microsoft.Network/dnsForwardingRulesets/virtualNetworkLinks**](https://learn.microsoft.com/azure/templates/microsoft.network/dnsforwardingrulesets/virtualnetworklinks)

## Deploy the Bicep file

1. Save the Bicep file as **main.bicep** to your local computer.
2. Deploy the Bicep file using either Azure CLI or Azure PowerShell

# [CLI](#tab/CLI)

````azurecli
az group create --name exampleRG --location eastus
az deployment group create --resource-group exampleRG --template-file main.bicep
````

# [PowerShell](#tab/PowerShell)

````azurepowershell
New-AzResourceGroup -Name exampleRG -Location eastus
New-AzResourceGroupDeployment -ResourceGroupName exampleRG -TemplateFile ./main.bicep
````

---

When the deployment finishes, you should see a message indicating the deployment succeeded.

## Validate the deployment

Use the Azure portal, Azure CLI, or Azure PowerShell to list the deployed resources in the resource group.

# [CLI](#tab/CLI)

```azurecli
#Show the DNS resolver
az dns-resolver show --name "sampleDnsResolver" --resource-group "sampleResourceGroup"

#List the inbound endpoint
az dns-resolver inbound-endpoint list --dns-resolver-name "sampleDnsResolver" --resource-group "sampleResourceGroup"

#List the outbound endpoint
az dns-resolver outbound-endpoint list --dns-resolver-name "sampleDnsResolver" --resource-group "sampleResourceGroup"

```
# [PowerShell](#tab/PowerShell)

```azurepowershell
#Show the DNS resolver
Get-AzDnsResolver -Name "sampleDNSResolver" -ResourceGroupName "sampleResourceGroup"

#List the inbound endpoint list
Get-AzDnsResolverInboundEndpoint -DnsResolverName "sampleDnsResolver" -ResourceGroupName "sampleResourceGroup"

#List the outbound endpoint
Get-AzDnsResolverOutboundEndpoint -DnsResolverName "sampleDnsResolver" -ResourceGroupName "sampleResourceGroup"

```
---

## Clean up resources

When no longer needed, use the Azure portal, Azure CLI, or Azure PowerShell to delete the resources in the following order.

### Delete the DNS resolver

# [CLI](#tab/CLI)
````azurecli
#Delete the inbound endpoint
az dns-resolver inbound-endpoint delete --dns-resolver-name "sampleDnsResolver" --name "sampleInboundEndpoint" --resource-group "exampleRG"

#Delete the virtual network link
az dns-resolver vnet-link delete --ruleset-name "sampleDnsForwardingRuleset" --resource- group "exampleRG" --name "sampleVirtualNetworkLink"

#Delete DNS forwarding ruleset
az dns-resolver forwarding-ruleset delete --name "samplednsForwardingRulesetName" --resource-group "exampleRG"

#Delete the outbound endpoint
az dns-resolver outbound-endpoint delete --dns-resolver-name "sampleDnsResolver" --name "sampleOutboundEndpoint" --resource-group "exampleRG"

#Delete the DNS resolver
az dns-resolver delete --name "sampleDnsResolver" --resource-group "exampleRG"
````

# [PowerShell](#tab/PowerShell)
```azurepowershell
#Delete the inbound endpoint
Remove-AzDnsResolverInboundEndpoint -Name myinboundendpoint -DnsResolverName mydnsresolver -ResourceGroupName myresourcegroup

#Delete the virtual network link
Remove-AzDnsForwardingRulesetVirtualNetworkLink -DnsForwardingRulesetName $dnsForwardingRuleset.Name -Name vnetlink -ResourceGroupName myresourcegroup

#Delete the DNS forwarding ruleset
Remove-AzDnsForwardingRuleset -Name $dnsForwardingRuleset.Name -ResourceGroupName myresourcegroup

#Delete the outbound endpoint
Remove-AzDnsResolverOutboundEndpoint -DnsResolverName mydnsresolver -ResourceGroupName myresourcegroup -Name myoutboundendpoint

#Delete the DNS resolver
Remove-AzDnsResolver -Name mydnsresolver -ResourceGroupName myresourcegroup
````
---

## Next steps

In this quickstart, you created a virtual network and DNS private resolver. Now configure name resolution for Azure and on-premises domains.
- [Resolve Azure and on-premises domains](private-resolver-hybrid-dns.md)
