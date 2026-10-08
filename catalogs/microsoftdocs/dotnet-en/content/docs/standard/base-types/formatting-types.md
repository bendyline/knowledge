---
title: "Overview: How to format numbers, dates, enums, and other types in .NET"
description: "Learn how to convert instances of .NET types to formatted strings. Override the ToString method, make formatting culture-sensitive, and use ICustomFormatter."
ms.date: 10/22/2025
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "data formatting [.NET]"
  - "dates [.NET], formatting"
  - "date formatting [.NET]"
  - "number formatting [.NET]"
  - "ToString method"
  - "custom cultural settings [.NET]"
  - "numbers [.NET], formatting"
  - "formatting strings [.NET]"
  - "time [.NET], formatting"
  - "currency [.NET], formatting"
  - "types [.NET], formatting"
  - "format specifiers [.NET]"
  - "times [.NET], formatting"
  - "culture [.NET], formatting"
  - "formatting [.NET], types supported"
  - "base types [.NET], formatting"
  - "custom formatting [.NET]"
  - "strings [.NET], formatting"
ai-usage: ai-assisted
---
# Overview: How to format numbers, dates, enums, and other types in .NET

Formatting is the process of converting an instance of a class or structure, or an enumeration value, to a string representation. The purpose is to display the resulting string to users or to deserialize it later to restore the original data type. This article introduces the formatting mechanisms that .NET provides.

> **Note:**
> Parsing is the inverse of formatting. A parsing operation creates an instance of a data type from its string representation. For more information, see [Parsing Strings](parsing-strings.md). For information about serialization and deserialization, see [Serialization in .NET](../serialization/index.md).

