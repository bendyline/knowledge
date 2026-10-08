---
title: "Namespaces and using directives"
description: Learn how to organize C# code with namespaces, file-scoped namespace declarations, global usings, static usings, and type aliases.
ms.date: 03/16/2026
ai-usage: ai-assisted

#customer intent: As a C# developer, I want to understand namespaces and using directives so that I can organize my types and simplify how I reference them in code.

---
# Namespaces and using directives

> **Tip:**
> **New to developing software?** Start with the [Get started](../../tour-of-csharp/tutorials/index.md) tutorials first. They introduce namespaces and `using` directives as you write your first programs.
>
> **Experienced in another language?** Namespaces in C# work similarly to packages in Java or modules in Python. Skim ahead to the syntax you need.

Namespace declarations and `using` directives are related language features. A namespace declaration puts your types into an organized structure. A namespace groups related types together and prevents naming collisions. A `using` directive lets your program consume those types by their simple names. You don't have to spell out the full namespace path at every use.

You've already used namespaces in every C# program you've written. Every .NET type belongs to a namespace, and every `using` directive at the top of a file references one. For example, `Console` and `Math` belong to the `System` namespace, so their fully qualified names are `System.Console` and `System.Math`. Collection types like `List<T>` and `Dictionary<TKey, TValue>` belong to `System.Collections.Generic`. A single `using` directive for any of these namespaces lets you refer to all its types by their simple names. You write `List<T>` instead of `System.Collections.Generic.List<T>` everywhere you use it.

This article provides more background on how namespaces and `using` directives work, and shows examples of patterns you've already encountered in .NET libraries.

A namespace contains types. Every .NET type belongs to a namespace. For example, consider `System.Threading.Tasks.Task`: the type `Task` belongs to the `System.Threading.Tasks` namespace.

It's good practice to group related or similar types in the same namespace, and that's what .NET does with the types it provides. The `System.Collections.Generic` namespace contains collection-related types and the `System.IO` namespace contains types related reading and writing files, directories, and data. The `System` namespace contains fundamental types like `Math`, `DateTime`, and `Console`.

The following example shows how namespaces work together with `using` directives in a typical C# file:

[language="csharp" source="snippets/namespaces/Basics.cs" id="NamespaceBasics"::: (complete source file; reference: snippets/namespaces/Basics.cs)](../../../../_code/docs/csharp/fundamentals/program-structure/snippets/namespaces/Basics.cs.md)

In the preceding sample, the `using` directive means you can use the [System.Globalization.CultureInfo](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo) by the name `CultureInfo` without specifying the full name of `System.Globalization.CultureInfo`. The `namespace` directive declares that the `Greeter` class is part of the `MyApp.Services` namespace. Its fully qualified name is `MyApp.Services.Greeter`.

## Namespace declarations

A namespace declaration assigns your types to a named group. Every type you write should belong to a namespace. The namespace name typically mirrors the folder structure of your project. For example, types in a `Services/Payments` folder often belong to the `MyApp.Services.Payments` namespace.

Namespaces use the `.` operator to express hierarchy, such as `System.Collections.Generic`. Namespace names must be valid C# [identifier names](../coding-style/identifier-names.md).

### File-scoped namespaces

Use the *file-scoped* syntax when all types in a file belong to the same namespace. Add a semicolon after the namespace declaration, and it applies to the entire file. You don't need extra braces or indentation:

[language="csharp" source="snippets/namespaces/FileScopedExample.cs" id="FileScopedNamespace"::: (complete source file; reference: snippets/namespaces/FileScopedExample.cs)](../../../../_code/docs/csharp/fundamentals/program-structure/snippets/namespaces/FileScopedExample.cs.md)

File-scoped namespaces reduce nesting and make files easier to read. You can only have one file-scoped namespace declaration per file.

> **Tip:**
> Use file-scoped namespaces in new code. Most .NET templates and code analyzers recommend this style.

### Block-scoped namespaces

Use *block-scoped* syntax when you need to declare more than one namespace in the same file. This style adds an extra level of indentation.

> **Important:**
> It's rare to declare more than one namespace in the same file. The more common scenario is to use *file-scoped* namespaces.

The following snippet is an example of a *block-scoped* namespace:

[language="csharp" source="snippets/namespaces/BlockScoped.cs" id="BlockScopedNamespace"::: (complete source file; reference: snippets/namespaces/BlockScoped.cs)](../../../../_code/docs/csharp/fundamentals/program-structure/snippets/namespaces/BlockScoped.cs.md)

## Using directives

Without a `using` directive, you must refer to every type by its *fully qualified name*, the complete namespace path plus the type name. This style is verbose, repetitive, and harder to read, especially when a file uses many types from the same namespace:

