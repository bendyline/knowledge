---
title: "Breaking change: Tracking linked cache entries"
description: Learn about the .NET 7 breaking change in .NET where MemoryCache no longer tracks linked cache entries by default.
ms.date: 10/13/2022
---
# Tracking linked cache entries

[System.Runtime.Caching.MemoryCache](https://learn.microsoft.com/search/?terms=System.Runtime.Caching.MemoryCache) tracks linked cache entries so that options are propagated. In the following example, the `expirationToken` added for `child` is also applied to `parent`:

```csharp
using (var parent = cache.CreateEntry(key))
{
    parent.SetValue(obj);

    using (var child = cache.CreateEntry(key1))
    {
        child.SetValue(obj);
        child.AddExpirationToken(expirationToken);
    }
}
```

For performance reasons, .NET 7 no longer tracks linked cache entries by default. However, you can enable tracking using a new option.

## Version introduced

.NET 7

## Previous behavior

Prior to .NET 7, [System.Runtime.Caching.MemoryCache](https://learn.microsoft.com/search/?terms=System.Runtime.Caching.MemoryCache) tracked linked cache entries to allow for options to be propagated. The tracking could not be disabled.

## New behavior

Starting in .NET 7, [System.Runtime.Caching.MemoryCache](https://learn.microsoft.com/search/?terms=System.Runtime.Caching.MemoryCache) does not track linked cache entries, by default. The [Microsoft.Extensions.Caching.Memory.MemoryCacheOptions.TrackLinkedCacheEntries](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Memory.MemoryCacheOptions.TrackLinkedCacheEntries) option was added so you can control whether linked cache entries are tracked or not.

## Type of breaking change

This change can affect [binary compatibility](../../categories.md#binary-compatibility).

## Reason for change

This change was introduced to improve performance. Tracking internally uses [System.Threading.AsyncLocal`1](https://learn.microsoft.com/search/?terms=System.Threading.AsyncLocal%601), which is expensive and adds non-trivial overhead.

## Recommended action

If you want [System.Runtime.Caching.MemoryCache](https://learn.microsoft.com/search/?terms=System.Runtime.Caching.MemoryCache) to continue tracking linked cache entries so options can be propagated, set [Microsoft.Extensions.Caching.Memory.MemoryCacheOptions.TrackLinkedCacheEntries](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Memory.MemoryCacheOptions.TrackLinkedCacheEntries) to `true`.

```csharp
var options = new MemoryCacheOptions
{
    TrackLinkedCacheEntries = true
};

var cache = new MemoryCache(options);
```

## Affected APIs

- [System.Runtime.Caching.MemoryCache](https://learn.microsoft.com/search/?terms=System.Runtime.Caching.MemoryCache)
- [Microsoft.Extensions.Caching.Memory.MemoryCacheOptions](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Memory.MemoryCacheOptions)
