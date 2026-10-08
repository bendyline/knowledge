---
title: Get local capabilities
titleSuffix: An Azure Communication Services article
description: Use Azure Communication Services SDK to get capabilities of the local user in a call.
author: elavarasid
ms.author: elavarasid
ms.service: azure-communication-services
ms.subservice: calling
ms.topic: how-to
ms.date: 06/20/2025
ms.custom: template-how-to
zone_pivot_groups: acs-plat-web-ios-android-windows
---

# Get local capabilities


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


During a call, does a participant have permission to turn on video, turn on mic, or share screen?

These permissions are examples of participant capabilities that you can learn from the capabilities API operation. You can use capabilities to build a user interface that only shows the buttons related to the actions the local user can perform.

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- A deployed Communication Services resource. [Create a Communication Services resource](../../quickstarts/create-communication-resource.md).
- A user access token to enable the calling client. For more information, see [Create and manage access tokens](../../quickstarts/identity/access-tokens.md).
- Optional: Complete the quick start to [add voice calling to your application](../../quickstarts/voice-video-calling/getting-started-with-calling.md).

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




The ability to view capabilities is an extended feature of the core `Call` API. It enables you to obtain the capabilities of the local participant in the current call.

The feature enables you to register for an event listener to listen for capability changes.

## Get the capabilities feature

>```js
>const capabilitiesFeature = this.call.feature(Features.Capabilities);
>```

## Get the capabilities of the local participant

The capabilities object has the capabilities of the local participants and is of type `ParticipantCapabilities`. Properties of capabilities include:

- *isPresent* indicates if a capability is present.
- *reason* indicates capability resolution reason.

```js
const capabilities =  capabilitiesFeature.capabilities;
```

**Subscribe to `capabilitiesChanged` event:**

```js
capabilitiesFeature.on('capabilitiesChanged', (capabilitiesChangeInfo) => {
    for (const [key, value] of Object.entries(capabilitiesChangeInfo.newValue)) {
        if(key === 'turnVideoOn' && value.reason != 'FeatureNotSupported') {
             (value.isPresent) ? this.setState({ canOnVideo: true }) : this.setState({ canOnVideo: false });
             continue;
        }
        if(key === 'unmuteMic' && value.reason != 'FeatureNotSupported') {
            (value.isPresent) ? this.setState({ canUnMuteMic: true }) : this.setState({ canUnMuteMic: false });
            continue;
        }
        if(key === 'shareScreen' && value.reason != 'FeatureNotSupported') {
            (value.isPresent) ? this.setState({ canShareScreen: true }) : this.setState({ canShareScreen: false });
            continue;
        }
        if(key === 'spotlightParticipant' && value.reason != 'FeatureNotSupported') {
            (value.isPresent) ? this.setState({ canSpotlight: true }) : this.setState({ canSpotlight: false });
            continue;
        }
        if(key === 'raiseHand' && value.reason != 'FeatureNotSupported') {
            (value.isPresent) ? this.setState({ canRaiseHands: true }) : this.setState({ canRaiseHands: false });
            continue;
        }
        if(key === 'muteOthers' && value.reason != 'FeatureNotSupported') {
            (value.isPresent) ? this.setState({ canMuteOthers: true }) : this.setState({ canMuteOthers: false });
            continue;
        }
        if(key === 'reaction' && value.reason != 'FeatureNotSupported') {
            (value.isPresent) ? this.setState({ canReact: true }) : this.setState({ canReact: false });
            continue;
        }
        if(key === 'forbidOthersAudio' && value.reason != 'FeatureNotSupported') {
            (value.isPresent) ? this.setState({ canForbidOthersAudio: true }) : this.setState({ canForbidOthersAudio: false });
            continue;
        }
        if(key === 'forbidOthersVideo' && value.reason != 'FeatureNotSupported') {
            (value.isPresent) ? this.setState({ canForbidOthersVideo: true }) : this.setState({ canForbidOthersVideo: false });
            continue;
        }
    }
});
```

## Capabilities Exposed

- *turnVideoOn*: Ability to turn on video
- *unmuteMic*: Ability to send audio
- *shareScreen*: Ability to share screen
- *removeParticipant*: Ability to remove a participant
- *hangUpForEveryOne*: Ability to hang up for everyone
- *addCommunicationUser*: Ability to add a communication user
- *addTeamsUser*: Ability to add Teams User
- *addPhoneNumber*: Ability to add phone number
- *manageLobby*: Ability to manage lobby (beta only)
- *spotlightParticipant*: Ability to spotlight Participant (beta only)
- *removeParticipantsSpotlight*: Ability to remove Participant spotlight (beta only)
- *startLiveCaptions*: Ability to start live captions (beta only)
- *stopLiveCaptions*: Ability to stop live captions (beta only)
- *raiseHand*: Ability to raise hand (beta only)
- *muteOthers*: Ability to soft mute remote participants in the meeting 
- *reaction*: Ability to react in the meeting (beta only)
- *viewAttendeeNames*: Ability to view attendee names in the meeting
- *forbidOthersAudio*: Ability to forbid attendees' audio in the meeting or group call
- *forbidOthersVideo*: Ability to forbid attendees' video in the meeting or group call



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


