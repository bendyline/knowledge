---
title: "How to synthesize speech from text - Speech service"
titleSuffix: Foundry Tools
description: Learn how to convert text to speech, including object construction and design patterns, supported audio output formats, and custom configuration options.
author: PatrickFarley
ms.author: pafarley
manager: mcleans
ms.service: azure-speech-foundry-tools
ms.topic: how-to
ms.date: 02/25/2026
ms.custom: devx-track-python, devx-track-js, devx-track-csharp, mode-other, devx-track-extended-java, devx-track-go
zone_pivot_groups: programming-languages-speech-services
#Customer intent: As a developer, I want to learn how to synthesize speech from text so that I can convert text into spoken language.
---

# How to synthesize speech from text

**Applies to: programming-language-rest**



[Speech to text REST API reference](rest-speech-to-text.md) | [Speech to text REST API for short audio reference](rest-speech-to-text-short.md) | [Additional samples on GitHub](https://github.com/Azure-Samples/cognitive-services-speech-sdk)



In this how-to guide, you learn common design patterns for doing text to speech synthesis.

For more information about the following areas, see [What is text to speech?](text-to-speech.md)

- Getting responses as in-memory streams.
- Customizing output sample rate and bit rate.
- Submitting synthesis requests by using Speech Synthesis Markup Language (SSML).
- Using neural voices.
- Subscribing to events and acting on results.


## Prerequisites


> 
> - An Azure subscription. You can [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
> - [Create a Foundry resource for Speech](https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry) in the Azure portal.
> - Get the Speech resource key and region. After your Speech resource is deployed, select **Go to resource** to view and manage keys.


## Convert text to speech

At a command prompt, run the following command. Insert these values into the command:

- Your Speech resource key
- Your Speech resource region

You might also want to change the following values:

- The `X-Microsoft-OutputFormat` header value, which controls the audio output format. You can find a list of supported audio output formats in the [text to speech REST API reference](rest-text-to-speech.md#audio-outputs).
- The output voice. To get a list of voices available for your Speech service endpoint, see the [Voice List API](rest-text-to-speech.md#get-a-list-of-voices).
- The output file. In this example, we direct the response from the server into a file named `output.mp3`.

```curl
curl --location --request POST 'https://YourResourceName.cognitiveservices.azure.com/tts/cognitiveservices/v1' \
--header 'Ocp-Apim-Subscription-Key: YOUR_RESOURCE_KEY' \
--header 'Content-Type: application/ssml+xml' \
--header 'X-Microsoft-OutputFormat: audio-16khz-128kbitrate-mono-mp3' \
--header 'User-Agent: curl' \
--data-raw '<speak version='\''1.0'\'' xml:lang='\''en-US'\''>
    <voice name='\''en-US-Ava:DragonHDLatestNeural'\''>
        I am excited to try text to speech
    </voice>
</speak>' > output.mp3
```



**Applies to: programming-language-python**



[Reference documentation](https://learn.microsoft.com/python/api/azure-cognitiveservices-speech/) | [Package (PyPi)](https://pypi.org/project/azure-cognitiveservices-speech/) | [Additional samples on GitHub](https://aka.ms/speech/github-python)



In this how-to guide, you learn common design patterns for doing text to speech synthesis.

For more information about the following areas, see [What is text to speech?](text-to-speech.md)

- Getting responses as in-memory streams.
- Customizing output sample rate and bit rate.
- Submitting synthesis requests by using Speech Synthesis Markup Language (SSML).
- Using neural voices.
- Subscribing to events and acting on results.


## Select synthesis language and voice

The text to speech feature in the Speech service supports more than 400 voices and more than 140 languages and variants. You can get the [full list](language-support.md?tabs=tts) or try them in the [Voice Gallery](https://speech.microsoft.com/portal/voicegallery).

Specify the language or voice of `SpeechConfig` to match your input text and use the specified voice:

```python
# Set either the `SpeechSynthesisVoiceName` or `SpeechSynthesisLanguage`.
speech_config.speech_synthesis_language = "en-US" 
speech_config.speech_synthesis_voice_name ="en-US-Ava:DragonHDLatestNeural"
```

All neural voices are multilingual and fluent in their own language and English. For example, if the input text in English is, "I'm excited to try text to speech," and you select `es-ES-Ximena:DragonHDLatestNeural`, the text is spoken in English with a Spanish accent.

If the voice doesn't speak the language of the input text, the Speech service doesn't create synthesized audio. For a full list of supported neural voices, see [Language and voice support for the Speech service](language-support.md?tabs=tts).

> **Note:**
> The default voice is the first voice returned per locale from the [Voice List API](rest-text-to-speech.md#get-a-list-of-voices).

The voice that speaks is determined in order of priority as follows:

- If you don't set `SpeechSynthesisVoiceName` or `SpeechSynthesisLanguage`, the default voice for `en-US` speaks.
- If you only set `SpeechSynthesisLanguage`, the default voice for the specified locale speaks.
- If both `SpeechSynthesisVoiceName` and `SpeechSynthesisLanguage` are set, the `SpeechSynthesisLanguage` setting is ignored. The voice that you specify by using `SpeechSynthesisVoiceName` speaks.
- If the voice element is set by using [Speech Synthesis Markup Language (SSML)](speech-synthesis-markup.md), the `SpeechSynthesisVoiceName` and `SpeechSynthesisLanguage` settings are ignored.

In summary, the order of priority can be described as:

| `SpeechSynthesisVoiceName` | `SpeechSynthesisLanguage` | SSML | Outcome |
| :---: | :---: | :---: | --- |
| ✗ | ✗ | ✗ | Default voice for `en-US` speaks |
| ✗ | ✔ | ✗ | Default voice for specified locale speaks. |
| ✔ | ✔ | ✗ | The voice that you specify by using `SpeechSynthesisVoiceName` speaks. |
| ✔ | ✔ | ✔ | The voice that you specify by using SSML speaks. |

## Synthesize speech to a file

Create a [SpeechSynthesizer](https://learn.microsoft.com/python/api/azure-cognitiveservices-speech/azure.cognitiveservices.speech.speechsynthesizer) object. This object runs text to speech conversions and outputs to speakers, files, or other output streams. `SpeechSynthesizer` accepts as parameters:

- The [`SpeechConfig`](https://learn.microsoft.com/python/api/azure-cognitiveservices-speech/azure.cognitiveservices.speech.speechconfig) object that you created in the previous step.
- An [`AudioOutputConfig`](https://learn.microsoft.com/python/api/azure-cognitiveservices-speech/azure.cognitiveservices.speech.audio.audiooutputconfig) object that specifies how output results should be handled.

1. Create an `AudioOutputConfig` instance to automatically write the output to a *.wav* file by using the `filename` constructor parameter:

   ```python
   audio_config = speechsdk.audio.AudioOutputConfig(filename="path/to/write/file.wav")
   ```

1. Instantiate `SpeechSynthesizer` by passing your `speech_config` object and the `audio_config` object as parameters. To synthesize speech and write to a file, run `speak_text_async()` with a string of text.

   ```python
   speech_synthesizer = speechsdk.SpeechSynthesizer(speech_config=speech_config, audio_config=audio_config)
   speech_synthesis_result = speech_synthesizer.speak_text_async("I'm excited to try text to speech").get()
    
   ```

When you run the program, it creates a synthesized *.wav* file, which is written to the location that you specify. This result is a good example of the most basic usage. Next, you can customize output and handle the output response as an in-memory stream for working with custom scenarios.

## Synthesize to speaker output

To output synthesized speech to the current active output device such as a speaker, set the `use_default_speaker` parameter when you create the `AudioOutputConfig` instance. Here's an example:

```python
audio_config = speechsdk.audio.AudioOutputConfig(use_default_speaker=True)
```

## Get a result as an in-memory stream

You can use the resulting audio data as an in-memory stream rather than directly writing to a file. With in-memory stream, you can build custom behavior:

- Abstract the resulting byte array as a seekable stream for custom downstream services.
- Integrate the result with other APIs or services.
- Modify the audio data, write custom *.wav* headers, and do related tasks.

You can make this change to the previous example. First, remove `AudioConfig`, because you manage the output behavior manually from this point onward for increased control. Pass `None` for `AudioConfig` in the `SpeechSynthesizer` constructor.

> **Note:**
> Passing `None` for `AudioConfig`, rather than omitting it as you did in the previous speaker output example, doesn't play the audio by default on the current active output device.

Save the result to a [`SpeechSynthesisResult`](https://learn.microsoft.com/python/api/azure-cognitiveservices-speech/azure.cognitiveservices.speech.speechsynthesisresult) variable. The `audio_data` property contains a `bytes` object of the output data. You can work with this object manually, or you can use the [`AudioDataStream`](https://learn.microsoft.com/python/api/azure-cognitiveservices-speech/azure.cognitiveservices.speech.audiodatastream) class to manage the in-memory stream.

In this example, use the `AudioDataStream` constructor to get a stream from the result:

```python
speech_synthesizer = speechsdk.SpeechSynthesizer(speech_config=speech_config, audio_config=None)
speech_synthesis_result = speech_synthesizer.speak_text_async("I'm excited to try text to speech").get()
stream = speechsdk.AudioDataStream(speech_synthesis_result)
```

At this point, you can implement any custom behavior by using the resulting `stream` object.

## Customize audio format

You can customize audio output attributes, including:

- Audio file type
- Sample rate
- Bit depth

To change the audio format, use the `set_speech_synthesis_output_format()` function on the `SpeechConfig` object. This function expects an `enum` instance of type [SpeechSynthesisOutputFormat](https://learn.microsoft.com/python/api/azure-cognitiveservices-speech/azure.cognitiveservices.speech.speechsynthesisoutputformat). Use the `enum` to select the output format. For available formats, see the [list of audio formats](https://learn.microsoft.com/python/api/azure-cognitiveservices-speech/azure.cognitiveservices.speech.speechsynthesisoutputformat).

There are various options for different file types, depending on your requirements. By definition, raw formats like `Raw24Khz16BitMonoPcm` don't include audio headers. Use raw formats only in one of these situations:

- You know that your downstream implementation can decode a raw bitstream.
- You plan to manually build headers based on factors like bit depth, sample rate, and number of channels.

This example specifies the high-fidelity RIFF format `Riff24Khz16BitMonoPcm` by setting `SpeechSynthesisOutputFormat` on the `SpeechConfig` object. Similar to the example in the previous section, you use [`AudioDataStream`](https://learn.microsoft.com/python/api/azure-cognitiveservices-speech/azure.cognitiveservices.speech.audiodatastream) to get an in-memory stream of the result, and then write it to a file.

```python
speech_config.set_speech_synthesis_output_format(speechsdk.SpeechSynthesisOutputFormat.Riff24Khz16BitMonoPcm)
speech_synthesizer = speechsdk.SpeechSynthesizer(speech_config=speech_config, audio_config=None)

speech_synthesis_result = speech_synthesizer.speak_text_async("I'm excited to try text to speech").get()
stream = speechsdk.AudioDataStream(speech_synthesis_result)
stream.save_to_wav_file("path/to/write/file.wav")
```

When you run the program, it writes a *.wav* file to the specified path.

## Use SSML to customize speech characteristics

You can use SSML to fine-tune the pitch, pronunciation, speaking rate, volume, and other aspects in the text to speech output by submitting your requests from an XML schema. This section shows an example of changing the voice. For more information, see [Speech Synthesis Markup Language overview](speech-synthesis-markup.md).

To start using SSML for customization, make a minor change that switches the voice.

1. Create a new XML file for the SSML configuration in your root project directory.

   ```xml
   <speak version="1.0" xmlns="https://www.w3.org/2001/10/synthesis" xml:lang="en-US">
     <voice name="en-US-Ava:DragonHDLatestNeural">
       When you're on the freeway, it's a good idea to use a GPS.
     </voice>
   </speak>
   ```

   In this example, the file is *ssml.xml*. The root element is always `<speak>`. Wrapping the text in a `<voice>` element allows you to change the voice by using the `name` parameter. For the full list of supported neural voices, see [Supported languages](language-support.md?tabs=tts).

1. Change the speech synthesis request to reference your XML file. The request is mostly the same. Instead of using the `speak_text_async()` function, use `speak_ssml_async()`. This function expects an XML string. First read your SSML configuration as a string. From this point, the result object is exactly the same as previous examples.

   > **Note:**
   > If your `ssml_string` contains `ï»¿` at the beginning of the string, you need to strip off the BOM format or the service will return an error. You do this by setting the `encoding` parameter as follows: `open("ssml.xml", "r", encoding="utf-8-sig")`.

   ```python
   speech_synthesizer = speechsdk.SpeechSynthesizer(speech_config=speech_config, audio_config=None)

   ssml_string = open("ssml.xml", "r").read()
   speech_synthesis_result = speech_synthesizer.speak_ssml_async(ssml_string).get()

   stream = speechsdk.AudioDataStream(speech_synthesis_result)
   stream.save_to_wav_file("path/to/write/file.wav")
   ```

> **Note:**
> To change the voice without using SSML, you can set the property on `SpeechConfig` by using `speech_config.speech_synthesis_voice_name = "en-US-Ava:DragonHDLatestNeural"`.

## Subscribe to synthesizer events

You might want more insights about the text to speech processing and results. For example, you might want to know when the synthesizer starts and stops, or you might want to know about other events encountered during synthesis. 

While using the [SpeechSynthesizer](https://learn.microsoft.com/python/api/azure-cognitiveservices-speech/azure.cognitiveservices.speech.speechsynthesizer) for text to speech, you can subscribe to the events in this table:



| Event | Description | Use case |
| :--- | :--- | :--- |
| `BookmarkReached` | Signals that a bookmark was reached. To trigger a bookmark reached event, a `bookmark` element is required in the [SSML](speech-synthesis-markup-structure.md#bookmark-element). This event reports the output audio's elapsed time between the beginning of synthesis and the `bookmark` element. The event's `Text` property is the string value that you set in the bookmark's `mark` attribute. The `bookmark` elements aren't spoken. | You can use the `bookmark` element to insert custom markers in SSML to get the offset of each marker in the audio stream. The `bookmark` element can be used to reference a specific location in the text or tag sequence. |
| `SynthesisCanceled` | Signals that the speech synthesis was canceled. | You can confirm when synthesis is canceled. |
| `SynthesisCompleted` | Signals that speech synthesis is complete. | You can confirm when synthesis is complete. |
| `SynthesisStarted` | Signals that speech synthesis started. | You can confirm when synthesis started. |
| `Synthesizing` | Signals that speech synthesis is ongoing. This event fires each time the SDK receives an audio chunk from the Speech service. | You can confirm when synthesis is in progress. |
| `VisemeReceived` | Signals that a viseme event was received. | [Visemes](how-to-speech-synthesis-viseme.md) are often used to represent the key poses in observed speech. Key poses include the position of the lips, jaw, and tongue in producing a particular phoneme. You can use visemes to animate the face of a character as speech audio plays. |
| `WordBoundary` | Signals that a word boundary was received. This event is raised at the beginning of each new spoken word, punctuation, and sentence. The event reports the current word's time offset, in ticks, from the beginning of the output audio. This event also reports the character position in the input text or [SSML](speech-synthesis-markup.md) immediately before the word that's about to be spoken. | This event is commonly used to get relative positions of the text and corresponding audio. You might want to know about a new word, and then take action based on the timing. For example, you can get information that can help you decide when and for how long to highlight words as they're spoken. |

> **Note:**
> Events are raised as the output audio data becomes available, which is faster than playback to an output device. The caller must appropriately synchronize streaming and real-time.


Here's an example that shows how to subscribe to events for speech synthesis. 

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/azure-key-vault.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/how-to-speech-synthesis.md)

You can follow the instructions in the [quickstart](get-started-text-to-speech.md?pivots=python), but replace the contents of that *speech-synthesis.py* file with the following Python code:

```python
import os
import azure.cognitiveservices.speech as speechsdk

def speech_synthesizer_bookmark_reached_cb(evt: speechsdk.SessionEventArgs):
    print('BookmarkReached event:')
    print('\tAudioOffset: {}ms'.format((evt.audio_offset + 5000) / 10000))
    print('\tText: {}'.format(evt.text))

def speech_synthesizer_synthesis_canceled_cb(evt: speechsdk.SessionEventArgs):
    print('SynthesisCanceled event')

def speech_synthesizer_synthesis_completed_cb(evt: speechsdk.SessionEventArgs):
    print('SynthesisCompleted event:')
    print('\tAudioData: {} bytes'.format(len(evt.result.audio_data)))
    print('\tAudioDuration: {}'.format(evt.result.audio_duration))

def speech_synthesizer_synthesis_started_cb(evt: speechsdk.SessionEventArgs):
    print('SynthesisStarted event')

def speech_synthesizer_synthesizing_cb(evt: speechsdk.SessionEventArgs):
    print('Synthesizing event:')
    print('\tAudioData: {} bytes'.format(len(evt.result.audio_data)))

def speech_synthesizer_viseme_received_cb(evt: speechsdk.SessionEventArgs):
    print('VisemeReceived event:')
    print('\tAudioOffset: {}ms'.format((evt.audio_offset + 5000) / 10000))
    print('\tVisemeId: {}'.format(evt.viseme_id))

def speech_synthesizer_word_boundary_cb(evt: speechsdk.SessionEventArgs):
    print('WordBoundary event:')
    print('\tBoundaryType: {}'.format(evt.boundary_type))
    print('\tAudioOffset: {}ms'.format((evt.audio_offset + 5000) / 10000))
    print('\tDuration: {}'.format(evt.duration))
    print('\tText: {}'.format(evt.text))
    print('\tTextOffset: {}'.format(evt.text_offset))
    print('\tWordLength: {}'.format(evt.word_length))

# This example requires environment variables named "SPEECH_KEY" and "SPEECH_REGION"
speech_config = speechsdk.SpeechConfig(subscription=os.environ.get('SPEECH_KEY'), region=os.environ.get('SPEECH_REGION'))

# Required for WordBoundary event sentences.
speech_config.set_property(property_id=speechsdk.PropertyId.SpeechServiceResponse_RequestSentenceBoundary, value='true')

audio_config = speechsdk.audio.AudioOutputConfig(use_default_speaker=True)
speech_synthesizer = speechsdk.SpeechSynthesizer(speech_config=speech_config, audio_config=audio_config)

# Subscribe to events
speech_synthesizer.bookmark_reached.connect(speech_synthesizer_bookmark_reached_cb)
speech_synthesizer.synthesis_canceled.connect(speech_synthesizer_synthesis_canceled_cb)
speech_synthesizer.synthesis_completed.connect(speech_synthesizer_synthesis_completed_cb)
speech_synthesizer.synthesis_started.connect(speech_synthesizer_synthesis_started_cb)
speech_synthesizer.synthesizing.connect(speech_synthesizer_synthesizing_cb)
speech_synthesizer.viseme_received.connect(speech_synthesizer_viseme_received_cb)
speech_synthesizer.synthesis_word_boundary.connect(speech_synthesizer_word_boundary_cb)

# The language of the voice that speaks.
speech_synthesis_voice_name='en-US-AvaMultilingualNeural'

ssml = """<speak version='1.0' xml:lang='en-US' xmlns='http://www.w3.org/2001/10/synthesis' xmlns:mstts='http://www.w3.org/2001/mstts'>
    <voice name='{}'>
        <mstts:viseme type='redlips_front'/>
        The rainbow has seven colors: <bookmark mark='colors_list_begin'/>Red, orange, yellow, green, blue, indigo, and violet.<bookmark mark='colors_list_end'/>.
    </voice>
</speak>""".format(speech_synthesis_voice_name)

# Synthesize the SSML
print("SSML to synthesize: \r\n{}".format(ssml))
speech_synthesis_result = speech_synthesizer.speak_ssml_async(ssml).get()

if speech_synthesis_result.reason == speechsdk.ResultReason.SynthesizingAudioCompleted:
    print("SynthesizingAudioCompleted result")
elif speech_synthesis_result.reason == speechsdk.ResultReason.Canceled:
    cancellation_details = speech_synthesis_result.cancellation_details
    print("Speech synthesis canceled: {}".format(cancellation_details.reason))
    if cancellation_details.reason == speechsdk.CancellationReason.Error:
        if cancellation_details.error_details:
            print("Error details: {}".format(cancellation_details.error_details))
            print("Did you set the speech resource key and region values?")
```

You can find more text to speech samples at [GitHub](https://aka.ms/csspeech/samples).

## Use a custom endpoint

The custom endpoint is functionally identical to the standard endpoint that's used for text to speech requests. 

One difference is that the `endpoint_id` must be specified to use your custom voice via the Speech SDK. You can start with the [text to speech quickstart](get-started-text-to-speech.md) and then update the code with the `endpoint_id` and `speech_synthesis_voice_name`.

```Python
speech_config = speechsdk.SpeechConfig(subscription=os.environ.get('SPEECH_KEY'), region=os.environ.get('SPEECH_REGION'))
speech_config.endpoint_id = "YourEndpointId"
speech_config.speech_synthesis_voice_name = "YourCustomVoiceName"
```

To use a custom voice via [Speech Synthesis Markup Language (SSML)](speech-synthesis-markup-voice.md#use-voice-elements), specify the model name as the voice name. This example uses the `YourCustomVoiceName` voice. 

```xml
<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US">
    <voice name="YourCustomVoiceName">
        This is the text that is spoken. 
    </voice>
</speak>
```

## Run and use a container

Speech containers provide websocket-based query endpoint APIs that are accessed through the Speech SDK and Speech CLI. By default, the Speech SDK and Speech CLI use the public Speech service. To use the container, you need to change the initialization method. Use a container host URL instead of key and region.

For more information about containers, see [Install and run Speech containers with Docker](speech-container-howto.md).



**Applies to: programming-language-csharp**



[Reference documentation](https://learn.microsoft.com/dotnet/api/microsoft.cognitiveservices.speech) | [Package (NuGet)](https://www.nuget.org/packages/Microsoft.CognitiveServices.Speech) | [Additional samples on GitHub](https://aka.ms/speech/github-csharp)



In this how-to guide, you learn common design patterns for doing text to speech synthesis.

For more information about the following areas, see [What is text to speech?](text-to-speech.md)

- Getting responses as in-memory streams.
- Customizing output sample rate and bit rate.
- Submitting synthesis requests by using Speech Synthesis Markup Language (SSML).
- Using neural voices.
- Subscribing to events and acting on results.


## Select synthesis language and voice

The text to speech feature in the Speech service supports more than 400 voices and more than 140 languages and variants. You can get the [full list](language-support.md?tabs=tts) or try them in the [Voice Gallery](https://speech.microsoft.com/portal/voicegallery).

Specify the language or voice of `SpeechConfig` to match your input text and use the specified voice. The following code snippet shows how this technique works:

```csharp
static async Task SynthesizeAudioAsync()
{
    var speechConfig = SpeechConfig.FromSubscription("YourSpeechKey", "YourSpeechRegion");
    // Set either the `SpeechSynthesisVoiceName` or `SpeechSynthesisLanguage`.
    speechConfig.SpeechSynthesisLanguage = "en-US"; 
    speechConfig.SpeechSynthesisVoiceName = "en-US-Ava:DragonHDLatestNeural";
}
```

All neural voices are multilingual and fluent in their own language and English. For example, if the input text in English, is "I'm excited to try text to speech," and you select `es-ES-Ximena:DragonHDLatestNeural`, the text is spoken in English with a Spanish accent.

If the voice doesn't speak the language of the input text, the Speech service doesn't create synthesized audio. For a full list of supported neural voices, see [Language and voice support for the Speech service](language-support.md?tabs=tts).

> **Note:**
> The default voice is the first voice returned per locale from the [Voice List API](rest-text-to-speech.md#get-a-list-of-voices).

The voice that speaks is determined in order of priority as follows:

- If you don't set `SpeechSynthesisVoiceName` or `SpeechSynthesisLanguage`, the default voice for `en-US` speaks.
- If you only set `SpeechSynthesisLanguage`, the default voice for the specified locale speaks.
- If both `SpeechSynthesisVoiceName` and `SpeechSynthesisLanguage` are set, the `SpeechSynthesisLanguage` setting is ignored. The voice that you specify by using `SpeechSynthesisVoiceName` speaks.
- If the voice element is set by using [Speech Synthesis Markup Language (SSML)](speech-synthesis-markup.md), the `SpeechSynthesisVoiceName` and `SpeechSynthesisLanguage` settings are ignored.

In summary, the order of priority can be described as:

| `SpeechSynthesisVoiceName` | `SpeechSynthesisLanguage` | SSML | Outcome |
| :---: | :---: | :---: | --- |
| ✗ | ✗ | ✗ | Default voice for `en-US` speaks |
| ✗ | ✔ | ✗ | Default voice for specified locale speaks. |
| ✔ | ✔ | ✗ | The voice that you specify by using `SpeechSynthesisVoiceName` speaks. |
| ✔ | ✔ | ✔ | The voice that you specify by using SSML speaks. |

## Synthesize speech to a file

Create a [SpeechSynthesizer](https://learn.microsoft.com/dotnet/api/microsoft.cognitiveservices.speech.speechsynthesizer) object. This object shown in the following snippets runs text to speech conversions and outputs to speakers, files, or other output streams. `SpeechSynthesizer` accepts as parameters:

- The [SpeechConfig](https://learn.microsoft.com/dotnet/api/microsoft.cognitiveservices.speech.speechconfig) object that you created in the previous step.
- An [AudioConfig](https://learn.microsoft.com/dotnet/api/microsoft.cognitiveservices.speech.audio.audioconfig) object that specifies how output results should be handled.

1. Create an `AudioConfig` instance to automatically write the output to a *.wav* file by using the `FromWavFileOutput()` function. Instantiate it with a `using` statement.

   ```csharp
   static async Task SynthesizeAudioAsync()
   {
       var speechConfig = SpeechConfig.FromSubscription("YourSpeechKey", "YourSpeechRegion");
       using var audioConfig = AudioConfig.FromWavFileOutput("path/to/write/file.wav");
   }
   ```

   A `using` statement in this context automatically disposes of unmanaged resources and causes the object to go out of scope after disposal.

1. Instantiate a `SpeechSynthesizer` instance with another `using` statement. Pass your `speechConfig` object and the `audioConfig` object as parameters. To synthesize speech and write to a file, run `SpeakTextAsync()` with a string of text.

```csharp
static async Task SynthesizeAudioAsync()
{
    var speechConfig = SpeechConfig.FromSubscription("YourSpeechKey", "YourSpeechRegion");
    using var audioConfig = AudioConfig.FromWavFileOutput("path/to/write/file.wav");
    using var speechSynthesizer = new SpeechSynthesizer(speechConfig, audioConfig);
    await speechSynthesizer.SpeakTextAsync("I'm excited to try text to speech");
}
```

When you run the program, it creates a synthesized *.wav* file, which is written to the location that you specify. This result is a good example of the most basic usage. Next, you can customize output and handle the output response as an in-memory stream for working with custom scenarios.

## Synthesize to speaker output

To output synthesized speech to the current active output device such as a speaker, omit the `AudioConfig` parameter when you're creating the `SpeechSynthesizer` instance. Here's an example:

```csharp
static async Task SynthesizeAudioAsync()
{
    var speechConfig = SpeechConfig.FromSubscription("YourSpeechKey", "YourSpeechRegion");
    using var speechSynthesizer = new SpeechSynthesizer(speechConfig);
    await speechSynthesizer.SpeakTextAsync("I'm excited to try text to speech");
}
```

## Get a result as an in-memory stream

You can use the resulting audio data as an in-memory stream rather than directly writing to a file. With in-memory stream, you can build custom behavior:

- Abstract the resulting byte array as a seekable stream for custom downstream services.
- Integrate the result with other APIs or services.
- Modify the audio data, write custom .wav headers, and do related tasks.

You can make this change to the previous example. First, remove the `AudioConfig` block, because you manage the output behavior manually from this point onward for increased control. Pass `null` for `AudioConfig` in the `SpeechSynthesizer` constructor.

> **Note:**
> Passing `null` for `AudioConfig`, rather than omitting it as in the previous speaker output example, doesn't play the audio by default on the current active output device.

Save the result to a [SpeechSynthesisResult](https://learn.microsoft.com/dotnet/api/microsoft.cognitiveservices.speech.speechsynthesisresult) variable. The `AudioData` property contains a `byte []` instance for the output data. You can work with this `byte []` instance manually, or you can use the [AudioDataStream](https://learn.microsoft.com/dotnet/api/microsoft.cognitiveservices.speech.audiodatastream) class to manage the in-memory stream.

In this example, you use the `AudioDataStream.FromResult()` static function to get a stream from the result:

```csharp
static async Task SynthesizeAudioAsync()
{
    var speechConfig = SpeechConfig.FromSubscription("YourSpeechKey", "YourSpeechRegion");
    using var speechSynthesizer = new SpeechSynthesizer(speechConfig, null);

    var result = await speechSynthesizer.SpeakTextAsync("I'm excited to try text to speech");
    using var stream = AudioDataStream.FromResult(result);
}
```

At this point, you can implement any custom behavior by using the resulting `stream` object.

## Customize audio format

You can customize audio output attributes, including:

- Audio file type
- Sample rate
- Bit depth

To change the audio format, you use the `SetSpeechSynthesisOutputFormat()` function on the `SpeechConfig` object. This function expects an `enum` instance of type [SpeechSynthesisOutputFormat](https://learn.microsoft.com/dotnet/api/microsoft.cognitiveservices.speech.speechsynthesisoutputformat).  Use the `enum` to select the output format. For available formats, see the [list of audio formats](https://learn.microsoft.com/dotnet/api/microsoft.cognitiveservices.speech.speechsynthesisoutputformat).

There are various options for different file types, depending on your requirements. By definition, raw formats like `Raw24Khz16BitMonoPcm` don't include audio headers. Use raw formats only in one of these situations:

- You know that your downstream implementation can decode a raw bitstream.
- You plan to manually build headers based on factors like bit depth, sample rate, and number of channels.

This example specifies the high-fidelity RIFF format `Riff24Khz16BitMonoPcm` by setting `SpeechSynthesisOutputFormat` on the `SpeechConfig` object. Similar to the example in the previous section, you use [AudioDataStream](https://learn.microsoft.com/dotnet/api/microsoft.cognitiveservices.speech.audiodatastream) to get an in-memory stream of the result, and then write it to a file.

```csharp
static async Task SynthesizeAudioAsync()
{
    var speechConfig = SpeechConfig.FromSubscription("YourSpeechKey", "YourSpeechRegion");
    speechConfig.SetSpeechSynthesisOutputFormat(SpeechSynthesisOutputFormat.Riff24Khz16BitMonoPcm);

    using var speechSynthesizer = new SpeechSynthesizer(speechConfig, null);
    var result = await speechSynthesizer.SpeakTextAsync("I'm excited to try text to speech");

    using var stream = AudioDataStream.FromResult(result);
    await stream.SaveToWaveFileAsync("path/to/write/file.wav");
}
```

When you run the program, it writes a *.wav* file to the specified path.

## Use SSML to customize speech characteristics

You can use SSML to fine-tune the pitch, pronunciation, speaking rate, volume,  and other aspects in the text to speech output by submitting your requests from an XML schema. This section shows an example of changing the voice. For more information, see [Speech Synthesis Markup Language overview](speech-synthesis-markup.md).

To start using SSML for customization, you make a minor change that switches the voice.

1. Create a new XML file for the SSML configuration in your root project directory.

   ```xml
   <speak version="1.0" xmlns="https://www.w3.org/2001/10/synthesis" xml:lang="en-US">
     <voice name="en-US-Ava:DragonHDLatestNeural">
       When you're on the freeway, it's a good idea to use a GPS.
     </voice>
   </speak>
   ```

   In this example, the file is *ssml.xml*. The root element is always `<speak>`. Wrapping the text in a `<voice>` element allows you to change the voice by using the `name` parameter. For the full list of supported neural voices, see [Supported languages](language-support.md?tabs=tts).

1. Change the speech synthesis request to reference your XML file. The request is mostly the same, but instead of using the `SpeakTextAsync()` function, you use `SpeakSsmlAsync()`. This function expects an XML string. First, load your SSML configuration as a string by using `File.ReadAllText()`. From this point, the result object is exactly the same as previous examples.

   > **Note:**
   > If you're using Visual Studio, your build configuration likely won't find your XML file by default. Right-click the XML file and select **Properties**. Change **Build Action** to **Content**. Change **Copy to Output Directory** to **Copy always**.

   ```csharp
   public static async Task SynthesizeAudioAsync()
   {
       var speechConfig = SpeechConfig.FromSubscription("YourSpeechKey", "YourSpeechRegion");
       using var speechSynthesizer = new SpeechSynthesizer(speechConfig, null);

       var ssml = File.ReadAllText("./ssml.xml");
       var result = await speechSynthesizer.SpeakSsmlAsync(ssml);

       using var stream = AudioDataStream.FromResult(result);
       await stream.SaveToWaveFileAsync("path/to/write/file.wav");
   }
   ```

> **Note:**
> To change the voice without using SSML, you can set the property on `SpeechConfig` by using `SpeechConfig.SpeechSynthesisVoiceName = "en-US-Ava:DragonHDLatestNeural";`.

## Subscribe to synthesizer events

You might want more insights about the text to speech processing and results. For example, you might want to know when the synthesizer starts and stops, or you might want to know about other events encountered during synthesis.

While using the [SpeechSynthesizer](https://learn.microsoft.com/dotnet/api/microsoft.cognitiveservices.speech.speechsynthesizer) for text to speech, you can subscribe to the events in this table:



| Event | Description | Use case |
| :--- | :--- | :--- |
| `BookmarkReached` | Signals that a bookmark was reached. To trigger a bookmark reached event, a `bookmark` element is required in the [SSML](speech-synthesis-markup-structure.md#bookmark-element). This event reports the output audio's elapsed time between the beginning of synthesis and the `bookmark` element. The event's `Text` property is the string value that you set in the bookmark's `mark` attribute. The `bookmark` elements aren't spoken. | You can use the `bookmark` element to insert custom markers in SSML to get the offset of each marker in the audio stream. The `bookmark` element can be used to reference a specific location in the text or tag sequence. |
| `SynthesisCanceled` | Signals that the speech synthesis was canceled. | You can confirm when synthesis is canceled. |
| `SynthesisCompleted` | Signals that speech synthesis is complete. | You can confirm when synthesis is complete. |
| `SynthesisStarted` | Signals that speech synthesis started. | You can confirm when synthesis started. |
| `Synthesizing` | Signals that speech synthesis is ongoing. This event fires each time the SDK receives an audio chunk from the Speech service. | You can confirm when synthesis is in progress. |
| `VisemeReceived` | Signals that a viseme event was received. | [Visemes](how-to-speech-synthesis-viseme.md) are often used to represent the key poses in observed speech. Key poses include the position of the lips, jaw, and tongue in producing a particular phoneme. You can use visemes to animate the face of a character as speech audio plays. |
| `WordBoundary` | Signals that a word boundary was received. This event is raised at the beginning of each new spoken word, punctuation, and sentence. The event reports the current word's time offset, in ticks, from the beginning of the output audio. This event also reports the character position in the input text or [SSML](speech-synthesis-markup.md) immediately before the word that's about to be spoken. | This event is commonly used to get relative positions of the text and corresponding audio. You might want to know about a new word, and then take action based on the timing. For example, you can get information that can help you decide when and for how long to highlight words as they're spoken. |

> **Note:**
> Events are raised as the output audio data becomes available, which is faster than playback to an output device. The caller must appropriately synchronize streaming and real-time.


Here's an example that shows how to subscribe to events for speech synthesis. 

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/azure-key-vault.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/how-to-speech-synthesis.md)

You can follow the instructions in the [quickstart](get-started-text-to-speech.md?pivots=csharp), but replace the contents of that *Program.cs* file with the following C# code:

```csharp
using Microsoft.CognitiveServices.Speech;

class Program 
{
    // This example requires environment variables named "SPEECH_KEY" and "SPEECH_REGION"
    static string speechKey = Environment.GetEnvironmentVariable("SPEECH_KEY");
    static string speechRegion = Environment.GetEnvironmentVariable("SPEECH_REGION");

    async static Task Main(string[] args)
    {
        var speechConfig = SpeechConfig.FromSubscription(speechKey, speechRegion);
         
        var speechSynthesisVoiceName  = "en-US-AvaMultilingualNeural";  
        var ssml = @$"<speak version='1.0' xml:lang='en-US' xmlns='http://www.w3.org/2001/10/synthesis' xmlns:mstts='http://www.w3.org/2001/mstts'>
            <voice name='{speechSynthesisVoiceName}'>
                <mstts:viseme type='redlips_front'/>
                The rainbow has seven colors: <bookmark mark='colors_list_begin'/>Red, orange, yellow, green, blue, indigo, and violet.<bookmark mark='colors_list_end'/>.
            </voice>
        </speak>";

        // Required for sentence-level WordBoundary events
        speechConfig.SetProperty(PropertyId.SpeechServiceResponse_RequestSentenceBoundary, "true");

        using (var speechSynthesizer = new SpeechSynthesizer(speechConfig))
        {
            // Subscribe to events

            speechSynthesizer.BookmarkReached += (s, e) =>
            {
                Console.WriteLine($"BookmarkReached event:" +
                    $"\r\n\tAudioOffset: {(e.AudioOffset + 5000) / 10000}ms" +
                    $"\r\n\tText: \"{e.Text}\".");
            };

            speechSynthesizer.SynthesisCanceled += (s, e) =>
            {
                Console.WriteLine("SynthesisCanceled event");
            };

            speechSynthesizer.SynthesisCompleted += (s, e) =>
            {                
                Console.WriteLine($"SynthesisCompleted event:" +
                    $"\r\n\tAudioData: {e.Result.AudioData.Length} bytes" +
                    $"\r\n\tAudioDuration: {e.Result.AudioDuration}");
            };

            speechSynthesizer.SynthesisStarted += (s, e) =>
            {
                Console.WriteLine("SynthesisStarted event");
            };

            speechSynthesizer.Synthesizing += (s, e) =>
            {
                Console.WriteLine($"Synthesizing event:" +
                    $"\r\n\tAudioData: {e.Result.AudioData.Length} bytes");
            };

            speechSynthesizer.VisemeReceived += (s, e) =>
            {
                Console.WriteLine($"VisemeReceived event:" +
                    $"\r\n\tAudioOffset: {(e.AudioOffset + 5000) / 10000}ms" +
                    $"\r\n\tVisemeId: {e.VisemeId}");
            };

            speechSynthesizer.WordBoundary += (s, e) =>
            {
                Console.WriteLine($"WordBoundary event:" +
                    // Word, Punctuation, or Sentence
                    $"\r\n\tBoundaryType: {e.BoundaryType}" +
                    $"\r\n\tAudioOffset: {(e.AudioOffset + 5000) / 10000}ms" +
                    $"\r\n\tDuration: {e.Duration}" +
                    $"\r\n\tText: \"{e.Text}\"" +
                    $"\r\n\tTextOffset: {e.TextOffset}" +
                    $"\r\n\tWordLength: {e.WordLength}");
            };

            // Synthesize the SSML
            Console.WriteLine($"SSML to synthesize: \r\n{ssml}");
            var speechSynthesisResult = await speechSynthesizer.SpeakSsmlAsync(ssml);

            // Output the results
            switch (speechSynthesisResult.Reason)
            {
                case ResultReason.SynthesizingAudioCompleted:
                    Console.WriteLine("SynthesizingAudioCompleted result");
                    break;
                case ResultReason.Canceled:
                    var cancellation = SpeechSynthesisCancellationDetails.FromResult(speechSynthesisResult);
                    Console.WriteLine($"CANCELED: Reason={cancellation.Reason}");

                    if (cancellation.Reason == CancellationReason.Error)
                    {
                        Console.WriteLine($"CANCELED: ErrorCode={cancellation.ErrorCode}");
                        Console.WriteLine($"CANCELED: ErrorDetails=[{cancellation.ErrorDetails}]");
                        Console.WriteLine($"CANCELED: Did you set the speech resource key and region values?");
                    }
                    break;
                default:
                    break;
            }
        }

        Console.WriteLine("Press any key to exit...");
        Console.ReadKey();
    }
}
```

You can find more text to speech samples at [GitHub](https://aka.ms/csspeech/samples).

## Use a custom endpoint

The custom endpoint is functionally identical to the standard endpoint used for text to speech requests. 

One difference is that the `EndpointId` must be specified to use your custom voice via the Speech SDK. You can start with the [text to speech quickstart](get-started-text-to-speech.md) and then update the code with the `EndpointId` and `SpeechSynthesisVoiceName`.

```csharp
var speechConfig = SpeechConfig.FromSubscription(speechKey, speechRegion);     
speechConfig.SpeechSynthesisVoiceName = "YourCustomVoiceName";
speechConfig.EndpointId = "YourEndpointId";
```

To use a custom voice via [Speech Synthesis Markup Language (SSML)](speech-synthesis-markup-voice.md#use-voice-elements), specify the model name as the voice name. This example uses the `YourCustomVoiceName` voice. 

```xml
<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US">
    <voice name="YourCustomVoiceName">
        This is the text that is spoken. 
    </voice>
</speak>
```

## Run and use a container

Speech containers provide websocket-based query endpoint APIs that are accessed through the Speech SDK and Speech CLI. By default, the Speech SDK and Speech CLI use the public Speech service. To use the container, you need to change the initialization method. Use a container host URL instead of key and region.

For more information about containers, see [Install and run Speech containers with Docker](speech-container-howto.md).



**Applies to: programming-language-javascript**



[Reference documentation](https://learn.microsoft.com/javascript/api/microsoft-cognitiveservices-speech-sdk/) | [Package (npm)](https://www.npmjs.com/package/microsoft-cognitiveservices-speech-sdk) | [Additional samples on GitHub](https://aka.ms/speech/github-javascript) | [Library source code](https://github.com/Microsoft/cognitive-services-speech-sdk-js)



In this how-to guide, you learn common design patterns for doing text to speech synthesis.

For more information about the following areas, see [What is text to speech?](text-to-speech.md)

- Getting responses as in-memory streams.
- Customizing output sample rate and bit rate.
- Submitting synthesis requests by using Speech Synthesis Markup Language (SSML).
- Using neural voices.
- Subscribing to events and acting on results.


## Select synthesis language and voice

The text to speech feature in the Speech service supports more than 400 voices and more than 140 languages and variants. You can get the [full list](language-support.md?tabs=tts) or try them in the [Voice Gallery](https://speech.microsoft.com/portal/voicegallery).

Specify the language or voice of `SpeechConfig` to match your input text and use the specified voice:

```javascript
function synthesizeSpeech() {
    const speechConfig = sdk.SpeechConfig.fromSubscription("YourSpeechKey", "YourSpeechRegion");
    // Set either the `SpeechSynthesisVoiceName` or `SpeechSynthesisLanguage`.
    speechConfig.speechSynthesisLanguage = "en-US"; 
    speechConfig.speechSynthesisVoiceName = "en-US-Ava:DragonHDLatestNeural";
}

synthesizeSpeech();
```

All neural voices are multilingual and fluent in their own language and English. For example, if the input text in English is, "I'm excited to try text to speech," and you select `es-ES-Ximena:DragonHDLatestNeural`, the text is spoken in English with a Spanish accent.

If the voice doesn't speak the language of the input text, the Speech service doesn't create synthesized audio. For a full list of supported neural voices, see [Language and voice support for the Speech service](language-support.md?tabs=tts).

> **Note:**
> The default voice is the first voice returned per locale from the [Voice List API](rest-text-to-speech.md#get-a-list-of-voices).

The voice that speaks is determined in order of priority as follows:

- If you don't set `SpeechSynthesisVoiceName` or `SpeechSynthesisLanguage`, the default voice for `en-US` speaks.
- If you only set `SpeechSynthesisLanguage`, the default voice for the specified locale speaks.
- If both `SpeechSynthesisVoiceName` and `SpeechSynthesisLanguage` are set, the `SpeechSynthesisLanguage` setting is ignored. The voice that you specify by using `SpeechSynthesisVoiceName` speaks.
- If the voice element is set by using [Speech Synthesis Markup Language (SSML)](speech-synthesis-markup.md), the `SpeechSynthesisVoiceName` and `SpeechSynthesisLanguage` settings are ignored.

In summary, the order of priority can be described as:

| `SpeechSynthesisVoiceName` | `SpeechSynthesisLanguage` | SSML | Outcome |
| :---: | :---: | :---: | --- |
| ✗ | ✗ | ✗ | Default voice for `en-US` speaks |
| ✗ | ✔ | ✗ | Default voice for specified locale speaks. |
| ✔ | ✔ | ✗ | The voice that you specify by using `SpeechSynthesisVoiceName` speaks. |
| ✔ | ✔ | ✔ | The voice that you specify by using SSML speaks. |

## Synthesize text to speech

# [browserjs](#tab/browserjs)

To output synthesized speech to the current active output device such as a speaker, instantiate `AudioConfig` by using the `fromDefaultSpeakerOutput()` static function. Here's an example:

```javascript
function synthesizeSpeech() {
    const speechConfig = sdk.SpeechConfig.fromSubscription("YourSpeechKey", "YourSpeechRegion");
    const audioConfig = sdk.AudioConfig.fromDefaultSpeakerOutput();

    const speechSynthesizer = new SpeechSynthesizer(speechConfig, audioConfig);
    speechSynthesizer.speakTextAsync(
        "I'm excited to try text to speech",
        result => {
            if (result) {
                speechSynthesizer.close();
                return result.audioData;
            }
        },
        error => {
            console.log(error);
            speechSynthesizer.close();
        });
}
```

When you run the program, synthesized audio is played from the speaker. This result is a good example of the most basic usage. Next, you can customize the output and handle the output response as an in-memory stream for working with custom scenarios.

# [nodejs](#tab/nodejs)

Create a [`SpeechSynthesizer`](https://learn.microsoft.com/javascript/api/microsoft-cognitiveservices-speech-sdk/speechsynthesizer) object. This object runs text to speech conversions and outputs to speakers, files, or other output streams. `SpeechSynthesizer` accepts as parameters:

- The [`SpeechConfig`](https://learn.microsoft.com/javascript/api/microsoft-cognitiveservices-speech-sdk/speechconfig) object that you created in the previous step.
- An [`AudioConfig`](https://learn.microsoft.com/javascript/api/microsoft-cognitiveservices-speech-sdk/audioconfig) object that specifies how output results should be handled.

1. Create an `AudioConfig` instance to automatically write the output to a *.wav* file by using the `fromAudioFileOutput()` static function:

   ```javascript
   function synthesizeSpeech() {
       const speechConfig = sdk.SpeechConfig.fromSubscription("YourSpeechKey", "YourSpeechRegion");
       const audioConfig = sdk.AudioConfig.fromAudioFileOutput("path/to/file.wav");
   }
   ```

1. Instantiate a `SpeechSynthesizer` instance. Pass your `speechConfig` and `audioConfig` objects as parameters. To write synthesized speech to a file, run `speakTextAsync()` with a string of text. The result callback is a great place to call `speechSynthesizer.close()`. The call to `speechSynthesizer.close()` is needed for synthesis to function correctly.

```javascript
function synthesizeSpeech() {
    const speechConfig = sdk.SpeechConfig.fromSubscription("YourSpeechKey", "YourSpeechRegion");
    const audioConfig = sdk.AudioConfig.fromAudioFileOutput("path-to-file.wav");

    const speechSynthesizer = new SpeechSynthesizer(speechConfig, audioConfig);
    speechSynthesizer.speakTextAsync(
        "I'm excited to try text to speech",
        result => {
            speechSynthesizer.close();
            if (result) {
                // return result as stream
                return fs.createReadStream("path-to-file.wav");
            }
        },
        error => {
            console.log(error);
            speechSynthesizer.close();
        });
}
```

Run the program. Synthesized speech is written to a *.wav* file in the location that you specified.

---

## Get a result as an in-memory stream

# [browserjs](#tab/browserjs)

You can use the resulting audio data as an in-memory stream rather than directly writing to a file. With in-memory stream, you can build custom behavior:

- Abstract the resulting byte array as a seekable stream for custom downstream services.
- Integrate the result with other APIs or services.
- Modify the audio data, write custom `.wav` headers, and do related tasks.

You can make this change to the previous example. Remove the `AudioConfig` block, because you manage the output behavior manually from this point onward for increased control. Then pass `null` for `AudioConfig` in the `SpeechSynthesizer` constructor.

> **Note:**
> Passing `null` for `AudioConfig`, rather than omitting it as you did in the previous speaker output example, doesn't play the audio by default on the current active output device.

Save the result to a [SpeechSynthesisResult](https://learn.microsoft.com/javascript/api/microsoft-cognitiveservices-speech-sdk/speechsynthesisresult) variable. The `SpeechSynthesisResult.audioData` property returns an `ArrayBuffer` value of the output data, the default browser stream type. For server-side code, convert `ArrayBuffer` to a buffer stream.

The following code works for the client side:

```javascript
function synthesizeSpeech() {
    const speechConfig = sdk.SpeechConfig.fromSubscription("YourSpeechKey", "YourSpeechRegion");
    const speechSynthesizer = new sdk.SpeechSynthesizer(speechConfig);

    speechSynthesizer.speakTextAsync(
        "I'm excited to try text to speech",
        result => {
            speechSynthesizer.close();
            return result.audioData;
        },
        error => {
            console.log(error);
            speechSynthesizer.close();
        });
}
```

You can implement any custom behavior by using the resulting `ArrayBuffer` object. `ArrayBuffer` is a common type to receive in a browser and play from this format.

For any server-based code, if you need to work with the data as a stream, you need to convert the `ArrayBuffer` object into a stream:

```javascript
function synthesizeSpeech() {
    const speechConfig = sdk.SpeechConfig.fromSubscription("YourSpeechKey", "YourSpeechRegion");
    const speechSynthesizer = new sdk.SpeechSynthesizer(speechConfig);

    speechSynthesizer.speakTextAsync(
        "I'm excited to try text to speech",
        result => {
            const { audioData } = result;

            speechSynthesizer.close();

            // convert arrayBuffer to stream
            // return stream
            const bufferStream = new PassThrough();
            bufferStream.end(Buffer.from(audioData));
            return bufferStream;
        },
        error => {
            console.log(error);
            speechSynthesizer.close();
        });
}
```

# [nodejs](#tab/nodejs)

For many scenarios in speech application development, you might need the audio data as an in-memory stream rather than directly writing to a file. You can build custom behavior:

- Abstract the resulting byte array as a seekable stream for custom downstream services.
- Integrate the result with other APIs or services.
- Modify the audio data and write custom *.wav* headers.

In the following example, you save the result to a [`SpeechSynthesisResult`](https://learn.microsoft.com/javascript/api/microsoft-cognitiveservices-speech-sdk/speechsynthesisresult) variable. The `SpeechSynthesisResult.audioData` property returns an `ArrayBuffer` value of the output data, the default browser stream type. For server-side code, convert `ArrayBuffer` to a buffer stream.

The following code works for the client side:

```javascript
function synthesizeSpeech() {
    const speechConfig = sdk.SpeechConfig.fromSubscription("YourSpeechKey", "YourSpeechRegion");
    const speechSynthesizer = new sdk.SpeechSynthesizer(speechConfig);

    speechSynthesizer.speakTextAsync(
        "I'm excited to try text to speech",
        result => {
            speechSynthesizer.close();
            return result.audioData;
        },
        error => {
            console.log(error);
            speechSynthesizer.close();
        });
}
```

You can implement any custom behavior by using the resulting `ArrayBuffer` object. `ArrayBuffer` is a common type to receive in a browser and play from this format.

For any server-based code, if you need to work with the data as a stream, you need to convert the `ArrayBuffer` object into a stream:

```javascript
function synthesizeSpeech() {
    const speechConfig = sdk.SpeechConfig.fromSubscription("YourSpeechKey", "YourSpeechRegion");
    const speechSynthesizer = new sdk.SpeechSynthesizer(speechConfig);

    speechSynthesizer.speakTextAsync(
        "I'm excited to try text to speech",
        result => {
            const { audioData } = result;

            speechSynthesizer.close();

            // convert arrayBuffer to stream
            const bufferStream = new PassThrough();
            bufferStream.end(Buffer.from(audioData));
            return bufferStream;
        },
        error => {
            console.log(error);
            speechSynthesizer.close();
        });
}
```

---

## Customize audio format

You can customize audio output attributes, including:

- Audio file type
- Sample rate
- Bit depth

To change the audio format, use the `speechSynthesisOutputFormat` property on the `SpeechConfig` object. This property expects an `enum` instance of type [SpeechSynthesisOutputFormat](https://learn.microsoft.com/javascript/api/microsoft-cognitiveservices-speech-sdk/speechsynthesisoutputformat). Use the `enum` to select the output format. For available formats, see the [list of audio formats](https://learn.microsoft.com/javascript/api/microsoft-cognitiveservices-speech-sdk/speechsynthesisoutputformat).

There are various options for different file types, depending on your requirements. By definition, raw formats like `Raw24Khz16BitMonoPcm` don't include audio headers. Use raw formats only in one of these situations:

- You know that your downstream implementation can decode a raw bitstream.
- You plan to manually build headers based on factors like bit depth, sample rate, and number of channels.

This example specifies the high-fidelity RIFF format `Riff24Khz16BitMonoPcm` by setting `speechSynthesisOutputFormat` on the `SpeechConfig` object. Similar to the example in the previous section, get the audio `ArrayBuffer` data and interact with it.

```javascript
function synthesizeSpeech() {
    const speechConfig = SpeechConfig.fromSubscription("YourSpeechKey", "YourSpeechRegion");

    // Set the output format
    speechConfig.speechSynthesisOutputFormat = sdk.SpeechSynthesisOutputFormat.Riff24Khz16BitMonoPcm;

    const speechSynthesizer = new sdk.SpeechSynthesizer(speechConfig, null);
    speechSynthesizer.speakTextAsync(
        "I'm excited to try text to speech",
        result => {
            // Interact with the audio ArrayBuffer data
            const audioData = result.audioData;
            console.log(`Audio data byte size: ${audioData.byteLength}.`)

            speechSynthesizer.close();
        },
        error => {
            console.log(error);
            speechSynthesizer.close();
        });
}
```

## Use SSML to customize speech characteristics

You can use SSML to fine-tune the pitch, pronunciation, speaking rate, volume, and other aspects in the text to speech output by submitting your requests from an XML schema. This section shows an example of changing the voice. For more information, see [Speech Synthesis Markup Language overview](speech-synthesis-markup.md).

To start using SSML for customization, you make a minor change that switches the voice.

1. Create a new XML file for the SSML configuration in your root project directory.

   ```xml
   <speak version="1.0" xmlns="https://www.w3.org/2001/10/synthesis" xml:lang="en-US">
     <voice name="en-US-Ava:DragonHDLatestNeural">
       When you're on the freeway, it's a good idea to use a GPS.
     </voice>
   </speak>
   ```

   In this example, it's *ssml.xml*. The root element is always `<speak>`. Wrapping the text in a `<voice>` element allows you to change the voice by using the `name` parameter. For the full list of supported neural voices, see [Supported languages](language-support.md?tabs=tts).

1. Change the speech synthesis request to reference your XML file. The request is mostly the same, but instead of using the `speakTextAsync()` function, you use `speakSsmlAsync()`. This function expects an XML string. Create a function to load an XML file and return it as a string:

   ```javascript
   function xmlToString(filePath) {
       const xml = readFileSync(filePath, "utf8");
       return xml;
   }
   ```

   For more information on `readFileSync`, see [Node.js file system](https://nodejs.org/api/fs.html#fs_fs_readlinksync_path_options).

   The result object is exactly the same as previous examples:

   ```javascript
   function synthesizeSpeech() {
       const speechConfig = sdk.SpeechConfig.fromSubscription("YourSpeechKey", "YourSpeechRegion");
       const speechSynthesizer = new sdk.SpeechSynthesizer(speechConfig, null);

       const ssml = xmlToString("ssml.xml");
       speechSynthesizer.speakSsmlAsync(
           ssml,
           result => {
               if (result.errorDetails) {
                   console.error(result.errorDetails);
               } else {
                   console.log(JSON.stringify(result));
               }

               speechSynthesizer.close();
           },
           error => {
               console.log(error);
               speechSynthesizer.close();
           });
   }
   ```

> **Note:**
> To change the voice without using SSML, you can set the property on `SpeechConfig` by using `SpeechConfig.speechSynthesisVoiceName = "en-US-Ava:DragonHDLatestNeural";`.

## Subscribe to synthesizer events

You might want more insights about the text to speech processing and results. For example, you might want to know when the synthesizer starts and stops, or you might want to know about other events encountered during synthesis.

While using the [SpeechSynthesizer](https://learn.microsoft.com/javascript/api/microsoft-cognitiveservices-speech-sdk/speechsynthesizer) for text to speech, you can subscribe to the events in this table:



| Event | Description | Use case |
| :--- | :--- | :--- |
| `BookmarkReached` | Signals that a bookmark was reached. To trigger a bookmark reached event, a `bookmark` element is required in the [SSML](speech-synthesis-markup-structure.md#bookmark-element). This event reports the output audio's elapsed time between the beginning of synthesis and the `bookmark` element. The event's `Text` property is the string value that you set in the bookmark's `mark` attribute. The `bookmark` elements aren't spoken. | You can use the `bookmark` element to insert custom markers in SSML to get the offset of each marker in the audio stream. The `bookmark` element can be used to reference a specific location in the text or tag sequence. |
| `SynthesisCanceled` | Signals that the speech synthesis was canceled. | You can confirm when synthesis is canceled. |
| `SynthesisCompleted` | Signals that speech synthesis is complete. | You can confirm when synthesis is complete. |
| `SynthesisStarted` | Signals that speech synthesis started. | You can confirm when synthesis started. |
| `Synthesizing` | Signals that speech synthesis is ongoing. This event fires each time the SDK receives an audio chunk from the Speech service. | You can confirm when synthesis is in progress. |
| `VisemeReceived` | Signals that a viseme event was received. | [Visemes](how-to-speech-synthesis-viseme.md) are often used to represent the key poses in observed speech. Key poses include the position of the lips, jaw, and tongue in producing a particular phoneme. You can use visemes to animate the face of a character as speech audio plays. |
| `WordBoundary` | Signals that a word boundary was received. This event is raised at the beginning of each new spoken word, punctuation, and sentence. The event reports the current word's time offset, in ticks, from the beginning of the output audio. This event also reports the character position in the input text or [SSML](speech-synthesis-markup.md) immediately before the word that's about to be spoken. | This event is commonly used to get relative positions of the text and corresponding audio. You might want to know about a new word, and then take action based on the timing. For example, you can get information that can help you decide when and for how long to highlight words as they're spoken. |

> **Note:**
> Events are raised as the output audio data becomes available, which is faster than playback to an output device. The caller must appropriately synchronize streaming and real-time.


Here's an example that shows how to subscribe to events for speech synthesis. 

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/azure-key-vault.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/how-to-speech-synthesis.md)

You can follow the instructions in the [quickstart](get-started-text-to-speech.md?pivots=javascript), but replace the contents of that *SpeechSynthesis.js* file with the following JavaScript code.

```javascript
(function() {

    "use strict";

    var sdk = require("microsoft-cognitiveservices-speech-sdk");

    var audioFile = "YourAudioFile.wav";
    // This example requires environment variables named "SPEECH_KEY" and "SPEECH_REGION"
    const speechConfig = sdk.SpeechConfig.fromSubscription(process.env.SPEECH_KEY, process.env.SPEECH_REGION);
    const audioConfig = sdk.AudioConfig.fromAudioFileOutput(audioFile);

    var speechSynthesisVoiceName  = "en-US-AvaMultilingualNeural";  
    var ssml = `<speak version='1.0' xml:lang='en-US' xmlns='http://www.w3.org/2001/10/synthesis' xmlns:mstts='http://www.w3.org/2001/mstts'> \r\n \
        <voice name='${speechSynthesisVoiceName}'> \r\n \
            <mstts:viseme type='redlips_front'/> \r\n \
            The rainbow has seven colors: <bookmark mark='colors_list_begin'/>Red, orange, yellow, green, blue, indigo, and violet.<bookmark mark='colors_list_end'/>. \r\n \
        </voice> \r\n \
    </speak>`;
    
    // Required for WordBoundary event sentences.
    speechConfig.setProperty(sdk.PropertyId.SpeechServiceResponse_RequestSentenceBoundary, "true");

    // Create the speech speechSynthesizer.
    var speechSynthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

    speechSynthesizer.bookmarkReached = function (s, e) {
        var str = `BookmarkReached event: \
            \r\n\tAudioOffset: ${(e.audioOffset + 5000) / 10000}ms \
            \r\n\tText: \"${e.text}\".`;
        console.log(str);
    };

    speechSynthesizer.synthesisCanceled = function (s, e) {
        console.log("SynthesisCanceled event");
    };
    
    speechSynthesizer.synthesisCompleted = function (s, e) {
        var str = `SynthesisCompleted event: \
                    \r\n\tAudioData: ${e.result.audioData.byteLength} bytes \
                    \r\n\tAudioDuration: ${e.result.audioDuration}`;
        console.log(str);
    };

    speechSynthesizer.synthesisStarted = function (s, e) {
        console.log("SynthesisStarted event");
    };

    speechSynthesizer.synthesizing = function (s, e) {
        var str = `Synthesizing event: \
            \r\n\tAudioData: ${e.result.audioData.byteLength} bytes`;
        console.log(str);
    };
    
    speechSynthesizer.visemeReceived = function(s, e) {
        var str = `VisemeReceived event: \
            \r\n\tAudioOffset: ${(e.audioOffset + 5000) / 10000}ms \
            \r\n\tVisemeId: ${e.visemeId}`;
        console.log(str);
    };

    speechSynthesizer.wordBoundary = function (s, e) {
        // Word, Punctuation, or Sentence
        var str = `WordBoundary event: \
            \r\n\tBoundaryType: ${e.boundaryType} \
            \r\n\tAudioOffset: ${(e.audioOffset + 5000) / 10000}ms \
            \r\n\tDuration: ${e.duration} \
            \r\n\tText: \"${e.text}\" \
            \r\n\tTextOffset: ${e.textOffset} \
            \r\n\tWordLength: ${e.wordLength}`;
        console.log(str);
    };

    // Synthesize the SSML
    console.log(`SSML to synthesize: \r\n ${ssml}`)
    console.log(`Synthesize to: ${audioFile}`);
    speechSynthesizer.speakSsmlAsync(ssml,
        function (result) {
      if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
        console.log("SynthesizingAudioCompleted result");
      } else {
        console.error("Speech synthesis canceled, " + result.errorDetails +
            "\nDid you set the speech resource key and region values?");
      }
      speechSynthesizer.close();
      speechSynthesizer = null;
    },
        function (err) {
      console.trace("err - " + err);
      speechSynthesizer.close();
      speechSynthesizer = null;
    });
}());
```

You can find more text to speech samples at [GitHub](https://aka.ms/csspeech/samples).

## Run and use a container

Speech containers provide websocket-based query endpoint APIs that are accessed through the Speech SDK and Speech CLI. By default, the Speech SDK and Speech CLI use the public Speech service. To use the container, you need to change the initialization method. Use a container host URL instead of key and region.

For more information about containers, see [Install and run Speech containers with Docker](speech-container-howto.md).



**Applies to: programming-language-java**



[Reference documentation](https://learn.microsoft.com/java/api/com.microsoft.cognitiveservices.speech) | [Additional samples on GitHub](https://aka.ms/speech/github-java)



In this how-to guide, you learn common design patterns for doing text to speech synthesis.

For more information about the following areas, see [What is text to speech?](text-to-speech.md)

- Getting responses as in-memory streams.
- Customizing output sample rate and bit rate.
- Submitting synthesis requests by using Speech Synthesis Markup Language (SSML).
- Using neural voices.
- Subscribing to events and acting on results.


## Select synthesis language and voice

The text to speech feature in the Speech service supports more than 400 voices and more than 140 languages and variants.
You can get the [full list](language-support.md?tabs=tts) or try them in the [Voice Gallery](https://speech.microsoft.com/portal/voicegallery).

Specify the language or voice of [SpeechConfig](https://learn.microsoft.com/java/api/com.microsoft.cognitiveservices.speech.speechconfig) to match your input text and use the specified voice. The following code snippet shows how this technique works:

```java
public static void main(String[] args) {
    SpeechConfig speechConfig = SpeechConfig.fromSubscription("YourSpeechKey", "YourSpeechRegion");
    // Set either the `SpeechSynthesisVoiceName` or `SpeechSynthesisLanguage`.
    speechConfig.setSpeechSynthesisLanguage("en-US"); 
    speechConfig.setSpeechSynthesisVoiceName("en-US-Ava:DragonHDLatestNeural");
}
```

All neural voices are multilingual and fluent in their own language and English. For example, if the input text in English is, "I'm excited to try text to speech," and you select `es-ES-Ximena:DragonHDLatestNeural`, the text is spoken in English with a Spanish accent.

If the voice doesn't speak the language of the input text, the Speech service doesn't create synthesized audio. For a full list of supported neural voices, see [Language and voice support for the Speech service](language-support.md?tabs=tts).

> **Note:**
> The default voice is the first voice returned per locale from the [Voice List API](rest-text-to-speech.md#get-a-list-of-voices).

The voice that speaks is determined in order of priority as follows:

- If you don't set `SpeechSynthesisVoiceName` or `SpeechSynthesisLanguage`, the default voice for `en-US` speaks.
- If you only set `SpeechSynthesisLanguage`, the default voice for the specified locale speaks.
- If both `SpeechSynthesisVoiceName` and `SpeechSynthesisLanguage` are set, the `SpeechSynthesisLanguage` setting is ignored. The voice that you specified by using `SpeechSynthesisVoiceName` speaks.
- If the voice element is set by using [Speech Synthesis Markup Language (SSML)](speech-synthesis-markup.md), the `SpeechSynthesisVoiceName` and `SpeechSynthesisLanguage` settings are ignored.

In summary, the order of priority can be described as:

| `SpeechSynthesisVoiceName` | `SpeechSynthesisLanguage` | SSML | Outcome |
| :---: | :---: | :---: | --- |
| ✗ | ✗ | ✗ | Default voice for `en-US` speaks |
| ✗ | ✔ | ✗ | Default voice for specified locale speaks. |
| ✔ | ✔ | ✗ | The voice that you specify by using `SpeechSynthesisVoiceName` speaks. |
| ✔ | ✔ | ✔ | The voice that you specify by using SSML speaks. |

## Synthesize speech to a file

Create a [`SpeechSynthesizer`](https://learn.microsoft.com/java/api/com.microsoft.cognitiveservices.speech.speechsynthesizer) object. This object runs text to speech conversions and outputs to speakers, files, or other output streams. `SpeechSynthesizer` accepts as parameters:

- The [`SpeechConfig`](https://learn.microsoft.com/java/api/com.microsoft.cognitiveservices.speech.speechconfig) object that you created in the previous step.
- An [`AudioConfig`](https://learn.microsoft.com/java/api/com.microsoft.cognitiveservices.speech.audio.audioconfig) object that specifies how output results should be handled.

1. Create an `AudioConfig` instance to automatically write the output to a *.wav* file by using the `fromWavFileOutput()` static function:

   ```java
   public static void main(String[] args) {
       SpeechConfig speechConfig = SpeechConfig.fromSubscription("YourSpeechKey", "YourSpeechRegion");
       AudioConfig audioConfig = AudioConfig.fromWavFileOutput("path/to/write/file.wav");
   }
   ```

1. Instantiate a `SpeechSynthesizer` instance. Pass your `speechConfig` object and the `audioConfig` object as parameters. To synthesize speech and write to a file, run `SpeakText()` with a string of text.

   ```java
   public static void main(String[] args) {
       SpeechConfig speechConfig = SpeechConfig.fromSubscription("YourSpeechKey", "YourSpeechRegion");
       AudioConfig audioConfig = AudioConfig.fromWavFileOutput("path/to/write/file.wav");

       SpeechSynthesizer speechSynthesizer = new SpeechSynthesizer(speechConfig, audioConfig);
       speechSynthesizer.SpeakText("I'm excited to try text to speech");
   }
   ```

When you run the program, it creates a synthesized *.wav* file, which is written to the location that you specify. This result is a good example of the most basic usage. Next, you can customize output and handle the output response as an in-memory stream for working with custom scenarios.

## Synthesize to speaker output

You might want more insights about the text to speech processing and results. For example, you might want to know when the synthesizer starts and stops, or you might want to know about other events encountered during synthesis.

To output synthesized speech to the current active output device such as a speaker, instantiate `AudioConfig` by using the `fromDefaultSpeakerOutput()` static function. Here's an example:

```java
public static void main(String[] args) {
    SpeechConfig speechConfig = SpeechConfig.fromSubscription("YourSpeechKey", "YourSpeechRegion");
    AudioConfig audioConfig = AudioConfig.fromDefaultSpeakerOutput();

    SpeechSynthesizer speechSynthesizer = new SpeechSynthesizer(speechConfig, audioConfig);
    speechSynthesizer.SpeakText("I'm excited to try text to speech");
}
```

## Get a result as an in-memory stream

You can use the resulting audio data as an in-memory stream rather than directly writing to a file. With in-memory stream, you can build custom behavior:

- Abstract the resulting byte array as a seekable stream for custom downstream services.
- Integrate the result with other APIs or services.
- Modify the audio data, write custom .wav headers, and do related tasks.

You can make this change to the previous example. First, remove the `AudioConfig` block, because you manage the output behavior manually from this point onward for increased control. Then pass `null` for `AudioConfig` in the `SpeechSynthesizer` constructor.

> **Note:**
> Passing `null` for `AudioConfig`, rather than omitting it as you did in the previous speaker output example, doesn't play the audio by default on the current active output device.

Save the result to a [`SpeechSynthesisResult`](https://learn.microsoft.com/java/api/com.microsoft.cognitiveservices.speech.speechsynthesisresult) variable. The `SpeechSynthesisResult.getAudioData()` function returns a `byte []` instance of the output data. You can work with this `byte []` instance manually, or you can use the [`AudioDataStream`](https://learn.microsoft.com/java/api/com.microsoft.cognitiveservices.speech.audiodatastream) class to manage the in-memory stream.

In this example, use the `AudioDataStream.fromResult()` static function to get a stream from the result:

```java
public static void main(String[] args) {
    SpeechConfig speechConfig = SpeechConfig.fromSubscription("YourSpeechKey", "YourSpeechRegion");
    SpeechSynthesizer speechSynthesizer = new SpeechSynthesizer(speechConfig, null);

    SpeechSynthesisResult result = speechSynthesizer.SpeakText("I'm excited to try text to speech");
    AudioDataStream stream = AudioDataStream.fromResult(result);
    System.out.print(stream.getStatus());
}
```

At this point, you can implement any custom behavior by using the resulting `stream` object.

## Customize audio format

You can customize audio output attributes, including:

- Audio file type
- Sample rate
- Bit depth

To change the audio format, you use the `setSpeechSynthesisOutputFormat()` function on the `SpeechConfig` object. This function expects an `enum` instance of type [SpeechSynthesisOutputFormat](https://learn.microsoft.com/java/api/com.microsoft.cognitiveservices.speech.speechsynthesisoutputformat). Use the `enum` to select the output format. For available formats, see the [list of audio formats](https://learn.microsoft.com/java/api/com.microsoft.cognitiveservices.speech.speechsynthesisoutputformat).

There are various options for different file types, depending on your requirements. By definition, raw formats like `Raw24Khz16BitMonoPcm` don't include audio headers. Use raw formats only in one of these situations:

- You know that your downstream implementation can decode a raw bitstream.
- You plan to manually build headers based on factors like bit depth, sample rate, and number of channels.

This example specifies the high-fidelity RIFF format `Riff24Khz16BitMonoPcm` by setting `SpeechSynthesisOutputFormat` on the `SpeechConfig` object. Similar to the example in the previous section, you use [`AudioDataStream`](https://learn.microsoft.com/java/api/com.microsoft.cognitiveservices.speech.audiodatastream) to get an in-memory stream of the result, and then write it to a file.

```java
public static void main(String[] args) {
    SpeechConfig speechConfig = SpeechConfig.fromSubscription("YourSpeechKey", "YourSpeechRegion");

    // set the output format
    speechConfig.setSpeechSynthesisOutputFormat(SpeechSynthesisOutputFormat.Riff24Khz16BitMonoPcm);

    SpeechSynthesizer speechSynthesizer = new SpeechSynthesizer(speechConfig, null);
    SpeechSynthesisResult result = speechSynthesizer.SpeakText("I'm excited to try text to speech");
    AudioDataStream stream = AudioDataStream.fromResult(result);
    stream.saveToWavFile("path/to/write/file.wav");
}
```

When you run the program, it writes a *.wav* file to the specified path.

## Use SSML to customize speech characteristics

You can use SSML to fine-tune the pitch, pronunciation, speaking rate, volume, and other aspects in the text to speech output by submitting your requests from an XML schema. This section shows an example of changing the voice. For more information, see the [SSML how-to article](speech-synthesis-markup.md).

To start using SSML for customization, you make a minor change that switches the voice.

1. Create a new XML file for the SSML configuration in your root project directory.

   ```xml
   <speak version="1.0" xmlns="https://www.w3.org/2001/10/synthesis" xml:lang="en-US">
     <voice name="en-US-Ava:DragonHDLatestNeural">
       When you're on the freeway, it's a good idea to use a GPS.
     </voice>
   </speak>
   ```

   In this example, the file is *ssml.xml*. The root element is always `<speak>`. Wrapping the text in a `<voice>` element allows you to change the voice by using the `name` parameter. For the full list of supported neural voices, see [Supported languages](language-support.md?tabs=tts).

1. Change the speech synthesis request to reference your XML file. The request is mostly the same. Instead of using the `SpeakText()` function, you use `SpeakSsml()`. This function expects an XML string, so first create a function to load an XML file and return it as a string:

   ```java
   private static String xmlToString(String filePath) {
       File file = new File(filePath);
       StringBuilder fileContents = new StringBuilder((int)file.length());

       try (Scanner scanner = new Scanner(file)) {
           while(scanner.hasNextLine()) {
               fileContents.append(scanner.nextLine() + System.lineSeparator());
           }
           return fileContents.toString().trim();
       } catch (FileNotFoundException ex) {
           return "File not found.";
       }
   }
   ```

   At this point, the result object is exactly the same as previous examples:

   ```java
   public static void main(String[] args) {
       SpeechConfig speechConfig = SpeechConfig.fromSubscription("YourSpeechKey", "YourSpeechRegion");
       SpeechSynthesizer speechSynthesizer = new SpeechSynthesizer(speechConfig, null);

       String ssml = xmlToString("ssml.xml");
       SpeechSynthesisResult result = speechSynthesizer.SpeakSsml(ssml);
       AudioDataStream stream = AudioDataStream.fromResult(result);
       stream.saveToWavFile("path/to/write/file.wav");
   }
   ```

> **Note:**
> To change the voice without using SSML, set the property on `SpeechConfig` by using `SpeechConfig.setSpeechSynthesisVoiceName("en-US-Ava:DragonHDLatestNeural");`.

## Subscribe to synthesizer events

You might want more insights about the text to speech processing and results. For example, you might want to know when the synthesizer starts and stops, or you might want to know about other events encountered during synthesis.

While using the [SpeechSynthesizer](https://learn.microsoft.com/java/api/com.microsoft.cognitiveservices.speech.speechsynthesizer) for text to speech, you can subscribe to the events in this table:



| Event | Description | Use case |
| :--- | :--- | :--- |
| `BookmarkReached` | Signals that a bookmark was reached. To trigger a bookmark reached event, a `bookmark` element is required in the [SSML](speech-synthesis-markup-structure.md#bookmark-element). This event reports the output audio's elapsed time between the beginning of synthesis and the `bookmark` element. The event's `Text` property is the string value that you set in the bookmark's `mark` attribute. The `bookmark` elements aren't spoken. | You can use the `bookmark` element to insert custom markers in SSML to get the offset of each marker in the audio stream. The `bookmark` element can be used to reference a specific location in the text or tag sequence. |
| `SynthesisCanceled` | Signals that the speech synthesis was canceled. | You can confirm when synthesis is canceled. |
| `SynthesisCompleted` | Signals that speech synthesis is complete. | You can confirm when synthesis is complete. |
| `SynthesisStarted` | Signals that speech synthesis started. | You can confirm when synthesis started. |
| `Synthesizing` | Signals that speech synthesis is ongoing. This event fires each time the SDK receives an audio chunk from the Speech service. | You can confirm when synthesis is in progress. |
| `VisemeReceived` | Signals that a viseme event was received. | [Visemes](how-to-speech-synthesis-viseme.md) are often used to represent the key poses in observed speech. Key poses include the position of the lips, jaw, and tongue in producing a particular phoneme. You can use visemes to animate the face of a character as speech audio plays. |
| `WordBoundary` | Signals that a word boundary was received. This event is raised at the beginning of each new spoken word, punctuation, and sentence. The event reports the current word's time offset, in ticks, from the beginning of the output audio. This event also reports the character position in the input text or [SSML](speech-synthesis-markup.md) immediately before the word that's about to be spoken. | This event is commonly used to get relative positions of the text and corresponding audio. You might want to know about a new word, and then take action based on the timing. For example, you can get information that can help you decide when and for how long to highlight words as they're spoken. |

> **Note:**
> Events are raised as the output audio data becomes available, which is faster than playback to an output device. The caller must appropriately synchronize streaming and real-time.


Here's an example that shows how to subscribe to events for speech synthesis. 

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/azure-key-vault.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/how-to-speech-synthesis.md)

You can follow the instructions in the [quickstart](get-started-text-to-speech.md?pivots=java), but replace the contents of that *SpeechSynthesis.java* file with the following Java code:

```java
import com.microsoft.cognitiveservices.speech.*;
import com.microsoft.cognitiveservices.speech.audio.*;

import java.util.Scanner;
import java.util.concurrent.ExecutionException;

public class SpeechSynthesis {
    // This example requires environment variables named "SPEECH_KEY" and "SPEECH_REGION"
    private static String speechKey = System.getenv("SPEECH_KEY");
    private static String speechRegion = System.getenv("SPEECH_REGION");

    public static void main(String[] args) throws InterruptedException, ExecutionException {

        SpeechConfig speechConfig = SpeechConfig.fromSubscription(speechKey, speechRegion);
        
        // Required for WordBoundary event sentences.
        speechConfig.setProperty(PropertyId.SpeechServiceResponse_RequestSentenceBoundary, "true");

        String speechSynthesisVoiceName = "en-US-AvaMultilingualNeural"; 
        
        String ssml = String.format("<speak version='1.0' xml:lang='en-US' xmlns='http://www.w3.org/2001/10/synthesis' xmlns:mstts='http://www.w3.org/2001/mstts'>"
            .concat(String.format("<voice name='%s'>", speechSynthesisVoiceName))
            .concat("<mstts:viseme type='redlips_front'/>")
            .concat("The rainbow has seven colors: <bookmark mark='colors_list_begin'/>Red, orange, yellow, green, blue, indigo, and violet.<bookmark mark='colors_list_end'/>.")
            .concat("</voice>")
            .concat("</speak>"));

        SpeechSynthesizer speechSynthesizer = new SpeechSynthesizer(speechConfig);
        {
            // Subscribe to events

            speechSynthesizer.BookmarkReached.addEventListener((o, e) -> {
                System.out.println("BookmarkReached event:");
                System.out.println("\tAudioOffset: " + ((e.getAudioOffset() + 5000) / 10000) + "ms");
                System.out.println("\tText: " + e.getText());
            });

            speechSynthesizer.SynthesisCanceled.addEventListener((o, e) -> {
                System.out.println("SynthesisCanceled event");
            });

            speechSynthesizer.SynthesisCompleted.addEventListener((o, e) -> {
                SpeechSynthesisResult result = e.getResult();                
                byte[] audioData = result.getAudioData();
                System.out.println("SynthesisCompleted event:");
                System.out.println("\tAudioData: " + audioData.length + " bytes");
                System.out.println("\tAudioDuration: " + result.getAudioDuration());
                result.close();
            });
            
            speechSynthesizer.SynthesisStarted.addEventListener((o, e) -> {
                System.out.println("SynthesisStarted event");
            });

            speechSynthesizer.Synthesizing.addEventListener((o, e) -> {
                SpeechSynthesisResult result = e.getResult();
                byte[] audioData = result.getAudioData();
                System.out.println("Synthesizing event:");
                System.out.println("\tAudioData: " + audioData.length + " bytes");
                result.close();
            });

            speechSynthesizer.VisemeReceived.addEventListener((o, e) -> {
                System.out.println("VisemeReceived event:");
                System.out.println("\tAudioOffset: " + ((e.getAudioOffset() + 5000) / 10000) + "ms");
                System.out.println("\tVisemeId: " + e.getVisemeId());
            });

            speechSynthesizer.WordBoundary.addEventListener((o, e) -> {
                System.out.println("WordBoundary event:");
                System.out.println("\tBoundaryType: " + e.getBoundaryType());
                System.out.println("\tAudioOffset: " + ((e.getAudioOffset() + 5000) / 10000) + "ms");
                System.out.println("\tDuration: " + e.getDuration());
                System.out.println("\tText: " + e.getText());
                System.out.println("\tTextOffset: " + e.getTextOffset());
                System.out.println("\tWordLength: " + e.getWordLength());
            });

            // Synthesize the SSML
            System.out.println("SSML to synthesize:");
            System.out.println(ssml);
            SpeechSynthesisResult speechSynthesisResult = speechSynthesizer.SpeakSsmlAsync(ssml).get();

            if (speechSynthesisResult.getReason() == ResultReason.SynthesizingAudioCompleted) {
                System.out.println("SynthesizingAudioCompleted result");
            }
            else if (speechSynthesisResult.getReason() == ResultReason.Canceled) {
                SpeechSynthesisCancellationDetails cancellation = SpeechSynthesisCancellationDetails.fromResult(speechSynthesisResult);
                System.out.println("CANCELED: Reason=" + cancellation.getReason());

                if (cancellation.getReason() == CancellationReason.Error) {
                    System.out.println("CANCELED: ErrorCode=" + cancellation.getErrorCode());
                    System.out.println("CANCELED: ErrorDetails=" + cancellation.getErrorDetails());
                    System.out.println("CANCELED: Did you set the speech resource key and region values?");
                }
            }
        }
        speechSynthesizer.close();

        System.exit(0);
    }
}
```

You can find more text to speech samples at [GitHub](https://aka.ms/csspeech/samples).

## Use a custom endpoint

The custom endpoint is functionally identical to the standard endpoint that's used for text to speech requests. 

One difference is that the `EndpointId` must be specified to use your custom voice via the Speech SDK. You can start with the [text to speech quickstart](get-started-text-to-speech.md) and then update the code with the `EndpointId` and `SpeechSynthesisVoiceName`.

```java
SpeechConfig speechConfig = SpeechConfig.fromSubscription(speechKey, speechRegion);
speechConfig.setSpeechSynthesisVoiceName("YourCustomVoiceName");
speechConfig.setEndpointId("YourEndpointId");
```

To use a custom voice via [Speech Synthesis Markup Language (SSML)](speech-synthesis-markup-voice.md#use-voice-elements), specify the model name as the voice name. This example uses the `YourCustomVoiceName` voice. 

```xml
<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US">
    <voice name="YourCustomVoiceName">
        This is the text that is spoken. 
    </voice>
</speak>
```

## Run and use a container

Speech containers provide websocket-based query endpoint APIs that are accessed through the Speech SDK and Speech CLI. By default, the Speech SDK and Speech CLI use the public Speech service. To use the container, you need to change the initialization method. Use a container host URL instead of key and region.

For more information about containers, see [Install and run Speech containers with Docker](speech-container-howto.md).



**Applies to: programming-language-cpp**



[Reference documentation](https://learn.microsoft.com/cpp/cognitive-services/speech/) | [Package (NuGet)](https://www.nuget.org/packages/Microsoft.CognitiveServices.Speech) | [Additional samples on GitHub](https://aka.ms/speech/github-cpp)



In this how-to guide, you learn common design patterns for doing text to speech synthesis.

For more information about the following areas, see [What is text to speech?](text-to-speech.md)

- Getting responses as in-memory streams.
- Customizing output sample rate and bit rate.
- Submitting synthesis requests by using Speech Synthesis Markup Language (SSML).
- Using neural voices.
- Subscribing to events and acting on results.


## Select synthesis language and voice

The text to speech feature in the Speech service supports more than 400 voices and more than 140 languages and variants. Refer to the full [list of supported text to speech locales](language-support.md?tabs=tts) or try them in the [Voice Gallery](https://speech.microsoft.com/portal/voicegallery).

Specify the language or voice of the [SpeechConfig](https://learn.microsoft.com/cpp/cognitive-services/speech/speechconfig) class to match your input text and use the specified voice. The following code snippet shows how this technique works:

```cpp
void synthesizeSpeech()
{
    auto speechConfig = SpeechConfig::FromSubscription("YourSpeechKey", "YourSpeechRegion");
    // Set either the `SpeechSynthesisVoiceName` or `SpeechSynthesisLanguage`.
    speechConfig->SetSpeechSynthesisLanguage("en-US"); 
    speechConfig->SetSpeechSynthesisVoiceName("en-US-Ava:DragonHDLatestNeural");
}
```

All neural voices are multilingual and fluent in their own language and English. For example, if the input text in English is, "I'm excited to try text to speech," and you select `es-ES-Ximena:DragonHDLatestNeural`, the text is spoken in English with a Spanish accent.

If the voice doesn't speak the language of the input text, the Speech service doesn't create synthesized audio. For a full list of supported neural voices, see [Language and voice support for the Speech service](language-support.md?tabs=tts).

> **Note:**
> The default voice is the first voice returned per locale from the [Voice List API](rest-text-to-speech.md#get-a-list-of-voices).

The voice that speaks is determined in order of priority as follows:

- If you don't set `SpeechSynthesisVoiceName` or `SpeechSynthesisLanguage`, the default voice for `en-US` speaks.
- If you only set `SpeechSynthesisLanguage`, the default voice for the specified locale speaks.
- If both `SpeechSynthesisVoiceName` and `SpeechSynthesisLanguage` are set, the `SpeechSynthesisLanguage` setting is ignored. The voice that you specify by using `SpeechSynthesisVoiceName` speaks.
- If the voice element is set by using [Speech Synthesis Markup Language (SSML)](speech-synthesis-markup.md), the `SpeechSynthesisVoiceName` and `SpeechSynthesisLanguage` settings are ignored.

In summary, the order of priority can be described as:

| `SpeechSynthesisVoiceName` | `SpeechSynthesisLanguage` | SSML | Outcome |
| :---: | :---: | :---: | --- |
| ✗ | ✗ | ✗ | Default voice for `en-US` speaks |
| ✗ | ✔ | ✗ | Default voice for specified locale speaks. |
| ✔ | ✔ | ✗ | The voice that you specify by using `SpeechSynthesisVoiceName` speaks. |
| ✔ | ✔ | ✔ | The voice that you specify by using SSML speaks. |

## Synthesize speech to a file

Create a [SpeechSynthesizer](https://learn.microsoft.com/cpp/cognitive-services/speech/speechsynthesizer) object. This object shown in the following snippets runs text to speech conversions and outputs to speakers, files, or other output streams. `SpeechSynthesizer` accepts as parameters:

- The [SpeechConfig](https://learn.microsoft.com/cpp/cognitive-services/speech/speechconfig) object that you created in the previous step.
- An [AudioConfig](https://learn.microsoft.com/cpp/cognitive-services/speech/audio-audioconfig) object that specifies how output results should be handled.

1. Create an `AudioConfig` instance to automatically write the output to a *.wav* file by using the `FromWavFileOutput()` function:

   ```cpp
   void synthesizeSpeech()
   {
       auto speechConfig = SpeechConfig::FromSubscription("YourSpeechKey", "YourSpeechRegion");
       auto audioConfig = AudioConfig::FromWavFileOutput("path/to/write/file.wav");
   }
   ```

1. Instantiate a `SpeechSynthesizer` instance. Pass your `speechConfig` object and the `audioConfig` object as parameters. To synthesize speech and write to a file, run `SpeakTextAsync()` with a string of text.

   ```cpp
   void synthesizeSpeech()
   {
       auto speechConfig = SpeechConfig::FromSubscription("YourSpeechKey", "YourSpeechRegion");
       auto audioConfig = AudioConfig::FromWavFileOutput("path/to/write/file.wav");
       auto speechSynthesizer = SpeechSynthesizer::FromConfig(speechConfig, audioConfig);
       auto result = speechSynthesizer->SpeakTextAsync("A simple test to write to a file.").get();
   }
   ```

When you run the program, it creates a synthesized *.wav* file, which is written to the location that you specify. This result is a good example of the most basic usage. Next, you can customize output and handle the output response as an in-memory stream for working with custom scenarios.

## Synthesize to speaker output

To output synthesized speech to the current active output device such as a speaker, omit the `AudioConfig` parameter when you create the `SpeechSynthesizer` instance. Here's an example:

```cpp
void synthesizeSpeech()
{
    auto speechConfig = SpeechConfig::FromSubscription("YourSpeechKey", "YourSpeechRegion");
    auto speechSynthesizer = SpeechSynthesizer::FromConfig(speechConfig);
    auto result = speechSynthesizer->SpeakTextAsync("I'm excited to try text to speech").get();
}
```

## Get a result as an in-memory stream

You can use the resulting audio data as an in-memory stream rather than directly writing to a file. With in-memory stream, you can build custom behavior:

- Abstract the resulting byte array as a seekable stream for custom downstream services.
- Integrate the result with other APIs or services.
- Modify the audio data, write custom .wav headers, and do related tasks.

You can make this change to the previous example. First, remove the `AudioConfig` block, because you manage the output behavior manually from this point onward for increased control. Pass `NULL` for `AudioConfig` in the `SpeechSynthesizer` constructor.

> **Note:**
> Passing `NULL` for `AudioConfig`, rather than omitting it as in the previous speaker output example, doesn't play the audio by default on the current active output device.

Save the result to a [SpeechSynthesisResult](https://learn.microsoft.com/cpp/cognitive-services/speech/speechsynthesisresult) variable. The `GetAudioData` getter returns a `byte []` instance for the output data. You can work with this `byte []` instance manually, or you can use the [AudioDataStream](https://learn.microsoft.com/cpp/cognitive-services/speech/audiodatastream) class to manage the in-memory stream.

In this example, use the `AudioDataStream.FromResult()` static function to get a stream from the result:

```cpp
void synthesizeSpeech()
{
    auto speechConfig = SpeechConfig::FromSubscription("YourSpeechKey", "YourSpeechRegion");
    auto speechSynthesizer = SpeechSynthesizer::FromConfig(speechConfig);

    auto result = speechSynthesizer->SpeakTextAsync("Getting the response as an in-memory stream.").get();
    auto stream = AudioDataStream::FromResult(result);
}
```

At this point, you can implement any custom behavior by using the resulting `stream` object.

## Customize audio format

You can customize audio output attributes, including:

- Audio file type
- Sample rate
- Bit depth

To change the audio format, use the `SetSpeechSynthesisOutputFormat()` function on the `SpeechConfig` object. This function expects an `enum` instance of type [SpeechSynthesisOutputFormat](https://learn.microsoft.com/cpp/cognitive-services/speech/microsoft-cognitiveservices-speech-namespace#speechsynthesisoutputformat). Use the `enum` to select the output format. For available formats, see the [list of audio formats](https://learn.microsoft.com/cpp/cognitive-services/speech/microsoft-cognitiveservices-speech-namespace#speechsynthesisoutputformat).

There are various options for different file types, depending on your requirements. By definition, raw formats like `Raw24Khz16BitMonoPcm` don't include audio headers. Use raw formats only in one of these situations:

- You know that your downstream implementation can decode a raw bitstream.
- You plan to manually build headers based on factors like bit depth, sample rate, and number of channels.

This example specifies the high-fidelity RIFF format `Riff24Khz16BitMonoPcm` by setting `SpeechSynthesisOutputFormat` on the `SpeechConfig` object. Similar to the example in the previous section, you use [`AudioDataStream`](https://learn.microsoft.com/cpp/cognitive-services/speech/audiodatastream) to get an in-memory stream of the result, and then write it to a file.

```cpp
void synthesizeSpeech()
{
    auto speechConfig = SpeechConfig::FromSubscription("YourSpeechKey", "YourSpeechRegion");
    speechConfig->SetSpeechSynthesisOutputFormat(SpeechSynthesisOutputFormat::Riff24Khz16BitMonoPcm);

    auto speechSynthesizer = SpeechSynthesizer::FromConfig(speechConfig);
    auto result = speechSynthesizer->SpeakTextAsync("A simple test to write to a file.").get();

    auto stream = AudioDataStream::FromResult(result);
    stream->SaveToWavFileAsync("path/to/write/file.wav").get();
}
```

When you run the program, it writes a *.wav* file to the specified path.

## Use SSML to customize speech characteristics

You can use SSML to fine-tune the pitch, pronunciation, speaking rate, volume, and other aspects in the text to speech output by submitting your requests from an XML schema. This section shows an example of changing the voice. For more information, see [Speech Synthesis Markup Language overview](speech-synthesis-markup.md).

To start using SSML for customization, make a minor change that switches the voice.

1. Create a new XML file for the SSML configuration in your root project directory.

   ```xml
   <speak version="1.0" xmlns="https://www.w3.org/2001/10/synthesis" xml:lang="en-US">
     <voice name="en-US-Ava:DragonHDLatestNeural">
       When you're on the freeway, it's a good idea to use a GPS.
     </voice>
   </speak>
   ```

   In this example, the file is *ssml.xml*. The root element is always `<speak>`. Wrapping the text in a `<voice>` element allows you to change the voice by using the `name` parameter. For the full list of supported neural voices, see [Supported languages](language-support.md?tabs=tts).

1. Change the speech synthesis request to reference your XML file. The request is mostly the same. Instead of using the `SpeakTextAsync()` function, you use `SpeakSsmlAsync()`. This function expects an XML string. First, load your SSML configuration as a string. From this point, the result object is exactly the same as previous examples.

   ```cpp
   void synthesizeSpeech()
   {
       auto speechConfig = SpeechConfig::FromSubscription("YourSpeechKey", "YourSpeechRegion");
       auto speechSynthesizer = SpeechSynthesizer::FromConfig(speechConfig);

       std::ifstream file("./ssml.xml");
       std::string ssml, line;
       while (std::getline(file, line))
       {
           ssml += line;
           ssml.push_back('\n');
       }
       auto result = speechSynthesizer->SpeakSsmlAsync(ssml).get();

       auto stream = AudioDataStream::FromResult(result);
       stream->SaveToWavFileAsync("path/to/write/file.wav").get();
   }
   ```

> **Note:**
> To change the voice without using SSML, you can set the property on `SpeechConfig` by using `SpeechConfig.SetSpeechSynthesisVoiceName("en-US-Ava:DragonHDLatestNeural")`.

## Subscribe to synthesizer events

You might want more insights about the text to speech processing and results. For example, you might want to know when the synthesizer starts and stops, or you might want to know about other events encountered during synthesis.

While using the [SpeechSynthesizer](https://learn.microsoft.com/cpp/cognitive-services/speech/speechsynthesizer) for text to speech, you can subscribe to the events in this table:



| Event | Description | Use case |
| :--- | :--- | :--- |
| `BookmarkReached` | Signals that a bookmark was reached. To trigger a bookmark reached event, a `bookmark` element is required in the [SSML](speech-synthesis-markup-structure.md#bookmark-element). This event reports the output audio's elapsed time between the beginning of synthesis and the `bookmark` element. The event's `Text` property is the string value that you set in the bookmark's `mark` attribute. The `bookmark` elements aren't spoken. | You can use the `bookmark` element to insert custom markers in SSML to get the offset of each marker in the audio stream. The `bookmark` element can be used to reference a specific location in the text or tag sequence. |
| `SynthesisCanceled` | Signals that the speech synthesis was canceled. | You can confirm when synthesis is canceled. |
| `SynthesisCompleted` | Signals that speech synthesis is complete. | You can confirm when synthesis is complete. |
| `SynthesisStarted` | Signals that speech synthesis started. | You can confirm when synthesis started. |
| `Synthesizing` | Signals that speech synthesis is ongoing. This event fires each time the SDK receives an audio chunk from the Speech service. | You can confirm when synthesis is in progress. |
| `VisemeReceived` | Signals that a viseme event was received. | [Visemes](how-to-speech-synthesis-viseme.md) are often used to represent the key poses in observed speech. Key poses include the position of the lips, jaw, and tongue in producing a particular phoneme. You can use visemes to animate the face of a character as speech audio plays. |
| `WordBoundary` | Signals that a word boundary was received. This event is raised at the beginning of each new spoken word, punctuation, and sentence. The event reports the current word's time offset, in ticks, from the beginning of the output audio. This event also reports the character position in the input text or [SSML](speech-synthesis-markup.md) immediately before the word that's about to be spoken. | This event is commonly used to get relative positions of the text and corresponding audio. You might want to know about a new word, and then take action based on the timing. For example, you can get information that can help you decide when and for how long to highlight words as they're spoken. |

> **Note:**
> Events are raised as the output audio data becomes available, which is faster than playback to an output device. The caller must appropriately synchronize streaming and real-time.


Here's an example that shows how to subscribe to events for speech synthesis. 

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/azure-key-vault.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/how-to-speech-synthesis.md)

You can follow the instructions in the [quickstart](get-started-text-to-speech.md?pivots=cpp), but replace the contents of that *main.cpp* file with the following code:

```cpp
#include <iostream> 
#include <stdlib.h>
#include <speechapi_cxx.h>

using namespace Microsoft::CognitiveServices::Speech;
using namespace Microsoft::CognitiveServices::Speech::Audio;

std::string getEnvironmentVariable(const char* name);

int main()
{
    // This example requires environment variables named "SPEECH_KEY" and "SPEECH_REGION"
    auto speechKey = getEnvironmentVariable("SPEECH_KEY");
    auto speechRegion = getEnvironmentVariable("SPEECH_REGION");

    if (std::string(speechKey).empty() || std::string(endpoint).empty()) {
        std::cout << "Please set both SPEECH_KEY and SPEECH_REGION environment variables." << std::endl;
        return -1;
    }

    auto speechConfig = SpeechConfig::FromSubscription(speechKey, speechRegion);

    // Required for WordBoundary event sentences.
    speechConfig->SetProperty(PropertyId::SpeechServiceResponse_RequestSentenceBoundary, "true");

    const auto ssml = R"(<speak version='1.0' xml:lang='en-US' xmlns='http://www.w3.org/2001/10/synthesis' xmlns:mstts='http://www.w3.org/2001/mstts'>
        <voice name = 'en-US-AvaMultilingualNeural'>
            <mstts:viseme type = 'redlips_front' />
            The rainbow has seven colors : <bookmark mark = 'colors_list_begin' />Red, orange, yellow, green, blue, indigo, and violet.<bookmark mark = 'colors_list_end' />.
        </voice>
        </speak>)";

    auto speechSynthesizer = SpeechSynthesizer::FromConfig(speechConfig);

    // Subscribe to events

    speechSynthesizer->BookmarkReached += [](const SpeechSynthesisBookmarkEventArgs& e)
    {
        std::cout << "Bookmark reached. "
            << "\r\n\tAudioOffset: " << round(e.AudioOffset / 10000) << "ms"
            << "\r\n\tText: " << e.Text << std::endl;
    };

    speechSynthesizer->SynthesisCanceled += [](const SpeechSynthesisEventArgs& e)
    {
        std::cout << "SynthesisCanceled event" << std::endl;
    };

    speechSynthesizer->SynthesisCompleted += [](const SpeechSynthesisEventArgs& e)
    {
        auto audioDuration = std::chrono::duration_cast<std::chrono::milliseconds>(e.Result->AudioDuration).count();

        std::cout << "SynthesisCompleted event:"
            << "\r\n\tAudioData: " << e.Result->GetAudioData()->size() << "bytes"
            << "\r\n\tAudioDuration: " << audioDuration << std::endl;
    };

    speechSynthesizer->SynthesisStarted += [](const SpeechSynthesisEventArgs& e)
    {
        std::cout << "SynthesisStarted event" << std::endl;
    };

    speechSynthesizer->Synthesizing += [](const SpeechSynthesisEventArgs& e)
    {
        std::cout << "Synthesizing event:"
            << "\r\n\tAudioData: " << e.Result->GetAudioData()->size() << "bytes" << std::endl;
    };

    speechSynthesizer->VisemeReceived += [](const SpeechSynthesisVisemeEventArgs& e)
    {
        std::cout << "VisemeReceived event:"
            << "\r\n\tAudioOffset: " << round(e.AudioOffset / 10000) << "ms"
            << "\r\n\tVisemeId: " << e.VisemeId << std::endl;
    };

    speechSynthesizer->WordBoundary += [](const SpeechSynthesisWordBoundaryEventArgs& e)
    {
        auto duration = std::chrono::duration_cast<std::chrono::milliseconds>(e.Duration).count();
        
        auto boundaryType = "";
        switch (e.BoundaryType) {
        case SpeechSynthesisBoundaryType::Punctuation:
            boundaryType = "Punctuation";
            break;
        case SpeechSynthesisBoundaryType::Sentence:
            boundaryType = "Sentence";
            break;
        case SpeechSynthesisBoundaryType::Word:
            boundaryType = "Word";
            break;
        }

        std::cout << "WordBoundary event:"
            // Word, Punctuation, or Sentence
            << "\r\n\tBoundaryType: " << boundaryType
            << "\r\n\tAudioOffset: " << round(e.AudioOffset / 10000) << "ms"
            << "\r\n\tDuration: " << duration
            << "\r\n\tText: \"" << e.Text << "\""
            << "\r\n\tTextOffset: " << e.TextOffset
            << "\r\n\tWordLength: " << e.WordLength << std::endl;
    };

    auto result = speechSynthesizer->SpeakSsmlAsync(ssml).get();

    // Checks result.
    if (result->Reason == ResultReason::SynthesizingAudioCompleted)
    {
        std::cout << "SynthesizingAudioCompleted result" << std::endl;
    }
    else if (result->Reason == ResultReason::Canceled)
    {
        auto cancellation = SpeechSynthesisCancellationDetails::FromResult(result);
        std::cout << "CANCELED: Reason=" << (int)cancellation->Reason << std::endl;

        if (cancellation->Reason == CancellationReason::Error)
        {
            std::cout << "CANCELED: ErrorCode=" << (int)cancellation->ErrorCode << std::endl;
            std::cout << "CANCELED: ErrorDetails=[" << cancellation->ErrorDetails << "]" << std::endl;
            std::cout << "CANCELED: Did you set the speech resource key and region values?" << std::endl;
        }
    }

    std::cout << "Press enter to exit..." << std::endl;
    std::cin.get();
}

std::string getEnvironmentVariable(const char* name)
{
#if defined(_MSC_VER)
    size_t requiredSize = 0;
    (void)getenv_s(&requiredSize, nullptr, 0, name);
    if (requiredSize == 0)
    {
        return "";
    }
    auto buffer = std::make_unique<char[]>(requiredSize);
    (void)getenv_s(&requiredSize, buffer.get(), requiredSize, name);
    return buffer.get();
#else
    auto value = getenv(name);
    return value ? value : "";
#endif
}
```

You can find more text to speech samples at [GitHub](https://aka.ms/csspeech/samples).

## Use a custom endpoint

The custom endpoint is functionally identical to the standard endpoint that's used for text to speech requests. 

One difference is that the `EndpointId` must be specified to use your custom voice via the Speech SDK. You can start with the [text to speech quickstart](get-started-text-to-speech.md) and then update the code with the `EndpointId` and `SpeechSynthesisVoiceName`.

```cpp
auto speechConfig = SpeechConfig::FromSubscription(speechKey, speechRegion);
speechConfig->SetSpeechSynthesisVoiceName("YourCustomVoiceName");
speechConfig->SetEndpointId("YourEndpointId");
```

To use a custom voice via [Speech Synthesis Markup Language (SSML)](speech-synthesis-markup-voice.md#use-voice-elements), specify the model name as the voice name. This example uses the `YourCustomVoiceName` voice. 

```xml
<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US">
    <voice name="YourCustomVoiceName">
        This is the text that is spoken. 
    </voice>
</speak>
```

## Run and use a container

Speech containers provide websocket-based query endpoint APIs that are accessed through the Speech SDK and Speech CLI. By default, the Speech SDK and Speech CLI use the public Speech service. To use the container, you need to change the initialization method. Use a container host URL instead of key and region.

For more information about containers, see [Install and run Speech containers with Docker](speech-container-howto.md).



**Applies to: programming-language-go**



[Reference documentation](https://aka.ms/csspeech/goref) | [Package (Go)](https://pkg.go.dev/github.com/Microsoft/cognitive-services-speech-sdk-go) | [Additional samples on GitHub](https://github.com/microsoft/cognitive-services-speech-sdk-go/tree/master/samples/)



In this how-to guide, you learn common design patterns for doing text to speech synthesis.

For more information about the following areas, see [What is text to speech?](text-to-speech.md)

- Getting responses as in-memory streams.
- Customizing output sample rate and bit rate.
- Submitting synthesis requests by using Speech Synthesis Markup Language (SSML).
- Using neural voices.
- Subscribing to events and acting on results.


## Prerequisites


> 
> - An Azure subscription. You can [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
> - [Create a Foundry resource for Speech](https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry) in the Azure portal.
> - Get the Speech resource key and region. After your Speech resource is deployed, select **Go to resource** to view and manage keys.


### Install the Speech SDK

Before you can do anything, you need to install the [Speech SDK for Go](quickstarts/setup-platform.md?pivots=programming-language-go\&tabs=dotnet%252cwindows%252cjre%252cbrowser).

## Text to speech to speaker

Use the following code sample to run speech synthesis to your default audio output device. Replace the variables `subscription` and `region` with your speech key and location/region. Running the script speaks your input text to the default speaker.

```go
package main

import (
    "bufio"
    "fmt"
    "os"
    "strings"
    "time"

    "github.com/Microsoft/cognitive-services-speech-sdk-go/audio"
    "github.com/Microsoft/cognitive-services-speech-sdk-go/common"
    "github.com/Microsoft/cognitive-services-speech-sdk-go/speech"
)

func synthesizeStartedHandler(event speech.SpeechSynthesisEventArgs) {
    defer event.Close()
    fmt.Println("Synthesis started.")
}

func synthesizingHandler(event speech.SpeechSynthesisEventArgs) {
    defer event.Close()
    fmt.Printf("Synthesizing, audio chunk size %d.\n", len(event.Result.AudioData))
}

func synthesizedHandler(event speech.SpeechSynthesisEventArgs) {
    defer event.Close()
    fmt.Printf("Synthesized, audio length %d.\n", len(event.Result.AudioData))
}

func cancelledHandler(event speech.SpeechSynthesisEventArgs) {
    defer event.Close()
    fmt.Println("Received a cancellation.")
}

func main() {
    subscription := "YourSpeechKey"
    region := "YourSpeechRegion"

    audioConfig, err := audio.NewAudioConfigFromDefaultSpeakerOutput()
    if err != nil {
        fmt.Println("Got an error: ", err)
        return
    }
    defer audioConfig.Close()
    speechConfig, err := speech.NewSpeechConfigFromSubscription(subscription, region)
    if err != nil {
        fmt.Println("Got an error: ", err)
        return
    }
    defer speechConfig.Close()
    speechSynthesizer, err := speech.NewSpeechSynthesizerFromConfig(speechConfig, audioConfig)
    if err != nil {
        fmt.Println("Got an error: ", err)
        return
    }
    defer speechSynthesizer.Close()

    speechSynthesizer.SynthesisStarted(synthesizeStartedHandler)
    speechSynthesizer.Synthesizing(synthesizingHandler)
    speechSynthesizer.SynthesisCompleted(synthesizedHandler)
    speechSynthesizer.SynthesisCanceled(cancelledHandler)

    for {
        fmt.Printf("Enter some text that you want to speak, or enter empty text to exit.\n> ")
        text, _ := bufio.NewReader(os.Stdin).ReadString('\n')
        text = strings.TrimSuffix(text, "\n")
        if len(text) == 0 {
            break
        }

        task := speechSynthesizer.SpeakTextAsync(text)
        var outcome speech.SpeechSynthesisOutcome
        select {
        case outcome = <-task:
        case <-time.After(60 * time.Second):
            fmt.Println("Timed out")
            return
        }
        defer outcome.Close()
        if outcome.Error != nil {
            fmt.Println("Got an error: ", outcome.Error)
            return
        }

        if outcome.Result.Reason == common.SynthesizingAudioCompleted {
            fmt.Printf("Speech synthesized to speaker for text [%s].\n", text)
        } else {
            cancellation, _ := speech.NewCancellationDetailsFromSpeechSynthesisResult(outcome.Result)
            fmt.Printf("CANCELED: Reason=%d.\n", cancellation.Reason)

            if cancellation.Reason == common.Error {
                fmt.Printf("CANCELED: ErrorCode=%d\nCANCELED: ErrorDetails=[%s]\nCANCELED: Did you set the speech resource key and region values?\n",
                    cancellation.ErrorCode,
                    cancellation.ErrorDetails)
            }
        }
    }
}
```

Run the following commands to create a *go.mod* file that links to components hosted on GitHub:

```shell
go mod init quickstart
go get github.com/Microsoft/cognitive-services-speech-sdk-go
```

Now build and run the code:

```shell
go build
go run quickstart
```

For detailed information about the classes, see the [`SpeechConfig`](https://pkg.go.dev/github.com/Microsoft/cognitive-services-speech-sdk-go/speech#SpeechConfig) and [`SpeechSynthesizer`](https://pkg.go.dev/github.com/Microsoft/cognitive-services-speech-sdk-go/speech#SpeechSynthesizer) reference docs.

## Text to speech to in-memory stream

You can use the resulting audio data as an in-memory stream rather than directly writing to a file. With in-memory stream, you can build custom behavior:

- Abstract the resulting byte array as a seekable stream for custom downstream services.
- Integrate the result with other APIs or services.
- Modify the audio data, write custom .wav headers, and do related tasks.

You can make this change to the previous example. Remove the `AudioConfig` block, because you manage the output behavior manually from this point onward for increased control. Then pass `nil` for `AudioConfig` in the `SpeechSynthesizer` constructor.

> **Note:**
> Passing `nil` for `AudioConfig`, rather than omitting it as you did in the previous speaker output example, will not play the audio by default on the current active output device.

Save the result to a [`SpeechSynthesisResult`](https://pkg.go.dev/github.com/Microsoft/cognitive-services-speech-sdk-go/speech#SpeechSynthesisResult) variable. The `AudioData` property returns a `[]byte` instance for the output data. You can work with this `[]byte` instance manually, or you can use the [`AudioDataStream`](https://pkg.go.dev/github.com/Microsoft/cognitive-services-speech-sdk-go/speech#AudioDataStream) class to manage the in-memory stream.
In this example, you use the `NewAudioDataStreamFromSpeechSynthesisResult()` static function to get a stream from the result.

Replace the variables `subscription` and `region` with your speech key and location/region:

```go
package main

import (
    "bufio"
    "fmt"
    "io"
    "os"
    "strings"
    "time"

    "github.com/Microsoft/cognitive-services-speech-sdk-go/speech"
)

func synthesizeStartedHandler(event speech.SpeechSynthesisEventArgs) {
    defer event.Close()
    fmt.Println("Synthesis started.")
}

func synthesizingHandler(event speech.SpeechSynthesisEventArgs) {
    defer event.Close()
    fmt.Printf("Synthesizing, audio chunk size %d.\n", len(event.Result.AudioData))
}

func synthesizedHandler(event speech.SpeechSynthesisEventArgs) {
    defer event.Close()
    fmt.Printf("Synthesized, audio length %d.\n", len(event.Result.AudioData))
}

func cancelledHandler(event speech.SpeechSynthesisEventArgs) {
    defer event.Close()
    fmt.Println("Received a cancellation.")
}

func main() {
    subscription := "YourSpeechKey"
    region := "YourSpeechRegion"

    speechConfig, err := speech.NewSpeechConfigFromSubscription(subscription, region)
    if err != nil {
        fmt.Println("Got an error: ", err)
        return
    }
    defer speechConfig.Close()
    speechSynthesizer, err := speech.NewSpeechSynthesizerFromConfig(speechConfig, nil)
    if err != nil {
        fmt.Println("Got an error: ", err)
        return
    }
    defer speechSynthesizer.Close()

    speechSynthesizer.SynthesisStarted(synthesizeStartedHandler)
    speechSynthesizer.Synthesizing(synthesizingHandler)
    speechSynthesizer.SynthesisCompleted(synthesizedHandler)
    speechSynthesizer.SynthesisCanceled(cancelledHandler)

    for {
        fmt.Printf("Enter some text that you want to speak, or enter empty text to exit.\n> ")
        text, _ := bufio.NewReader(os.Stdin).ReadString('\n')
        text = strings.TrimSuffix(text, "\n")
        if len(text) == 0 {
            break
        }

        // StartSpeakingTextAsync sends the result to channel when the synthesis starts.
        task := speechSynthesizer.StartSpeakingTextAsync(text)
        var outcome speech.SpeechSynthesisOutcome
        select {
        case outcome = <-task:
        case <-time.After(60 * time.Second):
            fmt.Println("Timed out")
            return
        }
        defer outcome.Close()
        if outcome.Error != nil {
            fmt.Println("Got an error: ", outcome.Error)
            return
        }

        // In most cases, we want to streaming receive the audio to lower the latency.
        // We can use AudioDataStream to do so.
        stream, err := speech.NewAudioDataStreamFromSpeechSynthesisResult(outcome.Result)
        defer stream.Close()
        if err != nil {
            fmt.Println("Got an error: ", err)
            return
        }

        var all_audio []byte
        audio_chunk := make([]byte, 2048)
        for {
            n, err := stream.Read(audio_chunk)

            if err == io.EOF {
                break
            }

            all_audio = append(all_audio, audio_chunk[:n]...)
        }

        fmt.Printf("Read [%d] bytes from audio data stream.\n", len(all_audio))
    }
}
```

Run the following commands to create a *go.mod* file that links to components hosted on GitHub:

```shell
go mod init quickstart
go get github.com/Microsoft/cognitive-services-speech-sdk-go
```

Now build and run the code:

```shell
go build
go run quickstart
```

For detailed information about the classes, see the [`SpeechConfig`](https://pkg.go.dev/github.com/Microsoft/cognitive-services-speech-sdk-go/speech#SpeechConfig) and [`SpeechSynthesizer`](https://pkg.go.dev/github.com/Microsoft/cognitive-services-speech-sdk-go/speech#SpeechSynthesizer) reference docs.

## Select synthesis language and voice

The text to speech feature in the Speech service supports more than 400 voices and more than 140 languages and variants. You can get the [full list](language-support.md?tabs=tts) or try them in the [Voice Gallery](https://speech.microsoft.com/portal/voicegallery).

Specify the language or voice of `SpeechConfig` to match your input text and use the specified voice:

```go
speechConfig, err := speech.NewSpeechConfigFromSubscription(key, region)
if err != nil {
    fmt.Println("Got an error: ", err)
    return
}
defer speechConfig.Close()

speechConfig.SetSpeechSynthesisLanguage("en-US")
speechConfig.SetSpeechSynthesisVoiceName("en-US-Ava:DragonHDLatestNeural")
```

All neural voices are multilingual and fluent in their own language and English. For example, if the input text in English is, "I'm excited to try text to speech," and you select `es-ES-Ximena:DragonHDLatestNeural`, the text is spoken in English with a Spanish accent.

If the voice doesn't speak the language of the input text, the Speech service doesn't create synthesized audio. For a full list of supported neural voices, see [Language and voice support for the Speech service](language-support.md?tabs=tts).

> **Note:**
> The default voice is the first voice returned per locale from the [Voice List API](rest-text-to-speech.md#get-a-list-of-voices).

The voice that speaks is determined in order of priority as follows:

- If you don't set `SpeechSynthesisVoiceName` or `SpeechSynthesisLanguage`, the default voice for `en-US` speaks.
- If you only set `SpeechSynthesisLanguage`, the default voice for the specified locale speaks.
- If both `SpeechSynthesisVoiceName` and `SpeechSynthesisLanguage` are set, the `SpeechSynthesisLanguage` setting is ignored. The voice that you specify by using `SpeechSynthesisVoiceName` speaks.
- If the voice element is set by using [Speech Synthesis Markup Language (SSML)](speech-synthesis-markup.md), the `SpeechSynthesisVoiceName` and `SpeechSynthesisLanguage` settings are ignored.

In summary, the order of priority can be described as:

| `SpeechSynthesisVoiceName` | `SpeechSynthesisLanguage` | SSML | Outcome |
| :---: | :---: | :---: | --- |
| ✗ | ✗ | ✗ | Default voice for `en-US` speaks |
| ✗ | ✔ | ✗ | Default voice for specified locale speaks. |
| ✔ | ✔ | ✗ | The voice that you specify by using `SpeechSynthesisVoiceName` speaks. |
| ✔ | ✔ | ✔ | The voice that you specify by using SSML speaks. |

## Use SSML to customize speech characteristics

You can use Speech Synthesis Markup Language (SSML) to fine-tune the pitch, pronunciation, speaking rate, volume, and more in the text to speech output by submitting your requests from an XML schema. This section shows an example of changing the voice. For more information, see [Speech Synthesis Markup Language overview](speech-synthesis-markup.md).

To start using SSML for customization, you make a minor change that switches the voice.

First, create a new XML file for the SSML configuration in your root project directory. In this example, it's `ssml.xml`. The root element is always `<speak>`. Wrapping the text in a `<voice>` element allows you to change the voice by using the `name` parameter. For the full list of supported neural voices, see [Supported languages](language-support.md?tabs=tts).

```xml
<speak version="1.0" xmlns="https://www.w3.org/2001/10/synthesis" xml:lang="en-US">
  <voice name="en-US-Ava:DragonHDLatestNeural">
    When you're on the freeway, it's a good idea to use a GPS.
  </voice>
</speak>
```

Next, you need to change the speech synthesis request to reference your XML file. The request is mostly the same, but instead of using the `SpeakTextAsync()` function, you use `SpeakSsmlAsync()`. This function expects an XML string, so you first load your SSML configuration as a string. From this point, the result object is exactly the same as previous examples.

> **Note:**
> To set the voice without using SSML, you can set the property on  `SpeechConfig` by using `speechConfig.SetSpeechSynthesisVoiceName("en-US-Ava:DragonHDLatestNeural")`.

## Subscribe to synthesizer events

You might want more insights about the text to speech processing and results. For example, you might want to know when the synthesizer starts and stops, or you might want to know about other events encountered during synthesis. 

While using the [SpeechSynthesizer](https://pkg.go.dev/github.com/Microsoft/cognitive-services-speech-sdk-go/speech#SpeechSynthesizer) for text to speech, you can subscribe to the events in this table:



| Event | Description | Use case |
| :--- | :--- | :--- |
| `BookmarkReached` | Signals that a bookmark was reached. To trigger a bookmark reached event, a `bookmark` element is required in the [SSML](speech-synthesis-markup-structure.md#bookmark-element). This event reports the output audio's elapsed time between the beginning of synthesis and the `bookmark` element. The event's `Text` property is the string value that you set in the bookmark's `mark` attribute. The `bookmark` elements aren't spoken. | You can use the `bookmark` element to insert custom markers in SSML to get the offset of each marker in the audio stream. The `bookmark` element can be used to reference a specific location in the text or tag sequence. |
| `SynthesisCanceled` | Signals that the speech synthesis was canceled. | You can confirm when synthesis is canceled. |
| `SynthesisCompleted` | Signals that speech synthesis is complete. | You can confirm when synthesis is complete. |
| `SynthesisStarted` | Signals that speech synthesis started. | You can confirm when synthesis started. |
| `Synthesizing` | Signals that speech synthesis is ongoing. This event fires each time the SDK receives an audio chunk from the Speech service. | You can confirm when synthesis is in progress. |
| `VisemeReceived` | Signals that a viseme event was received. | [Visemes](how-to-speech-synthesis-viseme.md) are often used to represent the key poses in observed speech. Key poses include the position of the lips, jaw, and tongue in producing a particular phoneme. You can use visemes to animate the face of a character as speech audio plays. |
| `WordBoundary` | Signals that a word boundary was received. This event is raised at the beginning of each new spoken word, punctuation, and sentence. The event reports the current word's time offset, in ticks, from the beginning of the output audio. This event also reports the character position in the input text or [SSML](speech-synthesis-markup.md) immediately before the word that's about to be spoken. | This event is commonly used to get relative positions of the text and corresponding audio. You might want to know about a new word, and then take action based on the timing. For example, you can get information that can help you decide when and for how long to highlight words as they're spoken. |

> **Note:**
> Events are raised as the output audio data becomes available, which is faster than playback to an output device. The caller must appropriately synchronize streaming and real-time.


Here's an example that shows how to subscribe to events for speech synthesis. 

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/azure-key-vault.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/how-to-speech-synthesis.md)

You can follow the instructions in the [quickstart](get-started-text-to-speech.md?pivots=go), but replace the contents of that `speech-synthesis.go` file with the following Go code:

```go
package main

import (
    "fmt"
    "os"
    "time"

    "github.com/Microsoft/cognitive-services-speech-sdk-go/audio"
    "github.com/Microsoft/cognitive-services-speech-sdk-go/common"
    "github.com/Microsoft/cognitive-services-speech-sdk-go/speech"
)

func bookmarkReachedHandler(event speech.SpeechSynthesisBookmarkEventArgs) {
    defer event.Close()
    fmt.Println("BookmarkReached event")
}

func synthesisCanceledHandler(event speech.SpeechSynthesisEventArgs) {
    defer event.Close()
    fmt.Println("SynthesisCanceled event")
}

func synthesisCompletedHandler(event speech.SpeechSynthesisEventArgs) {
    defer event.Close()
    fmt.Println("SynthesisCompleted event")
    fmt.Printf("\tAudioData: %d bytes\n", len(event.Result.AudioData))
    fmt.Printf("\tAudioDuration: %d\n", event.Result.AudioDuration)
}

func synthesisStartedHandler(event speech.SpeechSynthesisEventArgs) {
    defer event.Close()
    fmt.Println("SynthesisStarted event")
}

func synthesizingHandler(event speech.SpeechSynthesisEventArgs) {
    defer event.Close()
    fmt.Println("Synthesizing event")
    fmt.Printf("\tAudioData %d bytes\n", len(event.Result.AudioData))
}

func visemeReceivedHandler(event speech.SpeechSynthesisVisemeEventArgs) {
    defer event.Close()
    fmt.Println("VisemeReceived event")
    fmt.Printf("\tAudioOffset: %dms\n", (event.AudioOffset+5000)/10000)
    fmt.Printf("\tVisemeID %d\n", event.VisemeID)
}

func wordBoundaryHandler(event speech.SpeechSynthesisWordBoundaryEventArgs) {
    defer event.Close()
    boundaryType := ""
    switch event.BoundaryType {
    case 0:
        boundaryType = "Word"
    case 1:
        boundaryType = "Punctuation"
    case 2:
        boundaryType = "Sentence"
    }
    fmt.Println("WordBoundary event")
    fmt.Printf("\tBoundaryType %v\n", boundaryType)
    fmt.Printf("\tAudioOffset: %dms\n", (event.AudioOffset+5000)/10000)
    fmt.Printf("\tDuration %d\n", event.Duration)
    fmt.Printf("\tText %s\n", event.Text)
    fmt.Printf("\tTextOffset %d\n", event.TextOffset)
    fmt.Printf("\tWordLength %d\n", event.WordLength)
}

func main() {
    // This example requires environment variables named "SPEECH_KEY" and "SPEECH_REGION"
    speechKey := os.Getenv("SPEECH_KEY")
    speechRegion := os.Getenv("SPEECH_REGION")

    audioConfig, err := audio.NewAudioConfigFromDefaultSpeakerOutput()
    if err != nil {
        fmt.Println("Got an error: ", err)
        return
    }
    defer audioConfig.Close()
    speechConfig, err := speech.NewSpeechConfigFromSubscription(speechKey, speechRegion)
    if err != nil {
        fmt.Println("Got an error: ", err)
        return
    }
    defer speechConfig.Close()

    // Required for WordBoundary event sentences.
    speechConfig.SetProperty(common.SpeechServiceResponseRequestSentenceBoundary, "true")

    speechSynthesizer, err := speech.NewSpeechSynthesizerFromConfig(speechConfig, audioConfig)
    if err != nil {
        fmt.Println("Got an error: ", err)
        return
    }
    defer speechSynthesizer.Close()

    speechSynthesizer.BookmarkReached(bookmarkReachedHandler)
    speechSynthesizer.SynthesisCanceled(synthesisCanceledHandler)
    speechSynthesizer.SynthesisCompleted(synthesisCompletedHandler)
    speechSynthesizer.SynthesisStarted(synthesisStartedHandler)
    speechSynthesizer.Synthesizing(synthesizingHandler)
    speechSynthesizer.VisemeReceived(visemeReceivedHandler)
    speechSynthesizer.WordBoundary(wordBoundaryHandler)

    speechSynthesisVoiceName := "en-US-AvaMultilingualNeural"

    ssml := fmt.Sprintf(`<speak version='1.0' xml:lang='en-US' xmlns='http://www.w3.org/2001/10/synthesis' xmlns:mstts='http://www.w3.org/2001/mstts'>
            <voice name='%s'>
                <mstts:viseme type='redlips_front'/>
                The rainbow has seven colors: <bookmark mark='colors_list_begin'/>Red, orange, yellow, green, blue, indigo, and violet.<bookmark mark='colors_list_end'/>.
            </voice>
        </speak>`, speechSynthesisVoiceName)

    // Synthesize the SSML
    fmt.Printf("SSML to synthesize: \n\t%s\n", ssml)
    task := speechSynthesizer.SpeakSsmlAsync(ssml)

    var outcome speech.SpeechSynthesisOutcome
    select {
    case outcome = <-task:
    case <-time.After(60 * time.Second):
        fmt.Println("Timed out")
        return
    }
    defer outcome.Close()
    if outcome.Error != nil {
        fmt.Println("Got an error: ", outcome.Error)
        return
    }

    if outcome.Result.Reason == common.SynthesizingAudioCompleted {
        fmt.Println("SynthesizingAudioCompleted result")
    } else {
        cancellation, _ := speech.NewCancellationDetailsFromSpeechSynthesisResult(outcome.Result)
        fmt.Printf("CANCELED: Reason=%d.\n", cancellation.Reason)

        if cancellation.Reason == common.Error {
            fmt.Printf("CANCELED: ErrorCode=%d\nCANCELED: ErrorDetails=[%s]\nCANCELED: Did you set the speech resource key and region values?\n",
                cancellation.ErrorCode,
                cancellation.ErrorDetails)
        }
    }
}
```

You can find more text to speech samples at [GitHub](https://github.com/microsoft/cognitive-services-speech-sdk-go/tree/master/samples/).

## Run and use a container

Speech containers provide websocket-based query endpoint APIs that are accessed through the Speech SDK and Speech CLI. By default, the Speech SDK and Speech CLI use the public Speech service. To use the container, you need to change the initialization method. Use a container host URL instead of key and region.

For more information about containers, see [Install and run Speech containers with Docker](speech-container-howto.md).



**Applies to: programming-language-objectivec**



[Reference documentation](https://learn.microsoft.com/objectivec/cognitive-services/speech/) | [Package (download)](https://aka.ms/csspeech/macosbinary) | [Additional samples on GitHub](https://aka.ms/speech/github-objective-c)



In this how-to guide, you learn common design patterns for doing text to speech synthesis.

For more information about the following areas, see [What is text to speech?](text-to-speech.md)

- Getting responses as in-memory streams.
- Customizing output sample rate and bit rate.
- Submitting synthesis requests by using Speech Synthesis Markup Language (SSML).
- Using neural voices.
- Subscribing to events and acting on results.


## Prerequisites


> 
> - An Azure subscription. You can [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
> - [Create a Foundry resource for Speech](https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry) in the Azure portal.
> - Get the Speech resource key and region. After your Speech resource is deployed, select **Go to resource** to view and manage keys.


### Install the Speech SDK and samples

The [Azure-Samples/cognitive-services-speech-sdk](https://github.com/Azure-Samples/cognitive-services-speech-sdk) repository contains samples written in Objective-C for iOS and Mac. Select a link to see installation instructions for each sample:

- [Synthesize speech in Objective-C on macOS](https://github.com/Azure-Samples/cognitive-services-speech-sdk/tree/master/quickstart/objectivec/macos/text-to-speech)
- [Synthesize speech in Objective-C on iOS](https://github.com/Azure-Samples/cognitive-services-speech-sdk/tree/master/quickstart/objectivec/ios/text-to-speech)
- [More samples for Objective-C on iOS](https://github.com/Azure-Samples/cognitive-services-speech-sdk/tree/master/samples/objective-c/ios)

## Use a custom endpoint

The custom endpoint is functionally identical to the standard endpoint that's used for text to speech requests. 

One difference is that the `EndpointId` must be specified to use your custom voice via the Speech SDK. You can start with the [text to speech quickstart](get-started-text-to-speech.md) and then update the code with the `EndpointId` and `SpeechSynthesisVoiceName`.

```ObjectiveC
SPXSpeechConfiguration *speechConfig = [[SPXSpeechConfiguration alloc] initWithSubscription:speechKey region:speechRegion];
speechConfig.speechSynthesisVoiceName = @"YourCustomVoiceName";
speechConfig.EndpointId = @"YourEndpointId";
```

To use a custom voice via [Speech Synthesis Markup Language (SSML)](speech-synthesis-markup-voice.md#use-voice-elements), specify the model name as the voice name. This example uses the `YourCustomVoiceName` voice. 

```xml
<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US">
    <voice name="YourCustomVoiceName">
        This is the text that is spoken. 
    </voice>
</speak>
```

## Run and use a container

Speech containers provide websocket-based query endpoint APIs that are accessed through the Speech SDK and Speech CLI. By default, the Speech SDK and Speech CLI use the public Speech service. To use the container, you need to change the initialization method. Use a container host URL instead of key and region.

For more information about containers, see [Install and run Speech containers with Docker](speech-container-howto.md).



**Applies to: programming-language-cli**



In this how-to guide, you learn common design patterns for doing text to speech synthesis.

For more information about the following areas, see [What is text to speech?](text-to-speech.md)

- Getting responses as in-memory streams.
- Customizing output sample rate and bit rate.
- Submitting synthesis requests by using Speech Synthesis Markup Language (SSML).
- Using neural voices.
- Subscribing to events and acting on results.


## Prerequisites


> 
> - An Azure subscription. You can [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
> - [Create a Foundry resource for Speech](https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry) in the Azure portal.
> - Get the Speech resource key and region. After your Speech resource is deployed, select **Go to resource** to view and manage keys.


## Download and install


Follow these steps and see the [Speech CLI quickstart](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/~/articles/ai-services/speech-service/spx-basics.md#download-and-install) for other requirements for your platform.

1. Run the following .NET CLI command to install the Speech CLI:

   ```dotnetcli
   dotnet tool install --global Microsoft.CognitiveServices.Speech.CLI
   ```

1. Run the following commands to configure your Speech resource key and region. Replace `SUBSCRIPTION-KEY` with your Speech resource key and replace `REGION` with your Speech resource region.

   # [Terminal](#tab/terminal)

   ```console
   spx config @key --set SUBSCRIPTION-KEY
   spx config @region --set REGION
   ```

   # [PowerShell](#tab/powershell)

   ```powershell
   spx --% config @key --set SUBSCRIPTION-KEY
   spx --% config @region --set REGION
   ```

   ***


## Synthesize speech to a speaker

Now you're ready to run the Speech CLI to synthesize speech from text.

- In a console window, change to the directory that contains the Speech CLI binary file. Then run the following command:

  ```console
  spx synthesize --text "I'm excited to try text to speech"
  ```

The Speech CLI produces natural language in English through the computer speaker.

## Synthesize speech to a file

- Run the following command to change the output from your speaker to a *.wav* file:

  ```console
  spx synthesize --text "I'm excited to try text to speech" --audio output greetings.wav
  ```

The Speech CLI produces natural language in English to the *greetings.wav* audio file.

## Run and use a container

Speech containers provide websocket-based query endpoint APIs that are accessed through the Speech SDK and Speech CLI. By default, the Speech SDK and Speech CLI use the public Speech service. To use the container, you need to change the initialization method. Use a container host URL instead of key and region.

For more information about containers, see [Install and run Speech containers with Docker](speech-container-howto.md).



**Applies to: programming-language-swift**



[Reference documentation](https://learn.microsoft.com/objectivec/cognitive-services/speech/) | [Package (download)](https://aka.ms/csspeech/macosbinary) | [Additional samples on GitHub](https://aka.ms/speech/github-objective-c)



In this how-to guide, you learn common design patterns for doing text to speech synthesis.

For more information about the following areas, see [What is text to speech?](text-to-speech.md)

- Getting responses as in-memory streams.
- Customizing output sample rate and bit rate.
- Submitting synthesis requests by using Speech Synthesis Markup Language (SSML).
- Using neural voices.
- Subscribing to events and acting on results.


## Prerequisites


> 
> - An Azure subscription. You can [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
> - [Create a Foundry resource for Speech](https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry) in the Azure portal.
> - Get the Speech resource key and region. After your Speech resource is deployed, select **Go to resource** to view and manage keys.


### Install the Speech SDK and samples

The [Azure-Samples/cognitive-services-speech-sdk](https://github.com/Azure-Samples/cognitive-services-speech-sdk) repository contains samples written in Swift for iOS and Mac. Select a link to see installation instructions for each sample:

- [Synthesize speech in Swift on macOS](https://github.com/Azure-Samples/cognitive-services-speech-sdk/tree/master/quickstart/swift/macos/text-to-speech)
- [Synthesize speech in Swift on iOS](https://github.com/Azure-Samples/cognitive-services-speech-sdk/tree/master/quickstart/swift/ios/text-to-speech)

## Run and use a container

Speech containers provide websocket-based query endpoint APIs that are accessed through the Speech SDK and Speech CLI. By default, the Speech SDK and Speech CLI use the public Speech service. To use the container, you need to change the initialization method. Use a container host URL instead of key and region.

For more information about containers, see [Install and run Speech containers with Docker](speech-container-howto.md).



## Next steps

* [Try the text to speech quickstart](get-started-text-to-speech.md)
* [Get started with custom voice](professional-voice-create-project.md)
* [Improve synthesis with SSML](speech-synthesis-markup.md)
