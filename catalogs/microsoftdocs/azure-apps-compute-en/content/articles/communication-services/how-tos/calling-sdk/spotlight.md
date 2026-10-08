---
title: Enable spotlight
titleSuffix: An Azure Communication Services article
description: Use Azure Communication Services SDKs to send spotlight state.
author: sloanster
ms.author: micahvivion
ms.service: azure-communication-services
ms.subservice: teams-interop
ms.topic: how-to 
ms.date: 06/15/2025
ms.custom: template-how-to
zone_pivot_groups: acs-plat-web-ios-android-windows
---

# Enable spotlight


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


This article describes how to implement spotlight capability with Azure Communication Services Calling SDKs. Spotlight enables users in the call or meeting to signal to other participants that selected user should be **in the spotlight**. Spotlight also enables users to tag other users in the call and notify all the participants that someone is spotlighted and other clients need to change the User Interface layout for that user.

## Overview

Spotlight serves as a signaling feature instead of a media capability. When a participant is spotlighted, applications can determine how to manage or adjust the spotlighted participant User Interface. Spotlight typically results in highlighting the participant, placing them at the center of the UI layout. Spotlight also enlarges their video renderer size while keeping other participant videos smaller. The maximum limit of spotlighted participants in a call is seven, meaning in a single call a total number of distinct users that are spotlighted is seven (7).

Spotlighting a participant is possible in both Azure Communication Services calls and in Teams meetings. In Teams meetings the organizer, coorganizer, or presenter can choose up to seven (7) users (including themselves) to be in the spotlight. Remember that in a Teams meeting scenario, when a call is set to Large gallery or Together mode, participants can't change the UI layout.

To enable higher resolution for a spotlighted user's video, the application must ensure that their video renderer is larger than other users displayed on the screen. Larger rendering enables the Azure Communication Services SDK to request and subscribe to a higher resolution stream, which matches the renderer's size, provided hardware and network conditions permit. If not optimal, the SDK adjusts the resolution for smooth playback. Resolution can also be controlled using via [Video Constraints](../../concepts/voice-video-calling/video-constraints.md), overriding the default Azure Communication Services SDK behavior.


## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn). 
- A deployed Communication Services resource. [Create a Communication Services resource](../../quickstarts/create-communication-resource.md).
- A user access token to enable the calling client. For more information, see [Create and manage access tokens](../../quickstarts/identity/access-tokens.md).
- Optional: Complete the quickstart to [add voice calling to your application](../../quickstarts/voice-video-calling/getting-started-with-calling.md)


## Support

The following tables define support for spotlight in Azure Communication Services.

## Identities and call types

The following table shows support for call and identity types. 

| Identities | Teams meeting | Room | 1:1 call | Group call | 1:1 Teams interop call | Group Teams interop call |
| --- | --- | --- | --- | --- | --- | --- |
| Communication Services user | ✔️ | ✔️ |  | ✔️ |  | ✔️ |
| Microsoft 365 user | ✔️ | ✔️ |  | ✔️ |  | ✔️ |

## Operations

Azure Communication Services or Microsoft 365 users can call spotlight operations based on role type and conversation type.

The following table shows support for individual operations in Calling SDK to individual identity types.

**In one-to-one calls, group calls, and meeting scenarios the following operations are supported for both Communication Services and Microsoft 365 users**

| Operations | Communication Services user | Microsoft 365 user |
| --- | --- | --- |
| `startSpotlight` | ✔️ [1] | ✔️ [1] |
| `stopSpotlight` | ✔️ | ✔️ |
| `stopAllSpotlight` | ✔️ [1] | ✔️ [1] |
| `getSpotlightedParticipants` | ✔️ | ✔️ |
| `StartSpotlightAsync` | ✔️ [1] | ✔️ [1] |
| `StopSpotlightAsync` | ✔️ [1] | ✔️ [1] |
| `StopAllSpotlightAsync` | ✔️ [1] | ✔️ [1] |
| `SpotlightedParticipants` | ✔️ [1] | ✔️ [1] |
| `MaxSupported` | ✔️ [1] | ✔️ [1] |

[1] In Teams meeting scenarios, these operations are only available to users with role organizer, co-organizer, or presenter.

## SDKs

The following table shows support for spotlight feature in individual Azure Communication Services SDKs.

