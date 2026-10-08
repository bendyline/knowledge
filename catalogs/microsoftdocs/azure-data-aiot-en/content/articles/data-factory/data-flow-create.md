---
title: Create a Mapping Data Flow
description: Learn how to create a mapping data flow in Azure Data Factory and Azure Synapse Analytics.
author: whhender
ms.author: whhender
ms.reviewer: makromer
ms.subservice: data-flows
ms.topic: quickstart
ms.date: 04/27/2026
ms.custom: sfi-image-nochange
---

# Quickstart: Create a mapping data flow in Azure Data Factory and Azure Synapse Analytics

**APPLIES TO:** Azure Data Factory Azure Synapse Analytics


Data flows are available in both Azure Data Factory pipelines and Azure Synapse Analytics pipelines. This article applies to mapping data flows. If you're new to transformations, refer to the introductory article [Transform data using mapping data flows](tutorial-data-flow.md).

> **Tip:**
>  To create a dataflow in Microsoft Fabric, see [Quickstart: Create your first Dataflow Gen2 to get and transform data](https://learn.microsoft.com/fabric/data-factory/create-first-dataflow-gen2).

A mapping data flow provides a way to transform data at scale without any coding required. You can design a data transformation job in the data flow designer by constructing a series of transformations. Start with any number of source transformations, followed by data transformation steps. Then, complete your data flow with a sink to land your results in a destination.

## Steps to create a new data flow

# [Azure Data Factory](#tab/data-factory)

1. [Create a new V2 data factory by using the Azure portal](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/data-factory/quickstart-create-data-factory-portal.md).

1. In the portal, go to your data factory. Select **Overview**, and then select the **Open Azure Data Factory Studio** tile.

   Screenshot that shows the tile for opening Azure Data Factory Studio in the Azure portal.

1. In Azure Data Factory Studio, you can add sample data flows from the template gallery. To browse the gallery, go to the **Author** tab. Select the plus sign, and then choose **Pipeline** > **Template gallery**.

   Screenshot that shows selections for opening the template gallery in Azure Data Factory Studio.

1. Filter by the **Data flow** category to choose from the available templates.

   Screenshot that shows the template gallery filtered for data flows.

You can also add data flows directly to your data factory without using a template. On the **Author** tab in Azure Data Factory Studio, select the plus sign, and then choose **Data flow** > **Data flow**.  

Screenshot that shows selections for creating an empty data flow directly.

# [Azure Synapse Analytics](#tab/synapse-analytics)

1. [Create a new Azure Synapse Analytics workspace by using the Azure portal](../synapse-analytics/quickstart-create-workspace.md).

1. In the portal, go to your workspace. Select **Overview**, and then select the **Open Synapse Studio** tile.

   Screenshot that shows the tile for opening Azure Synapse Analytics Studio in the Azure portal.

1. In Azure Synapse Analytics Studio, you can add sample data flows from the template gallery. To browse the gallery, go to the **Integrate** tab. Select the plus sign, and then choose **Browse gallery**.

   Screenshot that shows selections for opening the template gallery in Azure Synapse Analytics Studio.

1. Filter by the **Data flow** category to choose from the available templates.

   Screenshot that shows the template gallery filtered for data flows.

You can also add data flows directly to your workspace without using a template. On the **Integrate** tab in Azure Synapse Analytics Studio, select the plus sign, and then choose **Pipeline**.

Screenshot that shows selections for creating an empty pipeline directly.

Then, in your pipeline, expand the **Move & transform** > **Activities** section and drag **Data flow** onto the canvas for the pipeline.

Screenshot that shows selections for adding an empty data flow to a pipeline directly.

---

## Related content

* [Tutorial: Transform data using mapping data flows](tutorial-data-flow.md)
* [Source transformation in mapping data flows](data-flow-source.md)
