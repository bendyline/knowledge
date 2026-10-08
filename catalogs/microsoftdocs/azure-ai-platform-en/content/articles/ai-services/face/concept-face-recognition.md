---
title: "Face recognition - Face"
titleSuffix: Foundry Tools
description: Learn the concept of Face recognition, its operations, and data structures, including PersonGroup creation, identification, and verification.
author: PatrickFarley
manager: mcleans

ms.service: azure-vision-foundry-tools
ms.subservice: azure-ai-face
ms.update-cycle: 90-days
ms.topic: concept-article
ms.date: 01/30/2026
ms.author: pafarley
feedback_help_link_url: https://learn.microsoft.com/answers/tags/156/azure-face
---

# Face recognition

This article explains the concept of Face recognition, its related operations, and the underlying data structures. Broadly, face recognition is the process of verifying or identifying individuals by their faces. Face recognition is important in implementing the identification scenario, which enterprises and apps can use to verify that a (remote) user is who they claim to be.


## Face recognition operations


> **Caution:**
> Face service access is limited based on eligibility and usage criteria in order to support our Responsible AI principles. Face service is only available to Microsoft managed customers and partners. Use the [Face Recognition intake form](https://aka.ms/facerecognition) to apply for access. For more information, see the [Face limited access](https://learn.microsoft.com/azure/ai-foundry/responsible-ai/computer-vision/limited-access-identity) page.


### PersonGroup creation and training

You need to create a [PersonGroup](https://learn.microsoft.com/rest/api/face/person-group-operations/create-person-group) or [LargePersonGroup](https://learn.microsoft.com/rest/api/face/person-group-operations/create-large-person-group) to store the set of people to match against. PersonGroups hold [Person](https://learn.microsoft.com/rest/api/face/person-group-operations/create-person-group-person) objects, which each represent an individual person and hold a set of face data belonging to that person.

The [Train](https://learn.microsoft.com/rest/api/face/person-group-operations/train-person-group) operation prepares the data set to be used in face data comparisons.

### Identification

The [Identify](https://learn.microsoft.com/rest/api/face/face-recognition-operations/identify-from-large-person-group) operation takes one or several source face IDs (from a DetectedFace or PersistedFace object) and a PersonGroup or LargePersonGroup. It returns a list of the Person objects that each source face might belong to. Returned Person objects are wrapped as Candidate objects, which have a prediction confidence value.

### Verification

The [Verify](https://learn.microsoft.com/rest/api/face/face-recognition-operations/verify-face-to-face) operation takes a single face ID (from a DetectedFace or PersistedFace object) and a Person object. It determines whether the face belongs to that same person. Verification is one-to-one matching and can be used as a final check on the results from the Identify API call. However, you can optionally pass in the PersonGroup to which the candidate Person belongs to improve the API performance.

## Related data structures

The recognition operations use mainly the following data structures. These objects are stored in the cloud and can be referenced by their ID strings. ID strings are always unique within a subscription, but name fields may be duplicated.

See the [Face recognition data structures](concept-face-recognition-data-structures.md) guide.

## Input requirements

Use the following tips to ensure that your input images give the most accurate recognition results:


* The supported input image formats are JPEG, PNG, GIF (the first frame), BMP. 
* The image file size should be no larger than 6 MB.


* Some faces might not be recognized because of photo composition, such as:
  * Images with extreme lighting, for example, severe backlighting.
  * Obstructions that block one or both eyes.
  * Differences in hair type or facial hair.
  * Changes in facial appearance because of age.
  * Extreme facial expressions.

* You can use the `qualityForRecognition` attribute in the [face detection](how-to/identity-detect-faces.md) operation when using applicable detection models as a general guideline of whether the image is likely of sufficient quality to attempt face recognition on. Only `"high"` quality images are recommended for person enrollment and quality at or above `"medium"` is recommended for identification scenarios.

## Next step

Now that you're familiar with face recognition concepts, Write a script that identifies faces against a trained PersonGroup.

> 
> [Face quickstart](quickstarts-sdk/identity-client-library.md)
