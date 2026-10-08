---
title: Data Transformation Functions in the Mapping Data Flow
titleSuffix: Azure Data Factory & Azure Synapse
description: Learn about data transformation functions in mapping data flows.
author: kromerm
ms.author: makromer
ms.subservice: data-flows
ms.custom: synapse
ms.topic: reference
ms.date: 05/15/2024
---

# Data transformation expressions in mapping data flows

**APPLIES TO:** Azure Data Factory Azure Synapse Analytics



> **Tip:**
> [Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory) is the next generation of Azure Data Factory, with a simpler architecture, built-in AI, and new features. If you're new to data integration, start with Fabric Data Factory. Existing ADF workloads can upgrade to Fabric to access new capabilities across data science, real-time analytics, and reporting.
>
> - [Start a Fabric free trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
> - [Upgrade from Azure Data Factory to Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory/migrate-planning-azure-data-factory).


Data flows are available in both Azure Data Factory pipelines and Azure Synapse Analytics pipelines. This article applies to mapping data flows. If you're new to transformations, refer to the introductory article [Transform data using mapping data flows](tutorial-data-flow.md).

By using data transformation expressions in Azure Data Factory and Azure Synapse Analytics, you can transform expressions in many ways. They're a powerful tool that you can use to customize the behavior of your pipelines in almost every setting and property. You can use them anywhere you find a text field that shows the **Add dynamic content** or **Open expression builder** links within your pipeline.

## Transformation expression function list

The following articles provide details about expressions and functions supported by Azure Data Factory and Azure Synapse Analytics in mapping data flows:

- [Aggregate functions](data-flow-aggregate-functions.md)
- [Array functions](data-flow-array-functions.md)
- [Cached lookup functions](data-flow-cached-lookup-functions.md)
- [Conversion functions](data-flow-conversion-functions.md)
- [Date and time functions](data-flow-date-time-functions.md)
- [Expression functions](data-flow-expression-functions.md)
- [Map functions](data-flow-map-functions.md)
- [Metafunctions](data-flow-metafunctions.md)
- [Window functions](data-flow-window-functions.md)

For details about the use of each function in a comprehensive alphabetical list, refer to [Usage details of all data transformation expressions](data-flow-expressions-usage.md).

## Related content

- [Learn how to use Expression Builder](concepts-data-flow-expression-builder.md)
