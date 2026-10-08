---
title: "Breaking change: Serialize throws exception when type parameter is null"
description: Learn about the breaking change in .NET 5 where JsonSerialize serialization methods that have a Type parameter now throw an exception whenever null is passed for that parameter.
ms.date: 10/18/2020
---
# JsonSerializer.Serialize throws ArgumentNullException when type parameter is null

[System.Text.Json.JsonSerializer.Serialize*](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializer.Serialize*), [System.Text.Json.JsonSerializer.SerializeAsync*](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializer.SerializeAsync*), and [System.Text.Json.JsonSerializer.SerializeToUtf8Bytes*](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializer.SerializeToUtf8Bytes*) overloads that have a parameter of type [System.Type](https://learn.microsoft.com/search/?terms=System.Type) now throw an [System.ArgumentNullException](https://learn.microsoft.com/search/?terms=System.ArgumentNullException) whenever `null` is passed for that parameter.

## Change description

In .NET Core 3.1, the [System.Text.Json.JsonSerializer.Serialize*](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializer.Serialize*), [System.Text.Json.JsonSerializer.SerializeAsync(System.IO.Stream,System.Object,System.Type,System.Text.Json.JsonSerializerOptions,System.Threading.CancellationToken)](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializer.SerializeAsync(System.IO.Stream%2CSystem.Object%2CSystem.Type%2CSystem.Text.Json.JsonSerializerOptions%2CSystem.Threading.CancellationToken)), and [System.Text.Json.JsonSerializer.SerializeToUtf8Bytes(System.Object,System.Type,System.Text.Json.JsonSerializerOptions)](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializer.SerializeToUtf8Bytes(System.Object%2CSystem.Type%2CSystem.Text.Json.JsonSerializerOptions)) overloads that have a [System.Type](https://learn.microsoft.com/search/?terms=System.Type) parameter throw an [System.ArgumentNullException](https://learn.microsoft.com/search/?terms=System.ArgumentNullException) when `null` is passed for the `Type inputType` parameter, but not if the `Object value` parameter is also `null`. Starting in .NET 5, these methods *always* throw an [System.ArgumentNullException](https://learn.microsoft.com/search/?terms=System.ArgumentNullException) when `null` is passed for the [System.Type](https://learn.microsoft.com/search/?terms=System.Type) parameter.

Behavior in .NET Core 3.1:

```csharp
// Returns a string with value "null".
JsonSerializer.Serialize(null, null);

// Returns a byte array with value "null".
JsonSerializer.SerializeToUtf8Bytes(null, null);
```

Behavior in .NET 5 and later:

```csharp
// Throws ArgumentNullException: "Value cannot be null. (Parameter 'inputType')".
JsonSerializer.Serialize(null, null);

// Throws ArgumentNullException: "Value cannot be null. (Parameter 'inputType')".
JsonSerializer.SerializeToUtf8Bytes(null, null);
```

## Version introduced

5.0

## Reason for change

Passing in `null` for the `Type inputType` parameter is unacceptable and should always throw an [System.ArgumentNullException](https://learn.microsoft.com/search/?terms=System.ArgumentNullException).

## Recommended action

Make sure that you are not passing `null` for the `Type inputType` parameter of these methods.

## Affected APIs

- [System.Text.Json.JsonSerializer.Serialize(System.Object,System.Type,System.Text.Json.JsonSerializerOptions)](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializer.Serialize(System.Object%2CSystem.Type%2CSystem.Text.Json.JsonSerializerOptions))
- [System.Text.Json.JsonSerializer.Serialize(System.Text.Json.Utf8JsonWriter,System.Object,System.Type,System.Text.Json.JsonSerializerOptions)](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializer.Serialize(System.Text.Json.Utf8JsonWriter%2CSystem.Object%2CSystem.Type%2CSystem.Text.Json.JsonSerializerOptions))
- [System.Text.Json.JsonSerializer.SerializeAsync(System.IO.Stream,System.Object,System.Type,System.Text.Json.JsonSerializerOptions,System.Threading.CancellationToken)](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializer.SerializeAsync(System.IO.Stream%2CSystem.Object%2CSystem.Type%2CSystem.Text.Json.JsonSerializerOptions%2CSystem.Threading.CancellationToken))
- [System.Text.Json.JsonSerializer.SerializeToUtf8Bytes(System.Object,System.Type,System.Text.Json.JsonSerializerOptions)](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializer.SerializeToUtf8Bytes(System.Object%2CSystem.Type%2CSystem.Text.Json.JsonSerializerOptions))

<!--

### Affected APIs

- `M:System.Text.Json.JsonSerializer.Serialize(System.Object,System.Type,System.Text.Json.JsonSerializerOptions)`
- `M:System.Text.Json.JsonSerializer.Serialize(System.Text.Json.Utf8JsonWriter,System.Object,System.Type,System.Text.Json.JsonSerializerOptions)`
- `M:System.Text.Json.JsonSerializer.SerializeAsync(System.IO.Stream,System.Object,System.Type,System.Text.Json.JsonSerializerOptions,System.Threading.CancellationToken)`
- `M:System.Text.Json.JsonSerializer.SerializeToUtf8Bytes(System.Object,System.Type,System.Text.Json.JsonSerializerOptions)`

### Category

Serialization

-->
