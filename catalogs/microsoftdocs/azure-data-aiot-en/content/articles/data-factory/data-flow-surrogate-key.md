---
title: Surrogate key transformation in mapping data flow 
titleSuffix: Azure Data Factory & Azure Synapse
description: Learn how to use the mapping data flow Surrogate Key Transformation to generate sequential key values in Azure Data Factory and Synapse Analytics.
author: kromerm
ms.author: makromer
ms.reviewer: daperlov
ms.subservice: data-flows
ms.topic: concept-article
ms.custom: synapse
ms.date: 04/27/2026
---

# Surrogate key transformation in mapping data flow 

**APPLIES TO:** Azure Data Factory Azure Synapse Analytics


Data flows are available in both Azure Data Factory pipelines and Azure Synapse Analytics pipelines. This article applies to mapping data flows. If you're new to transformations, refer to the introductory article [Transform data using mapping data flows](tutorial-data-flow.md).

> **Tip:**
>  For the equivalent transformation (**Index column**) in Dataflow Gen2, see [A guide to Dataflow Gen2 for mapping data flow users](https://learn.microsoft.com/fabric/data-factory/guide-to-dataflows-for-mapping-data-flow-users).

Use the surrogate key transformation to add an incrementing key value to each row of data. This is useful when designing dimension tables in a star schema analytical data model. In a star schema, each member in your dimension tables requires a unique key that is a non-business key.

## Configuration

Surrogate Key Transform

**Key column:** The name of the generated surrogate key column.

**Start value:** The lowest key value that is generated.

## Increment keys from existing sources

To start your sequence from a value that exists in a source, we recommend using a cache sink to save that value and use a derived column transformation to add the two values together. Use a cached lookup to get the output and append it to the generated key. For more information, learn about [cache sinks](data-flow-sink.md#cache-sink) and [cached lookups](concepts-data-flow-expression-builder.md#cached-lookup).

Surrogate Key lookup

### Increment from existing maximum value

To seed the key value with the previous max, there are two techniques that you can use based on where your source data is.

#### Database sources

Use a SQL query option to select MAX() from your source. For example, `Select MAX(<surrogateKeyName>) as maxval from <sourceTable>`.

Surrogate Key Query

#### File sources

If your previous max value is in a file, use the `max()` function in the aggregate transformation to get the previous max value:

Surrogate Key File

In both cases, you'll need to write to a cache sink and lookup the value. 


## Data flow script

### Syntax

```
<incomingStream> 
    keyGenerate(
        output(<surrogateColumnName> as long),
        startAt: <number>L
    ) ~> <surrogateKeyTransformationName>
```

### Example

Surrogate Key Transform

The data flow script for the above surrogate key configuration is in the code snippet below.

```
AggregateDayStats
    keyGenerate(
        output(key as long),
        startAt: 1L
    ) ~> SurrogateKey1
```

## Related content

These examples use the [Join](data-flow-join.md) and [Derived Column](data-flow-derived-column.md) transformations.
