---
title: "Breaking change: ASP.NET Core apps allow deserializing quoted numbers"
description: Learn about the breaking change in .NET 5 where ASP.NET Core apps will successfully deserialize numbers that are represented as JSON strings instead of throwing an exception.
ms.date: 10/21/2020
---
# ASP.NET Core apps allow deserializing quoted numbers

Starting in .NET 5, ASP.NET Core apps use the default deserialization options as specified by [System.Text.Json.JsonSerializerDefaults.Web](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerDefaults.Web). The [System.Text.Json.JsonSerializerDefaults.Web](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerDefaults.Web) set of options includes setting [System.Text.Json.JsonSerializerOptions.NumberHandling](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions.NumberHandling) to [System.Text.Json.Serialization.JsonNumberHandling.AllowReadingFromString](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonNumberHandling.AllowReadingFromString). This change means that ASP.NET Core apps will successfully deserialize numbers that are represented as JSON strings instead of throwing an exception.

## Change description

In .NET Core 3.0 - 3.1, [System.Text.Json.JsonSerializer](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializer) throws a [System.Text.Json.JsonException](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonException) during deserialization if it encounters a quoted number in a JSON payload. The quoted numbers are used to map with number properties in object graphs. In .NET Core 3.0 - 3.1, numbers are only read from [System.Text.Json.JsonTokenType.Number](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonTokenType.Number) tokens.

Starting in .NET 5, quoted numbers in JSON payloads are considered valid, by default, for ASP.NET Core apps. No exception is thrown during deserialization of quoted numbers.

> **Tip:**
>
> - There is no behavior change for the default, standalone [System.Text.Json.JsonSerializer](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializer) or [System.Text.Json.JsonSerializerOptions](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions).
> - This is technically not a breaking change, since it makes a scenario more permissive instead of more restrictive (that is, it succeeds in coercing a number from a JSON string instead of throwing an exception). However, since this is a significant behavioral change that affects many ASP.NET Core apps, it is documented here.
> - The [System.Net.Http.Json.HttpClientJsonExtensions.GetFromJsonAsync*](https://learn.microsoft.com/search/?terms=System.Net.Http.Json.HttpClientJsonExtensions.GetFromJsonAsync*) and [System.Net.Http.Json.HttpContentJsonExtensions.ReadFromJsonAsync*](https://learn.microsoft.com/search/?terms=System.Net.Http.Json.HttpContentJsonExtensions.ReadFromJsonAsync*) extension methods also use the [System.Text.Json.JsonSerializerDefaults.Web](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerDefaults.Web) set of serialization options.

## Version introduced

5.0

## Reason for change

Multiple users have requested an option for more permissive number handling in [System.Text.Json.JsonSerializer](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializer). This feedback indicates that many JSON producers (for example, services across the web) emit quoted numbers. By allowing quoted numbers to be read (deserialized), .NET apps can successfully parse these payloads, by default, in web contexts. The configuration is exposed via [System.Text.Json.JsonSerializerDefaults.Web](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerDefaults.Web) so that you can specify the same options across different application layers, for example, client, server, and shared.

## Recommended action

If this change is disruptive, for example, if you depend on the strict number handling for validation, you can re-enable the previous behavior. Set the [System.Text.Json.JsonSerializerOptions.NumberHandling](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions.NumberHandling) option to [System.Text.Json.Serialization.JsonNumberHandling.Strict](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonNumberHandling.Strict).

For ASP.NET Core MVC and web API apps, you can configure the option in `Startup` by using the following code:

```csharp
services.AddControllers()
   .AddJsonOptions(options => options.JsonSerializerOptions.NumberHandling = JsonNumberHandling.Strict);
```

## Affected APIs

- [System.Text.Json.JsonSerializer.Deserialize*](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializer.Deserialize*)
- [System.Text.Json.JsonSerializer.DeserializeAsync*](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializer.DeserializeAsync*)

<!--

### Affected APIs

- `Overload:System.Text.Json.JsonSerializer.Deserialize`
- `Overload:System.Text.Json.JsonSerializer.DeserializeAsync`

### Category

- ASP.NET Core
- Serialization

-->
