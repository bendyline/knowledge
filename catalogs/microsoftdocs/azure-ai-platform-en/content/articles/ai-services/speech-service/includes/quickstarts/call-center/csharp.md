---
author: PatrickFarley
ms.service: azure-speech-foundry-tools
ms.topic: include
ms.date: 09/18/2022
ms.author: pafarley
ms.devlang: csharp
---


[Language service documentation](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/language-service/index.yml) | [Language Studio](https://aka.ms/LanguageStudio) | [Speech service documentation](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/index.yml) | [Speech Studio](https://aka.ms/SpeechStudio)



In this C# quickstart, you perform sentiment analysis and conversation summarization of [call center](../../../call-center-overview.md) transcriptions. The sample will automatically identify, categorize, and redact sensitive information. The quickstart implements a cross-service scenario that uses features of the [Azure Cognitive Speech](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/index.yml) and [Azure Cognitive Language](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/language-service/index.yml) services.

> **Tip:**
> Try the [Language Studio](https://language.cognitive.azure.com) or [Speech Studio](https://aka.ms/speechstudio/callcenter) for a demonstration on how to use Azure Language and Speech services to analyze call center conversations. 
> 
> To deploy a call center transcription solution to Azure with a no-code approach, try the [Ingestion Client](../../../ingestion-client.md).

The following Foundry Tools for Speech features are used in the quickstart:
- [Batch transcription](../../../batch-transcription.md): Submit a batch of audio files for transcription.
- [Speaker separation](../../../batch-transcription.md): Separate multiple speakers through diarization of mono 16khz 16 bit PCM wav files. 

The Language service offers the following features that are used:

- [Personally Identifiable Information (PII) extraction and redaction](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/language-service/personally-identifiable-information/how-to-call-for-conversations.md): Identify, categorize, and redact sensitive information in conversation transcription.
- [Conversation summarization](../../../../language-service/summarization/overview.md?tabs=conversation-summarization): Summarize in abstract text what each conversation participant said about the issues and resolutions. For example, a call center can group product issues that have a high volume.
- [Sentiment analysis and opinion mining](../../../../language-service/sentiment-opinion-mining/overview.md): Analyze transcriptions and associate positive, neutral, or negative sentiment at the utterance and conversation-level.


## Prerequisites


> 
> * Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
> * <a href="https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry" title="Create a Microsoft Foundry resource" target="_blank">Create a multi-service resource</a> in the Azure portal. This quickstart only requires one Foundry Tools [multi-service resource](../../../../multi-service-resource.md?pivots=azportal). The sample code allows you to specify separate Language and Speech resource keys.
> * Get the resource key and region. After your Microsoft Foundry resource is deployed, select **Go to resource** to view and manage keys.

> **Important:**
> This quickstart requires access to [conversation summarization](../../../../language-service/summarization/how-to/summarize.md?tabs=conversation-summarization). To get access, you must submit an [online request](https://aka.ms/applyforconversationsummarization/) and have it approved. 
> 
> The `--languageKey` and `--languageEndpoint` values in this quickstart must correspond to a resource that's in one of the regions supported by the [conversation summarization API](https://aka.ms/convsumregions): `eastus`, `northeurope`, and `uksouth`.


## Run post-call transcription analysis with C#

Follow these steps to build and run the post-call transcription analysis quickstart code example.

1. Copy the <a href="https://github.com/Azure-Samples/cognitive-services-speech-sdk/tree/master/scenarios/csharp/dotnetcore/call-center/"  title="Copy the samples"  target="_blank">scenarios/csharp/dotnetcore/call-center/</a> sample files from GitHub. If you have [Git installed](https://git-scm.com/downloads), open a command prompt and run the `git clone` command to download the Speech SDK samples repository.
    ```dotnetcli
    git clone https://github.com/Azure-Samples/cognitive-services-speech-sdk.git
    ```
1. Open a command prompt and change to the project directory.
    ```dotnetcli
    cd <your-local-path>/scenarios/csharp/dotnetcore/call-center/call-center/
    ```
1. Build the project with the .NET CLI.
    ```dotnetcli
    dotnet build
    ```
1. Run the application with your preferred command line arguments. See [usage and arguments](#usage-and-arguments) for the available options. 
    
    Here's an example that transcribes from an example audio file at [GitHub](https://github.com/Azure-Samples/cognitive-services-speech-sdk/raw/master/scenarios/call-center/sampledata/Call1_separated_16k_health_insurance.wav):
    ```dotnetcli
    dotnet run --languageKey YourResourceKey --languageEndpoint YourResourceEndpoint --speechKey YourResourceKey --speechRegion YourResourceRegion --input "https://github.com/Azure-Samples/cognitive-services-speech-sdk/raw/master/scenarios/call-center/sampledata/Call1_separated_16k_health_insurance.wav" --stereo  --output summary.json
    ```
    
    If you already have a transcription for input, here's an example that only requires a Language resource:
    ```dotnetcli
    dotnet run --languageKey YourResourceKey --languageEndpoint YourResourceEndpoint --jsonInput "YourTranscriptionFile.json" --stereo  --output summary.json
    ```
    
    Replace `YourResourceKey` with your Microsoft Foundry resource key, replace `YourResourceRegion` with your Microsoft Foundry resource [region](../../../regions.md) (such as `eastus`), and replace `YourResourceEndpoint` with your Foundry Tools endpoint. Make sure that the paths specified by `--input` and `--output` are valid. Otherwise you must change the paths.
    > **Important:**
    > Remember to remove the key from your code when you're done, and never post it publicly. For production, use a secure way of storing and accessing your credentials like [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/overview). See the Foundry Tools [security](../../../../security-features.md) article for more information.


## Check results


The console output shows the full conversation and summary. Here's an example of the overall summary, with redactions for brevity:

```output
Conversation summary:
    issue: Customer wants to sign up for insurance.
    resolution: Customer was advised that customer would be contacted by the insurance company.
```

If you specify the `--output FILE` optional [argument](../../../call-center-quickstart.md#usage-and-arguments), a JSON version of the results are written to the file. The file output is a combination of the JSON responses from the [batch transcription](../../../batch-transcription.md) (Speech), [sentiment](../../../../language-service/sentiment-opinion-mining/overview.md) (Language), and [conversation summarization](../../../../language-service/summarization/overview.md?tabs=conversation-summarization) (Language) APIs. 

The `transcription` property contains a JSON object with the results of sentiment analysis merged with batch transcription. Here's an example, with redactions for brevity:
```json
{
    "source": "https://github.com/Azure-Samples/cognitive-services-speech-sdk/raw/master/scenarios/call-center/sampledata/Call1_separated_16k_health_insurance.wav",
// Example results redacted for brevity
        "nBest": [
          {
            "confidence": 0.77464247,
            "lexical": "hello thank you for calling contoso who am i speaking with today",
            "itn": "hello thank you for calling contoso who am i speaking with today",
            "maskedITN": "hello thank you for calling contoso who am i speaking with today",
            "display": "Hello, thank you for calling Contoso. Who am I speaking with today?",
            "sentiment": {
              "positive": 0.78,
              "neutral": 0.21,
              "negative": 0.01
            }
          },
        ]
// Example results redacted for brevity
}   
```

The `conversationAnalyticsResults` property contains a JSON object with the results of the conversation PII and conversation summarization analysis. Here's an example, with redactions for brevity:
```json
{
  "conversationAnalyticsResults": {
    "conversationSummaryResults": {
      "conversations": [
        {
          "id": "conversation1",
          "summaries": [
            {
              "aspect": "issue",
              "text": "Customer wants to sign up for insurance"
            },
            {
              "aspect": "resolution",
              "text": "Customer was advised that customer would be contacted by the insurance company"
            }
          ],
          "warnings": []
        }
      ],
      "errors": [],
      "modelVersion": "2022-05-15-preview"
    },
    "conversationPiiResults": {
      "combinedRedactedContent": [
        {
          "channel": "0",
          "display": "Hello, thank you for calling Contoso. Who am I speaking with today? Hi, ****. Uh, are you calling because you need health insurance?", // Example results redacted for brevity
          "itn": "hello thank you for calling contoso who am i speaking with today hi **** uh are you calling because you need health insurance", // Example results redacted for brevity
          "lexical": "hello thank you for calling contoso who am i speaking with today hi **** uh are you calling because you need health insurance" // Example results redacted for brevity
        },
        {
          "channel": "1",
          "display": "Hi, my name is **********. I'm trying to enroll myself with Contoso. Yes. Yeah, I'm calling to sign up for insurance.", // Example results redacted for brevity
          "itn": "hi my name is ********** i'm trying to enroll myself with contoso yes yeah i'm calling to sign up for insurance", // Example results redacted for brevity
          "lexical": "hi my name is ********** i'm trying to enroll myself with contoso yes yeah i'm calling to sign up for insurance" // Example results redacted for brevity
        }
      ],
      "conversations": [
        {
          "id": "conversation1",
          "conversationItems": [
            {
              "id": "0",
              "redactedContent": {
                "itn": "hello thank you for calling contoso who am i speaking with today",
                "lexical": "hello thank you for calling contoso who am i speaking with today",
                "text": "Hello, thank you for calling Contoso. Who am I speaking with today?"
              },
              "entities": [],
              "channel": "0",
              "offset": "PT0.77S"
            },
            {
              "id": "1",
              "redactedContent": {
                "itn": "hi my name is ********** i'm trying to enroll myself with contoso",
                "lexical": "hi my name is ********** i'm trying to enroll myself with contoso",
                "text": "Hi, my name is **********. I'm trying to enroll myself with Contoso."
              },
              "entities": [
                {
                  "text": "Mary Rondo",
                  "category": "Name",
                  "offset": 15,
                  "length": 10,
                  "confidenceScore": 0.97
                }
              ],
              "channel": "1",
              "offset": "PT4.55S"
            },
            {
              "id": "2",
              "redactedContent": {
                "itn": "hi **** uh are you calling because you need health insurance",
                "lexical": "hi **** uh are you calling because you need health insurance",
                "text": "Hi, ****. Uh, are you calling because you need health insurance?"
              },
              "entities": [
                {
                  "text": "Mary",
                  "category": "Name",
                  "offset": 4,
                  "length": 4,
                  "confidenceScore": 0.93
                }
              ],
              "channel": "0",
              "offset": "PT9.55S"
            },
            {
              "id": "3",
              "redactedContent": {
                "itn": "yes yeah i'm calling to sign up for insurance",
                "lexical": "yes yeah i'm calling to sign up for insurance",
                "text": "Yes. Yeah, I'm calling to sign up for insurance."
              },
              "entities": [],
              "channel": "1",
              "offset": "PT13.09S"
            },
// Example results redacted for brevity
          ],
          "warnings": []
        }
      ]
    }
  }
}
```


## Usage and arguments

Usage: `call-center -- [...]`


> **Important:**
> You can use a <a href="https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry" title="Create a Foundry resource"  target="_blank">multi-service</a> resource or separate <a href="https://portal.azure.com/#create/Microsoft.CognitiveServicesTextAnalytics"  title="Create a Language resource"  target="_blank">Language</a> and <a href="https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry"  title="Create a Foundry resource for Speech"  target="_blank">Speech</a> resources. In either case, the `--languageKey` and `--languageEndpoint` values must correspond to a resource that's in one of the regions supported by the [conversation summarization API](https://aka.ms/convsumregions): `eastus`, `northeurope`, and `uksouth`.  

Connection options include:

- `--speechKey KEY`: Your <a href="https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry" title="Foundry"  target="_blank">Foundry</a> resource key. Required for audio transcriptions with the `--input` from URL option.
- `--speechRegion REGION`: Your <a href="https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry" title="Foundry"  target="_blank">Foundry</a> resource region. Required for audio transcriptions with the `--input` from URL option. Examples: `eastus`, `northeurope`

- `--languageKey KEY`: Your <a href="https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry" title="Foundry"  target="_blank">Foundry</a> resource key. Required.
- `--languageEndpoint ENDPOINT`: Your <a href="https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry" title="Foundry"  target="_blank">Foundry</a> resource endpoint. Required. Example: `https://YourResourceName.cognitiveservices.azure.com`

Input options include:

- `--input URL`: Input audio from URL. You must set either the `--input` or `--jsonInput` option. 
- `--jsonInput FILE`: Input an existing batch transcription JSON result from FILE. With this option, you only need a Language resource to process a transcription that you already have. With this option, you don't need an audio file or a Foundry resource for Speech. Overrides `--input`. You must set either the `--input` or `--jsonInput` option.
- `--stereo`: Indicates that the audio via ```input URL` should be in stereo format. If stereo isn't specified, then mono 16khz 16 bit PCM wav files are assumed. Diarization of mono files is used to separate multiple speakers. Diarization of stereo files isn't supported, since 2-channel stereo files should already have one speaker per channel.
- `--certificate`: The PEM certificate file. Required for C++. 

Language options include:

- `--language LANGUAGE`: The language to use for sentiment analysis and conversation analysis. This value should be a two-letter ISO 639-1 code. The default value is `en`.
- `--locale LOCALE`: The locale to use for batch transcription of audio. The default value is `en-US`.

Output options include:

- `--help`: Show the usage help and stop
- `--output FILE`: Output the transcription, sentiment, conversation PII, and conversation summaries in JSON format to a text file. For more information, see [output examples](../../../call-center-quickstart.md#check-results).



## Clean up resources


You can use the [Azure portal](../../../../multi-service-resource.md?pivots=azportal#clean-up-resources) or [Azure Command Line Interface (CLI)](../../../../multi-service-resource.md?pivots=azcli#clean-up-resources) to remove the Microsoft Foundry resource you created.
