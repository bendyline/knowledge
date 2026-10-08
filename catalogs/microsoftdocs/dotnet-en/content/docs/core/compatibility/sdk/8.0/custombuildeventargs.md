---
title: "Breaking change: MSBuild custom derived build events deprecated"
description: Learn about the breaking change in MSBuild where custom derived build events have been deprecated.
ms.date: 09/05/2023
---
# MSBuild custom derived build events deprecated

Custom derived build events of any subclass of [Microsoft.Build.Framework.BuildEventArgs](https://learn.microsoft.com/search/?terms=Microsoft.Build.Framework.BuildEventArgs) by any build extensibility (mainly custom tasks) have been deprecated.

## Previous behavior

Previously, you could derive from any subclass of [Microsoft.Build.Framework.BuildEventArgs](https://learn.microsoft.com/search/?terms=Microsoft.Build.Framework.BuildEventArgs) and use those types freely in custom tasks and other build extensibility points.

## New behavior

Starting in .NET 8, a build error is issued if your code uses any type derived from [Microsoft.Build.Framework.BuildEventArgs](https://learn.microsoft.com/search/?terms=Microsoft.Build.Framework.BuildEventArgs) and you build using the .NET 8 version of MSBuild, that is, from the command line:

> Usage of unsecure BinaryFormatter during serialization of custom event type 'MyCustomBuildEventArgs'. This will be deprecated soon. Please use Extended*EventArgs instead. More info: <https://aka.ms/msbuild/eventargs>.

In .NET 10, the error message was changed to:

> Custom event type 'MyCustomBuildEventArgs' is not supported as all custom event types were deprecated. Please use Extended*EventArgs instead. More info: <https://aka.ms/msbuild/eventargs>.

Starting from Visual Studio version 17.10, the same behavior applies to builds in Visual Studio.

## Version introduced

.NET 8 RC 1

## Type of change

This change is a [behavioral change](../../categories.md#behavioral-change).

## Reason for change

[System.Runtime.Serialization.Formatters.Binary.BinaryFormatter](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.Formatters.Binary.BinaryFormatter) serialization is obsolete in .NET 8 and later versions. Any use of [System.Runtime.Serialization.Formatters.Binary.BinaryFormatter](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.Formatters.Binary.BinaryFormatter) is deemed insecure and throws an exception at runtime. Since MSBuild custom derived build events use [System.Runtime.Serialization.Formatters.Binary.BinaryFormatter](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.Formatters.Binary.BinaryFormatter), your build would crash if you used these events in your build. The new build error provides a more graceful failure.

## Recommended action

Use one of the following newly introduced, built-in events for extensibility instead of your custom derived build event:

- [Microsoft.Build.Framework.ExtendedCustomBuildEventArgs](https://learn.microsoft.com/search/?terms=Microsoft.Build.Framework.ExtendedCustomBuildEventArgs)
- [Microsoft.Build.Framework.ExtendedBuildErrorEventArgs](https://learn.microsoft.com/search/?terms=Microsoft.Build.Framework.ExtendedBuildErrorEventArgs)
- [Microsoft.Build.Framework.ExtendedBuildMessageEventArgs](https://learn.microsoft.com/search/?terms=Microsoft.Build.Framework.ExtendedBuildMessageEventArgs)
- [Microsoft.Build.Framework.ExtendedBuildWarningEventArgs](https://learn.microsoft.com/search/?terms=Microsoft.Build.Framework.ExtendedBuildWarningEventArgs)

Alternatively, you can temporarily disable the check by explicitly setting the environment variable `MSBUILDCUSTOMBUILDEVENTWARNING` to something other than `1`.

## Affected APIs

- [Microsoft.Build.Framework.CustomBuildEventArgs](https://learn.microsoft.com/search/?terms=Microsoft.Build.Framework.CustomBuildEventArgs)
