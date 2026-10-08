---
title: How to use source generation in System.Text.Json
description: "Learn how to use source generation in System.Text.Json."
ms.date: 11/13/2025
no-loc: [System.Text.Json]
dev_langs:
  - "csharp"
helpviewer_keywords:
  - "JSON serialization"
  - "serializing objects"
  - "serialization"
  - "objects, serializing"
ms.topic: how-to
---

# How to use source generation in System.Text.Json

This article shows you how to use source-generation-backed System.Text.Json serialization in your apps.

For information about the different source-generation modes, see [Source-generation modes](source-generation-modes.md).

## Use source-generation defaults

To use source generation with all defaults (both modes, default options):

1. Create a partial class that derives from [System.Text.Json.Serialization.JsonSerializerContext](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonSerializerContext).
1. Specify the type to serialize or deserialize by applying [System.Text.Json.Serialization.JsonSerializableAttribute](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonSerializableAttribute) to the context class.
1. Call a [System.Text.Json.JsonSerializer](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializer) method that either:

   - Takes a [System.Text.Json.Serialization.Metadata.JsonTypeInfo`1](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.Metadata.JsonTypeInfo%601) instance, or
   - Takes a [System.Text.Json.Serialization.JsonSerializerContext](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonSerializerContext) instance, or
   - Takes a [System.Text.Json.JsonSerializerOptions](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions) instance and you've set its [System.Text.Json.JsonSerializerOptions.TypeInfoResolver](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions.TypeInfoResolver) property to the `Default` property of the context type.

By default, both source generation modes (*metadata-based* and *serialization optimization*) are used if you don't specify one. For information about how to specify the mode to use, see [Specify source generation mode](#specify-source-generation-mode) later in this article.

Here's the type that's used in the following examples:

[language="csharp" source="snippets/source-generation/csharp/BothModesNoOptions.cs" id="WF"::: (complete source file; reference: snippets/source-generation/csharp/BothModesNoOptions.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/source-generation/csharp/BothModesNoOptions.cs.md)

Here's the context class configured to generate source for the preceding `WeatherForecast` class:

[language="csharp" source="snippets/source-generation/csharp/BothModesNoOptions.cs" id="DefineContext"::: (complete source file; reference: snippets/source-generation/csharp/BothModesNoOptions.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/source-generation/csharp/BothModesNoOptions.cs.md)

The types of `WeatherForecast` members don't need to be explicitly specified with `[JsonSerializable]` attributes. Members declared as `object` are an exception to this rule. The runtime type for a member declared as `object` needs to be specified. For example, suppose you have the following class:

[language="csharp" source="snippets/source-generation/csharp/ObjectProperties.cs" id="WF"::: (complete source file; reference: snippets/source-generation/csharp/ObjectProperties.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/source-generation/csharp/ObjectProperties.cs.md)

And you know that at runtime it might have `boolean` and `int` objects:

[language="csharp" source="snippets/source-generation/csharp/ObjectProperties.cs" id="WFInit"::: (complete source file; reference: snippets/source-generation/csharp/ObjectProperties.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/source-generation/csharp/ObjectProperties.cs.md)

Then `boolean` and `int` have to be declared as `[JsonSerializable]`:

[language="csharp" source="snippets/source-generation/csharp/ObjectProperties.cs" id="JsonSerializable"::: (complete source file; reference: snippets/source-generation/csharp/ObjectProperties.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/source-generation/csharp/ObjectProperties.cs.md)

To specify source generation for a collection, use `[JsonSerializable]` with the collection type. For example: `[JsonSerializable(typeof(List<WeatherForecast>))]`.

### `JsonSerializer` methods that use source generation

In the following examples, the static `Default` property of the context type provides an instance of the context type with default options. The context instance provides a `WeatherForecast` property that returns a `JsonTypeInfo<WeatherForecast>` instance. You can specify a different name for this property by using the [System.Text.Json.Serialization.JsonSerializableAttribute.TypeInfoPropertyName](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonSerializableAttribute.TypeInfoPropertyName) property of the `[JsonSerializable]` attribute.

#### Serialization examples

Using [System.Text.Json.Serialization.Metadata.JsonTypeInfo`1](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.Metadata.JsonTypeInfo%601):

