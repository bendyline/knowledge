---
title: "MSSQLSERVER_41342"
description: "MSSQLSERVER_41342"
author: MashaMSFT
ms.author: mathoma
ms.date: "04/04/2017"
ms.service: sql
ms.subservice: supportability
ms.topic: "reference"
helpviewer_keywords:
  - "41342 (Database Engine error)"
---
# MSSQLSERVER_41342
 
**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
  
## Details  
  
| Attribute | Value |
| :--- | :--- |
| Product Name | SQL Server |
|  |
| Event ID | 41342 |
| Event Source | MSSQLSERVER |
| Component | SQLEngine |
| Symbolic Name | HK_HW_NOT_SUPPORTED |
| Message Text | The model of the processor on the system does not support creating *construct*. This error typically occurs with older processors. |
  
## Explanation  
Memory-optimized tables require a processor model that supports atomic compare-and-exchange operations on 128-bit values, which require the assembly instruction CMPXCHG16B. Certain older AMD processor models do not support the CMPXCHG16B instruction. Also, certain virtualization environments do not enable this instruction by default.  
  
## User Action  
Upgrade your processor. If your processor supports the instruction and you are running SQL Server in a virtual machine, change the configuration to support the instruction CMPXCHG16B.  
  
## Related content

- [In-Memory OLTP (In-Memory Optimization)](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/relational-databases/in-memory-oltp/in-memory-oltp-in-memory-optimization.md)
