---
title: How to create custom text classification projects
titleSuffix: Foundry Tools
description: Learn about the steps for using Azure resources with custom text classification.
#services: cognitive-services
author: laujan
manager: mcleans
ms.service: azure-language-foundry-tools
ms.topic: how-to
ms.date: 06/30/2026
ms.author: lajanuar
ms.custom: language-service-custom-classification, references_regions
---
# How to create custom text classification project

Use this article to learn how to set up the requirements for starting with custom text classification and create a project.

## Prerequisites

Before you start using custom text classification, you need:

* An Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

## Create a Language resource 

Before you start using custom text classification, you need an Azure Language in Foundry Tools resource. We recommended that you create your Language resource and connect a storage account to it in the Azure portal. Creating a resource in the Azure portal lets you create an Azure storage account at the same time, with all of the required permissions preconfigured. You can also read further in the article to learn how to use a preexisting resource, and configure it to work with custom text classification.

You also need an Azure storage account where to upload your `.txt` documents that are used to train a model to classify text.

> **Note:**
>  * You need to have an **owner** role assigned on the resource group to create a Language resource.
>  * If you connect a preexisting storage account, you should have an **owner** role assigned to it.

## Create Language resource and connect storage account


> **Note:**
> You shouldn't move the storage account to a different resource group or subscription once it's linked with Azure Language resource.

### [Using the Azure portal](#tab/azure-portal)

### Create a new resource from the Azure portal

