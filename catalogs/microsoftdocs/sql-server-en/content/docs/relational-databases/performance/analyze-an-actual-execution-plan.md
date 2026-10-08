---
title: "Analyze an actual execution plan"
description: Learn how to analyze actual graphical execution plans, which contain runtime information, by using SQL Server Management Studio Plan Analysis feature.
author: rwestMSFT
ms.author: randolphwest
ms.reviewer: wiassaf
ms.date: 07/08/2024
ms.service: sql
ms.subservice: performance
ms.topic: how-to
helpviewer_keywords:
  - "analyzing execution plans"
  - "analyzing actual execution plans"
  - "execution plans [SQL Server], analyzing"
---
# Analyze an actual execution plan


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 





This article describes how you can analyze actual graphical execution plans by using  SQL Server Management Studio 
 Plan Analysis feature. This feature is available starting with  SQL Server Management Studio 
 v17.4. Install the latest version of [SQL Server Management Studio (SSMS)](https://learn.microsoft.com/ssms/install/install).

## Remarks

Actual execution plans are generated after the  Transact-SQL  queries or batches execute. Because of this, an actual execution plan contains runtime information, such as actual number of rows, resource usage metrics and runtime warnings (if any). For more information, see [Display an actual execution plan](display-an-actual-execution-plan.md).

Query performance troubleshooting requires significant expertise in understanding query processing and execution plans, to actually find and fix root causes. For more information, see [Logical and physical showplan operator reference](../showplan-logical-and-physical-operators-reference.md), and [Query processing architecture guide](../query-processing-architecture-guide.md)

 SQL Server Management Studio 
 includes functionality that implements some degree of automation in the task of actual execution plan analysis, especially for large and complex plans. The goal is to make it easier to find scenarios of inaccurate [Cardinality Estimation](cardinality-estimation-sql-server.md) and get recommendations on which possible mitigations might be available.

> **Important:**  
> Ensure proper testing of proposed mitigations before applying them on production environments.

## Analyze an execution plan for a query

1. Open a previously saved query execution plan file (`.sqlplan`) using the **File** menu and selecting on **Open File**, or drag a plan file to  Management Studio
 window. Alternatively, if you just executed a query and chose to display its execution plan, move to the **Execution Plan** tab in the results pane.

1. Right-click in a blank area of the execution plan and select **Analyze Actual Execution Plan**.

   Screenshot showing right-click analyze actual execution plan.

1. The **Showplan Analysis** window opens on the bottom. The **Multi Statement** tab is useful when analyzing plans with multiple statements, by allowing the right statement to be analyzed.

1. Select the Scenarios tab to see details on the issues found for the actual execution plan. For each listed operator on the left pane, the right pane shows details about the scenario in the *Select here for more information about this scenario* link, and possible reasons to explain that scenario are listed.

Screenshot of execution plan analysis results.

## Related content

- [Query Profiling Infrastructure](query-profiling-infrastructure.md)
- [Execution plan overview](execution-plans.md)
- [Query processing architecture guide](../query-processing-architecture-guide.md)
- [Display an actual execution plan](display-an-actual-execution-plan.md)
