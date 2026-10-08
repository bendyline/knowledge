---
title: Map Functions in the Mapping Data Flow
titleSuffix: Azure Data Factory & Azure Synapse
description: Learn about map functions in mapping data flows.
author: kromerm
ms.author: makromer
ms.subservice: data-flows
ms.custom: synapse
ms.topic: concept-article
ms.date: 05/15/2024
---

# Map functions in mapping data flows

**APPLIES TO:** Azure Data Factory Azure Synapse Analytics



> **Tip:**
> [Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory) is the next generation of Azure Data Factory, with a simpler architecture, built-in AI, and new features. If you're new to data integration, start with Fabric Data Factory. Existing ADF workloads can upgrade to Fabric to access new capabilities across data science, real-time analytics, and reporting.
>
> - [Start a Fabric free trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
> - [Upgrade from Azure Data Factory to Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory/migrate-planning-azure-data-factory).


Data flows are available in both Azure Data Factory pipelines and Azure Synapse Analytics pipelines. This article applies to mapping data flows. If you're new to transformations, refer to the introductory article [Transform data using mapping data flows](tutorial-data-flow.md).

This article provides details about map functions supported by Azure Data Factory and Azure Synapse Analytics in mapping data flows.

## Map function list

  Map functions perform operations on map data types.

| Map function | Task |
| --- | --- |
| [associate](data-flow-expressions-usage.md#associate) | Creates a map of key/values. All the keys and values should be of the same type. If no items are specified, it defaults to a map of string to string type. Same as a ```[ -> ]``` creation operator. Keys and values should alternate with each other. |
| [keyValues](data-flow-expressions-usage.md#keyValues) | Creates a map of key/values. The first parameter is an array of keys. The second parameter is the array of values. Both arrays should have equal length. |
| [mapAssociation](data-flow-expressions-usage.md#mapAssociation) | Transforms a map by associating the keys to new values. Returns an array. It takes a mapping function where you can address the item as `#key` and the current value as `#value`. |
| [reassociate](data-flow-expressions-usage.md#reassociate) | Transforms a map by associating the keys to new values. It takes a mapping function where you can address the item as `#key` and the current value as `#value`. |
|  |  |

## Related content

- List of all [aggregate functions](data-flow-aggregate-functions.md).
- List of all [array functions](data-flow-array-functions.md).
- List of all [cached lookup functions](data-flow-cached-lookup-functions.md).
- List of all [conversion functions](data-flow-conversion-functions.md).
- List of all [date and time functions](data-flow-date-time-functions.md).
- List of all [expression functions](data-flow-expression-functions.md).
- List of all [metafunctions](data-flow-metafunctions.md).
- List of all [window functions](data-flow-window-functions.md).
- Usage details of all [data transformation expressions](data-flow-expressions-usage.md).
- Learn how to use [Expression Builder](concepts-data-flow-expression-builder.md).
