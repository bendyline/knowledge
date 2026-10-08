---
title: "Quickstart: Azure Content Understanding in Foundry Tools"
titleSuffix: Foundry Tools
description: Learn how to use Content Understanding APIs and SDKs to extract structured data from documents, images, audio, and video.
author: PatrickFarley 
ms.author: paulhsu
manager: mcleans
ms.date: 01/29/2026
ms.service: azure-content-understanding-foundry-tools
ms.topic: quickstart
ms.custom:
  - build-2025
  - dev-focus
zone_pivot_groups: programming-languages-content-understanding
ai-usage: ai-assisted
---

# Quickstart: Use Azure Content Understanding in Foundry Tools

**Applies to: programming-language-rest**



This quickstart shows you how to use the [Content Understanding REST API](https://learn.microsoft.com/rest/api/contentunderstanding/content-analyzers?view=rest-contentunderstanding-2025-11-01\&preserve-view=true) to get structured data from multimodal content in document, image, audio, and video files.

> **Tip:**
> For interactive scenarios that need an immediate response from Read or Layout, see [Quickstart: Use synchronous Content Understanding operations](use-synchronous-rest-api.md).

## Prerequisites

* An active Azure subscription. If you don't have an Azure account, [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
* A [Microsoft Foundry resource](https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry) created in a [supported region](https://learn.microsoft.com/azure/ai-services/content-understanding/language-region-support). To create the resource, you need the **Contributor** role or higher on the target subscription or resource group.
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

## Get started with a prebuilt analyzer

This quickstart uses prebuilt analyzers — no configuration required. To learn how to customize analyzers for your needs, see [Prebuilt analyzers](../concepts/prebuilt-analyzers.md).

### Send a file for analysis

Before running the following cURL command, make the following changes to the HTTP request:

- Replace `{endpoint}` and `{key}` with the corresponding values from your Foundry instance in the Azure portal.

#### POST request

# [Document](#tab/document)

This example uses the `prebuilt-invoice` analyzer to extract structured data from an invoice document.

```bash
curl -i -X POST "{endpoint}/contentunderstanding/analyzers/prebuilt-invoice:analyze?api-version=2025-11-01" \
  -H "Ocp-Apim-Subscription-Key: {key}" \
  -H "Content-Type: application/json" \
  -d '{
        "inputs":[{"url": "https://github.com/Azure-Samples/azure-ai-content-understanding-python/raw/refs/heads/main/data/invoice.pdf"}]
      }'  
```

# [Image](#tab/image)

This example uses the `prebuilt-imageSearch` analyzer to generate a description of the image.

```bash
curl -i -X POST "{endpoint}/contentunderstanding/analyzers/prebuilt-imageSearch:analyze?api-version=2025-11-01" \
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

This example uses the `prebuilt-audioSearch` analyzer to extract the audio transcript, generate a summary, and perform speaker labeling.

```bash
curl -i -X POST "{endpoint}/contentunderstanding/analyzers/prebuilt-audioSearch:analyze?api-version=2025-11-01" \
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

This example uses the `prebuilt-videoSearch` analyzer to extract keyframes, transcript, and chapter segments from video.

```bash
curl -i -X POST "{endpoint}/contentunderstanding/analyzers/prebuilt-videoSearch:analyze?api-version=2025-11-01" \
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

**Reference**: [Content Analyzers - Analyze](https://learn.microsoft.com/rest/api/contentunderstanding/content-analyzers/analyze?view=rest-contentunderstanding-2025-11-01\&preserve-view=true)

#### POST response
The response header includes an `Operation-Location` field, which you use to retrieve the results of the asynchronous analysis operation. 

```
HTTP/1.1 202 Accepted
Transfer-Encoding: chunked
Content-Type: application/json
request-id: aaa-bbb-ccc-ddd
x-ms-request-id: aaa-bbb-ccc-ddd
Operation-Location: {endpoint}/contentunderstanding/analyzerResults/{request-id}?api-version=2025-11-01
x-envoy-upstream-service-time: 800
apim-request-id: {request-id}
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
x-content-type-options: nosniff
x-ms-region: West US
Date: Fri, 31 Oct 2025 05:30:17 GMT
Connection: close
```

> **Important:**
> Copy the **Operation-Location** URL from the response header. You'll use this URL in the next step to retrieve the analysis results.

### Get analyze result

Use the `Operation-Location` from the [`POST` response](#post-response) and retrieve the result of the analysis. A successful response returns `status: "Succeeded"` with extracted fields in the `result` object.


#### GET request
```bash
curl -i -X GET "{endpoint}/contentunderstanding/analyzerResults/{request-id}?api-version=2025-11-01" \
  -H "Ocp-Apim-Subscription-Key: {key}"
```

**Reference**: [Analyzer Results - Get](https://learn.microsoft.com/rest/api/contentunderstanding/content-analyzers/get-result?view=rest-contentunderstanding-2025-11-01\&preserve-view=true)

#### GET response

The 200 (`OK`) JSON response includes a `status` field. If the operation isn't complete, `status` is `Running` or `NotStarted`. Poll the URL every 1–2 seconds until `status` is `Succeeded`.

To include optional model-call and latency information in a GA response, add the `x-ms-diagnostics: true` header to every polling request. For version differences and response handling, see [Retrieve analysis diagnostics](../how-to/retrieve-diagnostics.md).

# [Document](#tab/document)
```jsonc
{
  "id": "ce05fb5a-579e-4f0b-afb5-3532bcddeaee",
  "status": "Succeeded",
  "result": {
    "analyzerId": "prebuilt-invoice",
    "apiVersion": "2025-11-01",
    "createdAt": "2025-11-13T20:04:55Z",
    "warnings": [],
    "contents": [
      {
        "path": "input1",
        "markdown": "CONTOSO LTD.\n\n\n# INVOICE\n\nContoso Headquarters\n123 456th St\nNew York, NY, 10001\n\nINVOICE: INV-100\n\nINVOICE DATE: 11/15/2019\n\nDUE DATE: 12/15/2019\n\nCUSTOMER NAME: MICROSOFT CORPORATION...",
        "fields": {
          "AmountDue": {
            "type": "object",
            "valueObject": {
              "Amount": {
                "type": "number",
                "valueNumber": 610,
                "spans": [
                  {
                    "offset": 1522,
                    "length": 7
                  }
                ],
                "confidence": 0.773,
                "source": "D(1,7.3628,8.0459,7.9272,8.0459,7.9272,8.2070,7.3628,8.2070)"
              },
              "CurrencyCode": {
                "type": "string",
                "valueString": "USD"
              }
            }
          },
          "BalanceForward": {
            "type": "object",
            "valueObject": {
              "Amount": {
                "type": "number",
                "valueNumber": 500,
                "spans": [
                  {
                    "offset": 1474,
                    "length": 7
                  }
                ],
                "confidence": 0.901,
                "source": "D(1,7.3628,7.7445,7.9278,7.7467,7.9272,7.9092,7.3622,7.9070)"
              },
              "CurrencyCode": {
                "type": "string",
                "valueString": "USD"
              }
            }
          },
          "BillingAddress": {
            "type": "string",
            "valueString": "123 Bill St, Redmond WA, 98052",
            "spans": [
              {
                "offset": 325,
                "length": 12
              },
              "..."
            ],
            "confidence": 0.712,
            "source": "D(1,0.5805,3.9471,1.2858,3.9478,1.2856,4.1115,0.5803,4.1108);..."
          },
          "BillingAddressRecipient": {
            "type": "string",
            "valueString": "Microsoft Finance",
            "spans": [
              {
                "offset": 307,
                "length": 17
              }
            ],
            "confidence": 0.815,
            "source": "D(1,0.5734,3.7392,1.8060,3.7521,1.8043,3.9201,0.5717,3.9072)"
          },
          "CountryRegion": {
            "type": "string",
            "valueString": "USA"
          },
          "CustomerAddress": {
            "type": "string",
            "valueString": "123 Other St, Redmond WA, 98052",
            "spans": [
              "..."
            ],
            "confidence": 0.744,
            "source": "..."
          },
          "CustomerAddressRecipient": {
            "type": "string",
            "valueString": "Microsoft Corp",
            "spans": [
              "..."
            ],
            "confidence": 0.437,
            "source": "..."
          },
          "CustomerId": {
            "type": "string",
            "valueString": "CID-12345",
            "spans": [
              "..."
            ],
            "confidence": 0.936,
            "source": "..."
          },
          "CustomerName": {
            "type": "string",
            "valueString": "MICROSOFT CORPORATION",
            "spans": [
              "..."
            ],
            "confidence": 0.46,
            "source": "..."
          },
          "CustomerTaxId": {
            "type": "string",
            "confidence": 0.912
          },
          "DueDate": {
            "type": "date",
            "valueDate": "2019-12-15",
            "spans": [
              "..."
            ],
            "confidence": 0.97,
            "source": "..."
          },
          "InvoiceDate": {
            "type": "date",
            "valueDate": "2019-11-15",
            "spans": [
              "..."
            ],
            "confidence": 0.939,
            "source": "..."
          },
          "InvoiceId": {
            "type": "string",
            "valueString": "INV-100",
            "spans": [
              "..."
            ],
            "confidence": 0.733,
            "source": "..."
          },
          "LineItems": {
            "type": "array",
            "valueArray": [
              {
                "type": "object",
                "valueObject": {
                  "Date": {
                    "type": "date",
                    "valueDate": "2021-03-04",
                    "spans": [
                      "..."
                    ],
                    "confidence": 0.894,
                    "source": "..."
                  },
                  "Description": {
                    "type": "string",
                    "valueString": "Consulting Services",
                    "spans": [
                      "..."
                    ],
                    "confidence": 0.589,
                    "source": "..."
                  },
                  "ProductCode": {
                    "type": "string",
                    "valueString": "A123",
                    "spans": [
                      "..."
                    ],
                    "confidence": 0.879,
                    "source": "..."
                  },
                  "Quantity": {
                    "type": "number",
                    "valueNumber": 2,
                    "spans": [
                      "..."
                    ],
                    "confidence": 0.939,
                    "source": "..."
                  },
                  "QuantityUnit": {
                    "type": "string",
                    "valueString": "hours",
                    "spans": [
                      "..."
                    ],
                    "confidence": 0.85,
                    "source": "..."
                  },
                  "TaxAmount": {
                    "type": "object",
                    "valueObject": {
                      "Amount": {
                        "type": "number",
                        "valueNumber": 6,
                        "spans": [
                          "..."
                        ],
                        "confidence": 0.522,
                        "source": "..."
                      },
                      "CurrencyCode": {
                        "type": "string",
                        "valueString": "USD"
                      }
                    }
                  },
                  "TaxRate": {
                    "type": "number",
                    "confidence": 0.915
                  },
                  "TotalAmount": {
                    "type": "object",
                    "valueObject": {
                      "Amount": {
                        "type": "number",
                        "valueNumber": 60,
                        "spans": [
                          "..."
                        ],
                        "confidence": 0.972,
                        "source": "..."
                      },
                      "CurrencyCode": {
                        "type": "string",
                        "valueString": "USD"
                      }
                    }
                  },
                  "UnitPrice": {
                    "type": "object",
                    "valueObject": {
                      "Amount": {
                        "type": "number",
                        "valueNumber": 30,
                        "spans": [
                          "..."
                        ],
                        "confidence": 0.97,
                        "source": "..."
                      },
                      "CurrencyCode": {
                        "type": "string",
                        "valueString": "USD"
                      }
                    }
                  }
                }
              },
              "... (2 additional line items)"
            ]
          }
          /*additional fields omitted*/
        },
        "kind": "document",
        "startPageNumber": 1,
        "endPageNumber": 1,
        "unit": "inch",
        "pages": [
          {
            "pageNumber": 1,
            "angle": 0,
            "width": 8.5,
            "height": 11,
            "words": [
              "... (words omitted for brevity)"
            ],
            "selectionMarks": [],
            "lines": [
              "... (lines omitted for brevity)"
            ],
            "barcodes": [],
            "formulas": []
          }
        ],
        "tables": [
          "... (tables omitted for brevity)"
        ],
        "analyzerId": "prebuilt-invoice",
        "mimeType": "application/pdf"
      }
    ]
  },
  "usage": {
    "documentPagesStandard": 1,
    "contextualizationTokens": 2345,
    "tokens": {
      "gpt-5.2-input": 1234,
      "gpt-5.2-output": 567
    }
  }
}
```

# [Image](#tab/image)

```json
{
  "id": "fe6bb69d-1d6b-4698-a50c-ce798bacdd95",
  "status": "Succeeded",
  "result": {
    "analyzerId": "prebuilt-imageSearch",
    "apiVersion": "2025-11-01",
    "createdAt": "2025-11-13T20:11:50Z",
    "warnings": [],
    "contents": [
      {
        "path": "input1",
        "markdown": "![image](pages/1)\n",
        "fields": {
          "Summary": {
            "type": "string",
            "valueString": "The image is a 3D pie chart illustrating the distribution of hours spent in four different ranges. The largest segment, colored purple, represents 60+ hours at 37.8%. The second largest segment, in teal, represents 50-60 hours at 36.6%. The red segment shows 40-50 hours at 18.9%, and the smallest orange segment represents 1-39 hours at 6.7%. Each segment is labeled with its corresponding range and percentage."
          }
        },
        "kind": "document",
        "startPageNumber": 1,
        "endPageNumber": 1,
        "unit": "pixel",
        "pages": [
          {
            "pageNumber": 1,
            "spans": []
          }
        ],
        "analyzerId": "prebuilt-imageSearch",
        "mimeType": "image/jpeg"
      }
    ]
  },
  "usage": {
    "contextualizationTokens": 1000,
    "tokens": {
      "gpt-5.2-input": 199,
      "gpt-5.2-output": 106
    }
  }
}
```

# [Audio](#tab/audio)

```json
{
  "id": "<request-id>",
  "status": "Succeeded",
  "result": {
    "analyzerId": "prebuilt-audioSearch",
    "apiVersion": "2025-11-01",
    "createdAt": "YYYY-MM-DDTHH:MM:SSZ",
    "stringEncoding": "utf8",
    "warnings": [],
    "contents": [
      {
        "path": "input1",
        "markdown": "# Audio: 00:00.000 => 01:54.670\n\nTranscript\n```\nWEBVTT\n\n00:00.080 --> 00:02.160\n<v Speaker 1>Thank you for calling Woodgrove Travel...",
        "fields": {
          "Summary": {
            "type": "string",
            "valueString": "John Smith contacted Woodgrove Travel to report a negative experience with his flight from New York City to Los Angeles..."
          }
        },
        "kind": "audioVisual",
        "startTimeMs": 0,
        "endTimeMs": 114670,
        "analyzerId": "prebuilt-audioSearch",
        "mimeType": "audio/wav"
      }
    ]
  },
  "usage": {
		"audioHours": 0.032,
    "contextualization": 3194.445,
    "tokens": {
      "gpt-5.2-input": 1234, 
      "gpt-5.2-output": 2345,
      "text-embedding-3-large": 3456 
    }
 
	}
}
```

# [Video](#tab/video)

```jsonc
{
  "id": "2689a699-fa3a-4ddf-9a27-c34ceaa6c597",
  "status": "Succeeded",
  "result": {
    "analyzerId": "prebuilt-videoSearch",
    "apiVersion": "2025-11-01",
    "createdAt": "2025-11-13T16:11:17Z",
    "warnings": [],
    "contents": [
      {
        "markdown": "# Video: 00:00.733 => 00:15.467\nWidth: 1080\nHeight: 608\n\nTranscript\n```\nWEBVTT\n\n00:01.360 --> 00:06.640\n<Speaker 1>When it comes to the neural TTS, in order to get a good voice, it's better to have good data.\n\n00:07.120 --> 00:13.320\n<Speaker 2>To achieve that, we build a universal TTS model based on 3,000 hours of data.\n\n00:13.440 --> 00:23.680\n<Speaker 1>We actually accumulated tons of the data so that this universal model is able to capture the nuance of the audio and generate a more natural voice for the algorithm.\n```\n\nKey Frames\n- 00:00.733 ![](keyFrame.733.jpg)\n- 00:02.067 ![](keyFrame.2067.jpg)\n...\n- 00:14.833 ![](keyFrame.14833.jpg)\n- 00:15.467 ![](keyFrame.15467.jpg)",
        "fields": {
          "Summary": {
            "type": "string",
            "valueString": "The video opens with a Flight Simulator logo alongside Microsoft Azure AI branding, followed by an interview with a man discussing the importance of good data for neural text-to-speech (TTS) technology. He explains the creation of a universal TTS model trained on 3,000 hours of data to capture audio nuances and produce natural-sounding voices. Visuals include audio waveform displays and shots of data centers and server rooms, emphasizing the technological infrastructure behind the TTS model."
          }
        },
        "kind": "audioVisual",
        "startTimeMs": 733,
        "endTimeMs": 15467,
        "width": 1080,
        "height": 608,
        "keyFrameTimesMs": [
          733,
          2067
          /*... (14 additional keyframes)*/
        ],
        "transcriptPhrases": [
          {
            "speaker": "Speaker 1",
            "startTimeMs": 1360,
            "endTimeMs": 6640,
            "text": "When it comes to the neural TTS, in order to get a good voice, it's better to have good data.",
            "confidence": 0.937,
            "words": [
              {
                "startTimeMs": 1360,
                "endTimeMs": 1600,
                "text": "When"
              },
              {
                "startTimeMs": 1600,
                "endTimeMs": 1760,
                "text": "it"
              }
              /*... (18 additional words)*/
            ],
            "locale": "en-US"
          },
          {
            "speaker": "Speaker 2",
            "startTimeMs": 7120,
            "endTimeMs": 13320,
            "text": "To achieve that, we build a universal TTS model based on 3,000 hours of data.",
            "confidence": 0.937,
            "words": [
              {
                "startTimeMs": 7120,
                "endTimeMs": 7360,
                "text": "To"
              },
              {
                "startTimeMs": 7560,
                "endTimeMs": 7880,
                "text": "achieve"
              }
              /*... (13 additional words)*/
            ],
            "locale": "en-US"
          },
          {
            "speaker": "Speaker 1",
            "startTimeMs": 13440,
            "endTimeMs": 23680,
            "text": "We actually accumulated tons of the data so that this universal model is able to capture the nuance of the audio and generate a more natural voice for the algorithm.",
            "confidence": 0.937,
            "words": [
              {
                "startTimeMs": 13440,
                "endTimeMs": 13600,
                "text": "We"
              },
              {
                "startTimeMs": 13600,
                "endTimeMs": 14000,
                "text": "actually"
              }
              /*... (28 additional words)*/
            ],
            "locale": "en-US"
          }
        ],
        "cameraShotTimesMs": [
          1467,
          3233
          /*... (13 additional camera shots)*/
        ],
        "mimeType": "video/x-m4v"
      },
      {
        "markdown": "# Video: 00:15.467 => 00:23.100\nWidth: 1080\nHeight: 608\n\n\n\nKey Frames\n- 00:15.467 ![](keyFrame.15467.jpg)\n- 00:16.933 ![](keyFrame.16933.jpg)\n...\n- 00:22.367 ![](keyFrame.22367.jpg)\n- 00:23.100 ![](keyFrame.23100.jpg)",
        "fields": {
          "Summary": {
            "type": "string",
            "valueString": "The video transitions to scenic aerial views from the Flight Simulator, showcasing detailed landscapes including coastlines, mountains, and castles. This segment highlights the realistic graphics and immersive experience of the Flight Simulator, demonstrating the integration of advanced AI technologies to enhance the simulation."
          }
        },
        "kind": "audioVisual",
        "startTimeMs": 15467,
        "endTimeMs": 23100,
        "width": 1080,
        "height": 608,
        "keyFrameTimesMs": [
          15467,
          16933
          /*... (7 additional keyframes)*/
        ],
        "transcriptPhrases": [],
        "cameraShotTimesMs": [
          1467,
          3233
          /*... (13 additional camera shots)*/
        ]
      },
      {
        "markdown": "# Video: 00:23.100 => 00:43.233\nWidth: 1080\nHeight: 608\n\nTranscript\n```\nWEBVTT\n\n00:24.040 --> 00:29.120\n<Speaker 3>What we liked about cognitive services offerings were that they had a much higher fidelity.\n\n00:29.600 --> 00:32.880\n<Speaker 3>And they sounded a lot more like an actual human voice.\n\n00:33.680 --> 00:37.200\n<Speaker 4>Orlando ground 9555 requesting the end of pushback.\n\n00:38.680 --> 00:41.280\n<Speaker 4>9555 request to end pushback received.\n```\n\nKey Frames\n- 00:23.100 ![](keyFrame.23100.jpg)\n- 00:24.833 ![](keyFrame.24833.jpg)\n...\n- 00:42.633 ![](keyFrame.42633.jpg)\n- 00:43.233 ![](keyFrame.43233.jpg)",
        "fields": {
          "Summary": {
            "type": "string",
            "valueString": "The focus shifts back to an interview with another man discussing the high fidelity and human-like quality of voices produced by cognitive services offerings. The segment concludes with visuals of an airplane on the tarmac, ground crew directing the plane, and the plane preparing for pushback, accompanied by realistic audio communications between ground control and the aircraft."
          }
        },
        "kind": "audioVisual",
        "startTimeMs": 23100,
        "endTimeMs": 43233,
        "width": 1080,
        "height": 608,
        "keyFrameTimesMs": [
          23100,
          24833
          /*... (19 additional keyframes)*/
        ],
        "transcriptPhrases": [
          {
            "speaker": "Speaker 3",
            "startTimeMs": 24040,
            "endTimeMs": 29120,
            "text": "What we liked about cognitive services offerings were that they had a much higher fidelity.",
            "confidence": 0.937,
            "words": [
              {
                "startTimeMs": 24040,
                "endTimeMs": 24240,
                "text": "What"
              },
              {
                "startTimeMs": 24240,
                "endTimeMs": 24320,
                "text": "we"
              }
              /*... (13 additional words)*/
            ],
            "locale": "en-US"
          },
          {
            "speaker": "Speaker 3",
            "startTimeMs": 29600,
            "endTimeMs": 32880,
            "text": "And they sounded a lot more like an actual human voice.",
            "confidence": 0.823,
            "words": [
              {
                "startTimeMs": 29600,
                "endTimeMs": 30080,
                "text": "And"
              },
              {
                "startTimeMs": 30080,
                "endTimeMs": 30160,
                "text": "they"
              }
              /*... (9 additional words)*/
            ],
            "locale": "en-US"
          },
          {
            "speaker": "Speaker 4",
            "startTimeMs": 33680,
            "endTimeMs": 37200,
            "text": "Orlando ground 9555 requesting the end of pushback.",
            "confidence": 0.823,
            "words": [
              {
                "startTimeMs": 33680,
                "endTimeMs": 34160,
                "text": "Orlando"
              },
              {
                "startTimeMs": 34160,
                "endTimeMs": 34600,
                "text": "ground"
              }
              /*... (6 additional words)*/
            ],
            "locale": "en-US"
          },
          {
            "speaker": "Speaker 4",
            "startTimeMs": 38680,
            "endTimeMs": 41280,
            "text": "9555 request to end pushback received.",
            "confidence": 0.823,
            "words": [
              {
                "startTimeMs": 38680,
                "endTimeMs": 39600,
                "text": "9555"
              },
              {
                "startTimeMs": 39600,
                "endTimeMs": 40080,
                "text": "request"
              }
              /*... (4 additional words)*/
            ],
            "locale": "en-US"
          }
        ],
        "cameraShotTimesMs": [
          1467,
          3233
          /*... (13 additional camera shots)*/
        ]
      }
    ]
  },
  "usage": {
    "videoHours": 0.013,
    "contextualizationTokens": 12222,
    "tokens": {
      "gpt-5.2-input": 8976,
      "gpt-5.2-output": 439
    }
  }
}
```

---

> **Tip:**
> When you use the video analyzer, keyframes are returned as URLs in the JSON response (for example, under `result.contents.frames[]`). Download keyframes using a standard HTTP `GET` request:
> ```bash
> curl -O "<keyframeUrl>"
> ```




**Applies to: programming-language-python**



<!-- markdownlint-disable MD025 -->

[Client library](https://pypi.org/project/azure-ai-contentunderstanding/) | [Samples](https://github.com/Azure/azure-sdk-for-python/tree/main/sdk/contentunderstanding/azure-ai-contentunderstanding/samples) | [SDK source](https://aka.ms/cu-sdk-python)

This quickstart shows you how to use the Content Understanding Python SDK to extract structured data using prebuilt analyzers from document, image, audio, and video files. To learn more about prebuilt analyzers and other features, see the documentation of [Prebuilt Analyzers](../concepts/prebuilt-analyzers.md).

## Prerequisites

* An active Azure subscription. If you don't have an Azure account, [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
* A [Microsoft Foundry resource](https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry) created in a [supported region](../language-region-support.md).
* Your resource endpoint and API key (found under Keys and Endpoint in the Azure portal).
* Model deployment defaults configured for your resource. See [Models and deployments](../concepts/models-deployments.md) or this one-time [configuration script](https://github.com/Azure/azure-sdk-for-python/blob/main/sdk/contentunderstanding/azure-ai-contentunderstanding/samples/sample_update_defaults.py) for setup instructions.
* [Python 3.9 or later](https://www.python.org/).

## Setup

1. Install the Content Understanding client library for Python with pip:

    ```console
    pip install --pre azure-ai-contentunderstanding
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

## Create a client

The `ContentUnderstandingClient` is the main entry point for interacting with the service. Create an instance by providing your endpoint and credential.



```python
import os
from azure.ai.contentunderstanding import ContentUnderstandingClient
from azure.core.credentials import AzureKeyCredential

endpoint = os.environ["CONTENTUNDERSTANDING_ENDPOINT"]
key = os.environ["CONTENTUNDERSTANDING_KEY"]

client = ContentUnderstandingClient(endpoint=endpoint, credential=AzureKeyCredential(key))
```

## Get started with a prebuilt analyzer

Analyzers define how your content is processed and the insights that are extracted. We offer [prebuilt analyzers](../concepts/prebuilt-analyzers.md) for common use cases. You can [customize prebuilt analyzers](../concepts/prebuilt-analyzers.md) to better fit your specific needs and use cases.
This quickstart uses prebuilt invoice, image, audio, and video analyzers to help you get started.


# [Document](#tab/document)

This example uses the `prebuilt-invoice` analyzer to extract structured data from an invoice document.

```python
import sys
from azure.ai.contentunderstanding.models import (
    AnalysisInput,
    AnalysisResult,
    DocumentContent,
    ArrayField,
    ObjectField,
)

# Sample invoice
invoice_url = (
    "https://raw.githubusercontent.com/"
    "Azure-Samples/"
    "azure-ai-content-understanding-assets/"
    "main/document/invoice.pdf"
)

poller = client.begin_analyze(
    analyzer_id="prebuilt-invoice",
    inputs=[AnalysisInput(url=invoice_url)],
)
result: AnalysisResult = poller.result()

if not result.contents or len(result.contents) == 0:
    print("No content found in the analysis result.")
    sys.exit(0)

# Get the document content
document_content: DocumentContent = (
    result.contents[0]  # type: ignore
)

print(
    f"Document unit: {document_content.unit or 'unknown'}"
)
print(
    f"Pages: {document_content.start_page_number}"
    f" to {document_content.end_page_number}"
)

if not document_content.fields:
    print("No fields found in the analysis result.")
    sys.exit(0)

# Extract simple string fields
customer_name = document_content.fields.get("CustomerName")
if customer_name:
    print(f"Customer Name: {customer_name.value}")
    if customer_name.confidence:
        print(
            f"  Confidence: {customer_name.confidence:.2f}"
        )
    print(f"  Source: {customer_name.source or 'N/A'}")

# Extract date fields
invoice_date = document_content.fields.get("InvoiceDate")
if invoice_date:
    print(f"Invoice Date: {invoice_date.value}")
    if invoice_date.confidence:
        print(
            f"  Confidence: {invoice_date.confidence:.2f}"
        )

# Extract object fields (nested structures)
total_amount = document_content.fields.get("TotalAmount")
if (
    isinstance(total_amount, ObjectField)
    and total_amount.value
):
    amount_field = total_amount.value.get("Amount")
    currency_field = total_amount.value.get(
        "CurrencyCode"
    )
    amount = (
        amount_field.value if amount_field else None
    )
    currency = (
        currency_field.value
        if currency_field and currency_field.value
        else ""
    )
    if isinstance(amount, (int, float)):
        print(f"\nTotal: {currency}{amount:.2f}")
    else:
        print(f"\nTotal: {currency}{amount or '(None)'}")

# Extract array fields (line items)
line_items = document_content.fields.get("LineItems")
if (
    isinstance(line_items, ArrayField)
    and line_items.value
):
    print(f"\nLine Items ({len(line_items.value)}):")
    for i, item in enumerate(line_items.value, 1):
        if (
            isinstance(item, ObjectField)
            and item.value
        ):
            desc = item.value.get("Description")
            qty = item.value.get("Quantity")
            description = (
                desc.value
                if desc and desc.value
                else "N/A"
            )
            quantity = (
                qty.value
                if qty and qty.value
                else "N/A"
            )
            print(f"  Item {i}: {description}")
            print(f"    Quantity: {quantity}")
```

This will produce the following output:
```text
Document unit: LengthUnit.INCH
Pages: 1 to 1
Customer Name: MICROSOFT CORPORATION
  Confidence: 0.39
  Source: D(1,6.2250,2.0092,8.0020,2.0077,8.0021,2.1638,6.2251,2.1653)
Invoice Date: 2019-11-15
  Confidence: 0.91

Total: USD110.00

Line Items (3):
  Item 1: Consulting Services
    Quantity: 2.0
  Item 2: Document Fee
    Quantity: 3.0
  Item 3: Printing Fee
    Quantity: 10.0
```

> **Note:**
> This code is based on the [sample_analyze_invoice.py](https://github.com/Azure/azure-sdk-for-python/blob/main/sdk/contentunderstanding/azure-ai-contentunderstanding/samples/sample_analyze_invoice.py) sample in the SDK repository.

# [Image](#tab/image)

This example uses the `prebuilt-imageSearch` analyzer to generate a description of the image.

```python
from azure.ai.contentunderstanding.models import AnalysisInput

image_url = "https://raw.githubusercontent.com/Azure-Samples/azure-ai-content-understanding-assets/main/image/pieChart.jpg"

poller = client.begin_analyze(
    analyzer_id="prebuilt-imageSearch",
    inputs=[AnalysisInput(url=image_url)],
)
result = poller.result()

content = result.contents[0]
print(content.markdown)

summary = content.fields.get("Summary")
if summary and hasattr(summary, "value"):
    print(f"Summary: {summary.value}")
```

This will produce an output like the following:
```text
![image](pages/1)

Summary: The pie chart displays the distribution of hours spent in four categories: 1-39 hours (6.7%), 40-50 hours (18.9%), 50-60 hours (36.6%), and 60+ hours (37.8%). The largest segment is 60+ hours, followed closely by 50-60 hours, then 40-50 hours, and the smallest segment is 1-39 hours.
```
 > **Note:**
 > This code is based on the [sample_analyze_url.py](https://github.com/Azure/azure-sdk-for-python/blob/main/sdk/contentunderstanding/azure-ai-contentunderstanding/samples/sample_analyze_url.py) sample in the SDK repository.



# [Audio](#tab/audio)

This example uses the `prebuilt-audioSearch` analyzer to extract the audio transcript, generate a summary, and perform speaker labeling.

```python
from azure.ai.contentunderstanding.models import (
    AnalysisInput, 
    AudioVisualContent
)

audio_url = "https://raw.githubusercontent.com/Azure-Samples/azure-ai-content-understanding-assets/main/audio/callCenterRecording.mp3"

poller = client.begin_analyze(
    analyzer_id="prebuilt-audioSearch",
    inputs=[AnalysisInput(url=audio_url)],
)
result = poller.result()

# Cast to AudioVisualContent for audio-specific properties (timing, transcript phrases, etc.)
audio_content: AudioVisualContent = result.contents[0]  # type: ignore
print(audio_content.markdown)

summary = audio_content.fields.get("Summary")
if summary and hasattr(summary, "value"):
    print(f"Summary: {summary.value}")

if audio_content.transcript_phrases and len(audio_content.transcript_phrases) > 0:
    print("Transcript (first two phrases):")
    for phrase in audio_content.transcript_phrases[:2]:
        print(f"  [{phrase.speaker}] {phrase.start_time_ms} ms: {phrase.text}")
```

This will produce an output like the following:
```text
# Audio: 00:00.000 => 00:32.183

Transcript

WEBVTT

00:00.080 --> 00:00.640
<v Speaker 1>Good day.

00:00.880 --> 00:02.240
<v Speaker 1>Welcome to Contoso.

00:02.560 --> 00:03.760
<v Speaker 1>My name is John Doe.

00:03.920 --> 00:05.120
<v Speaker 1>How can I help you today?

00:05.440 --> 00:06.320
<v Speaker 2>Yes, good day.

00:06.640 --> 00:08.160
<v Speaker 2>My name is Maria Smith.

00:08.560 --> 00:11.360
<v Speaker 2>I would like to inquire about my current point balance.

00:11.680 --> 00:12.560
<v Speaker 1>No problem.

00:12.880 --> 00:13.920
<v Speaker 1>I am happy to help.

00:14.240 --> 00:16.720
<v Speaker 1>I need your date of birth to confirm your identity.

00:17.120 --> 00:19.600
<v Speaker 2>It is April 19th, 1988.

00:20.000 --> 00:20.480
<v Speaker 1>Great.

00:20.800 --> 00:24.160
<v Speaker 1>Your current point balance is 599 points.

00:24.560 --> 00:26.160
<v Speaker 1>Do you need any more information?

00:26.480 --> 00:27.200
<v Speaker 2>No, thank you.

00:27.600 --> 00:28.320
<v Speaker 2>That was all.

00:28.720 --> 00:29.360
<v Speaker 2>Goodbye.

00:29.680 --> 00:31.920
<v Speaker 1>You're welcome, goodbye a Cantoso.

Summary: The conversation is a customer service interaction where Maria Smith contacts Contoso to inquire about her current point balance. The agent, John Doe, verifies her identity by asking for her date of birth and then provides her with the information that she has 599 points. The customer confirms that she does not need any further information and ends the call politely.
Transcript (first two phrases):
  [Speaker 1] 80 ms: Good day.
  [Speaker 1] 880 ms: Welcome to Contoso.
```
 > **Note:**
 > This code is based on the [sample_analyze_url.py](https://github.com/Azure/azure-sdk-for-python/blob/main/sdk/contentunderstanding/azure-ai-contentunderstanding/samples/sample_analyze_url.py) sample in the SDK repository.


# [Video](#tab/video)

This example uses the `prebuilt-videoSearch` analyzer to extract keyframes, transcript, and chapter segments from video.

```python
from azure.ai.contentunderstanding.models import (
    AnalysisInput,
    AudioVisualContent
)

video_url = "https://raw.githubusercontent.com/Azure-Samples/azure-ai-content-understanding-assets/main/videos/sdk_samples/FlightSimulator.mp4"

poller = client.begin_analyze(
    analyzer_id="prebuilt-videoSearch",
    inputs=[AnalysisInput(url=video_url)],
)
result = poller.result()

# prebuilt-videoSearch can detect video segments, so iterate through all contents
for media in result.contents:
    video_content: AudioVisualContent = media  # type: ignore
    print(video_content.markdown)

    summary = video_content.fields.get("Summary")
    if summary and hasattr(summary, "value"):
        print(f"Summary: {summary.value}")

    print(f"Start: {video_content.start_time_ms} ms, End: {video_content.end_time_ms} ms")
    print(f"Frame size: {video_content.width} x {video_content.height}")
```

This will produce an output like the following:
```text
# Video: 00:00.733 => 00:15.467
Width: 1080
Height: 608

Transcript

WEBVTT

00:01.360 --> 00:06.640
<Speaker 1>When it comes to the neural TTS, in order to get a good voice, it's better to have good data.

00:07.120 --> 00:13.320
<Speaker 2>To achieve that, we build a universal TTS model based on 3,000 hours of data.

00:13.440 --> 00:23.680
<Speaker 1>We actually accumulated tons of the data so that this universal model is able to capture the nuance of the audio and generate a more natural voice for the algorithm.


Key Frames
- 00:00.733 ![](keyFrame.733.jpg)
- 00:02.067 ![](keyFrame.2067.jpg)
- 00:02.667 ![](keyFrame.2667.jpg)
- 00:04.067 ![](keyFrame.4067.jpg)
- 00:04.900 ![](keyFrame.4900.jpg)
- 00:05.733 ![](keyFrame.5733.jpg)
- 00:06.567 ![](keyFrame.6567.jpg)
- 00:07.800 ![](keyFrame.7800.jpg)
- 00:09.000 ![](keyFrame.9000.jpg)
- 00:09.800 ![](keyFrame.9800.jpg)
- 00:10.600 ![](keyFrame.10600.jpg)
- 00:12.100 ![](keyFrame.12100.jpg)
- 00:12.833 ![](keyFrame.12833.jpg)
- 00:14.200 ![](keyFrame.14200.jpg)
- 00:14.833 ![](keyFrame.14833.jpg)
- 00:15.467 ![](keyFrame.15467.jpg)
Summary: The video opens with a Flight Simulator plane flying over an island, followed by a discussion about neural text-to-speech (TTS) technology. A speaker explains the importance of having good data to create a natural voice, mentioning a universal TTS model built on 3,000 hours of data. Visuals include audio waveforms and shots of data centers and server farms, emphasizing the scale and technology behind the TTS model.
Start: 733 ms, End: 15467 ms
Frame size: 1080 x 608
# Video: 00:15.467 => 00:23.100
Width: 1080
Height: 608



Key Frames
- 00:15.467 ![](keyFrame.15467.jpg)
- 00:16.933 ![](keyFrame.16933.jpg)
- 00:17.767 ![](keyFrame.17767.jpg)
- 00:18.600 ![](keyFrame.18600.jpg)
- 00:20.167 ![](keyFrame.20167.jpg)
- 00:20.900 ![](keyFrame.20900.jpg)
- 00:21.633 ![](keyFrame.21633.jpg)
- 00:22.367 ![](keyFrame.22367.jpg)
- 00:23.100 ![](keyFrame.23100.jpg)
Summary: The video transitions to scenic aerial views from the Flight Simulator, showing a biplane flying over coastal and mountainous landscapes, including a castle. This segment visually showcases the realism and detail of the Flight Simulator environment.
Start: 15467 ms, End: 23100 ms
Frame size: 1080 x 608
# Video: 00:23.100 => 00:43.233
Width: 1080
Height: 608

Transcript

WEBVTT

00:24.040 --> 00:29.120
<Speaker 3>What we liked about cognitive services offerings were that they had a much higher fidelity.

00:29.600 --> 00:32.880
<Speaker 3>And they sounded a lot more like an actual human voice.

00:33.680 --> 00:37.200
<Speaker 4>Orlando ground 9555 requesting the end of pushback.

00:38.680 --> 00:41.280
<Speaker 4>9555 request to end pushback received.


Key Frames
- 00:23.100 ![](keyFrame.23100.jpg)
- 00:24.833 ![](keyFrame.24833.jpg)
- 00:25.700 ![](keyFrame.25700.jpg)
- 00:26.567 ![](keyFrame.26567.jpg)
- 00:27.433 ![](keyFrame.27433.jpg)
- 00:28.300 ![](keyFrame.28300.jpg)
- 00:29.167 ![](keyFrame.29167.jpg)
- 00:30.833 ![](keyFrame.30833.jpg)
- 00:31.633 ![](keyFrame.31633.jpg)
- 00:32.433 ![](keyFrame.32433.jpg)
- 00:33.900 ![](keyFrame.33900.jpg)
- 00:34.600 ![](keyFrame.34600.jpg)
- 00:36.067 ![](keyFrame.36067.jpg)
- 00:36.867 ![](keyFrame.36867.jpg)
- 00:38.200 ![](keyFrame.38200.jpg)
- 00:38.700 ![](keyFrame.38700.jpg)
- 00:39.900 ![](keyFrame.39900.jpg)
- 00:40.600 ![](keyFrame.40600.jpg)
- 00:41.300 ![](keyFrame.41300.jpg)
- 00:42.633 ![](keyFrame.42633.jpg)
- 00:43.233 ![](keyFrame.43233.jpg)
Summary: A new speaker discusses the high fidelity of cognitive services' TTS offerings, emphasizing how the voices sound more like actual human voices. The visuals shift to an airport scene with an Airbus plane being marshaled by ground crew, illustrating real-world aviation communication and tying back to the naturalness of the TTS voices.
Start: 23100 ms, End: 43233 ms
Frame size: 1080 x 608
```
 > **Note:**
 > This code is based on the [sample_analyze_url.py](https://github.com/Azure/azure-sdk-for-python/blob/main/sdk/contentunderstanding/azure-ai-contentunderstanding/samples/sample_analyze_url.py) sample in the SDK repository.







**Applies to: programming-language-csharp**



<!-- markdownlint-disable MD025 -->

[Client library](https://www.nuget.org/packages/Azure.AI.ContentUnderstanding) | [Samples](https://github.com/Azure/azure-sdk-for-net/tree/main/sdk/contentunderstanding/Azure.AI.ContentUnderstanding/samples) | [SDK source](https://aka.ms/cu-sdk-net)

This quickstart shows you how to use the Content Understanding .NET SDK to extract structured data using prebuilt analyzers from document, image, audio, and video files. To learn more about prebuilt analyzers and other features, see the documentation of [Prebuilt Analyzers](../concepts/prebuilt-analyzers.md).

## Prerequisites

* An active Azure subscription. If you don't have an Azure account, [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
* A [Microsoft Foundry resource](https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry) created in a [supported region](../language-region-support.md).
* Your resource endpoint and API key (found under Keys and Endpoint in the Azure portal).
* Model deployment defaults configured for your resource. See [Models and deployments](../concepts/models-deployments.md) or this one-time [configuration script](https://github.com/Azure/azure-sdk-for-net/blob/main/sdk/contentunderstanding/Azure.AI.ContentUnderstanding/samples/Sample00_UpdateDefaults.md) for setup instructions.
* The current version of [.NET](https://dotnet.microsoft.com/download/dotnet).

## Setup

1. Create a new .NET console application:

    ```console
    dotnet new console -n ContentUnderstandingQuickstart
    cd ContentUnderstandingQuickstart
    ```

1. Install the Content Understanding client library for .NET:

    ```console
    dotnet add package Azure.AI.ContentUnderstanding --prerelease
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

## Create a client

The `ContentUnderstandingClient` is the main entry point for interacting with the service. Create an instance by providing your endpoint and credential.

```csharp
using Azure;
using Azure.AI.ContentUnderstanding;

string endpoint = Environment.GetEnvironmentVariable("CONTENTUNDERSTANDING_ENDPOINT");
string key = Environment.GetEnvironmentVariable("CONTENTUNDERSTANDING_KEY");

var client = new ContentUnderstandingClient(
    new Uri(endpoint),
    new AzureKeyCredential(key)
);
```

## Get started with a prebuilt analyzer

Analyzers define how your content is processed and the insights that are extracted. We offer [prebuilt analyzers](../concepts/prebuilt-analyzers.md) for common use cases. You can [customize prebuilt analyzers](../concepts/prebuilt-analyzers.md) to better fit your specific needs and use cases.
This quickstart uses prebuilt invoice, image, audio, and video analyzers to help you get started.


# [Document](#tab/document)

This example uses the `prebuilt-invoice` analyzer to extract structured data from an invoice document.

```csharp
// Sample invoice
Uri invoiceUrl = new Uri("https://raw.githubusercontent.com/Azure-Samples/azure-ai-content-understanding-assets/main/document/invoice.pdf");
Operation<AnalysisResult> operation = await client.AnalyzeAsync(
    WaitUntil.Completed,
    "prebuilt-invoice",
    inputs: new[] { new AnalysisInput { Uri = invoiceUrl } });

AnalysisResult result = operation.Value;

DocumentContent documentContent = (DocumentContent)result.Contents!.First();

// Print document unit information
// The unit indicates the measurement system used for coordinates in the source field
Console.WriteLine($"Document unit: {documentContent.Unit ?? "unknown"}");
Console.WriteLine($"Pages: {documentContent.StartPageNumber} to {documentContent.EndPageNumber}");
if (documentContent.Pages != null && documentContent.Pages.Count > 0)
{
    var page = documentContent.Pages[0];
    var unit = documentContent.Unit?.ToString() ?? "units";
    Console.WriteLine($"Page dimensions: {page.Width} x {page.Height} {unit}");
}
Console.WriteLine();

// Extract simple string fields
var customerNameField = documentContent.Fields["CustomerName"];
Console.WriteLine($"Customer Name: {customerNameField.Value ?? "(None)"}");
Console.WriteLine($"  Confidence: {customerNameField.Confidence?.ToString("F2") ?? "N/A"}");

if (customerNameField.Spans?.Count > 0)
{
    var span = customerNameField.Spans[0];
    Console.WriteLine($"  Position in markdown: offset={span.Offset}, length={span.Length}");
}

// Extract simple date field
var invoiceDateField = documentContent.Fields.GetFieldOrDefault("InvoiceDate");
Console.WriteLine($"Invoice Date: {invoiceDateField?.Value ?? "(None)"}");
Console.WriteLine($"  Confidence: {invoiceDateField?.Confidence?.ToString("F2") ?? "N/A"}");

// Access parsed sources for date field
if (invoiceDateField?.Sources != null)
{
    foreach (var source in invoiceDateField.Sources)
    {
        if (source is DocumentSource docSource)
        {
            Console.WriteLine($"  Page {docSource.PageNumber}");
            Console.WriteLine($"  BoundingBox: {docSource.BoundingBox}");
        }
    }
}

if (invoiceDateField?.Spans?.Count > 0)
{
    var span = invoiceDateField.Spans[0];
    Console.WriteLine($"  Position in markdown: offset={span.Offset}, length={span.Length}");
}

// Extract object fields (nested structures)
if (documentContent.Fields.GetFieldOrDefault("TotalAmount") is ContentObjectField totalAmountObj)
{
    var amount = totalAmountObj.Value?.GetFieldOrDefault("Amount")?.Value as double?;
    var currency = totalAmountObj.Value?.GetFieldOrDefault("CurrencyCode")?.Value;
    Console.WriteLine($"Total: {currency ?? "$"}{amount?.ToString("F2") ?? "(None)"}");

    // Access parsed sources for object field
    if (totalAmountObj.Sources != null)
    {
        foreach (var source in totalAmountObj.Sources)
        {
            if (source is DocumentSource docSource)
            {
                Console.WriteLine($"  Page {docSource.PageNumber}");
                Console.WriteLine($"  BoundingBox: {docSource.BoundingBox}");
            }
        }
    }
}

// Extract array fields (collections like line items)
if (documentContent.Fields.GetFieldOrDefault("LineItems") is ContentArrayField lineItems)
{
    Console.WriteLine($"Line Items ({lineItems.Count}):");
    for (int i = 0; i < lineItems.Count; i++)
    {
        if (lineItems[i] is ContentObjectField item)
        {
            var description = item.Value?.GetFieldOrDefault("Description")?.Value;
            var quantity = item.Value?.GetFieldOrDefault("Quantity")?.Value as double?;
            Console.WriteLine($"  Item {i + 1}: {description ?? "N/A"} (Qty: {quantity?.ToString() ?? "N/A"})");
        }
    }
}
```

This will produce the following output:
```text
Document unit: inch
Pages: 1 to 1
Page dimensions: 8.5 x 11 inch

Customer Name: MICROSOFT CORPORATION
  Confidence: 0.44
  Position in markdown: offset=162, length=21
Invoice Date: 11/15/2019 12:00:00 AM +00:00
  Confidence: 0.94
  Page 1
  BoundingBox: {X=7.2398,Y=1.5908,Width=0.7662997,Height=0.16179991}
  Position in markdown: offset=113, length=10
Total: USD110.00
Line Items (3):
  Item 1: Consulting Services (Qty: 2)
  Item 2: Document Fee (Qty: 3)
  Item 3: Printing Fee (Qty: 10)
```

> **Note:**
> This code is based on the [AnalyzeInvoice](https://github.com/Azure/azure-sdk-for-net/blob/main/sdk/contentunderstanding/Azure.AI.ContentUnderstanding/samples/Sample03_AnalyzeInvoice.md) sample in the SDK repository.

# [Image](#tab/image)

This example uses the `prebuilt-imageSearch` analyzer to generate a description of the image.

```csharp
Uri uriSource = new Uri(
    "https://raw.githubusercontent.com/"
    + "Azure-Samples/"
    + "azure-ai-content-understanding-assets/"
    + "main/image/pieChart.jpg"
);

var operation = await client.AnalyzeAsync(
    WaitUntil.Completed,
    "prebuilt-imageSearch",
    inputs: new[] { new AnalysisInput { Uri = uriSource } }
);

AnalysisResult result = operation.Value;
AnalysisContent content = result.Contents!.First();
Console.WriteLine(content.Markdown);

string summary = content.Fields["Summary"].Value?.ToString()
    ?? string.Empty;
Console.WriteLine($"Summary: {summary}");
```

This will produce an output like the following:
```text
![image](pages/1)

Summary: The pie chart displays the distribution of hours in four categories: 1-39 hours (6.7%), 40-50 hours (18.9%), 50-60 hours (36.6%), and 60+ hours (37.8%). The largest segment is 60+ hours, followed closely by 50-60 hours, then 40-50 hours, and the smallest segment is 1-39 hours.
```
> **Note:**
> This code is based on the AnalyzeUrl](https://github.com/Azure/azure-sdk-for-net/blob/main/sdk/contentunderstanding/Azure.AI.ContentUnderstanding/samples/Sample02_AnalyzeUrl.md) sample in the SDK repository.

# [Audio](#tab/audio)

This example uses the `prebuilt-audioSearch` analyzer to extract the audio transcript, generate a summary, and perform speaker labeling.

```csharp
Uri uriSource = new Uri(
    "https://raw.githubusercontent.com/"
    + "Azure-Samples/"
    + "azure-ai-content-understanding-assets/"
    + "main/audio/callCenterRecording.mp3"
);

var operation = await client.AnalyzeAsync(
    WaitUntil.Completed,
    "prebuilt-audioSearch",
    inputs: new[] { new AnalysisInput { Uri = uriSource } }
);

AnalysisResult result = operation.Value;

// Cast to AudioVisualContent for audio-specific properties
AudioVisualContent audioContent =
    (AudioVisualContent)result.Contents!.First();
Console.WriteLine(audioContent.Markdown);

string summary = audioContent.Fields["Summary"].Value?.ToString()
    ?? string.Empty;
Console.WriteLine($"Summary: {summary}");

if (audioContent.TranscriptPhrases != null
    && audioContent.TranscriptPhrases.Count > 0)
{
    Console.WriteLine("Transcript (first two phrases):");
    foreach (TranscriptPhrase phrase
        in audioContent.TranscriptPhrases.Take(2))
    {
        Console.WriteLine(
            $"  [{phrase.Speaker}] "
            + $"{phrase.StartTime.TotalMilliseconds} ms: "
            + $"{phrase.Text}"
        );
    }
}
```

This will produce an output like the following:
```text
# Audio: 00:00.000 => 00:32.183

Transcript

WEBVTT

00:00.080 --> 00:00.640
<v Speaker 1>Good day.

00:00.880 --> 00:02.240
<v Speaker 1>Welcome to Contoso.

00:02.560 --> 00:03.760
<v Speaker 1>My name is John Doe.

00:03.920 --> 00:05.120
<v Speaker 1>How can I help you today?

00:05.440 --> 00:06.320
<v Speaker 2>Yes, good day.

00:06.640 --> 00:08.160
<v Speaker 2>My name is Maria Smith.

00:08.560 --> 00:11.360
<v Speaker 2>I would like to inquire about my current point balance.

00:11.680 --> 00:12.560
<v Speaker 1>No problem.

00:12.880 --> 00:13.920
<v Speaker 1>I am happy to help.

00:14.240 --> 00:16.720
<v Speaker 1>I need your date of birth to confirm your identity.

00:17.120 --> 00:19.600
<v Speaker 2>It is April 19th, 1988.

00:20.000 --> 00:20.480
<v Speaker 1>Great.

00:20.800 --> 00:24.160
<v Speaker 1>Your current point balance is 599 points.

00:24.560 --> 00:26.160
<v Speaker 1>Do you need any more information?

00:26.480 --> 00:27.200
<v Speaker 2>No, thank you.

00:27.600 --> 00:28.320
<v Speaker 2>That was all.

00:28.720 --> 00:29.360
<v Speaker 2>Goodbye.

00:29.680 --> 00:31.920
<v Speaker 1>You're welcome, goodbye a Cantoso.

Summary: The conversation is a customer service interaction where Maria Smith contacts Contoso to inquire about her current point balance. The agent, John Doe, verifies her identity by asking for her date of birth and then informs her that she has 599 points. Maria confirms she does not need further information and ends the call politely.
Transcript (first two phrases):
  [Speaker 1] 80 ms: Good day.
  [Speaker 1] 880 ms: Welcome to Contoso.
```
> **Note:**
> This code is based on the AnalyzeUrl](https://github.com/Azure/azure-sdk-for-net/blob/main/sdk/contentunderstanding/Azure.AI.ContentUnderstanding/samples/Sample02_AnalyzeUrl.md) sample in the SDK repository

# [Video](#tab/video)

This example uses the `prebuilt-videoSearch` analyzer to extract keyframes, transcript, and chapter segments from video.

```csharp
Uri uriSource = new Uri(
    "https://raw.githubusercontent.com/"
    + "Azure-Samples/"
    + "azure-ai-content-understanding-assets/"
    + "main/videos/sdk_samples/FlightSimulator.mp4"
);

var operation = await client.AnalyzeAsync(
    WaitUntil.Completed,
    "prebuilt-videoSearch",
    inputs: new[] { new AnalysisInput { Uri = uriSource } }
);

AnalysisResult result = operation.Value;

// prebuilt-videoSearch can detect segments, so iterate all
int segmentIndex = 1;
foreach (AnalysisContent media in result.Contents!)
{
    AudioVisualContent videoContent =
        (AudioVisualContent)media;
    Console.WriteLine($"--- Segment {segmentIndex} ---");
    Console.WriteLine("Markdown:");
    Console.WriteLine(videoContent.Markdown);

    string summary = videoContent.Fields["Summary"]
        .Value?.ToString() ?? string.Empty;
    Console.WriteLine($"Summary: {summary}");

    Console.WriteLine(
        $"Start: {videoContent.StartTime.TotalMilliseconds} ms, "
        + $"End: {videoContent.EndTime.TotalMilliseconds} ms"
    );
    Console.WriteLine(
        $"Frame size: {videoContent.Width} x {videoContent.Height}"
    );

    Console.WriteLine("---------------------");
    segmentIndex++;
}
```

This will produce an output like the following:
```text
--- Segment 1 ---
Markdown:
# Video: 00:00.733 => 00:15.467
Width: 1080
Height: 608

Transcript

WEBVTT

00:01.360 --> 00:06.640
<Speaker 1>When it comes to the neural TTS, in order to get a good voice, it's better to have good data.

00:07.120 --> 00:13.320
<Speaker 2>To achieve that, we build a universal TTS model based on 3,000 hours of data.

00:13.440 --> 00:23.680
<Speaker 1>We actually accumulated tons of the data so that this universal model is able to capture the nuance of the audio and generate a more natural voice for the algorithm.


Key Frames
- 00:00.733 ![](keyFrame.733.jpg)
- 00:02.067 ![](keyFrame.2067.jpg)
- 00:02.667 ![](keyFrame.2667.jpg)
- 00:04.067 ![](keyFrame.4067.jpg)
- 00:04.900 ![](keyFrame.4900.jpg)
- 00:05.733 ![](keyFrame.5733.jpg)
- 00:06.567 ![](keyFrame.6567.jpg)
- 00:07.800 ![](keyFrame.7800.jpg)
- 00:09.000 ![](keyFrame.9000.jpg)
- 00:09.800 ![](keyFrame.9800.jpg)
- 00:10.600 ![](keyFrame.10600.jpg)
- 00:12.100 ![](keyFrame.12100.jpg)
- 00:12.833 ![](keyFrame.12833.jpg)
- 00:14.200 ![](keyFrame.14200.jpg)
- 00:14.833 ![](keyFrame.14833.jpg)
- 00:15.467 ![](keyFrame.15467.jpg)
Summary: The video opens with a scenic aerial view of an island and a small plane flying over it, accompanied by the Flight Simulator and Microsoft Azure AI logos. The scene then shifts to a person speaking about neural TTS (text-to-speech) technology, emphasizing the importance of good data and describing the creation of a universal TTS model trained on 3,000 hours of data to capture audio nuances and generate natural voices. Visuals include audio waveform displays and shots of a data center and server racks, highlighting the technological infrastructure behind the TTS model.
Start: 733 ms, End: 15467 ms
Frame size: 1080 x 608
---------------------
--- Segment 2 ---
Markdown:
# Video: 00:15.467 => 00:23.100
Width: 1080
Height: 608



Key Frames
- 00:15.467 ![](keyFrame.15467.jpg)
- 00:16.933 ![](keyFrame.16933.jpg)
- 00:17.767 ![](keyFrame.17767.jpg)
- 00:18.600 ![](keyFrame.18600.jpg)
- 00:20.167 ![](keyFrame.20167.jpg)
- 00:20.900 ![](keyFrame.20900.jpg)
- 00:21.633 ![](keyFrame.21633.jpg)
- 00:22.367 ![](keyFrame.22367.jpg)
- 00:23.100 ![](keyFrame.23100.jpg)
Summary: The video transitions to vibrant in-game footage from Flight Simulator, showcasing detailed landscapes, a biplane flying over coastal and mountainous terrain, and a castle with a plane flying nearby. This segment highlights the realistic graphics and immersive environment of the simulator.
Start: 15467 ms, End: 23100 ms
Frame size: 1080 x 608
---------------------
--- Segment 3 ---
Markdown:
# Video: 00:23.100 => 00:43.233
Width: 1080
Height: 608

Transcript

WEBVTT

00:24.040 --> 00:29.120
<Speaker 3>What we liked about cognitive services offerings were that they had a much higher fidelity.

00:29.600 --> 00:32.880
<Speaker 3>And they sounded a lot more like an actual human voice.

00:33.680 --> 00:37.200
<Speaker 4>Orlando ground 9555 requesting the end of pushback.

00:38.680 --> 00:41.280
<Speaker 4>9555 request to end pushback received.


Key Frames
- 00:23.100 ![](keyFrame.23100.jpg)
- 00:24.833 ![](keyFrame.24833.jpg)
- 00:25.700 ![](keyFrame.25700.jpg)
- 00:26.567 ![](keyFrame.26567.jpg)
- 00:27.433 ![](keyFrame.27433.jpg)
- 00:28.300 ![](keyFrame.28300.jpg)
- 00:29.167 ![](keyFrame.29167.jpg)
- 00:30.833 ![](keyFrame.30833.jpg)
- 00:31.633 ![](keyFrame.31633.jpg)
- 00:32.433 ![](keyFrame.32433.jpg)
- 00:33.900 ![](keyFrame.33900.jpg)
- 00:34.600 ![](keyFrame.34600.jpg)
- 00:36.067 ![](keyFrame.36067.jpg)
- 00:36.867 ![](keyFrame.36867.jpg)
- 00:38.200 ![](keyFrame.38200.jpg)
- 00:38.700 ![](keyFrame.38700.jpg)
- 00:39.900 ![](keyFrame.39900.jpg)
- 00:40.600 ![](keyFrame.40600.jpg)
- 00:41.300 ![](keyFrame.41300.jpg)
- 00:42.633 ![](keyFrame.42633.jpg)
- 00:43.233 ![](keyFrame.43233.jpg)
Summary: The scene shifts to another speaker discussing the high fidelity of cognitive services' TTS offerings, noting how the voices sound more like actual human voices. The visuals then move to an airport setting with ground crew directing an Airbus airplane during pushback, illustrating real-world aviation operations and tying back to the theme of realistic audio and simulation.
Start: 23100 ms, End: 43233 ms
Frame size: 1080 x 608
---------------------
```
> **Note:**
> This code is based on the AnalyzeUrl](https://github.com/Azure/azure-sdk-for-net/blob/main/sdk/contentunderstanding/Azure.AI.ContentUnderstanding/samples/Sample02_AnalyzeUrl.md) sample in the SDK repository





**Applies to: programming-language-java**



<!-- markdownlint-disable MD025 -->

[Client library](https://central.sonatype.com/artifact/com.azure/azure-ai-contentunderstanding) | [Samples](https://github.com/Azure/azure-sdk-for-java/tree/main/sdk/contentunderstanding/azure-ai-contentunderstanding/src/samples/java/com/azure/ai/contentunderstanding) | [SDK source](https://aka.ms/cu-sdk-java)

This quickstart shows you how to use the Content Understanding Java SDK to extract structured data using prebuilt analyzers from document, image, audio, and video files. To learn more about prebuilt analyzers and other features, see the documentation of [Prebuilt Analyzers](../concepts/prebuilt-analyzers.md).

## Prerequisites

* An active Azure subscription. If you don't have an Azure account, [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
* A [Microsoft Foundry resource](https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry) created in a [supported region](../language-region-support.md).
* Your resource endpoint and API key (found under Keys and Endpoint in the Azure portal).
* Model deployment defaults configured for your resource. See [Models and deployments](../concepts/models-deployments.md) or this one-time [configuration script](https://github.com/Azure/azure-sdk-for-java/blob/main/sdk/contentunderstanding/azure-ai-contentunderstanding/src/samples/java/com/azure/ai/contentunderstanding/samples/Sample00_UpdateDefaults.java) for setup instructions.
* [Java Development Kit (JDK)](https://learn.microsoft.com/java/openjdk/download) version 8 or later.
* [Apache Maven](https://maven.apache.org/download.cgi).

## Setup

1. Create a new Maven project:

    ```console
    mvn archetype:generate -DgroupId=com.example \
        -DartifactId=content-understanding-quickstart \
        -DarchetypeArtifactId=maven-archetype-quickstart \
        -DinteractiveMode=false
    cd content-understanding-quickstart
    ```

1. Add the Content Understanding dependency to your **pom.xml** file in the `<dependencies>` section:

    ```xml
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-ai-contentunderstanding</artifactId>
        <version>1.1.0-beta.3</version>
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

## Create a client

The `ContentUnderstandingClient` is the main entry point for interacting with the service. Create an instance by providing your endpoint and credential.

```java
import com.azure.core.credential.AzureKeyCredential;
import com.azure.ai.contentunderstanding.ContentUnderstandingClient;
import com.azure.ai.contentunderstanding.ContentUnderstandingClientBuilder;

String endpoint = System.getenv("CONTENTUNDERSTANDING_ENDPOINT");
String key = System.getenv("CONTENTUNDERSTANDING_KEY");

ContentUnderstandingClient client =
    new ContentUnderstandingClientBuilder()
        .endpoint(endpoint)
        .credential(new AzureKeyCredential(key))
        .buildClient();
```

## Get started with a prebuilt analyzer

Analyzers define how your content is processed and the insights that are extracted. We offer [prebuilt analyzers](../concepts/prebuilt-analyzers.md) for common use cases. You can [customize prebuilt analyzers](../concepts/prebuilt-analyzers.md) to better fit your specific needs and use cases.
This quickstart uses prebuilt invoice, image, audio, and video analyzers to help you get started.


# [Document](#tab/document)

This example uses the `prebuilt-invoice` analyzer to extract structured data from an invoice document.

```java
import java.util.Arrays;
import java.util.List;
import com.azure.core.credential.AzureKeyCredential;
import com.azure.core.util.polling.SyncPoller;
import com.azure.ai.contentunderstanding.ContentUnderstandingClient;
import com.azure.ai.contentunderstanding.ContentUnderstandingClientBuilder;
import com.azure.ai.contentunderstanding.models.*;

public class test_document {

    public static void main(String[] args) {
        String endpoint = System.getenv("CONTENTUNDERSTANDING_ENDPOINT");
        String key = System.getenv("CONTENTUNDERSTANDING_KEY");

        ContentUnderstandingClient client =
            new ContentUnderstandingClientBuilder()
                .endpoint(endpoint)
                .credential(new AzureKeyCredential(key))
                .buildClient();

        // Sample invoice
        String invoiceUrl =
            "https://raw.githubusercontent.com/"
            + "Azure-Samples/"
            + "azure-ai-content-understanding-assets/"
            + "main/document/invoice.pdf";

        AnalysisInput input = new AnalysisInput();
        input.setUrl(invoiceUrl);

        SyncPoller<ContentAnalyzerAnalyzeOperationStatus, AnalysisResult> poller =
            client.beginAnalyze(
                "prebuilt-invoice",
                Arrays.asList(input)
            );
        AnalysisResult result = poller.getFinalResult();
        
        // BEGIN:ContentUnderstandingExtractInvoiceFields
        // Get the invoice document content
        AnalysisContent firstContent = result.getContents().get(0);
        if (firstContent instanceof DocumentContent) {
            DocumentContent documentContent = (DocumentContent) firstContent;

            // Print document unit information
            System.out.println("Document unit: "
                + (documentContent.getUnit() != null ? documentContent.getUnit().toString() : "unknown"));
            System.out.println(
                "Pages: " + documentContent.getStartPageNumber() + " to " + documentContent.getEndPageNumber());
            System.out.println();

            // Extract simple string fields using getValue() convenience method
            // getValue() returns the typed value regardless of field type (StringField, NumberField, DateField, etc.)
            ContentField customerNameField
                = documentContent.getFields() != null ? documentContent.getFields().get("CustomerName") : null;
            ContentField invoiceDateField
                = documentContent.getFields() != null ? documentContent.getFields().get("InvoiceDate") : null;

            // Use getValue() instead of casting to specific types
            // Note: getValue() returns the actual typed value - String, Number, LocalDate, etc.
            String customerName = customerNameField != null ? (String) customerNameField.getValue() : null;
            Object invoiceDateValue = invoiceDateField != null ? invoiceDateField.getValue() : null;
            String invoiceDate = invoiceDateValue != null ? invoiceDateValue.toString() : null;

            System.out.println("Customer Name: " + (customerName != null ? customerName : "(None)"));
            if (customerNameField != null) {
                System.out.println("  Confidence: " + (customerNameField.getConfidence() != null
                    ? String.format("%.2f", customerNameField.getConfidence())
                    : "N/A"));
                // Parse into DocumentSource for page number and bounding box
                List<ContentSource> sources = customerNameField.getSources();
                if (sources != null) {
                    for (ContentSource src : sources) {
                        if (src instanceof DocumentSource) {
                            DocumentSource docSrc = (DocumentSource) src;
                            System.out.println("  Source: page " + docSrc.getPageNumber()
                                + ", polygon " + docSrc.getPolygon()
                                + ", bounding box " + docSrc.getBoundingBox());
                        }
                    }
                }
                List<ContentSpan> spans = customerNameField.getSpans();
                if (spans != null && !spans.isEmpty()) {
                    ContentSpan span = spans.get(0);
                    System.out
                        .println("  Position in markdown: offset=" + span.getOffset() + ", length=" + span.getLength());
                }
            }

            System.out.println("Invoice Date: " + (invoiceDate != null ? invoiceDate : "(None)"));
            if (invoiceDateField != null) {
                System.out.println("  Confidence: " + (invoiceDateField.getConfidence() != null
                    ? String.format("%.2f", invoiceDateField.getConfidence())
                    : "N/A"));
                System.out.println(
                    "  Source: " + (invoiceDateField.getSources() != null ? invoiceDateField.getSources() : "N/A"));
                List<ContentSpan> spans = invoiceDateField.getSpans();
                if (spans != null && !spans.isEmpty()) {
                    ContentSpan span = spans.get(0);
                    System.out
                        .println("  Position in markdown: offset=" + span.getOffset() + ", length=" + span.getLength());
                }
            }

            // Extract object fields (nested structures) using getFieldOrDefault() convenience method
            ContentField totalAmountField
                = documentContent.getFields() != null ? documentContent.getFields().get("TotalAmount") : null;
            if (totalAmountField instanceof ContentObjectField) {
                ContentObjectField totalAmountObj = (ContentObjectField) totalAmountField;
                ContentField amountField = totalAmountObj.getFieldOrDefault("Amount");
                ContentField currencyField = totalAmountObj.getFieldOrDefault("CurrencyCode");

                Double amount = amountField != null ? (Double) amountField.getValue() : null;
                String currency = currencyField != null ? (String) currencyField.getValue() : null;

                System.out.println("Total: " + (currency != null ? currency : "")
                    + (amount != null ? String.format("%.2f", amount) : "(None)"));
                if (totalAmountObj.getConfidence() != null) {
                    System.out.println("  Confidence: " + String.format("%.2f", totalAmountObj.getConfidence()));
                }
                if (totalAmountObj.getSources() != null && !totalAmountObj.getSources().isEmpty()) {
                    System.out.println("  Source: " + totalAmountObj.getSources());
                }
            }

            // Extract array fields using size() and get() convenience methods
            ContentField lineItemsField
                = documentContent.getFields() != null ? documentContent.getFields().get("LineItems") : null;
            if (lineItemsField instanceof ContentArrayField) {
                ContentArrayField lineItems = (ContentArrayField) lineItemsField;

                System.out.println("Line Items (" + lineItems.size() + "):");

                for (int i = 0; i < lineItems.size(); i++) {
                    ContentField itemField = lineItems.get(i);
                    if (itemField instanceof ContentObjectField) {
                        ContentObjectField item = (ContentObjectField) itemField;
                        ContentField descField = item.getFieldOrDefault("Description");
                        ContentField qtyField = item.getFieldOrDefault("Quantity");
                        String description = descField != null ? (String) descField.getValue() : null;
                        Double quantity = qtyField != null ? (Double) qtyField.getValue() : null;

                        System.out.println("  Item " + (i + - + ": " + (description != null ? description : "N/A"));
                        System.out.println("    Quantity: " + (quantity != null ? quantity : "N/A"));
                        if (qtyField != null && qtyField.getConfidence() != null) {
                            System.out.println("    Quantity Confidence: " + String.format("%.2f", qtyField.getConfidence()));
                        } else {
                            System.out.println("    Quantity Confidence: N/A");
                        }
                    }
                }
            }
        } // END:ContentUnderstandingExtractInvoiceFields
    }
}
        
```

This will produce the following output:
```text
Document unit: inch
Pages: 1 to 1

Customer Name: MICROSOFT CORPORATION
  Confidence: 0.43
  Source: page 1, polygon [(6.225, 2.0092), (8.002, 2.0077), (8.0021, 2.1638), (6.2251, 2.1653)], bounding box [x=6.225, y=2.0077, width=1.7771001, height=0.15759993]
  Position in markdown: offset=162, length=21
Invoice Date: 2019-11-15
  Confidence: 0.94
  Source: [D(1,7.2399,1.5954,8.0061,1.5908,8.0061,1.7482,7.2398,1.7526)]
  Position in markdown: offset=113, length=10
Total: USD110.00
Line Items (3):
  Item 1: Consulting Services
    Quantity: 2.0
    Quantity Confidence: 0.96
  Item 2: Document Fee
    Quantity: 3.0
    Quantity Confidence: 0.90
  Item 3: Printing Fee
    Quantity: 10.0
    Quantity Confidence: 0.94
```

> **Note:**
> This code is based on the AnalyzeInvoice](https://github.com/Azure/azure-sdk-for-java/blob/main/sdk/contentunderstanding/azure-ai-contentunderstanding/src/samples/java/com/azure/ai/contentunderstanding/samples/Sample03_AnalyzeInvoice.java) sample in the SDK repository.

# [Image](#tab/image)

This example uses the `prebuilt-imageSearch` analyzer to generate a description of the image.

```java
import java.util.Arrays;
import com.azure.core.credential.AzureKeyCredential;
import com.azure.core.util.polling.SyncPoller;
import com.azure.ai.contentunderstanding.ContentUnderstandingClient;
import com.azure.ai.contentunderstanding.ContentUnderstandingClientBuilder;
import com.azure.ai.contentunderstanding.models.*;

public class test_image {

    public static void main(String[] args) {
        String endpoint = System.getenv("CONTENTUNDERSTANDING_ENDPOINT");
        String key = System.getenv("CONTENTUNDERSTANDING_KEY");

        ContentUnderstandingClient client =
            new ContentUnderstandingClientBuilder()
                .endpoint(endpoint)
                .credential(new AzureKeyCredential(key))
                .buildClient();

        AnalysisInput input = new AnalysisInput();
        input.setUrl(
            "https://raw.githubusercontent.com/"
            + "Azure-Samples/"
            + "azure-ai-content-understanding-assets/"
            + "main/image/pieChart.jpg"
        );

        SyncPoller<ContentAnalyzerAnalyzeOperationStatus, AnalysisResult> operation =
            client.beginAnalyze(
                "prebuilt-imageSearch",
                Arrays.asList(input)
            );

        AnalysisResult result = operation.getFinalResult();
        AnalysisContent content = result.getContents().get(0);
        System.out.println(content.getMarkdown());

        String summary = content.getFields() != null
            && content.getFields().containsKey("Summary")
            ? content.getFields().get("Summary")
                .getValue().toString()
            : "";
        System.out.println("Summary: " + summary);
    }
}

```

This will produce an output like the following:
```text
![image](pages/1)

Summary: The pie chart displays the distribution of hours in four categories: 1-39 hours (6.7%), 40-50 hours (18.9%), 50-60 hours (36.6%), and 60+ hours (37.8%). The largest segment is 60+ hours, followed closely by 50-60 hours, then 40-50 hours, and the smallest segment is 1-39 hours.
```
> **Note:**
> This code is based on the AnalyzeUrl.java](https://github.com/Azure/azure-sdk-for-java/blob/main/sdk/contentunderstanding/azure-ai-contentunderstanding/src/samples/java/com/azure/ai/contentunderstanding/samples/Sample02_AnalyzeUrl.java) sample in the SDK repository.

# [Audio](#tab/audio)

This example uses the `prebuilt-audioSearch` analyzer to extract the audio transcript, generate a summary, and perform speaker labeling.

```java
import java.util.Arrays;
import com.azure.core.credential.AzureKeyCredential;
import com.azure.core.util.polling.SyncPoller;
import com.azure.ai.contentunderstanding.ContentUnderstandingClient;
import com.azure.ai.contentunderstanding.ContentUnderstandingClientBuilder;
import com.azure.ai.contentunderstanding.models.*;

public class test_audio {

    public static void main(String[] args) {
        String endpoint = System.getenv("CONTENTUNDERSTANDING_ENDPOINT");
        String key = System.getenv("CONTENTUNDERSTANDING_KEY");

        ContentUnderstandingClient client =
            new ContentUnderstandingClientBuilder()
                .endpoint(endpoint)
                .credential(new AzureKeyCredential(key))
                .buildClient();

        AnalysisInput input = new AnalysisInput();
        input.setUrl(
            "https://raw.githubusercontent.com/"
            + "Azure-Samples/"
            + "azure-ai-content-understanding-assets/"
            + "main/audio/callCenterRecording.mp3"
        );

        SyncPoller<ContentAnalyzerAnalyzeOperationStatus, AnalysisResult> operation =
            client.beginAnalyze(
                "prebuilt-audioSearch",
                Arrays.asList(input)
            );

        AnalysisResult result = operation.getFinalResult();

        // Cast to AudioVisualContent for audio-specific properties
        AudioVisualContent audioContent =
            (AudioVisualContent) result.getContents().get(0);
        System.out.println(audioContent.getMarkdown());

        String summary = audioContent.getFields() != null
            && audioContent.getFields().containsKey("Summary")
            ? audioContent.getFields().get("Summary")
                .getValue().toString()
            : "";
        System.out.println("Summary: " + summary);

        if (audioContent.getTranscriptPhrases() != null
            && !audioContent.getTranscriptPhrases().isEmpty()) {
            System.out.println("Transcript (first two phrases):");
            int count = 0;
            for (TranscriptPhrase phrase
                : audioContent.getTranscriptPhrases()) {
                if (count >= - break;
                System.out.println(
                    "  [" + phrase.getSpeaker() + "] "
                    + phrase.getStartTime().toMillis()
                    + " ms: " + phrase.getText()
                );
                count++;
            }
        }
    }
}

```

This will produce an output like the following:
```text
# Audio: 00:00.000 => 00:32.183

Transcript

WEBVTT

00:00.080 --> 00:00.640
<v Speaker 1>Good day.

00:00.880 --> 00:02.240
<v Speaker 1>Welcome to Contoso.

00:02.560 --> 00:03.760
<v Speaker 1>My name is John Doe.

00:03.920 --> 00:05.120
<v Speaker 1>How can I help you today?

00:05.440 --> 00:06.320
<v Speaker 2>Yes, good day.

00:06.640 --> 00:08.160
<v Speaker 2>My name is Maria Smith.

00:08.560 --> 00:11.360
<v Speaker 2>I would like to inquire about my current point balance.  

00:11.680 --> 00:12.560
<v Speaker 1>No problem.

00:12.880 --> 00:13.920
<v Speaker 1>I am happy to help.

00:14.240 --> 00:16.720
<v Speaker 1>I need your date of birth to confirm your identity.      

00:17.120 --> 00:19.600
<v Speaker 2>It is April 19th, 1988.

00:20.000 --> 00:20.480
<v Speaker 1>Great.

00:20.800 --> 00:24.160
<v Speaker 1>Your current point balance is 599 points.

00:24.560 --> 00:26.160
<v Speaker 1>Do you need any more information?

00:26.480 --> 00:27.200
<v Speaker 2>No, thank you.

00:27.600 --> 00:28.320
<v Speaker 2>That was all.

00:28.720 --> 00:29.360
<v Speaker 2>Goodbye.

00:29.680 --> 00:31.920
<v Speaker 1>You're welcome, goodbye a Cantoso.

Summary: The conversation is a customer service interaction where Maria Smith contacts Contoso to inquire about her current point balance. The agent, John Doe, verifies her identity by asking for her date of birth and then provides her with the information that she has 599 points. The customer confirms that she does not need any further information and ends the call politely.
Transcript (first two phrases):
  [Speaker 1] 80 ms: Good day.
  [Speaker 1] 880 ms: Welcome to Contoso.
```
> **Note:**
> This code is based on the AnalyzeUrl.java](https://github.com/Azure/azure-sdk-for-java/blob/main/sdk/contentunderstanding/azure-ai-contentunderstanding/src/samples/java/com/azure/ai/contentunderstanding/samples/Sample02_AnalyzeUrl.java) sample in the SDK repository.

# [Video](#tab/video)

This example uses the `prebuilt-videoSearch` analyzer to extract keyframes, transcript, and chapter segments from video.

```java
import java.util.Arrays;
import com.azure.core.credential.AzureKeyCredential;
import com.azure.core.util.polling.SyncPoller;
import com.azure.ai.contentunderstanding.ContentUnderstandingClient;
import com.azure.ai.contentunderstanding.ContentUnderstandingClientBuilder;
import com.azure.ai.contentunderstanding.models.*;

public class test_video {

    public static void main(String[] args) {
        String endpoint = System.getenv("CONTENTUNDERSTANDING_ENDPOINT");
        String key = System.getenv("CONTENTUNDERSTANDING_KEY");

        ContentUnderstandingClient client =
            new ContentUnderstandingClientBuilder()
                .endpoint(endpoint)
                .credential(new AzureKeyCredential(key))
                .buildClient();

        AnalysisInput input = new AnalysisInput();
        input.setUrl(
            "https://raw.githubusercontent.com/"
            + "Azure-Samples/"
            + "azure-ai-content-understanding-assets/"
            + "main/videos/sdk_samples/FlightSimulator.mp4"
        );

        SyncPoller<ContentAnalyzerAnalyzeOperationStatus, AnalysisResult> operation =
            client.beginAnalyze(
                "prebuilt-videoSearch",
                Arrays.asList(input)
            );

        AnalysisResult result = operation.getFinalResult();

        int segmentIndex = 1;
        for (AnalysisContent media : result.getContents()) {
            AudioVisualContent videoContent =
                (AudioVisualContent) media;

            System.out.println("--- Segment " + segmentIndex + " ---");
            System.out.println("Markdown:");
            System.out.println(videoContent.getMarkdown());

            String summary = videoContent.getFields() != null
                && videoContent.getFields().containsKey("Summary")
                ? videoContent.getFields().get("Summary")
                    .getValue().toString()
                : "";
            System.out.println("Summary: " + summary);

            System.out.println(
                "Start: " + videoContent.getStartTime().toMillis()
                + " ms, End: " + videoContent.getEndTime().toMillis()
                + " ms"
            );
            System.out.println(
                "Frame size: " + videoContent.getWidth()
                + " x " + videoContent.getHeight()
            );

            System.out.println("---------------------");
            segmentIndex++;
        }
    }
}

```

This will produce an output like the following:
```text
--- Segment 1 ---
Markdown:
# Video: 00:00.733 => 00:15.467
Width: 1080
Height: 608

Transcript

WEBVTT

00:01.360 --> 00:06.640
<Speaker 1>When it comes to the neural TTS, in order to get a good voice, it's better to have good data.

00:07.120 --> 00:13.320
<Speaker 2>To achieve that, we build a universal TTS model based on 3,000 hours of data.

00:13.440 --> 00:23.680
<Speaker 1>We actually accumulated tons of the data so that this universal model is able to capture the nuance of the audio and generate a more natural voice for the algorithm.


Key Frames
- 00:00.733 ![](keyFrame.733.jpg)
- 00:02.067 ![](keyFrame.2067.jpg)
- 00:02.667 ![](keyFrame.2667.jpg)
- 00:04.067 ![](keyFrame.4067.jpg)
- 00:04.900 ![](keyFrame.4900.jpg)
- 00:05.733 ![](keyFrame.5733.jpg)
- 00:06.567 ![](keyFrame.6567.jpg)
- 00:07.800 ![](keyFrame.7800.jpg)
- 00:09.000 ![](keyFrame.9000.jpg)
- 00:09.800 ![](keyFrame.9800.jpg)
- 00:10.600 ![](keyFrame.10600.jpg)
- 00:12.100 ![](keyFrame.12100.jpg)
- 00:12.833 ![](keyFrame.12833.jpg)
- 00:14.200 ![](keyFrame.14200.jpg)
- 00:14.833 ![](keyFrame.14833.jpg)
- 00:15.467 ![](keyFrame.15467.jpg)
Summary: The video opens with a scenic aerial view of an island and a small plane flying over it, accompanied by the Flight Simulator and Microsoft Azure AI logos. It then transitions to a person speaking about the importance of good data for neural text-to-speech (TTS) technology, mentioning the creation of a universal TTS model trained on 3,000 hours of data to capture audio nuances and generate natural voices. Visuals include audio waveform displays and shots of a data center and server racks, emphasizing the technological infrastructure behind the TTS model.      
Start: 733 ms, End: 15467 ms
Frame size: 1080 x 608
---------------------
--- Segment 2 ---
Markdown:
# Video: 00:15.467 => 00:23.100
Width: 1080
Height: 608



Key Frames
- 00:15.467 ![](keyFrame.15467.jpg)
- 00:16.933 ![](keyFrame.16933.jpg)
- 00:17.767 ![](keyFrame.17767.jpg)
- 00:18.600 ![](keyFrame.18600.jpg)
- 00:20.167 ![](keyFrame.20167.jpg)
- 00:20.900 ![](keyFrame.20900.jpg)
- 00:21.633 ![](keyFrame.21633.jpg)
- 00:22.367 ![](keyFrame.22367.jpg)
- 00:23.100 ![](keyFrame.23100.jpg)
Summary: The video shifts to vibrant in-game footage from Flight Simulator, showcasing detailed landscapes, including a red biplane flying over coastal areas and a castle surrounded by greenery and mountains. This segment visually demonstrates the immersive and realistic environments within the simulator.
Start: 15467 ms, End: 23100 ms
Frame size: 1080 x 608
---------------------
--- Segment 3 ---
Markdown:
# Video: 00:23.100 => 00:43.233
Width: 1080
Height: 608

Transcript

WEBVTT

00:24.040 --> 00:29.120
<Speaker 3>What we liked about cognitive services offerings were that they had a much higher fidelity.

00:29.600 --> 00:32.880
<Speaker 3>And they sounded a lot more like an actual human voice.

00:33.680 --> 00:37.200
<Speaker 4>Orlando ground 9555 requesting the end of pushback.

00:38.680 --> 00:41.280
<Speaker 4>9555 request to end pushback received.


Key Frames
- 00:23.100 ![](keyFrame.23100.jpg)
- 00:24.833 ![](keyFrame.24833.jpg)
- 00:25.700 ![](keyFrame.25700.jpg)
- 00:26.567 ![](keyFrame.26567.jpg)
- 00:27.433 ![](keyFrame.27433.jpg)
- 00:28.300 ![](keyFrame.28300.jpg)
- 00:29.167 ![](keyFrame.29167.jpg)
- 00:30.833 ![](keyFrame.30833.jpg)
- 00:31.633 ![](keyFrame.31633.jpg)
- 00:32.433 ![](keyFrame.32433.jpg)
- 00:33.900 ![](keyFrame.33900.jpg)
- 00:34.600 ![](keyFrame.34600.jpg)
- 00:36.067 ![](keyFrame.36067.jpg)
- 00:36.867 ![](keyFrame.36867.jpg)
- 00:38.200 ![](keyFrame.38200.jpg)
- 00:38.700 ![](keyFrame.38700.jpg)
- 00:39.900 ![](keyFrame.39900.jpg)
- 00:40.600 ![](keyFrame.40600.jpg)
- 00:41.300 ![](keyFrame.41300.jpg)
- 00:42.633 ![](keyFrame.42633.jpg)
- 00:43.233 ![](keyFrame.43233.jpg)
Summary: The focus returns to a different person discussing the high fidelity of cognitive services' offerings, emphasizing how the voices sound more like actual human voices. The scene then transitions to airport ground operations, showing an airplane on the tarmac with ground crew directing pushback procedures. The audio includes realistic ATC (air traffic control) communications, enhancing the authenticity of the simulation experience.
Start: 23100 ms, End: 43233 ms
Frame size: 1080 x 608
```
> **Note:**
> This code is based on the AnalyzeUrl.java](https://github.com/Azure/azure-sdk-for-java/blob/main/sdk/contentunderstanding/azure-ai-contentunderstanding/src/samples/java/com/azure/ai/contentunderstanding/samples/Sample02_AnalyzeUrl.java) sample in the SDK repository.




**Applies to: programming-language-javascript**



<!-- markdownlint-disable MD025 -->

[Client library](https://www.npmjs.com/package/@azure/ai-content-understanding) | [Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/contentunderstanding/ai-content-understanding/samples/v1/javascript) | [SDK source](https://aka.ms/cu-sdk-js)

This quickstart shows you how to use the Content Understanding JavaScript SDK to extract structured data using prebuilt analyzers from document, image, audio, and video files. To learn more about prebuilt analyzers and other features, see the documentation of [Prebuilt Analyzers](../concepts/prebuilt-analyzers.md).

## Prerequisites

* An active Azure subscription. If you don't have an Azure account, [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
* A [Microsoft Foundry resource](https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry) created in a [supported region](../language-region-support.md).
* Your resource endpoint and API key (found under Keys and Endpoint in the Azure portal).
* Model deployment defaults configured for your resource. See [Models and deployments](../concepts/models-deployments.md) or this one-time [configuration script](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/contentunderstanding/ai-content-understanding/samples/v1/javascript/updateDefaults.js) for setup instructions.
* [Node.js](https://nodejs.org/) LTS version.

## Setup

1. Create a new Node.js project:

    ```console
    mkdir content-understanding-quickstart
    cd content-understanding-quickstart
    npm init -y
    ```

1. Install the Content Understanding client library:

    ```console
    npm install @azure/ai-content-understanding@next
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

## Create a client

The `ContentUnderstandingClient` is the main entry point for interacting with the service. Create an instance by providing your endpoint and credential.

```javascript
const { AzureKeyCredential } = require("@azure/core-auth");
const {
    ContentUnderstandingClient,
} = require("@azure/ai-content-understanding");

const endpoint = process.env["CONTENTUNDERSTANDING_ENDPOINT"];
const key = process.env["CONTENTUNDERSTANDING_KEY"];

const client = new ContentUnderstandingClient(
    endpoint,
    new AzureKeyCredential(key)
);
```

## Get started with a prebuilt analyzer

Analyzers define how your content is processed and the insights that are extracted. We offer [prebuilt analyzers](../concepts/prebuilt-analyzers.md) for common use cases. You can [customize prebuilt analyzers](../concepts/prebuilt-analyzers.md) to better fit your specific needs and use cases.
This quickstart uses prebuilt invoice, image, audio, and video analyzers to help you get started.


# [Document](#tab/document)

This example uses the `prebuilt-invoice` analyzer to extract structured data from an invoice document.

```javascript
async function main() {
    const client = new ContentUnderstandingClient(
        endpoint,
        new AzureKeyCredential(key)
    );

    // Sample invoice
    const invoiceUrl =
        "https://raw.githubusercontent.com/"
        + "Azure-Samples/"
        + "azure-ai-content-understanding-assets/"
        + "main/document/invoice.pdf";

    const poller = client.analyze(
        "prebuilt-invoice",
        [{ url: invoiceUrl }]
    );
    const result = await poller.pollUntilDone();

    if (
        !result.contents
        || result.contents.length === 0
    ) {
        console.log(
            "No content found in the analysis result."
        );
        return;
    }

    const content = result.contents[0];

    // Get the document content
    if (content.kind === "document") {
        const documentContent = content;

        console.log(
            `Document unit: `
            + `${documentContent.unit ?? "unknown"}`
        );
        console.log(
            `Pages: ${documentContent.startPageNumber}`
            + ` to ${documentContent.endPageNumber}`
        );

        if (!documentContent.fields) {
            console.log("No fields found.");
            return;
        }

        // Extract simple string fields
        const customerNameField =
            documentContent.fields["CustomerName"];
        if (customerNameField) {
            console.log(
                `Customer Name: `
                + `${customerNameField.value ?? "(None)"}`
            );
            if (
                customerNameField.confidence !== undefined
            ) {
                console.log(
                    `  Confidence: `
                    + `${customerNameField.confidence
                        .toFixed(2)}`
                );
            }
        }

        // Extract date fields
        const invoiceDateField =
            documentContent.fields["InvoiceDate"];
        if (invoiceDateField) {
            console.log(
                `Invoice Date: `
                + `${invoiceDateField.value ?? "(None)"}`
            );
            if (
                invoiceDateField.confidence !== undefined
            ) {
                console.log(
                    `  Confidence: `
                    + `${invoiceDateField.confidence
                        .toFixed(2)}`
                );
            }
        }

        // Extract object fields (nested structures)
        const totalAmountField =
            documentContent.fields["TotalAmount"];
        if (
            totalAmountField
            && totalAmountField.type === "object"
        ) {
            const objField = totalAmountField;
            if (objField.value) {
                const amountField =
                    objField.value["Amount"];
                const currencyField =
                    objField.value["CurrencyCode"];

                const amount =
                    amountField?.value ?? "(None)";
                const currency =
                    currencyField?.value ?? "";

                console.log(
                    `\nTotal: ${currency}${amount}`
                );
            }
        }

        // Extract array fields (line items)
        const lineItemsField =
            documentContent.fields["LineItems"];
        if (
            lineItemsField
            && lineItemsField.type === "array"
        ) {
            const arrField = lineItemsField;
            if (
                arrField.value
                && arrField.value.length > 0
            ) {
                console.log(
                    `\nLine Items `
                    + `(${arrField.value.length}):`
                );
                arrField.value.forEach((item, index) => {
                    if (item.type === "object") {
                        const itemObj = item;
                        if (itemObj.value) {
                            const descField =
                                itemObj.value[
                                    "Description"
                                ];
                            const qtyField =
                                itemObj.value["Quantity"];

                            const description =
                                descField?.value ?? "N/A";
                            const quantity =
                                qtyField?.value ?? "N/A";

                            console.log(
                                `  Item ${index + 1}: `
                                + `${description}`
                            );
                            console.log(
                                `    Quantity: ${quantity}`
                            );
                        }
                    }
                });
            }
        }
    }
}

main().catch((err) => {
    console.error("The sample encountered an error:", err);
});
```

This will produce the following output:
```text
Document unit: inch
Pages: 1 to 1
Customer Name: MICROSOFT CORPORATION
  Confidence: 0.44
Invoice Date: Thu Nov 14 2019 19:00:00 GMT-0500 (Eastern Standard Time)
  Confidence: 0.94

Total: USD110

Line Items (3):
  Item 1: Consulting Services
    Quantity: 2
  Item 2: Document Fee
    Quantity: 3
  Item 3: Printing Fee
    Quantity: 10
```

> **Note:**
> This code is based on the [analyzeInvoice.js](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/contentunderstanding/ai-content-understanding/samples/v1/javascript/analyzeInvoice.js) sample in the SDK repository.

# [Image](#tab/image)

This example uses the `prebuilt-imageSearch` analyzer to generate a description of the image.

```javascript
async function main() {
    const client = new ContentUnderstandingClient(
        endpoint,
        new AzureKeyCredential(key)
    );

    const poller = client.analyze("prebuilt-imageSearch", [
        { url: "https://raw.githubusercontent.com/Azure-Samples/azure-ai-content-understanding-assets/main/image/pieChart.jpg" },
    ]);
    const result = await poller.pollUntilDone();

    const content = result.contents[0];
    console.log(content.markdown);
    console.log("Summary:", content.fields?.["Summary"]?.value ?? "");
}

main().catch((err) => {
    console.error("The sample encountered an error:", err);
});
```

This will produce an output like the following:
```text
![image](pages/1)

Summary: The pie chart displays the distribution of hours spent in four categories: 1-39 hours (6.7%), 40-50 hours (18.9%), 50-60 hours (36.6%), and 60+ hours (37.8%). The largest segment is 60+ hours, followed closely by 50-60 hours, then 40-50 hours, and the smallest segment is 1-39 hours.
```
> **Note:**
> This code is based on the [analyzeUrl.js](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/contentunderstanding/ai-content-understanding/samples/v1/javascript/analyzeUrl.js) sample in the SDK repository.

# [Audio](#tab/audio)

This example uses the `prebuilt-audioSearch` analyzer to extract the audio transcript, generate a summary, and perform speaker labeling.

```javascript
async function main() {
    const client = new ContentUnderstandingClient(
        endpoint,
        new AzureKeyCredential(key)
    );

    const poller = client.analyze("prebuilt-audioSearch", [
        { url: "https://raw.githubusercontent.com/Azure-Samples/azure-ai-content-understanding-assets/main/audio/callCenterRecording.mp3" },
    ]);
    const result = await poller.pollUntilDone();

    if (result.contents && result.contents.length > 0
        && result.contents[0].kind === "audioVisual") {
        const audioContent = result.contents[0];
        console.log(audioContent.markdown);
        console.log("Summary:",
            audioContent.fields?.["Summary"]?.value ?? "");

        if (audioContent.transcriptPhrases
            && audioContent.transcriptPhrases.length > 0) {
            console.log("Transcript (first two phrases):");
            for (const phrase
                of audioContent.transcriptPhrases.slice(0, 2)) {
                console.log(
                    `  [${phrase.speaker}] `
                    + `${phrase.startTimeMs} ms: `
                    + `${phrase.text}`
                );
            }
        }
    }
}

main().catch((err) => {
    console.error("The sample encountered an error:", err);
});
```

This will produce an output like the following:
```text
# Audio: 00:00.000 => 00:32.183

Transcript

WEBVTT

00:00.080 --> 00:00.640
<v Speaker 1>Good day.

00:00.880 --> 00:02.240
<v Speaker 1>Welcome to Contoso.

00:02.560 --> 00:03.760
<v Speaker 1>My name is John Doe.

00:03.920 --> 00:05.120
<v Speaker 1>How can I help you today?

00:05.440 --> 00:06.320
<v Speaker 2>Yes, good day.

00:06.640 --> 00:08.160
<v Speaker 2>My name is Maria Smith.

00:08.560 --> 00:11.360
<v Speaker 2>I would like to inquire about my current point balance.

00:11.680 --> 00:12.560
<v Speaker 1>No problem.

00:12.880 --> 00:13.920
<v Speaker 1>I am happy to help.

00:14.240 --> 00:16.720
<v Speaker 1>I need your date of birth to confirm your identity.

00:17.120 --> 00:19.600
<v Speaker 2>It is April 19th, 1988.

00:20.000 --> 00:20.480
<v Speaker 1>Great.

00:20.800 --> 00:24.160
<v Speaker 1>Your current point balance is 599 points.

00:24.560 --> 00:26.160
<v Speaker 1>Do you need any more information?

00:26.480 --> 00:27.200
<v Speaker 2>No, thank you.

00:27.600 --> 00:28.320
<v Speaker 2>That was all.

00:28.720 --> 00:29.360
<v Speaker 2>Goodbye.

00:29.680 --> 00:31.920
<v Speaker 1>You're welcome, goodbye a Cantoso.

Summary: The conversation is a customer service interaction where Maria Smith contacts Contoso to inquire about her current point balance. The agent, John Doe, verifies her identity by asking for her date of birth and then provides her with the information that she has 599 points. The customer confirms that she does not need any further information and ends the call politely.
Transcript (first two phrases):
  [Speaker 1] 80 ms: Good day.
  [Speaker 1] 880 ms: Welcome to Contoso.
```
> **Note:**
> This code is based on the [analyzeUrl.js](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/contentunderstanding/ai-content-understanding/samples/v1/javascript/analyzeUrl.js) sample in the SDK repository.

# [Video](#tab/video)

This example uses the `prebuilt-videoSearch` analyzer to extract keyframes, transcript, and chapter segments from video.

```javascript
async function main() {
    const client = new ContentUnderstandingClient(
        endpoint,
        new AzureKeyCredential(key)
    );

    const poller = client.analyze("prebuilt-videoSearch", [
        { url: "https://raw.githubusercontent.com/Azure-Samples/azure-ai-content-understanding-assets/main/videos/sdk_samples/FlightSimulator.mp4" },
    ]);
    const result = await poller.pollUntilDone();

    if (result.contents) {
        let segmentIndex = 1;
        for (const content of result.contents) {
            if (content.kind === "audioVisual") {
                console.log(`--- Segment ${segmentIndex} ---`);
                console.log("Markdown:");
                console.log(content.markdown);
                console.log("Summary:",
                    content.fields?.["Summary"]?.value ?? "");
                console.log(
                    `Start: ${content.startTimeMs} ms, `
                    + `End: ${content.endTimeMs} ms`
                );
                console.log(
                    `Frame size: ${content.width} `
                    + `x ${content.height}`
                );
                console.log("---------------------");
                segmentIndex++;
            }
        }
    }
}

main().catch((err) => {
    console.error("The sample encountered an error:", err);
});
```

This will produce an output like the following:
```text
--- Segment 1 ---
Markdown:
# Video: 00:00.733 => 00:15.467
Width: 1080
Height: 608

Transcript

WEBVTT

00:01.360 --> 00:06.640
<Speaker 1>When it comes to the neural TTS, in order to get a good voice, it's better to have good data.

00:07.120 --> 00:13.320
<Speaker 2>To achieve that, we build a universal TTS model based on 3,000 hours of data.

00:13.440 --> 00:23.680
<Speaker 1>We actually accumulated tons of the data so that this universal model is able to capture the nuance of the audio and generate a more natural voice for the algorithm.


Key Frames
- 00:00.733 ![](keyFrame.733.jpg)
- 00:02.067 ![](keyFrame.2067.jpg)
- 00:02.667 ![](keyFrame.2667.jpg)
- 00:04.067 ![](keyFrame.4067.jpg)
- 00:04.900 ![](keyFrame.4900.jpg)
- 00:05.733 ![](keyFrame.5733.jpg)
- 00:06.567 ![](keyFrame.6567.jpg)
- 00:07.800 ![](keyFrame.7800.jpg)
- 00:09.000 ![](keyFrame.9000.jpg)
- 00:09.800 ![](keyFrame.9800.jpg)
- 00:10.600 ![](keyFrame.10600.jpg)
- 00:12.100 ![](keyFrame.12100.jpg)
- 00:12.833 ![](keyFrame.12833.jpg)
- 00:14.200 ![](keyFrame.14200.jpg)
- 00:14.833 ![](keyFrame.14833.jpg)
- 00:15.467 ![](keyFrame.15467.jpg)
Summary: The video opens with a Flight Simulator and Microsoft Azure AI collaboration logo, followed by a discussion about neural text-to-speech (TTS) technology. A speaker explains the importance of having high-quality data, mentioning a universal TTS model built on 3,000 hours of data to capture audio nuances and generate natural voices. Visuals include audio waveform displays and shots of data centers and server farms, emphasizing the technology and infrastructure behind the TTS model.
Start: 733 ms, End: 15467 ms
Frame size: 1080 x 608
---------------------
--- Segment 2 ---
Markdown:
# Video: 00:15.467 => 00:23.100
Width: 1080
Height: 608



Key Frames
- 00:15.467 ![](keyFrame.15467.jpg)
- 00:16.933 ![](keyFrame.16933.jpg)
- 00:17.767 ![](keyFrame.17767.jpg)
- 00:18.600 ![](keyFrame.18600.jpg)
- 00:20.167 ![](keyFrame.20167.jpg)
- 00:20.900 ![](keyFrame.20900.jpg)
- 00:21.633 ![](keyFrame.21633.jpg)
- 00:22.367 ![](keyFrame.22367.jpg)
- 00:23.100 ![](keyFrame.23100.jpg)
Summary: The video transitions to scenic aerial views from a flight simulator, showing detailed landscapes, mountains, castles, and a biplane flying over the terrain. This segment visually demonstrates the immersive and realistic environment of the flight simulation experience.
Start: 15467 ms, End: 23100 ms
Frame size: 1080 x 608
---------------------
--- Segment 3 ---
Markdown:
# Video: 00:23.100 => 00:29.167
Width: 1080
Height: 608

Transcript

WEBVTT

00:24.040 --> 00:29.120
<Speaker 3>What we liked about cognitive services offerings were that they had a much higher fidelity.


Key Frames
- 00:23.100 ![](keyFrame.23100.jpg)
- 00:24.833 ![](keyFrame.24833.jpg)
- 00:25.700 ![](keyFrame.25700.jpg)
- 00:26.567 ![](keyFrame.26567.jpg)
- 00:27.433 ![](keyFrame.27433.jpg)
- 00:28.300 ![](keyFrame.28300.jpg)
- 00:29.167 ![](keyFrame.29167.jpg)
Summary: The video cuts to another speaker discussing the high fidelity and human-like quality of the cognitive services' voices. The background shows a modern office environment. The speaker emphasizes the superior sound quality of these services.
Start: 23100 ms, End: 29167 ms
Frame size: 1080 x 608
---------------------
--- Segment 4 ---
Markdown:
# Video: 00:29.167 => 00:43.233
Width: 1080
Height: 608

Transcript

WEBVTT

00:29.600 --> 00:32.880
<Speaker 3>And they sounded a lot more like an actual human voice.

00:33.680 --> 00:37.200
<Speaker 4>Orlando ground 9555 requesting the end of pushback.

00:38.680 --> 00:41.280
<Speaker 4>9555 request to end pushback received.


Key Frames
- 00:29.167 ![](keyFrame.29167.jpg)
- 00:30.833 ![](keyFrame.30833.jpg)
- 00:31.633 ![](keyFrame.31633.jpg)
- 00:32.433 ![](keyFrame.32433.jpg)
- 00:33.900 ![](keyFrame.33900.jpg)
- 00:34.600 ![](keyFrame.34600.jpg)
- 00:36.067 ![](keyFrame.36067.jpg)
- 00:36.867 ![](keyFrame.36867.jpg)
- 00:38.200 ![](keyFrame.38200.jpg)
- 00:38.700 ![](keyFrame.38700.jpg)
- 00:39.900 ![](keyFrame.39900.jpg)
- 00:40.600 ![](keyFrame.40600.jpg)
- 00:41.300 ![](keyFrame.41300.jpg)
- 00:42.633 ![](keyFrame.42633.jpg)
- 00:43.233 ![](keyFrame.43233.jpg)
Summary: The video shifts to airport ground operations with visuals of an Airbus airplane being marshaled by ground crew. The audio includes realistic ATC (air traffic control) communications, such as a request to end pushback and the corresponding acknowledgment, adding to the immersive simulation experience.
Start: 29167 ms, End: 43233 ms
Frame size: 1080 x 608
```
> **Note:**
> This code is based on the [analyzeUrl.js](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/contentunderstanding/ai-content-understanding/samples/v1/javascript/analyzeUrl.js) sample in the SDK repository.







**Applies to: programming-language-typescript**



<!-- markdownlint-disable MD025 -->

[Client library](https://www.npmjs.com/package/@azure/ai-content-understanding) | [Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/contentunderstanding/ai-content-understanding/samples/v1/typescript) | [SDK source](https://aka.ms/cu-sdk-js)

This quickstart shows you how to use the Content Understanding TypeScript SDK to extract structured data using prebuilt analyzers from document, image, audio, and video files. To learn more about prebuilt analyzers and other features, see the documentation of [Prebuilt Analyzers](../concepts/prebuilt-analyzers.md).

## Prerequisites

* An active Azure subscription. If you don't have an Azure account, [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
* A [Microsoft Foundry resource](https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry) created in a [supported region](../language-region-support.md).
* Your resource endpoint and API key (found under Keys and Endpoint in the Azure portal).
* Model deployment defaults configured for your resource. See [Models and deployments](../concepts/models-deployments.md) or this one-time [configuration script](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/contentunderstanding/ai-content-understanding/samples/v1/typescript/src/updateDefaults.ts) for setup instructions.
* [Node.js](https://nodejs.org/) LTS version.
* [TypeScript](https://www.typescriptlang.org/) 5.x or later.

## Setup

1. Create a new Node.js project:

    ```console
    mkdir content-understanding-quickstart
    cd content-understanding-quickstart
    npm init -y
    ```

1. Install TypeScript and the Content Understanding client library:

    ```console
    npm install typescript ts-node @azure/ai-content-understanding@next
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

## Create a client

The `ContentUnderstandingClient` is the main entry point for interacting with the service. Create an instance by providing your endpoint and credential.

```typescript
import { AzureKeyCredential } from "@azure/core-auth";
import {
    ContentUnderstandingClient,
} from "@azure/ai-content-understanding";

const endpoint = process.env["CONTENTUNDERSTANDING_ENDPOINT"];
const key = process.env["CONTENTUNDERSTANDING_KEY"];

const client = new ContentUnderstandingClient(
    endpoint,
    new AzureKeyCredential(key)
);
```

## Get started with a prebuilt analyzer

Analyzers define how your content is processed and the insights that are extracted. We offer [prebuilt analyzers](../concepts/prebuilt-analyzers.md) for common use cases. You can [customize prebuilt analyzers](../concepts/prebuilt-analyzers.md) to better fit your specific needs and use cases.
This quickstart uses prebuilt invoice, image, audio, and video analyzers to help you get started.


# [Document](#tab/document)

This example uses the `prebuilt-invoice` analyzer to extract structured data from an invoice document.

```typescript
import {
    type DocumentContent,
    type ArrayField,
    type ObjectField,
} from "@azure/ai-content-understanding";

async function main(): Promise<void> {
    const client = new ContentUnderstandingClient(
        endpoint,
        new AzureKeyCredential(key)
    );

    // Sample invoice
    const invoiceUrl =
        "https://raw.githubusercontent.com/"
        + "Azure-Samples/"
        + "azure-ai-content-understanding-assets/"
        + "main/document/invoice.pdf";

    const poller = client.analyze(
        "prebuilt-invoice",
        [{ url: invoiceUrl }]
    );
    const result = await poller.pollUntilDone();

    if (
        !result.contents
        || result.contents.length === 0
    ) {
        console.log(
            "No content found in the analysis result."
        );
        return;
    }

    const content = result.contents[0];

    // Get the document content
    if (content.kind === "document") {
        const documentContent =
            content as DocumentContent;

        console.log(
            `Document unit: `
            + `${documentContent.unit ?? "unknown"}`
        );
        console.log(
            `Pages: ${documentContent.startPageNumber}`
            + ` to ${documentContent.endPageNumber}`
        );

        if (!documentContent.fields) {
            console.log("No fields found.");
            return;
        }

        // Extract simple string fields
        const customerNameField =
            documentContent.fields["CustomerName"];
        if (customerNameField) {
            console.log(
                `Customer Name: `
                + `${customerNameField.value ?? "(None)"}`
            );
            if (
                customerNameField.confidence !== undefined
            ) {
                console.log(
                    `  Confidence: `
                    + `${customerNameField.confidence
                        .toFixed(2)}`
                );
            }
        }

        // Extract date fields
        const invoiceDateField =
            documentContent.fields["InvoiceDate"];
        if (invoiceDateField) {
            console.log(
                `Invoice Date: `
                + `${invoiceDateField.value ?? "(None)"}`
            );
            if (
                invoiceDateField.confidence !== undefined
            ) {
                console.log(
                    `  Confidence: `
                    + `${invoiceDateField.confidence
                        .toFixed(2)}`
                );
            }
        }

        // Extract object fields (nested structures)
        const totalAmountField =
            documentContent.fields["TotalAmount"];
        if (
            totalAmountField
            && totalAmountField.type === "object"
        ) {
            const objField =
                totalAmountField as ObjectField;
            if (objField.value) {
                const amountField =
                    objField.value["Amount"];
                const currencyField =
                    objField.value["CurrencyCode"];

                const amount =
                    amountField?.value ?? "(None)";
                const currency =
                    currencyField?.value ?? "";

                console.log(
                    `\nTotal: ${currency}${amount}`
                );
            }
        }

        // Extract array fields (line items)
        const lineItemsField =
            documentContent.fields["LineItems"];
        if (
            lineItemsField
            && lineItemsField.type === "array"
        ) {
            const arrField =
                lineItemsField as ArrayField;
            if (
                arrField.value
                && arrField.value.length > 0
            ) {
                console.log(
                    `\nLine Items `
                    + `(${arrField.value.length}):`
                );
                arrField.value.forEach(
                    (item, index) => {
                        if (item.type === "object") {
                            const itemObj =
                                item as ObjectField;
                            if (itemObj.value) {
                                const descField =
                                    itemObj.value[
                                        "Description"
                                    ];
                                const qtyField =
                                    itemObj.value[
                                        "Quantity"
                                    ];

                                const description =
                                    descField?.value
                                    ?? "N/A";
                                const quantity =
                                    qtyField?.value
                                    ?? "N/A";

                                console.log(
                                    `  Item `
                                    + `${index + 1}: `
                                    + `${description}`
                                );
                                console.log(
                                    `    Quantity: `
                                    + `${quantity}`
                                );
                            }
                        }
                    }
                );
            }
        }
    }
}

main().catch((err) => {
    console.error("The sample encountered an error:", err);
});
```

This will produce the following output:
```text
Document unit: inch
Pages: 1 to 1
Customer Name: MICROSOFT CORPORATION
  Confidence: 0.39
Invoice Date: Thu Nov 14 2019 19:00:00 GMT-0500 (Eastern Standard Time)
  Confidence: 0.94

Total: USD110

Line Items (3):
  Item 1: Consulting Services
    Quantity: 2
  Item 2: Document Fee
    Quantity: 3
  Item 3: Printing Fee
    Quantity: 10
```

> **Note:**
> This code is based on the [analyzeInvoice.ts](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/contentunderstanding/ai-content-understanding/samples/v1/typescript/src/analyzeInvoice.ts) sample in the SDK repository.

# [Image](#tab/image)

This example uses the `prebuilt-imageSearch` analyzer to generate a description of the image.

```typescript
async function main(): Promise<void> {
    const client = new ContentUnderstandingClient(
        endpoint,
        new AzureKeyCredential(key)
    );

    const poller = client.analyze("prebuilt-imageSearch", [
        { url: "https://raw.githubusercontent.com/Azure-Samples/azure-ai-content-understanding-assets/main/image/pieChart.jpg" },
    ]);
    const result = await poller.pollUntilDone();

    const content = result.contents![0];
    console.log(content.markdown);
    console.log("Summary:",
        content.fields?.["Summary"]?.value ?? "");
}

main().catch((err) => {
    console.error("The sample encountered an error:", err);
});
```

This will produce an output like the following:
```text
The pie chart displays the distribution of hours spent in four categories: 1-39 hours (6.7%), 40-50 hours (18.9%), 50-60 hours (36.6%), and 60+ hours (37.8%). The largest segment is 60+ hours, followed closely by 50-60 hours, then 40-50 hours, and the smallest segment is 1-39 hours.
```
> **Note:**
> This code is based on the [analyzeUrl.ts](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/contentunderstanding/ai-content-understanding/samples/v1/typescript/src/analyzeUrl.ts) sample in the SDK repository.

# [Audio](#tab/audio)

This example uses the `prebuilt-audioSearch` analyzer to extract the audio transcript, generate a summary, and perform speaker labeling.

```typescript
import {
    type AudioVisualContent,
} from "@azure/ai-content-understanding";

async function main(): Promise<void> {
    const client = new ContentUnderstandingClient(
        endpoint,
        new AzureKeyCredential(key)
    );

    const poller = client.analyze("prebuilt-audioSearch", [
        { url: "https://raw.githubusercontent.com/Azure-Samples/azure-ai-content-understanding-assets/main/audio/callCenterRecording.mp3" },
    ]);
    const result = await poller.pollUntilDone();

    if (result.contents && result.contents.length > 0
        && result.contents[0].kind === "audioVisual") {
        const audioContent =
            result.contents[0] as AudioVisualContent;
        console.log(audioContent.markdown);
        console.log("Summary:",
            audioContent.fields?.["Summary"]?.value ?? "");

        if (audioContent.transcriptPhrases
            && audioContent.transcriptPhrases.length > 0) {
            console.log("Transcript (first two phrases):");
            for (const phrase
                of audioContent.transcriptPhrases.slice(0, 2)) {
                console.log(
                    `  [${phrase.speaker}] `
                    + `${phrase.startTimeMs} ms: `
                    + `${phrase.text}`
                );
            }
        }
    }
}

main().catch((err) => {
    console.error("The sample encountered an error:", err);
});
```

This will produce an output like the following:
```text
# Audio: 00:00.000 => 00:32.183

Transcript

WEBVTT

00:00.080 --> 00:00.640
<v Speaker 1>Good day.

00:00.880 --> 00:02.240
<v Speaker 1>Welcome to Contoso.

00:02.560 --> 00:03.760
<v Speaker 1>My name is John Doe.

00:03.920 --> 00:05.120
<v Speaker 1>How can I help you today?

00:05.440 --> 00:06.320
<v Speaker 2>Yes, good day.

00:06.640 --> 00:08.160
<v Speaker 2>My name is Maria Smith.

00:08.560 --> 00:11.360
<v Speaker 2>I would like to inquire about my current point balance.

00:11.680 --> 00:12.560
<v Speaker 1>No problem.

00:12.880 --> 00:13.920
<v Speaker 1>I am happy to help.

00:14.240 --> 00:16.720
<v Speaker 1>I need your date of birth to confirm your identity.

00:17.120 --> 00:19.600
<v Speaker 2>It is April 19th, 1988.

00:20.000 --> 00:20.480
<v Speaker 1>Great.

00:20.800 --> 00:24.160
<v Speaker 1>Your current point balance is 599 points.

00:24.560 --> 00:26.160
<v Speaker 1>Do you need any more information?

00:26.480 --> 00:27.200
<v Speaker 2>No, thank you.

00:27.600 --> 00:28.320
<v Speaker 2>That was all.

00:28.720 --> 00:29.360
<v Speaker 2>Goodbye.

00:29.680 --> 00:31.920
<v Speaker 1>You're welcome, goodbye a Cantoso.

Summary: The conversation is a customer service interaction where Maria Smith contacts Contoso to inquire about her current point balance. The agent, John Doe, verifies her identity by asking for her date of birth and then informs her that her current point balance is 599 points. Maria confirms she does not need further information and ends the call politely.   
Transcript (first two phrases):
  [Speaker 1] 80 ms: Good day.
  [Speaker 1] 880 ms: Welcome to Contoso.
```
> **Note:**
> This code is based on the [analyzeUrl.ts](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/contentunderstanding/ai-content-understanding/samples/v1/typescript/src/analyzeUrl.ts) sample in the SDK repository.

# [Video](#tab/video)

This example uses the `prebuilt-videoSearch` analyzer to extract keyframes, transcript, and chapter segments from video.

```typescript
import {
    type AudioVisualContent,
} from "@azure/ai-content-understanding";

async function main(): Promise<void> {
    const client = new ContentUnderstandingClient(
        endpoint,
        new AzureKeyCredential(key)
    );

    const poller = client.analyze("prebuilt-videoSearch", [
        { url: "https://raw.githubusercontent.com/Azure-Samples/azure-ai-content-understanding-assets/main/videos/sdk_samples/FlightSimulator.mp4" },
    ]);
    const result = await poller.pollUntilDone();

    if (result.contents) {
        let segmentIndex = 1;
        for (const content of result.contents) {
            if (content.kind === "audioVisual") {
                const videoContent =
                    content as AudioVisualContent;
                console.log(
                    `--- Segment ${segmentIndex} ---`
                );
                console.log("Markdown:");
                console.log(videoContent.markdown);
                console.log("Summary:",
                    videoContent.fields?.["Summary"]?.value
                    ?? "");
                console.log(
                    `Start: ${videoContent.startTimeMs} ms, `
                    + `End: ${videoContent.endTimeMs} ms`
                );
                console.log(
                    `Frame size: ${videoContent.width} `
                    + `x ${videoContent.height}`
                );
                console.log("---------------------");
                segmentIndex++;
            }
        }
    }
}

main().catch((err) => {
    console.error("The sample encountered an error:", err);
});
```

This will produce an output like the following:
```text
--- Segment 1 ---
Markdown:
# Video: 00:00.733 => 00:43.233
Width: 1080
Height: 608

Transcript

WEBVTT

00:01.360 --> 00:06.640
<Speaker 1>When it comes to the neural TTS, in order to get a good voice, it's better to have good data.

00:07.120 --> 00:13.320
<Speaker 2>To achieve that, we build a universal TTS model based on 3,000 hours of data.

00:13.440 --> 00:23.680
<Speaker 1>We actually accumulated tons of the data so that this universal model is able to capture the nuance of the audio and generate a more natural voice for the algorithm.

00:24.040 --> 00:29.120
<Speaker 3>What we liked about cognitive services offerings were that they had a much higher fidelity.

00:29.600 --> 00:32.880
<Speaker 3>And they sounded a lot more like an actual human voice.

00:33.680 --> 00:37.200
<Speaker 4>Orlando ground 9555 requesting the end of pushback.

00:38.680 --> 00:41.280
<Speaker 4>9555 request to end pushback received.


Key Frames
- 00:00.733 ![](keyFrame.733.jpg)
- 00:02.067 ![](keyFrame.2067.jpg)
- 00:02.667 ![](keyFrame.2667.jpg)
- 00:04.067 ![](keyFrame.4067.jpg)
- 00:04.900 ![](keyFrame.4900.jpg)
- 00:05.733 ![](keyFrame.5733.jpg)
- 00:06.567 ![](keyFrame.6567.jpg)
- 00:07.800 ![](keyFrame.7800.jpg)
- 00:09.000 ![](keyFrame.9000.jpg)
- 00:09.800 ![](keyFrame.9800.jpg)
- 00:10.600 ![](keyFrame.10600.jpg)
- 00:12.100 ![](keyFrame.12100.jpg)
- 00:12.833 ![](keyFrame.12833.jpg)
- 00:14.200 ![](keyFrame.14200.jpg)
- 00:14.833 ![](keyFrame.14833.jpg)
- 00:15.467 ![](keyFrame.15467.jpg)
- 00:16.933 ![](keyFrame.16933.jpg)
- 00:17.767 ![](keyFrame.17767.jpg)
- 00:18.600 ![](keyFrame.18600.jpg)
- 00:20.167 ![](keyFrame.20167.jpg)
- 00:20.900 ![](keyFrame.20900.jpg)
- 00:21.633 ![](keyFrame.21633.jpg)
- 00:22.367 ![](keyFrame.22367.jpg)
- 00:23.100 ![](keyFrame.23100.jpg)
- 00:24.833 ![](keyFrame.24833.jpg)
- 00:25.700 ![](keyFrame.25700.jpg)
- 00:26.567 ![](keyFrame.26567.jpg)
- 00:27.433 ![](keyFrame.27433.jpg)
- 00:28.300 ![](keyFrame.28300.jpg)
- 00:29.167 ![](keyFrame.29167.jpg)
- 00:30.833 ![](keyFrame.30833.jpg)
- 00:31.633 ![](keyFrame.31633.jpg)
- 00:32.433 ![](keyFrame.32433.jpg)
- 00:33.900 ![](keyFrame.33900.jpg)
- 00:34.600 ![](keyFrame.34600.jpg)
- 00:36.067 ![](keyFrame.36067.jpg)
- 00:36.867 ![](keyFrame.36867.jpg)
- 00:38.200 ![](keyFrame.38200.jpg)
- 00:38.700 ![](keyFrame.38700.jpg)
- 00:39.900 ![](keyFrame.39900.jpg)
- 00:40.600 ![](keyFrame.40600.jpg)
- 00:41.300 ![](keyFrame.41300.jpg)
- 00:42.633 ![](keyFrame.42633.jpg)
- 00:43.233 ![](keyFrame.43233.jpg)
Summary: The video opens with a scenic aerial view of an island and a small plane flying, accompanied by the Flight Simulator and Microsoft Azure AI logos. It then transitions to a person speaking about the importance of good data for neural text-to-speech (TTS) technology, mentioning the creation of a universal TTS model trained on 3,000 hours of data to capture audio nuances and generate natural voices. Visuals include audio waveform displays and shots of data centers, emphasizing the technology's backend. The speaker praises the high fidelity and human-like quality of cognitive services' voice offerings. The segment concludes with realistic flight simulation visuals showing planes on the runway and ground crew, alongside simulated air traffic control communications.
Start: 733 ms, End: 43233 ms
Frame size: 1080 x 608
```
> **Note:**
> This code is based on the [analyzeUrl.ts](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/contentunderstanding/ai-content-understanding/samples/v1/typescript/src/analyzeUrl.ts) sample in the SDK repository.






## Next steps

- Explore more [Python SDK samples](https://github.com/Azure/azure-sdk-for-python/tree/main/sdk/contentunderstanding/azure-ai-contentunderstanding/samples)
- Explore more [.NET SDK samples](https://github.com/Azure/azure-sdk-for-net/tree/main/sdk/contentunderstanding/Azure.AI.ContentUnderstanding/samples)
- Explore more [Java SDK samples](https://github.com/Azure/azure-sdk-for-java/tree/main/sdk/contentunderstanding/azure-ai-contentunderstanding/src/samples/java/com/azure/ai/contentunderstanding)
- Explore more [JavaScript SDK samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/contentunderstanding/ai-content-understanding/samples/v1/javascript)
- Explore more [TypeScript SDK samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/contentunderstanding/ai-content-understanding/samples/v1/typescript)
- [Create a custom analyzer](../tutorial/create-custom-analyzer.md)
- [Prebuilt analyzers](../concepts/prebuilt-analyzers.md)
- [Language and region support](../language-region-support.md)
