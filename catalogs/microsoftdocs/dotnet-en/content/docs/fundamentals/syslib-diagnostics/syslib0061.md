---
title: SYSLIB0061 warning - System.Linq.Queryable.MaxBy and System.Linq.Queryable.MinBy accepting an IComparer\<TSource\> are obsolete.
description: Learn about the obsoletion of some MaxBy and MinBy extension methods. Use of these extension methods generates compile-time warning SYSLIB0061.
ms.date: 03/31/2025
f1_keywords:
  - SYSLIB0061
---
# SYSLIB0061: System.Linq.Queryable.MaxBy and System.Linq.Queryable.MinBy taking an IComparer\<TSource\> are obsolete

Starting in .NET 10, the two extension methods [System.Linq.Queryable.MaxBy``2(System.Linq.IQueryable{``0},System.Linq.Expressions.Expression{System.Func{``0,``1}},System.Collections.Generic.IComparer{``0})](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.MaxBy%60%602(System.Linq.IQueryable%7B%60%600%7D%2CSystem.Linq.Expressions.Expression%7BSystem.Func%7B%60%600%2C%60%601%7D%7D%2CSystem.Collections.Generic.IComparer%7B%60%600%7D)) and [System.Linq.Queryable.MinBy``2(System.Linq.IQueryable{``0},System.Linq.Expressions.Expression{System.Func{``0,``1}},System.Collections.Generic.IComparer{``0})](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.MinBy%60%602(System.Linq.IQueryable%7B%60%600%7D%2CSystem.Linq.Expressions.Expression%7BSystem.Func%7B%60%600%2C%60%601%7D%7D%2CSystem.Collections.Generic.IComparer%7B%60%600%7D)) that accept an `IComparer<TSource>` are obsolete. Please use the newly added overloads that accept an `IComparer<TKey>` instead.

Calling these old extension methods in code generates warning `SYSLIB0061` at compile time and typically generates a [System.IndexOutOfRangeException](https://learn.microsoft.com/search/?terms=System.IndexOutOfRangeException) at runtime.

## Reason for obsoletion

The original `MaxBy` and `MinBy` accepting an `IComparer<T>? comparer` expression parameter were incorrectly implemented using the generic type `TSource` for the `IComparer<T>? comparer` type parameter. This is incorrect because the values passed to the [System.Collections.Generic.Comparer`1.Compare(`0,`0)](https://learn.microsoft.com/search/?terms=System.Collections.Generic.Comparer%601.Compare(%600%2C%600)) method are selected by the `Expression<Func<TSource, TKey>> keySelector` expression parameter, thus the extracted value is of generic type `TKey`.

### Note

This would previously work only if `TSource` and `TKey` were actually the same constructed type. If the types were distinct then a runtime _[System.IndexOutOfRangeException](https://learn.microsoft.com/search/?terms=System.IndexOutOfRangeException): Index was outside the bounds of the array._ would be thrown because the needed extension method for `IQueryable<TSource> source` could not be found (for example in [System.Linq.Enumerable.MaxBy*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.MaxBy*)).

## Workaround

Use the newly added `MaxBy` or `MinBy` method that accepts an `IComparer<TKey>? comparer` parameter. These will not throw an exception.

For example:

```csharp
// This worked correctly since TKey and TSource are both int.
Enumerable.Range(1, 10)
    .AsQueryable()
    .MaxBy(key => (0 - key), Comparer<int>.Default);

// This would throw since TKey is string but TSource is int
// and will trigger the obsoletion warning now and would
// throw an exeception at runtime.
Enumerable.Range(1, 10)
    .AsQueryable()
    .MaxBy(key => key.ToString(), Comparer<int>.Default);

// This previously would not compile before to the addition of
// the new methods since TKey is string and TSource is int.
// It will now compile and execute correctly.
Enumerable.Range(1, 10)
    .AsQueryable()
    .MaxBy(key => key.ToString(), Comparer<string>.Default);
```

## Suppress a warning

If you must use the obsolete API, you can suppress the warning in code or in your project file.

To suppress only a single violation, add preprocessor directives to your source file to disable and then re-enable the warning.

```csharp
// Disable the warning.
#pragma warning disable SYSLIB0061

// Code that uses obsolete API.
// ...

// Re-enable the warning.
#pragma warning restore SYSLIB0061
```

To suppress all the `SYSLIB0061` warnings in your project, add a `<NoWarn>` property to your project file.

```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
   ...
   <NoWarn>$(NoWarn);SYSLIB0061</NoWarn>
  </PropertyGroup>
</Project>
```

For more information, see [Suppress warnings](obsoletions-overview.md#suppress-warnings).
