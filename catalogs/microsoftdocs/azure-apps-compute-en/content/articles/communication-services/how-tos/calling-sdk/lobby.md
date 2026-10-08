---
title: Teams meeting lobby
titleSuffix: An Azure Communication Services how-to guide
description: Use Azure Communication Services SDKs to admit or reject users from Teams meeting lobby.
author: tinaharter
ms.author: tinaharter
ms.service: azure-communication-services
ms.subservice: teams-interop
ms.topic: how-to 
ms.date: 06/15/2023
ms.custom: template-how-to
zone_pivot_groups: acs-plat-web-ios-android-windows
---

# Manage Teams meeting lobby


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



This article describes how to implement the Teams meetings lobby capability using Azure Communication Service Calling SDKs. This capability enables users to admit and reject participants from Teams meeting lobby, receive the join lobby notification, and get the lobby participants list.

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn). 
- A deployed Communication Services resource. [Create a Communication Services resource](../../quickstarts/create-communication-resource.md).
- A user access token to enable the calling client. For more information, see [Create and manage access tokens](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/quickstarts/access-tokens.md).
- Optional: Complete the quickstart to [add voice calling to your application](../../quickstarts/voice-video-calling/getting-started-with-calling.md).

User ends up in the lobby depending on Microsoft Teams configuration. The controls are described in [Learn more about Teams configuration ](../../concepts/interop/guest/teams-administration.md).

