---
author: laujan
ms.author: lajanuar
manager: mcleans
ms.date: 05/08/2026
ms.service: azure-language-foundry-tools
ms.topic: include
ms.custom:
  - ignite-2024
  - build-2025
---
[Reference documentation](https://go.microsoft.com/fwlink/?linkid=2239169)

Use this quickstart to send language detection requests using the REST API. In the following example, you use cURL to identify medical [entities](../../concepts/health-entity-categories.md), [relations](../../concepts/relation-extraction.md), and [assertions](../../concepts/assertion-detection.md) that appear in text.


## Prerequisites

* The current version of [cURL](https://curl.haxx.se/)
* An Azure subscription - [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
* Once you have your Azure subscription, [create a Foundry resource](../../../../multi-service-resource.md?pivots=azportal).
    * You need the key and endpoint from the resource you create to connect your application to the API. You paste your key and endpoint into the code later in the quickstart.
    * You can use the free pricing tier (`Free F0`) to try the service (providing 5,000 text records - 1,000 characters each) and upgrade later to the `Standard S` pricing tier for production. You can also start with the `Standard S` pricing tier, receiving the same initial quota for free (5,000 text records) before getting charged. For more information on pricing, visit [Language Pricing](https://azure.microsoft.com/pricing/details/cognitive-services/language-service/).

> **Note:**
> * The following BASH examples use the `\` line continuation character. If your console or terminal uses a different line continuation character, use that character.
> * You can find language specific samples on [GitHub](https://github.com/Azure-Samples/cognitive-services-quickstart-code).
> * Go to the Azure portal and find the key and endpoint for Azure Language resource you created in the prerequisites. They are located on the resource's **key and endpoint** page, under **resource management**. Then replace the strings in the code below with your key and endpoint.
To call the API, you need the following information:

## Setting up

### Create environment variables 

Your application must be authenticated to send API requests. For production, use a secure way of storing and accessing your credentials. In this example, you will write your credentials to environment variables on the local machine running the application.

To set the environment variable for your Language resource key, open a console window, and follow the instructions for your operating system and development environment. 

- To set the `LANGUAGE_KEY` environment variable, replace `your-key` with one of the keys for your resource.
- To set the `LANGUAGE_ENDPOINT` environment variable, replace `your-endpoint` with the endpoint for your resource.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/language-service/text-analytics-for-health/includes/quickstarts/rest-api.md)

#### [Windows](#tab/windows)

```console
setx LANGUAGE_KEY your-key
```

```console
setx LANGUAGE_ENDPOINT your-endpoint
```

> **Note:**
> If you only need to access the environment variables in the current running console, you can set the environment variable with `set` instead of `setx`.

After you add the environment variables, you might need to restart any running programs that will need to read the environment variables, including the console window. For example, if you're using Visual Studio as your editor, restart Visual Studio before running the example.

#### [Linux](#tab/linux)

```bash
export LANGUAGE_KEY=your-key
```

```bash
export LANGUAGE_ENDPOINT=your-endpoint
```

After you add the environment variables, run `source ~/.bashrc` from your console window to make the changes effective.

#### [macOS](#tab/macos)

##### Bash

```bash
export LANGUAGE_KEY=your-key
```

```bash
export LANGUAGE_ENDPOINT=your-endpoint
```

After you add the environment variables, run `source ~/.bash_profile` from your console window to make the changes effective.

##### Xcode

For iOS and macOS development, you set the environment variables in Xcode. For example, follow these steps to set the environment variable in Xcode 13.4.1.

1. Select **Product** > **Scheme** > **Edit scheme**
1. Select **Arguments** on the **Run** (Debug Run) page
1. Under **Environment Variables** select the plus (+) sign to add a new environment variable. 
1. Enter `LANGUAGE_KEY` for the **Name** and enter your Language resource key for the **Value**.
1. Perform these steps for your resource endpoint. Name the new environment variable `LANGUAGE_ENDPOINT`.

For more configuration options, see the [Xcode documentation](https://help.apple.com/xcode/#/dev745c5c974).

---




| parameter | Description |
| --- | --- |
| `-X POST <endpoint>` | Specifies your endpoint for accessing the API. |
| `-H Content-Type: application/json` | The content type for sending JSON data. |
| `-H "Ocp-Apim-Subscription-Key:<key>` | Specifies the key for accessing the API. |
| `-d <documents>` | The JSON containing the documents you want to send. |

The following cURL commands are executed from a BASH shell. Edit these commands with your own resource name, resource key, and JSON values.




## Text Analytics for health

1. Copy the command into a text editor.
2. Make the following changes in the command where needed:
    1. Replace the value `<your-language-resource-key>` with your key.
    2. Replace the first part of the request URL `<your-language-resource-endpoint>` with your endpoint URL.
3. Open a command prompt window.
4. Paste the command from the text editor into the command prompt window, and then run the command.


```bash
curl -i -X POST $LANGUAGE_ENDPOINT/language/analyze-text/jobs?api-version=2022-05-15-preview \
-H "Content-Type: application/json" \
-H "Ocp-Apim-Subscription-Key: $LANGUAGE_KEY" \
-d '{"analysisInput":{"documents": [{"text": "The doctor prescried 200mg Ibuprofen.","language": "en","id": "1"}]},"tasks":[{"taskId": "analyze 1","kind": "Healthcare","parameters": {"fhirVersion": "4.0.1"}}]}'
```

Get the `operation-location` from the response header. The value will look similar to the following URL:

```rest
https://your-resource.cognitiveservices.azure.com/language/analyze-text/jobs/{JOB-ID}?api-version=2022-05-15-preview
```

To get the results of the request, use the following cURL command. Be sure to replace `{JOB-ID}` with the numerical ID value you received from the previous `operation-location` response header:

```bash
curl -X GET  $LANGUAGE_ENDPOINT/language/analyze-text/jobs/{JOB-ID}?api-version=2022-05-15-preview \
-H "Content-Type: application/json" \
-H "Ocp-Apim-Subscription-Key: $LANGUAGE_KEY"
```



### JSON response

```json
{
    "jobId": "{JOB-ID}",
    "lastUpdatedDateTime": "2022-06-27T22:04:39Z",
    "createdDateTime": "2022-06-27T22:04:38Z",
    "expirationDateTime": "2022-06-28T22:04:38Z",
    "status": "succeeded",
    "errors": [],
    "tasks": {
        "completed": 1,
        "failed": 0,
        "inProgress": 0,
        "total": 1,
        "items": [
            {
                "kind": "HealthcareLROResults",
                "lastUpdateDateTime": "2022-06-27T22:04:39.7086762Z",
                "status": "succeeded",
                "results": {
                    "documents": [
                        {
                            "id": "1",
                            "entities": [
                                {
                                    "offset": 4,
                                    "length": 6,
                                    "text": "doctor",
                                    "category": "HealthcareProfession",
                                    "confidenceScore": 0.76
                                },
                                {
                                    "offset": 21,
                                    "length": 5,
                                    "text": "200mg",
                                    "category": "Dosage",
                                    "confidenceScore": 0.99
                                },
                                {
                                    "offset": 27,
                                    "length": 9,
                                    "text": "Ibuprofen",
                                    "category": "MedicationName",
                                    "confidenceScore": 1.0,
                                    "name": "ibuprofen",
                                    "links": [
                                        {
                                            "dataSource": "UMLS",
                                            "id": "C0020740"
                                        },
                                        {
                                            "dataSource": "AOD",
                                            "id": "0000019879"
                                        },
                                        {
                                            "dataSource": "ATC",
                                            "id": "M01AE01"
                                        },
                                        {
                                            "dataSource": "CCPSS",
                                            "id": "0046165"
                                        },
                                        {
                                            "dataSource": "CHV",
                                            "id": "0000006519"
                                        },
                                        {
                                            "dataSource": "CSP",
                                            "id": "2270-2077"
                                        },
                                        {
                                            "dataSource": "DRUGBANK",
                                            "id": "DB01050"
                                        },
                                        {
                                            "dataSource": "GS",
                                            "id": "1611"
                                        },
                                        {
                                            "dataSource": "LCH_NW",
                                            "id": "sh97005926"
                                        },
                                        {
                                            "dataSource": "LNC",
                                            "id": "LP16165-0"
                                        },
                                        {
                                            "dataSource": "MEDCIN",
                                            "id": "40458"
                                        },
                                        {
                                            "dataSource": "MMSL",
                                            "id": "d00015"
                                        },
                                        {
                                            "dataSource": "MSH",
                                            "id": "D007052"
                                        },
                                        {
                                            "dataSource": "MTHSPL",
                                            "id": "WK2XYI10QM"
                                        },
                                        {
                                            "dataSource": "NCI",
                                            "id": "C561"
                                        },
                                        {
                                            "dataSource": "NCI_CTRP",
                                            "id": "C561"
                                        },
                                        {
                                            "dataSource": "NCI_DCP",
                                            "id": "00803"
                                        },
                                        {
                                            "dataSource": "NCI_DTP",
                                            "id": "NSC0256857"
                                        },
                                        {
                                            "dataSource": "NCI_FDA",
                                            "id": "WK2XYI10QM"
                                        },
                                        {
                                            "dataSource": "NCI_NCI-GLOSS",
                                            "id": "CDR0000613511"
                                        },
                                        {
                                            "dataSource": "NDDF",
                                            "id": "002377"
                                        },
                                        {
                                            "dataSource": "PDQ",
                                            "id": "CDR0000040475"
                                        },
                                        {
                                            "dataSource": "RCD",
                                            "id": "x02MO"
                                        },
                                        {
                                            "dataSource": "RXNORM",
                                            "id": "5640"
                                        },
                                        {
                                            "dataSource": "SNM",
                                            "id": "E-7772"
                                        },
                                        {
                                            "dataSource": "SNMI",
                                            "id": "C-603C0"
                                        },
                                        {
                                            "dataSource": "SNOMEDCT_US",
                                            "id": "387207008"
                                        },
                                        {
                                            "dataSource": "USP",
                                            "id": "m39860"
                                        },
                                        {
                                            "dataSource": "USPMG",
                                            "id": "MTHU000060"
                                        },
                                        {
                                            "dataSource": "VANDF",
                                            "id": "4017840"
                                        }
                                    ]
                                }
                            ],
                            "relations": [
                                {
                                    "relationType": "DosageOfMedication",
                                    "entities": [
                                        {
                                            "ref": "#/results/documents/0/entities/1",
                                            "role": "Dosage"
                                        },
                                        {
                                            "ref": "#/results/documents/0/entities/2",
                                            "role": "Medication"
                                        }
                                    ]
                                }
                            ],
                            "warnings": [],
                            "fhirBundle": {
                                "resourceType": "Bundle",
                                "id": "95d61191-402a-48c6-9657-a1e4efbda877",
                                "meta": {
                                    "profile": [
                                        "http://hl7.org/fhir/4.0.1/StructureDefinition/Bundle"
                                    ]
                                },
                                "identifier": {
                                    "system": "urn:ietf:rfc:3986",
                                    "value": "urn:uuid:95d61191-402a-48c6-9657-a1e4efbda877"
                                },
                                "type": "document",
                                "entry": [
                                    {
                                        "fullUrl": "Composition/34b666d3-45e7-474d-a398-d3b0329541ad",
                                        "resource": {
                                            "resourceType": "Composition",
                                            "id": "34b666d3-45e7-474d-a398-d3b0329541ad",
                                            "status": "final",
                                            "type": {
                                                "coding": [
                                                    {
                                                        "system": "http://loinc.org",
                                                        "code": "11526-1",
                                                        "display": "Pathology study"
                                                    }
                                                ],
                                                "text": "Pathology study"
                                            },
                                            "subject": {
                                                "reference": "Patient/68dd21ce-58ae-4e59-9445-8331f99899ed",
                                                "type": "Patient"
                                            },
                                            "encounter": {
                                                "reference": "Encounter/90c75fea-4526-4e94-82f8-8df3bc983a14",
                                                "type": "Encounter",
                                                "display": "unknown"
                                            },
                                            "date": "2022-06-27",
                                            "author": [
                                                {
                                                    "reference": "Practitioner/a8ef1526-d4ce-41df-96df-e9d03428c840",
                                                    "type": "Practitioner",
                                                    "display": "Unknown"
                                                }
                                            ],
                                            "title": "Pathology study",
                                            "section": [
                                                {
                                                    "title": "General",
                                                    "code": {
                                                        "coding": [
                                                            {
                                                                "system": "",
                                                                "display": "Unrecognized Section"
                                                            }
                                                        ],
                                                        "text": "General"
                                                    },
                                                    "text": {
                                                        "div": "<div>\r\n\t\t\t\t\t\t\t<h1>General</h1>\r\n\t\t\t\t\t\t\t<p>The doctor prescried 200mg Ibuprofen.</p>\r\n\t\t\t\t\t</div>"
                                                    },
                                                    "entry": [
                                                        {
                                                            "reference": "List/c8ca6757-1d7c-4c49-94e9-ef5263cb943c",
                                                            "type": "List",
                                                            "display": "General"
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        "fullUrl": "Practitioner/a8ef1526-d4ce-41df-96df-e9d03428c840",
                                        "resource": {
                                            "resourceType": "Practitioner",
                                            "id": "a8ef1526-d4ce-41df-96df-e9d03428c840",
                                            "extension": [
                                                {
                                                    "extension": [
                                                        {
                                                            "url": "offset",
                                                            "valueInteger": -1
                                                        },
                                                        {
                                                            "url": "length",
                                                            "valueInteger": 7
                                                        }
                                                    ],
                                                    "url": "http://hl7.org/fhir/StructureDefinition/derivation-reference"
                                                }
                                            ],
                                            "name": [
                                                {
                                                    "text": "Unknown",
                                                    "family": "Unknown"
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        "fullUrl": "Patient/68dd21ce-58ae-4e59-9445-8331f99899ed",
                                        "resource": {
                                            "resourceType": "Patient",
                                            "id": "68dd21ce-58ae-4e59-9445-8331f99899ed",
                                            "gender": "unknown"
                                        }
                                    },
                                    {
                                        "fullUrl": "Encounter/90c75fea-4526-4e94-82f8-8df3bc983a14",
                                        "resource": {
                                            "resourceType": "Encounter",
                                            "id": "90c75fea-4526-4e94-82f8-8df3bc983a14",
                                            "meta": {
                                                "profile": [
                                                    "http://hl7.org/fhir/us/core/StructureDefinition/us-core-encounter"
                                                ]
                                            },
                                            "status": "finished",
                                            "class": {
                                                "system": "http://terminology.hl7.org/CodeSystem/v3-ActCode",
                                                "display": "unknown"
                                            },
                                            "subject": {
                                                "reference": "Patient/68dd21ce-58ae-4e59-9445-8331f99899ed",
                                                "type": "Patient"
                                            }
                                        }
                                    },
                                    {
                                        "fullUrl": "MedicationStatement/17aeee32-1189-47fc-9223-8abe174f1292",
                                        "resource": {
                                            "resourceType": "MedicationStatement",
                                            "id": "17aeee32-1189-47fc-9223-8abe174f1292",
                                            "extension": [
                                                {
                                                    "extension": [
                                                        {
                                                            "url": "offset",
                                                            "valueInteger": 27
                                                        },
                                                        {
                                                            "url": "length",
                                                            "valueInteger": 9
                                                        }
                                                    ],
                                                    "url": "http://hl7.org/fhir/StructureDefinition/derivation-reference"
                                                }
                                            ],
                                            "status": "active",
                                            "medicationCodeableConcept": {
                                                "coding": [
                                                    {
                                                        "system": "http://www.nlm.nih.gov/research/umls",
                                                        "code": "C0020740",
                                                        "display": "ibuprofen"
                                                    },
                                                    {
                                                        "system": "http://www.nlm.nih.gov/research/umls/aod",
                                                        "code": "0000019879"
                                                    },
                                                    {
                                                        "system": "http://www.whocc.no/atc",
                                                        "code": "M01AE01"
                                                    },
                                                    {
                                                        "system": "http://www.nlm.nih.gov/research/umls/ccpss",
                                                        "code": "0046165"
                                                    },
                                                    {
                                                        "system": "http://www.nlm.nih.gov/research/umls/chv",
                                                        "code": "0000006519"
                                                    },
                                                    {
                                                        "system": "http://www.nlm.nih.gov/research/umls/csp",
                                                        "code": "2270-2077"
                                                    },
                                                    {
                                                        "system": "http://www.nlm.nih.gov/research/umls/drugbank",
                                                        "code": "DB01050"
                                                    },
                                                    {
                                                        "system": "http://www.nlm.nih.gov/research/umls/gs",
                                                        "code": "1611"
                                                    },
                                                    {
                                                        "system": "http://www.nlm.nih.gov/research/umls/lch_nw",
                                                        "code": "sh97005926"
                                                    },
                                                    {
                                                        "system": "http://loinc.org",
                                                        "code": "LP16165-0"
                                                    },
                                                    {
                                                        "system": "http://www.nlm.nih.gov/research/umls/medcin",
                                                        "code": "40458"
                                                    },
                                                    {
                                                        "system": "http://www.nlm.nih.gov/research/umls/mmsl",
                                                        "code": "d00015"
                                                    },
                                                    {
                                                        "system": "http://www.nlm.nih.gov/research/umls/msh",
                                                        "code": "D007052"
                                                    },
                                                    {
                                                        "system": "http://www.nlm.nih.gov/research/umls/mthspl",
                                                        "code": "WK2XYI10QM"
                                                    },
                                                    {
                                                        "system": "http://ncimeta.nci.nih.gov",
                                                        "code": "C561"
                                                    },
                                                    {
                                                        "system": "http://www.nlm.nih.gov/research/umls/nci_ctrp",
                                                        "code": "C561"
                                                    },
                                                    {
                                                        "system": "http://www.nlm.nih.gov/research/umls/nci_dcp",
                                                        "code": "00803"
                                                    },
                                                    {
                                                        "system": "http://www.nlm.nih.gov/research/umls/nci_dtp",
                                                        "code": "NSC0256857"
                                                    },
                                                    {
                                                        "system": "http://www.nlm.nih.gov/research/umls/nci_fda",
                                                        "code": "WK2XYI10QM"
                                                    },
                                                    {
                                                        "system": "http://www.nlm.nih.gov/research/umls/nci_nci-gloss",
                                                        "code": "CDR0000613511"
                                                    },
                                                    {
                                                        "system": "http://www.nlm.nih.gov/research/umls/nddf",
                                                        "code": "002377"
                                                    },
                                                    {
                                                        "system": "http://www.nlm.nih.gov/research/umls/pdq",
                                                        "code": "CDR0000040475"
                                                    },
                                                    {
                                                        "system": "http://www.nlm.nih.gov/research/umls/rcd",
                                                        "code": "x02MO"
                                                    },
                                                    {
                                                        "system": "http://www.nlm.nih.gov/research/umls/rxnorm",
                                                        "code": "5640"
                                                    },
                                                    {
                                                        "system": "http://snomed.info/sct",
                                                        "code": "E-7772"
                                                    },
                                                    {
                                                        "system": "http://snomed.info/sct/900000000000207008",
                                                        "code": "C-603C0"
                                                    },
                                                    {
                                                        "system": "http://snomed.info/sct/731000124108",
                                                        "code": "387207008"
                                                    },
                                                    {
                                                        "system": "http://www.nlm.nih.gov/research/umls/usp",
                                                        "code": "m39860"
                                                    },
                                                    {
                                                        "system": "http://www.nlm.nih.gov/research/umls/uspmg",
                                                        "code": "MTHU000060"
                                                    },
                                                    {
                                                        "system": "http://hl7.org/fhir/ndfrt",
                                                        "code": "4017840"
                                                    }
                                                ],
                                                "text": "Ibuprofen"
                                            },
                                            "subject": {
                                                "reference": "Patient/68dd21ce-58ae-4e59-9445-8331f99899ed",
                                                "type": "Patient"
                                            },
                                            "context": {
                                                "reference": "Encounter/90c75fea-4526-4e94-82f8-8df3bc983a14",
                                                "type": "Encounter",
                                                "display": "unknown"
                                            },
                                            "dosage": [
                                                {
                                                    "text": "200mg",
                                                    "doseAndRate": [
                                                        {
                                                            "doseQuantity": {
                                                                "value": 200
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        "fullUrl": "List/c8ca6757-1d7c-4c49-94e9-ef5263cb943c",
                                        "resource": {
                                            "resourceType": "List",
                                            "id": "c8ca6757-1d7c-4c49-94e9-ef5263cb943c",
                                            "status": "current",
                                            "mode": "snapshot",
                                            "title": "General",
                                            "subject": {
                                                "reference": "Patient/68dd21ce-58ae-4e59-9445-8331f99899ed",
                                                "type": "Patient"
                                            },
                                            "encounter": {
                                                "reference": "Encounter/90c75fea-4526-4e94-82f8-8df3bc983a14",
                                                "type": "Encounter",
                                                "display": "unknown"
                                            },
                                            "entry": [
                                                {
                                                    "item": {
                                                        "reference": "MedicationStatement/17aeee32-1189-47fc-9223-8abe174f1292",
                                                        "type": "MedicationStatement",
                                                        "display": "Ibuprofen"
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    ],
                    "errors": [],
                    "modelVersion": "2022-03-01"
                }
            }
        ]
    }
}
```



> **Tip:**
> Fast Healthcare Interoperability Resources (FHIR) structuring is available using Azure Language REST API. The client libraries are not currently supported. [Learn more](../../how-to/call-api.md) on how to use FHIR structuring in your API call.
