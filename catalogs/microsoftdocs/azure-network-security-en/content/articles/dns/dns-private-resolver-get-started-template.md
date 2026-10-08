---
title: 'Quickstart: Create an Azure DNS Private Resolver - Azure Resource Manager template (ARM template)'
titleSuffix: Azure DNS Private resolver
description: Learn how to create Azure DNS Private Resolver. This article is a step-by-step quickstart to create and manage your first Azure DNS Private Resolver using Azure Resource Manager template (ARM template).
services: dns
author: asudbring
ms.author: allensu
ms.date: 02/28/2024
ms.topic: quickstart
ms.service: azure-dns
ms.custom:
  - subject-armqs
  - mode-arm
  - devx-track-arm-template
  - sfi-image-nochange
#Customer intent: As an administrator or developer, I want to learn how to create Azure DNS Private Resolver using ARM template so I can use Azure DNS Private Resolver as forwarder..
# Customer intent: As a network administrator, I want to create an Azure DNS Private Resolver using an ARM template, so that I can manage DNS queries between Azure and on-premises networks effectively.
---

# Quickstart: Create an Azure DNS Private Resolver using an ARM template

This quickstart describes how to use an Azure Resource Manager template (ARM template) to create Azure DNS Private Resolver.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/resource-manager-quickstart-introduction.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/dns/dns-private-resolver-get-started-template.md)

The following figure summarizes the general setup used. Subnet address ranges used in templates are slightly different than those shown in the figure.

Conceptual figure displaying components of the private resolver.

If your environment meets the prerequisites and you're familiar with using ARM templates, select the **Deploy to Azure** button. The template will open in the Azure portal.

Button to deploy the Resource Manager template to Azure.

## Prerequisites

If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.

## Review the template

The template used in this quickstart is from [Azure Quickstart Templates](https://learn.microsoft.com/samples/azure/azure-quickstart-templates/azure-dns-private-resolver/).

This template is configured to create a:

- Virtual network
- DNS resolver
- Inbound & outbound endpoints
- Forwarding Rules & rulesets.

[Code reference unavailable in this source snapshot: ~/quickstart-templates/quickstarts/microsoft.network/azure-dns-private-resolver/azuredeploy.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/dns/dns-private-resolver-get-started-template.md)

Seven resources are defined in this template:

- [**Microsoft.Network/virtualnetworks**](https://learn.microsoft.com/azure/templates/microsoft.network/virtualnetworks)
- [**Microsoft.Network/dnsResolvers**](https://learn.microsoft.com/azure/templates/microsoft.network/dnsresolvers)
- [**Microsoft.Network/dnsResolvers/inboundEndpoints**](https://learn.microsoft.com/azure/templates/microsoft.network/dnsresolvers/inboundendpoints)
- [**Microsoft.Network/dnsResolvers/outboundEndpoints**](https://learn.microsoft.com/azure/templates/microsoft.network/dnsresolvers/outboundendpoints)
- [**Microsoft.Network/dnsForwardingRulesets**](https://learn.microsoft.com/azure/templates/microsoft.network/dnsforwardingrulesets)
- [**Microsoft.Network/dnsForwardingRulesets/forwardingRules**](https://learn.microsoft.com/azure/templates/microsoft.network/dnsforwardingrulesets/forwardingrules)
- [**Microsoft.Network/dnsForwardingRulesets/virtualNetworkLinks**](https://learn.microsoft.com/azure/templates/microsoft.network/dnsforwardingrulesets/virtualnetworklinks)


## Deploy the template

# [CLI](#tab/CLI)

````azurecli-interactive
read -p "Enter the location: " location
resourceGroupName="exampleRG"
templateUri="https://raw.githubusercontent.com/Azure/azure-quickstart-templates/master/quickstarts/microsoft.network/azure-dns-private-resolver/azuredeploy.json"

az group create \
--name $resourceGroupName \
--location $location

az deployment group create \
--resource-group $resourceGroupName \
--template-uri $templateUri
````

# [PowerShell](#tab/PowerShell)
````azurepowershell-interactive
$location = Read-Host -Prompt "Enter the location: "
$templateUri = "https://raw.githubusercontent.com/Azure/azure-quickstart-templates/master/quickstarts/microsoft.network/azure-dns-private-resolver/azuredeploy.json"

$resourceGroupName = "exampleRG"

New-AzResourceGroup -Name $resourceGroupName -Location $location
New-AzResourceGroupDeployment -ResourceGroupName $resourceGroupName -TemplateUri $templateUri
````
---

## Validate the deployment

1. Sign in to the [Azure portal](https://portal.azure.com).

1. Select **Resource groups** from the left pane.

1. Select the resource group that you created in the previous section.

1. The resource group should contain the following resources:

    [ DNS resolver resource group](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/dns/media/dns-resolver-getstarted-template/dns-resolver-resource-group.png#lightbox)

1. Select the DNS private resolver service to verify the provisioning and current state.

   [ DNS resolver page](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/dns/media/dns-resolver-getstarted-template/resolver-page.png#lightbox)

1. Select the Inbound Endpoints and Outbound Endpoints to verify that the endpoints are created and the outbound endpoint is associated with the forwarding ruleset.

    [ DNS resolver inbound endpoint](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/dns/media/dns-resolver-getstarted-template/resolver-inbound-endpoint.png#lightbox)

    [ DNS resolver outbound endpoint](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/dns/media/dns-resolver-getstarted-template/resolver-outbound-endpoint.png#lightbox)

1. Select the **Associated ruleset** from the outbound endpoint page to verify the forwarding ruleset and rules creation.

    [ DNS resolver forwarding rule](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/dns/media/dns-resolver-getstarted-template/resolver-forwarding-rule.png#lightbox)

1. Verify the resolver Virtual network is linked with forwarding ruleset.

    [ DNS resolver VNet link](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/dns/media/dns-resolver-getstarted-template/resolver-vnet-link.png#lightbox)

## Next steps

In this quickstart, you created a virtual network and DNS private resolver. Now configure name resolution for Azure and on-premises domains.
- [Resolve Azure and on-premises domains](private-resolver-hybrid-dns.md)
