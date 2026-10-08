---
title: Razor Pages authorization conventions in ASP.NET Core
author: wadepickett
description: Learn how to control access to pages with conventions that authorize users and allow anonymous users to access pages or folders of pages.
monikerRange: '>= aspnetcore-2.1'
ms.author: wpickett
ms.date: 03/25/2026
uid: razor-pages/security/authorization/conventions
---
# Razor Pages authorization conventions in ASP.NET Core

One way to control access in a Razor Pages app is to use authorization conventions at startup. These conventions allow the app to authorize users and allow anonymous users to access individual pages or folders of pages. The conventions described in this article automatically apply [authorization filters](https://learn.microsoft.com/search/?terms=mvc%2Fcontrollers%2Ffilters%23authorization-filters) to control access.

[View or download sample code](https://github.com/dotnet/AspNetCore.Docs.Samples/tree/main/security/authorization/RazorPagesAuthorization) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample))

The sample app uses [cookie authentication without ASP.NET Core Identity](../../../security/authentication/cookie.md). To use ASP.NET Core Identity, follow the guidance in [security/authentication/identity](../../../security/authentication/identity.md).

## Require authorization to access a page

Use the [Microsoft.Extensions.DependencyInjection.PageConventionCollectionExtensions.AuthorizePage%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.PageConventionCollectionExtensions.AuthorizePage%252A) convention to add an [Microsoft.AspNetCore.Mvc.Authorization.AuthorizeFilter](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Authorization.AuthorizeFilter) to the page at the specified path:

**Applies to: \>= aspnetcore-10.0**

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/security/authorization/RazorPagesAuthorization/10.x/AuthorizationSample/Program.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/razor-pages/security/authorization/conventions.md)



**Applies to: \>= aspnetcore-3.0 < aspnetcore-10.0**

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/security/authorization/RazorPagesAuthorization/3.x/AuthorizationSample/Startup.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/razor-pages/security/authorization/conventions.md)



**Applies to: < aspnetcore-3.0**

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/security/authorization/RazorPagesAuthorization/2.x/AuthorizationSample/Startup.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/razor-pages/security/authorization/conventions.md)



The specified path is the View Engine path, which is the Razor Pages root relative path without an extension and containing only forward slashes.

To specify an [authorization policy](../../../security/authorization/policies.md), use an [`AuthorizePage` overload](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.PageConventionCollectionExtensions.AuthorizePage%252A):

```csharp
options.Conventions.AuthorizePage("/Contact", "AtLeast21");
```

> **Note:**
> An [Microsoft.AspNetCore.Mvc.Authorization.AuthorizeFilter](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Authorization.AuthorizeFilter) can be applied to a page model class with the `[Authorize]` filter attribute. For more information, see [razor-pages/filter#authorize-filter-attribute](https://learn.microsoft.com/search/?terms=razor-pages%2Ffilter%23authorize-filter-attribute).

## Require authorization to access a folder of pages

Use the [Microsoft.Extensions.DependencyInjection.PageConventionCollectionExtensions.AuthorizeFolder%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.PageConventionCollectionExtensions.AuthorizeFolder%252A) convention to add an [Microsoft.AspNetCore.Mvc.Authorization.AuthorizeFilter](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Authorization.AuthorizeFilter) to all of the pages in a folder at the specified path:

**Applies to: \>= aspnetcore-10.0**

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/security/authorization/RazorPagesAuthorization/10.x/AuthorizationSample/Program.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/razor-pages/security/authorization/conventions.md)



**Applies to: \>= aspnetcore-3.0 < aspnetcore-10.0**

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/security/authorization/RazorPagesAuthorization/3.x/AuthorizationSample/Startup.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/razor-pages/security/authorization/conventions.md)



**Applies to: < aspnetcore-3.0**

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/security/authorization/RazorPagesAuthorization/2.x/AuthorizationSample/Startup.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/razor-pages/security/authorization/conventions.md)



The specified path is the View Engine path, which is the Razor Pages root relative path containing only forward slashes.

To specify an [authorization policy](../../../security/authorization/policies.md), use an [`AuthorizeFolder` overload](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.PageConventionCollectionExtensions.AuthorizeFolder%252A):

```csharp
options.Conventions.AuthorizeFolder("/Private", "AtLeast21");
```

## Require authorization to access an area page

Use the [Microsoft.Extensions.DependencyInjection.PageConventionCollectionExtensions.AuthorizeAreaPage%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.PageConventionCollectionExtensions.AuthorizeAreaPage%252A) convention to add an [Microsoft.AspNetCore.Mvc.Authorization.AuthorizeFilter](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Authorization.AuthorizeFilter) to the area page at the specified path:

```csharp
options.Conventions.AuthorizeAreaPage("Identity", "/Manage/Accounts");
```

The page name is the path of the file without an extension relative to the pages root directory for the specified area. For example, the page name for the file `Areas/Identity/Pages/Manage/Accounts.cshtml` is `/Manage/Accounts`.

