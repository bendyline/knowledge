---
title: Transfer calls
titleSuffix: An Azure Communication Services how-to guide
description: Use Azure Communication Services SDKs to transfer calls.
author: sundiraman
ms.author: sundraman
ms.service: azure-communication-services
ms.subservice: calling
ms.topic: how-to 
ms.date: 06/20/2025
ms.custom: template-how-to

#Customer intent: As a developer, I want to learn how to transfer calls so that users have the option to transfer calls.
---

# Transfer calls


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


During an active call, you can want to transfer the call to another person, number, or to voicemail. Let's learn how. 

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn). 
- A deployed Communication Services resource. [Create a Communication Services resource](../../quickstarts/create-communication-resource.md).
- A user access token to enable the calling client. For more information, see [Create and manage access tokens](../../quickstarts/identity/access-tokens.md).
- Optional: Complete [add voice calling to your application](../../quickstarts/voice-video-calling/getting-started-with-calling.md).

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





Call transfer is an extended feature of the core `Call` API. You first need to import calling Features from the Calling SDK:

```js
import { Features} from "@azure/communication-calling";
```

Then you can get the transfer feature API object from the call instance:

```js
const callTransferApi = call.feature(Features.Transfer);
```

Call transfers involve three parties:

- *Transferor*: The person initiating the transfer request.
- *Transferee*: The person being transferred.
- *Transfer target*: The person the call is being transferred to.

### Transfer to participant:

1. There's already a connected call between the *transferor* and the *transferee*. The *transferor* decides to transfer the call from the *transferee* to the *transfer target*.
1. The *transferor* calls the `transfer` operation.
1. The *transfer target* receives an incoming call.

To transfer a current call, you can use the `transfer` operation. The `transfer` operation takes the optional `transferCallOptions`, enabling you to set a `disableForwardingAndUnanswered` flag:

- `disableForwardingAndUnanswered = false`: If the *transfer target* doesn't answer the transfer call, the transfer follows the *transfer target* forwarding and unanswered settings.
- `disableForwardingAndUnanswered = true`: If the *transfer target* doesn't answer the transfer call, the transfer attempt ends.

```js
// transfer target can be an Azure Communication Services user
const id = { communicationUserId: <ACS_USER_ID> };
```

```js
// call transfer API
const transfer = callTransferApi.transfer({targetParticipant: id});
```

### Transfer to call:

1. There's already a connected call between the *transferor* and the *transferee*. 
2. There's already a connected call between the *transferor* and the *transfer target*.
3. The *transferor* decides to transfer the call with the *transferee* to the call with *transfer target*.
4. The *transferor* calls the `transfer` operation.
6. The *transfer target* receives an incoming call.

To transfer a current call, use `transfer`.

```js
// transfer to the target call specifying the call id
const id = { targetCallId: <CALL_ID> };
```

```js
// call transfer API
const transfer = callTransferApi.transfer({ targetCallId: <CALL_ID> });
```

The `transfer` Aobject enables you to subscribe to `stateChanged`. It also comes with a  transfer `state` and `error` properties

```js
// transfer state
const transferState = transfer.state; // None | Transferring | Transferred | Failed

// to check the transfer failure reason
const transferError = transfer.error; // transfer error code that describes the failure if a transfer request failed
```

The *transferee* can listen to a `transferAccepted` event. The listener for this event has a `TransferEventArgs`, which contains the call object of the new transfer call
between the  *transferee* and the *transfer target*. 

```js
// Transferee can subscribe to the transferAccepted event
callTransferApi.on('transferAccepted', args => {
    const newTransferCall =  args.targetCall;
});
```

The *transferor* can subscribe to events for change of the state of the transfer. If the call to the *transferee* was successfully connected with *Transfer target*, *transferor* can hang up the original call with *transferee*.

```js
transfer.on('stateChanged', () => {
   if (transfer.state === 'Transferred') {
       call.hangUp();
   }
});
```

### Transfer to voicemail:

1. There's a connected call between the *transferor* and the *transferee*. 
2. The Teams User Identifier of the *target participant voicemail* is known.
3. The *transferor* decides to transfer the call with the *transferee* to the *target participant's voicemail* using the target participant's Teams User Identifier.
4. The *transferor* calls `transfer`.
5. The *transferee* receives the transfer request.

To transfer a current call, you can use `transfer`.

```js
// transfer to the target participant voicemail specified by their Teams User Identifier
const id: MicrosoftTeamsUserIdentifier = { microsoftTeamsUserId: userId}
```

```js
// call transfer API
const transfer = callTransferApi.transfer({ targetParticipantVoicemail: id });
```

The `transfer` operation enables you to subscribe to `stateChanged`. It also comes with a transfer `state` and `error` properties

```js
// transfer state
const transferState = transfer.state; // None | Transferring | Transferred | Failed

// to check the transfer failure reason
const transferError = transfer.error; // transfer error code that describes the failure if a transfer request failed
```

The *transferee* can listen to a `transferAccepted` event. The listener for this event has a `TransferEventArgs`, which contains the call object of the new transfer call
between the *transferee* and the *target participant voicemail*. 

```js
// Transferee can subscribe to the transferAccepted event
callTransferApi.on('transferAccepted', args => {
    const newTransferCall =  args.targetCall;
});
```

The *transferor* can subscribe to events for change of the state of the transfer. If the call to the *transferee* successfully connected with *target participant voicemail*, *transferor* can hang up the original call with *transferee*.

```js
transfer.on('stateChanged', () => {
   if (transfer.state === 'Transferred') {
       call.hangUp();
   }
});
```

### Initial Caller and Transferor information

When a participant forwards or transfers a call, `transferInfo` is populated with information about the prior call state. This information includes `callerInfo`, which describes the initial caller and `transferorInfo`, which describes the entity transferring or forwarding the call.

For example, if an Azure Communication Services user places a call to a Teams call queue, which then distributes the call to a Microsoft 365 user, the `callerInfo` would specify the Azure Communication Services user and the `transferorInfo` would specify the Teams call queue. Callers and transferors have the ability to update their `displayName`. If they do, the change triggers the `callerInfoChanged` or `transferorInfoChanged` events.

For more information about change events, see [Event: callerInfoChanged](events.md?pivots=platform-web#event-callerinfochanged) and [Event: transferorInfoChanged](events.md?pivots=platform-web#event-transferorinfochanged). Change events apply to all calls and for any identity, including bring your own identity (BYOI) or Microsoft 365.

```js
const incomingCallHandler = async (args: { incomingCall: IncomingCall }) => {
    const incomingCall = args.incomingCall;
    // Get information about initial caller
    const callerInfo = incomingCall.callerInfo
    // Get information about initial caller
    const transferorInfo = incomingCall.transferorInfo
};
```


## Next steps
- [Learn how to manage calls](manage-calls.md)
- [Learn how to manage video](manage-video.md)
- [Learn how to record calls](record-calls.md)
- [Learn how to transcribe calls](call-transcription.md)
