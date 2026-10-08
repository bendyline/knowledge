---
description: "Learn more about: How to: Call Canonical Functions"
title: "How to: Call Canonical Functions"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: b3d84873-7403-4957-8e20-b4ae39f50214
---
# How to: Call Canonical Functions

The [System.Data.Objects.EntityFunctions](https://learn.microsoft.com/search/?terms=System.Data.Objects.EntityFunctions) class contains methods that expose canonical functions to use in LINQ to Entities queries. For information about canonical functions, see [Canonical Functions](canonical-functions.md).

> **Note:**
> The [System.Data.Objects.EntityFunctions.AsUnicode*](https://learn.microsoft.com/search/?terms=System.Data.Objects.EntityFunctions.AsUnicode*) and [System.Data.Objects.EntityFunctions.AsNonUnicode*](https://learn.microsoft.com/search/?terms=System.Data.Objects.EntityFunctions.AsNonUnicode*) methods in the [System.Data.Objects.EntityFunctions](https://learn.microsoft.com/search/?terms=System.Data.Objects.EntityFunctions) class do not have canonical function equivalents.

 Canonical functions that perform a calculation on a set of values and return a single value (also known as aggregate canonical functions) can be directly invoked. Other canonical functions can only be called as part of a LINQ to Entities query. To call an aggregate function directly, you must pass an [System.Data.Objects.ObjectQuery`1](https://learn.microsoft.com/search/?terms=System.Data.Objects.ObjectQuery%601) to the function. For more information, see the second example below.

 You can call some canonical functions by using common language runtime (CLR) methods in LINQ to Entities queries. For a list of CLR methods that map to canonical functions, see [CLR Method to Canonical Function Mapping](clr-method-to-canonical-function-mapping.md).

## Example 1

 The following example uses the [AdventureWorks Sales Model](https://github.com/Microsoft/sql-server-samples/releases/tag/adventureworks). The example executes a LINQ to Entities query that uses the [System.Data.Objects.EntityFunctions.DiffDays*](https://learn.microsoft.com/search/?terms=System.Data.Objects.EntityFunctions.DiffDays*) method to return all products for which the difference between `SellEndDate` and `SellStartDate` is less than 365 days:

 [DP L2E CanonicalAndStoreFunctions#1 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/dp l2e canonicalandstorefunctions/cs/program.cs#1)](<../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/dp l2e canonicalandstorefunctions/cs/program.cs.md>)
 [DP L2E CanonicalAndStoreFunctions#1 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/dp l2e canonicalandstorefunctions/vb/module1.vb#1)](<../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/dp l2e canonicalandstorefunctions/vb/module1.vb.md>)

## Example 2

 The following example uses the [AdventureWorks Sales Model](https://github.com/Microsoft/sql-server-samples/releases/tag/adventureworks). The example calls the aggregate [System.Data.Objects.EntityFunctions.StandardDeviation*](https://learn.microsoft.com/search/?terms=System.Data.Objects.EntityFunctions.StandardDeviation*) method directly to return the standard deviation of `SalesOrderHeader` subtotals. Note that an [System.Data.Objects.ObjectQuery`1](https://learn.microsoft.com/search/?terms=System.Data.Objects.ObjectQuery%601) is passed to the function, which allows it to be called without being part of a LINQ to Entities query.

 [DP L2E CanonicalAndStoreFunctions#2 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/dp l2e canonicalandstorefunctions/cs/program.cs#2)](<../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/dp l2e canonicalandstorefunctions/cs/program.cs.md>)
 [DP L2E CanonicalAndStoreFunctions#2 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/dp l2e canonicalandstorefunctions/vb/module1.vb#2)](<../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/dp l2e canonicalandstorefunctions/vb/module1.vb.md>)

## See also

- [Calling Functions in LINQ to Entities Queries](calling-functions-in-linq-to-entities-queries.md)
- [Queries in LINQ to Entities](queries-in-linq-to-entities.md)
