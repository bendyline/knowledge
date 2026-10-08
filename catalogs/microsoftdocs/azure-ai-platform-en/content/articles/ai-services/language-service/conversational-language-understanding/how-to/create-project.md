---
title: Create a CLU fine-tuning task in Microsoft Foundry or with the REST API
titleSuffix: Foundry Tools
description: This article shows you how to create CLU fine-tuning task projects the Microsoft Foundry or using the REST API.
author: laujan
manager: mcleans
ms.service: azure-language-foundry-tools
ms.topic: how-to
ms.date: 06/30/2026
ms.author: lajanuar
ms.custom: language-service-clu
---
# Create a fine-tuning task project

A Conversational Language Understanding (CLU) fine-tuning task is a workspace project where you customize a language model to identify user intent and extract key information (entities) from user input (utterances). In this workspace, you define the intents and entities relevant to your application, label sample user utterances accordingly, and use this labeled data to fine-tune the model. This process tailors the model to better understand the specific needs and nuances of your conversational application. In this guide, we walk you through configuring a fine-tuning workspace in the Microsoft Foundry or using the REST API.

> **Note:**
>
> * If you already have an Azure Language in Foundry Tools or multi-service resource, you can continue to use those existing Language resources within the Foundry portal. For more information, see [How to use Foundry Tools in the Foundry portal](../../../connect-services-foundry-portal.md).
> * In Foundry, a fine-tuning task serves as your workspace when customizing your CLU model. Previously, a **fine-tuning task** was referred to as a **CLU project**. You might encounter both terms used interchangeably in older CLU documentation.
> * We highly recommend that you use a Foundry resource in the Foundry; however, you can also follow these instructions using a Language resource.
>

## Prerequisites

