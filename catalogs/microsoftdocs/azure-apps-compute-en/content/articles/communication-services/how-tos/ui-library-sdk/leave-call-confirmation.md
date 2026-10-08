---
title: Disable the left call confirmation prompt when clicking the end call button in the UI Library
titleSuffix: An Azure Communication Services how-to guide
description: Disable the left call confirmation prompt in the Azure Communication Services UI Library.
author: garchiro7
ms.author: jorgegarc
ms.service: azure-communication-services
ms.subservice: calling
ms.topic: how-to 
ms.date: 05/01/2024
ms.custom: template-how-to
zone_pivot_groups: acs-plat-ios-android

#Customer intent: As a developer, I want disable the leave call confirmation prompt when clicking the end call button in the UI Library.
---

# Disable the call confirmation prompt in an application


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


The Azure Communication Services UI Library offers the option to disable the left call confirmation prompt, by default the UI Library show a prompt asking the user to confirm the end of the call; one common customization might involve streamlining the user experience, such as disabling the left call confirmation prompt when a user decide to end the call. This adjustment can make the call termination process quicker and reduce friction for users who are accustomed to instant actions.

In this article, you learn how to disable the left call confirmation prompt.

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- A deployed Communication Services resource. [Create a Communication Services resource](../../quickstarts/create-communication-resource.md).
- A user access token to enable the call client. [Get a user access token](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/quickstarts/access-tokens.md).
- Optional: Completion of the [quickstart for getting started with the UI Library composites](../../quickstarts/ui-library/get-started-composites.md).

## Set up the feature

**Applies to: platform-android**


### Disabling Leave Call Confirmation

To disable the left call confirmation prompt when clicking the end call button, utilize `CallCompositeCallScreenOptions` to configure `CallCompositeCallScreenControlBarOptions`. Set `CallCompositeLeaveCallConfirmationMode.ALWAYS_DISABLED` as the constructor parameter. By default, the UI library employs `CallCompositeLeaveCallConfirmationMode.ALWAYS_ENABLED`.

#### [Kotlin](#tab/kotlin)

```kotlin
val callScreenOptions = CallCompositeCallScreenOptions(
            CallCompositeCallScreenControlBarOptions()
                .setLeaveCallConfirmation(CallCompositeLeaveCallConfirmationMode.ALWAYS_DISABLED)
        )

val callComposite: CallComposite =
            CallCompositeBuilder()
            .callScreenOptions(callScreenOptions)
            .build()
```

#### [Java](#tab/java)

```java
CallComposite callComposite = 
    new CallCompositeBuilder()
        .callScreenOptions(new CallCompositeCallScreenOptions(
            new CallCompositeCallScreenControlBarOptions()
                .setLeaveCallConfirmation(CallCompositeLeaveCallConfirmationMode.ALWAYS_DISABLED)
        ))
        .build();
```

This setup ensures that the left call confirmation prompt is disabled upon clicking the end call button.


**Applies to: platform-ios**


### Disabling Leave Call Confirmation

To disable the left call confirmation prompt triggered by clicking the end call button, utilize the `CallScreenOptions` class to configure the `CallScreenControlBarOptions`. Set the `LeaveCallConfirmationMode` parameter to `alwaysDisabled`. By default, the UI library enables `LeaveCallConfirmationMode` as `alwaysEnabled`.

```swift
let callCompositeOptions = CallCompositeOptions(
    callScreenOptions: CallScreenOptions(
        controlBarOptions: CallScreenControlBarOptions(
            leaveCallConfirmationMode: LeaveCallConfirmationMode.alwaysDisabled
        )
    )
)

let callComposite = CallComposite(withOptions: callCompositeOptions)
```

This setup ensures that the left call confirmation prompt is disabled when the end call button is clicked.


## Next steps

- [Learn more about the UI Library](../../concepts/ui-library/ui-library-overview.md)
