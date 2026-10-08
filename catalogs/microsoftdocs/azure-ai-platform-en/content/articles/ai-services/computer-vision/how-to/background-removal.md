---
title: Remove the background in images
titleSuffix: Foundry Tools
description: Learn how to call the Segment API to isolate and remove the background from images.
manager: mcleans
author: PatrickFarley
ms.author: pafarley
ms.service: azure-vision-foundry-tools
ms.topic: how-to
ms.date: 03/31/2026
ai-usage: ai-assisted
---

# Remove the background in images


> **Important:**
> This feature is now retired. On March 31, 2025, the Azure AI Image Analysis 4.0 Segment API and background removal service were retired. API calls to these services will fail.
>
> The segmentation feature of the open-source [Florence 2 model](https://huggingface.co/microsoft/Florence-2-large) might meet your needs. It returns an alpha map marking the difference between foreground and background, but it doesn't edit the original image to remove the background. Install the Florence 2 model and try out its Region to segmentation feature.
>
> For full-featured background removal, consider a third-party utility like [BiRefNet](https://github.com/ZhengPeng7/BiRefNet).

This article demonstrates how to call the Image Analysis 4.0 API to segment an image (separate the foreground from background). It also shows you how to parse the returned information.

> **Important:**
> Background removal is only available through direct REST API calls. It is not available through the SDKs.

> **Important:**
> Background removal is only available in certain Azure regions. See [Region availability](../overview-image-analysis.md#region-availability)


## Prerequisites

This guide assumes you have successfully followed the steps mentioned in the [quickstart](../quickstarts-sdk/image-analysis-client-library-40.md) page. This means:
* You have <a href="https://portal.azure.com/#create/Microsoft.CognitiveServicesComputerVision"  title="created a Vision resource"  target="_blank">created a Vision resource </a> and obtained a key and endpoint URL.
* You have successfully made a `curl.exe` call to the service (or used an alternative tool). You modify the `curl.exe` call based on the examples here.

The [quickstart](../quickstarts-sdk/image-analysis-client-library-40.md) shows you how to extract visual features from an image. However, the concepts are similar to background removal. Therefore you benefit from starting with the quickstart and making modifications.

## Authentication to the service

To authenticate to the Image Analysis service, you need a Computer Vision key and endpoint URL.

> **Tip:**
> Don't include the key directly in your code, and never post it publicly. See the Foundry Tools [security](../../security-features.md) article for more authentication options like [Azure Key Vault](../../use-key-vault.md). 

<!--
#### [C#](#tab/csharp)

Start by creating a [VisionServiceOptions](/dotnet/api/azure.ai.vision.common.visionserviceoptions) object using one of the constructors. For example:

[!code-csharp[](~/azure-ai-vision-sdk/docs/learn.microsoft.com/csharp/image-analysis/how-to/program.cs?name=vision_service_options)]

#### [Python](#tab/python)

Start by creating a [VisionServiceOptions](/python/api/azure-ai-vision/azure.ai.vision.visionserviceoptions) object using one of the constructors. For example:

[!code-python[](~/azure-ai-vision-sdk/docs/learn.microsoft.com/python/image-analysis/how-to/main.py?name=vision_service_options)]

#### [Java](#tab/java)

Start by creating a [VisionServiceOptions](/java/api/com.azure.ai.vision.common.visionserviceoptions) object using one of the constructors. For example:

[!code-java[](~/azure-ai-vision-sdk/docs/learn.microsoft.com/java/image-analysis/how-to/ImageAnalysis.java?name=vision_service_options)]

#### [C++](#tab/cpp)

At the start of your code, use one of the static constructor methods [VisionServiceOptions::FromEndpoint](/cpp/cognitive-services/vision/service-visionserviceoptions#fromendpoint-1) to create a *VisionServiceOptions* object. For example:

[!code-cpp[](~/azure-ai-vision-sdk/docs/learn.microsoft.com/cpp/image-analysis/how-to/how-to.cpp?name=vision_service_options)]

Where we used this helper function to read the value of an environment variable:

[!code-cpp[](~/azure-ai-vision-sdk/docs/learn.microsoft.com/cpp/image-analysis/how-to/how-to.cpp?name=get_env_var)]

#### [REST API](#tab/rest)
-->

Authentication is done by adding the HTTP request header **Ocp-Apim-Subscription-Key** and setting it to your vision key. The call is made to the URL `<endpoint>/computervision/imageanalysis:segment?api-version=2023-02-01-preview`, where `<endpoint>` is your unique Computer Vision endpoint URL. See [Select a mode ](background-removal.md#select-a-mode) section for another query string you add to this URL.


## Select the image to analyze

The code in this guide uses remote images referenced by URL. You might want to try different images on your own to see the full capability of the Image Analysis features.

<!--
#### [C#](#tab/csharp)

Create a new **VisionSource** object from the URL of the image you want to analyze, using the static constructor [VisionSource.FromUrl](/dotnet/api/azure.ai.vision.common.visionsource.fromurl).

[!code-csharp[](~/azure-ai-vision-sdk/docs/learn.microsoft.com/csharp/image-analysis/how-to/program.cs?name=vision_source)]

**VisionSource** implements **IDisposable**, therefore create the object with a **using** statement or explicitly call **Dispose** method after analysis completes.

> [!TIP]
> You can also analyze a local image by passing in the full-path image file name (see [VisionSource.FromFile](/dotnet/api/azure.ai.vision.common.visionsource.fromfile)), or by copying the image into the SDK's input buffer (see [VisionSource.FromImageSourceBuffer](/dotnet/api/azure.ai.vision.common.visionsource.fromimagesourcebuffer)). For more details, see [Call the Analyze API](./call-analyze-image-40.md?pivots=programming-language-csharp#select-the-image-to-analyze).

#### [Python](#tab/python)

In your script, create a new [VisionSource](/python/api/azure-ai-vision/azure.ai.vision.visionsource) object from the URL of the image you want to analyze.

[!code-python[](~/azure-ai-vision-sdk/docs/learn.microsoft.com/python/image-analysis/how-to/main.py?name=vision_source)]

> [!TIP]
> You can also analyze a local image by passing in the full-path image file name to the **VisionSource** constructor instead of the image URL (see argument name **filename**). Alternatively, you can analyze an image in a memory buffer by constructing **VisionSource** using the argument **image_source_buffer**. For more details, see [Call the Analyze API](./call-analyze-image-40.md?pivots=programming-language-python#select-the-image-to-analyze).

#### [Java](#tab/java)

Create a new **VisionSource** object from the URL of the image you want to analyze, using the static constructor [VisionSource.fromUrl](/java/api/com.azure.ai.vision.common.visionsource#com-azure-ai-vision-common-visionsource-fromurl(java-net-url)).

[!code-java[](~/azure-ai-vision-sdk/docs/learn.microsoft.com/java/image-analysis/how-to/ImageAnalysis.java?name=vision_source)]

**VisionSource** implements **AutoCloseable**, therefore create the object in a try-with-resources block, or explicitly call the **close** method on this object when you're done analyzing the image.

> [!TIP]
> You can also analyze a local image by passing in the full-path image file name (see [VisionSource.fromFile](/java/api/com.azure.ai.vision.common.visionsource#com-azure-ai-vision-common-visionsource-fromfile(java-lang-string)), or by copying the image into the SDK's input buffer (see [VisionSource.fromImageSourceBuffer](/java/api/com.azure.ai.vision.common.visionsource#com-azure-ai-vision-common-visionsource-fromimagesourcebuffer(com-azure-ai-vision-common-imagesourcebuffer))). For more details, see [Call the Analyze API](./call-analyze-image-40.md?pivots=programming-language-java#select-the-image-to-analyze).

#### [C++](#tab/cpp)

Create a new **VisionSource** object from the URL of the image you want to analyze, using the static constructor [VisionSource::FromUrl](/cpp/cognitive-services/vision/input-visionsource#fromurl).

[!code-cpp[](~/azure-ai-vision-sdk/docs/learn.microsoft.com/cpp/image-analysis/how-to/how-to.cpp?name=vision_source)]

> [!TIP]
> You can also analyze a local image by passing in the full-path image file name (see [VisionSource::FromFile](/cpp/cognitive-services/vision/input-visionsource#fromfile)), or by copying the image into the SDK's input buffer (see  [VisionSource::FromImageSourceBuffer](/cpp/cognitive-services/vision/input-visionsource#fromimagesourcebuffer)). For more details, see [Call the Analyze API](./call-analyze-image-40.md?pivots=programming-language-cpp#select-the-image-to-analyze).

#### [REST API](#tab/rest)
-->

When analyzing a remote image, you specify the image's URL by formatting the request body like this: `{"url":"https://learn.microsoft.com/azure/ai-services/computer-vision/images/windows-kitchen.jpg"}`. The **Content-Type** should be `application/json`.

To analyze a local image, you'd put the binary image data in the HTTP request body. The **Content-Type** should be `application/octet-stream` or `multipart/form-data`.



## Select a mode

<!--
### [C#](#tab/csharp)

Create a new [ImageAnalysisOptions](/dotnet/api/azure.ai.vision.imageanalysis.imageanalysisoptions) object and set the property [SegmentationMode](/dotnet/api/azure.ai.vision.imageanalysis.imageanalysisoptions.segmentationmode#azure-ai-vision-imageanalysis-imageanalysisoptions-segmentationmode). This property must be set if you want to do segmentation. See [ImageSegmentationMode](/dotnet/api/azure.ai.vision.imageanalysis.imagesegmentationmode) for supported values.

[!code-csharp[](~/azure-ai-vision-sdk/docs/learn.microsoft.com/csharp/image-analysis/segmentation/Program.cs?name=segmentation_mode)]

### [Python](#tab/python)

Create a new [ImageAnalysisOptions](/python/api/azure-ai-vision/azure.ai.vision.imageanalysisoptions) object and set the property [segmentation_mode](/python/api/azure-ai-vision/azure.ai.vision.imageanalysisoptions#azure-ai-vision-imageanalysisoptions-segmentation-mode). This property must be set if you want to do segmentation. See [ImageSegmentationMode](/python/api/azure-ai-vision/azure.ai.vision.enums.imagesegmentationmode) for supported values.

[!code-python[](~/azure-ai-vision-sdk/docs/learn.microsoft.com/python/image-analysis/segmentation/main.py?name=segmentation_mode)]

### [Java](#tab/java)

Create a new [ImageAnalysisOptions](/java/api/com.azure.ai.vision.imageanalysis.imageanalysisoptions) object and call the [setSegmentationMode](/java/api/com.azure.ai.vision.imageanalysis.imageanalysisoptions#com-azure-ai-vision-imageanalysis-imageanalysisoptions-setsegmentationmode()) method. You must call this method if you want to do segmentation. See [ImageSegmentationMode](/java/api/com.azure.ai.vision.imageanalysis.imagesegmentationmode) for supported values.

[!code-java[](~/azure-ai-vision-sdk/docs/learn.microsoft.com/java/image-analysis/segmentation/ImageAnalysis.java?name=segmentation_mode)]

### [C++](#tab/cpp)

Create a new [ImageAnalysisOptions](/cpp/cognitive-services/vision/imageanalysis-imageanalysisoptions) object and call the [SetSegmentationMode](/cpp/cognitive-services/vision/imageanalysis-imageanalysisoptions#setsegmentationmode) method. You must call this method if you want to do segmentation. See [ImageSegmentationMode](/cpp/cognitive-services/vision/azure-ai-vision-imageanalysis-namespace#enum-imagesegmentationmode) for supported values.

[!code-cpp[](~/azure-ai-vision-sdk/docs/learn.microsoft.com/cpp/image-analysis/segmentation/segmentation.cpp?name=segmentation_mode)]

### [REST](#tab/rest)
-->

Set the query string *mode* to one of these two values. This query string is mandatory if you want to do image segmentation.

| URL parameter | Value | Description |
| --- | --- | --- |
| `mode` | `backgroundRemoval` | Outputs an image of the detected foreground object with a transparent background. |
| `mode` | `foregroundMatting` | Outputs a gray-scale alpha matte image showing the opacity of the detected foreground object. |

A populated URL for backgroundRemoval would look like this: `<endpoint>/computervision/imageanalysis:segment?api-version=2023-02-01-preview&mode=backgroundRemoval`


## Get results from the service

This section shows you how to make the API call and parse the results.

<!--
#### [C#](#tab/csharp)

The following code calls the Image Analysis API and saves the resulting segmented image to a file named **output.png**. It also displays some metadata about the segmented image.

[!code-csharp[](~/azure-ai-vision-sdk/docs/learn.microsoft.com/csharp/image-analysis/segmentation/Program.cs?name=segment)]

**SegmentationResult** implements **IDisposable**, therefore  create the object with a **using** statement or explicitly call **Dispose** method after analysis completes.

#### [Python](#tab/python)

The following code calls the Image Analysis API and saves the resulting segmented image to a file named **output.png**. It also displays some metadata about the segmented image.

[!code-python[](~/azure-ai-vision-sdk/docs/learn.microsoft.com/python/image-analysis/segmentation/main.py?name=segment)]

#### [Java](#tab/java)

The following code calls the Image Analysis API and saves the resulting segmented image to a file named **output.png**. It also displays some metadata about the segmented image.

[!code-java[](~/azure-ai-vision-sdk/docs/learn.microsoft.com/java/image-analysis/segmentation/ImageAnalysis.java?name=segment)]

**SegmentationResult** implements **AutoCloseable**, therefore create the object in a try-with-resources block, or explicitly call the **close** method on this object when you're done analyzing the image.

#### [C++](#tab/cpp)

The following code calls the Image Analysis API and saves the resulting segmented image to a file named **output.png**. It also displays some metadata about the segmented image.

[!code-cpp[](~/azure-ai-vision-sdk/docs/learn.microsoft.com/cpp/image-analysis/segmentation/segmentation.cpp?name=segment)]

#### [REST](#tab/rest)
-->

The service returns a `200` HTTP response on success with `Content-Type: image/png`, and the body contains the returned PNG image in the form of a binary stream.


As an example, assume background removal is run on the following image:

Photo of a city near water.

On a successful background removal call, the following four-channel PNG image is the response for the `backgroundRemoval` mode:

Photo of a city near water; sky is transparent.

The following one-channel PNG image is the response for the `foregroundMatting` mode:

Alpha matte of a city skyline.

The API returns an image the same size as the original for the `foregroundMatting` mode, but at most 16 megapixels (preserving image aspect ratio) for the `backgroundRemoval` mode.

## Error codes

<!--# [C#](#tab/csharp)

The sample code for getting analysis results shows how to handle errors and get the [ImageAnalysisErrorDetails](/dotnet/api/azure.ai.vision.imageanalysis.imageanalysiserrordetails) object that contains the error information. The error information includes:

* Error reason. See enum [ImageAnalysisErrorReason](/dotnet/api/azure.ai.vision.imageanalysis.imageanalysiserrorreason).
* Error code and error message. Select the **REST API** tab to see a list of some common error codes and messages.

In addition to those errors, the SDK has a few other error messages, including:
  * `Missing Image Analysis options: You must set at least one visual feature (or model name) for the 'analyze' operation. Or set segmentation mode for the 'segment' operation`
  * `Invalid combination of Image Analysis options: You cannot set both visual features (or model name), and segmentation mode`

Make sure the [ImageAnalysisOptions](/dotnet/api/azure.ai.vision.imageanalysis.imageanalysisoptions) object is set correctly to fix these errors. 

To help resolve issues, look at the [Image Analysis Samples](https://github.com/Azure-Samples/azure-ai-vision-sdk) repository and run the closest sample to your scenario. Search the [GitHub issues](https://github.com/Azure-Samples/azure-ai-vision-sdk/issues) to see if your issue was already address. If not, create a new.

# [Python](#tab/python)

The sample code for getting analysis results shows how to handle errors and get the [ImageAnalysisErrorDetails](/python/api/azure-ai-vision/azure.ai.vision.imageanalysiserrordetails) object that contains the error information. The error information includes:

* Error reason. See enum [ImageAnalysisErrorReason](/python/api/azure-ai-vision/azure.ai.vision.enums.imageanalysiserrorreason).
* Error code and error message. Select the **REST API** tab to see a list of some common error codes and messages.

In addition to those errors, the SDK has a few other error messages, including:
  * `Missing Image Analysis options: You must set at least one visual feature (or model name) for the 'analyze' operation. Or set segmentation mode for the 'segment' operation`
  * `Invalid combination of Image Analysis options: You cannot set both visual features (or model name), and segmentation mode`

Make sure the [ImageAnalysisOptions](/python/api/azure-ai-vision/azure.ai.vision.imageanalysisoptions) object is set correctly to fix these errors. 

To help resolve issues, look at the [Image Analysis Samples](https://github.com/Azure-Samples/azure-ai-vision-sdk) repository and run the closest sample to your scenario. Search the [GitHub issues](https://github.com/Azure-Samples/azure-ai-vision-sdk/issues) to see if your issue was already address. If not, create a new.

# [Java](#tab/java)

The sample code for getting analysis results shows how to handle errors and get the [ImageAnalysisErrorDetails](/java/api/com.azure.ai.vision.imageanalysis.imageanalysiserrordetails) object that contains the error information. The error information includes:

* Error reason. See enum [ImageAnalysisErrorReason](/java/api/com.azure.ai.vision.imageanalysis.imageanalysiserrorreason).
* Error code and error message. Select the **REST API** tab to see a list of some common error codes and messages.

In addition to those errors, the SDK has a few other error messages, including:
  * `Missing Image Analysis options: You must set at least one visual feature (or model name) for the 'analyze' operation. Or set segmentation mode for the 'segment' operation`
  * `Invalid combination of Image Analysis options: You cannot set both visual features (or model name), and segmentation mode`

Make sure the [ImageAnalysisOptions](/java/api/com.azure.ai.vision.imageanalysis.imageanalysisoptions) object is set correctly to fix these errors. 

To help resolve issues, look at the [Image Analysis Samples](https://github.com/Azure-Samples/azure-ai-vision-sdk) repository and run the closest sample to your scenario. Search the [GitHub issues](https://github.com/Azure-Samples/azure-ai-vision-sdk/issues) to see if your issue was already address. If not, create a new.

# [C++](#tab/cpp)

The sample code for getting analysis results shows how to handle errors and get the [ImageAnalysisErrorDetails](/cpp/cognitive-services/vision/imageanalysis-imageanalysiserrordetails) object that contains the error information. The error information includes:

* Error reason. See enum [ImageAnalysisErrorReason](/cpp/cognitive-services/vision/azure-ai-vision-imageanalysis-namespace#enum-imageanalysiserrorreason).
* Error code and error message. Select the **REST API** tab to see a list of some common error codes and messages.

In addition to those errors, the SDK has a few other error messages, including:
  * `Missing Image Analysis options: You must set at least one visual feature (or model name) for the 'analyze' operation. Or set segmentation mode for the 'segment' operation`
  * `Invalid combination of Image Analysis options: You cannot set both visual features (or model name), and segmentation mode`

Make sure the [ImageAnalysisOptions](/cpp/cognitive-services/vision/imageanalysis-imageanalysisoptions) object is set correctly to fix these errors. 

To help resolve issues, look at the [Image Analysis Samples](https://github.com/Azure-Samples/azure-ai-vision-sdk) repository and run the closest sample to your scenario. Search the [GitHub issues](https://github.com/Azure-Samples/azure-ai-vision-sdk/issues) to see if your issue was already address. If not, create a new.

# [REST API](#tab/rest)
-->

On error, the Image Analysis service response contains a JSON payload that includes an error code and error message. It may also include other details in the form of and inner error code and message. For example:

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
  * `InvalidRequest - The feature 'Caption' is not supported in this region`. The feature is only supported in specific Azure regions. See [Quickstart prerequisites](../quickstarts-sdk/image-analysis-client-library-40.md#prerequisites) for the list of supported Azure regions.
  * `InvalidRequest - The provided image content type ... is not supported`. The HTTP header **Content-Type** in the request isn't an allowed type:
    * For an image URL, **Content-Type** should be `application/json`
    * For a binary image data, **Content-Type** should be `application/octet-stream` or `multipart/form-data`
  * `InvalidRequest - Either 'features' or 'model-name' needs to be specified in the query parameter`. 
  * `InvalidRequest - Image format is not valid`
    * `InvalidImageFormat - Image format is not valid`. See the [Image requirements](../overview-image-analysis.md?tabs=4-0#input-requirements) section for supported image formats.
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



> **Tip:**
> While working with Azure Vision, you might encounter transient failures caused by [rate limits](https://azure.microsoft.com/pricing/details/cognitive-services/computer-vision/) enforced by the service, or other transient problems like network outages. For information about handling these types of failures, see [Retry pattern](https://learn.microsoft.com/azure/architecture/patterns/retry) in the Cloud Design Patterns guide, and the related [Circuit Breaker pattern](https://learn.microsoft.com/azure/architecture/patterns/circuit-breaker).




## Next step

> 
> [Background removal concepts](../concept-background-removal.md)
