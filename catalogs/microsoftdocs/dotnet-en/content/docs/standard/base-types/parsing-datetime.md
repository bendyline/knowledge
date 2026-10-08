---
title: Parse date and time strings
description: "Learn techniques to parse strings that represent dates and times to create DateTime, DateOnly, and TimeOnly objects from string representations."
ms.date: 01/16/2026
ms.custom: devdivchpfy22
ai-usage: ai-assisted
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "parsing strings, date and time strings"
  - "date and time strings"
  - "ParseExact method"
  - "enumerations [.NET], parsing strings"
  - "base types, parsing strings"
  - "DateTime object"
  - "DateOnly structure"
  - "TimeOnly structure"
  - "time strings"
---
# Parse date and time strings in .NET

.NET provides several types for working with date and time data, each optimized for different scenarios:

- **[System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime)** - Represents a date and time together, ideal when you need both components or when working with legacy code.
- **[System.DateOnly](https://learn.microsoft.com/search/?terms=System.DateOnly)** (not available in .NET Framework) - Represents only a date without time information, perfect for birthdays, anniversaries, or business dates.
- **[System.TimeOnly](https://learn.microsoft.com/search/?terms=System.TimeOnly)** (not available in .NET Framework) - Represents only a time without date information, ideal for schedules, alarms, or recurring daily events.

Each type provides parsing methods that convert strings to their respective objects, with different levels of flexibility and control over the parsing process.

## Common parsing concepts

All three date and time types share similar parsing approaches:

- **`Parse` and `TryParse` methods** - Convert many common string representations using current culture or specified culture settings.
- **`ParseExact` and `TryParseExact` methods** - Convert strings that conform to specific format patterns, providing precise control over expected formats, including culture settings.
- **Format strings** - Define patterns for parsing using standard or custom format specifiers.

Different cultures use different orders for day, month, and year. Some time representations use a 24-hour clock, others specify "AM" and "PM." The parsing methods handle these variations through culture-specific formatting rules.

The [System.Globalization.DateTimeFormatInfo](https://learn.microsoft.com/search/?terms=System.Globalization.DateTimeFormatInfo) object provides control over how text should be interpreted. Properties describe the date and time separators, names of months, days, eras, and the format for "AM" and "PM" designations. You can specify culture through the [System.IFormatProvider](https://learn.microsoft.com/search/?terms=System.IFormatProvider) parameter using a [System.Globalization.CultureInfo](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo) object or a [System.Globalization.DateTimeFormatInfo](https://learn.microsoft.com/search/?terms=System.Globalization.DateTimeFormatInfo) object.

For more information about format patterns, see [standard date and time format strings](standard-date-and-time-format-strings.md) and [custom date and time format strings](custom-date-and-time-format-strings.md).

> **Important:**
> [System.DateOnly](https://learn.microsoft.com/search/?terms=System.DateOnly) and [System.TimeOnly](https://learn.microsoft.com/search/?terms=System.TimeOnly) types aren't available for .NET Framework.

## DateTime parsing

[System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) represents both date and time components together. When parsing strings to `DateTime` objects, you need to consider several `DateTime`-specific aspects:

- **Missing information handling** - `DateTime` uses defaults when parts are missing from the input string.
- **Time zone and UTC offset support** - `DateTime` can represent local, UTC, or unspecified time zones.
- **Combined date and time parsing** - Must handle both date and time components in a single operation.

### Missing information handling

The text representing a date or time might be missing some information. For example, most people would assume the date "March 12" represents the current year. Similarly, "March 2018" represents the month of March in the year 2018. Text representing time often includes only hours, minutes, and an AM/PM designation. `DateTime` parsing methods handle this missing information by using reasonable defaults:

- When only the time is present, the date portion uses the current date.
- When only the date is present, the time portion is midnight.
- When the year isn't specified in a date, the current year is used.
- When the day of the month isn't specified, the first day of the month is used.

If the date is present in the string, it must include the month and one of the day or year. If the time is present, it must include the hour, and either the minutes or the AM/PM designator.

You can specify the [System.Globalization.DateTimeStyles.NoCurrentDateDefault](https://learn.microsoft.com/search/?terms=System.Globalization.DateTimeStyles.NoCurrentDateDefault) constant to override these defaults. When you use that constant, any missing year, month, or day properties are set to the value `1`. The [last example](#styles-example) using [System.DateTime.Parse*](https://learn.microsoft.com/search/?terms=System.DateTime.Parse*) demonstrates this behavior.

### UTC offset and time zone handling

In addition to a date and a time component, the string representation of a date and time can include an offset that indicates how much the time differs from Coordinated Universal Time (UTC). For example, the string "2/14/2007 5:32:00 -7:00" defines a time that's seven hours earlier than UTC. If an offset is omitted from the string representation of a time, parsing returns a [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) object with its [System.DateTime.Kind](https://learn.microsoft.com/search/?terms=System.DateTime.Kind) property set to [System.DateTimeKind.Unspecified](https://learn.microsoft.com/search/?terms=System.DateTimeKind.Unspecified). If an offset is specified, parsing returns a [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) object with its [System.DateTime.Kind](https://learn.microsoft.com/search/?terms=System.DateTime.Kind) property set to [System.DateTimeKind.Local](https://learn.microsoft.com/search/?terms=System.DateTimeKind.Local). Its value is also adjusted to the local time zone of your machine. You can modify this behavior by using a [System.Globalization.DateTimeStyles](https://learn.microsoft.com/search/?terms=System.Globalization.DateTimeStyles) value with the parsing method.

### Ambiguous date handling

The format provider is also used to interpret an ambiguous numeric date. It's unclear which components of the date represented by the string "02/03/04" are the month, day, and year. The components are interpreted according to the order of similar date formats in the format provider.

### DateTime.Parse

The following example shows the use of the [System.DateTime.Parse*](https://learn.microsoft.com/search/?terms=System.DateTime.Parse*) method to convert a `string` into a [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime). This example uses the culture associated with the current thread. If the [System.Globalization.CultureInfo](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo) associated with the current culture can't parse the input string, a [System.FormatException](https://learn.microsoft.com/search/?terms=System.FormatException) is thrown.

[source="./snippets/parsing-datetime/csharp/Program.cs" id="DateTimeParse" language="csharp"::: (complete source file; reference: ./snippets/parsing-datetime/csharp/Program.cs)](../../../_code/docs/standard/base-types/snippets/parsing-datetime/csharp/Program.cs.md)
[source="./snippets/parsing-datetime/vb/Program.vb" id="DateTimeParse" language="vb"::: (complete source file; reference: ./snippets/parsing-datetime/vb/Program.vb)](../../../_code/docs/standard/base-types/snippets/parsing-datetime/vb/Program.vb.md)

You can also explicitly define the culture whose formatting conventions are used when you parse a string. You specify one of the standard [System.Globalization.DateTimeFormatInfo](https://learn.microsoft.com/search/?terms=System.Globalization.DateTimeFormatInfo) objects returned by the [System.Globalization.CultureInfo.DateTimeFormat](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.DateTimeFormat) property. The following example uses a format provider to parse a German string into a [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime). It creates a [System.Globalization.CultureInfo](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo) representing the `de-DE` culture. That `CultureInfo` object ensures successful parsing of this particular string. This process precludes whatever setting is in the [System.Threading.Thread.CurrentCulture](https://learn.microsoft.com/search/?terms=System.Threading.Thread.CurrentCulture) of the [System.Threading.Thread.CurrentThread](https://learn.microsoft.com/search/?terms=System.Threading.Thread.CurrentThread).

[language="csharp" source="./snippets/parsing-datetime/csharp/Program.cs" id="DateTimeParseCulture"::: (complete source file; reference: ./snippets/parsing-datetime/csharp/Program.cs)](../../../_code/docs/standard/base-types/snippets/parsing-datetime/csharp/Program.cs.md)
[source="./snippets/parsing-datetime/vb/Program.vb" id="DateTimeParseCulture" language="vb"::: (complete source file; reference: ./snippets/parsing-datetime/vb/Program.vb)](../../../_code/docs/standard/base-types/snippets/parsing-datetime/vb/Program.vb.md)

However, you can use overloads of the [System.DateTime.Parse*](https://learn.microsoft.com/search/?terms=System.DateTime.Parse*) method to specify custom format providers. The [System.DateTime.Parse*](https://learn.microsoft.com/search/?terms=System.DateTime.Parse*) method doesn't support parsing non-standard formats. To parse a date and time expressed in a non-standard format, use the [System.DateTime.ParseExact*](https://learn.microsoft.com/search/?terms=System.DateTime.ParseExact*) method instead.

<a name="styles-example"></a>The following example uses the [System.Globalization.DateTimeStyles](https://learn.microsoft.com/search/?terms=System.Globalization.DateTimeStyles) enumeration to specify that the current date and time information shouldn't be added to the [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) for unspecified fields.

[source="./snippets/parsing-datetime/csharp/Program.cs" id="DateTimeParseNoDefault" language="csharp"::: (complete source file; reference: ./snippets/parsing-datetime/csharp/Program.cs)](../../../_code/docs/standard/base-types/snippets/parsing-datetime/csharp/Program.cs.md)
[source="./snippets/parsing-datetime/vb/Program.vb" id="DateTimeParseNoDefault" language="vb"::: (complete source file; reference: ./snippets/parsing-datetime/vb/Program.vb)](../../../_code/docs/standard/base-types/snippets/parsing-datetime/vb/Program.vb.md)

### DateTime.ParseExact

The [System.DateTime.ParseExact*](https://learn.microsoft.com/search/?terms=System.DateTime.ParseExact*) method converts a string to a [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) object if it conforms to one of the specified string patterns. When a string that isn't one of the forms specified is passed to this method, a [System.FormatException](https://learn.microsoft.com/search/?terms=System.FormatException) is thrown. You can specify one of the standard date and time format specifiers or a combination of the custom format specifiers. Using the custom format specifiers, it's possible for you to construct a custom recognition string. For an explanation of the specifiers, see the articles on [standard date and time format strings](standard-date-and-time-format-strings.md) and [custom date and time format strings](custom-date-and-time-format-strings.md).

In the following example, the [System.DateTime.ParseExact*](https://learn.microsoft.com/search/?terms=System.DateTime.ParseExact*) method is passed a string object to parse, followed by a format specifier, followed by a [System.Globalization.CultureInfo](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo) object. This [System.DateTime.ParseExact*](https://learn.microsoft.com/search/?terms=System.DateTime.ParseExact*) method can only parse strings that follow the long date pattern in the `en-US` culture.

[source="./snippets/parsing-datetime/csharp/Program.cs" id="DateTimeParseExact" language="csharp"::: (complete source file; reference: ./snippets/parsing-datetime/csharp/Program.cs)](../../../_code/docs/standard/base-types/snippets/parsing-datetime/csharp/Program.cs.md)
[source="./snippets/parsing-datetime/vb/Program.vb" id="DateTimeParseExact" language="vb"::: (complete source file; reference: ./snippets/parsing-datetime/vb/Program.vb)](../../../_code/docs/standard/base-types/snippets/parsing-datetime/vb/Program.vb.md)

Each overload of the [System.DateTime.Parse*](https://learn.microsoft.com/search/?terms=System.DateTime.Parse*) and [System.DateTime.ParseExact*](https://learn.microsoft.com/search/?terms=System.DateTime.ParseExact*) methods also has an [System.IFormatProvider](https://learn.microsoft.com/search/?terms=System.IFormatProvider) parameter that provides culture-specific information about the formatting of the string. The [System.IFormatProvider](https://learn.microsoft.com/search/?terms=System.IFormatProvider) object is a [System.Globalization.CultureInfo](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo) object that represents a standard culture or a [System.Globalization.DateTimeFormatInfo](https://learn.microsoft.com/search/?terms=System.Globalization.DateTimeFormatInfo) object that's returned by the [System.Globalization.CultureInfo.DateTimeFormat](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.DateTimeFormat) property. [System.DateTime.ParseExact*](https://learn.microsoft.com/search/?terms=System.DateTime.ParseExact*) also uses an additional string or string array argument that defines one or more custom date and time formats.

## DateOnly parsing

The [System.DateOnly](https://learn.microsoft.com/search/?terms=System.DateOnly) structure represents only a date without time information, making it perfect for scenarios like birthdays, anniversaries, or business dates. Since it has no time component, it represents a date from the start of the day to the end of the day.

`DateOnly` has several advantages over using `DateTime` for date-only scenarios:

- The `DateTime` structure might roll into the previous or next day if it's offset by a time zone. `DateOnly` can't be offset by a time zone, and it always represents the date that was set.
- Serializing a `DateOnly` includes less data than `DateTime`.
- When code interacts with a database, such as SQL Server, whole dates are generally stored as the `date` data type, which doesn't include a time. `DateOnly` matches the database type better.

### DateOnly.Parse

The [System.DateOnly.Parse*](https://learn.microsoft.com/search/?terms=System.DateOnly.Parse*) method converts common date string representations to a [System.DateOnly](https://learn.microsoft.com/search/?terms=System.DateOnly) object. The method accepts various formats and uses the current culture or a specified culture for parsing.

[source="./snippets/parsing-datetime/csharp/Program.cs" id="DateOnlyParse" language="csharp"::: (complete source file; reference: ./snippets/parsing-datetime/csharp/Program.cs)](../../../_code/docs/standard/base-types/snippets/parsing-datetime/csharp/Program.cs.md)
[source="./snippets/parsing-datetime/vb/Program.vb" id="DateOnlyParse" language="vb"::: (complete source file; reference: ./snippets/parsing-datetime/vb/Program.vb)](../../../_code/docs/standard/base-types/snippets/parsing-datetime/vb/Program.vb.md)

### DateOnly.ParseExact

The [System.DateOnly.ParseExact*](https://learn.microsoft.com/search/?terms=System.DateOnly.ParseExact*) method provides precise control over the expected format of the input string. Use this method when you know the exact format of the date string and want to ensure strict parsing.

[source="./snippets/parsing-datetime/csharp/Program.cs" id="DateOnlyParseExact" language="csharp"::: (complete source file; reference: ./snippets/parsing-datetime/csharp/Program.cs)](../../../_code/docs/standard/base-types/snippets/parsing-datetime/csharp/Program.cs.md)
[source="./snippets/parsing-datetime/vb/Program.vb" id="DateOnlyParseExact" language="vb"::: (complete source file; reference: ./snippets/parsing-datetime/vb/Program.vb)](../../../_code/docs/standard/base-types/snippets/parsing-datetime/vb/Program.vb.md)

The `ParseExact` method accepts either a single format string or an array of format strings, allowing you to parse dates that might come in multiple acceptable formats.

## TimeOnly parsing

The [System.TimeOnly](https://learn.microsoft.com/search/?terms=System.TimeOnly) structure represents a time-of-day value, such as a daily alarm clock or what time you eat lunch each day. `TimeOnly` is limited to the range of **00:00:00.0000000** - **23:59:59.9999999**, a specific time of day.

`TimeOnly` solves several problems that existed when using other types for time-only scenarios:

- `TimeSpan` represents elapsed time and can be negative or exceed 24 hours, making it unsuitable for representing a specific time of day.
- Using `DateTime` for a time of day requires an arbitrary date, which can lead to unexpected behavior when performing calculations.
- `TimeOnly` naturally handles 24-hour rollover when adding or subtracting time values.

### TimeOnly.Parse

The [System.TimeOnly.Parse*](https://learn.microsoft.com/search/?terms=System.TimeOnly.Parse*) method converts common time string representations to a [System.TimeOnly](https://learn.microsoft.com/search/?terms=System.TimeOnly) object. The method accepts various formats including 12-hour and 24-hour notation.

[source="./snippets/parsing-datetime/csharp/Program.cs" id="TimeOnlyParse" language="csharp"::: (complete source file; reference: ./snippets/parsing-datetime/csharp/Program.cs)](../../../_code/docs/standard/base-types/snippets/parsing-datetime/csharp/Program.cs.md)
[source="./snippets/parsing-datetime/vb/Program.vb" id="TimeOnlyParse" language="vb"::: (complete source file; reference: ./snippets/parsing-datetime/vb/Program.vb)](../../../_code/docs/standard/base-types/snippets/parsing-datetime/vb/Program.vb.md)

### TimeOnly.ParseExact

The [System.TimeOnly.ParseExact*](https://learn.microsoft.com/search/?terms=System.TimeOnly.ParseExact*) method provides precise control over the expected format of the input time string. Use this method when you know the exact format and want to ensure strict parsing.

[source="./snippets/parsing-datetime/csharp/Program.cs" id="TimeOnlyParseExact" language="csharp"::: (complete source file; reference: ./snippets/parsing-datetime/csharp/Program.cs)](../../../_code/docs/standard/base-types/snippets/parsing-datetime/csharp/Program.cs.md)
[source="./snippets/parsing-datetime/vb/Program.vb" id="TimeOnlyParseExact" language="vb"::: (complete source file; reference: ./snippets/parsing-datetime/vb/Program.vb)](../../../_code/docs/standard/base-types/snippets/parsing-datetime/vb/Program.vb.md)

## See also

- [Parsing strings](parsing-strings.md)
- [Formatting types](formatting-types.md)
- [Type conversion in .NET](type-conversion.md)
- [Standard date and time formats](standard-date-and-time-format-strings.md)
- [Custom date and time format strings](custom-date-and-time-format-strings.md)
- [How to use the DateOnly and TimeOnly structures](../datetime/how-to-use-dateonly-timeonly.md)
