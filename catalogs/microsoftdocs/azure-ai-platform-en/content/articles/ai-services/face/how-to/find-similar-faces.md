---
title: "Find similar faces using Foundry Tools"
titleSuffix: Foundry Tools
description: Learn how to use the Azure Face service to find similar faces in a set of images, performing face search by image for various applications.
#customer intent: As a developer, I want to find similar faces in images so that I can perform face recognition tasks.
author: PatrickFarley
manager: mcleans

ms.service: azure-vision-foundry-tools
ms.subservice: azure-ai-face
ms.update-cycle: 90-days
ms.topic: how-to
ms.date: 01/30/2026
ms.author: pafarley
feedback_help_link_url: https://learn.microsoft.com/answers/tags/156/azure-face
---

# Find similar faces


> **Caution:**
> Face service access is limited based on eligibility and usage criteria in order to support our Responsible AI principles. Face service is only available to Microsoft managed customers and partners. Use the [Face Recognition intake form](https://aka.ms/facerecognition) to apply for access. For more information, see the [Face limited access](https://learn.microsoft.com/azure/ai-foundry/responsible-ai/computer-vision/limited-access-identity) page.


The [Find Similar](https://learn.microsoft.com/rest/api/face/face-recognition-operations/find-similar) operation does face matching between a target face and a set of candidate faces, finding a smaller set of faces that look similar to the target face. This is useful for doing a face search by image.

This guide demonstrates how to use the Find Similar feature in the different language SDKs. The following sample code assumes you have already authenticated a Face client object. For details on how to do this, follow a [quickstart](../quickstarts-sdk/identity-client-library.md).


## Detect faces for comparison

You need to detect faces in images before you can compare them. In this guide, the following remote image, called *findsimilar.jpg*, will be used as the source:

Photo of a man who is smiling. 

#### [C#](#tab/csharp)

This guide uses remote images that are accessed by URL. Save a reference to the base URL string. All of the images accessed in this guide are located at that URL path.

```csharp
string baseUrl = "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-sample-data-files/master/Face/images/";
```

The following face detection method is optimized for comparison operations. It doesn't extract detailed face attributes, and it uses an optimized recognition model.

[Code reference unavailable in this source snapshot: ~/cognitive-services-quickstart-code/dotnet/Face/FindSimilar.cs?name=snippet_face_detect_recognize](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/face/how-to/find-similar-faces.md)

The following code uses the above method to get face data from a series of images.

[Code reference unavailable in this source snapshot: ~/cognitive-services-quickstart-code/dotnet/Face/FindSimilar.cs?name=snippet_loadfaces](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/face/how-to/find-similar-faces.md)


#### [REST API](#tab/rest)

Copy the following cURL command and insert your key and endpoint where appropriate. Then run the command to detect one of the target faces.

[Code reference unavailable in this source snapshot: ~/cognitive-services-quickstart-code/curl/face/detect.sh](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/face/how-to/find-similar-faces.md)

Find the `"faceId"` value in the JSON response and save it to a temporary location. Then, call the above command again for these other image URLs, and save their face IDs as well. You'll use these IDs as the target group of faces from which to find a similar face.

[Code reference unavailable in this source snapshot: ~/cognitive-services-quickstart-code/curl/face/detect.sh](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/face/how-to/find-similar-faces.md)

Finally, detect the single source face that you'll use for matching, and save its ID. Keep this ID separate from the others.

[Code reference unavailable in this source snapshot: ~/cognitive-services-quickstart-code/curl/face/detect.sh](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/face/how-to/find-similar-faces.md)

---

## Find and print matches

In this guide, the face detected in the *Family1-Dad1.jpg* image should be returned as the face that's similar to the source image face.

Photo of a man who is smiling; this is the same person as the previous image.

#### [C#](#tab/csharp)

The following code calls the Find Similar API on the saved list of faces.

[Code reference unavailable in this source snapshot: ~/cognitive-services-quickstart-code/dotnet/Face/FindSimilar.cs?name=snippet_find_similar](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/face/how-to/find-similar-faces.md)

The following code prints the match details to the console:

[Code reference unavailable in this source snapshot: ~/cognitive-services-quickstart-code/dotnet/Face/FindSimilar.cs?name=snippet_find_similar_print](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/face/how-to/find-similar-faces.md)


#### [REST API](#tab/rest)

Copy the following cURL command and insert your key and endpoint where appropriate.

[Code reference unavailable in this source snapshot: ~/cognitive-services-quickstart-code/curl/face/detect.sh](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/face/how-to/find-similar-faces.md)

Paste in the following JSON content for the `body` value:

[Code reference unavailable in this source snapshot: ~/cognitive-services-quickstart-code/curl/face/detect.sh](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/face/how-to/find-similar-faces.md)

Then, copy over the source face ID value to the `"faceId"` field. Then copy the other face IDs, separated by commas, as terms in the `"faceIds"` array.

Run the command, and the returned JSON should show the correct face ID as a similar match.

---

## Next step

In this guide, you learned how to call the Find Similar API to do a face search by similarity in a larger group of faces. Next, learn more about the different recognition models available for face comparison operations.

> 
> [Specify a face recognition model](specify-recognition-model.md)
