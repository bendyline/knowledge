---
title: "Breaking change: Maximum precision for numeric format strings"
description: Learn about the .NET 7 breaking change in core .NET libraries where the maximum precision for numeric format strings was changed to 999,999,999.
ms.date: 09/02/2022
---
# Maximum precision for numeric format strings

The maximum precision when formatting numbers as strings using `ToString` and `TryFormat` has been changed from [System.Int32.MaxValue](https://learn.microsoft.com/search/?terms=System.Int32.MaxValue) to 999,999,999. (The maximum precision was [previously changed](../6.0/numeric-format-parsing-handles-higher-precision.md) to [System.Int32.MaxValue](https://learn.microsoft.com/search/?terms=System.Int32.MaxValue) in .NET 6.)

In addition, the maximum exponent allowed when parsing a [System.Numerics.BigInteger](https://learn.microsoft.com/search/?terms=System.Numerics.BigInteger) from a string has been limited to 999,999,999.

## Previous behavior

In .NET 6, the standard numeric format parsing logic was limited to a precision of [System.Int32.MaxValue](https://learn.microsoft.com/search/?terms=System.Int32.MaxValue) or less. The intended behavior was to throw a [System.FormatException](https://learn.microsoft.com/search/?terms=System.FormatException) for any precision larger than [System.Int32.MaxValue](https://learn.microsoft.com/search/?terms=System.Int32.MaxValue). However, due to a bug, .NET 6 didn't throw that exception for some such inputs. The intended behavior was:

```csharp
double d = 123.0;

d.ToString("E" + int.MaxValue.ToString()); // Doesn't throw.

long intMaxPlus1 = (long)int.MaxValue + 1;
string intMaxPlus1String = intMaxPlus1.ToString();
Assert.Throws<FormatException>(() => d.ToString("E" + intMaxPlus1String)); // Throws.
```

In addition, there was no limit on the exponent size when parsing a [System.Numerics.BigInteger](https://learn.microsoft.com/search/?terms=System.Numerics.BigInteger) from a string.

## New behavior

Starting in .NET 7, .NET supports precision up to 999,999,999. A [System.FormatException](https://learn.microsoft.com/search/?terms=System.FormatException) is thrown if the precision is greater than 999,999,999. This change was implemented in the parsing logic that affects all numeric types.

```csharp
double d = 123.0;
Assert.Throws<FormatException>(() => d.ToString("E" + int.MaxValue.ToString())); // Throws.

long intMaxPlus1 = (long)int.MaxValue + 1;
string intMaxPlus1String = intMaxPlus1.ToString();
Assert.Throws<FormatException>(() => d.ToString("E" + intMaxPlus1String)); // Throws.

d.ToString("E999999999"); // Doesn't throw.

d.ToString("E00000999999999"); // Doesn't throw.
```

In addition, if you attempt to parse a [System.Numerics.BigInteger](https://learn.microsoft.com/search/?terms=System.Numerics.BigInteger) with an exponent greater than 999,999,999 from a string, a [System.FormatException](https://learn.microsoft.com/search/?terms=System.FormatException) is thrown.

## Version introduced

.NET 7

## Type of breaking change

This change can affect [binary compatibility](../../categories.md#binary-compatibility).

## Reason for change

The behavior that was introduced in .NET 6 was intended to throw a [System.FormatException](https://learn.microsoft.com/search/?terms=System.FormatException) for any precision larger than [System.Int32.MaxValue](https://learn.microsoft.com/search/?terms=System.Int32.MaxValue). However, due to a bug, it did not throw that exception for some inputs larger than the maximum. This change fixes the bug by limiting the precision to 999,999,999.

## Recommended action

In most cases, no action is necessary, because it's unlikely that you're already using a precision higher than 999,999,999 in your format strings.

## Affected APIs

This change was implemented in the parsing logic that affects all numeric types.

- [System.Numerics.BigInteger.ToString(System.String)](https://learn.microsoft.com/search/?terms=System.Numerics.BigInteger.ToString(System.String))
- [System.Numerics.BigInteger.ToString(System.String,System.IFormatProvider)](https://learn.microsoft.com/search/?terms=System.Numerics.BigInteger.ToString(System.String%2CSystem.IFormatProvider))
- [System.Numerics.BigInteger.TryFormat(System.Span{System.Char},System.Int32@,System.ReadOnlySpan{System.Char},System.IFormatProvider)](https://learn.microsoft.com/search/?terms=System.Numerics.BigInteger.TryFormat(System.Span%7BSystem.Char%7D%2CSystem.Int32%40%2CSystem.ReadOnlySpan%7BSystem.Char%7D%2CSystem.IFormatProvider))
- [System.Int32.ToString(System.String)](https://learn.microsoft.com/search/?terms=System.Int32.ToString(System.String))
- [System.Int32.ToString(System.String,System.IFormatProvider)](https://learn.microsoft.com/search/?terms=System.Int32.ToString(System.String%2CSystem.IFormatProvider))
- [System.Int32.TryFormat(System.Span{System.Char},System.Int32@,System.ReadOnlySpan{System.Char},System.IFormatProvider)](https://learn.microsoft.com/search/?terms=System.Int32.TryFormat(System.Span%7BSystem.Char%7D%2CSystem.Int32%40%2CSystem.ReadOnlySpan%7BSystem.Char%7D%2CSystem.IFormatProvider))
- [System.UInt32.ToString(System.String)](https://learn.microsoft.com/search/?terms=System.UInt32.ToString(System.String))
- [System.UInt32.ToString(System.String,System.IFormatProvider)](https://learn.microsoft.com/search/?terms=System.UInt32.ToString(System.String%2CSystem.IFormatProvider))
- [System.UInt32.TryFormat(System.Span{System.Char},System.Int32@,System.ReadOnlySpan{System.Char},System.IFormatProvider)](https://learn.microsoft.com/search/?terms=System.UInt32.TryFormat(System.Span%7BSystem.Char%7D%2CSystem.Int32%40%2CSystem.ReadOnlySpan%7BSystem.Char%7D%2CSystem.IFormatProvider))
- [System.Byte.ToString(System.String)](https://learn.microsoft.com/search/?terms=System.Byte.ToString(System.String))
- [System.Byte.ToString(System.String,System.IFormatProvider)](https://learn.microsoft.com/search/?terms=System.Byte.ToString(System.String%2CSystem.IFormatProvider))
- [System.Byte.TryFormat(System.Span{System.Char},System.Int32@,System.ReadOnlySpan{System.Char},System.IFormatProvider)](https://learn.microsoft.com/search/?terms=System.Byte.TryFormat(System.Span%7BSystem.Char%7D%2CSystem.Int32%40%2CSystem.ReadOnlySpan%7BSystem.Char%7D%2CSystem.IFormatProvider))
- [System.SByte.ToString(System.String)](https://learn.microsoft.com/search/?terms=System.SByte.ToString(System.String))
- [System.SByte.ToString(System.String,System.IFormatProvider)](https://learn.microsoft.com/search/?terms=System.SByte.ToString(System.String%2CSystem.IFormatProvider))
- [System.SByte.TryFormat(System.Span{System.Char},System.Int32@,System.ReadOnlySpan{System.Char},System.IFormatProvider)](https://learn.microsoft.com/search/?terms=System.SByte.TryFormat(System.Span%7BSystem.Char%7D%2CSystem.Int32%40%2CSystem.ReadOnlySpan%7BSystem.Char%7D%2CSystem.IFormatProvider))
- [System.Int16.ToString(System.String)](https://learn.microsoft.com/search/?terms=System.Int16.ToString(System.String))
- [System.Int16.ToString(System.String,System.IFormatProvider)](https://learn.microsoft.com/search/?terms=System.Int16.ToString(System.String%2CSystem.IFormatProvider))
- [System.Int16.TryFormat(System.Span{System.Char},System.Int32@,System.ReadOnlySpan{System.Char},System.IFormatProvider)](https://learn.microsoft.com/search/?terms=System.Int16.TryFormat(System.Span%7BSystem.Char%7D%2CSystem.Int32%40%2CSystem.ReadOnlySpan%7BSystem.Char%7D%2CSystem.IFormatProvider))
- [System.UInt16.ToString(System.String)](https://learn.microsoft.com/search/?terms=System.UInt16.ToString(System.String))
- [System.UInt16.ToString(System.String,System.IFormatProvider)](https://learn.microsoft.com/search/?terms=System.UInt16.ToString(System.String%2CSystem.IFormatProvider))
- [System.UInt16.TryFormat(System.Span{System.Char},System.Int32@,System.ReadOnlySpan{System.Char},System.IFormatProvider)](https://learn.microsoft.com/search/?terms=System.UInt16.TryFormat(System.Span%7BSystem.Char%7D%2CSystem.Int32%40%2CSystem.ReadOnlySpan%7BSystem.Char%7D%2CSystem.IFormatProvider))
- [System.Numerics.BigInteger.Parse*](https://learn.microsoft.com/search/?terms=System.Numerics.BigInteger.Parse*)
- [System.Numerics.BigInteger.TryParse*](https://learn.microsoft.com/search/?terms=System.Numerics.BigInteger.TryParse*)
- [System.Int64.ToString(System.String)](https://learn.microsoft.com/search/?terms=System.Int64.ToString(System.String))
- [System.Int64.ToString(System.String,System.IFormatProvider)](https://learn.microsoft.com/search/?terms=System.Int64.ToString(System.String%2CSystem.IFormatProvider))
- [System.Int64.TryFormat(System.Span{System.Char},System.Int32@,System.ReadOnlySpan{System.Char},System.IFormatProvider)](https://learn.microsoft.com/search/?terms=System.Int64.TryFormat(System.Span%7BSystem.Char%7D%2CSystem.Int32%40%2CSystem.ReadOnlySpan%7BSystem.Char%7D%2CSystem.IFormatProvider))
- [System.UInt64.ToString(System.String)](https://learn.microsoft.com/search/?terms=System.UInt64.ToString(System.String))
- [System.UInt64.ToString(System.String,System.IFormatProvider)](https://learn.microsoft.com/search/?terms=System.UInt64.ToString(System.String%2CSystem.IFormatProvider))
- [System.UInt64.TryFormat(System.Span{System.Char},System.Int32@,System.ReadOnlySpan{System.Char},System.IFormatProvider)](https://learn.microsoft.com/search/?terms=System.UInt64.TryFormat(System.Span%7BSystem.Char%7D%2CSystem.Int32%40%2CSystem.ReadOnlySpan%7BSystem.Char%7D%2CSystem.IFormatProvider))
- [System.Half.ToString(System.String)](https://learn.microsoft.com/search/?terms=System.Half.ToString(System.String))
- [System.Half.ToString(System.String,System.IFormatProvider)](https://learn.microsoft.com/search/?terms=System.Half.ToString(System.String%2CSystem.IFormatProvider))
- [System.Half.TryFormat(System.Span{System.Char},System.Int32@,System.ReadOnlySpan{System.Char},System.IFormatProvider)](https://learn.microsoft.com/search/?terms=System.Half.TryFormat(System.Span%7BSystem.Char%7D%2CSystem.Int32%40%2CSystem.ReadOnlySpan%7BSystem.Char%7D%2CSystem.IFormatProvider))
- [System.Single.ToString(System.String)](https://learn.microsoft.com/search/?terms=System.Single.ToString(System.String))
- [System.Single.ToString(System.String,System.IFormatProvider)](https://learn.microsoft.com/search/?terms=System.Single.ToString(System.String%2CSystem.IFormatProvider))
- [System.Single.TryFormat(System.Span{System.Char},System.Int32@,System.ReadOnlySpan{System.Char},System.IFormatProvider)](https://learn.microsoft.com/search/?terms=System.Single.TryFormat(System.Span%7BSystem.Char%7D%2CSystem.Int32%40%2CSystem.ReadOnlySpan%7BSystem.Char%7D%2CSystem.IFormatProvider))
- [System.Double.ToString(System.String)](https://learn.microsoft.com/search/?terms=System.Double.ToString(System.String))
- [System.Double.ToString(System.String,System.IFormatProvider)](https://learn.microsoft.com/search/?terms=System.Double.ToString(System.String%2CSystem.IFormatProvider))
- [System.Double.TryFormat(System.Span{System.Char},System.Int32@,System.ReadOnlySpan{System.Char},System.IFormatProvider)](https://learn.microsoft.com/search/?terms=System.Double.TryFormat(System.Span%7BSystem.Char%7D%2CSystem.Int32%40%2CSystem.ReadOnlySpan%7BSystem.Char%7D%2CSystem.IFormatProvider))
- [System.Decimal.ToString(System.String)](https://learn.microsoft.com/search/?terms=System.Decimal.ToString(System.String))
- [System.Decimal.ToString(System.String,System.IFormatProvider)](https://learn.microsoft.com/search/?terms=System.Decimal.ToString(System.String%2CSystem.IFormatProvider))
- [System.Decimal.TryFormat(System.Span{System.Char},System.Int32@,System.ReadOnlySpan{System.Char},System.IFormatProvider)](https://learn.microsoft.com/search/?terms=System.Decimal.TryFormat(System.Span%7BSystem.Char%7D%2CSystem.Int32%40%2CSystem.ReadOnlySpan%7BSystem.Char%7D%2CSystem.IFormatProvider))

## See also

- [Standard numeric format parsing precision breaking change (.NET 6)](../6.0/numeric-format-parsing-handles-higher-precision.md)
- [Standard numeric format strings](../../../../standard/base-types/standard-numeric-format-strings.md)
- [Character literals in custom format strings](../../../../standard/base-types/custom-numeric-format-strings.md#character-literals)
