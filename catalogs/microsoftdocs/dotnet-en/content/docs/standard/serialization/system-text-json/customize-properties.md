---
title: How to customize property names and values with System.Text.Json
description: "Learn how to customize property names and values when serializing with System.Text.Json in .NET."
ms.date: 08/18/2026
no-loc: [System.Text.Json, Newtonsoft.Json]
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "JSON serialization"
  - "serializing objects"
  - "serialization"
  - "objects, serializing"
ms.topic: how-to
ai-usage: ai-assisted
---

# How to customize property names and values with System.Text.Json

By default, property names and dictionary keys are unchanged in the JSON output, including case. Enum values are represented as numbers. And properties are serialized in the order they're defined. However, you can customize these behaviors by:

- Specifying specific serialized property and enum member names.
- Using a built-in [naming policy](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonNamingPolicy), such as camelCase, PascalCase, snake_case, or kebab-case, for property names and dictionary keys.
- Applying a naming policy to a type or member.
- Using a custom naming policy for property names and dictionary keys.
- Serializing enum values as strings, with or without a naming policy.
- Configuring the order of serialized properties.

> **Note:**
> The [web default](configure-options.md#web-defaults-for-jsonserializeroptions) naming policy is camel case.

For other scenarios that require special handling of JSON property names and values, you can [implement custom converters](converters-how-to.md).

## Customize individual property names

To set the name of individual properties, use the [\[JsonPropertyName\]](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonPropertyNameAttribute) attribute.

Here's an example type to serialize and resulting JSON:

[language="csharp" source="snippets/how-to/csharp/WeatherForecast.cs" id="WFWithPropertyNameAttribute"::: (complete source file; reference: snippets/how-to/csharp/WeatherForecast.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to/csharp/WeatherForecast.cs.md)
[language="vb" source="snippets/how-to/vb/WeatherForecast.vb" id="WFWithPropertyNameAttribute"::: (complete source file; reference: snippets/how-to/vb/WeatherForecast.vb)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to/vb/WeatherForecast.vb.md)

```json
{
  "Date": "2019-08-01T00:00:00-07:00",
  "TemperatureCelsius": 25,
  "Summary": "Hot",
  "Wind": 35
}
```

The property name set by this attribute:

- Applies in both directions, for serialization and deserialization.
- Takes precedence over property naming policies.
- [Doesn't affect parameter name matching for parameterized constructors](immutability.md#parameterized-constructors).

## Use a built-in naming policy

The following table shows the built-in naming policies and how they affect property names.

| Naming policy | Description | Original property name | Converted property name |
| --- | --- | --- | --- |
| [System.Text.Json.JsonNamingPolicy.CamelCase](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonNamingPolicy.CamelCase) | First word starts with a lower case character.<br/>Successive words start with an uppercase character. | `TempCelsius` | `tempCelsius` |
| [System.Text.Json.JsonNamingPolicy.PascalCase](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonNamingPolicy.PascalCase)\*\* | First word starts with an uppercase character.<br/>Successive words start with an uppercase character. | `tempCelsius` | `TempCelsius` |
| [System.Text.Json.JsonNamingPolicy.KebabCaseLower](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonNamingPolicy.KebabCaseLower)\* | Words are separated by hyphens.<br/>All characters are lowercase. | `TempCelsius` | `temp-celsius` |
| [System.Text.Json.JsonNamingPolicy.KebabCaseUpper](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonNamingPolicy.KebabCaseUpper)\* | Words are separated by hyphens.<br/>All characters are uppercase. | `TempCelsius` | `TEMP-CELSIUS` |
| [System.Text.Json.JsonNamingPolicy.SnakeCaseLower](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonNamingPolicy.SnakeCaseLower)\* | Words are separated by underscores.<br/>All characters are lowercase. | `TempCelsius` | `temp_celsius` |
| [System.Text.Json.JsonNamingPolicy.SnakeCaseUpper](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonNamingPolicy.SnakeCaseUpper)\* | Words are separated by underscores.<br/>All characters are uppercase. | `TempCelsius` | `TEMP_CELSIUS` |

\* Available in .NET 8 and later versions.

\*\* Available in .NET 11 and later versions.

The following example shows how to use camel case for all JSON property names by setting [System.Text.Json.JsonSerializerOptions.PropertyNamingPolicy](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions.PropertyNamingPolicy) to [System.Text.Json.JsonNamingPolicy.CamelCase](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonNamingPolicy.CamelCase):

[language="csharp" source="snippets/how-to/csharp/RoundTripCamelCasePropertyNames.cs" id="Serialize"::: (complete source file; reference: snippets/how-to/csharp/RoundTripCamelCasePropertyNames.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to/csharp/RoundtripCamelCasePropertyNames.cs.md)
[language="vb" source="snippets/how-to/vb/RoundTripCamelCasePropertyNames.vb" id="Serialize"::: (complete source file; reference: snippets/how-to/vb/RoundTripCamelCasePropertyNames.vb)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to/vb/RoundtripCamelCasePropertyNames.vb.md)

Here's an example class to serialize and JSON output:

[language="csharp" source="snippets/how-to/csharp/WeatherForecast.cs" id="WFWithPropertyNameAttribute"::: (complete source file; reference: snippets/how-to/csharp/WeatherForecast.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to/csharp/WeatherForecast.cs.md)
[language="vb" source="snippets/how-to/vb/WeatherForecast.vb" id="WFWithPropertyNameAttribute"::: (complete source file; reference: snippets/how-to/vb/WeatherForecast.vb)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to/vb/WeatherForecast.vb.md)

```json
{
  "date": "2019-08-01T00:00:00-07:00",
  "temperatureCelsius": 25,
  "summary": "Hot",
  "Wind": 35
}
```

The naming policy:

- Applies to serialization and deserialization.
- Is overridden by `[JsonPropertyName]` attributes. This is why the JSON property name `Wind` in the example is not camel case.

> **Note:**
> None of the built-in naming policies support letters that are surrogate pairs. For more information, see [dotnet/runtime issue 90352](https://github.com/dotnet/runtime/issues/90352).

## Apply a naming policy to a type or member

Starting in .NET 11, apply [System.Text.Json.Serialization.JsonNamingPolicyAttribute](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonNamingPolicyAttribute) to a class, struct, interface, property, or field. Pass a [System.Text.Json.Serialization.JsonKnownNamingPolicy](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonKnownNamingPolicy) value to select a built-in policy. A type-level attribute sets the naming policy for the type's properties and fields. A member-level attribute sets the policy for one property or field.

The following example sets a type-level policy and overrides it for one property:

```csharp
[JsonNamingPolicy(JsonKnownNamingPolicy.CamelCase)]
public class WeatherForecast
{
    public int TemperatureCelsius { get; set; }
    [JsonNamingPolicy(JsonKnownNamingPolicy.SnakeCaseLower)] public string? SummaryText { get; set; }
}
```

```vb
<JsonNamingPolicy(JsonKnownNamingPolicy.CamelCase)>
Public Class WeatherForecast
    Public Property TemperatureCelsius As Integer
    <JsonNamingPolicy(JsonKnownNamingPolicy.SnakeCaseLower)> Public Property SummaryText As String
End Class
```

For `TemperatureCelsius = 25` and `SummaryText = "Hot"`, the resulting JSON is `{"temperatureCelsius":25,"summary_text":"Hot"}`.

The serializer selects a JSON property name in this order, from highest to lowest precedence:

- A [System.Text.Json.Serialization.JsonPropertyNameAttribute](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonPropertyNameAttribute) on the property or field.
- A member-level [System.Text.Json.Serialization.JsonNamingPolicyAttribute](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonNamingPolicyAttribute).
- A type-level [System.Text.Json.Serialization.JsonNamingPolicyAttribute](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonNamingPolicyAttribute).
- [System.Text.Json.JsonSerializerOptions.PropertyNamingPolicy](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions.PropertyNamingPolicy).
- The original member name.

The protected constructor lets a derived attribute supply a custom [System.Text.Json.JsonNamingPolicy](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonNamingPolicy). Reflection-based serialization evaluates the custom policy at run time.

Source generation can't execute a custom policy at compile time. For affected members, it uses the original CLR name and doesn't apply the global [System.Text.Json.JsonSerializerOptions.PropertyNamingPolicy](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions.PropertyNamingPolicy).

## Use a custom JSON property naming policy

To use a custom JSON property naming policy, create a class that derives from [System.Text.Json.JsonNamingPolicy](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonNamingPolicy) and override the [System.Text.Json.JsonNamingPolicy.ConvertName*](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonNamingPolicy.ConvertName*) method, as shown in the following example:

[language="csharp" source="snippets/how-to/csharp/UpperCaseNamingPolicy.cs"::: (complete source file; reference: snippets/how-to/csharp/UpperCaseNamingPolicy.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to/csharp/UpperCaseNamingPolicy.cs.md)
[language="vb" source="snippets/how-to/vb/UpperCaseNamingPolicy.vb"::: (complete source file; reference: snippets/how-to/vb/UpperCaseNamingPolicy.vb)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to/vb/UpperCaseNamingPolicy.vb.md)

Then set the [System.Text.Json.JsonSerializerOptions.PropertyNamingPolicy](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions.PropertyNamingPolicy) property to an instance of your naming policy class:

[language="csharp" source="snippets/how-to/csharp/RoundtripPropertyNamingPolicy.cs" id="Serialize"::: (complete source file; reference: snippets/how-to/csharp/RoundtripPropertyNamingPolicy.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to/csharp/RoundtripPropertyNamingPolicy.cs.md)
[language="vb" source="snippets/how-to/vb/RoundtripPropertyNamingPolicy.vb" id="Serialize"::: (complete source file; reference: snippets/how-to/vb/RoundtripPropertyNamingPolicy.vb)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to/vb/RoundtripPropertyNamingPolicy.vb.md)

Here's an example class to serialize and JSON output:

[language="csharp" source="snippets/how-to/csharp/WeatherForecast.cs" id="WFWithPropertyNameAttribute"::: (complete source file; reference: snippets/how-to/csharp/WeatherForecast.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to/csharp/WeatherForecast.cs.md)
[language="vb" source="snippets/how-to/vb/WeatherForecast.vb" id="WFWithPropertyNameAttribute"::: (complete source file; reference: snippets/how-to/vb/WeatherForecast.vb)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to/vb/WeatherForecast.vb.md)

```json
{
  "DATE": "2019-08-01T00:00:00-07:00",
  "TEMPERATURECELSIUS": 25,
  "SUMMARY": "Hot",
  "Wind": 35
}
```

The JSON property naming policy:

- Applies to serialization and deserialization.
- Is overridden by `[JsonPropertyName]` attributes. This is why the JSON property name `Wind` in the example is not upper case.

## Use a naming policy for dictionary keys

If a property of an object to be serialized is of type `Dictionary<string,TValue>`, the `string` keys can be converted using a naming policy, such as camel case. To do that, set [System.Text.Json.JsonSerializerOptions.DictionaryKeyPolicy](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions.DictionaryKeyPolicy) to your desired naming policy. The following example uses the `CamelCase` naming policy:

[language="csharp" source="snippets/how-to/csharp/SerializeCamelCaseDictionaryKeys.cs" id="Serialize"::: (complete source file; reference: snippets/how-to/csharp/SerializeCamelCaseDictionaryKeys.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to/csharp/SerializeCamelCaseDictionaryKeys.cs.md)
[language="vb" source="snippets/how-to/vb/SerializeCamelCaseDictionaryKeys.vb" id="Serialize"::: (complete source file; reference: snippets/how-to/vb/SerializeCamelCaseDictionaryKeys.vb)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to/vb/SerializeCamelCaseDictionaryKeys.vb.md)

Serializing an object with a dictionary named `TemperatureRanges` that has key-value pairs `"ColdMinTemp", 20` and `"HotMinTemp", 40` would result in JSON output like the following example:

```json
{
  "Date": "2019-08-01T00:00:00-07:00",
  "TemperatureCelsius": 25,
  "Summary": "Hot",
  "TemperatureRanges": {
    "coldMinTemp": 20,
    "hotMinTemp": 40
  }
}
```

Naming policies for dictionary keys apply to serialization only. If you deserialize a dictionary, the keys will match the JSON file even if you set [System.Text.Json.JsonSerializerOptions.DictionaryKeyPolicy](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions.DictionaryKeyPolicy) to a non-default naming policy.

## Enums as strings

By default, enums are serialized as numbers. To serialize enum names as strings, use the [System.Text.Json.Serialization.JsonStringEnumConverter](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonStringEnumConverter) or [System.Text.Json.Serialization.JsonStringEnumConverter`1](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonStringEnumConverter%601) converter. Only [System.Text.Json.Serialization.JsonStringEnumConverter`1](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonStringEnumConverter%601) is supported by the Native AOT runtime.

For example, suppose you need to serialize the following class that has an enum:

[language="csharp" source="snippets/how-to/csharp/WeatherForecast.cs" id="WFWithEnum"::: (complete source file; reference: snippets/how-to/csharp/WeatherForecast.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to/csharp/WeatherForecast.cs.md)
[language="vb" source="snippets/how-to/vb/WeatherForecast.vb" id="WFWithEnum"::: (complete source file; reference: snippets/how-to/vb/WeatherForecast.vb)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to/vb/WeatherForecast.vb.md)

If the Summary is `Hot`, by default the serialized JSON has the numeric value 3:

```json
{
  "Date": "2019-08-01T00:00:00-07:00",
  "TemperatureCelsius": 25,
  "Summary": 3
}
```

The following sample code serializes the enum names instead of the numeric values, and converts the names to camel case:

[language="csharp" source="snippets/how-to/csharp/RoundtripEnumAsString.cs" id="Serialize"::: (complete source file; reference: snippets/how-to/csharp/RoundtripEnumAsString.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to/csharp/RoundtripEnumAsString.cs.md)
[language="vb" source="snippets/how-to/vb/RoundtripEnumAsString.vb" id="Serialize"::: (complete source file; reference: snippets/how-to/vb/RoundtripEnumAsString.vb)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to/vb/RoundtripEnumAsString.vb.md)

The resulting JSON looks like the following example:

```json
{
  "Date": "2019-08-01T00:00:00-07:00",
  "TemperatureCelsius": 25,
  "Summary": "hot"
}
```

The built-in [System.Text.Json.Serialization.JsonStringEnumConverter](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonStringEnumConverter) can deserialize string values as well. It works with or without a specified naming policy. The following example shows deserialization using `CamelCase`:

[language="csharp" source="snippets/how-to/csharp/RoundtripEnumAsString.cs" id="Deserialize"::: (complete source file; reference: snippets/how-to/csharp/RoundtripEnumAsString.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to/csharp/RoundtripEnumAsString.cs.md)
[language="vb" source="snippets/how-to/vb/RoundtripEnumAsString.vb" id="Deserialize"::: (complete source file; reference: snippets/how-to/vb/RoundtripEnumAsString.vb)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to/vb/RoundtripEnumAsString.vb.md)

### JsonConverterAttribute

You can also specify the converter to use by annotating your enum with [System.Text.Json.Serialization.JsonConverterAttribute](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonConverterAttribute). The following example shows how to specify the [System.Text.Json.Serialization.JsonStringEnumConverter`1](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonStringEnumConverter%601) (available in .NET 8 and later versions) by using the [System.Text.Json.Serialization.JsonConverterAttribute](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonConverterAttribute) attribute. For example, suppose you need to serialize the following class that has an enum:

[language="csharp" source="snippets/how-to/csharp/WeatherForecast.cs" id="WFWithConverterEnum"::: (complete source file; reference: snippets/how-to/csharp/WeatherForecast.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to/csharp/WeatherForecast.cs.md)

The following sample code serializes the enum names instead of the numeric values:

[language="csharp" source="snippets/how-to/csharp/RoundtripEnumUsingConverterAttribute.cs" id="Serialize"::: (complete source file; reference: snippets/how-to/csharp/RoundtripEnumUsingConverterAttribute.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to/csharp/RoundtripEnumUsingConverterAttribute.cs.md)

The resulting JSON looks like this:

```json
{
  "Date": "2019-08-01T00:00:00-07:00",
  "TemperatureCelsius": 25,
  "Precipitation": "Sleet"
}
```

### Custom enum member names

Starting in .NET 9, you can customize the names of individual enum members for types that are serialized as strings. To customize an enum member name, annotate it with the [JsonStringEnumMemberName attribute](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonStringEnumMemberNameAttribute).

For example, suppose you need to serialize the following class that has an enum with a custom member name:

[language="csharp" source="snippets/how-to/csharp/WeatherForecast.cs" id="WFWithEnumCustomName"::: (complete source file; reference: snippets/how-to/csharp/WeatherForecast.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to/csharp/WeatherForecast.cs.md)

The following sample code serializes the enum names instead of the numeric values:

[language="csharp" source="snippets/how-to/csharp/SerializeEnumCustomName.cs" id="Serialize"::: (complete source file; reference: snippets/how-to/csharp/SerializeEnumCustomName.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to/csharp/SerializeEnumCustomName.cs.md)

The resulting JSON looks like this:

```json
{
  "Date": "2019-08-01T00:00:00-07:00",
  "TemperatureCelsius": 25,
  "Sky": "Partly cloudy"
}
```

### Source generation

To use the converter with source generation, see [Serialize enum fields as strings](source-generation.md#serialize-enum-fields-as-strings).

## Configure the order of serialized properties

By default, properties are serialized in the order in which they're defined in their class. The [`[JsonPropertyOrder]`](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonPropertyOrderAttribute) attribute lets you specify the order of properties in the JSON output from serialization. The default value of the `Order` property is zero. Set `Order` to a positive number to position a property after those that have the default value. A negative `Order` positions a property before those that have the default value. Properties are written in order from the lowest `Order` value to the highest. Here's an example:

[language="csharp" source="snippets/how-to-6-0/csharp/PropertyOrder.cs"::: (complete source file; reference: snippets/how-to-6-0/csharp/PropertyOrder.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to-6-0/csharp/PropertyOrder.cs.md)

## See also

- [System.Text.Json overview](overview.md)
- [How to serialize and deserialize JSON](how-to.md)
