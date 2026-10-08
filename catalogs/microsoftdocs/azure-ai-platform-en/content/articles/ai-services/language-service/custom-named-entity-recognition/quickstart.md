---
title: Quickstart - Custom named entity recognition (NER)
titleSuffix: Foundry Tools
description: Quickly start building an AI model to categorize and extract information from unstructured text.
author: laujan
manager: mcleans
ms.service: azure-language-foundry-tools
ms.topic: quickstart
ms.date: 01/11/2026
ms.author: lajanuar
ms.custom: language-service-custom-ner, mode-other
zone_pivot_groups: foundry-rest-api
---
<!-- markdownlint-disable MD025 -->
# Quickstart: Custom named entity recognition

This guide provides step-by-step instructions for using custom named entity recognition (NER) with Microsoft Foundry or the REST API. NER lets you detect and categorize entities in unstructured text—like people, places, organizations, and numbers. Custom NER enables the training of models to identify entities that are specific to a business and allows for ongoing adaptation as requirements change.

To get start, [a sample loan agreement](https://go.microsoft.com/fwlink/?linkid=2175226) is provided as a dataset to build a custom NER model and extract these key entities:

* Date of the agreement
* Borrower's name, address, city, and state
* Lender's name, address, city, and state
* Loan and interest amounts

**Applies to: microsoft-foundry**


> **Note:**
>
> * If you already have an Azure Language in Foundry Tools or multi-service resource, you can continue to use those existing Language resources within the Microsoft Foundry portal. For more information, see [How to use Foundry Tools in the Foundry portal](https://learn.microsoft.com/azure/ai-services/connect-services-foundry-portal).

## Prerequisites

* An **Azure subscription**. If you don't have one, you can [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

* The **Requisite permissions**. Make sure the person establishing the account and project is assigned as the Foundry Account Owner role at the subscription level. Alternatively, having either the **Contributor** or **Cognitive Services Contributor** role at the subscription scope also meets this requirement. For more information, *see* [Role based access control (RBAC)](https://learn.microsoft.com/azure/ai-foundry/openai/how-to/role-based-access-control).

  
> **Important:**
> The Foundry RBAC roles were recently renamed. **Foundry User**, **Foundry Owner**, **Foundry Account Owner**, and **Foundry Project Manager** were previously named Azure AI User, Azure AI Owner, Azure AI Account Owner, and Azure AI Project Manager. You might still see the previous names in some places while the rename rolls out. The role IDs and core permissions are unchanged by the rename.


*  An [**Language resource with a storage account**](https://portal.azure.com/?Microsoft_Azure_PIMCommon=true#create/Microsoft.CognitiveServicesTextAnalytics). On the **select additional features** page, select the **Custom text classification, Custom named entity recognition, Custom sentiment analysis & Custom Text Analytics for health** box to link a required storage account to this resource:

    Screenshot of the select additional features option in the Foundry.

  > **Note:**
  >  * You need to have an **owner** role assigned on the resource group to create a Language resource.
  >  * If you're connecting a preexisting storage account, you should have an owner role assigned to it.
  >  * Don't move the storage account to a different resource group or subscription once linked with Azure Language resource.


* **A Foundry project created in the Foundry**. For more information, *see* [Create a Foundry project](https://learn.microsoft.com/azure/ai-foundry/how-to/create-projects).

* **A custom NER dataset uploaded to your storage container**. A custom named entity recognition (NER) dataset is the collection of labeled text documents used to train your custom NER model. You can [download our sample dataset](https://go.microsoft.com/fwlink/?linkid=2175226) for this quickstart. The source language is English.

## Step 1: Configure required roles, permissions, and settings

Let's begin by configuring your resources.

### Enable custom named entity recognition feature

Make sure the **Custom text classification / Custom Named Entity Recognition** feature is enabled in the [Azure portal](https://portal.azure.com/).

1. Navigate to your Language resource in the [Azure portal](https://portal.azure.com).
1. From the left side menu, under **Resource Management** section, select **Features**.
1. Make sure the **Custom text classification / Custom Named Entity Recognition** feature is enabled.
1. If your storage account isn't assigned, select and connect your storage account.
1. Select **Apply**.

### Add required roles for your Language resource

1. From the Language resource page in the [Azure portal](https://portal.azure.com/), select **Access Control (IAM)** in the left pane.
1. Select **Add** to **Add Role Assignments**, and add **Cognitive Services Language Owner** or **Cognitive Services Contributor** role assignment for your Language resource.
1. Within **Assign access to**, select **User, group, or service principal**.
1. Select **Select members**.
1. Select ***your user name***. You can search for user names in the **Select** field. Repeat this step for all roles.
1. Repeat these steps for all the user accounts that need access to this resource.


### Add required roles for your storage account

1. Go to your storage account page in the [Azure portal](https://portal.azure.com/).
1. Select **Access Control (IAM)** in the left pane.
1. Select **Add** to **Add Role Assignments**, and choose the **Storage blob data contributor** role on the storage account.
1. Within **Assign access to**, select **Managed identity**.
1. Select **Select members**.
1. Select your subscription, and **Language** as the managed identity. You can search for your language resource in the **Select** field.

### Add required user roles

> **Important:**
> If you skip this step, you get a 403 error when you try to connect to your custom project. It's important that your current user has this role to access storage account blob data, even if you're the owner of the storage account.
>

1. Go to your storage account page in the [Azure portal](https://portal.azure.com/).
1. Select **Access Control (IAM)** in the left pane.
1. Select **Add** to **Add Role Assignments**, and choose the **Storage blob data contributor** role on the storage account.
1. Within **Assign access to**, select **User, group, or service principal**.
1. Select **Select members**.
1. Select your User. You can search for user names in the **Select** field.

> **Important:**
> If you have a Firewall or virtual network or private endpoint, be sure to select **Allow Azure services on the trusted services list to access this storage account** under the **Networking tab** in the Azure portal.

   Screenshot of allow Azure services enabled in Foundry.

## Step 2: Upload your dataset to your storage container

Next, let's add a container and upload your dataset files directly to the root directory of your storage container. These documents are used to train your model.

1. Add a container to the storage account associated with your language resource. For more information, *see* [create a container](https://learn.microsoft.com/azure/storage/blobs/storage-quickstart-blobs-portal#create-a-container).

1. [Download the sample dataset](https://go.microsoft.com/fwlink/?linkid=2175226) from GitHub. The provided sample dataset contains 20 loan agreements:

    * Each agreement includes two parties: a lender and a borrower.
    * You extract relevant information for: both parties, agreement date, loan amount, and interest rate.

1. Open the .zip file, and extract the folder containing the documents.

1. Navigate to the Foundry.

1. If you aren't already signed in, the portal prompts you to do so with your Azure credentials.

1. Once signed in, access your existing Foundry project for this quickstart.

1. Select **Management center** from the left navigation menu.

1. Select **Connected resources** from the **Hub** section of the **Management center** menu.

1. Next choose the workspace blob storage that was set up for you as a connected resource.

1. On the workspace blob storage, select **View in Azure portal**.


1. On the **AzurePortal** page for your blob storage, select **Upload** from the top menu. Next, choose the `.txt` and `.json` files you downloaded earlier. Finally, select the **Upload** button to add the file to your container.

    A screenshot showing the button for uploading files to the storage account.


Now that the required Azure resources are provisioned and configured within the Azure portal,  let's use these resources in the Foundry to create a fine-tuned custom Named Entity Recognition (NER) model.

## Step 3: Connect your Language resource

Next we create a connection to your Language resource so Foundry can access it securely. This connection provides secure identity management and authentication, as well as controlled and isolated access to data.

1. Return to the [Foundry](https://ai.azure.com/).

1. Access your existing Foundry project for this quickstart.

1. Select **Management center** from the left navigation menu.

1. Select **Connected resources** from the **Hub** section of the **Management center** menu.

1. In the main  window, select the **+ New connection** button.

1. Select **Language** from the **Add a connection to external assets** window.

1. Select **Add connection**, then select **Close.**

    Screenshot of the connection window in Foundry.

## Step 4: Fine tune your custom NER model

Now, we're ready to create a  custom NER fine-tune model.

1. From the **Project** section of the **Management center** menu, select **Go to project**.

1. From the **Overview** menu, select **Fine-tuning**.

1. From the main window, select **the AI Service fine-tuning** tab and then the **+ Fine-tune** button.

1. From the **Create service fine-tuning** window, choose the **Custom named entity recognition** tab, and then select **Next**.

    Screenshot of the fine-tuning selection tile in Foundry.

1. In the **Create service fine-tuning task** window, complete the fields as follows:

    * **Connected service**. The name of your Language resource should already appear in this field by default. if not, add it from the drop-down menu.

    * **Name**. Give your fine-tuning task project a name.

    * **Language**. English is set as the default and already appears in the field.

    * **Description**. You can optionally provide a description or leave this field empty.

     * **Blob store container**. Select the workspace blob storage container from [Step 2](#step-2-upload-your-dataset-to-your-storage-container) and choose the **Connect** button.

1. Finally, select the  **Create** button. It can take a few minutes for the *creating* operation to complete.

## Step 5: Train your model

   Screenshot of fine-tuning workflow in Foundry.


1. From the **Getting Started** menu, choose **Manage data**. In the **Add data for training and testing** window, you see the sample data that you previously uploaded to your Azure Blob Storage container.
1. Next, from the **Getting Started** menu, select **Train model**.
1. Select the **+ Train model button**. When the **Train a new model** window appears, enter a name for your new model and keep the default values. Select the **Next** button.
1. In the **Train a new model** window, keep the default **Automatically split the testing set from training data** enabled with the recommended percentage set at 80% for training data and 20% for testing data.
1. Review your model configuration then select the **Create** button.
1. After training a model, you can select **Evaluate model** from the **Getting started** menu. You can select your model from the **Evaluate you model** window and make improvements if necessary.

## Step 6: Deploy your model

Typically, after training a model, you review its evaluation details. For this quickstart, you can just deploy your model and make it available to test in Azure Language playground, or by calling the [prediction API](https://aka.ms/clu-apis). However, if you wish, you can take a moment to select **Evaluate your model** from the left-side menu and explore the in-depth telemetry for your model. Complete the following steps to deploy your model within Foundry.

1. Select **Deploy model** from the left-side menu.
1. Next, select **➕Deploy a trained model** from the **Deploy your model** window.

    Screenshot of the deploy your model window in Foundry.

1. Make sure the **Create a new deployment** button is selected.

1. Complete the **Deploy a trained model** window fields:

   * **Deployment name**. Name your model.
   * **Assign a model**. Select your trained model from the drop-down menu.
   * **Region**. Select a region from the drop-down menu.

1. Finally, select the **Create** button. It may take a few minutes for your model to deploy.

1. After successful deployment, you can view your model's deployment status on the **Deploy your model** page. The expiration date that appears marks the date when your deployed model becomes unavailable for prediction tasks. This date is usually 18 months after a training configuration is deployed.

    Screenshot of the deploy your model status window in Foundry.

## Step 7: Try Azure Language playground

The Language playground provides a sandbox to test and configure your fine-tuned model before deploying it to production, all without writing code.

1. From the top menu bar, select **Try in playground**.
1. In Azure Language Playground window, select the **Custom named entity recognition** tile.
1. In the **Configuration** section, select your **Project name** and **Deployment name** from the drop-down menus.
1. Enter an entity and select **Run**.
1. You can evaluate the results in the **Details** window.


That's it, congratulations!

In this quickstart, you created a fine-tuned custom NER model, deployed it in Foundry, and tested your model in Azure Language playground.

## Clean up resources

If you no longer need your project, you can delete it from the Foundry.

1. Navigate to the [Foundry](https://ai.azure.com/) home page. Initiate the authentication process by signing in, unless you already completed this step and your session is active.
1. Select the project that you want to delete from the **Keep building with Foundry**.
1. Select **Management center**.
1. Select **Delete project**.

To delete the hub along with all its projects:

1. Navigate to the **Overview** tab in the **Hub** section.

1. On the right, select **Delete hub**.
1. The link opens the Azure portal for you to delete the hub there.




**Applies to: rest-api**


## Prerequisites

* Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)



## Create a new Azure Language in Foundry Tools resource and Azure storage account

Before you can use custom named entity recognition (NER), you need to create a Language resource, which gives you the credentials that you need to create a project and start training a model. You also need an Azure storage account, where you can upload your dataset that is used in building your model.

> **Important:**
> To get started quickly, we recommend creating a new Language resource. Use the steps provided in this article, to create Azure Language resource, and create and/or connect a storage account at the same time. Creating both at the same time is easier than doing it later.
>
> If you have a preexisting resource that you'd like to use, you need to connect it to storage account. See [create project](how-to/create-project.md)  for information.

### Create a new resource from the Azure portal

1. Sign in to the [Azure portal](https://portal.azure.com/#create/Microsoft.CognitiveServicesTextAnalytics) to create a new Azure Language in Foundry Tools resource. 

1. In the window that appears, select **Custom text classification & custom named entity recognition** from the custom features. Select **Continue to create your resource** at the bottom of the screen. 

    A screenshot showing custom text classification & custom named entity recognition in the Azure portal.

1. Create a Language resource with following details.

    | Name | Description |
    | --- | --- |
    | Subscription | Your Azure subscription. |
    | Resource group | A resource group that contains your resource. You can use an existing one, or create a new one. |
    | Region | The [region](service-limits.md#regional-availability) for your Language resource. For example, "West US 2." |
    | Name | A name for your resource. |
    | Pricing tier | The [pricing tier](service-limits.md#language-resource-limits) for your Language resource. You can use the Free (F0) tier to try the service. |

    > **Note:**
    > If you get a message saying "*your sign in account isn't an owner of the selected storage account's resource group*," your account needs to have an owner role assigned on the resource group before you can create a Language resource. Contact your Azure subscription owner for assistance.

1. In the **Custom text classification & custom named entity recognition** section, select an existing storage account or select **New storage account**. These values are to help you get started, and not necessarily the [storage account values](https://learn.microsoft.com/azure/storage/common/storage-account-overview) you want to use in production environments. To avoid latency during building your project, connect to storage accounts in the same region as your Language resource.

    | Storage account value | Recommended value |
    | --- | --- |
    | Storage account name | Any name |
    | Storage account type | Standard locally redundant storage (LRS) |

1. Make sure the **Responsible AI Notice** is checked. Select **Review + create** at the bottom of the page, then select **Create**.




## Upload sample data to blob container

After you create an Azure storage account and connected it to your Language resource, you need to upload the documents from the sample dataset to the root directory of your container. These documents are used to train your model.


1. [Download the sample dataset](https://go.microsoft.com/fwlink/?linkid=2175226) from GitHub.

2. Open the .zip file, and extract the folder containing the documents.

2. In the [Azure portal](https://portal.azure.com), navigate to the storage account you created, and select it.

3. In your storage account, select **Containers** from the left menu, located below **Data storage**. On the screen that appears, select **+ Container**. Give the container the name **example-data** and leave the default **Public access level**.

    A screenshot showing the main page for a storage account.

4. After your container is created, select it. Then select **Upload** button to select the `.txt` and `.json` files you downloaded earlier. 

    A screenshot showing the button for uploading files to the storage account.


The provided sample dataset contains 20 loan agreements. Each agreement includes two parties: a lender and a borrower. You can use the provided sample file to extract relevant information for: both parties, an agreement date, a loan amount, and an interest rate.




### Get your resource keys and endpoint

1. Go to your resource overview page in the [Azure portal](https://portal.azure.com/#home)

2. From the menu on the left side, select **Keys and Endpoint**. The endpoint and key are used for API requests. 

    A screenshot showing the key and endpoint page in the Azure portal




## Create a custom NER project

Once your resource and storage account are configured, create a new custom NER project. A project is a work area for building your custom ML models based on your data. Your project is accessed you and others who have access to Azure Language resource being used.

Use the tags file you downloaded from the [sample data](https://github.com/Azure-Samples/cognitive-services-sample-data-files) in the previous step and add it to the body of the following request. 

### Trigger import project job 

Submit a **POST** request using the following URL, headers, and JSON body to import your labels file. Make sure that your labels file follow the [accepted format](concepts/data-formats.md).

If a project with the same name already exists, the data of that project is replaced.

```rest
{Endpoint}/language/authoring/analyze-text/projects/{projectName}/:import?api-version={API-VERSION}
```

| Placeholder | Value | Example |
| --- | --- | --- |
| `{ENDPOINT}` | The endpoint for authenticating your API request. | `https://<your-custom-subdomain>.cognitiveservices.azure.com` |
| `{PROJECT-NAME}` | The name for your project. This value is case-sensitive. | `myProject` |
| `{API-VERSION}` | The version of the API you're calling. The value referenced here's for the latest version released. For more information, *see* [Model lifecycle](../concepts/model-lifecycle.md#choose-the-model-version-used-on-your-data). | `2022-05-01` |

### Headers

Use the following header to authenticate your request. 

| Key | Value |
| --- | --- |
| `Ocp-Apim-Subscription-Key` | The key to your resource. Used for authenticating your API requests. |


### Body

Use the following JSON in your request. Replace the placeholder values with your own values. 

```json
{
    "projectFileVersion": "{API-VERSION}",
    "stringIndexType": "Utf16CodeUnit",
    "metadata": {
        "projectName": "{PROJECT-NAME}",
        "projectKind": "CustomEntityRecognition",
        "description": "Trying out custom NER",
        "language": "{LANGUAGE-CODE}",
        "multilingual": true,
        "storageInputContainerName": "{CONTAINER-NAME}",
        "settings": {}
    },
    "assets": {
    "projectKind": "CustomEntityRecognition",
        "entities": [
            {
                "category": "Entity1"
            },
            {
                "category": "Entity2"
            }
        ],
        "documents": [
            {
                "location": "{DOCUMENT-NAME}",
                "language": "{LANGUAGE-CODE}",
                "dataset": "{DATASET}",
                "entities": [
                    {
                        "regionOffset": 0,
                        "regionLength": 500,
                        "labels": [
                            {
                                "category": "Entity1",
                                "offset": 25,
                                "length": 10
                            },
                            {
                                "category": "Entity2",
                                "offset": 120,
                                "length": 8
                            }
                        ]
                    }
                ]
            },
            {
                "location": "{DOCUMENT-NAME}",
                "language": "{LANGUAGE-CODE}",
                "dataset": "{DATASET}",
                "entities": [
                    {
                        "regionOffset": 0,
                        "regionLength": 100,
                        "labels": [
                            {
                                "category": "Entity2",
                                "offset": 20,
                                "length": 5
                            }
                        ]
                    }
                ]
            }
        ]
    }
}
```

| Key | Placeholder | Value | Example |
| --- | --- | --- | --- |
| `api-version` | `{API-VERSION}` | The version of the API you're calling. The version used here must be the same API version in the URL. Learn more about other available [API versions](../concepts/model-lifecycle.md#choose-the-model-version-used-on-your-data) | `2022-03-01-preview` |
| `projectName` | `{PROJECT-NAME}` | The name of your project. This value is case-sensitive. | `myProject` |
| `projectKind` | `CustomEntityRecognition` | Your project kind. | `CustomEntityRecognition` |
| `language` | `{LANGUAGE-CODE}` | A string specifying the language code for the documents used in your project. If your project is a multilingual project, choose the [language code](language-support.md) of most the documents. | `en-us` |
| `multilingual` | `true` | A boolean value that enables you to have documents in multiple languages in your dataset and when your model is deployed you can query the model in any supported language (not necessarily included in your training documents. See [language support](language-support.md#multi-lingual-option) for information on multilingual support. | `true` |
| `storageInputContainerName` | {CONTAINER-NAME} | The name of your Azure storage container containing your uploaded documents. | `myContainer` |
| `entities` |  | Array containing all the entity types you have in the project and extracted from your documents. |  |
| `documents` |  | Array containing all the documents in your project and list of the entities labeled within each document. | [] |
| `location` | `{DOCUMENT-NAME}` | The location of the documents in the storage container. | `doc1.txt` |
| `dataset` | `{DATASET}` | The test set to which this file goes to when split before training. For more information, *see* [How to train a model](how-to/train-model.md#data-splitting). Possible values for this field are `Train` and `Test`. | `Train` |


Once you send your API request, you receive a `202` response indicating that the job was submitted correctly. In the response headers, extract the `operation-location` value. Here's an example of the format: 

```rest
{ENDPOINT}/language/authoring/analyze-text/projects/{PROJECT-NAME}/import/jobs/{JOB-ID}?api-version={API-VERSION}
``` 

`{JOB-ID}` is used to identify your request, since this operation is asynchronous. You use this URL to get the import job status.  

Possible error scenarios for this request:

* The selected resource doesn't have [proper permissions](how-to/create-project.md) for the storage account.
* The `storageInputContainerName` specified doesn't exist.
* Invalid language code is used, or if the language code type isn't string.
* `multilingual` value is a string and not a boolean.




### Get import job status

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
| `{API-VERSION}` | The version of the API you're calling. The value referenced is for the latest version released. For more information, *see* [Model lifecycle](../concepts/model-lifecycle.md#choose-the-model-version-used-on-your-data). | `2022-05-01` |

#### Headers

Use the following header to authenticate your request. 

| Key | Value |
| --- | --- |
| `Ocp-Apim-Subscription-Key` | The key to your resource. Used for authenticating your API requests. |




## Train your model

Typically after you create a project, you go ahead and start [tagging the documents](how-to/tag-data.md) you have in the container connected to your project. For this quickstart, you imported a sample tagged dataset and initialized your project with the sample JSON tags file.

### Start training job

After your project is imported, you can start training your model. 

Submit a **POST** request using the following URL, headers, and JSON body to submit a training job. Replace the placeholder values with your own values. 

```rest
{ENDPOINT}/language/authoring/analyze-text/projects/{PROJECT-NAME}/:train?api-version={API-VERSION}
```

| Placeholder | Value | Example |
| --- | --- | --- |
| `{ENDPOINT}` | The endpoint for authenticating your API request. | `https://<your-custom-subdomain>.cognitiveservices.azure.com` |
| `{PROJECT-NAME}` | The name of your project. This value is case-sensitive. | `myProject` |
| `{API-VERSION}` | The version of the API you're calling. The value referenced is for the latest version released. For more information, *see* [Model lifecycle](../concepts/model-lifecycle.md#choose-the-model-version-used-on-your-data). | `2022-05-01` |

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
| trainingConfigVersion | `{CONFIG-VERSION}` | This is the [model version](../concepts/model-lifecycle.md) used to train the model. | `2022-05-01` |
| evaluationOptions |  | Option to split your data across training and testing sets. | `{}` |
| kind | `percentage` | Split methods. Possible values are `percentage` or `manual`. For more information, *see* [How to train a model](how-to/train-model.md#data-splitting). | `percentage` |
| trainingSplitPercentage | `80` | Percentage of your tagged data to be included in the training set. Recommended value is `80`. | `80` |
| testingSplitPercentage | `20` | Percentage of your tagged data to be included in the testing set. Recommended value is `20`. | `20` |

  > **Note:**
  > The `trainingSplitPercentage` and `testingSplitPercentage` are only required if `Kind` is set to `percentage` and the sum of both percentages should be equal to 100.

Once you send your API request, you receive a `202` response indicating that the job was submitted correctly. In the response headers, extract the `location` value formatted like this: 

```rest
{ENDPOINT}/language/authoring/analyze-text/projects/{PROJECT-NAME}/train/jobs/{JOB-ID}?api-version={API-VERSION}
```

`{JOB-ID}` is used to identify your request, since this operation is asynchronous. You can use this URL to get the training status.




### Get training job status

Training could take sometime between 10 and 30 minutes for this sample dataset. You can use the following request to keep polling the status of the training job until successfully completed.

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

Generally after training a model you would review it's [evaluation details](how-to/view-model-evaluation.md) and [make improvements](how-to/view-model-evaluation.md) if necessary. In this quickstart, you just deploy your model and make it available for testing in the Microsoft Foundry portal, or you can call the [prediction API](https://aka.ms/ct-runtime-swagger).

### Start deployment job

Submit a **PUT** request using the following URL, headers, and JSON body to submit a deployment job. Replace the placeholder values with your own values. 

```rest
{Endpoint}/language/authoring/analyze-text/projects/{projectName}/deployments/{deploymentName}?api-version={API-VERSION}
```

| Placeholder | Value | Example |
| --- | --- | --- |
| `{ENDPOINT}` | The endpoint for authenticating your API request. | `https://<your-custom-subdomain>.cognitiveservices.azure.com` |
| `{PROJECT-NAME}` | The name of your project. This value is case-sensitive. | `myProject` |
| `{DEPLOYMENT-NAME}` | The name of your deployment. This value is case-sensitive. | `staging` |
| `{API-VERSION}` | The version of the API you're calling. The value referenced is for the latest version released. For more information, *see* [Model lifecycle](../concepts/model-lifecycle.md#choose-the-model-version-used-on-your-data). | `2022-05-01` |

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

`{JOB-ID}` is used to identify your request, since this operation is asynchronous. You can use this URL to get the deployment status.




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
| `{API-VERSION}` | The version of the API you're calling. The value referenced is for the latest version released. For more information, *see* [Model lifecycle](../concepts/model-lifecycle.md#choose-the-model-version-used-on-your-data). | `2022-05-01` |

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




## Extract custom entities

After your model is deployed, you can start using it to extract entities from your text using the [prediction API](https://aka.ms/ct-runtime-swagger). In the sample dataset, downloaded earlier, you can find some test documents that you can use in this step.

### Submit a custom NER task

Use this **POST** request to start a text classification task.

```rest
{ENDPOINT}/language/analyze-text/jobs?api-version={API-VERSION}
```

| Placeholder | Value | Example |
| --- | --- | --- |
| `{ENDPOINT}` | The endpoint for authenticating your API request. | `https://<your-custom-subdomain>.cognitiveservices.azure.com` |
| `{API-VERSION}` | The version of the API you're calling. The value referenced is for the latest version released. For more information, *see* [Model lifecycle](../concepts/model-lifecycle.md#choose-the-model-version-used-on-your-data). | `2022-05-01` |

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
| `language` | `{LANGUAGE-CODE}` | A string specifying the language code for the document. If this key isn't specified, the service assumes the default language of the project that was selected during project creation. See [language support](language-support.md) for a list of supported language codes. | `en-us` |
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
| `{API-VERSION}` | The version of the API you're calling. The value referenced is for the latest version released. For more information, *see* [Model lifecycle](../concepts/model-lifecycle.md#choose-the-model-version-used-on-your-data). | `2022-05-01` |

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





## Clean up resources

When you no longer need your project, you can delete it with the following **DELETE** request. Replace the placeholder values with your own values.   

```rest
{Endpoint}/language/authoring/analyze-text/projects/{projectName}?api-version={API-VERSION}
```

| Placeholder | Value | Example |
| --- | --- | --- |
| `{ENDPOINT}` | The endpoint for authenticating your API request. | `https://<your-custom-subdomain>.cognitiveservices.azure.com` |
| `{PROJECT-NAME}` | The name for your project. This value is case-sensitive. | `myProject` |
| `{API-VERSION}` | The version of the API you're calling. The value referenced is for the latest version released. For more information, *see* [Model lifecycle](../concepts/model-lifecycle.md#choose-the-model-version-used-on-your-data). | `2022-05-01` |

### Headers

Use the following header to authenticate your request. 

| Key | Value |
| --- | --- |
| Ocp-Apim-Subscription-Key | The key to your resource. Used for authenticating your API requests. |


Once you send your API request, you receive a `202` response indicating success, which means your project is deleted. A successful call results with an Operation-Location header used to check the status of the job.





## Related content

After you create your entity extraction model, you can [use the runtime API to extract entities](how-to/call-api.md).

As you create your own custom NER projects, use our how-to articles to learn more about tagging, training, and consuming your model in greater detail:

* [Data selection and schema design](how-to/design-schema.md)
* [Tag data](how-to/tag-data.md)
* [Train a model](how-to/train-model.md)
* [Model evaluation](how-to/view-model-evaluation.md)
