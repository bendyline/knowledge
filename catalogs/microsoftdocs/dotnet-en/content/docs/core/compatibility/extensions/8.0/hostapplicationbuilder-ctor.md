---
title: "Breaking change: HostApplicationBuilderSettings.Args respected by HostApplicationBuilder ctor"
description: Learn about the .NET 8 breaking change in .NET extensions where the HostApplicationBuilder constructor respects the HostApplicationBuilderSettings.Args value even if DisableDefaults is true.
ms.date: 03/13/2023
---
# HostApplicationBuilderSettings.Args respected by HostApplicationBuilder ctor

The [Microsoft.Extensions.Hosting.HostApplicationBuilder](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.HostApplicationBuilder) constructor that accepts a [Microsoft.Extensions.Hosting.HostApplicationBuilderSettings](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.HostApplicationBuilderSettings) object now applies the [Microsoft.Extensions.Hosting.HostApplicationBuilderSettings.Args](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.HostApplicationBuilderSettings.Args) property, regardless of whether [Microsoft.Extensions.Hosting.HostApplicationBuilderSettings.DisableDefaults](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.HostApplicationBuilderSettings.DisableDefaults) is set to `true` or `false`.

## Version introduced

.NET 8 Preview 2

## Previous behavior

Previously, the [Microsoft.Extensions.Hosting.HostApplicationBuilderSettings.Args](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.HostApplicationBuilderSettings.Args) property was ignored when [Microsoft.Extensions.Hosting.HostApplicationBuilderSettings.DisableDefaults](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.HostApplicationBuilderSettings.DisableDefaults) was set to `true`.

## New behavior

Starting in .NET 8, the [Microsoft.Extensions.Hosting.HostApplicationBuilderSettings.Args](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.HostApplicationBuilderSettings.Args) value is added to [Microsoft.Extensions.Hosting.HostApplicationBuilder.Configuration](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.HostApplicationBuilder.Configuration) regardless of whether [Microsoft.Extensions.Hosting.HostApplicationBuilderSettings.DisableDefaults](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.HostApplicationBuilderSettings.DisableDefaults) is set to `true` or `false`.

## Type of breaking change

This change is a [behavioral change](../../categories.md#behavioral-change).

## Reason for change

The behavior of ignoring [Microsoft.Extensions.Hosting.HostApplicationBuilderSettings.Args](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.HostApplicationBuilderSettings.Args) was unexpected, even when [Microsoft.Extensions.Hosting.HostApplicationBuilderSettings.DisableDefaults](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.HostApplicationBuilderSettings.DisableDefaults) was set to `true`. That's because if the caller didn't want the command-line arguments applied to the [Microsoft.Extensions.Hosting.HostApplicationBuilder](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.HostApplicationBuilder), they wouldn't have set them on the [Microsoft.Extensions.Hosting.HostApplicationBuilderSettings](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.HostApplicationBuilderSettings) object. Since the caller *did* pass the command-line arguments on the settings, those arguments should be respected.

## Recommended action

If you don't want the command-line arguments to be added to the [Microsoft.Extensions.Hosting.HostApplicationBuilder](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.HostApplicationBuilder) configuration, leave the [Microsoft.Extensions.Hosting.HostApplicationBuilderSettings.Args](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.HostApplicationBuilderSettings.Args) property set to `null`.

## Affected APIs

- [Microsoft.Extensions.Hosting.HostApplicationBuilder.%23ctor(Microsoft.Extensions.Hosting.HostApplicationBuilderSettings)](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.HostApplicationBuilder.%2523ctor(Microsoft.Extensions.Hosting.HostApplicationBuilderSettings))
