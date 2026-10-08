---
title: "How to transcribe multichannel audio in real time - Speech service"
titleSuffix: Foundry Tools
description: Learn how to transcribe up to two audio channels independently in real time and read per-channel speech to text results with the Speech SDK.
author: PatrickFarley
manager: mcleans
ms.service: azure-speech-foundry-tools
ms.topic: how-to
ms.date: 08/05/2026
ms.author: pafarley
ms.devlang: cpp
ms.custom: devx-track-extended-java, devx-track-go, devx-track-js, devx-track-python, doc-kit-assisted
zone_pivot_groups: programming-languages-speech-multichannel
ai-usage: ai-assisted
#Customer intent: As a developer, I want to transcribe stereo audio in real time so that I can get separate speech to text results for each channel.
---

# How to transcribe multichannel audio in real time


> **Note:**
> This feature is currently in public preview. This preview is provided without a service-level agreement, and is not recommended for production workloads. Certain features might not be supported or might have constrained capabilities. For more information, see [Supplemental Terms of Use for Microsoft Azure Previews](https://azure.microsoft.com/support/legal/preview-supplemental-terms/).


Real-time multichannel transcription processes a stereo (two-channel) audio file or stream and returns recognition results that are tagged by channel. Use it when each channel carries a distinct audio source that you want to transcribe independently, such as the two sides of a customer support call. The Speech service transcribes up to two channels at the same time and reports the source channel with each recognition result.

Heavy overlapping speech across both channels can increase result-processing latency.

**Applies to: programming-language-python**



[Reference documentation](https://learn.microsoft.com/python/api/azure-cognitiveservices-speech/) | [Package (PyPi)](https://pypi.org/project/azure-cognitiveservices-speech/) | [Additional samples on GitHub](https://aka.ms/speech/github-python)


In this guide, you use the Speech SDK for Python to transcribe a stereo audio source and read a separate speech-to-text result for each channel.

## Prerequisites

- The [Speech SDK for Python](quickstarts/setup-platform.md?pivots=programming-language-python) version 1.51.0 or later.
- A two-channel (stereo) WAV file or a stereo audio stream. The Speech service transcribes up to two channels.

## Create a speech configuration and enable multichannel processing

Create a [`SpeechConfig`](https://learn.microsoft.com/python/api/azure-cognitiveservices-speech/azure.cognitiveservices.speech.speechconfig)
instance and set the `Speech_EnableMultiChannelProcessing` property to `true`. Replace
`YourSpeechEndpoint` and `YourSpeechKey` with your Speech resource endpoint and key.

```python
import azure.cognitiveservices.speech as speechsdk

speech_config = speechsdk.SpeechConfig(
    subscription="YourSpeechKey", endpoint="YourSpeechEndpoint")
speech_config.speech_recognition_language = "en-US"

# Enable per-channel transcription of up to two channels.
speech_config.set_property(speechsdk.PropertyId.Speech_EnableMultiChannelProcessing, "true")
```

## Provide stereo audio

Multichannel transcription accepts a stereo audio file or a stereo stream. To transcribe a file, create an [`AudioConfig`](https://learn.microsoft.com/python/api/azure-cognitiveservices-speech/azure.cognitiveservices.speech.audio.audioconfig) instance from the file name:

```python
audio_config = speechsdk.audio.AudioConfig(filename="stereo.wav")
```

For a real-time source, create the `AudioConfig` instance from a push or pull stream. When you create the stream format, set the channel count to `2`:

```python
# Match the format of your stereo source: sample rate, bits per sample, and 2 channels.
stream_format = speechsdk.audio.AudioStreamFormat(samples_per_second=16000, bits_per_sample=16, channels=2)
push_stream = speechsdk.audio.PushAudioInputStream(stream_format=stream_format)
audio_config = speechsdk.audio.AudioConfig(stream=push_stream)

# Write raw PCM audio (without the WAV header) to push_stream as it becomes available,
# and call push_stream.close() when the source ends.
```

## Recognize and read per-channel results

Create a [`SpeechRecognizer`](https://learn.microsoft.com/python/api/azure-cognitiveservices-speech/azure.cognitiveservices.speech.speechrecognizer) instance and use continuous recognition. Each final result includes the source channel in the `channel` property. Multichannel transcription supports continuous recognition only; single-shot recognition (`recognize_once`) isn't supported.

```python
import time

speech_recognizer = speechsdk.SpeechRecognizer(speech_config=speech_config, audio_config=audio_config)

done = False

def recognized_cb(evt):
    if evt.result.reason == speechsdk.ResultReason.RecognizedSpeech:
        print("RECOGNIZED (channel {}): {}".format(evt.result.channel, evt.result.text))

def stop_cb(evt):
    global done
    done = True

speech_recognizer.recognized.connect(recognized_cb)
speech_recognizer.session_stopped.connect(stop_cb)
speech_recognizer.canceled.connect(stop_cb)

speech_recognizer.start_continuous_recognition()
while not done:
    time.sleep(0.5)
speech_recognizer.stop_continuous_recognition()
```

The `channel` property identifies the zero-based channel that produced the result, so you can keep each channel's transcript separate.

## Combine multichannel transcription with diarization

To also identify speakers within each channel, use a [`ConversationTranscriber`](https://learn.microsoft.com/python/api/azure-cognitiveservices-speech/azure.cognitiveservices.speech.transcription.conversationtranscriber) instead of a `SpeechRecognizer`. The transcriber reports final results on the `transcribed` event, and each result includes both the `channel` and the `speaker_id`.

```python
import time

conversation_transcriber = speechsdk.transcription.ConversationTranscriber(
    speech_config=speech_config, audio_config=audio_config)

done = False

def transcribed_cb(evt):
    if evt.result.reason == speechsdk.ResultReason.RecognizedSpeech:
        print("TRANSCRIBED (channel {}, speaker {}): {}".format(
            evt.result.channel, evt.result.speaker_id, evt.result.text))

def stop_cb(evt):
    global done
    done = True

conversation_transcriber.transcribed.connect(transcribed_cb)
conversation_transcriber.session_stopped.connect(stop_cb)
conversation_transcriber.canceled.connect(stop_cb)

conversation_transcriber.start_transcribing_async().get()
while not done:
    time.sleep(0.5)
conversation_transcriber.stop_transcribing_async().get()
```



**Applies to: programming-language-csharp**



[Reference documentation](https://learn.microsoft.com/dotnet/api/microsoft.cognitiveservices.speech) | [Package (NuGet)](https://www.nuget.org/packages/Microsoft.CognitiveServices.Speech) | [Additional samples on GitHub](https://aka.ms/speech/github-csharp)


In this guide, you use the Speech SDK for C# to transcribe a stereo audio source and read a separate speech-to-text result for each channel.

## Prerequisites

- The [Speech SDK for C#](quickstarts/setup-platform.md?pivots=programming-language-csharp) version 1.51.0 or later.
- A two-channel (stereo) WAV file or a stereo audio stream. The Speech service transcribes up to two channels.

## Create a speech configuration and enable multichannel processing

Create a [`SpeechConfig`](https://learn.microsoft.com/dotnet/api/microsoft.cognitiveservices.speech.speechconfig) instance and
set the `Speech_EnableMultiChannelProcessing` property to `true`. Replace `YourSpeechEndpoint` and
`YourSpeechKey` with your Speech resource endpoint and key.

```csharp
using System;
using Microsoft.CognitiveServices.Speech;
using Microsoft.CognitiveServices.Speech.Audio;
using Microsoft.CognitiveServices.Speech.Transcription;

var speechConfig = SpeechConfig.FromEndpoint(
    new Uri("YourSpeechEndpoint"), "YourSpeechKey");
speechConfig.SpeechRecognitionLanguage = "en-US";

// Enable per-channel transcription of up to two channels.
speechConfig.SetProperty(PropertyId.Speech_EnableMultiChannelProcessing, "true");
```

## Provide stereo audio

Multichannel transcription accepts a stereo audio file or a stereo stream. To transcribe a file, create an [`AudioConfig`](https://learn.microsoft.com/dotnet/api/microsoft.cognitiveservices.speech.audio.audioconfig) instance from the file name:

```csharp
using var audioConfig = AudioConfig.FromWavFileInput("stereo.wav");
```

For a real-time source, create the `AudioConfig` instance from a push or pull stream. When you create the stream format, set the channel count to `2`:

```csharp
// Match the format of your stereo source: sample rate, bits per sample, and 2 channels.
var streamFormat = AudioStreamFormat.GetWaveFormatPCM(16000, 16, 2);
var pushStream = AudioInputStream.CreatePushStream(streamFormat);
using var audioConfig = AudioConfig.FromStreamInput(pushStream);

// Write raw PCM audio (without the WAV header) to pushStream as it becomes available,
// and call pushStream.Close() when the source ends.
```

## Recognize and read per-channel results

Create a [`SpeechRecognizer`](https://learn.microsoft.com/dotnet/api/microsoft.cognitiveservices.speech.speechrecognizer) instance and use continuous recognition. Each final result includes the source channel in the `Channel` property. Multichannel transcription supports continuous recognition only; single-shot recognition (`RecognizeOnceAsync`) isn't supported.

```csharp
using var recognizer = new SpeechRecognizer(speechConfig, audioConfig);
var stopRecognition = new TaskCompletionSource<int>();

recognizer.Recognized += (s, e) =>
{
    if (e.Result.Reason == ResultReason.RecognizedSpeech)
    {
        Console.WriteLine($"RECOGNIZED (channel {e.Result.Channel}): {e.Result.Text}");
    }
};

recognizer.Canceled += (s, e) => stopRecognition.TrySetResult(0);
recognizer.SessionStopped += (s, e) => stopRecognition.TrySetResult(0);

await recognizer.StartContinuousRecognitionAsync();
Task.WaitAny(new[] { stopRecognition.Task });
await recognizer.StopContinuousRecognitionAsync();
```

The `Channel` property identifies the zero-based channel that produced the result, so you can keep each channel's transcript separate.

## Combine multichannel transcription with diarization

To also identify speakers within each channel, use a [`ConversationTranscriber`](https://learn.microsoft.com/dotnet/api/microsoft.cognitiveservices.speech.transcription.conversationtranscriber) instead of a `SpeechRecognizer`. The transcriber reports final results on the `Transcribed` event, and each result includes both the channel and the speaker ID.

```csharp
using var conversationTranscriber = new ConversationTranscriber(speechConfig, audioConfig);
var stopTranscription = new TaskCompletionSource<int>();

conversationTranscriber.Transcribed += (s, e) =>
{
    if (e.Result.Reason == ResultReason.RecognizedSpeech)
    {
        Console.WriteLine($"TRANSCRIBED (channel {e.Result.Channel}, speaker {e.Result.SpeakerId}): {e.Result.Text}");
    }
};

conversationTranscriber.Canceled += (s, e) => stopTranscription.TrySetResult(0);
conversationTranscriber.SessionStopped += (s, e) => stopTranscription.TrySetResult(0);

await conversationTranscriber.StartTranscribingAsync();
Task.WaitAny(new[] { stopTranscription.Task });
await conversationTranscriber.StopTranscribingAsync();
```



**Applies to: programming-language-cpp**



[Reference documentation](https://learn.microsoft.com/cpp/cognitive-services/speech/) | [Package (NuGet)](https://www.nuget.org/packages/Microsoft.CognitiveServices.Speech) | [Additional samples on GitHub](https://aka.ms/speech/github-cpp)


In this guide, you use the Speech SDK for C++ to transcribe a stereo audio source and read a separate speech-to-text result for each channel.

## Prerequisites

- The [Speech SDK for C++](quickstarts/setup-platform.md?pivots=programming-language-cpp) version 1.51.0 or later.
- A two-channel (stereo) WAV file or a stereo audio stream. The Speech service transcribes up to two channels.

## Create a speech configuration and enable multichannel processing

Create a [`SpeechConfig`](https://learn.microsoft.com/cpp/cognitive-services/speech/speechconfig) instance and set the
`Speech_EnableMultiChannelProcessing` property to `true`. Replace `YourSpeechEndpoint` and
`YourSpeechKey` with your Speech resource endpoint and key.

```cpp
#include <speechapi_cxx.h>

using namespace Microsoft::CognitiveServices::Speech;
using namespace Microsoft::CognitiveServices::Speech::Audio;
using namespace Microsoft::CognitiveServices::Speech::Transcription;

auto speechConfig = SpeechConfig::FromEndpoint(
    "YourSpeechEndpoint", "YourSpeechKey");
speechConfig->SetSpeechRecognitionLanguage("en-US");

// Enable per-channel transcription of up to two channels.
speechConfig->SetProperty(PropertyId::Speech_EnableMultiChannelProcessing, "true");
```

## Provide stereo audio

Multichannel transcription accepts a stereo audio file or a stereo stream. To transcribe a file, create an [`AudioConfig`](https://learn.microsoft.com/cpp/cognitive-services/speech/audio-audioconfig) instance from the file name:

```cpp
auto audioConfig = AudioConfig::FromWavFileInput("stereo.wav");
```

For a real-time source, create the `AudioConfig` instance from a push or pull stream. When you create the stream format, set the channel count to `2`:

```cpp
// Match the format of your stereo source: sample rate, bits per sample, and 2 channels.
auto streamFormat = AudioStreamFormat::GetWaveFormatPCM(16000, 16, 2);
auto pushStream = AudioInputStream::CreatePushStream(streamFormat);
auto audioConfig = AudioConfig::FromStreamInput(pushStream);

// Write raw PCM audio (without the WAV header) to pushStream as it becomes available,
// and call pushStream->Close() when the source ends.
```

## Recognize and read per-channel results

Create a [`SpeechRecognizer`](https://learn.microsoft.com/cpp/cognitive-services/speech/speechrecognizer) instance and use continuous recognition. Each final result includes the source channel from the `Channel()` method. Multichannel transcription supports continuous recognition only; single-shot recognition (`RecognizeOnceAsync`) isn't supported.

```cpp
#include <atomic>
#include <future>

auto recognizer = SpeechRecognizer::FromConfig(speechConfig, audioConfig);
std::promise<void> recognitionEnd;
std::atomic<bool> recognitionEnded{false};

auto signalRecognitionEnd = [&recognitionEnd, &recognitionEnded]()
{
    if (!recognitionEnded.exchange(true))
    {
        recognitionEnd.set_value();
    }
};

recognizer->Recognized.Connect([](const SpeechRecognitionEventArgs& e)
{
    if (e.Result->Reason == ResultReason::RecognizedSpeech)
    {
        printf("RECOGNIZED (channel %d): %s\n", e.Result->Channel(), e.Result->Text.c_str());
    }
});

recognizer->Canceled.Connect([&signalRecognitionEnd](const SpeechRecognitionCanceledEventArgs& e)
{
    if (e.Reason == CancellationReason::Error)
    {
        signalRecognitionEnd();
    }
});

recognizer->SessionStopped.Connect([&signalRecognitionEnd](const SessionEventArgs& e)
{
    signalRecognitionEnd();
});

recognizer->StartContinuousRecognitionAsync().get();
recognitionEnd.get_future().get();
recognizer->StopContinuousRecognitionAsync().get();
```

The `Channel()` method returns the zero-based channel that produced the result, so you can keep each channel's transcript separate.

## Combine multichannel transcription with diarization

To also identify speakers within each channel, use a [`ConversationTranscriber`](https://learn.microsoft.com/cpp/cognitive-services/speech/transcription-conversationtranscriber) instead of a `SpeechRecognizer`. The transcriber reports final results on the `Transcribed` event, and each result includes both the channel and the speaker ID.

```cpp
auto conversationTranscriber = ConversationTranscriber::FromConfig(speechConfig, audioConfig);
std::promise<void> transcriptionEnd;
std::atomic<bool> transcriptionEnded{false};

auto signalTranscriptionEnd = [&transcriptionEnd, &transcriptionEnded]()
{
    if (!transcriptionEnded.exchange(true))
    {
        transcriptionEnd.set_value();
    }
};

conversationTranscriber->Transcribed.Connect([](const ConversationTranscriptionEventArgs& e)
{
    if (e.Result->Reason == ResultReason::RecognizedSpeech)
    {
        printf("TRANSCRIBED (channel %d, speaker %s): %s\n",
            e.Result->Channel(), e.Result->SpeakerId.c_str(), e.Result->Text.c_str());
    }
});

conversationTranscriber->Canceled.Connect([&signalTranscriptionEnd](const ConversationTranscriptionCanceledEventArgs& e)
{
    if (e.Reason == CancellationReason::Error)
    {
        signalTranscriptionEnd();
    }
});

conversationTranscriber->SessionStopped.Connect([&signalTranscriptionEnd](const SessionEventArgs& e)
{
    signalTranscriptionEnd();
});

conversationTranscriber->StartTranscribingAsync().get();
transcriptionEnd.get_future().get();
conversationTranscriber->StopTranscribingAsync().get();
```



**Applies to: programming-language-java**



[Reference documentation](https://learn.microsoft.com/java/api/com.microsoft.cognitiveservices.speech) | [Additional samples on GitHub](https://aka.ms/speech/github-java)


In this guide, you use the Speech SDK for Java to transcribe a stereo audio source and read a separate speech-to-text result for each channel.


## Prerequisites

- The [Speech SDK for Java](quickstarts/setup-platform.md?pivots=programming-language-java) version 1.51.0 or later.
- A two-channel (stereo) WAV file or a stereo audio stream. The Speech service transcribes up to two channels.

## Create a speech configuration and enable multichannel processing

Create a [`SpeechConfig`](https://learn.microsoft.com/java/api/com.microsoft.cognitiveservices.speech.speechconfig) instance and
set the `Speech_EnableMultiChannelProcessing` property to `true`. Replace `YourSpeechEndpoint` and
`YourSpeechKey` with your Speech resource endpoint and key.

```java
import com.microsoft.cognitiveservices.speech.*;
import com.microsoft.cognitiveservices.speech.audio.*;
import com.microsoft.cognitiveservices.speech.transcription.*;
import java.net.URI;

SpeechConfig speechConfig = SpeechConfig.fromEndpoint(
    new URI("YourSpeechEndpoint"), "YourSpeechKey");
speechConfig.setSpeechRecognitionLanguage("en-US");

// Enable per-channel transcription of up to two channels.
speechConfig.setProperty(PropertyId.Speech_EnableMultiChannelProcessing, "true");
```

## Provide stereo audio

Multichannel transcription accepts a stereo audio file or a stereo stream. To transcribe a file, create an [`AudioConfig`](https://learn.microsoft.com/java/api/com.microsoft.cognitiveservices.speech.audio.audioconfig) instance from the file name:

```java
AudioConfig audioConfig = AudioConfig.fromWavFileInput("stereo.wav");
```

For a real-time source, create the `AudioConfig` instance from a push or pull stream. When you create the stream format, set the channel count to `2`:

```java
// Match the format of your stereo source: sample rate, bits per sample, and 2 channels.
AudioStreamFormat streamFormat = AudioStreamFormat.getWaveFormatPCM(16000, (short)16, (short)2);
PushAudioInputStream pushStream = AudioInputStream.createPushStream(streamFormat);
AudioConfig audioConfig = AudioConfig.fromStreamInput(pushStream);

// Write raw PCM audio (without the WAV header) to pushStream as it becomes available,
// and call pushStream.close() when the source ends.
```

## Recognize and read per-channel results

Create a [`SpeechRecognizer`](https://learn.microsoft.com/java/api/com.microsoft.cognitiveservices.speech.speechrecognizer) instance and use continuous recognition. Each final result includes the source channel from the `getChannel()` method. Multichannel transcription supports continuous recognition only; single-shot recognition (`recognizeOnceAsync`) isn't supported.

```java
import java.util.concurrent.Semaphore;

SpeechRecognizer recognizer = new SpeechRecognizer(speechConfig, audioConfig);
Semaphore recognitionEnd = new Semaphore(0);

recognizer.recognized.addEventListener((s, e) -> {
    if (e.getResult().getReason() == ResultReason.RecognizedSpeech) {
        System.out.println("RECOGNIZED (channel " + e.getResult().getChannel() + "): " + e.getResult().getText());
    }
});

recognizer.canceled.addEventListener((s, e) -> {
    if (e.getReason() == CancellationReason.Error) {
        recognitionEnd.release();
    }
});

recognizer.sessionStopped.addEventListener((s, e) -> recognitionEnd.release());

recognizer.startContinuousRecognitionAsync().get();
recognitionEnd.acquire();
recognizer.stopContinuousRecognitionAsync().get();

recognizer.close();
```

The `getChannel()` method returns the zero-based channel that produced the result, so you can keep each channel's transcript separate.

## Combine multichannel transcription with diarization

To also identify speakers within each channel, use a [`ConversationTranscriber`](https://learn.microsoft.com/java/api/com.microsoft.cognitiveservices.speech.transcription.conversationtranscriber) instead of a `SpeechRecognizer`. The transcriber reports final results on the `transcribed` event, and each result includes both the channel and the speaker ID.

```java
ConversationTranscriber conversationTranscriber = new ConversationTranscriber(speechConfig, audioConfig);
Semaphore transcriptionEnd = new Semaphore(0);

conversationTranscriber.transcribed.addEventListener((s, e) -> {
    if (e.getResult().getReason() == ResultReason.RecognizedSpeech) {
        System.out.println("TRANSCRIBED (channel " + e.getResult().getChannel()
            + ", speaker " + e.getResult().getSpeakerId() + "): " + e.getResult().getText());
    }
});

conversationTranscriber.canceled.addEventListener((s, e) -> {
    if (e.getReason() == CancellationReason.Error) {
        transcriptionEnd.release();
    }
});

conversationTranscriber.sessionStopped.addEventListener((s, e) -> transcriptionEnd.release());

conversationTranscriber.startTranscribingAsync().get();
transcriptionEnd.acquire();
conversationTranscriber.stopTranscribingAsync().get();

conversationTranscriber.close();
```



**Applies to: programming-language-javascript**



[Reference documentation](https://learn.microsoft.com/javascript/api/microsoft-cognitiveservices-speech-sdk/) | [Package (npm)](https://www.npmjs.com/package/microsoft-cognitiveservices-speech-sdk) | [Additional samples on GitHub](https://aka.ms/speech/github-javascript) | [Library source code](https://github.com/Microsoft/cognitive-services-speech-sdk-js)


In this guide, you use the Speech SDK for JavaScript to transcribe a stereo audio source and read a separate speech-to-text result for each channel.

## Prerequisites

- The [Speech SDK for JavaScript](quickstarts/setup-platform.md?pivots=programming-language-javascript) version 1.51.0 or later.
- A two-channel (stereo) WAV file or a stereo audio stream. The Speech service transcribes up to two channels.

## Create a speech configuration and enable multichannel processing

Create a [`SpeechConfig`](https://learn.microsoft.com/javascript/api/microsoft-cognitiveservices-speech-sdk/speechconfig)
instance and set the `Speech_EnableMultiChannelProcessing` property to `true`. Replace
`YourSpeechEndpoint` and `YourSpeechKey` with your Speech resource endpoint and key.

```javascript
const sdk = require("microsoft-cognitiveservices-speech-sdk");

const speechConfig = sdk.SpeechConfig.fromEndpoint(
    new URL("YourSpeechEndpoint"), "YourSpeechKey");
speechConfig.speechRecognitionLanguage = "en-US";

// Enable per-channel transcription of up to two channels.
speechConfig.setProperty(sdk.PropertyId.Speech_EnableMultiChannelProcessing, "true");
```

## Provide stereo audio

Multichannel transcription accepts a stereo audio file or a stereo stream. To transcribe a file, create an [`AudioConfig`](https://learn.microsoft.com/javascript/api/microsoft-cognitiveservices-speech-sdk/audioconfig) instance from the file:

```javascript
const fs = require("fs");
const audioConfig = sdk.AudioConfig.fromWavFileInput(fs.readFileSync("stereo.wav"));
```

For a real-time source, create the `AudioConfig` instance from a push stream. When you create the stream format, set the channel count to `2`:

```javascript
// Match the format of your stereo source: sample rate, bits per sample, and 2 channels.
const streamFormat = sdk.AudioStreamFormat.getWaveFormatPCM(16000, 16, 2);
const pushStream = sdk.AudioInputStream.createPushStream(streamFormat);
const audioConfig = sdk.AudioConfig.fromStreamInput(pushStream);

// Write raw PCM audio (without the WAV header) to pushStream as it becomes available,
// and call pushStream.close() when the source ends.
```

## Recognize and read per-channel results

Create a [`SpeechRecognizer`](https://learn.microsoft.com/javascript/api/microsoft-cognitiveservices-speech-sdk/speechrecognizer) instance and use continuous recognition. Multichannel transcription supports continuous recognition only; single-shot recognition (`recognizeOnceAsync`) isn't supported.

```javascript
const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

recognizer.recognized = (s, e) => {
    if (e.result.reason === sdk.ResultReason.RecognizedSpeech) {
        // e.result.channel identifies the source channel (0 or 1).
        console.log(`RECOGNIZED (channel ${e.result.channel}): ${e.result.text}`);
    }
};

recognizer.sessionStopped = (s, e) => {
    recognizer.stopContinuousRecognitionAsync();
};

recognizer.startContinuousRecognitionAsync();
```

Use the channel value on each result to keep each channel's transcript separate.

## Combine multichannel transcription with diarization

To identify speakers, use a [`ConversationTranscriber`](https://learn.microsoft.com/javascript/api/microsoft-cognitiveservices-speech-sdk/conversationtranscriber) instead of a `SpeechRecognizer`. The transcriber reports final results on the `transcribed` event, and each result includes a speaker ID.

> **Important:**
> In Speech SDK for JavaScript version 1.51.0, `ConversationTranscriber` results don't reliably report the source channel. A fix is planned for version 1.52.0. If you use version 1.51.0, use `speakerId` to identify speakers, but don't use `channel` to separate diarization results by source channel. Use `SpeechRecognizer` when you need reliable source-channel metadata.

```javascript
const conversationTranscriber = new sdk.ConversationTranscriber(speechConfig, audioConfig);

conversationTranscriber.transcribed = (s, e) => {
    if (e.result.reason === sdk.ResultReason.RecognizedSpeech) {
        console.log(`TRANSCRIBED (speaker ${e.result.speakerId}): ${e.result.text}`);
    }
};

conversationTranscriber.sessionStopped = (s, e) => {
    conversationTranscriber.stopTranscribingAsync();
};

conversationTranscriber.startTranscribingAsync();
```



**Applies to: programming-language-go**



[Reference documentation](https://aka.ms/csspeech/goref) | [Package (Go)](https://pkg.go.dev/github.com/Microsoft/cognitive-services-speech-sdk-go) | [Additional samples on GitHub](https://github.com/microsoft/cognitive-services-speech-sdk-go/tree/master/samples/)


In this guide, you use the Speech SDK for Go to transcribe a stereo audio source and read a separate speech-to-text result for each channel.


## Prerequisites

- The [Speech SDK for Go](quickstarts/setup-platform.md?pivots=programming-language-go) version 1.52.0 or later.
- A two-channel (stereo) WAV file or a stereo audio stream. The Speech service transcribes up to two channels.

> **Note:**
> Until the release of SDK 1.52.0, download the current [Speech SDK Go source](https://github.com/microsoft/cognitive-services-speech-sdk-go/) directly.

## Create a speech configuration and enable multichannel processing

Create a `SpeechConfig` instance and enable multichannel processing. Replace
`YourSpeechEndpoint` and `YourSpeechKey` with your Speech resource endpoint and key.

```go
import (
    "github.com/Microsoft/cognitive-services-speech-sdk-go/common"
    "github.com/Microsoft/cognitive-services-speech-sdk-go/speech"
)

speechConfig, err := speech.NewSpeechConfigFromEndpointWithSubscription(
    "YourSpeechEndpoint", "YourSpeechKey")
if err != nil {
    fmt.Println("Got an error: ", err)
    return
}
defer speechConfig.Close()
speechConfig.SetSpeechRecognitionLanguage("en-US")

// Enable per-channel transcription of up to two channels.
speechConfig.SetProperty(common.EnableMultiChannelProcessing, "true")
```

## Provide stereo audio

Multichannel transcription accepts a stereo audio file or a stereo stream. To transcribe a file, create an `AudioConfig` instance from the file name:

```go
import "github.com/Microsoft/cognitive-services-speech-sdk-go/audio"

audioConfig, err := audio.NewAudioConfigFromWavFileInput("stereo.wav")
if err != nil {
    fmt.Println("Got an error: ", err)
    return
}
defer audioConfig.Close()
```

For a real-time source, create the `AudioConfig` instance from a stream whose format specifies two channels, and write raw PCM audio (without the WAV header) to the stream as it becomes available.

## Recognize and read per-channel results

Create a `SpeechRecognizer` instance and use continuous recognition. Multichannel transcription supports continuous recognition only; single-shot recognition isn't supported.

Each recognition result carries a `Channel` field that identifies the source audio channel. Channel numbering starts at zero.

```go
import (
    "github.com/Microsoft/cognitive-services-speech-sdk-go/common"
    "github.com/Microsoft/cognitive-services-speech-sdk-go/speech"
)

speechRecognizer, err := speech.NewSpeechRecognizerFromConfig(speechConfig, audioConfig)
if err != nil {
    fmt.Println("Got an error: ", err)
    return
}
defer speechRecognizer.Close()

speechRecognizer.Recognized(func(event speech.SpeechRecognitionEventArgs) {
    defer event.Close()
    // event.Result.Channel identifies the source channel (0 or 1).
    fmt.Printf("RECOGNIZED (channel %d): %s\n", event.Result.Channel, event.Result.Text)
})

// The Start and Stop methods return a channel that reports the outcome
// of the operation. Read from it to wait for the operation to complete.
if err := <-speechRecognizer.StartContinuousRecognitionAsync(); err != nil {
    fmt.Println("Got an error: ", err)
    return
}
defer func() { <-speechRecognizer.StopContinuousRecognitionAsync() }()
```

Use the channel value on each result to keep each channel's transcript separate.

## Combine multichannel transcription with diarization

To also identify speakers within each channel, use a `ConversationTranscriber` instead of a `SpeechRecognizer`. The transcriber reports final results on the `Transcribed` event, and each result includes both the channel and the speaker ID.

```go
import "github.com/Microsoft/cognitive-services-speech-sdk-go/speech"

conversationTranscriber, err := speech.NewConversationTranscriberFromConfig(speechConfig, audioConfig)
if err != nil {
    fmt.Println("Got an error: ", err)
    return
}
defer conversationTranscriber.Close()

conversationTranscriber.Transcribed(func(event speech.ConversationTranscriptionEventArgs) {
    defer event.Close()
    fmt.Printf("TRANSCRIBED (channel %d, speaker %s): %s\n",
        event.Result.Channel, event.Result.SpeakerID, event.Result.Text)
})

if err := <-conversationTranscriber.StartTranscribingAsync(); err != nil {
    fmt.Println("Got an error: ", err)
    return
}
defer func() { <-conversationTranscriber.StopTranscribingAsync() }()
```



**Applies to: programming-language-objectivec**



[Reference documentation](https://learn.microsoft.com/objectivec/cognitive-services/speech/) | [Package (download)](https://aka.ms/csspeech/macosbinary) | [Additional samples on GitHub](https://aka.ms/speech/github-objective-c)


In this guide, you use the Speech SDK for Objective-C to transcribe a stereo audio source and read a separate speech to text result for each channel.

## Prerequisites

- The [Speech SDK for Objective-C](quickstarts/setup-platform.md?pivots=programming-language-objectivec) version 1.51.0 or later.
- A two-channel (stereo) WAV file or a stereo audio stream. The Speech service transcribes up to two channels.

## Create a speech configuration and enable multichannel processing

Create an `SPXSpeechConfiguration` instance and set the
`SPXSpeechEnableMultiChannelProcessing` property to `true`. Replace `YourSpeechEndpoint` and
`YourSpeechKey` with your Speech resource endpoint and key.

```objectivec
SPXSpeechConfiguration *speechConfig = [[SPXSpeechConfiguration alloc]
    initWithEndpoint:@"YourSpeechEndpoint" subscription:@"YourSpeechKey"];
speechConfig.speechRecognitionLanguage = @"en-US";

// Enable per-channel transcription of up to two channels.
[speechConfig setPropertyTo:@"true" byId:SPXSpeechEnableMultiChannelProcessing];
```

## Provide stereo audio

Multichannel transcription accepts a stereo audio file or a stereo stream. To transcribe a file, create an `SPXAudioConfiguration` instance from the file name:

```objectivec
SPXAudioConfiguration *audioConfig = [[SPXAudioConfiguration alloc] initWithWavFileInput:@"stereo.wav"];
```

For a real-time source, create the `SPXAudioConfiguration` instance from a stream whose format specifies two channels, and write raw PCM audio (without the WAV header) to the stream as it becomes available.

## Recognize and read per-channel results

Create an `SPXSpeechRecognizer` instance and use continuous recognition. Multichannel transcription supports continuous recognition only; single-shot recognition (`recognizeOnce`) isn't supported.

```objectivec
SPXSpeechRecognizer *recognizer = [[SPXSpeechRecognizer alloc] initWithSpeechConfiguration:speechConfig audioConfiguration:audioConfig];

[recognizer addRecognizedEventHandler:^(SPXSpeechRecognizer *recognizer, SPXSpeechRecognitionEventArgs *evt) {
    SPXSpeechRecognitionResult *result = evt.result;
    if (result != nil && result.reason == SPXResultReason_RecognizedSpeech) {
        // result.channel identifies the source channel (0 or 1).
        NSLog(@"RECOGNIZED (channel %ld): %@", (long)result.channel, result.text);
    }
}];

[recognizer startContinuousRecognition];
```

Use the channel value on each result to keep each channel's transcript separate.

## Combine multichannel transcription with diarization

To also identify speakers within each channel, use an `SPXConversationTranscriber` instead of an `SPXSpeechRecognizer`. The transcriber reports final results on the transcribed event, and each result includes both the channel and the speaker ID.

```objectivec
SPXConversationTranscriber *conversationTranscriber = [[SPXConversationTranscriber alloc] initWithSpeechConfiguration:speechConfig audioConfiguration:audioConfig];

[conversationTranscriber addTranscribedEventHandler:^(SPXConversationTranscriber *transcriber, SPXConversationTranscriptionEventArgs *evt) {
    SPXConversationTranscriptionResult *result = evt.result;
    if (result != nil && result.reason == SPXResultReason_RecognizedSpeech) {
        NSLog(@"TRANSCRIBED (channel %ld, speaker %@): %@", (long)result.channel, result.speakerId, result.text);
    }
}];

[conversationTranscriber startTranscribingAsync:^(BOOL started, NSError *error) {
    if (!started || error != nil) {
        NSLog(@"Could not start transcription: %@", error);
    }
}];
```

When transcription is complete, stop the transcriber:

```objectivec
[conversationTranscriber stopTranscribingAsync:^(BOOL stopped, NSError *error) {
    if (!stopped || error != nil) {
        NSLog(@"Could not stop transcription: %@", error);
    }
}];
```


**Applies to: programming-language-swift**



[Reference documentation](https://learn.microsoft.com/objectivec/cognitive-services/speech/) | [Package (download)](https://aka.ms/csspeech/macosbinary) | [Additional samples on GitHub](https://aka.ms/speech/github-objective-c)


In this guide, you use the Speech SDK for Swift to transcribe a stereo audio source and read a separate speech to text result for each channel.

## Prerequisites

- The [Speech SDK for Swift](quickstarts/setup-platform.md?pivots=programming-language-swift) version 1.51.0 or later.
- A two-channel (stereo) WAV file or a stereo audio stream. The Speech service transcribes up to two channels.

## Create a speech configuration and enable multichannel processing

Create an `SPXSpeechConfiguration` instance and enable multichannel processing. Replace
`YourSpeechEndpoint` and `YourSpeechKey` with your Speech resource endpoint and key.

```swift
let speechConfig = try! SPXSpeechConfiguration(
    endpoint: "YourSpeechEndpoint", subscription: "YourSpeechKey")
speechConfig.speechRecognitionLanguage = "en-US"

// Enable per-channel transcription of up to two channels.
speechConfig.setPropertyTo("true", by: SPXPropertyId.speechEnableMultiChannelProcessing)
```

## Provide stereo audio

Multichannel transcription accepts a stereo audio file or a stereo stream. To transcribe a file, create an `SPXAudioConfiguration` instance from the file name:

```swift
let audioConfig = SPXAudioConfiguration(wavFileInput: "stereo.wav")
```

For a real-time source, create the `SPXAudioConfiguration` instance from a stream whose format specifies two channels, and write raw PCM audio (without the WAV header) to the stream as it becomes available.

## Recognize and read per-channel results

Create an `SPXSpeechRecognizer` instance and use continuous recognition. Multichannel transcription supports continuous recognition only; single-shot recognition (`recognizeOnce`) isn't supported.

```swift
let recognizer = try! SPXSpeechRecognizer(speechConfiguration: speechConfig, audioConfiguration: audioConfig!)

recognizer.addRecognizedEventHandler { recognizer, evt in
    guard let result = evt.result else {
        return
    }

    if result.reason == SPXResultReason.recognizedSpeech {
        // result.channel identifies the source channel (0 or 1).
        print("RECOGNIZED (channel \(result.channel)): \(result.text ?? "")")
    }
}

try! recognizer.startContinuousRecognition()
```

Use the channel value on each result to keep each channel's transcript separate.

## Combine multichannel transcription with diarization

To also identify speakers within each channel, use an `SPXConversationTranscriber` instead of an `SPXSpeechRecognizer`. The transcriber reports final results on the transcribed event, and each result includes both the channel and the speaker ID.

```swift
let conversationTranscriber = try! SPXConversationTranscriber(speechConfiguration: speechConfig, audioConfiguration: audioConfig!)

conversationTranscriber.addTranscribedEventHandler { transcriber, evt in
    guard let result = evt.result else {
        return
    }

    if result.reason == SPXResultReason.recognizedSpeech {
        print("TRANSCRIBED (channel \(result.channel), speaker \(result.speakerId ?? "")): \(result.text ?? "")")
    }
}

do {
    try conversationTranscriber.startTranscribingAsync { started, error in
        if let error = error {
            print("Could not start transcription: \(error)")
        } else if started {
            print("Transcription started")
        }
    }
} catch {
    print("Could not start transcription: \(error)")
}
```

When transcription is complete, stop the transcriber:

```swift
do {
    try conversationTranscriber.stopTranscribingAsync { stopped, error in
        if let error = error {
            print("Could not stop transcription: \(error)")
        } else if stopped {
            print("Transcription stopped")
        }
    }
} catch {
    print("Could not stop transcription: \(error)")
}
```



## Supported and unsupported features

Multichannel transcription works with several real-time speech to text features and doesn't support others. The following table summarizes the current support.

| Feature | Supported |
| --- | --- |
| [Diarization](get-started-stt-diarization.md) | ✅ |
| [Custom speech](custom-speech-overview.md) | ✅ |
| Semantic segmentation | ✅ |
| TrueText | ✅ |
| [Language identification](language-identification.md) | ❌ |
| Multilingual models | ❌ |
| Post-stream refinement | ❌ |
| [Phrase lists](improve-accuracy-phrase-list.md) | ❌ |
| Pronunciation assessment | ❌ |

When you combine multichannel transcription with diarization, results also include speaker IDs. Source-channel metadata for diarization results varies by Speech SDK. Review the guidance for your programming language before you use channel and speaker metadata together.

Results from different channels aren't guaranteed to arrive in perfect time order, especially when speech overlaps across channels.

## Related content

- [How to recognize speech](how-to-recognize-speech.md)
- [Audio concepts](concepts/audio-concepts.md)
- For per-channel transcription of prerecorded files, see the `channels` property in [batch transcription](batch-transcription.md).
