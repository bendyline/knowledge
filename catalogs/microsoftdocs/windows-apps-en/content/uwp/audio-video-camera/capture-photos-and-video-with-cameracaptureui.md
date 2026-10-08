---
ms.assetid: CC0D6E9B-128D-488B-912F-318F5EE2B8D3
description: This article describes how to use the [**CameraCaptureUI**](/uwp/api/windows.media.capture.cameracaptureui) class to capture photos or videos from a UWP app by using the camera UI built into Windows.
title: Capture photos and video in a UWP app with the Windows built-in camera UI
ms.date: 02/08/2017
ms.topic: article
keywords: windows 10, uwp
ms.localizationpriority: medium
dev_langs: 
- csharp
- cppwinrt
---

# Capture photos and video in a UWP app with the Windows built-in camera UI

This article describes how to use the [**CameraCaptureUI**](https://learn.microsoft.com/uwp/api/windows.media.capture.cameracaptureui) class to capture photos or videos by using the camera UI built into Windows. This feature is easy to use. It allows your app to get a user-captured photo or video with just a few lines of code.

> **Note:**
> The **CameraCaptureUI** class in the [Windows.Media.Capture](https://learn.microsoft.com/uwp/api/windows.media.capture) namespace is only supported for UWP apps. For desktop apps using WinUI 3, use the new version of this feature in the [Microsoft.Windows.Media.Capture](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.windows.media.capture) namespace. For more information, see [Capture photos and video in a desktop app with the Windows built-in camera UI](https://learn.microsoft.com/windows/apps/develop/camera/cameracaptureui).

If you want to provide your own camera UI, or if your scenario requires more robust, low-level control of the capture operation, then you should use the [**MediaCapture**](https://learn.microsoft.com/uwp/api/Windows.Media.Capture.MediaCapture) class, and implement your own capture experience. For more information, see [Basic photo, video, and audio capture with MediaCapture](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/uwp/audio-video-camera/basic-photo-video-and-audio-capture-with-MediaCapture.md).

> **Note:**
> You shouldn't specify the **webcam** nor **microphone** capabilities in your app manifest file if your app only uses **CameraCaptureUI**. If you do, your app will be displayed in the device's camera privacy settings, but even if the user denies camera access to your app, this won't prevent the **CameraCaptureUI** from capturing media. <p>This is because the Windows built-in camera app is a trusted first-party app that requires the user to initiate photo, audio, and video capture with a button press. Your app may fail Windows Application Certification Kit certification when submitted to Microsoft Store if you specify the webcam or microphone capabilities when using **CameraCaptureUI** as your only photo capture mechanism.<p>
You must specify the **webcam** or **microphone** capabilities in your app manifest file if you're using **MediaCapture** to capture audio, photos, or video programmatically.

## Capture a photo with CameraCaptureUI

To use the camera capture UI, include the [**Windows.Media.Capture**](https://learn.microsoft.com/uwp/api/Windows.Media.Capture) namespace in your project. To do file operations with the returned image file, include [**Windows.Storage**](https://learn.microsoft.com/uwp/api/Windows.Storage).

[Code reference unavailable in this source snapshot: ~/../snippets-windows/windows-uwp/audio-video-camera/CameraCaptureUIWin10/cs/MainPage.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/uwp/audio-video-camera/capture-photos-and-video-with-cameracaptureui.md)
[Code reference unavailable in this source snapshot: ~/../snippets-windows/windows-uwp/audio-video-camera/CameraCaptureUIWin10/cppwinrt/MainPage.h](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/uwp/audio-video-camera/capture-photos-and-video-with-cameracaptureui.md)

To capture a photo, create a new [**CameraCaptureUI**](https://learn.microsoft.com/uwp/api/Windows.Media.Capture.CameraCaptureUI) object. By using the object's [**PhotoSettings**](https://learn.microsoft.com/uwp/api/windows.media.capture.cameracaptureui.photosettings) property, you can specify properties for the returned photo, such as the image format of the photo. By default, the camera capture UI supports cropping the photo before it's returned. This can be disabled with the [**AllowCropping**](https://learn.microsoft.com/uwp/api/windows.media.capture.cameracaptureuiphotocapturesettings.allowcropping) property. This example sets the [**CroppedSizeInPixels**](https://learn.microsoft.com/uwp/api/windows.media.capture.cameracaptureuiphotocapturesettings.croppedsizeinpixels) to request that the returned image be 200 x 200 in pixels.

> **Note:**
> Image cropping in the **CameraCaptureUI** isn't supported for devices in the Mobile device family. The value of the [**AllowCropping**](https://learn.microsoft.com/uwp/api/windows.media.capture.cameracaptureuiphotocapturesettings.allowcropping) property is ignored when your app is running on these devices.

Call [**CaptureFileAsync**](https://learn.microsoft.com/uwp/api/windows.media.capture.cameracaptureui.capturefileasync) and specify [**CameraCaptureUIMode.Photo**](https://learn.microsoft.com/uwp/api/Windows.Media.Capture.CameraCaptureUIMode) to specify that a photo should be captured. The method returns a [**StorageFile**](https://learn.microsoft.com/uwp/api/Windows.Storage.StorageFile) instance containing the image if the capture is successful. If the user cancels the capture, the returned object is null.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/windows-uwp/audio-video-camera/CameraCaptureUIWin10/cs/MainPage.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/uwp/audio-video-camera/capture-photos-and-video-with-cameracaptureui.md)
[Code reference unavailable in this source snapshot: ~/../snippets-windows/windows-uwp/audio-video-camera/CameraCaptureUIWin10/cppwinrt/MainPage.cpp](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/uwp/audio-video-camera/capture-photos-and-video-with-cameracaptureui.md)

The **StorageFile** containing the captured photo is given a dynamically generated name and saved in your app's local folder. To better organize your captured photos, you can move the file to a different folder.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/windows-uwp/audio-video-camera/CameraCaptureUIWin10/cs/MainPage.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/uwp/audio-video-camera/capture-photos-and-video-with-cameracaptureui.md)
[Code reference unavailable in this source snapshot: ~/../snippets-windows/windows-uwp/audio-video-camera/CameraCaptureUIWin10/cppwinrt/MainPage.cpp](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/uwp/audio-video-camera/capture-photos-and-video-with-cameracaptureui.md)

To use your photo in your app, you may want to create a [**SoftwareBitmap**](https://learn.microsoft.com/uwp/api/Windows.Graphics.Imaging.SoftwareBitmap) object that can be used with several different Universal Windows app features.

First, include the [**Windows.Graphics.Imaging**](https://learn.microsoft.com/uwp/api/Windows.Graphics.Imaging) namespace in your project.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/windows-uwp/audio-video-camera/CameraCaptureUIWin10/cs/MainPage.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/uwp/audio-video-camera/capture-photos-and-video-with-cameracaptureui.md)
[Code reference unavailable in this source snapshot: ~/../snippets-windows/windows-uwp/audio-video-camera/CameraCaptureUIWin10/cppwinrt/MainPage.h](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/uwp/audio-video-camera/capture-photos-and-video-with-cameracaptureui.md)

Call [**OpenAsync**](https://learn.microsoft.com/uwp/api/windows.storage.istoragefile.openasync) to get a stream from the image file. Call [**BitmapDecoder.CreateAsync**](https://learn.microsoft.com/uwp/api/windows.graphics.imaging.bitmapdecoder.createasync) to get a bitmap decoder for the stream. Then, call [**GetSoftwareBitmap**](https://learn.microsoft.com/uwp/api/windows.graphics.imaging.bitmapdecoder.getsoftwarebitmapasync) to get a **SoftwareBitmap** representation of the image.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/windows-uwp/audio-video-camera/CameraCaptureUIWin10/cs/MainPage.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/uwp/audio-video-camera/capture-photos-and-video-with-cameracaptureui.md)
[Code reference unavailable in this source snapshot: ~/../snippets-windows/windows-uwp/audio-video-camera/CameraCaptureUIWin10/cppwinrt/MainPage.cpp](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/uwp/audio-video-camera/capture-photos-and-video-with-cameracaptureui.md)

To display the image in your UI, declare an [**Image**](https://learn.microsoft.com/uwp/api/Windows.UI.Xaml.Controls.Image) control in your XAML page.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/windows-uwp/audio-video-camera/CameraCaptureUIWin10/cs/MainPage.xaml](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/uwp/audio-video-camera/capture-photos-and-video-with-cameracaptureui.md)
[Code reference unavailable in this source snapshot: ~/../snippets-windows/windows-uwp/audio-video-camera/CameraCaptureUIWin10/cppwinrt/MainPage.xaml](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/uwp/audio-video-camera/capture-photos-and-video-with-cameracaptureui.md)

To use the software bitmap in your XAML page, include the using [**Windows.UI.Xaml.Media.Imaging**](https://learn.microsoft.com/uwp/api/Windows.UI.Xaml.Media.Imaging) namespace in your project.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/windows-uwp/audio-video-camera/CameraCaptureUIWin10/cs/MainPage.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/uwp/audio-video-camera/capture-photos-and-video-with-cameracaptureui.md)
[Code reference unavailable in this source snapshot: ~/../snippets-windows/windows-uwp/audio-video-camera/CameraCaptureUIWin10/cppwinrt/MainPage.h](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/uwp/audio-video-camera/capture-photos-and-video-with-cameracaptureui.md)

The **Image** control requires that the image source be in BGRA8 format with premultiplied alpha or no alpha. Call the static method [**SoftwareBitmap.Convert**](https://learn.microsoft.com/uwp/api/windows.graphics.imaging.softwarebitmap.convert) to create a new software bitmap with the desired format. Next, create a new [**SoftwareBitmapSource**](https://learn.microsoft.com/uwp/api/Windows.UI.Xaml.Media.Imaging.SoftwareBitmapSource) object and call it [**SetBitmapAsync**](https://learn.microsoft.com/uwp/api/windows.ui.xaml.media.imaging.softwarebitmapsource.setbitmapasync) to assign the software bitmap to the source. Finally, set the **Image** control's [**Source**](https://learn.microsoft.com/uwp/api/windows.ui.xaml.controls.image.source) property to display the captured photo in the UI.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/windows-uwp/audio-video-camera/CameraCaptureUIWin10/cs/MainPage.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/uwp/audio-video-camera/capture-photos-and-video-with-cameracaptureui.md)
[Code reference unavailable in this source snapshot: ~/../snippets-windows/windows-uwp/audio-video-camera/CameraCaptureUIWin10/cppwinrt/MainPage.cpp](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/uwp/audio-video-camera/capture-photos-and-video-with-cameracaptureui.md)

## Capture a video with CameraCaptureUI

To capture a video, create a new [**CameraCaptureUI**](https://learn.microsoft.com/uwp/api/Windows.Media.Capture.CameraCaptureUI) object. By using the object's [**VideoSettings**](https://learn.microsoft.com/uwp/api/windows.media.capture.cameracaptureui.videosettings) property, you can specify properties for the returned video, such as the format of the video.

Call [**CaptureFileAsync**](https://learn.microsoft.com/uwp/api/windows.media.capture.cameracaptureui.capturefileasync) and specify [**Video**](https://learn.microsoft.com/uwp/api/windows.media.capture.cameracaptureui.videosettings) to capture a video. The method returns a [**StorageFile**](https://learn.microsoft.com/uwp/api/Windows.Storage.StorageFile) instance containing the video if the capture is successful. If you cancel the capture, the returned object is null.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/windows-uwp/audio-video-camera/CameraCaptureUIWin10/cs/MainPage.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/uwp/audio-video-camera/capture-photos-and-video-with-cameracaptureui.md)
[Code reference unavailable in this source snapshot: ~/../snippets-windows/windows-uwp/audio-video-camera/CameraCaptureUIWin10/cppwinrt/MainPage.cpp](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/uwp/audio-video-camera/capture-photos-and-video-with-cameracaptureui.md)

What you do with the captured video file depends on the scenario for your app. The rest of this article shows you how to quickly create a media composition from one or more captured videos and show it in your UI.

First, add a [**MediaPlayerElement**](https://learn.microsoft.com/uwp/api/Windows.UI.Xaml.Controls.MediaPlayerElement) control in which the video composition will display on your XAML page.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/windows-uwp/audio-video-camera/CameraCaptureUIWin10/cs/MainPage.xaml](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/uwp/audio-video-camera/capture-photos-and-video-with-cameracaptureui.md)

When the video file returns from the camera capture UI, create a new [**MediaSource**](https://learn.microsoft.com/uwp/api/windows.media.core.mediasource) by calling **[CreateFromStorageFile](https://learn.microsoft.com/uwp/api/windows.media.core.mediasource.createfromstoragefile)**. Call the **[Play](https://learn.microsoft.com/uwp/api/windows.media.playback.mediaplayer.Play)** method of the default **[MediaPlayer](https://learn.microsoft.com/uwp/api/windows.media.playback.mediaplayer)** associated with the **MediaPlayerElement** to play the video.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/windows-uwp/audio-video-camera/CameraCaptureUIWin10/cs/MainPage.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/uwp/audio-video-camera/capture-photos-and-video-with-cameracaptureui.md)
[Code reference unavailable in this source snapshot: ~/../snippets-windows/windows-uwp/audio-video-camera/CameraCaptureUIWin10/cppwinrt/MainPage.cpp](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/uwp/audio-video-camera/capture-photos-and-video-with-cameracaptureui.md)

## Related topics

* [Camera](camera.md)
* [Basic photo, video, and audio capture with MediaCapture](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/uwp/audio-video-camera/basic-photo-video-and-audio-capture-with-MediaCapture.md)
* [CameraCaptureUI](https://learn.microsoft.com/uwp/api/Windows.Media.Capture.CameraCaptureUI)
