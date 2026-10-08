---
title: JSON schema exporter
description: Learn how to use the JsonSchemaExporter class to extract JSON schema documents from .NET types.
ms.date: 09/24/2026
ai-usage: ai-assisted
dev_langs:
  - "csharp"
---

# JSON schema exporter

The [System.Text.Json.Schema.JsonSchemaExporter](https://learn.microsoft.com/search/?terms=System.Text.Json.Schema.JsonSchemaExporter) class, introduced in .NET 9, lets you extract [JSON schema](https://json-schema.org/) documents from .NET types using either a [System.Text.Json.JsonSerializerOptions](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions) or [System.Text.Json.Serialization.Metadata.JsonTypeInfo](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.Metadata.JsonTypeInfo) instance. The resultant schema provides a specification of the JSON serialization contract for the .NET type. The schema describes the shape of what would be serialized and what can be deserialized.

The following code snippet shows an example.

[language="csharp" source="snippets/schema-exporter/ExportSchema.cs" id="1"::: (complete source file; reference: snippets/schema-exporter/ExportSchema.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/schema-exporter/ExportSchema.cs.md)

As can be seen in this example, the exporter distinguishes between nullable and non-nullable properties, and it populates the `required` keyword by virtue of a constructor parameter being optional or not.

Starting in .NET 11, the exporter recognizes the [System.Numerics.BFloat16](https://learn.microsoft.com/search/?terms=System.Numerics.BFloat16), [System.Numerics.Decimal32](https://learn.microsoft.com/search/?terms=System.Numerics.Decimal32), [System.Numerics.Decimal64](https://learn.microsoft.com/search/?terms=System.Numerics.Decimal64), and [System.Numerics.Decimal128](https://learn.microsoft.com/search/?terms=System.Numerics.Decimal128) types. It exports schemas for their nullable forms and for named literals when you enable [System.Text.Json.Serialization.JsonNumberHandling.AllowNamedFloatingPointLiterals](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonNumberHandling.AllowNamedFloatingPointLiterals).

## Schemas for union types

Starting in .NET 11, [System.Text.Json.Schema.JsonSchemaExporter](https://learn.microsoft.com/search/?terms=System.Text.Json.Schema.JsonSchemaExporter) describes a C# [union](union-types.md) with an untagged `anyOf` schema that has a branch for each case. The union adds no discriminator because [System.Text.Json.JsonSerializer](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializer) writes only the active case. By contrast, when you [enable inference for a closed hierarchy](polymorphism.md#infer-polymorphism-from-a-closed-hierarchy), JSON serialized as the closed base type includes a `$type` discriminator that identifies the derived type. The `anyOf` described here is `JsonSchemaExporter` output; ASP.NET Core generates OpenAPI documents separately.

## Configure the schema output

You can influence the schema output by configuration specified in the [System.Text.Json.JsonSerializerOptions](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions) or [System.Text.Json.Serialization.Metadata.JsonTypeInfo](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.Metadata.JsonTypeInfo) instance that you call the [System.Text.Json.Schema.JsonSchemaExporter.GetJsonSchemaAsNode*](https://learn.microsoft.com/search/?terms=System.Text.Json.Schema.JsonSchemaExporter.GetJsonSchemaAsNode*) method on. The following example sets the naming policy to [System.Text.Json.JsonNamingPolicy.KebabCaseUpper](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonNamingPolicy.KebabCaseUpper), writes numbers as strings, and disallows unmapped properties.

[language="csharp" source="snippets/schema-exporter/ExportSchema.cs" id="2"::: (complete source file; reference: snippets/schema-exporter/ExportSchema.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/schema-exporter/ExportSchema.cs.md)

You can further control the generated schema using the [System.Text.Json.Schema.JsonSchemaExporterOptions](https://learn.microsoft.com/search/?terms=System.Text.Json.Schema.JsonSchemaExporterOptions) configuration type. The following example sets the [System.Text.Json.Schema.JsonSchemaExporterOptions.TreatNullObliviousAsNonNullable](https://learn.microsoft.com/search/?terms=System.Text.Json.Schema.JsonSchemaExporterOptions.TreatNullObliviousAsNonNullable) property to `true` to mark root-level types as non-nullable.

[language="csharp" source="snippets/schema-exporter/ExportSchema.cs" id="3"::: (complete source file; reference: snippets/schema-exporter/ExportSchema.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/schema-exporter/ExportSchema.cs.md)

## Transform the generated schema

You can apply your own transformations to generated schema nodes by specifying a [System.Text.Json.Schema.JsonSchemaExporterOptions.TransformSchemaNode](https://learn.microsoft.com/search/?terms=System.Text.Json.Schema.JsonSchemaExporterOptions.TransformSchemaNode) delegate. The following example incorporates text from [System.ComponentModel.DescriptionAttribute](https://learn.microsoft.com/search/?terms=System.ComponentModel.DescriptionAttribute) annotations into the generated schema.

[language="csharp" source="snippets/schema-exporter/TransformSchema.cs" id="1"::: (complete source file; reference: snippets/schema-exporter/TransformSchema.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/schema-exporter/TransformSchema.cs.md)

The following code example generates a schema that incorporates `description` keyword source from [System.ComponentModel.DescriptionAttribute](https://learn.microsoft.com/search/?terms=System.ComponentModel.DescriptionAttribute) annotations:

[language="csharp" source="snippets/schema-exporter/TransformSchema.cs" id="2"::: (complete source file; reference: snippets/schema-exporter/TransformSchema.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/schema-exporter/TransformSchema.cs.md)
[language="csharp" source="snippets/schema-exporter/TransformSchema.cs" id="Person"::: (complete source file; reference: snippets/schema-exporter/TransformSchema.cs)](../../../../_code/docs/standard/serialization/system-text-json/snippets/schema-exporter/TransformSchema.cs.md)
