---
title: Healthcare AI models in Microsoft Foundry
titleSuffix: Microsoft Foundry
description: Healthcare AI models in Microsoft Foundry for medical imaging workflows, available as pay-as-you-go serverless endpoints.
ms.service: microsoft-foundry
ms.subservice: foundry-model-inference
ms.topic: concept-article
ms.date: 06/10/2026
ms.reviewer: mehmetoez
reviewer: mertoezdev
ms.author: mopeakande
author: msakande
ms.custom: dev-focus
ai-usage: ai-assisted
---

# Foundation models for healthcare AI


> **Important:**
> The healthcare AI models marked (preview) in this article are currently in *limited preview*. These models are intended and provided as-is for research and model development exploration. The healthcare AI models are not designed or intended to be deployed in clinical settings as-is. They are not intended for use in the diagnosis or treatment of any health or medical condition, and the individual models' performances for such purposes have not been established. 
>
> You bear sole responsibility and liability for any use of the healthcare AI models, including verification of outputs and incorporation into any product or service intended for a medical purpose or to inform clinical decision-making, compliance with applicable healthcare laws and regulations, and obtaining any necessary clearances or approvals.



This article introduces healthcare AI foundation models available in the Microsoft Foundry multimodal model catalog. Microsoft Research, strategic partners, and leading healthcare institutions developed these models to help healthcare organizations rapidly build and deploy AI solutions for medical imaging, genomics, clinical records, and biomedical research. You can use these models to build, test and deploy AI solutions tailored to your specific needs while minimizing the extensive compute and data requirements typically associated with building multimodal models from scratch. These models aren't designed to serve as standalone products. Instead, developers can use them as a foundation to build upon. With these healthcare AI models, you have the tools you need to harness the full potential of AI to enhance biomedical research, clinical workflows, and ultimately care delivery.

The power of artificial intelligence (AI) is driving a transformation in healthcare. Agentic AI capabilities can help with clinical text workflows and multimodal reasoning, but specialized healthcare modalities still require purpose-built models. These modalities include medical imaging (radiology, pathology, and ophthalmology), longitudinal clinical records, signal data, genomic data, and protein data.

Animation showing healthcare AI models connecting different data modalities including imaging, genomics, and clinical records for discovery, development, and delivery.

The Foundry model catalog, available in [Foundry](../../concepts/foundry-models-overview.md) and [Azure Machine Learning studio](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/concept-model-catalog.md), provides healthcare foundation models that let you analyze various medical data types with AI. These AI models expand well beyond medical text comprehension into multimodal reasoning about medical data. They can integrate and analyze data from diverse sources that come in various modalities. For example, medical imaging, genomics, clinical records, and other structured and unstructured data sources. The models also span several healthcare fields, including dermatology, ophthalmology, radiology, pathology, and more.

## Premium healthcare AI models in Microsoft Foundry

Microsoft offers closed-weight, serverless premium models on Foundry that give healthcare organizations enterprise-grade medical imaging AI designed to support, *never replace*, qualified professionals. The models extend our open-source healthcare industry portfolio and are packaged for hospitals, ISVs, and partners who need higher-accuracy outputs, trusted Azure infrastructure, and predictable per-image economics, while keeping a human firmly in the loop on every clinically meaningful decision.

Premium healthcare AI models are **available for deployment as pay-as-you-go serverless endpoints** in Foundry. Microsoft manages the infrastructure, so you can focus on integrating models into your medical imaging workflows without provisioning or managing compute resources. The following sections cover the available premium healthcare AI models.

> **Note:**
> For foundation models available as managed compute deployments, see [Foundation models for healthcare AI (classic)](../../../foundry-classic/how-to/healthcare-ai/healthcare-ai-models.md).

### MedImageInsight Premium (preview)

MedImageInsight Premium (preview) is an embedding model for medical imaging that supports classification, similarity search, and image-text inference across radiology, pathology, ophthalmology, and dermatology. The model supports responsible AI (RAI) workflows, including out-of-distribution/outlier detection and drift monitoring, when you implement these controls in your application and monitoring pipeline. To learn about this model, see [Deploy and use MedImageInsight Premium (preview)](deploy-medimageinsight-premium.md).

### CxrReportGen Premium (preview)

CxrReportGen Premium (preview) is a multimodal model that generates structured draft findings from chest X-rays, incorporating current and prior images along with key patient information.  To learn about this model, see [CxrReportGen Premium (preview)](deploy-cxrreportgen-premium.md).

Both premium models are assistive only; all outputs require human review before clinical use.

## Partner models


The model catalog also includes healthcare models from Microsoft partners for scenarios such as digital pathology slide analysis, biomedical research, and medical knowledge sharing. Tempus and Providence Healthcare provide models in this collection. For a complete list, see the [model catalog page](https://aka.ms/healthcaremodelstudio).

## Related content

- [Healthcare AI examples (GitHub)](https://aka.ms/HealthcareAIExamples)
- [Model catalog and collections in Foundry portal](../../concepts/foundry-models-overview.md)
- [Deploy Microsoft Foundry Models in the Foundry portal](../../foundry-models/how-to/deploy-foundry-models.md)
- [Foundation models for healthcare AI (Open-Source)](../../../foundry-classic/how-to/healthcare-ai/healthcare-ai-models.md)
