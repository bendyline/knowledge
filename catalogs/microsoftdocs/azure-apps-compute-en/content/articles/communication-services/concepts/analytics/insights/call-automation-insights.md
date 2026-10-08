---
title: Azure Communication Services Call Automation Insights Preview
titleSuffix: An Azure Communication Services concept document
description: Descriptions of data visualizations available for Call Automation Communications Services via Workbooks
author:  mkhribech
services: azure-communication-services

ms.author: mkhribech
ms.date: 03/08/2021
ms.topic: how-to
ms.service: azure-communication-services
ms.subservice: data
---

# Call Automation Insights


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


In this document, we outline the available insights dashboard to monitor Call Automation logs and metrics.

## Overview
Within your Communications Resource, we've provided an **Insights Preview** feature that displays many  data visualizations conveying insights from the Azure Monitor logs and metrics monitored for your Communications Services. The visualizations within Insights are made possible via [Azure Monitor Workbooks](https://learn.microsoft.com/azure/azure-monitor/visualize/workbooks-overview). In order to take advantage of Workbooks, follow the instructions outlined in [Enable Azure Monitor in Diagnostic Settings](../enable-logging.md). To enable Workbooks, you need to send your logs to a [Log Analytics workspace](https://learn.microsoft.com/azure/azure-monitor/logs/log-analytics-overview) destination. 

Screenshot of Communication Services Insights dashboard.

## Prerequisites

- In order to take advantage of Workbooks, follow the instructions outlined in [Enable Azure Monitor in Diagnostic Settings](../enable-logging.md). You need to enable `Operational Call Automation Logs`.
- To use Workbooks, you need to send your logs to a [Log Analytics workspace](https://learn.microsoft.com/azure/azure-monitor/logs/log-analytics-overview) destination. 

## Accessing Azure Insights for Communication Services

Inside your Azure Communication Services resource, scroll down on the left nav bar to the **Monitor** category and click on the **Insights** tab:

Screenshot of the Insights navigation blade.

## Call Automation Insights

The **Call Automation** tab displays data about calls placed or answered using Call Automation SDK, like active call count, operations executed and errors encountered by your resource over time. You can also examine a particular call by looking at the sequence of operations taken on that call using the SDK:

Screenshot displays total call count, duration, and operation results details.


## More information about workbooks

For an in-depth description of workbooks, refer to the [Azure Monitor Workbooks](https://learn.microsoft.com/azure/azure-monitor/visualize/workbooks-overview) documentation.

## Editing dashboards

The **Insights** dashboards provided with your **Communication Service** resource can be customized by clicking on the **Edit** button on the top navigation bar:

Screenshot of dashboard editing process.

Editing these dashboards doesn't modify the **Insights** tab, but rather creates a separate workbook that can be accessed on your resource’s Workbooks tab:

Screenshot of the workbooks tab.

For an in-depth description of workbooks, refer to the [Azure Monitor Workbooks](https://learn.microsoft.com/azure/azure-monitor/visualize/workbooks-overview) documentation.
