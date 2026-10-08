---
title: Send push notifications to specific users using Azure Notification Hubs | Microsoft Docs
description: Learn how to send push notifications to specific iOS users by using Azure Notification Hubs.
author: sethmanheim
manager: lizross
services: notification-hubs
ms.service: azure-notification-hubs
ms.tgt_pltfrm: ios
ms.devlang: objective-c
ms.custom: devx-track-dotnet
ms.topic: article
ms.date: 08/07/2020
ms.author: sethm
ms.reviewer: thsomasu
ms.lastreviewed: 01/04/2019
---

# Tutorial: Send push notifications to specific users using Azure Notification Hubs

> 
> * [Android](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/notification-hubs/notification-hubs-aspnet-backend-gcm-android-push-to-user-google-notification.md)
> * [iOS](notification-hubs-aspnet-backend-ios-apple-apns-notification.md)
> * [Windows Runtime 8.1 universal](notification-hubs-aspnet-backend-windows-dotnet-wns-notification.md)
> 
> 



This tutorial shows you how to use Azure Notification Hubs to send push notifications to a specific app user on a specific device. An ASP.NET WebAPI backend is used to authenticate clients and to generate notifications, as shown in the guidance topic [Registering from your app backend](notification-hubs-push-notification-registration-management.md#registration-management-from-a-backend).

In this tutorial, you take the following steps:

> 
> * Create the WebAPI project
> * Authenticate clients to the WebAPI backend
> * Register for notifications by using the WebAPI backend
> * Send notifications from the WebAPI backend
> * Publish the new WebAPI backend
> * Modify your iOS app
> * Test the application

## Prerequisites

This tutorial assumes that you have created and configured your notification hub as described in [Send push notifications to iOS apps using Azure Notification Hubs](ios-sdk-get-started.md). This tutorial is also the prerequisite to the [Secure Push (iOS)](notification-hubs-aspnet-backend-ios-push-apple-apns-secure-notification.md) tutorial.
 If you want to use Mobile Apps as your backend service, see the [Mobile Apps Get Started with Push](https://learn.microsoft.com/previous-versions/azure/app-service-mobile/app-service-mobile-ios-get-started-push).


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

## Modify your iOS app

1. Open the Single Page view app you created in the [Send push notifications to iOS apps using Azure Notification Hubs](ios-sdk-get-started.md) tutorial.

   > **Note:**
   > This section assumes that your project is configured with an empty organization name. If not, prepend your organization name to all class names.

2. In the `Main.storyboard` file, add the components shown in the screenshot from the object library.

    Edit storyboard in Xcode interface builder

   * **Username**: A UITextField with placeholder text, *Enter Username*, immediately beneath the send results label and constrained to the left and right margins and beneath the send results label.
   * **Password**: A UITextField with placeholder text, *Enter Password*, immediately beneath the username text field and constrained to the left and right margins and beneath the username text field. Check the **Secure Text Entry** option in the Attribute Inspector, under *Return Key*.
   * **Log in**: A UIButton labeled immediately beneath the password text field and uncheck the **Enabled** option in the Attributes Inspector, under *Control-Content*
   * **WNS**: Label and switch to enable sending the notification Windows Notification Service if it has been set up on the hub. See the [Windows Getting Started](notification-hubs-windows-store-dotnet-get-started-wns-push-notification.md) tutorial.
   * **GCM**: Label and switch to enable sending the notification to Google Cloud Messaging if it has been set up on the hub. See [Android Getting Started](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/notification-hubs/notification-hubs-android-push-notification-google-gcm-get-started.md) tutorial.
   * **APNS**: Label and switch to enable sending the notification to the Apple Platform Notification Service.
   * **Recipient Username:A** UITextField with placeholder text, *Recipient username tag*, immediately beneath the GCM label and constrained to the left and right margins and beneath the GCM label.

     Some components were added in the [Send push notifications to iOS apps using Azure Notification Hubs](ios-sdk-get-started.md) tutorial.

3. **Ctrl** drag from the components in the view to `ViewController.h` and add these new outlets:

    ```objc
    @property (weak, nonatomic) IBOutlet UITextField *UsernameField;
    @property (weak, nonatomic) IBOutlet UITextField *PasswordField;
    @property (weak, nonatomic) IBOutlet UITextField *RecipientField;
    @property (weak, nonatomic) IBOutlet UITextField *NotificationField;

    // Used to enable the buttons on the UI
    @property (weak, nonatomic) IBOutlet UIButton *LogInButton;
    @property (weak, nonatomic) IBOutlet UIButton *SendNotificationButton;

    // Used to enabled sending notifications across platforms
    @property (weak, nonatomic) IBOutlet UISwitch *WNSSwitch;
    @property (weak, nonatomic) IBOutlet UISwitch *GCMSwitch;
    @property (weak, nonatomic) IBOutlet UISwitch *APNSSwitch;

    - (IBAction)LogInAction:(id)sender;
    ```

4. In `ViewController.h`, add the following `#define` after your import statements. Substitute the `<Your backend endpoint>` placeholder with the Destination URL you used to deploy your app backend in the previous section. For example, `http://your_backend.azurewebsites.net`:

    ```objc
    #define BACKEND_ENDPOINT @"<Your backend endpoint>"
    ```

5. In your project, create a new Cocoa Touch class named `RegisterClient` to interface with the ASP.NET back-end you created. Create the class inheriting from `NSObject`. Then add the following code in the `RegisterClient.h`:

    ```objc
    @interface RegisterClient : NSObject

    @property (strong, nonatomic) NSString* authenticationHeader;

    -(void) registerWithDeviceToken:(NSData*)token tags:(NSSet*)tags
        andCompletion:(void(^)(NSError*))completion;

    -(instancetype) initWithEndpoint:(NSString*)Endpoint;

    @end
    ```

6. In the `RegisterClient.m`, update the `@interface` section:

    ```objc
    @interface RegisterClient ()

    @property (strong, nonatomic) NSURLSession* session;
    @property (strong, nonatomic) NSURLSession* endpoint;

    -(void) tryToRegisterWithDeviceToken:(NSData*)token tags:(NSSet*)tags retry:(BOOL)retry
                andCompletion:(void(^)(NSError*))completion;
    -(void) retrieveOrRequestRegistrationIdWithDeviceToken:(NSString*)token
                completion:(void(^)(NSString*, NSError*))completion;
    -(void) upsertRegistrationWithRegistrationId:(NSString*)registrationId deviceToken:(NSString*)token
                tags:(NSSet*)tags andCompletion:(void(^)(NSURLResponse*, NSError*))completion;

    @end
    ```

7. Replace the `@implementation` section in the RegisterClient.m with the following code:

    ```objc
    @implementation RegisterClient

    // Globals used by RegisterClient
    NSString *const RegistrationIdLocalStorageKey = @"RegistrationId";

    -(instancetype) initWithEndpoint:(NSString*)Endpoint
    {
        self = [super init];
        if (self) {
            NSURLSessionConfiguration* config = [NSURLSessionConfiguration defaultSessionConfiguration];
            _session = [NSURLSession sessionWithConfiguration:config delegate:nil delegateQueue:nil];
            _endpoint = Endpoint;
        }
        return self;
    }

    -(void) registerWithDeviceToken:(NSData*)token tags:(NSSet*)tags
                andCompletion:(void(^)(NSError*))completion
    {
        [self tryToRegisterWithDeviceToken:token tags:tags retry:YES andCompletion:completion];
    }

    -(void) tryToRegisterWithDeviceToken:(NSData*)token tags:(NSSet*)tags retry:(BOOL)retry
                andCompletion:(void(^)(NSError*))completion
    {
        NSSet* tagsSet = tags?tags:[[NSSet alloc] init];

        NSString *deviceTokenString = [[token description]
            stringByTrimmingCharactersInSet:[NSCharacterSet characterSetWithCharactersInString:@"<>"]];
        deviceTokenString = [[deviceTokenString stringByReplacingOccurrencesOfString:@" " withString:@""]
                                uppercaseString];

        [self retrieveOrRequestRegistrationIdWithDeviceToken: deviceTokenString
            completion:^(NSString* registrationId, NSError *error) {
            NSLog(@"regId: %@", registrationId);
            if (error) {
                completion(error);
                return;
            }

            [self upsertRegistrationWithRegistrationId:registrationId deviceToken:deviceTokenString
                tags:tagsSet andCompletion:^(NSURLResponse * response, NSError *error) {
                if (error) {
                    completion(error);
                    return;
                }

                NSHTTPURLResponse* httpResponse = (NSHTTPURLResponse*)response;
                if (httpResponse.statusCode == 200) {
                    completion(nil);
                } else if (httpResponse.statusCode == 410 && retry) {
                    [self tryToRegisterWithDeviceToken:token tags:tags retry:NO andCompletion:completion];
                } else {
                    NSLog(@"Registration error with response status: %ld", (long)httpResponse.statusCode);

                    completion([NSError errorWithDomain:@"Registration" code:httpResponse.statusCode
                                userInfo:nil]);
                }

            }];
        }];
    }

    -(void) upsertRegistrationWithRegistrationId:(NSString*)registrationId deviceToken:(NSData*)token
                tags:(NSSet*)tags andCompletion:(void(^)(NSURLResponse*, NSError*))completion
    {
        NSDictionary* deviceRegistration = @{@"Platform" : @"apns", @"Handle": token,
                                                @"Tags": [tags allObjects]};
        NSData* jsonData = [NSJSONSerialization dataWithJSONObject:deviceRegistration
                            options:NSJSONWritingPrettyPrinted error:nil];

        NSLog(@"JSON registration: %@", [[NSString alloc] initWithData:jsonData
                                            encoding:NSUTF8StringEncoding]);

        NSString* endpoint = [NSString stringWithFormat:@"%@/api/register/%@", _endpoint,
                                registrationId];
        NSURL* requestURL = [NSURL URLWithString:endpoint];
        NSMutableURLRequest* request = [NSMutableURLRequest requestWithURL:requestURL];
        [request setHTTPMethod:@"PUT"];
        [request setHTTPBody:jsonData];
        NSString* authorizationHeaderValue = [NSString stringWithFormat:@"Basic %@",
                                                self.authenticationHeader];
        [request setValue:authorizationHeaderValue forHTTPHeaderField:@"Authorization"];
        [request setValue:@"application/json" forHTTPHeaderField:@"Content-Type"];

        NSURLSessionDataTask* dataTask = [self.session dataTaskWithRequest:request
            completionHandler:^(NSData *data, NSURLResponse *response, NSError *error)
        {
            if (!error)
            {
                completion(response, error);
            }
            else
            {
                NSLog(@"Error request: %@", error);
                completion(nil, error);
            }
        }];
        [dataTask resume];
    }

    -(void) retrieveOrRequestRegistrationIdWithDeviceToken:(NSString*)token
                completion:(void(^)(NSString*, NSError*))completion
    {
        NSString* registrationId = [[NSUserDefaults standardUserDefaults]
                                    objectForKey:RegistrationIdLocalStorageKey];

        if (registrationId)
        {
            completion(registrationId, nil);
            return;
        }

        // request new one & save
        NSURL* requestURL = [NSURL URLWithString:[NSString stringWithFormat:@"%@/api/register?handle=%@",
                                _endpoint, token]];
        NSMutableURLRequest* request = [NSMutableURLRequest requestWithURL:requestURL];
        [request setHTTPMethod:@"POST"];
        NSString* authorizationHeaderValue = [NSString stringWithFormat:@"Basic %@",
                                                self.authenticationHeader];
        [request setValue:authorizationHeaderValue forHTTPHeaderField:@"Authorization"];

        NSURLSessionDataTask* dataTask = [self.session dataTaskWithRequest:request
            completionHandler:^(NSData *data, NSURLResponse *response, NSError *error)
        {
            NSHTTPURLResponse* httpResponse = (NSHTTPURLResponse*) response;
            if (!error && httpResponse.statusCode == 200)
            {
                NSString* registrationId = [[NSString alloc] initWithData:data
                    encoding:NSUTF8StringEncoding];

                // remove quotes
                registrationId = [registrationId substringWithRange:NSMakeRange(1,
                                    [registrationId length]-2)];

                [[NSUserDefaults standardUserDefaults] setObject:registrationId
                    forKey:RegistrationIdLocalStorageKey];
                [[NSUserDefaults standardUserDefaults] synchronize];

                completion(registrationId, nil);
            }
            else
            {
                NSLog(@"Error status: %ld, request: %@", (long)httpResponse.statusCode, error);
                if (error)
                    completion(nil, error);
                else {
                    completion(nil, [NSError errorWithDomain:@"Registration" code:httpResponse.statusCode
                                userInfo:nil]);
                }
            }
        }];
        [dataTask resume];
    }

    @end
    ```

    This code implements the logic explained in the guidance article [Registering from your app backend](notification-hubs-push-notification-registration-management.md#registration-management-from-a-backend) using NSURLSession to perform REST calls to your app backend, and NSUserDefaults to locally store the registrationId returned by the notification hub.

    This class requires its property `authorizationHeader` to be set in order to work properly. This property is set by the `ViewController` class after the login.

8. In `ViewController.h`, add a `#import` statement for `RegisterClient.h`. Then add a declaration for the device token and reference to a `RegisterClient` instance in the `@interface` section:

    ```objc
    #import "RegisterClient.h"

    @property (strong, nonatomic) NSData* deviceToken;
    @property (strong, nonatomic) RegisterClient* registerClient;
    ```

9. In ViewController.m, add a private method declaration in the `@interface` section:

    ```objc
    @interface ViewController () <UITextFieldDelegate, NSURLConnectionDataDelegate, NSXMLParserDelegate>

    // create the Authorization header to perform Basic authentication with your app back-end
    -(void) createAndSetAuthenticationHeaderWithUsername:(NSString*)username
                    AndPassword:(NSString*)password;

    @end
    ```

    > **Note:**
    > The following snippet is not a secure authentication scheme, you should substitute the implementation of the    `createAndSetAuthenticationHeaderWithUsername:AndPassword:` with your specific authentication mechanism that generates an authentication token to be consumed by the register client class, e.g. OAuth, Active Directory.

10. Then in the `@implementation` section of `ViewController.m`, add the following code, which adds the implementation for setting the device token and authentication header.

    ```objc
    -(void) setDeviceToken: (NSData*) deviceToken
    {
        _deviceToken = deviceToken;
        self.LogInButton.enabled = YES;
    }

    -(void) createAndSetAuthenticationHeaderWithUsername:(NSString*)username
                    AndPassword:(NSString*)password;
    {
        NSString* headerValue = [NSString stringWithFormat:@"%@:%@", username, password];

        NSData* encodedData = [[headerValue dataUsingEncoding:NSUTF8StringEncoding] base64EncodedDataWithOptions:NSDataBase64EncodingEndLineWithCarriageReturn];

        self.registerClient.authenticationHeader = [[NSString alloc] initWithData:encodedData
                                                    encoding:NSUTF8StringEncoding];
    }

    -(BOOL)textFieldShouldReturn:(UITextField *)textField
    {
        [textField resignFirstResponder];
        return YES;
    }
    ```

    Notice how setting the device token enables the **Log in** button. It's because as a part of the login action, the view controller registers for push notifications with the app backend. You do not want the **Log in** action to be accessible until the device token has been properly set up. You can decouple the login from the push registration as long as the former happens before the latter.

11. In ViewController.m, use the following snippets to implement the action method for your **Log in** button and a method to send the notification message using the ASP.NET backend.

    ```objc
    - (IBAction)LogInAction:(id)sender {
        // create authentication header and set it in register client
        NSString* username = self.UsernameField.text;
        NSString* password = self.PasswordField.text;

        [self createAndSetAuthenticationHeaderWithUsername:username AndPassword:password];

        __weak ViewController* selfie = self;
        [self.registerClient registerWithDeviceToken:self.deviceToken tags:nil
            andCompletion:^(NSError* error) {
            if (!error) {
                dispatch_async(dispatch_get_main_queue(),
                ^{
                    selfie.SendNotificationButton.enabled = YES;
                    [self MessageBox:@"Success" message:@"Registered successfully!"];
                });
            }
        }];
    }

    - (void)SendNotificationASPNETBackend:(NSString*)pns UsernameTag:(NSString*)usernameTag
                Message:(NSString*)message
    {
        NSURLSession* session = [NSURLSession
            sessionWithConfiguration:[NSURLSessionConfiguration defaultSessionConfiguration] delegate:nil
            delegateQueue:nil];

        // Pass the pns and username tag as parameters with the REST URL to the ASP.NET backend
        NSURL* requestURL = [NSURL URLWithString:[NSString
            stringWithFormat:@"%@/api/notifications?pns=%@&to_tag=%@", BACKEND_ENDPOINT, pns,
            usernameTag]];

        NSMutableURLRequest* request = [NSMutableURLRequest requestWithURL:requestURL];
        [request setHTTPMethod:@"POST"];

        // Get the mock authenticationheader from the register client
        NSString* authorizationHeaderValue = [NSString stringWithFormat:@"Basic %@",
            self.registerClient.authenticationHeader];
        [request setValue:authorizationHeaderValue forHTTPHeaderField:@"Authorization"];

        //Add the notification message body
        [request setValue:@"application/json;charset=utf-8" forHTTPHeaderField:@"Content-Type"];
        [request setHTTPBody:[message dataUsingEncoding:NSUTF8StringEncoding]];

        // Execute the send notification REST API on the ASP.NET Backend
        NSURLSessionDataTask* dataTask = [session dataTaskWithRequest:request
            completionHandler:^(NSData *data, NSURLResponse *response, NSError *error)
        {
            NSHTTPURLResponse* httpResponse = (NSHTTPURLResponse*) response;
            if (error || httpResponse.statusCode != 200)
            {
                NSString* status = [NSString stringWithFormat:@"Error Status for %@: %d\nError: %@\n",
                                    pns, httpResponse.statusCode, error];
                dispatch_async(dispatch_get_main_queue(),
                ^{
                    // Append text because all 3 PNS calls may also have information to view
                    [self.sendResults setText:[self.sendResults.text stringByAppendingString:status]];
                });
                NSLog(status);
            }

            if (data != NULL)
            {
                xmlParser = [[NSXMLParser alloc] initWithData:data];
                [xmlParser setDelegate:self];
                [xmlParser parse];
            }
        }];
        [dataTask resume];
    }
    ```

12. Update the action for the **Send Notification** button to use the ASP.NET backend and send to any PNS enabled by a switch.

    ```objc
    - (IBAction)SendNotificationMessage:(id)sender
    {
        //[self SendNotificationRESTAPI];
        [self SendToEnabledPlatforms];
    }

    -(void)SendToEnabledPlatforms
    {
        NSString* json = [NSString stringWithFormat:@"\"%@\"",self.notificationMessage.text];

        [self.sendResults setText:@""];

        if ([self.WNSSwitch isOn])
            [self SendNotificationASPNETBackend:@"wns" UsernameTag:self.RecipientField.text Message:json];

        if ([self.GCMSwitch isOn])
            [self SendNotificationASPNETBackend:@"gcm" UsernameTag:self.RecipientField.text Message:json];

        if ([self.APNSSwitch isOn])
            [self SendNotificationASPNETBackend:@"apns" UsernameTag:self.RecipientField.text Message:json];
    }
    ```

13. In the `ViewDidLoad` function, add the following to instantiate the `RegisterClient` instance and set the delegate for your text fields.

    ```objc
    self.UsernameField.delegate = self;
    self.PasswordField.delegate = self;
    self.RecipientField.delegate = self;
    self.registerClient = [[RegisterClient alloc] initWithEndpoint:BACKEND_ENDPOINT];
    ```

14. Now in `AppDelegate.m`, remove all the content of the method `application:didRegisterForPushNotificationWithDeviceToken:` and replace it with the following (to make sure that the view controller contains the latest device token retrieved from APNs):

    ```objc
    // Add import to the top of the file
    #import "ViewController.h"

    - (void)application:(UIApplication *)application
                didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
    {
        ViewController* rvc = (ViewController*) self.window.rootViewController;
        rvc.deviceToken = deviceToken;
    }
    ```

15. Finally in `AppDelegate.m`, make sure you have the following method:

    ```objc
    - (void)application:(UIApplication *)application didReceiveRemoteNotification: (NSDictionary *)userInfo {
        NSLog(@"%@", userInfo);
        [self MessageBox:@"Notification" message:[[userInfo objectForKey:@"aps"] valueForKey:@"alert"]];
    }
    ```

## Test the application

1. In XCode, run the app on a physical iOS device (push notifications do not work in the simulator).
2. In the iOS app UI, enter same value for both username and password. Then click **Log in**.

    iOS test application

3. You should see a pop-up informing you of registration success. Click **OK**.

    iOS test notification displayed

4. In the **Recipient username tag* text field, enter the user name tag used with the registration from another device.
5. Enter a notification message and click **Send Notification**. Only the devices that have a registration with the recipient user name tag receive the notification message. It is only sent to those users.

    iOS test tagged notification

## Next steps

In this tutorial, you learned how to push notifications to specific users that have tags associated with their registrations. To learn how to push location-based notifications, advance to the following tutorial:

> 
>[Push location-based notifications](notification-hubs-push-bing-spatial-data-geofencing-notification.md)

[1]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/notification-hubs/media/notification-hubs-aspnet-backend-ios-notify-users/notification-hubs-ios-notify-users-interface.png
[2]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/notification-hubs/media/notification-hubs-aspnet-backend-ios-notify-users/notification-hubs-ios-notify-users-enter-user-pwd.png
[3]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/notification-hubs/media/notification-hubs-aspnet-backend-ios-notify-users/notification-hubs-ios-notify-users-registered.png
[4]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/notification-hubs/media/notification-hubs-aspnet-backend-ios-notify-users/notification-hubs-ios-notify-users-enter-msg.png
