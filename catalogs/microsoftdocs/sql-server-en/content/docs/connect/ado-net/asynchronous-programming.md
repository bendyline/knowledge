---
title: Asynchronous programming
description: Learn about asynchronous programming in the Microsoft SqlClient Data Provider for SQL Server.
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, paulmedynski, cmalhotra
ms.date: 08/19/2025
ms.service: sql
ms.subservice: connectivity
ms.topic: concept-article
---
# Asynchronous programming

 **Applies to**:  .NET Framework  .NET  .NET Standard 




This article discusses support for asynchronous programming in the Microsoft SqlClient Data Provider for SQL Server (SqlClient).

## Legacy asynchronous programming

The Microsoft SqlClient Data Provider for SQL Server includes methods from **System.Data.SqlClient** to maintain backward compatibility for applications migrating to [Microsoft.Data.SqlClient](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient). It isn't recommended to use the following legacy asynchronous programming methods for new development:

- [Microsoft.Data.SqlClient.SqlCommand.BeginExecuteNonQuery%2A](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlCommand.BeginExecuteNonQuery%252A)

- [Microsoft.Data.SqlClient.SqlCommand.BeginExecuteReader%2A](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlCommand.BeginExecuteReader%252A)

- [Microsoft.Data.SqlClient.SqlCommand.BeginExecuteXmlReader%2A](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlCommand.BeginExecuteXmlReader%252A)

> **Tip:**
> In the Microsoft SqlClient Data Provider for SQL Server, these legacy methods no longer require `Asynchronous Processing=true` in the connection string.

> **Warning:**
> The `Asynchronous Processing` connection property is no longer supported in the Microsoft SqlClient Data Provider v4.0 onward.

## Asynchronous programming features

These asynchronous programming features provide a simple technique to make code asynchronous.

For more information about asynchronous programming in .NET, see:

