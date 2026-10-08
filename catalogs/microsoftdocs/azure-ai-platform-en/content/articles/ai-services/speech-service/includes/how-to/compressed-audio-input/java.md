---
author: PatrickFarley
ms.service: azure-speech-foundry-tools
ms.topic: include
ms.date: 02/28/2023
ms.custom: devx-track-java, linux-related-content
ms.author: pafarley
---


[Reference documentation](https://learn.microsoft.com/java/api/com.microsoft.cognitiveservices.speech) | [Additional samples on GitHub](https://aka.ms/speech/github-java)



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

### [Android](#tab/java-android)



Handling compressed audio is implemented by using [GStreamer](https://gstreamer.freedesktop.org). For licensing reasons, GStreamer binaries aren't compiled and linked with the Speech SDK. Instead, you need to use the prebuilt binaries for Android. To download the prebuilt libraries, see [Installing for Android development](https://gstreamer.freedesktop.org/documentation/installing/for-android-development.html?gi-language=c).

The `libgstreamer_android.so` object is required. Make sure that all the GStreamer plug-ins (from the Android.mk file that follows) are linked in `libgstreamer_android.so`. When you use the Speech SDK with GStreamer version 1.18.3, `libc++_shared.so` is also required to be present from android ndk.

```makefile
GSTREAMER_PLUGINS := coreelements app audioconvert mpg123 \
    audioresample audioparsers ogg opusparse \
    opus wavparse alaw mulaw flac
```

An example `Android.mk` and `Application.mk` file are provided here. Follow these steps to create the `gstreamer` shared object:`libgstreamer_android.so`.

```makefile
# Android.mk
LOCAL_PATH := $(call my-dir)

include $(CLEAR_VARS)

LOCAL_MODULE    := dummy
LOCAL_SHARED_LIBRARIES := gstreamer_android
include $(BUILD_SHARED_LIBRARY)

ifndef GSTREAMER_ROOT_ANDROID
$(error GSTREAMER_ROOT_ANDROID is not defined!)
endif

ifndef APP_BUILD_SCRIPT
$(error APP_BUILD_SCRIPT is not defined!)
endif

ifndef TARGET_ARCH_ABI
$(error TARGET_ARCH_ABI is not defined!)
endif

ifeq ($(TARGET_ARCH_ABI),armeabi)
GSTREAMER_ROOT        := $(GSTREAMER_ROOT_ANDROID)/arm
else ifeq ($(TARGET_ARCH_ABI),armeabi-v7a)
GSTREAMER_ROOT        := $(GSTREAMER_ROOT_ANDROID)/armv7
else ifeq ($(TARGET_ARCH_ABI),arm64-v8a)
GSTREAMER_ROOT        := $(GSTREAMER_ROOT_ANDROID)/arm64
else ifeq ($(TARGET_ARCH_ABI),x86)
GSTREAMER_ROOT        := $(GSTREAMER_ROOT_ANDROID)/x86
else ifeq ($(TARGET_ARCH_ABI),x86_64)
GSTREAMER_ROOT        := $(GSTREAMER_ROOT_ANDROID)/x86_64
else
$(error Target arch ABI not supported: $(TARGET_ARCH_ABI))
endif

GSTREAMER_NDK_BUILD_PATH  := $(GSTREAMER_ROOT)/share/gst-android/ndk-build/
include $(GSTREAMER_NDK_BUILD_PATH)/plugins.mk
GSTREAMER_PLUGINS         :=  $(GSTREAMER_PLUGINS_CORE) \ 
                              $(GSTREAMER_PLUGINS_CODECS) \ 
                              $(GSTREAMER_PLUGINS_PLAYBACK) \
                              $(GSTREAMER_PLUGINS_CODECS_GPL) \
                              $(GSTREAMER_PLUGINS_CODECS_RESTRICTED)
GSTREAMER_EXTRA_LIBS      := -liconv -lgstbase-1.0 -lGLESv2 -lEGL
include $(GSTREAMER_NDK_BUILD_PATH)/gstreamer-1.0.mk
```

```makefile
# Application.mk
APP_STL = c++_shared
APP_PLATFORM = android-21
APP_BUILD_SCRIPT = Android.mk
```

You can build `libgstreamer_android.so` by using the following command on Ubuntu 18.04 or 20.04. The following command lines have been tested for [GStreamer Android version 1.14.4] with [Android NDK b16b.](https://dl.google.com/android/repository/android-ndk-r16b-linux-x86_64.zip)

```sh
# Assuming wget and unzip are already installed on the system
mkdir buildLibGstreamer
cd buildLibGstreamer
wget https://dl.google.com/android/repository/android-ndk-r16b-linux-x86_64.zip
unzip -q -o android-ndk-r16b-linux-x86_64.zip
export PATH=$PATH:$(pwd)/android-ndk-r16b
export NDK_PROJECT_PATH=$(pwd)/android-ndk-r16b
wget https://gstreamer.freedesktop.org/download/
mkdir gstreamer_android
tar -xjf gstreamer-1.0-android-universal-1.14.4.tar.bz2 -C $(pwd)/gstreamer_android/
export GSTREAMER_ROOT_ANDROID=$(pwd)/gstreamer_android

mkdir gstreamer
# Copy the Application.mk and Android.mk from the documentation above and put it inside $(pwd)/gstreamer

# Enable only one of the following at one time to create the shared object for the targeted ABI
echo "building for armeabi-v7a. libgstreamer_android.so will be placed in $(pwd)/armeabi-v7a"
ndk-build -C $(pwd)/gstreamer "NDK_APPLICATION_MK=Application.mk" APP_ABI=armeabi-v7a NDK_LIBS_OUT=$(pwd)

#echo "building for arm64-v8a. libgstreamer_android.so will be placed in $(pwd)/arm64-v8a"
#ndk-build -C $(pwd)/gstreamer "NDK_APPLICATION_MK=Application.mk" APP_ABI=arm64-v8a NDK_LIBS_OUT=$(pwd)

#echo "building for x86_64. libgstreamer_android.so will be placed in $(pwd)/x86_64"
#ndk-build -C $(pwd)/gstreamer "NDK_APPLICATION_MK=Application.mk" APP_ABI=x86_64 NDK_LIBS_OUT=$(pwd)

#echo "building for x86. libgstreamer_android.so will be placed in $(pwd)/x86"
#ndk-build -C $(pwd)/gstreamer "NDK_APPLICATION_MK=Application.mk" APP_ABI=x86 NDK_LIBS_OUT=$(pwd)
```

After the shared object (`libgstreamer_android.so`) is built, place the shared object in the Android app so that the Speech SDK can load it.


### [Linux](#tab/java-linux)


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


### [Windows](#tab/java-windows)


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

To configure the Speech SDK to accept compressed audio input, create a `PullAudioInputStream` or `PushAudioInputStream`. Then, create an `AudioConfig` from an instance of your stream class that specifies the compression format of the stream. Find related sample code in [Speech SDK samples](https://github.com/Azure-Samples/cognitive-services-speech-sdk/blob/master/samples/java/android/compressed-input/app/src/main/java/com/microsoft/cognitiveservices/speech/samples/compressedinput/MainActivity.java).

Let's assume that you have an input stream class called `pullAudio` and are using MP3. Your code might look like this:

```java
String filePath = "whatstheweatherlike.mp3";
PullAudioInputStream pullAudio = AudioInputStream.createPullStream(new BinaryAudioStreamReader(filePath),
    AudioStreamFormat.getCompressedFormat(AudioStreamContainerFormat.MP3));
AudioConfig audioConfig = AudioConfig.fromStreamInput(pullAudio);
```
