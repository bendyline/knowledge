---
author: awang119
ms.author: awang119
ms.date: 01/04/2023
ms.topic: include
ms.service: azure-communication-services
---

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
- A deployed [Azure Communication Services resource](../../../create-communication-resource.md). Note the endpoint URL.
- An Azure Communication Services [access token](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/quickstarts/identity/quick-create-identity.md) and user identifier.
- An Azure Communication Services [chat thread](../../../chat/get-started.md). Add the user you created in the previous step to this chat thread.

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
