---
title: Save and recover orchestration workflow models
titleSuffix: Foundry Tools
description: Learn how to save and recover your orchestration workflow models.
author: laujan
manager: mcleans
ms.service: azure-language-foundry-tools
ms.topic: concept-article
ms.date: 06/30/2026
ms.author: lajanuar
ms.custom:  language-service-orchestration
---
# Back up and recover your orchestration workflow models

When you create a Language resource in the Azure portal, you specify a region for it to be created in. From then on, your resource and all of the operations related to it take place in the specified Azure server region. It's rare, but not impossible, to encounter a network issue that hits an entire region. If your solution needs to always be available, then you should design it to either fail-over into another region. This process requires two Azure Language in Foundry Tools resources in different regions and the ability to sync your orchestration workflow models across regions. 

If your app or business depends on the use of an orchestration workflow model, we recommend that you create a replica of your project into another supported region. So that if a regional outage occurs, you can then access your model in the other fail-over region where you replicated your project.

Replicating a project means that you export your project metadata and assets and import them into a new project. This step only makes a copy of your project settings, intents, and utterances. You still need to [train](../how-to/build-train-deploy-model.md#train-your-model) and [deploy](../how-to/build-train-deploy-model.md#deploy-your-model) the models before you can [query them](../how-to/build-train-deploy-model.md#send-prediction-requests) with the [runtime APIs](https://aka.ms/clu-apis).


In this article, you learn to how to use the export and import APIs to replicate your project from one resource to another existing in different supported geographical regions.

##  Prerequisites

* Two Language resources in different Azure regions, each of them in a different region.

## Get your resource keys endpoint

Use the following steps to get the keys and endpoint of your primary and secondary resources.
Go to your resource overview page in the [Azure portal](https://portal.azure.com/#home). From the menu on the left side, select **Keys and Endpoint**. You will use the endpoint and key for API requests. 

A screenshot showing the key and endpoint page in the Azure portal.


> **Tip:**
> Keep a note of keys and endpoints for both primary and secondary resources. Use these values to replace the following placeholders:
`{PRIMARY-ENDPOINT}`, `{PRIMARY-RESOURCE-KEY}`, `{SECONDARY-ENDPOINT}`, and `{SECONDARY-RESOURCE-KEY}`.
> Also take note of your project name, your model name, and your deployment name. Use these values to replace the following placeholders:  `{PROJECT-NAME}`, `{MODEL-NAME}`, and `{DEPLOYMENT-NAME}`.

## Export your primary project assets

Start by exporting the project assets from the project in your primary resource.

### Submit export job

Replace the placeholders in the following request with your `{PRIMARY-ENDPOINT}` and `{PRIMARY-RESOURCE-KEY}` that you obtained in the first step.

Create a **POST** request using the following URL, headers, and JSON body to export your project.

### Request URL

Use the following URL when creating your API request. Replace the placeholder values with your own values. 

```rest
{ENDPOINT}/language/authoring/analyze-conversations/projects/{PROJECT-NAME}/:export?stringIndexType=Utf16CodeUnit&api-version={API-VERSION}
```

| Placeholder | Value | Example |
| --- | --- | --- |
| `{ENDPOINT}` | The endpoint for authenticating your API request. | `https://<your-custom-subdomain>.cognitiveservices.azure.com` |
| `{PROJECT-NAME}` | The name for your project. This value is case-sensitive. | `EmailApp` |
| `{API-VERSION}` | The [version](../../concepts/model-lifecycle.md#api-versions) of the API you're calling. | `2023-04-01` |

### Headers

Use the following header to authenticate your request. 

| Key | Value |
| --- | --- |
| `Ocp-Apim-Subscription-Key` | The key to your resource. Used for authenticating your API requests. |


Once you send your API request, you receive a `202` response indicating success. In the response headers, extract the `operation-location` value formatted like this: 

```rest
{ENDPOINT}/language/authoring/analyze-conversations/projects/{PROJECT-NAME}/jobs/{JOB-ID}?api-version={API-VERSION}
``` 

`JOB-ID` is used to identify your request, since this operation is asynchronous. Use this URL to get the exported project JSON, using the same authentication method.



### Get export job status

Replace the placeholders in the following request with your `{PRIMARY-ENDPOINT}` and `{PRIMARY-RESOURCE-KEY}` that you obtained in the first step.

Use the following **GET** request to query the status of your export job. You can use the URL you received from the previous step, or replace the placeholder values with your own values. 

```rest
{ENDPOINT}/language/authoring/analyze-conversations/projects/{PROJECT-NAME}/export/jobs/{JOB-ID}?api-version={API-VERSION}
```

| Placeholder | Value | Example |
| --- | --- | --- |
| `{ENDPOINT}` | The endpoint for authenticating your API request. | `https://<your-custom-subdomain>.cognitiveservices.azure.com` |
| `{PROJECT-NAME}` | The name for your project. This value is case-sensitive. | `myProject` |
| `{JOB-ID}` | The ID for locating your export job status. It's in the `location` header value you received in the previous step. | `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxxx` |
| `{API-VERSION}` | The [version](../../concepts/model-lifecycle.md#api-versions) of the API you're calling. | `2023-04-01` |

#### Headers

Use the following header to authenticate your request. 

| Key | Description | Value |
| --- | --- | --- |
| `Ocp-Apim-Subscription-Key` | The key to your resource. Used for authenticating your API requests. | `{YOUR-PRIMARY-RESOURCE-KEY}` |

#### Response body

```json
{
  "resultUrl": "{Endpoint}/language/authoring/analyze-conversations/projects/{PROJECT-NAME}/export/jobs/xxxxxx-xxxxx-xxxxx-xx/result?api-version={API-VERSION}",
  "jobId": "xxxx-xxxxx-xxxxx-xxx",
  "createdDateTime": "2022-04-18T15:23:07Z",
  "lastUpdatedDateTime": "2022-04-18T15:23:08Z",
  "expirationDateTime": "2022-04-25T15:23:07Z",
  "status": "succeeded"
}
```

Use the URL from the `resultUrl` key in the body and view the exported assets from this job.

### Get export results

Submit a **GET** request using the `{RESULT-URL}` you received from the previous step to view the results of the export job.

#### Headers

Use the following header to authenticate your request. 

| Key | Description | Value |
| --- | --- | --- |
| `Ocp-Apim-Subscription-Key` | The key to your resource. Used for authenticating your API requests. | `{PRIMARY-RESOURCE-KEY}` |


Copy the response body to use as the body for the next import job.

## Import to a new project 

Now go ahead and import the exported project assets in your new project in the secondary region so you can replicate it.

### Submit import job

Replace the placeholders in the following request with your `{SECONDARY-ENDPOINT}`, and `{SECONDARY-RESOURCE-KEY}` that you obtained in the first step.

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
| `{API-VERSION}` | The [version](../../concepts/model-lifecycle.md#api-versions) of the API you're calling. | `2023-04-01` |

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
| `language` | `{LANGUAGE-CODE}` | A string specifying the language code for the utterances used in your project. If your project is a multilingual project, choose the [language code](../language-support.md) for most of the utterances. | `en-us` |


### Get import job status

Replace the placeholders in the following request with your `{SECONDARY-ENDPOINT}`, and `{SECONDARY-RESOURCE-KEY}` that you obtained in the first step.

Use the following **GET** request to query the status of your import job. You can use the URL you received from the previous step, or replace the placeholder values with your own values. 

```rest
{ENDPOINT}/language/authoring/analyze-conversations/projects/{PROJECT-NAME}/import/jobs/{JOB-ID}?api-version={API-VERSION}
```

| Placeholder | Value | Example |
| --- | --- | --- |
| `{ENDPOINT}` | The endpoint for authenticating your API request. | `https://<your-custom-subdomain>.cognitiveservices.azure.com` |
| `{PROJECT-NAME}` | The name for your project. This value is case-sensitive. | `myProject` |
| `{JOB-ID}` | The ID for locating your export job status. It's in the `location` header value you received in the previous step. | `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxxx` |
| `{API-VERSION}` | The [version](../../concepts/model-lifecycle.md#api-versions) of the API you're calling. | `2023-04-01` |

#### Headers

Use the following header to authenticate your request. 

| Key | Description | Value |
| --- | --- | --- |
| `Ocp-Apim-Subscription-Key` | The key to your resource. Used for authenticating your API requests. | `{YOUR-PRIMARY-RESOURCE-KEY}` |

#### Response body

Once you send the request, you get the following response. Keep polling this endpoint until the status parameter changes to "succeeded".


```json
{
  "jobId": "xxxxx-xxxxx-xxxx-xxxxx",
  "createdDateTime": "2022-04-18T15:17:20Z",
  "lastUpdatedDateTime": "2022-04-18T15:17:22Z",
  "expirationDateTime": "2022-04-25T15:17:20Z",
  "status": "succeeded"
}
```




## Train your model

After importing your project, you only copied the project's assets and metadata and assets. You still need to train your model, which incurs usage on your account. 

### Submit training job

Replace the placeholders in the following request with your `{SECONDARY-ENDPOINT}`, and `{SECONDARY-RESOURCE-KEY}` that you obtained in the first step.

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
| `{API-VERSION}` | The [version](../../concepts/model-lifecycle.md#api-versions) of the API you're calling. | `2023-04-01` |

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
| `trainingConfigVersion` | `{CONFIG-VERSION}` | The training configuration model version. By default, the latest [model version](../../concepts/model-lifecycle.md) is used. | `2022-05-01` |
| `kind` | `percentage` | Split methods. Possible values are `percentage` or `manual`. For more information, see [how to train a model](../how-to/build-train-deploy-model.md#train-your-model). | `percentage` |
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

Replace the placeholders in the following request with your `{SECONDARY-ENDPOINT}`, and `{SECONDARY-RESOURCE-KEY}` that you obtained in the first step.

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
| `{API-VERSION}` | The [version](../../concepts/model-lifecycle.md#api-versions) of the API you're calling. | `2023-04-01` |

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
| `trainingConfigVersion` | The training configuration version. By default, the [latest version](../../concepts/model-lifecycle.md#choose-the-model-version-used-on-your-data) is used. | `2022-05-01` |
| `startDateTime` | The time training started | `2022-04-14T10:23:04.2598544Z` |
| `status` | The status of the training job | `running` |
| `estimatedEndDateTime` | Estimated time for the training job to finish | `2022-04-14T10:29:38.2598544Z` |
| `jobId` | Your training job ID | `xxxxx-xxxx-xxxx-xxxx-xxxxxxxxx` |
| `createdDateTime` | Training job creation date and time | `2022-04-14T10:22:42Z` |
| `lastUpdatedDateTime` | Training job last updated date and time | `2022-04-14T10:23:45Z` |
| `expirationDateTime` | Training job expiration date and time | `2022-04-14T10:22:42Z` |


## Deploy your model

This step makes your trained model available form consumption via the [runtime prediction API](https://aka.ms/ct-runtime-swagger). 

> **Tip:**
> Use the same deployment name as your primary project for easier maintenance and minimal changes to your system to handle redirecting your traffic.

### Submit deployment job 

Replace the placeholders in the following request with your `{SECONDARY-ENDPOINT}`, and `{SECONDARY-RESOURCE-KEY}` that you obtained in the first step.

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
| `{API-VERSION}` | The [version](../../concepts/model-lifecycle.md#api-versions) of the API you're calling. | `2023-04-01` |

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


### Get the deployment status

Replace the placeholders in the following request with your `{SECONDARY-ENDPOINT}`, and `{SECONDARY-RESOURCE-KEY}` that you obtained in the first step.

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
| `{API-VERSION}` | The [version](../../concepts/model-lifecycle.md#api-versions) of the API you're calling. | `2023-04-01` |

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


## Changes in calling the runtime

Within your system, at the step where you call [runtime API](https://aka.ms/clu-apis) check for the response code returned from the submitted task API. If you observe a **consistent** failure in submitting the request, it could indicate an outage in your primary region. Failure once doesn't mean an outage—it may be transient issue. Retry submitting the job through the secondary resource you create. For the second request use your `{YOUR-SECONDARY-ENDPOINT}` and secondary key, if you followed the steps, `{PROJECT-NAME}` and `{DEPLOYMENT-NAME}` would be the same so no changes are required to the request body. 

In case you revert to using your secondary resource you may observe slight increase in latency because of the difference in regions where your model is deployed. 

## Check if your projects are out of sync

Maintaining the freshness of both projects is an important part of process. You need to frequently check if any updates were made to your primary project so that you move them over to your secondary project. This way if your primary region fail and you move into the secondary region you should expect similar model performance since it already contains the latest updates. Setting the frequency of checking if your projects are in sync is an important choice, we recommend that you do this check daily in order to guarantee the freshness of data in your secondary model.

### Get project details

Use the following url to get your project details, one of the keys returned in the body indicates the last modified date of the project. 
Repeat the following step twice—once for your primary project and again for your secondary project. Compare the timestamp returned for both of them to check if they're out of sync.

Use the following **GET** request to get your project details. You can use the URL you received from the previous step, or replace the placeholder values with your own values. 

```rest
{ENDPOINT}/language/authoring/analyze-conversations/projects/{PROJECT-NAME}?api-version={API-VERSION}
```

| Placeholder | Value | Example |
| --- | --- | --- |
| `{ENDPOINT}` | The endpoint for authenticating your API request. | `https://<your-custom-subdomain>.cognitiveservices.azure.com` |
| `{PROJECT-NAME}` | The name for your project. This value is case-sensitive. | `myProject` |
| `{API-VERSION}` | The [version](../../concepts/model-lifecycle.md#api-versions) of the API you're calling. | `2023-04-01` |

#### Headers

Use the following header to authenticate your request. 

| Key | Description | Value |
| --- | --- | --- |
| `Ocp-Apim-Subscription-Key` | The key to your resource. Used for authenticating your API requests. | `{YOUR-PRIMARY-RESOURCE-KEY}` |

#### Response body

```json
{
  "createdDateTime": "2022-04-18T13:53:03Z",
  "lastModifiedDateTime": "2022-04-18T13:53:03Z",
  "lastTrainedDateTime": "2022-04-18T14:14:28Z",
  "lastDeployedDateTime": "2022-04-18T14:49:01Z",
  "projectKind": "Orchestration",
  "projectName": "{PROJECT-NAME}",
  "description": "This is a sample Orchestration project.",
  "language": "{LANGUAGE-CODE}"
}
```
 

Repeat the same steps for your replicated project using `{SECONDARY-ENDPOINT}`, and `{SECONDARY-RESOURCE-KEY}`. Compare the returned `lastModifiedDateTime` from both projects. If your primary project was modified sooner than your secondary one, you need to repeat the steps of [exporting](#export-your-primary-project-assets), [importing](#import-to-a-new-project), [training](#train-your-model), and [deploying](#deploy-your-model) your model.

## Next steps

In this article, you learned how to use the export and import APIs to replicate your project to a secondary Language resource in other region. Next, explore the API reference docs to see what else you can do with authoring APIs.

* [Authoring REST API reference](https://aka.ms/clu-authoring-apis)

* [Runtime prediction REST API reference](https://aka.ms/clu-apis)