[language="csharp" source="snippets/namespaces/Basics.cs" id="FullyQualifiedName"::: (complete source file; reference: snippets/namespaces/Basics.cs)](../../../../_code/docs/csharp/fundamentals/program-structure/snippets/namespaces/Basics.cs.md)

A `using` directive at the top of a file imports a namespace so you can use its types by their simple names. The following snippet shows the shorter type usage after that import, which keeps references throughout the file shorter and easier to read:

[language="csharp" source="snippets/namespaces/Basics.cs" id="UsingDirective"::: (complete source file; reference: snippets/namespaces/Basics.cs)](../../../../_code/docs/csharp/fundamentals/program-structure/snippets/namespaces/Basics.cs.md)

For more information, see the [`using` directive](../../language-reference/keywords/using-directive.md).

### Global using directives

A `using` directive only applies to the file it appears in. Instead of repeating the same `using` directives in every file, use *global using* directives, which let you declare them once for your entire project. Place them in any file. Many teams create a dedicated `GlobalUsings.cs` file:

[language="csharp" source="snippets/namespaces/GlobalUsings.cs" id="GlobalUsings"::: (complete source file; reference: snippets/namespaces/GlobalUsings.cs)](../../../../_code/docs/csharp/fundamentals/program-structure/snippets/namespaces/GlobalUsings.cs.md)

After declaring a global using, every file in the project can refer to types from that namespace by their simple names without an additional `using` directive. Global usings remove repetition across files, shrink the `using` block at the top of each file, and centralize namespace policy for the project.

### Implicit usings

For the most common namespaces, you don't have to write any `using` directives at all. The .NET SDK automatically generates global using directives based on your project type. Enable implicit usings by setting `<ImplicitUsings>enable</ImplicitUsings>` in your project file. For example, a console app project automatically imports [System](https://learn.microsoft.com/search/?terms=System), [System.Collections.Generic](https://learn.microsoft.com/search/?terms=System.Collections.Generic), [System.IO](https://learn.microsoft.com/search/?terms=System.IO), [System.Linq](https://learn.microsoft.com/search/?terms=System.Linq), [System.Threading](https://learn.microsoft.com/search/?terms=System.Threading), and [System.Threading.Tasks](https://learn.microsoft.com/search/?terms=System.Threading.Tasks). New projects that you create with `dotnet new` enable `ImplicitUsings` by default. New files start clean, with no boilerplate `using` directives for everyday types like [System.Console](https://learn.microsoft.com/search/?terms=System.Console), [System.Collections.Generic.List`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.List%601), or [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task).

For more information, see [Implicit using directives](../../../core/project-sdk/overview.md#implicit-using-directives).

> **Note:**
> The other code samples in this article, and most samples throughout the .NET docs, assume that implicit usings (or the equivalent global usings for the project type) are enabled. That's why you don't see `using System;` and similar directives at the top of each snippet, even though the code uses types like `Console` or `List<T>` by their simple names.

### Static using directives

A `static using` directive imports the static members of a type so you can call them without the type name prefix:

[language="csharp" source="snippets/namespaces/StaticUsing.cs" id="StaticUsing"::: (complete source file; reference: snippets/namespaces/StaticUsing.cs)](../../../../_code/docs/csharp/fundamentals/program-structure/snippets/namespaces/StaticUsing.cs.md)

Static usings work well for utility classes like [System.Math](https://learn.microsoft.com/search/?terms=System.Math) and [System.Console](https://learn.microsoft.com/search/?terms=System.Console) that you call frequently.

### Type and namespace aliases

A `using` alias creates a shorthand name for a type or namespace. Aliases are useful for long generic types, resolving naming conflicts, and improving readability:

[language="csharp" source="snippets/namespaces/Aliases.cs" id="TypeAlias"::: (complete source file; reference: snippets/namespaces/Aliases.cs)](../../../../_code/docs/csharp/fundamentals/program-structure/snippets/namespaces/Aliases.cs.md)

Starting with C# 12, you can alias any type, including tuples and pointer types:

[language="csharp" source="snippets/namespaces/TupleAlias.cs" id="AnyTypeAlias"::: (complete source file; reference: snippets/namespaces/TupleAlias.cs)](../../../../_code/docs/csharp/fundamentals/program-structure/snippets/namespaces/TupleAlias.cs.md)

For more advanced scenarios where two assemblies define the same fully qualified type name, use [extern alias](../../language-reference/keywords/extern-alias.md) to disambiguate between them.

## Related content

- [`using` directive (language reference)](../../language-reference/keywords/using-directive.md)
- [Namespaces in the C# language specification](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/namespaces.md)
