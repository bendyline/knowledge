---
title: Azure Notification Hubs Secure Push for Windows
description: Learn how to send secure push notifications in Azure. Code samples written in C# using the .NET API.
author: sethmanheim
manager: lizross
editor: thsomasu
services: notification-hubs

ms.service: azure-notification-hubs
ms.tgt_pltfrm: windows
ms.devlang: csharp
ms.topic: article
ms.date: 09/14/2020
ms.author: sethm
ms.reviewer: thsomasu
ms.lastreviewed: 01/04/2019
ms.custom: devx-track-csharp, devx-track-dotnet
---

# Send secure push notifications from Azure Notification Hubs

> 
> * [Windows Universal](notification-hubs-aspnet-backend-windows-dotnet-wns-secure-push-notification.md)
> * [iOS](notification-hubs-aspnet-backend-ios-push-apple-apns-secure-notification.md)
> * [Android](android-sdk.md)

## Overview

Push notification support in Microsoft Azure enables you to access an easy-to-use, multi-platform, scaled-out push infrastructure, which greatly simplifies the implementation of push notifications for both consumer and enterprise applications for mobile platforms.

Due to regulatory or security constraints, sometimes an application might want to include something in the notification that cannot be transmitted through the standard push notification infrastructure. This tutorial describes how to achieve the same experience by sending sensitive information through a secure, authenticated connection between the client device and the app backend.

At a high level, the flow is as follows:

1. The app back-end:
   * Stores secure payload in back-end database.
   * Sends the ID of this notification to the device (no secure information is sent).
2. The app on the device, when receiving the notification:
   * The device contacts the back-end requesting the secure payload.
   * The app can show the payload as a notification on the device.

It is important to note that in the preceding flow (and in this tutorial), we assume that the device stores an authentication token in local storage, after the user logs in. This guarantees a completely seamless experience, as the device can retrieve the notification’s secure payload using this token. If your application does not store authentication tokens on the device, or if these tokens can be expired, the device app, upon receiving the notification should display a generic notification prompting the user to launch the app. The app then authenticates the user and shows the notification payload.

This tutorial shows how to send a push notification securely. The tutorial builds on the [Notify users](notification-hubs-aspnet-backend-windows-dotnet-wns-notification.md) tutorial, so you should complete the steps in that tutorial first.

> **Note:**
> This tutorial assumes that you have created and configured your notification hub as described in [Send notifications to Universal Windows Platform apps](notification-hubs-windows-store-dotnet-get-started-wns-push-notification.md).
> Also, note that Windows Phone 8.1 requires Windows (not Windows Phone) credentials, and that background tasks do not work on Windows Phone 8.0 or Silverlight 8.1. For Windows Store applications, you can receive notifications via a background task only if the app is lock-screen enabled (click the checkbox in the Appmanifest).


## WebAPI Project

