---
title: General troubleshooting strategies - Understanding error messages and codes
titleSuffix: Azure Communication Services - Troubleshooting Guide
description: Learn to understand error messages and codes.
author: sloanster
ms.author: micahvivion

services: azure-communication-services
ms.date: 05/13/2024
ms.topic: troubleshooting
ms.service: azure-communication-services
ms.subservice: calling
zone_pivot_groups: acs-calling-codes
---

# Understanding calling codes and subcodes errors


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


The Calling SDK and respective server infrastructure use a unified framework to represent errors. Using  error codes, subcodes, and their corresponding result categories, as a developer you can more easily understand these errors and find explanations as to why they happened and how to mitigate in the future. The details about the error results can be viewed as:
 
**Code** Are modeled as 3 digit integers that indicate the response status of a client or server response. They're grouped into:<br>
- Successful responses (**200-299**)<br>
- Client error (**400-499**) <br>
- Server error (**500-599**) <br>

**Subcode** Are defined as an integer, where each number indicates a unique reason, specific to a group of scenarios or specific scenario outcome.<br>
**Message** Describes the outcome, and provides hints how to mitigate the issue problem if an outcome is a failure.<br>
**ResultCategory** - Indicates the type of the error. Depending on the context, the value can be `Success`, `ExpectedError`, `UnexpectedClientError`, or `UnexpectedServerError`

