---
title: "The nameof operator in C#"
description: Use the nameof operator to capture an identifier as a compile-time string for argument validation, change notifications, attributes, and logging.
ms.date: 05/08/2026
ms.topic: concept-article
ai-usage: ai-assisted
---

# The `nameof` operator

> **Tip:**
> This article is part of the **Fundamentals** section for developers who already know at least one programming language and are learning C#. If you're new to programming, start with the [Get started](../../tour-of-csharp/tutorials/index.md) tutorials first. For the complete operator reference, see [`nameof`](../../language-reference/operators/nameof.md) in the language reference.
>
> **Coming from another language?** Other languages have similar features. Java's reflective `Class.getSimpleName()`, JavaScript's `Function.name` and `Object.keys`, Python's `__name__` and `vars()`, and Swift's `#function`/`#keyPath`. Unlike most of those, C#'s `nameof` is a pure compile-time construct. It uses no reflection, allocates nothing at runtime, and produces a constant `string` that's baked into the assembly.

The `nameof` operator returns the textual identifier of a symbol, such as a variable, parameter, type, member, or namespace, as a compile-time `string` constant. Anywhere you'd otherwise hardcode an identifier as a string, use `nameof`: the compiler verifies that the symbol exists, and rename refactorings update the result automatically.

## What `nameof` returns

`nameof` evaluates to the *final* identifier in its operand. It runs at compile time and has no runtime cost.

[language="csharp" source="snippets/nameof/Program.cs" ID="Basic"::: (complete source file; reference: snippets/nameof/Program.cs)](../../../../_code/docs/csharp/fundamentals/strings/snippets/nameof/Program.cs.md)

The operand can also be a *qualified expression*, one that uses the dot operator to navigate from a containing scope to a member, such as `customer.Name`, `System.Console`, or `List<int>.Enumerator`. In that case, only the last identifier is captured: `nameof(customer.Name)` returns `"Name"`, not `"customer.Name"`.

## Argument validation

The classic use is producing the parameter name in a thrown exception. Pass `nameof(parameter)` instead of the literal string `"parameter"` so a future rename can't leave the message lying:

[language="csharp" source="snippets/nameof/Program.cs" ID="GuardClause"::: (complete source file; reference: snippets/nameof/Program.cs)](../../../../_code/docs/csharp/fundamentals/strings/snippets/nameof/Program.cs.md)

For null checks specifically, prefer using exception helpers. These helpers, such as [System.ArgumentNullException.ThrowIfNull*](https://learn.microsoft.com/search/?terms=System.ArgumentNullException.ThrowIfNull*), capture the argument's name automatically through [System.Runtime.CompilerServices.CallerArgumentExpressionAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.CompilerServices.CallerArgumentExpressionAttribute), so a separate `nameof` isn't needed:

[language="csharp" source="snippets/nameof/Program.cs" ID="ThrowIfNull"::: (complete source file; reference: snippets/nameof/Program.cs)](../../../../_code/docs/csharp/fundamentals/strings/snippets/nameof/Program.cs.md)

Use `nameof` for the cases the helpers don't cover: [System.ArgumentException](https://learn.microsoft.com/search/?terms=System.ArgumentException), [System.ArgumentOutOfRangeException](https://learn.microsoft.com/search/?terms=System.ArgumentOutOfRangeException) (when validating something other than a single argument), and other guard messages.

## Property change notifications

Types that implement [System.ComponentModel.INotifyPropertyChanged](https://learn.microsoft.com/search/?terms=System.ComponentModel.INotifyPropertyChanged) raise an event whose payload includes the changed property's name. Hardcoding the name as a string creates a silent bug if the property is renamed and the string isn't. Use `nameof` instead:

[language="csharp" source="snippets/nameof/Program.cs" ID="PersonType"::: (complete source file; reference: snippets/nameof/Program.cs)](../../../../_code/docs/csharp/fundamentals/strings/snippets/nameof/Program.cs.md)

The setter calls `OnPropertyChanged(nameof(Name))` so the property name and the change notification stay in sync. Run the example to see the events fire:

[language="csharp" source="snippets/nameof/Program.cs" ID="PropertyChanged"::: (complete source file; reference: snippets/nameof/Program.cs)](../../../../_code/docs/csharp/fundamentals/strings/snippets/nameof/Program.cs.md)

## `nameof` in attribute arguments

`nameof` is valid inside attribute arguments. The compiler resolves identifiers in the surrounding scope, including the parameters of the method the attribute targets. This is the idiomatic way to refer to a parameter from an attribute such as [System.Diagnostics.CodeAnalysis.NotNullIfNotNullAttribute](https://learn.microsoft.com/search/?terms=System.Diagnostics.CodeAnalysis.NotNullIfNotNullAttribute):

[language="csharp" source="snippets/nameof/Program.cs" ID="AttributeUsage"::: (complete source file; reference: snippets/nameof/Program.cs)](../../../../_code/docs/csharp/fundamentals/strings/snippets/nameof/Program.cs.md)

If the parameter is renamed, the `nameof` argument is updated by the same refactoring — the attribute can't fall out of date.

## Qualified names

For any qualified expression, `nameof` returns only the *last* identifier:

[language="csharp" source="snippets/nameof/Program.cs" ID="QualifiedName"::: (complete source file; reference: snippets/nameof/Program.cs)](../../../../_code/docs/csharp/fundamentals/strings/snippets/nameof/Program.cs.md)

If you need the fully qualified name, use [System.Type.FullName](https://learn.microsoft.com/search/?terms=System.Type.FullName) on a `Type` instance. `nameof` is for identifiers, not paths.

## Prefer `nameof` to identifier strings

Anywhere you refer to a method, property, parameter, type, or namespace by name in code, use `nameof` instead of a string literal. Compared to a hardcoded string:

- The compiler verifies that the symbol exists. A typo becomes a build error, not a silent runtime bug.
- Rename refactorings update the result automatically. Hardcoded strings drift out of sync.
- The result is a compile-time constant, so there's no runtime cost.

This recommendation applies to logging messages, exception arguments, attribute arguments, property-change notifications, and serialization key constants tied to a member name.

## See also

- [Strings overview](index.md)
- [Raw string literals](raw-string-literals.md)
- [`nameof` operator (language reference)](../../language-reference/operators/nameof.md)
- [System.ArgumentNullException.ThrowIfNull*](https://learn.microsoft.com/search/?terms=System.ArgumentNullException.ThrowIfNull*)
- [System.ComponentModel.INotifyPropertyChanged](https://learn.microsoft.com/search/?terms=System.ComponentModel.INotifyPropertyChanged)
