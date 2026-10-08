---
title: Using objects that implement IDisposable
description: Learn how to use objects that implement the IDisposable interface in .NET. Types that use unmanaged resources implement IDisposable to allow resource reclaiming.
ms.date: 05/18/2021
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "Dispose method"
  - "try/finally block"
  - "garbage collection, encapsulating resources"
ms.assetid: 81b2cdb5-c91a-4a31-9c83-eadc52da5cf0
---

# Using objects that implement IDisposable

The common language runtime's garbage collector (GC) reclaims the memory used by managed objects. Typically, types that use unmanaged resources implement the [System.IDisposable](https://learn.microsoft.com/search/?terms=System.IDisposable) or [System.IAsyncDisposable](https://learn.microsoft.com/search/?terms=System.IAsyncDisposable) interface to allow the unmanaged resources to be reclaimed. When you finish using an object that implements [System.IDisposable](https://learn.microsoft.com/search/?terms=System.IDisposable), you call the object's [System.IDisposable.Dispose*](https://learn.microsoft.com/search/?terms=System.IDisposable.Dispose*) or [System.IAsyncDisposable.DisposeAsync*](https://learn.microsoft.com/search/?terms=System.IAsyncDisposable.DisposeAsync*) implementation to explicitly perform cleanup. You can do this in one of two ways:

- With the C# `using` statement or declaration (`Using` in Visual Basic).
- By implementing a `try/finally` block, and calling the [System.IDisposable.Dispose*](https://learn.microsoft.com/search/?terms=System.IDisposable.Dispose*) or [System.IAsyncDisposable.DisposeAsync*](https://learn.microsoft.com/search/?terms=System.IAsyncDisposable.DisposeAsync*) method in the `finally`.

> **Important:**
> The GC does ***not*** dispose your objects, as it has no knowledge of [System.IDisposable.Dispose](https://learn.microsoft.com/search/?terms=System.IDisposable.Dispose) or [System.IAsyncDisposable.DisposeAsync](https://learn.microsoft.com/search/?terms=System.IAsyncDisposable.DisposeAsync). The GC only knows whether an object is finalizable (that is, it defines an [System.Object.Finalize](https://learn.microsoft.com/search/?terms=System.Object.Finalize) method), and when the object's finalizer needs to be called. For more information, see [How finalization works](https://learn.microsoft.com/dotnet/api/system.object.finalize#how-finalization-works). For additional details on implementing `Dispose` and `DisposeAsync`, see:
>
> - [Implement a Dispose method](implementing-dispose.md)
> - [Implement a DisposeAsync method](implementing-disposeasync.md)

Objects that implement [System.IDisposable](https://learn.microsoft.com/search/?terms=System.IDisposable) or [System.IAsyncDisposable](https://learn.microsoft.com/search/?terms=System.IAsyncDisposable) should always be properly disposed of, regardless of variable scoping, unless otherwise explicitly stated. Types that define a finalizer to release unmanaged resources usually call [System.GC.SuppressFinalize*](https://learn.microsoft.com/search/?terms=System.GC.SuppressFinalize*) from either their `Dispose` or `DisposeAsync` implementation. Calling [System.GC.SuppressFinalize*](https://learn.microsoft.com/search/?terms=System.GC.SuppressFinalize*) indicates to the GC that the finalizer has already been run and the object shouldn't be promoted for finalization.

## The using statement

The [`using` statement](../../csharp/language-reference/statements/using.md) in C# and the [`Using` statement](../../visual-basic/language-reference/statements/using-statement.md) in Visual Basic simplify the code that you must write to cleanup an object. The `using` statement obtains one or more resources, executes the statements that you specify, and automatically disposes of the object. However, the `using` statement is useful only for objects that are used within the scope of the method in which they are constructed.

The following example uses the `using` statement to create and release a [System.IO.StreamReader](https://learn.microsoft.com/search/?terms=System.IO.StreamReader) object.

[language="csharp" source="../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.disposable/cs/UsingStatement.cs"::: (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.disposable/cs/UsingStatement.cs)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.disposable/cs/UsingStatement.cs.md)
[language="vb" source="../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.disposable/vb/UsingStatement.vb"::: (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.disposable/vb/UsingStatement.vb)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.disposable/vb/UsingStatement.vb.md)

A [`using` declaration](../../csharp/language-reference/statements/using.md) is an alternative syntax available where the braces are removed, and scoping is implicit.

[language="csharp" source="../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.disposable/cs/UsingDeclaration.cs"::: (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.disposable/cs/UsingDeclaration.cs)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.disposable/cs/UsingDeclaration.cs.md)

Although the [System.IO.StreamReader](https://learn.microsoft.com/search/?terms=System.IO.StreamReader) class implements the [System.IDisposable](https://learn.microsoft.com/search/?terms=System.IDisposable) interface, which indicates that it uses an unmanaged resource, the example doesn't explicitly call the [System.IO.StreamReader.Dispose*](https://learn.microsoft.com/search/?terms=System.IO.StreamReader.Dispose*) method. When the C# or Visual Basic compiler encounters the `using` statement, it emits intermediate language (IL) that is equivalent to the following code that explicitly contains a `try/finally` block.

[language="csharp" source="../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.disposable/cs/TryFinallyGenerated.cs"::: (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.disposable/cs/TryFinallyGenerated.cs)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.disposable/cs/TryFinallyGenerated.cs.md)
[language="vb" source="../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.disposable/vb/TryFinallyGenerated.vb"::: (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.disposable/vb/TryFinallyGenerated.vb)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.disposable/vb/TryFinallyGenerated.vb.md)

The C# `using` statement also allows you to acquire multiple resources in a single statement, which is internally equivalent to nested `using` statements. The following example instantiates two [System.IO.StreamReader](https://learn.microsoft.com/search/?terms=System.IO.StreamReader) objects to read the contents of two different files.

[language="csharp" source="../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.disposable/cs/SingleStatementMultiple.cs"::: (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.disposable/cs/SingleStatementMultiple.cs)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.disposable/cs/SingleStatementMultiple.cs.md)

## Try/finally block

Instead of wrapping a `try/finally` block in a `using` statement, you may choose to implement the `try/finally` block directly. It may be your personal coding style, or you might want to do this for one of the following reasons:

- To include a `catch` block to handle exceptions thrown in the `try` block. Otherwise, any exceptions thrown within the `using` statement are unhandled.
- To instantiate an object that implements [System.IDisposable](https://learn.microsoft.com/search/?terms=System.IDisposable) whose scope is not local to the block within which it is declared.

The following example is similar to the previous example, except that it uses a `try/catch/finally` block to instantiate, use, and dispose of a [System.IO.StreamReader](https://learn.microsoft.com/search/?terms=System.IO.StreamReader) object, and to handle any exceptions thrown by the [System.IO.StreamReader](https://learn.microsoft.com/search/?terms=System.IO.StreamReader) constructor and its [System.IO.StreamReader.ReadToEnd*](https://learn.microsoft.com/search/?terms=System.IO.StreamReader.ReadToEnd*) method. The code in the `finally` block checks that the object that implements [System.IDisposable](https://learn.microsoft.com/search/?terms=System.IDisposable) isn't `null` before it calls the [System.IDisposable.Dispose*](https://learn.microsoft.com/search/?terms=System.IDisposable.Dispose*) method. Failure to do this can result in a [System.NullReferenceException](https://learn.microsoft.com/search/?terms=System.NullReferenceException) exception at runtime.

[language="csharp" source="../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.disposable/cs/TryExplicitCatchFinally.cs"::: (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.disposable/cs/TryExplicitCatchFinally.cs)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.disposable/cs/TryExplicitCatchFinally.cs.md)
[language="vb" source="../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.disposable/vb/TryExplicitCatchFinally.vb"::: (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.disposable/vb/TryExplicitCatchFinally.vb)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.disposable/vb/TryExplicitCatchFinally.vb.md)

You can follow this basic pattern if you choose to implement or must implement a `try/finally` block, because your programming language doesn't support a `using` statement but does allow direct calls to the [System.IDisposable.Dispose*](https://learn.microsoft.com/search/?terms=System.IDisposable.Dispose*) method.

## IDisposable instance members

If a class owns an instance field or property and its type implements [System.IDisposable](https://learn.microsoft.com/search/?terms=System.IDisposable), the class should also implement [System.IDisposable](https://learn.microsoft.com/search/?terms=System.IDisposable). For more information, see [Implement a cascade dispose](implementing-dispose.md#cascade-dispose-calls).

## See also

- [Cleaning up unmanaged resources](unmanaged.md)
- [using Statement (C# Reference)](../../csharp/language-reference/statements/using.md)
- [Using Statement (Visual Basic)](../../visual-basic/language-reference/statements/using-statement.md)
