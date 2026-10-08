---
title: Manage calls
titleSuffix: An Azure Communication Services article
description: This article describes how to manage calls using the Azure Communication Services Calling SDK.
author: sundiraman
ms.author: sundraman
ms.service: azure-communication-services
ms.subservice: calling
ms.topic: how-to 
ms.date: 06/05/2025
ms.custom: template-how-to
zone_pivot_groups: acs-plat-web-ios-android-windows

#Customer intent: As a developer, I want to manage calls with the Azure Communication Services sdks so that I can create a calling application that manages calls.
---

# Manage calls


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


This article describes how to manage calls using the Azure Communication Services Calling SDK. Topics include how to place calls, manage participants, and manage properties.

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn). 
- A deployed Communication Services resource. [Create a Communication Services resource](../../quickstarts/create-communication-resource.md).
- A `User Access Token` to enable the call client. For more information on [how to get a `User Access Token`](../../quickstarts/identity/access-tokens.md).
- Optional: Complete [getting started with adding calling to your application](../../quickstarts/voice-video-calling/getting-started-with-calling.md).

## Support

The following tables define support for breakout rooms in Azure Communication Services.

### Identities and call types

The following table shows support of features for specific call type and identity. 

| Identities | Teams meeting | Room | 1:1 call | Group call | 1:1 Teams interop call | Group Teams interop call |
| --- | --- | --- | --- | --- | --- | --- |
| Communication Services user | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |
| Microsoft 365 user | ✔️ |  |  |  | ✔️ | ✔️ |

### Operations

The following table show support for individual APIs in the Calling SDK related to individual identity types. 

| Operations | Communication Services user | Microsoft 365 user |
| --- | --- | --- |
| Start a call to Communication Services user | ✔️ |  |
| Start a call to Microsoft 365 user | ✔️ | ✔️ |
| Start a call to phone number | ✔️ | ✔️ |
| Join a room | ✔️ |  |
| Join a Teams meeting | ✔️ | ✔️ |
| Join a call based on groupId | ✔️ |  |
| Accept or reject incoming call | ✔️ | ✔️ |
| Hold and resume call | ✔️ | ✔️ |
| Get participants | ✔️ | ✔️ |
| Add Communication Services user | ✔️ |  |
| Remove Communication Services user | ✔️ | ✔️ |
| Add or remove Microsoft 365 user | ✔️ | ✔️ |
| Add or remove phone number | ✔️ | ✔️ |
| Mute or unmute remote participant | ✔️[1] | ✔️[1] |
| Hang up | ✔️ | ✔️ |
| End the call for everyone | ✔️[2] | ✔️ |

[1] The API is only supported in group calls, rooms and Teams meetings.
[2] The API is not supported in rooms.

### SDKs

The following tables show support for the features in individual Azure Communication Services SDKs.

| Support status | Web | Web UI | iOS | iOS UI | Android | Android UI | Windows |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Is Supported | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |

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




## Place a call

To create and start a call, use one of the APIs on `callAgent` and provide a user that you created through the Communication Services identity SDK.

Call creation and start are synchronous. The `call` instance allows you to subscribe to call events.

### Place a 1:n call to a user or PSTN

To call another Communication Services user, use the `startCall` method on `callAgent` and pass the recipient's `CommunicationUserIdentifier` that you [created with the Communication Services administration library](../../quickstarts/identity/access-tokens.md).

For a 1:1 call to a user, use the following code:

```js
const userCallee = { communicationUserId: '<ACS_USER_ID>' }
const oneToOneCall = callAgent.startCall([userCallee]);
```

To place a call to a public switched telephone network (PSTN), use the `startCall` method on `callAgent` and pass the recipient's `PhoneNumberIdentifier`. Your Communication Services resource must be configured to allow PSTN calling.

When you call a PSTN number, specify your alternate caller ID. An alternate caller ID is a phone number (based on the E.164 standard) that identifies the caller in a PSTN call. It's the phone number the call recipient sees for an incoming call.

