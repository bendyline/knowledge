---
title: "How to serialize JSON in C#"
description: "Learn how to use the System.Text.Json namespace to serialize to JSON in .NET. Includes sample code."
ms.date: 11/20/2025
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
ms.custom: copilot-scenario-highlight
adobe-target: true
---

# How to write .NET objects as JSON (serialize)

This article shows how to use the [System.Text.Json](https://learn.microsoft.com/search/?terms=System.Text.Json) namespace to serialize to JavaScript Object Notation (JSON). If you're porting existing code from `Newtonsoft.Json`, see [How to migrate to `System.Text.Json`](migrate-from-newtonsoft.md).

> **Tip:**
> You can use AI assistance to [serialize to JSON](#use-ai-to-serialize-to-json).

To write JSON to a string or to a file, call the [System.Text.Json.JsonSerializer.Serialize*](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializer.Serialize*) method.

## Serialization examples

The following example creates JSON as a string:

[language="csharp" source="snippets/how-to/csharp/SerializeBasic.cs" id="all" highlight="23"::: (complete source file; reference: snippets/how-to/csharp/SerializeBasic.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to/csharp/SerializeBasic.cs.md)
[language="vb" source="snippets/how-to/vb/RoundtripToString.vb" id="Serialize"::: (complete source file; reference: snippets/how-to/vb/RoundtripToString.vb)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to/vb/RoundtripToString.vb.md)

The JSON output is *minified* (whitespace, indentation, and new-line characters are removed) by default.

The following example uses synchronous code to create a JSON file:

[language="csharp" source="snippets/how-to/csharp/SerializeToFile.cs" highlight="23-25"::: (complete source file; reference: snippets/how-to/csharp/SerializeToFile.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to/csharp/SerializeToFile.cs.md)
[language="vb" source="snippets/how-to/vb/RoundtripToFile.vb" id="Serialize"::: (complete source file; reference: snippets/how-to/vb/RoundtripToFile.vb)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to/vb/RoundtripToFile.vb.md)

The following example uses asynchronous code to create a JSON file:

[language="csharp" source="snippets/how-to/csharp/SerializeToFileAsync.cs" highlight="23-26"::: (complete source file; reference: snippets/how-to/csharp/SerializeToFileAsync.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to/csharp/SerializeToFileAsync.cs.md)
[language="vb" source="snippets/how-to/vb/RoundtripToFileAsync.vb" id="Serialize"::: (complete source file; reference: snippets/how-to/vb/RoundtripToFileAsync.vb)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to/vb/RoundtripToFileAsync.vb.md)

The preceding examples use type inference for the type being serialized. An overload of `Serialize()` takes a generic type parameter:

[language="csharp" source="snippets/how-to/csharp/SerializeWithGenericParameter.cs" highlight="23"::: (complete source file; reference: snippets/how-to/csharp/SerializeWithGenericParameter.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to/csharp/SerializeWithGenericParameter.cs.md)
[language="vb" source="snippets/how-to/vb/RoundtripToString.vb" id="SerializeWithGenericParameter"::: (complete source file; reference: snippets/how-to/vb/RoundtripToString.vb)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to/vb/RoundtripToString.vb.md)

You can also use AI to generate serialization code for you. For instructions, see the [Use AI](#use-ai-to-serialize-to-json) section in this article.

## Serialization behavior

* By default, all public properties are serialized. You can [specify properties to ignore](ignore-properties.md). You can also include [private members](immutability.md#non-public-members-and-property-accessors).
* The [default encoder](https://learn.microsoft.com/search/?terms=System.Text.Encodings.Web.JavaScriptEncoder.Default) escapes non-ASCII characters, HTML-sensitive characters within the ASCII-range, and characters that must be escaped according to [the RFC 8259 JSON spec](https://tools.ietf.org/html/rfc8259#section-7).
* By default, JSON is minified. You can [pretty-print the JSON](#serialize-to-formatted-json).
* By default, casing of JSON names matches the .NET names. You can [customize JSON name casing](customize-properties.md).
* By default, circular references are detected and exceptions thrown. You can [preserve references and handle circular references](preserve-references.md).
* By default, [fields](../../../csharp/programming-guide/classes-and-structs/fields.md) are ignored. You can [include fields](fields.md).

When you use System.Text.Json indirectly in an ASP.NET Core app, some default behaviors are different. For more information, see [Web defaults for JsonSerializerOptions](configure-options.md#web-defaults-for-jsonserializeroptions).

Supported types include:

* .NET primitives that map to JavaScript primitives, such as numeric types, strings, and Boolean.
* User-defined [plain old CLR objects (POCOs)](../../glossary.md#poco).
* One-dimensional and jagged arrays (`T[][]`).
* Collections and dictionaries from the following namespaces:

  * [System.Collections](https://learn.microsoft.com/search/?terms=System.Collections)
  * [System.Collections.Generic](https://learn.microsoft.com/search/?terms=System.Collections.Generic)
  * [System.Collections.Immutable](https://learn.microsoft.com/search/?terms=System.Collections.Immutable)
  * [System.Collections.Concurrent](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent)
  * [System.Collections.Specialized](https://learn.microsoft.com/search/?terms=System.Collections.Specialized)
  * [System.Collections.ObjectModel](https://learn.microsoft.com/search/?terms=System.Collections.ObjectModel)

  For more information, see [Supported types in System.Text.Json](supported-types.md).

You can [implement custom converters](converters-how-to.md) to handle additional types or to provide functionality that isn't supported by the built-in converters.

Here's an example showing how a class that contains collection properties and a user-defined type is serialized:

[language="csharp" source="snippets/how-to/csharp/SerializeExtra.cs" highlight="42-43"::: (complete source file; reference: snippets/how-to/csharp/SerializeExtra.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to/csharp/SerializeExtra.cs.md)
[language="vb" source="snippets/how-to/vb/WeatherForecast.vb" id="WFWithPOCOs"::: (complete source file; reference: snippets/how-to/vb/WeatherForecast.vb)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to/vb/WeatherForecast.vb.md)

## Serialize to UTF-8

It's 5-10% faster to serialize to a UTF-8 byte array than to use the string-based methods. That's because the bytes (as UTF-8) don't need to be converted to strings (UTF-16).

To serialize to a UTF-8 byte array, call the [System.Text.Json.JsonSerializer.SerializeToUtf8Bytes*](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializer.SerializeToUtf8Bytes*) method:

[language="csharp" source="snippets/how-to/csharp/RoundtripToUtf8.cs" id="Serialize"::: (complete source file; reference: snippets/how-to/csharp/RoundtripToUtf8.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to/csharp/RoundtripToUtf8.cs.md)
[language="vb" source="snippets/how-to/vb/RoundtripToUtf8.vb" id="Serialize"::: (complete source file; reference: snippets/how-to/vb/RoundtripToUtf8.vb)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to/vb/RoundtripToUtf8.vb.md)

A [System.Text.Json.JsonSerializer.Serialize*](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializer.Serialize*) overload that takes a [System.Text.Json.Utf8JsonWriter](https://learn.microsoft.com/search/?terms=System.Text.Json.Utf8JsonWriter) is also available.

## Serialize to formatted JSON

To pretty-print the JSON output, set [System.Text.Json.JsonSerializerOptions.WriteIndented](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions.WriteIndented) to `true`:

[language="csharp" source="snippets/how-to/csharp/SerializeWriteIndented.cs" highlight="24"::: (complete source file; reference: snippets/how-to/csharp/SerializeWriteIndented.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to/csharp/SerializeWriteIndented.cs.md)
[language="vb" source="snippets/how-to/vb/RoundtripToString.vb" id="SerializePrettyPrint"::: (complete source file; reference: snippets/how-to/vb/RoundtripToString.vb)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to/vb/RoundtripToString.vb.md)

Starting in .NET 9, you can also customize the indent character and size using [System.Text.Json.JsonSerializerOptions.IndentCharacter](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions.IndentCharacter) and [System.Text.Json.JsonSerializerOptions.IndentSize](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions.IndentSize).

> **Tip:**
> If you use `JsonSerializerOptions` repeatedly with the same options, don't create a new `JsonSerializerOptions` instance each time you use it. Reuse the same instance for every call. For more information, see [Reuse JsonSerializerOptions instances](configure-options.md#reuse-jsonserializeroptions-instances).

## Use AI to serialize to JSON

You can use AI tools, such as GitHub Copilot, to generate code that uses `System.Text.Json` to serialize to JSON. You can customize the prompt to fit your object fields and serialization needs.

Here's an example prompt you can use to generate serialization code:

```copilot-prompt
I have a variable named weatherForecast of type WeatherForecast.
Serialize the variable using System.Text.Json and write the result directly to a file named "output.json" with the JSON indented for pretty formatting.
Ensure the code includes all necessary using directives and compiles without errors.
```

Review Copilot's suggestions before applying them.

For more information about GitHub Copilot, see GitHub's [FAQs](https://github.com/features/copilot#faq).

## See also

- [GitHub Copilot in Visual Studio](https://learn.microsoft.com/visualstudio/ide/visual-studio-github-copilot-install-and-states)
- [GitHub Copilot in Visual Studio Code](https://code.visualstudio.com/docs/copilot/overview)
