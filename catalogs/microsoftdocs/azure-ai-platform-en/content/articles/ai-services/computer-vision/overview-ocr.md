---
title: OCR - Optical Character Recognition
titleSuffix: Foundry Tools
description: Learn how the optical character recognition (OCR) services extract print and handwritten text from images and documents in global languages.
author: PatrickFarley
manager: mcleans

ms.service: azure-vision-foundry-tools
ms.topic: overview
ms.date: 11/21/2025
ms.author: pafarley
ms.custom: devx-track-csharp
---

# OCR - Optical Character Recognition

> **Warning:**
> We don't recommend using this service, including the Azure Vision in Foundry Tools [legacy OCR API v3.2](https://learn.microsoft.com/rest/api/computervision/recognize-printed-text?view=rest-computervision-v3.2\&preserve-view=true) and [RecognizeText API v2.1](https://learn.microsoft.com/rest/api/computervision/recognize-printed-text/recognize-printed-text?view=rest-computervision-v2.1\&preserve-view=true).


## OCR (Read) editions

> **Important:**
> Select the Read edition that best fits your requirements.
>
> | Input | Examples | Read edition | Benefit |
> | --- | --- | --- | --- |
> | **Images**: General, in-the-wild images | labels, street signs, and posters | [OCR for images (version 4.0)](concept-ocr.md) | Optimized for general, non-document images with a performance-enhanced synchronous API that makes it easier to embed OCR in your user experience scenarios. |
> | **Documents**: Digital and scanned, including images | books, articles, and reports | [Document Intelligence read model](../document-intelligence/prebuilt/read.md) | Optimized for text-heavy scanned and digital documents with an asynchronous API to help automate intelligent document processing at scale. |
>
> **About Azure Vision v3.2 GA Read**
>
> Looking for the most recent Azure Vision v3.2 GA Read? All future Read OCR enhancements are part of the two services listed previously. There are no further updates to Azure Vision v3.2. For more information, see [Call Azure Vision 3.2 GA Read API](how-to/call-read-api.md) and [Quickstart: Azure Vision v3.2 GA Read](quickstarts-sdk/client-library.md).



OCR or Optical Character Recognition is also referred to as text recognition or text extraction. Machine-learning-based OCR techniques allow you to extract printed or handwritten text from images such as posters, street signs, and product labels, as well as from documents like articles, reports, forms, and invoices. The text is typically extracted as words, text lines, and paragraphs or text blocks, enabling access to digital version of the scanned text. This capability eliminates or significantly reduces the need for manual data entry.



## OCR engine

Microsoft's **Read** OCR engine uses multiple advanced machine-learning models that support [global languages](language-support.md). It extracts printed and handwritten text, including mixed languages and writing styles. You can use **Read** as a cloud service or as an on-premises container for flexible deployment. It's also available as a synchronous API for single, non-document, image-only scenarios with performance enhancements that simplify implementing OCR-assisted user experiences.




## How is OCR related to Intelligent Document Processing (IDP)?

Intelligent Document Processing (IDP) uses OCR as its foundational technology to extract structure, relationships, key-values, entities, and other document-centric insights with an advanced machine-learning based AI service  like [Document Intelligence](../document-intelligence/overview.md). Document Intelligence includes a document-optimized version of **Read** as its OCR engine while delegating to other models for higher-end insights. If you're extracting text from scanned and digital documents, use [Document Intelligence Read OCR](../document-intelligence/prebuilt/read.md).



## OCR supported languages

Both **Read** versions available today in Azure Vision support several languages for printed and handwritten text. OCR for printed text supports English, French, German, Italian, Portuguese, Spanish, Chinese, Japanese, Korean, Russian, Arabic, Hindi, and other international languages that use Latin, Cyrillic, Arabic, and Devanagari scripts. OCR for handwritten text supports English, Chinese Simplified, French, German, Italian, Japanese, Korean, Portuguese, and Spanish languages.

Refer to the full list of [OCR-supported languages](language-support.md#optical-character-recognition-ocr).

## OCR common features

The Read OCR model is available in Azure Vision and Document Intelligence with common baseline capabilities while optimizing for respective scenarios. The following list summarizes the common features:

* Printed and handwritten text extraction in supported languages
* Pages, text lines, and words with location and confidence scores
* Support for mixed languages, mixed mode (print and handwritten)
* Available as Distroless Docker container for on-premises deployment

## Use the OCR cloud APIs or deploy on-premises

Most customers prefer the cloud APIs because they're easy to integrate and offer fast productivity out of the box. Azure and the Azure Vision service handle scale, performance, data security, and compliance needs while you focus on meeting your customers' needs.

For on-premises deployment, the [Read Docker container](computer-vision-how-to-install-containers.md) enables you to deploy the Azure Vision v3.2 generally available OCR capabilities in your own local environment. Containers are great for specific security and data governance requirements.


## Input requirements

The **Read** API takes images and documents as input. The images and documents must meet the following requirements:

* Supported file formats are JPEG, PNG, BMP, PDF, and TIFF.
* For PDF and TIFF files, up to 2,000 pages are processed (only the first two pages for the free tier).
* The file size of images must be less than 500 MB (4 MB for the free tier) with dimensions of at least 50 x 50 pixels and at most 10,000 x 10,000 pixels. PDF files don't have a size limit.
* The minimum height of the text to be extracted is 12 pixels for a 1024 x 768 image, which corresponds to about 8-point font text at 150 DPI.

>**Note:**
> You don't need to crop an image for text lines. Send the whole image to the Read API and it recognizes all texts.

## OCR data privacy and security

As with all of the Foundry Tools, developers using the Azure Vision service should be aware of Microsoft's policies on customer data. See the [Foundry Tools page](https://www.microsoft.com/trustcenter/cloudservices/cognitiveservices) on the Microsoft Trust Center to learn more.

## Next steps

- For OCR with general (non-document) images, try the [Azure Vision 4.0 preview Image Analysis REST API quickstart](concept-ocr.md).
- For OCR with PDF, Office, and HTML documents, as well as document images, start with [Document Intelligence Read](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/concept-read.md).
- For the previous GA version, see the [Azure Vision 3.2 GA SDK or REST API quickstarts](quickstarts-sdk/client-library.md).
