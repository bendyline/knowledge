---
title: ".NET 8 breaking change: GetSystemVersion no longer returns ImageRuntimeVersion"
description: Learn about the .NET 8 breaking change in core .NET libraries where RuntimeEnvironment.GetSystemVersion no longer returns ImageRuntimeVersion, which is a .NET Framework-oriented value.
ms.date: 09/06/2023
---
# GetSystemVersion no longer returns ImageRuntimeVersion

[System.Runtime.InteropServices.RuntimeEnvironment.GetSystemVersion](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.RuntimeEnvironment.GetSystemVersion) no longer returns [System.Reflection.Assembly.ImageRuntimeVersion](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly.ImageRuntimeVersion), which is a .NET Framework-oriented value. It's been updated to return a more relevant value, however, the historical leading `v` has been maintained.

## Previous behavior

[System.Runtime.InteropServices.RuntimeEnvironment.GetSystemVersion](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.RuntimeEnvironment.GetSystemVersion) returned [System.Reflection.Assembly.ImageRuntimeVersion](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly.ImageRuntimeVersion), which is an indicator of .NET Framework in-place replacement, not a product release.

Example: `v4.0.30319`

## New behavior

Starting in .NET 8, [System.Runtime.InteropServices.RuntimeEnvironment.GetSystemVersion](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.RuntimeEnvironment.GetSystemVersion) returns `"v"` concatenated with [System.Environment.Version](https://learn.microsoft.com/search/?terms=System.Environment.Version), which is the version of the CLR.

Example: `v8.0.0`

## Version introduced

.NET 8 RC 1

## Type of breaking change

This change is a [behavioral change](../../categories.md#behavioral-change).

## Reason for change

The existing version wasn't useful or meaningful for .NET.

## Recommended action

Update your code to expect the new version, or use `typeof(object).Assembly.ImageRuntimeVersion` instead.

## Affected APIs

- [System.Runtime.InteropServices.RuntimeEnvironment.GetSystemVersion](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.RuntimeEnvironment.GetSystemVersion)

## See also

The following changes are related:

- [Improved .NET Core version APIs](../../../whats-new/dotnet-core-3-0.md#improved-net-core-version-apis)
- [FrameworkDescription's value is .NET instead of .NET Core](../5.0/frameworkdescription-returns-net-not-net-core.md)
