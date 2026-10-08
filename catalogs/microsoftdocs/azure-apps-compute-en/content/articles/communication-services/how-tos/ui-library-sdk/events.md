---
title: Handle events in the UI Library
titleSuffix: An Azure Communication Services how-to guide
description: Handle events in the Azure Communication Services UI Library.
author: garchiro7

ms.author: jorgegarc
ms.service: azure-communication-services
ms.subservice: calling
ms.topic: how-to 
ms.date: 09/01/2024
ms.custom: template-how-to
zone_pivot_groups: acs-plat-ios-android

#Customer intent: As a developer, I want to handle events in the UI Library
---

# Subscribe events in the UI Library


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


> **Important:**
> This feature of Azure Communication Services is currently in preview. Features in preview are publicly available and can be used by all new and existing Microsoft customers.
>
> Preview APIs and SDKs are provided without a service-level agreement. We recommend that you don't use them for production workloads. Certain features might not be supported or capabilities might be constrained.
>
> For more information, see [Supplemental Terms of Use for Microsoft Azure Previews](https://azure.microsoft.com/support/legal/preview-supplemental-terms/).


## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- A deployed Communication Services resource. [Create a Communication Services resource](../../quickstarts/create-communication-resource.md).
- A user access token to enable the call client. [Get a user access token](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/quickstarts/access-tokens.md).
- Optional: Completion of the [quickstart for getting started with the UI Library composites](../../quickstarts/ui-library/get-started-composites.md).

## Set up the feature

**Applies to: platform-android**


## Participant joins the call

We expose `addOnRemoteParticipantJoinedEventHandler` to listen if the participant joins the call.

#### [Kotlin](#tab/kotlin)

```kotlin
callComposite.addOnRemoteParticipantJoinedEventHandler { remoteParticipantJoinedEvent -> 
                remoteParticipantJoinedEvent.identifiers.forEach { identifier ->
                    // identifier is communication identifier
                }
            }
```

#### [Java](#tab/java)

```java
    callComposite.addOnRemoteParticipantJoinedEventHandler( (remoteParticipantJoinedEvent) -> {
                for (CommunicationIdentifier identifier: remoteParticipantJoinedEvent.getIdentifiers()) {
                    // identifier is communication identifier
                }
            });
```

---

## Participant left the call

We expose `addOnRemoteParticipantLeftEventHandler` to listen if the participant leaves the call.

#### [Kotlin](#tab/kotlin)

```kotlin
callComposite.addOnRemoteParticipantLeftEventHandler { remoteParticipantLeftEvent -> 
                remoteParticipantLeftEvent.identifiers.forEach { identifier ->
                    // identifier is communication identifier
                }
            }
```

#### [Java](#tab/java)

```java
    callComposite.addOnRemoteParticipantLeftEventHandler( (remoteParticipantLeftEvent) -> {
                for (CommunicationIdentifier identifier: remoteParticipantLeftEvent.getIdentifiers()) {
                    // identifier is communication identifier
                }
            });
```

---



**Applies to: platform-ios**


## Participant joins the call

We expose `onRemoteParticipantJoined` to listen if the participant joins the call.

```swift
let onRemoteParticipantJoinedHandler: ([CommunicationIdentifier]) -> Void = { [weak callComposite] ids in
            guard let composite = callComposite else {
                return
            }
            /// ids are the communication identifiers that has joined and are present in the meeting
        }
callComposite.events.onRemoteParticipantJoined = onRemoteParticipantJoinedHandler
```

## Participant left the call

We expose `onRemoteParticipantLeft` to listen if the participant leaves the call.

```swift
let onRemoteParticipantLeftHandler: ([CommunicationIdentifier]) -> Void = { [weak callComposite] ids in
            guard let composite = callComposite else {
                return
            }
            /// ids are the communication identifiers which have left the meeting just now.
        }
callComposite.events.onRemoteParticipantLeft = onRemoteParticipantLeftHandler
```



## Next steps

- [Learn more about the UI Library](../../concepts/ui-library/ui-library-overview.md)
