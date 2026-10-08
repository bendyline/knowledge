---
title: "Breaking change: Complexity of LINQ OrderBy.First{OrDefault} increased"
description: Learn about the .NET 5 breaking change in core .NET libraries where the implementation of OrderBy.First has changed.
ms.date: 11/01/2020
---
# Complexity of LINQ OrderBy.First{OrDefault} increased

The implementation of [System.Linq.Enumerable.OrderBy*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.OrderBy*)`.`[System.Linq.Enumerable.First``1(System.Collections.Generic.IEnumerable{``0},System.Func{``0,System.Boolean})](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.First%60%601(System.Collections.Generic.IEnumerable%7B%60%600%7D%2CSystem.Func%7B%60%600%2CSystem.Boolean%7D)) and [System.Linq.Enumerable.OrderBy*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.OrderBy*)`.`[System.Linq.Enumerable.FirstOrDefault``1(System.Collections.Generic.IEnumerable{``0},System.Func{``0,System.Boolean})](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.FirstOrDefault%60%601(System.Collections.Generic.IEnumerable%7B%60%600%7D%2CSystem.Func%7B%60%600%2CSystem.Boolean%7D)) has changed, resulting in increased complexity for the operation.

## Change description

In .NET Core 1.x - 3.x, calling [System.Linq.Enumerable.OrderBy*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.OrderBy*) or [System.Linq.Enumerable.OrderByDescending*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.OrderByDescending*) followed by [System.Linq.Enumerable.First``1(System.Collections.Generic.IEnumerable{``0},System.Func{``0,System.Boolean})](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.First%60%601(System.Collections.Generic.IEnumerable%7B%60%600%7D%2CSystem.Func%7B%60%600%2CSystem.Boolean%7D)) or [System.Linq.Enumerable.FirstOrDefault``1(System.Collections.Generic.IEnumerable{``0},System.Func{``0,System.Boolean})](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.FirstOrDefault%60%601(System.Collections.Generic.IEnumerable%7B%60%600%7D%2CSystem.Func%7B%60%600%2CSystem.Boolean%7D)) operates with `O(N)` complexity. Since only the first (or default) element is required, only one enumeration is required to find it. However, the predicate that's supplied to [System.Linq.Enumerable.First``1(System.Collections.Generic.IEnumerable{``0},System.Func{``0,System.Boolean})](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.First%60%601(System.Collections.Generic.IEnumerable%7B%60%600%7D%2CSystem.Func%7B%60%600%2CSystem.Boolean%7D)) or [System.Linq.Enumerable.FirstOrDefault``1(System.Collections.Generic.IEnumerable{``0},System.Func{``0,System.Boolean})](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.FirstOrDefault%60%601(System.Collections.Generic.IEnumerable%7B%60%600%7D%2CSystem.Func%7B%60%600%2CSystem.Boolean%7D)) is invoked exactly `N` times, where `N` is the length of the sequence.

In .NET 5 and later versions, a [change was made](https://github.com/dotnet/runtime/pull/36643) such that calling [System.Linq.Enumerable.OrderBy*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.OrderBy*) or [System.Linq.Enumerable.OrderByDescending*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.OrderByDescending*) followed by [System.Linq.Enumerable.First``1(System.Collections.Generic.IEnumerable{``0},System.Func{``0,System.Boolean})](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.First%60%601(System.Collections.Generic.IEnumerable%7B%60%600%7D%2CSystem.Func%7B%60%600%2CSystem.Boolean%7D)) or [System.Linq.Enumerable.FirstOrDefault``1(System.Collections.Generic.IEnumerable{``0},System.Func{``0,System.Boolean})](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.FirstOrDefault%60%601(System.Collections.Generic.IEnumerable%7B%60%600%7D%2CSystem.Func%7B%60%600%2CSystem.Boolean%7D)) operates with `O(N log N)` complexity instead of `O(N)` complexity. However, the predicate that's supplied to [System.Linq.Enumerable.First``1(System.Collections.Generic.IEnumerable{``0},System.Func{``0,System.Boolean})](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.First%60%601(System.Collections.Generic.IEnumerable%7B%60%600%7D%2CSystem.Func%7B%60%600%2CSystem.Boolean%7D)) or [System.Linq.Enumerable.FirstOrDefault``1(System.Collections.Generic.IEnumerable{``0},System.Func{``0,System.Boolean})](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.FirstOrDefault%60%601(System.Collections.Generic.IEnumerable%7B%60%600%7D%2CSystem.Func%7B%60%600%2CSystem.Boolean%7D)) may be invoked *less* than `N` times, which is more important for overall performance.

> **Note:**
> This change matches the implementation and complexity of the operation in .NET Framework.

## Reason for change

The benefit of invoking the predicate fewer times outweighs a lower overall complexity, so the implementation that was introduced in .NET Core 1.0 was reverted. For more information, see [this dotnet/runtime issue](https://github.com/dotnet/runtime/issues/31554).

## Version introduced

5.0

## Recommended action

No action is required on the developer's part.

## Affected APIs

- [System.Linq.Enumerable.OrderBy*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.OrderBy*)
- [System.Linq.Enumerable.OrderByDescending*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.OrderByDescending*)
- [System.Linq.Enumerable.First``1(System.Collections.Generic.IEnumerable{``0},System.Func{``0,System.Boolean})](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.First%60%601(System.Collections.Generic.IEnumerable%7B%60%600%7D%2CSystem.Func%7B%60%600%2CSystem.Boolean%7D))
- [System.Linq.Enumerable.FirstOrDefault``1(System.Collections.Generic.IEnumerable{``0},System.Func{``0,System.Boolean})](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.FirstOrDefault%60%601(System.Collections.Generic.IEnumerable%7B%60%600%7D%2CSystem.Func%7B%60%600%2CSystem.Boolean%7D))

<!--

### Category

Core .NET libraries

### Affected APIs

- `Overload:System.Linq.Enumerable.OrderBy`
- `Overload:System.Linq.Enumerable.OrderByDescending`
- `M:System.Linq.Enumerable.First``1(System.Collections.Generic.IEnumerable{``0},System.Func{``0,System.Boolean})`
- `M:System.Linq.Enumerable.FirstOrDefault``1(System.Collections.Generic.IEnumerable{``0},System.Func{``0,System.Boolean})`

-->