| Platforms | Web | Web UI | iOS | iOS UI | Android | Android UI | Windows |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Is Supported | ✔️ | ✔️ | ✔️ |  | ✔️ |  | ✔️ |

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




## Implement spotlight

Spotlight is an extended feature of the core `Call` API. You first need to import calling features from the Calling SDK.

```js
import { Features} from "@azure/communication-calling";
```

Then you can get the feature API object from the call instance.

```js
const spotLightFeature = call.feature(Features.Spotlight);
```

### Start spotlight for current participant

To pin the video of the current/local participant, use the following code. This action is idempotent, trying to start spotlight on a pinned participant does nothing.

```js
spotLightFeature.startSpotlight();
```

### Spotlight specific participants

Any participant in the call or meeting can be pinned. Only Microsoft 365 users who have an organizer, co-organizer, or presenter role can start spotlight for other participants. This action is idempotent, trying to start spotlight on a pinned participant does nothing.

```js
// Specify list of participants to be spotlighted
CommunicationUserIdentifier acsUser = new CommunicationUserIdentifier(<USER_ID>);
MicrosoftTeamsUserIdentifier teamsUser = new MicrosoftTeamsUserIdentifier(<USER_ID>)
spotLightFeature.startSpotlight([acsUser, teamsUser]);
```

### Stop spotlight for current participant

To unpin the video of the current/local participant, use the following code. This action is idempotent, trying to stop spotlight on an unpinned participant does nothing.

```js
spotLightFeature.stopSpotlight();
```

### Remove spotlight from participants

Any pinned participant in the call or meeting can be unpinned. Only Microsoft 365 users who have an organizer, co-organizer, or presenter role can unpin other participants. This action is idempotent, trying to stop spotlight on an unpinned participant does nothing.

You need a list of participants identifiers to use this feature.

```js
// Specify list of participants to be spotlighted
CommunicationUserIdentifier acsUser = new CommunicationUserIdentifier(<USER_ID>);
MicrosoftTeamsUserIdentifier teamsUser = new MicrosoftTeamsUserIdentifier(<USER_ID>)
spotLightFeature.stopSpotlight([acsUser, teamsUser]);
```

### Remove all spotlights

All pinned participants can be unpinned using this operation. Only `MicrosoftTeamsUserIdentifier` users who have an organizer, co-organizer, or presenter role can unpin all participants.

```js
spotLightFeature.stopAllSpotLight();
```

### Handle changed states

Spotlight mode enables you to subscribe to `SpotlightChanged` events. A `SpotlightChanged` event comes from a call instance and contains information about newly spotlighted participants and participants whose spotlight stopped. The returned array `SpotlightedParticipant` is sorted by the order the participants were spotlighted.

To get information about all participants with spotlight state changes on the current call, use the following code.

```js
// event : { added: SpotlightedParticipant[]; removed: SpotlightedParticipant[] }
// SpotlightedParticipant = { identifier: CommunicationIdentifier, order?: number }
// where: 
//  identifier: ID of participant whose spotlight state is changed
//  order: sequence of the event

const spotlightChangedHandler = (event) => {
    console.log(`Newly added spotlight state ${JSON.stringify(event.added)}`);
    console.log(`Newly removed spotlight state ${JSON.stringify(event.removed)}`);
};
spotLightFeature.on('spotlightChanged', spotlightChangedHandler);
```

Use the following to stop receiving `spotlightUpdated` events.

```js
spotLightFeature.off('spotlightChanged', spotlightChangedHandler);
```

### Get List of all participants currently spotlighted

To get information about all participants that have spotlight state on current call, use the following operation. The returned array `SpotlightedParticipant` is sorted by the order the participants were spotlighted.

```js
let spotlightedParticipants = spotLightFeature.getSpotlightedParticipants();
```

### Get the maximum supported spotlight participants

Use the following operation to get the maximum number of participants that can be spotlighted using the Calling SDK.

```js
spotLightFeature.maxParticipantsToSpotlight;
```



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


## Implement spotlight

Spotlight is an extended feature of the core `Call` API. You first need to import calling features from the Calling SDK.

```java
import com.azure.android.communication.calling.SpotlightFeature;
```

Then you can get the feature API object from the call instance.

```java
SpotlightCallFeature spotlightCallFeature;
spotlightCallFeature = call.feature(Features.SPOTLIGHT);
```

### Start spotlight for participants

