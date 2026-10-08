---
title: "CLR User-Defined Aggregates"
description: SQL Server CLR integration allows you to create custom aggregate functions in managed code, which perform a calculation on a set of values and return a value.
author: rwestMSFT
ms.author: randolphwest
ms.date: 12/27/2024
ms.service: sql
ms.subservice: clr
ms.topic: "reference"
helpviewer_keywords:
  - "aggregate functions [CLR integration]"
  - "custom aggregates [CLR integration]"
  - "calculations [CLR integration]"
  - "user-defined functions [CLR integration]"
---
# CLR user-defined aggregates


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Aggregate functions perform a calculation on a set of values and return a single value. Traditionally,  SQL Server 
 supported only built-in aggregate functions, such as `SUM` or `MAX`, that operate on a set of input scalar values and generate a single aggregate value from that set.  SQL Server 
 integration with the  .NET Framework 
 common language runtime (CLR) now allows developers to create custom aggregate functions in managed code, and to make these functions accessible to  Transact-SQL  or other managed code.

## In this section

The following table lists the articles in this section.

| Article | Description |
| --- | --- |
| [Requirements for CLR user-defined aggregates](clr-user-defined-aggregates-requirements.md) | Provides an overview of the requirements for implementing CLR user-defined aggregate functions. |
| [Invoke CLR user-defined aggregate functions](clr-user-defined-aggregate-invoking-functions.md) | Explains how to invoke user-defined aggregates. |
