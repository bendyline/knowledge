---
title: 'Tutorial: Route MQTT messages to Event Hubs'
description: 'This tutorial shows how to use namespace topics to route MQTT messages to Azure Event Hubs. You use the Azure portal to do the tasks in this tutorial.'
ms.topic: tutorial
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 08/27/2026
author: george-guirguis
ms.author: geguirgu
ms.subservice: mqtt
#customer intent: As a developer working with the MQTT protocol, for instance, to support IoT, I want to route messages to Azure Event Hubs.
---

# Tutorial: Use namespace topics to route MQTT messages to Azure Event Hubs (Azure portal)

In this tutorial, you use a namespace topic to route data from MQTT clients to Azure Event Hubs. Routing your MQTT messages to Event Hubs lets you stream high volumes of device telemetry to downstream services for analysis, storage, and processing.

## Prerequisites

- If you don't have an Azure subscription, create an [Azure free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.
- If you're new to Event Grid, read the [Event Grid overview](overview.md) before you begin.
- Make sure that port **8883** is open in your firewall. The sample in this tutorial uses the MQTT protocol, which communicates over port 8883. This port might be blocked in some corporate and educational network environments.


## Create a namespace in the Azure portal

A *namespace* in Azure Event Grid is a logical container for one or more topics, clients, client groups, topic spaces, and permission bindings. With an Azure Event Grid namespace, you can group together related resources and manage them as a single unit in your Azure subscription. A unique namespace allows you to have multiple resources in the same Azure region. 

To create a namespace:

