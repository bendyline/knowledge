---
title: Quickstart - Orchestration workflow
titleSuffix: Foundry Tools
description: Quickly start creating an AI model to connect your Conversational Language Understanding, question answering applications.
author: laujan
manager: mcleans
ms.service: azure-language-foundry-tools
ms.topic: quickstart
ms.date: 06/30/2026
ms.author: lajanuar
ms.custom: language-service-clu, mode-other
zone_pivot_groups: foundry-rest-api
---
<!-- markdownlint-disable MD025 -->
# Quickstart: Orchestration workflow

Orchestration workflow, offered by [Azure Language in Foundry Tools](../overview.md), enables you to integrate multiple language models—such as Conversational Language Understanding (CLU) and Custom question answering (CQA)—into a single project. This functionality intelligently routes user requests to the most suitable model via a unified endpoint, providing seamless and sophisticated conversational experiences across various language services tasks.

This quickstart walks you through the essentials of working with orchestration workflow projects Following each step builds a strong foundation in the core concepts. Completing this quickstart provides you with hands-on experience, preparing you to confidently tackle orchestration workflow projects in your own environment.

**Applies to: microsoft-foundry**

<!-- markdownlint-disable MD041 -->
## Prerequisites

> **Note:**
>
> * If you already have an Azure Language in Foundry Tools or multi-service resource, you can continue to use those existing Language resources within the Microsoft Foundry portal via a Foundry Hub project.
> * For more information, see [How to use Foundry Tools in the Foundry portal](../../connect-services-foundry-portal.md)
> * We highly recommended that you use a Foundry resource in the Foundry; however, you can also follow these instructions using a Language resource.

<!-- markdownlint-disable MD032 -->

