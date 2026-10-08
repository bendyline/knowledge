---
title: How to ignore properties with System.Text.Json
description: "Learn how to ignore properties when serializing with System.Text.Json in .NET."
ms.date: 08/18/2026
ms.custom: devdivchpfy22
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

# How to ignore properties with System.Text.Json

When serializing C# objects to JavaScript Object Notation (JSON), by default, all public properties are serialized. If you don't want some of them to appear in the resulting JSON, you have several options. In this article, you learn how to ignore properties based on various criteria:

* [Individual properties](#ignore-individual-properties)
* [Properties based on a type-level condition](#ignore-properties-based-on-a-type-level-condition)
* [All read-only properties](#ignore-all-read-only-properties)
* [All null-value properties](#ignore-all-null-value-properties)
* [All default-value properties](#ignore-all-default-value-properties)

## Ignore individual properties

To ignore individual properties, use the [\[JsonIgnore\]](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonIgnoreAttribute) attribute.

The following example shows a type to serialize. It also shows the JSON output:

[language="csharp" source="snippets/how-to/csharp/WeatherForecast.cs" id="WFWithIgnoreAttribute"::: (complete source file; reference: snippets/how-to/csharp/WeatherForecast.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to/csharp/WeatherForecast.cs.md)
[language="vb" source="snippets/how-to/vb/WeatherForecast.vb" id="WFWithIgnoreAttribute"::: (complete source file; reference: snippets/how-to/vb/WeatherForecast.vb)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to/vb/WeatherForecast.vb.md)

```json
{
  "Date": "2019-08-01T00:00:00-07:00",
  "TemperatureCelsius": 25,
}
```

You can specify conditional exclusion by setting the [\[JsonIgnore\]](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonIgnoreAttribute) attribute's `Condition` property. The [System.Text.Json.Serialization.JsonIgnoreCondition](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonIgnoreCondition) enum provides the following options:

* `Always` - The property is always ignored. If no `Condition` is specified, this option is assumed.
* `Never` - The property is always serialized and deserialized, regardless of the `DefaultIgnoreCondition`, `IgnoreReadOnlyProperties`, and `IgnoreReadOnlyFields` global settings.
* `WhenWritingDefault` - The property is ignored on serialization if it's a reference type `null`, a nullable value type `null`, or a value type `default`.
* `WhenWritingNull` - The property is ignored on serialization if it's a reference type `null`, or a nullable value type `null`.

The following example illustrates the use of the [\[JsonIgnore\]](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonIgnoreAttribute) attribute's `Condition` property:

[language="csharp" source="snippets/how-to-contd/csharp/JsonIgnoreAttributeExample.cs" highlight="8,11,14"::: (complete source file; reference: snippets/how-to-contd/csharp/JsonIgnoreAttributeExample.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to-contd/csharp/JsonIgnoreAttributeExample.cs.md)
[language="vb" source="snippets/how-to-contd/vb/JsonIgnoreAttributeExample.vb" ::: (complete source file; reference: snippets/how-to-contd/vb/JsonIgnoreAttributeExample.vb)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to-contd/vb/JsonIgnoreAttributeExample.vb.md)

## Ignore properties based on a type-level condition

Starting in .NET 11, apply `[JsonIgnore(Condition = ...)]` to a class, struct, or interface to set the default ignore condition for its properties and fields:

```csharp
[JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
public class Forecast
{
    public string? Summary { get; set; }
}
```

```vb
<JsonIgnore(Condition:=JsonIgnoreCondition.WhenWritingNull)>
Public Class Forecast
    Public Property Summary As String
End Class
```

The serializer applies ignore settings in this order, from highest to lowest precedence:

* A member-level [System.Text.Json.Serialization.JsonIgnoreAttribute](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonIgnoreAttribute).
* A type-level [System.Text.Json.Serialization.JsonIgnoreAttribute](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonIgnoreAttribute).
* [System.Text.Json.JsonSerializerOptions.DefaultIgnoreCondition](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions.DefaultIgnoreCondition).

At the type level, [System.Text.Json.Serialization.JsonIgnoreCondition.Always](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonIgnoreCondition.Always) is invalid. Reflection-based serialization throws an [System.InvalidOperationException](https://learn.microsoft.com/search/?terms=System.InvalidOperationException), and source generation reports [SYSLIB1226](../../../fundamentals/syslib-diagnostics/syslib1220-1229.md). Because `Always` is the default condition, specify `Condition` when you apply `[JsonIgnore]` to a type.

A type-level [System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull) condition doesn't ignore non-nullable value-type members. The type-level condition still overrides the global `DefaultIgnoreCondition`, so those members remain in the JSON even when the global condition is `WhenWritingDefault`.

## Ignore all read-only properties

A property is read-only if it contains a public getter but not a public setter. To ignore all read-only properties when serializing, set the [System.Text.Json.JsonSerializerOptions.IgnoreReadOnlyProperties](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions.IgnoreReadOnlyProperties) to `true`, as shown in the following example:

[language="csharp" source="snippets/how-to/csharp/SerializeExcludeReadOnlyProperties.cs" id="Serialize"::: (complete source file; reference: snippets/how-to/csharp/SerializeExcludeReadOnlyProperties.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to/csharp/SerializeExcludeReadOnlyProperties.cs.md)
[language="vb" source="snippets/how-to/vb/SerializeExcludeReadOnlyProperties.vb" id="Serialize"::: (complete source file; reference: snippets/how-to/vb/SerializeExcludeReadOnlyProperties.vb)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to/vb/SerializeExcludeReadOnlyProperties.vb.md)

The following example shows a type to serialize. It also shows the JSON output:

[language="csharp" source="snippets/how-to/csharp/WeatherForecast.cs" id="WFWithROProperty"::: (complete source file; reference: snippets/how-to/csharp/WeatherForecast.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to/csharp/WeatherForecast.cs.md)
[language="vb" source="snippets/how-to/vb/WeatherForecast.vb" id="WFWithROProperty"::: (complete source file; reference: snippets/how-to/vb/WeatherForecast.vb)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to/vb/WeatherForecast.vb.md)

```json
{
  "Date": "2019-08-01T00:00:00-07:00",
  "TemperatureCelsius": 25,
  "Summary": "Hot",
}
```

This option applies only to properties. To ignore read-only fields when [serializing fields](fields.md), use the [System.Text.Json.JsonSerializerOptions.IgnoreReadOnlyFields*](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions.IgnoreReadOnlyFields*) global setting.

> **Note:**
> Read-only collection-type properties are still serialized even if [System.Text.Json.JsonSerializerOptions.IgnoreReadOnlyProperties](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions.IgnoreReadOnlyProperties) is set to `true`.

## Ignore all null-value properties

To ignore all null-value properties, set the [System.Text.Json.JsonSerializerOptions.DefaultIgnoreCondition](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions.DefaultIgnoreCondition) property to [System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull), as shown in the following example:

[language="csharp" source="snippets/how-to-contd/csharp/IgnoreNullOnSerialize.cs" highlight="26"::: (complete source file; reference: snippets/how-to-contd/csharp/IgnoreNullOnSerialize.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to-contd/csharp/IgnoreNullOnSerialize.cs.md)
[language="vb" source="snippets/how-to-contd/vb/IgnoreNullOnSerialize.vb" ::: (complete source file; reference: snippets/how-to-contd/vb/IgnoreNullOnSerialize.vb)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to-contd/vb/IgnoreNullOnSerialize.vb.md)

## Ignore all default-value properties

To prevent serialization of default values in value type properties, set the [System.Text.Json.JsonSerializerOptions.DefaultIgnoreCondition](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions.DefaultIgnoreCondition) property to [System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingDefault](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingDefault), as shown in the following example:

[language="csharp" source="snippets/how-to-contd/csharp/IgnoreValueDefaultOnSerialize.cs" highlight="26"::: (complete source file; reference: snippets/how-to-contd/csharp/IgnoreValueDefaultOnSerialize.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to-contd/csharp/IgnoreValueDefaultOnSerialize.cs.md)
[language="vb" source="snippets/how-to-contd/vb/IgnoreValueDefaultOnSerialize.vb"::: (complete source file; reference: snippets/how-to-contd/vb/IgnoreValueDefaultOnSerialize.vb)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to-contd/vb/IgnoreValueDefaultOnSerialize.vb.md)

The [System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingDefault](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingDefault) setting also prevents serialization of null-value reference type and nullable value type properties.

## See also

* [System.Text.Json overview](overview.md)
* [How to serialize and deserialize JSON](how-to.md)
