---
title: Create Service Bus Topics and Subscriptions in Azure
description: "Quickstart: In this quickstart, you learn how to create a Service Bus topic and subscriptions to that topic by using the Azure portal."
author: spelluru
ms.author: spelluru
ms.date: 02/13/2026
ms.topic: quickstart
ms.custom: mode-ui
#Customer intent: In a retail scenario, how do I update inventory assortment and send a set of messages from the back office to the stores?
---

# Use the Azure portal to create a Service Bus topic and subscriptions to the topic

In this quickstart, you use the Azure portal to create a Service Bus topic and then create subscriptions to that topic. 

## What are Service Bus topics and subscriptions?

Service Bus topics and subscriptions support a *publish/subscribe* communication model. With this pattern, components of a distributed application don't communicate directly with each other. Instead, they exchange messages through a topic, which acts as an intermediary.

Diagram that shows how topics and subscriptions work.

Service Bus queues deliver each message to a single consumer. In contrast, topics and subscriptions provide one-to-many communication using a publish/subscribe pattern. You can register multiple subscriptions to a single topic. When a message is sent to the topic, each subscription receives its own copy to process independently.

A subscription works like a virtual queue that receives copies of messages sent to the topic. You can also define filter rules on a subscription to control which messages it receives.

Service Bus topics and subscriptions enable you to scale to process a large number of messages across many users and applications.


## Create a namespace in the Azure portal

To start using Service Bus messaging entities in Azure, create a namespace with a name that's unique across Azure. A namespace provides a scoping container for Service Bus resources, such as queues and topics, in your application.

To create a namespace:

1. Sign in to the [Azure portal](https://portal.azure.com).
1. Select the flyout menu from the top left and go to the [**All services** page](https://portal.azure.com/#allservices/category/All).
1. On the left navigation bar, select **Integration**.
1. Scroll down to **Messaging services**, hover your mouse over **Service Bus**, and then select **Create**. 
    
   Screenshot showing selection of Create a resource, Integration, and then Service Bus in the menu.

1. In the **Basics** tab of the **Create namespace** page, follow these steps:

   1. For **Subscription**, choose an Azure subscription in which to create the namespace.
   1. For **Resource group**, choose an existing resource group, or create a new one.      
   1. Enter a **Namespace name** that meets the following naming conventions:

      - The name must be unique across Azure. The system immediately checks to see if the name is available. 
      - The name length is at least 6 and at most 50 characters.
      - The name can contain only letters, numbers, and hyphens `-`.
      - The name must start with a letter and end with a letter or number.
      - The name doesn't end with `-sb` or `-mgmt`.

   1. For **Location**, choose the region to host your namespace.
   1. For **Pricing tier**, select the pricing tier (Basic, Standard, or Premium) for the namespace. For this quickstart, select **Standard**. 
    
      If you select the **Premium** tier, you can enable **geo-replication** for the namespace. The geo-replication feature ensures that the metadata and data of a namespace are continuously replicated from a primary region to one or more secondary regions.
    
      > **Important:**
      > If you want to use [topics and subscriptions](service-bus-queues-topics-subscriptions.md#topics-and-subscriptions), choose either Standard or Premium. The Basic pricing tier doesn't support topics and subscriptions. 

      If you selected the **Premium** pricing tier, specify the number of **messaging units**. The premium tier provides resource isolation at the CPU and memory level so that each workload runs in isolation. This resource container is called as a *messaging unit*. A premium namespace has at least one messaging unit. You can select 1, 2, 4, 8, or 16 messaging units for each Service Bus Premium namespace. For more information, see [Service Bus premium messaging tier](service-bus-premium-messaging.md).

   1. Select **Review + create** at the bottom of the page. 
   
      Screenshot showing the Create a namespace page.

   1. On the **Review + create** page, review the settings, and select **Create**. 

1. After the deployment of the resource is successful, select **Go to resource** on the deployment page. 

   Screenshot showing the deployment succeeded page with the Go to resource link.

1. You see the home page for your service bus namespace. 

   Screenshot showing the home page of the Service Bus namespace created.




## Create a topic by using the Azure portal

1. On the **Service Bus Namespace** page, expand **Entities** on the navigational menu to the left, and select **Topics**.
1. Select **+ Topic**. 
1. Enter a **name** for the topic. Leave the other options with their default values.
1. Select **Create**.

   Screenshot of the Create topic page.

## Create subscriptions to the topic

1. Select the **topic** that you created in the previous section. 
    
   Screenshot of the Topics page with your topic selected.

1. On the **Service Bus Topic** page, select **+ Subscription**. 

    Screenshot of the Subscriptions page with the Add subscription button selected.

1. On the **Create subscription** page, follow these steps:

   1. Enter *S1* as the name of the subscription.
   1. Select **Create** to create the subscription. 

      Screenshot of the Create subscription page.

1. Repeat the previous step twice to create subscriptions named *S2* and *S3*.

## Next steps
In this article, you created a Service Bus namespace, a topic in the namespace, and three subscriptions to the topic. To learn how to publish messages to the topic and subscribe for messages from a subscription, see one of the following quickstarts in the **Publish and subscribe for messages** section. 

- [.NET](service-bus-dotnet-how-to-use-topics-subscriptions.md)
- [Java](service-bus-java-how-to-use-topics-subscriptions.md)
- [JavaScript](service-bus-nodejs-how-to-use-topics-subscriptions.md)
- [Python](service-bus-python-how-to-use-topics-subscriptions.md)
