---
title: "Breaking change: Custom converters for serialization removed"
description: Learn about the breaking change in ASP.NET Core 8.0 where 'ValidationProblemDetails' and 'ProblemDetails' no longer use custom converters.
ms.date: 05/03/2023
ms.custom: https://github.com/aspnet/Announcements/issues/504
---
# Custom converters for serialization removed

[Microsoft.AspNetCore.Mvc.ProblemDetails](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ProblemDetails) and [Microsoft.AspNetCore.Mvc.ValidationProblemDetails](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ValidationProblemDetails) previously used custom converters to support JSON serialization due to a lack of built-in support for the `IgnoreNullValues` option. Now that this option is supported by the [System.Text.Json](https://learn.microsoft.com/search/?terms=System.Text.Json) APIs, we've removed the custom converters from the framework in favor of the serialization provided by the framework.

As a result of this change, the properties in the [Microsoft.AspNetCore.Mvc.ProblemDetails](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ProblemDetails) and [Microsoft.AspNetCore.Mvc.ValidationProblemDetails](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ValidationProblemDetails) types no longer assume lowercase type names. Developers must specify a [System.Text.Json.JsonNamingPolicy](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonNamingPolicy) to get the correct behavior.

## Version introduced

ASP.NET Core 8.0 Preview 2

## Previous behavior

Previously, you could add [System.Text.Json.Serialization.JsonStringEnumConverter](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonStringEnumConverter) to the serialization options as a custom converter, and deserialization resulted in a 400 status for [Microsoft.AspNetCore.Mvc.ValidationProblemDetails](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ValidationProblemDetails).

```csharp
string content = "{\"status\":400,\"detail\":\"HTTP egress is not enabled.\"}";
using MemoryStream stream = new();
using StreamWriter writer = new(stream);
writer.Write(content);
writer.Flush();
stream.Position = 0;

JsonSerializerOptions options = new();
options.Converters.Add(new JsonStringEnumConverter());

ValidationProblemDetails? details = await JsonSerializer.DeserializeAsync<ValidationProblemDetails>(stream, options);
Console.WriteLine(details.Status); // 400
```

## New behavior

Starting in .NET 8, the same code results in a `null` status for [Microsoft.AspNetCore.Mvc.ValidationProblemDetails](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ValidationProblemDetails).

```csharp
string content = "{\"status\":400,\"detail\":\"HTTP egress is not enabled.\"}";
using MemoryStream stream = new();
using StreamWriter writer = new(stream);
writer.Write(content);
writer.Flush();
stream.Position = 0;

JsonSerializerOptions options = new();
options.Converters.Add(new JsonStringEnumConverter());

ValidationProblemDetails? details = await JsonSerializer.DeserializeAsync<ValidationProblemDetails>(stream, options);
Console.WriteLine(details.Status); // null
```

## Type of breaking change

This change is a [behavioral change](https://learn.microsoft.com/dotnet/core/compatibility/categories#behavioral-change).

## Reason for change

Now that [System.Text.Json.JsonSerializerOptions.IgnoreNullValues](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions.IgnoreNullValues) is supported by the `System.Text.Json` APIs, we've removed the custom converters in favor of the serialization provided by the framework.

## Recommended action

Provide a `JsonSerializerOptions` with the correct details.

```csharp
JsonSerializerOptions options = new()
{
   PropertyNameCaseInsensitive = true
};
ValidationProblemDetails? details = await JsonSerializer.DeserializeAsync<ValidationProblemDetails>(stream, options);
```

## Affected APIs

- [Microsoft.AspNetCore.Mvc.ProblemDetails](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ProblemDetails)
- [Microsoft.AspNetCore.Mvc.ValidationProblemDetails](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ValidationProblemDetails)
