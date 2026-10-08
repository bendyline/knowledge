---
title: Azure Private Link availability
description: In this article, learn about which Azure services support Private Link.
author: asudbring
ms.author: allensu
ms.service: azure-private-link
ms.topic: concept-article
ms.date: 03/30/2026
ms.custom: template-concept, references_regions, ignite-2024
# Customer intent: "As a cloud architect, I want to understand the availability of Azure services that support Private Link, so that I can securely connect resources in my virtual network and enhance data privacy."
---

# Azure Private Link availability

Azure Private Link enables you to access Azure PaaS Services (for example, Azure Storage and SQL Database) and Azure hosted customer-owned/partner services over a [private endpoint](private-endpoint-overview.md) in your virtual network.

> **Important:**
> Azure Private Link is now generally available. Both Private Endpoint and Private Link service (service behind standard load balancer) are generally available. For known limitations, see [Private Endpoint](private-endpoint-overview.md#limitations) and [Private Link Service](private-link-service-overview.md#limitations).

> **Note:**
> The feature Private Link Service Direct Connect, which allows you to connect to any privately routable destination IP address, is now in public preview. For more information and known limitations, see [Private Link Service Direct Connect](configure-private-link-service-direct-connect.md)

## Service availability

The following tables list the Private Link services and the regions where they're available.

### AI + Machine Learning

| Supported services | Available regions | Other considerations | Status |
| :--- | :--- | :--- | :--- |
| Azure Machine Learning | All public regions |  | GA   <br/> [Learn how to create a private endpoint for Azure Machine Learning.](https://learn.microsoft.com/azure/machine-learning/how-to-configure-private-link) |
| Azure Bot Service | All public regions | Supported only on Direct Line App Service extension | GA </br> [Learn how to create a private endpoint for Azure Bot Service](https://learn.microsoft.com/azure/bot-service/dl-network-isolation-concept) |
| Azure AI Search | All public regions |  | GA </br> [Learn how to create a private endpoint for Azure AI Search](https://learn.microsoft.com/azure/search/service-create-private-endpoint) |
| Foundry Tools | All public regions<br/>All Government regions |  | GA   <br/> [Use private endpoints.](https://learn.microsoft.com/azure/ai-services/cognitive-services-virtual-networks#use-private-endpoints) |
| Azure AI Video Indexer | All public regions |  | GA   <br/> [Use private endpoints with Azure AI Video Indexer.](https://learn.microsoft.com/azure/azure-video-indexer/private-endpoint-overview) |

### Analytics

| Supported services | Available regions | Other considerations | Status |
| :--- | :--- | :--- | :--- |
| Azure Synapse Analytics | All public regions <br/> All Government regions | Supported for Proxy [connection policy](https://learn.microsoft.com/azure/azure-sql/database/connectivity-architecture#connection-policy) | GA <br/> [Learn how to create a private endpoint for Azure Synapse Analytics.](https://learn.microsoft.com/azure/synapse-analytics/sql/private-endpoint-overview) |
| Azure Event Hubs | All public regions<br/>All Government regions |  | GA   <br/> [Learn how to create a private endpoint for Azure Event Hubs.](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-hubs/private-link-service.md) |
| Azure Monitor <br/>(Log Analytics & Application Insights) | All public regions |  | GA   <br/> [Learn how to create a private endpoint for Azure Monitor.](https://learn.microsoft.com/azure/azure-monitor/logs/private-link-security) |
| Azure Data Factory | All public regions<br/> All Government regions<br/>All China regions | Credentials need to be stored in an Azure key vault | GA   <br/> [Learn how to create a private endpoint for Azure Data Factory.](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/data-factory/data-factory-private-link.md) |
| Azure HDInsight | All public regions<br/>All Government regions |  | GA   <br/> [Learn how to create a private endpoint for Azure HDInsight.](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/hdinsight/hdinsight-private-link.md) |
| Azure Data Explorer | All public regions |  | GA </br> [Learn how to create a private endpoint for Azure Data Explorer.](https://learn.microsoft.com/azure/data-explorer/security-network-private-endpoint) |
| Azure Stream Analytics | All public regions |  | GA </br> [Learn how to create a private endpoint for Azure Stream Analytics.](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/stream-analytics/private-endpoints.md) |

### Compute

| Supported services | Available regions | Other considerations | Status |
| :--- | :--- | :--- | :--- |
| Azure managed disks | All public regions<br/> All Government regions<br/>All China regions | [Select for known limitations](https://learn.microsoft.com/azure/virtual-machines/disks-enable-private-links-for-import-export-portal#limitations) | GA   <br/> [Learn how to create a private endpoint for Azure managed disks.](https://learn.microsoft.com/azure/virtual-machines/disks-enable-private-links-for-import-export-portal) |
| Azure Batch (batchAccount) | All public regions<br/> All Government regions<br/>All China regions |  | GA <br/> [Learn how to create a private endpoint for Azure Batch.](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/batch/private-connectivity.md) |
| Azure Batch (nodeManagement) | [Selected regions](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/batch/simplified-compute-node-communication.md#supported-regions) | Supported for [simplified compute node communication](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/batch/simplified-compute-node-communication.md) | GA <br/> [Learn how to create a private endpoint for Azure Batch.](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/batch/private-connectivity.md) |
| Azure Functions | All public regions |  | GA </br> [Learn how to create a private endpoint for Azure Functions.](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-create-vnet.md) |

### Containers

| Supported services | Available regions | Other considerations | Status |
| :--- | :--- | :--- | :--- |
| Azure Container Registry | All public regions<br/> All Government regions | Supported with premium tier of container registry. [Select for tiers](https://learn.microsoft.com/azure/container-registry/container-registry-skus) | GA   <br/> [Learn how to create a private endpoint for Azure Container Registry.](https://learn.microsoft.com/azure/container-registry/container-registry-private-link) |
| Azure Container Apps | All public regions | Supported for workload profile environments for both Consumption and Dedicated plans. | Public Preview <br/> [Learn how to create a private endpoint for Azure Container Apps](https://learn.microsoft.com/azure/container-apps/how-to-use-private-endpoint) |
| Azure Kubernetes Service - Kubernetes API | All public regions <br/> All Government regions |  | GA   <br/> [Learn how to create a private endpoint for Azure Kubernetes Service.](https://learn.microsoft.com/azure/aks/private-clusters) |

### Databases

| Supported services | Available regions | Other considerations | Status |
| :--- | :--- | :--- | :--- |
| Azure SQL Database | All public regions <br/> All Government regions<br/>All China regions | Supported for Proxy [connection policy](https://learn.microsoft.com/azure/azure-sql/database/connectivity-architecture#connection-policy) | GA <br/> [Learn how to create a private endpoint for Azure SQL](tutorial-private-endpoint-sql-portal.md) |
| Azure Cosmos DB | All public regions<br/> All Government regions</br> All China regions |  | GA <br/> [Learn how to create a private endpoint for Azure Cosmos DB.](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/private-link/tutorial-private-endpoint-cosmosdb-portal.md) |
| Azure Database for PostgreSQL - Single server | All public regions <br/> All Government regions<br/>All China regions | Supported for General Purpose and Memory Optimized pricing tiers | GA <br/> [Learn how to create a private endpoint for Azure Database for PostgreSQL Single Server.](https://learn.microsoft.com/azure/postgresql/concepts-data-access-and-security-private-link) |
| Azure Database for PostgreSQL - Flexible server | All public regions <br/> All Government regions<br/>All China regions |  | GA <br/> [Learn how to create a private endpoint for Azure Database for PostgreSQL Flexible Server.](https://learn.microsoft.com/azure/postgresql/flexible-server/concepts-networking-private-link) |
| Azure Database for MySQL | All public regions<br/> All Government regions<br/>All China regions |  | GA <br/> [Learn how to create a private endpoint for Azure Database for MySQL.](https://learn.microsoft.com/azure/mysql/concepts-data-access-security-private-link) |
| Azure Database for MariaDB | All public regions<br/> All Government regions<br/>All China regions |  | GA <br/> [Learn how to create a private endpoint for Azure Database for MariaDB.](https://learn.microsoft.com/azure/mariadb/concepts-data-access-security-private-link) |
| Azure Cache for Redis | All public regions<br/> All Government regions<br/>All China regions |  | GA <br/> [Learn how to create a private endpoint for Azure Cache for Redis.](https://learn.microsoft.com/azure/azure-cache-for-redis/cache-private-link) |

> **Note:**
> Azure Cache for Redis is being retired in September 2028. New cache creation will be unavailable starting April 2026. We recommend migrating to [Azure Managed Redis](https://learn.microsoft.com/azure/azure-cache-for-redis/retirement-faq).

### Integration

| Supported services | Available regions | Other considerations | Status |
| :--- | :--- | :--- | :--- |
| Azure Event Grid | All public regions<br/> All Government regions |  | GA   <br/> [Learn how to create a private endpoint for Azure Event Grid.](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-grid/network-security.md) |
| Azure Service Bus | All public region<br/>All Government regions | Supported with premium tier of Azure Service Bus. [Select for tiers](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/service-bus-messaging/service-bus-premium-messaging.md) | GA   <br/> [Learn how to create a private endpoint for Azure Service Bus.](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/service-bus-messaging/private-link-service.md) |
| Azure API Management | All public regions |  | GA   <br/> [Connect privately to API Management using a private endpoint.](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-management/private-endpoint.md) |
| Azure Logic Apps | All public regions |  | GA   <br/> [Learn how to create a private endpoint for Azure Logic Apps.](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/logic-apps/secure-single-tenant-workflow-virtual-network-private-endpoint.md) |
| Azure Data Manager for Energy | See [Products available by region](https://azure.microsoft.com/explore/global-infrastructure/products-by-region/?products=energy-data-services&regions=all) |  | GA <br/> [Create a private endpoint for Azure Data Manager for Energy](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/energy-data-services/how-to-set-up-private-links.md) |

### Internet of Things (IoT)

| Supported services | Available regions | Other considerations | Status |
| :--- | :--- | :--- | :--- |
| Azure IoT Hub | All public regions |  | GA   <br/> [Learn how to create a private endpoint for Azure IoT Hub.](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-hub/virtual-network-support.md) |
| Azure IoT Device Provisioning Service | All public regions |  | GA   <br/> [Learn how to create a private endpoint for Azure IoT Device Provisioning Service.](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-dps/virtual-network-support.md) |
| Azure Digital Twins | All public regions supported by Azure Digital Twins |  | Preview <br/> [Learn how to create a private endpoint for Azure Digital Twins.](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-management/private-endpoint.md) |

### Management and Governance

| Supported services | Available regions | Other considerations | Status |
| --- | --- | --- | --- |
| Azure Automation | All public regions<br/> All Government regions |  | GA </br> [Learn how to create a private endpoint for Azure Automation.](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/automation/how-to/private-link-security.md) |
| Azure Backup | All public regions<br/> All Government regions |  | GA <br/> [Learn how to create a private endpoint for Azure Backup.](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/backup/private-endpoints.md) |
| Microsoft Purview | Southeast Asia, Australia East, Brazil South, North Europe, West Europe, Canada Central, East US, East US 2, EAST US 2 EUAP, South Central US, West Central US, West US 2, Central India, UK South | [Select for known limitations](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/purview/catalog-private-link-troubleshoot.md#known-limitations) | GA <br/> [Learn how to create a private endpoint for Microsoft Purview.](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/purview/catalog-private-link.md) |
| Azure Migrate | All public regions<br/> All Government regions |  | GA </br> [Discover and assess servers for migration using Private Link.](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/migrate/discover-and-assess-using-private-endpoints.md) |

### Security

| Supported services | Available regions | Other considerations | Status |
| :--- | :--- | :--- | :--- |
| Azure Key Vault | All public regions<br/> All Government regions |  | GA   <br/> [Learn how to create a private endpoint for Azure Key Vault.](https://learn.microsoft.com/azure/key-vault/general/private-link-service) |
| Azure App Configuration | All public regions<br/> All Government regions<br/>All China regions |  | GA  </br> [Learn how to create a private endpoint for Azure App Configuration](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-app-configuration/concept-private-endpoint.md) |
| Azure Application Gateway | All public regions |  | GA  </br> [Azure Application Gateway Private Link](../application-gateway/private-link.md) |


### Storage
| Supported services | Available regions | Other considerations | Status |
| :--- | :--- | :--- | :--- |
| Azure Blob storage (including Data Lake Storage Gen2) | All public regions<br/> All Government regions | Supported only on Account Kind General Purpose V2 | GA <br/> [Learn how to create a private endpoint for blob storage.](tutorial-private-endpoint-storage-portal.md) |
| Azure Files | All public regions<br/> All Government regions |  | GA <br/> [Learn how to create Azure Files network endpoints.](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/files/storage-files-networking-endpoints.md) |
| Azure File Sync | All public regions |  | GA <br/> [Learn how to create Azure Files network endpoints.](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/file-sync/file-sync-networking-endpoints.md) |
| Azure Queue storage | All public regions<br/> All Government regions | Supported only on Account Kind General Purpose V2 | GA <br/> [Learn how to create a private endpoint for queue storage.](tutorial-private-endpoint-storage-portal.md) |
| Azure Table storage | All public regions<br/> All Government regions | Supported only on Account Kind General Purpose V2 | GA <br/> [Learn how to create a private endpoint for table storage.](tutorial-private-endpoint-storage-portal.md) |

### Web
| Supported services | Available regions | Other considerations | Status |
| :--- | :--- | :--- | :--- |
| Azure SignalR | All Public Regions<br/> All China regions<br/> All Government Regions | Supported on Standard Tier or above | GA   <br/> [Learn how to create a private endpoint for Azure SignalR.](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-signalr/howto-private-endpoints.md) |
| Azure App Service | All public regions<br/> China North 2 & East 2 | Supported with Basic, Standard, Premium v2, Premium v3, Isolated v2 App Service Plans and Function Apps Premium plan | GA   <br/> [Learn how to create a private endpoint for Azure App Service.](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/app-service/networking/private-endpoint.md) |
| Azure Search | All public regions <br/> All Government regions | Supported with service in Private Mode | GA   <br/> [Learn how to create a private endpoint for Azure Search.](https://learn.microsoft.com/azure/search/service-create-private-endpoint) |
| Azure Relay | All public regions |  | GA   <br/> [Learn how to create a private endpoint for Azure Relay.](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-relay/private-link-service.md) |
| Azure Static Web Apps | All public regions |  | GA <br/> [Configure private endpoint in Azure Static Web Apps](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/static-web-apps/private-endpoint.md) |

### Private Link service

| Supported services | Available regions | Other considerations | Status |
| :--- | :--- | :--- | :--- |
| Private Link services behind standard Azure Load Balancer | All public regions<br/> All Government regions<br/>All China regions | Only supported on Standard Load Balancer with VM based backends | GA <br/> [Learn how to create a private link service.](create-private-link-service-portal.md) |
| Private Link Service Direct Connect | North Central US, East US 2, Central US, South Central US, West US, West US 2, West US 3, Asia Southeast, Australia East, Spain Central | [See known limitations and considerations](configure-private-link-service-direct-connect.md#limitations) | Public Preview <br/> [Learn how to create Private Link Service Direct Connect](configure-private-link-service-direct-connect.md) |

## Next steps

Learn more about Azure Private Link service:
- [What is Azure Private Link?](private-link-overview.md)
- [Create a Private Endpoint using the Azure portal](create-private-endpoint-portal.md)
