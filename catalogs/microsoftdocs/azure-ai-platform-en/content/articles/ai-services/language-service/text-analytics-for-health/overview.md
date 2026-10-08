---
title: What is Text analytics for health in Azure Language?
titleSuffix: Foundry Tools
description: An overview of Text analytics for health in Azure Language, which helps you extract medical information from unstructured text, like clinical documents.
#services: cognitive-services
author: laujan
manager: mcleans
ms.service: azure-language-foundry-tools
ms.topic: overview
ms.date: 03/30/2026
ms.author: lajanuar
ms.custom: language-service-health
---
<!-- markdownlint-disable MD025 -->
# What is Text analytics for health in Azure Language?

> **Important:** 
> Text Analytics for health is a capability provided “AS IS” and “WITH ALL FAULTS.” Text Analytics for health is not intended or made available for use as a medical device, clinical support, diagnostic tool, or other technology intended to be used in the diagnosis, cure, mitigation, treatment, or prevention of disease or other conditions, and no license or right is granted by Microsoft to use this capability for such purposes. This capability is not designed or intended to be implemented or deployed as a substitute for professional medical advice or healthcare opinion, diagnosis, treatment, or the clinical judgment of a healthcare professional, and should not be used as such. The customer is solely responsible for any use of Text Analytics for health. The customer must separately license any and all source vocabularies it intends to use under the terms set for that [UMLS Metathesaurus License Agreement Appendix](https://www.nlm.nih.gov/research/umls/knowledge_sources/metathesaurus/release/license_agreement_appendix.html) or any future equivalent link. The customer is responsible for ensuring compliance with those license terms, including any geographic or other applicable restrictions.
>
> Text Analytics for health now allows extraction of Social Determinants of Health (SDOH) and ethnicity mentions in text. This capability may not cover all potential SDOH and does not derive inferences based on SDOH or ethnicity (for example, substance use information is surfaced, but substance abuse is not inferred). All decisions leveraging outputs of the Text Analytics for health that impact individuals or resource allocation (including, but not limited to, those related to billing, human resources, or treatment managing care) should be made with human oversight and not be based solely on the findings of the model. The purpose of the SDOH and ethnicity extraction capability is to help providers improve health outcomes and it should not be used to stigmatize or draw negative inferences about the users or consumers of SDOH data, or patient populations beyond the stated purpose of helping providers improving health outcomes.  


Text analytics for health is an Azure Language prebuilt [core capability](../overview.md#core-capabilities). Text analytics for health uses machine learning to identify and label medical information in unstructured text such as doctor's notes, clinical documents, and electronic health records. It extracts key data from sources like discharge summaries to support healthcare analysis.

> **Tip:**
> Try out Text analytics for health [in Microsoft Foundry portal](https://ai.azure.com/). There you can [utilize a currently existing Language resource or create a new Foundry resource](../../connect-services-foundry-portal.md) in order to use this service.

This documentation contains the following types of articles:

* The [**quickstart article**](quickstart.md) provides a short tutorial that guides you with making your first request to the service.
* The [**how-to guides**](how-to/call-api.md) contain detailed instructions on how to make calls to the service using the hosted API or using the on-premises Docker container.
* The [**conceptual articles**](concepts/health-entity-categories.md) provide in-depth information on each of the service's features, named entity recognition, relation extraction, entity linking, and assertion detection.

## Text analytics for health features

Text analytics for health performs four key functions, all with a single API call:

* Named entity recognition
* Relation extraction
* Entity linking
* Assertion detection

# [Named Entity Recognition](#tab/ner)

Named entity recognition is used to perform a semantic extraction of words and phrases mentioned from unstructured text that are associated with any of the [supported entity types](concepts/health-entity-categories.md), such as diagnosis, medication name, symptom/sign, or age.

> 
> Text Analytics for health NER

# [Relation Extraction](#tab/relation-extraction)

Relation extraction is used to identify meaningful connections between concepts mentioned in text that are associated with any of the [supported relations](concepts/relation-extraction.md), such as the "time of condition" relation, which connects a condition name with a time. 

> 
> Text Analytics for health relation extraction


# [Entity Linking](#tab/entity-linking)

Entity linking is used to disambiguate the extracted entities by associating them with preferred names and codes from the biomedical vocabularies supported by the [Unified Medical Language System (UMLS) Metathesaurus](https://www.nlm.nih.gov/research/umls/sourcereleasedocs/index.html).

> 
> Text Analytics for health entity linking


# [Assertion Detection](#tab/assertion-detection) 

[Assertion detection](concepts/assertion-detection.md) is used to preserve the meaning of medical content by   adding contextual modifiers to the extracted entities using these categories: 
* Certainty
* Conditionality
* Association
* Temporality

> 
> Text Analytics for health negation

---


Text analytics for health can receive unstructured text in English, German, French, Italian, Spanish, Portuguese, and Hebrew.

Additionally, Text analytics for health can return the processed output using the Fast Healthcare Interoperability Resources (FHIR) structure that enables the service's integration with other electronic health systems.

> [!VIDEO https://learn.microsoft.com/Shows/AI-Show/Introducing-Text-Analytics-for-Health/player]

## Usage scenarios

Text analytics for health can be used in multiple scenarios across various industries.
Some common customer motivations for using Text analytics for health include:

* Assisting and automating the processing of medical documents by proper medical coding to ensure accurate care and billing.
* Increasing the efficiency of analyzing healthcare data to help drive the success of value-based care models similar to Medicare.
* Minimizing healthcare provider effort by automating the aggregation of key patient data for trend and pattern monitoring.
* Facilitating and supporting the adoption of HL7 standards across the healthcare industry. By doing so, we help improve the exchange, integration, sharing, retrieval, and delivery of electronic health information in all areas of healthcare services.

### Example use cases: 

| Use case | Description |
| --- | --- |
| Extract insights and statistics | Identify medical entities such as symptoms, medications, diagnosis from clinical and research documents in order to extract insights and statistics for different patient cohorts. |
| Develop predictive models using historic data | Power solutions for planning, decision support, risk analysis and more, based on prediction models created from historic data. |
| Annotate and curate medical information | Support solutions for clinical data annotation and curation such as automating clinical coding and digitizing manually created data. |
| Review and report medical information | Potential medical information errors found during quality assurance reviews. |
| Assist with decision support | Enable solutions that provide humans with assistive information relating to patients' medical information for faster and more reliable decisions. |

## Get started with Text analytics for health

To use Text Analytics for health, you submit raw unstructured text for analysis and handle the API output in your application. Analysis is performed as-is, with no additional customization to the model used on your data. There are two ways to use Text Analytics for health:


| Development option | Description |
| --- | --- |
| Microsoft Foundry | Foundry is a web-based platform that lets you use entity linking with text examples with your own data when you sign up. For more information, see the [Foundry website](https://ai.azure.com/?cid=learnDocs) or [Foundry documentation](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-foundry/what-is-foundry.md). |
| REST API or Client library (Azure SDK) | Integrate Text Analytics for health into your applications using the REST API, or the client library available in a variety of languages. For more information, see the [Text Analytics for health quickstart](quickstart.md). |
| Docker container | Use the available Docker container to [deploy this feature on-premises](how-to/use-containers.md). These docker containers enable you to bring the service closer to your data for compliance, security, or other operational reasons. |


## Input requirements and service limits

Text analytics for health is designed to receive unstructured text for analysis. For more information, see [data and service limits](../concepts/data-limits.md).

Text analytics for health works with various input languages. For more information,  see [language support](language-support.md).

## Reference documentation and code samples

As you use this feature in your applications, see the following reference documentation and samples for Azure Language in Foundry Tools:

| Development option / language | Reference documentation | Samples |
| --- | --- | --- |
| REST API | [REST API documentation](https://learn.microsoft.com/rest/api/language/) |  |
| C# | [C# documentation](https://learn.microsoft.com/dotnet/api/azure.ai.textanalytics?view=azure-dotnet-preview\&preserve-view=true) | [C# samples](https://github.com/Azure/azure-sdk-for-net/tree/master/sdk/textanalytics/Azure.AI.TextAnalytics/samples) |
| Java | [Java documentation](https://learn.microsoft.com/java/api/overview/azure/ai-textanalytics-readme?view=azure-java-preview\&preserve-view=true) | [Java Samples](https://github.com/Azure/azure-sdk-for-java/tree/main/sdk/textanalytics/azure-ai-textanalytics/src/samples) |
| JavaScript | [JavaScript documentation](https://learn.microsoft.com/javascript/api/overview/azure/ai-language-text-readme) | [JavaScript samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/cognitivelanguage/ai-language-text/samples/v1) |
| Python | [Python documentation](https://learn.microsoft.com/python/api/overview/azure/ai-textanalytics-readme?view=azure-python-preview\&preserve-view=true) | [Python samples](https://github.com/Azure/azure-sdk-for-python/tree/main/sdk/textanalytics/azure-ai-textanalytics/samples) |


## Responsible use of AI

An AI system includes the technology, the individuals who operate the system, the people who experience its effects, and the broader environment where the system functions all play a role. Read the [transparency note for Text analytics for health](https://learn.microsoft.com/azure/ai-foundry/responsible-ai/language-service/transparency-note-health) to learn about responsible AI use and deployment in your systems.

* [Transparency note for Azure Language in Foundry Tools](https://learn.microsoft.com/azure/ai-foundry/responsible-ai/language-service/transparency-note)
* [Integration and responsible use](https://learn.microsoft.com/azure/ai-foundry/responsible-ai/language-service/guidance-integration-responsible-use)
* [Data, privacy, and security](https://learn.microsoft.com/azure/ai-foundry/responsible-ai/language-service/data-privacy)
