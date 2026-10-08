---
description: Learn how to capture a variable photo sequence, which allows you to capture multiple frames of images in rapid succession and configure each frame to use different focus, flash, ISO, exposure, and exposure compensation settings.
title: Variable photo sequence
ms.date: 09/13/2024
ms.topic: article
keywords: windows 10, windows 11, winui3, camera
ms.localizationpriority: medium
---
# Variable photo sequence

This article shows you how to capture a variable photo sequence, which allows you to capture multiple frames of images in rapid succession and configure each frame to use different focus, flash, ISO, exposure, and exposure compensation settings. This feature enables scenarios like creating High Dynamic Range (HDR) images.

If you want to capture HDR images but don't want to implement your own processing algorithm, you can use the [**AdvancedPhotoCapture**](https://learn.microsoft.com/uwp/api/Windows.Media.Capture.AdvancedPhotoCapture) API to use the HDR capabilities built-in to Windows. For more information, see [High dynamic range (HDR) and low-light photo capture](hdr-low-light-photo-capture.md).

> **Note:** 
> This article builds on concepts and code discussed in [Basic photo, video, and audio capture with MediaCapture](basic-photo-capture.md), which describes the steps for implementing basic photo and video capture. It is recommended that you familiarize yourself with the basic media capture pattern in that article before moving on to more advanced capture scenarios. The code in this article assumes that your app already has an instance of MediaCapture that has been properly initialized.

## Set up your app to use variable photo sequence capture

