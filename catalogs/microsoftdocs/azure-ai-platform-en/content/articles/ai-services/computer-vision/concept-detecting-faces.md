---
title: Face detection - Azure Vision in Foundry Tools
titleSuffix: Foundry Tools
description: Learn concepts related to the face detection feature of Azure Vision in Foundry Tools API.
author: PatrickFarley
manager: mcleans

ms.service: azure-vision-foundry-tools
ms.topic: concept-article
ms.date: 09/26/2025
ms.author: pafarley
---

# Face detection with Image Analysis 3.2

Image Analysis 3.2 can detect human faces within an image and generate rectangle coordinates for each detected face.

> **Note:**
> This feature is also offered by the dedicated [Azure Face](../face/overview-identity.md) service. Use that alternative for more detailed face analysis, including face identification and head pose detection.


> **Caution:**
> Microsoft has retired or limited facial recognition capabilities that can be used to try to infer emotional states and identity attributes, which, if misused, can subject people to stereotyping, discrimination, or unfair denial of services. The retired capabilities are emotion and gender. The limited capabilities are age, smile, facial hair, hair and makeup. Email [Azure Face team](mailto:azureface@microsoft.com) if you have a responsible use case that would benefit from the use of any of the limited capabilities. Read more about this decision [here](https://azure.microsoft.com/blog/responsible-ai-investments-and-safeguards-for-facial-recognition/).


## Face detection examples

The following example demonstrates the JSON response returned by Analyze API for an image containing a single human face.

Vision Analyze Woman Roof Face

```json
{
    "faces": [
        {
            "age": 23,
            "gender": "Female",
            "faceRectangle": {
                "top": 45,
                "left": 194,
                "width": 44,
                "height": 44
            }
        }
    ],
    "requestId": "8439ba87-de65-441b-a0f1-c85913157ecd",
    "metadata": {
        "height": 200,
        "width": 300,
        "format": "Png"
    }
}
```

The next example demonstrates the JSON response returned for an image containing multiple faces.

Vision Analyze Family Photo Face

```json
{
    "faces": [
        {
            "age": 11,
            "gender": "Male",
            "faceRectangle": {
                "top": 62,
                "left": 22,
                "width": 45,
                "height": 45
            }
        },
        {
            "age": 11,
            "gender": "Female",
            "faceRectangle": {
                "top": 127,
                "left": 240,
                "width": 42,
                "height": 42
            }
        },
        {
            "age": 37,
            "gender": "Female",
            "faceRectangle": {
                "top": 55,
                "left": 200,
                "width": 41,
                "height": 41
            }
        },
        {
            "age": 41,
            "gender": "Male",
            "faceRectangle": {
                "top": 45,
                "left": 103,
                "width": 39,
                "height": 39
            }
        }
    ],
    "requestId": "3a383cbe-1a05-4104-9ce7-1b5cf352b239",
    "metadata": {
        "height": 230,
        "width": 300,
        "format": "Png"
    }
}
```

## Use the API

The face detection feature is part of the [Analyze Image 3.2](https://learn.microsoft.com/rest/api/computervision/analyze-image/analyze-image?view=rest-computervision-v3.2\&tabs=HTTP\&preserve-view=true) API. You can call this API through a native SDK or through REST calls. Include `Faces` in the **visualFeatures** query parameter. Then, when you get the full JSON response, simply parse the string for the contents of the `"faces"` section.

## Next step

> 
> [Quickstart: Vision REST API or client libraries](quickstarts-sdk/image-analysis-client-library.md?pivots=programming-language-csharp)
