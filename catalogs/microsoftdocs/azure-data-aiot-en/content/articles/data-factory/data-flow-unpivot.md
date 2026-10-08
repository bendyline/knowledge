---
title: Unpivot transformation in mapping data flow
titleSuffix: Azure Data Factory & Azure Synapse
description: Learn about the mapping data flow Unpivot Transformation in Azure Data Factory and Synapse Analytics.
author: kromerm
ms.author: makromer
ms.subservice: data-flows
ms.topic: concept-article
ms.custom: synapse
ms.date: 04/27/2026
---

# Unpivot transformation in mapping data flow

**APPLIES TO:** Azure Data Factory Azure Synapse Analytics


Data flows are available in both Azure Data Factory pipelines and Azure Synapse Analytics pipelines. This article applies to mapping data flows. If you're new to transformations, refer to the introductory article [Transform data using mapping data flows](tutorial-data-flow.md).

> **Tip:**
>  For the equivalent transformation (**Unpivot columns**) in Dataflow Gen2, see [A guide to Dataflow Gen2 for mapping data flow users](https://learn.microsoft.com/fabric/data-factory/guide-to-dataflows-for-mapping-data-flow-users).

Use Unpivot in a mapping data flow as a way to turn an unnormalized dataset into a more normalized version by expanding values from multiple columns in a single record into multiple records with the same values in a single column.

Screenshot shows Unpivot selected from the menu.

> [!VIDEO https://learn-video.azurefd.net/vod/player?id=8746f3b9-b71e-4cd3-8def-550d8d6a44e2]

## Ungroup By

Screenshot shows the Unpivot Settings with the Ungroup by tab selected.

First, set the columns that you wish to ungroup by for your unpivot aggregation. Set one or more columns for ungrouping with the + sign next to the column list.

## Unpivot Key

Screenshot shows the Unpivot Settings with the Unpivot key tab selected.

The Unpivot Key is the column that the service will pivot from column to row. By default, each unique value in the dataset for this field will pivot to a row. However, you can optionally enter the values from the dataset that you wish to pivot to row values.

## Unpivoted Columns

Screenshot shows the Unpivot Settings with the Data Preview tab selected.

Lastly, choose the column name for storing the values for unpivoted columns that are transformed into rows.

(Optional) You can drop rows with Null values.

For instance, SumCost is the column name that is chosen in the example shared above.

Image showing the PO, Vendor, and Fruit columns before and after a unipivot transformation using the Fruit column as the unipivot key.

Setting the Column Arrangement to "Normal" will group together all of the new unpivoted columns from a single value. Setting the columns arrangement to "Lateral" will group together new unpivoted columns generated from an existing column.

Screenshot shows the result of the transformation.

The final unpivoted data result set shows the column totals now unpivoted into separate row values.

## Related content

Use the [Pivot transformation](data-flow-pivot.md) to pivot rows to columns.
