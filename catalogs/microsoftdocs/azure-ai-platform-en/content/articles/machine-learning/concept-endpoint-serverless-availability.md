---
title: Region availability for models in standard deployments
titleSuffix: Azure Machine Learning
description: Learn about the regions where each model is available for deployment in standard deployments.
ms.service: azure-machine-learning
ms.subservice: inferencing
ms.topic: reference
ms.date: 03/23/2026
ms.reviewer: jturuk
ms.author: scottpolly
author: s-polly
ms.collection: ce-skilling-ai-copilot 
ms.custom: 
 - build-2024
 - serverless
 - references_regions
---

# Region availability for models in standard deployments

In this article, you learn about which regions are available for each of the models supporting standard deployments.

You can deploy certain models in the model catalog as a standard deployment. This kind of deployment provides a way to consume models as an API without hosting them on your subscription, while keeping the enterprise security and compliance that organizations need. This deployment option doesn't require quota from your subscription.

> **Note:**
> Standard deployments are one of several serverless deployment types available in Microsoft Foundry. For information about all deployment types, including Global Standard and Data Zone options, see [Deployment types for Microsoft Foundry Models](../foundry/foundry-models/concepts/deployment-types.md).

## Region availability

Model providers make standard deployments available only to users whose Azure subscription belongs to a billing account in a country/region where the model provider makes the offer available (see "offer availability region" in the table in the next section). If the offer is available in the relevant region, the user must have a Hub/Project in the Azure region where the model is available for deployment or fine-tuning, as applicable (see "Hub/Project Region" columns in the following tables).





### Cohere models

