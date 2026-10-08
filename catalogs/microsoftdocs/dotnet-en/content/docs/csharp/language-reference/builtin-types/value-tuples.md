---
title: "Tuple types"
description: "C# tuples: lightweight data structures that you can use to group loosely related data elements. Tuples introduce a type that contains multiple public members."
ms.date: 01/14/2026
helpviewer_keywords:
  - "value tuples [C#]"
---
# Tuple types (C# reference)

The *tuples* feature provides a concise syntax to group multiple data elements in a lightweight data structure.


The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the [C# language version history](../../whats-new/csharp-version-history.md).


The following example shows how you can declare a tuple variable, initialize it, and access its data members:

[language="csharp" source="snippets/shared/ValueTuples.cs" id="Introduction"::: (complete source file; reference: snippets/shared/ValueTuples.cs)](../../../../_code/docs/csharp/language-reference/builtin-types/snippets/shared/ValueTuples.cs.md)

As the preceding example shows, to define a tuple type, you specify the types of all its data members and, optionally, the [field names](#tuple-field-names). You can't define methods in a tuple type, but you can use the methods provided by .NET, as the following example shows:

[language="csharp" source="snippets/shared/ValueTuples.cs" id="MethodOnTuples"::: (complete source file; reference: snippets/shared/ValueTuples.cs)](../../../../_code/docs/csharp/language-reference/builtin-types/snippets/shared/ValueTuples.cs.md)

Tuple types support [equality operators](../operators/equality-operators.md) `==` and `!=`. For more information, see the [Tuple equality](#tuple-equality) section.

Tuple types are [value types](value-types.md); tuple elements are public fields. That design makes tuples *mutable* value types.

You can define tuples with an arbitrarily large number of elements:

[language="csharp" source="snippets/shared/ValueTuples.cs" id="LargeTuple"::: (complete source file; reference: snippets/shared/ValueTuples.cs)](../../../../_code/docs/csharp/language-reference/builtin-types/snippets/shared/ValueTuples.cs.md)

## Use cases for tuples

One of the most common use cases for tuples is as a method return type. Instead of defining [`out` method parameters](../keywords/method-parameters.md#out-parameter-modifier), group method results in a tuple return type, as the following example shows:

[language="csharp" source="snippets/shared/ValueTuples.cs" id="MultipleReturns"::: (complete source file; reference: snippets/shared/ValueTuples.cs)](../../../../_code/docs/csharp/language-reference/builtin-types/snippets/shared/ValueTuples.cs.md)

As the preceding example shows, you can work with the returned tuple instance directly or [deconstruct](#tuple-assignment-and-deconstruction) it in separate variables.

You can also use tuple types instead of anonymous types; for example, in LINQ queries. For more information, see [Choosing between anonymous and tuple types](../../../standard/base-types/choosing-between-anonymous-and-tuple.md).

Typically, use tuples to group loosely related data elements. In public APIs, consider defining a [class](../keywords/class.md) or a [structure](struct.md) type.

## Tuple field names

You explicitly specify tuple field names in a tuple initialization expression or in the definition of a tuple type, as the following example shows:

[explicit field names (complete source file; reference: snippets/shared/ValueTuples.cs#ExplicitFieldNames)](../../../../_code/docs/csharp/language-reference/builtin-types/snippets/shared/ValueTuples.cs.md)

If you don't specify a field name, the compiler might infer it from the name of the corresponding variable in a tuple initialization expression, as the following example shows:

[language="csharp" source="snippets/shared/ValueTuples.cs" id="InferFieldNames"::: (complete source file; reference: snippets/shared/ValueTuples.cs)](../../../../_code/docs/csharp/language-reference/builtin-types/snippets/shared/ValueTuples.cs.md)

This feature is called tuple projection initializers. The name of a variable isn't projected onto a tuple field name in the following cases:

- The candidate name is a member name of a tuple type, for example, `Item3`, `ToString`, or `Rest`.
- The candidate name is a duplicate of another tuple field name, either explicit or implicit.

In the preceding cases, you either explicitly specify the name of a field or access a field by its default name.

The default names of tuple fields are `Item1`, `Item2`, `Item3`, and so on. You can always use the default name of a field, even when a field name is specified explicitly or inferred, as the following example shows:

[language="csharp" source="snippets/shared/ValueTuples.cs" id="DefaultFieldNames"::: (complete source file; reference: snippets/shared/ValueTuples.cs)](../../../../_code/docs/csharp/language-reference/builtin-types/snippets/shared/ValueTuples.cs.md)

[Tuple assignment](#tuple-assignment-and-deconstruction) and [tuple equality comparisons](#tuple-equality) don't take field names into account.

At compile time, the compiler replaces non-default field names with the corresponding default names. As a result, explicitly specified or inferred field names aren't available at run time.

> **Tip:**
> Enable .NET code style rule [IDE0037](../../../fundamentals/code-analysis/style-rules/ide0037.md) to set a preference on inferred or explicit tuple field names.

Beginning with C# 12, you can specify an alias for a tuple type with a [`using` directive](../keywords/using-directive.md#the-using-alias). The following example adds a `global using` alias for a tuple type with two integer values for an allowed `Min` and `Max` value:

[language="csharp" source="snippets/shared/ValueTuples.cs" id="AliasTupleType"::: (complete source file; reference: snippets/shared/ValueTuples.cs)](../../../../_code/docs/csharp/language-reference/builtin-types/snippets/shared/ValueTuples.cs.md)

After declaring the alias, you can use the `BandPass` name as an alias for that tuple type:

[language="csharp" source="snippets/shared/ValueTuples.cs" id="UseAliasType"::: (complete source file; reference: snippets/shared/ValueTuples.cs)](../../../../_code/docs/csharp/language-reference/builtin-types/snippets/shared/ValueTuples.cs.md)

An alias doesn't introduce a new *type*, but only creates a synonym for an existing type. You can deconstruct a tuple declared with the `BandPass` alias the same as you can with its underlying tuple type:

[language="csharp" source="snippets/shared/ValueTuples.cs" id="DeconstructAlias"::: (complete source file; reference: snippets/shared/ValueTuples.cs)](../../../../_code/docs/csharp/language-reference/builtin-types/snippets/shared/ValueTuples.cs.md)

As with tuple assignment or deconstruction, the tuple member names don't need to match; the types do.

Similarly, a second alias with the same arity and member types can be used interchangeably with the original alias. You could declare a second alias:

[language="csharp" source="snippets/shared/ValueTuples.cs" id="AliasSynonym"::: (complete source file; reference: snippets/shared/ValueTuples.cs)](../../../../_code/docs/csharp/language-reference/builtin-types/snippets/shared/ValueTuples.cs.md)

You can assign a `Range` tuple to a `BandPass` tuple. As with all tuple assignment, the field names need not match, only the types and the arity.

[language="csharp" source="snippets/shared/ValueTuples.cs" id="AliasSynonymUses"::: (complete source file; reference: snippets/shared/ValueTuples.cs)](../../../../_code/docs/csharp/language-reference/builtin-types/snippets/shared/ValueTuples.cs.md)

An alias for a tuple type provides more semantic information when you use tuples. It doesn't introduce a new type. To provide type safety, you should declare a positional [`record`](record.md) instead.

## Tuple assignment and deconstruction

C# supports assignment between tuple types that satisfy both of the following conditions:

- Both tuple types have the same number of elements.
- For each tuple position, the type of the right-hand tuple element is the same as or implicitly convertible to the type of the corresponding left-hand tuple element.

Assign tuple element values by following the order of tuple elements. The assignment process ignores the names of tuple fields, as the following example shows:

[language="csharp" source="snippets/shared/ValueTuples.cs" id="Assignment"::: (complete source file; reference: snippets/shared/ValueTuples.cs)](../../../../_code/docs/csharp/language-reference/builtin-types/snippets/shared/ValueTuples.cs.md)

Use the assignment operator `=` to *deconstruct* a tuple instance into separate variables. You can do that in many ways:

- Use the `var` keyword outside the parentheses to declare implicitly typed variables and let the compiler infer their types:

  [language="csharp" source="snippets/shared/ValueTuples.cs" id="DeconstructVar"::: (complete source file; reference: snippets/shared/ValueTuples.cs)](../../../../_code/docs/csharp/language-reference/builtin-types/snippets/shared/ValueTuples.cs.md)

- Explicitly declare the type of each variable inside parentheses:

  [language="csharp" source="snippets/shared/ValueTuples.cs" id="DeconstructExplicit"::: (complete source file; reference: snippets/shared/ValueTuples.cs)](../../../../_code/docs/csharp/language-reference/builtin-types/snippets/shared/ValueTuples.cs.md)

- Declare some types explicitly and other types implicitly (with `var`) inside the parentheses:

  [language="csharp" source="snippets/shared/ValueTuples.cs" id="DeconstructMixed"::: (complete source file; reference: snippets/shared/ValueTuples.cs)](../../../../_code/docs/csharp/language-reference/builtin-types/snippets/shared/ValueTuples.cs.md)

- Use existing variables:

  [language="csharp" source="snippets/shared/ValueTuples.cs" id="DeconstructExisting"::: (complete source file; reference: snippets/shared/ValueTuples.cs)](../../../../_code/docs/csharp/language-reference/builtin-types/snippets/shared/ValueTuples.cs.md)

The destination of a deconstruct expression can include both existing variables and variables declared in the deconstruction declaration.

You can also combine deconstruction with [pattern matching](../../fundamentals/patterns/pattern-matching.md) to inspect the characteristics of fields in a tuple. The following example loops through several integers and prints those that are divisible by 3. It deconstructs the tuple result of [System.Int32.DivRem*](https://learn.microsoft.com/search/?terms=System.Int32.DivRem*) and matches against a `Remainder` of 0:

[language="csharp" source="snippets/shared/ValueTuples.cs" id="DeconstructToPattern"::: (complete source file; reference: snippets/shared/ValueTuples.cs)](../../../../_code/docs/csharp/language-reference/builtin-types/snippets/shared/ValueTuples.cs.md)

For more information about deconstruction of tuples and other types, see [Deconstructing tuples and other types](../../fundamentals/patterns/deconstruct.md).

## Tuple equality

Tuple types support the `==` and `!=` operators. These operators compare members of the left-hand operand with the corresponding members of the right-hand operand following the order of tuple elements.

[language="csharp" source="snippets/shared/ValueTuples.cs" id="TupleEquality"::: (complete source file; reference: snippets/shared/ValueTuples.cs)](../../../../_code/docs/csharp/language-reference/builtin-types/snippets/shared/ValueTuples.cs.md)

As the preceding example shows, the `==` and `!=` operations don't take tuple field names into account.

Two tuples are comparable when both of the following conditions are satisfied:

- Both tuples have the same number of elements. For example, `t1 != t2` doesn't compile if `t1` and `t2` have different numbers of elements.
- For each tuple position, the corresponding elements from the left-hand and right-hand tuple operands are comparable by using the `==` and `!=` operators. For example, `(1, (2, 3)) == ((1, 2), 3)` doesn't compile because `1` isn't comparable with `(1, 2)`.

The `==` and `!=` operators compare tuples in a short-circuiting way. That is, an operation stops as soon as it meets a pair of non equal elements or reaches the ends of tuples. However, before any comparison, *all* tuple elements are evaluated, as the following example shows:

[language="csharp" source="snippets/shared/ValueTuples.cs" id="TupleEvaluationForEquality"::: (complete source file; reference: snippets/shared/ValueTuples.cs)](../../../../_code/docs/csharp/language-reference/builtin-types/snippets/shared/ValueTuples.cs.md)

## Tuples as out parameters

Typically, you refactor a method that has [`out` parameters](../keywords/method-parameters.md#out-parameter-modifier) into a method that returns a tuple. However, some cases exist where an `out` parameter can be a tuple type. The following example shows how to work with tuples as `out` parameters:

[language="csharp" source="snippets/shared/ValueTuples.cs" id="TupleAsOutParameter"::: (complete source file; reference: snippets/shared/ValueTuples.cs)](../../../../_code/docs/csharp/language-reference/builtin-types/snippets/shared/ValueTuples.cs.md)

## Tuples vs `System.Tuple`

C# tuples use [System.ValueTuple](https://learn.microsoft.com/search/?terms=System.ValueTuple) types and differ from tuples that use [System.Tuple](https://learn.microsoft.com/search/?terms=System.Tuple) types. The main differences are:

- `System.ValueTuple` types are [value types](value-types.md). `System.Tuple` types are [reference types](../keywords/reference-types.md).
- `System.ValueTuple` types are mutable. `System.Tuple` types are immutable.
- Data members of `System.ValueTuple` types are fields. Data members of `System.Tuple` types are properties.

## C# language specification

For more information, see:

- [Tuple types](https://learn.microsoft.com/dotnet/csharp/language-reference/language-specification/types#8311-tuple-types)
- [Tuple equality operators](https://learn.microsoft.com/dotnet/csharp/language-reference/language-specification/expressions#121211-tuple-equality-operators)

## See also

- [Value types](value-types.md)
- [Choosing between anonymous and tuple types](../../../standard/base-types/choosing-between-anonymous-and-tuple.md)
- [System.ValueTuple](https://learn.microsoft.com/search/?terms=System.ValueTuple)