* An **Azure subscription**. If you don't have one, you can [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
* **Requisite permissions**. Make sure the person establishing the account and project is assigned as the Foundry Account Owner role at the subscription level. Alternatively, having either the **Contributor** or **Cognitive Services Contributor** role at the subscription scope also meets this requirement. For more information, *see* [Role based access control (RBAC)](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/openai/how-to/role-based-access-control.md#cognitive-services-contributor).

  
> **Important:**
> The Foundry RBAC roles were recently renamed. **Foundry User**, **Foundry Owner**, **Foundry Account Owner**, and **Foundry Project Manager** were previously named Azure AI User, Azure AI Owner, Azure AI Account Owner, and Azure AI Project Manager. You might still see the previous names in some places while the rename rolls out. The role IDs and core permissions are unchanged by the rename.

*  An [**Foundry resource**](../../../multi-service-resource.md). For more information, *see* [Configure a Foundry resource](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/language-service/conversational-language-understanding/how-to/configure-azure-resources.md#option-1-configure-a-foundry-resource). Alternately, you can use a [Language resource](https://portal.azure.com/?Microsoft_Azure_PIMCommon=true#create/Microsoft.CognitiveServicesTextAnalytics).
* **A Foundry project created in the Foundry**. For more information, *see* [Create a Foundry project](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-foundry/how-to/create-projects.md).

## Fine-tune a CLU model

 To create a CLU fine-tuning model, you first configure your environment and then create a fine-tuning project, which serves as your workspace for customizing your CLU model.

### [Foundry](#tab/azure-ai-foundry)

1. Navigate to the [Foundry](https://ai.azure.com/).
1. If you aren't already signed in, the portal prompts you to do so with your Azure credentials.
1. Once signed in, you can create or access your existing projects within Foundry.
1. If you're not already at your project for this task, select it.
1. Select Fine-tuning from the left navigation pane.

   Screenshot of fine-tuning selector in the Foundry.

1. From the main window, select **the AI Service fine-tuning** tab and then the **+ Fine-tune** button.

   Screenshot of fine-tune button in the Foundry.

1. From the **Create service fine-tuning** window, choose the **Conversational language understanding** tab, and then select **Next**.

   Screenshot of conversational language understanding tab in the Foundry.

1. In the **Create CLU fine-tuning task** window, complete the **Name** and **Language** fields. If you're planning to fine-tune a model using the free **Standard Training** mode, select **English** for the language field.

1. Select the  **Create** button. It can take a few minutes for the *creating* operation to complete.

   > **Note:**
   >
   > * **Standard training** enables faster training times and quicker iterations; however it's only available for English.
   > * **Advanced training** includes longer training durations and is supported for English, other languages, and multilingual projects.
   > * For more information, *see* [Training modes](build-train-deploy-model.md#training-modes).

1. Once the task creation is complete, select the task from the Foundry Tool fine-tuning window to arrive at the **Getting started with fine-tuning** page.

   Screenshot of the getting started with fine-tuning page in the Foundry.

### [REST APIs](#tab/rest-api)

Submit a `PATCH` request by using the following URL, headers, and JSON body to create a new project.

### Request URL

Use the following URL when you create your API request. Replace the placeholder values with your own values.

```rest
{ENDPOINT}/language/authoring/analyze-conversations/projects/{PROJECT-NAME}?api-version={API-VERSION}
```

| Placeholder | Value | Example |
| --- | --- | --- |
| `{ENDPOINT}` | The endpoint for authenticating your API request. | `https://<your-custom-subdomain>.cognitiveservices.azure.com` |
| `{PROJECT-NAME}` | The name for your project. This value is case sensitive. | `myProject` |
| `{API-VERSION}` | The [version](../../concepts/model-lifecycle.md#api-versions) of the API you're calling. | `2023-04-01` |

### Headers

Use the following header to authenticate your request.

| Key | Value |
| --- | --- |
| `Ocp-Apim-Subscription-Key` | The key to your resource. Used for authenticating your API requests. |
| `Content-Type` | `application/merge-patch+json` |

### Body

Use the following sample JSON as your body.

```json
{
  "projectName": "{PROJECT-NAME}",
  "language": "{LANGUAGE-CODE}",
  "projectKind": "Conversation",
  "description": "Project description",
  "multilingual": true
}
```

| Key | Placeholder | Value | Example |
| --- | --- | --- | --- |
| `projectName` | `{PROJECT-NAME}` | The name of your project. This value is case sensitive. | `EmailApp` |
| `language` | `{LANGUAGE-CODE}` | A string that specifies the language code for the utterances used in your project. If your project is a multilingual project, choose the [language code](../language-support.md) of most of the utterances. | `en-us` |
| `multilingual` | `true` | A Boolean value that enables you to have documents in multiple languages in your dataset. When your model is deployed, you can query the model in any supported language (not necessarily included in your training documents). To learn more about multilingual support, see [Language support](../language-support.md#multi-lingual-option). | `true` |


---


That's it! You can get started on your fine-tuning task project. For more information, *see* [Next steps](#next-steps).

## View and manage project details

You can retrieve up-to-date information about your projects, make any necessary changes, and oversee project management tasks efficiently through the Foundry or REST API endpoints.

### [Foundry](#tab/azure-ai-foundry)

Your Foundry project overview page displays information about your fine-tuning task project, including its name, subscription, resource group, and connected resources. You can also access the project's resources in the Azure portal by selecting **Manage in Azure portal** on the overview page.

* On the project Home page, information about the project is found in the **Project details** section.
* To view project settings, select **Management center** from the bottom of the left navigation pane, then select one of the following tabs:
   *  **Overview** to view project details.
   *  **Users** to manage users and roles.
   *  **Models + endpoints** to manage deployments of your models and services.
   *  **Connected resources** to manage connected resources for the project.

   Screenshot of the project details list in the Foundry.

### [REST APIs](#tab/rest-api)

You can access, view, and manage all of your project details via the REST API.

To get your project details, submit a `GET` request by using the following URL and headers. Replace the placeholder values with your own values.

```rest
{ENDPOINT}/language/authoring/analyze-conversations/projects/{PROJECT-NAME}?api-version={API-VERSION}
```

| Placeholder | Value | Example |
| --- | --- | --- |
| `{ENDPOINT}` | The endpoint for authenticating your API request. | `https://<your-custom-subdomain>.cognitiveservices.azure.com` |
| `{PROJECT-NAME}` | The name for your project. This value is case sensitive. | `myProject` |
| `{API-VERSION}` | The [version](../../concepts/model-lifecycle.md#api-versions) of the API that you're calling. | `2023-04-01` |

### Headers

Use the following header to authenticate your request.

| Key | Value |
| --- | --- |
| `Ocp-Apim-Subscription-Key` | The key to your resource. Used for authenticating your API requests. |

### Response body

After you send the request, you get the following response:

```json
{
  "createdDateTime": "2022-04-18T13:53:03Z",
  "lastModifiedDateTime": "2022-04-18T13:53:03Z",
  "lastTrainedDateTime": "2022-04-18T14:14:28Z",
  "lastDeployedDateTime": "2022-04-18T14:49:01Z",
  "projectKind": "Conversation",
  "projectName": "{PROJECT-NAME}",
  "multilingual": true,
  "description": "This is a sample conversation project.",
  "language": "{LANGUAGE-CODE}"
}
```

After you send your API request, you receive a `200` response that indicates success and includes a JSON response body with your project details.


---

## Import an existing Foundry project

Importing the configuration file allows you to bring your existing settings directly into the platform, making it easier to set up and customize your service based on your predefined preferences.

### [Foundry](#tab/azure-ai-foundry)

To import an existing Foundry Tools project with Foundry, you need to create a connection to the Foundry Tools resource within your Foundry project. For more information, *see* [Connect Foundry Tools projects to Foundry](../../../connect-services-foundry-portal.md)

### [REST APIs](#tab/rest-api)

You can import your CLU config.json file using the REST API

Submit a `POST` request by using the following URL, headers, and JSON body to import your project.

### Request URL

Use the following URL when you create your API request. Replace the placeholder values with your own values.

```rest
{ENDPOINT}/language/authoring/analyze-conversations/projects/{PROJECT-NAME}/:import?api-version={API-VERSION}
```

| Placeholder | Value | Example |
| --- | --- | --- |
| `{ENDPOINT}` | The endpoint for authenticating your API request. | `https://<your-custom-subdomain>.cognitiveservices.azure.com` |
| `{PROJECT-NAME}` | The name for your project. This value is case sensitive and must match the project name in the JSON file that you're importing. | `EmailAppDemo` |
| `{API-VERSION}` | The [version](../../concepts/model-lifecycle.md#api-versions) of the API that you're calling. | `2023-04-01` |

### Headers

Use the following header to authenticate your request.

| Key | Value |
| --- | --- |
| `Ocp-Apim-Subscription-Key` | The key to your resource. Used for authenticating your API requests. |

### Body

The JSON body you send is similar to the following example. For more information about the JSON object, see the [reference documentation](https://learn.microsoft.com/rest/api/language/2023-04-01/conversational-analysis-authoring/import?tabs=HTTP#successful-import-project).

```json
{
  "projectFileVersion": "{API-VERSION}",
  "stringIndexType": "Utf16CodeUnit",
  "metadata": {
    "projectKind": "Conversation",
    "settings": {
      "confidenceThreshold": 0.7
    },
    "projectName": "{PROJECT-NAME}",
    "multilingual": true,
    "description": "Trying out CLU",
    "language": "{LANGUAGE-CODE}"
  },
  "assets": {
    "projectKind": "Conversation",
    "intents": [
      {
        "category": "intent1"
      },
      {
        "category": "intent2"
      }
    ],
    "entities": [
      {
        "category": "entity1"
      }
    ],
    "utterances": [
      {
        "text": "text1",
        "dataset": "{DATASET}",
        "intent": "intent1",
        "entities": [
          {
            "category": "entity1",
            "offset": 5,
            "length": 5
          }
        ]
      },
      {
        "text": "text2",
        "language": "{LANGUAGE-CODE}",
        "dataset": "{DATASET}",
        "intent": "intent2",
        "entities": []
      }
    ]
  }
}

```

| Key | Placeholder | Value | Example |
| --- | --- | --- | --- |
| `{API-VERSION}` | The [version](../../concepts/model-lifecycle.md#api-versions) of the API that you're calling. | `2023-04-01` |
| `projectName` | `{PROJECT-NAME}` | The name of your project. This value is case sensitive. | `EmailAppDemo` |
| `language` | `{LANGUAGE-CODE}` | A string that specifies the language code for the utterances used in your project. If your project is a multilingual project, choose the [language code](../language-support.md) of most of the utterances. | `en-us` |
| `multilingual` | `true` | A Boolean value that enables you to have documents in multiple languages in your dataset. When your model is deployed, you can query the model in any [supported language](../language-support.md#multi-lingual-option), including languages that aren't included in your training documents. | `true` |
| `dataset` | `{DATASET}` | For information on how to split your data between a testing and training set, see [Label your utterances in Foundry](build-train-deploy-model.md#label-your-utterances). Possible values for this field are `Train` and `Test`. | `Train` |

After a successful request, the API response contains an `operation-location` header with a URL that you can use to check the status of the import job. The header is formatted like this example:

```http
{ENDPOINT}/language/authoring/analyze-conversations/projects/{PROJECT-NAME}/import/jobs/{JOB-ID}?api-version={API-VERSION}
``` 


---

## Export a fine-tuning project

Exporting your configuration file enables you to save the current state of your project's settings and structure, making it easy to back up or transfer your project as needed.

### [Foundry](#tab/azure-ai-foundry)

You can download a Microsoft Foundry fine-tuning task project as a **config.json** file:

1. Navigate to your project home page.
1. At the top of the page, select your project from the right page ribbon area.
1. Select **Download config file**.

    Screenshot of project drop-down menu with the download config file hyperlink in the Foundry.

### [REST APIs](#tab/rest-api)

You can export a CLU project as a config.json file.

Create a `POST` request by using the following URL, headers, and JSON body to export your project.

### Request URL

Use the following URL when you create your API request. Replace the placeholder values with your own values.

```rest
{ENDPOINT}/language/authoring/analyze-conversations/projects/{PROJECT-NAME}/:export?stringIndexType=Utf16CodeUnit&api-version={API-VERSION}
```

| Placeholder | Value | Example |
| --- | --- | --- |
| `{ENDPOINT}` | The endpoint for authenticating your API request. | `https://<your-custom-subdomain>.cognitiveservices.azure.com` |
| `{PROJECT-NAME}` | The name for your project. This value is case sensitive. | `EmailApp` |
| `{API-VERSION}` | The [version](../../concepts/model-lifecycle.md#api-versions) of the API that you're calling. | `2023-04-01` |

### Headers

Use the following header to authenticate your request.

| Key | Value |
| --- | --- |
| `Ocp-Apim-Subscription-Key` | The key to your resource. Used for authenticating your API requests. |

After you send your API request, you receive a `202` response that indicates success. In the response headers, extract the `operation-location` value. The value is formatted like this example:

```rest
{ENDPOINT}/language/authoring/analyze-conversations/projects/{PROJECT-NAME}/jobs/{JOB-ID}?api-version={API-VERSION}
``` 

`JOB-ID` is used to identify your request because this operation is asynchronous. Use this URL to get the exported project JSON by using the same authentication method.


---


## Delete a project

Deleting a project ensures that it and all of its associated data are permanently removed from the system.

### [Foundry](#tab/azure-ai-foundry)

If you no longer need your project, you can delete it from the Foundry.

1. Navigate to the [Foundry](https://ai.azure.com/) home page. Initiate the authentication process by signing in, unless you already completed this step and your session is active.
1. Select the project that you want to delete from the **Keep building with Foundry**
1. Select **Management center**.
1. Select **Delete project**.

   Screenshot of the Delete project button in the Foundry.

To delete the hub along with all its projects:

1. Navigate to the **Overview** tab inn the **Hub** section.

   Screenshot of the hub details list in the Foundry.

1. On the right, select **Delete hub**.
1. The link opens the Azure portal for you to delete the hub.

   Screenshot of the Delete hub button in the Foundry.

### [REST APIs](#tab/rest-api)

If your project is no longer required, you can delete it using the REST API. To proceed, access the REST API and follow the documented steps for project deletion to complete this action.

Create a `DELETE` request by using the following URL, headers, and JSON body to delete a conversational language understanding project.

### Request URL

```rest
{ENDPOINT}/language/authoring/analyze-conversations/projects/{PROJECT-NAME}?api-version={API-VERSION}
```

| Placeholder | Value | Example |
| --- | --- | --- |
| `{ENDPOINT}` | The endpoint for authenticating your API request. | `https://<your-custom-subdomain>.cognitiveservices.azure.com` |
| `{PROJECT-NAME}` | The name for your project. This value is case sensitive. | `myProject` |
| `{API-VERSION}` | The [version](../../concepts/model-lifecycle.md#api-versions) of the API that you're calling. | `2023-04-01` |

### Headers

Use the following header to authenticate your request.

| Key | Value |
| --- | --- |
| `Ocp-Apim-Subscription-Key` | The key to your resource. Used for authenticating your API requests. |

After you send your API request, you receive a `202` response that indicates success, which means that your project was deleted.


---

## Next steps

After you create your fine-tuning workspace, start your fine-tuning task by defining your intents and entities and adding them to your schema:

* [Build your fine-tuning schema](build-train-deploy-model.md#build-your-fine-tuning-schema)
* [Label utterances](build-train-deploy-model.md#label-your-utterances)
