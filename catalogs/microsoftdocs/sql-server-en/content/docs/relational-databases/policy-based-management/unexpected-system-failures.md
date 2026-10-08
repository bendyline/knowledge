---
title: "Unexpected System Failures"
description: "Unexpected System Failures"
author: VanMSFT
ms.author: vanto
ms.date: 12/15/2023
ms.service: sql
ms.subservice: security
ms.topic: reference
helpviewer_keywords:
  - "Best Practices [Database Engine]"
---
# Unexpected system failures


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

This rule checks for SYSTEM Event 6008 in the computer event log. This event indicates an unexpected system shutdown. The system might be unstable and might not provide the stability and integrity that is required to host an instance of  SQL Server 
.

## Best practices recommendations

Immediately address the cause of the unexpected server restarts, or move the instance of  SQL Server 
 to another computer.
