---
author: areddish
ms.author: areddish
ms.service: azure-ai-custom-vision
ms.date: 11/11/2024
ms.custom:
ms.topic: include
---

This guide provides instructions and sample code to help you get started using the Custom Vision client library for Node.js to build an image classification model. You can create a project, add tags, train the project, and use the project's prediction endpoint URL to programmatically test it. Use this example as a template for building your own image recognition app.

> **Note:**
> If you want to build and train a classification model _without_ writing code, see the [browser-based guidance](../../getting-started-build-a-classifier.md).

Use the Custom Vision client library for Node.js to:

* Create a new Custom Vision project
* Add tags to the project
* Upload and tag images
* Train the project
* Publish the current iteration
* Test the prediction endpoint

Reference documentation for [(training)](https://learn.microsoft.com/javascript/api/@azure/cognitiveservices-customvision-training/) and [(prediction)](https://learn.microsoft.com/javascript/api/@azure/cognitiveservices-customvision-prediction/) | Package (npm) for [(training)](https://www.npmjs.com/package/@azure/cognitiveservices-customvision-training) and [(prediction)](https://www.npmjs.com/package/@azure/cognitiveservices-customvision-prediction) | [Samples](https://learn.microsoft.com/samples/browse/?products=azure\&terms=custom%20vision\&languages=javascript)

## Prerequisites

* An Azure subscription. You can [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
* The current version of [Node.js](https://nodejs.org).
* Once you have your Azure subscription, create a [Custom Vision resource](https://portal.azure.com/#create/Microsoft.CognitiveServicesCustomVision) in the Azure portal to create a training and prediction resource.
    * You can use the free pricing tier (`F0`) to try the service, and upgrade later to a paid tier for production.


## Create environment variables 

In this example, you'll write your credentials to environment variables on the local machine running the application.


Go to the Azure portal. If the Custom Vision resources you created in the **Prerequisites** section deployed successfully, select the **Go to Resource** button under **Next steps**. You can find your keys and endpoints in the resources' **Keys and Endpoint** pages, under **Resource Management**. You'll need to get the keys for both your training resource and prediction resource, along with the API endpoints.

You can find the prediction resource ID on the prediction resource's **Properties** tab in the Azure portal, listed as **Resource ID**.

> **Tip:**
> You also use https://www.customvision.ai to get these values. After you sign in, select the **Settings** icon at the top right. On the **Setting** pages, you can view all the keys, resource ID, and endpoints.


To set the environment variables, open a console window and follow the instructions for your operating system and development environment. 

- To set the `VISION_TRAINING KEY` environment variable, replace `<your-training-key>` with one of the keys for your training resource.
- To set the `VISION_TRAINING_ENDPOINT` environment variable, replace `<your-training-endpoint>` with the endpoint for your training resource.
- To set the `VISION_PREDICTION_KEY` environment variable, replace `<your-prediction-key>` with one of the keys for your prediction resource.
- To set the `VISION_PREDICTION_ENDPOINT` environment variable, replace `<your-prediction-endpoint>` with the endpoint for your prediction resource.
- To set the `VISION_PREDICTION_RESOURCE_ID` environment variable, replace `<your-resource-id>` with the resource ID for your prediction resource.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/includes/quickstarts/node-tutorial.md)

#### [Windows](#tab/windows)

```console
setx VISION_TRAINING_KEY <your-training-key>
```

```console
setx VISION_TRAINING_ENDPOINT <your-training-endpoint>
```

```console
setx VISION_PREDICTION_KEY <your-prediction-key>
```

```console
setx VISION_PREDICTION_ENDPOINT <your-prediction-endpoint>
```

```console
setx VISION_PREDICTION_RESOURCE_ID <your-resource-id>
```

After you add the environment variables, you might need to restart any running programs that read the environment variables, including the console window.

#### [Linux](#tab/linux)

```bash
export VISION_TRAINING_KEY=<your-training-key>
```

```bash
export VISION_TRAINING_ENDPOINT=<your-training-endpoint>
```

```bash
export VISION_PREDICTION_KEY=<your-prediction-key>
```

```bash
export VISION_PREDICTION_ENDPOINT=<your-prediction-endpoint>
```

```bash
export VISION_PREDICTION_RESOURCE_ID=<your-resource-id>
```

After you add the environment variables, run `source ~/.bashrc` from your console window to make the changes effective.

---


## Setting up

### Create a new Node.js application

In a console window (such as cmd, PowerShell, or Bash), create a new directory for your app, and navigate to it. 

```console
mkdir myapp && cd myapp
```

Run the `npm init` command to create a node application with a `package.json` file. Press ENTER multiple times to complete the process.

```console
npm init
```

### Install the client library

To write an image analysis app with Custom Vision for Node.js, you need the Custom Vision npm packages. To install them, run the following command in PowerShell:

```shell
npm install @azure/cognitiveservices-customvision-training
npm install @azure/cognitiveservices-customvision-prediction
```

Your app's `package.json` file is updated with the dependencies.

Create a file named `index.js` and import the following libraries:

[Code reference unavailable in this source snapshot: ~/cognitive-services-quickstart-code/javascript/CustomVision/ImageClassification/CustomVisionQuickstart.js?name=snippet_imports](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/includes/quickstarts/node-tutorial.md)


> **Tip:**
> Want to view the whole quickstart code file at once? You can find it on [GitHub](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/javascript/CustomVision/ImageClassification/CustomVisionQuickstart.js), which contains the code examples in this quickstart.

Create variables for your resource's Azure endpoint and keys. 

[Code reference unavailable in this source snapshot: ~/cognitive-services-quickstart-code/javascript/CustomVision/ImageClassification/CustomVisionQuickstart.js?name=snippet_creds](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/includes/quickstarts/node-tutorial.md)

Also add fields for your project name and a timeout parameter for asynchronous calls.

[Code reference unavailable in this source snapshot: ~/cognitive-services-quickstart-code/javascript/CustomVision/ImageClassification/CustomVisionQuickstart.js?name=snippet_vars](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/includes/quickstarts/node-tutorial.md)


## Object model

| Name | Description |
| --- | --- |
| [TrainingAPIClient](https://learn.microsoft.com/javascript/api/@azure/cognitiveservices-customvision-training/trainingapiclient) | This class handles the creation, training, and publishing of your models. |
| [PredictionAPIClient](https://learn.microsoft.com/javascript/api/@azure/cognitiveservices-customvision-prediction/predictionapiclient) | This class handles the querying of your models for image classification predictions. |
| [Prediction](https://learn.microsoft.com/javascript/api/@azure/cognitiveservices-customvision-prediction/) | This interface defines a single prediction on a single image. It includes properties for the object ID and name, and a confidence score. |

## Code examples

These code snippets show you how to do the following tasks with the Custom Vision client library for JavaScript:

* [Authenticate the client](#authenticate-the-client)
* [Create a new Custom Vision project](#create-a-new-custom-vision-project)
* [Add tags to the project](#add-tags-to-the-project)
* [Upload and tag images](#upload-and-tag-images)
* [Train the project](#train-the-project)
* [Publish the current iteration](#publish-the-current-iteration)
* [Test the prediction endpoint](#test-the-prediction-endpoint)

## Authenticate the client

Instantiate client objects with your endpoint and key. Create an **ApiKeyCredentials** object with your key, and use it with your endpoint to create a [TrainingAPIClient](https://learn.microsoft.com/javascript/api/@azure/cognitiveservices-customvision-training/trainingapiclient) and [PredictionAPIClient](https://learn.microsoft.com/javascript/api/@azure/cognitiveservices-customvision-prediction/predictionapiclient) object.

[Code reference unavailable in this source snapshot: ~/cognitive-services-quickstart-code/javascript/CustomVision/ImageClassification/CustomVisionQuickstart.js?name=snippet_auth](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/includes/quickstarts/node-tutorial.md)


## Create a new Custom Vision project

Start a new function to contain all of your Custom Vision function calls. Add the following code to create a new Custom Vision service project.


[Code reference unavailable in this source snapshot: ~/cognitive-services-quickstart-code/javascript/CustomVision/ImageClassification/CustomVisionQuickstart.js?name=snippet_create](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/includes/quickstarts/node-tutorial.md)


## Add tags to the project

To create classification tags to your project, add the following code to your function:

[Code reference unavailable in this source snapshot: ~/cognitive-services-quickstart-code/javascript/CustomVision/ImageClassification/CustomVisionQuickstart.js?name=snippet_tags](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/includes/quickstarts/node-tutorial.md)


## Upload and tag images

First, download the sample images for this project. Save the contents of the [sample Images folder](https://github.com/Azure-Samples/cognitive-services-sample-data-files/tree/master/CustomVision/ImageClassification/Images) to your local device.

To add the sample images to the project, insert the following code after the tag creation. This code uploads each image with its corresponding tag.

[Code reference unavailable in this source snapshot: ~/cognitive-services-quickstart-code/javascript/CustomVision/ImageClassification/CustomVisionQuickstart.js?name=snippet_upload](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/includes/quickstarts/node-tutorial.md)

> **Important:**
> You need to change the path to the images (`sampleDataRoot`) based on where you downloaded the Foundry Tools Python SDK Samples repo.

## Train the project

This code creates the first iteration of the prediction model. 

[Code reference unavailable in this source snapshot: ~/cognitive-services-quickstart-code/javascript/CustomVision/ImageClassification/CustomVisionQuickstart.js?name=snippet_train](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/includes/quickstarts/node-tutorial.md)

## Publish the current iteration

This code publishes the trained iteration to the prediction endpoint. The name given to the published iteration can be used to send prediction requests. An iteration isn't available in the prediction endpoint until it's published.

[Code reference unavailable in this source snapshot: ~/cognitive-services-quickstart-code/javascript/CustomVision/ImageClassification/CustomVisionQuickstart.js?name=snippet_publish](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/includes/quickstarts/node-tutorial.md)


## Test the prediction endpoint

To send an image to the prediction endpoint and retrieve the prediction, add the following code to your function. 

[Code reference unavailable in this source snapshot: ~/cognitive-services-quickstart-code/javascript/CustomVision/ImageClassification/CustomVisionQuickstart.js?name=snippet_test](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/includes/quickstarts/node-tutorial.md)

Then, close your Custom Vision function and call it.

[Code reference unavailable in this source snapshot: ~/cognitive-services-quickstart-code/javascript/CustomVision/ImageClassification/CustomVisionQuickstart.js?name=snippet_function_close](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/includes/quickstarts/node-tutorial.md)


## Run the application

Run the application with the `node` command on your quickstart file.

```console
node index.js
```

The output of the application should be similar to the following text:

```console
Creating project...
Adding images...
Training...
Training started...
Training status: Training
Training status: Training
Training status: Training
Training status: Completed
Results:
         Hemlock: 94.97%
         Japanese Cherry: 0.01%
```

You can then verify that the test image (found in *\<sampleDataRoot\>/Test/*) is tagged appropriately. You can also go back to the [Custom Vision website](https://customvision.ai) and see the current state of your newly created project.


If you wish to implement your own image classification project (or try an [object detection](../../quickstarts/object-detection.md) project instead), you might want to delete the tree identification project from this example. A free subscription allows for two Custom Vision projects.

On the [Custom Vision website](https://customvision.ai), navigate to **Projects** and select the trash can under My New Project.

Screenshot of a panel labeled My New Project with a trash can icon.


## Related content

This guide shows how every step of the object detection process can be done in code. This sample executes a single training iteration, but often you'll need to train and test your model multiple times in order to make it more accurate.

> 
> [Test and retrain a model](../../test-your-model.md)

* [What is Custom Vision?](../../overview.md)
* The source code for this sample can be found on [GitHub](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/javascript/CustomVision/ImageClassification/CustomVisionQuickstart.js)
* [SDK reference documentation (training)](https://learn.microsoft.com/javascript/api/@azure/cognitiveservices-customvision-training/)
* [SDK reference documentation (prediction)](https://learn.microsoft.com/javascript/api/@azure/cognitiveservices-customvision-prediction/)
