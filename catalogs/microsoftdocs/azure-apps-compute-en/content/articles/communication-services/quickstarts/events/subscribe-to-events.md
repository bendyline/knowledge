---
title: Subscribe to events
titleSuffix: An Azure Communication Services article
description: This article describes how to subscribe to events from Azure Communication Services.
author: awang119
manager: rasubram
services: azure-communication-services
ms.author: anniewang
ms.date: 06/28/2025
ms.topic: quickstart
ms.service: azure-communication-services
ms.subservice: arm
zone_pivot_groups: acs-plat-azp-azcli-ps
ms.custom: mode-other, devx-track-azurecli, devx-track-azurepowershell
ms.devlang: azurecli 
---

# Subscribe to events


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


This article describes how to subscribe to events from Azure Communication Services through the portal, Azure CLI, PowerShell, and .NET SDK.

You can set up event subscriptions for Communication Services resources through the [Azure portal](https://portal.azure.com), Azure CLI, PowerShell, or with the Azure [Event Grid Management SDK](https://www.nuget.org/packages/Azure.ResourceManager.EventGrid/).

This article describes the process of setting up a webhook as a subscriber for SMS events from Azure Communication Services. For a full list of events, see [Azure Communication Services as an Azure Event Grid source](https://learn.microsoft.com/azure/event-grid/event-schema-communication-services).

**Applies to: platform-azp**


## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- An [Azure Communication Services resource](../create-communication-resource.md).
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



**Applies to: platform-azcli**


## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- Install [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli-windows?tabs=azure-cli).
- An [Azure Communication Services resource](../create-communication-resource.md).
- To receive events, create a Webhook. See [Webhook Event Delivery](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-grid/webhook-event-delivery.md).


## Register the Event Grid resource provider

This article describes how to register the Event Grid resource provider. If you used Event Grid before in the same subscription, skip to the next section.

1. Run the following command to register the provider:

    ```azurecli-interactive
    az provider register --namespace Microsoft.EventGrid
    ```
    
2. It might take a moment for the registration to finish. To check the status, run the following command:

    ```azurecli-interactive
    az provider show --namespace Microsoft.EventGrid --query "registrationState"
    ```
    
    When `registrationState` is `Registered`, you're ready to continue.


## Create event subscription

To create event subscriptions for Azure Communication Services resource, [sign in to Azure CLI](https://learn.microsoft.com/cli/azure/authenticate-azure-cli). You can sign in running the ```az login``` command from the terminal, then provide your credentials.

To create an event subscription using [the Azure CLI](https://learn.microsoft.com/cli/azure/get-started-with-azure-cli), use the [`az eventgrid event-subscription create`](https://learn.microsoft.com/cli/azure/eventgrid/event-subscription#az-eventgrid-event-subscription-create) command:

```azurecli-interactive
az eventgrid event-subscription create 
    --name EventsWebhookSubscription
    --source-resource-id /subscriptions/<subscriptionId>/resourceGroups/<resourceGroupName>/providers/Microsoft.Communication/CommunicationServices/<acsResourceName>
    --included-event-types Microsoft.Communication.SMSReceived Microsoft.Communication.SMSDeliveryReportReceived
    --endpoint-type webhook 
    --endpoint https://azureeventgridviewer.azurewebsites.net/api/updates  
```

For a list of Communication Services events, see [Communication Services Events](../../../event-grid/event-schema-communication-services.md).

## List event subscriptions

To list all the existing event subscriptions set up for an Azure Communication Services resource using [the Azure CLI](https://learn.microsoft.com/cli/azure/get-started-with-azure-cli), use the [`az eventgrid event-subscription list`](https://learn.microsoft.com/cli/azure/eventgrid/event-subscription#az-eventgrid-event-subscription-list) command. 

```azurecli-interactive
az eventgrid event-subscription list 
    --source-resource-id /subscriptions/<subscriptionId>/resourceGroups/<resourceGroupName>/providers/Microsoft.Communication/CommunicationServices/<acsResourceName>    
```

## Update event subscription

To update an existing event subscription using [the Azure CLI](https://learn.microsoft.com/cli/azure/get-started-with-azure-cli), use the [`az eventgrid event-subscription update`](https://learn.microsoft.com/cli/azure/eventgrid/event-subscription#az-eventgrid-event-subscription-update) command. 

```azurecli-interactive
az eventgrid event-subscription update 
    --name EventsWebhookSubscription
    --source-resource-id /subscriptions/<subscriptionId>/resourceGroups/<resourceGroupName>/providers/Microsoft.Communication/CommunicationServices/<acsResourceName>
    --included-event-types Microsoft.Communication.SMSReceived Microsoft.Communication.SMSDeliveryReportReceived Microsoft.Communication.ChatMessageReceived
    --endpoint-type webhook 
    --endpoint https://azureeventgridviewer.azurewebsites.net/api/updates
```

## Delete event subscription

To delete an existing event subscription using [the Azure CLI](https://learn.microsoft.com/cli/azure/get-started-with-azure-cli), use the [`az eventgrid event-subscription delete`](https://learn.microsoft.com/cli/azure/eventgrid/event-subscription#az-eventgrid-event-subscription-delete) command. 

```azurecli-interactive
az eventgrid event-subscription delete 
    --name EventsWebhookSubscription 
    --source-resource-id /subscriptions/<subscriptionId>/resourceGroups/<resourceGroupName>/providers/Microsoft.Communication/CommunicationServices/<acsResourceName>
```

## Next steps

- For information about other commands, see [Azure Event Grid CLI](https://learn.microsoft.com/cli/azure/eventgrid/event-subscription).



**Applies to: platform-powershell**


## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- Install the [Azure Az PowerShell Module](https://learn.microsoft.com/powershell/azure/).
- An [Azure Communication Services resource](../create-communication-resource.md).
- To receive events, create a Webhook. See [Webhook Event Delivery](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-grid/webhook-event-delivery.md).



## Register the Event Grid resource provider

This article describes how to register the Event Grid Resource Provider. If you used Event Grid before in the same subscription, skip to the next section.

1. Run the following command:

```PowerShell
Register-AzResourceProvider -ProviderNamespace Microsoft.EventGrid
```

2. It may take a moment for the registration to finish. To check the status, run:

```PowerShell
Get-AzResourceProvider -ProviderNamespace Microsoft.EventGrid
```

When `RegistrationStatus` is `Registered`, you're ready to continue.


## Create event subscription

First, install the Azure Communication Services module ```Az.EventGrid``` using the following command.

```PowerShell
PS C:\> Install-Module Az.EventGrid
```

1. Sign in to your Azure subscription with the [Connect-AzAccount](https://learn.microsoft.com/powershell/module/az.accounts/connect-azaccount) command and follow the on-screen directions.

  ```PowerShell
  Connect-AzAccount
  ```

2. If your identity is associated with more than one subscription, then set your active subscription to **subscription of the Web PubSub** resource that you want to move.

  ```PowerShell
  $context = Get-AzSubscription -SubscriptionId <subscription-id>
  Set-AzContext $context
  ```

To create an event subscription using the [Azure PowerShell](https://learn.microsoft.com/powershell/azure/get-started-azureps), use the [`New-AzEventGridSubscription`](https://learn.microsoft.com/powershell/module/az.eventgrid/new-azeventgridsubscription) command. 

```PowerShell
$includedEventTypes = "Microsoft.Communication.SMSReceived", "Microsoft.Communication.SMSDeliveryReportReceived"
New-AzEventGridSubscription 
    -EndpointType webhook
    -Endpoint https://azureeventgridviewer.azurewebsites.net/api/updates
    -EventSubscriptionName EventsWebhookSubscription 
    -IncludedEventType $includedEventTypes
    -ResourceId "/subscriptions/<subscriptionId>/resourceGroups/<resourceGroupName>/providers/Microsoft.Communication/CommunicationServices/<acsResourceName>"
```

For a list of Communication Services events, see [Communication Services Events](../../../event-grid/event-schema-communication-services.md).

## List event subscriptions

To list all the existing event subscriptions set up for an Azure Communication Services resource using the [Azure PowerShell](https://learn.microsoft.com/powershell/azure/get-started-azureps), use the [`Get-AzEventGridSubscription`](https://learn.microsoft.com/powershell/module/az.eventgrid/get-azeventgridsubscription) command. 

```PowerShell
Get-AzEventGridSubscription 
    -ResourceId "/subscriptions/<subscriptionId>/resourceGroups/<resourceGroupName>/providers/Microsoft.Communication/CommunicationServices/<acsResourceName>"
```

## Update event subscription

To update an existing event subscription using the [Azure PowerShell](https://learn.microsoft.com/powershell/azure/get-started-azureps), use the [`Update-AzEventGridSubscription `](https://learn.microsoft.com/powershell/module/az.eventgrid/update-azeventgridsubscription) command. 

```PowerShell
$includedEventTypes = "Microsoft.Communication.SMSReceived", "Microsoft.Communication.SMSDeliveryReportReceived", "Microsoft.Communication.ChatMessageReceived"
Update-AzEventGridSubscription 
    -EventSubscriptionName ES2 
    -IncludedEventType $includedEventTypes
    -ResourceId "/subscriptions/<subscriptionId>/resourceGroups/<resourceGroupName>/providers/Microsoft.Communication/CommunicationServices/<acsResourceName>" 
    -Endpoint https://azureeventgridviewer2.azurewebsites.net/api/updates
    -SubjectEndsWith "phoneNumber"
 
```

## Delete event subscription

To delete an existing event subscription using the [Azure PowerShell](https://learn.microsoft.com/powershell/azure/get-started-azureps), use the [`Remove-AzEventGridSubscription`](https://learn.microsoft.com/powershell/module/az.eventgrid/remove-azeventgridsubscription) command. 

```PowerShell
Get-AzResource 
    -ResourceId "/subscriptions/<subscriptionId>/resourceGroups/<resourceGroupName>/providers/Microsoft.Communication/CommunicationServices/<acsResourceName>" | Remove-AzEventGridSubscription -EventSubscriptionName ES2
```

## Next steps

- For information about other commands, see [Az.EventGrid PowerShell Module](https://learn.microsoft.com/powershell/module/az.eventgrid/new-azeventgridsubscription).
