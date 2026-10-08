---
title: Evaluate a Custom Named Entity Recognition (NER) model
titleSuffix: Foundry Tools
description: Learn how to evaluate and score your Custom Named Entity Recognition (NER) model
author: laujan
manager: mcleans
ms.service: azure-language-foundry-tools
ms.topic: how-to
ms.date: 08/18/2026
ms.author: lajanuar
ai-usage: ai-assisted
ms.custom: language-service-custom-ner
---
# View the custom NER model's evaluation and details

After your model finishes training, you can view the model performance and see the extracted entities for the documents in the test set. 

> **Note:**
> Using the **Automatically split the testing set from training data** option may result in different model evaluation result every time you [train a new model](train-model.md), as the test set is selected randomly from the data. To make sure that the evaluation is calculated on the same test set every time you train a model, make sure to use the **Use a manual split of training and testing data** option when starting a training job and define your **Test** documents when [labeling data](tag-data.md).

## Prerequisites

Before viewing model evaluation, you need:

* A successfully [created project](create-project.md) with a configured Azure blob storage account.
* Text data [uploaded](design-schema.md#data-preparation) to your storage account.
* [Labeled data](tag-data.md)
* A [successfully trained model](train-model.md)

For more information, *see* the [project development lifecycle](../overview.md#project-development-lifecycle).

## Model details (REST API)

Submit a **GET** request using the following URL, headers, and JSON body to get trained model evaluation summary.


### Request URL

```rest
{ENDPOINT}/language/authoring/analyze-text/projects/{PROJECT-NAME}/models/{trainedModelLabel}/evaluation/summary-result?api-version={API-VERSION}
```

| Placeholder | Value | Example |
| --- | --- | --- |
| `{ENDPOINT}` | The endpoint for authenticating your API request. | `https://<your-custom-subdomain>.cognitiveservices.azure.com` |
| `{PROJECT-NAME}` | The name for your project. This value is case-sensitive. | `myProject` |
| `{trainedModelLabel}` | The name for your trained model. This value is case-sensitive. | `Model1` |
| `{API-VERSION}` | The version of the API you're calling. For more information, *see* [Model lifecycle](../../concepts/model-lifecycle.md#choose-the-model-version-used-on-your-data). | `2022-05-01` |


### Headers

Use the following header to authenticate your request. 

| Key | Value |
| --- | --- |
| `Ocp-Apim-Subscription-Key` | The key to your resource. Used for authenticating your API requests. |

### Response Body

Once you send the request, you get the following response.

```json
{
  "projectKind": "CustomEntityRecognition",
  "customEntityRecognitionEvaluation": {
    "confusionMatrix": {
      "additionalProp1": {
        "additionalProp1": {
          "normalizedValue": 0,
          "rawValue": 0
        },
        "additionalProp2": {
          "normalizedValue": 0,
          "rawValue": 0
        },
        "additionalProp3": {
          "normalizedValue": 0,
          "rawValue": 0
        }
      },
      "additionalProp2": {
        "additionalProp1": {
          "normalizedValue": 0,
          "rawValue": 0
        },
        "additionalProp2": {
          "normalizedValue": 0,
          "rawValue": 0
        },
        "additionalProp3": {
          "normalizedValue": 0,
          "rawValue": 0
        }
      },
      "additionalProp3": {
        "additionalProp1": {
          "normalizedValue": 0,
          "rawValue": 0
        },
        "additionalProp2": {
          "normalizedValue": 0,
          "rawValue": 0
        },
        "additionalProp3": {
          "normalizedValue": 0,
          "rawValue": 0
        }
      }
    },
    "entities": {
      "additionalProp1": {
        "f1": 0,
        "precision": 0,
        "recall": 0,
        "truePositivesCount": 0,
        "trueNegativesCount": 0,
        "falsePositivesCount": 0,
        "falseNegativesCount": 0
      },
      "additionalProp2": {
        "f1": 0,
        "precision": 0,
        "recall": 0,
        "truePositivesCount": 0,
        "trueNegativesCount": 0,
        "falsePositivesCount": 0,
        "falseNegativesCount": 0
      },
      "additionalProp3": {
        "f1": 0,
        "precision": 0,
        "recall": 0,
        "truePositivesCount": 0,
        "trueNegativesCount": 0,
        "falsePositivesCount": 0,
        "falseNegativesCount": 0
      }
    },
    "microF1": 0,
    "microPrecision": 0,
    "microRecall": 0,
    "macroF1": 0,
    "macroPrecision": 0,
    "macroRecall": 0
  },
  "evaluationOptions": {
    "kind": "percentage",
    "trainingSplitPercentage": 0,
    "testingSplitPercentage": 0
  }
}

```



## Load or export model data (REST API)

### Load model data 

Create a **POST** request using the following URL, headers, and JSON body to load your model data to your project.

### Request URL

Use the following URL when creating your API request. Replace the placeholder values with your own values. 

```rest
{ENDPOINT}/language/authoring/analyze-text/projects/{PROJECT-NAME}/models/{MODEL-NAME}:load-snapshot?stringIndexType=Utf16CodeUnit&api-version={API-VERSION}
```

| Placeholder | Value | Example |
| --- | --- | --- |
| `{ENDPOINT}` | The endpoint for authenticating your API request. | `https://<your-custom-subdomain>.cognitiveservices.azure.com` |
| `{PROJECT-NAME}` | The name for your project. This value is case-sensitive. | `EmailApp` |
| `{API-VERSION}` | The version of the API you're calling. | `2022-10-01-preview` |
| `{MODEL-NAME}` | The name of your model. This value is case-sensitive. | `v1` |

### Headers

Use the following header to authenticate your request. 

| Key | Value |
| --- | --- |
| `Ocp-Apim-Subscription-Key` | The key to your resource. Used for authenticating your API requests. |


Once you send your API request, you receive a `202` response indicating success. In the response headers, extract the `operation-location` value formatted like this: 

```rest
{ENDPOINT}/language/authoring/analyze-text/projects/{PROJECT-NAME}/models/{MODEL-NAME}/jobs/{JOB-ID}?api-version={API-VERSION}
``` 

`JOB-ID` is used to identify your request, since this operation is asynchronous. Use this URL to get the status of your model data loading, using the same authentication method.


### Export model data

Create a **POST** request using the following URL, headers, and JSON body to export your model data.

### Request URL

Use the following URL when creating your API request. Replace the placeholder values with your own values. 

```rest
{ENDPOINT}/language/authoring/analyze-text/projects/{PROJECT-NAME}/:export?stringIndexType=Utf16CodeUnit&api-version={API-VERSION}&trainedModelLabel={MODEL-NAME}
```

| Placeholder | Value | Example |
| --- | --- | --- |
| `{ENDPOINT}` | The endpoint for authenticating your API request. | `https://<your-custom-subdomain>.cognitiveservices.azure.com` |
| `{PROJECT-NAME}` | The name for your project. This value is case-sensitive. | `EmailApp` |
| `{API-VERSION}` | The version of the API you're calling. | `2022-10-01-preview` |
| `{MODEL-NAME}` | The name of your model. This value is case-sensitive. | `v1` |

### Headers

Use the following header to authenticate your request. 

| Key | Value |
| --- | --- |
| `Ocp-Apim-Subscription-Key` | The key to your resource. Used for authenticating your API requests. |


Once you send your API request, you receive a `202` response indicating success. In the response headers, extract the `operation-location` value formatted like this: 

```rest
{ENDPOINT}/language/authoring/analyze-text/projects/{PROJECT-NAME}/jobs/{JOB-ID}?api-version={API-VERSION}
``` 

`JOB-ID` is used to identify your request, since this operation is asynchronous. Use this URL to get the exported project JSON, using the same authentication method.


## Delete model (REST API)

Create a **DELETE** request using the following URL, headers, and JSON body to delete a trained model.


### Request URL

```rest
{Endpoint}/language/authoring/analyze-text/projects/{PROJECT-NAME}/models/{trainedModelLabel}?api-version={API-VERSION}
```

| Placeholder | Value | Example |
| --- | --- | --- |
| `{ENDPOINT}` | The endpoint for authenticating your API request. | `https://<your-custom-subdomain>.cognitiveservices.azure.com` |
| `{PROJECT-NAME}` | The name for your project. This value is case-sensitive. | `myProject` |
| `{trainedModelLabel}` | The name for your model name. This value is case-sensitive. | `model1` |
| `{API-VERSION}` | The version of the API you're calling. The value referenced is for the latest version released. For more information, *see* [Model lifecycle](../../concepts/model-lifecycle.md#choose-the-model-version-used-on-your-data). | `2022-05-01` |

### Headers

Use the following header to authenticate your request. 

| Key | Value |
| --- | --- |
| `Ocp-Apim-Subscription-Key` | The key to your resource. Used for authenticating your API requests. |


Once you send your API request, you receive a `204` response indicating success, which means your trained model is deleted.


## Next steps

* [Deploy your model](deploy-model.md)
* Learn about the [metrics used in evaluation](../concepts/evaluation-metrics.md).