* **An Azure subscription**. If you don't have one, you can [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
* **Requisite permissions**. Make sure the person establishing the account and project is assigned as the Foundry Account Owner role at the subscription level. Alternatively, having either the **Contributor** or **Cognitive Services Contributor** role at the subscription scope also meets this requirement. For more information, *see* [Role based access control (RBAC)](https://learn.microsoft.com/azure/ai-foundry/openai/how-to/role-based-access-control#cognitive-services-contributor).

  
> **Important:**
> The Foundry RBAC roles were recently renamed. **Foundry User**, **Foundry Owner**, **Foundry Account Owner**, and **Foundry Project Manager** were previously named Azure AI User, Azure AI Owner, Azure AI Account Owner, and Azure AI Project Manager. You might still see the previous names in some places while the rename rolls out. The role IDs and core permissions are unchanged by the rename.

* [**A Foundry resource**](https://learn.microsoft.com/azure/ai-services/multi-service-resource) (recommended). For more information, *see* [Configure a Foundry resource](../concepts/configure-azure-resources.md). Alternately, you can use a [Language resource](https://portal.azure.com/?Microsoft_Azure_PIMCommon=true#create/Microsoft.CognitiveServicesTextAnalytics).
* **A Foundry project created in the Foundry**. For more information, *see* [Create a Foundry project](https://learn.microsoft.com/azure/ai-foundry/how-to/create-projects).

* A [**Conversational language understanding (CQA)**](../conversational-language-understanding/overview.md) or [**Custom question answering (CQA)**](../question-answering/overview.md) project created in the Foundry.

## Migrate an existing orchestration workflow

If you have an existing orchestration workflow project that you want to use in Foundry, you have two migration options:

### Option 1: Connect your Language resource to a Foundry Hub (recommended)

Connect your existing Language resource to a Foundry Hub project. This approach automatically preserves all task linkages between your orchestration workflow and its associated CLU and CQA tasks.

### Option 2: Import projects into a new Foundry resource

If you want to use a new Foundry resource, import your projects individually. To preserve task linkages, import in the following order:

1. Import your CLU and CQA tasks first.
1. Import the orchestration workflow only after the dependent tasks are available in the Foundry resource.

> **Important:**
> The import order matters. If you import the orchestration workflow before its dependent CLU and CQA tasks, the task linkages aren't preserved. You must then manually relink the tasks in the **Configure orchestration** section.

For detailed migration steps, see [Migrate from Azure Language to Microsoft Foundry](../migration-studio-to-foundry.md).

## Get started

After you create your Foundry resource, you can initiate an orchestration workflow project in the [Microsoft Foundry](https://ai.azure.com/). This project serves as a dedicated workspace for developing custom machine learning models using your data. Access to the project is restricted to you and others who have permissions for the associated Foundry resource.

For this quickstart, you can complete the [**Conversational Language Understanding quickstart**](../conversational-language-understanding/quickstart.md) or [**Custom question answering (CQA)**](../question-answering/quickstart/sdk.md) to establish a project for use in our subsequent orchestration workflow quickstart steps.

Let's begin:

1. Navigate to the Foundry.

1. If you aren't already signed in, the portal prompts you to do so with your Azure credentials.

1. Once signed in, you can create or access your existing projects within Foundry.

1. If you're not already in your **`CLU`** or **`CQA`** project, select it now.

## Create an orchestration workflow project

1. Select **Fine-tuning** from the left navigation pane.

1. From the window that appears, select the AI Service fine-tuning tab and then the **+ Fine-tune** button.

   Screenshot of create fine-tuning button in the Foundry.

1. From the window that appears, select **Conversational Orchestration Workflow** as the task type, then select **Next**.

    * If you don't have a CLU or CQA fine-tuning task in this Foundry resource, a warning appears indicating that no tasks are available to link.

       Screenshot of no tasks warning in orchestration workflow creation in the Foundry.

    * Create a [Conversational Language Understanding](../conversational-language-understanding/quickstart.md) or [Custom Question Answering](../question-answering/quickstart/sdk.md) task first, then return to create your orchestration workflow.

1. In the **Create service fine-tuning window**, you can choose to create a new task or import an existing one. Complete all required fields, then select **Create**:

    * **Name**: Provide a unique name for your orchestration workflow project.
    * **Language**: Select the language for your project.
    * **Description**: Optionally, provide a description for your project.

1. After creating the orchestration workflow project, you'll be directed to the project overview page. Here, you can manage your project settings, monitor training progress, and access various tools to enhance your model.

## Configure orchestration

Connect your existing **Conversational Language Understanding** (CLU) and **Custom Question Answering** (CQA) fine-tuning tasks to create a unified orchestration layer that routes user inputs to the appropriate model. You can define more routing intents when user inputs are ambiguous and need extra logic to identify the correct task.

> **Note:**
> If the **Configure orchestration** page is empty, you don't have any CLU or CQA fine-tuning tasks in this Foundry resource. Create a [Conversational Language Understanding](../conversational-language-understanding/quickstart.md) or [Custom Question Answering](../question-answering/quickstart/sdk.md) task first, then return to this page and link it.

1. To add existing **`CLU`** or **`CQA`** models to your orchestration workflow, navigate to your fine-tuning project and select the **Configure orchestration** section from the **Getting started** menu. There, you can link your fine-tuning tasks and add intents from your existing models to the orchestration workflow.

   Screenshot of orchestration workflow overview in the Foundry.

1. Link your tasks by selecting the radio button next to the task you want to link, and then selecting the **Link fine-tuning task** from the top navigation bar. The **Orchestration intent name** field automatically populates with the same name as the **Fine-tuning task name** field.

   Screenshot of linking tasks in orchestration workflow in the Foundry.

1. Once this step is complete, the status for your linked tasks changes from **Unlinked** to **Linked** in the **Configure orchestration** section.

   Screenshot of linked tasks in orchestration workflow in the Foundry.

1. To link multiple fine-tuning tasks at once, select one or more unlinked tasks, then select **Link fine-tuning task** from the top navigation bar.

1. To unlink tasks, select one or more linked tasks, then select **Unlink fine-tuning task** from the top navigation bar.

1. To add routing intents, select the **Intents** tab from the top navigation bar. In the window that appears, select the **+ Add intent** button, provide a unique name for your intent in the **Intent name** field, then select **Add** to continue.

   Screenshot of adding intents in orchestration workflow in the Foundry.

## Add training data

1. Navigate to the Manage Data tab. For this project, use one of your existing **Conversational Language Understanding** (CLU) projects. If your existing project doesn't include labeled utterances, you can download our [**sample utterances file**](https://github.com/Azure-Samples/cognitive-services-sample-data-files/blob/master/language-service/CLU/clu_utterances.json) which comes preconfigured with labeled utterances.

1. Select the **Upload utterances** button to upload your utterances file in JSON format.

   Screenshot of uploading utterances in orchestration workflow in the Foundry.

1. After uploading your utterances file, select the **unlinked intents** from the Insights pane. This action allows you to map these intents to the appropriate linked tasks within your orchestration workflow.

   Screenshot of unlinked intents in orchestration workflow in the Foundry.

## Train your model

1. Navigate to the **Train model** section and select the **Train model** button to start training your orchestration workflow with the linked tasks and uploaded utterances. This process may take some time depending on the size of your dataset and the complexity of your model.

   Screenshot of training orchestration button in the Foundry.

1. In the **Train a new model** window, provide a name for your model, keep the default standard training mode, and select **Next** to proceed.

   Screenshot of training orchestration model window in the Foundry.

1. In the data splitting window, you can choose to either use the default data split or customize it according to your needs. After making your selection, select **Next** to continue.

1. Review your selections in the summary window, and if everything looks correct, select **Create** to initiate the training process for your orchestration workflow model.

   Screenshot of orchestration model training summary in the Foundry.

1. After initiating the training process, you can monitor the progress and view detailed metrics on the training dashboard. Once the training is complete, your orchestration workflow model is ready for deployment and testing.

## Deploy your model

Deploy your trained model by navigating to the **Deploy model** section and selecting the **Deploy** button. Follow the prompts to complete the deployment process.

   Screenshot of deploying orchestration model button in the Foundry.

## Test your model

After your model successfully deploys, you can test it directly within the Foundry interface. Navigate to the **Test in playground** section, input various utterances, and observe how your orchestration workflow routes requests to the appropriate linked tasks.

That's it, congratulations!

## Clean up resources

If you no longer need your project, you can delete it from the Foundry.

1. Navigate to the [Foundry](https://ai.azure.com/) home page. Initiate the authentication process by signing in, unless you already completed this step and your session is active.

1. Select the project that you want to delete from the **Keep building with Foundry**

1. Select **Management center**.

1. Select **Delete project**.



**Applies to: rest-api**


## Prerequisites

* Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).



## Create a Language resource from Azure portal

### Create a new resource from the Azure portal

1. Go to the [Azure portal](https://portal.azure.com/#create/Microsoft.CognitiveServicesTextAnalytics) to create a new Azure Language in Foundry Tools resource. 

2. Select **Continue to create your resource**

3. Create a Language resource with following details.

    | Instance detail | Required value |
    | --- | --- |
    | Region | One of the [supported regions](service-limits.md#regional-availability). |
    | Name | A name for your Language resource. |
    | Pricing tier | One of the [supported pricing tiers](service-limits.md#language-resource-limits). |








## Get your resource keys and endpoint

1. Go to your resource overview page in the [Azure portal](https://portal.azure.com/#home).
2. From the menu on the left side, select **Keys and Endpoint**. The endpoint and key are used for API requests. 

    A screenshot showing the key and endpoint page in the Azure portal



## Create an orchestration workflow project 

Once you have a Language resource created, create an orchestration workflow project. A project is a work area for building your custom ML models based on your data. Your project can only be accessed by you and others who have access to Azure Language resource being used.

For this quickstart, complete the [CLU](../conversational-language-understanding/quickstart.md) quickstart to create a CLU project to be used in orchestration workflow.

Submit a **PATCH** request using the following URL, headers, and JSON body to create a new project.

### Request URL

Use the following URL when creating your API request. Replace the placeholder values with your own values. 

```rest
{ENDPOINT}/language/authoring/analyze-conversations/projects/{PROJECT-NAME}?api-version={API-VERSION}
```

| Placeholder | Value | Example |
| --- | --- | --- |
| `{ENDPOINT}` | The endpoint for authenticating your API request. | `https://<your-custom-subdomain>.cognitiveservices.azure.com` |
| `{PROJECT-NAME}` | The name for your project. This value is case-sensitive. | `myProject` |
| `{API-VERSION}` | The [version](../concepts/model-lifecycle.md#api-versions) of the API you're calling. | `2023-04-01` |

### Headers

Use the following header to authenticate your request. 

| Key | Value |
| --- | --- |
| `Ocp-Apim-Subscription-Key` | The key to your resource. Used for authenticating your API requests. |

### Body

Use the following sample JSON as your body.

```json
{
  "projectName": "{PROJECT-NAME}",
  "language": "{LANGUAGE-CODE}",
  "projectKind": "Orchestration",
  "description": "Project description"
 }
```

| Key | Placeholder | Value | Example |
| --- | --- | --- | --- |
| `projectName` | `{PROJECT-NAME}` | The name of your project. This value is case-sensitive. | `EmailApp` |
| `language` | `{LANGUAGE-CODE}` | A string specifying the language code for the utterances used in your project. If your project is a multilingual project, choose the [language code](language-support.md) for most of the utterances. | `en-us` |





## Build schema

After completing the CLU quickstart, and creating an orchestration project, the next step is to add intents.

Submit a **POST** request using the following URL, headers, and JSON body to import your project.

### Request URL

Use the following URL when creating your API request. Replace the placeholder values with your own values. 

```rest
{ENDPOINT}/language/authoring/analyze-conversations/projects/{PROJECT-NAME}/:import?api-version={API-VERSION}
```

| Placeholder | Value | Example |
| --- | --- | --- |
| `{ENDPOINT}` | The endpoint for authenticating your API request. | `https://<your-custom-subdomain>.cognitiveservices.azure.com` |
| `{PROJECT-NAME}` | The name for your project. This value is case-sensitive. | `myProject` |
| `{API-VERSION}` | The [version](../concepts/model-lifecycle.md#api-versions) of the API you're calling. | `2023-04-01` |

### Headers

Use the following header to authenticate your request. 

| Key | Value |
| --- | --- |
| `Ocp-Apim-Subscription-Key` | The key to your resource. Used for authenticating your API requests. |

### Body

> **Note:**
> Each intent should only be of one type only from (CLU,LUIS and qna)

Use the following sample JSON as your body.

```json
{
  "projectFileVersion": "{API-VERSION}",
  "stringIndexType": "Utf16CodeUnit",
  "metadata": {
    "projectKind": "Orchestration",
    "settings": {
      "confidenceThreshold": 0
    },
    "projectName": "{PROJECT-NAME}",
    "description": "Project description",
    "language": "{LANGUAGE-CODE}"
  },
  "assets": {
    "projectKind": "Orchestration",
    "intents": [
      {
        "category": "string",
        "orchestration": {
          "kind": "luis",
          "luisOrchestration": {
            "appId": "00001111-aaaa-2222-bbbb-3333cccc4444",
            "appVersion": "string",
            "slotName": "string"
          },
          "cluOrchestration": {
            "projectName": "string",
            "deploymentName": "string"
          },
          "qnaOrchestration": {
            "projectName": "string"
          }
        }
      }
    ],
    "utterances": [
      {
        "text": "Trying orchestration",
        "language": "{LANGUAGE-CODE}",
        "intent": "string"
      }
    ]
  }
}

```

| Key | Placeholder | Value | Example |
| --- | --- | --- | --- |
| `api-version` | `{API-VERSION}` | The version of the API you're calling. The version used here must be the same API version in the URL. | `2022-03-01-preview` |
| `projectName` | `{PROJECT-NAME}` | The name of your project. This value is case-sensitive. | `EmailApp` |
| `language` | `{LANGUAGE-CODE}` | A string specifying the language code for the utterances used in your project. If your project is a multilingual project, choose the [language code](language-support.md) for most of the utterances. | `en-us` |





## Train your model

To train a model, you need to start a training job. The output of a successful training job is your trained model.

Create a **POST** request using the following URL, headers, and JSON body to submit a training job. 

### Request URL

Use the following URL when creating your API request. Replace the placeholder values with your own values. 

```rest
{ENDPOINT}/language/authoring/analyze-conversations/projects/{PROJECT-NAME}/:train?api-version={API-VERSION}
```

| Placeholder | Value | Example |
| --- | --- | --- |
| `{ENDPOINT}` | The endpoint for authenticating your API request. | `https://<your-custom-subdomain>.cognitiveservices.azure.com` |
| `{PROJECT-NAME}` | The name for your project. This value is case-sensitive. | `EmailApp` |
| `{API-VERSION}` | The [version](../concepts/model-lifecycle.md#api-versions) of the API you're calling. | `2023-04-01` |

### Headers

Use the following header to authenticate your request. 

| Key | Value |
| --- | --- |
| `Ocp-Apim-Subscription-Key` | The key to your resource. Used for authenticating your API requests. |

 
### Request body

Use the following object in your request. The model will be named `MyModel` once training is complete.  

```json
{
  "modelLabel": "{MODEL-NAME}",
  "trainingMode": "standard",
  "trainingConfigVersion": "{CONFIG-VERSION}",
  "evaluationOptions": {
    "kind": "percentage",
    "testingSplitPercentage": 20,
    "trainingSplitPercentage": 80
  }
}
```
| Key | Placeholder | Value | Example |
| --- | --- | --- | --- |
| `modelLabel` | `{MODEL-NAME}` | Your Model name. | `Model1` |
| `trainingMode` | `standard` | Training mode. Only one mode for training is available in orchestration, which is `standard`. | `standard` |
| `trainingConfigVersion` | `{CONFIG-VERSION}` | The training configuration model version. By default, the latest [model version](../concepts/model-lifecycle.md) is used. | `2022-05-01` |
| `kind` | `percentage` | Split methods. Possible values are `percentage` or `manual`. For more information, see [how to train a model](how-to/build-train-deploy-model.md#train-your-model). | `percentage` |
| `trainingSplitPercentage` | `80` | Percentage of your tagged data to be included in the training set. Recommended value is `80`. | `80` |
| `testingSplitPercentage` | `20` | Percentage of your tagged data to be included in the testing set. Recommended value is `20`. | `20` |

  > **Note:**
  > The `trainingSplitPercentage` and `testingSplitPercentage` are only required if `Kind` is set to `percentage` and the sum of both percentages should be equal to 100.

Once you send your API request, you receive a `202` response indicating success. In the response headers, extract the `operation-location` value formatted like this: 

```rest
{ENDPOINT}/language/authoring/analyze-conversations/projects/{PROJECT-NAME}/train/jobs/{JOB-ID}?api-version={API-VERSION}
``` 
You can use this URL to get the training job status.




### Get Training Status

Training could take sometime between 10 and 30 minutes. You can use the following request to keep polling the status of the training job until it is successfully completed.

Use the following **GET** request to get the status of your model's training progress. Replace the placeholder values with your own values. 

### Request URL

```rest
{ENDPOINT}/language/authoring/analyze-conversations/projects/{PROJECT-NAME}/train/jobs/{JOB-ID}?api-version={API-VERSION}
```

| Placeholder | Value | Example |
| --- | --- | --- |
| `{YOUR-ENDPOINT}` | The endpoint for authenticating your API request. | `https://<your-custom-subdomain>.cognitiveservices.azure.com` |
| `{PROJECT-NAME}` | The name for your project. This value is case-sensitive. | `EmailApp` |
| `{JOB-ID}` | The ID for locating your model's training status. It's in the `location` header value you received when submitted your training job. | `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxxx` |
| `{API-VERSION}` | The [version](../concepts/model-lifecycle.md#api-versions) of the API you're calling. | `2023-04-01` |

### Headers

Use the following header to authenticate your request. 

| Key | Value |
| --- | --- |
| `Ocp-Apim-Subscription-Key` | The key to your resource. Used for authenticating your API requests. |


### Response Body

Once you send the request, you get the following response. Keep polling this endpoint until the **status** parameter changes to "succeeded". 

```json
{
  "result": {
    "modelLabel": "{MODEL-LABEL}",
    "trainingConfigVersion": "{TRAINING-CONFIG-VERSION}",
    "estimatedEndDateTime": "2022-04-18T15:47:58.8190649Z",
    "trainingStatus": {
      "percentComplete": 3,
      "startDateTime": "2022-04-18T15:45:06.8190649Z",
      "status": "running"
    },
    "evaluationStatus": {
      "percentComplete": 0,
      "status": "notStarted"
    }
  },
  "jobId": "xxxxxx-xxxxx-xxxxxx-xxxxxx",
  "createdDateTime": "2022-04-18T15:44:44Z",
  "lastUpdatedDateTime": "2022-04-18T15:45:48Z",
  "expirationDateTime": "2022-04-25T15:44:44Z",
  "status": "running"
}
```

| Key | Value | Example |
| --- | --- | --- |
| `modelLabel` | The model name | `Model1` |
| `trainingConfigVersion` | The training configuration version. By default, the [latest version](../concepts/model-lifecycle.md#choose-the-model-version-used-on-your-data) is used. | `2022-05-01` |
| `startDateTime` | The time training started | `2022-04-14T10:23:04.2598544Z` |
| `status` | The status of the training job | `running` |
| `estimatedEndDateTime` | Estimated time for the training job to finish | `2022-04-14T10:29:38.2598544Z` |
| `jobId` | Your training job ID | `xxxxx-xxxx-xxxx-xxxx-xxxxxxxxx` |
| `createdDateTime` | Training job creation date and time | `2022-04-14T10:22:42Z` |
| `lastUpdatedDateTime` | Training job last updated date and time | `2022-04-14T10:23:45Z` |
| `expirationDateTime` | Training job expiration date and time | `2022-04-14T10:22:42Z` |




## Deploy your model

Generally after training a model you would review its evaluation details. In this quickstart, you will just deploy your model, and call the [prediction API](https://aka.ms/clu-apis) to query the results.

### Submit deployment job

Create a **PUT** request using the following URL, headers, and JSON body to start deploying an orchestration workflow model.

#### Request URL

```rest
{ENDPOINT}/language/authoring/analyze-conversations/projects/{PROJECT-NAME}/deployments/{DEPLOYMENT-NAME}?api-version={API-VERSION}
```

| Placeholder | Value | Example |
| --- | --- | --- |
| `{ENDPOINT}` | The endpoint for authenticating your API request. | `https://<your-custom-subdomain>.cognitiveservices.azure.com` |
| `{PROJECT-NAME}` | The name for your project. This value is case-sensitive. | `myProject` |
| `{DEPLOYMENT-NAME}` | The name for your deployment. This value is case-sensitive. | `staging` |
| `{API-VERSION}` | The [version](../concepts/model-lifecycle.md#api-versions) of the API you're calling. | `2023-04-01` |

#### Headers

Use the following header to authenticate your request. 

| Key | Value |
| --- | --- |
| `Ocp-Apim-Subscription-Key` | The key to your resource. Used for authenticating your API requests. |

#### Request Body

```json
{
  "trainedModelLabel": "{MODEL-NAME}",
}
```

| Key | Placeholder | Value | Example |
| --- | --- | --- | --- |
| trainedModelLabel | `{MODEL-NAME}` | The model name that is assigned to your deployment. You can only assign successfully trained models. This value is case-sensitive. | `myModel` |

Once you send your API request, you receive a `202` response indicating success. In the response headers, extract the `operation-location` value formatted like this: 

```rest
{ENDPOINT}/language/authoring/analyze-conversations/projects/{PROJECT-NAME}/deployments/{DEPLOYMENT-NAME}/jobs/{JOB-ID}?api-version={API-VERSION}
``` 

You can use this URL to get the deployment job status.




### Get deployment job status

Use the following **GET** request to get the status of your deployment job. Replace the placeholder values with your own values. 

### Request URL

```rest
{ENDPOINT}/language/authoring/analyze-conversations/projects/{PROJECT-NAME}/deployments/{DEPLOYMENT-NAME}/jobs/{JOB-ID}?api-version={API-VERSION}
```

| Placeholder | Value | Example |
| --- | --- | --- |
| `{ENDPOINT}` | The endpoint for authenticating your API request. | `https://<your-custom-subdomain>.cognitiveservices.azure.com` |
| `{PROJECT-NAME}` | The name for your project. This value is case-sensitive. | `myProject` |
| `{DEPLOYMENT-NAME}` | The name for your deployment. This value is case-sensitive. | `staging` |
| `{JOB-ID}` | The ID for locating your model's training status. It's in the `location` header value you received from the API in response to your model deployment request. | `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxxx` |
| `{API-VERSION}` | The [version](../concepts/model-lifecycle.md#api-versions) of the API you're calling. | `2023-04-01` |

### Headers

Use the following header to authenticate your request. 

| Key | Value |
| --- | --- |
| `Ocp-Apim-Subscription-Key` | The key to your resource. Used for authenticating your API requests. |


### Response Body

Once you send the request, you get the following response. Keep polling this endpoint until the **status** parameter changes to "succeeded". 

```json
{
    "jobId":"{JOB-ID}",
    "createdDateTime":"{CREATED-TIME}",
    "lastUpdatedDateTime":"{UPDATED-TIME}",
    "expirationDateTime":"{EXPIRATION-TIME}",
    "status":"running"
}
```




## Query model 

After your model is deployed, you can start using it to make predictions through the [prediction API](https://aka.ms/clu-apis). 

Once deployment succeeds, you can begin querying your deployed model for predictions. 

Create a **POST** request using the following URL, headers, and JSON body to start testing an orchestration workflow model.

### Request URL

```rest
{ENDPOINT}/language/:analyze-conversations?api-version={API-VERSION}
```

| Placeholder | Value | Example |
| --- | --- | --- |
| `{ENDPOINT}` | The endpoint for authenticating your API request. | `https://<your-custom-subdomain>.cognitiveservices.azure.com` |
| `{API-VERSION}` | The [version](../concepts/model-lifecycle.md#api-versions) of the API you're calling. | `2023-04-01` |


### Headers

Use the following header to authenticate your request. 

| Key | Value |
| --- | --- |
| `Ocp-Apim-Subscription-Key` | The key to your resource. Used for authenticating your API requests. |


### Request Body

```json
{
  "kind": "Conversation",
  "analysisInput": {
    "conversationItem": {
      "text": "Text1",
      "participantId": "1",
      "id": "1"
    }
  },
  "parameters": {
    "projectName": "{PROJECT-NAME}",
    "deploymentName": "{DEPLOYMENT-NAME}",
    "directTarget": "qnaProject",
    "targetProjectParameters": {
      "qnaProject": {
        "targetProjectKind": "QuestionAnswering",
        "callingOptions": {
          "context": {
            "previousUserQuery": "Meet Surface Pro 4",
            "previousQnaId": 4
          },
          "top": 1,
          "question": "App Service overview"
        }
      }
    }
  }
}
```

### Response Body

Once you send the request, you get the following response for the prediction!

```json
{
  "kind": "ConversationResult",
  "result": {
    "query": "App Service overview",
    "prediction": {
      "projectKind": "Orchestration",
      "topIntent": "qnaTargetApp",
      "intents": {
        "qnaTargetApp": {
          "targetProjectKind": "QuestionAnswering",
          "confidenceScore": 1,
          "result": {
            "answers": [
              {
                "questions": [
                  "App Service overview"
                ],
                "answer": "The compute resources you use are determined by the *App Service plan* that you run your apps on.",
                "confidenceScore": 0.7384000000000001,
                "id": 1,
                "source": "https://learn.microsoft.com/azure/app-service/overview",
                "metadata": {},
                "dialog": {
                  "isContextOnly": false,
                  "prompts": []
                }
              }
            ]
          }
        }
      }
    }
  }
}

```




## Clean up resources

When you don't need your project anymore, you can delete your project using the APIs.

Create a **DELETE** request using the following URL, headers, and JSON body to delete a conversational language understanding project.


### Request URL

```rest
{ENDPOINT}/language/authoring/analyze-conversations/projects/{PROJECT-NAME}?api-version={API-VERSION}
```

| Placeholder | Value | Example |
| --- | --- | --- |
| `{ENDPOINT}` | The endpoint for authenticating your API request. | `https://<your-custom-subdomain>.cognitiveservices.azure.com` |
| `{PROJECT-NAME}` | The name for your project. This value is case-sensitive. | `myProject` |
| `{API-VERSION}` | The [version](../concepts/model-lifecycle.md#api-versions) of the API you're calling. | `2023-04-01` |

### Headers

Use the following header to authenticate your request. 

| Key | Value |
| --- | --- |
| `Ocp-Apim-Subscription-Key` | The key to your resource. Used for authenticating your API requests. |

Once you send your API request, you receive a `202` response indicating success, which means your project is deleted.








## Next steps

* [Learn about orchestration workflows](overview.md)
