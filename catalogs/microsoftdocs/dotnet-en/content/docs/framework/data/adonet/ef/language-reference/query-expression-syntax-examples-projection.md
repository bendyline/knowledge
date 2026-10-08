---
description: "Learn more about: Query Expression Syntax Examples: Projection"
title: "Query Expression Syntax Examples: Projection"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 079926c5-e6b5-4fb9-b4cf-9c63886dd626
---
# Query Expression Syntax Examples: Projection

The examples in this topic demonstrate how to use the `Select` method and the `From … From …` keywords to query the [AdventureWorks Sales Model](https://github.com/Microsoft/sql-server-samples/releases/tag/adventureworks) using query expression syntax. `From … From …` is the query based equivalent of the `SelectMany` method. The AdventureWorks Sales model used in these examples is built from the Contact, Address, Product, SalesOrderHeader, and SalesOrderDetail tables in the AdventureWorks sample database.

 The examples in this topic use the following `using`/`Imports` statements:

 [DP L2E Examples#ImportsUsing (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs#importsusing)](<../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs.md>)
 [DP L2E Examples#ImportsUsing (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb#importsusing)](<../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb.md>)

## Select

### Example

 The following example uses the [System.Linq.Enumerable.Select*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Select*) method to return all the rows from the `Product` table and display the product names.

 [DP L2E Examples#SelectSimple1 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs#selectsimple1)](<../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs.md>)
 [DP L2E Examples#SelectSimple1 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb#selectsimple1)](<../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb.md>)

### Example

 The following example uses [System.Linq.Enumerable.Select*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Select*) to return a sequence of only product names.

 [DP L2E Examples#SelectSimple2 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs#selectsimple2)](<../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs.md>)
 [DP L2E Examples#SelectSimple2 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb#selectsimple2)](<../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb.md>)

### Example

 The following example uses the [System.Linq.Queryable.Select*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.Select*) method to project the `Product.Name` and `Product.ProductID` properties into a sequence of anonymous types.

 [DP L2E Examples#SelectAnonymousTypes (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs#selectanonymoustypes)](<../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs.md>)
 [DP L2E Examples#SelectAnonymousTypes (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb#selectanonymoustypes)](<../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb.md>)

## From … From … (SelectMany)

### Example

 The following example uses `From … From …` (the equivalent of the [System.Linq.Enumerable.SelectMany*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.SelectMany*) method) to select all orders where `TotalDue` is less than 500.00.

 [DP L2E Examples#SelectManyCompoundFrom (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs#selectmanycompoundfrom)](<../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs.md>)
 [DP L2E Examples#SelectManyCompoundFrom (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb#selectmanycompoundfrom)](<../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb.md>)

### Example

 The following example uses `From … From …` (the equivalent of the [System.Linq.Enumerable.SelectMany*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.SelectMany*) method) to select all orders where the order was made on October 1, 2002 or later.

 [DP L2E Examples#SelectManyCompoundFrom2 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs#selectmanycompoundfrom2)](<../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs.md>)
 [DP L2E Examples#SelectManyCompoundFrom2 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb#selectmanycompoundfrom2)](<../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb.md>)

### Example

 The following example uses a `From … From …` (the equivalent of the [System.Linq.Enumerable.SelectMany*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.SelectMany*) method) to select all orders where the order total is greater than 10000.00 and uses `From` assignment to avoid requesting the total twice.

 [DP L2E Examples#SelectManyFromAssignment (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs#selectmanyfromassignment)](<../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs.md>)
 [DP L2E Examples#SelectManyFromAssignment (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb#selectmanyfromassignment)](<../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb.md>)

## See also

- [Queries in LINQ to Entities](queries-in-linq-to-entities.md)
