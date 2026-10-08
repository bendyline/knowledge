---
title: Show active speakers
titleSuffix: An Azure Communication Services article
description: Use Azure Communication Services SDKs to render the active speakers in a call.
author: jsaurezlee-msft
ms.author: jsaurezlee
ms.service: azure-communication-services
ms.subservice: calling
ms.topic: how-to 
ms.date: 06/15/2025
ms.custom: template-how-to
zone_pivot_groups: acs-plat-web-ios-android-windows

#Customer intent: As a developer, I want to get a list of active speakers within a call.
---

# Show active speakers within a call


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


During an active call, you might want to get a list of active speakers in order to render or display them differently. Here's how.

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn). 
- A deployed Communication Services resource. [Create a Communication Services resource](../../quickstarts/create-communication-resource.md).
- A user access token to enable the calling client. For more information, see [Create and manage access tokens](../../quickstarts/identity/access-tokens.md).
- Optional: Complete the quickstart to [add voice calling to your application](../../quickstarts/voice-video-calling/getting-started-with-calling.md)

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




Dominant Speakers is an extended feature of the core Call object that enables the user to monitor the most dominant speakers in the current call. Participants can join and leave the list based on how they're performing in the call.

When joined to a group call consisting of multiple participants, the calling SDKs identify which meeting participants are currently speaking. Active speakers identify which participants are being heard in each received audio frame. Dominant speakers identify which participants are currently most active or dominant in the group conversation, though their voice isn't necessarily heard in every audio frame. The set of dominant speakers can change as different participants take turns speaking, video subscription requests based on dominant speaker logic can be implemented. 

As participants join, leave, climb up or down in this list of participants, the client application can take this information and customize the call experience accordingly. For example, the client application can show the most dominant speakers in the call in a different UI to separate from the ones that aren't participating actively in the call.

Developers can receive updates and obtain information about the most Dominant Speakers in a call.

This information is being a represented as:
- An ordered list of the Remote Participants that represents the Dominant Speakers in the call.
- A timestamp marking the date when this list was last modified.


To use the Dominant Speakers call feature for Android, the first step is to obtain the Dominant Speakers object:

```js
const callDominantSpeakersApi = call.feature(Features.CallDominantSpeakers);
```

Then, obtain the list of the dominant speakers by calling `dominantSpeakers`. This object has a type of `DominantSpeakersInfo`, which has the following members:

- `speakersList` contains the list of the ranked dominant speakers in the call. You can identify the speakers by their participant ID.
- `timestamp` is the latest update time for the dominant speakers in the call.

```js
let dominantSpeakers: DominantSpeakersInfo = callDominantSpeakersApi.dominantSpeakers;
```
Also, you can subscribe to the `dominantSpeakersChanged` event to know when the dominant speakers list changes.

```js
const dominantSpeakersChangedHandler = () => {
    // Get the most up to date list of dominant speakers
    let dominantSpeakers = callDominantSpeakersApi.dominantSpeakers;
};
callDominantSpeakersApi.on('dominantSpeakersChanged', dominantSpeakersChangedHandler);
``` 
#### Handle the Dominant Speaker's video streams

Your application can use the `DominantSpeakers` feature to render one or more of dominant speaker's video streams, and keep updating UI whenever dominant speaker list updates. Use the following code example.

