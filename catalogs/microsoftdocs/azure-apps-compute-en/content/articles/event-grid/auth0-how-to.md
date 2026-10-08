---
title: How to send events from Auth0 to Azure using Azure Event Grid
description: How to end events from Auth0 to Azure services with Azure Event Grid.
ms.topic: how-to
ms.date: 11/07/2022
---

# Integrate Azure Event Grid with Auth0
This article describes how to connect your Auth0 and Azure accounts by creating an Event Grid partner topic.

> **Note:**
> See the [Auth0 event type codes](https://auth0.com/docs/logs/references/log-event-type-codes) for a full list of the events that Auth0 supports

## Send events from Auth0 to Azure Event Grid
To send Auth0 events to Azure:

1. [Register the Event Grid resource provider](#register-the-event-grid-resource-provider) with your Azure subscription.
1. [Authorize partner](#authorize-partner-to-create-a-partner-topic) to create a partner topic in your resource group.
3. Request Auth0 to enable events flow to a partner topic by [setting up an Auth0 partner topic](#set-up-an-auth0-partner-topic) in the Auth0 Dashboard.
4. [Activate partner topic](#activate-a-partner-topic) so that your events start flowing to your partner topic.
5. [Subscribe to events](#subscribe-to-events).


[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/event-grid/register-provider.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-grid/auth0-how-to.md)


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




## Set up an Auth0 partner topic
Part of the integration process is to set up Auth0 for use as an event source by using the [Auth0 Dashboard](https://manage.auth0.com/).

1. Log in to the [Auth0 Dashboard](https://manage.auth0.com/).
1. Navigate to **Monitoring** > **Streams**.
1. Click **+ Create Log Stream**.
1. Select **Azure Event Grid** and enter a unique name for your new stream.
1. For **Subscription ID**, enter your Azure subscription ID. 
1. For **Azure Region**, select the Azure region in which the resource group exists. 
1. For **Resource Group**, enter the name of the resource group.
1. For **Filter by Event Category**, select **All** or filter for specific types of events.
1. Select **Use a specific day and time to start the stream from** option if you want the streaming to start on a specific day and time. 
1. Click **Save**.

You should see the partner topic in the resource group you specified. [Activate the partner topic](subscribe-to-partner-events.md#activate-a-partner-topic) so that your events start flowing to your partner topic. Then, [subscribe to events](subscribe-to-partner-events.md#subscribe-to-events).


Screenshot showing the partner topic in the list.
 

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
        


Try [invoking any of the Auth0 actions that trigger an event to be published](https://auth0.com/docs/logs/references/log-event-type-codes) to see events flow.

## Verify the integration
To verify that the integration is working as expected:

1. Log in to the Auth0 Dashboard.
1. Navigate to **Monitoring** > **Streams**.
1. Click on your **Event Grid stream**.
1. Once on the stream, click on the **Health** tab. The stream should be active and as long as you don't see any errors, the stream is working.

## Delivery attempts and retries
Auth0 events are delivered to Azure via a streaming mechanism. Each event is sent as it's triggered in Auth0. If Event Grid is unable to receive the event, Auth0 will retry up to three times to deliver the event. Otherwise, Auth0 will log the failure to deliver in its system.


## Next steps

- [Auth0 Partner Topic](auth0-overview.md)
- [Partner topics overview](partner-events-overview.md)
- [Become an Event Grid partner](onboard-partner.md)
