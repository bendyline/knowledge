---
title: "Type Conversion in .NET"
description: Read about type conversion in .NET, which creates a value in a new type that's equivalent to the old type's value, but may not keep the original's identity.
ms.topic: concept-article
ms.date: 03/30/2017
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "widening conversions"
  - "explicit conversions"
  - "narrowing conversions"
  - "type conversion, about type conversion"
  - "type conversion"
  - "converting types"
  - "narrowing coercion"
  - "Explicit operator"
  - "IConvertible interface"
  - "base types, converting"
  - "op_Implicit method"
  - "widening coercion"
  - "op_Explicit method"
  - "Convert class"
  - "implicit conversions"
  - "Implicit operator"
  - "data types [.NET], converting"
ms.assetid: ba36154f-064c-47d3-9f05-72f93a7ca96d
---
# Type conversion in .NET

Every value has an associated type, which defines attributes such as the amount of space allocated to the value, the range of possible values it can have, and the members that it makes available. Many values can be expressed as more than one type. For example, the value 4 can be expressed as an integer or a floating-point value. Type conversion creates a value in a new type that is equivalent to the value of an old type, but does not necessarily preserve the identity (or exact value) of the original object.

.NET automatically supports the following conversions:

- Conversion from a derived class to a base class. This means, for example, that an instance of any class or structure can be converted to an [System.Object](https://learn.microsoft.com/search/?terms=System.Object) instance.  This conversion does not require a casting or conversion operator.

- Conversion from a base class back to the original derived class. In C#, this conversion requires a casting operator. In Visual Basic, it requires the `CType` operator if `Option Strict` is on.

- Conversion from a type that implements an interface to an interface object that represents that interface. This conversion does not require a casting or conversion operator.

- Conversion from an interface object back to the original type that implements that interface.  In C#, this conversion requires a casting operator. In Visual Basic, it requires the `CType` operator if `Option Strict` is on.

In addition to these automatic conversions, .NET provides several features that support custom type conversion. These include the following:

- The `Implicit` operator, which defines the available widening conversions between types. For more information, see the [Implicit Conversion with the Implicit Operator](#implicit-conversion-with-the-implicit-operator) section.

- The `Explicit` operator, which defines the available narrowing conversions between types. For more information, see the [Explicit Conversion with the Explicit Operator](#explicit-conversion-with-the-explicit-operator) section.

- The [System.IConvertible](https://learn.microsoft.com/search/?terms=System.IConvertible) interface, which defines conversions to each of the base .NET data types. For more information, see [The IConvertible Interface](#the-iconvertible-interface) section.

- The [System.Convert](https://learn.microsoft.com/search/?terms=System.Convert) class, which provides a set of methods that implement the methods in the [System.IConvertible](https://learn.microsoft.com/search/?terms=System.IConvertible) interface. For more information, see [The Convert Class](#the-convert-class) section.

- The [System.ComponentModel.TypeConverter](https://learn.microsoft.com/search/?terms=System.ComponentModel.TypeConverter) class, which is a base class that can be extended to support the conversion of a specified type to any other type. For more information, see [The TypeConverter Class](#the-typeconverter-class) section.

## Implicit conversion with the implicit operator

Widening conversions involve the creation of a new value from the value of an existing type that has either a more restrictive range or a more restricted member list than the target type. Widening conversions cannot result in data loss (although they may result in a loss of precision). Because data cannot be lost, compilers can handle the conversion implicitly or transparently, without requiring the use of an explicit conversion method or a casting operator.

> **Note:**
> Although code that performs an implicit conversion can call a conversion method or use a casting operator, their use is not required by compilers that support implicit conversions.

 For example, the [System.Decimal](https://learn.microsoft.com/search/?terms=System.Decimal) type supports implicit conversions from [System.Byte](https://learn.microsoft.com/search/?terms=System.Byte), [System.Char](https://learn.microsoft.com/search/?terms=System.Char), [System.Int16](https://learn.microsoft.com/search/?terms=System.Int16), [System.Int32](https://learn.microsoft.com/search/?terms=System.Int32), [System.Int64](https://learn.microsoft.com/search/?terms=System.Int64), [System.SByte](https://learn.microsoft.com/search/?terms=System.SByte), [System.UInt16](https://learn.microsoft.com/search/?terms=System.UInt16), [System.UInt32](https://learn.microsoft.com/search/?terms=System.UInt32), and [System.UInt64](https://learn.microsoft.com/search/?terms=System.UInt64) values. The following example illustrates some of these implicit conversions in assigning values to a [System.Decimal](https://learn.microsoft.com/search/?terms=System.Decimal) variable.

 [Conceptual.Conversion#1 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.conversion/cs/implicit1.cs#1)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.conversion/cs/implicit1.cs.md)
 [Conceptual.Conversion#1 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.conversion/vb/implicit1.vb#1)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.conversion/vb/implicit1.vb.md)

 If a particular language compiler supports custom operators, you can also define implicit conversions in your own custom types. The following example provides a partial implementation of a signed byte data type named `ByteWithSign` that uses sign-and-magnitude representation. It supports implicit conversion of [System.Byte](https://learn.microsoft.com/search/?terms=System.Byte) and [System.SByte](https://learn.microsoft.com/search/?terms=System.SByte) values to `ByteWithSign` values.

 [Conceptual.Conversion#2 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.conversion/cs/implicit1.cs#2)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.conversion/cs/implicit1.cs.md)
 [Conceptual.Conversion#2 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.conversion/vb/implicit1.vb#2)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.conversion/vb/implicit1.vb.md)

 Client code can then declare a `ByteWithSign` variable and assign it [System.Byte](https://learn.microsoft.com/search/?terms=System.Byte) and [System.SByte](https://learn.microsoft.com/search/?terms=System.SByte) values without performing any explicit conversions or using any casting operators, as the following example shows.

 [Conceptual.Conversion#3 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.conversion/cs/implicit1.cs#3)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.conversion/cs/implicit1.cs.md)
 [Conceptual.Conversion#3 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.conversion/vb/implicit1.vb#3)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.conversion/vb/implicit1.vb.md)

## Explicit conversion with the explicit operator

Narrowing conversions involve the creation of a new value from the value of an existing type that has either a greater range or a larger member list than the target type. Because a narrowing conversion can result in a loss of data, compilers often require that the conversion be made explicit through a call to a conversion method or a casting operator. That is, the conversion must be handled explicitly in developer code.

> **Note:**
> The major purpose of requiring a conversion method or casting operator for narrowing conversions is to make the developer aware of the possibility of data loss or an [System.OverflowException](https://learn.microsoft.com/search/?terms=System.OverflowException) so that it can be handled in code. However, some compilers can relax this requirement. For example, in Visual Basic, if `Option Strict` is off (its default setting), the Visual Basic compiler tries to perform narrowing conversions implicitly.

 For example, the [System.UInt32](https://learn.microsoft.com/search/?terms=System.UInt32), [System.Int64](https://learn.microsoft.com/search/?terms=System.Int64), and [System.UInt64](https://learn.microsoft.com/search/?terms=System.UInt64) data types have ranges that exceed that the [System.Int32](https://learn.microsoft.com/search/?terms=System.Int32) data type, as the following table shows.

| Type | Comparison with range of Int32 |
| --- | --- |
| [System.Int64](https://learn.microsoft.com/search/?terms=System.Int64) | [System.Int64.MaxValue](https://learn.microsoft.com/search/?terms=System.Int64.MaxValue) is greater than [System.Int32.MaxValue](https://learn.microsoft.com/search/?terms=System.Int32.MaxValue), and [System.Int64.MinValue](https://learn.microsoft.com/search/?terms=System.Int64.MinValue) is less than (has a greater negative range than) [System.Int32.MinValue](https://learn.microsoft.com/search/?terms=System.Int32.MinValue). |
| [System.UInt32](https://learn.microsoft.com/search/?terms=System.UInt32) | [System.UInt32.MaxValue](https://learn.microsoft.com/search/?terms=System.UInt32.MaxValue) is greater than [System.Int32.MaxValue](https://learn.microsoft.com/search/?terms=System.Int32.MaxValue). |
| [System.UInt64](https://learn.microsoft.com/search/?terms=System.UInt64) | [System.UInt64.MaxValue](https://learn.microsoft.com/search/?terms=System.UInt64.MaxValue) is greater than [System.Int32.MaxValue](https://learn.microsoft.com/search/?terms=System.Int32.MaxValue). |

 To handle such narrowing conversions, .NET allows types to define an `Explicit` operator. Individual language compilers can then implement this operator using their own syntax, or a member of the [System.Convert](https://learn.microsoft.com/search/?terms=System.Convert) class can be called to perform the conversion. (For more information about the [System.Convert](https://learn.microsoft.com/search/?terms=System.Convert) class, see [The Convert Class](#the-convert-class) later in this topic.) The following example illustrates the use of language features to handle the explicit conversion of these potentially out-of-range integer values to [System.Int32](https://learn.microsoft.com/search/?terms=System.Int32) values.

 [Conceptual.Conversion#4 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.conversion/cs/explicit1.cs#4)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.conversion/cs/explicit1.cs.md)
 [Conceptual.Conversion#4 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.conversion/vb/explicit1.vb#4)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.conversion/vb/explicit1.vb.md)

 Explicit conversions can produce different results in different languages, and these results can differ from the value returned by the corresponding [System.Convert](https://learn.microsoft.com/search/?terms=System.Convert) method. For example, if the [System.Double](https://learn.microsoft.com/search/?terms=System.Double) value 12.63251 is converted to an [System.Int32](https://learn.microsoft.com/search/?terms=System.Int32), both the Visual Basic `CInt` method and the .NET [System.Convert.ToInt32%28System.Double%29](https://learn.microsoft.com/search/?terms=System.Convert.ToInt32%2528System.Double%2529) method round the [System.Double](https://learn.microsoft.com/search/?terms=System.Double) to return a value of 13, but the C# `(int)` operator truncates the [System.Double](https://learn.microsoft.com/search/?terms=System.Double) to return a value of 12. Similarly, the C# `(int)` operator does not support Boolean-to-integer conversion, but the Visual Basic `CInt` method converts a value of `true` to -1. On the other hand, the [System.Convert.ToInt32%28System.Boolean%29](https://learn.microsoft.com/search/?terms=System.Convert.ToInt32%2528System.Boolean%2529) method converts a value of `true` to 1.

 Most compilers allow explicit conversions to be performed in a checked or unchecked manner. When a checked conversion is performed, an [System.OverflowException](https://learn.microsoft.com/search/?terms=System.OverflowException) is thrown when the value of the type to be converted is outside the range of the target type. When an unchecked conversion is performed under the same conditions, the conversion might not throw an exception, but the exact behavior becomes undefined and an incorrect value might result.

> **Note:**
> In C#, checked conversions can be performed by using the `checked` keyword together with a casting operator, or by specifying the `/checked+` compiler option. Conversely, unchecked conversions can be performed by using the `unchecked` keyword together with the casting operator, or by specifying the `/checked-` compiler option. By default, explicit conversions are unchecked. In Visual Basic, checked conversions can be performed by clearing the **Remove integer overflow checks** check box in the project's **Advanced Compiler Settings** dialog box, or by specifying the `/removeintchecks-` compiler option. Conversely, unchecked conversions can be performed by selecting the **Remove integer overflow checks** check box in the project's **Advanced Compiler Settings** dialog box or by specifying the `/removeintchecks+` compiler option. By default, explicit conversions are checked.

 The following C# example uses the `checked` and `unchecked` keywords to illustrate the difference in behavior when a value outside the range of a [System.Byte](https://learn.microsoft.com/search/?terms=System.Byte) is converted to a [System.Byte](https://learn.microsoft.com/search/?terms=System.Byte). The checked conversion throws an exception, but the unchecked conversion assigns [System.Byte.MaxValue](https://learn.microsoft.com/search/?terms=System.Byte.MaxValue) to the [System.Byte](https://learn.microsoft.com/search/?terms=System.Byte) variable.

 [Conceptual.Conversion#12 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.conversion/cs/explicit1.cs#12)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.conversion/cs/explicit1.cs.md)

 If a particular language compiler supports custom overloaded operators, you can also define explicit conversions in your own custom types. The following example provides a partial implementation of a signed byte data type named `ByteWithSign` that uses sign-and-magnitude representation. It supports explicit conversion of [System.Int32](https://learn.microsoft.com/search/?terms=System.Int32) and [System.UInt32](https://learn.microsoft.com/search/?terms=System.UInt32) values to `ByteWithSign` values.

 [Conceptual.Conversion#5 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.conversion/cs/explicit1.cs#5)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.conversion/cs/explicit1.cs.md)
 [Conceptual.Conversion#5 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.conversion/vb/explicit1.vb#5)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.conversion/vb/explicit1.vb.md)

 Client code can then declare a `ByteWithSign` variable and assign it [System.Int32](https://learn.microsoft.com/search/?terms=System.Int32) and [System.UInt32](https://learn.microsoft.com/search/?terms=System.UInt32) values if the assignments include a casting operator or a conversion method, as the following example shows.

 [Conceptual.Conversion#6 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.conversion/cs/explicit1.cs#6)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.conversion/cs/explicit1.cs.md)
 [Conceptual.Conversion#6 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.conversion/vb/explicit1.vb#6)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.conversion/vb/explicit1.vb.md)

## The IConvertible interface

To support the conversion of any type to a common language runtime base type, .NET provides the [System.IConvertible](https://learn.microsoft.com/search/?terms=System.IConvertible) interface. The implementing type is required to provide the following:

- A method that returns the [System.TypeCode](https://learn.microsoft.com/search/?terms=System.TypeCode) of the implementing type.

- Methods to convert the implementing type to each common language runtime base type ([System.Boolean](https://learn.microsoft.com/search/?terms=System.Boolean), [System.Byte](https://learn.microsoft.com/search/?terms=System.Byte), [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime), [System.Decimal](https://learn.microsoft.com/search/?terms=System.Decimal), [System.Double](https://learn.microsoft.com/search/?terms=System.Double), and so on).

- A generalized conversion method to convert an instance of the implementing type to another specified type. Conversions that are not supported should throw an [System.InvalidCastException](https://learn.microsoft.com/search/?terms=System.InvalidCastException).

 Each common language runtime base type (that is, the [System.Boolean](https://learn.microsoft.com/search/?terms=System.Boolean), [System.Byte](https://learn.microsoft.com/search/?terms=System.Byte), [System.Char](https://learn.microsoft.com/search/?terms=System.Char), [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime), [System.Decimal](https://learn.microsoft.com/search/?terms=System.Decimal), [System.Double](https://learn.microsoft.com/search/?terms=System.Double), [System.Int16](https://learn.microsoft.com/search/?terms=System.Int16), [System.Int32](https://learn.microsoft.com/search/?terms=System.Int32), [System.Int64](https://learn.microsoft.com/search/?terms=System.Int64), [System.SByte](https://learn.microsoft.com/search/?terms=System.SByte), [System.Single](https://learn.microsoft.com/search/?terms=System.Single), [System.String](https://learn.microsoft.com/search/?terms=System.String), [System.UInt16](https://learn.microsoft.com/search/?terms=System.UInt16), [System.UInt32](https://learn.microsoft.com/search/?terms=System.UInt32), and [System.UInt64](https://learn.microsoft.com/search/?terms=System.UInt64)), as well as the [System.DBNull](https://learn.microsoft.com/search/?terms=System.DBNull) and [System.Enum](https://learn.microsoft.com/search/?terms=System.Enum) types, implement the [System.IConvertible](https://learn.microsoft.com/search/?terms=System.IConvertible) interface. However, these are explicit interface implementations; the conversion method can be called only through an [System.IConvertible](https://learn.microsoft.com/search/?terms=System.IConvertible) interface variable, as the following example shows. This example converts an [System.Int32](https://learn.microsoft.com/search/?terms=System.Int32) value to its equivalent [System.Char](https://learn.microsoft.com/search/?terms=System.Char) value.

 [Conceptual.Conversion#7 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.conversion/cs/iconvertible1.cs#7)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.conversion/cs/iconvertible1.cs.md)
 [Conceptual.Conversion#7 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.conversion/vb/iconvertible1.vb#7)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.conversion/vb/iconvertible1.vb.md)

 The requirement to call the conversion method on its interface rather than on the implementing type makes explicit interface implementations relatively expensive. Instead, we recommend that you call the appropriate member of the [System.Convert](https://learn.microsoft.com/search/?terms=System.Convert) class to convert between common language runtime base types. For more information, see the next section, [The Convert Class](#the-convert-class).

> **Note:**
> In addition to the [System.IConvertible](https://learn.microsoft.com/search/?terms=System.IConvertible) interface and the [System.Convert](https://learn.microsoft.com/search/?terms=System.Convert) class provided by .NET, individual languages may also provide ways to perform conversions. For example, C# uses casting operators; Visual Basic uses compiler-implemented conversion functions such as `CType`, `CInt`, and `DirectCast`.

 For the most part, the [System.IConvertible](https://learn.microsoft.com/search/?terms=System.IConvertible) interface is designed to support conversion between the base types in .NET. However, the interface can also be implemented by a custom type to support conversion of that type to other custom types. For more information, see the section [Custom Conversions with the ChangeType Method](#custom-conversions-with-the-changetype-method) later in this topic.

## The Convert class

Although each base type's [System.IConvertible](https://learn.microsoft.com/search/?terms=System.IConvertible) interface implementation can be called to perform a type conversion, calling the methods of the [System.Convert](https://learn.microsoft.com/search/?terms=System.Convert) class is the recommended language-neutral way to convert from one base type to another. In addition, the [System.Convert.ChangeType%28System.Object%2CSystem.Type%2CSystem.IFormatProvider%29](https://learn.microsoft.com/search/?terms=System.Convert.ChangeType%2528System.Object%252CSystem.Type%252CSystem.IFormatProvider%2529) method can be used to convert from a specified custom type to another type.

### Conversions between base types

The [System.Convert](https://learn.microsoft.com/search/?terms=System.Convert) class provides a language-neutral way to perform conversions between base types and is available to all languages that target the common language runtime. It provides a complete set of methods for both widening and narrowing conversions, and throws an [System.InvalidCastException](https://learn.microsoft.com/search/?terms=System.InvalidCastException) for conversions that are not supported (such as the conversion of a [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) value to an integer value). Narrowing conversions are performed in a checked context, and an [System.OverflowException](https://learn.microsoft.com/search/?terms=System.OverflowException) is thrown if the conversion fails.

> **Important:**
> Because the [System.Convert](https://learn.microsoft.com/search/?terms=System.Convert) class includes methods to convert to and from each base type, it eliminates the need to call each base type's [System.IConvertible](https://learn.microsoft.com/search/?terms=System.IConvertible) explicit interface implementation.

 The following example illustrates the use of the [System.Convert](https://learn.microsoft.com/search/?terms=System.Convert) class to perform several widening and narrowing conversions between .NET base types.

 [Conceptual.Conversion#8 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.conversion/cs/convert1.cs#8)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.conversion/cs/convert1.cs.md)
 [Conceptual.Conversion#8 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.conversion/vb/convert1.vb#8)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.conversion/vb/convert1.vb.md)

 In some cases, particularly when converting to and from floating-point values, a conversion may involve a loss of precision, even though it does not throw an [System.OverflowException](https://learn.microsoft.com/search/?terms=System.OverflowException). The following example illustrates this loss of precision. In the first case, a [System.Decimal](https://learn.microsoft.com/search/?terms=System.Decimal) value has less precision (fewer significant digits) when it is converted to a [System.Double](https://learn.microsoft.com/search/?terms=System.Double). In the second case, a [System.Double](https://learn.microsoft.com/search/?terms=System.Double) value is rounded from 42.72 to 43 in order to complete the conversion.

 [Conceptual.Conversion#9 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.conversion/cs/convert1.cs#9)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.conversion/cs/convert1.cs.md)
 [Conceptual.Conversion#9 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.conversion/vb/convert1.vb#9)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.conversion/vb/convert1.vb.md)

 For a table that lists both the widening and narrowing conversions supported by the [System.Convert](https://learn.microsoft.com/search/?terms=System.Convert) class, see [Type Conversion Tables](conversion-tables.md).

### Custom conversions with the ChangeType method

In addition to supporting conversions to each of the base types, the [System.Convert](https://learn.microsoft.com/search/?terms=System.Convert) class can be used to convert a custom type to one or more predefined types. This conversion is performed by the [System.Convert.ChangeType%28System.Object%2CSystem.Type%2CSystem.IFormatProvider%29](https://learn.microsoft.com/search/?terms=System.Convert.ChangeType%2528System.Object%252CSystem.Type%252CSystem.IFormatProvider%2529) method, which in turn wraps a call to the [System.IConvertible.ToType*](https://learn.microsoft.com/search/?terms=System.IConvertible.ToType*) method of the `value` parameter. This means that the object represented by the `value` parameter must provide an implementation of the [System.IConvertible](https://learn.microsoft.com/search/?terms=System.IConvertible) interface.

> **Note:**
> Because the [System.Convert.ChangeType%28System.Object%2CSystem.Type%29](https://learn.microsoft.com/search/?terms=System.Convert.ChangeType%2528System.Object%252CSystem.Type%2529) and [System.Convert.ChangeType%28System.Object%2CSystem.Type%2CSystem.IFormatProvider%29](https://learn.microsoft.com/search/?terms=System.Convert.ChangeType%2528System.Object%252CSystem.Type%252CSystem.IFormatProvider%2529) methods use a [System.Type](https://learn.microsoft.com/search/?terms=System.Type) object to specify the target type to which `value` is converted, they can be used to perform a dynamic conversion to an object whose type is not known at compile time. However, note that the [System.IConvertible](https://learn.microsoft.com/search/?terms=System.IConvertible) implementation of `value` must still support this conversion.

 The following example illustrates a possible implementation of the [System.IConvertible](https://learn.microsoft.com/search/?terms=System.IConvertible) interface that allows a `TemperatureCelsius` object to be converted to a `TemperatureFahrenheit` object and vice versa. The example defines a base class, `Temperature`, that implements the [System.IConvertible](https://learn.microsoft.com/search/?terms=System.IConvertible) interface and overrides the [System.Object.ToString*](https://learn.microsoft.com/search/?terms=System.Object.ToString*) method. The derived `TemperatureCelsius` and `TemperatureFahrenheit` classes each override the `ToType` and the `ToString` methods of the base class.

 [Conceptual.Conversion#10 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.conversion/cs/iconvertible2.cs#10)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.conversion/cs/iconvertible2.cs.md)
 [Conceptual.Conversion#10 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.conversion/vb/iconvertible2.vb#10)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.conversion/vb/iconvertible2.vb.md)

 The following example illustrates several calls to these [System.IConvertible](https://learn.microsoft.com/search/?terms=System.IConvertible) implementations to convert `TemperatureCelsius` objects to `TemperatureFahrenheit` objects and vice versa.

 [Conceptual.Conversion#11 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.conversion/cs/iconvertible2.cs#11)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.conversion/cs/iconvertible2.cs.md)
 [Conceptual.Conversion#11 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.conversion/vb/iconvertible2.vb#11)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.conversion/vb/iconvertible2.vb.md)

## The TypeConverter class

.NET also allows you to define a type converter for a custom type by extending the [System.ComponentModel.TypeConverter](https://learn.microsoft.com/search/?terms=System.ComponentModel.TypeConverter) class and associating the type converter with the type through a [System.ComponentModel.TypeConverterAttribute](https://learn.microsoft.com/search/?terms=System.ComponentModel.TypeConverterAttribute) attribute. The following table highlights the differences between this approach and implementing the [System.IConvertible](https://learn.microsoft.com/search/?terms=System.IConvertible) interface for a custom type.

> **Note:**
> Design-time support can be provided for a custom type only if it has a type converter defined for it.

| Conversion using TypeConverter | Conversion using IConvertible |
| --- | --- |
| Is implemented for a custom type by deriving a separate class from [System.ComponentModel.TypeConverter](https://learn.microsoft.com/search/?terms=System.ComponentModel.TypeConverter). This derived class is associated with the custom type by applying a [System.ComponentModel.TypeConverterAttribute](https://learn.microsoft.com/search/?terms=System.ComponentModel.TypeConverterAttribute) attribute. | Is implemented by a custom type to perform conversion. A user of the type invokes an [System.IConvertible](https://learn.microsoft.com/search/?terms=System.IConvertible) conversion method on the type. |
| Can be used both at design time and at runtime. | Can be used only at runtime. |
| Uses reflection; therefore, is slower than conversion enabled by [System.IConvertible](https://learn.microsoft.com/search/?terms=System.IConvertible). | Does not use reflection. |
| Allows two-way type conversions from the custom type to other data types, and from other data types to the custom type. For example, a [System.ComponentModel.TypeConverter](https://learn.microsoft.com/search/?terms=System.ComponentModel.TypeConverter) defined for `MyType` allows conversions from `MyType` to [System.String](https://learn.microsoft.com/search/?terms=System.String), and from [System.String](https://learn.microsoft.com/search/?terms=System.String) to `MyType`. | Allows conversion from a custom type to other data types, but not from other data types to the custom type. |

 For more information about using type converters to perform conversions, see [System.ComponentModel.TypeConverter](https://learn.microsoft.com/search/?terms=System.ComponentModel.TypeConverter).

## See also

- [System.Convert](https://learn.microsoft.com/search/?terms=System.Convert)
- [System.IConvertible](https://learn.microsoft.com/search/?terms=System.IConvertible)
- [Type Conversion Tables](conversion-tables.md)
