---
title: Custom serialization and deserialization contracts
description: "Learn how to write your own contract resolution logic to customize the JSON contract for a type."
ms.date: 08/18/2026
ai-usage: ai-assisted
---
# Customize a JSON contract

The [System.Text.Json](https://learn.microsoft.com/search/?terms=System.Text.Json) library constructs a JSON *contract* for each .NET type, which defines how the type should be serialized and deserialized. The contract is derived from the type's shape, which includes characteristics such as its properties and fields and whether it implements the [System.Collections.IEnumerable](https://learn.microsoft.com/search/?terms=System.Collections.IEnumerable) or [System.Collections.IDictionary](https://learn.microsoft.com/search/?terms=System.Collections.IDictionary) interface. Types are mapped to contracts either at runtime using reflection or at compile time using the source generator.

Starting in .NET 7, you can customize these JSON contracts to provide more control over how types are converted into JSON and vice versa. The following list shows just some examples of the types of customizations you can make to serialization and deserialization:

- Serialize private fields and properties.
- Support multiple names for a single property (for example, if a previous library version used a different name).
- Ignore properties with a specific name, type, or value.
- Distinguish between explicit `null` values and the lack of a value in the JSON payload.
- Support [System.Runtime.Serialization](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization) attributes, such as [System.Runtime.Serialization.DataContractAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractAttribute). For more information, see [System.Runtime.Serialization attributes](migrate-from-newtonsoft.md#systemruntimeserialization-attributes).
- Throw an exception if the JSON includes a property that's not part of the target type. For more information, see [Handle missing members](migrate-from-newtonsoft.md#handle-missing-members).

## How to opt in

There are two ways to plug into customization. Both involve obtaining a resolver, whose job is to provide a [System.Text.Json.Serialization.Metadata.JsonTypeInfo](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.Metadata.JsonTypeInfo) instance for each type that needs to be serialized.

- By calling the [System.Text.Json.Serialization.Metadata.DefaultJsonTypeInfoResolver.%23ctor](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.Metadata.DefaultJsonTypeInfoResolver.%2523ctor) constructor to obtain the [System.Text.Json.JsonSerializerOptions.TypeInfoResolver](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions.TypeInfoResolver) and adding your [custom actions](#modifiers) to its [System.Text.Json.Serialization.Metadata.DefaultJsonTypeInfoResolver.Modifiers](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.Metadata.DefaultJsonTypeInfoResolver.Modifiers) property.

  For example:

  ```csharp
  JsonSerializerOptions options = new()
  {
      TypeInfoResolver = new DefaultJsonTypeInfoResolver
      {
          Modifiers =
          {
              MyCustomModifier1,
              MyCustomModifier2
          }
      }
  };
  ```

  If you add multiple modifiers, they'll be called sequentially.

- By writing a custom resolver that implements [System.Text.Json.Serialization.Metadata.IJsonTypeInfoResolver](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.Metadata.IJsonTypeInfoResolver).

  - If a type isn't handled, [System.Text.Json.Serialization.Metadata.IJsonTypeInfoResolver.GetTypeInfo*](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.Metadata.IJsonTypeInfoResolver.GetTypeInfo*) should return `null` for that type.
  - You can also combine your custom resolver with others, for example, the default resolver. The resolvers will be queried in order until a non-null [System.Text.Json.Serialization.Metadata.JsonTypeInfo](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.Metadata.JsonTypeInfo) value is returned for the type.

## Get strongly typed metadata

Starting in .NET 11, use [System.Text.Json.JsonSerializerOptions.GetTypeInfo``1](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions.GetTypeInfo%60%601) and [System.Text.Json.JsonSerializerOptions.TryGetTypeInfo``1(System.Text.Json.Serialization.Metadata.JsonTypeInfo{``0}@)](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions.TryGetTypeInfo%60%601(System.Text.Json.Serialization.Metadata.JsonTypeInfo%7B%60%600%7D%40)) as strongly typed alternatives to casting the result of [System.Text.Json.JsonSerializerOptions.GetTypeInfo(System.Type)](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions.GetTypeInfo(System.Type)):

```csharp
JsonTypeInfo<WeatherForecast> typeInfo =
    options.GetTypeInfo<WeatherForecast>();

bool found = options.TryGetTypeInfo<WeatherForecast>(
    out JsonTypeInfo<WeatherForecast>? optionalTypeInfo);
```

`TryGetTypeInfo<T>` returns `false` when no resolver supplies metadata for `T`.

## Configurable aspects

The [System.Text.Json.Serialization.Metadata.JsonTypeInfo.Kind](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.Metadata.JsonTypeInfo.Kind) property indicates how the converter serializes a given type&mdash;for example, as an object or as an array, and whether its properties are serialized. Query this property to determine which aspects of a type's JSON contract you can configure. The property has five possible values:

| `JsonTypeInfo.Kind` | Description |
| --- | --- |
| [System.Text.Json.Serialization.Metadata.JsonTypeInfoKind.Object](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.Metadata.JsonTypeInfoKind.Object) | The converter will serialize the type into a JSON object and uses its properties. **This kind is used for most class and struct types and allows for the most flexibility.** |
| [System.Text.Json.Serialization.Metadata.JsonTypeInfoKind.Enumerable](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.Metadata.JsonTypeInfoKind.Enumerable) | The converter will serialize the type into a JSON array. This kind is used for types like `List<T>` and array. |
| [System.Text.Json.Serialization.Metadata.JsonTypeInfoKind.Dictionary](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.Metadata.JsonTypeInfoKind.Dictionary) | The converter will serialize the type into a JSON object. This kind is used for types like `Dictionary<K, V>`. |
| [System.Text.Json.Serialization.Metadata.JsonTypeInfoKind.Union](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.Metadata.JsonTypeInfoKind.Union) | The converter serializes the active case value from a union. Starting in .NET 11, this kind is used for C# union types and exposes case, classifier, constructor, and deconstructor metadata. |
| [System.Text.Json.Serialization.Metadata.JsonTypeInfoKind.None](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.Metadata.JsonTypeInfoKind.None) | The converter doesn't specify how it will serialize the type or what `JsonTypeInfo` properties it will use. This kind is used for types like [System.Object](https://learn.microsoft.com/search/?terms=System.Object), `int`, and `string`, and for all types that use a custom converter. |

## Modifiers

A modifier is an `Action<JsonTypeInfo>` or a method with a [System.Text.Json.Serialization.Metadata.JsonTypeInfo](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.Metadata.JsonTypeInfo) parameter that gets the current state of the contract as an argument and makes modifications to the contract. For example, you could iterate through the prepopulated properties on the specified [System.Text.Json.Serialization.Metadata.JsonTypeInfo](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.Metadata.JsonTypeInfo) to find the one you're interested in and then modify its [System.Text.Json.Serialization.Metadata.JsonPropertyInfo.Get](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.Metadata.JsonPropertyInfo.Get) property (for serialization) or [System.Text.Json.Serialization.Metadata.JsonPropertyInfo.Set](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.Metadata.JsonPropertyInfo.Set) property (for deserialization). Or, you can construct a new property using [System.Text.Json.Serialization.Metadata.JsonTypeInfo.CreateJsonPropertyInfo(System.Type,System.String)](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.Metadata.JsonTypeInfo.CreateJsonPropertyInfo(System.Type%2CSystem.String)) and add it to the [System.Text.Json.Serialization.Metadata.JsonTypeInfo.Properties](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.Metadata.JsonTypeInfo.Properties) collection.

The following table shows the modifications you can make and how to achieve them.

| Modification | Applicable `JsonTypeInfo.Kind` | How to achieve it | Example |
| --- | --- | --- | --- |
| Customize a property's value | `JsonTypeInfoKind.Object` | Modify the [System.Text.Json.Serialization.Metadata.JsonPropertyInfo.Get](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.Metadata.JsonPropertyInfo.Get) delegate (for serialization) or [System.Text.Json.Serialization.Metadata.JsonPropertyInfo.Set](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.Metadata.JsonPropertyInfo.Set) delegate (for deserialization) for the property. | [Increment a property's value](#example-increment-a-propertys-value) |
| Add or remove properties | `JsonTypeInfoKind.Object` | Add or remove items from the [System.Text.Json.Serialization.Metadata.JsonTypeInfo.Properties](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.Metadata.JsonTypeInfo.Properties) list. | [Serialize private fields](#example-serialize-private-fields) |
| Conditionally serialize a property | `JsonTypeInfoKind.Object` | Modify the [System.Text.Json.Serialization.Metadata.JsonPropertyInfo.ShouldSerialize](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.Metadata.JsonPropertyInfo.ShouldSerialize) predicate for the property. | [Ignore properties with a specific type](#example-ignore-properties-with-a-specific-type) |
| Customize number handling for a specific type | `JsonTypeInfoKind.None` | Modify the [System.Text.Json.Serialization.Metadata.JsonTypeInfo.NumberHandling](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.Metadata.JsonTypeInfo.NumberHandling) value for the type. | [Allow int values to be strings](#example-allow-int-values-to-be-strings) |
| Customize union cases or classification | `JsonTypeInfoKind.Union` | Modify the union cases, classifier, constructor, or deconstructor on [System.Text.Json.Serialization.Metadata.JsonTypeInfo](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.Metadata.JsonTypeInfo). | [Serialize union types](union-types.md#customize-a-union-contract) |

## Example: Increment a property's value

Consider the following example where the modifier increments the value of a certain property on deserialization by modifying its [System.Text.Json.Serialization.Metadata.JsonPropertyInfo.Set](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.Metadata.JsonPropertyInfo.Set) delegate. Besides defining the modifier, the example also introduces a new attribute that it uses to locate the property whose value should be incremented. This is an example of *customizing a property*.

[language="csharp" source="snippets/custom-contracts/SerializationCount.cs"::: (complete source file; reference: snippets/custom-contracts/SerializationCount.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/custom-contracts/SerializationCount.cs.md)

Notice in the output that the value of `RoundTrips` is incremented each time the `Product` instance is deserialized.

## Example: Serialize private fields

By default, `System.Text.Json` ignores private fields and properties. This example adds a new class-wide attribute, `JsonIncludePrivateFieldsAttribute`, to change that default. If the modifier finds the attribute on a type, it adds all the private fields on the type as new properties to [System.Text.Json.Serialization.Metadata.JsonTypeInfo](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.Metadata.JsonTypeInfo).

[language="csharp" source="snippets/custom-contracts/PrivateFields.cs"::: (complete source file; reference: snippets/custom-contracts/PrivateFields.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/custom-contracts/PrivateFields.cs.md)

> **Tip:**
> If your private field names start with underscores, consider removing the underscores from the names when you add the fields as new JSON properties.

## Example: Ignore properties with a specific type

Perhaps your model has properties with specific names or types that you don't want to expose to users. For example, you might have a property that stores credentials or some information that's useless to have in the payload.

The following example shows how to filter out properties with a specific type, `SecretHolder`. It does this by using an [System.Collections.Generic.IList`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IList%601) extension method to remove any properties that have the specified type from the [System.Text.Json.Serialization.Metadata.JsonTypeInfo.Properties](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.Metadata.JsonTypeInfo.Properties) list. The filtered properties completely disappear from the contract, which means `System.Text.Json` doesn't look at them either during serialization or deserialization.

[language="csharp" source="snippets/custom-contracts/IgnoreType.cs"::: (complete source file; reference: snippets/custom-contracts/IgnoreType.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/custom-contracts/IgnoreType.cs.md)

## Example: Allow int values to be strings

Perhaps your input JSON can contain quotes around one of the numeric types but not on others. If you had control over the class, you could place [System.Text.Json.Serialization.JsonNumberHandlingAttribute](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonNumberHandlingAttribute) on the type to fix this, but you don't. Before .NET 7, you'd need to write a [custom converter](converters-how-to.md) to fix this behavior, which requires writing a fair bit of code. Using contract customization, you can customize the number handling behavior for any type.

The following example changes the behavior for all `int` values. The example can be easily adjusted to apply to any type or for a specific property of any type.

[language="csharp" source="snippets/custom-contracts/ReadIntFromString.cs"::: (complete source file; reference: snippets/custom-contracts/ReadIntFromString.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/custom-contracts/ReadIntFromString.cs.md)

Without the modifier to allow reading `int` values from a string, the program would have ended with an exception:

> Unhandled exception. System.Text.Json.JsonException: The JSON value could not be converted to System.Int32. Path: $.X | LineNumber: 0 | BytePositionInLine: 9.

## Other ways to customize serialization

Besides customizing a contract, there are other ways to influence serialization and deserialization behavior, including the following:

- By using attributes derived from [System.Text.Json.Serialization.JsonAttribute](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonAttribute), for example, [System.Text.Json.Serialization.JsonIgnoreAttribute](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonIgnoreAttribute) and [System.Text.Json.Serialization.JsonPropertyOrderAttribute](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonPropertyOrderAttribute).
- By modifying [System.Text.Json.JsonSerializerOptions](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions), for example, to set a naming policy or serialize enumeration values as strings instead of numbers.
- By writing a custom converter that does the actual work of writing the JSON and, during deserialization, constructing an object.

Contract customization is an improvement over these pre-existing customizations because you might not have access to the type to add attributes. In addition, writing a custom converter is complex and hurts performance.

## See also

- [JSON contract customization (blog post)](https://devblogs.microsoft.com/dotnet/announcing-dotnet-7-preview-6/#json-contract-customization)
- [What's new in System.Text.Json in .NET 7 (blog post)](https://devblogs.microsoft.com/dotnet/system-text-json-in-dotnet-7/)
