---
description: "Learn more about: Method-Based Query Syntax Examples: Ordering"
title: "Method-Based Query Syntax Examples: Ordering"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 5d21b178-d731-471a-8534-1f8184a2ef06
---
# Method-Based Query Syntax Examples: Ordering

The examples in this topic demonstrate how to use the [System.Linq.Enumerable.ThenBy*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.ThenBy*) method to query the [AdventureWorks Sales Model](https://github.com/Microsoft/sql-server-samples/releases/tag/adventureworks) using method-based query syntax. The AdventureWorks Sales Model used in these examples is built from the Contact, Address, Product, SalesOrderHeader, and SalesOrderDetail tables in the AdventureWorks sample database.

 The examples in this topic use the following `using`/`Imports` statements:

 [DP L2E Examples#ImportsUsing (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs#importsusing)](<../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs.md>)
 [DP L2E Examples#ImportsUsing (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb#importsusing)](<../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb.md>)

## ThenBy

### Example

 The following example in method-based query syntax uses [System.Linq.Queryable.OrderBy*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.OrderBy*) and [System.Linq.Queryable.ThenBy*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.ThenBy*) to return a list of contacts ordered by last name and then by first name.

 [DP L2E Examples#OrderByThenBy_MQ (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs#orderbythenby_mq)](<../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs.md>)
 [DP L2E Examples#OrderByThenBy_MQ (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb#orderbythenby_mq)](<../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb.md>)

## ThenByDescending

### Example

 The following example uses the [System.Linq.Queryable.OrderBy*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.OrderBy*) and [System.Linq.Queryable.ThenByDescending*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.ThenByDescending*) methods to first sort by list price, and then perform a descending sort of the product names.

 [DP L2E Examples#ThenByDescending_MQ (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs#thenbydescending_mq)](<../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs.md>)
 [DP L2E Examples#ThenByDescending_MQ (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb#thenbydescending_mq)](<../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb.md>)

## See also

- [Queries in LINQ to Entities](queries-in-linq-to-entities.md)
