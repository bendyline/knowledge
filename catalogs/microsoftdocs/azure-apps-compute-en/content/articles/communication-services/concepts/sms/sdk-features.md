---
title: SMS SDK overview
titleSuffix: An Azure Communication Services article
description: This article describes the short message service (SMS) software development kit (SDK) and its offerings.
author: probableprime
manager: chpalm
services: azure-communication-services

ms.author: prakulka
ms.date: 04/10/2025
ms.topic: concept-article
ms.service: azure-communication-services
ms.subservice: sms
---
# SMS SDK overview


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


> **Important:**
> SMS and PSTN capabilities depend on the phone number you use and the country/region that you're operating within as determined by your Azure billing address. For more information, visit the [Subscription eligibility](../numbers/sub-eligibility-number-capability.md) documentation.


This article describes how you can use the Azure Communication Services short message service (SMS) software development kits (SDKs) to add SMS messaging to your applications.

## SMS SDK capabilities

The following table describes the set of features that are currently available in our SMS SDKs.

| Group of features | Capability | JS | Java | .NET | Python |
| --- | --- | --- | --- | --- | --- |
| Core Capabilities | Send and receive SMS messages | ✔️ | ✔️ | ✔️ | ✔️ |
|  | Enable Delivery Reports for messages sent | ✔️ | ✔️ | ✔️ | ✔️ |
|  | All character sets (language/unicode support) | ✔️ | ✔️ | ✔️ | ✔️ |
|  | Support for long messages (up to 2,048 bytes) | ✔️ | ✔️ | ✔️ | ✔️ |
|  | Autoconcatenation of long messages | ✔️ | ✔️ | ✔️ | ✔️ |
|  | Send messages to multiple recipients at a time | ✔️ | ✔️ | ✔️ | ✔️ |
|  | Support for idempotency | ✔️ | ✔️ | ✔️ | ✔️ |
|  | Custom tags for messages. | ✔️ | ✔️ | ✔️ | ✔️ |
| Events | Use Event Grid to configure webhooks to receive inbound messages and delivery reports | ✔️ | ✔️ | ✔️ | ✔️ |
| Phone Number | Toll-Free numbers, Short Codes | ✔️ | ✔️ | ✔️ | ✔️ |
| PSTN Calling | Add public stitched telephone network (PSTN) calling capabilities to your SMS-enabled toll-free number | ✔️ | ✔️ | ✔️ | ✔️ |

## Next steps

> 
> [Send SMS messages](../../quickstarts/sms/send.md)

## Related articles

- Learn about [SMS concepts](concepts.md).
- Get an SMS capable [phone number](../../quickstarts/telephony/get-phone-number.md).
- [Phone number types in Azure Communication Services](../telephony/plan-solution.md).
> **Tip:**
> For global SMS delivery and partner-managed options, check out [Messaging Connect](messaging-connect.md).
