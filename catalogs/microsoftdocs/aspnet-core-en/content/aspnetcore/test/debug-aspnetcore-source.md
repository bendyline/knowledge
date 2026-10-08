---
title: Debug .NET and ASP.NET Core source code with Visual Studio
author: wadepickett
description: Debug .NET and ASP.NET Core source code with Visual Studio
monikerRange: '>= aspnetcore-3.1'
ms.author: wpickett
ms.date: 3/5/2022
uid: test/debug-aspnetcore-source
---
# Debug .NET and ASP.NET Core source code with Visual Studio

To debug .NET and ASP.NET Core source code in Visual Studio:

* In **Tools -> Options -> Debugging -> General**, un-check  **Enable Just My Code**.

  Enable Just My Code

* Verify **Enable Source Link support**  is checked.

  Enable Source Link support

* In **Tool -> Options -> Debugging -> Symbols**, enable **Microsoft Symbol Servers**.

  Microsoft Symbol Server

When you step into any .NET or ASP.NET Core code, Visual Studio displays the source code.  For example:

* Set a break point in `OnGet` in `Pages/Privacy.cshtml.cs` and select the **Privacy** link.
* Select one of the **Download Source and Continue Debugging** options.

  Source Link Will Download

The preceding instructions work for basic stepping into functions, but the optimized .NET code often removes local variables and functions. To disable optimizations and allow better source debugging:

* In **Tools -> Options -> Debugging -> General**, enable **Suppress JIT optimization on module load (Managed only)**:
  Suppress JIT optimization on module load
* Add the environment variable and value `COMPlus_ReadyToRun=0` to the `Properties/launchSettings.json` file:
  [Code example (complete source file; reference: \~/test/debug-aspnetcore-source/code/launchSettings.json?highlight=18,26)](../../_code/aspnetcore/test/debug-aspnetcore-source/code/launchSettings.json.md)

If you have debugged an app before with the previous version of .NET, delete the `%TEMP%/SymbolCache` directory as it can have old PDBs that are out of date.

## Debugging .NET Core on Unix over SSH

* [Debugging .NET Core on Unix over SSH](https://devblogs.microsoft.com/devops/debugging-net-core-on-unix-over-ssh/)
* [Debugging ASP Core on Linux with Visual Studio 2017](https://devblogs.microsoft.com/premier-developer/debugging-asp-core-on-linux-with-visual-studio-2017/)

## Additional resources

* [JIT Optimization and Debugging](https://learn.microsoft.com/visualstudio/debugger/jit-optimization-and-debugging)
* [Limitations of the 'Suppress JIT optimization' option](https://learn.microsoft.com/visualstudio/debugger/jit-optimization-and-debugging#limitations-of-the-suppress-jit-optimization-option) To set `COMPlus_ReadyToRun` to `0`
* [test/hot-reload](hot-reload.md)
* [Test Execution with Hot Reload](https://learn.microsoft.com/visualstudio/test/test-execution-with-hot-reload)
* [blazor/debug](../blazor/debug.md)
