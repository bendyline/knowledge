---
title: Send notifications to Universal Windows Platform apps using Azure Notification Hubs | Microsoft Docs
description: Lean how to use Azure Notification Hubs to push notifications to a Windows Universal Platform application.
services: notification-hubs
author: sethmanheim
manager: lizross
ms.service: azure-notification-hubs
ms.tgt_pltfrm: mobile-windows
ms.devlang: csharp
ms.topic: tutorial
ms.date: 05/01/2025
ms.author: sethm
ms.custom:
  - mvc
  - devx-track-csharp
  - sfi-image-nochange
---

# Tutorial: Send notifications to Universal Windows Platform apps using Azure Notification Hubs

> 
> * [Android](notification-hubs-android-push-notification-google-fcm-get-started.md)
> * [Baidu](notification-hubs-baidu-china-android-notifications-get-started.md)
> * [iOS](ios-sdk-get-started.md)
> * [Kindle](notification-hubs-android-push-notification-google-fcm-get-started.md)
> * [Windows Phone Silverlight 8.x](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/notification-hubs/notification-hubs-windows-mobile-push-notifications-mpns.md)
> * [Universal Windows Platform](notification-hubs-windows-store-dotnet-get-started-wns-push-notification.md)
> 
>


In this tutorial, you create a notification hub to send push notifications to a Universal Windows Platform (UWP) app. You create a blank Windows Store app that receives push notifications by using the Windows Push Notification Service (WNS). Then, you use your notification hub to broadcast push notifications to all devices that are running your app.

