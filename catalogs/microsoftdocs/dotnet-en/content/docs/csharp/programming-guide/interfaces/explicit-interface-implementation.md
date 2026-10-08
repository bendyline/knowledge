---
title: "Explicit Interface Implementation"
description: A class can implement interfaces that contain a member with the same signature in C#. Explicit implementation creates a class member specific to one interface.
ms.date: 03/24/2021
helpviewer_keywords: 
  - "explicit interfaces [C#]"
  - "interfaces [C#], explicit"
---
# Explicit Interface Implementation (C# Programming Guide)

If a [class](../../language-reference/keywords/class.md) implements two interfaces that contain a member with the same signature, then implementing that member on the class will cause both interfaces to use that member as their implementation. In the following example, all the calls to `Paint` invoke the same method. This first sample defines the types:

[DefineSimpleTypes (complete source file; reference: \~/samples/snippets/csharp/interfaces/ExplicitImplementation.cs#DefineTypes)](../../../../_code/samples/snippets/csharp/interfaces/ExplicitImplementation.cs.md)

The following sample calls the methods:

[DefineSimpleTypes (complete source file; reference: \~/samples/snippets/csharp/interfaces/ExplicitImplementation.cs#CallMethods)](../../../../_code/samples/snippets/csharp/interfaces/ExplicitImplementation.cs.md)

But you might not want the same implementation to be called for both interfaces. To call a different implementation depending on which interface is in use, you can implement an interface member explicitly. An explicit interface implementation is a class member that is only called through the specified interface. Name the class member by prefixing it with the name of the interface and a period. For example:

[DefineExplicitImplementation (complete source file; reference: \~/samples/snippets/csharp/interfaces/ExplicitImplementation.cs#ExplicitImplementation)](../../../../_code/samples/snippets/csharp/interfaces/ExplicitImplementation.cs.md)

The class member `IControl.Paint` is only available through the `IControl` interface, and `ISurface.Paint` is only available through `ISurface`. Both method implementations are separate, and neither are available directly on the class. For example:

[CallExplicitImplementation (complete source file; reference: \~/samples/snippets/csharp/interfaces/ExplicitImplementation.cs#CallExplicitImplementation)](../../../../_code/samples/snippets/csharp/interfaces/ExplicitImplementation.cs.md)

Explicit implementation is also used to resolve cases where two interfaces each declare different members of the same name such as a property and a method. To implement both interfaces, a class has to use explicit implementation either for the property `P`, or the method `P`, or both, to avoid a compiler error. For example:

[NameCollisions (complete source file; reference: \~/samples/snippets/csharp/interfaces/ExplicitImplementation.cs#NameCollision)](../../../../_code/samples/snippets/csharp/interfaces/ExplicitImplementation.cs.md)

An explicit interface implementation doesn't have an access modifier since it isn't accessible as a member of the type it's defined in. Instead, it's only accessible when called through an instance of the interface. If you specify an access modifier for an explicit interface implementation, you get compiler error [CS0106](../../language-reference/compiler-messages/interface-implementation-errors.md). For more information, see [`interface` (C# Reference)](../../language-reference/keywords/interface.md).

You can define an implementation for members declared in an interface. If a class inherits a method implementation from an interface, that method is only accessible through a reference of the interface type. The inherited member doesn't appear as part of the public interface. The following sample defines a default implementation for an interface method:

[NameCollisions (complete source file; reference: \~/samples/snippets/csharp/interfaces/ExplicitImplementation.cs#DefaultImplementation)](../../../../_code/samples/snippets/csharp/interfaces/ExplicitImplementation.cs.md)

The following sample invokes the default implementation:

[NameCollisions (complete source file; reference: \~/samples/snippets/csharp/interfaces/ExplicitImplementation.cs#CallDefaultImplementation)](../../../../_code/samples/snippets/csharp/interfaces/ExplicitImplementation.cs.md)

Any class that implements the `IControl` interface can override the default `Paint` method, either as a public method, or as an explicit interface implementation.

## See also

- [Object oriented programming](../../fundamentals/object-oriented/index.md)
- [Interfaces](../../fundamentals/types/interfaces.md)
- [Inheritance](../../fundamentals/object-oriented/inheritance.md)
