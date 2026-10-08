---
description: "virtual - C# Reference"
title: "virtual keyword"
ms.date: 01/22/2026
f1_keywords: 
  - "virtual_CSharpKeyword"
  - "virtual"
helpviewer_keywords: 
  - "virtual keyword [C#]"
---
# virtual (C# Reference)

Use the `virtual` keyword to modify a method, property, indexer, or event declaration and allow a derived class to override it.


The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the [C# language version history](../../whats-new/csharp-version-history.md).


For example, any class that inherits this method can override it:

```csharp
public virtual double Area()
{
    return x * y;
}
```

An [overriding member](override.md) in a derived class can change the implementation of a virtual member. For more information about how to use the `virtual` keyword, see [Versioning with the Override and New Keywords](../../programming-guide/classes-and-structs/versioning-with-the-override-and-new-keywords.md) and [Knowing When to Use Override and New Keywords](../../programming-guide/classes-and-structs/knowing-when-to-use-override-and-new-keywords.md).

When you invoke a virtual method, the runtime checks the type of the object for an overriding member. It calls the overriding member in the most derived class. If no derived class overrides the member, the original member is called.

By default, methods are non-virtual. You can't override a non-virtual method.

The following example shows a virtual property:

[language="csharp" source="./snippets/csrefKeywordsModifiers.cs" id="26"::: (complete source file; reference: ./snippets/csrefKeywordsModifiers.cs)](../../../../_code/docs/csharp/language-reference/keywords/snippets/csrefKeywordsModifiers.cs.md)

Virtual properties behave like virtual methods, except for the differences in declaration and invocation syntax.

- A virtual inherited property can be overridden in a derived class by including a property declaration that uses the `override` modifier.

## Example

In this example, the `Shape` class contains the two coordinates `x` and `y`, and the `Area()` virtual method. Different shape classes such as `Circle`, `Cylinder`, and `Sphere` inherit the `Shape` class, and the surface area is calculated for each figure. Each derived class has its own override implementation of `Area()`.

The inherited classes `Circle`, `Cylinder`, and `Sphere` all use constructors that initialize the base class, as shown in the following declaration.

```csharp
public Cylinder(double r, double h): base(r, h) {}
```

The following program calculates and displays the appropriate area for each figure by invoking the appropriate implementation of the `Area()` method, according to the object that is associated with the method.

[language="csharp" source="./snippets/csrefKeywordsModifiers.cs" id="23"::: (complete source file; reference: ./snippets/csrefKeywordsModifiers.cs)](../../../../_code/docs/csharp/language-reference/keywords/snippets/csrefKeywordsModifiers.cs.md)

## C# language specification

For more information, see the [C# Language Specification](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/includes/~/_csharpstandard/standard/README.md). The language specification is the definitive source for C# syntax and usage.


## See also

- [Polymorphism](../../fundamentals/object-oriented/polymorphism.md)
- [abstract](abstract.md)
- [override](override.md)
- [new (modifier)](new-modifier.md)
