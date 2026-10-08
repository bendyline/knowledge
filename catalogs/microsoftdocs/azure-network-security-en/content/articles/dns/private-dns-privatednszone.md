---
title: Azure Private DNS Zone Overview
description: "Learn how Azure Private DNS zones provide secure DNS resolution for virtual networks using custom domain names. Discover setup, limits, and best practices."
services: dns
author: asudbring
ms.service: azure-dns
ms.topic: concept-article
ms.date: 06/22/2026
ms.author: allensu
# Customer intent: "As a cloud network administrator, I want to manage DNS resolution using private DNS zones, so that I can customize domain names and enhance security for virtual network resources without exposing them to the public Internet."
---

# Azure Private DNS zone overview

Azure Private DNS provides a reliable, secure DNS service to manage and resolve domain names in a virtual network without the need to add a custom DNS solution. By using private DNS zones, you can use your own custom domain names rather than the Azure-provided names available today. 

The records contained in a private DNS zone aren't resolvable from the Internet. DNS resolution against a private DNS zone works only from virtual networks that are linked to it.

You can link a private DNS zone to one or more virtual networks by creating [virtual network links](private-dns-virtual-network-links.md).
You can also enable the [autoregistration](private-dns-autoregistration.md) feature to automatically manage the life cycle of the DNS records for the virtual machines that get deployed in a virtual network.

## Private DNS zone resolution

When you use the default DNS settings of a virtual network, the system queries private DNS zones linked to that virtual network first. The system then queries Azure-provided DNS servers next. However, if you define a [custom DNS server](https://learn.microsoft.com/azure/virtual-network/manage-virtual-network#change-dns-servers) in a virtual network, the system doesn't automatically query private DNS zones linked to that virtual network. The custom settings override the name resolution order.

To enable custom DNS to resolve the private zone, use an [Azure DNS Private Resolver](dns-private-resolver-overview.md) in a virtual network linked to the private zone as described in [centralized DNS architecture](private-resolver-architecture.md#centralized-dns-architecture). If your custom DNS server is a virtual machine, you must configure a conditional forwarder. Point the conditional forwarder to Azure DNS (168.63.129.16) for the private zone.

## Limits

**Private DNS zones**

| Resource | Limit |
| --- | --- |
| Private DNS zones per subscription | 1000 |
| Record sets per private DNS zone | 25000 |
| Records per record set for private DNS zones | 20 |
| Virtual Network Links per private DNS zone | 1000 |
| Virtual Networks Links per private DNS zones with autoregistration enabled | 100 |
| Number of private DNS zones a virtual network can get linked to with autoregistration enabled | 1 |
| Number of private DNS zones a virtual network can get linked | 1000 |


## Restrictions

* Single-label private DNS zones aren't supported. Your private DNS zone must have two or more labels. For example, contoso.com has two labels separated by a dot. A private DNS zone can have a maximum of 34 labels.
* You can't create zone delegations (NS records) in a private DNS zone. If you intend to use a child domain, you can directly create the domain as a private DNS zone. Then you can link it to the virtual network without setting up a nameserver delegation from the parent zone.
* The following list of reserved zone names are blocked from creation to prevent disruption of services:

    | Public | Azure Government | Microsoft Azure operated by 21Vianet |
    | --- | --- | --- |
    | azclient.ms | azclient.us | azclient.cn |
    | azure.com | azure.us | azure.cn |
    | cloudapp.net | usgovcloudapp.net | chinacloudapp.cn |
    | core.windows.net | core.usgovcloudapi.net | core.chinacloudapi.cn |
    | microsoft.com | microsoft.us | microsoft.cn |
    | msidentity.com | msidentity.us | msidentity.cn |
    | trafficmanager.net | usgovtrafficmanager.net | trafficmanager.cn |
    | windows.net | usgovcloudapi.net | chinacloudapi.cn |

## Next steps

* Review and understand [Private DNS records](dns-private-records.md).
* Learn how to create a private zone in Azure DNS by using [Azure PowerShell](private-dns-getstarted-powershell.md) or [Azure CLI](private-dns-getstarted-cli.md).
* Read about some common [private zone scenarios](private-dns-scenarios.md) that can be realized with private zones in Azure DNS.
* For common questions and answers about private zones in Azure DNS, see [Private DNS FAQ](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/dns/dns-faq-private.yml).
