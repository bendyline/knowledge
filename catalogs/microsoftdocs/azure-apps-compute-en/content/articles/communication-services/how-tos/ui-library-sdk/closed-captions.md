---
title: Enable scenarios using closed captions and the UI Library
titleSuffix: An Azure Communication Services how-to guide
description: Enable scenarios using closed captions and Azure Communication Services UI Library.
author: garchiro7
ms.author: jorgegarc
ms.service: azure-communication-services
ms.subservice: calling
ms.topic: how-to 
ms.date: 07/01/2024
ms.custom: references_regions
zone_pivot_groups: acs-plat-ios-android

#Customer intent: As a developer, I want setup closed captions into a call using the UI Library.
---

# Closed captions


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


Closed captions play a critical role in video voice calling apps, providing numerous benefits that enhance the accessibility, usability, and overall user experience of these platforms.

In this article, you learn how to enable closed captions scenarios using the UI Library. There's two main scenarios to enable closed captions: Azure Communication Services video and voice calls and Interop calls.

## Azure Communication Service based captions

Supported for calls involving Azure Communication Service users only. Currently, Azure Communication Service captions **do not support language translation**.

## Teams Interop closed captions

Supported during calls with one or more Teams users.

### Translation support

Unlike Azure Communication Service closed captions, Teams Interop closed captions support translation. Users can opt to have closed captions translated into a different language through the captions settings.

## How to use captions

Captions are seamlessly integrated within the `CallingUILibrary`.

1. **Activate captions**:
   - During a connected call, navigate to the control bar and click the **more button**.
   - In the menu pop-up, toggle to turn on captions.

2. **Adjust spoken language**:
   - If a different language is being used in the meeting, users can change the spoken language via the UI. This change applies to all users in the call.

3. **Set caption language** (for Teams Interop Closed Captions):
   - By default, live captions are displayed in the meeting or event spoken language. Live translated captions allow users to see captions translated into the language they’re most comfortable with.
   - Change the caption language by clicking on the **Captions language** button after captions start, if translation to a different language is desired.

Screenshot that shows the experience of closed captions integration in the UI Library.

> **Note:**
> Live translated captions in meetings are only available as part of [**Teams Premium**](https://learn.microsoft.com/MicrosoftTeams/teams-add-on-licensing/licensing-enhance-teams#meetings), an add-on license that provides additional features to make Teams meetings more personalized, intelligent, and secure. To get access to Teams Premium, contact your IT admin. More details you can find it [here](../calling-sdk/closed-captions-teams-interop-how-to.md).

## Supported languages

Azure Communication Services supports various spoken languages for captions. The next table contains the list of supported language codes that you can use with the `setSpokenLanguage` method to set the desired language for captions.

| Language | ACS Spoken Code | Teams Spoken Code | Teams Captions Code |
| --- | --- | --- | --- |
| Arabic | ar-ae, ar-sa | ar-ae, ar-sa | ar |
| Danish | da-dk | da-dk | da |
| German | de-de | de-de | de |
| English | en-au, en-ca, en-gb, en-in, en-nz, en-us | en-au, en-ca, en-gb, en-in, en-nz, en-us | en |
| Spanish | es-es, es-mx | es-es, es-mx | es |
| Finnish | fi-fi | fi-fi | fi |
| French | fr-ca, fr-fr | fr-ca, fr-fr | fr, fr-ca |
| Hindi | hi-in | hi-in | hi |
| Italian | it-it | it-it | it |
| Japanese | ja-jp | ja-jp | ja |
| Korean | ko-kr | ko-kr | ko |
| Norwegian | nb-no | nb-no | nb |
| Dutch | nl-be, nl-nl | nl-be, nl-nl | nl |
| Polish | pl-pl | pl-pl | pl |
| Portuguese | pt-br | pt-br, pt-pt | pt, pt-pt |
| Russian | ru-ru | ru-ru | ru |
| Swedish | sv-se | sv-se | sv |
| Chinese | zh-cn, zh-hk | zh-cn, zh-hk | zh-Hans, zh-Hant |
| Czech | — | cs-cz | cs |
| Slovak | — | sk-sk | sk |
| Turkish | — | tr-tr | tr |
| Vietnamese | — | vi-vn | vi |
| Thai | — | th-th | th |
| Hebrew | — | he-il | he |
| Welsh | — | cy-gb | cy |
| Ukrainian | — | uk-ua | uk |
| Greek | — | el-gr | el |
| Hungarian | — | hu-hu | hu |
| Romanian | — | ro-ro | ro |

Ensure the spoken language selected matches the language used in the call to accurately generate captions.

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- A deployed Communication Services resource. [Create a Communication Services resource](../../quickstarts/create-communication-resource.md).
- A user access token to enable the call client. [Get a user access token](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/quickstarts/access-tokens.md).
- Optional: Completion of the [quickstart for getting started with the UI Library composites](../../quickstarts/ui-library/get-started-composites.md).

## Set up the feature

**Applies to: platform-android**


### Enable closed captions

The method `setCaptionsOn` is configured to start captions by default.

#### [Kotlin](#tab/kotlin)

```kotlin
val captionsOptions = CallCompositeCaptionsOptions()
captionsOptions.setCaptionsOn(true)
captionsOptions.setSpokenLanguage("en-US")

val localOptions = CallCompositeLocalOptions()
localOptions.setCaptionsOptions(captionsOptions)

```

#### [Java](#tab/java)

```java
CallCompositeCaptionsOptions captionsOptions = new CallCompositeCaptionsOptions();
captionsOptions.setCaptionsOn(true);
captionsOptions.setSpokenLanguage("en-us");

CallCompositeLocalOptions localOptions = new CallCompositeLocalOptions();
localOptions.setCaptionsOptions(captionsOptions);
```



**Applies to: platform-ios**


### Enable closed captions

The method `captionsOn` is configured to start captions by default.

```swift
let captionsOptions = CaptionsOptions(
    captionsOn: true, 
    spokenLanguage: "en-US"
)

let localOptions = LocalOptions(
    participantViewData: participantViewData,
    setupScreenViewData: setupScreenViewData,
    cameraOn: false,
    microphoneOn: false,
    skipSetupScreen: false,
    audioVideoMode: .audioAndVideo,
    captionsOptions: captionsOptions
)

```




## Next steps

- [Learn more about the UI Library](../../concepts/ui-library/ui-library-overview.md)
