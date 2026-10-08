---
title: "How to declare, instantiate, and use a delegate"
description: Learn how to declare, instantiate, and use a delegate. This article provides several examples of declaring, instantiating, and invoking delegates.
ms.topic: how-to
ms.date: 12/20/2024
helpviewer_keywords: 
  - "delegates [C#], declaring and instantiating"
---
# How to declare, instantiate, and use a Delegate (C# Programming Guide)

You can declare delegates using any of the following methods:

- Declare a delegate type and declare a method with a matching signature:

  [language="csharp" source="./snippets/HowToDeclareAndUse.cs" id="DeclareNamedDelegate"::: (complete source file; reference: ./snippets/HowToDeclareAndUse.cs)](../../../../_code/docs/csharp/programming-guide/delegates/snippets/HowToDeclareAndUse.cs.md)

  [language="csharp" source="./snippets/HowToDeclareAndUse.cs" id="CreateNamedInstance"::: (complete source file; reference: ./snippets/HowToDeclareAndUse.cs)](../../../../_code/docs/csharp/programming-guide/delegates/snippets/HowToDeclareAndUse.cs.md)

- Assign a method group to a delegate type:

  [language="csharp" source="./snippets/HowToDeclareAndUse.cs" id="MethodGroup"::: (complete source file; reference: ./snippets/HowToDeclareAndUse.cs)](../../../../_code/docs/csharp/programming-guide/delegates/snippets/HowToDeclareAndUse.cs.md)

- Declare an anonymous method

  [language="csharp" source="./snippets/HowToDeclareAndUse.cs" id="AnonymousMethod"::: (complete source file; reference: ./snippets/HowToDeclareAndUse.cs)](../../../../_code/docs/csharp/programming-guide/delegates/snippets/HowToDeclareAndUse.cs.md)

- Use a lambda expression:

  [language="csharp" source="./snippets/HowToDeclareAndUse.cs" id="LambdaExpression"::: (complete source file; reference: ./snippets/HowToDeclareAndUse.cs)](../../../../_code/docs/csharp/programming-guide/delegates/snippets/HowToDeclareAndUse.cs.md)

For more information, see [Lambda Expressions](../../language-reference/operators/lambda-expressions.md).

The following example illustrates declaring, instantiating, and using a delegate. The `BookDB` class encapsulates a bookstore database that maintains a database of books. It exposes a method, `ProcessPaperbackBooks`, which finds all paperback books in the database and calls a delegate for each one. The `delegate` type is named `ProcessBookCallback`. The `Test` class uses this class to print the titles and average price of the paperback books.

The use of delegates promotes good separation of functionality between the bookstore database and the client code. The client code has no knowledge of how the books are stored or how the bookstore code finds paperback books. The bookstore code has no knowledge of what processing is performed on the paperback books after it finds them.

[language="csharp" source="./snippets/BookStore.cs"::: (complete source file; reference: ./snippets/BookStore.cs)](../../../../_code/docs/csharp/programming-guide/delegates/snippets/BookStore.cs.md)

## See also

- [Events](../events/index.md)
- [Delegates](index.md)
