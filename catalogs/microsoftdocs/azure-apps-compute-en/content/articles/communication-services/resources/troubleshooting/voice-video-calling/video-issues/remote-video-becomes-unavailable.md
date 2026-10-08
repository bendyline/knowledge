---
title: Video issues - The remote video becomes unavailable while subscribing the video
titleSuffix: Azure Communication Services - Troubleshooting Guide
description: Learn how to handle the error when the remote video becomes unavailable while subscribing the video.
author: enricohuang
ms.author: enricohuang

services: azure-communication-services
ms.date: 04/05/2024
ms.topic: troubleshooting
ms.service: azure-communication-services
ms.subservice: calling
---
# The remote video becomes unavailable while subscribing the video


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**

The remote video is initially available, but during the video subscription process, it becomes unavailable.

The SDK detects this change and throws an error.

This error is expected from SDK's perspective as the remote endpoint stops sending the video.
## How to detect using the SDK
If the video becomes unavailable before the [`createView`](https://learn.microsoft.com/javascript/api/azure-communication-services/@azure/communication-calling/videostreamrenderer?view=azure-communication-services-js\&preserve-view=true#@azure-communication-calling-videostreamrenderer-createview) API finishes, the [`createView`](https://learn.microsoft.com/javascript/api/azure-communication-services/@azure/communication-calling/videostreamrenderer?view=azure-communication-services-js\&preserve-view=true#@azure-communication-calling-videostreamrenderer-createview) API throws an error.

| error | Details |
| --- | --- |
| code | 404(Not Found) |
| subcode | 43202 |
| message | Failed to start stream, stream became unavailable |
| resultCategories | Expected |

## How to mitigate or resolve
Your applications should catch and handle this error thrown by the SDK gracefully, so end users know the failure is because the remote participant stops sending video.
