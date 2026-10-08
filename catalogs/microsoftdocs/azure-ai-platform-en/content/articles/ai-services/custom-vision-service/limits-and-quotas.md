---
title: Limits and quotas - Custom Vision Service
titleSuffix: Foundry Tools
description: This article explains the different types of licensing keys and about the limits and quotas for the Custom Vision Service.
author: PatrickFarley
manager: mcleans

ms.service: azure-ai-custom-vision
ms.topic: limits-and-quotas
ms.date: 01/22/2025
ms.author: pafarley
---

# Limits and quotas



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


There are two tiers of subscription to the Custom Vision service. You can sign up for an F0 (free) or S0 (standard) subscription through the Azure portal. This page outlines the limitations of each tier. See the [Custom Vision pricing page](https://azure.microsoft.com/pricing/details/cognitive-services/custom-vision-service/) for more details on pricing and transactions.

| Factor | **F0 (free)** | **S0 (standard)** |
| --- | --- | --- |
| Projects | 2 | 100 |
| Training images per project | 5,000 | 100,000 |
| Predictions / month | 10,000 | Unlimited |
| Tags / project | 50 | 500 |
| Iterations | 20 | 20 |
| Min labeled images per Tag, Classification (50+ recommended) | 5 | 5 |
| Min labeled images per Tag, Object Detection (50+ recommended) | 15 | 15 |
| How long prediction images stored | 30 days | 30 days |
| [Prediction](https://learn.microsoft.com/rest/api/customvision/predictions) operations with storage (Transactions Per Second) | 2 | 10 |
| [Prediction](https://learn.microsoft.com/rest/api/customvision/predictions) operations without storage (Transactions Per Second) | 2 | 20 |
| [TrainProject](https://learn.microsoft.com/rest/api/customvision/train-project/train-project) (API calls Per Second) | 2 | 10 |
| [Other API calls](https://learn.microsoft.com/rest/api/custom-vision) (Transactions Per Second) | 10 | 10 |
| Accepted image types | jpg, png, bmp, gif | jpg, png, bmp, gif |
| Min image height/width in pixels | 256 (see note) | 256 (see note) |
| Max image height/width in pixels | 10,240 | 10,240 |
| Max image size (training image upload) | 6 MB | 6 MB |
| Max image size (prediction) | 4 MB | 4 MB |
| Max number of regions per image (training) (object detection) | 300 | 300 |
| Max number of regions per image (prediction) (object detection) | 200 | 200 |
| Max number of tags per image (classification) | 100 | 100 |

> **Note:**
> Images smaller than 256 pixels will be accepted but upscaled.

> **Note:**
> The image aspect ratio shouldn't be larger than 25:1.
