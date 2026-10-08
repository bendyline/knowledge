---
title: Connector upgrade advisor in Azure Data Factory and Azure Synapse Analytics 
description: This article describes Connector upgrade advisor in Azure Data Factory and Azure Synapse Analytics.
author: KrishnakumarRukmangathan
ms.author: krirukm
ms.service: azure-data-factory
ms.subservice: data-movement
ms.topic: concept-article
ms.custom:
  - references_regions
  - build-2025
ms.date: 10/28/2025
---

# Connector upgrade advisor in Azure Data Factory and Azure Synapse Analytics

**APPLIES TO:** Azure Data Factory Azure Synapse Analytics



> **Tip:**
> [Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory) is the next generation of Azure Data Factory, with a simpler architecture, built-in AI, and new features. If you're new to data integration, start with Fabric Data Factory. Existing ADF workloads can upgrade to Fabric to access new capabilities across data science, real-time analytics, and reporting.
>
> - [Start a Fabric free trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
> - [Upgrade from Azure Data Factory to Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory/migrate-planning-azure-data-factory).


This article describes Connector upgrade advisor in Azure Data Factory and Azure Synapse Analytics.

To learn more, see [Upgrade plan for Azure Data Factory connectors](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/data-factory/connector-deprecation-plan.md).

## Overview

The Connector upgrade advisor is a comprehensive tool that helps upgrade pipelines that use outdated V1 linked services and datasets to their latest available versions. This advisor tool applies to V1 connectors with updated versions already available.

Screenshot of the connector upgrade advisor tool page.

## Supported data sources

- Amazon Redshift
- Amazon RDS for Oracle
- Cassandra
- Google BigQuery
- Greenplum
- Hive
- HubSpot
- Impala
- MariaDB
- MySQL
- Netezza
- Oracle
- PostgreSQL
- Presto
- QuickBooks Online
- Salesforce
- Salesforce Service Cloud
- ServiceNow
- Shopify
- Snowflake
- Spark
- Square
- Teradata
- Vertica

## How to use

Before using the Connector upgrade advisor, it is recommended to **save** or **discard all** pending changes.

1. To access the **Connector upgrade advisor**, navigate to the **Manage** pane in your data factory. Under the **General** section, locate and select **Connector upgrade advisor**.

    Screenshot of the connector upgrade advisor page.

2. Once you select the **Connector upgrade advisor**, it scans your data factory and identifies all existing pipelines using outdated connectors along with the number of dependencies on outdated versions. 

    Screenshot of the outdated-connectors page.

3. In the **Connector upgrade advisor** home page, choose the pipelines you want to upgrade and click **Upgrade**.

    Screenshot of upgrade.

4. If a selected pipeline references an outdated dataset shared with other unselected pipelines, a **Select upgrade methods** dialog appears listing all the pipelines sharing datasets.

    Screenshot of the select-upgrade-methods page.

    If you want to upgrade all pipelines using the same dataset simultaneously, choose **Include listed pipelines to upgrade together**. Otherwise, if you just want to upgrade the selected pipeline separately, select **Create new datasets for selected pipelines**. Click **OK** to confirm your selection.

    Screenshot of two options.

5. The next window **Map outdated linked services to new linked services** list all outdated linked services. Select an equivalent V2 linked service from the dropdown menu or create a new one that supports the V2 format by clicking **New**. Once configured, click **Next**.

    Screenshot of the linked services page.

6. The **Update pipeline queries** page (if applicable) appears only if your selected pipelines use **Salesforce**, **Salesforce Service Cloud**, or **ServiceNow** connectors in the **Copy** activity with a query.

    Due to query format differences between V1 and V2: 

    - Salesforce queries are pre-populated as V1 (SQL) and V2 (SOQL) share common syntax. 

    - ServiceNow queries require manual adjustments, as the structure has changed. 

    Once modifications are complete, click **Next**.

    Screenshot of the update pipeline queries page.

7. Review and finalize changes using the **Review** page. It provides a summary of all modifications made by the advisor tool. Click **Open and review** to exit the wizard and navigate to the authoring page.

    Screenshot of the review page.

    Review all modified connectors, then **Save all** or **Publish all** the changes as needed.

    Screenshot of the save or publish page.

This process ensures a smooth transition from outdated connectors to the latest supported versions.  

## Related content

- [Connector overview](connector-overview.md)  
- [Connector lifecycle overview ](connector-lifecycle-overview.md)
- [Connector upgrade guidance](connector-upgrade-guidance.md) 
- [Connector release stages and timelines](connector-release-stages-and-timelines.md)    
- [Connector upgrade FAQ](connector-deprecation-frequently-asked-questions.md)