Any participant in the call or meeting can be pinned. Only Microsoft 365 users who have an organizer, co-organizer, or presenter role can start spotlight for other participants. This action is idempotent, trying to start spotlight on a pinned participant does nothing

You need a list of participant identifiers to use this feature.

```java
List<CommunicationIdentifier> spotlightIdentifiers = new ArrayList<>();
CommunicationUserIdentifier acsUser = new CommunicationUserIdentifier(<USER_ID>);
MicrosoftTeamsUserIdentifier teamsUser = new MicrosoftTeamsUserIdentifier(<USER_ID>);
spotlightIdentifiers.add(new CommunicationUserIdentifier("<USER_ID>"));
spotlightIdentifiers.add(new MicrosoftTeamsUserIdentifier("<USER_ID>"));
spotlightCallFeature.StartSpotlight(spotlightIdentifiers);
```

You can also use the following code to start a participant spotlight.

```java
CommunicationUserIdentifier acsUser = new CommunicationUserIdentifier(<USER_ID>);
MicrosoftTeamsUserIdentifier teamsUser = new MicrosoftTeamsUserIdentifier(<USER_ID>);
spotlightCallFeature.StartSpotlight(acsUser, teamsUser);
```

### Remove spotlight from participants

Any pinned participant in the call or meeting can be unpinned. Only Microsoft 365 users who have an organizer, co-organizer, or presenter role can unpin other participants. This action is idempotent, trying to stop spotlight on an unpinned participant does nothing.

You need a list of participants identifiers to use this feature.

```java
List<CommunicationIdentifier> spotlightIdentifiers = new ArrayList<>();
CommunicationUserIdentifier acsUser = new CommunicationUserIdentifier(<USER_ID>);
MicrosoftTeamsUserIdentifier teamsUser = new MicrosoftTeamsUserIdentifier(<USER_ID>);
spotlightIdentifiers.add(new CommunicationUserIdentifier("<USER_ID>"));
spotlightIdentifiers.add(new MicrosoftTeamsUserIdentifier("<USER_ID>"));
spotlightCallFeature.StopSpotlight(spotlightIdentifiers);
```

You can also use the following code to remove a participant spotlight.

```java
CommunicationUserIdentifier acsUser = new CommunicationUserIdentifier(<USER_ID>);
MicrosoftTeamsUserIdentifier teamsUser = new MicrosoftTeamsUserIdentifier(<USER_ID>);
spotlightCallFeature.StopSpotlight(acsUser, teamsUser);
```

### Remove all spotlights

All pinned participants can be unpinned using this operation. Only `MicrosoftTeamsUserIdentifier` users who have an organizer, co-organizer, or presenter role can unpin all participants.

```java
spotlightCallFeature.stopAllSpotlight();
```

### Handle changed states

Spotlight mode enables you to subscribe to `SpotlightChanged` events. A `SpotlightChanged` event comes from a call instance and contains information about newly spotlighted participants and participants whose spotlight stopped. The returned array `SpotlightedParticipant` is sorted by the order the participants were spotlighted.

To get information about all participants with spotlight state changes on the current call, use the following code.

```java
import com.azure.android.communication.calling.SpotlightedParticipant;

// event : { added: SpotlightedParticipant[]; removed: SpotlightedParticipant[] }
// SpotlightedParticipant = { identifier: CommunicationIdentifier }
// where: 
//  identifier: ID of participant whose spotlight state is changed
void onSpotlightChanged(SpotlightChangedEvent args) {
    Log.i(ACTIVITY_TAG, String.format("Spotlight Changed Event"));
    for(SpotlightedParticipant participant: args.getadded()) {
        Log.i(ACTIVITY_TAG, String.format("Added ==>: %s %d", Utilities.toMRI(participant.getIdentifier())));
    }

    for(SpotlightedParticipant participant: args.getremoved()) {
        Log.i(ACTIVITY_TAG, String.format("Removed ==>: %s %d", Utilities.toMRI(participant.getIdentifier())));
    }
}
spotlightCallFeature.addOnSpotlightChangedListener(onSpotlightChanged);
```

### Get all spotlighted participants

To get information about all participants that have spotlight state on current call, use the following operation. The returned array is sorted by the order the participants were spotlighted.

