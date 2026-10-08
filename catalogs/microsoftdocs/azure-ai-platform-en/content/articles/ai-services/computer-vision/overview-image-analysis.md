---
title: What is Image Analysis?
titleSuffix: Foundry Tools
description: The Image Analysis service uses pretrained AI models to extract many different visual features from images.
author: PatrickFarley
manager: mcleans
ms.service: azure-vision-foundry-tools
ms.custom: build-2023, build-2023-dataai
ms.topic: overview
ms.date: 09/26/2025
ms.author: pafarley
keywords: Azure Vision in Foundry Tools, Azure Vision in Foundry Tools applications, Azure Vision in Foundry Tools
ai-usage: ai-assisted
---

# What is Image Analysis?


> **Caution:**
> The Image Analysis 4.0 service in Azure Vision in Foundry Tools is deprecated and will be retired on September 25, 2028, after which calls made to the service will fail. We recommend you switch to one of the available alternatives outlined in the [Migration guide](migration-options.md).


Azure Vision in Foundry Tools Image Analysis service can extract a wide variety of visual features from your images. For example, it can determine whether an image contains adult content, find specific brands or objects, or find human faces.

The latest version of Image Analysis, 4.0, which is now generally available, has new features like synchronous OCR and people detection. 

You can use Image Analysis through a client library SDK or by calling the [REST API](https://aka.ms/vision-4-0-ref) directly. Follow the [quickstart](quickstarts-sdk/image-analysis-client-library-40.md) to get started.

> 
> [Quickstart](quickstarts-sdk/image-analysis-client-library-40.md)


This documentation contains the following types of articles:
* The [quickstarts](quickstarts-sdk/image-analysis-client-library.md) are step-by-step instructions that let you make calls to the service and get results in a short period of time. 
* The [how-to guides](how-to/call-analyze-image.md) contain instructions for using the service in more specific or customized ways.
* The [conceptual articles](concept-tagging-images.md) provide in-depth explanations of the service's functionality and features.
<!--* The [tutorials](./tutorials/storage-lab-tutorial.md) are longer guides that show you how to use this service as a component in broader business solutions.-->

For a more structured approach, follow a Training module for Image Analysis.
* [Analyze images with Azure Vision](https://learn.microsoft.com/training/modules/analyze-images-computer-vision/)


## Image Analysis versions

> **Important:**
> Select the Image Analysis API version that best fits your requirements.
>
> | Version | Features available | Recommendation&nbsp; |
> | :--- | --- | --- |
> | version&nbsp;4.0 | Read text, Captions, Dense captions, Tags, Object detection, People, Smart crop | Better models; use version 4.0 if it supports your use case. |
> | version&nbsp;3.2 | Tags, Objects, Descriptions, Brands, Faces, Image type, Color scheme, Landmarks, Celebrities, Adult content, Smart crop | Wider range of features; use version 3.2 if your use case is not yet supported in version 4.0 |
> 
> We recommend you use the Image Analysis 4.0 API if it supports your use case. Use version 3.2 if your use case is not yet supported by 4.0.
>
> You'll also need to use version 3.2 if you want to do image captioning and your Vision resource is outside the supported Azure regions. The image captioning feature in Image Analysis 4.0 is only supported in certain Azure regions. Image captioning in version 3.2 is available in all Azure Vision regions. See [Region availability](https://learn.microsoft.com/azure/ai-services/computer-vision/overview-image-analysis#region-availability).


## Analyze Image

You can analyze images to get insights about their visual features and characteristics. The Analyze Image API provides all of the features in this table. To get started, follow a [quickstart](quickstarts-sdk/image-analysis-client-library-40.md).

| Name | Description | Concept page |
| --- | --- | --- |
| **Model customization** (v4.0 preview only) (deprecated) | Create and train custom models for image classification or object detection. Bring your own images, label them with custom tags, and Image Analysis trains a model customized for your use case. | [Model customization](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/computer-vision/concept-model-customization.md) |
| **Read text from images** (v4.0 only) | Version 4.0 preview of Image Analysis offers the ability to extract readable text from images. Compared with the async Computer Vision 3.2 Read API, the new version offers the familiar Read OCR engine in a unified performance-enhanced synchronous API that makes it easy to get OCR along with other insights in a single API call. | [OCR for images](concept-ocr.md) |
| **Detect people in images** (v4.0 only) | Version 4.0 of Image Analysis offers the ability to detect people appearing in images. The API returns the bounding box coordinates of each detected person, along with a confidence score. | [People detection](concept-people-detection.md) |
| **Generate image captions** | Generate a caption of an image in human-readable language, using complete sentences. Computer Vision's algorithms generate captions based on the objects identified in the image. <br/><br/>The version 4.0 image captioning model is a more advanced implementation and works with a wider range of input images. It's only available in certain geographic regions. See [Region availability](#region-availability). <br/><br/>Version 4.0 also lets you use dense captioning, which generates detailed captions for individual objects that are found in the image. The API returns the bounding box coordinates (in pixels) of each object found in the image, plus a caption. You can use this functionality to generate descriptions of separate parts of an image.<br/><br/>Photo of cows with a simple description on the right. | [Generate image captions (v3.2)](concept-describing-images.md)<br/>[(v4.0)](concept-describe-images-40.md) |
| **Detect objects** | Object detection is similar to tagging, but the API returns the bounding box coordinates for each tag applied. For example, if an image contains a dog, cat, and person, the Detect operation lists those objects together with their coordinates in the image. You can use this functionality to process further relationships between the objects in an image. It also lets you know when there are multiple instances of the same tag in an image. <br/><br/>Photo of an office with a rectangle drawn around a laptop. | [Detect objects (v3.2)](concept-object-detection.md)<br/>[(v4.0)](concept-object-detection-40.md) |
| **Tag visual features** | Identify and tag visual features in an image, from a set of thousands of recognizable objects, living things, scenery, and actions. When the tags are ambiguous or not common knowledge, the API response provides hints to clarify the context of the tag. Tagging isn't limited to the main subject, such as a person in the foreground, but also includes the setting (indoor or outdoor), furniture, tools, plants, animals, accessories, gadgets, and so on.<br/><br/>Photo of a skateboarder with tags listed on the right. | [Tag visual features (v3.2)](concept-tagging-images.md)<br/>[(v4.0)](concept-tag-images-40.md) |
| **Get the area of interest / smart crop** | Analyze the contents of an image to return the coordinates of the *area of interest* that matches a specified aspect ratio. Computer Vision returns the bounding box coordinates of the region, so the calling application can modify the original image as desired. <br/><br/>The version 4.0 smart cropping model is a more advanced implementation and works with a wider range of input images. It's only available in certain geographic regions. See [Region availability](#region-availability). | [Generate a thumbnail (v3.2)](concept-generating-thumbnails.md)<br/>[(v4.0 preview)](concept-generate-thumbnails-40.md) |
| **Detect brands** (v3.2 only) | Identify commercial brands in images or videos from a database of thousands of global logos. You can use this feature, for example, to discover which brands are most popular on social media or most prevalent in media product placement. | [Detect brands](concept-brand-detection.md) |
| **Categorize an image** (v3.2 only) | Identify and categorize an entire image, using a [category taxonomy](category-taxonomy.md) with parent/child hereditary hierarchies. Categories can be used alone, or with our new tagging models.<br/><br/>Currently, English is the only supported language for tagging and categorizing images. | [Categorize an image](concept-categorizing-images.md) |
| **Detect faces** (v3.2 only) | Detect faces in an image and provide information about each detected face. Azure Vision returns the coordinates, rectangle, gender, and age for each detected face.<br/><br/>You can also use the dedicated [Face API](../face/overview-identity.md) for these purposes. It provides more detailed analysis, such as facial identification and pose detection. | [Detect faces](concept-detecting-faces.md) |
| **Detect image types** (v3.2 only) | Detect characteristics about an image, such as whether an image is a line drawing or the likelihood of whether an image is clip art. | [Detect image types](concept-detecting-image-types.md) |
| **Detect domain-specific content** (v3.2 only) | Use domain models to detect and identify domain-specific content in an image, such as celebrities and landmarks. For example, if an image contains people, Azure Vision can use a domain model for celebrities to determine if the people detected in the image are known celebrities. | [Detect domain-specific content](concept-detecting-domain-content.md) |
| **Detect the color scheme** (v3.2 only) | Analyze color usage within an image. Azure Vision can determine whether an image is black & white or color and, for color images, identify the dominant and accent colors. | [Detect the color scheme](concept-detecting-color-schemes.md) |
| **Moderate content in images** (v3.2 only) | Use Azure Vision to detect adult content in an image and return confidence scores for different classifications. The threshold for flagging content can be set on a sliding scale to accommodate your preferences. | [Detect adult content](concept-detecting-adult-content.md) |


## Product Recognition (v4.0 preview only) (deprecated)


> **Important:**
> This feature is now retired. On March 31, 2025, Azure AI Image Analysis 4.0 Custom Image Classification, Custom Object Detection, and Product Recognition preview API were retired. API calls to these services will fail.
>
> Transition to [Azure AI Custom Vision](https://learn.microsoft.com/azure/ai-services/Custom-Vision-Service/overview), which is generally available. Custom Vision offers similar functionality to these retiring features.

The Product Recognition APIs let you analyze photos of shelves in a retail store. You can detect the presence or absence of products and get their bounding box coordinates. Use it in combination with model customization to train a model to identify your specific products. You can also compare Product Recognition results to your store's planogram document.

[Product Recognition](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/computer-vision/concept-shelf-analysis.md)

## Multimodal embeddings (v4.0 only)

The multimodal embeddings APIs enable the _vectorization_ of images and text queries. They convert images to coordinates in a multidimensional vector space. Then, you can convert incoming text queries to vectors, and match images to the text based on semantic closeness. This capability lets you search a set of images by using text, without needing to use image tags or other metadata. Semantic closeness often produces better results in search.

The `2024-02-01` API includes a multilingual model that supports text search in 102 languages. The original English-only model is still available, but you can't combine it with the new model in the same search index. If you vectorized text and images by using the English-only model, these vectors aren't compatible with multilingual text and image vectors.

These APIs are only available in certain geographic regions. See [Region availability](#region-availability).

[Multimodal embeddings](concept-image-retrieval.md)

## Background removal (v4.0 preview only)


> **Important:**
> This feature is now retired. On March 31, 2025, the Azure AI Image Analysis 4.0 Segment API and background removal service were retired. API calls to these services will fail.
>
> The segmentation feature of the open-source [Florence 2 model](https://huggingface.co/microsoft/Florence-2-large) might meet your needs. It returns an alpha map marking the difference between foreground and background, but it doesn't edit the original image to remove the background. Install the Florence 2 model and try out its Region to segmentation feature.
>
> For full-featured background removal, consider a third-party utility like [BiRefNet](https://github.com/ZhengPeng7/BiRefNet).

<!--
Image Analysis 4.0 (preview) offers the ability to remove the background of an image. This feature can either output an image of the detected foreground object with a transparent background, or a grayscale alpha matte image showing the opacity of the detected foreground object. 

[Background removal](./concept-background-removal.md)

|Original image  |With background removed  |Alpha matte  |
|:---------:|:---------:|:---------:|
|   :::image type="content" source="media/background-removal/person-5.png" alt-text="Photo of a group of people using a tablet.":::  |    :::image type="content" source="media/background-removal/person-5-result.png" alt-text="Photo of a group of people using a tablet; background is transparent.":::     |   :::image type="content" source="media/background-removal/person-5-matte.png" alt-text="Alpha matte of a group of people.":::      |
-->

## Service limits

### Input requirements

#### [Version 4.0](#tab/4-0)

Image Analysis works on images that meet the following requirements:

- The image must be in JPEG, PNG, GIF, BMP, WEBP, ICO, TIFF, or MPO format
- The file size of the image must be less than 20 megabytes (MB)
- The dimensions of the image must be greater than 50 x 50 pixels and less than 16,000 x 16,000 pixels

> **Tip:**
> Input requirements for multimodal embeddings are different and are listed in [Multimodal embeddings](https://learn.microsoft.com/azure/ai-services/computer-vision/concept-image-retrieval#input-requirements).

#### [Version 3.2](#tab/3-2)

Image Analysis works on images that meet the following requirements:

- The image must be in JPEG, PNG, GIF, or BMP format
- The file size of the image must be less than 4 megabytes (MB)
- The dimensions of the image must be greater than 50 x 50 pixels and less than 16,000 x 16,000 pixels

---


### Language support

Different Image Analysis features are available in different languages. See the [language support](https://learn.microsoft.com/azure/ai-services/computer-vision/language-support) page.



### Region availability

To use the Image Analysis APIs, you must create your Azure Vision in Foundry Tools resource in a supported region. The Image Analysis features are available in the following regions:

| Region | Analyze Image<br>(minus 4.0 Captions) | Analyze Image<br>(including 4.0 Captions) | Product Recognition | Multimodal embeddings |
| --- | --- | --- | --- | --- |
| East US | ✅ | ✅ | ✅ | ✅ |
| West US | ✅ | ✅ |  | ✅ |
| West US 2 | ✅ |  | ✅ | ✅ |
| France Central | ✅ | ✅ |  | ✅ |
| North Europe | ✅ | ✅ |  | ✅ |
| West Europe | ✅ | ✅ |  | ✅ |
| Sweden Central | ✅ |  |  | ✅ |
| Switzerland North | ✅ |  |  | ✅ |
| Australia East | ✅ |  |  | ✅ |
| Southeast Asia | ✅ | ✅ |  | ✅ |
| East Asia | ✅ | ✅ |  |  |
| Korea Central | ✅ | ✅ |  | ✅ |
| Japan East | ✅ |  |  | ✅ |


## Data privacy and security

As with all of the Foundry Tools, developers using the Azure Vision service should be aware of Microsoft's policies on customer data. To learn more, see the [Foundry Tools page](https://www.microsoft.com/trustcenter/cloudservices/cognitiveservices) on the Microsoft Trust Center.

## Next steps

Get started with Image Analysis by following the quickstart guide in your preferred development language and API version:

- [Quickstart (v4.0): Vision REST API or client libraries](quickstarts-sdk/image-analysis-client-library-40.md)
- [Quickstart (v3.2): Vision REST API or client libraries](quickstarts-sdk/image-analysis-client-library.md)
