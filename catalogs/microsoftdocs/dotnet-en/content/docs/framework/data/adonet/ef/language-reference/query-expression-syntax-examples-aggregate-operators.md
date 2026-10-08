---
description: "Learn more about: Query Expression Syntax Examples: Aggregate Operators"
title: "Query Expression Syntax Examples: Aggregate Operators"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: d729120c-4c1b-4f34-bbe9-33694fca2dde
---
# Query Expression Syntax Examples: Aggregate Operators

The examples in this topic demonstrate how to use the [System.Linq.Enumerable.Average*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Average*), [System.Linq.Enumerable.Count*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Count*), [System.Linq.Enumerable.Max*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Max*), [System.Linq.Enumerable.Min*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Min*), and [System.Linq.Enumerable.Sum*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Sum*) methods to query the [AdventureWorks Sales Model](https://github.com/Microsoft/sql-server-samples/releases/tag/adventureworks) using query expression syntax. The AdventureWorks Sales Model used in these examples is built from the Contact, Address, Product, SalesOrderHeader, and SalesOrderDetail tables in the AdventureWorks sample database.

 The examples in this topic use the following `using`/`Imports` statements:

 [DP L2E Examples#ImportsUsing (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs#importsusing)](<../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs.md>)
 [DP L2E Examples#ImportsUsing (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb#importsusing)](<../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb.md>)

## Average

### Example

 The following example uses the [System.Linq.Enumerable.Average*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Average*) method to find the average list price of the products of each style.

 [DP L2E Examples#Average2_MQ (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs#average2_mq)](<../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs.md>)
 [DP L2E Examples#Average2_MQ (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb#average2_mq)](<../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb.md>)

### Example

 The following example uses [System.Linq.Enumerable.Average*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Average*) to get the average total due for each contact ID.

 [DP L2E Examples#AverageGrouped_MQ (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs#averagegrouped_mq)](<../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs.md>)
 [DP L2E Examples#AverageGrouped_MQ (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb#averagegrouped_mq)](<../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb.md>)

### Example

 The following example uses [System.Linq.Enumerable.Average*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Average*) to get the orders with the average total due for each contact.

 [DP L2E Examples#AverageElements_MQ (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs#averageelements_mq)](<../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs.md>)
 [DP L2E Examples#AverageElements_MQ (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb#averageelements_mq)](<../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb.md>)

## Count

### Example

 The following example uses [System.Linq.Enumerable.Count*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Count*) to return a list of contact IDs and how many orders each has.

 [DP L2E Examples#CountNested (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs#countnested)](<../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs.md>)
 [DP L2E Examples#CountNested (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb#countnested)](<../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb.md>)

### Example

 The following example groups products by color and uses [System.Linq.Enumerable.Count*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Count*) to return the number of products in each color group.

 [DP L2E Examples#CountGrouped (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs#countgrouped)](<../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs.md>)
 [DP L2E Examples#CountGrouped (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb#countgrouped)](<../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb.md>)

## Max

### Example

 The following example uses the [System.Linq.Enumerable.Max*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Max*) method to get the largest total due for each contact ID.

 [DP L2E Examples#MaxGrouped_MQ (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs#maxgrouped_mq)](<../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs.md>)
 [DP L2E Examples#MaxGrouped_MQ (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb#maxgrouped_mq)](<../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb.md>)

### Example

 The following example uses the [System.Linq.Enumerable.Max*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Max*) method to get the orders with the largest total due for each contact ID.

 [DP L2E Examples#MaxElements_MQ (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs#maxelements_mq)](<../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs.md>)
 [DP L2E Examples#MaxElements_MQ (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb#maxelements_mq)](<../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb.md>)

## Min

### Example

 The following example uses the [System.Linq.Enumerable.Min*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Min*) method to get the smallest total due for each contact ID.

 [DP L2E Examples#MinGrouped_MQ (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs#mingrouped_mq)](<../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs.md>)
 [DP L2E Examples#MinGrouped_MQ (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb#mingrouped_mq)](<../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb.md>)

### Example

 The following example uses the [System.Linq.Enumerable.Min*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Min*) method to get the orders with the smallest total due for each contact.

 [DP L2E Examples#MinElements_MQ (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs#minelements_mq)](<../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs.md>)
 [DP L2E Examples#MinElements_MQ (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb#minelements_mq)](<../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb.md>)

## Sum

### Example

 The following example uses the [System.Linq.Enumerable.Sum*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Sum*) method to get the total due for each contact ID.

 [DP L2E Examples#SumGrouped_MQ (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs#sumgrouped_mq)](<../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs.md>)
 [DP L2E Examples#SumGrouped_MQ (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb#sumgrouped_mq)](<../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb.md>)

## See also

- [Queries in LINQ to Entities](queries-in-linq-to-entities.md)
