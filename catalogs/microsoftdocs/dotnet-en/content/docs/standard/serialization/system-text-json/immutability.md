---
title: Use immutable types and properties
description: "Learn how to deserialize JSON to immutable types and properties in .NET."
ms.date: 08/18/2026
ai-usage: ai-assisted
no-loc: [System.Text.Json, Newtonsoft.Json]
dev_langs:
  - "csharp"
  - "vb"
ms.topic: how-to
---

# Use immutable types and properties

An immutable *type* is one that prevents you from changing any property or field values of an object after it's instantiated. The type might be a record, have no public properties or fields, have read-only properties, or have properties with private or init-only setters. [System.String](https://learn.microsoft.com/search/?terms=System.String) is an example of an immutable type. [System.Text.Json](https://learn.microsoft.com/search/?terms=System.Text.Json) provides different ways that you can deserialize JSON to immutable types.

## Parameterized constructors

By default, `System.Text.Json` uses the default public parameterless constructor. However, you can tell it to use a parameterized constructor, which makes it possible to deserialize an immutable class or struct.

- For a class, if the only constructor is a parameterized one, that constructor will be used.
- For a struct, or a class with multiple constructors, specify the one to use by applying the [\[JsonConstructor\]](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonConstructorAttribute) attribute. When the attribute is not used, a public parameterless constructor is always used if present.

  The following example uses the `[JsonConstructor]` attribute:

  [language="csharp" source="snippets/how-to-contd/csharp/ImmutableTypes.cs" highlight="12"::: (complete source file; reference: snippets/how-to-contd/csharp/ImmutableTypes.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to-contd/csharp/ImmutableTypes.cs.md)
  [language="vb" source="snippets/how-to-contd/vb/ImmutableTypes.vb" ::: (complete source file; reference: snippets/how-to-contd/vb/ImmutableTypes.vb)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to-contd/vb/ImmutableTypes.vb.md)

  In .NET 7 and earlier versions, the `[JsonConstructor]` attribute can only be used with public constructors.

In .NET 8 and later versions, reflection mode supports non-public constructors marked with `[JsonConstructor]`. Starting in .NET 11, source-generation mode supports them too.

The parameter names of a parameterized constructor must match the property names and types. Matching is case-insensitive, and the constructor parameter must match the actual property name even if you use [\[JsonPropertyName\]](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonPropertyNameAttribute) to rename a property. In the following example, the name for the `TemperatureC` property is changed to `celsius` in the JSON, but the constructor parameter is still named `temperatureC`:

[language="csharp" source="snippets/how-to-contd/csharp/ImmutableTypesCtorParms.cs" highlight="9,13-15"::: (complete source file; reference: snippets/how-to-contd/csharp/ImmutableTypesCtorParms.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to-contd/csharp/ImmutableTypesCtorParms.cs.md)

Besides `[JsonPropertyName]`, the following attributes support deserialization with parameterized constructors:

- [\[JsonConverter\]](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonConverterAttribute)
- [\[JsonIgnore\]](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonIgnoreAttribute)
- [\[JsonInclude\]](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonIncludeAttribute)
- [\[JsonNumberHandling\]](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonNumberHandlingAttribute)

## By-reference constructor parameters

Starting in .NET 11, `JsonSerializer` deserializes types whose constructor parameters use the `in`, `ref`, `out`, and `ref readonly` modifiers.

| Parameter modifier | Deserialization behavior |
| --- | --- |
| `in`, `ref`, and `ref readonly` | The serializer binds each parameter by name and uses its underlying element type for type matching. |
| `out` | The serializer doesn't bind the parameter to JSON. It discards the value that the constructor assigns. |

In the following constructor, the serializer binds `temperatureC` from JSON. It doesn't bind `isValid`:

```csharp
public Forecast(in int temperatureC, out bool isValid)
{
    TemperatureC = temperatureC;
    isValid = true;
}
```

In Visual Basic, a `ByRef` constructor parameter follows the `ref` behavior shown in the table:

```vb
Public Sub New(ByRef temperatureC As Integer)
    TemperatureC = temperatureC
End Sub
```

## Records

Records are also supported for both serialization and deserialization, as shown in the following example:

[language="csharp" source="snippets/how-to-contd/csharp/Records.cs"::: (complete source file; reference: snippets/how-to-contd/csharp/Records.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to-contd/csharp/Records.cs.md)

You can apply any of the attributes to the property names, using the `property:` target on the attribute. For more information on positional records, see the article on [records](../../../csharp/language-reference/builtin-types/record.md#positional-syntax-for-property-and-field-definition) in the C# language reference.

## Non-public members and property accessors

You can enable use of a non-public *accessor* on a property by using the [\[JsonInclude\]](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonIncludeAttribute) attribute, as shown in the following example:

[language="csharp" source="snippets/how-to-contd/csharp/NonPublicAccessors.cs" highlight="10,13"::: (complete source file; reference: snippets/how-to-contd/csharp/NonPublicAccessors.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to-contd/csharp/NonPublicAccessors.cs.md)
[language="vb" source="snippets/how-to-contd/vb/NonPublicAccessors.vb" ::: (complete source file; reference: snippets/how-to-contd/vb/NonPublicAccessors.vb)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to-contd/vb/NonPublicAccessors.vb.md)

By including a property with a private setter, you can still deserialize that property.

In .NET 8 and later versions, you can also use the [\[JsonInclude\]](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonIncludeAttribute) attribute to opt non-public *members* into the serialization contract for a given type.

Starting in .NET 11, source generation supports `private`, `internal`, and `protected` members that you mark with `[JsonInclude]`. It also supports `private`, `internal`, and `protected` accessors on properties that you mark with `[JsonInclude]`. Source generation also supports inaccessible constructors marked with [\[JsonConstructor\]](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonConstructorAttribute).

> **Note:**
> In .NET 10 and earlier versions, source generation doesn't support `private` or `protected` members or accessors. Applying the [\[JsonInclude\]](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonIncludeAttribute) attribute to the member or property doesn't remove this limitation. Source generation supports `internal` members and accessors only when they're in the same assembly as the generated [System.Text.Json.Serialization.JsonSerializerContext](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonSerializerContext). It doesn't support inaccessible constructors, even when you mark them with `[JsonConstructor]`.

## Init-only properties

`System.Text.Json` deserializes `init`-only properties like any other settable property. Starting in .NET 11, a source-generated setter runs only when the JSON payload contains the property. An omitted property retains its initializer value.

## Read-only properties

In .NET 8 and later versions, read-only properties, or those that have no setter either private or public, can also be deserialized. While you can't change the instance that the property references, if the type of the property is mutable, you can modify it. For example, you can add an element to a list. To deserialize a read-only property, you need to set its object creation handling behavior to *populate* instead of *replace*. For example, you can annotate the property with the [System.Text.Json.Serialization.JsonObjectCreationHandlingAttribute](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonObjectCreationHandlingAttribute) attribute.

  ```csharp
  class A
  {
      [JsonObjectCreationHandling(JsonObjectCreationHandling.Populate)]
      public List<int> Numbers1 { get; } = new List<int>() { 1, 2, 3 };
  }
  ```

For more information, see [Populate initialized properties](populate-properties.md).

## See also

- [System.Text.Json overview](overview.md)
- [How to serialize and deserialize JSON](how-to.md)
