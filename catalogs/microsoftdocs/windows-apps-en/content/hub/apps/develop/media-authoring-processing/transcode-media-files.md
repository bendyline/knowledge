---
description: You can use the Windows.Media.Transcoding APIs to transcode video files from one format to another.
title: Transcode media files
ms.date: 05/06/2026
ms.topic: article
keywords: windows, winui, transcode, media, video, audio
ms.localizationpriority: medium
---

# Transcode media files

You can use the [**Windows.Media.Transcoding**](https://learn.microsoft.com/uwp/api/Windows.Media.Transcoding) APIs to transcode video files from one format to another.

*Transcoding* is the conversion of a digital media file, such as a video or audio file, from one format to another. This is usually done by decoding and then re-encoding the file. For example, you might convert a Windows Media file to MP4 so that it can be played on a portable device that supports MP4 format. Or, you might convert a high-definition video file to a lower resolution. In that case, the re-encoded file might use the same codec as the original file, but it would have a different encoding profile.

## Select source and destination files

The way that your app determines the source and destination files for transcoding depends on your implementation. This example uses a [**FileOpenPicker**](https://learn.microsoft.com/uwp/api/Windows.Storage.Pickers.FileOpenPicker) and a [**FileSavePicker**](https://learn.microsoft.com/uwp/api/Windows.Storage.Pickers.FileSavePicker) to allow the user to pick a source and a destination file.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/winappsdk/audio-video-camera/transcode-winui/cs/TranscodeWinUI/MainWindow.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/media-authoring-processing/transcode-media-files.md)

## Create a media encoding profile

The encoding profile contains the settings that determine how the destination file will be encoded. This is where you have the greatest number of options when you transcode a file.

The [**MediaEncodingProfile**](https://learn.microsoft.com/uwp/api/Windows.Media.MediaProperties.MediaEncodingProfile) class provides static methods for creating predefined encoding profiles:

### Methods for creating Audio-only encoding profiles

| Method | Profile |
| --- | --- |
| [**CreateAlac**](https://learn.microsoft.com/uwp/api/windows.media.mediaproperties.mediaencodingprofile.createalac) | Apple Lossless Audio Codec (ALAC) audio |
| [**CreateFlac**](https://learn.microsoft.com/uwp/api/windows.media.mediaproperties.mediaencodingprofile.createflac) | Free Lossless Audio Codec (FLAC) audio |
| [**CreateM4a**](https://learn.microsoft.com/uwp/api/windows.media.mediaproperties.mediaencodingprofile.createm4a) | AAC audio (M4A) |
| [**CreateMp3**](https://learn.microsoft.com/uwp/api/windows.media.mediaproperties.mediaencodingprofile.createmp3) | MP3 audio |
| [**CreateWav**](https://learn.microsoft.com/uwp/api/windows.media.mediaproperties.mediaencodingprofile.createwav) | WAV audio |
| [**CreateWma**](https://learn.microsoft.com/uwp/api/windows.media.mediaproperties.mediaencodingprofile.createwma) | Windows Media Audio (WMA) |

### Methods for creating audio / video encoding profiles

| Method | Profile |
| --- | --- |
| [**CreateAv1**](https://learn.microsoft.com/uwp/api/windows.media.mediaproperties.mediaencodingprofile.createav1) | AOMedia Video 1 (AV1) video |
| [**CreateAvi**](https://learn.microsoft.com/uwp/api/windows.media.mediaproperties.mediaencodingprofile.createavi) | AVI |
| [**CreateHevc**](https://learn.microsoft.com/uwp/api/windows.media.mediaproperties.mediaencodingprofile.createhevc) | High Efficiency Video Coding (HEVC) video, also known as H.265 video |
| [**CreateMp4**](https://learn.microsoft.com/uwp/api/windows.media.mediaproperties.mediaencodingprofile.createmp4) | MP4 video (H.264 video plus AAC audio) |
| [**CreateVp9**](https://learn.microsoft.com/uwp/api/windows.media.mediaproperties.mediaencodingprofile.createvp9) | VP9 video |
| [**CreateWmv**](https://learn.microsoft.com/uwp/api/windows.media.mediaproperties.mediaencodingprofile.createwmv) | Windows Media Video (WMV) |


The following code creates a profile for MP4 video.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/winappsdk/audio-video-camera/transcode-winui/cs/TranscodeWinUI/MainWindow.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/media-authoring-processing/transcode-media-files.md)

The static [**CreateMp4**](https://learn.microsoft.com/uwp/api/windows.media.mediaproperties.mediaencodingprofile.createmp4) method creates an MP4 encoding profile. The parameter for this method gives the target resolution for the video. In this case, [**VideoEncodingQuality.hd720p**](https://learn.microsoft.com/uwp/api/Windows.Media.MediaProperties.VideoEncodingQuality) means 1280 x 720 pixels at 30 frames per second. ("720p" stands for 720 progressive scan lines per frame.) The other methods for creating predefined profiles all follow this pattern.

Alternatively, you can create a profile that matches an existing media file by using the [**MediaEncodingProfile.CreateFromFileAsync**](https://learn.microsoft.com/uwp/api/windows.media.mediaproperties.mediaencodingprofile.createfromfileasync) method. Or, if you know the exact encoding settings that you want, you can create a new [**MediaEncodingProfile**](https://learn.microsoft.com/uwp/api/Windows.Media.MediaProperties.MediaEncodingProfile) object and fill in the profile details.

## Transcode the file

To transcode the file, create a new [**MediaTranscoder**](https://learn.microsoft.com/uwp/api/Windows.Media.Transcoding.MediaTranscoder) object and call the [**MediaTranscoder.PrepareFileTranscodeAsync**](https://learn.microsoft.com/uwp/api/windows.media.transcoding.mediatranscoder.preparefiletranscodeasync) method. Pass in the source file, the destination file, and the encoding profile. Then call the [**TranscodeAsync**](https://learn.microsoft.com/uwp/api/windows.media.transcoding.preparetranscoderesult.transcodeasync) method on the [**PrepareTranscodeResult**](https://learn.microsoft.com/uwp/api/Windows.Media.Transcoding.PrepareTranscodeResult) object that was returned from the async transcode operation.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/winappsdk/audio-video-camera/transcode-winui/cs/TranscodeWinUI/MainWindow.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/media-authoring-processing/transcode-media-files.md)

## Respond to transcoding progress

You can register events to respond when the progress of the asynchronous [**TranscodeAsync**](https://learn.microsoft.com/uwp/api/windows.media.transcoding.preparetranscoderesult.transcodeasync) changes. These events are part of the async programming framework for Windows apps and are not specific to the transcoding API.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/winappsdk/audio-video-camera/transcode-winui/cs/TranscodeWinUI/MainWindow.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/media-authoring-processing/transcode-media-files.md)
