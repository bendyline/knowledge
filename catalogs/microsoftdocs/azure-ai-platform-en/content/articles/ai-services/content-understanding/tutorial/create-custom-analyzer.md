---
title: Create a custom analyzer with Azure Content Understanding in Foundry Tools
titleSuffix: Foundry Tools
description: Learn to create a custom analyzer with Azure Content Understanding in Foundry Tools
author: PatrickFarley 
ms.author: paulhsu
manager: mcleans
ms.date: 07/16/2026
ms.service: azure-content-understanding-foundry-tools
ms.topic: overview
ms.custom:
  - build-2025
zone_pivot_groups: programming-languages-content-understanding
ai-usage: ai-assisted
---

# Create a custom analyzer

Content Understanding analyzers define how to process and extract insights from your content. They ensure uniform processing and output structure across all your content, so you get reliable and predictable results. For common use cases, you can use the [prebuilt analyzers](../concepts/prebuilt-analyzers.md). This guide shows how you can customize these analyzers to better fit your needs.

**Applies to: programming-language-rest**



<!-- markdownlint-disable MD025 -->

This guide shows you how to use the [Content Understanding REST API](https://learn.microsoft.com/rest/api/contentunderstanding/content-analyzers?view=rest-contentunderstanding-2025-11-01\&preserve-view=true) to create a custom analyzer that extracts structured data from your content.

## Prerequisites

* An active Azure subscription. If you don't have an Azure account, [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
* A [Microsoft Foundry resource](https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry) created in a [supported region](https://learn.microsoft.com/azure/ai-services/content-understanding/language-region-support).
   * The portal lists this resource under **Foundry** > **Foundry**.
* 

Set up default model deployments for your Content Understanding resource. By setting defaults, you create a connection to the Microsoft Foundry models you use for Content Understanding requests. Choose one of the following methods:

# [Content Understanding Studio](#tab/cu-studio)


1. Go to the [Content Understanding settings page](https://contentunderstanding.ai.azure.com/settings).

1. Select the **+ Add resource** button in the upper left.

1. Select the Foundry resource that you want to use and select **Next** > **Save**.

   Ensure that the **Enable autodeployment for required models if no defaults are available** checkbox is selected. This selection allows Content Understanding Studio to deploy a standard model, a mini model, and an embeddings model for your resource. Different analyzers require different models. For the current list, see [Supported generative models](../service-limits.md#supported-generative-models).

By taking these steps, you set up a connection between Content Understanding and Foundry models in your Foundry resource.


# [REST API](#tab/rest-api)



> **Important:**
> API version `2026-06-01-preview` is in public preview. Previews are provided without a service-level agreement and aren't recommended for production workloads. For more information, see [Supplemental Terms of Use for Microsoft Azure Previews](https://azure.microsoft.com/support/legal/preview-supplemental-terms/) and the [Microsoft Products and Services Data Protection Addendum](https://www.microsoft.com/licensing/docs/view/Microsoft-Products-and-Services-Data-Protection-Addendum-DPA) ("DPA").

By default, use GA API version `2025-11-01`. Use `2026-06-01-preview` only when you need preview features.

1. In your Foundry resource, deploy the models required by your analyzers. For the current list, see [Supported generative models](../service-limits.md#supported-generative-models). For deployment instructions, see [Create model deployments in Microsoft Foundry portal](https://learn.microsoft.com/azure/ai-foundry/foundry-models/how-to/create-model-deployments?pivots=ai-foundry-portal).

1. Define default model deployments at the resource level. Before you run the following `cURL` command, make the following changes to the HTTP request:

   1. Replace `{endpoint}` and `{key}` with the corresponding values from your Foundry instance in the Azure portal.

   1. Replace `api-version=2025-11-01` with `api-version=2026-06-01-preview` to use preview features. For the full preview feature list, see [What's new in Azure AI Content Understanding](../whats-new.md).

   1. Replace `{completionModelName}` and `{embeddingModelName}` with supported model names.

   1. Replace `{completionDeploymentName}` and `{embeddingDeploymentName}` with your model deployment names.



   ```bash
   curl -i -X PATCH "{endpoint}/contentunderstanding/defaults?api-version=2026-06-01-preview" \
     -H "Ocp-Apim-Subscription-Key: {key}" \
     -H "Content-Type: application/json" \
     -d '{
           "modelDeployments": {
             "{completionModelName}": "{completionDeploymentName}",
             "{embeddingModelName}": "{embeddingDeploymentName}"
           }
         }'
   ```


---

* [cURL](https://everything.curl.dev/install/index.html) installed for your dev environment.

## Define an analyzer schema

# [Document](#tab/document)

To create a custom analyzer, define a field schema that describes the structured data you want to extract. In the following example, you create an analyzer based on the [prebuilt document analyzer](../concepts/prebuilt-analyzers.md) for processing a receipt.

Create a JSON file named `receipt.json` with the following content:
```json
{
  "description": "Sample receipt analyzer",
  "baseAnalyzerId": "prebuilt-document",
  "models": {
      "completion": "gpt-5.2",
      "embedding": "text-embedding-3-large"

    },
  "config": {
    "returnDetails": true,
    "enableFormula": false,
    "estimateFieldSourceAndConfidence": true,
    "tableFormat": "html"
  },
 "fieldSchema": {
    "fields": {
      "VendorName": {
        "type": "string",
        "method": "extract",
        "description": "Vendor issuing the receipt"
      },
      "Items": {
        "type": "array",
        "method": "extract",
        "items": {
          "type": "object",
          "properties": {
            "Description": {
              "type": "string",
              "method": "extract",
              "description": "Description of the item"
            },
            "Amount": {
              "type": "number",
              "method": "extract",
              "description": "Amount of the item"
            }
          }
        }
      }
    }
  }
}
```

If you have various types of documents you need to process, but you want to categorize and analyze only the receipts, create an analyzer that categorizes the document first. Then, route it to the analyzer you created earlier with the following schema.

Create a JSON file named `categorize.json` with the following content:
```json
{
  "baseAnalyzerId": "prebuilt-document",
  // Use the base analyzer to invoke the document specific capabilities.

  //Specify the model the analyzer should use. This is one of the supported completion models and one of the supported embeddings model. The specific deployment used during analyze is set on the resource or provided in the analyze request.
  "models": {
      "completion": "gpt-5.2"
    },
  "config": {
    // Enable splitting of the input into segments. Set this property to false if you only expect a single document within the input file. When specified and enableSegment=false, the whole content will be classified into one of the categories.
    "enableSegment": false,

    "contentCategories": {
      // Category name.
      "receipt": {
        // Description to help with classification and splitting.
        "description": "Any images or documents of receipts",

        // Define the analyzer that any content classified as a receipt should be routed to
        "analyzerId": "receipt"
      },

      "invoice": {
        "description": "Any images or documents of invoice",
        "analyzerId": "prebuilt-invoice"
      },
      "policeReport": {
        "description": "A police or law enforcement report detailing the events that lead to the loss."
        // Don't perform analysis for this category.
      }

    },

    // Omit original content object and only return content objects from additional analysis.
    "omitContent": true
  }

  //You can use fieldSchema here to define fields that are needed from the entire input content.

}
```


# [Image](#tab/image)

To create a custom analyzer, define a field schema that describes the structured data you want to extract. In the following example, you create an analyzer based on a [prebuilt image analyzer](../concepts/prebuilt-analyzers.md) for processing images of charts and graphs.

Create a JSON file named `request_body.json` with the following content:
```json
{
  "description": "Sample image analyzer for charts and graphs",
  "baseAnalyzerId": "prebuilt-image",
  "models": {
      "completion": "gpt-5.2"
    },
 "fieldSchema": {
    "fields": {
      "Title": {
        "type": "string"
      },
      "ChartType": {
        "type": "string",
        "method": "classify",
        "enum": [ "bar", "line", "pie" ]
      }
    }
  }
}
```

# [Audio](#tab/audio)

To create a custom analyzer, define a field schema that describes the structured data you want to extract. In the following example, you create an analyzer based on a [prebuilt call center analyzer](../concepts/prebuilt-analyzers.md) for processing customer support call recordings.

Create a JSON file named `request_body.json` with the following content:
```json
{
  "description": "Sample customer support call analyzer",
  "baseAnalyzerId": "prebuilt-audio",
  "config": {
    "locales": ["en-US", "fr-FR"],
    "returnDetails": true
  },
  "fieldSchema": {
    "fields": {
      "Summary": {
        "type": "string",
        "method": "generate"
      },
      "Sentiment": {
        "type": "string",
        "method": "classify",
        "enum": ["Positive", "Neutral", "Negative"]
      },
      "People": {
        "type": "array",
        "description": "List of people mentioned",
        "items": {
          "type": "object",
          "properties": {
            "Name": { "type": "string" },
            "Role": { "type": "string" }
          }
        }
      }
    }
  }
}
```

# [Video](#tab/video)

To create a custom analyzer, define a field schema that describes the structured data you want to extract. In the following example, you create an analyzer based on a [prebuilt video  analyzer](../concepts/prebuilt-analyzers.md) for processing product demos and reviews.

Create a JSON file named `request_body.json` with the following content:
```json
{
  "description": "Sample product demo video analyzer",
  "baseAnalyzerId": "prebuilt-video",
  "models": {
      "completion": "gpt-5.2"
    },
  "config": {
    "locales": ["en-US", "fr-FR"],
    "returnDetails": true,
  },
   "fieldSchema": {
    "fields": {
      "Segments": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "SegmentId": {
              "type": "string"
            },
            "Description": {
              "type": "string",
              "method": "generate",
              "description": "Detailed summary of the video segment, focusing on product characteristics, lighting, and color palette."
            },
            "Sentiment": {
              "type": "string",
              "method": "classify",
              "enum": ["Positive", "Neutral", "Negative"]
            }
          }
        }
      }
    }
  }
}

```

---

## Create an analyzer

### PUT request

# [Document](#tab/document)

Create a receipt analyzer first, and then create the categorize analyzer.

```bash
curl -i -X PUT "{endpoint}/contentunderstanding/analyzers/{analyzerId}?api-version=2025-11-01" \
  -H "Ocp-Apim-Subscription-Key: {key}" \
  -H "Content-Type: application/json" \
  -d @receipt.json
```

# [Image](#tab/image)

```bash
curl -i -X PUT "{endpoint}/contentunderstanding/analyzers/{analyzerId}?api-version=2025-11-01" \
  -H "Ocp-Apim-Subscription-Key: {key}" \
  -H "Content-Type: application/json" \
  -d @request_body.json
```

# [Audio](#tab/audio)

```bash
curl -i -X PUT "{endpoint}/contentunderstanding/analyzers/{analyzerId}?api-version=2025-11-01" \
  -H "Ocp-Apim-Subscription-Key: {key}" \
  -H "Content-Type: application/json" \
  -d @request_body.json
```

# [Video](#tab/video)

```bash
curl -i -X PUT "{endpoint}/contentunderstanding/analyzers/{analyzerId}?api-version=2025-11-01" \
  -H "Ocp-Apim-Subscription-Key: {key}" \
  -H "Content-Type: application/json" \
  -d @request_body.json
```

---

### PUT response

The `201 Created` response includes an `Operation-Location` header with a URL that you can use to track the status of this asynchronous analyzer creation operation.

```
201 Created
Operation-Location: {endpoint}/contentunderstanding/analyzers/{analyzerId}/operations/{operationId}?api-version=2025-11-01
```

When the operation finishes, an HTTP GET on the operation location URL returns `"status": "succeeded"`.

```bash
curl -i -X GET "{endpoint}/contentunderstanding/analyzers/{analyzerId}/operations/{operationId}?api-version=2025-11-01" \
  -H "Ocp-Apim-Subscription-Key: {key}"
```

## Analyze a file

### Submit the file

You can now use the custom analyzer you created to process files and extract the fields you defined in the schema.

Before running the cURL command, make the following changes to the HTTP request:

# [Document](#tab/document)


1. Replace `{endpoint}` and `{key}` with the endpoint and key values from your Azure portal Foundry instance.
1. Replace `{analyzerId}` with the name of the custom analyzer you created with the `categorize.json` file.
1. Replace `{fileUrl}` with a publicly accessible URL of the file to analyze, such as a path to an Azure Storage Blob with a shared access signature (SAS) or the sample URL `https://github.com/Azure-Samples/azure-ai-content-understanding-python/raw/refs/heads/main/data/receipt.png`.

# [Image](#tab/image)

1. Replace `{endpoint}` and `{key}` with the endpoint and key values from your Azure portal Foundry instance.
1. Replace `{analyzerId}` with the name of the custom analyzer you created.
1. Replace `{fileUrl}` with a publicly accessible URL of the file to analyze, such as a path to an Azure Storage Blob with a shared access signature (SAS) or the sample URL `https://github.com/Azure-Samples/azure-ai-content-understanding-python/raw/refs/heads/main/data/pieChart.jpg`.

# [Audio](#tab/audio)

1. Replace `{endpoint}` and `{key}` with the endpoint and key values from your Azure portal Foundry instance.
1. Replace `{analyzerId}` with the name of the custom analyzer you created.
1. Replace `{fileUrl}` with a publicly accessible URL of the file to analyze, such as a path to an Azure Storage Blob with a shared access signature (SAS) or the sample URL `https://github.com/Azure-Samples/azure-ai-content-understanding-python/raw/refs/heads/main/data/audio.wav`.

# [Video](#tab/video)

1. Replace `{endpoint}` and `{key}` with the endpoint and key values from your Azure portal Foundry instance.
1. Replace `{analyzerId}` with the name of the custom analyzer you created.
1. Replace `{fileUrl}` with a publicly accessible URL of the file to analyze, such as a path to an Azure Storage Blob with a shared access signature (SAS) or the sample URL `https://github.com/Azure-Samples/azure-ai-content-understanding-python/raw/refs/heads/main/data/FlightSimulator.mp4`.

---

#### POST Request

# [Document](#tab/document)

This example uses the custom analyzer you created with the `categorize.json` file to analyze a receipt.

```bash
curl -i -X POST "{endpoint}/contentunderstanding/analyzers/{analyzerId}:analyze?api-version=2025-11-01" \
  -H "Ocp-Apim-Subscription-Key: {key}" \
  -H "Content-Type: application/json" \
  -d '{
        "inputs":[
          {
            "url": "https://github.com/Azure-Samples/azure-ai-content-understanding-python/raw/refs/heads/main/data/receipt.png"
          }          
        ]
      }'  
```

# [Image](#tab/image)

This example uses the custom analyzer you created to analyze a chart or graph image.

```bash
curl -i -X POST "{endpoint}/contentunderstanding/analyzers/{analyzerId}:analyze?api-version=2025-11-01" \
  -H "Ocp-Apim-Subscription-Key: {key}" \
  -H "Content-Type: application/json" \
  -d '{
        "inputs":[
          {
            "url": "https://github.com/Azure-Samples/azure-ai-content-understanding-python/raw/refs/heads/main/data/pieChart.jpg"
          }          
        ]
      }'  
```

# [Audio](#tab/audio)

This example uses the custom analyzer you created to analyze a customer support call recording.

```bash
curl -i -X POST "{endpoint}/contentunderstanding/analyzers/{analyzerId}:analyze?api-version=2025-11-01" \
  -H "Ocp-Apim-Subscription-Key: {key}" \
  -H "Content-Type: application/json" \
  -d '{
        "inputs":[
          {
            "url": "https://github.com/Azure-Samples/azure-ai-content-understanding-python/raw/refs/heads/main/data/audio.wav"
          }          
        ]
      }'  
```

# [Video](#tab/video)

This example uses the custom analyzer you created to analyze a product demo video.

```bash
curl -i -X POST "{endpoint}/contentunderstanding/analyzers/{analyzerId}:analyze?api-version=2025-11-01" \
  -H "Ocp-Apim-Subscription-Key: {key}" \
  -H "Content-Type: application/json" \
  -d '{
        "inputs":[
          {
            "url": "https://github.com/Azure-Samples/azure-ai-content-understanding-python/raw/refs/heads/main/data/FlightSimulator.mp4"
          }          
        ]
      }'  
```

---

#### POST Response

The `202 Accepted` response includes the `{resultId}` which you can use to track the status of this asynchronous operation.

```
{
  "id": {resultId},
  "status": "Running",
  "result": {
    "analyzerId": {analyzerId},
    "apiVersion": "2025-11-01",
    "createdAt": "YYYY-MM-DDTHH:MM:SSZ",
    "warnings": [],
    "contents": []
  }
}
```

### Get analyze result

Use the `Operation-Location` from the `POST` response to get the result of the analysis.

#### GET request
```bash
curl -i -X GET "{endpoint}/contentunderstanding/analyzerResults/{resultId}?api-version=2025-11-01" \
  -H "Ocp-Apim-Subscription-Key: {key}"
```

#### GET response

A `200 OK` response includes a `status` field that shows the operation's progress.  
- The `status` is `Succeeded` if the operation completes successfully.  
- If the status is `running` or `notStarted`, call the API again manually or use a script. Wait at least one second between requests.

##### Sample response

# [Document](#tab/document)

```json
{
  "id": {resultId},
  "status": "Succeeded",
  "result": {
    "analyzerId": {analyzerId},
    "apiVersion": "2025-11-01",
    "createdAt": "YYYY-MM-DDTHH:MM:SSZ",
    "warnings": [],
    "contents": [
      {
        "path": "input1/segment1",
        "category": "receipt",
        "markdown": "Contoso\n\n123 Main Street\nRedmond, WA 98052\n\n987-654-3210\n\n6/10/2019 13:59\nSales Associate: Paul\n\n\n<table>\n<tr>\n<td>2 Surface Pro 6</td>\n<td>$1,998.00</td>\n</tr>\n<tr>\n<td>3 Surface Pen</td>\n<td>$299.97</td>\n</tr>\n</table> ...",
        "fields": {
          "VendorName": {
            "type": "string",
            "valueString": "Contoso",
            "spans": [{"offset": 0,"length": 7}],
            "confidence": 0.996,
            "source": "D(1,774.0000,72.0000,974.0000,70.0000,974.0000,111.0000,774.0000,113.0000)"
          },
          "Items": {
            "type": "array",
            "valueArray": [
              {
                "type": "object",
                "valueObject": {
                  "Description": {
                    "type": "string",
                    "valueString": "2 Surface Pro 6",
                    "spans": [ { "offset": 115, "length": 15}],
                    "confidence": 0.423,
                    "source": "D(1,704.0000,482.0000,875.0000,482.0000,875.0000,508.0000,704.0000,508.0000)"
                  },
                  "Amount": {
                    "type": "number",
                    "valueNumber": 1998,
                    "spans": [{ "offset": 140,"length": 9}
                    ],
                    "confidence": 0.957,
                    "source": "D(1,952.0000,482.0000,1048.0000,482.0000,1048.0000,508.0000,952.0000,509.0000)"
                  }
                }
              }, ...
            ]
          }
        },
        "kind": "document",
        "startPageNumber": 1,
        "endPageNumber": 1,
        "unit": "pixel",
        "pages": [
          {
            "pageNumber": 1,
            "angle": -0.0944,
            "width": 1743,
            "height": 878
          }
        ],
        "analyzerId": "{analyzerId}",
        "mimeType": "image/png"
      }
    ]
  },
  "usage": {
    "documentPages": 1,
    "tokens": {
      "contextualization": 1000
    }
  }
}
```

# [Image](#tab/image)

```json
{
  "id": {resultId},
  "status": "Succeeded",
  "result": {
    "analyzerId": {analyzerId},
    "apiVersion": "2025-11-01",
    "createdAt": "YYYY-MM-DDTHH:MM:SSZ",
    "warnings": [],
    "contents": [
      {
        "markdown": "![image](image)\n",
        "fields": {
          "Title": {
            "type": "string",
            "valueString": "Weekly Work Hours Distribution"
          },
          "ChartType": {
            "type": "string",
            "valueString": "pie"
          }
        },
       "kind": "document",
        "startPageNumber": 1,
        "endPageNumber": 1,
        "unit": "pixel",
        "pages": [
          {
            "pageNumber": 1
          }
        ],
        "analyzerId": "{analyzerId}",
        "mimeType": "image/jpeg"
      }
    ]
  },
  "usage": {
    "tokens": {
      "contextualization": 1000
    }
  }
}
```

# [Audio](#tab/audio)

```json
{
  "id": {resultId},
  "status": "Succeeded",
  "result": {
    "analyzerId": {analyzerId},
    "apiVersion": "2025-11-01",
    "createdAt": "YYYY-MM-DDTHH:MM:SSZ",
    "warnings": [],
    "contents": [
      {
        "markdown": "# Audio: 00:00.000 => 01:54.670\nTranscript\n```\n<v Agent>Thank you for calling Woodgrove Travel...\n<v Customer>Hi Isabella, my name is John Smith...\n<v Agent>Could you provide flight details?\n<v Customer>Contoso Airways, flight CA123...\n<v Agent>Sorry to 
                     hear that...\n<v Customer>Flight delay made me miss meeting...\n<v Agent>We'll offer a partial refund...\n<v Customer>Thanks, appreciate your help!\n```",
        "fields": {
          "Summary": {
            "type": "string",
            "valueString": "John Smith contacted Woodgrove Travel to report a negative experience with a flight on Contoso Airways ..."
          },
          "Sentiment": {
            "type": "string",
            "valueString": "Positive"
          },
          "People": {
            "type": "array",
            "valueArray": [
              {
                "type": "object",
                "valueObject": {
                  "Name": {
                    "type": "string",
                    "valueString": "Isabella Taylor"
                  },
                  "Role": {
                    "type": "string",
                    "valueString": "Agent"
                  }
                }
              }, ...
            ]
          }
        },
        "kind": "audioVisual",
        "startTimeMs": 0,
        "endTimeMs": 114670,
        "transcriptPhrases": [
          {
            "speaker": "Agent",
            "startTimeMs": 80,
            "endTimeMs": 2160,
            "text": "Thank you for calling Woodgrove Travel.",
            "words": []
          }, ...

        ]
      }
    ]
  },
  "usage": {
    "audioHours": 0.032,
    "tokens": {
      "contextualization": 3194.445
    }
  }
}


```

# [Video](#tab/video)

```json
{
  "id": {resultId},
  "status": "Succeeded",
  "result": {
    "analyzerId": {analyzerId},
    "apiVersion": "2025-11-01",
    "createdAt": "YYYY-MM-DDTHH:MM:SS",
    "warnings": [],
    "contents": [
      {
        "markdown": "# Video: 00:00 => 00:43\n## Segment 1: Island view\nTranscript\n```\n00:01 --> 00:06\n<Speaker 1>Good data improves TTS.\n```\nKey Frames: ![](keyFrame.726.jpg) ## Segment 2: Data center\nTranscript\n```\n00:07 --> 00:13\n<Speaker 2>We trained on 3,000   
                     hours.\n```\nKey Frames: ![](keyFrame.2046.jpg) ![](keyFrame.4884.jpg)",
        "fields": {
          "Segments": {
            "type": "array",
            "valueArray": [
              {
                "type": "object",
                "valueObject": {
                  
                  "SegmentId": {
                    "type": "string",
                    "valueString": "00:00:00.000-00:00:01.467"
                  },
                  "Description": {
                    "type": "string",
                    "valueString": "The video opens with a dramatic aerial shot of a small airplane flying over a tropical island surrounded by turquoise waters. The logos for 'Flight Simulator' and 'Microsoft Azure AI' are prominently displayed, indicating a collaboration or feature integration between the two."
                  },
                  "Sentiment": {
                    "type": "string",
                    "valueString": "Positive"
                  }
                }
              }, ...
            ]
          }
        },
        "kind": "audioVisual",
        "startTimeMs": 0,
        "endTimeMs": 43866,
        "width": 1080,
        "height": 608,
        "KeyFrameTimesMs": [733, ... , 43233],
        "transcriptPhrases": [
          {
            "speaker": "Speaker 1",
            "startTimeMs": 1360,
            "endTimeMs": 6640,
            "text": "When it comes to the neural TTS, in order to get a good voice, it's better to have good data.",
            "words": []
          }, ...
        ],
        "cameraShotTimesMs": [1467, ...  42033],
        "segments": [
          {
            "startTimeMs": 0,
            "endTimeMs": 1467,
            "description": "The video begins with a scenic aerial view of an island, showcasing the collaboration between Flight Simulator and Microsoft Azure AI.",
            "segmentId": "1"
          }, ...
        ]
      }
    ]
  },
  "usage": {
    "videoHours": 0.013,
    "tokens": {
      "contextualization": 12222.223
    }
  }
}
```

---




**Applies to: programming-language-python**



<!-- markdownlint-disable MD025 -->

[Client library](https://pypi.org/project/azure-ai-contentunderstanding/) | [Samples](https://github.com/Azure/azure-sdk-for-python/tree/main/sdk/contentunderstanding/azure-ai-contentunderstanding/samples) | [SDK source](https://github.com/Azure/azure-sdk-for-python/tree/main/sdk/contentunderstanding/azure-ai-contentunderstanding)

This guide shows you how to use the Content Understanding Python SDK to create a custom analyzer that extracts structured data from your content. Custom analyzers support document, image, audio, and video content types.

## Prerequisites

* An active Azure subscription. If you don't have an Azure account, [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
* A [Microsoft Foundry resource](https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry) created in a [supported region](../language-region-support.md).
* Your resource endpoint and API key (found under **Keys and Endpoint** in the Azure portal).
* Model deployment defaults configured for your resource. See [Models and deployments](../concepts/models-deployments.md) or this one-time [configuration script](https://github.com/Azure/azure-sdk-for-python/blob/main/sdk/contentunderstanding/azure-ai-contentunderstanding/samples/sample_update_defaults.py) for setup instructions.
* [Python 3.9 or later](https://www.python.org/).

## Set up

1. Install the Content Understanding client library for Python with pip:

    ```console
    pip install azure-ai-contentunderstanding
    ```

1. Optionally, install the Azure Identity library for Microsoft Entra authentication:

    ```console
    pip install azure-identity
    ```

## Set up environment variables

To authenticate with the Content Understanding service, set the environment variables with your own values before running the sample:
- `CONTENTUNDERSTANDING_ENDPOINT` - the endpoint to your Content Understanding resource.
- `CONTENTUNDERSTANDING_KEY` - your Content Understanding API key (optional if using [Microsoft Entra ID](../concepts/secure-communications.md) DefaultAzureCredential).

### Windows

```cmd
setx CONTENTUNDERSTANDING_ENDPOINT "your-endpoint"
setx CONTENTUNDERSTANDING_KEY "your-key"
```

### Linux / macOS

```bash
export CONTENTUNDERSTANDING_ENDPOINT="your-endpoint"
export CONTENTUNDERSTANDING_KEY="your-key"
```

## Create the client
Import required libraries and models, and then create the client with your resource endpoint and credentials. 

```python
import os
import time
from azure.ai.contentunderstanding import ContentUnderstandingClient
from azure.core.credentials import AzureKeyCredential

endpoint = os.environ["CONTENTUNDERSTANDING_ENDPOINT"]
key = os.environ["CONTENTUNDERSTANDING_KEY"]

client = ContentUnderstandingClient(
    endpoint=endpoint,
    credential=AzureKeyCredential(key),
)
```

## Create a custom analyzer

# [Document](#tab/document)

The following example creates a custom document analyzer based on the [prebuilt document base analyzer](../concepts/prebuilt-analyzers.md). It defines fields using three extraction methods: `extract` for literal text, `generate` for AI-generated fields or interpretations, and `classify` for categorization.

```python
from azure.ai.contentunderstanding.models import (
    ContentAnalyzer,
    ContentAnalyzerConfig,
    ContentFieldSchema,
    ContentFieldDefinition,
    ContentFieldType,
    GenerationMethod,
)

# Generate a unique analyzer ID
analyzer_id = f"my_document_analyzer_{int(time.time())}"

# Define field schema with custom fields
field_schema = ContentFieldSchema(
    name="company_schema",
    description="Schema for extracting company information",
    fields={
        "company_name": ContentFieldDefinition(
            type=ContentFieldType.STRING,
            method=GenerationMethod.EXTRACT,
            description="Name of the company",
            estimate_source_and_confidence=True,
        ),
        "total_amount": ContentFieldDefinition(
            type=ContentFieldType.NUMBER,
            method=GenerationMethod.EXTRACT,
            description="Total amount on the document",
            estimate_source_and_confidence=True,
        ),
        "document_summary": ContentFieldDefinition(
            type=ContentFieldType.STRING,
            method=GenerationMethod.GENERATE,
            description=(
                "A brief summary of the document content"
            ),
        ),
        "document_type": ContentFieldDefinition(
            type=ContentFieldType.STRING,
            method=GenerationMethod.CLASSIFY,
            description="Type of document",
            enum=[
                "invoice", "receipt", "contract",
                "report", "other",
            ],
        ),
    },
)

# Create analyzer configuration
config = ContentAnalyzerConfig(
    enable_formula=True,
    enable_layout=True,
    enable_ocr=True,
    estimate_field_source_and_confidence=True,
    return_details=True,
)

# Create the analyzer with field schema
analyzer = ContentAnalyzer(
    base_analyzer_id="prebuilt-document",
    description=(
        "Custom analyzer for extracting company information"
    ),
    config=config,
    field_schema=field_schema,
    models={
        "completion": "gpt-5.2",
        "embedding": "text-embedding-3-large",
    }, # Required when using field_schema and prebuilt-document base analyzer
)

# Create the analyzer
poller = client.begin_create_analyzer(
    analyzer_id=analyzer_id,
    resource=analyzer,
)
result = poller.result() # Wait for creation to complete

# Get the full analyzer details after creation
result = client.get_analyzer(analyzer_id=analyzer_id)
print(f"Analyzer '{analyzer_id}' created successfully!")

if result.description:
    print(f"  Description: {result.description}")

if result.field_schema and result.field_schema.fields:
    print(f"  Fields ({len(result.field_schema.fields)}):")
    for field_name, field_def in result.field_schema.fields.items():
        method = field_def.method if field_def.method else "auto"
        field_type = field_def.type if field_def.type else "unknown"
        print(f"    - {field_name}: {field_type} ({method})")

```
An example output looks like:

```text
Analyzer 'my_document_analyzer_ID' created successfully!
  Description: Custom analyzer for extracting company information
  Fields (4):
    - company_name: ContentFieldType.STRING (GenerationMethod.EXTRACT)
    - total_amount: ContentFieldType.NUMBER (GenerationMethod.EXTRACT)
    - document_summary: ContentFieldType.STRING (GenerationMethod.GENERATE)
    - document_type: ContentFieldType.STRING (GenerationMethod.CLASSIFY)
```

> **Tip:**
> This code is based on the [create analyzer sample](https://github.com/Azure/azure-sdk-for-python/blob/main/sdk/contentunderstanding/azure-ai-contentunderstanding/samples/sample_create_analyzer.py) in the SDK repository.


Optionally, you can create a classifier analyzer to categorize documents and use its results to route documents to prebuilt or custom analyzers you created. Here is an example of creating a custom analyzer for classification workflows.

```python
import time
from azure.ai.contentunderstanding.models import (
    ContentAnalyzer,
    ContentAnalyzerConfig,
    ContentCategoryDefinition,
)

# Generate a unique analyzer ID
analyzer_id = f"my_classifier_{int(time.time())}"

print(f"Creating classifier '{analyzer_id}'...")

# Define content categories for classification
categories = {
    "Loan_Application": ContentCategoryDefinition(
        description="Documents submitted by individuals or businesses to request funding, "
        "typically including personal or business details, financial history, "
        "loan amount, purpose, and supporting documentation."
    ),
    "Invoice": ContentCategoryDefinition(
        description="Billing documents issued by sellers or service providers to request "
        "payment for goods or services, detailing items, prices, taxes, totals, "
        "and payment terms."
    ),
    "Bank_Statement": ContentCategoryDefinition(
        description="Official statements issued by banks that summarize account activity "
        "over a period, including deposits, withdrawals, fees, and balances."
    ),
}

# Create analyzer configuration
config = ContentAnalyzerConfig(
    return_details=True,
    enable_segment=True,  # Enable automatic segmentation by category
    content_categories=categories,
)

# Create the classifier analyzer
classifier = ContentAnalyzer(
    base_analyzer_id="prebuilt-document",
    description="Custom classifier for financial document categorization",
    config=config,
    models={"completion": "gpt-5.2"},
)

# Create the classifier
poller = client.begin_create_analyzer(
    analyzer_id=analyzer_id,
    resource=classifier,
)
result = poller.result()  # Wait for creation to complete

# Get the full analyzer details after creation
result = client.get_analyzer(analyzer_id=analyzer_id)

print(f"Classifier '{analyzer_id}' created successfully!")
if result.description:
    print(f"  Description: {result.description}")
```
> **Tip:**
> This code is based on the [create classifier sample](https://github.com/Azure/azure-sdk-for-python/blob/main/sdk/contentunderstanding/azure-ai-contentunderstanding/samples/sample_create_classifier.py) in the SDK repository.



# [Image](#tab/image)

The following example creates a custom image analyzer based on the [prebuilt image base analyzer](../concepts/prebuilt-analyzers.md) for processing charts and graphs.

```python
from azure.ai.contentunderstanding.models import (
    ContentAnalyzer,
    ContentFieldSchema,
    ContentFieldDefinition,
    ContentFieldType,
    GenerationMethod,
)

# Generate a unique analyzer ID
analyzer_id = f"my_image_analyzer_{int(time.time())}"

# Define field schema with custom fields
field_schema = ContentFieldSchema(
    name="chart_schema",
    description=(
        "Schema for extracting chart information"
    ),
    fields={
        "Title": ContentFieldDefinition(
            type=ContentFieldType.STRING,
            description="Title of the chart",
        ),
        "ChartType": ContentFieldDefinition(
            type=ContentFieldType.STRING,
            method=GenerationMethod.CLASSIFY,
            description="Type of chart",
            enum=["bar", "line", "pie"],
        ),
    },
)

# Create the analyzer with field schema
analyzer = ContentAnalyzer(
    base_analyzer_id="prebuilt-image",
    description=(
        "Custom analyzer for charts and graphs"
    ),
    field_schema=field_schema,
    models={
        "completion": "gpt-5.2",
    }, 
)

# Create the analyzer
poller = client.begin_create_analyzer(
    analyzer_id=analyzer_id,
    resource=analyzer,
)
result = poller.result() # Wait for creation to complete

# Get the full analyzer details after creation
result = client.get_analyzer(analyzer_id=analyzer_id)
print(f"Analyzer '{analyzer_id}' created successfully!")

if result.description:
    print(f"  Description: {result.description}")

if result.field_schema and result.field_schema.fields:
    print(f"  Fields ({len(result.field_schema.fields)}):")
    for field_name, field_def in result.field_schema.fields.items():
        method = field_def.method if field_def.method else "auto"
        field_type = field_def.type if field_def.type else "unknown"
        print(f"    - {field_name}: {field_type} ({method})")

```
An example output looks like:
```text
Analyzer 'my_image_analyzer_ID' created successfully!
  Description: Custom analyzer for charts and graphs
  Fields (2):
    - Title: ContentFieldType.STRING (auto)
    - ChartType: ContentFieldType.STRING (GenerationMethod.CLASSIFY)
```
> **Tip:**
> This code adapts the [create analyzer sample](https://github.com/Azure/azure-sdk-for-python/blob/main/sdk/contentunderstanding/azure-ai-contentunderstanding/samples/sample_create_analyzer.py) pattern for image content.

# [Audio](#tab/audio)

The following example creates a custom audio analyzer based on the [prebuilt audio analyzer](../concepts/prebuilt-analyzers.md) for processing customer support call recordings.

```python
from azure.ai.contentunderstanding.models import (
    ContentAnalyzer,
    ContentAnalyzerConfig,
    ContentFieldSchema,
    ContentFieldDefinition,
    ContentFieldType,
    GenerationMethod,
)
# Generate a unique analyzer ID
analyzer_id = f"my_audio_analyzer_{int(time.time())}"

# Define field schema with custom fields
field_schema = ContentFieldSchema(
    name="call_center_schema",
    description=(
        "Schema for analyzing customer support calls"
    ),
    fields={
        "Summary": ContentFieldDefinition(
            type=ContentFieldType.STRING,
            method=GenerationMethod.GENERATE,
            description="Summary of the call",
        ),
        "Sentiment": ContentFieldDefinition(
            type=ContentFieldType.STRING,
            method=GenerationMethod.CLASSIFY,
            description="Overall sentiment of the call",
            enum=["Positive", "Neutral", "Negative"],
        ),
        "People": ContentFieldDefinition(
            type=ContentFieldType.ARRAY,
            description="List of people mentioned",
            item_definition=ContentFieldDefinition(
                type=ContentFieldType.OBJECT,
                properties={
                    "Name": ContentFieldDefinition(
                        type=ContentFieldType.STRING,
                    ),
                    "Role": ContentFieldDefinition(
                        type=ContentFieldType.STRING,
                    ),
                },
            ),
        ),
    },
)

# Create analyzer configuration
config = ContentAnalyzerConfig(
    locales=["en-US", "fr-FR"],
    return_details=True,
)

# Create the analyzer with field schema
analyzer = ContentAnalyzer(
    base_analyzer_id="prebuilt-audio",
    description=(
        "Custom analyzer for customer support calls"
    ),
    config=config,
    field_schema=field_schema,
    models={
        "completion": "gpt-5.2",
    },
)
# Create the analyzer
poller = client.begin_create_analyzer(
    analyzer_id=analyzer_id,
    resource=analyzer,
)
result = poller.result() # Wait for creation to complete

# Get the full analyzer details after creation
result = client.get_analyzer(analyzer_id=analyzer_id)
print(f"Analyzer '{analyzer_id}' created successfully!")

if result.description:
    print(f"  Description: {result.description}")

if result.field_schema and result.field_schema.fields:
    print(f"  Fields ({len(result.field_schema.fields)}):")
    for field_name, field_def in result.field_schema.fields.items():
        method = field_def.method if field_def.method else "auto"
        field_type = field_def.type if field_def.type else "unknown"
        print(f"    - {field_name}: {field_type} ({method})")
```
An example output looks like:
```text
Analyzer 'my_audio_analyzer_ID' created successfully!
  Description: Custom analyzer for customer support calls
  Fields (3):
    - Summary: ContentFieldType.STRING (GenerationMethod.GENERATE)
    - Sentiment: ContentFieldType.STRING (GenerationMethod.CLASSIFY)
    - People: ContentFieldType.ARRAY (auto)
```

> **Tip:**
> This code adapts the [create analyzer sample](https://github.com/Azure/azure-sdk-for-python/blob/main/sdk/contentunderstanding/azure-ai-contentunderstanding/samples/sample_create_analyzer.py) pattern for audio content.

# [Video](#tab/video)

The following example creates a custom video analyzer based on the [prebuilt video base analyzer](../concepts/prebuilt-analyzers.md) for processing product demos and reviews.

```python
from azure.ai.contentunderstanding.models import (
    ContentAnalyzer,
    ContentAnalyzerConfig,
    ContentFieldSchema,
    ContentFieldDefinition,
    ContentFieldType,
    GenerationMethod,
)
# Generate a unique analyzer ID
analyzer_id = f"my_video_analyzer_{int(time.time())}"

# Define field schema with custom fields
field_schema = ContentFieldSchema(
    name="video_schema",
    description=(
        "Schema for analyzing product demo videos"
    ),
    fields={
        "Segments": ContentFieldDefinition(
            type=ContentFieldType.ARRAY,
            item_definition=ContentFieldDefinition(
                type=ContentFieldType.OBJECT,
                properties={
                    "SegmentId": ContentFieldDefinition(
                        type=ContentFieldType.STRING,
                    ),
                    "Description": ContentFieldDefinition(
                        type=ContentFieldType.STRING,
                        method=GenerationMethod.GENERATE,
                        description=(
                            "Detailed summary of the "
                            "video segment"
                        ),
                    ),
                    "Sentiment": ContentFieldDefinition(
                        type=ContentFieldType.STRING,
                        method=GenerationMethod.CLASSIFY,
                        enum=[
                            "Positive", "Neutral",
                            "Negative",
                        ],
                    ),
                },
            ),
        ),
    },
)

# Create analyzer configuration
config = ContentAnalyzerConfig(
    locales=["en-US", "fr-FR"],
    return_details=True,
)

# Create the analyzer with field schema
analyzer = ContentAnalyzer(
    base_analyzer_id="prebuilt-video",
    description=(
        "Custom analyzer for product demo videos"
    ),
    config=config,
    field_schema=field_schema,
    models={
        "completion": "gpt-5.2",
    }, 
)

# Create the analyzer
poller = client.begin_create_analyzer(
    analyzer_id=analyzer_id,
    resource=analyzer,
)
result = poller.result() # Wait for creation to complete

# Get the full analyzer details after creation
result = client.get_analyzer(analyzer_id=analyzer_id)
print(f"Analyzer '{analyzer_id}' created successfully!")

if result.description:
    print(f"  Description: {result.description}")

if result.field_schema and result.field_schema.fields:
    print(f"  Fields ({len(result.field_schema.fields)}):")
    for field_name, field_def in result.field_schema.fields.items():
        method = field_def.method if field_def.method else "auto"
        field_type = field_def.type if field_def.type else "unknown"
        print(f"    - {field_name}: {field_type} ({method})")
```
An example output looks like:
```text
Analyzer 'my_video_analyzer_ID' created successfully!
  Description: Custom analyzer for product demo videos
  Fields (1):
    - Segments: ContentFieldType.ARRAY (auto)
```

> **Tip:**
> This code adapts the [create analyzer sample](https://github.com/Azure/azure-sdk-for-python/blob/main/sdk/contentunderstanding/azure-ai-contentunderstanding/samples/sample_create_analyzer.py) pattern for video content.

---

## Use the custom analyzer

# [Document](#tab/document)

After creating the analyzer, use it to analyze a document and extract the custom fields. Delete the analyzer when you no longer need it.

```python
# --- Use the custom document analyzer ---
from azure.ai.contentunderstanding.models import AnalysisInput

print("\nAnalyzing document...")
document_url = (
    "https://raw.githubusercontent.com/"
    "Azure-Samples/"
    "azure-ai-content-understanding-assets/"
    "main/document/invoice.pdf"
)

poller = client.begin_analyze(
    analyzer_id=analyzer_id,
    inputs=[AnalysisInput(url=document_url)],
)
result = poller.result()

if result.contents and len(result.contents) > 0:
    content = result.contents[0]
    if content.fields:
        company = content.fields.get("company_name")
        if company:
            print(f"Company Name: {company.value}")
            if company.confidence:
                print(
                    f"  Confidence:"
                    f" {company.confidence:.2f}"
                )

        total = content.fields.get("total_amount")
        if total:
            print(f"Total Amount: {total.value}")

        summary = content.fields.get(
            "document_summary"
        )
        if summary:
            print(f"Summary: {summary.value}")

        doc_type = content.fields.get("document_type")
        if doc_type:
            print(f"Document Type: {doc_type.value}")
else:
    print("No content returned from analysis.")

# --- Clean up ---
print(f"\nCleaning up: deleting analyzer '{analyzer_id}'...")
client.delete_analyzer(analyzer_id=analyzer_id)
print(f"Analyzer '{analyzer_id}' deleted successfully.")
```
An example output looks like:
```text
Analyzing document...
Company Name: CONTOSO LTD.
  Confidence: 0.81
Total Amount: 610.0
Summary: This document is an invoice from CONTOSO LTD. to Microsoft Corporation for consulting, document, and printing services provided during the service period. It details line items, subtotal, sales tax, total, previous unpaid balance, and the final amount due.
Document Type: invoice

Cleaning up: deleting analyzer 'my_document_analyzer_ID'...
Analyzer 'my_document_analyzer_ID' deleted successfully.
```

> **Tip:**
> Check out more examples of running analyzers at [SDK samples](https://github.com/Azure/azure-sdk-for-python/tree/main/sdk/contentunderstanding/azure-ai-contentunderstanding/samples).

# [Image](#tab/image)

After creating the analyzer, use it to analyze an image and extract the custom fields. Delete the analyzer when you no longer need it.

```python
from azure.ai.contentunderstanding.models import AnalysisInput

# --- Use the custom image analyzer ---
print("\nAnalyzing image...")
image_url = (
    "https://raw.githubusercontent.com/"
    "Azure-Samples/"
    "azure-ai-content-understanding-assets/"
    "main/image/pieChart.jpg"
)

poller = client.begin_analyze(
    analyzer_id=analyzer_id,
    inputs=[AnalysisInput(url=image_url)],
)
result = poller.result()

if result.contents and len(result.contents) > 0:
    content = result.contents[0]
    if content.fields:
        title = content.fields.get("Title")
        if title:
            print(f"Title: {title.value}")

        chart_type = content.fields.get("ChartType")
        if chart_type:
            print(f"Chart Type: {chart_type.value}")
else:
    print("No content returned from analysis.")

# --- Clean up ---
print(f"\nCleaning up: deleting analyzer '{analyzer_id}'...")
client.delete_analyzer(analyzer_id=analyzer_id)
print(f"Analyzer '{analyzer_id}' deleted successfully.")
```
An example output looks like:
```text
Analyzing image...
Title: Distribution of Weekly Working Hours
Chart Type: pie

Cleaning up: deleting analyzer 'my_image_analyzer_ID'...   
Analyzer 'my_image_analyzer_ID' deleted successfully.
```

> **Tip:**
> Check out more examples of running analyzers at [SDK samples](https://github.com/Azure/azure-sdk-for-python/tree/main/sdk/contentunderstanding/azure-ai-contentunderstanding/samples).

# [Audio](#tab/audio)

After creating the analyzer, use it to analyze an audio file and extract the custom fields. Delete the analyzer when you no longer need it.

```python
from azure.ai.contentunderstanding.models import AnalysisInput

print("\nAnalyzing audio...")
audio_url = (
    "https://raw.githubusercontent.com/"
    "Azure-Samples/"
    "azure-ai-content-understanding-assets/"
    "main/audio/callCenterRecording.mp3"
)

poller = client.begin_analyze(
    analyzer_id=analyzer_id,
    inputs=[AnalysisInput(url=audio_url)],
)
result = poller.result()

if result.contents and len(result.contents) > 0:
    content = result.contents[0]
    if content.fields:
        summary = content.fields.get("Summary")
        if summary:
            print(f"Summary: {summary.value}")

        sentiment = content.fields.get("Sentiment")
        if sentiment:
            print(f"Sentiment: {sentiment.value}")
else:
    print("No content returned from analysis.")

# --- Clean up ---
print(f"\nCleaning up: deleting analyzer '{analyzer_id}'...")
client.delete_analyzer(analyzer_id=analyzer_id)
print(f"Analyzer '{analyzer_id}' deleted successfully.")
```

An example output looks like:
```text
Analyzing audio...
Summary: Maria Smith contacted Contoso to inquire about her current point balance. John Doe, the representative, verified her identity by requesting her date of birth and informed her that her balance is 599 points. Maria confirmed she needed no further information and ended the call.
Sentiment: Positive

Cleaning up: deleting analyzer 'my_audio_analyzer_ID'...
Analyzer 'my_audio_analyzer_ID' deleted successfully.
```

> **Tip:**
> Check out more examples of running analyzers at [SDK samples](https://github.com/Azure/azure-sdk-for-python/tree/main/sdk/contentunderstanding/azure-ai-contentunderstanding/samples).

# [Video](#tab/video)

After creating the analyzer, use it to analyze a video and extract the custom fields. Delete the analyzer when you no longer need it.

```python
from azure.ai.contentunderstanding.models import AnalysisInput

print("\nAnalyzing video...")
video_url = (
    "https://raw.githubusercontent.com/"
    "Azure-Samples/"
    "azure-ai-content-understanding-assets/"
    "main/videos/sdk_samples/FlightSimulator.mp4"
)

poller = client.begin_analyze(
    analyzer_id=analyzer_id,
    inputs=[AnalysisInput(url=video_url)],
)
result = poller.result()

if result.contents and len(result.contents) > 0:
    content = result.contents[0]
    if content.fields:
        segments = content.fields.get("Segments")
        if segments and segments.value:
            print(f"Found {len(segments.value)} segments")
            for i, segment in enumerate(
                segments.value
            ):
                if segment.value:
                    seg_id = segment.value.get(
                        "SegmentId"
                    )
                    desc = segment.value.get(
                        "Description"
                    )
                    print(f"Segment {i + 1}:")
                    if seg_id:
                        print(
                            f"  ID: {seg_id.value}"
                        )
                    if desc:
                        print(
                            f"  Desc: {desc.value}"
                        )
else:
    print("No content returned from analysis.")

# --- Clean up ---
print(f"\nCleaning up: deleting analyzer '{analyzer_id}'...")
client.delete_analyzer(analyzer_id=analyzer_id)
print(f"Analyzer '{analyzer_id}' deleted successfully.")
```
An example output looks like:
```text
Analyzing video...
Found 16 segments
Segment 1:
  ID: 00:00:00.000-00:00:01.467
  Desc: The video opens with a scenic aerial view of an island, featuring a small airplane flying over the landscape. The screen displays the logos for 'Flight Simulator' and 'Microsoft Azure AI,' indicating a collaboration or integration between the two products.
Segment 2:
  ID: 00:00:01.467-00:00:03.233
  Desc: A man is shown sitting in a modern office setting, likely preparing to speak or introduce the topic. The background features geometric wall decorations and a plant, giving a professional and contemporary atmosphere.
Segment 3:
  ID: 00:00:03.233-00:00:07.367
  Desc: The segment displays a close-up of audio waveforms on a screen, visually representing sound data. This is accompanied by narration about the importance of good data for neural TTS (Text-to-Speech) and the process of building a universal TTS model using 3,000 hours of data.
Segment 4:
  ID: 00:00:07.367-00:00:08.200
  Desc: Another man appears in a similar office environment, possibly continuing the explanation or providing additional insights about the TTS model.
Segment 5:
  ID: 00:00:08.200-00:00:11.367
  Desc: The video transitions to an outdoor scene showing a large facility surrounded by fields, likely representing a data center or server farm. This visual supports the narration about accumulating large amounts of data for the universal TTS model.
Segment 6:
  ID: 00:00:11.367-00:00:13.567
  Desc: Inside a data center, rows of servers are shown, emphasizing the technological infrastructure required for processing and storing vast amounts of audio data.
Segment 7:
  ID: 00:00:13.567-00:00:16.100
  Desc: The first man returns, continuing his explanation in the office setting. The narration discusses how the universal model captures audio nuances to generate more natural voices.
Segment 8:
  ID: 00:00:16.100-00:00:19.433
  Desc: A biplane is seen flying over a picturesque landscape, reinforcing the connection to Flight Simulator and showcasing the realism enabled by advanced AI voice technology.
Segment 9:
  ID: 00:00:19.433-00:00:23.967
  Desc: A plane flies past a castle surrounded by lush greenery and mountains, further highlighting the immersive environments possible in Flight Simulator. The narration continues to emphasize the natural quality of AI-generated voices.
Segment 10:
  ID: 00:00:23.967-00:00:30.033
  Desc: A bald man is interviewed in a modern office space, discussing the high fidelity and human-like quality of voices produced by cognitive services offerings. The background features glass walls and plants, maintaining a professional tone.
Segment 11:
  ID: 00:00:30.033-00:00:33.200
  Desc: The interview continues with the bald man, focusing on the benefits of the AI voice technology. The setting remains consistent, reinforcing the credibility and expertise of the speaker.        
Segment 12:
  ID: 00:00:33.200-00:00:35.267
  Desc: The video shifts to a top-down view of an airplane on a runway, preparing for movement. This visual ties back to the Flight Simulator theme and the realism of the simulation.
Segment 13:
  ID: 00:00:35.267-00:00:37.700
  Desc: A ground crew member directs an Airbus aircraft, with pilots visible in the cockpit. The scene demonstrates realistic airport operations, likely enhanced by AI-driven voice interactions.       
Segment 14:
  ID: 00:00:37.700-00:00:39.200
  Desc: Two ground crew members walk near an airplane on the tarmac, with airport buildings in the background. The visuals continue to showcase the detailed simulation environment.
Segment 15:
  ID: 00:00:39.200-00:00:42.033
  Desc: A close-up of an Airbus aircraft at the gate, with sunlight illuminating the scene. The realism of the simulation is highlighted, possibly referencing the natural-sounding AI voices used in communications.
Segment 16:
  ID: 00:00:42.033-00:00:43.866
  Desc: The video concludes with the Microsoft logo and branding, signaling the end of the product demo and reinforcing the association with Microsoft Azure AI.

Cleaning up: deleting analyzer 'my_video_analyzer_ID'...   
Analyzer 'my_video_analyzer_ID' deleted successfully. 
```

> **Tip:**
> Check out more examples of running analyzers at [SDK samples](https://github.com/Azure/azure-sdk-for-python/tree/main/sdk/contentunderstanding/azure-ai-contentunderstanding/samples).

---









**Applies to: programming-language-csharp**



<!-- markdownlint-disable MD025 -->

[Client library](https://www.nuget.org/packages/Azure.AI.ContentUnderstanding) | [Samples](https://github.com/Azure/azure-sdk-for-net/tree/main/sdk/contentunderstanding/Azure.AI.ContentUnderstanding/samples) | [SDK source](https://github.com/Azure/azure-sdk-for-net/tree/main/sdk/contentunderstanding/Azure.AI.ContentUnderstanding)

This guide shows you how to use the Content Understanding .NET SDK to create a custom analyzer that extracts structured data from your content. Custom analyzers support document, image, audio, and video content types.

## Prerequisites

* An active Azure subscription. If you don't have an Azure account, [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
* A [Microsoft Foundry resource](https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry) created in a [supported region](../language-region-support.md).
* Your resource endpoint and API key (found under **Keys and Endpoint** in the Azure portal).
* Model deployment defaults configured for your resource. See [Models and deployments](../concepts/models-deployments.md) or this one-time [configuration script](https://github.com/Azure/azure-sdk-for-net/blob/main/sdk/contentunderstanding/Azure.AI.ContentUnderstanding/samples/Sample00_UpdateDefaults.md) for setup instructions.
* The current version of [.NET](https://dotnet.microsoft.com/download/dotnet).

## Set up

1. Create a new .NET console application:

    ```console
    dotnet new console -n CustomAnalyzerTutorial
    cd CustomAnalyzerTutorial
    ```

1. Install the Content Understanding client library for .NET:

    ```console
    dotnet add package Azure.AI.ContentUnderstanding
    ```

1. Optionally, install the Azure Identity library for Microsoft Entra authentication:

    ```console
    dotnet add package Azure.Identity
    ```

## Set up environment variables

To authenticate with the Content Understanding service, set the environment variables with your own values before running the sample:
- `CONTENTUNDERSTANDING_ENDPOINT` - the endpoint to your Content Understanding resource.
- `CONTENTUNDERSTANDING_KEY` - your Content Understanding API key (optional if using [Microsoft Entra ID](../concepts/secure-communications.md) DefaultAzureCredential).

### Windows

```cmd
setx CONTENTUNDERSTANDING_ENDPOINT "your-endpoint"
setx CONTENTUNDERSTANDING_KEY "your-key"
```

### Linux / macOS

```bash
export CONTENTUNDERSTANDING_ENDPOINT="your-endpoint"
export CONTENTUNDERSTANDING_KEY="your-key"
```

## Create the client

```csharp
using Azure;
using Azure.AI.ContentUnderstanding;

string endpoint = Environment.GetEnvironmentVariable(
    "CONTENTUNDERSTANDING_ENDPOINT");
string key = Environment.GetEnvironmentVariable(
    "CONTENTUNDERSTANDING_KEY");

var client = new ContentUnderstandingClient(
    new Uri(endpoint),
    new AzureKeyCredential(key)
);
```

## Create a custom analyzer

# [Document](#tab/document)

The following example creates a custom document analyzer based on the [prebuilt document analyzer](../concepts/prebuilt-analyzers.md). It defines fields using three extraction methods: `extract` for literal text, `generate` for AI-generated summaries, and `classify` for categorization.

```csharp
string analyzerId =
    $"my_document_analyzer_{DateTimeOffset.UtcNow.ToUnixTimeSeconds()}";

var fieldSchema = new ContentFieldSchema(
    new Dictionary<string, ContentFieldDefinition>
    {
        ["company_name"] = new ContentFieldDefinition
        {
            Type = ContentFieldType.String,
            Method = GenerationMethod.Extract,
            Description = "Name of the company"
        },
        ["total_amount"] = new ContentFieldDefinition
        {
            Type = ContentFieldType.Number,
            Method = GenerationMethod.Extract,
            Description =
                "Total amount on the document"
        },
        ["document_summary"] = new ContentFieldDefinition
        {
            Type = ContentFieldType.String,
            Method = GenerationMethod.Generate,
            Description =
                "A brief summary of the document content"
        },
        ["document_type"] = new ContentFieldDefinition
        {
            Type = ContentFieldType.String,
            Method = GenerationMethod.Classify,
            Description = "Type of document"
        }
    })
{
    Name = "company_schema",
    Description =
        "Schema for extracting company information"
};

fieldSchema.Fields["document_type"].Enum.Add("invoice");
fieldSchema.Fields["document_type"].Enum.Add("receipt");
fieldSchema.Fields["document_type"].Enum.Add("contract");
fieldSchema.Fields["document_type"].Enum.Add("report");
fieldSchema.Fields["document_type"].Enum.Add("other");

var config = new ContentAnalyzerConfig
{
    EnableFormula = true,
    EnableLayout = true,
    EnableOcr = true,
    EstimateFieldSourceAndConfidence = true,
    ShouldReturnDetails = true
};

var customAnalyzer = new ContentAnalyzer
{
    BaseAnalyzerId = "prebuilt-document",
    Description =
        "Custom analyzer for extracting"
        + " company information",
    Config = config,
    FieldSchema = fieldSchema
};

customAnalyzer.Models["completion"] = "gpt-5.2";
customAnalyzer.Models["embedding"] =
    "text-embedding-3-large"; // Required when using field_schema and prebuilt-document base analyzer

var operation = await client.CreateAnalyzerAsync(
    WaitUntil.Completed,
    analyzerId,
    customAnalyzer);

ContentAnalyzer result = operation.Value;
Console.WriteLine(
    $"Analyzer '{analyzerId}'"
    + " created successfully!");

// Get the full analyzer details after creation
var analyzerDetails =
    await client.GetAnalyzerAsync(analyzerId);
result = analyzerDetails.Value;

if (result.Description != null)
{
    Console.WriteLine(
        $"  Description: {result.Description}");
}

if (result.FieldSchema?.Fields != null)
{
    Console.WriteLine(
        $"  Fields"
        + $" ({result.FieldSchema.Fields.Count}):");
    foreach (var kvp
        in result.FieldSchema.Fields)
    {
        var method =
            kvp.Value.Method?.ToString()
            ?? "auto";
        var fieldType =
            kvp.Value.Type?.ToString()
            ?? "unknown";
        Console.WriteLine(
            $"    - {kvp.Key}:"
            + $" {fieldType} ({method})");
    }
}
```

An example output looks like:

```text
Analyzer 'my_document_analyzer_ID' created successfully!
  Description: Custom analyzer for extracting company information
  Fields (4):
    - company_name: string (extract)
    - total_amount: number (extract)
    - document_summary: string (generate)
    - document_type: string (classify)
```
> **Tip:**
> This code is based on [Create Analyzer sample](https://github.com/Azure/azure-sdk-for-net/blob/main/sdk/contentunderstanding/Azure.AI.ContentUnderstanding/samples/Sample04_CreateAnalyzer.md) in the SDK repository.


Optionally, you can create a classifier analyzer to categorize documents and use its results to route documents to prebuilt or custom analyzers you created. Here is an example of creating a custom analyzer for classification workflows.

```csharp
// Generate a unique analyzer ID
string classifierId =
    $"my_classifier_{DateTimeOffset.UtcNow.ToUnixTimeSeconds()}";

Console.WriteLine(
    $"Creating classifier '{classifierId}'...");

// Define content categories for classification
var classifierConfig = new ContentAnalyzerConfig
{
    ShouldReturnDetails = true,
    EnableSegment = true
};

classifierConfig.ContentCategories
    .Add("Loan_Application",
        new ContentCategoryDefinition
        {
            Description =
                "Documents submitted by individuals"
                + " or businesses to request"
                + " funding, typically including"
                + " personal or business details,"
                + " financial history, loan amount,"
                + " purpose, and supporting"
                + " documentation."
        });

classifierConfig.ContentCategories
    .Add("Invoice",
        new ContentCategoryDefinition
        {
            Description =
                "Billing documents issued by"
                + " sellers or service providers"
                + " to request payment for goods"
                + " or services, detailing items,"
                + " prices, taxes, totals, and"
                + " payment terms."
        });

classifierConfig.ContentCategories
    .Add("Bank_Statement",
        new ContentCategoryDefinition
        {
            Description =
                "Official statements issued by"
                + " banks that summarize account"
                + " activity over a period,"
                + " including deposits,"
                + " withdrawals, fees,"
                + " and balances."
        });

// Create the classifier analyzer
var classifierAnalyzer = new ContentAnalyzer
{
    BaseAnalyzerId = "prebuilt-document",
    Description =
        "Custom classifier for financial"
        + " document categorization",
    Config = classifierConfig
};

classifierAnalyzer.Models["completion"] =
    "gpt-5.2";

var classifierOp =
    await client.CreateAnalyzerAsync(
        WaitUntil.Completed,
        classifierId,
        classifierAnalyzer);

// Get the full classifier details
var classifierDetails =
    await client.GetAnalyzerAsync(classifierId);
var classifierResult =
    classifierDetails.Value;

Console.WriteLine(
    $"Classifier '{classifierId}'"
    + " created successfully!");

if (classifierResult.Description != null)
{
    Console.WriteLine(
        $"  Description:"
        + $" {classifierResult.Description}");
}
```

> **Tip:**
> This code is based on the [Create Classifier Sample](https://github.com/Azure/azure-sdk-for-net/blob/main/sdk/contentunderstanding/Azure.AI.ContentUnderstanding/samples/Sample05_CreateClassifier.md) for classification workflows.



# [Image](#tab/image)

The following example creates a custom image analyzer based on the [prebuilt image analyzer](../concepts/prebuilt-analyzers.md) for processing charts and graphs.

```csharp
string analyzerId =
    $"my_image_analyzer_{DateTimeOffset.UtcNow.ToUnixTimeSeconds()}";

var fieldSchema = new ContentFieldSchema(
    new Dictionary<string, ContentFieldDefinition>
    {
        ["Title"] = new ContentFieldDefinition
        {
            Type = ContentFieldType.String,
            Description = "Title of the chart"
        },
        ["ChartType"] = new ContentFieldDefinition
        {
            Type = ContentFieldType.String,
            Method = GenerationMethod.Classify,
            Description = "Type of chart"
        }
    })
{
    Name = "chart_schema",
    Description =
        "Schema for extracting chart information"
};

fieldSchema.Fields["ChartType"].Enum.Add("bar");
fieldSchema.Fields["ChartType"].Enum.Add("line");
fieldSchema.Fields["ChartType"].Enum.Add("pie");

var customAnalyzer = new ContentAnalyzer
{
    BaseAnalyzerId = "prebuilt-image",
    Description =
        "Custom analyzer for charts and graphs",
    FieldSchema = fieldSchema
};

customAnalyzer.Models["completion"] = "gpt-5.2";

var operation = await client.CreateAnalyzerAsync(
    WaitUntil.Completed,
    analyzerId,
    customAnalyzer);

ContentAnalyzer result = operation.Value;
Console.WriteLine(
    $"Analyzer '{analyzerId}'"
    + " created successfully!");

// Get the full analyzer details after creation
var analyzerDetails =
    await client.GetAnalyzerAsync(analyzerId);
result = analyzerDetails.Value;

if (result.Description != null)
{
    Console.WriteLine(
        $"  Description: {result.Description}");
}

if (result.FieldSchema?.Fields != null)
{
    Console.WriteLine(
        $"  Fields"
        + $" ({result.FieldSchema.Fields.Count}):");
    foreach (var kvp
        in result.FieldSchema.Fields)
    {
        var method =
            kvp.Value.Method?.ToString()
            ?? "auto";
        var fieldType =
            kvp.Value.Type?.ToString()
            ?? "unknown";
        Console.WriteLine(
            $"    - {kvp.Key}:"
            + $" {fieldType} ({method})");
    }
}
```

An example output looks like: 

```text
Analyzer 'my_image_analyzer_ID' created successfully!
  Description: Custom analyzer for charts and graphs
  Fields (2):
    - Title: string (auto)
    - ChartType: string (classify)
```

> **Tip:**
> This code adapts the [Create Analyzer sample](https://github.com/Azure/azure-sdk-for-net/blob/main/sdk/contentunderstanding/Azure.AI.ContentUnderstanding/samples/Sample04_CreateAnalyzer.md) pattern for image content.

# [Audio](#tab/audio)

The following example creates a custom audio analyzer based on the [prebuilt audio analyzer](../concepts/prebuilt-analyzers.md) for processing customer support call recordings.

```csharp
string analyzerId =
    $"my_audio_analyzer_{DateTimeOffset.UtcNow.ToUnixTimeSeconds()}";

var fieldSchema = new ContentFieldSchema(
    new Dictionary<string, ContentFieldDefinition>
    {
        ["Summary"] = new ContentFieldDefinition
        {
            Type = ContentFieldType.String,
            Method = GenerationMethod.Generate,
            Description = "Summary of the call"
        },
        ["Sentiment"] = new ContentFieldDefinition
        {
            Type = ContentFieldType.String,
            Method = GenerationMethod.Classify,
            Description =
                "Overall sentiment of the call"
        },
    })
{
    Name = "call_center_schema",
    Description =
        "Schema for analyzing customer"
        + " support calls"
};

fieldSchema.Fields["Sentiment"]
    .Enum.Add("Positive");
fieldSchema.Fields["Sentiment"]
    .Enum.Add("Neutral");
fieldSchema.Fields["Sentiment"]
    .Enum.Add("Negative");

var config = new ContentAnalyzerConfig
{
    ShouldReturnDetails = true
};

config.Locales.Add("en-US");
config.Locales.Add("fr-FR");

var customAnalyzer = new ContentAnalyzer
{
    BaseAnalyzerId = "prebuilt-audio",
    Description =
        "Custom analyzer for customer"
        + " support calls",
    Config = config,
    FieldSchema = fieldSchema
};

customAnalyzer.Models["completion"] = "gpt-5.2";

var operation = await client.CreateAnalyzerAsync(
    WaitUntil.Completed,
    analyzerId,
    customAnalyzer);

ContentAnalyzer result = operation.Value;
Console.WriteLine(
    $"Analyzer '{analyzerId}'"
    + " created successfully!");

// Get the full analyzer details after creation
var analyzerDetails =
    await client.GetAnalyzerAsync(analyzerId);
result = analyzerDetails.Value;

if (result.Description != null)
{
    Console.WriteLine(
        $"  Description: {result.Description}");
}

if (result.FieldSchema?.Fields != null)
{
    Console.WriteLine(
        $"  Fields"
        + $" ({result.FieldSchema.Fields.Count}):");
    foreach (var kvp
        in result.FieldSchema.Fields)
    {
        var method =
            kvp.Value.Method?.ToString()
            ?? "auto";
        var fieldType =
            kvp.Value.Type?.ToString()
            ?? "unknown";
        Console.WriteLine(
            $"    - {kvp.Key}:"
            + $" {fieldType} ({method})");
    }
}
```

An example output looks like:

```text
Analyzer 'my_audio_analyzer_ID' created successfully!
  Description: Custom analyzer for customer support calls
  Fields (2):
    - Summary: string (generate)
    - Sentiment: string (classify)
```

> **Tip:**
> This code adapts the [Create Analyzer sample](https://github.com/Azure/azure-sdk-for-net/blob/main/sdk/contentunderstanding/Azure.AI.ContentUnderstanding/samples/Sample04_CreateAnalyzer.md) pattern for audio content.

# [Video](#tab/video)

The following example creates a custom video analyzer based on the [prebuilt video analyzer](../concepts/prebuilt-analyzers.md) for processing product demos and reviews.

```csharp
string analyzerId =
    $"my_video_analyzer_{DateTimeOffset.UtcNow.ToUnixTimeSeconds()}";

var segmentItemDef = new ContentFieldDefinition
{
    Type = ContentFieldType.Object
};
segmentItemDef.Properties.Add("SegmentId",
    new ContentFieldDefinition
    {
        Type = ContentFieldType.String
    });
segmentItemDef.Properties.Add("Description",
    new ContentFieldDefinition
    {
        Type = ContentFieldType.String,
        Method = GenerationMethod.Generate,
        Description =
            "Detailed summary of the "
            + "video segment"
    });
segmentItemDef.Properties.Add("Sentiment",
    new ContentFieldDefinition
    {
        Type = ContentFieldType.String,
        Method = GenerationMethod.Classify
    });

var segmentsDef = new ContentFieldDefinition
{
    Type = ContentFieldType.Array
};
segmentsDef.ItemDefinition = segmentItemDef;

var fieldSchema = new ContentFieldSchema(
    new Dictionary<string, ContentFieldDefinition>
    {
        ["Segments"] = segmentsDef
    })
{
    Name = "video_schema",
    Description =
        "Schema for analyzing product"
        + " demo videos"
};

var sentimentDef =
    fieldSchema.Fields["Segments"]
        .ItemDefinition.Properties["Sentiment"];
sentimentDef.Enum.Add("Positive");
sentimentDef.Enum.Add("Neutral");
sentimentDef.Enum.Add("Negative");

var config = new ContentAnalyzerConfig
{
    ShouldReturnDetails = true
};

config.Locales.Add("en-US");
config.Locales.Add("fr-FR");

var customAnalyzer = new ContentAnalyzer
{
    BaseAnalyzerId = "prebuilt-video",
    Description =
        "Custom analyzer for product"
        + " demo videos",
    Config = config,
    FieldSchema = fieldSchema
};

customAnalyzer.Models["completion"] = "gpt-5.2";

var operation = await client.CreateAnalyzerAsync(
    WaitUntil.Completed,
    analyzerId,
    customAnalyzer);

ContentAnalyzer result = operation.Value;
Console.WriteLine(
    $"Analyzer '{analyzerId}'"
    + " created successfully!");

// Get the full analyzer details after creation
var analyzerDetails =
    await client.GetAnalyzerAsync(analyzerId);
result = analyzerDetails.Value;

if (result.Description != null)
{
    Console.WriteLine(
        $"  Description: {result.Description}");
}

if (result.FieldSchema?.Fields != null)
{
    Console.WriteLine(
        $"  Fields"
        + $" ({result.FieldSchema.Fields.Count}):");
    foreach (var kvp
        in result.FieldSchema.Fields)
    {
        var method =
            kvp.Value.Method?.ToString()
            ?? "auto";
        var fieldType =
            kvp.Value.Type?.ToString()
            ?? "unknown";
        Console.WriteLine(
            $"    - {kvp.Key}:"
            + $" {fieldType} ({method})");
    }
}
```
An example output looks like:

```text
Analyzer 'my_video_analyzer_ID' created successfully!
  Description: Custom analyzer for product demo videos
  Fields (1):
    - Segments: Array (auto)
```

> **Tip:**
> This code adapts the [Create Analyzer sample](https://github.com/Azure/azure-sdk-for-net/blob/main/sdk/contentunderstanding/Azure.AI.ContentUnderstanding/samples/Sample04_CreateAnalyzer.md) pattern for video content.

---

## Use the custom analyzer

# [Document](#tab/document)

After creating the analyzer, use it to analyze a document and extract the custom fields. Delete the analyzer when you no longer need it.

```csharp
var documentUrl = new Uri(
    "https://raw.githubusercontent.com/"
    + "Azure-Samples/"
    + "azure-ai-content-understanding-assets/"
    + "main/document/invoice.pdf"
);

var analyzeOperation = await client.AnalyzeAsync(
    WaitUntil.Completed,
    analyzerId,
    inputs: new[] {
        new AnalysisInput { Uri = documentUrl }
    });

var analyzeResult = analyzeOperation.Value;

if (analyzeResult.Contents?.FirstOrDefault()
    is DocumentContent content)
{
    if (content.Fields.TryGetValue(
        "company_name", out var companyField))
    {
        var name =
            companyField is ContentStringField sf
                ? sf.Value : null;
        Console.WriteLine(
            $"Company Name: "
            + $"{name ?? "(not found)"}");
        Console.WriteLine(
            "  Confidence: "
            + (companyField.Confidence?
                .ToString("F2") ?? "N/A"));
    }

    if (content.Fields.TryGetValue(
        "total_amount", out var totalField))
    {
        var total =
            totalField is ContentNumberField nf
                ? nf.Value : null;
        Console.WriteLine(
            $"Total Amount: {total}");
    }

    if (content.Fields.TryGetValue(
        "document_summary", out var summaryField))
    {
        var summary =
            summaryField is ContentStringField sf
                ? sf.Value : null;
        Console.WriteLine(
            $"Summary: "
            + $"{summary ?? "(not found)"}");
    }

    if (content.Fields.TryGetValue(
        "document_type", out var typeField))
    {
        var docType =
            typeField is ContentStringField sf
                ? sf.Value : null;
        Console.WriteLine(
            $"Document Type: "
            + $"{docType ?? "(not found)"}");
    }
}

// --- Clean up ---
Console.WriteLine(
    $"\nCleaning up: deleting analyzer"
    + $" '{analyzerId}'...");
await client.DeleteAnalyzerAsync(analyzerId);
Console.WriteLine(
    $"Analyzer '{analyzerId}'"
    + " deleted successfully.");
```

An example output looks like:

```text
Company Name: CONTOSO LTD.
  Confidence: 0.88
Total Amount: 610
Summary: This document is an invoice from CONTOSO LTD. to MICROSOFT CORPORATION for consulting services, document fees, and printing fees, detailing service periods, billing and shipping addresses, itemized charges, and the total amount due.
Document Type: invoice

Cleaning up: deleting analyzer 'my_document_analyzer_ID'...
Analyzer 'my_document_analyzer_ID' deleted successfully.
```

> **Tip:**
> Check out more examples of running analyzers at [.NET SDK samples](https://github.com/Azure/azure-sdk-for-net/tree/main/sdk/contentunderstanding/Azure.AI.ContentUnderstanding/samples).

# [Image](#tab/image)

After creating the analyzer, use it to analyze an image and extract the custom fields. Delete the analyzer when you no longer need it.

```csharp
var imageUrl = new Uri(
    "https://raw.githubusercontent.com/"
    + "Azure-Samples/"
    + "azure-ai-content-understanding-assets/"
    + "main/image/pieChart.jpg"
);

var analyzeOperation = await client.AnalyzeAsync(
    WaitUntil.Completed,
    analyzerId,
    inputs: new[] {
        new AnalysisInput { Uri = imageUrl }
    });

var analyzeResult = analyzeOperation.Value;

if (analyzeResult.Contents?.FirstOrDefault()
    is DocumentContent content)
{
    if (content.Fields.TryGetValue(
        "Title", out var titleField))
    {
        var title =
            titleField is ContentStringField sf
                ? sf.Value : null;
        Console.WriteLine(
            $"Title: {title ?? "(not found)"}");
    }

    if (content.Fields.TryGetValue(
        "ChartType", out var chartField))
    {
        var chartType =
            chartField is ContentStringField sf
                ? sf.Value : null;
        Console.WriteLine(
            $"Chart Type: "
            + $"{chartType ?? "(not found)"}");
    }
}

// --- Clean up ---
Console.WriteLine(
    $"\nCleaning up: deleting analyzer"
    + $" '{analyzerId}'...");
await client.DeleteAnalyzerAsync(analyzerId);
Console.WriteLine(
    $"Analyzer '{analyzerId}'"
    + " deleted successfully.");
```

An example output looks like:

```text
Title: Distribution of Weekly Working Hours
Chart Type: pie

Cleaning up: deleting analyzer 'my_image_analyzer_ID'...
Analyzer 'my_image_analyzer_ID' deleted successfully.
```

> **Tip:**
> Check out more examples of running analyzers at [.NET SDK samples](https://github.com/Azure/azure-sdk-for-net/tree/main/sdk/contentunderstanding/Azure.AI.ContentUnderstanding/samples).

# [Audio](#tab/audio)

After creating the analyzer, use it to analyze an audio file and extract the custom fields. Delete the analyzer when you no longer need it.

```csharp
var audioUrl = new Uri(
    "https://raw.githubusercontent.com/"
    + "Azure-Samples/"
    + "azure-ai-content-understanding-assets/"
    + "main/audio/callCenterRecording.mp3"
);

var analyzeOperation = await client.AnalyzeAsync(
    WaitUntil.Completed,
    analyzerId,
    inputs: new[] {
        new AnalysisInput { Uri = audioUrl }
    });

var analyzeResult = analyzeOperation.Value;

if (analyzeResult.Contents?.Count > 0)
{
    var content = analyzeResult.Contents[0];
    if (content.Fields != null)
    {
        if (content.Fields.TryGetValue(
            "Summary", out var summaryField))
        {
            var summary =
                summaryField
                    is ContentStringField sf
                    ? sf.Value : null;
            Console.WriteLine(
                $"Summary: "
                + $"{summary ?? "(not found)"}");
        }

        if (content.Fields.TryGetValue(
            "Sentiment", out var sentField))
        {
            var sentiment =
                sentField
                    is ContentStringField sf
                    ? sf.Value : null;
            Console.WriteLine(
                $"Sentiment: "
                + $"{sentiment ?? "(not found)"}");
        }
    }
}

// --- Clean up ---
Console.WriteLine(
    $"\nCleaning up: deleting analyzer"
    + $" '{analyzerId}'...");
await client.DeleteAnalyzerAsync(analyzerId);
Console.WriteLine(
    $"Analyzer '{analyzerId}'"
    + " deleted successfully.");
```

An example output looks like:

```text
Summary: Maria Smith contacted Contoso to inquire about her current point balance. John Doe, the representative, verified her identity by requesting her date of birth and informed her that her balance is 599 points. Maria confirmed she needed no further information and ended the call.
Sentiment: Positive

Cleaning up: deleting analyzer 'my_audio_analyzer_ID'...
Analyzer 'my_audio_analyzer_ID' deleted successfully.
```

> **Tip:**
> Check out more examples of running analyzers at [.NET SDK samples](https://github.com/Azure/azure-sdk-for-net/tree/main/sdk/contentunderstanding/Azure.AI.ContentUnderstanding/samples).

# [Video](#tab/video)

After creating the analyzer, use it to analyze a video and extract the custom fields. Delete the analyzer when you no longer need it.

```csharp
var videoUrl = new Uri(
    "https://raw.githubusercontent.com/"
    + "Azure-Samples/"
    + "azure-ai-content-understanding-assets/"
    + "main/videos/sdk_samples/"
    + "FlightSimulator.mp4"
);

var analyzeOperation = await client.AnalyzeAsync(
    WaitUntil.Completed,
    analyzerId,
    inputs: new[] {
        new AnalysisInput { Uri = videoUrl }
    });

var analyzeResult = analyzeOperation.Value;

if (analyzeResult.Contents?.Count > 0)
{
    var content = analyzeResult.Contents[0];
    if (content.Fields != null
        && content.Fields.TryGetValue(
            "Segments", out var segmentsField)
        && segmentsField
            is ContentArrayField segmentsArr)
    {
        Console.WriteLine(
            $"Segments ({segmentsArr.Count}):");
        for (int i = 0;
            i < segmentsArr.Count; i++)
        {
            if (segmentsArr[i]
                is ContentObjectField segObj
                && segObj.Value != null)
            {
                Console.WriteLine(
                    $"  Segment {i + 1}:");
                if (segObj.Value.TryGetValue(
                    "Description",
                    out var descField))
                {
                    var desc =
                        descField
                            is ContentStringField sf
                            ? sf.Value : null;
                    Console.WriteLine(
                        $"    Description: "
                        + $"{desc ?? "(none)"}");
                }
                if (segObj.Value.TryGetValue(
                    "Sentiment",
                    out var sentField))
                {
                    var sent =
                        sentField
                            is ContentStringField sf
                            ? sf.Value : null;
                    Console.WriteLine(
                        $"    Sentiment: "
                        + $"{sent ?? "(none)"}");
                }
            }
        }
    }
}

// --- Clean up ---
Console.WriteLine(
    $"\nCleaning up: deleting analyzer"
    + $" '{analyzerId}'...");
await client.DeleteAnalyzerAsync(analyzerId);
Console.WriteLine(
    $"Analyzer '{analyzerId}'"
    + " deleted successfully.");
```

An example output looks like:

```text
Segments (16):
  Segment 1:
    Description: The video opens with a scenic aerial view of an island, featuring a small airplane flying over the landscape. The screen displays the logos for 'Flight Simulator' and 'Microsoft Azure AI,' indicating a collaboration or integration between the two.
    Sentiment: Positive
  Segment 2:
    Description: A man is shown sitting in a modern office environment, likely preparing to speak or introduce the topic. The background features geometric wall lights and a plant, giving a professional and contemporary feel.
    Sentiment: Neutral
  Segment 3:
    Description: The segment displays a close-up of audio waveforms on a screen, visually representing sound data. The accompanying audio discusses the importance of good data for neural TTS (Text-to-Speech) to achieve a high-quality voice.
    Sentiment: Neutral
  Segment 4:
    Description: Another man appears in a similar office setting, possibly continuing the explanation or providing additional commentary about the TTS model.
    Sentiment: Neutral
  Segment 5:
    Description: The video transitions to an outdoor scene showing a large facility surrounded by fields under a clear sky. This likely represents the data centers or infrastructure used for building the universal TTS model.
    Sentiment: Neutral
  Segment 6:
    Description: The segment moves inside a data center, showing rows of servers and high-tech equipment. This visual emphasizes the scale and technological sophistication behind the TTS model's development.
    Sentiment: Neutral
  Segment 7:
    Description: The first man returns, continuing his explanation in the office setting. The transcript mentions accumulating large amounts of data to capture audio nuances and generate natural voices.
    Sentiment: Positive
  Segment 8:
    Description: A biplane is shown flying over a picturesque landscape, highlighting the realism and immersive experience of the Flight Simulator. This visual connects the product's capabilities to the natural-sounding voices enabled by Azure AI.
    Sentiment: Positive
  Segment 9:
    Description: The segment features a plane flying near a castle surrounded by lush greenery and mountains. The visuals reinforce the immersive environments possible in Flight Simulator, enhanced by advanced AI voice technology.
    Sentiment: Positive
  Segment 10:
    Description: A bald man is interviewed in a modern office space, likely discussing the benefits of cognitive services offerings, such as higher fidelity and more human-like voices, as mentioned in the transcript.
    Sentiment: Positive
  Segment 11:
    Description: The interview continues with the bald man, focusing on the advantages of Azure AI's TTS technology. The transcript notes that the voices sound much more like actual human voices.
    Sentiment: Positive
  Segment 12:
    Description: The video shifts to an overhead view of an airplane on the runway, possibly preparing for pushback. This visual ties into the transcript mentioning 'Orlando ground 9555 requesting the end of pushback.'
    Sentiment: Neutral
  Segment 13:
    Description: A ground crew member directs an Airbus aircraft, with pilots visible in the cockpit. The transcript includes communication about pushback, demonstrating realistic voice interactions in the simulator.
    Sentiment: Neutral
  Segment 14:
    Description: Ground crew members are seen walking near airplanes on the tarmac, reinforcing the realism and operational detail in the Flight Simulator environment.
    Sentiment: Neutral
  Segment 15:
    Description: A close-up of an Airbus aircraft at the gate, with the transcript confirming the end of pushback. This segment highlights the simulator's attention to detail and realistic voice communications.
    Sentiment: Neutral
  Segment 16:
    Description: The video concludes with the Microsoft logo and branding, signaling the end of the product demo and reinforcing the partnership between Flight Simulator and Microsoft Azure AI.
    Sentiment: Positive

Cleaning up: deleting analyzer 'my_video_analyzer_ID'...
Analyzer 'my_video_analyzer_ID' deleted successfully.
```

> **Tip:**
> Check out more examples of running analyzers at [.NET SDK samples](https://github.com/Azure/azure-sdk-for-net/tree/main/sdk/contentunderstanding/Azure.AI.ContentUnderstanding/samples).

---







**Applies to: programming-language-java**



<!-- markdownlint-disable MD025 -->

[Client library](https://central.sonatype.com/artifact/com.azure/azure-ai-contentunderstanding) | [Samples](https://github.com/Azure/azure-sdk-for-java/tree/main/sdk/contentunderstanding/azure-ai-contentunderstanding/src/samples/java/com/azure/ai/contentunderstanding) | [SDK source](https://github.com/Azure/azure-sdk-for-java/tree/main/sdk/contentunderstanding/azure-ai-contentunderstanding)

This guide shows you how to use the Content Understanding Java SDK to create a custom analyzer that extracts structured data from your content. Custom analyzers support document, image, audio, and video content types.

## Prerequisites

* An active Azure subscription. If you don't have an Azure account, [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
* A [Microsoft Foundry resource](https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry) created in a [supported region](../language-region-support.md).
* Your resource endpoint and API key (found under **Keys and Endpoint** in the Azure portal).
* Model deployment defaults configured for your resource. See [Models and deployments](../concepts/models-deployments.md) or this one-time [configuration script](https://github.com/Azure/azure-sdk-for-java/blob/main/sdk/contentunderstanding/azure-ai-contentunderstanding/src/samples/java/com/azure/ai/contentunderstanding/samples/Sample00_UpdateDefaults.java) for setup instructions.
* [Java Development Kit (JDK)](https://learn.microsoft.com/java/openjdk/download) version 8 or later.
* [Apache Maven](https://maven.apache.org/download.cgi).

## Set up

1. Create a new Maven project:

    ```console
    mvn archetype:generate -DgroupId=com.example \
        -DartifactId=custom-analyzer-tutorial \
        -DarchetypeArtifactId=maven-archetype-quickstart \
        -DinteractiveMode=false
    cd custom-analyzer-tutorial
    ```

1. Add the Content Understanding dependency to your **pom.xml** file in the `<dependencies>` section:

    ```xml
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-ai-contentunderstanding</artifactId>
        <version>1.0.0</version>
    </dependency>
    ```

1. Optionally, add the Azure Identity library for Microsoft Entra authentication:

    ```xml
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-identity</artifactId>
        <version>1.14.2</version>
    </dependency>
    ```

## Set up environment variables

To authenticate with the Content Understanding service, set the environment variables with your own values before running the sample:
- `CONTENTUNDERSTANDING_ENDPOINT` - the endpoint to your Content Understanding resource.
- `CONTENTUNDERSTANDING_KEY` - your Content Understanding API key (optional if using [Microsoft Entra ID](../concepts/secure-communications.md) DefaultAzureCredential).

### Windows

```cmd
setx CONTENTUNDERSTANDING_ENDPOINT "your-endpoint"
setx CONTENTUNDERSTANDING_KEY "your-key"
```

### Linux / macOS

```bash
export CONTENTUNDERSTANDING_ENDPOINT="your-endpoint"
export CONTENTUNDERSTANDING_KEY="your-key"
```

## Create the client

```java
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import com.azure.core.credential.AzureKeyCredential;
import com.azure.core.util.polling.SyncPoller;
import com.azure.ai.contentunderstanding
    .ContentUnderstandingClient;
import com.azure.ai.contentunderstanding
    .ContentUnderstandingClientBuilder;
import com.azure.ai.contentunderstanding.models.*;

String endpoint =
    System.getenv("CONTENTUNDERSTANDING_ENDPOINT");
String key =
    System.getenv("CONTENTUNDERSTANDING_KEY");

ContentUnderstandingClient client =
    new ContentUnderstandingClientBuilder()
        .endpoint(endpoint)
        .credential(new AzureKeyCredential(key))
        .buildClient();
```

## Create a custom analyzer

# [Document](#tab/document)

The following example creates a custom document analyzer based on the [prebuilt document analyzer](../concepts/prebuilt-analyzers.md). It defines fields using three extraction methods: `extract` for literal text, `generate` for AI-generated summaries, and `classify` for categorization.

```java
String analyzerId =
    "my_document_analyzer_"
    + System.currentTimeMillis();

Map<String, ContentFieldDefinition> fields =
    new HashMap<>();

ContentFieldDefinition companyNameDef =
    new ContentFieldDefinition();
companyNameDef.setType(ContentFieldType.STRING);
companyNameDef.setMethod(
    GenerationMethod.EXTRACT);
companyNameDef.setDescription(
    "Name of the company");
fields.put("company_name", companyNameDef);

ContentFieldDefinition totalAmountDef =
    new ContentFieldDefinition();
totalAmountDef.setType(ContentFieldType.NUMBER);
totalAmountDef.setMethod(
    GenerationMethod.EXTRACT);
totalAmountDef.setDescription(
    "Total amount on the document");
fields.put("total_amount", totalAmountDef);

ContentFieldDefinition summaryDef =
    new ContentFieldDefinition();
summaryDef.setType(ContentFieldType.STRING);
summaryDef.setMethod(
    GenerationMethod.GENERATE);
summaryDef.setDescription(
    "A brief summary of the document content");
fields.put("document_summary", summaryDef);

ContentFieldDefinition documentTypeDef =
    new ContentFieldDefinition();
documentTypeDef.setType(ContentFieldType.STRING);
documentTypeDef.setMethod(
    GenerationMethod.CLASSIFY);
documentTypeDef.setDescription(
    "Type of document");
documentTypeDef.setEnumProperty(
    Arrays.asList(
        "invoice", "receipt", "contract",
        "report", "other"
    ));
fields.put("document_type", documentTypeDef);

ContentFieldSchema fieldSchema =
    new ContentFieldSchema();
fieldSchema.setName("company_schema");
fieldSchema.setDescription(
    "Schema for extracting company information");
fieldSchema.setFields(fields);

Map<String, String> models = new HashMap<>();
models.put("completion", "gpt-5.2");
models.put("embedding", "text-embedding-3-large"); // Required when using field_schema and prebuilt-document base analyzer

ContentAnalyzer customAnalyzer =
    new ContentAnalyzer()
        .setBaseAnalyzerId("prebuilt-document")
        .setDescription(
            "Custom analyzer for extracting"
            + " company information")
        .setConfig(new ContentAnalyzerConfig()
            .setOcrEnabled(true)
            .setLayoutEnabled(true)
            .setFormulaEnabled(true)
            .setEstimateFieldSourceAndConfidence(
                true)
            .setReturnDetails(true))
        .setFieldSchema(fieldSchema)
        .setModels(models);

SyncPoller<ContentAnalyzerOperationStatus,
    ContentAnalyzer> operation =
    client.beginCreateAnalyzer(
        analyzerId, customAnalyzer, true);

ContentAnalyzer result =
    operation.getFinalResult();
System.out.println(
    "Analyzer '" + analyzerId
    + "' created successfully!");

if (result.getDescription() != null) {
    System.out.println(
        "  Description: "
        + result.getDescription());
}

if (result.getFieldSchema() != null
    && result.getFieldSchema()
        .getFields() != null) {
    System.out.println(
        "  Fields ("
        + result.getFieldSchema()
            .getFields().size() + "):");
    result.getFieldSchema().getFields()
        .forEach((fieldName, fieldDef) -> {
            String method =
                fieldDef.getMethod() != null
                    ? fieldDef.getMethod()
                        .toString()
                    : "auto";
            String type =
                fieldDef.getType() != null
                    ? fieldDef.getType()
                        .toString()
                    : "unknown";
            System.out.println(
                "    - " + fieldName
                + ": " + type
                + " (" + method + ")");
        });
}
```

An example output looks like:

```text
Analyzer 'my_document_analyzer_ID' created successfully!
  Description: Custom analyzer for extracting company information
  Fields (4):
    - total_amount: number (extract)
    - company_name: string (extract)
    - document_summary: string (generate)
    - document_type: string (classify)
```

> **Tip:**
> This code is based on the [Create Analyzer sample](https://github.com/Azure/azure-sdk-for-java/blob/main/sdk/contentunderstanding/azure-ai-contentunderstanding/src/samples/java/com/azure/ai/contentunderstanding/samples/Sample04_CreateAnalyzer.java) in the SDK repository.


Optionally, you can create a classifier analyzer to categorize documents and use its results to route documents to prebuilt or custom analyzers you created. Here is an example of creating a custom analyzer for classification workflows.

```java
// Generate a unique analyzer ID
String classifierId =
    "my_classifier_" + System.currentTimeMillis();

System.out.println(
    "Creating classifier '"
    + classifierId + "'...");

// Define content categories for classification
Map<String, ContentCategoryDefinition>
    categories = new HashMap<>();

categories.put("Loan_Application",
    new ContentCategoryDefinition()
        .setDescription(
            "Documents submitted by individuals"
            + " or businesses to request funding,"
            + " typically including personal or"
            + " business details, financial"
            + " history, loan amount, purpose,"
            + " and supporting documentation."));

categories.put("Invoice",
    new ContentCategoryDefinition()
        .setDescription(
            "Billing documents issued by sellers"
            + " or service providers to request"
            + " payment for goods or services,"
            + " detailing items, prices, taxes,"
            + " totals, and payment terms."));

categories.put("Bank_Statement",
    new ContentCategoryDefinition()
        .setDescription(
            "Official statements issued by banks"
            + " that summarize account activity"
            + " over a period, including deposits,"
            + " withdrawals, fees,"
            + " and balances."));

// Create the classifier
Map<String, String> classifierModels =
    new HashMap<>();
classifierModels.put("completion", "gpt-5.2");

ContentAnalyzer classifier =
    new ContentAnalyzer()
        .setBaseAnalyzerId("prebuilt-document")
        .setDescription(
            "Custom classifier for financial"
            + " document categorization")
        .setConfig(new ContentAnalyzerConfig()
            .setReturnDetails(true)
            .setSegmentEnabled(true)
            .setContentCategories(categories))
        .setModels(classifierModels);

SyncPoller<ContentAnalyzerOperationStatus,
    ContentAnalyzer> classifierOp =
    client.beginCreateAnalyzer(
        classifierId, classifier, true);
classifierOp.getFinalResult();

// Get the full classifier details
ContentAnalyzer classifierResult =
    client.getAnalyzer(classifierId);

System.out.println(
    "Classifier '" + classifierId
    + "' created successfully!");

if (classifierResult.getDescription() != null) {
    System.out.println(
        "  Description: "
        + classifierResult.getDescription());
}
```

> **Tip:**
> This code is based on the [Create Classifier sample](https://github.com/Azure/azure-sdk-for-java/blob/main/sdk/contentunderstanding/azure-ai-contentunderstanding/src/samples/java/com/azure/ai/contentunderstanding/samples/Sample05_CreateClassifier.java) for classification workflows.



# [Image](#tab/image)

The following example creates a custom image analyzer based on the [prebuilt image analyzer](../concepts/prebuilt-analyzers.md) for processing charts and graphs.

```java
String analyzerId =
    "my_image_analyzer_"
    + System.currentTimeMillis();

Map<String, ContentFieldDefinition> fields =
    new HashMap<>();

ContentFieldDefinition titleDef =
    new ContentFieldDefinition();
titleDef.setType(ContentFieldType.STRING);
titleDef.setDescription("Title of the chart");
fields.put("Title", titleDef);

ContentFieldDefinition chartTypeDef =
    new ContentFieldDefinition();
chartTypeDef.setType(ContentFieldType.STRING);
chartTypeDef.setMethod(
    GenerationMethod.CLASSIFY);
chartTypeDef.setDescription("Type of chart");
chartTypeDef.setEnumProperty(
    Arrays.asList("bar", "line", "pie"));
fields.put("ChartType", chartTypeDef);

ContentFieldSchema fieldSchema =
    new ContentFieldSchema();
fieldSchema.setName("chart_schema");
fieldSchema.setDescription(
    "Schema for extracting chart information");
fieldSchema.setFields(fields);

Map<String, String> models = new HashMap<>();
models.put("completion", "gpt-5.2");

ContentAnalyzer customAnalyzer =
    new ContentAnalyzer()
        .setBaseAnalyzerId("prebuilt-image")
        .setDescription(
            "Custom analyzer for charts"
            + " and graphs")
        .setFieldSchema(fieldSchema)
        .setModels(models);

SyncPoller<ContentAnalyzerOperationStatus,
    ContentAnalyzer> operation =
    client.beginCreateAnalyzer(
        analyzerId, customAnalyzer, true);

ContentAnalyzer result =
    operation.getFinalResult();
System.out.println(
    "Analyzer '" + analyzerId
    + "' created successfully!");

if (result.getDescription() != null) {
    System.out.println(
        "  Description: "
        + result.getDescription());
}

if (result.getFieldSchema() != null
    && result.getFieldSchema()
        .getFields() != null) {
    System.out.println(
        "  Fields ("
        + result.getFieldSchema()
            .getFields().size() + "):");
    result.getFieldSchema().getFields()
        .forEach((fieldName, fieldDef) -> {
            String method =
                fieldDef.getMethod() != null
                    ? fieldDef.getMethod()
                        .toString()
                    : "auto";
            String type =
                fieldDef.getType() != null
                    ? fieldDef.getType()
                        .toString()
                    : "unknown";
            System.out.println(
                "    - " + fieldName
                + ": " + type
                + " (" + method + ")");
        });
}
```

An example output looks like:

```text
Analyzer 'my_image_analyzer_ID' created successfully!
  Description: Custom analyzer for charts and graphs
  Fields (2):
    - Title: string (auto)
    - ChartType: string (classify)
```

> **Tip:**
> This code adapts the [Create Analyzer sample](https://github.com/Azure/azure-sdk-for-java/blob/main/sdk/contentunderstanding/azure-ai-contentunderstanding/src/samples/java/com/azure/ai/contentunderstanding/samples/Sample04_CreateAnalyzer.java) pattern for image content.

# [Audio](#tab/audio)

The following example creates a custom audio analyzer based on the [prebuilt audio analyzer](../concepts/prebuilt-analyzers.md) for processing customer support call recordings.

```java
String analyzerId =
    "my_audio_analyzer_"
    + System.currentTimeMillis();

Map<String, ContentFieldDefinition> fields =
    new HashMap<>();

ContentFieldDefinition summaryDef =
    new ContentFieldDefinition();
summaryDef.setType(ContentFieldType.STRING);
summaryDef.setMethod(
    GenerationMethod.GENERATE);
summaryDef.setDescription("Summary of the call");
fields.put("Summary", summaryDef);

ContentFieldDefinition sentimentDef =
    new ContentFieldDefinition();
sentimentDef.setType(ContentFieldType.STRING);
sentimentDef.setMethod(
    GenerationMethod.CLASSIFY);
sentimentDef.setDescription(
    "Overall sentiment of the call");
sentimentDef.setEnumProperty(
    Arrays.asList(
        "Positive", "Neutral", "Negative"));
fields.put("Sentiment", sentimentDef);

// Define "People" as an array of objects
Map<String, ContentFieldDefinition> personProps =
    new HashMap<>();
ContentFieldDefinition nameDef =
    new ContentFieldDefinition();
nameDef.setType(ContentFieldType.STRING);
personProps.put("Name", nameDef);
ContentFieldDefinition roleDef =
    new ContentFieldDefinition();
roleDef.setType(ContentFieldType.STRING);
personProps.put("Role", roleDef);

ContentFieldDefinition personItemDef =
    new ContentFieldDefinition();
personItemDef.setType(ContentFieldType.OBJECT);
personItemDef.setProperties(personProps);

ContentFieldDefinition peopleDef =
    new ContentFieldDefinition();
peopleDef.setType(ContentFieldType.ARRAY);
peopleDef.setDescription(
    "List of people mentioned");
peopleDef.setItemDefinition(personItemDef);
fields.put("People", peopleDef);

ContentFieldSchema fieldSchema =
    new ContentFieldSchema();
fieldSchema.setName("call_center_schema");
fieldSchema.setDescription(
    "Schema for analyzing customer"
    + " support calls");
fieldSchema.setFields(fields);

Map<String, String> models = new HashMap<>();
models.put("completion", "gpt-5.2");

ContentAnalyzer customAnalyzer =
    new ContentAnalyzer()
        .setBaseAnalyzerId("prebuilt-audio")
        .setDescription(
            "Custom analyzer for customer"
            + " support calls")
        .setConfig(new ContentAnalyzerConfig()
            .setLocales(
                Arrays.asList("en-US", "fr-FR"))
            .setReturnDetails(true))
        .setFieldSchema(fieldSchema)
        .setModels(models);

SyncPoller<ContentAnalyzerOperationStatus,
    ContentAnalyzer> operation =
    client.beginCreateAnalyzer(
        analyzerId, customAnalyzer, true);

ContentAnalyzer result =
    operation.getFinalResult();
System.out.println(
    "Analyzer '" + analyzerId
    + "' created successfully!");

if (result.getDescription() != null) {
    System.out.println(
        "  Description: "
        + result.getDescription());
}

if (result.getFieldSchema() != null
    && result.getFieldSchema()
        .getFields() != null) {
    System.out.println(
        "  Fields ("
        + result.getFieldSchema()
            .getFields().size() + "):");
    result.getFieldSchema().getFields()
        .forEach((fieldName, fieldDef) -> {
            String method =
                fieldDef.getMethod() != null
                    ? fieldDef.getMethod()
                        .toString()
                    : "auto";
            String type =
                fieldDef.getType() != null
                    ? fieldDef.getType()
                        .toString()
                    : "unknown";
            System.out.println(
                "    - " + fieldName
                + ": " + type
                + " (" + method + ")");
        });
}
```

An example output looks like:

```text
Analyzer 'my_audio_analyzer_ID' created successfully!
  Description: Custom analyzer for customer support calls
  Fields (3):
    - People: array (auto)
    - Summary: string (generate)
    - Sentiment: string (classify)
```

> **Tip:**
> This code adapts the [Create Analyzer sample](https://github.com/Azure/azure-sdk-for-java/blob/main/sdk/contentunderstanding/azure-ai-contentunderstanding/src/samples/java/com/azure/ai/contentunderstanding/samples/Sample04_CreateAnalyzer.java) pattern for audio content.

# [Video](#tab/video)

The following example creates a custom video analyzer based on the [prebuilt video analyzer](../concepts/prebuilt-analyzers.md) for processing product demos and reviews.

```java
String analyzerId =
    "my_video_analyzer_"
    + System.currentTimeMillis();

// Define segment properties
Map<String, ContentFieldDefinition> segProps =
    new HashMap<>();
ContentFieldDefinition segIdDef =
    new ContentFieldDefinition();
segIdDef.setType(ContentFieldType.STRING);
segProps.put("SegmentId", segIdDef);

ContentFieldDefinition descDef =
    new ContentFieldDefinition();
descDef.setType(ContentFieldType.STRING);
descDef.setMethod(GenerationMethod.GENERATE);
descDef.setDescription(
    "Detailed summary of the video segment");
segProps.put("Description", descDef);

ContentFieldDefinition sentDef =
    new ContentFieldDefinition();
sentDef.setType(ContentFieldType.STRING);
sentDef.setMethod(GenerationMethod.CLASSIFY);
sentDef.setEnumProperty(
    Arrays.asList(
        "Positive", "Neutral", "Negative"));
segProps.put("Sentiment", sentDef);

ContentFieldDefinition segItemDef =
    new ContentFieldDefinition();
segItemDef.setType(ContentFieldType.OBJECT);
segItemDef.setProperties(segProps);

Map<String, ContentFieldDefinition> fields =
    new HashMap<>();
ContentFieldDefinition segmentsDef =
    new ContentFieldDefinition();
segmentsDef.setType(ContentFieldType.ARRAY);
segmentsDef.setItemDefinition(segItemDef);
fields.put("Segments", segmentsDef);

ContentFieldSchema fieldSchema =
    new ContentFieldSchema();
fieldSchema.setName("video_schema");
fieldSchema.setDescription(
    "Schema for analyzing product demo videos");
fieldSchema.setFields(fields);

Map<String, String> models = new HashMap<>();
models.put("completion", "gpt-5.2");

ContentAnalyzer customAnalyzer =
    new ContentAnalyzer()
        .setBaseAnalyzerId("prebuilt-video")
        .setDescription(
            "Custom analyzer for product"
            + " demo videos")
        .setConfig(new ContentAnalyzerConfig()
            .setLocales(
                Arrays.asList("en-US", "fr-FR"))
            .setReturnDetails(true))
        .setFieldSchema(fieldSchema)
        .setModels(models);

SyncPoller<ContentAnalyzerOperationStatus,
    ContentAnalyzer> operation =
    client.beginCreateAnalyzer(
        analyzerId, customAnalyzer, true);

ContentAnalyzer result =
    operation.getFinalResult();
System.out.println(
    "Analyzer '" + analyzerId
    + "' created successfully!");

if (result.getDescription() != null) {
    System.out.println(
        "  Description: "
        + result.getDescription());
}

if (result.getFieldSchema() != null
    && result.getFieldSchema()
        .getFields() != null) {
    System.out.println(
        "  Fields ("
        + result.getFieldSchema()
            .getFields().size() + "):");
    result.getFieldSchema().getFields()
        .forEach((fieldName, fieldDef) -> {
            String method =
                fieldDef.getMethod() != null
                    ? fieldDef.getMethod()
                        .toString()
                    : "auto";
            String type =
                fieldDef.getType() != null
                    ? fieldDef.getType()
                        .toString()
                    : "unknown";
            System.out.println(
                "    - " + fieldName
                + ": " + type
                + " (" + method + ")");
        });
}
```

An example output looks like:

```text
Analyzer 'my_video_analyzer_ID' created successfully!
  Description: Custom analyzer for product demo videos
  Fields (1):
    - Segments: array (auto)
```

> **Tip:**
> This code adapts the [Create Analyzer sample](https://github.com/Azure/azure-sdk-for-java/blob/main/sdk/contentunderstanding/azure-ai-contentunderstanding/src/samples/java/com/azure/ai/contentunderstanding/samples/Sample04_CreateAnalyzer.java) pattern for video content.

---

## Use the custom analyzer

# [Document](#tab/document)

After creating the analyzer, use it to analyze a document and extract the custom fields. Delete the analyzer when you no longer need it.

```java
String documentUrl =
    "https://raw.githubusercontent.com/"
    + "Azure-Samples/"
    + "azure-ai-content-understanding-assets/"
    + "main/document/invoice.pdf";

AnalysisInput input = new AnalysisInput();
input.setUrl(documentUrl);

SyncPoller<ContentAnalyzerAnalyzeOperationStatus,
    AnalysisResult> analyzeOperation =
    client.beginAnalyze(
        analyzerId, Arrays.asList(input));

AnalysisResult analyzeResult =
    analyzeOperation.getFinalResult();

if (analyzeResult.getContents() != null
    && !analyzeResult.getContents().isEmpty()
    && analyzeResult.getContents().get(0)
        instanceof DocumentContent) {
    DocumentContent content =
        (DocumentContent) analyzeResult
            .getContents().get(0);

    ContentField companyField =
        content.getFields() != null
            ? content.getFields()
                .get("company_name") : null;
    if (companyField
        instanceof ContentStringField) {
        ContentStringField sf =
            (ContentStringField) companyField;
        System.out.println(
            "Company Name: " + sf.getValue());
        System.out.println(
            "  Confidence: "
            + companyField.getConfidence());
    }

    ContentField totalField =
        content.getFields() != null
            ? content.getFields()
                .get("total_amount") : null;
    if (totalField != null) {
        System.out.println(
            "Total Amount: "
            + totalField.getValue());
    }

    ContentField summaryField =
        content.getFields() != null
            ? content.getFields()
                .get("document_summary") : null;
    if (summaryField
        instanceof ContentStringField) {
        ContentStringField sf =
            (ContentStringField) summaryField;
        System.out.println(
            "Summary: " + sf.getValue());
    }

    ContentField typeField =
        content.getFields() != null
            ? content.getFields()
                .get("document_type") : null;
    if (typeField
        instanceof ContentStringField) {
        ContentStringField sf =
            (ContentStringField) typeField;
        System.out.println(
            "Document Type: " + sf.getValue());
    }
}

// --- Clean up ---
System.out.println(
    "\nCleaning up: deleting analyzer '"
    + analyzerId + "'...");
client.deleteAnalyzer(analyzerId);
System.out.println(
    "Analyzer '" + analyzerId
    + "' deleted successfully.");
```

An example output looks like:

```text
Company Name: CONTOSO LTD.
  Confidence: 0.781
Total Amount: 610.0
Summary: This document is an invoice from CONTOSO LTD. to Microsoft Corporation for consulting services, document fees, and printing fees, detailing service dates, itemized charges, taxes, and the total amount due.
Document Type: invoice

Cleaning up: deleting analyzer 'my_document_analyzer_ID'...
Analyzer 'my_document_analyzer_ID' deleted successfully.
```

> **Tip:**
> Check out more examples of running analyzers at [Java SDK samples](https://github.com/Azure/azure-sdk-for-java/tree/main/sdk/contentunderstanding/azure-ai-contentunderstanding/src/samples/java/com/azure/ai/contentunderstanding).

# [Image](#tab/image)

After creating the analyzer, use it to analyze an image and extract the custom fields. Delete the analyzer when you no longer need it.

```java
String imageUrl =
    "https://raw.githubusercontent.com/"
    + "Azure-Samples/"
    + "azure-ai-content-understanding-assets/"
    + "main/image/pieChart.jpg";

AnalysisInput input = new AnalysisInput();
input.setUrl(imageUrl);

SyncPoller<ContentAnalyzerAnalyzeOperationStatus,
    AnalysisResult> analyzeOperation =
    client.beginAnalyze(
        analyzerId, Arrays.asList(input));

AnalysisResult analyzeResult =
    analyzeOperation.getFinalResult();

if (analyzeResult.getContents() != null
    && !analyzeResult.getContents().isEmpty()) {
    var content =
        analyzeResult.getContents().get(0);

    if (content.getFields() != null) {
        ContentField titleField =
            content.getFields().get("Title");
        if (titleField
            instanceof ContentStringField) {
            System.out.println(
                "Title: "
                + ((ContentStringField) titleField)
                    .getValue());
        }

        ContentField chartField =
            content.getFields().get("ChartType");
        if (chartField
            instanceof ContentStringField) {
            System.out.println(
                "Chart Type: "
                + ((ContentStringField) chartField)
                    .getValue());
        }
    }
}

// --- Clean up ---
System.out.println(
    "\nCleaning up: deleting analyzer '"
    + analyzerId + "'...");
client.deleteAnalyzer(analyzerId);
System.out.println(
    "Analyzer '" + analyzerId
    + "' deleted successfully.");
```

An example output looks like:

```text
Title: Weekly Working Hours Distribution
Chart Type: pie

Cleaning up: deleting analyzer 'my_image_analyzer_ID'...
Analyzer 'my_image_analyzer_ID' deleted successfully.
```

> **Tip:**
> Check out more examples of running analyzers at [Java SDK samples](https://github.com/Azure/azure-sdk-for-java/tree/main/sdk/contentunderstanding/azure-ai-contentunderstanding/src/samples/java/com/azure/ai/contentunderstanding).

# [Audio](#tab/audio)

After creating the analyzer, use it to analyze an audio file and extract the custom fields. Delete the analyzer when you no longer need it.

```java
String audioUrl =
    "https://raw.githubusercontent.com/"
    + "Azure-Samples/"
    + "azure-ai-content-understanding-assets/"
    + "main/audio/callCenterRecording.mp3";

AnalysisInput input = new AnalysisInput();
input.setUrl(audioUrl);

SyncPoller<ContentAnalyzerAnalyzeOperationStatus,
    AnalysisResult> analyzeOperation =
    client.beginAnalyze(
        analyzerId, Arrays.asList(input));

AnalysisResult analyzeResult =
    analyzeOperation.getFinalResult();

if (analyzeResult.getContents() != null
    && !analyzeResult.getContents().isEmpty()) {
    var content =
        analyzeResult.getContents().get(0);

    if (content.getFields() != null) {
        ContentField summaryField =
            content.getFields().get("Summary");
        if (summaryField
            instanceof ContentStringField) {
            System.out.println(
                "Summary: "
                + ((ContentStringField)
                    summaryField)
                    .getValue());
        }

        ContentField sentField =
            content.getFields().get("Sentiment");
        if (sentField
            instanceof ContentStringField) {
            System.out.println(
                "Sentiment: "
                + ((ContentStringField) sentField)
                    .getValue());
        }
    }
}

// --- Clean up ---
System.out.println(
    "\nCleaning up: deleting analyzer '"
    + analyzerId + "'...");
client.deleteAnalyzer(analyzerId);
System.out.println(
    "Analyzer '" + analyzerId
    + "' deleted successfully.");
```

An example output looks like:

```text
Summary: Maria Smith contacted Contoso to inquire about her current point balance. John Doe, the customer service representative, confirmed her identity by requesting her date of birth and provided her point balance. The conversation ended politely with no further requests.
Sentiment: Positive

Cleaning up: deleting analyzer 'my_audio_analyzer_ID'...
Analyzer 'my_audio_analyzer_ID' deleted successfully.
```

> **Tip:**
> Check out more examples of running analyzers at [Java SDK samples](https://github.com/Azure/azure-sdk-for-java/tree/main/sdk/contentunderstanding/azure-ai-contentunderstanding/src/samples/java/com/azure/ai/contentunderstanding).

# [Video](#tab/video)

After creating the analyzer, use it to analyze a video and extract the custom fields. Delete the analyzer when you no longer need it.

```java
String videoUrl =
    "https://raw.githubusercontent.com/"
    + "Azure-Samples/"
    + "azure-ai-content-understanding-assets/"
    + "main/videos/sdk_samples/"
    + "FlightSimulator.mp4";

AnalysisInput input = new AnalysisInput();
input.setUrl(videoUrl);

SyncPoller<ContentAnalyzerAnalyzeOperationStatus,
    AnalysisResult> analyzeOperation =
    client.beginAnalyze(
        analyzerId, Arrays.asList(input));

AnalysisResult analyzeResult =
    analyzeOperation.getFinalResult();

if (analyzeResult.getContents() != null
    && !analyzeResult.getContents().isEmpty()) {
    var content =
        analyzeResult.getContents().get(0);
    System.out.println(
        "Content kind: " + content.getKind());
    if (content.getFields() != null) {
        ContentField segmentsField =
            content.getFields().get("Segments");
        if (segmentsField
            instanceof ContentArrayField) {
            ContentArrayField segments =
                (ContentArrayField) segmentsField;
            System.out.println(
                "Segments (" + segments.size()
                + "):");
            for (int i = 0;
                i < segments.size(); i++) {
                ContentField seg = segments.get(i);
                if (seg instanceof
                    ContentObjectField) {
                    ContentObjectField obj =
                        (ContentObjectField) seg;
                    ContentField idField =
                        obj.getFieldOrDefault(
                            "SegmentId");
                    ContentField descField =
                        obj.getFieldOrDefault(
                            "Description");
                    ContentField sentField =
                        obj.getFieldOrDefault(
                            "Sentiment");
                    String segId = idField != null
                        ? String.valueOf(
                            idField.getValue())
                        : "N/A";
                    String desc = descField != null
                        ? String.valueOf(
                            descField.getValue())
                        : "N/A";
                    String sent = sentField != null
                        ? String.valueOf(
                            sentField.getValue())
                        : "N/A";
                    System.out.println(
                        "  Segment " + segId
                        + ": " + desc
                        + " (Sentiment: "
                        + sent + ")");
                }
            }
        }
    }
}

// --- Clean up ---
System.out.println(
    "\nCleaning up: deleting analyzer '"
    + analyzerId + "'...");
client.deleteAnalyzer(analyzerId);
System.out.println(
    "Analyzer '" + analyzerId
    + "' deleted successfully.");
```

An example output looks like:

```text
Content kind: audioVisual
Segments (16):
  Segment 00:00:00.000-00:00:01.467: The video opens with a scenic aerial view of an island, featuring a small aircraft flying above the landscape. The screen displays the logos for 'Flight Simulator' and 'Microsoft Azure AI,' indicating a collaboration or integration between the two products. (Sentiment: Positive)
  Segment 00:00:01.467-00:00:03.233: A man is shown in an interview setting, sitting in a modern office environment. The transcript begins discussing neural TTS (Text-to-Speech) and the importance of good data for achieving a high-quality voice. (Sentiment: Neutral)
  Segment 00:00:03.233-00:00:07.367: The visuals shift to a digital audio waveform, emphasizing the technical aspect of TTS. The transcript explains that a universal TTS model was built using 3,000 hours of data, highlighting the scale and quality of the dataset. (Sentiment: Positive)
  Segment 00:00:07.367-00:00:08.200: Another man appears in an interview setting, continuing the discussion about the accumulation of data for the universal TTS model. The transcript notes that the model captures audio nuances for more natural voice generation. (Sentiment: Positive)
  Segment 00:00:08.200-00:00:11.367: The video transitions to an outdoor scene showing a large facility, likely a data center, set in a rural landscape. This visually supports the scale of infrastructure required for the TTS model. (Sentiment: Neutral)
  Segment 00:00:11.367-00:00:13.567: Inside a data center, rows of servers are shown, reinforcing the technological backbone of the TTS system. The transcript continues to emphasize the accumulation of data and the model's capabilities. (Sentiment: Neutral)
  Segment 00:00:13.567-00:00:16.100: The interview returns to the first man, who elaborates on the universal model's ability to generate natural voices. The transcript mentions the model's ability to capture nuances, supporting the visuals. (Sentiment: Positive)
  Segment 00:00:16.100-00:00:19.433: A biplane is seen flying over a coastal landscape, visually connecting the Flight Simulator experience to the advanced AI voice technology discussed earlier. (Sentiment: Positive)
  Segment 00:00:19.433-00:00:23.967: A scenic view of a castle with a plane flying overhead, further showcasing the immersive environments possible in Flight Simulator. The transcript highlights the naturalness of the generated voices. (Sentiment: Positive)
  Segment 00:00:23.967-00:00:30.033: A bald man is interviewed in a modern office setting. The transcript discusses the high fidelity of cognitive services offerings, noting that the voices sound much more like actual human voices. (Sentiment: Positive)
  Segment 00:00:30.033-00:00:33.200: The interview with the bald man continues, reinforcing the message about the realism and fidelity of the AI-generated voices. (Sentiment: Positive)
  Segment 00:00:33.200-00:00:35.267: The video shows an overhead view of an airplane on the tarmac, possibly preparing for pushback. The transcript transitions to a simulated ATC (Air Traffic Control) exchange, demonstrating the practical application of TTS in Flight Simulator. (Sentiment: Neutral)
  Segment 00:00:35.267-00:00:37.700: A ground crew member directs an Airbus aircraft, visually representing the realism and immersion of Flight Simulator. The transcript includes ATC communication, showing the integration of natural-sounding AI voices. (Sentiment: Positive)
  Segment 00:00:37.700-00:00:39.200: Ground crew members are seen walking on the tarmac near aircraft, continuing the realistic airport environment. The transcript features further ATC communication. (Sentiment: Neutral)
  Segment 00:00:39.200-00:00:42.033: A close-up of an Airbus aircraft at the gate, reinforcing the realism and detail in Flight Simulator. The transcript continues with ATC exchanges, demonstrating the natural voice output. (Sentiment: Positive)
  Segment 00:00:42.033-00:00:43.866: The video ends with the Microsoft logo and branding, signifying the conclusion of the demo and reinforcing the partnership between Flight Simulator and Microsoft Azure AI. (Sentiment: Positive)

Cleaning up: deleting analyzer 'my_video_analyzer_ID'...
Analyzer 'my_video_analyzer_ID' deleted successfully.
```

> **Tip:**
> Check out more examples of running analyzers at [Java SDK samples](https://github.com/Azure/azure-sdk-for-java/tree/main/sdk/contentunderstanding/azure-ai-contentunderstanding/src/samples/java/com/azure/ai/contentunderstanding).

---







**Applies to: programming-language-javascript**



<!-- markdownlint-disable MD025 -->

[Client library](https://www.npmjs.com/package/@azure/ai-content-understanding) | [Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/contentunderstanding/ai-content-understanding/samples/v1/javascript) | [SDK source](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/contentunderstanding/ai-content-understanding)

This guide shows you how to use the Content Understanding JavaScript SDK to create a custom analyzer that extracts structured data from your content. Custom analyzers support document, image, audio, and video content types.

## Prerequisites

* An active Azure subscription. If you don't have an Azure account, [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
* A [Microsoft Foundry resource](https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry) created in a [supported region](../language-region-support.md).
* Your resource endpoint and API key (found under **Keys and Endpoint** in the Azure portal).
* Model deployment defaults configured for your resource. See [Models and deployments](../concepts/models-deployments.md) or this one-time [configuration script](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/contentunderstanding/ai-content-understanding/samples/v1/javascript/updateDefaults.js) for setup instructions.
* [Node.js](https://nodejs.org/) LTS version.

## Set up

1. Create a new Node.js project:

    ```console
    mkdir custom-analyzer-tutorial
    cd custom-analyzer-tutorial
    npm init -y
    ```

1. Install the Content Understanding client library:

    ```console
    npm install @azure/ai-content-understanding
    ```

1. Optionally, install the Azure Identity library for Microsoft Entra authentication:

    ```console
    npm install @azure/identity
    ```

## Set up environment variables

To authenticate with the Content Understanding service, set the environment variables with your own values before running the sample:
- `CONTENTUNDERSTANDING_ENDPOINT` - the endpoint to your Content Understanding resource.
- `CONTENTUNDERSTANDING_KEY` - your Content Understanding API key (optional if using [Microsoft Entra ID](../concepts/secure-communications.md) DefaultAzureCredential).

### Windows

```cmd
setx CONTENTUNDERSTANDING_ENDPOINT "your-endpoint"
setx CONTENTUNDERSTANDING_KEY "your-key"
```

### Linux / macOS

```bash
export CONTENTUNDERSTANDING_ENDPOINT="your-endpoint"
export CONTENTUNDERSTANDING_KEY="your-key"
```

## Create the client

```javascript
const { AzureKeyCredential } =
    require("@azure/core-auth");
const {
    ContentUnderstandingClient,
} = require("@azure/ai-content-understanding");

const endpoint =
    process.env["CONTENTUNDERSTANDING_ENDPOINT"];
const key =
    process.env["CONTENTUNDERSTANDING_KEY"];

const client = new ContentUnderstandingClient(
    endpoint,
    new AzureKeyCredential(key)
);
```

## Create a custom analyzer

# [Document](#tab/document)

The following example creates a custom document analyzer based on the [prebuilt document analyzer](../concepts/prebuilt-analyzers.md). It defines fields using three extraction methods: `extract` for literal text, `generate` for AI-generated summaries, and `classify` for categorization.

```javascript
const analyzerId =
    `my_document_analyzer_${Math.floor(
        Date.now() / 1000
    )}`;

const analyzer = {
    baseAnalyzerId: "prebuilt-document",
    description:
        "Custom analyzer for extracting"
        + " company information",
    config: {
        enableFormula: true,
        enableLayout: true,
        enableOcr: true,
        estimateFieldSourceAndConfidence: true,
        returnDetails: true,
    },
    fieldSchema: {
        name: "company_schema",
        description:
            "Schema for extracting company"
            + " information",
        fields: {
            company_name: {
                type: "string",
                method: "extract",
                description:
                    "Name of the company",
            },
            total_amount: {
                type: "number",
                method: "extract",
                description:
                    "Total amount on the"
                    + " document",
            },
            document_summary: {
                type: "string",
                method: "generate",
                description:
                    "A brief summary of the"
                    + " document content",
            },
            document_type: {
                type: "string",
                method: "classify",
                description: "Type of document",
                enum: [
                    "invoice", "receipt",
                    "contract", "report", "other",
                ],
            },
        },
    },
    models: {
        completion: "gpt-5.2",
        embedding: "text-embedding-3-large", // Required when using field_schema and prebuilt-document base analyzer
    },
};

const poller = client.createAnalyzer(
    analyzerId, analyzer
);
await poller.pollUntilDone();

const result = await client.getAnalyzer(
    analyzerId
);
console.log(
    `Analyzer '${analyzerId}' created`
    + ` successfully!`
);

if (result.description) {
    console.log(
        `  Description: ${result.description}`
    );
}

if (result.fieldSchema?.fields) {
    const fields = result.fieldSchema.fields;
    console.log(
        `  Fields`
        + ` (${Object.keys(fields).length}):`
    );
    for (const [name, fieldDef]
        of Object.entries(fields)) {
        const method =
            fieldDef.method ?? "auto";
        const fieldType =
            fieldDef.type ?? "unknown";
        console.log(
            `    - ${name}: `
            + `${fieldType} (${method})`
        );
    }
}
```

An example output looks like:

```text
Analyzer 'my_document_analyzer_ID' created successfully!
  Description: Custom analyzer for extracting company information
  Fields (4):
    - company_name: string (extract)
    - total_amount: number (extract)
    - document_summary: string (generate)
    - document_type: string (classify)
```

> **Tip:**
> This code is based on the [create Analyzer sample](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/contentunderstanding/ai-content-understanding/samples/v1/javascript/createAnalyzer.js) in the SDK repository.


Optionally, you can create a classifier analyzer to categorize documents and use its results to route documents to prebuilt or custom analyzers you created. Here is an example of creating a custom analyzer for classification workflows.

```javascript
const classifierId =
    `my_classifier_${Math.floor(
        Date.now() / 1000
    )}`;

console.log(
    `Creating classifier '${classifierId}'...`
);

const classifierAnalyzer = {
    baseAnalyzerId: "prebuilt-document",
    description:
        "Custom classifier for financial"
        + " document categorization",
    config: {
        returnDetails: true,
        enableSegment: true,
        contentCategories: {
            Loan_Application: {
                description:
                    "Documents submitted by"
                    + " individuals or"
                    + " businesses to request"
                    + " funding, typically"
                    + " including personal or"
                    + " business details,"
                    + " financial history,"
                    + " loan amount, purpose,"
                    + " and supporting"
                    + " documentation.",
            },
            Invoice: {
                description:
                    "Billing documents issued"
                    + " by sellers or service"
                    + " providers to request"
                    + " payment for goods or"
                    + " services, detailing"
                    + " items, prices, taxes,"
                    + " totals, and payment"
                    + " terms.",
            },
            Bank_Statement: {
                description:
                    "Official statements"
                    + " issued by banks that"
                    + " summarize account"
                    + " activity over a"
                    + " period, including"
                    + " deposits, withdrawals,"
                    + " fees, and balances.",
            },
        },
    },
    models: {
        completion: "gpt-5.2",
    },
};

const classifierPoller =
    client.createAnalyzer(
        classifierId, classifierAnalyzer
    );
await classifierPoller.pollUntilDone();

const classifierResult =
    await client.getAnalyzer(classifierId);

console.log(
    `Classifier '${classifierId}' created`
    + ` successfully!`
);

if (classifierResult.description) {
    console.log(
        `  Description: `
        + `${classifierResult.description}`
    );
}
```

> **Tip:**
> This code is based on the [create Classifier sample](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/contentunderstanding/ai-content-understanding/samples/v1/javascript/createClassifier.js) for classification workflows.



# [Image](#tab/image)

The following example creates a custom image analyzer based on the [prebuilt image analyzer](../concepts/prebuilt-analyzers.md) for processing charts and graphs.

```javascript
const analyzerId =
    `my_image_analyzer_${Math.floor(
        Date.now() / 1000
    )}`;

const analyzer = {
    baseAnalyzerId: "prebuilt-image",
    description:
        "Custom analyzer for charts and graphs",
    fieldSchema: {
        name: "chart_schema",
        description:
            "Schema for extracting chart"
            + " information",
        fields: {
            Title: {
                type: "string",
                description:
                    "Title of the chart",
            },
            ChartType: {
                type: "string",
                method: "classify",
                description: "Type of chart",
                enum: ["bar", "line", "pie"],
            },
        },
    },
    models: {
        completion: "gpt-5.2",
    },
};

const poller = client.createAnalyzer(
    analyzerId, analyzer
);
await poller.pollUntilDone();

const result = await client.getAnalyzer(
    analyzerId
);
console.log(
    `Analyzer '${analyzerId}' created`
    + ` successfully!`
);

if (result.description) {
    console.log(
        `  Description: ${result.description}`
    );
}

if (result.fieldSchema?.fields) {
    const fields = result.fieldSchema.fields;
    console.log(
        `  Fields`
        + ` (${Object.keys(fields).length}):`
    );
    for (const [name, fieldDef]
        of Object.entries(fields)) {
        const method =
            fieldDef.method ?? "auto";
        const fieldType =
            fieldDef.type ?? "unknown";
        console.log(
            `    - ${name}: `
            + `${fieldType} (${method})`
        );
    }
}
```

An example output looks like:

```text
Analyzer 'my_image_analyzer_ID' created successfully!
  Description: Custom analyzer for charts and graphs
  Fields (2):
    - Title: string (auto)
    - ChartType: string (classify)
```

> **Tip:**
> This code adapts the [create Analyzer sample](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/contentunderstanding/ai-content-understanding/samples/v1/javascript/createAnalyzer.js) pattern for image content.

# [Audio](#tab/audio)

The following example creates a custom audio analyzer based on the [prebuilt audio analyzer](../concepts/prebuilt-analyzers.md) for processing customer support call recordings.

```javascript
const analyzerId =
    `my_audio_analyzer_${Math.floor(
        Date.now() / 1000
    )}`;

const analyzer = {
    baseAnalyzerId: "prebuilt-audio",
    description:
        "Custom analyzer for customer"
        + " support calls",
    config: {
        locales: ["en-US", "fr-FR"],
        returnDetails: true,
    },
    fieldSchema: {
        name: "call_center_schema",
        description:
            "Schema for analyzing customer"
            + " support calls",
        fields: {
            Summary: {
                type: "string",
                method: "generate",
                description:
                    "Summary of the call",
            },
            Sentiment: {
                type: "string",
                method: "classify",
                description:
                    "Overall sentiment of"
                    + " the call",
                enum: [
                    "Positive", "Neutral",
                    "Negative",
                ],
            },
            People: {
                type: "array",
                description:
                    "List of people mentioned",
                itemDefinition: {
                    type: "object",
                    properties: {
                        Name: {
                            type: "string",
                        },
                        Role: {
                            type: "string",
                        },
                    },
                },
            },
        },
    },
    models: {
        completion: "gpt-5.2",
    },
};

const poller = client.createAnalyzer(
    analyzerId, analyzer
);
await poller.pollUntilDone();

const result = await client.getAnalyzer(
    analyzerId
);
console.log(
    `Analyzer '${analyzerId}' created`
    + ` successfully!`
);

if (result.description) {
    console.log(
        `  Description: ${result.description}`
    );
}

if (result.fieldSchema?.fields) {
    const fields = result.fieldSchema.fields;
    console.log(
        `  Fields`
        + ` (${Object.keys(fields).length}):`
    );
    for (const [name, fieldDef]
        of Object.entries(fields)) {
        const method =
            fieldDef.method ?? "auto";
        const fieldType =
            fieldDef.type ?? "unknown";
        console.log(
            `    - ${name}: `
            + `${fieldType} (${method})`
        );
    }
}
```

An example output looks like:

```text
Analyzer 'my_audio_analyzer_ID' created successfully!
  Description: Custom analyzer for customer support calls
  Fields (3):
    - Summary: string (generate)
    - Sentiment: string (classify)
    - People: array (auto)
```

> **Tip:**
> This code adapts the [create Analyzer sample](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/contentunderstanding/ai-content-understanding/samples/v1/javascript/createAnalyzer.js) pattern for audio content.

# [Video](#tab/video)

The following example creates a custom video analyzer based on the [prebuilt video analyzer](../concepts/prebuilt-analyzers.md) for processing product demos and reviews.

```javascript
const analyzerId =
    `my_video_analyzer_${Math.floor(
        Date.now() / 1000
    )}`;

const analyzer = {
    baseAnalyzerId: "prebuilt-video",
    description:
        "Custom analyzer for product"
        + " demo videos",
    config: {
        locales: ["en-US", "fr-FR"],
        returnDetails: true,
    },
    fieldSchema: {
        name: "video_schema",
        description:
            "Schema for analyzing product"
            + " demo videos",
        fields: {
            Segments: {
                type: "array",
                itemDefinition: {
                    type: "object",
                    properties: {
                        SegmentId: {
                            type: "string",
                        },
                        Description: {
                            type: "string",
                            method: "generate",
                            description:
                                "Detailed summary"
                                + " of the video"
                                + " segment",
                        },
                        Sentiment: {
                            type: "string",
                            method: "classify",
                            enum: [
                                "Positive",
                                "Neutral",
                                "Negative",
                            ],
                        },
                    },
                },
            },
        },
    },
    models: {
        completion: "gpt-5.2",
    },
};

const poller = client.createAnalyzer(
    analyzerId, analyzer
);
await poller.pollUntilDone();

const result = await client.getAnalyzer(
    analyzerId
);
console.log(
    `Analyzer '${analyzerId}' created`
    + ` successfully!`
);

if (result.description) {
    console.log(
        `  Description: ${result.description}`
    );
}

if (result.fieldSchema?.fields) {
    const fields = result.fieldSchema.fields;
    console.log(
        `  Fields`
        + ` (${Object.keys(fields).length}):`
    );
    for (const [name, fieldDef]
        of Object.entries(fields)) {
        const method =
            fieldDef.method ?? "auto";
        const fieldType =
            fieldDef.type ?? "unknown";
        console.log(
            `    - ${name}: `
            + `${fieldType} (${method})`
        );
    }
}
```

An example output looks like:

```text
Analyzer 'my_video_analyzer_ID' created successfully!
  Description: Custom analyzer for product demo videos
  Fields (1):
    - Segments: array (auto)
```

> **Tip:**
> This code adapts the [create Analyzer sample](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/contentunderstanding/ai-content-understanding/samples/v1/javascript/createAnalyzer.js) pattern for video content.

---

## Use the custom analyzer

# [Document](#tab/document)

After creating the analyzer, use it to analyze a document and extract the custom fields. Delete the analyzer when you no longer need it.

```javascript
const documentUrl =
    "https://raw.githubusercontent.com/"
    + "Azure-Samples/"
    + "azure-ai-content-understanding-assets/"
    + "main/document/invoice.pdf";

const analyzePoller = client.analyze(
    analyzerId, [{ url: documentUrl }]
);
const analyzeResult =
    await analyzePoller.pollUntilDone();

if (analyzeResult.contents
    && analyzeResult.contents.length > 0) {
    const content = analyzeResult.contents[0];
    if (content.fields) {
        const company =
            content.fields["company_name"];
        if (company) {
            console.log(
                `Company Name: `
                + `${company.value}`
            );
            console.log(
                `  Confidence: `
                + `${company.confidence}`
            );
        }

        const total =
            content.fields["total_amount"];
        if (total) {
            console.log(
                `Total Amount: `
                + `${total.value}`
            );
        }

        const summary =
            content.fields["document_summary"];
        if (summary) {
            console.log(
                `Summary: ${summary.value}`
            );
        }

        const docType =
            content.fields["document_type"];
        if (docType) {
            console.log(
                `Document Type: `
                + `${docType.value}`
            );
        }
    }
}

// --- Clean up ---
console.log(
    `\nCleaning up: deleting analyzer`
    + ` '${analyzerId}'...`
);
await client.deleteAnalyzer(analyzerId);
console.log(
    `Analyzer '${analyzerId}' deleted`
    + ` successfully.`
);
```

An example output looks like:

```text
Company Name: CONTOSO LTD.
  Confidence: 0.739
Total Amount: 610
Summary: This document is an invoice from CONTOSO LTD. to Microsoft Corporation for consulting, document, and printing services provided during the service period. It details line items, subtotal, sales tax, total, previous unpaid balance, and the final amount due.
Document Type: invoice

Cleaning up: deleting analyzer 'my_document_analyzer_ID'...
Analyzer 'my_document_analyzer_ID' deleted successfully.
```

> **Tip:**
> Check out more examples of running analyzers at [JavaScript SDK samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/contentunderstanding/ai-content-understanding/samples/v1/javascript).

# [Image](#tab/image)

After creating the analyzer, use it to analyze an image and extract the custom fields. Delete the analyzer when you no longer need it.

```javascript
const imageUrl =
    "https://raw.githubusercontent.com/"
    + "Azure-Samples/"
    + "azure-ai-content-understanding-assets/"
    + "main/image/pieChart.jpg";

const analyzePoller = client.analyze(
    analyzerId, [{ url: imageUrl }]
);
const analyzeResult =
    await analyzePoller.pollUntilDone();

if (analyzeResult.contents
    && analyzeResult.contents.length > 0) {
    const content = analyzeResult.contents[0];
    if (content.fields) {
        const title =
            content.fields["Title"];
        if (title) {
            console.log(
                `Title: ${title.value}`
            );
        }

        const chartType =
            content.fields["ChartType"];
        if (chartType) {
            console.log(
                `Chart Type: `
                + `${chartType.value}`
            );
        }
    }
}

// --- Clean up ---
console.log(
    `\nCleaning up: deleting analyzer`
    + ` '${analyzerId}'...`
);
await client.deleteAnalyzer(analyzerId);
console.log(
    `Analyzer '${analyzerId}' deleted`
    + ` successfully.`
);
```

An example output looks like:

```text
Title: Distribution of Weekly Working Hours
Chart Type: pie

Cleaning up: deleting analyzer 'my_image_analyzer_ID'...
Analyzer 'my_image_analyzer_ID' deleted successfully.
```

> **Tip:**
> Check out more examples of running analyzers at [JavaScript SDK samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/contentunderstanding/ai-content-understanding/samples/v1/javascript).

# [Audio](#tab/audio)

After creating the analyzer, use it to analyze an audio file and extract the custom fields. Delete the analyzer when you no longer need it.

```javascript
const audioUrl =
    "https://raw.githubusercontent.com/"
    + "Azure-Samples/"
    + "azure-ai-content-understanding-assets/"
    + "main/audio/callCenterRecording.mp3";

const analyzePoller = client.analyze(
    analyzerId, [{ url: audioUrl }]
);
const analyzeResult =
    await analyzePoller.pollUntilDone();

if (analyzeResult.contents
    && analyzeResult.contents.length > 0) {
    const content = analyzeResult.contents[0];
    if (content.fields) {
        const summary =
            content.fields["Summary"];
        if (summary) {
            console.log(
                `Summary: ${summary.value}`
            );
        }

        const sentiment =
            content.fields["Sentiment"];
        if (sentiment) {
            console.log(
                `Sentiment: `
                + `${sentiment.value}`
            );
        }
    }
}

// --- Clean up ---
console.log(
    `\nCleaning up: deleting analyzer`
    + ` '${analyzerId}'...`
);
await client.deleteAnalyzer(analyzerId);
console.log(
    `Analyzer '${analyzerId}' deleted`
    + ` successfully.`
);
```

An example output looks like:

```text
Summary: Maria Smith contacted Contoso to inquire about her current point balance. John Doe, the representative, verified her identity by requesting her date of birth and then provided her with her point balance of 599 points. Maria confirmed she needed no further information and ended the call.
Sentiment: Positive

Cleaning up: deleting analyzer 'my_audio_analyzer_ID'...
Analyzer 'my_audio_analyzer_ID' deleted successfully.
```

> **Tip:**
> Check out more examples of running analyzers at [JavaScript SDK samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/contentunderstanding/ai-content-understanding/samples/v1/javascript).

# [Video](#tab/video)

After creating the analyzer, use it to analyze a video and extract the custom fields. Delete the analyzer when you no longer need it.

```javascript
const videoUrl =
    "https://raw.githubusercontent.com/"
    + "Azure-Samples/"
    + "azure-ai-content-understanding-assets/"
    + "main/videos/sdk_samples/"
    + "FlightSimulator.mp4";

const analyzePoller = client.analyze(
    analyzerId, [{ url: videoUrl }]
);
const analyzeResult =
    await analyzePoller.pollUntilDone();

if (analyzeResult.contents
    && analyzeResult.contents.length > 0) {
    const content = analyzeResult.contents[0];
    console.log(
        `Content kind: ${content.kind}`
    );
    if (content.fields) {
        const segments =
            content.fields["Segments"];
        if (segments && segments.value) {
            console.log(
                `Segments`
                + ` (${segments.value.length}):`
            );
            for (const segment
                of segments.value) {
                const segId =
                    segment.value
                        ?.SegmentId?.value
                    ?? "N/A";
                const desc =
                    segment.value
                        ?.Description?.value
                    ?? "N/A";
                const sent =
                    segment.value
                        ?.Sentiment?.value
                    ?? "N/A";
                console.log(
                    `  Segment: ${segId}`
                );
                console.log(
                    `    Description:`
                    + ` ${desc}`
                );
                console.log(
                    `    Sentiment:`
                    + ` ${sent}`
                );
            }
        }
    }
}

// --- Clean up ---
console.log(
    `\nCleaning up: deleting analyzer`
    + ` '${analyzerId}'...`
);
await client.deleteAnalyzer(analyzerId);
console.log(
    `Analyzer '${analyzerId}' deleted`
    + ` successfully.`
);
```

An example output looks like:

```text
Content kind: audioVisual
Segments (16):
  Segment: 00:00:00.000-00:00:01.467
    Description: The video opens with a scenic aerial view of an island surrounded by turquoise water. A small airplane is flying over the landscape. The screen displays the logos for 'Flight Simulator' and 'Microsoft Azure AI', indicating a collaboration or integration between the two.
    Sentiment: Positive
  Segment: 00:00:01.467-00:00:03.233
    Description: A man is shown sitting in a modern office setting, likely preparing to speak or introduce the topic. The background features geometric wall lights and a plant, giving a professional and contemporary atmosphere.
    Sentiment: Neutral
  Segment: 00:00:03.233-00:00:07.367
    Description: The screen displays a digital audio waveform, suggesting a focus on audio technology. The accompanying transcript discusses the importance of good data for neural TTS (Text-to-Speech) to achieve a high-quality voice.
    Sentiment: Neutral
  Segment: 00:00:07.367-00:00:08.200
    Description: Another man is shown in a similar office environment, possibly continuing the explanation or providing additional information about the product.
    Sentiment: Neutral
  Segment: 00:00:08.200-00:00:11.367
    Description: The video transitions to an outdoor scene showing a large facility with multiple buildings, set in a rural landscape. This likely represents the data centers or infrastructure supporting the technology.
    Sentiment: Neutral
  Segment: 00:00:11.367-00:00:13.567
    Description: The camera moves inside a data center, showing rows of servers and high-tech equipment. This emphasizes the scale and capability of the infrastructure used for the TTS model.
    Sentiment: Neutral
  Segment: 00:00:13.567-00:00:16.100
    Description: The man from earlier is shown again in the office, likely elaborating on the accumulation of data and the universal TTS model, as mentioned in the transcript.
    Sentiment: Neutral
  Segment: 00:00:16.100-00:00:19.433
    Description: A biplane is seen flying over a coastal city with clear blue water and lush green hills, highlighting the realism and immersive visuals of the Flight Simulator.
    Sentiment: Positive
  Segment: 00:00:19.433-00:00:23.967
    Description: The video shows a castle surrounded by mountains and clouds, with a small aircraft flying nearby. This further showcases the detailed environments possible in the Flight Simulator.
    Sentiment: Positive
  Segment: 00:00:23.967-00:00:30.033
    Description: A bald man is interviewed in a modern office setting. The transcript discusses the high fidelity and naturalness of voices generated by cognitive services, suggesting he is explaining the benefits of the technology.
    Sentiment: Positive
  Segment: 00:00:30.033-00:00:33.200
    Description: The bald man continues speaking, possibly providing more details about the product's capabilities and its impact on user experience.
    Sentiment: Positive
  Segment: 00:00:33.200-00:00:35.267
    Description: The video shifts to an overhead view of an airplane on the runway, preparing for movement. This scene likely relates to the realism of the simulator and the integration of AI-driven voice technology.
    Sentiment: Neutral
  Segment: 00:00:35.267-00:00:37.700
    Description: A ground crew member directs an Airbus aircraft, with pilots visible in the cockpit. This scene emphasizes the operational realism and communication aspects in the simulator.
    Sentiment: Neutral
  Segment: 00:00:37.700-00:00:39.200
    Description: Two ground crew members walk near an aircraft on the tarmac, with airport buildings and other planes in the background. The environment is realistic and detailed.
    Sentiment: Neutral
  Segment: 00:00:39.200-00:00:42.033
    Description: A close-up of an Airbus aircraft at the gate, with sunlight illuminating the scene. This further highlights the visual fidelity and immersive experience of the simulator.
    Sentiment: Positive
  Segment: 00:00:42.033-00:00:43.866
    Description: The video ends with the Microsoft logo and branding, signaling the conclusion of the product demo and reinforcing the partnership between Flight Simulator and Microsoft Azure AI.
    Sentiment: Positive

Cleaning up: deleting analyzer 'my_video_analyzer_ID'...
Analyzer 'my_video_analyzer_ID' deleted successfully.
```

> **Tip:**
> Check out more examples of running analyzers at [JavaScript SDK samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/contentunderstanding/ai-content-understanding/samples/v1/javascript).

---







**Applies to: programming-language-typescript**



<!-- markdownlint-disable MD025 -->

[Client library](https://www.npmjs.com/package/@azure/ai-content-understanding) | [Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/contentunderstanding/ai-content-understanding/samples/v1/typescript) | [SDK source](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/contentunderstanding/ai-content-understanding)

This guide shows you how to use the Content Understanding TypeScript SDK to create a custom analyzer that extracts structured data from your content. Custom analyzers support document, image, audio, and video content types.

## Prerequisites

* An active Azure subscription. If you don't have an Azure account, [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
* A [Microsoft Foundry resource](https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry) created in a [supported region](../language-region-support.md).
* Your resource endpoint and API key (found under **Keys and Endpoint** in the Azure portal).
* Model deployment defaults configured for your resource. See [Models and deployments](../concepts/models-deployments.md) or this one-time [configuration script](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/contentunderstanding/ai-content-understanding/samples/v1/typescript/src/updateDefaults.ts) for setup instructions.
* [Node.js](https://nodejs.org/) LTS version.
* [TypeScript](https://www.typescriptlang.org/) 5.x or later.

## Set up

1. Create a new Node.js project:

    ```console
    mkdir custom-analyzer-tutorial
    cd custom-analyzer-tutorial
    npm init -y
    ```

1. Install TypeScript and the Content Understanding client library:

    ```console
    npm install typescript ts-node @azure/ai-content-understanding
    ```

1. Optionally, install the Azure Identity library for Microsoft Entra authentication:

    ```console
    npm install @azure/identity
    ```

## Set up environment variables

To authenticate with the Content Understanding service, set the environment variables with your own values before running the sample:
- `CONTENTUNDERSTANDING_ENDPOINT` - the endpoint to your Content Understanding resource.
- `CONTENTUNDERSTANDING_KEY` - your Content Understanding API key (optional if using [Microsoft Entra ID](../concepts/secure-communications.md) DefaultAzureCredential).

### Windows

```cmd
setx CONTENTUNDERSTANDING_ENDPOINT "your-endpoint"
setx CONTENTUNDERSTANDING_KEY "your-key"
```

### Linux / macOS

```bash
export CONTENTUNDERSTANDING_ENDPOINT="your-endpoint"
export CONTENTUNDERSTANDING_KEY="your-key"
```

## Create the client

```typescript
import { AzureKeyCredential } from "@azure/core-auth";
import {
    ContentUnderstandingClient,
} from "@azure/ai-content-understanding";
import type {
    ContentAnalyzer,
    ContentAnalyzerConfig,
    ContentFieldSchema,
} from "@azure/ai-content-understanding";

const endpoint =
    process.env["CONTENTUNDERSTANDING_ENDPOINT"]!;
const key =
    process.env["CONTENTUNDERSTANDING_KEY"]!;

const client = new ContentUnderstandingClient(
    endpoint,
    new AzureKeyCredential(key)
);
```

## Create a custom analyzer

# [Document](#tab/document)

The following example creates a custom document analyzer based on the [prebuilt document analyzer](../concepts/prebuilt-analyzers.md). It defines fields using three extraction methods: `extract` for literal text, `generate` for AI-generated summaries, and `classify` for categorization.

```typescript
const analyzerId =
    `my_document_analyzer_${Math.floor(
        Date.now() / 1000
    )}`;

const fieldSchema: ContentFieldSchema = {
    name: "company_schema",
    description:
        "Schema for extracting company"
        + " information",
    fields: {
        company_name: {
            type: "string",
            method: "extract",
            description:
                "Name of the company",
        },
        total_amount: {
            type: "number",
            method: "extract",
            description:
                "Total amount on the document",
        },
        document_summary: {
            type: "string",
            method: "generate",
            description:
                "A brief summary of the"
                + " document content",
        },
        document_type: {
            type: "string",
            method: "classify",
            description: "Type of document",
            enum: [
                "invoice", "receipt",
                "contract", "report", "other",
            ],
        },
    },
};

const config: ContentAnalyzerConfig = {
    enableFormula: true,
    enableLayout: true,
    enableOcr: true,
    estimateFieldSourceAndConfidence: true,
    returnDetails: true,
};

const analyzer: ContentAnalyzer = {
    baseAnalyzerId: "prebuilt-document",
    description:
        "Custom analyzer for extracting"
        + " company information",
    config,
    fieldSchema,
    models: {
        completion: "gpt-5.2",
        embedding: "text-embedding-3-large", // Required when using field_schema and prebuilt-document base analyzer
    },
} as unknown as ContentAnalyzer;

const poller = client.createAnalyzer(
    analyzerId, analyzer
);
await poller.pollUntilDone();

const result = await client.getAnalyzer(
    analyzerId
);
console.log(
    `Analyzer '${analyzerId}' created`
    + ` successfully!`
);

if (result.description) {
    console.log(
        `  Description: ${result.description}`
    );
}

if (result.fieldSchema?.fields) {
    const fields = result.fieldSchema.fields;
    console.log(
        `  Fields`
        + ` (${Object.keys(fields).length}):`
    );
    for (const [name, fieldDef]
        of Object.entries(fields)) {
        const method =
            fieldDef.method ?? "auto";
        const fieldType =
            fieldDef.type ?? "unknown";
        console.log(
            `    - ${name}: `
            + `${fieldType} (${method})`
        );
    }
}
```

An example output looks like:

```text
Analyzer 'my_document_analyzer_ID' created successfully!
  Description: Custom analyzer for extracting company information
  Fields (4):
    - company_name: string (extract)
    - total_amount: number (extract)
    - document_summary: string (generate)
    - document_type: string (classify)
```

> **Tip:**
> This code is based on the [create Analyzer sample](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/contentunderstanding/ai-content-understanding/samples/v1/typescript/src/createAnalyzer.ts) in the SDK repository.


Optionally, you can create a classifier analyzer to categorize documents and use its results to route documents to prebuilt or custom analyzers you created. Here is an example of creating a custom analyzer for classification workflows.

```typescript
const classifierId =
    `my_classifier_${Math.floor(
        Date.now() / 1000
    )}`;

console.log(
    `Creating classifier '${classifierId}'...`
);

const classifierAnalyzer: ContentAnalyzer = {
    baseAnalyzerId: "prebuilt-document",
    description:
        "Custom classifier for financial"
        + " document categorization",
    config: {
        returnDetails: true,
        enableSegment: true,
        contentCategories: {
            Loan_Application: {
                description:
                    "Documents submitted by"
                    + " individuals or"
                    + " businesses to request"
                    + " funding, typically"
                    + " including personal or"
                    + " business details,"
                    + " financial history,"
                    + " loan amount, purpose,"
                    + " and supporting"
                    + " documentation.",
            },
            Invoice: {
                description:
                    "Billing documents issued"
                    + " by sellers or service"
                    + " providers to request"
                    + " payment for goods or"
                    + " services, detailing"
                    + " items, prices, taxes,"
                    + " totals, and payment"
                    + " terms.",
            },
            Bank_Statement: {
                description:
                    "Official statements"
                    + " issued by banks that"
                    + " summarize account"
                    + " activity over a"
                    + " period, including"
                    + " deposits, withdrawals,"
                    + " fees, and balances.",
            },
        },
    } as unknown as ContentAnalyzerConfig,
    models: {
        completion: "gpt-5.2",
    },
} as unknown as ContentAnalyzer;

const classifierPoller =
    client.createAnalyzer(
        classifierId, classifierAnalyzer
    );
await classifierPoller.pollUntilDone();

const classifierResult =
    await client.getAnalyzer(classifierId);

console.log(
    `Classifier '${classifierId}' created`
    + ` successfully!`
);

if (classifierResult.description) {
    console.log(
        `  Description: `
        + `${classifierResult.description}`
    );
}
```

> **Tip:**
> This code is based on the [create Classifier sample](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/contentunderstanding/ai-content-understanding/samples/v1/typescript/src/createClassifier.ts) for classification workflows.



# [Image](#tab/image)

The following example creates a custom image analyzer based on the [prebuilt image analyzer](../concepts/prebuilt-analyzers.md) for processing charts and graphs.

```typescript
const analyzerId =
    `my_image_analyzer_${Math.floor(
        Date.now() / 1000
    )}`;

const fieldSchema: ContentFieldSchema = {
    name: "chart_schema",
    description:
        "Schema for extracting chart"
        + " information",
    fields: {
        Title: {
            type: "string",
            description:
                "Title of the chart",
        },
        ChartType: {
            type: "string",
            method: "classify",
            description: "Type of chart",
            enum: ["bar", "line", "pie"],
        },
    },
};

const analyzer: ContentAnalyzer = {
    baseAnalyzerId: "prebuilt-image",
    description:
        "Custom analyzer for charts"
        + " and graphs",
    fieldSchema,
    models: {
        completion: "gpt-5.2",
    },
} as unknown as ContentAnalyzer;

const poller = client.createAnalyzer(
    analyzerId, analyzer
);
await poller.pollUntilDone();

const result = await client.getAnalyzer(
    analyzerId
);
console.log(
    `Analyzer '${analyzerId}' created`
    + ` successfully!`
);

if (result.description) {
    console.log(
        `  Description: ${result.description}`
    );
}

if (result.fieldSchema?.fields) {
    const fields = result.fieldSchema.fields;
    console.log(
        `  Fields`
        + ` (${Object.keys(fields).length}):`
    );
    for (const [name, fieldDef]
        of Object.entries(fields)) {
        const method =
            fieldDef.method ?? "auto";
        const fieldType =
            fieldDef.type ?? "unknown";
        console.log(
            `    - ${name}: `
            + `${fieldType} (${method})`
        );
    }
}
```

An example output looks like:

```text
Analyzer 'my_image_analyzer_ID' created successfully!
  Description: Custom analyzer for charts and graphs
  Fields (2):
    - Title: string (auto)
    - ChartType: string (classify)
```

> **Tip:**
> This code adapts the [create Analyzer sample](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/contentunderstanding/ai-content-understanding/samples/v1/typescript/src/createAnalyzer.ts) pattern for image content.

# [Audio](#tab/audio)

The following example creates a custom audio analyzer based on the [prebuilt audio analyzer](../concepts/prebuilt-analyzers.md) for processing customer support call recordings.

```typescript
const analyzerId =
    `my_audio_analyzer_${Math.floor(
        Date.now() / 1000
    )}`;

const fieldSchema: ContentFieldSchema = {
    name: "call_center_schema",
    description:
        "Schema for analyzing customer"
        + " support calls",
    fields: {
        Summary: {
            type: "string",
            method: "generate",
            description:
                "Summary of the call",
        },
        Sentiment: {
            type: "string",
            method: "classify",
            description:
                "Overall sentiment of"
                + " the call",
            enum: [
                "Positive", "Neutral",
                "Negative",
            ],
        },
        People: {
            type: "array",
            description:
                "List of people mentioned",
            itemDefinition: {
                type: "object",
                properties: {
                    Name: { type: "string" },
                    Role: { type: "string" },
                },
            },
        },
    },
};

const config: ContentAnalyzerConfig = {
    locales: ["en-US", "fr-FR"],
    returnDetails: true,
};

const analyzer: ContentAnalyzer = {
    baseAnalyzerId: "prebuilt-audio",
    description:
        "Custom analyzer for customer"
        + " support calls",
    config,
    fieldSchema,
    models: {
        completion: "gpt-5.2",
    },
} as unknown as ContentAnalyzer;

const poller = client.createAnalyzer(
    analyzerId, analyzer
);
await poller.pollUntilDone();

const result = await client.getAnalyzer(
    analyzerId
);
console.log(
    `Analyzer '${analyzerId}' created`
    + ` successfully!`
);

if (result.description) {
    console.log(
        `  Description: ${result.description}`
    );
}

if (result.fieldSchema?.fields) {
    const fields = result.fieldSchema.fields;
    console.log(
        `  Fields`
        + ` (${Object.keys(fields).length}):`
    );
    for (const [name, fieldDef]
        of Object.entries(fields)) {
        const method =
            fieldDef.method ?? "auto";
        const fieldType =
            fieldDef.type ?? "unknown";
        console.log(
            `    - ${name}: `
            + `${fieldType} (${method})`
        );
    }
}
```

An example output looks like:

```text
Analyzer 'my_audio_analyzer_ID' created successfully!
  Description: Custom analyzer for customer support calls
  Fields (3):
    - Summary: string (generate)
    - Sentiment: string (classify)
    - People: array (auto)
```

> **Tip:**
> This code adapts the [create Analyzer sample](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/contentunderstanding/ai-content-understanding/samples/v1/typescript/src/createAnalyzer.ts) pattern for audio content.

# [Video](#tab/video)

The following example creates a custom video analyzer based on the [prebuilt video analyzer](../concepts/prebuilt-analyzers.md) for processing product demos and reviews.

```typescript
const analyzerId =
    `my_video_analyzer_${Math.floor(
        Date.now() / 1000
    )}`;

const fieldSchema: ContentFieldSchema = {
    name: "video_schema",
    description:
        "Schema for analyzing product"
        + " demo videos",
    fields: {
        Segments: {
            type: "array",
            itemDefinition: {
                type: "object",
                properties: {
                    SegmentId: {
                        type: "string",
                    },
                    Description: {
                        type: "string",
                        method: "generate",
                        description:
                            "Detailed summary"
                            + " of the video"
                            + " segment",
                    },
                    Sentiment: {
                        type: "string",
                        method: "classify",
                        enum: [
                            "Positive",
                            "Neutral",
                            "Negative",
                        ],
                    },
                },
            },
        },
    },
};

const config: ContentAnalyzerConfig = {
    locales: ["en-US", "fr-FR"],
    returnDetails: true,
};

const analyzer: ContentAnalyzer = {
    baseAnalyzerId: "prebuilt-video",
    description:
        "Custom analyzer for product"
        + " demo videos",
    config,
    fieldSchema,
    models: {
        completion: "gpt-5.2",
    },
} as unknown as ContentAnalyzer;

const poller = client.createAnalyzer(
    analyzerId, analyzer
);
await poller.pollUntilDone();

const result = await client.getAnalyzer(
    analyzerId
);
console.log(
    `Analyzer '${analyzerId}' created`
    + ` successfully!`
);

if (result.description) {
    console.log(
        `  Description: ${result.description}`
    );
}

if (result.fieldSchema?.fields) {
    const fields = result.fieldSchema.fields;
    console.log(
        `  Fields`
        + ` (${Object.keys(fields).length}):`
    );
    for (const [name, fieldDef]
        of Object.entries(fields)) {
        const method =
            fieldDef.method ?? "auto";
        const fieldType =
            fieldDef.type ?? "unknown";
        console.log(
            `    - ${name}: `
            + `${fieldType} (${method})`
        );
    }
}
```

An example output looks like:

```text
Analyzer 'my_video_analyzer_ID' created successfully!
  Description: Custom analyzer for product demo videos
  Fields (1):
    - Segments: array (auto)
```

> **Tip:**
> This code adapts the [create Analyzer sample](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/contentunderstanding/ai-content-understanding/samples/v1/typescript/src/createAnalyzer.ts) pattern for video content.

---

## Use the custom analyzer

# [Document](#tab/document)

After creating the analyzer, use it to analyze a document and extract the custom fields. Delete the analyzer when you no longer need it.

```typescript
const documentUrl =
    "https://raw.githubusercontent.com/"
    + "Azure-Samples/"
    + "azure-ai-content-understanding-assets/"
    + "main/document/invoice.pdf";

const analyzePoller = client.analyze(
    analyzerId, [{ url: documentUrl }]
);
const analyzeResult =
    await analyzePoller.pollUntilDone();

if (analyzeResult.contents
    && analyzeResult.contents.length > 0) {
    const content = analyzeResult.contents[0];
    if (content.fields) {
        const company =
            content.fields["company_name"];
        if (company) {
            console.log(
                `Company Name: `
                + `${company.value}`
            );
            console.log(
                `  Confidence: `
                + `${company.confidence}`
            );
        }

        const total =
            content.fields["total_amount"];
        if (total) {
            console.log(
                `Total Amount: `
                + `${total.value}`
            );
        }

        const summary =
            content.fields["document_summary"];
        if (summary) {
            console.log(
                `Summary: ${summary.value}`
            );
        }

        const docType =
            content.fields["document_type"];
        if (docType) {
            console.log(
                `Document Type: `
                + `${docType.value}`
            );
        }
    }
}

// --- Clean up ---
console.log(
    `\nCleaning up: deleting analyzer`
    + ` '${analyzerId}'...`
);
await client.deleteAnalyzer(analyzerId);
console.log(
    `Analyzer '${analyzerId}' deleted`
    + ` successfully.`
);
```

An example output looks like:

```text
Company Name: CONTOSO LTD.
  Confidence: 0.818
Total Amount: 610
Summary: This document is an invoice from CONTOSO LTD. to MICROSOFT CORPORATION for consulting, document, and printing services provided during the service period 10/14/2019 - 11/14/2019. It details line items, subtotal, sales tax, total, previous unpaid balance, and the final amount due.
Document Type: invoice

Cleaning up: deleting analyzer 'my_document_analyzer_ID'...
Analyzer 'my_document_analyzer_ID' deleted successfully.
```

> **Tip:**
> Check out more examples of running analyzers at [TypeScript SDK samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/contentunderstanding/ai-content-understanding/samples/v1/typescript).

# [Image](#tab/image)

After creating the analyzer, use it to analyze an image and extract the custom fields. Delete the analyzer when you no longer need it.

```typescript
const imageUrl =
    "https://raw.githubusercontent.com/"
    + "Azure-Samples/"
    + "azure-ai-content-understanding-assets/"
    + "main/image/pieChart.jpg";

const analyzePoller = client.analyze(
    analyzerId, [{ url: imageUrl }]
);
const analyzeResult =
    await analyzePoller.pollUntilDone();

if (analyzeResult.contents
    && analyzeResult.contents.length > 0) {
    const content = analyzeResult.contents[0];
    if (content.fields) {
        const title =
            content.fields["Title"];
        if (title) {
            console.log(
                `Title: ${title.value}`
            );
        }

        const chartType =
            content.fields["ChartType"];
        if (chartType) {
            console.log(
                `Chart Type: `
                + `${chartType.value}`
            );
        }
    }
}

// --- Clean up ---
console.log(
    `\nCleaning up: deleting analyzer`
    + ` '${analyzerId}'...`
);
await client.deleteAnalyzer(analyzerId);
console.log(
    `Analyzer '${analyzerId}' deleted`
    + ` successfully.`
);
```

An example output looks like:

```text
Title: Distribution of Weekly Working Hours
Chart Type: pie

Cleaning up: deleting analyzer 'my_image_analyzer_ID'...
Analyzer 'my_image_analyzer_ID' deleted successfully.
```

> **Tip:**
> Check out more examples of running analyzers at [TypeScript SDK samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/contentunderstanding/ai-content-understanding/samples/v1/typescript).

# [Audio](#tab/audio)

After creating the analyzer, use it to analyze an audio file and extract the custom fields. Delete the analyzer when you no longer need it.

```typescript
const audioUrl =
    "https://raw.githubusercontent.com/"
    + "Azure-Samples/"
    + "azure-ai-content-understanding-assets/"
    + "main/audio/callCenterRecording.mp3";

const analyzePoller = client.analyze(
    analyzerId, [{ url: audioUrl }]
);
const analyzeResult =
    await analyzePoller.pollUntilDone();

if (analyzeResult.contents
    && analyzeResult.contents.length > 0) {
    const content = analyzeResult.contents[0];
    if (content.fields) {
        const summary =
            content.fields["Summary"];
        if (summary) {
            console.log(
                `Summary: ${summary.value}`
            );
        }

        const sentiment =
            content.fields["Sentiment"];
        if (sentiment) {
            console.log(
                `Sentiment: `
                + `${sentiment.value}`
            );
        }
    }
}

// --- Clean up ---
console.log(
    `\nCleaning up: deleting analyzer`
    + ` '${analyzerId}'...`
);
await client.deleteAnalyzer(analyzerId);
console.log(
    `Analyzer '${analyzerId}' deleted`
    + ` successfully.`
);
```

An example output looks like:

```text
Summary: Maria Smith contacted Contoso to inquire about her current point balance. John Doe, the representative, verified her identity by requesting her date of birth and then provided her with her point balance of 599 points. Maria confirmed she did not need further assistance, and the call ended amicably.
Sentiment: Positive

Cleaning up: deleting analyzer 'my_audio_analyzer_ID'...
Analyzer 'my_audio_analyzer_ID' deleted successfully.
```

> **Tip:**
> Check out more examples of running analyzers at [TypeScript SDK samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/contentunderstanding/ai-content-understanding/samples/v1/typescript).

# [Video](#tab/video)

After creating the analyzer, use it to analyze a video and extract the custom fields. Delete the analyzer when you no longer need it.

```typescript
const videoUrl =
    "https://raw.githubusercontent.com/"
    + "Azure-Samples/"
    + "azure-ai-content-understanding-assets/"
    + "main/videos/sdk_samples/"
    + "FlightSimulator.mp4";

const analyzePoller = client.analyze(
    analyzerId, [{ url: videoUrl }]
);
const analyzeResult =
    await analyzePoller.pollUntilDone();

if (analyzeResult.contents
    && analyzeResult.contents.length > 0) {
    const content = analyzeResult.contents[0];
    console.log(
        `Content kind: ${content.kind}`
    );
    if (content.fields) {
        const segments =
            content.fields["Segments"];
        if (segments && segments.value) {
            const segArray =
                segments.value as any[];
            console.log(
                `Segments`
                + ` (${segArray.length}):`
            );
            for (const segment
                of segArray) {
                const segId =
                    segment.value
                        ?.SegmentId?.value
                    ?? "N/A";
                const desc =
                    segment.value
                        ?.Description?.value
                    ?? "N/A";
                const sent =
                    segment.value
                        ?.Sentiment?.value
                    ?? "N/A";
                console.log(
                    `  Segment: ${segId}`
                );
                console.log(
                    `    Description:`
                    + ` ${desc}`
                );
                console.log(
                    `    Sentiment:`
                    + ` ${sent}`
                );
            }
        }
    }
}

// --- Clean up ---
console.log(
    `\nCleaning up: deleting analyzer`
    + ` '${analyzerId}'...`
);
await client.deleteAnalyzer(analyzerId);
console.log(
    `Analyzer '${analyzerId}' deleted`
    + ` successfully.`
);
```

An example output looks like:

```text
Content kind: audioVisual
Segments (16):
  Segment: 00:00:00.000-00:00:01.467
    Description: The video opens with a scenic aerial view of an island surrounded by blue water, featuring a small airplane flying over it. The screen displays the logos for 'Flight Simulator' and 'Microsoft Azure AI', indicating a collaboration or integration between the two.
    Sentiment: Positive
  Segment: 00:00:01.467-00:00:03.233
    Description: A man is shown sitting in a modern office environment, likely preparing to speak or introduce the topic. The background includes plants and geometric wall lights, giving a professional and contemporary feel.
    Sentiment: Neutral
  Segment: 00:00:03.233-00:00:07.367
    Description: The video transitions to a close-up of a digital audio waveform, visually representing sound data. This segment aligns with the audio discussing the importance of good data for neural TTS (Text-to-Speech) and the creation of a universal TTS model using extensive audio data.
    Sentiment: Positive
  Segment: 00:00:07.367-00:00:08.200
    Description: Another man appears in a similar office setting, possibly continuing the explanation or providing additional commentary.
    Sentiment: Neutral
  Segment: 00:00:08.200-00:00:11.367
    Description: The scene shifts to an outdoor view of a large facility surrounded by green fields and blue skies, likely representing a data center or infrastructure supporting the TTS technology.
    Sentiment: Positive
  Segment: 00:00:11.367-00:00:13.567
    Description: Inside a data center, rows of servers are shown, emphasizing the technological backbone and scale of the operation required for processing large amounts of audio data.
    Sentiment: Positive
  Segment: 00:00:13.567-00:00:16.100
    Description: The first man returns, continuing his explanation in the office setting. The audio mentions the accumulation of data to capture audio nuances and generate natural voices.
    Sentiment: Positive
  Segment: 00:00:16.100-00:00:19.433
    Description: A biplane is seen flying over a coastal landscape, showcasing the immersive visuals of Flight Simulator. This segment highlights the realism and beauty of the simulation.
    Sentiment: Positive
  Segment: 00:00:19.433-00:00:23.967
    Description: A plane flies past a castle set against a mountainous backdrop, further demonstrating the detailed environments in Flight Simulator.
    Sentiment: Positive
  Segment: 00:00:23.967-00:00:30.033
    Description: A bald man is interviewed in a modern office space, likely discussing the benefits of cognitive services offerings, such as higher fidelity and more human-like voices.
    Sentiment: Positive
  Segment: 00:00:30.033-00:00:33.200
    Description: The interview continues with the bald man, focusing on his commentary about the product's features and advantages.
    Sentiment: Positive
  Segment: 00:00:33.200-00:00:35.267
    Description: The video shifts to an overhead view of an airplane on the runway, preparing for movement, possibly referencing the realism of in-game operations.
    Sentiment: Neutral
  Segment: 00:00:35.267-00:00:37.700
    Description: A ground crew member directs an Airbus aircraft, highlighting the detailed simulation of airport operations in Flight Simulator.
    Sentiment: Positive
  Segment: 00:00:37.700-00:00:39.200
    Description: Two ground crew members walk near an aircraft on the tarmac, reinforcing the realistic airport environment and operations.
    Sentiment: Neutral
  Segment: 00:00:39.200-00:00:42.033
    Description: A close-up of an Airbus aircraft at the gate, with sunlight and clouds in the background, further showcasing the visual fidelity of Flight Simulator.
    Sentiment: Positive
  Segment: 00:00:42.033-00:00:43.866
    Description: The video concludes with the Microsoft logo and branding, signaling the end of the product demo and reinforcing the partnership.
    Sentiment: Positive

Cleaning up: deleting analyzer 'my_video_analyzer_ID'...
Analyzer 'my_video_analyzer_ID' deleted successfully.
```

> **Tip:**
> Check out more examples of running analyzers at [TypeScript SDK samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/contentunderstanding/ai-content-understanding/samples/v1/typescript).

---







## Related content

* [Improve analyzer training with labeled examples](../document/analyzer-improvement.md#improve-analyzer-training-with-labeled-examples)
* Review code samples: [**visual document search**](https://github.com/Azure-Samples/azure-ai-search-with-content-understanding-python/blob/main/notebooks/search_with_visual_document.ipynb).
* Review code sample: [**analyzer templates**](https://github.com/Azure-Samples/azure-ai-content-understanding-python/tree/main/analyzer_templates).
* Explore more [Python SDK samples](https://github.com/Azure/azure-sdk-for-python/tree/main/sdk/contentunderstanding/azure-ai-contentunderstanding/samples)
* Explore more [.NET SDK samples](https://github.com/Azure/azure-sdk-for-net/tree/main/sdk/contentunderstanding/Azure.AI.ContentUnderstanding/samples)
* Explore more [Java SDK samples](https://github.com/Azure/azure-sdk-for-java/tree/main/sdk/contentunderstanding/azure-ai-contentunderstanding/src/samples/java/com/azure/ai/contentunderstanding)
* Explore more [JavaScript SDK samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/contentunderstanding/ai-content-understanding/samples/v1/javascript)
* Explore more [TypeScript SDK samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/contentunderstanding/ai-content-understanding/samples/v1/typescript)
* Try processing your document content using Content Understanding in [Foundry](https://aka.ms/cu-landing).
