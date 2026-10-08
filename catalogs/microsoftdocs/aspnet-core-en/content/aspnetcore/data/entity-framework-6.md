---
title: ASP.NET Core and Entity Framework 6
author: tdykstra
description: Entity Framework 6.3 or later works with ASP.NET Core 3.1 or later.
ms.author: tdykstra
ms.date: 11/06/2023
uid: data/entity-framework-6
---
# ASP.NET Core and Entity Framework 6

**Applies to: < aspnetcore-10.0**
> **Note:**
> This isn't the latest version of this article. For the current release, see the [.NET 10 version of this article](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/includes?view=aspnetcore-10.0\&preserve-view=true).


**Applies to: \= aspnetcore-7.0 || = aspnetcore-5.0 || = aspnetcore-3.0 || = aspnetcore-3.1 || = aspnetcore-2.0**
> **Warning:**
> This version of ASP.NET Core is no longer supported. For more information, see the [.NET and .NET Core Support Policy](https://dotnet.microsoft.com/platform/support/policy/dotnet-core). For the current release, see the [.NET 10 version of this article](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/includes?view=aspnetcore-10.0\&preserve-view=true).



<!-- Exclude until .NET 11 preview is added to the version selector collection
(add triple colon here) moniker range="> aspnetcore-10.0"
> [!IMPORTANT]
> This information relates to a pre-release product that may be substantially modified before it's commercially released. Microsoft makes no warranties, express or implied, with respect to the information provided here.
>
> For the current release, see the [.NET 10 version of this article](?view=aspnetcore-10.0&preserve-view=true).
(add triple colon here) moniker-end
-->

<!--
Include either this file or 'not-latest-version-without-not-supported-content.md' at the top 
of articles.

'not-latest-version.md' (this file): Includes not-supported content.
'not-latest-version-without-not-supported-content.md': Doesn't include not-supported content.

Use this file in articles that target >=7.0. For articles that target >=8.0 prior to 10.0
reaching EOL, 'not-latest-version-without-not-supported-content.md' must be used to avoid
a zone/file moniker range mismatch error.

When a new version is released, it might be necessary to temporarily comment out the current 
version moniker range section until the new moniker is created.

Markdown to include this file:

[!INCLUDE[](~/includes/not-latest-version.md)]
-->


**Applies to: \>= aspnetcore-3.0**

By [Patrick Goode](https://github.com/attrib75)

## Using Entity Framework 6 with ASP.NET Core

[Entity Framework Core](https://learn.microsoft.com/ef/) should be used for new development. The [download sample](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/data/entity-framework-6/3.xsample) uses [Entity Framework 6 (EF6)](https://learn.microsoft.com/ef/ef6), which can be used to migrate existing apps to ASP.NET Core.

## Additional resources

* [Entity Framework - Code-Based Configuration](https://learn.microsoft.com/ef/ef6/fundamentals/configuring/code-based)



**Applies to: < aspnetcore-3.0**

By [Paweł Grudzień](https://github.com/pgrudzien12) and [Damien Pontifex](https://github.com/DamienPontifex)

This article shows how to use Entity Framework 6 in an ASP.NET Core application.

## Overview

To use Entity Framework 6, your project has to compile against .NET Framework, as Entity Framework 6 doesn't support .NET Core. If you need cross-platform features you will need to upgrade to [Entity Framework Core](https://learn.microsoft.com/ef/).

The recommended way to use Entity Framework 6 in an ASP.NET Core application is to put the EF6 context and model classes in a class library project that targets .NET Framework. Add a reference to the class library from the ASP.NET Core project. See the sample [Visual Studio solution with EF6 and ASP.NET Core projects](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/data/entity-framework-6/sample/).

You can't put an EF6 context in an ASP.NET Core project because .NET Core projects don't support all of the functionality that EF6 commands such as *Enable-Migrations* require.

Regardless of project type in which you locate your EF6 context, only EF6 command-line tools work with an EF6 context. For example, `Scaffold-DbContext` is only available in Entity Framework Core. If you need to do reverse engineering of a database into an EF6 model, see [Code First to an Existing Database](https://learn.microsoft.com/ef/ef6/modeling/code-first/workflows/existing-database).

## Reference full framework and EF6 in the ASP.NET Core project

Your ASP.NET Core project needs to target .NET Framework and reference EF6. For example, the `.csproj` file of your ASP.NET Core project will look similar to the following example (only relevant parts of the file are shown).

[Code example (complete source file; reference: entity-framework-6/sample/MVCCore/MVCCore.csproj?range=3-9\&highlight=2)](../../_code/aspnetcore/data/entity-framework-6/sample/MVCCore/MVCCore.csproj.md)

When creating a new project, use the **ASP.NET Core Web Application (.NET Framework)** template.

## Handle connection strings

The EF6 command-line tools that you'll use in the EF6 class library project require a default constructor so they can instantiate the context. But you'll probably want to specify the connection string to use in the ASP.NET Core project, in which case your context constructor must have a parameter that lets you pass in the connection string. Here's an example.

[Code example (complete source file; reference: entity-framework-6/sample/EF6/SchoolContext.cs?name=snippet_Constructor)](../../_code/aspnetcore/data/entity-framework-6/sample/EF6/SchoolContext.cs.md)

Since your EF6 context doesn't have a parameterless constructor, your EF6 project has to provide an implementation of [System.Data.Entity.Infrastructure.IDbContextFactory%601](https://learn.microsoft.com/search/?terms=System.Data.Entity.Infrastructure.IDbContextFactory%25601). The EF6 command-line tools will find and use that implementation so they can instantiate the context. Here's an example.

[Code example (complete source file; reference: entity-framework-6/sample/EF6/SchoolContextFactory.cs?name=snippet_IDbContextFactory)](../../_code/aspnetcore/data/entity-framework-6/sample/EF6/SchoolContextFactory.cs.md)

In this sample code, the `IDbContextFactory` implementation passes in a hard-coded connection string. This is the connection string that the command-line tools will use. You'll want to implement a strategy to ensure that the class library uses the same connection string that the calling application uses. For example, you could get the value from an environment variable in both projects.

## Set up dependency injection in the ASP.NET Core project

In the Core project's `Startup.cs` file, set up the EF6 context for dependency injection (DI) in `ConfigureServices`. EF context objects should be scoped for a per-request lifetime.

[Code example (complete source file; reference: entity-framework-6/sample/MVCCore/Startup.cs?name=snippet_ConfigureServices\&highlight=5)](../../_code/aspnetcore/data/entity-framework-6/sample/MVCCore/Startup.cs.md)

You can then get an instance of the context in your controllers by using DI. The code is similar to what you'd write for an EF Core context:

[Code example (complete source file; reference: entity-framework-6/sample/MVCCore/Controllers/StudentsController.cs?name=snippet_ContextInController)](../../_code/aspnetcore/data/entity-framework-6/sample/MVCCore/Controllers/StudentsController.cs.md)

## Sample application

For a working sample application, see the [sample Visual Studio solution](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/data/entity-framework-6/sample/) that accompanies this article.

This sample can be created from scratch by the following steps in Visual Studio:

* Create a solution.

* **Add** > **New Project** > **Web** > **ASP.NET Core Web Application**
  * In project template selection dialog, select API and .NET Framework in dropdown

* **Add** > **New Project** > **Windows Desktop** > **Class Library (.NET Framework)**

* In **Package Manager Console** (PMC) for both projects, run the command `Install-Package Entityframework`.

* In the class library project, create data model classes and a context class, and an implementation of `IDbContextFactory`.

* In PMC for the class library project, run the commands `Enable-Migrations` and `Add-Migration Initial`. If you have set the ASP.NET Core project as the startup project, add `-StartupProjectName EF6` to these commands.

* In the Core project, add a project reference to the class library project.

* In the Core project, in `Startup.cs`, register the context for DI.

* In the Core project, in `appsettings.json`, add the connection string.

* In the Core project, add a controller and views to verify that you can read and write data. (Note that ASP.NET Core MVC scaffolding won't work with the EF6 context referenced from the class library.)