The ability to view capabilities is an extended feature of the core `Call` API. It enables you to obtain the capabilities of the local participant in the current call.

The feature enables you to register for an event listener to listen for capability changes.

To use the capabilities call feature for Windows, the first step is to obtain the capabilities feature API object:

## Get the capabilities feature

```java
private CapabilitiesCallFeature capabilitiesCallFeature;
capabilitiesCallFeature = call.feature(Features.CAPABILITIES);
```

## Get the capabilities of the local participant

The capabilities object has the capabilities of the local participants and is of type `ParticipantCapability`. Properties of capabilities include:

- *isAllowed* indicates if a capability can be used.
- *reason* indicates capability resolution reason.

```java
List<ParticipantCapability> capabilities = capabilitiesCallFeature.getCapabilities();
```

## Subscribe to `capabilitiesChanged` event

```java

capabilitiesCallFeature.addOnCapabilitiesChangedListener(this::OnCapabilitiesChanged);

private void OnCapabilitiesChanged(CapabilitiesChangedEvent args)
{
    String event = String.format("Capabilities Event: %s", args.getReason().toString());
    Log.i("CapabilitiesInfo", event);
    for (ParticipantCapability capability : args.getChangedCapabilities())
    {
        Log.i("CapabilitiesInfo", capability.getType().toString() + " is " capability.getReason().toString());
    }
}
```

## Capabilities Exposed

- *TurnVideoOn*: Ability to turn on video
- *UnmuteMicrophone*: Ability to unmute microphone
- *ShareScreen*: Ability to share screen
- *RemoveParticipant*: Ability to remove a participant
- *HangUpForEveryone*: Ability to hang up for everyone
- *AddCommunicationUser*: Ability to add a communication user
- *AddTeamsUser*: Ability to add Teams User
- *AddPhoneNumber*: Ability to add phone number
- *ManageLobby*: Ability to manage lobby
- *SpotlightParticipant*: Ability to spotlight Participant
- *RemoveParticipantSpotlight*: Ability to remove Participant spotlight
- *BlurBackground*: Ability to blur background
- *CustomBackground*: Ability to apply a custom background
- *StartLiveCaptions*: Ability to start live captions
- *RaiseHand*: Ability to raise hand
- *MuteOthers*: Ability to soft mute remote participants in the meeting 



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


The ability to view capabilities is an extended feature of the core `Call` API. It enables you to obtain the capabilities of the local participant in the current call.

The feature enables you to register for an event listener to listen for capability changes.

To use the Capabilities call feature for Windows, the first step is to obtain the Capabilities feature API object:

## Get the capabilities feature

```C#
private CapabilitiesCallFeature capabilitiesCallFeature;
capabilitiesCallFeature = call.Features.Capabilities;
```

## Get the capabilities of the local participant

The capabilities object has the capabilities of the local participants and is of type `ParticipantCapability`. Properties of capabilities include:

- *isAllowed* indicates if a capability can be used.
- *reason* indicates capability resolution reason.

```C#
var capabilities = capabilitiesCallFeature.Capabilities;
```

## Subscribe to `capabilitiesChanged` event

```C#
capabilitiesCallFeature.CapabilitiesChanged += Call__OnCapabilitiesChangedAsync;

private async void Call__OnCapabilitiesChangedAsync(object sender, CapabilitiesChangedEventArgs args)
{
    Trace.WriteLine(args.Reason.ToString());
    foreach (var capability in args.ChangedCapabilities)
    {
        //Prints out capability kind and resolution reason in console
        Trace.WriteLine(capability.Kind.ToString() + " is " + capability.Reason.ToString());
    }
}
```

## Capabilities Exposed

- *TurnVideoOn*: Ability to turn on video
- *UnmuteMicrophone*: Ability to unmute microphone
- *ShareScreen*: Ability to share screen
- *RemoveParticipant*: Ability to remove a participant
- *HangUpForEveryone*: Ability to hang up for everyone
- *AddCommunicationUser*: Ability to add a communication user
- *AddTeamsUser*: Ability to add Teams User
- *AddPhoneNumber*: Ability to add phone number
- *ManageLobby*: Ability to manage lobby
- *SpotlightParticipant*: Ability to spotlight Participant
- *RemoveParticipantSpotlight*: Ability to remove Participant spotlight
- *BlurBackground*: Ability to blur background
- *CustomBackground*: Ability to apply a custom background
- *StartLiveCaptions*: Ability to start live captions
- *RaiseHand*: Ability to raise hand
- *MuteOthers*: Ability to soft mute remote participants in the meeting 



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


