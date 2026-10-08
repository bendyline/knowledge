---
title: "Breaking change: Razor runtime compilation is obsolete"
description: Learn about the breaking change in ASP.NET Core 10.0 where Razor runtime compilation APIs have been marked obsolete.
ms.date: 08/08/2025
ms.custom: https://github.com/aspnet/Announcements/issues/522
---

# Razor runtime compilation is obsolete

Razor runtime compilation is obsolete and is not recommended for production scenarios. For production scenarios, use the default build-time compilation. For development scenarios, use [Hot Reload](https://learn.microsoft.com/aspnet/core/test/hot-reload) instead.

## Version introduced

.NET 10 Preview 7

## Previous behavior

Previously, you could use [Razor runtime compilation](https://learn.microsoft.com/aspnet/core/mvc/views/view-compilation) to recompile `.cshtml` files while the application was running. This meant you didn't need to restart the application for changes to take effect.

## New behavior

Starting in .NET 10, use of the [affected APIs](#affected-apis) produces a compiler warning with diagnostic ID `ASPDEPR003`:

> warning ASPDEPR003: Razor runtime compilation is obsolete and is not recommended for production scenarios. For production scenarios, use the default build time compilation. For development scenarios, use Hot Reload instead. For more information, visit <https://aka.ms/aspnet/deprecate/003>.

## Type of breaking change

This change can affect [source compatibility](https://learn.microsoft.com/dotnet/core/compatibility/categories#source-compatibility).

## Reason for change

Razor runtime compilation has been replaced by [Hot Reload](https://learn.microsoft.com/aspnet/core/test/hot-reload), which has been the recommended approach for a few years now. This change makes it clearer that Razor runtime compilation doesn't get support for new features and should no longer be used.

## Recommended action

Remove calls to [Microsoft.Extensions.DependencyInjection.RazorRuntimeCompilationMvcBuilderExtensions.AddRazorRuntimeCompilation%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.RazorRuntimeCompilationMvcBuilderExtensions.AddRazorRuntimeCompilation%252A) and use [Hot Reload](https://learn.microsoft.com/aspnet/core/test/hot-reload) instead.

## Affected APIs

- [Microsoft.AspNetCore.Mvc.ApplicationParts.AssemblyPartExtensions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApplicationParts.AssemblyPartExtensions)
- [Microsoft.Extensions.DependencyInjection.RazorRuntimeCompilationMvcBuilderExtensions.AddRazorRuntimeCompilation%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.RazorRuntimeCompilationMvcBuilderExtensions.AddRazorRuntimeCompilation%252A)
- [Microsoft.Extensions.DependencyInjection.RazorRuntimeCompilationMvcCoreBuilderExtensions.AddRazorRuntimeCompilation%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.RazorRuntimeCompilationMvcCoreBuilderExtensions.AddRazorRuntimeCompilation%252A)
- [Microsoft.AspNetCore.Mvc.Razor.RuntimeCompilation.FileProviderRazorProjectItem](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Razor.RuntimeCompilation.FileProviderRazorProjectItem)
- [Microsoft.AspNetCore.Mvc.Razor.RuntimeCompilation.MvcRazorRuntimeCompilationOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Razor.RuntimeCompilation.MvcRazorRuntimeCompilationOptions)

## See also

- [.NET Hot Reload support for ASP.NET Core](https://learn.microsoft.com/aspnet/core/test/hot-reload)
