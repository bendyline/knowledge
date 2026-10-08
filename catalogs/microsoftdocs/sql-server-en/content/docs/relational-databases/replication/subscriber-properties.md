---
title: "Subscriber Properties"
description: "Subscriber Properties"
author: "MashaMSFT"
ms.author: "mathoma"
ms.date: 09/25/2024
ms.service: sql
ms.subservice: replication
ms.topic: ui-reference
ms.custom:
  - updatefrequency5
f1_keywords:
  - "sql13.rep.configdistwizard.subscribers.f1"
helpviewer_keywords:
  - "Subscriber Properties dialog box"
monikerRange: "=azuresqldb-current || >=sql-server-2017"
---
# Subscriber Properties

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)



  The **Subscriber Properties** dialog box contains information relevant to Subscribers running versions of  Microsoft 
  SQL Server 
 before  SQL Server 2005 (9.x) 
.  

  > **Note:** 
  > Azure SQL Managed Instance can be a publisher, distributor, and subscriber for snapshot and transactional replication. Databases in Azure SQL Database can only be push subscribers for snapshot and transactional replication. For more information, see Transactional replication with [Azure SQL Database](https://learn.microsoft.com/azure/azure-sql/database/replication-to-sql-database) and [Azure SQL Managed Instance](https://learn.microsoft.com/azure/azure-sql/managed-instance/replication-transactional-overview).


  
## Options  
 **Agent Connection to the Subscriber**  
 The context under which the Distribution Agent and Merge Agent connect from the Distributor to the Subscriber This applies only to versions before  SQL Server 2005 (9.x) 
.  
  
 Select **Impersonate agent process account** to make connections to the Subscriber using the context of the  SQL Server 
 Agent account at the Distributor, or specify **SQL Server Authentication**, and then enter a value for **Login** and **Password**.  Microsoft 
 recommends that you select **Impersonate agent process account**.  
  
 For  SQL Server 2005 (9.x) 
 and later versions, connection information is specified for each subscription in the New Subscription Wizard and can be changed in the **Subscription Properties** dialog box.  
  
 **Default Agent Schedules**  
 The default schedule used in the New Subscription Wizard for Subscribers running versions of  SQL Server 
 before  SQL Server 2000 (8.x) 
.  
  
 **Miscellaneous**  
 Includes information on the Subscriber and Subscriber type.  
  
## Related content

- [View and Modify Distributor and Publisher Properties](view-and-modify-distributor-and-publisher-properties.md)
- [Subscribe to Publications](subscribe-to-publications.md)
