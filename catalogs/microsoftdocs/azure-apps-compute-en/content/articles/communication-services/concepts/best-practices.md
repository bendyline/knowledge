---
title: Azure Communication Services - best practices
description: Learn more about Azure Communication Service best practices.
author: srahaman
manager: akania
services: azure-communication-services

ms.author: srahaman
ms.date: 06/30/2021
ms.topic: best-practice
ms.service: azure-communication-services
ms.custom: devx-track-js
zone_pivot_groups: acs-plat-web-native
---

# Best practices: Azure Communication Services calling SDKs


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**

This article provides information about best practices related to the Azure Communication Services calling SDKs.

**Applies to: platform-web**


## Best practices for the Azure Communication Services Calling Web SDK

This section provides information about best practices associated with the Azure Communication Services Calling Web (JavaScript) SDK for voice and video calling.

### Plug in a microphone or enable a microphone from the device manager when a call is in progress

When no microphone is available at the beginning of an Azure Communication Services call, and then a microphone becomes available, the change raises a `noMicrophoneDevicesEnumerated` diagnostic event. When that event happens, your application needs to invoke `askDevicePermission` to obtain user consent to enumerate devices. The user can then mute or unmute the microphone.

### Dispose of VideoStreamRendererView

Communication Services applications should dispose of `VideoStreamRendererView`, or its parent `VideoStreamRenderer` instance, when it's no longer needed.

### Hang up the call on an onbeforeunload event

Your application should invoke `call.hangup` when the `onbeforeunload` event is emitted.

### Handle multiple calls on multiple tabs

Your application shouldn't connect to calls from multiple browser tabs simultaneously on mobile devices. This situation can cause undefined behavior due to resource allocation for the microphone and camera on a device. We encourage developers to always hang up calls when they're completed in the background before starting a new one.

### Handle the OS muting a call when a phone call comes in

During an Azure Communication Services call (for both iOS and Android), if a phone call comes in or the voice assistant is activated, the OS automatically mutes the user's microphone and camera. On Android, the call automatically unmutes and video restarts after the phone call ends. On iOS, unmuting and restarting the video require user action.

You can use the quality event of `microphoneMuteUnexpectedly` to listen for the notification that the microphone was muted unexpectedly. Keep in mind that to rejoin a call properly, you need to use SDK 1.2.3-beta.1 or later.

```javascript
const latestMediaDiagnostic = call.api(SDK.Features.Diagnostics).media.getLatest();
const isIosSafari = (getOS() === OSName.ios) && (getPlatformName() === BrowserName.safari);
if (isIosSafari && latestMediaDiagnostic.microphoneMuteUnexpectedly && latestMediaDiagnostic.microphoneMuteUnexpectedly.value) {
  // received a QualityEvent on iOS that the microphone was unexpectedly muted - notify user to unmute their microphone and to start their video stream
}
```

Your application should invoke `call.startVideo(localVideoStream);` to start a video stream and should use `this.currentCall.unmute();` to unmute the audio.

### Manage devices

You can use the Azure Communication Services SDK to manage your devices and media operations.

Your application shouldn't use native browser APIs like `getUserMedia` or `getDisplayMedia` to acquire streams outside the SDK. If you do, you must manually dispose of your media streams before using `DeviceManager` or other device management APIs via the Communication Services SDK.

#### Request device permissions

You can request device permissions by using the SDK. Your application should use `DeviceManager.askDevicePermission` to request access to audio and/or video devices.

If the user denies access, `DeviceManager.askDevicePermission` returns `false` for a particular device type (audio or video) on subsequent calls, even after the page is refreshed. In this scenario, your application must:

1. Detect that the user previously denied access.
1. Instruct the user to manually reset or explicitly grant access to a particular device type.

#### Manage the behavior of a camera that another process is using

- **On Windows Chrome and Windows Microsoft Edge**: If you start, join, or accept a call with video on, and another process (other than the browser that the web SDK is running on) is using the camera device, the call is started with audio only and no video. A `cameraStartFailed` User Facing Diagnostics flag is raised because the camera failed to start.

  The same situation applies to turning on video mid-call. You can turn off the camera in the other process so that that process releases the camera device, and then start video again from the call. The video then turns on for the call, and remote participants start seeing the video.

  This problem doesn't exist in macOS Chrome or macOS Safari because the OS lets processes and threads share the camera device.

- **On mobile devices**: If a *ProcessA* requests the camera device while *ProcessB* is using it, then *ProcessA* overtakes the camera device and *ProcessB* stop using it.

- **On iOS Safari**: You can't have the camera on for multiple call clients on the same tab or across tabs. When any call client uses the camera, it overtakes the camera from any previous call client that was using it. The previous call client gets a `cameraStoppedUnexpectedly` User Facing Diagnostics flag.

### Manage screen sharing

#### Closing an application doesn't stop it from being shared

Let's say that from Chromium, you screen share the Microsoft Teams application. You then select the **X** button on the Teams application to close it. Although the window is closed, the Teams application keeps running in the background. The icon still appears on the desktop taskbar. Because the Teams application is still running, it's still being screen shared with remote participants.

To stop the application from being screen shared, you have to take one of these actions:

- Right-click the application's icon on the desktop taskbar, and then select **Quit**.
- Select the **Stop sharing** button on the browser.
- Call the SDK's `Call.stopScreenSharing()` API operation.

#### Safari can do only full-screen sharing

Safari allows screen sharing only for the entire screen. That behavior is unlike Chromium, which lets you screen share the full screen, a specific desktop app, or a specific browser tab.

