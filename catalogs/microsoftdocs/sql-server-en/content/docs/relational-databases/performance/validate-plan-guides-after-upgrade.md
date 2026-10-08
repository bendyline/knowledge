---
title: "Validate Plan Guides After Upgrade"
description: When you upgrade your application to a new release of SQL Server, we recommend that you re-evaluate and test plan guide definitions.
author: rwestMSFT
ms.author: randolphwest
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: performance
ms.topic: how-to
ms.custom:
  - ignite-2025
helpviewer_keywords:
  - "plan guides [SQL Server], validating after upgrade"
monikerRange: "=azuresqldb-current || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---
# Validate plan guides after upgrade

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



> **Important:**
> [Query Store hints](query-store-hints.md) provide an easier-to-use method for shaping query plans without changing application code. Query Store hints are simpler than plan guides. Query Store hints are available in  Azure SQL Database 
, SQL database in Microsoft Fabric
, Azure SQL Managed Instance, and in  SQL Server 2022 (16.x) 
 and later versions.

We recommend re-evaluating and testing plan guide definitions when you upgrade your application to a new release of  SQL Server 
. Performance tuning requirements and plan guide matching behavior may change. Although an invalid plan guide will not cause a query to fail, the plan is compiled without using the plan guide and may not be the best choice. After upgrading a database to a newer version of the  Database Engine 
, we recommend that you perform the following tasks:
  
- Validate existing plan guides by using the [sys.fn_validate_plan_guide](../system-functions/sys-fn-validate-plan-guide-transact-sql.md) function.  
  
- Use extended events to monitor for misguided plans for some period of time by using the [Plan Guide Unsuccessful](../event-classes/plan-guide-unsuccessful-event-class.md) event.
