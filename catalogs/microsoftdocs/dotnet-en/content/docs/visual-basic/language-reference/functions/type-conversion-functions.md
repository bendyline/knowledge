---
description: "Learn more about: Type Conversion Functions (Visual Basic)"
title: "Type Conversion Functions"
ms.date: 10/24/2018
f1_keywords:
  - "vb.CUShort"
  - "vb.csng"
  - "vb.CDate"
  - "CByte"
  - "CSng"
  - "vb.CDec"
  - "CBool"
  - "CStr"
  - "vb.CULng"
  - "CDec"
  - "CVErr"
  - "CDbl"
  - "CShort"
  - "vb.CObj"
  - "vb.CVErr"
  - "CULng"
  - "vb.cdbl"
  - "vb.cbool"
  - "CObj"
  - "CDate"
  - "CLng"
  - "vb.cstr"
  - "vb.cbyte"
  - "vb.clng"
  - "vb.CChar"
  - "CUShort"
  - "vb.CUInt"
  - "vb.cint"
  - "vb.CShort"
  - "CInt"
  - "CUInt"
  - "CChar"
helpviewer_keywords:
  - "CDate function"
  - "CByte function"
  - "Integer data type [Visual Basic], converting"
  - "string conversion [Visual Basic], conversion functions"
  - "fractions"
  - "data types [Visual Basic], converting"
  - "text, converting"
  - "CDec function"
  - "Char data type [Visual Basic], converting"
  - "type conversion [Visual Basic], functions for"
  - "Single data type [Visual Basic], converting"
  - "numbers [Visual Basic], rounding"
  - "rounding numbers [Visual Basic], type conversion"
  - "CUShort function"
  - "Long data type [Visual Basic], converting"
  - "return values [Visual Basic], data types"
  - "single-precision numbers [Visual Basic], converting"
  - "data type conversion [Visual Basic], functions for"
  - "CStr function"
  - "times [Visual Basic], converting"
  - "CSng function"
  - "conversions [Visual Basic], type conversion functions"
  - "CBool function"
  - "CDbl function"
  - "CUInt function"
  - "Currency data type [Visual Basic], conversion functions"
  - "numbers [Visual Basic], converting"
  - "Double data type [Visual Basic], converting"
  - "CLng function"
  - "CSByte function"
  - "double-precision numbers"
  - "Decimal data type [Visual Basic], converting"
  - "Boolean data type [Visual Basic], converting"
  - "integers [Visual Basic], type conversion functions"
  - "dates [Visual Basic], converting"
  - "CULng function"
  - "CInt function"
  - "Date data type [Visual Basic], converting"
  - "Byte data type [Visual Basic], converting"
  - "String data type [Visual Basic], converting"
  - "CChar function"
  - "banker's rounding"
  - "Short data type [Visual Basic], converting"
  - "rounding numbers [Visual Basic], banker's rounding"
  - "type conversion [Visual Basic], Visual Basic vs. .NET Framework"
ms.assetid: d9d8d165-f967-44ff-a6cd-598e4740a99e
---
# Type Conversion Functions (Visual Basic)

These functions are compiled inline, meaning the conversion code is part of the code that evaluates the expression. Sometimes there is no call to a procedure to accomplish the conversion, which improves performance. Each function coerces an expression to a specific data type.

## Syntax

```vb
CBool(expression)
CByte(expression)
CChar(expression)
CDate(expression)
CDbl(expression)
CDec(expression)
CInt(expression)
CLng(expression)
CObj(expression)
CSByte(expression)
CShort(expression)
CSng(expression)
CStr(expression)
CUInt(expression)
CULng(expression)
CUShort(expression)
```

## Part

`expression`
Required. Any expression of the source data type.

## Return Value Data Type

The function name determines the data type of the value it returns, as shown in the following table.

