---
title: Extract data from PDF
description: Learn how to use a solution template to extract data from a PDF source using Azure Data Factory.
author: n0elleli
ms.author: noelleli
ms.topic: how-to
ms.date: 10/03/2024
ms.subservice: data-flows
ms.custom: sfi-image-nochange
---

# Extract data from PDF

**APPLIES TO:** Azure Data Factory Azure Synapse Analytics



> **Tip:**
> [Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory) is the next generation of Azure Data Factory, with a simpler architecture, built-in AI, and new features. If you're new to data integration, start with Fabric Data Factory. Existing ADF workloads can upgrade to Fabric to access new capabilities across data science, real-time analytics, and reporting.
>
> - [Start a Fabric free trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
> - [Upgrade from Azure Data Factory to Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory/migrate-planning-azure-data-factory).


This article describes a solution template that you can use to extract data from a PDF source using Azure Data Factory and Azure Document Intelligence in Foundry Tools. 

## About this solution template

This template analyzes data from a PDF URL source using two Document Intelligence calls. Then, it transforms the output to readable tables in a dataflow and outputs the data to a storage sink. 

This template contains two activities:  
-	**Web Activity** to call Document Intelligence's prebuilt read model API
-	**Data flow** to transform extracted data from PDF

This template defines five parameters: 
-  *CognitiveServicesURL* is the Document Intelligence URL ("https://{endpoint}/formrecognizer/v2.1/layout/analyze"). Replace {endpoint} with the endpoint that you obtained with your Document Intelligence subscription. You need to replace the default value with your own URL.
-  *CognitiveServicesKey* is the Document Intelligence subscription key. You need to replace the default value with your own subscription key.
-  *PDF_SourceURL* is the URL of your PDF source. You need to replace the default value with your own URL.
-  *OutputContainer* is the name of the container path where you want your files to be in your destination store. You need to replace the default value with your own container.
-  *OutputFolder* is the name of the folder path where you want your files to be in your destination store. You need to replace the default value with your own folder path.

## Prerequisites

* Document Intelligence Resource Endpoint URL and Key (create a new resource [here](https://portal.azure.com/#create/Microsoft.CognitiveServicesFormRecognizer))

## How to use this solution template

1. Go to template **Extract data from PDF**. Create a **New** connection to your Document Intelligence resource or choose an existing connection.

	Screenshot of how to create a new connection or select an existing connection from a drop-down menu to a Document Intelligence connection in template set-up.
	
    In your connection to Document Intelligence, make sure to add a **Linked service Parameter**. You'll need to use this **url** parameter as your dynamic **Base URL**.
    You will also need to add a new **Auth header** under **Auth headers**. The name should be **Ocp-Apim-Subscription-Key** and the value should be the key value you find from your Azure Resource. 
   
   Screenshot of the linked service base URL that references the linked service parameter and Auth headers to add.

3. Create a **New** connection to your destination storage store or choose an existing connection. The chosen destination is where the extracted PDF data is stored. 

	Screenshot of how to create a new connection or select existing connection from a drop-down menu to your sink in template set-up.
   
4. Select **Use this template**. 

	Screenshot of how to complete the template by clicking use this template at the bottom of the screen.

5. You should see the following pipeline. 

	Screenshot of pipeline view with web activity linking to a dataflow activity.

6. Navigate to the **Data flow** activity and find **Settings**. Here you need to add dynamic content for your linked service **url** parameter. After clicking **Add dynamic content**, the Pipeline expression builder will open. Select **Cognitive Services - POST activity output**. Then, type or copy and paste ".output.ADFWebActivityResponseHeaders['Operation-Location']." You should see the following expression in your expression builder. 

	Screenshot of pipeline view of the dataflow activity settings.

	Screenshot of the Pipeline expression builder with the dataflow dynamic content displayed.

8. Click **OK** to return back to the pipeline. 
   
9. Next, select **Debug**.

	Screenshot of how to Debug pipeline using the debug button on the top banner of the screen.

10. Enter parameter values, review results, and publish. 

	Screenshot of where to enter pipeline debug parameters on a panel to the right.

	Screenshot of the results that return when the pipeline is triggered.

## Related content
- [What's New in Azure Data Factory](whats-new.md)
- [Introduction to Azure Data Factory](introduction.md)
