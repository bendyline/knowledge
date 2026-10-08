---
title: Rank transformation in mapping data flow 
description: Learn how to use a mapping data flow rank transformation to generate a ranking column in Azure Data Factory or Synapse Analytics pipelines.
titleSuffix: Azure Data Factory & Azure Synapse
author: kromerm
ms.author: makromer
ms.reviewer: makromer
ms.subservice: data-flows
ms.topic: how-to
ms.custom: synapse
ms.date: 04/27/2026
---

# Rank transformation in mapping data flow 

**APPLIES TO:** Azure Data Factory Azure Synapse Analytics


Data flows are available in both Azure Data Factory pipelines and Azure Synapse Analytics pipelines. This article applies to mapping data flows. If you're new to transformations, refer to the introductory article [Transform data using mapping data flows](tutorial-data-flow.md).

> **Tip:**
>  For the equivalent transformation (**Rank column**) in Dataflow Gen2, see [A guide to Dataflow Gen2 for mapping data flow users](https://learn.microsoft.com/fabric/data-factory/guide-to-dataflows-for-mapping-data-flow-users).

Use the rank transformation to generate an ordered ranking based upon sort conditions specified by the user. 

> [!VIDEO https://learn-video.azurefd.net/vod/player?id=c6c8f590-1cba-4cf9-ada3-58e44516804a]

## Configuration

Rank settings

**Case insensitive:** If a sort column is of type string, case is factored into the ranking. 

**Dense:** If enabled, the rank column is dense ranked. Each rank count will be a consecutive number and rank values won't be skipped after a tie.

**Rank column:** The name of the rank column generated. This column is of type long.

**Sort conditions:** Choose which columns you're sorting by and in which order the sort happens. The order determines sorting priority.

The configuration takes incoming basketball data and creates a rank column called 'pointsRanking'. The row with the highest value of the column *PTS* has a *pointsRanking* value of 1.

## Data flow script

### Syntax

```
<incomingStream>
    rank(
        desc(<sortColumn1>),
        asc(<sortColumn2>),
        ...,
        caseInsensitive: { true | false }
        dense: { true | false }
        output(<rankColumn> as long)
    ) ~> <sortTransformationName<>
```

### Example

Rank settings

The data flow script for the rank configuration is in the following code snippet.

```
PruneColumns
    rank(
        desc(PTS, true),
        caseInsensitive: false,
        output(pointsRanking as long),
        dense: false
    ) ~> RankByPoints
```

## Related content

Filter rows based upon the rank values using the [filter transformation](data-flow-filter.md).
