---
title: Guidance on using the Bring Your Own Driver (BYOD) approach
description: This article provides step-by-step guidance for Bring Your Own Driver (BYOD) approach.
author: KrishnakumarRukmangathan
ms.author: krirukm
ms.service: azure-data-factory
ms.subservice: data-movement
ms.topic: concept-article
ms.custom: references_regions
ms.date: 11/19/2025
---

# Guidance on using the Bring Your Own Driver (BYOD) approach

**APPLIES TO:** Azure Data Factory Azure Synapse Analytics



> **Tip:**
> [Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory) is the next generation of Azure Data Factory, with a simpler architecture, built-in AI, and new features. If you're new to data integration, start with Fabric Data Factory. Existing ADF workloads can upgrade to Fabric to access new capabilities across data science, real-time analytics, and reporting.
>
> - [Start a Fabric free trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
> - [Upgrade from Azure Data Factory to Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory/migrate-planning-azure-data-factory).


This article provides step-by-step guidance for using connectors with Bring Your Own Driver (BYOD) approach and upgrading from outdated V1 connectors to the latest V2 connectors in scenarios where the BYOD approach is required.

## Guidance on using connectors with BYOD approach 

### Steps

1. **Review Connector Requirements**  
    Visit the Data Factory documentation for the specific connector. Under the **Pre-requisites** section, verify: 
    
    - The supported version of the **client driver**. 
    - The minimum required **SHIR version** for compatibility. 

1. **Install and Configure Self-Hosted Integration Runtime (SHIR)**

    - Set up SHIR on a physical machine or virtual machine within your network. 
    - Follow the official [Microsoft SHIR installation guide](create-self-hosted-integration-runtime.md) to complete setup. 
    
1. **Download the Required Driver Package**

    Navigate to the connector's documentation or driver source to download the appropriate version of the client driver supported for the connector. 

1. **Install the Driver**

    Install the downloaded driver package on the machine where SHIR is running. 

### Related connectors

- [Informix](connector-informix.md)
- [Microsoft Access](connector-microsoft-access.md)
- [SAP Business Warehouse](connector-sap-business-warehouse.md)
- [SAP HANA](connector-sap-hana.md)
- [SAP Table](connector-sap-table.md)

## Guidance on upgrading connectors with BYOD approach required

### Steps

1. **Review Connector Requirements**  
    Visit the Data Factory documentation for the specific V2 connector. Under the **Pre-requisites** section, verify: 
    
    - The supported version of the **client driver**. 
    - The minimum required **SHIR version** for compatibility. 

1. **Install and Configure Self-Hosted Integration Runtime (SHIR)**

    - Set up SHIR on a physical machine or virtual machine within your network. 
    - Follow the official [Microsoft SHIR installation guide](create-self-hosted-integration-runtime.md) to complete setup. 
    
1. **Download the Required Driver Package**

    Navigate to the connector's documentation or driver source to download the appropriate version of the client driver supported for V2 connector. 

1. **Install the Driver**

    Install the downloaded driver package on the machine where SHIR is running. 

1. **Update Linked Services in Data Factory**

    - Identify existing linked services that currently use the V1 connector (typically via Azure IR or SHIR). 
    - Modify them to: 
      - Use the new SHIR instance. 
      - Set the connector version to **2.0** from 1.0. 

        Screenshot of the linked services page.

1. **Test the Connection**

    Validate connectivity to the data source using the updated linked service with version 2.0 connector. 

1. **Validate Pipeline Functionality**

    Run test executions of your pipelines to confirm they function correctly with the new V2 connector and SHIR setup.

### Related connectors

- [Netezza (version 2.0)](connector-netezza.md)
- [Vertica (version 2.0)](connector-vertica.md)

## Related content

- [Connector lifecycle overview](connector-lifecycle-overview.md)
- [Connector upgrade guidance](connector-upgrade-guidance.md) 
- [Connector upgrade advisor](connector-upgrade-advisor.md)
- [Connector release stages and timelines](connector-release-stages-and-timelines.md)  
- [Connector upgrade FAQ](connector-deprecation-frequently-asked-questions.md)