The ability to view capabilities is an extended feature of the core `Call` API. It enables you to obtain the capabilities of the local participant in the current call.

The feature enables you to register for an event listener to listen for capability changes.

To use the capabilities call feature for Windows, the first step is to obtain the capabilities feature API object:

## Get the capabilities feature

```swift
let capabilitiesCallFeature =call.feature(Features.capabilities)
```

## Get the capabilities of the local participant

The capabilities object has the capabilities of the local participants and is of type `ParticipantCapability`. Properties of capabilities include:

- *isAllowed* indicates if a capability can be used.
- *reason* indicates capability resolution reason.

```swift
var capabilities = capabilitiesCallFeature.capabilities
```

## Subscribe to `capabilitiesChanged` event

```swift

capabilitiesCallFeature.delegate = CapabilitiesCallDelegate()

public class CapabilitiesCallDelegate : CapabilitiesCallFeatureDelegate
{
    public func capabilitiesCallFeature(_ capabilitiesCallFeature: CapabilitiesCallFeature, didChangeCapabilities args: CapabilitiesChangedEventArgs) {
        let changedReason = args.reason
        let changedCapabilities = args.changedCapabilities
    }
}
```

## Capabilities Exposed

- *TurnVideoOn*: Ability to turn on video
- *UnmuteMicrophone*: Ability to unmute microphone
- *ShareScreen*: Ability to share screen
- *RemoveParticipant*: Ability to remove a participant
- *HangUpForEveryone*: Ability to hang up for everyone
- *AddCommunicationUser*: Ability to add a communication user
- *AddTeamsUser*: Ability to add Teams User
- *AddPhoneNumber*: Ability to add phone number
- *ManageLobby*: Ability to manage lobby
- *SpotlightParticipant*: Ability to spotlight Participant
- *RemoveParticipantSpotlight*: Ability to remove Participant spotlight
- *BlurBackground*: Ability to blur background
- *CustomBackground*: Ability to apply a custom background
- *StartLiveCaptions*: Ability to start live captions
- *RaiseHand*: Ability to raise hand
- *MuteOthers*: Ability to soft mute remote participants in the meeting 



## Supported call types

The following tables define the ability to get capabilities using the Azure Communication Services Calling SDK.

### Identities and call types

| Identities | Teams meeting | Room | 1:1 call | Group call | 1:1 Teams interop call | Group Teams interop call |
| --- | --- | --- | --- | --- | --- | --- |
| Communication Services user | ✔️ | ✔️ |  |  |  |  |
| Microsoft 365 user | ✔️ | ✔️ |  |  |  |  |

## Reasons

The following table provides additional information about why action isn't available and provides tips how to make the action available. 

| Reason | Description | Resolution |
| --- | --- | --- |
| Capable | Action is enabled. |  |
| CapabilityNotApplicableForTheCallType | Call type blocks the action. | Consider other type of call if you need this action. The call types are: 1:1 call, group call, 1:1 Teams interop call, 1:1 Teams interop group call, Room, and Meeting. |
| ClientRestricted | The runtime environment is blocking this action | Unblock the action on your device by changing operating system, browsers, platform, or hardware. You can find supported environment in our documentation. |
| UserPolicyRestricted | Microsoft 365 user's policy blocks the action. | Enable this action by changing policy that is assigned to the organizer of the meeting, initiator of the call or Microsoft 365 user using ACS SDK. The target user depends on the type of action. Learn more about Teams policy in Teams. Teams administrator can change policies. |
| RoleRestricted | Assigned role blocks the action. | Promote user to different role to make the action available. |
| FeatureNotSupported | The capabilities feature isn't supported in this call type. | Let us know in Azure Feedback channel that you would like to have this feature available for this call type. |
| MeetingRestricted | Teams meeting option blocks the action. | Teams meeting organizer or co-organizer needs to change meeting option to enable this action. |
| NotInitialized | The capabilities feature isn't initialized yet. | Subscribe to event `capabilitiesChanged` on `this.call.feature(Features.Capabilities)` to know when capability is initialized. |
| NotCapable | User type blocks the action. | The action is only enabled for specific identities. Enable this action by using Microsoft 365 identity. |
| TeamsPremiumLicenseRestricted | Microsoft 365 user needs to have Teams Premium license assigned. | Enable this action by assigning Teams Premium license to the Teams meeting organizer or the Microsoft 365 user using SDK. The target user depends on the type of action. Microsoft 365 admin can assign required license. |
| ExplicitConsentRequired | Consent is required to allow the action. | Provide the consent for recording or transcription by calling method `grantTeamsConsent()` under `this.call.feature(Features.Recording)` or `this.call.feature(Features.Transcription)` . |

## Next steps

- [Learn how to manage video](manage-video.md)
- [Learn how to manage calls](manage-calls.md)
- [Learn how to record calls](record-calls.md)
