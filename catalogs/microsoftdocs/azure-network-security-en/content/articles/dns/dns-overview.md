---
title: "Azure DNS Overview: Hosting and Resolution"
description: Learn how Azure DNS provides public and private DNS hosting, resolution, and load balancing for your applications using Microsoft Azure infrastructure.
author: asudbring
ms.service: azure-dns
ms.topic: overview
ms.date: 07/28/2026
ms.author: allensu
#Customer intent: As an administrator, I want to evaluate Azure DNS so I can determine if I want to use it instead of my current DNS service.
# Customer intent: As an IT administrator, I want to assess Azure DNS services, so that I can decide if it meets my organization's DNS hosting and management needs better than our current solution.
---

# Azure DNS overview

The Domain Name System (DNS) translates (resolves) a service name to an IP address. Azure DNS provides DNS hosting, resolution, and load balancing for your applications by using the Microsoft Azure infrastructure.

Azure DNS supports both internet-facing DNS domains and private DNS zones. It provides the following services:
- **[Azure Public DNS](public-dns-overview.md)** is a hosting service for DNS domains. By hosting your domains in Azure, you can manage your DNS records by using the same credentials, APIs, tools, and billing as your other Azure services.

- **[Azure Private DNS](private-dns-overview.md)** is a DNS service for your virtual networks. Azure Private DNS manages and resolves domain names in the virtual network without the need to configure a custom DNS solution.

- **[Azure DNS Private Resolver](dns-private-resolver-overview.md)** is a service that enables you to query Azure DNS private zones from an on-premises environment and vice versa without deploying VM based DNS servers.

- **[Azure Traffic Manager](https://learn.microsoft.com/azure/traffic-manager/traffic-manager-overview)** is a DNS-based traffic load balancer. This service allows you to distribute traffic to your public facing applications across the global Azure regions.

- **[DNS Resolver Policy](dns-security-policy.md)** offers the ability to filter and log DNS queries at the virtual network level. It also includes a Threat Intelligence feed which allows early detection and prevention of security incidents on your Virtual Networks where known malicious domains sourced by [Microsoft's Security Response Center (MSRC)](https://www.microsoft.com/msrc) can be blocked from name resolution.

Azure DNS enables multiple scenarios, including:

* [Host and resolve public domains](https://learn.microsoft.com/azure/dns/dns-delegate-domain-azure-dns)
* [Manage DNS resolution in your virtual networks](https://learn.microsoft.com/azure/dns/private-dns-privatednszone)
* [Enable autoregistration for VMs](https://learn.microsoft.com/azure/dns/private-dns-autoregistration)
* [Enable name resolution between Azure and your on-premises resources](https://learn.microsoft.com/azure/dns/private-resolver-hybrid-dns)
* [Secure hybrid networking](https://learn.microsoft.com/azure/architecture/networking/architecture/azure-dns-private-resolver#use-dns-private-resolver)
* [Monitor DNS metrics and alerts](https://learn.microsoft.com/azure/dns/dns-alerts-metrics)
* [Integrate with your other Azure services](https://learn.microsoft.com/azure/dns/dns-for-azure-services)
* [Perform Private Link and DNS integration at scale](https://learn.microsoft.com/azure/cloud-adoption-framework/ready/azure-best-practices/private-link-and-dns-integration-at-scale)
* Protect your [public](https://learn.microsoft.com/azure/dns/dns-protect-zones-recordsets) and [private](https://learn.microsoft.com/azure/dns/dns-protect-private-zones-recordsets) DNS zones and records
* Enable automatic [fault tolerance](https://learn.microsoft.com/azure/dns/private-resolver-reliability) and [failover](https://learn.microsoft.com/azure/dns/tutorial-dns-private-resolver-failover) for DNS resolution
* [Load-balance your applications](https://learn.microsoft.com/azure/traffic-manager/traffic-manager-how-it-works)
* [Link DNS records directly to Traffic Manager profiles](https://learn.microsoft.com/azure/dns/dns-traffic-manager-linked-records)
* Increase application [availability](https://learn.microsoft.com/azure/traffic-manager/traffic-manager-monitoring) and [performance](https://learn.microsoft.com/azure/traffic-manager/traffic-manager-configure-performance-routing-method)
* [Monitor your application traffic patterns](https://learn.microsoft.com/azure/traffic-manager/traffic-manager-traffic-view-overview)
* [Secure and view DNS traffic](https://learn.microsoft.com/azure/dns/dns-traffic-log-how-to)

> **Note:**
> Azure DNS is one of the services that make up the Network Foundations category in Azure. Other services in this category include [Azure Virtual Networks](../virtual-network/virtual-networks-overview.md) and [Azure Private Link](../private-link/private-link-overview.md). Each service has its own unique features and use cases. For more information on this service category, see [Network Foundations](../networking/foundations/network-foundations-overview.md).

## Next steps

* To learn about Public DNS zones and records, see [DNS zones and records overview](dns-zones-records.md).
* To learn about Private DNS zones, see [What is an Azure Private DNS zone](private-dns-privatednszone.md).
* To learn about private resolver endpoints and rulesets, see [Azure DNS Private Resolver endpoints and rulesets](private-resolver-endpoints-rulesets.md).
* For frequently asked questions about Azure DNS, see [Azure DNS FAQ](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/dns/dns-faq.yml).
* For frequently asked questions about Azure Private DNS, see [Azure Private DNS FAQ](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/dns/dns-faq-private.yml).
* For frequently asked questions about Traffic Manager, see [Traffic Manager routing methods](https://learn.microsoft.com/azure/traffic-manager/traffic-manager-faqs).
* Also see [Learn module: Introduction to Azure DNS](https://learn.microsoft.com/training/modules/intro-to-azure-dns).
