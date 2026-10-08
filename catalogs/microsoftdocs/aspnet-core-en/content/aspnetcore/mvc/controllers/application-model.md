---
title: Work with the application model in ASP.NET Core
author: tdykstra
description: Learn how to read and manipulate the application model to modify how MVC elements behave in ASP.NET Core.
ms.author: tdykstra
ms.date: 09/06/2026
uid: mvc/controllers/application-model
---
# Work with the application model in ASP.NET Core

By [Steve Smith](https://ardalis.com/)

ASP.NET Core MVC defines an *application model* representing the components of an MVC app. Read and manipulate this model to modify how MVC elements behave. By default, MVC follows certain conventions to determine which classes are considered controllers, which methods on those classes are actions, and how parameters and routing behave. Customize this behavior to suit an app's needs by creating custom conventions and applying them globally or as attributes.

## Models and Providers (`IApplicationModelProvider`)

The ASP.NET Core MVC application model includes both abstract interfaces and concrete implementation classes that describe an MVC application. This model is the result of MVC discovering the app's controllers, actions, action parameters, routes, and filters according to default conventions. By working with the application model, modify an app to follow different conventions from the default MVC behavior. The parameters, names, routes, and filters are all used as configuration data for actions and controllers.

The ASP.NET Core MVC Application Model has the following structure:

* ApplicationModel
  * Controllers (ControllerModel)
    * Actions (ActionModel)
      * Parameters (ParameterModel)

Each level of the model has access to a common `Properties` collection, and lower levels can access and overwrite property values set by higher levels in the hierarchy. The properties are persisted to the [Microsoft.AspNetCore.Mvc.Abstractions.ActionDescriptor.Properties](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Abstractions.ActionDescriptor.Properties) when the actions are created. Then when a request is being handled, any properties a convention added or modified can be accessed through [Microsoft.AspNetCore.Mvc.ActionContext.ActionDescriptor](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ActionContext.ActionDescriptor). Using properties is a great way to configure filters, model binders, and other app model aspects on a per-action basis.

> **Note:**
> The [Microsoft.AspNetCore.Mvc.Abstractions.ActionDescriptor.Properties](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Abstractions.ActionDescriptor.Properties) collection isn't thread safe (for writes) after app startup. Conventions are the best way to safely add data to this collection.

ASP.NET Core MVC loads the application model using a provider pattern, defined by the [Microsoft.AspNetCore.Mvc.ApplicationModels.IApplicationModelProvider](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApplicationModels.IApplicationModelProvider) interface. This section covers some of the internal implementation details of how this provider functions. Use of the provider pattern is an advanced subject, primarily for framework use. Most apps should use conventions, not the provider pattern.

Implementations of the [Microsoft.AspNetCore.Mvc.ApplicationModels.IApplicationModelProvider](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApplicationModels.IApplicationModelProvider) interface "wrap" one another, where each implementation calls [Microsoft.AspNetCore.Mvc.Abstractions.IActionInvokerProvider.OnProvidersExecuting%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Abstractions.IActionInvokerProvider.OnProvidersExecuting%252A) in ascending order based on its [Microsoft.AspNetCore.Mvc.ApplicationModels.IApplicationModelProvider.Order](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApplicationModels.IApplicationModelProvider.Order) property. The [Microsoft.AspNetCore.Mvc.Abstractions.IActionInvokerProvider.OnProvidersExecuted%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Abstractions.IActionInvokerProvider.OnProvidersExecuted%252A) method is then called in reverse order. The framework defines several providers:

First (`Order=-1000`):

* `DefaultApplicationModelProvider`

Then (`Order=-990`):

* `AuthorizationApplicationModelProvider`
* `CorsApplicationModelProvider`

> **Note:**
> The order in which two providers with the same value for `Order` are called is undefined and shouldn't be relied upon.

> **Note:**
> [Microsoft.AspNetCore.Mvc.ApplicationModels.IApplicationModelProvider](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApplicationModels.IApplicationModelProvider) is an advanced concept for framework authors to extend. In general, apps should use conventions, and frameworks should use providers. The key distinction is that providers always run before conventions.

The `DefaultApplicationModelProvider` establishes many of the default behaviors used by ASP.NET Core MVC. Its responsibilities include:

* Adding global filters to the context
* Adding controllers to the context
* Adding public controller methods as actions
* Adding action method parameters to the context
* Applying route and other attributes

Some built-in behaviors are implemented by the `DefaultApplicationModelProvider`. This provider is responsible for constructing the [Microsoft.AspNetCore.Mvc.ApplicationModels.ControllerModel](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApplicationModels.ControllerModel), which in turn references [Microsoft.AspNetCore.Mvc.ApplicationModels.ActionModel](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApplicationModels.ActionModel), [Microsoft.AspNetCore.Mvc.ApplicationModels.PropertyModel](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApplicationModels.PropertyModel), and [Microsoft.AspNetCore.Mvc.ApplicationModels.ParameterModel](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApplicationModels.ParameterModel) instances. The `DefaultApplicationModelProvider` class is an internal framework implementation detail that may change in the future.

The `AuthorizationApplicationModelProvider` is responsible for applying the behavior associated with the [Microsoft.AspNetCore.Mvc.Authorization.AuthorizeFilter](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Authorization.AuthorizeFilter) and [Microsoft.AspNetCore.Mvc.Authorization.AllowAnonymousFilter](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Authorization.AllowAnonymousFilter) attributes. For more information, see [security/authorization/simple](../../security/authorization/simple.md).

The `CorsApplicationModelProvider` implements behavior associated with [Microsoft.AspNetCore.Cors.Infrastructure.IEnableCorsAttribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.Infrastructure.IEnableCorsAttribute) and [Microsoft.AspNetCore.Cors.Infrastructure.IDisableCorsAttribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.Infrastructure.IDisableCorsAttribute). For more information, see [security/cors](../../security/cors.md).

Information on the framework's internal providers described in this section aren't available via the [.NET API browser](https://learn.microsoft.com/dotnet/api/). However, the providers may be inspected in the [ASP.NET Core reference source (dotnet/aspnetcore GitHub repository)](https://github.com/dotnet/aspnetcore). Use GitHub search to find the providers by name and select the version of the source with the **Switch branches/tags** dropdown list.

## Conventions

The application model defines convention abstractions that provide a simpler way to customize the behavior of the models than overriding the entire model or provider. These abstractions are the recommended way to modify an app's behavior. Conventions provide a way to write code that dynamically applies customizations. While [filters](filters.md) provide a means of modifying the framework's behavior, customizations permit control over how the whole app works together.

The following conventions are available:

* [Microsoft.AspNetCore.Mvc.ApplicationModels.IApplicationModelConvention](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApplicationModels.IApplicationModelConvention)
* [Microsoft.AspNetCore.Mvc.ApplicationModels.IControllerModelConvention](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApplicationModels.IControllerModelConvention)
* [Microsoft.AspNetCore.Mvc.ApplicationModels.IActionModelConvention](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApplicationModels.IActionModelConvention)
* [Microsoft.AspNetCore.Mvc.ApplicationModels.IParameterModelConvention](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApplicationModels.IParameterModelConvention)

Conventions are applied by adding them to MVC options or by implementing attributes and applying them to controllers, actions, or action parameters (similar to [filters](filters.md)).Unlike filters, conventions are only executed when the app is starting, not as part of each request.

> **Note:**
> For information on Razor Pages route and application model provider conventions, see [razor-pages/razor-pages-conventions](../../razor-pages/razor-pages-conventions.md).

## Modify the `ApplicationModel`

The following convention is used to add a property to the application model:

[Code example (complete source file; reference: ./application-model/sample/src/AppModelSample/Conventions/ApplicationDescription.cs)](../../../_code/aspnetcore/mvc/controllers/application-model/sample/src/AppModelSample/Conventions/ApplicationDescription.cs.md)

Application model conventions are applied as options when MVC is added in `Startup.ConfigureServices`:

[Code example (complete source file; reference: ./application-model/sample/src/AppModelSample/Startup.cs?name=ConfigureServices\&highlight=5)](../../../_code/aspnetcore/mvc/controllers/application-model/sample/src/AppModelSample/Startup.cs.md)

Properties are accessible from the [Microsoft.AspNetCore.Mvc.Abstractions.ActionDescriptor.Properties](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Abstractions.ActionDescriptor.Properties) collection within controller actions:

[Code example (complete source file; reference: ./application-model/sample/src/AppModelSample/Controllers/AppModelController.cs?name=AppModelController)](../../../_code/aspnetcore/mvc/controllers/application-model/sample/src/AppModelSample/Controllers/AppModelController.cs.md)

## Modify the `ControllerModel` description

The controller model can also include custom properties. Custom properties override existing properties with the same name specified in the application model. The following convention attribute adds a description at the controller level:

[Code example (complete source file; reference: ./application-model/sample/src/AppModelSample/Conventions/ControllerDescriptionAttribute.cs)](../../../_code/aspnetcore/mvc/controllers/application-model/sample/src/AppModelSample/Conventions/ControllerDescriptionAttribute.cs.md)

This convention is applied as an attribute on a controller:

[Code example (complete source file; reference: ./application-model/sample/src/AppModelSample/Controllers/DescriptionAttributesController.cs?name=ControllerDescription\&highlight=1)](../../../_code/aspnetcore/mvc/controllers/application-model/sample/src/AppModelSample/Controllers/DescriptionAttributesController.cs.md)

## Modify the `ActionModel` description

A separate attribute convention can be applied to individual actions, overriding behavior already applied at the application or controller level:

[Code example (complete source file; reference: ./application-model/sample/src/AppModelSample/Conventions/ActionDescriptionAttribute.cs)](../../../_code/aspnetcore/mvc/controllers/application-model/sample/src/AppModelSample/Conventions/ActionDescriptionAttribute.cs.md)

Applying this to an action within the controller demonstrates how it overrides the controller-level convention:

[Code example (complete source file; reference: ./application-model/sample/src/AppModelSample/Controllers/DescriptionAttributesController.cs?name=DescriptionAttributesController\&highlight=9)](../../../_code/aspnetcore/mvc/controllers/application-model/sample/src/AppModelSample/Controllers/DescriptionAttributesController.cs.md)

## Modify the `ParameterModel`

The following convention can be applied to action parameters to modify their [Microsoft.AspNetCore.Mvc.ModelBinding.BindingInfo](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ModelBinding.BindingInfo). The following convention requires that the parameter be a route parameter. Other potential binding sources, such as query string values, are ignored:

[Code example (complete source file; reference: ./application-model/sample/src/AppModelSample/Conventions/MustBeInRouteParameterModelConvention.cs)](../../../_code/aspnetcore/mvc/controllers/application-model/sample/src/AppModelSample/Conventions/MustBeInRouteParameterModelConvention.cs.md)

The attribute may be applied to any action parameter:

[Code example (complete source file; reference: ./application-model/sample/src/AppModelSample/Controllers/ParameterModelController.cs?name=ParameterModelController\&highlight=5)](../../../_code/aspnetcore/mvc/controllers/application-model/sample/src/AppModelSample/Controllers/ParameterModelController.cs.md)

To apply the convention to all action parameters, add the `MustBeInRouteParameterModelConvention` to [Microsoft.AspNetCore.Mvc.MvcOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.MvcOptions) in `Startup.ConfigureServices`:

```csharp
options.Conventions.Add(new MustBeInRouteParameterModelConvention());
```

## Modify the `ActionModel` name

The following convention modifies the [Microsoft.AspNetCore.Mvc.ApplicationModels.ActionModel](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApplicationModels.ActionModel) to update the *name* of the action to which it's applied. The new name is provided as a parameter to the attribute. This new name is used by routing, so it affects the route used to reach this action method:

[Code example (complete source file; reference: ./application-model/sample/src/AppModelSample/Conventions/CustomActionNameAttribute.cs)](../../../_code/aspnetcore/mvc/controllers/application-model/sample/src/AppModelSample/Conventions/CustomActionNameAttribute.cs.md)

This attribute is applied to an action method in the `HomeController`:

[Code example (complete source file; reference: ./application-model/sample/src/AppModelSample/Controllers/HomeController.cs?name=ActionModelConvention\&highlight=2)](../../../_code/aspnetcore/mvc/controllers/application-model/sample/src/AppModelSample/Controllers/HomeController.cs.md)

Even though the method name is `SomeName`, the attribute overrides the MVC convention of using the method name and replaces the action name with `MyCoolAction`. Thus, the route used to reach this action is `/Home/MyCoolAction`.

> **Note:**
> This example in this section is essentially the same as using the built-in [Microsoft.AspNetCore.Mvc.ActionNameAttribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ActionNameAttribute).

## Custom routing convention

Use an [Microsoft.AspNetCore.Mvc.ApplicationModels.IApplicationModelConvention](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApplicationModels.IApplicationModelConvention) to customize how routing works. For example, the following convention incorporates controllers' namespaces into their routes, replacing `.` in the namespace with `/` in the route:

[Code example (complete source file; reference: ./application-model/sample/src/AppModelSample/Conventions/NamespaceRoutingConvention.cs)](../../../_code/aspnetcore/mvc/controllers/application-model/sample/src/AppModelSample/Conventions/NamespaceRoutingConvention.cs.md)

The convention is added as an option in `Startup.ConfigureServices`:

[Code example (complete source file; reference: ./application-model/sample/src/AppModelSample/Startup.cs?name=ConfigureServices\&highlight=6)](../../../_code/aspnetcore/mvc/controllers/application-model/sample/src/AppModelSample/Startup.cs.md)

> **Tip:**
> Add conventions to [middleware](../../fundamentals/middleware/index.md) via [Microsoft.AspNetCore.Mvc.MvcOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.MvcOptions) using the following approach. The `{CONVENTION}` placeholder is the convention to add:
>
> ```csharp
> services.Configure<MvcOptions>(c => c.Conventions.Add({CONVENTION}));
> ```

The following example applies a convention to routes that aren't using attribute routing where the controller has  `Namespace` in its name:

[Code example (complete source file; reference: ./application-model/sample/src/AppModelSample/Controllers/NamespaceRoutingController.cs?highlight=7-8)](../../../_code/aspnetcore/mvc/controllers/application-model/sample/src/AppModelSample/Controllers/NamespaceRoutingController.cs.md)

**Applies to: <= aspnetcore-2.2**

## Application model usage in `WebApiCompatShim`

ASP.NET Core MVC uses a different set of conventions from ASP.NET Web API 2. Using custom conventions, you can modify an ASP.NET Core MVC app's behavior to be consistent with that of a web API app. Microsoft ships the [`WebApiCompatShim` NuGet package](https://www.nuget.org/packages/Microsoft.AspNetCore.Mvc.WebApiCompatShim) specifically for this purpose.

> **Note:**
> For more information on migration from ASP.NET Web API, see [migration/fx-to-core/areas/webapi](../../migration/fx-to-core/areas/webapi.md).

To use the Web API Compatibility Shim:

* Add the `Microsoft.AspNetCore.Mvc.WebApiCompatShim` package to the project.
* Add the conventions to MVC by calling [Microsoft.Extensions.DependencyInjection.WebApiCompatShimMvcBuilderExtensions.AddWebApiConventions%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.WebApiCompatShimMvcBuilderExtensions.AddWebApiConventions%252A) in `Startup.ConfigureServices`:

```csharp
services.AddMvc().AddWebApiConventions();
```

The conventions provided by the shim are only applied to parts of the app that have had certain attributes applied to them. The following four attributes are used to control which controllers should have their conventions modified by the shim's conventions:

* [Microsoft.AspNetCore.Mvc.WebApiCompatShim.UseWebApiActionConventionsAttribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.WebApiCompatShim.UseWebApiActionConventionsAttribute)
* [Microsoft.AspNetCore.Mvc.WebApiCompatShim.UseWebApiOverloadingAttribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.WebApiCompatShim.UseWebApiOverloadingAttribute)
* [Microsoft.AspNetCore.Mvc.WebApiCompatShim.UseWebApiParameterConventionsAttribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.WebApiCompatShim.UseWebApiParameterConventionsAttribute)
* [Microsoft.AspNetCore.Mvc.WebApiCompatShim.UseWebApiRoutesAttribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.WebApiCompatShim.UseWebApiRoutesAttribute)

### Action conventions

[Microsoft.AspNetCore.Mvc.WebApiCompatShim.UseWebApiActionConventionsAttribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.WebApiCompatShim.UseWebApiActionConventionsAttribute) is used to map the HTTP method to actions based on their name (for instance, `Get` would map to `HttpGet`). It only applies to actions that don't use attribute routing.

### Overloading

[Microsoft.AspNetCore.Mvc.WebApiCompatShim.UseWebApiOverloadingAttribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.WebApiCompatShim.UseWebApiOverloadingAttribute) is used to apply the [Microsoft.AspNetCore.Mvc.WebApiCompatShim.WebApiOverloadingApplicationModelConvention](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.WebApiCompatShim.WebApiOverloadingApplicationModelConvention) convention. This convention adds an [Microsoft.AspNetCore.Mvc.WebApiCompatShim.OverloadActionConstraint](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.WebApiCompatShim.OverloadActionConstraint) to the action selection process, which limits candidate actions to those for which the request satisfies all non-optional parameters.

### Parameter conventions

[Microsoft.AspNetCore.Mvc.WebApiCompatShim.UseWebApiParameterConventionsAttribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.WebApiCompatShim.UseWebApiParameterConventionsAttribute) is used to apply the [Microsoft.AspNetCore.Mvc.WebApiCompatShim.WebApiParameterConventionsApplicationModelConvention](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.WebApiCompatShim.WebApiParameterConventionsApplicationModelConvention) action convention. This convention specifies that simple types used as action parameters are bound from the URI by default, while complex types are bound from the request body.

### Routes

[Microsoft.AspNetCore.Mvc.WebApiCompatShim.UseWebApiRoutesAttribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.WebApiCompatShim.UseWebApiRoutesAttribute) controls whether the `WebApiApplicationModelConvention` controller convention is applied. When enabled, this convention is used to add support for [areas](areas.md) to the route and indicates the controller is in the `api` area.

In addition to a set of conventions, the compatibility package includes a [System.Web.Http.ApiController](https://learn.microsoft.com/search/?terms=System.Web.Http.ApiController) base class that replaces the one provided by web API. This allows your web API controllers written for web API and inheriting from its `ApiController` to work while running on ASP.NET Core MVC. All of the [`UseWebApi*`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.WebApiCompatShim) attributes listed earlier are applied to the base controller class. The `ApiController` exposes properties, methods, and result types that are compatible with those found in web API.



## Use `ApiExplorer` to document an app

The application model exposes an [Microsoft.AspNetCore.Mvc.ApplicationModels.ApiExplorerModel](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApplicationModels.ApiExplorerModel) property at each level that can be used to traverse the app's structure. This can be used to [generate help pages for web APIs using tools like Swagger](../../tutorials/web-api-help-pages-using-swagger.md). The `ApiExplorer` property exposes an [Microsoft.AspNetCore.Mvc.ApplicationModels.ApiExplorerModel.IsVisible](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApplicationModels.ApiExplorerModel.IsVisible) property that can be set to specify which parts of the app's model should be exposed. Configure this setting using a convention:

[Code example (complete source file; reference: ./application-model/sample/src/AppModelSample/Conventions/EnableApiExplorerApplicationConvention.cs)](../../../_code/aspnetcore/mvc/controllers/application-model/sample/src/AppModelSample/Conventions/EnableApiExplorerApplicationConvention.cs.md)

Using this approach (and additional conventions if required), API visibility is enabled or disabled at any level within an app.

### Custom API description providers with `IApiDescriptionProvider`

**Applies to: \>= aspnetcore-9.0**

Starting with .NET 9, ASP.NET Core includes built-in OpenAPI document generation in the [`Microsoft.AspNetCore.OpenApi`](https://www.nuget.org/packages/Microsoft.AspNetCore.OpenApi) package. To programmatically inspect or modify the generated OpenAPI output, use document, operation, and schema transformers rather than implementing [Microsoft.AspNetCore.Mvc.ApiExplorer.IApiDescriptionProvider](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApiExplorer.IApiDescriptionProvider) directly. For more information, see [fundamentals/openapi/aspnetcore-openapi](../../fundamentals/openapi/aspnetcore-openapi.md).



**Applies to: \>= aspnetcore-6.0 < aspnetcore-9.0**

> **Note:**
> [Microsoft.AspNetCore.Mvc.ApiExplorer.IApiDescriptionProvider](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApiExplorer.IApiDescriptionProvider) is an advanced extensibility point intended for framework and library authors. Most apps don't need to implement it. Starting with .NET 9, use the built-in OpenAPI document, operation, and schema transformers to customize generated API documentation. For more information, see [fundamentals/openapi/aspnetcore-openapi](../../fundamentals/openapi/aspnetcore-openapi.md).

ASP.NET Core uses [Microsoft.AspNetCore.Mvc.ApiExplorer.IApiDescriptionProvider](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApiExplorer.IApiDescriptionProvider) implementations to discover endpoints and generate [Microsoft.AspNetCore.Mvc.ApiExplorer.ApiDescription](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApiExplorer.ApiDescription) metadata. Tools such as Swashbuckle and NSwag inspect these `ApiDescription` instances when producing API documentation.

Implement [Microsoft.AspNetCore.Mvc.ApiExplorer.IApiDescriptionProvider](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApiExplorer.IApiDescriptionProvider) to programmatically inspect or modify `ApiDescription` instances produced by the framework:

* [Microsoft.AspNetCore.Mvc.ApiExplorer.IApiDescriptionProvider.OnProvidersExecuting%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApiExplorer.IApiDescriptionProvider.OnProvidersExecuting%252A): Executes in ascending order of the [Microsoft.AspNetCore.Mvc.ApiExplorer.IApiDescriptionProvider.Order](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApiExplorer.IApiDescriptionProvider.Order) property to construct `ApiDescription` metadata for discovered endpoints.
* [Microsoft.AspNetCore.Mvc.ApiExplorer.IApiDescriptionProvider.OnProvidersExecuted%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApiExplorer.IApiDescriptionProvider.OnProvidersExecuted%252A): Executes in reverse order after all providers have executed, allowing customization or enrichment of generated `ApiDescription` instances.

The following example demonstrates a custom `IApiDescriptionProvider` that adds custom metadata properties to discovered API descriptions:

```csharp
using Microsoft.AspNetCore.Mvc.ApiExplorer;

public class CustomApiDescriptionProvider : IApiDescriptionProvider
{
    // Execute after the framework's default ApiDescriptionProvider (Order = -1000)
    public int Order => 0;

    public void OnProvidersExecuting(ApiDescriptionProviderContext context)
    {
        // No action required during initial execution phase
    }

    public void OnProvidersExecuted(ApiDescriptionProviderContext context)
    {
        foreach (var apiDescription in context.Results)
        {
            // Enrich or modify ApiDescription metadata
            apiDescription.Properties["CustomMetadata"] = "CustomValue";
        }
    }
}
```

Register the custom provider with dependency injection using [Microsoft.Extensions.DependencyInjection.Extensions.ServiceCollectionDescriptorExtensions.TryAddEnumerable%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.Extensions.ServiceCollectionDescriptorExtensions.TryAddEnumerable%252A) in `Program.cs`:

```csharp
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.Extensions.DependencyInjection.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.TryAddEnumerable(
    ServiceDescriptor.Transient<IApiDescriptionProvider, CustomApiDescriptionProvider>());

var app = builder.Build();
```
