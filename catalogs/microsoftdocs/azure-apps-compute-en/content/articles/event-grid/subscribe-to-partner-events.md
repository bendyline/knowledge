---
title: Azure Event Grid - Subscribe to partner events 
description: Subscribe to events from partner systems like SaaS and ERP platforms by using Azure Event Grid partner topics.
ms.topic: how-to
ms.date: 06/11/2026
ai-usage: ai-assisted
# Customer intent: As a developer or an architect, I want to know how to subscribe to SAP events or events from other partners. 
---

# Subscribe to events published by a partner with Azure Event Grid
This article describes how to subscribe to events from a system owned or managed by a partner, such as SaaS or Enterprise Resource Planning (ERP) platforms.

> **Important:**
>If you aren't familiar with the **Partner Events** feature, see [Partner Events overview](partner-events-overview.md) to understand the rationale of the steps in this article.


## High-level steps

Follow these steps to receive events from a partner.

1. [Register the Event Grid resource provider](#register-the-event-grid-resource-provider) with your Azure subscription.
1. [Authorize partner](#authorize-partner-to-create-a-partner-topic) to create a partner topic in your resource group.
1. [Request partner to enable events flow to a partner topic](#request-partner-to-enable-events-flow-to-a-partner-topic).
1. [Activate partner topic](#activate-a-partner-topic) so that your events start flowing to your partner topic.
1. [Subscribe to events](#subscribe-to-events).

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/event-grid/register-provider.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-grid/subscribe-to-partner-events.md)


## Authorize partner to create a partner topic

You must grant your consent to the partner to create partner topics in a resource group that you designate. This authorization has an expiration time. It's effective for the time period you specify between 1 to 365 days. 

> **Important:**
> For a greater security stance, specify the minimum expiration time that offers the partner enough time to configure your events to flow to Event Grid and to create your partner topic. Your partner won't be able to create resources (partner topics) in your Azure subscription after the authorization expiration time. 

The following example shows how to create a partner configuration resource that contains the partner authorization. You identify the partner by providing either its **partner registration ID** or the **partner name**. You can get both from your partner, but only one is required. For your convenience, the following examples include a sample expiration time in UTC format.

### Azure portal

1. Sign in to the [Azure portal](https://portal.azure.com).
1. In the search bar at the top, enter **Partner Configurations**, and select **Event Grid Partner Configurations** under **Services** in the results. 
1. On the **Event Grid Partner Configurations** page, select **Create Event Grid partner configuration** button on the page (or) select **+ Create** on the command bar. 

    Screenshot showing the Event Grid Partner Configurations with the list of partner configurations and a link to create a partner registration.
1. On the **Create Partner Configuration** page, follow these steps: 
    1. In the **Project Details** section, select the **Azure subscription** and the **resource group** where you want to allow the partner to create a partner topic. 
    1. In the **Partner Authorizations** section, specify a default expiration time for partner authorizations defined in this configuration. 
    1. To authorize a partner to create partner topics in the specified resource group, select the **+ Partner Authorization** link. 
    
        Screenshot showing the Create Partner Configuration page with the Partner Authorization link selected.
        
1. On the **Add partner authorization to create resources** page, you see a list of **verified partners**. A verified partner is a partner whose identity Microsoft validated. Select a verified partner, and then select **Add** to give the partner the authorization to add a partner topic in your resource group. This authorization is effective up to the expiration time. 

    You also have an option to authorize a **non-verified partner.** Unless the partner is an entity that you know well, for example, an organization within your company, it's strongly encouraged that you work only with verified partners. If the partner isn't yet verified, encourage them to get verified by contacting the Event Grid team at askgrid@microsoft.com. 

    1. To authorize a **verified partner**:
        1. Select the partner from the list.
        1. Specify **authorization expiration time**.
        1. select **Add**. 
    
            Screenshot for granting a verified partner the authorization to create resources in your resource group.
    1. To authorize a nonverified partner, select **Authorize non-verified partner**, and follow these steps:
        1. Enter the **partner registration ID**. You need to ask your partner for this ID. 
        1. Specify authorization expiration time. 
        1. Select **Add**. 
        
            Screenshot for granting a nonverified partner the authorization to create resources in your resource group.

            > **Important:**          
            > Your partner won't be able to create resources (partner topics) in your Azure subscription after the authorization expiration time. 
1. Back on the **Create Partner Configuration** page, verify that the partner appears in the partner authorization list. 
1. Select **Review + create**. 

    Screenshot showing the Create Partner Configuration page with the partner authorization you just added.
1. On the **Review** page, review all settings, and then select **Create** to create the partner registration. 






## Request partner to enable events flow to a partner topic

The following partners support events flow to a partner topic. Select a partner to submit a request.

- [Auth0](auth0-how-to.md)
- [Microsoft Graph API](subscribe-to-graph-api-events.md)
- [Tribal Group](subscribe-to-tribal-group-events.md)



## Activate a partner topic

1. In the search bar of the Azure portal, search for and select **Event Grid Partner Topics**.
1. On the **Event Grid Partner Topics** page, select a partner topic  with **Activation State** set to **Never Activated**. 

    Screenshot that shows the selection of a partner topic on the Event Grid Partner Topics page.
1. Review the activate message, and select **Activate** on the page or on the command bar to activate the partner topic before the expiration time mentioned on the page. 

    Screenshot showing the selection of the Activate button on the command bar or on the page.
1. Confirm that the activation status is set to **Activated** and then create event subscriptions for the partner topic by selecting **+ Event Subscription** on the command bar. 

    Screenshot showing the activation state of a partner topic as \*\*Activated\*\*.



## Subscribe to events
First, create an event handler that handles events from the partner. For example, create an event hub, Service Bus queue or topic, or an Azure function. Then, create an event subscription for the partner topic by using the event handler you created. 

### Create an event handler
To test your partner topic, you need an event handler. Go to your Azure subscription and create a service that's supported as an [event handler](event-handlers.md) such as an [Azure Function](custom-event-to-function.md). For an example, see the [Event Grid Viewer sample](custom-event-quickstart-portal.md#create-a-message-endpoint) that you can use as an event handler through webhooks. 

### Subscribe to the partner topic
Subscribing to the partner topic tells Event Grid where you want your partner events to be delivered.

1. In the Azure portal, in the search box, enter **Event Grid Partner Topics**, and then select **Event Grid Partner Topics**. 
1. On the **Event Grid Partner Topics** page, select the partner topic in the list. 

    Screenshot showing the selection of a partner topic on the Event Grid Partner Topics page.
1. On the **Event Grid Partner Topic** page for the partner topic, select **+ Event Subscription** on the command bar. 

    Screenshot showing the selection of Add Event Subscription button on the Event Grid Partner Topic page.
1. On the **Create Event Subscription** page, do the following steps:
    1. Enter a **name** for the event subscription.
    1. For **Filter to Event Types**, select types of events that your subscription receives.
    1. For **Endpoint Type**, select an Azure service (Azure Function, Storage Queues, Event Hubs, Service Bus Queue, Service Bus Topic, or Hybrid Connections), or select webhook.
    1. Select the **Configure an endpoint** link. This example uses an Azure Event Hubs destination. 
    
        Screenshot showing the configuration of an endpoint for an event subscription.
    1. On the **Select Event Hub** page, select configurations for the endpoint, and then select **Confirm Selection**. 
    
        Screenshot showing the configuration of an Event Hubs endpoint.
    1. Now on the **Create Event Subscription** page, select **Create**. 
    
        Screenshot showing the Create Event Subscription page with example configurations.
        


## Related content
For more information about the Partner Events feature, see the following articles:

- [Partner Events overview for customers](partner-events-overview.md)
- [Partner Events overview for partners](partner-events-overview-for-partners.md)
- [Onboard as a partner](onboard-partner.md)
