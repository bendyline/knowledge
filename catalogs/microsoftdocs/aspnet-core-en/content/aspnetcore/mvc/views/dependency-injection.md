---
title: Dependency injection into views in ASP.NET Core
author: tdykstra
description: Learn how ASP.NET Core supports dependency injection into MVC views.
ms.author: tdykstra
ms.date: 10/14/2016
uid: mvc/views/dependency-injection
---
# Dependency injection into views in ASP.NET Core

**Applies to: \>= aspnetcore-6.0**

ASP.NET Core supports [dependency injection](../../fundamentals/dependency-injection.md) into views. This can be useful for view-specific services, such as localization or data required only for populating view elements. Most of the data views display should be passed in from the controller.

[View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/mvc/views/dependency-injection/6.0sample) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample))

## Configuration injection

The values in settings files, such as `appsettings.json` and `appsettings.Development.json`, can be injected into a view. Consider the `appsettings.Development.json` from the [sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/mvc/views/dependency-injection/6.0sample):

[Code example (complete source file; reference: \~/mvc/views/dependency-injection/6.0sample/WebViewInject/appsettings.Development.json?highlight=8-11)](../../../_code/aspnetcore/mvc/views/dependency-injection/6.0sample/WebViewInject/appsettings.Development.json.md)

The following markup displays the configuration value in a Razor Pages view:

[Code example (complete source file; reference: \~/mvc/views/dependency-injection/6.0sample/WebViewInject/Pages/Privacy.cshtml?highlight=3,4,13)](../../../_code/aspnetcore/mvc/views/dependency-injection/6.0sample/WebViewInject/Pages/Privacy.cshtml.md)

The following markup displays the configuration value in a MVC view:

[Code example (complete source file; reference: \~/mvc/views/dependency-injection/6.0sample/WebViewInject/Views/Home/Privacy.cshtml?highlight=1-2,11)](../../../_code/aspnetcore/mvc/views/dependency-injection/6.0sample/WebViewInject/Views/Home/Privacy.cshtml.md)

For more information, see [fundamentals/configuration/index](../../fundamentals/configuration/index.md)

## Service injection

A service can be injected into a view using the `@inject` directive.

[Code example (complete source file; reference: \~/mvc/views/dependency-injection/6.0sample/WebViewInject/Views/ToDo/Index.cshtml?highlight=4,5,15,16,17)](../../../_code/aspnetcore/mvc/views/dependency-injection/6.0sample/WebViewInject/Views/ToDo/Index.cshtml.md)

This view displays a list of `ToDoItem` instances, along with a summary showing overall statistics. The summary is populated from the injected `StatisticsService`. This service is registered for dependency injection in `ConfigureServices` in `Program.cs`:

[Code example (complete source file; reference: \~/mvc/views/dependency-injection/6.0sample/WebViewInject/Program.cs?highlight=11,12)](../../../_code/aspnetcore/mvc/views/dependency-injection/6.0sample/WebViewInject/Program.cs.md)

The `StatisticsService` performs some calculations on the set of `ToDoItem` instances, which it accesses via a repository:

[Code example (complete source file; reference: \~/mvc/views/dependency-injection/6.0sample/WebViewInject/Models/Services/StatisticsService.cs?highlight=15,20,25)](../../../_code/aspnetcore/mvc/views/dependency-injection/6.0sample/WebViewInject/Models/Services/StatisticsService.cs.md)

The sample repository uses an in-memory collection. An in-memory implementation shouldn't be used for large, remotely accessed data sets.

The sample displays data from the model bound to the view and the service injected into the view:

To Do view listing total items, completed items, average priority, and a list of tasks with their priority levels and boolean values indicating completion.

## Populating Lookup Data

View injection can be useful to populate options in UI elements, such as dropdown lists. Consider a user profile form that includes options for specifying gender, state, and other preferences. Rendering such a form using a standard approach might require the controller or Razor Page to:

* Request data access services for each of the sets of options.
* Populate a model or `ViewBag` with each set of options to be bound.

An alternative approach injects services directly into the view to obtain the options. This minimizes the amount of code required by the controller or razor Page, moving this view element construction logic into the view itself. The controller action or Razor Page to display a profile editing form only needs to pass the form the profile instance:

