---
description: "Learn more about: How to: Handle Composite Keys in Queries"
title: "How to: Handle Composite Keys in Queries"
ms.date: "03/30/2017"
dev_langs: 
  - "csharp"
  - "vb"
ms.assetid: ce2f14fd-1038-458a-91e3-a078c61f0d10
---
# How to: Handle Composite Keys in Queries

Some operators can take only one argument. If your argument must include more than one column from the database, you must create an anonymous type to represent the combination.  
  
## Example 1

 The following example shows a query that invokes the `GroupBy` operator, which can take only one `key` argument.  
  
 [DLinqCompositeKeys#1 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqCompositeKeys/cs/Program.cs#1)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqCompositeKeys/cs/Program.cs.md)
 [DLinqCompositeKeys#1 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqCompositeKeys/vb/Module1.vb#1)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqCompositeKeys/vb/Module1.vb.md)  
  
## Example 2  

 The same situation pertains to joins, as in the following example:  
  
 [DLinqCompositeKeys#2 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqCompositeKeys/cs/Program.cs#2)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqCompositeKeys/cs/Program.cs.md)
 [DLinqCompositeKeys#2 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqCompositeKeys/vb/Module1.vb#2)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqCompositeKeys/vb/Module1.vb.md)  
  
## See also

- [Query Concepts](query-concepts.md)
