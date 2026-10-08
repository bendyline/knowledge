---
title: Inject a custom data model in the UI Library
titleSuffix: An Azure Communication Services how-to guide
description: Set up custom data model injection in the Azure Communication Services UI Library.
author: garchiro7
ms.author: jorgegarc
ms.service: azure-communication-services
ms.topic: how-to 
ms.date: 05/24/2022
ms.custom: template-how-to
zone_pivot_groups: acs-plat-web-ios-android

#Customer intent: As a developer, I want to set up custom data model injection in the UI Library for my application.
---

# Inject a custom data model in the UI library for an application


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


Azure Communication Services uses an identity-agnostic model in which developers can [bring their own identities](../../concepts/identity-model.md). Developers can get their data model and link it to Azure Communication Services identities. The data model for a user most likely includes information such as display name, profile picture or avatar, and other details. Developers use this information to build their applications and platforms.

The UI Library makes it simple for you to inject a user data model into the UI components. When you render the UI components, they show users the provided information rather than generic information from Azure Communication Services.

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- A deployed Communication Services resource. [Create a Communication Services resource](../../quickstarts/create-communication-resource.md).
- A user access token to enable the call client. [Get a user access token](../../quickstarts/identity/access-tokens.md).
- Optional: Completion of the [quickstart for getting started with the UI Library composites](../../quickstarts/ui-library/get-started-composites.md).

## Set up injection

**Applies to: platform-web**


