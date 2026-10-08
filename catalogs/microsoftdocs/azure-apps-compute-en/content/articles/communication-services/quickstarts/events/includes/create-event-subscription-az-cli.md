---
author: pgrandhi
ms.service: azure-communication-services
ms.custom: devx-track-azurecli
ms.topic: include
ms.date: 06/28/2024
ms.author: pgrandhi
---

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- Install [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli-windows?tabs=azure-cli).
- An [Azure Communication Services resource](../../create-communication-resource.md).
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

For a list of Communication Services events, see [Communication Services Events](../../../../event-grid/event-schema-communication-services.md).

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
