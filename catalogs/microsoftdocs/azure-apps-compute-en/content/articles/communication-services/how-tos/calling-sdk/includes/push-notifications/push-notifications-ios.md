---
author: probableprime
ms.service: azure-communication-services
ms.topic: include
ms.date: 06/28/2025
ms.author: rifox
---

## Implement iOS mobile push notifications

Mobile push notifications are the pop-up notifications that appear on mobile devices. For calling, this article focuses on voice over Internet Protocol (VoIP) push notifications. For a guide on CallKit integration in your iOS application, see [Integrate with CallKit](../../callkit-integration.md).

> **Note:**
> When the application registers for push notifications and handles the incoming push notifications for a Teams user, the APIs are the same. The APIs that this article describes can also be invoked on the `CommonCallAgent` or `TeamsCallAgent` class.


## Set up your system

Follow these steps to set up your system.

### Create the Xcode project

In Xcode, create a new iOS project and select the **Single View App** template. This article uses the [SwiftUI framework](https://developer.apple.com/xcode/swiftui/), so you should set **Language** to **Swift** and set **Interface** to **SwiftUI**.

You're not going to create tests in this article. Feel free to clear the **Include Tests** checkbox.

Screenshot that shows the window for creating a project within Xcode.

### Install the package and dependencies by using CocoaPods

1. Create a Podfile for your application, like this example:

    ```
    platform :ios, '13.0'
    use_frameworks!
    target 'AzureCommunicationCallingSample' do
        pod 'AzureCommunicationCalling', '~> 1.0.0'
    end
    ```

1. Run `pod install`.

1. Open `.xcworkspace` by using Xcode.

### Request access to the microphone

To access the device's microphone, you need to update your app's information property list by using `NSMicrophoneUsageDescription`. Set the associated value to a string that's included in the dialog that the system uses to request access from the user.

Right-click the **Info.plist** entry of the project tree, and then select **Open As** > **Source Code**. Add the following lines in the top-level `<dict>` section, and then save the file.

```xml
<key>NSMicrophoneUsageDescription</key>
<string>Need microphone access for VOIP calling.</string>
```

### Set up the app framework

Open your project's `ContentView.swift` file. Add an `import` declaration to the top of the file to import the `AzureCommunicationCalling` library. In addition, import `AVFoundation`. You need it for audio permission requests in the code.

```swift
import AzureCommunicationCalling
import AVFoundation
```

### Initialize CallAgent

To create a `CallAgent` instance from `CallClient`, you have to use a `callClient.createCallAgent` method that asynchronously returns a `CallAgent` object after it's initialized.

To create a call client, pass a `CommunicationTokenCredential` object:

```swift
import AzureCommunication

let tokenString = "token_string"
var userCredential: CommunicationTokenCredential?
do {
    let options = CommunicationTokenRefreshOptions(initialToken: token, refreshProactively: true, tokenRefresher: self.fetchTokenSync)
    userCredential = try CommunicationTokenCredential(withOptions: options)
} catch {
    updates("Couldn't created Credential object", false)
    initializationDispatchGroup!.leave()
    return
}

// tokenProvider needs to be implemented by Contoso, which fetches a new token
public func fetchTokenSync(then onCompletion: TokenRefreshOnCompletion) {
    let newToken = self.tokenProvider!.fetchNewToken()
    onCompletion(newToken, nil)
}
```

Pass the `CommunicationTokenCredential` object that you created to `CallClient`, and set the display name:

```swift
self.callClient = CallClient()
let callAgentOptions = CallAgentOptions()
options.displayName = " iOS Azure Communication Services User"

self.callClient!.createCallAgent(userCredential: userCredential!,
    options: callAgentOptions) { (callAgent, error) in
        if error == nil {
            print("Create agent succeeded")
            self.callAgent = callAgent
        } else {
            print("Create agent failed")
        }
})
```


### Set up push notifications

Before you start the tasks of registering for, handling, and unregistering push notifications, complete this setup task:

1. In Xcode, go to **Signing & Capabilities**. Add a capability by selecting **+ Capability**, and then select **Push Notifications**.
2. Add another capability by selecting **+ Capability**, and then select **Background Modes**.
3. Under **Background Modes**, select the **Voice over IP** and **Remote notifications** checkboxes.

Screenshot that shows how to add capabilities in Xcode.

## Register for push notifications

To register for push notifications, call `registerPushNotification()` on a `CallAgent` instance by using a device registration token.

Registration for push notifications needs to happen after successful initialization. When the `callAgent` object is destroyed, `logout` is called, which automatically unregisters push notifications.

```swift
let deviceToken: Data = pushRegistry?.pushToken(for: PKPushType.voIP)
callAgent.registerPushNotifications(deviceToken: deviceToken!) { (error) in
    if(error == nil) {
        print("Successfully registered to push notification.")
    } else {
        print("Failed to register push notification.")
    }
}
```

## Handle push notifications

To receive push notifications for incoming calls, call `handlePushNotification()` on a `CallAgent` instance with a dictionary payload:

```swift
let callNotification = PushNotificationInfo.fromDictionary(pushPayload.dictionaryPayload)

callAgent.handlePush(notification: callNotification) { (error) in
    if (error == nil) {
        print("Handling of push notification was successful")
    } else {
        print("Handling of push notification failed")
    }
}
```

## Unregister push notifications

Applications can unregister push notification at any time. To unregister, call the `unregisterPushNotification` method on `CallAgent`.

> **Note:**
> Applications aren't automatically unregistered from push notifications on sign out.

```swift
callAgent.unregisterPushNotification { (error) in
    if (error == nil) {
        print("Unregister of push notification was successful")
    } else {
       print("Unregister of push notification failed, please try again")
    }
}
```

## Disable internal push notifications for an incoming call

The push payload of an incoming call can be delivered to the callee in two ways:

- Using Apple Push Notification service (APNS) and registering the device token with the API mentioned earlier, `registerPushNotification` on `CallAgent` or `TeamsCallAgent`
- Registering the SDK with an internal service upon creation of `CallAgent` or `TeamsCallAgent` to get the push payload delivered

By using the property `disableInternalPushForIncomingCall` in `CallAgentOptions` or `TeamsCallAgentOptions`, you can instruct the SDK to disable the delivery of the push payload via the internal push service:

```swift
let options = CallAgentOptions()
options.disableInternalPushForIncomingCall = true
```
