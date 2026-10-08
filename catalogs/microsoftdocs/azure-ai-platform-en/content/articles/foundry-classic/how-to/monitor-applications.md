---
title: "Monitor your Generative AI Applications (classic)"
description: "This article provides instructions on how to continuously monitor Generative AI Applications. (classic)"
ms.service: microsoft-foundry
ms.subservice: foundry-observability
ms.topic: how-to
ms.date: 01/30/2026
ms.reviewer: amibp
ms.author: lagayhar  
author: lgayhardt
ai-usage: ai-assisted
---

# Monitor your generative AI applications (preview) (classic)


**Applies only to:**  **Foundry (classic) portal**. This article isn't available for the new Foundry portal. [Learn more about the new portal](../../foundry/what-is-foundry.md).


> **Note:**
> Links in this article might open content in the new Microsoft Foundry documentation instead of the Foundry (classic) documentation you're viewing now.




> **Important:**
> Items marked preview in this article are currently in preview. This preview is provided without a service-level agreement, and Microsoft doesn't recommend it for production workloads. Certain features might not be supported or might have constrained capabilities. For more information, see [Supplemental Terms of Use for Microsoft Azure Previews](https://azure.microsoft.com/support/legal/preview-supplemental-terms/).


Monitoring your generative AI applications is important because of the complexity and rapid evolution of the AI industry. By using observability integrated with Azure Monitor Application Insights, you can continuously monitor your deployed AI applications to ensure that they're performant, safe, and produce high-quality results in production. In addition to the continuous monitoring capabilities, the Foundry Observability dashboard also provides [continuous evaluation capabilities for Agents](continuous-evaluation-agents.md) with visibility into critical quality and safety metrics.


> **Note:**
> You must use a **Foundry project** for this feature. A **hub-based project** isn't supported. See [How do I know which type of project I have?](../what-is-foundry.md#how-do-i-know-which-type-of-project-i-have) and [Create a Foundry project](create-projects.md?pivots="fdp-project"). To migrate your hub-based project to a Foundry project, see [Migrate from hub-based to Foundry projects](migrate-project.md).


## How to enable monitoring

To use monitoring capabilities in Microsoft Foundry, connect an Application Insights resource to your Foundry project.

1. Navigate to **Monitoring** in the left navigation pane of the Foundry portal.
1. Select the **Application analytics** tab.
1. Create a new Application Insights resource if you don't already have one.
1. Connect the resource to your Foundry project.

### Collect production data for monitoring

Start collecting telemetry for your application that you can monitor in the built-in views. To do this, follow these recommendations:

- Instrument traces to capture detailed telemetry data from your application. This data provides insights into the performance, latency, and behavior of your application in production.

- Use [continuous evaluations](continuous-evaluation-agents.md) to help monitor the quality and safety of your agent in production by assessing its outputs against predefined metrics and thresholds.

## Viewing monitoring results

In Foundry portal, the **Application analytics** dashboard view uses signals from [Azure Monitor Application Insights](https://learn.microsoft.com/azure/azure-monitor/app/overview-dashboard), querying it through [Azure Workbooks](https://learn.microsoft.com/azure/azure-monitor/visualize/workbooks-overview) and creating visualizations.

These views bring key metrics - token consumption, latency, exceptions, response quality - into a single pane that provides transparency to teams. They help teams track operational health and quality, understand trends, and continuously assess to improve their application.

Follow these steps to access and utilize the built-in monitoring view in your Foundry Project:

1. Go to your Foundry Project in the Foundry portal.
1. Select **Monitoring** from the left navigation pane.
1. Under the **Application analytics** tab, review the overview of your application's health.
1. Use filters to specify a time range, application, and model to extract detailed insights.
1. If you notice problems, such as declining quality metrics, go to **Tracing** to [debug problems in your application](develop/trace-application.md).
1. To further customize your monitoring experience and use advanced capabilities in Azure Monitor, select **View in Azure Monitor Application Insights**.

> **Note:**
> When you share this workbook with your team members, they must have at least the **Reader** role to the connected Application Insights resource to view the displayed information.

## Customize and share your dashboard

Application Insights is a powerful tool for application performance monitoring (APM) that provides insights into the health and performance of your applications.

You can open the **Application analytics** dashboard in Azure Monitor Application Insights workbooks gallery by selecting the **View in Azure Monitor Application Insights** link at the end of the page.

This dashboard is opened as an editable workbook where you can customize the workbook and save according to your needs.

1. Select **Edit** in the command bar.
    Screenshot of the workbooks tab under monitoring highlighting the edit button in the Azure portal.

1. Modify elements as needed for your use case. Select **...** on an element to edit, add, move, resize, clone, or remove. For example, you can add a tile by using KQL to track a custom attribute you're collecting and that isn't shown in the built-in view.
    Screenshot of workbooks tab under monitoring highlighting modify element buttons in Azure portal.

1. Save your latest changes and create different views as needed by selecting **Save**.
    Screenshot of workbooks tab under monitoring highlighting the save button and tab in Azure portal.

1. Share by selecting the **Share** icon in the command bar.
    Screenshot of workbooks tab under monitoring highlighting share workbook button and tab in Azure portal.

## Explore and analyze with Kusto Query Language (KQL)

[KQL (Kusto Query Language)](https://learn.microsoft.com/kusto/query/) is a powerful query language you can use in Azure to explore, analyze, and visualize large volumes of telemetry and log data.

In the **Application analytics** dashboard view, you can **Open query link** by selecting the icon in the upper right for a particular tile or chart.

Screenshot of application analytics dashboard view highlighting the open query link button in Azure portal.

When you select that icon, you can view and run the same KQL queries that power your monitoring view. You can also deep dive into the related data.

Screenshot of logs highlighting KQL mode and results in Azure portal.&#x20;

## Set up Azure Alerts

You can define Azure Alert rules based on the previous KQL queries to proactively detect problems with your post-production operations. Select **...** to view more options like **New alert rule**.

Screenshot of logs highlighting new alert rule button in Azure portal.

Selecting the **New alert rule** button opens a wizard to create an alert rule on the related signal.

Screenshot of create an alert rule wizard in Azure portal.

To learn more about setting up and managing Azure Alerts to proactively address problems, see [Alerts in Azure Monitor](https://learn.microsoft.com/azure/azure-monitor/alerts/alerts-overview).

## Related content

- [Monitor model deployments](../foundry-models/how-to/monitor-models.md#metrics-explorer)
