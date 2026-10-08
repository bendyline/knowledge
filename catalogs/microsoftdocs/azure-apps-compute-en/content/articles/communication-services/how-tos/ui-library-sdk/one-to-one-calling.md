---
title: Set up one-to-one calling in the UI Library
titleSuffix: An Azure Communication Services how-to guide
description: Use the Azure Communication Services UI Library to set up one-to-one calling and push notifications.
author: iaulakh
ms.author: iaulakh
ms.service: azure-communication-services
ms.topic: how-to 
ms.date: 12/19/2023
ms.custom: template-how-to
zone_pivot_groups: acs-plat-ios-android

#Customer intent: As a developer, I want to enable push notifications with the Azure Communication Services UI Library so that I can create a calling application that provides push notifications to its users.
---

# Set up one-to-one calling and push notifications in the UI Library


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


The UI Library provides out-of-the-box support for making one-to-one calls by using Azure Communication Services participant identifiers. To support one-to-one calling, the UI Library provides incoming call notifications. You can also use Azure Communication Services as an Azure Event Grid event source for calls.

In this article, you learn how to make one-to-one calls correctly by using the UI Library in your application.

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- A deployed Communication Services resource. [Create a Communication Services resource](../../quickstarts/create-communication-resource.md).
- A user access token to enable the call client. [Get a user access token](../../quickstarts/identity/access-tokens.md).
- Optional: Completion of the [QuickStart for getting started with the UI Library composites](../../quickstarts/ui-library/get-started-composites.md).

## Set up the features

**Applies to: platform-android**