> **Note:**
> See [details of PSTN calling offering](../../concepts/numbers/sub-eligibility-number-capability.md). For preview program access, [apply to the early adopter program](https://aka.ms/ACS-EarlyAdopter).

For a 1:1 call to a PSTN number, use the following code:

```js
const pstnCallee = { phoneNumber: '<ACS_USER_ID>' }
const alternateCallerId = {phoneNumber: '<ALTERNATE_CALLER_ID>'};
const oneToOneCall = callAgent.startCall([pstnCallee], { alternateCallerId });
```

For a 1:n call to a user and a PSTN number, use the following code:

```js
const userCallee = { communicationUserId: '<ACS_USER_ID>' }
const pstnCallee = { phoneNumber: '<PHONE_NUMBER>'};
const alternateCallerId = {phoneNumber: '<ALTERNATE_CALLER_ID>'};
const groupCall = callAgent.startCall([userCallee, pstnCallee], { alternateCallerId });
```

### Join a room call

To join a `room` call, you can instantiate a context object with the `roomId` property as the `room` identifier. To join the call, use the `join` method and pass the context instance.

```js
const context = { roomId: '<RoomId>' }
const call = callAgent.join(context);
```

A `room` offers application developers better control over *who* can join a call, *when* they meet and *how* they collaborate. For more information about rooms, see [Rooms API for structured meetings](../../concepts/rooms/room-concept.md) and [Join a room call](../../quickstarts/rooms/join-rooms-call.md).

### Join a group call

> **Note:**
> The `groupId` parameter is system metadata, used by Microsoft for operations that are required to run the system. Don't include personal data in the `groupId` value. Microsoft doesn't treat this parameter as personal data and its content may be visible to Microsoft employees or stored long-term.
>
> The `groupId` parameter requires data to be in GUID format. We recommend using randomly generated GUIDs that aren't considered personal data in your systems.

To start a new group call or join an ongoing group call, use the `join` method and pass an object with a `groupId` property. The `groupId` value must be a GUID.

```js
const context = { groupId: '<GUID>'};
const call = callAgent.join(context);
```

## Receive an incoming call

The `callAgent` instance emits an `incomingCall` event when the logged-in identity receives an incoming call. To listen to this event, subscribe by using one of these options:

```js
const incomingCallHandler = async (args: { incomingCall: IncomingCall }) => {
    const incomingCall = args.incomingCall;

    // Get incoming call ID
    var incomingCallId = incomingCall.id

    // Get information about this Call. This API is provided as a preview for developers
    // and may change based on feedback that we receive. Do not use this API in a production environment.
    // To use this api please use 'beta' release of Azure Communication Services Calling Web SDK
    var callInfo = incomingCall.info;

    // Get information about caller
    var callerInfo = incomingCall.callerInfo

    // Accept the call
    var call = await incomingCall.accept();

    // Reject the call
    incomingCall.reject();

    // Subscribe to callEnded event and get the call end reason
     incomingCall.on('callEnded', args => {
        console.log(args.callEndReason);
    });

    // callEndReason is also a property of IncomingCall
    var callEndReason = incomingCall.callEndReason;
};
callAgentInstance.on('incomingCall', incomingCallHandler);
```

The `incomingCall` event includes an `incomingCall` instance that you can accept or reject.

The Azure Communication Calling SDK raises a `cameraStartFailed: true` call diagnostic if the camera isn't available when starting, accepting, or joining a call with video enabled. In this case, the call starts with video off. The camera might not be available because it's being used by another process or is disabled in the operating system.

## Hold and resume call

> **Note:**
> At any given moment, there must be only one (1) active call, in `Connected` state, with active media. All other calls must be put on hold by a user, or programmatically by application. This scenario is common in scenarios like contact centers, where a user may need to handle multiple outbound and inbound calls. In this case, all inactive calls should be put on hold, and user should interact with others only in active call

To hold or resume the call, use the `hold` and `resume` asynchronous APIs:

To hold the call:

```js
await call.hold();
```

When `hold` operation resolves, the call state is set to `LocalHold`. In a 1:1 call, the other participant is also put on hold, and state of the call from the perspective of that participant is set to `RemoteHold`. Later, the other participant might put its call on hold, which would result in a state change to `LocalHold`.

In a group call or meeting - the `hold` is a local operation, it doesn't hold the call for other call participants.

To resume the call, all users who initiated hold must resume it.

To resume call from hold:

```js
await call.resume();
```

When the `resume` operation resolves, the call state again sets to `Connected`.

## Mute and unmute a call

To mute or unmute the local endpoint, use the `mute` and `unmute` asynchronous APIs:

```js
//mute local device (microphone / sent audio)
await call.mute();

//unmute local device (microphone / sent audio)
await call.unmute();
```

## Mute and unmute incoming audio

Mute incoming audio sets the call volume to 0. To mute or unmute the incoming audio, use the `muteIncomingAudio` and `unmuteIncomingAudio` asynchronous operations:

```js
//mute local device (speaker)
await call.muteIncomingAudio();

//unmute local device (speaker)
await call.unmuteIncomingAudio();
```

When incoming audio is muted, the participant client SDK still receives the call audio (remote participant's audio). The call audio isn't heard in the speaker and the participant isn't able to listen until `call.unmuteIncomingAudio()` is called. However, we can apply a filter on call audio and play the filtered audio. 

## Manage remote participants

All remote participants are included in the `RemoteParticipant` object and available through the `remoteParticipants` collection on a call instance. The `remoteParticipants` object is accessible from a `Call` instance.

### List the participants in a call

The `remoteParticipants` collection returns a list of remote participants in a call:

```js
call.remoteParticipants; // [remoteParticipant, remoteParticipant....]
```

### Add a participant to a call

To add a participant (either a user or a phone number) to a call, use the `addParticipant` operation. Provide one of the `Identifier` types. It synchronously returns the `remoteParticipant` instance. When a participant is successfully added to the call, it raises the `remoteParticipantsUpdated` event from Call.

```js
const userIdentifier = { communicationUserId: '<ACS_USER_ID>' };
const pstnIdentifier = { phoneNumber: '<PHONE_NUMBER>' }
const remoteParticipant = call.addParticipant(userIdentifier);
const alternateCallerId = {  phoneNumber: '<ALTERNATE_CALLER_ID>' };
const remoteParticipant = call.addParticipant(pstnIdentifier, { alternateCallerId });
```

### Remove a participant from a call

To remove a participant (either a user or a phone number) from a call, you can call `removeParticipant`. You have to pass one of the `Identifier` types. This method resolves asynchronously after removing the participant from the call. The participant is also removed from the `remoteParticipants` collection.

```js
const userIdentifier = { communicationUserId: '<ACS_USER_ID>' };
const pstnIdentifier = { phoneNumber: '<PHONE_NUMBER>' }
await call.removeParticipant(userIdentifier);
await call.removeParticipant(pstnIdentifier);
```

### Access remote participant properties

Remote participants have a set of associated properties and collections:

- `CommunicationIdentifier`: Get the identifier for a remote participant. Identity is one of the `CommunicationIdentifier` types:

  ```js
  const identifier = remoteParticipant.identifier;
  ```
- It can be one of the following `CommunicationIdentifier` types:
    - `{ communicationUserId: '<ACS_USER_ID'> }`: Object representing the Azure Communication Services user.
    - `{ phoneNumber: '<E.164>' }`: Object representing the phone number in E.164 format.
    - `{ microsoftTeamsUserId: '<TEAMS_USER_ID>', isAnonymous?: boolean; cloud?: "public" | "dod" | "gcch" }`: Object representing the Teams user.
    - `{ id: string }`: object representing identifier that doesn't fit any of the other identifier types

- `state`: Get the state of a remote participant.

  ```js
  const state = remoteParticipant.state;
  ```
- The state can be:
    - `Idle`: Initial state.
    - `Connecting`: Transition state while a participant is connecting to the call.
    - `Ringing`: Participant is ringing.
    - `Connected`: Participant is connected to the call.
    - `Hold`: Participant is on hold.
    - `EarlyMedia`: Announcement that plays before a participant connects to the call.
    - `InLobby`: Indicates that remote participant is in lobby.
    - `Disconnected`: Final state. The participant is disconnected from the call. If the remote participant loses their network connectivity, their state changes to `Disconnected` after two minutes.

- `callEndReason`: To learn why a participant left the call, check the `callEndReason` property:

  ```js
  const callEndReason = remoteParticipant.callEndReason;
  const callEndReasonCode = callEndReason.code // (number) code associated with the reason
  const callEndReasonSubCode = callEndReason.subCode // (number) subCode associated with the reason
  ```

  > **Note:**
  > This property is only set when adding a remote participant via the Call.addParticipant() API, and the remote participant declines for example.
  >
  > In the scenario, where UserB kicks UserC, from UserA's perspective, UserA doesn't see this flag get set for UserC. In other words, UserA doesn't see UserC's callEndReason property get set at all.

- `isMuted` status: To find out if a remote participant is muted, check the `isMuted` property. It returns `Boolean`.

  ```js
  const isMuted = remoteParticipant.isMuted;
  ```

- `isSpeaking` status: To find out if a remote participant is speaking, check the `isSpeaking` property. It returns `Boolean`.

  ```js
  const isSpeaking = remoteParticipant.isSpeaking;
  ```

- `videoStreams`: To inspect all video streams that a given participant is sending in this call, check the `videoStreams` collection. It contains `RemoteVideoStream` objects.

  ```js
  const videoStreams = remoteParticipant.videoStreams; // [RemoteVideoStream, ...]
  ```

- `displayName`: To get display name for this remote participant, inspect `displayName` property it return string.

  ```js
  const displayName = remoteParticipant.displayName;
  ```
- `endpointDetails`: Get the details of all the endpoints for this remote participant

  ```js
  const endpointDetails: EndpointDetails[] = remoteParticipant.endpointDetails;
  ```

  > **Note:**
  > A remote participant could be in the call from many possible endpoints, and each endpoint has its own unique `participantId`. `participantId` is different from the `RemoteParticipant` identifier's raw ID.

### Mute other participants

> **Note:**
> To mute other VoIP participants, you must use Azure Communication Services Calling Web SDK version 1.26.1 GA version or higher. To mute PSTN endpoints, you must use GA 1.33.1 of the WebJS (or higher).

> **Note:**
> Muting others on a 1:1 call isn't supported.

To mute all other participants or mute a specific participant who is connected to a call, you can use the asynchronous APIs `muteAllRemoteParticipants` on the call and `mute` on the remote participant. The `mutedByOthers` event from Call is raised when the local participant is muted by others.

Muting a PSTN endpoint using the calling WebJS SDK is currently in GA and is available in build 1.34.1 [1.34.1](https://github.com/Azure/Communication/blob/master/releasenotes/acs-javascript-calling-library-release-notes.md#1341-beta2-2025-03-20) and later versions.


```js
//mute all participants except yourself
await call.muteAllRemoteParticipants();

//mute a specific participant
await call.remoteParticipants[0].mute();
```
## Check call properties

Get the unique ID (string) for a call:

```js
const callId: string = call.id;
```

Get the local participant ID:

```js
const participantId: string = call.info.participantId;
```

> **Note:**
> An Azure Communication Services identity can use the web calling SDK in many endpoints, and each endpoint has its own unique `participantId`. `participantId` is different from the Azure Communication Services identity raw ID.

Retrieve the thread ID if joining a Teams meeting:

```js
const threadId: string | undefined = call.info.threadId;
```

Get information about the call:

```js
const callInfo = call.info;
```

Learn about other participants in the call by inspecting the `remoteParticipants` collection on the `call` instance:

```js
const remoteParticipants = call.remoteParticipants;
```

Identify the caller of an incoming call:

```js
const callerIdentity = call.callerInfo.identifier;
```

`identifier` is one of the `CommunicationIdentifier` types.

Get the state of a call:

```js
const callState = call.state;
```

This returns a string representing the current state of a call:

- `None`: Initial call state.
- `Connecting`: Initial transition state when a call is placed or accepted.
- `Ringing`: For an outgoing call, indicates that a call is ringing for remote participants. It's `Incoming` on their side.
- `EarlyMedia`: Indicates a state in which an announcement is played before the call is connected.
- `Connected`: Indicates that the call is connected.
- `LocalHold`: Indicates that a local participant the call put the call on hold. No media is flowing between the local endpoint and remote participants.
- `RemoteHold`: Indicates that a remote participant the call put the call on hold. No media is flowing between the local endpoint and remote participants.
- `InLobby`: Indicates that user is in lobby.
- `Disconnecting`: Transition state before the call goes to a `Disconnected` state.
- `Disconnected`: Final call state. If the network connection is lost, the state changes to `Disconnected` after two minutes.

Find out why a call ended by inspecting the `callEndReason` property:

```js
const callEndReason = call.callEndReason;
const callEndReasonMessage = callEndReason.message // (string) user friendly message
const callEndReasonCode = callEndReason.code // (number) code associated with the reason
const callEndReasonSubCode = callEndReason.subCode // (number) subCode associated with the reason
```

Learn if the current call is incoming or outgoing by inspecting the `direction` property. It returns `CallDirection`.

```js
const isIncoming = call.direction == 'Incoming';
const isOutgoing = call.direction == 'Outgoing';
```

Inspect the active video streams and active screen sharing streams by checking the `localVideoStreams` collection. The `localVideoStreams` operation returns `LocalVideoStream` objects of type `Video`, `ScreenSharing`, or `RawMedia`.

```js
const localVideoStreams = call.localVideoStreams;
```

Check if the current microphone is muted. It returns `Boolean`.

```js
const muted = call.isMuted;
```

Check if the current incoming audio (speaker) is muted. It returns `Boolean`.

```js
const incomingAudioMuted = call.isIncomingAudioMuted;
```

Check if video is on. It returns `Boolean`.

```js
const isLocalVideoStarted = call.isLocalVideoStarted;
```

Check is screen sharing is on. It returns `Boolean`.

```js
const isScreenSharingOn = call.isScreenSharingOn;
```

## Hang up

There are two ways to hang up the call.

- The initial caller can leave the call and the other participants remain in the call.
- When the initial caller leaves, the call terminates for all participants.

To leave the call, use:

```js
call.hangUp();
```

End the call for all participants by providing `HangUpOptions`.

> **Note:**
> This operation isn't available in rooms.

```js
call.hangUp( forEveryone: true);
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


## Place a call

To create and start a call, you need to call the `CallAgent.startCall()` method and provide the `Identifier` of the recipient or recipients.

To join a group call, you need to call the `CallAgent.join()` method and provide the `groupId`. Group IDs must be in GUID or UUID format.

Call creation and start are synchronous. The call instance enables you to subscribe to all events on the call.

### Place a 1:1 call to a user

To place a call to another Communication Services user, invoke the `call` method on `callAgent` and pass an object with `communicationUserId` key.

```java
StartCallOptions startCallOptions = new StartCallOptions();
Context appContext = this.getApplicationContext();
CommunicationUserIdentifier acsUserId = new CommunicationUserIdentifier(<USER_ID>);
CommunicationUserIdentifier participants[] = new CommunicationUserIdentifier[]{ acsUserId };
call oneToOneCall = callAgent.startCall(appContext, participants, startCallOptions);
```

### Place a 1:n call with users and PSTN

> **Note:**
> See [details of PSTN calling offering](../../concepts/numbers/sub-eligibility-number-capability.md). For preview program access, [apply to the early adopter program](https://aka.ms/ACS-EarlyAdopter).

To place a 1:n call to a user and a public switched telephone network (PSTN) number, you need to specify the phone number of the recipient or recipients.

Your Communication Services resource must be configured to enable PSTN calling:

```java
CommunicationUserIdentifier acsUser1 = new CommunicationUserIdentifier(<USER_ID>);
PhoneNumberIdentifier acsUser2 = new PhoneNumberIdentifier("<PHONE_NUMBER>");
CommunicationIdentifier participants[] = new CommunicationIdentifier[]{ acsUser1, acsUser2 };
StartCallOptions startCallOptions = new StartCallOptions();
Context appContext = this.getApplicationContext();
Call groupCall = callAgent.startCall(participants, startCallOptions);
```

## Accept a call

To accept a call, call the `accept` method on a call object.

```java
Context appContext = this.getApplicationContext();
IncomingCall incomingCall = retrieveIncomingCall();
Call call = incomingCall.accept(context).get();
```

To accept a call with video camera on:

```java
Context appContext = this.getApplicationContext();
IncomingCall incomingCall = retrieveIncomingCall();
AcceptCallOptions acceptCallOptions = new AcceptCallOptions();
VideoDeviceInfo desiredCamera = callClient.getDeviceManager().get().getCameraList().get(0);
acceptCallOptions.setVideoOptions(new VideoOptions(new LocalVideoStream(desiredCamera, appContext)));
Call call = incomingCall.accept(context, acceptCallOptions).get();
```

Obtain the incoming call by subscribing to the `onIncomingCall` event on the `callAgent` object:

```java
// Assuming "callAgent" is an instance property obtained by calling the 'createCallAgent' method on CallClient instance 
public Call retrieveIncomingCall() {
    IncomingCall incomingCall;
    callAgent.addOnIncomingCallListener(new IncomingCallListener() {
        void onIncomingCall(IncomingCall inboundCall) {
            // Look for incoming call
            incomingCall = inboundCall;
        }
    });
    return incomingCall;
}
```

## Join a room call

Use the `CallAgent` and `RoomCallLocator` to join a room call by specifying a `roomId`. The `CallAgent.join` method returns a `Call` object:

```Java
val roomCallLocator = RoomCallLocator(roomId)
call = callAgent.join(applicationContext, roomCallLocator, joinCallOptions)
```

A `room` offers application developers better control over *who* can join a call, *when* they meet and *how* they collaborate. For more information about rooms, see [Rooms API for structured meetings](../../concepts/rooms/room-concept.md) and [Join a room call](../../quickstarts/rooms/join-rooms-call.md).

## Join a group call

To start a new group call or join an ongoing group call, you need to call the `join` method and pass an object with a `groupId` property. The value has to be a GUID.

```java
Context appContext = this.getApplicationContext();
GroupCallLocator groupCallLocator = new GroupCallLocator("<GUID>");
JoinCallOptions joinCallOptions = new JoinCallOptions();

call = callAgent.join(context, groupCallLocator, joinCallOptions);
```

## Call properties

Get the unique ID for this Call:

```java
String callId = call.getId();
```

To learn about other participants in the call inspect `remoteParticipant` collection on the `call` instance:

```java
List<RemoteParticipant> remoteParticipants = call.getRemoteParticipants();
```

The identity of caller if the call is incoming:

```java
CommunicationIdentifier callerId = call.getCallerInfo().getIdentifier();
```

Get the state of the Call: 

```java
CallState callState = call.getState();
```

It returns a string representing the current state of a call:
* `NONE` - initial call state
* `EARLY_MEDIA` - indicates a state in which an announcement is played before call is connected
* `CONNECTING` - initial transition state once call is placed or accepted
* `RINGING` - for an outgoing call - indicates call is ringing for remote participants
* `CONNECTED` - call connected
* `LOCAL_HOLD` - call placed on hold by local participant with no media flowing between local endpoint and remote participants
* `REMOTE_HOLD` - call placed on hold by a remote participant with no media flowing between local endpoint and remote participants
* `DISCONNECTING` - transition state before call goes to `Disconnected` state
* `DISCONNECTED` - final call state
* `IN_LOBBY` - in lobby for a Teams meeting interoperability

To learn why a call ended, inspect `callEndReason` property. It contains code/subcode: 

```java
CallEndReason callEndReason = call.getCallEndReason();
int code = callEndReason.getCode();
int subCode = callEndReason.getSubCode();
```

To see if the current call is an incoming or an outgoing call, inspect `callDirection` property:

```java
CallDirection callDirection = call.getCallDirection(); 
// callDirection == CallDirection.INCOMING for incoming call
// callDirection == CallDirection.OUTGOING for outgoing call
```

To see if the current microphone is muted, inspect the `muted` property:

```java
boolean muted = call.isMuted();
```

To inspect active video streams, check the `localVideoStreams` collection:

```java
List<LocalVideoStream> localVideoStreams = call.getLocalVideoStreams();
```

## Mute and unmute

To mute or unmute the local endpoint, you can use the `mute` and `unmute` asynchronous APIs:

```java
Context appContext = this.getApplicationContext();
call.mute(appContext).get();
call.unmute(appContext).get();
```

## Change the volume of the call

While participants are in a call, the hardware volume keys on the phone should enable the user to change the call volume.

Use the method `setVolumeControlStream` with the stream type `AudioManager.STREAM_VOICE_CALL` on the Activity where the call is happening.

This method enables the hardware volume keys to change the volume of the call, denoted by a phone icon or something similar on the volume slider. It also prevents changes to volume by other sound profiles, like alarms, media, or system wide volume. For more information, see [Handling changes in audio output | Android Developers](https://developer.android.com/guide/topics/media-apps/volume-and-earphones).

```java
@Override
protected void onCreate(Bundle savedInstanceState) {
    ...
    setVolumeControlStream(AudioManager.STREAM_VOICE_CALL);
}
```

## Remote participants management

All remote participants have the `RemoteParticipant` type and are available through the `remoteParticipants` collection on a call instance.

### List participants in a call

The `remoteParticipants` collection returns a list of remote participants in given call:

```java
List<RemoteParticipant> remoteParticipants = call.getRemoteParticipants(); // [remoteParticipant, remoteParticipant....]
```

### Add a participant to a call

To add a participant to a call (either a user or a phone number), you can call the `addParticipant` operation.

This operation synchronously returns the remote participant instance.

```java
const acsUser = new CommunicationUserIdentifier("<acs user id>");
const acsPhone = new PhoneNumberIdentifier("<phone number>");
RemoteParticipant remoteParticipant1 = call.addParticipant(acsUser);
AddPhoneNumberOptions addPhoneNumberOptions = new AddPhoneNumberOptions(new PhoneNumberIdentifier("<alternate phone number>"));
RemoteParticipant remoteParticipant2 = call.addParticipant(acsPhone, addPhoneNumberOptions);
```

### Remove participant from a call

To remove a participant from a call (either a user or a phone number), you can call the `removeParticipant` operation.

This operation resolves asynchronously once the participant is removed from the call.

The participant is also removed from `remoteParticipants` collection.

```java
RemoteParticipant acsUserRemoteParticipant = call.getParticipants().get(0);
RemoteParticipant acsPhoneRemoteParticipant = call.getParticipants().get(1);
call.removeParticipant(acsUserRemoteParticipant).get();
call.removeParticipant(acsPhoneRemoteParticipant).get();
```

### Remote participant properties

Any given remote participant has a set of associated properties and collections:

- Get the identifier for this remote participant.

Identity is one of the `Identifier` types:

  ```java
  CommunicationIdentifier participantIdentifier = remoteParticipant.getIdentifier();
  ```

- Get the state of this remote participant.

  ```java
  ParticipantState state = remoteParticipant.getState();
  ```

State can be one of:

* `IDLE` - initial state
* `EARLY_MEDIA` - announcement is played before participant is connected to the call
* `RINGING` - participant call is ringing
* `CONNECTING` - transition state while participant is connecting to the call
* `CONNECTED` - participant is connected to the call
* `HOLD` - participant is on hold
* `IN_LOBBY` - participant is waiting in the lobby to be admitted. Currently only used in Teams interop scenario
* `DISCONNECTED` - final state - participant is disconnected from the call

* To learn why a participant left the call, inspect `callEndReason` property:

    ```java
    CallEndReason callEndReason = remoteParticipant.getCallEndReason();
    ```

* To check whether this remote participant is muted or not, inspect the `isMuted` property:

    ```java
    boolean isParticipantMuted = remoteParticipant.isMuted();
    ```

* To check whether this remote participant is speaking or not, inspect the `isSpeaking` property:

    ```java
    boolean isParticipantSpeaking = remoteParticipant.isSpeaking();
    ```

* To inspect all video streams that a given participant is sending in this call, check the `videoStreams` collection:

    ```java
    List<RemoteVideoStream> videoStreams = remoteParticipant.getVideoStreams(); // [RemoteVideoStream, RemoteVideoStream, ...]
    ```
### Mute other participants

> **Note:**
> Use the Azure Communication Services Calling Android SDK version 2.11.0 or higher. 

When a PSTN participant is muted, they receive an announcement that they're muted and that they can press a key combination (such as **\*6**) to unmute themselves. When they press **\*6**, they are unmuted.

To mute all other participants in a call, use the `muteAllRemoteParticipants` API operation.

```java
call.muteAllRemoteParticipants();
```

To mute a specific remote participant, use the `mute` API operation on a given remote participant.

```java
remoteParticipant.mute();
```

To notify the local participant that they're muted by others, subscribe to the `onMutedByOthers` event. 

## Using Foreground Services

If you want to run a user-visible task even when your application is in background, you can use [Foreground Services](https://developer.android.com/guide/components/foreground-services).

Use Foreground Services, for example, to provide users with a visible notification when your application has an active call. This way, even if the user goes to the homescreen or removes the application from the [recents screen](https://developer.android.com/guide/components/activities/recents), the call continues to be active.

If you don't use a Foreground Service while in a call, navigating to the homescreen can keep the call active, but removing the application from the recent's screen can stop the call if the Android OS kills your application's process.

You should start the Foreground Service when a user starts or joins a call, for example:

```java
call = callAgent.startCall(context, participants, options);
startService(yourForegroundServiceIntent);
```

You should also stop the Foreground Service when you hang up the call or the call's status is Disconnected, for example:

```java
call.hangUp(new HangUpOptions()).get();
stopService(yourForegroundServiceIntent);
```

### Foreground Service details

Keep in mind that scenarios like stopping an already running Foreground Service when the app is removed from the recent's list removes the user-visible notification. In this case the Android OS can keep your application process alive for some extra period of time, meaning that the call can remain active during this period.

If your application is stopping the Foreground Service on the service `onTaskRemoved` method, for example, your application can start or stop audio and video according to your [Activity Lifecycle](https://developer.android.com/guide/components/activities/activity-lifecycle). Such as stopping audio and video when your activity is destroyed with the `onDestroy` method override.



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


> **Note:**
> When the application implements event delegates, it must hold a strong reference to the objects that require event subscriptions. For example, when you call the `call.addParticipant` method and it returns a `RemoteParticipant` object. Then the application sets the delegate to listen on `RemoteParticipantDelegate` and the application must hold a strong reference to the `RemoteParticipant` object. Otherwise, if this object is collected, the delegate throws a fatal exception when the Calling SDK tries to invoke the object.

## Place an outgoing call

To create and start a call, you need to call one of the APIs on `CallAgent` and provide the Communication Services identity of a user that you've provisioned by using the Communication Services Management SDK.

Call creation and start are synchronous. You receive a call instance that enables you to subscribe to all events on the call.

### Place a 1:1 call to a user or a 1:n call with users and PSTN

```swift
let callees = [CommunicationUser(identifier: 'UserId')]
self.callAgent?.startCall(participants: callees, options: StartCallOptions()) { (call, error) in
     if error == nil {
         print("Successfully started outgoing call")
         self.call = call
     } else {
         print("Failed to start outgoing call")
     }
}
```

### Place a 1:n call with users and PSTN

> **Note:**
> See [details of PSTN calling offering](../../concepts/numbers/sub-eligibility-number-capability.md). For preview program access, [apply to the early adopter program](https://aka.ms/ACS-EarlyAdopter).

To place a 1:n call to a user and a public switched telephone network (PSTN), you need to specify a phone number acquired with Communication Services.

```swift
let pstnCallee = PhoneNumberIdentifier(phoneNumber: '+1999999999')
let callee = CommunicationUserIdentifier('UserId')
self.callAgent?.startCall(participants: [pstnCallee, callee], options: StartCallOptions()) { (groupCall, error) in
     if error == nil {
         print("Successfully started outgoing call to multiple participants")
         self.call = groupCall
     } else {
         print("Failed to start outgoing call to multiple participants")
     }
}
```

## Join a room call

To join a `room` call, specify the `roomId` property as the `room` identifier. To join the call, use the `join` method and pass the `roomCallLocator`.

```Swift
func joinRoomCall() {
    if self.callAgent == nil {
        print("CallAgent not initialized")
        return
    }
    
    if (self.roomId.isEmpty) {
        print("Room ID not set")
        return
    }
    
    // Join a call with a Room ID
    let options = JoinCallOptions()
    let audioOptions = AudioOptions()
    audioOptions.muted = self.muted
    
    options.audioOptions = audioOptions
    
    let roomCallLocator = RoomCallLocator(roomId: roomId)
    self.callAgent!.join(with: roomCallLocator, joinCallOptions: options) { (call, error) in
        self.setCallAndObserver(call: call, error: error)
    }
}
```

A `room` offers application developers better control over *who* can join a call, *when* they meet and *how* they collaborate. For more information about rooms, see [Rooms API for structured meetings](../../concepts/rooms/room-concept.md) and [Join a room call](../../quickstarts/rooms/join-rooms-call.md).

## Join a group call

To join a call, you need to call one of the APIs on `CallAgent`.

```swift
let groupCallLocator = GroupCallLocator(groupId: UUID(uuidString: "uuid_string")!)
self.callAgent?.join(with: groupCallLocator, joinCallOptions: JoinCallOptions()) { (call, error) in
    if error == nil {
        print("Successfully joined group call")
        self.call = call
    } else {
        print("Failed to join group call")
    }
}
```

## Subscribe to an incoming call

Subscribe to an incoming call event.

```swift
final class IncomingCallHandler: NSObject, CallAgentDelegate, IncomingCallDelegate
{
    // Event raised when there is an incoming call
    public func callAgent(_ callAgent: CallAgent, didReceiveIncomingCall incomingcall: IncomingCall) {
        self.incomingCall = incomingcall
        // Subscribe to get OnCallEnded event
        self.incomingCall?.delegate = self
    }

    // Event raised when incoming call was not answered
    public func incomingCall(_ incomingCall: IncomingCall, didEnd args: PropertyChangedEventArgs) {
        print("Incoming call was not answered")
        self.incomingCall = nil
    }
}
```

### Accept an incoming call

To accept a call, call the `accept` method on a `IncomingCall` object.

```swift
self.incomingCall!.accept(options: AcceptCallOptions()) { (call, error) in
   if (error == nil) {
       print("Successfully accepted incoming call")
       self.call = call
   } else {
       print("Failed to accept incoming call")
   }
}

let firstCamera: VideoDeviceInfo? = self.deviceManager!.cameras.first
localVideoStreams = [LocalVideoStream]()
localVideoStreams!.append(LocalVideoStream(camera: firstCamera!))
let acceptCallOptions = AcceptCallOptions()
acceptCallOptions.videoOptions = VideoOptions(localVideoStreams: localVideoStreams!)
if let incomingCall = self.incomingCall {
    incomingCall.accept(options: acceptCallOptions) { (call, error) in
        if error == nil {
            print("Incoming call accepted")
        } else {
            print("Failed to accept incoming call")
        }
    }
} else {
  print("No incoming call found to accept")
}
```

## Perform mid-call operations

You can perform operations during a call to manage settings related to video and audio.

### Mute and unmute

To mute or unmute the local endpoint, you can use the `mute` and `unmute` asynchronous APIs.

```swift
call!.mute { (error) in
    if error == nil {
        print("Successfully muted")
    } else {
        print("Failed to mute")
    }
}
```

Use the following code to unmute the local endpoint asynchronously.

```swift
call!.unmute { (error) in
    if error == nil {
        print("Successfully un-muted")
    } else {
        print("Failed to unmute")
    }
}
```

## Manage remote participants

The `RemoteParticipant` type represents all remote participants. They're available through the `remoteParticipants` collection on a call instance.

### List participants in a call

```swift
call.remoteParticipants
```

### Add a participant to a call

To add a participant to a call as either a user or a phone number, call the `addParticipant` operation. This operation synchronously returns a remote participant instance.

```swift
let remoteParticipantAdded: RemoteParticipant = call.add(participant: CommunicationUserIdentifier(identifier: "userId"))
```

### Remove a participant from a call

To remove a participant from a call as either a user or a phone number, call the `removeParticipant` operation. This operation resolves asynchronously.

```swift
call!.remove(participant: remoteParticipantAdded) { (error) in
    if (error == nil) {
        print("Successfully removed participant")
    } else {
        print("Failed to remove participant")
    }
}
```

### Get remote participant properties

```swift
// [RemoteParticipantDelegate] delegate - an object you provide to receive events from this RemoteParticipant instance
var remoteParticipantDelegate = remoteParticipant.delegate

// [CommunicationIdentifier] identity - same as the one used to provision a token for another user
var identity = remoteParticipant.identifier

// ParticipantStateIdle = 0, ParticipantStateEarlyMedia = 1, ParticipantStateConnecting = 2, ParticipantStateConnected = 3, ParticipantStateOnHold = 4, ParticipantStateInLobby = 5, ParticipantStateDisconnected = 6
var state = remoteParticipant.state

// [Error] callEndReason - reason why participant left the call, contains code/subcode/message
var callEndReason = remoteParticipant.callEndReason

// [Bool] isMuted - indicating if participant is muted
var isMuted = remoteParticipant.isMuted

// [Bool] isSpeaking - indicating if participant is currently speaking
var isSpeaking = remoteParticipant.isSpeaking

// RemoteVideoStream[] - collection of video streams this participants has
var videoStreams = remoteParticipant.videoStreams // [RemoteVideoStream, RemoteVideoStream, ...]
```

### Mute other participants

> **Note:**
> Use the Azure Communication Services Calling iOS SDK version 2.13.0 or higher. 

When a PSTN participant is muted, they receive an announcement that they're muted and that they can press a key combination (such as **\*6**) to unmute themselves. When they press **\*6**, they're unmuted.

To mute all other participants in a call, use the `muteAllRemoteParticipants` operation on the call.

```swift
call!.muteAllRemoteParticipants { (error) in
    if error == nil {
        print("Successfully muted all remote participants.")
    } else {
        print("Failed to mute remote participants.")
    }
}
```

To mute a specific remote participant, use the `mute` operation on a given remote participant.

```swift
remoteParticipant.mute { (error) in
    if error == nil {
        print("Successfully muted participant.")
    } else {
        print("Failed to mute participant.")
    }
}
```

To notify the local participant that they're muted by others, subscribe to the `onMutedByOthers` event. 



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


## Implement the sample app in Visual Studio

This section describes how to develop the app to manage calls working in Visual Studio.

### Request access to the microphone

The app requires access to the microphone. In Universal Windows Platform (UWP) apps, the microphone capability must be declared in the app manifest file.

To access the microphone:

1. In the `Solution Explorer` panel, double click on the file with `.appxmanifest` extension.
2. Click on the `Capabilities` tab.
3. Select the `Microphone` check box from the capabilities list.

### Create UI buttons to place and hang up the call

This sample app contains two buttons. One for placing the call and another to hang up a placed call.

Add two buttons to the app.

1. In the `Solution Explorer` panel, double click on the file named `MainPage.xaml` for UWP, or `MainWindows.xaml` for WinUI 3.
2. In the central panel, look for the XAML code under the UI preview.
3. Modify the XAML code by the following excerpt:

  ```xml
  <TextBox x:Name="CalleeTextBox" PlaceholderText="Who would you like to call?" />
  <StackPanel>
      <Button x:Name="CallButton" Content="Start/Join call" Click="CallButton_Click" />
      <Button x:Name="HangupButton" Content="Hang up" Click="HangupButton_Click" />
  </StackPanel>
  ```

### Set up the app with Calling SDK APIs

The Calling SDK APIs are in two different namespaces.

The following steps inform the C# compiler about these namespaces, enabling Visual Studio's Intellisense to help with code development.

1. In the `Solution Explorer` panel, click on the arrow on the left side of the file named `MainPage.xaml` for UWP, or `MainWindows.xaml` for WinUI 3.
2. Double click on file named `MainPage.xaml.cs` or `MainWindows.xaml.cs`.
3. Add the following commands at the bottom of the current `using` statements.

```csharp
using Azure.Communication.Calling.WindowsClient;
```

Keep `MainPage.xaml.cs` or `MainWindows.xaml.cs` open. The next steps add more code.

## Enable app interactions

The UI buttons previously added need to operate on top of a placed `CommunicationCall`. It means that a `CommunicationCall` data member should be added to the `MainPage` or `MainWindow` class.
Additionally, to allow the asynchronous operation creating `CallAgent` to succeed, a `CallAgent` data member should also be added to the same class.

Add the following data members to the `MainPage` pr `MainWindow` class:

```csharp
CallAgent callAgent;
CommunicationCall call;
```

## Create button handlers

Previously, two UI buttons were added to the XAML code. The following code adds the handlers to be executed when a user selects the button.
The following code should be added after the data members from the previous section.

```csharp
private async void CallButton_Click(object sender, RoutedEventArgs e)
{
    // Start call
}

private async void HangupButton_Click(object sender, RoutedEventArgs e)
{
    // End the current call
}
```

## Object model

The following classes and interfaces handle some of the major features of the Azure Communication Services Calling client library for UWP.

| Name | Description |
| --- | --- |
| `CallClient` | The `CallClient` is the main entry point to the Calling client library. |
| `CallAgent` | The `CallAgent` is used to start and join calls. |
| `CommunicationCall` | The `CommunicationCall` is used to manage placed or joined calls. |
| `CommunicationTokenCredential` | The `CommunicationTokenCredential` is used as the token credential to instantiate the `CallAgent`. |
| `CallAgentOptions` | The `CallAgentOptions` contains information to identify the caller. |
| `HangupOptions` | The `HangupOptions` informs if a call should be terminated to all its participants. |

## Initialize the CallAgent

To create a `CallAgent` instance from `CallClient`, you must use `CallClient.CreateCallAgentAsync` method that asynchronously returns a `CallAgent` object once it's initialized.

To create `CallAgent`, you must pass a `CallTokenCredential` object and a `CallAgentOptions` object. Keep in mind that `CallTokenCredential` throws if a malformed token is passed.

To call during app initialization, add the following code inside and helper function.

```csharp
var callClient = new CallClient();
this.deviceManager = await callClient.GetDeviceManagerAsync();

var tokenCredential = new CallTokenCredential("<AUTHENTICATION_TOKEN>");
var callAgentOptions = new CallAgentOptions()
{
    DisplayName = "<DISPLAY_NAME>"
};

this.callAgent = await callClient.CreateCallAgentAsync(tokenCredential, callAgentOptions);
```

Change the `<AUTHENTICATION_TOKEN>` with a valid credential token for your resource. If you need to source a credential token, see [user access token](../../quickstarts/identity/access-tokens.md).

## Create CallAgent and place a call

The objects you need to create a `CallAgent` are now ready. It's time to asynchronously create `CallAgent` and place a call.

Add the following code after handling the exception from the previous step.

```csharp
var startCallOptions = new StartCallOptions();
var callees = new [] { new UserCallIdentifier(CalleeTextBox.Text.Trim()) };

this.call = await this.callAgent.StartCallAsync(callees, startCallOptions);
this.call.OnStateChanged += Call_OnStateChangedAsync;
```

Use `8:echo123` to talk to the Azure Communication Services echo bot.

## Mute and unmute

To mute or unmute the outgoing audio, use the `MuteOutgoingAudioAsync` and `UnmuteOutgoingAudioAsync` asynchronous operations:

```csharp
// mute outgoing audio
await this.call.MuteOutgoingAudioAsync();

// unmute outgoing audio
await this.call.UnmuteOutgoingAudioAsync();
```

## Mute other participants

> **Note:**
> Use the Azure Communication Services Calling Windows SDK version 1.9.0 or higher. 

When a PSTN participant is muted, they must receive an announcement that they have been muted and that they can press a key combination (such as **\*6**) to unmute themselves. When they press **\*6**, they must be unmuted.

To mute all other participants or mute a specific participant, use the asynchronous operations `MuteAllRemoteParticipantsAsync` on the call and `MuteAsync` on the remote participant:

```csharp
// mute all participants except yourself
await this.call.MuteAllRemoteParticipantsAsync();

// mute specific participant in the call
await this.call.RemoteParticipants.FirstOrDefault().MuteAsync();
```

To notify the local participant that they're muted by others, subscribe to the `MutedByOthers` event.

## End a call

Once a call is placed, use the `HangupAsync` method of the `CommunicationCall` object to hang up the call.

Use an instance of `HangupOptions` to inform all participants if the call must be terminated.

Add the following code inside `HangupButton_Click`:

```csharp
this.call.OnStateChanged -= Call_OnStateChangedAsync;
await this.call.HangUpAsync(new HangUpOptions() { ForEveryone = false });
```

## Run the code

1. Make sure Visual Studio builds the app for `x64`, `x86` or `ARM64`.
2. Press **F5** to start running the app.
3. Once the app is running, click the **Call** button to place a call to the defined recipient.

The first time the app runs, the system prompts the user to grant access to the microphone.



## Next steps
- [Learn how to manage video](manage-video.md)
- [Learn how to record calls](record-calls.md)
- [Learn how to transcribe calls](call-transcription.md)
