---
title: Subscribe to Microsoft Entra ID events using Azure portal
description: This article explains how to subscribe to events published by Microsoft Entra ID using the Azure portal.
ms.topic: how-to
ms.custom: build-2024
ms.date: 05/08/2024
author: spelluru
ms.author: spelluru
---

# Subscribe to events published by Microsoft Entra ID using the Azure portal
This article describes steps to subscribe to events published by Microsoft Entra ID using the Azure portal.

## Create a partner topic

1. Navigate to [Azure portal](https://portal.azure.com).
1. In the search box, type **Event Grid**, and select **Event Grid** from the results. 

    Screenshot that shows the search box with Event Grid.
1. On the left menu, expand **Partner events**, select **Available partners**.
1. On the **Microsoft Entra ID** tile, select **Create**. 
    
    Screenshot that shows the Available partners page with Microsoft Entra ID selected.
1. On the **Microsoft Graph API subscription** tab of the wizard, follow these steps:
    1. For **Subscription**, select the **Azure subscription** in which you want to create the partner topic.
    1. For **Resource group**, select the resource group for the partner topic resource.
    1. For **Location**, select the region in which you want to create the partner topic.
    1. For **Partner topic name**, enter a name for the partner topic. 
    1. For **Resource**, specify the resource for which you want to receive the notifications. For example: `users`.
    
        Screenshot that shows the Microsoft Graph API subscription page with up to resource specified.
    1. For **Change type**, select the types of events for which you want to be notified.

        Screenshot that shows the Microsoft Graph API subscription page with Updated and Deleted types selected.
    1. For **Expiration time**, select date and time when the partner topic expires.

        Screenshot that shows the Microsoft Graph API subscription page with Expiration time specified.
    1. Select **Enable lifecycle events** options if you want the `Microsoft.Graph.ReauthorizationRequired` event to be supported. For details about lifecycle events, see [Lifecycle notifications for subscriptions](https://learn.microsoft.com/graph/change-notifications-lifecycle-events#supported-resources).
    1. Select **Next: Partner Configuration** at the bottom of the page.
1. On the **Partner Configuration** page, follow these steps:
    1. Select **+ Partner Authorization**. 
    
        Screenshot that shows the selection of + Partner Authorization on the Partner Configuration page.
    1. On the **Add partner authorization to create resources** page, select **Microsoft Graph API**, specify **Authorization expiration time**, and select **Add**. 

        Screenshot that shows the selection of Microsoft Graph API.
    1. Now, on the **Partner Configuration** page, select **Next: Review + create** at the bottom of the page. 
    
        Screenshot that shows the selection of Next: Review + create button.
1. On the **Review + create** page, review all the settings, and select **Create**.

    Screenshot that shows the Review + create page.
1. After the Graph API subscription is created and the partner topic is activated, you see a link to navigate to the partner topic in the portal.

    Screenshot that shows the Create page with a link to navigate to the partner topic.



## Subscribe to partner events

At this point, Microsoft Graph API events should be arriving on your activated partner topic whenever there are changes to the resources specified when your created the Microsoft Graph API subscription. In order to process the events, you must create an event subscription that forwards the events to an event handler like a webhook or any of the [supported Azure services](event-handlers.md).

>**Important:**
>In this section, you find a way to receive events using a sample application, the [Event Grid Viewer](https://github.com/Azure-Samples/azure-event-grid-viewer). This application helps you test the data pipeline to receive events before you create your own application to handle the events according to your business requirements. When you're ready to build your application, see the complete [application samples](subscribe-to-graph-api-events.md#samples-with-detailed-instructions).

### Deploy the Event viewer application

To test your partner topic, deploy the [Event Viewer](https://github.com/Azure-Samples/azure-event-grid-viewer), which is a prebuilt web app. The Event Viewer app displays all events delivered to it. The deployed solution includes an App Service plan, an App Service web app, and source code from GitHub.

1. Select **Deploy to Azure** to deploy the solution to your Azure subscription. In the Azure portal, provide values for the parameters.

   Button to deploy the Resource Manager template to Azure.

2. On the **Custom deployment** page, do the following steps: 
    1. Select a **Resource group** where the application is deployed.  
    2. For **Site Name**, enter a name for the web app.
    3. For **Hosting plan name**, enter a name for the App Service plan to use for hosting the web app.
    5. Select **Review + create**. 

        Screenshot showing the Custom deployment page.
1. On the **Review + create** page, select **Create**. 
1. The deployment takes a few minutes to complete. Select Alerts (bell icon) in the portal, and then select **Go to resource group**. 

    Screenshot showing the successful deployment message with a link to navigate to the resource group.
4. On the **Resource group** page, in the list of resources, select the web app that you created. You also see the App Service plan and any other resource you have in the resource group.

    Screenshot that shows the Resource Group page with the deployed resources.
5. On the **App Service** page for your web app, select the URL to navigate to the web site. The URL should be in this format: `https://<your-site-name>.azurewebsites.net`.
    
    Screenshot that shows the App Service page with the link to the site highlighted.
6. Confirm that you see the site but no events are posted to it yet.

    Screenshot that shows the Event Grid Viewer sample app.

### Create an event subscription

You subscribe to an Event Grid partner topic to tell Event Grid which events you want to track, and where to send the events.

1. Now, on the **Event Grid Partner Topic** Overview page, select **+ Event Subscription** on the toolbar.

2. On the **Create Event Subscription** page, follow these steps:
    1. Enter a **name** for the event subscription.
    3. Select **Web Hook** for the **Endpoint type**. 
    4. Choose **Select an endpoint**. 

        Provide event subscription values
    5. For the web hook endpoint, provide the URL of your web app and add `api/updates` to the home page URL. Select **Confirm Selection**.

        Provide endpoint URL
    6. Back on the **Create Event Subscription** page, select **Create**.

3. View your web app again, and you should see a new subscription validation event. Select the eye icon to expand the event data. Event Grid sends the validation event so the endpoint can verify that it wants to receive event data. The web app includes code to validate the subscription.

    Screenshot of the Event Grid Viewer app with the Subscription Validated event.


## Test the event flow

You're now ready to test your Microsoft Entra ID subscription. According to the change type provided when you created the Microsoft Entra ID subscription, update, or delete the resource that you're tracking. You should see an event displayed on the Event Viewer application for every resource change you make.

## Next steps

- Build your own partner event handler application
  - Use the [sample applications](subscribe-to-graph-api-events.md#samples-with-detailed-instructions) as a way to expedite your development effort. After you have your application, you can update the event subscription endpoint with your application's endpoint.
  - For production purposes, you might want to automate the creation of the Microsoft Graph API subscription and hence the partner topic. To that end, the sample applications are also a good resource. You might want to consult the code snippets in section [How to create a Microsoft Graph API subscription](subscribe-to-graph-api-events.md#how-to-create-a-microsoft-graph-api-subscription) for quick reference.
  - The sample applications also show you how to renew Microsoft Graph API subscriptions to ensure a continuous flow of events. You should understand the concepts behind subscription renewal and the APIs called in section [How to renew a Microsoft Graph API subscription](subscribe-to-graph-api-events.md#how-to-renew-a-microsoft-graph-api-subscription)
