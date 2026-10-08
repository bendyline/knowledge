---
ms.author: enricohuang
title: Add audio and video calling to your WebView application
titleSuffix: An Azure Communication Services article
description: This article describes how to integrate Azure Communication Calling WebJS SDK in a WebView environment
author: sloanster
services: azure-communication-services
ms.date: 06/28/2025
ms.topic: quickstart
ms.service: azure-communication-services
ms.subservice: calling
zone_pivot_groups: acs-plat-ios-android
ms.custom: mode-other
---

# Add audio and video calling to your WebView application


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


**Applies to: platform-android**


Webview technology is an embeddable browser that can be integrated directly into a native mobile application. If you want to develop an Azure Communication Services calling application directly a native Android application, besides using the Azure Communication Calling Android SDK, you can also use Azure Communication Calling Web SDK on Android WebView.

This article describes how to run webapps developed with the Azure Communication Calling Web SDK in an Android WebView environment.

## Prerequisites
> **Important:**
> This feature of Azure Communication Services is currently in preview. Features in preview are publicly available and can be used by all new and existing Microsoft customers.
>
> This preview version is provided without a service-level agreement, and we don't recommend it for production workloads. Certain features might not be supported or capabilities might be constrained.
>
> For more information, see [Supplemental Terms of Use for Microsoft Azure Previews](https://azure.microsoft.com/support/legal/preview-supplemental-terms/).


- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- [Android Studio](https://developer.android.com/studio), for creating your Android application.
- A web application using the Azure Communication Calling Web SDK. [Get started with the web calling sample](../../samples/web-calling-sample.md).

This article assumes that you already have an Android WebView application.

If you don't have one, you can [download the WebViewQuickstart sample app](https://github.com/Azure-Samples/communication-services-android-quickstarts/tree/main/WebViewQuickstart).

If you use the [WebViewQuickstart sample app](https://github.com/Azure-Samples/communication-services-android-quickstarts/tree/main/WebViewQuickstart), all the necessary configurations and permission handling are in place. You can skip to Known Issues.

All you need to do is update the `defaultUrl` in `MainActivity` to the URL of the calling web application you deployed and build the application.

## Add permissions to application manifest

To request the permissions required to make a call, you must declare the permissions in the application manifest (`app/src/main/AndroidManifest.xml`).

Make sure you have the following permissions added to the application manifest:

```xml
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
    <uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
    <uses-permission android:name="android.permission.RECORD_AUDIO" />
    <uses-permission android:name="android.permission.CAMERA" />
```

## Request permissions at run time

Adding permissions to the application manifest isn't enough. You must also [request the dangerous permissions at runtime](https://developer.android.com/training/permissions/requesting) to access camera and microphone.

You have to call `requestPermissions()` and override `onRequestPermissionsResult`.
Besides app permissions, you have to handle browser permission requests by overriding `WebChromeClient.onPermissionRequest`

The [WebViewQuickstart sample app](https://github.com/Azure-Samples/communication-services-android-quickstarts/tree/main/WebViewQuickstart)
also shows how to handle permission requests from browser and request app permissions at runtime.

## WebView configuration

Azure Communication Calling Web SDK requires JavaScript enabled.

In some cases, we saw `play() can only be initiated by a user gesture` error message in Android WebView environment, and users aren't able to hear incoming audio.

Therefore, we recommend setting  `MediaPlaybackRequiresUserGesture` to false.

```java
WebSettings settings = webView.getSettings();
settings.setJavaScriptEnabled(true);
settings.setMediaPlaybackRequiresUserGesture(false);
```

## Known issues

### MediaDevices.enumerateDevices() API returns empty labels

A [known issue on Android WebView](https://bugs.chromium.org/p/chromium/issues/detail?id=669492).

The issue affects the following API in Web SDK:

- DeviceManager.getCameras()
- DeviceManager.getMicrophones()
- DeviceManager.getSpeakers() (If the device supports speaker enumeration)

  The value of name field in the result object is an empty string. This issue doesn't affect the function of streaming in the video call but the application users don't know the camera label they select for sending the video.
  To provide a better UI experience, you can use the following workaround in the web application to get device labels and map the label by `deviceId`.

  Although we can't get device labels from MediaDevices.enumerateDevices(), we can get the label from MediaStreamTrack.

  This workaround requires the web application to use getUserMedia to get the stream and map the `deviceId`.

  If there are many cameras and microphones on the Android device, it might take a while to collect labels.

```js
async function getDeviceLabels() {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const result = {};
    for (let i = 0; i < devices.length; i++) {
        const device = devices[i];
        if(device.kind != 'audioinput' && device.kind != 'videoinput') continue;
        if(device.label) continue;
        const deviceId = device.deviceId;
        const deviceConstraint = {
            deviceId: {
                exact: deviceId
            }
        };		
        const constraint = (device.kind == 'audioinput') ?
                { audio: deviceConstraint } :
                { video: deviceConstraint };
		try {
            const stream =  await navigator.mediaDevices.getUserMedia(constraint);
            stream.getTracks().forEach(track => {
                let namePrefix = '';
                if (device.kind == 'audioinput') {
                    namePrefix = 'microphone:';
                } else if(device.kind == 'videoinput') {
                    namePrefix = 'camera:';
                }
                if (track.label === '' && deviceId == 'default') {
                    result[namePrefix + deviceId] = 'Default';
                } else {
                    result[namePrefix + deviceId] = track.label;
                }
                track.stop();
            });
		} catch(e) {
		    console.error(`get stream failed: ${device.kind} ${deviceId}`, e);
		}
    }
    return result;
}
```

Screenshot of getDeviceLabels() result.

After you get the mapping between deviceId and label, you can use it to relate the label with the `id` from `DeviceManager.getCameras()` or `DeviceManager.getMicrophones()`

Screenshot showing the device name workaround.



**Applies to: platform-ios**


iOS WKWebView enables you to embed web content seamlessly into your app UI.
If you want to develop an Azure Communication Services calling application on iOS, besides using the Azure Communication Calling iOS SDK, you can also use Azure Communication Calling Web SDK with iOS WKWebView. In this quickstart, you learn how to run webapps developed with the Azure Communication Calling Web SDK in an iOS WKWebView environment.

## Prerequisites
> **Important:**
> This feature of Azure Communication Services is currently in preview. Features in preview are publicly available and can be used by all new and existing Microsoft customers.
>
> This preview version is provided without a service-level agreement, and we don't recommend it for production workloads. Certain features might not be supported or capabilities might be constrained.
>
> For more information, see [Supplemental Terms of Use for Microsoft Azure Previews](https://azure.microsoft.com/support/legal/preview-supplemental-terms/).


- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- [XCode](https://developer.apple.com/xcode/), for creating your iOS application.
- A web application using the Azure Communication Calling Web SDK. [Get started with the web calling sample](../../samples/web-calling-sample.md).

This quickstart guide assumes that you're familiar with iOS application development. We mention the necessary configuration and tips when developing iOS WKWebView application for Azure Communication Services Calling SDK.

## Add keys in Info.plist

To make a video call, make sure you have the following keys added to the Info.plist:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>NSMicrophoneUsageDescription</key>
	<string>Camera access is required to make a video call</string>
	<key>NSCameraUsageDescription</key>
	<string>Microphone access is required to make an audio call</string>
</dict>
</plist>
```

## Handle permission prompt

On iOS Safari, users can see permission prompt more frequent than on other platforms. It is because Safari doesn't keep permissions for a long time unless there's a stream acquired.

WKWebView provides a way to handle browser permission prompt by using [WKUIDelegate.webView](https://developer.apple.com/documentation/webkit/wkuidelegate/3763087-webview). This API is only available on iOS 15.0+.

Here's an example. The browser permission is granted in `decisionHandler`, so users don't see browser permission prompt after they grant the app permissions.

```swift
import WebKit
import SwiftUI

struct WebView: UIViewRepresentable {
    private(set) var url: URL
    private var webView: WKWebView

    init(url: String) {
        self.url = URL(string: url)!

        let prefs = WKWebpagePreferences()
        prefs.allowsContentJavaScript = true
        prefs.preferredContentMode = .recommended

        let configuration = WKWebViewConfiguration()
        configuration.defaultWebpagePreferences = prefs
        configuration.allowsInlineMediaPlayback = true
        configuration.mediaTypesRequiringUserActionForPlayback = []
        let webView = WKWebView(frame: CGRect(), configuration: configuration)
        self.webView = webView
    }

    class Coordinator: NSObject, WKUIDelegate {
        let parent: WebView
        init(_ parent: WebView) {
            self.parent = parent
        }
        func webView(_ webView: WKWebView, requestMediaCapturePermissionFor origin: WKSecurityOrigin, initiatedByFrame frame: WKFrameInfo, type: WKMediaCaptureType, decisionHandler: @escaping (WKPermissionDecision) -> Void) {
            decisionHandler(WKPermissionDecision.grant)
        }
    }

    func makeCoordinator() -> Coordinator {
        Coordinator(self)
    }

    func makeUIView(context: Context) -> WKWebView {
        return webView
    }

    func updateUIView(_ uiView: WKWebView, context: Context) {
        uiView.uiDelegate = context.coordinator
        uiView.load(URLRequest(url: self.url))
    }
}
```


## WebView configuration

Azure Communication Calling Web SDK requires JavaScript enabled.

`allowsInlineMediaPlayback` is also required to be `true`.

```swift
let prefs = WKWebpagePreferences()
prefs.allowsContentJavaScript = true
prefs.preferredContentMode = .recommended

let configuration = WKWebViewConfiguration()
configuration.defaultWebpagePreferences = prefs
configuration.allowsInlineMediaPlayback = true
let webView = WKWebView(frame: CGRect(), configuration: configuration)
```

## Known issues

### Microphone is muted when app goes to background

When a user locks the screen or WkWebView app goes to background, the microphone input is muted until the app comes back to foreground.

This is iOS WkWebView system behavior, and Azure Communication Services Calling Web SDK doesn't mute the microphone.

### Connection drops soon after the app goes to background

This is also iOS app behavior. When we switch to other audio/video app, the connection drops about 30 seconds later.

This isn't a problem if the app only stays in background for a short time. When the app comes back to foreground, the call recovers.

If the app stays in background for a longer period, the server register that the user is away and removes the user from the participants list.

In this case, when the user switches the WkWebView app back to foreground, the call disconnects and doesn't recover.



## Next steps

For more information, see the following articles:

- Learn about [Calling SDK capabilities](getting-started-with-calling.md?pivots=platform-web)
- Learn more about [how calling works](../../concepts/voice-video-calling/about-call-types.md)
