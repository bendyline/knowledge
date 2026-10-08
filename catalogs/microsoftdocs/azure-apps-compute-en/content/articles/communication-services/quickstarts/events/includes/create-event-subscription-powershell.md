---
author: pgrandhi
ms.service: azure-communication-services
ms.custom: devx-track-azurepowershell
ms.topic: include
ms.date: 06/28/2025
ms.author: pgrandhi
---

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- Install the [Azure Az PowerShell Module](https://learn.microsoft.com/powershell/azure/).
- An [Azure Communication Services resource](../../create-communication-resource.md).
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

For a list of Communication Services events, see [Communication Services Events](../../../../event-grid/event-schema-communication-services.md).

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