> **Important:**
> This feature of Azure Communication Services is currently in preview. Features in preview are publicly available and can be used by all new and existing Microsoft customers.
>
> This preview version is provided without a service-level agreement, and we don't recommend it for production workloads. Certain features might not be supported or capabilities might be constrained.
>
> For more information, see [Supplemental Terms of Use for Microsoft Azure Previews](https://azure.microsoft.com/support/legal/preview-supplemental-terms/).


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
| 40114 | 408 | Failed to connect to Azure Communication Services infrastructure. Try again and check the browser's network requests. If the requests keep failing, gather browser console logs, `.HAR` file, and contact Azure Communication Services support. | UnexpectedClientError | For more information, see [network requirements](../../../../concepts/voice-video-calling/network-requirements.md). |
| 40115 | 412 | Failed to create CallAgent, unable to initialize connection to Azure Communication Services infrastructure. Try again and check the browser's network requests. If the requests keep failing, gather browser console logs, `.HAR` file, and contact Azure Communication Services support. | UnexpectedClientError | For more information, see [network requirements](../../../../concepts/voice-video-calling/network-requirements.md). |
| 40216 | 500 | Failed to create CallAgent. Try again, if issue persists, gather browser console logs and contact Azure Communication Services support. | UnexpectedClientError |  |
| 40228 | 409 | Failed to create CallAgent, an instance of CallAgent associated with this identity already exists. Dispose the existing CallAgent, or create a new one with a different identity. | ExpectedError |  |
| 40230 | 409 | Failed to create TeamsCallAgent, an instance of TeamsCallAgent associated with this identity already exists. Dispose the existing TeamsCallAgent before creating a new one. | ExpectedError |  |
| 40606 | 405 | Failed to enumerate speakers, it isn't supported to enumerate/select speakers on Android Chrome, iOS Safari, nor macOS Safari. | ExpectedError | Speaker enumeration/selection isn't supported on Android Chrome, iOS Safari, nor macOS Safari. The operating system automatically selects the speaker (output device). <br /> <br /> Learn more about [device management](../../../../how-tos/calling-sdk/manage-video.md?pivots=platform-web#device-management) and how to best mitigate these issues. |
| 40613 | 400 | Failed to obtain permission for microphone and/or camera usage, it was denied or it failed. Ensure to allow the permissions in the browser's and in the OS settings. | ExpectedError | Learn more about [how to best handle device permissions](../../../../concepts/best-practices.md?tabs=ios\&pivots=platform-web#request-device-permissions). |
| 40614 | 500 | Failed to ask for device permissions Ensure to allow the permissions in the browser's settings and in the OS settings and try again. If issue persists, gather browser console logs and contact Azure Communication Services support. | UnexpectedClientError | Learn more about [how to best handle device permissions](../../../../concepts/best-practices.md?tabs=ios\&pivots=platform-web#request-device-permissions). |
| 41006 | 400 | Failed to accept the incoming call, it isn't in the Ringing state. Subscribe to CallAgent's `incomingCall` event to accept the incoming call. | ExpectedError | Consult the following articles to identify the root cause of the issue <br /> - [Receive an incoming call](../../../../how-tos/calling-sdk/manage-calls.md?pivots=platform-web#receive-an-incoming-call) <br /> - [Subscribe to SDK events](../../../../how-tos/calling-sdk/events.md?pivots=platform-web) |
| 41007 | 400 | Failed to reject the incoming call, it isn't in the Ringing state. Subscribe to CallAgent's `incomingCall` event to reject the incoming call. | ExpectedError | Consult the following articles to identify the root cause of the issue <br /> - [Receive an incoming call](../../../../how-tos/calling-sdk/manage-calls.md?pivots=platform-web#receive-an-incoming-call) <br /> - [Subscribe to SDK events](../../../../how-tos/calling-sdk/events.md?pivots=platform-web) |
| 41015 | 500 | Failed to mute microphone. Try again, if the issue persists, gather browser console logs and contact Azure Communication Services support. | UnexpectedClientError |  |
| 41016 | 400 | Failed to unmute microphone. Try again, if the issue persists, gather browser console logs and contact Azure Communication Services support. | UnexpectedClientError |  |
| 41025 | 400 | Failed to start video, LocalVideoStream instance is invalid or empty. Pass in a LocalVideoStream instance. | ExpectedError | Make sure the object passed in to start video is an instance of LocalVideoStream. <br /> Construct a `LocalVideoStream` using a `VideoDeviceInfo` object or a `MediaStream` object. <br /> <br /> Consult the following articles to identify the root cause of the issue: <br /> - [Place a call with video camera](../../../../how-tos/calling-sdk/manage-video.md?pivots=platform-web#place-a-call-with-video-camera) <br /> - [Start and stop sending local video while on a call](../../../../how-tos/calling-sdk/manage-video.md?pivots=platform-web#start-and-stop-sending-local-video-while-on-a-call) <br /> - [Access raw video](../../../../quickstarts/voice-video-calling/get-started-raw-media-access.md?pivots=platform-web#access-raw-video) |
| 41027 | 400 | Failed to start video, video is already started. | ExpectedError | Helpful links: <br /> - [Place a call with video camera](../../../../how-tos/calling-sdk/manage-video.md?pivots=platform-web#place-a-call-with-video-camera) <br /> - [Start and stop sending local video while on a call](../../../../how-tos/calling-sdk/manage-video.md?pivots=platform-web#start-and-stop-sending-local-video-while-on-a-call) |
| 41030 | 400 | Failed to stop video, video is already stopped. | ExpectedError | Helpful links:<br /> - [Place a call with video camera](../../../../how-tos/calling-sdk/manage-video.md?pivots=platform-web#place-a-call-with-video-camera) <br /> - [Start and stop sending local video while on a call](../../../../how-tos/calling-sdk/manage-video.md?pivots=platform-web#start-and-stop-sending-local-video-while-on-a-call) |
| 41032 | 400 | Failed to stop video, invalid argument. LocalVideoStream used as an input is currently not being sent. | ExpectedError | The LocalVideoStream that is being sent in the call, is stored in the Call.localVideoStreams[] array, and it's of type `Video` or `RawMedia`. <br /> Consult the following articles to identify the root cause of the issue: <br /> - [Place a call with video camera](../../../../how-tos/calling-sdk/manage-video.md?pivots=platform-web#place-a-call-with-video-camera) <br /> - [Start and stop sending local video while on a call](../../../../how-tos/calling-sdk/manage-video.md?pivots=platform-web#start-and-stop-sending-local-video-while-on-a-call) <br /> - [Access raw video](../../../../quickstarts/voice-video-calling/get-started-raw-media-access.md?pivots=platform-web#access-raw-video) |
| 41033 | 500 | Failed to hold the call. Try again, if the issue persists, gather browser console logs and contact Azure Communication Services support. | UnexpectedClientError |  |
| 41034 | 500 | Failed to resume the call. Try again, if the issue persists, gather browser console logs and contact Azure Communication Services support. | UnexpectedClientError |  |
| 41035 | 400 | Failed to start screen share, screen share is already started. | ExpectedError | Learn more about [how to start and stop screen sharing while on a call](../../../../how-tos/calling-sdk/manage-video.md?pivots=platform-web#start-and-stop-screen-sharing-while-on-a-call) |
| 41041 | 400 | Failed to stop screen share, screen share is already stopped. | ExpectedError | Learn more about [how to start and stop screen sharing while on a call](../../../../how-tos/calling-sdk/manage-video.md?pivots=platform-web#start-and-stop-screen-sharing-while-on-a-call) |
| 41048 | 410 | Failed to start video during call setup process. Ensure to allow video permissions in the browser's settings and in the OS settings, and ensure the camera device isn't being used by another process. | UnexpectedClientError | - The camera device might be disabled in the system. <br /> - Camera is being used by another process. |
| 41056 | 412 | Failed to start or join to the call, Teams Enterprise voice policy isn't enabled for this Azure Communication Services resource. Follow the tutorial online to enable it. | ExpectedError | See on [how to enable users for Enterprise Voice online and Phone System Voicemail](https://learn.microsoft.com/skypeforbusiness/skype-for-business-hybrid-solutions/plan-your-phone-system-cloud-pbx-solution/enable-users-for-enterprise-voice-online-and-phone-system-voicemail) to enable Teams Enterprise voice policy |
| 41071 | 412 | Failed to start screen share, call isn't in Connected state. Subscribe to the Call's `stateChanged` event to know when the call is connected. | ExpectedError | Helpful links: <br /> - [Check call properties](../../../../how-tos/calling-sdk/manage-calls.md?pivots=platform-web#check-call-properties) <br /> - [Subscribe to SDK events](../../../../how-tos/calling-sdk/events.md?pivots=platform-web)</li></ul> |
| 41073 | 412 | Failed to get or set custom MediaStream, this functionality is currently disabled by Azure Communication Services. | ExpectedError |  |
| 43000 | 412 | Failed to start video, video device is being used by another process/application. Stop your camera from being used in the other process/application and try again. | ExpectedError | Understand more about [how to best deal with a camera being used by another process](../../../../concepts/best-practices.md?tabs=ios\&pivots=platform-web#manage-the-behavior-of-a-camera-that-another-process-is-using) |
| 43001 | 403 | Failed to start video, permission wasn't granted to use selected video device. Ensure video device permissions are allowed in the browser's settings and in the system's settings. | ExpectedError | Ensure camera permissions are allowed in the browser settings and device system settings. <br /> Ensure the cameras aren't disabled in the device system settings. <br /> On macOS, ensure screen recording is allowed from the system settings. <br /> <br /> Helpful links: <br /> - [Request device permissions](../../../../concepts/best-practices.md?tabs=ios\&pivots=platform-web#request-device-permissions)- <br />[Screen sharing permissions on macOS](../../../../concepts/best-practices.md?tabs=ios\&pivots=platform-web#request-device-permissions) <br /> - [Enumerating or accessing devices for Safari on macOS and iOS](../../../../concepts/known-issues.md#enumerating-or-accessing-devices-for-safari-on-macos-and-ios) |
| 43002 | 500 | Failed to start video, unknown error. Try again. If the issue persists, contact Azure Communication Services support. | UnexpectedClientError |  |
| 43004 | 400 | Failed to switch video device, invalid input. Input must be of a VideoDeviceInfo type. | ExpectedError | Use the device manager to get a list of VideoDeviceInfo objects, and then use the VideoDeviceInfo object to switch the source. <br /> <br /> Learn more on [how to start and stop sending local video while on a call](../../../../how-tos/calling-sdk/manage-video.md?pivots=platform-web#start-and-stop-sending-local-video-while-on-a-call) |
| 43005 | 400 | Failed to switch video device, unable to switch to the same video device, it's already selected. | ExpectedError |  |
| 43013 | 412 | Failed to start video, no video devices found. Ensure video devices are plugged in and enabled in the system settings. | ExpectedError | Make sure you have a camera connected and installed on your device. |
| 43014 | 412 | Failed to start video, error requesting media stream. Try again, if issue persists, contact Azure Communication Services support. | UnexpectedClientError |  |
| 43015 | 412 | Failed to start video, media stream request timed out. Allow permission on the browser's prompt to access the camera and try again. | ExpectedError | This error can occur if the user doesn't take action on the browser's permission prompt to allow access to the camera. |
| 43016 | 412 | Failed to start video, permissions denied by system. Ensure video device permissions are allowed in the browser's settings and in the system's settings. | ExpectedError | - Ensure camera permissions are allowed in the browser settings and device system settings. <br /> - Ensure the cameras aren't disabled in the device system settings. <br /> - On macOS, ensure screen recording is allowed from the system settings. <br /> <br /> Helpful links: <br /> - [Request device permissions](../../../../concepts/best-practices.md?tabs=ios\&pivots=platform-web#request-device-permissions) <br /> -[Screen sharing permissions on macOS](../../../../concepts/best-practices.md?tabs=ios\&pivots=platform-web#request-device-permissions) <br /> - [Enumerating or accessing devices for Safari on macOS and iOS](../../../../concepts/known-issues.md#enumerating-or-accessing-devices-for-safari-on-macos-and-ios) |
| 43017 | 412 | Failed to start video, unsupported stream. Try again, if issue persists, contact Azure Communication Services support. | UnexpectedClientError |  |
| 43018 | 412 | Failed to start video, failed to set constraints. Try again, if issue persists, contact Azure Communication Services support. | UnexpectedClientError | Learn more about [how to set video constraints](../../../../quickstarts/voice-video-calling/get-started-video-constraints.md?pivots=platform-web) |
| 43019 | 412 | Failed to start video, no device selected. Ensure to pass a LocalVideoStream constructed with a VideoDeviceInfo and try again. If issue persists, contact Azure Communication Services support. | UnexpectedClientError | Helpful links:<br /> - [Place a call with video camera](../../../../how-tos/calling-sdk/manage-video.md?pivots=platform-web#place-a-call-with-video-camera)<br /> - [Start and stop sending local video while on a call](../../../../how-tos/calling-sdk/manage-video.md?pivots=platform-web#start-and-stop-sending-local-video-while-on-a-call) |
| 43200 | 412 | Failed to render video stream, this stream isn't available. Subscribe to the stream's isAvailable property to get notified when the remote participant has their video on and the stream is available for rendering. | ExpectedError | Helpful links: <br /> - [Render remote participant video/screensharing streams](../../../../how-tos/calling-sdk/manage-video.md?pivots=platform-web#render-remote-participant-videoscreensharing-streams)<br /> - [Add 1\:1 video calling to your app](../../../../quickstarts/voice-video-calling/get-started-with-video-calling.md?pivots=platform-web) <br /> - [Subscribe to SDK events](../../../../how-tos/calling-sdk/events.md?pivots=platform-web) |
| 43202 | 404 | Failed to render video stream, this stream isn't longer available. Remote participant turned off their video. | ExpectedError | The remote participant turned off their video while trying to create a view for it. |
| 43203 | 408 | Failed to render video stream, rendering timed out while waiting for video frames. Try again, if issue persists, contact Azure Communication Services support. | UnexpectedClientError |  |
| 43204 | 500 | Failed to render video stream, failed to subscribe to video on the Azure Communication Services infrastructure. Try again, if issue persists, contact Azure Communication Services support. | UnexpectedClientError |  |
| 43209 | 405 | Failed to render video stream, VideoStreamRenderer was disposed during initialization process. | ExpectedError |  |
| 43210 | 400 | Failed to dispose VideoStreamRenderer because it's already disposed. | ExpectedError |  |
| 43220 | 400 | Failed to create view, maximum number of active `RemoteVideoStream` views already reached. You can dispose of a previous one in order to create new one. | ExpectedError | Learn more about [how to properly support the best number of incoming video streams](../../../../concepts/troubleshooting-info.md?tabs=csharp%2Cjavascript%2Cdotnet#enable-and-access-call-logs) |
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
| 3100 | 410 | Call setup failed due to unexpected network problem on the client, check the client's network and retry. | UnxpectedClientError | Check network configuration, make sure it follows Azure Communication Calling network [requirements](../../../../concepts/voice-video-calling/network-requirements.md). |
| 3101 | 410 | Call dropped due to unexpected network problem on the client, check the client's network and retry. | UnxpectedClientError | Check network configuration, make sure it follows Azure Communication Calling network [requirements](../../../../concepts/voice-video-calling/network-requirements.md). |
| 3111 | 410 | Call setup failed, unable to process media offer while connecting the call. | UnxpectedClientError | Try again. If issue persists, gather [call info](../references/how-to-collect-call-info.md), [client logs](../references/how-to-collect-client-logs.md), [browser console logs](../references/how-to-collect-browser-verbose-log.md) and contact Azure Communication Services support. |
| 3112 | 410 | Call setup failed due to network configuration problem on the client side, check the client's network configuration, and retry. | ExpectedError | Learn more details about a call ending with a subcode of 3112 [here](../call-setup-issues/call-ends-with-410-3112.md). |
| 4097 | 0 | Call ended for all users by the meeting organizer. | Success |  |
| 4502 | 490 | Call failed due to network connectivity problems, browser failed to complete the network HTTP request. | UnexpectedClientError | Client failed to complete HTTP request and response. Try again. If issue persists, gather [call info](../references/how-to-collect-call-info.md), [client logs](../references/how-to-collect-client-logs.md), [browser console logs](../references/how-to-collect-browser-verbose-log.md) and contact Azure Communication Services support. |
| 4506 | 408 | Call timed out. Check if the callee received and accepted the call. | UnexpectedClientError | Try again. If issue persists, gather [call info](../references/how-to-collect-call-info.md), [client logs](../references/how-to-collect-client-logs.md), [browser console logs](../references/how-to-collect-browser-verbose-log.md) and contact Azure Communication Services support. |
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
| 510403 | 403 | Call blocked:<br/> - No matching voice route found for the dialed number.<br/> - Alternate ID not supplied for the call.<br/> - Phone number not allowed by users Session Border Controller (SBC).<br/> - Previously markes as spam and now blocked. | ExpectedError | For more information about Alternate ID, see [Manage calls](../../../../how-tos/calling-sdk/manage-calls.md#place-a-call).<br/> - Confirm that you have a valid Voice Route for the dialed number.<br/> - Make sure that you specified a valid Alternate ID. It must be a phone number that belongs to the Resource you're using.<br/> - Verify that you own the Resource you're using to make a call.<br/> - For direct routing calls, verify why your Session Border Controller disallowed the call.<br/> - Ensure that your Communication Services token is valid and not expired. |
| 540487 | 487 | Call ended successfully as caller canceled the call. | Success |  |
| 560000 | 0 | Call ended successfully by remote PSTN participant. | Success | Possible causes: <br /> - User ended the call. <br /> - Call ended by media agent. |
| 560486 | 486 | Call ended because remote PSTN participant was busy. The number called was already in a call or having technical issues. | Success | - For Direct Routing calls, check your Session Border Control logs and settings and timeouts configuration. Possible causes: The number called was already in a call or having technical issues. |
|  | 404 | Call not found. |  | Ensure that the number you're calling (or call you're joining) exists. |
|  | 408 | Call controller timed out. |  | Call Controller timed out waiting for protocol messages from user endpoints. Ensure clients are connected and available. |
|  | 410 | Local media stack or media infrastructure error. |  | Ensure that you're using the latest SDK in a supported environment. |
|  | 430 | Unable to deliver message to client application. |  | Ensure that the client application is running and available. |
|  | 480 | Remote client endpoint not registered. |  | Ensure that the remote endpoint is available. |
|  | 481 | Failed to handle incoming call. |  | File a support request through the Azure portal. |
|  | 490, 491, 496, 497, 498 | Local endpoint network issues. |  | Check network configuration, make sure it follows Azure Communication Calling network [requirements](../../../../concepts/voice-video-calling/network-requirements.md). |
|  | 500, 503, 504 | Communication Services infrastructure error. |  | File a support request through the Azure portal. |
