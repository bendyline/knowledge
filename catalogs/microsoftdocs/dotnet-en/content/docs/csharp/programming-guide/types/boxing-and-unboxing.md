---
title: "Boxing and Unboxing"
description: Learn about boxing and unboxing in C# programming. See code examples and view other available resources.
ms.date: 10/13/2025
f1_keywords: 
  - "cs.boxing"
helpviewer_keywords: 
  - "C# language, boxing"
  - "C# language, unboxing"
  - "unboxing [C#]"
  - "boxing [C#]"
ms.assetid: 8da9bbf4-bce9-4b08-b2e5-f64c11c56514
---
# Boxing and Unboxing (C# Programming Guide)

Boxing is the process of converting a [value type](../../language-reference/builtin-types/value-types.md) to the type `object` or to any interface type implemented by this value type. When the common language runtime (CLR) boxes a value type, it wraps the value inside a [System.Object](https://learn.microsoft.com/search/?terms=System.Object) instance and stores it on the managed heap. Unboxing extracts the value type from the object. Boxing is implicit; unboxing is explicit. The concept of boxing and unboxing underlies the C# unified view of the type system in which a value of any type can be treated as an object.

In the following example, the integer variable `i` is *boxed* and assigned to object `o`.

[csProgGuideTypes#14 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_VBCSharp/CsProgGuideTypes/CS/Class1.cs#14)](../../../../_code/samples/snippets/csharp/VS_Snippets_VBCSharp/CsProgGuideTypes/CS/Class1.cs.md)

The object `o` can then be unboxed and assigned to integer variable `i`:

[csProgGuideTypes#15 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_VBCSharp/CsProgGuideTypes/CS/Class1.cs#15)](../../../../_code/samples/snippets/csharp/VS_Snippets_VBCSharp/CsProgGuideTypes/CS/Class1.cs.md)

The following examples illustrate how boxing is used in C#.

[csProgGuideTypes#47 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_VBCSharp/CsProgGuideTypes/CS/Class1.cs#47)](../../../../_code/samples/snippets/csharp/VS_Snippets_VBCSharp/CsProgGuideTypes/CS/Class1.cs.md)

## Performance

In relation to simple assignments, boxing and unboxing are computationally expensive processes. When a value type is boxed, a new object must be allocated and constructed. To a lesser degree, the cast required for unboxing is also expensive computationally. For more information, see [Performance](../../../framework/performance/performance-tips.md).

## Boxing

Boxing is used to store value types in the garbage-collected heap. Boxing is an implicit conversion of a [value type](../../language-reference/builtin-types/value-types.md) to the type `object` or to any interface type implemented by this value type. Boxing a value type allocates an object instance on the heap and copies the value into the new object.

Consider the following declaration of a value-type variable:

[csProgGuideTypes#17 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_VBCSharp/CsProgGuideTypes/CS/Class1.cs#17)](../../../../_code/samples/snippets/csharp/VS_Snippets_VBCSharp/CsProgGuideTypes/CS/Class1.cs.md)

The following statement implicitly applies the boxing operation on the variable `i`:

[csProgGuideTypes#18 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_VBCSharp/CsProgGuideTypes/CS/Class1.cs#18)](../../../../_code/samples/snippets/csharp/VS_Snippets_VBCSharp/CsProgGuideTypes/CS/Class1.cs.md)

The result of this statement is creating an object reference `o`, on the stack, that references a value of the type `int`, on the heap. This value is a copy of the value-type value assigned to the variable `i`. The difference between the two variables, `i` and `o`, is illustrated in the following image of boxing conversion:

Graphic showing the difference between i and o variables.

It is also possible to perform the boxing explicitly as in the following example, but explicit boxing is never required:

[csProgGuideTypes#19 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_VBCSharp/CsProgGuideTypes/CS/Class1.cs#19)](../../../../_code/samples/snippets/csharp/VS_Snippets_VBCSharp/CsProgGuideTypes/CS/Class1.cs.md)

### Example

This example converts an integer variable `i` to an object `o` by using boxing. Then, the value stored in the variable `i` is changed from `123` to `456`. The example shows that the original value type and the boxed object use separate memory locations, and therefore can store different values.

[csProgGuideTypes#16 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_VBCSharp/CsProgGuideTypes/CS/Class1.cs#16)](../../../../_code/samples/snippets/csharp/VS_Snippets_VBCSharp/CsProgGuideTypes/CS/Class1.cs.md)

## Unboxing

Unboxing is an explicit conversion from the type `object` to a [value type](../../language-reference/builtin-types/value-types.md) or from an interface type to a value type that implements the interface. An unboxing operation consists of:

- Checking the object instance to make sure that it's a boxed value of the given value type.

- Copying the value from the instance into the value-type variable.

The following statements demonstrate both boxing and unboxing operations:

[csProgGuideTypes#21 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_VBCSharp/CsProgGuideTypes/CS/Class1.cs#21)](../../../../_code/samples/snippets/csharp/VS_Snippets_VBCSharp/CsProgGuideTypes/CS/Class1.cs.md)

The following figure demonstrates the result of the previous statements:

Graphic showing an unboxing conversion.

For the unboxing of value types to succeed at run time, the item being unboxed must be a reference to an object that was previously created by boxing an instance of that value type. Attempting to unbox `null` causes a [System.NullReferenceException](https://learn.microsoft.com/search/?terms=System.NullReferenceException). Attempting to unbox a reference to an incompatible value type causes an [System.InvalidCastException](https://learn.microsoft.com/search/?terms=System.InvalidCastException).

### Example

The following example demonstrates a case of invalid unboxing and the resulting `InvalidCastException`. Using `try` and `catch`, an error message is displayed when the error occurs.

[csProgGuideTypes#20 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_VBCSharp/CsProgGuideTypes/CS/Class1.cs#20)](../../../../_code/samples/snippets/csharp/VS_Snippets_VBCSharp/CsProgGuideTypes/CS/Class1.cs.md)

This program outputs:

`Specified cast is not valid. Error: Incorrect unboxing.`

If you change the statement:

```csharp
int j = (short)o;
```

To:

```csharp
int j = (int)o;
```

The conversion is performed, and you'll get the output:

`Unboxing OK.`

## C# language specification

For more information, see the [C# Language Specification](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/includes/~/_csharpstandard/standard/README.md). The language specification is the definitive source for C# syntax and usage.


## See also

- [Reference types](../../language-reference/keywords/reference-types.md)
- [Value types](../../language-reference/builtin-types/value-types.md)
