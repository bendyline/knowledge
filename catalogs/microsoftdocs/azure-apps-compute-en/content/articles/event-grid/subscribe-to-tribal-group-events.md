---
title: Azure Event Grid - Subscribe to Tribal Group events
description: This article explains how to subscribe to events published by Tribal Group.
ms.topic: how-to
ms.date: 10/25/2022
---

# Subscribe to events published by Tribal Group
This article describes steps to subscribe to events published by [Tribal Group's Edge Education Platform](https://www.tribalgroup.com/solutions/cloud-and-data-services/tribal-cloud-services). 


## Prerequisites

Following are the prerequisites that your system needs to meet before attempting to configure your Tribal Group system to send events to Azure Event Grid.

- Azure subscription to use Azure Event Grid and Microsoft Power Automate.
- Admissions account with permissions to use the Edge Admin application.


## High-level steps

1. [Register the Event Grid resource provider](#register-the-event-grid-resource-provider) with your Azure subscription.
1. [Authorize partner](#authorize-partner-to-create-a-partner-topic) to create a partner topic in your resource group.
1. [Enable Tribal Group events to flow to a partner topic](#enable-events-to-flow-to-your-partner-topic).
4. [Activate partner topic](#activate-a-partner-topic) so that your events start flowing to your partner topic.
5. [Subscribe to events](#subscribe-to-events).

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/event-grid/register-provider.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-grid/subscribe-to-tribal-group-events.md)


## Authorize partner to create a partner topic

You must grant your consent to the partner to create partner topics in a resource group that you designate. This authorization has an expiration time. It's effective for the time period you specify between 1 to 365 days. 

> **Important:**
> For a greater security stance, specify the minimum expiration time that offers the partner enough time to configure your events to flow to Event Grid and to provision your partner topic. Your partner won't be able to create resources (partner topics) in your Azure subscription after the authorization expiration time. 

> **Note:**
> Event Grid started enforcing authorization checks to create partner topics around June 30th, 2022. 


1. Sign in to the [Azure portal](https://portal.azure.com).
1. In the search bar at the top, enter **Partner Configurations**, and select **Event Grid Partner Configurations** under **Services** in the results. 
1. On the **Event Grid Partner Configurations** page, select **Create Event Grid partner configuration** button on the page (or) select **+ Create** on the command bar. 

    Screenshot showing the Event Grid Partner Configurations page with the list of partner configurations and the link to create a partner registration.
1. On the **Create Partner Configuration** page, do the following steps: 
    1. In the **Project Details** section, select the **Azure subscription** and the **resource group** where you want to allow the partner to create a partner topic. 
    1. In the **Partner Authorizations** section, specify a default expiration time for partner authorizations defined in this configuration. 
    1. To provide your authorization for a partner to create partner topics in the specified resource group, select **+ Partner Authorization** link. 
    
        Screenshot showing the Create Partner Configuration page with the Partner Authorization link selected.
1. On the **Add partner authorization to create resources** page, you see a list of **verified partners**. A verified partner is a partner whose identity has been validated by Microsoft. Follow these steps to authorize **Auth0** to create a partner topic. 
    1. Select the **verified partner** (Auth0, SAP, Tribal Group, or Microsoft Graph API)  from the list of verified partners.
    1. Specify **authorization expiration time**.
    1. select **Add**. 

        Screenshot showing the page that allows you to grant a verified partner the authorization to create resources in your resource group.

        > **Important:**          
        > Your partner won't be able to create resources (partner topics) in your Azure subscription after the authorization expiration time.         
1. Back on the **Create Partner Configuration** page, verify that the partner is added to the partner authorization list at the bottom. 
1. Select **Review + create** at the bottom of the page. 
1. On the **Review** page, review all settings, and then select **Create** to create the partner registration. 





## Enable events to flow to your partner topic

Follow instructions from [How to set up event streams to Azure Event Grid](https://help.tribaledge.com/apac/edge/AppSystemAdmin/Tasks/how-to-setup-azure-events.htm) to set up Tribal Group event streams that are sent to your partner topic. Once you configure your event stream and it's active, you should have a partner topic created. 



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
        


## Next steps
See [subscribe to partner events](subscribe-to-partner-events.md).
