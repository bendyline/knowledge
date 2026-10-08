---
author: PatrickFarley
ms.service: azure-speech-foundry-tools
ms.topic: include
ms.date: 1/29/2026
ms.custom: devx-track-java
ms.author: pafarley
ai-usage: ai-assisted
---


[Reference documentation](https://learn.microsoft.com/java/api/com.microsoft.cognitiveservices.speech) | [Additional samples on GitHub](https://aka.ms/speech/github-java)



In this how-to guide, you learn how to use Azure Speech in Foundry Tools for real-time speech to text conversion. Real-time speech recognition is ideal for applications requiring immediate transcription, such as dictation, call center assistance, and captioning for live meetings.

To learn how to set up the environment for a sample application, see [Quickstart: Recognize and convert speech to text](../../../get-started-speech-to-text.md).

## Create a speech configuration instance

To call the Speech service by using the Speech SDK, you need to create a [SpeechConfig](https://learn.microsoft.com/java/api/com.microsoft.cognitiveservices.speech.speechconfig) instance. This class includes information about your Speech resource, like your key and associated region, endpoint, host, or authorization token.

1. Create a Foundry resource for Speech in the [Azure portal](https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry). Get the Speech resource key and region.
1. Create a `SpeechConfig` instance by using your Speech key and region.

```java
import com.microsoft.cognitiveservices.speech.*;
import com.microsoft.cognitiveservices.speech.audio.AudioConfig;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;

public class Program {
    public static void main(String[] args) throws InterruptedException, ExecutionException, URISyntaxException {
        SpeechConfig speechConfig = SpeechConfig.fromEndpoint(new URI("<paste-your-speech-endpoint>"), "<paste-your-speech-key>");
    }
}
```

You can initialize `SpeechConfig` in a few other ways:

* Use an endpoint, and pass in a Speech service endpoint. A key or authorization token is optional.
* Use a host, and pass in a host address. A key or authorization token is optional.
* Use an authorization token with the associated region/location.

> **Note:**
> Regardless of whether you're performing speech recognition, speech synthesis, translation, or intent recognition, you'll always create a configuration.

## Recognize speech from a microphone

To recognize speech by using your device microphone, create an `AudioConfig` instance by using the `fromDefaultMicrophoneInput()` method. Then initialize the [`SpeechRecognizer`](https://learn.microsoft.com/java/api/com.microsoft.cognitiveservices.speech.speechrecognizer) object by passing `audioConfig` and `config`.

```java
import com.microsoft.cognitiveservices.speech.*;
import com.microsoft.cognitiveservices.speech.audio.AudioConfig;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;

public class Program {
    public static void main(String[] args) throws InterruptedException, ExecutionException, URISyntaxException {
        SpeechConfig speechConfig = SpeechConfig.fromEndpoint(new URI("<paste-your-speech-endpoint>"), "<paste-your-speech-key>");
        fromMic(speechConfig);
    }

    public static void fromMic(SpeechConfig speechConfig) throws InterruptedException, ExecutionException {
        AudioConfig audioConfig = AudioConfig.fromDefaultMicrophoneInput();
        SpeechRecognizer speechRecognizer = new SpeechRecognizer(speechConfig, audioConfig);

        System.out.println("Speak into your microphone.");
        Future<SpeechRecognitionResult> task = speechRecognizer.recognizeOnceAsync();
        SpeechRecognitionResult speechRecognitionResult = task.get();
        System.out.println("RECOGNIZED: Text=" + speechRecognitionResult.getText());
    }
}
```

If you want to use a *specific* audio input device, you need to specify the device ID in `AudioConfig`. To learn how to get the device ID, see [Select an audio input device with the Speech SDK](../../../how-to-select-audio-input-devices.md).

## Recognize speech from a file

If you want to recognize speech from an audio file instead of using a microphone, you still need to create an `AudioConfig` instance. However, you don't call `FromDefaultMicrophoneInput()`. You call `fromWavFileInput()` and pass the file path:

```java
import com.microsoft.cognitiveservices.speech.*;
import com.microsoft.cognitiveservices.speech.audio.AudioConfig;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;

public class Program {
    public static void main(String[] args) throws InterruptedException, ExecutionException, URISyntaxException {
        SpeechConfig speechConfig = SpeechConfig.fromEndpoint(new URI("<paste-your-speech-endpoint>"), "<paste-your-speech-key>");
        fromFile(speechConfig);
    }

    public static void fromFile(SpeechConfig speechConfig) throws InterruptedException, ExecutionException {
        AudioConfig audioConfig = AudioConfig.fromWavFileInput("YourAudioFile.wav");
        SpeechRecognizer speechRecognizer = new SpeechRecognizer(speechConfig, audioConfig);
        
        Future<SpeechRecognitionResult> task = speechRecognizer.recognizeOnceAsync();
        SpeechRecognitionResult speechRecognitionResult = task.get();
        System.out.println("RECOGNIZED: Text=" + speechRecognitionResult.getText());
    }
}
```

## Handle errors

The previous examples only get the recognized text by using `speechRecognitionResult.getText()`. To handle errors and other responses, you need to write some code to handle the result. The following example evaluates [`speechRecognitionResult.getReason()`](https://learn.microsoft.com/java/api/com.microsoft.cognitiveservices.speech.recognitionresult.getreason) and:

* Prints the recognition result: `ResultReason.RecognizedSpeech`.
* If there's no recognition match, it informs the user: `ResultReason.NoMatch`.
* If an error is encountered, it prints the error message: `ResultReason.Canceled`.

```java
switch (speechRecognitionResult.getReason()) {
    case ResultReason.RecognizedSpeech:
        System.out.println("We recognized: " + speechRecognitionResult.getText());
        exitCode = 0;
        break;
    case ResultReason.NoMatch:
        System.out.println("NOMATCH: Speech could not be recognized.");
        break;
    case ResultReason.Canceled: {
            CancellationDetails cancellation = CancellationDetails.fromResult(speechRecognitionResult);
            System.out.println("CANCELED: Reason=" + cancellation.getReason());

            if (cancellation.getReason() == CancellationReason.Error) {
                System.out.println("CANCELED: ErrorCode=" + cancellation.getErrorCode());
                System.out.println("CANCELED: ErrorDetails=" + cancellation.getErrorDetails());
                System.out.println("CANCELED: Did you set the speech resource key and region values?");
            }
        }
        break;
}
```

## Use continuous recognition

The previous examples use single-shot recognition, which recognizes a single utterance. The end of a single utterance is determined by listening for silence at the end or until a maximum of 15 seconds of audio is processed.

In contrast, you use continuous recognition when you want to control when to stop recognizing. It requires you to subscribe to the `recognizing`, `recognized`, and `canceled` events to get the recognition results. To stop recognition, you must call [`stopContinuousRecognitionAsync`](https://learn.microsoft.com/java/api/com.microsoft.cognitiveservices.speech.speechrecognizer.stopcontinuousrecognitionasync). Here's an example of how you can perform continuous recognition on an audio input file.

Start by defining the input and initializing [`SpeechRecognizer`](https://learn.microsoft.com/java/api/com.microsoft.cognitiveservices.speech.speechrecognizer):

```java
AudioConfig audioConfig = AudioConfig.fromWavFileInput("YourAudioFile.wav");
SpeechRecognizer speechRecognizer = new SpeechRecognizer(config, audioConfig);
```

Next, create a variable to manage the state of speech recognition. Declare a `Semaphore` instance at the class scope:

```java
private static Semaphore stopTranslationWithFileSemaphore;
```

Next, subscribe to the events that [`SpeechRecognizer`](https://learn.microsoft.com/java/api/com.microsoft.cognitiveservices.speech.speechrecognizer) sends:

* [`recognizing`](https://learn.microsoft.com/java/api/com.microsoft.cognitiveservices.speech.speechrecognizer.recognizing): Signal for events that contain intermediate recognition results.
* [`recognized`](https://learn.microsoft.com/java/api/com.microsoft.cognitiveservices.speech.speechrecognizer.recognized): Signal for events that contain final recognition results, which indicate a successful recognition attempt.
* [`sessionStopped`](https://learn.microsoft.com/java/api/com.microsoft.cognitiveservices.speech.recognizer.sessionstopped): Signal for events that indicate the end of a recognition session (operation).
* [`canceled`](https://learn.microsoft.com/java/api/com.microsoft.cognitiveservices.speech.speechrecognizer.canceled): Signal for events that contain canceled recognition results. These results indicate a recognition attempt that was canceled as a result of a direct cancellation request. Alternatively, they indicate a transport or protocol failure.

```java
// First initialize the semaphore.
stopTranslationWithFileSemaphore = new Semaphore(0);

speechRecognizer.recognizing.addEventListener((s, e) -> {
    System.out.println("RECOGNIZING: Text=" + e.getResult().getText());
});

speechRecognizer.recognized.addEventListener((s, e) -> {
    if (e.getResult().getReason() == ResultReason.RecognizedSpeech) {
        System.out.println("RECOGNIZED: Text=" + e.getResult().getText());
    }
    else if (e.getResult().getReason() == ResultReason.NoMatch) {
        System.out.println("NOMATCH: Speech could not be recognized.");
    }
});

speechRecognizer.canceled.addEventListener((s, e) -> {
    System.out.println("CANCELED: Reason=" + e.getReason());

    if (e.getReason() == CancellationReason.Error) {
        System.out.println("CANCELED: ErrorCode=" + e.getErrorCode());
        System.out.println("CANCELED: ErrorDetails=" + e.getErrorDetails());
        System.out.println("CANCELED: Did you set the speech resource key and region values?");
    }

    stopTranslationWithFileSemaphore.release();
});

speechRecognizer.sessionStopped.addEventListener((s, e) -> {
    System.out.println("\n    Session stopped event.");
    stopTranslationWithFileSemaphore.release();
});
```

With everything set up, call [`startContinuousRecognitionAsync`](https://learn.microsoft.com/java/api/com.microsoft.cognitiveservices.speech.speechrecognizer.startcontinuousrecognitionasync) to start recognizing:

```java
// Starts continuous recognition. Uses StopContinuousRecognitionAsync() to stop recognition.
speechRecognizer.startContinuousRecognitionAsync().get();

// Waits for completion.
stopTranslationWithFileSemaphore.acquire();

// Stops recognition.
speechRecognizer.stopContinuousRecognitionAsync().get();
```

## Change the source language

A common task for speech recognition is specifying the input (or source) language. The following example shows how to change the input language to French. In your code, find your [`SpeechConfig`](https://learn.microsoft.com/java/api/com.microsoft.cognitiveservices.speech.speechconfig) instance, and add this line directly below it:

```java
config.setSpeechRecognitionLanguage("fr-FR");
```

[`setSpeechRecognitionLanguage`](https://learn.microsoft.com/java/api/com.microsoft.cognitiveservices.speech.speechconfig.setspeechrecognitionlanguage) is a parameter that takes a string as an argument. Refer to the [list of supported speech to text locales](../../../language-support.md?tabs=stt).

## Language identification

You can use language identification with speech to text recognition when you need to identify the language in an audio source and then transcribe it to text.

For a complete code sample, see [Language identification](../../../language-identification.md?pivots=programming-language-java).

## Use a custom endpoint

With [custom speech](../../../custom-speech-overview.md), you can upload your own data, test and train a custom model, compare accuracy between models, and deploy a model to a custom endpoint. The following example shows how to set a custom endpoint:

```java
SpeechConfig speechConfig = SpeechConfig.FromSubscription("YourSpeechKey", "YourServiceRegion");
speechConfig.setEndpointId("YourEndpointId");
SpeechRecognizer speechRecognizer = new SpeechRecognizer(speechConfig);
```

## Run and use a container

Speech containers provide websocket-based query endpoint APIs that are accessed through the Speech SDK and Speech CLI. By default, the Speech SDK and Speech CLI use the public Speech service. To use the container, you need to change the initialization method. Use a container host URL instead of key and region.

For more information about containers, see Host URLs in [Install and run Speech containers with Docker](../../../speech-container-howto.md#host-urls).

## Semantic segmentation

Semantic segmentation is a speech recognition segmentation strategy that's designed to mitigate issues associated with silence-based segmentation: 
- Under-segmentation: When users speak for a long time without pauses, they can see a long sequence of text without breaks ("wall of text"), which severely degrades their readability experience. 
- Over-segmentation: When a user pauses for a short time, the silence detection mechanism can segment incorrectly. 

Instead of only relying on silence timeouts, semantic segmentation mostly segments and returns final results when it detects sentence-ending punctuation (such as '.' or '?'). This improves the user experience with higher-quality, semantically complete segments and prevents long intermediate results. 

To use semantic segmentation, you need to set the following property on the `SpeechConfig` instance used to create a `SpeechRecognizer`:

```java
speechConfig.SetProperty(PropertyId.Speech_SegmentationStrategy, "Semantic");
```

Some of the limitations of semantic segmentation are as follows:
- You need the Speech SDK version 1.41 or later to use semantic segmentation.
- Semantic segmentation is only intended for use in [continuous recognition](#use-continuous-recognition). This includes scenarios such as dictation and captioning. It shouldn't be used in the single recognition mode or interactive scenarios. 
- Semantic segmentation isn't available for all languages and locales. 
- Semantic segmentation doesn't yet support confidence scores and NBest lists. As such, we don't recommend semantic segmentation if you're using confidence scores or NBest lists.


## Commit an explicit audio boundary (preview)

When you stream audio to Azure Speech Service, the service automatically segments the audio and generates transcription results accordingly. However, in certain scenarios, such as turn-based voice agents, you might need to explicitly define boundaries in the transcription stream. You can now achieve this goal by using the `Commit()` method of `PushAudioInputStream`.

Using an explicit audio boundary requires Speech SDK version 1.52 or later. It also requires the service property `setfeature=forcecommit` to be enabled.

During public preview, the following limitations apply:

- Only PCM, A-law, μ-law, and G.711 audio formats are supported. Other compressed audio formats aren't supported.
- Microsoft Audio Stack (MAS) isn't supported.

**Applies to: programming-language-csharp**


Create a `PushAudioInputStream` and use it with `SpeechRecognizer`. 

```csharp
var config = SpeechConfig.FromEndpoint(new Uri(endpoint), subscriptionKey);
config.SpeechRecognitionLanguage = "en-US";
config.SetServiceProperty("setfeature", "forcecommit", ServicePropertyChannel.UriQueryParameter);
var pushStream = AudioInputStream.CreatePushStream();
var audioInput = AudioConfig.FromStreamInput(pushStream);
var recognizer = new SpeechRecognizer(config, audioInput);
```

Use `PushAudioInputStream.Commit()` to commit audio boundary. A token is returned.

```csharp
// writing audio
pushStream.Write(audioBytes);

// ...

// commit audio boundary
var token = pushStream.Commit();

```

Use `SpeechRecognitionResult.CommitToken` to identify the result from `Recognized` event that matches the commit.

```csharp
recognizer.Recognized += (s, e) =>
{
    var token = e.Result.CommitToken;
    var tokenText = token != 0 ? $" commit_token={token}" : "";
    Console.WriteLine($"RECOGNIZED: Reason={e.Result.Reason} Text={e.Result.Text}{tokenText}");
};
```

You can find the complete sample in `RecognitionWithPushStreamCommitAsync` in Speech SDK samples [on GitHub](https://github.com/Azure-Samples/cognitive-services-speech-sdk/blob/master/samples/csharp/sharedcontent/console/speech_recognition_samples.cs).




**Applies to: programming-language-cpp**


Create a `PushAudioInputStream` and use it with `SpeechRecognizer`. 

```cpp
auto config = SpeechConfig::FromEndpoint(endpoint, subscriptionKey);
config->SetSpeechRecognitionLanguage("en-US");
config->SetServiceProperty("setfeature", "forcecommit", ServicePropertyChannel::UriQueryParameter);
auto pushStream = AudioInputStream::CreatePushStream();
auto recognizer = SpeechRecognizer::FromConfig(config, AudioConfig::FromStreamInput(pushStream));
```

Use `PushAudioInputStream::Commit()` to commit audio boundary. A token is returned.

```cpp
// vector<uint8_t> audioBytes(3200);
// ... read audio into audioBytes
// writing audio
pushStream->Write(audioBytes.data(),static_cast<uint32_t>(audioBytes.size()));

// ...

// commit audio boundary
uint32_t token = pushStream->Commit();

```

Use `SpeechRecognitionResult::CommitToken()` to identify the result from `Recognized` event that matches the commit.

```cpp
recognizer->Recognized.Connect([&](const SpeechRecognitionEventArgs& e)
{
    cout << "RECOGNIZED: Reason=" << (int)e.Result->Reason << " Text=" << e.Result->Text;
    // NoMatch can acknowledge a commit; naturally segmented results have token 0.
    if (e.Result->CommitToken() != 0)
    {
        uint32_t acknowledgedToken = e.Result->CommitToken();
        cout << " commit_token=" << acknowledgedToken;
    }
    cout << endl;
});
```

You can find the complete sample in `SpeechRecognitionWithPushStreamCommit` in Speech SDK samples [on GitHub](https://github.com/Azure-Samples/cognitive-services-speech-sdk/blob/master/samples/cpp/windows/console/samples/speech_recognition_samples.cpp).




**Applies to: programming-language-java**


Create a `PushAudioInputStream` and use it with `SpeechRecognizer`. 

```java
SpeechConfig config = SpeechConfig.fromEndpoint(new URI(endpoint), subscriptionKey);
config.setSpeechRecognitionLanguage("en-US");
config.setServiceProperty("setfeature", "forcecommit", ServicePropertyChannel.UriQueryParameter);
PushAudioInputStream pushStream = AudioInputStream.createPushStream();
AudioConfig audioInput = AudioConfig.fromStreamInput(pushStream);
SpeechRecognizer recognizer = new SpeechRecognizer(config, audioInput);
```

Use `PushAudioInputStream.commit()` to commit audio boundary. A token is returned.

```java
// writing audio
pushStream.write(audioBytes);

// ...

// commit audio boundary
int token = pushStream.commit();

```

Use `SpeechRecognitionResult.getCommitToken()` to identify the result from `recognized` event that matches the commit.

```java
recognizer.recognized.addEventListener((s, e) -> {
    int acknowledgedToken = e.getResult().getCommitToken();
    String tokenText = acknowledgedToken != 0 ? " commit_token=" + acknowledgedToken : "";
    System.out.println("RECOGNIZED: Reason=" + e.getResult().getReason()
        + " Text=" + e.getResult().getText() + tokenText);
});
```

You can find the complete sample in `recognitionWithPushStreamCommitAsync` in Speech SDK samples [on GitHub](https://github.com/Azure-Samples/cognitive-services-speech-sdk/blob/master/samples/java/jre/console/src/com/microsoft/cognitiveservices/speech/samples/console/SpeechRecognitionSamples.java).




**Applies to: programming-language-python**


Create a `PushAudioInputStream` and use it with `SpeechRecognizer`. 

```python
speech_config = speechsdk.SpeechConfig(subscription=speech_key, endpoint=speech_endpoint)
speech_config.speech_recognition_language = "en-US"

speech_config.set_service_property(
    "setfeature", "forcecommit", speechsdk.ServicePropertyChannel.UriQueryParameter)

pushStream = speechsdk.audio.PushAudioInputStream()
audio_config = speechsdk.audio.AudioConfig(stream=pushStream)
speech_recognizer = speechsdk.SpeechRecognizer(speech_config=speech_config, audio_config=audio_config)
```

Use `PushAudioInputStream.commit()` to commit audio boundary. A token is returned.

```python
# writing audio
pushStream.write(audio)

# ...

# commit audio boundary
token = pushStream.commit()
```

Use `SpeechRecognitionResult.commit_token` to identify the result from `recognized` event that matches the commit.

```python
def recognized_cb(evt):
    result = evt.result
    commit_info = " commit_token={}".format(result.commit_token) if result.commit_token != 0 else ""
    print("RECOGNIZED: reason={} text={}{}".format(result.reason, result.text, commit_info))

speech_recognizer.recognized.connect(recognized_cb)
```

You can find the complete sample in `speech_recognition_with_push_stream_commit` in Speech SDK samples [on GitHub](https://github.com/Azure-Samples/cognitive-services-speech-sdk/blob/master/samples/python/console/speech_sample.py).




## Post-stream refinement

Post-stream refinement gives you more accurate final results for [real-time transcription](../../../speech-to-text.md#real-time-transcription) with no impact to first-token latency. It runs a second recognition pass in parallel with real-time streaming, so intermediate and partial results stay low-latency. Only the final result is replaced with a more accurate version that uses broader audio context.

Monolingual post-stream refinement is generally available. Multilingual post-stream refinement is in public preview.

| Capability | Monolingual post-stream refinement | Multilingual post-stream refinement |
| --- | --- | --- |
| Availability | Generally available | Public preview |
| Language scope | One configured locale per recognition session | Multiple supported languages in one session, including language switching |
| Language configuration | Set the recognition locale | Use open-range automatic language detection without a candidate language list |
| Phrase lists | [Supported](../../../improve-accuracy-phrase-list.md) | Not supported during public preview |
| Diarization | [Supported](../../../get-started-stt-diarization.md) | [Supported](../../../get-started-stt-diarization.md) |

To enable post-stream refinement, set the `SpeechServiceResponse_PostProcessingOption` property on the `SpeechConfig` instance:

**Applies to: programming-language-cpp**


```cpp
speechConfig->SetProperty(PropertyId::SpeechServiceResponse_PostProcessingOption, "PostRefinement");
```



**Applies to: programming-language-csharp**


```csharp
speechConfig.SetProperty(PropertyId.SpeechServiceResponse_PostProcessingOption, "PostRefinement");
```



**Applies to: programming-language-java**


```java
speechConfig.setProperty(PropertyId.SpeechServiceResponse_PostProcessingOption, "PostRefinement");
```



**Applies to: programming-language-python**


```python
speech_config.set_property(
    speechsdk.PropertyId.SpeechServiceResponse_PostProcessingOption,
    "PostRefinement"
)
```



### Multilingual post-stream refinement (preview)

Post-stream refinement supports multilingual recognition, so a single audio stream can span multiple languages, including switching between languages during a conversation. A single multilingual model recognizes the languages directly, so you don't set a language identification mode or provide a candidate language list. To enable the multilingual path, set `SpeechServiceResponse_PostProcessingOption` to `PostRefinement` and pass an `AutoDetectSourceLanguageConfig` configured for automatic language detection when you create the `SpeechRecognizer`.

Multilingual post-stream refinement requires Speech SDK version 1.50 or later and is available through the Speech SDK only.

During public preview, phrase lists aren't supported with multilingual post-stream refinement.

**Applies to: programming-language-cpp**


```cpp
speechConfig->SetProperty(PropertyId::SpeechServiceResponse_PostProcessingOption, "PostRefinement");

auto autoDetectSourceLanguageConfig = AutoDetectSourceLanguageConfig::FromOpenRange();

auto recognizer = SpeechRecognizer::FromConfig(speechConfig, autoDetectSourceLanguageConfig, audioConfig);
```



**Applies to: programming-language-csharp**


```csharp
speechConfig.SetProperty(PropertyId.SpeechServiceResponse_PostProcessingOption, "PostRefinement");

var autoDetectSourceLanguageConfig = AutoDetectSourceLanguageConfig.FromOpenRange();

var recognizer = new SpeechRecognizer(speechConfig, autoDetectSourceLanguageConfig, audioConfig);
```



**Applies to: programming-language-java**


```java
speechConfig.setProperty(PropertyId.SpeechServiceResponse_PostProcessingOption, "PostRefinement");

AutoDetectSourceLanguageConfig autoDetectSourceLanguageConfig =
    AutoDetectSourceLanguageConfig.fromOpenRange();

SpeechRecognizer recognizer =
    new SpeechRecognizer(speechConfig, autoDetectSourceLanguageConfig, audioConfig);
```



**Applies to: programming-language-python**


```python
speech_config.set_property(
    speechsdk.PropertyId.SpeechServiceResponse_PostProcessingOption,
    "PostRefinement"
)

auto_detect_source_language_config = speechsdk.languageconfig.AutoDetectSourceLanguageConfig()

recognizer = speechsdk.SpeechRecognizer(
    speech_config=speech_config,
    auto_detect_source_language_config=auto_detect_source_language_config,
    audio_config=audio_config)
```



During public preview, multilingual post-stream refinement recognizes 25 languages: Arabic, Chinese, Czech, Danish, Dutch, English, Finnish, French, German, Greek, Hebrew, Hindi, Hungarian, Indonesian, Italian, Japanese, Korean, Norwegian Bokmål, Polish, Portuguese, Russian, Spanish, Swedish, Thai, and Turkish. Because the service detects the spoken language automatically, you don't configure a locale. Audio in a language that isn't supported might produce unexpected results. For the specific locales that support monolingual and multilingual post-stream refinement, see [Speech to text language support](../../../language-support.md?tabs=stt).

Some important considerations for post-stream refinement:

- Post-stream refinement works best for longer utterances such as conversations, meetings, and dictation. For very short phrases, the refined result might be identical to the standard result.
- Post-stream refinement and TrueText are separate values of the same `SpeechServiceResponse_PostProcessingOption` property. Only one value can be set at a time.
- Monolingual and multilingual post-stream refinement have different [Azure region availability](../../../regions.md?tabs=stt).

For more information about post-processing options, see [How to use post-processing](../../../how-to-post-processing.md).

> **Important:**
> In multilingual post-stream refinement, some locales might not show significant quality gains, and results can differ from what you observe with standard recognition.
