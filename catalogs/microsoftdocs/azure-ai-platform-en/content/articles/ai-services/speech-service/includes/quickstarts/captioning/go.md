---
author: PatrickFarley
ms.service: azure-speech-foundry-tools
ms.topic: include
ms.date: 3/10/2025
ms.author: pafarley
---


[Reference documentation](https://aka.ms/csspeech/goref) | [Package (Go)](https://pkg.go.dev/github.com/Microsoft/cognitive-services-speech-sdk-go) | [Additional samples on GitHub](https://github.com/microsoft/cognitive-services-speech-sdk-go/tree/master/samples/)



In this quickstart, you run a console app to create [captions](../../../captioning-concepts.md) with speech to text.

> **Tip:**
> Try out the [Speech Studio](https://aka.ms/speechstudio/captioning) and choose a sample video clip to see real-time or offline processed captioning results.

> **Tip:**
> Try out the [Azure Speech in Foundry Tools Toolkit](https://marketplace.visualstudio.com/items?itemName=ms-azureaispeech.azure-ai-speech-toolkit) to easily build and run captioning samples on Visual Studio Code.


## Prerequisites


> 
> - An Azure subscription. You can [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
> - [Create a Foundry resource for Speech](https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry) in the Azure portal.
> - Get the Speech resource key and region. After your Speech resource is deployed, select **Go to resource** to view and manage keys.


## Set up the environment

Check whether there are any [platform-specific installation steps](../../../quickstarts/setup-platform.md?pivots=programming-language-go).

You must also install [GStreamer](../../../how-to-use-codec-compressed-audio-input-streams.md) for compressed input audio.

## Create captions from speech

Follow these steps to build and run the captioning quickstart code example.

1. Download or copy the <a href="https://github.com/Azure-Samples/cognitive-services-speech-sdk/tree/master/scenarios/go/captioning/"  title="Copy the samples"  target="_blank">scenarios/go/captioning/</a> sample files from GitHub into a local directory. 
1. Open a command prompt in the same directory as `captioning.go`.
1. Run the following commands to create a `go.mod` file that links to the Speech SDK components hosted on GitHub:
    ```console
    go mod init captioning
    go get github.com/Microsoft/cognitive-services-speech-sdk-go
    ```
1. Build the GO module.
    ```console
    go build
    ```
1. Run the application with your preferred command line arguments. See [usage and arguments](#usage-and-arguments) for the available options. Here is an example:
    ```console
    go run captioning --key YourSpeechResoureKey --region YourServiceRegion --input caption.this.mp4 --format any --output caption.output.txt --srt --recognizing --threshold 5 --profanity mask --phrases "Contoso;Jessie;Rehaan"
    ```
    Replace `YourSpeechResoureKey` with your Speech resource key, and replace `YourServiceRegion` with your Speech resource [region](../../../regions.md), such as `westus` or `northeurope`. Make sure that the paths specified by `--input` and `--output` are valid. Otherwise you must change the paths.

    > **Important:**
    > Remember to remove the key from your code when you're done, and never post it publicly. For production, use a secure way of storing and accessing your credentials like [Azure Key Vault](../../../../use-key-vault.md). See the Foundry Tools [security](../../../../security-features.md) article for more information.


## Check results


The output file with complete captions is written to `caption.output.txt`. Intermediate results are shown in the console:

```srt
00:00:00,180 --> 00:00:01,600
Welcome to

00:00:00,180 --> 00:00:01,820
Welcome to applied

00:00:00,180 --> 00:00:02,420
Welcome to applied mathematics

00:00:00,180 --> 00:00:02,930
Welcome to applied mathematics course

00:00:00,180 --> 00:00:03,100
Welcome to applied Mathematics course 2

00:00:00,180 --> 00:00:03,230
Welcome to applied Mathematics course 201.
```

The [SRT](https://docs.fileformat.com/video/srt/) (SubRip Text) timespan output format is `hh:mm:ss,fff`. For more information, see [Caption output format](../../../captioning-concepts.md#caption-output-format).


## Usage and arguments

Usage: `go run captioning.go helper.go --key <key> --region <region> --input <input file>`


Connection options include:

- `--key`: Your Foundry resource key. 
- `--region REGION`: Your Foundry resource region. Examples: `westus`, `northeurope`

Input options include:

- `--input FILE`: Input audio from file. The default input is the microphone. 
- `--format FORMAT`: Use compressed audio format. Valid only with `--file`. Valid values are `alaw`, `any`, `flac`, `mp3`, `mulaw`, and `ogg_opus`. The default value is `any`. To use a `wav` file, don't specify the format. This option is not available with the JavaScript captioning sample. For compressed audio files such as MP4, install GStreamer and see [How to use compressed input audio](../../../how-to-use-codec-compressed-audio-input-streams.md). 

Language options include:

- `--languages LANG1,LANG2`: Enable language identification for specified languages. For example: `en-US,ja-JP`. This option is only available with the C++, C#, and Python captioning samples. For more information, see [Language identification](../../../language-identification.md).

Recognition options include:

- `--recognizing`: Output `Recognizing` event results. The default output is `Recognized` event results only. These are always written to the console, never to an output file. The `--quiet` option overrides this. For more information, see [Get speech recognition results](../../../get-speech-recognition-results.md).

Accuracy options include:

- `--phrases PHRASE1;PHRASE2`: You can specify a list of phrases to be recognized, such as `Contoso;Jessie;Rehaan`. For more information, see [Improve recognition with phrase list](../../../improve-accuracy-phrase-list.md).

Output options include:

- `--help`: Show this help and stop
- `--output FILE`: Output captions to the specified `file`. This flag is required.
- `--srt`: Output captions in SRT (SubRip Text) format. The default format is WebVTT (Web Video Text Tracks). For more information about SRT and WebVTT caption file formats, see [Caption output format](../../../captioning-concepts.md#caption-output-format).
- `--quiet`: Suppress console output, except errors.
- `--profanity OPTION`: Valid values: raw, remove, mask. For more information, see [Profanity filter](../../../display-text-format.md#profanity-filter) concepts.
- `--threshold NUMBER`: Set stable partial result threshold. The default value is `3`. For more information, see [Get partial results](../../../captioning-concepts.md#get-partial-results) concepts.


## Clean up resources


You can use the [Azure portal](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/common/~/articles/ai-services/multi-service-resource.md?pivots=azportal#clean-up-resources) or [Azure Command Line Interface (CLI)](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/common/~/articles/ai-services/multi-service-resource.md?pivots=azcli#clean-up-resources) to remove the Speech resource you created.
