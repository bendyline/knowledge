---
title: Business card data extraction - Document Intelligence 
titleSuffix: Foundry Tools
description: OCR and machine learning based business card scanning in Document Intelligence extracts key data from business cards.
author: laujan
manager: mcleans
ms.service: azure-document-intelligence-foundry-tools
ms.topic: concept-article
ms.date: 08/15/2026
ms.author: lajanuar
---

<!-- markdownlint-disable MD033 -->

# Document Intelligence business card model

> **Important:**
> Starting with Document Intelligence **v4.0**, and going forward, the business card model (prebuilt-businessCard) is deprecated. To extract data from business card formats, use the following:
>
>| Feature | version | Model ID |
>| --- | --- | --- |
>| Business card model | &bullet; v3.1:2023-07-31 (GA)</br>&bullet; v3.0:2022-08-31 (GA)</br>&bullet; v2.1 (GA) | **`prebuilt-businessCard`** |

**Applies to: \>=doc-intel-3.1.0**

**This content applies to:** 🟩 [**v3.1 (GA)**](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/includes?view=doc-intel-3.1.0\&preserve-view=true) | **Previous versions:** 🟥 [**v3.0 (retiring)**](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/includes?view=doc-intel-3.0.0\&preserve-view=true) 🟥 [**v2.1 (retiring)**](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/includes?view=doc-intel-2.1.0\&preserve-view=true)



**Applies to: doc-intel-3.0.0**

**This content applies to:** 🟥 **v3.0 (retiring)** | **Latest versions:** 🟪 [**v4.0 (GA)**](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/includes?view=doc-intel-4.0.0\&preserve-view=true) 🟪 [**v3.1 (GA)**](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/includes?view=doc-intel-3.1.0\&preserve-view=true) | **Previous version:** 🟥 [**v2.1 (retiring)**](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/includes?view=doc-intel-2.1.0\&preserve-view=true)



**Applies to: doc-intel-2.1.0**

**This content applies to:** 🟥 **v2.1** | **Latest version:** 🟪 [**v4.0 (GA)**](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/includes?view=doc-intel-4.0.0\&preserve-view=tru)



**Applies to: \>=doc-intel-3.0.0**

The Document Intelligence business card model combines powerful Optical Character Recognition (OCR) capabilities with deep learning models to analyze and extract data from business card images. The API analyzes printed business cards; extracts key information such as first name, surname, company name, email address, and phone number;  and returns a structured JSON data representation.

## Business card data extraction

Business cards are a great way to represent a business or a professional. The company logo, fonts, and background images found in business cards help promote the company branding and differentiate it from others. Applying OCR and machine-learning based techniques to automate scanning of business cards is a common image processing scenario. Enterprise systems used by sales and marketing teams typically have business card data extraction capability integration into for the benefit of their users.

