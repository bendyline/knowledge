---
title: System topics in Azure Event Grid
description: System topics in Azure Event Grid represent events published by Azure services such as Azure Storage and Azure Event Hubs. Explore their lifecycle, location, and management.
ms.topic: concept-article
ms.date: 06/11/2026
ai-usage: ai-assisted
---

# System topics in Azure Event Grid
A system topic in Event Grid represents one or more **events published by Azure services** such as Azure Storage and Azure Event Hubs. For example, a system topic can represent **all blob events** or only **blob created** and **blob deleted** events published for a **specific storage account**. In this example, when a blob is uploaded to the storage account, the Azure Storage service publishes a **blob created** event to the system topic in Event Grid, which then forwards the event to the topic's [subscribers](event-handlers.md) that receive and process the event. 

> **Note:** 
> Only Azure services can publish events to system topics. Therefore, you don't get an endpoint or access keys that you can use to publish events like you do for [custom topics](custom-topics.md) or [event domains](event-domains.md).

## Azure services that support system topics
The following Azure services support system topics.


- [Azure API Center](event-schema-api-center.md)
- [Azure API Management](event-schema-api-management.md)
- [Azure App Configuration](event-schema-app-configuration.md)
- [Azure App Service](event-schema-app-service.md)
- [Azure Blob Storage](event-schema-blob-storage.md)
- [Azure Cache for Redis](event-schema-azure-cache.md)
- [Azure Communication Services](event-schema-communication-services.md)
- [Azure Container Registry](event-schema-container-registry.md)
- [Azure Data Box](event-schema-data-box.md)
- [Azure Event Grid](event-schema-event-grid-namespace.md)
- [Azure Event Hubs](event-schema-event-hubs.md)
- [Azure Health Data Services](event-schema-azure-health-data-services.md)
- [Azure IoT Hub](event-schema-iot-hub.md)
- [Azure Key Vault](event-schema-key-vault.md)
- [Azure Kubernetes Service](event-schema-aks.md)
- [Azure Machine Learning](event-schema-machine-learning.md)
- [Azure Maintenance Configuration](event-schema-maintenance-configuration.md)
- [Azure Maps](event-schema-azure-maps.md)
- [Azure Media Services](event-schema-media-services.md)
- [Azure Policy](event-schema-policy.md)
- [Azure Resource Notifications](event-schema-resource-notifications.md)
- [Azure resource groups](event-schema-resource-groups.md)
- [Azure Service Bus](event-schema-service-bus.md)
- [Azure SignalR](event-schema-azure-signalr.md)
- [Azure Storage Actions](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-grid/event-schema-storage-actions.md)
- [Azure subscriptions](event-schema-subscriptions.md)



## System topics as Azure resources
System topics are visible as Azure resources and provide the following capabilities:

- [View system topics in the Azure portal](create-view-manage-system-topics.md#view-all-event-grid-system-topics)
- Export Resource Manager templates for system topics and event subscriptions in the Azure portal
- [Set up diagnostic logs for system topics](enable-diagnostic-logs-topic.md#enable-diagnostic-logs-for-event-grid-system-topics)
- [Set up alerts](set-alerts.md) on publish and delivery failures 

> **Note:**
> - Azure Event Grid allows only one system topic per source (such as a subscription or resource group).
> - A subscription-level system topic requires a resource group. You can't change the resource group until you delete the system topic or move it to another subscription.
> - Event Grid creates a system topic resource in the same Azure subscription that has the event source. For example, if you create a system topic for a storage account `ContosoStorage` in an Azure subscription `ContosoSubscription`, Event Grid creates the system topic in the `ContosoSubscription`. You can't create a system topic in an Azure subscription that's different from the event source's Azure subscription.

## Lifecycle of system topics
You can create a system topic in two ways: 

- Create an [event subscription on an Azure resource as an extension resource](https://learn.microsoft.com/rest/api/eventgrid/controlplane-preview/event-subscriptions/create-or-update), which automatically creates a system topic with the name in the format: `<Azure resource name>-<GUID>`. The system topic created in this way is automatically deleted when the last event subscription for the topic is deleted. 
- Create a system topic for an Azure resource, and then create an event subscription for that system topic. When you use this method, you can specify a name for the system topic. The system topic isn't deleted automatically when the last event subscription is deleted. You need to manually delete it. 

    When you use the Azure portal, you're always using this method. When you create an event subscription by using the [**Events** page of an Azure resource](blob-event-quickstart-portal.md#subscribe-to-the-blob-storage), the system topic is created first and then the subscription for the topic is created. You can explicitly create a system topic first by using the [**Event Grid System Topics** page](create-view-manage-system-topics.md#create-an-event-grid-system-topic) and then create a subscription for that topic. 

When you use [CLI](create-view-manage-system-topics-cli.md), [REST](https://learn.microsoft.com/rest/api/eventgrid/controlplane-preview/event-subscriptions/create-or-update), or [Azure Resource Manager template](create-view-manage-system-topics-arm.md), you can choose either of the above methods. 

> **Important:**
> Create a system topic first and then create a subscription on the topic. This approach is the recommended way of creating system topics.

### Failure to create system topics
System topic creation fails if Azure policies prevent the Event Grid service from creating it. For example, a policy might allow creation of only certain resource types (such as Azure Storage and Azure Event Hubs) in the subscription. 

In such cases, event flow functionality continues to work. However, you can't use metrics and diagnostic capabilities of system topics.

If you need this functionality, allow creation of resources of the system topic type, and create the missing system topic as described in the [Lifecycle of system topics](#lifecycle-of-system-topics) section.

## Location and resource group for a system topic
For Azure event sources in a specific region/location, Event Grid creates the system topic in the same location as the Azure event source. For example, if you create an event subscription for an Azure blob storage in East US, Event Grid creates the system topic in East US. For global Azure event sources such as Azure subscriptions, resource groups, or Azure Maps, Event Grid creates the system topic in the **global** location. 

In general, Event Grid creates the system topic in the same resource group as the Azure event source. For event subscriptions at Azure subscription scope, Event Grid creates the system topic in the **Default-EventGrid** resource group in the **West US 2** region. If the resource group doesn't exist, Azure Event Grid creates it before creating the system topic. 

## Related content

- [Create, view, and manage system topics by using Azure portal](create-view-manage-system-topics.md)
- [Create, view, and manage Event Grid system topics by using Azure CLI](create-view-manage-system-topics-cli.md)
- [Create Event Grid system topics by using Azure Resource Manager templates](create-view-manage-system-topics-arm.md)
