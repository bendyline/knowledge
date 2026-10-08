---
title: Customize the actions from the button bar in the UI Library
titleSuffix: An Azure Communication Services how-to guide
description: Customize the actions from the button bar in the Azure Communication Services UI Library.
author: garchiro7

ms.author: jorgegarc
ms.service: azure-communication-services
ms.subservice: calling
ms.topic: how-to 
ms.date: 08/01/2024
ms.custom: template-how-to
zone_pivot_groups: acs-plat-ios-android

#Customer intent: As a developer, I want to customize button actions in the UI Library.
---

# Customize buttons


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


To implement custom actions or modify the current button layout, you can interact with the Native UI Library's API. This API involves defining custom button configurations, specifying actions, and managing the button bar's current actions. The API provides methods for adding custom actions, and removing existing buttons, all of which are accessible via straightforward function calls.

This functionality provides a high degree of customization, and ensures that the user interface remains cohesive and consistent with the application's overall design.

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- A deployed Communication Services resource. [Create a Communication Services resource](../../quickstarts/create-communication-resource.md).
- A user access token to enable the call client. [Get a user access token](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/quickstarts/access-tokens.md).
- Optional: Completion of the [quickstart for getting started with the UI Library composites](../../quickstarts/ui-library/get-started-composites.md).

## Set up the feature

**Applies to: platform-android**


## Remove buttons

`CallCompositeCallScreenControlBarOptions`, allow the flexibility to customize buttons by removing specific buttons such as camera, microphone, and audio controls. This API allows you to tailor the user interface according to their specific application requirements and user experience design. Just set the `visible` or `enabled` to `false` for the `CallCompositeButtonViewData` to hide or disable button.

Screenshot that shows the experience removing buttons in the UI Library.

#### [Kotlin](#tab/kotlin)
```kotlin
val controlBarOptions = CallCompositeCallScreenControlBarOptions()

val cameraButton = CallCompositeButtonViewData()
    .setVisible(false)

controlBarOptions.setCameraButton(cameraButton)

val callScreenOptions = CallCompositeCallScreenOptions()
    .setControlBarOptions(controlBarOptions)

val localOptions = CallCompositeLocalOptions()
    .setCallScreenOptions(callScreenOptions)

val callComposite = CallCompositeBuilder()
    .build()

callComposite.launch(context, locator, localOptions)
```

#### [Java](#tab/java)
```java
CallCompositeCallScreenControlBarOptions controlBarOptions = new CallCompositeCallScreenControlBarOptions();

CallCompositeButtonOptions cameraButton = new CallCompositeButtonViewData()
        .setVisible(false);

controlBarOptions.setCameraButton(cameraButton);

CallCompositeCallScreenOptions callScreenOptions = new CallCompositeCallScreenOptions()
        .setControlBarOptions(controlBarOptions);

CallCompositeLocalOptions localOptions = new CallCompositeLocalOptions()
        .setCallScreenOptions(callScreenOptions);

CallComposite callComposite = new CallCompositeBuilder()
        .build();

callComposite.launch(context, locator, localOptions);
```
---
Button can be updated after launching call composite.

#### [Kotlin](#tab/kotlin)
```kotlin
cameraButton.setVisible(true)
```

#### [Java](#tab/java)
```java
cameraButton.setVisible(true);
```

---

## Add custom actions

