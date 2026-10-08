---
title: Manage call recording on the client
titleSuffix: An Azure Communication Services how-to guide
description: Use Azure Communication Services SDKs to manage call recording on the client.
author: sundiraman
ms.author: sundraman
ms.service: azure-communication-services
ms.topic: how-to
ms.subservice: calling 
ms.date: 08/10/2021
ms.custom: template-how-to
zone_pivot_groups: acs-plat-web-ios-android-windows

#Customer intent: As a developer, I want to manage call recording on the client so that my users can record calls.
---

# Manage call recording on the client


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


> **Important:**
> This feature of Azure Communication Services is currently in preview. Features in preview are publicly available and can be used by all new and existing Microsoft customers.
>
> This preview version is provided without a service-level agreement, and we don't recommend it for production workloads. Certain features might not be supported or capabilities might be constrained.
>
> For more information, see [Supplemental Terms of Use for Microsoft Azure Previews](https://azure.microsoft.com/support/legal/preview-supplemental-terms/).


[Call recording](../../concepts/voice-video-calling/call-recording.md) lets your users record calls that they make with Azure Communication Services. In this article, you learn how to manage recording on the client side. Before you start, you need to set up recording on the [server side](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/quickstarts/voice-video-calling/call-recording-sample.md).

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- A deployed Communication Services resource. [Create a Communication Services resource](../../quickstarts/create-communication-resource.md).
- A user access token to enable the calling client. For more information, see [Create and manage access tokens](../../quickstarts/identity/access-tokens.md).
- Optional: Completion of the [quickstart to add voice calling to your application](../../quickstarts/voice-video-calling/getting-started-with-calling.md).

## Support
The following tables define support of recording in Azure Communication Services.
 
### Identities and call types
The following tables show support of recording for specific call type and identity.

| Identities | Teams meeting | Room | 1:1 call | Group call | 1:1 Teams interop call | Group Teams interop call |
| --- | --- | --- | --- | --- | --- | --- |
| Communication Services user | ✔️[1][2] | ✔️[3] |  | ✔️[3] |  | ✔️[2][3] |
| Microsoft 365 user | ✔️[1][2] |  |  |  |  | ✔️[2][3] |

[1] These call types support Teams cloud.
[2] These call types support Teams compliance recording.  
[3] These call types support Azure Communication Services recording.
 
### Operations
The following tables show support of individual APIs in calling SDK to individual identity types.

| Operations | Communication Services user | Microsoft 365 user |
| --- | --- | --- |
| Get notification that recording started or stopped | ✔️ | ✔️ |
| Get state of recording | ✔️ | ✔️ |
| Get notification that recording is available | ✔️[1] | ✔️[1] |
| Learn whether explicit consent is required | ✔️[2] | ✔️[2] |
| Give explicit consent for being recorded | ✔️[2] | ✔️[2] |

[1] A user is not notified that recording is available. You can subscribe to Microsoft Graph's change notifications for notification about availability of Teams cloud recording or you can subscribe to `Microsoft.Communication.RecordingFileStatusUpdated` event in Azure Communication Services to be notified when Azure Communication Services recording is available.
  
[2] This functionality is available only in Teams meetings and group Teams interoperability calls.
 
### SDKs
The following tables show support of recording in individual Azure Communication Services SDKs.

| Platforms | Web | Web UI | iOS | iOS UI | Android | Android UI | Windows |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Is Supported | ✔️ | ✔️[1] | ✔️[1] | ✔️[1] | ✔️[1] | ✔️[1] | ✔️[1] |

[1] These SDKs don't support explicit consent.

**Applies to: platform-web**

## Install the SDK

Use the `npm install` command to install the Azure Communication Services Common and Calling SDK for JavaScript:

```console
npm install @azure/communication-common --save
npm install @azure/communication-calling --save
```

## Initialize required objects

A `CallClient` instance is required for most call operations. When you create a new `CallClient` instance, you can configure it with custom options like a `Logger` instance.

With the `CallClient` instance, you can create a `CallAgent` instance by calling the `createCallAgent`. This method asynchronously returns a `CallAgent` instance object.

The `createCallAgent` method uses `CommunicationTokenCredential` as an argument. It accepts a [user access token](../../quickstarts/identity/access-tokens.md).

You can use the `getDeviceManager` method on the `CallClient` instance to access `deviceManager`.

```js
const { CallClient } = require('@azure/communication-calling');
const { AzureCommunicationTokenCredential} = require('@azure/communication-common');
const { AzureLogger, setLogLevel } = require("@azure/logger");

// Set the logger's log level
setLogLevel('verbose');

// Redirect log output to console, file, buffer, REST API, or whatever location you want
AzureLogger.log = (...args) => {
    console.log(...args); // Redirect log output to console
};

const userToken = '<USER_TOKEN>';
callClient = new CallClient(options);
const tokenCredential = new AzureCommunicationTokenCredential(userToken);
const callAgent = await callClient.createCallAgent(tokenCredential, {displayName: 'optional Azure Communication Services user name'});
const deviceManager = await callClient.getDeviceManager()
```

### Manage SDK connectivity to Microsoft infrastructure

The `Call Agent` instance helps you manage calls (to join or start calls). In order to work your calling SDK needs to connect to Microsoft infrastructure to get notifications of incoming calls and coordinate other call details. Your `Call Agent` has two possible states:

**Connected** - A `Call Agent` connectionStatue value of `Connected` means the client SDK is connected and capable of receiving notifications from Microsoft infrastructure.

**Disconnected** - A `Call Agent` connectionStatue value of `Disconnected` states there's an issue that is preventing the SDK it from properly connecting. `Call Agent` should be re-created.
- `invalidToken`: If a token is expired or is invalid `Call Agent` instance disconnects with this error.
- `connectionIssue`:  If there's an issue with the client connecting to Microsoft infrastructure, after many retries `Call Agent` exposes the `connectionIssue` error.

You can check if your local `Call Agent` is connected to Microsoft infrastructure by inspecting the current value of `connectionState` property. During an active call you can listen to the `connectionStateChanged` event to determine if `Call Agent` changes from **Connected** to **Disconnected** state.

```js
const connectionState = callAgentInstance.connectionState;
console.log(connectionState); // it may return either of 'Connected' | 'Disconnected'

const connectionStateCallback = (args) => {
    console.log(args); // it will return an object with oldState and newState, each of having a value of either of 'Connected' | 'Disconnected'
    // it will also return reason, either of 'invalidToken' | 'connectionIssue'
}
callAgentInstance.on('connectionStateChanged', connectionStateCallback);
```




> **Note:**
> This API is provided as a preview for developers and might change based on feedback that we receive. Don't use this API in a production environment. To use this API, use the beta release of the Azure Communication Services Calling Web SDK.

### Cloud and compliance recording

Call recording is an extended feature of the core Call API. You first need to import calling features from the Calling SDK:

```js
import { Features} from "@azure/communication-calling";
```

Then you can get the recording features' API object from the call instance:

```js
const callRecordingApi = call.feature(Features.Recording);
```

To check if the call is being recorded, inspect the `isRecordingActive` property of `callRecordingApi`. It returns `Boolean`.

```js
const isRecordingActive = callRecordingApi.isRecordingActive;
```

You can also subscribe to recording changes:

```js
const isRecordingActiveChangedHandler = () => {
    console.log(callRecordingApi.isRecordingActive);
};

callRecordingApi.on('isRecordingActiveChanged', isRecordingActiveChangedHandler);
```

You can get a list of recordings by using the `recordings` property of `callRecordingApi`. It returns `RecordingInfo[]`, which has the current state of the cloud recording.

```js
const recordings = callRecordingApi.recordings;

recordings.forEach(r => {
    console.log("State: ${r.state}");
```

You can also subscribe to `recordingsUpdated` and get a collection of updated recordings. This event is triggered whenever there's a recording update.

```js
const cloudRecordingsUpdatedHandler = (args: { added: SDK.RecordingInfo[], removed: SDK.RecordingInfo[]}) => {
                        console.log('Recording started by: ');
                        args.added?.forEach(a => {
                            console.log('State: ${a.state}');
                        });

                        console.log('Recording stopped by: ');
                        args.removed?.forEach(r => {
                            console.log('State: ${r.state}');
                        });
                    };
callRecordingApi.on('recordingsUpdated', cloudRecordingsUpdatedHandler );
```
## Explicit Consent
When your Teams meeting or call is configured to require explicit consent for recording and transcription, you're required to collect consent from all participants in the call before you can record them. You can provide consent proactively when joining the meeting or reactively when the recording starts. Until explicit consent is given, participants' audio, video, and screen sharing will be disabled during recording.
 
You can check if the meeting recording requires explicit consent by property `isTeamsConsentRequired`. If the value is set to `true`, then explicit consent is required for the `call`.
 
```js
const isConsentRequired = callRecordingApi.isTeamsConsentRequired;
```

If you have already obtained the user's consent for recording, you can call `grantTeamsConsent()` method to indicate explicit consent to the service. This consent is valid for one `call` session only and users need to provide consent again if they rejoin the meeting.
 
```js
callRecordingApi.grantTeamsConsent();
```

Attempts to enable audio, video, or screen sharing fail when recording is active, explicit consent is required but isn't yet given. You can recognize this situation by checking property `reason` of class `ParticipantCapabilities` for [capabilities](capabilities.md) `turnVideoOn`, `unmuteMic` and `shareScreen`. You can find those [capabilities](capabilities.md) in the feature `call.feature(Features.Capabilities)`. Those [capabilities](capabilities.md) would return reason `ExplicitConsentRequired` as users need to provide explicit consent.



**Applies to: platform-android**


## Install the SDK

Locate your project-level `build.gradle` file and add `mavenCentral()` to the list of repositories under `buildscript` and `allprojects`:

```groovy
buildscript {
    repositories {
    ...
        mavenCentral()
    ...
    }
}
```

```groovy
allprojects {
    repositories {
    ...
        mavenCentral()
    ...
    }
}
```

Then, in your module-level `build.gradle` file, add the following lines to the `dependencies` section:

```groovy
dependencies {
    ...
    implementation 'com.azure.android:azure-communication-calling:1.0.0'
    ...
}
```

## Initialize the required objects

To create a `CallAgent` instance, you have to call the `createCallAgent` method on a `CallClient` instance. This call asynchronously returns a `CallAgent` instance object.

The `createCallAgent` method takes `CommunicationUserCredential` as an argument, which encapsulates an [access token](../../quickstarts/identity/access-tokens.md).

To access `DeviceManager`, you must create a `callAgent` instance first. Then you can use the `CallClient.getDeviceManager` method to get `DeviceManager`.

```java
String userToken = '<user token>';
CallClient callClient = new CallClient();
CommunicationTokenCredential tokenCredential = new CommunicationTokenCredential(userToken);
android.content.Context appContext = this.getApplicationContext(); // From within an activity, for instance
CallAgent callAgent = callClient.createCallAgent(appContext, tokenCredential).get();
DeviceManager deviceManager = callClient.getDeviceManager(appContext).get();
```

To set a display name for the caller, use this alternative method:

```java
String userToken = '<user token>';
CallClient callClient = new CallClient();
CommunicationTokenCredential tokenCredential = new CommunicationTokenCredential(userToken);
android.content.Context appContext = this.getApplicationContext(); // From within an activity, for instance
CallAgentOptions callAgentOptions = new CallAgentOptions();
callAgentOptions.setDisplayName("Alice Bob");
DeviceManager deviceManager = callClient.getDeviceManager(appContext).get();
CallAgent callAgent = callClient.createCallAgent(appContext, tokenCredential, callAgentOptions).get();
```


## Record calls

> **Note:**
> This API is provided as a preview for developers and might change based on feedback that we receive. Don't use this API in a production environment. To use this API, use the beta release of the Azure Communication Services Calling Android SDK.

Call recording is an extended feature of the core `Call` object.

> **Warning:**
> Up until version 1.1.0 and beta release version 1.1.0-beta.1 of the Azure Communication Services Calling Android SDK, `isRecordingActive` and `addOnIsRecordingActiveChangedListener` were part of the `Call` object. For new beta releases, those APIs were moved as an extended feature of `Call`.

You first need to obtain the recording feature object:

```java
RecordingCallFeature callRecordingFeature = call.feature(Features.RECORDING);
```

Then, to check if the call is being recorded, inspect the `isRecordingActive` property of `callRecordingFeature`. It returns `boolean`.

```java
boolean isRecordingActive = callRecordingFeature.isRecordingActive();
```

You can also subscribe to recording changes:

```java
private void handleCallOnIsRecordingChanged(PropertyChangedEvent args) {
  boolean isRecordingActive = callRecordingFeature.isRecordingActive();
}

callRecordingFeature.addOnIsRecordingActiveChangedListener(handleCallOnIsRecordingChanged);
```

If you want to start recording from your application, first follow [Call recording overview](../../concepts/voice-video-calling/call-recording.md) for the steps to set up call recording.

After you set up call recording on your server, from your Android application, you need to obtain the `ServerCallId` value from the call and then send it to your server to start the recording process. You can find the `ServerCallId` value by using `getServerCallId()` from the `CallInfo` class. You can find the `CallInfo` class in the class object by using `getInfo()`.

```java
try {
    String serverCallId = call.getInfo().getServerCallId().get();
    // Send serverCallId to your recording server to start the call recording.
} catch (ExecutionException | InterruptedException e) {

} catch (UnsupportedOperationException unsupportedOperationException) {

}
```

When you start recording from the server, the event `handleCallOnIsRecordingChanged` is triggered and the value of `callRecordingFeature.isRecordingActive()` is `true`.

Just like starting the call recording, if you want to stop the call recording, you need to get `ServerCallId` and send it to your recording server so that it can stop the recording:

```java
try {
    String serverCallId = call.getInfo().getServerCallId().get();
    // Send serverCallId to your recording server to stop the call recording.
} catch (ExecutionException | InterruptedException e) {

} catch (UnsupportedOperationException unsupportedOperationException) {

}
```

When you stop recording from the server, the event `handleCallOnIsRecordingChanged` is triggered and the value of `callRecordingFeature.isRecordingActive()` is `false`.

## Explicit Consent
> **Note:**
> This API is provided as a preview for developers and might change based on feedback that we receive. Don't use this API in a production environment. To use this API, use the beta release of the Azure Communication Services Calling Android SDK.

When your Teams meeting or call is configured to require explicit consent for recording and transcription, you're required to collect consent from all participants in the call before you can record them. You can provide consent proactively when joining the meeting or reactively when the recording starts. Until explicit consent is given, participants' audio, video, and screen sharing will be disabled during recording.

You can check if the meeting recording requires explicit consent by property `isTeamsConsentRequired`. If the value is set to `true`, then explicit consent is required for the `call`.

```java
boolean isConsentRequired = callRecordingFeature.isTeamsConsentRequired();
```

If you have already obtained the user's consent for recording, you can call `grantTeamsConsent()` method to indicate explicit consent to the service. This consent is valid for one `call` session only and users need to provide consent again if they rejoin the meeting.

```java
callRecordingFeature.grantTeamsConsent();
```

Attempts to enable audio, video, or screen sharing fail when recording is active, explicit consent is required but isn't yet given. You can recognize this situation by checking property `reason` of class `ParticipantCapabilities` for [capabilities](capabilities.md) `turnVideoOn`, `unmuteMic` and `shareScreen`. You can find those [capabilities](capabilities.md) in the feature `call.feature(Features.Capabilities)`. Those [capabilities](capabilities.md) would return reason `ExplicitConsentRequired` as users need to provide explicit consent.


**Applies to: platform-ios**


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


## Record calls
> **Note:**
> This API is provided as a preview for developers and might change based on feedback that we receive. Don't use this API in a production environment. To use this API, use the beta release of the Azure Communication Services Calling iOS SDK.


Call recording is an extended feature of the core `Call` object.

> **Warning:**
> Up until version 1.1.0 and beta release version 1.1.0-beta.1 of the Azure Communication Services Calling iOS SDK, `isRecordingActive` was part of the `Call` object and `didChangeRecordingState` was part of the `CallDelegate` delegate. For new beta releases, those APIs were moved as an extended feature of `Call`.

You first need to obtain the recording feature object:

```swift
let callRecordingFeature = call.feature(Features.recording)
```

Then, to check if the call is being recorded, inspect the `isRecordingActive` property of `callRecordingFeature`. It returns `Bool`.

```swift
let isRecordingActive = callRecordingFeature.isRecordingActive;
```

You can also subscribe to recording changes by implementing the `RecordingCallFeatureDelegate` delegate on your class with the event `didChangeRecordingState`:

```swift
callRecordingFeature.delegate = self

// didChangeRecordingState is a member of RecordingCallFeatureDelegate
public func recordingCallFeature(_ recordingCallFeature: RecordingCallFeature, didChangeRecordingState args: PropertyChangedEventArgs) {
    let isRecordingActive = recordingFeature.isRecordingActive
}
```

If you want to start recording from your application, first follow [Call recording overview](../../concepts/voice-video-calling/call-recording.md) for the steps to set up call recording.

After you set up call recording on your server, from your iOS application, you need to obtain the `ServerCallId` value from the call and then send it to your server to start the recording process. You can find the `ServerCallId` value by using `getServerCallId()` from the `CallInfo` class. You can find the `CallInfo` class in the class object by using `getInfo()`.

```swift
// Send serverCallId to your recording server to start the call recording.
let serverCallId = call.info.getServerCallId(){ (serverId, error) in }
```

When you start recording from the server, the event `didChangeRecordingState` is triggered and the value of `recordingFeature.isRecordingActive` is `true`.

Just like starting the call recording, if you want to stop the call recording, you need to get `ServerCallId` and send it to your recording server so that it can stop the recording:

```swift
// Send serverCallId to your recording server to stop the call recording.
let serverCallId = call.info.getServerCallId(){ (serverId, error) in }
```

When you stop recording from the server, the event `didChangeRecordingState` is triggered and the value of `recordingFeature.isRecordingActive` is `false`.

## Explicit Consent
> **Note:**
> This API is provided as a preview for developers and might change based on feedback that we receive. Don't use this API in a production environment. To use this API, use the beta release of the Azure Communication Services Calling iOS SDK.

When your Teams meeting or call is configured to require explicit consent for recording and transcription, you're required to collect consent from all participants in the call before you can record them. You can provide consent proactively when joining the meeting or reactively when the recording starts. Until explicit consent is given, participants' audio, video, and screen sharing will be disabled during recording.

You can check if the meeting recording requires explicit consent by property `isTeamsConsentRequired`. If the value is set to `true`, then explicit consent is required for the `call`.

```swift
let isConsentRequired = recordingFeature.isTeamsConsentRequired;
```

If you have already obtained the user's consent for recording, you can call `grantTeamsConsent()` method to indicate explicit consent to the service. This consent is valid for one `call` session only and users need to provide consent again if they rejoin the meeting.

```swift
recordingFeature.grantTeamsConsent();
```

Attempts to enable audio, video, or screen sharing fail when recording is active, explicit consent is required but isn't yet given. You can recognize this situation by checking property `reason` of class `ParticipantCapabilities` for [capabilities](capabilities.md) `turnVideoOn`, `unmuteMic` and `shareScreen`. You can find those [capabilities](capabilities.md) in the feature `call.feature(Features.Capabilities)`. Those [capabilities](capabilities.md) would return reason `ExplicitConsentRequired` as users need to provide explicit consent.


**Applies to: platform-windows**


## Set up your system

Follow these steps to set up your system.

### Create the Visual Studio project

For a Universal Windows Platform app, in Visual Studio 2022, create a new **Blank App (Universal Windows)** project. After you enter the project name, feel free to choose any Windows SDK later than 10.0.17763.0.

For a WinUI 3 app, create a new project with the **Blank App, Packaged (WinUI 3 in Desktop)** template to set up a single-page WinUI 3 app. [Windows App SDK version 1.3](https://learn.microsoft.com/windows/apps/windows-app-sdk/stable-channel#version-13) or later is required.

### Install the package and dependencies by using NuGet Package Manager

The Calling SDK APIs and libraries are publicly available via a NuGet package.

To find, download, and install the Calling SDK NuGet package:

1. Open NuGet Package Manager by selecting **Tools** > **NuGet Package Manager** > **Manage NuGet Packages for Solution**.
1. Select **Browse**, and then enter **Azure.Communication.Calling.WindowsClient** in the search box.
1. Make sure that the **Include prerelease** checkbox is selected.
1. Select the **Azure.Communication.Calling.WindowsClient** package, and then select **Azure.Communication.Calling.WindowsClient** [1.4.0-beta.1](https://www.nuget.org/packages/Azure.Communication.Calling.WindowsClient/1.4.0-beta.1) or a newer version.
1. Select the checkbox that corresponds to the Azure Communication Services project on the right pane.
1. Select **Install**.


## Record calls

Call recording is an extended feature of the core `Call` object. You first need to obtain the recording feature object:

```csharp
RecordingCallFeature recordingFeature = call.Features.Recording;
```

Then, to check if the call is being recorded, inspect the `IsRecordingActive` property of `recordingFeature`. It returns `boolean`.

```csharp
boolean isRecordingActive = recordingFeature.IsRecordingActive;
```

You can also subscribe to recording changes:

```csharp
private async void Call__OnIsRecordingActiveChanged(object sender, PropertyChangedEventArgs args)
  boolean isRecordingActive = recordingFeature.IsRecordingActive;
}

recordingFeature.IsRecordingActiveChanged += Call__OnIsRecordingActiveChanged;
```

## Explicit Consent
> **Note:**
> This API is provided as a preview for developers and might change based on feedback that we receive. Don't use this API in a production environment. To use this API, use the beta release of the Azure Communication Services Calling Windows SDK.

When your Teams meeting or call is configured to require explicit consent for recording and transcription, you're required to collect consent from all participants in the call before you can record them. You can provide consent proactively when joining the meeting or reactively when the recording starts. Until explicit consent is given, participants' audio, video, and screen sharing will be disabled during recording.

You can check if the meeting recording requires explicit consent by property `isTeamsConsentRequired`. If the value is set to `true`, then explicit consent is required for the `call`.

```csharp
boolean isConsentRequired = recordingFeature.isTeamsConsentRequired;
```

If you have already obtained the user's consent for recording, you can call `grantTeamsConsent()` method to indicate explicit consent to the service. This consent is valid for one `call` session only and users need to provide consent again if they rejoin the meeting.

```csharp
recordingFeature.grantTeamsConsent();
```

Attempts to enable audio, video, or screen sharing fail when recording is active, explicit consent is required but isn't yet given. You can recognize this situation by checking property `reason` of class `ParticipantCapabilities` for [capabilities](capabilities.md) `turnVideoOn`, `unmuteMic` and `shareScreen`. You can find those [capabilities](capabilities.md) in the feature `call.feature(Features.Capabilities)`. Those [capabilities](capabilities.md) would return reason `ExplicitConsentRequired` as users need to provide explicit consent.


## SDK compatibility

The following table shows the minimum version of SDKs that support individual APIs.

| Operations | Web | Web UI | iOS | iOS UI | Android | Android UI | Windows |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Get notification that recording started or stopped | 1.0.0, 1.25.3-beta.1 | 1.0.0, 1.15.0-beta.1 | 2.0.0, 2.1.0-beta.1 | 1.0.0, 1.15.0-beta.1 | 2.0.0, 1.2.0-beta.1 | 1.0.0, 1.15.0-beta.1 | 1.0.0, 1.0.0-beta.31 |
| Get state of recording | 1.0.0, 1.25.3-beta.1 | 1.0.0, 1.15.0-beta.1 | 2.0.0, 2.1.0-beta.1 | 1.0.0, 1.15.0-beta.1 | 2.0.0, 1.2.0-beta.1 | 1.0.0, 1.15.0-beta.1 | 1.0.0, 1.0.0-beta.31 |
| Learn whether explicit consent is required | 1.31.2, 1.32.1-beta.1 | ❌ | 2.16.0-beta.1 | ❌ | 2.14.0-beta.1 | ❌ | 1.12.0-beta.1 |
| Give explicit consent for being recorded | 1.31.2, 1.32.1-beta.1 | ❌ | 2.16.0-beta.1 | ❌ | 2.14.0-beta.1 | ❌ | 1.12.0-beta.1 |

## Next steps

- [Learn how to manage calls](manage-calls.md)
- [Learn how to manage video](manage-video.md)
- [Learn how to transcribe calls](call-transcription.md)
