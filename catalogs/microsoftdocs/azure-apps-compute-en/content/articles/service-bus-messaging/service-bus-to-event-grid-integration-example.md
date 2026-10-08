---
title: Handle Service Bus Events Using Event Grid Using Azure Logic Apps
description: This article provides steps for handling Service Bus events by using Event Grid using Azure Logic Apps.
author: spelluru
ms.topic: tutorial
ms.date: 06/19/2025
ms.author: spelluru
ms.custom: sfi-image-nochange
#customer intent: As a developer, I want to learn how to respond to Azure Service Bus events that are received over Azure Event Grid to support my Azure Logic Apps. 
---

# Tutorial: Respond to Azure Service Bus events received using Azure Event Grid by using Azure Logic Apps

In this tutorial, you learn how to respond to Azure Service Bus events that are received using Azure Event Grid by using Azure Logic Apps. 


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


## Receive messages by using Logic Apps

In this section, create an Azure logic app that receives Service Bus events by using Azure Event Grid. 

1. Select **+ Create a resource**, select **Integration**, and then select **Logic App**. 
    
   Screenshot that shows the Create a resource > Integration > Logic app menu.

1. On the **Create Logic App** page, follow these steps:

   1. Select the **Consumption** > **Multi-tenant** option, then choose **Select**.
   1. Select your Azure **Subscription**. 
   1. Enter a **Resource Group**. Select the resource group that you used for other resources, like the Service Bus namespace, that you created earlier. 
   1. Enter a name for the logic app.
   1. Select the **Region** for the logic app. 
   1. Select **Review + Create**. 

      Screenshot that shows the Create a logic app page.

   1. On the **Review + Create** page, select **Create** to create the logic app. 

1. On the **Deployment complete** page, select **Go to resource** to navigate to the **Logic app** page.

### Add a step receive messages from Service Bus using Event Grid

1. Expand **Development Tools** and select **Logic app templates**.

   Screenshot that shows the Logic app designer page with the Blank workflow option selected.

1. Select **Blank workflow**. The **Logic app designer** opens.
1. On the designer, do the following steps:

   1. Select **Add a trigger** and then search for **Event Grid**. 
   1. Select **When a resource event occurs**. 

      Screenshot that shows the Logic Apps Designer with Event Grid trigger selected.

1. Select **Sign in**.

   Screenshot that shows the Logic Apps Designer with the Sign in button selected.

1. On the **Sign in to your account** page, select the account you want to use to sign in to Azure. 
1. On the **When a resource event occurs** page, do the following steps:

   1. For **Resource Type**, select **Microsoft.ServiceBus.Namespaces**.
   1. Select your Azure subscription.
   1. For **Resource Name**, select your Service Bus namespace.
   1. Under **Advanced parameters**, select the down arrow.
   1. Select **Suffix Filter**, and then move the focus outside dropdown list.

      Screenshot that shows adding of a new parameter of type Suffix filter.

   1. For **Suffix Filter**, enter the name of your Service Bus topic subscription.

      Screenshot that shows the Logic Apps Designer with connection configuration for the Service Bus namespace.

1. Select the **+** sign, then select **Add an action**.

   1. Search for **Service Bus**.
   
      Screenshot that shows the selection of Service Bus.

   1. Select **See more** and then select **Get messages from a topic subscription (peek-lock)**.

      Screenshot that shows the Logic Apps Designer with Get messages from a topic subscription selected.

   1. Follow these steps:

      1. Enter a name for the connection. For example: *Get messages from the topic subscription*.
      1. Confirm that **Authentication Type** is set to **Access Key**.
      1. For **Connection String**, copy and paste the connection string to the Service Bus namespace that you saved earlier.
      1. Select **Create new**. 
    
         Screenshot that shows the Logic Apps Designer with the Service Bus connection string specified.

   1. Select your topic and subscription. 

      Screenshot that shows the Logic Apps Designer with the Service Bus topic and subscription specified.

### Add a step to process and complete received messages

In this section, you add steps to send the received message in an email and then complete the message. In a real-world scenario, you process a message in the logic app before completing the message.

#### Add a foreach loop

1. Select the **+** sign, then select **Add an action**.
1. Search for and then select **For each**.  

   Screenshot that shows the For-each operation selected.

