---
title: "Realtime API reference"
description: "Reference for the Azure OpenAI Realtime API events, with notes on Azure-specific deviations from the OpenAI specification."
manager: mcleans
ms.service: microsoft-foundry
ms.subservice: foundry-openai
ms.topic: reference
ms.date: 05/13/2026
author: PatrickFarley
ms.author: pafarley
recommendations: false
ai-usage: ai-assisted
ms.custom:
  - classic-and-new
  - doc-kit-assisted
---

# Realtime API reference


The Azure OpenAI Realtime API follows the OpenAI Realtime API specification. For the full API reference, see the [OpenAI Realtime API reference](https://developers.openai.com/api/reference/resources/realtime).

> **Note:**
> **Azure deviation:** The accepted values for the `model` field in `input_audio_transcription` settings differ from the OpenAI reference. Azure OpenAI requires the name of the existing model deployment for the field, like `my-gpt-4o-transcribe-deployment`. See details about [Model deployment via Foundry Portal](../foundry-models/how-to/deploy-foundry-models.md) or 
[with code](../foundry-models/how-to/create-model-deployments.md?pivots=programming-language-cli).
