---
title: Tutorial - Monitor alerts and metrics in Resiliency
description: In this tutorial, learn how to monitor alerts and configure notifications for your resiliency estate using Resiliency in Azure.
ms.topic: tutorial
ms.date: 11/19/2025
ms.service: resiliency
ms.custom:
  - ignite-2023
  - ignite-2024
author: AbhishekMallick-MS
ms.author: v-mallicka
---

# Tutorials: Monitor alerts and metrics for your resiliency estate


This tutorial describes how Resiliency in Azure allows you to view alerts across Azure Backup and Azure Site Recovery. You can also configure notifications, view metrics, and take appropriate action. 



>**Important:**
>Azure Business Continuity Center is now Resiliency in Azure, a unified platform for Zone Resiliency, High Availability, Backup & Disaster Recovery, and Ransomware Protection that offers integrated experiences to ensure ongoing resilience of your applications. To try the zonal feature in Resiliency, fill out [this enrollment form](https://forms.office.com/pages/responsepage.aspx?id=v4j5cvGGr0GRqy180BHbR9NW9IkjD2RCnDQwsmIfABFUNU5MWUVaN1FWWDYxMFY1VTNBM1FPVDM3OC4u&route=shorturl).


## Monitor alerts

Resiliency in Azure allows you to monitor alerts that are raised for your critical events in your backup and disaster recovery events. You can view any built-in alerts fired by solutions, such as Azure Backup or Azure Site Recovery. Also, you can view alerts fired based on custom alert rules on metrics.


To monitor the alerts, follow these steps:

1. On **Resiliency**, go to **Monitoring + Reporting** > **Alerts**. 

   The count of all alert rules appears that have at least one or more fired alerts in the selected time range.

   Screenshot shows the triggered alerts in a selected time range.

2. On **Alerts**, filter the list by *severity of alert*, *category of alert*, *time range* (up to last 15 days), and other parameters.

   Screenshot shows how to filter alerts by severity.

3. The *Impacted Items count* in the grid shows the number of resources on which an alert corresponding to that alert rule was fired. To view the impacted items, select **View impacted items** in the context menu to view all alerts that were triggered due to that alert rule.

   You can then review each alert and take appropriate action. 

   Screenshot shows how to view impacted items.

## Configure notifications

To route alerts to the notification channels, create an alert processing rule and an action group. An alert processing rule is a rule that specifies which alerts should be routed to a particular notification channel, and the action group represents the notification channel.

>**Note:**
>Any action group supported by Azure Monitor (for example, email, webhooks, functions, logic apps, etc.) are supported for the backup and disaster recovery alerts also.

To configure email notifications for your alerts, follow these steps:

1. Go to **Resiliency** > **Monitoring + Reporting** > **Alerts** > **+ Create**, and then select **Create Alert Processing Rule**.

   Screenshot shows how to create alerts.

2. Under **Scope**, select *scope of the alert processing rule*, and then apply the rule for all resources in a subscription.

   You can make other customizations to the scope by applying filters. For example, generating notification for alert of a certain severity, generating notifications only for selected alert rules, etc.

3. On **Rule settings**, select **Apply action group** and **Create action group** (or use an existing one). Action group is the destination to which the notification for an alert should be sent. For example, an email address. 
 
4.	To create  an action group, on the **Basics** tab, select the *name of the action group*, the *subscription*, and the *resource group* under which it must be created. 
 
5. On the **Notifications** tab, select the *destination of the notification* as **Email**, **SMS Message**, or **Push/ Voice**, and then enter the *recipient's email ID* and other required details. 
 
6. Select **Review+Create** > **Create** to deploy the action group. The creation of the action group leads you back to the alert processing rule creation. The created action group appears in the Rule settings page. 

7. On the **Scheduling** tab, select **Always**. 
 
8. On the **Details** tab, specify the subscription, resource group, and the name of the alert processing rule being created. 
 
9. Add *Tags* if needed and select **Review + Create** > **Create**. The alert processing rule is active in a few minutes. 

## View metrics

You can use Resiliency in Azure to view built-in metrics for resiliency scenarios, and enable alerts based on these metric values. 

>**Note:**
>Currently, only metrics for Azure Backup are supported (Backup Health Events and Restore Health Events). [Learn more](../backup/metrics-overview.md) about the supported metrics and their definitions.

To view metrics, follow these steps:

1. Go to **Resiliency** > **Monitoring + Reporting** > **Metrics** to open the **Azure Monitor metrics explorer**.

   Screenshot shows how to view metrics.

2. On **Metrics**, select the *resources* for which you want to see metrics. For example, in Azure Backup scenarios, you have to choose a *vault* (or a *group of vaults* in a subscription and region). 
 
3. Select the *metric* you want to view, for example, *Backup Health events*.

4. Use the *filters* to further see the metric values at lower levels of granularity, for example, a particular protected item in the vault.
 
5. To create alert rules based on the value of the metric, select **New Alert Rule** at the top of the *metrics chart*, which leads you to the metric alert rules creation experience. [Learn more](../backup/backup-azure-monitor-alerts-notification.md#configure-alerts-and-notifications-on-your-metrics) about supported metric alert scenarios.
 
## Next steps

- [Configure datasources](tutorial-configure-protection-datasource.md).
- [Well-Architected Framework design recommendation for reliable monitoring and alerting strategy](https://learn.microsoft.com/azure/well-architected/reliability/monitoring-alerting-strategy#azure-facilitation).
