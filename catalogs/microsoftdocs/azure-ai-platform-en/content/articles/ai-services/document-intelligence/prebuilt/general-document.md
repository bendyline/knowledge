---
title: General key-value extraction - Document Intelligence 
titleSuffix: Foundry Tools
description: Extract key-value pairs, tables, selection marks, and text from your documents with Document Intelligence.
author: laujan
manager: mcleans
ms.service: azure-document-intelligence-foundry-tools
ms.topic: concept-article
ms.date: 08/15/2026
ms.author: lajanuar
ai-usage: ai-assisted
---

<!-- markdownlint-disable MD033 -->

# Document Intelligence general document model

**Applies to: doc-intel-4.0.0**

> **Important:**
> For Document Intelligence versions **v4.0 preview versions** and going forward, the general document model (prebuilt-document) is deprecated. To extract key-value pairs, selection marks, text, tables, and structure from documents, use the following models:
>
>| Feature | version | Model ID |
>| --- | --- | --- |
>| `Layout` model with the optional query string parameter **`features=keyValuePairs`** enabled. | &bullet; v4:2024-11-30</br>&bullet; v3.1:2023-07-31 (GA) | **`prebuilt-layout`** |
>| General document model | &bullet; v3.1:2023-07-31 (GA)</br>&bullet; v3.0:2022-08-31 (GA)</br>&bullet; v2.1 (GA) | **`prebuilt-document`** |
>
> **Note**: Azure AI Document Intelligence v3.0 API (`2022-08-31`) reaches end of support on **March 30, 2029**. Migrate v3.0 workloads to the generally available v4.0 API (`2024-11-30`) before this date. In v4.x, the general document (`prebuilt-document`) capability is replaced by the Layout model with `features=keyValuePairs`. See the [Document Intelligence migration guide](../versioning/migration-guide-overview.md) for guidance.



**Applies to: \>=doc-intel-3.1.0**

**This content applies to:** 🟩 [**v3.1 (GA)**](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/includes?view=doc-intel-3.1.0\&preserve-view=true) | **Previous versions:** 🟥 [**v3.0 (retiring)**](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/includes?view=doc-intel-3.0.0\&preserve-view=true) 🟥 [**v2.1 (retiring)**](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/includes?view=doc-intel-2.1.0\&preserve-view=true)


The General document model combines powerful Optical Character Recognition (OCR) capabilities with deep learning models to extract key-value pairs, tables, and selection marks from documents. General document is available with the v3.1 and v3.0 APIs. For more information, _see_ our [migration guide](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/v3-1-migration-guide.md).



**Applies to: \>=doc-intel-2.1.0**

## General document features

* The general document model is a pretrained model; it doesn't require labels or training.

* A single API extracts key-value pairs, selection marks, text, tables, and structure from documents.

* The general document model supports structured, semi-structured, and unstructured documents.

* Selection marks are identified as fields with a value of `:selected:` or `:unselected:`.

***Sample document processed in the Document Intelligence Studio***

Screenshot of general document analysis in the Document Intelligence Studio.

## Key-value pair extraction

The general document API supports most form types and analyzes your documents and extract keys and associated values. It's ideal for extracting common key-value pairs from documents. You can use the general document model as an alternative to training a custom model without labels.



**Applies to: doc-intel-3.1.0**

## Development options

Document Intelligence v3.1 supports the following tools, applications, and libraries:

