---
title: Set screen orientation by using the UI Library
titleSuffix: An Azure Communication Services how-to guide
description: Use the Azure Communication Services UI Library to set screen orientation in an application.
author: mbellah
ms.author: mbellah
ms.service: azure-communication-services
ms.topic: how-to 
ms.date: 05/24/2022
ms.custom: template-how-to
zone_pivot_groups: acs-plat-ios-android

#Customer intent: As a developer, I want to set the orientation of the pages in my application.
---

# Set screen orientation in an application


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


The Azure Communication Services UI Library enables developers to set the orientation of screens in an application. You can specify screen orientation mode on the call setup screen and on the call screen of the UI Library.

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- A deployed Communication Services resource. [Create a Communication Services resource](../../quickstarts/create-communication-resource.md).
- A user access token to enable the call client. [Get a user access token](../../quickstarts/identity/access-tokens.md).
- Optional: Completion of the [quickstart for getting started with the UI Library composites](../../quickstarts/ui-library/get-started-composites.md).

## Set the screen orientation

**Applies to: platform-android**


For more information, see the [open-source Android UI Library](https://github.com/Azure/communication-ui-library-android) and the [sample application code](https://github.com/Azure-Samples/communication-services-android-quickstarts/tree/main/ui-calling).

### Available orientations

The following table lists `CallCompositeSupportedScreenOrientation` types for out-of-the-box orientations. If you want to set the orientation of the various screens of the composite, set `CallCompositeSupportedScreenOrientation` to `CallComposite`.

| Orientation mode | CallCompositeSupportedScreenOrientation type |
| --- | --- |
| `PORTRAIT` | `CallCompositeSupportedScreenOrientation.PORTRAIT` |
| `LANDSCAPE` | `CallCompositeSupportedScreenOrientation.LANDSCAPE` |
| `REVERSE_LANDSCAPE` | `CallCompositeSupportedScreenOrientation.REVERSE_LANDSCAPE` |
| `USER_LANDSCAPE` | `CallCompositeSupportedScreenOrientation.USER_LANDSCAPE` |
| `FULL_SENSOR` | `CallCompositeSupportedScreenOrientation.FULL_SENSOR` |
| `USER` | `CallCompositeSupportedScreenOrientation.USER` |

### Orientation API

`CallCompositeSupportedScreenOrientation` is a custom type for the Android UI Library. The name for the orientation type is defined by keeping similarity with the names of the Android platform's orientation modes.

By default, the setup screen orientation is in `PORTRAIT` mode and the calling screen is in `USER` mode. To set a different orientation for the screens, you can pass `CallCompositeSupportedScreenOrientation`. Out of the box, the UI Library includes a set of `CallCompositeSupportedScreenOrientation` types that are usable with the composite.

You can also get a list of `CallCompositeSupportedScreenOrientation` types by using the static function `CallCompositeSupportedScreenOrientation.values()`.

To set the orientation, specify `CallCompositeSupportedScreenOrientation` and pass it to `CallCompositeBuilder`. The following example sets `FULL_SENSOR` for the setup screen and `LANDSCAPE` for the calling screen of the composite.

#### [Kotlin](#tab/kotlin)

```kotlin
import com.azure.android.communication.ui.calling.models.CallCompositeSupportedScreenOrientation

// CallCompositeSupportedLocale provides a list of supported locales
val callComposite: CallComposite =
            CallCompositeBuilder()
            .setupScreenOrientation(CallCompositeSupportedScreenOrientation.FULL_SENSOR)
            .callScreenOrientation(CallCompositeSupportedScreenOrientation.LANDSCAPE)
            .build()
```

#### [Java](#tab/java)

```java
import com.azure.android.communication.ui.calling.models.CallCompositeSupportedScreenOrientation;

// CallCompositeSupportedLocale provides a list of supported locales
CallComposite callComposite = 
    new CallCompositeBuilder()
        .setupScreenOrientation(CallCompositeSupportedScreenOrientation.FULL_SENSOR)
        .callScreenOrientation(CallCompositeSupportedScreenOrientation.LANDSCAPE)
        .build();
```



**Applies to: platform-ios**


For more information, see the [open-source iOS UI Library](https://github.com/Azure/communication-ui-library-ios) and the [sample application code](https://github.com/Azure-Samples/communication-services-ios-quickstarts/tree/main/ui-calling).

### Available orientations

The following table lists `OrientationOptions` types for out-of-the-box orientations. If you want to set the orientation of the various screens of the composite, set `OrientationOptions` to `CallComposite`.

| Orientation mode | OrientationOptions type |
| --- | --- |
| `portrait` | `OrientationOptions.portrait` |
| `landscape` | `OrientationOptions.landscape` |
| `landscapeRight` | `OrientationOptions.landscapeRight` |
| `landscapeLeft` | `OrientationOptions.landscapeLeft` |
| `allButUpsideDown` | `OrientationOptions.allButUpsideDown` |

### Orientation API

`OrientationOptions` is a custom type for the iOS UI Library. The name for the orientation type is defined by keeping similarity with the names of the iOS platform's orientation modes.

By default, the setup screen orientation is in `portrait` mode and the calling screen is in `allButUpsideDown` mode. To set a different orientation for the screens, you can pass `OrientationOptions`. Out of the box, the UI Library includes a set of `OrientationOptions` types that are usable with the composite.

```swift

let callCompositeOptions = CallCompositeOptions(localization: localizationConfig,
                                                setupScreenOrientation: OrientationOptions.portrait,
                                                callingScreenOrientation: OrientationOptions.allButUpsideDown)
let callComposite = CallComposite(withOptions: callCompositeOptions)
```



## Next steps

- [Learn more about the UI Library](../../concepts/ui-library/ui-library-overview.md)
