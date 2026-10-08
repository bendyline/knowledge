---
description: "Learn more about: Customizing Operations by Using Stored Procedures Exclusively"
title: "Customizing Operations by Using Stored Procedures Exclusively"
ms.date: "03/30/2017"
dev_langs: 
  - "csharp"
  - "vb"
ms.assetid: 441e8ef3-998c-4d12-8825-ce66a178f90f
---
# Customizing Operations by Using Stored Procedures Exclusively

Access to data by using only stored procedures is a common scenario.  
  
## Example  
  
### Description  

 You can modify the example provided in [Customizing Operations By Using Stored Procedures](customizing-operations-by-using-stored-procedures.md) by replacing even the first query (which causes dynamic SQL execution) with a method call that wraps a stored procedure.  
  
 Assume `CustomersByCity` is the method, as in the following example.  
  
### Code  

 [DLinqOverrideDefaultSproc#4 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqOverrideDefaultSproc/cs/northwind.cs#4)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqOverrideDefaultSproc/cs/northwind.cs.md)
 [DLinqOverrideDefaultSproc#4 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqOverrideDefaultSproc/vb/northwind.vb#4)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqOverrideDefaultSproc/vb/northwind.vb.md)  
  
 The following code executes without any dynamic SQL.  
  
 [DLinqOverrideDefaultSproc#5 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqOverrideDefaultSproc/cs/Program.cs#5)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqOverrideDefaultSproc/cs/Program.cs.md)
 [DLinqOverrideDefaultSproc#5 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqOverrideDefaultSproc/vb/Module1.vb#5)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqOverrideDefaultSproc/vb/Module1.vb.md)  
  
## See also

- [Responsibilities of the Developer In Overriding Default Behavior](responsibilities-of-the-developer-in-overriding-default-behavior.md)
