---
author: PatrickFarley
ms.service: azure-speech-foundry-tools
ms.topic: include
ms.date: 10/17/2024
ms.author: pafarley
---


[Reference documentation](https://learn.microsoft.com/python/api/azure-cognitiveservices-speech/) | [Package (PyPi)](https://pypi.org/project/azure-cognitiveservices-speech/) | [Additional samples on GitHub](https://aka.ms/speech/github-python)



In this how-to guide, you learn how to use Azure Speech in Foundry Tools for real-time speech to text conversion. Real-time speech recognition is ideal for applications requiring immediate transcription, such as dictation, call center assistance, and captioning for live meetings.

To learn how to set up the environment for a sample application, see [Quickstart: Recognize and convert speech to text](../../../get-started-speech-to-text.md).

## Create a speech configuration instance

To call the Speech service by using the Speech SDK, you need to create a [`SpeechConfig`](https://learn.microsoft.com/python/api/azure-cognitiveservices-speech/azure.cognitiveservices.speech.speechconfig) instance. This class includes information about your Speech resource, like your speech key and associated region, endpoint, host, or authorization token.

1. Create a Foundry resource for Speech in the [Azure portal](https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry). Get the Speech resource key and region.
1. Create a `SpeechConfig` instance by using the following code. Replace `YourSpeechKey` and `YourSpeechRegion` with your Speech resource key and region.

```Python
speech_config = speechsdk.SpeechConfig(subscription="YourSpeechKey", region="YourSpeechRegion")
```

You can initialize [`SpeechConfig`](https://learn.microsoft.com/python/api/azure-cognitiveservices-speech/azure.cognitiveservices.speech.speechconfig) in a few other ways:

* Use an endpoint, and pass in a Speech service endpoint. A speech key or authorization token is optional.
* Use a host, and pass in a host address. A speech key or authorization token is optional.
* Use an authorization token with the associated region/location.

> **Note:**
> Regardless of whether you're performing speech recognition, speech synthesis, translation, or intent recognition, you always create a configuration.

## Recognize speech from a microphone

To recognize speech by using your device microphone, create a `SpeechRecognizer` instance without passing [`AudioConfig`](https://learn.microsoft.com/python/api/azure-cognitiveservices-speech/azure.cognitiveservices.speech.audio.audioconfig), and then pass `speech_config`:

```Python
import azure.cognitiveservices.speech as speechsdk

def from_mic():
    speech_config = speechsdk.SpeechConfig(subscription="YourSpeechKey", region="YourSpeechRegion")
    speech_recognizer = speechsdk.SpeechRecognizer(speech_config=speech_config)

    print("Speak into your microphone.")
    speech_recognition_result = speech_recognizer.recognize_once_async().get()
    print(speech_recognition_result.text)

from_mic()
```

If you want to use a *specific* audio input device, you need to specify the device ID in `AudioConfig`, and the pass it to the `SpeechRecognizer` constructor's `audio_config` parameter. To learn how to get the device ID, see [Select an audio input device with the Speech SDK](../../../how-to-select-audio-input-devices.md).

## Recognize speech from a file

If you want to recognize speech from an audio file instead of using a microphone, create an `AudioConfig` instance and use the `filename` parameter:

```Python
import azure.cognitiveservices.speech as speechsdk

def from_file():
    speech_config = speechsdk.SpeechConfig(subscription="YourSpeechKey", region="YourSpeechRegion")
    audio_config = speechsdk.AudioConfig(filename="your_file_name.wav")
    speech_recognizer = speechsdk.SpeechRecognizer(speech_config=speech_config, audio_config=audio_config)

    speech_recognition_result = speech_recognizer.recognize_once_async().get()
    print(speech_recognition_result.text)

from_file()
```

## Handle errors

The previous examples only get the recognized text from the `speech_recognition_result.text` property. To handle errors and other responses, you need to write some code to handle the result. The following code evaluates the [`speech_recognition_result.reason`](https://learn.microsoft.com/python/api/azure-cognitiveservices-speech/azure.cognitiveservices.speech.resultreason) property and:

* Prints the recognition result: `speechsdk.ResultReason.RecognizedSpeech`.
* If there's no recognition match, it informs the user: `speechsdk.ResultReason.NoMatch`.
* If an error is encountered, it prints the error message: `speechsdk.ResultReason.Canceled`.

```Python
if speech_recognition_result.reason == speechsdk.ResultReason.RecognizedSpeech:
    print("Recognized: {}".format(speech_recognition_result.text))
elif speech_recognition_result.reason == speechsdk.ResultReason.NoMatch:
    print("No speech could be recognized: {}".format(speech_recognition_result.no_match_details))
elif speech_recognition_result.reason == speechsdk.ResultReason.Canceled:
    cancellation_details = speech_recognition_result.cancellation_details
    print("Speech Recognition canceled: {}".format(cancellation_details.reason))
    if cancellation_details.reason == speechsdk.CancellationReason.Error:
        print("Error details: {}".format(cancellation_details.error_details))
        print("Did you set the speech resource key and region values?")
```

## Use continuous recognition

The previous examples use single-shot recognition, which recognizes a single utterance. The end of a single utterance is determined by listening for silence at the end or until a maximum of 15 seconds of audio is processed.

In contrast, you use continuous recognition when you want to control when to stop recognizing. It requires you to connect to `EventSignal` to get the recognition results. To stop recognition, you must call [stop_continuous_recognition()](https://learn.microsoft.com/python/api/azure-cognitiveservices-speech/azure.cognitiveservices.speech.recognizer#azure-cognitiveservices-speech-recognizer-stop-continuous-recognition) or [stop_continuous_recognition_async()](https://learn.microsoft.com/python/api/azure-cognitiveservices-speech/azure.cognitiveservices.speech.recognizer#azure-cognitiveservices-speech-recognizer-stop-continuous-recognition-async). Here's an example of how continuous recognition is performed on an audio input file.

Start by defining the input and initializing [`SpeechRecognizer`](https://learn.microsoft.com/python/api/azure-cognitiveservices-speech/azure.cognitiveservices.speech.speechrecognizer):

```Python
audio_config = speechsdk.audio.AudioConfig(filename=weatherfilename)
speech_recognizer = speechsdk.SpeechRecognizer(speech_config=speech_config, audio_config=audio_config)
```

Next, create a variable to manage the state of speech recognition. Set the variable to `False` because at the start of recognition, you can safely assume that it's not finished:

```Python
done = False
```

Now, create a callback to stop continuous recognition when `evt` is received. Keep these points in mind:

* When `evt` is received, the `evt` message is printed.
* After `evt` is received, [stop_continuous_recognition()](https://learn.microsoft.com/python/api/azure-cognitiveservices-speech/azure.cognitiveservices.speech.recognizer#azure-cognitiveservices-speech-recognizer-stop-continuous-recognition) is called to stop recognition.
* The recognition state is changed to `True`.

```Python
def stop_cb(evt):
    print('CLOSING on {}'.format(evt))
    speech_recognizer.stop_continuous_recognition()
    global done
    done = True
```

The following code sample shows how to connect callbacks to events sent from [`SpeechRecognizer`](https://learn.microsoft.com/python/api/azure-cognitiveservices-speech/azure.cognitiveservices.speech.recognizer). The events are:

* [`recognizing`](https://learn.microsoft.com/python/api/azure-cognitiveservices-speech/azure.cognitiveservices.speech.recognizer#azure-cognitiveservices-speech-recognizer-recognizing): Signal for events that contain intermediate recognition results.
* [`recognized`](https://learn.microsoft.com/python/api/azure-cognitiveservices-speech/azure.cognitiveservices.speech.recognizer#azure-cognitiveservices-speech-recognizer-recognized): Signal for events that contain final recognition results, which indicate a successful recognition attempt.
* [`session_started`](https://learn.microsoft.com/python/api/azure-cognitiveservices-speech/azure.cognitiveservices.speech.recognizer#azure-cognitiveservices-speech-recognizer-session-started): Signal for events that indicate the start of a recognition session (operation).
* [`session_stopped`](https://learn.microsoft.com/python/api/azure-cognitiveservices-speech/azure.cognitiveservices.speech.recognizer#azure-cognitiveservices-speech-recognizer-session-stopped): Signal for events that indicate the end of a recognition session (operation).
* [`canceled`](https://learn.microsoft.com/python/api/azure-cognitiveservices-speech/azure.cognitiveservices.speech.recognizer#azure-cognitiveservices-speech-recognizer-canceled): Signal for events that contain canceled recognition results. These results indicate a recognition attempt that was canceled as a result of a direct cancellation request. Alternatively, they indicate a transport or protocol failure.

```Python
speech_recognizer.recognizing.connect(lambda evt: print('RECOGNIZING: {}'.format(evt)))
speech_recognizer.recognized.connect(lambda evt: print('RECOGNIZED: {}'.format(evt)))
speech_recognizer.session_started.connect(lambda evt: print('SESSION STARTED: {}'.format(evt)))
speech_recognizer.session_stopped.connect(lambda evt: print('SESSION STOPPED {}'.format(evt)))
speech_recognizer.canceled.connect(lambda evt: print('CANCELED {}'.format(evt)))

speech_recognizer.session_stopped.connect(stop_cb)
speech_recognizer.canceled.connect(stop_cb)
```

With everything set up, you can call [start_continuous_recognition()](https://learn.microsoft.com/python/api/azure-cognitiveservices-speech/azure.cognitiveservices.speech.recognizer#azure-cognitiveservices-speech-recognizer-start-continuous-recognition):

```Python
speech_recognizer.start_continuous_recognition()
while not done:
    time.sleep(.5)
```

## Change the source language

A common task for speech recognition is specifying the input (or source) language. The following example shows how to change the input language to German. In your code, find your `SpeechConfig` instance and add this line directly below it:

```Python
speech_config.speech_recognition_language="de-DE"
```

[`speech_recognition_language`](https://learn.microsoft.com/python/api/azure-cognitiveservices-speech/azure.cognitiveservices.speech.speechconfig#azure-cognitiveservices-speech-speechconfig-speech-recognition-language) is a parameter that takes a string as an argument. For a list of supported locales, see [Language and voice support for the Speech service](../../../language-support.md).

## Language identification

You can use language identification with Speech to text recognition when you need to identify the language in an audio source and then transcribe it to text.

For a complete code sample, see [Language identification](../../../language-identification.md?pivots=programming-language-python).

## Use a custom endpoint

With [custom speech](../../../custom-speech-overview.md), you can upload your own data, test and train a custom model, compare accuracy between models, and deploy a model to a custom endpoint. The following example shows how to set a custom endpoint.

```python
speech_config = speechsdk.SpeechConfig(subscription="YourSpeechResoureKey", region="YourServiceRegion")
speech_config.endpoint_id = "YourEndpointId"
speech_recognizer = speechsdk.SpeechRecognizer(speech_config=speech_config)
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

```python
speech_config.set_property(speechsdk.PropertyId.Speech_SegmentationStrategy, "Semantic") 
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
