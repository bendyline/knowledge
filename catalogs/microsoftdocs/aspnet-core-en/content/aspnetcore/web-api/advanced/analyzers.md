---
title: Use web API analyzers
author: tdykstra
description: Learn about the ASP.NET Core MVC web API analyzers package.
monikerRange: '>= aspnetcore-3.1'
ms.author: tdykstra
ms.date: 07/06/2026
uid: web-api/advanced/analyzers
---
# Use web API analyzers

**Applies to: \>= aspnetcore-10.0**

> **Warning:**
> The `IncludeOpenAPIAnalyzers` MSBuild property and its associated MVC API analyzers are deprecated as of .NET 10 and will be removed in a future release. When `IncludeOpenAPIAnalyzers` is set to `true`, the build emits warning `ASPDEPR007`. Migrate to the [Microsoft.AspNetCore.Http.TypedResults](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.TypedResults) pattern, which provides compile-time response-type guarantees without separate analyzers. For more information, see [IncludeOpenAPIAnalyzers property and MVC API analyzers are deprecated](https://learn.microsoft.com/aspnet/core/breaking-changes/10/openapi-analyzers-deprecated?view=aspnetcore-10.0\&preserve-view=true).



ASP.NET Core provides an MVC analyzers package intended for use with web API projects. The analyzers work with controllers annotated with [Microsoft.AspNetCore.Mvc.ApiControllerAttribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApiControllerAttribute), while building on [web API conventions](conventions.md).

The analyzers package notifies you of any controller action that:

* Returns an undeclared status code.
* Returns an undeclared success result.
* Documents a status code that isn't returned.
* Includes an explicit model validation check.

## Reference the analyzer package

The analyzers are included in the .NET SDK. To enable the analyzer in your project, include the `IncludeOpenAPIAnalyzers` property in the project file:

```xml
<PropertyGroup>
 <IncludeOpenAPIAnalyzers>true</IncludeOpenAPIAnalyzers>
</PropertyGroup>
```

## Analyzers for web API conventions

OpenAPI documents contain status codes and response types that an action may return. In ASP.NET Core MVC, attributes such as [Microsoft.AspNetCore.Mvc.ProducesResponseTypeAttribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ProducesResponseTypeAttribute) and [Microsoft.AspNetCore.Mvc.ProducesAttribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ProducesAttribute) are used to document an action. [tutorials/web-api-help-pages-using-swagger](../../tutorials/web-api-help-pages-using-swagger.md) goes into further detail on documenting your web API.

One of the analyzers in the package inspects controllers annotated with [Microsoft.AspNetCore.Mvc.ApiControllerAttribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApiControllerAttribute) and identifies actions that don't entirely document their responses. Consider the following example:

[Code example (complete source file; reference: conventions/sample/Controllers/ContactsController.cs?name=missing404docs\&highlight=10)](../../../_code/aspnetcore/web-api/advanced/conventions/sample/Controllers/ContactsController.cs.md)

The preceding action documents the HTTP 200 success return type but doesn't document the HTTP 404 failure status code. The analyzer reports the missing documentation for the HTTP 404 status code as a warning. An option to fix the problem is provided.

analyzer reporting a warning

## Analyzers require Microsoft.NET.Sdk.Web

Analyzers don't work with library projects or projects referencing `Sdk="Microsoft.NET.Sdk"`.

## Additional resources

* [web-api/advanced/conventions](conventions.md)
* [tutorials/web-api-help-pages-using-swagger](../../tutorials/web-api-help-pages-using-swagger.md)
* [web-api/index](../index.md)