The basic mechanism for formatting is the default implementation of the [System.Object.ToString*](https://learn.microsoft.com/search/?terms=System.Object.ToString*) method, which is discussed in the [Default Formatting Using the ToString Method](#default-formatting-using-the-tostring-method) section later in this article. However, .NET provides several ways to modify and extend its default formatting support. These include the following:

- Overriding the [System.Object.ToString*](https://learn.microsoft.com/search/?terms=System.Object.ToString*) method to define a custom string representation of an object's value. For more information, see the [Override the ToString Method](#override-the-tostring-method) section later in this article.

- Defining format specifiers that enable the string representation of an object's value to take multiple forms. For example, the "X" format specifier in the following statement converts an integer to the string representation of a hexadecimal value.

     [Conceptual.Formatting.Overview#3 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.formatting.overview/cs/specifier1.cs#3)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.formatting.overview/cs/specifier1.cs.md)
     [Conceptual.Formatting.Overview#3 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.formatting.overview/vb/specifier1.vb#3)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.formatting.overview/vb/specifier1.vb.md)

     For more information about format specifiers, see the [ToString Method and Format Strings](#the-tostring-method-and-format-strings) section.

- Using format providers to implement the formatting conventions of a specific culture. For example, the following statement displays a currency value by using the formatting conventions of the en-US culture.

     [Conceptual.Formatting.Overview#10 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.formatting.overview/cs/specifier1.cs#10)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.formatting.overview/cs/specifier1.cs.md)
     [Conceptual.Formatting.Overview#10 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.formatting.overview/vb/specifier1.vb#10)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.formatting.overview/vb/specifier1.vb.md)

     For more information about formatting with format providers, see the [Format Providers](#culture-sensitive-formatting-with-format-providers) section.

- Implementing the [System.IFormattable](https://learn.microsoft.com/search/?terms=System.IFormattable) interface to support both string conversion with the [System.Convert](https://learn.microsoft.com/search/?terms=System.Convert) class and composite formatting. For more information, see the [IFormattable Interface](#the-iformattable-interface) section.

- Using composite formatting to embed the string representation of a value in a larger string. For more information, see the [Composite Formatting](#composite-formatting) section.

- Using string interpolation, a more readable syntax to embed the string representation of a value in a larger string. For more information, see [String interpolation](../../csharp/language-reference/tokens/interpolated.md).

- Implementing [System.ICustomFormatter](https://learn.microsoft.com/search/?terms=System.ICustomFormatter) and [System.IFormatProvider](https://learn.microsoft.com/search/?terms=System.IFormatProvider) to provide a complete custom formatting solution. For more information, see the [Custom Formatting with ICustomFormatter](#custom-formatting-with-icustomformatter) section.

The following sections examine these methods for converting an object to its string representation.

## Default formatting using the ToString method

Every type that is derived from [System.Object](https://learn.microsoft.com/search/?terms=System.Object) automatically inherits a parameterless `ToString` method, which returns the name of the type by default. The following example illustrates the default `ToString` method. It defines a class named `Automobile` that has no implementation. When the class is instantiated and its `ToString` method is called, it displays its type name. The `ToString` method isn't explicitly called in the example. The [System.Console.WriteLine%28System.Object%29](https://learn.microsoft.com/search/?terms=System.Console.WriteLine%2528System.Object%2529) method implicitly calls the `ToString` method of the object passed to it as an argument.

[Conceptual.Formatting.Overview#1 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.formatting.overview/cs/default1.cs#1)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.formatting.overview/cs/default1.cs.md)
[Conceptual.Formatting.Overview#1 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.formatting.overview/vb/default1.vb#1)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.formatting.overview/vb/default1.vb.md)

> **Warning:**
> Starting with Windows 8.1, the Windows Runtime includes an [Windows.Foundation.IStringable](https://learn.microsoft.com/search/?terms=Windows.Foundation.IStringable) interface with a single method, [IStringable.ToString](https://learn.microsoft.com/search/?terms=Windows.Foundation.IStringable.ToString%252A), which provides default formatting support. However, we recommend that managed types don't implement the `IStringable` interface. For more information, see [The Windows Runtime and the IStringable Interface](https://learn.microsoft.com/search/?terms=System.Object.ToString%23the-windows-runtime-and-the-istringable-interface).

Because all types other than interfaces are derived from [System.Object](https://learn.microsoft.com/search/?terms=System.Object), this functionality is automatically provided to your custom classes or structures. However, the functionality offered by the default `ToString` method, is limited: Although it identifies the type, it fails to provide any information about an instance of the type. To provide a string representation of an object that provides information about that object, you must override the `ToString` method.

> **Note:**
> Structures inherit from [System.ValueType](https://learn.microsoft.com/search/?terms=System.ValueType), which in turn is derived from [System.Object](https://learn.microsoft.com/search/?terms=System.Object). Although [System.ValueType](https://learn.microsoft.com/search/?terms=System.ValueType) overrides [System.Object.ToString*](https://learn.microsoft.com/search/?terms=System.Object.ToString*), its implementation is identical.

## Override the ToString method

Displaying the name of a type is often of limited use and doesn't allow consumers of your types to differentiate one instance from another. However, you can override the `ToString` method to provide a more useful representation of an object's value. The following example defines a `Temperature` object and overrides its `ToString` method to display the temperature in degrees Celsius.

[Conceptual.Formatting.Overview#2 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.formatting.overview/cs/overrides1.cs#2)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.formatting.overview/cs/overrides1.cs.md)
[Conceptual.Formatting.Overview#2 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.formatting.overview/vb/overrides1.vb#2)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.formatting.overview/vb/overrides1.vb.md)

In .NET, the `ToString` method of each primitive value type has been overridden to display the object's value instead of its name. The following table shows the override for each primitive type. Most of the overridden methods call another overload of the `ToString` method and pass it the "G" format specifier, which defines the general format for its type, and an [System.IFormatProvider](https://learn.microsoft.com/search/?terms=System.IFormatProvider) object that represents the current culture.

| Type | ToString override |
| --- | --- |
| [System.Boolean](https://learn.microsoft.com/search/?terms=System.Boolean) | Returns either [System.Boolean.TrueString](https://learn.microsoft.com/search/?terms=System.Boolean.TrueString) or [System.Boolean.FalseString](https://learn.microsoft.com/search/?terms=System.Boolean.FalseString). |
| [System.Byte](https://learn.microsoft.com/search/?terms=System.Byte) | Calls `Byte.ToString("G", NumberFormatInfo.CurrentInfo)` to format the [System.Byte](https://learn.microsoft.com/search/?terms=System.Byte) value for the current culture. |
| [System.Char](https://learn.microsoft.com/search/?terms=System.Char) | Returns the character as a string. |
| [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) | Calls `DateTime.ToString("G", DatetimeFormatInfo.CurrentInfo)` to format the date and time value for the current culture. |
| [System.Decimal](https://learn.microsoft.com/search/?terms=System.Decimal) | Calls `Decimal.ToString("G", NumberFormatInfo.CurrentInfo)` to format the [System.Decimal](https://learn.microsoft.com/search/?terms=System.Decimal) value for the current culture. |
| [System.Double](https://learn.microsoft.com/search/?terms=System.Double) | Calls `Double.ToString("G", NumberFormatInfo.CurrentInfo)` to format the [System.Double](https://learn.microsoft.com/search/?terms=System.Double) value for the current culture. |
| [System.Int16](https://learn.microsoft.com/search/?terms=System.Int16) | Calls `Int16.ToString("G", NumberFormatInfo.CurrentInfo)` to format the [System.Int16](https://learn.microsoft.com/search/?terms=System.Int16) value for the current culture. |
| [System.Int32](https://learn.microsoft.com/search/?terms=System.Int32) | Calls `Int32.ToString("G", NumberFormatInfo.CurrentInfo)` to format the [System.Int32](https://learn.microsoft.com/search/?terms=System.Int32) value for the current culture. |
| [System.Int64](https://learn.microsoft.com/search/?terms=System.Int64) | Calls `Int64.ToString("G", NumberFormatInfo.CurrentInfo)` to format the [System.Int64](https://learn.microsoft.com/search/?terms=System.Int64) value for the current culture. |
| [System.SByte](https://learn.microsoft.com/search/?terms=System.SByte) | Calls `SByte.ToString("G", NumberFormatInfo.CurrentInfo)` to format the [System.SByte](https://learn.microsoft.com/search/?terms=System.SByte) value for the current culture. |
| [System.Single](https://learn.microsoft.com/search/?terms=System.Single) | Calls `Single.ToString("G", NumberFormatInfo.CurrentInfo)` to format the [System.Single](https://learn.microsoft.com/search/?terms=System.Single) value for the current culture. |
| [System.UInt16](https://learn.microsoft.com/search/?terms=System.UInt16) | Calls `UInt16.ToString("G", NumberFormatInfo.CurrentInfo)` to format the [System.UInt16](https://learn.microsoft.com/search/?terms=System.UInt16) value for the current culture. |
| [System.UInt32](https://learn.microsoft.com/search/?terms=System.UInt32) | Calls `UInt32.ToString("G", NumberFormatInfo.CurrentInfo)` to format the [System.UInt32](https://learn.microsoft.com/search/?terms=System.UInt32) value for the current culture. |
| [System.UInt64](https://learn.microsoft.com/search/?terms=System.UInt64) | Calls `UInt64.ToString("G", NumberFormatInfo.CurrentInfo)` to format the [System.UInt64](https://learn.microsoft.com/search/?terms=System.UInt64) value for the current culture. |

## The ToString method and format strings

Relying on the default `ToString` method or overriding `ToString` is appropriate when an object has a single string representation. However, the value of an object often has multiple representations. For example, a temperature can be expressed in degrees Fahrenheit, degrees Celsius, or kelvins. Similarly, the integer value 10 can be represented in numerous ways, including 10, 10.0, 1.0e01, or $10.00.

To enable a single value to have multiple string representations, .NET uses format strings. A format string is a string that contains one or more predefined format specifiers, which are single characters or groups of characters that define how the `ToString` method should format its output. The format string is then passed as a parameter to the object's `ToString` method and determines how the string representation of that object's value should appear.

All numeric types, date and time types, and enumeration types in .NET support a predefined set of format specifiers. You can also use format strings to define multiple string representations of your application-defined data types.

### Standard format strings

A standard format string contains a single format specifier, which is an alphabetic character that defines the string representation of the object to which it's applied, along with an optional precision specifier that affects how many digits are displayed in the result string. If the precision specifier is omitted or isn't supported, a standard format specifier is equivalent to a standard format string.

.NET defines a set of standard format specifiers for all numeric types, all date and time types, and all enumeration types. For example, each of these categories supports a "G" standard format specifier, which defines a general string representation of a value of that type.

Standard format strings for enumeration types directly control the string representation of a value. The format strings passed to an enumeration value's `ToString` method determine whether the value is displayed using its string name (the "G" and "F" format specifiers), its underlying integral value (the "D" format specifier), or its hexadecimal value (the "X" format specifier). The following example illustrates the use of standard format strings to format a [System.DayOfWeek](https://learn.microsoft.com/search/?terms=System.DayOfWeek) enumeration value.

[Conceptual.Formatting.Overview#4 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.formatting.overview/cs/standard1.cs#4)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.formatting.overview/cs/standard1.cs.md)
[Conceptual.Formatting.Overview#4 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.formatting.overview/vb/standard1.vb#4)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.formatting.overview/vb/standard1.vb.md)

For information about enumeration format strings, see [Enumeration Format Strings](enumeration-format-strings.md).

Standard format strings for numeric types usually define a result string whose precise appearance is controlled by one or more property values. For example, the "C" format specifier formats a number as a currency value. When you call the `ToString` method with the "C" format specifier as the only parameter, the following property values from the current culture's [System.Globalization.NumberFormatInfo](https://learn.microsoft.com/search/?terms=System.Globalization.NumberFormatInfo) object are used to define the string representation of the numeric value:

- The [System.Globalization.NumberFormatInfo.CurrencySymbol](https://learn.microsoft.com/search/?terms=System.Globalization.NumberFormatInfo.CurrencySymbol) property, which specifies the current culture's currency symbol.

- The [System.Globalization.NumberFormatInfo.CurrencyNegativePattern*](https://learn.microsoft.com/search/?terms=System.Globalization.NumberFormatInfo.CurrencyNegativePattern*) or [System.Globalization.NumberFormatInfo.CurrencyPositivePattern](https://learn.microsoft.com/search/?terms=System.Globalization.NumberFormatInfo.CurrencyPositivePattern) property, which returns an integer that determines the following:

  - The placement of the currency symbol.

  - Whether negative values are indicated by a leading negative sign, a trailing negative sign, or parentheses.

  - Whether a space appears between the numeric value and the currency symbol.

- The [System.Globalization.NumberFormatInfo.CurrencyDecimalDigits](https://learn.microsoft.com/search/?terms=System.Globalization.NumberFormatInfo.CurrencyDecimalDigits) property, which defines the number of fractional digits in the result string.

- The [System.Globalization.NumberFormatInfo.CurrencyDecimalSeparator](https://learn.microsoft.com/search/?terms=System.Globalization.NumberFormatInfo.CurrencyDecimalSeparator) property, which defines the decimal separator symbol in the result string.

- The [System.Globalization.NumberFormatInfo.CurrencyGroupSeparator](https://learn.microsoft.com/search/?terms=System.Globalization.NumberFormatInfo.CurrencyGroupSeparator) property, which defines the group separator symbol.

- The [System.Globalization.NumberFormatInfo.CurrencyGroupSizes](https://learn.microsoft.com/search/?terms=System.Globalization.NumberFormatInfo.CurrencyGroupSizes) property, which defines the number of digits in each group to the left of the decimal.

- The [System.Globalization.NumberFormatInfo.NegativeSign](https://learn.microsoft.com/search/?terms=System.Globalization.NumberFormatInfo.NegativeSign) property, which determines the negative sign used in the result string if parentheses aren't used to indicate negative values.

In addition, numeric format strings can include a precision specifier. The meaning of this specifier depends on the format string with which it's used, but it typically indicates either the total number of digits or the number of fractional digits that should appear in the result string. For example, the following example uses the "X4" standard numeric string and a precision specifier to create a string value that has four hexadecimal digits.

[Conceptual.Formatting.Overview#6 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.formatting.overview/cs/precisionspecifier1.cs#6)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.formatting.overview/cs/precisionspecifier1.cs.md)
[Conceptual.Formatting.Overview#6 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.formatting.overview/vb/precisionspecifier1.vb#6)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.formatting.overview/vb/precisionspecifier1.vb.md)

For more information about standard numeric formatting strings, see [Standard Numeric Format Strings](standard-numeric-format-strings.md).

Standard format strings for date and time values are aliases for custom format strings stored by a particular [System.Globalization.DateTimeFormatInfo](https://learn.microsoft.com/search/?terms=System.Globalization.DateTimeFormatInfo) property. For example, calling the `ToString` method of a date and time value with the "D" format specifier displays the date and time by using the custom format string stored in the current culture's [System.Globalization.DateTimeFormatInfo.LongDatePattern](https://learn.microsoft.com/search/?terms=System.Globalization.DateTimeFormatInfo.LongDatePattern) property. (For more information about custom format strings, see the [next section](#custom-format-strings).) The following example illustrates this relationship.

[Conceptual.Formatting.Overview#5 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.formatting.overview/cs/alias1.cs#5)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.formatting.overview/cs/alias1.cs.md)
[Conceptual.Formatting.Overview#5 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.formatting.overview/vb/alias1.vb#5)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.formatting.overview/vb/alias1.vb.md)

For more information about standard date and time format strings, see [Standard Date and Time Format Strings](standard-date-and-time-format-strings.md).

You can also use standard format strings to define the string representation of an application-defined object that is produced by the object's `ToString(String)` method. You can define the specific standard format specifiers that your object supports, and you can determine whether they're case-sensitive or case-insensitive. Your implementation of the `ToString(String)` method should support the following:

- A "G" format specifier that represents a customary or common format of the object. The parameterless overload of your object's `ToString` method should call its `ToString(String)` overload and pass it the "G" standard format string.

- Support for a format specifier that's equal to a null reference (`Nothing` in Visual Basic). A format specifier that's equal to a null reference should be considered equivalent to the "G" format specifier.

For example, a `Temperature` class can internally store the temperature in degrees Celsius and use format specifiers to represent the value of the `Temperature` object in degrees Celsius, degrees Fahrenheit, and kelvins. The following example provides an illustration.

[Conceptual.Formatting.Overview#7 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.formatting.overview/cs/appstandard1.cs#7)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.formatting.overview/cs/appstandard1.cs.md)
[Conceptual.Formatting.Overview#7 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.formatting.overview/vb/appstandard1.vb#7)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.formatting.overview/vb/appstandard1.vb.md)

### Custom format strings

In addition to the standard format strings, .NET defines custom format strings for both numeric values and date and time values. A custom format string consists of one or more custom format specifiers that define the string representation of a value. For example, the custom date and time format string "yyyy/mm/dd hh:mm:ss.ffff t zzz" converts a date to its string representation in the form "2008/11/15 07:45:00.0000 P -08:00" for the en-US culture. Similarly, the custom format string "0000" converts the integer value 12 to "0012". For a complete list of custom format strings, see [Custom Date and Time Format Strings](custom-date-and-time-format-strings.md) and [Custom Numeric Format Strings](custom-numeric-format-strings.md).

If a format string consists of a single custom format specifier, the format specifier should be preceded by the percent (%) symbol to avoid confusion with a standard format specifier. The following example uses the "M" custom format specifier to display a one-digit or two-digit number of the month of a particular date.

[Conceptual.Formatting.Overview#8 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.formatting.overview/cs/singlecustom1.cs#8)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.formatting.overview/cs/singlecustom1.cs.md)
[Conceptual.Formatting.Overview#8 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.formatting.overview/vb/singlecustom1.vb#8)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.formatting.overview/vb/singlecustom1.vb.md)

Many standard format strings for date and time values are aliases for custom format strings that are defined by properties of the [System.Globalization.DateTimeFormatInfo](https://learn.microsoft.com/search/?terms=System.Globalization.DateTimeFormatInfo) object. Custom format strings also offer considerable flexibility in providing application-defined formatting for numeric values or date and time values. You can define your own custom result strings for both numeric values and date and time values by combining multiple custom format specifiers into a single custom format string. The following example defines a custom format string that displays the day of the week in parentheses after the month name, day, and year.

[Conceptual.Formatting.Overview#9 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.formatting.overview/cs/custom1.cs#9)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.formatting.overview/cs/custom1.cs.md)
[Conceptual.Formatting.Overview#9 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.formatting.overview/vb/custom1.vb#9)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.formatting.overview/vb/custom1.vb.md)

The following example defines a custom format string that displays an [System.Int64](https://learn.microsoft.com/search/?terms=System.Int64) value as a standard, seven-digit U.S. telephone number along with its area code.

[Conceptual.Formatting.Overview#21 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.formatting.overview/cs/telnumber1.cs#21)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.formatting.overview/cs/telnumber1.cs.md)
[Conceptual.Formatting.Overview#21 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.formatting.overview/vb/telnumber1.vb#21)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.formatting.overview/vb/telnumber1.vb.md)

Although standard format strings can generally handle most of the formatting needs for your application-defined types, you can also define custom format specifiers to format your types.

### Format strings and .NET types

All numeric types (that is, the [System.Byte](https://learn.microsoft.com/search/?terms=System.Byte), [System.Decimal](https://learn.microsoft.com/search/?terms=System.Decimal), [System.Double](https://learn.microsoft.com/search/?terms=System.Double), [System.Int16](https://learn.microsoft.com/search/?terms=System.Int16), [System.Int32](https://learn.microsoft.com/search/?terms=System.Int32), [System.Int64](https://learn.microsoft.com/search/?terms=System.Int64), [System.SByte](https://learn.microsoft.com/search/?terms=System.SByte), [System.Single](https://learn.microsoft.com/search/?terms=System.Single), [System.UInt16](https://learn.microsoft.com/search/?terms=System.UInt16), [System.UInt32](https://learn.microsoft.com/search/?terms=System.UInt32), [System.UInt64](https://learn.microsoft.com/search/?terms=System.UInt64), and [System.Numerics.BigInteger](https://learn.microsoft.com/search/?terms=System.Numerics.BigInteger) types), as well as the [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime), [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset), [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan), [System.Guid](https://learn.microsoft.com/search/?terms=System.Guid), and all enumeration types, support formatting with format strings. For information on the specific format strings supported by each type, see the following articles:

| Title | Definition |
| --- | --- |
| [Standard Numeric Format Strings](standard-numeric-format-strings.md) | Describes standard format strings that create commonly used string representations of numeric values. |
| [Custom Numeric Format Strings](custom-numeric-format-strings.md) | Describes custom format strings that create application-specific formats for numeric values. |
| [Standard Date and Time Format Strings](standard-date-and-time-format-strings.md) | Describes standard format strings that create commonly used string representations of [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) and [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) values. |
| [Custom Date and Time Format Strings](custom-date-and-time-format-strings.md) | Describes custom format strings that create application-specific formats for [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) and [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) values. |
| [Standard TimeSpan Format Strings](standard-timespan-format-strings.md) | Describes standard format strings that create commonly used string representations of time intervals. |
| [Custom TimeSpan Format Strings](custom-timespan-format-strings.md) | Describes custom format strings that create application-specific formats for time intervals. |
| [Enumeration Format Strings](enumeration-format-strings.md) | Describes standard format strings that are used to create string representations of enumeration values. |
| [System.Guid.ToString%28System.String%29](https://learn.microsoft.com/search/?terms=System.Guid.ToString%2528System.String%2529) | Describes standard format strings for [System.Guid](https://learn.microsoft.com/search/?terms=System.Guid) values. |

## Culture-sensitive formatting with format providers

Although format specifiers let you customize the formatting of objects, producing a meaningful string representation of objects often requires additional formatting information. For example, formatting a number as a currency value by using either the "C" standard format string or a custom format string such as "$ #,#.00" requires, at a minimum, information about the correct currency symbol, group separator, and decimal separator to be available to include in the formatted string. In .NET, this extra formatting information is made available through the [System.IFormatProvider](https://learn.microsoft.com/search/?terms=System.IFormatProvider) interface, which is provided as a parameter to one or more overloads of the `ToString` method of numeric types and date and time types. [System.IFormatProvider](https://learn.microsoft.com/search/?terms=System.IFormatProvider) implementations are used in .NET to support culture-specific formatting. The following example illustrates how the string representation of an object changes when it's formatted with three [System.IFormatProvider](https://learn.microsoft.com/search/?terms=System.IFormatProvider) objects that represent different cultures.

[Conceptual.Formatting.Overview#11 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.formatting.overview/cs/iformatprovider1.cs#11)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.formatting.overview/cs/iformatprovider1.cs.md)
[Conceptual.Formatting.Overview#11 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.formatting.overview/vb/iformatprovider1.vb#11)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.formatting.overview/vb/iformatprovider1.vb.md)

The [System.IFormatProvider](https://learn.microsoft.com/search/?terms=System.IFormatProvider) interface includes one method, [System.IFormatProvider.GetFormat%28System.Type%29](https://learn.microsoft.com/search/?terms=System.IFormatProvider.GetFormat%2528System.Type%2529), which has a single parameter that specifies the type of object that provides formatting information. If the method can provide an object of that type, it returns it. Otherwise, it returns a null reference (`Nothing` in Visual Basic).

[System.IFormatProvider.GetFormat*](https://learn.microsoft.com/search/?terms=System.IFormatProvider.GetFormat*) is a callback method. When you call a `ToString` method overload that includes an [System.IFormatProvider](https://learn.microsoft.com/search/?terms=System.IFormatProvider) parameter, it calls the [System.IFormatProvider.GetFormat*](https://learn.microsoft.com/search/?terms=System.IFormatProvider.GetFormat*) method of that [System.IFormatProvider](https://learn.microsoft.com/search/?terms=System.IFormatProvider) object. The [System.IFormatProvider.GetFormat*](https://learn.microsoft.com/search/?terms=System.IFormatProvider.GetFormat*) method is responsible for returning an object that provides the necessary formatting information, as specified by its `formatType` parameter, to the `ToString` method.

Several formatting or string conversion methods include a parameter of type [System.IFormatProvider](https://learn.microsoft.com/search/?terms=System.IFormatProvider), but in many cases the value of the parameter is ignored when the method is called. The following table lists some of the formatting methods that use the parameter and the type of the [System.Type](https://learn.microsoft.com/search/?terms=System.Type) object that they pass to the [System.IFormatProvider.GetFormat*](https://learn.microsoft.com/search/?terms=System.IFormatProvider.GetFormat*) method.

| Method | Type of `formatType` parameter |
| --- | --- |
| `ToString` method of numeric types | [System.Globalization.NumberFormatInfo](https://learn.microsoft.com/search/?terms=System.Globalization.NumberFormatInfo) |
| `ToString` method of date and time types | [System.Globalization.DateTimeFormatInfo](https://learn.microsoft.com/search/?terms=System.Globalization.DateTimeFormatInfo) |
| [System.String.Format*](https://learn.microsoft.com/search/?terms=System.String.Format*) | [System.ICustomFormatter](https://learn.microsoft.com/search/?terms=System.ICustomFormatter) |
| [System.Text.StringBuilder.AppendFormat*](https://learn.microsoft.com/search/?terms=System.Text.StringBuilder.AppendFormat*) | [System.ICustomFormatter](https://learn.microsoft.com/search/?terms=System.ICustomFormatter) |

> **Note:**
> The `ToString` methods of the numeric types and date and time types are overloaded, and only some of the overloads include an [System.IFormatProvider](https://learn.microsoft.com/search/?terms=System.IFormatProvider) parameter. If a method doesn't have a parameter of type [System.IFormatProvider](https://learn.microsoft.com/search/?terms=System.IFormatProvider), the object that is returned by the [System.Globalization.CultureInfo.CurrentCulture](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.CurrentCulture) property is passed instead. For example, a call to the default [System.Int32.ToString](https://learn.microsoft.com/search/?terms=System.Int32.ToString) method ultimately results in a method call such as the following: `Int32.ToString("G", System.Globalization.CultureInfo.CurrentCulture)`.

.NET provides three classes that implement [System.IFormatProvider](https://learn.microsoft.com/search/?terms=System.IFormatProvider):

- [System.Globalization.DateTimeFormatInfo](https://learn.microsoft.com/search/?terms=System.Globalization.DateTimeFormatInfo), a class that provides formatting information for date and time values for a specific culture. Its [System.IFormatProvider.GetFormat*](https://learn.microsoft.com/search/?terms=System.IFormatProvider.GetFormat*) implementation returns an instance of itself.

- [System.Globalization.NumberFormatInfo](https://learn.microsoft.com/search/?terms=System.Globalization.NumberFormatInfo), a class that provides numeric formatting information for a specific culture. Its [System.IFormatProvider.GetFormat*](https://learn.microsoft.com/search/?terms=System.IFormatProvider.GetFormat*) implementation returns an instance of itself.

- [System.Globalization.CultureInfo](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo). Its [System.IFormatProvider.GetFormat*](https://learn.microsoft.com/search/?terms=System.IFormatProvider.GetFormat*) implementation can return either a [System.Globalization.NumberFormatInfo](https://learn.microsoft.com/search/?terms=System.Globalization.NumberFormatInfo) object to provide numeric formatting information or a [System.Globalization.DateTimeFormatInfo](https://learn.microsoft.com/search/?terms=System.Globalization.DateTimeFormatInfo) object to provide formatting information for date and time values.

You can also implement your own format provider to replace any one of these classes. However, your implementation's [System.IFormatProvider.GetFormat*](https://learn.microsoft.com/search/?terms=System.IFormatProvider.GetFormat*) method must return an object of the type listed in the previous table if it has to provide formatting information to the `ToString` method.

### Culture-sensitive formatting of numeric values

By default, the formatting of numeric values is culture-sensitive. If you don't specify a culture when you call a formatting method, the formatting conventions of the current culture are used. This is illustrated in the following example, which changes the current culture four times and then calls the [System.Decimal.ToString%28System.String%29](https://learn.microsoft.com/search/?terms=System.Decimal.ToString%2528System.String%2529) method. In each case, the result string reflects the formatting conventions of the current culture. This is because the `ToString` and `ToString(String)` methods wrap calls to each numeric type's `ToString(String, IFormatProvider)` method.

[Conceptual.Formatting.Overview#19 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.formatting.overview/cs/culturespecific3.cs#19)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.formatting.overview/cs/culturespecific3.cs.md)
[Conceptual.Formatting.Overview#19 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.formatting.overview/vb/culturespecific3.vb#19)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.formatting.overview/vb/culturespecific3.vb.md)

You can also format a numeric value for a specific culture by calling a `ToString` overload that has a `provider` parameter and passing it either of the following:

- A [System.Globalization.CultureInfo](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo) object that represents the culture whose formatting conventions are to be used. Its [System.Globalization.CultureInfo.GetFormat*](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.GetFormat*) method returns the value of the [System.Globalization.CultureInfo.NumberFormat](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.NumberFormat) property, which is the [System.Globalization.NumberFormatInfo](https://learn.microsoft.com/search/?terms=System.Globalization.NumberFormatInfo) object that provides culture-specific formatting information for numeric values.

- A [System.Globalization.NumberFormatInfo](https://learn.microsoft.com/search/?terms=System.Globalization.NumberFormatInfo) object that defines the culture-specific formatting conventions to be used. Its [System.Globalization.NumberFormatInfo.GetFormat*](https://learn.microsoft.com/search/?terms=System.Globalization.NumberFormatInfo.GetFormat*) method returns an instance of itself.

The following example uses [System.Globalization.NumberFormatInfo](https://learn.microsoft.com/search/?terms=System.Globalization.NumberFormatInfo) objects that represent the English (United States) and English (United Kingdom) cultures and the French and Russian neutral cultures to format a floating-point number.

[Conceptual.Formatting.Overview#20 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.formatting.overview/cs/culturespecific4.cs#20)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.formatting.overview/cs/culturespecific4.cs.md)
[Conceptual.Formatting.Overview#20 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.formatting.overview/vb/culturespecific4.vb#20)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.formatting.overview/vb/culturespecific4.vb.md)

### Culture-sensitive formatting of date and time values

By default, the formatting of date and time values is culture-sensitive. If you don't specify a culture when you call a formatting method, the formatting conventions of the current culture are used. This is illustrated in the following example, which changes the current culture four times and then calls the [System.DateTime.ToString%28System.String%29](https://learn.microsoft.com/search/?terms=System.DateTime.ToString%2528System.String%2529) method. In each case, the result string reflects the formatting conventions of the current culture. This is because the [System.DateTime.ToString](https://learn.microsoft.com/search/?terms=System.DateTime.ToString), [System.DateTime.ToString%28System.String%29](https://learn.microsoft.com/search/?terms=System.DateTime.ToString%2528System.String%2529), [System.DateTimeOffset.ToString](https://learn.microsoft.com/search/?terms=System.DateTimeOffset.ToString), and [System.DateTimeOffset.ToString%28System.String%29](https://learn.microsoft.com/search/?terms=System.DateTimeOffset.ToString%2528System.String%2529) methods wrap calls to the [System.DateTime.ToString%28System.String%2CSystem.IFormatProvider%29](https://learn.microsoft.com/search/?terms=System.DateTime.ToString%2528System.String%252CSystem.IFormatProvider%2529) and [System.DateTimeOffset.ToString%28System.String%2CSystem.IFormatProvider%29](https://learn.microsoft.com/search/?terms=System.DateTimeOffset.ToString%2528System.String%252CSystem.IFormatProvider%2529) methods.

[Conceptual.Formatting.Overview#17 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.formatting.overview/cs/culturespecific1.cs#17)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.formatting.overview/cs/culturespecific1.cs.md)
[Conceptual.Formatting.Overview#17 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.formatting.overview/vb/culturespecific1.vb#17)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.formatting.overview/vb/culturespecific1.vb.md)

You can also format a date and time value for a specific culture by calling a [System.DateTime.ToString*](https://learn.microsoft.com/search/?terms=System.DateTime.ToString*) or [System.DateTimeOffset.ToString*](https://learn.microsoft.com/search/?terms=System.DateTimeOffset.ToString*) overload that has a `provider` parameter and passing it either of the following:

- A [System.Globalization.CultureInfo](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo) object that represents the culture whose formatting conventions are to be used. Its [System.Globalization.CultureInfo.GetFormat*](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.GetFormat*) method returns the value of the [System.Globalization.CultureInfo.DateTimeFormat](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.DateTimeFormat) property, which is the [System.Globalization.DateTimeFormatInfo](https://learn.microsoft.com/search/?terms=System.Globalization.DateTimeFormatInfo) object that provides culture-specific formatting information for date and time values.

- A [System.Globalization.DateTimeFormatInfo](https://learn.microsoft.com/search/?terms=System.Globalization.DateTimeFormatInfo) object that defines the culture-specific formatting conventions to be used. Its [System.Globalization.DateTimeFormatInfo.GetFormat*](https://learn.microsoft.com/search/?terms=System.Globalization.DateTimeFormatInfo.GetFormat*) method returns an instance of itself.

The following example uses [System.Globalization.DateTimeFormatInfo](https://learn.microsoft.com/search/?terms=System.Globalization.DateTimeFormatInfo) objects that represent the English (United States) and English (United Kingdom) cultures and the French and Russian neutral cultures to format a date.

[Conceptual.Formatting.Overview#18 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.formatting.overview/cs/culturespecific2.cs#18)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.formatting.overview/cs/culturespecific2.cs.md)
[Conceptual.Formatting.Overview#18 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.formatting.overview/vb/culturespecific2.vb#18)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.formatting.overview/vb/culturespecific2.vb.md)

## The IFormattable interface

Typically, types that overload the `ToString` method with a format string and an [System.IFormatProvider](https://learn.microsoft.com/search/?terms=System.IFormatProvider) parameter also implement the [System.IFormattable](https://learn.microsoft.com/search/?terms=System.IFormattable) interface. This interface has a single member, [System.IFormattable.ToString%28System.String%2CSystem.IFormatProvider%29](https://learn.microsoft.com/search/?terms=System.IFormattable.ToString%2528System.String%252CSystem.IFormatProvider%2529), that includes both a format string and a format provider as parameters.

Implementing the [System.IFormattable](https://learn.microsoft.com/search/?terms=System.IFormattable) interface for your application-defined class offers two advantages:

- Support for string conversion by the [System.Convert](https://learn.microsoft.com/search/?terms=System.Convert) class. Calls to the [System.Convert.ToString%28System.Object%29](https://learn.microsoft.com/search/?terms=System.Convert.ToString%2528System.Object%2529) and [System.Convert.ToString%28System.Object%2CSystem.IFormatProvider%29](https://learn.microsoft.com/search/?terms=System.Convert.ToString%2528System.Object%252CSystem.IFormatProvider%2529) methods call your [System.IFormattable](https://learn.microsoft.com/search/?terms=System.IFormattable) implementation automatically.

- Support for composite formatting. If a format item that includes a format string is used to format your custom type, the common language runtime automatically calls your [System.IFormattable](https://learn.microsoft.com/search/?terms=System.IFormattable) implementation and passes it the format string. For more information about composite formatting with methods such as [System.String.Format*](https://learn.microsoft.com/search/?terms=System.String.Format*) or [System.Console.WriteLine*](https://learn.microsoft.com/search/?terms=System.Console.WriteLine*), see the [Composite Formatting](#composite-formatting) section.

The following example defines a `Temperature` class that implements the [System.IFormattable](https://learn.microsoft.com/search/?terms=System.IFormattable) interface. It supports the "C" or "G" format specifiers to display the temperature in Celsius, the "F" format specifier to display the temperature in Fahrenheit, and the "K" format specifier to display the temperature in Kelvin.

[Conceptual.Formatting.Overview#12 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.formatting.overview/cs/iformattable.cs#12)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.formatting.overview/cs/iformattable.cs.md)
[Conceptual.Formatting.Overview#12 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.formatting.overview/vb/iformattable.vb#12)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.formatting.overview/vb/iformattable.vb.md)

The following example instantiates a `Temperature` object. It then calls the [System.Convert.ToString*](https://learn.microsoft.com/search/?terms=System.Convert.ToString*) method and uses several composite format strings to obtain different string representations of a `Temperature` object. Each of these method calls, in turn, calls the [System.IFormattable](https://learn.microsoft.com/search/?terms=System.IFormattable) implementation of the `Temperature` class.

[Conceptual.Formatting.Overview#13 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.formatting.overview/cs/iformattable.cs#13)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.formatting.overview/cs/iformattable.cs.md)
[Conceptual.Formatting.Overview#13 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.formatting.overview/vb/iformattable.vb#13)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.formatting.overview/vb/iformattable.vb.md)

## Composite formatting

Some methods, such as [System.String.Format*](https://learn.microsoft.com/search/?terms=System.String.Format*) and [System.Text.StringBuilder.AppendFormat*](https://learn.microsoft.com/search/?terms=System.Text.StringBuilder.AppendFormat*), support *composite formatting*. A composite format string is a kind of template that returns a single string that incorporates the string representation of zero, one, or more objects. Each object is represented in the composite format string by an indexed format item. The index of the format item corresponds to the position of the object that it represents in the method's parameter list. Indexes are zero-based. For example, in the following call to the [System.String.Format*](https://learn.microsoft.com/search/?terms=System.String.Format*) method, the first format item, `{0:D}`, is replaced by the string representation of `thatDate`; the second format item, `{1}`, is replaced by the string representation of `item1`; and the third format item, `{2:C2}`, is replaced by the string representation of `item1.Value`.

[Conceptual.Formatting.Overview#14 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.formatting.overview/cs/composite1.cs#14)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.formatting.overview/cs/composite1.cs.md)
[Conceptual.Formatting.Overview#14 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.formatting.overview/vb/composite1.vb#14)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.formatting.overview/vb/composite1.vb.md)

In addition to replacing a format item with the string representation of its corresponding object, format items also let you control the following:

- The specific way in which an object is represented as a string, if the object implements the [System.IFormattable](https://learn.microsoft.com/search/?terms=System.IFormattable) interface and supports format strings. You do this by following the format item's index with a `:` (colon) followed by a valid format string. The previous example did this by formatting a date value with the "d" (short date pattern) format string (for example, `{0:d}`) and by formatting a numeric value with the "C2" format string (for example, `{2:C2}`) to represent the number as a currency value with two fractional decimal digits.

- The width of the field that contains the object's string representation, and the alignment of the string representation in that field. You do this by following the format item's index with a `,` (comma) followed the field width. The string is right-aligned in the field if the field width is a positive value, and it's left-aligned if the field width is a negative value. The following example left-aligns date values in a 20-character field, and it right-aligns decimal values with one fractional digit in an 11-character field.

  [Conceptual.Formatting.Overview#22 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.formatting.overview/cs/composite2.cs#22)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.formatting.overview/cs/composite2.cs.md)
  [Conceptual.Formatting.Overview#22 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.formatting.overview/vb/composite2.vb#22)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.formatting.overview/vb/composite2.vb.md)

  If both the alignment string component and the format string component are present, the former precedes the latter (for example, `{0,-20:g}`).

For more information about composite formatting, see [Composite Formatting](composite-formatting.md).

## Custom formatting with ICustomFormatter

Two composite formatting methods, [System.String.Format%28System.IFormatProvider%2CSystem.String%2CSystem.Object%5B%5D%29](https://learn.microsoft.com/search/?terms=System.String.Format%2528System.IFormatProvider%252CSystem.String%252CSystem.Object%255B%255D%2529) and [System.Text.StringBuilder.AppendFormat%28System.IFormatProvider%2CSystem.String%2CSystem.Object%5B%5D%29](https://learn.microsoft.com/search/?terms=System.Text.StringBuilder.AppendFormat%2528System.IFormatProvider%252CSystem.String%252CSystem.Object%255B%255D%2529), include a format provider parameter that supports custom formatting. When either of these formatting methods is called, it passes a [System.Type](https://learn.microsoft.com/search/?terms=System.Type) object that represents an [System.ICustomFormatter](https://learn.microsoft.com/search/?terms=System.ICustomFormatter) interface to the format provider's [System.IFormatProvider.GetFormat*](https://learn.microsoft.com/search/?terms=System.IFormatProvider.GetFormat*) method. The [System.IFormatProvider.GetFormat*](https://learn.microsoft.com/search/?terms=System.IFormatProvider.GetFormat*) method is then responsible for returning the [System.ICustomFormatter](https://learn.microsoft.com/search/?terms=System.ICustomFormatter) implementation that provides custom formatting.

The [System.ICustomFormatter](https://learn.microsoft.com/search/?terms=System.ICustomFormatter) interface has a single method, [System.ICustomFormatter.Format%28System.String%2CSystem.Object%2CSystem.IFormatProvider%29](https://learn.microsoft.com/search/?terms=System.ICustomFormatter.Format%2528System.String%252CSystem.Object%252CSystem.IFormatProvider%2529), that is called automatically by a composite formatting method, once for each format item in a composite format string. The [System.ICustomFormatter.Format%28System.String%2CSystem.Object%2CSystem.IFormatProvider%29](https://learn.microsoft.com/search/?terms=System.ICustomFormatter.Format%2528System.String%252CSystem.Object%252CSystem.IFormatProvider%2529) method has three parameters: a format string, which represents the `formatString` argument in a format item, an object to format, and an [System.IFormatProvider](https://learn.microsoft.com/search/?terms=System.IFormatProvider) object that provides formatting services. Typically, the class that implements [System.ICustomFormatter](https://learn.microsoft.com/search/?terms=System.ICustomFormatter) also implements [System.IFormatProvider](https://learn.microsoft.com/search/?terms=System.IFormatProvider), so this last parameter is a reference to the custom formatting class itself. The method returns a custom formatted string representation of the object to be formatted. If the method can't format the object, it should return a null reference (`Nothing` in Visual Basic).

The following example provides an [System.ICustomFormatter](https://learn.microsoft.com/search/?terms=System.ICustomFormatter) implementation named `ByteByByteFormatter` that displays integer values as a sequence of two-digit hexadecimal values followed by a space.

[Conceptual.Formatting.Overview#15 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.formatting.overview/cs/icustomformatter1.cs#15)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.formatting.overview/cs/icustomformatter1.cs.md)
[Conceptual.Formatting.Overview#15 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.formatting.overview/vb/icustomformatter1.vb#15)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.formatting.overview/vb/icustomformatter1.vb.md)

The following example uses the `ByteByByteFormatter` class to format integer values. The [System.ICustomFormatter.Format*](https://learn.microsoft.com/search/?terms=System.ICustomFormatter.Format*) method is called more than once in the second [System.String.Format%28System.IFormatProvider%2CSystem.String%2CSystem.Object%5B%5D%29](https://learn.microsoft.com/search/?terms=System.String.Format%2528System.IFormatProvider%252CSystem.String%252CSystem.Object%255B%255D%2529) method call, and that the default [System.Globalization.NumberFormatInfo](https://learn.microsoft.com/search/?terms=System.Globalization.NumberFormatInfo) provider is used in the third method call because the .`ByteByByteFormatter.Format` method doesn't recognize the "N0" format string and returns a null reference (`Nothing` in Visual Basic).

[Conceptual.Formatting.Overview#16 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.formatting.overview/cs/icustomformatter1.cs#16)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.formatting.overview/cs/icustomformatter1.cs.md)
[Conceptual.Formatting.Overview#16 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.formatting.overview/vb/icustomformatter1.vb#16)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.formatting.overview/vb/icustomformatter1.vb.md)

## See also

| Title | Definition |
| --- | --- |
| [Standard Numeric Format Strings](standard-numeric-format-strings.md) | Describes standard format strings that create commonly used string representations of numeric values. |
| [Custom Numeric Format Strings](custom-numeric-format-strings.md) | Describes custom format strings that create application-specific formats for numeric values. |
| [Standard Date and Time Format Strings](standard-date-and-time-format-strings.md) | Describes standard format strings that create commonly used string representations of [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) values. |
| [Custom Date and Time Format Strings](custom-date-and-time-format-strings.md) | Describes custom format strings that create application-specific formats for [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) values. |
| [Standard TimeSpan Format Strings](standard-timespan-format-strings.md) | Describes standard format strings that create commonly used string representations of time intervals. |
| [Custom TimeSpan Format Strings](custom-timespan-format-strings.md) | Describes custom format strings that create application-specific formats for time intervals. |
| [Enumeration Format Strings](enumeration-format-strings.md) | Describes standard format strings that are used to create string representations of enumeration values. |
| [Composite Formatting](composite-formatting.md) | Describes how to embed one or more formatted values in a string. The string can subsequently be displayed on the console or written to a stream. |
| [Parsing Strings](parsing-strings.md) | Describes how to initialize objects to the values described by string representations of those objects. Parsing is the inverse operation of formatting. |

## Reference

- [System.IFormattable](https://learn.microsoft.com/search/?terms=System.IFormattable)
- [System.IFormatProvider](https://learn.microsoft.com/search/?terms=System.IFormatProvider)
- [System.ICustomFormatter](https://learn.microsoft.com/search/?terms=System.ICustomFormatter)
