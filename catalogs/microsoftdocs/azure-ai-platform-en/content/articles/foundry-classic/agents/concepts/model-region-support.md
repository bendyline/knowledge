---
title: "Azure OpenAI models and regions for Foundry Agent Service (classic)"
description: "Find supported Azure OpenAI models and regions for Microsoft Foundry Agent Service. Compare gpt-5, gpt-4o, and gpt-4 availability across global and regional deployments. (classic)"
manager: mcleans
author: aahill
ms.author: aahi
ms.service: microsoft-foundry
ms.subservice: foundry-agent-service
ms.topic: concept-article
ms.date: 04/15/2026
ms.custom: azure-ai-agents, references_regions, pilot-ai-workflow-jan-2026
ai-usage: ai-assisted
---

# Azure OpenAI models and regions for Foundry Agent Service (classic)


> **Note:** 
> This document refers to the Microsoft Foundry (classic) portal.
> 
> Agents (classic) are now deprecated and will be retired on March 31, 2027. Use the new agents in the generally available [Microsoft Foundry Agents Service](../../../foundry/agents/overview.md). Follow the [migration guide](../../../foundry/agents/how-to/migrate.md) to update your workloads.

Azure OpenAI models power agents in Foundry Agent Service. To use these models, you need a [Microsoft Foundry project](../../what-is-foundry.md) with access to Agent Service. Use the tabs to find a supported model, deployment type, and region combination. For details on deployment types, see [Deployment types for Microsoft Foundry Models](../../foundry-models/concepts/deployment-types.md).

Agents (classic) are deprecated. To use models later than gpt-5, see the [agents (new) documentation](../../../foundry/agents/overview.md).

## Available models

# [Global standard](#tab/global-standard)

| Region | gpt-5 | gpt-5-mini | gpt-5-nano | gpt-5-chat | gpt-4.1 | gpt-4.1-nano | gpt-4.1-mini | gpt-4o (05-13) | gpt-4o (08-06) | gpt-4o (11-20) | gpt-4o-mini | gpt-4 | gpt-4-turbo |
| --- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| australiaeast | ✅ | ✅ |  |  | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| brazilsouth |  |  |  |  | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |  | ✅ |
| canadaeast |  |  |  |  | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| eastus | ✅ | ✅ |  |  | ✅ |  | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| eastus2 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| francecentral |  |  |  |  | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| germanywestcentral |  |  |  |  | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| italynorth |  |  |  |  | ✅ | ✅ | ✅ |  |  | ✅ | ✅ |  |  |
| japaneast | ✅ | ✅ |  |  | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| norwayeast |  |  |  |  | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| southafricanorth |  |  |  |  | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |  | ✅ |
| southcentralus |  |  |  |  | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| southindia | ✅ | ✅ |  |  | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| swedencentral | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| switzerlandnorth | ✅ | ✅ |  |  | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| uksouth | ✅ | ✅ |  |  | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| westeurope |  |  |  |  | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |  | ✅ |
| westus |  |  |  |  | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| westus3 |  |  |  |  | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

# [Global provisioned managed](#tab/ptu-global)

| Region | gpt-5 | gpt-5-mini | gpt-4.1 | gpt-4.1-nano | gpt-4.1-mini | gpt-4o (05-13) | gpt-4o (08-06) | gpt-4o (11-20) | gpt-4o-mini |
| --- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| australiaeast | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| brazilsouth | ✅ |  | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| canadaeast | ✅ |  | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| eastus | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| eastus2 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| francecentral | ✅ |  | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| germanywestcentral | ✅ |  | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| italynorth | ✅ |  | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| japaneast | ✅ |  | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| norwayeast | ✅ |  | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| polandcentral | ✅ |  | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| southafricanorth | ✅ |  | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| southcentralus | ✅ |  | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| southeastasia | ✅ |  | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| southindia | ✅ |  | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| swedencentral | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| switzerlandnorth | ✅ |  | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| uksouth | ✅ |  | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| westeurope | ✅ |  | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| westus | ✅ |  | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| westus3 | ✅ |  | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

# [Standard](#tab/standard)

| Region | o3-deep-research | gpt-4o (05-13) | gpt-4o (08-06) | gpt-4o (11-20) | gpt-4o-mini | gpt-4 | gpt-4-turbo | gpt-4-32k | gpt-35-turbo (1106) | gpt-35-turbo (0125) |
| --- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| australiaeast |  |  |  | ✅ |  | ✅ |  | ✅ | ✅ | ✅ |
| canadaeast |  |  |  | ✅ |  | ✅ |  | ✅ | ✅ | ✅ |
| eastus |  | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |  |  | ✅ |
| eastus2 |  | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |  |  | ✅ |
| francecentral |  |  |  | ✅ |  | ✅ |  | ✅ | ✅ | ✅ |
| japaneast |  |  |  | ✅ |  |  |  |  |  | ✅ |
| norwayeast | ✅ |  |  | ✅ |  |  |  |  |  |  |
| southcentralus | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |  |  | ✅ |
| southindia |  |  |  | ✅ |  |  |  |  | ✅ | ✅ |
| swedencentral |  | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| switzerlandnorth |  |  |  | ✅ |  | ✅ |  | ✅ |  | ✅ |
| uksouth |  |  |  | ✅ |  |  |  |  | ✅ | ✅ |
| westeurope |  |  |  |  |  |  |  |  |  | ✅ |
| westus | ✅ | ✅ | ✅ | ✅ | ✅ |  | ✅ |  | ✅ | ✅ |
| westus3 |  | ✅ | ✅ | ✅ | ✅ |  | ✅ |  |  | ✅ |

# [Provisioned managed](#tab/ptu)

