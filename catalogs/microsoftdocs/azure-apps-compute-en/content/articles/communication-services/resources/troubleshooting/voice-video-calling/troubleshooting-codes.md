---
title: Troubleshooting call end response codes for Calling SDK, Call Automation SDK, PSTN, Chat SDK, and SMS SDK - Azure Communication Services
description: Use call end response codes to diagnose why a call ended for Calling SDK, Call Automation SDK, PSTN, Chat SDK, and SMS SDK.
services: azure-communication-services
ms.date: 07/14/2025
author: slpavkov
ms.service: azure-communication-services
ms.author: slpavkov
manager: aakanmu
audience: ITPro
ms.topic: troubleshooting
zone_pivot_groups: acs-calling-automation-pstn
---

# Troubleshooting call end response codes for Calling SDK, Call Automation SDK, PSTN, Chat SDK, and SMS SDK


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


This article describes troubleshooting call end response codes for Calling SDK, Call Automation, and PSTN calling.

**Applies to: calling,callend,automation,pstn,chat**


## Troubleshooting tips

Consider the following tips when troubleshooting: 
- Your application isn't receiving an `IncomingCall Event Grid` event: Make sure the application endpoint is [validated with Event Grid](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-grid/webhook-event-delivery.md) when creating an event subscription. The provisioning status for your event subscription is marked as succeeded if the validation was successful. 
- For error `The field CallbackUri is invalid`: Call Automation doesn't support HTTP endpoints. Make sure the callback URL you provide supports HTTPS.
- The `PlayAudio` action doesn't play anything: Currently only Wave file (.wav) format is supported for audio files. The audio content in the wave file must be mono (single-channel), 16-bit samples with a 16,000 (16 KHz) sampling rate.
- Actions on PSTN endpoints aren't working: For `CreateCall`, `Transfer`, `AddParticipant`, and `Redirect` to phone numbers, you need to set the `SourceCallerId` in the action request. Unless you're using direct routing, the source caller ID must be a phone number owned by your Communication Services resource for the action to succeed. 

For more information about issues tracked by the product team, see [Known issues](../../../concepts/known-issues.md).



