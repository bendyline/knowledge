---
title: "How to use post-processing - Speech service"
titleSuffix: Foundry Tools
description: Learn how to configure post-processing options for speech recognition results.
author: emilyjiji
manager: mcleans
ms.service: azure-speech-foundry-tools
ms.topic: how-to
ms.date: 07/22/2026
ms.author: emilyjiji
ms.devlang: cpp
ms.custom: devx-track-extended-java, devx-track-go, devx-track-js, devx-track-python
zone_pivot_groups: programming-languages-speech-services
---

# How to use post-processing

> **Note:**
> Monolingual post-stream refinement is generally available. Multilingual post-stream refinement is in **public preview**. Preview features are provided without a service-level agreement and aren't recommended for production workloads. Some features might not be supported or might have constrained capabilities. For more information, see [Supplemental Terms of Use for Microsoft Azure Previews](https://azure.microsoft.com/support/legal/preview-supplemental-terms/).

**Applies to: programming-language-csharp**


## Change post-processing option


The Speech service can apply post-processing to recognition results before they're returned. You can control which post-processing option is used by setting the `SpeechServiceResponse_PostProcessingOption` property on the `SpeechConfig` instance used to create a `SpeechRecognizer`.

The following values are supported:

| Value | Description |
| --- | --- |
| `TrueText` | Applies display formatting to recognition results, including punctuation and capitalization, to produce more readable output. |
| `PostRefinement` | Gives you more accurate final transcription results with no impact to first-token latency. A second recognition pass runs in parallel with real-time streaming. Intermediate results stay low-latency. Only the final result for each segment is replaced with a more accurate version. Monolingual post-stream refinement is generally available. Multilingual post-stream refinement is in public preview. Region availability differs between the two modes. For more information, see [Speech service regions](regions.md?tabs=stt). |


**Example:** To enable TrueText post-processing:

```csharp
speechConfig.SetProperty(PropertyId.SpeechServiceResponse_PostProcessingOption, "TrueText");
```



**Applies to: programming-language-cpp**


## Change post-processing option


The Speech service can apply post-processing to recognition results before they're returned. You can control which post-processing option is used by setting the `SpeechServiceResponse_PostProcessingOption` property on the `SpeechConfig` instance used to create a `SpeechRecognizer`.

The following values are supported:

| Value | Description |
| --- | --- |
| `TrueText` | Applies display formatting to recognition results, including punctuation and capitalization, to produce more readable output. |
| `PostRefinement` | Gives you more accurate final transcription results with no impact to first-token latency. A second recognition pass runs in parallel with real-time streaming. Intermediate results stay low-latency. Only the final result for each segment is replaced with a more accurate version. Monolingual post-stream refinement is generally available. Multilingual post-stream refinement is in public preview. Region availability differs between the two modes. For more information, see [Speech service regions](regions.md?tabs=stt). |


**Example:** To enable TrueText post-processing:

```cpp
speechConfig->SetProperty(PropertyId::SpeechServiceResponse_PostProcessingOption, "TrueText");
```



**Applies to: programming-language-go**


## Change post-processing option


The Speech service can apply post-processing to recognition results before they're returned. You can control which post-processing option is used by setting the `SpeechServiceResponse_PostProcessingOption` property on the `SpeechConfig` instance used to create a `SpeechRecognizer`.

The following values are supported:

| Value | Description |
| --- | --- |
| `TrueText` | Applies display formatting to recognition results, including punctuation and capitalization, to produce more readable output. |
| `PostRefinement` | Gives you more accurate final transcription results with no impact to first-token latency. A second recognition pass runs in parallel with real-time streaming. Intermediate results stay low-latency. Only the final result for each segment is replaced with a more accurate version. Monolingual post-stream refinement is generally available. Multilingual post-stream refinement is in public preview. Region availability differs between the two modes. For more information, see [Speech service regions](regions.md?tabs=stt). |


**Example:** To enable TrueText post-processing:

```go
speechConfig.SetProperty(common.SpeechServiceResponsePostProcessingOption, "TrueText")
```



**Applies to: programming-language-java**


## Change post-processing option


The Speech service can apply post-processing to recognition results before they're returned. You can control which post-processing option is used by setting the `SpeechServiceResponse_PostProcessingOption` property on the `SpeechConfig` instance used to create a `SpeechRecognizer`.

The following values are supported:

| Value | Description |
| --- | --- |
| `TrueText` | Applies display formatting to recognition results, including punctuation and capitalization, to produce more readable output. |
| `PostRefinement` | Gives you more accurate final transcription results with no impact to first-token latency. A second recognition pass runs in parallel with real-time streaming. Intermediate results stay low-latency. Only the final result for each segment is replaced with a more accurate version. Monolingual post-stream refinement is generally available. Multilingual post-stream refinement is in public preview. Region availability differs between the two modes. For more information, see [Speech service regions](regions.md?tabs=stt). |


