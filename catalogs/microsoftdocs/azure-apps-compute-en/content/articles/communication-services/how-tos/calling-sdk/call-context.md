---
title: Pass user-to-user information (UUI) data in a header
titleSuffix: An Azure Communication Services article
description: Use Azure Communication Services SDKs to pass contextual data between calls.
author: sloanster
ms.author: micahvivion
ms.service: azure-communication-services
ms.subservice: calling
ms.topic: how-to 
ms.date: 06/27/2025
ms.custom: template-how-to
---

# Pass user-to-user information (UUI) data in a header


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


This article describes how to pass user-to-user information (UUI) in a header when routing calls with Azure Communication Services Calling SDKs. This capability enables users to pass metadata about the call, callee, or any other information that is relevant to their application or business logic.

The Azure Communication Services WebJS SDK enables developers to include custom contextual data (included as a header on the calling object) when directing and routing calls from one person to another. This information, also known as user-to-user information (UUI) data or call control UUI data, is a small piece of data inserted by an application initiating the call. The UUI data is opaque to end users making a call.

Contextual information supported includes both freeform custom headers and the standard UUI SIP header. In addition, when you receive an inbound call, the custom headers and UUI are included in the `incomingCall` payload.

All custom context data is opaque to Calling SDK or SIP protocols and its content is unrelated to any basic functions.

Developers can pass this context by using custom headers, which consist of optional key-value pairs. These pairs can be included in the `AddParticipant` or `Transfer` actions within the calling SDK. Once added, you can read the data payload as the call moves between endpoints. By efficiently looking up this metadata and associating it with the call, developers can avoid external database lookups and have the content information readily available within the call object.

The custom call context can be transmitted to SIP endpoints using the SIP protocol. This transmission includes both the custom headers and the standard UUI SIP header. When an inbound call is routed from your telephony network, the data from your Session Border Controller (SBC) in the custom headers and UUI is also included in the IncomingCall event payload.

It’s important to note that all custom context data remains transparent to the calling SDK and isn't related to any of the SDK’s fundamental functions when used in SIP protocols. Here's a tutorial to assist you in adding custom context headers when using the WebJS SDK.


> **Important:**
> To pass UUI data using the calling SDK, you must use the calling WebJS SDK GA or public preview version `1.29.1` or later.


## Technical parameters

The calling SDK supports adding up to five (5) custom SIP headers and 1000 custom VOIP headers. Additionally, developers can include a dedicated User-To-User header as part of SIP headers list.

The maximum length of a SIP header key is 64 chars, including the X-MS-Custom prefix. When you add the SIP header to the calling SDK, it automatically adds the `X-MS-Custom-` prefix, which you can see by inspecting the SIP header with packet inspector.

The SIP header key might consist of alphanumeric characters and a few selected symbols, which include `.`, `!`, `%`, `*`, `_`, `+`, `~`, `-`. The maximum length of SIP header value is 256 chars. The same limitations apply when configuring the SIP headers on your session border controller (SBC). The SIP header value might consist of alphanumeric characters and a few selected symbols, which include `=`, `;`, `.`, `!`, `%`, `*`, `_`, `+`, `~`, `-`.

The maximum length of a VOIP header key is 64 chars. The maximum length of VOIP header value is 1024 characters.

When adding these custom headers as a developer you can choose to add only SIP headers, only VoIP headers or both can be included.

> **Note:**
> When sending SIP headers, we recommend URL-encoding header values. Even if the values contain only valid characters, intermediary carriers may fail to parse them correctly unless they are URL-encoded.

> **Note:**
> Currently, adding custom User-to-User Information headers is only supported when initiating a 1:1 call. Passing User-to-User Information headers in group calls isn't currently supported. To work around this constraint after starting the 1:1 call, you can add participants while maintaining the User-to-User Information within the calls. 

For details about the custom context interface API, see [custom context API resource](https://learn.microsoft.com/javascript/api/azure-communication-services/@azure/communication-calling/customcontext?view=azure-communication-services-js\&preserve-view=true).

## Place a call with User-to-User Information (UUI) data

```js
// Setting custom context UUI Headers
const callOptions = {
    customContext: {
        voipHeaders: [
            {key: 'voip-key-1', value: 'voip-value-1'},
            {key: 'voip-key-2', value: 'voip-value-2'}
        ],

        sipHeaders: [
            {key: 'sip-key-1', value: 'sip-value-1'},
            {key: 'sip-key-2', value: 'sip-value-2'}
        ],
        userToUser: 'userToUserHeader',
    },
};
});
```


## Read and parse User-to-User Information headers in a call

The `callAgent` instance emits an `incomingCall` event when the logged-in identity receives an incoming call. To listen to this event and extract contextual info, subscribe by using one of these options:

```js
let info = '';
 
callAgent.on("incomingCall", (args) => {
    const incomingCall = args.incomingCall;
    if (incomingCall.customContext) {
        if (incomingCall.customContext.userToUser) {
            info += `userToUser: '${incomingCall.customContext.userToUser}'\n`;
        }
        if (incomingCall.customContext.sipHeaders) {
            incomingCall.customContext.sipHeaders.forEach(header => info += `sip: ${header.key}: '${header.value}'\n`);
        }
        if (incomingCall.customContext.voipHeaders) {
            incomingCall.customContext.voipHeaders.forEach(header => info += `voip: ${header.key}: '${header.value}'\n`);
        }
    }
});
```


## Next steps

- [Learn how to manage calls](manage-calls.md)
- [Learn how to manage video](manage-video.md)
- [Learn how to record calls](record-calls.md)
- [Learn how to transcribe calls](call-transcription.md)
