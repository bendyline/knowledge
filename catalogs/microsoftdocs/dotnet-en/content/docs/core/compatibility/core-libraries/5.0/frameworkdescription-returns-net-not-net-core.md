---
title: "Breaking change: FrameworkDescription's value is .NET instead of .NET Core"
description: Learn about the .NET 5 breaking change in core .NET libraries where RuntimeInformation.FrameworkDescription now returns ".NET" instead of ".NET Core".
ms.date: 11/01/2020
---
# FrameworkDescription's value is .NET instead of .NET Core

[System.Runtime.InteropServices.RuntimeInformation.FrameworkDescription](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.RuntimeInformation.FrameworkDescription) now returns ".NET" instead of ".NET Core".

## Change description

In previous .NET versions, [System.Runtime.InteropServices.RuntimeInformation.FrameworkDescription](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.RuntimeInformation.FrameworkDescription) returns ".NET Core" as part of the description string, for example, `.NET Core 3.1.1`.

Starting in .NET 5, [System.Runtime.InteropServices.RuntimeInformation.FrameworkDescription](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.RuntimeInformation.FrameworkDescription) returns ".NET" as part of the description string, for example, `.NET 5.0.0`.

## Reason for change

With .NET 5, `netcoreapp` is replaced by `net` as the short target-framework moniker. For consistency, the framework's description has also been updated. The change is cosmetic, as the `FrameworkName` isn't encoded anywhere else than in the [System.Runtime.InteropServices.RuntimeInformation.FrameworkDescription](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.RuntimeInformation.FrameworkDescription) property.

## Version introduced

5.0

## Recommended action

Update any code that searches for ".NET Core" in the string returned by [System.Runtime.InteropServices.RuntimeInformation.FrameworkDescription](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.RuntimeInformation.FrameworkDescription).

## Affected APIs

- [System.Runtime.InteropServices.RuntimeInformation.FrameworkDescription](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.RuntimeInformation.FrameworkDescription)

<!--

### Category

Core .NET libraries

### Affected APIs

- `P:System.Runtime.InteropServices.RuntimeInformation.FrameworkDescription`

-->