| Function name | Return data type | Range for `expression` argument |
| --- | --- | --- |
| `CBool` | [Boolean Data Type](../data-types/boolean-data-type.md) | Any valid `Char` or `String` or numeric expression. |
| `CByte` | [Byte Data Type](../data-types/byte-data-type.md) | [System.Byte.MinValue](https://learn.microsoft.com/search/?terms=System.Byte.MinValue) (0) through [System.Byte.MaxValue](https://learn.microsoft.com/search/?terms=System.Byte.MaxValue) (255) (unsigned); fractional parts are rounded.<sup>1</sup><br/><br/>Starting with Visual Basic 15.8, Visual Basic optimizes the performance of floating-point to byte conversion with the `CByte` function; see the [Remarks](#remarks) section for more information. See the [CInt Example](#cint-example) section for an example. |
| `CChar` | [Char Data Type](../data-types/char-data-type.md) | Any valid `Char` or `String` expression; only first character of a `String` is converted; value can be 0 through 65535 (unsigned). |
| `CDate` | [Date Data Type](../data-types/date-data-type.md) | Any valid representation of a date and time. |
| `CDbl` | [Double Data Type](../data-types/double-data-type.md) | -1.79769313486231570E+308 through -4.94065645841246544E-324 for negative values; 4.94065645841246544E-324 through 1.79769313486231570E+308 for positive values. |
| `CDec` | [Decimal Data Type](../data-types/decimal-data-type.md) | +/-79,228,162,514,264,337,593,543,950,335 for zero-scaled numbers, that is, numbers with no decimal places. For numbers with 28 decimal places, the range is +/-7.9228162514264337593543950335. The smallest possible non-zero number is 0.0000000000000000000000000001 (+/-1E-28). |
| `CInt` | [Integer Data Type](../data-types/integer-data-type.md) | [System.Int32.MinValue](https://learn.microsoft.com/search/?terms=System.Int32.MinValue) (-2,147,483,648) through [System.Int32.MaxValue](https://learn.microsoft.com/search/?terms=System.Int32.MaxValue) (2,147,483,647); fractional parts are rounded.<sup>1</sup> <br/><br/>Starting with Visual Basic 15.8, Visual Basic optimizes the performance of floating-point to integer conversion with the `CInt` function; see the [Remarks](#remarks) section for more information. See the [CInt Example](#cint-example) section for an example. |
| `CLng` | [Long Data Type](../data-types/long-data-type.md) | [System.Int64.MinValue](https://learn.microsoft.com/search/?terms=System.Int64.MinValue) (-9,223,372,036,854,775,808) through [System.Int64.MaxValue](https://learn.microsoft.com/search/?terms=System.Int64.MaxValue) (9,223,372,036,854,775,807); fractional parts are rounded.<sup>1</sup><br/><br/>Starting with Visual Basic 15.8, Visual Basic optimizes the performance of floating-point to 64-bit integer conversion with the `CLng` function; see the [Remarks](#remarks) section for more information. See the [CInt Example](#cint-example) section for an example. |
| `CObj` | [Object Data Type](../data-types/object-data-type.md) | Any valid expression. |
| `CSByte` | [SByte Data Type](../data-types/sbyte-data-type.md) | [System.SByte.MinValue](https://learn.microsoft.com/search/?terms=System.SByte.MinValue) (-128) through [System.SByte.MaxValue](https://learn.microsoft.com/search/?terms=System.SByte.MaxValue) (127); fractional parts are rounded.<sup>1</sup><br/><br/>Starting with Visual Basic 15.8, Visual Basic optimizes the performance of floating-point to signed byte conversion with the `CSByte` function; see the [Remarks](#remarks) section for more information. See the [CInt Example](#cint-example) section for an example. |
| `CShort` | [Short Data Type](../data-types/short-data-type.md) | [System.Int16.MinValue](https://learn.microsoft.com/search/?terms=System.Int16.MinValue) (-32,768) through [System.Int16.MaxValue](https://learn.microsoft.com/search/?terms=System.Int16.MaxValue) (32,767); fractional parts are rounded.<sup>1</sup><br/><br/>Starting with Visual Basic 15.8, Visual Basic optimizes the performance of floating-point to 16-bit integer conversion with the `CShort` function; see the [Remarks](#remarks) section for more information. See the [CInt Example](#cint-example) section for an example. |
| `CSng` | [Single Data Type](../data-types/single-data-type.md) | -3.402823E+38 through -1.401298E-45 for negative values; 1.401298E-45 through 3.402823E+38 for positive values. |
| `CStr` | [String Data Type](../data-types/string-data-type.md) | Returns for `CStr` depend on the `expression` argument. See [Return Values for the CStr Function](return-values-for-the-cstr-function.md). |
| `CUInt` | [UInteger Data Type](../data-types/uinteger-data-type.md) | [System.UInt32.MinValue](https://learn.microsoft.com/search/?terms=System.UInt32.MinValue) (0) through [System.UInt32.MaxValue](https://learn.microsoft.com/search/?terms=System.UInt32.MaxValue) (4,294,967,295) (unsigned); fractional parts are rounded.<sup>1</sup><br/><br/>Starting with Visual Basic 15.8, Visual Basic optimizes the performance of floating-point to unsigned integer conversion with the `CUInt` function; see the [Remarks](#remarks) section for more information. See the [CInt Example](#cint-example) section for an example. |
| `CULng` | [ULong Data Type](../data-types/ulong-data-type.md) | [System.UInt64.MinValue](https://learn.microsoft.com/search/?terms=System.UInt64.MinValue) (0) through [System.UInt64.MaxValue](https://learn.microsoft.com/search/?terms=System.UInt64.MaxValue) (18,446,744,073,709,551,615) (unsigned); fractional parts are rounded.<sup>1</sup><br/><br/>Starting with Visual Basic 15.8, Visual Basic optimizes the performance of floating-point to unsigned long integer conversion with the `CULng` function; see the [Remarks](#remarks) section for more information. See the [CInt Example](#cint-example) section for an example. |
| `CUShort` | [UShort Data Type](../data-types/ushort-data-type.md) | [System.UInt16.MinValue](https://learn.microsoft.com/search/?terms=System.UInt16.MinValue) (0) through [System.UInt16.MaxValue](https://learn.microsoft.com/search/?terms=System.UInt16.MaxValue) (65,535) (unsigned); fractional parts are rounded.<sup>1</sup><br/><br/>Starting with Visual Basic 15.8, Visual Basic optimizes the performance of floating-point to unsigned 16-bit integer conversion with the `CUShort` function; see the [Remarks](#remarks) section for more information. See the [CInt Example](#cint-example) section for an example. |

<sup>1</sup> Fractional parts can be subject to a special type of rounding called *banker's rounding*. See "Remarks" for more information.

## Remarks

As a rule, you should use the Visual Basic type conversion functions in preference to the .NET Framework methods such as `ToString()`, either on the [System.Convert](https://learn.microsoft.com/search/?terms=System.Convert) class or on an individual type structure or class. The Visual Basic functions are designed for optimal interaction with Visual Basic code, and they also make your source code shorter and easier to read. In addition, the .NET Framework conversion methods do not always produce the same results as the Visual Basic functions, for example when converting `Boolean` to `Integer`. For more information, see [Troubleshooting Data Types](../../programming-guide/language-features/data-types/troubleshooting-data-types.md).

Starting with Visual Basic 15.8, the performance of floating-point-to-integer conversion is optimized when you pass the [System.Single](https://learn.microsoft.com/search/?terms=System.Single) or [System.Double](https://learn.microsoft.com/search/?terms=System.Double) value returned by the following methods to one of the integer conversion functions (`CByte`, `CShort`, `CInt`, `CLng`, `CSByte`, `CUShort`, `CUInt`, `CULng`):

- [Microsoft.VisualBasic.Conversion.Fix(System.Double)](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Conversion.Fix(System.Double))
- [Microsoft.VisualBasic.Conversion.Fix(System.Object)](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Conversion.Fix(System.Object))
- [Microsoft.VisualBasic.Conversion.Fix(System.Single)](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Conversion.Fix(System.Single))
- [Microsoft.VisualBasic.Conversion.Int(System.Double)](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Conversion.Int(System.Double))
- [Microsoft.VisualBasic.Conversion.Int(System.Object)](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Conversion.Int(System.Object))
- [Microsoft.VisualBasic.Conversion.Int(System.Single)](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Conversion.Int(System.Single))
- [System.Math.Ceiling(System.Double)](https://learn.microsoft.com/search/?terms=System.Math.Ceiling(System.Double))
- [System.Math.Floor(System.Double)](https://learn.microsoft.com/search/?terms=System.Math.Floor(System.Double))
- [System.Math.Round(System.Double)](https://learn.microsoft.com/search/?terms=System.Math.Round(System.Double))
- [System.Math.Truncate(System.Double)](https://learn.microsoft.com/search/?terms=System.Math.Truncate(System.Double))

This optimization allows code that does a large number of integer conversions to run up to twice as fast. The following example illustrates these optimized floating-point-to-integer conversions:

```vb
Dim s As Single = 173.7619
Dim d As Double = s

Dim i1 As Integer = CInt(Fix(s))               ' Result: 173
Dim b1 As Byte = CByte(Int(d))                 ' Result: 173
Dim s1 AS Short = CShort(Math.Truncate(s))     ' Result: 173
Dim i2 As Integer = CInt(Math.Ceiling(d))      ' Result: 174
Dim i3 As Integer = CInt(Math.Round(s))        ' Result: 174
```

## Behavior

- **Coercion.** In general, you can use the data type conversion functions to coerce the result of an operation to a particular data type rather than the default data type. For example, use `CDec` to force decimal arithmetic in cases where single-precision, double-precision, or integer arithmetic would normally take place.

- **Failed Conversions.** If the `expression` passed to the function is outside the range of the data type to which it is to be converted, an [System.OverflowException](https://learn.microsoft.com/search/?terms=System.OverflowException) occurs.

- **Fractional Parts.** When you convert a nonintegral value to an integral type, the integer conversion functions (`CByte`, `CInt`, `CLng`, `CSByte`, `CShort`, `CUInt`, `CULng`, and `CUShort`) remove the fractional part and round the value to the closest integer.

     If the fractional part is exactly 0.5, the integer conversion functions round it to the nearest even integer. For example, 0.5 rounds to 0, and 1.5 and 2.5 both round to 2. This is sometimes called *banker's rounding*, and its purpose is to compensate for a bias that could accumulate when adding many such numbers together.

     `CInt` and `CLng` differ from the [Microsoft.VisualBasic.Conversion.Int*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Conversion.Int*) and [Microsoft.VisualBasic.Conversion.Fix*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Conversion.Fix*) functions, which truncate, rather than round, the fractional part of a number. Also, `Fix` and `Int` always return a value of the same data type as you pass in.

- **Date/Time Conversions.** Use the [Microsoft.VisualBasic.Information.IsDate*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Information.IsDate*) function to determine if a value can be converted to a date and time. `CDate` recognizes date literals and time literals but not numeric values. To convert a Visual Basic 6.0 `Date` value to a `Date` value in Visual Basic 2005 or later versions, you can use the [System.DateTime.FromOADate*](https://learn.microsoft.com/search/?terms=System.DateTime.FromOADate*) method.

- **Neutral Date/Time Values.** The [Date Data Type](../data-types/date-data-type.md) always contains both date and time information. For purposes of type conversion, Visual Basic considers 1/1/0001 (January 1 of the year 1) to be a *neutral value* for the date, and 00:00:00 (midnight) to be a neutral value for the time. If you convert a `Date` value to a string, `CStr` does not include neutral values in the resulting string. For example, if you convert `#January 1, 0001 9:30:00#` to a string, the result is "9:30:00 AM"; the date information is suppressed. However, the date information is still present in the original `Date` value and can be recovered with functions such as [Microsoft.VisualBasic.DateAndTime.DatePart*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.DateAndTime.DatePart*) function.

- **Culture Sensitivity.** The type conversion functions involving strings perform conversions based on the current culture settings for the application. For example, `CDate` recognizes date formats according to the locale setting of your system. You must provide the day, month, and year in the correct order for your locale, or the date might not be interpreted correctly. A long date format is not recognized if it contains a day-of-the-week string, such as "Wednesday".

     If you need to convert to or from a string representation of a value in a format other than the one specified by your locale, you cannot use the Visual Basic type conversion functions. To do this, use the `ToString(IFormatProvider)` and `Parse(String, IFormatProvider)` methods of that value's type. For example, use [System.Double.Parse*](https://learn.microsoft.com/search/?terms=System.Double.Parse*) when converting a string to a `Double`, and use [System.Double.ToString*](https://learn.microsoft.com/search/?terms=System.Double.ToString*) when converting a value of type `Double` to a string.

## CType Operator

The [CType Operator](../operators/ctype-operator.md) takes a second argument, `typename`, and coerces `expression` to `typename`, where `typename` can be any data type, structure, class, or interface to which there exists a valid conversion.

For a comparison of `CType` with the other type conversion keywords, see [DirectCast Operator](../operators/directcast-operator.md) and [TryCast Operator](../operators/trycast-operator.md).

## CBool Example

The following example uses the `CBool` function to convert expressions to `Boolean` values. If an expression evaluates to a nonzero value, `CBool` returns `True`; otherwise, it returns `False`.

[VbVbalrFunctions#1 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrFunctions/VB/Class1.vb#1)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrFunctions/VB/Class1.vb.md)

## CByte Example

The following example uses the `CByte` function to convert an expression to a `Byte`.

[VbVbalrFunctions#2 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrFunctions/VB/Class1.vb#2)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrFunctions/VB/Class1.vb.md)

## CChar Example

The following example uses the `CChar` function to convert the first character of a `String` expression to a `Char` type.

[VbVbalrFunctions#3 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrFunctions/VB/Class1.vb#3)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrFunctions/VB/Class1.vb.md)

The input argument to `CChar` must be of data type `Char` or `String`. You cannot use `CChar` to convert a number to a character, because `CChar` cannot accept a numeric data type. The following example obtains a number representing a code point (character code) and converts it to the corresponding character. It uses the [Microsoft.VisualBasic.Interaction.InputBox*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Interaction.InputBox*) function to obtain the string of digits, `CInt` to convert the string to type `Integer`, and `ChrW` to convert the number to type `Char`.

[VbVbalrFunctions#4 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrFunctions/VB/Class1.vb#4)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrFunctions/VB/Class1.vb.md)

## CDate Example

The following example uses the `CDate` function to convert strings to `Date` values. In general, hard-coding dates and times as strings (as shown in this example) is not recommended. Use date literals and time literals, such as #Feb 12, 1969# and #4:45:23 PM#, instead.

[VbVbalrFunctions#5 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrFunctions/VB/Class1.vb#5)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrFunctions/VB/Class1.vb.md)

## CDbl Example

[VbVbalrFunctions#6 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrFunctions/VB/Class1.vb#6)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrFunctions/VB/Class1.vb.md)

## CDec Example

The following example uses the `CDec` function to convert a numeric value to `Decimal`.

[VbVbalrFunctions#7 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrFunctions/VB/Class1.vb#7)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrFunctions/VB/Class1.vb.md)

## CInt Example

The following example uses the `CInt` function to convert a value to `Integer`.

[VbVbalrFunctions#8 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrFunctions/VB/Class1.vb#8)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrFunctions/VB/Class1.vb.md)

## CLng Example

The following example uses the `CLng` function to convert values to `Long`.

[VbVbalrFunctions#9 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrFunctions/VB/Class1.vb#9)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrFunctions/VB/Class1.vb.md)

## CObj Example

The following example uses the `CObj` function to convert a numeric value to `Object`. The `Object` variable itself contains only a four-byte pointer, which points to the `Double` value assigned to it.

[VbVbalrFunctions#10 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrFunctions/VB/Class1.vb#10)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrFunctions/VB/Class1.vb.md)

## CSByte Example

The following example uses the `CSByte` function to convert a numeric value to `SByte`.

[VbVbalrFunctions#11 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrFunctions/VB/Class1.vb#11)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrFunctions/VB/Class1.vb.md)

## CShort Example

The following example uses the `CShort` function to convert a numeric value to `Short`.

[VbVbalrFunctions#12 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrFunctions/VB/Class1.vb#12)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrFunctions/VB/Class1.vb.md)

## CSng Example

The following example uses the `CSng` function to convert values to `Single`.

[VbVbalrFunctions#13 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrFunctions/VB/Class1.vb#13)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrFunctions/VB/Class1.vb.md)

## CStr Example

The following example uses the `CStr` function to convert a numeric value to `String`.

[VbVbalrFunctions#14 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrFunctions/VB/Class1.vb#14)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrFunctions/VB/Class1.vb.md)

The following example uses the `CStr` function to convert `Date` values to `String` values.

[VbVbalrFunctions#15 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrFunctions/VB/Class1.vb#15)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrFunctions/VB/Class1.vb.md)

`CStr` always renders a `Date` value in the standard short format for the current locale, for example, "6/15/2003 4:35:47 PM". However, `CStr` suppresses the *neutral values* of 1/1/0001 for the date and 00:00:00 for the time.

For more detail on the values returned by `CStr`, see [Return Values for the CStr Function](return-values-for-the-cstr-function.md).

## CUInt Example

The following example uses the `CUInt` function to convert a numeric value to `UInteger`.

[VbVbalrFunctions#16 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrFunctions/VB/Class1.vb#16)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrFunctions/VB/Class1.vb.md)

## CULng Example

The following example uses the `CULng` function to convert a numeric value to `ULong`.

[VbVbalrFunctions#17 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrFunctions/VB/Class1.vb#17)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrFunctions/VB/Class1.vb.md)

## CUShort Example

The following example uses the `CUShort` function to convert a numeric value to `UShort`.

[VbVbalrFunctions#18 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrFunctions/VB/Class1.vb#18)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrFunctions/VB/Class1.vb.md)

## See also

- [Microsoft.VisualBasic.Strings.Asc*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Strings.Asc*)
- [Microsoft.VisualBasic.Strings.AscW*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Strings.AscW*)
- [Microsoft.VisualBasic.Strings.Chr*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Strings.Chr*)
- [Microsoft.VisualBasic.Strings.ChrW*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Strings.ChrW*)
- [Microsoft.VisualBasic.Conversion.Int*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Conversion.Int*)
- [Microsoft.VisualBasic.Conversion.Fix*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Conversion.Fix*)
- [Microsoft.VisualBasic.Strings.Format*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Strings.Format*)
- [Microsoft.VisualBasic.Conversion.Hex*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Conversion.Hex*)
- [Microsoft.VisualBasic.Conversion.Oct*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Conversion.Oct*)
- [Microsoft.VisualBasic.Conversion.Str*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Conversion.Str*)
- [Microsoft.VisualBasic.Conversion.Val*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Conversion.Val*)
- [Conversion Functions](conversion-functions.md)
- [Type Conversions in Visual Basic](../../programming-guide/language-features/data-types/type-conversions.md)
