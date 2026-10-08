---
author: pgrandhi
ms.service: azure-communication-services
ms.topic: include
ms.date: 06/28/2024
ms.author: pgrandhi
---

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- An [Azure Communication Services resource](../../create-communication-resource.md).
- To receive events, create a Webhook. See [Webhook Event Delivery](https://learn.microsoft.com/azure/event-grid/webhook-event-delivery).


## Register the Event Grid resource provider

This article describes how to register the Event Grid resource provider. If you used Event Grid before in the same subscription, skip to the next section.

In the Azure portal, do the following steps:

1. On the left menu, select **Subscriptions**.
1. Select the **Subscription** you want to use for Event Grid from the subscription list.  
1. On the **Subscription** page, select **Resource providers** under **Settings** on the left menu. 
1. Search for **Microsoft.EventGrid**, and confirm that the **Status** is **Not Registered**. 
1. Select **Microsoft.EventGrid** in the provider list. 
1. Select **Register** on the command bar. 

    Image showing the registration of Microsoft.EventGrid provider with the Azure subscription.

1. Refresh to make sure the status of **Microsoft.EventGrid** is changed to **Registered**. 

    Image showing the successful registration of Microsoft.EventGrid provider with the Azure subscription.

## Create event subscription

To create an Event subscription for Azure Communication Services resource, first sign in to the [Azure portal](https://portal.azure.com). In the upper-left corner of the page, select the Communication Services resource.
1. Select the **Events** tab from the left menu.
2. Select **+ Event Subscription**.

   Screenshot highlighting the create event subscription button in the Azure portal.

3. On the **Create Event Subscription** page, follow these steps:
   1. Enter a name for the event subscription.
   1. Enter a name for the System topic name.
   1. Select the event types that you want to receive on the event subscription.

      Screenshot that shows the selection of event types.

      For more information, see [Communication Services Events](https://learn.microsoft.com/azure/event-grid/event-schema-communication-services).

   1. Select the Endpoint Type as Web Hook.
 
      Screenshot that shows the selection of endpoint type.

   1. Select **Configure an Endpoint**

       Screenshot highlighting the create event page in the Azure portal.
 
   1. Enter the link to the webhook and select **Confirm Selection**.

       Screenshot highlighting the select webhook endpoint page in the Azure portal.

   1. In the **Filters** tab, add the names of the event types you want to filter in the subscription. Add any context attribute filters you want to use in the subscription. Then, select **Next: Additional features** at the bottom of the page.

       Screenshot highlighting Event Grid create filters page in the Azure portal.

   1. To enable dead lettering and customize retry policies, select **Additional Features**.

       Screenshot that shows the Additional features tab of the Create Event Subscription page.

   1. When done, select **Create**.

## Update event subscription

This section shows how to update an Event subscription for Azure Communication Services to update the events you want to receive via Webhook.

To update an Event subscription for Azure Communication Services resource, first sign in to the [Azure portal](https://portal.azure.com). In the upper-left corner of the page, select the Communication Services resource. 

1. Select the **Events** tab from the left menu.
1. Select **Event Subscriptions** and select the Event subscription you want to update. 

   Screenshot highlighting the event subscription button in the Azure portal.

1. On the **Event Subscription** page, select the **Filters** tab. Select the event types that you want to receive on the event subscription.

   Screenshot that shows the selection of event types to update.

1. To enable dead lettering and customize retry policies, select **Additional Features**.

   Screenshot that shows the Additional features tab of the Update Event Subscription page.

1. To update the webhook to receive events, select **Change** next to the webhook link and enter the new webhook endpoint.

    Screenshot that shows the Change the webhook endpoint link in the Event Subscription page.

1. When done, select **Save**.

    Screenshot that shows the save button in the Azure portal.

## Delete event subscription

To delete an Event subscription for Azure Communication Services, follow these steps.

To delete an Event subscription for Azure Communication Services resource, first sign in to the [Azure portal](https://portal.azure.com). In the upper-left corner of the page, select the Communication Services resource. 

1. Select the **Events** tab from the left menu.
1. Select **Event Subscriptions** and select the Event subscription you want to delete.

   Screenshot highlighting the event subscriptions button to access event subscription to be deleted in the Azure portal.

1. On the Event Subscription page, Select **Delete** from the top of the page.

   Screenshot highlighting the delete button in the Azure portal.

## Next steps

* For a list of Communication Services events, see [Communication Services Events](https://learn.microsoft.com/azure/event-grid/event-schema-communication-services).
* For a list of supported event handlers, see [Event handlers](https://learn.microsoft.com/azure/event-grid/event-handlers).
* For information about event delivery and retries, see [Event Grid message delivery and retry](https://learn.microsoft.com/azure/event-grid/delivery-and-retry).
* For an introduction to Event Grid, see [About Event Grid](https://learn.microsoft.com/azure/event-grid/overview).
