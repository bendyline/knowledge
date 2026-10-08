---
title: "Breaking change: CreateCounterSetInstance throws InvalidOperationException if instance already exists"
description: Learn about the .NET 5 breaking change in core .NET libraries where CounterSet.CreateCounterSetInstance throws a different exception if the counter already exists.
ms.date: 11/01/2020
---
# CounterSet.CreateCounterSetInstance now throws InvalidOperationException if instance already exists

Starting in .NET 5, [System.Diagnostics.PerformanceData.CounterSet.CreateCounterSetInstance(System.String)](https://learn.microsoft.com/search/?terms=System.Diagnostics.PerformanceData.CounterSet.CreateCounterSetInstance(System.String)) throws an [System.InvalidOperationException](https://learn.microsoft.com/search/?terms=System.InvalidOperationException) instead of an [System.ArgumentException](https://learn.microsoft.com/search/?terms=System.ArgumentException) if the counter set already exists.

## Change description

In .NET Framework and .NET Core 1.0 to 3.1, you can create an instance of the counter set by calling [System.Diagnostics.PerformanceData.CounterSet.CreateCounterSetInstance*](https://learn.microsoft.com/search/?terms=System.Diagnostics.PerformanceData.CounterSet.CreateCounterSetInstance*). However, if the counter set already exists, the method throws an [System.ArgumentException](https://learn.microsoft.com/search/?terms=System.ArgumentException) exception.

In .NET 5 and later versions, when you call [System.Diagnostics.PerformanceData.CounterSet.CreateCounterSetInstance*](https://learn.microsoft.com/search/?terms=System.Diagnostics.PerformanceData.CounterSet.CreateCounterSetInstance*) and the counter set exists, an [System.InvalidOperationException](https://learn.microsoft.com/search/?terms=System.InvalidOperationException) exception is thrown.

## Version introduced

5.0

## Recommended action

If you catch [System.ArgumentException](https://learn.microsoft.com/search/?terms=System.ArgumentException) exceptions in your app when calling [System.Diagnostics.PerformanceData.CounterSet.CreateCounterSetInstance*](https://learn.microsoft.com/search/?terms=System.Diagnostics.PerformanceData.CounterSet.CreateCounterSetInstance*), consider also catching [System.InvalidOperationException](https://learn.microsoft.com/search/?terms=System.InvalidOperationException) exceptions.

> **Note:**
> Catching [System.ArgumentException](https://learn.microsoft.com/search/?terms=System.ArgumentException) exceptions is not recommended.

## Affected APIs

- [System.Diagnostics.PerformanceData.CounterSet.CreateCounterSetInstance*](https://learn.microsoft.com/search/?terms=System.Diagnostics.PerformanceData.CounterSet.CreateCounterSetInstance*)

<!--

### Category

Core .NET libraries

### Affected APIs

- `M:System.Diagnostics.PerformanceData.CounterSet.CreateCounterSetInstance(System.String)`

-->
