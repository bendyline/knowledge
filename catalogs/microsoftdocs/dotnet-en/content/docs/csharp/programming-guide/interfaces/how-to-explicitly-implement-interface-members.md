---
title: "How to explicitly implement interface members"
description: Learn how to explicitly implement interface members in this C# example. The members are accessed through the interface instance.
ms.date: 07/20/2015
ms.topic: how-to
helpviewer_keywords: 
  - "interfaces [C#], explicitly implementing"
ms.assetid: 514cde76-f981-474e-8b40-9493619f899c
---
# How to explicitly implement interface members (C# Programming Guide)

This example declares an [interface](../../language-reference/keywords/interface.md), `IDimensions`, and a class, `Box`, which explicitly implements the interface members `GetLength` and `GetWidth`. The members are accessed through the interface instance `dimensions`.  
  
## Example  

 [csProgGuideInheritance#8 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_VBCSharp/csProgGuideInheritance/CS/Inheritance.cs#8)](../../../../_code/samples/snippets/csharp/VS_Snippets_VBCSharp/csProgGuideInheritance/CS/Inheritance.cs.md)  
  
## Robust Programming  
  
- Notice that the following lines, in the `Main` method, are commented out because they would produce compilation errors. An interface member that is explicitly implemented cannot be accessed from a [class](../../language-reference/keywords/class.md) instance:  
  
     [csProgGuideInheritance#45 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_VBCSharp/csProgGuideInheritance/CS/Inheritance.cs#45)](../../../../_code/samples/snippets/csharp/VS_Snippets_VBCSharp/csProgGuideInheritance/CS/Inheritance.cs.md)  
  
- Notice also that the following lines, in the `Main` method, successfully print out the dimensions of the box because the methods are being called from an instance of the interface:  
  
     [csProgGuideInheritance#46 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_VBCSharp/csProgGuideInheritance/CS/Inheritance.cs#46)](../../../../_code/samples/snippets/csharp/VS_Snippets_VBCSharp/csProgGuideInheritance/CS/Inheritance.cs.md)  
  
## See also

- [Object oriented programming](../../fundamentals/object-oriented/index.md)
- [Interfaces](../../fundamentals/types/interfaces.md)
- [How to explicitly implement members of two interfaces](how-to-explicitly-implement-members-of-two-interfaces.md)