```js
// RemoteParticipant obj representation of the dominant speaker
let dominantRemoteParticipant: RemoteParticipant;
// It is recommended to use a map to keep track of a stream's associated renderer
let streamRenderersMap: new Map<RemoteVideoStream, VideoStreamRenderer>();

function getRemoteParticipantForDominantSpeaker(dominantSpeakerIdentifier) {
    let dominantRemoteParticipant: RemoteParticipant;
    switch(dominantSpeakerIdentifier.kind) {
        case 'communicationUser': {
            dominantRemoteParticipant = currentCall.remoteParticipants.find(rm => {
                return (rm.identifier as CommunicationUserIdentifier).communicationUserId === dominantSpeakerIdentifier.communicationUserId
            });
            break;
        }
        case 'microsoftTeamsUser': {
            dominantRemoteParticipant = currentCall.remoteParticipants.find(rm => {
                return (rm.identifier as MicrosoftTeamsUserIdentifier).microsoftTeamsUserId === dominantSpeakerIdentifier.microsoftTeamsUserId
            });
            break;
        }
        case 'unknown': {
            dominantRemoteParticipant = currentCall.remoteParticipants.find(rm => {
                return (rm.identifier as UnknownIdentifier).id === dominantSpeakerIdentifier.id
            });
            break;
        }
    }
    return dominantRemoteParticipant;
}
// Handler function for when the dominant speaker changes
const dominantSpeakersChangedHandler = async () => {
    // Get the new dominant speaker's identifier
    const newDominantSpeakerIdentifier = currentCall.feature(Features.DominantSpeakers).dominantSpeakers.speakersList[0];

     if (newDominantSpeakerIdentifier) {
        // Get the remote participant object that matches newDominantSpeakerIdentifier
        const newDominantRemoteParticipant = getRemoteParticipantForDominantSpeaker(newDominantSpeakerIdentifier);

        // Create the new dominant speaker's stream renderers
        const streamViews = [];
        for (const stream of newDominantRemoteParticipant.videoStreams) {
            if (stream.isAvailable && !streamRenderersMap.get(stream)) {
                const renderer = new VideoStreamRenderer(stream);
                streamRenderersMap.set(stream, renderer);
                const view = await videoStreamRenderer.createView();
                streamViews.push(view);
            }
        }

        // Remove the old dominant speaker's video streams by disposing of their associated renderers
        if (dominantRemoteParticipant) {
            for (const stream of dominantRemoteParticipant.videoStreams) {
                const renderer = streamRenderersMap.get(stream);
                if (renderer) {
                    streamRenderersMap.delete(stream);
                    renderer.dispose();
                }
            }
        }

        // Set the new dominant remote participant obj
        dominantRemoteParticipant = newDominantRemoteParticipant

        // Render the new dominant remote participant's streams
        for (const view of streamViewsToRender) {
            htmlElement.appendChild(view.target);
        }
     }
};

// When call is disconnected, set the dominant speaker to undefined
currentCall.on('stateChanged', () => {
    if (currentCall === 'Disconnected') {
        dominantRemoteParticipant = undefined;
    }
});

const dominantSpeakerIdentifier = currentCall.feature(Features.DominantSpeakers).dominantSpeakers.speakersList[0];
dominantRemoteParticipant = getRemoteParticipantForDominantSpeaker(dominantSpeakerIdentifier);
currentCall.feature(Features.DominantSpeakers).on('dominantSpeakersChanged', dominantSpeakersChangedHandler);

subscribeToRemoteVideoStream = async (stream: RemoteVideoStream, participant: RemoteParticipant) {
    let renderer: VideoStreamRenderer;

    const displayVideo = async () => {
        renderer = new VideoStreamRenderer(stream);
        streamRenderersMap.set(stream, renderer);
        const view = await renderer.createView();
        htmlElement.appendChild(view.target);
    }

    stream.on('isAvailableChanged', async () => {
        if (dominantRemoteParticipant !== participant) {
            return;
        }

        renderer = streamRenderersMap.get(stream);
        if (stream.isAvailable && !renderer) {
            await displayVideo();
        } else {
            streamRenderersMap.delete(stream);
            renderer.dispose();
        }
    });

    if (dominantRemoteParticipant !== participant) {
        return;
    }

    renderer = streamRenderersMap.get(stream);
    if (stream.isAvailable && !renderer) {
        await displayVideo();
    }
}
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


Dominant Speakers is an extended feature of the core Call object that enables the user to monitor the most dominant speakers in the current call. Participants can join and leave the list based on how they're performing in the call.

When joined to a group call consisting of multiple participants, the calling SDKs identify which meeting participants are currently speaking. Active speakers identify which participants are being heard in each received audio frame. Dominant speakers identify which participants are currently most active or dominant in the group conversation, though their voice isn't necessarily heard in every audio frame. The set of dominant speakers can change as different participants take turns speaking, video subscription requests based on dominant speaker logic can be implemented. 

As participants join, leave, climb up or down in this list of participants, the client application can take this information and customize the call experience accordingly. For example, the client application can show the most dominant speakers in the call in a different UI to separate from the ones that aren't participating actively in the call.

Developers can receive updates and obtain information about the most Dominant Speakers in a call.

This information is being a represented as:
- An ordered list of the Remote Participants that represents the Dominant Speakers in the call.
- A timestamp marking the date when this list was last modified.


To use the Dominant Speakers call feature for Android, the first step is to obtain the Dominant Speakers object:

```java
DominantSpeakersFeature dominantSpeakersFeature = call.feature(Features.DOMINANT_SPEAKERS);
```
The Dominant Speakers feature object has the following structure:

- `OnDominantSpeakersChanged`: Event for listening for changes in the dominant speakers list.
- `getDominantSpeakersInfo()`: Gets the `DominantSpeakersInfo` object. This object has:
    - `getSpeakers()`: A list of participant identifiers representing the dominant speakers list.
    - `getLastUpdatedAt()`: The date when the dominant speakers list was updated. 

To subscribe to changes in the Dominant Speakers list:

```java

// Obtain the extended feature object from the call object.
DominantSpeakersFeature dominantSpeakersFeature = call.feature(Features.DOMINANT_SPEAKERS);
// Subscribe to the OnDominantSpeakersChanged event.
dominantSpeakersFeature.addOnDominantSpeakersChangedListener(handleDominantSpeakersChangedlistener);

private void handleCallOnDominantSpeakersChanged(PropertyChangedEvent args) {
    // When the list changes, get the timestamp of the last change and the current list of Dominant Speakers
    DominantSpeakersInfo dominantSpeakersInfo = dominantSpeakersFeature.getDominantSpeakersInfo();
    Date timestamp = dominantSpeakersInfo.getLastUpdatedAt();
    List<CommunicationIdentifier> dominantSpeakers = dominantSpeakersInfo.getSpeakers();
}
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


