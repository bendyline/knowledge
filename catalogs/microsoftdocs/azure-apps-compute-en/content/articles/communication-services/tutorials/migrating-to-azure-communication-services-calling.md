---
title: Tutorial - Migrate from Twilio Video to Azure Communication Services
titleSuffix: An Azure Communication Services tutorial
description: Learn how to migrate a calling product from Twilio Video to Azure Communication Services.
author: sloanster
services: azure-communication-services

ms.author: micahvivion
ms.date: 01/26/2024
ms.topic: how-to
ms.service: azure-communication-services
ms.subservice: calling
ms.custom: template-how-to
zone_pivot_groups: acs-plat-web-ios-android
---

# Migrate from Twilio Video to Azure Communication Services


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


This article describes how to migrate an existing Twilio Video implementation to the [Azure Communication Services Calling SDK](../concepts/voice-video-calling/calling-sdk-features.md). Both Twilio Video and Azure Communication Services Calling SDK are cloud-based platforms that enable developers to add voice and video calling features to their web applications.

However, there are some key differences between them that may affect your choice of platform or require some changes to your existing code if you decide to migrate. In this article, we compare the main features and functions of both platforms and provide some guidance on how to migrate an existing Twilio Video implementation to Azure Communication Services Calling SDK.

## Key features available in Azure Communication Services Calling SDK




