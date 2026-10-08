---
title: "Breaking change: System.Text.Json IAsyncEnumerable serialization"
description: Learn about the .NET 6 breaking change where the System.Text.Json supports IAsyncEnumerable serialization.
ms.date: 10/01/2021
---
# System.Text.Json IAsyncEnumerable serialization

[System.Text.Json](https://learn.microsoft.com/search/?terms=System.Text.Json) now supports serializing and deserializing of
[System.Collections.Generic.IAsyncEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IAsyncEnumerable%601) instances.

## Previous behavior

In previous versions, [System.Text.Json](https://learn.microsoft.com/search/?terms=System.Text.Json) serialized [System.Collections.Generic.IAsyncEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IAsyncEnumerable%601) instances as empty JSON objects (`{}`). Deserialization failed with a [System.Text.Json.JsonException](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonException).

## New behavior

Asynchronous serialization methods now enumerate any [System.Collections.Generic.IAsyncEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IAsyncEnumerable%601) instances in an object graph and then serialize them as JSON arrays. Synchronous serializations methods do not support [System.Collections.Generic.IAsyncEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IAsyncEnumerable%601) serialization and throw a [System.NotSupportedException](https://learn.microsoft.com/search/?terms=System.NotSupportedException).

## Version introduced

.NET 6

## Type of breaking change

This change can affect [source compatibility](../../categories.md#source-compatibility). If you retarget to .NET 6, you won't get any compile-time errors, but you may encounter runtime serialization behavior differences.

## Reason for change

This change was introduced to add support for streaming [System.Collections.Generic.IAsyncEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IAsyncEnumerable%601) responses in ASP.NET Core MVC.

## Recommended action

Check if your serialization models contain types that implement [System.Collections.Generic.IAsyncEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IAsyncEnumerable%601) and determine if emitting the enumeration in the JSON output is desirable. You can disable [System.Collections.Generic.IAsyncEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IAsyncEnumerable%601) serialization in one of the following ways:

- Attach a [System.Text.Json.Serialization.JsonIgnoreAttribute](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonIgnoreAttribute) to the property containing the [System.Collections.Generic.IAsyncEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IAsyncEnumerable%601).
- Define a [custom converter factory](../../../../standard/serialization/system-text-json/converters-how-to.md#sample-factory-pattern-converter) that serializes [System.Collections.Generic.IAsyncEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IAsyncEnumerable%601) instances as empty JSON objects.

## Affected APIs

- [System.Text.Json.JsonSerializer.SerializeAsync*](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializer.SerializeAsync*)
- [System.Text.Json.JsonSerializer.Serialize*](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializer.Serialize*)

## See also

- [System.Text.Json support for IAsyncEnumerable](https://devblogs.microsoft.com/dotnet/announcing-net-6-preview-4/#system-text-json-support-for-iasyncenumerable)
