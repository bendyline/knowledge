---
title: PII detection and masking
description: Learn how to use a solution template to detect and mask PII data using Azure Data Factory.
author: n0elleli
ms.author: noelleli
ms.topic: how-to
ms.date: 10/03/2024
ms.subservice: data-flows
ms.custom: sfi-image-nochange
---

# PII detection and masking

**APPLIES TO:** Azure Data Factory Azure Synapse Analytics



> **Tip:**
> [Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory) is the next generation of Azure Data Factory, with a simpler architecture, built-in AI, and new features. If you're new to data integration, start with Fabric Data Factory. Existing ADF workloads can upgrade to Fabric to access new capabilities across data science, real-time analytics, and reporting.
>
> - [Start a Fabric free trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
> - [Upgrade from Azure Data Factory to Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory/migrate-planning-azure-data-factory).


This article describes a solution template that you can use to detect and mask PII data in your data flow with Foundry Tools. 

## About this solution template

This template retrieves a dataset from Azure Data Lake Storage Gen2 source. Then, a request body is created with a derived column and an external call transformation calls Foundry Tools and masks PII before loading to the destination sink. 

The template contains one activity: 
-  **Data flow** to detect and mask PII data

This template defines 3 parameters: 
-  *sourceFileSystem* is the folder path where files are read from the source store. You need to replace the default value with your own folder path.
-  *sourceFilePath* is the subfolder path where files are read from the source store. You need to replace the default value with your own subfolder path.
-  *sourceFileName* is the name of the file that you would like to transform. You need to replace the default value with your own file name.

## Prerequisites

*  Azure AI services resource endpoint URL and Key (create a new resource [here](https://portal.azure.com/#create/Microsoft.CognitiveServicesTextAnalytics))

## How to use this solution template

1. Go to template **PII detection and masking** by scrolling through the template gallery or filter for the template. 

	Screenshot of template gallery with the PII detection template selected.

2. Use the drop down to create a **New** connection to your source storage store or choose an existing connection. The source storage store is where you want to read files from.

	Screenshot of template set up page where you can create a new connection or select an existing connection to the source from a drop down menu.
	
    Clicking **New** will require you to create a new linked service connection. 
	
	Screenshot of the template set up page with a fly-out open to create a new linked service connection to a data source.

3. Use the drop down to create a **New** connection to your Azure AI services resource or choose an existing connection. You will need an endpoint URL and resource key to create this connection. 

	Screenshot of the template set up page to create a new connection or select an existing connection to Foundry Tools from a drop down menu.
	
   Clicking **New** will require you to create a new linked service connection. Make sure to enter your resource's endpoint URL and the resource key under the Auth header **Ocp-Apim-Subscription-Key**. 
   
   Screenshot of the template set up page with a fly-out open to create a new linked service connection to Foundry Tools.
   

4. Select **Use this template** to create the pipeline. 

	Screenshot of button in bottom left corner to finish creating pipeline.

5. You should see the following pipeline: 

	Screenshot of pipeline view with one dataflow activity.

6. Clicking into the dataflow activity will show the following dataflow: 

	Screenshot of the dataflow view with a source leading to three transformations and then a sink.

7. Turn on **Data flow debug**. 

	Screenshot of the Data flow debug button found in the top banner of the screen.

8. Update **Parameters** in **Debug Settings** and **Save**. 

	Screenshot of the Debug settings button on the top banner of the screen to the right of debug button.
  
	Screenshot of where to update parameters in Debug settings in a panel on the right side of the screen.

9. Preview the results in **Data Preview**. 

	Screenshot of dataflow data preview at the bottom of the screen.
  
10. When data preview results are as expected, update the **Parameters**.

	Screenshot of dataflow parameters at the bottom of the screen under Parameters.

11. Return to pipeline and select **Debug**. Review results and publish. 

	Screenshot of the results that return after the pipeline is triggered.

## Related content

- [What's New in Azure Data Factory](whats-new.md)
- [Introduction to Azure Data Factory](introduction.md)