[language="csharp" source="snippets/source-generation/csharp/BothModesNoOptions.cs" id="SerializeWithTypeInfo"::: (complete source file; reference: snippets/source-generation/csharp/BothModesNoOptions.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/source-generation/csharp/BothModesNoOptions.cs.md)

Using [System.Text.Json.Serialization.JsonSerializerContext](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonSerializerContext):

[language="csharp" source="snippets/source-generation/csharp/BothModesNoOptions.cs" id="SerializeWithContext"::: (complete source file; reference: snippets/source-generation/csharp/BothModesNoOptions.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/source-generation/csharp/BothModesNoOptions.cs.md)

Using [System.Text.Json.JsonSerializerOptions](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions):

[language="csharp" source="snippets/source-generation/csharp/BothModesNoOptions.cs" id="SerializeWithOptions"::: (complete source file; reference: snippets/source-generation/csharp/BothModesNoOptions.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/source-generation/csharp/BothModesNoOptions.cs.md)

#### Deserialization examples

Using [System.Text.Json.Serialization.Metadata.JsonTypeInfo`1](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.Metadata.JsonTypeInfo%601):

[language="csharp" source="snippets/source-generation/csharp/BothModesNoOptions.cs" id="DeserializeWithTypeInfo"::: (complete source file; reference: snippets/source-generation/csharp/BothModesNoOptions.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/source-generation/csharp/BothModesNoOptions.cs.md)

Using [System.Text.Json.Serialization.JsonSerializerContext](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonSerializerContext):

[language="csharp" source="snippets/source-generation/csharp/BothModesNoOptions.cs" id="DeserializeWithContext"::: (complete source file; reference: snippets/source-generation/csharp/BothModesNoOptions.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/source-generation/csharp/BothModesNoOptions.cs.md)

Using [System.Text.Json.JsonSerializerOptions](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions):

[language="csharp" source="snippets/source-generation/csharp/BothModesNoOptions.cs" id="DeserializeWithOptions"::: (complete source file; reference: snippets/source-generation/csharp/BothModesNoOptions.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/source-generation/csharp/BothModesNoOptions.cs.md)

### Complete program example

Here are the preceding examples in a complete program:

[language="csharp" source="snippets/source-generation/csharp/BothModesNoOptions.cs" id="All"::: (complete source file; reference: snippets/source-generation/csharp/BothModesNoOptions.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/source-generation/csharp/BothModesNoOptions.cs.md)

## Specify source-generation mode

You can specify metadata-based mode or serialization-optimization mode for an entire context, which might include multiple types. Or you can specify the mode for an individual type. If you do both, the mode specification for a type wins.

- For an entire context, use the [System.Text.Json.Serialization.JsonSourceGenerationOptionsAttribute.GenerationMode](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonSourceGenerationOptionsAttribute.GenerationMode) property.
- For an individual type, use the [System.Text.Json.Serialization.JsonSerializableAttribute.GenerationMode](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonSerializableAttribute.GenerationMode) property.

### Serialization-optimization (fast path) mode example

- For an entire context:

  [language="csharp" source="snippets/source-generation/csharp/SerializeOnlyNoOptions.cs" id="JsonSourceGenerationOptionsGenMode"::: (complete source file; reference: snippets/source-generation/csharp/SerializeOnlyNoOptions.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/source-generation/csharp/SerializeOnlyNoOptions.cs.md)

- For an individual type:

  [language="csharp" source="snippets/source-generation/csharp/SerializeOnlyNoOptions.cs" id="JsonSerializableGenMode"::: (complete source file; reference: snippets/source-generation/csharp/SerializeOnlyNoOptions.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/source-generation/csharp/SerializeOnlyNoOptions.cs.md)

- Complete program example

  [language="csharp" source="snippets/source-generation/csharp/SerializeOnlyNoOptions.cs" id="All"::: (complete source file; reference: snippets/source-generation/csharp/SerializeOnlyNoOptions.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/source-generation/csharp/SerializeOnlyNoOptions.cs.md)

### Metadata-based mode example

- For an entire context:

  [language="csharp" source="snippets/source-generation/csharp/MetadataOnlyNoOptions.cs" id="JsonSourceGenerationOptionsGenMode"::: (complete source file; reference: snippets/source-generation/csharp/MetadataOnlyNoOptions.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/source-generation/csharp/MetadataOnlyNoOptions.cs.md)

  [language="csharp" source="snippets/source-generation/csharp/MetadataOnlyNoOptions.cs" id="SerializeMetadataOnlyContext"::: (complete source file; reference: snippets/source-generation/csharp/MetadataOnlyNoOptions.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/source-generation/csharp/MetadataOnlyNoOptions.cs.md)

  [language="csharp" source="snippets/source-generation/csharp/MetadataOnlyNoOptions.cs" id="DeserializeMetadataOnlyContext"::: (complete source file; reference: snippets/source-generation/csharp/MetadataOnlyNoOptions.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/source-generation/csharp/MetadataOnlyNoOptions.cs.md)

- For an individual type:

  [language="csharp" source="snippets/source-generation/csharp/MetadataOnlyNoOptions.cs" id="JsonSerializableGenMode"::: (complete source file; reference: snippets/source-generation/csharp/MetadataOnlyNoOptions.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/source-generation/csharp/MetadataOnlyNoOptions.cs.md)

  [language="csharp" source="snippets/source-generation/csharp/MetadataOnlyNoOptions.cs" id="SerializeWFContext"::: (complete source file; reference: snippets/source-generation/csharp/MetadataOnlyNoOptions.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/source-generation/csharp/MetadataOnlyNoOptions.cs.md)

  [language="csharp" source="snippets/source-generation/csharp/MetadataOnlyNoOptions.cs" id="DeserializeWFContext"::: (complete source file; reference: snippets/source-generation/csharp/MetadataOnlyNoOptions.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/source-generation/csharp/MetadataOnlyNoOptions.cs.md)

- Complete program example

  [language="csharp" source="snippets/source-generation/csharp/MetadataOnlyNoOptions.cs" id="All"::: (complete source file; reference: snippets/source-generation/csharp/MetadataOnlyNoOptions.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/source-generation/csharp/MetadataOnlyNoOptions.cs.md)

## Source-generation support in ASP.NET Core

In Blazor apps, use overloads of [System.Net.Http.Json.HttpClientJsonExtensions.GetFromJsonAsync*](https://learn.microsoft.com/search/?terms=System.Net.Http.Json.HttpClientJsonExtensions.GetFromJsonAsync*) and [System.Net.Http.Json.HttpClientJsonExtensions.PostAsJsonAsync*](https://learn.microsoft.com/search/?terms=System.Net.Http.Json.HttpClientJsonExtensions.PostAsJsonAsync*) extension methods that take a source generation context or `TypeInfo<TValue>`.

Starting with .NET 8, you can also use overloads of [System.Net.Http.Json.HttpClientJsonExtensions.GetFromJsonAsAsyncEnumerable*](https://learn.microsoft.com/search/?terms=System.Net.Http.Json.HttpClientJsonExtensions.GetFromJsonAsAsyncEnumerable*) extension methods that accept a source generation context or `TypeInfo<TValue>`.

In Razor Pages, MVC, SignalR, and Web API apps, use the [System.Text.Json.JsonSerializerOptions.TypeInfoResolver](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions.TypeInfoResolver) property to specify the context.

```csharp
[JsonSerializable(typeof(WeatherForecast[]))]
internal partial class MyJsonContext : JsonSerializerContext { }
```

```csharp
var serializerOptions = new JsonSerializerOptions
{
    TypeInfoResolver = MyJsonContext.Default
};

services.AddControllers().AddJsonOptions(
    static options =>
        options.JsonSerializerOptions.TypeInfoResolverChain.Add(MyJsonContext.Default));
```

> **Note:**
> [System.Text.Json.Serialization.JsonSourceGenerationMode.Serialization](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonSourceGenerationMode.Serialization), or *fast-path* serialization, isn't supported for asynchronous serialization. Even though streaming serialization requires metadata-based models, it falls back to fast-path if the payloads are known to be small enough to fit in the predetermined buffer size. For more information, see <https://devblogs.microsoft.com/dotnet/performance-improvements-in-net-8/#json>.

## Disable reflection defaults

Because System.Text.Json uses reflection by default, calling a basic serialization method can break Native AOT apps, which doesn't support all required reflection APIs. These breaks can be challenging to diagnose since they can be unpredictable, and apps are often debugged using the CoreCLR runtime, where reflection works. Instead, if you explicitly disable reflection-based serialization, breaks are easier to diagnose. Code that uses reflection-based serialization will cause an [System.InvalidOperationException](https://learn.microsoft.com/search/?terms=System.InvalidOperationException) with a descriptive message to be thrown at runtime.

To disable default reflection in your app, set the `JsonSerializerIsReflectionEnabledByDefault` MSBuild property to `false` in your project file:

```xml
<PropertyGroup>
  <JsonSerializerIsReflectionEnabledByDefault>false</JsonSerializerIsReflectionEnabledByDefault>
</PropertyGroup>
```

- The behavior of this property is consistent regardless of runtime, either CoreCLR or Native AOT.
- If you don't specify this property and [PublishTrimmed](../../../core/project-sdk/msbuild-props.md#trim-related-properties) is enabled, reflection-based serialization is automatically disabled.

You can programmatically check whether reflection is disabled by using the [System.Text.Json.JsonSerializer.IsReflectionEnabledByDefault](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializer.IsReflectionEnabledByDefault) property. The following code snippet shows how you might configure your serializer depending on whether reflection is enabled:

```csharp
static JsonSerializerOptions CreateDefaultOptions()
{
    return new()
    {
        TypeInfoResolver = JsonSerializer.IsReflectionEnabledByDefault
            ? new DefaultJsonTypeInfoResolver()
            : MyContext.Default
    };
}
```

Because the property is treated as a link-time constant, the previous method doesn't root the reflection-based resolver in applications that run in Native AOT.

## Specify options

In .NET 8 and later versions, most options that you can set using [System.Text.Json.JsonSerializerOptions](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions) can also be set using the [System.Text.Json.Serialization.JsonSourceGenerationOptionsAttribute](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonSourceGenerationOptionsAttribute) attribute. The advantage to setting options via the attribute is that the configuration is specified at compile time, which ensures that the generated `MyContext.Default` property is preconfigured with all the relevant options set.

The following code shows how to set options using the [System.Text.Json.Serialization.JsonSourceGenerationOptionsAttribute](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonSourceGenerationOptionsAttribute) attribute.

[language="csharp" source="snippets/source-generation/csharp/SerializeOnlyWithOptions.cs" id="JsonSourceGenerationOptions"::: (complete source file; reference: snippets/source-generation/csharp/SerializeOnlyWithOptions.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/source-generation/csharp/SerializeOnlyWithOptions.cs.md)

When using `JsonSourceGenerationOptionsAttribute` to specify serialization options, call one of the following serialization methods:

- A `JsonSerializer.Serialize` method that takes a `TypeInfo<TValue>`. Pass it the `Default.<TypeName>` property of your context class:

  [language="csharp" source="snippets/source-generation/csharp/SerializeOnlyWithOptions.cs" id="SerializeWithTypeInfo"::: (complete source file; reference: snippets/source-generation/csharp/SerializeOnlyWithOptions.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/source-generation/csharp/SerializeOnlyWithOptions.cs.md)

- A `JsonSerializer.Serialize` method that takes a context. Pass it the `Default` static property of your context class.

  [language="csharp" source="snippets/source-generation/csharp/SerializeOnlyWithOptions.cs" id="SerializeWithContext"::: (complete source file; reference: snippets/source-generation/csharp/SerializeOnlyWithOptions.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/source-generation/csharp/SerializeOnlyWithOptions.cs.md)

If you call a method that lets you pass in your own instance of `Utf8JsonWriter`, the writer's [System.Text.Json.JsonWriterOptions.Indented](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonWriterOptions.Indented) setting is honored instead of the `JsonSourceGenerationOptionsAttribute.WriteIndented` option.

If you create and use a context instance by calling the constructor that takes a `JsonSerializerOptions` instance, the supplied instance will be used instead of the options specified by `JsonSourceGenerationOptionsAttribute`.

The following code shows the preceding examples in a complete program:

[language="csharp" source="snippets/source-generation/csharp/SerializeOnlyWithOptions.cs" id="All"::: (complete source file; reference: snippets/source-generation/csharp/SerializeOnlyWithOptions.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/source-generation/csharp/SerializeOnlyWithOptions.cs.md)

## Combine source generators

You can combine contracts from multiple source-generated contexts inside a single [System.Text.Json.JsonSerializerOptions](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions) instance. Use the [System.Text.Json.JsonSerializerOptions.TypeInfoResolver](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions.TypeInfoResolver) property to chain multiple contexts that have been combined by using the [System.Text.Json.Serialization.Metadata.JsonTypeInfoResolver.Combine(System.Text.Json.Serialization.Metadata.IJsonTypeInfoResolver\[\])](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.Metadata.JsonTypeInfoResolver.Combine(System.Text.Json.Serialization.Metadata.IJsonTypeInfoResolver%5B%5D)) method.

```csharp
var options = new JsonSerializerOptions
{
    TypeInfoResolver = JsonTypeInfoResolver.Combine(ContextA.Default, ContextB.Default, ContextC.Default),
};
```

Starting in .NET 8, if you later want to prepend or append another context, you can do so using the [System.Text.Json.JsonSerializerOptions.TypeInfoResolverChain](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions.TypeInfoResolverChain) property. The ordering of the chain is significant: [System.Text.Json.JsonSerializerOptions](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions) queries each of the resolvers in their specified order and returns the first result that's non-null.

```csharp
options.TypeInfoResolverChain.Add(ContextD.Default); // Append to the end of the list.
options.TypeInfoResolverChain.Insert(0, ContextE.Default); // Insert at the beginning of the list.
```

Any change made to the [System.Text.Json.JsonSerializerOptions.TypeInfoResolverChain](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions.TypeInfoResolverChain) property is reflected by [System.Text.Json.JsonSerializerOptions.TypeInfoResolver](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions.TypeInfoResolver) and vice versa.

## Serialize enum fields as strings

By default, enums are serialized as numbers. To [serialize a specific enum's fields as strings](#jsonstringenumconvertert-converter) when using source generation, annotate it with the [System.Text.Json.Serialization.JsonStringEnumConverter`1](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonStringEnumConverter%601) converter. Or to set a [blanket policy](#blanket-policy) for all enumerations, use the [System.Text.Json.Serialization.JsonSourceGenerationOptionsAttribute](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonSourceGenerationOptionsAttribute) attribute.

### `JsonStringEnumConverter<T>` converter

To serialize enum names as strings using source generation, use the [System.Text.Json.Serialization.JsonStringEnumConverter`1](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonStringEnumConverter%601) converter. (The non-generic [System.Text.Json.Serialization.JsonStringEnumConverter](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonStringEnumConverter) type is not supported by the Native AOT runtime.)

Annotate the enumeration type with the [System.Text.Json.Serialization.JsonStringEnumConverter`1](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonStringEnumConverter%601) converter using the [System.Text.Json.Serialization.JsonConverterAttribute](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonConverterAttribute) attribute:

[language="csharp" source="snippets/how-to/csharp/WeatherForecast.cs" id="WFWithConverterEnum"::: (complete source file; reference: snippets/how-to/csharp/WeatherForecast.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to/csharp/WeatherForecast.cs.md)

Create a [System.Text.Json.Serialization.JsonSerializerContext](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonSerializerContext) class and annotate it with the [System.Text.Json.Serialization.JsonSerializableAttribute](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonSerializableAttribute) attribute:

[language="csharp" source="snippets/how-to/csharp/RoundtripEnumSourceGeneration.cs" id="Context1"::: (complete source file; reference: snippets/how-to/csharp/RoundtripEnumSourceGeneration.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to/csharp/RoundtripEnumSourceGeneration.cs.md)

The following code serializes the enum names instead of the numeric values:

[language="csharp" source="snippets/how-to/csharp/RoundtripEnumSourceGeneration.cs" id="Serialize"::: (complete source file; reference: snippets/how-to/csharp/RoundtripEnumSourceGeneration.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to/csharp/RoundtripEnumSourceGeneration.cs.md)

The resulting JSON looks like the following example:

```json
{
  "Date": "2019-08-01T00:00:00-07:00",
  "TemperatureCelsius": 25,
  "Precipitation": "Sleet"
}
```

### Blanket policy

Instead of using the [System.Text.Json.Serialization.JsonStringEnumConverter`1](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonStringEnumConverter%601) type, you can apply a blanket policy to serialize enums as strings by using the [System.Text.Json.Serialization.JsonSourceGenerationOptionsAttribute](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonSourceGenerationOptionsAttribute). Create a [System.Text.Json.Serialization.JsonSerializerContext](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonSerializerContext) class and annotate it with the [System.Text.Json.Serialization.JsonSerializableAttribute](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonSerializableAttribute) *and [System.Text.Json.Serialization.JsonSourceGenerationOptionsAttribute](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonSourceGenerationOptionsAttribute)* attributes:

[language="csharp" source="snippets/how-to/csharp/RoundtripEnumSourceGeneration.cs" id="Context2"::: (complete source file; reference: snippets/how-to/csharp/RoundtripEnumSourceGeneration.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to/csharp/RoundtripEnumSourceGeneration.cs.md)

Notice that the enum doesn't have the [System.Text.Json.Serialization.JsonConverterAttribute](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonConverterAttribute):

[language="csharp" source="snippets/how-to/csharp/WeatherForecast.cs" id="WFWithPrecipEnumNoConverter"::: (complete source file; reference: snippets/how-to/csharp/WeatherForecast.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to/csharp/WeatherForecast.cs.md)

### Custom enum member names

Starting in .NET 9, you can customize enum member names using the [JsonStringEnumMemberName attribute](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonStringEnumMemberNameAttribute). For more information, see [Custom enum member names](customize-properties.md#custom-enum-member-names).

## See also

- [JSON serialization and deserialization in .NET - overview](overview.md)
- [How to use the library](how-to.md)