| Model | Offer Availability Region | Hub/Project Region for Deployment | Hub/Project Region for Fine tuning |
| --- | --- | --- | --- |
| Cohere Command R+ 08-2024 | [Microsoft Managed Countries/Regions](https://learn.microsoft.com/partner-center/marketplace/tax-details-marketplace#microsoft-managed-countriesregions) | East US <br> East US 2 <br> North Central US <br> South Central US <br> Sweden Central <br> West US <br> West US 3 | Not available |
| Cohere Command R 08-2024 | [Microsoft Managed Countries/Regions](https://learn.microsoft.com/partner-center/marketplace/tax-details-marketplace#microsoft-managed-countriesregions) | East US <br> East US 2 <br> North Central US <br> South Central US <br> Sweden Central <br> West US <br> West US 3 | Not available |
| Cohere Rerank v3.5 | [Microsoft Managed Countries/Regions](https://learn.microsoft.com/partner-center/marketplace/tax-details-marketplace#microsoft-managed-countriesregions) <br> Japan <br> Israel <br> Qatar | East US <br> East US 2 <br> North Central US <br> South Central US <br> Sweden Central <br> West US <br> West US 3 | Not available |
| Cohere Embed v3 - English | [Microsoft Managed Countries/Regions](https://learn.microsoft.com/partner-center/marketplace/tax-details-marketplace#microsoft-managed-countriesregions) <br> Japan <br> Qatar | East US <br> East US 2 <br> North Central US <br> South Central US <br> Sweden Central <br> West US <br> West US 3 | Not available |
| Cohere Embed v3 -  Multilingual | [Microsoft Managed Countries/Regions](https://learn.microsoft.com/partner-center/marketplace/tax-details-marketplace#microsoft-managed-countriesregions) <br> Japan <br> Qatar | East US <br> East US 2 <br> North Central US <br> South Central US <br> Sweden Central <br> West US <br> West US 3 | Not available |

### DeepSeek models from Microsoft

| Model | Offer Availability Region | Hub/Project Region for Deployment | Hub/Project Region for Fine tuning |
| --- | --- | --- | --- |
| DeepSeek-V3-0324 | Not applicable | East US <br> East US 2 <br> North Central US <br> South Central US <br> West US <br> West US 3 | Not available |
| DeepSeek-R1 | Not applicable | East US <br> East US 2 <br> North Central US <br> South Central US <br> West US <br> West US 3 | Not available |


### Meta Llama models

| Model | Offer Availability Region | Hub/Project Region for Deployment | Hub/Project Region for Fine tuning |
| --- | --- | --- | --- |
| Llama 3.1 405B Instruct | [Microsoft Managed Countries/Regions](https://learn.microsoft.com/partner-center/marketplace/tax-details-marketplace#microsoft-managed-countriesregions) | East US <br> East US 2 <br> North Central US <br> South Central US <br> West US <br> West US 3 | Not available |
| Llama-3.2-1B-Instruct <br> Llama-3.2-3B-Instruct <br> Llama-3.3-70B-Instruct <br> Llama-Guard-3-11B-Vision <br> Llama-Guard-3-1B <br> Llama-3.2-3B <br> Llama-3.2-1B | [Microsoft Managed Countries/Regions](https://learn.microsoft.com/partner-center/marketplace/tax-details-marketplace#microsoft-managed-countriesregions) | East US <br> East US 2 <br> North Central US <br> South Central US <br> Sweden Central <br> West US <br> West US 3 | Not available |
| Llama 3.1 8B Instruct <br> Llama-3.2-11B-Vision-Instruct<br> Llama-3.2-90B-Vision-Instruct <br> Llama 3.3 70B Instruct | [Microsoft Managed Countries/Regions](https://learn.microsoft.com/partner-center/marketplace/tax-details-marketplace#microsoft-managed-countriesregions) | East US <br> East US 2 <br> North Central US <br> South Central US <br> West US <br> West US 3 <br> Sweden Central | West US 3 |


### Microsoft models

| Model | Offer Availability Region | Hub/Project Region for Deployment | Hub/Project Region for Fine tuning |
| --- | --- | --- | --- |
| MAI-DS-R1 | Not applicable | East US <br> East US 2 <br> North Central US <br> South Central US <br> West US <br> West US 3 | Not available |
| Phi-4-reasoning <br> Phi-4-mini-reasoning | Not applicable | East US <br> East US 2 <br> North Central US <br> South Central US <br> West US <br> West US 3 | Not available |
| Phi-4 <br>  Phi-4-mini-instruct <br>  Phi-4-multimodal-instruct | Not applicable | East US <br> East US 2 <br> North Central US <br> South Central US <br> Sweden Central <br> West US <br> West US 3 | East US 2 <br> East US <br> North Central US <br> South Central US <br> West US <br> West US 3 |


### Mistral models

| Model | Offer Availability Region | Hub/Project Region for Deployment | Hub/Project Region for Fine tuning |
| --- | --- | --- | --- |
| mistral-document-ai-2505 | [Microsoft Managed Countries/Regions](https://learn.microsoft.com/partner-center/marketplace/tax-details-marketplace#microsoft-managed-countriesregions) | East US 2 <br> Sweden Central | Not available |
| Codestral-2501 | [Microsoft Managed Countries/Regions](https://learn.microsoft.com/partner-center/marketplace/tax-details-marketplace#microsoft-managed-countriesregions)  <br> Brazil <br> Hong Kong SAR <br> Israel | East US <br> East US 2 <br> North Central US <br> South Central US <br> Sweden Central <br> West US <br> West US 3 | Not available |
| Mistral Small 25.03 | [Microsoft Managed Countries/Regions](https://learn.microsoft.com/partner-center/marketplace/tax-details-marketplace#microsoft-managed-countriesregions)   <br> Brazil <br> Hong Kong SAR <br> Israel | East US <br> East US 2 <br> North Central US <br> South Central US <br> Sweden Central <br> West US <br> West US 3 | Not available |
| Mistral Medium 3 (25.05) | [Microsoft Managed Countries/Regions](https://learn.microsoft.com/partner-center/marketplace/tax-details-marketplace#microsoft-managed-countriesregions)   <br> Brazil <br> Hong Kong SAR <br> Israel | East US <br> East US 2 <br> North Central US <br> South Central US <br> Sweden Central <br> West US <br> West US 3 | Not available |
| Ministral-3B | [Microsoft Managed Countries/Regions](https://learn.microsoft.com/partner-center/marketplace/tax-details-marketplace#microsoft-managed-countriesregions)  <br> Brazil <br> Hong Kong SAR<br> Israel | East US <br> East US 2 <br> North Central US <br> South Central US <br> Sweden Central <br> West US <br> West US 3 | East US 2 <br> East US <br> North Central US <br> South Central US <br> West US <br> West US 3 |



### Nixtla models

| Model | Offer Availability Region | Hub/Project Region for Deployment | Hub/Project Region for Fine tuning |
| --- | --- | --- | --- |
| TimeGEN-1 | [Microsoft Managed Countries/Regions](https://learn.microsoft.com/partner-center/marketplace/tax-details-marketplace#microsoft-managed-countriesregions)  <br> Mexico <br> Israel | East US <br> East US 2 <br> North Central US <br> South Central US <br> Sweden Central <br> West US <br> West US 3 | Not available |

### NTT DATA models

| Model | Offer Availability Region | Hub/Project Region for Deployment | Hub/Project Region for Fine tuning |
| --- | --- | --- | --- |
| tsuzumi-7b | [Microsoft Managed Countries/Regions](https://learn.microsoft.com/partner-center/marketplace/tax-details-marketplace#microsoft-managed-countriesregions) | East US 2 <br> South Central US <br> East US <br> West US 3 <br> West US <br> North Central US | East US 2 <br> East US <br> North Central US <br> South Central US <br> West US <br> West US 3 |


### Stability AI models

| Model | Offer Availability Region | Hub/Project Region for Deployment | Hub/Project Region for Fine tuning |
| --- | --- | --- | --- |
| Stable Diffusion 3.5 Large <br> Stable Image Core <br> Stable Image Ultra | [Microsoft Managed Countries/Regions](https://learn.microsoft.com/partner-center/marketplace/tax-details-marketplace#microsoft-managed-countriesregions) | East US <br> East US 2 <br> North Central US <br> South Central US <br> West US <br> West US 3 | Not available |



## Alternatives to region availability

If most of your infrastructure is in a particular region and you want to take advantage of models available only as standard deployments, you can create a workspace on the supported region and then consume the endpoint from another region. 

To learn how to configure an existing standard deployment in a different workspace than the one where it was deployed, see [Consume standard deployments from a different workspace](how-to-connect-models-serverless.md).

## Related content

- [Explore Microsoft Foundry Models in Azure Machine Learning](foundry-models-overview.md)
- [Deploy models as standard deployments](how-to-deploy-models-serverless.md).
