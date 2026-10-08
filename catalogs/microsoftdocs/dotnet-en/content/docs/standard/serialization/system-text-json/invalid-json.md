---
title: How to allow some kinds of invalid JSON with System.Text.Json
description: "Learn how to allow comments, trailing commas, and quoted numbers while serializing to and deserializing from JSON in .NET."
ms.date: 12/03/2020
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

# How to allow some kinds of invalid JSON with System.Text.Json

In this article, you will learn how to allow comments, trailing commas, and quoted numbers in JSON, and how to write numbers as strings.

## Allow comments and trailing commas

By default, comments and trailing commas are not allowed in JSON. To allow comments in the JSON, set the [System.Text.Json.JsonSerializerOptions.ReadCommentHandling](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions.ReadCommentHandling) property to `JsonCommentHandling.Skip`.
And to allow trailing commas, set the [System.Text.Json.JsonSerializerOptions.AllowTrailingCommas](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions.AllowTrailingCommas) property to `true`. The following example shows how to allow both:

[language="csharp" source="snippets/how-to/csharp/DeserializeCommasComments.cs" id="Deserialize"::: (complete source file; reference: snippets/how-to/csharp/DeserializeCommasComments.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to/csharp/DeserializeCommasComments.cs.md)
[language="vb" source="snippets/how-to/vb/DeserializeCommasComments.vb" id="Deserialize"::: (complete source file; reference: snippets/how-to/vb/DeserializeCommasComments.vb)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to/vb/DeserializeCommasComments.vb.md)

Here's example JSON with comments and a trailing comma:

```json
{
  "Date": "2019-08-01T00:00:00-07:00",
  "TemperatureCelsius": 25, // Fahrenheit 77
  "Summary": "Hot", /* Zharko */
  // Comments on
  /* separate lines */
}
```

## Allow or write numbers in quotes

Some serializers encode numbers as JSON strings (surrounded by quotes).

For example:

```json
{
    "DegreesCelsius": "23"
}
```

Instead of:

```json
{
    "DegreesCelsius": 23
}
```

To serialize numbers in quotes or accept numbers in quotes across the entire input object graph, set [System.Text.Json.JsonSerializerOptions.NumberHandling*](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions.NumberHandling*) as shown in the following example:

[language="csharp" source="snippets/how-to-contd/csharp/QuotedNumbers.cs" highlight="26-28"::: (complete source file; reference: snippets/how-to-contd/csharp/QuotedNumbers.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to-contd/csharp/QuotedNumbers.cs.md)
[language="vb" source="snippets/how-to-contd/vb/QuotedNumbers.vb" ::: (complete source file; reference: snippets/how-to-contd/vb/QuotedNumbers.vb)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to-contd/vb/QuotedNumbers.vb.md)

When you use `System.Text.Json` indirectly through ASP.NET Core, quoted numbers are allowed when deserializing because ASP.NET Core specifies [web default options](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerDefaults.Web).

To allow or write quoted numbers for specific properties, fields, or types, use the [\[JsonNumberHandling\]](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonNumberHandlingAttribute) attribute.

## See also

* [System.Text.Json overview](overview.md)
* [How to serialize and deserialize JSON](how-to.md)
