---
author: PatrickFarley
ms.service: azure-speech-foundry-tools
ms.topic: include
ms.date: 1/29/2026
ms.custom: devx-track-go
ms.author: pafarley
ai-usage: ai-assisted
---


[Reference documentation](https://aka.ms/csspeech/goref) | [Package (Go)](https://pkg.go.dev/github.com/Microsoft/cognitive-services-speech-sdk-go) | [Additional samples on GitHub](https://github.com/microsoft/cognitive-services-speech-sdk-go/tree/master/samples/)



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

The Speech SDK for Go is available as a module. For more information, see the [Speech SDK for Go on pkg.go.dev](https://pkg.go.dev/github.com/Microsoft/cognitive-services-speech-sdk-go).

Before you can use the Speech SDK for Go, install the Speech SDK native library. See the [installation guide](../../../quickstarts/setup-platform.md?pivots=programming-language-go) for more information.

### Set environment variables


You need to authenticate your application to access Foundry Tools. This article shows you how to use environment variables to store your credentials. You can then access the environment variables from your code to authenticate your application. For production, use a more secure way to store and access your credentials.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/stt-diarization/go.md)

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

Follow these steps to create a new console application.

1. Create a new directory for your project and create a file named `conversation_transcription.go`.

1. Install the Speech SDK module:

    ```console
    go get github.com/Microsoft/cognitive-services-speech-sdk-go
    ```

1. Copy the following code into `conversation_transcription.go`:

    ```go
    package main

    import (
        "bufio"
        "fmt"
        "os"
        "time"

        "github.com/Microsoft/cognitive-services-speech-sdk-go/audio"
        "github.com/Microsoft/cognitive-services-speech-sdk-go/common"
        "github.com/Microsoft/cognitive-services-speech-sdk-go/speech"
        "github.com/Microsoft/cognitive-services-speech-sdk-go/transcription"
    )

    func main() {
        // This example requires environment variables named "SPEECH_KEY" and "ENDPOINT"
        // Replace with your own subscription key and endpoint
        // The endpoint is like: "https://YourResourceName.cognitiveservices.azure.com"
        speechKey := os.Getenv("SPEECH_KEY")
        endpoint := os.Getenv("ENDPOINT")

        speechConfig, err := speech.NewSpeechConfigFromEndpoint(endpoint)
        if err != nil {
            fmt.Println("Error creating speech config:", err)
            return
        }
        defer speechConfig.Close()

        err = speechConfig.SetProperty(common.SpeechServiceAuthorization, speechKey)
        if err != nil {
            fmt.Println("Error setting authorization:", err)
            return
        }

        err = speechConfig.SetSpeechRecognitionLanguage("en-US")
        if err != nil {
            fmt.Println("Error setting language:", err)
            return
        }

        // Enable intermediate diarization results
        err = speechConfig.SetProperty(common.SpeechServiceResponseDiarizeIntermediateResults, "true")
        if err != nil {
            fmt.Println("Error setting diarization property:", err)
            return
        }

        audioConfig, err := audio.NewAudioConfigFromWavFileInput("katiesteve.wav")
        if err != nil {
            fmt.Println("Error creating audio config:", err)
            return
        }
        defer audioConfig.Close()

        conversationTranscriber, err := transcription.NewConversationTranscriberFromConfig(speechConfig, audioConfig)
        if err != nil {
            fmt.Println("Error creating conversation transcriber:", err)
            return
        }
        defer conversationTranscriber.Close()

        transcribingStop := false

        // Connect callbacks to the events
        conversationTranscriber.Transcribing(func(event transcription.ConversationTranscriptionEventArgs) {
            fmt.Println("TRANSCRIBING:")
            fmt.Printf("\tText=%s\n", event.Result.Text)
            fmt.Printf("\tSpeaker ID=%s\n", event.Result.SpeakerID)
        })

        conversationTranscriber.Transcribed(func(event transcription.ConversationTranscriptionEventArgs) {
            fmt.Println("\nTRANSCRIBED:")
            if event.Result.Reason == common.RecognizedSpeech {
                fmt.Printf("\tText=%s\n", event.Result.Text)
                fmt.Printf("\tSpeaker ID=%s\n\n", event.Result.SpeakerID)
            } else if event.Result.Reason == common.NoMatch {
                fmt.Println("\tNOMATCH: Speech could not be transcribed.")
            }
        })

        conversationTranscriber.Canceled(func(event transcription.ConversationTranscriptionCanceledEventArgs) {
            fmt.Println("CANCELED:", event.Reason)
            if event.Reason == common.Error {
                fmt.Println("Error details:", event.ErrorDetails)
            }
            transcribingStop = true
        })

        conversationTranscriber.SessionStarted(func(event speech.SessionEventArgs) {
            fmt.Println("SessionStarted event")
        })

        conversationTranscriber.SessionStopped(func(event speech.SessionEventArgs) {
            fmt.Println("SessionStopped event")
            fmt.Println("CLOSING on session stopped event")
            transcribingStop = true
        })

        // Start transcription
        err = <-conversationTranscriber.StartTranscribingAsync()
        if err != nil {
            fmt.Println("Error starting transcription:", err)
            return
        }

        // Wait for completion
        for !transcribingStop {
            time.Sleep(500 * time.Millisecond)
        }

        // Stop transcription
        err = <-conversationTranscriber.StopTranscribingAsync()
        if err != nil {
            fmt.Println("Error stopping transcription:", err)
            return
        }
    }
    ```

1. Get the [sample audio file](https://github.com/Azure-Samples/cognitive-services-speech-sdk/blob/master/sampledata/audiofiles/katiesteve.wav) or use your own `.wav` file. Replace `katiesteve.wav` with the path and name of your `.wav` file.

   The application recognizes speech from multiple participants in the conversation. Your audio file should contain multiple speakers.

1. To change the speech recognition language, replace `en-US` with another [supported language](https://learn.microsoft.com/azure/cognitive-services/speech-service/supported-languages). For example, `es-ES` for Spanish (Spain). The default language is `en-US` if you don't specify a language. For details about how to identify one of multiple languages that might be spoken, see [language identification](https://learn.microsoft.com/azure/cognitive-services/speech-service/language-identification).

1. Run your console application to start conversation transcription:

   ```console
   go run conversation_transcription.go
   ```

> **Important:**
> Make sure that you set the `SPEECH_KEY` and `ENDPOINT` [environment variables](#set-environment-variables). If you don't set these variables, the sample fails with an error message.

The transcribed conversation should be output as text:

```output
SessionStarted event
TRANSCRIBING:
        Text=good morning
        Speaker ID=Unknown
TRANSCRIBING:
        Text=good morning steve
        Speaker ID=Unknown
TRANSCRIBING:
        Text=good morning steve how are
        Speaker ID=Guest-1
TRANSCRIBING:
        Text=good morning steve how are you doing today
        Speaker ID=Guest-1

TRANSCRIBED:
        Text=Good morning, Steve. How are you doing today?
        Speaker ID=Guest-1

TRANSCRIBING:
        Text=good morning katie
        Speaker ID=Unknown
TRANSCRIBING:
        Text=good morning katie i hope you're having a
        Speaker ID=Guest-2
TRANSCRIBING:
        Text=good morning katie i hope you're having a great start to
        Speaker ID=Guest-2
TRANSCRIBING:
        Text=good morning katie i hope you're having a great start to your day
        Speaker ID=Guest-2

TRANSCRIBED:
        Text=Good morning, Katie. I hope you're having a great start to your day.
        Speaker ID=Guest-2

SessionStopped event
CLOSING on session stopped event
```

Speakers are identified as Guest-1, Guest-2, and so on, depending on the number of speakers in the conversation.

> **Note:**
> You might see `Speaker ID=Unknown` in some of the early intermediate results when the speaker isn't yet identified. Without intermediate diarization results (if you don't set the `SpeechServiceResponse_DiarizeIntermediateResults` property to "true"), the speaker ID is always "Unknown."

## Clean up resources


You can use the [Azure portal](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/common/~/articles/ai-services/multi-service-resource.md?pivots=azportal#clean-up-resources) or [Azure Command Line Interface (CLI)](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/common/~/articles/ai-services/multi-service-resource.md?pivots=azcli#clean-up-resources) to remove the Speech resource you created.
