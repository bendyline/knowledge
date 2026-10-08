---
title: Cast transformation in mapping data flow 
description: Learn how to use a mapping data flow cast transformation to easily change column data types in Azure Data Factory or Synapse Analytics pipelines.
titleSuffix: Azure Data Factory & Azure Synapse
author: kromerm
ms.author: makromer
ms.reviewer: makromer
ms.subservice: data-flows
ms.topic: how-to
ms.custom: synapse
ms.date: 04/27/2026
---

# Cast transformation in mapping data flow 

**APPLIES TO:** Azure Data Factory Azure Synapse Analytics


Data flows are available in both Azure Data Factory pipelines and Azure Synapse Analytics pipelines. This article applies to mapping data flows. If you're new to transformations, refer to the introductory article [Transform data using mapping data flows](tutorial-data-flow.md).

> **Tip:**
>  For the equivalent transformation (**Data type**) in Dataflow Gen2, see [A guide to Dataflow Gen2 for mapping data flow users](https://learn.microsoft.com/fabric/data-factory/guide-to-dataflows-for-mapping-data-flow-users).

Use the cast transformation to easily modify the data types of individual columns in a data flow. The cast transformation also enables an easy way to check for casting errors.

## Configuration

Cast settings

To modify the data type for columns in your data flow, add columns to "Cast settings" using the plus (+) sign.

**Column name:** Pick the column you wish to cast from your list of metadata columns.

**Type:** Choose the data type to cast your column to. If you pick "complex", you can then select "Define complex type" and define structures, arrays, and maps inside the expression builder.

> **Note:**
> Support for complex data type casting from the Cast transformation is currently unavailable. Use a Derived Column transformation instead. In the Derived Column, type conversion errors always result in NULL and require explicitly error handling using an Assert. The Cast transformation can automatically trap conversion errors using the "Assert type check" property.

**Format:** Some data types, like decimal and dates, will allow for additional formatting options.

**Assert type check:** The cast transformation allows for type checking. If the casting fails, the row will be marked as an assertion error that you can trap later in the stream.

## Data flow script

### Syntax

```
<incomingStream>
    cast(output(
		AddressID as integer,
		AddressLine1 as string,
		AddressLine2 as string,
		City as string
	),
	errors: true) ~> <castTransformationName<>
```
## Related content

Modify existing columns and new columns using the [derived column transformation](data-flow-derived-column.md).
