---
title: "Breaking change: Date and time converters honor culture argument"
description: Learn about the globalization breaking change in .NET 8 where the type converters for date and time types use the argument-specified culture to format the date and time.
ms.date: 05/03/2023
---
# Date and time converters honor culture argument

The `ConvertTo` methods on the following classes now use the culture from the `culture` parameter as the format provider for the date and time instead of [System.Globalization.CultureInfo.CurrentCulture](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.CurrentCulture):

- [System.ComponentModel.DateOnlyConverter](https://learn.microsoft.com/search/?terms=System.ComponentModel.DateOnlyConverter)
- [System.ComponentModel.DateTimeConverter](https://learn.microsoft.com/search/?terms=System.ComponentModel.DateTimeConverter)
- [System.ComponentModel.DateTimeOffsetConverter](https://learn.microsoft.com/search/?terms=System.ComponentModel.DateTimeOffsetConverter)
- [System.ComponentModel.TimeOnlyConverter](https://learn.microsoft.com/search/?terms=System.ComponentModel.TimeOnlyConverter)

## Previous behavior

Previously, the [affected APIs](#affected-apis) used [System.Globalization.CultureInfo.CurrentCulture](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.CurrentCulture) as the format provider for the date and time even though the caller specified a culture in the `culture` parameter.

Consider the following code snippet that sets the current culture to Spanish (Spain) but passes a customized French culture to [System.ComponentModel.DateTimeConverter.ConvertTo(System.ComponentModel.ITypeDescriptorContext,System.Globalization.CultureInfo,System.Object,System.Type)](https://learn.microsoft.com/search/?terms=System.ComponentModel.DateTimeConverter.ConvertTo(System.ComponentModel.ITypeDescriptorContext%2CSystem.Globalization.CultureInfo%2CSystem.Object%2CSystem.Type)).

```csharp
CultureInfo.CurrentCulture = new CultureInfo("es-ES");
Console.WriteLine($"Current culture: {CultureInfo.CurrentCulture}");

var dt1 = new DateTime(2022, 8, 1);

var frCulture = new CultureInfo("fr-FR");
frCulture.DateTimeFormat.ShortDatePattern = "dd MMMM yyyy";

Console.WriteLine(TypeDescriptor.GetConverter(dt1).ConvertTo(null, frCulture, dt1, typeof(string)));
```

In .NET 7 and earlier versions, this code prints the date in the correct format but with the name of the month in Spanish instead of French:

```output
Current culture: es-ES
01 agosto 2022
```

## New behavior

Starting in .NET 8, the [affected APIs](#affected-apis) use the culture specified by the `culture` parameter as the format provider.

The code snippet shown in the [Previous behavior](#previous-behavior) correctly prints the name of the month in French:

```output
Current culture: es-ES
01 août 2022
```

## Version introduced

.NET 8 Preview 4

## Type of breaking change

This change is a [behavioral change](../../categories.md#behavioral-change).

## Reason for change

This change fixes a bug where `ConvertTo` was not consistent with `ConvertFrom`. It used the date and time format strings from the input culture but formatted the date and time with [System.Globalization.CultureInfo.CurrentCulture](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.CurrentCulture).

## Recommended action

If you relied on the previous behavior, pass in [System.Globalization.CultureInfo.CurrentCulture](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.CurrentCulture), `null`, or a custom culture for the `culture` parameter.

## Affected APIs

- [System.ComponentModel.DateOnlyConverter.ConvertTo(System.ComponentModel.ITypeDescriptorContext,System.Globalization.CultureInfo,System.Object,System.Type)](https://learn.microsoft.com/search/?terms=System.ComponentModel.DateOnlyConverter.ConvertTo(System.ComponentModel.ITypeDescriptorContext%2CSystem.Globalization.CultureInfo%2CSystem.Object%2CSystem.Type))
- [System.ComponentModel.DateTimeConverter.ConvertTo(System.ComponentModel.ITypeDescriptorContext,System.Globalization.CultureInfo,System.Object,System.Type)](https://learn.microsoft.com/search/?terms=System.ComponentModel.DateTimeConverter.ConvertTo(System.ComponentModel.ITypeDescriptorContext%2CSystem.Globalization.CultureInfo%2CSystem.Object%2CSystem.Type))
- [System.ComponentModel.DateTimeOffsetConverter.ConvertTo(System.ComponentModel.ITypeDescriptorContext,System.Globalization.CultureInfo,System.Object,System.Type)](https://learn.microsoft.com/search/?terms=System.ComponentModel.DateTimeOffsetConverter.ConvertTo(System.ComponentModel.ITypeDescriptorContext%2CSystem.Globalization.CultureInfo%2CSystem.Object%2CSystem.Type))
- [System.ComponentModel.TimeOnlyConverter.ConvertTo(System.ComponentModel.ITypeDescriptorContext,System.Globalization.CultureInfo,System.Object,System.Type)](https://learn.microsoft.com/search/?terms=System.ComponentModel.TimeOnlyConverter.ConvertTo(System.ComponentModel.ITypeDescriptorContext%2CSystem.Globalization.CultureInfo%2CSystem.Object%2CSystem.Type))
