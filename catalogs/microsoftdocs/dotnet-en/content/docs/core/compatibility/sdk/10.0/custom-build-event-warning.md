---
title: "Breaking change - MSBUILDCUSTOMBUILDEVENTWARNING escape hatch removed"
description: "Learn about the breaking change where the MSBUILDCUSTOMBUILDEVENTWARNING environment variable is no longer supported."
ms.date: 2/25/2025
ai-usage: ai-assisted
ms.custom: https://github.com/dotnet/docs/issues/44998
---

# MSBUILDCUSTOMBUILDEVENTWARNING escape hatch removed

The `MSBUILDCUSTOMBUILDEVENTWARNING` environment variable, which previously allowed custom build events derived from [Microsoft.Build.Framework.BuildEventArgs](https://learn.microsoft.com/search/?terms=Microsoft.Build.Framework.BuildEventArgs), is no longer supported.

## Version introduced

.NET 10

## Previous behavior

Previously, users could set the `MSBUILDCUSTOMBUILDEVENTWARNING` environment variable to enable processing of custom build events.

## New behavior

Starting in .NET 10, the value of the `MSBUILDCUSTOMBUILDEVENTWARNING` environment variable is not respected anymore.

## Type of breaking change

This change is a [behavioral change](../../categories.md#behavioral-change).

## Reason for change

The escape hatch mechanism provided by the `MSBUILDCUSTOMBUILDEVENTWARNING` environment variable was a temporary workaround. For more information, see the [original breaking change](../8.0/custombuildeventargs.md).

## Recommended action

Use one of the following newly introduced, built-in events for extensibility instead of your custom derived build event:

- [Microsoft.Build.Framework.ExtendedCustomBuildEventArgs](https://learn.microsoft.com/search/?terms=Microsoft.Build.Framework.ExtendedCustomBuildEventArgs)
- [Microsoft.Build.Framework.ExtendedBuildErrorEventArgs](https://learn.microsoft.com/search/?terms=Microsoft.Build.Framework.ExtendedBuildErrorEventArgs)
- [Microsoft.Build.Framework.ExtendedBuildMessageEventArgs](https://learn.microsoft.com/search/?terms=Microsoft.Build.Framework.ExtendedBuildMessageEventArgs)
- [Microsoft.Build.Framework.ExtendedBuildWarningEventArgs](https://learn.microsoft.com/search/?terms=Microsoft.Build.Framework.ExtendedBuildWarningEventArgs)

## Affected APIs

- [Microsoft.Build.Framework.CustomBuildEventArgs](https://learn.microsoft.com/search/?terms=Microsoft.Build.Framework.CustomBuildEventArgs)