1. For **Select an output from previous steps**, select the lightning bolt or enter */* and select **Insert dynamic content**.
1. Select **Body** under **Get messages from a topic subscription (peek-lock)**.

   Screenshot that shows the selection of For each input.

#### Add a step inside the foreach loop to send an email with the message body

1. In the **For Each** loop, select **+**, then select **Add an action**.

   Screenshot that shows the selection of + button in the For-each loop.

1. Search for **Office 365** and then select **See more**.
1. Select **Office 365 Outlook** in the search results.

   Screenshot that shows the selection of Office 365.

1. In the list of actions, select **Send an email (V2)**. 

   Screenshot that shows the selection of Send an email operation.

1. Select **Sign in**, and follow steps to create a connection to Office 365 Outlook.
1. In the **Send an email (V2)** window, follow these steps: 
1. Select inside the text box for **Body**, and follow these steps:

   1. For **To**, enter an email address. 
   1. For **Subject**, enter **Message received from Service Bus topic's subscription**.  
   1. In the **Body**, select the expression or enter */* and select Insert expression.
   1. Enter the following expression:

      ```
      base64ToString(items('For_each')?['ContentData'])
      ```

   1. Select **Add**. 
    
      Screenshot that shows the expression for Body of the Send an email activity.

#### Add another action in the foreach loop to complete the message

1. In the **For Each** loop, select **+**, then select **Add an action**.

   1. Search for **Service Bus**.
   1. Select **Complete the message in a topic subscription** from the list of actions.

      Screenshot that shows the selection of Complete a message in a topic subscription.

   1. Select your Service Bus topic.
   1. Select a subscription to the topic.
   1. In **Lock Token Of The Message**, select the expression or enter */* and select Insert expression.
   1. Select **Dynamic content** and the select **Lock Token**. Select **Add**.

      Screenshot that shows the lock token field.

1. Select **Save** on the toolbar on the Logic Apps Designer to save the logic app. 

   Screenshot that shows the Save button in the Logic app designed.

## Test the app

1. If you haven't already sent test messages to the topic, follow instructions in the [Send messages to the Service Bus topic](#send-messages-to-the-service-bus-topic) section to send messages to the topic.
1. Navigate to the **Overview** page of your logic app. Then select the **Run history** tab in the bottom pane. You see the logic app runs messages that were sent to the topic. It could take a few minutes before you see the logic app runs. Select **Refresh** on the toolbar to refresh the page.

   Screenshot that shows the Logic app run history.

1. Select a logic app run to see the details. Notice that it processed five messages in the for loop.

   Screenshot that shows the details for the selected logic app run.

1. You should get an email for each message the logic app receives.

   Screenshot of Outlook with the messages received from the topics subscription.

## Troubleshoot

If you don't see any invocations after waiting and refreshing for sometime, follow these steps: 

1. Confirm that the messages reached the Service Bus topic. See the **incoming messages** counter on the **Service Bus Topic** page. In this case, the **MessageSender** application runs once, so there are 5 messages.

   Screenshot that shows the Service Bus Topic page with incoming message count selected.

1. Confirm that there are no active messages at the Service Bus subscription.

   If you don't see any events on this page, verify that the **Service Bus Subscription** page doesn't show any **Active message count**. If the number for this counter is greater than zero, the messages at the subscription aren't forwarded to the handler function (event subscription handler) for some reason. Verify that you set up the event subscription properly.

   Screenshot that shows the Service Bus Subscription page with the active message count selected.

1. You also see **delivered events** on the **Events** page of the Service Bus namespace. 

   Screenshot that shows the Events page of the Service Bus Namespace page.

1. You can also see that the events are delivered on the **Event Subscription** page. You can get to this page by selecting the event subscription on the **Events** page.

   Screenshot that shows the Event Subscription page with the delivered event count selected.

## Related content

- Learn more about [Azure Event Grid](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-grid/index.yml).
- Learn more about [Azure Functions](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/index.yml).
- Learn more about the [Logic Apps feature of Azure App Service](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/logic-apps/index.yml).
- Learn more about [Azure Service Bus](service-bus-messaging-overview.md).


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
