---
title: "System.Transactions integration with SQL Server"
description: "Describes System.Transactions integration with SQL Server for working with distributed transactions."
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, paulmedynski, cmalhotra
ms.date: "11/25/2020"
ms.service: sql
ms.subservice: connectivity
ms.topic: concept-article
ms.custom: sfi-ropc-nochange
---
# System.Transactions integration with SQL Server

 **Applies to**:  .NET Framework  .NET  .NET Standard 




.NET includes a transaction framework that can be accessed through the [System.Transactions](https://learn.microsoft.com/search/?terms=System.Transactions) namespace. This framework exposes transactions in a way that is fully integrated in .NET, including ADO.NET.  
  
In addition to the programmability enhancements, [System.Transactions](https://learn.microsoft.com/search/?terms=System.Transactions) and ADO.NET can work together to coordinate optimizations when you work with transactions. A promotable transaction is a lightweight (local) transaction that can be automatically promoted to a fully distributed transaction on an as-needed basis.

The Microsoft SqlClient Data Provider for SQL Server supports promotable transactions when you work with SQL Server. A promotable transaction does not invoke the added overhead of a distributed transaction unless the added overhead is required. Promotable transactions are automatic and require no intervention from the developer.

## Creating promotable transactions

The Microsoft SqlClient Data Provider for SQL Server provides support for promotable transactions, which are handled through the classes in the [System.Transactions](https://learn.microsoft.com/search/?terms=System.Transactions) namespace. Promotable transactions optimize distributed transactions by deferring creating a distributed transaction until it is needed. If only one resource manager is required, no distributed transaction occurs.

> **Note:**
> In a partially trusted scenario, the [System.Transactions.DistributedTransactionPermission](https://learn.microsoft.com/search/?terms=System.Transactions.DistributedTransactionPermission) is required when a transaction is promoted to a distributed transaction.

## Promotable transaction scenarios

Distributed transactions typically consume significant system resources, being managed by Microsoft Distributed Transaction Coordinator (MS DTC), which integrates all the resource managers accessed in the transaction. A promotable transaction is a special form of a [System.Transactions](https://learn.microsoft.com/search/?terms=System.Transactions) transaction that effectively delegates the work to a simple SQL Server transaction. [System.Transactions](https://learn.microsoft.com/search/?terms=System.Transactions), [Microsoft.Data.SqlClient](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient), and SQL Server coordinate the work involved in handling the transaction, promoting it to a full distributed transaction as needed.

The benefit of using promotable transactions is that when a connection is opened by using an active [System.Transactions.TransactionScope](https://learn.microsoft.com/search/?terms=System.Transactions.TransactionScope) transaction, and no other connections are opened, the transaction commits as a lightweight transaction, instead of incurring the additional overhead of a full distributed transaction.

### Connection string keywords

The [Microsoft.Data.SqlClient.SqlConnection.ConnectionString%2A](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlConnection.ConnectionString%252A) property supports a keyword, `Enlist`, which indicates whether [Microsoft.Data.SqlClient](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient) will detect transactional contexts and automatically enlist the connection in a distributed transaction. If `Enlist=true`, the connection is automatically enlisted in the opening thread's current transaction context. If `Enlist=false`, the `SqlClient` connection does not interact with a distributed transaction. The default value for `Enlist` is true. If `Enlist` is not specified in the connection string, the connection is automatically enlisted in a distributed transaction if one is detected when the connection is opened.

The `Transaction Binding` keywords in a [Microsoft.Data.SqlClient.SqlConnection](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlConnection) connection string control the connection's association with an enlisted `System.Transactions` transaction. It is also available through the [Microsoft.Data.SqlClient.SqlConnectionStringBuilder.TransactionBinding%2A](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlConnectionStringBuilder.TransactionBinding%252A) property of a [Microsoft.Data.SqlClient.SqlConnectionStringBuilder](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlConnectionStringBuilder).

The following table describes the possible values.
  
| Keyword | Description |
| --- | --- |
| Implicit Unbind | The default. The connection detaches from the transaction when it ends, switching back to autocommit mode. |
| Explicit Unbind | The connection remains attached to the transaction until the transaction is closed. The connection will fail if the associated transaction is not active or does not match [System.Transactions.Transaction.Current%2A](https://learn.microsoft.com/search/?terms=System.Transactions.Transaction.Current%252A). |

## Using TransactionScope

The [System.Transactions.TransactionScope](https://learn.microsoft.com/search/?terms=System.Transactions.TransactionScope) class makes a code block transactional by implicitly enlisting connections in a distributed transaction. You must call the [System.Transactions.TransactionScope.Complete%2A](https://learn.microsoft.com/search/?terms=System.Transactions.TransactionScope.Complete%252A) method at the end of the [System.Transactions.TransactionScope](https://learn.microsoft.com/search/?terms=System.Transactions.TransactionScope) block before leaving it. Leaving the block invokes the [System.Transactions.TransactionScope.Dispose%2A](https://learn.microsoft.com/search/?terms=System.Transactions.TransactionScope.Dispose%252A) method. If an exception has been thrown that causes the code to leave scope, the transaction is considered aborted.

We recommend that you use a `using` block to make sure that [System.Transactions.TransactionScope.Dispose%2A](https://learn.microsoft.com/search/?terms=System.Transactions.TransactionScope.Dispose%252A) is called on the [System.Transactions.TransactionScope](https://learn.microsoft.com/search/?terms=System.Transactions.TransactionScope) object when the using block is exited. Failure to commit or roll back pending transactions can significantly damage performance because the default time-out for the [System.Transactions.TransactionScope](https://learn.microsoft.com/search/?terms=System.Transactions.TransactionScope) is one minute. If you do not use a `using` statement, you must perform all work in a `Try` block and explicitly call the [System.Transactions.TransactionScope.Dispose%2A](https://learn.microsoft.com/search/?terms=System.Transactions.TransactionScope.Dispose%252A) method in the `Finally` block.

If an exception occurs in the [System.Transactions.TransactionScope](https://learn.microsoft.com/search/?terms=System.Transactions.TransactionScope), the transaction is marked as inconsistent and is abandoned. It will be rolled back when the [System.Transactions.TransactionScope](https://learn.microsoft.com/search/?terms=System.Transactions.TransactionScope) is disposed. If no exception occurs, participating transactions commit.

> **Note:**
> The `TransactionScope` class creates a transaction with a [System.Transactions.Transaction.IsolationLevel%2A](https://learn.microsoft.com/search/?terms=System.Transactions.Transaction.IsolationLevel%252A) of `Serializable` by default. Depending on your application, you might want to consider lowering the isolation level to avoid high contention in your application.

> **Note:**
> We recommend that you perform only updates, inserts, and deletes within distributed transactions because they consume significant database resources. Select statements may lock database resources unnecessarily, and in some scenarios, you may have to use transactions for selects. Any non-database work should be done outside the scope of the transaction, unless it involves other transacted resource managers.
Although an exception in the scope of the transaction prevents the transaction from committing, the [System.Transactions.TransactionScope](https://learn.microsoft.com/search/?terms=System.Transactions.TransactionScope) class has no provision for rolling back any changes your code has made outside the scope of the transaction itself. If you have to take some action when the transaction is rolled back, you must write your own implementation of the [System.Transactions.IEnlistmentNotification](https://learn.microsoft.com/search/?terms=System.Transactions.IEnlistmentNotification) interface and explicitly enlist in the transaction.

## Example

Working with [System.Transactions](https://learn.microsoft.com/search/?terms=System.Transactions) requires that you have a reference to System.Transactions.dll.

The following function demonstrates how to create a promotable transaction against two different SQL Server instances, represented by two different [Microsoft.Data.SqlClient.SqlConnection](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlConnection) objects, which are wrapped in a [System.Transactions.TransactionScope](https://learn.microsoft.com/search/?terms=System.Transactions.TransactionScope) block.

The code below creates the [System.Transactions.TransactionScope](https://learn.microsoft.com/search/?terms=System.Transactions.TransactionScope) block with a `using` statement and opens the first connection, which automatically enlists it in the [System.Transactions.TransactionScope](https://learn.microsoft.com/search/?terms=System.Transactions.TransactionScope).

The transaction is initially enlisted as a lightweight transaction, not a full distributed transaction. The second connection is enlisted in the [System.Transactions.TransactionScope](https://learn.microsoft.com/search/?terms=System.Transactions.TransactionScope) only if the command in the first connection does not throw an exception. When the second connection is opened, the transaction is automatically promoted to a full distributed transaction.

Later, the [System.Transactions.TransactionScope.Complete%2A](https://learn.microsoft.com/search/?terms=System.Transactions.TransactionScope.Complete%252A) method is invoked, which commits the transaction only if no exceptions have been thrown. If an exception has been thrown at any point in the [System.Transactions.TransactionScope](https://learn.microsoft.com/search/?terms=System.Transactions.TransactionScope) block, `Complete` will not be called, and the distributed transaction will roll back when the [System.Transactions.TransactionScope](https://learn.microsoft.com/search/?terms=System.Transactions.TransactionScope) is disposed at the end of its `using` block.

[Code reference unavailable in this source snapshot: ~/../sqlclient/doc/samples/SqlTransactionScope.cs#1](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/connect/ado-net/system-transactions-integration-with-sql-server.md)

## Related content

- [Transactions and concurrency](transactions-and-concurrency.md)
- [Microsoft.Data.SqlClient for SQL Server](microsoft-ado-net-sql-server.md)
