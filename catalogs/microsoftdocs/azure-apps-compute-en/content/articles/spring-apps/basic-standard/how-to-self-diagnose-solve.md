---
title: "How to Self-Diagnose and Solve Problems in Azure Spring Apps"
description: Learn how to self-diagnose and solve problems in Azure Spring Apps.
author: KarlErickson
ms.author: karler
ms.service: azure-spring-apps
ms.topic: how-to
ms.date: 08/19/2025
ms.update-cycle: 1095-days
ms.custom: devx-track-java
---

# Self-diagnose and solve problems in Azure Spring Apps


> **Note:**
> The **Basic**, **Standard**, and **Enterprise** plans entered a retirement period on March 17, 2025. For more information, see the [Azure Spring Apps retirement announcement](retirement-announcement.md).


**This article applies to:** ✅ Java ✅ C#

**This article applies to:** ✅ Basic/Standard ✅ Enterprise

This article shows you how to use Azure Spring Apps diagnostics.

Azure Spring Apps diagnostics is an interactive experience to troubleshoot your app without configuration. Azure Spring Apps diagnostics identifies problems and guides you to information that helps troubleshoot and resolve issues.

## Prerequisites

To complete this exercise, you need:

* An Azure subscription. If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.
* A deployed Azure Spring Apps service instance. For more information, see [Quickstart: Deploy your first application to Azure Spring Apps](quickstart.md).
* At least one application already created in your service instance.

## Navigate to the diagnostics page

1. Sign in to the Azure portal.
2. Go to your Azure Spring Apps **Overview** page.
3. Select **Diagnose and solve problems** in the navigation pane.

   Screenshot of the Azure portal showing the Diagnose and Solve problems page.

## Search logged issues

To find an issue, you can either search by typing a keyword or select the solution group to explore all in that category.

Screenshot of the Azure portal showing the Diagnose and Solve problems page with text entered in the search bar.

Selection of **Config Server Health Check**, **Config Server Health Status**, or **Config Server Update History** displays various results.

> **Note:**
> Spring Cloud Config Server is not applicable to the Azure Spring Apps Enterprise plan.

Screenshot of the Azure portal showing the Availability and Performance page.

Find your target detector and select it to execute. A summary of diagnostics is shown after you execute the detector. Select **View details** to check diagnostic details.

Screenshot of the Azure portal showing the Availability and Performance page with View details highlighted for a detector.

You can change the diagnostic time range with the controller for **CPU Usage**. There can be a 15-minute delay for metrics and logs.

Screenshot of the Azure portal showing the Availability and Performance page with the CPU Usage time range selector highlighted.

Some results contain related documentation.

Screenshot of the Azure portal showing the Availability and Performance page with related diagnostic information.

## Next steps

* [Monitor Spring app resources using alerts and action groups](tutorial-alerts-action-groups.md)
* [Security controls for Azure Spring Apps Service](concept-security-controls.md)
