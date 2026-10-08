---
title: "How to explicitly implement members of two interfaces"
description: Learn how to explicitly implement two interfaces that have the same member names and give each interface member a separate implementation in this C# example.
ms.date: 07/20/2015
ms.topic: how-to
helpviewer_keywords: 
  - "inheritance [C#], explicitly implementing interface members"
  - "interfaces [C#], explicitly implementing with inheritance"
ms.assetid: 8b402ddc-dff9-4869-89cb-d718c764e68e
---
# How to explicitly implement members of two interfaces (C# Programming Guide)

Explicit [interface](../../language-reference/keywords/interface.md) implementation also allows the programmer to implement two interfaces that have the same member names and give each interface member a separate implementation. This example displays the dimensions of a box in both metric and English units. The Box [class](../../language-reference/keywords/class.md) implements two interfaces IEnglishDimensions and IMetricDimensions, which represent the different measurement systems. Both interfaces have identical member names, Length and Width.  
  
## Example  

 [csProgGuideInheritance#9 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_VBCSharp/csProgGuideInheritance/CS/Inheritance.cs#9)](../../../../_code/samples/snippets/csharp/VS_Snippets_VBCSharp/csProgGuideInheritance/CS/Inheritance.cs.md)  
  
## Robust Programming  

 If you want to make the default measurements in English units, implement the methods Length and Width normally, and explicitly implement the Length and Width methods from the IMetricDimensions interface:  
  
 [csProgGuideInheritance#10 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_VBCSharp/csProgGuideInheritance/CS/Inheritance.cs#10)](../../../../_code/samples/snippets/csharp/VS_Snippets_VBCSharp/csProgGuideInheritance/CS/Inheritance.cs.md)  
  
 In this case, you can access the English units from the class instance and access the metric units from the interface instance:  
  
 [csProgGuideInheritance#11 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_VBCSharp/csProgGuideInheritance/CS/Inheritance.cs#11)](../../../../_code/samples/snippets/csharp/VS_Snippets_VBCSharp/csProgGuideInheritance/CS/Inheritance.cs.md)  
  
## See also

- [Object oriented programming](../../fundamentals/object-oriented/index.md)
- [Interfaces](../../fundamentals/types/interfaces.md)
- [How to explicitly implement interface members](how-to-explicitly-implement-interface-members.md)
