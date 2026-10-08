---
author: PatrickFarley
ms.service: azure-speech-foundry-tools
ms.topic: include
ms.date: 08/30/2023
ms.custom: devx-track-java
ms.author: pafarley
---


[Reference documentation](https://learn.microsoft.com/java/api/com.microsoft.cognitiveservices.speech) | [Additional samples on GitHub](https://aka.ms/speech/github-java)



In this how-to guide, you learn common design patterns for doing text to speech synthesis.

For more information about the following areas, see [What is text to speech?](../../../text-to-speech.md)

- Getting responses as in-memory streams.
- Customizing output sample rate and bit rate.
- Submitting synthesis requests by using Speech Synthesis Markup Language (SSML).
- Using neural voices.
- Subscribing to events and acting on results.


## Select synthesis language and voice

The text to speech feature in the Speech service supports more than 400 voices and more than 140 languages and variants.
You can get the [full list](../../../language-support.md?tabs=tts) or try them in the [Voice Gallery](https://speech.microsoft.com/portal/voicegallery).

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

If the voice doesn't speak the language of the input text, the Speech service doesn't create synthesized audio. For a full list of supported neural voices, see [Language and voice support for the Speech service](../../../language-support.md?tabs=tts).

> **Note:**
> The default voice is the first voice returned per locale from the [Voice List API](../../../rest-text-to-speech.md#get-a-list-of-voices).

The voice that speaks is determined in order of priority as follows:

- If you don't set `SpeechSynthesisVoiceName` or `SpeechSynthesisLanguage`, the default voice for `en-US` speaks.
- If you only set `SpeechSynthesisLanguage`, the default voice for the specified locale speaks.
- If both `SpeechSynthesisVoiceName` and `SpeechSynthesisLanguage` are set, the `SpeechSynthesisLanguage` setting is ignored. The voice that you specified by using `SpeechSynthesisVoiceName` speaks.
- If the voice element is set by using [Speech Synthesis Markup Language (SSML)](../../../speech-synthesis-markup.md), the `SpeechSynthesisVoiceName` and `SpeechSynthesisLanguage` settings are ignored.

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

You can use SSML to fine-tune the pitch, pronunciation, speaking rate, volume, and other aspects in the text to speech output by submitting your requests from an XML schema. This section shows an example of changing the voice. For more information, see the [SSML how-to article](../../../speech-synthesis-markup.md).

To start using SSML for customization, you make a minor change that switches the voice.

1. Create a new XML file for the SSML configuration in your root project directory.

   ```xml
   <speak version="1.0" xmlns="https://www.w3.org/2001/10/synthesis" xml:lang="en-US">
     <voice name="en-US-Ava:DragonHDLatestNeural">
       When you're on the freeway, it's a good idea to use a GPS.
     </voice>
   </speak>
   ```

   In this example, the file is *ssml.xml*. The root element is always `<speak>`. Wrapping the text in a `<voice>` element allows you to change the voice by using the `name` parameter. For the full list of supported neural voices, see [Supported languages](../../../language-support.md?tabs=tts).

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
| `BookmarkReached` | Signals that a bookmark was reached. To trigger a bookmark reached event, a `bookmark` element is required in the [SSML](../../../speech-synthesis-markup-structure.md#bookmark-element). This event reports the output audio's elapsed time between the beginning of synthesis and the `bookmark` element. The event's `Text` property is the string value that you set in the bookmark's `mark` attribute. The `bookmark` elements aren't spoken. | You can use the `bookmark` element to insert custom markers in SSML to get the offset of each marker in the audio stream. The `bookmark` element can be used to reference a specific location in the text or tag sequence. |
| `SynthesisCanceled` | Signals that the speech synthesis was canceled. | You can confirm when synthesis is canceled. |
| `SynthesisCompleted` | Signals that speech synthesis is complete. | You can confirm when synthesis is complete. |
| `SynthesisStarted` | Signals that speech synthesis started. | You can confirm when synthesis started. |
| `Synthesizing` | Signals that speech synthesis is ongoing. This event fires each time the SDK receives an audio chunk from the Speech service. | You can confirm when synthesis is in progress. |
| `VisemeReceived` | Signals that a viseme event was received. | [Visemes](../../../how-to-speech-synthesis-viseme.md) are often used to represent the key poses in observed speech. Key poses include the position of the lips, jaw, and tongue in producing a particular phoneme. You can use visemes to animate the face of a character as speech audio plays. |
| `WordBoundary` | Signals that a word boundary was received. This event is raised at the beginning of each new spoken word, punctuation, and sentence. The event reports the current word's time offset, in ticks, from the beginning of the output audio. This event also reports the character position in the input text or [SSML](../../../speech-synthesis-markup.md) immediately before the word that's about to be spoken. | This event is commonly used to get relative positions of the text and corresponding audio. You might want to know about a new word, and then take action based on the timing. For example, you can get information that can help you decide when and for how long to highlight words as they're spoken. |

> **Note:**
> Events are raised as the output audio data becomes available, which is faster than playback to an output device. The caller must appropriately synchronize streaming and real-time.


Here's an example that shows how to subscribe to events for speech synthesis. 

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/azure-key-vault.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/speech-synthesis/java.md)

You can follow the instructions in the [quickstart](../../../get-started-text-to-speech.md?pivots=java), but replace the contents of that *SpeechSynthesis.java* file with the following Java code:

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

One difference is that the `EndpointId` must be specified to use your custom voice via the Speech SDK. You can start with the [text to speech quickstart](../../../get-started-text-to-speech.md) and then update the code with the `EndpointId` and `SpeechSynthesisVoiceName`.

```java
SpeechConfig speechConfig = SpeechConfig.fromSubscription(speechKey, speechRegion);
speechConfig.setSpeechSynthesisVoiceName("YourCustomVoiceName");
speechConfig.setEndpointId("YourEndpointId");
```

To use a custom voice via [Speech Synthesis Markup Language (SSML)](../../../speech-synthesis-markup-voice.md#use-voice-elements), specify the model name as the voice name. This example uses the `YourCustomVoiceName` voice. 

```xml
<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US">
    <voice name="YourCustomVoiceName">
        This is the text that is spoken. 
    </voice>
</speak>
```

## Run and use a container

Speech containers provide websocket-based query endpoint APIs that are accessed through the Speech SDK and Speech CLI. By default, the Speech SDK and Speech CLI use the public Speech service. To use the container, you need to change the initialization method. Use a container host URL instead of key and region.

For more information about containers, see [Install and run Speech containers with Docker](../../../speech-container-howto.md).
