---
author: PatrickFarley
ms.service: azure-speech-foundry-tools
ms.custom: linux-related-content
ms.topic: include
ms.date: 09/08/2020
ms.author: pafarley
---


The Speech SDK and Speech CLI use GStreamer to support different kinds of input audio formats. GStreamer decompresses the audio before it's sent over the wire to the Speech service as raw PCM.


The default audio streaming format is WAV (16 kHz or 8 kHz, 16-bit, and mono PCM). Outside WAV and PCM, the following compressed input formats are also supported through GStreamer:

- MP3
- OPUS/OGG
- FLAC
- ALAW in WAV container
- MULAW in WAV container
- ANY for MP4 container or unknown media format



## GStreamer configuration

The Speech CLI can use [GStreamer](https://gstreamer.freedesktop.org) to handle compressed audio. For licensing reasons, GStreamer binaries aren't compiled and linked with the Speech CLI. You need to install some dependencies and plug-ins. 

GStreamer binaries must be in the system path so that they can be loaded by the Speech CLI at runtime. For example, on Windows, if the Speech CLI finds `libgstreamer-1.0-0.dll` or `gstreamer-1.0-0.dll` (for the latest GStreamer) during runtime, it means the GStreamer binaries are in the system path.

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

The `--format` option specifies the container format for the audio file being recognized. For an mp4 file, set the format to `any` as shown in the following command:

# [Terminal](#tab/terminal)

```console
spx recognize --file YourAudioFile.mp4 --format any
```

# [PowerShell](#tab/powershell)

```powershell
spx --% recognize --file YourAudioFile.mp4 --format any
```

***

To get a list of supported audio formats, run the following command:

# [Terminal](#tab/terminal)

```console
spx help recognize format
```

# [PowerShell](#tab/powershell)

```powershell
spx help recognize format
```

***
