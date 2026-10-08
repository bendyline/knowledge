---
title: Calculate Enterprise Agreement (EA) savings plan cost savings
titleSuffix: Microsoft Cost Management
description: Learn how Enterprise Agreement users manually calculate their savings plan savings.
author: nwokolo
ms.reviewer: onwokolo
ms.service: cost-management-billing
ms.subservice: savings-plan
ms.topic: how-to
ms.date: 03/14/2026
ms.author: onwokolo
---

# Calculate EA savings plan cost savings

This article helps Enterprise Agreement (EA) users manually calculate their savings plan savings. In this article, you download your amortized usage and charges file, prepare an Excel worksheet, and then do some calculations to determine your savings. There are several steps involved and we walk you through the process. Although the example process shown in this article uses Excel, you can use the spreadsheet application of your choice.

> **Note:**
> The prices shown in this article are for example purposes only.

This article is specific to EA users. 

However, Microsoft Customer Agreement (MCA) users can use similar steps to calculate their savings plan savings through invoices. The MCA amortized usage file doesn't contain UnitPrice (on-demand pricing) for savings plans. You can get unit prices from your [MCA price sheet](download-savings-plan-price-sheet.md#download-mca-price-sheet).

## Required permissions

To view and download usage data as an EA customer, you must be an Enterprise Administrator, Account Owner, or Department Admin with the view charges policy enabled.

## Download all usage amortized charges

1. Sign in to the [Azure portal](https://portal.azure.com/).
2. Search for _Cost Management + Billing_.  
    Screenshot showing search for cost management.
3. If you have access to multiple billing accounts, select the billing scope for your EA billing account.
4. Select **Usage + charges**.
5. For the month you want to download, select **Download**.  
    Screenshot showing Usage + charges download.
6. On the Download Usage + Charges page, under Usage Details, select **Amortized charges (usage and purchases)**.  
    Screenshot showing the Download usage + charges window.
7. Select **Prepare document**.
8. It could take a while for Azure to prepare your download, depending on your monthly usage. When it's ready for download, select **Download csv**.

## Prepare data and calculate savings

Because Azure usage files are in CSV format, you need to prepare the data for use in Excel. Then you calculate your savings.

1. Open the amortized cost file in Excel and save it as an Excel workbook.
2. The data resembles the following example.  
    Example screenshot of the unformatted amortized usage file.
3. In the Home ribbon, select **Format as Table**.
4. In the Create Table window, select **My table has headers**.
5. In the **benefitName** column, set a filter to clear **Blanks**.  
    Screenshot showing clear Blanks data.
6. Find the **ChargeType** column and then to the right of the column name, select the sort and filter symbol (the down arrow).
7. For the **ChargeType** column, set a filter on it to select only **Usage**. Clear any other selections.  
    Screenshot showing ChargeType selection.
8. To the right of **UnitPrice**, insert a column and label it with a title like **TotalUsedSavings**.
9. In the first cell under **TotalUsedSavings**, create a formula that calculates _(UnitPrice – EffectivePrice) \* Quantity_.  
    Screenshot showing the TotalUsedSavings formula.
10. Copy the formula to all the other empty **TotalUsedSavings** cells.
11. At the bottom of the **TotalUsedSavings** column, sum the column's values.  
    Screenshot showing the summed values.
12. Somewhere under your data, create a cell named _TotalUsedSavingsValue_. Next to it, copy the **TotalUsed** cell and paste it as **Values**. This step is important because the next step will change the applied filter and affect the summed total.  
    Screenshot showing pasting the TotalUsedSavings cell as Values.
13. For the **ChargeType** column, set a filter on it to select only **UnusedSavingsPlan**. Clear any other selections.
14. To the right of the **TotalUsedSavings** column, insert a column and label it with a title like **TotalUnused**.
15. In the first cell under **TotalUnused**, create a formula that calculates _EffectivePrice \* Quantity_.  
    Screenshot showing the TotalUnused formula.
16. At the bottom of the **TotalUnused** column, sum the column's values.
17. Somewhere under your data, create a cell named _TotalUnusedValue_. Next to it, copy the **TotalUnused** cell and paste it as **Values**.
18. Under the **TotalUsedSavingsValue** and **TotalUnusedValue** cells, create a cell named _SavingsPlanSavings_. Next to it, subtract **TotalUnusedValue** from **TotalUsedSavingsValue**. The calculation result is your savings plan savings.  
    Screenshot showing the SavingsPlanSavings calculation and final savings.

If you see a negative savings value, then you're likely to have unused savings plans. You should review your savings plan usage. For more information, see [View savings plan utilization after purchase](view-utilization.md).

## Other ways to get data and see savings

Using the preceding steps, you can repeat the process for any number of months. Doing so allows you to see your savings over a longer period.

Instead of downloading usage files, one per month, you can get all your usage data for a specific date range using exports from Cost Management and output the data to Azure Storage. Doing so allows you to see your savings over a longer period. For more information about creating an export, see [Create and manage exported data](../costs/tutorial-improved-exports.md).

## Next steps

- If you have any unused savings plans, read [View savings plan utilization after purchase](view-utilization.md).
- Learn more about creating an export at [Create and manage exported data](../costs/tutorial-improved-exports.md).