``` java
List<SpotlightedParticipant> currentSpotlightedParticipants = spotlightCallFeature.getSpotlightedParticipants();
foreach (SpotlightedParticipant participant in currentSpotlightedParticipants)
{
    Trace.WriteLine("Participant " + participant.Identifier.RawId + " has spotlight");
}
```

### Get the maximum supported spotlight participants

Use the following operation to get the maximum number of participants that can be spotlighted using the Calling SDK.

``` java
spotlightCallFeature.maxSupported();
```


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


## Implement spotlight

Spotlight is an extended feature of the core `Call` API. You first need to import calling features from the Calling SDK.

```swift
import AzureCommunicationCalling
```

Then you can get the feature API object from the call instance:

```swift
@State var spotlightFeature: SpotlightCallFeature?

spotlightFeature = self.call!.feature(Features.spotlight)
```

### Start spotlight for participants

Any participant in the call or meeting can be pinned. Only Microsoft 365 users who have an organizer, co-organizer, or presenter role can start spotlight for other participants. This action is idempotent, trying to start spotlight on a pinned participant does nothing

You need a list of participant identifiers to use this feature.

```swift 
var identifiers : [CommunicationIdentifier] = []
identifiers.append(CommunicationUserIdentifier("<USER_ID>"))
identifiers.append(MicrosoftTeamsUserIdentifier("<USER_ID>"))
spotlightFeature.startSpotlight(participants: identifiers, completionHandler: { (error) in
    if let error = error {
        print ("startSpotlight failed %@", error as Error)
    }
})
```

### Remove spotlight from participants

Any pinned participant in the call or meeting can be unpinned. Only Microsoft 365 users who have an organizer, co-organizer, or presenter role can unpin other participants. This action is idempotent, trying to stop spotlight on an unpinned participant does nothing.

You need a list of participants identifiers to use this feature.

```swift
var identifiers : [CommunicationIdentifier] = []
identifiers.append(CommunicationUserIdentifier("<USER_ID>"))
identifiers.append(MicrosoftTeamsUserIdentifier("<USER_ID>"))
spotlightFeature.stopSpotlight(participants: identifiers, completionHandler: { (error) in
    if let error = error {
        print ("stopSpotlight failed %@", error as Error)
    }
})
```

### Remove all spotlights

All pinned participants can be unpinned using this operation. Only `MicrosoftTeamsUserIdentifier` users who have an organizer, co-organizer, or presenter role can unpin all participants.

```swift
spotlightFeature.stopAllSpotlight(completionHandler: { (error) in
    if let error = error {
        print ("stopAllSpotlight failed %@", error as Error)
    }
})
```

### Handle changed states

Spotlight mode enables you to subscribe to `SpotlightChanged` events. A `SpotlightChanged` event comes from a call instance and contains information about newly spotlighted participants and participants whose spotlight stopped. The returned array `SpotlightedParticipant` is sorted by the order the participants were spotlighted.

To get information about all participants with spotlight state changes on the current call, use the following code.

```swift
// event : { added: SpotlightedParticipant[]; removed: SpotlightedParticipant[] }
// SpotlightedParticipant = { identifier: CommunicationIdentifier }
// where: 
//  identifier: ID of participant whose spotlight state is changed

spotlightFeature = self.call!.feature(Features.spotlight)
spotlightFeature!.delegate = self.SpotlightDelegate

public class SpotlightDelegate: SpotlightCallFeatureDelegate {
    public func SpotlightCallFeature(_ spotlightCallFeature: SpotlightCallFeature, didChangeSpotlight args: SpotlightChangedEventArgs) {
        args.added.forEach { participant in
            print("Spotlight participant " + Utilities.toMri(participant.identifier) +  "is ON")
        }
        args.removed.forEach { participant in
            print("Spotlight participant " + Utilities.toMri(participant.identifier) +  "is OFF")
        }
    }
}
```

### Get all spotlighted participants

To get information about all participants that have spotlight state on the current call, use the following operation. The returned array is sorted by the order the participants were spotlighted.

``` swift
spotlightCallFeature.spotlightedParticipants.forEach { participant in
    print("Spotlight active for participant: " + Utilities.toMri(participant.identifier))
}
```

### Get the maximum supported spotlight participants

Use the following operation to get the maximum number of participants that can be spotlighted using the Calling SDK.

``` swift
spotlightCallFeature.maxSupported();
```


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


## Implement spotlight