| **Feature** | **Web (JavaScript)** | **iOS** | **Android** | **Platform neutral** |
| --- | --- | --- | --- | --- |
| **Install** | [✔️](../quickstarts/voice-video-calling/getting-started-with-calling.md?tabs=uwp&pivots=platform-web#install-the-package) | [✔️](../quickstarts/voice-video-calling/getting-started-with-calling.md?tabs=uwp&pivots=platform-ios#install-calling-sdk-using-swift-package-manager-recommended) | [✔️](../quickstarts/voice-video-calling/getting-started-with-calling.md?tabs=uwp&pivots=platform-android#install-the-package) |  |
| **Import** | [✔️](../quickstarts/voice-video-calling/getting-started-with-calling.md?tabs=uwp&pivots=platform-web#install-the-package) | [✔️](../quickstarts/voice-video-calling/getting-started-with-calling.md?tabs=uwp&pivots=platform-ios#install-calling-sdk-using-swift-package-manager-recommended) | [✔️](../quickstarts/voice-video-calling/getting-started-with-calling.md?tabs=uwp&pivots=platform-android#install-the-package) |  |
| **Auth** |  |  |  | [✔️](../quickstarts/identity/access-tokens.md?tabs=windows&pivots=platform-azportal) |
| **Join** | [✔️](../how-tos/calling-sdk/manage-calls.md?pivots=platform-web#join-a-room-call) | [✔️](../how-tos/calling-sdk/manage-calls.md?pivots=platform-ios#join-a-room-call) | [✔️](../how-tos/calling-sdk/manage-calls.md?pivots=platform-android#join-a-room-call) |  |
| **Start Audio/Speaker** | [✔️](../how-tos/calling-sdk/manage-video.md?pivots=platform-web#device-management) | [✔️](../how-tos/calling-sdk/manage-video.md?pivots=platform-ios#manage-devices) | [✔️](../how-tos/calling-sdk/manage-video.md?pivots=platform-android#device-management) |  |
| **Mute** | [✔️](../how-tos/calling-sdk/manage-calls.md?pivots=platform-web#mute-and-unmute) | [✔️](../how-tos/calling-sdk/manage-calls.md?pivots=platform-ios#mute-and-unmute) | [✔️](../how-tos/calling-sdk/manage-calls.md?pivots=platform-android#mute-and-unmute) |  |
| **Unmute** | [✔️](../how-tos/calling-sdk/manage-calls.md?pivots=platform-web#mute-and-unmute) | [✔️](../how-tos/calling-sdk/manage-calls.md?pivots=platform-ios#mute-and-unmute) | [✔️](../how-tos/calling-sdk/manage-calls.md?pivots=platform-android#mute-and-unmute) |  |
| **Start Video** | [✔️](../how-tos/calling-sdk/manage-video.md?pivots=platform-web#start-and-stop-sending-local-video-while-on-a-call) | [✔️](../how-tos/calling-sdk/manage-video.md?pivots=platform-ios#get-a-local-camera-preview) | [✔️](../how-tos/calling-sdk/manage-video.md?pivots=platform-android#start-and-stop-sending-local-video) |  |
| **Stop Video** | [✔️](../how-tos/calling-sdk/manage-video.md?pivots=platform-web#start-and-stop-sending-local-video-while-on-a-call) | [✔️](../how-tos/calling-sdk/manage-video.md?pivots=platform-ios#get-a-local-camera-preview) | [✔️](../how-tos/calling-sdk/manage-video.md?pivots=platform-android#start-and-stop-sending-local-video) |  |
| **Virtual Background** | [✔️](../quickstarts/voice-video-calling/get-started-video-effects.md?pivots=platform-web) | [✔️](../quickstarts/voice-video-calling/get-started-video-effects.md?pivots=platform-ios) | [✔️](../quickstarts/voice-video-calling/get-started-video-effects.md?pivots=platform-android) |  |
| **Render User Video** | [✔️](../how-tos/calling-sdk/manage-video.md?pivots=platform-web#render-remote-participant-videoscreensharing-streams) | [✔️](../how-tos/calling-sdk/manage-video.md?pivots=platform-ios#render-remote-participant-video-streams) | [✔️](../how-tos/calling-sdk/manage-video.md?pivots=platform-android#render-remote-participant-video-streams) |  |
| **Recording** |  |  |  | [✔️](../concepts/voice-video-calling/call-recording.md) |
| **Network Bandwidth Management** | [✔️](../quickstarts/voice-video-calling/get-started-video-constraints.md?pivots=platform-web) | [✔️](../quickstarts/voice-video-calling/get-started-video-constraints.md?pivots=platform-ios) | [✔️](../quickstarts/voice-video-calling/get-started-video-constraints.md?pivots=platform-android) |  |
| **Quality of Service** |  |  |  | [✔️](../concepts/voice-video-calling/manage-call-quality.md) |
| **Data Center Selection** |  |  |  | [✔️](../concepts/detailed-call-flows.md#call-flow-principles) |
| **Preview** | [✔️](../how-tos/calling-sdk/manage-video.md?pivots=platform-web.md#local-camera-preview) | [✔️](../how-tos/calling-sdk/manage-video.md?pivots=platform-ios#get-a-local-camera-preview) | [✔️](../how-tos/calling-sdk/manage-video.md?pivots=platform-android#start-and-stop-sending-local-video) |  |
| **Security** |  |  |  | [✔️](../concepts/detailed-call-flows.md#media-encryption) |
| **Networking** |  |  |  | [✔️](../concepts/voice-video-calling/network-requirements.md) |
| **Screen Share** | [✔️](../how-tos/calling-sdk/manage-video.md?pivots=platform-web#start-and-stop-screen-sharing-while-on-a-call) |  |  |  |
| **Rest APIs** |  |  |  | [✔️](https://learn.microsoft.com/rest/api/communication/) |
| **Webhooks** |  |  |  | [✔️](https://learn.microsoft.com/azure/event-grid/communication-services-voice-video-events) |
| **Raw Data** | [✔️](../quickstarts/voice-video-calling/get-started-raw-media-access.md?pivots=platform-web) | [✔️](../quickstarts/voice-video-calling/get-started-raw-media-access.md?pivots=platform-ios) | [✔️](../quickstarts/voice-video-calling/get-started-raw-media-access.md?pivots=platform-android) |  |
| **Codecs** |  |  |  | [✔️](../concepts/voice-video-calling/about-call-types.md#supported-video-standards) |
| **WebView** |  | [✔️](../quickstarts/voice-video-calling/get-started-webview.md?pivots=platform-ios) | [✔️](../quickstarts/voice-video-calling/get-started-webview.md?pivots=platform-android) |  |
| **Video Devices** | [✔️](../how-tos/calling-sdk/manage-video.md?pivots=platform-web#device-management) | [✔️](../how-tos/calling-sdk/manage-video.md?pivots=platform-ios#manage-devices) | [✔️](../how-tos/calling-sdk/manage-video.md?pivots=platform-android#device-management) |  |
| **Speaker Devices** | [✔️](../how-tos/calling-sdk/manage-video.md?pivots=platform-web#set-the-default-devices) | [✔️](../how-tos/calling-sdk/manage-video.md?pivots=platform-ios#manage-devices) | [✔️](../how-tos/calling-sdk/manage-video.md?pivots=platform-android#device-management) |  |
| **Microphone Devices** | [✔️](../how-tos/calling-sdk/manage-video.md?pivots=platform-web#set-the-default-devices) | [✔️](../how-tos/calling-sdk/manage-video.md?pivots=platform-ios#manage-devices) | [✔️](../how-tos/calling-sdk/manage-video.md?pivots=platform-android#device-management) |  |
| **Data Channel API** | [✔️](../quickstarts/voice-video-calling/get-started-data-channel.md?pivots=platform-web) | [✔️](../quickstarts/voice-video-calling/get-started-data-channel.md?pivots=platform-ios) | [✔️](../quickstarts/voice-video-calling/get-started-data-channel.md?pivots=platform-android) |  |
| **Analytics/Video Insights** |  |  |  | [✔️](../concepts/analytics/insights/voice-and-video-insights.md) |
| **Diagnostic Tooling** |  |  |  | [✔️](../concepts/voice-video-calling/call-diagnostics.md) |
| **Reports** |  |  |  | [✔️](../concepts/analytics/enable-logging.md) |
| **CallKit (iOS Only)** |  | [✔️](../how-tos/calling-sdk/callkit-integration.md) |  |  |
| **Picture-in-picture** |  | [✔️](../how-tos/ui-library-sdk/picture-in-picture.md?tabs=kotlin&pivots=platform-ios) | [✔️](../how-tos/ui-library-sdk/picture-in-picture.md?tabs=kotlin&pivots=platform-android) |  |




**Applies to: platform-web**


## Prerequisites

1.  **Azure Account:** Make sure that your Azure account is active. New users can create a free account at [Microsoft Azure](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
2.  **Node.js 18:** Ensure Node.js 18 is installed on your system. Download from [Node.js](https://nodejs.org/en).
3.  **Communication Services Resource:** Set up a [Communication Services Resource](../quickstarts/create-communication-resource.md?tabs=windows\&pivots=platform-azp) via your Azure portal and note your connection string.
4.  **Azure CLI:** Follow the instructions to [Install Azure CLI on Windows](https://learn.microsoft.com/cli/azure/install-azure-cli-windows?tabs=azure-cli)..
5.  **User Access Token:** Generate a user access token to instantiate the call client. You can create one using the Azure CLI as follows:
```console
az communication identity token issue --scope voip --connection-string "yourConnectionString"
```

For more information, see [Use Azure CLI to Create and Manage Access Tokens](../quickstarts/identity/access-tokens.md?pivots=platform-azcli).

For Video Calling as a Teams user:

-   You can also use Teams identity. To generate an access token for a Teams User, see [Manage teams identity](../quickstarts/manage-teams-identity.md?pivots=programming-language-javascript).
-   Obtain the Teams thread ID for call operations using the [Graph Explorer](https://developer.microsoft.com/graph/graph-explorer). For information about creating a thread ID, see [Create chat - Microsoft Graph v1.0 > Example2: Create a group chat](https://learn.microsoft.com/graph/api/chat-post?preserve-view=true\&tabs=javascript\&view=graph-rest-1.0#example-2-create-a-group-chat).

## UI library

The Azure Communication Services UI library simplifies the process of creating modern communication user interfaces using Azure Communication Services. It offers a collection of ready-to-use UI components that you can easily integrate into your application.

This open source prebuilt set of controls enables you to create aesthetically pleasing designs using [Fluent UI SDK](https://developer.microsoft.com/en-us/fluentui#/) components and develop high quality audio/video communication experiences. For more information, check out the [Azure Communications Services UI Library overview](../concepts/ui-library/ui-library-overview.md). The overview includes comprehensive information about both web and mobile platforms.

## Installation

### Install the Azure Communication Services Calling SDK

Use the `npm install` command to install the Azure Communication Services Calling SDK for JavaScript.
```console
npm install @azure/communication-common npm install @azure/communication-calling
```

### Remove the Twilio SDK from the project

You can remove the Twilio SDK from your project by uninstalling the package.
```console
npm uninstall twilio-video
```

## Object Model

The following classes and interfaces handle some of the main features of the Azure Communication Services Calling SDK:

| **Name** | **Description** |
| --- | --- |
| CallClient | The main entry point to the Calling SDK. |
| AzureCommunicationTokenCredential | Implements the `CommunicationTokenCredential` interface, which is used to instantiate the CallAgent. |
| CallAgent | Start and manage calls. |
| Device Manager | Manage media devices. |
| Call | Represents a Call. |
| LocalVideoStream | Create a local video stream for a camera device on the local system. |
| RemoteParticipant | Represents a remote participant in the Call. |
| RemoteVideoStream | Represents a remote video stream from a Remote Participant. |
| LocalAudioStream | Represents a local audio stream for a local microphone device. |
| AudioOptions | Audio options, provided to a participant when making an outgoing call or joining a group call. |
| AudioIssue | Represents the end of call survey audio issues. Example responses might be `NoLocalAudio` - the other participants were unable to hear me, or `LowVolume` - the call audio volume was too low. |

When using ACS calling in a Teams call, there are a few differences:

-   Instead of `CallAgent` - use `TeamsCallAgent` for starting and managing Teams calls.
-   Instead of `Call` - use `TeamsCall` for representing a Teams Call.

## Initialize the Calling SDK (CallClient/CallAgent)

Using the `CallClient`, initialize a `CallAgent` instance. The `createCallAgent` method uses CommunicationTokenCredential as an argument. It accepts a [user access token](../quickstarts/identity/access-tokens.md?tabs=windows\&pivots=programming-language-javascript).

### Device manager

#### Twilio

Twilio doesn't have a Device Manager analog. Tracks are created using the system’s default device. To customize a device, obtain the desired source track via:
```javascript
navigator.mediaDevices.getUserMedia()
```

And pass it to the track creation method.

#### Azure Communication Services
```javascript
const { CallClient } = require('@azure/communication-calling');  
const { AzureCommunicationTokenCredential} = require('@azure/communication-common'); 

const userToken = '<USER_TOKEN>';  
const tokenCredential = new AzureCommunicationTokenCredential(userToken); 

callClient = new CallClient(); 
const callAgent = await callClient.createCallAgent(tokenCredential, {displayName: 'optional user name'});
```

You can use the `getDeviceManager` method on the `CallClient` instance to access `deviceManager`.

const deviceManager = await callClient.getDeviceManager(); 
```javascript
// Get a list of available video devices for use.  
const localCameras = await deviceManager.getCameras(); 

// Get a list of available microphone devices for use.  
const localMicrophones = await deviceManager.getMicrophones();  

// Get a list of available speaker devices for use.  
const localSpeakers = await deviceManager.getSpeakers();
```

### Get device permissions

#### Twilio

Twilio Video asks for device permissions on track creation.

#### Azure Communication Services

Prompt a user to grant camera and/or microphone permissions:
```javascript
const result = await deviceManager.askDevicePermission({audio: true, video: true});
```

The output returns with an object that indicates whether audio and video permissions were granted:
```javascript
console.log(result.audio);  console.log(result.video);
```

## Starting a call

### Twilio

```javascript
import * as TwilioVideo from 'twilio-video';

const twilioVideo = TwilioVideo; 
let twilioRoom; 

twilioRoom = await twilioVideo.connect('token', { name: 'roomName', audio: false, video: false });
```

### Azure Communication Services

To create and start a call, use one of the `callAgent` APIs and provide a user that you created through the Communication Services identity SDK.

Call creation and start are synchronous. The `call` instance enables you to subscribe to call events. Subscribe to the `stateChanged` event for value changes.
```javascript
call.on('stateChanged', async () =\> {  console.log(\`Call state changed: \${call.state}\`) });
```

#### 1:1 Call

To call another Azure Communication Services user, use the `startCall` method on `callAgent` and pass the recipient's `CommunicationUserIdentifier` that you [created with the Communication Services administration library](../quickstarts/identity/access-tokens.md).
```javascript
const userCallee = { communicationUserId: '\<Azure_Communication_Services_USER_ID\>' };
const oneToOneCall = callAgent.startCall([userCallee]);
```

#### Rooms Call

To join a `Room` call, you can instantiate a context object with the `roomId` property as the room identifier. To join the call, use the `join` method and pass the context instance.
```javascript
const context = { roomId: '\<RoomId\>' };
const call = callAgent.join(context);
```
A **Room** offers application developers better control over who can join a call, when they meet and how they collaborate. To learn more about **Rooms**, see the [Rooms overview](../concepts/rooms/room-concept.md), or see [Quickstart: Join a room call](../quickstarts/rooms/join-rooms-call.md).

#### Group Call

To start a new group call or join an ongoing group call, use the `join` method and pass an object with a `groupId` property. The `groupId` value must be a GUID.
```javascript
const context = { groupId: '\<GUID\>'};
const call = callAgent.join(context);
```

#### Teams call

Start a synchronous one-to-one or group call using the `startCall` API on `teamsCallAgent`. You can provide `MicrosoftTeamsUserIdentifier` or `PhoneNumberIdentifier` as a parameter to define the target of the call. The method returns the `TeamsCall` instance that allows you to subscribe to call events.
```javascript
const userCallee = { microsoftTeamsUserId: '\<MICROSOFT_TEAMS_USER_ID\>' };
const oneToOneCall = teamsCallAgent.startCall(userCallee);
```

## Accepting and joining a call

### Twilio

When using Twilio Video SDK, the Participant is created after joining the room; and it doesn't have any information about other rooms.

### Azure Communication Services

Azure Communication Services has the `CallAgent` instance, which emits an `incomingCall` event when the logged-in identity receives an incoming call.
```javascript
callAgent.on('incomingCall', async (call) =\>{
    // Incoming call
    });
```

The `incomingCall` event includes an `incomingCall` instance that you can accept or reject.

When starting, joining, or accepting a call with *video on*, if the specified video camera device is being used by another process or if the camera is disabled in the system, the call starts with *video off*, and returns a `cameraStartFailed: true` call diagnostic.

```javascript
const incomingCallHandler = async (args: { incomingCall: IncomingCall }) => {  
  const incomingCall = args.incomingCall;  

  // Get incoming call ID  
  var incomingCallId = incomingCall.id  

  // Get information about this Call.  
  var callInfo = incomingCall.info;  

  // Get information about caller  
  var callerInfo = incomingCall.callerInfo  
    
  // Accept the call  
  var call = await incomingCall.accept();  

  // Reject the call  
  incomingCall.reject();  

  // Subscribe to callEnded event and get the call end reason  
  incomingCall.on('callEnded', args =>  
  	{ console.log(args.callEndReason);  
  });  

  // callEndReason is also a property of IncomingCall  
  var callEndReason = incomingCall.callEndReason;  
};  

callAgentInstance.on('incomingCall', incomingCallHandler);

```

After starting a call, joining a call, or accepting a call, you can also use the `callAgent` `callsUpdated` event to be notified of the new `Call` object and start subscribing to it.
```javascript
callAgent.on('callsUpdated', (event) => { 
  event.added.forEach((call) => { 
    // User joined call 
  }); 
  
  event.removed.forEach((call) => { 
    // User left call 
  }); 
});
```

For Azure Communication Services Teams implementation, see how to [Receive a Teams Incoming Call](../how-tos/cte-calling-sdk/manage-calls.md#receive-a-teams-incoming-call).

## Adding and removing participants to a call

### Twilio

Participants can't be added or removed from Twilio Room, they need to join the Room or disconnect from it themselves.

Local Participant in Twilio Room can be accessed this way:
```javascript
let localParticipant = twilioRoom.localParticipant;
```

Remote Participants in Twilio Room are represented with a map that has unique Participant SID as a key:
```javascript
twilioRoom.participants;
```

### Azure Communication Services

All remote participants are represented by `RemoteParticipant` type and available through `remoteParticipants` collection on a call instance.

The `remoteParticipants` collection returns a list of remote participants in a call:
```javascript
call.remoteParticipants; // [remoteParticipant, remoteParticipant....]
```

**Add participant:**

To add a participant to a call, you can use `addParticipant`. Provide one of the Identifier types. It synchronously returns the `remoteParticipant` instance.

The `remoteParticipantsUpdated` event from Call is raised when a participant is successfully added to the call.
```javascript
const userIdentifier = { communicationUserId: '<Azure_Communication_Services_USER_ID>' }; 
const remoteParticipant = call.addParticipant(userIdentifier);
```

**Remove participant:**

To remove a participant from a call, use `removeParticipant`. You need to pass one of the Identifier types. This method resolves asynchronously after the participant is removed from the call. The participant is also removed from the `remoteParticipants` collection.
```javascript
const userIdentifier = { communicationUserId: '<Azure_Communication_Services_USER_ID>' }; 
await call.removeParticipant(userIdentifier);

```

Subscribe to the call's `remoteParticipantsUpdated` event to be notified when new participants are added to the call or removed from the call.

```javascript
call.on('remoteParticipantsUpdated', e => {
    e.added.forEach(remoteParticipant => {
        // Subscribe to new remote participants that are added to the call
    });
 
    e.removed.forEach(remoteParticipant => {
        // Unsubscribe from participants that are removed from the call
    })

});
```

Subscribe to remote participant's `stateChanged` event for value changes.
```javascript
remoteParticipant.on('stateChanged', () => {
    console.log(`Remote participants state changed: ${remoteParticipant.state}`)
});
```

## Video calling

## Starting and stopping video

### Twilio

```javascript
const videoTrack = await twilioVideo.createLocalVideoTrack({ constraints }); 
const videoTrackPublication = await localParticipant.publishTrack(videoTrack, { options });
```

The camera is enabled by default. It can be disabled and enabled back if necessary:
```javascript
videoTrack.disable();
```
Or:
```javascript
videoTrack.enable();
```

If there's a later created video track, attach it locally:

```javascript
const videoElement = videoTrack.attach();
const localVideoContainer = document.getElementById( localVideoContainerId );
localVideoContainer.appendChild(videoElement);
```

Twilio Tracks rely on default input devices and reflect the changes in defaults. To change an input device, you need to unpublish the previous Video Track:

```javascript
localParticipant.unpublishTrack(videoTrack);
```

Then create a new Video Track with the correct constraints.

### Azure Communication Services
To start a video while on a call, you need to enumerate cameras using the `getCameras` method on the `deviceManager` object. Then create a new instance of `LocalVideoStream` with the desired camera and pass the `LocalVideoStream` object into the `startVideo` method of an existing call object:

```javascript
const deviceManager = await callClient.getDeviceManager();
const cameras = await deviceManager.getCameras();
const camera = cameras[0]
const localVideoStream = new LocalVideoStream(camera);
await call.startVideo(localVideoStream);
```

After you successfully start sending video, a `LocalVideoStream` instance of type Video is added to the `localVideoStreams` collection on a call instance.
```javascript
const localVideoStream = call.localVideoStreams.find( (stream) =\> { return stream.mediaStreamType === 'Video'} );
```

To stop local video while on a call, pass the `localVideoStream` instance that's being used for video:
```javascript
await call.stopVideo(localVideoStream);
```

You can switch to a different camera device while a video is sending by calling `switchSource` on a `localVideoStream` instance:

```javascript
const cameras = await callClient.getDeviceManager().getCameras();
const camera = cameras[1];
localVideoStream.switchSource(camera);
```

If the specified video device is being used by another process, or if it's disabled in the system:

-   While in a call, if your video is off and you start video using `call.startVideo()`, this method returns a `SourceUnavailableError` and `cameraStartFailed` are set to true.
-   A call to the `localVideoStream.switchSource()` method causes `cameraStartFailed` to be set to true. See the [Call Diagnostics guide](../concepts/voice-video-calling/call-diagnostics.md) for more information about how to diagnose call-related issues.

To verify whether the local video is *on* or *off* you can use the `isLocalVideoStarted` API, which returns true or false:
```javascript
call.isLocalVideoStarted;
```

To listen for changes to the local video, you can subscribe and unsubscribe to the `isLocalVideoStartedChanged` event:

```javascript
// Subscribe to local video event
call.on('isLocalVideoStartedChanged', () => {
    // Callback();
});
// Unsubscribe from local video event
call.off('isLocalVideoStartedChanged', () => {
    // Callback();
});

```

### Rendering a remote user's video

#### Twilio

As soon as a Remote Participant publishes a Video Track, it needs to be attached. The `trackSubscribed` event on Room or Remote Participant enables you to detect when the track can be attached:

```javascript
twilioRoom.on('participantConnected', (participant) => {
 participant.on('trackSubscribed', (track) => {
   const remoteVideoElement = track.attach();
   const remoteVideoContainer = document.getElementById(remoteVideoContainerId + participant.identity);
   remoteVideoContainer.appendChild(remoteVideoElement);
 });
});
```

Or

```javascript
twilioRoom..on('trackSubscribed', (track, publication, participant) => {
   const remoteVideoElement = track.attach();
   const remoteVideoContainer = document.getElementById(remoteVideoContainerId + participant.identity);
   remoteVideoContainer.appendChild(remoteVideoElement);
 });
});
```

#### Azure Communication Services

To list the video streams and screen sharing streams of remote participants, inspect the `videoStreams` collections:
```javascript
const remoteVideoStream: RemoteVideoStream = call.remoteParticipants[0].videoStreams[0];
const streamType: MediaStreamType = remoteVideoStream.mediaStreamType;
```

To render `RemoteVideoStream`, you need to subscribe to its `isAvailableChanged` event. If the `isAvailable` property changes to true, a remote participant is sending a stream. After that happens, create a new instance of `VideoStreamRenderer`, and then create a new `VideoStreamRendererView` instance by using the asynchronous `createView` method. You can then attach `view.target` to any UI element.

Whenever availability of a remote stream changes, you can destroy the whole `VideoStreamRenderer` or a specific `VideoStreamRendererView`. If you do decide to keep them, it displays a blank video frame.

```javascript
// Reference to the html's div where we would display a grid of all remote video streams from all participants.
let remoteVideosGallery = document.getElementById('remoteVideosGallery');

subscribeToRemoteVideoStream = async (remoteVideoStream) => {
   let renderer = new VideoStreamRenderer(remoteVideoStream);
    let view;
    let remoteVideoContainer = document.createElement('div');
    remoteVideoContainer.className = 'remote-video-container';

    let loadingSpinner = document.createElement('div');
    // See the css example below for styling the loading spinner.
    loadingSpinner.className = 'loading-spinner';
    remoteVideoStream.on('isReceivingChanged', () => {
        try {
            if (remoteVideoStream.isAvailable) {
                const isReceiving = remoteVideoStream.isReceiving;
                const isLoadingSpinnerActive = remoteVideoContainer.contains(loadingSpinner);
                if (!isReceiving && !isLoadingSpinnerActive) {
                    remoteVideoContainer.appendChild(loadingSpinner);
                } else if (isReceiving && isLoadingSpinnerActive) {
                    remoteVideoContainer.removeChild(loadingSpinner);
                }
            }
        } catch (e) {
            console.error(e);
        }
    });

    const createView = async () => {
        // Create a renderer view for the remote video stream.
        view = await renderer.createView();
        // Attach the renderer view to the UI.
        remoteVideoContainer.appendChild(view.target);
        remoteVideosGallery.appendChild(remoteVideoContainer);
    }

    // Remote participant has switched video on/off
    remoteVideoStream.on('isAvailableChanged', async () => {
        try {
            if (remoteVideoStream.isAvailable) {
                await createView();
            } else {
                view.dispose();
                remoteVideosGallery.removeChild(remoteVideoContainer);
            }
        } catch (e) {
            console.error(e);
        }
    });

    // Remote participant has video on initially.
    if (remoteVideoStream.isAvailable) {
        try {
            await createView();
        } catch (e) {
            console.error(e);
        }
    }
    
    console.log(`Initial stream size: height: ${remoteVideoStream.size.height}, width: ${remoteVideoStream.size.width}`);
    remoteVideoStream.on('sizeChanged', () => {
        console.log(`Remote video stream size changed: new height: ${remoteVideoStream.size.height}, new width: ${remoteVideoStream.size.width}`);
    });
}
```

Subscribe to the remote participant's `videoStreamsUpdated` event to be notified when the remote participant adds new video streams and removes video streams.

```javascript
remoteParticipant.on('videoStreamsUpdated', e => {
    e.added.forEach(remoteVideoStream => {
        // Subscribe to new remote participant's video streams
    });

    e.removed.forEach(remoteVideoStream => {
        // Unsubscribe from remote participant's video streams
    });
});
```

### Virtual background

#### Twilio

To use Virtual Background, install Twilio helper library:
```console
npm install @twilio/video-processors
```

Create and load a new `Processor` instance:

```javascript
import { GaussianBlurBackgroundProcessor } from '@twilio/video-processors';

const blurProcessor = new GaussianBlurBackgroundProcessor({ assetsPath: virtualBackgroundAssets });

await blurProcessor.loadModel();
```

As soon as the model is loaded, you can add the background to the video track using the `addProcessor` method:
```javascript
videoTrack.addProcessor(processor, {  inputFrameBufferType: 'video',  outputFrameBufferContextType: 'webgl2' });
```

#### Azure Communication Services

Use the npm install command to install the [Azure Communication Services Effects SDK](../quickstarts/voice-video-calling/get-started-video-effects.md?pivots=platform-web) for JavaScript.
```console
npm install @azure/communication-calling-effects --save
```

> **Note:**
> To use video effects with the Azure Communication Calling SDK, once you've created a LocalVideoStream, you need to get the VideoEffects feature API of the LocalVideoStream to start/stop video effects:

```javascript
import * as AzureCommunicationCallingSDK from '@azure/communication-calling'; 

import { BackgroundBlurEffect, BackgroundReplacementEffect } from '@azure/communication-calling-effects'; 

// Get the video effects feature API on the LocalVideoStream 
// (here, localVideoStream is the LocalVideoStream object you created while setting up video calling)
const videoEffectsFeatureApi = localVideoStream.feature(AzureCommunicationCallingSDK.Features.VideoEffects); 

// Subscribe to useful events 
videoEffectsFeatureApi.on(‘effectsStarted’, () => { 
    // Effects started
});

videoEffectsFeatureApi.on(‘effectsStopped’, () => { 
    // Effects stopped
}); 

videoEffectsFeatureApi.on(‘effectsError’, (error) => { 
    // Effects error
});
```

To blur the background:

```javascript
// Create the effect instance 
const backgroundBlurEffect = new BackgroundBlurEffect(); 

// Recommended: Check support 
const backgroundBlurSupported = await backgroundBlurEffect.isSupported(); 

if (backgroundBlurSupported) { 
    // Use the video effects feature API we created to start effects
    await videoEffectsFeatureApi.startEffects(backgroundBlurEffect); 
}
```

To use a custom background replacement with an image you need to provide the URL of the image you want as the background to this effect. Supported image formats are: PNG, JPG, JPEG, TIFF, and BMP. The supported aspect ratio is 16:9.

```javascript
const backgroundImage = 'https://linkToImageFile'; 

// Create the effect instance 
const backgroundReplacementEffect = new BackgroundReplacementEffect({ 
    backgroundImageUrl: backgroundImage
}); 

// Recommended: Check support
const backgroundReplacementSupported = await backgroundReplacementEffect.isSupported(); 

if (backgroundReplacementSupported) { 
    // Use the video effects feature API as before to start/stop effects 
    await videoEffectsFeatureApi.startEffects(backgroundReplacementEffect); 
}
```

Change the image for this effect by passing it via the configured method:
```javascript
const newBackgroundImage = 'https://linkToNewImageFile'; 

await backgroundReplacementEffect.configure({ 
    backgroundImageUrl: newBackgroundImage
});
```

To switch effects, use the same method on the video effects feature API:

```javascript
// Switch to background blur 
await videoEffectsFeatureApi.startEffects(backgroundBlurEffect); 

// Switch to background replacement 
await videoEffectsFeatureApi.startEffects(backgroundReplacementEffect);
```

At any time, if you want to check which effects are active, use the `activeEffects` property. The `activeEffects` property returns an array with the names of the currently active effects and returns an empty array if there are no effects active.
```javascript
// Using the video effects feature api
const currentActiveEffects = videoEffectsFeatureApi.activeEffects;
```

To stop effects:
```javascript
await videoEffectsFeatureApi.stopEffects();
```


## Audio

### Starting and stopping audio

#### Twilio

```javascript
const audioTrack = await twilioVideo.createLocalAudioTrack({ constraints });
const audioTrackPublication = await localParticipant.publishTrack(audioTrack, { options });
```

The microphone is enabled by default. You can disable and enable it back as needed:
```javascript
audioTrack.disable();
```

Or
```javascript
audioTrack.enable();
```

Any created Audio Track should be attached by Local Participant the same way as Video Track:

```javascript
const audioElement = audioTrack.attach();
const localAudioContainer = document.getElementById(localAudioContainerId);
localAudioContainer.appendChild(audioElement);
```

And by Remote Participant:

```javascript
twilioRoom.on('participantConnected', (participant) => {
 participant.on('trackSubscribed', (track) => {
   const remoteAudioElement = track.attach();
   const remoteAudioContainer = document.getElementById(remoteAudioContainerId + participant.identity);
   remoteAudioContainer.appendChild(remoteAudioElement);
 });
});
```

Or:

```javascript
twilioRoom..on('trackSubscribed', (track, publication, participant) => {
   const remoteAudioElement = track.attach();
   const remoteAudioContainer = document.getElementById(remoteAudioContainerId + participant.identity);
   remoteVideoContainer.appendChild(remoteAudioElement);
 });
});

```

It isn't possible to mute incoming audio in Twilio Video SDK.

#### Azure Communication Services

```javascript
await call.startAudio();
```

To mute or unmute the local endpoint, you can use the mute and unmute asynchronous APIs:

```javascript
//mute local device (microphone / sent audio)
await call.mute();

//unmute local device (microphone / sent audio)
await call.unmute();
```

Mute incoming audio sets the call volume to 0. To mute or unmute the incoming audio, use the `muteIncomingAudio` and `unmuteIncomingAudio` asynchronous APIs:

```javascript
//mute local device (speaker)
await call.muteIncomingAudio();

//unmute local device (speaker)
await call.unmuteIncomingAudio();

```

### Detecting dominant speaker

#### Twilio

To detect the loudest Participant in the Room, use the Dominant Speaker API. You can enable it in the connection options when joining the Group Room with at least 2 participants:
```javascript
twilioRoom = await twilioVideo.connect('token', { 
name: 'roomName', 
audio: false, 
video: false,
dominantSpeaker: true
}); 
```

When the loudest speaker in the Room changes, the `dominantSpeakerChanged` event is emitted:

```javascript
twilioRoom.on('dominantSpeakerChanged', (participant) => {
    // Highlighting the loudest speaker
});
```

#### Azure Communication Services

Dominant speakers for a call are an extended feature of the core Call API. It enables you to obtain a list of the active speakers in the call. The list of dominant speakers is a ranked list, where the first element in the list represents the last active speaker on the call and so on.

In order to obtain the dominant speakers in a call, you first need to obtain the call dominant speakers feature API object:
```javascript
const callDominantSpeakersApi = call.feature(Features.CallDominantSpeakers);
```

Next you can obtain the list of the dominant speakers by calling `dominantSpeakers`. This has a type of `DominantSpeakersInfo`, which has the following members:

-   `speakersList` contains the list of the ranked dominant speakers in the call. These are represented by their participant ID.
-   `timestamp` is the latest update time for the dominant speakers in the call.
```javascript
let dominantSpeakers: DominantSpeakersInfo = callDominantSpeakersApi.dominantSpeakers;
```

You can also subscribe to the `dominantSpeakersChanged` event to know when the dominant speakers list changes.


```javascript
const dominantSpeakersChangedHandler = () => {
    // Get the most up-to-date list of dominant speakers
    let dominantSpeakers = callDominantSpeakersApi.dominantSpeakers;
};
callDominantSpeakersApi.on('dominantSpeakersChanged', dominantSpeakersChangedHandler);

```

## Enabling screen sharing
### Twilio

To share the screen in Twilio Video, obtain the source track via `navigator.mediaDevices`:

Chromium-based browsers:
```javascript
const stream = await navigator.mediaDevices.getDisplayMedia({
   audio: false,
   video: true
 });
const track = stream.getTracks()[0];
```

Firefox and Safari:
```javascript
const stream = await navigator.mediaDevices.getUserMedia({ mediaSource: 'screen' });
const track = stream.getTracks()[0];
```

Obtain the screen share track, then you can publish and manage it the same way as the casual Video Track (see the “Video” section).

### Azure Communication Services

To start screen sharing while on a call, you can use the asynchronous API `startScreenSharing`:
```javascript
await call.startScreenSharing();
```

After successfully starting to sending screen sharing, a `LocalVideoStream` instance of type `ScreenSharing` is created and added to the `localVideoStreams` collection on the call instance.

```javascript
const localVideoStream = call.localVideoStreams.find( (stream) => { return stream.mediaStreamType === 'ScreenSharing'} );
```

To stop screen sharing while on a call, you can use the asynchronous API `stopScreenSharing`:
```javascript
await call.stopScreenSharing();
```

To verify whether screen sharing is on or off, you can use `isScreenSharingOn` API, which returns true or false:
```javascript
call.isScreenSharingOn;
```

To listen for changes to the screen share, subscribe and unsubscribe to the `isScreenSharingOnChanged` event:

```javascript
// Subscribe to screen share event
call.on('isScreenSharingOnChanged', () => {
    // Callback();
});
// Unsubscribe from screen share event
call.off('isScreenSharingOnChanged', () => {
    // Callback();
});

```

## Media quality statistics

### Twilio

To collect real-time media stats, use the `getStats`` method.
```javascript
const stats = twilioRoom.getStats();
```

### Azure Communication Services

Media quality statistics is an extended feature of the core Call API. You first need to obtain the `mediaStatsFeature` API object:

```javascript
const mediaStatsFeature = call.feature(Features.MediaStats);
```


To receive the media statistics data, you can subscribe `sampleReported` event or `summaryReported` event:

- `sampleReported` event triggers every second. Suitable as a data source for UI display or your own data pipeline.
- `summaryReported` event contains the aggregated values of the data over intervals. Useful when you just need a summary.

If you want control over the interval of the `summaryReported` event, you need to define `mediaStatsCollectorOptions` of type `MediaStatsCollectorOptions`. Otherwise, the SDK uses default values.
```javascript
const mediaStatsCollectorOptions: SDK.MediaStatsCollectorOptions = {
    aggregationInterval: 10,
    dataPointsPerAggregation: 6
};

const mediaStatsCollector = mediaStatsFeature.createCollector(mediaStatsSubscriptionOptions);

mediaStatsCollector.on('sampleReported', (sample) => {
    console.log('media stats sample', sample);
});

mediaStatsCollector.on('summaryReported', (summary) => {
    console.log('media stats summary', summary);
});
```

If you don't need to use the media statistics collector, you can call the dispose method of `mediaStatsCollector`.

```javascript
mediaStatsCollector.dispose();
```


You don't need to call the dispose method of `mediaStatsCollector` every time a call ends. The collectors are reclaimed internally when the call ends.

For more information, see [Media quality statistics](../concepts/voice-video-calling/media-quality-sdk.md?pivots=platform-web).

## Diagnostics

### Twilio

To test connectivity, Twilio offers Preflight API. This is a test call performed to identify signaling and media connectivity issues.

An access token is required to launch the test:

```javascript
const preflightTest = twilioVideo.runPreflight(token);

// Emits when particular call step completes
preflightTest.on('progress', (progress) => {
  console.log(`Preflight progress: ${progress}`);
});

// Emits if the test has failed and returns error and partial test results
preflightTest.on('failed', (error, report) => {
  console.error(`Preflight error: ${error}`);
  console.log(`Partial preflight test report: ${report}`);
});

// Emits when the test has been completed successfully and returns the report
preflightTest.on('completed', (report) => {
  console.log(`Preflight test report: ${report}`);
});
```

Another way to identify network issues during the call is by using the Network Quality API, which monitors a Participant's network and provides quality metrics. You can enable it in the connection options when a participant joins the Group Room:

```javascript
twilioRoom = await twilioVideo.connect('token', { 
    name: 'roomName', 
    audio: false, 
    video: false,
    networkQuality: {
        local: 3, // Local Participant's Network Quality verbosity
        remote: 1 // Remote Participants' Network Quality verbosity
    }
});
```

When the network quality for Participant changes, it generates a `networkQualityLevelChanged` event:
```javascript
participant.on(networkQualityLevelChanged, (networkQualityLevel, networkQualityStats)  => {
    // Processing Network Quality stats
});
```

### Azure Communication Services
Azure Communication Services provides a feature called `"User Facing Diagnostics" (UFD)` that you can use to examine various properties of a call to identify the issue. User Facing Diagnostics events could be caused by some underlying issue (poor network, the user has their microphone muted) that could cause a user to have a poor call experience.

User-facing diagnostics is an extended feature of the core Call API and enables you to diagnose an active call.
```javascript
const userFacingDiagnostics = call.feature(Features.UserFacingDiagnostics);
```

Subscribe to the `diagnosticChanged`` event to monitor when any user-facing diagnostic changes:
```javascript
/**
 *  Each diagnostic has the following data:
 * - diagnostic is the type of diagnostic, e.g. NetworkSendQuality, DeviceSpeakWhileMuted
 * - value is DiagnosticQuality or DiagnosticFlag:
 *     - DiagnosticQuality = enum { Good = 1, Poor = 2, Bad = 3 }.
 *     - DiagnosticFlag = true | false.
 * - valueType = 'DiagnosticQuality' | 'DiagnosticFlag'
 */
const diagnosticChangedListener = (diagnosticInfo: NetworkDiagnosticChangedEventArgs | MediaDiagnosticChangedEventArgs) => {
    console.log(`Diagnostic changed: ` +
        `Diagnostic: ${diagnosticInfo.diagnostic}` +
        `Value: ${diagnosticInfo.value}` +
        `Value type: ${diagnosticInfo.valueType}`);

    if (diagnosticInfo.valueType === 'DiagnosticQuality') {
        if (diagnosticInfo.value === DiagnosticQuality.Bad) {
            console.error(`${diagnosticInfo.diagnostic} is bad quality`);

        } else if (diagnosticInfo.value === DiagnosticQuality.Poor) {
            console.error(`${diagnosticInfo.diagnostic} is poor quality`);
        }

    } else if (diagnosticInfo.valueType === 'DiagnosticFlag') {
        if (diagnosticInfo.value === true) {
            console.error(`${diagnosticInfo.diagnostic}`);
        }
    }
};

userFacingDiagnostics.network.on('diagnosticChanged', diagnosticChangedListener);
userFacingDiagnostics.media.on('diagnosticChanged', diagnosticChangedListener);
```

To learn more about User Facing Diagnostics and the different diagnostic values available, see [User Facing Diagnostics](../concepts/voice-video-calling/user-facing-diagnostics.md?pivots=platform-web).

Azure Communication Services also provides a precall diagnostics API. To Access the Pre-Call API, you need to initialize a `callClient`, and provision an Azure Communication Services access token. Then you can access the `PreCallDiagnostics` feature and the `startTest` method.

```javascript
import { CallClient, Features} from "@azure/communication-calling";
import { AzureCommunicationTokenCredential } from '@azure/communication-common';

const callClient = new CallClient(); 
const tokenCredential = new AzureCommunicationTokenCredential("INSERT ACCESS TOKEN");
const preCallDiagnosticsResult = await callClient.feature(Features.PreCallDiagnostics).startTest(tokenCredential);
```

The Pre-Call API returns a full diagnostic of the device including details like device permissions, availability and compatibility, call quality stats and in-call diagnostics. The results are returned as a `PreCallDiagnosticsResult` object.

```javascript
export declare type PreCallDiagnosticsResult  = {
    deviceAccess: Promise<DeviceAccess>;
    deviceEnumeration: Promise<DeviceEnumeration>;
    inCallDiagnostics: Promise<InCallDiagnostics>;
    browserSupport?: Promise<DeviceCompatibility>;
    id: string;
    callMediaStatistics?: Promise<MediaStatsCallFeature>;
};
```

You can learn more about ensuring precall readiness in [Pre-Call diagnostics](../concepts/voice-video-calling/pre-call-diagnostics.md).

## Event listeners

### Twilio

```javascript
twilioRoom.on('participantConnected', (participant) => { 
// Participant connected 
}); 

twilioRoom.on('participantDisconnected', (participant) => { 
// Participant Disconnected 
});

```

### Azure Communication Services

Each object in the JavaScript Calling SDK has properties and collections. Their values change throughout the lifetime of the object. Use the `on()` method to subscribe to objects' events, and use the `off()` method to unsubscribe from objects' events.

**Properties**

-   You must inspect their initial values, and subscribe to the `'\<property\>Changed'` event for future value updates.

**Collections**

-   You must inspect their initial values, and subscribe to the `'\<collection\>Updated'` event for future value updates.
-   The `'\<collection\>Updated'` event's payload, has an `added` array that contains values that were added to the collection.
-   The `'\<collection\>Updated'` event's payload also has a removed array that contains values that were removed from the collection.

## Leaving and ending sessions

### Twilio
```javascript
twilioVideo.disconnect();
```


### Azure Communication Services
```javascript
call.hangUp();

// Set the 'forEveryone' property to true to end call for all participants
call.hangUp({ forEveryone: true });

```

## Cleaning Up

If you want to [clean up and remove a Communication Services subscription](../quickstarts/create-communication-resource.md?tabs=windows\&pivots=platform-azp#clean-up-resources), you can delete the resource or resource group.



**Applies to: platform-ios**


## Prerequisites

1. **Azure Account:** Make sure that your Azure account is active. New users can create a free account at [Microsoft Azure](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
2. **Communication Services Resource:** Set up a [Communication Services Resource](../quickstarts/create-communication-resource.md?tabs=windows\&pivots=platform-azp) via your Azure portal and note your connection string.
3. **Azure CLI:** Follow the instructions to [Install Azure CLI on Windows](https://learn.microsoft.com/cli/azure/install-azure-cli-windows?tabs=azure-cli).
4. **User Access Token:** Generate a user access token to instantiate the call client. You can create one using the Azure CLI as follows:

```console
az communication identity token issue --scope voip --connection-string "yourConnectionString"
```

For more information, see [Use Azure CLI to Create and Manage Access Tokens](../quickstarts/identity/access-tokens.md?pivots=platform-azcli).

For Video Calling as a Teams user:

- You can also use Teams identity. To generate an access token for a Teams User, see [Manage teams identity](../quickstarts/manage-teams-identity.md?pivots=programming-language-javascript).
- Obtain the Teams thread ID for call operations using the [Graph Explorer](https://developer.microsoft.com/graph/graph-explorer). For information about creating a thread ID, see [Create chat - Microsoft Graph v1.0 > Example2: Create a group chat](https://learn.microsoft.com/graph/api/chat-post?preserve-view=true\&tabs=javascript\&view=graph-rest-1.0#example-2-create-a-group-chat).

## UI Library

The Azure Communication Services UI library, simplifies the process of creating modern communication user interfaces using Azure Communication Services Calling. It offers a collection of ready-to-use UI components that you can easily integrate into your application.

This open source prebuilt set of controls enables you to create aesthetically pleasing designs using Fluent UI SDK components and develop high quality audio/video communication experiences. For more information, check out the Azure Communications Services [UI Library overview](../concepts/ui-library/ui-library-overview.md?pivots=platform-mobile). The overview includes comprehensive information about both web and mobile platforms.

## Installation

To start the migration from Twilio Video, the first step is to install the Azure Communication Services Calling SDK for iOS to your project. You can configure these parameters using`CocoaPods`.

1. To create a Podfile for your application, open the terminal and navigate to the project folder and run:

 `pod init`

2. Add the following code to the Podfile and save (make sure that "target" matches the name of your project):

```
platform :ios, '13.0' 
use_frameworks! 
  
target 'AzureCommunicationCallingSample' do 
  pod 'AzureCommunicationCalling', '~> 2.6.0' 
end 
```

3. Set up the `.xcworkspace` project

```shell
pod install
```

4. Open the `.xcworkspace` that was created by the pod install with Xcode.

## Authenticating to the SDK

To be able to use the Azure Communication Services Calling SDK, you need to authenticate using an access token.

### Twilio

The following code snippets presume the availability of a valid access token for Twilio Services.

From within the Twilio Video, the access token is used to connect to a room. By passing the token to `ConnectOptions`, you can create the option to create or connect a room.

```swift
let connectOptions = ConnectOptions(token: accessToken) { 
 // Twilio Connect options goes here 
} 
 
let room =   TwilioVideoSDK.connect(
    options: connectOptions, 
    delegate: // The Room Delegate
)
```

### Azure Communication Services

The following code snippets require a valid access token to initiate a `CallClient`.

You need a valid token. For more information, see [Create and Manage Access Tokens](../quickstarts/identity/access-tokens.md).

```swift
// Create an instance of CallClient 
let callClient = CallClient() 
 
// A reference to the call agent, it will be initialized later 
var callAgent: CallAgent? 
 
// Embed the token in a CommunicationTokenCredential object 
let userCredential = try? CommunicationTokenCredential(token: "<USER_TOKEN>") 
 
// Create a CallAgent that will be used later to initiate or receive calls 
callClient.createCallAgent(userCredential: userCredential) { callAgent, error in 
 if error != nil { 
        // Raise the error to the user and return 
 } 
 self.callAgent = callAgent         
} 
```
### Class reference

| Class Name | Description |
| --- | --- |
| [CallClient](https://learn.microsoft.com/objectivec/communication-services/calling/acscallclient) | The main class representing the entry point for the Calling SDK. |
| [CommunicationTokenCredential](https://azure.github.io/azure-sdk-for-ios/AzureCommunicationCommon/Classes/CommunicationTokenCredential.html) | The Azure Communication Services User token credential |
| [CallAgent](https://learn.microsoft.com/objectivec/communication-services/calling/acscallagent) | The class responsible of managing calls on behalf of the authenticated user |

## Initiating an outgoing call

### Twilio

Twilio Video has a concept of `Room`, where if user Bob wants to have a call with client Alice, Bob can create a room and Alice has to connect to it by implementing a feature like push notification.

#### Connect to a room

When user Bob or user Alice wants to create or connect to a room, and they have a valid access token. They can pass the room name they want to create or connect to as a parameter of `ConnectOptions`.

```swift
let connectOptions = ConnectOptions(token: accessToken) { builder in 
 builder.roomName = "the-room"  
} 
 
room = TwilioVideoSDK.connect(options: connectOptions, delegate: self)
```

### Azure Communication Services

#### Connect to a call

The `CommunicationUserIdentifier` represents a user identity that was created using the [Identity SDK or REST API](../quickstarts/identity/access-tokens.md). It's the only identifier used if your application doesn't use Microsoft Teams interoperability or Telephony features.

Initiating a call with the Azure Communication Service Calling SDK consists of the following steps:

1. Creating a `StartCallOptions` object
2. Creating an Array of `CommunicationUserIdentifier`
3. Calling `startCall` method on the previously created `CallAgent`

```swift
let startCallOptions = StartCallOptions() // 1 
let callees = [CommunicationUserIdentifier(“<USER_ID>”)] // 2 
 
callAgent?.startCall(participants: callees, options: startCallOptions) { call, error in 
    // Check for error if no Error and the call object isn't nil then the call is being established       
}

```

#### Connect to a Team's call

##### With External Identity

Connecting to a team call is almost the same as connecting to a call. Instead of using `StartCallOptions`, the client application needs to use `JoinCallOptions` together with a `TeamsMeeting locator`.

The Teams meeting link can be retrieved using Graph APIs. You can read more about Graph APIs in the  [Graph documentation](https://learn.microsoft.com/graph/api/onlinemeeting-createorget?tabs=http\&view=graph-rest-beta\&preserve-view=true).

```swift
let joinCallOptions = JoinCallOptions()
let teamsMeetingLinkLocator = TeamsMeetingLinkLocator(meetingLink: meetingLink)
    callAgent?.join(with: teamsMeetingLinkLocator, joinCallOptions: joinCallOptions) { call, error in
    // Handle error or set a CallDelegate delegate on the call if no error
}

```

## Accepting and joining a call

### Twilio

Twilio Video uses the concept of a `Room`. Different clients can establish communication by joining the same room. So accept and join a call is not straight alternative.

### Azure Communication Services

#### Receiving incoming call

To accept calls, the application must first be configured to receive incoming calls.

#### Register for push notifications and handling incoming push notification

A calling client can select to receive push notifications to receive incoming calls. This [guide](https://learn.microsoft.com/azure/communication-services/how-tos/calling-sdk/push-notifications?pivots=platform-ios#set-up-push-notifications) describes how to set up APNS for the Azure Communication Services Calling.

#### Setting up the `CallAgentDelegate`

The Azure Communication Services Calling SDK has a `CallAgentDelegate` that has a method that is called during an incoming call.

```swift
class ApplicationCallAgentDelegate: NSObject, CallAgentDelegate { 
 
    func callAgent(_ callAgent: CallAgent, didUpdateCalls args: CallsUpdatedEventArgs) {} 
 
    func callAgent(_ callAgent: CallAgent, didReceiveIncomingCall incomingCall: IncomingCall) { 
        // This is called when the application receives an incoming call 
        // An application could use this callback to  display an incoming call banner 
        // or report an incoming call to CallKit 
    } 
} 

```

In order to receive incoming calls, the application needs to add a `CallAgentDelegate` to its `CallAgent`.

```swift
let callAgentDelegate = ApplicationCallAgentDelegate() 
callClient.createCallAgent(userCredential: userCredential) { callAgent, error in 
    if error != nil { 
        // Raise the error to the user and return 
    } 
    self.callAgent = callAgent 
    self.callAgent?.delegate = callAgentDelegate 
} 
```

With the `CallAgentDelegate` in place, and associated with a `CallAgent` instance, the application should be able to receive incoming calls.

#### Accept an incoming call

```swift
func acceptCall(incomingCall: IncomingCall) { 
    let options = AcceptCallOptions() 
    incomingCall.accept(options: options) {(call, error) in 
        if error != nil { 
            // Raise the error to the user and return 
        } 
      // The call is established clients can speak/view each other 
    }
} 
```

#### Class reference

| Class Name | Description |
| --- | --- |
| [CallAgentDelegate](https://learn.microsoft.com/objectivec/communication-services/calling/acscallagentdelegate) | Defines a set of methods that are called by `ACSCallAgent` in response to important events. |
| [IncomingCall](https://learn.microsoft.com/objectivec/communication-services/calling/acsincomingcall) | Describes an incoming call |

## Video Stream

### Starting and stopping video

#### Twilio

##### Accessing the camera

With Twilio Video, adding video to a call consists of two steps:

1. Accessing the camera
2. Adding the video track to the list of `LocalVideoTrack`

```swift
let options = CameraSourceOptions { (builder) in
    // Set the CameraSource options here
}
camera = CameraSource(options: options, delegate: aCameraDelegate)
```

##### Creating the LocalVideoTrack

Once the CameraSource is created, it can be associated to a `LocalVideoTrack`.

```swift
localVideoTrack = LocalVideoTrack(source: camera!, enabled: true, name: "Camera")
```

##### Adding the LocalVideoTrack to the call

**At connect time** . When a call connects, you can add the local video track to the call can be achieved by passing the local video track to the `localVideo` track list that can be set with ConnectOptions``.

```swift
let connectOptions = ConnectOptions(token: accessToken) { builder in
     builder.videoTracks =  [localVideoTrack!]
}
```

**In an existing room**. The local participant can publish a local video track via the `publishVideoTrack(_ : LocalVideoTrack)` method.

```swift
room.localParticipant.publishVideoTrack(localVideoTrack)
```

#### Azure Communication Services

##### Accessing the camera

Accessing the camera is done through the `DeviceManager`. Grabbing an instance of the `DeviceManager` can be done with the following code.

```swift
self.callClient.getDeviceManager { (deviceManager, error) in
    if (error != nil) {
       // Display an error message to the user and exit the closure 
       return
    }
    self.deviceManager = deviceManager                 
}
```

##### Creating the `LocalVideoStream`

The `deviceManager` provides access to cameras that can be used to create a `LocalVideoStream` instance.

```swift
LocalVideoStream(camera: deviceManager.cameras.first!)
```

##### Adding the `LocalVideoStream`

**At connect time**

The `localVideoStream` can be added to the streams via the `OutgoingVideoOptions` of the `StartCallOptions`.

```swift
var callOptions = StartCallOptions()
let outgoingVideoOptions = OutgoingVideoOptions()
outgoingVideoOptions.streams = [localVideoStream]
```

**In a call**

A video stream can be started by calling the startVideo method that takes a LocalVideoStream as a parameter.

```swift
call.startVideo(stream: localVideoStream) { error in
    if error != ni {
     // Report the error to the user and return 
    }
}
```

#### Class reference

| Class Name | Description |
| --- | --- |
| [DeviceManager](https://learn.microsoft.com/objectivec/communication-services/calling/acsdevicemanager#declaration) | Facilitates the interaction with the device |
| [LocalVideoStream](https://learn.microsoft.com/objectivec/communication-services/calling/acslocalvideostream) | Local video stream information |
| [VideoDeviceInfo](https://learn.microsoft.com/objectivec/communication-services/calling/acsvideodeviceinfo) | Information about a video device |
| [Call](https://learn.microsoft.com/objectivec/communication-services/calling/acscall) | Describes a call |

## Rendering video

### Twilio

To render video using Twilio Video, an object conforming to the `VideoRenderer` protocol can be added to `VideoTrack`. The SDK provides a ready to use `VideoRenderer` called `VideoView`, which is a subclass of `UIView`.

```swift
let videoView = VideoView(frame: CGRect.zero, delegate: nil)
```

Once an instance of `VideoView` is created, a `VideoTrack` (local or remote) has a method `addVideoRenderer` that can be used to add the `videoView` created as a renderer.

```swift
localVideoTrack = LocalVideoTrack(source: camera, enabled: true, name: "Camera")
// Add renderer to video track for local preview
localVideoTrack!.addRenderer(videoView)
```

### Azure Communication Services

To render video with Azure Communication Services Calling, create a `VideoStreamRenderer` and pass a `LocalVideoStream` or a `RemoteVideoStream` as parameter.

```swift
 let previewRenderer = try VideoStreamRenderer(localVideoStream: localVideoStream)
```

`VideoStreamRenderer` created can be used to create a `VideoStreamRendererView`, which renders the video stream passed to the `VideoStreamRenderer`.

```swift
let scalingMode = ScalingMode.fit
let options = CreateViewOptions(scalingMode:scalingMode)
let previewView = try previewRenderer.createView(withOptions:options)
```

#### Class reference

| Class Name | Description |
| --- | --- |
| [ScalingMode](https://learn.microsoft.com/objectivec/communication-services/calling/acsscalingmode) | Enum for local and remote video scaling mode |
| [CreateViewOptions](https://learn.microsoft.com/objectivec/communication-services/calling/acscreateviewoptions) | Options to be passed when rendering a Video |
| [VideoStreamRenderer](https://learn.microsoft.com/objectivec/communication-services/calling/acsvideostreamrenderer) | Renderer for video rendering |
| OutgoingVideoOptions | Documentation isn't available yet |
| [VideoStreamRendererView](https://learn.microsoft.com/objectivec/communication-services/calling/acsvideostreamrendererview) | View used to render video |

## Audio Stream

### Toggling the microphone

#### Twilio

Muting and unmuting of the microphone is done through the `LocalAudioTrack` associated with the microphone.

Muting the microphone

```swift
self.localAudioTrack.isEnabled =  false
```

Unmuting the microphone

```swift
self.localAudioTrack.isEnabled =  true
```

#### Azure Communication Services

Muting and unmuting can be done by calling the `muteOutgoingAudio` and `unmuteoutgoingAudio` on the `Call` object.

Muting the microphone

```swift
'call': call.muteOutgoingAudio() { error in
    if error == nil {
        isMuted = true
    } else {
       // Display an error to the user
    }
}
```

Unmuting the microphone

```swift
callBase.unmuteOutgoingAudio() { error in
    if error == nil {
        isMuted = true
    } else {
       // Display an error to the user
    }
}
```

## Event Listeners

Twilio Video and Azure Communication Services Calling SDKs propose various delegates to listen to call events.

### Room / Call Events

#### Twilio

The `RoomDelegate` allows clients to listen to events related to the room. It has methods that can be called for the following events:

- The client has connected or fails to connect to a room
- The client is reconnecting to the room or has reconnected
- A remote participant as connected, disconnected, reconnected to the room
- The room recording has started or stopped
- The dominant speaker changes

#### Azure Communication Services

The Azure Communication Services Calling SDK enable the `Call` object to incorporate various event listeners, notifying them when a call property changes. Each event type should be subscribed to individually. To learn more about event handling, see the [events tutorial.](../how-tos/calling-sdk/events.md)

- The call state changed. This is where the connection event is reported
- The list of remote participants has been updated
- The local video stream has been updated
- The mute state changed

### Local Participant Events

#### Twilio

Twilio has a `LocalParticpant` delegate that allows client to receive updates about the following events:

- The local participant has published or failed to be published a media track (audio, video, data)
- The network quality level for the local participant changed

### Azure Communication Services

Azure Communication Services Calling SDK has a `CallAgent` delegate that allows clients to listen to the call agent related event. It's notified when:

- When calls are updated or created, if there's an incoming call or when an existing call is disconnected
- When an incoming call is received

### Remote Participant Events

Both SDKs, propose a remote participant delegate that allows clients to be notified about what is happening with each remote participant.

#### Twilio

The `RemoteParticipantDelegate` handles the following events.

- The remote participant has published or unpublished a media track (video, audio, data)
- The local participant has subscribed, failed to subscribe or unsubscribed to a remote media track (video, audio, data)
- The remote participant network quality changed
- The remote participant changed the priority of a track publication
- The remote participant has switch on/off its video track

#### Azure Communication Services

The `RemoteParticipantDelegate` handles the following events.

- The remote participant state changed
- The remote participant is muted or not muted
- The remote participant is speaking
- The remote participant display name changed
- The remote participant added or removed a video stream

### Camera Events

#### Twilio

Twilio proposes a `CameraSourceDelegate` to notify client about the following events related to the camera:

- The camera source has been interrupted or has been resumed (when you put the app in background for example)
- The camera source failed
- The camera source is reporting system pressure

### Azure Communication Services

Azure Communication Services Calling proposes a `DeviceManagerDelegate`. It consists of a single method that will notify clients when video devices are added or removed on the current `DeviceManager`.

### Class reference

| Class Name | Description |
| --- | --- |
| [CallDelegate](https://learn.microsoft.com/objectivec/communication-services/calling/acscalldelegate) | A set of methods that are called by calling SDK in response to important events. |
| [CallAgentDelegate](https://learn.microsoft.com/objectivec/communication-services/calling/acscallagentdelegate) | A set of methods that are called by `ACSCallAgent` in response to important events. |
| [RemoteParticipantDelegate](https://learn.microsoft.com/objectivec/communication-services/calling/acsremoteparticipantdelegate) | A set of methods that are called by `ACSRemoteParticipant` in response to important events. |
| [DeviceManagerDelegate](https://learn.microsoft.com/objectivec/communication-services/calling/acsdevicemanagerdelegate) | A set of methods that are called by `ACSDeviceManager` in response to important events. |

## Ending a Call

### Twilio

Ending a call (disconnecting from a room)  is done via the `room.disconnect()` method.

### Azure Communication Services

Hanging up a call is done through the `hangUp` method of the `Call` object.

```swift
call.hangUp(options: HangUpOptions()) { error in
            if error != nil {
                print("ERROR: It was not possible to hang up the call.")
            }
            self.call = nil
 }

```

### Class reference

| Class Name | Description |
| --- | --- |
| [Call](https://learn.microsoft.com/objectivec/communication-services/calling/acscall) | A set of methods that are called by `ACSCall` in response to important events. |
| [HangUp Options](https://learn.microsoft.com/objectivec/communication-services/calling/acscallagentdelegate) | A Property bag class for hanging up a call |

## More features from the Azure Communication Services Calling

### Dominant speaker

The first step to register for dominant speaker update is to grab an instance of the dominant speaker feature from the `Call` object.  Learn more about the dominant speaker configuration in [the tutorial.](../how-tos/calling-sdk/dominant-speaker.md)

```swift
let dominantSpeakersFeature = call.feature(Features.dominantSpeakers)
```

Once an instance of the dominant speakers feature is obtained, a `DominantSpeakersCallFeatureDelegate` can be attached to it.

```swift
dominantSpeakersFeature.delegate = DominantSpeakersDelegate()
public class DominantSpeakersDelegate : DominantSpeakersCallFeatureDelegate {
    public func dominantSpeakersCallFeature(_ dominantSpeakersCallFeature: DominantSpeakersCallFeature, didChangeDominantSpeakers args: PropertyChangedEventArgs) {
        // When the list changes, get the timestamp of the last change and the current list of Dominant Speakers
        let dominantSpeakersInfo = dominantSpeakersCallFeature.dominantSpeakersInfo
        let timestamp = dominantSpeakersInfo.lastUpdatedAt
        let dominantSpeakersList = dominantSpeakersInfo.speakers
    }
}
```

### Media Quality Statistics

To help you understand media quality during the call, Azure Communication Services SDK provides media quality statistics. Use it to examine the low-level audio, video, and screen-sharing quality metrics for incoming and outgoing call metrics.For more information, see the [Media quality statistics](../concepts/voice-video-calling/media-quality-sdk.md) guide.

### User Facing Diagnostics

Azure Communication Services Calling SDK offers a feature known as **User Facing Diagnostics (UFD)**, allowing clients to scrutinize diverse properties of a call to identify potential issues. To learn more about User Facing Diagnostics, see the [User Facing Diagnostics.](../concepts/voice-video-calling/user-facing-diagnostics.md)

> **Important:**
> Some features of the Azure Communication Services Calling SDK described in the list don’t have an equivalent in the Twilio Video SDK.

### Raise Hand

[Raise Hand](../how-tos/calling-sdk/raise-hand.md?pivots=platform-ios) feature allows participants of a call  raise or lower hands.

### Video Background

Adding [Video Background](../quickstarts/voice-video-calling/get-started-video-effects.md?pivots=platform-ios) Allow users blur the background in the video stream.

### Video spotlights

[Spotlights](../how-tos/calling-sdk/spotlight.md?pivots=platform-ios) Allow users pin and unpin videos.



**Applies to: platform-android**


## Prerequisites

1. **Azure Account:** Make sure that your Azure account is active. New users can create a free account at [Microsoft Azure](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
2. **Communication Services Resource:** Set up a [Communication Services Resource](../quickstarts/create-communication-resource.md?tabs=windows\&pivots=platform-azp) via your Azure portal and note your connection string.
3. **Azure CLI:** Follow the instructions to [Install Azure CLI on Windows](https://learn.microsoft.com/cli/azure/install-azure-cli-windows?tabs=azure-cli).
4. **User Access Token:** Generate a user access token to instantiate the call client. You can create one using the Azure CLI as follows:

```console
az communication identity token issue --scope voip --connection-string "yourConnectionString"
```

For more information, see [Use Azure CLI to Create and Manage Access Tokens](../quickstarts/identity/access-tokens.md?pivots=platform-azcli).

For Video Calling as a Teams user:

- You can also use Teams identity. To generate an access token for a Teams User, see [Manage teams identity](../quickstarts/manage-teams-identity.md?pivots=programming-language-javascript).
- Obtain the Teams thread ID for call operations using the [Graph Explorer](https://developer.microsoft.com/graph/graph-explorer). For information about creating a thread ID, see [Create chat - Microsoft Graph v1.0 > Example2: Create a group chat](https://learn.microsoft.com/graph/api/chat-post?preserve-view=true\&tabs=javascript\&view=graph-rest-1.0#example-2-create-a-group-chat).

## UI Library

The Azure Communication Services UI library simplifies the process of creating modern communication user interfaces using Azure Communication Services Calling. It offers a collection of ready-to-use UI components that you can easily integrate into your application.


This open source prebuilt set of controls enables you to create aesthetically pleasing designs using Fluent UI SDK components and develop high quality audio/video communication experiences. For more information, check out the Azure Communications Services [UI Library overview](../concepts/ui-library/ui-library-overview.md?pivots=platform-mobile). The overview includes comprehensive information about both web and mobile platforms.

## Installation

To start the migration from Twilio Video, the first step is to install the Azure Communication Services Calling SDK for Android to your project. The Azure Communication Services Calling SDK can be integrated as a `gradle` dependency.

1. Add the azure-communication-calling package

```groovy
dependencies {
     ...
    implementation "com.azure.android:azure-communication-calling:<version>"
}
```

2. Check permissions in application manifest

Ensure that your application's manifest file contains the necessary permissions, and make the required adjustments.

```xml
<manifest >
   <uses-feature android:name="android.hardware.camera" /> 
   <uses-permission android:name="android.permission.INTERNET" />
   <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
   <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
   <uses-permission android:name="android.permission.RECORD_AUDIO" />
</manifest>
```

## Authenticating to the SDK

To be able to use the Azure Communication Services Calling SDK, you need to authenticate using an access token.

### Twilio

The following code snippets presume the availability of a valid access token for Twilio Services.

From within the Twilio Video, the access token is used to connect to a room. By passing the token to `ConnectOptions`, you can create the option to create or connect a room.

# [Java](#tab/java)

```java
ConnectOptions connectOptions = new ConnectOptions.Builder(accessToken).build();
room = Video.connect(context, connectOptions, roomListener);
```

# [Kotlin](#tab/kotlin)

```kotlin
val connectOptions = ConnectOptions.Builder(accessToken).build()
room = Video.connect(context, connectOptions, roomListener)
```
---

### Azure Communication Services

The following code snippets require a valid access token to initiate a `CallClient`.

You need a valid token. For more information, see [Create and Manage Access Tokens](../quickstarts/identity/access-tokens.md).

# [Java](#tab/java)

```java
String userToken = "<USER_TOKEN>";
CommunicationTokenCredential tokenCredential = new CommunicationTokenCredential(accessToken);

CallClient callClient = new CallClient();
callAgent = callClient.createCallAgent(getApplicationContext(), tokenCredential).get();
```

# [Kotlin](#tab/kotlin)
```kotlin
val userToken = "<USER_TOKEN>"
val communicationCredential = CommunicationTokenCredential(accessToken)
val callAgent: CallAgent = CallClient().createCallAgent(
     applicationContext,
     communicationCredential,
     CallAgentOptions()
).get()
```
---

### Class reference

| Class Name | Description |
| --- | --- |
| [CallClient](https://learn.microsoft.com/java/api/com.azure.android.communication.calling.callclient) | The class serving as the entry point for the Calling SDK. |
| [CommunicationTokenCredential](https://learn.microsoft.com/java/api/com.azure.android.communication.calling) | The Azure Communication Services User token credential |
| [CallAgent](https://learn.microsoft.com/java/api/com.azure.android.communication.calling.callagent) | The class responsible for managing calls on behalf of the authenticated user |

## Initiating an outgoing call

### Twilio

Twilio Video has a concept of `Room`, where if user Bob wants to have a call with client Alice, Bob can create a room and Alice has to connect to it by implementing a feature like push notification.

When user Bob or user Alice wants to create or connect to a room, and they have a valid access token. They can pass the room name they want to create or connect to as a parameter of `ConnectOptions`.

# [Java](#tab/java)
```java
ConnectOptions connectOptions = new ConnectOptions.Builder(accessToken)
    .roomName(roomName)
    .build()
room = Video.connect(context, connectOptions, roomListener);
```

# [Kotlin](#tab/kotlin)

```kotlin
    val connectOptions: ConnectOptions = ConnectOptions.Builder(accessToken)
        .roomName(roomName)
        .build()
    val room = Video.connect(context, connectOptions, roomListener)
```
---

### Azure Communication Services

#### Connect to a call

Initiating a call with the Azure Communication Service Calling SDK consists of the following steps:

The `CommunicationUserIdentifier` represents a user identity that was created using the [Identity SDK or REST API](../quickstarts/identity/access-tokens.md). It's the only identifier used if your application doesn't use Microsoft Teams interoperability or Telephony features.

1. Creating an Array of `CommunicationUserIdentifier`
2. Calling `startCall` method on the previously created `CallAgent`

# [Java](#tab/java)
```java
ArrayList<CommunicationIdentifier> userCallee = new ArrayList<>();
participants.add(new CommunicationUserIdentifier(“<USER_ID>”));

Call call = callAgent.startCall(context, userCallee);
```

# [Kotlin](#tab/kotlin)
```kotlin
val call: Call = callAgent.startCall(
     applicationContext,
     listOf(CommunicationUserIdentifier(“<USER_ID>”))
)
```
---

#### Connect to a Teams call

##### With External Identity

Connecting to a Teams call is almost identical to connecting to a call. Instead of using `StartCallOptions`, the client application uses `JoinCallOptions` with a `TeamsMeetingLocator`.

The Teams meeting link can be retrieved using Graph APIs. The retrieval process is detailed in the [graph documentation](https://learn.microsoft.com/graph/api/onlinemeeting-createorget?tabs=http\&view=graph-rest-beta\&preserve-view=true).

# [Java](#tab/java)
```java
JoinCallOptions options = new JoinCallOptions();
TeamsMeetingLinkLocator teamsMeetingLinkLocator = new TeamsMeetingLinkLocator(meetingLink);
Call call = callAgent.join(getApplicationContext(), teamsMeetingLinkLocator, joinCallOptions);
```

# [Kotlin](#tab/kotlin)

```kotlin
val options = JoinCallOptions()
val teamsMeetingLinkLocator = TeamsMeetingLinkLocator(meetingLink)
val call: Call = callAgent.join(getApplicationContext(), teamsMeetingLinkLocator, joinCallOptions)
```
---

## Accepting and joining a call

### Twilio

Twilio Video uses the concept of a `Room`. Different clients can establish communication by joining the same room. So accept and join a call is not straight alternative.

### Azure Communication Services

#### Receiving incoming call

To accept calls, the application must first be configured to receive incoming calls.

#### Register for push notifications and handle incoming push notification

A calling client can select to receive push notifications to receive incoming calls. This [guide](https://learn.microsoft.com/azure/communication-services/how-tos/calling-sdk/push-notifications?pivots=platform-android#set-up-push-notifications) describes how to set up APNS for the Azure Communication Services Calling.

#### Setting up the `CallAgentListener`

The Azure Communication Services Calling SDK includes an `IncomingCallListener`. An `IncomingCallListener` is set on the `CallAgent` instance. This listener defines an `onIncomingCall(IncomingCall incomingCall)` method, which is triggered upon the arrival of an incoming call.

# [Java](#tab/java)
```java
callAgent.addOnIncomingCallListener((incomingCall) -> {
     this.incomingCall = incomingCall;

     // Get incoming call ID  
     incomingCall.getId();

     // Get information about caller
     incomingCall.getCallerInfo();

     // CallEndReason is also a property of IncomingCall
      CallEndReason callEndReason = incomingCall.getCallEndReason();
});
```

# [Kotlin](#tab/kotlin)
```kotlin
callAgent.addOnIncomingCallListener { incomingCall ->
     this.incomingCall = incomingCall

     // Get incoming call ID
     incomingCall.id

     // Get information about caller
     incomingCall.callerInfo

    // callEndReason is also a property of IncomingCall
    val callEndReason = incomingCall.callEndReason
}
```
---

Implementing the `CallAgentListener` and associating it with a `CallAgent` instance, the application is ready to receive incoming calls.

#### Accept incoming call

# [Java](#tab/java)
```java
incomingCall.accept(context);
```
# [Kotlin](#tab/kotlin)
```kotlin
incomingCall.accept(context)
```
---

#### Class reference

| Class Name | Description |
| --- | --- |
| [IncomingCallListener](https://learn.microsoft.com/java/api/com.azure.android.communication.calling.incomingcalllistener) | Functional interface for incoming calls. |
| [IncomingCall](https://learn.microsoft.com/java/api/com.azure.android.communication.calling.incomingcall) | Describes an incoming call |

## Video Stream

### Starting and Stopping Video

#### Twilio

##### Accessing the camera

With Twilio Video, adding video to a call consists of two steps:

1. Accessing the camera
2. Adding the video track to the list of `LocalVideoTrack`

# [Java](#tab/java)
```java
 // Access the camera
CameraCapturer cameraCapturer = new Camera2Capturer(context, frontCameraId);

  // Create a video track
LocalVideoTrack videoTrack = LocalVideoTrack.create(context, true, cameraCapturer, LOCAL_VIDEO_TRACK_NAME);

  // The VideoTrack is enabled by default. It can be enabled or disabled if necessary
videoTrack.enable(true|false);

```

# [Kotlin](#tab/kotlin)
```kotlin
// Access the camera
val cameraCapturer: CameraCapturer = Camera2Capturer(context, frontCameraId)

// Create a video track
val localVideoTrack = LocalVideoTrack.create(context, enable, cameraCapturer)

// The VideoTrack is enabled by default. It can be enabled or disabled if necessary
videoTrack.enable(true|false)
```
---

##### Adding the `LocalVideoTrack`

**At connect time** . Adding a local video track is done by passing the `LocalVideoTrack` to the `LocalVideoTrack` list that is set via `ConnectOptions`.

# [Java](#tab/java)
```java
 ConnectOptions connectOptions = new ConnectOptions.Builder(accessToken)
    .roomName(roomName)
    .videoTracks(localVideoTracks)
}
```

# [Kotlin](#tab/kotlin)
```kotlin
    val connectOptions = ConnectOptions.Builder(accessToken)
        .roomName(roomName)
        .videoTracks(localVideoTracks)
}
```
---

In an **existing room**, the local participant can publish a local video track via the `publishTrack(LocalVideoTrack localVideoTrack)` method.

# [Java](#tab/java)
```java
room.localParticipant.publishVideoTrack(localVideoTrack)
```

# [Kotlin](#tab/kotlin)
```kotlin
room.localParticipant.publishVideoTrack(localVideoTrack)
```
---

#### Azure Communication Services

##### Accessing the camera

Accessing the camera is done through the `DeviceManager`. Obtain an instance of the `DeviceManager` using the following code snippet.

# [Java](#tab/java)
```java
DeviceManager deviceManager = callClient.getDeviceManager(getApplicationContext()).get();

deviceManager.getCameras();
```

# [Kotlin](#tab/kotlin)
```kotlin
val deviceManager: DeviceManager = CallClient().getDeviceManager(applicationContext).get()

deviceManager.cameras
```
---

##### Creating the `LocalVideoStream`

The `DeviceManager` provides access to camera objects that allow the creation of a `LocalVideoStream` instance.

# [Java](#tab/java)
```java
VideoDeviceInfo camera = deviceManager.getCameras().get(0);
LocalVideoStream videoStream = new LocalVideoStream(camera, context);
```

# [Kotlin](#tab/kotlin)
```kotlin
val camera : VideoDeviceInfo? = deviceManager.cameras.firstOrNull()
val videoStream = LocalVideoStream(camera, context)
```
---

##### Adding the `LocalVideoStream`

**At connect time**. The `LocalVideoStream` is added to the streams via the OutgoingVideoOptions of the `StartCallOptions`.

# [Java](#tab/java)
```java
    StartCallOptions options = new StartCallOptions();
    LocalVideoStream[] videoStreams = new LocalVideoStream[1];
    videoStreams[0] = videoStream;
    VideoOptions videoOptions = new VideoOptions(videoStreams);
    options.setVideoOptions(videoOptions);
```

# [Kotlin](#tab/kotlin)
```kotlin
    val options = StartCallOptions()
    val videoStreams: Array<LocalVideoStream> = arrayOf(localVideoStream)
    val videoOptions = VideoOptions(videoStreams)
    options.setVideoOptions(videoOptions)
```
---

**In a call**. Initiate a video stream by invoking the `startVideo` method, which accepts a `LocalVideoStream` as its parameter.

# [Java](#tab/java)
```java
call.startVideo(context, videoStream).get();
```

# [Kotlin](#tab/kotlin)
```kotlin
call.startVideo(context, videoStream).get()
```
---

#### Class reference

| Class Name | Description |
| --- | --- |
| [DeviceManager](https://learn.microsoft.com/java/api/com.azure.android.communication.calling.devicemanager) | Facilitates the interaction with the device |
| [LocalVideoStream](https://learn.microsoft.com/java/api/com.azure.android.communication.calling.localvideostream) | Local video stream information |
| [VideoDeviceInfo](https://learn.microsoft.com/java/api/com.azure.android.communication.calling.videodeviceinfo) | Information about a video device |
| [VideoOptions](https://learn.microsoft.com/java/api/com.azure.android.communication.calling.videooptions) | Property bag class for Video Options |
| [Call](https://learn.microsoft.com/java/api/com.azure.android.communication.calling.call) | Describes a call |

## Rendering video

### Twilio

To render video using Twilio Video, an object conforming to the `VideoSink` can be added to `VideoTrack`. The SDK provides a prebuilt `VideoSink` called `VideoView`, which subclasses `android.view.View`.

 # [Java](#tab/java)

```java
videoTrack.addSink(videoVideoView);
```

# [Kotlin](#tab/kotlin)

```kotlin
videoTrack.addSink(videoVideoView);
```
---

### Azure Communication Services

To render video with Azure Communication Services Calling, instantiate a `VideoStreamRenderer` and pass a `LocalVideoStream` or a `RemoteVideoStream` as a parameter to its constructor.

# [Java](#tab/java)

```java
VideoStreamRenderer previewRenderer = new VideoStreamRenderer(remoteStream, context);
VideoStreamRendererView preview = previewRenderer.createView(new CreateViewOptions(ScalingMode.FIT));
```

# [Kotlin](#tab/kotlin)

```kotlin
val previewRenderer = VideoStreamRenderer(localVideoStream, context)
val preview: VideoStreamRendererView = previewRenderer.createView(CreateViewOptions(ScalingMode.FIT))
videoContainer.addView(preview)
```
---

#### Class reference

| Class Name | Description |
| --- | --- |
| [ScalingMode](https://learn.microsoft.com/java/api/com.azure.android.communication.calling.scalingmode) | Enum for local and remote video scaling mode |
| [CreateViewOptions](https://learn.microsoft.com/java/api/com.azure.android.communication.calling.createviewoptions) | Options to be passed when rendering a Video |
| [VideoStreamRenderer](https://learn.microsoft.com/java/api/com.azure.android.communication.calling.videostreamrenderer) | Renderer for video rendering |
| [VideoStreamRendererView](https://learn.microsoft.com/java/api/com.azure.android.communication.calling.videostreamrendererview) | View used to render video |

## Audio Stream

### Toggling the microphone

#### Twilio

On the Twilio Video SDK, muting and unmuting the microphone is achieved by enabling or disabling the LocalAudioTrack associated with the microphone.

# [Java](#tab/java)
```java
localAudioTrack.enable(true|false);
```

# [Kotlin](#tab/kotlin)
```kotlin
localAudioTrack.enable(true|false)
```
---

#### Azure Communication Services

The `Call` object proposes methods for muting and unmuting the microphone.

# [Java](#tab/java)
```java
call.muteOutgoingAudio(context).get();
call.unmuteOutgoingAudio(context).get();

// Mute incoming audio sets the call volume to 0. To mute or unmute the incoming audio, use the muteIncomingAudio and unmuteIncomingAudio asynchronous APIs

call.muteIncomingAudio(context).get();
call.unmuteIncomingAudio(context).get();

```

# [Kotlin](#tab/kotlin)
```kotlin
call.muteOutgoingAudio(context).get()
call.unmuteOutgoingAudio(context).get()

// Mute incoming audio sets the call volume to 0. To mute or unmute the incoming audio, use the muteIncomingAudio and unmuteIncomingAudio asynchronous APIs

call.muteIncomingAudio(context).get()
call.unmuteIncomingAudio(context).get()

```
---

## Event Listeners

Twilio Video and Azure Communication Services Calling SDKs propose various listeners to listen to call events.

### Room / Call Events

#### Twilio

The `Room.Listener` allows clients to listen to events related to the `Room` object. The `Room.Listener` includes methods that are triggered for the following events:

- The client connected or failed to connect to a room
- The client is reconnecting to the room or reconnected
- A remote participant connected, disconnected, reconnected to the room
- The room recording started or stopped
- The dominant speaker changed

#### Azure Communication Services

The Azure Communication Services Calling SDK enable the `Call` object to incorporate various `PropertyChangedListener`, notifying them when a call property changes. Each event type should be subscribed to individually.  To learn more about event handling, see the [events tutorial.](../how-tos/calling-sdk/events.md)

The various `PropertyChangedListeners` that can be assigned to a call encompass certain events covered by the Twilio `Room.Listener`, featuring methods for the following events:

- The call state changed
- The list of remote participants updated
- The local video stream updated
- The mute state changed

### Local Participant Events

#### Twilio

Twilio has a `LocalParticipant.Listener` that allows clients to receive updates about the following events:

- The local participant published or failed to publish a media track (audio, video, data).
- The network quality level for the local participant changed.

#### Azure Communication Services

The `CallAgent` receives updates regarding calls through two listeners: `CallsUpdatedListener` and the `IncomingCallListener`. These listeners are triggered respectively for the following events:

- Calls are updated. A new call is created or an existing call is disconnected.
- An incoming call is received.

### Remote Participant Events

Both SDKs offer mechanisms to handle updates from remote participants.

#### Twilio

The `RemoteParticipant.Listener` handles the following events.

- The remote participant published or unpublished a media track (video, audio, data)
- The local participant subscribed, failed to subscribe, or unsubscribed to a remote media track (video, audio, data)
- The remote participant network quality changed
- The remote participant changed the priority of a track publication
- The remote participant switched on/off its video track

#### Azure Communication Services

Add a `PropertyChangedListener` to the `RemoteParticipant` object to receive updates for the following events:

- The remote participant state changed
- The remote participant is muted or not muted
- The remote participant is speaking
- The remote participant display name changed
- The remote participant added or removed a video stream

### Camera Events

#### Twilio

Twilio proposes a `CameraCapturer.Listener` to notify client about the following events related to the camera:

- The camera source was switched
- The camera source failed
- The first frame has been captured from the camera

#### Azure Communication Services

Azure Communication Services Calling SDK proposes a `VideoDevicesUpdatedListener`. It defines a single method to notify clients when video devices are added or removed on the current `DeviceManager`.

### Class reference

| Class Name | Description |
| --- | --- |
| [PropertyChangedListener](https://learn.microsoft.com/java/api/com.azure.android.communication.calling.propertychangedlistener) | Informs the library that the call state changes |
| [CallsUpdatedListener](https://learn.microsoft.com/java/api/com.azure.android.communication.calling.callsupdatedlistener) | Informs the library when the calls are updated |
| [IncomingCallListener](https://learn.microsoft.com/java/api/com.azure.android.communication.calling.incomingcalllistener) | Informs the library about incoming call |
| [VideoDevicesUpdatedListener](https://learn.microsoft.com/java/api/com.azure.android.communication.calling.videodevicesupdatedlistener) | Informs the library that new video devices were added or removed to the current library |

## Ending a Call

### Twilio

Ending a call (disconnecting from a room)  is done via the `room.disconnect()` method.

# [Java](#tab/java)
```java
room.disconnect();
```

# [Kotlin](#tab/kotlin)
```kotlin
room.disconnect()
```
---

### Azure Communication Services 

Hanging up a call is done through the `hangUp` method of the `Call` object.

# [Java](#tab/java)
```java
call.hangUp().get();

// Set the 'forEveryone' property to true to end call for all participants
HangUpOptions options = new HangUpOptions();
options.setForEveryone(true);
call.hangUp(options).get();
```

# [Kotlin](#tab/kotlin)
```kotlin
call.hangUp().get()

// Set the 'forEveryone' property to true to end call for all participants
call.hangUp(HangUpOptions().apply { isForEveryone = true }).get()
```
---

### Class reference

| Class Name | Description |
| --- | --- |
| [HangUp Options](https://learn.microsoft.com/java/api/com.azure.android.communication.calling.hangupoptions) | Property bag class for hanging up a call |

## More features from the Azure Communication Services Calling

### Dominant speaker

To register for updates about the dominant speaker, instantiate the `DominantSpeakersCallFeature` from the `Call` object. Learn more about the dominant speaker configuration in [the tutorial.](../how-tos/calling-sdk/dominant-speaker.md)

# [Java](#tab/java)
```java
DominantSpeakersCallFeature dominantSpeakersFeature = call.feature(Features.DOMINANT_SPEAKERS);

// Subscribe to the dominant speaker change event to receive updates about the dominant speaker.

dominantSpeakersFeature.addOnDominantSpeakersChangedListener(event -> {
       dominantSpeakersFeature.getDominantSpeakersInfo();
});

```

# [Kotlin](#tab/kotlin)
```kotlin
val dominantSpeakersFeature = call.feature(Features.DOMINANT_SPEAKERS)

// Subscribe to the dominant speaker change event to receive updates about the dominant speaker.

dominantSpeakersFeature.apply {
     addOnDominantSpeakersChangedListener { event ->
         dominantSpeakersInfo
     }
}

```
---

### Media Quality Statistics

To help you understand media quality during the call, Azure Communication Services SDK provides media quality statistics. Use it to examine the low-level audio, video, and screen-sharing quality metrics for incoming and outgoing call metrics.For more information, see the [Media quality statistics](../concepts/voice-video-calling/media-quality-sdk.md) guide.

### User Facing Diagnostics

Azure Communication Services Calling SDK offers a feature known as **User Facing Diagnostics (UFD)**, allowing clients to scrutinize diverse properties of a call to identify potential issues. To learn more about User Facing Diagnostics, see the [User Facing Diagnostics.](../concepts/voice-video-calling/user-facing-diagnostics.md)

> **Important:**
>Some features of the Azure Communication Services Calling SDK described in the list don’t have an equivalent in the Twilio Video SDK.

### Raise Hand

[Raise Hand](../how-tos/calling-sdk/raise-hand.md?pivots=platform-android) feature allows participants of a call to raise or lower hands.

### Video Background

Adding [Video Background](../quickstarts/voice-video-calling/get-started-video-effects.md?pivots=platform-android) Allow users to blur the background in the video stream.

### Video spotlights

[Spotlights](../how-tos/calling-sdk/spotlight.md?pivots=platform-android) Allow users to pin and unpin videos.
