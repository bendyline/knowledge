---
title: "Use prediction endpoint to programmatically test images with classifier - Custom Vision"
titleSuffix: Foundry Tools
description: Learn how to use the API to programmatically test images with your Custom Vision Service classifier.
author: PatrickFarley
manager: mcleans
ms.service: azure-ai-custom-vision
ms.topic: how-to
ms.date: 11/14/2024
ms.author: pafarley
ms.devlang: csharp
ms.custom: devx-track-csharp
---

# Call the Prediction API



> **Important:**
> Microsoft is announcing the planned retirement of the Azure Custom Vision service. Microsoft will provide full support for all existing Azure Custom Vision customers until 9/25/2028. During this support window, customers are encouraged to begin planning and executing their transition to alternative solutions.
> Depending on your use case, we recommend the following paths for transition:
> - For creating custom models for both image classification and object detection, **Azure Machine Learning AutoML** offers the ability to train both custom model types using classic machine learning techniques
> - [Learn more about Azure Machine Learning AutoML](https://learn.microsoft.com/azure/machine-learning/concept-automated-ml) and explore how it can offer support for custom model training.
> 
> Microsoft is also investing in Generative AI-based solutions that increase accuracy in custom scenarios using prompt engineering and other techniques.
> - To use generative models, you can use one of models available in the Foundry model catalog and create your own solution for customized vision.
> - For a managed generative solution for image classification, Azure Content Understanding in Foundry Tools (currently in public preview) offers the ability to create custom classification workflows. It also supports processing unstructured data of any type (image, documents, audio, video) and extract structured insights based on pre-defined or user-defined formats.
> - [Learn more about Microsoft Foundry Models](https://learn.microsoft.com/azure/ai-foundry/concepts/foundry-models-overview) and [Azure Content Understanding (public preview)](https://learn.microsoft.com/azure/ai-services/content-understanding/overview) and explore how they can offer alternative paths for your custom needs.
>
> For more detailed guidance on migration, see the [Azure Custom Vision Migration Guide](https://aka.ms/custom-vision-migration).


After you train your model, you can test it programmatically by submitting images to the Prediction API endpoint. In this guide, you'll learn how to call the Prediction API to score an image. You'll learn the different ways you can configure the behavior of this API to meet your needs.

> **Note:**
> This document demonstrates use of the .NET client library for C# to submit an image to the Prediction API. For more information and examples, see the [Prediction API reference](https://learn.microsoft.com/rest/api/customvision/predictions).

## Setup

### Publish your trained iteration

From the [Custom Vision website](https://customvision.ai), select your project and then select the __Performance__ tab.

To submit images to the Prediction API, you first need to publish your iteration for prediction, which can be done by selecting __Publish__ and specifying a name for the published iteration. This makes your model accessible to the Prediction API of your Custom Vision Azure resource.

Screenshot showing the performance tab, with a red rectangle surrounding the Publish button.

Once your model is successfully published, the **Published** label appears next to your iteration in the left-hand sidebar, and its name appears in the description of the iteration.

Screenshot of the performance tab, with a red rectangle surrounding the Published label and the name of the published iteration.

### Get the URL and prediction key

Once your model is published, you can retrieve the required information by selecting __Prediction URL__. A dialog box opens up with information for using the Prediction API, including the __Prediction URL__ and __Prediction-Key__.

Screenshot of the performance tab, with a red rectangle surrounding the Prediction URL button.

Screenshot of the performance tab, with a red rectangle surrounding the Prediction URL value for using an image file and the Prediction-Key value.

## Submit data to the service

This guide assumes that you already constructed a **[CustomVisionPredictionClient](https://learn.microsoft.com/azure/ai-services/custom-vision-service/quickstarts/image-classification)** object, named `predictionClient`, with your Custom Vision prediction key and endpoint URL. For instructions on how to set up this feature, follow one of the [quickstarts](quickstarts/image-classification.md).

In this guide, you use a local image, so download an image you'd like to submit to your trained model. The following code prompts the user to specify a local path and gets the bytestream of the file at that path.

```csharp
Console.Write("Enter image file path: ");
string imageFilePath = Console.ReadLine();
byte[] byteData = GetImageAsByteArray(imageFilePath);
```

Include the following helper method:

```csharp
private static byte[] GetImageAsByteArray(string imageFilePath)
{
    FileStream fileStream = new FileStream(imageFilePath, FileMode.Open, FileAccess.Read);
    BinaryReader binaryReader = new BinaryReader(fileStream);
    return binaryReader.ReadBytes((int)fileStream.Length);
}
```

The **[ClassifyImageAsync](https://learn.microsoft.com/azure/ai-services/custom-vision-service/use-prediction-api)** method takes the project ID and the locally stored image, and scores the image against the given model.

```csharp
// Make a prediction against the new project
Console.WriteLine("Making a prediction:");
var result = predictionApi.ClassifyImageAsync(project.Id, publishedModelName, byteData);
```

## Determine how to process the data

You can optionally configure how the service does the scoring operation by choosing alternate methods. For details, see the **[CustomVisionPredictionClient](https://learn.microsoft.com/azure/ai-services/custom-vision-service/use-prediction-api)** method.

You can use a nonasync version of the preceding method for simplicity, but it might cause the program to lock up for a noticeable amount of time.

The `-WithNoStore` methods require that the service doesn't retain the prediction image after prediction is complete. Normally, the service retains these images so you have the option of adding them as training data for future iterations of your model.

The `-WithHttpMessages` methods return the raw HTTP response of the API call.

## Get results from the service

The service returns results in the form of an **[ImagePrediction](https://learn.microsoft.com/azure/ai-services/custom-vision-service/use-prediction-api)** object. The `Predictions` property contains a list of **[PredictionModel](https://learn.microsoft.com/dotnet/api/overview/azure/custom-vision)** objects, which each represents a single object prediction. They include the name of the label and the bounding box coordinates where the object was detected in the image. Your app can then parse this data to, for example, display the image with labeled object fields on a screen. 

## Next step

In this guide, you learned how to submit images to your custom image classifier/detector and receive a response programmatically with the C# SDK. Next, learn how to complete end-to-end scenarios with C#, or get started using a different language SDK.

* [Quickstart: Custom Vision SDK](quickstarts/image-classification.md)
