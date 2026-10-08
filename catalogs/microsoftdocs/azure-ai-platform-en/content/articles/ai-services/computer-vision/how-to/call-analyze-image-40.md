---
title: Call the Image Analysis 4.0 Analyze API
titleSuffix: Foundry Tools
description: Learn how to call the Image Analysis 4.0 API and configure its behavior.
manager: mcleans
author: PatrickFarley
ms.author: pafarley
ms.service: azure-vision-foundry-tools
ms.topic: how-to
ms.date: 06/30/2025
ms.custom:  devx-track-python, devx-track-extended-java, devx-track-js
zone_pivot_groups: programming-languages-computer-vision
---

# Call the Image Analysis 4.0 Analyze API

This article demonstrates how to call the Image Analysis 4.0 API to return information about an image's visual features. It also shows you how to parse the returned information.

**Applies to: programming-language-csharp**



## Prerequisites

This guide assumes you've followed the steps mentioned in the [quickstart](https://learn.microsoft.com/azure/ai-services/computer-vision/quickstarts-sdk/image-analysis-client-library-40) page. This means:

* You have <a href="https://portal.azure.com/#create/Microsoft.CognitiveServicesComputerVision"  title="Created a Computer Vision resource"  target="_blank">created a Computer Vision resource </a> and obtained a key and endpoint URL.
* You have the appropriate SDK package installed and you have a running [quickstart](https://learn.microsoft.com/azure/ai-services/computer-vision/quickstarts-sdk/image-analysis-client-library-40) application. You can modify this quickstart application based on code examples here.

## Add import statements 

Make sure your code file has the following statements:

[Code reference unavailable in this source snapshot: ../includes/how-to-guides/~/cognitive-services-quickstart-code/dotnet/ComputerVision/4-0/image-analysis-how-to/Program.cs?name=snippet_imports](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/computer-vision/how-to/call-analyze-image-40.md)


## Create and authenticate the client

To authenticate against the Image Analysis service, you need a Computer Vision key and endpoint URL. This guide assumes that you've defined the environment variables `VISION_KEY` and `VISION_ENDPOINT` with your key and endpoint.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/computer-vision/how-to/call-analyze-image-40.md)

Start by creating a [ImageAnalysisClient](https://learn.microsoft.com/dotnet/api/azure.ai.vision.imageanalysis.imageanalysisclient) object. For example:

[Code reference unavailable in this source snapshot: ../includes/how-to-guides/~/cognitive-services-quickstart-code/dotnet/ComputerVision/4-0/image-analysis-how-to/Program.cs?name=snippet_client](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/computer-vision/how-to/call-analyze-image-40.md)


## Select the image to analyze

You can select an image by providing a publicly accessible image URL, or by passing binary data to the SDK. See [Image requirements](../overview-image-analysis.md?tabs=4-0#input-requirements) for supported image formats.

### Image URL

Create a [Uri](https://learn.microsoft.com/dotnet/api/system.uri) object for the image you want to analyze.

[Code reference unavailable in this source snapshot: ../includes/how-to-guides/~/cognitive-services-quickstart-code/dotnet/ComputerVision/4-0/image-analysis-how-to/Program.cs?name=snippet_url](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/computer-vision/how-to/call-analyze-image-40.md)


### Image buffer

Alternatively, you can pass the image data to the SDK through a [BinaryData](https://learn.microsoft.com/dotnet/api/system.binarydata) object. For example, read from a local image file you want to analyze.

[Code reference unavailable in this source snapshot: ../includes/how-to-guides/~/cognitive-services-quickstart-code/dotnet/ComputerVision/4-0/image-analysis-how-to/Program.cs?name=snippet_file](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/computer-vision/how-to/call-analyze-image-40.md)




## Select visual features

The Analysis 4.0 API gives you access to all of the service's image analysis features. Choose which operations to do based on your own use case. See the [overview](https://learn.microsoft.com/azure/ai-services/computer-vision/overview-image-analysis) for a description of each feature. The example in this section adds all of the [available visual features](https://learn.microsoft.com/dotnet/api/azure.ai.vision.imageanalysis.visualfeatures), but for practical usage you likely need fewer.

> **Important:**
> The visual features `Captions` and `DenseCaptions` are only supported in certain Azure regions: see [Region availability](../overview-image-analysis.md#region-availability)



[Code reference unavailable in this source snapshot: ../includes/how-to-guides/~/cognitive-services-quickstart-code/dotnet/ComputerVision/4-0/image-analysis-how-to/Program.cs?name=snippet_features](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/computer-vision/how-to/call-analyze-image-40.md)

<!--
### Set model name when using a custom model

You can also do image analysis with a custom trained model. To create and train a model, see [Create a custom Image Analysis model](/azure/ai-services/computer-vision/how-to/model-customization). Once your model is trained, all you need is the model's name. You don't need to specify visual features if you use a custom model.


To use a custom model, create the [ImageAnalysisOptions](/dotnet/api/azure.ai.vision.imageanalysis.imageanalysisoptions) object and set the [ModelName](/dotnet/api/azure.ai.vision.imageanalysis.imageanalysisoptions.modelname#azure-ai-vision-imageanalysis-imageanalysisoptions-modelname) property. You don't need to set any other properties on **ImageAnalysisOptions**. There's no need to set the [Features](/dotnet/api/azure.ai.vision.imageanalysis.imageanalysisoptions.features#azure-ai-vision-imageanalysis-imageanalysisoptions-features) property, as you do with the standard model, since your custom model already implies the visual features the service extracts.

[!code-csharp[](~/azure-ai-vision-sdk/docs/learn.microsoft.com/csharp/image-analysis/custom-model/program.cs?name=model_name)]
-->


## Select analysis options

Use an [ImageAnalysisOptions](https://learn.microsoft.com/dotnet/api/azure.ai.vision.imageanalysis.imageanalysisoptions) object to specify various options for the Analyze Image API call.

- **Language**: You can specify the language of the returned data. The language is optional, with the default being English. See [Language support](https://aka.ms/cv-languages) for a list of supported language codes and which visual features are supported for each language. 
- **Gender neutral captions**: If you're extracting captions or dense captions (using [VisualFeatures.Caption](https://learn.microsoft.com/dotnet/api/azure.ai.vision.imageanalysis.visualfeatures) or [VisualFeatures.DenseCaptions](https://learn.microsoft.com/dotnet/api/azure.ai.vision.imageanalysis.visualfeatures)), you can ask for gender neutral captions. Gender neutral captions are optional, with the default being gendered captions. For example, in English, when you select gender neutral captions, terms like **woman** or **man** are replaced with **person**, and **boy** or **girl** are replaced with **child**.
- **Crop aspect ratio**: An aspect ratio is calculated by dividing the target crop width by the height. Supported values are from 0.75 to 1.8 (inclusive). Setting this property is only relevant when [VisualFeatures.SmartCrops](https://learn.microsoft.com/dotnet/api/azure.ai.vision.imageanalysis.visualfeatures) was selected as part the visual feature list. If you select [VisualFeatures.SmartCrops](https://learn.microsoft.com/dotnet/api/azure.ai.vision.imageanalysis.visualfeatures) but don't specify aspect ratios, the service returns one crop suggestion with an aspect ratio it sees fit. In this case, the aspect ratio is between 0.5 and 2.0 (inclusive).


[Code reference unavailable in this source snapshot: ../includes/how-to-guides/~/cognitive-services-quickstart-code/dotnet/ComputerVision/4-0/image-analysis-how-to/Program.cs?name=snippet_options](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/computer-vision/how-to/call-analyze-image-40.md)

## Call the Analyze API

This section shows you how to make an analysis call to the service.

Call the [Analyze](https://learn.microsoft.com/dotnet/api/azure.ai.vision.imageanalysis.imageanalysisclient#methods) method on the [ImageAnalysisClient](https://learn.microsoft.com/dotnet/api/azure.ai.vision.imageanalysis.imageanalysisclient) object, as shown here. The call is synchronous, and blocks execution until the service returns the results or an error occurred. Alternatively, you can call the non-blocking [AnalyzeAsync](https://learn.microsoft.com/dotnet/api/azure.ai.vision.imageanalysis.imageanalysisclient#methods) method.

Use the input objects created in the above sections. To analyze from an image buffer instead of URL, replace `imageURL` in the method call with the `imageData` variable.

[Code reference unavailable in this source snapshot: ../includes/how-to-guides/~/cognitive-services-quickstart-code/dotnet/ComputerVision/4-0/image-analysis-how-to/Program.cs?name=snippet_call](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/computer-vision/how-to/call-analyze-image-40.md)


## Get results from the service

The following code shows you how to parse the results of the various Analyze operations.

[Code reference unavailable in this source snapshot: ../includes/how-to-guides/~/cognitive-services-quickstart-code/dotnet/ComputerVision/4-0/image-analysis-how-to/Program.cs?name=snippet_results](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/computer-vision/how-to/call-analyze-image-40.md)

<!--
### Get results using custom model

This section shows you how to make an analysis call to the service, when using a custom model. 


The code is similar to the standard model case. The only difference is that results from the custom model are available on the **CustomTags** and/or **CustomObjects** properties of the [ImageAnalysisResult](/dotnet/api/azure.ai.vision.imageanalysis.imageanalysisresult) object.

[!code-csharp[](~/azure-ai-vision-sdk/docs/learn.microsoft.com/csharp/image-analysis/custom-model/program.cs?name=analyze)]
-->


## Troubleshooting

### Exception handling

When you interact with Image Analysis using the .NET SDK, any response from the service that doesn't have a `200` (success) status code results in an exception being thrown. For example, if you try to analyze an image that is not accessible due to a broken URL, a `400` status is returned, indicating a bad request, and a corresponding exception is thrown.

In the following snippet, errors are handled gracefully by catching the exception and displaying additional information about the error.

```C# Snippet:ImageAnalysisException
var imageUrl = new Uri("https://some-host-name.com/non-existing-image.jpg");

try
{
    var result = client.Analyze(imageUrl, VisualFeatures.Caption);
}
catch (RequestFailedException e)
{
    if (e.Status != 200)
    {
        Console.WriteLine("Error analyzing image.");
        Console.WriteLine($"HTTP status code {e.Status}: {e.Message}");
    }
    else
    {
        throw;
    }
}
```
You can learn more about how to enable SDK logging [here](https://learn.microsoft.com/dotnet/azure/sdk/logging).






**Applies to: programming-language-python**



## Prerequisites

This guide assumes you've followed the steps of the [quickstart](https://learn.microsoft.com/azure/ai-services/computer-vision/quickstarts-sdk/image-analysis-client-library-40). This means:

* You've <a href="https://portal.azure.com/#create/Microsoft.CognitiveServicesComputerVision"  title="Created a Computer Vision resource"  target="_blank">created a Computer Vision resource </a> and obtained a key and endpoint URL.
* You've installed the appropriate SDK package and have a working [quickstart](https://learn.microsoft.com/azure/ai-services/computer-vision/quickstarts-sdk/image-analysis-client-library-40) application. You can modify this quickstart application based on the code examples here.

## Create and authenticate the client

To authenticate against the Image Analysis service, you need a Computer Vision key and endpoint URL. This guide assumes that you've defined the environment variables `VISION_KEY` and `VISION_ENDPOINT` with your key and endpoint.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/computer-vision/how-to/call-analyze-image-40.md)

Start by creating an [ImageAnalysisClient](https://learn.microsoft.com/python/api/azure-ai-vision-imageanalysis/azure.ai.vision.imageanalysis.imageanalysisclient) object using one of the constructors. For example:

[Code reference unavailable in this source snapshot: ../includes/how-to-guides/~/cognitive-services-quickstart-code/python/ComputerVision/4-0/how-to.py?name=snippet_client](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/computer-vision/how-to/call-analyze-image-40.md)


## Select the image to analyze

You can select an image by providing a publicly accessible image URL, or by reading image data into the SDK's input buffer. See [Image requirements](../overview-image-analysis.md?tabs=4-0#input-requirements) for supported image formats.

### Image URL

You can use the following sample image URL.

[Code reference unavailable in this source snapshot: ../includes/how-to-guides/~/cognitive-services-quickstart-code/python/ComputerVision/4-0/how-to.py?name=snippet_url](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/computer-vision/how-to/call-analyze-image-40.md)


### Image buffer

Alternatively, you can pass in the image as [bytes](https://docs.python.org/3/library/stdtypes.html#bytes-objects) object. For example, read from a local image file you want to analyze.

[Code reference unavailable in this source snapshot: ../includes/how-to-guides/~/cognitive-services-quickstart-code/python/ComputerVision/4-0/how-to.py?name=snippet_file](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/computer-vision/how-to/call-analyze-image-40.md)

## Select visual features

The Analysis 4.0 API gives you access to all of the service's image analysis features. Choose which operations to do based on your own use case. See the [overview](https://learn.microsoft.com/azure/ai-services/computer-vision/overview-image-analysis) for a description of each feature. The example in this section adds all of the [available visual features](https://learn.microsoft.com/python/api/azure-ai-vision-imageanalysis/azure.ai.vision.imageanalysis.models.visualfeatures), but for practical usage you likely need fewer.

> **Important:**
> The visual features [Captions](https://learn.microsoft.com/java/api/com.azure.ai.vision.imageanalysis.models.visualfeatures#com-azure-ai-vision-imageanalysis-models-visualfeatures-caption) and [DenseCaptions](https://learn.microsoft.com/java/api/com.azure.ai.vision.imageanalysis.models.visualfeatures#com-azure-ai-vision-imageanalysis-models-visualfeatures-dense-captions) are only supported in certain Azure regions. See [Region availability](../overview-image-analysis.md#region-availability).

[Code reference unavailable in this source snapshot: ../includes/how-to-guides/~/cognitive-services-quickstart-code/python/ComputerVision/4-0/how-to.py?name=snippet_features](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/computer-vision/how-to/call-analyze-image-40.md)

<!--
### Set model name when using a custom model

You can also do image analysis with a custom trained model. To create and train a model, see [Create a custom Image Analysis model](/azure/ai-services/computer-vision/how-to/model-customization). Once your model is trained, all you need is the model's name. You don't need to specify visual features if you use a custom model.

To use a custom model, create the [ImageAnalysisOptions](/python/api/azure-ai-vision/azure.ai.vision.imageanalysisoptions) object and set the [model_name](/python/api/azure-ai-vision/azure.ai.vision.imageanalysisoptions#azure-ai-vision-imageanalysisoptions-model-name) property. You don't need to set any other properties on **ImageAnalysisOptions**. There's no need to set the [features](/python/api/azure-ai-vision/azure.ai.vision.imageanalysisoptions#azure-ai-vision-imageanalysisoptions-features) property, as you do with the standard model, since your custom model already implies the visual features the service extracts.

[!code-python[](~/azure-ai-vision-sdk/docs/learn.microsoft.com/python/image-analysis/custom-model/main.py?name=model_name)]
-->

## Call the analyze_from_url method with options

The following code calls the [analyze_from_url](https://learn.microsoft.com/python/api/azure-ai-vision-imageanalysis/azure.ai.vision.imageanalysis.imageanalysisclient#azure-ai-vision-imageanalysis-imageanalysisclient-analyzefromurl) method on the client with the features you selected above and other options, defined below. To analyze from an image buffer instead of URL, call the method [analyze](https://learn.microsoft.com/python/api/azure-ai-vision-imageanalysis/azure.ai.vision.imageanalysis.imageanalysisclient#azure-ai-vision-imageanalysis-imageanalysisclient-analyze) instead, with `image_data=image_data` as the first argument.

[Code reference unavailable in this source snapshot: ../includes/how-to-guides/~/cognitive-services-quickstart-code/python/ComputerVision/4-0/how-to.py?name=snippet_call](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/computer-vision/how-to/call-analyze-image-40.md)

### Select smart cropping aspect ratios

An aspect ratio is calculated by dividing the target crop width by the height. Supported values are from 0.75 to 1.8 (inclusive). Setting this property is only relevant when [VisualFeatures.SMART_CROPS](https://learn.microsoft.com/python/api/azure-ai-vision-imageanalysis/azure.ai.vision.imageanalysis.models.visualfeatures) was selected as part the visual feature list. If you select [VisualFeatures.SMART_CROPS](https://learn.microsoft.com/python/api/azure-ai-vision-imageanalysis/azure.ai.vision.imageanalysis.models.visualfeatures) but don't specify aspect ratios, the service returns one crop suggestion with an aspect ratio it sees fit. In this case, the aspect ratio is between 0.5 and 2.0 (inclusive).


### Select gender neutral captions

If you're extracting captions or dense captions (using [VisualFeatures.CAPTION](https://learn.microsoft.com/python/api/azure-ai-vision-imageanalysis/azure.ai.vision.imageanalysis.models.visualfeatures) or [VisualFeatures.DENSE_CAPTIONS](https://learn.microsoft.com/python/api/azure-ai-vision-imageanalysis/azure.ai.vision.imageanalysis.models.visualfeatures)), you can ask for gender neutral captions. Gender neutral captions are optional, with the default being gendered captions. For example, in English, when you select gender neutral captions, terms like **woman** or **man** are replaced with **person**, and **boy** or **girl** are replaced with **child**.

### Specify languages

You can specify the language of the returned data. The language is optional, with the default being English. See [Language support](https://aka.ms/cv-languages) for a list of supported language codes and which visual features are supported for each language.


## Get results from the service

The following code shows you how to parse the results from the **analyze_from_url** or **analyze** operations.

[Code reference unavailable in this source snapshot: ../includes/how-to-guides/~/cognitive-services-quickstart-code/python/ComputerVision/4-0/how-to.py?name=snippet_result](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/computer-vision/how-to/call-analyze-image-40.md)


<!--
### Get results using custom model

This section shows you how to make an analysis call to the service, when using a custom model. 


The code is similar to the standard model case. The only difference is that results from the custom model are available on the **custom_tags** and/or **custom_objects** properties of the [ImageAnalysisResult](/python/api/azure-ai-vision/azure.ai.vision.imageanalysisresult) object.

[!code-python[](~/azure-ai-vision-sdk/docs/learn.microsoft.com/python/image-analysis/custom-model/main.py?name=analyze)]
-->


## Troubleshooting

### Exceptions

The `analyze` methods raise an [HttpResponseError](https://learn.microsoft.com/python/api/azure-core/azure.core.exceptions.httpresponseerror) exception for a non-success HTTP status code response from the service. The exception's `status_code` is the HTTP response status code. The exception's `error.message` contains a detailed message that allows you to diagnose the issue:

```python
try:
    result = client.analyze( ... )
except HttpResponseError as e:
    print(f"Status code: {e.status_code}")
    print(f"Reason: {e.reason}")
    print(f"Message: {e.error.message}")
```

For example, when you provide a wrong authentication key:
```
Status code: 401
Reason: PermissionDenied
Message: Access denied due to invalid subscription key or wrong API endpoint. Make sure to provide a valid key for an active subscription and use a correct regional API endpoint for your resource.
```

Or when you provide an image URL that doesn't exist or is not accessible:
```
Status code: 400
Reason: Bad Request
Message: The provided image url is not accessible.
```

### Logging

The client uses the standard [Python logging library](https://docs.python.org/3/library/logging.html). The SDK logs HTTP request and response details, which may be useful in troubleshooting. To log to stdout, add the following:

<!-- SNIPPET:sample_analyze_all_image_file.logging -->

```python
import sys
import logging

# Acquire the logger for this client library. Use 'azure' to affect both
# 'azure.core` and `azure.ai.vision.imageanalysis' libraries.
logger = logging.getLogger("azure")

# Set the desired logging level. logging.INFO or logging.DEBUG are good options.
logger.setLevel(logging.INFO)

# Direct logging output to stdout (the default):
handler = logging.StreamHandler(stream=sys.stdout)
# Or direct logging output to a file:
# handler = logging.FileHandler(filename = 'sample.log')
logger.addHandler(handler)

# Optional: change the default logging format. Here we add a timestamp.
formatter = logging.Formatter("%(asctime)s:%(levelname)s:%(name)s:%(message)s")
handler.setFormatter(formatter)
```

<!-- END SNIPPET -->

By default logs redact the values of URL query strings, the values of some HTTP request and response headers (including `Ocp-Apim-Subscription-Key`, which holds the key), and the request and response payloads. To create logs without redaction, set the method argument `logging_enable = True` when you create `ImageAnalysisClient`, or when you call `analyze` on the client. 

<!-- SNIPPET:sample_analyze_all_image_file.create_client_with_logging -->

```python
# Create an Image Analysis client with none redacted log
client = ImageAnalysisClient(
    endpoint=endpoint,
    credential=AzureKeyCredential(key),
    logging_enable=True
)
```

<!-- END SNIPPET -->

None redacted logs are generated for log level `logging.DEBUG` only. Be sure to protect none redacted logs to avoid compromising security. For more information, see [Configure logging in the Azure libraries for Python](https://aka.ms/azsdk/python/logging)





**Applies to: programming-language-java**



## Prerequisites

This guide assumes you've followed the steps in the [quickstart](https://learn.microsoft.com/azure/ai-services/computer-vision/quickstarts-sdk/image-analysis-client-library-40) page. This means:

* You have <a href="https://portal.azure.com/#create/Microsoft.CognitiveServicesComputerVision"  title="Created a Computer Vision resource"  target="_blank">created a Computer Vision resource </a> and obtained a key and endpoint URL.
* You have the appropriate SDK package installed and you have a running [quickstart](https://learn.microsoft.com/azure/ai-services/computer-vision/quickstarts-sdk/image-analysis-client-library-40) application. You can modify this quickstart application based on code examples here.

## Create and authenticate the client

To authenticate with the Image Analysis service, you need a Computer Vision key and endpoint URL. This guide assumes that you've defined the environment variables `VISION_KEY` and `VISION_ENDPOINT` with your key and endpoint.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/computer-vision/how-to/call-analyze-image-40.md)

Start by creating an [ImageAnalysisClient](https://learn.microsoft.com/java/api/com.azure.ai.vision.imageanalysis.imageanalysisclient) object. For example:

[Code reference unavailable in this source snapshot: ../includes/how-to-guides/~/cognitive-services-quickstart-code/java/ComputerVision/4-0/ImageAnalysisHowTo.java?name=snippet_client](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/computer-vision/how-to/call-analyze-image-40.md)


## Select the image to analyze

You can select an image by providing a publicly accessible image URL, or by reading image data into the SDK's input buffer. See [Image requirements](../overview-image-analysis.md?tabs=4-0#input-requirements) for supported image formats.

### Image URL

Create an `imageUrl` string to hold the publicly accessible URL of the image you want to analyze.

[Code reference unavailable in this source snapshot: ../includes/how-to-guides/~/cognitive-services-quickstart-code/java/ComputerVision/4-0/ImageAnalysisHowTo.java?name=snippet_url](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/computer-vision/how-to/call-analyze-image-40.md)

### Image buffer

Alternatively, you can pass in the image as memory buffer using a [BinaryData](https://learn.microsoft.com/java/api/com.azure.core.util.binarydata) object. For example, read from a local image file you want to analyze.

[Code reference unavailable in this source snapshot: ../includes/how-to-guides/~/cognitive-services-quickstart-code/java/ComputerVision/4-0/ImageAnalysisHowTo.java?name=snippet_file](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/computer-vision/how-to/call-analyze-image-40.md)

## Select visual features

The Analysis 4.0 API gives you access to all of the service's image analysis features. Choose which operations to do based on your own use case. See the [overview](https://learn.microsoft.com/azure/ai-services/computer-vision/overview-image-analysis) for a description of each feature. The example in this section adds all of the [available visual features](https://learn.microsoft.com/java/api/com.azure.ai.vision.imageanalysis.models.visualfeatures), but for practical usage you likely need fewer.

> **Important:**
> The visual features [Captions](https://learn.microsoft.com/java/api/com.azure.ai.vision.imageanalysis.models.visualfeatures#com-azure-ai-vision-imageanalysis-models-visualfeatures-caption) and [DenseCaptions](https://learn.microsoft.com/java/api/com.azure.ai.vision.imageanalysis.models.visualfeatures#com-azure-ai-vision-imageanalysis-models-visualfeatures-dense-captions) are only supported in certain Azure regions. See [Region availability](../overview-image-analysis.md#region-availability).

[Code reference unavailable in this source snapshot: ../includes/how-to-guides/~/cognitive-services-quickstart-code/java/ComputerVision/4-0/ImageAnalysisHowTo.java?name=snippet_features](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/computer-vision/how-to/call-analyze-image-40.md)

<!--
### Set model name when using a custom model

You can also do image analysis with a custom trained model. To create and train a model, see [Create a custom Image Analysis model](/azure/ai-services/computer-vision/how-to/model-customization). Once your model is trained, all you need is the model's name.

To use a custom model, create the [ImageAnalysisOptions](/java/api/com.azure.ai.vision.imageanalysis.imageanalysisoptions) object and call the [setModelName](/java/api/com.azure.ai.vision.imageanalysis.imageanalysisoptions#com-azure-ai-vision-imageanalysis-imageanalysisoptions-setmodelname(java-lang-string)) method. You don't need to set any other properties on **ImageAnalysisOptions**. There's no need to call [setFeatures](/java/api/com.azure.ai.vision.imageanalysis.imageanalysisoptions#com-azure-ai-vision-imageanalysis-imageanalysisoptions-setfeatures(java-util-enumset(com-azure-ai-vision-imageanalysis-imageanalysisfeature))), as you do with the standard model, since your custom model already implies the visual features the service extracts.

[!code-java[](~/azure-ai-vision-sdk/docs/learn.microsoft.com/java/image-analysis/custom-model/ImageAnalysis.java?name=model_name)]
-->

## Select analysis options

Use an [ImageAnalysisOptions](https://learn.microsoft.com/java/api/com.azure.ai.vision.imageanalysis.models.imageanalysisoptions) object to specify various options for the Analyze API call.

- **Language**: You can specify the language of the returned data. The language is optional, with the default being English. See [Language support](https://aka.ms/cv-languages) for a list of supported language codes and which visual features are supported for each language. 
- **Gender neutral captions**: If you're extracting captions or dense captions (using [VisualFeatures.CAPTION](https://learn.microsoft.com/java/api/com.azure.ai.vision.imageanalysis.models.visualfeatures#com-azure-ai-vision-imageanalysis-models-visualfeatures-caption) or [VisualFeatures.DENSE_CAPTIONS](https://learn.microsoft.com/java/api/com.azure.ai.vision.imageanalysis.models.visualfeatures#com-azure-ai-vision-imageanalysis-models-visualfeatures-dense-captions)), you can ask for gender neutral captions. Gender neutral captions are optional, with the default being gendered captions. For example, in English, when you select gender neutral captions, terms like **woman** or **man** are replaced with **person**, and **boy** or **girl** are replaced with **child**.
- **Crop aspect ratio**: An aspect ratio is calculated by dividing the target crop width by the height. Supported values are from 0.75 to 1.8 (inclusive). Setting this property is only relevant when [VisualFeatures.SMART_CROPS](https://learn.microsoft.com/java/api/com.azure.ai.vision.imageanalysis.models.visualfeatures#com-azure-ai-vision-imageanalysis-models-visualfeatures-smart-crops) was selected as part the visual feature list. If you select [VisualFeatures.SMART_CROPS](https://learn.microsoft.com/java/api/com.azure.ai.vision.imageanalysis.models.visualfeatures#com-azure-ai-vision-imageanalysis-models-visualfeatures-smart-crops) but don't specify aspect ratios, the service returns one crop suggestion with an aspect ratio it sees fit. In this case, the aspect ratio is between 0.5 and 2.0 (inclusive).

[Code reference unavailable in this source snapshot: ../includes/how-to-guides/~/cognitive-services-quickstart-code/java/ComputerVision/4-0/ImageAnalysisHowTo.java?name=snippet_options](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/computer-vision/how-to/call-analyze-image-40.md)

## Call the analyzeFromUrl method

This section shows you how to make an analysis call to the service.

Call the [analyzeFromUrl](https://learn.microsoft.com/java/api/com.azure.ai.vision.imageanalysis.imageanalysisclient#method-summary) method on the [ImageAnalysisClient](https://learn.microsoft.com/java/api/com.azure.ai.vision.imageanalysis.imageanalysisclient) object, as shown here. The call is synchronous, and will block until the service returns the results or an error occurred. Alternatively, you can use a [ImageAnalysisAsyncClient](https://learn.microsoft.com/java/api/com.azure.ai.vision.imageanalysis.imageanalysisasyncclient) object instead, and call its [analyzeFromUrl](https://learn.microsoft.com/java/api/com.azure.ai.vision.imageanalysis.imageanalysisasyncclient#method-summary) method, which is non-blocking.

To analyze from an image buffer instead of URL, call the [analyze](https://learn.microsoft.com/java/api/com.azure.ai.vision.imageanalysis.imageanalysisclient#method-summary) method instead, and pass in the `imageData` as the first argument.

[Code reference unavailable in this source snapshot: ../includes/how-to-guides/~/cognitive-services-quickstart-code/java/ComputerVision/4-0/ImageAnalysisHowTo.java?name=snippet_call](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/computer-vision/how-to/call-analyze-image-40.md)

<!--
### Get results using custom model

This section shows you how to make an analysis call to the service, when using a custom model. 


The code is similar to the standard model case. The only difference is that results from the custom model are available by calling **getCustomTags** and/or **getCustomObjects** methods on the [ImageAnalysisResult](/java/api/com.azure.ai.vision.imageanalysis.imageanalysisresult) object.

[!code-java[](~/azure-ai-vision-sdk/docs/learn.microsoft.com/java/image-analysis/custom-model/ImageAnalysis.java?name=analyze)]
-->

## Get results from the service

The following code shows you how to parse the results from the **analyzeFromUrl** and **analyze** operations.

[Code reference unavailable in this source snapshot: ../includes/how-to-guides/~/cognitive-services-quickstart-code/java/ComputerVision/4-0/ImageAnalysisHowTo.java?name=snippet_results](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/computer-vision/how-to/call-analyze-image-40.md)

## Troubleshooting

### Exceptions

The `analyze` methods throw [HttpResponseException](https://learn.microsoft.com/java/api/com.azure.core.exception) when the service responds with a non-success HTTP status code. The exception's `getResponse().getStatusCode()` holds the HTTP response status code. The exception's `getMessage()` contains a detailed message that allows you to diagnose the issue:

```java
try {
    ImageAnalysisResult result = client.analyze(...)
} catch (HttpResponseException e) {
    System.out.println("Exception: " + e.getClass().getSimpleName());
    System.out.println("Status code: " + e.getResponse().getStatusCode());
    System.out.println("Message: " + e.getMessage());
} catch (Exception e) {
    System.out.println("Message: " + e.getMessage());
}
```

For example, when you provide a wrong authentication key:

```
Exception: ClientAuthenticationException
Status code: 401
Message: Status code 401, "{"error":{"code":"401","message":"Access denied due to invalid subscription key or wrong API endpoint. Make sure to provide a valid key for an active subscription and use a correct regional API endpoint for your resource."}}"
```

Or when you provide an image in a format that isn't recognized:

```
Exception: HttpResponseException
Status code: 400
Message: Status code 400, "{"error":{"code":"InvalidRequest","message":"Image format is not valid.","innererror":{"code":"InvalidImageFormat","message":"Input data is not a valid image."}}}"
```

### Enable HTTP request/response logging

Reviewing the HTTP request sent or response received over the wire to the Image Analysis service can be useful in troubleshooting. The Image Analysis client library supports a built-in console logging framework for temporary debugging purposes. It also supports more advanced logging using the [SLF4J](https://www.slf4j.org/) interface. For detailed information, see [Use logging in the Azure SDK for Java](https://learn.microsoft.com/azure/developer/java/sdk/troubleshooting-overview#use-logging-in-the-azure-sdk-for-java).

The sections below discusses enabling console logging using the built-in framework.

#### By setting environment variables

You can enable console logging of HTTP request and response for your entire application by setting the following two environment variables. This change affects every Azure client that supports logging HTTP request and response.

* Set environment variable `AZURE_LOG_LEVEL` to `debug`
* Set environment variable `AZURE_HTTP_LOG_DETAIL_LEVEL` to one of the following values:

| Value | Logging level |
| --- | --- |
| `none` | HTTP request/response logging is disabled |
| `basic` | Logs only URLs, HTTP methods, and time to finish the request. |
| `headers` | Logs everything in BASIC, plus all the request and response headers. |
| `body` | Logs everything in BASIC, plus all the request and response body. |
| `body_and_headers` | Logs everything in HEADERS and BODY. |

#### By setting httpLogOptions

 To enable console logging of HTTP request and response for a single client

* Set environment variable `AZURE_LOG_LEVEL` to `debug`
* Add a call to `httpLogOptions` when building the `ImageAnalysisClient`:

```java
ImageAnalysisClient client = new ImageAnalysisClientBuilder()
    .endpoint(endpoint)
    .credential(new KeyCredential(key))
    .httpLogOptions(new HttpLogOptions().setLogLevel(HttpLogDetailLevel.BODY_AND_HEADERS))
    .buildClient();
```

The enum [HttpLogDetailLevel](https://learn.microsoft.com/java/api/com.azure.core.http.policy.httplogdetaillevel) defines the supported logging levels.

By default, when logging, certain HTTP header and query parameter values are redacted. It's possible to override this default by specifying which headers and query parameters are safe to log:

```java
ImageAnalysisClient client = new ImageAnalysisClientBuilder()
    .endpoint(endpoint)
    .credential(new KeyCredential(key))
    .httpLogOptions(new HttpLogOptions().setLogLevel(HttpLogDetailLevel.BODY_AND_HEADERS)
        .addAllowedHeaderName("safe-to-log-header-name")
        .addAllowedQueryParamName("safe-to-log-query-parameter-name"))
    .buildClient();
```

For example, to get a complete un-redacted log of the HTTP request, apply the following:

```java
    .httpLogOptions(new HttpLogOptions().setLogLevel(HttpLogDetailLevel.BODY_AND_HEADERS)
        .addAllowedHeaderName("Ocp-Apim-Subscription-Key")
        .addAllowedQueryParamName("features")
        .addAllowedQueryParamName("language")
        .addAllowedQueryParamName("gender-neutral-caption")
        .addAllowedQueryParamName("smartcrops-aspect-ratios")
        .addAllowedQueryParamName("model-version"))
```

Add more to the above to get an un-redacted HTTP response. When you share an un-redacted log, make sure it doesn't contain secrets such as your subscription key.




**Applies to: programming-language-javascript**



## Prerequisites

This guide assumes you followed the steps mentioned in the [quickstart](https://learn.microsoft.com/azure/ai-services/computer-vision/quickstarts-sdk/image-analysis-client-library-40). This means:

* You have <a href="https://portal.azure.com/#create/Microsoft.CognitiveServicesComputerVision"  title="Created a Computer Vision resource"  target="_blank">created a Computer Vision resource </a> and obtained a key and endpoint URL.
* You have the appropriate SDK package installed and you have a running [quickstart](https://learn.microsoft.com/azure/ai-services/computer-vision/quickstarts-sdk/image-analysis-client-library-40) application. You can modify this quickstart application based on the code examples here.

## Create and authenticate the client

To authenticate against the Image Analysis service, you need a Computer Vision key and endpoint URL. This guide assumes that you defined the environment variables `VISION_KEY` and `VISION_ENDPOINT` with your key and endpoint.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/computer-vision/how-to/call-analyze-image-40.md)

Start by creating a **ImageAnalysisClient** object. For example:

[Code reference unavailable in this source snapshot: ../includes/how-to-guides/~/cognitive-services-quickstart-code/javascript/ComputerVision/4-0/how-to.js?name=snippet_client](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/computer-vision/how-to/call-analyze-image-40.md)

## Select the image to analyze

You can select an image by providing a publicly accessible image URL, or by reading image data into the SDK's input buffer. See [Image requirements](../overview-image-analysis.md?tabs=4-0#input-requirements) for supported image formats.

### Image URL

You can use the following sample image URL.

[Code reference unavailable in this source snapshot: ../includes/how-to-guides/~/cognitive-services-quickstart-code/javascript/ComputerVision/4-0/how-to.js?name=snippet_url](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/computer-vision/how-to/call-analyze-image-40.md)

### Image buffer

Alternatively, you can pass in the image as a data array. For example, read from a local image file you want to analyze.

[Code reference unavailable in this source snapshot: ../includes/how-to-guides/~/cognitive-services-quickstart-code/javascript/ComputerVision/4-0/how-to.js?name=snippet_file](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/computer-vision/how-to/call-analyze-image-40.md)


## Select visual features

The Analysis 4.0 API gives you access to all of the service's image analysis features. Choose which operations to do based on your own use case. See the [Overview](https://learn.microsoft.com/azure/ai-services/computer-vision/overview-image-analysis) for a description of each feature. The example in this section adds all of the available visual features, but for practical usage you likely need fewer. 

> **Important:**
> The visual features [Captions](https://learn.microsoft.com/java/api/com.azure.ai.vision.imageanalysis.models.visualfeatures#com-azure-ai-vision-imageanalysis-models-visualfeatures-caption) and [DenseCaptions](https://learn.microsoft.com/java/api/com.azure.ai.vision.imageanalysis.models.visualfeatures#com-azure-ai-vision-imageanalysis-models-visualfeatures-dense-captions) are only supported in certain Azure regions. See .

[Code reference unavailable in this source snapshot: ../includes/how-to-guides/~/cognitive-services-quickstart-code/javascript/ComputerVision/4-0/how-to.js?name=snippet_features](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/computer-vision/how-to/call-analyze-image-40.md)

## Call the Analyze API with options

The following code calls the Analyze Image API with the features you selected above and other options, defined next. To analyze from an image buffer instead of URL, replace `imageURL` in the method call with `imageData`.

[Code reference unavailable in this source snapshot: ../includes/how-to-guides/~/cognitive-services-quickstart-code/javascript/ComputerVision/4-0/how-to.js?name=snippet_call](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/computer-vision/how-to/call-analyze-image-40.md)


### Select smart cropping aspect ratios

An aspect ratio is calculated by dividing the target crop width by the height. Supported values are from 0.75 to 1.8 (inclusive). Setting this property is only relevant when **VisualFeatures.SmartCrops** was selected as part the visual feature list. If you select **VisualFeatures.SmartCrops** but don't specify aspect ratios, the service returns one crop suggestion with an aspect ratio it sees fit. In this case, the aspect ratio is between 0.5 and 2.0 (inclusive).

### Select gender neutral captions

If you're extracting captions or dense captions (using **VisualFeatures.Caption** or **VisualFeatures.DenseCaptions**), you can ask for gender neutral captions. Gender neutral captions are optional, with the default being gendered captions. For example, in English, when you select gender neutral captions, terms like **woman** or **man** are replaced with **person**, and **boy** or **girl** are replaced with **child**. 

### Specify languages

You can specify the language of the returned data. The language is optional, with the default being English. See [Language support](https://aka.ms/cv-languages) for a list of supported language codes and which visual features are supported for each language.

## Get results from the service

The following code shows you how to parse the results of the various **analyze** operations.

[Code reference unavailable in this source snapshot: ../includes/how-to-guides/~/cognitive-services-quickstart-code/javascript/ComputerVision/4-0/how-to.js?name=snippet_results](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/computer-vision/how-to/call-analyze-image-40.md)


## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
const { setLogLevel } = require("@azure/logger");

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).




**Applies to: programming-language-rest-api**



## Prerequisites

This guide assumes you've successfully followed the steps mentioned in the [quickstart](https://learn.microsoft.com/azure/ai-services/computer-vision/quickstarts-sdk/image-analysis-client-library-40) page. This means:

* You've <a href="https://portal.azure.com/#create/Microsoft.CognitiveServicesComputerVision"  title="created a Computer Vision resource"  target="_blank">created a Computer Vision resource </a> and obtained a key and endpoint URL.
* You've successfully made a `curl.exe` call to the service (or used an alternative tool). You modify the `curl.exe` call based on the examples here.

## Authenticate against the service

To authenticate against the Image Analysis service, you need a Computer Vision key and endpoint URL.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/computer-vision/how-to/call-analyze-image-40.md)

The SDK example assumes that you defined the environment variables `VISION_KEY` and `VISION_ENDPOINT` with your key and endpoint.

Authentication is done by adding the HTTP request header **Ocp-Apim-Subscription-Key** and setting it to your vision key. The call is made to the URL `<endpoint>/computervision/imageanalysis:analyze?api-version=2024-02-01`, where `<endpoint>` is your unique computer vision endpoint URL. You add query strings based on your analysis options.

## Select the image to analyze

The code in this guide uses remote images referenced by URL. You might want to try different images on your own to see the full capability of the Image Analysis features.

### Image URL
When analyzing a remote image, you specify the image's URL by formatting the request body like this: `{"url":"https://learn.microsoft.com/azure/cognitive-services/computer-vision/images/windows-kitchen.jpg"}`. The **Content-Type** should be `application/json`.

### Image file
To analyze a local image, you'd put the binary image data in the HTTP request body. The **Content-Type** should be `application/octet-stream` or `multipart/form-data`.


## Select analysis options

### Select visual features when using the standard model

The Analysis 4.0 API gives you access to all of the service's image analysis features. Choose which operations to do based on your own use case. See the [overview](https://learn.microsoft.com/azure/ai-services/computer-vision/overview-image-analysis) for a description of each feature. The example in this section adds all of the available visual features, but for practical usage you likely need fewer. 

Visual features 'Captions' and 'DenseCaptions' are only supported in certain Azure regions: see [Region availability](../overview-image-analysis.md#region-availability).

> **Note:**
> The REST API uses the terms **Smart Crops** and **Smart Crops Aspect Ratios**. The SDK uses the terms **Crop Suggestions** and **Cropping Aspect Ratios**. They both refer to the same service operation. Similarly, the REST API uses the term **Read** for detecting text in the image using Optical Character Recognition (OCR), whereas the SDK uses the term **Text** for the same operation.


You can specify which features you want to use by setting the URL query parameters of the [Analysis 4.0 API](https://aka.ms/vision-4-0-ref). A parameter can have multiple values, separated by commas.

| URL parameter | Value | Description |
| --- | --- | --- |
| `features` | `read` | Reads the visible text in the image and outputs it as structured JSON data. |
| `features` | `caption` | Describes the image content with a complete sentence in supported languages. |
| `features` | `denseCaptions` | Generates detailed captions for up to 10 prominent image regions. |
| `features` | `smartCrops` | Finds the rectangle coordinates that would crop the image to a desired aspect ratio while preserving the area of interest. |
| `features` | `objects` | Detects various objects within an image, including the approximate location. The Objects argument is only available in English. |
| `features` | `tags` | Tags the image with a detailed list of words related to the image content. |
| `features` | `people` | Detects people appearing in images, including the approximate locations. |

A populated URL might look like this:

`<endpoint>/computervision/imageanalysis:analyze?api-version=2024-02-01&features=tags,read,caption,denseCaptions,smartCrops,objects,people`


### Set model name when using a custom model

You can also do image analysis with a custom trained model. To create and train a model, see [Create a custom Image Analysis model](https://learn.microsoft.com/azure/ai-services/computer-vision/how-to/model-customization). Once your model is trained, all you need is the model's name. You don't need to specify visual features if you use a custom model.


To use a custom model, don't use the features query parameter. Instead, set the `model-name` parameter to the name of your model as shown here. Replace `MyCustomModelName` with your custom model name.

`<endpoint>/computervision/imageanalysis:analyze?api-version=2023-02-01&model-name=MyCustomModelName`


### Specify languages

You can specify the language of the returned data. The language is optional, with the default being English. See [Language support](https://aka.ms/cv-languages) for a list of supported language codes and which visual features are supported for each language.

Language option only applies when you're using the standard model.


The following URL query parameter specifies the language. The default value is `en`.

| URL parameter | Value | Description |
| --- | --- | --- |
| `language` | `en` | English |
| `language` | `es` | Spanish |
| `language` | `ja` | Japanese |
| `language` | `pt` | Portuguese |
| `language` | `zh` | Simplified Chinese |

A populated URL might look like this:

`<endpoint>/computervision/imageanalysis:analyze?api-version=2024-02-01&features=caption&language=en`


### Select gender neutral captions

If you're extracting captions or dense captions, you can ask for gender neutral captions. Gender neutral captions are optional, with the default being gendered captions. For example, in English, when you select gender neutral captions, terms like **woman** or **man** are replaced with **person**, and **boy** or **girl** are replaced with **child**. 

Gender neutral caption option only applies when you're using the standard model.


Add the optional query string `gender-neutral-caption` with values `true` or `false` (the default).

A populated URL might look like this:

`<endpoint>/computervision/imageanalysis:analyze?api-version=2024-02-01&features=caption&gender-neutral-caption=true`


### Select smart cropping aspect ratios

An aspect ratio is calculated by dividing the target crop width by the height. Supported values are from 0.75 to 1.8 (inclusive). Setting this property is only relevant when **VisualFeatures.SmartCrops** was selected as part the visual feature list. If you select **VisualFeatures.SmartCrops** but don't specify aspect ratios, the service returns one crop suggestion with an aspect ratio it sees fit. In this case, the aspect ratio is between 0.5 and 2.0 (inclusive).

Smart cropping aspect rations only applies when you're using the standard model.


Add the optional query string `smartcrops-aspect-ratios`, with one or more aspect ratios separated by a comma.

A populated URL might look like this:

`<endpoint>/computervision/imageanalysis:analyze?api-version=2024-02-01&features=smartCrops&smartcrops-aspect-ratios=0.8,1.2`


## Get results from the service

### Get results using the standard model

This section shows you how to make an analysis call to the service using the standard model, and get the results.


The service returns a `200` HTTP response, and the body contains the returned data in the form of a JSON string. The following text is an example of a JSON response.

```json
{
    "modelVersion": "string",
    "captionResult": {
      "text": "string",
      "confidence": 0.0
    },
    "denseCaptionsResult": {
      "values": [
        {
          "text": "string",
          "confidence": 0.0,
          "boundingBox": {
            "x": 0,
            "y": 0,
            "w": 0,
            "h": 0
          }
        }
      ]
    },
    "metadata": {
      "width": 0,
      "height": 0
    },
    "tagsResult": {
      "values": [
        {
          "name": "string",
          "confidence": 0.0
        }
      ]
    },
    "objectsResult": {
      "values": [
        {
          "id": "string",
          "boundingBox": {
            "x": 0,
            "y": 0,
            "w": 0,
            "h": 0
          },
          "tags": [
            {
              "name": "string",
              "confidence": 0.0
            }
          ]
        }
      ]
    },
    "readResult": {
      "blocks": [
        {
          "lines": [
            {
              "text": "string",
              "boundingPolygon": [
                {
                  "x": 0,
                  "y": 0
                },
                {
                    "x": 0,
                    "y": 0
                },
                {
                    "x": 0,
                    "y": 0
                },
                {
                    "x": 0,
                    "y": 0
                }
              ],
              "words": [
                {
                  "text": "string",
                  "boundingPolygon": [
                    {
                        "x": 0,
                        "y": 0
                    },
                    {
                        "x": 0,
                        "y": 0
                    },
                    {
                        "x": 0,
                        "y": 0
                    },
                    {
                        "x": 0,
                        "y": 0
                    }
                  ],
                  "confidence": 0.0
                }
              ]
            }
          ]
        }
      ]
    },
    "smartCropsResult": {
      "values": [
        {
          "aspectRatio": 0.0,
          "boundingBox": {
            "x": 0,
            "y": 0,
            "w": 0,
            "h": 0
          }
        }
      ]
    },
    "peopleResult": {
      "values": [
        {
          "boundingBox": {
            "x": 0,
            "y": 0,
            "w": 0,
            "h": 0
          },
          "confidence": 0.0
        }
      ]
    }
  }
```

## Error codes

On error, the Image Analysis service response contains a JSON payload that includes an error code and error message. It might also include other details in the form of and inner error code and message. For example:

```json
{
    "error":
    {
        "code": "InvalidRequest",
        "message": "Analyze query is invalid.",
        "innererror":
        {
            "code": "NotSupportedVisualFeature",
            "message": "Specified feature type is not valid"
        }
    }
}
```

Following is a list of common errors and their causes. List items are presented in the following format: 

* HTTP response code
  * Error code and message in the JSON response
    * [Optional] Inner error code and message in the JSON response

List of common errors:

* `400 Bad Request`
  * `InvalidRequest - Image URL is badly formatted or not accessible`. Make sure the image URL is valid and publicly accessible.
  * `InvalidRequest - The image size is not allowed to be zero or larger than 20971520 bytes`. Reduce the size of the image by compressing it and/or resizing, and resubmit your request.
  * `InvalidRequest - The feature 'Caption' is not supported in this region`. The feature is only supported in specific Azure regions. See [Quickstart prerequisites](https://learn.microsoft.com/azure/ai-services/computer-vision/quickstarts-sdk/image-analysis-client-library-40#prerequisites) for the list of supported Azure regions.
  * `InvalidRequest - The provided image content type ... is not supported`. The HTTP header **Content-Type** in the request isn't an allowed type:
    * For an image URL, **Content-Type** should be `application/json`
    * For a binary image data, **Content-Type** should be `application/octet-stream` or `multipart/form-data`
  * `InvalidRequest - Either 'features' or 'model-name' needs to be specified in the query parameter`. 
  * `InvalidRequest - Image format is not valid`
    * `InvalidImageFormat - Image format is not valid`. See the [Image requirements](https://learn.microsoft.com/azure/ai-services/computer-vision/overview-image-analysis?tabs=4-0#input-requirements) section for supported image formats.
  * `InvalidRequest - Analyze query is invalid`
    * `NotSupportedVisualFeature - Specified feature type is not valid`. Make sure the **features** query string has a valid value.
    * `NotSupportedLanguage - The input language is not supported`. Make sure the **language** query string has a valid value for the selected visual feature, based on the [following table](https://aka.ms/cv-languages).
    * `BadArgument - 'smartcrops-aspect-ratios' aspect ratio is not in allowed range [0.75 to 1.8]`
* `401 PermissionDenied`
  * `401 - Access denied due to invalid subscription key or wrong API endpoint. Make sure to provide a valid key for an active subscription and use a correct regional API endpoint for your resource`.
* `404 Resource Not Found`
  * `404 - Resource not found`. The service couldn't find the custom model based on the name provided by the `model-name` query string.

<!-- Add any of those if/when you have a working example:
    * `NotSupportedImage` - Unsupported image, for example child pornography.
    * `InvalidDetails` - Unsupported `detail` parameter value.
    * `BadArgument` - More details are provided in the error message.
* `500`
    * `FailedToProcess`
    * `Timeout` - Image processing timed out.
    * `InternalServerError`
-->




## Related content

* Explore the [concept articles](../concept-describe-images-40.md) to learn more about each feature.
* Explore the SDK code samples on GitHub:
    - [C#](https://aka.ms/azsdk/image-analysis/samples/csharp)
    - [Python](https://aka.ms/azsdk/image-analysis/samples/python)
    - [Java](https://aka.ms/azsdk/image-analysis/samples/java)
    - [JavaScript](https://aka.ms/azsdk/image-analysis/samples/js)   
* See the [REST API reference](https://aka.ms/vision-4-0-ref) to learn more about the API functionality.
