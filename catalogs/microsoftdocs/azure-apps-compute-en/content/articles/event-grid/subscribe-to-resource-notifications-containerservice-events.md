---
title: Subscribe to Azure Resource Notifications - ContainerService events
description: This article explains how to subscribe to events published by Azure Resource Notifications - ContainerService Events. 
ms.topic: how-to
ms.custom: devx-track-azurecli, devx-track-azurepowershell
ms.date: 11/14/2024
---

# Subscribe to events raised by Azure Resource Notifications - ContainerService Event Resources system topic (Preview)
This article explains the steps needed to subscribe to events published by Azure Resource Notifications - ContainerService Event Resources. For detailed information about these events, see [Azure Resource Notifications - ContainerService Event Resources](event-schema-containerservice-resources.md).

## Create Health Resources system topic

# [Azure CLI](#tab/azure-cli)

1. Set the account to the Azure subscription where you wish to create the system topic.

    ```azurecli-interactive
    az account set –s AZURESUBSCRIPTIONID
    ```
2. Create a system topic of type `microsoft.resourcenotifications.containerserviceeventresources` using the [`az eventgrid system-topic create`](https://learn.microsoft.com/cli/azure/eventgrid/system-topic#az-eventgrid-system-topic-create) command.

    ```azurecli-interactive
    az eventgrid system-topic create --name SYSTEMTOPICNAME --resource-group RESOURCEGROUPNAME --source /subscriptions/AZURESUBSCRIPTIONID --topic-type microsoft.resourcenotifications.containerserviceeventresources --location Global        
    ```
# [Azure PowerShell](#tab/azure-powershell)

1. Set the account to the Azure subscription where you wish to create the system topic. 

    ```azurepowershell-interactive
    Set-AzContext -Subscription AZURESUBSCRIPTIONID
    ```
2. Create a system topic of type `microsoft.resourcenotifications.containerserviceeventresources` using the [New-AzEventGridSystemTopic](https://learn.microsoft.com/powershell/module/az.eventgrid/new-azeventgridsystemtopic) command.

    ```azurepowershell-interactive
    New-AzEventGridSystemTopic -name SYSTEMTOPICNAME -resourcegroup RESOURCEGROUPNAME -source /subscriptions/AZURESUBSCRIPTIONID -topictype microsoft.resourcenotifications.containerserviceeventresources -location global    
    ```

# [Azure portal](#tab/azure-portal)

1. Sign into the [Azure portal](https://portal.azure.com).
1. In the search bar, type **Event Grid System Topics**, and select it from the drop-down list. 
1. On the **Event Grid system topics** page, select **+ Create** on the toolbar. 
1. On the **Create Event Grid System Topic** page, select **Azure Resource Notifications - ContainerService events** for **Topic type**.    

    Screenshot that shows the Create topic page in the Azure portal.
1. Select the **resource group** in which you want to create the system topic.
1. Enter a **name** for the system topic.
1. Select **Review + create** 

    Screenshot that shows the full Create topic page with details in the Azure portal.
1. On the **Review + create** page, select **Create**. 
1. On the successful deployment page, select **Go to resource** to navigate to the page for your system topic. You see the details about your system topic on this page. 

    Screenshot that shows the System topic page in the Azure portal.
    
---

## Subscribe to events

# [Azure CLI](#tab/azure-cli)
Create an event subscription for the above topic by using the [`az eventgrid system-topic event-subscription create`](https://learn.microsoft.com/cli/azure/eventgrid/system-topic/event-subscription#az-eventgrid-system-topic-event-subscription-create) command.

The following sample command creates an event subscription for the **ScheduledEventEmitted** event. 

```azurecli-interactive
az eventgrid system-topic event-subscription create --name EVENTSUBSCRIPTIONNAME --resource-group RESOURCEGROUPNAME --system-topic-name SYSTEMTOPICNAME –included-event-types Microsoft.ResourceNotifications.ContainerServiceEventResources.ScheduledEventEmitted --endpoint /subscriptions/AZURESUBSCRIPTIONID/resourceGroups/RESOURCEGROUPNAME/providers/Microsoft.EventHub/namespaces/MYEVENTHUBSNAMESPACE/eventhubs/MYEVENTHUB --endpoint-type eventhub        
```

If you don't specify `included-event-types`, all the event types are included by default. 

To **filter events** from a specific resource, use the `--subject-begins-with` parameter. The example shows how to subscribe to `ScheduledEventsEmitted` events for resources in a specified resource group. 

```azurecli-interactive
az eventgrid system-topic event-subscription create --name EVENTSUBSCRIPTIONNAME --resource-group RESOURCEGROUPNAME --system-topic-name SYSTEMTOPICNAME –included-event-types Microsoft.ResourceNotifications.ContainerServiceEventResources.ScheduledEventEmitted --endpoint /subscriptions/AZURESUBSCRIPTIONID/resourceGroups/RESOURCEGROUPNAME/providers/Microsoft.EventHub/namespaces/MYEVENTHUBSNAMESPACE/eventhubs/MYEVENTHUB --endpoint-type eventhub --subject-begins-with /subscriptions/AZURESUBSCRIPTIONID/resourceGroups/SOURCERESOURCEGROUP/  
```

# [Azure PowerShell](#tab/azure-powershell)

Create an event subscription for the above topic using the [New-AzEventGridSystemTopicEventSubscription](https://learn.microsoft.com/powershell/module/az.eventgrid/new-azeventgridsystemtopiceventsubscription) command. 

The following sample command creates an event subscription for the **ScheduledEventEmitted** event. 

```azurepowershell-interactive
New-AzEventGridSystemTopicEventSubscription -EventSubscriptionName EVENTSUBSCRIPTIONNAME -ResourceGroupName RESOURCEGROUPNAME -SystemtopicName SYSTEMTOPICNAME -IncludedEventType Microsoft.ResourceNotifications.ContainerServiceEventResources.ScheduledEventEmitted -Endpoint /subscriptions/AZURESUBSCRIPTIONID/resourceGroups/RESOURCEGROUPNAME/providers/Microsoft.EventHub/namespaces/EVENTHUBSNAMESPACE/eventhubs/EVENTHUB -EndpointType eventhub
```
If you don't specify `IncludedEventType`, all the event types are included by default.    

To **filter events** from a specific resource, use the `-SubjectBeginsWith` parameter. The example shows how to subscribe to `ScheduledEventEmitted` events from resources in a specified resource group. 

```azurepowershell-interactive
New-AzEventGridSystemTopicEventSubscription -EventSubscriptionName EVENTSUBSCRIPTIONNAME -ResourceGroupName RESOURCEGROUPNAME -SystemtopicName SYSTEMTOPICNAME -IncludedEventType Microsoft.ResourceNotifications.ContainerServiceEventResources.ScheduledEventEmitted -Endpoint /subscriptions/AZURESUBSCRIPTIONID/resourceGroups/RESOURCEGROUPNAME/providers/Microsoft.EventHub/namespaces/EVENTHUBSNAMESPACE/eventhubs/EVENTHUB -EndpointType eventhub -SubjectBeginsWith /subscriptions/AZURESUBSCRIPTIONID/resourceGroups/SOURCERESOURCEGROUP/
```

# [Azure portal](#tab/azure-portal)

1. On the **Event Grid System Topic** page, select **+ Event Subscription**  on the toolbar. 
1. Confirm that the **Topic Type**, **Source Resource**, and **Topic Name** are automatically populated. 
1. Enter a name for the event subscription. 
1. For **Filter to event types**, select the event, for example, **ScheduledEventEmitted**. 

    Screenshot that shows the Create Event Subscription page.
1. Select **endpoint type**. 
1. Configure event handler based on the endpoint type you selected. In the following example, an Azure event hub is selected. 

    Screenshot that shows the Create Event Subscription page with an event handler.
1. Select the **Filters** tab to provide subject filtering and advanced filtering. For example, to filter for events from resources in a specific resource group, follow these steps:
    1. Select **Enable subject filtering**. 
    1. In the **Subject Filters** section, for **Subject begins with**, provide the value of the resource group in this format: `/subscriptions/{subscription-id}/resourceGroups/{resourceGroup-id}`.

        Screenshot that shows the Filters tab of the Create Event Subscription page.
1. Then, select **Create** to create the event subscription.

---

## Delete event subscription and system topic

# [Azure CLI](#tab/azure-cli)

To delete the event subscription, use the [`az eventgrid system-topic event-subscription delete`](https://learn.microsoft.com/cli/azure/eventgrid/system-topic/event-subscription#az-eventgrid-system-topic-event-subscription-delete) command. Here's an example:

```azurecli-interactive
az eventgrid system-topic event-subscription delete --name EVENTSUBSCRIPTIONNAME --resourcegroup RESOURCEGROUPNAME --system-topic-name SYSTEMTOPICNAME
```

To delete the system topic, use the [`az eventgrid system-topic delete`](https://learn.microsoft.com/cli/azure/eventgrid/system-topic#az-eventgrid-system-topic-delete) command. Here's an example:

```azurecli-interactive
az eventgrid system-topic delete --name SYSTEMTOPICNAME --resource-group RESOURCEGROUPNAME
```

# [Azure PowerShell](#tab/azure-powershell)
To delete an event subscription, use the [`Remove-AzEventGridSystemTopicEventSubscription`](https://learn.microsoft.com/powershell/module/az.eventgrid/remove-azeventgridsystemtopiceventsubscription) command. Here's an example:

```azurepowershell-interactive
Remove-AzEventGridSystemTopicEventSubscription -EventSubscriptionName EVENTSUBSCRIPTIONNAME -ResourceGroupName RESOURCEGROUPNAME -SystemTopicName SYSTEMTOPICNAME
```

To delete the system topic, use the [`Remove-AzEventGridSystemTopic`](https://learn.microsoft.com/powershell/module/az.eventgrid/remove-azeventgridsystemtopic) command. Here's an example:

```azurepowershell-interactive
Remove-AzEventGridSystemTopic -ResourceGroupName RESOURCEGROUPNAME -Name SYSTEMTOPICNAME
```


# [Azure portal](#tab/azure-portal)

1. Sign in to the [Azure portal](https://portal.azure.com).
1. In the search bar, type **Event Grid System Topics**, and press ENTER.
1. Select the system topic.
1. On the **Event Grid System Topic** page, select **Delete**  on the toolbar. 

---

## Filtering examples

### Subscribe to Azure Kubernetes Cluster Scheduled Events by a Specific Cluster
You might want to filter the Azure Kubernetes Cluster Scheduled Events by a specific cluster on the subscriber end. This filtering helps ensure that you only receive notifications from clusters that are of interest to you.

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az eventgrid system-topic event-subscription create \
 --name EVENTSUBSCRIPTIONNAME \
 --resource-group RESOURCEGROUPNAME \
 --system-topic-name SYSTEMTOPICNAME \
 --included-event-types Microsoft.ResourceNotifications.ContainerServiceEventResources.ScheduledEventEmitted \
 --endpoint /subscriptions/000000000-0000-0000-0000-0000000000000/resourceGroups/RESOURCEGROUPNAME/providers/Microsoft.EventHub/namespaces/EVENTHUBNAMESPACE/eventhubs/EVENTHUBNAME \
 --endpoint-type evenhub \
 --advanced-filter data.resourceInfo.properties.resources StringContains clusterName

```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
New-AzEventGridSystemTopicEventSubscription -EventSubscriptionName EVENTSUBSCRIPTIONNAME
-ResourceGroupName RESOURCEGROUPNAME 
-SystemtopicName SYSTEMTOPICNAME 
-IncludedEventType Microsoft.ResourceNotifications.ContainerServiceEventResources.ScheduledEventEmitted  
-Endpoint /subscriptions/000000000-0000-0000-0000-000000000000/resourceGroups/RESOURCEGROUPNAME/providers/Microsoft.EventHub/namespaces/EVENTHUBNAMESPACE/eventhubs/EVENTHUBNAME 
-EndpointType eventhub 
-AdvancedFilter @(@{operator = "StringContains"; key = "data.resourceInfo.properties.resources" ; value ="clusterName"})

```

# [Azure portal](#tab/azure-portal)

1. Choose **ScheduledEventEmitted** as the event type. 
1. In the **Filters** tab of the event subscription, choose the following advanced filters.

    ```
    Key = data.resourceInfo.properties.resources
    Operator = String contains 
    Value = clusterName
    ```

---

### Subscribe to Azure Kubernetes Cluster Scheduled Events by "Completed" Event Status
You might want to filter the Azure Kubernetes Cluster Scheduled Events by a specific status, for example, "Completed" on the subscriber end. This filtering helps ensure that you only receive notifications from events that are of interest to you.

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az eventgrid system-topic event-subscription create \
 --name EVENTSUBSCRIPTIONNAME \
 --resource-group RESOURCEGROUPNAME \
 --system-topic-name SYSTEMTOPICNAME \
 --included-event-types Microsoft.ResourceNotifications.ContainerServiceEventResources.ScheduledEventEmitted \
 --endpoint /subscriptions/000000000-0000-0000-0000-0000000000000/resourceGroups/RESOURCEGROUPNAME/providers/Microsoft.EventHub/namespaces/EVENTHUBNAMESPACE/eventhubs/EVENTHUBNAME \
 --endpoint-type evenhub \
 --advanced-filter data.resourceInfo.properties.eventStatus StringContains Completed
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
New-AzEventGridSystemTopicEventSubscription -EventSubscriptionName EVENTSUBSCRIPTIONNAME
-ResourceGroupName RESOURCEGROUPNAME 
-SystemtopicName SYSTEMTOPICNAME 
-IncludedEventType Microsoft.ResourceNotifications.ContainerServiceEventResources.ScheduledEventEmitted  
-Endpoint /subscriptions/000000000-0000-0000-0000-000000000000/resourceGroups/RESOURCEGROUPNAME/providers/Microsoft.EventHub/namespaces/EVENTHUBNAMESPACE/eventhubs/EVENTHUBNAME 
-EndpointType eventhub 
-AdvancedFilter @(@{operator = "StringContains"; key = "data.resourceInfo.properties.eventStatus" ; value ="Completed"})

```

# [Azure portal](#tab/azure-portal)

In the **Filters** tab of the event subscription, choose the following advanced filters.

```
Key = data.resourceInfo.properties.eventStatus
Operator = String contains 
Value = Completed

```

---


## Contact us
If you have any questions or feedback on this feature, don't hesitate to reach us at this [stackoverflow link](https://stackoverflow.microsoft.com/posts/tagged/24358)

To better assist you with specific feedback about a certain event, provide the following information: 
 
### For missing events:

- System topic type name
- Approximate timestamp in UTC when the operation was executed
- Base resource ID for which the notification was generated
- Navigate to your resource in Azure portal and select JSON view at the far right corner. Resource ID is the first field on the JSON view page.
- Expected event type
- Operation executed (for example, VM  started or stopped, Storage account created etc.)
- Description of issue encountered (for example, VM started and no Microsoft.ResourceNotifications.HealthResources.AvailabilityStatusChanged event generated)
- If possible, provide the correlation ID of operation executed 

### For event that was delayed or has unexpected content

- System topic type name
- Entire contents of the notification excluding data.resourceInfo.properties
- Description of issue encountered and impacted field values

Ensure that you aren't providing any end user identifiable information while you're sharing this data. 

## Next steps
For detailed information about these events, see [Azure Resource Notifications - Container Service Events](event-schema-containerservice-resources.md).
