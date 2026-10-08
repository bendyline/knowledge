---
title: "Tutorial: Monitor Azure Spring Apps Resources Using Alerts and Action Groups"
description: Learn how to monitor Spring app resources using alerts and action groups in Azure Spring Apps.
author: KarlErickson
ms.author: karler
ms.service: azure-spring-apps
ms.topic: tutorial
ms.date: 08/19/2025
ms.update-cycle: 1095-days
ms.custom: devx-track-java
---

# Tutorial: Monitor Spring app resources using alerts and action groups


> **Note:**
> The **Basic**, **Standard**, and **Enterprise** plans entered a retirement period on March 17, 2025. For more information, see the [Azure Spring Apps retirement announcement](retirement-announcement.md).


**This article applies to:** ✅ Java ✅ C#

**This article applies to:** ✅ Basic/Standard ✅ Enterprise

This article describes how to monitor Spring app resources using alerts and action groups in Azure Spring Apps.

Azure Spring Apps alerts support monitoring resources based on conditions such as available storage, rate of requests, and data usage. An alert sends a notification when rates or conditions meet the defined specifications.

There are two steps to set up an alert pipeline:

1. Set up an action group.

   Action groups define actions to be taken when an alert is triggered, such as with an email, SMS, Runbook, or Webhook. You can use and reuse action groups among different alerts.

1. Set up alert rules.

   Rules bind metrics with action groups based on the target resource, condition, time aggregation, and other factors.

## Prerequisites

- An Azure subscription. If you don't have a subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.
- A deployed Azure Spring Apps instance. For more information, see [Quickstart: Deploy your first application to Azure Spring Apps](quickstart.md) to get started.

## Set up an action group

In the Azure portal, use the following steps:

1. Go to your Azure Spring Apps instance.
1. Select **Alerts** in the navigation pane, and then select **Action groups**.

   Screenshot of the Azure portal showing the Alerts page with the Action groups button highlighted.

1. On the **Action groups** page, select **Create**.

   Screenshot of the Azure portal showing the Action groups page with the Create button highlighted.

1. On the **Create action group** page on the **Basics** tab, make any needed changes in **Project details**. In **Instance details**, specify settings for **Action group name** and **Display name**.

   Screenshot of the Azure portal showing the Create action group page with the Basics tab selected.

1. Select the **Notifications** tab and then select a **Notification type** from the dropdown menu. This action opens a pane to define the action that is taken upon activation. This example shows an email and messaging type. Complete the form and select **OK**.

   Screenshot of the Azure portal showing the Create action group page on the Notifications tab with the pane open that defines the notification type.

1. Set **Name** to name the action group.

1. Select **Review + create** to finish creating the action group.

## Set up an alert

Use the following steps configure an alert:

1. Select **Alerts** in the navigation pane, and then select **Alert rules**.

   Screenshot of the Azure portal showing the Alerts page with the Alert rule button highlighted.

1. Select **Create**.

   Screenshot of the Azure portal showing the Alert rules page with the Create button highlighted.

1. On the **Create an alert rule** page on the **Condition**  tab, you must select a signal to trigger the alert rule. Select **See all signals**. On the **Select a signal** pane, select **CPU Usage** and then select **Apply**.

   Screenshot of the Azure portal showing the Create an Alert rule page with the select a signal pane open and App CPU Usage highlighted.

1. The signal selection determines the alert logic settings to configure. Set **Threshold value** to 75.

   Screenshot of the Azure portal showing the Create an Alert rule page with the alert logic setting for Threshold value highlighted.

   For details of the conditions available to monitor, see the [User metrics options](concept-metrics.md#user-metrics-options) section of [Metrics for Azure Spring Apps](concept-metrics.md).

1. Select the **Actions** tab and then select **Select action group**. On the **Select action groups** pane, select the action group that should be triggered by the rule such as the action group you defined previously.

   Screenshot of the Azure portal showing the Select an action group to attach to this alert rule pane with an Action group name highlighted.

1. Select **Select**.
1. Select the **Details** tab and set **Severity** and make any other needed changes.

   Screenshot of the Azure portal showing the Create rule page with Severity in Alert Details highlighted.

   > **Tip:**
   > Select the **Scope** tab to change the resource for the scope of the rule. By default the scope is current Azure Spring Apps instance.

1. Select **Review + create** to finish creating the alert rule.

1. On the **Alert rules** page, verify that the new alert rule is enabled.

   Screenshot of the Azure portal showing the Alert rules page with the rule that was just created enabled.

## Next steps

In this article, you learned how to set up alerts and action groups for an application in Azure Spring Apps. To learn more about action groups, see:

> 
> [Action groups](https://learn.microsoft.com/azure/azure-monitor/alerts/action-groups)