[Code example (complete source file; reference: \~/mvc/views/dependency-injection/6.0sample/WebViewInject/Controllers/ProfileController.cs)](../../../_code/aspnetcore/mvc/views/dependency-injection/6.0sample/WebViewInject/Controllers/ProfileController.cs.md)

The HTML form used to update the preferences includes dropdown lists for three of the properties:

Update Profile view with a form allowing the entry of name, gender, state, and favorite Color.

These lists are populated by a service that has been injected into the view:

[Code example (complete source file; reference: \~/mvc/views/dependency-injection/6.0sample/WebViewInject/Views/Profile/Index.cshtml?highlight=4,16,17,21,22,26,27)](../../../_code/aspnetcore/mvc/views/dependency-injection/6.0sample/WebViewInject/Views/Profile/Index.cshtml.md)

The `ProfileOptionsService` is a UI-level service designed to provide just the data needed for this form:

[Code example (complete source file; reference: \~/mvc/views/dependency-injection/6.0sample/WebViewInject/Models/Services/ProfileOptionsService.cs)](../../../_code/aspnetcore/mvc/views/dependency-injection/6.0sample/WebViewInject/Models/Services/ProfileOptionsService.cs.md)

Note an unregistered type throws an exception at runtime because the service provider is internally queried via [Microsoft.Extensions.DependencyInjection.ServiceProviderServiceExtensions.GetRequiredService%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.ServiceProviderServiceExtensions.GetRequiredService%252A).

## Overriding Services

In addition to injecting new services, this technique can be used to override previously injected services on a page. The figure below shows all of the fields available on the page used in the first example:

Intellisense contextual menu on a typed @ symbol listing Html, Component, StatsService, and Url fields

The default fields include `Html`, `Component`, and `Url`. To replace the default HTML Helpers with a custom version, use `@inject`:

[Code example (complete source file; reference: \~/mvc/views/dependency-injection/6.0sample/WebViewInject/Views/Helper/Index.cshtml?highlight=3,11)](../../../_code/aspnetcore/mvc/views/dependency-injection/6.0sample/WebViewInject/Views/Helper/Index.cshtml.md)

## See Also

* Simon Timms Blog: [Getting Lookup Data Into Your View](https://blog.simontimms.com/2015/06/09/getting-lookup-data-into-you-view/)



**Applies to: < aspnetcore-6.0**

ASP.NET Core supports [dependency injection](../../fundamentals/dependency-injection.md) into views. This can be useful for view-specific services, such as localization or data required only for populating view elements. You should try to maintain [separation of concerns](https://learn.microsoft.com/dotnet/standard/modern-web-apps-azure-architecture/architectural-principles#separation-of-concerns) between your controllers and views. Most of the data your views display should be passed in from the controller.

[View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/mvc/views/dependency-injection/sample) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample))

## Configuration injection

`appsettings.json` values can be injected directly into a view.

Example of an `appsettings.json` file:

```json
{
   "root": {
      "parent": {
         "child": "myvalue"
      }
   }
}
```

The syntax for `@inject`:
   `@inject <type> <name>`

An example using `@inject`:

```csharp
@using Microsoft.Extensions.Configuration
@inject IConfiguration Configuration
@{
   string myValue = Configuration["root:parent:child"];
   ...
}
```

## Service injection

A service can be injected into a view using the `@inject` directive. You can think of `@inject` as adding a property to the view, and populating the property using DI.

[Code example (complete source file; reference: ../../mvc/views/dependency-injection/sample/src/ViewInjectSample/Views/ToDo/Index.cshtml?highlight=4,5,15,16,17)](../../../_code/aspnetcore/mvc/views/dependency-injection/sample/src/ViewInjectSample/Views/ToDo/Index.cshtml.md)

This view displays a list of `ToDoItem` instances, along with a summary showing overall statistics. The summary is populated from the injected `StatisticsService`. This service is registered for dependency injection in `ConfigureServices` in `Startup.cs`:

[Code example (complete source file; reference: ../../mvc/views/dependency-injection/sample/src/ViewInjectSample/Startup.cs?highlight=6,7\&range=15-22)](../../../_code/aspnetcore/mvc/views/dependency-injection/sample/src/ViewInjectSample/Startup.cs.md)

The `StatisticsService` performs some calculations on the set of `ToDoItem` instances, which it accesses via a repository:

[Code example (complete source file; reference: ../../mvc/views/dependency-injection/sample/src/ViewInjectSample/Model/Services/StatisticsService.cs?highlight=15,20,25)](../../../_code/aspnetcore/mvc/views/dependency-injection/sample/src/ViewInjectSample/Model/Services/StatisticsService.cs.md)

The sample repository uses an in-memory collection. The implementation shown above (which operates on all of the data in memory) isn't recommended for large, remotely accessed data sets.

The sample displays data from the model bound to the view and the service injected into the view:

To Do view listing total items, completed items, average priority, and a list of tasks with their priority levels and boolean values indicating completion.

## Populating Lookup Data

View injection can be useful to populate options in UI elements, such as dropdown lists. Consider a user profile form that includes options for specifying gender, state, and other preferences. Rendering such a form using a standard MVC approach would require the controller to request data access services for each of these sets of options, and then populate a model or `ViewBag` with each set of options to be bound.

An alternative approach injects services directly into the view to obtain the options. This minimizes the amount of code required by the controller, moving this view element construction logic into the view itself. The controller action to display a profile editing form only needs to pass the form the profile instance:

[Code example (complete source file; reference: ../../mvc/views/dependency-injection/sample/src/ViewInjectSample/Controllers/ProfileController.cs?highlight=9,19)](../../../_code/aspnetcore/mvc/views/dependency-injection/sample/src/ViewInjectSample/Controllers/ProfileController.cs.md)

The HTML form used to update these preferences includes dropdown lists for three of the properties:

Update Profile view with a form allowing the entry of name, gender, state, and favorite Color.

These lists are populated by a service that has been injected into the view:

[Code example (complete source file; reference: ../../mvc/views/dependency-injection/sample/src/ViewInjectSample/Views/Profile/Index.cshtml?highlight=4,16,17,21,22,26,27)](../../../_code/aspnetcore/mvc/views/dependency-injection/sample/src/ViewInjectSample/Views/Profile/Index.cshtml.md)

The `ProfileOptionsService` is a UI-level service designed to provide just the data needed for this form:

[Code example (complete source file; reference: ../../mvc/views/dependency-injection/sample/src/ViewInjectSample/Model/Services/ProfileOptionsService.cs?highlight=7,13,24)](../../../_code/aspnetcore/mvc/views/dependency-injection/sample/src/ViewInjectSample/Model/Services/ProfileOptionsService.cs.md)

> **Important:**
> Don't forget to register types you request through dependency injection in `Startup.ConfigureServices`. An unregistered type throws an exception at runtime because the service provider is internally queried via [Microsoft.Extensions.DependencyInjection.ServiceProviderServiceExtensions.GetRequiredService%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.ServiceProviderServiceExtensions.GetRequiredService%252A).

## Overriding Services

In addition to injecting new services, this technique can also be used to override previously injected services on a page. The figure below shows all of the fields available on the page used in the first example:

Intellisense contextual menu on a typed @ symbol listing Html, Component, StatsService, and Url fields

As you can see, the default fields include `Html`, `Component`, and `Url` (as well as the `StatsService` that we injected). If for instance you wanted to replace the default HTML Helpers with your own, you could easily do so using `@inject`:

[Code example (complete source file; reference: ../../mvc/views/dependency-injection/sample/src/ViewInjectSample/Views/Helper/Index.cshtml?highlight=3,11)](../../../_code/aspnetcore/mvc/views/dependency-injection/sample/src/ViewInjectSample/Views/Helper/Index.cshtml.md)

If you want to extend existing services, you can simply use this technique while inheriting from or wrapping the existing implementation with your own.

## See Also

* Simon Timms Blog: [Getting Lookup Data Into Your View](https://blog.simontimms.com/2015/06/09/getting-lookup-data-into-you-view/)
