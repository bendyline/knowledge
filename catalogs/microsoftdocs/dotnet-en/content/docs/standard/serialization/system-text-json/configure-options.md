---
title: How to instantiate JsonSerializerOptions with System.Text.Json
description: "Learn about constructors for JsonSerializerOptions instances and how to reuse JsonSerializerOptions instances."
ms.date: 02/07/2024
no-loc: [System.Text.Json]
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "JSON serialization"
  - "serializing objects"
  - "serialization"
  - "objects, serializing"
ms.topic: how-to
---

# How to instantiate JsonSerializerOptions instances with System.Text.Json

This article explains how to avoid performance problems when you use [System.Text.Json.JsonSerializerOptions](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions). It also shows how to use the parameterized constructors that are available.

## Reuse JsonSerializerOptions instances

If you use `JsonSerializerOptions` repeatedly with the same options, don't create a new `JsonSerializerOptions` instance each time you use it. Reuse the same instance for every call. This guidance applies to code you write for custom converters and when you call [System.Text.Json.JsonSerializer.Serialize*](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializer.Serialize*) or [System.Text.Json.JsonSerializer.Deserialize*](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializer.Deserialize*). It's safe to use the same instance across multiple threads. The metadata caches on the options instance are thread-safe, and the instance is immutable after the first serialization or deserialization.

## The `JsonSerializerOptions.Default` property

If the instance of `JsonSerializerOptions` that you need to use is the default instance (has all of the default settings and the default converters), use the [System.Text.Json.JsonSerializerOptions.Default](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions.Default) property rather than creating an options instance. For more information, see [Use default system converter](converters-how-to.md#use-default-system-converter).

## Copy JsonSerializerOptions

There is a [JsonSerializerOptions constructor](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions.%2523ctor\(System.Text.Json.JsonSerializerOptions\)) that lets you create a new instance with the same options as an existing instance, as shown in the following example:

[language="csharp" source="snippets/how-to-contd/csharp/CopyOptions.cs" highlight="28"::: (complete source file; reference: snippets/how-to-contd/csharp/CopyOptions.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to-contd/csharp/CopyOptions.cs.md)
[language="vb" source="snippets/how-to-contd/vb/CopyOptions.vb" ::: (complete source file; reference: snippets/how-to-contd/vb/CopyOptions.vb)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to-contd/vb/CopyOptions.vb.md)

The metadata cache of the existing `JsonSerializerOptions` instance isn't copied to the new instance. So using this constructor is not the same as reusing an existing instance of `JsonSerializerOptions`.

## Web defaults for JsonSerializerOptions

The following options have different defaults for web apps:

* [System.Text.Json.JsonSerializerOptions.PropertyNameCaseInsensitive*](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions.PropertyNameCaseInsensitive*) = `true`
* [System.Text.Json.JsonSerializerOptions.PropertyNamingPolicy](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions.PropertyNamingPolicy) = [System.Text.Json.JsonNamingPolicy.CamelCase](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonNamingPolicy.CamelCase)
* [System.Text.Json.JsonSerializerOptions.NumberHandling*](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions.NumberHandling*) = [System.Text.Json.Serialization.JsonNumberHandling.AllowReadingFromString](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonNumberHandling.AllowReadingFromString)

In .NET 9 and later versions, you can use the [System.Text.Json.JsonSerializerOptions.Web](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions.Web) singleton to serialize with the default options that ASP.NET Core uses for web apps. In earlier versions, call the [JsonSerializerOptions constructor](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions.%2523ctor\(System.Text.Json.JsonSerializerDefaults\)) to create a new instance with the web defaults, as shown in the following example:

[language="csharp" source="snippets/how-to-contd/csharp/OptionsDefaults.cs" highlight="23"::: (complete source file; reference: snippets/how-to-contd/csharp/OptionsDefaults.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to-contd/csharp/OptionsDefaults.cs.md)
[language="vb" source="snippets/how-to-contd/vb/OptionsDefaults.vb" ::: (complete source file; reference: snippets/how-to-contd/vb/OptionsDefaults.vb)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to-contd/vb/OptionsDefaults.vb.md)
