---
author: PatrickFarley
ms.service: azure-speech-foundry-tools
ms.custom: linux-related-content
ms.topic: include
ms.date: 03/11/2020
ms.author: pafarley
---


[Reference documentation](https://learn.microsoft.com/python/api/azure-cognitiveservices-speech/) | [Package (PyPi)](https://pypi.org/project/azure-cognitiveservices-speech/) | [Additional samples on GitHub](https://aka.ms/speech/github-python)



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

To configure the Speech SDK to accept compressed audio input, create `PullAudioInputStream` or `PushAudioInputStream`. Then, create an `AudioConfig` from an instance of your stream class that specifies the compression format of the stream.

Let's assume that your use case is to use `PullStream` for an `MP3` file. Your code might look like this:

```python

import azure.cognitiveservices.speech as speechsdk

class BinaryFileReaderCallback(speechsdk.audio.PullAudioInputStreamCallback):
    def __init__(self, filename: str):
        super().__init__()
        self._file_h = open(filename, "rb")

    def read(self, buffer: memoryview) -> int:
        print('trying to read {} frames'.format(buffer.nbytes))
        try:
            size = buffer.nbytes
            frames = self._file_h.read(size)

            buffer[:len(frames)] = frames
            print('read {} frames'.format(len(frames)))

            return len(frames)
        except Exception as ex:
            print('Exception in `read`: {}'.format(ex))
            raise

    def close(self) -> None:
        print('closing file')
        try:
            self._file_h.close()
        except Exception as ex:
            print('Exception in `close`: {}'.format(ex))
            raise

def compressed_stream_helper(compressed_format,
        mp3_file_path,
        default_speech_auth):
    callback = BinaryFileReaderCallback(mp3_file_path)
    stream = speechsdk.audio.PullAudioInputStream(stream_format=compressed_format, pull_stream_callback=callback)

    speech_config = speechsdk.SpeechConfig(**default_speech_auth)
    audio_config = speechsdk.audio.AudioConfig(stream=stream)

    speech_recognizer = speechsdk.SpeechRecognizer(speech_config=speech_config, audio_config=audio_config)

    done = False

    def stop_cb(evt):
        """callback that signals to stop continuous recognition upon receiving an event `evt`"""
        print('CLOSING on {}'.format(evt))
        nonlocal done
        done = True

    # Connect callbacks to the events fired by the speech recognizer
    speech_recognizer.recognizing.connect(lambda evt: print('RECOGNIZING: {}'.format(evt)))
    speech_recognizer.recognized.connect(lambda evt: print('RECOGNIZED: {}'.format(evt)))
    speech_recognizer.session_started.connect(lambda evt: print('SESSION STARTED: {}'.format(evt)))
    speech_recognizer.session_stopped.connect(lambda evt: print('SESSION STOPPED {}'.format(evt)))
    speech_recognizer.canceled.connect(lambda evt: print('CANCELED {}'.format(evt)))
    # stop continuous recognition on either session stopped or canceled events
    speech_recognizer.session_stopped.connect(stop_cb)
    speech_recognizer.canceled.connect(stop_cb)

    # Start continuous speech recognition
    speech_recognizer.start_continuous_recognition()
    while not done:
        time.sleep(.5)

    speech_recognizer.stop_continuous_recognition()

def pull_audio_input_stream_compressed_mp3(mp3_file_path: str,
        default_speech_auth):
    # Create a compressed format
    compressed_format = speechsdk.audio.AudioStreamFormat(compressed_stream_format=speechsdk.AudioStreamContainerFormat.MP3)
    compressed_stream_helper(compressed_format, mp3_file_path, default_speech_auth)

```
