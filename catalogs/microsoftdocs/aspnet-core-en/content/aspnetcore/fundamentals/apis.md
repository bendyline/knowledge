---
title: APIs overview
author: JeremyLikness
description: Learn how to build fast HTTP APIs with ASP.NET Core using Minimal APIs, the recommended approach for new projects.
ai-usage: ai-assisted
ms.author: wpickett
ms.date: 05/04/2026
ms.reviewer: jeliknes
monikerRange: '>= aspnetcore-6.0'
uid: fundamentals/apis
---

# APIs overview

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


 **Applies to: \>= aspnetcore-7.0**

ASP.NET Core provides two approaches for building HTTP APIs: **Minimal APIs** and controller-based APIs. **For new projects, we recommend using Minimal APIs** as they provide a simplified, high-performance approach for building APIs with minimal code and configuration.

## Minimal APIs - Recommended for new projects

Minimal APIs are the recommended approach for building fast HTTP APIs with ASP.NET Core. They allow you to build fully functioning REST endpoints with minimal code and configuration. Skip traditional scaffolding and avoid unnecessary controllers by fluently declaring API routes and actions.

Here's a simple example that creates an API at the root of the web app:

```csharp
var app = WebApplication.Create(args);

app.MapGet("/", () => "Hello World!");

app.Run();
```

Most APIs accept parameters as part of the route:

```csharp 
var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

app.MapGet("/users/{userId}/books/{bookId}", 
    (int userId, int bookId) => $"The user id is {userId} and book id is {bookId}");

app.Run();
```

Minimal APIs support the configuration and customization needed to scale to multiple APIs, handle complex routes, apply authorization rules, and control the content of API responses.

### Getting started with Minimal APIs

* **Tutorial**: [tutorials/min-web-api](../tutorials/min-web-api.md)
* **Quick reference**: [fundamentals/minimal-apis](minimal-apis.md)
* **Examples**: For a full list of common scenarios with code examples, see [fundamentals/minimal-apis](minimal-apis.md)

## Controller-based APIs - Alternative approach

ASP.NET Core also supports a controller-based approach where controllers are classes that derive from [Microsoft.AspNetCore.Mvc.ControllerBase](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase). This approach follows traditional object-oriented patterns and may be preferred for:

* Large applications with complex business logic
* Teams familiar with the MVC pattern
* Applications requiring specific MVC features

Here's sample code for an API based on controllers:

[language="csharp" source="\~/fundamentals/apis/APIWithControllers/Program.cs"::: (complete source file; reference: \~/fundamentals/apis/APIWithControllers/Program.cs)](../../_code/aspnetcore/fundamentals/apis/APIWithControllers/Program.cs.md)

[language="csharp" source="\~/fundamentals/apis/APIWithControllers/Controllers/WeatherForecastController.cs"::: (complete source file; reference: \~/fundamentals/apis/APIWithControllers/Controllers/WeatherForecastController.cs)](../../_code/aspnetcore/fundamentals/apis/APIWithControllers/Controllers/WeatherForecastController.cs.md)

The following code provides the same functionality using the recommended Minimal API approach:

[language="csharp" source="\~/fundamentals/apis/MinimalAPI/Program.cs"::: (complete source file; reference: \~/fundamentals/apis/MinimalAPI/Program.cs)](../../_code/aspnetcore/fundamentals/apis/MinimalAPI/Program.cs.md)

Both API projects refer to the following class:

[language="csharp" source="\~/fundamentals/apis/APIWithControllers/WeatherForecast.cs"::: (complete source file; reference: \~/fundamentals/apis/APIWithControllers/WeatherForecast.cs)](../../_code/aspnetcore/fundamentals/apis/APIWithControllers/WeatherForecast.cs.md)

## Choosing between approaches

**Start with Minimal APIs** for new projects. They offer:

* **Simpler syntax** - Less boilerplate code
* **Better performance** - Reduced overhead compared to controllers
* **Easier testing** - Simplified unit and integration testing
* **Modern approach** - Leverages the latest .NET features

**Consider controller-based APIs** if you need:

