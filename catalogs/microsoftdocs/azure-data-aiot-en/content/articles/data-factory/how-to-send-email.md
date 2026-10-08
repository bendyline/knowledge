---
title: How to send email
titleSuffix: Azure Data Factory & Azure Synapse
description: Learn how to send an email with an Azure Data Factory or Azure Synapse pipeline.
author: ssabat
ms.author: susabat
ms.reviewer: whhender
ms.topic: tutorial
ms.date: 10/03/2024
ms.subservice: monitoring
---

# Send an email with an Azure Data Factory or Azure Synapse pipeline

**APPLIES TO:** Azure Data Factory Azure Synapse Analytics



> **Tip:**
> [Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory) is the next generation of Azure Data Factory, with a simpler architecture, built-in AI, and new features. If you're new to data integration, start with Fabric Data Factory. Existing ADF workloads can upgrade to Fabric to access new capabilities across data science, real-time analytics, and reporting.
>
> - [Start a Fabric free trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
> - [Upgrade from Azure Data Factory to Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory/migrate-planning-azure-data-factory).


It's often necessary to send notifications during or after execution of a pipeline. Notification provides proactive alerting and reduces the need for reactive monitoring to discover issues.  This article shows how to configure email notifications from an Azure Data Factory or Azure Synapse pipeline. 

## Prerequisites

- **Azure subscription**. If you don't have an Azure subscription, create a [free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) account before you begin.
- **Standard logic app workflow**. To trigger sending an email from the pipeline, you use [Azure Logic Apps](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/logic-apps/logic-apps-overview.md) to define the workflow. For details on creating a Standard logic app workflow, see [Create an example Standard logic app workflow](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/logic-apps/create-single-tenant-workflows-azure-portal.md).

## Create the email workflow in your logic app

Create a Standard logic app workflow named `SendEmailFromPipeline`. Add the Request trigger named `When an HTTP request is received`, and add the Office 365 Outlook action named `Send an email (V2)`.

Shows the logic app workflow designer with the Request trigger and Send an email (V2) action.

In Request trigger, provide this JSON for the `Request Body JSON Schema` property:

```json
{
    "properties": {
        "dataFactoryName": {
            "type": "string"
        },
        "message": {
            "type": "string"
        },
        "pipelineName": {
            "type": "string"
        },
        "receiver": {
            "type": "string"
        }
    },
    "type": "object"
}
```

The Request trigger in the workflow designer should look like this:

Shows the workflow designer for the Request trigger with the Request Body JSON Schema field populated.

For the **Send an email (V2)** action, customize how you wish to format the email, using the properties from the request Body JSON schema:

Shows the workflow designer for the Send an email (V2) action.

Save the workflow. Browse to the Overview page for the workflow. Make a note of the workflow URL, highlighted in the image below:

Shows the workflow Overview page with the Workflow URL highlighted.

> **Note:**
> To find the workflow URL, you must browse to the workflow itself, not just the logic app that contains it. From the Workflows page of your logic app instance, select the workflow and then navigate to its Overview page. 

## Create a pipeline to trigger your logic app workflow

After you create the logic app workflow to send email, you can trigger it from a pipeline using a **Web** activity.  

1. Create a new pipeline and find the **Web** activity under the **General** category, to drag it onto the editing canvas.

1. Select the new **Web1** activity, and then select the **Settings** tab.

   Provide the URL from the logic app workflow you created previously in the **URL** field.

   Provide the following JSON for the **Body**:
    ```json
       {
        "message" : "This is a custom dynamic message from your pipeline with run ID @{pipeline().RunId}.",
        "dataFactoryName" : "@{pipeline().DataFactory}", 
        "pipelineName" : "@{pipeline().Pipeline}", 
        "receiver" : "@{pipeline().parameters.receiver}"
       }
    ```
    
    Use dynamic expressions to generate useful messages for events in your pipelines.  Notice that the JSON format here matches the JSON format you defined in the logic app, and you can also customize these as required.
    
    Shows a pipeline with a Web activity configured with the logic app workflow URL and JSON message body.

1. Select the background area of the pipeline designer to select the pipeline properties page and add a new parameter called receiver, providing an email address as its Default value.
   
   In this example, we provide the receiver email from a pipeline parameter we define arbitrarily.  The receiver value could be taken from any expression, or even linked data sources.

   Shows the configuration of the receiver parameter in the pipeline designer.

1. Publish your pipeline, and then trigger it manually to confirm the email is sent as expected.

   Shows how to manually trigger the pipeline.

## Add dynamic messages with system variables and expressions

You can use [system variables](control-flow-system-variables.md) and [expressions](control-flow-expression-language-functions.md) to
make your messages dynamic. For example:  

-   ``@activity("CopyData").output.errors[0].Message``

-   ``@activity("DataFlow").error.Message``

The above expressions will return the relevant error messages from a Copy activity failure, which can be redirected then to your Web activity that sends the email. Refer to the
[Copy activity output properties](copy-activity-monitoring.md) article for more details.
