---
title: Back up and recover your custom text classification models
titleSuffix: Foundry Tools
description: Learn how to save and recover your custom text classification models.
#services: cognitive-services
author: laujan
manager: mcleans
ms.service: azure-language-foundry-tools
ms.topic: how-to
ms.date: 06/30/2026
ms.author: lajanuar
ms.custom: language-service-custom-classification
---
# Back up and recover your custom text classification models

When you create a Language resource, you specify a region for it to be created in. From then on, your resource and all of the operations related to it take place in the specified Azure server region. It's rare, but not impossible, to encounter a network issue that hits an entire region. If your solution needs to always be available, then you should design it to either fail-over into another region. Fail-over requires two Azure Language in Foundry Tools resources in different regions and the ability to sync custom models across regions. 

If your app or business depends on the use of a custom text classification model, we recommend that you create a replica of your project into another supported region. So that if a regional outage occurs, you can then access your model in the other fail-over region where you replicated your project.

Replicating a project means that you export your project metadata and assets and import them into a new project. Replication only makes a copy of your project settings and tagged data. You still need to [train](how-to/build-train-deploy-model.md#train-your-model) and [deploy](how-to/build-train-deploy-model.md#deploy-your-model) the models to be available for use with [prediction APIs](https://aka.ms/ct-runtime-swagger).

In this article, you learn to how to use the export and import APIs to replicate your project from one resource to another existing in different supported geographical regions. We also provide guidance for keeping your projects in sync and the updates needed for your runtime consumption.

##  Prerequisites

* Two Language resources in different Azure regions. [Create a Language resource](how-to/create-project.md#create-a-language-resource) and connect them to an Azure storage account. We recommend that you connect both of your Language resources to the same storage account. Although this step might introduce slightly higher latency when importing your project, and training a model.

## Get your resource keys endpoint

Use the following steps to get the keys and endpoint of your primary and secondary resources.

* Go to your resource overview page in the [Azure portal](https://portal.azure.com/#home)

* From the menu on the left side, select **Keys and Endpoint**. The endpoint and key are used for API requests.

Screenshot that shows the key and endpoint page in the Azure portal.


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
{ENDPOINT}/language/authoring/analyze-text/projects/{PROJECT-NAME}/:export?stringIndexType=Utf16CodeUnit&api-version={API-VERSION}
```

| Placeholder | Value | Example |
| --- | --- | --- |
| `{ENDPOINT}` | The endpoint for authenticating your API request. | `https://<your-custom-subdomain>.cognitiveservices.azure.com` |
| `{PROJECT-NAME}` | The name for your project. This value is case-sensitive. | `MyProject` |
| `{API-VERSION}` | The version of the API you're calling. The value referenced is the latest [model version](../concepts/model-lifecycle.md#choose-the-model-version-used-on-your-data) released. | `2022-05-01` |

### Headers

Use the following header to authenticate your request. 

| Key | Value |
| --- | --- |
| `Ocp-Apim-Subscription-Key` | The key to your resource. Used for authenticating your API requests. |

#### Body

Use the following JSON in your request body specifying that you want to export all the assets.

```json
{
  "assetsToExport": ["*"]
}
```

Once you send your API request, you receive a `202` response indicating that the job was submitted correctly. In the response headers, extract the `operation-location` value formatted like this: 

```rest
{ENDPOINT}/language/authoring/analyze-text/projects/{PROJECT-NAME}/export/jobs/{JOB-ID}?api-version={API-VERSION}
``` 

`{JOB-ID}` is used to identify your request, since this operation is asynchronous. Use this URL to get the export job status.


### Get export job status

Replace the placeholders in the following request with your `{PRIMARY-ENDPOINT}` and `{PRIMARY-RESOURCE-KEY}` that you obtained in the first step.

Use the following **GET** request to get the status of exporting your project assets. Replace the placeholder values with your own values. 

### Request URL

```rest
{ENDPOINT}/language/authoring/analyze-text/projects/{PROJECT-NAME}/export/jobs/{JOB-ID}?api-version={API-VERSION}
``` 

| Placeholder | Value | Example |
| --- | --- | --- |
| `{ENDPOINT}` | The endpoint for authenticating your API request. | `https://<your-custom-subdomain>.cognitiveservices.azure.com` |
| `{PROJECT-NAME}` | The name of your project. This value is case-sensitive. | `myProject` |
| `{JOB-ID}` | The ID for locating your model's training status. It's in the `location` header value you received in the previous step. | `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxxx` |
| `{API-VERSION}` | The version of the API you're calling. The value referenced is for the latest version released. Learn more about other available [API versions](../concepts/model-lifecycle.md#choose-the-model-version-used-on-your-data) | `2022-05-01` |

### Headers

Use the following header to authenticate your request. 

| Key | Value |
| --- | --- |
| `Ocp-Apim-Subscription-Key` | The key to your resource. Used for authenticating your API requests. |

### Response body

```json
{
  "resultUrl": "{RESULT-URL}",
  "jobId": "string",
  "createdDateTime": "2021-10-19T23:24:41.572Z",
  "lastUpdatedDateTime": "2021-10-19T23:24:41.572Z",
  "expirationDateTime": "2021-10-19T23:24:41.572Z",
  "status": "unknown",
  "errors": [
    {
      "code": "unknown",
      "message": "string"
    }
  ]
}
```

Use the url from the `resultUrl` key in the body and view the exported assets from this job.

### Get export results

Submit a **GET** request using the `{RESULT-URL}` you received from the previous step to view the results of the export job.

#### Headers

Use the following header to authenticate your request. 

| Key | Value |
| --- | --- |
| `Ocp-Apim-Subscription-Key` | The key to your resource. Used for authenticating your API requests. |


Copy the response body to use as the body for the next import job.

## Import to a new project 

Now go ahead and import the exported project assets in your new project in the secondary region so you can replicate it.

### Submit import job

Replace the placeholders in the following request with your `{SECONDARY-ENDPOINT}`, and `{SECONDARY-RESOURCE-KEY}` that you obtained in the first step.

Submit a **POST** request using the following URL, headers, and JSON body to import your labels file. Make sure that your labels file follow the [accepted format](concepts/evaluation-metrics.md#accepted-data-formats).

If a project with the same name already exists, the data of that project is replaced.

```rest
{Endpoint}/language/authoring/analyze-text/projects/{projectName}/:import?api-version={API-VERSION}
```

| Placeholder | Value | Example |
| --- | --- | --- |
| `{ENDPOINT}` | The endpoint for authenticating your API request. | `https://<your-custom-subdomain>.cognitiveservices.azure.com` |
| `{PROJECT-NAME}` | The name for your project. This value is case-sensitive. | `myProject` |
| `{API-VERSION}` | The version of the API you're calling. The value referenced is for the latest version released. Learn more about other available [API versions](../concepts/model-lifecycle.md#choose-the-model-version-used-on-your-data) | `2022-05-01` |

### Headers

Use the following header to authenticate your request. 

| Key | Value |
| --- | --- |
| `Ocp-Apim-Subscription-Key` | The key to your resource. Used for authenticating your API requests. |


### Body

Use the following JSON in your request. Replace the placeholder values with your own values. 

# [Multi label classification](#tab/multi-classification)

```json
{
  "projectFileVersion": "{API-VERSION}",
  "stringIndexType": "Utf16CodeUnit",
  "metadata": {
    "projectName": "{PROJECT-NAME}",
    "storageInputContainerName": "{CONTAINER-NAME}",
    "projectKind": "customMultiLabelClassification",
    "description": "Trying out custom multi label text classification",
    "language": "{LANGUAGE-CODE}",
    "multilingual": true,
    "settings": {}
  },
  "assets": {
    "projectKind": "customMultiLabelClassification",
    "classes": [
      {
        "category": "Class1"
      },
      {
        "category": "Class2"
      }
    ],
    "documents": [
      {
        "location": "{DOCUMENT-NAME}",
        "language": "{LANGUAGE-CODE}",
        "dataset": "{DATASET}",
        "classes": [
          {
            "category": "Class1"
          },
          {
            "category": "Class2"
          }
        ]
      },
      {
        "location": "{DOCUMENT-NAME}",
        "language": "{LANGUAGE-CODE}",
        "dataset": "{DATASET}",
        "classes": [
          {
            "category": "Class2"
          }
        ]
      }
    ]
  }
}

```
| Key | Placeholder | Value | Example |
| --- | --- | --- | --- |
| api-version | `{API-VERSION}` | The version of the API you're calling. The version used here must be the same API version in the URL. Learn more about other available [API versions](../concepts/model-lifecycle.md#choose-the-model-version-used-on-your-data) | `2022-05-01` |
| projectName | `{PROJECT-NAME}` | The name of your project. This value is case-sensitive. | `myProject` |
| projectKind | `customMultiLabelClassification` | Your project kind. | `customMultiLabelClassification` |
| language | `{LANGUAGE-CODE}` | A string specifying the language code for the documents used in your project. If your project is a multilingual project, choose the language code for most of the documents. See [language support](language-support.md#multi-lingual-option) to learn more about multilingual support. | `en-us` |
| multilingual | `true` | A boolean value that enables you to have documents in multiple languages in your dataset and when your model is deployed you can query the model in any supported language (not necessarily included in your training documents. See [language support](language-support.md#multi-lingual-option) to learn more about multilingual support. | `true` |
| storageInputContainerName | `{CONTAINER-NAME}` | The name of your Azure storage container for your uploaded documents. | `myContainer` |
| classes | [] | Array containing all the classes you have in the project. | [] |
| documents | [] | Array containing all the documents in your project and what the classes labeled for this document. | [] |
| location | `{DOCUMENT-NAME}` | The location of the documents in the storage container. Since all the documents are in the root of the container, it should be the document name. | `doc1.txt` |
| dataset | `{DATASET}` | The test set to which this document goes to when split before training. See [How to train a model](how-to/build-train-deploy-model.md#data-splitting). Possible values for this field are `Train` and `Test`. | `Train` |


# [Single label classification](#tab/single-classification)

```json
{
  "projectFileVersion": "{API-VERSION}",
  "stringIndexType": "Utf16CodeUnit",
  "metadata": {
    "projectName": "{PROJECT-NAME}",
    "storageInputContainerName": "{CONTAINER-NAME}",
    "projectKind": "customSingleLabelClassification",
    "description": "Trying out custom multi label text classification",
    "language": "{LANGUAGE-CODE}",
    "multilingual": true,
    "settings": {}
  },
  "assets": {
    "projectKind": "customSingleLabelClassification",
        "classes": [
            {
                "category": "Class1"
            },
            {
                "category": "Class2"
            }
        ],
        "documents": [
            {
                "location": "{DOCUMENT-NAME}",
                "language": "{LANGUAGE-CODE}",
                "dataset": "{DATASET}",
                "class": {
                    "category": "Class2"
                }
            },
            {
                "location": "{DOCUMENT-NAME}",
                "language": "{LANGUAGE-CODE}",
                "dataset": "{DATASET}",
                "class": {
                    "category": "Class1"
                }
            }
        ]
    }
}
```
| Key | Placeholder | Value | Example |
| --- | --- | --- | --- |
| api-version | `{API-VERSION}` | The version of the API you're calling. The version used here must be the same API version in the URL. | `2022-05-01` |
| projectName | `{PROJECT-NAME}` | The name of your project. This value is case-sensitive. | `myProject` |
| projectKind | `customSingleLabelClassification` | Your project kind. | `customSingleLabelClassification` |
| language | `{LANGUAGE-CODE}` | A string specifying the language code for the documents used in your project. If your project is a multilingual project, choose the language code for most of the documents. See [language support](language-support.md) to learn more about supported language codes. | `en-us` |
| multilingual | `true` | A boolean value that enables you to have documents in multiple languages in your dataset and when your model is deployed you can query the model in any supported language (not necessarily included in your training documents. See [language support](language-support.md#multi-lingual-option) to learn more about multilingual support. | `true` |
| storageInputContainerName | `{CONTAINER-NAME}` | The name of your Azure storage container for your uploaded documents. | `myContainer` |
| classes | [] | Array containing all the classes you have in the project. | [] |
| documents | [] | Array containing all the documents in your project and which class this document belongs to. | [] |
| location | `{DOCUMENT-NAME}` | The location of the documents in the storage container. Since all the documents are in the root of the container, it should be the document name. | `doc1.txt` |
| dataset | `{DATASET}` | The test set to which this document goes to when split before training. See [How to train a model](how-to/build-train-deploy-model.md#data-splitting) to learn more about data splitting. Possible values for this field are `Train` and `Test`. | `Train` |

---

Once you send your API request, you receive a `202` response indicating that the job was submitted correctly. In the response headers, extract the `operation-location` value formatted like this: 

```rest
{ENDPOINT}/language/authoring/analyze-text/projects/{PROJECT-NAME}/import/jobs/{JOB-ID}?api-version={API-VERSION}
``` 

`{JOB-ID}` is used to identify your request, since this operation is asynchronous. You use this URL to get the import job status.

Possible error scenarios for this request:

* The selected resource doesn't have [proper permissions](how-to/create-project.md#using-a-preexisting-language-resource) for the storage account.
* The `storageInputContainerName` specified doesn't exist.
* Invalid language code is used, or if the language code type isn't string.
* `multilingual` value is a string and not a boolean.


### Get import job status

Replace the placeholders in the following request with your `{SECONDARY-ENDPOINT}`, and `{SECONDARY-RESOURCE-KEY}` that you obtained in the first step.

Use the following **GET** request to get the status of your importing your project. Replace the placeholder values with your own values. 

### Request URL

```rest
{ENDPOINT}/language/authoring/analyze-text/projects/{PROJECT-NAME}/import/jobs/{JOB-ID}?api-version={API-VERSION}
``` 

| Placeholder | Value | Example |
| --- | --- | --- |
| `{ENDPOINT}` | The endpoint for authenticating your API request. | `https://<your-custom-subdomain>.cognitiveservices.azure.com` |
| `{PROJECT-NAME}` | The name of your project. This value is case-sensitive. | `myProject` |
| `{JOB-ID}` | The ID for locating your model's training status. This value is in the `location` header value you received in the previous step. | `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxxx` |
| `{API-VERSION}` | The version of the API you're calling. The value referenced is for the latest version released. Learn more about other available [API versions](../concepts/model-lifecycle.md#choose-the-model-version-used-on-your-data) | `2022-05-01` |

#### Headers

Use the following header to authenticate your request. 

| Key | Value |
| --- | --- |
| `Ocp-Apim-Subscription-Key` | The key to your resource. Used for authenticating your API requests. |



## Train your model

After importing your project, you only copied the project's assets and metadata and assets. You still need to train your model, which incurs usage on your account. 

### Submit training job

Replace the placeholders in the following request with your `{SECONDARY-ENDPOINT}`, and `{SECONDARY-RESOURCE-KEY}` that you obtained in the first step.

Submit a **POST** request using the following URL, headers, and JSON body to submit a training job. Replace the placeholder values with your own values. 

```rest
{ENDPOINT}/language/authoring/analyze-text/projects/{PROJECT-NAME}/:train?api-version={API-VERSION}
```

| Placeholder | Value | Example |
| --- | --- | --- |
| `{ENDPOINT}` | The endpoint for authenticating your API request. | `https://<your-custom-subdomain>.cognitiveservices.azure.com` |
| `{PROJECT-NAME}` | The name of your project. This value is case-sensitive. | `myProject` |
| `{API-VERSION}` | The version of the API you're calling. The value referenced is for the latest version released. Learn more about other available [API versions](../concepts/model-lifecycle.md#choose-the-model-version-used-on-your-data) | `2022-05-01` |

#### Headers

Use the following header to authenticate your request. 

| Key | Value |
| --- | --- |
| `Ocp-Apim-Subscription-Key` | The key to your resource. Used for authenticating your API requests. |

#### Request body

Use the following JSON in your request body. The model will be given the `{MODEL-NAME}` once training is complete. Only successful training jobs will produce models. 


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
| trainingConfigVersion | `{CONFIG-VERSION}` | This is the [model version](../concepts/model-lifecycle.md) used to train the model. | `2022-05-01` |
| evaluationOptions |  | Option to split your data across training and testing sets. | `{}` |
| kind | `percentage` | Split methods. Possible values are `percentage` or `manual`. See [How to train a model](how-to/build-train-deploy-model.md#data-splitting) for more information. | `percentage` |
| trainingSplitPercentage | `80` | Percentage of your tagged data to be included in the training set. Recommended value is `80`. | `80` |
| testingSplitPercentage | `20` | Percentage of your tagged data to be included in the testing set. Recommended value is `20`. | `20` |

  > **Note:**
  > The `trainingSplitPercentage` and `testingSplitPercentage` are only required if `Kind` is set to `percentage` and the sum of both percentages should be equal to 100.

Once you send your API request, you receive a `202` response indicating that the job was submitted correctly. In the response headers, extract the `location` value formatted like this: 

```rest
{ENDPOINT}/language/authoring/analyze-text/projects/{PROJECT-NAME}/train/jobs/{JOB-ID}?api-version={API-VERSION}
``` 

{JOB-ID} is used to identify your request, since this operation is asynchronous. You can use this URL to get the training status.  



### Get Training Status

Replace the placeholders in the following request with your `{SECONDARY-ENDPOINT}`, and `{SECONDARY-RESOURCE-KEY}` that you obtained in the first step.

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
| `{API-VERSION}` | The version of the API you're calling. The value referenced is for the latest version released. For more information, *see* [Model lifecycle](../concepts/model-lifecycle.md#choose-the-model-version-used-on-your-data). | `2022-05-01` |

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


## Deploy your model

Deployment is the step where you make your trained model available form consumption via the [runtime prediction API](https://aka.ms/ct-runtime-swagger). 

> **Tip:**
> Use the same deployment name as your primary project for easier maintenance and minimal changes to your system to handle redirecting your traffic.

### Submit deployment job 

Replace the placeholders in the following request with your `{SECONDARY-ENDPOINT}`, and `{SECONDARY-RESOURCE-KEY}` that you obtained in the first step.

Submit a **PUT** request using the following URL, headers, and JSON body to submit a deployment job. Replace the placeholder values with your own values. 

```rest
{Endpoint}/language/authoring/analyze-text/projects/{projectName}/deployments/{deploymentName}?api-version={API-VERSION}
```

| Placeholder | Value | Example |
| --- | --- | --- |
| `{ENDPOINT}` | The endpoint for authenticating your API request. | `https://<your-custom-subdomain>.cognitiveservices.azure.com` |
| `{PROJECT-NAME}` | The name of your project. This value is case-sensitive. | `myProject` |
| `{DEPLOYMENT-NAME}` | The name of your deployment. This value is case-sensitive. | `staging` |
| `{API-VERSION}` | The version of the API you're calling. The value referenced is for the latest version released. Learn more about other available [API versions](../concepts/model-lifecycle.md#choose-the-model-version-used-on-your-data) | `2022-05-01` |

#### Headers

Use the following header to authenticate your request. 

| Key | Value |
| --- | --- |
| `Ocp-Apim-Subscription-Key` | The key to your resource. Used for authenticating your API requests. |

#### Request body

Use the following JSON in the body of your request. Use the name of the model you to assign to the deployment.  

```json
{
  "trainedModelLabel": "{MODEL-NAME}"
}
```

| Key | Placeholder | Value | Example |
| --- | --- | --- | --- |
| trainedModelLabel | `{MODEL-NAME}` | The model name that is assigned to your deployment. You can only assign successfully trained models. This value is case-sensitive. | `myModel` |

Once you send your API request, you receive a `202` response indicating that the job was submitted correctly. In the response headers, extract the `operation-location` value formatted like this: 

```rest
{ENDPOINT}/language/authoring/analyze-text/projects/{PROJECT-NAME}/deployments/{DEPLOYMENT-NAME}/jobs/{JOB-ID}?api-version={API-VERSION}
``` 

{JOB-ID} is used to identify your request, since this operation is asynchronous. You can use this URL to get the deployment status.  


### Get the deployment status

Replace the placeholders in the following request with your `{SECONDARY-ENDPOINT}`, and `{SECONDARY-RESOURCE-KEY}` that you obtained in the first step.

Use the following **GET** request to query the status of the deployment job. You can use the URL you received from the previous step, or replace the placeholder values with your own values. 

```rest
{ENDPOINT}/language/authoring/analyze-text/projects/{PROJECT-NAME}/deployments/{DEPLOYMENT-NAME}/jobs/{JOB-ID}?api-version={API-VERSION}
```

| Placeholder | Value | Example |
| --- | --- | --- |
| `{ENDPOINT}` | The endpoint for authenticating your API request. | `https://<your-custom-subdomain>.cognitiveservices.azure.com` |
| `{PROJECT-NAME}` | The name of your project. This value is case-sensitive. | `myProject` |
| `{DEPLOYMENT-NAME}` | The name of your deployment. This value is case-sensitive. | `staging` |
| `{JOB-ID}` | The ID for locating your model's training status. It's in the `location` header value you received in the previous step. | `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxxx` |
| `{API-VERSION}` | The version of the API you're calling. The value referenced is for the latest version released. Learn more about other available [API versions](../concepts/model-lifecycle.md#choose-the-model-version-used-on-your-data) | `2022-05-01` |

#### Headers

Use the following header to authenticate your request. 

| Key | Value |
| --- | --- |
| `Ocp-Apim-Subscription-Key` | The key to your resource. Used for authenticating your API requests. |


### Response Body

Once you send the request, you get the following response. Keep polling this endpoint until the **status** parameter changes to "succeeded". You should get a `200` code to indicate the success of the request. 

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

Within your system, at the step where you call [runtime prediction API](https://aka.ms/ct-runtime-swagger) check for the response code returned from the submitted task API. If you observe a **consistent** failure in submitting the request, it could indicate an outage in your primary region. Failure once doesn't mean an outage; it may be transient issue. Retry submitting the job through the secondary resource you created. For the second request use your `{SECONDARY-ENDPOINT}`, and `{SECONDARY-RESOURCE-KEY}`, if you followed the previous steps, `{PROJECT-NAME}` and `{DEPLOYMENT-NAME}` would be the same so no changes are required to the request body. 

In case you revert to using your secondary resource you can observe slight increase in latency because of the difference in regions where your model is deployed. 

## Check if your projects are out of sync

Maintaining the freshness of both projects is an important part of process. You need to frequently check if any updates were made to your primary project so that you move them over to your secondary project. This way if your primary region fail and you move into the secondary region you should expect similar model performance since it already contains the latest updates. Setting the frequency of checking if your projects are in sync is an important choice, we recommend that you do this check daily in order to guarantee the freshness of data in your secondary model.

### Get project details

Use the following url to get your project details, one of the keys returned in the body indicates the last modified date of the project. 
Repeat the following step twice: once for your primary project, and again for your secondary project. Compare the timestamp returned for both to check if they're out of sync.

Use the following **GET** request to get your project details. Replace the placeholder values with your own values. 

```rest
{ENDPOINT}/language/authoring/analyze-text/projects/{PROJECT-NAME}?api-version={API-VERSION}
```

| Placeholder | Value | Example |
| --- | --- | --- |
| `{ENDPOINT}` | The endpoint for authenticating your API request. | `https://<your-custom-subdomain>.cognitiveservices.azure.com` |
| `{PROJECT-NAME}` | The name for your project. This value is case-sensitive. | `myProject` |
| `{API-VERSION}` | The version of the API you're calling. The value referenced is for the latest version released. Learn more about other available [API versions](../concepts/model-lifecycle.md#choose-the-model-version-used-on-your-data) | `2022-05-01` |

#### Headers

Use the following header to authenticate your request. 

| Key | Value |
| --- | --- |
| `Ocp-Apim-Subscription-Key` | The key to your resource. Used for authenticating your API requests. |

#### Response body

```json
    {
        "createdDateTime": "2021-10-19T23:24:41.572Z",
        "lastModifiedDateTime": "2021-10-19T23:24:41.572Z",
        "lastTrainedDateTime": "2021-10-19T23:24:41.572Z",
        "lastDeployedDateTime": "2021-10-19T23:24:41.572Z",
        "projectKind": "customMultiLabelClassification",
        "storageInputContainerName": "{CONTAINER-NAME}",
        "projectName": "{PROJECT-NAME}",
        "multilingual": false,
        "description": "Project description",
        "language": "{LANGUAGE-CODE}"
    }
```
Once you send your API request, you receive a `200` response indicating success and JSON response body with your project details.


Repeat the same steps for your replicated project using `{SECONDARY-ENDPOINT}`, and `{SECONDARY-RESOURCE-KEY}`. Compare the returned `lastModifiedDateTime` from both project. If your primary project was modified sooner than your secondary one, you need to repeat the steps of [exporting](#export-your-primary-project-assets), [importing](#import-to-a-new-project), [training](#train-your-model), and [deploying](#deploy-your-model) your model.


## Next steps

In this article, you learned how to use the export and import APIs to replicate your project to a secondary Language resource in other region. Next, explore the API reference docs to see what else you can do with authoring APIs.

* [Authoring REST API reference](https://aka.ms/ct-authoring-swagger)
* [Runtime prediction REST API reference](https://aka.ms/ct-runtime-swagger)
