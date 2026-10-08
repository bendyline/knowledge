---
title: What is the Azure Face service?
titleSuffix: Foundry Tools
description: The Azure Face service provides AI algorithms that you use to detect, recognize, and analyze human faces in images.
author: PatrickFarley
manager: mcleans

ms.service: azure-vision-foundry-tools
ms.subservice: azure-ai-face
ms.update-cycle: 90-days
ms.topic: overview
ms.date: 03/23/2026
ai-usage: ai-assisted
ms.author: pafarley
keywords: facial recognition, facial recognition software, facial analysis, face matching, face recognition app, face search by image, facial recognition search
feedback_help_link_url: https://learn.microsoft.com/answers/tags/156/azure-face
#Customer intent: As the developer of an app that deals with images of humans, I want to learn what the Face service does so I can determine if I should use its features.
---

# What is the Azure Face service?

The Azure Face service provides AI algorithms that detect, recognize, and analyze human faces in images. Facial recognition software is important in many scenarios, such as identification, touchless access control, and automatic face blurring for privacy.


> **Caution:**
> Face service access is limited based on eligibility and usage criteria in order to support our Responsible AI principles. Face service is only available to Microsoft managed customers and partners. Use the [Face Recognition intake form](https://aka.ms/facerecognition) to apply for access. For more information, see the [Face limited access](https://learn.microsoft.com/azure/ai-foundry/responsible-ai/computer-vision/limited-access-identity) page.



> **Important:**
> If you're using Microsoft products or services to process Biometric Data, you're responsible for: (i) providing notice to data subjects, including with respect to retention periods and destruction; (ii) obtaining consent from data subjects; and (iii) deleting the Biometric Data, all as appropriate and required under applicable Data Protection Requirements. For related information, see [Data and Privacy for Face](https://learn.microsoft.com/azure/ai-foundry/responsible-ai/face/data-privacy-security).


You can use the Face service through a client library SDK or by calling the REST API directly. Follow the quickstart to get started.

> 
> [Quickstart](quickstarts-sdk/identity-client-library.md)

Or, you can try out the capabilities of Face service quickly and easily in your browser using Vision Studio.

> 
> [Try Vision Studio for Face](https://portal.vision.cognitive.azure.com/gallery/face)



This documentation contains the following types of articles:
* The [quickstarts](quickstarts-sdk/identity-client-library.md) are step-by-step instructions that let you make calls to the service and get results in a short period of time. 
* The [how-to guides](how-to/identity-detect-faces.md) contain instructions for using the service in more specific or customized ways.
* The [conceptual articles](concept-face-detection.md) provide in-depth explanations of the service's functionality and features.
* The [tutorials](tutorials/liveness.md) are longer guides that show you how to use this service as a component in broader business solutions.

For a more structured approach, follow a Training module for Face.
* [Detect and analyze faces with the Face service](https://learn.microsoft.com/training/modules/detect-analyze-faces/)

## Example use cases

The following are common use cases for the Face service:

- **Verify user identity**: Verify a person against a trusted face image. This verification can grant access to digital or physical properties such as a bank account or a building. The trusted face image can come from a government-issued ID such as a passport or driver’s license, or from an enrollment photo taken in person. During verification, liveness detection plays a critical role in confirming that the image comes from a real person, not a printed photo or mask. For more details on verification with liveness, see the [liveness tutorial](tutorials/liveness.md). For identity verification without liveness, follow the [quickstart](quickstarts-sdk/identity-client-library.md).
- **Liveness detection**: Liveness detection is an anti-spoofing feature that checks whether a user is physically present in front of the camera. It's used to prevent spoofing attacks using a printed photo, recorded video, or a 3D mask of the user's face. [Liveness tutorial](tutorials/liveness.md)
- **Touchless access control**: Compared to today’s methods like cards or tickets, opt-in face identification enables an enhanced access control experience while reducing the hygiene and security risks from card sharing, loss, or theft. Facial recognition assists the check-in process with a human in the loop for check-ins in airports, stadiums, theme parks, buildings, reception kiosks at offices, hospitals, gyms, clubs, or schools.

- **Face redaction**: Redact or blur detected faces of people recorded in a video to protect their privacy.

See the [customer checkin management](https://github.com/Azure-Samples/azure-ai-vision/tree/main/face/Scenario-CustomerCheckinManagement) and [face photo tagging](https://github.com/Azure-Samples/azure-ai-vision/tree/main/face/Scenario-FacePhotoTagging) scenarios on GitHub for working examples of facial recognition technology.

> **Warning:**
> On June 11, 2020, Microsoft announced that it will not sell facial recognition technology to police departments in the United States until strong regulation, grounded in human rights, has been enacted. As such, customers may not use facial recognition features or functionality included in Azure Services, such as Face or Video Indexer, if a customer is, or is allowing use of such services by or for, a police department in the United States. When you create a new Face resource, you must acknowledge and agree in the Azure portal that you will not use the service by or for a police department in the United States and that you have reviewed the Responsible AI documentation and will use this service in accordance with it.

## Face detection and analysis

Face detection is required as a first step in all the other scenarios. The Detect API detects human faces in an image and returns the rectangle coordinates of their locations. It also returns a unique ID that represents the stored face data. This is used in later operations to identify or verify faces.

Optionally, face detection can extract a set of face-related attributes, such as head pose, age, emotion, facial hair, and glasses. These attributes are general predictions, not actual classifications. Some attributes are useful to ensure that your application is getting high-quality face data when users add themselves to a Face service. For example, your application could advise users to take off their sunglasses if they're wearing sunglasses.


> **Caution:**
> Microsoft has retired or limited facial recognition capabilities that can be used to try to infer emotional states and identity attributes, which, if misused, can subject people to stereotyping, discrimination, or unfair denial of services. The retired capabilities are emotion and gender. The limited capabilities are age, smile, facial hair, hair and makeup. Email [Azure Face team](mailto:azureface@microsoft.com) if you have a responsible use case that would benefit from the use of any of the limited capabilities. Read more about this decision [here](https://azure.microsoft.com/blog/responsible-ai-investments-and-safeguards-for-facial-recognition/).

For more information on face detection and analysis, see the [Face detection](concept-face-detection.md) concepts article. Also see the [Detect API](https://learn.microsoft.com/rest/api/face/face-detection-operations/detect) reference documentation.

You can try out Face detection quickly and easily in your browser using Vision Studio.

> 
> [Try Vision Studio for Face](https://portal.vision.cognitive.azure.com/gallery/face)

## Liveness detection


> **Important:**
> The Face client SDKs for liveness are a gated feature. You must request access to the liveness feature by filling out the [Face Recognition intake form](https://aka.ms/facerecognition). When your Azure subscription is granted access, you can download the Face liveness SDK. 


Face Liveness detection determines whether a face in an input video stream is real (live) or fake (spoof). It's a crucial building block in a biometric authentication system to prevent spoofing attacks from imposters trying to gain access to the system using a photograph, video, mask, or other means to impersonate another person.

The goal of liveness detection is to ensure that the system is interacting with a physically present live person at the time of authentication. Such systems have become increasingly important with the rise of digital finance, remote access control, and online identity verification processes.

The liveness detection solution successfully defends against a variety of spoof types ranging from paper printouts, 2D/3D masks, and spoof presentations on phones and laptops. Liveness detection is an active area of research, with continuous improvements made to counteract increasingly sophisticated spoofing attacks. Updates are continuously rolled out to the client and service components as the overall solution becomes more robust to new types of attacks.

The liveness detection solution achieved a 0% penetration rate in [iBeta Level 1 and Level 2 Presentation Attack Detection (PAD) tests](https://servicetrust.microsoft.com/DocumentPage/ea3fa18f-3940-4c0b-aa96-41cb50898aee), conducted by a NIST/NVLAP-accredited laboratory and conformant to the [ISO/IEC 30107-3 PAD international standard](https://www.iso.org/standard/79520.html).

Tutorials
- [Face liveness Tutorial](tutorials/liveness.md)
Concepts
- [Abuse monitoring](concept-liveness-abuse-monitoring.md)

Face liveness SDK reference docs:
- [Java (Android)](https://github.com/Azure/azure-sdk-for-java/blob/main/sdk/vision/azure-ai-vision-imageanalysis/src/samples/README.md)
- [Swift (iOS)](https://aka.ms/liveness-sdk-ios)
- [JavaScript (Web)](https://aka.ms/liveness-sdk-web)

## Face recognition operations

Modern enterprises and apps can use the Face recognition technologies, including Face verification ("one-to-one" matching) and Face identification ("one-to-many" matching) to confirm that a user is who they claim to be.


### Identification

Face identification can address "one-to-many" matching of one face in an image to a set of faces in a secure repository. Match candidates are returned based on how closely their face data matches the query face. This scenario is used in granting building or airport access to a certain group of people or verifying the user of a device.

The following image shows an example of a database named `"myfriends"`. Each group can contain up to 1 million different person objects. Each person object can have up to 248 faces registered.

A grid with three columns for different people, each with three rows of face images

After you create and train a group, you can do identification against the group with a new detected face. If the face is identified as a person in the group, the person object is returned.

### Verification

The verification operation answers the question, "Do these two faces belong to the same person?". 

Verification is also a "one-to-one" matching of a face in an image to a single face from a secure repository or photo to verify that they're the same individual. Verification can be used for access control, such as a banking app that enables users to open a credit account remotely by taking a new picture of themselves and sending it with a picture of their photo ID. It can also be used as a final check on the results of an Identification API call.

For more information about Face recognition, see the [Facial recognition](concept-face-recognition.md) concepts guide or the [Identify](https://learn.microsoft.com/rest/api/face/face-recognition-operations/identify-from-large-person-group) and [Verify](https://learn.microsoft.com/rest/api/face/face-recognition-operations/verify-face-to-face) API reference documentation.


## Find similar faces

The Find Similar operation does face matching between a target face and a set of candidate faces, finding a smaller set of faces that look similar to the target face. This is useful for doing a face search by image. 

The service supports two working modes, **matchPerson** and **matchFace**. The **matchPerson** mode returns similar faces after filtering for the same person by using the [Verify API](https://learn.microsoft.com/rest/api/face/face-recognition-operations/verify-face-to-face). The **matchFace** mode ignores the same-person filter. It returns a list of similar candidate faces that might or might not belong to the same person.

The following example shows the target face:

A woman smiling

And these images are the candidate faces:

Five images of people smiling. Images A and B show the same person.

To find four similar faces, the **matchPerson** mode returns A and B, which show the same person as the target face. The **matchFace** mode returns A, B, C, and D, which is exactly four candidates, even if some aren't the same person as the target or have low similarity. For more information, see the [Find Similar API](https://learn.microsoft.com/rest/api/face/face-recognition-operations/find-similar) reference documentation.

## Group faces

The Group operation divides a set of unknown faces into several smaller groups based on similarity. Each group is a disjoint proper subset of the original set of faces. It also returns a single `messyGroup` array that contains the face IDs for which no similarities were found.

All of the faces in a returned group are likely to belong to the same person, but there can be several different groups for a single person. Those groups are differentiated by another factor, such as expression, for example. For more information, see the [Group API](https://learn.microsoft.com/rest/api/face/face-recognition-operations/group) reference documentation.

## Input requirements

General image input requirements:

* The supported input image formats are JPEG, PNG, GIF (the first frame), BMP. 
* The image file size should be no larger than 6 MB.


Input requirements for face detection:

* The minimum detectable face size is 36 x 36 pixels in an image that is no larger than 1920 x 1,080 pixels. Images with larger than 1920 x 1,080 pixels have a proportionally larger minimum face size. Reducing the face size might cause some faces not to be detected, even if they're larger than the minimum detectable face size.
* The maximum detectable face size is 4096 x 4,096 pixels.
* Faces outside the size range of 36 x 36 to 4096 x 4,096 pixels won't be detected.


Input requirements for face recognition:

* Some faces might not be recognized because of photo composition, such as:
  * Images with extreme lighting, for example, severe backlighting.
  * Obstructions that block one or both eyes.
  * Differences in hair type or facial hair.
  * Changes in facial appearance because of age.
  * Extreme facial expressions.


Input requirements for face verification:

- Photo is clear and sharp—not blurry, pixelated, distorted, or damaged.
- Photo is not altered to remove face blemishes or alter face appearance.
- Photo must be in an RGB color supported format (JPEG, PNG, WEBP, BMP). Recommended Face size is 200 px x 200 px. Face sizes larger than 200x200 won't result in better AI quality. Image files must not be larger than 6 MB in size.
- User isn't wearing glasses, masks, hats, headphones, head coverings, or face coverings. Face should be free of any obstructions.
- Facial jewelry is allowed provided it doesn't hide the face.
- Only one face should be visible in the photo.
- Face should be in a neutral front-facing pose with both eyes open, mouth closed, with no extreme facial expressions or head tilt.
- Face should be free of any shadows or red-eye. Retake photo if either of these features appear.
- Background should be uniform and plain, free of any shadows.
- Face should be centered within the image and fill at least 50% of the image.

## Data privacy and security

As with all Foundry Tools resources, you must be aware of Microsoft's policies on customer data when using the Face service. For more information, see the [Foundry Tools page](https://www.microsoft.com/trustcenter/cloudservices/cognitiveservices) on the Microsoft Trust Center.

## Next step

Follow a quickstart to code the basic components of a face recognition app in the language of your choice.

> 
> [Quickstart](quickstarts-sdk/identity-client-library.md)
