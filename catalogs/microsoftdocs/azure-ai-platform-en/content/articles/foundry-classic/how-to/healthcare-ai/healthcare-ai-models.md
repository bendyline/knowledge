---
title: "Healthcare AI foundation models (classic)"
description: "Explore healthcare AI foundation models in Microsoft Foundry for medical imaging, genomics, and clinical data analysis. Deploy multimodal AI models to build healthcare solutions. (classic)"
ms.service: microsoft-foundry
ms.subservice: foundry-models
ms.topic: concept-article
ms.date: 01/23/2026
ms.reviewer: itarapov
reviewer: ivantarapov
ms.author: mopeakande
manager: mcleans
author: msakande

#Customer intent: As a Data Scientist I want to learn what offerings are available within Health and Life Sciences AI Model offerings so that I can use them as the basis for my own AI solutions
---

# Foundation models for healthcare AI (classic)


**Applies only to:**  **Foundry (classic) portal**. This article isn't available for the new Foundry portal. [Learn more about the new portal](../../../foundry/what-is-foundry.md).


> **Note:**
> Links in this article might open content in the new Microsoft Foundry documentation instead of the Foundry (classic) documentation you're viewing now.




> **Important:**
> The healthcare AI models are intended and provided as-is for research and model development exploration. The healthcare AI models are not designed or intended to be deployed in clinical settings as-is.  They are not intended for use in the diagnosis or treatment of any health or medical condition, and the individual models' performances for such purposes have not been established. You bear sole responsibility and liability for any use of the healthcare AI models, including verification of outputs and incorporation into any product or service intended for a medical purpose or to inform clinical decision-making, compliance with applicable healthcare laws and regulations, and obtaining any necessary clearances or approvals.



This article introduces healthcare AI foundation models available in the Microsoft Foundry multimodal model catalog. Microsoft Research, strategic partners, and leading healthcare institutions developed these models to help healthcare organizations rapidly build and deploy AI solutions for medical imaging, genomics, clinical records, and biomedical research. You can use these models to build, test and deploy AI solutions tailored to your specific needs while minimizing the extensive compute and data requirements typically associated with building multimodal models from scratch. These models aren't designed to serve as standalone products. Instead, developers can use them as a foundation to build upon. With these healthcare AI models, you have the tools you need to harness the full potential of AI to enhance biomedical research, clinical workflows, and ultimately care delivery.

The power of artificial intelligence (AI) is driving a transformation in healthcare. Agentic AI capabilities can help with clinical text workflows and multimodal reasoning, but specialized healthcare modalities still require purpose-built models. These modalities include medical imaging (radiology, pathology, and ophthalmology), longitudinal clinical records, signal data, genomic data, and protein data.

Animation showing healthcare AI models connecting different data modalities including imaging, genomics, and clinical records for discovery, development, and delivery.

The Foundry model catalog, available in [Foundry](../../../foundry/concepts/foundry-models-overview.md) and [Azure Machine Learning studio](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/concept-model-catalog.md), provides healthcare foundation models that let you analyze various medical data types with AI. These AI models expand well beyond medical text comprehension into multimodal reasoning about medical data. They can integrate and analyze data from diverse sources that come in various modalities. For example, medical imaging, genomics, clinical records, and other structured and unstructured data sources. The models also span several healthcare fields, including dermatology, ophthalmology, radiology, pathology, and more.

## Microsoft first-party models

These models are Microsoft's first-party multimodal healthcare foundation models.

#### [MedImageInsight](deploy-medimageinsight.md)
This model is an embedding model that enables sophisticated image analysis, including classification and similarity search in medical imaging. Researchers can use the model embeddings in simple zero-shot classifiers. They can also build adapters for their specific tasks, thereby streamlining workflows in radiology, pathology, ophthalmology, dermatology, and other modalities. For example, researchers can use the model to build tools that automatically route imaging scans to specialists or flag potential abnormalities for further review. These actions boost efficiency and improve patient outcomes. The model also supports Responsible AI (RAI) safeguards, such as out-of-distribution (OOD) detection and drift monitoring. These safeguards maintain the stability and reliability of AI tools and data pipelines in dynamic medical imaging environments.  

#### [CXRReportGen](deploy-cxrreportgen.md)
Chest X-rays are the most common radiology procedure worldwide. They help doctors diagnose a wide range of conditions—lung infections, heart problems, and more. For millions of people, these images are often the first step in detecting health issues. This multimodal AI model incorporates current and prior images, along with key patient information, to generate detailed, structured reports from chest X-rays. The reports highlight AI-generated findings based directly on the images to align with human-in-the-loop workflows. Researchers can test this capability and its potential to speed up turnaround times while enhancing the diagnostic precision of radiologists.

#### [MedImageParse and MedImageParse 3D](deploy-medimageparse.md)
These models are designed for precise image segmentation and cover different imaging modalities, including X-rays, CT scans, MRIs, ultrasounds, dermatology images, and pathology slides. You can fine-tune the models for specific applications, such as tumor segmentation or organ delineation. This allows you to test and validate the model and build tools that use AI for highly sophisticated medical image analysis.

## Partner models


The model catalog also includes healthcare models from Microsoft partners for scenarios such as digital pathology slide analysis, biomedical research, and medical knowledge sharing. Tempus and Providence Healthcare provide models in this collection. For a complete list, see the [model catalog page](https://aka.ms/healthcaremodelstudio).

## Related content

- [Model catalog and collections in Foundry portal](../../concepts/foundry-models-overview.md)
- [How to deploy and inference a managed compute deployment with code](../deploy-models-managed.md)
- [Overview: Deploy models, flows, and web apps with Foundry](../../concepts/deployments-overview.md)
