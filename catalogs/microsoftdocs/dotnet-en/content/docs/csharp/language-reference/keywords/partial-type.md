---
description: "A partial type is a type declaration that allows you to split the declaration of the type into multiple files."
title: "Partial type"
ms.date: 01/22/2026
f1_keywords: 
  - "partialtype"
  - "partialtype_CSharpKeyword"
helpviewer_keywords: 
  - "partial types [C#]"
---
# Partial type (C# Reference)

Partial type definitions allow you to split the definition of a class, struct, interface, or record into multiple definitions. You can put these multiple definitions in different files within the same project. One type declaration contains only the signatures for [partial members](partial-member.md):

[language="csharp" source="./snippets/PartialMembers.cs" id="DeclaringPart"::: (complete source file; reference: ./snippets/PartialMembers.cs)](../../../../_code/docs/csharp/language-reference/keywords/snippets/PartialMembers.cs.md)

The other declaration contains the implementation of the partial members:

[language="csharp" source="./snippets/PartialMembers.cs" id="ImplementingPart"::: (complete source file; reference: ./snippets/PartialMembers.cs)](../../../../_code/docs/csharp/language-reference/keywords/snippets/PartialMembers.cs.md)

The declarations for a partial type can appear in either the same or multiple files. Typically, the two declarations are in different files. You split a class, struct, or interface type when you're working with large projects, with automatically generated code such as that provided by the [Windows Forms Designer](https://learn.microsoft.com/dotnet/desktop/winforms/controls/developing-windows-forms-controls-at-design-time), or [Source generators like RegEx](../../../standard/base-types/regular-expression-source-generators.md). A partial type can contain [partial members](partial-member.md).


The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the [C# language version history](../../whats-new/csharp-version-history.md).


Starting with C# 13, you can define partial properties and partial indexers. Starting with C# 14, you can define partial instance constructors and partial events. Before C# 13, only methods could be defined as partial members.

You can provide documentation comments on either the declaring declaration or the implementing declaration. When you apply documentation comments to both type declarations, the XML elements from each declaration are included in the output XML. For the rules on partial member declarations, see the article on [partial members](partial-member.md).

You can apply attributes to either declaration. The compiler combines all attributes from both declarations, including duplicates.

For more information, see [Partial Classes and Methods](../../programming-guide/classes-and-structs/partial-classes-and-methods.md).

## C# language specification

For more information, see the [C# Language Specification](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/includes/~/_csharpstandard/standard/README.md). The language specification is the definitive source for C# syntax and usage.


## See also

- [Modifiers](index.md)
- [Introduction to Generics](../../fundamentals/types/generics.md)
