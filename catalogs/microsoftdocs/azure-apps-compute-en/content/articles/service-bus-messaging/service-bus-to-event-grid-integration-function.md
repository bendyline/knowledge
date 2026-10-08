---
title: Handle Service Bus events using Azure Functions
description: This tutorial provides step-by-step instructions for handling Service Bus events via Azure Event Grid using Azure Functions. 
author: spelluru
ms.topic: tutorial
ms.date: 12/06/2024
ms.author: spelluru
ms.custom:
  - devx-track-csharp
  - sfi-image-nochange
# Customer intent: As a developer, I want to know how to handle Service Bus events using Azure Functions.
---

# Tutorial: Respond to Azure Service Bus events received via Azure Event Grid by using Azure Functions
In this tutorial, you learn how to respond to Azure Service Bus events that are received via Azure Event Grid by using Azure Functions and Azure Logic Apps. 

In this tutorial, you learn how to:

> 
> * Create a Service Bus namespace
> * Prepare a sample application to send messages
> * Send messages to the Service Bus topic
> * Receive messages by using Logic Apps
> * Set up a test function on Azure
> * Connect the function and namespace via Event Grid
> * Receive messages by using Azure Functions


## Prerequisites

If you don't have an [Azure subscription](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/guides/developer/azure-developer-guide.md#understanding-accounts-subscriptions-and-billing), create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.

>**Note:**
>Event Grid integration with Azure Service Bus does not support all receive modes and scenarios. In particular, **Peek-Lock** behavior and message settlement patterns may differ from native Service Bus triggers. If your workflow requires Peek-Lock semantics or advanced settlement control, use a Service Bus–native trigger or receiver instead of Event Grid. Ensure your topic and subscription are configured for Event Grid compatibility before using this sample.

## Create a Service Bus namespace

Follow instructions in this tutorial: [Quickstart: Use the Azure portal to create a Service Bus topic and subscriptions to the topic](service-bus-quickstart-topics-subscriptions-portal.md) to do the following tasks:

- Create a **premium** Service Bus namespace. 
- Get the connection string. 
- Create a Service Bus topic.
- Create a subscription to the topic. You need only one subscription in this tutorial, so no need to create subscriptions S2 and S3. 

## Send messages to the Service Bus topic

In this section, you use a sample application to send messages to the Service Bus topic you created in the previous section. 

