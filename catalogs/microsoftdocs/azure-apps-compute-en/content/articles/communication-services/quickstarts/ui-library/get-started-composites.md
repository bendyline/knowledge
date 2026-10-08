---
title: Quickstart - Integrate experiences in your app by using UI Library
titleSuffix: An Azure Communication Services quickstart
description: Get started with Azure Communication Services UI Library composites to add Calling communication experiences to your applications.
author: garchiro7
ms.author: jorgegarc
ms.date: 10/10/2021
ms.topic: quickstart
ms.service: azure-communication-services
zone_pivot_groups: acs-plat-web-ios-android
ms.custom: mode-other
---

# Quickstart: Get started with UI Library


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


Get started with Azure Communication Services UI Library to quickly integrate communication experiences into your applications. In this quickstart, learn how to integrate UI Library composites into an application and set up the experience for your app users.

Communication Services UI Library renders a full communication experience right in your application. It takes care of connecting to the call, and it sets up the user's participation in the call behind the scenes. As a developer, you need to worry about where in your app's user experience you want the communication experience to launch. The composite takes the user through setting up their devices, joining the call and participating in it, and rendering other participants.

View this video for an overview:  

**Applies to: platform-web**

  

> **Note:**
> For detailed documentation and quickstarts about the Web UI Library visit the [**Web UI Library Storybook**](https://azure.github.io/communication-ui-library).

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- A deployed Communication Services resource. [Create a Communication Services resource](../create-communication-resource.md).
- Azure Communication Services Token. See [example](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/quickstarts/identity/quick-create-identity.md)

### You can access the following quickstarts

- [UI Components](https://azure.github.io/communication-ui-library/?path=/docs/components-get-started--docs)
- [Composites](https://azure.github.io/communication-ui-library/?path=/docs/composites-get-started--docs)
- [Stateful Client (Calling)](https://azure.github.io/communication-ui-library/?path=/docs/stateful-client-get-started-call--docs)




**Applies to: platform-android**



> [!VIDEO https://www.youtube.com/embed/8hOKCHgSNsg]

Get the sample Android application for this [quickstart](https://github.com/Azure-Samples/communication-services-android-quickstarts/tree/main/ui-calling) in the open source Azure Communication Services [UI Library for Android](https://github.com/Azure/communication-ui-library-android).

## Prerequisites

- An Azure account and an active Azure subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- An OS running [Android Studio](https://developer.android.com/studio).
- A deployed [Azure Communication Services resource](../create-communication-resource.md).
- An Azure Communication Services [access token](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/quickstarts/identity/quick-create-identity.md).

## Set up the project

Complete the following sections to set up the quickstart project.

### Create a new Android project

In Android Studio, create a new project:

1. In the **File** menu, select **New** > **New Project**.

1. In **New Project**, select the **Empty Activity** project template.

   Screenshot that shows the New Project dialog in Android Studio with Empty Activity selected.

1. Select **Next**.

1. In **Empty Activity**, name the project **UILibraryQuickStart**. For language, select **Java/Kotlin**. For the minimum SDK, select **API 26: Android 8.0 (Oreo)** or later.

1. Select **Finish**.

   Screenshot that shows new project options and the Finish button selected.

## Install the packages

Complete the following sections to install the required application packages.

### Add a dependency

In your app-level *UILibraryQuickStart/app/build.gradle* file (in the app folder), add the following dependency:

```groovy
dependencies {
    ...
    implementation 'com.azure.android:azure-communication-ui-calling:+'
    ...
}
```

### Add Maven repositories

Two Maven repositories are required to integrate the library:

- MavenCentral
- The Azure package repository

To add the repositories:

1. In your project Gradle scripts, ensure that the following repositories are added. For Android Studio (2020.\*), `repositories` is in `settings.gradle`, under `dependencyResolutionManagement(Gradle version 6.8 or greater)`.  For earlier versions of Android Studio (4.\*), `repositories` is in the project-level `build.gradle`, under `allprojects{}`.

    ```groovy
    // dependencyResolutionManagement
    repositories {
        ...
        mavenCentral()
        maven {
            url "https://pkgs.dev.azure.com/MicrosoftDeviceSDK/DuoSDK-Public/_packaging/Duo-SDK-Feed/maven/v1"
        }
        ...
    }
    ```

1. Sync your project with the Gradle files. To sync the project, on the **File** menu, select **Sync Project With Gradle Files**.

## Add a button to Activity_main.xml

In the *app/src/main/res/layout/activity_main.xml* layout file, add the following code to create a button to start the composite:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <Button
        android:id="@+id/startButton"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Launch"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

## Initialize the composite

To initialize the composite:

1. Go to `MainActivity`.

1. Add the following code to initialize your composite components for calling. Replace `"GROUP_CALL_ID"` with the group ID for your call. Replace `"DISPLAY_NAME"` with your name. Replace `"USER_ACCESS_TOKEN"` with your token.

#### [Kotlin](#tab/kotlin)

```kotlin
package com.example.uilibraryquickstart

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import com.azure.android.communication.common.CommunicationTokenCredential
import com.azure.android.communication.common.CommunicationTokenRefreshOptions
import com.azure.android.communication.ui.calling.CallComposite
import com.azure.android.communication.ui.calling.CallCompositeBuilder
import com.azure.android.communication.ui.calling.models.CallCompositeGroupCallLocator
import com.azure.android.communication.ui.calling.models.CallCompositeJoinLocator
import java.util.UUID

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        
        val startButton: Button = findViewById(R.id.startButton)
        startButton.setOnClickListener { l -> startCallComposite() }
    }

    private fun startCallComposite() {
        val communicationTokenRefreshOptions = CommunicationTokenRefreshOptions({ fetchToken() }, true)
        val communicationTokenCredential = CommunicationTokenCredential(communicationTokenRefreshOptions)

        val locator: CallCompositeJoinLocator = CallCompositeGroupCallLocator(UUID.fromString("GROUP_CALL_ID"))
        val callComposite: CallComposite = CallCompositeBuilder()
            .applicationContext(this.applicationContext)
            .credential(communicationTokenCredential)
            .displayName("DISPLAY_NAME").build()
        
        callComposite.launch(this, locator)
    }

    private fun fetchToken(): String? {
        return "USER_ACCESS_TOKEN"
    }
}
```

#### [Java](#tab/java)

```java
package com.example.uilibraryquickstart;

import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.Button;
import com.azure.android.communication.common.CommunicationTokenCredential;
import com.azure.android.communication.common.CommunicationTokenRefreshOptions;
import com.azure.android.communication.ui.calling.CallComposite;
import com.azure.android.communication.ui.calling.CallCompositeBuilder;
import com.azure.android.communication.ui.calling.models.CallCompositeGroupCallLocator;
import com.azure.android.communication.ui.calling.models.CallCompositeJoinLocator;
import java.util.UUID;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Button startButton = findViewById(R.id.startButton);

        startButton.setOnClickListener(l -> {
            startCallComposite();
        });
    }

    private void startCallComposite() {
        CommunicationTokenRefreshOptions communicationTokenRefreshOptions =
                new CommunicationTokenRefreshOptions(this::fetchToken, true);
        CommunicationTokenCredential communicationTokenCredential =
                new CommunicationTokenCredential(communicationTokenRefreshOptions);

        final CallCompositeJoinLocator locator = new CallCompositeGroupCallLocator(UUID.fromString("GROUP_CALL_ID"));

        CallComposite callComposite = new CallCompositeBuilder()
                .applicationContext(this.getApplicationContext())
                .credential(communicationTokenCredential)
                .displayName("DISPLAY_NAME").build();
        callComposite.launch(this, locator);
    }

    private String fetchToken() {
        return "USER_ACCESS_TOKEN";
    }
}
```

---

## Run the code

In Android Studio, build and start the application:

1. Select **Launch**.
1. Accept permissions, and then select device, microphone, and video settings.
1. Select **Join call**.

GIF animation that shows an example of how the project runs on an Android device.

## Object model

The following classes and interfaces handle some key features of the Azure Communication Services Android UI:

| Name | Description |
| --- | --- |
| [CallComposite](#create-callcomposite) | Composite component that renders a call experience with participant gallery and controls |
| [CallCompositeBuilder](#create-callcomposite) | Builder that builds `CallComposite` with options |
| [CallCompositeJoinMeetingLocator](#set-up-a-group-call) | Passed-in `CallComposite` launch to start a group call |
| [CallCompositeTeamsMeetingLinkLocator](#join-a-teams-meeting) | Passed to `CallComposite` launch to join a Microsoft Teams meeting |
| [CallCompositeLocalizationOptions](#apply-a-localization-configuration) | Injected as optional in `CallCompositeBuilder` to set the language of the composite |

## UI Library functionality

Get the code to create key communication features for your Android application.

### Set up authentication

To set up authentication, inside the `startCallComposite` function, initialize a `CommunicationTokenCredential` instance. Replace `"USER_ACCESS_TOKEN"` with your access token.

#### [Kotlin](#tab/kotlin)

```kotlin
val callComposite: CallComposite = CallCompositeBuilder().build()

val communicationTokenRefreshOptions = CommunicationTokenRefreshOptions(this::fetchToken, true)

val communicationTokenCredential = CommunicationTokenCredential(communicationTokenRefreshOptions)
```

#### [Java](#tab/java)

```java
CallComposite callComposite = new CallCompositeBuilder().build();

CommunicationTokenRefreshOptions communicationTokenRefreshOptions =
        new CommunicationTokenRefreshOptions(this::fetchToken, true);

CommunicationTokenCredential communicationTokenCredential = 
        new CommunicationTokenCredential(communicationTokenRefreshOptions);

```

If you don't already have an access token, [create an Azure Communication Services access token](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/quickstarts/identity/quick-create-identity.md).

---

### Create CallComposite

To create `CallComposite`, inside the `startCallComposite` function, initialize a `CallCompositeBuilder` instance with application context, credentials and a display name.

#### [Kotlin](#tab/kotlin)

```kotlin
val callComposite: CallComposite = CallCompositeBuilder()
            .applicationContext(this.applicationContext)
            .credential(communicationTokenCredential)
            .displayName("DISPLAY_NAME").build()
```

#### [Java](#tab/java)

```java
CallComposite callComposite = new CallCompositeBuilder()
                .applicationContext(this.getApplicationContext())
                .credential(communicationTokenCredential)
                .displayName("DISPLAY_NAME").build();
```

---

### Set up a group call

To set up a group call, initialize a `CallCompositeGroupCallLocator`.

#### [Kotlin](#tab/kotlin)

```kotlin
val locator = CallCompositeGroupCallLocator(UUID.fromString("GROUP_CALL_ID"))
```

#### [Java](#tab/java)

```java
CallCompositeJoinLocator locator = new CallCompositeGroupCallLocator(UUID.fromString("GROUP_CALL_ID"));
```
---

### Join a Teams meeting

You can join to a Teams meeting using two mechanisms:

- Teams meeting URL or Teams meeting short URL
- Teams Meeting ID and Passcode

The Teams meeting link can be retrieved using Graph APIs, which is detailed in [Graph documentation](https://learn.microsoft.com/graph/api/onlinemeeting-createorget?tabs=http\&view=graph-rest-beta\&preserve-view=true).

The Communication Services Calling SDK accepts a full Teams meeting link. This link is returned as part of the `onlineMeeting` resource, accessible under the [`joinWebUrl` property](https://learn.microsoft.com/graph/api/resources/onlinemeeting?view=graph-rest-beta\&preserve-view=true)
You can also get the required meeting information from the **Join Meeting** URL in the Teams meeting invite itself.

#### Join via Teams meeting URL

To join a Microsoft Teams meeting, initialize a `CallCompositeTeamsMeetingLinkLocator`.

#### [Kotlin](#tab/kotlin)

```kotlin
val locator = CallCompositeTeamsMeetingLinkLocator("TEAMS_MEETING_LINK")
```

#### [Java](#tab/java)

```java
CallCompositeJoinLocator locator = new CallCompositeTeamsMeetingLinkLocator("TEAMS_MEETING_LINK");
```

---

#### Join via Teams Meeting ID and Passcode

The `CallCompositeTeamsMeetingLinkLocator` locates a meeting using a meeting ID and passcode. These can be found under a Teams meeting's join info.
A Teams meeting ID is 12 characters long and consists of numeric digits grouped in threes (i.e. `000 000 000 000`).
A passcode consists of 6 alphabet characters (i.e. `aBcDeF`). The passcode is case sensitive.

#### [Kotlin](#tab/kotlin)

```kotlin
val locator = CallCompositeTeamsMeetingIdLocator("TEAMS_MEETING_ID", "TEAMS_MEETING_PASSCODE")
```

#### [Java](#tab/java)

```java
CallCompositeJoinLocator locator = new CallCompositeTeamsMeetingLinkLocator("TEAMS_MEETING_ID", "TEAMS_MEETING_PASSCODE");
```

---

### Set up a Rooms call

To set up an Azure Communication Services Rooms call, initialize a `CallCompositeRoomLocator` with a room ID.
While on the setup screen, `CallComposite` enables camera and microphone to all participants with any room role. Actual up-to-date participant role and capabilities are retrieved from Azure Communication Services once call is connected.

For more information about Rooms, how to create and manage one see [Rooms Quickstart](../rooms/get-started-rooms.md)

#### [Kotlin](#tab/kotlin)

```kotlin
val locator = CallCompositeRoomLocator("<ROOM_ID>")
```

#### [Java](#tab/java)

```java
CallCompositeJoinLocator locator = new CallCompositeRoomLocator("<ROOM_ID>");
```
---

### Set up a 1:N Outgoing call and incoming call push notifications 

UI Library supports one-to-one VoIP call to dial users by communication identifier. To receive incoming call UI Library also supports registering for PUSH notifications. To learn more about the integration for Android and iOS platform and usage of the API, see [How to make one-to-one call and receive PUSH notifications.](../../how-tos/ui-library-sdk/one-to-one-calling.md)

### Launch the composite

To launch the call UI, inside the `startCallComposite` function, call `launch` on the `CallComposite` instance.

#### [Kotlin](#tab/kotlin)

```kotlin
callComposite.launch(activityContext, locator)
```

#### [Java](#tab/java)

```java
callComposite.launch(activityContext, locator);
```

---
### Subscribe to CallComposite error events

To receive error events, call `setOnErrorHandler` with `CallComposite`.

The following `errorCode` values might be sent to the error handler:

- `CallCompositeErrorCode.CALL_JOIN_FAILED`
- `CallCompositeErrorCode.CALL_END_FAILED`
- `CallCompositeErrorCode.TOKEN_EXPIRED`
- `CallCompositeErrorCode.CAMERA_FAILURE`
- `CallCompositeErrorCode.MICROPHONE_PERMISSION_NOT_GRANTED`
- `CallCompositeErrorCode.NETWORK_CONNECTION_NOT_AVAILABLE`

The following example shows an error event for a failed composite event.

#### [Kotlin](#tab/kotlin)

```kotlin
callComposite.addOnErrorEventHandler { callCompositeErrorEvent ->
    println(callCompositeErrorEvent.errorCode)
}
```

#### [Java](#tab/java)

```java
callComposite.addOnErrorEventHandler(callCompositeErrorEvent -> {
    System.out.println(callCompositeErrorEvent.getErrorCode());
});
```

---
### Apply a theme configuration

To change the primary color of the composite, create a new theme style in *src/main/res/values/themes.xml* and *src/main/res/values-night/themes.xml* by using `AzureCommunicationUICalling.Theme` as the parent theme. To apply the theme, inject the theme ID in `CallCompositeBuilder`:

```xml
<style name="MyCompany.CallComposite" parent="AzureCommunicationUICalling.Theme">
    <item name="azure_communication_ui_calling_primary_color">#27AC22</item>
    <item name="azure_communication_ui_calling_primary_color_tint10">#5EC65A</item>
    <item name="azure_communication_ui_calling_primary_color_tint20">#A7E3A5</item>
    <item name="azure_communication_ui_calling_primary_color_tint30">#CEF0CD</item>
</style>
```

#### [Kotlin](#tab/kotlin)

```kotlin
val callComposite: CallComposite =
        CallCompositeBuilder()
            .theme(R.style.MyCompany_CallComposite)
            .build()
```

#### [Java](#tab/java)

```java
CallComposite callComposite = 
    new CallCompositeBuilder()
        .theme(R.style.MyCompany_CallComposite)
        .build();
```

---
### Apply a localization configuration

To change the language of the composite, use `CallCompositeSupportedLocale` to create `CallCompositeLocalizationOptions` with `Locale`. To apply language, inject the localization configuration in `CallCompositeBuilder`. By default, all text labels use English (`en`) strings. You can use `CallCompositeLocalizationOptions` to set a different value for `language`. By default, UI Library includes a set of `language` values that you can use with UI components. `CallCompositeSupportedLocale` provides the supported locales. For example, to access the English locale, you can use `CallCompositeSupportedLocale.EN`. `CallCompositeSupportedLocale.getSupportedLocales()` provides a list of locale objects for supported languages.

#### [Kotlin](#tab/kotlin)

```kotlin
import com.azure.android.communication.ui.calling.models.CallCompositeLocalizationOptions
import com.azure.android.communication.ui.calling.models.CallCompositeSupportedLocale

// CallCompositeSupportedLocale provides list of supported locale
val callComposite: CallComposite =
            CallCompositeBuilder().localization(
                CallCompositeLocalizationOptions(CallCompositeSupportedLocale.EN)
            ).build()
```

#### [Java](#tab/java)

```java
import com.azure.android.communication.ui.calling.models.CallCompositeLocalizationOptions;
import com.azure.android.communication.ui.calling.models.CallCompositeSupportedLocale;

// CallCompositeSupportedLocale provides a list of supported locales.
CallComposite callComposite = 
    new CallCompositeBuilder()
        .localization(new CallCompositeLocalizationOptions(CallCompositeSupportedLocale.EN))
        .build();
```

---
### Subscribe to CallComposite call state changed event

To receive call state changed events, call `addOnCallStateChangedEventHandler` with `CallComposite`.

The following example shows an event for a call state changed.

#### [Kotlin](#tab/kotlin)

```kotlin
callComposite.addOnCallStateChangedEventHandler { callStateChangedEvent ->
    println(callStateChangedEvent.code)
}
```

#### [Java](#tab/java)

```java
callComposite.addOnCallStateChangedEventHandler(callStateChangedEvent -> {
    System.out.println(callStateChangedEvent.getCode());
});
```

---
### Dismiss CallComposite and subscribe to dismissed event

To receive dismiss, call `addOnDismissedEventHandler` with `CallComposite`. To dismiss CallComposite, call `dismiss`.

The following example shows an event for a call state changed.

#### [Kotlin](#tab/kotlin)

```kotlin
callComposite.addOnDismissedEventHandler { callCompositeDismissedEvent ->
    println(callCompositeDismissedEvent.errorCode)
}

callComposite.dismiss()
```

#### [Java](#tab/java)

```java
callComposite.addOnDismissedEventHandler(callCompositeDismissedEvent -> {
    System.out.println(callCompositeDismissedEvent.getErrorCode());
});

callComposite.dismiss();
```

---
### More features

The list of [use cases](../../concepts/ui-library/ui-library-use-cases.md) has detailed information about more features.

### Add notifications to your mobile app

Azure Communication Services integrates with [Azure Event Grid](../../../event-grid/overview.md) and [Azure Notification Hubs](../../../notification-hubs/notification-hubs-push-notification-overview.md), so you can [add push notifications](../../concepts/notifications.md) to your apps in Azure. You can use push notifications to send information from your application to users' mobile devices. A push notification can show a dialog, play a sound, or display an incoming call UI.




**Applies to: platform-ios**



> [!VIDEO https://www.youtube.com/embed/Aq5VTLfXU_4]

Get the sample iOS application for this [QuickStart](https://github.com/Azure-Samples/communication-services-ios-quickstarts/tree/main/ui-calling) in the open source Azure Communication Services [UI Library for iOS](https://github.com/Azure/communication-ui-library-ios).

## Prerequisites

- An Azure account and an active Azure subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- A Mac running [Xcode](https://go.microsoft.com/fwLink/p/?LinkID=266532) 13 or later and a valid developer certificate installed in your keychain. [CocoaPods](https://cocoapods.org/) must also be installed to fetch dependencies.
- A deployed [Azure Communication Services resource](../create-communication-resource.md).
- An Azure Communication Services [access token](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/quickstarts/identity/quick-create-identity.md).

## Set up the project

Complete the following sections to set up the quickstart project.

### Create a new Xcode project

In Xcode, create a new project:

1. In the **File** menu, select **New** > **Project**.

1. In **Choose a template for your new project**, select the **iOS** platform and select the **App** application template. The quickstart uses the UIKit storyboards. The quickstart doesn't create tests, so you can clear the **Include Tests** checkbox.

   Screenshot that shows the Xcode new project dialog, with iOS and the App template selected.

1. In **Choose options for your new project**, for the product name, enter **UILibraryQuickStart**. For the interface, select **Storyboard**.

   Screenshot that shows setting new project options in Xcode.

### Install the package and dependencies

1. (Optional) For MacBook with M1, install, and enable [Rosetta](https://support.apple.com/en-us/HT211861) in Xcode.

1. In your project root directory, run `pod init` to create a Podfile. If you encounter an error, update [CocoaPods](https://guides.cocoapods.org/using/getting-started.html) to the current version.

1. Add the following code to your Podfile. Replace `UILibraryQuickStart` with your project name.

    ```ruby
    platform :ios, '16.0'
    
    target 'UILibraryQuickStart' do
        use_frameworks!
        pod 'AzureCommunicationUICalling'
    end
    ```

1. Run `pod install --repo-update`.

1. In Xcode, open the generated.xcworkspace* file.

### Request access to device hardware

To access the device's hardware, including the microphone, and camera, update your app's information property list. Set the associated value to a string that's included in the dialog the system uses to request access from the user.

1. Right-click the `Info.plist` entry of the project tree and select **Open As** > **Source Code**. Add the following lines to the top level `<dict>` section, and then save the file.

   ```xml
   <key>NSCameraUsageDescription</key>
   <string></string>
   <key>NSMicrophoneUsageDescription</key>
   <string></string>
   ```

   Here's an example of the `Info.plist` source code in an Xcode file:

   Screenshot that shows an example of the info plist source code in an Xcode file.

1. To verify that device permission requests are added correctly, select **Open As** > **Property List**. Check that the information property list looks similar to the following example:

   Screenshot that shows the camera and microphone device privacy in Xcode.

### Turn off Bitcode

In the Xcode project, under **Build Settings**, set the **Enable Bitcode** option to **No**. To find the setting, change the filter from **Basic** to **All** or use the search bar.

Screenshot that shows the Build Settings option to turn off Bitcode.

## Initialize the composite

To initialize the composite:

1. Go to `ViewController`.

1. Add the following code to initialize your composite components for a call. Replace `<GROUP_CALL_ID>` with either the group ID for your call or with `UUID()` to generate a group ID for the call. Replace `<DISPLAY_NAME>` with your name. (The string length limit for `<DISPLAY_NAME>` is 256 characters.) Replace `<USER_ACCESS_TOKEN>` with your access token. 

    ```swift
    import UIKit
    import AzureCommunicationCalling
    import AzureCommunicationUICalling
    
    class ViewController: UIViewController {
    
        private var callComposite: CallComposite?
    
        override func viewDidLoad() {
            super.viewDidLoad()
    
            let button = UIButton(frame: CGRect(x: 100, y: 100, width: 200, height: 50))
            button.contentEdgeInsets = UIEdgeInsets(top: 10.0, left: 20.0, bottom: 10.0, right: 20.0)
            button.layer.cornerRadius = 10
            button.backgroundColor = .systemBlue
            button.setTitle("Start Experience", for: .normal)
            button.addTarget(self, action: #selector(startCallComposite), for: .touchUpInside)
    
            button.translatesAutoresizingMaskIntoConstraints = false
            self.view.addSubview(button)
            button.centerXAnchor.constraint(equalTo: view.centerXAnchor).isActive = true
            button.centerYAnchor.constraint(equalTo: view.centerYAnchor).isActive = true
        }
    
        @objc private func startCallComposite() {
            let callCompositeOptions = CallCompositeOptions(displayName: "<DISPLAY_NAME>")
            let communicationTokenCredential = try! CommunicationTokenCredential(token: "<USER_ACCESS_TOKEN>")

            callComposite = CallComposite(credential: communicationTokenCredential, withOptions: callCompositeOptions)
  
            callComposite?.launch(locator: .groupCall(groupId: UUID(uuidString: "<GROUP_CALL_ID>")!))
        }
    }
    ```

## Run the code

To build and run your app on the iOS simulator, select **Product** > **Run** or use the (&#8984;-R) keyboard shortcut. Then, try out the call experience on the simulator:

1. Select **Start Experience**.

1. Accept audio permissions, and then select device, mic, and video settings.

1. Select **Start call**.

GIF animation that demonstrates the final look and feel of the quickstart iOS app.

## Object model

The following classes and interfaces handle some key features of the Azure Communication Services UI client library:

| Name | Description |
| --- | --- |
| [CallComposite](#create-callcomposite) | Component that renders a call experience that has a participant gallery and controls |
| [CallCompositeOptions](#create-callcomposite) | Settings for options like themes and event handling |
| [ThemeOptions](#apply-theme-options) | Customization options for the composite theme |
| [LocalizationOptions](#apply-localization-options) | Language options for the composite |

## UI Library functionality

Get the code to create key communication features for your iOS application.

### Set up authentication

To set up authentication, inside the `startCallComposite` function, initialize a `CommunicationTokenCredential` instance. Replace `<USER_ACCESS_TOKEN>` with your access token.

```swift
let communicationTokenCredential = try! CommunicationTokenCredential(token: "<USER_ACCESS_TOKEN>")
```

If you don't already have an access token, [create an Azure Communication Services access token](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/quickstarts/identity/quick-create-identity.md).


### Create CallComposite

To create `CallComposite`, inside the `startCallComposite` function, initialize a `CallCompositeOptions` instance with optional `<DISPLAY_NAME>` and a `CommunicationTokenCredential` instance:

```swift
@objc private func startCallComposite() {
    let callCompositeOptions = CallCompositeOptions(displayName: "<DISPLAY_NAME>")
    let communicationTokenCredential = try! CommunicationTokenCredential(token: "<USER_ACCESS_TOKEN>")

    callComposite = CallComposite(credential: communicationTokenCredential, withOptions: callCompositeOptions)
}
```

### Set up a group call

To set up a group call, inside the `startCallComposite` function, initialize a `.groupCall` locator. Replace `<GROUP_CALL_ID>` with the group ID for your call. 

```swift
// let uuid = UUID() to create a new call
let uuid = UUID(uuidString: "<GROUP_CALL_ID>")!
let locator = .groupCall(groupId: uuid)
```

For more information about using a group ID for calls, see [Manage calls](../../how-tos/calling-sdk/manage-calls.md).

### Join a Teams meeting

You can join to a Teams meeting using two mechanisms:

- Teams meeting URL or Teams meeting short URL
- Teams Meeting ID and Passcode

The Teams meeting link can be retrieved using Graph APIs, which is detailed in [Graph documentation](https://learn.microsoft.com/graph/api/onlinemeeting-createorget?tabs=http\&view=graph-rest-beta\&preserve-view=true).

The Communication Services Calling SDK accepts a full Teams meeting link. This link is returned as part of the `onlineMeeting` resource, accessible under the [`joinWebUrl` property](https://learn.microsoft.com/graph/api/resources/onlinemeeting?view=graph-rest-beta\&preserve-view=true)
You can also get the required meeting information from the **Join Meeting** URL in the Teams meeting invite itself.

#### Join via Teams meeting URL

To join a Microsoft Teams meeting, inside the `startCallComposite` function, initialize an instance for the `.teamsMeeting` locator. Replace `<TEAMS_MEETING_LINK>` with the Teams meeting link for your call. Replace `<DISPLAY_NAME>` with your name.

```swift
let locator = .teamsMeeting(teamsLink: "<TEAMS_MEETING_LINK>")
```

#### Join via Teams Meeting ID and Passcode

The `teamMeetingId` locates a meeting using a meeting ID and passcode. These can be found under a Teams meeting's join info.
A Teams meeting ID is 12 characters long and consists of numeric digits grouped in threes (i.e. `000 000 000 000`).
A passcode consists of 6 alphabet characters (i.e. `aBcDeF`). The passcode is case sensitive.

```swift
let locator = .teamsMeetingId(meetingId: "<TEAMS_MEETING_ID>", meetingPasscode:  "<TEAMS_MEETING_PASSCODE>" )
```

### Set up a Room call

To set up an Azure Communication Services Rooms call, initialize a `CallCompositeRoomLocator` with a room ID.
While on the setup screen, `CallComposite` will enable camera and microphone to all participants with any room role. Actual up-to-date participant role and capabilities are retrieved from Azure Communication Services once call is connected.

For more information about Rooms, how to create and manage one see [Rooms QuickStart](../rooms/get-started-rooms.md)

```swift
let locator = .roomCall(roomId: "<ROOM_ID>")
```

### Set up a 1:N Outgoing call and incoming call push notifications

UI Library supports one-to-one VoIP call to dial users by communication identifier. To receive incoming call UI Library also supports registering for PUSH notifications. To learn more about the integration for Android and iOS platform and usage of the API, see [How to make one-to-one call and receive PUSH notifications.](../../how-tos/ui-library-sdk/one-to-one-calling.md)

### Launch the composite

Inside the `startCallComposite` function, call `launch` on the `CallComposite` instance:

```swift
callComposite?.launch(locator: locator)
```

### Subscribe to events

You can implement closures to act on composite events. The following errorCodes might be sent to the error handler:

- `callJoin`
- `callEnd`
- `cameraFailure`
- `tokenExpired`
- `microphonePermissionNotGranted`
- `networkConnectionNotAvailable`

The following example shows an error event for a failed composite event:

```swift
callComposite?.events.onError = { error in
    print("CallComposite failed with error:\(error)")
}
```

### Apply theme options

To customize the communication experience in your application, create custom theme options that implement the `ThemeOptions` protocol. Include an instance of the new class in `CallCompositeOptions`:

```swift
class CustomThemeOptions: ThemeOptions {
   var primaryColor: UIColor {
       return UIColor.red
   }
}
```

```swift
let callCompositeOptions = CallCompositeOptions(theme: CustomThemeOptions())
```

For more information about how theming works, see the [theming guide](../../how-tos/ui-library-sdk/theming.md).

### Apply localization options

To change the language in the composite, create custom localization options and include them in `CallCompositeOptions`.  By default, all text labels use English (`SupportedLocale.en`) strings. You can use `LocalizationOptions` to set a different value for `locale`. By default, UI Library includes a set of `locale` values that you can use with the UI components. `SupportedLocale.values` provides a list of all supported languages.

In the following example, the composite is localized to French (`fr`):

```swift
// Option1: Use IntelliSense to get locales UI Library supports.
let localizationOptions = LocalizationOptions(locale: SupportedLocale.frFR)

// Option2: If UI Library doesn't support the locale you set, the Swift Locale struct defaults to English.
let localizationOptions = LocalizationOptions(locale: Locale(identifier: "fr-FR"))

let callCompositeOptions = CallCompositeOptions(localization: localizationOptions) 
```

For more information about localization and for a list of supported languages, see the [localization guide](../../how-tos/ui-library-sdk/localization.md).

### Subscribe to CallComposite call state changed event

You can implement closures to act on composite events. The call states are sent to the call state changed handler.

The following example shows an event for a call state changed.

```swift
callComposite?.events.onCallStateChanged = { callStateEvent in
   print("CallComposite call state changed:\(callStateEvent.requestString)")
}
```

### Dismiss CallComposite and subscribe to dismissed event

To dismiss CallComposite, call `dismiss`. The following dismiss event be sent on call composite dismissed:

```swift
callComposite?.events.onDismissed = { dismissed in
   print("CallComposite dismissed:\(dismissed.errorCode)")
}

callComposite.dismiss()
```

### More features

The list of [use cases](../../concepts/ui-library/ui-library-use-cases.md) has detailed information about more features.

## Add notifications to your mobile app

Azure Communication Services integrates with [Azure Event Grid](../../../event-grid/overview.md) and [Azure Notification Hubs](../../../notification-hubs/notification-hubs-push-notification-overview.md), so you can [add push notifications](../../concepts/notifications.md) to your apps in Azure. You can use push notifications to send information from your application to users' mobile devices. A push notification can show a dialog, play a sound, or display an incoming call UI.




## Clean up resources

If you want to clean up and remove a Communication Services subscription, you can delete the resource or resource group.

Deleting the resource group also deletes any other resources associated with it.

Learn more about [cleaning up resources](../create-communication-resource.md#clean-up-resources).