`Call composite` is using Fluent UI icons. You can download the icons directly from [the Fluent UI GitHub repository](https://github.com/microsoft/fluentui-system-icons/) and incorporate them into your project as needed. This approach guarantees visual consistency across all user interface elements, enhancing the overall user experience.

Screenshot that shows the experience when you add a new button the UI Library.

#### [Kotlin](#tab/kotlin)
```kotlin

// Custom header button
val headerCustomButton =
    CallCompositeCustomButtonViewData(
        "headerCustomButton",
        R.drawable.my_header_button_icon,
        "My header button",
        fun(it: CallCompositeCustomButtonClickEvent) {
            // process my button onClick
        }
    )

val headerOptions = CallCompositeCallScreenHeaderViewData()
    .setCustomButtons(listOf(headerCustomButton))

// Custom control bar button
val controlBarOptions = CallCompositeCallScreenControlBarOptions()

controlBarOptions.setCustomButtons(
    listOf(
        CallCompositeCustomButtonViewData(
            "customButtonId",
            R.drawable.my_button_image,
            "My button",
            fun(it: CallCompositeCustomButtonClickEvent) {
                // Process my button onClick
            },
        )
    )
)

val callScreenOptions = CallCompositeCallScreenOptions()
    .setHeaderViewData(headerOptions)
    .setControlBarOptions(controlBarOptions)

val localOptions = CallCompositeLocalOptions()
    .setCallScreenOptions(callScreenOptions)

val callComposite = CallCompositeBuilder()
    .build()

callComposite.launch(context, locator, localOptions)
```

#### [Java](#tab/java)
```java
// Custom header button
List<CallCompositeCustomButtonViewData> headerCustomButtons = new ArrayList<>();
headerCustomButtons.add(
        new CallCompositeCustomButtonViewData(
                "headerCustomButton",
                R.drawable.my_header_button_icon,
                "My header button",
                eventArgs -> {
                    // process my button onClick
                }
        )
);
CallCompositeCallScreenHeaderViewData headerOptions = new CallCompositeCallScreenHeaderViewData()
        .setCustomButtons(headerCustomButtons);

// Custom control bar button
CallCompositeCallScreenControlBarOptions controlBarOptions = new CallCompositeCallScreenControlBarOptions();

List<CallCompositeCustomButtonViewData> customButtons = new ArrayList<>();
customButtons.add(
        new CallCompositeCustomButtonViewData(
                "customButtonId",
                R.drawable.my_button_image,
                "My button",
                eventArgs -> {
                    // process my button onClick
                }
        )
);

controlBarOptions.setCustomButtons(customButtons);

CallCompositeCallScreenOptions callScreenOptions = new CallCompositeCallScreenOptions()
        .setHeaderViewData(headerOptions)
        .setControlBarOptions(controlBarOptions);

CallCompositeLocalOptions localOptions = new CallCompositeLocalOptions()
        .setCallScreenOptions(callScreenOptions);

CallComposite callComposite = new CallCompositeBuilder()
        .build();

callComposite.launch(context, locator, localOptions);
```

---

Similar to `Call composite` provided buttons, custom buttons are updatable after the launch.



#### [Kotlin](#tab/kotlin)

```kotlin
customButton.setVisible(true)
```

#### [Java](#tab/java)
```java
customButton.setVisible(true);
```


**Applies to: platform-ios**



## Remove or disable buttons

`CallScreenControlBarOptions`, allow the flexibility to customize buttons by removing specific buttons such as camera, microphone, and audio controls. This API allows you to tailor the user interface according to their specific application requirements and user experience design. Just set the `visible` or `enabled` to `false` for the `ButtonViewData` to hide or disable button.

Screenshot that shows the experience removing buttons in the UI Library.

```swift
let cameraButton = ButtonViewData(visible: false)

let callScreenControlBarOptions = CallScreenControlBarOptions(
    cameraButton: cameraButton
)

let callScreenOptions = CallScreenOptions(controlBarOptions: callScreenControlBarOptions)
let localOptions = LocalOptions(callScreenOptions: callScreenOptions)

let callComposite = CallComposite(credential: credential)
callComposite.launch(locator: .roomCall(roomId: "..."), localOptions: localOptions)
```

Button can be updated after launching call composite.

```swift
cameraButton.visible = true
```

## Add custom actions

`Call composite` is using Fluent UI icons. You can download the icons directly from [the Fluent UI GitHub repository](https://github.com/microsoft/fluentui-system-icons/) and incorporate them into your project as needed. This approach guarantees visual consistency across all user interface elements, enhancing the overall user experience.

Screenshot that shows the experience when you add a new button the UI Library.

```swift
// Custom header button
let headerCustomButton = CustomButtonViewData(image: UIImage(named: "...")!,
                                              title: "My header button") {_ in
    // Process my button onClick
}
let callScreenHeaderViewData = CallScreenHeaderViewData(
    customButtons: [headerCustomButton]
)

// Custom control bar button
let customButton = CustomButtonViewData(image: UIImage(named: "...")!,
                                        title: "My button") {_ in
    // Process my button onClick
}

let callScreenControlBarOptions = CallScreenControlBarOptions(
    customButtons: [customButton]
)

let callScreenOptions = CallScreenOptions(
    controlBarOptions: callScreenControlBarOptions, headerViewData: callScreenHeaderViewData)

let localOptions = LocalOptions(callScreenOptions: callScreenOptions)

let callComposite = CallComposite(credential: credential)
callComposite.launch(locator: .roomCall(roomId: "..."), localOptions: localOptions)
```

Similar to `Call composite` provided buttons, custom buttons are updatable after the launch.

```swift
customButton.enabled = true
```



## Next steps

- [Learn more about the UI Library](../../concepts/ui-library/ui-library-overview.md)
