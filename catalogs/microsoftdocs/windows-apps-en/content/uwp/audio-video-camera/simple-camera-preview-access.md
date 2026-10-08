---
ms.assetid: 9BA3F85A-970F-411C-ACB1-B65768B8548A
description: This article describes how to quickly display the camera preview stream within a XAML page in a Universal Windows Platform (UWP) app.
title: Display the camera preview
ms.date: 02/08/2017
ms.topic: how-to
keywords: windows 10, uwp
ms.localizationpriority: medium
---
# Display the camera preview


This article describes how to quickly display the camera preview stream within a XAML page in a Universal Windows Platform (UWP) app. Creating an app that captures photos and videos using the camera requires you to perform tasks like handling device and camera orientation or setting encoding options for the captured file. For some app scenarios, you may want to just simply show the preview stream from the camera without worrying about these other considerations. This article shows you how to do that with a minimum of code. Note that you should always shut down the preview stream properly when you are done with it by following the steps below.

For information on writing a camera app that captures photos or videos, see [Basic photo, video, and audio capture with MediaCapture](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/uwp/audio-video-camera/basic-photo-video-and-audio-capture-with-MediaCapture.md).

## Add capability declarations to the app manifest

In order for your app to access a device's camera, you must declare that your app uses the *webcam* and *microphone* device capabilities. 

**Add capabilities to the app manifest**

1.  In Microsoft Visual Studio, in **Solution Explorer**, open the designer for the application manifest by double-clicking the **package.appxmanifest** item.
2.  Select the **Capabilities** tab.
3.  Check the box for **Webcam** and the box for **Microphone**.

## Add a CaptureElement to your page

