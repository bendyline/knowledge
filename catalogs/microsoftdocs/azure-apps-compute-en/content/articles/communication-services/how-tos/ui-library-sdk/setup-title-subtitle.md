---
title: Customize the title and subtitle of the call bar in the UI Library
titleSuffix: An Azure Communication Services how-to guide
description: Customize the title and subtitle of the call in the Azure Communication Services UI Library.
author: garchiro7

ms.author: jorgegarc
ms.service: azure-communication-services
ms.subservice: calling
ms.topic: how-to 
ms.date: 09/01/2024
ms.custom: template-how-to
zone_pivot_groups: acs-plat-ios-android

#Customer intent: As a developer, I want to customize the title and subtitle of the call in the UI Library
---

# Customize the title and subtitle 


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


Developers now have the capability to customize the title and subtitle of a call, both during setup and while the call is in progress. This feature allows for greater flexibility in aligning the call experience with specific use cases.

For instance, in a customer support scenario, the title could display the issue being addressed, while the subtitle could show the customer's name or ticket number.

Screenshot that shows the experience of title and subtitle in the UI Library.

Additionally, if tracking time spent in various segments of the call is crucial, the subtitle could dynamically update to display the elapsed call duration, helping to manage the meeting or session effectively.

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- A deployed Communication Services resource. [Create a Communication Services resource](../../quickstarts/create-communication-resource.md).
- A user access token to enable the call client. [Get a user access token](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/quickstarts/access-tokens.md).
- Optional: Completion of the [quickstart for getting started with the UI Library composites](../../quickstarts/ui-library/get-started-composites.md).

## Set up the feature

**Applies to: platform-android**


## Customize title and subtitle

To set and update call screen header `title` and `subtitle`, utilize `CallCompositeCallScreenOptions` to configure `CallCompositeCallScreenHeaderViewData`. Default UI library title is displayed if `title` value isn't configured.

#### [Kotlin](#tab/kotlin)

```kotlin
// create call screen header view data to set title and subtitle
val callScreenHeaderViewData = CallCompositeCallScreenHeaderViewData()
callScreenHeaderViewData.title = "title"
callScreenHeaderViewData.subtitle = "subtitle"

// create call screen options
val callScreenOptions = CallCompositeCallScreenOptions()
callScreenOptions.setHeaderViewData(callScreenHeaderViewData)

// create call composite
val callComposite = CallCompositeBuilder().build()

val localOptions = CallCompositeLocalOptions()
localOptions.setCallScreenOptions(callScreenOptions)

// launch composite
callComposite.launch(applicationContext, locator, localOptions)

// use any event from call composite to update title subtitle when call is in progress
// callScreenHeaderViewData.title = "updated title"
// callScreenHeaderViewData.subtitle = "updated subtitle"
```

#### [Java](#tab/java)
```java
// Create call screen header view data to set title and subtitle
CallCompositeCallScreenHeaderViewData callScreenHeaderViewData = new CallCompositeCallScreenHeaderViewData();
callScreenHeaderViewData.setTitle("title");
callScreenHeaderViewData.setSubtitle("subtitle");

// Create call screen options
CallCompositeCallScreenOptions callScreenOptions = new CallCompositeCallScreenOptions();
callScreenOptions.setHeaderOptions(callScreenHeaderViewData);

// Create call composite
CallComposite callComposite = new CallCompositeBuilder().build();

CallCompositeLocalOptions localOptions = new CallCompositeLocalOptions();
localOptions.setCallScreenOptions(callScreenOptions);

// Launch composite
callComposite.launch(getApplicationContext(), locator, localOptions);

// Use any event from call composite to update title and subtitle when the call is in progress
// callScreenHeaderViewData.setTitle("updated title");
// callScreenHeaderViewData.setSubtitle("updated subtitle");
```

---



**Applies to: platform-ios**


## Customize title and subtitle

To set and update call screen infoHeader `title` & `subtitle`, we have `CallScreenHeaderViewData` to configure and pass to `CallScreenOptions` by param `headerViewData`. The `title`, `Subtitle` in `CallScreenHeaderViewData` are optional parameters and `headerViewData` itself is optional as well. Default UI library title is displayed if `title` value isn't configured.

```swift
var headerViewData = CallScreenHeaderViewData(
            title: "This is a custom InfoHeader",
            subtitle: "This is a custom subtitle")
var callScreenOptions = CallScreenOptions(controlBarOptions: barOptions,
                                          headerViewData: headerViewData)

// Use any event from call composite to update title & subtitle when the call is in progress.
headerViewData.title = "Custom updated title"
headerViewData.subtitle = "Custom updated subtitle"
```



## Next steps

- [Learn more about the UI Library](../../concepts/ui-library/ui-library-overview.md)
