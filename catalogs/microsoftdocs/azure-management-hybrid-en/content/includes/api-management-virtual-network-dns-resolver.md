---
author: PatAltimore
ms.service: azure-api-management
ms.topic: include
ms.date: 06/20/2025
ms.author: patricka
---

While you have the option to use a private or custom DNS server, we recommend:

1. Configure an Azure [DNS private zone](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles//dns/private-dns-overview.md).
1. Link the Azure DNS private zone to the virtual network. 

Learn how to [set up a private zone in Azure DNS](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/dns/private-dns-getstarted-portal.md).

> **Note:**
> If you configure a private or custom DNS resolver in the virtual network used for injection, you must ensure name resolution for Azure Key Vault endpoints (`*.vault.azure.net`). We recommend configuring an Azure private DNS zone, which doesn't require additional configuration to enable it.
