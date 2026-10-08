---
title: Azure Communication Services Insights dashboard
titleSuffix: An Azure Communication Services concept document
description: Descriptions of data visualizations available from the Insights dashboard.
author:  amagginetti
services: azure-communication-services

ms.author: amagginetti
ms.date: 03/08/2021
ms.topic: how-to
ms.service: azure-communication-services
ms.subservice: data
---

# Insights dashboard


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


This article describes insights available from the Insights dashboard. Use these insights to monitor logs and metrics.

## Overview

Each Communications Resource includes an Insights dashboard that displays data visualizations from the Azure Monitor logs and metrics monitored for your Communications Services. The visualizations within Insights are made possible via [Azure Monitor Workbooks](https://learn.microsoft.com/azure/azure-monitor/visualize/workbooks-overview). In order to take advantage of Workbooks, follow the instructions outlined in [Enable Azure Monitor in Diagnostic Settings](../enable-logging.md). To enable Workbooks, you need to send your logs to a [Log Analytics workspace](https://learn.microsoft.com/azure/azure-monitor/logs/log-analytics-overview) destination.

Screenshot of Communication Services Insights dashboard.

## Prerequisites

- In order to take advantage of Workbooks, follow the instructions outlined in [Enable Logging with Azure Monitor](../enable-logging.md). You need to enable `Operational Authentication Logs`, `Call Summary Logs`, `Call Diagnostic Logs`.
- To use Workbooks, you need to send your logs to a [Log Analytics workspace](https://learn.microsoft.com/azure/azure-monitor/logs/log-analytics-overview) destination. 

## Accessing Azure Insights for Communication Services

Inside your Azure Communication Services resource, scroll down on the left nav bar to the **Monitor** category and click on the **Insights** tab:

Screenshot of the Insights navigation blade.

## Authentication insights

The **Authentication** tab shows authentication logs, which are created through operations such as issuing an access token or creating an identity. The data displayed includes the types of operations performed and the results of those operations:

Screenshot of the authentication overview.

## More information about workbooks

For an in-depth description of workbooks, refer to the [Azure Monitor Workbooks](https://learn.microsoft.com/azure/azure-monitor/visualize/workbooks-overview) documentation.

## Editing dashboards

The **Insights** dashboards provided with your **Communication Service** resource can be customized by clicking on the **Edit** button on the top navigation bar:

Screenshot of dashboard editing process.

Editing these dashboards doesn't modify the **Insights** tab, but rather creates a separate workbook that can be accessed on your resource’s Workbooks tab:

Screenshot of the workbooks tab.

For an in-depth description of workbooks, refer to the [Azure Monitor Workbooks](https://learn.microsoft.com/azure/azure-monitor/visualize/workbooks-overview) documentation.
