---
title: ".NET 8 breaking change: ProcessStartInfo.WindowStyle honored when UseShellExecute is false"
description: Learn about the .NET 8 breaking change in core .NET libraries where ProcessStartInfo.WindowStyle is now honored even when UseShellExecute is false.
ms.date: 11/08/2023
---
# ProcessStartInfo.WindowStyle honored when UseShellExecute is false

Previously, [System.Diagnostics.ProcessStartInfo.WindowStyle](https://learn.microsoft.com/search/?terms=System.Diagnostics.ProcessStartInfo.WindowStyle) was only honored when [System.Diagnostics.ProcessStartInfo.UseShellExecute](https://learn.microsoft.com/search/?terms=System.Diagnostics.ProcessStartInfo.UseShellExecute) was `true`. This change honors [System.Diagnostics.ProcessStartInfo.WindowStyle](https://learn.microsoft.com/search/?terms=System.Diagnostics.ProcessStartInfo.WindowStyle) even when [System.Diagnostics.ProcessStartInfo.UseShellExecute](https://learn.microsoft.com/search/?terms=System.Diagnostics.ProcessStartInfo.UseShellExecute) is `false`.

## Previous behavior

Prior to this change, the following code started the process as though [System.Diagnostics.ProcessStartInfo.WindowStyle](https://learn.microsoft.com/search/?terms=System.Diagnostics.ProcessStartInfo.WindowStyle) hadn't been specified, because `UseShellExecute = false`. That is, the window was visible, not hidden.

```csharp
using System.Diagnostics;

ProcessStartInfo startInfo = new()
{
    FileName = @"C:\Windows\System32\notepad.exe",
    UseShellExecute = false,
    WindowStyle = ProcessWindowStyle.Hidden
};

var process = Process.Start(startInfo);
process!.WaitForExit();
```

## New behavior

Starting in .NET 8, [System.Diagnostics.ProcessStartInfo.WindowStyle](https://learn.microsoft.com/search/?terms=System.Diagnostics.ProcessStartInfo.WindowStyle) is honored even for processes started with `UseShellExecute = false`.

The code from the [Previous behavior](#previous-behavior) section starts the process with the window hidden.

## Version introduced

.NET 8 Preview 6

## Type of breaking change

This change is a [behavioral change](../../categories.md#behavioral-change).

## Reason for change

Some scenarios require changing the style of the spawned process's window (especially to hide it).

## Recommended action

This change affects code that specified [System.Diagnostics.ProcessStartInfo.WindowStyle](https://learn.microsoft.com/search/?terms=System.Diagnostics.ProcessStartInfo.WindowStyle) even when it wasn't properly supported. For example, WPF's order of event firing is now altered. To mitigate the breaking change, don't specify `WindowStyle` in [System.Diagnostics.ProcessStartInfo](https://learn.microsoft.com/search/?terms=System.Diagnostics.ProcessStartInfo).

## Affected APIs

- [System.Diagnostics.Process.Start*](https://learn.microsoft.com/search/?terms=System.Diagnostics.Process.Start*)
