---
title: "Call the Detect API - Face"
titleSuffix: Foundry Tools
description: This guide demonstrates how to use face detection to extract attributes like age, emotion, or head pose from a given image.
#customer intent: As a developer, I want to use face detection to extract attributes from images so that I can analyze and process facial data.
author: PatrickFarley
manager: mcleans

ms.service: azure-vision-foundry-tools
ms.subservice: azure-ai-face
ms.update-cycle: 90-days
ms.topic: how-to
ms.date: 01/30/2026
ms.author: pafarley
ms.devlang: csharp
ms.custom: devx-track-csharp
feedback_help_link_url: https://learn.microsoft.com/answers/tags/156/azure-face

---

# Call the Detect API


> **Caution:**
> Face service access is limited based on eligibility and usage criteria in order to support our Responsible AI principles. Face service is only available to Microsoft managed customers and partners. Use the [Face Recognition intake form](https://aka.ms/facerecognition) to apply for access. For more information, see the [Face limited access](https://learn.microsoft.com/azure/ai-foundry/responsible-ai/computer-vision/limited-access-identity) page.



> **Caution:**
> Microsoft has retired or limited facial recognition capabilities that can be used to try to infer emotional states and identity attributes, which, if misused, can subject people to stereotyping, discrimination, or unfair denial of services. The retired capabilities are emotion and gender. The limited capabilities are age, smile, facial hair, hair and makeup. Email [Azure Face team](mailto:azureface@microsoft.com) if you have a responsible use case that would benefit from the use of any of the limited capabilities. Read more about this decision [here](https://azure.microsoft.com/blog/responsible-ai-investments-and-safeguards-for-facial-recognition/).

This guide demonstrates how to use the face detection API to extract attributes from a given image. You'll learn the different ways to configure the behavior of this API to meet your needs.

The code snippets in this guide are written in C# by using the Azure Face client library. The same functionality is available through the [REST API](https://learn.microsoft.com/rest/api/face/face-detection-operations/detect).


## Prerequisites

- This guide assumes that you already constructed a [FaceClient](https://learn.microsoft.com/dotnet/api/azure.ai.vision.face.faceclient) object, named `faceClient`, using a Face key and endpoint URL. For instructions on how to set up this feature, follow one of the quickstarts.

## Submit data to the service

To find faces and get their locations in an image, call the [DetectAsync](https://learn.microsoft.com/dotnet/api/azure.ai.vision.face.faceclient.detectasync). It takes either a URL string or the raw image binary as input.

[Code reference unavailable in this source snapshot: ~/cognitive-services-quickstart-code/dotnet/Face/Detect.cs](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/face/how-to/identity-detect-faces.md)

The service returns a [FaceDetectionResult](https://learn.microsoft.com/dotnet/api/azure.ai.vision.face.facedetectionresult) object, which you can query for different kinds of information, specified below.

For information on how to parse the location and dimensions of the face, see [FaceRectangle](https://learn.microsoft.com/dotnet/api/azure.ai.vision.face.facedetectionresult.facerectangle). Usually, this rectangle contains the eyes, eyebrows, nose, and mouth. The top of head, ears, and chin aren't necessarily included. To use the face rectangle to crop a complete head or get a mid-shot portrait, you should expand the rectangle in each direction.

## Determine how to process the data

This guide focuses on the specifics of the Detect call, such as what arguments you can pass and what you can do with the returned data. We recommend that you query for only the features you need. Each operation takes additional time to complete.

### Get face ID

If you set the parameter _returnFaceId_ to `true` (approved customers only), you can get the unique ID for each face, which you can use in later face recognition tasks.

[Code reference unavailable in this source snapshot: ~/cognitive-services-quickstart-code/dotnet/Face/Detect.cs](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/face/how-to/identity-detect-faces.md)

The optional _faceIdTimeToLive_ parameter specifies how long (in seconds) the face ID should be stored on the server. After this time expires, the face ID is removed. The default value is 86400 (24 hours).

### Get face landmarks

[Face landmarks](../concept-face-detection.md#face-landmarks) are a set of easy-to-find points on a face, such as the pupils or the tip of the nose. To get face landmark data, set the _detectionModel_ parameter to `FaceDetectionModel.Detection03` and the _returnFaceLandmarks_ parameter to `true`.

[Code reference unavailable in this source snapshot: ~/cognitive-services-quickstart-code/dotnet/Face/Detect.cs](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/face/how-to/identity-detect-faces.md)

### Get face attributes

Besides face rectangles and landmarks, the face detection API can analyze several conceptual attributes of a face. For a full list, see the [Face attributes](../concept-face-detection.md#attributes) conceptual section.

To analyze face attributes, set the _detectionModel_ parameter to `FaceDetectionModel.Detection03` and the _returnFaceAttributes_ parameter to a list of [FaceAttributeType Enum](https://learn.microsoft.com/dotnet/api/azure.ai.vision.face.faceattributetype) values.

[Code reference unavailable in this source snapshot: ~/cognitive-services-quickstart-code/dotnet/Face/Detect.cs](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/face/how-to/identity-detect-faces.md)


## Get results from the service

### Face landmark results

The following code demonstrates how you might retrieve the locations of the nose and pupils:

[Code reference unavailable in this source snapshot: ~/cognitive-services-quickstart-code/dotnet/Face/Detect.cs](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/face/how-to/identity-detect-faces.md)

You also can use face landmark data to accurately calculate the direction of the face. For example, you can define the rotation of the face as a vector from the center of the mouth to the center of the eyes. The following code calculates this vector:

[Code reference unavailable in this source snapshot: ~/cognitive-services-quickstart-code/dotnet/Face/Detect.cs](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/face/how-to/identity-detect-faces.md)

When you know the direction of the face, you can rotate the rectangular face frame to align it more properly. To crop faces in an image, you can programmatically rotate the image so the faces always appear upright.


### Face attribute results

The following code shows how you might retrieve the face attribute data that you requested in the original call.

[Code reference unavailable in this source snapshot: ~/cognitive-services-quickstart-code/dotnet/Face/Detect.cs](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/face/how-to/identity-detect-faces.md)

To learn more about each of the attributes, see the [Face detection and attributes](../concept-face-detection.md) conceptual guide.

## Next step

In this guide, you learned how to use the various functionalities of face detection and analysis. Next, integrate these features into an app to add face data from users.

- [Tutorial: Add users to a Face service](../enrollment-overview.md)

## Related content

- [Reference documentation (REST)](https://learn.microsoft.com/rest/api/face/operation-groups)
- [Reference documentation (.NET SDK)](https://aka.ms/azsdk-csharp-face-ref)
