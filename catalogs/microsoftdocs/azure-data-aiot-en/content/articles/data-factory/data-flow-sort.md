---
title: Sort transformation in mapping data flow
description: Learn about the Mapping Data Sort Transformation in Azure Data Factory and Synapse Analytics pipelines.
titleSuffix: Azure Data Factory & Azure Synapse
author: kromerm
ms.author: makromer
ms.reviewer: daperlov
ms.subservice: data-flows
ms.topic: reference
ms.custom: synapse
ms.date: 04/27/2026
---

# Sort transformation in mapping data flow

**APPLIES TO:** Azure Data Factory Azure Synapse Analytics


Data flows are available in both Azure Data Factory pipelines and Azure Synapse Analytics pipelines. This article applies to mapping data flows. If you're new to transformations, refer to the introductory article [Transform data using mapping data flows](tutorial-data-flow.md).

> **Tip:**
>  For the equivalent transformation (**Sort**) in Dataflow Gen2, see [A guide to Dataflow Gen2 for mapping data flow users](https://learn.microsoft.com/fabric/data-factory/guide-to-dataflows-for-mapping-data-flow-users).

The sort transformation allows you to sort the incoming rows on the current data stream. You can choose individual columns and sort them in ascending or descending order.

> **Note:**
> Mapping data flows are executed on spark clusters that distribute data across multiple nodes and partitions. If you choose to repartition your data in a subsequent transformation, you could lose your sorting due to reshuffling of data. The best way to maintain sort order in your data flow is to set single partition in the Optimize tab on the transformation and keep the Sort transformation as close to the Sink as possible.

## Configuration

Sort settings

**Case insensitive:** Whether or not you wish to ignore case when sorting string or text fields

**Sort Only Within Partitions:** As data flows are run on spark, each data stream is divided into partitions. This setting sorts data only within the incoming partitions rather than sorting the entire data stream. 

**Sort conditions:** Choose which columns you're sorting by and in which order the sort happens. The order determines sorting priority. Choose whether or not nulls appear at the beginning or end of the data stream.

### Computed columns

To modify or extract a column value before applying the sort, hover over the column and select "computed column". In the expression builder, create an expression for the sort operation instead of using a column value.

## Data flow script

### Syntax

```
<incomingStream>
    sort(
        desc(<sortColumn1>, { true | false }),
        asc(<sortColumn2>, { true | false }),
        ...
    ) ~> <sortTransformationName<>
```

### Example

Sort settings

The data flow script for the above sort configuration is in the code snippet below.

```
BasketballStats sort(desc(PTS, true),
    asc(Age, true)) ~> Sort1
```

## Related content

After sorting, you might want to use the [Aggregate Transformation](data-flow-aggregate.md)
