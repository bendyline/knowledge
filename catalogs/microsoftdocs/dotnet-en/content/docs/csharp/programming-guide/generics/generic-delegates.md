---
title: "Generic Delegates"
description: Learn about using generic delegates in C#. See code examples and view additional available resources.
ms.date: 07/20/2015
helpviewer_keywords: 
  - "generics [C#], delegates"
  - "delegates [C#], generic"
ms.assetid: bdea509c-44c1-4309-aaa9-15c7aee009df
---
# Generic Delegates (C# Programming Guide)

A [delegate](../../language-reference/builtin-types/reference-types.md) can define its own type parameters. Code that references the generic delegate can specify the type argument to create a closed constructed type, just like when instantiating a generic class or calling a generic method, as shown in the following example:  
  
 [csProgGuideGenerics#36 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_VBCSharp/csProgGuideGenerics/CS/Generics.cs#36)](../../../../_code/samples/snippets/csharp/VS_Snippets_VBCSharp/csProgGuideGenerics/CS/Generics.cs.md)  
  
 C# version 2.0 has a new feature called method group conversion, which applies to concrete as well as generic delegate types, and enables you to write the previous line with this simplified syntax:  
  
 [csProgGuideGenerics#37 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_VBCSharp/csProgGuideGenerics/CS/Generics.cs#37)](../../../../_code/samples/snippets/csharp/VS_Snippets_VBCSharp/csProgGuideGenerics/CS/Generics.cs.md)  
  
 Delegates defined within a generic class can use the generic class type parameters in the same way that class methods do.  
  
 [csProgGuideGenerics#38 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_VBCSharp/csProgGuideGenerics/CS/Generics.cs#38)](../../../../_code/samples/snippets/csharp/VS_Snippets_VBCSharp/csProgGuideGenerics/CS/Generics.cs.md)  
  
 Code that references the delegate must specify the type argument of the containing class, as follows:  
  
 [csProgGuideGenerics#39 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_VBCSharp/csProgGuideGenerics/CS/Generics.cs#39)](../../../../_code/samples/snippets/csharp/VS_Snippets_VBCSharp/csProgGuideGenerics/CS/Generics.cs.md)  
  
 Generic delegates are especially useful in defining events based on the typical design pattern because the sender argument can be strongly typed and no longer has to be cast to and from [System.Object](https://learn.microsoft.com/search/?terms=System.Object).  
  
 [csProgGuideGenerics#40 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_VBCSharp/csProgGuideGenerics/CS/Generics.cs#40)](../../../../_code/samples/snippets/csharp/VS_Snippets_VBCSharp/csProgGuideGenerics/CS/Generics.cs.md)  
  
## See also

- [System.Collections.Generic](https://learn.microsoft.com/search/?terms=System.Collections.Generic)
- [Introduction to Generics](../../fundamentals/types/generics.md)
- [Generic Methods](generic-methods.md)
- [Generic Classes](generic-classes.md)
- [Generic Interfaces](generic-interfaces.md)
- [Delegates](../delegates/index.md)
- [Generics](../../../standard/generics/index.md)
