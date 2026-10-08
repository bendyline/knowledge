---
author: PatrickFarley
ms.service: azure-speech-foundry-tools
ms.topic: include
ms.date: 9/5/2024
ms.author: pafarley
---


[Reference documentation](https://learn.microsoft.com/dotnet/api/microsoft.cognitiveservices.speech) | [Package (NuGet)](https://www.nuget.org/packages/Microsoft.CognitiveServices.Speech) | [Additional samples on GitHub](https://aka.ms/speech/github-csharp)



In this how-to guide, you can use Azure Speech in Foundry Tools to converse with Azure OpenAI in Microsoft Foundry Models. The text recognized by the Speech service is sent to Azure OpenAI. The Speech service synthesizes speech from the text response from Azure OpenAI.

Speak into the microphone to start a conversation with Azure OpenAI.

- The Speech service recognizes your speech and converts it into text (speech to text).
- Your request as text is sent to Azure OpenAI.
- The Speech service text to speech feature synthesizes the response from Azure OpenAI to the default speaker.

Although the experience of this example is a back-and-forth exchange, Azure OpenAI doesn't remember the context of your conversation.



## Prerequisites


> 
> * Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
> * [Create a Microsoft Azure OpenAI in Microsoft Foundry Models resource](https://portal.azure.com/#create/Microsoft.CognitiveServicesOpenAI) in the Azure portal. 
> * Deploy a [model](https://learn.microsoft.com/azure/ai-foundry/openai/concepts/models) in your Azure OpenAI resource. For more information about model deployment, see the Azure OpenAI [resource deployment guide](https://learn.microsoft.com/azure/ai-foundry/openai/how-to/create-resource).
> * Get the Azure OpenAI resource key and endpoint. After your Azure OpenAI resource is deployed, select **Go to resource** to view and manage keys. 
> * [Create a Foundry resource for Speech](https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry) in the Azure portal.
> * Get the Speech resource key and region. After your Speech resource is deployed, select **Go to resource** to view and manage keys. 



## Set up the environment

The Speech SDK is available as a [NuGet package](https://www.nuget.org/packages/Microsoft.CognitiveServices.Speech) and implements .NET Standard 2.0. You install the Speech SDK later in this guide, but first check the [SDK installation guide](../../../quickstarts/setup-platform.md?pivots=programming-language-csharp) for any more requirements.

### Set environment variables

This example requires environment variables named `AZURE_OPENAI_API_KEY`, `AZURE_OPENAI_ENDPOINT`, `AZURE_OPENAI_CHAT_DEPLOYMENT`, `SPEECH_KEY`, and `SPEECH_REGION`.


Your application must be authenticated to access Microsoft Foundry resources. This article shows you how to use environment variables to store your credentials. You can then access the environment variables from your code to authenticate your application. For production, use a more secure way to store and access your credentials. 

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/openai-speech/csharp.md)

To set the environment variables, open a console window, and follow the instructions for your operating system and development environment.

- To set the `AZURE_OPENAI_API_KEY` environment variable, replace `your-openai-key` with one of the keys for your resource.
- To set the `AZURE_OPENAI_ENDPOINT` environment variable, replace `your-openai-endpoint` with one of the regions for your resource.
- To set the `AZURE_OPENAI_CHAT_DEPLOYMENT` environment variable, replace `your-openai-deployment-name` with one of the regions for your resource.
- To set the `SPEECH_KEY` environment variable, replace `your-speech-key` with one of the keys for your resource.
- To set the `SPEECH_REGION` environment variable, replace `your-speech-region` with one of the regions for your resource.

#### [Windows](#tab/windows)

```console
setx AZURE_OPENAI_API_KEY your-openai-key
setx AZURE_OPENAI_ENDPOINT your-openai-endpoint
setx AZURE_OPENAI_CHAT_DEPLOYMENT your-openai-deployment-name
setx SPEECH_KEY your-speech-key
setx SPEECH_REGION your-speech-region
```

> **Note:**
> If you only need to access the environment variable in the current running console, set the environment variable with `set` instead of `setx`.

After you add the environment variables, you might need to restart any running programs that need to read the environment variable, including the console window. For example, if Visual Studio is your editor, restart Visual Studio before running the example.

#### [Linux](#tab/linux)

```bash
export AZURE_OPENAI_API_KEY=your-openai-key
export AZURE_OPENAI_ENDPOINT=your-openai-endpoint
export AZURE_OPENAI_CHAT_DEPLOYMENT=your-openai-deployment-name
export SPEECH_KEY=your-speech-key
export SPEECH_REGION=your-speech-region
```

After you add the environment variables, run `source ~/.bashrc` from your console window to make the changes effective.

#### [macOS](#tab/macos)
##### Bash

Edit your *.bash_profile*, and add the environment variables:

```bash
export AZURE_OPENAI_API_KEY=your-openai-key
export AZURE_OPENAI_ENDPOINT=your-openai-endpoint
export AZURE_OPENAI_CHAT_DEPLOYMENT=your-openai-deployment-name # For example, "gpt-4o-mini"
export SPEECH_KEY=your-speech-key
export SPEECH_REGION=your-speech-region
```

After you add the environment variables, run `source ~/.bash_profile` from your console window to make the changes effective.

##### Xcode

For iOS and macOS development, set the environment variables in Xcode. For example, follow these steps to set the environment variable in Xcode 13.4.1.

1. Select **Product** > **Scheme** > **Edit scheme**.
1. Select **Arguments** on the **Run** (Debug Run) page.
1. Under **Environment Variables** select the plus (+) sign to add a new environment variable.
1. Enter `SPEECH_KEY` for the **Name** and enter your Speech resource key for the **Value**.

Repeat the steps to set other required environment variables.

For more configuration options, see the [Xcode documentation](https://help.apple.com/xcode/#/dev745c5c974).
***


## Recognize speech from a microphone

Follow these steps to create a new console application.

1. Open a command prompt window in the folder where you want the new project. Run this command to create a console application with the .NET CLI.

    ```dotnetcli
    dotnet new console
    ```

    The command creates a *Program.cs* file in the project directory.

1. Install the Speech SDK in your new project with the .NET CLI.

    ```dotnetcli
    dotnet add package Microsoft.CognitiveServices.Speech
    ```

1. Install the Azure OpenAI SDK (prerelease) in your new project with the .NET CLI.

    ```dotnetcli
    dotnet add package Azure.AI.OpenAI --prerelease 
    ```

1. Replace the contents of `Program.cs` with the following code.

    ```csharp
    using System.Text;
    using Microsoft.CognitiveServices.Speech;
    using Microsoft.CognitiveServices.Speech.Audio;
    using Azure;
    using Azure.AI.OpenAI;

    // This example requires environment variables named "AZURE_OPENAI_API_KEY", "AZURE_OPENAI_ENDPOINT" and "AZURE_OPENAI_CHAT_DEPLOYMENT"
    // Your endpoint should look like the following https://YOUR_OPEN_AI_RESOURCE_NAME.openai.azure.com/
    string openAIKey = Environment.GetEnvironmentVariable("AZURE_OPENAI_API_KEY") ??
                       throw new ArgumentException("Missing AZURE_OPENAI_API_KEY");
    string openAIEndpoint = Environment.GetEnvironmentVariable("AZURE_OPENAI_ENDPOINT") ??
                            throw new ArgumentException("Missing AZURE_OPENAI_ENDPOINT");

    // Enter the deployment name you chose when you deployed the model.
    string engine = Environment.GetEnvironmentVariable("AZURE_OPENAI_CHAT_DEPLOYMENT") ??
                    throw new ArgumentException("Missing AZURE_OPENAI_CHAT_DEPLOYMENT");

    // This example requires environment variables named "SPEECH_KEY" and "SPEECH_REGION"
    string speechKey = Environment.GetEnvironmentVariable("SPEECH_KEY") ??
                       throw new ArgumentException("Missing SPEECH_KEY");
    string speechRegion = Environment.GetEnvironmentVariable("SPEECH_REGION") ??
                          throw new ArgumentException("Missing SPEECH_REGION");

    // Sentence end symbols for splitting the response into sentences.
    List<string> sentenceSaperators = new() { ".", "!", "?", ";", "。", "！", "？", "；", "\n" };

    try
    {
        await ChatWithAzureOpenAI();
    }
    catch (Exception ex)
    {
        Console.WriteLine(ex);
    }

    // Prompts Azure OpenAI with a request and synthesizes the response.
    async Task AskAzureOpenAI(string prompt)
    {
        object consoleLock = new();
        var speechConfig = SpeechConfig.FromSubscription(speechKey, speechRegion);

        // The language of the voice that speaks.
        speechConfig.SpeechSynthesisVoiceName = "en-US-JennyMultilingualNeural";
        var audioOutputConfig = AudioConfig.FromDefaultSpeakerOutput();
        using var speechSynthesizer = new SpeechSynthesizer(speechConfig, audioOutputConfig);
        speechSynthesizer.Synthesizing += (sender, args) =>
        {
            lock (consoleLock)
            {
                Console.ForegroundColor = ConsoleColor.Yellow;
                Console.Write($"[Audio]");
                Console.ResetColor();
            }
        };

        // Ask Azure OpenAI
        OpenAIClient client = new(new Uri(openAIEndpoint), new AzureKeyCredential(openAIKey));
        var completionsOptions = new ChatCompletionsOptions()
        {
            DeploymentName = engine,
            Messages = { new ChatRequestUserMessage(prompt) },
            MaxTokens = 100,
        };
        var responseStream = await client.GetChatCompletionsStreamingAsync(completionsOptions);

        StringBuilder gptBuffer = new();
        await foreach (var completionUpdate in responseStream)
        {
            var message = completionUpdate.ContentUpdate;
            if (string.IsNullOrEmpty(message))
            {
                continue;
            }

            lock (consoleLock)
            {
                Console.ForegroundColor = ConsoleColor.DarkBlue;
                Console.Write($"{message}");
                Console.ResetColor();
            }

            gptBuffer.Append(message);

            if (sentenceSaperators.Any(message.Contains))
            {
                var sentence = gptBuffer.ToString().Trim();
                if (!string.IsNullOrEmpty(sentence))
                {
                    await speechSynthesizer.SpeakTextAsync(sentence);
                    gptBuffer.Clear();
                }
            }
        }
    }

    // Continuously listens for speech input to recognize and send as text to Azure OpenAI
    async Task ChatWithAzureOpenAI()
    {
        // Should be the locale for the speaker's language.
        var speechConfig = SpeechConfig.FromSubscription(speechKey, speechRegion);
        speechConfig.SpeechRecognitionLanguage = "en-US";

        using var audioConfig = AudioConfig.FromDefaultMicrophoneInput();
        using var speechRecognizer = new SpeechRecognizer(speechConfig, audioConfig);
        var conversationEnded = false;

        while (!conversationEnded)
        {
            Console.WriteLine("Azure OpenAI is listening. Say 'Stop' or press Ctrl-Z to end the conversation.");

            // Get audio from the microphone and then send it to the TTS service.
            var speechRecognitionResult = await speechRecognizer.RecognizeOnceAsync();

            switch (speechRecognitionResult.Reason)
            {
                case ResultReason.RecognizedSpeech:
                    if (speechRecognitionResult.Text == "Stop.")
                    {
                        Console.WriteLine("Conversation ended.");
                        conversationEnded = true;
                    }
                    else
                    {
                        Console.WriteLine($"Recognized speech: {speechRecognitionResult.Text}");
                        await AskAzureOpenAI(speechRecognitionResult.Text);
                    }

                    break;
                case ResultReason.NoMatch:
                    Console.WriteLine($"No speech could be recognized: ");
                    break;
                case ResultReason.Canceled:
                    var cancellationDetails = CancellationDetails.FromResult(speechRecognitionResult);
                    Console.WriteLine($"Speech Recognition canceled: {cancellationDetails.Reason}");
                    if (cancellationDetails.Reason == CancellationReason.Error)
                    {
                        Console.WriteLine($"Error details={cancellationDetails.ErrorDetails}");
                    }

                    break;
            }
        }
    }
    ```

1. To increase or decrease the number of tokens returned by Azure OpenAI, change the `MaxTokens` property in the `ChatCompletionsOptions` class instance. For more information tokens and cost implications, see [Azure OpenAI tokens](https://learn.microsoft.com/azure/ai-foundry/openai/overview#tokens) and [Azure OpenAI pricing](https://azure.microsoft.com/pricing/details/cognitive-services/openai-service/).

1. Run your new console application to start speech recognition from a microphone:

    ```console
    dotnet run
    ```

> **Important:**
> Make sure that you set the `AZURE_OPENAI_API_KEY`, `AZURE_OPENAI_ENDPOINT`, `AZURE_OPENAI_CHAT_DEPLOYMENT`, `SPEECH_KEY` and `SPEECH_REGION` [environment variables](#set-environment-variables) as described. If you don't set these variables, the sample will fail with an error message.

Speak into your microphone when prompted. The console output includes the prompt for you to begin speaking, then your request as text, and then the response from Azure OpenAI as text. The response from Azure OpenAI should be converted from text to speech and then output to the default speaker.

```console
PS C:\dev\openai\csharp> dotnet run
Azure OpenAI is listening. Say 'Stop' or press Ctrl-Z to end the conversation.
Recognized speech:Make a comma separated list of all continents.
Azure OpenAI response:Africa, Antarctica, Asia, Australia, Europe, North America, South America
Speech synthesized to speaker for text [Africa, Antarctica, Asia, Australia, Europe, North America, South America]
Azure OpenAI is listening. Say 'Stop' or press Ctrl-Z to end the conversation.
Recognized speech: Make a comma separated list of 1 Astronomical observatory for each continent. A list should include each continent name in parentheses.
Azure OpenAI response:Mauna Kea Observatories (North America), La Silla Observatory (South America), Tenerife Observatory (Europe), Siding Spring Observatory (Australia), Beijing Xinglong Observatory (Asia), Naukluft Plateau Observatory (Africa), Rutherford Appleton Laboratory (Antarctica)
Speech synthesized to speaker for text [Mauna Kea Observatories (North America), La Silla Observatory (South America), Tenerife Observatory (Europe), Siding Spring Observatory (Australia), Beijing Xinglong Observatory (Asia), Naukluft Plateau Observatory (Africa), Rutherford Appleton Laboratory (Antarctica)]
Azure OpenAI is listening. Say 'Stop' or press Ctrl-Z to end the conversation.
Conversation ended.
PS C:\dev\openai\csharp>
```

## Remarks

Here are some more considerations:

- To change the speech recognition language, replace `en-US` with another [supported language](../../../language-support.md?tabs=tts). For example, `es-ES` for Spanish (Spain). The default language is `en-US`. For details about how to identify one of multiple languages that might be spoken, see [language identification](../../../language-identification.md).
- To change the voice that you hear, replace `en-US-JennyMultilingualNeural` with another [supported voice](../../../language-support.md?tabs=tts#standard-voices). If the voice doesn't speak the language of the text returned from Azure OpenAI, the Speech service doesn't output synthesized audio.
- To reduce latency for text to speech output, use the text streaming feature, which enables real-time text processing for fast audio generation and minimizes latency, enhancing the fluidity and responsiveness of real-time audio outputs. Refer to [how to use text streaming](../../../how-to-lower-speech-synthesis-latency.md#input-text-streaming).
- To enable [TTS Avatar](../../../text-to-speech-avatar/what-is-text-to-speech-avatar.md) as a visual experience of speech output, refer to [real-time synthesis for text to speech avatar](../../../text-to-speech-avatar/real-time-synthesis-avatar.md) and [sample code](https://github.com/Azure-Samples/cognitive-services-speech-sdk/tree/master/samples/js/browser/avatar#chat-sample) for chat scenario with avatar.
- Azure OpenAI also performs content moderation on the prompt inputs and generated outputs. The prompts or responses might be filtered if harmful content is detected. For more information, see the [content filtering](https://learn.microsoft.com/azure/ai-foundry/openai/concepts/content-filter) article.

## Clean up resources


You can use the [Azure portal](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/common/~/articles/ai-services/multi-service-resource.md?pivots=azportal#clean-up-resources) or [Azure Command Line Interface (CLI)](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/common/~/articles/ai-services/multi-service-resource.md?pivots=azcli#clean-up-resources) to remove the Speech resource you created.
