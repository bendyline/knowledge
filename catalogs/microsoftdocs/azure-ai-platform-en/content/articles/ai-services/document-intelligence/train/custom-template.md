---
title: Custom template document model - Document Intelligence 
titleSuffix: Foundry Tools
description: Use the custom template document model to train a model to extract data from structured or templated forms.
author: laujan
manager: mcleans
ms.service: azure-document-intelligence-foundry-tools
ms.topic: concept-article
ms.date: 06/09/2026
ms.author: lajanuar
monikerRange: 'doc-intel-4.0.0 || <=doc-intel-3.1.0'
---


# Document Intelligence custom template model

**Applies to: doc-intel-4.0.0**


**This content applies to:** 🟩 **v4.0 (GA)** | **Previous versions:** 🟦 [**v3.1 (GA)**](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/includes?view=doc-intel-3.1.0\&preserve-view=tru) 🟥 [**v3.0 (retiring)**](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/includes?view=doc-intel-3.0.0\&preserve-view=tru) 🟥 [**v2.1 (retiring)**](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/includes?view=doc-intel-2.1.0\&preserve-view=tru)



**Applies to: doc-intel-3.1.0**

**This content applies to:** 🟩 **v3.1 (GA)** | **Latest version:** 🟪 [**v4.0 (GA)**](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/includes?view=doc-intel-4.0.0\&preserve-view=true) | **Previous versions:** 🟦 [**v3.0**](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/includes?view=doc-intel-3.0.0\&preserve-view=true) 🟦 [**v2.1**](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/includes?view=doc-intel-2.1.0\&preserve-view=true)



**Applies to: doc-intel-3.0.0**

**This content applies to:** 🟥 **v3.0 (retiring)** | **Latest versions:** 🟪 [**v4.0 (GA)**](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/includes?view=doc-intel-4.0.0\&preserve-view=true) 🟪 [**v3.1 (GA)**](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/includes?view=doc-intel-3.1.0\&preserve-view=true) | **Previous version:** 🟥 [**v2.1 (retiring)**](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/includes?view=doc-intel-2.1.0\&preserve-view=true)



**Applies to: doc-intel-2.1.0**

**This content applies to:** 🟥 **v2.1** | **Latest version:** 🟪 [**v4.0 (GA)**](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/includes?view=doc-intel-4.0.0\&preserve-view=tru)



Custom template (formerly custom form) is an easy-to-train document model that accurately extracts labeled key-value pairs, selection marks, tables, regions, and signatures from documents. Template models use layout cues to extract values from documents and are suitable to extract fields from highly structured documents with defined visual templates.

**Applies to: \>=doc-intel-3.0.0**

Custom template models share the same labeling format and strategy as custom neural models, with support for more field types and languages.



## Model capabilities

Custom template models support key-value pairs, selection marks, tables, signature fields, and selected regions.

| Form fields | Selection marks | Tabular fields (Tables) | Signature | Selected regions | Overlapping fields |
| :---: | :---: | :---: | :---: | :---: | :---: |
| Supported | Supported | Supported | Supported | Supported | Not supported |

**Applies to: \>=doc-intel-3.0.0**

## Tabular fields

With the release of API versions v3.0 and  later, custom template models add support for **cross page** tabular fields (tables):  

* To label a table that spans multiple pages, label each row of the table across the different pages in a single table.
* As a best practice, ensure that your dataset contains a few samples of the expected variations. For example, include samples where the entire table is on a single page and where tables span two or more pages if you expect to see those variations in documents.

Tabular fields are also useful when extracting repeating information within a document that isn't recognized as a table. For example, a repeating section of work experiences in a resume can be labeled and extracted as a tabular field.



## Dealing with variations

Template models rely on a defined visual template, changes to the template results in lower accuracy. In those instances, split your training dataset to include at least five samples of each template and train a model for each of the variations. You can then [compose](composed-models.md) the models into a single endpoint. For subtle variations, like digital PDF documents and images, it's best to include at least five examples of each type in the same training dataset.

## Input requirements

* For best results, provide one clear photo or high-quality scan per document.

* Supported file formats:

    | Model | PDF | Image: </br>J`PEG/JPG`, `PNG`, `BMP`, `TIFF`, `HEIF` | Microsoft Office: </br> Word (DOCX), Excel (XLSX), PowerPoint (PPTX), and HTML |
    | --- | :---: | :---: | :---: |
    | Read | ✔ | ✔ | ✔ |
    | Layout | ✔ | ✔ | ✔ |
    | General&nbsp;Document | ✔ | ✔ |  |
    | Prebuilt | ✔ | ✔ |  |
    | Custom | ✔ | ✔ |  |

    &#x2731; Microsoft Office files are currently not supported for other models or versions.

