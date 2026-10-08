---
title: Enable audio noise suppression improvements
titleSuffix: An Azure Communication Services article
description: This article describes how to add audio effects in your calls using Azure Communication Services.
author: zehangzheng

services: azure-communication-services
ms.date: 06/27/2025
ms.author: zehangzheng
ms.topic: include
ms.service: azure-communication-services
ms.subservice: calling
---


## Configure audio filters with the Native Calling SDKs 

The Azure Communication Services audio effects offer filters that can improve your audio call. For native platforms (Android, iOS, and Windows), you can configure the following filters.

### Echo cancellation

You can eliminate acoustic echo caused by the caller's voice echoing back into the microphone after being emitted from the speaker. Echo cancellation ensures clear communication.

You can configure the filter before and during a call. You can toggle echo cancellation only if music mode is enabled. By default, this filter is enabled.

### Noise suppression

You can improve audio quality by filtering out unwanted background noises such as typing, air conditioning, or street sounds. This technology ensures that the voice is crisp and clear to facilitate more effective communication.

You can configure the filter before and during a call. The currently available modes are **Off**, **Auto**, **Low**, and **High**. By default, this feature is set to **High**.

### Automatic gain control

You can automatically adjust the microphone's volume to ensure consistent audio levels throughout the call.

- Analog automatic gain control is a filter that's available only before a call. By default, this filter is enabled.
- Digital automatic gain control is a filter that's available only before a call. By default, this filter is enabled.

### Music mode

Music mode is a filter that's available before and during a call. To learn more about music mode, see [Music mode on Native Calling SDK](../../../concepts/voice-video-calling/music-mode.md). Music mode works only on native platforms over one-on-one or group calls. It doesn't work in one-to-one calls between native platforms and the web. By default, music mode is disabled.

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- A deployed Azure Communication Services resource. [Create an Azure Communication Services resource](../../../quickstarts/create-communication-resource.md).
- A user access token to enable the calling client. For more information, see [Create and manage access tokens](../../../quickstarts/identity/access-tokens.md).
- Optional: Complete the quickstart to [add voice calling to your application](../../../quickstarts/voice-video-calling/getting-started-with-calling.md).


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


You can use the audio filter feature to apply different audio preprocessing options to outgoing audio. The two types of audio filters are `OutgoingAudioFilters` and `LiveOutgoingAudioFilters`. Use `OutgoingAudioFilters` to change settings before the call starts. Use `LiveOutgoingAudioFilters` to change settings while a call is in progress.

You first need to import the Calling SDK:

```swift
import AzureCommunicationCalling
```

## Before the call starts

You can apply `OutgoingAudioFilters` when a call starts.

Begin by creating an `OutgoingAudioFilters` property and passing it into `OutgoingAudioOptions`, as shown here:

```swift
let outgoingAudioOptions = OutgoingAudioOptions()
let filters = OutgoingAudioFilters()
filters.NoiseSuppressionMode = NoiseSuppressionMode.high
filters.analogAutomaticGainControlEnabled = true
filters.digitalAutomaticGainControlEnabled = true
filters.musicModeEnabled = true
filters.acousticEchoCancellationEnabled = true
outgoingAudioOptions.audioFilters = filters
```

## During the call

You can apply `LiveOutgoingAudioFilters` after a call begins. You can retrieve this object from the call object during the call. To change the setting in `LiveOutgoingAudioFilters`, set the members inside the class to a valid value and they're applied.

Only a subset of the filters available from `OutgoingAudioFilters` are available during an active call. They're music mode, echo cancellation, and noise suppression mode.

```swift
LiveOutgoingAudioFilters filters = call.liveOutgoingAudioFilters
filters.musicModeEnabled = true
filters.acousticEchoCancellationEnabled = true
filters.NoiseSuppressionMode = NoiseSuppressionMode.high
```