1. Go to the [Azure portal](https://portal.azure.com/#create/Microsoft.CognitiveServicesTextAnalytics) to create a new Azure Language in Foundry Tools resource. 

1. In the window that appears, select **Custom text classification & custom named entity recognition** from the custom features. Select **Continue to create your resource** at the bottom of the screen. 

    A screenshot showing the selection option for custom text classification and custom named entity recognition in Azure portal.


1. Create a Language resource with following details.

    | Name | Required value |
    | --- | --- |
    | Subscription | Your Azure subscription. |
    | Resource group | A resource group that will contain your resource. You can use an existing one, or create a new one. |
    | Region | One of the [supported regions](../service-limits.md#regional-availability). For example "West US 2". |
    | Name | A name for your resource. |
    | Pricing tier | One of the [supported pricing tiers](../service-limits.md#pricing-tiers). You can use the Free (F0) tier to try the service. |

    If you get a message saying "*your login account is not an owner of the selected storage account's resource group*", your account needs to have an owner role assigned on the resource group before you can create a Language resource. Contact your Azure subscription owner for assistance. 
    
    You can determine your Azure subscription owner by [searching your resource group](https://ms.portal.azure.com/#view/HubsExtension/BrowseResourceGroups) and following the link to its associated subscription. Then: 
    1. Select the **Access Control (IAM)** tab
    2. Select **Role assignments** 
    3. Filter by **Role:Owner**.

1. In the **Custom text classification & custom named entity recognition** section, select an existing storage account or select **New storage account**. Note that these values are to help you get started, and not necessarily the [storage account values](https://learn.microsoft.com/azure/storage/common/storage-account-overview) you'll want to use in production environments. To avoid latency during building your project connect to storage accounts in the same region as your Language resource.

    | Storage account value | Recommended value |
    | --- | --- |
    | Storage account name | Any name |
    | Storage account type | Standard LRS |

1. Make sure the **Responsible AI Notice** is checked. Select **Review + create** at the bottom of the page.


### [Using Azure PowerShell](#tab/azure-powershell)

You can create a new resource and a storage account using the following CLI [template](https://github.com/Azure-Samples/cognitive-services-sample-data-files) and [parameters](https://github.com/Azure-Samples/cognitive-services-sample-data-files) files, which are hosted on GitHub.

Edit the following values in the parameters file:

| Parameter name | Value description |
| --- | --- |
| `name` | Name of your Language resource |
| `location` | The region in which your resource is hosted. See [region support](../service-limits.md#regional-availability) for more information. |
| `sku` | The pricing tier of your resource. See [service limits](../service-limits.md#language-resource-limits) for more information. |
| `storageResourceName` | Name of your storage account |
| `storageLocation` | Region in which your storage account is hosted. |
| `storageSkuType` | SKU of your [storage account](https://learn.microsoft.com/rest/api/storagerp/srp_sku_types). |
| `storageResourceGroupName` | Resource group of your storage account |

Use the following PowerShell command to deploy the Azure Resource Manager (ARM) template with the files you edited.

```powershell
New-AzResourceGroupDeployment -Name ExampleDeployment -ResourceGroupName ExampleResourceGroup `
  -TemplateFile <path-to-arm-template> `
  -TemplateParameterFile <path-to-parameters-file>
```

See the ARM template documentation for information on [deploying templates](https://learn.microsoft.com/azure/azure-resource-manager/templates/deploy-powershell#json-parameter-files) and [parameter files](https://learn.microsoft.com/azure/azure-resource-manager/templates/parameter-files?tabs=json).


---

> **Note:**
> * The process of connecting a storage account to your Language resource is irreversible—it can't be disconnected later.
> * You can only connect your language resource to one storage account.

## Using a preexisting Language resource

| Requirement | Description |
| --- | --- |
| Regions | Make sure your existing resource is provisioned in one of the [supported regions](../service-limits.md#regional-availability). If you don't have a resource, you need to create a new one in a supported region. |
| Pricing tier | The [pricing tier](../service-limits.md#language-resource-limits) for your resource. |
| Managed identity | Make sure that the resource's managed identity setting is enabled. Otherwise, read the next section. |

To use custom text classification, you'll need to [create an Azure storage account](https://learn.microsoft.com/azure/storage/common/storage-account-create) if you don't have one already.

## Enable identity management for your resource

Your Language resource must have identity management, to enable it using [Azure portal](https://portal.azure.com/):

1. Go to your Language resource
1. From left hand menu, under **Resource Management** section, select **Identity**
1. From **System assigned** tab, make sure to set **Status** to **On**

### Enable custom text classification feature

Make sure to enable **Custom text classification / Custom Named Entity Recognition** feature from Azure portal.

1. Go to your Language resource in [Azure portal](https://portal.azure.com/)
2. From the left side menu, under **Resource Management** section, select **Features**
3. Enable **Custom text classification / Custom Named Entity Recognition** feature
4. Connect your storage account
5. Select **Apply**

>**Important:**
>
> * Make sure that your **Language resource** has **storage blob data contributor** role assigned on the storage account you're connecting.

### Set roles for your Azure Language resource and storage account

Use the following steps to set the required roles for your Language resource and storage account.

An animated image showing how to set roles in the Azure portal.

### Roles for your Azure Language in Foundry Tools resource

1. Go to your storage account or Language resource in the [Azure portal](https://portal.azure.com/).
2. Select **Access Control (IAM)** in the left pane.
3. Select **Add** to **Add Role Assignments**, and choose the appropriate role for your account.

    You should have the **owner** or **contributor** role assigned on your Language resource.

4. Within **Assign access to**, select **User, group, or service principal**
5. Select **Select members**
6. Select your user name. You can search for user names in the **Select** field. Repeat this for all roles. 
7. Repeat these steps for all the user accounts that need access to this resource. 

### Roles for your storage account

1. Go to your storage account page in the [Azure portal](https://portal.azure.com/).
2. Select **Access Control (IAM)** in the left pane.
3. Select **Add** to **Add Role Assignments**, and choose the **Storage blob data contributor** role on the storage account.
4. Within **Assign access to**, select **Managed identity**. 
5. Select **Select members**
6. Select your subscription, and **Language** as the managed identity. You can search for user names in the **Select** field. 

> **Important:**
> If you have a virtual network or private endpoint, be sure to select **Allow Azure services on the trusted services list to access this storage account** in the Azure portal.


### Enable CORS for your storage account

Make sure to allow (**GET, PUT, DELETE**) methods when enabling Cross-Origin Resource Sharing (CORS).
Set allowed origins field to `https://ai.azure.com`. Allow all header by adding `*` to the allowed header values, and set the maximum age to `500`.

A screenshot showing how to use CORS for storage accounts.



## Create a custom text classification project (REST API)

Once your resource and storage container are configured, create a new custom text classification project. A project is a work area for building your custom AI models based on your data. Your project is only accessible by you and others who have access to the Azure resource being used. If you labeled data, you can [import it](#import-a-custom-text-classification-project-rest-api) to get started.


To start creating a custom text classification model, you need to create a project. Creating a project lets you label data, train, evaluate, improve, and deploy your models.

> **Note:**
> The project name is case-sensitive for all operations.

Create a **PATCH** request using the following URL, headers, and JSON body to create your project.

### Request URL

Use the following URL to create a project. Replace the placeholder values with your own values. 

```rest
{Endpoint}/language/authoring/analyze-text/projects/{projectName}?api-version={API-VERSION}
```

| Placeholder | Value | Example |
| --- | --- | --- |
| `{ENDPOINT}` | The endpoint for authenticating your API request. | `https://<your-custom-subdomain>.cognitiveservices.azure.com` |
| `{PROJECT-NAME}` | The name for your project. This value is case-sensitive. | `myProject` |
| `{API-VERSION}` | The version of the API you're calling. The value referenced is for the latest version released. See [Model lifecycle](../../concepts/model-lifecycle.md#choose-the-model-version-used-on-your-data) to learn more about other available API versions. | `2022-05-01` |


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
  "projectName": "{PROJECT-NAME}",
  "language": "{LANGUAGE-CODE}",
  "projectKind": "customMultiLabelClassification",
  "description": "Project description",
  "multilingual": "True",
  "storageInputContainerName": "{CONTAINER-NAME}"
}

```

| Key | Placeholder | Value | Example |
| --- | --- | --- | --- |
| projectName | `{PROJECT-NAME}` | The name of your project. This value is case-sensitive. | `myProject` |
| language | `{LANGUAGE-CODE}` | A string specifying the language code for the documents used in your project. If your project is a multilingual project, choose the language code of most the documents. See [language support](../language-support.md) to learn more about supported language codes. | `en-us` |
| projectKind | `customMultiLabelClassification` | Your project kind. | `customMultiLabelClassification` |
| multilingual | `true` | A boolean value that enables you to have documents in multiple languages in your dataset and when your model is deployed you can query the model in any supported language (not necessarily included in your training documents. See [language support](../language-support.md#multi-lingual-option) to learn more about multilingual support. | `true` |
| storageInputContainerName | `{CONTAINER-NAME}` | The name of your Azure storage container for your uploaded documents. | `myContainer` |

# [Single label classification](#tab/single-classification)

```json
{
  "projectName": "{PROJECT-NAME}",
  "language": "{LANGUAGE-CODE}",
  "projectKind": "customSingleLabelClassification",
  "description": "Project description",
  "multilingual": "True",
  "storageInputContainerName": "{CONTAINER-NAME}"
}
```
| Key | Placeholder | Value | Example |
| --- | --- | --- | --- |
| projectName | `{PROJECT-NAME}` | The name of your project. This value is case-sensitive. | `myProject` |
| language | `{LANGUAGE-CODE}` | A string specifying the language code for the documents used in your project. If your project is a multilingual project, choose the language code of most the documents. See [language support](../language-support.md) to learn more about supported language codes. | `en-us` |
| projectKind | `customSingleLabelClassification` | Your project kind. | `customSingleLabelClassification` |
| multilingual | `true` | A boolean value that enables you to have documents in multiple languages in your dataset and when your model is deployed you can query the model in any supported language (not necessarily included in your training documents. See [language support](../language-support.md#multi-lingual-option) to learn more about multilingual support. | `true` |
| storageInputContainerName | `{CONTAINER-NAME}` | The name of your Azure storage container for your uploaded documents. | `myContainer` |

---

This request returns a 201 response, which means that the project is created.


This request returns an error if:
* The selected resource doesn't have proper permission for the storage account. 



## Import a custom text classification project (REST API)

If you already labeled data, use it to get started with the service. Make sure that your labeled data follows the [accepted data formats](../concepts/evaluation-metrics.md#accepted-data-formats).

Submit a **POST** request using the following URL, headers, and JSON body to import your labels file. Make sure that your labels file follow the [accepted format](../concepts/evaluation-metrics.md#accepted-data-formats).

If a project with the same name already exists, the data of that project is replaced.

```rest
{Endpoint}/language/authoring/analyze-text/projects/{projectName}/:import?api-version={API-VERSION}
```

| Placeholder | Value | Example |
| --- | --- | --- |
| `{ENDPOINT}` | The endpoint for authenticating your API request. | `https://<your-custom-subdomain>.cognitiveservices.azure.com` |
| `{PROJECT-NAME}` | The name for your project. This value is case-sensitive. | `myProject` |
| `{API-VERSION}` | The version of the API you're calling. The value referenced is for the latest version released. Learn more about other available [API versions](../../concepts/model-lifecycle.md#choose-the-model-version-used-on-your-data) | `2022-05-01` |

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
| api-version | `{API-VERSION}` | The version of the API you're calling. The version used here must be the same API version in the URL. Learn more about other available [API versions](../../concepts/model-lifecycle.md#choose-the-model-version-used-on-your-data) | `2022-05-01` |
| projectName | `{PROJECT-NAME}` | The name of your project. This value is case-sensitive. | `myProject` |
| projectKind | `customMultiLabelClassification` | Your project kind. | `customMultiLabelClassification` |
| language | `{LANGUAGE-CODE}` | A string specifying the language code for the documents used in your project. If your project is a multilingual project, choose the language code for most of the documents. See [language support](../language-support.md#multi-lingual-option) to learn more about multilingual support. | `en-us` |
| multilingual | `true` | A boolean value that enables you to have documents in multiple languages in your dataset and when your model is deployed you can query the model in any supported language (not necessarily included in your training documents. See [language support](../language-support.md#multi-lingual-option) to learn more about multilingual support. | `true` |
| storageInputContainerName | `{CONTAINER-NAME}` | The name of your Azure storage container for your uploaded documents. | `myContainer` |
| classes | [] | Array containing all the classes you have in the project. | [] |
| documents | [] | Array containing all the documents in your project and what the classes labeled for this document. | [] |
| location | `{DOCUMENT-NAME}` | The location of the documents in the storage container. Since all the documents are in the root of the container, it should be the document name. | `doc1.txt` |
| dataset | `{DATASET}` | The test set to which this document goes to when split before training. See [How to train a model](build-train-deploy-model.md#data-splitting). Possible values for this field are `Train` and `Test`. | `Train` |


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
| language | `{LANGUAGE-CODE}` | A string specifying the language code for the documents used in your project. If your project is a multilingual project, choose the language code for most of the documents. See [language support](../language-support.md) to learn more about supported language codes. | `en-us` |
| multilingual | `true` | A boolean value that enables you to have documents in multiple languages in your dataset and when your model is deployed you can query the model in any supported language (not necessarily included in your training documents. See [language support](../language-support.md#multi-lingual-option) to learn more about multilingual support. | `true` |
| storageInputContainerName | `{CONTAINER-NAME}` | The name of your Azure storage container for your uploaded documents. | `myContainer` |
| classes | [] | Array containing all the classes you have in the project. | [] |
| documents | [] | Array containing all the documents in your project and which class this document belongs to. | [] |
| location | `{DOCUMENT-NAME}` | The location of the documents in the storage container. Since all the documents are in the root of the container, it should be the document name. | `doc1.txt` |
| dataset | `{DATASET}` | The test set to which this document goes to when split before training. See [How to train a model](build-train-deploy-model.md#data-splitting) to learn more about data splitting. Possible values for this field are `Train` and `Test`. | `Train` |

---

Once you send your API request, you receive a `202` response indicating that the job was submitted correctly. In the response headers, extract the `operation-location` value formatted like this: 

```rest
{ENDPOINT}/language/authoring/analyze-text/projects/{PROJECT-NAME}/import/jobs/{JOB-ID}?api-version={API-VERSION}
``` 

`{JOB-ID}` is used to identify your request, since this operation is asynchronous. You use this URL to get the import job status.

Possible error scenarios for this request:

* The selected resource doesn't have [proper permissions](create-project.md#using-a-preexisting-language-resource) for the storage account.
* The `storageInputContainerName` specified doesn't exist.
* Invalid language code is used, or if the language code type isn't string.
* `multilingual` value is a string and not a boolean.


## Get project details (REST API)

To get custom text classification project details, submit a **GET** request using the following URL and headers. Replace the placeholder values with your own values.   

```rest
{ENDPOINT}/language/authoring/analyze-text/projects/{PROJECT-NAME}?api-version={API-VERSION}
```

| Placeholder | Value | Example |
| --- | --- | --- |
| `{ENDPOINT}` | The endpoint for authenticating your API request. | `https://<your-custom-subdomain>.cognitiveservices.azure.com` |
| `{PROJECT-NAME}` | The name for your project. This value is case-sensitive. | `myProject` |
| `{API-VERSION}` | The version of the API you're calling. The value referenced is for the latest released [model version](../../concepts/model-lifecycle.md#choose-the-model-version-used-on-your-data). | `2022-05-01` |

### Headers

Use the following header to authenticate your request. 

| Key | Value |
| --- | --- |
| `Ocp-Apim-Subscription-Key` | The key to your resource. Used for authenticating your API requests. |

### Response Body

Once you send the request, you get the following response. 
```json
{
  "createdDateTime": "2022-04-23T13:39:09.384Z",
  "lastModifiedDateTime": "2022-04-23T13:39:09.384Z",
  "lastTrainedDateTime": "2022-04-23T13:39:09.384Z",
  "lastDeployedDateTime": "2022-04-23T13:39:09.384Z",
  "projectKind": "customSingleLabelClassification",
  "storageInputContainerName": "{CONTAINER-NAME}",
  "projectName": "{PROJECT-NAME}",
  "multilingual": true,
  "description": "Project description",
  "language": "{LANGUAGE-CODE}"
}

```

| Value | placeholder | Description | Example |
| --- | --- | --- | --- |
| `projectKind` | `customSingleLabelClassification` | Your project kind. | This value can be `customSingleLabelClassification` or `customMultiLabelClassification`. |
| `storageInputContainerName` | `{CONTAINER-NAME}` | The name of your Azure storage container for your uploaded documents. | `myContainer` |
| `projectName` | `{PROJECT-NAME}` | The name of your project. This value is case-sensitive. | `myProject` |
| `multilingual` |  | A boolean value that enables you to have documents in multiple languages in your dataset. When your model is deployed, you can query the model in any supported language (not necessarily included in your training documents. For more information on multilingual support, see [language support](../language-support.md#multi-lingual-option). | `true` |
| `language` | `{LANGUAGE-CODE}` | A string specifying the language code for the documents used in your project. If your project is a multilingual project, choose the language code for most of the documents. See [language support](../language-support.md) to learn more about supported language codes. | `en-us` |

Once you send your API request, you receive a `200` response indicating success and JSON response body with your project details.


## Delete project (REST API)


When you no longer need your project, you can delete it with the following **DELETE** request. Replace the placeholder values with your own values.   

```rest
{Endpoint}/language/authoring/analyze-text/projects/{projectName}?api-version={API-VERSION}
```

| Placeholder | Value | Example |
| --- | --- | --- |
| `{ENDPOINT}` | The endpoint for authenticating your API request. | `https://<your-custom-subdomain>.cognitiveservices.azure.com` |
| `{PROJECT-NAME}` | The name for your project. This value is case-sensitive. | `myProject` |
| `{API-VERSION}` | The version of the API you're calling. The value referenced is for the latest version released. Learn more about other available [API versions](../../concepts/model-lifecycle.md#choose-the-model-version-used-on-your-data) | `2022-05-01` |

### Headers

Use the following header to authenticate your request. 

| Key | Value |
| --- | --- |
| Ocp-Apim-Subscription-Key | The key to your resource. Used for authenticating your API requests. |


Once you send your API request, you receive a `202` response indicating success, which means your project is deleted. A successful call results with an `Operation-Location` header used to check the status of the job.



## Next steps

* You should plan the [project schema](build-train-deploy-model.md#prepare-your-data-and-define-a-schema) used to label your data.

* After your project is created, you can start [labeling your data](build-train-deploy-model.md#label-your-data). Labeling informs your text classification model how to interpret text and is used for training and evaluation.
