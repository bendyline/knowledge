---
title: Build, train, and deploy a custom text classification model
titleSuffix: Foundry Tools
description: Prepare data, define a schema, label data, train, evaluate, deploy, and query a custom text classification model in Microsoft Foundry.
author: laujan
manager: mcleans
ms.service: azure-language-foundry-tools
ms.topic: how-to
ms.date: 06/30/2026
ms.author: lajanuar
ms.custom: language-service-custom-classification
---

# Build, train, and deploy a custom text classification model

This article walks you through the complete custom text classification lifecycle in [Microsoft Foundry](https://ai.azure.com/?cid=learnDocs): prepare your data and define a schema, label your data, train and evaluate a model, deploy it, and send prediction requests. Each stage links to the relevant concepts and reference content if you want to go deeper.

For an end-to-end introduction with a sample project, see the [custom text classification quickstart](../quickstart.md). For the broader process, see the [project development lifecycle](../overview.md#project-development-lifecycle).

## Prerequisites

* **An active Azure subscription**. If you don't have one, you can [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
* **A project created with a configured Azure blob storage account**. For more information, *see* [Create a custom text classification project](create-project.md).
* **Text data that's [uploaded](#data-preparation) to your storage account**.

## Prepare your data and define a schema

The schema defines the classes that you need your model to classify your text into at runtime. Defining the schema is the first step in the [project development lifecycle](../overview.md#project-development-lifecycle).

### Schema design

* **Review and identify**: Review documents in your dataset to be familiar with their structure and content, then identify how you want to classify your data.

    For example, if you're classifying support tickets, you might need the following classes: *Sign in issue*, *hardware issue*, *connectivity issue*, and *new equipment request*.

* **Avoid ambiguity in classes**: Ambiguity arises when the classes you specify share similar meaning to one another. The more ambiguous your schema is, the more labeled data you might need to differentiate between different classes.

    For example, if you're classifying food recipes, they might be similar to an extent. To differentiate between *dessert recipe* and *main dish recipe*, you might need to label more examples to help your model distinguish between the two classes. Avoiding ambiguity saves time and yields better results.

* **Out of scope data**: When using your model in production, consider adding an *out of scope* class to your schema if you expect documents that don't belong to any of your classes. Then add a few documents to your dataset to be labeled as *out of scope*. The model can learn to recognize irrelevant documents, and predict their labels accordingly.

### Data selection

The quality of the data you use to train your model greatly affects model performance.

* Use real-life data that reflects your domain's problem space to effectively train your model. You can use synthetic data to accelerate the initial model training process, but it likely differs from your real-life data and makes your model less effective when used.

* Balance your data distribution as much as possible without deviating far from the distribution in real life.

* Use diverse data whenever possible to avoid overfitting your model. Less diversity in training data might lead to your model learning spurious correlations that don't exist in real-life data.

* Avoid duplicate documents in your data. Duplicate data negatively affects the training process, model metrics, and model performance.

* Consider where your data comes from. If you collect data from one person, department, or part of your scenario, you're likely missing diversity that might be important for your model to learn about.

> **Note:**
> If your documents are in multiple languages, select the **multiple languages** option during [project creation](../quickstart.md) and set the **language** option to the language for most of your documents.

### Data preparation

As a prerequisite for creating a custom text classification project, upload your training data to a blob container in your storage account. You can create and upload training documents from Azure directly, or through using the Azure Storage Explorer tool. Using the Azure Storage Explorer tool allows you to upload more data quickly.

* [Create and upload documents from Azure](https://learn.microsoft.com/azure/storage/blobs/storage-quickstart-blobs-portal#create-a-container)
* [Create and upload documents using Azure Storage Explorer](https://learn.microsoft.com/azure/vs-azure-tools-storage-explorer-blobs)

You can only use `.txt` documents for custom text. If your data is in another format, use the [CLUtils parse command](https://github.com/microsoft/CognitiveServicesLanguageUtilities/blob/main/CustomTextAnalytics.CLUtils/Solution/CogSLanguageUtilities.ViewLayer.CliCommands/Commands/ParseCommand/README.md) to change your file format.

### Test set

When you define the testing set, make sure to include example documents that aren't present in the training set. Defining the testing set is an important step to calculate the [model performance](#view-model-details). Also, make sure that the testing set includes documents that represent all classes used in your project.

## Label your data

Before training your model, label your documents with the classes you want to categorize them into. Data labeling is a crucial step in the development lifecycle. Use this data in the next step when training your model so that your model can learn from the labeled data. If you already labeled your data, you can directly [import](create-project.md) it into your project. Make sure your data follows the [accepted data format](../concepts/evaluation-metrics.md#accepted-data-formats).

### Data labeling guidelines

After [preparing your data, designing your schema](#schema-design), and [creating your project](create-project.md), label your data. Labeling your data is important so your model knows which documents are associated with the classes you need. When you label your data or import labeled data, the labels are stored in the JSON file in your storage container that you connected to this project.

As you label your data, keep in mind:

* In general, more labeled data leads to better results, provided the data is labeled accurately.

* There's no fixed number of labels that can guarantee your model performs the best. Model performance depends on possible ambiguity in your [schema](#schema-design), and the quality of your labeled data. Nevertheless, we recommend 50 labeled documents per class.

### Label your data in Foundry

Use the following steps to label your data:

1. Go to your project page in [Microsoft Foundry](https://ai.azure.com/?cid=learnDocs).

1. From the left side menu, select **Data labeling**. You can find a list of all documents in your storage container.

    >**Tip:**
    > Use the filters in the top menu to view the unlabeled files so that you can start labeling them.
    > Use the filters to view the documents that are labeled with a specific class.

1. Change to a single file view from the left side in the top menu or select a specific file to start labeling. You can find a list of all `.txt` files available in your projects to the left. Use the **Back** and **Next** buttons from the bottom of the page to navigate through your documents.

    > **Note:**
    > If you enabled multiple languages for your project, you see a **Language** dropdown in the top menu, which you use to select the language of each document.

1. In the right side pane, **Add class** to your project so you can start labeling your data with them.

1. Start labeling your files based on your project type:

    * **Multilabel classification**: your file can be labeled with multiple classes. Select all applicable check boxes next to the classes you want to label this document with.

        A screenshot showing the multiple label classification tag page.

    * **Single label classification**: your file can only be labeled with one class. Select one of the buttons next to the class you want to label the document with.

        A screenshot showing the single label classification tag page

    To ensure complete labeling, use the [auto labeling feature](use-autolabeling.md).

1. In the right side pane under the **Labels** pivot you can find all the classes in your project and the count of labeled instances per each.

1. In the bottom section of the right side pane you can add the current file you're viewing to the training set or the testing set. By default all the documents are added to your training set. Learn more about [training and testing sets](#data-splitting) and how they're used for model training and evaluation.

    > **Tip:**
    > If you're planning on using **Automatic** data splitting, use the default option of assigning all the documents into your training set.

1. Under the **Distribution** pivot you can view the distribution across training and testing sets. You have two options for viewing:
   * *Total instances* where you can view count of all labeled instances of a specific class.
   * *documents with at least one label* where each document is counted if it contains at least one labeled instance of this class.

1. While you're labeling, your changes sync periodically. If they aren't saved yet, you see a warning at the top of your page. If you want to save manually, select **Save labels** button at the bottom of the page.

To remove a label, uncheck the button next to the class.

To delete a class, select the icon next to the class you want to remove. Deleting a class removes all its labeled instances from your dataset.

## Train your model

Training is the process where the model learns from your labeled data. After training is completed, you can [view the model's performance](#view-model-details) to determine if you need to improve your model.

To train a model, start a training job. Only successfully completed jobs create a usable model. Training jobs expire after seven days. After this period, you can't retrieve the job details. If your training job completed successfully and a model was created, the job expiration isn't affected. You can only have one training job running at a time, and you can't start other jobs in the same project.

Depending on the dataset size and the complexity of your schema, training times can vary from a few minutes up to several hours.

### Data splitting

Before you start the training process, labeled documents in your project are divided into a training set and a testing set. Each one of them serves a different function. The **training set** is used in training the model and where the model learns the class/classes assigned to each document. The **testing set** is a blind set that isn't introduced to the model during training but only during evaluation. After the model is trained successfully, it can make predictions from the documents in the testing set. Based on these predictions, the model's [evaluation metrics](../concepts/evaluation-metrics.md) are calculated. Make sure that all your classes are adequately represented in both the training and testing set.

Custom text classification supports two methods for data splitting:

* **Automatically splitting the testing set from training data**: The system splits your labeled data between the training and testing sets, according to the percentages you choose. The system attempts to have a representation of all classes in your training set. The recommended percentage split is 80% for training and 20% for testing.

 > **Note:**
 > If you choose the **Automatically splitting the testing set from training data** option, only the data assigned to training set is split according to the percentages provided.

* **Use a manual split of training and testing data**: This method enables you to define which labeled documents should belong to which set. This step is only enabled if you added documents to your testing set during [data labeling](#label-your-data).

### Train your model

# [Foundry](#tab/ai-foundry)

To start training your model from within the [Foundry](https://ai.azure.com/?cid=learnDocs):

1. Select **Training jobs** from the left navigation menu.
1. Select **Start a training job** from the top menu.
1. To train a new model, select **Train a new model** and enter a new model name. Otherwise, to replace an existing model with a model trained on the new data, select **Overwrite an existing model** and then select an existing model.
1. Select the data splitting method: either **Automatically splitting the testing set from training data** or **Use a manual split of training and testing data**.
1. Select the **Train** button.
1. Choose the training job ID from the list. A panel appears that details the training progress, job status, and other details for this job.

> **Note:**
>
> * Only successfully completed training jobs generate models.
> * Training can take from a few minutes to a few hours based on the size of your training data.
> * You can only have one training job running at a time. You can't start other training jobs within the same project until the running job is completed.

# [REST APIs](#tab/rest-api)

### Start training job

Submit a **POST** request using the following URL, headers, and JSON body to submit a training job. Replace the placeholder values with your own values. 

```rest
{ENDPOINT}/language/authoring/analyze-text/projects/{PROJECT-NAME}/:train?api-version={API-VERSION}
```

| Placeholder | Value | Example |
| --- | --- | --- |
| `{ENDPOINT}` | The endpoint for authenticating your API request. | `https://<your-custom-subdomain>.cognitiveservices.azure.com` |
| `{PROJECT-NAME}` | The name of your project. This value is case-sensitive. | `myProject` |
| `{API-VERSION}` | The version of the API you're calling. The value referenced is for the latest version released. Learn more about other available [API versions](../../concepts/model-lifecycle.md#choose-the-model-version-used-on-your-data) | `2022-05-01` |

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
| trainingConfigVersion | `{CONFIG-VERSION}` | This is the [model version](../../concepts/model-lifecycle.md) used to train the model. | `2022-05-01` |
| evaluationOptions |  | Option to split your data across training and testing sets. | `{}` |
| kind | `percentage` | Split methods. Possible values are `percentage` or `manual`. See [How to train a model](build-train-deploy-model.md#data-splitting) for more information. | `percentage` |
| trainingSplitPercentage | `80` | Percentage of your tagged data to be included in the training set. Recommended value is `80`. | `80` |
| testingSplitPercentage | `20` | Percentage of your tagged data to be included in the testing set. Recommended value is `20`. | `20` |

  > **Note:**
  > The `trainingSplitPercentage` and `testingSplitPercentage` are only required if `Kind` is set to `percentage` and the sum of both percentages should be equal to 100.

Once you send your API request, you receive a `202` response indicating that the job was submitted correctly. In the response headers, extract the `location` value formatted like this: 

```rest
{ENDPOINT}/language/authoring/analyze-text/projects/{PROJECT-NAME}/train/jobs/{JOB-ID}?api-version={API-VERSION}
``` 

{JOB-ID} is used to identify your request, since this operation is asynchronous. You can use this URL to get the training status.  


### Get training job status

Training could take some time depending on the size of your training data and complexity of your schema. You can use the following request to keep polling the status of the training job until it successfully completes.

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


### Cancel training job

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


---

## View model details

After your model finishes training, you can view the model performance and see the predicted classes for the documents in the test set.

> **Note:**
> If you use the **Automatically split the testing set from training data** option, you might get different model evaluation results each time you train a new model. This difference happens because the test set is randomly selected from the data. To ensure the evaluation uses the same test set every time you train a model, use the **Use a manual split of training and testing data** option when starting a training job. Also, define your **Test** documents when [labeling data](#label-your-data).

### Single label classification

Submit a **GET** request using the following URL, headers, and JSON body to get a trained model evaluation summary.


### Request URL

```rest
{ENDPOINT}/language/authoring/analyze-text/projects/{PROJECT-NAME}/models/{trainedModelLabel}/evaluation/summary-result?api-version={API-VERSION}
```

| Placeholder | Value | Example |
| --- | --- | --- |
| `{ENDPOINT}` | The endpoint for authenticating your API request. | `https://<your-custom-subdomain>.cognitiveservices.azure.com` |
| `{PROJECT-NAME}` | The name for your project. This value is case-sensitive. | `myProject` |
| `{trainedModelLabel}` | The name for your trained model. This value is case-sensitive. | `Model1` |
| `{API-VERSION}` | The version of the API you're calling. The value referenced is for the latest version released. Learn more about other available [API versions](../../concepts/model-lifecycle.md#choose-the-model-version-used-on-your-data) | `2022-05-01` |


### Headers

Use the following header to authenticate your request. 

| Key | Value |
| --- | --- |
| `Ocp-Apim-Subscription-Key` | The key to your resource. Used for authenticating your API requests. |

### Response Body

Once you send the request, you get the following response.

```json
{
  "projectKind": "customSingleLabelClassification",
  "customSingleLabelClassificationEvaluation": {
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
    "classes": {
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


### Multi label classification

Submit a **GET** request using the following URL, headers, and JSON body to get a trained model evaluation summary.


### Request URL

```rest
{ENDPOINT}/language/authoring/analyze-text/projects/{PROJECT-NAME}/models/{trainedModelLabel}/evaluation/summary-result?api-version={API-VERSION}
```

| Placeholder | Value | Example |
| --- | --- | --- |
| `{ENDPOINT}` | The endpoint for authenticating your API request. | `https://<your-custom-subdomain>.cognitiveservices.azure.com` |
| `{PROJECT-NAME}` | The name for your project. This value is case-sensitive. | `myProject` |
| `{trainedModelLabel}` | The name for your trained model. This value is case-sensitive. | `Model1` |
| `{API-VERSION}` | The version of the API you're calling. The value referenced is for the latest version released. Learn more about other available [API versions](../../concepts/model-lifecycle.md#choose-the-model-version-used-on-your-data) | `2022-05-01` |


### Headers

Use the following header to authenticate your request. 

| Key | Value |
| --- | --- |
| `Ocp-Apim-Subscription-Key` | The key to your resource. Used for authenticating your API requests. |

### Response Body

Once you send the request, you get the following response.

```json
{
  "projectKind": "customMultiLabelClassification",
  "customMultiLabelClassificationEvaluation": {
    "classes": {
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


### Load or export model data

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


### Delete model

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
| `{API-VERSION}` | The version of the API you're calling. The value referenced is for the latest version released. Learn more about other available [API versions](../../concepts/model-lifecycle.md#choose-the-model-version-used-on-your-data) | `2022-05-01` |

### Headers

Use the following header to authenticate your request. 

| Key | Value |
| --- | --- |
| `Ocp-Apim-Subscription-Key` | The key to your resource. Used for authenticating your API requests. |


Once you send your API request, you receive a `204` response indicating success, which means your trained model is deleted.


As you review how your model performs, learn about the [evaluation metrics](../concepts/evaluation-metrics.md) that are used.

## Deploy your model

When you're satisfied with how your model performs, it's ready to deploy. You can use it to classify text. Deploying a model makes it available for use through the [prediction API](https://aka.ms/ct-runtime-swagger).

After you review your model's performance and decide it can be used in your environment, assign it to a deployment so you can query it. Create a deployment named `production` to which you assign the best model you built so far and use it in your system. You can create another deployment called `staging` to which you can assign the model you're currently working on to test it. You can have a maximum of 10 deployments in your project.

### Submit deployment job

Submit a **PUT** request using the following URL, headers, and JSON body to submit a deployment job. Replace the placeholder values with your own values. 

```rest
{Endpoint}/language/authoring/analyze-text/projects/{projectName}/deployments/{deploymentName}?api-version={API-VERSION}
```

| Placeholder | Value | Example |
| --- | --- | --- |
| `{ENDPOINT}` | The endpoint for authenticating your API request. | `https://<your-custom-subdomain>.cognitiveservices.azure.com` |
| `{PROJECT-NAME}` | The name of your project. This value is case-sensitive. | `myProject` |
| `{DEPLOYMENT-NAME}` | The name of your deployment. This value is case-sensitive. | `staging` |
| `{API-VERSION}` | The version of the API you're calling. The value referenced is for the latest version released. Learn more about other available [API versions](../../concepts/model-lifecycle.md#choose-the-model-version-used-on-your-data) | `2022-05-01` |

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


### Get deployment job status

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
| `{API-VERSION}` | The version of the API you're calling. The value referenced is for the latest version released. Learn more about other available [API versions](../../concepts/model-lifecycle.md#choose-the-model-version-used-on-your-data) | `2022-05-01` |

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


### Swap deployments

You can swap deployments after testing a model assigned to one deployment, and want to assign it to another. Swapping deployments involves taking the model assigned to the first deployment, and assigning it to the second deployment. Then taking the model assigned to second deployment and assign it to the first deployment. This step could be used to swap your `production` and `staging` deployments when you want to take the model assigned to `staging` and assign it to `production`.

Create a **POST** request using the following URL, headers, and JSON body to start a swap deployments job.


### Request URL

```rest
{ENDPOINT}/language/authoring/analyze-text/projects/{PROJECT-NAME}/deployments/:swap?api-version={API-VERSION}
```

| Placeholder | Value | Example |
| --- | --- | --- |
| `{ENDPOINT}` | The endpoint for authenticating your API request. | `https://<your-custom-subdomain>.cognitiveservices.azure.com` |
| `{PROJECT-NAME}` | The name for your project. This value is case-sensitive. | `myProject` |
| `{API-VERSION}` | The version of the API you're calling. The value referenced is for the latest [model version](../../concepts/model-lifecycle.md#choose-the-model-version-used-on-your-data) released. | `2022-05-01` |


### Headers

Use the following header to authenticate your request. 

| Key | Value |
| --- | --- |
| `Ocp-Apim-Subscription-Key` | The key to your resource. Used for authenticating your API requests. |


### Request Body

```json
{
  "firstDeploymentName": "{FIRST-DEPLOYMENT-NAME}",
  "secondDeploymentName": "{SECOND-DEPLOYMENT-NAME}"
}
```


| Key | Placeholder | Value | Example |
| --- | --- | --- | --- |
| firstDeploymentName | `{FIRST-DEPLOYMENT-NAME}` | The name for your first deployment. This value is case-sensitive. | `production` |
| secondDeploymentName | `{SECOND-DEPLOYMENT-NAME}` | The name for your second deployment. This value is case-sensitive. | `staging` |


Once you send your API request, you receive a `202` response indicating success.


### Delete deployment

Create a **DELETE** request using the following URL, headers, and JSON body to delete a deployment.


### Request URL

```rest
{Endpoint}/language/authoring/analyze-text/projects/{PROJECT-NAME}/deployments/{deploymentName}?api-version={API-VERSION}
```

| Placeholder | Value | Example |
| --- | --- | --- |
| `{ENDPOINT}` | The endpoint for authenticating your API request. | `https://<your-custom-subdomain>.cognitiveservices.azure.com` |
| `{PROJECT-NAME}` | The name for your project. This value is case-sensitive. | `myProject` |
| `{DEPLOYMENT-NAME}` | The name for your deployment name. This value is case-sensitive. | `prod` |
| `{API-VERSION}` | The version of the API you're calling. The value referenced is for the latest version released. Learn more about other available [API versions](../../concepts/model-lifecycle.md#choose-the-model-version-used-on-your-data) | `2022-05-01` |

### Headers

Use the following header to authenticate your request. 

| Key | Value |
| --- | --- |
| `Ocp-Apim-Subscription-Key` | The key to your resource. Used for authenticating your API requests. |


Once you send your API request, you receive a `202` response indicating success, which means your deployment is deleted. A successful call results with an `Operation-Location` header used to check the status of the job.


### Assign deployment resources

You can [deploy your project to multiple regions](../../concepts/custom-features/multi-region-deployment.md) by assigning different language resources that exist in different regions.

Assigning deployment resources programmatically requires Microsoft Entra authentication. Microsoft Entra ID is used to confirm you have access to the resources you're interested in assigning to your project for multi-region deployment. To programmatically use Microsoft Entra authentication when making REST API calls, learn more from the [Foundry Tools documentation](../../../authentication.md?source=docs\&tabs=powershell\&tryIt=true#authenticate-with-azure-active-directory).

### Assign resource 

Submit a **POST** request using the following URL, headers, and JSON body to assign deployment resources.

### Request URL

Use the following URL when creating your API request. Replace the placeholder values with your own values. 

```rest
{ENDPOINT}/language/authoring/analyze-text/projects/{PROJECT-NAME}/resources/:assign?api-version={API-VERSION}
```

| Placeholder | Value | Example |
| --- | --- | --- |
| `{ENDPOINT}` | The endpoint for authenticating your API request. | `https://<your-custom-subdomain>.cognitiveservices.azure.com` |
| `{PROJECT-NAME}` | The name for your project. This value is case-sensitive. | `myProject` |
| `{API-VERSION}` | The version of the API you're calling. | `2022-10-01-preview` |

### Headers

Use [Microsoft Entra authentication](../../../authentication.md?source=docs\&tabs=powershell\&tryIt=true#authenticate-with-azure-active-directory) to authenticate this API.

### Body

Use the following sample JSON as your body.

```json
{
  "resourcesMetadata": [
    {
      "azureResourceId": "{AZURE-RESOURCE-ID}",
      "customDomain": "{CUSTOM-DOMAIN}",
      "region": "{REGION-CODE}"
    }
  ]
}
```

| Key | Placeholder | Value | Example |
| --- | --- | --- | --- |
| `azureResourceId` | `{AZURE-RESOURCE-ID}` | The full resource ID path you want to assign. Found in the Azure portal under the **Properties** tab for the resource, in the **Resource ID** field. | `/subscriptions/a0a0a0a0-bbbb-cccc-dddd-e1e1e1e1e1e1/resourceGroups/ContosoResourceGroup/providers/Microsoft.CognitiveServices/accounts/ContosoResource` |
| `customDomain` | `{CUSTOM-DOMAIN}` | The custom subdomain of the resource you want to assign. Found in the Azure portal under the **Keys and Endpoint** tab for the resource, as the **Endpoint** field in the URL `https://<your-custom-subdomain>.cognitiveservices.azure.com/` | `contosoresource` |
| `region` | `{REGION-CODE}` | A region code specifying the region of the resource you want to assign. Found in the Azure portal under the **Keys and Endpoint** tab for the resource, in the **Location/Region** field. | `eastus` |

### Get assign resource status

Use the following **GET** request to get the status of your assign deployment resource job. Replace the placeholder values with your own values. 

### Request URL

```rest
{ENDPOINT}/language/authoring/analyze-text/projects/{PROJECT-NAME}/resources/assign/jobs/{JOB-ID}?api-version={API-VERSION}
```

| Placeholder | Value | Example |
| --- | --- | --- |
| `{ENDPOINT}` | The endpoint for authenticating your API request. | `https://<your-custom-subdomain>.cognitiveservices.azure.com` |
| `{PROJECT-NAME}` | The name for your project. This value is case-sensitive. | `myProject` |
| `{JOB-ID}` | The job ID for getting your assign deployment status. It's in the `operation-location` header value you received from the API in response to your assign deployment resource request. | `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxxx` |
| `{API-VERSION}` | The version of the API you're calling. | `2022-10-01-preview` |


### Headers

Use the following header to authenticate your request. 

| Key | Value |
| --- | --- |
| `Ocp-Apim-Subscription-Key` | The key to your resource. Used for authenticating your API requests. |

### Response Body

Once you send the request, you get the following response. Keep polling this endpoint until the `status` parameter changes to `succeeded`. 

```json
{
    "jobId":"{JOB-ID}",
    "createdDateTime":"{CREATED-TIME}",
    "lastUpdatedDateTime":"{UPDATED-TIME}",
    "expirationDateTime":"{EXPIRATION-TIME}",
    "status":"running"
}
```


### Unassign deployment resources

When you unassign or remove a deployment resource from a project, you also delete all the deployments previously deployed to that resource region.

### Unassign resource

Submit a **POST** request using the following URL, headers, and JSON body to unassign or remove deployment resources from your project.

### Request URL

Use the following URL when creating your API request. Replace the placeholder values with your own values. 

```rest
{ENDPOINT}/language/authoring/analyze-text/projects/{PROJECT-NAME}/resources/:unassign?api-version={API-VERSION}
```

| Placeholder | Value | Example |
| --- | --- | --- |
| `{ENDPOINT}` | The endpoint for authenticating your API request. | `https://<your-custom-subdomain>.cognitiveservices.azure.com` |
| `{PROJECT-NAME}` | The name for your project. This value is case-sensitive. | `myProject` |
| `{API-VERSION}` | The version of the API you're calling. | `2022-10-01-preview` |

### Headers

Use the following header to authenticate your request. 

| Key | Value |
| --- | --- |
| `Ocp-Apim-Subscription-Key` | The key to your resource. Used for authenticating your API requests. |

### Body

Use the following sample JSON as your body.

```json
{
  "assignedResourceIds": [
    "{AZURE-RESOURCE-ID}"
  ]
}
```

| Key | Placeholder | Value | Example |
| --- | --- | --- | --- |
| `assignedResourceIds` | `{AZURE-RESOURCE-ID}` | The full resource ID path you want to unassign. Found in the Azure portal under the _Properties_ tab for the resource as the _Resource ID_ field. | `/subscriptions/a0a0a0a0-bbbb-cccc-dddd-e1e1e1e1e1e1/resourceGroups/ContosoResourceGroup/providers/Microsoft.CognitiveServices/accounts/ContosoResource` |

### Get unassign resource status

Use the following **GET** request to get the status of your unassign deployment resources job. Replace the placeholder values with your own values. 

### Request URL

```rest
{ENDPOINT}/language/authoring/analyze-text/projects/{PROJECT-NAME}/resources/unassign/jobs/{JOB-ID}?api-version={API-VERSION}
```

| Placeholder | Value | Example |
| --- | --- | --- |
| `{ENDPOINT}` | The endpoint for authenticating your API request. | `https://<your-custom-subdomain>.cognitiveservices.azure.com` |
| `{PROJECT-NAME}` | The name for your project. This value is case-sensitive. | `myProject` |
| `{JOB-ID}` | The job ID for getting your assign deployment status. It's in the `operation-location` header value you received from the API in response to your unassign deployment resource request. | `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxxx` |
| `{API-VERSION}` | The version of the API you're calling. | `2022-10-01-preview` |


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


## Send prediction requests

After you successfully deploy a model, you can query the deployment to classify text based on the model you assigned to the deployment. You can query the deployment programmatically through the [prediction API](https://learn.microsoft.com/rest/api/language/analyze-text/analyze-text/analyze-text?view=rest-language-analyze-text-2025-11-01\&tabs=HTTP\&preserve-view=true) or through the client libraries (Azure SDK).

First, you need to get your resource key and endpoint:

1. Go to your resource overview page in the [Azure portal](https://portal.azure.com/#home).

1. From the menu on the left side, select **Keys and Endpoint**. Use the endpoint and key for the API requests.

    A screenshot showing the key and endpoint page in the Azure portal.

### Submit a custom text classification task

Use this **POST** request to start a text classification task.

```rest
{ENDPOINT}/language/analyze-text/jobs?api-version={API-VERSION}
```

| Placeholder | Value | Example |
| --- | --- | --- |
| `{ENDPOINT}` | The endpoint for authenticating your API request. | `https://<your-custom-subdomain>.cognitiveservices.azure.com` |
| `{API-VERSION}` | The version of the API you're calling. The value referenced is for the latest version released. For more information, *see* [Model lifecycle](../../concepts/model-lifecycle.md#choose-the-model-version-used-on-your-data). | `2022-05-01` |

#### Headers

| Key | Value |
| --- | --- |
| Ocp-Apim-Subscription-Key | Your key that provides access to this API. |

#### Body

# [Multi label classification](#tab/multi-classification)

```json
{
  "displayName": "Classifying documents",
  "analysisInput": {
    "documents": [
      {
        "id": "1",
        "language": "{LANGUAGE-CODE}",
        "text": "Text1"
      },
      {
        "id": "2",
        "language": "{LANGUAGE-CODE}",
        "text": "Text2"
      }
    ]
  },
  "tasks": [
     {
      "kind": "CustomMultiLabelClassification",
      "taskName": "Multi Label Classification",
      "parameters": {
        "projectName": "{PROJECT-NAME}",
        "deploymentName": "{DEPLOYMENT-NAME}"
      }
    }
  ]
}
```

| Key | Placeholder | Value | Example |
| --- | --- | --- | --- |
| `displayName` | `{JOB-NAME}` | Your job name. | `MyJobName` |
| `documents` | [{},{}] | List of documents to run tasks on. | `[{},{}]` |
| `id` | `{DOC-ID}` | Document name or ID. | `doc1` |
| `language` | `{LANGUAGE-CODE}` | A string specifying the language code for the document. If this key isn't specified, the service will assume the default language of the project that was selected during project creation. See [language support](../language-support.md) for a list of supported language codes. | `en-us` |
| `text` | `{DOC-TEXT}` | Document task to run the tasks on. | `Lorem ipsum dolor sit amet` |
| `tasks` |  | List of tasks we want to perform. | `[]` |
| `taskName` | CustomMultiLabelClassification | The task name | CustomMultiLabelClassification |
| `parameters` |  | List of parameters to pass to the task. |  |
| `project-name` | `{PROJECT-NAME}` | The name for your project. This value is case-sensitive. | `myProject` |
| `deployment-name` | `{DEPLOYMENT-NAME}` | The name of your deployment. This value is case-sensitive. | `prod` |

# [Single label classification](#tab/single-classification)

```json
{
  "displayName": "Classifying documents",
  "analysisInput": {
    "documents": [
      {
        "id": "1",
        "language": "{LANGUAGE-CODE}",
        "text": "Text1"
      },
      {
        "id": "2",
        "language": "{LANGUAGE-CODE}",
        "text": "Text2"
      }
    ]
  },
  "tasks": [
    {
      "kind": "CustomSingleLabelClassification",
      "taskName": "Single Classification Label",
      "parameters": {
        "projectName": "{PROJECT-NAME}",
        "deploymentName": "{DEPLOYMENT-NAME}"
      }
    }
  ]
}
```

| Key | Placeholder | Value | Example |
| --- | --- | --- | --- |
| displayName | `{JOB-NAME}` | Your job name. | `MyJobName` |
| documents |  | List of documents to run tasks on. |  |
| `id` | `{DOC-ID}` | Document name or ID. | `doc1` |
| `language` | `{LANGUAGE-CODE}` | A string specifying the language code for the document. If this key isn't specified, the service will assume the default language of the project that was selected during project creation. See [language support](../language-support.md) for a list of supported language codes. | `en-us` |
| `text` | `{DOC-TEXT}` | Document task to run the tasks on. | `Lorem ipsum dolor sit amet` |
| `taskName` | CustomSingleLabelClassification | The task name | CustomSingleLabelClassification |
| `tasks` | [] | Array of tasks we want to perform. | [] |
| `parameters` |  | List of parameters to pass to the task. |  |
| `project-name` | `{PROJECT-NAME}` | The name for your project. This value is case-sensitive. | `myProject` |
| `deployment-name` | `{DEPLOYMENT-NAME}` | The name of your deployment. This value is case-sensitive. | `prod` |

---

#### Response

You receive a 202 response indicating success. In the response **headers**, extract `operation-location`.
`operation-location` is formatted like this:

`{ENDPOINT}/language/analyze-text/jobs/{JOB-ID}?api-version={API-VERSION}`

You can use this URL to query the task completion status and get the results when task is completed.


### Get task results

Use the following **GET** request to query the status/results of the text classification task. 

```rest
{ENDPOINT}/language/analyze-text/jobs/{JOB-ID}?api-version={API-VERSION}
```
| Placeholder | Value | Example |
| --- | --- | --- |
| `{ENDPOINT}` | The endpoint for authenticating your API request. | `https://<your-custom-subdomain>.cognitiveservices.azure.com` |
| `{API-VERSION}` | The version of the API you're calling. The value referenced is for the latest released [model version](../../concepts/model-lifecycle.md#choose-the-model-version-used-on-your-data) version. | `2022-05-01` |

#### Headers

| Key | Value |
| --- | --- |
| Ocp-Apim-Subscription-Key | Your key that provides access to this API. |

### Response body

The response will be a JSON document with the following parameters.

# [Multi label classification](#tab/multi-classification)

```json
{
  "createdDateTime": "2021-05-19T14:32:25.578Z",
  "displayName": "MyJobName",
  "expirationDateTime": "2021-05-19T14:32:25.578Z",
  "jobId": "xxxx-xxxxxx-xxxxx-xxxx",
  "lastUpdateDateTime": "2021-05-19T14:32:25.578Z",
  "status": "succeeded",
  "tasks": {
    "completed": 1,
    "failed": 0,
    "inProgress": 0,
    "total": 1,
    "items": [
      {
        "kind": "customMultiClassificationTasks",
        "taskName": "Classify documents",
        "lastUpdateDateTime": "2020-10-01T15:01:03Z",
        "status": "succeeded",
        "results": {
          "documents": [
            {
              "id": "{DOC-ID}",
              "classes": [
                  {
                      "category": "Class_1",
                      "confidenceScore": 0.0551877357
                  }
              ],
              "warnings": []
            }
          ],
          "errors": [],
          "modelVersion": "2020-04-01"
        }
      }
    ]
  }
}

```

# [Single label classification](#tab/single-classification)


```json
{
  "createdDateTime": "2021-05-19T14:32:25.578Z",
  "displayName": "MyJobName",
  "expirationDateTime": "2021-05-19T14:32:25.578Z",
  "jobId": "xxxx-xxxxxx-xxxxx-xxxx",
  "lastUpdateDateTime": "2021-05-19T14:32:25.578Z",
  "status": "succeeded",
  "tasks": {
    "completed": 1,
    "failed": 0,
    "inProgress": 0,
    "total": 1,
    "items": [
      {
        "kind": "customSingleClassificationTasks",
        "taskName": "Classify documents",
        "lastUpdateDateTime": "2020-10-01T15:01:03Z",
        "status": "succeeded",
        "results": {
          "documents": [
            {
              "id": "{DOC-ID}",
              "class": [
                  {
                      "category": "Class_1",
                      "confidenceScore": 0.0551877357
                  }
              ],
              "warnings": []
            }
          ],
          "errors": [],
          "modelVersion": "2020-04-01"
        }
      }
    ]
  }
}

```

---


### Use the client libraries (Azure SDK)

To use the client libraries provided by the Azure SDK to send requests to your model, first get your resource key and endpoint:

* Go to your resource overview page in the [Azure portal](https://portal.azure.com/#home)

* From the menu on the left side, select **Keys and Endpoint**. The endpoint and key are used for API requests.

Screenshot that shows the key and endpoint page in the Azure portal.


1. Download and install the client library package for your language of choice:

    | Language | Package version |
    | --- | --- |
    | .NET | [5.2.0-beta.3](https://www.nuget.org/packages/Azure.AI.TextAnalytics/5.2.0-beta.3) |
    | Java | [5.2.0-beta.3](https://mvnrepository.com/artifact/com.azure/azure-ai-textanalytics/5.2.0-beta.3) |
    | JavaScript | [6.0.0-beta.1](https://www.npmjs.com/package/@azure/ai-text-analytics/v/6.0.0-beta.1) |
    | Python | [5.2.0b4](https://pypi.org/project/azure-ai-textanalytics/5.2.0b4/) |

1. After you install the client library, use the following samples on GitHub to start calling the API.

    Single label classification:
    * [C#](https://github.com/Azure/azure-sdk-for-net/blob/main/sdk/textanalytics/Azure.AI.TextAnalytics/samples/Sample9_SingleLabelClassify.md)
    * [Java](https://github.com/Azure/azure-sdk-for-java/blob/main/sdk/textanalytics/azure-ai-textanalytics/src/samples/java/com/azure/ai/textanalytics/lro/SingleLabelClassifyDocument.java)
    * [JavaScript](https://github.com/Azure/azure-sdk-for-js/blob/%40azure/ai-text-analytics_6.0.0-beta.1/sdk/textanalytics/ai-text-analytics/samples/v5/javascript/customText.js)
    * [Python](https://github.com/Azure/azure-sdk-for-python/blob/main/sdk/textanalytics/azure-ai-textanalytics/samples/sample_single_label_classify.py)

    Multi label classification:
    * [C#](https://github.com/Azure/azure-sdk-for-net/blob/main/sdk/textanalytics/Azure.AI.TextAnalytics/samples/Sample10_MultiLabelClassify.md)
    * [Java](https://github.com/Azure/azure-sdk-for-java/blob/main/sdk/textanalytics/azure-ai-textanalytics/src/samples/java/com/azure/ai/textanalytics/lro/MultiLabelClassifyDocument.java)
    * [JavaScript](https://github.com/Azure/azure-sdk-for-js/blob/%40azure/ai-text-analytics_6.0.0-beta.1/sdk/textanalytics/ai-text-analytics/samples/v5/javascript/customText.js)
    * [Python](https://github.com/Azure/azure-sdk-for-python/blob/main/sdk/textanalytics/azure-ai-textanalytics/samples/sample_multi_label_classify.py)

1. See the following reference documentation on the client, and return object:

    * [C#](https://learn.microsoft.com/dotnet/api/azure.ai.textanalytics?view=azure-dotnet-preview\&preserve-view=true)
    * [Java](https://learn.microsoft.com/java/api/overview/azure/ai-textanalytics-readme?view=azure-java-preview\&preserve-view=true)
    * [JavaScript](https://learn.microsoft.com/javascript/api/overview/azure/ai-text-analytics-readme?view=azure-node-preview\&preserve-view=true)
    * [Python](https://learn.microsoft.com/python/api/azure-ai-textanalytics/azure.ai.textanalytics?view=azure-python-preview\&preserve-view=true)

## Related content

* [Custom text classification overview](../overview.md)
* [Custom text classification quickstart](../quickstart.md)
* [Evaluation metrics](../concepts/evaluation-metrics.md)
</content>
