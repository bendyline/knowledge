---
description: "Learn more about: Query Expression Syntax Examples: Join Operators"
title: "Query Expression Syntax Examples: Join Operators"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 343e8dda-70b2-409d-9334-ce9a880c3cea
---
# Query Expression Syntax Examples: Join Operators

Joining is an important operation in queries that target data sources that have no navigable relationships to each other, such as relational database tables. A join of two data sources is the association of objects in one data source with objects that share a common attribute in the other data source. For more information, see [Standard Query Operators Overview](https://learn.microsoft.com/previous-versions/visualstudio/visual-studio-2013/bb397896\(v=vs.120\)).

 The examples in this topic demonstrate how to use the [System.Linq.Enumerable.GroupJoin*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.GroupJoin*) and [System.Linq.Enumerable.Join*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Join*) methods to query the [AdventureWorks Sales Model](https://github.com/Microsoft/sql-server-samples/releases/tag/adventureworks) using query expression syntax. The AdventureWorks Sales Model used in these examples is built from the Contact, Address, Product, SalesOrderHeader, and SalesOrderDetail tables in the AdventureWorks sample database.

 The examples in this topic use the following `using`/`Imports` statements:

 [DP L2E Examples#ImportsUsing (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs#importsusing)](<../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs.md>)
 [DP L2E Examples#ImportsUsing (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb#importsusing)](<../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb.md>)

## GroupJoin

### Example

 The following example performs a [System.Linq.Enumerable.GroupJoin*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.GroupJoin*) over the SalesOrderHeader and SalesOrderDetail tables to find the number of orders per customer. A group join is the equivalent of a left outer join, which returns each element of the first (left) data source, even if no correlated elements are in the other data source.

 [DP L2E Examples#GroupJoin2 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs#groupjoin2)](<../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs.md>)
 [DP L2E Examples#GroupJoin2 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb#groupjoin2)](<../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb.md>)

### Example

 The following example performs a [System.Linq.Enumerable.GroupJoin*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.GroupJoin*) over the Contact and SalesOrderHeader tables to find the number of orders per contact. The order count and IDs for each contact are displayed.

 [DP L2E Examples#GroupJoin (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs#groupjoin)](<../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs.md>)
 [DP L2E Examples#GroupJoin (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb#groupjoin)](<../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb.md>)

## Join

### Example

 The following example performs a join over the SalesOrderHeader and SalesOrderDetail tables to get online orders from the month of August.

 [DP L2E Examples#Join (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs#join)](<../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs.md>)
 [DP L2E Examples#Join (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb#join)](<../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb.md>)

## See also

- [Queries in LINQ to Entities](queries-in-linq-to-entities.md)
