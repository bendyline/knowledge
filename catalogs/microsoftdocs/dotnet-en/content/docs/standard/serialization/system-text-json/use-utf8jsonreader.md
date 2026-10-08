---
title: How to use Utf8JsonReader in System.Text.Json
description: "Learn how to use Utf8JsonReader."
ms.date: 06/19/2023
no-loc: [System.Text.Json, Newtonsoft.Json]
dev_langs:
  - "csharp"
  - "vb"
ms.topic: how-to
---

# How to use Utf8JsonReader in System.Text.Json

This article shows how you can use the [System.Text.Json.Utf8JsonReader](https://learn.microsoft.com/search/?terms=System.Text.Json.Utf8JsonReader) type for building custom parsers and deserializers.

[System.Text.Json.Utf8JsonReader](https://learn.microsoft.com/search/?terms=System.Text.Json.Utf8JsonReader) is a high-performance, low allocation, forward-only reader for UTF-8 encoded JSON text. The text is read from a `ReadOnlySpan<byte>` or `ReadOnlySequence<byte>`. `Utf8JsonReader` is a low-level type that can be used to build custom parsers and deserializers. (The [System.Text.Json.JsonSerializer.Deserialize*](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializer.Deserialize*) methods use `Utf8JsonReader` under the covers.)

The following example shows how to use the [System.Text.Json.Utf8JsonReader](https://learn.microsoft.com/search/?terms=System.Text.Json.Utf8JsonReader) class. This code assumes that the `jsonUtf8Bytes` variable is a byte array that contains valid JSON, encoded as UTF-8.

[language="csharp" source="snippets/how-to/csharp/Utf8ReaderFromBytes.cs" id="Deserialize"::: (complete source file; reference: snippets/how-to/csharp/Utf8ReaderFromBytes.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to/csharp/Utf8ReaderFromBytes.cs.md)
[language="vb" source="snippets/how-to/vb/Utf8ReaderFromBytes.vb" id="Deserialize"::: (complete source file; reference: snippets/how-to/vb/Utf8ReaderFromBytes.vb)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to/vb/Utf8ReaderFromBytes.vb.md)

> **Note:**
> `Utf8JsonReader` can't be used directly from Visual Basic code. For more information, see [Visual Basic support](visual-basic-support.md).

## Filter data using `Utf8JsonReader`

The following example shows how to synchronously read a file and search for a value.

[language="csharp" source="snippets/how-to/csharp/Utf8ReaderFromFile.cs"::: (complete source file; reference: snippets/how-to/csharp/Utf8ReaderFromFile.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to/csharp/Utf8ReaderFromFile.cs.md)
[language="vb" source="snippets/how-to/vb/Utf8ReaderFromFile.vb"::: (complete source file; reference: snippets/how-to/vb/Utf8ReaderFromFile.vb)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to/vb/Utf8ReaderFromFile.vb.md)

The preceding code:

* Assumes the JSON contains an array of objects, and each object might contain a "name" property of type string.
* Counts objects and "name" property values that end with "University".
* Assumes the file is encoded as UTF-16 and transcodes it into UTF-8.

  A file encoded as UTF-8 can be read directly into a `ReadOnlySpan<byte>` by using the following code:

  ```csharp
  ReadOnlySpan<byte> jsonReadOnlySpan = File.ReadAllBytes(fileName);
  ```

  If the file contains a UTF-8 byte order mark (BOM), remove it before passing the bytes to the `Utf8JsonReader`, since the reader expects text. Otherwise, the BOM is considered invalid JSON, and the reader throws an exception.

Here's a JSON sample that the preceding code can read. The resulting summary message is "2 out of 4 have names that end with 'University'":

[language="json" source="snippets/how-to/csharp/Universities.json"::: (complete source file; reference: snippets/how-to/csharp/Universities.json)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to/csharp/Universities.json.md)

> **Tip:**
> For an asynchronous version of this example, see [.NET samples JSON project](https://github.com/dotnet/samples/blob/18e31a5f1abd4f347bf96bfdc3e40e2cfb36e319/core/json/Program.cs).

## Read from a stream using `Utf8JsonReader`

When reading a large file (a gigabyte or more in size, for example), you might want to avoid loading the entire file into memory at once. For this scenario, you can use a [System.IO.FileStream](https://learn.microsoft.com/search/?terms=System.IO.FileStream).

When using the `Utf8JsonReader` to read from a stream, the following rules apply:

* The buffer containing the partial JSON payload must be at least as large as the largest JSON token within it so that the reader can make forward progress.
* The buffer must be at least as large as the largest sequence of white space within the JSON.
* The reader doesn't keep track of the data it has read until it completely reads the next [System.Text.Json.Utf8JsonReader.TokenType](https://learn.microsoft.com/search/?terms=System.Text.Json.Utf8JsonReader.TokenType) in the JSON payload. So when there are bytes left over in the buffer, you have to pass them to the reader again. You can use [System.Text.Json.Utf8JsonReader.BytesConsumed*](https://learn.microsoft.com/search/?terms=System.Text.Json.Utf8JsonReader.BytesConsumed*) to determine how many bytes are left over.

The following code illustrates how to read from a stream. The example shows a [System.IO.MemoryStream](https://learn.microsoft.com/search/?terms=System.IO.MemoryStream). Similar code will work with a [System.IO.FileStream](https://learn.microsoft.com/search/?terms=System.IO.FileStream), except when the `FileStream` contains a UTF-8 BOM at the start. In that case, you need to strip those three bytes from the buffer before passing the remaining bytes to the `Utf8JsonReader`. Otherwise the reader would throw an exception, since the BOM is not considered a valid part of the JSON.

The sample code starts with a 4 KB buffer and doubles the buffer size each time it finds that the size is not large enough to fit a complete JSON token, which is required for the reader to make forward progress on the JSON payload. The JSON sample provided in the snippet triggers a buffer size increase only if you set a very small initial buffer size, for example, 10 bytes. If you set the initial buffer size to 10, the `Console.WriteLine` statements illustrate the cause and effect of buffer size increases. At the 4 KB initial buffer size, the entire sample JSON is shown by each call to `Console.WriteLine`, and the buffer size never has to be increased.

[language="csharp" source="snippets/how-to/csharp/Utf8ReaderPartialRead.cs"::: (complete source file; reference: snippets/how-to/csharp/Utf8ReaderPartialRead.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to/csharp/Utf8ReaderPartialRead.cs.md)
[language="vb" source="snippets/how-to/vb/Utf8ReaderPartialRead.vb"::: (complete source file; reference: snippets/how-to/vb/Utf8ReaderPartialRead.vb)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to/vb/Utf8ReaderPartialRead.vb.md)

The preceding example sets no limit to how large the buffer can grow. If the token size is too large, the code could fail with an [System.OutOfMemoryException](https://learn.microsoft.com/search/?terms=System.OutOfMemoryException) exception. This can happen if the JSON contains a token that is around 1 GB or more in size, because doubling the 1 GB size results in a size that is too large to fit into an `int32` buffer.

## ref struct limitations

Because the `Utf8JsonReader` type is a `ref struct`, it has [certain limitations](../../../csharp/language-reference/builtin-types/ref-struct.md). For example, it can't be stored as a field on a class or struct other than a `ref struct`.

To achieve high performance, `Utf8JsonReader` must be a `ref struct`, because it needs to cache the input [ReadOnlySpan\<byte>](https://learn.microsoft.com/search/?terms=System.ReadOnlySpan%601) (which itself is a `ref struct`). In addition, the `Utf8JsonReader` type is mutable since it holds state. Therefore, **pass it by reference** rather than by value. Passing the `Utf8JsonReader` by value would result in a struct copy, and the state changes wouldn't be visible to the caller.

For more information about how to use ref structs, see [Avoid allocations](../../../csharp/advanced-topics/performance/index.md).

## Read UTF-8 text

To achieve the best possible performance while using `Utf8JsonReader`, read JSON payloads already encoded as UTF-8 text rather than as UTF-16 strings. For a code example, see [Filter data using Utf8JsonReader](#filter-data-using-utf8jsonreader).

## Read with multi-segment ReadOnlySequence

If your JSON input is a [ReadOnlySpan\<byte>](https://learn.microsoft.com/search/?terms=System.ReadOnlySpan%601), each JSON element can be accessed from the `ValueSpan` property on the reader as you go through the read loop. However, if your input is a [ReadOnlySequence\<byte>](https://learn.microsoft.com/search/?terms=System.Buffers.ReadOnlySequence%601) (which is the result of reading from a [System.IO.Pipelines.PipeReader](https://learn.microsoft.com/search/?terms=System.IO.Pipelines.PipeReader)), some JSON elements might straddle multiple segments of the `ReadOnlySequence<byte>` object. These elements would not be accessible from [System.Text.Json.Utf8JsonReader.ValueSpan*](https://learn.microsoft.com/search/?terms=System.Text.Json.Utf8JsonReader.ValueSpan*) in a contiguous memory block. Instead, whenever you have a multi-segment `ReadOnlySequence<byte>` as input, poll the [System.Text.Json.Utf8JsonReader.HasValueSequence](https://learn.microsoft.com/search/?terms=System.Text.Json.Utf8JsonReader.HasValueSequence) property on the reader to figure out how to access the current JSON element. Here's a recommended pattern:

```csharp
while (reader.Read())
{
    switch (reader.TokenType)
    {
        // ...
        ReadOnlySpan<byte> jsonElement = reader.HasValueSequence ?
            reader.ValueSequence.ToArray() :
            reader.ValueSpan;
        // ...
    }
}
```

## Read multiple JSON documents

In .NET 9 and later versions, you can read multiple, white space&ndash;separated JSON documents from a single buffer or stream. By default, `Utf8JsonReader` throws an exception if it detects any non-white-space characters that trail the first top-level document. However, you can configure that behavior using the [System.Text.Json.JsonReaderOptions.AllowMultipleValues](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonReaderOptions.AllowMultipleValues) flag.

[language="csharp" source="snippets/use-dom-utf8jsonreader-utf8jsonwriter/csharp/ReadMultipleDocs.cs" id="Snippet1"::: (complete source file; reference: snippets/use-dom-utf8jsonreader-utf8jsonwriter/csharp/ReadMultipleDocs.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/use-dom-utf8jsonreader-utf8jsonwriter/csharp/ReadMultipleDocs.cs.md)

When [System.Text.Json.JsonReaderOptions.AllowMultipleValues](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonReaderOptions.AllowMultipleValues) is set to `true`, you can also read JSON from payloads that contain trailing data that's invalid JSON.

[language="csharp" source="snippets/use-dom-utf8jsonreader-utf8jsonwriter/csharp/ReadMultipleDocs.cs" id="Snippet2"::: (complete source file; reference: snippets/use-dom-utf8jsonreader-utf8jsonwriter/csharp/ReadMultipleDocs.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/use-dom-utf8jsonreader-utf8jsonwriter/csharp/ReadMultipleDocs.cs.md)

To stream multiple top-level values, use the [System.Text.Json.JsonSerializer.DeserializeAsyncEnumerable``1(System.IO.Stream,System.Boolean,System.Text.Json.JsonSerializerOptions,System.Threading.CancellationToken)](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializer.DeserializeAsyncEnumerable%60%601(System.IO.Stream%2CSystem.Boolean%2CSystem.Text.Json.JsonSerializerOptions%2CSystem.Threading.CancellationToken)) or [System.Text.Json.JsonSerializer.DeserializeAsyncEnumerable``1(System.IO.Stream,System.Text.Json.Serialization.Metadata.JsonTypeInfo{``0},System.Boolean,System.Threading.CancellationToken)](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializer.DeserializeAsyncEnumerable%60%601(System.IO.Stream%2CSystem.Text.Json.Serialization.Metadata.JsonTypeInfo%7B%60%600%7D%2CSystem.Boolean%2CSystem.Threading.CancellationToken)) overload. By default, `DeserializeAsyncEnumerable` attempts to stream elements that are contained in a single, top-level JSON array. Pass `true` for the `topLevelValues` parameter to stream multiple top-level values.

[language="csharp" source="snippets/use-dom-utf8jsonreader-utf8jsonwriter/csharp/ReadMultipleDocs.cs" id="Snippet3"::: (complete source file; reference: snippets/use-dom-utf8jsonreader-utf8jsonwriter/csharp/ReadMultipleDocs.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/use-dom-utf8jsonreader-utf8jsonwriter/csharp/ReadMultipleDocs.cs.md)

## Property name lookups

To look up property names, don't use [System.Text.Json.Utf8JsonReader.ValueSpan*](https://learn.microsoft.com/search/?terms=System.Text.Json.Utf8JsonReader.ValueSpan*) to do byte-by-byte comparisons by calling [System.MemoryExtensions.SequenceEqual*](https://learn.microsoft.com/search/?terms=System.MemoryExtensions.SequenceEqual*). Instead, call [System.Text.Json.Utf8JsonReader.ValueTextEquals*](https://learn.microsoft.com/search/?terms=System.Text.Json.Utf8JsonReader.ValueTextEquals*), because this method unescapes any characters that are escaped in the JSON. Here's an example that shows how to search for a property that's named "name":

[language="csharp" source="snippets/how-to/csharp/ValueTextEqualsExample.cs" id="DefineUtf8Var"::: (complete source file; reference: snippets/how-to/csharp/ValueTextEqualsExample.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to/csharp/ValueTextEqualsExample.cs.md)

[language="csharp" source="snippets/how-to/csharp/ValueTextEqualsExample.cs" id="UseUtf8Var" highlight="9"::: (complete source file; reference: snippets/how-to/csharp/ValueTextEqualsExample.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to/csharp/ValueTextEqualsExample.cs.md)

## Read null values into nullable value types

The built-in `System.Text.Json` APIs return only non-nullable value types. For example, [System.Text.Json.Utf8JsonReader.GetBoolean*](https://learn.microsoft.com/search/?terms=System.Text.Json.Utf8JsonReader.GetBoolean*) returns a `bool`. It throws an exception if it finds `Null` in the JSON. The following examples show two ways to handle nulls, one by returning a nullable value type and one by returning the default value:

```csharp
public bool? ReadAsNullableBoolean()
{
    _reader.Read();
    if (_reader.TokenType == JsonTokenType.Null)
    {
        return null;
    }
    if (_reader.TokenType != JsonTokenType.True && _reader.TokenType != JsonTokenType.False)
    {
        throw new JsonException();
    }
    return _reader.GetBoolean();
}
```

```csharp
public bool ReadAsBoolean(bool defaultValue)
{
    _reader.Read();
    if (_reader.TokenType == JsonTokenType.Null)
    {
        return defaultValue;
    }
    if (_reader.TokenType != JsonTokenType.True && _reader.TokenType != JsonTokenType.False)
    {
        throw new JsonException();
    }
    return _reader.GetBoolean();
}
```

## Skip children of token

Use the [System.Text.Json.Utf8JsonReader.Skip](https://learn.microsoft.com/search/?terms=System.Text.Json.Utf8JsonReader.Skip) method to skip the children of the current JSON token. If the token type is [System.Text.Json.JsonTokenType.PropertyName](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonTokenType.PropertyName), the reader moves to the property value. The following code snippet shows an example of using [System.Text.Json.Utf8JsonReader.Skip](https://learn.microsoft.com/search/?terms=System.Text.Json.Utf8JsonReader.Skip) to move the reader to the value of a property.

[language="csharp" source="snippets/how-to/csharp/Utf8ReaderSkip.cs" id="Snippet1"::: (complete source file; reference: snippets/how-to/csharp/Utf8ReaderSkip.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to/csharp/Utf8ReaderSkip.cs.md)

## Consume decoded JSON strings

Starting in .NET 7, you can use the [System.Text.Json.Utf8JsonReader.CopyString*](https://learn.microsoft.com/search/?terms=System.Text.Json.Utf8JsonReader.CopyString*) method instead of [System.Text.Json.Utf8JsonReader.GetString](https://learn.microsoft.com/search/?terms=System.Text.Json.Utf8JsonReader.GetString) to consume a decoded JSON string. Unlike [System.Text.Json.Utf8JsonReader.GetString](https://learn.microsoft.com/search/?terms=System.Text.Json.Utf8JsonReader.GetString), which always allocates a new string, [System.Text.Json.Utf8JsonReader.CopyString*](https://learn.microsoft.com/search/?terms=System.Text.Json.Utf8JsonReader.CopyString*) lets you copy the unescaped string to a buffer that you own. The following code snippet shows an example of consuming a UTF-16 string using [System.Text.Json.Utf8JsonReader.CopyString*](https://learn.microsoft.com/search/?terms=System.Text.Json.Utf8JsonReader.CopyString*).

[language="csharp" source="snippets/how-to/csharp/Utf8ReaderCopyString.cs" id="Snippet1"::: (complete source file; reference: snippets/how-to/csharp/Utf8ReaderCopyString.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to/csharp/Utf8ReaderCopyString.cs.md)

## Related APIs

* To deserialize a custom type from a `Utf8JsonReader` instance, call [System.Text.Json.JsonSerializer.Deserialize``1(System.Text.Json.Utf8JsonReader@,System.Text.Json.JsonSerializerOptions)](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializer.Deserialize%60%601(System.Text.Json.Utf8JsonReader%40%2CSystem.Text.Json.JsonSerializerOptions)) or [System.Text.Json.JsonSerializer.Deserialize``1(System.Text.Json.Utf8JsonReader@,System.Text.Json.Serialization.Metadata.JsonTypeInfo{``0})](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializer.Deserialize%60%601(System.Text.Json.Utf8JsonReader%40%2CSystem.Text.Json.Serialization.Metadata.JsonTypeInfo%7B%60%600%7D)). For an example, see [Deserialize from UTF-8](deserialization.md#deserialize-from-utf-8).

* [System.Text.Json.Nodes.JsonNode](https://learn.microsoft.com/search/?terms=System.Text.Json.Nodes.JsonNode) and the classes that derive from it provide the ability to create a mutable DOM. You can convert a `Utf8JsonReader` instance to a `JsonNode` by calling [System.Text.Json.Nodes.JsonNode.Parse(System.Text.Json.Utf8JsonReader@,System.Nullable{System.Text.Json.Nodes.JsonNodeOptions})](https://learn.microsoft.com/search/?terms=System.Text.Json.Nodes.JsonNode.Parse(System.Text.Json.Utf8JsonReader%40%2CSystem.Nullable%7BSystem.Text.Json.Nodes.JsonNodeOptions%7D)). The following code snippet shows an example.

  [language="csharp" source="snippets/how-to/csharp/Utf8ReaderToJsonNode.cs"::: (complete source file; reference: snippets/how-to/csharp/Utf8ReaderToJsonNode.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to/csharp/Utf8ReaderToJsonNode.cs.md)

* [System.Text.Json.JsonDocument](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonDocument) provides the ability to build a read-only DOM by using `Utf8JsonReader`. Call the [System.Text.Json.JsonDocument.ParseValue(System.Text.Json.Utf8JsonReader@)](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonDocument.ParseValue(System.Text.Json.Utf8JsonReader%40)) method to parse a `JsonDocument` from a `Utf8JsonReader` instance. You can access the JSON elements that compose the payload via the [System.Text.Json.JsonElement](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonElement) type. For example code that uses [System.Text.Json.JsonDocument.ParseValue(System.Text.Json.Utf8JsonReader@)](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonDocument.ParseValue(System.Text.Json.Utf8JsonReader%40)), see [RoundtripDataTable.cs](https://github.com/dotnet/docs/blob/main/docs/standard/serialization/system-text-json/snippets/how-to/csharp/RoundtripDataTable.cs) and the code snippet in [Deserialize inferred types to object properties](converters-how-to.md#deserialize-inferred-types-to-object-properties).

* You can also parse a `Utf8JsonReader` instance to a [System.Text.Json.JsonElement](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonElement), which represents a specific JSON value, by calling [System.Text.Json.JsonElement.ParseValue(System.Text.Json.Utf8JsonReader@)](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonElement.ParseValue(System.Text.Json.Utf8JsonReader%40)).

## See also

* [How to use Utf8JsonWriter in System.Text.Json](use-utf8jsonwriter.md)
