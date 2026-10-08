---
title: Send notifications to specific users using Azure Notification Hubs | Microsoft Docs
description: Learn how to send notifications to specific users using Universal Windows Platform (UWP) applications.
author: sethmanheim
manager: lizross
services: notification-hubs

ms.service: azure-notification-hubs
ms.tgt_pltfrm: mobile-windows
ms.devlang: csharp
ms.topic: tutorial
ms.custom: mvc, devx-track-dotnet
ms.date: 08/17/2020
ms.author: sethm
ms.reviewer: thsomasu
ms.lastreviewed: 03/22/2019
---

# Tutorial: Send notifications to specific users by using Azure Notification Hubs

> 
> * [Android](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/notification-hubs/notification-hubs-aspnet-backend-gcm-android-push-to-user-google-notification.md)
> * [iOS](notification-hubs-aspnet-backend-ios-apple-apns-notification.md)
> * [Windows Runtime 8.1 universal](notification-hubs-aspnet-backend-windows-dotnet-wns-notification.md)
> 
> 



## Overview

This tutorial describes how to use Azure Notification Hubs to send push notifications to a specific app user on a specific device. An ASP.NET WebAPI backend is used to authenticate clients. When the backend authenticates a client application user, it automatically adds a tag to the notification registration. The backend uses this tag to send notifications to the specific user.

