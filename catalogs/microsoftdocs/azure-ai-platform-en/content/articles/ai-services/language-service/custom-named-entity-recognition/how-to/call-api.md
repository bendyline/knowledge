---
title: Send a Named Entity Recognition (NER) request to your custom model
description: Learn how to send requests for custom NER.
titleSuffix: Foundry Tools
author: laujan
manager: mcleans
ms.service: azure-language-foundry-tools
ms.topic: how-to
ms.date: 07/31/2026
ms.author: lajanuar
ai-usage: ai-assisted
ms.devlang: csharp
# ms.devlang: csharp, python
ms.custom: language-service-custom-ner
---
# Query your custom model

After the deployment is added successfully, you can query the deployment to extract entities from your text based on the model you assigned to the deployment.

You can query the deployment programmatically using the [Prediction API](https://learn.microsoft.com/rest/api/language/analyze-text/analyze-text?view=rest-language-analyze-text-2025-11-01\&preserve-view=true) or through the client libraries (Azure SDK).

## Test deployed model

You can retrieve up-to-date information about your projects, make any necessary changes, and oversee project management tasks efficiently through the Microsoft Foundry.

To test your deployed models from within [Microsoft Foundry](https://ai.azure.com/):

1. Select **Testing deployments** from the left side menu.

2. Select the deployment you want to test. You can only test models that are assigned to deployments.

3. For multilingual projects, from the language dropdown, select the language of the text you're testing.

3. Select the deployment you want to query/test from the dropdown.

4. You can enter the text you want to submit to the request or upload a `.txt` file to use.

5. Select **Run the test** from the top menu.

6. In the **Result** tab, you can see the extracted entities from your text and their types. You can also view the JSON response under the **JSON** tab.


A screenshot showing the model test results.

### Submit a custom NER task

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

```json
{
  "displayName": "Extracting entities",
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
      "kind": "CustomEntityRecognition",
      "taskName": "Entity Recognition",
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
| `language` | `{LANGUAGE-CODE}` | A string specifying the language code for the document. If this key isn't specified, the service assumes the default language of the project that was selected during project creation. See [language support](../language-support.md) for a list of supported language codes. | `en-us` |
| `text` | `{DOC-TEXT}` | Document task to run the tasks on. | `Lorem ipsum dolor sit amet` |
| `tasks` |  | List of tasks we want to perform. | `[]` |
| `taskName` | `CustomEntityRecognition` | The task name | CustomEntityRecognition |
| `parameters` |  | List of parameters to pass to the task. |  |
| `project-name` | `{PROJECT-NAME}` | The name for your project. This value is case-sensitive. | `myProject` |
| `deployment-name` | `{DEPLOYMENT-NAME}` | The name of your deployment. This value is case-sensitive. | `prod` |


#### Response

You receive a 202 response indicating that your task has been submitted successfully. In the response **headers**, extract `operation-location`.
`operation-location` is formatted like this:

```rest
{ENDPOINT}/language/analyze-text/jobs/{JOB-ID}?api-version={API-VERSION}
```

You can use this URL to query the task completion status and get the results when task is completed.


### Get task results

Use the following **GET** request to query the status/results of the custom entity recognition task. 

```rest
{ENDPOINT}/language/analyze-text/jobs/{JOB-ID}?api-version={API-VERSION}
```

| Placeholder | Value | Example |
| --- | --- | --- |
| `{ENDPOINT}` | The endpoint for authenticating your API request. | `https://<your-custom-subdomain>.cognitiveservices.azure.com` |
| `{API-VERSION}` | The version of the API you're calling. The value referenced is for the latest version released. For more information, *see* [Model lifecycle](../../concepts/model-lifecycle.md#choose-the-model-version-used-on-your-data). | `2022-05-01` |

#### Headers

| Key | Value |
| --- | --- |
| Ocp-Apim-Subscription-Key | Your key that provides access to this API. |

### Response Body

The response will be a JSON document with the following parameters

```json
{
  "createdDateTime": "2021-05-19T14:32:25.578Z",
  "displayName": "MyJobName",
  "expirationDateTime": "2021-05-19T14:32:25.578Z",
  "jobId": "xxxx-xxxx-xxxxx-xxxxx",
  "lastUpdateDateTime": "2021-05-19T14:32:25.578Z",
  "status": "succeeded",
  "tasks": {
    "completed": 1,
    "failed": 0,
    "inProgress": 0,
    "total": 1,
    "items": [
      {
        "kind": "EntityRecognitionLROResults",
        "taskName": "Recognize Entities",
        "lastUpdateDateTime": "2020-10-01T15:01:03Z",
        "status": "succeeded",
        "results": {
          "documents": [
            {
              "entities": [
                {
                  "category": "Event",
                  "confidenceScore": 0.61,
                  "length": 4,
                  "offset": 18,
                  "text": "trip"
                },
                {
                  "category": "Location",
                  "confidenceScore": 0.82,
                  "length": 7,
                  "offset": 26,
                  "subcategory": "GPE",
                  "text": "Seattle"
                },
                {
                  "category": "DateTime",
                  "confidenceScore": 0.8,
                  "length": 9,
                  "offset": 34,
                  "subcategory": "DateRange",
                  "text": "last week"
                }
              ],
              "id": "1",
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



# [Client libraries (Azure SDK)](#tab/client)

First you need to get your resource key and endpoint:

### Get your key and endpoint

Next you will need the key and endpoint from the resource to connect your application to the API. You'll paste your key and endpoint into the code later in the quickstart.

1. After Azure Language resource deploys successfully, click the **Go to Resource** button under **Next Steps**.

    A screenshot showing the next steps after a resource has deployed.

1. On the screen for your resource, select **Keys and endpoint** on the left pane. You will use one of your keys and your endpoint in the steps below. 

    A screenshot showing the keys and endpoint section for a resource.


3. Download and install the client library package for your language of choice:

    | Language | Package version |
    | --- | --- |
    | .NET | [5.2.0-beta.3](https://www.nuget.org/packages/Azure.AI.TextAnalytics/5.2.0-beta.3) |
    | Java | [5.2.0-beta.3](https://mvnrepository.com/artifact/com.azure/azure-ai-textanalytics/5.2.0-beta.3) |
    | JavaScript | [6.0.0-beta.1](https://www.npmjs.com/package/@azure/ai-text-analytics/v/6.0.0-beta.1) |
    | Python | [5.2.0b4](https://pypi.org/project/azure-ai-textanalytics/5.2.0b4/) |

4. After you install the client library, use the following samples on GitHub to start calling the API.

    * [C#](https://github.com/Azure/azure-sdk-for-net/blob/main/sdk/textanalytics/Azure.AI.TextAnalytics/samples/Sample8_RecognizeCustomEntities.md)
    * [Java](https://github.com/Azure/azure-sdk-for-java/blob/main/sdk/textanalytics/azure-ai-textanalytics/src/samples/java/com/azure/ai/textanalytics/lro/RecognizeCustomEntities.java)
    * [JavaScript](https://github.com/Azure/azure-sdk-for-js/blob/%40azure/ai-text-analytics_6.0.0-beta.1/sdk/textanalytics/ai-text-analytics/samples/v5/javascript/customText.js)
    * [Python](https://github.com/Azure/azure-sdk-for-python/blob/main/sdk/textanalytics/azure-ai-textanalytics/samples/sample_recognize_custom_entities.py)

5. For more information, *see* the following reference documentation:

    * [C#](https://learn.microsoft.com/dotnet/api/azure.ai.textanalytics?view=azure-dotnet-preview\&preserve-view=true)
    * [Java](https://learn.microsoft.com/java/api/overview/azure/ai-textanalytics-readme?view=azure-java-preview\&preserve-view=true)
    * [JavaScript](https://learn.microsoft.com/javascript/api/overview/azure/ai-text-analytics-readme?view=azure-node-preview\&preserve-view=true)
    * [Python](https://learn.microsoft.com/python/api/azure-ai-textanalytics/azure.ai.textanalytics?view=azure-python-preview\&preserve-view=true)

---

## Next steps

* [Frequently asked questions](../faq.md)
