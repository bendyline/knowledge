---
title: "Breaking change: IPNetwork and ForwardedHeadersOptions.KnownNetworks are obsolete"
description: Learn about the breaking change in ASP.NET Core 10.0 where IPNetwork and ForwardedHeadersOptions.KnownNetworks have been obsoleted in favor of System.Net.IPNetwork and KnownIPNetworks.
ms.date: 08/08/2025
ai-usage: ai-assisted
ms.custom: https://github.com/aspnet/Announcements/issues/523
---
# IPNetwork and ForwardedHeadersOptions.KnownNetworks are obsolete

[Microsoft.AspNetCore.HttpOverrides.IPNetwork](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.HttpOverrides.IPNetwork) and [Microsoft.AspNetCore.Builder.ForwardedHeadersOptions.KnownNetworks](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ForwardedHeadersOptions.KnownNetworks) have been marked as obsolete in favor of using [System.Net.IPNetwork](https://learn.microsoft.com/search/?terms=System.Net.IPNetwork) and `KnownIPNetworks`.

## Version introduced

.NET 10 Preview 7

## Previous behavior

Previously, you could use [Microsoft.AspNetCore.HttpOverrides.IPNetwork](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.HttpOverrides.IPNetwork) and [Microsoft.AspNetCore.Builder.ForwardedHeadersOptions.KnownNetworks](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ForwardedHeadersOptions.KnownNetworks) to configure known networks for the forwarded headers middleware:

```csharp
app.UseForwardedHeaders(new ForwardedHeadersOptions
{
    KnownNetworks.Add(new(IPAddress.Loopback, 8))
});
```

## New behavior

Starting in .NET 10, if you use [the obsolete APIs](#affected-apis) in your code, you'll get warning `ASPDEPR005` at compile time:

> warning ASPDEPR005: Please use KnownIPNetworks instead. For more information, visit <https://aka.ms/aspnet/deprecate/005>.

Use the [System.Net.IPNetwork](https://learn.microsoft.com/search/?terms=System.Net.IPNetwork) type and `KnownIPNetworks` property instead.

## Type of breaking change

This change can affect [source compatibility](https://learn.microsoft.com/dotnet/core/compatibility/categories#source-compatibility).

## Reason for change

[System.Net.IPNetwork](https://learn.microsoft.com/search/?terms=System.Net.IPNetwork) has replaced the [Microsoft.AspNetCore.HttpOverrides.IPNetwork](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.HttpOverrides.IPNetwork) type that was implemented for [Microsoft.AspNetCore.HttpOverrides.ForwardedHeadersMiddleware](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.HttpOverrides.ForwardedHeadersMiddleware).

## Recommended action

Change to using [System.Net.IPNetwork](https://learn.microsoft.com/search/?terms=System.Net.IPNetwork) and `KnownIPNetworks`.

## Affected APIs

- [Microsoft.AspNetCore.HttpOverrides.IPNetwork](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.HttpOverrides.IPNetwork)
- [Microsoft.AspNetCore.Builder.ForwardedHeadersOptions.KnownNetworks](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ForwardedHeadersOptions.KnownNetworks)
