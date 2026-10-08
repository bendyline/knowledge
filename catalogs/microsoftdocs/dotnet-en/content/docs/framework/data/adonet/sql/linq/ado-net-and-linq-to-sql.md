---
description: "Learn more about: ADO.NET and LINQ to SQL"
title: "ADO.NET and LINQ to SQL"
titleSuffix: ""
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 49ac6da0-f2e1-46fa-963e-1b6dcb63fef7
---
# ADO.NET and LINQ to SQL

LINQ to SQL
 is part of the ADO.NET family of technologies. It is based on services provided by the ADO.NET provider model. You can therefore mix LINQ to SQL
 code with existing ADO.NET applications and migrate current ADO.NET solutions to LINQ to SQL
. The following illustration provides a high-level view of the relationship.

 LINQ to SQL and ADO.NET

## Connections

 You can supply an existing ADO.NET connection when you create a LINQ to SQL
 [System.Data.Linq.DataContext](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext). All operations against the [System.Data.Linq.DataContext](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext) (including queries) use this provided connection. If the connection is already open, LINQ to SQL
 leaves it as is when you are finished with it.

 [DLinqCommunicatingWithDatabase#4 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqCommunicatingWithDatabase/cs/Program.cs#4)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqCommunicatingWithDatabase/cs/Program.cs.md)
 [DLinqCommunicatingWithDatabase#4 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqCommunicatingWithDatabase/vb/Module1.vb#4)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqCommunicatingWithDatabase/vb/Module1.vb.md)

 You can always access the connection and close it yourself by using the [System.Data.Linq.DataContext.Connection](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.Connection) property, as in the following code:

 [DLinqAdoNet#1 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqAdoNet/cs/Program.cs#1)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqAdoNet/cs/Program.cs.md)
 [DLinqAdoNet#1 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqAdoNet/vb/Module1.vb#1)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqAdoNet/vb/Module1.vb.md)

## Transactions

 You can supply your [System.Data.Linq.DataContext](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext) with your own database transaction when your application has already initiated the transaction and you want your [System.Data.Linq.DataContext](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext) to be involved.

 The preferred method of doing transactions with the .NET Framework is to use the [System.Transactions.TransactionScope](https://learn.microsoft.com/search/?terms=System.Transactions.TransactionScope) object. By using this approach, you can make distributed transactions that work across databases and other memory-resident resource managers. Transaction scopes require few resources to start. They promote themselves to distributed transactions only when there are multiple connections within the scope of the transaction.

 [DLinqAdoNet#2 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqAdoNet/cs/Program.cs#2)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqAdoNet/cs/Program.cs.md)
 [DLinqAdoNet#2 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqAdoNet/vb/Module1.vb#2)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqAdoNet/vb/Module1.vb.md)

 You cannot use this approach for all databases. For example, the SqlClient connection cannot promote system transactions when it works against a SQL Server 2000 server. Instead, it automatically enlists to a full, distributed transaction whenever it sees a transaction scope being used.

## Direct SQL Commands

 At times you can encounter situations where the ability of the [System.Data.Linq.DataContext](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext) to query or submit changes is insufficient for the specialized task you want to perform. In these circumstances you can use the [System.Data.Linq.DataContext.ExecuteQuery*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.ExecuteQuery*) method to issue SQL commands to the database and convert the query results to objects.

 For example, assume that the data for the `Customer` class is spread over two tables (customer1 and customer2). The following query returns a sequence of `Customer` objects:

 [DLinqAdoNet#3 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqAdoNet/cs/Program.cs#3)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqAdoNet/cs/Program.cs.md)
 [DLinqAdoNet#3 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqAdoNet/vb/Module1.vb#3)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqAdoNet/vb/Module1.vb.md)

 As long as the column names in the tabular results match column properties of your entity class, LINQ to SQL
 creates your objects out of any SQL query.

### Parameters

 The [System.Data.Linq.DataContext.ExecuteQuery*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.ExecuteQuery*) method accepts parameters. The following code executes a parameterized query:

 [DlinqAdoNet#4 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqAdoNet/cs/Program.cs#4)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqAdoNet/cs/Program.cs.md)
 [DlinqAdoNet#4 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqAdoNet/vb/Module1.vb#4)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqAdoNet/vb/Module1.vb.md)

> **Note:**
> Parameters are expressed in the query text by using the same curly notation used by `Console.WriteLine()` and `String.Format()`. `String.Format()` takes the query string you provide and substitutes the curly-braced parameters with generated parameter names such as `@p0`, `@p1` …, `@p(n)`.

## See also

- [Background Information](background-information.md)
- [How to: Reuse a Connection Between an ADO.NET Command and a DataContext](how-to-reuse-a-connection-between-an-ado-net-command-and-a-datacontext.md)
