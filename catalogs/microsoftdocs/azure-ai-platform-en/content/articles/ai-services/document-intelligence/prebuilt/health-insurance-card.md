---
title: Health insurance card processing - Document Intelligence 
titleSuffix: Foundry Tools
description: Data extraction and analysis extraction using the health insurance card model
author: laujan
manager: mcleans
ms.service: azure-document-intelligence-foundry-tools
ms.topic: concept-article
ms.date: 08/15/2026
ms.author: lajanuar
monikerRange: 'doc-intel-4.0.0 || >=doc-intel-3.0.0'
---


# Document Intelligence health insurance card model

**Applies to: doc-intel-4.0.0**
**This content applies to:** 🟩 **v4.0** | **Previous versions:** 🟦 [**v3.1 (GA)**](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/prebuilt/health-insurance-card.md?view=doc-intel-3.1.0\&preserve-view=tru) 🟦 [**v3.0 (GA)**](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/prebuilt/health-insurance-card.md?view=doc-intel-3.0.0\&preserve-view=tru)


**Applies to: doc-intel-3.1.0**
**This content applies to:** 🟩 **v3.1 (GA)** | **Latest version:** 🟪 [**v4.0**](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/prebuilt/health-insurance-card.md?view=doc-intel-4.0.0\&preserve-view=true) | **Previous versions:** 🟦 [**v3.0**](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/prebuilt/health-insurance-card.md?view=doc-intel-3.0.0\&preserve-view=true)


**Applies to: doc-intel-3.0.0**
**This content applies to:** 🟩 **v3.0 (GA)** | **Latest versions:** 🟪 [**v4.0**](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/prebuilt/health-insurance-card.md?view=doc-intel-4.0.0\&preserve-view=true) 🟪 [**v3.1 (GA)**](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/prebuilt/health-insurance-card.md?view=doc-intel-3.1.0\&preserve-view=true)


The Document Intelligence health insurance card model combines powerful Optical Character Recognition (OCR) capabilities with deep learning models to analyze and extract key information from US health insurance cards. A health insurance card is a key document for care processing. It can be digitally analyzed for patient onboarding, financial coverage information, cashless payments, and insurance claim processing. The health insurance card model analyzes health card images; extracts key information such as insurer, member, prescription, and group number; and returns a structured JSON representation. Health insurance cards can be presented in various formats and quality including phone-captured images, scanned documents, and digital PDFs.

***Sample health insurance card processed using Document Intelligence Studio***

Screenshot of sample health insurance card processed in the Document Intelligence Studio.

## Development options

**Applies to: doc-intel-4.0.0**


Document Intelligence v4.0: **2024-11-30** (GA) supports the following tools, applications, and libraries:

