---
title: How to enable case-insensitive property name matching with System.Text.Json
description: "Learn how to enable case-insensitive property name matching while serializing to and deserializing from JSON in .NET."
ms.date: 07/26/2021
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
---

# How to enable case-insensitive property name matching with System.Text.Json

In this article, you learn how to enable case-insensitive property name matching with the `System.Text.Json` namespace.

## Case-insensitive property matching

By default, deserialization looks for case-sensitive property name matches between JSON and the target object properties. To change that behavior, set [System.Text.Json.JsonSerializerOptions.PropertyNameCaseInsensitive](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions.PropertyNameCaseInsensitive) to `true`:

> **Note:**
> The [web default](configure-options.md#web-defaults-for-jsonserializeroptions) is case-insensitive.

[language="csharp" source="snippets/how-to/csharp/DeserializeCaseInsensitive.cs" id="Deserialize"::: (complete source file; reference: snippets/how-to/csharp/DeserializeCaseInsensitive.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to/csharp/DeserializeCaseInsensitive.cs.md)
[language="vb" source="snippets/how-to/vb/DeserializeCaseInsensitive.vb" id="Deserialize"::: (complete source file; reference: snippets/how-to/vb/DeserializeCaseInsensitive.vb)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to/vb/DeserializeCaseInsensitive.vb.md)

Here's example JSON with camel case property names. It can be deserialized into the following type that has Pascal case property names.

```json
{
  "date": "2019-08-01T00:00:00-07:00",
  "temperatureCelsius": 25,
  "summary": "Hot"
}
```

[language="csharp" source="snippets/how-to/csharp/WeatherForecast.cs" id="WF"::: (complete source file; reference: snippets/how-to/csharp/WeatherForecast.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to/csharp/WeatherForecast.cs.md)
[language="vb" source="snippets/how-to/vb/WeatherForecast.vb" id="WF"::: (complete source file; reference: snippets/how-to/vb/WeatherForecast.vb)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to/vb/WeatherForecast.vb.md)

## See also

* [System.Text.Json overview](overview.md)
* [How to serialize and deserialize JSON](how-to.md)