Dominant Speakers is an extended feature of the core Call object that enables the user to monitor the most dominant speakers in the current call. Participants can join and leave the list based on how they're performing in the call.

When joined to a group call consisting of multiple participants, the calling SDKs identify which meeting participants are currently speaking. Active speakers identify which participants are being heard in each received audio frame. Dominant speakers identify which participants are currently most active or dominant in the group conversation, though their voice isn't necessarily heard in every audio frame. The set of dominant speakers can change as different participants take turns speaking, video subscription requests based on dominant speaker logic can be implemented. 

As participants join, leave, climb up or down in this list of participants, the client application can take this information and customize the call experience accordingly. For example, the client application can show the most dominant speakers in the call in a different UI to separate from the ones that aren't participating actively in the call.

Developers can receive updates and obtain information about the most Dominant Speakers in a call.

This information is being a represented as:
- An ordered list of the Remote Participants that represents the Dominant Speakers in the call.
- A timestamp marking the date when this list was last modified.


To use the Dominant Speakers call feature for Windows, the first step is to obtain the Dominant Speakers object:

```csharp
DominantSpeakersCallFeature dominantSpeakersFeature = call.Features.DominantSpeakers;
```

The Dominant Speakers feature object has the following structure:

- `OnDominantSpeakersChanged`: Event for listening for changes in the dominant speakers list.
- `DominantSpeakersInfo`: Gets the `DominantSpeakersInfo` object. This object has:
    - `Speakers`: A list of participant identifiers representing the dominant speakers list.
    - `LastUpdatedAt`: The date when the dominant speakers list was updated. 

To subscribe to changes in the dominant speakers list:

```csharp
// Obtain the extended feature object from the call object.
DominantSpeakersFeature dominantSpeakersFeature = call.Features.DominantSpeakers;
// Subscribe to the OnDominantSpeakersChanged event.
dominantSpeakersFeature.OnDominantSpeakersChanged += DominantSpeakersFeature__OnDominantSpeakersChanged;

private void DominantSpeakersFeature__OnDominantSpeakersChanged(object sender, PropertyChangedEventArgs args) {
  // When the list changes, get the timestamp of the last change and the current list of Dominant Speakers
  DominantSpeakersInfo dominantSpeakersInfo = dominantSpeakersFeature.DominantSpeakersInfo;
  DateTimeOffset date = dominantSpeakersInfo.LastUpdatedAt;
  IReadOnlyList<ICommunicationIdentifier> speakersList = dominantSpeakersInfo.Speakers;
}
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


Dominant Speakers is an extended feature of the core Call object that enables the user to monitor the most dominant speakers in the current call. Participants can join and leave the list based on how they're performing in the call.

When joined to a group call consisting of multiple participants, the calling SDKs identify which meeting participants are currently speaking. Active speakers identify which participants are being heard in each received audio frame. Dominant speakers identify which participants are currently most active or dominant in the group conversation, though their voice isn't necessarily heard in every audio frame. The set of dominant speakers can change as different participants take turns speaking, video subscription requests based on dominant speaker logic can be implemented. 

As participants join, leave, climb up or down in this list of participants, the client application can take this information and customize the call experience accordingly. For example, the client application can show the most dominant speakers in the call in a different UI to separate from the ones that aren't participating actively in the call.

Developers can receive updates and obtain information about the most Dominant Speakers in a call.

This information is being a represented as:
- An ordered list of the Remote Participants that represents the Dominant Speakers in the call.
- A timestamp marking the date when this list was last modified.


To use the Dominant Speakers call feature for iOS, the first step is to obtain the Dominant Speakers object:

```swift
let dominantSpeakersFeature = call.feature(Features.dominantSpeakers)
```
The Dominant Speakers feature object has the following structure:

- `didChangeDominantSpeakers`: Event for listening for changes in the dominant speakers list.
- `dominantSpeakersInfo`: Which gets the `DominantSpeakersInfo` object. This object has:
    - `speakers`: A list of participant identifiers representing the dominant speakers list.
    - `lastUpdatedAt`: The date when the dominant speakers list was updated.

To subscribe to changes in the dominant speakers list:

```swift
// Obtain the extended feature object from the call object.
let dominantSpeakersFeature = call.feature(Features.dominantSpeakers)
// Set the delegate object to obtain the event callback.
dominantSpeakersFeature.delegate = DominantSpeakersDelegate()

public class DominantSpeakersDelegate : DominantSpeakersCallFeatureDelegate
{
    public func dominantSpeakersCallFeature(_ dominantSpeakersCallFeature: DominantSpeakersCallFeature, didChangeDominantSpeakers args: PropertyChangedEventArgs) {
        // When the list changes, get the timestamp of the last change and the current list of Dominant Speakers
        let dominantSpeakersInfo = dominantSpeakersCallFeature.dominantSpeakersInfo
        let timestamp = dominantSpeakersInfo.lastUpdatedAt
        let dominantSpeakersList = dominantSpeakersInfo.speakers
    }
}
```



## Next steps
- [Learn how to manage video](manage-video.md)
- [Learn how to manage calls](manage-calls.md)
- [Learn how to record calls](record-calls.md)
