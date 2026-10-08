---
title: Backing Fields - EF Core
description: Configuring backing fields for properties in an Entity Framework Core model
author: SamMonoRT
ms.date: 11/15/2021
uid: core/modeling/backing-field
---
# Backing Fields

Backing fields allow EF to read and/or write to a field rather than a property. This can be useful when encapsulation in the class is being used to restrict the use of and/or enhance the semantics around access to the data by application code, but the value should be read from and/or written to the database without using those restrictions/enhancements.

## Basic configuration

By convention, the following fields will be discovered as backing fields for a given property (listed in precedence order).

* `<camel-cased property name>`
* `_<camel-cased property name>`
* `_<property name>`
* `m_<camel-cased property name>`
* `m_<property name>`

In the following sample, the `Url` property is configured to have `_url` as its backing field:

[Main (complete source file; reference: ../../../samples/core/Modeling/BackingFields/BackingField.cs#Sample)](../../../_code/samples/core/Modeling/BackingFields/BackingField.cs.md)

Note that backing fields are only discovered for properties that are included in the model. For more information on which properties are included in the model, see [Including & Excluding Properties](https://learn.microsoft.com/search/?terms=core%2Fmodeling%2Fentity-properties%23included-and-excluded-properties).

You can also configure backing fields by using a [Data Annotations](https://learn.microsoft.com/search/?terms=core%2Fmodeling%2Findex%23use-data-annotations-to-configure-a-model) or the [Fluent API](https://learn.microsoft.com/search/?terms=core%2Fmodeling%2Findex%23use-fluent-api-to-configure-a-model), e.g. if the field name doesn't correspond to the above conventions:

### [Data Annotations](#tab/data-annotations)

[Main (complete source file; reference: ../../../samples/core/Modeling/BackingFields/DataAnnotations/BackingField.cs?name=BackingField\&highlight=7)](../../../_code/samples/core/Modeling/BackingFields/DataAnnotations/BackingField.cs.md)

### [Fluent API](#tab/fluent-api)

[Main (complete source file; reference: ../../../samples/core/Modeling/BackingFields/FluentAPI/BackingField.cs?name=BackingField\&highlight=5)](../../../_code/samples/core/Modeling/BackingFields/FluentAPI/BackingField.cs.md)

***

## Field and property access

By default, EF will always read and write to the backing field - assuming one has been properly configured - and will never use the property. However, EF also supports other access patterns. For example, the following sample instructs EF to write to the backing field only while materializing, and to use the property in all other cases:

[Main (complete source file; reference: ../../../samples/core/Modeling/BackingFields/FluentAPI/BackingFieldAccessMode.cs?name=BackingFieldAccessMode\&highlight=6)](../../../_code/samples/core/Modeling/BackingFields/FluentAPI/BackingFieldAccessMode.cs.md)

See the [PropertyAccessMode enum](https://learn.microsoft.com/dotnet/api/microsoft.entityframeworkcore.propertyaccessmode) for the complete set of supported options.

## Field-only properties

You can also create a conceptual property in your model that does not have a corresponding CLR property in the entity class, but instead uses a field to store the data in the entity. This is different from [Shadow Properties](shadow-properties.md), where the data is stored in the change tracker, rather than in the entity's CLR type. Field-only properties are commonly used when the entity class uses methods instead of properties to get/set values, or in cases where fields shouldn't be exposed at all in the domain model (e.g. primary keys).

You can configure a field-only property by providing a name in the `Property(...)` API:

[Main (complete source file; reference: ../../../samples/core/Modeling/BackingFields/FluentAPI/BackingFieldNoProperty.cs#Sample)](../../../_code/samples/core/Modeling/BackingFields/FluentAPI/BackingFieldNoProperty.cs.md)

EF will attempt to find a CLR property with the given name, or a field if a property isn't found. If neither a property nor a field are found, a shadow property will be set up instead.

You may need to refer to a field-only property from LINQ queries, but such fields are typically private. You can use the `EF.Property(...)` method in a LINQ query to refer to the field:

```csharp
var blogs = db.blogs.OrderBy(b => EF.Property<string>(b, "_validatedUrl"));
```
