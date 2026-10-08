---
title: Teams client experience for Teams user
titleSuffix: An Azure Communication Services concept document
description: Teams client experience of Azure Communication Services support for Teams users
author: tomaschladek
ms.author: tchladek
ms.date: 7/9/2022
ms.topic: concept-article
ms.service: azure-communication-services
ms.subservice: teams-interop
---

# Experience for users in Teams client interacting with Teams users


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**

Teams users calling users in the same organization or joining Teams meetings organized in the same organization will be represented in Teams client as any other Teams user. Teams users calling users in trusted organizations or joining Teams meetings organized in trusted organizations will be represented in Teams clients as Teams users from different organizations. Teams users from the other organizations will be marked as "external" in the participant's lists as Teams clients. As Teams users from a trusted organization, their capabilities in the Teams meetings will be limited regardless of the assigned Teams meeting role.

## Joining meetings within the organization
The following image illustrates the experience of a Teams user using Teams client interacting with another Teams user from the same organization using Azure Communication Services SDK who joined Teams meeting.
A diagram that shows how a Teams user on Azure Communication Services connects to a Teams meeting organized by the same organization.

## Joining meetings outside of the organization
The following image illustrates the experience of a Teams user using Teams client interacting with another Teams user from a different organization using Azure Communication Services SDK who joined Teams meeting.
A diagram that shows how Teams user on Azure Communication Services connects to Teams meetings organized by a different organization.

## Start a call to Teams user within the organization
The following image illustrates the experience of a Teams user using Teams client calling another Teams user from the same organization using Azure Communication Services SDK. First, the user opens a chat with the person and selects the call button.
A diagram shows a chat between two Teams users in the same organization.

If callee accepts the call, both users are connected via a 1:1 VoIP call.
A diagram shows the in-call experience of Teams user using Teams client to call another Teams user in the same organization using Azure Communication Services SDKs.

## Start a call to Teams users from different organization
The following image illustrates the experience of a Teams user using Teams client calling another Teams user from a different organization using Azure Communication Services SDK. First, the user opens a chat with the person and selects the call button.
A diagram shows a chat between two Teams users in a different organization.

If callee accepts the call, both users are connected via a 1:1 VoIP call.
A diagram shows the in-call experience of Teams user using Teams client to call another Teams user in a different organization using Azure Communication Services SDKs.

## Incoming call from Teams user within the organization
The following image illustrates the experience of a Teams user using Teams client receiving a notification of an incoming call from another Teams user from the same organization. The caller is using Azure Communication Services SDK. 
A diagram shows incoming call notifications for Teams users using the Teams client. The caller is from the same organization.

## Incoming call from Teams user from a different organization
The following image illustrates the experience of a Teams user using Teams client receiving a notification of an incoming call from another Teams user from a different organization. The caller is using Azure Communication Services SDK. 
A diagram shows incoming call notifications for Teams users using the Teams client. The caller is from a different organization.


## Next steps

> 
> [Get started with calling](../../../quickstarts/voice-video-calling/get-started-with-voice-video-calling-custom-teams-client.md)
