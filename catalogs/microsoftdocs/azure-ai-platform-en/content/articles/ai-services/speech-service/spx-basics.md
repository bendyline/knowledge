---
title: "Quickstart: The Speech CLI - Speech service"
titleSuffix: Foundry Tools
description: In this Azure Speech in Foundry Tools CLI quickstart, you interact with speech to text, text to speech, and speech translation without having to write code.
author: PatrickFarley
manager: mcleans
ms.service: azure-speech-foundry-tools
ms.topic: quickstart
ms.date: 02/25/2026
ms.author: pafarley
ms.custom: mode-api
# Customer intent: As a developer, I want to learn how to use the Azure Speech in Foundry Tools CLI to interact with speech to text, text to speech, and speech translation without writing code.
---

# Quickstart: Get started with the Azure Speech in Foundry Tools CLI

In this article, you learn how to use the Azure Speech CLI (also called SPX) to access Speech services such as speech to text, text to speech, and speech translation, without having to write any code. The Speech CLI is production ready, and you can use it to automate simple workflows in the Speech service by using `.bat` or shell scripts.

This article assumes that you have working knowledge of the Command Prompt window, terminal, or PowerShell.

> **Note:**
> In PowerShell, the [stop-parsing token](https://learn.microsoft.com/powershell/module/microsoft.powershell.core/about/about_special_characters#stop-parsing-token---) (`--%`) should follow `spx`. For example, run `spx --% config @region` to view the current region config value.
 
## Download and install


#### [Windows](#tab/windowsinstall)

Follow these steps to install the Speech CLI on Windows:

1. Install the [Microsoft Visual C++ Redistributable for Visual Studio](https://learn.microsoft.com/cpp/windows/latest-supported-vc-redist#latest-microsoft-visual-c-redistributable-version) for your platform. Installing it for the first time might require a restart.
1. Install [.NET 8](https://learn.microsoft.com/dotnet/core/install/windows?tabs=net60#runtime-information).
1. Install the Speech CLI via the .NET CLI by entering this command:

   ```dotnetcli
   dotnet tool install --global Microsoft.CognitiveServices.Speech.CLI
   ```
   To update the Speech CLI, enter this command:

   ```dotnetcli
   dotnet tool update --global Microsoft.CognitiveServices.Speech.CLI
   ```

Enter `spx` or `spx help` to see help for the Speech CLI.

### Font limitations

On Windows, the Speech CLI can show only fonts that are available to the command prompt on the local computer. [Windows Terminal](https://www.microsoft.com/p/windows-terminal/9n0dx20hk701) supports all fonts that the Speech CLI produces interactively.

If you output to a file, a text editor like Notepad or a web browser like Microsoft Edge can also show all fonts.

#### [Linux](#tab/linuxinstall)

The following Linux distributions are supported for x64 architectures that use the Speech CLI:

- Ubuntu 20.04/22.04/24.04
- Debian 11/12

> **Note:**
> The Speech SDK (not the Speech CLI) supports additional architectures. For more information, see [About the Speech SDK](speech-sdk.md).

Follow these steps to install the Speech CLI on Linux on an x64 CPU:

1. Install the [.NET 8](https://learn.microsoft.com/dotnet/core/install/linux).
2. Install the Speech CLI via the .NET CLI by entering this command:

   ```dotnetcli
   dotnet tool install --global Microsoft.CognitiveServices.Speech.CLI
   ```
   To update the Speech CLI, enter this command:

   ```dotnetcli
   dotnet tool update --global Microsoft.CognitiveServices.Speech.CLI
   ```

3. Install GStreamer for [compressed audio support](how-to-use-codec-compressed-audio-input-streams.md).

Enter `spx` to see help for the Speech CLI.

#### [macOS](#tab/macOS)

Follow these steps to install the Speech CLI on macOS 10.14 or later:

1. Install [.NET 8](https://learn.microsoft.com/dotnet/core/install/macos#runtime-information).
1. Install the Speech CLI via the .NET CLI by entering this command:

   ```dotnetcli
   dotnet tool install --global Microsoft.CognitiveServices.Speech.CLI
   ```
   To update the Speech CLI, enter this command:

   ```dotnetcli
   dotnet tool update --global Microsoft.CognitiveServices.Speech.CLI
   ```

Enter `spx` or `spx help` to see help for the Speech CLI.

#### [Docker (Windows, Linux, macOS)](#tab/dockerinstall)

The following example pulls a public container image from Docker Hub. We recommend that you authenticate with your Docker Hub account (`docker login`) first instead of making an anonymous pull request. To improve reliability when you're using public content, import and manage the image in a private Azure Container Registry. [Learn more about working with public images](https://learn.microsoft.com/azure/container-registry/buffer-gate-public-content).

Follow these steps to install the Speech CLI in a Docker container:

1. <a href="https://www.docker.com/get-started" target="_blank">Install Docker Desktop</a> for your platform if it isn't already installed.
2. In a new command prompt or terminal, enter this command:
   ```console
   docker pull msftspeech/spx
   ```

Enter this command to display help information for the Speech CLI:

```console
docker run -it --rm msftspeech/spx help
```

### Mount a directory in the container

The Speech CLI tool saves configuration settings as files. It loads these files when you're performing any command (except help commands).

When you're using the Speech CLI within a Docker container, you must mount a local directory from the container, so the tool can:

- Store or find the configuration settings.
- Read or write any files that the command requires, such as audio files of speech.

On Windows, enter this command to create a local directory that the Speech CLI can use from within the container:

`mkdir c:\spx-data`

On Linux or macOS, enter this command in a terminal to create a directory and see its absolute path:

```bash
mkdir ~/spx-data
cd ~/spx-data
pwd
```

You'll use the absolute path when you call the Speech CLI.

### Run the Speech CLI in the container

This documentation shows the Speech CLI `spx` command used in non-Docker installations. When you're calling the `spx` command in a Docker container, you must mount a directory in the container to your file system where the Speech CLI can store and find configuration values and read and write files.

On Windows, your commands start like this:

```console
docker run -it -v c:\spx-data:/data --rm msftspeech/spx
```

On Linux or macOS, your commands look like the following sample. Replace `ABSOLUTE_PATH` with the absolute path for your mounted directory. The `pwd` command returned this path in the previous section. If you run this command before setting your key and region, you'll get an error that tells you to set your key and region.

```console
sudo docker run -it -v ABSOLUTE_PATH:/data --rm msftspeech/spx
```

To use the `spx` command installed in a container, always enter the full command as shown in the preceding sample, followed by the parameters of your request. For example, on Windows, this command sets your key:

```console
docker run -it -v c:\spx-data:/data --rm msftspeech/spx config @key --set SUBSCRIPTION-KEY
```

For more extended interaction with the command-line tool, you can start a container with an interactive Bash shell by adding an `entrypoint` parameter. On Windows, enter this command to start a container that exposes an interactive command-line interface where you can enter multiple `spx` commands:

```console
docker run -it --entrypoint=/bin/bash -v c:\spx-data:/data --rm msftspeech/spx
```

You can combine that with AZ Login and have SPX Init guide you through creating the speech keys and selecting a matching data region without having to use the Azure portal. The keys will automatically be stored for later use.

   ```
   docker run -it --rm --entrypoint /bin/bash -v c:\spx-data:/data msftspeech/spx

   az login
   spx init
   ```

***


## Create a resource configuration

# [Terminal](#tab/terminal)

To get started, you need an API key and region identifier (for example, `eastus`, `westus`). Create a Foundry resource for Speech on the [Azure portal](https://portal.azure.com). For more information, see [Create a Foundry resource](../multi-service-resource.md?pivots=azportal).

To configure your resource key and region identifier, run the following commands:  

```console
spx config @key --set SPEECH-KEY
spx config @region --set SPEECH-REGION
```

The key and region are stored for future Speech CLI commands. To view the current configuration, run the following commands:

```console
spx config @key
spx config @region
```

As needed, include the `clear` option to remove either stored value:

```console
spx config @key --clear
spx config @region --clear
```

# [PowerShell](#tab/powershell)

To get started, you need an API key and region identifier (for example, `eastus`, `westus`). Create a Foundry resource for Speech on the [Azure portal](https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry). 

To configure your Speech resource key and region identifier, run the following commands in PowerShell: 

```powershell
spx --% config @key --set SPEECH-KEY
spx --% config @region --set SPEECH-REGION
```

The key and region are stored for future SPX commands. To view the current configuration, run the following commands:

```powershell
spx --% config @key
spx --% config @region
```

As needed, include the `clear` option to remove either stored value:

```powershell
spx --% config @key --clear
spx --% config @region --clear
```

***

## Basic usage

> **Important:**
> When you use the Speech CLI in a container, include the `--host` option. You must also specify `--key none` to ensure that the CLI doesn't try to use a Speech key for authentication. For example, run `spx recognize --key none --host wss://localhost:5000/ --file myaudio.wav` to recognize speech from an audio file in a [speech to text container](speech-container-stt.md).

This section shows a few basic SPX commands that are often useful for first-time testing and experimentation. Run the following command to view the in-tool help:

```console
spx
```

You can search help topics by keyword. For example, to see a list of Speech CLI usage examples, run the following command:

```console
spx help find --topics "examples"
```

To see options for the `recognize` command, run the following command:

```console
spx help recognize
```

More help commands are listed in the console output. You can enter these commands to get detailed help about subcommands.

## Speech to text (speech recognition)

> **Tip:**
> If you get stuck or want to learn more about the Speech CLI recognition options, you can run ```spx help recognize```.

### Recognize speech from a microphone

1. Run the following command to start speech recognition from a microphone:

   ```console
   spx recognize --microphone --source en-US
   ```

1. Speak into the microphone, and you see transcription of your words into text in real-time. The Speech CLI stops after a period of silence, 30 seconds, or when you select **Ctrl**+**C**.

   ```output
   Connection CONNECTED...
   RECOGNIZED: I'm excited to try speech to text.
   ```

> **Note:**
> You can't use your computer's microphone when you run the Speech CLI within a Docker container. However, you can read from and save audio files in your local mounted directory. 

### Recognize speech from a file

To recognize speech from an audio file, use `--file` instead of `--microphone`. For compressed audio files such as MP4, install GStreamer and use `--format`. For more information, see [How to use compressed input audio](how-to-use-codec-compressed-audio-input-streams.md).

# [Terminal](#tab/terminal)

```console
spx recognize --file YourAudioFile.wav
spx recognize --file YourAudioFile.mp4 --format any
```

# [PowerShell](#tab/powershell)

```powershell
spx recognize --file YourAudioFile.wav
spx --% recognize --file YourAudioFile.mp4 --format any
```

***

### Phrase lists
To improve recognition accuracy of specific words or utterances, use a [phrase list](improve-accuracy-phrase-list.md). You include a phrase list in-line or with a text file along with the `recognize` command:

# [Terminal](#tab/terminal)

```console
spx recognize --microphone --phrases "Contoso;Jessie;Rehaan;"
spx recognize --microphone --phrases @phrases.txt
```

# [PowerShell](#tab/powershell)

```powershell
spx --% recognize --microphone --phrases "Contoso;Jessie;Rehaan;"
spx --% recognize --microphone --phrases @phrases.txt

```

***

### Language support
To change the speech recognition language, replace `en-US` with another [supported language](language-support.md). For example, use `es-ES` for Spanish (Spain). If you don't specify a language, the default is `en-US`.

```console
spx recognize --microphone --source es-ES
```

### Continuous recognition

For continuous recognition of audio longer than 30 seconds, append `--continuous`:

```console
spx recognize --microphone --source es-ES --continuous
```

## Text to speech (speech synthesis)

> **Tip:**
> If you get stuck or want to learn more about the Speech CLI recognition options, you can run ```spx help synthesize```.

The following command takes text as input and then outputs the synthesized speech to the current active output device (for example, your computer speakers).

```console
spx synthesize --text "Testing synthesis using the Speech CLI" --speakers
```

You can also save the synthesized output to a file. In this example, let's create a file named *my-sample.wav* in the directory where you're running the command.

```console
spx synthesize --text "Enjoy using the Speech CLI." --audio output my-sample.wav
```

These examples presume that you're testing in English. However, Speech service supports speech synthesis in many languages. You can pull down a full list of voices either by running the following command or by visiting the [language support page](language-support.md?tabs=tts).

```console
spx synthesize --voices
```

Here's a command for using one of the voices you discovered.

```console
spx synthesize --text "Bienvenue chez moi." --voice fr-FR-AlainNeural --speakers
```


## Speech to text translation

> **Tip:**
> If you get stuck or want to learn more about the Speech CLI translation options, you can run ```spx help translate```.

### Translate speech from a microphone

1. Run the following command to start speech translation from a microphone:

   ```console
   spx translate --source en-US --target it --microphone
   ```

1. Speak into the microphone, and you see the transcription of your translated speech in real-time. The Speech CLI stops after a period of silence, 30 seconds, or when you select **Ctrl**+**C**.

   ```output
   Connection CONNECTED...
   TRANSLATING into 'it': Sono (from 'I'm')
   TRANSLATING into 'it': Sono entusiasta (from 'I'm excited to')
   TRANSLATING into 'it': Sono entusiasta di provare la parola (from 'I'm excited to try speech')
   TRANSLATED into 'it': Sono entusiasta di provare la traduzione vocale. (from 'I'm excited to try speech translation.')
   ```

> **Note:**
> You can't use your computer's microphone when you run the Speech CLI within a Docker container. However, you can read from and save audio files in your local mounted directory. 

### Translate speech from a file

To translate speech from an audio file, use `--file` instead of `--microphone`. For compressed audio files such as MP4, install GStreamer and use `--format`. For more information, see [How to use compressed input audio](how-to-use-codec-compressed-audio-input-streams.md).

# [Terminal](#tab/terminal)

```console
spx translate --source en-US --target it --file YourAudioFile.wav
spx translate --source en-US --target it --file YourAudioFile.mp4 --format any
```

# [PowerShell](#tab/powershell)

```powershell
spx translate --source en-US --target it --file YourAudioFile.wav
spx translate --source en-US --target it --file YourAudioFile.mp4 --format any
```

***

### Phrase lists
To improve recognition accuracy of specific words or utterances, use a [phrase list](improve-accuracy-phrase-list.md). You include a phrase list in-line or with a text file along with the `translate` command:

# [Terminal](#tab/terminal)

```console
spx translate --source en-US --target it --microphone --phrases "Contoso;Jessie;Rehaan;"
spx translate --source en-US --target it --microphone --phrases @phrases.txt
```

# [PowerShell](#tab/powershell)

```powershell
spx --% translate --source en-US --target it --microphone --phrases "Contoso;Jessie;Rehaan;"
spx --% translate --source en-US --target it --microphone --phrases @phrases.txt

```

***

### Language support
To change the speech recognition language, replace `en-US` with another [supported language](language-support.md?tabs=stt#supported-languages). Specify the full locale with a dash (`-`) separator. For example, `es-ES` for Spanish (Spain). The default language is `en-US` if you don't specify a language.

```console
spx translate --microphone --source es-ES
```

To change the translation target language, replace `it` with another [supported language](language-support.md?tabs=speech-translation#supported-languages). With few exceptions you only specify the language code that precedes the locale dash (`-`) separator. For example, use `es` for Spanish (Spain) instead of `es-ES`. The default language is `en` if you don't specify a language.

```console
spx translate --microphone --target es
```

### Multiple target languages

When you're translating into multiple languages, separate the language codes with a semicolon (`;`).

```console
spx translate --microphone --source en-US --target 'ru-RU;fr-FR;es-ES'
```

### Save translation output

If you want to save the output of your translation, use the `--output` flag. In this example, you also read from a file.

```console
spx translate --file /some/file/path/input.wav --source en-US --target ru-RU --output file /some/file/path/russian_translation.txt
```

### Continuous translation

For continuous translation of audio longer than 30 seconds, append `--continuous`:

```console
spx translate --source en-US --target it --microphone --continuous
```



## Next steps

* [Install GStreamer to use the Speech CLI with MP3 and other formats](how-to-use-codec-compressed-audio-input-streams.md)
* [Configuration options for the Speech CLI](spx-data-store-configuration.md)
* [Batch operations with the Speech CLI](spx-batch-operations.md)