1. Clone the [GitHub azure-service-bus repository](https://github.com/Azure/azure-service-bus/) or download the zip file and extract files from it. 
1. In Visual Studio, go to the *\samples\DotNet\Azure.Messaging.ServiceBus\ServiceBusEventGridIntegrationV2* folder, and then open the *SBEventGridIntegration.sln* file.
1. In the **Solution Explorer** window, expand the **MessageSender** project, and select **Program.cs**.
1. Replace `<SERVICE BUS NAMESPACE - CONNECTION STRING>` with the connection string to your Service Bus namespace and `<TOPIC NAME>` with the name of the topic. 

   ```csharp
   const string ServiceBusConnectionString = "<SERVICE BUS NAMESPACE - CONNECTION STRING>";
   const string TopicName = "<TOPIC NAME>";
   ```

1. Build and run the program to send five test messages (`const int numberOfMessages = 5;`) to the Service Bus topic. 

   Screenshot shows the console app output, sending 5 messages.


## Additional prerequisites
Install [Visual Studio 2022](https://www.visualstudio.com/vs) and include the **Azure development** workload. This workload includes **Azure Function Tools** that you need to create, build, and deploy Azure Functions projects in Visual Studio. 

## Deploy the function app 

>**Note:**
> To learn more about creating and deploying an Azure Functions app, see [Develop Azure Functions using Visual Studio](../azure-functions/functions-develop-vs.md)

1. Open **ReceiveMessagesOnEvent.cs** file from the **FunctionApp1** project of the **SBEventGridIntegration.sln** solution. 
1. Replace `<SERVICE BUS NAMESPACE - CONNECTION STRING>` with the connection string to your Service Bus namespace. It should be the same as the one you used in the **Program.cs** file of the **MessageSender** project in the same solution. 
1. Right-click **FunctionApp1**, and select **Publish**. 
1. On the **Publish** page, select **Start**. These steps might be different from what you see, but the process of publishing should be similar. 
1. In the **Publish** wizard, on the **Target** page, select **Azure** for **Target**. 
1. On the **Specific target** page, select **Azure Function App (Windows)**. 
1. On the **Functions instance** page, select **Create new**. 

    Screenshot showing the Add function button of the Visual Studio - Publish dialog box.
1. On the **Function App (Windows)** page, follow these steps:
    1. Enter a **name** for the function app.
    1. Select an Azure **subscription**.
    1. Select an existing **resource group** or create a new resource group. For this tutorial, select the resource group that has the Service Bus namespace. 
    1. Select a **plan type** for App Service.
    1. Select a **location**. Select the same location as the Service Bus namespace. 
    1. Select an existing **Azure Storage** or select **New** to create a new Storage account to be used by the Functions app. 
    1. For **Application insights**, select an existing Application Insights instance to associate with the Azure function or create one.
    1. Select **Create** to create the Functions app. 
1. Back on the **Functions instance** page of the **Publish** wizard, select **Finish**. 
1. On the **Publish** page in Visual Studio, select **Publish** to publish the Functions app to Azure. 
1. In the **Output** window, see the messages from build and publish, and confirm that they both succeeded. 

    If the publishing fails with an authentication issue, ensure that the **SCM Basic Auth Publishing** option is enabled for the Azure Functions app.

    Screenshot that shows the SCM Basic Authentication Publishing option enabled.
1. Now, on the **Publish** page, in the **Hosting** section, select **... (ellipsis)**, and select **Open in Azure portal**. 

    Screenshot that shows the Publish page in Visual Studio.
1. In the Azure portal, on the **Function App** page, select **EventGridTriggerFunction** from the list. We recommend that you use the Event Grid trigger with Azure Functions as it has a few benefits over using the HTTP trigger. For details, see [Azure function as an event handler for Event Grid events](../event-grid/handler-functions.md).

    Screenshot showing the Functions page with the Event Grid Trigger function.
1. On the **Function** page for the **EventGridTriggerFunction**, switch to the **Invocations** tab.

    Screenshot showing the Invocation page of an Event Grid Trigger function.

    Keep this page open in a tab your web browser. You'll refresh this page to see invocations for this function later.

## Connect the function and the Service Bus namespace via Event Grid
In this section, you tie together the function and the Service Bus namespace by using the Azure portal. 

To create an Azure Event Grid subscription, follow these steps:

1. In the Azure portal, go to your Service Bus namespace and then, in the left pane, select **Events**. Your namespace window opens, with two Event Grid subscriptions displayed in the right pane. 
    
    Screenshot that shows the Events page for a Service Bus namespace.
2. Select **+ Event Subscription** on the toolbar. 
3. On the **Create Event Subscription** page, do the following steps:
    1. Enter a **name** for the subscription. 
    2. Enter a **name** for the **system topic**. System topics are topics created for Azure resources such as Azure Storage account and Azure Service Bus. To learn more about system topics, see [System topics overview](../event-grid/system-topics.md).
    2. Select **Azure Function** for **Endpoint Type**, and choose **Configure an endpoint**. 

        Screenshot that shows the Create Event Subscription page for a Service Bus namespace.
    3. On the **Select Azure Function** page, select the subscription, resource group, function app, slot, and the function, and then select **Confirm selection**. 

        Screenshot that shows the selection of an Azure function endpoint.
    4. On the **Create Event Subscription** page, switch to the **Filters** tab, and do the following tasks:
        1. Select **Enable subject filtering**
        2. Enter the name of the subscription to the Service Bus topic you created earlier. In the following screenshot, the name of the subscription is `mysub`.
        3. Select the **Create** button. 

            Screenshot that shows the Filters page of an event subscription.
4. Switch to the **Event Subscriptions** tab of the **Events** page and confirm that you see the event subscription in the list.

    Screenshot that shows the event subscriptions for the Service Bus namespace.

## Monitor the Functions app
The messages you sent to the Service Bus topic earlier are forwarded to the subscription (S1). Event Grid forwards the messages at the subscription to the Azure function. In this step of the tutorial, you confirm the function was invoked and view the logged informational messages. 

1. On the page for your Azure function app, switch to the **Invocations** tab if it isn't already active. You should see an entry for each message posted to the Service Bus topic. If you don't see them, refresh the page after waiting for a few minutes. 

    Screenshot that shows the Invocations page for the function after invocations.
2. Select the invocation from the list to see the details. 

    Screenshot that shows the function invocation details.

    You can also use the **Logs** tab to see the logging information as the messages are sent. There could be some delay, so give it a few minutes to see the logged messages. 

    Screenshot that shows the Logs tab for an Azure function.

## Troubleshoot
If you don't see any function invocations after waiting and refreshing for sometime, follow these steps: 

1. Confirm that the messages reached the Service Bus topic. See the **incoming messages** counter on the **Service Bus Topic** page. In this case, I ran the **MessageSender** application twice, so I see 10 messages (5 messages for each run).

    Screenshot that shows the Service Bus Topic page - incoming messages.
1. Confirm that there are **no active messages** at the Service Bus subscription. 
    If you don't see any events on this page, verify that the **Service Bus Subscription** page doesn't show any **Active message count**. If the number for this counter is greater than zero, the messages at the subscription aren't forwarded to the handler function (event subscription handler) for some reason. Verify that you've set up the event subscription properly. 

    Screenshot that shows the active message count at the Service Bus subscription.
1. You also see **delivered events** on the **Events** page of the Service Bus namespace. 

    Screenshot that shows the count of delivered events.
1. You can also see that the events are delivered on the **Event Subscription** page. You can get to this page by selecting the event subscription on the **Events** page. 
    
    Screenshot that shows the Event subscription page - delivered events.
    

## Related content

* Learn more about [Azure Event Grid](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-grid/index.yml).
* Learn more about [Azure Functions](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/index.yml).
* Learn more about [Azure Service Bus](service-bus-messaging-overview.md).


[2]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/service-bus-messaging/media/service-bus-to-event-grid-integration-example/sbtoeventgrid2.png
[3]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/service-bus-messaging/media/service-bus-to-event-grid-integration-example/sbtoeventgrid3.png
[7]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/service-bus-messaging/media/service-bus-to-event-grid-integration-example/sbtoeventgrid7.png
[8]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/service-bus-messaging/media/service-bus-to-event-grid-integration-example/sbtoeventgrid8.png
[9]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/service-bus-messaging/media/service-bus-to-event-grid-integration-example/sbtoeventgrid9.png
[10]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/service-bus-messaging/media/service-bus-to-event-grid-integration-example/sbtoeventgrid10.png
[11]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/service-bus-messaging/media/service-bus-to-event-grid-integration-example/sbtoeventgrid11.png
[12]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/service-bus-messaging/media/service-bus-to-event-grid-integration-example/sbtoeventgrid12.png
[12-1]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/service-bus-messaging/media/service-bus-to-event-grid-integration-example/sbtoeventgrid12-1.png
[12-2]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/service-bus-messaging/media/service-bus-to-event-grid-integration-example/sbtoeventgrid12-2.png
[13]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/service-bus-messaging/media/service-bus-to-event-grid-integration-example/sbtoeventgrid13.png
[14]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/service-bus-messaging/media/service-bus-to-event-grid-integration-example/sbtoeventgrid14.png
[15]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/service-bus-messaging/media/service-bus-to-event-grid-integration-example/sbtoeventgrid15.png
[16]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/service-bus-messaging/media/service-bus-to-event-grid-integration-example/sbtoeventgrid16.png
[17]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/service-bus-messaging/media/service-bus-to-event-grid-integration-example/sbtoeventgrid17.png
[18]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/service-bus-messaging/media/service-bus-to-event-grid-integration-example/sbtoeventgrid18.png
[20]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/service-bus-messaging/media/service-bus-to-event-grid-integration-example/sbtoeventgridportal.png
[21]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/service-bus-messaging/media/service-bus-to-event-grid-integration-example/sbtoeventgridportal2.png