For more information, see the [open-source Android UI Library](https://github.com/Azure/communication-ui-library-android) and the [sample application code](https://github.com/Azure-Samples/communication-services-android-quickstarts/tree/main/ui-calling).

### Set up permissions for push notifications

To set up push notifications, you need a Firebase account with Firebase Cloud Messaging (FCM) enabled. Your FCM service must be connected to an Azure Notification Hubs instance. For more information, see [Communication Services notifications](../../concepts/notifications.md). You also need to use Android Studio version 3.6 or later to build your application.

For the Android application to receive notification messages from FCM, it needs a set of permissions. In your `AndroidManifest.xml` file, add the following set of permissions after the `<manifest ...>` or `</application>` tag.

```xml
<uses-permission android:name="android.permission.INTERNET"/>
<uses-permission android:name="android.permission.GET_ACCOUNTS"/>
<uses-permission android:name="com.google.android.c2dm.permission.RECEIVE" />
```

### Add incoming notifications to your mobile app

Azure Communication Services integrates with [Azure Event Grid](../../../event-grid/overview.md) and [Azure Notification Hubs](../../../notification-hubs/notification-hubs-push-notification-overview.md), so you can [add push notifications](../../concepts/notifications.md) to your apps in Azure. 

### Register/Unregister for notification hub push notifications

To register for push notifications, the application needs to call `registerPushNotification()` on a `CallComposite` instance with a device registration token.

To get the device registration token, add the Firebase SDK to your application module's `build.gradle` instance. To receive notifications from Firebase, integrate Azure Notification Hubs by following the instructions in [Communication Services notifications](https://learn.microsoft.com/azure/communication-services/concepts/notifications).

#### [Kotlin](#tab/kotlin)

```kotlin
    val deviceRegistrationToken = "" // From Firebase
    callComposite.registerPushNotification(deviceRegistrationToken).whenComplete { _, throwable ->
        if (throwable != null) {
            // Handle error
        }
    }
```

#### [Java](#tab/java)

```java
    String deviceRegistrationToken = ""; // From Firebase
    callComposite.registerPushNotification(deviceRegistrationToken)
    .whenComplete((aVoid, throwable) -> {
            if (throwable != null) {
                // Handle error
            }
    });
```

---

### Handle push notifications received from Event Grid or notification hub

To receive push notifications for incoming calls, call `handlePushNotification` on a `CallComposite` instance with a payload.

To get the payload from FCM, begin by creating a new service (**File** > **New** > **Service** > **Service**) that extends the `FirebaseMessagingService` Firebase SDK class and overrides the `onMessageReceived` method. This method is the event handler that called when FCM delivers the push notification to the application.

#### [Kotlin](#tab/kotlin)

```kotlin
    // On Firebase onMessageReceived
    val pushNotification = CallCompositePushNotification(remoteMessage.data)
    callComposite.handlePushNotification(pushNotification).whenComplete { _, throwable ->
        if (throwable != null) {
            // Handle error
        }
    }
```

#### [Java](#tab/java)

```java
    // On Firebase onMessageReceived
    // push notification contains from/to communication identifiers and event type
    CallCompositePushNotification pushNotification = 
            new CallCompositePushNotification(remoteMessage.data)

    callComposite.handlePushNotification(pushNotification)
    .whenComplete((aVoid, throwable) -> {
            if (throwable != null) {
                // Handle error
            }
    });
```

---

### Register for incoming call notifications

To receive incoming call notifications after `handlePushNotification`, subscribe to `CallCompositeIncomingCallEvent` and `CallCompositeIncomingCallCancelledEvent`. `CallCompositeIncomingCallEvent` contains the incoming callId and caller information. `CallCompositeIncomingCallCancelledEvent` contains callId and call cancellation code [Troubleshooting in Azure Communication Services](../../concepts/troubleshooting-info.md#calling-sdk-error-codes).

#### [Kotlin](#tab/kotlin)

```kotlin
    private var incomingCallEvent: IncomingCallEvent? = null
    private var incomingCallCancelledEvent: IncomingCallCancelledEvent? = null

    class IncomingCallEvent : CallCompositeEventHandler<CallCompositeIncomingCallEvent> {
        override fun handle(eventArgs: CallCompositeIncomingCallEvent?) {
            // Display incoming call UI to accept/decline a call
            // CallCompositeIncomingCallEvent contains call id and caller information
        }
    }

    class IncomingCallCancelledEvent : CallCompositeEventHandler<CallCompositeIncomingCallCancelledEvent> {
        override fun handle(eventArgs: CallCompositeIncomingCallCancelledEvent?) {
            // Call-ended event when a call is declined or not accepted
        }
    }

    // Event subscription
    incomingCallEvent = IncomingCallEvent()
    callComposite.addOnIncomingCallEventHandler(incomingCallEvent)

    incomingCallCancelledEvent = IncomingCallCancelledEvent()
    callComposite.addOnIncomingCallCancelledEventHandler(incomingCallEndEvent)

    // Event unsubscribe
    callComposite.removeOnIncomingCallEventHandler(incomingCallEvent)
    callComposite.removeOnIncomingCallCancelledEventHandler(incomingCallEndEvent)
```

#### [Java](#tab/java)

```java
    callComposite.addOnIncomingCallEventHandler((call) -> {
        // Display incoming call UI to accept/decline a call
        // incomingCallEvent.getCallId()
        // incomingCallEvent.getCallerIdentifier()
        // incomingCallEvent.getCallerDisplayName()
    });

    callComposite.addOnIncomingCallCancelledEventHandler((call) -> {
        // Call-ended event when a call is declined or not accepted
        // incomingCallCancelledEvent.getCallId()
        // incomingCallCancelledEvent.getCode()
        // incomingCallCancelledEvent.getSubCode()
    });
```

---

### Handle calls

To accept calls, make a call to `accept`. To decline calls, make a call to `reject`.

#### [Kotlin](#tab/kotlin)

```kotlin
// Accept call
callComposite.accept(applicationContext, incomingCallId, localOptions)

// Decline call
callComposite.reject(incomingCallId)
```

#### [Java](#tab/java)

```java
// Accept call
callComposite.accept(applicationContext, incomingCallId, localOptions);

// Decline call
callComposite.reject(incomingCallId);
```

---

### Dial other participants

To start calls with other participants, create `CallCompositeStartCallOptions` with participants' raw IDs from `CommunicationIdentity` and `launch`.

#### [Kotlin](#tab/kotlin)

```kotlin
    val participants: List<CommunicationIdentifier> // participants to dial
    callComposite.launch(context, participants, localOptions)
```

#### [Java](#tab/java)

```java
    Collection<CommunicationIdentifier> participants; // participants to dial
    callComposite.launch(applicationContext, participants, localOptions);
```

---



**Applies to: platform-ios**


For more information, see the [open-source iOS UI Library](https://github.com/Azure/communication-ui-library-ios) and the [sample application code](https://github.com/Azure-Samples/communication-services-ios-quickstarts/tree/main/ui-calling).

### Set up push notifications

A mobile push notification is the pop-up notification that you get in the mobile device. This article focuses on voice over Internet Protocol (VoIP) push notifications.

The following sections describe how to register for, handle, and unregister push notifications. Before you start those tasks, complete these prerequisites:

1. In Xcode, go to **Signing & Capabilities**. Add a capability by selecting **+ Capability**, and then select **Push Notifications**.
2. Add another capability by selecting **+ Capability**, and then select **Background Modes**.
3. Under **Background Modes**, select the **Voice over IP** and **Remote notifications** checkboxes.

### Add incoming notifications to your mobile app

Azure Communication Services integrates with [Azure Event Grid](../../../event-grid/overview.md) and [Azure Notification Hubs](../../../notification-hubs/notification-hubs-push-notification-overview.md), so you can [add push notifications](../../concepts/notifications.md) to your apps in Azure. 

### Register/unregister for notification hub push notifications

To register for push notifications, the application needs to call `registerPushNotifications()` on a `CallComposite` instance with a device registration token.

```swift
    // to register
    let deviceToken: Data = pushRegistry?.pushToken(for: PKPushType.voIP)
    callComposite.registerPushNotifications(
        deviceRegistrationToken: deviceToken) { result in
        switch result {
            case .success:
                // success
            case .failure(let error):
                // failure
        }
    }

    // to unregister
    callComposite.unregisterPushNotification()
```

### Handle push notifications received from Event Grid or notification hub

To receive push notifications for incoming calls, call `handlePushNotification()` on a `CallComposite` instance with a dictionary payload.

When you use `handlePushNotification()` and CallKit options are set, you get a CallKit notification to accept or decline calls.

```swift
    // App is in the background
    // push notification contains from/to communication identifiers and event type
    let pushNotification = PushNotification(data: payload.dictionaryPayload)
    let callKitOptions = CallKitOptions(...//CallKit options)
    CallComposite.reportIncomingCall(pushNotification: pushNotification,
                                    callKitOptions: callKitOptions) { result in
        if case .success() = result {
            DispatchQueue.global().async {
                // You don't need to wait for a Communication Services token to handle the push because 
                // Communication Services common receives a callback function to get the token with refresh options
                // create call composite and handle push notification
                callComposite.handlePushNotification(pushNotification: pushNotification)
            }
        }
    }

    // App is in the foreground
    let pushNotification = PushNotification(data: dictionaryPayload)
    callComposite.handlePushNotification(pushNotification: pushNotification) { result in
        switch result {
            case .success:
                // success
            case .failure(let error):
                // failure
        }
    }
```

### Register for incoming call notifications on handle push

To receive incoming call notifications after `handlePushNotification`, subscribe to `onIncomingCall` and `onIncomingCallCancelled`. `IncomingCall` contains the incoming callId and caller information. `IncomingCallCancelled` contains callId and call cancellation code [Troubleshooting in Azure Communication Services](../../concepts/troubleshooting-info.md#calling-sdk-error-codes).

```swift
    let onIncomingCall: (IncomingCall) -> Void = { [] incomingCall in
        // Incoming call id and caller info
    }
    let onIncomingCallEnded: (IncomingCallCancelled) -> Void = { [] incomingCallCancelled in
        // Incoming call cancelled code with callId
    }
    callComposite.events.onIncomingCall = onIncomingCall
    callComposite.events.onIncomingCallEnded = onIncomingCallEnded
```

### Disable internal push for incoming call

To receive push notifications only from `EventGrid` and `APNS` set `disableInternalPushForIncomingCall` to true in `CallCompositeOptions`. If `disableInternalPushForIncomingCall` is true, push notification event from ui library received only when `handlePushNotification` will be called. The option `disableInternalPushForIncomingCall` helps to stop receiving notifications from `CallComposite` in foreground mode. This setting doesn't control `EventGrid` and `NotificationHub` settings.

```swift
    let options = CallCompositeOptions(disableInternalPushForIncomingCall: true)
```

### Launch composite on incoming call accepted from calling SDK CallKit
The Azure Communication Services Calling iOS SDK supports CallKit integration. You can enable this integration in the UI Library by configuring an instance of `CallCompositeCallKitOption`. For more information, see [Integrate with CallKit](../calling-sdk/callkit-integration.md).

Subscribe to `onIncomingCallAcceptedFromCallKit` if CallKit from calling SDK is enabled. On call accepted, launch `callComposite` with call ID.

```swift
    let onIncomingCallAcceptedFromCallKit: (callId) -> Void = { [] callId in
        // Incoming call accepted call id
    }
    
    callComposite.events.onIncomingCallAcceptedFromCallKit = onIncomingCallAcceptedFromCallKit

    // launch composite with/without local options
    // Note: as call is already accepted, setup screen will not be displayed
    callComposite.launch(callIdAcceptedFromCallKit: callId)
```

### Handle calls with CallComposite 

To accept calls, make a call to `accept`. To decline calls, make a call to `reject`.

```swift
// Accept call
callComposite.accept(incomingCallId, 
                     ... // CallKit and local options
                     )

// Decline call
callComposite.reject(incomingCallId)
```

### Dial other participants

To start calls with other participants, launch `callComposite` with participants' list of `CommunicationIdentifier`.

```swift
    // [CommunicationIdentifier]
    // use createCommunicationIdentifier(fromRawId: "raw id")
    callComposite.launch(participants: <list of CommunicationIdentifier>,
                         localOptions: localOptions)
```



## Next steps

- [Learn more about the UI Library](../../concepts/ui-library/ui-library-overview.md)