| Region | gpt-5 | gpt-5-mini | gpt-4.1 | gpt-4.1-nano | gpt-4.1-mini | gpt-4o (05-13) | gpt-4o (08-06) | gpt-4o (11-20) | gpt-4o-mini | gpt-4 | gpt-4-turbo | gpt-4-32k | gpt-35-turbo (1106) | gpt-35-turbo (0125) |
| --- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| australiaeast |  |  | ✅ |  | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| brazilsouth |  |  |  |  |  | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |  |
| canadaeast |  |  |  |  |  | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |  |
| eastus | ✅ |  | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| eastus2 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| francecentral |  |  |  |  |  | ✅ | ✅ |  | ✅ | ✅ |  | ✅ |  | ✅ |
| germanywestcentral |  |  |  |  |  | ✅ | ✅ | ✅ |  | ✅ |  | ✅ | ✅ |  |
| japaneast |  |  | ✅ |  | ✅ | ✅ | ✅ | ✅ | ✅ |  | ✅ |  |  | ✅ |
| southafricanorth |  |  |  |  |  | ✅ |  |  |  | ✅ | ✅ | ✅ | ✅ |  |
| southcentralus | ✅ |  | ✅ | ✅ | ✅ |  | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| southeastasia |  |  |  |  |  |  | ✅ | ✅ | ✅ |  |  |  |  |  |
| southindia |  |  |  |  | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |  | ✅ | ✅ | ✅ |
| swedencentral |  |  | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| switzerlandnorth |  |  |  |  |  | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| uksouth |  |  | ✅ |  | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| westeurope |  |  |  |  |  |  |  | ✅ |  |  |  |  |  |  |
| westus | ✅ |  | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| westus3 | ✅ |  | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

---

> **Important:**
> - [Hub-based projects](../../what-is-foundry.md#types-of-projects) are limited to the following models: gpt-4o, gpt-4o-mini, gpt-4, and gpt-35-turbo.
> - For information on Class A subnet support, see the [setup guide on GitHub](https://github.com/microsoft-foundry/foundry-samples/tree/main/infrastructure/infrastructure-setup-bicep/15-private-network-standard-agent-setup).

- **gpt-5 family** (gpt-5, gpt-5-mini, gpt-5-nano, gpt-5-chat): Frontier-scale reasoning for complex, multi-step tasks. [Registration](https://aka.ms/openai/gpt-5/2025-08-07) is required. These models can use only the [code interpreter](../how-to/tools-classic/code-interpreter.md) and [file search](../how-to/tools-classic/file-search.md) tools.
- **gpt-4.1 family** (gpt-4.1, gpt-4.1-mini, gpt-4.1-nano): Cost-effective models for general-purpose agent workloads.
- **gpt-4o family** (gpt-4o, gpt-4o-mini): Multimodal capabilities with vision support.
- **gpt-4 and gpt-35-turbo**: Legacy models for backward compatibility.

## Non-OpenAI models

In addition to Azure OpenAI models, you can use Foundry Models sold by Azure. These models offer specialized capabilities for specific use cases, such as deterministic reasoning or high-throughput generation.


**Foundry Models sold by Azure:**

- **MAI-DS-R1**: Deterministic, precision-focused reasoning.
- **grok-4**: Frontier-scale reasoning for complex, multiple-step problem solving.
- **grok-4-fast-reasoning**: Accelerated agentic reasoning optimized for workflow automation.
- **grok-4-fast-non-reasoning**: High-throughput, low-latency generation and system routing.
- **grok-3**: Strong reasoning for complex, system-level workflows.
- **grok-3-mini**: Lightweight model optimized for interactive, high-volume use cases.
- **Llama-3.3-70B-Instruct**: Versatile model for enterprise Q&A, decision support, and system orchestration.
- **Llama-4-Maverick-17B-128E-Instruct-FP8**: FP8-optimized model that delivers fast, cost-efficient inference.
- **DeepSeek-V3-0324**: Multimodal understanding across text and images.
- **DeepSeek-V3.1**: Enhanced multimodal reasoning and grounded retrieval.
- **DeepSeek-V3.2**: Model that harmonizes high computational efficiency with superior reasoning and agent performance.
- **DeepSeek-V3.2-Speciale**: Specialized DeepSeek-V3.2 variant.
- **DeepSeek-R1-0528**: Advanced long-form and multiple-step reasoning.
- **gpt-oss-120b**: Open-ecosystem model that supports transparency and reproducibility.


## Verify model support

Model availability can change over time. To check what you can deploy for your project and region:

1. 
Sign in to [Microsoft Foundry](https://ai.azure.com/?cid=learnDocs).  Make sure the **New Foundry** toggle is off.  These steps refer to **Foundry (classic)**.



1. Go to the **Model catalog**.
1. Filter the models by **Capabilities** and select **Agent supported**.

If you use provisioned throughput, make sure you have provisioned throughput units (PTUs) available in the target region. For background, see [Provisioned throughput](../../openai/concepts/provisioned-throughput.md).

## Troubleshooting

### A model or version isn't available in your region

- Confirm you selected the right tab for your deployment type.
- Try a different region that supports the model and version.
- If you're using gpt-5 models, make sure your subscription has access. Some models require registration.

### File search isn't available

- File search isn't available in Italy North and Brazil South. Choose a supported region, or use a different tool.

### Provisioned throughput deployment fails

- Confirm you have enough PTUs available in the region.
- Review [Provisioned throughput](../../openai/concepts/provisioned-throughput.md) and [Spillover traffic management](../../openai/how-to/spillover-traffic-management.md).

## Related content

- [Create a new agent](../quickstart.md)
- [Foundry Agent Service quotas and limits](../quotas-limits.md)
- [Deployment types for Microsoft Foundry Models](../../foundry-models/concepts/deployment-types.md)
- [Feature availability across cloud regions](../../reference/region-support.md)
