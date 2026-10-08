---
title: "Breaking change: Output caching API changes"
description: Learn about the breaking change in ASP.NET Core 7.0 where changes were made to some output caching APIs.
ms.date: 10/10/2022
ms.custom: https://github.com/aspnet/Announcements/issues/492
---
# Output caching API changes

Some APIs in the [Microsoft.AspNetCore.OutputCaching](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OutputCaching) namespace have changed to better represent their intent.

The following APIs were removed:

- `OutputCachePolicyBuilder.#ctor`
- `OutputCachePolicyBuilder.Clear`

The following APIs were renamed:

| Previous name | New name |
| --- | --- |
| `AllowLocking(System.Boolean)` | [Microsoft.AspNetCore.OutputCaching.OutputCachePolicyBuilder.SetLocking(System.Boolean)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OutputCaching.OutputCachePolicyBuilder.SetLocking(System.Boolean)) |
| `VaryByRouteValue(System.String[])` | [Microsoft.AspNetCore.OutputCaching.OutputCachePolicyBuilder.SetVaryByRouteValue(System.String\[\])](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OutputCaching.OutputCachePolicyBuilder.SetVaryByRouteValue(System.String%5B%5D)) |
| `VaryByQuery(System.String[])` | [Microsoft.AspNetCore.OutputCaching.OutputCachePolicyBuilder.SetVaryByQuery(System.String\[\])](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OutputCaching.OutputCachePolicyBuilder.SetVaryByQuery(System.String%5B%5D)) |
| `VaryByHeader(System.String[])` | [Microsoft.AspNetCore.OutputCaching.OutputCachePolicyBuilder.SetVaryByHeader(System.String\[\])](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OutputCaching.OutputCachePolicyBuilder.SetVaryByHeader(System.String%5B%5D)) |

The following APIs were added:

- [Microsoft.AspNetCore.OutputCaching.CacheVaryByRules.VaryByHost](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OutputCaching.CacheVaryByRules.VaryByHost)
- [Microsoft.AspNetCore.OutputCaching.OutputCacheOptions.AddPolicy(System.String,System.Action{Microsoft.AspNetCore.OutputCaching.OutputCachePolicyBuilder},System.Boolean)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OutputCaching.OutputCacheOptions.AddPolicy(System.String%2CSystem.Action%7BMicrosoft.AspNetCore.OutputCaching.OutputCachePolicyBuilder%7D%2CSystem.Boolean))
- [Microsoft.AspNetCore.OutputCaching.OutputCacheOptions.AddBasePolicy(System.Action{Microsoft.AspNetCore.OutputCaching.OutputCachePolicyBuilder},System.Boolean)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OutputCaching.OutputCacheOptions.AddBasePolicy(System.Action%7BMicrosoft.AspNetCore.OutputCaching.OutputCachePolicyBuilder%7D%2CSystem.Boolean))
- [Microsoft.Extensions.DependencyInjection.OutputCacheConventionBuilderExtensions.CacheOutput%60%601(%60%600,System.Action{Microsoft.AspNetCore.OutputCaching.OutputCachePolicyBuilder},System.Boolean)](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.OutputCacheConventionBuilderExtensions.CacheOutput%2560%25601(%2560%25600%2CSystem.Action%7BMicrosoft.AspNetCore.OutputCaching.OutputCachePolicyBuilder%7D%2CSystem.Boolean))

## Version introduced

ASP.NET Core 7.0 RC 2

## Previous behavior

`OutputCachePolicyBuilder.VaryByQuery(System.String[])` was additive: every call added more query string keys.

## New behavior

The `OutputCachePolicyBuilder.VaryByQuery(System.String[])` method is now named [Microsoft.AspNetCore.OutputCaching.OutputCachePolicyBuilder.SetVaryByQuery(System.String\[\])](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OutputCaching.OutputCachePolicyBuilder.SetVaryByQuery(System.String%5B%5D)), and each call replaces existing query string keys.

For other changes, see the first section of this article.

## Type of breaking change

This change affects [source compatibility](https://learn.microsoft.com/dotnet/core/compatibility/categories#source-compatibility) and [binary compatibility](https://learn.microsoft.com/dotnet/core/compatibility/categories#binary-compatibility).

## Reason for change

This change was made to improve the consistency of method names and to remove ambiguity in their behavior.

## Recommended action

Recompile any projects built with an earlier SDK. If you referenced any of these method names directly, update the source to reflect the new names.

## Affected APIs

- `Microsoft.AspNetCore.OutputCaching.OutputCachePolicyBuilder.#ctor`
- `Microsoft.AspNetCore.OutputCaching.OutputCachePolicyBuilder.Clear`
- `Microsoft.AspNetCore.OutputCaching.OutputCachePolicyBuilder.AllowLocking(System.Boolean)`
- `Microsoft.AspNetCore.OutputCaching.OutputCachePolicyBuilder.VaryByRouteValue(System.String[])`
- `Microsoft.AspNetCore.OutputCaching.OutputCachePolicyBuilder.VaryByQuery(System.String[])`
- `Microsoft.AspNetCore.OutputCaching.OutputCachePolicyBuilder.VaryByHeader(System.String[])`