> **Note:**
> You can find the complete code for this tutorial on [GitHub](https://github.com/Azure/azure-notificationhubs-dotnet/tree/master/Samples/UwpSample).

You take the following steps:

> 
> * Create an app in Windows Store
> * Create a notification hub
> * Create a sample Windows app
> * Send test notifications

## Prerequisites

* **Azure subscription**. If you don't have an Azure subscription, [create a free Azure account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.
* Microsoft Visual Studio 2017 or later. The example in this tutorial uses [Visual Studio 2019](https://www.visualstudio.com/products).
* [UWP app-development tools installed](https://learn.microsoft.com/windows/uwp/get-started/get-set-up).
* An active Windows Store account.
* Confirm that **Get notifications from apps and other senders** setting is enabled.
  * Launch the **Settings** window on your computer.
  * Select the **System** tile.
  * Select **Notifications & actions** from the left menu.
  * Confirm that the **Get notifications from apps and other senders** setting is enabled. If it isn't enabled, enable it.

Completing this tutorial is a prerequisite for all other Notification Hubs tutorials for UWP apps.

## Create an app in Windows Store

> **Note:**
> Microsoft Push Notification Service (MPNS) has been deprecated and is no longer supported.

To send push notifications to UWP apps, associate your app to the Windows Store. Then, configure your notification hub to integrate with WNS.

1. Navigate to the [Windows Dev Center](https://partner.microsoft.com/dashboard/windows/first-run-experience), sign in with your Microsoft account, and then select **Create a new app**.

    New app button

1. Type a name for your app, and then select **Reserve product name**. Doing so creates a new Windows Store registration for your app.

    Store app name

1. Expand **Product management**, and then select **Product Identity**. Take note of the **Package SID**, **Package/Identity/Name**, **Package/Identity/Publisher**, and **Package/Properties/PublisherDisplayName** values.

    Partner center apps

1. Under **Product management**, select **WNS/MPNS**, and then select **App Registration portal**. Sign in to your Microsoft account. The application registration page opens in a new tab.

    WNS page

1. Under **Essentials**, select **Client credentials: Add a certificate or secret**.

    Notification Hub settings on Azure portal

1. On the **Certificates & secrets** page, under **Client secrets**, select **New client secret**. After you create a client secret (also called an application secret), take note of it before you leave the page.

   > **Warning:**
   > You can only view client secret (application secret) values immediately after creating them. Make sure to save the secret before leaving the page.

    Client secret on portal

   > **Warning:**
   > The application secret and package SID are important security credentials. Do not share these values with anyone or distribute them with your app.

## Create a notification hub


1. Sign in to the [Azure portal](https://portal.azure.com).

1. Select **All services** on the left menu.
    A screenshot showing select All Services for an existing namespace.

1. Type **Notification Hubs** in the **Filter services** text box. Select the star icon next to the service name to add the service to the **FAVORITES** section on the left menu. Select **Notification Hubs**.

      A screenshot showing how to filter for notification hubs.

1. On the **Notification Hubs** page, select **Create** on the toolbar.

      A screenshot showing how to create a new notification hub.

1. In the **Basics** tab on the **Notification Hub** page, do the following steps:

    1. In **Subscription**, select the name of the Azure subscription you want to use, and then select an existing resource group, or create a new one.  

    1. Enter a unique name for the new namespace in **Namespace Details**. 

    1. A namespace contains one or more notification hubs, so type a name for the hub in **Notification Hub Details**.

    1. Select a value from the **Location** drop-down list box. This value specifies the location in which you want to create the hub.

       Screenshot showing notification hub details.

    1. Review the [**Availability Zones**](https://learn.microsoft.com/azure/reliability/reliability-notification-hubs?toc=/azure/notification-hubs/toc.json) option. If you choose a region that has availability zones, the check box is selected by default. Availability Zones is a paid feature, so an extra fee is added to your tier.

    1. Choose a **Disaster recovery** option: **None**, **Paired recovery region**, or **Flexible recovery region**. If you choose **Paired recovery region**, the failover region is displayed. If you select **Flexible recovery region**, use the drop-down to choose from a list of recovery regions. 

       Screenshot showing availability zone details.

    1. Select **Create**.

1. When the deployment is complete select **Go to resource**.


### Configure WNS settings for the hub

1. In the **NOTIFICATION SETTINGS** category, select **Windows (WNS)**.
1. Enter values for **Package SID** (such as "ms-app://`<Your Package SID>`") and **Security Key** (the **Application Secret**) you noted from the previous section.
1. Click **Save** on the toolbar.

   The Package SID and Security Key boxes

Your notification hub is now configured to work with WNS. You have the connection strings to register your app and send notifications.

## Create a sample Windows app

1. In Visual Studio, open the **File** menu, select **New**, and then select **Project**.
1. In the **Create a new project** dialog, complete the following steps:

    * In the search box at the top, type **Windows Universal**.
    * In the search results, select **Blank App (Universal Windows)**, and then select **Next**.

       New Project dialog

    * In the **Configure your new project** dialog, enter a **Project name**, and a **Location** for the project files.
    * Select **Create**.

1. Accept the defaults for the **target** and **minimum** platform versions, and select **OK**.
1. In Solution Explorer, right-click the Windows Store app project, select **Publish**, and then select **Associate App with the Store**. The **Associate Your App with the Windows Store** wizard appears.
1. In the wizard, sign in with your Microsoft account.
1. Select the app that you registered in step 2, select **Next**, and then select **Associate**. Doing so adds the required Windows Store registration information to the application manifest.
1. In Visual Studio, right-click the solution, and then select **Manage NuGet Packages**. The **Manage NuGet Packages** window opens.
1. In the search box, enter **WindowsAzure.Messaging.Managed**, select **Install**, and accept the terms of use.

    The Manage NuGet Packages window

    This action downloads, installs, and adds a reference to the Azure Notification Hubs library for Windows by using the [Microsoft.Azure.NotificationHubs NuGet package](https://www.nuget.org/packages/Microsoft.Azure.NotificationHubs).

1. Open the `App.xaml.cs` project file, and add the following statements:

    ```csharp
    using Windows.Networking.PushNotifications;
    using Microsoft.WindowsAzure.Messaging;
    using Windows.UI.Popups;
    ```

1. In the project's `App.xaml.cs` file, locate the `App` class, and add the following `InitNotificationsAsync` method definition. Replace `<your hub name>` with the name of the notification hub you created in the Azure portal, and replace `<Your DefaultListenSharedAccessSignature connection string>` with the `DefaultListenSharedAccessSignature` connection string from the **Access Polices** page of your notification hub:

   ```csharp
   private async void InitNotificationsAsync()
   {
       var channel = await PushNotificationChannelManager.CreatePushNotificationChannelForApplicationAsync();

       var hub = new NotificationHub("<your hub name>", "<Your DefaultListenSharedAccessSignature connection string>");
       var result = await hub.RegisterNativeAsync(channel.Uri);

       // Displays the registration ID so you know it was successful
       if (result.RegistrationId != null)
       {
           var dialog = new MessageDialog("Registration successful: " + result.RegistrationId);
           dialog.Commands.Add(new UICommand("OK"));
           await dialog.ShowAsync();
       }
   }
   ```

   This code retrieves the channel URI for the app from WNS, and then registers that channel URI with your notification hub.

   >**Note:**
   > Replace the `hub name` placeholder with the name of the notification hub that appears in the Azure portal. Also replace the connection string placeholder with the `DefaultListenSharedAccessSignature` connection string that you obtained from the **Access Polices** page of your notification hub in a previous section.

1. At the top of the `OnLaunched` event handler in `App.xaml.cs`, add the following call to the new `InitNotificationsAsync` method:

    ```csharp
    InitNotificationsAsync();
    ```

    This action guarantees that the channel URI is registered in your notification hub each time the application launches.

1. Right-click `Package.appxmanifest` and select **View Code (F7)**. Locate  `<Identity .../>` and replace the **Name** value with the **Package/Identity/Name**, and replace its **Publisher** value with the **Package/Identity/Publisher** value from the app you created [earlier](#create-an-app-in-windows-store).

1. To run the app, press the keyboard's **F5** key. A dialog box containing the registration key will display. To close the dialog, click **OK**.

    Registration successful

Your app is now ready to receive toast notifications.

## Send test notifications

You can quickly test receiving notifications in your app by sending notifications in the [Azure portal](https://portal.azure.com/).

1. In the Azure portal, switch to the Overview tab, and select **Test Send** on the toolbar.

    Test Send button
1. In the **Test Send** window, do the following actions:

    * For **Platforms**, select **Windows**.
    * For **Notification Type**, select **Toast**.
    * Select **Send**.

      The Test Send pane

1. See the result of the Send operation in the **Result** list at the bottom of the window. You also see an alert message.

    Result of Send operation

1. You see the notification message: **Test message** on your desktop.

   Notification message

## Next steps

You sent broadcast notifications to all your Windows devices by using the Azure portal or a console app. To learn how to push notifications to specific devices, advance to the following tutorial:

> 
>[Push notifications to specific devices](
notification-hubs-windows-notification-dotnet-push-xplat-segmented-wns.md)

<!-- Images. -->
[20]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/notification-hubs/media/notification-hubs-windows-store-dotnet-get-started/notification-hub-windows-universal-app-install-package.png
