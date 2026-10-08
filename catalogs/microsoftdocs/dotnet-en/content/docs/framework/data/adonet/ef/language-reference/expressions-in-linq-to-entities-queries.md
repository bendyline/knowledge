---
description: "Learn more about: Expressions in LINQ to Entities Queries"
title: "Expressions in LINQ to Entities Queries"
ms.date: "03/30/2017"
dev_langs: 
  - "csharp"
  - "vb"
ms.assetid: d70b502f-6a15-4120-b4fe-500b173ad9cc
---
# Expressions in LINQ to Entities Queries

An expression is a fragment of code that can be evaluated to a single value, object, method, or namespace. Expressions can contain a literal value, a method call, an operator and its operands, or a simple name. Simple names can be the name of a variable, type member, method parameter, namespace or type. Expressions can use operators that in turn use other expressions as parameters, or method calls whose parameters are in turn other method calls. Therefore, expressions can range from simple to very complex.  
  
 In LINQ to Entities queries, expressions can contain anything allowed by the types within the [System.Linq.Expressions](https://learn.microsoft.com/search/?terms=System.Linq.Expressions) namespace, including lambda expressions. The expressions that can be used in LINQ to Entities queries are a superset of the expressions that can be used to query the Entity Framework. Expressions that are part of queries against the Entity Framework are limited to operations supported by `ObjectQuery<T>` and the underlying data source.  
  
 In the following example, the comparison in the `Where` clause is an expression:  
  
 [DP L2E Conceptual Examples#WhereExpression (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DP L2E Conceptual Examples/CS/Program.cs#whereexpression)](<../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DP L2E Conceptual Examples/CS/Program.cs.md>)
 [DP L2E Conceptual Examples#WhereExpression (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Conceptual Examples/VB/Module1.vb#whereexpression)](<../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Conceptual Examples/VB/Module1.vb.md>)  
  
> **Note:**
> Specific language constructs, such as C# `unchecked`, have no meaning in LINQ to Entities.  
  
## In This Section  

 [Constant Expressions](constant-expressions.md)  
  
 [Comparison Expressions](comparison-expressions.md)  
  
 [Null Comparisons](null-comparisons.md)  
  
 [Initialization Expressions](initialization-expressions.md)  
  
 [Relationships, navigation properties and foreign keys](https://learn.microsoft.com/ef/ef6/fundamentals/relationships)  
  
## See also

- [ADO.NET Entity Framework](../index.md)
