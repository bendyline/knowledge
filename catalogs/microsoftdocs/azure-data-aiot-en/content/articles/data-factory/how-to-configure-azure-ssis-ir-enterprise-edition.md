---
title: Provision Enterprise Edition for the Azure-SSIS Integration Runtime
description: "This article describes the features of Enterprise Edition for the Azure-SSIS Integration Runtime and how to provision it"
ms.subservice: integration-services
ms.topic: how-to
ms.date: 05/15/2024
author: kromerm
ms.author: makromer
---
# Provision Enterprise Edition for the Azure-SSIS Integration Runtime

**APPLIES TO:** Azure Data Factory Azure Synapse Analytics



> **Tip:**
> [Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory) is the next generation of Azure Data Factory, with a simpler architecture, built-in AI, and new features. If you're new to data integration, start with Fabric Data Factory. Existing ADF workloads can upgrade to Fabric to access new capabilities across data science, real-time analytics, and reporting.
>
> - [Start a Fabric free trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
> - [Upgrade from Azure Data Factory to Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory/migrate-planning-azure-data-factory).


The Enterprise Edition of the Azure-SSIS Integration Runtime lets you use the following advanced and premium features:
-   Change Data Capture (CDC) components
-   Oracle, Teradata, and SAP BW connectors
-   SQL Server Analysis Services (SSAS) and Azure Analysis Services (AAS) connectors and transformations
-   Fuzzy Grouping and Fuzzy Lookup transformations
-   Term Extraction and Term Lookup transformations

Some of these features require you to install additional components to customize the Azure-SSIS IR. For more info about how to install additional components, see [Custom setup for the Azure-SSIS integration runtime](how-to-configure-azure-ssis-ir-custom-setup.md).

## Enterprise features

| **Enterprise Features** | **Descriptions** |
| --- | --- |
| CDC components | The CDC Source, Control Task, and Splitter Transformation are preinstalled on the Azure-SSIS IR Enterprise Edition. To connect to Oracle, you also need to install the CDC Designer and Service on another computer. |
| Oracle connectors | You need to install the Oracle Connection Manager, Source, and Destination, as well as the Oracle Call Interface (OCI) driver, on the Azure-SSIS IR Enterprise Edition. If necessary, you can also configure the Oracle Transport Network Substrate (TNS), on the Azure-SSIS IR. For more info, see [Custom setup for the Azure-SSIS integration runtime](how-to-configure-azure-ssis-ir-custom-setup.md). |
| Teradata connectors | You need to install the Teradata Connection Manager, Source, and Destination, as well as the Teradata Parallel Transporter (TPT) API and Teradata ODBC driver, on the Azure-SSIS IR Enterprise Edition. For more info, see [Custom setup for the Azure-SSIS integration runtime](how-to-configure-azure-ssis-ir-custom-setup.md). |
| SAP BW connectors | The SAP BW Connection Manager, Source, and Destination are preinstalled on the Azure-SSIS IR Enterprise Edition. You also need to install the SAP BW driver on the Azure-SSIS IR. These connectors support SAP BW 7.0 or earlier versions. To connect to later versions of SAP BW or other SAP products, you can purchase and install SAP connectors from third-party ISVs on the Azure-SSIS IR. For more info about how to install additional components, see [Custom setup for the Azure-SSIS integration runtime](how-to-configure-azure-ssis-ir-custom-setup.md). |
| Analysis Services components | The Data Mining Model Training Destination, the Dimension Processing Destination, and the Partition Processing Destination, as well as the Data Mining Query Transformation, are preinstalled on the Azure-SSIS IR Enterprise Edition. All these components support SQL Server Analysis Services (SSAS), but only the Partition Processing Destination supports Azure Analysis Services (AAS). To connect to SSAS, you also need to [configure Windows Authentication credentials in SSISDB](https://learn.microsoft.com/sql/integration-services/lift-shift/ssis-azure-connect-with-windows-auth). In addition to these components, the Analysis Services Execute DDL Task, the Analysis Services Processing Task, and the Data Mining Query Task are also preinstalled on the Azure-SSIS IR Standard/Enterprise Edition. |
| Fuzzy Grouping and Fuzzy Lookup transformations | The Fuzzy Grouping and Fuzzy Lookup transformations are preinstalled on the Azure-SSIS IR Enterprise Edition. These components support both SQL Server and Azure SQL Database for storing reference data. |
| Term Extraction and Term Lookup transformations | The Term Extraction and Term Lookup transformations are preinstalled on the Azure-SSIS IR Enterprise Edition. These components support both SQL Server and Azure SQL Database for storing reference data. |

## Instructions

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/updated-for-az.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/data-factory/how-to-configure-azure-ssis-ir-enterprise-edition.md)

1.  Download and install [Azure PowerShell](https://learn.microsoft.com/powershell/azure/install-azure-powershell).

2.  When you provision or reconfigure the Azure-SSIS IR with PowerShell, run `Set-AzDataFactoryV2IntegrationRuntime` with **Enterprise** as the value for the **Edition** parameter before you start the Azure-SSIS IR. Here is a sample script:

    ```powershell
    $MyAzureSsisIrEdition = "Enterprise"

    Set-AzDataFactoryV2IntegrationRuntime -DataFactoryName $MyDataFactoryName
                                               -Name $MyAzureSsisIrName
                                               -ResourceGroupName $MyResourceGroupName
                                               -Edition $MyAzureSsisIrEdition

    Start-AzDataFactoryV2IntegrationRuntime -DataFactoryName $MyDataFactoryName
                                                 -Name $MyAzureSsisIrName
                                                 -ResourceGroupName $MyResourceGroupName
    ```

## Related content

-   [Custom setup for the Azure-SSIS integration runtime](how-to-configure-azure-ssis-ir-custom-setup.md)

-   [How to develop paid or licensed custom components for the Azure-SSIS integration runtime](how-to-develop-azure-ssis-ir-licensed-components.md)
