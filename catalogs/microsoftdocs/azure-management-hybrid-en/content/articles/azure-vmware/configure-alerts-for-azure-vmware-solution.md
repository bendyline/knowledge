---
title: Configure alerts and work with metrics in Azure VMware Solution 
description: Learn how to use alerts to receive notifications. Also learn how to work with metrics to gain deeper insights into your Azure VMware Solution private cloud.
ms.topic: how-to
ms.custom: engagement-fy23
ms.service: azure-vmware
ms.date: 2/04/2026
# Customer intent: As an IT administrator managing an Azure VMware Solution, I want to configure alert rules and metrics monitoring, so that I can receive timely notifications of critical events and gain insights into the performance of my private cloud infrastructure.
---

# Configure Azure Alerts in Azure VMware Solution 

In this article, learn how to configure [Azure Action Groups](https://learn.microsoft.com/azure/azure-monitor/alerts/action-groups) in [Microsoft Azure Alerts](https://learn.microsoft.com/azure/azure-monitor/alerts/alerts-overview) to receive notifications of triggered events that you define. Also learn about using [Azure Monitor Metrics](https://learn.microsoft.com/azure/azure-monitor/essentials/data-platform-metrics) to gain deeper insights into your Azure VMware Solution private cloud.

>**Note:**
>For incidents that affect the availability of an Azure VMware Solution host and its corresponding restoration, the following actions occur. The incidents are sent automatically to the Account Administrator, Service Administrator (Classic Permission), Co-Admins (Classic Permission), and Owners (RBAC Role) of the subscriptions containing Azure VMware Solution private clouds.

## Supported metrics and activities

The following metrics are visible through Azure Monitor Metrics.

| **Signal name** | **Signal type** | **Monitor service** |
| --- | --- | --- |
| Datastore Disk Total Capacity | Metric | Platform |
| Percentage Datastore Disk Used | Metric | Platform |
| Percentage CPU | Metric | Platform |
| Average Effective Memory | Metric | Platform |
| Average Memory Overhead | Metric | Platform |
| Average Total Memory | Metric | Platform |
| Average Memory Usage | Metric | Platform |
| Datastore Disk Used | Metric | Platform |
| All Administrative operations | Activity Log | Administrative |
| Register Microsoft.AVS resource provider. (Microsoft.AVS/privateClouds) | Activity Log | Administrative |
| Create or update a PrivateCloud. (Microsoft.AVS/privateClouds) | Activity Log | Administrative |
| Delete a PrivateCloud. (Microsoft.AVS/privateClouds) | Activity Log | Administrative |

## Configure an alert rule
1. From your Azure VMware Solution private cloud, select **Monitoring** > **Alerts**, and then **New alert rule**.
 
   Screenshot that shows where to configure an alert rule in your Azure VMware Solution private cloud.

   A new configuration screen opens where you'll:
   - Define the Scope
   - Configure a Condition
   - Set up the Action Group
   - Define the Alert rule details
    
   Screenshot showing the Create alert rule window.

1. Under **Scope**, select the target resource you want to monitor. By default, the Azure VMware Solution private cloud from where you opened the Alerts menu is defined.

1. Under **Condition**, select **Add condition**, and in the window that opens, selects the signal you want to create for the alert rule. 

   In our example, we selected **Percentage Datastore Disk Used**, which is relevant from an [Azure VMware Solution SLA](https://azure.microsoft.com/support/legal/sla/azure-vmware/v1_1/) perspective. 

   Screenshot shows the Configured signal logic window with signals to create for the alert rule.

1. Define the logic that triggers the alert and then select **Done**. 

   In our example, only the **Threshold** and **Frequency of evaluation** were adjusted. 
   
   Screenshot showing the threshold, operator, aggregation type and granularity, threshold value, and frequency of evaluation for the signal alert logic.

1. Under **Actions**, select **Add action groups**. The action group defines *how* the notification is received and *who* receives it.   You can receive notifications by email, SMS, [Azure Mobile App Push Notification](https://azure.microsoft.com/features/azure-portal/mobile-app/) or voice message.

1. Select an existing action group or select **Create action group** to create a new one.
 
1. In the window that opens, on the **Basics** tab, give the action group a name and a display name.

1. Select the **Notifications** tab, select a **Notification Type** and **Name**. Then select **OK**.

   Our example is based on email notification.

   Screenshot showing email, SMS message, push, and voice settings for the alert.

1. (Optional) Configure the **Actions** if you want to take proactive actions and receive notification on the event. Select an available **Action type** and then select **Review + create**. 

   - **Automation Runbooks** - to automate tasks based on alerts

   - **Azure Functions** – for custom event-driven serverless code execution

   - **ITSM** – to integrate with a service provider like ServiceNow to create a ticket

   - **Logic App** - for more complex workflow orchestration

   - **Webhooks** - to trigger a process in another service


1. Under the **Alert rule details**, provide a name, description, resource group to store the alert rule, the severity. Then select **Create alert rule**.
   
   The alert rule is visible and can be managed from the Azure portal.

   Screenshot showing the new alert rule in the Rules window.

   As soon as a metric reaches the threshold as defined in an alert rule, the **Alerts** menu is updated and made visible.

   Screenshot showing the alert after reaching the threshold defined in the alert rule.

   Depending on the configured Action Group, you receive a notification through the configured medium. In our example, we configured email.
    
   Screenshot of an Azure Monitor Alert with the error string, and the date and time event was triggered.

## Work with metrics

1. From your Azure VMware Solution private cloud, select **Monitoring** > **Metrics**. Then select the metric you want from the drop-down.
    
   Screenshot showing the Metrics window and a focus on the Metric drop-down.

1. You can change the diagram's parameters, such as the **Time range** or the **Time granularity**. 

   Other options are:
   - **Drill into Logs** and query the data in the related Log Analytics workspace
   - **Pin this diagram** to an Azure Dashboard for convenience.

   Screenshot showing the time range and time granularity options for metric.
 
 
## Next steps

Now that you configured an alert rule for your Azure VMware Solution private cloud, you can learn more about:
- [Azure Monitor Metrics](https://learn.microsoft.com/azure/azure-monitor/essentials/data-platform-metrics)
- [Azure Monitor Alerts](https://learn.microsoft.com/azure/azure-monitor/alerts/alerts-overview)
- [Azure Action Groups](https://learn.microsoft.com/azure/azure-monitor/alerts/action-groups)

You can also continue with one of the other [Azure VMware Solution](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-vmware/index.yml) how-to guides.
