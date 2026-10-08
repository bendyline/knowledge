---
title: "Enabling JIT-Attach Debugging"
description: Enable just-in time (JIT) attach debugging to attach a debugger to a process when you encounter errors. It can be triggered by certain methods or functions.
ms.date: "03/30/2017"
helpviewer_keywords:
  - "JIT-attach debugging"
  - "debugging [.NET Framework], JIT-attach debugging"
ms.assetid: f91fc5f7-de5a-4f23-b6ac-f450e63c662e
---
# Enabling JIT-Attach Debugging

> **Note:**
> This article is specific to .NET Framework. It doesn't apply to newer implementations of .NET, including .NET 6 and later versions.


JIT-attach debugging is the phrase used to describe attaching a debugger to a process when you encounter errors, or it can be triggered by specific methods or functions.

 JIT-attach debugging is used under the following fault conditions:

- Unhandled exceptions (in both native and managed code).

- [System.Environment.FailFast*](https://learn.microsoft.com/search/?terms=System.Environment.FailFast*) method or [RaiseFailFastException](https://learn.microsoft.com/windows/win32/api/errhandlingapi/nf-errhandlingapi-raisefailfastexception) function (Windows 7 family).

- Runtime fatal errors.

 JIT-attach debugging is also triggered by calls to the following methods and functions:

- [System.Diagnostics.Debugger.Launch*](https://learn.microsoft.com/search/?terms=System.Diagnostics.Debugger.Launch*) method.

- [System.Diagnostics.Debugger.Break*](https://learn.microsoft.com/search/?terms=System.Diagnostics.Debugger.Break*) method.

- [DebugBreak](https://learn.microsoft.com/windows/win32/api/debugapi/nf-debugapi-debugbreak) function (Win32).

 Before the .NET Framework 4, the .NET Framework provided separate registry keys to control the behavior of native and managed debuggers. Starting with the .NET Framework 4, control is consolidated under a single registry key: `HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\AeDebug`. The values you can set for that key determine whether a debugger is invoked, and, if so, whether it is invoked with a dialog box that requires user interaction. For information about setting this registry key, see [Configuring Automatic Debugging](https://learn.microsoft.com/windows/win32/debug/configuring-automatic-debugging).

## See also

- [Debugging, Tracing, and Profiling](index.md)
- [Making an Image Easier to Debug](making-an-image-easier-to-debug.md)
