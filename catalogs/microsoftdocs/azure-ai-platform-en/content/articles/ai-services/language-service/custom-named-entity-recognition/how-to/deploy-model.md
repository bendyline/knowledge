---
title: How to deploy a custom named entity recognition (NER) model
titleSuffix: Foundry Tools
description: Learn how to deploy a model for custom NER.
author: laujan
manager: mcleans
ms.service: azure-language-foundry-tools
ms.topic: how-to
ms.date: 07/22/2026
ms.author: lajanuar
ai-usage: ai-assisted
ms.custom: language-service-custom-ner
---
# Deploy a model and extract entities from text using the runtime API

Once you're satisfied with how your model performs, it's ready to be deployed and used to recognize entities in text. Deploying a model makes it available for use through the [prediction API](https://aka.ms/ct-runtime-swagger).

## Prerequisites

* A successfully [created project](create-project.md) with a configured Azure storage account.
* Text data that is [uploaded](design-schema.md#data-preparation) to your storage account.
* [Labeled data](tag-data.md) and successfully [trained model](train-model.md)
* Reviewed the [model evaluation details](view-model-evaluation.md) to determine how your model is performing.

 For more information, *see* [project development lifecycle](../overview.md#project-development-lifecycle).

## Deploy model

After you review your model's performance and decided it can be used in your environment, you need to assign it to a deployment. Assigning the model to a deployment makes it available for use through the [prediction API](https://aka.ms/ct-runtime-swagger).  We recommend that you create a deployment named *production* to which you assign the best model you built so far and use it in your system. You can create another deployment called *staging* to which you can assign the model you're currently working on to be able to test it. You can have a maximum of 10 deployments in your project. 

# [Microsoft Foundry](#tab/azure-ai-foundry)

For information on how to deploy your custom model in the Foundry, *see* [Deploy your fine-tuned model ](https://learn.microsoft.com/azure/ai-foundry/openai/how-to/fine-tuning-deploy?tabs=portal#deploy-your-fine-tuned-model).
   
# [REST APIs](#tab/rest-api)

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
| `{API-VERSION}` | The version of the API you're calling. The value referenced is for the latest version released. For more information, *see* [Model lifecycle](../../concepts/model-lifecycle.md#choose-the-model-version-used-on-your-data). | `2022-05-01` |

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
| `{API-VERSION}` | The version of the API you're calling. The value referenced is for the latest version released. For more information, *see* [Model lifecycle](../../concepts/model-lifecycle.md#choose-the-model-version-used-on-your-data). | `2022-05-01` |

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


---

## Swap deployments

After you're done testing a model assigned to one deployment and you want to assign this model to another deployment, you can swap these two deployments. Swapping deployments involves taking the model assigned to the first deployment, and assigning it to the second deployment. Then taking the model assigned to second deployment, and assigning it to the first deployment. You can use this process to swap your *production* and *staging* deployments when you want to take the model assigned to *staging* and assign it to *production*. 

# [Foundry](#tab/azure-ai-foundry)

To replace a deployed model, you can exchange the deployed model with a different model in the same region:

1. Select the model name under **Name** then select **Deploy model**.

1. Select **Swap model**.

   The redeployment takes several minutes to complete. In the meantime, deployed model continues to be available for use with the Translator API until this process is complete.

# [REST APIs](#tab/rest-api)

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


---


## Delete deployment

# [Foundry](#tab/azure-ai-foundry)
If you no longer need your project, you can delete it from the Foundry.

1. Navigate to the [Foundry](https://ai.azure.com/) home page. Initiate the authentication process by signing in, unless you already completed this step and your session is active.
1. Select the project that you want to delete from the **Keep building with Foundry**
1. Select **Management center**.
1. Select **Delete project**.

To delete the hub along with all its projects:

1. Navigate to the **Overview** tab inn the **Hub** section.

1. On the right, select **Delete hub**.
1. The link opens the Azure portal for you to delete the hub.

# [REST APIs](#tab/rest-api)

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
| `{API-VERSION}` | The version of the API you're calling. The value referenced is for the latest version released. For more information, *see* [Model lifecycle](../../concepts/model-lifecycle.md#choose-the-model-version-used-on-your-data). | `2022-05-01` |

### Headers

Use the following header to authenticate your request. 

| Key | Value |
| --- | --- |
| `Ocp-Apim-Subscription-Key` | The key to your resource. Used for authenticating your API requests. |


Once you send your API request, you receive a `202` response indicating success, which means your deployment is deleted. A successful call results with an `Operation-Location` header used to check the status of the job.


---

## Assign deployment resources

You can [deploy your project to multiple regions](../../concepts/custom-features/multi-region-deployment.md) by assigning different Language resources that exist in different regions.

# [Foundry](#tab/azure-ai-foundry)

For more information on how to deploy you custom model, *see* [Deploy your fine-tuned model](https://learn.microsoft.com/azure/ai-foundry/openai/how-to/fine-tuning-deploy?tabs=python#deploy-your-fine-tuned-model)

# [REST APIs](#tab/rest-api)

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


---

## Unassign deployment resources

To unassign or remove a deployment resource from a project, you also delete all the deployments for to that resource region.

# [Foundry](#tab/azure-ai-foundry)

If you no longer need your project, you can delete it from the Foundry.

1. Navigate to the [Foundry](https://ai.azure.com/) home page. Initiate the authentication process by signing in, unless you already completed this step and your session is active.
1. Select the project that you want to delete from the **Keep building with Foundry**
1. Select **Management center**.
1. Select **Delete project**.

To delete the hub along with all its projects:

1. Navigate to the **Overview** tab inn the **Hub** section.

1. On the right, select **Delete hub**.
1. The link opens the Azure portal for you to delete the hub.

   
# [REST APIs](#tab/rest-api)

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


---

## Next steps

After you have a deployment, you can use it to [extract entities](call-api.md) from text.