* For PDF and TIFF, up to 2,000 pages can be processed (with a free tier subscription, only the first two pages are processed).

* The file size for analyzing documents is 500 MB for paid (S0) tier and 4 MB for free (F0) tier.

* Image dimensions must be between 50 x 50 pixels and 10,000 px x 10,000 pixels.

* If your PDFs are password-locked, you must remove the lock before submission.

* The minimum height of the text to be extracted is 12 pixels for a 1024 x 768 pixel image. This dimension corresponds to about `8`-point text at 150 dots per inch (`DPI`).

* For custom model training, the maximum number of pages for training data is 500 for the custom template model and 50,000 for the custom neural model.

* For custom extraction model training, the total size of training data is 50 MB for template model and 1G-MB for the neural model.

* For custom classification model training, the total size of training data is `1GB`  with a maximum of 10,000 pages.

## Training a model

**Applies to: doc-intel-4.0.0**

Custom template models are generally available starting with v2.0 API and later versions. If you're starting with a new project or have an existing labeled dataset, use the v3.1 or v3.0 API with Document Intelligence Studio to train a custom template model.

| Model | REST API | SDK | Label and Test Models |
| --- | --- | --- | --- |
| Custom template | [v3.1 API](https://learn.microsoft.com/rest/api/aiservices/document-models/build-model?view=rest-aiservices-2024-02-29-preview\&preserve-view=true\&branch=docintelligence\&tabs=HTTP) | [Document Intelligence SDK](../quickstarts/get-started-sdks-rest-api.md?view=doc-intel-3.1.0&preserve-view=true) | [Document Intelligence Studio](https://formrecognizer.appliedai.azure.com/studio) |

With the v3.0 and later APIs, the build operation to train model supports a new ```buildMode``` property, to train a custom template model, set the ```buildMode``` to ```template```.

```REST
https://{endpoint}/documentintelligence/documentModels:build?api-version=2024-11-30


{
  "modelId": "string",
  "description": "string",
  "buildMode": "template",
  "azureBlobSource":
  {
    "containerUrl": "string",
    "prefix": "string"
  }
}
```



**Applies to: doc-intel-3.1.0**

Custom template models are generally available with the [v3.1 API](https://learn.microsoft.com/rest/api/aiservices/document-models/build-model?view=rest-aiservices-2023-07-31\&preserve-view=true\&tabs=HTTP). If you're starting with a new project or have an existing labeled dataset, use the v3.1 or v3.0 API with Document Intelligence Studio to train a custom template model.

| Model | REST API | SDK | Label and Test Models |
| --- | --- | --- | --- |
| Custom template | [v3.1 API](https://learn.microsoft.com/rest/api/aiservices/document-models/analyze-document?view=rest-aiservices-2023-07-31\&preserve-view=true\&tabs=HTTP) | [Document Intelligence SDK](../quickstarts/get-started-sdks-rest-api.md?view=doc-intel-3.0.0&preserve-view=true) | [Document Intelligence Studio](https://formrecognizer.appliedai.azure.com/studio) |

With the v3.0 and later APIs, the build operation to train model supports a new ```buildMode``` property, to train a custom template model, set the ```buildMode``` to ```template```.

```REST
https://{endpoint}/formrecognizer/documentModels:build?api-version=2023-07-31

{
  "modelId": "string",
  "description": "string",
  "buildMode": "template",
  "azureBlobSource":
  {
    "containerUrl": "string",
    "prefix": "string"
  }
}
```



## Supported languages and locales

*See* our [Language Support—custom models](../language-support/custom.md) page for a complete list of supported languages.

**Applies to: doc-intel-2.1.0**

Custom (template) models  are generally available with the [v2.1 API](https://learn.microsoft.com/rest/api/aiservices/analyzer?view=rest-aiservices-v2.1\&preserve-view=true).

| Model | REST API | SDK | Label and Test Models |
| --- | --- | --- | --- |
| Custom model (template) | [Document Intelligence 2.1 ](https://learn.microsoft.com/rest/api/aiservices/analyzer?view=rest-aiservices-v2.1\&preserve-view=true) | [Document Intelligence SDK](../quickstarts/get-started-sdks-rest-api.md?view=doc-intel-2.1.0&preserve-view=true?pivots=programming-language-python) | [Document Intelligence Sample labeling tool](https://fott-2-1.azurewebsites.net/) |



## Next steps

Learn to create and compose custom models:

**Applies to: \>=doc-intel-3.0.0**

> 
> [**Build a custom model**](../how-to-guides/build-a-custom-model.md)
> [**Compose custom models**](../how-to-guides/compose-custom-models.md)



**Applies to: doc-intel-2.1.0**

> 
> [**Build a custom model**](custom-model.md#build-a-custom-model)
> [**Compose custom models**](composed-models.md#development-options)