> **Note:**
> The completed code for this tutorial can be found on [GitHub](https://github.com/Azure/azure-notificationhubs-dotnet/tree/master/Samples/NotifyUsers).

In this tutorial, you take the following steps:

> 
> * Create the WebAPI project
> * Authenticate clients to the WebAPI backend
> * Register for notifications by using the WebAPI backend
> * Send notifications from the WebAPI backend
> * Publish the new WebAPI backend
> * Update the code for the client project
> * Test the application

## Prerequisites

This tutorial builds on the notification hub and Visual Studio project that you created in the [Tutorial: Send notifications to Universal Windows Platform apps by using Azure Notification Hubs](notification-hubs-windows-store-dotnet-get-started-wns-push-notification.md) tutorial. Therefore, complete it before starting on this tutorial.

> **Note:**
> If you are using Mobile Apps in Azure App Service as your backend service, see the [Mobile Apps version](https://learn.microsoft.com/previous-versions/azure/app-service-mobile/app-service-mobile-windows-store-dotnet-get-started-push) of this tutorial.


## Create the WebAPI project

The following sections discuss the creation of a new ASP.NET WebAPI backend. This process has three main purposes:

- **Authenticate clients**: You add a message handler to authenticate client requests and associate the user with the request.
- **Register for notifications by using the WebAPI backend**: You add a controller to handle new registrations for a client device to receive notifications. The authenticated username is automatically added to the registration as a [tag](notification-hubs-tags-segment-push-message.md).
- **Send notifications to clients**: You add a controller to provide a way for users to trigger a secure push to devices and clients associated with the tag.

Create the new ASP.NET Core 6.0 web API backend by doing the following actions:

>To check, start Visual Studio. On the **Tools** menu, select **Extensions and Updates**. Search for **NuGet Package Manager** in your version of Visual Studio, and make sure you have the latest version. If your version is not the latest version, uninstall it, and then reinstall the NuGet Package Manager.

Screenshot of the Extensions and Updates dialog box with the NuGet Package manage for Visual Studios package highlighted.

> **Note:**
> Make sure you have installed the Visual Studio [Azure SDK](https://azure.microsoft.com/downloads/) for website deployment.

1. Start Visual Studio or Visual Studio Express.

2. Select **Server Explorer**, and sign in to your Azure account. To create the web site resources on your account, you must be signed in.

3. In Visual Studio's **File** menu, select **New** > **Project**.

4. Enter **Web API** in the search box.

5. Select the **ASP.NET Core Web API** project template and select **Next**.

6. In the **Configure your new project** dialog, name the project **AppBackend** and select **Next**.

7. In the **Additional information** dialog:
   * Confirm the **Framework** is **.NET 6.0 (Long-term support)**.
   * Confirm the checkbox for **Use controllers(uncheck to use minimal APIs)** is checked.
   * Uncheck **Enable OpenAPI support**.
   * Select **Create**.

## Remove the WeatherForecast template files
1. Remove the *WeatherForecast.cs* and *Controllers/WeatherForecastController.cs* example files from the new *AppBackend* project.
2. Open *Properties\launchSettings.json*.
3. Change **launchUrl** properties from **weatherforcast** to **appbackend**.

In the **Configure Microsoft Azure Web App** window, select a subscription and then, in the **App Service plan** list, do either of the following actions:

   * Select an Azure App Service plan that you've already created.
   * Select **Create a new app service plan**, and then create one.

   You do not need a database for this tutorial. After you have selected your app service plan, select **OK** to create the project.

   The Configure Microsoft Azure Web App window

   If you don't see this page for configure app service plan, continue with the tutorial. You can configure it while publishing the app later.

## Authenticate clients to the WebAPI backend

In this section, you create a new message-handler class named **AuthenticationTestHandler** for the new backend. This class is derived from [DelegatingHandler](https://learn.microsoft.com/previous-versions/visualstudio/hh193679\(v=vs.118\)) and added as a message handler so that it can process all requests that come into the backend.

1. In Solution Explorer, right-click the **AppBackend** project, select **Add**, and then select **Class**.
2. Name the new class **AuthenticationTestHandler.cs**, and then select **Add** to generate the class. This class authenticates users by using *Basic Authentication* for simplicity. Your app can use any authentication scheme.
3. In AuthenticationTestHandler.cs, add the following `using` statements:

    ```csharp
    using System.Net.Http;
    using System.Threading;
    using System.Security.Principal;
    using System.Net;
    using System.Text;
    using System.Threading.Tasks;
    ```

4. In AuthenticationTestHandler.cs, replace the `AuthenticationTestHandler` class definition with the following code:

    The handler authorizes the request when the following three conditions are true:

   * The request includes an *Authorization* header.
   * The request uses *basic* authentication.
   * The user name string and the password string are the same string.

   Otherwise, the request is rejected. This authentication is not a true authentication and authorization approach. It is only a simple example for this tutorial.

   If the request message is authenticated and authorized by `AuthenticationTestHandler`, the basic authentication user is attached to the current request on [HttpContext](https://learn.microsoft.com/dotnet/api/system.web.httpcontext.current). User information in HttpContext will be used by another controller (RegisterController) later to add a [tag](https://learn.microsoft.com/previous-versions/azure/azure-services/dn530749\(v=azure.100\)) to the notification registration request.

    ```csharp
    public class AuthenticationTestHandler : DelegatingHandler
    {
        protected override Task<HttpResponseMessage> SendAsync(
        HttpRequestMessage request, CancellationToken cancellationToken)
        {
            var authorizationHeader = request.Headers.GetValues("Authorization").First();

            if (authorizationHeader != null && authorizationHeader
                .StartsWith("Basic ", StringComparison.InvariantCultureIgnoreCase))
            {
                string authorizationUserAndPwdBase64 =
                    authorizationHeader.Substring("Basic ".Length);
                string authorizationUserAndPwd = Encoding.Default
                    .GetString(Convert.FromBase64String(authorizationUserAndPwdBase64));
                string user = authorizationUserAndPwd.Split(':')[0];
                string password = authorizationUserAndPwd.Split(':')[1];

                if (VerifyUserAndPwd(user, password))
                {
                    // Attach the new principal object to the current HttpContext object
                    HttpContext.Current.User =
                        new GenericPrincipal(new GenericIdentity(user), new string[0]);
                    System.Threading.Thread.CurrentPrincipal =
                        System.Web.HttpContext.Current.User;
                }
                else return Unauthorized();
            }
            else return Unauthorized();

            return base.SendAsync(request, cancellationToken);
        }

        private bool VerifyUserAndPwd(string user, string password)
        {
            // This is not a real authentication scheme.
            return user == password;
        }

        private Task<HttpResponseMessage> Unauthorized()
        {
            var response = new HttpResponseMessage(HttpStatusCode.Forbidden);
            var tsc = new TaskCompletionSource<HttpResponseMessage>();
            tsc.SetResult(response);
            return tsc.Task;
        }
    }
    ```

    > **Note:**
    > Security note: The `AuthenticationTestHandler` class does not provide true authentication. It is used only to mimic basic authentication and is not secure. You must implement a secure authentication mechanism in your production applications and services.
5. To register the message handler, add the following code at the end of the `Register` method in the *Program.cs* file:

    ```csharp
    config.MessageHandlers.Add(new AuthenticationTestHandler());
    ```
6. Save your changes.

## Register for notifications by using the WebAPI backend

In this section, you add a new controller to the WebAPI backend to handle requests to register a user and a device for notifications by using the client library for notification hubs. The controller adds a user tag for the user that was authenticated and attached to HttpContext by `AuthenticationTestHandler`. The tag has the string format, `"username:<actual username>"`.

1. In Solution Explorer, right-click the **AppBackend** project and then select **Manage NuGet Packages**.

2. In the left pane, select **Online** and then, in the **Search** box, type **Microsoft.Azure.NotificationHubs**.

3. In the results list, select **Microsoft Azure Notification Hubs**, and then select **Install**. Complete the installation, and then close the NuGet Package Manager window.

    This action adds a reference to the Azure Notification Hubs SDK by using the [Microsoft.Azure.Notification Hubs NuGet package](https://www.nuget.org/packages/Microsoft.Azure.NotificationHubs/).

4. Create a new class file that represents the connection with the notification hub that's used to send notifications. In Solution Explorer, right-click the **Models** folder, select **Add**, and then select **Class**. Name the new class **Notifications.cs**, and then select **Add** to generate the class.

    The Add New Item window

5. In Notifications.cs, add the following `using` statement at the top of the file:

    ```csharp
    using Microsoft.Azure.NotificationHubs;
    ```

6. Replace the `Notifications` class definition with the following code, and replace the two placeholders with the connection string (with full access) for your notification hub and the hub name (available at [Azure portal](https://portal.azure.com)):

    ```csharp
    public class Notifications
    {
        public static Notifications Instance = new Notifications();

        public NotificationHubClient Hub { get; set; }

        private Notifications() {
            Hub = NotificationHubClient.CreateClientFromConnectionString("<your hub's DefaultFullSharedAccessSignature>",
                                                                            "<hub name>");
        }
    }
    ```
    > **Important:**
    > Enter the **name** and the **DefaultFullSharedAccessSignature** of your hub before proceeding further. 
    
7. Next, create a new controller named **RegisterController**. In Solution Explorer, right-click the **Controllers** folder, select **Add**, and then select **Controller**.

8. Select **API Controller - Empty**, and then select **Add**.

9. In the **Controller name** box, type **RegisterController** to name the new class, and then select **Add**.

    The Add Controller window.

10. In RegisterController.cs, add the following `using` statements:

    ```csharp
    using Microsoft.Azure.NotificationHubs;
    using Microsoft.Azure.NotificationHubs.Messaging;
    using AppBackend.Models;
    using System.Threading.Tasks;
    using System.Web;
    ```
11. Add the following code inside the `RegisterController` class definition. In this code, you add a user tag for the user that's attached to HttpContext. The user was authenticated and attached to HttpContext by the message filter that you added, `AuthenticationTestHandler`. You can also add optional checks to verify that the user has rights to register for the requested tags.

    ```csharp
    private NotificationHubClient hub;

    public RegisterController()
    {
        hub = Notifications.Instance.Hub;
    }

    public class DeviceRegistration
    {
        public string Platform { get; set; }
        public string Handle { get; set; }
        public string[] Tags { get; set; }
    }

    // POST api/register
    // This creates a registration id
    public async Task<string> Post(string handle = null)
    {
        string newRegistrationId = null;

        // make sure there are no existing registrations for this push handle (used for iOS and Android)
        if (handle != null)
        {
            var registrations = await hub.GetRegistrationsByChannelAsync(handle, 100);

            foreach (RegistrationDescription registration in registrations)
            {
                if (newRegistrationId == null)
                {
                    newRegistrationId = registration.RegistrationId;
                }
                else
                {
                    await hub.DeleteRegistrationAsync(registration);
                }
            }
        }

        if (newRegistrationId == null) 
            newRegistrationId = await hub.CreateRegistrationIdAsync();

        return newRegistrationId;
    }

    // PUT api/register/5
    // This creates or updates a registration (with provided channelURI) at the specified id
    public async Task<HttpResponseMessage> Put(string id, DeviceRegistration deviceUpdate)
    {
        RegistrationDescription registration = null;
        switch (deviceUpdate.Platform)
        {
            case "mpns":
                registration = new MpnsRegistrationDescription(deviceUpdate.Handle);
                break;
            case "wns":
                registration = new WindowsRegistrationDescription(deviceUpdate.Handle);
                break;
            case "apns":
                registration = new AppleRegistrationDescription(deviceUpdate.Handle);
                break;
            case "fcm":
                registration = new FcmRegistrationDescription(deviceUpdate.Handle);
                break;
            default:
                throw new HttpResponseException(HttpStatusCode.BadRequest);
        }

        registration.RegistrationId = id;
        var username = HttpContext.Current.User.Identity.Name;

        // add check if user is allowed to add these tags
        registration.Tags = new HashSet<string>(deviceUpdate.Tags);
        registration.Tags.Add("username:" + username);

        try
        {
            await hub.CreateOrUpdateRegistrationAsync(registration);
        }
        catch (MessagingException e)
        {
            ReturnGoneIfHubResponseIsGone(e);
        }

        return Request.CreateResponse(HttpStatusCode.OK);
    }

    // DELETE api/register/5
    public async Task<HttpResponseMessage> Delete(string id)
    {
        await hub.DeleteRegistrationAsync(id);
        return Request.CreateResponse(HttpStatusCode.OK);
    }

    private static void ReturnGoneIfHubResponseIsGone(MessagingException e)
    {
        var webex = e.InnerException as WebException;
        if (webex.Status == WebExceptionStatus.ProtocolError)
        {
            var response = (HttpWebResponse)webex.Response;
            if (response.StatusCode == HttpStatusCode.Gone)
                throw new HttpRequestException(HttpStatusCode.Gone.ToString());
        }
    }
    ```
12. Save your changes.

## Send notifications from the WebAPI backend

In this section, you add a new controller that exposes a way for client devices to send a notification. The notification is based on the username tag that uses Azure Notification Hubs .NET Library in the ASP.NET WebAPI backend.

1. Create another new controller named **NotificationsController** the same way you created **RegisterController** in the previous section.

2. In NotificationsController.cs, add the following `using` statements:

    ```csharp
    using AppBackend.Models;
    using System.Threading.Tasks;
    using System.Web;
    ```
3. Add the following method to the **NotificationsController** class:

    This code sends a notification type that's based on the Platform Notification Service (PNS) `pns` parameter. The value of `to_tag` is used to set the *username* tag on the message. This tag must match a username tag of an active notification hub registration. The notification message is pulled from the body of the POST request and formatted for the target PNS.

    Depending on the PNS that your supported devices use to receive notifications, the notifications are supported by a variety of formats. For example, on Windows devices, you might use a [toast notification with WNS](https://learn.microsoft.com/uwp/schemas/tiles/toastschema/schema-root) that isn't directly supported by another PNS. In such an instance, your backend needs to format the notification into a supported notification for the PNS of devices you plan to support. Then use the appropriate send API on the [NotificationHubClient class](https://learn.microsoft.com/dotnet/api/microsoft.azure.notificationhubs.notificationhubclient).

    ```csharp
    public async Task<HttpResponseMessage> Post(string pns, [FromBody]string message, string to_tag)
    {
        var user = HttpContext.Current.User.Identity.Name;
        string[] userTag = new string[2];
        userTag[0] = "username:" + to_tag;
        userTag[1] = "from:" + user;

        Microsoft.Azure.NotificationHubs.NotificationOutcome outcome = null;
        HttpStatusCode ret = HttpStatusCode.InternalServerError;

        switch (pns.ToLower())
        {
            case "wns":
                // Windows 8.1 / Windows Phone 8.1
                var toast = @"<toast><visual><binding template=""ToastText01""><text id=""1"">" + 
                            "From " + user + ": " + message + "</text></binding></visual></toast>";
                outcome = await Notifications.Instance.Hub.SendWindowsNativeNotificationAsync(toast, userTag);
                break;
            case "apns":
                // iOS
                var alert = "{\"aps\":{\"alert\":\"" + "From " + user + ": " + message + "\"}}";
                outcome = await Notifications.Instance.Hub.SendAppleNativeNotificationAsync(alert, userTag);
                break;
            case "fcm":
                // Android
                var notif = "{ \"data\" : {\"message\":\"" + "From " + user + ": " + message + "\"}}";
                outcome = await Notifications.Instance.Hub.SendFcmNativeNotificationAsync(notif, userTag);
                break;
        }

        if (outcome != null)
        {
            if (!((outcome.State == Microsoft.Azure.NotificationHubs.NotificationOutcomeState.Abandoned) ||
                (outcome.State == Microsoft.Azure.NotificationHubs.NotificationOutcomeState.Unknown)))
            {
                ret = HttpStatusCode.OK;
            }
        }

        return Request.CreateResponse(ret);
    }
    ```
4. To run the application and ensure the accuracy of your work so far, select the **F5** key. The app opens a web browser, and it is displayed on the ASP.NET home page.

## Publish the new WebAPI backend

Next, you deploy the app to an Azure website to make it accessible from all devices.

1. Right-click the **AppBackend** project, and then select **Publish**.

2. Select **Microsoft Azure App Service** as your publish target, and then select **Publish. The Create App Service window opens. Here you can create all the necessary Azure resources to run the ASP.NET web app in Azure.

    The Microsoft Azure App Service tile

3. In the **Create App Service** window, select your Azure account. Select **Change Type** > **Web App**. Keep the default **Web App Name**, and then select the **Subscription**, **Resource Group**, and **App Service Plan**.

4. Select **Create**.

5. Make a note of the **Site URL** property in the **Summary** section. This URL is your *back-end endpoint* later in the tutorial.

6. Select **Publish**.

After you've completed the wizard, it publishes the ASP.NET web app to Azure and then opens the app in the default browser.  Your application is viewable in Azure App Services.

The URL uses the web app name that you specified earlier, with the format http://<app_name>.azurewebsites.net.

[B1]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/includes/media/notification-hubs-aspnet-backend-notifyusers/notification-hubs-secure-push1.png
[B2]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/includes/media/notification-hubs-aspnet-backend-notifyusers/notification-hubs-secure-push2.png
[B3]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/includes/media/notification-hubs-aspnet-backend-notifyusers/notification-hubs-secure-push3.png
[B4]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/includes/media/notification-hubs-aspnet-backend-notifyusers/notification-hubs-secure-push4.png
[B5]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/includes/media/notification-hubs-aspnet-backend-notifyusers/notification-hubs-secure-push5.png
[B6]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/includes/media/notification-hubs-aspnet-backend-notifyusers/notification-hubs-secure-push6.png
[B7]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/includes/media/notification-hubs-aspnet-backend-notifyusers/notification-hubs-secure-push7.png
[B14]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/includes/media/notification-hubs-aspnet-backend-notifyusers/notification-hubs-secure-push14.png
[B15]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/includes/media/notification-hubs-aspnet-backend-notifyusers/publish-to-app-service.png
[B16]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/includes/media/notification-hubs-aspnet-backend-notifyusers/notification-hubs-notify-users16.PNG
[B18]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/includes/media/notification-hubs-aspnet-backend-notifyusers/notification-hubs-notify-users18.PNG

## Update the code for the UWP client

In this section, you update the code in the project you completed for the [Tutorial: Send notifications to Universal Windows Platform apps by using Azure Notification Hubs](notification-hubs-windows-store-dotnet-get-started-wns-push-notification.md) tutorial. The project should already be associated with the Windows store. It also should be configured to use your notification hub. In this section, you add code to call the new WebAPI backend and use it for registering and sending notifications.

1. In Visual Studio, open the solution you created for the [Tutorial: Send notifications to Universal Windows Platform apps by using Azure Notification Hubs](notification-hubs-windows-store-dotnet-get-started-wns-push-notification.md).
2. In Solution Explorer, right-click the Universal Windows Platform (UWP) project and then click **Manage NuGet Packages**.
3. On the left-hand side, select **Browse**.
4. In the **Search** box, type **Http Client**.
5. In the results list, click **System.Net.Http**, and click **Install**. Complete the installation.
6. Back in the NuGet **Search** box, type **Json.net**. Install the **Newtonsoft.json** package, and then close the NuGet Package Manager window.
7. In Solution Explorer, in the **WindowsApp** project, double-click **MainPage.xaml** to open it in the Visual Studio editor.
8. In the `MainPage.xaml` file, replace the `<Grid>` section with the following code: This code adds a username and password textbox that the user authenticates with. It also adds text boxes for the notification message and the username tag that should receive the notification:

    ```xml
    <Grid>
        <Grid.RowDefinitions>
            <RowDefinition Height="Auto"/>
            <RowDefinition Height="*"/>
        </Grid.RowDefinitions>

        <TextBlock Grid.Row="0" Text="Notify Users" HorizontalAlignment="Center" FontSize="48"/>

        <StackPanel Grid.Row="1" VerticalAlignment="Center">
            <Grid>
                <Grid.RowDefinitions>
                    <RowDefinition Height="Auto"/>
                    <RowDefinition Height="Auto"/>
                    <RowDefinition Height="Auto"/>
                    <RowDefinition Height="Auto"/>
                    <RowDefinition Height="Auto"/>
                    <RowDefinition Height="Auto"/>
                    <RowDefinition Height="Auto"/>
                    <RowDefinition Height="Auto"/>
                    <RowDefinition Height="Auto"/>
                    <RowDefinition Height="Auto"/>
                    <RowDefinition Height="Auto"/>
                </Grid.RowDefinitions>
                <Grid.ColumnDefinitions>
                    <ColumnDefinition></ColumnDefinition>
                    <ColumnDefinition></ColumnDefinition>
                    <ColumnDefinition></ColumnDefinition>
                </Grid.ColumnDefinitions>
                <TextBlock Grid.Row="0" Grid.ColumnSpan="3" Text="Username" FontSize="24" Margin="20,0,20,0"/>
                <TextBox Name="UsernameTextBox" Grid.Row="1" Grid.ColumnSpan="3" Margin="20,0,20,0"/>
                <TextBlock Grid.Row="2" Grid.ColumnSpan="3" Text="Password" FontSize="24" Margin="20,0,20,0" />
                <PasswordBox Name="PasswordTextBox" Grid.Row="3" Grid.ColumnSpan="3" Margin="20,0,20,0"/>

                <Button Grid.Row="4" Grid.ColumnSpan="3" HorizontalAlignment="Center" VerticalAlignment="Center"
                            Content="1. Login and register" Click="LoginAndRegisterClick" Margin="0,0,0,20"/>

                <ToggleButton Name="toggleWNS" Grid.Row="5" Grid.Column="0" HorizontalAlignment="Right" Content="WNS" IsChecked="True" />
                <ToggleButton Name="toggleFCM" Grid.Row="5" Grid.Column="1" HorizontalAlignment="Center" Content="FCM" />
                <ToggleButton Name="toggleAPNS" Grid.Row="5" Grid.Column="2" HorizontalAlignment="Left" Content="APNS" />

                <TextBlock Grid.Row="6" Grid.ColumnSpan="3" Text="Username Tag To Send To" FontSize="24" Margin="20,0,20,0"/>
                <TextBox Name="ToUserTagTextBox" Grid.Row="7" Grid.ColumnSpan="3" Margin="20,0,20,0" TextWrapping="Wrap" />
                <TextBlock Grid.Row="8" Grid.ColumnSpan="3" Text="Enter Notification Message" FontSize="24" Margin="20,0,20,0"/>
                <TextBox Name="NotificationMessageTextBox" Grid.Row="9" Grid.ColumnSpan="3" Margin="20,0,20,0" TextWrapping="Wrap" />
                <Button Grid.Row="10" Grid.ColumnSpan="3" HorizontalAlignment="Center" Content="2. Send push" Click="PushClick" Name="SendPushButton" />
            </Grid>
        </StackPanel>
    </Grid>
    ```

9. In Solution Explorer, open the `MainPage.xaml.cs` file for the **(Windows 8.1)** and **(Windows Phone 8.1)** projects. Add the following `using` statements at the top of both files:

    ```csharp
    using System.Net.Http;
    using Windows.Storage;
    using System.Net.Http.Headers;
    using Windows.Networking.PushNotifications;
    using Windows.UI.Popups;
    using System.Threading.Tasks;
    ```

10. In `MainPage.xaml.cs` for the **WindowsApp** project, add the following member to the `MainPage` class. Be sure to replace `<Enter Your Backend Endpoint>` with your actual backend endpoint obtained previously. For example, `http://mybackend.azurewebsites.net`.

    ```csharp
    private static string BACKEND_ENDPOINT = "<Enter Your Backend Endpoint>";
    ```

11. Add the code below to the MainPage class in `MainPage.xaml.cs` for the **(Windows 8.1)** and **(Windows Phone 8.1)** projects.

    The `PushClick` method is the click handler for the **Send Push** button. It calls the backend to trigger a notification to all devices with a username tag that matches the `to_tag` parameter. The notification message is sent as JSON content in the request body.

    The `LoginAndRegisterClick` method is the click handler for the **Login and register** button. It stores the basic authentication token (represents any token your authentication scheme uses) in local storage, then uses `RegisterClient` to register for notifications using the backend.

    ```csharp
    private async void PushClick(object sender, RoutedEventArgs e)
    {
        if (toggleWNS.IsChecked.Value)
        {
            await sendPush("wns", ToUserTagTextBox.Text, this.NotificationMessageTextBox.Text);
        }
        if (toggleFCM.IsChecked.Value)
        {
            await sendPush("fcm", ToUserTagTextBox.Text, this.NotificationMessageTextBox.Text);
        }
        if (toggleAPNS.IsChecked.Value)
        {
            await sendPush("apns", ToUserTagTextBox.Text, this.NotificationMessageTextBox.Text);

        }
    }

    private async Task sendPush(string pns, string userTag, string message)
    {
        var POST_URL = BACKEND_ENDPOINT + "/api/notifications?pns=" +
            pns + "&to_tag=" + userTag;

        using (var httpClient = new HttpClient())
        {
            var settings = ApplicationData.Current.LocalSettings.Values;
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", (string)settings["AuthenticationToken"]);

            try
            {
                await httpClient.PostAsync(POST_URL, new StringContent("\"" + message + "\"",
                    System.Text.Encoding.UTF8, "application/json"));
            }
            catch (Exception ex)
            {
                MessageDialog alert = new MessageDialog(ex.Message, "Failed to send " + pns + " message");
                alert.ShowAsync();
            }
        }
    }

    private async void LoginAndRegisterClick(object sender, RoutedEventArgs e)
    {
        SetAuthenticationTokenInLocalStorage();

        var channel = await PushNotificationChannelManager.CreatePushNotificationChannelForApplicationAsync();

        // The "username:<user name>" tag gets automatically added by the message handler in the backend.
        // The tag passed here can be whatever other tags you may want to use.
        try
        {
            // The device handle used is different depending on the device and PNS.
            // Windows devices use the channel uri as the PNS handle.
            await new RegisterClient(BACKEND_ENDPOINT).RegisterAsync(channel.Uri, new string[] { "myTag" });

            var dialog = new MessageDialog("Registered as: " + UsernameTextBox.Text);
            dialog.Commands.Add(new UICommand("OK"));
            await dialog.ShowAsync();
            SendPushButton.IsEnabled = true;
        }
        catch (Exception ex)
        {
            MessageDialog alert = new MessageDialog(ex.Message, "Failed to register with RegisterClient");
            alert.ShowAsync();
        }
    }

    private void SetAuthenticationTokenInLocalStorage()
    {
        string username = UsernameTextBox.Text;
        string password = PasswordTextBox.Password;

        var token = Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(username + ":" + password));
        ApplicationData.Current.LocalSettings.Values["AuthenticationToken"] = token;
    }
    ```

12. Open `App.xaml.cs` and find the call to `InitNotificationsAsync()` in the `OnLaunched()` event handler. Comment out or delete the call to `InitNotificationsAsync()`. The button handler initializes notification registrations:

    ```csharp
    protected override void OnLaunched(LaunchActivatedEventArgs e)
    {
        //InitNotificationsAsync();
    ```

13. Right-click the **WindowsApp** project, click **Add**, and then click **Class**. Name the class `RegisterClient.cs`, then click **OK** to generate the class.

    This class wraps the REST calls required to contact the app backend, in order to register for push notifications. It also locally stores the *registrationIds* created by the Notification Hub as detailed in [Registering from your app backend](https://learn.microsoft.com/previous-versions/azure/azure-services/dn743807\(v=azure.100\)). It uses an authorization token stored in local storage when you click the **Login and register** button.
14. Add the following `using` statements at the top of the RegisterClient.cs file:

    ```csharp
    using Windows.Storage;
    using System.Net;
    using System.Net.Http;
    using System.Net.Http.Headers;
    using Newtonsoft.Json;
    using System.Threading.Tasks;
    using System.Linq;
    ```

15. Add the following code inside the `RegisterClient` class definition:

    ```csharp
    private string POST_URL;

    private class DeviceRegistration
    {
        public string Platform { get; set; }
        public string Handle { get; set; }
        public string[] Tags { get; set; }
    }

    public RegisterClient(string backendEndpoint)
    {
        POST_URL = backendEndpoint + "/api/register";
    }

    public async Task RegisterAsync(string handle, IEnumerable<string> tags)
    {
        var regId = await RetrieveRegistrationIdOrRequestNewOneAsync();

        var deviceRegistration = new DeviceRegistration
        {
            Platform = "wns",
            Handle = handle,
            Tags = tags.ToArray<string>()
        };

        var statusCode = await UpdateRegistrationAsync(regId, deviceRegistration);

        if (statusCode == HttpStatusCode.Gone)
        {
            // regId is expired, deleting from local storage & recreating
            var settings = ApplicationData.Current.LocalSettings.Values;
            settings.Remove("__NHRegistrationId");
            regId = await RetrieveRegistrationIdOrRequestNewOneAsync();
            statusCode = await UpdateRegistrationAsync(regId, deviceRegistration);
        }

        if (statusCode != HttpStatusCode.Accepted && statusCode != HttpStatusCode.OK)
        {
            // log or throw
            throw new System.Net.WebException(statusCode.ToString());
        }
    }

    private async Task<HttpStatusCode> UpdateRegistrationAsync(string regId, DeviceRegistration deviceRegistration)
    {
        using (var httpClient = new HttpClient())
        {
            var settings = ApplicationData.Current.LocalSettings.Values;
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", (string) settings["AuthenticationToken"]);

            var putUri = POST_URL + "/" + regId;

            string json = JsonConvert.SerializeObject(deviceRegistration);
                            var response = await httpClient.PutAsync(putUri, new StringContent(json, Encoding.UTF8, "application/json"));
            return response.StatusCode;
        }
    }

    private async Task<string> RetrieveRegistrationIdOrRequestNewOneAsync()
    {
        var settings = ApplicationData.Current.LocalSettings.Values;
        if (!settings.ContainsKey("__NHRegistrationId"))
        {
            using (var httpClient = new HttpClient())
            {
                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", (string)settings["AuthenticationToken"]);

                var response = await httpClient.PostAsync(POST_URL, new StringContent(""));
                if (response.IsSuccessStatusCode)
                {
                    string regId = await response.Content.ReadAsStringAsync();
                    regId = regId.Substring(1, regId.Length - 2);
                    settings.Add("__NHRegistrationId", regId);
                }
                else
                {
                    throw new System.Net.WebException(response.StatusCode.ToString());
                }
            }
        }
        return (string)settings["__NHRegistrationId"];

    }
    ```

16. Save all your changes.

## Test the Application

1. Launch the application on both Windows.
2. Enter a **Username** and **Password** as shown in the screen below. It should differ from the user name and password you enter on Windows Phone.
3. Click **Log in and register** and verify a dialog shows that you have logged in. This code also enables the **Send Push** button.

    Screenshot of the Notification Hubs application showing the username and password filled in.
4. Then in the **Recipient Username Tag** field, enter the user name registered. Enter a notification message and click **Send Push**.
5. Only the devices that have registered with the matching username tag receive the notification message.

    Screenshot of the Notification Hubs application showing the message that was pushed.

## Next steps

In this tutorial, you learned how to push notifications to specific users that have tags associated with their registrations. To learn how to push location-based notifications, advance to the following tutorial:

> 
>[Push location-based notifications](notification-hubs-push-bing-spatial-data-geofencing-notification.md)

[9]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/notification-hubs/media/notification-hubs-aspnet-backend-windows-dotnet-notify-users/notification-hubs-secure-push9.png
[10]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/notification-hubs/media/notification-hubs-aspnet-backend-windows-dotnet-notify-users/notification-hubs-secure-push10.png
[11]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/notification-hubs/media/notification-hubs-aspnet-backend-windows-dotnet-notify-users/notification-hubs-secure-push11.png
[12]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/notification-hubs/media/notification-hubs-aspnet-backend-windows-dotnet-notify-users/notification-hubs-secure-push12.png
[13]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/notification-hubs/media/notification-hubs-aspnet-backend-windows-dotnet-notify-users/notification-hubs-wp-ui.png
[14]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/notification-hubs/media/notification-hubs-aspnet-backend-windows-dotnet-notify-users/notification-hubs-windows-instance-username.png
[15]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/notification-hubs/media/notification-hubs-aspnet-backend-windows-dotnet-notify-users/notification-hubs-notification-received.png
[16]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/notification-hubs/media/notification-hubs-aspnet-backend-windows-dotnet-notify-users/notification-hubs-wp-send-message.png

<!-- URLs. -->
[Get started with Notification Hubs]: notification-hubs-windows-store-dotnet-get-started-wns-push-notification.md
[Secure Push]: notification-hubs-aspnet-backend-windows-dotnet-wns-secure-push-notification.md
[Use Notification Hubs to send breaking news]: notification-hubs-windows-notification-dotnet-push-xplat-segmented-wns.md
[Notification Hubs Guidance]: https://learn.microsoft.com/previous-versions/azure/azure-services/jj927170\(v=azure.100\)
