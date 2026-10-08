---
title: "Local transactions"
description: "Demonstrates how to perform transactions against a database with Microsoft SqlClient Data Provider for SQL Server."
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, paulmedynski, cmalhotra
ms.date: "11/24/2020"
ms.service: sql
ms.subservice: connectivity
ms.topic: how-to
---
# Local transactions

 **Applies to**:  .NET Framework  .NET  .NET Standard 




Transactions in ADO.NET are used when you want to bind multiple tasks together so that they execute as a single unit of work. For example, imagine that an application performs two tasks. First, it updates a table with order information. Second, it updates a table that contains inventory information, debiting the items ordered. If either task fails, then both updates are rolled back.  

## Determining the transaction type

A transaction is considered to be a local transaction when it is a single-phase transaction and is handled by the database directly. A transaction is considered to be a distributed transaction when it is coordinated by a transaction monitor and uses fail-safe mechanisms (such as two-phase commit) for transaction resolution.

The Microsoft SqlClient Data Provider for SQL Server has its own [Microsoft.Data.SqlClient.SqlTransaction](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlTransaction) object for performing local transactions in SQL Server databases. Other .NET data providers also provide their own `Transaction` objects. In addition, there is a [System.Data.Common.DbTransaction](https://learn.microsoft.com/search/?terms=System.Data.Common.DbTransaction) class that is available for writing provider-independent code that requires transactions.

> **Note:**
> Transactions are most efficient when they are performed on the server. If you are working with a SQL Server database that makes extensive use of explicit transactions, consider writing them as stored procedures using the Transact-SQL BEGIN TRANSACTION statement.

## Performing a transaction using a single connection 

In ADO.NET, you control transactions with the `Connection` object. You can initiate a local transaction with the `BeginTransaction` method. Once you have begun a transaction, you can enlist a command in that transaction with the `Transaction` property of a `Command` object. You can then commit or roll back modifications made at the data source based on the success or failure of the components of the transaction.

> **Note:**
> The `EnlistDistributedTransaction` method should not be used for a local transaction.

The scope of the transaction is limited to the connection. The following example performs an explicit transaction that consists of two separate commands in the `try` block. The commands execute INSERT statements against the `Production.ScrapReason` table in the AdventureWorks SQL Server sample database, which are committed if no exceptions are thrown. The code in the `catch` block rolls back the transaction if an exception is thrown. If the transaction is aborted or the connection is closed before the transaction has completed, it is automatically rolled back.

## Example  

 Follow these steps to perform a transaction.

1. Call the [Microsoft.Data.SqlClient.SqlConnection.BeginTransaction%2A](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlConnection.BeginTransaction%252A) method of the [Microsoft.Data.SqlClient.SqlConnection](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlConnection) object to mark the start of the transaction. The [Microsoft.Data.SqlClient.SqlConnection.BeginTransaction%2A](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlConnection.BeginTransaction%252A) method returns a reference to the transaction. This reference is assigned to the [Microsoft.Data.SqlClient.SqlCommand](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlCommand) objects that are enlisted in the transaction.

2. Assign the `Transaction` object to the [Microsoft.Data.SqlClient.SqlCommand.Transaction%2A](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlCommand.Transaction%252A) property of the [Microsoft.Data.SqlClient.SqlCommand](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlCommand) to be executed. If a command is executed on a connection with an active transaction, and the `Transaction` object has not been assigned to the `Transaction` property of the `Command` object, an exception is thrown.

3. Execute the required commands.

4. Call the [Microsoft.Data.SqlClient.SqlTransaction.Commit%2A](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlTransaction.Commit%252A) method of the [Microsoft.Data.SqlClient.SqlTransaction](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlTransaction) object to complete the transaction, or call the [Microsoft.Data.SqlClient.SqlTransaction.Rollback%2A](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlTransaction.Rollback%252A) method to end the transaction. If the connection is closed or disposed before either the [Microsoft.Data.SqlClient.SqlTransaction.Commit%2A](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlTransaction.Commit%252A) or [Microsoft.Data.SqlClient.SqlTransaction.Rollback%2A](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlTransaction.Rollback%252A) methods have been executed, the transaction is rolled back.

The following code example demonstrates transactional logic using the Microsoft SqlClient Data Provider for SQL Server.  

[Code reference unavailable in this source snapshot: ~/../sqlclient/doc/samples/SqlTransactionLocal.cs#1](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/connect/ado-net/local-transactions.md)

## Related content

- [Transactions and concurrency](transactions-and-concurrency.md)
- [Distributed transactions](distributed-transactions.md)
- [System.Transactions integration with SQL Server](system-transactions-integration-with-sql-server.md)
- [Microsoft.Data.SqlClient for SQL Server](microsoft-ado-net-sql-server.md)
