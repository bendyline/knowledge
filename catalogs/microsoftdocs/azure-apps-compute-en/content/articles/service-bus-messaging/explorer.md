---
title: Service Bus Explorer Guide for Data Operations
description: This article provides information on how to use the portal-based Azure Service Bus Explorer to access Azure Service Bus data.
#customer intent: As a developer, I want to use the Service Bus Explorer to send messages to a queue or topic so that I can test my messaging application.
ms.topic: how-to
ms.date: 02/05/2026
ms.author: egrootenboer
ms.custom: sfi-image-nochange
---

# Use Service Bus Explorer to run data operations on Service Bus
Azure Service Bus enables sender and receiver client applications to decouple their business logic by using familiar point-to-point (Queue) and publish-subscribe (Topic-Subscription) semantics. 

> **Note:**
> This article highlights the functionality of the Azure Service Bus Explorer that's part of the Azure portal.
>
> The community owned [open source Service Bus Explorer](https://github.com/paolosalvatori/ServiceBusExplorer) is a standalone application and is different from this one.

You can run two kinds of operations on an Azure Service Bus namespace.  

   * **Management operations** - Create, update, and delete of Service Bus namespace, queues, topics, and subscriptions.
   * **Data operations** - Send to and receive messages from queues, topics, and subscriptions.

> **Important:**
> - Service Bus Explorer doesn't support **management operations** and **sessions**. 
> - Don't use the Service Bus Explorer for larger messages, as it can result in timeouts, depending on the message size, network latency between client and Service Bus service, and other factors. Instead, use your own client to work with larger messages, where you can specify your own timeout values.
> - If you can only access your Service Bus namespace through a private endpoint, you must run your web browser on a host in the virtual network with the private endpoint. Also, ensure that no network security groups (NSGs) block access.
> - If a user has access only to entities and not the namespace, Service Bus Explorer might not function as expected in scenarios involving [migration to the premium tier](service-bus-migrate-standard-premium.md) or [metadata disaster recovery](service-bus-geo-dr.md). 


## Prerequisites

To use the Service Bus Explorer tool, complete the following tasks: 

- [Create an Azure Service Bus namespace](service-bus-quickstart-portal.md#create-a-namespace-in-the-azure-portal).
- Create a queue to send and receive messages or a topic with a subscription to test out the functionality. To learn how to create queues, topics, and subscriptions, see the following articles: 
    - [Quickstart - Create queues](service-bus-quickstart-portal.md)
    - [Quickstart - Create topics](service-bus-quickstart-topics-subscriptions-portal.md)

    > **Note:**
    > To execute send or receive operations (including peek and purge) on the namespace or entities, you must be a member of one of these roles: 
    > - [Service Bus Data Owner](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles.md#azure-service-bus-data-owner); Allows both send and receive operations.
    > - [Service Bus Data Sender](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles.md#azure-service-bus-data-sender); Allows send operations.
    > - [Service Bus Data Receiver](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles.md#azure-service-bus-data-receiver); Allows receive operations.

## Use the Service Bus Explorer

To use the Service Bus Explorer, go to the Service Bus namespace where you want to perform data operations.

> **Tip:**
> If you see `~` (tilde) characters in entity names, the entity was created with a hierarchical name that uses `/` (forward slash) as a path separator. Azure Resource Manager displays these as `~` because it doesn't support `/` in resource names. The underlying entity name uses `/`. For details, see [Entity names with forward slashes](service-bus-resource-manager-exceptions.md#error-entity-names-with-forward-slashes).

1. If you want to run operations against a queue, select **Queues** from the navigation menu. If you want to run operations against a topic (and its related subscriptions), select **Topics**. 

    Screenshot of left side navigation, where entity can be selected.
1. After selecting **Queues** or **Topics**, select the specific queue or topic.

    Screenshot of the Queues page with a specific queue selected.
1. Select the **Service Bus Explorer** from the left navigation menu.

    Screenshot of queue page where Service Bus Explorer can be selected.

    > **Note:**
    > When peeking or receiving from a subscription, first select the specific **Subscription** from the dropdown selector.
    > Screenshot of dropdown for topic subscriptions.

   > **Note:**
   > When you navigate to Service Bus explorer for an entity in a namespace that has the public access disabled, you see the following message even though you access it from a virtual machine that's in the same virtual network as the private endpoint. You can ignore it.
   >
   > "The namespace has public network access disabled. Data operations such as Peek, Send, or Receive against this Service Bus entity don't work until you switch to all networks or allow list your client IP in selected networks."

## Peek a message

By using the peek functionality, you can use the Service Bus Explorer to view the top 100 messages in a queue, subscription, or dead-letter queue.

1. Select **Peek Mode** in the Service Bus Explorer dropdown to peek messages.

    Screenshot of dropdown with Peek Mode selected.

1. Check the metrics to see if there are **Active Messages** or **Dead-lettered Messages** to peek. Select either **Queue / Subscription** or **DeadLetter** subqueue.

    Screenshot of queue and dead-letter subqueue tabs with message metrics displayed.

1. Select the **Peek from start** button. 

    Screenshot indicating the Peek from start button.

1. When the peek operation finishes, up to 100 messages appear on the grid. To view the details of a particular message, select it from the grid. You can choose to view the body or the message properties.

    Screenshot with overview of peeked messages and message body content shown for peeked messages.

    Switch to the **Message Properties** tab in the bottom pane to see the metadata. 

    Screenshot with overview of peeked messages and message properties shown for peeked messages.

    > **Note:**
    > Because peek isn't a destructive operation, the message **isn't** removed from the entity.

    > **Note:**
    > For performance reasons, when peeking messages from a queue or subscription that has its maximum message size set over 1 MB, the message body isn't retrieved by default. Instead, you can load the message body for a specific message by selecting the **Load message body** button. If the message body is over 1 MB, it's not truncated before being displayed.
    > Screenshot with overview of peeked messages and button to load message body shown.

### Peek a message by using advanced options

By using the peek with options functionality, you can use the Service Bus Explorer to view the top messages in a queue, subscription, or the dead-letter queue. You can specify the number of messages to peek and the sequence number to start the peek operation.

1. To peek messages by using advanced options, select **Peek Mode** in the Service Bus Explorer dropdown.

    Screenshot of dropdown with Peek Mode selected for peek with advanced options.

1. Check the metrics to see if there are **Active Messages** or **Dead-lettered Messages** to peek. Select either **Queue / Subscription** or **DeadLetter** subqueue.

    Screenshot of queue and dead-letter subqueue tabs with message metrics displayed for peek with advanced options.

1. Select the **Peek with options** button. Enter the number of messages to peek and the sequence number to start peeking from. Select the **Peek** button. 

    Screenshot indicating the Peek with options button, and a page where the options can be set.

1. When the peek operation completes, the messages appear on the grid as shown in the following image. To view the details of a particular message, select it from the grid. You can choose to view the body or the message properties.

    Screenshot with overview of peeked messages and message body content shown for peek with advanced options.

    Switch to the **Message Properties** tab in the bottom pane to see the metadata.
    
    Screenshot with overview of peeked messages and message properties shown for peek with advanced options.

    > **Note:**
    > Because peek isn't a destructive operation, the message **isn't** removed from the queue.

## Receive a message

The receive function on the Service Bus Explorer permits receiving messages from a queue or subscription.

1. To receive messages, select **Receive Mode** in the Service Bus Explorer dropdown.

    Screenshot of dropdown with Receive Mode selected.

1. Check the metrics to see if there are **Active Messages** or **Dead-lettered Messages** to receive, and select either **Queue / Subscription** or **DeadLetter**.

    Screenshot of queue and dead-letter subqueue tabs with message metrics displayed for receive mode.

1. Select the **Receive messages** button, and specify the Receive mode, the number of messages to receive, and the maximum time to wait for a message and select **Receive**.

    Screenshot indicating the Receive button, and a page where the options can be set.

    > **Important:**
    > The ReceiveAndDelete mode is a ***destructive receive***, that is, the message is removed from the queue when it's displayed on the Service Bus Explorer tool.
    >
    > To browse messages without removing them from the queue, consider using the **Peek** functionality, or using the **PeekLock** receive mode.

1. Once the receive operation completes, the messages show up on the grid as shown in the following image. To view the details of a particular message, select it in the grid. 

    Screenshot with overview of received messages and message body content shown.

    Screenshot with overview of received messages and message properties shown.

    > **Note:**
    > For performance reasons, when receiving messages from a queue or subscription that has its maximum message size set over 1 MB, only one message is received at a time. If the message body is over 1 MB, the tool truncates it before displaying.

After a message is received in **PeekLock** mode, there are various actions you can take on it.

> **Note:**
> You can only take these actions as long as you have a lock on the message.

### Complete a message

1. In the grid, select the received messages you want to complete.
1. Select the **Complete** button.

    Screenshot indicating the Complete button.

    > **Important:**
    > When you complete a message, you perform a ***destructive receive***. The process removes the message from the queue after you select **Complete** in the Service Bus Explorer tool.

### Defer a message

1. In the grid, select one or more received messages you want to [defer](message-deferral.md).
1. Select the **Defer** button.

    Screenshot indicating the Defer button.

### Abandon lock

1. In the grid, select one or more received messages for which you want to abandon the lock.
1. Select the **Abandon lock** button.

    Screenshot indicating the Abandon Lock button.

After the lock is abandoned, the message is available for receive operations again.

### Dead-letter

1. In the grid, select one or more received messages you want to [dead-letter](service-bus-dead-letter-queues.md).
1. Select the **Dead-letter** button.

    Screenshot indicating the Dead-letter button.

After you dead-letter a message, you can access it from the **Dead-letter** subqueue.

### Purge messages

To purge messages, select the **Purge messages** button in Service Bus explorer. 
 
 Screenshot indicating the purge messages button.

When prompted, enter 'purge' to confirm the operation. The process purges messages from the respective Service Bus entity. 

## Send a message to a queue or topic

To send a message to a **queue** or a **topic**, select the **Send messages** button in the Service Bus Explorer.

1. Select the **Content Type** to be either **Text/Plain**, **Application/Xml**, or **Application/Json**.
1. For **Message body**, add the message content. Make sure it matches the **Content Type** you set earlier.
1. Set the **Broker properties** (optional). These properties include Correlation ID, Message ID, ReplyTo, Label/Subject, Time to Live (TTL), and Scheduled Enqueue Time (for Scheduled Messages).
1. Set the **Custom Properties** (optional). These properties can be any user properties set against a dictionary key.
1. Check **Repeat send** to send the same message multiple times. If you don't set a Message ID, the process automatically populates it with sequential values.
1. When you're done composing the message, select **Send**.

    Screenshot showing the compose message experience.

1. When the send operation completes successfully, one of the following changes happens: 

    - If you're sending to a queue, the process increments the **Active Messages** metrics counter.
    - If you're sending to a topic, the process increments the **Active Messages** metrics counter on the subscriptions where the message was routed to.  

## Resend a message

After peeking or receiving a message, you can resend it. Resending sends a copy of the message to the same entity, while allowing you to update its content and properties. The original message remains and isn't deleted even when you resend from the deadletter queue.

1. In the grid, select one or more messages you want to resend.
1. Select the **Re-send selected messages** button.

    Screenshot indicating the Resend selected messages button.

1. Optionally, select any message for which you want to update its details and make the desired changes.
1. Select the **Send** button to send the messages to the entity.

    Screenshot showing the resend messages experience.
    
    > **Note:** 
    > - The resend operation sends a copy of the original message. It doesn't remove the original message that you resubmit. 
    > - If you resend a message in a dead-letter queue of a subscription, a copy of the message is sent to the topic. Therefore, all subscriptions receive a copy of the message. 

## Export messages
You can export messages in the grid to an Excel worksheet by selecting the **Export messages** button on the toolbar. 

Screenshot showing the export messages experience.

## Show or hide message body
When you select a message in the grid, the message body appears in the bottom pane by default. To hide the message body, select **Hide message body** on the toolbar. Then, select **Peek** or **Receive** to load the messages without the body. This option is useful when there are large messages in the entity. It doesn't toggle the message body tab in the bottom pane if it's already open.

Screenshot indicating the Hide message body button.

## Switch authentication type

When working with Service Bus Explorer, you can use either **Access Key** or **Microsoft Entra ID** authentication.

1. Select the **Settings** button.

    Screenshot indicating the Settings button in Service Bus Explorer.
1. Choose the authentication method you want to use, and select **Save**.

    Screenshot indicating the Settings button and a page showing the different authentication types.

## Next steps

   * Learn more about Service Bus [Queues](service-bus-queues-topics-subscriptions.md#queues) and [Topics](service-bus-queues-topics-subscriptions.md#topics-and-subscriptions).
   * Learn more about creating [Service Bus Queues via the Azure portal](service-bus-quickstart-portal.md).
   * Learn more about creating [Service Bus Topics and Subscriptions via the Azure portal](service-bus-quickstart-topics-subscriptions-portal.md).
