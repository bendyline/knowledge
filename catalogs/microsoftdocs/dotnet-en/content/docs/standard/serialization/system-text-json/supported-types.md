---
title: "Supported types in System.Text.Json"
description: "Learn which types are supported for serialization by the APIs in the System.Text.Json namespace."
ms.date: 08/18/2026
ai-usage: ai-assisted
no-loc: [System.Text.Json]
ms.topic: reference
---

# Supported types in System.Text.Json

This article gives an overview of which types are supported for serialization and deserialization.

## Types that serialize as JSON objects

The following types serialize as JSON objects:

* Classes<sup>*</sup>
* Structs
* Interfaces
* Records and struct records

\* Non-dictionary types that implement [System.Collections.Generic.IEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%601) serialize as JSON arrays. Dictionary types, which do implement [System.Collections.Generic.IEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%601), serialize as JSON objects.

The following code snippet shows the serialization of a simple struct.

[language="csharp" source="snippets/supported-types/csharp/Struct.cs" id="SerializeStruct"::: (complete source file; reference: snippets/supported-types/csharp/Struct.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/supported-types/csharp/Struct.cs.md)

## Types that serialize as JSON arrays

.NET collection types serialize as JSON arrays. [System.Text.Json.JsonSerializer](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializer) supports a collection type for serialization if it:

* Derives from [System.Collections.IEnumerable](https://learn.microsoft.com/search/?terms=System.Collections.IEnumerable) or [System.Collections.Generic.IAsyncEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IAsyncEnumerable%601).
* Contains elements that are serializable.

The serializer calls the [System.Collections.IEnumerable.GetEnumerator](https://learn.microsoft.com/search/?terms=System.Collections.IEnumerable.GetEnumerator) method and writes the elements.

Deserialization is more complicated and is not supported for some collection types.

The following sections are organized by namespace and show which types are supported for serialization and deserialization.

* [System.Array namespace](#systemarray-namespace)
* [System.Collections namespace](#systemcollections-namespace)
* [System.Collections.Generic namespace](#systemcollectionsgeneric-namespace)
* [System.Collections.Immutable namespace](#systemcollectionsimmutable-namespace)
* [System.Collections.Specialized namespace](#systemcollectionsspecialized-namespace)
* [System.Collections.Concurrent namespace](#systemcollectionsconcurrent-namespace)
* [System.Collections.ObjectModel namespace](#systemcollectionsobjectmodel-namespace)
* [Custom collections](#custom-collections)

### System.Array namespace

| Type | Serialization | Deserialization |
| --- | --- | --- |
| [Single-dimensional arrays](../../../csharp/language-reference/builtin-types/arrays.md#single-dimensional-arrays)* | ✔️ | ✔️ |
| [Multi-dimensional arrays](../../../csharp/language-reference/builtin-types/arrays.md#multidimensional-arrays) | ❌ | ❌ |
| [Jagged arrays](../../../csharp/language-reference/builtin-types/arrays.md#jagged-arrays) | ✔️ | ✔️ |

\* `byte[]` is handled specially and serializes as a base64 string, not a JSON array.

### System.Collections namespace

| Type | Serialization | Deserialization |
| --- | --- | --- |
| [System.Collections.ArrayList](https://learn.microsoft.com/search/?terms=System.Collections.ArrayList) | ✔️ | ✔️ |
| [System.Collections.BitArray](https://learn.microsoft.com/search/?terms=System.Collections.BitArray) | ✔️ | ❌ |
| [System.Collections.DictionaryEntry](https://learn.microsoft.com/search/?terms=System.Collections.DictionaryEntry) | ✔️ | ✔️ |
| [System.Collections.Hashtable](https://learn.microsoft.com/search/?terms=System.Collections.Hashtable) | ✔️ | ✔️ |
| [System.Collections.ICollection](https://learn.microsoft.com/search/?terms=System.Collections.ICollection) | ✔️ | ✔️ |
| [System.Collections.IDictionary](https://learn.microsoft.com/search/?terms=System.Collections.IDictionary) | ✔️ | ✔️ |
| [System.Collections.IEnumerable](https://learn.microsoft.com/search/?terms=System.Collections.IEnumerable) | ✔️ | ✔️ |
| [System.Collections.IList](https://learn.microsoft.com/search/?terms=System.Collections.IList) | ✔️ | ✔️ |
| [System.Collections.Queue](https://learn.microsoft.com/search/?terms=System.Collections.Queue) | ✔️ | ✔️ |
| [System.Collections.SortedList](https://learn.microsoft.com/search/?terms=System.Collections.SortedList) | ✔️ | ✔️ |
| [System.Collections.Stack](https://learn.microsoft.com/search/?terms=System.Collections.Stack) \* | ✔️ | ✔️ |

\* See [Support round trip for `Stack` types](converters-how-to.md#support-round-trip-for-stack-types).

### System.Collections.Generic namespace

| Type | Serialization | Deserialization |
| --- | --- | --- |
| [System.Collections.Generic.Dictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Generic.Dictionary%602) \* | ✔️ | ✔️ |
| [System.Collections.Generic.HashSet`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.HashSet%601) | ✔️ | ✔️ |
| [System.Collections.Generic.IAsyncEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IAsyncEnumerable%601) † | ✔️ | ✔️ |
| [System.Collections.Generic.ICollection`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.ICollection%601) | ✔️ | ✔️ |
| [System.Collections.Generic.IDictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IDictionary%602) \* | ✔️ | ✔️ |
| [System.Collections.Generic.IEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%601) | ✔️ | ✔️ |
| [System.Collections.Generic.IList`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IList%601) | ✔️ | ✔️ |
| [System.Collections.Generic.IReadOnlyCollection`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IReadOnlyCollection%601) | ✔️ | ✔️ |
| [System.Collections.Generic.IReadOnlyDictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IReadOnlyDictionary%602) \* | ✔️ | ✔️ |
| [System.Collections.Generic.IReadOnlyList`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IReadOnlyList%601) | ✔️ | ✔️ |
| [System.Collections.Generic.IReadOnlySet`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IReadOnlySet%601) § | ✔️ | ✔️ |
| [System.Collections.Generic.ISet`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.ISet%601) | ✔️ | ✔️ |
| [System.Collections.Generic.KeyValuePair`2](https://learn.microsoft.com/search/?terms=System.Collections.Generic.KeyValuePair%602) | ✔️ | ✔️ |
| [System.Collections.Generic.LinkedList`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.LinkedList%601) | ✔️ | ✔️ |
| [System.Collections.Generic.LinkedListNode`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.LinkedListNode%601) | ✔️ | ❌ |
| [System.Collections.Generic.List`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.List%601) | ✔️ | ✔️ |
| [System.Collections.Generic.Queue`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.Queue%601) | ✔️ | ✔️ |
| [System.Collections.Generic.SortedDictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Generic.SortedDictionary%602) \* | ✔️ | ✔️ |
| [System.Collections.Generic.SortedList`2](https://learn.microsoft.com/search/?terms=System.Collections.Generic.SortedList%602) \* | ✔️ | ✔️ |
| [System.Collections.Generic.SortedSet`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.SortedSet%601) | ✔️ | ✔️ |
| [System.Collections.Generic.Stack`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.Stack%601) ‡ | ✔️ | ✔️ |

\* See [Supported key types](#supported-key-types).

† See the following section on `IAsyncEnumerable<T>`.

‡ See [Support round trip for `Stack` types](converters-how-to.md#support-round-trip-for-stack-types).

§ `System.Text.Json` supports [System.Collections.Generic.IReadOnlySet`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IReadOnlySet%601) in .NET 11 and later versions. When you deserialize the interface, the serializer creates a [System.Collections.Generic.HashSet`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.HashSet%601) instance. For generated metadata, [System.Text.Json.Serialization.Metadata.JsonMetadataServices.CreateIReadOnlySetInfo*](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.Metadata.JsonMetadataServices.CreateIReadOnlySetInfo*) creates the collection contract.

#### IAsyncEnumerable\<T>

The following examples use streams as a representation of any async source of data. The source could be files on a local machine, or results from a database query or web service API call.

##### Stream serialization

`System.Text.Json` supports serializing [System.Collections.Generic.IAsyncEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IAsyncEnumerable%601) values as JSON arrays, as shown in the following example:

[language="csharp" source="snippets/supported-types/csharp/IAsyncEnumerableSerialize.cs" highlight="15"::: (complete source file; reference: snippets/supported-types/csharp/IAsyncEnumerableSerialize.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/supported-types/csharp/IAsyncEnumerableSerialize.cs.md)

`IAsyncEnumerable<T>` values are only supported by the asynchronous serialization methods, such as [System.Text.Json.JsonSerializer.SerializeAsync*](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializer.SerializeAsync*).

In .NET 11 and later versions, [System.Text.Json.JsonSerializer.SerializeAsyncEnumerable*](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializer.SerializeAsyncEnumerable*) writes an `IAsyncEnumerable<T>` sequence to either a [System.IO.Stream](https://learn.microsoft.com/search/?terms=System.IO.Stream) or a [System.IO.Pipelines.PipeWriter](https://learn.microsoft.com/search/?terms=System.IO.Pipelines.PipeWriter). With the default `topLevelValues: false`, the method writes a single root-level JSON array. Set `topLevelValues: true` to write [JSON Lines](https://jsonlines.org/) instead, where each element is a separate top-level value:

```json
{"id":1,"name":"apple"}
{"id":2,"name":"banana"}
```

The method writes a single line feed (LF), `\n`, after every value, including the last. It always uses LF, regardless of [System.Text.Json.JsonSerializerOptions.NewLine](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions.NewLine). The method ignores [System.Text.Json.JsonSerializerOptions.WriteIndented](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions.WriteIndented), so each value remains on one line.

##### Stream deserialization

The `DeserializeAsyncEnumerable` method supports streaming deserialization, as shown in the following example:

[language="csharp" source="snippets/supported-types/csharp/IAsyncEnumerableDeserialize.cs" highlight="11"::: (complete source file; reference: snippets/supported-types/csharp/IAsyncEnumerableDeserialize.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/supported-types/csharp/IAsyncEnumerableDeserialize.cs.md)

By default, [System.Text.Json.JsonSerializer.DeserializeAsyncEnumerable*](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializer.DeserializeAsyncEnumerable*) reads elements from a single root-level JSON array. Set `topLevelValues: true` to read a sequence of whitespace-separated top-level values instead. This input format is a superset of JSON Lines. Overloads accept either a [System.IO.Stream](https://learn.microsoft.com/search/?terms=System.IO.Stream) or a [System.IO.Pipelines.PipeReader](https://learn.microsoft.com/search/?terms=System.IO.Pipelines.PipeReader).

The [System.Text.Json.JsonSerializer.DeserializeAsync*](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializer.DeserializeAsync*) method supports `IAsyncEnumerable<T>`, but its signature doesn't allow streaming. It returns the final result as a single value, as shown in the following example.

[language="csharp" source="snippets/supported-types/csharp/IAsyncEnumerableDeserializeNonStreaming.cs" highlight="16"::: (complete source file; reference: snippets/supported-types/csharp/IAsyncEnumerableDeserializeNonStreaming.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/supported-types/csharp/IAsyncEnumerableDeserializeNonStreaming.cs.md)

In this example, the deserializer buffers all `IAsyncEnumerable<T>` contents in memory before returning the deserialized object. This behavior is necessary because the deserializer needs to read the entire JSON payload before returning a result.

### System.Collections.Immutable namespace

| Type | Serialization | Deserialization |
| --- | --- | --- |
| [System.Collections.Immutable.IImmutableDictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Immutable.IImmutableDictionary%602) † | ✔️ | ✔️ |
| [System.Collections.Immutable.IImmutableList`1](https://learn.microsoft.com/search/?terms=System.Collections.Immutable.IImmutableList%601) | ✔️ | ✔️ |
| [System.Collections.Immutable.IImmutableQueue`1](https://learn.microsoft.com/search/?terms=System.Collections.Immutable.IImmutableQueue%601) | ✔️ | ✔️ |
| [System.Collections.Immutable.IImmutableSet`1](https://learn.microsoft.com/search/?terms=System.Collections.Immutable.IImmutableSet%601) | ✔️ | ✔️ |
| [System.Collections.Immutable.IImmutableStack`1](https://learn.microsoft.com/search/?terms=System.Collections.Immutable.IImmutableStack%601) \* | ✔️ | ✔️ |
| [System.Collections.Immutable.ImmutableArray`1](https://learn.microsoft.com/search/?terms=System.Collections.Immutable.ImmutableArray%601) | ✔️ | ✔️ |
| [System.Collections.Immutable.ImmutableDictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Immutable.ImmutableDictionary%602) † | ✔️ | ✔️ |
| [System.Collections.Immutable.ImmutableHashSet`1](https://learn.microsoft.com/search/?terms=System.Collections.Immutable.ImmutableHashSet%601) | ✔️ | ✔️ |
| [System.Collections.Immutable.ImmutableQueue`1](https://learn.microsoft.com/search/?terms=System.Collections.Immutable.ImmutableQueue%601) | ✔️ | ✔️ |
| [System.Collections.Immutable.ImmutableSortedDictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Immutable.ImmutableSortedDictionary%602) † | ✔️ | ✔️ |
| [System.Collections.Immutable.ImmutableSortedSet`1](https://learn.microsoft.com/search/?terms=System.Collections.Immutable.ImmutableSortedSet%601) | ✔️ | ✔️ |
| [System.Collections.Immutable.ImmutableStack`1](https://learn.microsoft.com/search/?terms=System.Collections.Immutable.ImmutableStack%601) \* | ✔️ | ✔️ |

\* See [Support round trip for `Stack` types](converters-how-to.md#support-round-trip-for-stack-types).

† See [Supported key types](#supported-key-types).

### System.Collections.Specialized namespace

| Type | Serialization | Deserialization |
| --- | --- | --- |
| [System.Collections.Specialized.BitVector32](https://learn.microsoft.com/search/?terms=System.Collections.Specialized.BitVector32) | ✔️ | ❌\* |
| [System.Collections.Specialized.HybridDictionary](https://learn.microsoft.com/search/?terms=System.Collections.Specialized.HybridDictionary) | ✔️ | ✔️ |
| [System.Collections.Specialized.IOrderedDictionary](https://learn.microsoft.com/search/?terms=System.Collections.Specialized.IOrderedDictionary) | ✔️ | ❌ |
| [System.Collections.Specialized.ListDictionary](https://learn.microsoft.com/search/?terms=System.Collections.Specialized.ListDictionary) | ✔️ | ✔️ |
| [System.Collections.Specialized.NameValueCollection](https://learn.microsoft.com/search/?terms=System.Collections.Specialized.NameValueCollection) | ✔️ | ❌ |
| [System.Collections.Specialized.StringCollection](https://learn.microsoft.com/search/?terms=System.Collections.Specialized.StringCollection) | ✔️ | ❌ |
| [System.Collections.Specialized.StringDictionary](https://learn.microsoft.com/search/?terms=System.Collections.Specialized.StringDictionary) | ✔️ | ❌ |

\* When [System.Collections.Specialized.BitVector32](https://learn.microsoft.com/search/?terms=System.Collections.Specialized.BitVector32) is deserialized, the [System.Collections.Specialized.BitVector32.Data](https://learn.microsoft.com/search/?terms=System.Collections.Specialized.BitVector32.Data) property is skipped because it doesn't have a public setter. No exception is thrown.

### System.Collections.Concurrent namespace

| Type | Serialization | Deserialization |
| --- | --- | --- |
| [System.Collections.Concurrent.BlockingCollection`1](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.BlockingCollection%601) | ✔️ | ❌ |
| [System.Collections.Concurrent.ConcurrentBag`1](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.ConcurrentBag%601) | ✔️ | ❌ |
| [System.Collections.Concurrent.ConcurrentDictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.ConcurrentDictionary%602) † | ✔️ | ✔️ |
| [System.Collections.Concurrent.ConcurrentQueue`1](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.ConcurrentQueue%601) | ✔️ | ✔️ |
| [System.Collections.Concurrent.ConcurrentStack`1](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.ConcurrentStack%601) \* | ✔️ | ✔️ |

\* See [Support round trip for `Stack` types](converters-how-to.md#support-round-trip-for-stack-types).

† See [Supported key types](#supported-key-types).

### System.Collections.ObjectModel namespace

| Type | Serialization | Deserialization |
| --- | --- | --- |
| [System.Collections.ObjectModel.Collection`1](https://learn.microsoft.com/search/?terms=System.Collections.ObjectModel.Collection%601) | ✔️ | ✔️ |
| [KeyedCollection\<string, TValue>](https://learn.microsoft.com/search/?terms=System.Collections.ObjectModel.KeyedCollection%602) \* | ✔️ | ❌ |
| [System.Collections.ObjectModel.ObservableCollection`1](https://learn.microsoft.com/search/?terms=System.Collections.ObjectModel.ObservableCollection%601) | ✔️ | ✔️ |
| [System.Collections.ObjectModel.ReadOnlyCollection`1](https://learn.microsoft.com/search/?terms=System.Collections.ObjectModel.ReadOnlyCollection%601) | ✔️ | ❌ |
| [System.Collections.ObjectModel.ReadOnlyDictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.ObjectModel.ReadOnlyDictionary%602) | ✔️ | ❌ |
| [System.Collections.ObjectModel.ReadOnlyObservableCollection`1](https://learn.microsoft.com/search/?terms=System.Collections.ObjectModel.ReadOnlyObservableCollection%601) | ✔️ | ❌ |

\* Non-`string` keys are not supported.

### Custom collections

Any collection type that isn't in one of the preceding namespaces is considered a custom collection. Such types include user-defined types and types defined by ASP.NET Core. For example, [Microsoft.Extensions.Primitives](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Primitives) is in this group.

All custom collections (everything that derives from `IEnumerable`) are supported for serialization, as long as their element types are supported.

#### Deserialization support

A custom collection is supported for deserialization if it:

* Isn't an interface or abstract.
* Has a parameterless constructor.
* Contains element types that are supported by [System.Text.Json.JsonSerializer](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializer).
* Implements or inherits one or more of the following interfaces or classes:
  * [System.Collections.Concurrent.ConcurrentQueue`1](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.ConcurrentQueue%601)
  * [System.Collections.Concurrent.ConcurrentStack`1](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.ConcurrentStack%601) \*
  * [System.Collections.Generic.ICollection`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.ICollection%601)
  * [System.Collections.IDictionary](https://learn.microsoft.com/search/?terms=System.Collections.IDictionary)
  * [System.Collections.Generic.IDictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IDictionary%602) †
  * [System.Collections.IList](https://learn.microsoft.com/search/?terms=System.Collections.IList)
  * [System.Collections.Generic.IList`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IList%601)
  * [System.Collections.Queue](https://learn.microsoft.com/search/?terms=System.Collections.Queue)
  * [System.Collections.Generic.Queue`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.Queue%601)
  * [System.Collections.Stack](https://learn.microsoft.com/search/?terms=System.Collections.Stack) \*
  * [System.Collections.Generic.Stack`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.Stack%601) \*

  \* See [Support round trip for `Stack` types](converters-how-to.md#support-round-trip-for-stack-types).

  † See [Supported key types](#supported-key-types).

#### Known issues

There are known issues with the following custom collections:

* [System.Dynamic.ExpandoObject](https://learn.microsoft.com/search/?terms=System.Dynamic.ExpandoObject): See [dotnet/runtime#29690](https://github.com/dotnet/runtime/issues/29690).
* [System.Dynamic.DynamicObject](https://learn.microsoft.com/search/?terms=System.Dynamic.DynamicObject): See [dotnet/runtime#1808](https://github.com/dotnet/runtime/issues/1808).
* [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable): See [dotnet/docs#21366](https://github.com/dotnet/docs/issues/21366).
* [Microsoft.AspNetCore.Http.FormFile](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.FormFile): See [dotnet/runtime#1559](https://github.com/dotnet/runtime/issues/1559).
* [Microsoft.AspNetCore.Http.IFormCollection](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IFormCollection): See [dotnet/runtime#1559](https://github.com/dotnet/runtime/issues/1559).

For more information about known issues, see the [open issues in System.Text.Json](https://github.com/dotnet/runtime/issues?q=is%3Aopen+is%3Aissue+label%3Aarea-System.Text.Json).

### Supported key types

When used as the keys of `Dictionary` and `SortedList` types, the following types have built-in support:

* [System.Numerics.BFloat16](https://learn.microsoft.com/search/?terms=System.Numerics.BFloat16) (.NET 11 and later)
* `Boolean`
* `Byte`
* `DateTime`
* `DateTimeOffset`
* `Decimal`
* [System.Numerics.Decimal32](https://learn.microsoft.com/search/?terms=System.Numerics.Decimal32) (.NET 11 and later)
* [System.Numerics.Decimal64](https://learn.microsoft.com/search/?terms=System.Numerics.Decimal64) (.NET 11 and later)
* [System.Numerics.Decimal128](https://learn.microsoft.com/search/?terms=System.Numerics.Decimal128) (.NET 11 and later)
* `Double`
* `Enum`
* `Guid`
* `Int16`
* `Int32`
* `Int64`
* `Object` (Only on serialization and if the runtime type is one of the supported types in this list.)
* `SByte`
* `Single`
* `String`
* [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan)
* `UInt16`
* `UInt32`
* `UInt64`
* [System.Uri](https://learn.microsoft.com/search/?terms=System.Uri)
* [System.Version](https://learn.microsoft.com/search/?terms=System.Version)

In addition, the [System.Text.Json.Serialization.JsonConverter`1.WriteAsPropertyName(System.Text.Json.Utf8JsonWriter,`0,System.Text.Json.JsonSerializerOptions)](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonConverter%601.WriteAsPropertyName(System.Text.Json.Utf8JsonWriter%2C%600%2CSystem.Text.Json.JsonSerializerOptions)) and [System.Text.Json.Serialization.JsonConverter`1.ReadAsPropertyName(System.Text.Json.Utf8JsonReader@,System.Type,System.Text.Json.JsonSerializerOptions)](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonConverter%601.ReadAsPropertyName(System.Text.Json.Utf8JsonReader%40%2CSystem.Type%2CSystem.Text.Json.JsonSerializerOptions)) methods let you add dictionary key support for any type of your choosing.

## BFloat16 and decimal floating-point types

Starting in .NET 11, `System.Text.Json` includes built-in converters for the [System.Numerics.BFloat16](https://learn.microsoft.com/search/?terms=System.Numerics.BFloat16), [System.Numerics.Decimal32](https://learn.microsoft.com/search/?terms=System.Numerics.Decimal32), [System.Numerics.Decimal64](https://learn.microsoft.com/search/?terms=System.Numerics.Decimal64), and [System.Numerics.Decimal128](https://learn.microsoft.com/search/?terms=System.Numerics.Decimal128) types. Finite values serialize as JSON numbers.

These types behave like the other built-in numeric types:

* Dictionary-key conversion supports all four types.
* They honor [System.Text.Json.Serialization.JsonNumberHandling](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonNumberHandling), including the `"NaN"`, `"Infinity"`, and `"-Infinity"` literals through [System.Text.Json.Serialization.JsonNumberHandling.AllowNamedFloatingPointLiterals](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonNumberHandling.AllowNamedFloatingPointLiterals).

[System.Text.Json.Serialization.Metadata.JsonMetadataServices](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.Metadata.JsonMetadataServices) exposes converter properties for source-generated metadata. The properties are [System.Text.Json.Serialization.Metadata.JsonMetadataServices.BFloat16Converter](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.Metadata.JsonMetadataServices.BFloat16Converter), [System.Text.Json.Serialization.Metadata.JsonMetadataServices.Decimal32Converter](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.Metadata.JsonMetadataServices.Decimal32Converter), [System.Text.Json.Serialization.Metadata.JsonMetadataServices.Decimal64Converter](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.Metadata.JsonMetadataServices.Decimal64Converter), and [System.Text.Json.Serialization.Metadata.JsonMetadataServices.Decimal128Converter](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.Metadata.JsonMetadataServices.Decimal128Converter).

## F# discriminated unions

Starting in .NET 11, `System.Text.Json` serializes and deserializes F# discriminated unions, including class, struct, and recursive unions:

```fsharp
type Shape =
    | Point
    | Circle of radius: float
```

* A case without fields serializes as a JSON string that contains the case name, such as `"Point"`.
* A case that has fields serializes as a JSON object. The object contains a `$type` discriminator followed by the case's named fields, such as `{"$type":"Circle","radius":3.14}`.

[System.Text.Json.JsonSerializerOptions.PropertyNamingPolicy](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions.PropertyNamingPolicy) applies to case names and field names. A case-level [System.Text.Json.Serialization.JsonPropertyNameAttribute](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonPropertyNameAttribute) takes precedence. To use a discriminator property name other than `$type`, set [System.Text.Json.Serialization.JsonPolymorphicAttribute.TypeDiscriminatorPropertyName](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonPolymorphicAttribute.TypeDiscriminatorPropertyName).

> **Important:**
> F# discriminated union support is reflection-only. It requires dynamic code and untrimmed reflection metadata. You can't use it with `System.Text.Json` source generation or Native AOT.

## Unsupported types

The following types aren't supported for serialization:

* [System.Type](https://learn.microsoft.com/search/?terms=System.Type) and [System.Reflection.MemberInfo](https://learn.microsoft.com/search/?terms=System.Reflection.MemberInfo)
* [System.ReadOnlySpan`1](https://learn.microsoft.com/search/?terms=System.ReadOnlySpan%601), [System.Span`1](https://learn.microsoft.com/search/?terms=System.Span%601), and ref structs in general
* Delegate types
* [System.IntPtr](https://learn.microsoft.com/search/?terms=System.IntPtr) and [System.UIntPtr](https://learn.microsoft.com/search/?terms=System.UIntPtr)

### System.Data namespace

There are no built-in converters for [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet), [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable), and related types in the [System.Data](https://learn.microsoft.com/search/?terms=System.Data) namespace. Deserializing these types from untrusted input is not safe, as explained in [the security guidance](../../../framework/data/adonet/dataset-datatable-dataview/security-guidance.md#safety-with-regard-to-untrusted-input). However, you can write a custom converter to support these types. For sample custom converter code that serializes and deserializes a `DataTable`, see [RoundtripDataTable.cs](https://github.com/dotnet/docs/blob/main/docs/standard/serialization/system-text-json/snippets/how-to/csharp/RoundtripDataTable.cs).

## See also

* [Populate initialized properties](populate-properties.md)
* [System.Text.Json overview](overview.md)
* [System.Text.Json API reference](https://learn.microsoft.com/search/?terms=System.Text.Json)
* [System.Text.Json.Serialization API reference](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization)
