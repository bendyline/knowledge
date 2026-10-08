---
title: "Check my usage and estimate the cost -  Document Intelligence "
titleSuffix: Foundry Tools
description: Learn how to use Azure portal to check how many pages are analyzed and estimate the total price.
author: laujan
manager: mcleans
ms.service: azure-document-intelligence-foundry-tools
ms.topic: how-to
ms.date: 05/21/2026
ms.author: luzhan
---


# Check usage and estimate cost

**Applies to: <=doc-intel-4.0.0**
 
**This content applies to:** 🟩 **v4.0 (GA)** 🟩  **v3.1 (GA)** 🟥 **v3.0 (retiring)** 🟥 **v2.1 (retiring)**



In this guide, learn how to use the metrics dashboard in the Azure portal to view how many pages are processed. You also learn how to estimate the cost of processing those pages using the Azure pricing calculator.

## Check how many pages were processed

We start by looking at the page processing data for a given time period:

1. Sign in to the [Azure portal](https://portal.azure.com).

1. Navigate to your Document Intelligence resource.

1. From the **Overview** page, select the **Monitoring** tab located near the middle of the page.

   Screenshot of the Azure portal overview page menu.

1. Select a time range and you see the **Processed Pages** chart displayed.

    Screenshot that shows how many pages are processed on the resource overview page.

### Examine analyzed pages

We can now take a deeper dive to see each model's analyzed pages:

1. Under the **Monitoring** section, select **Metrics** from the left pane.

   Screenshot of the monitoring menu in the Azure portal.

1. On the **Metrics** page, select **Add metric**.

1. Select the Metric dropdown menu and, under **USAGE**, choose **Processed Pages**.

    Screenshot that shows how to add new metrics on Azure portal.

1. From the upper right corner, configure the time range and select the **Apply** button.

    Screenshot of time period options for metrics in the Azure portal.

1. Select **Apply splitting**.

    Screenshot of apply splitting option in the Azure portal.

1. Choose **FeatureName** from the **Values** dropdown menu.

    Screenshot of apply splitting values dropdown menu.

1. You see a breakdown of the pages analyzed by each model.

    Screenshot demonstrating how to drill down to check analyzed pages by model.

## Estimate price

Now that we have the page processed data from the portal, we can use the Azure pricing calculator to estimate the cost:

1. Sign in to [Azure pricing calculator](https://azure.microsoft.com/pricing/calculator/) with the same credentials you use for the Azure portal.

    > Press Ctrl + right-click to open in a new tab!

1. Search for **Azure Document Intelligence in Foundry Tools** in the **Search products** search box.

1. Select **Azure Document Intelligence** and you see it was added to the page.

1. Under **Your Estimate**, select the relevant **Region**, **Payment Option**, and **Instance** for your Document Intelligence resource. For more information, *see* [Azure Document Intelligence pricing options](https://azure.microsoft.com/pricing/details/form-recognizer/#pricing).

1. Enter the number of pages processed from the Azure portal metrics dashboard. That data can be found using the steps in sections [Check how many pages are processed](#check-how-many-pages-were-processed) or [Examine analyzed pages](#examine-analyzed-pages).

1. The estimated price is on the right page section, after the equal (**=**) sign.

    Screenshot of how to estimate the price based on processed pages.

That's it. You now know where to find how many pages you process using Document Intelligence and how to estimate the cost.

## Next steps

> 
>
> [Learn more about Document Intelligence service quotas and limits](../service-limits.md)
