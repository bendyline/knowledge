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



In this quickstart, you run an application to translate speech from one language to text in another language.

> **Tip:**
> Try out the [Azure Speech in Foundry Tools Toolkit](https://marketplace.visualstudio.com/items?itemName=ms-azureaispeech.azure-ai-speech-toolkit) to easily build and run samples on Visual Studio Code.


## Prerequisites


> 
> - An Azure subscription. You can [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
> - [Create a Foundry resource for Speech](https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry) in the Azure portal.
> - Get the Speech resource key and region. After your Speech resource is deployed, select **Go to resource** to view and manage keys.


## Set up the environment

The Speech SDK for Go is available as a module. For more information, see the [Speech SDK for Go on pkg.go.dev](https://pkg.go.dev/github.com/Microsoft/cognitive-services-speech-sdk-go).

Before you can use the Speech SDK for Go, install the Speech SDK native library. See the [installation guide](../../../quickstarts/setup-platform.md?pivots=programming-language-go) for more information.

### Set environment variables


You need to authenticate your application to access Foundry Tools. This article shows you how to use environment variables to store your credentials. You can then access the environment variables from your code to authenticate your application. For production, use a more secure way to store and access your credentials. 

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/speech-translation-basics/go.md)

To set the environment variables for your Speech resource key and region, open a console window, and follow the instructions for your operating system and development environment.

- To set the `SPEECH_KEY` environment variable, replace *your-key* with one of the keys for your resource.
- To set the `SPEECH_REGION` environment variable, replace *your-region* with one of the regions for your resource.
- To set the `ENDPOINT` environment variable, replace `your-endpoint` with the actual endpoint of your Speech resource.

#### [Windows](#tab/windows)

```console
setx SPEECH_KEY your-key
setx SPEECH_REGION your-region
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
export SPEECH_REGION=your-region
export ENDPOINT=your-endpoint
```

After you add the environment variables, run `source ~/.bashrc` from your console window to make the changes effective.

#### [macOS](#tab/macos)

##### Bash

Edit your *.bash_profile* file, and add the environment variables:

```bash
export SPEECH_KEY=your-key
export SPEECH_REGION=your-region
export ENDPOINT=your-endpoint
```

After you add the environment variables, run `source ~/.bash_profile` from your console window to make the changes effective.

##### Xcode

For iOS and macOS development, you set the environment variables in Xcode. For example, follow these steps to set the environment variable in Xcode 13.4.1.

1. Select **Product** > **Scheme** > **Edit scheme**.
1. Select **Arguments** on the **Run** (Debug Run) page.
1. Under **Environment Variables** select the plus (+) sign to add a new environment variable.
1. Enter `SPEECH_KEY` for the **Name** and enter your Speech resource key for the **Value**.

To set the environment variable for your Speech resource region, follow the same steps. Set `SPEECH_REGION` to the region of your resource. For example, `westus`. Set `ENDPOINT` to the endpoint of your resource

For more configuration options, see [the Xcode documentation](https://help.apple.com/xcode/#/dev745c5c974).

---


## Translate speech from a microphone

Follow these steps to create a new console application.

1. Create a new directory for your project and create a file named `speech_translation.go`.

1. Install the Speech SDK module:

    ```console
    go get github.com/Microsoft/cognitive-services-speech-sdk-go
    ```

1. Copy the following code into `speech_translation.go`:

    ```go
    package main

    import (
        "fmt"
        "os"

        "github.com/Microsoft/cognitive-services-speech-sdk-go/audio"
        "github.com/Microsoft/cognitive-services-speech-sdk-go/speech"
    )

    func main() {
        // This example requires environment variables named "SPEECH_KEY" and "SPEECH_REGION"
        speechKey := os.Getenv("SPEECH_KEY")
        speechRegion := os.Getenv("SPEECH_REGION")

        translationConfig, err := speech.NewSpeechTranslationConfigFromSubscription(speechKey, speechRegion)
        if err != nil {
            fmt.Println("Error creating translation config:", err)
            return
        }
        defer translationConfig.Close()

        err = translationConfig.SetSpeechRecognitionLanguage("en-US")
        if err != nil {
            fmt.Println("Error setting speech recognition language:", err)
            return
        }

        toLanguage := "it"
        err = translationConfig.AddTargetLanguage(toLanguage)
        if err != nil {
            fmt.Println("Error adding target language:", err)
            return
        }

        audioConfig, err := audio.NewAudioConfigFromDefaultMicrophoneInput()
        if err != nil {
            fmt.Println("Error creating audio config:", err)
            return
        }
        defer audioConfig.Close()

        translationRecognizer, err := speech.NewTranslationRecognizerFromConfig(translationConfig, audioConfig)
        if err != nil {
            fmt.Println("Error creating translation recognizer:", err)
            return
        }
        defer translationRecognizer.Close()

        fmt.Println("Speak into your microphone.")
        outcome := <-translationRecognizer.RecognizeOnceAsync()
        if outcome.Error != nil {
            fmt.Println("Recognition error:", outcome.Error)
            return
        }

        result := outcome.Result
        defer result.Close()

        if result.Reason == speech.ResultReason.TranslatedSpeech {
            fmt.Printf("Recognized: %s\n", result.Text)
            translations := result.GetTranslations()
            fmt.Printf("Translated into '%s': %s\n", toLanguage, translations[toLanguage])
        } else if result.Reason == speech.ResultReason.NoMatch {
            fmt.Println("No speech could be recognized.")
        } else if result.Reason == speech.ResultReason.Canceled {
            fmt.Println("Speech recognition canceled.")
        }
    }
    ```

1. To change the speech recognition language, replace `en-US` with another [supported language](../../../language-support.md?tabs=stt#supported-languages). Specify the full locale with a dash (`-`) separator. For example, `es-ES` for Spanish (Spain). The default language is `en-US` if you don't specify a language. For details about how to identify one of multiple languages that might be spoken, see [language identification](../../../language-identification.md).
1. To change the translation target language, replace `it` with another [supported language](../../../language-support.md?tabs=speech-translation#supported-languages). With few exceptions, you only specify the language code that precedes the locale dash (`-`) separator. For example, use `es` for Spanish (Spain) instead of `es-ES`. The default language is `en` if you don't specify a language.

Run your new console application to start speech recognition from a microphone:

```console
go run speech_translation.go
```

Speak into your microphone when prompted. What you speak should be output as translated text in the target language:

```output
Speak into your microphone.
Recognized: I'm excited to try speech translation.
Translated into 'it': Sono entusiasta di provare la traduzione vocale.
```

## Remarks

After completing the quickstart, here are some more considerations:

- This example uses the `RecognizeOnceAsync` operation to transcribe utterances of up to 30 seconds, or until silence is detected. For information about continuous recognition for longer audio, including multi-lingual conversations, see [How to translate speech](../../../how-to-translate-speech.md).
- To recognize speech from an audio file, use `NewAudioConfigFromWavFileInput` instead of `NewAudioConfigFromDefaultMicrophoneInput`:
    ```go
    audioConfig, err := audio.NewAudioConfigFromWavFileInput("YourAudioFile.wav")
    ```
- For compressed audio files such as MP4, install GStreamer and use `CreatePullStream` or `CreatePushStream`. For more information, see [How to use compressed input audio](../../../how-to-use-codec-compressed-audio-input-streams.md).

## Clean up resources


You can use the [Azure portal](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/common/~/articles/ai-services/multi-service-resource.md?pivots=azportal#clean-up-resources) or [Azure Command Line Interface (CLI)](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/common/~/articles/ai-services/multi-service-resource.md?pivots=azcli#clean-up-resources) to remove the Speech resource you created.