1. In Visual Studio, open the **AppBackend** project that you created in the **Notify Users** tutorial.
2. In Notifications.cs, replace the entire **Notifications** class with the following code. Be sure to replace the placeholders with your connection string (with full access) for your notification hub, and the hub name. You can obtain these values from the [Azure portal](https://portal.azure.com). This module now represents the different secure notifications that will be sent. In a complete implementation, the notifications will be stored in a database; for simplicity, in this case we store them in memory.

   ```csharp
    public class Notification
    {
        public int Id { get; set; }
        public string Payload { get; set; }
        public bool Read { get; set; }
    }

    public class Notifications
    {
        public static Notifications Instance = new Notifications();

        private List<Notification> notifications = new List<Notification>();

        public NotificationHubClient Hub { get; set; }

        private Notifications() {
            Hub = NotificationHubClient.CreateClientFromConnectionString("{conn string with full access}",     "{hub name}");
        }

        public Notification CreateNotification(string payload)
        {
            var notification = new Notification() {
            Id = notifications.Count,
            Payload = payload,
            Read = false
            };

            notifications.Add(notification);

            return notification;
        }

        public Notification ReadNotification(int id)
        {
            return notifications.ElementAt(id);
        }
    }
    ```

3. In NotificationsController.cs, replace the code inside the **NotificationsController** class definition with the following code. This component implements a way for the device to retrieve the notification securely, and also provides a way (for the purposes of this tutorial) to trigger a secure push to your devices. Note that when sending the notification to the notification hub, we only send a raw notification with the ID of the notification (and no actual message):

   ```csharp
    public NotificationsController()
    {
        Notifications.Instance.CreateNotification("This is a secure notification!");
    }

    // GET api/notifications/id
    public Notification Get(int id)
    {
        return Notifications.Instance.ReadNotification(id);
    }

    public async Task<HttpResponseMessage> Post()
    {
        var secureNotificationInTheBackend = Notifications.Instance.CreateNotification("Secure confirmation.");
        var usernameTag = "username:" + HttpContext.Current.User.Identity.Name;

        // windows
        var rawNotificationToBeSent = new Microsoft.Azure.NotificationHubs.WindowsNotification(secureNotificationInTheBackend.Id.ToString(),
                        new Dictionary<string, string> {
                            {"X-WNS-Type", "wns/raw"}
                        });
        await Notifications.Instance.Hub.SendNotificationAsync(rawNotificationToBeSent, usernameTag);

        // apns
        await Notifications.Instance.Hub.SendAppleNativeNotificationAsync("{\"aps\": {\"content-available\": 1}, \"secureId\": \"" + secureNotificationInTheBackend.Id.ToString() + "\"}", usernameTag);

        // gcm
        await Notifications.Instance.Hub.SendGcmNativeNotificationAsync("{\"data\": {\"secureId\": \"" + secureNotificationInTheBackend.Id.ToString() + "\"}}", usernameTag);

        return Request.CreateResponse(HttpStatusCode.OK);
    }
    ```

Note that the `Post` method now does not send a toast notification. It sends a raw notification that contains only the notification ID, and not any sensitive content. Also, make sure to comment the send operation for the platforms for which you do not have credentials configured on your notification hub, as they will result in errors.

1. Now we will re-deploy this app to an Azure Website in order to make it accessible from all devices. Right-click on the **AppBackend** project and select **Publish**.
2. Select Azure Website as your publish target. Sign in with your Azure account and select an existing or new Website, and make a note of the **destination URL** property in the **Connection** tab. We will refer to this URL as your *backend endpoint* later in this tutorial. Click **Publish**.


## Modify the Windows Phone project

1. In the **NotifyUserWindowsPhone** project, add the following code to App.xaml.cs to register the push background task. Add the following line of code at the end of the `OnLaunched()` method:

    ```csharp
    RegisterBackgroundTask();
    ```

2. Still in App.xaml.cs, add the following code immediately after the `OnLaunched()` method:

    ```csharp
    private async void RegisterBackgroundTask()
    {
        if (!Windows.ApplicationModel.Background.BackgroundTaskRegistration.AllTasks.Any(i => i.Value.Name == "PushBackgroundTask"))
        {
            var result = await BackgroundExecutionManager.RequestAccessAsync();
            var builder = new BackgroundTaskBuilder();

            builder.Name = "PushBackgroundTask";
            builder.TaskEntryPoint = typeof(PushBackgroundComponent.PushBackgroundTask).FullName;
            builder.SetTrigger(new Windows.ApplicationModel.Background.PushNotificationTrigger());
            BackgroundTaskRegistration task = builder.Register();
        }
    }
    ```

3. Add the following `using` statements at the top of the App.xaml.cs file:

    ```csharp
    using Windows.Networking.PushNotifications;
    using Windows.ApplicationModel.Background;
    ```

4. From the **File** menu in Visual Studio, click **Save All**.

## Create the push background component

The next step is to create the push background component.

1. In Solution Explorer, right-click the top-level node of the solution (**Solution SecurePush** in this case), then click **Add**, then click **New Project**.
2. Expand **Store Apps**, then click **Windows Phone Apps**, then click **Windows Runtime Component (Windows Phone)**. Name the project **PushBackgroundComponent**, and then click **OK** to create the project.

    Screenshot of the Add New Project dialog with the Windows Runtime Component (Windows Phone) Visual C# option highlighted.
3. In Solution Explorer, right-click the **PushBackgroundComponent (Windows Phone 8.1)** project, then click **Add**, then click **Class**. Name the new class `PushBackgroundTask.cs`. Click **Add** to generate the class.
4. Replace the entire contents of the `PushBackgroundComponent` namespace definition with the following code, substituting the placeholder `{back-end endpoint}` with the back-end endpoint obtained while deploying your back-end:

    ```csharp
    public sealed class Notification
        {
            public int Id { get; set; }
            public string Payload { get; set; }
            public bool Read { get; set; }
        }

        public sealed class PushBackgroundTask : IBackgroundTask
        {
            private string GET_URL = "{back-end endpoint}/api/notifications/";

            async void IBackgroundTask.Run(IBackgroundTaskInstance taskInstance)
            {
                // Store the content received from the notification so it can be retrieved from the UI.
                RawNotification raw = (RawNotification)taskInstance.TriggerDetails;
                var notificationId = raw.Content;

                // retrieve content
                BackgroundTaskDeferral deferral = taskInstance.GetDeferral();
                var httpClient = new HttpClient();
                var settings = ApplicationData.Current.LocalSettings.Values;
                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", (string)settings["AuthenticationToken"]);

                var notificationString = await httpClient.GetStringAsync(GET_URL + notificationId);

                var notification = JsonConvert.DeserializeObject<Notification>(notificationString);

                ShowToast(notification);

                deferral.Complete();
            }

            private void ShowToast(Notification notification)
            {
                ToastTemplateType toastTemplate = ToastTemplateType.ToastText01;
                XmlDocument toastXml = ToastNotificationManager.GetTemplateContent(toastTemplate);
                XmlNodeList toastTextElements = toastXml.GetElementsByTagName("text");
                toastTextElements[0].AppendChild(toastXml.CreateTextNode(notification.Payload));
                ToastNotification toast = new ToastNotification(toastXml);
                ToastNotificationManager.CreateToastNotifier().Show(toast);
            }
        }
    ```

5. In Solution Explorer, right-click the **PushBackgroundComponent (Windows Phone 8.1)** project and then click **Manage NuGet Packages**.
6. On the left-hand side, click **Online**.
7. In the **Search** box, type **Http Client**.
8. In the results list, click **Microsoft HTTP Client Libraries**, and then click **Install**. Complete the installation.
9. Back in the NuGet **Search** box, type **Json.net**. Install the **Json.NET** package, then close the NuGet Package Manager window.
10. Add the following `using` statements at the top of the `PushBackgroundTask.cs` file:

    ```csharp
    using Windows.ApplicationModel.Background;
    using Windows.Networking.PushNotifications;
    using System.Net.Http;
    using Windows.Storage;
    using System.Net.Http.Headers;
    using Newtonsoft.Json;
    using Windows.UI.Notifications;
    using Windows.Data.Xml.Dom;
    ```

11. In Solution Explorer, in the **NotifyUserWindowsPhone (Windows Phone 8.1)** project, right-click **References**, then click **Add Reference...**. In the Reference Manager dialog, check the box next to **PushBackgroundComponent**, and then click **OK**.
12. In Solution Explorer, double-click **Package.appxmanifest** in the **NotifyUserWindowsPhone (Windows Phone 8.1)** project. Under **Notifications**, set **Toast Capable** to **Yes**.

    Screenshot of the Solution Explorer window focusing on the Package.appxmanifest with the Toast capable option set to Yes outlined in red.
13. Still in **Package.appxmanifest**, click the **Declarations** menu near the top. In the **Available Declarations** dropdown, click **Background Tasks**, and then click **Add**.
14. In **Package.appxmanifest**, under **Properties**, check **Push notification**.
15. In **Package.appxmanifest**, under **App Settings**, type **PushBackgroundComponent.PushBackgroundTask** in the **Entry Point** field.

    Screenshot of the Solution Explorer window focusing on the Package.appxmanifest with the Available Declarations, Supported Declarations, Push notifications, and Entry point options outlined in red.
16. From the **File** menu, click **Save All**.

## Run the application

To run the application, do the following:

1. In Visual Studio, run the **AppBackend** Web API application. An ASP.NET web page is displayed.
2. In Visual Studio, run the **NotifyUserWindowsPhone (Windows Phone 8.1)** Windows Phone app. The Windows Phone emulator runs and loads the app automatically.
3. In the **NotifyUserWindowsPhone** app UI, enter a username and password. These can be any string, but they must be the same value.
4. In the **NotifyUserWindowsPhone** app UI, click **Log in and register**. Then click **Send push**.

[3]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/notification-hubs/media/notification-hubs-aspnet-backend-windows-dotnet-secure-push/notification-hubs-secure-push3.png
[12]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/notification-hubs/media/notification-hubs-aspnet-backend-windows-dotnet-secure-push/notification-hubs-secure-push12.png
[13]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/notification-hubs/media/notification-hubs-aspnet-backend-windows-dotnet-secure-push/notification-hubs-secure-push13.png
