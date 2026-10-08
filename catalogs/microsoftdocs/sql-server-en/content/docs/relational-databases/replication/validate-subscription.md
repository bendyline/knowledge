---
title: "Validate Subscription"
description: "Validate Subscription"
author: "MashaMSFT"
ms.author: "mathoma"
ms.date: 09/25/2024
ms.service: sql
ms.subservice: replication
ms.topic: ui-reference
ms.custom:
  - updatefrequency5
f1_keywords:
  - "sql13.rep.validate.validateandresynch.f1"
helpviewer_keywords:
  - "Validate Subscription dialog box"
monikerRange: "=azuresqldb-current || >=sql-server-2017"
---
# Validate Subscription

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)



  Use the **Validate Subscription** dialog box to specify that a subscription to a merge publication should be validated the next time the Merge Agent for the subscription runs. The results of validation are displayed in Replication Monitor. For more information, see [Validate Data at the Subscriber](validate-data-at-the-subscriber.md).  
  
 It is also possible to validate all subscriptions to a merge publication by right-clicking a publication in  Microsoft 
  SQL Server Management Studio 
 and clicking **Validate All Subscriptions**.  

  > **Note:** 
  > Azure SQL Managed Instance can be a publisher, distributor, and subscriber for snapshot and transactional replication. Databases in Azure SQL Database can only be push subscribers for snapshot and transactional replication. For more information, see Transactional replication with [Azure SQL Database](https://learn.microsoft.com/azure/azure-sql/database/replication-to-sql-database) and [Azure SQL Managed Instance](https://learn.microsoft.com/azure/azure-sql/managed-instance/replication-transactional-overview).

  
## Options  
 **Date of the last attempted validation**  
 The date of the last Merge Agent session that included subscription validation, whether or not that validation was successful.  
  
 **Date of the last successful validation**  
 The date of the last Merge Agent session that included a successful subscription validation.  
  
 **Validate this subscription**  
 Select to validate the subscription.  
  
 **Options**  
 Click to access the **Subscription Validation Options** dialog box, which allows you to specify whether to use row count validation or binary checksum validation.  
  
## Related content

- [Validate Replicated Data](validate-data-at-the-subscriber.md)
