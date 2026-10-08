---
author: charithgunaratna
ms.service: azure-communication-services
ms.topic: include
ms.date: 02/04/2025
ms.author: charithg
ms.custom:
  - build-2025
---

> **Note:**
> This API feature is available with Azure Communication Services Calling Web SDK (1.35.1 or higher).

## Install the SDK

Use the `npm install` command to install the Azure Communication Services calling and common SDKs for JavaScript.

```console
npm install @azure/communication-common --save
npm install @azure/communication-calling --save
```

## Initialize required objects

Create a `CallClient` instance to initiate the calling stack. You can configure logging of calling SDK with the `AzureLogger` instance and `setLogLevel` method. You can get access to `deviceManager` for the operating system with the method `getDeviceManager`. 

Then use the method `createTeamsCallAgent` to create asynchronously a `TeamsCallAgent` instance that will manage incoming and outgoing calls for a Teams user. The method takes `CommunicationTokenCredential` as an argument representing [access token for Teams user](../../../../quickstarts/manage-teams-identity.md).

```js
const { CallClient } = require('@azure/communication-calling');
const { AzureCommunicationTokenCredential} = require('@azure/communication-common');
const { AzureLogger, setLogLevel } = require("@azure/logger");

// Set the logger's log level
setLogLevel('verbose');

// Redirect log output to wherever desired. To console, file, buffer, REST API, etc...
AzureLogger.log = (...args) => {
    console.log(...args); // Redirect log output to console
};

const userToken = '<USER_TOKEN>';
callClient = new CallClient();
const tokenCredential = new AzureCommunicationTokenCredential(userToken);
const teamsCallAgent = await callClient.createTeamsCallAgent(tokenCredential);
const deviceManager = await callClient.getDeviceManager();
```


## Place a call on behalf of a Microsoft Teams user

Before placing a call behalf of a delegator, make sure delegate placing the call has `make calls` permission through [delegator call settings in Microsoft Teams](https://support.microsoft.com/office/share-a-phone-line-with-a-delegate-in-microsoft-teams-16307929-a51f-43fc-8323-3b1bf115e5a8).

To place a call on behalf of a Microsoft Teams user, specify `OnBehalfOfOptions` during start call. Replace `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx` with the userId of the delegator and `yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy` with the userId of the callee.

```js
const onBehalfOfOptions = { userId: { microsoftTeamsUserId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" } }
const teamsCallOptions = { onBehalfOfOptions: onBehalfOfOptions };
const call = teamsCallAgent.startCall([{ microsoftTeamsUserId: "yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy" }], teamsCallOptions);
```

To place a call to a pubic switched telephone network (PSTN) user on behalf of a Microsoft Teams participant, use `PhoneNumberIdentifier` for call participant.

```js
const call = teamsCallAgent.startCall([{ phoneNumber: "+1xxxxxxxxxx" }], teamsCallOptions);
```

## Receive a call on behalf of a Microsoft Teams user

To receive calls on behalf of a delegator:

- Update delegate permission to enable the *receive calls* setting through [delegator call settings in Microsoft Teams](https://support.microsoft.com/office/share-a-phone-line-with-a-delegate-in-microsoft-teams-16307929-a51f-43fc-8323-3b1bf115e5a8).
- Set up simultaneous ring for delegates through [delegator call settings in Microsoft Teams](https://support.microsoft.com/office/call-forwarding-call-groups-and-simultaneous-ring-in-microsoft-teams-a88da9e8-1343-4d3c-9bda-4b9615e4183e).
