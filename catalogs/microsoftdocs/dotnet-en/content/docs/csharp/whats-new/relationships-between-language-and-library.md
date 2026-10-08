---
title: The relationship between C# language features and library types
description: Language features often rely on library types for implementation. Understand that relationship.
ms.date: 10/26/2023
---

# Relationships between language features and library types

The C# language definition requires a standard library to have certain types and certain accessible members on those types. The compiler generates code that uses these required types and members for many different language features. For this reason, C# versions are supported only for the corresponding .NET version and newer. That ensures the correct run-time behavior and the availability of all required types and members.

This dependency on standard library functionality has been part of the C# language since its first version. In that version, examples included:

- [System.Exception](https://learn.microsoft.com/search/?terms=System.Exception) - used for all compiler-generated exceptions.
- [System.String](https://learn.microsoft.com/search/?terms=System.String) - synonym of `string`.
- [System.Int32](https://learn.microsoft.com/search/?terms=System.Int32) - synonym of `int`.

That first version was simple: the compiler and the standard library shipped together, and there was only one version of each.

Subsequent versions of C# have occasionally added new types or members to the dependencies. Examples include: [System.Runtime.CompilerServices.INotifyCompletion](https://learn.microsoft.com/search/?terms=System.Runtime.CompilerServices.INotifyCompletion), [System.Runtime.CompilerServices.CallerFilePathAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.CompilerServices.CallerFilePathAttribute), and [System.Runtime.CompilerServices.CallerMemberNameAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.CompilerServices.CallerMemberNameAttribute). C# 7.0 added a dependency on [System.ValueTuple](https://learn.microsoft.com/search/?terms=System.ValueTuple) to implement the [tuples](../language-reference/builtin-types/value-tuples.md) language feature. C# 8 requires [System.Index](https://learn.microsoft.com/search/?terms=System.Index) and [System.Range](https://learn.microsoft.com/search/?terms=System.Range) for [ranges and indexes](../language-reference/operators/member-access-operators.md#range-operator-), among other features. Each new version might add additional requirements.

The language design team works to minimize the surface area of the types and members required in a compliant standard library. That goal is balanced against a clean design where new library features are incorporated seamlessly into the language. There will be new features in future versions of C# that require new types and members in a standard library. C# compiler tools are now decoupled from the release cycle of the .NET libraries on supported platforms.
