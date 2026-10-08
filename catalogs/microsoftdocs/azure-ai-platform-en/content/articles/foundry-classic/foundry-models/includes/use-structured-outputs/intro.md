---
ms.service: microsoft-foundry
ms.subservice: foundry-model-inference
ms.topic: include
ms.date: 05/29/2025
ms.reviewer: fasantia
reviewer: santiagxf
ms.author: mopeakande
author: msakande
ms.custom: include
---

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-studio/includes/feature-preview.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-classic/foundry-models/includes/use-structured-outputs/intro.md)

Free-form outputs of language models can be difficult to parse by software applications. Structured outputs, like JSON, provide a clear format that software applications can read and process. This article explains how to use structured outputs to generate specific JSON schemas with the chat completions API for models deployed in Microsoft Foundry Models.

The following list describes typical scenarios where structured outputs are useful:

* You need to extract specific information from a prompt and such information can be described as a schema with specific keys and types.
* You need to parse information contained in the prompts.
* You're using the model to control a workflow in your application where you can benefit from more rigid structures.
* You're using the model as a zero-shot or few-shot learner.

## Prerequisites

To use structured outputs with chat completions models in your application, you need:


- An Azure subscription.

- A Foundry project. This kind of project is managed under a Foundry resource. If you don't have a Foundry project, see [Create a project for Foundry (Foundry projects)](../../../how-to/create-projects.md).

- The endpoint's URL.

- The endpoint's key (if you choose to use API key for authentication).



* A chat completions model deployment with JSON and structured outputs support. If you don't have one, read [Add and configure Foundry Models](../../how-to/create-model-deployments.md).

    * You can check which models support structured outputs by checking the column **Response format** in the [Models](../../concepts/models-sold-directly-by-azure.md) article.

    * This article uses `gpt-4o`.
