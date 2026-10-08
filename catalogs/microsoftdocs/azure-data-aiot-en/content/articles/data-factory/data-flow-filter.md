---
title: Filter transformation in mapping data flow 
titleSuffix: Azure Data Factory & Azure Synapse
description: Filter out rows using the filter transformation in a mapping data flow in Azure Data Factory or Synapse Analytics.
author: kromerm
ms.author: makromer
ms.reviewer: daperlov
ms.subservice: data-flows
ms.topic: concept-article
ms.custom: synapse
ms.date: 04/27/2026
---

# Filter transformation in mapping data flow

**APPLIES TO:** Azure Data Factory Azure Synapse Analytics


Data flows are available in both Azure Data Factory pipelines and Azure Synapse Analytics pipelines. This article applies to mapping data flows. If you're new to transformations, refer to the introductory article [Transform data using mapping data flows](tutorial-data-flow.md).

> **Tip:**
>  For the equivalent transformation (**Filter rows**) in Dataflow Gen2, see [A guide to Dataflow Gen2 for mapping data flow users](https://learn.microsoft.com/fabric/data-factory/guide-to-dataflows-for-mapping-data-flow-users).

The Filter transforms allows row filtering based upon a condition. The output stream includes all rows that match the filtering condition. The filter transformation is similar to a WHERE clause in SQL.

> [!VIDEO https://learn-video.azurefd.net/vod/player?id=735b7b28-3280-471d-bd81-c45700908a6e]

## Configuration

Use the data flow expression builder to enter an expression for the filter condition. To open the expression builder, select the blue box. The filter condition must be of type boolean. For more information on how to create an expression, see the [expression builder](concepts-data-flow-expression-builder.md) documentation.

Filter transformation

## Data flow script

### Syntax

```
<incomingStream>
    filter(
        <conditionalExpression>
    ) ~> <filterTransformationName>
```

### Example

The below example is a filter transformation named `FilterBefore1960` that takes in incoming stream `CleanData`. The filter condition is the expression `year <= 1960`.

In the UI, this transformation looks like the below image:

Filter transformation

The data flow script for this transformation is in the snippet below:

```
CleanData
    filter(
        year <= 1960
    ) ~> FilterBefore1960

```

## Related content

Filter out columns with the [select transformation](data-flow-select.md).
