---
title: Skip the setup screen by using the UI Library
titleSuffix: An Azure Communication Services how-to guide
description: Use the Azure Communication Services UI Library to skip the setup screen in an application.
author: mbellah
ms.author: mbellah
ms.service: azure-communication-services
ms.topic: how-to 
ms.date: 03/21/2023
ms.custom: template-how-to
zone_pivot_groups: acs-plat-ios-android

#Customer intent: As a developer, I want to skip the setup screen in my application so users can join a call directly.
---

# Skip the setup screen in an application


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


The Azure Communication Services UI Library offers the option to join a call without passing through the setup screen. It empowers developers to build a communication application in a way that enables users to join a call directly, without any user interaction. The feature also provides the capability to configure the default state of the camera and microphone (on or off) before users join a call.

In this article, you learn how to set up the feature correctly in your application.

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- A deployed Communication Services resource. [Create a Communication Services resource](../../quickstarts/create-communication-resource.md).
- A user access token to enable the call client. [Get a user access token](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/quickstarts/access-tokens.md).
- Optional: Completion of the [quickstart for getting started with the UI Library composites](../../quickstarts/ui-library/get-started-composites.md).

## Set up the feature

**Applies to: platform-android**


For more information, see the [open-source Android UI Library](https://github.com/Azure/communication-ui-library-android) and the [sample application code](https://github.com/Azure-Samples/communication-services-android-quickstarts/tree/main/ui-calling).

### Option to skip the setup screen

`CallCompositeLocalOptions` is an options wrapper that sets the capability of the UI Library to skip the setup screen by using a Boolean. By default, the capability to skip the setup screen is set to `false`. You have to set `skipSetupScreen` with a `true` Boolean value to provide the experience of skipping the setup screen.

We recommend that you build your application in such a way that when a user tries to join a call, microphone permission is already granted for a smooth joining experience.

Screenshot of joining call by skipping the setup screen for Android.

To use the feature, pass the Boolean value with `skipSetupScreen` to `CallCompositeLocalOptions` and inject it into `callComposite.launch`.

#### [Kotlin](#tab/kotlin)

```kotlin
import com.azure.android.communication.ui.calling.models.CallCompositeLocalOptions

val localOptions: CallCompositeLocalOptions = CallCompositeLocalOptions()
    .setSkipSetupScreen(true)

callComposite.launch(callLauncherActivity, remoteOptions, localOptions)
```

#### [Java](#tab/java)
```java
import com.azure.android.communication.ui.calling.models.CallCompositeLocalOptions;

final CallCompositeLocalOptions localOptions = new CallCompositeLocalOptions()
    .setSkipSetupScreen(true);

callComposite.launch(callLauncherActivity, remoteOptions, localOptions);
```

---

### Default options for camera and microphone configuration

By default, the setup screen gives users an option to configure camera and microphone settings before joining a call. When you set up skipping the setup screen to join a call, users don't have that option until they're on the call.

You can pass a Boolean value with `cameraOn` and `microphoneOn` to turn the camera and microphone on or off before users join a call. The functionality of controlling the default state of the camera and microphone isn't affected if a user grants the permission for each of them respectively.

By default, both `cameraOn` and `microphoneOn` are set to `false`. You can use this functionality even with the UI Library's default call-joining experience. In that case, the camera and microphone are turned on or off on the setup screen according to the configuration that you set.

To set the default state of the camera and microphone, pass the Boolean value with `cameraOn` and `microphoneOn` to `CallCompositeLocalOptions` and inject it into `callComposite.launch`.

#### [Kotlin](#tab/kotlin)

```kotlin
import com.azure.android.communication.ui.calling.models.CallCompositeLocalOptions

val localOptions: CallCompositeLocalOptions = CallCompositeLocalOptions()
    .setMicrophoneOn(true)
    .setCameraOn(true)

callComposite.launch(callLauncherActivity, remoteOptions, localOptions)
```

#### [Java](#tab/java)

```java
import com.azure.android.communication.ui.calling.models.CallCompositeLocalOptions;

final CallCompositeLocalOptions localOptions = new CallCompositeLocalOptions()
    .setMicrophoneOn(true)
    .setCameraOn(true);

callComposite.launch(callLauncherActivity, remoteOptions, localOptions);
```

---

### Permission handling

We recommend that you let users join a call with microphone and camera permission being granted to use the feature of skipping the setup screen with default configuration APIs for the microphone and camera. If you don't handle the permissions of the user, the UI Library tries to handle them for you.

Users must enable microphone permission to join a call. If users try to join a call after denying microphone permission, the UI Library drops the call in the connecting stage and throws an error with the code `CallCompositeErrorCode.MICROPHONE_PERMISSION_NOT_GRANTED`.

However, users can join a call even if they deny camera permission. The UI Library disables the camera functionality when camera permission is denied. So, the default configuration API for the camera doesn't affect the calling experience. Users can enjoy the effect of the default configuration API for the camera after granting the camera permission.

We recommend that you handle the microphone permission. If users join the call with the camera turned on by default, we recommend that you also handle the camera permission.

### Network errors

If a network disruption happens during a call or a call drops, the UI Library closes and throws an error with the code `CallCompositeErrorCode.CALL_END_FAILED`.

If a user doesn't have a network connection and tries to join the call after skipping the setup screen, the UI Library closes at the call-connecting stage and throws an error with the code `CallCompositeErrorCode.NETWORK_CONNECTION_NOT_AVAILABLE`. To avoid this error, we recommend that you configure your application to check network availability before users join a call.

To receive error events, call `setOnErrorHandler` with `CallComposite`.

The following `error` values might be sent to the error handler:

- `microphonePermissionNotGranted`
- `networkConnectionNotAvailable`

#### [Kotlin](#tab/kotlin)

```kotlin
callComposite.addOnErrorEventHandler { callCompositeErrorEvent ->
    println(callCompositeErrorEvent.errorCode)
}
```

#### [Java](#tab/java)

```java
callComposite.addOnErrorEventHandler(callCompositeErrorEvent -> {
    System.out.println(callCompositeErrorEvent.getErrorCode());
});
```

---



**Applies to: platform-ios**


For more information, see the [open-source iOS UI Library](https://github.com/Azure/communication-ui-library-ios) and the [sample application code](https://github.com/Azure-Samples/communication-services-ios-quickstarts/tree/main/ui-calling).

### Option to skip the setup screen

`LocalOptions` is an options wrapper that sets the capability of the UI Library to skip the setup screen by using a Boolean. By default, the capability to skip the setup screen is set to `false`. You have to set `skipSetupScreen` with a `true` Boolean value to provide the experience of skipping the setup screen.

We recommend that you build your application in such a way that when a user tries to join a call, microphone permission is already granted for a smooth joining experience.

Screenshot of joining call by skipping the setup screen for iOS.

To use the feature, pass the Boolean value with `skipSetupScreen` to `LocalOptions` and inject it into `callComposite.launch`.

```swift
let localOptions = LocalOptions(skipSetupScreen: true)

callComposite.launch(remoteOptions: remoteOptions, localOptions: localOptions)
```

### Default options for camera and microphone configuration

By default, the setup screen gives users an option to configure camera and microphone settings before joining a call. When you set up skipping the setup screen to join a call, users don't have that option until they're on the call.

You can pass a Boolean value with `cameraOn` and `microphoneOn` to turn the camera and microphone on or off before users join a call. The functionality of controlling the default state of the camera and microphone isn't affected if a user grants the permission for each of them respectively.

By default, both `cameraOn` and `microphoneOn` are set to `false`. You can use this functionality even with the UI Library's default call-joining experience. In that case, the camera and microphone are turned on or off on the setup screen according to the configuration that you set.

To set the default state of the camera and microphone, pass the Boolean value with `cameraOn` and `microphoneOn` to `LocalOptions` and inject it into `callComposite.launch`.

```swift
let localOptions = LocalOptions(cameraOn: true, microphoneOn: true)

callComposite.launch(remoteOptions: remoteOptions, localOptions: localOptions)
```

### Permission handling

We recommend that you let users join a call with microphone and camera permission being granted to use the feature of skipping the setup screen with default configuration APIs for the microphone and camera. If you don't handle the permissions of the user, the UI Library tries to handle them for you.

Users must enable microphone permission to join a call. If users try to join a call after denying microphone permission, the UI Library drops the call in the connecting stage and throws a `microphonePermissionNotGranted` error.

However, users can join a call even if they deny camera permission. The UI Library disables the camera functionality when camera permission is denied. So, the default configuration API for the camera doesn't affect the calling experience. Users can enjoy the effect of the default configuration API for the camera after granting the camera permission.

We recommend that you handle the microphone permission. If users join the call with the camera turned on by default, we recommend that you also handle the camera permission.

### Network errors

If a network disruption happens during a call or a call drops, the UI Library closes and throws a `callEndFailed` error.

If a user doesn't have a network connection and tries to join the call after skipping the setup screen, the UI Library closes at the call-connecting stage and throws a `networkConnectionNotAvailable` error. To avoid this error, we recommend that you configure your application to check network availability before users join a call.

You can implement closures to act on composite events. The following example shows an error event for a failed composite:

```swift
callComposite?.events.onError = { error in
    print("CallComposite failed with error:\(error)")
}
```

The following `error` values might be sent to the error handler:

- `microphonePermissionNotGranted`
- `networkConnectionNotAvailable`



## Next steps

- [Learn more about the UI Library](../../concepts/ui-library/ui-library-overview.md)
