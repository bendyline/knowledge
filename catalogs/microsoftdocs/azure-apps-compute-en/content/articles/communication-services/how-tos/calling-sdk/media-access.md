---
title: Control participant access to media
titleSuffix: An Azure Communication Services how-to guide
description: Use Azure Communication Services SDKs to control access to media for individual participants.
author: fuyan
ms.author: fuyan
ms.service: azure-communication-services
ms.subservice: calling
ms.topic: how-to 
ms.date: 10/24/2024
ms.custom: template-how-to
zone_pivot_groups: acs-plat-web-ios-android-windows

#Customer intent: As a developer, I want to learn how to send and receive Media access state using SDK.
---

# Control participant access to media


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



This article describes how you can enable organizers, co-organizers, or presenters to prevent attendees from unmuting themselves or turning on their video during Microsoft Teams meetings or group calls. Implement this feature to enable selected roles to control the ability of other attendees to send audio and video. You can't control media access for other roles. This article also describes how to determine if your audio or video is enabled or disabled. This includes providing attendees with the ability to check the media access status of other participants.

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn). 
- A deployed Communication Services resource. [Create a Communication Services resource](../../quickstarts/create-communication-resource.md).
- A user access token to enable the calling client. For more information, see [Create and manage access tokens](../../quickstarts/identity/access-tokens.md).
- Optional: Complete the article [Add voice calling to your app](../../quickstarts/voice-video-calling/getting-started-with-calling.md).

## Support

The following tables define support for media access in Azure Communication Services.

### Identities and call types

The following table shows media access support for specific call types and identities. 

| Identities | Teams meeting | Room | 1:1 call | Group call | 1:1 Teams interop call | Group Teams interop call |
| --- | --- | --- | --- | --- | --- | --- |
| Communication Services user | ✔️ |  |  |  |  | ✔️ |
| Microsoft 365 user | ✔️ |  |  |  |  | ✔️ |

### Operations

The following table shows support for individual APIs in the Calling SDK related to individual identity types. The media access feature only supports these operations in Teams meetings.

| Operations | Communication Services user | Microsoft 365 user | Equivalent Teams UI action |
| --- | --- | --- | --- |
| Permit audio | ✔️ [1] | ✔️ [1] | Enable mic |
| Forbid audio | ✔️ [1] | ✔️ [1] | Disable mic |
| Permit video | ✔️ [1] | ✔️ [1] | Enable camera |
| Forbid video | ✔️ [1] | ✔️ [1] | Disable camera |
| Permit audio of all attendees | ✔️[1] [2] | ✔️[1] [2] | Meeting option: Enable mic for all attendees |
| Forbid audio	of all attendees | ✔️[1] [2] | ✔️ [1] [2] | Meeting option: Disable mic for all attendees |
| Permit video of all attendees | ✔️[1] [2] | ✔️[1] [2] | Meeting option: Enable camera for all attendees |
| Forbid video of all attendees | ✔️[1] [2] | ✔️[1] [2] | Meeting option: Disable camera for all attendees |
| Get media access of other participants | ✔️ | ✔️ |  |
| Get media access of Teams meeting | ✔️[2] | ✔️[2] |  |
| Get notification that media access changed | ✔️ | ✔️ |  |
| Get notification that Teams meeting's media access changed | ✔️[2] | ✔️[2] |  |

[1] Only user with role organizer, co-organizer, or presenter.

[2] This operation is only supported in Microsoft Teams meetings.

### SDKs

The following tables show support for the media access feature in individual Azure Communication Services SDKs.

| Support status | Web | Web UI | iOS | iOS UI | Android | Android UI | Windows |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Is Supported | ✔️ |  |  |  |  |  |  |

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




## Implement media access

`MediaAccess` is a `feature` of the class `Call`. You first need to import package `Features` from the Calling SDK:

```js
import { Features} from "@azure/communication-calling";
```

Then you can get the instance of `MediaAccess` API from the `call` instance:

```js
const mediaAccessFeature = call.feature(Features.MediaAccess);
```

### Control access to send audio or video of individual attendees

Use the `permitAudio()` method to enable selected attendees to unmute. Use the `permitVideo()` method to enable selected attendees to turn on video. These actions don't automatically unmute or turn on video. They only enable attendees to perform these actions. 

Use the `forbidAudio()` method to enable organizers to mute selected attendees and deny them the ability to unmute. Use the `forbidVideo()` method to enable organizers to turn off video for selected attendees and deny them the ability to turn on video.

