---
author: PatrickFarley
ms.service: azure-speech-foundry-tools
ms.topic: include
ms.date: 1/29/2026
ms.author: pafarley
ai-usage: ai-assisted
---


[Reference documentation](https://learn.microsoft.com/dotnet/api/microsoft.cognitiveservices.speech) | [Package (NuGet)](https://www.nuget.org/packages/Microsoft.CognitiveServices.Speech) | [Additional samples on GitHub](https://aka.ms/speech/github-csharp)



With Azure Speech in Foundry Tools, you can run an application that synthesizes a human-like voice to read text. You can change the voice, enter text to be spoken, and listen to the output on your computer's speaker.

> **Tip:**
> You can try text to speech in the [Speech Studio Voice Gallery](https://aka.ms/speechstudio/voicegallery) without signing up or writing any code.

> **Tip:**
> Try out the [Azure Speech Toolkit](https://marketplace.visualstudio.com/items?itemName=ms-azureaispeech.azure-ai-speech-toolkit) to easily build and run samples on Visual Studio Code.


## Prerequisites


> 
> - An Azure subscription. You can [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
> - [Create an AI Services resource for Speech](https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry) in the Azure portal.
> - Get the Speech resource key and endpoint. After your Speech resource is deployed, select **Go to resource** to view and manage keys.


## Set up the environment

The Speech SDK is available as a [NuGet package](https://www.nuget.org/packages/Microsoft.CognitiveServices.Speech) that implements .NET Standard 2.0. Install the Speech SDK later in this guide by using the console. For detailed installation instructions, see [Install the Speech SDK](../../../quickstarts/setup-platform.md?pivots=programming-language-csharp).

### Set environment variables


You need to authenticate your application to access Foundry Tools. This article shows you how to use environment variables to store your credentials. You can then access the environment variables from your code to authenticate your application. For production, use a more secure way to store and access your credentials.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/text-to-speech-basics/csharp.md)

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


## Create the application

Follow these steps to create a console application and install the Speech SDK.

1. Open a command prompt window in the folder where you want the new project. Run this command to create a console application with the .NET CLI.

   ```dotnetcli
   dotnet new console
   ```

   The command creates a *Program.cs* file in the project directory.

1. Install the Speech SDK in your new project with the .NET CLI.

   ```dotnetcli
   dotnet add package Microsoft.CognitiveServices.Speech
   ```

1. Replace the contents of *Program.cs* with the following code.

    ```csharp
    using System;
    using System.IO;
    using System.Threading.Tasks;
    using Microsoft.CognitiveServices.Speech;
    using Microsoft.CognitiveServices.Speech.Audio;
        
    class Program 
    {
        static void OutputSpeechSynthesisResult(SpeechSynthesisResult speechSynthesisResult, string text)
        {
            switch (speechSynthesisResult.Reason)
            {
                case ResultReason.SynthesizingAudioCompleted:
                    Console.WriteLine($"Speech synthesized for text: [{text}]");
                    break;
                case ResultReason.Canceled:
                    var cancellation = SpeechSynthesisCancellationDetails.FromResult(speechSynthesisResult);
                    Console.WriteLine($"CANCELED: Reason={cancellation.Reason}");
    
                    if (cancellation.Reason == CancellationReason.Error)
                    {
                        Console.WriteLine($"CANCELED: ErrorCode={cancellation.ErrorCode}");
                        Console.WriteLine($"CANCELED: ErrorDetails=[{cancellation.ErrorDetails}]");
                        Console.WriteLine($"CANCELED: Did you set the speech resource key and endpoint values?");
                    }
                    break;
                default:
                    break;
            }
        }
    
        async static Task Main(string[] args)
        {
            // This example requires environment variables named "SPEECH_KEY" and "ENDPOINT"
            string speechKey = Environment.GetEnvironmentVariable("SPEECH_KEY") 
                ?? throw new InvalidOperationException("Set the SPEECH_KEY environment variable.");
            string endpoint = Environment.GetEnvironmentVariable("ENDPOINT") 
                ?? throw new InvalidOperationException("Set the ENDPOINT environment variable.");

            var speechConfig = SpeechConfig.FromEndpoint(new Uri(endpoint), speechKey); 
    
            // The neural multilingual voice can speak different languages based on the input text.
            speechConfig.SpeechSynthesisVoiceName = "en-US-Ava:DragonHDLatestNeural"; 
    
            using (var speechSynthesizer = new SpeechSynthesizer(speechConfig))
            {
                // Get text from the console and synthesize to the default speaker.
                Console.WriteLine("Enter some text that you want to speak >");
                string text = Console.ReadLine();
    
                var speechSynthesisResult = await speechSynthesizer.SpeakTextAsync(text);
                OutputSpeechSynthesisResult(speechSynthesisResult, text);
            }
    
            Console.WriteLine("Press any key to exit...");
            Console.ReadKey();
        }
    }
    ```

1. To change the speech synthesis language, replace `en-US-Ava:DragonHDLatestNeural` with another [supported voice](../../../language-support.md#standard-voices).

   All neural voices are multilingual and fluent in their own language and English. For example, if the input text in English is *I'm excited to try text to speech* and you set `es-ES-Ximena:DragonHDLatestNeural` as the language, the text is spoken in English with a Spanish accent. If the voice doesn't speak the language of the input text, the Speech service doesn't output synthesized audio.

1. Run your new console application to start speech synthesis to the default speaker.

   ```console
   dotnet run
   ```

   > **Important:**
   > Make sure that you set the `SPEECH_KEY` and `ENDPOINT` [environment variables](#set-environment-variables). If you don't set these variables, the sample fails with an error message.

1. Enter some text that you want to speak. For example, type *I'm excited to try text to speech*. Select the **Enter** key to hear the synthesized speech.

   ```console
   Enter some text that you want to speak >
   I'm excited to try text to speech
   ```

## Remarks

### Choose a voice name

Voice names follow the format `{locale}-{VoiceName}:{VoiceType}`, where:
- **locale** identifies the voice's primary language and region (for example, `en-US` for US English, `es-ES` for Spanish)
- **VoiceName** is the unique identifier for that voice (for example, `Ava`, `Andrew`)
- **VoiceType** indicates the voice technology (for example, `DragonHDLatestNeural` for HD neural voices, `MultilingualNeural` for multilingual voices)

To find available voices:
- Browse the [Voice Gallery](https://speech.microsoft.com/portal/voicegallery) to preview voices interactively
- See the [full list of supported voices](../../../language-support.md?tabs=tts) for all available options
- Call the [Voice List API](../../../rest-text-to-speech.md#get-a-list-of-voices) to retrieve voices programmatically

### Save audio to a file

To save synthesized speech to a WAV file instead of playing it to the speaker, use `AudioConfig.FromWavFileOutput()`:

```csharp
// Save to a WAV file instead of playing to speaker
using var audioConfig = AudioConfig.FromWavFileOutput("output.wav");
using var speechSynthesizer = new SpeechSynthesizer(speechConfig, audioConfig);
await speechSynthesizer.SpeakTextAsync("Hello, world!");
```

To get the audio data as bytes for custom processing (such as streaming or format conversion), pass `null` for `audioConfig` and access the result's `AudioData` property:

```csharp
// Get audio data as bytes
using var speechSynthesizer = new SpeechSynthesizer(speechConfig, null);
var result = await speechSynthesizer.SpeakTextAsync("Hello, world!");
byte[] audioBytes = result.AudioData;  // Raw audio bytes
```

### More speech synthesis options

This quickstart uses the `SpeakTextAsync` operation to synthesize a short block of text that you enter. You can also use long-form text from a file and get finer control over voice styles, prosody, and other settings.

- See [how to synthesize speech](../../../how-to-speech-synthesis.md) and [Speech Synthesis Markup Language (SSML) overview](../../../speech-synthesis-markup.md) for information about speech synthesis from a file and finer control over voice styles, prosody, and other settings.
- See [batch synthesis API for text to speech](../../../batch-synthesis.md) for information about synthesizing long-form text to speech.

### OpenAI text to speech voices in Azure Speech in Foundry Tools

OpenAI text to speech voices are also supported. See [OpenAI text to speech voices in Azure Speech](../../../openai-voices.md) and [multilingual voices](../../../language-support.md?tabs=tts#multilingual-voices). You can replace `en-US-Ava:DragonHDLatestNeural` with a supported OpenAI voice name such as `en-US-FableMultilingualNeural`.

## Clean up resources


You can use the [Azure portal](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/common/~/articles/ai-services/multi-service-resource.md?pivots=azportal#clean-up-resources) or [Azure Command Line Interface (CLI)](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/common/~/articles/ai-services/multi-service-resource.md?pivots=azcli#clean-up-resources) to remove the Speech resource you created.
