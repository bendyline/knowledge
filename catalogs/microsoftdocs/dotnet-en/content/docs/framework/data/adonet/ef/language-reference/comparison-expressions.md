---
description: "Learn more about: Comparison Expressions"
title: "Comparison Expressions"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: ec7637a9-01d5-4a95-8bb0-478311cd263b
---
# Comparison Expressions

A comparison expression checks whether a constant value, property value, or method result is equal, not equal, greater than, or less than another value. If a particular comparison is not valid for LINQ to Entities, an exception will be thrown. All comparisons, both implicit and explicit, require that all components are comparable in the data source. Comparison expressions are frequently used in `Where` clauses for restricting the query results.

 The following example in query expression syntax shows a query that returns results where the sales order number is equal to "SO43663":

 [DP L2E Conceptual Examples#RestrictionExpression (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DP L2E Conceptual Examples/CS/Program.cs#restrictionexpression)](<../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DP L2E Conceptual Examples/CS/Program.cs.md>)
 [DP L2E Conceptual Examples#RestrictionExpression (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Conceptual Examples/VB/Module1.vb#restrictionexpression)](<../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Conceptual Examples/VB/Module1.vb.md>)

 The following example in method-based query syntax shows a query that returns results where the sales order number is equal to "SO43663":

 [DP L2E Conceptual Examples#RestrictionExpression_MQ (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DP L2E Conceptual Examples/CS/Program.cs#restrictionexpression_mq)](<../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DP L2E Conceptual Examples/CS/Program.cs.md>)
 [DP L2E Conceptual Examples#RestrictionExpression_MQ (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Conceptual Examples/VB/Module1.vb#restrictionexpression_mq)](<../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Conceptual Examples/VB/Module1.vb.md>)

 The following example in query expression syntax shows a query that returns sales order information where the ship date is equal to July 8, 2001:

 [DP L2E Conceptual Examples#DateTimeComparison (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DP L2E Conceptual Examples/CS/Program.cs#datetimecomparison)](<../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DP L2E Conceptual Examples/CS/Program.cs.md>)
 [DP L2E Conceptual Examples#DateTimeComparison (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Conceptual Examples/VB/Module1.vb#datetimecomparison)](<../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Conceptual Examples/VB/Module1.vb.md>)

 The following example in method-based query syntax shows a query that returns sales order information where the ship date is equal to July 8, 2001:

 [DP L2E Conceptual Examples#DateTimeComparison_MQ (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DP L2E Conceptual Examples/CS/Program.cs#datetimecomparison_mq)](<../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DP L2E Conceptual Examples/CS/Program.cs.md>)
 [DP L2E Conceptual Examples#DateTimeComparison_MQ (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Conceptual Examples/VB/Module1.vb#datetimecomparison_mq)](<../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Conceptual Examples/VB/Module1.vb.md>)

 Expressions that yield a constant are converted at the server, and no attempt to do local evaluation is performed. The following example uses an expression in the `Where` clause that yields a constant.

 [DP L2E Conceptual Examples#ConstantExpression (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DP L2E Conceptual Examples/CS/Program.cs#constantexpression)](<../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DP L2E Conceptual Examples/CS/Program.cs.md>)
 [DP L2E Conceptual Examples#ConstantExpression (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Conceptual Examples/VB/Module1.vb#constantexpression)](<../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Conceptual Examples/VB/Module1.vb.md>)

 LINQ to Entities does not support using a user class as a constant. However, a property reference on a user class is considered a constant, and will be converted to a command tree constant expression and executed on the data source.

 [DP L2E Conceptual Examples#MyClass (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DP L2E Conceptual Examples/CS/Program.cs#myclass)](<../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DP L2E Conceptual Examples/CS/Program.cs.md>)
 [DP L2E Conceptual Examples#MyClass (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Conceptual Examples/VB/Module1.vb#myclass)](<../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Conceptual Examples/VB/Module1.vb.md>)

 [DP L2E Conceptual Examples#PropertyAsConstant (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DP L2E Conceptual Examples/CS/Program.cs#propertyasconstant)](<../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DP L2E Conceptual Examples/CS/Program.cs.md>)
 [DP L2E Conceptual Examples#PropertyAsConstant (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Conceptual Examples/VB/Module1.vb#propertyasconstant)](<../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Conceptual Examples/VB/Module1.vb.md>)

 Methods that return a constant expression are not supported. The following example contains a method in the `Where` clause that returns a constant. This example will throw an exception at runtime.

 [DP L2E Conceptual Examples#MethodAsConstantFails (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DP L2E Conceptual Examples/CS/Program.cs#methodasconstantfails)](<../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DP L2E Conceptual Examples/CS/Program.cs.md>)
 [DP L2E Conceptual Examples#MethodAsConstantFails (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Conceptual Examples/VB/Module1.vb#methodasconstantfails)](<../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Conceptual Examples/VB/Module1.vb.md>)

## See also

- [Expressions in LINQ to Entities Queries](expressions-in-linq-to-entities-queries.md)
