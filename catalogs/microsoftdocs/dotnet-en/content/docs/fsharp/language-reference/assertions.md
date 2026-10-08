---
title: Assertions
description: Learn how to use the 'assert' expression as a debugging feature for testing expressions in the F# programming language.
ms.date: 10/22/2019
---
# Assertions

The `assert` expression is a debugging feature that you can use to test an expression. Upon failure in Debug mode, an assertion generates a system error dialog box.

## Syntax

```fsharp
assert condition
```

## Remarks

The `assert` expression has type `bool -> unit`.

The `assert` function resolves to [System.Diagnostics.Debug.Assert*](https://learn.microsoft.com/search/?terms=System.Diagnostics.Debug.Assert*). This means its behavior is identical to having called [System.Diagnostics.Debug.Assert*](https://learn.microsoft.com/search/?terms=System.Diagnostics.Debug.Assert*) directly.

Assertion checking is enabled only when you compile in Debug mode; that is, if the constant `DEBUG` is defined. In the project system, by default, the `DEBUG` constant is defined in the Debug configuration but not in the Release configuration.

The assertion failure error cannot be caught by using F# exception handling.

## Example

The following code example illustrates the use of the `assert` expression.

[Main (complete source file; reference: \~/samples/snippets/fsharp/lang-ref-2/snippet5401.fs)](../../../_code/samples/snippets/fsharp/lang-ref-2/snippet5401.fs.md)

## See also

- [F# Language Reference](index.md)
