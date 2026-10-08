---
title: "Quickstart: Image classification with Custom Vision SDK"
titleSuffix: Foundry Tools
description: Learn how to create an image classification project, add tags, train your project, and make predictions using the Custom Vision client library or the REST API.
author: PatrickFarley
ms.author: pafarley
ms.service: azure-ai-custom-vision
ms.topic: quickstart
ms.date: 11/08/2024
ms.devlang: csharp
# ms.devlang: csharp, golang, java, javascript, python
ms.custom: devx-track-python, devx-track-js, devx-track-csharp, mode-api, devx-track-extended-java, devx-track-go
keywords: custom vision, image recognition, image recognition app, image analysis, image recognition software
zone_pivot_groups: programming-languages-set-cusvis
---

# Quickstart: Create an image classification project with the Custom Vision SDK or REST API

**Applies to: programming-language-csharp**


Get started with the Custom Vision client library for .NET. Follow these steps to install the package and try out the example code for building an image classification model. You can create a project, add tags, train the project, and use the project's prediction endpoint URL to test it programmatically. Use this example as a template for building your own image recognition app.

> **Note:**
> If you want to build and train a classification model _without_ writing code, see the [browser-based guidance](../getting-started-build-a-classifier.md).

[Reference documentation](https://learn.microsoft.com/dotnet/api/overview/azure/custom-vision) | Library source code for [training](https://github.com/Azure/azure-sdk-for-net/tree/main/sdk/cognitiveservices) and [prediction](https://github.com/Azure/azure-sdk-for-net/tree/main/sdk/cognitiveservices) | Package (NuGet) for [training](https://www.nuget.org/packages/Microsoft.Azure.CognitiveServices.Vision.CustomVision.Training/) and [prediction](https://www.nuget.org/packages/Microsoft.Azure.CognitiveServices.Vision.CustomVision.Prediction/) | [Samples](https://learn.microsoft.com/samples/browse/?products=azure\&term=vision\&terms=vision)


## Prerequisites

* An Azure subscription. You can [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
* The [Visual Studio IDE](https://visualstudio.microsoft.com/vs/) or current version of [.NET Core](https://dotnet.microsoft.com/download/dotnet-core).
* Once you have your Azure subscription, create a [Custom Vision resource](https://portal.azure.com/?microsoft_azure_marketplace_ItemHideKey=microsoft_azure_cognitiveservices_customvision#create/Microsoft.CognitiveServicesCustomVision) in the Azure portal to create a training resource and a prediction resource.
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

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/quickstarts/image-classification.md)

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

#### [Visual Studio IDE](#tab/visual-studio)

### Create a new C# application

Using Visual Studio, create a new .NET Core application. 

### Install the client library 

After you create a new project, install the client library by right-clicking on the project solution in the **Solution Explorer** and selecting **Manage NuGet Packages**. Select **Browse** in the package manager that opens, then check **Include prerelease**, and search for `Microsoft.Azure.CognitiveServices.Vision.CustomVision.Training` and `Microsoft.Azure.CognitiveServices.Vision.CustomVision.Prediction`. Select the latest version and then choose **Install**.

#### [CLI](#tab/cli)

### Create a new C# application

In a console window (such as cmd, PowerShell, or Bash), use the `dotnet new` command to create a new console app with the name `custom-vision-quickstart`. This command creates a simple *Hello World* C# project with a single source file: *program.cs*. 

```console
dotnet new console -n custom-vision-quickstart
```

Change your directory to the newly created app folder. You can build the application with:

```console
dotnet build
```

The build output should contain no warnings or errors. 

```console
...
Build succeeded.
 0 Warning(s)
 0 Error(s)
...
```

### Install the client library 

Within the application directory, install the Custom Vision client library for .NET with the following command:

```console
dotnet add package Microsoft.Azure.CognitiveServices.Vision.CustomVision.Training --version 2.0.0
dotnet add package Microsoft.Azure.CognitiveServices.Vision.CustomVision.Prediction --version 2.0.0
```

---

> **Tip:**
> Want to view the whole quickstart code file at once? You can find it on [GitHub](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/dotnet/CustomVision/ObjectDetection/Program.cs), which contains the code examples in this quickstart.

From the project directory, open the *program.cs* file and add the following `using` directives:

[Code reference unavailable in this source snapshot: ../includes/quickstarts/~/cognitive-services-quickstart-code/dotnet/CustomVision/ImageClassification/Program.cs?name=snippet_imports](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/quickstarts/image-classification.md)


In the application's `main` method, create variables that retrieve your resource's keys and endpoints from environment variables. You'll also declare some basic objects to be used later.

[Code reference unavailable in this source snapshot: ../includes/quickstarts/~/cognitive-services-quickstart-code/dotnet/CustomVision/ImageClassification/Program.cs?name=snippet_creds](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/quickstarts/image-classification.md)

In the application's `main` method, add calls for the methods used in this quickstart. You implement these later.

[Code reference unavailable in this source snapshot: ../includes/quickstarts/~/cognitive-services-quickstart-code/dotnet/CustomVision/ImageClassification/Program.cs?name=snippet_maincalls](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/quickstarts/image-classification.md)

## Authenticate the client

In a new method, instantiate training and prediction clients using your endpoint and keys.

[Code reference unavailable in this source snapshot: ../includes/quickstarts/~/cognitive-services-quickstart-code/dotnet/CustomVision/ImageClassification/Program.cs?name=snippet_auth](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/quickstarts/image-classification.md)

## Create a new Custom Vision project

This next bit of code creates an image classification project. The created project shows up on the [Custom Vision website](https://customvision.ai). See the `CreateProject` method to specify other options when you create your project (explained in the [Build a classifier](../getting-started-build-a-classifier.md) web portal guide).  

[Code reference unavailable in this source snapshot: ../includes/quickstarts/~/cognitive-services-quickstart-code/dotnet/CustomVision/ImageClassification/Program.cs?name=snippet_create](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/quickstarts/image-classification.md)


## Add tags to the project

This method defines the tags that you train the model on.

[Code reference unavailable in this source snapshot: ../includes/quickstarts/~/cognitive-services-quickstart-code/dotnet/CustomVision/ImageClassification/Program.cs?name=snippet_addtags](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/quickstarts/image-classification.md)

## Upload and tag images

First, download the sample images for this project. Save the contents of the [sample Images folder](https://github.com/Azure-Samples/cognitive-services-sample-data-files/tree/master/CustomVision/ImageClassification/Images) to your local device.

Then define a helper method to upload the images in this directory. You might need to edit the `GetFiles` argument to point to the location where your images are saved.

[Code reference unavailable in this source snapshot: ../includes/quickstarts/~/cognitive-services-quickstart-code/dotnet/CustomVision/ImageClassification/Program.cs?name=snippet_loadimages](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/quickstarts/image-classification.md)

Next, define a method to upload the images, applying tags according to their folder location. The images are already sorted. You can upload and tag images iteratively, or in a batch (up to 64 per batch). This code snippet contains examples of both. 

[Code reference unavailable in this source snapshot: ../includes/quickstarts/~/cognitive-services-quickstart-code/dotnet/CustomVision/ImageClassification/Program.cs?name=snippet_upload](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/quickstarts/image-classification.md)


## Train the project

This method creates the first training iteration in the project. It queries the service until training is completed.

[Code reference unavailable in this source snapshot: ../includes/quickstarts/~/cognitive-services-quickstart-code/dotnet/CustomVision/ImageClassification/Program.cs?name=snippet_train](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/quickstarts/image-classification.md)

> **Tip:**
> Train with selected tags
>
> You can optionally train on only a subset of your applied tags. You might want to do this if you haven't applied enough of certain tags yet, but you do have enough of others. In the `TrainProject` call, use the `trainingParameters` parameter. Construct a `TrainingParameters` and set its `SelectedTags` property to a list of IDs of the tags you want to use. The model will train to only recognize the tags on that list.

## Publish the current iteration

This method makes the current iteration of the model available for querying. You can use the model name as a reference to send prediction requests. You need to enter your own value for `predictionResourceId`. You can find the prediction resource ID on the resource's **Properties** tab in the Azure portal, listed as **Resource ID**.

[Code reference unavailable in this source snapshot: ../includes/quickstarts/~/cognitive-services-quickstart-code/dotnet/CustomVision/ImageClassification/Program.cs?name=snippet_publish](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/quickstarts/image-classification.md)


## Test the prediction endpoint

This part of the script loads the test image, queries the model endpoint, and outputs prediction data to the console.

[Code reference unavailable in this source snapshot: ../includes/quickstarts/~/cognitive-services-quickstart-code/dotnet/CustomVision/ImageClassification/Program.cs?name=snippet_test](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/quickstarts/image-classification.md)


## Run the application

#### [Visual Studio IDE](#tab/visual-studio)

Run the application by clicking the **Debug** button at the top of the IDE window.

#### [CLI](#tab/cli)

Run the application from your application directory with the `dotnet run` command.

```dotnet
dotnet run
```

---

As the application runs, it should open a console window and write the following output:

```console
Creating new project:
        Uploading images
        Training
Done!

Making a prediction:
        Hemlock: 95.0%
        Japanese Cherry: 0.0%
```

You can then verify that the test image (found in *Images/Test/*) is tagged appropriately. Press any key to exit the application. You can also go back to the [Custom Vision website](https://customvision.ai) and see the current state of your newly created project.

## Clean up resources


If you wish to implement your own image classification project (or try an [object detection](object-detection.md) project instead), you might want to delete the tree identification project from this example. A free subscription allows for two Custom Vision projects.

On the [Custom Vision website](https://customvision.ai), navigate to **Projects** and select the trash can under My New Project.

Screenshot of a panel labeled My New Project with a trash can icon.


## Related content

Now you've seen how every step of the object detection process can be done in code. This sample executes a single training iteration, but often you'll need to train and test your model multiple times in order to make it more accurate.

> 
> [Test and retrain a model](../test-your-model.md)

* [What is Custom Vision?](../overview.md)
* The source code for this sample can be found on [GitHub](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/dotnet/CustomVision/ObjectDetection/Program.cs)
* [SDK reference documentation](https://learn.microsoft.com/dotnet/api/overview/azure/custom-vision)



**Applies to: programming-language-go**


This guide provides instructions and sample code to help you get started using the Custom Vision client library for Go to build an image classification model. You'll create a project, add tags, train the project, and use the project's prediction endpoint URL to programmatically test it. Use this example as a template for building your own image recognition app.

> **Note:**
> If you want to build and train a classification model _without_ writing code, see the [browser-based guidance](../getting-started-build-a-classifier.md).

Use the Custom Vision client library for Go to:

* Create a new Custom Vision project
* Add tags to the project
* Upload and tag images
* Train the project
* Publish the current iteration
* Test the prediction endpoint

Reference documentation for [(training)](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/services/cognitiveservices/v2.1/customvision/training) and [(prediction)](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/services/cognitiveservices/v1.1/customvision/prediction)

## Prerequisites

* An Azure subscription. You can [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
* [Go 1.8 or later](https://go.dev/doc/install).
* Once you have your Azure subscription, create a [Custom Vision resource](https://portal.azure.com/?microsoft_azure_marketplace_ItemHideKey=microsoft_azure_cognitiveservices_customvision#create/Microsoft.CognitiveServicesCustomVision) in the Azure portal to create a training and prediction resource.
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

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/quickstarts/image-classification.md)

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

### Install the Custom Vision client library

To write an image analysis app with Custom Vision for Go, you need the Custom Vision service client library. Run the following command in PowerShell:

```shell
go get -u github.com/Azure/azure-sdk-for-go/...
```

Or if you use `dep`, within your repo run:
```shell
dep ensure -add github.com/Azure/azure-sdk-for-go
```


## Get the sample images

This example uses the images from the [Foundry Tools Python SDK Samples](https://github.com/Azure-Samples/cognitive-services-python-sdk-samples/tree/master/samples/vision/images) repository on GitHub. Clone or download this repository to your development environment. Remember its folder location for a later step.



## Create the Custom Vision project

Create a new file called *sample.go* in your preferred project directory, and open it in your preferred code editor.

Add the following code to your script to create a new Custom Vision service project.

See the [CreateProject](https://learn.microsoft.com/java/api/com.microsoft.azure.cognitiveservices.vision.customvision.training.trainings.createproject#com_microsoft_azure_cognitiveservices_vision_customvision_training_Trainings_createProject_String_CreateProjectOptionalParameter_) method to specify other options when you create your project (explained in the [Build a classifier](../getting-started-build-a-classifier.md) web portal guide).

```go
import(
    "context"
    "bytes"
    "fmt"
    "io/ioutil"
    "path"
    "log"
    "time"
    "github.com/Azure/azure-sdk-for-go/services/cognitiveservices/v3.0/customvision/training"
    "github.com/Azure/azure-sdk-for-go/services/cognitiveservices/v3.0/customvision/prediction"
)

var (
    training_key string = os.Getenv("VISION_TRAINING_KEY")
    prediction_key string = os.Getenv("VISION_PREDICTION_KEY")
    prediction_resource_id = os.Getenv("VISION_PREDICTION_RESOURCE_ID")
    endpoint string = os.Getenv("VISION_ENDPOINT")    

    project_name string = "Go Sample Project"
    iteration_publish_name = "classifyModel"
    sampleDataDirectory = "<path to sample images>"
)

func main() {
    fmt.Println("Creating project...")

    ctx = context.Background()

    trainer := training.New(training_key, endpoint)

    project, err := trainer.CreateProject(ctx, project_name, "sample project", nil, string(training.Multilabel))
    if (err != nil) {
        log.Fatal(err)
    }
```

## Create tags in the project

To create classification tags to your project, add the following code to the end of *sample.go*:

```go
// Make two tags in the new project
hemlockTag, _ := trainer.CreateTag(ctx, *project.ID, "Hemlock", "Hemlock tree tag", string(training.Regular))
cherryTag, _ := trainer.CreateTag(ctx, *project.ID, "Japanese Cherry", "Japanese cherry tree tag", string(training.Regular))
```

## Upload and tag images

To add the sample images to the project, insert the following code after the tag creation. This code uploads each image with its corresponding tag. You can upload up to 64 images in a single batch.

> **Note:**
> You'll need to change the path to the images based on where you downloaded the Foundry Tools Go SDK Samples project earlier.

```go
fmt.Println("Adding images...")
japaneseCherryImages, err := ioutil.ReadDir(path.Join(sampleDataDirectory, "Japanese Cherry"))
if err != nil {
    fmt.Println("Error finding Sample images")
}

hemLockImages, err := ioutil.ReadDir(path.Join(sampleDataDirectory, "Hemlock"))
if err != nil {
    fmt.Println("Error finding Sample images")
}

for _, file := range hemLockImages {
    imageFile, _ := ioutil.ReadFile(path.Join(sampleDataDirectory, "Hemlock", file.Name()))
    imageData := ioutil.NopCloser(bytes.NewReader(imageFile))

    trainer.CreateImagesFromData(ctx, *project.ID, imageData, []string{ hemlockTag.ID.String() })
}

for _, file := range japaneseCherryImages {
    imageFile, _ := ioutil.ReadFile(path.Join(sampleDataDirectory, "Japanese Cherry", file.Name()))
    imageData := ioutil.NopCloser(bytes.NewReader(imageFile))
    trainer.CreateImagesFromData(ctx, *project.ID, imageData, []string{ cherryTag.ID.String() })
}
```

## Train and publish the project

This code creates the first iteration of the prediction model and then publishes that iteration to the prediction endpoint. The name given to the published iteration can be used to send prediction requests. An iteration isn't available in the prediction endpoint until it's published.

```go
fmt.Println("Training...")
iteration, _ := trainer.TrainProject(ctx, *project.ID)
for {
    if *iteration.Status != "Training" {
        break
    }
    fmt.Println("Training status: " + *iteration.Status)
    time.Sleep(1 * time.Second)
    iteration, _ = trainer.GetIteration(ctx, *project.ID, *iteration.ID)
}
fmt.Println("Training status: " + *iteration.Status)

trainer.PublishIteration(ctx, *project.ID, *iteration.ID, iteration_publish_name, prediction_resource_id))
```

## Use the prediction endpoint

To send an image to the prediction endpoint and retrieve the prediction, add the following code to the end of the file:

```go
    fmt.Println("Predicting...")
    predictor := prediction.New(prediction_key, endpoint)

    testImageData, _ := ioutil.ReadFile(path.Join(sampleDataDirectory, "Test", "test_image.jpg"))
    results, _ := predictor.ClassifyImage(ctx, *project.ID, iteration_publish_name, ioutil.NopCloser(bytes.NewReader(testImageData)), "")

    for _, prediction := range *results.Predictions    {
        fmt.Printf("\t%s: %.2f%%", *prediction.TagName, *prediction.Probability * 100)
        fmt.Println("")
    }
}
```

## Run the application

Run the application by using the following command:

```shell
go run sample.go
```

The output of the application should be similar to the following text:

```console
Creating project...
Adding images...
Training...
Training status: Training
Training status: Training
Training status: Training
Training status: Completed
Done!
        Hemlock: 93.53%
        Japanese Cherry: 0.01%
```

You can then verify that the test image (found in *<base_image_url>/Images/Test/*) is tagged appropriately. You can also go back to the [Custom Vision website](https://customvision.ai) and see the current state of your newly created project.

## Clean up resources


If you wish to implement your own image classification project (or try an [object detection](object-detection.md) project instead), you might want to delete the tree identification project from this example. A free subscription allows for two Custom Vision projects.

On the [Custom Vision website](https://customvision.ai), navigate to **Projects** and select the trash can under My New Project.

Screenshot of a panel labeled My New Project with a trash can icon.


## Related content

Now you've seen how every step of the object detection process can be done in code. This sample executes a single training iteration, but often you'll need to train and test your model multiple times in order to make it more accurate.

> 
> [Test and retrain a model](../test-your-model.md)

* [What is Custom Vision?](../overview.md)
* [SDK reference documentation (training)](https://godoc.org/github.com/Azure/azure-sdk-for-go/services/cognitiveservices/v2.1/customvision/training)
* [SDK reference documentation (prediction)](https://godoc.org/github.com/Azure/azure-sdk-for-go/services/cognitiveservices/v1.1/customvision/prediction)



**Applies to: programming-language-java**


Get started using the Custom Vision client library for Java to build an image classification model. Follow these steps to install the package and try out the example code for basic tasks. Use this example as a template for building your own image recognition app.

> **Note:**
> If you want to build and train a classification model _without_ writing code, see the [browser-based guidance](../getting-started-build-a-classifier.md).

Use the Custom Vision client library for Java to:

* Create a new Custom Vision project
* Add tags to the project
* Upload and tag images
* Train the project
* Publish the current iteration
* Test the prediction endpoint

[Reference documentation](https://learn.microsoft.com/java/api/overview/azure/cognitiveservices/client/customvision) | 
Library source code for [(training)](https://github.com/Azure/azure-sdk-for-java/tree/main/sdk/cognitiveservices/azure-resourcemanager-cognitiveservices) and [(prediction)](https://github.com/Azure/azure-sdk-for-java/tree/main/sdk/cognitiveservices/azure-resourcemanager-cognitiveservices)| 
Artifact (Maven) for [(training)](https://central.sonatype.com/artifact/com.azure/azure-cognitiveservices-customvision-training/1.1.0-preview.2) and [(prediction)](https://central.sonatype.com/artifact/com.azure/azure-cognitiveservices-customvision-prediction/1.1.0-preview.2) | 
[Samples](https://learn.microsoft.com/samples/browse/?products=azure\&terms=custom%20vision)

## Prerequisites

* An Azure subscription. You can [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
* The current version of the [Java Development Kit(JDK)](https://www.microsoft.com/openjdk).
* The [Gradle build tool](https://gradle.org/install/), or another dependency manager.
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

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/quickstarts/image-classification.md)

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

### Create a new Gradle project

In a console window (such as cmd, PowerShell, or Bash), create a new directory for your app, and navigate to it. 

```console
mkdir myapp && cd myapp
```

Run the `gradle init` command from your working directory. This command creates essential build files for Gradle, including *build.gradle.kts*, which is used at runtime to create and configure your application.

```console
gradle init --type basic
```

When prompted to choose a **DSL**, select **Kotlin**.

### Install the client library

Locate *build.gradle.kts* and open it with your preferred IDE or text editor. Then copy in the following build configuration. This configuration defines the project as a Java application whose entry point is the class `CustomVisionQuickstart`. It imports the Custom Vision libraries.

```kotlin
plugins {
    java
    application
}
application { 
    mainClassName = "CustomVisionQuickstart"
}
repositories {
    mavenCentral()
}
dependencies {
    compile(group = "com.azure", name = "azure-cognitiveservices-customvision-training", version = "1.1.0-preview.2")
    compile(group = "com.azure", name = "azure-cognitiveservices-customvision-prediction", version = "1.1.0-preview.2")
}
```

### Create a Java file

From your working directory, run the following command to create a project source folder:

```console
mkdir -p src/main/java
```

Navigate to the new folder and create a file called *CustomVisionQuickstart.java*. Open it in your preferred editor or IDE and add the following `import` statements:

[Code reference unavailable in this source snapshot: ../includes/quickstarts/~/cognitive-services-quickstart-code/java/CustomVision/src/main/java/com/microsoft/azure/cognitiveservices/vision/customvision/samples/CustomVisionSamples.java?name=snippet_imports](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/quickstarts/image-classification.md)

> **Tip:**
> Want to view the whole quickstart code file at once? You can find it on [GitHub](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/java/CustomVision/src/main/java/com/microsoft/azure/cognitiveservices/vision/customvision/samples/CustomVisionSamples.java), which contains the code examples in this quickstart.


In the application's `CustomVisionQuickstart` class, create variables that retrieve your resource's keys and endpoint from environment variables.

[Code reference unavailable in this source snapshot: ../includes/quickstarts/~/cognitive-services-quickstart-code/java/CustomVision/src/main/java/com/microsoft/azure/cognitiveservices/vision/customvision/samples/CustomVisionSamples.java?name=snippet_creds](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/quickstarts/image-classification.md)


> **Important:**
> Remember to remove the keys from your code when you're done, and never post them publicly. For production, use a secure way of storing and accessing your credentials like [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/overview). See the Foundry Tools [security](../../security-features.md) article for more information.

In the application's `main` method, add calls for the methods used in this quickstart. You'll define these later.

[Code reference unavailable in this source snapshot: ../includes/quickstarts/~/cognitive-services-quickstart-code/java/CustomVision/src/main/java/com/microsoft/azure/cognitiveservices/vision/customvision/samples/CustomVisionSamples.java?name=snippet_maincalls](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/quickstarts/image-classification.md)

## Object model

The following classes and interfaces handle some of the major features of the Custom Vision Java client library.

| Name | Description |
| --- | --- |
| [CustomVisionTrainingClient](https://learn.microsoft.com/java/api/com.microsoft.azure.cognitiveservices.vision.customvision.training.customvisiontrainingclient) | This class handles the creation, training, and publishing of your models. |
| [CustomVisionPredictionClient](https://learn.microsoft.com/java/api/com.microsoft.azure.cognitiveservices.vision.customvision.prediction.customvisionpredictionclient) | This class handles the querying of your models for image classification predictions. |
| [ImagePrediction](https://learn.microsoft.com/java/api/com.microsoft.azure.cognitiveservices.vision.customvision.prediction.models.imageprediction) | This class defines a single prediction on a single image. It includes properties for the object ID and name, and a confidence score. |

## Code examples

These code snippets show you how to do the following tasks with the Custom Vision client library for Java:

* [Authenticate the client](#authenticate-the-client)
* [Create a new Custom Vision project](#create-a-new-custom-vision-project)
* [Add tags to the project](#add-tags-to-the-project)
* [Upload and tag images](#upload-and-tag-images)
* [Train the project](#train-the-project)
* [Publish the current iteration](#publish-the-current-iteration)
* [Test the prediction endpoint](#test-the-prediction-endpoint)

## Authenticate the client

In your `main` method, instantiate training and prediction clients using your endpoint and keys.

[Code reference unavailable in this source snapshot: ../includes/quickstarts/~/cognitive-services-quickstart-code/java/CustomVision/src/main/java/com/microsoft/azure/cognitiveservices/vision/customvision/samples/CustomVisionSamples.java?name=snippet_auth](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/quickstarts/image-classification.md)


## Create a Custom Vision project

This next method creates an image classification project. The created project will show up on the [Custom Vision website](https://customvision.ai/) that you visited earlier. See the [CreateProject](https://learn.microsoft.com/java/api/com.microsoft.azure.cognitiveservices.vision.customvision.training.trainings.createproject#com_microsoft_azure_cognitiveservices_vision_customvision_training_Trainings_createProject_String_CreateProjectOptionalParameter_\&preserve-view=true) method overloads to specify other options when you create your project (explained in the [Build a detector](../get-started-build-detector.md) web portal guide).

[Code reference unavailable in this source snapshot: ../includes/quickstarts/~/cognitive-services-quickstart-code/java/CustomVision/src/main/java/com/microsoft/azure/cognitiveservices/vision/customvision/samples/CustomVisionSamples.java?name=snippet_create](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/quickstarts/image-classification.md)

## Add tags to your project

This method defines the tags that you will train the model on.

[Code reference unavailable in this source snapshot: ../includes/quickstarts/~/cognitive-services-quickstart-code/java/CustomVision/src/main/java/com/microsoft/azure/cognitiveservices/vision/customvision/samples/CustomVisionSamples.java?name=snippet_tags](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/quickstarts/image-classification.md)

## Upload and tag images

First, download the sample images for this project. Save the contents of the [sample Images folder](https://github.com/Azure-Samples/cognitive-services-sample-data-files/tree/master/CustomVision/ImageClassification/Images) to your local device.

[Code reference unavailable in this source snapshot: ../includes/quickstarts/~/cognitive-services-quickstart-code/java/CustomVision/src/main/java/com/microsoft/azure/cognitiveservices/vision/customvision/samples/CustomVisionSamples.java?name=snippet_upload](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/quickstarts/image-classification.md)

The previous code snippet makes use of two helper functions that retrieve the images as resource streams and upload them to the service (you can upload up to 64 images in a single batch).

[Code reference unavailable in this source snapshot: ../includes/quickstarts/~/cognitive-services-quickstart-code/java/CustomVision/src/main/java/com/microsoft/azure/cognitiveservices/vision/customvision/samples/CustomVisionSamples.java?name=snippet_helpers](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/quickstarts/image-classification.md)

## Train the project

This method creates the first training iteration in the project. It queries the service until training is completed.

[Code reference unavailable in this source snapshot: ../includes/quickstarts/~/cognitive-services-quickstart-code/java/CustomVision/src/main/java/com/microsoft/azure/cognitiveservices/vision/customvision/samples/CustomVisionSamples.java?name=snippet_train](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/quickstarts/image-classification.md)


## Publish the current iteration

This method makes the current iteration of the model available for querying. You can use the model name as a reference to send prediction requests. You need to enter your own value for `predictionResourceId`. You can find the prediction resource ID on the resource's **Properties** tab in the Azure portal, listed as **Resource ID**.

[Code reference unavailable in this source snapshot: ../includes/quickstarts/~/cognitive-services-quickstart-code/java/CustomVision/src/main/java/com/microsoft/azure/cognitiveservices/vision/customvision/samples/CustomVisionSamples.java?name=snippet_publish](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/quickstarts/image-classification.md)

## Test the prediction endpoint

This method loads the test image, queries the model endpoint, and outputs prediction data to the console.

[Code reference unavailable in this source snapshot: ../includes/quickstarts/~/cognitive-services-quickstart-code/java/CustomVision/src/main/java/com/microsoft/azure/cognitiveservices/vision/customvision/samples/CustomVisionSamples.java?name=snippet_predict](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/quickstarts/image-classification.md)

## Run the application

You can build the app with:

```console
gradle build
```

Run the application with the `gradle run` command:

```console
gradle run
```

## Clean up resources

If you want to clean up and remove an Azure AI services subscription, you can delete the resource or resource group. Deleting the resource group also deletes any other resources associated with it.

* [Azure portal](../../multi-service-resource.md?pivots=azportal#clean-up-resources)
* [Azure CLI](../../multi-service-resource.md?pivots=azcli#clean-up-resources)


If you wish to implement your own image classification project (or try an [object detection](object-detection.md) project instead), you might want to delete the tree identification project from this example. A free subscription allows for two Custom Vision projects.

On the [Custom Vision website](https://customvision.ai), navigate to **Projects** and select the trash can under My New Project.

Screenshot of a panel labeled My New Project with a trash can icon.


## Related content

Now you've seen how every step of the object detection process can be done in code. This sample executes a single training iteration, but often you'll need to train and test your model multiple times in order to make it more accurate.

> 
> [Test and retrain a model](../test-your-model.md)

* [What is Custom Vision?](../overview.md)
* The source code for this sample can be found on [GitHub](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/java/CustomVision/src/main/java/com/microsoft/azure/cognitiveservices/vision/customvision/samples/CustomVisionSamples.java)



**Applies to: programming-language-javascript**


This guide provides instructions and sample code to help you get started using the Custom Vision client library for Node.js to build an image classification model. You can create a project, add tags, train the project, and use the project's prediction endpoint URL to programmatically test it. Use this example as a template for building your own image recognition app.

> **Note:**
> If you want to build and train a classification model _without_ writing code, see the [browser-based guidance](../getting-started-build-a-classifier.md).

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

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/quickstarts/image-classification.md)

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

[Code reference unavailable in this source snapshot: ../includes/quickstarts/~/cognitive-services-quickstart-code/javascript/CustomVision/ImageClassification/CustomVisionQuickstart.js?name=snippet_imports](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/quickstarts/image-classification.md)


> **Tip:**
> Want to view the whole quickstart code file at once? You can find it on [GitHub](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/javascript/CustomVision/ImageClassification/CustomVisionQuickstart.js), which contains the code examples in this quickstart.

Create variables for your resource's Azure endpoint and keys. 

[Code reference unavailable in this source snapshot: ../includes/quickstarts/~/cognitive-services-quickstart-code/javascript/CustomVision/ImageClassification/CustomVisionQuickstart.js?name=snippet_creds](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/quickstarts/image-classification.md)

Also add fields for your project name and a timeout parameter for asynchronous calls.

[Code reference unavailable in this source snapshot: ../includes/quickstarts/~/cognitive-services-quickstart-code/javascript/CustomVision/ImageClassification/CustomVisionQuickstart.js?name=snippet_vars](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/quickstarts/image-classification.md)


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

[Code reference unavailable in this source snapshot: ../includes/quickstarts/~/cognitive-services-quickstart-code/javascript/CustomVision/ImageClassification/CustomVisionQuickstart.js?name=snippet_auth](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/quickstarts/image-classification.md)


## Create a new Custom Vision project

Start a new function to contain all of your Custom Vision function calls. Add the following code to create a new Custom Vision service project.


[Code reference unavailable in this source snapshot: ../includes/quickstarts/~/cognitive-services-quickstart-code/javascript/CustomVision/ImageClassification/CustomVisionQuickstart.js?name=snippet_create](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/quickstarts/image-classification.md)


## Add tags to the project

To create classification tags to your project, add the following code to your function:

[Code reference unavailable in this source snapshot: ../includes/quickstarts/~/cognitive-services-quickstart-code/javascript/CustomVision/ImageClassification/CustomVisionQuickstart.js?name=snippet_tags](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/quickstarts/image-classification.md)


## Upload and tag images

First, download the sample images for this project. Save the contents of the [sample Images folder](https://github.com/Azure-Samples/cognitive-services-sample-data-files/tree/master/CustomVision/ImageClassification/Images) to your local device.

To add the sample images to the project, insert the following code after the tag creation. This code uploads each image with its corresponding tag.

[Code reference unavailable in this source snapshot: ../includes/quickstarts/~/cognitive-services-quickstart-code/javascript/CustomVision/ImageClassification/CustomVisionQuickstart.js?name=snippet_upload](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/quickstarts/image-classification.md)

> **Important:**
> You need to change the path to the images (`sampleDataRoot`) based on where you downloaded the Foundry Tools Python SDK Samples repo.

## Train the project

This code creates the first iteration of the prediction model. 

[Code reference unavailable in this source snapshot: ../includes/quickstarts/~/cognitive-services-quickstart-code/javascript/CustomVision/ImageClassification/CustomVisionQuickstart.js?name=snippet_train](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/quickstarts/image-classification.md)

## Publish the current iteration

This code publishes the trained iteration to the prediction endpoint. The name given to the published iteration can be used to send prediction requests. An iteration isn't available in the prediction endpoint until it's published.

[Code reference unavailable in this source snapshot: ../includes/quickstarts/~/cognitive-services-quickstart-code/javascript/CustomVision/ImageClassification/CustomVisionQuickstart.js?name=snippet_publish](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/quickstarts/image-classification.md)


## Test the prediction endpoint

To send an image to the prediction endpoint and retrieve the prediction, add the following code to your function. 

[Code reference unavailable in this source snapshot: ../includes/quickstarts/~/cognitive-services-quickstart-code/javascript/CustomVision/ImageClassification/CustomVisionQuickstart.js?name=snippet_test](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/quickstarts/image-classification.md)

Then, close your Custom Vision function and call it.

[Code reference unavailable in this source snapshot: ../includes/quickstarts/~/cognitive-services-quickstart-code/javascript/CustomVision/ImageClassification/CustomVisionQuickstart.js?name=snippet_function_close](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/quickstarts/image-classification.md)


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


If you wish to implement your own image classification project (or try an [object detection](object-detection.md) project instead), you might want to delete the tree identification project from this example. A free subscription allows for two Custom Vision projects.

On the [Custom Vision website](https://customvision.ai), navigate to **Projects** and select the trash can under My New Project.

Screenshot of a panel labeled My New Project with a trash can icon.


## Related content

This guide shows how every step of the object detection process can be done in code. This sample executes a single training iteration, but often you'll need to train and test your model multiple times in order to make it more accurate.

> 
> [Test and retrain a model](../test-your-model.md)

* [What is Custom Vision?](../overview.md)
* The source code for this sample can be found on [GitHub](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/javascript/CustomVision/ImageClassification/CustomVisionQuickstart.js)
* [SDK reference documentation (training)](https://learn.microsoft.com/javascript/api/@azure/cognitiveservices-customvision-training/)
* [SDK reference documentation (prediction)](https://learn.microsoft.com/javascript/api/@azure/cognitiveservices-customvision-prediction/)



**Applies to: programming-language-python**


Get started with the Custom Vision client library for Python. Follow these steps to install the package and try out the example code for building an image classification model. You'll create a project, add tags, train the project, and use the project's prediction endpoint URL to programmatically test it. Use this example as a template for building your own image recognition app.

> **Note:**
> If you want to build and train a classification model _without_ writing code, see the [browser-based guidance](../getting-started-build-a-classifier.md).

Use the Custom Vision client library for Python to:

* Create a new Custom Vision project
* Add tags to the project
* Upload and tag images
* Train the project
* Publish the current iteration
* Test the prediction endpoint

[Reference documentation](https://learn.microsoft.com/python/api/overview/azure/cognitiveservices-vision-computervision-readme) | [Library source code](https://github.com/Azure/azure-sdk-for-python/tree/main/sdk/cognitiveservices/azure-cognitiveservices-vision-customvision) | [Package (PyPI)](https://pypi.org/project/azure-cognitiveservices-vision-customvision/) | [Samples](https://learn.microsoft.com/samples/browse/?languages=python\&products=azure\&term=vision\&terms=vision)

## Prerequisites

* An Azure subscription. You can [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
* [Python 3.x](https://www.python.org).
  * Your Python installation should include [pip](https://pip.pypa.io/en/stable/). You can check if you have pip installed by running `pip --version` on the command line. Get pip by installing the latest version of Python.
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

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/quickstarts/image-classification.md)

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

### Install the client library

To write an image analysis app with Custom Vision for Python, you need the Custom Vision client library. After installing Python, run the following command in PowerShell or a console window:

```powershell
pip install azure-cognitiveservices-vision-customvision
```

### Create a new Python application

Create a new Python file and import the following libraries.

[Code reference unavailable in this source snapshot: ../includes/quickstarts/~/cognitive-services-quickstart-code/python/CustomVision/ImageClassification/CustomVisionQuickstart.py?name=snippet_imports](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/quickstarts/image-classification.md)

> **Tip:**
> Want to view the whole quickstart code file at once? You can find it on [GitHub](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/python/CustomVision/ImageClassification/CustomVisionQuickstart.py), which contains the code examples in this quickstart.

Create variables for your resource's Azure endpoint and keys.

[Code reference unavailable in this source snapshot: ../includes/quickstarts/~/cognitive-services-quickstart-code/python/CustomVision/ImageClassification/CustomVisionQuickstart.py?name=snippet_creds](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/quickstarts/image-classification.md)


## Object model

| Name | Description |
| --- | --- |
| [CustomVisionTrainingClient](https://learn.microsoft.com/python/api/azure-cognitiveservices-vision-customvision/azure.cognitiveservices.vision.customvision.training.customvisiontrainingclient) | This class handles the creation, training, and publishing of your models. |
| [CustomVisionPredictionClient](https://learn.microsoft.com/python/api/azure-cognitiveservices-vision-customvision/azure.cognitiveservices.vision.customvision.prediction.customvisionpredictionclient) | This class handles the querying of your models for image classification predictions. |
| [ImagePrediction](https://learn.microsoft.com/python/api/azure-cognitiveservices-vision-customvision/azure.cognitiveservices.vision.customvision.prediction.models.imageprediction) | This class defines a single object prediction on a single image. It includes properties for the object ID and name, the bounding box location of the object, and a confidence score. |

## Code examples

These code snippets show you how to do the following with the Custom Vision client library for Python:

* [Authenticate the client](#authenticate-the-client)
* [Create a new Custom Vision project](#create-a-new-custom-vision-project)
* [Add tags to the project](#add-tags-to-the-project)
* [Upload and tag images](#upload-and-tag-images)
* [Train the project](#train-the-project)
* [Publish the current iteration](#publish-the-current-iteration)
* [Test the prediction endpoint](#test-the-prediction-endpoint)

## Authenticate the client

Instantiate a training and prediction client with your endpoint and keys. Create `ApiKeyServiceClientCredentials` objects with your keys, and use them with your endpoint to create a [CustomVisionTrainingClient](https://learn.microsoft.com/python/api/azure-cognitiveservices-vision-customvision/azure.cognitiveservices.vision.customvision.training.customvisiontrainingclient) and [CustomVisionPredictionClient](https://learn.microsoft.com/python/api/azure-cognitiveservices-vision-customvision/azure.cognitiveservices.vision.customvision.prediction.customvisionpredictionclient) object.

[Code reference unavailable in this source snapshot: ../includes/quickstarts/~/cognitive-services-quickstart-code/python/CustomVision/ImageClassification/CustomVisionQuickstart.py?name=snippet_auth](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/quickstarts/image-classification.md)

## Create a new Custom Vision project

Add the following code to your script to create a new Custom Vision service project. 

See the [create_project](https://learn.microsoft.com/python/api/azure-cognitiveservices-vision-customvision/azure.cognitiveservices.vision.customvision.training.operations.customvisiontrainingclientoperationsmixin#create-project-name--description-none--domain-id-none--classification-type-none--target-export-platforms-none--custom-headers-none--raw-false----operation-config-) method to specify other options when you create your project (explained in the [Build a classifier](../getting-started-build-a-classifier.md) web portal guide).  

[Code reference unavailable in this source snapshot: ../includes/quickstarts/~/cognitive-services-quickstart-code/python/CustomVision/ImageClassification/CustomVisionQuickstart.py?name=snippet_create](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/quickstarts/image-classification.md)

## Add tags to the project

To add classification tags to your project, add the following code:

[Code reference unavailable in this source snapshot: ../includes/quickstarts/~/cognitive-services-quickstart-code/python/CustomVision/ImageClassification/CustomVisionQuickstart.py?name=snippet_tags](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/quickstarts/image-classification.md)


## Upload and tag images

First, download the sample images for this project. Save the contents of the [sample Images folder](https://github.com/Azure-Samples/cognitive-services-sample-data-files/tree/master/CustomVision/ImageClassification/Images) to your local device.

To add the sample images to the project, insert the following code after the tag creation. This code uploads each image with its corresponding tag. You can upload up to 64 images in a single batch.

[Code reference unavailable in this source snapshot: ../includes/quickstarts/~/cognitive-services-quickstart-code/python/CustomVision/ImageClassification/CustomVisionQuickstart.py?name=snippet_upload](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/quickstarts/image-classification.md)

> **Note:**
> You need to change the path to the images based on where you downloaded the Foundry Tools Python SDK Samples repo.

## Train the project

This code creates the first iteration of the prediction model. 

[Code reference unavailable in this source snapshot: ../includes/quickstarts/~/cognitive-services-quickstart-code/python/CustomVision/ImageClassification/CustomVisionQuickstart.py?name=snippet_train](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/quickstarts/image-classification.md)

> **Tip:**
> Train with selected tags
>
> You can optionally train on only a subset of your applied tags. You might want to do this if you haven't applied enough of certain tags yet, but you do have enough of others. In the [train_project](https://learn.microsoft.com/python/api/azure-cognitiveservices-vision-customvision/azure.cognitiveservices.vision.customvision.training.operations.customvisiontrainingclientoperationsmixin#train-project-project-id--training-type-none--reserved-budget-in-hours-0--force-train-false--notification-email-address-none--selected-tags-none--custom-headers-none--raw-false----operation-config-\&preserve-view=true) call, set the optional parameter `selected_tags` to a list of the ID strings of the tags you want to use. The model will train to only recognize the tags on that list.

## Publish the current iteration

An iteration isn't available in the prediction endpoint until it's published. The following code makes the current iteration of the model available for querying. 

[Code reference unavailable in this source snapshot: ../includes/quickstarts/~/cognitive-services-quickstart-code/python/CustomVision/ImageClassification/CustomVisionQuickstart.py?name=snippet_publish](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/quickstarts/image-classification.md)


## Test the prediction endpoint

To send an image to the prediction endpoint and retrieve the prediction, add the following code to the end of the file:

[Code reference unavailable in this source snapshot: ../includes/quickstarts/~/cognitive-services-quickstart-code/python/CustomVision/ImageClassification/CustomVisionQuickstart.py?name=snippet_test](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/quickstarts/image-classification.md)

## Run the application

Run the application by using the following command:

```powershell
python CustomVisionQuickstart.py
```

The output of the application should be similar to the following text:

```console
Creating project...
Adding images...
Training...
Training status: Training
Training status: Completed
Done!
        Hemlock: 93.53%
        Japanese Cherry: 0.01%
```

You can then verify that the test image (found in *<base_image_location>/images/Test/*) is tagged appropriately. You can also go back to the [Custom Vision website](https://customvision.ai) and see the current state of your newly created project.

## Clean up resources


If you wish to implement your own image classification project (or try an [object detection](object-detection.md) project instead), you might want to delete the tree identification project from this example. A free subscription allows for two Custom Vision projects.

On the [Custom Vision website](https://customvision.ai), navigate to **Projects** and select the trash can under My New Project.

Screenshot of a panel labeled My New Project with a trash can icon.


## Related content

Now you've seen how every step of the image classification process can be done in code. This sample executes a single training iteration, but often you'll need to train and test your model multiple times in order to make it more accurate.

> 
> [Test and retrain a model](../test-your-model.md)

* [What is Custom Vision?](../overview.md)
* The source code for this sample can be found on [GitHub](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/python/CustomVision/ImageClassification/CustomVisionQuickstart.py)
* [SDK reference documentation](https://learn.microsoft.com/python/api/overview/azure/cognitiveservices-vision-computervision-readme)



**Applies to: programming-language-rest-api**


Get started with the Custom Vision REST API. Follow these steps to call the API and build an image classification model. You'll create a project, add tags, train the project, and use the project's prediction endpoint URL to programmatically test it. Use this example as a template for building your own image recognition app.

> **Note:**
> Custom Vision is most easily used through a client library SDK or through the [browser-based guidance](../get-started-build-detector.md).

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


[Code reference unavailable in this source snapshot: ~/cognitive-services-quickstart-code/curl/custom-vision/image-classifier.sh](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/quickstarts/image-classification.md)

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

[Code reference unavailable in this source snapshot: ~/cognitive-services-quickstart-code/curl/custom-vision/image-classifier.sh](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/quickstarts/image-classification.md)

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

[Code reference unavailable in this source snapshot: ~/cognitive-services-quickstart-code/curl/custom-vision/image-classifier.sh](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/quickstarts/image-classification.md)

* Again, insert your own key and endpoint URL.
* Replace `{projectId}` with your own project ID.
* Replace `{tagArray}` with the ID of a tag.
* Then, populate the body of the request with the binary data of the images you want to tag.

## Train the project

This method trains the model on the tagged images you uploaded and returns an ID for the current project iteration.

[Code reference unavailable in this source snapshot: ~/cognitive-services-quickstart-code/curl/custom-vision/image-classifier.sh](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/quickstarts/image-classification.md)

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

[Code reference unavailable in this source snapshot: ~/cognitive-services-quickstart-code/curl/custom-vision/image-classifier.sh](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/quickstarts/image-classification.md)

* Again, insert your own key and endpoint URL.
* Replace `{projectId}` with your own project ID.
* Replace `{iterationId}` with the ID returned in the previous step.
* Replace `{publishedName}` with the name you'd like to assign to your prediction model.
* Replace `{predictionId}` with your own prediction resource ID. You can find the prediction resource ID on the resource's **Properties** tab in the Azure portal, listed as **Resource ID**.
* Optionally use other URL parameters. See the [Publish Iteration](https://learn.microsoft.com/rest/api/customvision/publish-iteration) API.

## Test the prediction endpoint

Finally, use this command to test your trained model by uploading a new image for it to classify with tags. You can use the image in the *Test* folder of the sample files you downloaded earlier.

[Code reference unavailable in this source snapshot: ~/cognitive-services-quickstart-code/curl/custom-vision/image-classifier.sh](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/quickstarts/image-classification.md)

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


If you wish to implement your own image classification project (or try an [object detection](object-detection.md) project instead), you might want to delete the tree identification project from this example. A free subscription allows for two Custom Vision projects.

On the [Custom Vision website](https://customvision.ai), navigate to **Projects** and select the trash can under My New Project.

Screenshot of a panel labeled My New Project with a trash can icon.


## Related content

Now you've done every step of the image classification process using the REST API. This sample executes a single training iteration, but often you'll need to train and test your model multiple times in order to make it more accurate.

> 
> [Test and retrain a model](../test-your-model.md)

* [What is Custom Vision?](../overview.md)
* [API reference documentation (training)](https://learn.microsoft.com/dotnet/api/overview/azure/custom-vision)
* [API reference documentation (prediction)](https://learn.microsoft.com/rest/api/customvision/predictions)
