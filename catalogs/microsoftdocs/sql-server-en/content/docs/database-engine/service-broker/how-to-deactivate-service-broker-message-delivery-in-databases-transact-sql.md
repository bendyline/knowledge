---
title: "How To: Deactivate Service Broker Message Delivery in Databases (Transact-SQL)"
description: "When message delivery is not active, messages remain in the transmission queue."
author: rwestMSFT
ms.author: randolphwest
ms.reviewer: maghan
ms.date: 09/02/2025
ms.service: sql
ms.subservice: configuration
ms.topic: how-to
---

# How to: Deactivate Service Broker message delivery in databases (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 





When message delivery isn't active, messages remain in the transmission queue. To determine whether Service Broker is active for a database, check the `is_broker_enabled` column of the `sys.databases` catalog view.

> **Note:**  
> Deactivating Service Broker prevents messages from being sent from or delivered to the database. However, this doesn't prevent messages from arriving in the instance. To prevent messages from arriving in the instance, you must remove or stop the Service Broker endpoint.

## Deactivate Service Broker in a database

- Alter the database to set the `DISABLE_BROKER` option.

## Examples

> **Note:**  
> The code samples in this article were tested using the  `AdventureWorks2025`  sample database, which you can download from the [Azure Data SQL Samples Repository](https://github.com/microsoft/sql-server-samples) GitHub repository.


```sql
USE master;
GO

ALTER DATABASE AdventureWorks2008R2
    SET DISABLE_BROKER;
GO
```

## Related content

- [ALTER DATABASE (Transact-SQL)](../../t-sql/statements/alter-database-transact-sql.md)
- [sys.databases (Transact-SQL)](../../relational-databases/system-catalog-views/sys-databases-transact-sql.md)
- [sys.transmission_queue (Transact-SQL)](../../relational-databases/system-catalog-views/sys-transmission-queue-transact-sql.md)
