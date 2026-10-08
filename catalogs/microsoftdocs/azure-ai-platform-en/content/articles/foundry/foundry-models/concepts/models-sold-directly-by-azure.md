---
title: "Foundry Models sold by Azure"
description: "Learn about Microsoft Foundry Models sold by Azure, their capabilities, deployment types, and regional availability for AI applications."
author: msakande #alvinashcraft for azure-openai pivot
ms.author: mopeakande #aashcraft for azure-openai pivot
manager: mcleans
ms.date: 09/21/2026
ms.service: microsoft-foundry
ms.subservice: foundry-models
ms.topic: product-comparison
ms.custom:
  - classic-and-new
  - references_regions
  - tool_generated
  - build-aifnd
  - build-2025
  - pilot-ai-workflow-jan-2026
  - doc-kit-assisted
ai-usage: ai-assisted
zone_pivot_groups: models-sold-directly-by-azure

#CustomerIntent: As a developer, I want to browse the full list of Microsoft Foundry Models sold by Azure, including their capabilities, so that I can select the right model for my application.
---

# Foundry Models sold by Azure


Microsoft Foundry Models in the model catalog comprise two main categories, namely *Foundry Models sold by Azure* and *Foundry Models from partners and community*. 
This article lists a selection of Foundry Models sold by Azure, along with their capabilities, [deployment types](deployment-types.md), and regions of availability, **excluding deprecated and retired models**. 

Models sold by Azure are also hosted by Azure and operated by Azure as part of the Foundry Models service. They include all Azure OpenAI models and specific, [selected models from top providers](models-sold-directly-by-azure.md?pivots=azure-direct-others). These models are billed through your Azure subscription, covered by Azure service-level agreements, and supported by Microsoft. To see a list of Foundry Models that are supported by the Foundry Agent Service, see [Models supported by Agent Service](../../agents/concepts/limits-quotas-regions.md), and for a list of Foundry Models from partners, see [Foundry Models from partners and community](models-from-partners.md).

> **Tip:**
> Use the tabs at the top of this page to switch between [Azure OpenAI models](models-sold-directly-by-azure.md?pivots=azure-openai) and [Other model collections](models-sold-directly-by-azure.md?pivots=azure-direct-others) from providers like Cohere, DeepSeek, Meta, Mistral AI, and xAI.


**Applies to: azure-openai**



## Azure OpenAI in Microsoft Foundry models

Azure OpenAI is powered by a diverse set of models with different capabilities and price points. Model availability varies by region and cloud.

- To see **region availability for Azure OpenAI in Microsoft Foundry models grouped by deployment category**, see [Region availability for Foundry Models sold by Azure](models-sold-directly-by-azure-region-availability.md).
- For **Azure Government model availability**, refer to [Azure OpenAI in Azure Government](models-sold-directly-by-azure-gov.md).

### Model highlights

