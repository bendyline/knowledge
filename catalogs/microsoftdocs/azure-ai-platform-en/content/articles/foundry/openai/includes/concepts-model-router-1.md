---
title: Include file
description: Include file
author: PatrickFarley
ms.reviewer: sgilley
ms.author: pafarley
ms.service: microsoft-foundry
ms.topic: include
ms.date: 08/12/2026
ms.custom: include
ai-usage: ai-assisted
---

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

If you select **Auto-update** at the deployment step (see [Model updates](../how-to/working-with-models.md#model-updates)), your model router deployment automatically updates when new versions become available. When that happens, the set of underlying models also changes, which could affect the overall performance of the model and costs.



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
