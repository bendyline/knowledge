---
title: Include fields in serialization
description: "Learn how to include fields when you serialize to and deserialize from JSON in .NET."
ms.date: 10/19/2023
no-loc: [System.Text.Json, Newtonsoft.Json]
dev_langs:
  - "csharp"
  - "vb"
ms.topic: concept-article
---

# Include fields

By default, fields aren't serialized. Use the [System.Text.Json.JsonSerializerOptions.IncludeFields](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions.IncludeFields) global setting or the [\[JsonInclude\]](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonIncludeAttribute) attribute to include fields when serializing or deserializing, as shown in the following example:

[language="csharp" source="snippets/how-to-contd/csharp/Fields.cs" highlight="15,17,19,31-34"::: (complete source file; reference: snippets/how-to-contd/csharp/Fields.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to-contd/csharp/Fields.cs.md)
[language="vb" source="snippets/how-to-contd/vb/Fields.vb" ::: (complete source file; reference: snippets/how-to-contd/vb/Fields.vb)](../../../../_code/docs/standard/serialization/system-text-json/snippets/how-to-contd/vb/Fields.vb.md)

To ignore read-only fields, use the [System.Text.Json.JsonSerializerOptions.IgnoreReadOnlyFields*](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions.IgnoreReadOnlyFields*) global setting.
