---
title: "Policy-Based Management Storage"
description: "Policy-Based Management Storage"
author: VanMSFT
ms.author: vanto
ms.date: "08/09/2017"
ms.service: sql
ms.subservice: security
ms.topic: concept-article
helpviewer_keywords:
  - "Policy-Based Management, storage"
---
# Policy-Based Management Storage
 
**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
  Policies are stored in the msdb database. After a policy or condition is changed, msdb should be backed up. For more information, see [Back Up and Restore of System Databases (SQL Server)](../backup-restore/back-up-and-restore-of-system-databases-sql-server.md).  
  
## Storing Policies  
  SQL Server 
 includes policies that can be used to monitor an instance of  SQL Server 
. By default, these policies are not installed on the  Database Engine 
. However, you can import them from their default installation location. SQL Server Policies are stored in their respective version folder. For example, for SQL Server 2019, SQL Server Policies are stored in C:\Program Files (x86)\Microsoft SQL Server\150\Tools\Policies\DatabaseEngine\1033. 
  
 You can directly create policies by using the **File/New** menu, and then saving them to a file. This enables you to create policies when you are not connected to an instance of the  Database Engine 
.  
  
 Policy history for policies evaluated in the current instance of the  Database Engine 
 is maintained in msdb system tables. Policy history for policies applied to other instances of the  Database Engine 
 or applied to  Reporting Services 
 or  Analysis Services 
 is not retained.
