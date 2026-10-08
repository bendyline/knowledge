---
title: Flowlet transformation in mapping data flow
titleSuffix: Azure Data Factory & Azure Synapse
description: Learn how to run a flowlet transformation inside of a mapping data flow in Azure Data Factory and Synapse Analytics pipelines.
author: kromerm
ms.author: makromer
ms.subservice: data-flows
ms.custom: synapse
ms.topic: how-to
ms.date: 04/27/2026
---

# Flowlet transformation in mapping data flow

**APPLIES TO:** Azure Data Factory Azure Synapse Analytics


Data flows are available in both Azure Data Factory pipelines and Azure Synapse Analytics pipelines. This article applies to mapping data flows. If you're new to transformations, refer to the introductory article [Transform data using mapping data flows](tutorial-data-flow.md).

> **Tip:**
>  For the equivalent transformation (**Custom functions**) in Dataflow Gen2, see [A guide to Dataflow Gen2 for mapping data flow users](https://learn.microsoft.com/fabric/data-factory/guide-to-dataflows-for-mapping-data-flow-users).

Use the flowlet transformation to run a previously created mapping data flow flowlet. For an overview of flowlets see [Flowlets in mapping data flow | Microsoft Docs](concepts-data-flow-flowlet.md)

> **Note:** 
> The flowlet transformation in Azure Data Factory and Synapse Analytics pipelines is currently in public preview

> [!VIDEO https://learn-video.azurefd.net/vod/player?id=18076f34-9a6b-41bb-a2a8-88b2f279307f]

## Configuration

The flowlet transformation contains the following configuration settings

Screenshot showing Flowlet settings configuration.

### Flowlet

Select the flowlet to run. Once the flowlet is selected you will be able to map input columns, if any, in the mapping tab.

### Mapping

Screenshot showing mapping columns to the flowlet input.

If the selected flowlet has input columns, you can map columns from the input stream to the expected input columns in the flowlet. This mapping of your mapping data flows columns to the flowlet is what enables the flowlets to serve as reusable snippets of mapping data flow logic across potentially many mapping data flows.

## Data flow script

### Syntax

```
<incomingStream>
<transformation> ~> <transformationName>
<outputStream>
```

### Example

```
source1 derive(Test = "test") ~> DerivedColumn1
DerivedColumn1 output() ~> output1 
```
