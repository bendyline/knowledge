---
description: "required modifier - C# Reference"
title: "required modifier"
ms.date: 01/22/2026
f1_keywords: 
  - "required_CSharpKeyword"
helpviewer_keywords: 
  - "required  keyword [C#]"
---
# required modifier (C# Reference)

The `required` modifier indicates that the *field* or *property* it applies to must be initialized by an [object initializer](../../programming-guide/classes-and-structs/object-and-collection-initializers.md). Any expression that initializes a new instance of the type must initialize all *required members*. The `required` modifier is available starting with C# 11.


The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the [C# language version history](../../whats-new/csharp-version-history.md).


By using the `required` modifier, developers can create types where properties or fields must be properly initialized, yet still allow initialization through object initializers. Several rules ensure this behavior:

- Apply the `required` modifier to *fields* and *properties* declared in `struct` and `class` types, including `record` and `record struct` types. You can't apply the `required` modifier to members of an `interface`.
- You can't mark explicit interface implementations as `required`. You can't set them in object initializers.
- You must initialize required members, but you can initialize them to `null`. If the type is a non-nullable reference type, the compiler issues a warning if you initialize the member to `null`. The compiler issues an error if the member isn't initialized at all.
- Required members must be at least as visible as their containing type. For example, a `public` class can't contain a `required` field that's `protected`. Furthermore, required properties must have setters (`set` or `init` accessors) that are at least as visible as their containing types. Code that creates an instance can't set members that aren't accessible.
- Derived classes can't hide a `required` member declared in the base class. Hiding a required member prevents callers from using object initializers for it. Furthermore, derived types that override a required property must include the `required` modifier.  The derived type can't remove the `required` state. Derived types can add the `required` modifier when overriding a property.
- You can't use a type with any `required` members as a type argument when the type parameter includes the `new()` constraint. The compiler can't enforce that all required members are initialized in the generic code.
- You can't use the `required` modifier on the declaration for positional parameters on a record. You can add an explicit declaration for a positional property that does include the `required` modifier.

Some types, such as [positional records](../builtin-types/record.md#positional-syntax-for-property-and-field-definition), use a primary constructor to initialize positional properties. If any of those properties include the `required` modifier, the primary constructor adds the [`SetsRequiredMembers`](../attributes/general.md#setsrequiredmembers-attribute) attribute. This attribute indicates that the primary constructor initializes all required members. You can write your own constructor with the [System.Diagnostics.CodeAnalysis.SetsRequiredMembersAttribute](https://learn.microsoft.com/search/?terms=System.Diagnostics.CodeAnalysis.SetsRequiredMembersAttribute) attribute. However, the compiler doesn't verify that these constructors do initialize all required members. Rather, the attribute asserts to the compiler that the constructor does initialize all required members. The `SetsRequiredMembers` attribute adds these rules to constructors:

- A constructor that chains to another constructor annotated with the `SetsRequiredMembers` attribute, either `this()`, or `base()`, must also include the `SetsRequiredMembers` attribute. That ensures that callers can correctly use all appropriate constructors.
- Copy constructors generated for `record` types have the `SetsRequiredMembers` attribute applied if any of the members are `required`.

> **Warning:**
> The `SetsRequiredMembers` attribute disables the compiler's checks that all `required` members are initialized when an object is created. Use it with caution.

The following code shows a class hierarchy that uses the `required` modifier for the `FirstName` and `LastName` properties:

[language="csharp" source="./snippets/RequiredExample.cs" id="SnippetRequired"::: (complete source file; reference: ./snippets/RequiredExample.cs)](../../../../_code/docs/csharp/language-reference/keywords/snippets/RequiredExample.cs.md)

For more information on required members, see [Properties](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/classes.md#157-properties) and [Required member attributes](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/attributes.md#23512-required-member-attributes) in the C# language specification.
