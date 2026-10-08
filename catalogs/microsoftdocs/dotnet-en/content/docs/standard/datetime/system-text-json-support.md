---
title: DateTime and DateTimeOffset support in System.Text.Json
description: An overview of how DateTime and DateTimeOffset types are supported in the System.Text.Json library.
author: layomia
ms.date: 01/11/2023
ms.custom: devdivchpfy22
helpviewer_keywords:
  - "JSON, Serializer, Utf8"
  - "JSON DateTime, JSON DateTimeOffset"
  - "DateTime, DateTimeOffset"
  - "JsonSerializer, Utf8JsonReader, Utf8JsonWriter, JsonElement, JsonDocument"
  - "JSON Serializer, JSON Reader, JSON Writer"
  - "Converter, JSON Converter, DateTime Converter"
  - "ISO, ISO 8601, ISO 8601-1:2019"
---
# DateTime and DateTimeOffset support in System.Text.Json

The `System.Text.Json` library parses and writes [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) and [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) values according to the ISO 8601-1:2019 extended profile.
[Converters](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonConverter%601) provide custom support for serializing and deserializing with [System.Text.Json.JsonSerializer](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializer). You can also use [System.Text.Json.Utf8JsonReader](https://learn.microsoft.com/search/?terms=System.Text.Json.Utf8JsonReader) and [System.Text.Json.Utf8JsonWriter](https://learn.microsoft.com/search/?terms=System.Text.Json.Utf8JsonWriter) to implement custom support.

## Support for the ISO 8601-1:2019 format

The [System.Text.Json.JsonSerializer](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializer), [System.Text.Json.Utf8JsonReader](https://learn.microsoft.com/search/?terms=System.Text.Json.Utf8JsonReader), [System.Text.Json.Utf8JsonWriter](https://learn.microsoft.com/search/?terms=System.Text.Json.Utf8JsonWriter),
and [System.Text.Json.JsonElement](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonElement) types parse and write [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) and [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset)
text representations according to the extended profile of the ISO 8601-1:2019 format, for example, `2019-07-26T16:59:57-05:00`.

[System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) and [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) data can be serialized with [System.Text.Json.JsonSerializer](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializer):

[language="csharp" source="snippets/system-text-json-support/csharp/serializing-with-jsonserializer/Program.cs"::: (complete source file; reference: snippets/system-text-json-support/csharp/serializing-with-jsonserializer/Program.cs)](../../../_code/docs/standard/datetime/snippets/system-text-json-support/csharp/serializing-with-jsonserializer/Program.cs.md)

[System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) and [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) can also be deserialized with [System.Text.Json.JsonSerializer](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializer):

[language="csharp" source="snippets/system-text-json-support/csharp/deserializing-with-jsonserializer-valid/Program.cs"::: (complete source file; reference: snippets/system-text-json-support/csharp/deserializing-with-jsonserializer-valid/Program.cs)](../../../_code/docs/standard/datetime/snippets/system-text-json-support/csharp/deserializing-with-jsonserializer-valid/Program.cs.md)

With default options, input [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) and [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) text representations must conform to the extended ISO 8601-1:2019 profile. If you attempt to deserialize representations that don't conform to the profile, [System.Text.Json.JsonSerializer](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializer) throws a [System.Text.Json.JsonException](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonException):

[language="csharp" source="snippets/system-text-json-support/csharp/deserializing-with-jsonserializer-error/Program.cs"::: (complete source file; reference: snippets/system-text-json-support/csharp/deserializing-with-jsonserializer-error/Program.cs)](../../../_code/docs/standard/datetime/snippets/system-text-json-support/csharp/deserializing-with-jsonserializer-error/Program.cs.md)

[System.Text.Json.JsonDocument](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonDocument) provides structured access to the contents of a JSON payload, including [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) and [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) representations. The following example shows how to calculate the average
temperature on Mondays from a collection of temperatures:

[language="csharp" source="snippets/system-text-json-support/csharp/computing-with-jsondocument-valid/Program.cs"::: (complete source file; reference: snippets/system-text-json-support/csharp/computing-with-jsondocument-valid/Program.cs)](../../../_code/docs/standard/datetime/snippets/system-text-json-support/csharp/computing-with-jsondocument-valid/Program.cs.md)

If you attempt to compute the average temperature given a payload with non-compliant [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) representations, [System.Text.Json.JsonDocument](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonDocument) throws a [System.FormatException](https://learn.microsoft.com/search/?terms=System.FormatException):

[language="csharp" source="snippets/system-text-json-support/csharp/computing-with-jsondocument-error/Program.cs"::: (complete source file; reference: snippets/system-text-json-support/csharp/computing-with-jsondocument-error/Program.cs)](../../../_code/docs/standard/datetime/snippets/system-text-json-support/csharp/computing-with-jsondocument-error/Program.cs.md)

The lower level [System.Text.Json.Utf8JsonWriter](https://learn.microsoft.com/search/?terms=System.Text.Json.Utf8JsonWriter) writes [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) and [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) data:

[language="csharp" source="snippets/system-text-json-support/csharp/writing-with-utf8jsonwriter/Program.cs"::: (complete source file; reference: snippets/system-text-json-support/csharp/writing-with-utf8jsonwriter/Program.cs)](../../../_code/docs/standard/datetime/snippets/system-text-json-support/csharp/writing-with-utf8jsonwriter/Program.cs.md)

[System.Text.Json.Utf8JsonReader](https://learn.microsoft.com/search/?terms=System.Text.Json.Utf8JsonReader) parses [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) and [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) data:

[language="csharp" source="snippets/system-text-json-support/csharp/reading-with-utf8jsonreader-valid/Program.cs"::: (complete source file; reference: snippets/system-text-json-support/csharp/reading-with-utf8jsonreader-valid/Program.cs)](../../../_code/docs/standard/datetime/snippets/system-text-json-support/csharp/reading-with-utf8jsonreader-valid/Program.cs.md)

If you attempt to read non-compliant formats with [System.Text.Json.Utf8JsonReader](https://learn.microsoft.com/search/?terms=System.Text.Json.Utf8JsonReader), it throws a [System.FormatException](https://learn.microsoft.com/search/?terms=System.FormatException):

[language="csharp" source="snippets/system-text-json-support/csharp/reading-with-utf8jsonreader-error/Program.cs"::: (complete source file; reference: snippets/system-text-json-support/csharp/reading-with-utf8jsonreader-error/Program.cs)](../../../_code/docs/standard/datetime/snippets/system-text-json-support/csharp/reading-with-utf8jsonreader-error/Program.cs.md)

## Serialize DateOnly and TimeOnly properties

Starting in .NET 7, `System.Text.Json` supports serializing and deserializing [System.DateOnly](https://learn.microsoft.com/search/?terms=System.DateOnly) and [System.TimeOnly](https://learn.microsoft.com/search/?terms=System.TimeOnly) types. Consider the following object:

<!-- This section is somewhat duplicated in how-to-use-dateonly-timeonly.md section 'Serialize DateOnly and TimeOnly types' -->

[source="snippets/how-to-use-dateonly-timeonly/csharp/Program.cs" id="appointment"::: (complete source file; reference: snippets/how-to-use-dateonly-timeonly/csharp/Program.cs)](../../../_code/docs/standard/datetime/snippets/how-to-use-dateonly-timeonly/csharp/Program.cs.md)

The following example serializes an `Appointment` object, displays the resulting JSON, and then deserializes it back into a new instance of the `Appointment` type. Finally, the original and newly deserialized instances are compared for equality and the results are written to the console:

[source="snippets/how-to-use-dateonly-timeonly/csharp/Program.cs" id="serialization"::: (complete source file; reference: snippets/how-to-use-dateonly-timeonly/csharp/Program.cs)](../../../_code/docs/standard/datetime/snippets/how-to-use-dateonly-timeonly/csharp/Program.cs.md)

In the preceding code:

- An `Appointment` object is instantiated and assigned to the `appointment` variable.
- The `appointment` instance is serialized to JSON using [System.Text.Json.JsonSerializer.Serialize*](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializer.Serialize*).
- The resulting JSON is written to the console.
- The JSON is deserialized back into a new instance of the `Appointment` type using [System.Text.Json.JsonSerializer.Deserialize*](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializer.Deserialize*).
- The original and newly deserialized instances are compared for equality.
- The result of the comparison is written to the console.

## Custom support for [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) and [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset)

### When using [System.Text.Json.JsonSerializer](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializer)

If you want the serializer to perform custom parsing or formatting, you can implement [custom converters](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonConverter%601). The following sections show a few examples:

- [DateTime(Offset).Parse and DateTime(Offset).ToString](#datetimeoffsetparse-and-datetimeoffsettostring)
- [Utf8Parser and Utf8Formatter](#-and-)
- [Use DateTime(Offset).Parse as a fallback](#use-datetimeoffsetparse-as-a-fallback)
- [Use Unix epoch date format](#use-unix-epoch-date-format)

#### DateTime(Offset).Parse and DateTime(Offset).ToString

If you can't determine the formats of your input [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) or [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) text representations, you can use the `DateTime(Offset).Parse` method in your converter read logic.
This method allows you to use .NET's extensive support for parsing various [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) and [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) text formats, including non-ISO 8601 strings and ISO 8601 formats that don't conform to the extended ISO 8601-1:2019 profile.
This approach is less performant than using the serializer's native implementation.

For serializing, you can use the `DateTime(Offset).ToString` method in your converter write logic.
This method allows you to write [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) and [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) values using any of the [standard date and time formats](../base-types/standard-date-and-time-format-strings.md), and the [custom date and time formats](../base-types/custom-date-and-time-format-strings.md).
This approach is also less performant than using the serializer's native implementation.

[language="csharp" source="snippets/system-text-json-support/csharp/datetime-converter-examples/example1/Program.cs"::: (complete source file; reference: snippets/system-text-json-support/csharp/datetime-converter-examples/example1/Program.cs)](../../../_code/docs/standard/datetime/snippets/system-text-json-support/csharp/datetime-converter-examples/example1/Program.cs.md)

> **Note:**
> When implementing [System.Text.Json.Serialization.JsonConverter`1](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonConverter%601), and `T` is [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime), the `typeToConvert` parameter will always be `typeof(DateTime)`.
The parameter is useful for handling polymorphic cases and when using generics to get `typeof(T)` in a performant way.

#### [System.Buffers.Text.Utf8Parser](https://learn.microsoft.com/search/?terms=System.Buffers.Text.Utf8Parser) and [System.Buffers.Text.Utf8Formatter](https://learn.microsoft.com/search/?terms=System.Buffers.Text.Utf8Formatter)

You can use fast UTF-8-based parsing and formatting methods in your converter logic if your input [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) or [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset)
text representations are compliant with one of the "R", "l", "O", or "G"
 [standard date and time format strings](../base-types/standard-date-and-time-format-strings.md),
or you want to write according to one of these formats. This approach is much faster than using `DateTime(Offset).Parse` and `DateTime(Offset).ToString`.

The following example shows a custom converter that serializes and deserializes [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) values according to
 [the "R" standard format](../base-types/standard-date-and-time-format-strings.md#the-rfc1123-r-r-format-specifier):

[language="csharp" source="snippets/system-text-json-support/csharp/datetime-converter-examples/example2/Program.cs"::: (complete source file; reference: snippets/system-text-json-support/csharp/datetime-converter-examples/example2/Program.cs)](../../../_code/docs/standard/datetime/snippets/system-text-json-support/csharp/datetime-converter-examples/example2/Program.cs.md)

> **Note:**
> The "R" standard format will always be 29 characters long.
>
> The "l" (lowercase "L") format isn't documented with the other [standard date and time format strings](../base-types/standard-date-and-time-format-strings.md) because it's supported only by the `Utf8Parser` and `Utf8Formatter` types. The format is lowercase RFC 1123 (a lowercase version of the "R" format). For example, "thu, 25 jul 2019 06:36:07 gmt".

#### Use DateTime(Offset).Parse as a fallback

If you generally expect your input [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) or [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) data to conform to the extended ISO 8601-1:2019 profile,
you can use the serializer's native parsing logic. You can also implement a fallback mechanism.
The following example shows that, after failing to parse a [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) text representation using [System.Text.Json.Utf8JsonReader.TryGetDateTime(System.DateTime@)](https://learn.microsoft.com/search/?terms=System.Text.Json.Utf8JsonReader.TryGetDateTime(System.DateTime%40)),
the converter successfully parses the data using [System.DateTime.Parse(System.String)](https://learn.microsoft.com/search/?terms=System.DateTime.Parse(System.String)):

[language="csharp" source="snippets/system-text-json-support/csharp/datetime-converter-examples/example3/Program.cs"::: (complete source file; reference: snippets/system-text-json-support/csharp/datetime-converter-examples/example3/Program.cs)](../../../_code/docs/standard/datetime/snippets/system-text-json-support/csharp/datetime-converter-examples/example3/Program.cs.md)

#### Use Unix epoch date format

The following converters handle Unix epoch format with or without a time zone offset (values such as `/Date(1590863400000-0700)/` or `/Date(1590863400000)/`):

[language="csharp" source="../serialization/system-text-json/snippets/how-to-contd/csharp/CustomConverterUnixEpochDate.cs" id="ConverterOnly"::: (complete source file; reference: ../serialization/system-text-json/snippets/how-to-contd/csharp/CustomConverterUnixEpochDate.cs)](../../../_code/docs/standard/serialization/system-text-json/snippets/how-to-contd/csharp/CustomConverterUnixEpochDate.cs.md)

[language="csharp" source="../serialization/system-text-json/snippets/how-to-contd/csharp/CustomConverterUnixEpochDateNoZone.cs" id="ConverterOnly"::: (complete source file; reference: ../serialization/system-text-json/snippets/how-to-contd/csharp/CustomConverterUnixEpochDateNoZone.cs)](../../../_code/docs/standard/serialization/system-text-json/snippets/how-to-contd/csharp/CustomConverterUnixEpochDateNoZone.cs.md)

### When using [System.Text.Json.Utf8JsonWriter](https://learn.microsoft.com/search/?terms=System.Text.Json.Utf8JsonWriter)

If you want to write a custom [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) or [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) text representation with [System.Text.Json.Utf8JsonWriter](https://learn.microsoft.com/search/?terms=System.Text.Json.Utf8JsonWriter),
you can format your custom representation to a [System.String](https://learn.microsoft.com/search/?terms=System.String), `ReadOnlySpan<Byte>`, `ReadOnlySpan<Char>`, or [System.Text.Json.JsonEncodedText](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonEncodedText),
then pass it to the corresponding [System.Text.Json.Utf8JsonWriter.WriteStringValue*](https://learn.microsoft.com/search/?terms=System.Text.Json.Utf8JsonWriter.WriteStringValue*)
or [System.Text.Json.Utf8JsonWriter.WriteString*](https://learn.microsoft.com/search/?terms=System.Text.Json.Utf8JsonWriter.WriteString*) method.

The following example shows how a custom [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) format can be created with [System.DateTime.ToString(System.String,System.IFormatProvider)](https://learn.microsoft.com/search/?terms=System.DateTime.ToString(System.String%2CSystem.IFormatProvider))
and then written with the [System.Text.Json.Utf8JsonWriter.WriteStringValue(System.String)](https://learn.microsoft.com/search/?terms=System.Text.Json.Utf8JsonWriter.WriteStringValue(System.String)) method:

[language="csharp" source="snippets/system-text-json-support/csharp/custom-writing-with-utf8jsonwriter/Program.cs"::: (complete source file; reference: snippets/system-text-json-support/csharp/custom-writing-with-utf8jsonwriter/Program.cs)](../../../_code/docs/standard/datetime/snippets/system-text-json-support/csharp/custom-writing-with-utf8jsonwriter/Program.cs.md)

### When using [System.Text.Json.Utf8JsonReader](https://learn.microsoft.com/search/?terms=System.Text.Json.Utf8JsonReader)

If you want to read a custom [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) or [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) text representation with [System.Text.Json.Utf8JsonReader](https://learn.microsoft.com/search/?terms=System.Text.Json.Utf8JsonReader),
you can get the value of the current JSON token as a [System.String](https://learn.microsoft.com/search/?terms=System.String) using the [System.Text.Json.Utf8JsonReader.GetString](https://learn.microsoft.com/search/?terms=System.Text.Json.Utf8JsonReader.GetString) method, then parse the value using custom logic.

The following example shows how a custom [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) text representation can be retrieved using the [System.Text.Json.Utf8JsonReader.GetString](https://learn.microsoft.com/search/?terms=System.Text.Json.Utf8JsonReader.GetString) method,
then parsed using [System.DateTimeOffset.ParseExact(System.String,System.String,System.IFormatProvider)](https://learn.microsoft.com/search/?terms=System.DateTimeOffset.ParseExact(System.String%2CSystem.String%2CSystem.IFormatProvider)):

[language="csharp" source="snippets/system-text-json-support/csharp/custom-reading-with-utf8jsonreader/Program.cs"::: (complete source file; reference: snippets/system-text-json-support/csharp/custom-reading-with-utf8jsonreader/Program.cs)](../../../_code/docs/standard/datetime/snippets/system-text-json-support/csharp/custom-reading-with-utf8jsonreader/Program.cs.md)

## The extended ISO 8601-1:2019 profile in System.Text.Json

### Date and time components

The extended ISO 8601-1:2019 profile implemented in [System.Text.Json](https://learn.microsoft.com/search/?terms=System.Text.Json) defines the following components for date and time representations. These components are used to define various supported levels of granularity
when parsing and formatting [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) and [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) representations.

| Component | Format | Description |
| --- | --- | --- |
| Year | "yyyy" | 0001-9999 |
| Month | "MM" | 01-12 |
| Day | "dd" | 01-28, 01-29, 01-30, 01-31 based on month/year. |
| Hour | "HH" | 00-23 |
| Minute | "mm" | 00-59 |
| Second | "ss" | 00-59 |
| Second fraction | "FFFFFFF" | Minimum of one digit, maximum of 16 digits. |
| Time offset | "K" | Either "Z" or "('+'/'-')HH':'mm". |
| Partial time | "HH':'mm':'ss[FFFFFFF]" | Time without UTC offset information. |
| Full date | "yyyy'-'MM'-'dd" | Calendar date. |
| Full time | "'Partial time'K" | UTC of day or Local time of day with the time offset between local time and UTC. |
| Date time | "'Full date''T''Full time'" | Calendar date and time of day, for example, 2019-07-26T16:59:57-05:00. |

### Support for parsing

The following levels of granularity are defined for parsing:

1. 'Full date'
    1. "yyyy'-'MM'-'dd"

1. "'Full date''T''Hour'':''Minute'"
    1. "yyyy'-'MM'-'dd'T'HH':'mm"

1. "'Full date''T''Partial time'"
    1. "yyyy'-'MM'-'dd'T'HH':'mm':'ss"
    ([The Sortable ("s") Format Specifier](../base-types/standard-date-and-time-format-strings.md#the-sortable-s-format-specifier))
    1. "yyyy'-'MM'-'dd'T'HH':'mm':'ss'.'FFFFFFF"

1. "'Full date''T''Time hour'':''Minute''Time offset'"
    1. "yyyy'-'MM'-'dd'T'HH':'mmZ"
    1. "yyyy'-'MM'-'dd'T'HH':'mm('+'/'-')HH':'mm"

1. 'Date time'
    1. "yyyy'-'MM'-'dd'T'HH':'mm':'ssZ"
    1. "yyyy'-'MM'-'dd'T'HH':'mm':'ss'.'FFFFFFFZ"
    1. "yyyy'-'MM'-'dd'T'HH':'mm':'ss('+'/'-')HH':'mm"
    1. "yyyy'-'MM'-'dd'T'HH':'mm':'ss'.'FFFFFFF('+'/'-')HH':'mm"

    This level of granularity is compliant with [RFC 3339](https://tools.ietf.org/html/rfc3339#section-5.6), a widely adopted profile of ISO 8601 used for interchanging date and time information. However, there are a few restrictions in the `System.Text.Json` implementation.

    - RFC 3339 doesn't specify a maximum number of fractional-second digits, but specifies that at least one digit must follow the period, if a fractional-second section is present. The implementation in `System.Text.Json` allows up to 16 digits (to support interop with other programming languages and frameworks), but parses only the first seven. A [System.Text.Json.JsonException](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonException) will be thrown if there are more than 16 fractional second digits when reading `DateTime` and `DateTimeOffset` instances.
    - RFC 3339 allows the "T" and "Z" characters to be "t" or "z" respectively, but allows applications to limit support to just the upper-case variants. The implementation in `System.Text.Json` requires them to be "T" and "Z". A [System.Text.Json.JsonException](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonException) will be thrown if input payloads contain "t" or "z" when reading `DateTime` and `DateTimeOffset` instances.
    - RFC 3339 specifies that the date and time sections are separated by "T", but allows applications to separate them by a space (" ") instead. `System.Text.Json` requires date and time sections to be separated with "T". A [System.Text.Json.JsonException](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonException) will be thrown if input payloads contain a space (" ") when reading `DateTime` and `DateTimeOffset` instances.

If there are decimal fractions for seconds, there must be at least one digit. `2019-07-26T00:00:00.` isn't allowed.
While up to 16 fractional digits are allowed, only the first seven are parsed. Anything beyond that is considered a zero.
For example, `2019-07-26T00:00:00.1234567890` will be parsed as if it's `2019-07-26T00:00:00.1234567`.
This approach maintains compatibility with the [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) implementation, which is limited to this resolution.

Leap seconds aren't supported.

### Support for formatting

The following levels of granularity are defined for formatting:

1. "'Full date''T''Partial time'"
    1. "yyyy'-'MM'-'dd'T'HH':'mm':'ss"
        ([The Sortable ("s") Format Specifier](../base-types/standard-date-and-time-format-strings.md#the-sortable-s-format-specifier))

        Used to format a [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) without fractional seconds and without offset information.

    1. "yyyy'-'MM'-'dd'T'HH':'mm':'ss'.'FFFFFFF"

        Used to format a [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) with fractional seconds but without offset information.

1. 'Date time'
    1. "yyyy'-'MM'-'dd'T'HH':'mm':'ssZ"

        Used to format a [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) without fractional seconds but with a UTC offset.

    1. "yyyy'-'MM'-'dd'T'HH':'mm':'ss'.'FFFFFFFZ"

        Used to format a [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) with fractional seconds and with a UTC offset.

    1. "yyyy'-'MM'-'dd'T'HH':'mm':'ss('+'/'-')HH':'mm"

        Used to format a [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) or [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) without fractional seconds but with a local offset.

    1. "yyyy'-'MM'-'dd'T'HH':'mm':'ss'.'FFFFFFF('+'/'-')HH':'mm"

        Used to format a [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) or [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) with fractional seconds and with a local offset.

    This level of granularity is compliant with [RFC 3339](https://tools.ietf.org/html/rfc3339#section-5.6).

If the [round-trip format](../base-types/standard-date-and-time-format-strings.md#the-round-trip-o-o-format-specifier) representation of a
[System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) or [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) instance has trailing zeros in its fractional seconds, then [System.Text.Json.JsonSerializer](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializer)
and [System.Text.Json.Utf8JsonWriter](https://learn.microsoft.com/search/?terms=System.Text.Json.Utf8JsonWriter) will format a representation of the instance without trailing zeros.
For example, a [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) instance whose [round-trip format](../base-types/standard-date-and-time-format-strings.md#the-round-trip-o-o-format-specifier)
representation is `2019-04-24T14:50:17.1010000Z`, will be formatted as `2019-04-24T14:50:17.101Z` by [System.Text.Json.JsonSerializer](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializer)
and [System.Text.Json.Utf8JsonWriter](https://learn.microsoft.com/search/?terms=System.Text.Json.Utf8JsonWriter).

If the [round-trip format](../base-types/standard-date-and-time-format-strings.md#the-round-trip-o-o-format-specifier) representation of a
[System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) or [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) instance has all zeros in its fractional seconds, then [System.Text.Json.JsonSerializer](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializer)
and [System.Text.Json.Utf8JsonWriter](https://learn.microsoft.com/search/?terms=System.Text.Json.Utf8JsonWriter) will format a representation of the instance without fractional seconds.
For example, a [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) instance whose [round-trip format](../base-types/standard-date-and-time-format-strings.md#the-round-trip-o-o-format-specifier)
representation is `2019-04-24T14:50:17.0000000+02:00`, will be formatted as `2019-04-24T14:50:17+02:00` by [System.Text.Json.JsonSerializer](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializer)
and [System.Text.Json.Utf8JsonWriter](https://learn.microsoft.com/search/?terms=System.Text.Json.Utf8JsonWriter).

Truncating zeros in fractional-second digits allows the smallest output needed to preserve information on a round trip to be written.

A maximum of seven fractional-second digits are written. This maximum aligns with the [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) implementation, which is limited to this resolution.
