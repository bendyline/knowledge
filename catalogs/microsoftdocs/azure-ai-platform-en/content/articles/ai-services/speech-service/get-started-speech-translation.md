---
title: Speech translation quickstart - Speech service
titleSuffix: Foundry Tools
description: In this quickstart, you translate speech from one language to text in another language. 
author: PatrickFarley
manager: mcleans
ms.service: azure-speech-foundry-tools
ms.custom: devx-track-extended-java, devx-track-go, devx-track-js, devx-track-python
ms.topic: quickstart
ms.date: 01/30/2026
ms.author: pafarley
zone_pivot_groups: programming-languages-speech-translation
keywords: speech translation
---

# Quickstart: Recognize and translate speech to text

**Applies to: programming-language-rest**



[Speech to text REST API reference](rest-speech-to-text.md) | [Speech to text REST API for short audio reference](rest-speech-to-text-short.md) | [Additional samples on GitHub](https://github.com/Azure-Samples/cognitive-services-speech-sdk)


The REST API doesn't support speech translation. Please select another programming language or tool from the top of this page. 



**Applies to: programming-language-python**



[Reference documentation](https://learn.microsoft.com/python/api/azure-cognitiveservices-speech/) | [Package (PyPi)](https://pypi.org/project/azure-cognitiveservices-speech/) | [Additional samples on GitHub](https://aka.ms/speech/github-python)



In this quickstart, you run an application to translate speech from one language to text in another language.

> **Tip:**
> Try out the [Azure Speech in Foundry Tools Toolkit](https://marketplace.visualstudio.com/items?itemName=ms-azureaispeech.azure-ai-speech-toolkit) to easily build and run samples on Visual Studio Code.


## Prerequisites


> 
> - An Azure subscription. You can [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
> - [Create an AI Services resource for Speech](https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry) in the Azure portal.
> - Get the Speech resource key and endpoint. After your Speech resource is deployed, select **Go to resource** to view and manage keys.


## Set up the environment

The Speech SDK for Python is available as a [Python Package Index (PyPI) module](https://pypi.org/project/azure-cognitiveservices-speech/). The Speech SDK for Python is compatible with Windows, Linux, and macOS. 
- Install the [Microsoft Visual C++ Redistributable for Visual Studio 2015, 2017, 2019, and 2022](https://learn.microsoft.com/cpp/windows/latest-supported-vc-redist?view=msvc-170\&preserve-view=true) for your platform. Restart your machine if this is your first installation of the package.
- Use the x64 target architecture on Linux.

Install a version of [Python from 3.7 or later](https://www.python.org/downloads/). First check the [SDK installation guide](quickstarts/setup-platform.md?pivots=programming-language-python) for any more requirements 

### Set environment variables


You need to authenticate your application to access Foundry Tools. This article shows you how to use environment variables to store your credentials. You can then access the environment variables from your code to authenticate your application. For production, use a more secure way to store and access your credentials.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/get-started-speech-translation.md)

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


## Translate speech from a microphone

Follow these steps to create a new console application.

1. Open a command prompt where you want the new project, and create a new file named `speech_translation.py`.
1. Run this command to install the Speech SDK:  
    ```console
    pip install azure-cognitiveservices-speech
    ```
1. Copy the following code into `speech_translation.py`: 

    ```Python
    import os
    import azure.cognitiveservices.speech as speechsdk
    
    def recognize_from_microphone():
        # This example requires environment variables named "SPEECH_KEY" and "ENDPOINT"
        # Replace with your own subscription key and endpoint, the endpoint is like : "https://YourResourceName.cognitiveservices.azure.com"
        speech_translation_config = speechsdk.translation.SpeechTranslationConfig(subscription=os.environ.get('SPEECH_KEY'), endpoint=os.environ.get('ENDPOINT'))
        speech_translation_config.speech_recognition_language="en-US"
    
        to_language ="it"
        speech_translation_config.add_target_language(to_language)
    
        audio_config = speechsdk.audio.AudioConfig(use_default_microphone=True)
        translation_recognizer = speechsdk.translation.TranslationRecognizer(translation_config=speech_translation_config, audio_config=audio_config)
    
        print("Speak into your microphone.")
        translation_recognition_result = translation_recognizer.recognize_once_async().get()
    
        if translation_recognition_result.reason == speechsdk.ResultReason.TranslatedSpeech:
            print("Recognized: {}".format(translation_recognition_result.text))
            print("""Translated into '{}': {}""".format(
                to_language, 
                translation_recognition_result.translations[to_language]))
        elif translation_recognition_result.reason == speechsdk.ResultReason.NoMatch:
            print("No speech could be recognized: {}".format(translation_recognition_result.no_match_details))
        elif translation_recognition_result.reason == speechsdk.ResultReason.Canceled:
            cancellation_details = translation_recognition_result.cancellation_details
            print("Speech Recognition canceled: {}".format(cancellation_details.reason))
            if cancellation_details.reason == speechsdk.CancellationReason.Error:
                print("Error details: {}".format(cancellation_details.error_details))
                print("Did you set the speech resource key and endpoint values?")
    
    recognize_from_microphone()
    ```

1. To change the speech recognition language, replace `en-US` with another [supported language](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/speech-translation-basics/~/articles/ai-services/speech-service/language-support.md?tabs=stt#supported-languages). Specify the full locale with a dash (`-`) separator. For example, `es-ES` for Spanish (Spain). The default language is `en-US` if you don't specify a language. For details about how to identify one of multiple languages that might be spoken, see [language identification](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/speech-translation-basics/~/articles/ai-services/speech-service/language-identification.md).
1. To change the translation target language, replace `it` with another [supported language](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/speech-translation-basics/~/articles/ai-services/speech-service/language-support.md?tabs=speech-translation#supported-languages). With few exceptions, you only specify the language code that precedes the locale dash (`-`) separator. For example, use `es` for Spanish (Spain) instead of `es-ES`. The default language is `en` if you don't specify a language.

Run your new console application to start speech recognition from a microphone:

```console
python speech_translation.py
```

Speak into your microphone when prompted. What you speak should be output as translated text in the target language: 

```console
Speak into your microphone.
Recognized: I'm excited to try speech translation.
Translated into 'it': Sono entusiasta di provare la traduzione vocale.
```

## Remarks
After completing the quickstart, here are some more considerations:

- This example uses the `recognize_once_async` operation to transcribe utterances of up to 30 seconds, or until silence is detected. For information about continuous recognition for longer audio, including multi-lingual conversations, see [How to translate speech](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/speech-translation-basics/~/articles/ai-services/speech-service/how-to-translate-speech.md).
- To recognize speech from an audio file, use `filename` instead of `use_default_microphone`:
    ```python
    audio_config = speechsdk.audio.AudioConfig(filename="YourAudioFile.wav")
    ```
- For compressed audio files such as MP4, install GStreamer and use `PullAudioInputStream` or `PushAudioInputStream`. For more information, see [How to use compressed input audio](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/speech-translation-basics/~/articles/ai-services/speech-service/how-to-use-codec-compressed-audio-input-streams.md).

## Clean up resources


You can use the [Azure portal](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/common/~/articles/ai-services/multi-service-resource.md?pivots=azportal#clean-up-resources) or [Azure Command Line Interface (CLI)](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/common/~/articles/ai-services/multi-service-resource.md?pivots=azcli#clean-up-resources) to remove the Speech resource you created.




**Applies to: programming-language-csharp**



[Reference documentation](https://learn.microsoft.com/dotnet/api/microsoft.cognitiveservices.speech) | [Package (NuGet)](https://www.nuget.org/packages/Microsoft.CognitiveServices.Speech) | [Additional samples on GitHub](https://aka.ms/speech/github-csharp)



In this quickstart, you run an application to translate speech from one language to text in another language.

> **Tip:**
> Try out the [Azure Speech in Foundry Tools Toolkit](https://marketplace.visualstudio.com/items?itemName=ms-azureaispeech.azure-ai-speech-toolkit) to easily build and run samples on Visual Studio Code.


## Prerequisites


> 
> - An Azure subscription. You can [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
> - [Create an AI Services resource for Speech](https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry) in the Azure portal.
> - Get the Speech resource key and endpoint. After your Speech resource is deployed, select **Go to resource** to view and manage keys.


## Set up the environment
The Speech SDK is available as a [NuGet package](https://www.nuget.org/packages/Microsoft.CognitiveServices.Speech) and implements .NET Standard 2.0. You install the Speech SDK later in this guide, but first check the [SDK installation guide](quickstarts/setup-platform.md?pivots=programming-language-csharp) for any more requirements. 

### Set environment variables


You need to authenticate your application to access Foundry Tools. This article shows you how to use environment variables to store your credentials. You can then access the environment variables from your code to authenticate your application. For production, use a more secure way to store and access your credentials.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/get-started-speech-translation.md)

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


## Translate speech from a microphone

Follow these steps to create a new console application and install the Speech SDK.

1. Open a command prompt where you want the new project, and create a console application with the .NET CLI. The `Program.cs` file should be created in the project directory.
    ```dotnetcli
    dotnet new console
    ```
1. Install the Speech SDK in your new project with the .NET CLI.
    ```dotnetcli
    dotnet add package Microsoft.CognitiveServices.Speech
    ```
1. Replace the contents of `Program.cs` with the following code. 

    ```csharp
    using System;
    using System.IO;
    using System.Threading.Tasks;
    using Microsoft.CognitiveServices.Speech;
    using Microsoft.CognitiveServices.Speech.Audio;
    using Microsoft.CognitiveServices.Speech.Translation;
    
    class Program 
    {
        // This example requires environment variables named "SPEECH_KEY" and "ENDPOINT"
        static string speechKey = Environment.GetEnvironmentVariable("SPEECH_KEY");
        static string endpoint = Environment.GetEnvironmentVariable("ENDPOINT");
    
        static void OutputSpeechRecognitionResult(TranslationRecognitionResult translationRecognitionResult)
        {
            switch (translationRecognitionResult.Reason)
            {
                case ResultReason.TranslatedSpeech:
                    Console.WriteLine($"RECOGNIZED: Text={translationRecognitionResult.Text}");
                    foreach (var element in translationRecognitionResult.Translations)
                    {
                        Console.WriteLine($"TRANSLATED into '{element.Key}': {element.Value}");
                    }
                    break;
                case ResultReason.NoMatch:
                    Console.WriteLine($"NOMATCH: Speech could not be recognized.");
                    break;
                case ResultReason.Canceled:
                    var cancellation = CancellationDetails.FromResult(translationRecognitionResult);
                    Console.WriteLine($"CANCELED: Reason={cancellation.Reason}");
    
                    if (cancellation.Reason == CancellationReason.Error)
                    {
                        Console.WriteLine($"CANCELED: ErrorCode={cancellation.ErrorCode}");
                        Console.WriteLine($"CANCELED: ErrorDetails={cancellation.ErrorDetails}");
                        Console.WriteLine($"CANCELED: Did you set the speech resource key and endpoint values?");
                    }
                    break;
            }
        }
    
        async static Task Main(string[] args)
        {
            var speechTranslationConfig = SpeechTranslationConfig.FromEndpoint(new Uri(endpoint), speechKey);        
            speechTranslationConfig.SpeechRecognitionLanguage = "en-US";
            speechTranslationConfig.AddTargetLanguage("it");
    
            using var audioConfig = AudioConfig.FromDefaultMicrophoneInput();
            using var translationRecognizer = new TranslationRecognizer(speechTranslationConfig, audioConfig);
    
            Console.WriteLine("Speak into your microphone.");
            var translationRecognitionResult = await translationRecognizer.RecognizeOnceAsync();
            OutputSpeechRecognitionResult(translationRecognitionResult);
        }
    }
    ```

1. To change the speech recognition language, replace `en-US` with another [supported language](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/speech-translation-basics/~/articles/ai-services/speech-service/language-support.md?tabs=stt#supported-languages). Specify the full locale with a dash (`-`) separator. For example, `es-ES` for Spanish (Spain). The default language is `en-US` if you don't specify a language. For details about how to identify one of multiple languages that might be spoken, see [language identification](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/speech-translation-basics/~/articles/ai-services/speech-service/language-identification.md).
1. To change the translation target language, replace `it` with another [supported language](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/speech-translation-basics/~/articles/ai-services/speech-service/language-support.md?tabs=speech-translation#supported-languages). With few exceptions, you only specify the language code that precedes the locale dash (`-`) separator. For example, use `es` for Spanish (Spain) instead of `es-ES`. The default language is `en` if you don't specify a language.

Run your new console application to start speech recognition from a microphone:

```console
dotnet run
```

Speak into your microphone when prompted. What you speak should be output as translated text in the target language:

```console
Speak into your microphone.
RECOGNIZED: Text=I'm excited to try speech translation.
TRANSLATED into 'it': Sono entusiasta di provare la traduzione vocale.
```

## Remarks
After completing the quickstart, here are some more considerations:

- This example uses the `RecognizeOnceAsync` operation to transcribe utterances of up to 30 seconds, or until silence is detected. For information about continuous recognition for longer audio, including multi-lingual conversations, see [How to translate speech](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/speech-translation-basics/~/articles/ai-services/speech-service/how-to-translate-speech.md).
- To recognize speech from an audio file, use `FromWavFileInput` instead of `FromDefaultMicrophoneInput`:
    ```csharp
    using var audioConfig = AudioConfig.FromWavFileInput("YourAudioFile.wav");
    ```
- For compressed audio files such as MP4, install GStreamer and use `PullAudioInputStream` or `PushAudioInputStream`. For more information, see [How to use compressed input audio](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/speech-translation-basics/~/articles/ai-services/speech-service/how-to-use-codec-compressed-audio-input-streams.md).

## Clean up resources


You can use the [Azure portal](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/common/~/articles/ai-services/multi-service-resource.md?pivots=azportal#clean-up-resources) or [Azure Command Line Interface (CLI)](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/common/~/articles/ai-services/multi-service-resource.md?pivots=azcli#clean-up-resources) to remove the Speech resource you created.




**Applies to: programming-language-javascript**



[Reference documentation](https://learn.microsoft.com/javascript/api/microsoft-cognitiveservices-speech-sdk/) | [Package (npm)](https://www.npmjs.com/package/microsoft-cognitiveservices-speech-sdk) | [Additional samples on GitHub](https://aka.ms/speech/github-javascript) | [Library source code](https://github.com/Microsoft/cognitive-services-speech-sdk-js)



In this quickstart, you run an application to translate speech from one language to text in another language.

> **Tip:**
> Try out the [Azure Speech in Foundry Tools Toolkit](https://marketplace.visualstudio.com/items?itemName=ms-azureaispeech.azure-ai-speech-toolkit) to easily build and run samples on Visual Studio Code.


## Prerequisites


> 
> - An Azure subscription. You can [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
> - [Create a Foundry resource for Speech](https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry) in the Azure portal.
> - Get the Speech resource key and region. After your Speech resource is deployed, select **Go to resource** to view and manage keys.


## Set up the environment

1. Create a new folder `translation-quickstart` and go to the quickstart folder with the following command:

    ```shell
    mkdir translation-quickstart && cd translation-quickstart
    ```
    
1. Create the `package.json` with the following command:

    ```shell
    npm init -y
    ```

1. Install the Speech SDK for JavaScript with:

    ```console
    npm install microsoft-cognitiveservices-speech-sdk
    ```

### Retrieve resource information


You need to authenticate your application to access Foundry Tools. This article shows you how to use environment variables to store your credentials. You can then access the environment variables from your code to authenticate your application. For production, use a more secure way to store and access your credentials. 

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/get-started-speech-translation.md)

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


## Translate speech from a file 

To translate speech from a file:

1. Create a new file named *translation.js* with the following content:

    ```javascript
    import { readFileSync } from "fs";
    import { SpeechTranslationConfig, AudioConfig, TranslationRecognizer, ResultReason, CancellationDetails, CancellationReason } from "microsoft-cognitiveservices-speech-sdk";
    // This example requires environment variables named "ENDPOINT" and "SPEECH_KEY"
    const speechTranslationConfig = SpeechTranslationConfig.fromEndpoint(new URL(process.env.ENDPOINT), process.env.SPEECH_KEY);
    speechTranslationConfig.speechRecognitionLanguage = "en-US";
    const language = "it";
    speechTranslationConfig.addTargetLanguage(language);
    function fromFile() {
        const audioConfig = AudioConfig.fromWavFileInput(readFileSync("YourAudioFile.wav"));
        const translationRecognizer = new TranslationRecognizer(speechTranslationConfig, audioConfig);
        translationRecognizer.recognizeOnceAsync((result) => {
            switch (result.reason) {
                case ResultReason.TranslatedSpeech:
                    console.log(`RECOGNIZED: Text=${result.text}`);
                    console.log("Translated into [" + language + "]: " + result.translations.get(language));
                    break;
                case ResultReason.NoMatch:
                    console.log("NOMATCH: Speech could not be recognized.");
                    break;
                case ResultReason.Canceled:
                    const cancellation = CancellationDetails.fromResult(result);
                    console.log(`CANCELED: Reason=${cancellation.reason}`);
                    if (cancellation.reason === CancellationReason.Error) {
                        console.log(`CANCELED: ErrorCode=${cancellation.ErrorCode}`);
                        console.log(`CANCELED: ErrorDetails=${cancellation.errorDetails}`);
                        console.log("CANCELED: Did you set the speech resource key and endpoint values?");
                    }
                    break;
            }
            translationRecognizer.close();
        });
    }
    fromFile();
    ```

    - In `translation.js`, replace `YourAudioFile.wav` with your own WAV file. This example only recognizes speech from a WAV file. For information about other audio formats, see [How to use compressed input audio](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/speech-translation-basics/~/articles/ai-services/speech-service/how-to-use-codec-compressed-audio-input-streams.md). This example supports up to 30 seconds audio.

    - To change the speech recognition language, replace `en-US` with another [supported language](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/speech-translation-basics/~/articles/ai-services/speech-service/language-support.md?tabs=stt#supported-languages). Specify the full locale with a dash (`-`) separator. For example, `es-ES` for Spanish (Spain). The default language is `en-US` if you don't specify a language. For details about how to identify one of multiple languages that might be spoken, see [language identification](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/speech-translation-basics/~/articles/ai-services/speech-service/language-identification.md).

    - To change the translation target language, replace `it` with another [supported language](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/speech-translation-basics/~/articles/ai-services/speech-service/language-support.md?tabs=speech-translation#supported-languages). With few exceptions you only specify the language code that precedes the locale dash (`-`) separator. For example, use `es` for Spanish (Spain) instead of `es-ES`. The default language is `en` if you don't specify a language.

1. Run your new console application to start speech recognition from a file:

    ```console
    node translation.js
    ```

## Output 

The speech from the audio file should be output as translated text in the target language:

```console
RECOGNIZED: Text=I'm excited to try speech translation.
Translated into [it]: Sono entusiasta di provare la traduzione vocale.
```

## Remarks

Now that you've completed the quickstart, here are some additional considerations:

This example uses the `recognizeOnceAsync` operation to transcribe utterances of up to 30 seconds, or until silence is detected. For information about continuous recognition for longer audio, including multi-lingual conversations, see [How to translate speech](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/speech-translation-basics/~/articles/ai-services/speech-service/how-to-translate-speech.md).

> **Note:**
> Recognizing speech from a microphone is not supported in Node.js. It's supported only in a browser-based JavaScript environment. 

## Clean up resources


You can use the [Azure portal](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/common/~/articles/ai-services/multi-service-resource.md?pivots=azportal#clean-up-resources) or [Azure Command Line Interface (CLI)](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/common/~/articles/ai-services/multi-service-resource.md?pivots=azcli#clean-up-resources) to remove the Speech resource you created.




**Applies to: programming-language-java**



[Reference documentation](https://learn.microsoft.com/java/api/com.microsoft.cognitiveservices.speech) | [Additional samples on GitHub](https://aka.ms/speech/github-java)



In this quickstart, you run an application to translate speech from one language to text in another language.

> **Tip:**
> Try out the [Azure Speech in Foundry Tools Toolkit](https://marketplace.visualstudio.com/items?itemName=ms-azureaispeech.azure-ai-speech-toolkit) to easily build and run samples on Visual Studio Code.


## Prerequisites


> 
> - An Azure subscription. You can [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
> - [Create an AI Services resource for Speech](https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry) in the Azure portal.
> - Get the Speech resource key and endpoint. After your Speech resource is deployed, select **Go to resource** to view and manage keys.


## Set up the environment

Before you can do anything, you need to install the Speech SDK. The sample in this quickstart works with the [Java Runtime](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/speech-translation-basics/~/articles/ai-services/speech-service/quickstarts/setup-platform.md?pivots=programming-language-java\&tabs=jre).

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

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/get-started-speech-translation.md)

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


## Translate speech from a microphone

Follow these steps to create a new console application for speech recognition.

1. Create a new file named `SpeechTranslation.java` in the same project root directory.
1. Copy the following code into `SpeechTranslation.java`:

    ```java
    import com.microsoft.cognitiveservices.speech.*;
    import com.microsoft.cognitiveservices.speech.audio.AudioConfig;
    import com.microsoft.cognitiveservices.speech.translation.*;
    
    import java.util.concurrent.ExecutionException;
    import java.util.concurrent.Future;
    import java.util.Map;
    import java.net.URI; 
    import java.net.URISyntaxException; 
    
    public class SpeechTranslation {
        // This example requires environment variables named "SPEECH_KEY" and "ENDPOINT"
        private static String speechKey = System.getenv("SPEECH_KEY");
        private static String endpoint = System.getenv("ENDPOINT");
    
        public static void main(String[] args) throws InterruptedException, ExecutionException {
            SpeechTranslationConfig speechTranslationConfig;

            try { 
                speechTranslationConfig = SpeechTranslationConfig.fromEndpoint(new URI(endpoint), speechKey); 

            } catch (URISyntaxException e) { 
                throw new IllegalArgumentException("ENDPOINT is not a valid URI: " + endpoint, e); 
            } 
    
            
            speechTranslationConfig.setSpeechRecognitionLanguage("en-US");
    
            String[] toLanguages = { "it" };
            for (String language : toLanguages) {
                speechTranslationConfig.addTargetLanguage(language);
            }
    
            recognizeFromMicrophone(speechTranslationConfig);
        }
    
        public static void recognizeFromMicrophone(SpeechTranslationConfig speechTranslationConfig) throws InterruptedException, ExecutionException {
            AudioConfig audioConfig = AudioConfig.fromDefaultMicrophoneInput();
            TranslationRecognizer translationRecognizer = new TranslationRecognizer(speechTranslationConfig, audioConfig);
    
            System.out.println("Speak into your microphone.");
            Future<TranslationRecognitionResult> task = translationRecognizer.recognizeOnceAsync();
            TranslationRecognitionResult translationRecognitionResult = task.get();
    
            if (translationRecognitionResult.getReason() == ResultReason.TranslatedSpeech) {
                System.out.println("RECOGNIZED: Text=" + translationRecognitionResult.getText());
                for (Map.Entry<String, String> pair : translationRecognitionResult.getTranslations().entrySet()) {
                    System.out.printf("Translated into '%s': %s\n", pair.getKey(), pair.getValue());
                }
            }
            else if (translationRecognitionResult.getReason() == ResultReason.NoMatch) {
                System.out.println("NOMATCH: Speech could not be recognized.");
            }
            else if (translationRecognitionResult.getReason() == ResultReason.Canceled) {
                CancellationDetails cancellation = CancellationDetails.fromResult(translationRecognitionResult);
                System.out.println("CANCELED: Reason=" + cancellation.getReason());
    
                if (cancellation.getReason() == CancellationReason.Error) {
                    System.out.println("CANCELED: ErrorCode=" + cancellation.getErrorCode());
                    System.out.println("CANCELED: ErrorDetails=" + cancellation.getErrorDetails());
                    System.out.println("CANCELED: Did you set the speech resource key and endpoint values?");
                }
            }
    
            System.exit(0);
        }
    }
    ```

1. To change the speech recognition language, replace `en-US` with another [supported language](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/speech-translation-basics/~/articles/ai-services/speech-service/language-support.md?tabs=stt#supported-languages). Specify the full locale with a dash (`-`) separator. For example, `es-ES` for Spanish (Spain). The default language is `en-US` if you don't specify a language. For details about how to identify one of multiple languages that might be spoken, see [language identification](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/speech-translation-basics/~/articles/ai-services/speech-service/language-identification.md). 
1. To change the translation target language, replace `it` with another [supported language](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/speech-translation-basics/~/articles/ai-services/speech-service/language-support.md?tabs=speech-translation#supported-languages). With few exceptions, you only specify the language code that precedes the locale dash (`-`) separator. For example, use `es` for Spanish (Spain) instead of `es-ES`. The default language is `en` if you don't specify a language.

Run your new console application to start speech recognition from a microphone:

```console
javac SpeechTranslation.java -cp ".;target\dependency\*"
java -cp ".;target\dependency\*" SpeechTranslation
```

Speak into your microphone when prompted. What you speak should be output as translated text in the target language:

```console
Speak into your microphone.
RECOGNIZED: Text=I'm excited to try speech translation.
Translated into 'it': Sono entusiasta di provare la traduzione vocale.
```

## Remarks
After completing the quickstart, here are some more considerations:

- This example uses the `RecognizeOnceAsync` operation to transcribe utterances of up to 30 seconds, or until silence is detected. For information about continuous recognition for longer audio, including multi-lingual conversations, see [How to translate speech](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/speech-translation-basics/~/articles/ai-services/speech-service/how-to-translate-speech.md).
- To recognize speech from an audio file, use `fromWavFileInput` instead of `fromDefaultMicrophoneInput`:
    ```java
    AudioConfig audioConfig = AudioConfig.fromWavFileInput("YourAudioFile.wav");
    ```
- For compressed audio files such as MP4, install GStreamer and use `PullAudioInputStream` or `PushAudioInputStream`. For more information, see [How to use compressed input audio](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/speech-translation-basics/~/articles/ai-services/speech-service/how-to-use-codec-compressed-audio-input-streams.md).

## Clean up resources


You can use the [Azure portal](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/common/~/articles/ai-services/multi-service-resource.md?pivots=azportal#clean-up-resources) or [Azure Command Line Interface (CLI)](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/common/~/articles/ai-services/multi-service-resource.md?pivots=azcli#clean-up-resources) to remove the Speech resource you created.




**Applies to: programming-language-cpp**



[Reference documentation](https://learn.microsoft.com/cpp/cognitive-services/speech/) | [Package (NuGet)](https://www.nuget.org/packages/Microsoft.CognitiveServices.Speech) | [Additional samples on GitHub](https://aka.ms/speech/github-cpp)



In this quickstart, you run an application to translate speech from one language to text in another language.

> **Tip:**
> Try out the [Azure Speech in Foundry Tools Toolkit](https://marketplace.visualstudio.com/items?itemName=ms-azureaispeech.azure-ai-speech-toolkit) to easily build and run samples on Visual Studio Code.


## Prerequisites


> 
> - An Azure subscription. You can [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
> - [Create an AI Services resource for Speech](https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry) in the Azure portal.
> - Get the Speech resource key and endpoint. After your Speech resource is deployed, select **Go to resource** to view and manage keys.


## Set up the environment
The Speech SDK is available as a [NuGet package](https://www.nuget.org/packages/Microsoft.CognitiveServices.Speech) and implements .NET Standard 2.0. You install the Speech SDK later in this guide, but first check the [SDK installation guide](quickstarts/setup-platform.md?pivots=programming-language-cpp) for any more requirements

### Set environment variables


You need to authenticate your application to access Foundry Tools. This article shows you how to use environment variables to store your credentials. You can then access the environment variables from your code to authenticate your application. For production, use a more secure way to store and access your credentials.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/get-started-speech-translation.md)

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


## Translate speech from a microphone

Follow these steps to create a new console application and install the Speech SDK.

1. Create a new C++ console project in Visual Studio Community 2022 named `SpeechTranslation`.
1. Install the Speech SDK in your new project with the NuGet package manager.
    ```powershell
    Install-Package Microsoft.CognitiveServices.Speech
    ```
1. Replace the contents of `SpeechTranslation.cpp` with the following code:
    
    ```cpp
    #include <iostream> 
    #include <stdlib.h>
    #include <speechapi_cxx.h>
    
    using namespace Microsoft::CognitiveServices::Speech;
    using namespace Microsoft::CognitiveServices::Speech::Audio;
    using namespace Microsoft::CognitiveServices::Speech::Translation;
    
    std::string GetEnvironmentVariable(const char* name);
    
    int main()
    {
        // This example requires environment variables named "SPEECH_KEY" and "ENDPOINT"
        auto speechKey = GetEnvironmentVariable("SPEECH_KEY");
        auto endpoint = GetEnvironmentVariable("ENDPOINT");

        auto speechTranslationConfig = SpeechTranslationConfig::FromEndpoint(endpoint, speechKey);
        speechTranslationConfig->SetSpeechRecognitionLanguage("en-US");
        speechTranslationConfig->AddTargetLanguage("it");
    
        auto audioConfig = AudioConfig::FromDefaultMicrophoneInput();
        auto translationRecognizer = TranslationRecognizer::FromConfig(speechTranslationConfig, audioConfig);
    
        std::cout << "Speak into your microphone.\n";
        auto result = translationRecognizer->RecognizeOnceAsync().get();
    
        if (result->Reason == ResultReason::TranslatedSpeech)
        {
            std::cout << "RECOGNIZED: Text=" << result->Text << std::endl;
            for (auto pair : result->Translations)
            {
                auto language = pair.first;
                auto translation = pair.second;
                std::cout << "Translated into '" << language << "': " << translation << std::endl;
            }
        }
        else if (result->Reason == ResultReason::NoMatch)
        {
            std::cout << "NOMATCH: Speech could not be recognized." << std::endl;
        }
        else if (result->Reason == ResultReason::Canceled)
        {
            auto cancellation = CancellationDetails::FromResult(result);
            std::cout << "CANCELED: Reason=" << (int)cancellation->Reason << std::endl;
    
            if (cancellation->Reason == CancellationReason::Error)
            {
                std::cout << "CANCELED: ErrorCode=" << (int)cancellation->ErrorCode << std::endl;
                std::cout << "CANCELED: ErrorDetails=" << cancellation->ErrorDetails << std::endl;
                std::cout << "CANCELED: Did you set the speech resource key and endpoint values?" << std::endl;
            }
        }
    }

    std::string GetEnvironmentVariable(const char* name)
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

1. To change the speech recognition language, replace `en-US` with another [supported language](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/speech-translation-basics/~/articles/ai-services/speech-service/language-support.md?tabs=stt#supported-languages). Specify the full locale with a dash (`-`) separator. For example, `es-ES` for Spanish (Spain). The default language is `en-US` if you don't specify a language. For details about how to identify one of multiple languages that might be spoken, see [language identification](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/speech-translation-basics/~/articles/ai-services/speech-service/language-identification.md). 
1. To change the translation target language, replace `it` with another [supported language](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/speech-translation-basics/~/articles/ai-services/speech-service/language-support.md?tabs=speech-translation#supported-languages). With few exceptions, you only specify the language code that precedes the locale dash (`-`) separator. For example, use `es` for Spanish (Spain) instead of `es-ES`. The default language is `en` if you don't specify a language.

To start speech recognition from a microphone, [Build and run](https://learn.microsoft.com/cpp/build/vscpp-step-2-build) your new console application.

Speak into your microphone when prompted. What you speak should be output as translated text in the target language: 

```console
Speak into your microphone.
RECOGNIZED: Text=I'm excited to try speech translation.
Translated into 'it': Sono entusiasta di provare la traduzione vocale.
```

## Remarks
After completing the quickstart, here are some more considerations:

- This example uses the `RecognizeOnceAsync` operation to transcribe utterances of up to 30 seconds, or until silence is detected. For information about continuous recognition for longer audio, including multi-lingual conversations, see [How to translate speech](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/speech-translation-basics/~/articles/ai-services/speech-service/how-to-translate-speech.md). 
- To recognize speech from an audio file, use `FromWavFileInput` instead of `FromDefaultMicrophoneInput`:
    ```cpp
    auto audioInput = AudioConfig::FromWavFileInput("YourAudioFile.wav");
    ```
- For compressed audio files such as MP4, install GStreamer and use `PullAudioInputStream` or `PushAudioInputStream`. For more information, see [How to use compressed input audio](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/speech-translation-basics/~/articles/ai-services/speech-service/how-to-use-codec-compressed-audio-input-streams.md).

## Clean up resources


You can use the [Azure portal](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/common/~/articles/ai-services/multi-service-resource.md?pivots=azportal#clean-up-resources) or [Azure Command Line Interface (CLI)](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/common/~/articles/ai-services/multi-service-resource.md?pivots=azcli#clean-up-resources) to remove the Speech resource you created.




**Applies to: programming-language-go**



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

Before you can use the Speech SDK for Go, install the Speech SDK native library. See the [installation guide](quickstarts/setup-platform.md?pivots=programming-language-go) for more information.

### Set environment variables


You need to authenticate your application to access Foundry Tools. This article shows you how to use environment variables to store your credentials. You can then access the environment variables from your code to authenticate your application. For production, use a more secure way to store and access your credentials. 

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/get-started-speech-translation.md)

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

1. To change the speech recognition language, replace `en-US` with another [supported language](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/speech-translation-basics/~/articles/ai-services/speech-service/language-support.md?tabs=stt#supported-languages). Specify the full locale with a dash (`-`) separator. For example, `es-ES` for Spanish (Spain). The default language is `en-US` if you don't specify a language. For details about how to identify one of multiple languages that might be spoken, see [language identification](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/speech-translation-basics/~/articles/ai-services/speech-service/language-identification.md).
1. To change the translation target language, replace `it` with another [supported language](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/speech-translation-basics/~/articles/ai-services/speech-service/language-support.md?tabs=speech-translation#supported-languages). With few exceptions, you only specify the language code that precedes the locale dash (`-`) separator. For example, use `es` for Spanish (Spain) instead of `es-ES`. The default language is `en` if you don't specify a language.

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

- This example uses the `RecognizeOnceAsync` operation to transcribe utterances of up to 30 seconds, or until silence is detected. For information about continuous recognition for longer audio, including multi-lingual conversations, see [How to translate speech](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/speech-translation-basics/~/articles/ai-services/speech-service/how-to-translate-speech.md).
- To recognize speech from an audio file, use `NewAudioConfigFromWavFileInput` instead of `NewAudioConfigFromDefaultMicrophoneInput`:
    ```go
    audioConfig, err := audio.NewAudioConfigFromWavFileInput("YourAudioFile.wav")
    ```
- For compressed audio files such as MP4, install GStreamer and use `CreatePullStream` or `CreatePushStream`. For more information, see [How to use compressed input audio](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/speech-translation-basics/~/articles/ai-services/speech-service/how-to-use-codec-compressed-audio-input-streams.md).

## Clean up resources


You can use the [Azure portal](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/common/~/articles/ai-services/multi-service-resource.md?pivots=azportal#clean-up-resources) or [Azure Command Line Interface (CLI)](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/common/~/articles/ai-services/multi-service-resource.md?pivots=azcli#clean-up-resources) to remove the Speech resource you created.




**Applies to: programming-language-objectivec**



[Reference documentation](https://learn.microsoft.com/objectivec/cognitive-services/speech/) | [Package (download)](https://aka.ms/csspeech/macosbinary) | [Additional samples on GitHub](https://aka.ms/speech/github-objective-c)


## Availability

The Speech SDK for Objective-C does support speech translation, but we haven't yet included a guide here. Please select another programming language to get started and learn about the concepts, or see the Objective-C reference and samples linked from the beginning of this article. 



**Applies to: programming-language-swift**



[Reference documentation](https://learn.microsoft.com/objectivec/cognitive-services/speech/) | [Package (download)](https://aka.ms/csspeech/macosbinary) | [Additional samples on GitHub](https://aka.ms/speech/github-objective-c)


## Availability

The Speech SDK for Swift does support speech translation, but we haven't yet included a guide here. Please select another programming language to get started and learn about the concepts, or see the Swift reference and samples linked from the beginning of this article. 



**Applies to: programming-language-typescript**



[Reference documentation](https://learn.microsoft.com/javascript/api/microsoft-cognitiveservices-speech-sdk/) | [Package (npm)](https://www.npmjs.com/package/microsoft-cognitiveservices-speech-sdk) | [Additional samples on GitHub](https://aka.ms/speech/github-javascript) | [Library source code](https://github.com/Microsoft/cognitive-services-speech-sdk-js)



In this quickstart, you run an application to translate speech from one language to text in another language.

> **Tip:**
> Try out the [Azure Speech in Foundry Tools Toolkit](https://marketplace.visualstudio.com/items?itemName=ms-azureaispeech.azure-ai-speech-toolkit) to easily build and run samples on Visual Studio Code.


## Prerequisites


> 
> - An Azure subscription. You can [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
> - [Create a Foundry resource for Speech](https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry) in the Azure portal.
> - Get the Speech resource key and region. After your Speech resource is deployed, select **Go to resource** to view and manage keys.


## Set up the environment

1. Create a new folder `translation-quickstart` and go to the quickstart folder with the following command:

    ```shell
    mkdir translation-quickstart && cd translation-quickstart
    ```
    
1. Create the `package.json` with the following command:

    ```shell
    npm init -y
    ```

1. Update the `package.json` to ECMAScript with the following command:
    ```shell
    npm pkg set type=module
    ```

1. Install the Speech SDK for JavaScript with:

    ```console
    npm install microsoft-cognitiveservices-speech-sdk
    ```

1. You need to install the Node.js type definitions to avoid TypeScript errors. Run the following command:

    ```shell
    npm install --save-dev @types/node
    ```

### Retrieve resource information


You need to authenticate your application to access Foundry Tools. This article shows you how to use environment variables to store your credentials. You can then access the environment variables from your code to authenticate your application. For production, use a more secure way to store and access your credentials. 

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/get-started-speech-translation.md)

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


## Translate speech from a file 

To translate speech from a file:

1. Create a new file named *translation.ts* with the following content:

    ```typescript
    import { readFileSync } from "fs";
    import { 
        SpeechTranslationConfig, 
        AudioConfig, 
        TranslationRecognizer, 
        ResultReason, 
        CancellationDetails, 
        CancellationReason,
        TranslationRecognitionResult 
    } from "microsoft-cognitiveservices-speech-sdk";
    
    // This example requires environment variables named "ENDPOINT" and "SPEECH_KEY"
    const speechTranslationConfig: SpeechTranslationConfig = SpeechTranslationConfig.fromEndpoint(new URL(process.env.ENDPOINT!), process.env.SPEECH_KEY!);
    speechTranslationConfig.speechRecognitionLanguage = "en-US";
    
    const language = "it";
    speechTranslationConfig.addTargetLanguage(language);
    
    function fromFile(): void {
        const audioConfig: AudioConfig = AudioConfig.fromWavFileInput(readFileSync("YourAudioFile.wav"));
        const translationRecognizer: TranslationRecognizer = new TranslationRecognizer(speechTranslationConfig, audioConfig);
    
        translationRecognizer.recognizeOnceAsync((result: TranslationRecognitionResult) => {
            switch (result.reason) {
                case ResultReason.TranslatedSpeech:
                    console.log(`RECOGNIZED: Text=${result.text}`);
                    console.log("Translated into [" + language + "]: " + result.translations.get(language));
    
                    break;
                case ResultReason.NoMatch:
                    console.log("NOMATCH: Speech could not be recognized.");
                    break;
                case ResultReason.Canceled:
                    const cancellation: CancellationDetails = CancellationDetails.fromResult(result);
                    console.log(`CANCELED: Reason=${cancellation.reason}`);
    
                    if (cancellation.reason === CancellationReason.Error) {
                        console.log(`CANCELED: ErrorCode=${cancellation.ErrorCode}`);
                        console.log(`CANCELED: ErrorDetails=${cancellation.errorDetails}`);
                        console.log("CANCELED: Did you set the speech resource key and endpoint values?");
                    }
                    break;
            }
            translationRecognizer.close();
        });
    }
    fromFile();
    ```

    - In `translation.ts`, replace `YourAudioFile.wav` with your own WAV file. This example only recognizes speech from a WAV file. For information about other audio formats, see [How to use compressed input audio](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/speech-translation-basics/~/articles/ai-services/speech-service/how-to-use-codec-compressed-audio-input-streams.md). This example supports up to 30 seconds audio.

    - To change the speech recognition language, replace `en-US` with another [supported language](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/speech-translation-basics/~/articles/ai-services/speech-service/language-support.md?tabs=stt#supported-languages). Specify the full locale with a dash (`-`) separator. For example, `es-ES` for Spanish (Spain). The default language is `en-US` if you don't specify a language. For details about how to identify one of multiple languages that might be spoken, see [language identification](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/speech-translation-basics/~/articles/ai-services/speech-service/language-identification.md).

    - To change the translation target language, replace `it` with another [supported language](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/speech-translation-basics/~/articles/ai-services/speech-service/language-support.md?tabs=speech-translation#supported-languages). With few exceptions you only specify the language code that precedes the locale dash (`-`) separator. For example, use `es` for Spanish (Spain) instead of `es-ES`. The default language is `en` if you don't specify a language.

1. Create the `tsconfig.json` file to transpile the TypeScript code and copy the following code for ECMAScript.

    ```json
    {
        "compilerOptions": {
          "module": "NodeNext",
          "target": "ES2022", // Supports top-level await
          "moduleResolution": "NodeNext",
          "skipLibCheck": true, // Avoid type errors from node_modules
          "strict": true // Enable strict type-checking options
        },
        "include": ["*.ts"]
    }
    ```

1. Transpile from TypeScript to JavaScript.

    ```shell
    tsc
    ```

    This command should produce no output if successful.

1. Run your new console application to start speech recognition from a file:

    ```console
    node translation.js
    ```

## Output 

The speech from the audio file should be output as translated text in the target language:

```console
RECOGNIZED: Text=I'm excited to try speech translation.
Translated into [it]: Sono entusiasta di provare la traduzione vocale.
```

## Remarks

Now that you've completed the quickstart, here are some additional considerations:

This example uses the `recognizeOnceAsync` operation to transcribe utterances of up to 30 seconds, or until silence is detected. For information about continuous recognition for longer audio, including multi-lingual conversations, see [How to translate speech](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/speech-translation-basics/~/articles/ai-services/speech-service/how-to-translate-speech.md).

> **Note:**
> Recognizing speech from a microphone is not supported in Node.js. It's supported only in a browser-based JavaScript environment. 

## Clean up resources


You can use the [Azure portal](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/common/~/articles/ai-services/multi-service-resource.md?pivots=azportal#clean-up-resources) or [Azure Command Line Interface (CLI)](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/common/~/articles/ai-services/multi-service-resource.md?pivots=azcli#clean-up-resources) to remove the Speech resource you created.





## Next steps

> 
> [Learn more about speech translation](how-to-translate-speech.md)
