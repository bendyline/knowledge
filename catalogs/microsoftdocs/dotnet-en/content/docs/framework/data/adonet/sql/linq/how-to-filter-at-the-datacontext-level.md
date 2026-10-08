---
description: "Learn more about: How to: Filter at the DataContext Level"
title: "How to: Filter at the DataContext Level"
ms.date: "03/30/2017"
dev_langs: 
  - "csharp"
  - "vb"
ms.assetid: 15505cd7-0df2-427a-9f86-e0f96f60ee2e
---
# How to: Filter at the DataContext Level

You can filter `EntitySets` at the `DataContext` level. Such filters apply to all queries done with that [System.Data.Linq.DataContext](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext) instance.  
  
## Example  

 In the following example, [System.Data.Linq.DataLoadOptions.AssociateWith%28System.Linq.Expressions.LambdaExpression%29](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataLoadOptions.AssociateWith%2528System.Linq.Expressions.LambdaExpression%2529) is used to filter the pre-loaded orders for customers by `ShippedDate`.  
  
 [DLinqQueryConcepts#10 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqQueryConcepts/cs/Program.cs#10)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqQueryConcepts/cs/Program.cs.md)
 [DLinqQueryConcepts#10 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqQueryConcepts/vb/Module1.vb#10)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqQueryConcepts/vb/Module1.vb.md)  
  
## See also

- [Query Concepts](query-concepts.md)
