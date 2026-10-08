---
title: "Model router for Microsoft Foundry concepts (classic)"
description: "Learn about the model router feature in Azure OpenAI in Microsoft Foundry Models. (classic)"
author: PatrickFarley
ms.author: pafarley
manager: mcleans
ms.date: 08/12/2026
ms.service: microsoft-foundry
ms.subservice: foundry-model-inference
ms.topic: concept-article
ms.custom:
  - classic-and-new
  - build-2025
  - dev-focus
  - references_regions
  - doc-kit-assisted
ai-usage: ai-assisted

ROBOTS: NOINDEX, NOFOLLOW
---

# Model router for Microsoft Foundry (classic)

**Currently viewing:**  **Foundry (classic) portal version** - [Switch to version for the new Foundry portal](../../../foundry/openai/concepts/model-router.md)

Model router is a trained language model that intelligently routes your prompts in real time to the most suitable large language model (LLM). You deploy model router like any other Foundry model. Thus, it delivers high performance while saving on costs, reducing latencies, and increasing responsiveness, while maintaining comparable quality, all packaged as a single model deployment.

> **Note:**
> You do not need to separately deploy the supported LLMs for use with model router, with the exception of the Claude models. To use model router with your Claude models, first deploy them from the model catalog. The deployments are invoked by model router if they're selected for routing.

To try model router quickly, follow [How to use model router](../how-to/model-router.md). After you deploy model router, send a request to the deployment. Model router selects an underlying model for each request based on your routing settings.

> **Tip:**
> The [Microsoft Foundry (new)](../../../foundry/what-is-foundry.md) portal offers enhanced configuration options for model router. [Switch to the Microsoft Foundry (new) documentation](../../../foundry/openai/concepts/model-router.md) to see the latest features.


## How model router works

As a trained language model, model router analyzes your prompts in real time based on complexity, reasoning, task type, and other attributes. It does not store your prompts. It routes only to eligible models based on your access and deployment types, honoring data zone boundaries.

