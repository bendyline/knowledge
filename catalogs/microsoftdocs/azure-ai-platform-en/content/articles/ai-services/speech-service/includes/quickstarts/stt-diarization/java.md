---
author: PatrickFarley
ms.service: azure-speech-foundry-tools
ms.topic: include
ms.date: 1/29/2026
ms.author: pafarley
ai-usage: ai-assisted
---


[Reference documentation](https://learn.microsoft.com/java/api/com.microsoft.cognitiveservices.speech) | [Additional samples on GitHub](https://aka.ms/speech/github-java)



In this quickstart, you run an application for speech to text transcription with real-time diarization. Diarization distinguishes between the different speakers who participate in the conversation. The Speech service provides information about which speaker was speaking a particular part of transcribed speech. 

The speaker information is included in the result in the speaker ID field. The speaker ID is a generic identifier assigned to each conversation participant by the service during the recognition as different speakers are being identified from the provided audio content.

> **Tip:**
> For fast transcription of audio files, consider using the [fast transcription API.](https://learn.microsoft.com/azure/ai-services/speech-service/fast-transcription-create) Fast transcription API supports features such as language identification and diarization. 


## Prerequisites


> 
> - An Azure subscription. You can [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
> - [Create an AI Services resource for Speech](https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry) in the Azure portal.
> - Get the Speech resource key and endpoint. After your Speech resource is deployed, select **Go to resource** to view and manage keys.


## Set up the environment

To set up your environment, [install the Speech SDK](../../../quickstarts/setup-platform.md?pivots=programming-language-java\&tabs=jre). The sample in this quickstart works with the [Java Runtime](https://learn.microsoft.com/azure/cognitive-services/speech-service/quickstarts/setup-platform?pivots=programming-language-java\&tabs=jre).

1. Install [Apache Maven](https://maven.apache.org/install.html). Then run `mvn -v` to confirm successful installation.

1. Create a new `pom.xml` file in the root of your project, and copy the following into it:

    ```xml
    <project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
        <modelVersion>4.0.0</modelVersion>
        <groupId>com.microsoft.cognitiveservices.speech.samples</groupId>
        <artifactId>quickstart-eclipse</artifactId>
        <version>1.0.0-SNAPSHOT</version>
        <build>
            <sourceDirectory>src</sourceDirectory>
            <plugins>
            <plugin>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.7.0</version>
                <configuration>
                <source>1.8</source>
                <target>1.8</target>
                </configuration>
            </plugin>
            </plugins>
        </build>
        <dependencies>
            <dependency>
            <groupId>com.microsoft.cognitiveservices.speech</groupId>
            <artifactId>client-sdk</artifactId>
            <version>1.43.0</version>
            </dependency>
        </dependencies>
    </project>
    ```

1. Install the Speech SDK and dependencies.

    ```console
    mvn clean dependency:copy-dependencies
    ```

### Set environment variables


You need to authenticate your application to access Foundry Tools. This article shows you how to use environment variables to store your credentials. You can then access the environment variables from your code to authenticate your application. For production, use a more secure way to store and access your credentials.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/stt-diarization/java.md)

To set the environment variables for your Speech resource key and endpoint, open a console window, and follow the instructions for your operating system and development environment.

- To set the `SPEECH_KEY` environment variable, replace *your-key* with one of the keys for your resource.
- To set the `ENDPOINT` environment variable, replace *your-endpoint* with one of the endpoints for your resource.

#### [Windows](#tab/windows)

```console
setx SPEECH_KEY your-key
setx ENDPOINT your-endpoint
```

> **Note:**
> If you only need to access the environment variables in the current console, you can set the environment variable with `set` instead of `setx`.

After you add the environment variables, you might need to restart any programs that need to read the environment variables, including the console window. For example, if you're using Visual Studio as your editor, restart Visual Studio before you run the example.

#### [Linux](#tab/linux)

##### Bash

Edit your *.bashrc* file, and add the environment variables:

```bash
export SPEECH_KEY=your-key
export ENDPOINT=your-endpoint
```

After you add the environment variables, run `source ~/.bashrc` from your console window to make the changes effective.

#### [macOS](#tab/macos)

##### Bash

Edit your *.bash_profile* file, and add the environment variables:

```bash
export SPEECH_KEY=your-key
export ENDPOINT=your-endpoint
```

After you add the environment variables, run `source ~/.bash_profile` from your console window to make the changes effective.

##### Xcode

For iOS and macOS development, you set the environment variables in Xcode. For example, follow these steps to set the environment variable in Xcode 13.4.1.

1. Select **Product** > **Scheme** > **Edit scheme**.
1. Select **Arguments** on the **Run** (Debug Run) page.
1. Under **Environment Variables** select the plus (+) sign to add a new environment variable.
1. Enter `SPEECH_KEY` for the **Name** and enter your Speech resource key for the **Value**.

To set the environment variable for your Speech resource endpoint, follow the same steps. Set `ENDPOINT` to the endpoint of your resource. For example, `https://YourResourceName.cognitiveservices.azure.com`.



For more configuration options, see [the Xcode documentation](https://help.apple.com/xcode/#/dev745c5c974).

---


## Implement diarization from file with conversation transcription

Follow these steps to create a console application for conversation transcription.

1. Create a new file named `ConversationTranscription.java` in the same project root directory.

1. Copy the following code into `ConversationTranscription.java`:

    ```java
    import com.microsoft.cognitiveservices.speech.*;
    import com.microsoft.cognitiveservices.speech.audio.AudioConfig;
    import com.microsoft.cognitiveservices.speech.transcription.*;
    
    import java.net.URI;
    import java.net.URISyntaxException;
    import java.util.concurrent.Semaphore;
    import java.util.concurrent.ExecutionException;
    import java.util.concurrent.Future;
    
    public class ConversationTranscription {
        // This example requires environment variables named "SPEECH_KEY" and "ENDPOINT"
        private static String speechKey = System.getenv("SPEECH_KEY");
        private static String endpoint = System.getenv("ENDPOINT");
    
        public static void main(String[] args) throws InterruptedException, ExecutionException, URISyntaxException {
            
            SpeechConfig speechConfig = SpeechConfig.fromEndpoint(new URI(endpoint), speechKey);
            speechConfig.setSpeechRecognitionLanguage("en-US");
            AudioConfig audioInput = AudioConfig.fromWavFileInput("katiesteve.wav");
            speechConfig.setProperty(PropertyId.SpeechServiceResponse_DiarizeIntermediateResults, "true");
            
            Semaphore stopRecognitionSemaphore = new Semaphore(0);
    
            ConversationTranscriber conversationTranscriber = new ConversationTranscriber(speechConfig, audioInput);
            {
                // Subscribes to events.
                conversationTranscriber.transcribing.addEventListener((s, e) -> {
                    System.out.println("TRANSCRIBING: Text=" + e.getResult().getText() + " Speaker ID=" + e.getResult().getSpeakerId() );
                });
    
                conversationTranscriber.transcribed.addEventListener((s, e) -> {
                    if (e.getResult().getReason() == ResultReason.RecognizedSpeech) {
                        System.out.println();
                        System.out.println("TRANSCRIBED: Text=" + e.getResult().getText() + " Speaker ID=" + e.getResult().getSpeakerId() );
                        System.out.println();
                    }
                    else if (e.getResult().getReason() == ResultReason.NoMatch) {
                        System.out.println("NOMATCH: Speech could not be transcribed.");
                    }
                });
    
                conversationTranscriber.canceled.addEventListener((s, e) -> {
                    System.out.println("CANCELED: Reason=" + e.getReason());
    
                    if (e.getReason() == CancellationReason.Error) {
                        System.out.println("CANCELED: ErrorCode=" + e.getErrorCode());
                        System.out.println("CANCELED: ErrorDetails=" + e.getErrorDetails());
                        System.out.println("CANCELED: Did you update the Speech resource info?");
                    }
    
                    stopRecognitionSemaphore.release();
                });
    
                conversationTranscriber.sessionStarted.addEventListener((s, e) -> {
                    System.out.println("\n    Session started event.");
                });
    
                conversationTranscriber.sessionStopped.addEventListener((s, e) -> {
                    System.out.println("\n    Session stopped event.");
                });
    
                conversationTranscriber.startTranscribingAsync().get();
    
                // Waits for completion.
                stopRecognitionSemaphore.acquire();
    
                conversationTranscriber.stopTranscribingAsync().get();
            }
    
            speechConfig.close();
            audioInput.close();
            conversationTranscriber.close();
    
            System.exit(0);
        }
    }
    ```

1. Get the [sample audio file](https://github.com/Azure-Samples/cognitive-services-speech-sdk/blob/master/sampledata/audiofiles/katiesteve.wav) or use your own `.wav` file. Replace `katiesteve.wav` with the path and name of your `.wav` file.

   The application recognizes speech from multiple participants in the conversation. Your audio file should contain multiple speakers.

1. To change the speech recognition language, replace `en-US` with another [supported language](https://learn.microsoft.com/azure/cognitive-services/speech-service/supported-languages). For example, `es-ES` for Spanish (Spain). The default language is `en-US` if you don't specify a language. For details about how to identify one of multiple languages that might be spoken, see [language identification](https://learn.microsoft.com/azure/cognitive-services/speech-service/language-identification).

1. Run your new console application to start conversation transcription:

   ```console
   javac ConversationTranscription.java -cp ".;target\dependency\*"
   java -cp ".;target\dependency\*" ConversationTranscription
   ```

> **Important:**
> Make sure that you set the `SPEECH_KEY` and `ENDPOINT` [environment variables](#set-environment-variables). If you don't set these variables, the sample fails with an error message.

The transcribed conversation should be output as text:

```output
TRANSCRIBING: Text=good morning Speaker ID=Unknown
TRANSCRIBING: Text=good morning steve Speaker ID=Unknown
TRANSCRIBING: Text=good morning steve how Speaker ID=Guest-1
TRANSCRIBING: Text=good morning steve how are you doing Speaker ID=Guest-1
TRANSCRIBING: Text=good morning steve how are you doing today Speaker ID=Guest-1

TRANSCRIBED: Text=Good morning, Steve. How are you doing today? Speaker ID=Guest-1

TRANSCRIBING: Text=good morning katie i hope Speaker ID=Guest-2
TRANSCRIBING: Text=good morning katie i hope you're having a Speaker ID=Guest-2
TRANSCRIBING: Text=good morning katie i hope you're having a great Speaker ID=Guest-2
TRANSCRIBING: Text=good morning katie i hope you're having a great start to Speaker ID=Guest-2
TRANSCRIBING: Text=good morning katie i hope you're having a great start to your day Speaker ID=Guest-2

TRANSCRIBED: Text=Good morning, Katie. I hope you're having a great start to your day. Speaker ID=Guest-2

TRANSCRIBING: Text=have you tried Speaker ID=Unknown
TRANSCRIBING: Text=have you tried the latest Speaker ID=Unknown
TRANSCRIBING: Text=have you tried the latest real Speaker ID=Guest-1
TRANSCRIBING: Text=have you tried the latest real time Speaker ID=Guest-1
TRANSCRIBING: Text=have you tried the latest real time diarization Speaker ID=Guest-1
TRANSCRIBING: Text=have you tried the latest real time diarization in Speaker ID=Guest-1
TRANSCRIBING: Text=have you tried the latest real time diarization in microsoft Speaker ID=Guest-1
TRANSCRIBING: Text=have you tried the latest real time diarization in microsoft speech Speaker ID=Guest-1
TRANSCRIBING: Text=have you tried the latest real time diarization in microsoft speech service Speaker ID=Guest-1
TRANSCRIBING: Text=have you tried the latest real time diarization in microsoft speech service which Speaker ID=Guest-1
TRANSCRIBING: Text=have you tried the latest real time diarization in microsoft speech service which can Speaker ID=Guest-1
TRANSCRIBING: Text=have you tried the latest real time diarization in microsoft speech service which can tell you Speaker ID=Guest-1
TRANSCRIBING: Text=have you tried the latest real time diarization in microsoft speech service which can tell you who said Speaker ID=Guest-1
TRANSCRIBING: Text=have you tried the latest real time diarization in microsoft speech service which can tell you who said what Speaker ID=Guest-1
TRANSCRIBING: Text=have you tried the latest real time diarization in microsoft speech service which can tell you who said what in Speaker ID=Guest-1
TRANSCRIBING: Text=have you tried the latest real time diarization in microsoft speech service which can tell you who said what in real time Speaker ID=Guest-1

TRANSCRIBED: Text=Have you tried the latest real time diarization in Microsoft Speech Service which can tell you who said what in real time? Speaker ID=Guest-1

TRANSCRIBING: Text=not yet Speaker ID=Unknown
TRANSCRIBING: Text=not yet i Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch trans Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch transcription with Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch transcription with diarization Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch transcription with diarization function Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch transcription with diarization functionality Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch transcription with diarization functionality but Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch transcription with diarization functionality but it Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch transcription with diarization functionality but it produces Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch transcription with diarization functionality but it produces di Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch transcription with diarization functionality but it produces diarization Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch transcription with diarization functionality but it produces diarization results Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch transcription with diarization functionality but it produces diarization results after Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch transcription with diarization functionality but it produces diarization results after the Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch transcription with diarization functionality but it produces diarization results after the whole Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch transcription with diarization functionality but it produces diarization results after the whole audio Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch transcription with diarization functionality but it produces diarization results after the whole audio is Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch transcription with diarization functionality but it produces diarization results after the whole audio is processed Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch transcription with diarization functionality but it produces diarization results after the whole audio is processed is the Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch transcription with diarization functionality but it produces diarization results after the whole audio is processed is the new Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch transcription with diarization functionality but it produces diarization results after the whole audio is processed is the new feature Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch transcription with diarization functionality but it produces diarization results after the whole audio is processed is the new feature able to Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch transcription with diarization functionality but it produces diarization results after the whole audio is processed is the new feature able to di Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch transcription with diarization functionality but it produces diarization results after the whole audio is processed is the new feature able to diarize in real Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch transcription with diarization functionality but it produces diarization results after the whole audio is processed is the new feature able to diarize in real time Speaker ID=Guest-2

TRANSCRIBED: Text=Not yet. I've been using the batch transcription with diarization functionality, but it produces diarization results after the whole audio is processed. Is the new feature able to diarize in real time? Speaker ID=Guest-2

TRANSCRIBING: Text=absolutely Speaker ID=Unknown
TRANSCRIBING: Text=absolutely i recom Speaker ID=Guest-1
TRANSCRIBING: Text=absolutely i recommend Speaker ID=Guest-1
TRANSCRIBING: Text=absolutely i recommend you Speaker ID=Guest-1
TRANSCRIBING: Text=absolutely i recommend you give it a try Speaker ID=Guest-1

TRANSCRIBED: Text=Absolutely, I recommend you give it a try. Speaker ID=Guest-1

TRANSCRIBING: Text=that's exc Speaker ID=Unknown
TRANSCRIBING: Text=that's exciting Speaker ID=Unknown
TRANSCRIBING: Text=that's exciting let me try Speaker ID=Guest-2
TRANSCRIBING: Text=that's exciting let me try it right now Speaker ID=Guest-2

TRANSCRIBED: Text=That's exciting. Let me try it right now. Speaker ID=Guest-2
```

Speakers are identified as Guest-1, Guest-2, and so on, depending on the number of speakers in the conversation.

> **Note:**
> You might see `Speaker ID=Unknown` in some of the early intermediate results when the speaker isn't yet identified. Without intermediate diarization results (if you don't set the `PropertyId.SpeechServiceResponse_DiarizeIntermediateResults` property to "true"), the speaker ID is always "Unknown."

## Clean up resources


You can use the [Azure portal](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/common/~/articles/ai-services/multi-service-resource.md?pivots=azportal#clean-up-resources) or [Azure Command Line Interface (CLI)](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/common/~/articles/ai-services/multi-service-resource.md?pivots=azcli#clean-up-resources) to remove the Speech resource you created.