```js
// Define list of attendees
const acsUser = new CommunicationUserIdentifier('<USER_ID>');
const teamsUser = new MicrosoftTeamsUserIdentifier('<USER_ID>');
const participants = [acsUser, teamsUser];

// Allow selected attendees to unmute
mediaAccessFeature.permitAudio(participants);

// Deny selected attendees to unmute
mediaAccessFeature.forbidAudio(participants);

// Allow selected attendees to turn on video
mediaAccessFeature.permitVideo(participants);

// Deny selected attendees to turn on video
mediaAccessFeature.forbidVideo(participants);
```

### List media access state for all remote participants

Use the `getAllOthersMediaAccess` API to get information about all remote participant media access states for current call.
An example of how to use the `getAllOthersMediaAccess` API:
```js
let remoteParticipantsMediaAccess = mediaAccessHandFeature.getAllOthersMediaAccess()

remoteParticipantsMediaAccess.forEach((mediaAccess) => {
       console.log(`Identifier: ${mediaAccess.participant } can unmute: ${mediaAccess.isAudioPermitted } and can turn on video: ${mediaAccess.isVideoPermitted }`);  
})
```

### Get notification that media access changed

Subscribe to the `mediaAccessChanged` events from `MediaAccess` API to receive array of `MediaAccess` instances. Use the array to see the media access state for all remote participants if they're currently enabled or denied the ability to send audio or video. By default, all participants other than the attendee role can send audio and video. The `mediaAccessChanged` events are triggered when a participant with an appropriate role changes media access for selected attendees or all attendees. 

```js
const mediaAccessChangedHandler = (event) => {
    console.log(`Attendees that changed media access states:`);
    event.mediaAccesses.forEach( (mediaAccess) => {
       console.log(`Identifier: ${mediaAccess.participant } can unmute: ${mediaAccess.isAudioPermitted } and can turn on video: ${mediaAccess.isVideoPermitted }`);  
    }
}
mediaAccessFeature.on('mediaAccessChanged', mediaAccessChangedHandler )
```

### Stop receiving media access events
Use the following code to stop receiving media access events.
```js
mediaAccessFeature.off('mediaAccessChanged', mediaAccessChangedHandler)
```

### Media Access properties
Class `MediaAccess` has the following properties:

| Properties | Description |
| --- | --- |
| participant | Identifier of the participant whose media access changed. |
| isAudioPermitted | Boolean value indicating whether ability to send audio is allowed for this participant. |
| isVideoPermitted | Boolean value indicating whether ability to send video is allowed for this participant. |

### Control access to send audio or video for all attendees
Microsoft Teams meetings support APIs that enable organizers, co-organizers, and presenters to change the meeting options **Allow mic for attendees** or **Allow camera for attendees**. You can use those APIs to change the value of the meeting options, which enable organizers to enable or denying all attendees sending audio or video.

You can use the `permitOthersAudio()` method to set meeting option **Allow mic for attendees** to `true` and enable all attendees to unmute. You can also use the `permitOthersVideo()` method to set meeting option **Allow camera for attendees** to `true` and enable all attendees to turn on video. These actions don't automatically unmute or turn on video. They only enable attendees to perform these actions. 

Use the `forbidOthersAudio()` method to set meeting option **Allow mic for attendees** to `false`, which organizers can use to mute all attendees and deny them the ability to unmute. You can also use the `forbidOthersVideo()` method to set meeting option **Allow mic for attendees** to `false`, which organizers can use to turn of video for all attendees and deny them the ability to turn on video.

Participants with appropriate roles can override methods `permitOthersAudio` ,`permitOthersVideo`, `forbidOthersAudio` ,`forbidOthersVideo` with methods `forbidAudio` and `forbidVideo` or `permitAudio` and `permitVideo`. Change of media access for all attendees triggers `mediaAccessChanged` event for all participants that are impacted. 

```js
// Allow all attendees to unmute
mediaAccessFeature.permitOthersAudio();

// Deny all attendees to unmute
mediaAccessFeature.forbidOthersAudio();

// Allow all attendees to turn on video
mediaAccessFeature.permitOthersVideo();

// Deny all attendees to turn on video
mediaAccessFeature.forbidOthersVideo();
```