***Sample business card processed with [Document Intelligence Studio](https://formrecognizer.appliedai.azure.com/studio/prebuilt?formType=businessCard)***

Screenshot of a sample business card analyzed in the Document Intelligence Studio.



**Applies to: doc-intel-2.1.0**

***Sample business processed with [Document Intelligence Sample Labeling tool](https://fott-2-1.azurewebsites.net/)***

Screenshot of a sample business card analyzed with the Document Intelligence Sample Labeling tool.



## Development options

**Applies to: \>=doc-intel-3.1.0**

Document Intelligence **v3.1:2023-07-31 (GA)** supports the following tools, applications, and libraries:

| Feature | Resources | Model ID |
| --- | --- | --- |
| **Business card model** | &bullet; [**Document Intelligence Studio**](https://formrecognizer.appliedai.azure.com/studio/prebuilt?formType=businessCard)<br>&bullet; [**REST API**](https://learn.microsoft.com/rest/api/aiservices/document-models/analyze-document?view=rest-aiservices-2023-07-31\&preserve-view=true\&tabs=HTTP)<br>&bullet; [**C# SDK**](../quickstarts/get-started-sdks-rest-api.md?view=doc-intel-3.1.0&preserve-view=true)<br>&bullet; [**Python SDK**](../quickstarts/get-started-sdks-rest-api.md?view=doc-intel-3.1.0&preserve-view=true)<br>&bullet; [**Java SDK**](../quickstarts/get-started-sdks-rest-api.md?view=doc-intel-3.1.0&preserve-view=true)<br>&bullet; [**JavaScript SDK**](../quickstarts/get-started-sdks-rest-api.md?view=doc-intel-3.1.0&preserve-view=true) | **prebuilt-businessCard** |


**Applies to: \>=doc-intel-3.0.0**

Document Intelligence **v3.0:2022-08-31 (GA)** supports the following tools, applications, and libraries:

| Feature | Resources | Model ID |
| --- | --- | --- |
| **Business card model** | &bullet; [**Document Intelligence Studio**](https://formrecognizer.appliedai.azure.com/studio/prebuilt?formType=businessCard)<br>&bullet; [**REST API**](https://learn.microsoft.com/rest/api/aiservices/document-models/analyze-document?view=rest-aiservices-v3.0%20\(2022-08-31\)\&preserve-view=true\&tabs=HTTP)<br>&bullet; [**C# SDK**](../quickstarts/get-started-sdks-rest-api.md?view=doc-intel-3.0.0&preserve-view=true)<br>&bullet; [**Python SDK**](../quickstarts/get-started-sdks-rest-api.md?view=doc-intel-3.0.0&preserve-view=true)<br>&bullet; [**Java SDK**](../quickstarts/get-started-sdks-rest-api.md?view=doc-intel-3.0.0&preserve-view=true)<br>&bullet; [**JavaScript SDK**](../quickstarts/get-started-sdks-rest-api.md?view=doc-intel-3.0.0&preserve-view=true) | **prebuilt-businessCard** |



**Applies to: doc-intel-2.1.0**

Document Intelligence **v2.1 (GA)** supports the following tools, applications, and libraries:

| Feature | Resources |
| --- | --- |
| **Business card model** | &bullet; [**Document Intelligence labeling tool**](https://fott-2-1.azurewebsites.net/prebuilts-analyze)<br>&bullet; [**REST API**](../how-to-guides/use-sdk-rest-api.md?view=doc-intel-3.0.0&tabs=windows&pivots=programming-language-rest-api&preserve-view=true)<br>&bullet; [**Client-library SDK**](../how-to-guides/use-sdk-rest-api.md?view=doc-intel-2.1.0&preserve-view=true)<br>&bullet; [**Document Intelligence Docker container**](../containers/install-run.md?tabs=business-card#run-the-container-with-the-docker-compose-up-command) |



**Applies to: \>=doc-intel-3.0.0**

### Try business card data extraction

See how data, including name, job title, address, email, and company name, is extracted from business cards. You need the following resources:

* An Azure subscription—you can [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)

* A [Document Intelligence instance](https://portal.azure.com/#create/Microsoft.CognitiveServicesFormRecognizer) in the Azure portal. You can use the free pricing tier (`F0`) to try the service. After your resource deploys, select **Go to resource** to get your key and endpoint.

 Screenshot of keys and endpoint location in the Azure portal.

#### Document Intelligence Studio

> **Note:**
> Document Intelligence Studio is available with v3.1 and v3.0 APIs.

1. On the [Document Intelligence Studio home page](https://documentintelligence.ai.azure.com/studio), select **Business cards**.

1. You can analyze the sample business card or upload your own files.

1. Select the **Run analysis** button and, if necessary, configure the **Analyze options** :

    Screenshot of Run analysis and Analyze options buttons in the Document Intelligence Studio.

    > 
    > [Try Document Intelligence Studio](https://formrecognizer.appliedai.azure.com/studio/prebuilt?formType=businessCard)



**Applies to: doc-intel-2.1.0**

## Document Intelligence Sample Labeling tool

1. Navigate to the [Document Intelligence Sample Tool](https://fott-2-1.azurewebsites.net/).

1. On the sample tool home page, select the **Use prebuilt model to get data** tile.

    Screenshot of the layout model analyze results operation.

1. Select the **Form Type**  to analyze from the dropdown menu.

1. Choose a URL for the file you would like to analyze from the below options:

    * [**Sample invoice document**](https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/invoice_sample.jpg).
    * [**Sample ID document**](https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/DriverLicense.png).
    * [**Sample receipt image**](https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/contoso-allinone.jpg).
    * [**Sample business card image**](https://raw.githubusercontent.com/Azure/azure-sdk-for-python/master/sdk/formrecognizer/azure-ai-formrecognizer/samples/sample_forms/business_cards/business-card-english.jpg).

1. In the **Source** field, select **URL** from the dropdown menu, paste the selected URL, and select the **Fetch** button.

    Screenshot of source location dropdown menu.

1. In the **Document Intelligence service endpoint** field, paste the endpoint that you obtained with your Document Intelligence subscription.

1. In the **key** field, paste  the key you obtained from your Document Intelligence resource.

    Screenshot of the select-form-type dropdown menu.

1. Select **Run analysis**. The Document Intelligence Sample Labeling tool calls the Analyze Prebuilt API and analyze the document.

1. View the results - see the key-value pairs extracted, line items, highlighted text extracted, and tables detected.

    Screenshot of the business card model analyze results operation.

> **Note:**
> The [Sample Labeling tool](https://fott-2-1.azurewebsites.net/) does not support the BMP file format. This is a limitation of the tool not the Document Intelligence Service.



## Input requirements

**Applies to: \>=doc-intel-3.0.0**

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




**Applies to: doc-intel-2.1.0**

* The supported file formats: JPEG, PNG, PDF, and TIFF
* PDF and TIFF, up to 2,000 pages are processed. For free tier subscribers, only the first two pages are processed.
* The file size must be less than 50 MB and dimensions at least 50 x 50 pixels and at most 10,000 x 10,000 pixels.



**Applies to: \>=doc-intel-3.0.0**

## Supported languages and locales

For a complete list of supported languages, *see* our [prebuilt model language support](../language-support/prebuilt.md) page.

## Field extractions

For supported document extraction fields, *see* the [business card model schema](https://github.com/Azure-Samples/document-intelligence-code-samples/blob/main/schema/2023-07-31-ga/business-card.md) page in our GitHub sample repository.



**Applies to: doc-intel-2.1.0**

### Fields extracted

| Name | Type | Description | Text |
| :--- | :--- | :--- | :--- |
| ContactNames | array of objects | Contact name extracted from business card | [{ "FirstName": "John"`,` "LastName": "Doe" }] |
| FirstName | string | First (given) name of contact | "John" |
| LastName | string | Last (family) name of contact | "Doe" |
| CompanyNames | array of strings | Company name extracted from business card | ["Contoso"] |
| Departments | array of strings | Department or organization of contact | ["R&D"] |
| JobTitles | array of strings | Listed Job title of contact | ["Software Engineer"] |
| Emails | array of strings | Contact email extracted from business card | ["johndoe@contoso.com"] |
| Websites | array of strings | Website extracted from business card | ["https://www.contoso.com"] |
| Addresses | array of strings | Address extracted from business card | ["123 Main Street, Redmond, Washington 98052"] |
| MobilePhones | array of phone numbers | Mobile phone number extracted from business card | ["+19876543210"] |
| Faxes | array of phone numbers | Fax phone number extracted from business card | ["+19876543211"] |
| WorkPhones | array of phone numbers | Work phone number extracted from business card | ["+19876543231"] |
| OtherPhones | array of phone numbers | Other phone number extracted from business card | ["+19876543233"] |

## Supported locales

**Prebuilt business cards v2.1** supports the following locales:

* **en-us**
* **en-au**
* **en-ca**
* **en-gb**
* **en-in**

### Migration guide and REST API v3.1

* Follow our [**Document Intelligence v3.1 migration guide**](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/v3-1-migration-guide.md) to learn how to use the v3.0 version in your applications and workflows.



## Next steps

**Applies to: \>=doc-intel-3.0.0**

* Try processing your own forms and documents with the [Document Intelligence Studio](https://formrecognizer.appliedai.azure.com/studio)

* Complete a [Document Intelligence quickstart](../quickstarts/get-started-sdks-rest-api.md?view=doc-intel-3.0.0&preserve-view=true) and get started creating a document processing app in the development language of your choice.



**Applies to: doc-intel-2.1.0**

* Try processing your own forms and documents with the [Document Intelligence Sample Labeling tool](https://fott-2-1.azurewebsites.net/)

* Complete a [Document Intelligence quickstart](../quickstarts/get-started-sdks-rest-api.md?view=doc-intel-2.1.0&preserve-view=true) and get started creating a document processing app in the development language of your choice.
