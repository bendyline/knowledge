---
description: "Learn more about: Convert a Type to a Generic IEnumerable"
title: "Convert a Type to a Generic IEnumerable"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 64774fb5-7447-4296-ad3b-8a94346f99a1
---
# Convert a Type to a Generic IEnumerable

Use [System.Linq.Enumerable.AsEnumerable*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.AsEnumerable*) to return the argument typed as a generic `IEnumerable`.

## Example

 In this example, LINQ to SQL
 (using the default generic `Query`) would try to convert the query to SQL and execute it on the server. But the `where` clause references a user-defined client-side method (`isValidProduct`), which cannot be converted to SQL.

 The solution is to specify the client-side generic [System.Collections.Generic.IEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%601) implementation of `where` to replace the generic [System.Linq.IQueryable`1](https://learn.microsoft.com/search/?terms=System.Linq.IQueryable%601). You do this by invoking the [System.Linq.Enumerable.AsEnumerable*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.AsEnumerable*) operator.

 [DLinqQueryExamples#46 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqQueryExamples/cs/Program.cs#46)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqQueryExamples/cs/Program.cs.md)
 [DLinqQueryExamples#46 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqQueryExamples/vb/Module1.vb#46)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqQueryExamples/vb/Module1.vb.md)

## See also

- [Query Examples](query-examples.md)
