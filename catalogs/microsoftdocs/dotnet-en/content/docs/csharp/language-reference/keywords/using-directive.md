---
description: "The `using` directive imports types from a namespace, or creates an alias for a given type. Using directives enable you to use simple names for types instead of the fully qualified type name."
title: "The using directive: Import types from a namespace"
ms.date: 01/22/2026
f1_keywords:
  - "using_CSharpKeyword"
  - "using-static_CSharpKeyword"
helpviewer_keywords:
  - "using directive [C#]"
  - "using static directive [C#]"
---
# The `using` directive

The `using` directive enables you to use types defined in a namespace without specifying the fully qualified namespace of that type. In its basic form, the `using` directive imports all the types from a single namespace, as shown in the following example:

```csharp
using System.Text;
```

You can apply two modifiers to a `using` directive:

- The `global` modifier has the same effect as adding the same `using` directive to every source file in your project.
- The `static` modifier imports the `static` members and nested types from a single type rather than importing all the types in a namespace.

You can combine both modifiers to import the static members from a type to all source files in your project.

You can also create an alias for a namespace or a type with a *using alias directive*.

```csharp
using Project = PC.MyCompany.Project;
```

You can use the `global` modifier on a *using alias directive*.


The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the [C# language version history](../../whats-new/csharp-version-history.md).


> **Note:**
> The `using` keyword is also used to create *`using` statements*, which help ensure that [System.IDisposable](https://learn.microsoft.com/search/?terms=System.IDisposable) objects such as files and fonts are handled correctly. For more information about the *`using` statement*, see [`using` statement](../statements/using.md).

The scope of a `using` directive without the `global` modifier is the file in which it appears.

The `global using` directive must appear before all namespace and type declarations. All global using directives must appear in a source file before any nonglobal `using` directives.

Other `using` directives can appear:

- At the beginning of a source code file, before any namespace or type declarations.
- In any blocked-scoped namespace, but before any namespaces or types declared in that namespace.

Otherwise, a compiler error is generated.

Create a `using` directive to use the types in a namespace without having to specify the namespace. A `using` directive doesn't give you access to any namespaces that are nested in the namespace you specify. Namespaces come in two categories: user-defined and system-defined. User-defined namespaces are namespaces defined in your code. For a list of the system-defined namespaces, see [.NET API Browser](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/api/index.md).

## The `global` modifier

When you add the `global` modifier to a `using` directive, you apply the using to all files in the compilation (typically a project):

```csharp
global using <fully-qualified-namespace>;
```

Where *fully-qualified-namespace* is the fully qualified name of the namespace whose types you can reference without specifying the namespace.

A *global using* directive can appear at the beginning of any source code file. All `global using` directives in a single file must appear before:

- All `using` directives without the `global` modifier.
- All namespace and type declarations in the file.

You can add `global using` directives to any source file. Typically, you keep them in a single location. The order of `global using` directives doesn't matter, either in a single file or between files.

You can combine the `global` modifier with the `static` modifier. You can apply the `global` modifier to a *using alias directive*. In both cases, the directive's scope is all files in the current compilation. The following example enables using all the methods declared in the [System.Math](https://learn.microsoft.com/search/?terms=System.Math) in all files in your project:

```csharp
global using static System.Math;
```

You can also globally include a namespace by adding a `<Using>` item to your project file, for example, `<Using Include="My.Awesome.Namespace" />`. For more information, see [`<Using>` item](../../../core/project-sdk/msbuild-props.md#using).

Analyzers issue diagnostics if you duplicate `global` using directives in different locations. These same analyzers also inform you if you add a `using` directive for a namespace or type that a `global` using directive already references. You might find it easier to manage your `global` usings by keeping them together in one file in the project.

> **Important:**
> The C# templates for .NET 6 use *top level statements*. Your application may not match the code in this article, if you've already upgraded to the .NET 6. For more information see the article on [New C# templates generate top level statements](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/includes/~/docs/core/tutorials/top-level-templates.md)
>
> The .NET 6 SDK also adds a set of *implicit* `global using` directives for projects that use the following SDKs:
>
> - Microsoft.NET.Sdk
> - Microsoft.NET.Sdk.Web
> - Microsoft.NET.Sdk.Worker
>
> These implicit `global using` directives include the most common namespaces for the project type.
>
> For more information, see the article on [Implicit using directives](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/includes/~/docs/core/project-sdk/overview.md#implicit-using-directives)


## The `static` modifier

The `using static` directive names a type whose static members and nested types you can access without specifying a type name. Its syntax is:

```csharp
// not within a namespace
using static <fully-qualified-type-name>;
```

The `<fully-qualified-type-name>` is the name of the type whose static members and nested types you can reference without specifying a type name. If you don't provide a fully qualified type name (the full namespace name along with the type name), C# generates compiler error [CS0246](../compiler-messages/assembly-references.md): "The type or namespace name 'type/namespace' couldn't be found (are you missing a using directive or an assembly reference?)".

If you apply the `using static` directive within the context of a namespace (either file-scoped or nested in a `namespace` block), you don't need to fully qualify the type.

The `using static` directive applies to any type that has static members (or nested types), even if it also has instance members. However, you can only invoke instance members through the type instance.

You can access static members of a type without having to qualify the access with the type name:

```csharp
using static System.Console;
using static System.Math;
class Program
{
    static void Main()
    {
        WriteLine(Sqrt(3*3 + 4*4));
    }
}
```

Ordinarily, when you call a static member, you provide the type name along with the member name. Repeatedly entering the same type name to invoke members of the type can result in verbose, obscure code. For example, the following definition of a `Circle` class references many members of the [System.Math](https://learn.microsoft.com/search/?terms=System.Math) class.

[language="csharp" source="./snippets/using-static1.cs" id="Snippet1"::: (complete source file; reference: ./snippets/using-static1.cs)](../../../../_code/docs/csharp/language-reference/keywords/snippets/using-static1.cs.md)

By eliminating the need to explicitly reference the [System.Math](https://learn.microsoft.com/search/?terms=System.Math) class each time a member is referenced, the `using static` directive produces cleaner code:

[language="csharp" source="./snippets/using-static2.cs"::: (complete source file; reference: ./snippets/using-static2.cs)](../../../../_code/docs/csharp/language-reference/keywords/snippets/using-static2.cs.md)

`using static` imports only accessible static members and nested types declared in the specified type. Inherited members aren't imported. You can import from any named type with a `using static` directive, including Visual Basic modules. If F# top-level functions appear in metadata as static members of a named type whose name is a valid C# identifier, the F# functions can be imported.

`using static` makes extension members declared in the specified type available for extension member lookup. However, the names of the extension members aren't imported into scope for unqualified reference in code.

Methods with the same name imported from different types by different `using static` directives in the same compilation unit or namespace form a method group. Overload resolution within these method groups follows normal C# rules.

The following example uses the `using static` directive to make the static members of the [System.Console](https://learn.microsoft.com/search/?terms=System.Console), [System.Math](https://learn.microsoft.com/search/?terms=System.Math), and [System.String](https://learn.microsoft.com/search/?terms=System.String) classes available without having to specify their type name.

[language="csharp" source="./snippets/using-static3.cs" id="Snippet1"::: (complete source file; reference: ./snippets/using-static3.cs)](../../../../_code/docs/csharp/language-reference/keywords/snippets/using-static3.cs.md)

In the example, you could also apply the `using static` directive to the [System.Double](https://learn.microsoft.com/search/?terms=System.Double) type. Adding that directive would make it possible to call the [System.Double.TryParse(System.String,System.Double@)](https://learn.microsoft.com/search/?terms=System.Double.TryParse(System.String%2CSystem.Double%40)) method without specifying a type name. However, using `TryParse` without a type name creates less readable code, since it becomes necessary to check the `using static` directives to determine which numeric type's `TryParse` method is called.

`using static` also applies to `enum` types. By adding `using static` with the enum, you no longer need to use the enum type to access its members.

```csharp
using static Color;

enum Color
{
    Red,
    Green,
    Blue
}

class Program
{
    public static void Main()
    {
        Color color = Green;
    }
}
```

## The `using` alias

Create a `using` alias directive to make it easier to qualify an identifier to a namespace or type. In any `using` directive, you must use the fully qualified namespace or type regardless of the `using` directives that come before it. You can't use a `using` alias in the declaration of a `using` directive. For example, the following example generates a compiler error:

```csharp
using s = System.Text;
using s.RegularExpressions; // Generates a compiler error.
```

The following example shows how to define and use a `using` alias for a namespace:

[language="csharp" source="./snippets/csrefKeywordsNamespace2.cs" id="Snippet8"::: (complete source file; reference: ./snippets/csrefKeywordsNamespace2.cs)](../../../../_code/docs/csharp/language-reference/keywords/snippets/csrefKeywordsNamespace2.cs.md)

A using alias directive can't have an open generic type on the right-hand side. For example, you can't create a using alias for a `List<T>`, but you can create one for a `List<int>`.

The following example shows how to define a `using` directive and a `using` alias for a class:

[language="csharp" source="./snippets/csrefKeywordsNamespace2.cs" id="Snippet9"::: (complete source file; reference: ./snippets/csrefKeywordsNamespace2.cs)](../../../../_code/docs/csharp/language-reference/keywords/snippets/csrefKeywordsNamespace2.cs.md)

Beginning with C# 12, you can create aliases for types that were previously restricted, including [tuple types](../builtin-types/value-tuples.md#tuple-field-names), pointer types, and other unsafe types. For more information on the updated rules, see [§14.6.2 Using alias directives](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/namespaces.md#1462-using-alias-directives) in the C# standard.

## Qualified alias member

The namespace alias qualifier, `::` provides explicit access to the global namespace or other using aliases that other entities might hide.

The `global::` ensures that the namespace lookup for the namespace following the `::` token is relative to the global namespace. Otherwise, the token must resolve to a using alias, and the token following the `::` must resolve to a type in that aliased namespace. The following example shows both forms:

[language="csharp" source="./snippets/UsingAliasQualifier.cs" id="UsingAliasQualifier"::: (complete source file; reference: ./snippets/UsingAliasQualifier.cs)](../../../../_code/docs/csharp/language-reference/keywords/snippets/UsingAliasQualifier.cs.md)

## C# language specification

For more information, see [Using directives](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/namespaces.md#146-using-directives) in the [C# Language Specification](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/README.md). The language specification is the definitive source for C# syntax and usage.

For more information on the *global using* modifier, see [Global using directives](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/namespaces.md#1452-global-using-alias-directives).

## See also

- [C# keywords](index.md)
- [Namespaces](../../fundamentals/program-structure/namespaces.md)
- [Style rule IDE0005 - Remove unnecessary 'using' directives](../../../fundamentals/code-analysis/style-rules/ide0005.md)
- [Style rule IDE0065 - 'using' directive placement](../../../fundamentals/code-analysis/style-rules/ide0065.md)
- [`using` statement](../statements/using.md)
