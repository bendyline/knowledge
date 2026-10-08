---
title: Inbound calling capabilities - Azure Communication Services
description: Enable inbound PSTN and direct routing calling for different endpoints in Azure Communication Services.
author: boris-bazilevskiy
manager: rcole
services: azure-communication-services

ms.author: krkutser
ms.date: 06/22/2023
ms.topic: feature-guide
ms.service: azure-communication-services
ms.subservice: pstn
---

# Enable inbound telephony calling for Azure Communication Services.


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


Inbound PSTN calling is currently supported in GA for Dynamics Omnichannel and Call Automation SDK. You can use phone numbers [provided by Microsoft](telephony-concept.md#teams-phone-connectivity) and phone numbers supplied by [direct routing](telephony-concept.md#teams-phone-connectivity).

**Inbound calling with Omnichannel for Customer Service**

Supported in General Availability, to set up inbound calling in Omnichannel for Customer Service with direct routing or Voice Calling (PSTN) follow [these instructions](https://learn.microsoft.com/dynamics365/customer-service/voice-channel-inbound-calling).

**Inbound calling with Azure Communication Services Call Automation SDK**

Call Automation enables you to build custom calling workflows within your applications to optimize business processes and boost customer satisfaction. The library supports managing incoming calls to the phone numbers acquired from Communication Services and incoming calls via direct routing. You can also use Call Automation to place outbound calls from the phone numbers owned by your resource, among other capabilities.   

Learn more about [Call Automation](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/concepts/voice-video-calling/call-automation.md), supported in General Availability.

**Inbound calling with Power Virtual Agents**

*Coming soon*
