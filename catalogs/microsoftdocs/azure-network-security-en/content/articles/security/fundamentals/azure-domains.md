---
title: Reference list of Azure domains (not comprehensive)
description: Review a partial reference list of Azure domains and wildcard subdomains for common Azure services and endpoint planning.
services: security
author: msmbaldwin
ms.author: mbaldwin

ms.service: security
ms.subservice: security-fundamentals
ms.topic: article
ms.date: 07/20/2026
ai-usage: ai-assisted
---
# Reference list of Azure domains (not comprehensive)

This page is a partial list of the Azure domains in use. Some of them are REST API endpoints.

Unlike IP address ranges (which Azure publishes in the [Azure IP Ranges and Service Tags](https://www.microsoft.com/download/details.aspx?id=56519) download), a complete list of all Azure FQDNs isn't feasible because:

- **Dynamic resource names**: Azure creates subdomains dynamically based on customer-provided resource names (for example, `myapp.azurewebsites.net` or `mystorageaccount.blob.core.windows.net`), resulting in millions of unique FQDNs.
- **Regional variations**: Many services use region-specific endpoints (for example, `*.westus2.cloudapp.azure.com`).
- **Constant evolution**: New services and endpoints are added regularly.

For firewall configurations, use the wildcard patterns shown in the **Subdomain** column (for example, `*.blob.core.windows.net`) rather than attempting to enumerate all possible FQDNs. For service-specific endpoint requirements, see the individual service documentation.

| Service | Subdomain |
| --- | --- |
| Azure Access Control Service (retired) | `*.accesscontrol.windows.net` |
| [Microsoft Entra ID](https://learn.microsoft.com/entra/fundamentals/whatis) | `*.graph.windows.net`<br>`*.onmicrosoft.com` |
| [Azure API Management](https://learn.microsoft.com/azure/api-management/api-management-key-concepts) | `*.azure-api.net` |
| Azure BizTalk Services (retired) | `*.biztalk.windows.net` |
| [Azure Blob storage](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blobs-introduction.md) | `*.blob.core.windows.net` |
| [Azure Cloud Services](https://learn.microsoft.com/azure/cloud-services/cloud-services-choose-me) and [Azure Virtual Machines](https://learn.microsoft.com/azure/virtual-machines/) | `*.cloudapp.net` |
| [Azure Cloud Services](https://learn.microsoft.com/azure/cloud-services/cloud-services-choose-me) and [Azure Virtual Machines](https://learn.microsoft.com/azure/virtual-machines/) | `*.cloudapp.azure.com` |
| [Azure Container Registry](https://learn.microsoft.com/azure/container-registry/container-registry-intro) | `*.azurecr.io` |
| Azure Container Service (deprecated) | `*.azurecontainer.io` |
| [Azure Content Delivery Network (CDN)](https://learn.microsoft.com/azure/cdn/cdn-overview) | `*.vo.msecnd.net` |
| [Azure Cosmos DB](https://learn.microsoft.com/azure/cosmos-db/) | `*.cosmos.azure.com` |
| [Azure Cosmos DB](https://learn.microsoft.com/azure/cosmos-db/) | `*.documents.azure.com` |
| [Azure Files](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/files/storage-files-introduction.md) | `*.file.core.windows.net` |
| [Azure Front Door](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/frontdoor/index.yml) (classic) | `*.azurefd.net` |
| [Azure Front Door](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/frontdoor/index.yml) Standard/Premium | `*.z01.azurefd.net` |
| [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/overview) | `*.vault.azure.net` |
| [Azure Kubernetes Service](https://learn.microsoft.com/azure/aks/) | `*.azmk8s.io` |
| Azure Management Services | `*.management.core.windows.net` |
| [Azure Media Services](https://learn.microsoft.com/azure/media-services/latest/azure-media-services-retirement) | `*.origin.mediaservices.windows.net` |
| [Azure Mobile Apps](https://github.com/Azure/azure-mobile-apps) | `*.azure-mobile.net` |
| [Azure Queue Storage](https://learn.microsoft.com/azure/storage/queues/storage-queues-introduction) | `*.queue.core.windows.net` |
| [Azure Service Bus](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/service-bus-messaging/service-bus-messaging-overview.md) | `*.servicebus.windows.net` |
| [Azure SQL Database](https://learn.microsoft.com/azure/azure-sql/database/sql-database-paas-overview) | `*.database.windows.net` |
| [Azure CDN](https://learn.microsoft.com/azure/cdn/) (migrated to [Azure Front Door](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/frontdoor/index.yml)) | `*.azureedge.net` |
| [Azure Table Storage](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/tables/table-storage-overview.md) | `*.table.core.windows.net` |
| [Azure Traffic Manager](../../traffic-manager/traffic-manager-overview.md) | `*.trafficmanager.net` |
| Azure App Service | `*.azurewebsites.net` |
| [GitHub Codespaces](https://visualstudio.microsoft.com/services/github-codespaces/) | `*.visualstudio.com` |