Declare a member variable to store the [**VariablePhotoSequenceCapture**](https://learn.microsoft.com/uwp/api/Windows.Media.Capture.Core.VariablePhotoSequenceCapture) object, which is used to initiate the photo sequence capture. Declare an array of [**SoftwareBitmap**](https://learn.microsoft.com/uwp/api/Windows.Graphics.Imaging.SoftwareBitmap) objects to store each captured image in the sequence. Also, declare an array to store the [**CapturedFrameControlValues**](https://learn.microsoft.com/uwp/api/Windows.Media.Capture.CapturedFrameControlValues) object for each frame. This can be used by your image processing algorithm to determine what settings were used to capture each frame. Finally, declare an index that will be used to track which image in the sequence is currently being captured.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/winappsdk/audio-video-camera/camera-winui/CS/CameraWinUI/MainWindow.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/camera/variable-photo-sequence.md)

## Prepare the variable photo sequence capture

After you have initialized your [**MediaCapture**](https://learn.microsoft.com/uwp/api/Windows.Media.Capture.MediaCapture), make sure that variable photo sequences are supported on the current device by getting an instance of the [**VariablePhotoSequenceController**](https://learn.microsoft.com/uwp/api/Windows.Media.Devices.Core.VariablePhotoSequenceController) from the media capture's [**VideoDeviceController**](https://learn.microsoft.com/uwp/api/Windows.Media.Devices.VideoDeviceController) and checking the [**Supported**](https://learn.microsoft.com/uwp/api/windows.media.devices.core.variablephotosequencecontroller.supported) property.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/winappsdk/audio-video-camera/camera-winui/CS/CameraWinUI/MainWindow.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/camera/variable-photo-sequence.md)

Get a [**FrameControlCapabilities**](https://learn.microsoft.com/uwp/api/Windows.Media.Devices.Core.FrameControlCapabilities) object from the variable photo sequence controller. This object has a property for every setting that can be configured per frame of a photo sequence. These include:

-   [**Exposure**](https://learn.microsoft.com/uwp/api/windows.media.devices.core.framecontrolcapabilities.exposure)
-   [**ExposureCompensation**](https://learn.microsoft.com/uwp/api/windows.media.devices.core.framecontrolcapabilities.exposurecompensation)
-   [**Flash**](https://learn.microsoft.com/uwp/api/windows.media.devices.core.framecontrolcapabilities.flash)
-   [**Focus**](https://learn.microsoft.com/uwp/api/windows.media.devices.core.framecontrolcapabilities.focus)
-   [**IsoSpeed**](https://learn.microsoft.com/uwp/api/windows.media.devices.core.framecontrolcapabilities.isospeed)
-   [**PhotoConfirmation**](https://learn.microsoft.com/uwp/api/windows.media.devices.core.framecontrolcapabilities.photoconfirmationsupported)

This example will set a different exposure compensation value for each frame. To verify that exposure compensation is supported for photo sequences on the current device, check the [**Supported**](https://learn.microsoft.com/uwp/api/windows.media.devices.exposurecompensationcontrol.supported) property of the [**FrameExposureCompensationCapabilities**](https://learn.microsoft.com/uwp/api/Windows.Media.Devices.Core.FrameExposureCompensationCapabilities) object accessed through the **ExposureCompensation** property.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/winappsdk/audio-video-camera/camera-winui/CS/CameraWinUI/MainWindow.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/camera/variable-photo-sequence.md)

Create a new [**FrameController**](https://learn.microsoft.com/uwp/api/Windows.Media.Devices.Core.FrameController) object for each frame you want to capture. This example captures three frames. Set the values for the controls you want to vary for each frame. Then, clear the [**DesiredFrameControllers**](https://learn.microsoft.com/uwp/api/windows.media.devices.core.variablephotosequencecontroller.desiredframecontrollers) collection of the **VariablePhotoSequenceController** and add each frame controller to the collection.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/winappsdk/audio-video-camera/camera-winui/CS/CameraWinUI/MainWindow.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/camera/variable-photo-sequence.md)

Create an [**ImageEncodingProperties**](https://learn.microsoft.com/uwp/api/Windows.Media.MediaProperties.ImageEncodingProperties) object to set the encoding you want to use for the captured images. Call the static method [**MediaCapture.PrepareVariablePhotoSequenceCaptureAsync**](https://learn.microsoft.com/uwp/api/windows.media.capture.mediacapture.preparevariablephotosequencecaptureasync), passing in the encoding properties. This method returns a [**VariablePhotoSequenceCapture**](https://learn.microsoft.com/uwp/api/Windows.Media.Capture.Core.VariablePhotoSequenceCapture) object. Finally, register event handlers for the [**PhotoCaptured**](https://learn.microsoft.com/uwp/api/windows.media.capture.core.variablephotosequencecapture.photocaptured) and [**Stopped**](https://learn.microsoft.com/uwp/api/windows.media.capture.core.variablephotosequencecapture.stopped) events.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/winappsdk/audio-video-camera/camera-winui/CS/CameraWinUI/MainWindow.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/camera/variable-photo-sequence.md)

## Start the variable photo sequence capture

To start the capture of the variable photo sequence, call [**VariablePhotoSequenceCapture.StartAsync**](https://learn.microsoft.com/uwp/api/windows.media.capture.core.variablephotosequencecapture.startasync). Be sure to initialize the arrays for storing the captured images and frame control values and set the current index to 0. Set your app's recording state variable and update your UI to disable starting another capture while this capture is in progress.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/winappsdk/audio-video-camera/camera-winui/CS/CameraWinUI/MainWindow.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/camera/variable-photo-sequence.md)

## Receive the captured frames

The [**PhotoCaptured**](https://learn.microsoft.com/uwp/api/windows.media.capture.core.variablephotosequencecapture.photocaptured) event is raised for each captured frame. Save the frame control values and captured image for the frame and then increment the current frame index. This example shows how to get a [**SoftwareBitmap**](https://learn.microsoft.com/uwp/api/Windows.Graphics.Imaging.SoftwareBitmap) representation of each frame. For more information on using **SoftwareBitmap**, see [Imaging](https://learn.microsoft.com/windows/uwp/audio-video-camera/imaging).

[Code reference unavailable in this source snapshot: ~/../snippets-windows/winappsdk/audio-video-camera/camera-winui/CS/CameraWinUI/MainWindow.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/camera/variable-photo-sequence.md)

## Handle the completion of the variable photo sequence capture

The [**Stopped**](https://learn.microsoft.com/uwp/api/windows.media.capture.core.variablephotosequencecapture.stopped) event is raised when all of the frames in the sequence have been captured. Update the recording state of your app and update your UI to allow the user to initiate new captures. At this point, you can pass the captured images and frame control values to your image processing code.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/winappsdk/audio-video-camera/camera-winui/CS/CameraWinUI/MainWindow.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/camera/variable-photo-sequence.md)

## Update frame controllers

If you want to perform another variable photo sequence capture with different per frame settings, you don't need to completely reinitialize the **VariablePhotoSequenceCapture**. You can either clear the [**DesiredFrameControllers**](https://learn.microsoft.com/uwp/api/windows.media.devices.core.variablephotosequencecontroller.desiredframecontrollers) collection and add new frame controllers or you can modify the existing frame controller values. The following example checks the [**FrameFlashCapabilities**](https://learn.microsoft.com/uwp/api/Windows.Media.Devices.Core.FrameFlashCapabilities) object to verify that the current device supports flash and flash power for variable photo sequence frames. If so, each frame is updated to enable the flash at 100% power. The exposure compensation values that were previously set for each frame are still active.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/winappsdk/audio-video-camera/camera-winui/CS/CameraWinUI/MainWindow.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/camera/variable-photo-sequence.md)

## Clean up the variable photo sequence capture

When you are done capturing variable photo sequences or your app is suspending, clean up the variable photo sequence object by calling [**FinishAsync**](https://learn.microsoft.com/uwp/api/windows.media.capture.core.variablephotosequencecapture.finishasync). Unregister the object's event handlers and set it to null.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/winappsdk/audio-video-camera/camera-winui/CS/CameraWinUI/MainWindow.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/camera/variable-photo-sequence.md)

## Related topics

* [Camera](camera.md)
* [Basic photo, video, and audio capture with MediaCapture](basic-photo-capture.md)