Use a [**CaptureElement**](https://learn.microsoft.com/uwp/api/Windows.UI.Xaml.Controls.CaptureElement) to display the preview stream within your XAML page.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/windows-uwp/audio-video-camera/SimpleCameraPreview_Win10/cs/MainPage.xaml](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/uwp/audio-video-camera/simple-camera-preview-access.md)



## Use MediaCapture to start the preview stream

The [**MediaCapture**](https://learn.microsoft.com/uwp/api/Windows.Media.Capture.MediaCapture) object is your app's interface to the device's camera. This class is a member of the Windows.Media.Capture namespace. The example in this article also uses APIs from the [**Windows.ApplicationModel**](https://learn.microsoft.com/uwp/api/Windows.ApplicationModel) and [System.Threading.Tasks](https://learn.microsoft.com/dotnet/api/system.threading.tasks) namespaces, in addition to those included by the default project template.

Add using directives to include the following namespaces in your page's .cs file.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/windows-uwp/audio-video-camera/SimpleCameraPreview_Win10/cs/MainPage.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/uwp/audio-video-camera/simple-camera-preview-access.md)

Declare a class member variable for the **MediaCapture** object and a boolean to track whether the camera is currently previewing. 

[Code reference unavailable in this source snapshot: ~/../snippets-windows/windows-uwp/audio-video-camera/SimpleCameraPreview_Win10/cs/MainPage.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/uwp/audio-video-camera/simple-camera-preview-access.md)

Declare a variable of type [**DisplayRequest**](https://learn.microsoft.com/uwp/api/Windows.System.Display.DisplayRequest) that will be used to make sure the display does not turn off while the preview is running.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/windows-uwp/audio-video-camera/SimpleCameraPreview_Win10/cs/MainPage.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/uwp/audio-video-camera/simple-camera-preview-access.md)

Create a helper method to start up the camera preview, called **StartPreviewAsync** in this example. Depending on your app's scenario, you may want to call this from the **OnNavigatedTo** event handler that is called when the page is loaded or wait and launch the preview in response to UI events.

Create a new instance of the **MediaCapture** class and call [**InitializeAsync**](https://learn.microsoft.com/uwp/api/windows.media.capture.mediacapture.initializeasync) to initialize the capture device. This method may fail, on devices that don't have a camera for example, so you should call it from within a **try** block. An **UnauthorizedAccessException** will be thrown when you attempt to initialize the camera if the user has disabled camera access in the device's privacy settings. You will also see this exception during development if you have neglected to add the proper capabilities to your app manifest.

**Important** On some device families, a user consent prompt is displayed to the user before your app is granted access to the device's camera. For this reason, you must only call [**MediaCapture.InitializeAsync**](https://learn.microsoft.com/uwp/api/windows.media.capture.mediacapture.initializeasync) from the main UI thread. Attempting to initialize the camera from another thread may result in initialization failure.

> **Note:**
> Windows allows users to grant or deny access to the device's camera in Windows Settings, under **Privacy & Security -> Camera**. When initializing the capture device, apps should check whether they have access to the camera and handle the case where access is denied by the user. For more information, see [Handle the Windows camera privacy setting](https://learn.microsoft.com/windows/uwp/audio-video-camera/camera-privacy-setting).

Connect the **MediaCapture** to the **CaptureElement** by setting the [**Source**](https://learn.microsoft.com/uwp/api/windows.ui.xaml.controls.captureelement.source) property. Start the preview by calling [**StartPreviewAsync**](https://learn.microsoft.com/uwp/api/windows.media.capture.mediacapture.startpreviewasync). This method will throw a **FileLoadException** if another app has exclusive control of the capture device. See the next section for information listening for changes in exclusive control.

Call [**RequestActive**](https://learn.microsoft.com/uwp/api/windows.system.display.displayrequest.requestactive) to make sure the device doesn't go to sleep while the preview is running. Finally, set the [**DisplayInformation.AutoRotationPreferences**](https://learn.microsoft.com/uwp/api/windows.graphics.display.displayinformation.autorotationpreferences) property to [**Landscape**](https://learn.microsoft.com/uwp/api/Windows.Graphics.Display.DisplayOrientations) to prevent the UI and the **CaptureElement** from rotating when the user changes the device orientation. For more information on handling device orientation changes, see [**Handle device orientation with MediaCapture**](handle-device-orientation-with-mediacapture.md).  

[Code reference unavailable in this source snapshot: ~/../snippets-windows/windows-uwp/audio-video-camera/SimpleCameraPreview_Win10/cs/MainPage.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/uwp/audio-video-camera/simple-camera-preview-access.md)

## Handle changes in exclusive control
As stated in the previous section, **StartPreviewAsync** will throw a **FileLoadException** if another app has exclusive control of the capture device. Starting with Windows 10, version 1703, you can register a handler for the [MediaCapture.CaptureDeviceExclusiveControlStatusChanged](https://learn.microsoft.com/uwp/api/Windows.Media.Capture.MediaCapture.CaptureDeviceExclusiveControlStatusChanged) event, which is raised whenever the exclusive control status of the device changes. In the handler for this event, check the [MediaCaptureDeviceExclusiveControlStatusChangedEventArgs.Status](https://learn.microsoft.com/uwp/api/windows.media.capture.mediacapturedeviceexclusivecontrolstatuschangedeventargs.Status) property to see what the current status is. If the new status is **SharedReadOnlyAvailable**, then you know you can't currently start the preview and you may want to update your UI to alert the user. If the new status is **ExclusiveControlAvailable**, then you can try starting the camera preview again.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/windows-uwp/audio-video-camera/SimpleCameraPreview_Win10/cs/MainPage.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/uwp/audio-video-camera/simple-camera-preview-access.md)

## Shut down the preview stream

When you are done using the preview stream, you should always shut down the stream and properly dispose of the associated resources to ensure that the camera is available to other apps on the device. The required steps for shutting down the preview stream are:

-   If the camera is currently previewing, call [**StopPreviewAsync**](https://learn.microsoft.com/uwp/api/windows.media.capture.mediacapture.stoppreviewasync) to stop the preview stream. An exception will be thrown if you call **StopPreviewAsync** while the preview is not running.
-   Set the [**Source**](https://learn.microsoft.com/uwp/api/windows.ui.xaml.controls.captureelement.source) property of the **CaptureElement** to null. Use [**CoreDispatcher.RunAsync**](https://learn.microsoft.com/uwp/api/windows.ui.core.coredispatcher.runasync) to make sure this call is executed on the UI thread.
-   Call the **MediaCapture** object's [**Dispose**](https://learn.microsoft.com/uwp/api/windows.media.capture.mediacapture.dispose) method to release the object. Again, use [**CoreDispatcher.RunAsync**](https://learn.microsoft.com/uwp/api/windows.ui.core.coredispatcher.runasync) to make sure this call is executed on the UI thread.
-   Set the **MediaCapture** member variable to null.
-   Call [**RequestRelease**](https://learn.microsoft.com/uwp/api/windows.system.display.displayrequest.requestrelease) to allow the screen to turn off when inactive.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/windows-uwp/audio-video-camera/SimpleCameraPreview_Win10/cs/MainPage.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/uwp/audio-video-camera/simple-camera-preview-access.md)

You should shut down the preview stream when the user navigates away from your page by overriding the [**OnNavigatedFrom**](https://learn.microsoft.com/uwp/api/windows.ui.xaml.controls.page.onnavigatedfrom) method.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/windows-uwp/audio-video-camera/SimpleCameraPreview_Win10/cs/MainPage.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/uwp/audio-video-camera/simple-camera-preview-access.md)

You should also shut down the preview stream properly when your app is suspending. To do this, register a handler for the [**Application.Suspending**](https://learn.microsoft.com/uwp/api/windows.applicationmodel.core.coreapplication.suspending) event in your page's constructor.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/windows-uwp/audio-video-camera/SimpleCameraPreview_Win10/cs/MainPage.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/uwp/audio-video-camera/simple-camera-preview-access.md)

In the **Suspending** event handler, first check to make sure that the page is being displayed the application's [**Frame**](https://learn.microsoft.com/uwp/api/Windows.UI.Xaml.Controls.Frame) by comparing the page type to the [**CurrentSourcePageType**](https://learn.microsoft.com/uwp/api/windows.ui.xaml.controls.frame.currentsourcepagetype) property. If the page is not currently being displayed, then the **OnNavigatedFrom** event should already have been raised and the preview stream shut down. If the page is currently being displayed, get a [**SuspendingDeferral**](https://learn.microsoft.com/uwp/api/Windows.ApplicationModel.SuspendingDeferral) object from the event args passed into the handler to make sure the system does not suspend your app until the preview stream has been shut down. After shutting down the stream, call the deferral's [**Complete**](https://learn.microsoft.com/uwp/api/windows.applicationmodel.suspendingdeferral.complete) method to let the system continue suspending your app.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/windows-uwp/audio-video-camera/SimpleCameraPreview_Win10/cs/MainPage.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/uwp/audio-video-camera/simple-camera-preview-access.md)


## Related topics

* [Camera](camera.md)
* [Basic photo, video, and audio capture with MediaCapture](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/uwp/audio-video-camera/basic-photo-video-and-audio-capture-with-MediaCapture.md)
* [Get a preview frame](get-a-preview-frame.md)
