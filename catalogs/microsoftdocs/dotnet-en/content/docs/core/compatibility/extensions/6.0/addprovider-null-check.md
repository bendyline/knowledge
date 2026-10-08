---
title: "Breaking change: AddProvider validates provider isn't null"
description: Learn about the .NET 6 breaking change in .NET extensions where AddProvider now validates that the provider argument is not null.
ms.date: 11/05/2021
---
# AddProvider checks for non-null provider

[Microsoft.Extensions.Logging.LoggerFactory](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.LoggerFactory) implements [Microsoft.Extensions.Logging.ILoggerFactory](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.ILoggerFactory) with an `AddProvider(ILoggerProvider)` method. `null` providers aren't accepted and will cause an [System.ArgumentNullException](https://learn.microsoft.com/search/?terms=System.ArgumentNullException) to be thrown.

## Version introduced

6.0 RC 1

## Previous behavior

Previously, [Microsoft.Extensions.Logging.LoggerFactory.AddProvider(Microsoft.Extensions.Logging.ILoggerProvider)](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.LoggerFactory.AddProvider(Microsoft.Extensions.Logging.ILoggerProvider)) did not perform any validation of the `provider` argument. As such, the method considered `null` to be a "valid" provider and added it to the collection of providers.

## New behavior

Starting in .NET 6, `null` providers aren't accepted, and [Microsoft.Extensions.Logging.LoggerFactory.AddProvider(Microsoft.Extensions.Logging.ILoggerProvider)](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.LoggerFactory.AddProvider(Microsoft.Extensions.Logging.ILoggerProvider)) throws an [System.ArgumentNullException](https://learn.microsoft.com/search/?terms=System.ArgumentNullException) if the logging provider argument is `null`. For example, the following code throws an [System.ArgumentNullException](https://learn.microsoft.com/search/?terms=System.ArgumentNullException):

```csharp
var factory = new LoggerFactory();
((ILoggerFactory)factory).AddProvider(null));
```

## Type of breaking change

This change can affect [source compatibility](../../categories.md#source-compatibility).

## Reason for change

The previous behavior caused some operations inside the class to unnecessarily throw [System.NullReferenceException](https://learn.microsoft.com/search/?terms=System.NullReferenceException) exceptions. For example, the [Microsoft.Extensions.Logging.LoggerFactory.Dispose](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.LoggerFactory.Dispose) method will capture the exception and do nothing.

## Recommended action

Ensure you're not passing a `null` provider to [Microsoft.Extensions.Logging.LoggerFactory.AddProvider(Microsoft.Extensions.Logging.ILoggerProvider)](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.LoggerFactory.AddProvider(Microsoft.Extensions.Logging.ILoggerProvider)).

## Affected APIs

- [Microsoft.Extensions.Logging.LoggerFactory.AddProvider(Microsoft.Extensions.Logging.ILoggerProvider)](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.LoggerFactory.AddProvider(Microsoft.Extensions.Logging.ILoggerProvider))
