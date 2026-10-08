---
title: Value tuples
description: Learn about value tuple structures in .NET.
ms.date: 01/03/2024
---
# Value tuples

A value tuple is a data structure that has a specific number and sequence of values. .NET provides the following built-in value tuple types:

- The [System.ValueTuple`1](https://learn.microsoft.com/search/?terms=System.ValueTuple%601) structure represents a value tuple that has one element.
- The [System.ValueTuple`2](https://learn.microsoft.com/search/?terms=System.ValueTuple%602) structure represents a value tuple that has two elements.-
- The [System.ValueTuple`3](https://learn.microsoft.com/search/?terms=System.ValueTuple%603) structure represents a value tuple that has three elements.
- The [System.ValueTuple`4](https://learn.microsoft.com/search/?terms=System.ValueTuple%604) structure represents a value tuple that has four elements.
- The [System.ValueTuple`5](https://learn.microsoft.com/search/?terms=System.ValueTuple%605) structure represents a value tuple that has five elements.
- The [System.ValueTuple`6](https://learn.microsoft.com/search/?terms=System.ValueTuple%606) structure represents a value tuple that has six elements.
- The [System.ValueTuple`7](https://learn.microsoft.com/search/?terms=System.ValueTuple%607) structure represents a value tuple that has seven elements.
- The [System.ValueTuple`8](https://learn.microsoft.com/search/?terms=System.ValueTuple%608) structure represents a value tuple that has eight or more elements.

The value tuple types differ from the tuple types (such as [System.Tuple`2](https://learn.microsoft.com/search/?terms=System.Tuple%602)) as follows:

- They are structures (value types) rather than classes (reference types).
- Members such as [System.ValueTuple`2.Item1](https://learn.microsoft.com/search/?terms=System.ValueTuple%602.Item1) and   [System.ValueTuple`2.Item2](https://learn.microsoft.com/search/?terms=System.ValueTuple%602.Item2) are fields rather than properties.
- Their fields are mutable rather than read-only.

The value tuple types provide the runtime implementation that supports [tuples in C#](../csharp/language-reference/builtin-types/value-tuples.md) and struct tuples in F#. In addition to creating a [System.ValueTuple`2](https://learn.microsoft.com/search/?terms=System.ValueTuple%602) instance by using language syntax, you can call the [System.ValueTuple.Create*](https://learn.microsoft.com/search/?terms=System.ValueTuple.Create*) factory method.

## See also

- [Tuple types (C# reference)](../csharp/language-reference/builtin-types/value-tuples.md)