> **Important:**
> The effective context window is limited by the smallest underlying model. For larger contexts, use [model subset](#model-subset) to select models that support your requirements.

- In Balanced mode (default), it considers all underlying models within a small quality range (for example, 1% to 2% compared with the highest-quality model for that prompt) and picks the most cost-effective model.
- In Cost mode, it considers a larger quality band (for example, 5% to 6% compared with the highest-quality model for that prompt) and chooses the most cost-effective model.
- In Quality mode, it picks the highest quality rated model for the prompt, ignoring the cost.

## Why use model router?

Model router optimizes costs and latencies while maintaining comparable quality. Smaller and cheaper models are used when they're sufficient for the task, but larger and more expensive models are available for more complex tasks. Also, reasoning models are available for tasks that require complex reasoning, and non-reasoning models are used otherwise. Model router provides a single deployment and chat experience that combines the best features from all of the underlying chat models.

The current version, `2025-11-18` (latest), includes the following capabilities:
1. Support Global Standard and Data Zone Standard deployments.
1. Routes across models from OpenAI, DeepSeek, Meta, xAI, and Anthropic. For the current routing pool, see [Supported models](#supported-models).
1. Quick deploy or Custom deploy with **routing mode** and **model subset** options.
1. **Routing mode**: Optimize the routing logic for your needs. Supported options: `Quality`, `Cost`, `Balanced` (default).
1. **Model subset**: Select your preferred models to create your model subset for routing.
1. Support for agentic scenarios with tools across eligible OpenAI, open-source (OSS), and Anthropic models in Foundry Agent Service.

## Versioning

Model router uses date-stamped versions. The current version is `2025-11-18` (latest), which is actively maintained — new underlying models and features are added to this version over time without changing the version identifier.

Older versions (`2025-08-07`, `2025-05-19`) are frozen and don't receive new model additions.

| Version | Status | Description |
| :--- | :--- | :--- |
| `2025-11-18` | **Active (latest)** | Receives ongoing model and feature updates |
| `2025-08-07` | Frozen | Fixed set of models; no new additions |
| `2025-05-19` | Frozen | Fixed set of models; no new additions |

> **Tip:**
> You don't need to wait for a new version number to access newly supported models. The `2025-11-18` version is updated in place as new models become available.

If you select **Auto-update** at the deployment step (see [Model updates](../../../foundry/openai/how-to/working-with-models.md#model-updates)), your model router deployment automatically updates when new versions become available. When that happens, the set of underlying models also changes, which could affect the overall performance of the model and costs.



## Supported models

> **Note:**
> You don't need to separately deploy the supported large language models for use with model router, except for the Claude models. To use model router with your Claude models, first deploy them from the model catalog. Model router invokes the deployments if you select them for routing.

### Model router version `2025-11-18` (latest)

| Provider | Model | Version |
| :--- | :--- | :---: |
| OpenAI | `gpt-6-astra` | `2026-09-03` |
| OpenAI | `gpt-5.6-sol` | `2026-07-09` |
| OpenAI | `gpt-5.6-terra` | `2026-07-09` |
| OpenAI | `gpt-5.6-luna` | `2026-07-09` |
| OpenAI | `gpt-5.5` | `2026-04-24` |
| OpenAI | `gpt-5.4` | `2026-03-05` |
| OpenAI | `gpt-5.4-mini` | `2026-03-17` |
| OpenAI | `gpt-5.4-nano` | `2026-03-17` |
| OpenAI | `gpt-5.2` | `2025-12-11` |
| OpenAI | `gpt-5` | `2025-08-07` |
| OpenAI | `gpt-5-mini` | `2025-08-07` |
| OpenAI | `gpt-5-nano` | `2025-08-07` |
| OpenAI | `o4-mini` | `2025-04-16` |
| OpenAI | `gpt-4.1` | `2025-04-14` |
| OpenAI | `gpt-4.1-mini` | `2025-04-14` |
| OpenAI | `gpt-4.1-nano` | `2025-04-14` |
| OpenAI | `gpt-4o` | `2024-11-20` |
| OpenAI | `gpt-4o-mini` | `2024-07-18` |
| OpenAI | `gpt-oss-120b` | `1` |
| Anthropic | `claude-fable-5-1` | `1` |
| Anthropic | `claude-opus-5` | `1` |
| Anthropic | `claude-sonnet-5` | `1` |
| Anthropic | `claude-opus-4-8` | `1` |
| Anthropic | `claude-opus-4-7` | `1` |
| Anthropic | `claude-opus-4-6` | `1` |
| Anthropic | `claude-sonnet-4-5` | `20250929` |
| Anthropic | `claude-haiku-4-5` | `20251001` |
| xAI | `grok-4.6` | `1` |
| xAI | `grok-4-1-fast-reasoning` | `1` |
| xAI | `grok-4` | `1` |
| Fireworks | `FW-GLM-5.3` | `1` |
| Fireworks | `FW-GLM-5.3-Flash` | `1` |
| Fireworks | `FW-Kimi-K3` | `1` |
| DeepSeek | `DeepSeek-V3.2` | `1` |
| Meta | `Llama-4-Maverick-17B-128E-Instruct-FP8` | `1` |

<!--
### Model router version `2025-08-07`

| Format | Model | Version |
|:---|:---|:---:|
| OpenAI | `gpt-4.1` | `2025-04-14` |
| OpenAI | `gpt-4.1-mini` | `2025-04-14` |
| OpenAI | `gpt-4.1-nano` | `2025-04-14` |
| OpenAI | `o4-mini` | `2025-04-16` |
| OpenAI | `gpt-5` | `2025-08-07` |
| OpenAI | `gpt-5-mini` | `2025-08-07` |
| OpenAI | `gpt-5-nano` | `2025-08-07` |
| OpenAI | `gpt-5-chat` | `2025-08-07` |


### Model router version `2025-05-19`

| Format | Model | Version |
|:---|:---|:---:|
| OpenAI | `gpt-4.1` | `2025-04-14` |
| OpenAI | `gpt-4.1-mini` | `2025-04-14` |
| OpenAI | `gpt-4.1-nano` | `2025-04-14` |
| OpenAI | `o4-mini` | `2025-04-16` |
-->



## Supported regions

Model router supports Global Standard deployments in all of the following regions. A check mark (✅) indicates that the deployment type is available. A hyphen (-) indicates that it's not available.

| Region | Global Standard | Data Zone Standard |
| :--- | :---: | :---: |
| Australia East | ✅ | ✅ |
| Brazil South | ✅ | - |
| Canada East | ✅ | - |
| Central US | ✅ | ✅ |
| East US | ✅ | ✅ |
| East US 2 | ✅ | ✅ |
| France Central | ✅ | ✅ |
| Germany West Central | ✅ | ✅ |
| Italy North | ✅ | ✅ |
| Japan East | ✅ | ✅ |
| Japan West | ✅ | ✅ |
| Korea Central | ✅ | ✅ |
| North Central US | ✅ | ✅ |
| Poland Central | ✅ | ✅ |
| South Africa North | ✅ | - |
| South Central US | ✅ | ✅ |
| South India | ✅ | ✅ |
| Southeast Asia | ✅ | ✅ |
| Spain Central | ✅ | ✅ |
| Sweden Central | ✅ | ✅ |
| Switzerland North | ✅ | ✅ |
| Switzerland West | ✅ | - |
| UK South | ✅ | - |
| UK West | ✅ | - |
| West Central US | ✅ | - |
| West Europe | ✅ | ✅ |
| West US | ✅ | ✅ |
| West US 3 | ✅ | ✅ |

> **Note:**
> The models available to model router in each region are limited to the supported underlying models available in that region. This regional expansion lets you use model router to route requests across the available supported models in each listed region.

## Routing mode

With the latest version, if you choose custom deployment, you can select the **routing mode** to optimize for quality or cost while maintaining a baseline level of performance. Setting a routing mode is optional, and if you don't set one, your deployment defaults to the Balanced mode.

Available routing modes:

| Mode | Description |
| --- | --- |
| Balanced (default) | Considers both cost and quality dynamically. Perfect for general-purpose scenarios |
| Quality | Prioritizes for maximum accuracy. Best for complex reasoning or critical outputs |
| Cost | Prioritizes for more cost savings. Ideal for high-volume, budget-sensitive workloads |


## Model subset

The latest version of model router supports model subsets: You can specify which underlying models to include in routing decisions. This gives you more control over cost, compliance, and performance characteristics.

When new base models become available, they're not included in your selection unless you explicitly add them to your deployment's inclusion list.

## Automatic failover

Model router now includes built-in automatic failover. When using the default deployment to route to all supported models, model router transparently redirects the request to the next most appropriate model, so transient issues with any single model don't disrupt your application. Failover is enabled by default — no additional configuration is required.

For custom deployment configurations:
- Your selected routing mode (Balanced, Cost, or Quality) continues to apply during failover.
- Your configured model subset also works as your fallback set to prevent your prompts from getting processed by unapproved models. Therefore, be sure to select model subsets with at least two models to benefit from the fallback capability.

To inspect ordered model attempts and determine whether fallback occurred for an individual Chat Completions request, see [Monitor model router](../../../foundry/openai/how-to/monitor-model-router.md).

## Prompt caching

Model router supports prompt caching because requests are processed by the underlying models that support it. When model router delegates a request to a model that supports prompt caching, cached tokens are used automatically — no extra configuration is needed.

Cache behavior depends on which underlying model the router selects for a given request. Because routing decisions might vary, caching benefits apply only when the same model handles consecutive requests with overlapping prompt prefixes.

For stateless Chat Completions conversations, you can use [session affinity](../../../foundry/openai/how-to/model-router.md#keep-chat-completions-requests-on-the-same-model-preview) to ask model router to attempt the same eligible model across related turns. This behavior can improve the opportunity for cache reuse, but it doesn't inspect cache state, guarantee a cache hit, or adaptively switch models based on cache savings.

For details on how prompt caching works and which models support it, see [Prompt caching](../../../foundry/openai/how-to/prompt-caching.md).

## Limitations

To overcome the limits on context window and parameters, use the Model subset feature to select your models for routing that support your desired properties.

> **Note:**
> The context window limit listed for model router is the limit of the smallest underlying model. Other underlying models are compatible with larger context windows, which means an API call with a larger context will succeed only if the prompt happens to be routed to the right model. To review context windows for the underlying models, see [Azure OpenAI in Microsoft Foundry models](../../../foundry/foundry-models/concepts/models-sold-directly-by-azure.md).
>
> To shorten the context window, you can do one of the following:
> - Summarize the prompt before passing it to the model
> - Truncate the prompt into more relevant parts
> - Use document embeddings and have the chat model retrieve relevant sections. For more information, see [What is Azure AI Search?](../../../search/search-what-is-azure-search.md)

### Quota tiers

Model router limits scale with your subscription's usage tier. For information on how tiers work, see [Quota tiers](../../../foundry/openai/quotas-limits.md#quota-tiers).

| Tier | GlobalStandard RPM | GlobalStandard TPM | DataZoneStandard RPM | DataZoneStandard TPM |
| :--- | ---: | ---: | ---: | ---: |
| Tier 1 | 1,000 | 1,000,000 | 300 | 300,000 |
| Tier 2 | 2,000 | 2,000,000 | 670 | 670,000 |
| Tier 3 | 4,000 | 4,000,000 | 1,000 | 1,000,000 |
| Tier 4 | 7,000 | 7,000,000 | 2,000 | 2,000,000 |
| Tier 5 | 10,000 | 10,000,000 | 3,000 | 3,000,000 |
| Tier 6 | 15,000 | 15,000,000 | 4,000 | 4,000,000 |

For other rate limit information, see [Quotas and limits](../../../foundry/openai/quotas-limits.md).

Model router accepts image inputs for [Vision enabled chats](../../../foundry/openai/how-to/gpt-with-vision.md) (all of the underlying models can accept image input), but the routing decision is based on the text input only.

Model router doesn't process audio input.

## Troubleshooting

| Issue | Resolution |
| --- | --- |
| Deployment fails | Verify your Foundry resource is in a [supported region](../../../foundry/openai/concepts/model-router.md#supported-regions). |
| Claude models not routing | Ensure Claude models are deployed separately before enabling in model router. |
| Context exceeded error | Reduce prompt size or use model subset to select models with larger context windows. |
| Unexpected model selection | Review your routing mode setting (Balanced, Cost, Quality) and model subset configuration. |

For detailed deployment troubleshooting, see [How to use model router](../../../foundry/openai/how-to/model-router.md).

## Billing information

Model router usage is charged for input prompts at the rate listed on the pricing page.

You can monitor the costs of your model router deployment in the Azure portal.

## Next step

> 
> [How to use model router](../../../foundry/openai/how-to/model-router.md)
