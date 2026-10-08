---
title: "Breaking change: ContentRootPath for apps launched by Windows Shell"
description: Learn about the .NET 7 breaking change in .NET extensions where the 'ContentRootPath' property no longer defaults to the current directory for apps launched by Windows Shell or services.exe.
ms.date: 06/22/2022
---
# ContentRootPath for apps launched by Windows Shell

The [Microsoft.Extensions.Hosting.IHostEnvironment.ContentRootPath](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.IHostEnvironment.ContentRootPath) property represents the default directory where *appsettings.json* and other content files are loaded in a hosted application, including ASP.NET apps. This property's value defaults to [System.Environment.CurrentDirectory](https://learn.microsoft.com/search/?terms=System.Environment.CurrentDirectory), which is the current working directory of the application. This behavior allows the same app to be executed under different working directories and use the content from each directory.

When a Windows process (either application or service) is launched without specifying a working directory, the working directory of the process that [created it](https://learn.microsoft.com/windows/win32/api/processthreadsapi/nf-processthreadsapi-createprocessa) is used. The working directory of Windows Shell or *services.exe* is *%windir%\system32* (or the `System` special folder). When either of those processes launches a hosted app, the `ContentRootPath` property is set to *%windir%\system32*.

This behavior is confusing and causes hosted applications to fail, because the application tries to load files from the *%windir%\system32* directory, but it doesn't exist. For example, the *appsettings.json* file is not found at runtime and the settings aren't applied.

Starting with .NET 7, when a hosted application is launched with the current directory set to the `System` special folder, it defaults the `ContentRootPath` property to [System.AppContext.BaseDirectory](https://learn.microsoft.com/search/?terms=System.AppContext.BaseDirectory).

## Version introduced

.NET 7

## Previous behavior

[Microsoft.Extensions.Hosting.Host.CreateDefaultBuilder*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.Host.CreateDefaultBuilder*) defaulted the [Microsoft.Extensions.Hosting.IHostEnvironment.ContentRootPath](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.IHostEnvironment.ContentRootPath) property to [System.Environment.CurrentDirectory](https://learn.microsoft.com/search/?terms=System.Environment.CurrentDirectory) regardless of the value of the current directory.

## New behavior

[Microsoft.Extensions.Hosting.Host.CreateDefaultBuilder*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.Host.CreateDefaultBuilder*) no longer defaults the [Microsoft.Extensions.Hosting.IHostEnvironment.ContentRootPath](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.IHostEnvironment.ContentRootPath) property to the current directory if it's the `System` special folder on Windows. Instead, the base directory of the application is used.

## Type of breaking change

This change can affect [binary compatibility](../../categories.md#binary-compatibility).

## Reason for change

App developers weren't expecting [Microsoft.Extensions.Hosting.IHostEnvironment.ContentRootPath](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.IHostEnvironment.ContentRootPath) to be *C:\Windows\system32* when their application was launched by Windows in certain cases (for example, when the app was packaged as an MSIX or started from the Start Menu). In these cases, it's better to default the [Microsoft.Extensions.Hosting.IHostEnvironment.ContentRootPath](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.IHostEnvironment.ContentRootPath) property to the base directory of the application.

## Recommended action

If you want to use the previous behavior, you can set the `ContentRootPath` property explicitly when creating the [Microsoft.Extensions.Hosting.IHostBuilder](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.IHostBuilder):

```csharp
Host
    .CreateDefaultBuilder()
    .UseContentRoot(Environment.CurrentDirectory)
    ....
```

## Affected APIs

- [Microsoft.Extensions.Hosting.Host.CreateDefaultBuilder*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.Host.CreateDefaultBuilder*)
