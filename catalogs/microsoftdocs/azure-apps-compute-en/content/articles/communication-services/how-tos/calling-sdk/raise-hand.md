---
title: Raise hand states
titleSuffix: An Azure Communication Services how-to guide
description: Use Azure Communication Services SDKs to send raised hand state.
author: sundiraman
ms.author: sundraman
ms.service: azure-communication-services
ms.subservice: calling
ms.topic: how-to 
ms.date: 06/15/2025
ms.custom: template-how-to
zone_pivot_groups: acs-plat-web-ios-android-windows

#Customer intent: As a developer, I want to learn how to send and receive Raise Hand state using SDK.
---

# Raise hand states


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


**Applies to: platform-android**

> **Important:**
> This feature of Azure Communication Services is currently in preview. Features in preview are publicly available and can be used by all new and existing Microsoft customers.
>
> This preview version is provided without a service-level agreement, and we don't recommend it for production workloads. Certain features might not be supported or capabilities might be constrained.
>
> For more information, see [Supplemental Terms of Use for Microsoft Azure Previews](https://azure.microsoft.com/support/legal/preview-supplemental-terms/).



**Applies to: platform-ios**

> **Important:**
> This feature of Azure Communication Services is currently in preview. Features in preview are publicly available and can be used by all new and existing Microsoft customers.
>
> This preview version is provided without a service-level agreement, and we don't recommend it for production workloads. Certain features might not be supported or capabilities might be constrained.
>
> For more information, see [Supplemental Terms of Use for Microsoft Azure Previews](https://azure.microsoft.com/support/legal/preview-supplemental-terms/).



**Applies to: platform-windows**

> **Important:**
> This feature of Azure Communication Services is currently in preview. Features in preview are publicly available and can be used by all new and existing Microsoft customers.
>
> This preview version is provided without a service-level agreement, and we don't recommend it for production workloads. Certain features might not be supported or capabilities might be constrained.
>
> For more information, see [Supplemental Terms of Use for Microsoft Azure Previews](https://azure.microsoft.com/support/legal/preview-supplemental-terms/).



During an active call, we recommend sending and receiving states from other participants. Let's learn how. 

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




The Raise Hand feature enables participants in a call to indicate that they have a question, comment, or concern without interrupting the speaker or other participants. You can use this feature in any call type, including 1:1 calls and calls with many participants, in Azure Communication Service and in Teams calls.

First you need to import calling Features from the Calling SDK:

```js
import { Features} from "@azure/communication-calling";
```

Then you can get the feature API object from the call instance:

```js
const raiseHandFeature = call.feature(Features.RaiseHand );
```

### Raise and lower hand for current participant

To change the Raise Hand state for the current participant, you can use the `raiseHand()` and `lowerHand()` methods.

These methods are async. To verify results, use `raisedHandChanged` and `loweredHandChanged` listeners.

```js
const raiseHandFeature = call.feature(Features.RaiseHand );
//raise
raiseHandFeature.raiseHand();
//lower
raiseHandFeature.lowerHand();
```

### Lower hands for other participants

This feature enables users with the Organizer and Presenter roles to lower all hands for other participants on Teams calls. In Azure Communication calls, you can't change the state of other participants unless adding the roles first.

To use this feature, implement the following code:

```js
const raiseHandFeature = call.feature(Features.RaiseHand );
//lower all hands on the call
raiseHandFeature.lowerAllHands();
//or we can provide array of CommunicationIdentifier to specify list of participants
CommunicationUserIdentifier acsUser = new CommunicationUserIdentifier(<USER_ID>);
MicrosoftTeamsUserIdentifier teamsUser = new MicrosoftTeamsUserIdentifier(<USER_ID>)
CommunicationIdentifier participants[] = new CommunicationIdentifier[]{ acsUser, teamsUser };
raiseHandFeature.lowerHands(participants);
```

### Handle changed states

With the Raise Hand API, you can subscribe to the `raisedHandChanged` and `loweredHandChanged` events to handle changes in the state of participants on a call. The call instance triggers these events and provides information about the participant whose state changed.

To subscribe to these events, use the following code:

```js
const raiseHandFeature = call.feature(Features.RaiseHand );

// event : {identifier: CommunicationIdentifier}
const raisedHandChangedHandler = (event) => {
    console.log(`Participant ${event.identifier} raised hand`);
};
const loweredHandChangedHandler = (event) => {
    console.log(`Participant ${event.identifier} lowered hand`);
};
raiseHandFeature.on('raisedHandEvent', raisedHandChangedHandler):
raiseHandFeature.on('loweredHandEvent', loweredHandChangedHandler):
```

The `raisedHandChanged` and `loweredHandChanged` events contain an object with the `identifier` property, which represents the participant's communication identifier. In the preceding example, we log a message to the console indicating that a participant raised their hand.

To unsubscribe from the events, use the `off` method.

### List of all participants with active state

To get information about all participants with raised hand state on current call, you can use `getRaisedHands`. The returned array is sorted by the order field.

Here's an example of how to use `getRaisedHands`:

```js
const raiseHandFeature = call.feature(Features.RaiseHand );
let participantsWithRaisedHands = raiseHandFeature.getRaisedHands();
```

### Order of raised Hands

The `participantsWithRaisedHands` variable contains an array of participant objects, where each object has the following properties:

- `identifier`: the communication identifier of the participant.
- `order`: the order in which the participant raised their hand.

You can use this information to display a list of participants with the Raise Hand state and their order in the queue.



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


The Raise Hand feature enables participants in a call to indicate that they have a question, comment, or concern without interrupting the speaker or other participants. You can use this feature in any call type, including 1:1 calls and calls with many participants, in Azure Communication Service and in Teams calls.

First you need to import calling Features from the Calling SDK:

```java
import com.azure.android.communication.calling.RaiseHandFeature;
```

Then you can get the feature API object from the call instance:

```java
RaiseHandFeature raiseHandFeature = call.feature(Features.RAISE_HAND);
```

### Raise and lower hand for current participant

To change the Raise Hand state for the current participant, you can use the `raiseHand()` and `lowerHand()` methods.

These methods are async. To verify results, use `RaisedHandReceived` and `LoweredHandReceived` listeners.

```java
RaiseHandFeature raiseHandFeature = call.feature(Features.RAISE_HAND);
//raise
raiseHandFeature.raiseHand();
//lower
raiseHandFeature.lowerHand();
```

### Lower hands for other participants

This feature enables users with the Organizer and Presenter roles to lower all hands for other participants on Teams calls. In Azure Communication calls, you can't change the state of other participants unless adding the roles first.

To use this feature, implement the following code:

```java
RaiseHandFeature raiseHandFeature = call.feature(Features.RAISE_HAND);
//lower all hands on the call
raiseHandFeature.lowerAllHands();
//or we can provide array of CommunicationIdentifier to specify list of participants
List<CommunicationIdentifier> identifiers = new ArrayList<>();
CommunicationUserIdentifier acsUser = new CommunicationUserIdentifier(<USER_ID>);
MicrosoftTeamsUserIdentifier teamsUser = new MicrosoftTeamsUserIdentifier(<USER_ID>);
identifiers.add(new CommunicationUserIdentifier("<USER_ID>"));
identifiers.add(new MicrosoftTeamsUserIdentifier("<USER_ID>"));
raiseHandFeature.lowerHands(identifiers);
```

### Handle changed states

Using the Raise Hand API, you can subscribe to the `RaisedHandReceived` and `LoweredHandReceived` events to handle changes in the state of participants on a call. The call instance triggers these events and provides information about the participant whose state changed.

To subscribe to these events, use the following code:

```java
RaiseHandFeature raiseHandFeature = call.feature(Features.RAISE_HAND)

// event example : {identifier: CommunicationIdentifier, isRaised: true, order:1}
call.feature(Features.RAISE_HAND).addOnRaisedHandReceivedListener(raiseHandEvent -> {
    Log.i(TAG, String.format("Raise Hand: %s : %s", Utilities.toMRI(raiseHandEvent.getIdentifier()), raiseHandEvent.isRaised()));
});
```

The `RaisedHandReceived` and `LoweredHandReceived` events contain an object with the `identifier` property, which represents the participant's communication identifier. In the preceding example, we log a message to the console indicating that a participant raised their hand.

To unsubscribe from the events, you can use the `off` method.


### List of all participants with active state

To get information about all participants with raised hand state on current call, you can use `getRaisedHands`. The returned array is sorted by the order field.

Here's an example of how to use `getRaisedHands`:

```java
RaiseHandFeature raiseHandFeature = call.feature(Features.RAISE_HAND);
List<RaiseHand> participantsWithRaisedHands = raiseHandFeature.getRaisedHands();
```

### Order of raised Hands

The `participantsWithRaisedHands` variable contains an array of participant objects, where each object has the following properties:

- `identifier`: the communication identifier of the participant.
- `order`: the order in which the participant raised their hand.

You can use this information to display a list of participants with the Raise Hand state and their order in the queue.



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


The Raise Hand feature enables participants in a call to indicate that they have a question, comment, or concern without interrupting the speaker or other participants. You can use this feature in any call type, including 1:1 calls and calls with many participants, in Azure Communication Service and in Teams calls.

First you need to import calling Features from the Calling SDK:

```swift
import AzureCommunicationCalling
```

Then you can get the feature API object from the call instance:

```swift
@State var raisehandFeature: RaiseHandCallFeature?

raiseHandFeature = self.call!.feature(Features.raiseHand)
```

### Raise and lower hand for current participant

To change the Raise Hand state for the current participant, you can use the `raiseHand()` and `lowerHand()` methods.

```swift
//publish raise hand state for local participant
raisehandFeature.raiseHand(completionHandler: { (error) in
    if let error = error {
        print ("Feature failed raise a hand %@", error as Error)
    }
})

//remove raise hand state for local participant
raisehandFeature.lowerHand(completionHandler: { (error) in
    if let error = error {
        print ("Feature failed lower hand %@", error as Error)
    }
})

```

### Lower hands for other participants

This feature enables users with the Organizer and Presenter roles to lower all hands for other participants on Teams calls. In Azure Communication calls, you can't change the state of other participants unless adding the roles first.

To use this feature, implement the following code:

```swift

// remove raise hand states for all participants on the call
raisehandFeature.lowerAllHands(completionHandler: { (error) in
    if let error = error {
        print ("Feature failed lower all hands %@", error as Error)
    }
})

// remove raise hand states for all remote participants on the call
let identifiers = (call?.remoteParticipants.map {$0.identifier})!;
raisehandFeature.lowerHands(participants: identifiers, completionHandler: { (error) in
    if let error = error {
        print ("Feature failed lower hands %@", error as Error)
    }
})

// remove raise hand state of specific user
var identifiers : [CommunicationIdentifier] = []
identifiers.append(CommunicationUserIdentifier("<USER_ID>"))
raisehandFeature.lowerHands(participants: identifiers, completionHandler: { (error) in
    if let error = error {
        print ("Feature failed lower hands %@", error as Error)
    }
})

```

### Handle changed states

With the Raise Hand API, you can subscribe to the `RaisedHandReceived` and `LoweredHandReceived` events to handle changes in the state of participants on a call. The call instance triggers these events and provides information about the participant whose state changed.

To subscribe to these events, use the following code:

```swift
self.callObserver = CallObserver(view:self)

raisehandFeature = self.call!.feature(Features.raiseHand)
raisehandFeature!.delegate = self.callObserver

public class CallObserver : NSObject, RaiseHandCallFeatureDelegate
{
    // event example : {identifier: CommunicationIdentifier}
    public func raiseHandCallFeature(_ raiseHandCallFeature: RaiseHandCallFeature, didReceiveRaisedHand args: RaisedHandChangedEventArgs) {
        os_log("Raise hand feature updated: %s is raised hand", log:log, Utilities.toMri(args.identifier))
        raiseHandCallFeature.raisedHands.forEach { raiseHand in
            os_log("Raise hand active: %s", log:log, Utilities.toMri(raiseHand.identifier))
        }
    }
    public func raiseHandCallFeature(_ raiseHandCallFeature: RaiseHandCallFeature, didReceiveLoweredHand args: LoweredHandChangedEventArgs) {
        os_log("Raise hand feature updated: %s is lowered hand", log:log, Utilities.toMri(args.identifier))
        raiseHandCallFeature.raisedHands.forEach { raiseHand in
            os_log("Raise hand active: %s", log:log, Utilities.toMri(raiseHand.identifier))
        }
    }
}    
```

The `RaisedHandReceived` and `LoweredHandReceived` events contain an object with the `identifier` property, which represents the participant's communication identifier. In the preceding example, we log a message to the console indicating that a participant raised their hand.

To unsubscribe from the events, use the `off` method.


### List of all participants with active state

To get information about all participants with raised hand state on current call, you can use `getRaisedHands`. The returned array is sorted by the order field.

Here's an example of how to use `raisedHands`:

```swift
raisehandFeature = self.call!.feature(Features.raiseHand)
raisehandFeature.raisedHands.forEach { raiseHand in
    os_log("Raise hand active: %s", log:log, Utilities.toMri(raiseHand.identifier))
}
```

### Order of raised Hands

The `raisedHands` variable contains an array of participant objects, where each object has the following properties:

- `identifier`: the communication identifier of the participant.
- `order`: the order in which the participant raised their hand.

You can use this information to display a list of participants with the Raise Hand state and their order in the queue.



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


The Raise Hand feature enables participants in a call to indicate that they have a question, comment, or concern without interrupting the speaker or other participants. You can use this feature in any call type, including 1:1 calls and calls with many participants, in Azure Communication Service and in Teams calls.

First you need to import calling Features from the Calling SDK:

```csharp
using Azure.Communication.Calling.WindowsClient;
```

Then you can get the feature API object from the call instance:

```csharp
private RaiseHandCallFeature raiseHandCallFeature;

raiseHandCallFeature = (RaiseHandCallFeature)call.GetCallFeatureExtension(CallFeatureType.RaiseHand);
```

### Raise and lower hand for current participant

To change the Raise Hand state for the current participant, you can use the `raiseHand()` and `lowerHand()` methods.

These methods are async. To verify results, use `RaisedHandReceived` and `LoweredhandReceived` listeners.

```csharp
//publish raise hand state for local participant
raiseHandCallFeature.RaiseHandAsync();

//remove raise hand state for local participant
raiseHandCallFeature.LowerHandAsync();

```

### Lower hands for other participants

The lower hand for other participants feature enables users with the Organizer and Presenter roles to lower all hands for other participants on Teams calls. In Azure Communication calls, you can't change the state of other participants unless you add their roles first.

To use this feature, implement the following code:

```csharp

// remove raise hand states for all participants on the call
raiseHandCallFeature.LowerAllHandsAsync();

// remove raise hand states for all remote participants on the call
var participants = call.RemoteParticipants;
var identifiers = participants.Select(p => p.Identifier).ToList().AsReadOnly();
raiseHandCallFeature.LowerHandsAsync(identifiers);

// remove raise hand state of specific user
var identifiers = new List<CallIdentifier>();
identifiers.Add(new UserCallIdentifier("USER_ID"));
raiseHandCallFeature.LowerHandsAsync(identifiers);
```

### Handle changed states

With the Raise Hand API, you can subscribe to the `RaisedHandReceived` and `LoweredHandReceived` events to handle changes in the state of participants on a call. The call instance triggers these events and provides information about the participant whose state changed.

To subscribe to these events, use the following code:

```swift
raiseHandCallFeature = (RaiseHandCallFeature)call.GetCallFeatureExtension(CallFeatureType.RaiseHand);
raiseHandCallFeature.RaisedHandReceived += OnRaisedHandChange;
raiseHandCallFeature.LoweredHandReceived += OnLoweredHandChange;

private async void OnRaisedHandChange(object sender, RaisedHandChangedEventArgs args)
{
    Trace.WriteLine("RaiseHandEvent: participant " + args.Identifier + " is raised hand");
}

private async void OnLoweredHandChange(object sender, RaisedHandChangedEventArgs args)
{
    Trace.WriteLine("RaiseHandEvent: participant " + args.Identifier + " is lowered hand");
}
```

The `RaisedHandReceived` and `LoweredHandReceived` events contain an object with the `identifier` property, which represents the participant's communication identifier. In the preceding example, we log a message to the console indicating that a participant raised their hand.

To unsubscribe from the events, you can use the `off` method.


### List of all participants with active state

To get information about all participants with raised hand state on current call, you can use `getRaisedHands`. The returned array is sorted by the order field.

Here's an example of how to use `RaisedHands`:

```swift
raiseHandCallFeature = (RaiseHandCallFeature)call.GetCallFeatureExtension(CallFeatureType.RaiseHand);
foreach (RaiseHand rh in raiseHandCallFeature.RaisedHands.ToList())
{
    Trace.WriteLine("Participant " + rh.Identifier.RawId + " has raised hand ");
}
```

### Order of raised Hands

The `RaisedHands` variable contains an array of participant objects, where each object has the following properties:

- `identifier`: the communication identifier of the participant.
- `order`: the order in which the participant raised their hand.

You can use this information to display a list of participants with the Raise Hand state and their order in the queue.



## Next Steps

- [Learn how to manage calls](manage-calls.md)
- [Learn how to manage video](manage-video.md)
- [Learn how to record calls](record-calls.md)
- [Learn how to transcribe calls](call-transcription.md)

## Related articles

For more information about using the Raise Hand feature in Teams calls and meetings, see the [Microsoft Teams documentation](https://support.microsoft.com/en-us/office/raise-your-hand-in-a-teams-meeting-bb2dd8e1-e6bd-43a6-85cf-30822667b372).
