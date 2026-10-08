---
title: Send push notifications to specific iOS devices using Azure Notification Hubs | Microsoft Docs
description: In this tutorial, you learn how to use Azure Notification Hubs to send push notifications to specific iOS devices.
services: notification-hubs
author: sethmanheim
manager: lizross

ms.service: azure-notification-hubs
ms.tgt_pltfrm: mobile-ios
ms.devlang: objective-c
ms.topic: article
ms.date: 11/07/2019
ms.author: sethm
ms.reviewer: jowargo
ms.lastreviewed: 11/07/2019
ms.custom: sfi-ropc-nochange
---

# Tutorial: Send push notifications to specific iOS devices using Azure Notification Hubs

> 
> * [Android](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/notification-hubs/notification-hubs-aspnet-backend-android-xplat-segmented-gcm-push-notification.md)
> * [iOS](notification-hubs-ios-xplat-segmented-apns-push-notification.md)
> * [Windows Runtime 8.1 universal](notification-hubs-windows-notification-dotnet-push-xplat-segmented-wns.md)
> * [Windows Phone Silverlight 8.x](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/notification-hubs/notification-hubs-windows-phone-push-xplat-segmented-mpns-notification.md)
> 
> 



## Overview

This tutorial shows you how to use Azure Notification Hubs to broadcast breaking news notifications to an iOS app. When complete, you're able to register for breaking news categories you're interested in, and receive only push notifications for those categories. This scenario is a common pattern for many apps where notifications have to be sent to groups of users that have previously declared interest in them, for example, RSS reader, apps for music fans, etc.

Broadcast scenarios are enabled by including one or more *tags* when creating a registration in the notification hub. When notifications are sent to a tag, devices that have registered for the tag receive the notification. Because tags are simply strings, they don't have to be provisioned in advance. For more information about tags, see [Notification Hubs Routing and Tag Expressions](notification-hubs-tags-segment-push-message.md).

In this tutorial, you take the following steps:

> 
> * Add a category selection to the app
> * Send tagged notifications
> * Send notifications from the device
> * Run the app and generate notifications

## Prerequisites

This topic builds on the app you created in [Tutorial: Push notifications to iOS apps using Azure Notification Hubs][get-started]. Before starting this tutorial, you must have already completed [Tutorial: Push notifications to iOS apps using Azure Notification Hubs][get-started].

## Add category selection to the app

The first step is to add the UI elements to your existing storyboard that enable the user to select categories to register. The categories selected by a user are stored on the device. When the app starts, a device registration is created in your notification hub with the selected categories as tags.

1. In your **MainStoryboard_iPhone.storyboard** add the following components from the object library:

   * A label with **Breaking News**" text.
   * Labels with category texts **World**, **Politics**, **Business**, **Technology**, **Science**, and **Sports**.
   * Six switches, one per category, set each switch **State** to be **Off** by default.
   * One button labeled **Subscribe**.

     Your storyboard should look as follows:

     Xcode interface builder

2. In the assistant editor, create outlets for all the switches and call them **WorldSwitch**, **PoliticsSwitch**, **BusinessSwitch**, **TechnologySwitch**, **ScienceSwitch**, and **SportsSwitch**.

3. Create an Action for your button called `subscribe`; your `ViewController.h` should contain the following code:

    ```objc
    @property (weak, nonatomic) IBOutlet UISwitch *WorldSwitch;
    @property (weak, nonatomic) IBOutlet UISwitch *PoliticsSwitch;
    @property (weak, nonatomic) IBOutlet UISwitch *BusinessSwitch;
    @property (weak, nonatomic) IBOutlet UISwitch *TechnologySwitch;
    @property (weak, nonatomic) IBOutlet UISwitch *ScienceSwitch;
    @property (weak, nonatomic) IBOutlet UISwitch *SportsSwitch;

    - (IBAction)subscribe:(id)sender;
    ```

4. Create a new **Cocoa Touch Class** called `Notifications`. Copy the following code in the interface section of the file Notifications.h:

    ```objc
    @property NSData* deviceToken;

    - (id)initWithConnectionString:(NSString*)listenConnectionString HubName:(NSString*)hubName;

    - (void)storeCategoriesAndSubscribeWithCategories:(NSArray*)categories
                completion:(void (^)(NSError* error))completion;

    - (NSSet*)retrieveCategories;

    - (void)subscribeWithCategories:(NSSet*)categories completion:(void (^)(NSError *))completion;
    ```

