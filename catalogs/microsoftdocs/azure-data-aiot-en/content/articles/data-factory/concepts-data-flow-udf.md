---
title: User defined functions in mapping data flows
titleSuffix: Azure Data Factory & Azure Synapse
description: Learn the concepts of user defined functions in mapping data flow
author: kromerm
ms.author: makromer
ms.subservice: data-flows
ms.custom: synapse
ms.topic: feature-guide
ms.date: 01/05/2024
---

# User defined functions in mapping data flow 

**APPLIES TO:** Azure Data Factory Azure Synapse Analytics



> **Tip:**
> [Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory) is the next generation of Azure Data Factory, with a simpler architecture, built-in AI, and new features. If you're new to data integration, start with Fabric Data Factory. Existing ADF workloads can upgrade to Fabric to access new capabilities across data science, real-time analytics, and reporting.
>
> - [Start a Fabric free trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
> - [Upgrade from Azure Data Factory to Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory/migrate-planning-azure-data-factory).


Data flows are available in both Azure Data Factory pipelines and Azure Synapse Analytics pipelines. This article applies to mapping data flows. If you're new to transformations, refer to the introductory article [Transform data using mapping data flows](tutorial-data-flow.md).

A user defined function is a customized expression you can define to be able to reuse logic across multiple mapping data flows. User defined functions live in a collection called a data flow library to be able to easily group up common sets of customized functions.

Whenever you find yourself building the same logic in an expression across multiple mapping data flows this would be a good opportunity to turn that into a user defined function.

> [!VIDEO https://learn-video.azurefd.net/vod/player?id=6ee2ba96-a6ca-4a57-8545-d03032aa68a2]
> 

## Getting started

To get started with user defined functions, you must first create a data flow library. Navigate to the management page and then find data flow libraries under the author section.

Screenshot showing the A D F management pane and data flow libraries.



## Data flow library

From here, you can click on +New button to create a new data flow library. Fill out the name and description and then you are ready to create your user defined function.
Screenshot showing the data flow libraries creation pane.

## New user defined function

To create a user defined function, from the data flow library you want to create the function in, click the +New button.
Screenshot showing the U D F new function button.

Fill in the name of your user defined function.
> **Note:**
> You cannot use the name of an existing mapping data flow expression. For a list of the current mapping data flow expressions,  see [Data transformation expressions in mapping data flow | Microsoft Docs](data-transformation-functions.md)

Screenshot showing the U D F new function creation pane.

User defined functions can have zero or more arguments. Arguments allow you to pass in values when your function is called and refer to those arguments in your expression logic. Arguments are automatically named from i1, i2, etc. and you can choose the data type of the argument from the dropdown.

The body of the user defined function is where you specify the logic of your function. The editor provides the full [expression builder | Microsoft Docs](concepts-data-flow-expression-builder.md) experience and allows you to reference your arguments created and any [data transformation expressions in mapping data flow | Microsoft Docs](data-transformation-functions.md).

> **Note:**
> A user defined function cannot refer to another user defined function.

## Using a user defined function in the expression builder

User defined functions will appear in the mapping data flow expression builder under Data flow library functions. From here, you can use your custom created functions and pass in appropriate arguments (if any) that you've defined.

Screenshot showing the data flow library in the mapping data flow expression builder.
