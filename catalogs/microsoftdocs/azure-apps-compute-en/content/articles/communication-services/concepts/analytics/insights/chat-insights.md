---
title: Chat insights
titleSuffix: An Azure Communication Services article
description: Descriptions of data visualizations available for Chat Communications Services via Workbooks
author:  mkhribech
services: azure-communication-services

ms.author: mkhribech
ms.date: 03/08/2021
ms.topic: concept-article
ms.service: azure-communication-services
ms.subservice: data
---

# Chat insights


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


This article describes the insights dashboard you can view to monitor Chat logs and metrics.

Within your Communications Resource, we provide an **Insights Preview** feature that displays many data visualizations conveying insights from the Azure Monitor logs and metrics monitored for your Communications Services.

The visualizations within Insights are made possible via [Azure Monitor Workbooks](https://learn.microsoft.com/azure/azure-monitor/visualize/workbooks-overview). In order to take advantage of Workbooks, follow the instructions outlined in [Enable Azure Monitor in Diagnostic Settings](../enable-logging.md). To enable Workbooks, you need to send your logs to a [Log Analytics workspace](https://learn.microsoft.com/azure/azure-monitor/logs/log-analytics-overview) destination. 

Screenshot of Communication Services Insights dashboard.

## Prerequisites

- To use Workbooks, follow the instructions in [Enable Azure Monitor in Diagnostic Settings](../enable-logging.md). You need to enable `Operational Chat Logs` and `Operational Authentication Logs`.
- To use Workbooks, you need to send your logs to a [Log Analytics workspace](https://learn.microsoft.com/azure/azure-monitor/logs/log-analytics-overview) destination. 

## Accessing Azure Insights for Communication Services

Inside your Azure Communication Services resource, scroll down on the left nav bar to the **Monitor** category and click the **Insights** tab:

Screenshot of the Insights navigation blade.

## Authentication insights tab

The **Authentication** tab shows authentication logs, which are created through operations such as issuing an access token or creating an identity. The data displayed includes the types of operations performed and the results of those operations:

Screenshot that shows the authentication tab.

## Chat insights tab

The **Chat** tab displays the data for all chat-related operations and their result types:

Screenshot that shows the chat tab.

## More information about workbooks

For an in-depth description of workbooks, refer to the [Azure Monitor Workbooks](https://learn.microsoft.com/azure/azure-monitor/visualize/workbooks-overview) documentation.

## Editing dashboards

The **Insights** dashboards provided with your **Communication Service** resource can be customized by clicking on the **Edit** button on the top navigation bar:

Screenshot of dashboard editing process.

Editing these dashboards doesn't modify the **Insights** tab, but rather creates a separate workbook that can be accessed on your resource’s Workbooks tab:

Screenshot of the workbooks tab.

For an in-depth description of workbooks, refer to the [Azure Monitor Workbooks](https://learn.microsoft.com/azure/azure-monitor/visualize/workbooks-overview) documentation.
