---
title: Feature Availability by Region
description: Learn about feature availability by region for Azure SQL Database.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: peskount, rokhot, shrtiwar, pookam
ms.date: 10/01/2026
ms.service: azure-sql-database
ms.topic: concept-article
ms.custom:
  - references_regions
---
# Feature availability by region - Azure SQL Database



  **Applies to:**    [Azure SQL Database](https://learn.microsoft.com/sql/sql-server/sql-docs-navigation-guide#applies-to)

> 
> * [Azure SQL Database](region-availability.md?view=azuresql-db&preserve-view=true)
> * [Azure SQL Managed Instance](../managed-instance/region-availability.md?view=azuresql-mi&preserve-view=true)

This article is a centralized list of the availability of various Azure SQL Database features in [Azure regions](https://azure.microsoft.com/explore/global-infrastructure/geographies/). 

- To view regional availability of Azure SQL Database, see [Azure global infrastructure products by region](https://azure.microsoft.com/explore/global-infrastructure/products-by-region/table). 
- To learn how to design globally available services, see [Designing globally available services using Azure SQL Database](designing-cloud-solutions-for-disaster-recovery.md?view=azuresql-db&preserve-view=true).
- To move Azure SQL Database to another region, see [Move resources to new region - Azure SQL Database](move-resources-across-regions.md?view=azuresql-db&preserve-view=true).

> **Tip:**
> For a visualization of Azure regions, see [Azure global infrastructure](https://datacenters.microsoft.com/globe/explore).

<!-- Alphabetization guidance for region names: sort by the region, then the directional. East Asia comes before Australia East. This results in regions kept together, for example, all the US regions. -->

## vCore purchasing model hardware availability

Azure SQL Database hardware is available in all regions, except where indicated. For more information, see [vCore purchasing model - Azure SQL Database](service-tiers-sql-database-vcore.md).

<a id="gen4gen5-1"></a>

<a id="gen5"></a>

### Standard-series (Gen5) availability

Standard-series (Gen5) hardware is available in [all public regions worldwide where Azure SQL Database is available](https://azure.microsoft.com/explore/global-infrastructure/products-by-region/table).

<a id="hyperscale-premium-series-availability"></a>

### Hyperscale premium-series availability

[Azure SQL Database Hyperscale](service-tier-hyperscale.md) [Premium-series hardware](service-tiers-sql-database-vcore.md#hyperscale-premium-series) is available for single databases and elastic pools.

[Premium-series memory optimized hardware](service-tiers-sql-database-vcore.md#hyperscale-premium-series) is not currently available in the following regions:

- Brazil South
- Sweden Central
- UK West

**Hyperscale premium-series** and **premium-series memory optimized hardware** is available for single databases and elastic pools in the following regions:

#### [Americas](#tab/americas)

| Azure region | Premium-series available | Premium-series memory optimized available | [Availability zone support](high-availability-sla-local-zone-redundancy.md#high-availability-through-zone-redundancy) | 
|:--|:--|:--|
| Brazil South | Yes  |  | Yes  |
| Canada Central | Yes  | Yes  | Yes  |
| Canada East | Yes  | Yes  |  |
| US Central | Yes  | Yes  | Yes  |
| US East | Yes  | Yes  | Yes  |
| US East 2 | Yes  | Yes  | Yes  |
| US North Central | Yes  | Yes  |  |
| US South Central | Yes  | Yes  |  |
| US West Central | Yes  | Yes  |  |
| US West 1 | Yes  | Yes  |  |
| US West 2 | Yes  | Yes  | Yes  |
| US West 3 | Yes  | Yes  | Yes  |

#### [Asia Pacific](#tab/asia)

| Azure region | Premium-series available | Premium-series memory optimized available | [Availability zone support](high-availability-sla-local-zone-redundancy.md#high-availability-through-zone-redundancy) | 
|:--|:--|:--|
| East Asia | Yes  | Yes  |  |
| Southeast Asia | Yes  | Yes  | Yes  |
| Australia East | Yes  | Yes  | Yes  |
| Australia Southeast | Yes  | Yes  |  |
| Central India | Yes  | Yes  |  |
| South India | Yes  | Yes  |  |
| Japan East | Yes  | Yes  | Yes  |
| Japan West | Yes  | Yes  |  |

#### [Europe, the Middle East, and Africa](#tab/emea)

| Azure region | Premium-series available | Premium-series memory optimized available | [Availability zone support](high-availability-sla-local-zone-redundancy.md#high-availability-through-zone-redundancy) | 
|:--|:--|:--|
| Europe North | Yes  | Yes  | Yes  |
| Europe West | Yes  | Yes  | Yes  |
| France Central | Yes  | Yes  |  |
| Germany West Central | Yes  | Yes  | Yes  |
| Sweden Central | Yes  |  | Yes  |
| Switzerland North | Yes  | Yes  | |
| UK South | Yes  | Yes  | Yes  |

---

US Gov Arizona supports **Hyperscale premium-series** up to 80 vCores.

US Gov Texas and US Gov Virginia support **Hyperscale premium-series** up to 128 vCores.

### Azure SQL Database Hyperscale premium-series 160 and 192 vCore hard availability

The following regions offer 160 vCore and 192 vCore hardware for **Hyperscale premium-series** single databases and elastic pools:

#### [Americas](#tab/americas)

- Canada Central
- Central US
- East US
- East US 2
- South Central US
- South US
- West US 2
- West US 3

#### [Asia Pacific](#tab/asia)

- Australia East
- Southeast Asia
- India South Central

#### [Europe, the Middle East, and Africa](#tab/emea)

- North Europe
- West Europe
- Germany West Central
- Sweden Central
- UK South

---

### DC-series availability

> **Important:**
> Always Encrypted with Intel Software Guard Extensions (Intel SGX) enclaves reaches the end of support on October 31, 2027. Migrate affected databases before this date. After October 31, 2027, Azure automatically moves any database that remains on the DC-series compute tier to a supported standard-series (non-DC) compute tier and enables virtualization-based security (VBS) enclaves. For migration options, see [Always Encrypted with Intel SGX enclaves migration guide](https://learn.microsoft.com/sql/relational-databases/security/encryption/always-encrypted-enclaves-migration).

If you need DC-series in a currently unsupported region, [submit a support request](https://portal.azure.com/#blade/Microsoft_Azure_Support/HelpAndSupportBlade/newsupportrequest). 

DC-series is available in the following regions:

#### [Americas](#tab/americas)

- Canada Central
- US East
- US West

#### [Asia Pacific](#tab/asia)

- Southeast Asia

#### [Europe, the Middle East, and Africa](#tab/emea)

- Europe North
- Europe West
- UK South

---

## Maintenance window availability

Choosing a [maintenance window in Azure SQL Database](maintenance-window.md) other than the default is currently available in certain regions, depending on the option to enable zone-redundancy.

Availability depends on whether your database is configured to be zone redundant. Zone-redundant availability ensures your data is distributed across multiple Azure availability zones in the primary region. Data spans two or three zones, selected by Azure SQL for optimal resilience. The zones are in separate physical locations with independent power, cooling, and networking. For up to date information about the regions that support zone-redundant databases, see [Services support by region](https://learn.microsoft.com/azure/reliability/availability-zones-region-support).

### Maintenance window availability for databases that are not zone redundant

The following table is for databases that are not [zone-redundant](high-availability-sla-local-zone-redundancy.md#zone-redundant-availability). For databases in an [Azure Availability Zone](high-availability-sla-local-zone-redundancy.md#zone-redundant-availability), see [the table for zone-redundant databases.](#ZR-maintenance-window-availability) 

#### [Americas](#tab/americas)

| Azure Region | Hyperscale premium-series and premium-series memory optimized | Hyperscale standard-series | All other Azure SQL Database purchasing models and tiers |
| :--- | :--- | :--- | :--- |
| Brazil South | Yes | Yes | Yes |
| Brazil Southeast |  | Yes | Yes |
| Canada Central | Yes | Yes | Yes |
| Canada East |  | Yes | Yes |
| Central US | Yes | Yes | Yes |
| East US 1 | Yes | Yes | Yes |
| East US 2 | Yes | Yes | Yes |
| North Central US |  | Yes | Yes |
| South Central US | Yes | Yes | Yes |
| West Central US |  | Yes | Yes |
| West US | Yes | Yes | Yes |
| West US 2 | Yes | Yes | Yes |
| West US 3 | Yes | Yes | Yes |
| US Gov Texas |  | Yes | Yes |
| US Gov Virginia |  | Yes | Yes |

#### [Asia Pacific](#tab/asia)

| Azure Region | Hyperscale premium-series and premium-series memory optimized | Hyperscale standard-series | All other Azure SQL Database purchasing models and tiers |
| :--- | :--- | :--- | :--- |
| East Asia | Yes | Yes | Yes |
| Southeast Asia | Yes | Yes | Yes |
| Australia East | Yes | Yes | Yes |
| Australia Southeast |  | Yes | Yes |
| China East 2 |  | Yes | Yes |
| China North 2 |  | Yes | Yes |
| Central India |  | Yes | Yes |
| South India |  | Yes | Yes |
| Japan East | Yes | Yes | Yes |
| Japan West |  | Yes | Yes |

#### [Europe, the Middle East, and Africa](#tab/emea)

| Azure Region | Hyperscale premium-series and premium-series memory optimized | Hyperscale standard-series | All other Azure SQL Database purchasing models and tiers |
| :--- | :--- | :--- | :--- |
| North Europe | Yes | Yes | Yes |
| West Europe | Yes | Yes | Yes |
| France Central |  | Yes | Yes |
| France South |  | Yes | Yes |
| Germany West Central | Yes | Yes | Yes |
| South Africa North |  | Yes | Yes |
| Sweden Central | Yes | Yes | Yes |
| Switzerland North |  | Yes | Yes |
| UAE North | Yes | Yes | Yes |
| UK South | Yes | Yes | Yes |
| UK West |  | Yes | Yes |

---

<a id="ZR-maintenance-window-availability"></a>

### Maintenance window availability for zone-redundant databases

The following table is for [zone-redundant](high-availability-sla-local-zone-redundancy.md#zone-redundant-availability) databases.

#### [Americas](#tab/americas)

| Azure Region | Hyperscale premium-series and premium-series memory optimized | Hyperscale standard-series | All other Azure SQL Database purchasing models and tiers in an [Azure Availability Zone](high-availability-sla-local-zone-redundancy.md#zone-redundant-availability) |
| :--- | :--- | :--- | :--- |
| Brazil South | Yes | Yes | Yes |
| Canada Central | Yes | Yes | Yes |
| Central US | Yes | Yes | Yes |
| East US 1 | Yes | Yes | Yes |
| East US 2 | Yes | Yes | Yes |
| South Central US |  | Yes | Yes |
| West US 2 |  | Yes | Yes |
| West US 3 | Yes | Yes | Yes |

#### [Asia Pacific](#tab/asia)

| Azure Region | Hyperscale premium-series and premium-series memory optimized | Hyperscale standard-series | All other Azure SQL Database purchasing models and tiers in an [Azure Availability Zone](high-availability-sla-local-zone-redundancy.md#zone-redundant-availability) |
| :--- | :--- | :--- | :--- |
| East Asia | Yes | Yes | Yes |
| Southeast Asia | Yes | Yes | Yes |
| Australia East | Yes | Yes | Yes |
| Central India | Yes | Yes | Yes |
| Japan East | Yes | Yes | Yes |

#### [Europe, the Middle East, and Africa](#tab/emea)

| Azure Region | Hyperscale premium-series and premium-series memory optimized | Hyperscale standard-series | All other Azure SQL Database purchasing models and tiers in an [Azure Availability Zone](high-availability-sla-local-zone-redundancy.md#zone-redundant-availability) |
| :--- | :--- | :--- | :--- |
| North Europe | Yes | Yes | Yes |
| West Europe | Yes | Yes | Yes |
| France Central |  | Yes | Yes |
| Germany West Central |  | Yes | Yes |
| Sweden Central | Yes | Yes | Yes |
| UAE North | Yes | Yes | Yes |
| UK South | Yes | Yes | Yes |

---

## Serverless region availability

Serverless is a [compute tier](service-tiers-sql-database-vcore.md#compute) for single databases in Azure SQL Database that automatically scales compute based on workload demand and bills for the amount of compute used per second. For more information, see [Serverless compute tier for Azure SQL Database](serverless-tier-overview.md).

Serverless for General Purpose and Hyperscale tiers is available worldwide, except the following regions: 

- China East
- China North
- Germany Central
- Germany Northeast

Currently, all regions with serverless support 40 vCores and provide [availability zones](high-availability-sla-local-zone-redundancy.md?view=azuresql-db&preserve-view=true). Some regions also support up to a maximum of 80 vCores for General Purpose and Hyperscale tiers and [availability zone support](high-availability-sla-local-zone-redundancy.md?view=azuresql-db&preserve-view=true) according to the following table:

#### [Americas](#tab/americas)

| Azure Region | Supports 80 vCore maximum | Availability zone support for 80 vCores|
|:---|:---|:---|:---|
| Brazil South | Yes  | Yes  |
| Brazil Southeast | Yes  |  |
| Canada Central | Yes  | Yes  |
| Canada East | Yes  |  |
| Mexico Central | Yes  |  |
| Central US | Yes  | Yes  |
| East US | Yes  | Yes  |
| East US 2 | Yes  | Yes  |
| North Central US | Yes  |  |
| South Central US | Yes  | Yes  |
| West Central US | Yes  |  |
| West US | Yes  |  |
| West US 2 | Yes  | Yes  |
| West US 3 | Yes  | Yes  |

#### [Asia Pacific](#tab/asia)

| Azure Region | Supports 80 vCore maximum | Availability zone support for 80 vCores |
|:---|:---|:---|:---|
| East Asia | Yes  | Yes  |
| Southeast Asia | Yes  | Yes  |
| Australia Central 1 | Yes  |  |
| Australia Central 2 | Yes  |  |
| Australia East | Yes  | Yes  |
| Australia Southeast | Yes  |  |
| China East 2 | Yes  |  |
| China East 3 | Yes  |  |
| China North 2 | Yes  |  |
| China North 3 | Yes  |  |
| Central India | Yes  | Yes  |
| Jio India Central | Yes  |  |
| Jio India West | Yes  |  |
| South India | Yes  |  |
| Japan East | Yes  | Yes  |
| Japan West | Yes  |  |
| Korea Central | Yes  | Yes  |
| Korea South | Yes  |  |
| Malaysia South | Yes  |  |
| Taiwan North | Yes  |  |
| Taiwan Northwest | Yes  |  |

#### [Europe, the Middle East, and Africa](#tab/emea)

| Azure Region | Supports 80 vCore maximum | Availability zone support for 80 vCores|
|:---|:---|:---|:---|
| North Europe | Yes  | Yes  |
| West Europe | Yes  | Yes  |
| France Central | Yes  | Yes  |
| France South | Yes  |  |
| Germany North | Yes  |  |
| Germany West Central | Yes  | Yes  |
| Israel Central | Yes  |  |
| Italy North | Yes  |  |
| Norway East | Yes  |  |
| Norway West | Yes  |  |
| Poland Central | Yes  |  |
| Qatar Central | Yes  |  |
| South Africa North | Yes  | Yes  |
| South Africa West | Yes  |  |
| Spain Central | Yes  |  |
| Sweden Central | Yes  | Yes  |
| Sweden South | Yes  |  |
| Switzerland North | Yes  |  |
| Switzerland West | Yes  |  |
| UAE Central | Yes  |  |
| UAE North | Yes  | Yes  |
| UK South | Yes  | Yes  |
| UK West | Yes  |  |

---

## Database watcher availability

[Database watcher](../database-watcher-overview.md) is a managed monitoring solution for Azure SQL Database and Azure SQL Managed Instance. It is available in the following regions:

#### [Americas](#tab/americas)

- Canada Central
- Canada East
- Central US
- East US
- East US 2
- North Central US
- West US

#### [Asia Pacific](#tab/asia)

- Australia Central
- Australia East
- Australia Southeast
- Japan West
- Korea Central
- Southeast Asia


#### [Europe, the Middle East, and Africa](#tab/emea)

- Germany West Central
- North Europe
- West Europe
- Sweden Central
- UK South

---

## Related content

- [What's new in Azure SQL Database?](doc-changes-updates-release-notes-whats-new.md?view=azuresql-db&preserve-view=true)
- [Azure products by region](https://azure.microsoft.com/explore/global-infrastructure/products-by-region/)
- [Designing globally available services using Azure SQL Database](designing-cloud-solutions-for-disaster-recovery.md?view=azuresql-db&preserve-view=true)
- [Move resources to new region - Azure SQL Database](move-resources-across-regions.md?view=azuresql-db&preserve-view=true)
- [Disaster recovery guidance - Azure SQL Database](disaster-recovery-guidance.md)
- [Modifiable configuration reference for Azure SQL Database](modifiable-configuration-reference.md)
