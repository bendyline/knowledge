---
author: PatrickFarley
ms.author: pafarley
ms.service: azure-ai-custom-vision
ms.date: 11/11/2024
ms.topic: include
---

Get started with the Custom Vision REST API. Follow these steps to call the API and build an image classification model. You'll create a project, add tags, train the project, and use the project's prediction endpoint URL to programmatically test it. Use this example as a template for building your own image recognition app.

> **Note:**
> Custom Vision is most easily used through a client library SDK or through the [browser-based guidance](../../get-started-build-detector.md).

Use the Custom Vision client library for the REST API to:

* Create a new Custom Vision project
* Add tags to the project
* Upload and tag images
* Train the project
* Publish the current iteration
* Test the prediction endpoint

## Prerequisites

* An Azure subscription. You can [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
* Once you have your Azure subscription, create a [Custom Vision resource](https://portal.azure.com/#create/Microsoft.CognitiveServicesCustomVision) in the Azure portal to create a training and prediction resource.
    * You need the key and endpoint from the resources you create to connect your application to Custom Vision. You'll paste your key and endpoint into the code later in the quickstart.
    * You can use the free pricing tier (`F0`) to try the service, and upgrade later to a paid tier for production.
* [PowerShell version 6.0+](https://learn.microsoft.com/powershell/scripting/install/installing-powershell-core-on-windows), or a similar command-line application.


## Create a new Custom Vision project

You'll use a command like the following to create an image classification project. The created project will show up on the [Custom Vision website](https://customvision.ai/).


[Code reference unavailable in this source snapshot: ~/cognitive-services-quickstart-code/curl/custom-vision/image-classifier.sh](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/includes/quickstarts/rest-tutorial.md)

Copy the command to a text editor and make the following changes:

* Replace `{subscription key}` with your valid key.
* Replace `{endpoint}` with the endpoint that corresponds to your key.
   
> **Note:**
> New resources created after July 1, 2019, will use custom subdomain names. For more information and a complete list of regional endpoints, see [Custom subdomain names for Foundry Tools](https://learn.microsoft.com/azure/cognitive-services/cognitive-services-custom-subdomains).

* Replace `{name}` with the name of your project.
* Optionally set other URL parameters to configure what type of model your project uses. See the [Create Project API](https://learn.microsoft.com/rest/api/customvision/create-project) for options.

A JSON response like the following example appears. Save the `"id"` value of your project to a temporary location.

```json
{
  "id": "00000000-0000-0000-0000-000000000000",
  "name": "string",
  "description": "string",
  "settings": {
    "domainId": "00000000-0000-0000-0000-000000000000",
    "classificationType": "Multiclass",
    "targetExportPlatforms": [
      "CoreML"
    ],
    "useNegativeSet": true,
    "detectionParameters": "string",
    "imageProcessingSettings": {
      "augmentationMethods": {}
    }
  },
  "created": "string",
  "lastModified": "string",
  "thumbnailUri": "string",
  "drModeEnabled": true,
  "status": "Succeeded"
}
```

## Add tags to the project

Use the following command to define the tags that you'll train the model on.

[Code reference unavailable in this source snapshot: ~/cognitive-services-quickstart-code/curl/custom-vision/image-classifier.sh](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/includes/quickstarts/rest-tutorial.md)

* Again, insert your own key and endpoint URL.
* Replace `{projectId}` with your own project ID.
* Replace `{name}` with the name of the tag you want to use.

Repeat this process for all the tags you'd like to use in your project. If you're using the example images provided, add the tags `"Hemlock"` and `"Japanese Cherry"`.

A JSON response like the following example appears. Save the `"id"` value of each tag to a temporary location.

```json
{
  "id": "00000000-0000-0000-0000-000000000000",
  "name": "string",
  "description": "string",
  "type": "Regular",
  "imageCount": 0
}
```

## Upload and tag images

Next, download the sample images for this project. Save the contents of the [sample Images folder](https://github.com/Azure-Samples/cognitive-services-sample-data-files/tree/master/CustomVision/ImageClassification/Images) to your local device.

Use the following command to upload the images and apply tags; once for the "Hemlock" images, and separately for the "Japanese Cherry" images. See the [Create Images From Data](https://learn.microsoft.com/rest/api/customvision/create-images-from-data) API for more options.

[Code reference unavailable in this source snapshot: ~/cognitive-services-quickstart-code/curl/custom-vision/image-classifier.sh](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/includes/quickstarts/rest-tutorial.md)

* Again, insert your own key and endpoint URL.
* Replace `{projectId}` with your own project ID.
* Replace `{tagArray}` with the ID of a tag.
* Then, populate the body of the request with the binary data of the images you want to tag.

## Train the project

This method trains the model on the tagged images you uploaded and returns an ID for the current project iteration.

[Code reference unavailable in this source snapshot: ~/cognitive-services-quickstart-code/curl/custom-vision/image-classifier.sh](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/includes/quickstarts/rest-tutorial.md)

* Again, insert your own key and endpoint URL.
* Replace `{projectId}` with your own project ID.
* Replace `{tagArray}` with the ID of a tag.
* Then, populate the body of the request with the binary data of the images you want to tag.
* Optionally use other URL parameters. See the [Train Project](https://learn.microsoft.com/rest/api/customvision/train-project) API for options.

> **Tip:**
> Train with selected tags
>
> You can optionally train on only a subset of your applied tags. You might want to do this if you haven't applied enough of certain tags yet, but you do have enough of others. Add the optional JSON content to the body of your request. Populate the `"selectedTags"` array with the IDs of the tags you want to use.
> ```json
> {
>   "selectedTags": [
>     "00000000-0000-0000-0000-000000000000"
>   ]
> }
> ```

The JSON response contains information about your trained project, including the iteration ID (`"id"`). Save this value for the next step.

```json
{
  "id": "00000000-0000-0000-0000-000000000000",
  "name": "string",
  "status": "string",
  "created": "string",
  "lastModified": "string",
  "trainedAt": "string",
  "projectId": "00000000-0000-0000-0000-000000000000",
  "exportable": true,
  "exportableTo": [
    "CoreML"
  ],
  "domainId": "00000000-0000-0000-0000-000000000000",
  "classificationType": "Multiclass",
  "trainingType": "Regular",
  "reservedBudgetInHours": 0,
  "trainingTimeInMinutes": 0,
  "publishName": "string",
  "originalPublishResourceId": "string"
}
```

## Publish the current iteration

This method makes the current iteration of the model available for querying. You use the returned model name as a reference to send prediction requests. 

[Code reference unavailable in this source snapshot: ~/cognitive-services-quickstart-code/curl/custom-vision/image-classifier.sh](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/includes/quickstarts/rest-tutorial.md)

* Again, insert your own key and endpoint URL.
* Replace `{projectId}` with your own project ID.
* Replace `{iterationId}` with the ID returned in the previous step.
* Replace `{publishedName}` with the name you'd like to assign to your prediction model.
* Replace `{predictionId}` with your own prediction resource ID. You can find the prediction resource ID on the resource's **Properties** tab in the Azure portal, listed as **Resource ID**.
* Optionally use other URL parameters. See the [Publish Iteration](https://learn.microsoft.com/rest/api/customvision/publish-iteration) API.

## Test the prediction endpoint

Finally, use this command to test your trained model by uploading a new image for it to classify with tags. You can use the image in the *Test* folder of the sample files you downloaded earlier.

[Code reference unavailable in this source snapshot: ~/cognitive-services-quickstart-code/curl/custom-vision/image-classifier.sh](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/includes/quickstarts/rest-tutorial.md)

* Again, insert your own key and endpoint URL.
* Replace `{projectId}` with your own project ID.
* Replace `{publishedName}` with the name you used in the previous step.
* Add the binary data of your local image to the request body.
* Optionally use other URL parameters. See the [Classify Image](https://learn.microsoft.com/rest/api/customvision/train-project/train-project) API.

The returned JSON response lists each of the tags that the model applied to your image, along with probability scores for each tag. 

```json
{
  "id": "00000000-0000-0000-0000-000000000000",
  "project": "00000000-0000-0000-0000-000000000000",
  "iteration": "00000000-0000-0000-0000-000000000000",
  "created": "string",
  "predictions": [
    {
      "probability": 0.0,
      "tagId": "00000000-0000-0000-0000-000000000000",
      "tagName": "string",
      "boundingBox": {
        "left": 0.0,
        "top": 0.0,
        "width": 0.0,
        "height": 0.0
      },
      "tagType": "Regular"
    }
  ]
}
```


If you wish to implement your own image classification project (or try an [object detection](../../quickstarts/object-detection.md) project instead), you might want to delete the tree identification project from this example. A free subscription allows for two Custom Vision projects.

On the [Custom Vision website](https://customvision.ai), navigate to **Projects** and select the trash can under My New Project.

Screenshot of a panel labeled My New Project with a trash can icon.


## Related content

Now you've done every step of the image classification process using the REST API. This sample executes a single training iteration, but often you'll need to train and test your model multiple times in order to make it more accurate.

> 
> [Test and retrain a model](../../test-your-model.md)

* [What is Custom Vision?](../../overview.md)
* [API reference documentation (training)](https://learn.microsoft.com/dotnet/api/overview/azure/custom-vision)
* [API reference documentation (prediction)](https://learn.microsoft.com/rest/api/customvision/predictions)
