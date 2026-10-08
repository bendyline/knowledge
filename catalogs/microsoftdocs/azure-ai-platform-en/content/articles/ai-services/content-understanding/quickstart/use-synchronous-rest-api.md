---
title: "Quickstart: Use synchronous Content Understanding operations"
titleSuffix: Foundry Tools
description: Use synchronous Read and Layout operations in the Content Understanding REST API to extract content from small documents and images.
author: PatrickFarley
ms.author: pafarley
manager: mcleans
ms.date: 08/05/2026
ms.service: azure-content-understanding-foundry-tools
ms.topic: quickstart
ms.custom:
  - dev-focus
ai-usage: ai-assisted
---

# Quickstart: Use synchronous Content Understanding operations

Synchronous operations work best for interactive scenarios that need extracted content right away or want to avoid temporary service-side storage during processing. These operations process the input in memory and return structured content directly in the response. You don't send a separate request to check for the result. In this public preview, synchronous operations are available for the `prebuilt-read` and `prebuilt-layout` analyzers.

Synchronous operations support the same document file formats as asynchronous operations. For file size, page, character, and page range limits, see [Content Understanding service limits](../service-limits.md#document-and-text).



## Prerequisites

* An active Azure subscription. If you don't have an Azure account, [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
* A [Microsoft Foundry resource](https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry) in a [supported region](../language-region-support.md). To create the resource, you need the **Contributor** role or higher on the target subscription or resource group.
* [cURL](https://everything.curl.dev/install/index.html) installed for your dev environment.

This quickstart shows how to use synchronous Read and Layout operations in the [Content Understanding REST API](https://learn.microsoft.com/rest/api/contentunderstanding/operation-groups) to extract structured content from small documents and images. The `prebuilt-read` and `prebuilt-layout` analyzers support two synchronous operations:

* `analyzeInline` takes a URL as input content.
* `analyzeBinaryInline` takes a binary file as input content.


## Extract text from an image with Read

The following request sends an image as binary data to the synchronous Read operation (`prebuilt-read:analyzeBinaryInline`). Replace `{your-resource-endpoint}`, `{your-subscription-key}`, and the local file path with your values.

```bash
curl --request POST \
  --url 'https://{your-resource-endpoint}/contentunderstanding/analyzers/prebuilt-read:analyzeBinaryInline?api-version=2026-06-01-preview' \
  --header 'Content-Type: application/octet-stream' \
  --header 'Ocp-Apim-Subscription-Key: {your-subscription-key}' \
  --data-binary '@D:\\Demo\\InsuranceCard.png'
```

The response contains the extracted text and location information from the image. Because this is a synchronous operation, the response contains the analysis result directly. You don't need to copy an `Operation-Location` value or poll for a result.

For more information, see [Content Analyzers - Analyze Binary](https://learn.microsoft.com/rest/api/contentunderstanding/content-analyzers/analyze-binary?view=rest-contentunderstanding-2025-11-01\&preserve-view=true).

## Extract document structure with Layout

The following request sends a document URL to the synchronous Layout operation. Replace `{your-resource-endpoint}` and `{your-subscription-key}` with your values. The URL must be accessible to the Content Understanding resource.

```bash
curl --request POST \
  --url 'https://{your-resource-endpoint}/contentunderstanding/analyzers/prebuilt-layout:analyzeInline?api-version=2026-06-01-preview' \
  --header 'Content-Type: application/json' \
  --header 'Ocp-Apim-Subscription-Key: {your-subscription-key}' \
  --data '{
    "inputs": [
      {
        "url": "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/layout.png"
      }
    ]
  }'
```

The response contains the extracted content and document structure, such as tables, sections, figures, formatting, hyperlinks, and signatures when supported. The response also includes usage information for the operation.

For more information, see [Content Analyzers - Analyze](https://learn.microsoft.com/rest/api/contentunderstanding/content-analyzers/analyze?view=rest-contentunderstanding-2025-11-01\&preserve-view=true).

## Choose between synchronous and asynchronous operations

Use synchronous operations when your application needs the result immediately, the input fits within the synchronous limits, or processing documents in memory is important for your scenario. Use asynchronous operations for larger inputs or longer-running analysis. For an asynchronous example, see [Quickstart: Use the Content Understanding REST API](use-rest-api.md).

## Next steps

* Learn about [prebuilt analyzers](../concepts/prebuilt-analyzers.md).
* Review [Content Understanding service limits](../service-limits.md).
* Review [Content Understanding pricing](../pricing-explainer.md).