Spotlight is an extended feature of the core `Call` API. You first need to import calling features from the Calling SDK.

```csharp
using Azure.Communication.Calling.WindowsClient;
```

Then you can get the feature API object from the call instance.

```csharp
private SpotlightCallFeature spotlightCallFeature;
spotlightCallFeature = call.Features.Spotlight;
```

### Start spotlight for participants

Any participant in the call or meeting can be pinned. Only Microsoft 365 users who have an organizer, co-organizer or presenter role can start spotlight for other participants. This action is idempotent, trying to start spotlight on a pinned participant does nothing

To use this feature, a list of participants identifiers is required

```csharp
List<CallIdentifier> spotlightIdentifiers= new List<CallIdentifier>();
spotlightIdentifiers.Add("USER_ID");
spotlightIdentifiers.Add("USER_ID");
spotlightCallFeature.StartSpotlightAsync(spotlightIdentifiers);
```

### Remove spotlight from participants

Any pinned participant in the call or meeting can be unpinned. Only Microsoft 365 users who have an organizer, co-organizer, or presenter role can unpin other participants. This action is idempotent, trying to stop spotlight on an unpinned participant does nothing.

You need a list of participants identifiers to use this feature.

```csharp
List<CallIdentifier> spotlightIdentifiers= new List<CallIdentifier>();
spotlightIdentifiers.Add("USER_ID");
spotlightIdentifiers.Add("USER_ID");
spotlightCallFeature.StopSpotlightAsync(spotlightIdentifiers);
```

### Remove all spotlights

All pinned participants can be unpinned using this operation. Only `MicrosoftTeamsUserIdentifier` users who have an organizer, co-organizer, or presenter role can unpin all participants.

```csharp
spotlightCallFeature.StopAllSpotlightAsync();
```

### Handle changed states

Spotlight mode enables you to subscribe to `SpotlightChanged` events. A `SpotlightChanged` event comes from a call instance and contains information about newly spotlighted participants and participants whose spotlight stopped. The returned array `SpotlightedParticipant` is sorted by the order the participants were spotlighted.

To get information about all participants with spotlight state changes on the current call, use the following code.

```csharp
// event : { added: SpotlightedParticipant[]; removed: SpotlightedParticipant[] }
// SpotlightedParticipant = { identifier: CommunicationIdentifier }
// where: 
//  identifier: ID of participant whose spotlight state is changed
private void OnSpotlightChange(object sender, SpotlightChangedEventArgs args)
{
    foreach (SpotlightedParticipant rh in args.added)
    {
        Trace.WriteLine("Added ===========> " + rh.Identifier.RawId);
    }
    foreach (SpotlightedParticipant rh in args.removed)
    {
        Trace.WriteLine("Removed =========> " + rh.Identifier.RawId);
    }
}
spotlightCallFeature.SpotlightChanged += OnSpotlightChange;
```

### Get all spotlighted participants

To get information about all participants that have spotlight state on the current call, use the following operation. The returned array is sorted by the order the participants were spotlighted.

``` csharp
List<SpotlightedParticipant> currentSpotlightedParticipants = spotlightCallFeature.SpotlightedParticipants();
foreach (SpotlightedParticipant participant in currentSpotlightedParticipants)
{
    Trace.WriteLine("Participant " + participant.Identifier.RawId + " has spotlight");
}
```

### Get the maximum supported spotlight participants

Use the following operation to get the maximum number of participants that can be spotlighted using the Calling SDK.

``` csharp
spotlightCallFeature.MaxSupported();
```



## Troubleshooting

| Code | Subcode | Result Category | Reason | Resolution |
| --- | --- | --- | --- | --- |
| 400 | 45900 | ExpectedError | All provided participant IDs are already spotlighted. | Only participants who aren't currently spotlighted can be spotlighted. |
| 400 | 45902 | ExpectedError | The maximum number of participants are already spotlighted. | Only seven participants can be in the spotlight state at any given time. |
| 403 | 45903 | ExpectedError | Only participants with the roles of organizer, coorganizer, or presenter can initiate a spotlight. | Ensure the participant calling the `startSpotlight` operation has the role of organizer, coorganizer, or presenter. |

## Next steps

- [Learn how to manage calls](manage-calls.md)
- [Learn how to manage video](manage-video.md)
- [Learn how to record calls](record-calls.md)
- [Learn how to transcribe calls](call-transcription.md)
