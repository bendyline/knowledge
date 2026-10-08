---
description: "Learn more about: Initialization Expressions"
title: "Initialization Expressions"
ms.date: "03/30/2017"
dev_langs: 
  - "csharp"
  - "vb"
ms.assetid: 98daef1f-15d4-483e-985c-d78ea3abe8c8
---
# Initialization Expressions

An initialization expression initializes a new object. Most initialization expressions are supported, including most new C# 3.0 and Visual Basic 9.0 initialization expressions. The following types can be initialized and returned by a LINQ to Entities query:  
  
- A collection of zero or more typed entity objects or a projection of complex types that are defined in the conceptual model.  
  
- CLR types supported by the Entity Framework.
  
- Inline collections.  
  
- Anonymous types.  
  
 Anonymous type initialization is shown in the following example in query expression syntax:  
  
 [DP L2E Conceptual Examples#AnonymousTypeInitialization (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DP L2E Conceptual Examples/CS/Program.cs#anonymoustypeinitialization)](<../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DP L2E Conceptual Examples/CS/Program.cs.md>)
 [DP L2E Conceptual Examples#AnonymousTypeInitialization (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Conceptual Examples/VB/Module1.vb#anonymoustypeinitialization)](<../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Conceptual Examples/VB/Module1.vb.md>)  
  
 The following example in method-based query syntax shows anonymous type initialization:  
  
 [DP L2E Conceptual Examples#AnonymousTypeInitialization_MQ (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DP L2E Conceptual Examples/CS/Program.cs#anonymoustypeinitialization_mq)](<../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DP L2E Conceptual Examples/CS/Program.cs.md>)
 [DP L2E Conceptual Examples#AnonymousTypeInitialization_MQ (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Conceptual Examples/VB/Module1.vb#anonymoustypeinitialization_mq)](<../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Conceptual Examples/VB/Module1.vb.md>)  
  
 User-defined class initialization is also supported. The C# 3.0 and Visual Basic 9.0 initialization pattern is supported and assumes that the property getter and setter are symmetric. The following example in query expression syntax shows a custom class being initialized in the query:  
  
 [DP L2E Conceptual Examples#MyOrder (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DP L2E Conceptual Examples/CS/Program.cs#myorder)](<../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DP L2E Conceptual Examples/CS/Program.cs.md>)
 [DP L2E Conceptual Examples#MyOrder (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Conceptual Examples/VB/Module1.vb#myorder)](<../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Conceptual Examples/VB/Module1.vb.md>)  
  
 [DP L2E Conceptual Examples#TypeInitialization (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DP L2E Conceptual Examples/CS/Program.cs#typeinitialization)](<../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DP L2E Conceptual Examples/CS/Program.cs.md>)
 [DP L2E Conceptual Examples#TypeInitialization (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Conceptual Examples/VB/Module1.vb#typeinitialization)](<../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Conceptual Examples/VB/Module1.vb.md>)  
  
 The following example in method-based query syntax shows a custom class being initialized in the query:  
  
 [DP L2E Conceptual Examples#TypeInitialization_MQ (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DP L2E Conceptual Examples/CS/Program.cs#typeinitialization_mq)](<../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DP L2E Conceptual Examples/CS/Program.cs.md>)
 [DP L2E Conceptual Examples#TypeInitialization_MQ (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Conceptual Examples/VB/Module1.vb#typeinitialization_mq)](<../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Conceptual Examples/VB/Module1.vb.md>)  
  
## See also

- [Expressions in LINQ to Entities Queries](expressions-in-linq-to-entities-queries.md)
