---
description: Query for audio and video encoders and decoders installed on a device.
title: Query for installed codecs
ms.date: 05/06/2026
ms.topic: article
keywords: windows, winui, codec, encoder, decoder, query
ms.localizationpriority: medium
---

# Query for codecs installed on a device

The [**CodecQuery**](https://learn.microsoft.com/uwp/api/windows.media.core.codecquery) class allows you to query for codecs installed on the current device. The list of codecs that are included with Windows for different device families are listed in the article [Supported codecs](supported-codecs.md), but since users and apps can install additional codecs on a device, you may want to query for codec support at runtime to determine what codecs are available on the current device.

Initialize a new instance of the **CodecQuery** class by calling the constructor.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/winappsdk/audio-video-camera/transcode-winui/cs/TranscodeWinUI/MainWindow.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/media-authoring-processing/codec-query.md)

The [**FindAllAsync**](https://learn.microsoft.com/uwp/api/windows.media.core.codecquery.findallasync) method returns all installed codecs that match the supplied parameters. These parameters include a [**CodecKind**](https://learn.microsoft.com/uwp/api/windows.media.core.codeckind) value specifying whether you are querying for audio or video codecs or both, a [**CodecCategory**](https://learn.microsoft.com/uwp/api/windows.media.core.codeccategory) value specifying whether you are querying for encoders or decoders, and a string that represents the media encoding subtype for which you are querying, such as H.264 video or MP3 audio.

Specify an empty string for the subtype value to return codecs for all subtypes. The following example lists all of the video encoders installed on the device.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/winappsdk/audio-video-camera/transcode-winui/cs/TranscodeWinUI/MainWindow.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/media-authoring-processing/codec-query.md)

The subtype string you pass into **FindAllAsync** can either be a string representation of the subtype GUID which is defined by the system or a FOURCC code for the subtype. The set of supported media subtype GUIDs are listed in the articles [Audio Subtype GUIDs](https://learn.microsoft.com/windows/desktop/medfound/audio-subtype-guids) and [Video Subtype GUIDs](https://learn.microsoft.com/windows/desktop/medfound/video-subtype-guids), but the [**CodecSubtypes**](https://learn.microsoft.com/uwp/api/windows.media.core.codecsubtypes) class provides properties that return the GUID values for each supported subtype. For more information on FOURCC codes, see [FOURCC Codes](https://learn.microsoft.com/windows/desktop/DirectShow/fourcc-codes).

The following example specifies the FOURCC code "H264" to determine if there is an H.264 video decoder installed on the device. You could perform this query before attempting to play back H.264 video content. You can also handle unsupported codecs at playback time. For more information, see [Handle unsupported codecs and unknown errors when opening media items](https://learn.microsoft.com/windows/apps/develop/media-playback/media-playback-with-mediasource#handle-unsupported-codecs-and-unknown-errors-when-opening-media-items).

[Code reference unavailable in this source snapshot: ~/../snippets-windows/winappsdk/audio-video-camera/transcode-winui/cs/TranscodeWinUI/MainWindow.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/media-authoring-processing/codec-query.md)

The following example queries to determine if a FLAC audio encoder is installed on the current device and, if so, a [**MediaEncodingProfile**](https://learn.microsoft.com/uwp/api/Windows.Media.MediaProperties.MediaEncodingProfile) is created for the subtype which could be used for capturing audio to a file or transcoding audio from another format to a FLAC audio file.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/winappsdk/audio-video-camera/transcode-winui/cs/TranscodeWinUI/MainWindow.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/media-authoring-processing/codec-query.md)

## Related topics

* [Media playback](https://learn.microsoft.com/windows/apps/develop/media-playback/media-playback)
* [Transcode media files](transcode-media-files.md)
* [Supported codecs](supported-codecs.md)