| Feature | Resources | Model ID |
| --- | --- | --- |
| **Health insurance card model** | &bullet; [**Document Intelligence Studio**](https://formrecognizer.appliedai.azure.com)</br>&bullet;  [**REST API**](https://learn.microsoft.com/rest/api/aiservices/operation-groups?view=rest-aiservices-v4.0%20\(2024-11-30\)\&preserve-view=true)</br>&bullet;  [**C# SDK**](../quickstarts/get-started-sdks-rest-api.md?view=doc-intel-4.0.0&preserve-view=true)</br>&bullet;  [**Python SDK**](../quickstarts/get-started-sdks-rest-api.md?view=doc-intel-4.0.0&preserve-view=true)</br>&bullet;  [**Java SDK**](../quickstarts/get-started-sdks-rest-api.md?view=doc-intel-4.0.0&preserve-view=true)</br>&bullet;  [**JavaScript SDK**](../quickstarts/get-started-sdks-rest-api.md?view=doc-intel-4.0.0&preserve-view=true) | **prebuilt-healthInsuranceCard.us** |


**Applies to: doc-intel-3.1.0**

Document Intelligence v3.1 supports the following tools, applications, and libraries:

| Feature | Resources | Model ID |
| --- | --- | --- |
| **Health insurance card model** | &bullet; [**Document Intelligence Studio**](https://formrecognizer.appliedai.azure.com)</br>&bullet;  [**REST API**](https://learn.microsoft.com/rest/api/aiservices/document-models/analyze-document?view=rest-aiservices-2023-07-31\&preserve-view=true\&tabs=HTTP)</br>&bullet;  [**C# SDK**](../quickstarts/get-started-sdks-rest-api.md?view=doc-intel-3.1.0&preserve-view=true)</br>&bullet;  [**Python SDK**](../quickstarts/get-started-sdks-rest-api.md?view=doc-intel-3.1.0&preserve-view=true)</br>&bullet;  [**Java SDK**](../quickstarts/get-started-sdks-rest-api.md?view=doc-intel-3.1.0&preserve-view=true)</br>&bullet;  [**JavaScript SDK**](../quickstarts/get-started-sdks-rest-api.md?view=doc-intel-3.1.0&preserve-view=true) | **prebuilt-healthInsuranceCard.us** |


**Applies to: doc-intel-3.0.0**

Document Intelligence v3.0 supports the following tools, applications, and libraries:

| Feature | Resources | Model ID |
| --- | --- | --- |
| **Health insurance card model** | &bullet; [**Document Intelligence Studio**](https://formrecognizer.appliedai.azure.com)</br>&bullet;  [**REST API**](https://learn.microsoft.com/rest/api/aiservices/document-models/analyze-document?view=rest-aiservices-v3.0%20\(2022-08-31\)\&preserve-view=true\&tabs=HTTP)</br>&bullet;  [**C# SDK**](../quickstarts/get-started-sdks-rest-api.md?view=doc-intel-3.0.0&preserve-view=true)</br>&bullet;  [**Python SDK**](../quickstarts/get-started-sdks-rest-api.md?view=doc-intel-3.0.0&preserve-view=true)</br>&bullet;  [**Java SDK**](../quickstarts/get-started-sdks-rest-api.md?view=doc-intel-3.0.0&preserve-view=true)</br>&bullet;  [**JavaScript SDK**](../quickstarts/get-started-sdks-rest-api.md?view=doc-intel-3.0.0&preserve-view=true) | **prebuilt-healthInsuranceCard.us** |


## Input requirements

<!-- markdownlint-disable MD041 -->

The following file formats are supported.

| Model | PDF | Image: </br>JPEG/JPG, PNG, BMP, TIFF, HEIF | Office: </br> Word (DOCX), Excel (XLSX), PowerPoint (PPTX), HTML |
| --- | :---: | :---: | :---: |
| Read | ✔ | ✔ | ✔ |
| Layout | ✔ | ✔ | ✔ |
| General&nbsp;document | ✔ | ✔ |  |
| Prebuilt | ✔ | ✔ |  |
| Custom extraction | ✔ | ✔ |  |
| Custom classification | ✔ | ✔ | ✔ |

* **Photos and scans**: For best results, provide one clear photo or high-quality scan per document.
* **PDFs and TIFFs**: For PDFs and TIFFs, up to 2,000 pages can be processed. (With a free-tier subscription, only the first two pages are processed.)
* **File size**: The file size for analyzing documents is 500 MB for the paid (S0) tier and 4 MB for the free (F0) tier.
* **Image dimensions**: The dimensions must be between 50 pixels x 50 pixels and 10,000 pixels x 10,000 pixels.
* **Password locks**: If your PDFs are password-locked, you must remove the lock before submission.
* **Text height**: The minimum height of the text to be extracted is 12 pixels for a 1024 x 768-pixel image. This dimension corresponds to about 8-point text at 150 dots per inch.
* **Custom model training**: The maximum number of pages for training data is 500 for the custom template model and 50,000 for the custom neural model.
* **Custom extraction model training**: The total size of training data is 50 MB for template model and 1 GB for the neural model.
* **Custom classification model training**: The total size of training data is 1 GB with a maximum of 10,000 pages. For 2024-11-30 (GA), the total size of training data is 2 GB with a maximum of 10,000 pages.
* **Office file types (DOCX, XLSX, PPTX)**: The maximum string length limit is 8 million characters.


### Try Document Intelligence Studio

See how data is extracted from health insurance cards using the Document Intelligence Studio. You need the following resources:

* An Azure subscription—you can [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

* A [Document Intelligence instance](https://portal.azure.com/#create/Microsoft.CognitiveServicesFormRecognizer) in the Azure portal. You can use the free pricing tier (`F0`) to try the service. After your resource deploys, select **Go to resource** to get your key and endpoint.

 Screenshot of keys and endpoint location in the Azure portal.

> **Note:**
> Document Intelligence Studio is available with API version v3.0.

1. On the [Document Intelligence Studio home page](https://formrecognizer.appliedai.azure.com/studio), select **Health insurance cards**.

1. You can analyze the sample insurance card document or select the **➕ Add** button to upload your own sample.

1. Select the **Run analysis** button and, if necessary, configure the **Analyze options** :

    Screenshot of Run analysis and Analyze options buttons in the Document Intelligence Studio.

    > 
    > [Try Document Intelligence Studio](https://formrecognizer.appliedai.azure.com/studio/prebuilt?formType=healthInsuranceCard.us).

## Supported languages and locales

For a complete list of supported languages, *see* our [prebuilt model language support](../language-support/prebuilt.md) page.

## Field extraction

For supported document extraction fields, *see* the [health insurance card model schema](https://github.com/Azure-Samples/document-intelligence-code-samples/blob/main/schema/2024-11-30-ga/health-insurance-card.md) page in our GitHub sample repository.

### Migration guide and REST API v3.1

* Follow our [**Document Intelligence v3.1 migration guide**](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/v3-1-migration-guide.md) to learn how to use the v3.1 version in your applications and workflows.

* Explore our [**REST API**](https://learn.microsoft.com/rest/api/aiservices/document-models/analyze-document?view=rest-aiservices-2023-07-31\&preserve-view=true\&tabs=HTTP) to learn more about the v3.1 version and new capabilities.

## Next steps

* Try processing your own forms and documents with the [Document Intelligence Studio](https://formrecognizer.appliedai.azure.com/studio).

* Complete a [Document Intelligence quickstart](../quickstarts/get-started-sdks-rest-api.md?view=doc-intel-3.1.0&preserve-view=true) and get started creating a document processing app in the development language of your choice.