5. Add the following import directive to Notifications.m:

    ```objc
    #import <WindowsAzureMessaging/WindowsAzureMessaging.h>
    ```

6. Copy the following code in the implementation section of the file Notifications.m.

    ```objc
    SBNotificationHub* hub;

    - (id)initWithConnectionString:(NSString*)listenConnectionString HubName:(NSString*)hubName{

        hub = [[SBNotificationHub alloc] initWithConnectionString:listenConnectionString
                                    notificationHubPath:hubName];

        return self;
    }

    - (void)storeCategoriesAndSubscribeWithCategories:(NSSet *)categories completion:(void (^)(NSError *))completion {
        NSUserDefaults* defaults = [NSUserDefaults standardUserDefaults];
        [defaults setValue:[categories allObjects] forKey:@"BreakingNewsCategories"];

        [self subscribeWithCategories:categories completion:completion];
    }

    - (NSSet*)retrieveCategories {
        NSUserDefaults* defaults = [NSUserDefaults standardUserDefaults];

        NSArray* categories = [defaults stringArrayForKey:@"BreakingNewsCategories"];

        if (!categories) return [[NSSet alloc] init];
        return [[NSSet alloc] initWithArray:categories];
    }

    - (void)subscribeWithCategories:(NSSet *)categories completion:(void (^)(NSError *))completion
    {
        NSString* templateBodyAPNS = @"{\"aps\":{\"alert\":\"$(messageParam)\"}}";

        [hub registerTemplateWithDeviceToken:self.deviceToken name:@"simpleAPNSTemplate" 
            jsonBodyTemplate:templateBodyAPNS expiryTemplate:@"0" tags:categories completion:completion];
    }
    ```

    This class uses local storage to store and retrieve the categories of news that this device receives. Also, it contains a method to register for these categories using a [Template](notification-hubs-templates-cross-platform-push-messages.md) registration.

7. In the `AppDelegate.h` file, add an import statement for `Notifications.h` and add a property for an instance of the `Notifications` class:

    ```objc
    #import "Notifications.h"

    @property (nonatomic) Notifications* notifications;
    ```

8. In the `didFinishLaunchingWithOptions` method in `AppDelegate.m`, add the code to initialize the notifications instance at the beginning of the method.  
    `HUBNAME` and `HUBLISTENACCESS` (defined in `hubinfo.h`) should already have the `<hub name>` and `<connection string with listen access>` placeholders replaced with your notification hub name and the connection string for *DefaultListenSharedAccessSignature* that you obtained earlier

    ```objc
    self.notifications = [[Notifications alloc] initWithConnectionString:HUBLISTENACCESS HubName:HUBNAME];
    ```

    > **Note:**
    > Because credentials that are distributed with a client app aren't generally secure, you should only distribute the key for listen access with your client app. Listen access enables your app to register for notifications, but existing registrations can't be modified and notifications can't be sent. The full access key is used in a secured backend service for sending notifications and changing existing registrations.

9. In the `didRegisterForRemoteNotificationsWithDeviceToken` method in `AppDelegate.m`, replace the code in the method with the following code to pass the device token to the `notifications` class. The `notifications` class performs the registering for notifications with the categories. If the user changes category selections, call the `subscribeWithCategories` method in response to the **subscribe** button to update them.

    > **Note:**
    > Because the device token assigned by the Apple Push Notification Service (APNS) can change at any time, you should register for notifications frequently to avoid notification failures. This example registers for notification every time that the app starts. For apps that are run frequently, more than once a day, you can probably skip registration to preserve bandwidth if less than a day has passed since the previous registration.

    ```objc
    self.notifications.deviceToken = deviceToken;

    // Retrieves the categories from local storage and requests a registration for these categories
    // each time the app starts and performs a registration.

    NSSet* categories = [self.notifications retrieveCategories];
    [self.notifications subscribeWithCategories:categories completion:^(NSError* error) {
        if (error != nil) {
            NSLog(@"Error registering for notifications: %@", error);
        }
    }];
    ```

    At this point, there should be no other code in the `didRegisterForRemoteNotificationsWithDeviceToken` method.

