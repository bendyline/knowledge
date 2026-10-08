---
title: What is the TimeProvider class
description: Learn about the TimeProvider class in .NET and .NET Framework. TimeProvider provides an abstraction over time.
ms.date: 01/16/2026
ms.topic: overview
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "TimeProvider class"
  - "date and time classes [.NET]"
#customer intent: As a developer, I want to understand what TimeProvider is so that I can use it.
---

# What is TimeProvider?

[System.TimeProvider](https://learn.microsoft.com/search/?terms=System.TimeProvider) is an abstraction of time that provides a point in time as a [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) type. By using `TimeProvider`, you ensure that your code is testable and predictable. `TimeProvider` is available on the following frameworks:

| Framework | Notes |
| --- | --- |
| .NET 8+ | Included in the framework. |
| .NET 5 - .NET 7 | Provided in the [`Microsoft.Bcl.TimeProvider` NuGet package](https://www.nuget.org/packages/Microsoft.Bcl.TimeProvider). |
| .NET Framework 4.6.2+ | Provided in the [`Microsoft.Bcl.TimeProvider` NuGet package](https://www.nuget.org/packages/Microsoft.Bcl.TimeProvider). |
| .NET Standard 2.0 | Provided in the [`Microsoft.Bcl.TimeProvider` NuGet package](https://www.nuget.org/packages/Microsoft.Bcl.TimeProvider). |

The [System.TimeProvider](https://learn.microsoft.com/search/?terms=System.TimeProvider) class defines the following capabilities:

- Provides access to the date and time through [System.TimeProvider.GetUtcNow](https://learn.microsoft.com/search/?terms=System.TimeProvider.GetUtcNow) and [System.TimeProvider.GetLocalNow](https://learn.microsoft.com/search/?terms=System.TimeProvider.GetLocalNow).
- High-frequency timestamps with [System.TimeProvider.GetTimestamp](https://learn.microsoft.com/search/?terms=System.TimeProvider.GetTimestamp).
- Measure time between two timestamps with [System.TimeProvider.GetElapsedTime*](https://learn.microsoft.com/search/?terms=System.TimeProvider.GetElapsedTime*).
- High-resolution timers with [System.TimeProvider.CreateTimer(System.Threading.TimerCallback,System.Object,System.TimeSpan,System.TimeSpan)](https://learn.microsoft.com/search/?terms=System.TimeProvider.CreateTimer(System.Threading.TimerCallback%2CSystem.Object%2CSystem.TimeSpan%2CSystem.TimeSpan)).
- Get the current timezone with [System.TimeProvider.LocalTimeZone](https://learn.microsoft.com/search/?terms=System.TimeProvider.LocalTimeZone).

## Default implementation

.NET provides an implementation of [System.TimeProvider](https://learn.microsoft.com/search/?terms=System.TimeProvider) through the [System.TimeProvider.System](https://learn.microsoft.com/search/?terms=System.TimeProvider.System) property, with the following characteristics:

- Date and time are calculated by using [System.DateTimeOffset.UtcNow](https://learn.microsoft.com/search/?terms=System.DateTimeOffset.UtcNow) and [System.TimeZoneInfo.Local](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo.Local).
- Timestamps are provided by [System.Diagnostics.Stopwatch](https://learn.microsoft.com/search/?terms=System.Diagnostics.Stopwatch).
- Timers are implemented through an internal class and exposed as [System.Threading.ITimer](https://learn.microsoft.com/search/?terms=System.Threading.ITimer).

The following example shows how to use [System.TimeProvider](https://learn.microsoft.com/search/?terms=System.TimeProvider) to get the current date and time:

[language="csharp" source="./snippets/timeprovider-overview/csharp/Program.cs" id="GetLocal"::: (complete source file; reference: ./snippets/timeprovider-overview/csharp/Program.cs)](../../../_code/docs/standard/datetime/snippets/timeprovider-overview/csharp/Program.cs.md)
[language="vb" source="./snippets/timeprovider-overview/vb/Program.vb" id="GetLocal"::: (complete source file; reference: ./snippets/timeprovider-overview/vb/Program.vb)](../../../_code/docs/standard/datetime/snippets/timeprovider-overview/vb/Program.vb.md)

The following example shows how to capture elapsed time by using [System.TimeProvider.GetTimestamp](https://learn.microsoft.com/search/?terms=System.TimeProvider.GetTimestamp):

[language="csharp" source="./snippets/timeprovider-overview/csharp/Program.cs" id="Timestamp"::: (complete source file; reference: ./snippets/timeprovider-overview/csharp/Program.cs)](../../../_code/docs/standard/datetime/snippets/timeprovider-overview/csharp/Program.cs.md)
[language="vb" source="./snippets/timeprovider-overview/vb/Program.vb" id="Timestamp"::: (complete source file; reference: ./snippets/timeprovider-overview/vb/Program.vb)](../../../_code/docs/standard/datetime/snippets/timeprovider-overview/vb/Program.vb.md)

## FakeTimeProvider implementation

The [**Microsoft.Extensions.TimeProvider.Testing** NuGet package](https://www.nuget.org/packages/Microsoft.Extensions.TimeProvider.Testing/) provides a controllable `TimeProvider` implementation designed for unit testing.

The following list describes some of the capabilities of the [Microsoft.Extensions.Time.Testing.FakeTimeProvider](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Time.Testing.FakeTimeProvider) class:

- Set a specific date and time.
- Automatically advance the date and time by a specified amount whenever the date and time is read.
- Manually advance the date and time.

## Custom implementation

While [FakeTimeProvider](#faketimeprovider-implementation) covers most scenarios that require predictability with time, you can still provide your own implementation. Create a new class that derives from [System.TimeProvider](https://learn.microsoft.com/search/?terms=System.TimeProvider) and override members to control how time is provided. For example, the following class only provides a single date, the date of the moon landing:

[language="csharp" source="./snippets/timeprovider-overview/csharp/MoonLandingTimeProviderPST.cs" id="CustomProvider"::: (complete source file; reference: ./snippets/timeprovider-overview/csharp/MoonLandingTimeProviderPST.cs)](../../../_code/docs/standard/datetime/snippets/timeprovider-overview/csharp/MoonLandingTimeProviderPST.cs.md)
[language="vb" source="./snippets/timeprovider-overview/vb/MoonLandingTimeProviderPST.vb" id="CustomProvider"::: (complete source file; reference: ./snippets/timeprovider-overview/vb/MoonLandingTimeProviderPST.vb)](../../../_code/docs/standard/datetime/snippets/timeprovider-overview/vb/MoonLandingTimeProviderPST.vb.md)

If code using this class calls `MoonLandingTimeProviderPST.GetUtcNow`, the date of the moon landing in UTC is returned. If `MoonLandingTimeProviderPST.GetLocalNow` is called, the base class applies `MoonLandingTimeProviderPST.LocalTimeZone` to `GetUtcNow` and returns the moon landing date and time in the PST time zone.

To demonstrate the usefulness of controlling time, consider the following example. Let's say that you're writing a calendar app that sends a greeting to the user when the app is first opened each day. The app says a special greeting when the current day has an event associated with it, such as the anniversary of the moon landing.

[language="csharp" source="./snippets/timeprovider-overview/csharp/CalendarHelper.cs" id="CalendarHelper"::: (complete source file; reference: ./snippets/timeprovider-overview/csharp/CalendarHelper.cs)](../../../_code/docs/standard/datetime/snippets/timeprovider-overview/csharp/CalendarHelper.cs.md)
[language="vb" source="./snippets/timeprovider-overview/vb/CalendarHelper.vb" id="CalendarHelper"::: (complete source file; reference: ./snippets/timeprovider-overview/vb/CalendarHelper.vb)](../../../_code/docs/standard/datetime/snippets/timeprovider-overview/vb/CalendarHelper.vb.md)

You might be inclined to write the previous code with [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) or [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) to get the current date and time, instead of [System.TimeProvider](https://learn.microsoft.com/search/?terms=System.TimeProvider). But with unit testing, it's hard to work around [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) or [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) directly. You would need to either run the tests on the day and month of the moon landing or further abstract the code into smaller but testable units.

The normal operation of your app uses `TimeProvider.System` to retrieve the current date and time:

[language="csharp" source="./snippets/timeprovider-overview/csharp/Program.cs" id="GreetingNormal"::: (complete source file; reference: ./snippets/timeprovider-overview/csharp/Program.cs)](../../../_code/docs/standard/datetime/snippets/timeprovider-overview/csharp/Program.cs.md)
[language="vb" source="./snippets/timeprovider-overview/vb/Program.vb" id="GreetingNormal"::: (complete source file; reference: ./snippets/timeprovider-overview/vb/Program.vb)](../../../_code/docs/standard/datetime/snippets/timeprovider-overview/vb/Program.vb.md)

And unit tests can be written to test specific scenarios, such as testing the anniversary of the moon landing:

[language="csharp" source="./snippets/timeprovider-overview/csharp/Program.cs" id="GreetingMoon"::: (complete source file; reference: ./snippets/timeprovider-overview/csharp/Program.cs)](../../../_code/docs/standard/datetime/snippets/timeprovider-overview/csharp/Program.cs.md)
[language="vb" source="./snippets/timeprovider-overview/vb/Program.vb" id="GreetingMoon"::: (complete source file; reference: ./snippets/timeprovider-overview/vb/Program.vb)](../../../_code/docs/standard/datetime/snippets/timeprovider-overview/vb/Program.vb.md)

## Use with .NET

Starting with .NET 8, the runtime library provides the [System.TimeProvider](https://learn.microsoft.com/search/?terms=System.TimeProvider) class. Older versions of .NET or libraries targeting .NET Standard 2.0 must reference the [`Microsoft.Bcl.TimeProvider` NuGet package](https://www.nuget.org/packages/Microsoft.Bcl.TimeProvider/).

The following methods related to asynchronous programming work with `TimeProvider`:

- [System.Threading.CancellationTokenSource.%23ctor(System.TimeSpan,System.TimeProvider)](https://learn.microsoft.com/search/?terms=System.Threading.CancellationTokenSource.%2523ctor(System.TimeSpan%2CSystem.TimeProvider))
- [System.Threading.Tasks.Task.Delay(System.TimeSpan,System.TimeProvider)](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.Delay(System.TimeSpan%2CSystem.TimeProvider))
- [System.Threading.Tasks.Task.Delay(System.TimeSpan,System.TimeProvider,System.Threading.CancellationToken)](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.Delay(System.TimeSpan%2CSystem.TimeProvider%2CSystem.Threading.CancellationToken))
- [System.Threading.Tasks.Task.WaitAsync(System.TimeSpan,System.TimeProvider)](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.WaitAsync(System.TimeSpan%2CSystem.TimeProvider))
- [System.Threading.Tasks.Task.WaitAsync(System.TimeSpan,System.TimeProvider,System.Threading.CancellationToken)](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.WaitAsync(System.TimeSpan%2CSystem.TimeProvider%2CSystem.Threading.CancellationToken))

## Use with .NET Framework

The [`Microsoft.Bcl.TimeProvider` NuGet package](https://www.nuget.org/packages/Microsoft.Bcl.TimeProvider/) implements [System.TimeProvider](https://learn.microsoft.com/search/?terms=System.TimeProvider).

Support for working with `TimeProvider` in asynchronous programming scenarios was added through the following extension methods:

- [System.Threading.Tasks.TimeProviderTaskExtensions.CreateCancellationTokenSource(System.TimeProvider,System.TimeSpan)](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TimeProviderTaskExtensions.CreateCancellationTokenSource(System.TimeProvider%2CSystem.TimeSpan))
- [System.Threading.Tasks.TimeProviderTaskExtensions.Delay(System.TimeProvider,System.TimeSpan,System.Threading.CancellationToken)](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TimeProviderTaskExtensions.Delay(System.TimeProvider%2CSystem.TimeSpan%2CSystem.Threading.CancellationToken))
- [System.Threading.Tasks.TimeProviderTaskExtensions.WaitAsync(System.Threading.Tasks.Task,System.TimeSpan,System.TimeProvider,System.Threading.CancellationToken)](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TimeProviderTaskExtensions.WaitAsync(System.Threading.Tasks.Task%2CSystem.TimeSpan%2CSystem.TimeProvider%2CSystem.Threading.CancellationToken))
- [System.Threading.Tasks.TimeProviderTaskExtensions.WaitAsync``1(System.Threading.Tasks.Task{``0},System.TimeSpan,System.TimeProvider,System.Threading.CancellationToken)](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TimeProviderTaskExtensions.WaitAsync%60%601(System.Threading.Tasks.Task%7B%60%600%7D%2CSystem.TimeSpan%2CSystem.TimeProvider%2CSystem.Threading.CancellationToken))
