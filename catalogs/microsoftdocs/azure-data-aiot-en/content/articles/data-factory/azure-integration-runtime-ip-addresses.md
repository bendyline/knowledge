---
title: Azure Integration Runtime IP addresses
description: Learn which IP addresses you must allow inbound traffic from, in order to properly configure firewalls for securing network access to data stores.
ms.author: makromer
author: kromerm
ms.subservice: integration-runtime
ms.topic: reference
ms.date: 02/13/2025
---

# Azure Integration Runtime IP addresses

**APPLIES TO:** Azure Data Factory Azure Synapse Analytics



> **Tip:**
> [Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory) is the next generation of Azure Data Factory, with a simpler architecture, built-in AI, and new features. If you're new to data integration, start with Fabric Data Factory. Existing ADF workloads can upgrade to Fabric to access new capabilities across data science, real-time analytics, and reporting.
>
> - [Start a Fabric free trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
> - [Upgrade from Azure Data Factory to Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory/migrate-planning-azure-data-factory).


The IP addresses that Azure Integration Runtime uses depends on the region where your Azure integration runtime is located. *All* Azure integration runtimes that are in the same region use the same IP address ranges.

> **Important:**  
> The Azure integration runtime lets you used a managed virtual network. Some data flows require the use of fixed IP ranges. You can use these IP ranges for data movement, pipeline and external activity executions, as well as for filtering in data stores, network security groups (NSGs), and firewalls for inbound access from the Azure integration runtime.

## Azure Integration Runtime IP addresses: Specific regions

Allow traffic from the IP addresses listed for the Azure Integration runtime in the specific Azure region where your resources are located. You can get an IP range list of service tags from the [service tags IP range download link](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/service-tags-overview.md#discover-service-tags-by-using-downloadable-json-files). For example, if the Azure region is **AustraliaEast**, you can get an IP range list from **DataFactory.AustraliaEast**.

> **Note:**
> Azure Data Factory IP range is shared across Fabric Data Factory.

## Known issue with Azure Storage

* When connecting to Azure Storage account, IP network rules have no effect on requests originating from the Azure integration runtime in the same region as the storage account. For more details, please [refer this article](../storage/common/storage-network-security.md#grant-access-from-an-internet-ip-range). 

  Instead, we suggest using [trusted services while connecting to Azure Storage](https://techcommunity.microsoft.com/t5/azure-data-factory/data-factory-is-now-a-trusted-service-in-azure-storage-and-azure/ba-p/964993). 

## Related content

* [Security considerations for data movement in Azure Data Factory](data-movement-security-considerations.md)