10. The following methods should already be present in `AppDelegate.m` from completing the [Get started with Notification Hubs][get-started] tutorial. If not, add them.

    ```objc
    - (void)MessageBox:(NSString *)title message:(NSString *)messageText
    {

        UIAlertView *alert = [[UIAlertView alloc] initWithTitle:title message:messageText delegate:self
            cancelButtonTitle:@"OK" otherButtonTitles: nil];
        [alert show];
    }

    - (void)application:(UIApplication *)application didReceiveRemoteNotification:
       (NSDictionary *)userInfo {
       NSLog(@"%@", userInfo);
       [self MessageBox:@"Notification" message:[[userInfo objectForKey:@"aps"] valueForKey:@"alert"]];
     }
    ```

    This method handles notifications received when the app is running by displaying a simple **UIAlert**.

11. In `ViewController.m`, add an `import` statement for `AppDelegate.h` and copy the following code into the XCode-generated `subscribe` method. This code updates the notification registration to use the new category tags the user has chosen in the user interface.

    ```objc
    #import "Notifications.h"

    NSMutableArray* categories = [[NSMutableArray alloc] init];

    if (self.WorldSwitch.isOn) [categories addObject:@"World"];
    if (self.PoliticsSwitch.isOn) [categories addObject:@"Politics"];
    if (self.BusinessSwitch.isOn) [categories addObject:@"Business"];
    if (self.TechnologySwitch.isOn) [categories addObject:@"Technology"];
    if (self.ScienceSwitch.isOn) [categories addObject:@"Science"];
    if (self.SportsSwitch.isOn) [categories addObject:@"Sports"];

    Notifications* notifications = [(AppDelegate*)[[UIApplication sharedApplication]delegate] notifications];

    [notifications storeCategoriesAndSubscribeWithCategories:categories completion: ^(NSError* error) {
        if (!error) {
            UIAlertView *alert = [[UIAlertView alloc] initWithTitle:"Notification" message:"Subscribed" delegate:self
            cancelButtonTitle:@"OK" otherButtonTitles: nil];
            [alert show];
        } else {
            NSLog(@"Error subscribing: %@", error);
        }
    }];
    ```

    This method creates an `NSMutableArray` of categories and uses the `Notifications` class to store the list in the local storage and registers the corresponding tags with your notification hub. When categories are changed, the registration is recreated with the new categories.

12. In `ViewController.m`, add the following code in the `viewDidLoad` method to set the user interface based on the previously saved categories.

    ```objc
    // This updates the UI on startup based on the status of previously saved categories.

    Notifications* notifications = [(AppDelegate*)[[UIApplication sharedApplication]delegate] notifications];

    NSSet* categories = [notifications retrieveCategories];

    if ([categories containsObject:@"World"]) self.WorldSwitch.on = true;
    if ([categories containsObject:@"Politics"]) self.PoliticsSwitch.on = true;
    if ([categories containsObject:@"Business"]) self.BusinessSwitch.on = true;
    if ([categories containsObject:@"Technology"]) self.TechnologySwitch.on = true;
    if ([categories containsObject:@"Science"]) self.ScienceSwitch.on = true;
    if ([categories containsObject:@"Sports"]) self.SportsSwitch.on = true;
    ```

The app can now store a set of categories in the device local storage used to register with the notification hub whenever the app starts. The user can change the selection of categories at runtime and click the `subscribe` method to update the registration for the device. Next, you update the app to send the breaking news notifications directly in the app itself.

## (Optional) Send tagged notifications

If you don't have access to Visual Studio, you can skip to the next section and send notifications from the app itself. You can also send the proper template notification from the [Azure portal] using the debug tab for your notification hub.


In this section, you send breaking news as tagged template notifications from a .NET console app.

1. In Visual Studio, create a new Visual C# console application:
    1. On the menu, select **File** > **New** > **Project**.
    1. In **Create a new project**, select **Console App (.NET Framework)** for C# in the list of templates, and select **Next**.
    1. Enter a name for the app.
    1. For **Solution**, choose **Add to solution**, and select **Create** to create the project.

