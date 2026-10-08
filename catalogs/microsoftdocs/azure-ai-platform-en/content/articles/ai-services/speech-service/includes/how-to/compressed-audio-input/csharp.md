---
author: PatrickFarley
ms.service: azure-speech-foundry-tools
ms.topic: include
ms.date: 03/11/2020
ms.author: pafarley
ms.custom: devx-track-csharp, linux-related-content
---


[Reference documentation](https://learn.microsoft.com/dotnet/api/microsoft.cognitiveservices.speech) | [Package (NuGet)](https://www.nuget.org/packages/Microsoft.CognitiveServices.Speech) | [Additional samples on GitHub](https://aka.ms/speech/github-csharp)



The Speech SDK and Speech CLI use GStreamer to support different kinds of input audio formats. GStreamer decompresses the audio before it's sent over the wire to the Speech service as raw PCM.


The default audio streaming format is WAV (16 kHz or 8 kHz, 16-bit, and mono PCM). Outside WAV and PCM, the following compressed input formats are also supported through GStreamer:

- MP3
- OPUS/OGG
- FLAC
- ALAW in WAV container
- MULAW in WAV container
- ANY for MP4 container or unknown media format



## GStreamer configuration

The Speech SDK can use [GStreamer](https://gstreamer.freedesktop.org) to handle compressed audio. For licensing reasons, GStreamer binaries aren't compiled and linked with the Speech SDK. You need to install some dependencies and plug-ins.  

GStreamer binaries must be in the system path so that they can be loaded by the Speech SDK at runtime. For example, on Windows, if the Speech SDK finds `libgstreamer-1.0-0.dll` or `gstreamer-1.0-0.dll` (for the latest GStreamer) during runtime, it means the GStreamer binaries are in the system path.

Choose a platform for installation instructions.

### [Linux](#tab/linux)


You need to install several dependencies and plug-ins.

# [Ubuntu/Debian](#tab/debian)

```sh
sudo apt install libgstreamer1.0-0 \
gstreamer1.0-plugins-base \
gstreamer1.0-plugins-good \
gstreamer1.0-plugins-bad \
gstreamer1.0-plugins-ugly
```

---

For more information, see [Linux installation instructions](https://gstreamer.freedesktop.org/documentation/installing/on-linux.html?gi-language=c) and [supported Linux distributions and target architectures](../../../speech-sdk.md).


### [Windows](#tab/windows)


Make sure that packages of the same platform (x64 or x86) are installed. For example, if you installed the x64 package for Python, you need to install the x64 GStreamer package. The following instructions are for the x64 packages.

1. Create the folder c:\gstreamer.
1. Download the [installer](https://gstreamer.freedesktop.org/download/).
1. Copy the installer to c:\gstreamer.
1. Open PowerShell as an administrator.
1. Run the following command in PowerShell:

    ```powershell
    cd c:\gstreamer
    msiexec /passive INSTALLLEVEL=1000 INSTALLDIR=C:\gstreamer /i gstreamer-1.0-msvc-x86_64-1.18.3.msi
    ```

1. Add the system variable `GST_PLUGIN_PATH` with "C:\gstreamer\1.0\msvc_x86_64\lib\gstreamer-1.0" as the variable value.
1. Add the system variable `GSTREAMER_ROOT_X86_64` with "C:\gstreamer\1.0\msvc_x86_64" as the variable value.
1. Edit the system `PATH` variable to add "C:\gstreamer\1.0\msvc_x86_64\bin" as a new entry.
1. Reboot the machine.

For more information about GStreamer, see [Windows installation instructions](https://gstreamer.freedesktop.org/documentation/installing/on-windows.html?gi-language=c).


***

## Example

To configure the Speech SDK to accept compressed audio input, create `PullAudioInputStream` or `PushAudioInputStream`. Then, create an `AudioConfig` from an instance of your stream class that specifies the compression format of the stream. Find related sample code snippets in [About the Speech SDK audio input stream API](../../../how-to-use-audio-input-streams.md).

Let's assume that you have an input stream class called `pullStream` and are using OPUS/OGG. Your code might look like this:

```csharp
using Microsoft.CognitiveServices.Speech;
using Microsoft.CognitiveServices.Speech.Audio;

// ... omitted for brevity

var speechConfig =
    SpeechConfig.FromSubscription(
        "YourSpeechResoureKey",
        "YourServiceRegion");

// Create an audio config specifying the compressed
// audio format and the instance of your input stream class.
var pullStream = AudioInputStream.CreatePullStream(
    AudioStreamFormat.GetCompressedFormat(AudioStreamContainerFormat.OGG_OPUS));
var audioConfig = AudioConfig.FromStreamInput(pullStream);

using var recognizer = new SpeechRecognizer(speechConfig, audioConfig);
var result = await recognizer.RecognizeOnceAsync();

var text = result.Text;
```
