---
title: "How to: Connect to a Database"
description: Learn how to use DataContext to connect to a database in LINQ to SQL. Refer to these examples to use DataContext to connect to a database and to get rows.
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: c33d74b3-530d-421b-a121-96786dd263a5
---
# How to: Connect to a Database

The [System.Data.Linq.DataContext](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext) is the main conduit by which you connect to a database, retrieve objects from it, and submit changes back to it. You use the [System.Data.Linq.DataContext](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext) just as you would use an ADO.NET [System.Data.SqlClient.SqlConnection](https://learn.microsoft.com/search/?terms=System.Data.SqlClient.SqlConnection). In fact, the [System.Data.Linq.DataContext](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext) is initialized with a connection or connection string that you supply. For more information, see [DataContext Methods (O/R Designer)](https://learn.microsoft.com/visualstudio/data-tools/datacontext-methods-o-r-designer).

 The purpose of the [System.Data.Linq.DataContext](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext) is to translate your requests for objects into SQL queries to be made against the database, and then to assemble objects out of the results. The [System.Data.Linq.DataContext](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext) enables Language-Integrated Query (LINQ) by implementing the same operator pattern as the Standard Query Operators, such as `Where` and `Select`.

> **Important:**
> Maintaining a secure connection is of the highest importance. For more information, see [Security in LINQ to SQL](security-in-linq-to-sql.md).

## Example 1

 In the following example, the [System.Data.Linq.DataContext](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext) is used to connect to the Northwind sample database and to retrieve rows of customers whose city is London.

 [DLinqCommunicatingWithDatabase#1 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqCommunicatingWithDatabase/cs/Program.cs#1)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqCommunicatingWithDatabase/cs/Program.cs.md)
 [DLinqCommunicatingWithDatabase#1 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqCommunicatingWithDatabase/vb/Module1.vb#1)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqCommunicatingWithDatabase/vb/Module1.vb.md)

 Each database table is represented as a `Table` collection available by way of the [System.Data.Linq.DataContext.GetTable*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.GetTable*) method, by using the entity class to identify it.

## Example 2

 Best practice is to declare a strongly typed [System.Data.Linq.DataContext](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext) instead of relying on the basic [System.Data.Linq.DataContext](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext) class and the [System.Data.Linq.DataContext.GetTable*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.GetTable*) method. A strongly typed [System.Data.Linq.DataContext](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext) declares all `Table` collections as members of the context, as in the following example.

 [DLinqCommunicatingWithDatabase#2 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqCommunicatingWithDatabase/cs/Program.cs#2)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqCommunicatingWithDatabase/cs/Program.cs.md)
 [DLinqCommunicatingWithDatabase#2 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqCommunicatingWithDatabase/vb/Module1.vb#2)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqCommunicatingWithDatabase/vb/Module1.vb.md)

 You can then express the query for customers from London more simply as:

 [DLinqCommunicatingWithDatabase#5 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqCommunicatingWithDatabase/cs/Program.cs#5)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqCommunicatingWithDatabase/cs/Program.cs.md)
 [DLinqCommunicatingWithDatabase#5 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqCommunicatingWithDatabase/vb/Module1.vb#5)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqCommunicatingWithDatabase/vb/Module1.vb.md)

## See also

- [Communicating with the Database](communicating-with-the-database.md)