1. Select **Tools** > **NuGet Package Manager** > **Package Manager Console** and then, in the console window, run the following command:

   ```powershell
   Install-Package Microsoft.Azure.NotificationHubs
   ```

   This action adds a reference to the Azure Notification Hubs SDK by using the [Microsoft.Azure.NotificationHubs] package.

1. Open the *Program.cs* file, and add the following `using` statement:

   ```csharp
   using Microsoft.Azure.NotificationHubs;
   ```

1. In the `Program` class, add the following method, or replace it if it already exists:

    ```csharp
    private static async void SendTemplateNotificationAsync()
    {
        // Define the notification hub.
        NotificationHubClient hub = NotificationHubClient.CreateClientFromConnectionString("<connection string with full access>", "<hub name>");

        // Apple requires the apns-push-type header for all requests
        var headers = new Dictionary<string, string> {{"apns-push-type", "alert"}};

        // Create an array of breaking news categories.
        var categories = new string[] { "World", "Politics", "Business", "Technology", "Science", "Sports"};

        // Send the notification as a template notification. All template registrations that contain
        // "messageParam" and the proper tags will receive the notifications.
        // This includes APNS, GCM/FCM, WNS, and MPNS template registrations.

        Dictionary<string, string> templateParams = new Dictionary<string, string>();

        foreach (var category in categories)
        {
            templateParams["messageParam"] = "Breaking " + category + " News!";
            await hub.SendTemplateNotificationAsync(templateParams, category);
        }
    }
    ```

   This code sends a template notification for each of the six tags in the string array. The use of tags ensures that devices receive notifications only for the registered categories.

1. In the preceding code, replace the `<hub name>` and `<connection string with full access>` placeholders with your notification hub name and the connection string for *DefaultFullSharedAccessSignature* from the dashboard of your notification hub.

1. In the `Main()` method, add the following lines:

   ```csharp
    SendTemplateNotificationAsync();
    Console.ReadLine();
    ```

1. Build the console app.

<!-- Images. -->
[13]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/includes/media/notification-hubs-back-end/notification-hub-create-console-app.png

<!-- URLs. -->
[Get started with Notification Hubs]: notification-hubs-windows-store-dotnet-get-started-wns-push-notification.md
[Notification Hubs REST interface]: https://learn.microsoft.com/previous-versions/azure/reference/dn223264\(v=azure.100\)
[Add push notifications for Mobile Apps]: https://learn.microsoft.com/previous-versions/azure/app-service-mobile/app-service-mobile-windows-store-dotnet-get-started-push
[How to use Notification Hubs from Java or PHP]: notification-hubs-java-push-notification-tutorial.md
[Microsoft.Azure.NotificationHubs]: https://www.nuget.org/packages/Microsoft.Azure.NotificationHubs/

## (Optional) Send notifications from the device

Normally notifications would be sent by a backend service but, you can send breaking news notifications directly from the app. To do so, you update the `SendNotificationRESTAPI` method that you defined in the [Get started with Notification Hubs][get-started] tutorial.

