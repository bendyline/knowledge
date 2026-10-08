---
title: "using statement - ensure the correct use of disposable objects"
description: "Use the C# using statement or declaration to ensure the correct use of disposable objects"
ms.date: 01/16/2026
f1_keywords:
  - "using-statement_CSharpKeyword"
helpviewer_keywords:
  - "using statement [C#]"
---
# using statement - ensure the correct use of disposable objects

The `using` statement ensures the correct use of an [System.IDisposable](https://learn.microsoft.com/search/?terms=System.IDisposable) instance:

[language="csharp" source="snippets/using/Program.cs" id="Using"::: (complete source file; reference: snippets/using/Program.cs)](../../../../_code/docs/csharp/language-reference/statements/snippets/using/Program.cs.md)

When control leaves the block of the `using` statement, the acquired [System.IDisposable](https://learn.microsoft.com/search/?terms=System.IDisposable) instance is disposed. In particular, the `using` statement ensures that a disposable instance is disposed even if an exception occurs within the block of the `using` statement. In the preceding example, an opened file is closed after all lines are processed.

Use the `await using` statement to correctly use an [System.IAsyncDisposable](https://learn.microsoft.com/search/?terms=System.IAsyncDisposable) instance:

[language="csharp" source="snippets/using/Program.cs" id="AwaitUsing"::: (complete source file; reference: snippets/using/Program.cs)](../../../../_code/docs/csharp/language-reference/statements/snippets/using/Program.cs.md)

For more information about using [System.IAsyncDisposable](https://learn.microsoft.com/search/?terms=System.IAsyncDisposable) instances, see the [Using async disposable](../../../standard/garbage-collection/implementing-disposeasync.md#using-async-disposable) section of the [Implement a DisposeAsync method](../../../standard/garbage-collection/implementing-disposeasync.md) article.

You can also use a `using` *declaration* that doesn't require braces:

[language="csharp" source="snippets/using/Program.cs" id="UsingDeclaration"::: (complete source file; reference: snippets/using/Program.cs)](../../../../_code/docs/csharp/language-reference/statements/snippets/using/Program.cs.md)

When declared in a `using` declaration, a local variable is disposed at the end of the scope in which it's declared. In the preceding example, disposal happens at the end of a method.


The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the [C# language version history](../../whats-new/csharp-version-history.md).


A variable declared by the `using` statement or declaration is readonly. You can't reassign it or pass it as a [`ref`](../keywords/ref.md) or [`out`](../keywords/method-parameters.md#out-parameter-modifier) parameter.

You can declare several instances of the same type in one `using` statement, as the following example shows:

[language="csharp" source="snippets/using/Program.cs" id="MultipleResources"::: (complete source file; reference: snippets/using/Program.cs)](../../../../_code/docs/csharp/language-reference/statements/snippets/using/Program.cs.md)

When you declare several instances in one `using` statement, they are disposed in reverse order of declaration.

You can also use the `using` statement and declaration with an instance of a [ref struct](../builtin-types/ref-struct.md) that fits the disposable pattern. That is, it has an instance `Dispose` method that's accessible, parameterless, and has a `void` return type.

A `return` inside a `using` block still guarantees disposal. The compiler rewrites it into a `try/finally`, so the resource’s `Dispose` is always called before the method actually returns.

The `using` statement can also be of the following form:

```csharp
using (expression)
{
    // ...
}
```

where `expression` produces a disposable instance. The following example demonstrates that form:

[language="csharp" source="snippets/using/Program.cs" id="UsingWithExpression"::: (complete source file; reference: snippets/using/Program.cs)](../../../../_code/docs/csharp/language-reference/statements/snippets/using/Program.cs.md)

> **Warning:**
> In the preceding example, after control leaves the `using` statement, a disposable instance remains in scope while it's already disposed. If you use that instance further, you might encounter an exception, for example, [System.ObjectDisposedException](https://learn.microsoft.com/search/?terms=System.ObjectDisposedException). That's why you should declare a disposable variable within the `using` statement or with the `using` declaration.

## C# language specification

For more information, see [The using statement](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/statements.md#1314-the-using-statement) section of the [C# language specification](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/README.md).

## See also

- [System.IDisposable](https://learn.microsoft.com/search/?terms=System.IDisposable)
- [System.IAsyncDisposable](https://learn.microsoft.com/search/?terms=System.IAsyncDisposable)
- [Using objects that implement IDisposable](../../../standard/garbage-collection/using-objects.md)
- [Implement a Dispose method](../../../standard/garbage-collection/implementing-dispose.md)
- [Implement a DisposeAsync method](../../../standard/garbage-collection/implementing-disposeasync.md)
- [Use simple 'using' statement (style rule IDE0063)](../../../fundamentals/code-analysis/style-rules/ide0063.md)
- [`using` directive](../keywords/using-directive.md)