**Example:** To enable TrueText post-processing:

```java
speechConfig.setProperty(PropertyId.SpeechServiceResponse_PostProcessingOption, "TrueText");
```



**Applies to: programming-language-javascript**


## Change post-processing option


The Speech service can apply post-processing to recognition results before they're returned. You can control which post-processing option is used by setting the `SpeechServiceResponse_PostProcessingOption` property on the `SpeechConfig` instance used to create a `SpeechRecognizer`.

The following values are supported:

| Value | Description |
| --- | --- |
| `TrueText` | Applies display formatting to recognition results, including punctuation and capitalization, to produce more readable output. |
| `PostRefinement` | Gives you more accurate final transcription results with no impact to first-token latency. A second recognition pass runs in parallel with real-time streaming. Intermediate results stay low-latency. Only the final result for each segment is replaced with a more accurate version. Monolingual post-stream refinement is generally available. Multilingual post-stream refinement is in public preview. Region availability differs between the two modes. For more information, see [Speech service regions](regions.md?tabs=stt). |


**Example:** To enable TrueText post-processing:

```javascript
speechConfig.setProperty(sdk.PropertyId.SpeechServiceResponse_PostProcessingOption, "TrueText");
```



**Applies to: programming-language-objectivec**


## Change post-processing option


The Speech service can apply post-processing to recognition results before they're returned. You can control which post-processing option is used by setting the `SpeechServiceResponse_PostProcessingOption` property on the `SpeechConfig` instance used to create a `SpeechRecognizer`.

The following values are supported:

| Value | Description |
| --- | --- |
| `TrueText` | Applies display formatting to recognition results, including punctuation and capitalization, to produce more readable output. |
| `PostRefinement` | Gives you more accurate final transcription results with no impact to first-token latency. A second recognition pass runs in parallel with real-time streaming. Intermediate results stay low-latency. Only the final result for each segment is replaced with a more accurate version. Monolingual post-stream refinement is generally available. Multilingual post-stream refinement is in public preview. Region availability differs between the two modes. For more information, see [Speech service regions](regions.md?tabs=stt). |


**Example:** To enable TrueText post-processing:

```objc
[speechConfig setPropertyTo:@"TrueText" byId:SPXSpeechServiceResponsePostProcessingOption];
```



**Applies to: programming-language-swift**


## Change post-processing option


The Speech service can apply post-processing to recognition results before they're returned. You can control which post-processing option is used by setting the `SpeechServiceResponse_PostProcessingOption` property on the `SpeechConfig` instance used to create a `SpeechRecognizer`.

The following values are supported:

| Value | Description |
| --- | --- |
| `TrueText` | Applies display formatting to recognition results, including punctuation and capitalization, to produce more readable output. |
| `PostRefinement` | Gives you more accurate final transcription results with no impact to first-token latency. A second recognition pass runs in parallel with real-time streaming. Intermediate results stay low-latency. Only the final result for each segment is replaced with a more accurate version. Monolingual post-stream refinement is generally available. Multilingual post-stream refinement is in public preview. Region availability differs between the two modes. For more information, see [Speech service regions](regions.md?tabs=stt). |


**Example:** To enable TrueText post-processing:

```swift
speechConfig.setPropertyTo("TrueText", by: SPXPropertyId.speechServiceResponsePostProcessingOption)
```



**Applies to: programming-language-python**


## Change post-processing option


The Speech service can apply post-processing to recognition results before they're returned. You can control which post-processing option is used by setting the `SpeechServiceResponse_PostProcessingOption` property on the `SpeechConfig` instance used to create a `SpeechRecognizer`.

The following values are supported:

| Value | Description |
| --- | --- |
| `TrueText` | Applies display formatting to recognition results, including punctuation and capitalization, to produce more readable output. |
| `PostRefinement` | Gives you more accurate final transcription results with no impact to first-token latency. A second recognition pass runs in parallel with real-time streaming. Intermediate results stay low-latency. Only the final result for each segment is replaced with a more accurate version. Monolingual post-stream refinement is generally available. Multilingual post-stream refinement is in public preview. Region availability differs between the two modes. For more information, see [Speech service regions](regions.md?tabs=stt). |


**Example:** To enable TrueText post-processing:

```python
speech_config.set_property(property_id=speechsdk.PropertyId.SpeechServiceResponse_PostProcessingOption, value="TrueText")
```



**Applies to: programming-language-rest**


## Change post-processing option

Post-processing options aren't configurable through the REST API. To use post-processing, use the [Speech SDK](speech-sdk.md).



**Applies to: programming-language-cli**


## Change post-processing option

Post-processing options aren't configurable through the Speech CLI. To use post-processing, use the [Speech SDK](speech-sdk.md).



## Related content

* [How to recognize speech](how-to-recognize-speech.md)
* [Try the speech to text quickstart](get-started-speech-to-text.md)