1. In `ViewController.m`, update the `SendNotificationRESTAPI` method as follows so that it accepts a parameter for the category tag and sends the proper [template](notification-hubs-templates-cross-platform-push-messages.md) notification.

    ```objc
    - (void)SendNotificationRESTAPI:(NSString*)categoryTag
    {
        NSURLSession* session = [NSURLSession sessionWithConfiguration:[NSURLSessionConfiguration
                                    defaultSessionConfiguration] delegate:nil delegateQueue:nil];

        NSString *json;

        // Construct the messages REST endpoint
        NSURL* url = [NSURL URLWithString:[NSString stringWithFormat:@"%@%@/messages/%@", HubEndpoint,
                                            HUBNAME, API_VERSION]];

        // Generated the token to be used in the authorization header.
        NSString* authorizationToken = [self generateSasToken:[url absoluteString]];

        //Create the request to add the template notification message to the hub
        NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:url];
        [request setHTTPMethod:@"POST"];

        // Add the category as a tag
        [request setValue:categoryTag forHTTPHeaderField:@"ServiceBusNotification-Tags"];

        // Template notification
        json = [NSString stringWithFormat:@"{\"messageParam\":\"Breaking %@ News : %@\"}",
                categoryTag, self.notificationMessage.text];

        // Signify template notification format
        [request setValue:@"template" forHTTPHeaderField:@"ServiceBusNotification-Format"];

        // JSON Content-Type
        [request setValue:@"application/json;charset=utf-8" forHTTPHeaderField:@"Content-Type"];

        //Authenticate the notification message POST request with the SaS token
        [request setValue:authorizationToken forHTTPHeaderField:@"Authorization"];

        //Add the notification message body
        [request setHTTPBody:[json dataUsingEncoding:NSUTF8StringEncoding]];

        // Send the REST request
        NSURLSessionDataTask* dataTask = [session dataTaskWithRequest:request
                    completionHandler:^(NSData *data, NSURLResponse *response, NSError *error)
            {
            NSHTTPURLResponse* httpResponse = (NSHTTPURLResponse*) response;
                if (error || httpResponse.statusCode != 200)
                {
                    NSLog(@"\nError status: %d\nError: %@", httpResponse.statusCode, error);
                }
                if (data != NULL)
                {
                    //xmlParser = [[NSXMLParser alloc] initWithData:data];
                    //[xmlParser setDelegate:self];
                    //[xmlParser parse];
                }
            }];

        [dataTask resume];
    }
    ```

2. In `ViewController.m`, update the `Send Notification` action as shown in the code that follows. So that it sends the notifications using each tag individually and sends to multiple platforms.

    ```objc
    - (IBAction)SendNotificationMessage:(id)sender
    {
        self.sendResults.text = @"";

        NSArray* categories = [NSArray arrayWithObjects: @"World", @"Politics", @"Business",
                                @"Technology", @"Science", @"Sports", nil];

        // Lets send the message as breaking news for each category to WNS, FCM, and APNS
        // using a template.
        for(NSString* category in categories)
        {
            [self SendNotificationRESTAPI:category];
        }
    }
    ```

3. Rebuild your project and make sure you have no build errors.

## Run the app and generate notifications

1. Press the Run button to build the project and start the app. Select some breaking news options to subscribe to and then press the **Subscribe** button. You should see a dialog indicating the notifications have been subscribed to.

    Example notification on iOS

    When you choose **Subscribe**, the app converts the selected categories into tags and requests a new device registration for the selected tags from the notification hub.

2. Enter a message to be sent as breaking news then press the **Send Notification** button. Alternatively, run the .NET console app to generate notifications.

    Change notification preferences in iOS

3. Each device subscribed to breaking news receives the breaking news notifications you just sent.

## Next steps

In this tutorial, you sent broadcast notifications to specific iOS devices that have registered for the categories. To learn how to push localized notifications, advance to the following tutorial:

> 
>[Push localized notifications](notification-hubs-ios-xplat-localized-apns-push-notification.md)

<!-- Images. -->
[1]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/notification-hubs/media/notification-hubs-ios-send-breaking-news/notification-hub-breakingnews-subscribed.png
[2]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/notification-hubs/media/notification-hubs-ios-send-breaking-news/notification-hub-breakingnews-ios1.png
[3]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/notification-hubs/media/notification-hubs-ios-send-breaking-news/notification-hub-breakingnews-ios2.png

<!-- URLs. -->
[How To: Service Bus Notification Hubs (iOS Apps)]: https://learn.microsoft.com/previous-versions/azure/azure-services/jj927170\(v=azure.100\)
[Use Notification Hubs to broadcast localized breaking news]: notification-hubs-ios-xplat-localized-apns-push-notification.md
[Mobile Service]: https://learn.microsoft.com/develop/mobile/tutorials/get-started
[Notify users with Notification Hubs]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/notification-hubs/notification-hubs-aspnet-backend-ios-notify-users.md
[Notification Hubs Guidance]: https://learn.microsoft.com/previous-versions/azure/azure-services/dn530749\(v=azure.100\)
[Notification Hubs How-To for iOS]: https://learn.microsoft.com/previous-versions/azure/azure-services/jj927170\(v=azure.100\)
[get-started]: ios-sdk-get-started.md
[Azure portal]: https://portal.azure.com
