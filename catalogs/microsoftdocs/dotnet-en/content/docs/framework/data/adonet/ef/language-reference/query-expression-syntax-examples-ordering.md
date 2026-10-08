---
description: "Learn more about: Query Expression Syntax Examples: Ordering"
title: "Query Expression Syntax Examples: Ordering"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: bcbc9625-7cf7-476e-85d2-058f12682f54
---
# Query Expression Syntax Examples: Ordering

The examples in this topic demonstrate how to use the `OrderBy` and `OrderByDescending` methods to query the [AdventureWorks Sales Model](https://github.com/Microsoft/sql-server-samples/releases/tag/adventureworks) using query expression syntax. The AdventureWorks Sales Model used in these examples is built from the Contact, Address, Product, SalesOrderHeader, and SalesOrderDetail tables in the AdventureWorks sample database.

 The examples in this topic use the following `using`/`Imports` statements:

 [DP L2E Examples#ImportsUsing (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs#importsusing)](<../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs.md>)
 [DP L2E Examples#ImportsUsing (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb#importsusing)](<../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb.md>)

## OrderBy

### Example

 The following example uses [System.Linq.Enumerable.OrderBy*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.OrderBy*) to return a list of contacts ordered by last name.

 [DP L2E Examples#OrderBySimple1 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs#orderbysimple1)](<../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs.md>)
 [DP L2E Examples#OrderBySimple1 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb#orderbysimple1)](<../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb.md>)

### Example

 The following example uses [System.Linq.Enumerable.OrderBy*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.OrderBy*) to sort a list of contacts by length of last name.

 [DP L2E Examples#OrderBySimple2 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs#orderbysimple2)](<../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs.md>)
 [DP L2E Examples#OrderBySimple2 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb#orderbysimple2)](<../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb.md>)

## OrderByDescending

### Example

 The following example uses `orderby… descending` (`Order By … Descending` in Visual Basic), which is equivalent to the [System.Linq.Enumerable.OrderByDescending*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.OrderByDescending*) method, to sort the price list from highest to lowest.

 [DP L2E Examples#OrderByDescendingSimple1 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs#orderbydescendingsimple1)](<../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs.md>)
 [DP L2E Examples#OrderByDescendingSimple1 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb#orderbydescendingsimple1)](<../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb.md>)

## ThenBy

### Example

 The following example uses [System.Linq.Queryable.OrderBy*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.OrderBy*) and [System.Linq.Queryable.ThenBy*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.ThenBy*) to return a list of contacts ordered by last name and then by first name.

 [DP L2E Examples#OrderByThenBy (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs#orderbythenby)](<../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs.md>)
 [DP L2E Examples#OrderByThenBy (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb#orderbythenby)](<../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb.md>)

## ThenByDescending

### Example

 The following example uses `OrderBy… Descending`, which is equivalent to the [System.Linq.Enumerable.ThenByDescending*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.ThenByDescending*) method, to sort a list of products, first by name and then by list price from highest to lowest.

 [DP L2E Examples#ThenByDescendingSimple (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs#thenbydescendingsimple)](<../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs.md>)
 [DP L2E Examples#ThenByDescendingSimple (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb#thenbydescendingsimple)](<../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb.md>)

## See also

- [Queries in LINQ to Entities](queries-in-linq-to-entities.md)
