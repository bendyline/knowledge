---
title: Create activity log alerts for labs
description: Learn how to create activity log alerts and configure alert rules for labs in Azure DevTest Labs.
ms.topic: how-to
ms.author: rosemalcolm
author: RoseHJM
ms.date: 04/30/2024
ms.custom: UpdateFrequency2

#customer intent: As a lab administrator, I want to create activity log alerts for labs in Azure DevTest Labs, so that I can respond to issues quickly.
---

# Create activity log alerts for labs in Azure DevTest Labs
This article explains how to create activity log alerts for labs in Azure DevTest Labs (for example: when a virtual machine is created or deleted).

## Create an alert

In this example, you create an alert for all administrative operations on a lab with an action that sends an email to subscription owners. 

1. Sign in to the [Azure portal](https://portal.azure.com).

1. In the Azure portal search bar, enter *Monitor*, and then select **Monitor** from the results list. 

    Screenshot of the Azure portal, showing a search for Monitor.

1. Select **Alerts** on the left menu, and then select **Create** > **Alert rule**. 

    Screenshot showing the Azure Monitor alerts page with Create Alert rule highlighted.

1. On the **Create alert rule** page, in **Select a resource**, from the **Resource types** list, select **DevTest Labs**. 

    Screenshot showing the Select a resource pane, with the Resource type set to DevTest Labs.

1. Expand your resource group, select your lab in the list, and then select **Apply**.

    Screenshot showing the Select a resource pane, with a lab selected.

1. Back on the **Create alert rule** page, select **Next: Condition**. 

1. On the **Condition** tab, select **See all signals**. 

    Screenshot of the Condition tab, with the See all signals link highlighted.

1. On the **Select a signal** pane, select **All Administrative operations**, and then select **Apply**. 

    Screenshot of the Select a signal pane, with All Administrative operations highlighted.

1. Select **Next: Actions**.

1. On the **Actions** tab, ensure **Use quick actions (preview)** is selected.
 
1. On the **Use quick actions (preview)** pane, enter or select the following information, and then select **Save**.
  
   | Name | Value |
   | --- | --- |
   | Action group name | Enter an action group name that is unique within the resource group |
   | Display name | Enter a display name to be shown as the action group name in email and SMS notifications. |
   | Email | Enter an email address to receive alerts. |
   | Email Azure Resource Manager Role | Select an Azure Resource Manager role to receive alerts. |
   | Azure mobile app notification | Get a push notification on the Azure mobile app. |
 
   Screenshot showing the Use quick actions (preview) pane.

1. On the **Create an alert rule** page, enter a name for the alert rule, and then select **Review + create**.

    Screenshot showing the Create an alert rule tab, with Alert rule name highlighted.
 
1. On the **Review + create** tab, review the settings, and then select **Create**.

    Screenshot showing the Review and create tab, with Create highlighted.


## View alerts 

1. You see alerts on the **Alerts** for all administrative operations (in this example). Alerts can take sometime to show up. 

    Screenshot showing the Alerts page with the full list of alerts.

1. To view all alerts of a specific severity, select the number in the relevant column (for example: **Warning**). 

    Screenshot showing the Alerts page with the Warning column heading highlighted.

1. To view the details of an alert, select the alert. 

    Screenshot showing the Alerts page with the full list of alerts and one alert name highlighted.
 
1. You see a details pane like the following screenshot: 

    Screenshot showing the alert details.

1. If you configured the alert to send an email notification, you  receive an email that contains a summary of the error and a link to view the alert. 

## Related content

- To learn more about creating action groups using different action types, see [Create and manage action groups in the Azure portal](https://learn.microsoft.com/azure/azure-monitor/alerts/action-groups).
- To learn more about activity logs, see  [Azure Activity Log](https://learn.microsoft.com/azure/azure-monitor/essentials/activity-log).
- To learn about setting alerts on activity logs, see [Alerts on activity log](https://learn.microsoft.com/azure/azure-monitor/alerts/activity-log-alerts).