| Feature | Resources | Model ID |
| --- | --- | --- |
| **General document model** | &bullet; [**Document Intelligence Studio**](https://formrecognizer.appliedai.azure.com)</br>&bullet;  [**REST API**](https://learn.microsoft.com/rest/api/aiservices/document-models/analyze-document?view=rest-aiservices-2023-07-31\&preserve-view=true\&tabs=HTTP)</br>&bullet;  [**C# SDK**](../quickstarts/get-started-sdks-rest-api.md?view=doc-intel-3.1.0&preserve-view=true)</br>&bullet;  [**Python SDK**](../quickstarts/get-started-sdks-rest-api.md?view=doc-intel-3.1.0&preserve-view=true)</br>&bullet;  [**Java SDK**](../quickstarts/get-started-sdks-rest-api.md?view=doc-intel-3.1.0&preserve-view=true)</br>&bullet;  [**JavaScript SDK**](../quickstarts/get-started-sdks-rest-api.md?view=doc-intel-3.1.0&preserve-view=true) | **prebuilt-document** |


**Applies to: doc-intel-3.0.0**

> **Important:**
>
> Azure Document Intelligence v3.0 API (`2022-08-31`) reaches end of support on **March 30, 2029**. To avoid production disruption, use **Azure Document Intelligence 2024-11-30 v4.0** for all new development, and migrate existing workloads to **Azure Document Intelligence 2024-11-30 v4.0** before this date. For general document extraction in v4.0, use the Layout model (`features=keyValuePairs`). For migration guidance, see the [Document Intelligence migration guide](../versioning/migration-guide-overview.md).

Document Intelligence v3.0 supports the following tools, applications, and libraries:

| Feature | Resources | Model ID |
| --- | --- | --- |
| **General document model** | &bullet; [**Document Intelligence Studio**](https://formrecognizer.appliedai.azure.com)</br>&bullet;  [**REST API**](https://learn.microsoft.com/rest/api/aiservices/document-models/analyze-document?view=rest-aiservices-v3.0%20\(2022-08-31\)\&preserve-view=true\&tabs=HTTP)</br>&bullet;  [**C# SDK**](../quickstarts/get-started-sdks-rest-api.md?view=doc-intel-3.0.0&preserve-view=true)</br>&bullet;  [**Python SDK**](../quickstarts/get-started-sdks-rest-api.md?view=doc-intel-3.0.0&preserve-view=true)</br>&bullet;  [**Java SDK**](../quickstarts/get-started-sdks-rest-api.md?view=doc-intel-3.0.0&preserve-view=true)</br>&bullet;  [**JavaScript SDK**](../quickstarts/get-started-sdks-rest-api.md?view=doc-intel-3.0.0&preserve-view=true) | **prebuilt-document** |


**Applies to: doc-intel-3.1.0 || doc-intel-3.0.0**

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


### General document model data extraction

Try extracting data from forms and documents using the Document Intelligence Studio.

You need the following resources:

* An Azure subscription—you can [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

* A [Document Intelligence instance](https://portal.azure.com/#create/Microsoft.CognitiveServicesFormRecognizer) in the Azure portal. You can use the free pricing tier (`F0`) to try the service. After your resource deploys, select **Go to resource** to get your key and endpoint.

 Screenshot of keys and endpoint location in the Azure portal.

> **Note:**
> Document Intelligence Studio supports v3.0 and v3.1 general document. **Note**: v3.0 retires March 30, 2029. In v4.x, the general document capability is superseded by the Layout model with `features=keyValuePairs`.

1. On the [Document Intelligence Studio home page](https://documentintelligence.ai.azure.com/studio), select **General documents**.

1. You can analyze the sample document or upload your own files.

1. Select the **Run analysis** button and, if necessary, configure the **Analyze options**:

    Screenshot of Run analysis and Analyze options buttons in the Document Intelligence Studio.

    > 
    > [Try Document Intelligence Studio](https://formrecognizer.appliedai.azure.com/studio/prebuilt?formType=document).

## Key-value pairs

Key-value pairs are specific spans within the document that identify a label or key and its associated response or value. In a structured form, these pairs could be the label and the value the user entered for that field. In an unstructured  document, they could be the date a contract was executed on based on the text in a paragraph. The AI model is trained to extract identifiable keys and values based on a wide variety of document types, formats, and structures.

Keys can also exist in isolation when the model detects that a key exists, with no associated value or when processing optional fields. For example, a middle name field can be left blank on a form in some instances. Key-value pairs are spans of text contained in the document. For documents where the same value is described in different ways, for example, customer/user, the associated key is either customer or user (based on context).

## Data extraction

| **Model** | **Text extraction** | **Key-Value pairs** | **Selection Marks** | **Tables** | **Common Names** |
| --- | :---: | :---: | :---: | :---: | :---: |
| General document | ✓ | ✓ | ✓ | ✓ | ✓* |

✓* - Only available in the ``2023-07-31`` (v3.1 GA) and later API versions.

## Supported languages and locales

*See* our [Language Support—document analysis models](../language-support/ocr.md) page for a complete list of supported languages.

## Considerations

* Because keys are spans of text extracted from the document, for semi structured documents, keys need to be mapped to an existing dictionary of keys.

* Expect to see key-value pairs with a key, but no value. For example if a user chose to not provide an email address on the form.



## Next steps

* Follow our [**Document Intelligence v3.1 migration guide**](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/v3-1-migration-guide.md) to learn how to use the v3.1 version in your applications and workflows.

* Migrate v3.0 workloads to v4.0 before **March 30, 2029**. For general document extraction in v4.0, use `prebuilt-layout` with `features=keyValuePairs`. See the [Document Intelligence migration guide](../versioning/migration-guide-overview.md).

* Explore our [**REST API**](https://learn.microsoft.com/rest/api/aiservices/document-models/analyze-document?view=rest-aiservices-2023-07-31\&preserve-view=true\&tabs=HTTP).
  
> 
> [Try the Document Intelligence Studio](https://formrecognizer.appliedai.azure.com/studio)
