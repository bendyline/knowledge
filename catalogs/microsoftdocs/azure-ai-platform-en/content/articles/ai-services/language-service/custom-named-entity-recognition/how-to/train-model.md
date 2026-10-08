---
title: How to train your Custom Named Entity Recognition (NER) model
titleSuffix: Foundry Tools
description: Learn about how to train your model for Custom Named Entity Recognition (NER).
author: laujan
manager: mcleans
ms.service: azure-language-foundry-tools
ms.topic: how-to
ms.date: 08/08/2026
ms.author: lajanuar
ai-usage: ai-assisted
ms.custom: language-service-custom-ner
---
# Train your custom named entity recognition model

Training is the process where the model learns from your [labeled data](tag-data.md). After training is completed, you'll be able to view the [model's performance](view-model-evaluation.md) to determine if you need to improve your model.

To train a model, you start a training job and only successfully completed jobs create a model. Training jobs expire after seven days, which means you won't be able to retrieve the job details after this time. If your training job completed successfully and a model was created, the model isn't affected. You can only have one training job running at a time, and you can't start other jobs in the same project. 

The training times vary. Training can be anywhere from a few minutes, when dealing with few documents, or several hours, depending on the dataset size and the complexity of your schema.


## Prerequisites

* A successfully [created project](create-project.md) with a configured Azure blob storage account
* Text data [uploaded](design-schema.md#data-preparation) to your storage account.
* [Labeled data](tag-data.md)

See the [project development lifecycle](../overview.md#project-development-lifecycle).

## Data splitting

Before you start the training process, labeled documents in your project are divided into a training set and a testing set. Each one of them serves a different function.
The **training set** is used in training the model. It's the set from which the model learns the labeled entities and what spans of text are to be extracted as entities. 
The **testing set** is a blind set that isn't introduced to the model during training but only during evaluation. 
After model training is completed successfully, the model is used to make predictions from the test documents and [evaluation metrics](../concepts/evaluation-metrics.md) are calculated. 
We recommend that you make sure that all your entities are adequately represented in both the training and testing set.

Custom NER supports two methods for data splitting:

* **Automatically splitting the testing set from training data**: The system splits your labeled data between the training and testing sets, according to the percentages you choose. The recommended percentage split is 80% for training and 20% for testing. 

 > **Note:**
 > If you choose the **Automatically splitting the testing set from training data** option, only the data assigned to a training set is split according to the percentages provided.

* **Use a manual split of training and testing data**: This method enables users to define which labeled documents should belong to which set. This step is only enabled if you added documents to your testing set during [data labeling](tag-data.md).

## Train model (REST API)

Once you have labeled your data and configured your data split settings, you can start training your custom NER model using the REST API. The training process involves submitting a training job request and monitoring its progress until completion. This section provides the API calls needed to initiate training and check the status of your training job.

### Start training job

Submit a **POST** request using the following URL, headers, and JSON body to submit a training job. Replace the placeholder values with your own values. 

```rest
{ENDPOINT}/language/authoring/analyze-text/projects/{PROJECT-NAME}/:train?api-version={API-VERSION}
```

| Placeholder | Value | Example |
| --- | --- | --- |
| `{ENDPOINT}` | The endpoint for authenticating your API request. | `https://<your-custom-subdomain>.cognitiveservices.azure.com` |
| `{PROJECT-NAME}` | The name of your project. This value is case-sensitive. | `myProject` |
| `{API-VERSION}` | The version of the API you're calling. The value referenced is for the latest version released. For more information, *see* [Model lifecycle](../../concepts/model-lifecycle.md#choose-the-model-version-used-on-your-data). | `2022-05-01` |

#### Headers

Use the following header to authenticate your request.

| Key | Value |
| --- | --- |
| `Ocp-Apim-Subscription-Key` | The key to your resource. Used for authenticating your API requests. |

#### Request body

Use the following JSON in your request body. The model is given as the `{MODEL-NAME}` once training is complete. Only successful training jobs produce models.


```json
{
    "modelLabel": "{MODEL-NAME}",
    "trainingConfigVersion": "{CONFIG-VERSION}",
    "evaluationOptions": {
        "kind": "percentage",
        "trainingSplitPercentage": 80,
        "testingSplitPercentage": 20
    }
}
```

| Key | Placeholder | Value | Example |
| --- | --- | --- | --- |
| modelLabel | `{MODEL-NAME}` | The model name that is assigned to your model once trained successfully. | `myModel` |
| trainingConfigVersion | `{CONFIG-VERSION}` | This is the [model version](../../concepts/model-lifecycle.md) used to train the model. | `2022-05-01` |
| evaluationOptions |  | Option to split your data across training and testing sets. | `{}` |
| kind | `percentage` | Split methods. Possible values are `percentage` or `manual`. For more information, *see* [How to train a model](train-model.md#data-splitting). | `percentage` |
| trainingSplitPercentage | `80` | Percentage of your tagged data to be included in the training set. Recommended value is `80`. | `80` |
| testingSplitPercentage | `20` | Percentage of your tagged data to be included in the testing set. Recommended value is `20`. | `20` |

  > **Note:**
  > The `trainingSplitPercentage` and `testingSplitPercentage` are only required if `Kind` is set to `percentage` and the sum of both percentages should be equal to 100.

Once you send your API request, you receive a `202` response indicating that the job was submitted correctly. In the response headers, extract the `location` value formatted like this: 

```rest
{ENDPOINT}/language/authoring/analyze-text/projects/{PROJECT-NAME}/train/jobs/{JOB-ID}?api-version={API-VERSION}
```

`{JOB-ID}` is used to identify your request, since this operation is asynchronous. You can use this URL to get the training status.


### Get training job status (REST API)

Training can take some time, depending on the size of your training data and complexity of your schema. You can use the following request to keep polling the status of the training job until successful completion.

 Use the following **GET** request to get the status of your model's training progress. Replace the placeholder values with your own values. 

### Request URL

```rest
{ENDPOINT}/language/authoring/analyze-text/projects/{PROJECT-NAME}/train/jobs/{JOB-ID}?api-version={API-VERSION}
```

| Placeholder | Value | Example |
| --- | --- | --- |
| `{ENDPOINT}` | The endpoint for authenticating your API request. | `https://<your-custom-subdomain>.cognitiveservices.azure.com` |
| `{PROJECT-NAME}` | The name of your project. This value is case-sensitive. | `myProject` |
| `{JOB-ID}` | The ID for locating your model's training status. This value is in the `location` header value you received in the previous step. | `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxxx` |
| `{API-VERSION}` | The version of the API you're calling. The value referenced is for the latest version released. For more information, *see* [Model lifecycle](../../concepts/model-lifecycle.md#choose-the-model-version-used-on-your-data). | `2022-05-01` |

#### Headers

Use the following header to authenticate your request. 

| Key | Value |
| --- | --- |
| `Ocp-Apim-Subscription-Key` | The key to your resource. Used for authenticating your API requests. |

#### Response Body

Once you send the request, you get the following response. 

```json
{
  "result": {
    "modelLabel": "{MODEL-NAME}",
    "trainingConfigVersion": "{CONFIG-VERSION}",
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
  "jobId": "{JOB-ID}",
  "createdDateTime": "2022-04-18T15:44:44Z",
  "lastUpdatedDateTime": "2022-04-18T15:45:48Z",
  "expirationDateTime": "2022-04-25T15:44:44Z",
  "status": "running"
}

```



### Cancel training job (REST API)

If you need to stop a training job that's currently in progress, you can cancel it using the REST API. Canceling a training job is useful when you discover an issue with your data or configuration and want to make corrections before restarting the training process.

Create a **POST** request by using the following URL, headers, and JSON body to cancel a training job. 

### Request URL

Use the following URL when creating your API request. Replace the placeholder values with your own values. 

```rest
{Endpoint}/language/authoring/analyze-text/projects/{PROJECT-NAME}/train/jobs/{JOB-ID}/:cancel?api-version={API-VERSION}
```

| Placeholder | Value | Example |
| --- | --- | --- |
| `{ENDPOINT}` | The endpoint for authenticating your API request. | `https://<your-custom-subdomain>.cognitiveservices.azure.com` |
| `{PROJECT-NAME}` | The name for your project. This value is case-sensitive. | `EmailApp` |
| `{JOB-ID}` | This value is the training job ID. | `XXXXX-XXXXX-XXXX-XX` |
| `{API-VERSION}` | The version of the API you're calling. The value referenced is for the latest released [model version](../../concepts/model-lifecycle.md#choose-the-model-version-used-on-your-data). | `2022-05-01` |

### Headers

Use the following header to authenticate your request. 

| Key | Value |
| --- | --- |
| `Ocp-Apim-Subscription-Key` | The key to your resource. Used for authenticating your API requests. |
 
After you send your API request, you receive a 202 response with an `Operation-Location` header used to check the status of the job.


## Next steps

After training is completed, you'll be able to view [model performance](view-model-evaluation.md) to optionally improve your model if needed. Once you're satisfied with your model, you can deploy it, making it available to use for [extracting entities](call-api.md) from text.