* Model binding extensibility ([Microsoft.AspNetCore.Mvc.ModelBinding.IModelBinderProvider](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ModelBinding.IModelBinderProvider), [Microsoft.AspNetCore.Mvc.ModelBinding.IModelBinder](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ModelBinding.IModelBinder))
* Advanced validation features ([Microsoft.AspNetCore.Mvc.ModelBinding.Validation.IModelValidator](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ModelBinding.Validation.IModelValidator))
* [Application parts](../mvc/advanced/app-parts.md) or the [application model](../mvc/controllers/application-model.md)
* [OData](https://www.nuget.org/packages/Microsoft.AspNetCore.OData/) support

Most of these features can be implemented in Minimal APIs with custom solutions, but controllers provide them out of the box.

## See also

* [tutorials/min-web-api](../tutorials/min-web-api.md) - Minimal API tutorial
* [fundamentals/minimal-apis](minimal-apis.md) - Minimal APIs quick reference
* [web-api/index](../web-api/index.md) - Controller-based APIs overview
* [tutorials/first-web-api](../tutorials/first-web-api.md) - Controller-based API tutorial



**Applies to: \= aspnetcore-6.0**

ASP.NET Core provides two approaches for building HTTP APIs: **Minimal APIs** and controller-based APIs. **For new projects, we recommend using Minimal APIs** as they provide a simplified, high-performance approach for building APIs with minimal code and configuration.

## Minimal APIs - Recommended for new projects

Minimal APIs are the recommended approach for building fast HTTP APIs with ASP.NET Core. They allow you to build fully functioning REST endpoints with minimal code and configuration.

Here's a simple example:

```csharp
var app = WebApplication.Create(args);

app.MapGet("/", () => "Hello World!");

app.Run();
```

### Getting started with Minimal APIs

* **Tutorial**: [tutorials/min-web-api](../tutorials/min-web-api.md)
* **Quick reference**: [fundamentals/minimal-apis](minimal-apis.md)

## Controller-based APIs - Alternative approach

Controllers are classes that derive from [Microsoft.AspNetCore.Mvc.ControllerBase](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase). This approach follows traditional object-oriented patterns.

Here's sample code for an API based on controllers:

[language="csharp" source="\~/fundamentals/apis/APIWithControllers/Program.cs"::: (complete source file; reference: \~/fundamentals/apis/APIWithControllers/Program.cs)](../../_code/aspnetcore/fundamentals/apis/APIWithControllers/Program.cs.md)

[language="csharp" source="\~/fundamentals/apis/APIWithControllers/Controllers/WeatherForecastController.cs"::: (complete source file; reference: \~/fundamentals/apis/APIWithControllers/Controllers/WeatherForecastController.cs)](../../_code/aspnetcore/fundamentals/apis/APIWithControllers/Controllers/WeatherForecastController.cs.md)

The following code provides the same functionality using the recommended Minimal API approach:

[language="csharp" source="\~/fundamentals/apis/MinimalAPI/Program.cs"::: (complete source file; reference: \~/fundamentals/apis/MinimalAPI/Program.cs)](../../_code/aspnetcore/fundamentals/apis/MinimalAPI/Program.cs.md)

Both API projects refer to the following class:

[language="csharp" source="\~/fundamentals/apis/APIWithControllers/WeatherForecast.cs"::: (complete source file; reference: \~/fundamentals/apis/APIWithControllers/WeatherForecast.cs)](../../_code/aspnetcore/fundamentals/apis/APIWithControllers/WeatherForecast.cs.md)

## Choosing between approaches

**Start with Minimal APIs** for new projects. Consider controller-based APIs if you need:

* Model binding extensibility ([Microsoft.AspNetCore.Mvc.ModelBinding.IModelBinderProvider](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ModelBinding.IModelBinderProvider), [Microsoft.AspNetCore.Mvc.ModelBinding.IModelBinder](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ModelBinding.IModelBinder))
* Form binding support, including [Microsoft.AspNetCore.Http.IFormFile](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IFormFile)
* Advanced validation features ([Microsoft.AspNetCore.Mvc.ModelBinding.Validation.IModelValidator](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ModelBinding.Validation.IModelValidator))
* [Application parts](../mvc/advanced/app-parts.md) or the [application model](../mvc/controllers/application-model.md)
* [OData](https://www.nuget.org/packages/Microsoft.AspNetCore.OData/) support

## See also

* [tutorials/min-web-api](../tutorials/min-web-api.md) - Minimal API tutorial
* [fundamentals/minimal-apis](minimal-apis.md) - Minimal APIs quick reference
* [web-api/index](../web-api/index.md) - Controller-based APIs overview
* [tutorials/first-web-api](../tutorials/first-web-api.md) - Controller-based API tutorial
