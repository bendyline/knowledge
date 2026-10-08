---
title: Reactions
titleSuffix: An Azure Communication Services article
description: Use Azure Communication Services SDKs to send and receive reactions.
author: jamescadd
manager: chpalm
ms.author: jacadd
ms.service: azure-communication-services
ms.subservice: calling
ms.topic: how-to 
ms.date: 06/15/2025
ms.custom: template-how-to
---

# Reactions


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


This article describes how to implement reactions for Azure Communication Services Calling SDKs. This capability enables participants in a group call or meeting to send and receive reactions with participants in Azure Communication Services and Microsoft Teams. 

The configuration and policy settings in Microsoft Teams control reactions for users in Teams meetings. For more information, see [Manage reactions in Teams meetings and webinars](https://learn.microsoft.com/microsoftteams/manage-reactions-meetings) and [Meeting options in Microsoft Teams](https://support.microsoft.com/office/meeting-options-in-microsoft-teams-53261366-dbd5-45f9-aae9-a70e6354f88e).

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn). 
- A deployed Communication Services resource. [Create a Communication Services resource](../../quickstarts/create-communication-resource.md).
- A user access token to enable the calling client. For more information, see [Create and manage access tokens](../../quickstarts/identity/access-tokens.md).
- Optional: Complete the quickstart to [add voice calling to your application](../../quickstarts/voice-video-calling/getting-started-with-calling.md).

## Limits on reactions

The system pulls reactions by batches at regular intervals. Current batch limitation is 20,000 reactions pulled every 3 seconds.

If the number of reactions exceeds the limit, leftover reactions are sent in the next batch.

## Support

The following tables define support for reactions in Azure Communication Services.

Teams meeting support is based on [Teams policy](https://learn.microsoft.com/microsoftteams/manage-reactions-meetings).

### Identities and call types

The following table shows reactions support for different call and identity types. 

| Identities | Teams interop meeting | Room | 1:1 call | Group call | Teams interop Group Call |
| --- | --- | --- | --- | --- | --- |
| Communication Services user | ✔️ | ✔️ |  | ✔️ | ✔️ |
| Microsoft 365 user | ✔️ |  |  | ✔️ | ✔️ |

### Operations

The following table shows reactions support for Calling SDK to individual identity types. 

| Operations | Communication Services user | Microsoft 365 user |
| --- | --- | --- |
| Send specific reactions (like, love, laugh, applause, surprised) | ✔️ | ✔️ |
| Receive specific reactions (like, love, laugh, applause, surprised) | ✔️ | ✔️ |

### SDKs

The following table shows Together Mode feature support for individual Azure Communication Services SDKs.

| Platforms | Web | Web UI | iOS | iOS UI | Android | Android UI | Windows |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Is Supported | ✔️ | ✔️ |  |  |  |  |  |



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




## Implement reactions for meeting participants

In Azure Communication Services participants can send and receive reactions during a group call:

- Like 
- Love 
- Applause 
- Laugh 
- Surprise 

To send a reaction, use `sendReaction(reactionMessage)`. To receive a reaction, the message builds with type `ReactionMessage` using `Reaction` enums as an attribute.

You need to subscribe to events that provide the subscriber event data:

```javascript
export interface ReactionEventPayload {
    /**
     * identifier for a participant
     */
    identifier: CommunicationUserIdentifier | MicrosoftTeamsUserIdentifier;
    /**
     * reaction type received
     */
    reactionMessage: ReactionMessage;
}
```

You can determine which reaction is coming from which participant using the `identifier` attribute and getting the reaction type from `ReactionMessage`. 

### Sample showing how to send a reaction in a meeting

```javascript
const reaction = call.feature(SDK.Features.Reaction);
const reactionMessage: SDK.ReactionMessage = {
       reactionType: 'like'
};
await reaction.sendReaction(reactionMessage);
```

### Sample showing how to receive a reaction in a meeting

```javascript
const reaction = call.feature(SDK.Features.Reaction);
reaction.on('reaction', event => {
    // user identifier
    console.log("User Mri - " + event.identifier);
    // received reaction
    console.log("User Mri - " + event.reactionMessage.reactionType);
    // reaction message
    console.log("reaction message - " + JSON.stringify(event.reactionMessage));
}
```

### Key points when using reactions

- Reactions are supported for Microsoft Teams interoperability scenarios. Support is based on [Teams policy](https://learn.microsoft.com/microsoftteams/manage-reactions-meetings).
- Reactions are supported in the Web Calling SDK.
- Reactions aren't currently supported in the Native SDKs.

## Next steps

- [Learn how to manage calls](manage-calls.md)
- [Learn how to manage video](manage-video.md)