Microsoft 365 or Azure Communication Services users can admit or reject users from lobby, if they're connected to Teams meeting and have organizer, co-organizer, or presenter meeting role.
[Learn more about meeting roles](https://support.microsoft.com/office/roles-in-a-teams-meeting-c16fa7d0-1666-4dde-8686-0a0bfe16e019).

To update or check current meeting join & lobby policies in Teams admin center, see [Learn more about Teams policies](https://learn.microsoft.com/microsoftteams/settings-policies-reference#automatically-admit-people).

## Support

The following tables define lobby support in the Azure Communication Services Calling SDK.

### Identities and call types

| Identities | Teams meeting | Room | 1:1 call | Group call | 1:1 Teams interop call | Group Teams interop call |
| --- | --- | --- | --- | --- | --- | --- |
| Communication Services user | ✔️ |  |  |  |  |  |
| Microsoft 365 user | ✔️ |  |  |  |  |  |

### Operations

The Calling SDK Lobby capabilities support the following API operations for both Communication Services and Microsoft 365 users.

| Operations | Communication Services user | Microsoft 365 user |
| --- | --- | --- |
| admit | ✔️\* | ✔️\* |
| reject | ✔️\* | ✔️\* |
| admitAll | ✔️\* | ✔️\* |
| getParticipants | ✔️ | ✔️ |
| lobbyParticipantsUpdated | ✔️ | ✔️ |

### SDKs

| Ability | Web | Web UI | iOS | iOS UI | Android | Android UI | Windows |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Supported | ✔️ |  | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |

\* Only Communication Services user and Microsoft 365 user assigned the role of organizer, co-organizer, or presenter. 

**Applies to: platform-web**

>**Important:**
> The examples here are available in [1.15.1-beta.1](https://www.npmjs.com/package/@azure/communication-calling/v/1.15.1-beta.1) of the Calling SDK for JavaScript. Be sure to use that version or newer when you're trying this quickstart.

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




Object `Lobby` on `Call` or `TeamsCall` class allow users to access Teams meeting lobby information. It includes the APIs, `admit`, `reject` and `admitAll`, which allows user to admit and reject participants from Teams meeting lobby. User could also get the `participants` collection and subscribe the `lobbyParticipantsUpdated` event to receive notification.

### Get lobby object
The first thing is to get the `Call` or `TeamsCall` object of admitter: [Learn how to join Teams meeting](teams-interoperability.md). 
You can get the `Lobby` object from `Call` or `TeamsCall` object.
```js
const lobby = call.lobby;
```

### Get lobby participants properties
To know who is in the lobby, you could get the `participants` collection from `Lobby` object. It's a collection of `RemoteParticipant` object with `InLobby` state. To get the `participants` collection:

```js
let lobbyParticipants = lobby.participants; // [remoteParticipant, remoteParticipant....]
```

### Get identifier for a remote participant
Before admit or reject participant from lobby, you could get the identifier for a remote participant:
```js
if(lobbyParticipants.length !== 0){
    let remoteParticipant = lobbyParticipants[0];
}
//You could get the identifier from the Lobby.participants collection
//You could also get the identifier from the lobbyParticipantsUpdated event
const identifier = remoteParticipant.identifier;
```

The `identifier` can be one of the following `CommunicationIdentifier` types:

- `{ communicationUserId: '<COMMUNICATION_SERVICES_USER_ID'> }`: Object representing the Azure Communication Services user.
- `{ phoneNumber: '<PHONE_NUMBER>' }`: Object representing the phone number in E.164 format.
- `{ microsoftTeamsUserId: '<MICROSOFT_TEAMS_USER_ID>', isAnonymous?: boolean; cloud?: "public" | "dod" | "gcch" }`: Object representing the Teams user.
- `{ id: string }`: object representing identifier that doesn't fit any of the other identifier types

### Admit, reject and admitAll participant from lobby
To admit, reject or admit all users from the lobby, you can use the `admit`, `reject` and `admitAll` methods. 
They're the async APIs, to verify results can be used `lobbyParticipantsUpdated` listeners.

You can admit or reject from lobby by calling the method `admit` and `reject`. The method accepts identifiers `MicrosoftTeamsUserIdentifier`, `CommunicationUserIdentifier`, `PhoneNumberIdentifier` or `UnknownIdentifier` as input. You can also admit all users from the lobby by calling the method `admitAll`. 
```js
//admit
await lobby.admit(identifier);
//reject
await lobby.reject(identifier);
//admitAll
await lobby.admitAll();
```

### Handle lobby updated event
You could subscribe to the `lobbyParticipantsUpdated` event to handle the changes in the `participants` collection. This event will be triggered when the participants are added or removed from the lobby and it will provide the added or removed participants list.
```js
subscribeToCall = (call) => {
    try {
        //Subscribe to lobby's 'lobbyParticipantsUpdated' event for lobbyParticipants update.
        call.lobby.on('lobbyParticipantsUpdated', lobbyParticipantsUpdatedHandler);
    } catch (error) {
        console.error(error);
    }
}

const lobbyParticipantsUpdatedHandler = (event) => {
    event.added.forEach(remoteParticipant => {
        console.log(`${remoteParticipant._displayName} joins the lobby`);
    });
    event.removed.forEach(remoteParticipant => {
        console.log(`${remoteParticipant._displayName} leaves the lobby`);
    })
};
```
[Learn more about events and subscription ](events.md)


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


Object `CallLobby` on `Call` or `TeamsCall` class allow users to access Teams meeting lobby information. It includes the APIs, `admit`, `reject` and `admitAll`, which allows user to admit and reject participants from Teams meeting lobby. User could also get the `participants` collection and subscribe the `addOnLobbyParticipantsUpdatedListener` event listener to receive notification.

### Get CallLobby object
The first thing is to get the `CallLobby` object  from the call instance: 
```java
private CallLobby callLobby;
callLobby = call.getCallLobby();
```

### Get lobby participants properties
To know who is in the lobby, you could get the `participants` collection from `CallLobby` object. It's a collection of `RemoteParticipant` object with `InLobby` state. To get the `participants` collection:

```java
List<RemoteParticipant> lobbyParticipants = callLobby.getParticipants(); 
```

### Get identifier for a remote participant
Before admit or reject participant from lobby, you need to get the identifier for a remote participant:
```java
//You could get the identifier from the lobby participants collection
//You could also get the identifier from the addOnLobbyParticipantsUpdatedListener event
List<CommunicationIdentifier> identifiers = new ArrayList<>();
CommunicationUserIdentifier acsUser = new CommunicationUserIdentifier(<USER_ID>);
MicrosoftTeamsUserIdentifier teamsUser = new MicrosoftTeamsUserIdentifier(<USER_ID>);
identifiers.add(new CommunicationUserIdentifier("<USER_ID>"));
identifiers.add(new MicrosoftTeamsUserIdentifier("<USER_ID>"));
```

### Admit participant from CallLobby
CallLobby object allows user with the Organizer, Co-organizer and Presenter roles to admit participants from Teams CallLobby. Method `admit` accepts identifiers collection as input, and it returns `AdmitParticipantsResult` object as result.

```java
AdmitParticipantsResult result = this.callLobby.admit(identifiers).get();
String failedParticipants = this.convertListToString("", result.getFailedParticipants());
Log.i(LOBBY_TAG, String.format("Admit result: success count: %s, failure count: %s, failure participants: %s", admitResult.getSuccessCount(), failedParticipants.length(), failedParticipants));
```

### Reject participant from CallLobby
MeetingLobby object allows user with the Organizer, Co-organizer and Presenter roles to reject participant from Teams MeetingLobby. Method `reject` accepts identifier as input.

```java
//To reject all participants from CallLobby:
for (CommunicationIdentifier identifier : identifiers)
{
    this.callLobby.reject(lobbyParticipantsIdentifiers.get(0)).get();
}
```

### Admit all participants from CallLobby
MeetingLobby object allows user with the Organizer, Co-organizer and Presenter roles to admit all participants from Teams MeetingLobby. Method `admitAll` returns `AdmitAllParticipantsResult` object as result.

```java
AdmitAllParticipantsResult result = this.callLobby.admitAll().get();
Log.i(LOBBY_TAG, String.format("Admit result: success count: %s, failure count: %s, failure participants: %s", result.getSuccessCount(), result.getFailureCount()));
```

### Handle CallLobby updated event
You could subscribe to the `addOnLobbyParticipantsUpdatedListener` event listener to handle the changes in the `participants` collection. This event is triggered when the participants are added or removed from the CallLobby and it provides the added or removed participants list.

```java
//To register listener:
this.callLobby.addOnLobbyParticipantsUpdatedListener(this::OnLobbyParticipantsUpdated);

private void OnLobbyParticipantsUpdated(ParticipantsUpdatedEvent args) {
    if(!args.getAddedParticipants().isEmpty()){
        for(RemoteParticipant addedParticipant : args.getAddedParticipants()){
            Log.i(TAG, String.format("Participant %s joins lobby", addedParticipant.getDisplayName()));
        }
    }

    if(!args.getRemovedParticipants().isEmpty()){
        for(RemoteParticipant removedParticipant : args.getRemovedParticipants()){
            Log.i(TAG, String.format("Participant %s leaves lobby", removedParticipant.getDisplayName()));
        }
    }
}

//To unregister listener:
lobby.removeOnLobbyParticipantsUpdatedListener(this::OnLobbyParticipantsUpdated);
```
[Learn more about events and subscription ](events.md)


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


Object `CallLobby` on `Call` or `TeamsCall` class allow users to access Teams meeting lobby information. It includes the APIs, `admit`, `reject` and `admitAll`, which allows user to admit and reject participants from Teams meeting lobby. User could also get the `participants` collection and subscribe the event listener to receive notification.

### Get CallLobby object
The first thing is to get the `CallLobby` object from the call instance: 
```swift
@State var callLobby: CallLobby?
callLobby = self.call!.callLobby
```

### Get lobby participants properties
To know who is in the lobby, you could get the `participants` collection from `CallLobby` object. It's a collection of `RemoteParticipant` object with `InLobby` state. To get the `participants` collection:

```swift
let lobbyParticipants = callLobby.participants
```

### Get identifier for a remote participant
Before admit or reject participant from CallLobby, you need to get the identifier for a remote participant:
```swift
//You could get the identifier from the lobby participants collection
//You could also get the identifier from the addOnLobbyParticipantsUpdatedListener event
let identifiers = (call?.callLobby.participants.map {$0.identifier})!;
```

### Admit participant from CallLobby
CallLobby object allows user with the Organizer, Co-organizer and Presenter roles to admit participants from Teams CallLobby. Method `admit` accepts identifiers collection as input, and it returns `AdmitParticipantsResult` object as result.

```swift
callLobby.admit(identifiers: identifiers, completionHandler: { result, error in
    if error != nil {
        print ("Admit participant is failed %@", error! as Error)
    } else{
        print ("Admit result. success count: %s , failure count: %s, failure participants: %s", result.successCount, result.failureCount, result.failureParticipants)
    }
})
```

### Reject participant from CallLobby
CallLobby object allows user with the Organizer, Co-organizer and Presenter roles to reject participant from Teams CallLobby. Method `reject` accepts identifier.

```swift
//To reject participant from CallLobby:
callLobby.reject(identifiers.first!, completionHandler: { error in
    if error != nil {
        print ("Reject all participants is failed %@", error! as Error)
    }
})
```

### Admit all participants from CallLobby
CallLobby object allows user with the Organizer, Co-organizer and Presenter roles to admit all participants from Teams CallLobby. Method `admitAll` returns `AdmitAllParticipantsResult` object as result.

```swift
callLobby.admitAll(completionHandler: { result, error in
    if error != nil {
        print ("Admit all participants is failed %@", error! as Error)
    } else{
        print ("AdmitAll result. success count: %s , failure count: %s", result.successCount, result.failureCount)
    }
})
```

### Handle CallLobby updated event
You could subscribe to the event listener to handle the changes in the `participants` collection. This event is triggered when the participants are added or removed from the CallLobby and it provides the added or removed participants list.

```swift
//To register listener:
self.callObserver = CallObserver(view:self)

callLobby = self.call!.callLobby
callLobby!.delegate = self.callObserver

public class CallObserver : NSObject, CallLobbyDelegate
{
    public func callLobby(_ callLobby: CallLobby, didUpdateLobbyParticipants args: ParticipantsUpdatedEventArgs) {
        args.removedParticipants.forEach { p in
            let mri = Utilities.toMri(p.identifier)
            os_log("==>Participants %d is removed from the lobby.", log:log, mri)
        }

        args.addedParticipants.forEach { p in
            let mri = Utilities.toMri(p.identifier)
            os_log("==>Participants %d is added to the lobby.", log:log, mri)
        }
    }
}    

//To unregister listener, you can use the `off` method.
self.callLobby?.delegate = nil
```
[Learn more about events and subscription ](events.md)


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


Object `CallLobby` on `Call` or `TeamsCall` class allow users to access Teams meeting lobby information. It includes the APIs, `AdmitAsync`, `RejectAsync` and `AdmitAllAsync`, which allows user to admit and reject participants from Teams meeting lobby. User could also get the `Participants` collection and subscribe the `LobbyParticipantsUpdated` event to receive notification.

### Get CallLobby object
The first thing is to get the `CallLobby` object  from the call instance: 
```csharp
private CallLobby callLobby;
callLobby = call.CallLobby;
```

### Get lobby participants properties
To know who is in the lobby, you could get the `Participants` collection from `CallLobby` object. It's a collection of `RemoteParticipant` object with `InLobby` state. To get the `Participants` collection:

```csharp
var lobbyParticipants = callLobby.Participants; 
```

### Get identifier for a remote participant
Before admit or reject participant from CallLobby, you need to get the identifier for a remote participant:
```csharp
//You could get the identifier from the CallLobby.Participants collection
//You could also get the identifier from the LobbyParticipantsUpdated event
var identifiers = lobbyParticipants.Select(p => p.Identifier).ToList().AsReadOnly();
```

### Admit participant from CallLobby
CallLobby object allows user with the Organizer, Co-organizer and Presenter roles to admit participants from Teams CallLobby. Method `AdmitAsync` accepts identifiers collection as input, and it returns `AdmitParticipantsResult` object as result.

```csharp
AdmitParticipantsResult result = await callLobby?.AdmitAsync(identifiers);
Trace.WriteLine("Admit result. success count: " + result.SuccessCount + ", failure count: " + result.FailedParticipants.Count + ", failure participants: " + result.FailedParticipants);
foreach (RemoteParticipant participant in result.FailureParticipants.ToList<RemoteParticipant>())
{
    Trace.WriteLine("Admit participant: " + participant.DisplayName + " failed ");
}
```

### Reject participant from CallLobby
CallLobby object allows user with the Organizer, Co-organizer and Presenter roles to reject participant from Teams CallLobby. Method `RejectAsync` accepts identifier as input.

```csharp
//To reject all participants from CallLobby:
foreach (CallIdentifier identifier in identifiers)
{
    await callLobby?.RejectAsync(identifier);
}
```

### Admit all participants from CallLobby
CallLobby object allows user with the Organizer, Co-organizer and Presenter roles to admit all participants from Teams CallLobby. Method `AdmitAllAsync` returns `AdmitAllParticipantsResult` object as result.

```csharp
AdmitAllParticipantsResult result = await callLobby?.AdmitAllAsync();
Trace.WriteLine("Admit all result. success count: " + result.SuccessCount + ", failure count: " + result.FailureCount);
```

### Handle CallLobby updated event
You could subscribe to the `LobbyParticipantsUpdated` event to handle the changes in the `Participants` collection. This event is triggered when the participants are added or removed from the CallLobby and it provides the added or removed participants list.
```csharp
//When call.State == CallState.Connected
callLobby.LobbyParticipantsUpdated += CallLobby_OnLobbyParticipantsUpdated;

private async void CallLobby_OnLobbyParticipantsUpdated(object sender, ParticipantsUpdatedEventArgs args)
{
    foreach (var remoteParticipant in args.AddedParticipants.ToList<RemoteParticipant>()){
        Trace.WriteLine("Participant: " + participant.DisplayName + " joins lobby ");
    }

    foreach (var remoteParticipant in args.RemovedParticipants.ToList<RemoteParticipant>()){
        Trace.WriteLine("Participant: " + participant.DisplayName + " leaves lobby ");
    }
}
```
[Learn more about events and subscription ](events.md)


## Next steps

- [Learn how to manage calls](manage-calls.md)
- [Learn how to manage Teams calls](../cte-calling-sdk/manage-calls.md)
- [Learn how to join Teams meeting](teams-interoperability.md)
- [Learn how to manage video](manage-video.md)
