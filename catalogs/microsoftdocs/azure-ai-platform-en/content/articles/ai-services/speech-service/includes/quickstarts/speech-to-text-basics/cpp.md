---
author: PatrickFarley
ms.service: azure-speech-foundry-tools
ms.topic: include
ms.date: 7/16/2025
ms.author: pafarley
---


[Reference documentation](https://learn.microsoft.com/cpp/cognitive-services/speech/) | [Package (NuGet)](https://www.nuget.org/packages/Microsoft.CognitiveServices.Speech) | [Additional samples on GitHub](https://aka.ms/speech/github-cpp)



In this quickstart, you create and run an application to recognize and transcribe speech to text in real-time. 

> **Tip:**
> For fast transcription of audio files, consider using the [fast transcription API.](https://learn.microsoft.com/azure/ai-services/speech-service/fast-transcription-create) Fast transcription API supports features such as language identification and diarization. 

To instead transcribe audio files asynchronously, see [What is batch transcription](../../../batch-transcription.md). If you're not sure which speech to text solution is right for you, see [What is speech to text?](../../../speech-to-text.md)


## Prerequisites


> 
> - An Azure subscription. You can [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
> - [Create an AI Services resource for Speech](https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry) in the Azure portal.
> - Get the Speech resource key and endpoint. After your Speech resource is deployed, select **Go to resource** to view and manage keys.


## Set up the environment

The Speech SDK is available as a [NuGet package](https://www.nuget.org/packages/Microsoft.CognitiveServices.Speech) and implements .NET Standard 2.0. You install the Speech SDK later in this guide. For other requirements, see [Install the Speech SDK](../../../quickstarts/setup-platform.md?pivots=programming-language-cpp).

### Set environment variables


You need to authenticate your application to access Foundry Tools. This article shows you how to use environment variables to store your credentials. You can then access the environment variables from your code to authenticate your application. For production, use a more secure way to store and access your credentials.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/speech-to-text-basics/cpp.md)

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


## Recognize speech from a microphone

> **Tip:**
> Try out the [Azure Speech in Foundry Tools Toolkit](https://marketplace.visualstudio.com/items?itemName=ms-azureaispeech.azure-ai-speech-toolkit) to easily build and run samples on Visual Studio Code.

Follow these steps to create a console application and install the Speech SDK.

1. Create a new C++ console project in [Visual Studio Community](https://visualstudio.microsoft.com/downloads/) named `SpeechRecognition`.

1. Select **Tools** > **Nuget Package Manager** > **Package Manager Console**. In the **Package Manager Console**, run this command:

    ```console
    Install-Package Microsoft.CognitiveServices.Speech
    ```

1. Replace the contents of `SpeechRecognition.cpp` with the following code:

   ```cpp
   #include <iostream> 
   #include <stdlib.h>
   #include <speechapi_cxx.h>
    
   using namespace Microsoft::CognitiveServices::Speech;
   using namespace Microsoft::CognitiveServices::Speech::Audio;
    
   std::string GetEnvironmentVariable(const char* name);
    
   int main()
   {
       // This example requires environment variables named "SPEECH_KEY" and "ENDPOINT"
       auto speechKey = GetEnvironmentVariable("SPEECH_KEY");
       auto endpoint = GetEnvironmentVariable("ENDPOINT");
        
       if (std::string(speechKey).empty() || std::string(endpoint).empty()) {
           std::cout << "Please set both SPEECH_KEY and ENDPOINT environment variables." << std::endl;
           return -1;
       }
    
       auto speechConfig = SpeechConfig::FromEndpoint(endpoint, speechKey);
    
       speechConfig->SetSpeechRecognitionLanguage("en-US");
    
       auto audioConfig = AudioConfig::FromDefaultMicrophoneInput();
       auto speechRecognizer = SpeechRecognizer::FromConfig(speechConfig, audioConfig);
    
       std::cout << "Speak into your microphone.\n";
       auto result = speechRecognizer->RecognizeOnceAsync().get();
    
       if (result->Reason == ResultReason::RecognizedSpeech)
       {
           std::cout << "RECOGNIZED: Text=" << result->Text << std::endl;
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

1. To change the speech recognition language, replace `en-US` with another [supported language](../../../language-support.md). For example, use `es-ES` for Spanish (Spain). If you don't specify a language, the default is `en-US`. For details about how to identify one of multiple languages that might be spoken, see [Language identification](../../../language-identification.md).

1. To start speech recognition from a microphone, [Build and run](https://learn.microsoft.com/cpp/build/vscpp-step-2-build) your new console application.

   > **Important:**
   > Make sure that you set the `SPEECH_KEY` and `ENDPOINT` [environment variables](#set-environment-variables). If you don't set these variables, the sample fails with an error message.

1. Speak into your microphone when prompted. What you speak should appear as text:

   ```output
   Speak into your microphone.
   RECOGNIZED: Text=I'm excited to try speech to text.
   ```

## Remarks

Here are some other considerations:

- This example uses the `RecognizeOnceAsync` operation to transcribe utterances of up to 30 seconds, or until silence is detected. For information about continuous recognition for longer audio, including multi-lingual conversations, see [How to recognize speech](../../../how-to-recognize-speech.md).
- To recognize speech from an audio file, use `FromWavFileInput` instead of `FromDefaultMicrophoneInput`:

  ```cpp
  auto audioConfig = AudioConfig::FromWavFileInput("YourAudioFile.wav");
  ```

- For compressed audio files such as MP4, install GStreamer and use `PullAudioInputStream` or `PushAudioInputStream`. For more information, see [How to use compressed input audio](../../../how-to-use-codec-compressed-audio-input-streams.md).

## Clean up resources


You can use the [Azure portal](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/common/~/articles/ai-services/multi-service-resource.md?pivots=azportal#clean-up-resources) or [Azure Command Line Interface (CLI)](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/common/~/articles/ai-services/multi-service-resource.md?pivots=azcli#clean-up-resources) to remove the Speech resource you created.