#### You can grant screen-sharing permissions on macOS

To screen share in macOS Safari or macOS Chrome, grant the necessary permissions to the browsers on the OS menu: **System Preferences** > **Security & Privacy** > **Screen Recording**.



**Applies to: platform-native**


## Best practices for the Azure Communication Services Calling Native SDK

This section provides information about best practices associated with the Azure Communication Services Calling Native SDK for voice and video calling.

### Supported platforms

Here are the minimum OS platform requirements to ensure optimal functionality of the Calling Native SDK.

#### [iOS](#tab/ios)

- Support for iOS 10.0+ at build time and iOS 12.0+ at runtime
- Xcode 12.0+
- Support for iPadOS 13.0+

#### [Android](#tab/android)

- Support for Android API Level 21 or higher
- Support for Java 7 or later
- Support for Android Studio 2.0

We highly recommend that you identify and validate your scenario by using the information in [Android platform support](sdk-options.md?#android-platform-support).

#### [Windows](#tab/windows)

- Support for Universal Windows Platform (UWP)
- Support for WinUI 3

---

### Verify device permissions for app requests

To use the Calling Native SDK for making or receiving calls, consumers need to authorize each platform to access device resources. As a developer, you must prompt the user for access and ensure that permissions are enabled. The consumer authorizes these access rights, so verify that they currently have the required permissions.

#### [iOS](#tab/ios)

- `NSMicrophoneUsageDescription` for microphone access
- `NSCameraUsageDescription` for camera access

#### [Android](#tab/android)

In the application manifest (`app/src/main/AndroidManifest.xml`), verify the following lines:

```xml
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
    <uses-permission android:name="android.permission.RECORD_AUDIO" />
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.READ_PHONE_STATE" />
    <uses-permission android:name="android.permission.FOREGROUND_SERVICE_MICROPHONE" />
```

#### [Windows](#tab/windows)

Go to `Package.appxmanifest` and select capabilities:

- `Internet (Client)` and `Internet (Client & Server)` for network access
- `Microphone` to access the audio feed of the microphone
- `Webcam` to access the video feed of the camera

---

### Configure the logs

Implementing logging as described in the [tutorial about retrieving log files](../tutorials/log-file-retrieval-tutorial.md) is more critical than ever. Detailed logs help in diagnosing problems specific to device models or OS versions that meet the minimum SDK criteria. We encourage developers to configure logs by using the Logs API. Without the logs, the Microsoft support team can't help debug and troubleshoot the calls.

### Track CallID

`CallID` is the unique ID for a call. It identifies correlated events from all of the participants and endpoints that connect during a single call. In most cases, you use it to review the logs. The Microsoft Support team asks for it to help troubleshoot the calls.

You should track the `CallID` value in the telemetry that you configure in your app. To understand how to retrieve the value for each platform, follow the guidelines in the [troubleshooting guide](troubleshooting-info.md).

### Subscribe to User Facing Diagnostics and media quality statistics

You can use these Azure Communication Services features to help improve the user experience:

- [User Facing Diagnostics](voice-video-calling/user-facing-diagnostics.md): Examine properties of a call to determine the cause of problems that affect your customers.
- [Media quality statistics](voice-video-calling/media-quality-sdk.md): Examine the low-level audio, video, and screen-sharing quality metrics for incoming and outgoing call metrics. We recommend that you collect the data and send it to your pipeline ingestion after a call ends.

### Manage error handling

If there are any errors during the call or implementation, the methods return error objects that contain error codes. It's crucial to use these error objects for proper error handling and to display alerts. The call states also return error codes to help identify the reasons behind call failures. You can refer to the [troubleshooting guide](troubleshooting-info.md) to resolve any problems.

### Manage video streams

Be sure to dispose of `VideoStreamRendererView` when the UI no longer displays the video. Use `VideoStreamType` to determine the type of the stream.

### Conduct general memory management

**Preallocate resources**. Initialize your calling client and any necessary resources during your app's startup phase rather than on demand. This approach reduces latency in starting a call.

**Dispose properly**. Dispose of all call objects after use, to free up system resources and avoid memory leaks. Be sure to unsubscribe from *events* that might cause memory leaks.

### Consider how processes access the camera or microphone

On mobile devices, if multiple processes try to access the camera or microphone at the same time, the first process to request access takes control of the device. As a result, the second process immediately loses access to it.

### Optimize library size

Optimizing the size of libraries in software development is crucial for the following reasons, particularly as applications become more complex and resource intensive:

- **Application performance**: Smaller libraries reduce the amount of code that an application must load, parse, and execute. This reduction can significantly enhance the startup time and overall performance of your application, especially on devices that have limited resources.

- **Memory usage**: By minimizing library size, you can decrease the runtime memory footprint of an application. This decrease is important for mobile devices, where memory is often constrained. Lower memory usage can lead to fewer system crashes and better multitasking performance.

For more information, see:

- [UI Library for iOS](https://github.com/Azure/communication-ui-library-ios/wiki/Calling-Composite-Demo-Application-Size)
- [UI Library for Android](https://github.com/Azure/communication-ui-library-android/wiki/Calling-Composite-Demo-Application-Size)



## Related content

- [Improve and manage call quality](voice-video-calling/manage-call-quality.md)
- [Use Call Diagnostics to diagnose call problems](voice-video-calling/call-diagnostics.md)
- [Add voice calling to your app](../quickstarts/voice-video-calling/getting-started-with-calling.md)
- [Use the UI Library for enhanced calling experiences](ui-library/ui-library-overview.md)
