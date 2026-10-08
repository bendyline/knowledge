---
title: Compatibility version for ASP.NET Core MVC
author: tdykstra
description: Discover how the Startup class in ASP.NET Core configures services and the app's request pipeline.
monikerRange: '>= aspnetcore-2.1'
ms.author: tdykstra
ms.date: 08/05/2026
uid: mvc/compatibility-version
---
# Compatibility version for ASP.NET Core MVC

By [Rick Anderson](https://twitter.com/RickAndMSFT)

**Applies to: \>= aspnetcore-3.0**

The [Microsoft.Extensions.DependencyInjection.MvcCoreMvcBuilderExtensions.SetCompatibilityVersion*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.MvcCoreMvcBuilderExtensions.SetCompatibilityVersion*) method is a no-op for ASP.NET Core 3.0 apps. That is, calling `SetCompatibilityVersion` with any value of [Microsoft.AspNetCore.Mvc.CompatibilityVersion](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.CompatibilityVersion) has no impact on the application.

* The next minor version of ASP.NET Core may provide a new `CompatibilityVersion` value.
* `CompatibilityVersion` values `Version_2_0` through `Version_2_2` are marked `[Obsolete(...)]`.
* The compatibility version APIs are removed in ASP.NET Core 11. For more information, see [MVC compatibility options removed](https://learn.microsoft.com/aspnet/core/breaking-changes/11/mvc-compatibility-options-removed).
* See [Breaking API changes in Antiforgery, CORS, Diagnostics, Mvc, and Routing](https://github.com/aspnet/Announcements/issues/387). This list includes breaking changes for compatibility switches.

To see how `SetCompatibilityVersion` works with ASP.NET Core 2.x apps, select the [ASP.NET Core 2.2 version of this article](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/mvc/compatibility-version.md?view=aspnetcore-2.2\&preserve-view=true).



**Applies to: < aspnetcore-3.0**

The [Microsoft.Extensions.DependencyInjection.MvcCoreMvcBuilderExtensions.SetCompatibilityVersion*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.MvcCoreMvcBuilderExtensions.SetCompatibilityVersion*) method allows an ASP.NET Core 2.x app to opt-in or opt-out of potentially breaking behavior changes introduced in ASP.NET Core MVC 2.1 or 2.2. These potentially breaking behavior changes are generally in how the MVC subsystem behaves and how **your code** is called by the runtime. By opting in, you get the latest behavior, and the long-term behavior of ASP.NET Core.

The following code sets the compatibility mode to ASP.NET Core 2.2:

[Main (complete source file; reference: compatibility-version/samples/2.x/CompatibilityVersionSample/Startup.cs?name=snippet1)](../../_code/aspnetcore/mvc/compatibility-version/samples/2.x/CompatibilityVersionSample/Startup.cs.md)

We recommend you test your app using the latest version (`CompatibilityVersion.Latest`). We anticipate that most apps won't have breaking behavior changes using the latest version.

Apps that call `SetCompatibilityVersion(CompatibilityVersion.Version_2_0)` are protected from potentially breaking behavior changes introduced in the ASP.NET Core 2.1/2.2 MVC versions. This protection:

* Does not apply to all 2.1 or later changes, it's targeted to potentially breaking ASP.NET Core runtime behavior changes in the MVC subsystem.
* Does not extend to ASP.NET Core 3.0.

The default compatibility for ASP.NET Core 2.1 and 2.2 apps that do **not** call `SetCompatibilityVersion` is 2.0 compatibility. That is, not calling `SetCompatibilityVersion` is the same as calling `SetCompatibilityVersion(CompatibilityVersion.Version_2_0)`.

The following code sets the compatibility mode to ASP.NET Core 2.2, except for the following behaviors:

* [Microsoft.AspNetCore.Mvc.MvcOptions.AllowCombiningAuthorizeFilters](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.MvcOptions.AllowCombiningAuthorizeFilters)
* [Microsoft.AspNetCore.Mvc.MvcOptions.InputFormatterExceptionPolicy](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.MvcOptions.InputFormatterExceptionPolicy)

[Main (complete source file; reference: compatibility-version/samples/2.x/CompatibilityVersionSample/Startup2.cs?name=snippet1)](../../_code/aspnetcore/mvc/compatibility-version/samples/2.x/CompatibilityVersionSample/Startup2.cs.md)

For apps that encounter breaking behavior changes, using the appropriate compatibility switches:

* Allows you to use the latest release and opt out of specific breaking behavior changes.
* Gives you time to update your app so it works with the latest changes.

The [Microsoft.AspNetCore.Mvc.MvcOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.MvcOptions) documentation has a good explanation of what changed and why the changes are an improvement for most users.

With ASP.NET Core 3.0, old behaviors supported by compatibility switches have been removed. We feel these are positive changes benefitting nearly all users. By introducing these changes in 2.1 and 2.2, most apps can benefit, while others have time to update.
