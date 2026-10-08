---
title: Teams Meeting Audio Conferencing
titleSuffix: An Azure Communication Services how-to guide
description: Use Azure Communication Services SDKs to retrieve Microsoft Teams Meeting Audio Conferencing Details.
author: cnwankwo
ms.author: cnwankwo
ms.service: azure-communication-services
ms.subservice: teams-interop
ms.topic: how-to 
ms.date: 09/28/2023
ms.custom: template-how-to
---

# Microsoft Teams Meeting Audio Conferencing 


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


This article describes how to use Azure Communication Services Calling SDK to retrieve Microsoft Teams Meeting Audio Conferencing details. This function enables users who are already connected to a Microsoft Teams Meeting to be able to get the conference ID and dial-in phone number associated with the meeting. The Teams Meeting Audio Conferencing feature returns a collection of all toll and toll-free numbers. The collection includes concomitant country/region names and city names, giving users control of which Teams meeting dial-in details to use.

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn). 
- A deployed Communication Services resource. [Create a Communication Services resource](../../quickstarts/create-communication-resource.md).
- A user access token to enable the calling client. For more information. [Create and manage access tokens](../../quickstarts/identity/access-tokens.md).
- Optional: Complete the quickstart to [add voice calling to your application](../../quickstarts/voice-video-calling/getting-started-with-calling.md).

## Support

This section describes support for Audio Conferencing in Azure Communication Services.

### Identities and call types

The following table shows support for call and identity types. 

| Identities | Teams meeting | Room | 1:1 call | Group call | 1:1 Teams interop call | Group Teams interop call |
| --- | --- | --- | --- | --- | --- | --- |
| Communication Services user | ✔️ |  |  |  |  |  |
| Microsoft 365 user | ✔️ |  |  |  |  |  |

### Operations

The following table shows support for individual APIs in calling SDK for individual identity types. 

| Operations | Communication Services user | Microsoft 365 user |
| --- | --- | --- |
| Get audio conferencing details | ✔️ | ✔️ |

### SDKs

The following table shows support for the Audio Conferencing feature in individual Azure Communication Services SDKs.

| Platforms | Web | Web UI | iOS | iOS UI | Android | Android UI | Windows |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Is Supported | ✔️ |  |  |  |  |  |  |


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




Microsoft Teams Meeting Audio Conferencing is an extended feature of the core `Call` API. You first need to import calling Features from the Calling SDK:

```js
import { Features} from "@azure/communication-calling";
```

Then you can get the feature API object from the call instance:

```js
const audioConferencingFeature = call.feature(Features.TeamsMeetingAudioConferencing);
```

### Get the audio conferencing details of a meeting

Use the following API, to get the audio conferencing details of a meeting
```js
try {
     const details: SDK.TeamsMeetingAudioConferencingDetails = audioConferencingFeature.getTeamsMeetingAudioConferencingDetails();
     console.log(`Microsoft Teams Meeting Conference Id: ${details.phoneConferenceId}`);
     details.phoneNumbers.forEach(dialInPhoneNumber => {
        if (dialInPhoneNumber.tollPhoneNumber) { 
            console.log(`Dial-In Toll PhoneNumber: ${dialInPhoneNumber.tollPhoneNumber.phoneNumber}`);
        }
        else if (dialInPhoneNumber.tollFreePhoneNumber) { 
            console.log(`Dial-In TollFree PhoneNumber: ${dialInPhoneNumber.tollFreePhoneNumber.phoneNumber}`);
        } 
        else if (dialInPhoneNumber.countryName) {
            console.log(`Dial-In Country Name: ${dialInPhoneNumber.countryName}`);
        }
        else if (dialInPhoneNumber.cityName) {
            console.log(`Dial-In City Name: ${dialInPhoneNumber.cityName}`);
        }
    })
} catch (e) {
    console.error(e);
}
```

## Troubleshooting

| Code | Subcode | Result Category | Reason | Resolution |
| --- | --- | --- | --- | --- |
| 400 | 45950 | ExpectedError | Audio conferencing feature is available only in Teams meetings | Join Teams meeting with configured Audio conferencing |
| 405 | 45951 | ExpectedError | ACS service disabled audio conferencing | Create Azure Support ticket to request assistance |
| 403 | 45952 | ExpectedError | Audio conferencing details aren't available before joining the meeting | Ensure that the call object is in the `connected` state before invoking the API to retrieve the audio conferencing details |
| 403 | 45953 | ExpectedError | Audio conferencing details aren't available in lobby | Ensure that the call object is in the `connected` state before invoking the API to retrieve the audio conferencing details |


## Next steps

- [Learn how to manage calls](manage-calls.md)
- [Learn how to manage video](manage-video.md)
- [Learn how to record calls](record-calls.md)
- [Learn how to transcribe calls](call-transcription.md)
