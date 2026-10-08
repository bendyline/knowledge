---
title: Cached Lookup Functions in the Mapping Data Flow
titleSuffix: Azure Data Factory & Azure Synapse
description: Learn about cached lookup functions in mapping data flows.
author: kromerm
ms.author: makromer
ms.subservice: data-flows
ms.custom: synapse
ms.topic: concept-article
ms.date: 01/05/2024
---

# Cached lookup functions in mapping data flows

**APPLIES TO:** Azure Data Factory Azure Synapse Analytics



> **Tip:**
> [Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory) is the next generation of Azure Data Factory, with a simpler architecture, built-in AI, and new features. If you're new to data integration, start with Fabric Data Factory. Existing ADF workloads can upgrade to Fabric to access new capabilities across data science, real-time analytics, and reporting.
>
> - [Start a Fabric free trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
> - [Upgrade from Azure Data Factory to Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory/migrate-planning-azure-data-factory).


Data flows are available in both Azure Data Factory pipelines and Azure Synapse Analytics pipelines. This article applies to mapping data flows. If you're new to transformations, refer to the introductory article [Transform data using mapping data flows](tutorial-data-flow.md).

This article provides details about cached lookup functions supported by Azure Data Factory and Azure Synapse Analytics in mapping data flows.

## Cached lookup function list

The following functions are available only if you use a cached lookup when you include a cache sink.

| Cached lookup function | Task |
| --- | --- |
| [lookup](data-flow-expressions-usage.md#lookup) | Looks up the first row from the cache sink by using the specified keys that match the keys from the cached sink. |
| [mlookup](data-flow-expressions-usage.md#mlookup) | Looks up all the matching rows from the cache sink by using the specified keys that match the keys from the cached sink. |
| [output](data-flow-expressions-usage.md#output) | Returns the first row of the results of the cache sink. |
| [outputs](data-flow-expressions-usage.md#outputs) | Returns the entire output row set of the results of the cache sink. |
|  |  |

## Related content

- List of all [aggregate functions](data-flow-aggregate-functions.md).
- List of all [array functions](data-flow-array-functions.md).
- List of all [conversion functions](data-flow-conversion-functions.md).
- List of all [date and time functions](data-flow-date-time-functions.md).
- List of all [expression functions](data-flow-expression-functions.md).
- List of all [map functions](data-flow-map-functions.md).
- List of all [metafunctions](data-flow-metafunctions.md).
- List of all [window functions](data-flow-window-functions.md).
- Usage details of all [data transformation expressions](data-flow-expressions-usage.md).
- Learn how to use [Expression Builder](concepts-data-flow-expression-builder.md).
