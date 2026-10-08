---
title: Turn on picture-in-picture by using the UI Library
titleSuffix: An Azure Communication Services how-to guide
description: Use picture-in-picture in the Azure Communication Services UI Library.
author: pavelprystinka
ms.author: pprystinka
ms.service: azure-communication-services
ms.topic: how-to 
ms.date: 12/12/2023
ms.custom: template-how-to
zone_pivot_groups: acs-plat-ios-android

#Customer intent: As a developer, I want to turn on picture-in-picture in my application.
---

# Turn on picture-in-picture in an application


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


While a user is on a call, a full-screen UI can prevent the user from multitasking in an app. There are two ways to enable the user to multitask in the app:

- Enable the user to select the **Back** button and return to the previous screen. No calling UI is visible while the user is still on the call.
- Turn on picture-in-picture.

This article shows you how to turn on picture-in-picture in the Azure Communication Services UI Library. The picture-in-picture feature is system provided and is subject to feature support on the device, including CPU load, RAM availability, and battery state.


## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- A deployed Communication Services resource. [Create a Communication Services resource](../../quickstarts/create-communication-resource.md).
- A user access token to enable the call client. [Get a user access token](../../quickstarts/identity/access-tokens.md).
- Optional: Completion of the [quickstart for getting started with the UI Library composites](../../quickstarts/ui-library/get-started-composites.md).

## Turn on the feature

**Applies to: platform-android**


For more information, see the [open-source Android UI Library](https://github.com/Azure/communication-ui-library-android) and the [sample application code](https://github.com/Azure-Samples/communication-services-android-quickstarts/tree/main/ui-calling).

### Picture-in-picture setup

To enable multitasking and picture-in-picture, use `CallCompositeBuilder.multitasking` to set `CallCompositeMultitaskingOptions` with  `enableMultitasking` and `enableSystemPictureInPictureWhenMultitasking` constructor parameters.

#### [Kotlin](#tab/kotlin)

```kotlin
val callComposite: CallComposite =
            CallCompositeBuilder()
            .multitasking(CallCompositeMultitaskingOptions(true, true))
            .build()
```

#### [Java](#tab/java)

```java
CallComposite callComposite = 
    new CallCompositeBuilder()
        .multitasking(new CallCompositeMultitaskingOptions(true, true))
        .build();
```

---

The **Back** button appears when `enableMultitasking` is set to `true`.

Screenshot of the Android call screen with the Back button visible.

When user taps back button Calling UI is hidden and, if configured, Picture-in-Picture view is displayed.

When multitasking is ON for `CallComposite`, the call activity starts in a dedicated task. In the task history, the user sees two screens: one for the app's activity and one for Communication Services call activity.


---

To enter multitasking programmatically and if configured display Picture-in-Picture, call the `sendToBackground` method.

#### [Kotlin](#tab/kotlin)
```kotlin
callComposite.sendToBackground()
```

#### [Java](#tab/java)

```java
callComposite.sendToBackground();
```
---

To bring user back to the calling activity programmatically use `bringToForeground` function:

#### [Kotlin](#tab/kotlin)

```kotlin
callComposite.bringToForeground(context)
```

#### [Java](#tab/java)

```java
callComposite.bringToForeground(context);
```



**Applies to: platform-ios**


For more information, see the [open-source iOS UI Library](https://github.com/Azure/communication-ui-library-ios) and the [sample application code](https://github.com/Azure-Samples/communication-services-ios-quickstarts/tree/main/ui-calling).

### Prerequisites
A physical iOS device to run the App. An iOS Simulator does not support Picture-in-picture functionality.

### Picture-in-picture setup

To enable multitasking and picture-in-picture, use the `CallCompositeOptions` constructor parameters `enableMultitasking` and `enableSystemPiPWhenMultitasking`.

> **Note:**
> Apps that have a deployment target earlier than iOS 16 require the `com.apple.developer.avfoundation multitasking-camera-access` entitlement to use the camera in picture-in-picture mode.

```swift
let callCompositeOptions = CallCompositeOptions(
            enableMultitasking: true,
            enableSystemPictureInPictureWhenMultitasking: true)

let callComposite = CallComposite(withOptions: callCompositeOptions)
```

The **Back** button appears when `enableMultitasking` is set to `true`.

Screenshot of the iOS call screen with the Back button visible.


When user taps back button Calling UI is hidden and, if configured, Picture-in-Picture view is displayed.


---

To enter or exit multitasking programmatically, use `isHidden` property:


```swift
// Close calling UI and display PiP
callComposite.isHidden = true
```

```swift
// Display calling UI and close PiP
callComposite.isHidden = false
```




## Next steps

- [Learn more about the UI Library](../../concepts/ui-library/ui-library-overview.md)
