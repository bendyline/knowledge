---
title: View Azure Event Grid metrics and set alerts
description: This article describes how to use the Azure portal to view metrics for Azure Event Grid topics and subscriptions, and create alerts on them. 
ms.topic: how-to
ms.date: 03/17/2021
---

# Monitor Event Grid message delivery 
This article describes how to use the portal to see metrics for Event Grid topics and subscriptions, and create alerts on them. 

> **Important:**
> For a list of metrics supported Azure Event Grid, see [Metrics](https://learn.microsoft.com/azure/azure-monitor/essentials/metrics-supported#microsofteventgriddomains).

## View custom topic metrics

If you've published a custom topic, you can view the metrics for it. 

1. Sign in to [Azure portal](https://portal.azure.com/).
2. In the search bar at the topic, type **Event Grid Topics**, and then select **Event Grid Topics** from the drop-down list. 

    Search for and select Event Grid Topics
3. Select your custom topic from the list of topics. 

    Select your custom topic
4. View the metrics for the custom event topic on the **Event Grid Topic** page. In the following image, the **Essentials** section that shows the resource group, subscription etc. is minimized. 

    View event metrics

    You can create charts with supported metrics by using the **Metrics** tab of the **Event Grid Topic** page.

    Topic - Metrics page

    For example, see the metrics chart for the **Published Events** metric.

    Published events metric


## View subscription metrics
1. Navigate to the **Event Grid Topic** page by following steps from the previous section. 
2. Select the subscription from the bottom pane as shown in the following example. 

    Select event subscription

    You can also search for **Event Grid Subscriptions** in the search bar in the Azure portal, select **Topic Type**, **Subscription**, and **Location** to see an event subscription. 

    Select event subscription from Event Grid Subscriptions page

    For custom topics, select **Event Grid Topics** as **Topic Type**. For system topics, select the type of the Azure resource, for example, **Storage Accounts (Blob, GPv2)**. 
3. See the metrics for the subscription on the home page for the subscription in a chart. You can see **General**, **Error**, and **Latency** metrics for past 1 hour, 6 hours, 12 hours, 1 day, 7 days, or 30 days. 

    Metrics on the subscription home page

## View system topic metrics

1. Sign in to [Azure portal](https://portal.azure.com/).
2. In the search bar at the topic, type **Event Grid System Topics**, and then select **Event Grid System Topics** from the drop-down list. 

    Search for and select Event Grid System Topics
3. Select your system topic from the list of topics. 

    Select your system topic
4. View the metrics for the system topic on the **Event Grid System Topic** page. In the following image, the **Essentials** section that shows the resource group, subscription etc. is minimized. 

    View system topic metrics on the overview page

    You can create charts with supported metrics by using the **Metrics** tab of the **Event Grid Topic** page.

    System Topic - Metrics page

    > **Important:**
    > For a list of metrics supported Azure Event Grid, see [Metrics](https://learn.microsoft.com/azure/azure-monitor/essentials/metrics-supported#microsofteventgriddomains).

## Next steps
See the following articles:

- To learn how to create alerts on metrics and activity log operations, see [Set alerts](set-alerts.md).
- For information about event delivery and retries, [Event Grid message delivery and retry](delivery-and-retry.md).