| Models | Description |
| --- | --- |
| [GPT-6.1 series](models-sold-directly-by-azure.md#gpt-61) | **NEW** `gpt-6.1-sol` |
| [GPT-6 series](models-sold-directly-by-azure.md#gpt-6) | **NEW** `gpt-6-astra`, **NEW** `gpt-6-luna`, `gpt-6-sol` |
| [GPT-5.6 series](models-sold-directly-by-azure.md#gpt-56) | `gpt-5.6-sol`, `gpt-5.6-terra`, `gpt-5.6-luna` |
| [GPT-chat-latest (preview)](models-sold-directly-by-azure.md#gpt-chat-latest) | **NEW** `gpt-chat-latest` **Preview** |
| [GPT-5.5 series](models-sold-directly-by-azure.md#gpt-55) | `gpt-5.5` |
| [GPT-5.4 series](models-sold-directly-by-azure.md#gpt-54) | `gpt-5.4-mini`, `gpt-5.4-nano`, `gpt-5.4`, `gpt-5.4-pro` |
| [GPT-5.3 series](models-sold-directly-by-azure.md#gpt-53) | `gpt-5.3-codex` |
| [GPT-5.2 series](models-sold-directly-by-azure.md#gpt-52) | `gpt-5.2-codex`, `gpt-5.2` |
| [GPT-5.1 series](models-sold-directly-by-azure.md#gpt-51) | `gpt-5.1`, `gpt-5.1-codex`, `gpt-5.1-codex-mini` |
| [Sora](https://learn.microsoft.com/azure/ai-foundry/foundry-models/concepts/models-sold-directly-by-azure?pivots=azure-openai\&tabs=global-standard-aoai%2Cstandard-chat-completions%2Cglobal-standard#video-generation-models) | **NEW** sora-2 |
| [GPT-5 series](models-sold-directly-by-azure.md#gpt-5) | `gpt-5`, `gpt-5-mini`, `gpt-5-nano` |
| [gpt-oss](models-sold-directly-by-azure.md#gpt-oss) | open-weight reasoning models |
| [codex-mini](models-sold-directly-by-azure.md#o-series-models) | Fine-tuned version of `o4-mini`. |
| [GPT-4.1 series](models-sold-directly-by-azure.md#gpt-41-series) | `gpt-4.1`, `gpt-4.1-mini`, `gpt-4.1-nano` |
| [computer-use-preview](models-sold-directly-by-azure.md#computer-use-preview) | An experimental model trained for use with the Responses API computer use tool. |
| [o-series models](models-sold-directly-by-azure.md#o-series-models) | [Reasoning models](../../openai/how-to/reasoning.md) with advanced problem solving and increased focus and capability. |
| [GPT-4o, GPT-4o mini, and GPT-4 Turbo](models-sold-directly-by-azure.md#gpt-4o-and-gpt-4-turbo) | Capable Azure OpenAI models with multimodal versions, which can accept both text and images as input. |
| [Embeddings](models-sold-directly-by-azure.md#embeddings) | A set of models that can convert text into numerical vector form to facilitate text similarity. |
| [Image generation](models-sold-directly-by-azure.md#image-generation-models) | A series of models that can generate original images from natural language. |
| [`Video generation`](models-sold-directly-by-azure.md#video-generation-models) | A model that can generate original video scenes from text instructions. |
| [Audio](models-sold-directly-by-azure.md#audio-models) | A series of models for speech to text, translation, and text to speech. GPT-4o audio models support either low latency *speech in, speech out* conversational interactions or audio generation. |

### Understand model token limits

The **Context Window** column lists the total number of tokens that a model can process in a request. When a row lists separate **Input** and **Output** values, these values are individual limits. They aren't additive allowances that you can always use together. Input tokens, generated output tokens, and reasoning tokens share the available context budget. More input leaves fewer tokens for generation.

The **Max Output Tokens** column sets an upper limit, not a guaranteed output size. An API parameter such as `max_output_tokens` doesn't reserve tokens when the request has less context budget available.

### Short context and long context

For Azure OpenAI models with short-context and long-context pricing categories, *context* refers to the number of input tokens in an individual request. It doesn't refer to the model's maximum context window or the combined number of input and output tokens.

These categories describe the request's input length, not different model context-window sizes. A model with a large context window can still receive a short-context request.

Generated output tokens don't determine whether a request is classified as short context or long context. Output tokens are still subject to the model's applicable pricing.

For model-specific thresholds, rates, and billing details, see [Azure OpenAI pricing](https://azure.microsoft.com/pricing/details/azure-openai/).

## GPT-chat-latest

For model availability across all regions, grouped by deployment category, see [Region availability for Foundry Models sold by Azure](models-sold-directly-by-azure-region-availability.md).

### Capabilities

| Model ID | Description | Context Window | Max Output Tokens | Training Data (up to) |
| --- | :--- | :--- | :--- | :---: |
| `gpt-chat-latest` (2026-08-06)<br>**Preview** | - [Reasoning](../../openai/how-to/reasoning.md). <br> - Chat Completions API. <br> - [Responses API](../../openai/how-to/responses.md). <br> - Structured outputs <br> - Functions, tools, and parallel tool calling. | 400,000<br><br>Input: 272,000<br>Output: 128,000 | 128,000 | February 2026 |
| `gpt-chat-latest` (2026-06-24)<br>**Preview** | - [Reasoning](../../openai/how-to/reasoning.md). <br> - Chat Completions API. <br> - [Responses API](../../openai/how-to/responses.md). <br> - Structured outputs <br> - Functions, tools, and parallel tool calling. | 128,000 <br><br>Input: 111,616 <br> Output: 16,384 | 16,384 | August 2025 |
| `gpt-chat-latest` (2026-05-28)<br>**Preview** | - [Reasoning](../../openai/how-to/reasoning.md). <br> - Chat Completions API. <br> - [Responses API](../../openai/how-to/responses.md). <br> - Structured outputs <br> - Functions, tools, and parallel tool calling. | 128,000 <br><br>Input: 111,616 <br> Output: 16,384 | 16,384 | August 2025 |
| `gpt-chat-latest` (2026-05-05)<br>**Preview** | - [Reasoning](../../openai/how-to/reasoning.md). <br> - Chat Completions API. <br> - [Responses API](../../openai/how-to/responses.md). <br> - Structured outputs <br> - Functions, tools, and parallel tool calling. | 128,000 <br><br>Input: 111,616 <br> Output: 16,384 | 16,384 | August 2025 |

`gpt-chat-latest` uses a fixed, nonzero reasoning level, so it can generate reasoning tokens for some requests. Unlike other reasoning models, you can't configure this level with the `reasoning_effort` parameter.

You might also see this model referred to by OpenAI as GPT-5.5 Instant or in the OpenAI API as `chat-latest`. In Microsoft Foundry, the product name for this release is `gpt-chat-latest`. The model continues to follow the existing [Preview lifecycle](../../openai/concepts/model-retirements.md) and standard notice periods. The team is also evaluating ways to simplify how customers access continuously updated models over time, but current behavior remains unchanged as that work continues.

> **Caution:**
> Microsoft doesn't recommend using preview models in production. Preview model deployments are upgraded to either future preview versions or to the latest stable, generally available version. Models that are designated preview don't follow the standard Azure OpenAI model lifecycle.

## GPT-6.1

For model availability across all regions, grouped by deployment category, see [Region availability for Foundry Models sold by Azure](models-sold-directly-by-azure-region-availability.md).

### Capabilities

| Model ID | Description | Context Window | Max Output Tokens | Training Data (up to) |
| --- | :--- | :--- | :--- | :---: |
| `gpt-6.1-sol` (2026-09-29) | - [Reasoning](../../openai/how-to/reasoning.md) <br> - [Responses API](../../openai/how-to/responses.md). <br> - [Multi-agent orchestration](../../openai/how-to/responses-multi-agent.md) (preview). <br>- Chat Completions API. <br> - Streaming. <br> - Structured outputs. <br> - Text and image input with text output. <br> - Functions, tools, and parallel tool calling (Responses API only). <br> - Reasoning effort and verbosity. <br> - [Computer use](../../../foundry-classic/openai/how-to/computer-use.md) <br> - [Full summary of capabilities](../../openai/how-to/reasoning.md). | 1,050,000 <br><br>Input: 922,000<br>Output: 128,000 | 128,000 | April 2026 |

## GPT-6

For model availability across all regions, grouped by deployment category, see [Region availability for Foundry Models sold by Azure](models-sold-directly-by-azure-region-availability.md).

### Capabilities

| Model ID | Description | Context Window | Max Output Tokens | Training Data (up to) |
| --- | :--- | :--- | :--- | :---: |
| `gpt-6-astra` (2026-09-03) | - [Reasoning](../../openai/how-to/reasoning.md) <br> - [Responses API](../../openai/how-to/responses.md). <br> - [Multi-agent orchestration](../../openai/how-to/responses-multi-agent.md) (preview). <br>- Chat Completions API. <br> - Streaming. <br> - Structured outputs. <br> - Text and image input with text output. <br> - Functions, tools, and parallel tool calling. <br> - Reasoning effort and verbosity. <br> - [Computer use](../../../foundry-classic/openai/how-to/computer-use.md) <br> - [Full summary of capabilities](../../openai/how-to/reasoning.md). | 1,050,000 <br><br>Input: 922,000<br>Output: 128,000 | 128,000 | April 2026 |
| `gpt-6-luna` (2026-09-22) | - [Reasoning](../../openai/how-to/reasoning.md) <br> - [Responses API](../../openai/how-to/responses.md). <br> - [Multi-agent orchestration](../../openai/how-to/responses-multi-agent.md) (preview). <br>- Chat Completions API. <br> - Streaming. <br> - Structured outputs. <br> - Text and image input with text output. <br> - Functions, tools, and parallel tool calling. <br> - Reasoning effort and verbosity. <br> - [Computer use](../../../foundry-classic/openai/how-to/computer-use.md) <br> - [Full summary of capabilities](../../openai/how-to/reasoning.md). | 1,050,000 <br><br>Input: 922,000<br>Output: 128,000 | 128,000 | May 2026 |
| `gpt-6-sol` (2026-09-22) | - [Reasoning](../../openai/how-to/reasoning.md) <br> - [Responses API](../../openai/how-to/responses.md). <br> - [Multi-agent orchestration](../../openai/how-to/responses-multi-agent.md) (preview). <br>- Chat Completions API. <br> - Streaming. <br> - Structured outputs. <br> - Text and image input with text output. <br> - Functions, tools, and parallel tool calling. <br> - Reasoning effort and verbosity. <br> - [Computer use](../../../foundry-classic/openai/how-to/computer-use.md) <br> - [Full summary of capabilities](../../openai/how-to/reasoning.md). | 1,050,000 <br><br>Input: 922,000<br>Output: 128,000 | 128,000 | April 2026 |

<!-- Do not change this note's wording without approval. -->
> **Note:**
> In certain circumstances, Astra may apply enhanced safety controls when safety systems identify elevated risk. These controls may include modifying classifier thresholds at inference time and supplementing customer prompts with system-generated safety instructions intended to support safe and policy-compliant model behaviors.

Keep the following in mind when you deploy and call GPT-6 models:

- Some [quota tiers](../../openai/quotas-limits.md) require quota requests for the GPT-6 family to deploy these models. Tier 5 and Tier 6 subscriptions have quota by default. See [Microsoft Foundry Models quotas and limits](https://learn.microsoft.com/azure/foundry/foundry-models/quotas-limits) for more information about quotas and limits in Microsoft Foundry.
- Standard pay-as-you-go deployments of GPT-6 models use separate pricing categories for short-context and long-context requests. Each GPT-6 model handles both request types. The number of input tokens determines the category, as explained in [Short context and long context](#short-context-and-long-context). For GPT-6 thresholds, rates, and how pricing applies to the request, see [Azure OpenAI pricing](https://azure.microsoft.com/pricing/details/azure-openai/).

## GPT-5.6

For model availability across all regions, grouped by deployment category, see [Region availability for Foundry Models sold by Azure](models-sold-directly-by-azure-region-availability.md).

### Capabilities

| Model ID | Description | Context Window | Max Output Tokens | Training Data (up to) |
| --- | :--- | :--- | :--- | :---: |
| `gpt-5.6-sol` (2026-07-09) | - [Reasoning](../../openai/how-to/reasoning.md) <br> - [Responses API](../../openai/how-to/responses.md). <br> - [Multi-agent orchestration](../../openai/how-to/responses-multi-agent.md) (preview). <br>- Chat Completions API. <br> - [Flex processing](../../openai/how-to/flex-processing.md). <br> - Structured outputs.<br> - Text and image processing. <br> - Functions, tools, and parallel tool calling. <br> - [Computer use](../../../foundry-classic/openai/how-to/computer-use.md) <br> - [Full summary of capabilities](../../openai/how-to/reasoning.md). | 1,050,000 <br><br>Input: 922,000<br>Output: 128,000 | 128,000 | February 2026 |
| `gpt-5.6-terra` (2026-07-09) | - [Reasoning](../../openai/how-to/reasoning.md) <br> - [Responses API](../../openai/how-to/responses.md). <br> - [Multi-agent orchestration](../../openai/how-to/responses-multi-agent.md) (preview). <br>- Chat Completions API. <br> - Structured outputs.<br> - Text and image processing. <br> - Functions, tools, and parallel tool calling. <br> - [Computer use](../../../foundry-classic/openai/how-to/computer-use.md) <br> - [Full summary of capabilities](../../openai/how-to/reasoning.md). | 1,050,000 <br><br>Input: 922,000<br>Output: 128,000 | 128,000 | February 2026 |
| `gpt-5.6-luna` (2026-07-09) | - [Reasoning](../../openai/how-to/reasoning.md) <br> - [Responses API](../../openai/how-to/responses.md). <br> - [Multi-agent orchestration](../../openai/how-to/responses-multi-agent.md) (preview). <br>- Chat Completions API. <br> - Structured outputs.<br> - Text and image processing. <br> - Functions, tools, and parallel tool calling. <br> - [Computer use](../../../foundry-classic/openai/how-to/computer-use.md) <br> - [Full summary of capabilities](../../openai/how-to/reasoning.md). | 1,050,000 <br><br>Input: 922,000<br>Output: 128,000 | 128,000 | February 2026 |

> **Note:**
> Keep the following in mind when you deploy and call the `gpt-5.6` models:
>
> - Some [quota tiers](../../openai/quotas-limits.md) require quota requests for `gpt-5.6` to deploy this model. Tier 5 and Tier 6 subscriptions have quota by default. See [Microsoft Foundry Models quotas and limits](https://learn.microsoft.com/azure/foundry/foundry-models/quotas-limits) for more information about quotas and limits in Microsoft Foundry.
> - Standard pay-as-you-go deployments of GPT-5.6 models use separate pricing categories for short-context and long-context requests. Each GPT-5.6 model handles both request types. The number of input tokens determines the category, as explained in [Short context and long context](#short-context-and-long-context). For GPT-5.6 thresholds, rates, and how pricing applies to the request, see [Azure OpenAI pricing](https://azure.microsoft.com/pricing/details/azure-openai/).
> - These models support the Chat Completions API and function tools, but not both at the same time unless `reasoning_effort` is `none`. Use the Responses API for tool calling. For more information, see [Tool calling with reasoning models](../../openai/how-to/reasoning.md#tool-calling-with-reasoning-models).

## GPT-5.5

For model availability across all regions, grouped by deployment category, see [Region availability for Foundry Models sold by Azure](models-sold-directly-by-azure-region-availability.md).

### Capabilities

| Model ID | Description | Context Window | Max Output Tokens | Training Data (up to) |
| --- | :--- | :--- | :--- | :---: |
| `gpt-5.5` (2026-04-24) | - [Reasoning](../../openai/how-to/reasoning.md) <br> - [Responses API](../../openai/how-to/responses.md). <br>- Chat Completions API. <br> - Structured outputs.<br> - Text and image processing. <br> - Functions, tools, and parallel tool calling. <br> - [Computer use](../../../foundry-classic/openai/how-to/computer-use.md) <br> - [Full summary of capabilities](../../openai/how-to/reasoning.md). | 1,050,000 <br><br>Input: 922,000<br>Output: 128,000 | 128,000 | December 2025 |

### Responses API token budget

For the current GPT-5.5 Responses API implementation, the effective combined prompt and generation budget is approximately 922,000 tokens. This API limit is lower than the model's 1,050,000-token context window. You can't combine a 922,000-token prompt with 128,000 generated tokens in one request. Calculate the approximate generation budget as follows:

`available generation tokens = 922,000 - prompt tokens`

For example, a request with 921,549 prompt tokens has the following token budget:

- Prompt tokens: 921,549.
- Effective context budget: 922,000.
- Remaining generation budget: 451 tokens.

The model can generate at most the remaining 451 tokens, even if you set `max_output_tokens` to 64,000 or 128,000. This generation budget includes visible output and reasoning tokens.

Reaching the available token budget doesn't necessarily produce an HTTP error. A request can return HTTP status code 200 with an incomplete response. Check `status` for `incomplete` and `incomplete_details.reason` for `max_output_tokens` to determine whether generation stopped at the token limit.

> **Note:**
> Some [quota tiers](../../openai/quotas-limits.md) will require quota requests for `gpt-5.5` to be able to deploy this model. Tier 5 and Tier 6 subscriptions have quota by default.

## GPT-5.4

For model availability across all regions, grouped by deployment category, see [Region availability for Foundry Models sold by Azure](models-sold-directly-by-azure-region-availability.md).

### Capabilities

| Model ID | Description | Context Window | Max Output Tokens | Training Data (up to) |
| --- | :--- | :--- | :--- | :---: |
| `gpt-5.4` (2026-03-05) | - [Reasoning](../../openai/how-to/reasoning.md) <br> - [Responses API](../../openai/how-to/responses.md). <br>- Chat Completions API. <br> - Structured outputs.<br> - Text and image processing. <br> - Functions, tools, and parallel tool calling. <br> - [Computer use](../../../foundry-classic/openai/how-to/computer-use.md) <br> - [Full summary of capabilities](../../openai/how-to/reasoning.md). | 1,050,000 <br><br>Input: 922,000<br>Output: 128,000 | 128,000 | August 2025 |
| `gpt-5.4-pro` (2026-03-05) | - [Reasoning](../../openai/how-to/reasoning.md) <br> - [Responses API](../../openai/how-to/responses.md). <br> - Text and image processing. <br> - Functions & tools <br> - [Full summary of capabilities](../../openai/how-to/reasoning.md). | 1,050,000 <br><br>Input: 922,000<br>Output: 128,000 | 128,000 | August 2025 |
| `gpt-5.4-mini` (2026-03-17) | - [Reasoning](../../openai/how-to/reasoning.md) <br> - [Responses API](../../openai/how-to/responses.md). <br>- Chat Completions API. <br> - Structured outputs.<br> - Text and image processing. <br> - Functions, tools, and parallel tool calling. <br> - [Computer use](../../../foundry-classic/openai/how-to/computer-use.md) <br> - [Full summary of capabilities](../../openai/how-to/reasoning.md). | 400,000<br><br>Input: 272,000<br>Output: 128,000 | 128,000 | August 2025 |
| `gpt-5.4-nano` (2026-03-17) | - [Reasoning](../../openai/how-to/reasoning.md) <br> - [Responses API](../../openai/how-to/responses.md). <br>- Chat Completions API. <br> - Structured outputs.<br> - Text and image processing. <br> - Functions, tools, and parallel tool calling. <br> - [Full summary of capabilities](../../openai/how-to/reasoning.md). | 400,000<br><br>Input: 272,000<br>Output: 128,000 | 128,000 | August 2025 |

## GPT-5.3

For model availability across all regions, grouped by deployment category, see [Region availability for Foundry Models sold by Azure](models-sold-directly-by-azure-region-availability.md).

### Capabilities

| Model ID | Description | Context Window | Max Output Tokens | Training Data (up to) |
| --- | :--- | :--- | :--- | :---: |
| `gpt-5.3-codex` (2026-02-24) | - [Reasoning](../../openai/how-to/reasoning.md) <br> - [Responses API](../../openai/how-to/responses.md). <br> - Structured outputs.<br> - Text and image processing. <br> - Functions, tools, and parallel tool calling. <br> - [Full summary of capabilities](../../openai/how-to/reasoning.md). <br> - Optimized for [Codex CLI & Codex VS Code extension](../../openai/how-to/codex.md) | 400,000<br><br>Input: 272,000<br>Output: 128,000 | 128,000 | August 2025 |
| `gpt-5.3-chat` (2026-03-03)<br>**Retired June 29, 2026** | Historical specifications. <br> - Chat Completions API. <br> - [Responses API](../../openai/how-to/responses.md). <br> - Structured outputs <br> - Functions, tools, and parallel tool calling. | 128,000 <br><br>Input: 111,616 <br> Output: 16,384 | 16,384 | August 2025 |

## GPT-5.2

For model availability across all regions, grouped by deployment category, see [Region availability for Foundry Models sold by Azure](models-sold-directly-by-azure-region-availability.md).

### Capabilities

| Model ID | Description | Context Window | Max Output Tokens | Training Data (up to) |
| --- | :--- | :--- | :--- | :---: |
| `gpt-5.2-codex` (2026-01-14) | - [Reasoning](../../openai/how-to/reasoning.md) <br> - [Responses API](../../openai/how-to/responses.md). <br> - Structured outputs.<br> - Text and image processing. <br> - Functions, tools, and parallel tool calling. <br> - [Full summary of capabilities](../../openai/how-to/reasoning.md). <br> - Optimized for [Codex CLI & Codex VS Code extension](../../openai/how-to/codex.md) | 400,000<br><br>Input: 272,000<br>Output: 128,000 | 128,000 |  |
| `gpt-5.2` (2025-12-11) | - [Reasoning](../../openai/how-to/reasoning.md) <br> - Chat Completions API. <br> - [Responses API](../../openai/how-to/responses.md). <br> - Structured outputs.<br> - Text and image processing. <br> - Functions, tools, and parallel tool calling. <br> - [Full summary of capabilities](../../openai/how-to/reasoning.md). | 400,000<br><br>Input: 272,000<br>Output: 128,000 | 128,000 | August 2025 |
| `gpt-5.2-chat` (2025-12-11)<br>**Retired May 13, 2026** | Historical specifications. <br> - Chat Completions API. <br> - [Responses API](../../openai/how-to/responses.md). <br> - Structured outputs <br> - Functions, tools, and parallel tool calling. | 128,000 <br><br>Input: 111,616 <br> Output: 16,384 | 16,384 | August 2025 |
| `gpt-5.2-chat` (2026-02-10)<br>**Retired June 29, 2026** | Historical specifications. <br> - Chat Completions API. <br> - [Responses API](../../openai/how-to/responses.md). <br> - Structured outputs <br> - Functions, tools, and parallel tool calling. | 128,000 <br><br>Input: 111,616 <br> Output: 16,384 | 16,384 | August 2025 |

Retired models aren't available for use or new deployments. See the [model retirement schedule](../../openai/concepts/model-retirement-schedule.md) for replacement guidance.

<!-- > [!IMPORTANT]
> - `gpt-5.1` `reasoning_effort` defaults to `none`. When upgrading from previous reasoning models to `gpt-5.1`, keep in mind that you may need to update your code to explicitly pass a `reasoning_effort` level if you want reasoning to occur.
>
> - `gpt-5.1-chat` adds built-in reasoning capabilities. Like other [reasoning models](../how-to/reasoning.md) it does not support parameters like `temperature`. If you upgrade from using `gpt-5-chat` (which is not a reasoning model) to `gpt-5.1-chat` make sure you remove any custom parameters like `temperature` from your code which are not supported by reasoning models.
>
> - `gpt-5.1-codex-max` adds support for setting `reasoning_effort` to `xhigh`. Reasoning effort `none` is not supported with `gpt-5.1-codex-max`.  -->

## GPT-5.1

For model availability across all regions, grouped by deployment category, see [Region availability for Foundry Models sold by Azure](models-sold-directly-by-azure-region-availability.md).

### Capabilities

| Model ID | Description | Context Window | Max Output Tokens | Training Data (up to) |
| --- | :--- | :--- | :--- | :---: |
| `gpt-5.1` (2025-11-13) | - [Reasoning](../../openai/how-to/reasoning.md) <br> - Chat Completions API. <br> - [Responses API](../../openai/how-to/responses.md). <br> - Structured outputs.<br> - Text and image processing. <br> - Functions, tools, and parallel tool calling. <br> - [Full summary of capabilities](../../openai/how-to/reasoning.md). | 400,000<br><br>Input: 272,000<br>Output: 128,000 | 128,000 | September 30, 2024 |
| `gpt-5.1-chat` (2025-11-13) <br>**Retired June 29, 2026** | Historical specifications. <br> - [Reasoning](../../openai/how-to/reasoning.md) <br> - Chat Completions API. <br> - [Responses API](../../openai/how-to/responses.md). <br> - Structured outputs <br> - Functions, tools, and parallel tool calling. | 128,000 <br><br>Input: 111,616 <br> Output: 16,384 | 16,384 | September 30, 2024 |
| `gpt-5.1-codex` (2025-11-13) | - [Responses API](../../openai/how-to/responses.md) only. <br> - Text and image processing  <br> - Structured outputs.  <br> - Functions, tools, and parallel tool calling. <br> - [Full summary of capabilities](../../openai/how-to/reasoning.md)<br> - Optimized for [Codex CLI & Codex VS Code extension](../../openai/how-to/codex.md) | 400,000<br><br>Input: 272,000<br>Output: 128,000 | 128,000 | September 30, 2024 |
| `gpt-5.1-codex-mini` (2025-11-13) | - [Responses API](../../openai/how-to/responses.md) only. <br> - Text and image processing  <br> - Structured outputs. <br> - Functions, tools, and parallel tool calling. <br> - [Full summary of capabilities](../../openai/how-to/reasoning.md)<br> - Optimized for [Codex CLI & Codex VS Code extension](../../openai/how-to/codex.md) | 400,000<br><br>Input: 272,000<br>Output: 128,000 | 128,000 | September 30, 2024 |
| `gpt-5.1-codex-max` (2025-12-04) | - [Responses API](../../openai/how-to/responses.md) only. <br> - Text and image processing  <br> - Structured outputs.<br> - Functions, tools, and parallel tool calling. <br> - [Full summary of capabilities](../../openai/how-to/reasoning.md)<br> - Optimized for [Codex CLI & Codex VS Code extension](../../openai/how-to/codex.md) | 400,000<br><br>Input: 272,000<br>Output: 128,000 | 128,000 | September 30, 2024 |

> **Important:**
> - `gpt-5.1` `reasoning_effort` defaults to `none`. When upgrading from previous reasoning models to `gpt-5.1`, keep in mind that you may need to update your code to explicitly pass a `reasoning_effort` level if you want reasoning to occur.
>
> - `gpt-5.1-codex-max` adds support for setting `reasoning_effort` to `xhigh`. Reasoning effort `none` is not supported with `gpt-5.1-codex-max`. 

## GPT-5

For model availability across all regions, grouped by deployment category, see [Region availability for Foundry Models sold by Azure](models-sold-directly-by-azure-region-availability.md).

### Capabilities

| Model ID | Description | Context Window | Max Output Tokens | Training Data (up to) |
| --- | :--- | :--- | :--- | :---: |
| `gpt-5` (2025-08-07) | - [Reasoning](../../openai/how-to/reasoning.md) <br> - Chat Completions API. <br> - [Responses API](../../openai/how-to/responses.md). <br> - Structured outputs.<br> - Text and image processing. <br> - Functions, tools, and parallel tool calling. <br> - [Full summary of capabilities](../../openai/how-to/reasoning.md). | 400,000<br><br>Input: 272,000<br>Output: 128,000 | 128,000 | September 30, 2024 |
| `gpt-5-mini` (2025-08-07) | - [Reasoning](../../openai/how-to/reasoning.md) <br> - Chat Completions API. <br> - [Responses API](../../openai/how-to/responses.md). <br> - Structured outputs.<br> - Text and image processing. <br> - Functions, tools, and parallel tool calling. <br> - [Full summary of capabilities](../../openai/how-to/reasoning.md). | 400,000<br><br>Input: 272,000<br>Output: 128,000 | 128,000 | May 31, 2024 |
| `gpt-5-nano` (2025-08-07) | - [Reasoning](../../openai/how-to/reasoning.md) <br> - Chat Completions API. <br> - [Responses API](../../openai/how-to/responses.md). <br> - Structured outputs.<br> - Text and image processing. <br> - Functions, tools, and parallel tool calling. <br> - [Full summary of capabilities](../../openai/how-to/reasoning.md). | 400,000<br><br>Input: 272,000<br>Output: 128,000 | 128,000 | May 31, 2024 |
| `gpt-5-chat` (2025-08-07)<br>**Retired June 29, 2026** | Historical specifications. <br> - Chat Completions API. <br> - [Responses API](../../openai/how-to/responses.md). <br> - **Input**: Text/Image <br> - **Output**: Text only | 128,000 | 16,384 | September 30, 2024 |
| `gpt-5-chat` (2025-10-03)<br>**Retired May 13, 2026** | Historical specifications. <br> - Chat Completions API. <br> - [Responses API](../../openai/how-to/responses.md). <br> - **Input**: Text/Image <br> - **Output**: Text only | 128,000 | 16,384 | September 30, 2024 |
| `gpt-5-codex` (2025-09-11) | - [Responses API](../../openai/how-to/responses.md) only. <br> - **Input**: Text/Image <br> - **Output**: Text only  <br> - Structured outputs.<br> - Text and image processing. <br> - Functions, tools, and parallel tool calling. <br> - [Full summary of capabilities](../../openai/how-to/reasoning.md)<br> - Optimized for [Codex CLI & Codex VS Code extension](../../openai/how-to/codex.md) | 400,000<br><br>Input: 272,000<br>Output: 128,000 | 128,000 | - |
| `gpt-5-pro` (2025-10-06) | - [Reasoning](../../openai/how-to/reasoning.md) <br> - [Responses API](../../openai/how-to/responses.md). <br> - Structured outputs.<br> - Text and image processing. <br> - Functions and tools <br> - [Full summary of capabilities](../../openai/how-to/reasoning.md). | 400,000<br><br>Input: 272,000<br>Output: 128,000 | 128,000 | September 30, 2024 |

Retired models aren't available for use or new deployments. See the [model retirement schedule](../../openai/concepts/model-retirement-schedule.md) for replacement guidance.

## gpt-oss

For model availability across all regions, grouped by deployment category, see [Region availability for Foundry Models sold by Azure](models-sold-directly-by-azure-region-availability.md).

### Capabilities

| Model ID | Description | Context Window | Max Output Tokens | Training Data (up to) |
| --- | :--- | :--- | :--- | :---: |
| `gpt-oss-120b`<sup>1</sup> (Preview) | - Text in/text out only <br> - Chat Completions API <br> - Streaming <br> - Function calling <br> - Structured outputs <br> - Reasoning <br> - Available for deployment<sup>1</sup> and via [managed compute](../../../foundry-classic/how-to/deploy-models-managed.md) | 131,072 | 131,072 | May 31, 2024 |
| `gpt-oss-20b` (Preview) | - Text in/text out only <br> - Chat Completions API <br> - Streaming <br> - Function calling <br> - Structured outputs <br> - Reasoning <br> - Available via [managed compute](../../../foundry-classic/how-to/deploy-models-managed.md) and [Foundry Local](../../../foundry-local/what-is-foundry-local.md) | 131,072 | 131,072 | May 31, 2024 |

<sup>1</sup> Unlike other Azure OpenAI models, `gpt-oss-120b` requires a [Foundry project](https://learn.microsoft.com/azure/ai-foundry/quickstarts/get-started-code?tabs=azure-ai-foundry) to deploy the model.

### Deploy with code

```cli
az cognitiveservices account deployment create \
  --name "Foundry-project-resource" \
  --resource-group "test-rg" \
  --deployment-name "gpt-oss-120b" \
  --model-name "gpt-oss-120b" \
  --model-version "1" \
  --model-format "OpenAI-OSS" \
  --sku-capacity 10 \
  --sku-name "GlobalStandard"
```

## GPT-4.1 series

For model availability across all regions, grouped by deployment category, see [Region availability for Foundry Models sold by Azure](models-sold-directly-by-azure-region-availability.md).

### Capabilities

| Model ID | Description | Context window | Max output tokens | Training data (up to) |
| --- | :--- | :--- | :--- | :---: |
| `gpt-4.1` (2025-04-14) | - Text and image input <br> - Text output <br> - Chat completions API <br>- Responses API <br> - Streaming <br> - Function calling <br> - Structured outputs (chat completions) | - 1,047,576 <br> - 300,000 (standard deployments) <br> - 128,000 (provisioned managed and batch deployments) | 32,768 | May 31, 2024 |
| `gpt-4.1-nano` (2025-04-14) | - Text and image input <br> - Text output <br> - Chat completions API <br>- Responses API <br> - Streaming <br> - Function calling <br> - Structured outputs (chat completions) | - 1,047,576  <br> - 300,000 (standard deployments) <br> - 128,000 (provisioned managed and batch deployments) | 32,768 | May 31, 2024 |
| `gpt-4.1-mini` (2025-04-14) | - Text and image input <br> - Text output <br> - Chat completions API <br>- Responses API <br> - Streaming <br> - Function calling <br> - Structured outputs (chat completions) | - 1,047,576  <br> - 300,000 (standard deployments) <br> - 128,000 (provisioned managed and batch deployments) | 32,768 | May 31, 2024 |

> **Note:**
> Provisioned managed deployments of GPT-4.1 series models support context lengths less than 128,000 tokens. A request that exceeds this limit returns an HTTP 400 error. To handle long-context requests on a provisioned deployment, enable [spillover](../../openai/how-to/spillover-traffic-management.md), which routes those requests to a corresponding standard deployment.

### Known issue

A known issue affects all GPT-4.1 series models. Large tool or function call definitions that exceed 300,000 tokens cause failures, even though the models' 1 million token context limit isn't reached.

The errors can vary based on API call and underlying payload characteristics.

Here are the error messages for the Chat Completions API:

- `Error code: 400 - {'error': {'message': "This model's maximum context length is 300000 tokens. However, your messages resulted in 350564 tokens (100 in the messages, 350464 in the functions). Please reduce the length of the messages or functions.", 'type': 'invalid_request_error', 'param': 'messages', 'code': 'context_length_exceeded'}}`

- `Error code: 400 - {'error': {'message': "Invalid 'tools[0].function.description': string too long. Expected a string with maximum length 1048576, but got a string with length 2778531 instead.", 'type': 'invalid_request_error', 'param': 'tools[0].function.description', 'code': 'string_above_max_length'}}`

Here's the error message for the Responses API:

- `Error code: 500 - {'error': {'message': 'The server had an error processing your request. Sorry about that! You can retry your request, or contact us through an Azure support request at: https://go.microsoft.com/fwlink/?linkid=2213926 if you keep seeing this error. (Please include the request ID d2008353-291d-428f-adc1-defb5d9fb109 in your email.)', 'type': 'server_error', 'param': None, 'code': None}}`

## computer-use-preview

An experimental model trained for use with the [Responses API](../../openai/how-to/responses.md) computer use tool.

It can be used with third-party libraries to allow the model to control mouse and keyboard input, while getting context from screenshots of the current environment.

> **Caution:**
> We don't recommend using preview models in production. We'll upgrade all deployments of preview models to either future preview versions or to the latest stable, generally available version. Models that are designated preview don't follow the standard Azure OpenAI model lifecycle.

Registration is required to access `computer-use-preview`. Access is granted based on Microsoft's eligibility criteria. Customers who have access to other limited access models still need to request access for this model.

To request access, go to [`computer-use-preview` limited access model application](https://aka.ms/oai/cuaaccess). When access is granted, you need to create a deployment for the model.

For model availability across all regions, grouped by deployment category, see [Region availability for Foundry Models sold by Azure](models-sold-directly-by-azure-region-availability.md).

### Capabilities

| Model ID | Description | Context window | Max output tokens | Training data (up to) |
| --- | :--- | :--- | :--- | :---: |
| `computer-use-preview` (2025-03-11) | Specialized model for use with the [Responses API](../../openai/how-to/responses.md) computer use tool <br> <br>- Tools <br>- Streaming<br>- Text (input/output)<br>- Image (input) | 8,192 | 1,024 | October 2023 |

## O-Series models

The Azure OpenAI O-Series models are designed to tackle reasoning and problem-solving tasks with increased focus and capability. These models spend more time processing and understanding the user's request, making them exceptionally strong in areas like science, coding, and math, compared to previous iterations.

For model availability across all regions, grouped by deployment category, see [Region availability for Foundry Models sold by Azure](models-sold-directly-by-azure-region-availability.md).

### Capabilities

| Model ID | Description | Max request (tokens) | Training data (up to) |
| --- | :--- | :--- | :---: |
| `codex-mini` (2025-05-16) | Fine-tuned version of `o4-mini`. <br> - [Responses API](../../openai/how-to/responses.md). <br>- Structured outputs.<br> - Text and image processing. <br> - Functions and tools.<br> [Full summary of capabilities](../../openai/how-to/reasoning.md). | Input: 200,000 <br> Output: 100,000 | May 31, 2024 |
| `o3-pro` (2025-06-10) | - [Responses API](../../openai/how-to/responses.md). <br>- Structured outputs.<br> - Text and image processing. <br> - Functions and tools.<br> [Full summary of capabilities](../../openai/how-to/reasoning.md). | Input: 200,000 <br> Output: 100,000 | May 31, 2024 |
| `o4-mini` (2025-04-16) | - *New* reasoning model, offering [enhanced reasoning abilities](../../openai/how-to/reasoning.md). <br> - Chat Completions API. <br> - [Responses API](../../openai/how-to/responses.md). <br>- Structured outputs.<br> - Text and image processing. <br> - Functions and tools.<br> [Full summary of capabilities](../../openai/how-to/reasoning.md). | Input: 200,000 <br> Output: 100,000 | May 31, 2024 |
| `o3` (2025-04-16) | - *New* reasoning model, offering [enhanced reasoning abilities](../../openai/how-to/reasoning.md). <br> - Chat Completions API. <br> - [Responses API](../../openai/how-to/responses.md). <br> - Structured outputs.<br> - Text and image processing. <br> - Functions, tools, and parallel tool calling. <br> [Full summary of capabilities](../../openai/how-to/reasoning.md). | Input: 200,000 <br> Output: 100,000 | May 31, 2024 |
| `o3-mini` (2025-01-31) | - [Enhanced reasoning abilities](../../openai/how-to/reasoning.md). <br> - Structured outputs.<br> - Text-only processing. <br> - Functions and tools. | Input: 200,000 <br> Output: 100,000 | October 2023 |
| `o1` (2024-12-17) | - [Enhanced reasoning abilities](../../openai/how-to/reasoning.md). <br> - Structured outputs.<br> - Text and image processing. <br> - Functions and tools. | Input: 200,000 <br> Output: 100,000 | October 2023 |
| `o1-preview`<sup>1</sup> (2024-09-12)<br>**Retired July 28, 2025** | Historical specifications. | Input: 128,000  <br> Output: 32,768 | October 2023 |
| `o1-mini`<sup>2</sup> (2024-09-12) | A faster and more cost-efficient option in the o1 series, ideal for coding tasks that require speed and lower resource consumption. <br> - Global Standard deployment available by default. <br> - Standard (regional) deployments are currently only available for select customers who received access as part of the `o1-preview` limited access release. | Input: 128,000  <br> Output: 65,536 | October 2023 |

<sup>1</sup> `o1-preview` is retired and isn't available for use or new deployments. See [Retired models](../../openai/concepts/retired-models.md).

<sup>2</sup> `o1-mini` is currently available to all customers for Global Standard deployment. Select customers were granted standard (regional) deployment access to `o1-mini` as part of the `o1-preview` limited access release. At this time, access to `o1-mini` standard (regional) deployments isn't being expanded.

`o3-deep-research` is currently only available with Foundry Agent Service. To learn more, see the [Deep Research tool guidance](https://learn.microsoft.com/azure/ai-foundry/agents/how-to/tools/deep-research).

To learn more about advanced o-series models, see [Getting started with reasoning models](../../openai/how-to/reasoning.md).

## GPT-4o and GPT-4 Turbo

GPT-4o integrates text and images in a single model, which enables it to handle multiple data types simultaneously. This multimodal approach enhances accuracy and responsiveness in human-computer interactions. GPT-4o matches GPT-4 Turbo in English text and coding tasks while offering superior performance in non-English language tasks and vision tasks, setting new benchmarks for AI capabilities.

For model availability across all regions, grouped by deployment category, see [Region availability for Foundry Models sold by Azure](models-sold-directly-by-azure-region-availability.md).

## GPT-4 and GPT-4 Turbo models

The listed models support the Chat Completions API. GPT-4o versions `2024-05-13`, `2024-08-06`, and `2024-11-20`, and GPT-4o-mini version `2024-07-18`, also support the [Responses API](../../openai/how-to/responses.md).

To learn how Azure OpenAI handles model version upgrades, see [Model versions](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-classic/openai/concepts/model-versions.md). To learn how to view and configure the model version settings of your GPT-4 deployments, see [Working with models](../../openai/how-to/working-with-models.md).

For model availability across all regions, grouped by deployment category, see [Region availability for Foundry Models sold by Azure](models-sold-directly-by-azure-region-availability.md).

### Capabilities

| Model ID | Description | Max request (tokens) | Training data (up to) |
| --- | :--- | :--- | :---: |
| `gpt-4o` (2024-11-20) <br> GPT-4o (Omni) | - Structured outputs.<br> - Text and image processing. <br> - JSON Mode. <br> - Parallel function calling. <br> - Enhanced accuracy and responsiveness. <br> - Parity with English text and coding tasks compared to GPT-4 Turbo with Vision. <br> - Superior performance in non-English languages and in vision tasks. <br> - Enhanced creative writing ability. | Input: 128,000  <br> Output: 16,384 | October 2023 |
| `gpt-4o` (2024-08-06) <br> GPT-4o (Omni) | - Structured outputs.<br> - Text and image processing. <br> - JSON Mode. <br> - Parallel function calling. <br> - Enhanced accuracy and responsiveness. <br> - Parity with English text and coding tasks compared to GPT-4 Turbo with Vision. <br> - Superior performance in non-English languages and in vision tasks. | Input: 128,000  <br> Output: 16,384 | October 2023 |
| `gpt-4o-mini` (2024-07-18) <br> GPT-4o mini | - Fast, inexpensive, capable model ideal for replacing GPT-3.5 Turbo series models. <br> - Text and image processing. <br>- JSON Mode. <br> - Parallel function calling. | Input: 128,000 <br> Output: 16,384 | October 2023 |
| `gpt-4o` (2024-05-13) <br> GPT-4o (Omni) | - Text and image processing. <br> - JSON Mode. <br> - Parallel function calling. <br> - Enhanced accuracy and responsiveness. <br> - Parity with English text and coding tasks compared to GPT-4 Turbo with Vision. <br> - Superior performance in non-English languages and in vision tasks. | Input: 128,000  <br> Output: 4,096 | October 2023 |
| `gpt-4`<sup>1</sup> (turbo-2024-04-09) <br>GPT-4 Turbo with Vision | New generally available model. <br> - Replacement for all previous GPT-4 preview models (`vision-preview`, `1106-Preview`, `0125-Preview`). <br> - [Feature availability](#gpt-4o-and-gpt-4-turbo) is currently different, depending on the method of input and the deployment type. | Input: 128,000  <br> Output: 4,096 | December 2023 |

<sup>1</sup> The provisioned version of `gpt-4` version `turbo-2024-04-09` is currently limited to text only. For more information on provisioned deployments, see [Provisioned guidance](../../openai/concepts/provisioned-throughput.md).

> **Caution:**
> We don't recommend that you use preview models in production. We'll upgrade all deployments of preview models to either future preview versions or to the latest stable, generally available version. Models that are designated preview don't follow the standard Azure OpenAI model lifecycle.

## Embeddings

`text-embedding-3-large` is the latest and most capable embedding model. You can't upgrade between embedding models. To move from `text-embedding-ada-002` to `text-embedding-3-large`, you need to generate new embeddings.

- `text-embedding-3-large`
- `text-embedding-3-small`
- `text-embedding-ada-002`

For model availability across all regions, grouped by deployment category, see [Region availability for Foundry Models sold by Azure](models-sold-directly-by-azure-region-availability.md).

### Capabilities

OpenAI reports that testing shows that both the large and small third generation embeddings models offer better average multi-language retrieval performance with the [MIRACL](https://github.com/project-miracl/miracl) benchmark. They still maintain performance for English tasks with the [MTEB](https://github.com/embeddings-benchmark/mteb) benchmark.

| Evaluation benchmark | `text-embedding-ada-002` | `text-embedding-3-small` | `text-embedding-3-large` |
| --- | --- | --- | --- |
| MIRACL average | 31.4 | 44.0 | 54.9 |
| MTEB average | 61.0 | 62.3 | 64.6 |

The third generation embeddings models support reducing the size of the embedding via a new `dimensions` parameter. Typically, larger embeddings are more expensive from a compute, memory, and storage perspective. When you can adjust the number of dimensions, you gain more control over overall cost and performance. The `dimensions` parameter isn't supported in all versions of the OpenAI 1.x Python library. To take advantage of this parameter, we recommend that you upgrade to the latest version: `pip install openai --upgrade`.

OpenAI's MTEB benchmark testing found that even when the third-generation model's dimensions are reduced to less than the 1,536 dimensions of `text-embedding-ada-002`, performance remains slightly better.

These models can be used only with Embedding API requests.

| Model ID | Max request (tokens) | Output dimensions | Training data (up to) |
| --- | --- | :---: | :---: |
| `text-embedding-ada-002` (version 2) | 8,192 | 1,536 | Sep 2021 |
| `text-embedding-ada-002` (version 1) | 2,046 | 1,536 | Sep 2021 |
| `text-embedding-3-large` | 8,192 | 3,072 | Sep 2021 |
| `text-embedding-3-small` | 8,192 | 1,536 | Sep 2021 |

> **Note:**
> When you send an array of inputs for embedding, the maximum number of input items in the array per call to the embedding endpoint is 2,048.

## Image generation models

The image generation models create images from text prompts that you provide. Image generation models include `gpt-image-1`, `gpt-image-1-mini`, `gpt-image-1.5`, `gpt-image-2`, `gpt-image-2.5-flare`, and `gpt-image-2.5-sunburst`.


For model availability across all regions, grouped by deployment category, see [Region availability for Foundry Models sold by Azure](models-sold-directly-by-azure-region-availability.md).

| Model ID | Max request (characters) |
| --- | :---: |
| `gpt-image-1` | 4,000 |
| `gpt-image-1-mini` | 4,000 |
| `gpt-image-1.5` | 4,000 |
| `gpt-image-2` | 4,000 |
| `gpt-image-2.5-flare` | 4,000 |
| `gpt-image-2.5-sunburst` | 4,000 |

## Video generation models

Sora-2 is an AI model from OpenAI that creates realistic and imaginative video scenes from text instructions. It's in preview.

| Model ID | Max request (characters) |
| --- | :---: |
| `sora-2` | 4,000 |

For model availability across all regions, grouped by deployment category, see [Region availability for Foundry Models sold by Azure](models-sold-directly-by-azure-region-availability.md).

## Audio models

Audio models in Azure OpenAI are available via the `realtime`, `completions`, and `audio` APIs.

For model availability across all regions, grouped by deployment category, see [Region availability for Foundry Models sold by Azure](models-sold-directly-by-azure-region-availability.md).

### GPT-4o audio models

The GPT-4o audio models are part of the GPT-4o model family and support either low-latency, *speech in, speech out* conversational interactions or audio generation.

> **Caution:**
> We don't recommend using preview models in production. We'll upgrade all deployments of preview models to either future preview versions or to the latest stable, generally available version. Models that are designated preview don't follow the standard Azure OpenAI model lifecycle.

Details about maximum request tokens and training data are available in the following table:

| Model ID | Description | Max request (tokens) | Training data (up to) |
| --- | --- | --- | --- |
| `gpt-4o-mini-audio-preview` (2024-12-17)<br>**Preview** | Audio model for audio and text generation. | Input: 128,000 <br> Output: 16,384 | September 2023 |
| `gpt-4o-audio-preview` (2024-12-17) | Audio model for audio and text generation. | Input: 128,000 <br> Output: 16,384 | September 2023 |
| `gpt-4o-realtime-preview` (2025-06-03) | Audio model for real-time audio processing. | Input: 32,000  <br> Output: 4,096 | October 2023 |
| `gpt-4o-realtime-preview` (2024-12-17) | Audio model for real-time audio processing. | Input: 16,000  <br> Output: 4,096 | October 2023 |
| `gpt-4o-mini-realtime-preview` (2024-12-17)<br>**Preview** | Audio model for real-time audio processing. | Input: 128,000  <br> Output: 4,096 | October 2023 |
| `gpt-audio`(2025-08-28)<br>`gpt-audio-mini`(2025-10-06) | Audio model for audio and text generation. | Input: 128,000  <br> Output: 16,384 | October 2023 |
| `gpt-realtime` (2025-08-28) (GA)<br>`gpt-realtime-mini` (2025-10-06)<br> `gpt-realtime-mini` (2025-12-15) | Audio model for real-time audio processing. | Input: 32,000  <br> Output: 4,096 | October 2023 |
| `gpt-audio-1.5` (2026-02-23) | Audio model for audio and text generation. | Input: 128,000  <br> Output: 16,384 | September 2024 |
| `gpt-realtime-1.5` (2026-02-23) | Audio model for real-time audio processing. | Input: 32,000  <br> Output: 4,096 | September 2024 |
| `gpt-realtime-translate` (2026-05-06) | Audio model for real-time multilingual translation with translated speech and text output. | Input: 32,000  <br> Output: 4,096 | September 2024 |
| `gpt-realtime-whisper` (2026-05-06) | Audio model for real-time low-latency transcription. | Input: 32,000  <br> Output: 4,096 | September 2024 |
| `gpt-live-transcribe` (2026-07-29) | Audio model for real-time low-latency transcription. Current recommended model for realtime transcription scenarios. | Input: 32,000  <br> Output: 4,096 | September 2024 |
| `gpt-realtime-2` (2026-05-07) | Audio model for real-time audio processing. | Input: 32,000  <br> Output: 4,096 | September 2024 |
| `gpt-realtime-2.1` (2026-07-07)<br>`gpt-realtime-2.1-mini` (2026-07-07) | Audio models for real-time audio processing. `gpt-realtime-2.1` is an incremental update over `gpt-realtime-2` with improved silence and noise handling. `gpt-realtime-2.1-mini` is a smaller variant. | Input: 32,000  <br> Output: 4,096 | September 2024 |

> **Note:**
> `gpt-realtime-translate`, `gpt-realtime-whisper`, and `gpt-live-transcribe` use duration-based billing. Most other realtime models use token-based input and output pricing. For current rates, see the [Azure OpenAI pricing page](https://azure.microsoft.com/pricing/details/cognitive-services/openai-service/).

### Audio API

The audio models via the `/audio` API can be used for speech to text, translation, and text to speech.

#### Speech-to-text models

| Model ID | Description | Max request (audio file size) |
| --- | --- | --- |
| `whisper` | General-purpose speech recognition model. | 25 MB |
| `gpt-transcribe` | Offline speech-to-text model for file transcription via `POST /v1/audio/transcriptions`. Supports language hints. | 25 MB |
| `gpt-4o-transcribe` (2025-03-20)<br>**Preview** | Speech-to-text model powered by GPT-4o. | 25 MB |
| `gpt-4o-mini-transcribe` (2025-03-20)<br>**Preview** | Speech-to-text model powered by GPT-4o mini. | 25 MB |
| `gpt-4o-transcribe-diarize` (2025-10-15)<br>**Preview** | Speech-to-text model with automatic speech recognition. | 25 MB |
| `gpt-4o-mini-transcribe` (2025-12-15)<br>**Preview** | Speech-to-text model with automatic speech recognition. Improved transcription accuracy and robustness. | 25 MB |

> **Important:**
> `gpt-transcribe` is an offline transcription model and isn't a Realtime API model. For streaming transcription, use `gpt-realtime-whisper` or `gpt-live-transcribe`.
> `gpt-realtime-whisper` and `gpt-live-transcribe` appear in the **GPT-4o audio models** table because they're Realtime API models, not `/audio` API speech-to-text models.


#### Speech translation models

| Model ID | Description | Max request (audio file size) |
| --- | --- | --- |
| `whisper` | General-purpose speech recognition model. | 25 MB |

#### Text-to-speech models (preview)

| Model ID | Description |
| --- | :--- |
| `tts`<br>**Preview** | Text-to-speech model optimized for speed. |
| `tts-hd`<br>**Preview** | Text-to-speech model optimized for quality. |
| `gpt-4o-mini-tts` (2025-03-20) | Text-to-speech model powered by GPT-4o mini.<br/><br/>You can guide the voice to speak in a specific style or tone. |
| `gpt-4o-mini-tts` (2025-12-15) | Text-to-speech model powered by GPT-4o mini.<br/><br/>You can guide the voice to speak in a specific style or tone. |

## Fine-tuning models



The following models are supported for fine-tuning:

| Model ID | Standard regions | Data Zone | Global | Developer | Methods | Status | Modality |
| --- | --- | --- | :---: | :---: | :---: | --- | --- |
| `gpt-4o-mini` <br> (2024-07-18) | North Central US <br> Sweden Central | US | ✅ | ✅ | SFT | GA | Text to text |
| `gpt-4o` <br> (2024-08-06) | East US2 <br> North Central US <br> Sweden Central | US | ✅ | ✅ | SFT, DPO | GA | Text and vision to text |
| `gpt-4.1` <br> (2025-04-14) | North Central US <br> Sweden Central | US | ✅ | ✅ | SFT, DPO | GA | Text and vision to text |
| `gpt-4.1-mini` <br> (2025-04-14) | North Central US <br> Sweden Central | US | ✅ | ✅ | SFT, DPO | GA | Text to text |
| `gpt-4.1-nano` (2025-04-14) | North Central US <br> Sweden Central | US | ✅ | ✅ | SFT, DPO | GA | Text to text |
| `o4-mini` <br> (2025-04-16) | East US2 <br> Sweden Central | US | ✅ | ✅ | RFT | GA | Text to text |
| `gpt-5` <br> (2025-08-07) | North Central US <br> Sweden Central | US | ✅ | ❌ | RFT | GA<sup>*</sup> | Text to text |
| `Ministral-3B` <br> (2411) | Not supported | US | ✅ | ❌ | SFT | GA | Text to text |
| `Qwen-32B` | Not supported | US | ✅ | ❌ | SFT | GA | Text to text |
| `Llama-3.3-70B-Instruct` | Not supported | US | ✅ | ❌ | SFT | GA | Text to text |
| `gpt-oss-20b` | Not supported | US | ✅ | ❌ | SFT | GA | Text to text |

<sup>*</sup> GPT-5 support for reinforcement fine-tuning is generally available, but access is gated and available by invitation only. Contact your Microsoft account team if you're interested in enrollment.

For Azure OpenAI models, you can also fine-tune a previously fine-tuned model, formatted as `base-model.ft-{jobid}`.

> **Note:**
> Open-source models (Ministral-3B, Qwen-32B, Llama-3.3-70B-Instruct, gpt-oss-20b) are only supported on Foundry resources and in the new Foundry UI. 


> **Note:**
> Global training provides [more affordable](https://aka.ms/aoai-pricing) training per token, but doesn't offer [data residency](https://aka.ms/data-residency). It's currently available to Foundry resources in the following regions:
>
>- Australia East
>- Brazil South
>- Canada Central
>- Canada East
>- East US
>- East US2
>- France Central
>- Germany West Central
>- Italy North
>- Japan East _(no vision support)_
>- Korea Central
>- North Central US
>- Norway East
>- Poland Central _(no 4.1-nano support)_
>- Southeast Asia
>- South Africa North
>- South Central US
>- South India
>- Spain Central
>- Sweden Central
>- Switzerland West
>- Switzerland North
>- UK South
>- West Europe
>- West US
>- West US3


## Assistants (preview)

For Assistants, you need a combination of a supported model and a supported region. Certain tools and capabilities require the latest models. The following table lists model-region combinations for standard deployment, including historical entries. Columns marked **Retired** describe historical availability, not models available for use or new deployments. See [Retired models](../../openai/concepts/retired-models.md) for retirement details.

For information on provisioned throughput unit availability, see [Provisioned throughput models](models-sold-directly-by-azure-region-availability.md?pivots=provisioned). The nonretired models and regions listed here can be used with both Assistants v1 and v2. You can use [Global Standard models](models-sold-directly-by-azure-region-availability.md) if they're supported in the following regions.

| Region | gpt-4o, 2024-05-13 | gpt-4o, 2024-08-06 | gpt-4o-mini, 2024-07-18 | gpt-4, 0613<br>**Retired** | gpt-4, 1106-Preview | gpt-4, 0125-Preview | gpt-4, turbo-2024-04-09 | gpt-4-32k, 0613<br>**Retired** | gpt-35-turbo, 0613<br>**Retired** | gpt-35-turbo, 1106 | gpt-35-turbo, 0125 | gpt-35-turbo-16k, 0613<br>**Retired** |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| australiaeast | - | - | - | ✅ | ✅ | - | - | ✅ | ✅ | ✅ | ✅ | ✅ |
| eastus | ✅ | ✅ | ✅ | - | - | ✅ | ✅ | - | ✅ | - | ✅ | ✅ |
| eastus2 | ✅ | ✅ | ✅ | - | ✅ | - | ✅ | - | ✅ | - | ✅ | ✅ |
| francecentral | - | - | - | ✅ | ✅ | - | - | ✅ | ✅ | ✅ | - | ✅ |
| japaneast | - | - | - | - | - | - | - | - | ✅ | - | ✅ | ✅ |
| norwayeast | - | - | - | - | ✅ | - | - | - | - | - | - | - |
| southindia | - | - | - | - | ✅ | - | - | - | - | ✅ | ✅ | - |
| swedencentral | ✅ | ✅ | ✅ | ✅ | ✅ | - | ✅ | ✅ | ✅ | ✅ | - | ✅ |
| uksouth | - | - | - | - | ✅ | ✅ | - | - | ✅ | ✅ | ✅ | ✅ |
| westus | ✅ | ✅ | ✅ | - | ✅ | - | ✅ | - | - | ✅ | ✅ | - |
| westus3 | ✅ | ✅ | ✅ | - | ✅ | - | ✅ | - | - | - | ✅ | - |

## Model retirement

For the latest information on model retirements, refer to the [Model retirement schedule](../../openai/concepts/model-retirement-schedule.md).

## Related content

- [Foundry Models from partners and community](models-from-partners.md)
- [Model retirement and deprecation](../../openai/concepts/model-retirements.md)
- [Learn more about working with Azure OpenAI models](../../openai/how-to/working-with-models.md)
- [Learn more about Azure OpenAI](models-sold-directly-by-azure.md)
- [Learn more about fine-tuning Azure OpenAI models](../../openai/how-to/fine-tuning.md)




**Applies to: azure-direct-others**



## Black Forest Labs models sold by Azure

Black Forest Labs (BFL) FLUX models bring state-of-the-art image generation to Microsoft Foundry, enabling you to generate and edit high-quality images from text prompts and reference images. FLUX models support a range of capabilities including text-to-image generation, multi-reference image editing, and in-context generation and editing. 

You can run these models through the BFL service provider API and through the [images/generations and images/edits endpoints](../../openai/reference-preview.md). 

To work with FLUX models in Foundry, see [Deploy and use FLUX models in Microsoft Foundry](../how-to/use-foundry-models-flux.md).

For model availability across all regions, grouped by deployment category, see [Region availability for Foundry Models sold by Azure](models-sold-directly-by-azure-region-availability.md).

| Model | Type & API endpoint | Capabilities |
| --- | --- | --- |
| `FLUX.2-flex` | **Image generation** <br> - [BFL service provider API](https://docs.bfl.ai/flux_2/flux2_text_to_image): `<resource-name>/providers/blackforestlabs/v1/flux-2-flex` | - **Input:** text and image (32,000 tokens and up to 10 images<sup>i</sup>) <br /> - **Output:** One Image <br /> - **Tool calling:** No <br /> - **Response formats:** Image (PNG and JPG) <br /> - **Key features:** Fine-grained control; multi-reference support for up to 10 images <br /> - **Additional parameters:** <br> `guidance`: Controls how closely the output follows the prompt. Minimum: 1.5, maximum: 10, default: 4.5. Higher = closer prompt adherence. <br> `steps`: Number of inference steps. Maximum: 50, default: 50.  Higher = more detail, slower. |
| `FLUX.2-pro` | **Image generation** <br> - [BFL service provider API](https://docs.bfl.ai/flux_2/flux2_text_to_image): `<resource-name>/providers/blackforestlabs/v1/flux-2-pro` | - **Input:** text and image (32,000 tokens and up to 8 images<sup>ii</sup>)  <br /> - **Output:** One Image  <br />  - **Tool calling:** No <br /> - **Response formats:** Image (PNG and JPG)  <br /> - **Key features:** Multi-reference support for up to 8 images; more grounded in real-world knowledge; greater output flexibility; enhanced performance <br /> - **Additional parameters:** *(In provider-specific API only)* Supports all parameters. |
| `FLUX.1-Kontext-pro` | **Image generation** <br> - [Image API](../../openai/reference-preview.md): `https://<resource-name>/openai/deployments/{deployment-id}/images/generations` <br> and <br> `https://<resource-name>/openai/deployments/{deployment-id}/images/edits` <br> <br> - [BFL service provider API](https://docs.bfl.ai/kontext/kontext_text_to_image): ` <resource-name>/providers/blackforestlabs/v1/flux-kontext-pro?api-version=preview ` | - **Input:** text and image (5,000 tokens and 1 image)  <br /> - **Output:** One Image  <br />  - **Tool calling:** No <br /> - **Response formats:** Image (PNG and JPG) <br /> - **Key features:** Character consistency, advanced editing <br /> - **Additional parameters:** *(In provider-specific API only)* `seed`, `aspect ratio`, `input_image`, `prompt_unsampling`, `safety_tolerance`, `output_format` |
| `FLUX-1.1-pro` | **Image generation** <br> - [Image API](../../openai/reference-preview.md): `https://<resource-name>/openai/deployments/{deployment-id}/images/generations` <br> <br> - [BFL service provider API](https://docs.bfl.ai/flux_models/flux_1_1_pro): ` <resource-name>/providers/blackforestlabs/v1/flux-pro-1.1?api-version=preview ` | - **Input:** text (5,000 tokens and 1 image)  <br /> - **Output:** One Image  <br />  - **Tool calling:** No <br /> - **Response formats:** Image (PNG and JPG) <br /> - **Key features:** Fast inference speed, strong prompt adherence, competitive pricing, scalable generation <br /> - **Additional parameters:** *(In provider-specific API only)* `width`, `height`, `prompt_unsampling`, `seed`, `safety_tolerance`, `output_format` |

<sup>i,ii</sup> Support for **multiple reference images** is available for FLUX.2 [pro] (Preview) and FLUX.2 [flex] (Preview) by using the API, but *not* in the playground.

## Cohere models sold by Azure

The Cohere family of models includes various models optimized for different use cases, including chat completions, rerank/text classification, and embeddings. Cohere models are optimized for various use cases that include reasoning, summarization, and question answering.

For model availability across all regions, grouped by deployment category, see [Region availability for Foundry Models sold by Azure](models-sold-directly-by-azure-region-availability.md).

| Model | Type | Capabilities |
| --- | --- | --- |
| `Cohere-parse-v5` <br> **Preview** | image-to-text | - **Input:** images, tables, and forms <br /> - **Output:** Markdown <br /> - **Languages:** `en`, `fr`, `es`, `it`, `de`, `pt-br`, `ja`, `ko`, `zh-cn`, and `ar` <br />  - **Tool calling:** No <br /> - **Response formats:** Markdown |
| `Cohere-rerank-v4.0-pro` | text classification (rerank) | - **Input:** text <br /> - **Output:** text <br /> - **Languages:** `en`, `fr`, `es`, `it`, `de`, `pt-br`, `ja`, `zh-cn`, `ar`, `vi`, `hi`, `ru`, `id`, and `nl` <br />  - **Tool calling:** No <br /> - **Response formats:** JSON |
| `Cohere-rerank-v4.0-fast` | text classification (rerank) | - **Input:** text <br /> - **Output:** text <br /> - **Languages:** `en`, `fr`, `es`, `it`, `de`, `pt-br`, `ja`, `zh-cn`, `ar`, `vi`, `hi`, `ru`, `id`, and `nl` <br />  - **Tool calling:** No <br /> - **Response formats:** JSON |
| `Cohere-command-a-plus-05-2026` <br> **Preview** | chat-completion <br> (with reasoning content) | - **Input:** text (128,000 tokens) <br /> - **Output:** text (64,000 tokens) <br /> - **Languages:** `en`, `fr`, `es`, `it`, `de`, `pt-br`, `ja`, `ko`, `zh-cn`, and `ar` <br />  - **Tool calling:** Yes <br /> - **Response formats:** Text |
| `Cohere-command-a` | chat-completion | - **Input:** text (131,072 tokens) <br /> - **Output:** text (8,182 tokens) <br /> - **Languages:** `en`, `fr`, `es`, `it`, `de`, `pt-br`, `ja`, `ko`, `zh-cn`, and `ar` <br />  - **Tool calling:** Yes <br /> - **Response formats:** Text, JSON |
| `embed-v-4-0` | embeddings | - **Input:** text (512 tokens) and images (2MM pixels) <br /> - **Output:** Vector (256, 512, 1024, 1536 dim.) <br /> - **Languages:** `en`, `fr`, `es`, `it`, `de`, `pt-br`, `ja`, `ko`, `zh-cn`, and `ar` |

## DeepSeek models sold by Azure

The DeepSeek family of models includes several reasoning models, which excel at reasoning tasks by using a step-by-step training process, such as language, scientific reasoning, and coding tasks.

For model availability across all regions, grouped by deployment category, see [Region availability for Foundry Models sold by Azure](models-sold-directly-by-azure-region-availability.md).

| Model | Type | Capabilities |
| --- | --- | --- |
| `DeepSeek-V4-Pro` | chat-completion <br /> (with reasoning content) | - **Input:** text (1,000,000 tokens) <br /> - **Output:** text (384,000 tokens) <br /> - **Languages:** `en` and `zh` <br />  - **Tool calling:** Yes <br /> - **Response formats:** Text, JSON |
| `DeepSeek-V4-Flash-0731` <br> **Preview** | chat-completion <br /> (with reasoning content) | - **Input:** text (1,000,000 tokens) <br /> - **Output:** text (384,000 tokens) <br /> - **Languages:** `en` and `zh` <br />  - **Tool calling:** Yes <br /> - **Response formats:** Text, JSON |
| `DeepSeek-V4-Flash` | chat-completion <br /> (with reasoning content) | - **Input:** text (1,000,000 tokens) <br /> - **Output:** text (384,000 tokens) <br /> - **Languages:** `en` and `zh` <br />  - **Tool calling:** Yes <br /> - **Response formats:** Text, JSON |
| `DeepSeek-V3.2-Speciale` | chat-completion <br /> (with reasoning content) | - **Input:** text (128,000 tokens) <br /> - **Output:** text (128,000 tokens) <br /> - **Languages:** `en` and `zh` <br />  - **Tool calling:** Yes <br /> - **Response formats:** Text, JSON |
| `DeepSeek-V3.2` | chat-completion <br /> (with reasoning content) | - **Input:** text (128,000 tokens) <br /> - **Output:** text (128,000 tokens) <br /> - **Languages:** `en` and `zh` <br />  - **Tool calling:** Yes <br /> - **Response formats:** Text, JSON |

## Meta models sold by Azure

Meta Llama models and tools are a collection of pretrained and fine-tuned generative AI text and image reasoning models. Meta models range in scale to include:

- Small language models (SLMs) like 1B and 3B Base and Instruct models for on-device and edge inferencing
- Mid-size large language models (LLMs) like 7B, 8B, and 70B Base and Instruct models
- High-performance models like Meta Llama 3.1-405B Instruct for synthetic data generation and distillation use cases.

For model availability across all regions, grouped by deployment category, see [Region availability for Foundry Models sold by Azure](models-sold-directly-by-azure-region-availability.md).

| Model | Type | Capabilities |
| --- | --- | --- |
| `Llama-4-Maverick-17B-128E-Instruct-FP8` | chat-completion | - **Input:** text and images (1M tokens) <br /> - **Output:** text (1M tokens) <br /> - **Languages:** `ar`, `en`, `fr`, `de`, `hi`, `id`, `it`, `pt`, `es`, `tl`, `th`, and `vi` <br />  - **Tool calling:** No <br /> - **Response formats:** Text |
| `Llama-3.3-70B-Instruct` | chat-completion | - **Input:** text (128,000 tokens) <br /> - **Output:** text (8,192 tokens) <br /> - **Languages:** `en`, `de`, `fr`, `it`, `pt`, `hi`, `es`, and `th` <br />  - **Tool calling:** No <br /> - **Response formats:** Text |

Several Meta models are also available [from partners and community](models-from-partners.md#meta).

## Microsoft models sold by Azure

Microsoft models include various model groups such as Model Router, MAI models, Phi models, healthcare AI models, and more. Several Microsoft models are also available [from partners and community](models-from-partners.md#microsoft).

To work with MAI models, see these how-to articles:

- MAI models available in Foundry: [MAI-Image models](../how-to/use-foundry-models-mai-image.md) and [MAI-Thinking models](../how-to/use-foundry-models-mai-thinking.md).
- MAI models available through Azure Speech in Foundry Tools: [MAI-Voice](https://learn.microsoft.com/azure/ai-services/speech-service/mai-voices) and [MAI-Transcribe](https://learn.microsoft.com/azure/ai-services/speech-service/mai-transcribe).

For model availability across all regions, grouped by deployment category, see [Region availability for Foundry Models sold by Azure](models-sold-directly-by-azure-region-availability.md).

| Model | Type | Capabilities |
| --- | --- | --- |
| `MAI-Thinking-1` <br> **Preview** | chat-completion <br /> (with reasoning content). See [API endpoints](../how-to/use-foundry-models-mai-thinking.md#api-endpoints) for details. | - **Input:** text. <br /> - **Output:** text (up to 64,000 tokens). <br /> - **Context length:** 256,000 tokens <br /> - **Tool calling:** Yes. <br /> - **Response formats:** Text. <br /> - **Key features:** OpenAI Chat Completions compatibility; Encrypted Chain-of-Thought |
| `MAI-Image-2.6-Flash` <br> **Preview** | Image-to-Image and Text-to-Image. See [API endpoints](../how-to/use-foundry-models-mai-image.md) for details. | - **Input:** text and up to five images (JPEG or PNG format for image editing workflows) <br /> - **Output:** One image <br /> - **Context length**: 32,000 tokens <br /> - **Tool calling:** No <br /> - **Response formats:** Image (PNG) <br /> - **Languages:** `en` <br /> - **Key features:** High-quality text-to-image generation; Image editing that supports precise, surgical edits without disrupting the rest of the image; Capability to generate realistic imagery with consistent visual structure. Well suited for tasks such as concept visualization, creative content generation, image editing workflows, and production design. <br /> - **Parameters:** `width`, `height`, `prompt`, `auto_aspect_ratio`, `web_grounding` <br /> Minimum 768×768 pixels; maximum total pixel count 2,359,296 (equivalent to 1536×1536). Either dimension can exceed 1536 as long as the total pixel count stays within the limit. |
| `MAI-Image-2.6` <br> **Preview** | Image-to-Image and Text-to-Image. See [API endpoints](../how-to/use-foundry-models-mai-image.md) for details. | - **Input:** text and up to five images (JPEG or PNG format for image editing workflows) <br /> - **Output:** One image <br /> - **Context length**: 32,000 tokens <br /> - **Tool calling:** No <br /> - **Response formats:** Image (PNG) <br /> - **Languages:** `en` <br /> - **Key features:** High-quality text-to-image generation; Image editing that supports precise, surgical edits without disrupting the rest of the image; Capability to generate realistic imagery with consistent visual structure. Well suited for tasks such as concept visualization, creative content generation, image editing workflows, and production design. <br /> - **Parameters:** `width`, `height`, `prompt`, `auto_aspect_ratio`, `web_grounding` <br /> Minimum 768×768 pixels; maximum total pixel count 2,359,296 (equivalent to 1536×1536). Either dimension can exceed 1536 as long as the total pixel count stays within the limit. |
| `MAI-Image-2.5-Pro` <br> **Preview** | Image-to-Image and Text-to-Image. See [API endpoints](../how-to/use-foundry-models-mai-image.md) for details. | - **Input:** text and up to five images (JPEG or PNG format for image editing workflows) <br /> - **Output:** One image <br /> - **Context length**: 32,000 tokens <br /> - **Tool calling:** No <br /> - **Response formats:** Image (PNG) <br /> - **Languages:** `en` <br /> - **Key features:** High-quality text-to-image generation; Image editing that supports precise, surgical edits without disrupting the rest of the image; Capability to generate more photo-realistic imagery with consistent visual structure than previous models. Well suited for tasks such as concept visualization, creative content generation, image editing workflows, and production design.  <br /> - **Parameters:** `width`, `height`, `prompt` <br /> Minimum 768×768 pixels; maximum total pixel count 1,048,576 (equivalent to 1024×1024). Either dimension can exceed 1024 as long as the total pixel count stays within the limit (for example, 768×1365 is a valid size). |
| `MAI-Image-2.5-Flash` <br> **Preview** | Image-to-Image and Text-to-Image. See [API endpoints](../how-to/use-foundry-models-mai-image.md) for details. | - **Input:** text and up to five images (JPEG or PNG format for image editing workflows) <br /> - **Output:** One image <br /> - **Context length**: 32,000 tokens <br /> - **Tool calling:** No <br /> - **Response formats:** Image (PNG) <br /> - **Languages:** `en` <br /> - **Key features:** High-quality text-to-image generation; Image editing that supports precise, surgical edits without disrupting the rest of the image; Capability to generate realistic imagery with consistent visual structure. Well suited for tasks such as concept visualization, creative content generation, image editing workflows, and production design.  <br /> - **Parameters:** `width`, `height`, `prompt` <br /> Minimum 768×768 pixels; maximum total pixel count 1,048,576 (equivalent to 1024×1024). Either dimension can exceed 1024 as long as the total pixel count stays within the limit (for example, 768×1365 is a valid size). |
| `MAI-Image-2.5` <br> **Preview** | Image-to-Image and Text-to-Image. See [API endpoints](../how-to/use-foundry-models-mai-image.md) for details. | - **Input:** text and up to five images (JPEG or PNG format for image editing workflows) <br /> - **Output:** One image <br /> - **Context length**: 32,000 tokens <br /> - **Tool calling:** No <br /> - **Response formats:** Image (PNG) <br /> - **Languages:** `en` <br /> - **Key features:** High-quality text-to-image generation; Image editing that supports precise, surgical edits without disrupting the rest of the image; Capability to generate realistic imagery with consistent visual structure. Well suited for tasks such as concept visualization, creative content generation, image editing workflows, and production design. <br /> - **Parameters:** `width`, `height`, `prompt` <br /> Minimum 768×768 pixels; maximum total pixel count 1,048,576 (equivalent to 1024×1024). Either dimension can exceed 1024 as long as the total pixel count stays within the limit (for example, 768×1365 is a valid size). |
| `model-router`<sup>1</sup> | chat-completion | More details in [Model router overview](https://learn.microsoft.com/azure/ai-foundry/openai/how-to/model-router). <br> - **Input:** text, image <br /> - **Output:** text (max output tokens varies<sup>2</sup>) <br> **Context window:** 200,000<sup>3</sup> <br /> - **Languages:** `en` |

<sup>1</sup> **Model router version** `2025-11-18`.

<sup>2</sup> **Max output tokens** varies for underlying models in the model router. For example, 32,768 (`GPT-4.1 series`), 100,000 (`o4-mini`), 128,000 (`gpt-5 reasoning models`), and 16,384 (`gpt-5-chat`).

<sup>3</sup> Larger **context windows** are compatible with *some* of the underlying models of the Model Router. That means an API call with a larger context succeeds only if the prompt gets routed to one of such models. Otherwise, the call fails.

## Mistral models sold by Azure

For model availability across all regions, grouped by deployment category, see [Region availability for Foundry Models sold by Azure](models-sold-directly-by-azure-region-availability.md).

| Model | Type | Capabilities |
| --- | --- | --- |
| `mistral-document-ai-2512` | Image-to-Text | - **Input:** image or PDF pages (30 pages, max 30MB PDF file) <br /> - **Output:** text  <br /> - **Languages:** `en` <br />  - **Tool calling:** no  <br /> - **Response formats:** Text, JSON, Markdown |
| `mistral-medium-3-5` <br> **Preview** | chat-completion | - **Input:** text (128,000 tokens), image <br /> - **Output:** text (128,000 tokens) <br /> - **Tool calling:** No <br /> - **Response formats:** Text, JSON |
| `mistral-ocr-4-0` <br> **Preview** | Image-to-Text | - **Input:** image or PDF pages (30 pages, max 30MB PDF file) <br /> - **Output:** text  <br /> - **Languages:** `en` <br />  - **Tool calling:** no  <br /> - **Response formats:** Text, JSON, Markdown |
| `Mistral-Large-3` <br> **Preview** | chat-completion | - **Input:** text, image <br /> - **Output:** text  <br /> - **Languages:** `en`, `fr`, `de`, `es`, `it`, `pt`, `nl`, `zh`, `ja`, `ko`, and `ar` <br />  - **Tool calling:** Yes <br /> - **Response formats:** Text, JSON |

Several Mistral models are also available [from partners and community](models-from-partners.md#mistral-ai).

## Moonshot AI models sold by Azure

Moonshot AI models include Kimi K2.6 (Preview) and Kimi K2.5 (Preview), multimodal reasoning models that accept text and image input. 

For model availability across all regions, grouped by deployment category, see [Region availability for Foundry Models sold by Azure](models-sold-directly-by-azure-region-availability.md).

| Model | Type | Capabilities |
| --- | --- | --- |
| `Kimi-K2.7-Code` <br> **Preview** | chat-completion <br /> (with reasoning content) | - **Input:** text and image (262,144 tokens) <br /> - **Output:** text (262,144 tokens) <br /> - **Languages:** `en` and `zh` <br />  - **Tool calling:** Yes <br /> - **Response formats:** Text |
| `Kimi-K2.6` <br> **Preview** | chat-completion <br /> (with reasoning content) | - **Input:** text and image (262,144 tokens) <br /> - **Output:** text (262,144 tokens) <br /> - **Languages:** `en` and `zh` <br />  - **Tool calling:** Yes <br /> - **Response formats:** Text |
| `Kimi-K2.5` <br> **Preview** | chat-completion <br /> (with reasoning content) | - **Input:** text and image (262,144 tokens) <br /> - **Output:** text (262,144 tokens) <br /> - **Languages:** `en` and `zh` <br />  - **Tool calling:** Yes <br /> - **Response formats:** Text |

See [this model collection in the Foundry portal](https://ai.azure.com/explore/models?&selectedCollection=Moonshot+ai/?cid=learnDocs).

## SpaceXAI models sold by Azure

SpaceXAI's Grok models in Foundry Models include a diverse set of reasoning and non-reasoning models designed for enterprise use cases such as data extraction, coding, text summarization, and agentic applications.

To work with Grok models, see [Deploy and use Grok models in Foundry](../how-to/use-foundry-models-grok.md).

> **Note:**
> Generally available SpaceXAI Grok models starting with Grok 4.7 are available for a minimum of six months. Earlier Grok models retain their existing lifecycle commitments. For model-specific retirement dates, see the [Model retirement schedule](../../openai/concepts/model-retirement-schedule.md).

[Registration is required for access to](https://aka.ms/xai/grok-4) `grok-code-fast-1` and `grok-4`.

For current rates and billing details, see [Grok model pricing](https://azure.microsoft.com/pricing/details/ai-foundry-models/grok/).

For model availability across all regions, grouped by deployment category, see [Region availability for Foundry Models sold by Azure](models-sold-directly-by-azure-region-availability.md).

| Model | Type | Capabilities |
| --- | --- | --- |
| `grok-4.7` | Chat Completions API <br /> Responses API | - **Input:** text, image (500,000 tokens) <br /> - **Output:** text (500,000 tokens) <br /> - **Context window:** 500,000 tokens (input and output combined)<br> - **Languages:** `en` <br />  - **Tool calling:** yes <br /> - **Response formats:** text, JSON |
| `grok-4.6` <br> **Preview** | chat-completion | - **Input:** text, image <br /> - **Output:** text (128,000 tokens max) <br /> - **Context window:** 200,000 tokens<br> - **Languages:** `en` <br />  - **Tool calling:** yes <br /> - **Response formats:** text, JSON |
| `grok-4.3` <br> **Preview** | chat-completion | - **Input:** text (200,000 tokens) <br /> - **Output:** text (8,192 tokens) <br /> - **Languages:** `en` <br />  - **Tool calling:** yes <br /> - **Response formats:** text |
| `grok-4-20-reasoning` <br> **Preview** | chat-completion | - **Input:** text (262,000 tokens) <br /> - **Output:** text (8,192 tokens) <br /> - **Languages:** `en` <br />  - **Tool calling:** yes <br /> - **Response formats:** text |
| `grok-4-20-non-reasoning` <br> **Preview** | chat-completion | - **Input:** text (262,000 tokens) <br /> - **Output:** text (8,192 tokens) <br /> - **Languages:** `en` <br />  - **Tool calling:** yes <br /> - **Response formats:** text |
| `grok-4.1-fast-reasoning` | chat-completion | - **Input:** text, image (128,000 tokens) <br /> - **Output:** text (128,000 tokens) <br /> - **Languages:** `en` <br />  - **Tool calling:** yes <br /> - **Response formats:** text |
| `grok-4.1-fast-non-reasoning` | chat-completion | - **Input:** text, image (128,000 tokens) <br /> - **Output:** text (128,000 tokens) <br /> - **Languages:** `en` <br />  - **Tool calling:** yes <br /> - **Response formats:** text |
| `grok-4` | chat-completion | - **Input:** text (262,000 tokens) <br /> - **Output:** text (8,192 tokens) <br /> - **Languages:** `en` <br />  - **Tool calling:** yes <br /> - **Response formats:** text |
| `grok-code-fast-1` | chat-completion | - **Input:** text (256,000 tokens) <br /> - **Output:** text (8,192 tokens) <br /> - **Languages:** `en` <br />  - **Tool calling:** yes <br /> - **Response formats:** text |


## Related content

- [Foundry Models from partners and community](models-from-partners.md)
- [Microsoft Foundry Models lifecycle and support policy](../../openai/concepts/model-retirements.md)
- [Deployment overview for Foundry Models](../../../foundry-classic/concepts/deployments-overview.md)
- [Add and configure models to Foundry Models](../how-to/create-model-deployments.md)
- [Deployment types in Foundry Models](deployment-types.md)
