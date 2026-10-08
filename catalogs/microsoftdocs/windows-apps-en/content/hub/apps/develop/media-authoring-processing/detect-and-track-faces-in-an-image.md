---
description: This article shows how to use the FaceDetector to detect faces in an image. The FaceTracker is optimized for tracking faces over time in a sequence of video frames.
title: Detect faces in images or videos
ms.date: 05/07/2026
ms.topic: article
keywords: windows, winui, face detection, face tracking, FaceDetector, FaceTracker
ms.localizationpriority: medium
---
# Detect faces in images or videos

This article shows how to use the [**FaceDetector**](https://learn.microsoft.com/uwp/api/Windows.Media.FaceAnalysis.FaceDetector) to detect faces in an image. The [**FaceTracker**](https://learn.microsoft.com/uwp/api/Windows.Media.FaceAnalysis.FaceTracker) is optimized for tracking faces over time in a sequence of video frames.

The code in this article was adapted from the [Basic Face Detection](https://github.com/Microsoft/Windows-universal-samples/tree/master/Samples/BasicFaceDetection) and [Basic Face Tracking](https://github.com/Microsoft/Windows-universal-samples/tree/master/Samples/BasicFaceTracking) samples. You can download these samples to see the code used in context or to use the sample as a starting point for your own app.

## Detect faces in a single image

The [**FaceDetector**](https://learn.microsoft.com/uwp/api/Windows.Media.FaceAnalysis.FaceDetector) class allows you to detect one or more faces in a still image.

Declare a class member variable for the [**FaceDetector**](https://learn.microsoft.com/uwp/api/Windows.Media.FaceAnalysis.FaceDetector) object and for the list of [**DetectedFace**](https://learn.microsoft.com/uwp/api/Windows.Media.FaceAnalysis.DetectedFace) objects that will be detected in the image.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/winappsdk/audio-video-camera/face-detection-winui/cs/FaceDetectionWinUI/MainWindow.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/media-authoring-processing/detect-and-track-faces-in-an-image.md)

Face detection operates on a [**SoftwareBitmap**](https://learn.microsoft.com/uwp/api/Windows.Graphics.Imaging.SoftwareBitmap) object which can be created in a variety of ways. In this example a [**FileOpenPicker**](https://learn.microsoft.com/uwp/api/Windows.Storage.Pickers.FileOpenPicker) is used to allow the user to pick an image file in which faces will be detected. For more information about working with software bitmaps, see [Imaging](imaging.md).

[Code reference unavailable in this source snapshot: ~/../snippets-windows/winappsdk/audio-video-camera/face-detection-winui/cs/FaceDetectionWinUI/MainWindow.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/media-authoring-processing/detect-and-track-faces-in-an-image.md)

Use the [**BitmapDecoder**](https://learn.microsoft.com/uwp/api/Windows.Graphics.Imaging.BitmapDecoder) class to decode the image file into a **SoftwareBitmap**. The face detection process is quicker with a smaller image and so you may want to scale the source image down to a smaller size. This can be performed during decoding by creating a [**BitmapTransform**](https://learn.microsoft.com/uwp/api/Windows.Graphics.Imaging.BitmapTransform) object, setting the [**ScaledWidth**](https://learn.microsoft.com/uwp/api/windows.graphics.imaging.bitmaptransform.scaledwidth) and [**ScaledHeight**](https://learn.microsoft.com/uwp/api/windows.graphics.imaging.bitmaptransform.scaledheight) properties and passing it into the call to [**GetSoftwareBitmapAsync**](https://learn.microsoft.com/uwp/api/windows.graphics.imaging.bitmapdecoder.getsoftwarebitmapasync), which returns the decoded and scaled **SoftwareBitmap**.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/winappsdk/audio-video-camera/face-detection-winui/cs/FaceDetectionWinUI/MainWindow.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/media-authoring-processing/detect-and-track-faces-in-an-image.md)

In the current version, the **FaceDetector** class only supports images in Gray8 or Nv12. The **SoftwareBitmap** class provides the [**Convert**](https://learn.microsoft.com/uwp/api/windows.graphics.imaging.softwarebitmap.convert) method, which converts a bitmap from one format to another. This example converts the source image into the Gray8 pixel format if it is not already in that format. If you want, you can use the [**GetSupportedBitmapPixelFormats**](https://learn.microsoft.com/uwp/api/windows.media.faceanalysis.facedetector.getsupportedbitmappixelformats) and [**IsBitmapPixelFormatSupported**](https://learn.microsoft.com/uwp/api/windows.media.faceanalysis.facedetector.isbitmappixelformatsupported) methods to determine at runtime if a pixel format is supported, in case the set of supported formats is expanded in future versions.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/winappsdk/audio-video-camera/face-detection-winui/cs/FaceDetectionWinUI/MainWindow.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/media-authoring-processing/detect-and-track-faces-in-an-image.md)

Instantiate the **FaceDetector** object by calling [**CreateAsync**](https://learn.microsoft.com/uwp/api/windows.media.faceanalysis.facedetector.createasync) and then calling [**DetectFacesAsync**](https://learn.microsoft.com/uwp/api/windows.media.faceanalysis.facedetector.detectfacesasync), passing in the bitmap that has been scaled to a reasonable size and converted to a supported pixel format. This method returns a list of [**DetectedFace**](https://learn.microsoft.com/uwp/api/Windows.Media.FaceAnalysis.DetectedFace) objects. **ShowDetectedFaces** is a helper method, shown below, that draws squares around the faces in the image.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/winappsdk/audio-video-camera/face-detection-winui/cs/FaceDetectionWinUI/MainWindow.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/media-authoring-processing/detect-and-track-faces-in-an-image.md)

Be sure to dispose of the objects that were created during the face detection process.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/winappsdk/audio-video-camera/face-detection-winui/cs/FaceDetectionWinUI/MainWindow.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/media-authoring-processing/detect-and-track-faces-in-an-image.md)

To display the image and draw boxes around the detected faces, add a [**Canvas**](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.canvas) element to your XAML page.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/winappsdk/audio-video-camera/face-detection-winui/cs/FaceDetectionWinUI/MainWindow.xaml](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/media-authoring-processing/detect-and-track-faces-in-an-image.md)

Define some member variables to style the squares that will be drawn.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/winappsdk/audio-video-camera/face-detection-winui/cs/FaceDetectionWinUI/MainWindow.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/media-authoring-processing/detect-and-track-faces-in-an-image.md)

In the **ShowDetectedFaces** helper method, a new [**ImageBrush**](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.media.imagebrush) is created and the source is set to a [**SoftwareBitmapSource**](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.media.imaging.softwarebitmapsource) created from the **SoftwareBitmap** representing the source image. The background of the XAML **Canvas** control is set to the image brush.

If the list of faces passed into the helper method isn't empty, loop through each face in the list and use the [**FaceBox**](https://learn.microsoft.com/uwp/api/windows.media.faceanalysis.detectedface.facebox) property of the [**DetectedFace**](https://learn.microsoft.com/uwp/api/Windows.Media.FaceAnalysis.DetectedFace) class to determine the position and size of the rectangle within the image that contains the face. Because the **Canvas** control is very likely to be a different size than the source image, you should multiply both the X and Y coordinates and the width and height of the **FaceBox** by a scaling value that is the ratio of the source image size to the actual size of the **Canvas** control.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/winappsdk/audio-video-camera/face-detection-winui/cs/FaceDetectionWinUI/MainWindow.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/media-authoring-processing/detect-and-track-faces-in-an-image.md)

## Track faces in a sequence of frames

If you want to detect faces in video, it is more efficient to use the [**FaceTracker**](https://learn.microsoft.com/uwp/api/Windows.Media.FaceAnalysis.FaceTracker) class rather than the [**FaceDetector**](https://learn.microsoft.com/uwp/api/Windows.Media.FaceAnalysis.FaceDetector) class, although the implementation steps are very similar. The **FaceTracker** uses information about previously processed frames to optimize the detection process.

Declare a class variable for the **FaceTracker** object. This example uses a [**DispatcherTimer**](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.dispatchertimer) to initiate face tracking on a defined interval. A [SemaphoreSlim](https://learn.microsoft.com/dotnet/api/system.threading.semaphoreslim) is used to make sure that only one face tracking operation is running at a time.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/winappsdk/audio-video-camera/face-detection-winui/cs/FaceDetectionWinUI/MainWindow.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/media-authoring-processing/detect-and-track-faces-in-an-image.md)

To initialize the face tracking operation, create a new **FaceTracker** object by calling [**CreateAsync**](https://learn.microsoft.com/uwp/api/windows.media.faceanalysis.facetracker.createasync). Initialize the desired timer interval and then create the timer. The **ProcessCurrentVideoFrame** helper method will be called every time the specified interval elapses.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/winappsdk/audio-video-camera/face-detection-winui/cs/FaceDetectionWinUI/MainWindow.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/media-authoring-processing/detect-and-track-faces-in-an-image.md)

The **ProcessCurrentVideoFrame** helper is called asynchronously by the timer, so the method first calls the semaphore's **Wait** method to see if a tracking operation is ongoing, and if it is the method returns without trying to detect faces. At the end of this method, the semaphore's **Release** method is called, which allows the subsequent call to **ProcessCurrentVideoFrame** to continue.

The [**FaceTracker**](https://learn.microsoft.com/uwp/api/Windows.Media.FaceAnalysis.FaceTracker) class operates on [**VideoFrame**](https://learn.microsoft.com/uwp/api/Windows.Media.VideoFrame) objects. There are multiple ways you can obtain a **VideoFrame** including capturing a preview frame from a running [MediaCapture](https://learn.microsoft.com/uwp/api/Windows.Media.Capture.MediaCapture) object or by implementing the ProcessFrame method of the [**IBasicVideoEffect**](https://learn.microsoft.com/uwp/api/Windows.Media.Effects.IBasicVideoEffect). This example uses an undefined helper method that returns a video frame, **GetLatestFrame**, as a placeholder for this operation. For information about getting video frames from the preview stream of a running media capture device, see [Get a preview frame](https://learn.microsoft.com/windows/uwp/audio-video-camera/get-a-preview-frame).

As with **FaceDetector**, the **FaceTracker** supports a limited set of pixel formats. This example abandons face detection if the supplied frame is not in the Nv12 format.

Call [**ProcessNextFrameAsync**](https://learn.microsoft.com/uwp/api/windows.media.faceanalysis.facetracker.processnextframeasync) to retrieve a list of [**DetectedFace**](https://learn.microsoft.com/uwp/api/Windows.Media.FaceAnalysis.DetectedFace) objects representing the faces in the frame. After you have the list of faces, you can display them in the same manner described above for face detection. Note that, because the face tracking helper method is not called on the UI thread, you must make any UI updates within a call to [**DispatcherQueue.TryEnqueue**](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.dispatching.dispatcherqueue.tryenqueue).

[Code reference unavailable in this source snapshot: ~/../snippets-windows/winappsdk/audio-video-camera/face-detection-winui/cs/FaceDetectionWinUI/MainWindow.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/media-authoring-processing/detect-and-track-faces-in-an-image.md)

## Related topics

* [Basic Face Detection sample](https://github.com/Microsoft/Windows-universal-samples/tree/master/Samples/BasicFaceDetection)
* [Basic Face Tracking sample](https://github.com/Microsoft/Windows-universal-samples/tree/master/Samples/BasicFaceTracking)
