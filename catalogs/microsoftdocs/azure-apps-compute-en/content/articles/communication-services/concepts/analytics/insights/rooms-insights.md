---
title: Azure Communication Services Rooms Insights Dashboard
titleSuffix: An Azure Communication Services concept document
description: Descriptions of data visualizations available for Rooms Communications Services via Workbooks
author:  shwali
services: azure-communication-services

ms.author: shwali
ms.date: 05/25/2023
ms.topic: how-to
ms.service: azure-communication-services
ms.subservice: data
---

# Rooms Insights


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


In this document, we outline the available insights dashboard to monitor Rooms logs and metrics.

## Overview
Within your Communications Resource, we've provided a **Rooms Insights** feature that displays many data visualizations conveying insights from the Azure Monitor logs and metrics monitored for Rooms. The visualizations within Insights are made possible via [Azure Monitor Workbooks](https://learn.microsoft.com/azure/azure-monitor/visualize/workbooks-overview). In order to take advantage of Workbooks, follow the instructions outlined in [Enable Azure Monitor in Diagnostic Settings](../enable-logging.md). To enable Workbooks, you need to send your logs to a [Log Analytics workspace](https://learn.microsoft.com/azure/azure-monitor/logs/log-analytics-overview) destination. 

Screenshot of Rooms Communication Services Insights dashboard.

## Prerequisites

- In order to take advantage of Workbooks, follow the instructions outlined in [Enable Azure Monitor in Diagnostic Settings](../enable-logging.md). You need to enable `Operational Rooms Logs`
- To use Workbooks, you need to send your logs to a [Log Analytics workspace](https://learn.microsoft.com/azure/azure-monitor/logs/log-analytics-overview) destination. 

## Accessing Rooms Insights for Communication Services

Inside your Azure Communication Services resource, scroll down on the left nav bar to the **Monitor** category and click on the **Insights** tab:

Screenshot of Rooms Communication Services Insights dashboard.

## Rooms insights

The **Rooms** tab displays Rooms API success Rate, Rooms API Volume by Operation Type/ Response Code, and Rooms Operation Drill-Down:

Screenshot displays Rooms API success Rate, Rooms API Volume by Operation Type/ Response Code.

Screenshot displays Rooms Operation Drill-Down.


## More information about workbooks

For an in-depth description of workbooks, refer to the [Azure Monitor Workbooks](https://learn.microsoft.com/azure/azure-monitor/visualize/workbooks-overview) documentation.

## Editing dashboards

The **Rooms Insights** dashboards provided with your **Communication Service** resource can be customized by clicking on the **Edit** button on the top navigation bar:

Screenshot of Rooms insights editing process.

Editing these dashboards doesn't modify the **Insights** tab, but rather creates a separate workbook that can be accessed on your resource�s Workbooks tab:

Screenshot of the workbooks tab.

For an in-depth description of workbooks, refer to the [Azure Monitor Workbooks](https://learn.microsoft.com/azure/azure-monitor/visualize/workbooks-overview) documentation.