- [Asynchronous programming in C#](https://learn.microsoft.com/dotnet/csharp/async)

- [Asynchronous Programming with Async and Await (Visual Basic)](https://learn.microsoft.com/dotnet/visual-basic/programming-guide/concepts/async/index)

When your user interface is unresponsive or your server doesn't scale, it's likely you need your code to be more asynchronous. Writing asynchronous code has traditionally involved installing a callback (also called continuation) to express the logic that occurs after the asynchronous operation finishes. This style complicates the structure of asynchronous code as compared with synchronous code.

You can call into asynchronous methods without using callbacks, and without splitting your code across multiple methods or lambda expressions.

The `async` modifier specifies that a method is asynchronous. When calling an `async` method, a task is returned. When the `await` operator is applied to a task, the current method exits immediately. When the task finishes, execution resumes in the same method.

> **Tip:**
> In the Microsoft SqlClient Data Provider for SQL Server, asynchronous calls are not required to set the `Context Connection` connection string keyword.

Calling an `async` method doesn't create extra threads. It may use the existing I/O completion thread briefly at the end.

The following methods in the Microsoft SqlClient Data Provider for SQL Server support asynchronous programming:

- [System.Data.Common.DbConnection.OpenAsync%2A](https://learn.microsoft.com/search/?terms=System.Data.Common.DbConnection.OpenAsync%252A)

- [System.Data.Common.DbCommand.ExecuteDbDataReaderAsync%2A](https://learn.microsoft.com/search/?terms=System.Data.Common.DbCommand.ExecuteDbDataReaderAsync%252A)

- [System.Data.Common.DbCommand.ExecuteNonQueryAsync%2A](https://learn.microsoft.com/search/?terms=System.Data.Common.DbCommand.ExecuteNonQueryAsync%252A)

- [System.Data.Common.DbCommand.ExecuteReaderAsync%2A](https://learn.microsoft.com/search/?terms=System.Data.Common.DbCommand.ExecuteReaderAsync%252A)

- [System.Data.Common.DbCommand.ExecuteScalarAsync%2A](https://learn.microsoft.com/search/?terms=System.Data.Common.DbCommand.ExecuteScalarAsync%252A)

- [System.Data.Common.DbDataReader.GetFieldValueAsync%2A](https://learn.microsoft.com/search/?terms=System.Data.Common.DbDataReader.GetFieldValueAsync%252A)

- [System.Data.Common.DbDataReader.IsDBNullAsync%2A](https://learn.microsoft.com/search/?terms=System.Data.Common.DbDataReader.IsDBNullAsync%252A)

- [System.Data.Common.DbDataReader.NextResultAsync%2A](https://learn.microsoft.com/search/?terms=System.Data.Common.DbDataReader.NextResultAsync%252A)

- [System.Data.Common.DbDataReader.ReadAsync%2A](https://learn.microsoft.com/search/?terms=System.Data.Common.DbDataReader.ReadAsync%252A)

- [Microsoft.Data.SqlClient.SqlConnection.OpenAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlConnection.OpenAsync%252A)

- [Microsoft.Data.SqlClient.SqlCommand.ExecuteNonQueryAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlCommand.ExecuteNonQueryAsync%252A)

- [Microsoft.Data.SqlClient.SqlCommand.ExecuteReaderAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlCommand.ExecuteReaderAsync%252A)

- [Microsoft.Data.SqlClient.SqlCommand.ExecuteScalarAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlCommand.ExecuteScalarAsync%252A)

- [Microsoft.Data.SqlClient.SqlCommand.ExecuteXmlReaderAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlCommand.ExecuteXmlReaderAsync%252A)

- [Microsoft.Data.SqlClient.SqlDataReader.NextResultAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlDataReader.NextResultAsync%252A)

- [Microsoft.Data.SqlClient.SqlDataReader.ReadAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlDataReader.ReadAsync%252A)

- [Microsoft.Data.SqlClient.SqlBulkCopy.WriteToServerAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlBulkCopy.WriteToServerAsync%252A)

Other asynchronous members support [SqlClient streaming support](sqlclient-streaming-support.md).

> **Tip:**
> The asynchronous methods don't require `Asynchronous Processing=true` in the connection string. And this property is obsolete in the Microsoft SqlClient Data Provider for SQL Server.

### Synchronous to asynchronous connection open

You can upgrade an existing application to use the asynchronous feature. For example, assume an application has a synchronous connection algorithm and blocks the UI thread every time it connects to the database. Once connected, the application calls a stored procedure that signals other users of the one who just signed in.

[Code reference unavailable in this source snapshot: ~/../sqlclient/doc/samples/SqlCommand_ExecuteNonQuery.cs#1](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/connect/ado-net/asynchronous-programming.md)

When converted to use the asynchronous functionality, the program would look like:

[Code reference unavailable in this source snapshot: ~/../sqlclient/doc/samples/SqlCommand_ExecuteNonQueryAsync.cs#1](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/connect/ado-net/asynchronous-programming.md)

### Add the asynchronous feature in an existing application (mixing old and new patterns)

It's also possible to add asynchronous capability (SqlConnection::OpenAsync) without changing the existing asynchronous logic. For example, if an application currently uses:

[Code reference unavailable in this source snapshot: ~/../sqlclient/doc/samples/SqlConnection_OpenAsync_ContinueWith.cs#1](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/connect/ado-net/asynchronous-programming.md)

You can begin to use the asynchronous pattern without substantially changing the existing algorithm.

[Code reference unavailable in this source snapshot: ~/../sqlclient/doc/samples/SqlConnection_OpenAsync_ContinueWith.cs#2](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/connect/ado-net/asynchronous-programming.md)

### Use the base provider model and the asynchronous feature

You may need to create a tool that can connect to different databases and execute queries. You can use the base provider model and the asynchronous feature.

The Microsoft Distributed Transaction Coordinator (MSDTC) must be enabled on the server to use distributed transactions. For information on how to enable MSDTC, see [How to Enable MSDTC on a Web Server](https://learn.microsoft.com/previous-versions/commerce-server/dd327979\(v=cs.90\)).

[Code reference unavailable in this source snapshot: ~/../sqlclient/doc/samples/SqlClient_AsyncProgramming_ProviderModel.cs#1](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/connect/ado-net/asynchronous-programming.md)

### Use SQL transactions and the new asynchronous feature

[Code reference unavailable in this source snapshot: ~/../sqlclient/doc/samples/SqlClient_AsyncProgramming_SqlTransaction.cs#1](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/connect/ado-net/asynchronous-programming.md)

### Use distributed transactions and the new asynchronous feature

In an enterprise application, you may need to add **distributed transactions** in some scenarios, to enable transactions between multiple database servers. You can use the System.Transactions namespace and enlist a distributed transaction, as follows:

[Code reference unavailable in this source snapshot: ~/../sqlclient/doc/samples/SqlClient_AsyncProgramming_DistributedTransaction.cs#1](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/connect/ado-net/asynchronous-programming.md)

### Cancel an asynchronous operation

You can cancel an asynchronous request by using the [System.Threading.CancellationToken](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken).

[Code reference unavailable in this source snapshot: ~/../sqlclient/doc/samples/SqlClient_AsyncProgramming_Cancellation.cs#1](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/connect/ado-net/asynchronous-programming.md)

### Asynchronous operations with SqlBulkCopy

Asynchronous capabilities are also in [Microsoft.Data.SqlClient.SqlBulkCopy](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlBulkCopy) with [Microsoft.Data.SqlClient.SqlBulkCopy.WriteToServerAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlBulkCopy.WriteToServerAsync%252A).

[Code reference unavailable in this source snapshot: ~/../sqlclient/doc/samples/SqlClient_AsyncProgramming_SqlBulkCopy.cs#1](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/connect/ado-net/asynchronous-programming.md)

## Asynchronously use multiple commands with MARS

The example opens a single connection to the **AdventureWorks** database. Using a [Microsoft.Data.SqlClient.SqlCommand](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlCommand) object, a [Microsoft.Data.SqlClient.SqlDataReader](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlDataReader) is created. As the reader is used, a second [Microsoft.Data.SqlClient.SqlDataReader](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlDataReader) is opened, using data from the first [Microsoft.Data.SqlClient.SqlDataReader](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlDataReader) as input to the WHERE clause for the second reader.

> **Note:**
> The following example uses the sample [**AdventureWorks** database](../../samples/adventureworks-install-configure.md). The connection string provided in the sample code assumes that the database is installed and available on the local computer. Modify the connection string as necessary for your environment.

[Code reference unavailable in this source snapshot: ~/../sqlclient/doc/samples/SqlClient_AsyncProgramming_MultipleCommands.cs#1](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/connect/ado-net/asynchronous-programming.md)

## Asynchronously read and update data with MARS

MARS allows a connection to be used for both read operations and data manipulation language (DML) operations with more than one pending operation. This feature eliminates the need for an application to deal with connection-busy errors. Also, MARS can replace the use of server-side cursors, which generally consume more resources. Finally, because multiple operations can operate on a single connection, they can share the same transaction context, eliminating the need to use **sp_getbindtoken** and **sp_bindsession** system stored procedures.

The following Console application demonstrates how to use two [Microsoft.Data.SqlClient.SqlDataReader](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlDataReader) objects with three [Microsoft.Data.SqlClient.SqlCommand](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlCommand) objects and a single [Microsoft.Data.SqlClient.SqlConnection](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlConnection) object with MARS enabled. The first command object retrieves a list of vendors whose credit rating is 5. The second command object uses the vendor ID provided from a [Microsoft.Data.SqlClient.SqlDataReader](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlDataReader) to load the second [Microsoft.Data.SqlClient.SqlDataReader](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlDataReader) with all of the products for the particular vendor. Each product record is visited by the second [Microsoft.Data.SqlClient.SqlDataReader](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlDataReader). A calculation is performed to determine what the new **OnOrderQty** should be. The third command object is then used to update the **ProductVendor** table with the new value. This entire process takes place within a single transaction, which is rolled back at the end.

> **Note:**
> The following example uses the sample [**AdventureWorks** database](../../samples/adventureworks-install-configure.md). The connection string provided in the sample code assumes that the database is installed and available on the local computer. Modify the connection string as necessary for your environment.

[Code reference unavailable in this source snapshot: ~/../sqlclient/doc/samples/SqlClient_AsyncProgramming_MultipleCommandsEx.cs#1](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/connect/ado-net/asynchronous-programming.md)

## Related content

- [Retrieving and modifying data in ADO.NET](retrieving-modifying-data.md)
- [Microsoft.Data.SqlClient for SQL Server](microsoft-ado-net-sql-server.md)
