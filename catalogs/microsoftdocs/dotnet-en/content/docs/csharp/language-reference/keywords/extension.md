---
title: "Extension member declarations"
description: "Learn the syntax to declare extension members in C#. Extension members enable you to add functionality to types and interfaces in those instances where you don't have the source for the original type. Extensions are often paired with generic interfaces to implement a common set of functionality across all types that implement that interface."
ms.date: 07/08/2026
f1_keywords:
  - "extension_CSharpKeyword"
  - "extension"
---
# Extension declaration (C# Reference)

Starting with C# 14, top-level, nongeneric `static class` declarations can use `extension` blocks to declare *extension members*. Extension members are methods or properties and can appear to be instance or static members. Earlier versions of C# enable *extension methods* by adding `this` as a modifier to the first parameter of a static method declared in a top-level, nongeneric static class.


The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the [C# language version history](../../whats-new/csharp-version-history.md).


The `extension` block specifies the type and receiver for extension members. You can declare methods, properties, indexers, and operators inside the `extension` declaration. The following example declares a single extension block that defines an instance extension method, an instance property, and a static operator method.

> **Note:**
> All the examples in this article include XML comments for the members and the extension block. The node on the `extension` block describes the extended type and the receiver parameter. The C# compiler copies this node to the generated member for all members in the extension block. These examples demonstrate the preferred style for generating XML documentation for extension members.

[language="csharp" source="./snippets/extensions.cs" id="ExtensionMembers"::: (complete source file; reference: ./snippets/extensions.cs)](../../../../_code/docs/csharp/language-reference/keywords/snippets/Extensions.cs.md)

The `extension` defines the receiver: `sequence`, which is an `IEnumerable<int>`. The receiver type can be nongeneric, an open generic, or a closed generic type. The name `sequence` is in scope in every instance member declared in that extension. The extension method and property both access `sequence`.

You access any of the extension members as though they were members of the receiver type:

[language="csharp" source="./snippets/extensions.cs" id="UseExtensionMethod"::: (complete source file; reference: ./snippets/extensions.cs)](../../../../_code/docs/csharp/language-reference/keywords/snippets/Extensions.cs.md)

You can declare any number of members in a single block, as long as they share the same receiver. You can declare as many extension blocks in a single class as well. Different extensions don't need to declare the same type or name of receiver. The extension parameter doesn't need to include the parameter name if the only members are static:

[language="csharp" source="./snippets/extensions.cs" id="StaticExtensions"::: (complete source file; reference: ./snippets/extensions.cs)](../../../../_code/docs/csharp/language-reference/keywords/snippets/Extensions.cs.md)

You call static extensions as though they're static members of the receiver type:

[language="csharp" source="./snippets/extensions.cs" id="UseStaticExtensions"::: (complete source file; reference: ./snippets/extensions.cs)](../../../../_code/docs/csharp/language-reference/keywords/snippets/Extensions.cs.md)

You call operators as though they're user defined operators on the type.

> **Important:**  
> An extension doesn't introduce a *scope* for member declarations. All members declared in a single class, even if in multiple extensions, must have unique signatures. The generated signature includes the receiver type in its name for static members and the receiver parameter for extension instance members.

The following example shows an extension method using the `this` modifier:

[language="csharp" source="./snippets/ExtensionMethods.cs" id="ExtensionMethod"::: (complete source file; reference: ./snippets/ExtensionMethods.cs)](../../../../_code/docs/csharp/language-reference/keywords/snippets/ExtensionMethods.cs.md)

You can call the `AddValue` method from any other method as though it was a member of the `IEnumerable<int>` interface:

[language="csharp" source="./snippets/ExtensionMethods.cs" id="UseExtensionMethod"::: (complete source file; reference: ./snippets/ExtensionMethods.cs)](../../../../_code/docs/csharp/language-reference/keywords/snippets/ExtensionMethods.cs.md)

Both forms of extension methods generate the same intermediate language (IL). Callers can't make a distinction between them. In fact, you can convert existing extension methods to the new member syntax without a breaking change. The formats are both binary and source compatible.

## Generic extension blocks

Where you specify the type parameters for an extension member declared in an extension block depends on where you need the type parameter:

- Add the type parameter to the `extension` declaration when the type parameter is used in the receiver.
- Add the type parameter to the member declaration when the type is distinct from any type parameter specified on the receiver.
- You can't specify the same type parameter in both locations.

The following example shows an extension block for `IEnumerable<T>` where two of the extension members require a second type parameter:

[language="csharp" source="./snippets/extensions.cs" id="GenericExtension"::: (complete source file; reference: ./snippets/extensions.cs)](../../../../_code/docs/csharp/language-reference/keywords/snippets/Extensions.cs.md)

The members `Append` and `Prepend` specify the *extra* type parameter for the conversion. None of the members repeat the type parameter for the receiver.

The equivalent extension method declarations demonstrate how those type parameters are encoded:

[language="csharp" source="./snippets/ExtensionMethods.cs" id="GenericExtensionMethods"::: (complete source file; reference: ./snippets/ExtensionMethods.cs)](../../../../_code/docs/csharp/language-reference/keywords/snippets/ExtensionMethods.cs.md)

## Extension indexers

Starting with C# 15, you can declare *indexers* in an `extension` block. An extension indexer lets you index into a receiver as though the indexer were declared on the receiver type. Because indexers are always instance members, an extension block that declares an indexer must provide a named receiver parameter. Extension indexers support the same features as ordinary indexers, including `get` and `set` accessors, expression-bodied accessors, and ref-returning accessors.

The following example declares a get-only indexer on `IEnumerable<int>` that returns the element at a specified position:

[language="csharp" source="./snippets/extensions.cs" id="ExtensionIndexer"::: (complete source file; reference: ./snippets/extensions.cs)](../../../../_code/docs/csharp/language-reference/keywords/snippets/Extensions.cs.md)

You index into the receiver as though the indexer were a member of the receiver type:

[language="csharp" source="./snippets/extensions.cs" id="UseExtensionIndexer"::: (complete source file; reference: ./snippets/extensions.cs)](../../../../_code/docs/csharp/language-reference/keywords/snippets/Extensions.cs.md)

## See also

- [Extensions feature specification](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharplang/proposals/csharp-14.0/extensions.md)
- [Extension indexers feature specification](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharplang/proposals/csharp-15.0/extension-indexers.md)

## C# language specification

For more information, see the [C# Language Specification](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/includes/~/_csharpstandard/standard/README.md). The language specification is the definitive source for C# syntax and usage.
