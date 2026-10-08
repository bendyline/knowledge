---
title: "Audio events reference (classic)"
description: "Learn how to use events with the Realtime API and Voice Live API. (classic)"
manager: mcleans
ms.service: microsoft-foundry
ms.subservice: foundry-openai
ms.topic: reference
ms.date: 01/29/2026
author: PatrickFarley
ms.author: pafarley
recommendations: false
ai-usage: ai-assisted
ms.custom:
  - classic-and-new
ROBOTS: NOINDEX, NOFOLLOW
---

# Audio events reference (classic)

**Currently viewing:**  **Foundry (classic) portal version** - [Switch to version for the new Foundry portal](../../foundry/openai/realtime-audio-reference.md)


> **Note:**
> Links in this article might open content in the new Microsoft Foundry documentation instead of the Foundry (classic) documentation you're viewing now.



The Azure OpenAI Realtime API follows the OpenAI Realtime API specification. For the full API reference, see the [OpenAI Realtime API reference](https://developers.openai.com/api/reference/resources/realtime).

> **Note:**
> **Azure deviation:** The accepted values for the `model` field in `input_audio_transcription` settings differ from the OpenAI reference. Azure OpenAI requires the name of the existing model deployment for the field, like `my-gpt-4o-transcribe-deployment`. See details about [Model deployment via Foundry Portal](../../foundry/foundry-models/how-to/deploy-foundry-models.md) or 
[with code](../../foundry/foundry-models/how-to/create-model-deployments.md?pivots=programming-language-cli).
