---
title: Troubleshoot the UI Library
titleSuffix: An Azure Communication Services how-to guide
description: Use the Azure Communication Services UI Library to get debug information.
author: pavelprystinka
ms.author: pprystinka
ms.service: azure-communication-services
ms.topic: how-to 
ms.custom: template-how-to
ms.date: 11/23/2022
zone_pivot_groups: acs-plat-web-ios-android

#Customer intent: As a developer, I want to get debug information for troubleshooting voice and video calls. 
---

# Troubleshoot the UI Library


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


When you're troubleshooting voice or video calls, you might need to provide a call ID. This ID identifies Azure Communication Services calls. Each call can have multiple call IDs.

In this article, you use the Azure Communication Services UI Library to get essential debugging information.

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- A deployed Communication Services resource. [Create a Communication Services resource](../../quickstarts/create-communication-resource.md).
- A user access token to enable the call client. [Get a user access token](../../quickstarts/identity/access-tokens.md).
- Optional: Completion of the [quickstart for getting started with the UI Library composites](../../quickstarts/ui-library/get-started-composites.md).

## Set up troubleshooting

**Applies to: platform-web**

For detailed documentation and quickstarts about the Web UI Library, see the [Web UI Library Storybook](https://azure.github.io/communication-ui-library).

To learn more, see [Troubleshooting](https://azure.github.io/communication-ui-library/?path=/docs/concepts-troubleshooting--docs) in the Web UI Library.


**Applies to: platform-android**


For more information, see the [open-source Android UI Library](https://github.com/Azure/communication-ui-library-android) and the [sample application code](https://github.com/Azure-Samples/communication-services-android-quickstarts/tree/main/ui-calling).

### Get debug information

You can get the call ID from `CallComposite`.

#### [Kotlin](#tab/kotlin)

```kotlin
val callComposite: CallComposite = CallCompositeBuilder().build()
...
val callHistoryRecords = callComposite.getDebugInfo(context).callHistoryRecords
val callHistoryRecord = callHistoryRecords.lastOrNull()
val callDate = callHistoryRecord.callStartedOn
val callIds = callHistoryRecord.callIds
```

#### [Java](#tab/java)

```java
CallComposite callComposite = new CallCompositeBuilder().build();
...

List<CallCompositeCallHistoryRecord> callHistoryRecords = callComposite.getDebugInfo(context).getCallHistoryRecords();
CallCompositeCallHistoryRecord callHistoryRecord = callHistoryRecords.get(callHistoryRecords.size() - 1);
LocalDateTime callDate = callHistoryRecord.getCallStartedOn();
List<String> callIds = callHistoryRecord.getCallIds();
```



**Applies to: platform-ios**


For more information, see the [open-source iOS UI Library](https://github.com/Azure/communication-ui-library-ios) and the [sample application code](https://github.com/Azure-Samples/communication-services-ios-quickstarts/tree/main/ui-calling).

### Get debug information

You can get the call ID from `CallComposite`.

```swift
let callComposite = CallComposite()
...
let debugInfo = callComposite.debugInfo
let callHistoryRecords = debugInfo.callHistoryRecords
let callHistoryRecord = callHistoryRecords.last
let callDate = callHistoryRecord?.callStartedOn
let callIds = callHistoryRecord?.callIds
```



Users can also find the call ID via the action bar on the bottom of the call screen. For more information, see the [UI Library use cases](../../concepts/ui-library/ui-library-use-cases.md?&pivots=platform-mobile#troubleshooting-guide).

## Next steps
- [Learn more about the UI Library](../../concepts/ui-library/ui-library-overview.md)
- [Learn more about the UI Library Design Kit](../../quickstarts/ui-library/get-started-ui-kit.md)