To specify an [authorization policy](../../../security/authorization/policies.md), use an [`AuthorizeAreaPage` overload](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.PageConventionCollectionExtensions.AuthorizeAreaPage%252A):

```csharp
options.Conventions.AuthorizeAreaPage("Identity", "/Manage/Accounts", "AtLeast21");
```

## Require authorization to access a folder of areas

Use the [Microsoft.Extensions.DependencyInjection.PageConventionCollectionExtensions.AuthorizeAreaFolder%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.PageConventionCollectionExtensions.AuthorizeAreaFolder%252A) convention to add an [Microsoft.AspNetCore.Mvc.Authorization.AuthorizeFilter](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Authorization.AuthorizeFilter) to all of the areas in a folder at the specified path:

```csharp
options.Conventions.AuthorizeAreaFolder("Identity", "/Manage");
```

The folder path is the path of the folder relative to the pages root directory for the specified area. For example, the folder path for the files under `Areas/Identity/Pages/Manage/` is `/Manage`.

To specify an [authorization policy](../../../security/authorization/policies.md), use an [`AuthorizeAreaFolder` overload](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.PageConventionCollectionExtensions.AuthorizeAreaFolder%252A):

```csharp
options.Conventions.AuthorizeAreaFolder("Identity", "/Manage", "AtLeast21");
```

## Allow anonymous access to a page

Use the [Microsoft.Extensions.DependencyInjection.PageConventionCollectionExtensions.AllowAnonymousToPage%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.PageConventionCollectionExtensions.AllowAnonymousToPage%252A) convention to add an [Microsoft.AspNetCore.Mvc.Authorization.AllowAnonymousFilter](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Authorization.AllowAnonymousFilter) to a page at the specified path:

**Applies to: \>= aspnetcore-10.0**

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/security/authorization/RazorPagesAuthorization/10.x/AuthorizationSample/Program.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/razor-pages/security/authorization/conventions.md)



**Applies to: \>= aspnetcore-3.0 < aspnetcore-10.0**

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/security/authorization/RazorPagesAuthorization/3.x/AuthorizationSample/Startup.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/razor-pages/security/authorization/conventions.md)



**Applies to: < aspnetcore-3.0**

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/security/authorization/RazorPagesAuthorization/2.x/AuthorizationSample/Startup.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/razor-pages/security/authorization/conventions.md)



The specified path is the View Engine path, which is the Razor Pages root relative path without an extension and containing only forward slashes.

## Allow anonymous access to a folder of pages

Use the [Microsoft.Extensions.DependencyInjection.PageConventionCollectionExtensions.AllowAnonymousToFolder%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.PageConventionCollectionExtensions.AllowAnonymousToFolder%252A) convention to add an [Microsoft.AspNetCore.Mvc.Authorization.AllowAnonymousFilter](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Authorization.AllowAnonymousFilter) to all of the pages in a folder at the specified path:

**Applies to: \>= aspnetcore-10.0**

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/security/authorization/RazorPagesAuthorization/10.x/AuthorizationSample/Program.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/razor-pages/security/authorization/conventions.md)



**Applies to: \>= aspnetcore-3.0 < aspnetcore-10.0**

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/security/authorization/RazorPagesAuthorization/3.x/AuthorizationSample/Startup.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/razor-pages/security/authorization/conventions.md)



**Applies to: < aspnetcore-3.0**

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/security/authorization/RazorPagesAuthorization/2.x/AuthorizationSample/Startup.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/razor-pages/security/authorization/conventions.md)



The specified path is the View Engine path, which is the Razor Pages root relative path without an extension and containing only forward slashes.

## Note on combining authorized and anonymous access

The app can specify that a folder of pages requires authorization and that a page within that folder allows anonymous access:

```csharp
// This works.
.AuthorizeFolder("/Private").AllowAnonymousToPage("/Private/Public")
```

The reverse, however, isn't valid. The app can't declare a folder of pages for anonymous access and specify a page within that folder that requires authorization:

```csharp
// This doesn't work!
.AllowAnonymousToFolder("/Public").AuthorizePage("/Public/Private")
```

Requiring authorization on the Private page fails. When both the [Microsoft.AspNetCore.Mvc.Authorization.AllowAnonymousFilter](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Authorization.AllowAnonymousFilter) and [Microsoft.AspNetCore.Mvc.Authorization.AuthorizeFilter](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Authorization.AuthorizeFilter) are applied to the page, the [Microsoft.AspNetCore.Mvc.Authorization.AllowAnonymousFilter](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Authorization.AllowAnonymousFilter) takes precedence and controls access.

## Additional resources

* [razor-pages/razor-pages-conventions](../../razor-pages-conventions.md)
* [Microsoft.AspNetCore.Mvc.ApplicationModels.PageConventionCollection](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApplicationModels.PageConventionCollection)
