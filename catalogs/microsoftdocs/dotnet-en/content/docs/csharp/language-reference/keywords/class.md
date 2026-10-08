---
description: "class keyword - C# Reference"
title: "class keyword"
ms.date: 01/21/2026
f1_keywords: 
  - "class_CSharpKeyword"
  - "class"
helpviewer_keywords: 
  - "class keyword [C#]"
---
# class (C# Reference)

Declare classes by using the `class` keyword, as shown in the following example:

```csharp
class TestClass
{
    // Methods, properties, fields, events, delegates
    // and nested classes go here.
}
```

C# supports only single inheritance. In other words, a class can inherit implementation from one base class only. However, a class can implement more than one interface.


The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the [C# language version history](../../whats-new/csharp-version-history.md).


For more information on classes, interfaces, and inheritance see the article on [inheritance](../../fundamentals/object-oriented/inheritance.md) in the fundamentals section.

You can declare classes directly within a namespace. Don't nest these classes within other classes. You can make these classes either [`public`](public.md) or [`internal`](internal.md). By default, classes are `internal`.

You can declare class members, including nested classes, as [`public`](public.md), [`protected internal`](protected-internal.md), [`protected`](protected.md), [`internal`](internal.md), [`private`](private.md), or [`private protected`](private-protected.md). By default, members are `private`.

For more information, see [Access Modifiers](../../programming-guide/classes-and-structs/access-modifiers.md).

You can declare generic classes that have type parameters. For more information, see [Generic Classes](../../programming-guide/generics/generic-classes.md).

A class can contain declarations of the following members:

- [Constructors](../../programming-guide/classes-and-structs/constructors.md)
- [Constants](../../programming-guide/classes-and-structs/constants.md)
- [Fields](../../programming-guide/classes-and-structs/fields.md)
- [Finalizers](../../programming-guide/classes-and-structs/finalizers.md)
- [Methods](../../programming-guide/classes-and-structs/methods.md)
- [Properties](../../programming-guide/classes-and-structs/properties.md)
- [Indexers](../../programming-guide/indexers/index.md)
- [Operators](../operators/index.md)
- [Events](../../programming-guide/events/index.md)
- [Delegates](../../programming-guide/delegates/index.md)
- [Classes](../../fundamentals/types/classes.md)
- [Interfaces](../../fundamentals/types/interfaces.md)
- [Structure types](../builtin-types/struct.md)
- [Enumeration types](../builtin-types/enum.md)

## Example

The following example demonstrates declaring class fields, constructors, and methods. It also demonstrates object instantiation and printing instance data. In this example, two classes are declared. The first class, `Child`, contains two private fields (`name` and `age`), two public constructors, and one public method. The second class, `StringTest`, contains `Main`.

[language="csharp" source="./snippets/keywordsTypes.cs" id="5"::: (complete source file; reference: ./snippets/keywordsTypes.cs)](../../../../_code/docs/csharp/language-reference/keywords/snippets/keywordsTypes.cs.md)

## Comments

You can only access the private fields (`name` and `age`) through the public method of the `Child` class. For example, you can't print the child's name from the `Main` method by using a statement like this:

```csharp
Console.Write(child1.name);   // Error
```

Accessing private members of `Child` from `Main` is only possible if `Main` is a member of the class. Types declared inside a class without an access modifier default to `private`, so the data members in this example are still `private` if the keyword is removed. Finally, for the object created by using the parameterless constructor (`child3`), the `age` field is initialized to zero by default.

## C# language specification

For more information, see the [C# Language Specification](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/includes/~/_csharpstandard/standard/README.md). The language specification is the definitive source for C# syntax and usage.


## See also

- [C# Keywords](index.md)
- [Reference Types](reference-types.md)