1. Sign in to the [Azure portal](https://portal.azure.com).
1. In the search box, enter **Event Grid Namespaces** and select **Event Grid Namespaces** from the results.

   Screenshot showing Event Grid Namespaces in the search results.

1. On the **Event Grid Namespaces** page, select **+ Create**.

   Screenshot showing Event Grid Namespaces page with the Create button on the toolbar selected.

1. On the **Basics** page, follow these steps.

    1. Select the Azure subscription in which to create the namespace.
    1. Select an existing **Resource group** or create a resource group.
    1. Enter a **Name** for the namespace.
    1. Select the **Location** for the namespace. 
    1. Select **Review + create**. 
    
       Screenshot showing the Basics tab of Create namespace page.

1. On the **Review + create** tab, review your settings. Then select **Create**.
1. On the **Deployment succeeded** page, select **Go to resource** to navigate to your namespace. 



## Create a namespace topic

1. If you aren't on the Event Grid Namespace page, follow the [create, view, and manage namespaces](create-view-manage-namespaces.md) steps to view the namespace you want to use to create the topic.
1. On the **Event Grid Namespace** page, under **Event broker**, select **Topics**.
1. On the **Topics** page, select **+ Topic**.

   Screenshot showing Event Grid namespace topic creation.

1. On the **Create Topic** page, type the name of the topic you want to create and select **Create**.

   Screenshot showing Event Grid namespace topic creation basics.



## Enable managed identity for the Event Grid namespace 

1. On the **Event Grid Namespace** page, under **Settings**, select **Identity**.
1. To enable a system assigned managed identity, select **On**.
1. Select **Save** to save the setting.

   Screenshot of a system-assigned identity page for an Event Grid namespace.

1. On the confirmation message, select **Yes**.
1. Confirm that you see the object ID of the system-assigned managed identity and see a link to assign roles.

   Screenshot that shows assigning identity to a namespace is completed.

   Check notifications in the Azure portal to confirm that the managed identity is enabled for the namespace.



## Enable MQTT broker for the Event Grid namespace 

1. On the **Event Grid Namespace** page, under **Settings**, select **Configuration**.
1. Select **Enable MQTT broker**. 
1. Select **Apply**.

   Screenshot showing Event Grid namespace configuration page to enable MQTT.

   Check notifications in the Azure portal to confirm that the MQTT broker is enabled for the namespace.


In a separate tab of the web browser or in a separate window, use the Azure portal to create an Event Hubs namespace with an event hub.


## Create an Event Hubs namespace

An Event Hubs namespace provides a unique scoping container in which you create event hubs. To create a namespace in your resource group using the portal:

1. In the Azure portal, from the flyout menu, select **All services**. In the **All services** page, search for and select **Event Hubs**.

   Screenshot showing the selection of Event Hubs in the All services page.

1. In the **Event Hubs** page, select **Create**.

   Screenshot showing the selection of Create button on the Event hubs page.

1. On the **Create namespace** page, take the following steps:

   1. Select the **Subscription** in which you want to create the namespace.
   1. Select the **Resource group** you created in the previous step.
   1. Enter a name for the namespace. The system immediately checks to see if the name is available.
   1. Select a **Region** for the namespace.
   1. For the pricing tier, choose **Basic**.
   
      > **Note:**
      > If you plan to use the namespace from **Apache Kafka** apps, use the **Standard** tier. The basic tier doesn't support Apache Kafka workloads. To learn about differences between tiers, see [Quotas and limits](../event-hubs/event-hubs-quotas.md), [Event Hubs Premium](../event-hubs/event-hubs-premium-overview.md), and [Event Hubs Dedicated](../event-hubs/event-hubs-dedicated-overview.md) articles. 

   1. Leave the **throughput units** (for standard tier) or **processing units** (for premium tier) setting as it is. To learn about throughput units or processing units, see [Event Hubs scalability](../event-hubs/event-hubs-scalability.md).
   1. Select **Review + Create**.

      Screenshot of the Create Namespace page in the Azure portal.

   1. On the **Review + Create** page, review the settings, and select **Create**. Wait for the deployment to complete.

1. On the **Deployment** page, select **Go to resource** to navigate to the page for your namespace. 

   Screenshot of the Deployment complete page with the link to resource.

1. Confirm that you see the **Event Hubs Namespace** page similar to the following example:

   Screenshot of the home page for your Event Hubs namespace in the Azure portal.



## Create an event hub

To create an event hub within the namespace, do the following actions:

1. On the **Overview** page, select **+ Event Hub**.

   Screenshot of the selection of Add event hub button on the command bar.

1. Type a name for your event hub, then select **Review + create**.

   Screenshot of the Create event hub page.

1. On the **Review + create** page, select **Create**. 
1. You can check the status of the event hub creation in alerts. After the event hub is created, you see it in the list of event hubs.

   Screenshot showing the list of event hubs.


## Give the Event Grid namespace access to send events to the event hub

1. On the **Event Hubs Namespace** page, select **Access control (IAM)**.
1. On the **Access control** page, select **+ Add**, and then select **Add role assignment**.

   Screenshot that shows the Access control page for the Event Hubs namespace.

1. On the **Add role assignment** page, from the list of roles, select **Azure Event Hubs Data Sender**, and then select **Next**.

   Screenshot that shows the Add role assignment page with Azure Event Hubs Data Sender selected.

1. On the **Members** page, follow these steps:

   1. For the **Assign access to** field, select **Managed identity**.
   1. Select **+ Select members**.

      Screenshot that shows the Add role assignment page with Managed identity selected.

1. On the **Select managed identities** page, follow these steps:

    1. Select your Azure subscription.
    1. For **Managed identity**, select **Event Grid Namespace**.
    1. Select the managed identity that has the same name as the Event Grid namespace.
    1. Select **Select**.

       Screenshot that shows the Select managed identities page with the Event Grid namespace's managed identity selected.

1. On the **Add role assignment** page, select **Review + assign**.
1. On the **Review + assign** page, select **Review + assign**.

## Create an event subscription with Event Hubs as the endpoint

1. Switch to the tab of your web browser window that has the Event Grid namespace open.
1. On the **Event Grid Namespace** page, select **Topics**.
1. On the **Topics** page, select the namespace topic you created earlier.

   Screenshot that shows the Topics page with the namespace topic selected.

1. On the **Event Grid Namespace Topic** page, select **+ Subscription**.

   Screenshot that shows the Subscriptions page.

1. On the **Create Subscription** page, follow these steps:

    1. Enter a **Name** for the event subscription.
    1. For **Delivery mode**, select **Push**.
    1. Confirm that **Endpoint type** is set to **Event Hub**.
    1. Select **Configure an endpoint**.

       Screenshot that shows the Create Subscription page.

    1. On the **Select Event Hub** page, follow these steps:

        1. Select the Azure subscription that has the event hub.
        1. Select the **Resource Group** that has the event hub.
        1. Select the **Event Hubs Namespace**.
        1. Select the **Event Hub** in the Event Hubs namespace.
        1. Select **Confirm selection**.

           Screenshot that shows the Select event hub page.

    1. Back on the **Create Subscription** page, select **System Assigned** for **Managed identity type**.
    1. Select **Create**.

       Screenshot that shows the Create Subscription page with Create button selected.

## Configure routing in the Event Grid namespace

1. Go back to the **Event Grid Namespace** page by selecting the namespace in the **Essentials** section of the **Event Grid Namespace Topic** page or by selecting the namespace name in the breadcrumb menu at the top.
1. On the **Event Grid Namespace** page, under **MQTT broker**, select **Routing**.
1. On the **Routing** page, select **Enable routing**.
1. For **Topic type**, select **Namespace topic**.
1. For **Topic**, select the Event Grid namespace topic that you created where Event Grid routes all MQTT messages.
1. Select **Apply**.

   Screenshot that shows the Routing page with the namespace topic selected.

   Check notifications to confirm that Event Grid enabled routing for the namespace.

## Create clients, topic space, and permission bindings

Follow the steps in this quickstart: [Publish and subscribe on an MQTT topic](mqtt-publish-and-subscribe-portal.md) to:

1. Create a client. Optionally, create a second client.
1. Create a topic space.
1. Create publisher and subscriber permission bindings.
1. Use MQTTX to send a few messages.
1. Verify that the event hub received those messages on the **Overview** page for your Event Hubs namespace.

   Screenshot that shows the Overview page of the event hub with incoming message count.

## View routed MQTT messages in Event Hubs by using a Stream Analytics query

In the Azure portal, go to the Event Hubs instance (event hub) in your event subscription. Use Stream Analytics to process data from your event hub. For more information, see [Process data from your event hub using Azure Stream Analytics](../event-hubs/process-data-azure-stream-analytics.md). The MQTT messages appear in the query.

Screenshot that shows the MQTT messages data in Event Hubs by using the Stream Analytics query tool.

## Next step

For code samples, go to the [MqttApplicationSamples GitHub repository](https://github.com/Azure-Samples/MqttApplicationSamples/tree/main).