### Get Teams meeting media access setting
You can use the `getMeetingMediaAccess` API to get values of `Allow mic for attendees` or `Allow camera for attendees` Teams meeting options. The fact that meeting options are set to `true` or `false` don't guarantee that all attendees have permitted or forbid audio or video, because those calls can be overridden with methods `forbidAudio`, `forbidVideo`, `permitAudio` and `permitVideo`.
Here's an example of how to use the `getMeetingMediaAccess` API:
```js
let meetingMediaAccess = mediaAccessHandFeature.getMeetingMediaAccess()
console.log(`Teams meeting settings - Allow mic for attendees: ${meetingMediaAccess.isAudioPermitted}, Allow camera for attendees: ${meetingMediaAccess.isVideoPermitted}`);  
```

### Get notification that meeting media access changed
You can subscribe to the `meetingMediaAccessChanged` events from `MediaAccess` API to receive a `MeetingMediaAccess` instance when Teams meeting options `Allow mic for attendees` or `Allow camera for attendees` are changed. 
```js
const meetingMediaAccessChangedHandler = (event) => {
    console.log(`Teams meeting settings - Allow mic for attendees: ${event.meetingMediaAccess.isAudioPermitted}, Allow camera for attendees: ${event.meetingMediaAccess.isVideoPermitted}`);  
}
mediaAccessFeature.on('meetingMediaAccessChanged', meetingMediaAccessChangedHandler )
```

### Stop receiving meeting media access events
Use the following code to stop receiving meeting media access events.
```js
mediaAccessFeature.off('meetingMediaAccessChanged', meetingMediaAccessChangedHandler)
```

### Meeting media access properties
Class `MeetingMediaAccess` has the following properties:

| Properties | Description |
| --- | --- |
| isAudioPermitted | Boolean value of Teams meeting option `Allow mic for attendees`. |
| isVideoPermitted | Boolean value of Teams meeting option `Allow camera for attendees`. |

### Troubleshooting

| Error code | Subcode | Result Category | Reason | Resolution |
| --- | --- | --- | --- | --- |
| 500 | 46500 | UnexpectedServerError | Internal error while updating the audio or video access. | Gather browser console logs and contact Azure Communication Services support. |
| 500 | 46501 | UnexpectedClientError | Couldn't initialize media access feature. | Gather browser console logs and contact Azure Communication Services support. |
| 403 | 46502 | ExpectedError | Change media access failed. User doesn't have an organizer, coorganizer, or presenter role. | Ensure that the user has one of mentioned roles and try again. If the issue persists, gather browser console logs and contact Azure Communication Services support. |
| 403 | 46503 | UnexpectedServerError | Change media access failed. Change media access can only be done in meeting or group call scenarios. | Ensure that the feature is initialized only for Teams meeting or group call scenarios. You can check `Capability` feature to learn about the availability of the feature. If the issue persists, gather browser console logs and contact Azure Communication Services support. |
| 403 | 46504 | ExpectedError | Change media access failed. Only able to change media access for attendees. | Ensure that the method is called only for participants with role attendees. You can check the property `role` of class `remoteParticipant` to understand the role of the participant. |
| 412 | 46505 | ExpectedError | Failed to change media access. | Use media access APIs only when your instance of `Call` has property `state` set to `connected`. |
| 412 | 46506 | UnexpectedClientError | Media access change failed as meeting capabilities are empty. | Gather browser console logs and contact Azure Communication Services support. |
| 412 | 46507 | ExpectedError | Azure Communication Services currently disabled this feature. | Try the APIs in a couple of days. |

## SDK compatibility

The following table shows the minimum version of SDKs that support individual APIs.

| Operations | Web | Web UI | iOS | iOS UI | Android | Android UI | Windows |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Permit audio | 1.31.2,<br>1.32.1-beta.1 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Forbid audio | 1.31.2,<br>1.32.1-beta.1 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Permit others audio | 1.31.2,<br>1.32.1-beta.1 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Forbid others audio | 1.31.2,<br>1.32.1-beta.1 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Permit video | 1.31.2,<br>1.32.1-beta.1 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Forbid video | 1.31.2,<br>1.32.1-beta.1 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Permit others video | 1.31.2,<br>1.32.1-beta.1 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Forbid others video | 1.31.2,<br>1.32.1-beta.1 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |





## Next steps
- [Learn how to manage calls](manage-calls.md)
- [Learn how to manage video](manage-video.md)
- [Learn how to record calls](record-calls.md)
- [Learn how to transcribe calls](call-transcription.md)

## Related articles

For more information about using the media access feature, see [Manage attendee audio and video permissions in Microsoft Teams meetings](https://support.microsoft.com/en-us/office/manage-attendee-audio-and-video-permissions-in-microsoft-teams-meetings-f9db15e1-f46f-46da-95c6-34f9f39e671a).
