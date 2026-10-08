---
title: Use UI components for chat
titleSuffix: An Azure Communication Services quickstart
description: Get started with Azure Communication Services UI Library composites to add chat communication experiences to your applications.
author: dhiraj
ms.author: jorgegarc
ms.date: 11/29/2022
ms.topic: quickstart
ms.service: azure-communication-services
zone_pivot_groups: acs-plat-web-ios-android
ms.custom: mode-other
---

# Use UI components for chat


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


Get started with Azure Communication Services UI Library to quickly integrate communication experiences into your applications. This article describes how to integrate UI Library chat composites into an application and set up the experience for your app users.

Azure Communication Services UI Library renders a full chat experience right in your application. It takes care of connecting to Azure Communication Services chat services and updates a participant's presence automatically. As a developer, you need to decide where in your app's user experience you want the chat experience to start and create only the Azure Communication Services resources as required.

**Applies to: platform-web**



> **Note:**
> For more information about the web UI Library, see the [web UI Library storybook](https://aka.ms/acsstorybook).

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- A deployed Azure Communication Services resource. [Create an Azure Communication Services resource](../create-communication-resource.md).
- An Azure Communication Services token. See [this example](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/quickstarts/identity/quick-create-identity.md).

### Access these quickstarts

- [UI components](https://github.com/Azure-Samples/communication-services-javascript-quickstarts/tree/main/ui-library-quickstart-ui-components)
- [Composites](https://github.com/Azure-Samples/communication-services-javascript-quickstarts/tree/main/ui-library-quickstart-composites)
- [Stateful client (chat)](https://github.com/Azure-Samples/communication-services-javascript-quickstarts/tree/main/ui-library-starting-with-chat-stateful)

### Access these storybooks

- [UI components](https://azure.github.io/communication-ui-library/?path=/docs/components-get-started--docs)
- [Composites](https://azure.github.io/communication-ui-library/?path=/docs/composites-get-started--docs)
- [Stateful client (chat)](https://azure.github.io/communication-ui-library/?path=/docs/stateful-client-get-started-chat--docs)




**Applies to: platform-android**



> **Important:**
> This feature of Azure Communication Services is currently in preview. Features in preview are publicly available and can be used by all new and existing Microsoft customers.
>
> Preview APIs and SDKs are provided without a service-level agreement. We recommend that you don't use them for production workloads. Certain features might not be supported or capabilities might be constrained.
>
> For more information, see [Supplemental Terms of Use for Microsoft Azure Previews](https://azure.microsoft.com/support/legal/preview-supplemental-terms/).


Get the sample Android application at [Azure Samples Android SDK for chat](https://github.com/Azure-Samples/communication-services-android-quickstarts/tree/main/ui-chat) in the open-source Azure Communication Services [UI Library for Android](https://github.com/Azure/communication-ui-library-android).

## Prerequisites

- An Azure account and an active Azure subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- An OS running [Android Studio](https://developer.android.com/studio).
- A deployed [Azure Communication Services resource](../create-communication-resource.md). Note the endpoint URL.
- An Azure Communication Services [access token](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/quickstarts/identity/quick-create-identity.md) and user identifier.
- An Azure Communication Services [chat thread](../chat/get-started.md) with the user from the previous step added to it.

## Set up the project

Complete the following sections to set up the project.

### Create a new Android project

In Android Studio, create a new project.

1. On the **File** menu, select **New** > **New Project**.

1. On **New Project**, select the **Empty Views Activity** project template.

   Screenshot that shows the New Project dialog in Android Studio with Empty Views Activity selected.

1. Select **Next**.

1. Name the project **UILibraryQuickStart**. For language, select **Java/Kotlin**. For the minimum SDK, select **API 23: Android 6.0 (Marshmallow)** or later.

1. Select **Finish**.

   Screenshot that shows new project options and the Finish button selected.

## Install the packages

Complete the following sections to install the required application packages.

### Add a dependency

In your app-level *UILibraryQuickStart/app/build.gradle* file (in the app folder), add the following dependency:

```groovy
dependencies {
    ...
    implementation 'com.azure.android:azure-communication-ui-chat:+'
    ...
}
```

### Add Maven repositories

The Azure package repository is required to integrate the library.

To add the repository:

1. In your project Gradle scripts, ensure that the following repositories are added. For Android Studio (2020.\*), `repositories` is in `settings.gradle`, under `dependencyResolutionManagement(Gradle version 6.8 or greater)`. For earlier versions of Android Studio (4.\*), `repositories` is in the project-level `build.gradle`, under `allprojects{}`.

#### [Groovy](#tab/groovy)
```groovy
    // dependencyResolutionManagement
    repositories {
        ...
        maven {
            url "https://pkgs.dev.azure.com/MicrosoftDeviceSDK/DuoSDK-Public/_packaging/Duo-SDK-Feed/maven/v1"
        }
        ...
    }
```
#### [Kotlin](#tab/kotlin-maven)
```kotlin
    // dependencyResolutionManagement 
    repositories {
        maven {
            url = uri("https://pkgs.dev.azure.com/MicrosoftDeviceSDK/DuoSDK-Public/_packaging/Duo-SDK-Feed/maven/v1")
        }
    }
```

1. Sync your project with the Gradle files. To sync the project, on the **File** menu, select **Sync Project With Gradle Files**.

## Add a button to activity_main.xml

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

1. Add the following code to initialize your composite components for calling. Replace the string values for properties (`kotlin`) or functions (`java`) for `endpoint`, `acsIdentity`, `displayName`, `accessToken`, and `ThreadId`. Replace `endpoint` with the URL for your resource as provided by Azure Communication Services. Replace `acsIdentity` and `accessToken` with the values provided by Azure Communication Services when you created the access token, and use a relevant `displayName`. Replace `ThreadId` with the value returned when you created the thread. Add the user to the thread via REST API call or the az command-line interface client before you try to run the quickstart sample. Otherwise, the client is denied access to join the thread.

#### [Kotlin](#tab/kotlin)

```kotlin
package com.example.uilibraryquickstart

import android.os.Bundle
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import com.azure.android.communication.common.CommunicationTokenCredential
import com.azure.android.communication.common.CommunicationTokenRefreshOptions
import com.azure.android.communication.common.CommunicationUserIdentifier
import com.azure.android.communication.ui.chat.ChatAdapter
import com.azure.android.communication.ui.chat.ChatAdapterBuilder
import com.azure.android.communication.ui.chat.presentation.ChatThreadView

class MainActivity : AppCompatActivity() {
    private lateinit var chatAdapter: ChatAdapter

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        val startButton = findViewById<Button>(R.id.startButton)
        startButton.setOnClickListener { l: View? ->
            val communicationTokenRefreshOptions =
                CommunicationTokenRefreshOptions(
                    { accessToken }, true
                )
            val communicationTokenCredential =
                CommunicationTokenCredential(communicationTokenRefreshOptions)
            chatAdapter = ChatAdapterBuilder()
                .endpoint(endpoint)
                .credential(communicationTokenCredential)
                .identity(CommunicationUserIdentifier(acsIdentity))
                .displayName(displayName)
                .threadId(threadId)
                .build()
            try {
                chatAdapter.connect(this@MainActivity).get()
                val chatView: View = ChatThreadView(this@MainActivity, chatAdapter)
                addContentView(
                    chatView,
                    ViewGroup.LayoutParams(
                        ViewGroup.LayoutParams.MATCH_PARENT,
                        ViewGroup.LayoutParams.MATCH_PARENT
                    )
                )
            } catch (e: Exception) {
                var messageCause: String? = "Unknown error"
                if (e.cause != null && e.cause!!.message != null) {
                    messageCause = e.cause!!.message
                }
                showAlert(messageCause)
            }
        }
    }

    /**
     *
     * @return String endpoint URL from Azure Communication Services Admin UI, "https://example.domain.com/"
     */
    private val endpoint: String?
        get() = "https://example.domain.com/"

    /**
     *
     * @return String identity of the user joining the chat
     * Looks like "8:acs:a6aada1f-0b1e-47ac-866a-91aae00a1c01_00000015-45ee-bad7-0ea8-923e0d008a89"
     */
    private val acsIdentity: String?
        get() = ""

    /**
     *
     * @return String display name of the user joining the chat
     */
    private val displayName: String?
        get() = ""

    /**
     *
     * @return String secure Azure Communication Services access token for the current user
     */
    private val accessToken: String?
        get() = ""

    /**
     *
     * @return String id of Azure Communication Services chat thread to join
     * Looks like "19:AVNnEll25N4KoNtKolnUAhAMu8ntI_Ra03saj0Za0r01@thread.v2"
     */
    private val threadId: String?
        get() = ""

    fun showAlert(message: String?) {
        runOnUiThread {
            AlertDialog.Builder(this@MainActivity)
                .setMessage(message)
                .setTitle("Alert")
                .setPositiveButton(
                    "OK"
                ) { _, i -> }
                .show()
        }
    }
}
```

#### [Java](#tab/java)

```java
package com.example.uilibraryquickstart;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import android.content.DialogInterface;
import android.os.Bundle;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import com.azure.android.communication.common.CommunicationTokenCredential;
import com.azure.android.communication.common.CommunicationTokenRefreshOptions;
import com.azure.android.communication.common.CommunicationUserIdentifier;
import com.azure.android.communication.ui.chat.ChatAdapter;
import com.azure.android.communication.ui.chat.ChatAdapterBuilder;
import com.azure.android.communication.ui.chat.presentation.ChatThreadView;

public class MainActivity extends AppCompatActivity {
    private ChatAdapter chatAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Button startButton = findViewById(R.id.startButton);
        startButton.setOnClickListener(l -> {
            CommunicationTokenRefreshOptions communicationTokenRefreshOptions =
                    new CommunicationTokenRefreshOptions(this::accessToken, true);
            CommunicationTokenCredential communicationTokenCredential =
                    new CommunicationTokenCredential(communicationTokenRefreshOptions);
            chatAdapter = new ChatAdapterBuilder()
                    .endpoint(endpoint())
                    .credential(communicationTokenCredential)
                    .identity(new CommunicationUserIdentifier(acsIdentity()))
                    .displayName(displayName())
                    .threadId(threadId())
                    .build();
            try {
                chatAdapter.connect(MainActivity.this).get();
                View chatView = new ChatThreadView(MainActivity.this, chatAdapter);
                addContentView(chatView, new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT,ViewGroup.LayoutParams.MATCH_PARENT));
            }
            catch (Exception e){
                String messageCause = "Unknown error";
                if (e.getCause() != null && e.getCause().getMessage() != null){
                    messageCause = e.getCause().getMessage();
                }
                showAlert(messageCause);
            }
        });
    }
    /**
     *
     * @return String endpoint URL from Azure Communication Services Admin UI, "https://example.domain.com/"
     */
    private String endpoint(){
        return "https://example.domain.com/";
    }
    /**
     *
     * @return String identity of the user joining the chat
     * Looks like "8:acs:a6aada1f-0b1e-47ac-866a-91aae00a1c01_00000015-45ee-bad7-0ea8-923e0d008a89"
     */
    private String acsIdentity(){
        return "";
    }
    /**
     *
     * @return String display name of the user joining the chat
     */
    private String displayName(){
        return "";
    }
    /**
     *
     * @return String secure Azure Communication Services access token for the current user
     */
    private String accessToken(){
        return "";
    }
    /**
     *
     * @return String id of Azure Communication Services chat thread to join
     * Looks like "19:AVNnEll25N4KoNtKolnUAhAMu8ntI_Ra03saj0Za0r01@thread.v2"
     */
    private String threadId(){
        return "";
    }
    void showAlert(String message){
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                new AlertDialog.Builder(MainActivity.this)
                        .setMessage(message)
                        .setTitle("Alert")
                        .setPositiveButton("OK", new DialogInterface.OnClickListener() {
                            @Override
                            public void onClick(DialogInterface dialogInterface, int i) {
                            }
                        })
                        .show();
            }
        });
    }
}
```

---

## Run the code

In Android Studio, build and start the application.

1. Select **Launch**.
1. The chat client joins the chat thread, and you can start typing and sending messages.
1. If the client can't join the thread and you see `chatJoin` failed errors, verify that your user's access token is valid and that the user was added to the chat thread by REST API call or by using the `az` command-line interface.

GIF animation that shows an example of how the project runs on an Android device.



**Applies to: platform-ios**



> **Important:**
> This feature of Azure Communication Services is currently in preview. Features in preview are publicly available and can be used by all new and existing Microsoft customers.
>
> Preview APIs and SDKs are provided without a service-level agreement. We recommend that you don't use them for production workloads. Certain features might not be supported or capabilities might be constrained.
>
> For more information, see [Supplemental Terms of Use for Microsoft Azure Previews](https://azure.microsoft.com/support/legal/preview-supplemental-terms/).


Get the sample iOS application at [Azure Samples iOS SDK for chat](https://github.com/Azure-Samples/communication-services-ios-quickstarts/tree/main/ui-chat) in the open-source Azure Communication Services [UI Library for iOS](https://github.com/Azure/communication-ui-library-ios).

## Prerequisites

- An Azure account and an active Azure subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- A Mac running [Xcode](https://go.microsoft.com/fwLink/p/?LinkID=266532) 13 or later and a valid developer certificate installed in your keychain. [CocoaPods](https://cocoapods.org/) must also be installed to fetch dependencies.
- A deployed [Azure Communication Services resource](../create-communication-resource.md). Note the endpoint URL.
- An Azure Communication Services [access token](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/quickstarts/identity/quick-create-identity.md) and user identifier.
- An Azure Communication Services [chat thread](../chat/get-started.md). Add the user you created in the previous step to this chat thread.

## Set up the project

Complete the following sections to set up the quickstart project.

### Create a new Xcode project

In Xcode, create a new project.

1. On the **File** menu, select **New** > **Project**.

1. On **Choose a template for your new project**, select the **iOS** platform and select the **App** application template. The quickstart uses the UIKit storyboards.

   Screenshot that shows the Xcode new project dialog, with iOS and the App template selected.

1. On **Choose options for your new project**, for the product name, enter **UILibraryQuickStart**. For the interface, select **Storyboard**. The quickstart doesn't create tests, so you can clear the **Include Tests** checkbox.

   Screenshot that shows setting new project options in Xcode.

### Install the package and dependencies

1. (Optional) For MacBook with M1, install, and enable [Rosetta](https://support.apple.com/en-us/HT211861) in Xcode.

1. In your project root directory, run `pod init` to create a Podfile. If you encounter an error, update [CocoaPods](https://guides.cocoapods.org/using/getting-started.html) to the current version.

1. Add the following code to your Podfile. Replace `UILibraryQuickStart` with your project name.

    ```ruby
    platform :ios, '14.0'
    
    target 'UILibraryQuickStart' do
        use_frameworks!
        pod 'AzureCommunicationUIChat', '1.0.0-beta.5'
    end
    ```

1. Run `pod install --repo-update`.

1. In Xcode, open the generated *xcworkspace* file.

### Turn off User Script Sandboxing

Some of the scripts within the linked libraries write files during the build process. To enable file writing, disable the User Script Sandboxing in Xcode.

In the Xcode project, under **Build Settings**, set the **User Script Sandboxing** option to **No**. To find the setting, change the filter from **Basic** to **All** or use the search bar.

Screenshot that shows the Build Settings option to turn off User Script Sandboxing.

## Initialize the composite

To initialize the composite:

1. Go to `ViewController`.

1. Add the following code to initialize your composite components for a chat. Replace `<USER_ID>` with user identifier. Replace `<USER_ACCESS_TOKEN>` with your access token. Replace `<ENDPOINT_URL>` with your endpoint URL. Replace `<THREAD_ID>` with your chat thread ID. Replace `<DISPLAY_NAME>` with your name. (The string length limit for `<DISPLAY_NAME>` is 256 characters).

    ```swift
    import UIKit
    import AzureCommunicationCommon
    import AzureCommunicationUIChat
    
    class ViewController: UIViewController {
        var chatAdapter: ChatAdapter?
    
        override func viewDidLoad() {
            super.viewDidLoad()
    
            let button = UIButton()
            var configuration = UIButton.Configuration.filled()
            configuration.contentInsets = NSDirectionalEdgeInsets(top: 10.0, leading: 20.0, bottom: 10.0, trailing: 20.0)
            configuration.baseBackgroundColor = .systemBlue
            button.configuration = configuration
            button.layer.cornerRadius = 10
            button.setTitle("Start Experience", for: .normal)
            button.addTarget(self, action: #selector(startChatComposite), for: .touchUpInside)
    
            button.translatesAutoresizingMaskIntoConstraints = false
            self.view.addSubview(button)
            button.widthAnchor.constraint(equalToConstant: 200).isActive = true
            button.heightAnchor.constraint(equalToConstant: 50).isActive = true
            button.centerXAnchor.constraint(equalTo: view.centerXAnchor).isActive = true
            button.centerYAnchor.constraint(equalTo: view.centerYAnchor).isActive = true
        }
    
        @objc private func startChatComposite() {
            let communicationIdentifier = CommunicationUserIdentifier("<USER_ID>")
            guard let communicationTokenCredential = try? CommunicationTokenCredential(
                token: "<USER_ACCESS_TOKEN>") else {
                return
            }
    
            self.chatAdapter = ChatAdapter(
                endpoint: "<ENDPOINT_URL>", identifier: communicationIdentifier,
                credential: communicationTokenCredential,
                threadId: "<THREAD_ID>",
                displayName: "<DISPLAY_NAME>")
    
            Task { @MainActor in
                guard let chatAdapter = self.chatAdapter else {
                    return
                }
                try await chatAdapter.connect()
                let chatCompositeViewController = ChatCompositeViewController(
                    with: chatAdapter)
    
                let closeItem = UIBarButtonItem(
                    barButtonSystemItem: .close,
                    target: nil,
                    action: #selector(self.onBackBtnPressed))
                chatCompositeViewController.title = "Chat"
                chatCompositeViewController.navigationItem.leftBarButtonItem = closeItem
    
                let navController = UINavigationController(rootViewController: chatCompositeViewController)
                navController.modalPresentationStyle = .fullScreen
    
                self.present(navController, animated: true, completion: nil)
            }
        }
    
        @objc func onBackBtnPressed() {
            self.dismiss(animated: true, completion: nil)
            Task { @MainActor in
                self.chatAdapter?.disconnect(completionHandler: { [weak self] result in
                    switch result {
                    case .success:
                        self?.chatAdapter = nil
                    case .failure(let error):
                        print("disconnect error \(error)")
                    }
                })
            }
        }
    }

    ```

1. If you choose to put chat view in a frame that's smaller than the screen size, we recommend the minimum width of 250 and the minimum height of 300.

## Run the code

To build and run your app on the iOS simulator, select **Product** > **Run**. You can also use the (&#8984;-R) keyboard shortcut. Then, try out the chat experience on the simulator.

1. Select **Start Experience**.
1. The chat client joins the chat thread, and you can start typing and sending messages.
1. If the client can't join the thread and you see `chatJoin` failed errors, verify that your user's access token is valid and that the user was added to the chat thread by REST API call or by using the az command-line interface.

GIF animation that demonstrates the final look and feel of the quickstart iOS app.




## Clean up resources

If you want to clean up and remove an Azure Communication Services subscription, you can delete the resource or resource group.

Deleting the resource group also deletes any other resources associated with it.

Learn more about [cleaning up resources](../create-communication-resource.md#clean-up-resources).