> **Note:**
> Message and Result Categories listed in the following tables are in public preview. For more information, see [Supplemental Terms of Use for Microsoft Azure Previews](https://azure.microsoft.com/support/legal/preview-supplemental-terms/).


**Applies to: calling**


## Understanding calling codes and subcodes errors

Error codes, subcodes, and corresponding result categories help developers identify and diagnose errors. These error codes are exposed through the `call.callEndReason` property after a call ends.

Error code details include:

**Code** - are 3 digit integers representing client or server response status. The code categories:

- Successful responses (**200-299**)
- Client error (**400-499**)
- Server error (**500-599**)
- Global error (**600-699**)

**Subcode** - Are defined as an integer, where each number indicates a unique reason, specific to a group of scenarios or specific scenario outcome.

**Message** - Describes the outcome, and provides hints how to mitigate the problem if an outcome is a failure.

**ResultCategory** - Indicates the type of the error. Depending on the context, the value can be `Success`, `ExpectedError`, `UnexpectedClientError`, or `UnexpectedServerError`.

## Azure Communication Services Calling SDK client error codes and subcodes

For client errors, if the resultCategories property is `ExpectedError`, the error is expected from the SDK's perspective. Such errors are commonly encountered in precondition failures, such as incorrect arguments passed by the app, or when the current system state doesn't allow the API call. The application should check the error reason and the logic for invoking API.

| Subcode | Code | Message | Result category | Advice |
| --- | --- | --- | --- | --- |
| 40101 | 408 | Failed to create CallAgent. Try again, if issue persists, gather browser console logs, `.HAR` file, and contact Azure Communication Services support. | UnexpectedClientError |  |
| 40104 | 408 | Failed to create CallAgent. Try again, if issue persists, gather browser console logs, `.HAR` file, and contact Azure Communication Services support. | UnexpectedClientError |  |
| 40114 | 408 | Failed to connect to Azure Communication Services infrastructure. Try again and check the browser's network requests. If the requests keep failing, gather browser console logs, `.HAR` file, and contact Azure Communication Services support. | UnexpectedClientError | For more information, see [network requirements](../../../concepts/voice-video-calling/network-requirements.md). |
| 40115 | 412 | Failed to create CallAgent, unable to initialize connection to Azure Communication Services infrastructure. Try again and check the browser's network requests. If the requests keep failing, gather browser console logs, `.HAR` file, and contact Azure Communication Services support. | UnexpectedClientError | For more information, see [network requirements](../../../concepts/voice-video-calling/network-requirements.md). |
| 40216 | 500 | Failed to create CallAgent. Try again, if issue persists, gather browser console logs and contact Azure Communication Services support. | UnexpectedClientError |  |
| 40228 | 409 | Failed to create CallAgent, an instance of CallAgent associated with this identity already exists. Dispose the existing CallAgent, or create a new one with a different identity. | ExpectedError |  |
| 40230 | 409 | Failed to create TeamsCallAgent, an instance of TeamsCallAgent associated with this identity already exists. Dispose the existing TeamsCallAgent before creating a new one. | ExpectedError |  |
| 40606 | 405 | Failed to enumerate speakers, it isn't supported to enumerate/select speakers on Android Chrome, iOS Safari, nor macOS Safari. | ExpectedError | Speaker enumeration/selection isn't supported on Android Chrome, iOS Safari, nor macOS Safari. The operating system automatically selects the speaker (output device). <br /> <br /> Learn more about [device management](../../../how-tos/calling-sdk/manage-video.md?pivots=platform-web#device-management) and how to best mitigate these issues. |
| 40613 | 400 | Failed to obtain permission for microphone and/or camera usage, it was denied or it failed. Ensure to allow the permissions in the browser's and in the OS settings. | ExpectedError | Learn more about [how to best handle device permissions](../../../concepts/best-practices.md?tabs=ios\&pivots=platform-web#request-device-permissions). |
| 40614 | 500 | Failed to ask for device permissions Ensure to allow the permissions in the browser's settings and in the OS settings and try again. If issue persists, gather browser console logs and contact Azure Communication Services support. | UnexpectedClientError | Learn more about [how to best handle device permissions](../../../concepts/best-practices.md?tabs=ios\&pivots=platform-web#request-device-permissions). |
| 41006 | 400 | Failed to accept the incoming call, it isn't in the Ringing state. Subscribe to CallAgent's `incomingCall` event to accept the incoming call. | ExpectedError | Consult the following articles to identify the root cause of the issue <br /> - [Receive an incoming call](../../../how-tos/calling-sdk/manage-calls.md?pivots=platform-web#receive-an-incoming-call) <br /> - [Subscribe to SDK events](../../../how-tos/calling-sdk/events.md?pivots=platform-web) |
| 41007 | 400 | Failed to reject the incoming call, it isn't in the Ringing state. Subscribe to CallAgent's `incomingCall` event to reject the incoming call. | ExpectedError | Consult the following articles to identify the root cause of the issue <br /> - [Receive an incoming call](../../../how-tos/calling-sdk/manage-calls.md?pivots=platform-web#receive-an-incoming-call) <br /> - [Subscribe to SDK events](../../../how-tos/calling-sdk/events.md?pivots=platform-web) |
| 41015 | 500 | Failed to mute microphone. Try again, if the issue persists, gather browser console logs and contact Azure Communication Services support. | UnexpectedClientError |  |
| 41016 | 400 | Failed to unmute microphone. Try again, if the issue persists, gather browser console logs and contact Azure Communication Services support. | UnexpectedClientError |  |
| 41025 | 400 | Failed to start video, LocalVideoStream instance is invalid or empty. Pass in a LocalVideoStream instance. | ExpectedError | Make sure the object passed in to start video is an instance of LocalVideoStream. <br /> Construct a `LocalVideoStream` using a `VideoDeviceInfo` object or a `MediaStream` object. <br /> <br /> Consult the following articles to identify the root cause of the issue: <br /> - [Place a call with video camera](../../../how-tos/calling-sdk/manage-video.md?pivots=platform-web#place-a-call-with-video-camera) <br /> - [Start and stop sending local video while on a call](../../../how-tos/calling-sdk/manage-video.md?pivots=platform-web#start-and-stop-sending-local-video-while-on-a-call) <br /> - [Access raw video](../../../quickstarts/voice-video-calling/get-started-raw-media-access.md?pivots=platform-web#access-raw-video) |
| 41027 | 400 | Failed to start video, video is already started. | ExpectedError | Helpful links: <br /> - [Place a call with video camera](../../../how-tos/calling-sdk/manage-video.md?pivots=platform-web#place-a-call-with-video-camera) <br /> - [Start and stop sending local video while on a call](../../../how-tos/calling-sdk/manage-video.md?pivots=platform-web#start-and-stop-sending-local-video-while-on-a-call) |
| 41030 | 400 | Failed to stop video, video is already stopped. | ExpectedError | Helpful links:<br /> - [Place a call with video camera](../../../how-tos/calling-sdk/manage-video.md?pivots=platform-web#place-a-call-with-video-camera) <br /> - [Start and stop sending local video while on a call](../../../how-tos/calling-sdk/manage-video.md?pivots=platform-web#start-and-stop-sending-local-video-while-on-a-call) |
| 41032 | 400 | Failed to stop video, invalid argument. LocalVideoStream used as an input is currently not being sent. | ExpectedError | The LocalVideoStream that is being sent in the call, is stored in the Call.localVideoStreams[] array, and it's of type `Video` or `RawMedia`. <br /> Consult the following articles to identify the root cause of the issue: <br /> - [Place a call with video camera](../../../how-tos/calling-sdk/manage-video.md?pivots=platform-web#place-a-call-with-video-camera) <br /> - [Start and stop sending local video while on a call](../../../how-tos/calling-sdk/manage-video.md?pivots=platform-web#start-and-stop-sending-local-video-while-on-a-call) <br /> - [Access raw video](../../../quickstarts/voice-video-calling/get-started-raw-media-access.md?pivots=platform-web#access-raw-video) |
| 41033 | 500 | Failed to hold the call. Try again, if the issue persists, gather browser console logs and contact Azure Communication Services support. | UnexpectedClientError |  |
| 41034 | 500 | Failed to resume the call. Try again, if the issue persists, gather browser console logs and contact Azure Communication Services support. | UnexpectedClientError |  |
| 41035 | 400 | Failed to start screen share, screen share is already started. | ExpectedError | Learn more about [how to start and stop screen sharing while on a call](../../../how-tos/calling-sdk/manage-video.md?pivots=platform-web#start-and-stop-screen-sharing-while-on-a-call) |
| 41041 | 400 | Failed to stop screen share, screen share is already stopped. | ExpectedError | Learn more about [how to start and stop screen sharing while on a call](../../../how-tos/calling-sdk/manage-video.md?pivots=platform-web#start-and-stop-screen-sharing-while-on-a-call) |
| 41048 | 410 | Failed to start video during call setup process. Ensure to allow video permissions in the browser's settings and in the OS settings, and ensure the camera device isn't being used by another process. | UnexpectedClientError | - The camera device might be disabled in the system. <br /> - Camera is being used by another process. |
| 41056 | 412 | Failed to start or join to the call, Teams Enterprise voice policy isn't enabled for this Azure Communication Services resource. Follow the tutorial online to enable it. | ExpectedError | See on [how to enable users for Enterprise Voice online and Phone System Voicemail](https://learn.microsoft.com/skypeforbusiness/skype-for-business-hybrid-solutions/plan-your-phone-system-cloud-pbx-solution/enable-users-for-enterprise-voice-online-and-phone-system-voicemail) to enable Teams Enterprise voice policy |
| 41071 | 412 | Failed to start screen share, call isn't in Connected state. Subscribe to the Call's `stateChanged` event to know when the call is connected. | ExpectedError | Helpful links: <br /> - [Check call properties](../../../how-tos/calling-sdk/manage-calls.md?pivots=platform-web#check-call-properties) <br /> - [Subscribe to SDK events](../../../how-tos/calling-sdk/events.md?pivots=platform-web)</li></ul> |
| 41073 | 412 | Failed to get or set custom MediaStream, this functionality is currently disabled by Azure Communication Services. | ExpectedError |  |
| 43000 | 412 | Failed to start video, video device is being used by another process/application. Stop your camera from being used in the other process/application and try again. | ExpectedError | Understand more about [how to best deal with a camera being used by another process](../../../concepts/best-practices.md?tabs=ios\&pivots=platform-web#manage-the-behavior-of-a-camera-that-another-process-is-using) |
| 43001 | 403 | Failed to start video, permission wasn't granted to use selected video device. Ensure video device permissions are allowed in the browser's settings and in the system's settings. | ExpectedError | Ensure camera permissions are allowed in the browser settings and device system settings. <br /> Ensure the cameras aren't disabled in the device system settings. <br /> On macOS, ensure screen recording is allowed from the system settings. <br /> <br /> Helpful links: <br /> - [Request device permissions](../../../concepts/best-practices.md?tabs=ios\&pivots=platform-web#request-device-permissions)- <br />[Screen sharing permissions on macOS](../../../concepts/best-practices.md?tabs=ios\&pivots=platform-web#request-device-permissions) <br /> - [Enumerating or accessing devices for Safari on macOS and iOS](../../../concepts/known-issues.md#enumerating-or-accessing-devices-for-safari-on-macos-and-ios) |
| 43002 | 500 | Failed to start video, unknown error. Try again. If the issue persists, contact Azure Communication Services support. | UnexpectedClientError |  |
| 43004 | 400 | Failed to switch video device, invalid input. Input must be of a VideoDeviceInfo type. | ExpectedError | Use the device manager to get a list of VideoDeviceInfo objects, and then use the VideoDeviceInfo object to switch the source. <br /> <br /> Learn more on [how to start and stop sending local video while on a call](../../../how-tos/calling-sdk/manage-video.md?pivots=platform-web#start-and-stop-sending-local-video-while-on-a-call) |
| 43005 | 400 | Failed to switch video device, unable to switch to the same video device, it's already selected. | ExpectedError |  |
| 43013 | 412 | Failed to start video, no video devices found. Ensure video devices are plugged in and enabled in the system settings. | ExpectedError | Make sure you have a camera connected and installed on your device. |
| 43014 | 412 | Failed to start video, error requesting media stream. Try again, if issue persists, contact Azure Communication Services support. | UnexpectedClientError |  |
| 43015 | 412 | Failed to start video, media stream request timed out. Allow permission on the browser's prompt to access the camera and try again. | ExpectedError | This error can occur if the user doesn't take action on the browser's permission prompt to allow access to the camera. |
| 43016 | 412 | Failed to start video, permissions denied by system. Ensure video device permissions are allowed in the browser's settings and in the system's settings. | ExpectedError | - Ensure camera permissions are allowed in the browser settings and device system settings. <br /> - Ensure the cameras aren't disabled in the device system settings. <br /> - On macOS, ensure screen recording is allowed from the system settings. <br /> <br /> Helpful links: <br /> - [Request device permissions](../../../concepts/best-practices.md?tabs=ios\&pivots=platform-web#request-device-permissions) <br /> -[Screen sharing permissions on macOS](../../../concepts/best-practices.md?tabs=ios\&pivots=platform-web#request-device-permissions) <br /> - [Enumerating or accessing devices for Safari on macOS and iOS](../../../concepts/known-issues.md#enumerating-or-accessing-devices-for-safari-on-macos-and-ios) |
| 43017 | 412 | Failed to start video, unsupported stream. Try again, if issue persists, contact Azure Communication Services support. | UnexpectedClientError |  |
| 43018 | 412 | Failed to start video, failed to set constraints. Try again, if issue persists, contact Azure Communication Services support. | UnexpectedClientError | Learn more about [how to set video constraints](../../../quickstarts/voice-video-calling/get-started-video-constraints.md?pivots=platform-web) |
| 43019 | 412 | Failed to start video, no device selected. Ensure to pass a LocalVideoStream constructed with a VideoDeviceInfo and try again. If issue persists, contact Azure Communication Services support. | UnexpectedClientError | Helpful links:<br /> - [Place a call with video camera](../../../how-tos/calling-sdk/manage-video.md?pivots=platform-web#place-a-call-with-video-camera)<br /> - [Start and stop sending local video while on a call](../../../how-tos/calling-sdk/manage-video.md?pivots=platform-web#start-and-stop-sending-local-video-while-on-a-call) |
| 43200 | 412 | Failed to render video stream, this stream isn't available. Subscribe to the stream's isAvailable property to get notified when the remote participant has their video on and the stream is available for rendering. | ExpectedError | Helpful links: <br /> - [Render remote participant video/screensharing streams](../../../how-tos/calling-sdk/manage-video.md?pivots=platform-web#render-remote-participant-videoscreensharing-streams)<br /> - [Add 1\:1 video calling to your app](../../../quickstarts/voice-video-calling/get-started-with-video-calling.md?pivots=platform-web) <br /> - [Subscribe to SDK events](../../../how-tos/calling-sdk/events.md?pivots=platform-web) |
| 43202 | 404 | Failed to render video stream, this stream isn't longer available. Remote participant turned off their video. | ExpectedError | The remote participant turned off their video while trying to create a view for it. |
| 43203 | 408 | Failed to render video stream, rendering timed out while waiting for video frames. Try again, if issue persists, contact Azure Communication Services support. | UnexpectedClientError |  |
| 43204 | 500 | Failed to render video stream, failed to subscribe to video on the Azure Communication Services infrastructure. Try again, if issue persists, contact Azure Communication Services support. | UnexpectedClientError |  |
| 43209 | 405 | Failed to render video stream, VideoStreamRenderer was disposed during initialization process. | ExpectedError |  |
| 43210 | 400 | Failed to dispose VideoStreamRenderer because it's already disposed. | ExpectedError |  |
| 43220 | 400 | Failed to create view, maximum number of active `RemoteVideoStream` views already reached. You can dispose of a previous one in order to create new one. | ExpectedError | Learn more about [how to properly support the best number of incoming video streams](../../../concepts/troubleshooting-info.md?tabs=csharp%2Cjavascript%2Cdotnet#enable-and-access-call-logs) |
| 71005 | 401 | Call failed due to a validation error in Azure Communication Services. Try again, if issue persists, contact Azure Communication Services support. | UnexpectedClientError |  |
|  | 480 | Remote client endpoint not registered. |  | Ensure that the remote endpoint is available. |
|  | 481 | Failed to handle incoming call. |  | File a support request through the Azure portal. |
|  | 487 | Call canceled, locally declined, ended due to an endpoint mismatch issue, or failed to generate media offer. |  | Expected behavior. |
|  | 490, 491, 496, 497, 498 | Local endpoint network issues. |  | Check your network. |
|  | 503, 504 | Communication Services infrastructure error. |  | File a support request through the Azure portal. |
|  | 600 | Busy everywhere. Participant contacted successfully but returned busy signal. |  | Expected behavior. |
|  | 603 | Call globally declined by remote Communication Services participant. |  | Expected behavior. |
|  | 604 | Doesn't exist anywhere. Requested URI doesn't exist. |  | Expected behavior. |
|  | 606 | Not acceptable. Participant successfully contacted but can't support the session described. |  | Expected behavior. |


**Applies to: callend**


## Understanding calling codes and subcodes errors

Error codes, subcodes, and corresponding result categories help developers identify and diagnose errors. These error codes are exposed through the `call.callEndReason` property after a call ends.

Error code details include:

**Code** - are 3 digit integers representing client or server response status. The code categories:

- Successful responses (**200-299**)
- Client error (**400-499**)
- Server error (**500-599**)
- Global error (**600-699**)

**Subcode** - Are defined as an integer, where each number indicates a unique reason, specific to a group of scenarios or specific scenario outcome.

**Message** - Describes the outcome, and provides hints how to mitigate the problem if an outcome is a failure.

**ResultCategory** - Indicates the type of the error. Depending on the context, the value can be `Success`, `ExpectedError`, `UnexpectedClientError`, or `UnexpectedServerError`.

## Calling End call codes and subcodes

There are different explanations for why a call ended. Here are the meanings of the end of call codes and subcodes that show how a call can end.

| Subcode | Code | Message | Result Categories | Advice |
| --- | --- | --- | --- | --- |
| 0 | 0 | Call ended successfully by local participant. | Success |  |
| 0 | 487 | Call ended successfully as caller canceled the call. | Success |  |
| 0 | 603 | Call ended successfully as it was declined from callee. | Success | Call ended because it was declined from the target user via either the client SDK, Call Automation, Graph, PSTN, or Teams reject function. |
| 7 | 496 | Call ended as client lost network connection abruptly, and despite retrying multiple times it wasn't able to connect | ExpectedError | Browser is offline or has network issues. Check your browser's network connection and retry. |
| 3100 | 410 | Call setup failed due to unexpected network problem on the client, check the client's network and retry. | UnxpectedClientError | Check network configuration, make sure it follows Azure Communication Calling network [requirements](../../../concepts/voice-video-calling/network-requirements.md). |
| 3101 | 410 | Call dropped due to unexpected network problem on the client, check the client's network and retry. | UnxpectedClientError | Check network configuration, make sure it follows Azure Communication Calling network [requirements](../../../concepts/voice-video-calling/network-requirements.md). |
| 3111 | 410 | Call setup failed, unable to process media offer while connecting the call. | UnxpectedClientError | Try again. If issue persists, gather [call info](references/how-to-collect-call-info.md), [client logs](references/how-to-collect-client-logs.md), [browser console logs](references/how-to-collect-browser-verbose-log.md) and contact Azure Communication Services support. |
| 3112 | 410 | Call setup failed due to network configuration problem on the client side, check the client's network configuration, and retry. | ExpectedError | Learn more details about a call ending with a subcode of 3112 [here](call-setup-issues/call-ends-with-410-3112.md). |
| 4097 | 0 | Call ended for all users by the meeting organizer. | Success |  |
| 4502 | 490 | Call failed due to network connectivity problems, browser failed to complete the network HTTP request. | UnexpectedClientError | Client failed to complete HTTP request and response. Try again. If issue persists, gather [call info](references/how-to-collect-call-info.md), [client logs](references/how-to-collect-client-logs.md), [browser console logs](references/how-to-collect-browser-verbose-log.md) and contact Azure Communication Services support. |
| 4506 | 408 | Call timed out. Check if the callee received and accepted the call. | UnexpectedClientError | Try again. If issue persists, gather [call info](references/how-to-collect-call-info.md), [client logs](references/how-to-collect-client-logs.md), [browser console logs](references/how-to-collect-browser-verbose-log.md) and contact Azure Communication Services support. |
| 4507 | 495 | Call ended as application didn't provide valid Azure Communication Services token. | UnexpectedClientError | Ensure that your application implements token refresh mechanism correctly. |
| 4521 | 0 | Call ended because user disconnected from the call abruptly. This might be caused by a user closing the application that hosted the call, such as a user terminated the application by closing the browser tab without proper hang-up. | ExpectedError |  |
| 5000 | 0 | Call ended for this participant. Participant removed from the conversation by another participant. | Success |  |
| 5003 | 0 | Call was ended by Azure Communication Service as the call has ended. | Success |  |
| 5300 | 0 | Call ended for this participant as it was removed from the conversation by another participant. | Success | Call ended for this participant as another participant removed it, it could be another client, Call Automation API, Graph API. |
| 5317 | 0 | Target participant is removed due to participant role update. | ExpectedError |  |
| 5828 | 403 | The join isn't authorized for the Rooms meeting since user isn't part of invitee list. | UnexpectedClientError |  |
| 5829 | 403 | The join isn't allowed for the Rooms meeting beyond end time or prior to start time of the meeting. | UnexpectedClientError |  |
| 5830 | 403 | Only Communication Services user is allowed to join the Rooms meeting. | ExpectedError |  |
| 7000 | 0 | Call was ended by Azure Communication Service Call Automation API or a server bot. | Success | Call was ended by ACS Call Automation API or Graph bot. |
| 10003 | 487 | Call was canceled for this user endpoint as it was accepted elsewhere, by another endpoint. | Success | A call was initiated to target user (start call, add participant, transfer), target user had multiple active endpoints at the same time, on one of the endpoints user accepted the call. This is normal behavior, only one endpoint can accept and connect to a call. All other endpoints receive subcode 10003 to indicate that call was already accepted. |
| 10004 | 487 | Call was canceled on timeout, as target user didn't accept or reject it on time. Ensure that user saw the notification and/or application can handle it automatically and try to initiate that call again. | ExpectedError | Call was canceled after predefined amount of time (usually 2 minutes) as target user didn't accept or reject. |
| 10009 | 401 | Unauthenticated identity. Ensure that your Azure Communication Services token is valid and not expired. | UnexpectedClientError |  |
| 71005 | 401 | Call failed due to a validation error in Azure Communication Services. Try again, if issue persists, contact Azure Communication Services support. | UnexpectedClientError |  |
| 10024 | 487 | Call ended successfully. Call declined by all callee endpoints. | Success | Try to place the call again. |
| 10037 | 480 | Target user didn't have any endpoints registered with ACS. Ensure that target user has at least one active endpoint and  it's online. | ExpectedError | If the target user is using the Azure Communication Services Calling SDK, ensure that the SDK is initialized successfully in their client application. If the target user is a Teams user, make sure that their client is online. Make sure that the target user's identifier (CommunicationUserIdentifier, MicrosoftTeamsUserIdentifier, or MicrosoftTeamsBotIdentifier) is correct. If the Graph API `user` has property `department` set to `Microsoft Communication Application Instance` the `MicrosoftTeamsBotIdentifier` should be specified. |
| 10057 | 408 | Call failed, callee failed to finalize call setup, most likely callee lost network or terminated the application abruptly. Ensure clients are connected and available. | ExpectedError |  |
| 10076 | 480 | Target user was registered but it wasn't online at the time of the call. Ensure that target user has at least one active endpoint and  it's online. | ExpectedError | If the target user is using the Azure Communication Services Calling SDK, ensure that the SDK is initialized successfully in their client application and their endpoint is online. If the target user is a Teams user, make sure that their client is online. |
| 10077 | 480 | Target user was registered with ACS and/or for push notifications, but it wasn't online at the time of the call. Ensure that target user has at least one active endpoint and  it's online. | ExpectedError | If the target user is using the Azure Communication Services Calling SDK, ensure that the SDK is initialized successfully in their client application and their endpoint is online. If application leverages Push Notifications make sure they're configured correctly. If the target user is a Teams user, make sure that their client is online. |
| 10078 | 480 | Remote client endpoint not registered or not reachable. Ensure the remote client endpoint is successfully sending network requests to Azure Communication Services. | ExpectedError | - If the target user is using the Azure Communication Services Calling SDK, ensure that the SDK is initialized successfully in their client application and their endpoint is online. If application leverages Push Notifications make sure they're configured correctly. <br> - If the target user is a Teams user, make sure that their client is online. |
| 301004 | 410 | Participant was removed from the call by the Azure Communication Services infrastructure due to inability to establish media connectivity with Azure Communication Services infrastructure during call setup. Check user's network configuration, including local network, firewalls, VPNs configuration and try again. | UnexpectedClientError | Ensure that user's network is configured correctly, follow 'Network Recommendations' public documentation. |
| 301005 | 410 | Participant removed from the call by the Azure Communication Services infrastructure due to loss of media connectivity with the same infrastructure. This usually happens if participant leaves the call abruptly or loses network connectivity. If the participant wants to continue the call, they can reconnect. | UnexpectedClientError | Ensure that you're using the latest SDK in a supported environment. |
| 540000 | 0 | Call ended successfully by local PSTN caller. | Success |  |
| 510403 | 403 | Call blocked:<br/> - No matching voice route found for the dialed number.<br/> - Alternate ID not supplied for the call.<br/> - Phone number not allowed by users Session Border Controller (SBC).<br/> - Previously markes as spam and now blocked. | ExpectedError | For more information about Alternate ID, see [Manage calls](../../../how-tos/calling-sdk/manage-calls.md#place-a-call).<br/> - Confirm that you have a valid Voice Route for the dialed number.<br/> - Make sure that you specified a valid Alternate ID. It must be a phone number that belongs to the Resource you're using.<br/> - Verify that you own the Resource you're using to make a call.<br/> - For direct routing calls, verify why your Session Border Controller disallowed the call.<br/> - Ensure that your Communication Services token is valid and not expired. |
| 540487 | 487 | Call ended successfully as caller canceled the call. | Success |  |
| 560000 | 0 | Call ended successfully by remote PSTN participant. | Success | Possible causes: <br /> - User ended the call. <br /> - Call ended by media agent. |
| 560486 | 486 | Call ended because remote PSTN participant was busy. The number called was already in a call or having technical issues. | Success | - For Direct Routing calls, check your Session Border Control logs and settings and timeouts configuration. Possible causes: The number called was already in a call or having technical issues. |
|  | 404 | Call not found. |  | Ensure that the number you're calling (or call you're joining) exists. |
|  | 408 | Call controller timed out. |  | Call Controller timed out waiting for protocol messages from user endpoints. Ensure clients are connected and available. |
|  | 410 | Local media stack or media infrastructure error. |  | Ensure that you're using the latest SDK in a supported environment. |
|  | 430 | Unable to deliver message to client application. |  | Ensure that the client application is running and available. |
|  | 480 | Remote client endpoint not registered. |  | Ensure that the remote endpoint is available. |
|  | 481 | Failed to handle incoming call. |  | File a support request through the Azure portal. |
|  | 490, 491, 496, 497, 498 | Local endpoint network issues. |  | Check network configuration, make sure it follows Azure Communication Calling network [requirements](../../../concepts/voice-video-calling/network-requirements.md). |
|  | 500, 503, 504 | Communication Services infrastructure error. |  | File a support request through the Azure portal. |



**Applies to: automation**

## Understanding calling codes and subcodes 
### When are error codes received?
Error codes for Call Automation can come either as synchronous responses to API calls or asynchronous responses via the provided callback URI. In the synchronous situation, if an API call is made and it'sn't accepted, ACS will provide an error code describing why the API call was rejected. In asynchronous scenarios if an API call is made and is accepted but something still goes wrong, both a callback event and an error code are received. An example of a common callback event for call failures would be the `callDisconnected` event that is surfaced whenever a call is disconnected. Once the `callDisconnected` event is received, there won't be any more callback events for that given call. For a list of call signaling callback events see ([this page](../../../concepts/call-automation/call-automation.md#call-automation-webhook-events)), and for a list of callback events for media actions see ([this page](../../../how-tos/call-automation/control-mid-call-media-actions.md)). 

### Error Code Syntax 
Error codes, subcodes, and corresponding result categories help developers identify and diagnose errors. Error code details include: 

**Code** - are 3 digit integers representing client or server response status. The code categories: 
- Successful responses (200-299) 
- Client error (400-499) 
- Server error (500-599) 
- Global error (600-699) 

**Subcode** - Are defined as an integer, where each number indicates a unique reason, specific to a group of scenarios or specific scenario outcome. 

**Message** - Describes the outcome and provides hints how to mitigate the problem if an outcome is a failure. 

In addition to the code and subcode, more detailed troubleshooting information can be found in the call logs. To learn more about how to enable and access calling logs, see [this page](../../../concepts/analytics/enable-logging.md) for detailed guidance. 

## Call Automation SDK error codes

The following table contains the most common codes and subcodes. If your error isn't in this table, refer to the generic codes and subcodes to get more information about your specific scenario.

### Call Automation error codes

| Callback Event | Code | Subcode | Description | Mitigation |
| --- | --- | --- | --- | --- |
| CreateCallFailed / AnswerFailed | 404 | 8522 | A generic error code that indicates that the resource isn't found. Resources can include calls and participants. | Double check call status: the call may have already ended, or the participant has left the call. |
| CreateCallFailed / AnswerFailed | 400 | 8523 | A generic error code that indicates that something in the request body is invalid. | Check to make sure all of the parameters are valid. Refer to the error message to determine which parameter is throwing the error. |
| AnswerFailed | 400 | 8501 | Action Not Supported Call Not Established | The action associated with the error message was activated while the call was not active. Ensure that new call actions aren't initiated after the call has been disconnected. This error could also result from actions invoked while the call is active if they're close to the call disconnected time. |
| AnswerFailed | 400 | 8500 | Invalid Media Mode | Check the status of your media operations to see if any of them are already active, or if target participant is already in a media operation. If there's an active media operation, wait for the operation to finish and then retry. |
| CallDisconnected | 400 | 8559 | Action Not Supported Only One Single Dialout App Allowed | Duplicate start recording request, recording already initiated or in progress. Double check recording status to ensure it's inactive before submitting a new start recording call. |
| AnswerFailed | 400 | 8528 | Action not supported call terminated | The action associated with the error message was activated while the call was terminated. Ensure that new call actions aren't initiated after the call is terminated. This error could also result from actions invoked while the call is active if they're close to the call termination time. |
| CreateCallFailed / ConnectFailed | 409 | 8519 | Conflict | Check to make sure multiple actions aren't being performed on the same resource in parallel. Refer to error message to identify which two actions are in conflict. |
| CreateCallFailed | 403 | 7507 | Call Source Identity Invalid | Application identity from authorization token didn't match application identity in call source. Check to make sure you're using the connection string from the ACS resource the incoming call webhook was configured in (the phone number has to be owned by the same ACS resource answering the call). |
| CreateCallFailed | 403 | 7504 | Insufficient Application Permissions | Generic code for insufficient permissions, check error message for context on what resource is lacking permissions. |
| AnswerFailed | 400 | 8585 | Action Not Valid In Current Call State | Call isn't established or is disconnected: wait for the call to be established before retrying the media action. |
| CreateCallFailed | 405 | 8520 | Functionality not supported at this time | Expected Error: Workflow not currently supported. Check our release blog to see if there's an updated SDK that has enabled these functionalities. See the Call Automation known limitations page for a list of not supported workflows. |
| CreateCallFailed | 412 | 8583 | Precondition Failed | Reference [this page](../../../how-tos/call-automation/control-mid-call-media-actions.md#media-action-compatibility-table) listing incompatible media actions to ensure you aren't running or queueing incompatible actions. |
| CreateCallFailed | 400 | 8567 | ACS Resource Service Principal Not Enabled | The Azure Cognitive Service Resource isn't configured properly. See this [page](../../../concepts/call-automation/azure-communication-services-azure-cognitive-services-integration.md) for a guide on setting up your Azure Cognitive Service Resource. |
| CreateCallFailed | 405 | 8522 | Missing configuration | Check error message for more context on which configuration needs to be established. This configuration needs to happen when invoking the AnswerCall API. |
| CallDisconnected | 200 | 0 | Call ended successfully by the local participant. | No action needed; call ended as expected. |
| CallDisconnected | 200 | 4521 | Participant abruptly disconnected (e.g., closed app, tab, or browser without hanging up). | Recommend graceful hang-up logic in client. Use client logs to verify if app was force-closed. |
| CallDisconnected | 200 | 5000 | Participant removed by another participant. | Check call control logic for removal operations. Confirm if the removal was intentional. |
| CallDisconnected | 200 | 5010 | Call ended because only one participant remained. | This is expected behavior. Rejoin with multiple participants if call was meant to continue. |
| CallDisconnected | 200 | 5013 | Call ended because no one else joined the group call. | Check timing of participant joins. |
| CallDisconnected | 200 | 7000 | Call ended by Azure Communication Services Call Automation or a server-side bot. | Confirm if bot logic triggered end of call. Review bot implementation and call flow. |
| CallDisconnected | 200 | 7015 | Call ended by service after successful transfer. | No action needed; call was terminated as part of expected transfer behavior. |
| CallDisconnected | 487 | 0 | Call ended successfully as caller canceled the call. | No action needed. Ensure cancellation is intentional. |
| CallDisconnected | 487 | 10003 | Call was accepted by another endpoint (e.g. different bot answered the call). Ensure bots only answer calls directed to them. | Application logic should check for endpoint priority or re-route logic. |
| CallDisconnected | 487 | 10024 | Call was declined by all callee endpoints. | No action needed. |
| CallDisconnected | 500 | 10045 | Azure Communication Services infrastructure error. | Capture logs and contact support if issue persists. |
| CallDisconnected | 503 | 560503 | Unexpected server error. | Internal server error, collect logs and open support ticket |
| CreateCallFailed | 401 | 10009 | Unauthenticated identity. | Ensure Azure Communication Services token is valid, scoped, and not expired. |
| CreateCallFailed | 403 | 510403 | Call marked as spam and blocked. | Review outbound calling pattern. Ensure it complies with anti-spam policies. |
| CreateCallFailed | 403 | 560403 | Call was forbidden, canceled, or rejected. | Validate permissions and target user status. |
| CreateCallFailed | 404 | 4500 | Call ID does not exist or call has already ended. | Double check call ID and call lifecycle. Ensure you’re not referencing an expired call. |
| CreateCallFailed | 480 | 10078 | Remote participant not registered or reachable. | Confirm callee’s client app is running and registered. Retry later if needed. |
| CreateCallFailed | 480 | 560480 | No answer from callee. | Confirm user availability. |
| CreateCallFailed | 487 | 540487 | Call canceled by the originator. | No action needed. Verify the source application canceled the call as intended. |
| ConnectFailed | 408 | 10057 | Timeout during meeting join or call acceptance. | Validate participant's presence and client readiness. |
| ConnectFailed | 429 | 10110 | Maximum call duration exceeded. | Review call duration policies. Consider scheduling reconnection if needed. |
| ConnectFailed | 480 | 10076 | Target user registered but offline. | Target must be online. Confirm app status or fallback to voicemail or async message. |
| ConnectFailed | 484 | 560484 | Invalid or incomplete callee address. | Validate callee identifier (e.g., phone number, ACS ID). Correct and retry. |
| AnswerFailed | 401 | 71005 | Token validation error while answering the call. | Ensure AnswerCall request has a valid, non-expired token. |
| AnswerFailed | 404 | 404 | Unable to answer. | Collect logs and open support ticket |
| AnswerFailed | 408 | 4506 | Timeout – callee didn’t respond in time. | Validate application availability and push notifications. |
| AnswerFailed | 495 | 4507 | Invalid Azure Communication Services token. | Check token generation and scope. Regenerate token if needed. |
| AnswerFailed | 430 | 10315 | Failed to deliver signaling message to client. | Ensure client app is reachable and can receive signaling messages. |
| AnswerFailed | 430 | 10317 | Client did not acknowledge signaling request. | Check client app responsiveness. Restart app or device if needed. |
| AnswerFailed | 480 | 10077 | Target registered but not online at the time of the call. | Ensure callee has active session and is not in background/sleep state. |
| AnswerFailed | 487 | 10004 | Timeout – user did not accept or reject in time. | Consider adding fallback path or extended ringing duration. |
| AnswerFailed | 487 | 4501 | Declined or failed to generate media offer (e.g., endpoint mismatch). | Verify media capabilities and ensure compatibility across participants. |
| AnswerFailed | 490 | 4502 | Network issue – browser failed to complete the request. | Validate client connectivity and allowlist ACS domains in network settings. |
| AnswerFailed | 496 | 7 | Lost network connection; retries failed. | Log and monitor recurring disconnects for further analysis. |


### Generic error codes
#### 2xx codes
A 2xx code represents a successful response. The subcode for successful responses will be 0.

#### 4xx codes 
A 4xx Code represents a client error.

| Status Code | Description |
| --- | --- |
| 400 | Bad request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not found |
| 405 | Method not allowed |
| 406 | Not acceptable |
| 408 | Timed out |
| 409 | Conflict |
| 412 | Precondition failed |
| 413 | Request entity too large |
| 426 | Upgrade required |
| 429 | Too many requests |
| 481 | Transaction doesn't exist |
| 487 | Canceled |

#### 5xx codes
A 5xx code represents a server error.

| Status Code | Description |
| --- | --- |
| 500 | Internal server error |
| 501 | Not implemented |
| 502 | Bad gateway |
| 503 | Service Unavailable |
| 504 | Gateway Timeout |

#### 6xx codes
A 6xx code represents a global error.

| Status Code | Description |
| --- | --- |
| 603 | Declined |

### Generic subcodes 
| Subcode | Description |
| --- | --- |
| 0 | Success |
| 7000 | Graceful |
| 7500 | Unsupported AAD Identity |
| 7501 | Invalid Token |
| 7502 | Access Not Enabled |
| 7504 | Insufficient Application Permissions |
| 7505 | Enterprise Tenant Mismatch |
| 7506 | Untrusted Certificate |
| 7507 | Call Source Identity Invalid |
| 7508 | Unsupported ACS Identity |
| 7509 | Hmac Validation Error |
| 7510 | Managed Identity Validation Error |
| 7600 | Resource Access Not Enabled |
| 7601 | Invalid ACS Source Identity |
| 7602 | Invalid ACS Target Identity |
| 7603 | Invalid ACS Identity |
| 7604 | Unauthorized Teams Interop Scenario |
| 7605 | Unauthorized Teams Recording Interop Scenario |
| 7606 | Unauthorized ACS Resource For Cognitive Actions |
| 8500 | Invalid Media Mode |
| 8501 | Call Not Established |
| 8502 | My Participant ID Not Available |
| 8503 | Call Media State Audio Inactive |
| 8504 | Media Streams Unavailable |
| 8505 | Multiple Participants With Replacement |
| 8506 | Non Compliance Recording Call |
| 8508 | Operation Canceled |
| 8509 | Max Silence Timeout Reached |
| 8510 | Initial Silence Timeout Reached |
| 8511 | Play Prompt Failed |
| 8512 | Play Beep Failed |
| 8513 | Media Receive Timeout |
| 8514 | Stop Tone Detected |
| 8515 | Max Record Duration Reached |
| 8516 | Call Throttled |
| 8517 | Call Tenant ID Mismatch |
| 8518 | Call Exception |
| 8519 | Conflict |
| 8520 | Not Implemented |
| 8521 | Too Many Hops |
| 8522 | Not Found |
| 8523 | Invalid Argument |
| 8524 | Invalid Participants Count For Compliance Recording |
| 8525 | Non Recorded Party |
| 8526 | Invalid Join Token |
| 8527 | Invalid Join URL |
| 8528 | Call Terminated |
| 8529 | Call Throttled Monthly Limit Reached |
| 8530 | Call Throttled Active Calls Limit Reached |
| 8531 | Max Digits Received |
| 8532 | Inter Digit Timeout Reached |
| 8533 | Dtmf Option Matched |
| 8534 | Incorrect Tone Entered |
| 8535 | Invalid File Format |
| 8536 | File Download Failed |
| 8537 | Keep Alive Timeout Reached |
| 8538 | Callee Declined |
| 8539 | Callee Busy |
| 8540 | Callee Busy Everywhere |
| 8541 | Callee Unavailable |
| 8542 | Call Canceled |
| 8543 | Call Doesn't Exist |
| 8544 | Callee Unreachable |
| 8545 | Speech Option Matched |
| 8546 | Callee Sent Invalid Request |
| 8547 | Speech Option Not Matched |
| 8548 | Call isn't Group Call |
| 8549 | Retarget Conversation Creation Failed |
| 8550 | Retarget Media Negotiation Failed |
| 8551 | Retarget Not Supported |
| 8552 | Can't Remove Organizer |
| 8553 | Duplicate Recording |
| 8554 | Participant Out Of Meeting Audio Mix |
| 8555 | Retarget Already In Progress |
| 8556 | Action Not Supported For CR Call |
| 8557 | Wrong Format Type |
| 8558 | Participant Not Present |
| 8559 | Duplicate Single Dialout |
| 8560 | Join Conversation Blocked Due To Locked Meeting |
| 8561 | Invalid Join Meeting ID |
| 8562 | Recording Mode Not Supported |
| 8563 | Speech Not Recognized |
| 8564 | Speech Service Connection Error |
| 8565 | Cognitive Services Error |
| 8566 | Unmute Operation Not Allowed |
| 8567 | ACS Resource Service Principal Not Enabled |
| 8568 | Managed Identity For Cognitive Service Request Failed |
| 8571 | Recording Operation Conflict |
| 8569 | Speech Recognized |
| 8570 | Cognitive Services Speech Recognition Error |
| 8572 | Play Service Shutdown |
| 8573 | Pause Resume Method Not Allowed |
| 8578 | Transcription Failed |
| 8579 | Transcription Canceled |
| 8580 | Transcription Service Shutdown |
| 8581 | Invalid Stream URL |
| 8582 | Play Source Text Or Ssml Empty |
| 8583 | Precondition Failed |
| 8585 | Action Not Valid In Current Call State |
| 8586 | Incoming Call Not Acknowledged By Bot |
| 8587 | Incoming Call Not Answered Within Time |
| 8588 | Record Completed And Media Receive Timeout |
| 8589 | Record Throttled |
| 8594 | Update Meeting State Failed |
| 8603 | Media Streaming Failed |
| 8604 | Media Streaming Canceled |
| 8605 | Transcription Custom Speech Model Not Supported |
| 8606 | Communication Identifier Creation Failed |
| 8607 | Transfer Operation Conflict |
| 8608 | Recording Participant Client Error |
| 8609 | Invalid Join Response From Bot |
| 8610 | No Response From Bot On Notification |
| 8613 | Call Throttled Live Captions Limit Reached |
| 9001 | Unknown Error From Underlying Service |
| 9002 | Timeout Error From Underlying Service |
| 9003 | Operation Canceled Error |
| 9998 | Fatal Error |
| 9999 | Unknown |

## SIP and Q.850 Diagnostic Codes in Callback Events

Call Automation callback events now support **low-level diagnostic data** via `SipDetails` and `Q850Details` fields, added to the existing `ResultInformation` object.  
These diagnostics surface protocol-level insights from the **telecom signaling layer**, helping troubleshoot issues such as call drops, unreachable destinations, or unexpected rejections in PSTN and SIP/VoIP scenarios.

---

### Availability

> **Note:**
> The presence of `SipDetails` and `Q850Details` is **entirely dependent** on whether the involved SBC or telecom carrier provides this information.  
>
> If the Session Border Control (SBC)/carrier returns relevant diagnostics after a corresponding call automation signaling request, the resulting event will include `SipDiagnosticInfo` within `ResultInformation`.

---

### Affected Events

The following events may include `SipDiagnosticInfo` in their `ResultInformation`:

- `RemoveParticipantsFailed`
- `AddParticipantsFailed`
- `CreateCallFailed`
- `AnswerFailed`
- `CallDisconnected`
- `TransferFailed`
- `CanAddParticipantFailed`

In practice, **any callback event containing `ResultInformation`** can carry these diagnostics when provided by the SBC/carrier.

---

### Structure

Each diagnostic is represented as an object:

| Property | Type | Description |
| --- | --- | --- |
| `Code` | Integer | SIP or Q.850 code (e.g., `486`, `16`) |
| `Message` | String | Human-readable reason (e.g., "Busy Here") |

These fields are optional and appear only when supplied by the SBC/carrier.

---

### Example

```json
{
  "ResultInformation": {
    "Code": 500,
    "SubCode": 560503,
    "Message": "Unexpected server error",
    "SipDetails": {
      "Code": 486,
      "Message": "Busy Here"
    },
    "Q850Details": {
      "Code": 17,
      "Message": "User busy"
    }
  }
}
```



**Applies to: pstn**

## PSTN call response codes with ParticipantEndReason

This section provides troubleshooting information for various combinations of `ParticipantEndReason` and `ParticipantEndSubCode` response codes. For the tables in this section, `ParticipantEndReason` = **Code** and `ParticipantEndSubCode` = **SubCode**.

As a general guideline, if the `ParticipantEndSubCode` value starts with 560 or 540, it indicates that the user's/operator's SBC generated the response code. This is useful for troubleshooting Direct Routing calls, as the subcode can help determine whether the error is from your SBC or the Microsoft service. A subcode starting with 560 represents an outbound call, while a subcode starting with 540 represents an inbound call. In either case, check the SBC logs.

For example, if the `ParticipantEndSubCode` value is `560403`, it means that it was an outbound call, the SBC generated the final response code, and the SIP response code from the SBC was 403. Start troubleshooting the calls by checking your SBC logs.

For `ParticipantEndSubCode` responses that don't start with 560 or 540, the Microsoft service generated the final response code.


### ParticipantEndReason 0

Response `ParticipantEndReason` with value 0 usually means normal call clearing and marks calls that completed without errors.

| SubCode | Code | Message | Result Categories | Advice |
| --- | --- | --- | --- | --- |
| 0 | 0 | Call ended successfully by local participant. | Success |  |
| 560000 | 0 | Normal PSTN call end:<br/> - User ended the call.<br/>  - Call ended by media agent. | Success |  |
| 540000 | 0 | Normal PSTN call end:<br/> - User ended the call.<br/>  - Call ended by media agent. | Success |  |


### ParticipantEndReason 4xx

Response `ParticipantEndReason` with value 4xx means that the call didn't connect.

| SubCode | Code | Message | Result Categories | Advice |
| --- | --- | --- | --- | --- |
| 510403 | 403 | Call blocked:<br/> - No matching voice route found for the dialed number.<br/> - Alternate ID not supplied for the call.<br/> - Phone number not allowed by user's Session Border Controller (SBC).<br/> - Previously marked as spam and now blocked. |  | For more information about Alternate ID, see [Manage calls](../../../how-tos/calling-sdk/manage-calls.md#place-a-call).<br/> - Confirm that you have a valid Voice Route for the dialed number.<br/> - Make sure that you specified a valid Alternate ID. It must be a phone number that belongs to the Resource you're using.<br/> - Verify that you own the Resource you're using to make a call.<br/> - For direct routing calls, verify why your Session Border Controller disallowed the call.<br/> - Ensure that your Communication Services token is valid and not expired. |
| 560403 | 403 | - Call forbidden.<br/> - Call canceled.<br/> - Call rejected. |  | Make sure that you called a valid phone number in the correct format. For more information about supported number formats, see <https://en.wikipedia.org/wiki/E.164>. |
| 511532 | 403 | Resource SIP trunk configuration not found. |  | Check your direct routing setup in the [Azure portal](https://portal.azure.com). For more information, see [Direct routing provisioning](../../../concepts/telephony/direct-routing-provisioning.md). |
| 560404 | 404 | - Phone number not found.<br/> - Phone number not assigned to any target.<br/> - Phone number not allowed by Session Border Controller. |  | - Make sure the phone number belongs to the Resource you're using and that you own the Resource.<br/> - Verify that the number you're calling exists, and is assigned to valid target. |
| 511404 | 404 | - Phone number not found.<br/> - Resource used in the call not found. |  | - Make sure you used a phone number that belongs to the Resource you're using and that you own the Resource.<br/> - Verify that the number you're calling exists, and is assigned to a valid target.<br/> - Make sure that the Resource you're using for the call isn't deleted or disabled.<br/> - Make sure your Azure subscriptions isn't deleted or disabled. |
| 560408 | 408 | The called party didn't respond to a call establishment message within the prescribed time period. |  | - Double check why the called party didn't respond.<br/> - For direct routing calls, check your Session Border Control (SBC) logs and settings and timeouts configuration. |
| 500001 | 408 | User gateway timeout<br/>Azure Communication Services didn't receive a response from the client within a specified time limit and terminated the request. |  | - Double check why the called party didn't respond.<br/> - For direct routing calls, check your SBC logs and settings and timeouts configuration. |
| 531004 | 410 | Interactive Connectivity Establishment (ICE) checks failed. |  | - The media path couldn't be established. Can be caused by incorrect network configuration. Verify your network configuration to make sure that the required IP addresses and ports aren't blocked. Read the guidelines in <https://www.rfc-editor.org/rfc/rfc5245#section-7>.<br/> - For direct routing calls, check your SBC logs and settings for ICE configuration and profile. Contact your SBC vendor for configuration help. For more information, see [List of Session Border Controllers certified for Azure Communication Services direct routing](../../../concepts/telephony/certified-session-border-controllers.md). |
| 560480 | 480 | - No answer from the called user.<br/> - Called user temporary unavailable. |  | - Double check why the called party didn't respond.<br/> - Retry the call later in case that the called party was temporary unavailable.<br/> - For direct routing calls, check your SBC logs and settings and timeouts configuration. |
| 560484 | 484 | - Incomplete or invalid callee address.<br/> - Incomplete or invalid callee number format. |  | - In some cases, you can ignore these failures because the user is dialing an invalid number.<br/> - Make sure the phone numbers are formatted correctly. For more information, see <https://en.wikipedia.org/wiki/E.164>.<br/> - For direct routing, the SBC could cause these failures because of a missing configuration in a call transfer scenario. |
| 540486 | 486 | The called number was busy |  | - The called number may be connected to an existing call, or having a technical problem.<br/> - For direct routing calls, check your SBC logs and settings and timeouts configuration. |
| 560486 | 486 | The called number was busy |  | - The called number may be connected to an existing call, or having a technical problem.<br/> - For direct routing calls, check your SBC logs and settings and timeouts configuration. |
| 540487 | 487 | The caller terminated the call request. |  | Retry the call. |
| 560487 | 497 | - The caller terminated the call request.<br/> - Request terminated with normal call clearing. |  | Retry the call. |


### ParticipantEndReason 5xx 

Response `ParticipantEndReason` with value 5xx means that the call failed due to a problem with a software or hardware component required to complete the connection.

| SubCode | Code | Message | Result Categories | Advice |
| --- | --- | --- | --- | --- |
| 560500 | 500 | An internal server error occurred in one of the services involved in the call. |  | - Retry the call. If the issue persists contact your telco provider or Microsoft support.<br/> - For direct routing calls, check your SBC logs and settings and timeouts configuration, to see if your SBC caused the failure. |
| 560503 | 503 | - Call failed because of an internal server error in one of the services involved in the call.<br/> - The network used to establish the call is out of order.<br/> - A temporary failure in one of the services involved in the call. |  | - Check your network and routing configuration for possible issues. Verify that your network firewall rules are correct.<br/> - Retry the call. If the issue persists, contact your telco provider or Microsoft support.<br/> - For direct routing calls, check your SBC logs and settings and timeouts configuration, to see if your SBC caused the failure. |


### ParticipantEndReason 603

Response `ParticipantEndReason` with value 603 means that the call was rejected without connecting.

| SubCode | Code | Message | Result Categories | Advice |
| --- | --- | --- | --- | --- |
| 560603 | 603 | - Call declined by the recipient.<br/> - Call declined due to fraud detection. |  | - If declined by the recipient, retry the call.<br/> - Ensure that you aren't exceeding the maximum number of concurrent calls allowed for your Azure Communication Services phone number. For more information, see [PSTN call limitations](../../../concepts/service-limits.md#pstn-call-limitations). |


**Applies to: chat**

## Chat SDK error codes

The Chat SDK uses the following error codes to help you troubleshoot chat issues. The error codes are exposed through the `error.code` property in the error response.

| Code | Message | Advice |
| --- | --- | --- |
| 401 | Unauthorized | Ensure that your Communication Services token is valid and not expired. |
| 403 | Forbidden | Ensure that the initiator of the request has access to the resource. |
| 429 | Too many requests | Ensure that your client-side application handles this scenario in a user-friendly manner. If the error persists, file a support request. |
| 503 | Service Unavailable | File a support request through the Azure portal. |


**Applies to: sms**

## SMS error codes

The SMS SDK uses the following error codes to help you troubleshoot SMS issues. The error codes are exposed through the `DeliveryStatusDetails` field in the SMS delivery report. 

| Code | Message | Advice |
| --- | --- | --- |
| 2000 | Message Delivered Successfully. |  |
| 4000 | Message is rejected due to fraud detection. | Ensure you aren't exceeding the maximum number of messages allowed for your number. |
| 4001 | Message is rejected due to invalid Source/From number format | Ensure the To number is in E.164 format and From number format is in E.164 or Short code format. |
| 4002 | Message is rejected due to invalid Destination/To number format. | Ensure the To number is in E.164 format |
| 4003 | Message failed to deliver due to unsupported destination. | Check if the destination you're trying to send to is supported. |
| 4004 | Message failed to deliver since Destination/To number doesn't exist. | Ensure the To number you're sending to is valid. |
| 4005 | Message blocked by Destination carrier. |  |
| 4006 | The Destination/To number isn't reachable. | Try resending the message at a later time. |
| 4007 | The Destination/To number opted out of receiving messages from you. | Mark the Destination/To number as opted out so that no further message attempts are made to the number. |
| 4008 | You exceeded the maximum number of messages allowed for your profile. | Ensure you aren't exceeding the maximum number of messages allowed for your number or use queues to batch the messages. |
| 4009 | Message rejected by Microsoft Entitlement System. | Most often this happens if fraudulent activity is detected. Contact support for more details. |
| 4010 | Message was blocked due to the toll-free number not being verified. | [Review unverified sending limits](../../../concepts/sms/sms-faq.md#toll-free-verification) and submit toll-free verification as soon as possible. |
| 4020 | Message rejected by the carrier due to a volumetric violation. | Ensure you aren't exceeding the maximum number of messages allowed for your number or use queues to batch the messages. |
| 5000 | Message failed to deliver. Reach out Microsoft support team for more details. | File a support request through the Azure portal. |
| 5001 | Message failed to deliver due to temporary unavailability of application/system. |  |
| 5002 | Carrier does not support delivery report | Most often this happens if a carrier does not support delivery reports. No action required as message may have been delivered already. |
| 9999 | Message failed to deliver due to unknown error/failure. | Try resending the message. |



## Related articles

- [Troubleshooting in Azure Communication Services](../../../concepts/troubleshooting-info.md)
- [Troubleshooting Azure Communication Services PSTN call failures](../../../concepts/telephony/troubleshooting-pstn-call-failures.md)
