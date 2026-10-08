---
title: "Breaking change: DateOnly and TimeOnly TryParse methods throw for invalid input"
description: "Learn about the breaking change in .NET 11 where DateOnly and TimeOnly TryParse methods throw ArgumentException for invalid DateTimeStyles values or format specifiers."
ms.date: 03/19/2026
ai-usage: ai-assisted
---

# DateOnly and TimeOnly TryParse methods throw for invalid input

The [System.DateOnly](https://learn.microsoft.com/search/?terms=System.DateOnly) and [System.TimeOnly](https://learn.microsoft.com/search/?terms=System.TimeOnly) `TryParse` and `TryParseExact` methods now throw an [System.ArgumentException](https://learn.microsoft.com/search/?terms=System.ArgumentException) when invalid [System.Globalization.DateTimeStyles](https://learn.microsoft.com/search/?terms=System.Globalization.DateTimeStyles) values or format specifiers are provided. This aligns their behavior with other `TryParse` APIs in .NET.

## Version introduced

.NET 11 Preview 2

## Previous behavior

Previously, passing invalid [System.Globalization.DateTimeStyles](https://learn.microsoft.com/search/?terms=System.Globalization.DateTimeStyles) values or format specifiers to `DateOnly.TryParse`, `DateOnly.TryParseExact`, `TimeOnly.TryParse`, or `TimeOnly.TryParseExact` caused the methods to return `false` without throwing an exception.

```csharp
using System;
using System.Globalization;

bool result = DateOnly.TryParseExact(
    "2023-10-15",
    "yyyy-MM-dd",
    CultureInfo.InvariantCulture,
    (DateTimeStyles)999, // Invalid DateTimeStyles value
    out DateOnly date);

Console.WriteLine(result); // Output: False
```

## New behavior

Starting in .NET 11, passing invalid [System.Globalization.DateTimeStyles](https://learn.microsoft.com/search/?terms=System.Globalization.DateTimeStyles) values or format specifiers to these methods throws an [System.ArgumentException](https://learn.microsoft.com/search/?terms=System.ArgumentException). The exception includes details about the invalid argument, such as the parameter name.

```csharp
using System;
using System.Globalization;

try
{
    bool result = DateOnly.TryParseExact(
        "2023-10-15",
        "yyyy-MM-dd",
        CultureInfo.InvariantCulture,
        (DateTimeStyles)999, // Invalid DateTimeStyles value
        out DateOnly date);
}
catch (ArgumentException ex)
{
    Console.WriteLine(ex.Message);
    // Output: "The value '999' is not valid for DateTimeStyles. (Parameter 'style')"
}
```

## Type of breaking change

This change is a [behavioral change](../../categories.md#behavioral-change).

## Reason for change

This change aligns the behavior of `DateOnly` and `TimeOnly` parsing methods with other `TryParse` APIs in .NET, which throw exceptions for invalid arguments. The previous behavior of silently returning `false` for invalid arguments could mask programming errors and make debugging more difficult.

## Recommended action

Review your usage of `DateOnly.TryParse`, `DateOnly.TryParseExact`, `TimeOnly.TryParse`, and `TimeOnly.TryParseExact` to ensure that valid [System.Globalization.DateTimeStyles](https://learn.microsoft.com/search/?terms=System.Globalization.DateTimeStyles) values and format specifiers are being passed. If invalid arguments are possible in your code paths, wrap the calls in a `try`-`catch` block to handle [System.ArgumentException](https://learn.microsoft.com/search/?terms=System.ArgumentException).

```csharp
using System;
using System.Globalization;

try
{
    bool result = DateOnly.TryParseExact(
        "2023-10-15",
        "yyyy-MM-dd",
        CultureInfo.InvariantCulture,
        (DateTimeStyles)999, // Invalid DateTimeStyles value
        out DateOnly date);
}
catch (ArgumentException ex)
{
    Console.WriteLine($"Error: {ex.Message}");
    // Handle the exception as needed
}
```

## Affected APIs

- [System.DateOnly.TryParse(System.String,System.DateOnly@)](https://learn.microsoft.com/search/?terms=System.DateOnly.TryParse(System.String%2CSystem.DateOnly%40))
- [System.DateOnly.TryParse(System.String,System.IFormatProvider,System.Globalization.DateTimeStyles,System.DateOnly@)](https://learn.microsoft.com/search/?terms=System.DateOnly.TryParse(System.String%2CSystem.IFormatProvider%2CSystem.Globalization.DateTimeStyles%2CSystem.DateOnly%40))
- [System.DateOnly.TryParseExact(System.String,System.String,System.IFormatProvider,System.Globalization.DateTimeStyles,System.DateOnly@)](https://learn.microsoft.com/search/?terms=System.DateOnly.TryParseExact(System.String%2CSystem.String%2CSystem.IFormatProvider%2CSystem.Globalization.DateTimeStyles%2CSystem.DateOnly%40))
- [System.DateOnly.TryParseExact(System.String,System.String\[\],System.IFormatProvider,System.Globalization.DateTimeStyles,System.DateOnly@)](https://learn.microsoft.com/search/?terms=System.DateOnly.TryParseExact(System.String%2CSystem.String%5B%5D%2CSystem.IFormatProvider%2CSystem.Globalization.DateTimeStyles%2CSystem.DateOnly%40))
- [System.TimeOnly.TryParse(System.String,System.TimeOnly@)](https://learn.microsoft.com/search/?terms=System.TimeOnly.TryParse(System.String%2CSystem.TimeOnly%40))
- [System.TimeOnly.TryParse(System.String,System.IFormatProvider,System.Globalization.DateTimeStyles,System.TimeOnly@)](https://learn.microsoft.com/search/?terms=System.TimeOnly.TryParse(System.String%2CSystem.IFormatProvider%2CSystem.Globalization.DateTimeStyles%2CSystem.TimeOnly%40))
- [System.TimeOnly.TryParseExact(System.String,System.String,System.IFormatProvider,System.Globalization.DateTimeStyles,System.TimeOnly@)](https://learn.microsoft.com/search/?terms=System.TimeOnly.TryParseExact(System.String%2CSystem.String%2CSystem.IFormatProvider%2CSystem.Globalization.DateTimeStyles%2CSystem.TimeOnly%40))
- [System.TimeOnly.TryParseExact(System.String,System.String\[\],System.IFormatProvider,System.Globalization.DateTimeStyles,System.TimeOnly@)](https://learn.microsoft.com/search/?terms=System.TimeOnly.TryParseExact(System.String%2CSystem.String%5B%5D%2CSystem.IFormatProvider%2CSystem.Globalization.DateTimeStyles%2CSystem.TimeOnly%40))
