---
title: Understanding row locking
description: Learn how row locking is used to control how concurrent users access data at the same time from different connections.
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "12/08/2020"
ms.service: sql
ms.subservice: connectivity
ms.topic: concept-article
---

# Understanding row locking



The  Microsoft JDBC Driver for SQL Server 
 uses  SQL Server 
 row locks. These implement concurrency controls among multiple users who are performing modifications in a database at the same time. By default, transactions and locks are managed on a per-connection basis. For example, if an application opens two JDBC connections, locks that are acquired by one connection cannot be shared with the other connection. Neither connection can acquire locks that would conflict with locks held by the other connection.

> **Note:**  
> If row locking is used, all rows in the fetch buffer are locked, so a very large setting for the fetch size can affect concurrency.

Locking is used to assure transactional integrity and database consistency. Locking prevents users from reading data that is being changed by other users, and prevents multiple users from changing the same data at the same time. If locking is not used, data within the database might become logically incorrect, and queries run against that data might produce unexpected results.

> **Note:**  
> For more information about row locking in  SQL Server 
, see [Locking in the  Database Engine 
](../../relational-databases/sql-server-transaction-locking-and-row-versioning-guide.md#lock_engine).

## Related content

- [Managing result sets with the JDBC driver](managing-result-sets-with-the-jdbc-driver.md)