For detailed documentation and quickstarts about the Web UI Library, see the [Web UI Library Storybook](https://azure.github.io/communication-ui-library).

To learn more, see [Custom User Data Model](https://azure.github.io/communication-ui-library/?path=/docs/concepts-custom-user-data-model--docs) in the Web UI Library.



**Applies to: platform-android**


For more information, see the [open-source Android UI Library](https://github.com/Azure/communication-ui-library-android) and the [sample application code](https://github.com/Azure-Samples/communication-services-android-quickstarts/tree/main/ui-calling).

### Local participant view customization

The UI Library gives developers the ability to provide a customized experience regarding participant information. At launch, you can optionally inject local participant data. This local data isn't shared with the server, and you can use it to customize the display name and avatar of the local user.

#### Local options

`CallCompositeLocalOptions` is the data model that can have `CallCompositeParticipantViewData` and `CallCompositeSetupScreenViewData`. It represents the local participant.

By default, for remote participants, the UI Library displays `displayName` information injected in `RemoteOptions`. This information is sent to the Azure Communication Services back-end server. If `CallCompositeParticipantViewData` is injected, the participant `displayName` and `avatar` information is displayed in all avatar components locally.

Similarly, for `CallCompositeSetupScreenViewData`, `title` and `subtitle` in `CallCompositeSetupScreenViewData` overwrite the navigation bar's title and subtitle on the premeeting screen, respectively. By default, the UI Library displays **Setup** as the title and nothing as the subtitle.

#### Local participant view data

`CallCompositeParticipantViewData` is a class that sets `displayName`, `avatarBitmap`, and `scaleType` for avatar control. This class is passed to `CallCompositeLocalOptions` in order to customize the local participants' view information. This class is held in the `CallCompositeLocalOptions` object that represents options used locally on the device that makes the call.

This instance of `displayName` differs from the `displayName` information passed in via `CallCompositeRemoteOptions`:

- The `CallCompositeParticipantViewData` instance of `displayName` is only used locally as an override.
- The `CallCompositeRemoteOptions` instance of `displayName` is passed to the server and shared with other participants.

If you don't provide the `CallCompositeParticipantViewData` instance of `displayName`, the application uses the `CallCompositeRemoteOptions` instance of `displayName`.

#### Setup screen view data

`CallCompositeSetupScreenViewData` is an object that sets `title` and `subtitle` for the navigation bar on the call setup screen. If `subtitle` isn't defined, the subtitle is hidden. Here, `title` is required to set `subtitle`, but `subtitle` is optional when `title` is set. This class is locally stored, and its information isn't sent to the server.

#### Usage

To use `CallCompositeLocalOptions`, pass the instance of `CallCompositeParticipantViewData` and/or `CallCompositeSetupScreenViewData`, and inject `CallCompositeLocalOptions` to `callComposite.launch`.

#### [Kotlin](#tab/kotlin)

```kotlin
val participantViewData: CallCompositeParticipantViewData = CallCompositeParticipantViewData()
    .setAvatarBitmap((Bitmap) avatarBitmap)
    .setScaleType((ImageView.ScaleType) scaleType)
    .setDisplayName((String) displayName)

val setupScreenViewData: CallCompositeSetupScreenViewData = CallCompositeSetupScreenViewData()
    .setTitle((String) title)
    .setSubtitle((String) subTitle)

val localOptions: CallCompositeLocalOptions = CallCompositeLocalOptions()
    .setParticipantViewData(participantViewData)
    .setSetupScreenViewData(setupScreenViewData)

callComposite.launch(callLauncherActivity, remoteOptions, localOptions)
```

#### [Java](#tab/java)

```java
final CallCompositeParticipantViewData participantViewData = new CallCompositeParticipantViewData()
    .setAvatarBitmap((Bitmap) avatarBitmap)
    .setScaleType((ImageView.ScaleType) scaleType)
    .setDisplayName((String) displayName);

final CallCompositeSetupScreenViewData setupScreenViewData = new CallCompositeSetupScreenViewData()
    .setTitle((String) title)
    .setSubtitle((String) subTitle);

final CallCompositeLocalOptions localOptions = new CallCompositeLocalOptions()
    .setParticipantViewData(participantViewData)
    .setSetupScreenViewData(setupScreenViewData);

callComposite.launch(callLauncherActivity, remoteOptions, localOptions);
```

---

| Setup view | Calling experience view |
| --- | --- |
| Screenshot of Android data custom model injection. | Screenshot of Android data custom model injection with name. |

### Remote participant view customization

In some instances, you might want to provide local overrides for remote participants to allow custom avatars and titles.

The process is similar to the local participant process, but the data is set when participants join the call. As a developer, you would need to add a listener when remote participants join the call, and then call a method to set `CallCompositeParticipantViewData` for those remote users.

#### Usage

To set the view data for remote participants, set `setOnRemoteParticipantJoinedHandler`. On remote participant join, use `setRemoteParticipantViewData` for `callComposite` to inject view data for remote participants. The participant identifier [CommunicationIdentifier](https://azure.github.io/azure-sdk-for-android/azure-communication-common/index.html) uniquely identifies a remote participant.

Calls to `setRemoteParticipantViewData` return a result of `CallCompositeSetParticipantViewDataResult`, which has the following values:

- `CallCompositeSetParticipantViewDataResult.SUCCESS`
- `CallCompositeSetParticipantViewDataResult.PARTICIPANT_NOT_IN_CALL`

#### [Kotlin](#tab/kotlin)

```kotlin
callComposite.addOnRemoteParticipantJoinedEventHandler { remoteParticipantJoinedEvent -> 
                remoteParticipantJoinedEvent.identifiers.forEach { identifier ->
                    // get displayName, bitmap for identifier
                    callComposite.setRemoteParticipantViewData(identifier,
                        CallCompositeParticipantViewData().setDisplayName("displayName")) // setAvatarBitmap for bitmap
                }
            }
```

#### [Java](#tab/java)

```java
    callComposite.addOnRemoteParticipantJoinedEventHandler( (remoteParticipantJoinedEvent) -> {
                for (CommunicationIdentifier identifier: remoteParticipantJoinedEvent.getIdentifiers()) {
                    // get displayName, bitmap for identifier
                    callComposite.setRemoteParticipantViewData(identifier,
                            new CallCompositeParticipantViewData().setDisplayName("displayName")); // setAvatarBitmap for bitmap
                }
            });
```

---

| Participants list |
| --- |
| Screenshot of Android remote participant view data injection. |



**Applies to: platform-ios**


For more information, see the [open-source iOS UI Library](https://github.com/Azure/communication-ui-library-ios) and the [sample application code](https://github.com/Azure-Samples/communication-services-ios-quickstarts/tree/main/ui-calling).

### Local participant view data injection

The UI Library gives developers the ability to provide a customized experience. At launch, you can inject optional local data options. This object can contain a UI image that represents the avatar to render and a display name to optionally display instead. None of this information is sent to Azure Communication Services. It's held locally in the UI Library.

#### Local options

`LocalOptions` is a data model that consists of `ParticipantViewData` and `SetupScreenViewData`.

For `ParticipantViewData`, by default, the UI Library displays `displayName` information injected in `RemoteOptions`. This information is sent to the Azure Communication Services back-end server. If `ParticipantViewData` is injected, the participant `displayName` and `avatar` information is displayed in all avatar components.

For `SetupScreenViewData`, by default, the UI Library displays **Setup** as the title and nothing as the subtitle. The `title` and `subtitle` information in `SetupScreenViewData` overwrites the navigation bar's title and subtitle on the premeeting screen, respectively.

#### Local participant view data

`ParticipantViewData` is an object that sets the `displayName` and `avatar` UI image for avatar components. This class is injected into the UI Library to set avatar information. It's stored locally and never sent to the server.

#### Setup screen view data

`SetupScreenViewData` is an object that sets `title` and `subtitle` for the navigation bar on the premeeting screen (also known as setup view). If you define `SetupScreenViewData`, you must also provide `title` because it's a required field. However, `subtitle` isn't required.

If you don't define `subtitle`, it's hidden. This class is locally stored, and its information isn't sent to the server.

#### Usage

```swift
// LocalOptions (data not sent to the server)
let localParticipantViewData = ParticipantViewData(avatar: <Some UIImage>,
                                                   displayName: "<DISPLAY_NAME>")
let localSetupScreenViewData = SetupScreenViewData(title: "<NAV_TITLE>",
                                                               subtitle: "<NAV_SUBTITLE>")
let localOptions = LocalOptions(participantViewData: localParticipantViewData, 
                                setupScreenViewData: localSetupScreenViewData)
// RemoteOptions (data sent to the server)
let remoteOptions = RemoteOptions(for: .groupCall(groupId: UUID()),
                                  credential: <Some CommunicationTokenCredential>,
                                  displayName: "<DISPLAY_NAME>")
// Launch
callComposite.launch(remoteOptions: remoteOptions, localOptions: localOptions)
```

| Setup view | Calling experience view |
| --- | --- |
| Screenshot of iOS data custom model injection. | Screenshot of iOS data custom model injection with name. |

### Remote participant view data injection

On remote participant join, you can inject the view data for the remote participant. This participant view data can contain a UI image that represents the avatar to render and a display name to optionally display instead. None of this information is sent to Azure Communication Services. It's held locally in the UI Library.

#### Usage

To set the view data for remote participants, set `onRemoteParticipantJoined` completion for the event handler. On remote participant join, use `set(remoteParticipantViewData:, for:, completionHandler:)` for `CallComposite` to inject view data for remote participants. The participant identifier `CommunicationIdentifier` uniquely identifies a remote participant. You use the optional completion handler to return the result of the set operation.

```swift
callComposite.events.onRemoteParticipantJoined = { [weak callComposite] identifiers in
  for identifier in identifiers {
    // map identifier to displayName
    let participantViewData = ParticipantViewData(displayName: "<DISPLAY_NAME>")
    callComposite?.set(remoteParticipantViewData: participantViewData,
                       for: identifier) { result in
      switch result {
      case .success:
        print("Set participant view data succeeded")
      case .failure(let error):
        print("Set participant view data failed with \(error)")
      }
    }
  }
}
```

| Participants list |
| --- |
| Screenshot of iOS remote participants view data injection. |



## Next steps

- [Learn more about the UI Library](../../concepts/ui-library/ui-library-overview.md)
