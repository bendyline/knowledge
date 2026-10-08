---
title: MAI-Transcribe-2-Streaming overview - Speech Service
titleSuffix: Foundry Tools
description: Learn about MAI-Transcribe-2-Streaming and choose between the Realtime API and Azure Speech SDK.
manager: mcleans
author: PatrickFarley
ms.author: pafarley
ms.service: azure-speech-foundry-tools
ms.topic: overview
ms.date: 09/30/2026
ms.custom: references_regions
ai-usage: ai-assisted

# Customer intent: As a developer, I want to choose an integration method for transcribing live audio with MAI-Transcribe-2-Streaming.
---

# MAI-Transcribe-2-Streaming overview


> **Note:**
> This feature is currently in public preview. This preview is provided without a service-level agreement, and is not recommended for production workloads. Certain features might not be supported or might have constrained capabilities. For more information, see [Supplemental Terms of Use for Microsoft Azure Previews](https://azure.microsoft.com/support/legal/preview-supplemental-terms/).


MAI-Transcribe-2-Streaming is a low-latency speech-to-text model for real-time transcription. Send audio as a continuous stream and receive incremental transcripts while the speaker talks. Intermediate results update the current transcription, and final results confirm each segment.

The model supports live audio workloads such as call centers, voice assistants, meeting and lecture captioning, voice-driven interfaces, and real-time note taking.

## Choose an integration method

| Integration | Use when | Guide |
| --- | --- | --- |
| Realtime API | Your application uses an OpenAI Realtime-compatible WebSocket integration. | [Use MAI-Transcribe-2-Streaming with the Realtime API](mai-transcribe-2-streaming-realtime.md) |
| Azure Speech SDK | You want a managed client library for connection management, retries, and audio streaming. | [Use MAI-Transcribe-2-Streaming with Azure Speech SDK](mai-transcribe-2-streaming-speech-sdk.md) |

Both integration methods support the `MAI-Transcribe-2-Streaming` model and return intermediate and final transcription results.

## Availability and regions

You can access MAI-Transcribe-2-Streaming globally. Azure serves the model from the following regions and routes requests to them for each integration method.

| Region | Region identifier | Availability |
| --- | --- | --- |
| Sweden Central | `swedencentral` | Available |
| Central US | `centralus` | Available |
| East US 2 | `eastus2` | Available |
| Southeast Asia | `southeastasia` | Available |

## Language support

By default, the model operates in multilingual mode with language auto-detection. The following languages are currently supported:



| Language code | Language | MAI-Transcribe-1.5 support | MAI-Transcribe-2 support |
| --- | --- | --- | --- |
| `af` | Afrikaans |  | ✅ |
| `ar` | Arabic | ✅ | ✅ |
| `as` | Assamese | ✅ | ✅ |
| `az` | Azerbaijani |  | ✅ |
| `bg` | Bulgarian | ✅ | ✅ |
| `bn` | Bengali | ✅ | ✅ |
| `bs` | Bosnian |  | ✅ |
| `ca` | Catalan | ✅ | ✅ |
| `cs` | Czech | ✅ | ✅ |
| `da` | Danish | ✅ | ✅ |
| `de` | German | ✅ | ✅ |
| `el` | Greek | ✅ | ✅ |
| `en` | English | ✅ | ✅ |
| `es` | Spanish | ✅ | ✅ |
| `et` | Estonian | ✅ | ✅ |
| `fa` | Persian |  | ✅ |
| `fi` | Finnish | ✅ | ✅ |
| `fil` | Filipino |  | ✅ |
| `fr` | French | ✅ | ✅ |
| `gl` | Galician |  | ✅ |
| `gu` | Gujarati | ✅ | ✅ |
| `he` | Hebrew |  | ✅ |
| `hi` | Hindi | ✅ | ✅ |
| `hu` | Hungarian | ✅ | ✅ |
| `hy` | Armenian |  | ✅ |
| `id` | Indonesian | ✅ | ✅ |
| `is` | Icelandic |  | ✅ |
| `it` | Italian | ✅ | ✅ |
| `ja` | Japanese | ✅ | ✅ |
| `kk` | Kazakh |  | ✅ |
| `kn` | Kannada | ✅ | ✅ |
| `ko` | Korean | ✅ | ✅ |
| `lt` | Lithuanian | ✅ | ✅ |
| `lv` | Latvian |  | ✅ |
| `mk` | Macedonian |  | ✅ |
| `ml` | Malayalam | ✅ | ✅ |
| `mr` | Marathi | ✅ | ✅ |
| `ms` | Malay |  | ✅ |
| `nb` | Norwegian Bokmål | ✅ | ✅ |
| `ne` | Nepali |  | ✅ |
| `nl` | Dutch | ✅ | ✅ |
| `or` | Odia | ✅ | ✅ |
| `pa` | Punjabi (Gurmukhi script) | ✅ | ✅ |
| `pl` | Polish | ✅ | ✅ |
| `pt` | Portuguese | ✅ | ✅ |
| `ro` | Romanian | ✅ | ✅ |
| `ru` | Russian | ✅ | ✅ |
| `sk` | Slovak | ✅ | ✅ |
| `sl` | Slovenian | ✅ | ✅ |
| `sv` | Swedish | ✅ | ✅ |
| `sw` | Swahili |  | ✅ |
| `ta` | Tamil | ✅ | ✅ |
| `te` | Telugu | ✅ | ✅ |
| `th` | Thai | ✅ | ✅ |
| `tr` | Turkish | ✅ | ✅ |
| `uk` | Ukrainian | ✅ | ✅ |
| `ur` | Urdu |  | ✅ |
| `vi` | Vietnamese | ✅ | ✅ |
| `yue` | Cantonese |  | ✅ |
| `zh` | Chinese (simplified) | ✅ | ✅ |
