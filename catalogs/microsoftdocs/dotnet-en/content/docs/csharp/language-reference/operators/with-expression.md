---
title: "The with expression - create new objects that are modified copies of existing objects"
description: "Learn about a with expression that performs nondestructive mutation of C# records and structures. The `with` keyword provides the means to modify one or more properties in the new object."
ms.date: 01/20/2026
---
# The `with` expression - Nondestructive mutation creates a new object with modified properties

A `with` expression creates a copy of its operand with the specified properties and fields modified. Use the [object initializer](../../programming-guide/classes-and-structs/object-and-collection-initializers.md) syntax to specify which members to modify and their new values:

[language="csharp" source="snippets/with-expression/BasicExample.cs" ::: (complete source file; reference: snippets/with-expression/BasicExample.cs)](../../../../_code/docs/csharp/language-reference/operators/snippets/with-expression/BasicExample.cs.md)

The left-hand operand of a `with` expression can be a [record type](../builtin-types/record.md). It can also be a [structure type](../builtin-types/struct.md), a [tuple](../builtin-types/value-tuples.md), or an [anonymous type](../../programming-guide/classes-and-structs/anonymous-types.md).


The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the [C# language version history](../../whats-new/csharp-version-history.md).


The result of a `with` expression has the same run-time type as the expression's operand, as the following example shows:

[language="csharp" source="snippets/with-expression/InheritanceExample.cs" ::: (complete source file; reference: snippets/with-expression/InheritanceExample.cs)](../../../../_code/docs/csharp/language-reference/operators/snippets/with-expression/InheritanceExample.cs.md)

When a member is a reference type, copying that member copies only the reference to that member instance. Both the copy and original operand access the same reference-type instance. The following example demonstrates that behavior:

[language="csharp" source="snippets/with-expression/ExampleWithReferenceType.cs" ::: (complete source file; reference: snippets/with-expression/ExampleWithReferenceType.cs)](../../../../_code/docs/csharp/language-reference/operators/snippets/with-expression/ExampleWithReferenceType.cs.md)

## Custom copy semantics

Every record class type has a *copy constructor*. A *copy constructor* is a constructor with a single parameter of the containing record type. It copies the state of its argument to a new record instance. When you evaluate a `with` expression, it calls the copy constructor to create a new record instance based on an original record. Then, it updates the new instance with the specified modifications. By default, the compiler synthesizes the copy constructor. To customize the record copy semantics, explicitly declare a copy constructor with the desired behavior. The following example updates the preceding example with an explicit copy constructor. The new copy behavior copies list items instead of a list reference when a record is copied:

[language="csharp" source="snippets/with-expression/UserDefinedCopyConstructor.cs" ::: (complete source file; reference: snippets/with-expression/UserDefinedCopyConstructor.cs)](../../../../_code/docs/csharp/language-reference/operators/snippets/with-expression/UserDefinedCopyConstructor.cs.md)

You can't customize the copy semantics for structure types.

> **Important:**
> In the preceding examples, all properties are independent. None of the properties are computed from other property values. A `with` expression first copies the existing record instance, then modifies any properties or fields specified in the `with` expression. Computed properties in `record` types should be computed on access, not initialized when the instance is created. Otherwise, a property might return the computed value based on the original instance, not the modified copy. For more information, see the language reference article on [`record` types](../builtin-types/record.md#nondestructive-mutation).

## C# language specification

For more information, see the following sections of the [C# language specification](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/README.md):

- [`with` expression](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/expressions.md#1210-with-expressions)
- [Copy and Clone members](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/classes.md#151644-copy-and-clone-members)

## See also

- [C# operators and expressions](index.md)
- [Records](../builtin-types/record.md)
- [Structure types](../builtin-types/struct.md)
