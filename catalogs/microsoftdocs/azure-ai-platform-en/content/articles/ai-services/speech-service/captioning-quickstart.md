---
title: "Create captions with speech to text quickstart - Speech service"
titleSuffix: Foundry Tools
description: In this quickstart, you convert speech to text as captions.
author: PatrickFarley
manager: mcleans
ms.service: azure-speech-foundry-tools
ms.topic: quickstart
ms.date: 02/25/2026
ms.author: pafarley
ms.devlang: cpp
ms.custom: devx-track-extended-java, devx-track-go, devx-track-js, devx-track-python
zone_pivot_groups: programming-languages-speech-sdk-cli
---

# Quickstart: Create captions with speech to text

**Applies to: programming-language-python**



[Reference documentation](https://learn.microsoft.com/python/api/azure-cognitiveservices-speech/) | [Package (PyPi)](https://pypi.org/project/azure-cognitiveservices-speech/) | [Additional samples on GitHub](https://aka.ms/speech/github-python)



In this quickstart, you run a console app to create [captions](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/captioning-concepts.md) with speech to text.

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

The Speech SDK for Python is available as a [Python Package Index (PyPI) module](https://pypi.org/project/azure-cognitiveservices-speech/). The Speech SDK for Python is compatible with Windows, Linux, and macOS. 
- You must install the [Microsoft Visual C++ Redistributable for Visual Studio 2015, 2017, 2019, and 2022](https://learn.microsoft.com/cpp/windows/latest-supported-vc-redist?view=msvc-170\&preserve-view=true) for your platform. Installing this package for the first time might require a restart.
- On Linux, you must use the x64 target architecture.

1. Install a version of [Python from 3.10 or later](https://www.python.org/downloads/). First check the [SDK installation guide](quickstarts/setup-platform.md?pivots=programming-language-python) for any more requirements 
1. You must also install [GStreamer](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/how-to-use-codec-compressed-audio-input-streams.md) for compressed input audio.

### Set environment variables


You need to authenticate your application to access Foundry Tools. This article shows you how to use environment variables to store your credentials. You can then access the environment variables from your code to authenticate your application. For production, use a more secure way to store and access your credentials. 

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/captioning-quickstart.md)

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


## Create captions from speech

Follow these steps to build and run the captioning quickstart code example.

1. Download or copy the <a href="https://github.com/Azure-Samples/cognitive-services-speech-sdk/tree/master/scenarios/python/console/captioning/"  title="Copy the samples"  target="_blank">scenarios/python/console/captioning/</a> sample files from GitHub into a local directory. 
1. Open a command prompt in the same directory as `captioning.py`.
1. Run this command to install the Speech SDK:  
    ```console
    pip install azure-cognitiveservices-speech
    ```
1. Run the application with your preferred command line arguments. See [usage and arguments](#usage-and-arguments) for the available options. Here is an example:
    ```console
    python captioning.py --input caption.this.mp4 --format any --output caption.output.txt --srt --realTime --threshold 5 --delay 0 --profanity mask --phrases "Contoso;Jessie;Rehaan"
    ```
    > **Important:**
    > Make sure that the paths specified by `--input` and `--output` are valid. Otherwise you must change the paths.
    > 
    > Make sure that you set the `SPEECH_KEY` and `SPEECH_REGION` environment variables as described [above](#set-environment-variables). Otherwise use the `--key` and `--region` arguments.

## Check results


When you use the `realTime` option in the example above, the partial results from `Recognizing` events are included in the output. In this example, only the final `Recognized` event includes the commas. Commas aren't the only differences between `Recognizing` and `Recognized` events. For more information, see [Get partial results](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/captioning-concepts.md#get-partial-results).

```srt
1
00:00:00,170 --> 00:00:00,380
The

2
00:00:00,380 --> 00:00:01,770
The rainbow

3
00:00:01,770 --> 00:00:02,560
The rainbow has seven

4
00:00:02,560 --> 00:00:03,820
The rainbow has seven colors

5
00:00:03,820 --> 00:00:05,050
The rainbow has seven colors red

6
00:00:05,050 --> 00:00:05,850
The rainbow has seven colors red
orange

7
00:00:05,850 --> 00:00:06,440
The rainbow has seven colors red
orange yellow

8
00:00:06,440 --> 00:00:06,730
The rainbow has seven colors red
orange yellow green

9
00:00:06,730 --> 00:00:07,160
orange, yellow, green, blue,
indigo and Violet.
```

When you use the `--offline` option, the results are stable from the final `Recognized` event. Partial results aren't included in the output:

```srt
1
00:00:00,170 --> 00:00:05,540
The rainbow has seven colors, red,
orange, yellow, green, blue,

2
00:00:05,540 --> 00:00:07,160
indigo and Violet.
```

The [SRT](https://docs.fileformat.com/video/srt/) (SubRip Text) timespan output format is `hh:mm:ss,fff`. For more information, see [Caption output format](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/captioning-concepts.md#caption-output-format).


## Usage and arguments

Usage: `python captioning.py --input <input file>`


Connection options include:

- `--key`: Your Foundry resource key. Overrides the SPEECH_KEY environment variable. You must set the environment variable (recommended) or use the `--key` option.
- `--region REGION`: Your Foundry resource region. Overrides the SPEECH_REGION environment variable. You must set the environment variable (recommended) or use the `--region` option. Examples: `westus`, `northeurope`

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/azure-key-vault.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/captioning-quickstart.md)

Input options include:

- `--input FILE`: Input audio from file. The default input is the microphone. 
- `--format FORMAT`: Use compressed audio format. Valid only with `--file`. Valid values are `alaw`, `any`, `flac`, `mp3`, `mulaw`, and `ogg_opus`. The default value is `any`. To use a `wav` file, don't specify the format. This option is not available with the JavaScript captioning sample. For compressed audio files such as MP4, install GStreamer and see [How to use compressed input audio](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/how-to-use-codec-compressed-audio-input-streams.md). 

Language options include:

- `--language LANG`: Specify a language using one of the corresponding [supported locales](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/language-support.md?tabs=stt). This is used when breaking captions into lines. Default value is `en-US`.

Recognition options include:

- `--offline`: Output offline results. Overrides `--realTime`. Default output mode is offline.
- `--realTime`: Output real-time results. 

Real-time output includes `Recognizing` event results. The default offline output is `Recognized` event results only. These are always written to the console, never to an output file. The `--quiet` option overrides this. For more information, see [Get speech recognition results](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/get-speech-recognition-results.md).

Accuracy options include:

- `--phrases PHRASE1;PHRASE2`: You can specify a list of phrases to be recognized, such as `Contoso;Jessie;Rehaan`. For more information, see [Improve recognition with phrase list](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/improve-accuracy-phrase-list.md).

Output options include:

- `--help`: Show this help and stop
- `--output FILE`: Output captions to the specified `file`. This flag is required.
- `--srt`: Output captions in SRT (SubRip Text) format. The default format is WebVTT (Web Video Text Tracks). For more information about SRT and WebVTT caption file formats, see [Caption output format](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/captioning-concepts.md#caption-output-format).
- `--maxLineLength LENGTH`: Set the maximum number of characters per line for a caption to LENGTH. Minimum is 20. Default is 37 (30 for Chinese).
- `--lines LINES`: Set the number of lines for a caption to LINES. Minimum is 1. Default is 2.
- `--delay MILLISECONDS`: How many MILLISECONDS to delay the display of each caption, to mimic a real-time experience. This option is only applicable when you use the `realTime` flag. Minimum is 0.0. Default is 1000.
- `--remainTime MILLISECONDS`: How many MILLISECONDS a caption should remain on screen if it is not replaced by another. Minimum is 0.0. Default is 1000.
- `--quiet`: Suppress console output, except errors.
- `--profanity OPTION`: Valid values: raw, remove, mask. For more information, see [Profanity filter](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/display-text-format.md#profanity-filter) concepts.
- `--threshold NUMBER`: Set stable partial result threshold. The default value is `3`. This option is only applicable when you use the `realTime` flag. For more information, see [Get partial results](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/captioning-concepts.md#get-partial-results) concepts.


## Clean up resources


You can use the [Azure portal](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/common/~/articles/ai-services/multi-service-resource.md?pivots=azportal#clean-up-resources) or [Azure Command Line Interface (CLI)](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/common/~/articles/ai-services/multi-service-resource.md?pivots=azcli#clean-up-resources) to remove the Speech resource you created.





**Applies to: programming-language-csharp**



[Reference documentation](https://learn.microsoft.com/dotnet/api/microsoft.cognitiveservices.speech) | [Package (NuGet)](https://www.nuget.org/packages/Microsoft.CognitiveServices.Speech) | [Additional samples on GitHub](https://aka.ms/speech/github-csharp)



In this quickstart, you run a console app to create [captions](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/captioning-concepts.md) with speech to text.

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
The Speech SDK is available as a [NuGet package](https://www.nuget.org/packages/Microsoft.CognitiveServices.Speech) and implements .NET Standard 2.0. You install the Speech SDK later in this guide, but first check the [SDK installation guide](quickstarts/setup-platform.md?pivots=programming-language-csharp) for any more requirements. 

You must also install [GStreamer](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/how-to-use-codec-compressed-audio-input-streams.md) for compressed input audio.

### Set environment variables


You need to authenticate your application to access Foundry Tools. This article shows you how to use environment variables to store your credentials. You can then access the environment variables from your code to authenticate your application. For production, use a more secure way to store and access your credentials. 

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/captioning-quickstart.md)

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


## Create captions from speech

Follow these steps to build and run the captioning quickstart code example.

1. Copy the  <a href="https://github.com/Azure-Samples/cognitive-services-speech-sdk/tree/master/scenarios/csharp/dotnetcore/captioning/"  title="Copy the samples"  target="_blank">scenarios/csharp/dotnetcore/captioning/</a> sample files from GitHub. If you have [Git installed](https://git-scm.com/downloads), open a command prompt and run the `git clone` command to download the Speech SDK samples repository.
    ```dotnetcli
    git clone https://github.com/Azure-Samples/cognitive-services-speech-sdk.git
    ```
1. Open a command prompt and change to the project directory.
    ```dotnetcli
    cd <your-local-path>/scenarios/csharp/dotnetcore/captioning/captioning/
    ```
1. Build the project with the .NET CLI.
    ```dotnetcli
    dotnet build
    ```
1. Run the application with your preferred command line arguments. See [usage and arguments](#usage-and-arguments) for the available options. Here is an example:
    ```dotnetcli
    dotnet run --input caption.this.mp4 --format any --output caption.output.txt --srt --realTime --threshold 5 --delay 0 --profanity mask --phrases "Contoso;Jessie;Rehaan"
    ```
    > **Important:**
    > Make sure that the paths specified by `--input` and `--output` are valid. Otherwise you must change the paths.
    > 
    > Make sure that you set the `SPEECH_KEY` and `SPEECH_REGION` environment variables as described [above](#set-environment-variables). Otherwise use the `--key` and `--region` arguments.

## Check results


When you use the `realTime` option in the example above, the partial results from `Recognizing` events are included in the output. In this example, only the final `Recognized` event includes the commas. Commas aren't the only differences between `Recognizing` and `Recognized` events. For more information, see [Get partial results](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/captioning-concepts.md#get-partial-results).

```srt
1
00:00:00,170 --> 00:00:00,380
The

2
00:00:00,380 --> 00:00:01,770
The rainbow

3
00:00:01,770 --> 00:00:02,560
The rainbow has seven

4
00:00:02,560 --> 00:00:03,820
The rainbow has seven colors

5
00:00:03,820 --> 00:00:05,050
The rainbow has seven colors red

6
00:00:05,050 --> 00:00:05,850
The rainbow has seven colors red
orange

7
00:00:05,850 --> 00:00:06,440
The rainbow has seven colors red
orange yellow

8
00:00:06,440 --> 00:00:06,730
The rainbow has seven colors red
orange yellow green

9
00:00:06,730 --> 00:00:07,160
orange, yellow, green, blue,
indigo and Violet.
```

When you use the `--offline` option, the results are stable from the final `Recognized` event. Partial results aren't included in the output:

```srt
1
00:00:00,170 --> 00:00:05,540
The rainbow has seven colors, red,
orange, yellow, green, blue,

2
00:00:05,540 --> 00:00:07,160
indigo and Violet.
```

The [SRT](https://docs.fileformat.com/video/srt/) (SubRip Text) timespan output format is `hh:mm:ss,fff`. For more information, see [Caption output format](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/captioning-concepts.md#caption-output-format).


## Usage and arguments

Usage: `captioning --input <input file>`


Connection options include:

- `--key`: Your Foundry resource key. Overrides the SPEECH_KEY environment variable. You must set the environment variable (recommended) or use the `--key` option.
- `--region REGION`: Your Foundry resource region. Overrides the SPEECH_REGION environment variable. You must set the environment variable (recommended) or use the `--region` option. Examples: `westus`, `northeurope`

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/azure-key-vault.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/captioning-quickstart.md)

Input options include:

- `--input FILE`: Input audio from file. The default input is the microphone. 
- `--format FORMAT`: Use compressed audio format. Valid only with `--file`. Valid values are `alaw`, `any`, `flac`, `mp3`, `mulaw`, and `ogg_opus`. The default value is `any`. To use a `wav` file, don't specify the format. This option is not available with the JavaScript captioning sample. For compressed audio files such as MP4, install GStreamer and see [How to use compressed input audio](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/how-to-use-codec-compressed-audio-input-streams.md). 

Language options include:

- `--language LANG`: Specify a language using one of the corresponding [supported locales](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/language-support.md?tabs=stt). This is used when breaking captions into lines. Default value is `en-US`.

Recognition options include:

- `--offline`: Output offline results. Overrides `--realTime`. Default output mode is offline.
- `--realTime`: Output real-time results. 

Real-time output includes `Recognizing` event results. The default offline output is `Recognized` event results only. These are always written to the console, never to an output file. The `--quiet` option overrides this. For more information, see [Get speech recognition results](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/get-speech-recognition-results.md).

Accuracy options include:

- `--phrases PHRASE1;PHRASE2`: You can specify a list of phrases to be recognized, such as `Contoso;Jessie;Rehaan`. For more information, see [Improve recognition with phrase list](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/improve-accuracy-phrase-list.md).

Output options include:

- `--help`: Show this help and stop
- `--output FILE`: Output captions to the specified `file`. This flag is required.
- `--srt`: Output captions in SRT (SubRip Text) format. The default format is WebVTT (Web Video Text Tracks). For more information about SRT and WebVTT caption file formats, see [Caption output format](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/captioning-concepts.md#caption-output-format).
- `--maxLineLength LENGTH`: Set the maximum number of characters per line for a caption to LENGTH. Minimum is 20. Default is 37 (30 for Chinese).
- `--lines LINES`: Set the number of lines for a caption to LINES. Minimum is 1. Default is 2.
- `--delay MILLISECONDS`: How many MILLISECONDS to delay the display of each caption, to mimic a real-time experience. This option is only applicable when you use the `realTime` flag. Minimum is 0.0. Default is 1000.
- `--remainTime MILLISECONDS`: How many MILLISECONDS a caption should remain on screen if it is not replaced by another. Minimum is 0.0. Default is 1000.
- `--quiet`: Suppress console output, except errors.
- `--profanity OPTION`: Valid values: raw, remove, mask. For more information, see [Profanity filter](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/display-text-format.md#profanity-filter) concepts.
- `--threshold NUMBER`: Set stable partial result threshold. The default value is `3`. This option is only applicable when you use the `realTime` flag. For more information, see [Get partial results](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/captioning-concepts.md#get-partial-results) concepts.


## Clean up resources


You can use the [Azure portal](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/common/~/articles/ai-services/multi-service-resource.md?pivots=azportal#clean-up-resources) or [Azure Command Line Interface (CLI)](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/common/~/articles/ai-services/multi-service-resource.md?pivots=azcli#clean-up-resources) to remove the Speech resource you created.









**Applies to: programming-language-javascript**



[Reference documentation](https://learn.microsoft.com/javascript/api/microsoft-cognitiveservices-speech-sdk/) | [Package (npm)](https://www.npmjs.com/package/microsoft-cognitiveservices-speech-sdk) | [Additional samples on GitHub](https://aka.ms/speech/github-javascript) | [Library source code](https://github.com/Microsoft/cognitive-services-speech-sdk-js)



In this quickstart, you run a console app to create [captions](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/captioning-concepts.md) with speech to text.

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

Before you can do anything, you need to install the Speech SDK for JavaScript. If you just want the package name to install, run `npm install microsoft-cognitiveservices-speech-sdk`. For guided installation instructions, see the [SDK installation guide](quickstarts/setup-platform.md?pivots=programming-language-javascript).

## Create captions from speech

Follow these steps to build and run the captioning quickstart code example.

1. Copy the <a href="https://github.com/Azure-Samples/cognitive-services-speech-sdk/tree/master/scenarios/javascript/node/captioning/"  title="Copy the samples"  target="_blank">scenarios/javascript/node/captioning/</a> sample files from GitHub into your project directory.
1. Open a command prompt in the same directory as `Captioning.js`.
1. Install the Speech SDK for JavaScript:
    ```console
    npm install microsoft-cognitiveservices-speech-sdk
    ```
1. Run the application with your preferred command line arguments. See [usage and arguments](#usage-and-arguments) for the available options. Here is an example:
    ```console
    node captioning.js --key YourSpeechResoureKey --region YourServiceRegion --input caption.this.wav --output caption.output.txt --srt --recognizing --threshold 5 --profanity mask --phrases "Contoso;Jessie;Rehaan"
    ```
    Replace `YourSpeechResoureKey` with your Speech resource key, and replace `YourServiceRegion` with your Speech resource [region](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/regions.md), such as `westus` or `northeurope`. Make sure that the paths specified by `--input` and `--output` are valid. Otherwise you must change the paths.

    > **Note:**
    > The Speech SDK for JavaScript doesn't support [compressed input audio](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/how-to-use-codec-compressed-audio-input-streams.md). You must use a WAV file as shown in the example.

    > **Important:**
    > Remember to remove the key from your code when you're done, and never post it publicly. For production, use a secure way of storing and accessing your credentials like [Azure Key Vault](../use-key-vault.md). See the Foundry Tools [security](../security-features.md) article for more information.


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

The [SRT](https://docs.fileformat.com/video/srt/) (SubRip Text) timespan output format is `hh:mm:ss,fff`. For more information, see [Caption output format](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/captioning-concepts.md#caption-output-format).


## Usage and arguments

Usage: `node captioning.js  --key <key> --region <region> --input <input file>`


Connection options include:

- `--key`: Your Foundry resource key. 
- `--region REGION`: Your Foundry resource region. Examples: `westus`, `northeurope`

Input options include:

- `--input FILE`: Input audio from file. The default input is the microphone. 
- `--format FORMAT`: Use compressed audio format. Valid only with `--file`. Valid values are `alaw`, `any`, `flac`, `mp3`, `mulaw`, and `ogg_opus`. The default value is `any`. To use a `wav` file, don't specify the format. This option is not available with the JavaScript captioning sample. For compressed audio files such as MP4, install GStreamer and see [How to use compressed input audio](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/how-to-use-codec-compressed-audio-input-streams.md). 

Language options include:

- `--languages LANG1,LANG2`: Enable language identification for specified languages. For example: `en-US,ja-JP`. This option is only available with the C++, C#, and Python captioning samples. For more information, see [Language identification](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/language-identification.md).

Recognition options include:

- `--recognizing`: Output `Recognizing` event results. The default output is `Recognized` event results only. These are always written to the console, never to an output file. The `--quiet` option overrides this. For more information, see [Get speech recognition results](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/get-speech-recognition-results.md).

Accuracy options include:

- `--phrases PHRASE1;PHRASE2`: You can specify a list of phrases to be recognized, such as `Contoso;Jessie;Rehaan`. For more information, see [Improve recognition with phrase list](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/improve-accuracy-phrase-list.md).

Output options include:

- `--help`: Show this help and stop
- `--output FILE`: Output captions to the specified `file`. This flag is required.
- `--srt`: Output captions in SRT (SubRip Text) format. The default format is WebVTT (Web Video Text Tracks). For more information about SRT and WebVTT caption file formats, see [Caption output format](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/captioning-concepts.md#caption-output-format).
- `--quiet`: Suppress console output, except errors.
- `--profanity OPTION`: Valid values: raw, remove, mask. For more information, see [Profanity filter](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/display-text-format.md#profanity-filter) concepts.
- `--threshold NUMBER`: Set stable partial result threshold. The default value is `3`. For more information, see [Get partial results](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/captioning-concepts.md#get-partial-results) concepts.


## Clean up resources


You can use the [Azure portal](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/common/~/articles/ai-services/multi-service-resource.md?pivots=azportal#clean-up-resources) or [Azure Command Line Interface (CLI)](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/common/~/articles/ai-services/multi-service-resource.md?pivots=azcli#clean-up-resources) to remove the Speech resource you created.




**Applies to: programming-language-java**



[Reference documentation](https://learn.microsoft.com/java/api/com.microsoft.cognitiveservices.speech) | [Additional samples on GitHub](https://aka.ms/speech/github-java)



In this quickstart, you run a console app to create [captions](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/captioning-concepts.md) with speech to text.

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

Before you can do anything, you need to [install the Speech SDK](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/quickstarts/setup-platform.md?pivots=programming-language-java\&tabs=jre). The sample in this quickstart works with the [Microsoft Build of OpenJDK 17](https://www.microsoft.com/openjdk)

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
1. You must also install [GStreamer](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/how-to-use-codec-compressed-audio-input-streams.md) for compressed input audio.

### Set environment variables


You need to authenticate your application to access Foundry Tools. This article shows you how to use environment variables to store your credentials. You can then access the environment variables from your code to authenticate your application. For production, use a more secure way to store and access your credentials. 

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/captioning-quickstart.md)

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


## Create captions from speech

Follow these steps to build and run the captioning quickstart code example.

1. Copy the <a href="https://github.com/Azure-Samples/cognitive-services-speech-sdk/tree/master/scenarios/java/jre/console/captioning/"  title="Copy the samples"  target="_blank">scenarios/java/jre/captioning/</a> sample files from GitHub into your project directory. The `pom.xml` file that you created in [environment setup](#set-up-the-environment) must also be in this directory.
1. Open a command prompt and run this command to compile the project files. 
    ```console
    javac Captioning.java -cp ".;target\dependency\*" -encoding UTF-8
    ```
    ```
1. Run the application with your preferred command line arguments. See [usage and arguments](#usage-and-arguments) for the available options. Here is an example:
    ```console
    java -cp ".;target\dependency\*" Captioning --input caption.this.mp4 --format any --output caption.output.txt --srt --realTime --threshold 5 --delay 0 --profanity mask --phrases "Contoso;Jessie;Rehaan"
    ```
    > **Important:**
    > Make sure that the paths specified by `--input` and `--output` are valid. Otherwise you must change the paths.
    > 
    > Make sure that you set the `SPEECH_KEY` and `SPEECH_REGION` environment variables as described [above](#set-environment-variables). Otherwise use the `--key` and `--region` arguments.


## Check results


When you use the `realTime` option in the example above, the partial results from `Recognizing` events are included in the output. In this example, only the final `Recognized` event includes the commas. Commas aren't the only differences between `Recognizing` and `Recognized` events. For more information, see [Get partial results](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/captioning-concepts.md#get-partial-results).

```srt
1
00:00:00,170 --> 00:00:00,380
The

2
00:00:00,380 --> 00:00:01,770
The rainbow

3
00:00:01,770 --> 00:00:02,560
The rainbow has seven

4
00:00:02,560 --> 00:00:03,820
The rainbow has seven colors

5
00:00:03,820 --> 00:00:05,050
The rainbow has seven colors red

6
00:00:05,050 --> 00:00:05,850
The rainbow has seven colors red
orange

7
00:00:05,850 --> 00:00:06,440
The rainbow has seven colors red
orange yellow

8
00:00:06,440 --> 00:00:06,730
The rainbow has seven colors red
orange yellow green

9
00:00:06,730 --> 00:00:07,160
orange, yellow, green, blue,
indigo and Violet.
```

When you use the `--offline` option, the results are stable from the final `Recognized` event. Partial results aren't included in the output:

```srt
1
00:00:00,170 --> 00:00:05,540
The rainbow has seven colors, red,
orange, yellow, green, blue,

2
00:00:05,540 --> 00:00:07,160
indigo and Violet.
```

The [SRT](https://docs.fileformat.com/video/srt/) (SubRip Text) timespan output format is `hh:mm:ss,fff`. For more information, see [Caption output format](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/captioning-concepts.md#caption-output-format).


## Usage and arguments

Usage: `java -cp ".;target\dependency\*" Captioning --input <input file>`


Connection options include:

- `--key`: Your Foundry resource key. Overrides the SPEECH_KEY environment variable. You must set the environment variable (recommended) or use the `--key` option.
- `--region REGION`: Your Foundry resource region. Overrides the SPEECH_REGION environment variable. You must set the environment variable (recommended) or use the `--region` option. Examples: `westus`, `northeurope`

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/azure-key-vault.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/captioning-quickstart.md)

Input options include:

- `--input FILE`: Input audio from file. The default input is the microphone. 
- `--format FORMAT`: Use compressed audio format. Valid only with `--file`. Valid values are `alaw`, `any`, `flac`, `mp3`, `mulaw`, and `ogg_opus`. The default value is `any`. To use a `wav` file, don't specify the format. This option is not available with the JavaScript captioning sample. For compressed audio files such as MP4, install GStreamer and see [How to use compressed input audio](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/how-to-use-codec-compressed-audio-input-streams.md). 

Language options include:

- `--language LANG`: Specify a language using one of the corresponding [supported locales](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/language-support.md?tabs=stt). This is used when breaking captions into lines. Default value is `en-US`.

Recognition options include:

- `--offline`: Output offline results. Overrides `--realTime`. Default output mode is offline.
- `--realTime`: Output real-time results. 

Real-time output includes `Recognizing` event results. The default offline output is `Recognized` event results only. These are always written to the console, never to an output file. The `--quiet` option overrides this. For more information, see [Get speech recognition results](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/get-speech-recognition-results.md).

Accuracy options include:

- `--phrases PHRASE1;PHRASE2`: You can specify a list of phrases to be recognized, such as `Contoso;Jessie;Rehaan`. For more information, see [Improve recognition with phrase list](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/improve-accuracy-phrase-list.md).

Output options include:

- `--help`: Show this help and stop
- `--output FILE`: Output captions to the specified `file`. This flag is required.
- `--srt`: Output captions in SRT (SubRip Text) format. The default format is WebVTT (Web Video Text Tracks). For more information about SRT and WebVTT caption file formats, see [Caption output format](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/captioning-concepts.md#caption-output-format).
- `--maxLineLength LENGTH`: Set the maximum number of characters per line for a caption to LENGTH. Minimum is 20. Default is 37 (30 for Chinese).
- `--lines LINES`: Set the number of lines for a caption to LINES. Minimum is 1. Default is 2.
- `--delay MILLISECONDS`: How many MILLISECONDS to delay the display of each caption, to mimic a real-time experience. This option is only applicable when you use the `realTime` flag. Minimum is 0.0. Default is 1000.
- `--remainTime MILLISECONDS`: How many MILLISECONDS a caption should remain on screen if it is not replaced by another. Minimum is 0.0. Default is 1000.
- `--quiet`: Suppress console output, except errors.
- `--profanity OPTION`: Valid values: raw, remove, mask. For more information, see [Profanity filter](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/display-text-format.md#profanity-filter) concepts.
- `--threshold NUMBER`: Set stable partial result threshold. The default value is `3`. This option is only applicable when you use the `realTime` flag. For more information, see [Get partial results](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/captioning-concepts.md#get-partial-results) concepts.


## Clean up resources


You can use the [Azure portal](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/common/~/articles/ai-services/multi-service-resource.md?pivots=azportal#clean-up-resources) or [Azure Command Line Interface (CLI)](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/common/~/articles/ai-services/multi-service-resource.md?pivots=azcli#clean-up-resources) to remove the Speech resource you created.




**Applies to: programming-language-cpp**



[Reference documentation](https://learn.microsoft.com/cpp/cognitive-services/speech/) | [Package (NuGet)](https://www.nuget.org/packages/Microsoft.CognitiveServices.Speech) | [Additional samples on GitHub](https://aka.ms/speech/github-cpp)



In this quickstart, you run a console app to create [captions](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/captioning-concepts.md) with speech to text.

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

The Speech SDK is available as a [NuGet package](https://www.nuget.org/packages/Microsoft.CognitiveServices.Speech) and implements .NET Standard 2.0. You install the Speech SDK later in this guide, but first check the [SDK installation guide](quickstarts/setup-platform.md?pivots=programming-language-cpp) for any more requirements

You must also install [GStreamer](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/how-to-use-codec-compressed-audio-input-streams.md) for compressed input audio.

### Set environment variables


You need to authenticate your application to access Foundry Tools. This article shows you how to use environment variables to store your credentials. You can then access the environment variables from your code to authenticate your application. For production, use a more secure way to store and access your credentials. 

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/captioning-quickstart.md)

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


## Create captions from speech

Follow these steps to build and run the captioning quickstart code example with Visual Studio Community 2022 on Windows. 

1. Download or copy the <a href="https://github.com/Azure-Samples/cognitive-services-speech-sdk/tree/master/scenarios/cpp/windows/captioning"  title="Copy the samples"  target="_blank">scenarios/cpp/windows/captioning/</a> sample files from GitHub into a local directory. 
1. Open the `captioning.sln` solution file in Visual Studio Community 2022.  
1. Install the Speech SDK in your project with the NuGet package manager.
    ```powershell
    Install-Package Microsoft.CognitiveServices.Speech
    ```
1. Open **Project** > **Properties** > **General**. Set **Configuration** to `All configurations`. Set **C++ Language Standard** to `ISO C++17 Standard (/std:c++17)`.
1. Open **Build** > **Configuration Manager**.
    - On a 64-bit Windows installation, set **Active solution platform** to `x64`.
    - On a 32-bit Windows installation, set **Active solution platform** to `x86`.
1. Open **Project** > **Properties** > **Debugging**. Enter your preferred command line arguments at **Command Arguments**. See [usage and arguments](#usage-and-arguments) for the available options. Here is an example:
    ```
    --input caption.this.mp4 --format any --output caption.output.txt --srt --realTime --threshold 5 --delay 0 --profanity mask --phrases "Contoso;Jessie;Rehaan"
    ```
    > **Important:**
    > Make sure that the paths specified by `--input` and `--output` are valid. Otherwise you must change the paths.
    > 
    > Make sure that you set the `SPEECH_KEY` and `SPEECH_REGION` environment variables as described [above](#set-environment-variables). Otherwise use the `--key` and `--region` arguments.

1. [Build and run](https://learn.microsoft.com/cpp/build/vscpp-step-2-build) the console application. 

## Check results


When you use the `realTime` option in the example above, the partial results from `Recognizing` events are included in the output. In this example, only the final `Recognized` event includes the commas. Commas aren't the only differences between `Recognizing` and `Recognized` events. For more information, see [Get partial results](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/captioning-concepts.md#get-partial-results).

```srt
1
00:00:00,170 --> 00:00:00,380
The

2
00:00:00,380 --> 00:00:01,770
The rainbow

3
00:00:01,770 --> 00:00:02,560
The rainbow has seven

4
00:00:02,560 --> 00:00:03,820
The rainbow has seven colors

5
00:00:03,820 --> 00:00:05,050
The rainbow has seven colors red

6
00:00:05,050 --> 00:00:05,850
The rainbow has seven colors red
orange

7
00:00:05,850 --> 00:00:06,440
The rainbow has seven colors red
orange yellow

8
00:00:06,440 --> 00:00:06,730
The rainbow has seven colors red
orange yellow green

9
00:00:06,730 --> 00:00:07,160
orange, yellow, green, blue,
indigo and Violet.
```

When you use the `--offline` option, the results are stable from the final `Recognized` event. Partial results aren't included in the output:

```srt
1
00:00:00,170 --> 00:00:05,540
The rainbow has seven colors, red,
orange, yellow, green, blue,

2
00:00:05,540 --> 00:00:07,160
indigo and Violet.
```

The [SRT](https://docs.fileformat.com/video/srt/) (SubRip Text) timespan output format is `hh:mm:ss,fff`. For more information, see [Caption output format](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/captioning-concepts.md#caption-output-format).


## Usage and arguments

Usage: `captioning --input <input file>`


Connection options include:

- `--key`: Your Foundry resource key. Overrides the SPEECH_KEY environment variable. You must set the environment variable (recommended) or use the `--key` option.
- `--region REGION`: Your Foundry resource region. Overrides the SPEECH_REGION environment variable. You must set the environment variable (recommended) or use the `--region` option. Examples: `westus`, `northeurope`

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/azure-key-vault.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/captioning-quickstart.md)

Input options include:

- `--input FILE`: Input audio from file. The default input is the microphone. 
- `--format FORMAT`: Use compressed audio format. Valid only with `--file`. Valid values are `alaw`, `any`, `flac`, `mp3`, `mulaw`, and `ogg_opus`. The default value is `any`. To use a `wav` file, don't specify the format. This option is not available with the JavaScript captioning sample. For compressed audio files such as MP4, install GStreamer and see [How to use compressed input audio](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/how-to-use-codec-compressed-audio-input-streams.md). 

Language options include:

- `--language LANG`: Specify a language using one of the corresponding [supported locales](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/language-support.md?tabs=stt). This is used when breaking captions into lines. Default value is `en-US`.

Recognition options include:

- `--offline`: Output offline results. Overrides `--realTime`. Default output mode is offline.
- `--realTime`: Output real-time results. 

Real-time output includes `Recognizing` event results. The default offline output is `Recognized` event results only. These are always written to the console, never to an output file. The `--quiet` option overrides this. For more information, see [Get speech recognition results](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/get-speech-recognition-results.md).

Accuracy options include:

- `--phrases PHRASE1;PHRASE2`: You can specify a list of phrases to be recognized, such as `Contoso;Jessie;Rehaan`. For more information, see [Improve recognition with phrase list](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/improve-accuracy-phrase-list.md).

Output options include:

- `--help`: Show this help and stop
- `--output FILE`: Output captions to the specified `file`. This flag is required.
- `--srt`: Output captions in SRT (SubRip Text) format. The default format is WebVTT (Web Video Text Tracks). For more information about SRT and WebVTT caption file formats, see [Caption output format](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/captioning-concepts.md#caption-output-format).
- `--maxLineLength LENGTH`: Set the maximum number of characters per line for a caption to LENGTH. Minimum is 20. Default is 37 (30 for Chinese).
- `--lines LINES`: Set the number of lines for a caption to LINES. Minimum is 1. Default is 2.
- `--delay MILLISECONDS`: How many MILLISECONDS to delay the display of each caption, to mimic a real-time experience. This option is only applicable when you use the `realTime` flag. Minimum is 0.0. Default is 1000.
- `--remainTime MILLISECONDS`: How many MILLISECONDS a caption should remain on screen if it is not replaced by another. Minimum is 0.0. Default is 1000.
- `--quiet`: Suppress console output, except errors.
- `--profanity OPTION`: Valid values: raw, remove, mask. For more information, see [Profanity filter](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/display-text-format.md#profanity-filter) concepts.
- `--threshold NUMBER`: Set stable partial result threshold. The default value is `3`. This option is only applicable when you use the `realTime` flag. For more information, see [Get partial results](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/captioning-concepts.md#get-partial-results) concepts.


## Clean up resources


You can use the [Azure portal](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/common/~/articles/ai-services/multi-service-resource.md?pivots=azportal#clean-up-resources) or [Azure Command Line Interface (CLI)](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/common/~/articles/ai-services/multi-service-resource.md?pivots=azcli#clean-up-resources) to remove the Speech resource you created.





**Applies to: programming-language-go**



[Reference documentation](https://aka.ms/csspeech/goref) | [Package (Go)](https://pkg.go.dev/github.com/Microsoft/cognitive-services-speech-sdk-go) | [Additional samples on GitHub](https://github.com/microsoft/cognitive-services-speech-sdk-go/tree/master/samples/)



In this quickstart, you run a console app to create [captions](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/captioning-concepts.md) with speech to text.

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

Check whether there are any [platform-specific installation steps](quickstarts/setup-platform.md?pivots=programming-language-go).

You must also install [GStreamer](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/how-to-use-codec-compressed-audio-input-streams.md) for compressed input audio.

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
    Replace `YourSpeechResoureKey` with your Speech resource key, and replace `YourServiceRegion` with your Speech resource [region](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/regions.md), such as `westus` or `northeurope`. Make sure that the paths specified by `--input` and `--output` are valid. Otherwise you must change the paths.

    > **Important:**
    > Remember to remove the key from your code when you're done, and never post it publicly. For production, use a secure way of storing and accessing your credentials like [Azure Key Vault](../use-key-vault.md). See the Foundry Tools [security](../security-features.md) article for more information.


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

The [SRT](https://docs.fileformat.com/video/srt/) (SubRip Text) timespan output format is `hh:mm:ss,fff`. For more information, see [Caption output format](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/captioning-concepts.md#caption-output-format).


## Usage and arguments

Usage: `go run captioning.go helper.go --key <key> --region <region> --input <input file>`


Connection options include:

- `--key`: Your Foundry resource key. 
- `--region REGION`: Your Foundry resource region. Examples: `westus`, `northeurope`

Input options include:

- `--input FILE`: Input audio from file. The default input is the microphone. 
- `--format FORMAT`: Use compressed audio format. Valid only with `--file`. Valid values are `alaw`, `any`, `flac`, `mp3`, `mulaw`, and `ogg_opus`. The default value is `any`. To use a `wav` file, don't specify the format. This option is not available with the JavaScript captioning sample. For compressed audio files such as MP4, install GStreamer and see [How to use compressed input audio](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/how-to-use-codec-compressed-audio-input-streams.md). 

Language options include:

- `--languages LANG1,LANG2`: Enable language identification for specified languages. For example: `en-US,ja-JP`. This option is only available with the C++, C#, and Python captioning samples. For more information, see [Language identification](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/language-identification.md).

Recognition options include:

- `--recognizing`: Output `Recognizing` event results. The default output is `Recognized` event results only. These are always written to the console, never to an output file. The `--quiet` option overrides this. For more information, see [Get speech recognition results](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/get-speech-recognition-results.md).

Accuracy options include:

- `--phrases PHRASE1;PHRASE2`: You can specify a list of phrases to be recognized, such as `Contoso;Jessie;Rehaan`. For more information, see [Improve recognition with phrase list](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/improve-accuracy-phrase-list.md).

Output options include:

- `--help`: Show this help and stop
- `--output FILE`: Output captions to the specified `file`. This flag is required.
- `--srt`: Output captions in SRT (SubRip Text) format. The default format is WebVTT (Web Video Text Tracks). For more information about SRT and WebVTT caption file formats, see [Caption output format](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/captioning-concepts.md#caption-output-format).
- `--quiet`: Suppress console output, except errors.
- `--profanity OPTION`: Valid values: raw, remove, mask. For more information, see [Profanity filter](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/display-text-format.md#profanity-filter) concepts.
- `--threshold NUMBER`: Set stable partial result threshold. The default value is `3`. For more information, see [Get partial results](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/captioning-concepts.md#get-partial-results) concepts.


## Clean up resources


You can use the [Azure portal](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/common/~/articles/ai-services/multi-service-resource.md?pivots=azportal#clean-up-resources) or [Azure Command Line Interface (CLI)](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/common/~/articles/ai-services/multi-service-resource.md?pivots=azcli#clean-up-resources) to remove the Speech resource you created.




**Applies to: programming-language-objectivec**



[Reference documentation](https://learn.microsoft.com/objectivec/cognitive-services/speech/) | [Package (download)](https://aka.ms/csspeech/macosbinary) | [Additional samples on GitHub](https://aka.ms/speech/github-objective-c)


## Availability

The Speech SDK for Objective-C does support getting speech recognition results for captioning, but we haven't yet included a guide here. Please select another programming language to get started and learn about the concepts, or see the Objective-C reference and samples linked from the beginning of this article. 



**Applies to: programming-language-cli**



In this quickstart, you run a console app to create [captions](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/captioning-concepts.md) with speech to text.

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


Follow these steps and see the [Speech CLI quickstart](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/~/articles/ai-services/speech-service/spx-basics.md#download-and-install) for other requirements for your platform.

1. Run the following .NET CLI command to install the Speech CLI:

   ```dotnetcli
   dotnet tool install --global Microsoft.CognitiveServices.Speech.CLI
   ```

1. Run the following commands to configure your Speech resource key and region. Replace `SUBSCRIPTION-KEY` with your Speech resource key and replace `REGION` with your Speech resource region.

   # [Terminal](#tab/terminal)

   ```console
   spx config @key --set SUBSCRIPTION-KEY
   spx config @region --set REGION
   ```

   # [PowerShell](#tab/powershell)

   ```powershell
   spx --% config @key --set SUBSCRIPTION-KEY
   spx --% config @region --set REGION
   ```

   ***


You must also install [GStreamer](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/how-to-use-codec-compressed-audio-input-streams.md) for compressed input audio.

## Create captions from speech

With the [Speech CLI](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/spx-overview.md), you can output both SRT (SubRip Text) and WebVTT (Web Video Text Tracks) captions from any type of media that contains audio. 

To recognize audio from a file and output both WebVtt (`vtt`) and SRT (`srt`) captions, follow these steps. 

1. Make sure that you have an input file named `caption.this.mp4` in the path.
1. Run the following command to output captions from the video file:
    ```console
    spx recognize --file caption.this.mp4 --format any --output vtt file - --output srt file - --output each file - @output.each.detailed --property SpeechServiceResponse_StablePartialResultThreshold=5 --profanity masked --phrases "Constoso;Jessie;Rehaan"
    ```

    The SRT and WebVTT captions are output to the console as shown here:
    
    ```console
    1
    00:00:00,180 --> 00:00:03,230
    Welcome to applied Mathematics course 201.
    WEBVTT
    
    00:00:00.180 --> 00:00:03.230
    Welcome to applied Mathematics course 201.
    {
      "ResultId": "561a0ea00cc14bb09bd294357df3270f",
      "Duration": "00:00:03.0500000"
    }
    ```

## Usage and arguments

Here are details about the optional arguments from the previous command:

- `--file caption.this.mp4 --format any`: Input audio from file. The default input is the microphone. For compressed audio files such as MP4, install GStreamer and see [How to use compressed input audio](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/how-to-use-codec-compressed-audio-input-streams.md).
- `--output vtt file -` and `--output srt file -`: Outputs WebVTT and SRT captions to standard output. For more information about SRT and WebVTT caption file formats, see [Caption output format](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/captioning-concepts.md#caption-output-format). For more information about the `--output` argument, see [Speech CLI output options](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/spx-output-options.md).
- `@output.each.detailed`: Outputs event results with text, offset, and duration. For more information, see [Get speech recognition results](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/get-speech-recognition-results.md).
- `--property SpeechServiceResponse_StablePartialResultThreshold=5`: You can request that the Speech service return fewer `Recognizing` events that are more accurate. In this example, the Speech service must affirm recognition of a word at least five times before returning the partial results to you. For more information, see [Get partial results](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/captioning-concepts.md#get-partial-results) concepts.
- `--profanity masked`: You can specify whether to mask, remove, or show profanity in recognition results. For more information, see [Profanity filter](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/display-text-format.md#profanity-filter) concepts.
- `--phrases "Constoso;Jessie;Rehaan"`: You can specify a list of phrases to be recognized, such as Contoso, Jessie, and Rehaan. For more information, see [Improve recognition with phrase list](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/captioning/~/articles/ai-services/speech-service/improve-accuracy-phrase-list.md).

## Clean up resources


You can use the [Azure portal](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/common/~/articles/ai-services/multi-service-resource.md?pivots=azportal#clean-up-resources) or [Azure Command Line Interface (CLI)](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/common/~/articles/ai-services/multi-service-resource.md?pivots=azcli#clean-up-resources) to remove the Speech resource you created.




**Applies to: programming-language-swift**



[Reference documentation](https://learn.microsoft.com/objectivec/cognitive-services/speech/) | [Package (download)](https://aka.ms/csspeech/macosbinary) | [Additional samples on GitHub](https://aka.ms/speech/github-objective-c)


## Availability

The Speech SDK for Swift does support getting speech recognition results for captioning, but we haven't yet included a guide here. Please select another programming language to get started and learn about the concepts, or see the Swift reference and samples linked from the beginning of this article. 



## Next steps

> 
> [Learn more about speech recognition](how-to-recognize-speech.md)
