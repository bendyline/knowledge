---
title: Create web APIs with ASP.NET Core
author: tdykstra
description: Learn the basics of creating a web API in ASP.NET Core.
monikerRange: '>= aspnetcore-2.1'
ms.author: tdykstra
ms.date: 05/06/2026
uid: web-api/index
---
# Create web APIs with ASP.NET Core

**Applies to: \>= aspnetcore-7.0**

ASP.NET Core supports creating web APIs using controllers or using Minimal APIs. *Controllers* in a web API are classes that derive from [Microsoft.AspNetCore.Mvc.ControllerBase](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase). Controllers are activated and disposed on a per request basis.

This article shows how to use controllers for handling web API requests. For information on creating web APIs without controllers, see [tutorials/min-web-api](../tutorials/min-web-api.md).


**Applies to: \>= aspnetcore-10.0**
> **Important:**
> Starting with ASP.NET Core 10, known API endpoints no longer redirect to login pages when using cookie authentication. Instead, they return 401/403 status codes. For details, see [security/authentication/api-endpoint-auth](../security/authentication/api-endpoint-auth.md).

**Applies to: \>= aspnetcore-7.0**

## ControllerBase class

A controller-based web API consists of one or more controller classes that derive from [Microsoft.AspNetCore.Mvc.ControllerBase](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase). The web API project template provides a starter controller:

[Code example (complete source file; reference: index/samples/6.x/Controllers/WeatherForecastController.cs?name=snippet_ControllerSignature\&highlight=3)](../../_code/aspnetcore/web-api/index/samples/6.x/Controllers/WeatherForecastController.cs.md)

Web API controllers should typically derive from [Microsoft.AspNetCore.Mvc.ControllerBase](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase) rather from [Microsoft.AspNetCore.Mvc.Controller](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Controller). `Controller` derives from [Microsoft.AspNetCore.Mvc.ControllerBase](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase) and adds support for views, so it's for handling web pages, not web API requests. If the same controller must support views and web APIs, derive from `Controller`.

The `ControllerBase` class provides many properties and methods that are useful for handling HTTP requests. For example, [Microsoft.AspNetCore.Mvc.ControllerBase.CreatedAtAction%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase.CreatedAtAction%252A) returns a 201 status code:

[Code example (complete source file; reference: index/samples/6.x/Controllers/PetsController.cs?name=snippet_400And201\&highlight=10)](../../_code/aspnetcore/web-api/index/samples/6.x/Controllers/PetsController.cs.md)

The following table contains examples of methods in `ControllerBase`.

| Method | Notes |
| --- | --- |
| [Microsoft.AspNetCore.Mvc.ControllerBase.BadRequest%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase.BadRequest%252A) | Returns 400 status code. |
| [Microsoft.AspNetCore.Mvc.ControllerBase.NotFound%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase.NotFound%252A) | Returns 404 status code. |
| [Microsoft.AspNetCore.Mvc.ControllerBase.PhysicalFile%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase.PhysicalFile%252A) | Returns a file. |
| [Microsoft.AspNetCore.Mvc.ControllerBase.TryUpdateModelAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase.TryUpdateModelAsync%252A) | Invokes [model binding](../mvc/models/model-binding.md). |
| [Microsoft.AspNetCore.Mvc.ControllerBase.TryValidateModel%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase.TryValidateModel%252A) | Invokes [model validation](../mvc/models/validation.md). |

For a list of all available methods and properties, see [Microsoft.AspNetCore.Mvc.ControllerBase](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase).

## Attributes

The [Microsoft.AspNetCore.Mvc](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc) namespace provides attributes that can be used to configure the behavior of web API controllers and action methods. The following example uses attributes to specify the supported HTTP action verb and any known HTTP status codes that could be returned:

[Code example (complete source file; reference: index/samples/6.x/Controllers/PetsController.cs?name=snippet_400And201\&highlight=1-3)](../../_code/aspnetcore/web-api/index/samples/6.x/Controllers/PetsController.cs.md)

Here are some more examples of attributes that are available.

| Attribute | Notes |
| --- | --- |
| [`[Route]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.RouteAttribute) | Specifies URL pattern for a controller or action. |
| [`[Bind]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.BindAttribute) | Specifies prefix and properties to include for model binding. |
| [`[HttpGet]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.HttpGetAttribute) | Identifies an action that supports the HTTP GET action verb. |
| [`[Consumes]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ConsumesAttribute) | Specifies data types that an action accepts. |
| [`[Produces]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ProducesAttribute) | Specifies data types that an action returns. |

For a list that includes the available attributes, see the [Microsoft.AspNetCore.Mvc](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc) namespace.

## ApiController attribute

The [`[ApiController]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApiControllerAttribute) attribute can be applied to a controller class to enable the following opinionated, API-specific behaviors:

* [Attribute routing requirement](#attribute-routing-requirement)
* [Automatic HTTP 400 responses](#automatic-http-400-responses)
* [Binding source parameter inference](#binding-source-parameter-inference)
* [Multipart/form-data request inference](#multipartform-data-request-inference)
* [Problem details for error status codes](#problem-details-for-error-status-codes)

### Attribute on specific controllers

The `[ApiController]` attribute can be applied to specific controllers, as in the following example from the project template:

[Code example (complete source file; reference: index/samples/6.x/Controllers/WeatherForecastController.cs?name=snippet_ControllerSignature\&highlight=2\])](../../_code/aspnetcore/web-api/index/samples/6.x/Controllers/WeatherForecastController.cs.md)

### Attribute on multiple controllers

One approach to using the attribute on more than one controller is to create a custom base controller class annotated with the [`[ApiController]`](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/web-api/\[Microsoft.AspNetCore.Mvc.ApiControllerAttribute]\(https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApiControllerAttribute\)) attribute. The following example shows a custom base class and a controller that derives from it:

[Code example (complete source file; reference: index/samples/6.x/Controllers/MyControllerBase.cs?name=snippet_MyControllerBase)](../../_code/aspnetcore/web-api/index/samples/6.x/Controllers/MyControllerBase.cs.md)

[Code example (complete source file; reference: index/samples/6.x/Controllers/PetsController.cs?name=snippet_Inherit)](../../_code/aspnetcore/web-api/index/samples/6.x/Controllers/PetsController.cs.md)

### Attribute on an assembly

The `[ApiController]` attribute can be applied to an assembly. When the `[ApiController]` attribute is applied to an assembly, all controllers in the assembly have the `[ApiController]` attribute applied. There's no way to opt out for individual controllers. Apply the assembly-level attribute to the `Program.cs` file:

[Code example (complete source file; reference: index/samples/6.x/Program.cs?name=snippet_global\&highlight=1-3)](../../_code/aspnetcore/web-api/index/samples/6.x/Program.cs.md)

## Attribute routing requirement

The `[ApiController]` attribute makes attribute routing a requirement. For example:

[Code example (complete source file; reference: index/samples/3.x/Controllers/WeatherForecastController.cs?name=snippet_ControllerSignature\&highlight=2)](../../_code/aspnetcore/web-api/index/samples/3.x/Controllers/WeatherForecastController.cs.md)

Actions are inaccessible via [conventional routes](https://learn.microsoft.com/search/?terms=mvc%2Fcontrollers%2Frouting%23conventional-routing) defined by `UseEndpoints`, [Microsoft.AspNetCore.Builder.MvcApplicationBuilderExtensions.UseMvc%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.MvcApplicationBuilderExtensions.UseMvc%252A), or [Microsoft.AspNetCore.Builder.MvcApplicationBuilderExtensions.UseMvcWithDefaultRoute%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.MvcApplicationBuilderExtensions.UseMvcWithDefaultRoute%252A).

## Automatic HTTP 400 responses

The `[ApiController]` attribute makes model validation errors automatically trigger an HTTP 400 response. Consequently, the following code is unnecessary in an action method:

```csharp
if (!ModelState.IsValid)
{
    return BadRequest(ModelState);
}
```

ASP.NET Core MVC uses the [Microsoft.AspNetCore.Mvc.Infrastructure.ModelStateInvalidFilter](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Infrastructure.ModelStateInvalidFilter) action filter to do the preceding check.

### Default BadRequest response

The default response type for an HTTP 400 response is [Microsoft.AspNetCore.Mvc.ValidationProblemDetails](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ValidationProblemDetails). The following response body is an example of the serialized type:

```json
{
  "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
  "title": "One or more validation errors occurred.",
  "status": 400,
  "traceId": "|7fb5e16a-4c8f23bbfc974667.",
  "errors": {
    "": [
      "A non-empty request body is required."
    ]
  }
}
```

The `ValidationProblemDetails` type:

* Provides a machine-readable format for specifying errors in web API responses.
* Complies with the [RFC 7807 specification](https://datatracker.ietf.org/doc/html/rfc7807).

To make automatic and custom responses consistent, call the [Microsoft.AspNetCore.Mvc.ControllerBase.ValidationProblem%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase.ValidationProblem%252A) method instead of [Microsoft.AspNetCore.Mvc.ControllerBase.BadRequest%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase.BadRequest%252A). `ValidationProblem` returns a [Microsoft.AspNetCore.Mvc.ValidationProblemDetails](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ValidationProblemDetails) object as well as the automatic response.

### Log automatic 400 responses

To log automatic 400 responses, set the [Microsoft.AspNetCore.Mvc.ApiBehaviorOptions.InvalidModelStateResponseFactory%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApiBehaviorOptions.InvalidModelStateResponseFactory%252A) delegate property to perform custom processing. By default, `InvalidModelStateResponseFactory` uses [Microsoft.AspNetCore.Mvc.Infrastructure.ProblemDetailsFactory](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Infrastructure.ProblemDetailsFactory) to create an instance of [Microsoft.AspNetCore.Mvc.ValidationProblemDetails](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ValidationProblemDetails).

The following example shows how to retrieve an instance of [Microsoft.Extensions.Logging.ILogger%601](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.ILogger%25601) to log information about an automatic 400 response:

[Code example (complete source file; reference: index/samples/6.x/Program.cs?name=snippet_l400\&highlight=3-23)](../../_code/aspnetcore/web-api/index/samples/6.x/Program.cs.md)

### Disable automatic 400 response

To disable the automatic 400 behavior, set the [Microsoft.AspNetCore.Mvc.ApiBehaviorOptions.SuppressModelStateInvalidFilter](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApiBehaviorOptions.SuppressModelStateInvalidFilter) property to `true`. Add the following highlighted code:

[Code example (complete source file; reference: index/samples/6.x/Program.cs?name=snippet_d400D6\&highlight=10)](../../_code/aspnetcore/web-api/index/samples/6.x/Program.cs.md)

## Binding source parameter inference

A binding source attribute defines the location at which an action parameter's value is found. The following binding source attributes exist:

| Attribute | Binding source |
| --- | --- |
| [`[FromBody]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.FromBodyAttribute) | Request body |
| [`[FromForm]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.FromFormAttribute) | Form data in the request body |
| [`[FromHeader]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.FromHeaderAttribute) | Request header |
| [`[FromQuery]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.FromQueryAttribute) | Request query string parameter |
| [`[FromRoute]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.FromRouteAttribute) | Route data from the current request |
| [`[FromServices]`](https://learn.microsoft.com/search/?terms=mvc%2Fcontrollers%2Fdependency-injection%23action-injection-with-fromservices) | The request service injected as an action parameter |
| [`[AsParameters]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.AsParametersAttribute) | [Method parameters](https://learn.microsoft.com/search/?terms=fundamentals%2Fminimal-apis%23asparam7) |

> **Warning:**
> Don't use `[FromRoute]` when values might contain `%2f` (that is `/`). `%2f` won't be unescaped to `/`. Use `[FromQuery]` if the value might contain `%2f`.

Without the `[ApiController]` attribute or binding source attributes like `[FromQuery]`, the ASP.NET Core runtime attempts to use the complex object model binder. The complex object model binder pulls data from value providers in a defined order.

In the following example, the `[FromQuery]` attribute indicates that the `discontinuedOnly` parameter value is provided in the request URL's query string:

[Code example (complete source file; reference: index/samples/3.x/Controllers/ProductsController.cs?name=snippet_BindingSourceAttributes\&highlight=3)](../../_code/aspnetcore/web-api/index/samples/3.x/Controllers/ProductsController.cs.md)

The `[ApiController]` attribute applies inference rules for the default data sources of action parameters. These rules save you from having to identify binding sources manually by applying attributes to the action parameters. The binding source inference rules behave as follows:

* `[FromServices]` is inferred for complex type parameters registered in the DI Container.
* `[FromBody]` is inferred for complex type parameters not registered in the DI Container. An exception to the `[FromBody]` inference rule is any complex, built-in type with a special meaning, such as [Microsoft.AspNetCore.Http.IFormCollection](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IFormCollection) and [System.Threading.CancellationToken](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken). The binding source inference code ignores those special types.
* `[FromForm]` is inferred for action parameters of type [Microsoft.AspNetCore.Http.IFormFile](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IFormFile) and [Microsoft.AspNetCore.Http.IFormFileCollection](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IFormFileCollection). It's not inferred for any simple or user-defined types.
* `[FromRoute]` is inferred for any action parameter name matching a parameter in the route template. When more than one route matches an action parameter, any route value is considered `[FromRoute]`.
* `[FromQuery]` is inferred for any other action parameters.

### FromBody inference notes

`[FromBody]` isn't inferred for simple types such as `string` or `int`. Therefore, the `[FromBody]` attribute should be used for simple types when that functionality is needed.

When an action has more than one parameter bound from the request body, an exception is thrown. For example, all of the following action method signatures cause an exception:

* `[FromBody]` inferred on both because they're complex types.

  ```csharp
  [HttpPost]
  public IActionResult Action1(Product product, Order order)
  ```

* `[FromBody]` attribute on one, inferred on the other because it's a complex type.

  ```csharp
  [HttpPost]
  public IActionResult Action2(Product product, [FromBody] Order order)
  ```

* `[FromBody]` attribute on both.

  ```csharp
  [HttpPost]
  public IActionResult Action3([FromBody] Product product, [FromBody] Order order)
  ```

<a name="FSI7"></a>

### FromServices inference notes

Parameter binding binds parameters through [dependency injection](../fundamentals/dependency-injection.md) when the type is configured as a service. This means it's not required to explicitly apply the [`[FromServices]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.FromServicesAttribute) attribute to a parameter. In the following code, both actions return the time:

[Code example (complete source file; reference: index/samples/7.x/ApiController/Controllers/MyController.cs?name=snippet)](../../_code/aspnetcore/web-api/index/samples/7.x/ApiController/Controllers/MyController.cs.md)

In rare cases, automatic DI can break apps that have a type in DI that is also accepted in an API controller's action methods. It's not common to have a type in DI and as an argument in an API controller action.

To disable `[FromServices]` inference for a single action parameter, apply the desired binding source attribute to the parameter. For example, apply the `[FromBody]` attribute to an action parameter that should be bound from the body of the request.

To disable `[FromServices]` inference globally, set [DisableImplicitFromServicesParameters](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.mvc.apibehavioroptions.disableimplicitfromservicesparameters) to `true`:

[Code example (complete source file; reference: index/samples/7.x/ApiController/Program.cs?name=snippet_dis\&highlight=8-11)](../../_code/aspnetcore/web-api/index/samples/7.x/ApiController/Program.cs.md)

Types are checked at app startup with [Microsoft.Extensions.DependencyInjection.IServiceProviderIsService](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.IServiceProviderIsService) to determine if an argument in an API controller action comes from DI or from the other sources.

The mechanism to infer binding source of API Controller action parameters uses the following rules:

* A previously specified [`BindingInfo.BindingSource`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ModelBinding.BindingInfo.BindingSource) is never overwritten.
* A complex type parameter, registered in the DI container, is assigned [`BindingSource.Services`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ModelBinding.BindingSource.Services).
* A complex type parameter, not registered in the DI container, is assigned [`BindingSource.Body`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ModelBinding.BindingSource.Body).
* A parameter with a name that appears as a route value in ***any*** route template is assigned [`BindingSource.Path`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ModelBinding.BindingSource.Path).
* All other parameters are [`BindingSource.Query`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ModelBinding.BindingSource.Query).

### Disable inference rules

To disable binding source inference, set [Microsoft.AspNetCore.Mvc.ApiBehaviorOptions.SuppressInferBindingSourcesForParameters](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApiBehaviorOptions.SuppressInferBindingSourcesForParameters) to `true`:

[Code example (complete source file; reference: index/samples/6.x/Program.cs?name=snippet_d400D7\&highlight=9)](../../_code/aspnetcore/web-api/index/samples/6.x/Program.cs.md)

## Multipart/form-data request inference

The `[ApiController]` attribute applies an inference rule for action parameters of type [Microsoft.AspNetCore.Http.IFormFile](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IFormFile) and [Microsoft.AspNetCore.Http.IFormFileCollection](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IFormFileCollection). The `multipart/form-data` request content type is inferred for these types.

To disable the default behavior, set the [Microsoft.AspNetCore.Mvc.ApiBehaviorOptions.SuppressConsumesConstraintForFormFileParameters](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApiBehaviorOptions.SuppressConsumesConstraintForFormFileParameters) property to `true`:

[Code example (complete source file; reference: index/samples/6.x/Program.cs?name=snippet_d400D6\&highlight=8)](../../_code/aspnetcore/web-api/index/samples/6.x/Program.cs.md)

## Problem details for error status codes

MVC transforms an error result (a result with status code 400 or higher) to a result with [Microsoft.AspNetCore.Mvc.ProblemDetails](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ProblemDetails). The `ProblemDetails` type is based on the [RFC 7807 specification](https://datatracker.ietf.org/doc/html/rfc7807) for providing machine-readable error details in an HTTP response.

Consider the following code in a controller action:

[Code example (complete source file; reference: index/samples/6.x/Controllers/PetsController.cs?name=snippet_ProblemDetailsStatusCode)](../../_code/aspnetcore/web-api/index/samples/6.x/Controllers/PetsController.cs.md)

The `NotFound` method produces an HTTP 404 status code with a `ProblemDetails` body. For example:

```json
{
  type: "https://tools.ietf.org/html/rfc7231#section-6.5.4",
  title: "Not Found",
  status: 404,
  traceId: "0HLHLV31KRN83:00000001"
}
```

### Disable ProblemDetails response

The automatic creation of a `ProblemDetails` for error status codes is disabled when the [Microsoft.AspNetCore.Mvc.ApiBehaviorOptions.SuppressMapClientErrors%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApiBehaviorOptions.SuppressMapClientErrors%252A) property is set to `true`. Add the following code:

[Code example (complete source file; reference: index/samples/6.x/Program.cs?name=snippet_d400D6\&highlight=11)](../../_code/aspnetcore/web-api/index/samples/6.x/Program.cs.md)

<a name="consumes"></a>

## Define supported request content types with the [Consumes] attribute

By default, an action supports all available request content types. For example, if an app is configured to support both JSON and XML [input formatters](https://learn.microsoft.com/search/?terms=mvc%2Fmodels%2Fmodel-binding%23input-formatters), an action supports multiple content types, including `application/json` and `application/xml`.

The [\[Consumes\]](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ConsumesAttribute) attribute allows an action to limit the supported request content types. Apply the `[Consumes]` attribute to an action or controller, specifying one or more content types:

```csharp
[HttpPost]
[Consumes("application/xml")]
public IActionResult CreateProduct(Product product)
```

In the preceding code, the `CreateProduct` action specifies the content type `application/xml`. Requests routed to this action must specify a `Content-Type` header of `application/xml`. Requests that don't specify a `Content-Type` header of `application/xml` result in a [415 Unsupported Media Type](https://developer.mozilla.org/docs/Web/HTTP/Reference/Status/415) response.

The `[Consumes]` attribute also allows an action to influence its selection based on an incoming request's content type by applying a type constraint. Consider the following example:

[Code example (complete source file; reference: index/samples/3.x/Controllers/ConsumesController.cs?name=snippet_Class)](../../_code/aspnetcore/web-api/index/samples/3.x/Controllers/ConsumesController.cs.md)

In the preceding code, `ConsumesController` is configured to handle requests sent to the `https://localhost:5001/api/Consumes` URL. Both of the controller's actions, `PostJson` and `PostForm`, handle POST requests with the same URL. Without the `[Consumes]` attribute applying a type constraint, an ambiguous match exception is thrown.

The `[Consumes]` attribute is applied to both actions. The `PostJson` action handles requests sent with a `Content-Type` header of `application/json`. The `PostForm` action handles requests sent with a `Content-Type` header of `application/x-www-form-urlencoded`.

## Additional resources

* [View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/web-api/index/samples). ([How to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample)).
* [web-api/action-return-types](action-return-types.md)
* [fundamentals/error-handling-api](../fundamentals/error-handling-api.md)
* [web-api/advanced/custom-formatters](advanced/custom-formatters.md)
* [web-api/advanced/formatting](advanced/formatting.md)
* [tutorials/web-api-help-pages-using-swagger](../tutorials/web-api-help-pages-using-swagger.md)
* [mvc/controllers/routing](../mvc/controllers/routing.md)
* [Use port tunneling Visual Studio to debug web APIs](https://learn.microsoft.com/connectors/custom-connectors/port-tunneling)
* [Create a web API with ASP.NET Core](https://learn.microsoft.com/training/modules/build-web-api-aspnet-core/)



**Applies to: \= aspnetcore-6.0**

ASP.NET Core supports creating web APIs using controllers or using Minimal APIs. *Controllers* in a web API are classes that derive from [Microsoft.AspNetCore.Mvc.ControllerBase](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase). This article shows how to use controllers for handling web API requests. For information on creating web APIs without controllers, see [tutorials/min-web-api](../tutorials/min-web-api.md).

## ControllerBase class

A controller-based web API consists of one or more controller classes that derive from [Microsoft.AspNetCore.Mvc.ControllerBase](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase). The web API project template provides a starter controller:

[Code example (complete source file; reference: index/samples/6.x/Controllers/WeatherForecastController.cs?name=snippet_ControllerSignature\&highlight=3)](../../_code/aspnetcore/web-api/index/samples/6.x/Controllers/WeatherForecastController.cs.md)

Web API controllers should typically derive from [Microsoft.AspNetCore.Mvc.ControllerBase](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase) rather from [Microsoft.AspNetCore.Mvc.Controller](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Controller). `Controller` derives from [Microsoft.AspNetCore.Mvc.ControllerBase](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase) and adds support for views, so it's for handling web pages, not web API requests. If the same controller must support views and web APIs, derive from `Controller`.

The `ControllerBase` class provides many properties and methods that are useful for handling HTTP requests. For example, [Microsoft.AspNetCore.Mvc.ControllerBase.CreatedAtAction%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase.CreatedAtAction%252A) returns a 201 status code:

[Code example (complete source file; reference: index/samples/6.x/Controllers/PetsController.cs?name=snippet_400And201\&highlight=10)](../../_code/aspnetcore/web-api/index/samples/6.x/Controllers/PetsController.cs.md)

The following table contains examples of methods in `ControllerBase`.

| Method | Notes |
| --- | --- |
| [Microsoft.AspNetCore.Mvc.ControllerBase.BadRequest%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase.BadRequest%252A) | Returns 400 status code. |
| [Microsoft.AspNetCore.Mvc.ControllerBase.NotFound%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase.NotFound%252A) | Returns 404 status code. |
| [Microsoft.AspNetCore.Mvc.ControllerBase.PhysicalFile%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase.PhysicalFile%252A) | Returns a file. |
| [Microsoft.AspNetCore.Mvc.ControllerBase.TryUpdateModelAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase.TryUpdateModelAsync%252A) | Invokes [model binding](../mvc/models/model-binding.md). |
| [Microsoft.AspNetCore.Mvc.ControllerBase.TryValidateModel%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase.TryValidateModel%252A) | Invokes [model validation](../mvc/models/validation.md). |

For a list of all available methods and properties, see [Microsoft.AspNetCore.Mvc.ControllerBase](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase).

## Attributes

The [Microsoft.AspNetCore.Mvc](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc) namespace provides attributes that can be used to configure the behavior of web API controllers and action methods. The following example uses attributes to specify the supported HTTP action verb and any known HTTP status codes that could be returned:

[Code example (complete source file; reference: index/samples/6.x/Controllers/PetsController.cs?name=snippet_400And201\&highlight=1-3)](../../_code/aspnetcore/web-api/index/samples/6.x/Controllers/PetsController.cs.md)

Here are some more examples of attributes that are available.

| Attribute | Notes |
| --- | --- |
| [`[Route]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.RouteAttribute) | Specifies URL pattern for a controller or action. |
| [`[Bind]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.BindAttribute) | Specifies prefix and properties to include for model binding. |
| [`[HttpGet]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.HttpGetAttribute) | Identifies an action that supports the HTTP GET action verb. |
| [`[Consumes]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ConsumesAttribute) | Specifies data types that an action accepts. |
| [`[Produces]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ProducesAttribute) | Specifies data types that an action returns. |

For a list that includes the available attributes, see the [Microsoft.AspNetCore.Mvc](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc) namespace.

## ApiController attribute

The [`[ApiController]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApiControllerAttribute) attribute can be applied to a controller class to enable the following opinionated, API-specific behaviors:

* [Attribute routing requirement](#attribute-routing-requirement)
* [Automatic HTTP 400 responses](#automatic-http-400-responses)
* [Binding source parameter inference](#binding-source-parameter-inference)
* [Multipart/form-data request inference](#multipartform-data-request-inference)
* [Problem details for error status codes](#problem-details-for-error-status-codes)

### Attribute on specific controllers

The `[ApiController]` attribute can be applied to specific controllers, as in the following example from the project template:

[Code example (complete source file; reference: index/samples/6.x/Controllers/WeatherForecastController.cs?name=snippet_ControllerSignature\&highlight=2\])](../../_code/aspnetcore/web-api/index/samples/6.x/Controllers/WeatherForecastController.cs.md)

### Attribute on multiple controllers

One approach to using the attribute on more than one controller is to create a custom base controller class annotated with the [`[ApiController]`](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/web-api/\[Microsoft.AspNetCore.Mvc.ApiControllerAttribute]\(https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApiControllerAttribute\)) attribute. The following example shows a custom base class and a controller that derives from it:

[Code example (complete source file; reference: index/samples/6.x/Controllers/MyControllerBase.cs?name=snippet_MyControllerBase)](../../_code/aspnetcore/web-api/index/samples/6.x/Controllers/MyControllerBase.cs.md)

[Code example (complete source file; reference: index/samples/6.x/Controllers/PetsController.cs?name=snippet_Inherit)](../../_code/aspnetcore/web-api/index/samples/6.x/Controllers/PetsController.cs.md)

### Attribute on an assembly

The `[ApiController]` attribute can be applied to an assembly. When the `[ApiController]` attribute is applied to an assembly, all controllers in the assembly have the `[ApiController]` attribute applied. There's no way to opt out for individual controllers. Apply the assembly-level attribute to the `Program.cs` file:

[Code example (complete source file; reference: index/samples/6.x/Program.cs?name=snippet_global\&highlight=1-3)](../../_code/aspnetcore/web-api/index/samples/6.x/Program.cs.md)

## Attribute routing requirement

The `[ApiController]` attribute makes attribute routing a requirement. For example:

[Code example (complete source file; reference: index/samples/3.x/Controllers/WeatherForecastController.cs?name=snippet_ControllerSignature\&highlight=2)](../../_code/aspnetcore/web-api/index/samples/3.x/Controllers/WeatherForecastController.cs.md)

Actions are inaccessible via [conventional routes](https://learn.microsoft.com/search/?terms=mvc%2Fcontrollers%2Frouting%23conventional-routing) defined by `UseEndpoints`, [Microsoft.AspNetCore.Builder.MvcApplicationBuilderExtensions.UseMvc%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.MvcApplicationBuilderExtensions.UseMvc%252A), or [Microsoft.AspNetCore.Builder.MvcApplicationBuilderExtensions.UseMvcWithDefaultRoute%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.MvcApplicationBuilderExtensions.UseMvcWithDefaultRoute%252A).

## Automatic HTTP 400 responses

The `[ApiController]` attribute makes model validation errors automatically trigger an HTTP 400 response. Consequently, the following code is unnecessary in an action method:

```csharp
if (!ModelState.IsValid)
{
    return BadRequest(ModelState);
}
```

ASP.NET Core MVC uses the [Microsoft.AspNetCore.Mvc.Infrastructure.ModelStateInvalidFilter](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Infrastructure.ModelStateInvalidFilter) action filter to do the preceding check.

### Default BadRequest response

The following response body is an example of the serialized type:

```json
{
  "": [
    "A non-empty request body is required."
  ]
}
```

The default response type for an HTTP 400 response is [Microsoft.AspNetCore.Mvc.ValidationProblemDetails](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ValidationProblemDetails). The following response body is an example of the serialized type:

```json
{
  "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
  "title": "One or more validation errors occurred.",
  "status": 400,
  "traceId": "|7fb5e16a-4c8f23bbfc974667.",
  "errors": {
    "": [
      "A non-empty request body is required."
    ]
  }
}
```

The `ValidationProblemDetails` type:

* Provides a machine-readable format for specifying errors in web API responses.
* Complies with the [RFC 7807 specification](https://tools.ietf.org/html/rfc7807).

To make automatic and custom responses consistent, call the [Microsoft.AspNetCore.Mvc.ControllerBase.ValidationProblem%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase.ValidationProblem%252A) method instead of [Microsoft.AspNetCore.Mvc.ControllerBase.BadRequest%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase.BadRequest%252A). `ValidationProblem` returns a [Microsoft.AspNetCore.Mvc.ValidationProblemDetails](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ValidationProblemDetails) object as well as the automatic response.

### Log automatic 400 responses

To log automatic 400 responses, set the [Microsoft.AspNetCore.Mvc.ApiBehaviorOptions.InvalidModelStateResponseFactory%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApiBehaviorOptions.InvalidModelStateResponseFactory%252A) delegate property to perform custom processing. By default, `InvalidModelStateResponseFactory` uses [Microsoft.AspNetCore.Mvc.Infrastructure.ProblemDetailsFactory](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Infrastructure.ProblemDetailsFactory) to create an instance of [Microsoft.AspNetCore.Mvc.ValidationProblemDetails](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ValidationProblemDetails).

The following example shows how to retrieve an instance of [Microsoft.Extensions.Logging.ILogger%601](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.ILogger%25601) to log information about an automatic 400 response:

[Code example (complete source file; reference: index/samples/6.x/Program.cs?name=snippet_l400\&highlight=3-23)](../../_code/aspnetcore/web-api/index/samples/6.x/Program.cs.md)

### Disable automatic 400 response

To disable the automatic 400 behavior, set the [Microsoft.AspNetCore.Mvc.ApiBehaviorOptions.SuppressModelStateInvalidFilter](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApiBehaviorOptions.SuppressModelStateInvalidFilter) property to `true`. Add the following highlighted code:

[Code example (complete source file; reference: index/samples/6.x/Program.cs?name=snippet_d400D6\&highlight=10)](../../_code/aspnetcore/web-api/index/samples/6.x/Program.cs.md)

## Binding source parameter inference

A binding source attribute defines the location at which an action parameter's value is found. The following binding source attributes exist:

| Attribute | Binding source |
| --- | --- |
| [`[FromBody]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.FromBodyAttribute) | Request body |
| [`[FromForm]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.FromFormAttribute) | Form data in the request body |
| [`[FromHeader]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.FromHeaderAttribute) | Request header |
| [`[FromQuery]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.FromQueryAttribute) | Request query string parameter |
| [`[FromRoute]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.FromRouteAttribute) | Route data from the current request |
| [`[FromServices]`](https://learn.microsoft.com/search/?terms=mvc%2Fcontrollers%2Fdependency-injection%23action-injection-with-fromservices) | The request service injected as an action parameter |

> **Warning:**
> Don't use `[FromRoute]` when values might contain `%2f` (that is `/`). `%2f` won't be unescaped to `/`. Use `[FromQuery]` if the value might contain `%2f`.

Without the `[ApiController]` attribute or binding source attributes like `[FromQuery]`, the ASP.NET Core runtime attempts to use the complex object model binder. The complex object model binder pulls data from value providers in a defined order.

In the following example, the `[FromQuery]` attribute indicates that the `discontinuedOnly` parameter value is provided in the request URL's query string:

[Code example (complete source file; reference: index/samples/3.x/Controllers/ProductsController.cs?name=snippet_BindingSourceAttributes\&highlight=3)](../../_code/aspnetcore/web-api/index/samples/3.x/Controllers/ProductsController.cs.md)

The `[ApiController]` attribute applies inference rules for the default data sources of action parameters. These rules save you from having to identify binding sources manually by applying attributes to the action parameters. The binding source inference rules behave as follows:

* `[FromBody]` is inferred for complex type parameters not registered in the DI Container. An exception to the `[FromBody]` inference rule is any complex, built-in type with a special meaning, such as [Microsoft.AspNetCore.Http.IFormCollection](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IFormCollection) and [System.Threading.CancellationToken](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken). The binding source inference code ignores those special types.
* `[FromForm]` is inferred for action parameters of type [Microsoft.AspNetCore.Http.IFormFile](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IFormFile) and [Microsoft.AspNetCore.Http.IFormFileCollection](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IFormFileCollection). It's not inferred for any simple or user-defined types.
* `[FromRoute]` is inferred for any action parameter name matching a parameter in the route template. When more than one route matches an action parameter, any route value is considered `[FromRoute]`.
* `[FromQuery]` is inferred for any other action parameters.

### FromBody inference notes

`[FromBody]` isn't inferred for simple types such as `string` or `int`. Therefore, the `[FromBody]` attribute should be used for simple types when that functionality is needed.

When an action has more than one parameter bound from the request body, an exception is thrown. For example, all of the following action method signatures cause an exception:

* `[FromBody]` inferred on both because they're complex types.

  ```csharp
  [HttpPost]
  public IActionResult Action1(Product product, Order order)
  ```

* `[FromBody]` attribute on one, inferred on the other because it's a complex type.

  ```csharp
  [HttpPost]
  public IActionResult Action2(Product product, [FromBody] Order order)
  ```

* `[FromBody]` attribute on both.

  ```csharp
  [HttpPost]
  public IActionResult Action3([FromBody] Product product, [FromBody] Order order)
  ```

### Disable inference rules

To disable binding source inference, set [Microsoft.AspNetCore.Mvc.ApiBehaviorOptions.SuppressInferBindingSourcesForParameters](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApiBehaviorOptions.SuppressInferBindingSourcesForParameters) to `true`:

[Code example (complete source file; reference: index/samples/6.x/Program.cs?name=snippet_d400D6\&highlight=9)](../../_code/aspnetcore/web-api/index/samples/6.x/Program.cs.md)

## Multipart/form-data request inference

The `[ApiController]` attribute applies an inference rule for action parameters of type [Microsoft.AspNetCore.Http.IFormFile](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IFormFile) and [Microsoft.AspNetCore.Http.IFormFileCollection](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IFormFileCollection). The `multipart/form-data` request content type is inferred for these types.

To disable the default behavior, set the [Microsoft.AspNetCore.Mvc.ApiBehaviorOptions.SuppressConsumesConstraintForFormFileParameters](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApiBehaviorOptions.SuppressConsumesConstraintForFormFileParameters) property to `true`:

[Code example (complete source file; reference: index/samples/6.x/Program.cs?name=snippet_d400D6\&highlight=8)](../../_code/aspnetcore/web-api/index/samples/6.x/Program.cs.md)

## Problem details for error status codes

MVC transforms an error result (a result with status code 400 or higher) to a result with [Microsoft.AspNetCore.Mvc.ProblemDetails](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ProblemDetails). The `ProblemDetails` type is based on the [RFC 7807 specification](https://tools.ietf.org/html/rfc7807) for providing machine-readable error details in an HTTP response.

Consider the following code in a controller action:

[Code example (complete source file; reference: index/samples/6.x/Controllers/PetsController.cs?name=snippet_ProblemDetailsStatusCode)](../../_code/aspnetcore/web-api/index/samples/6.x/Controllers/PetsController.cs.md)

The `NotFound` method produces an HTTP 404 status code with a `ProblemDetails` body. For example:

```json
{
  type: "https://tools.ietf.org/html/rfc7231#section-6.5.4",
  title: "Not Found",
  status: 404,
  traceId: "0HLHLV31KRN83:00000001"
}
```

### Disable ProblemDetails response

The automatic creation of a `ProblemDetails` for error status codes is disabled when the [Microsoft.AspNetCore.Mvc.ApiBehaviorOptions.SuppressMapClientErrors%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApiBehaviorOptions.SuppressMapClientErrors%252A) property is set to `true`:

[Code example (complete source file; reference: index/samples/6.x/Program.cs?name=snippet_d400D6\&highlight=11)](../../_code/aspnetcore/web-api/index/samples/6.x/Program.cs.md)

<a name="consumes"></a>

## Define supported request content types with the [Consumes] attribute

By default, an action supports all available request content types. For example, if an app is configured to support both JSON and XML [input formatters](https://learn.microsoft.com/search/?terms=mvc%2Fmodels%2Fmodel-binding%23input-formatters), an action supports multiple content types, including `application/json` and `application/xml`.

The [\[Consumes\]](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ConsumesAttribute) attribute allows an action to limit the supported request content types. Apply the `[Consumes]` attribute to an action or controller, specifying one or more content types:

```csharp
[HttpPost]
[Consumes("application/xml")]
public IActionResult CreateProduct(Product product)
```

In the preceding code, the `CreateProduct` action specifies the content type `application/xml`. Requests routed to this action must specify a `Content-Type` header of `application/xml`. Requests that don't specify a `Content-Type` header of `application/xml` result in a [415 Unsupported Media Type](https://developer.mozilla.org/docs/Web/HTTP/Status/415) response.

The `[Consumes]` attribute also allows an action to influence its selection based on an incoming request's content type by applying a type constraint. Consider the following example:

[Code example (complete source file; reference: index/samples/3.x/Controllers/ConsumesController.cs?name=snippet_Class)](../../_code/aspnetcore/web-api/index/samples/3.x/Controllers/ConsumesController.cs.md)

In the preceding code, `ConsumesController` is configured to handle requests sent to the `https://localhost:5001/api/Consumes` URL. Both of the controller's actions, `PostJson` and `PostForm`, handle POST requests with the same URL. Without the `[Consumes]` attribute applying a type constraint, an ambiguous match exception is thrown.

The `[Consumes]` attribute is applied to both actions. The `PostJson` action handles requests sent with a `Content-Type` header of `application/json`. The `PostForm` action handles requests sent with a `Content-Type` header of `application/x-www-form-urlencoded`. 

## Additional resources

* [View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/web-api/index/samples). ([How to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample)).
* [web-api/action-return-types](action-return-types.md)
* [fundamentals/error-handling-api](../fundamentals/error-handling-api.md)
* [web-api/advanced/custom-formatters](advanced/custom-formatters.md)
* [web-api/advanced/formatting](advanced/formatting.md)
* [tutorials/web-api-help-pages-using-swagger](../tutorials/web-api-help-pages-using-swagger.md)
* [mvc/controllers/routing](../mvc/controllers/routing.md)
* [Use port tunneling Visual Studio to debug web APIs](https://learn.microsoft.com/connectors/custom-connectors/port-tunneling)
* [Create a web API with ASP.NET Core](https://learn.microsoft.com/training/modules/build-web-api-aspnet-core/)



**Applies to: \>= aspnetcore-3.0 < aspnetcore-6.0**

ASP.NET Core supports creating RESTful services, also known as web APIs, using C#. To handle requests, a web API uses controllers. *Controllers* in a web API are classes that derive from `ControllerBase`. This article shows how to use controllers for handling web API requests.

[View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/web-api/index/samples). ([How to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample)).

## ControllerBase class

A web API consists of one or more controller classes that derive from [Microsoft.AspNetCore.Mvc.ControllerBase](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase). The web API project template provides a starter controller:

[Code example (complete source file; reference: index/samples/3.x/Controllers/WeatherForecastController.cs?name=snippet_ControllerSignature\&highlight=3)](../../_code/aspnetcore/web-api/index/samples/3.x/Controllers/WeatherForecastController.cs.md)

Don't create a web API controller by deriving from the [Microsoft.AspNetCore.Mvc.Controller](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Controller) class. `Controller` derives from `ControllerBase` and adds support for views, so it's for handling web pages, not web API requests. There's an exception to this rule: if you plan to use the same controller for both views and web APIs, derive it from `Controller`.

The `ControllerBase` class provides many properties and methods that are useful for handling HTTP requests. For example, `ControllerBase.CreatedAtAction` returns a 201 status code:

[Code example (complete source file; reference: index/samples/3.x/Controllers/PetsController.cs?name=snippet_400And201\&highlight=10)](../../_code/aspnetcore/web-api/index/samples/3.x/Controllers/PetsController.cs.md)

Here are some more examples of methods that `ControllerBase` provides.

| Method | Notes |
| --- | --- |
| [Microsoft.AspNetCore.Mvc.ControllerBase.BadRequest%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase.BadRequest%252A) | Returns 400 status code. |
| [Microsoft.AspNetCore.Mvc.ControllerBase.NotFound%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase.NotFound%252A) | Returns 404 status code. |
| [Microsoft.AspNetCore.Mvc.ControllerBase.PhysicalFile%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase.PhysicalFile%252A) | Returns a file. |
| [Microsoft.AspNetCore.Mvc.ControllerBase.TryUpdateModelAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase.TryUpdateModelAsync%252A) | Invokes [model binding](../mvc/models/model-binding.md). |
| [Microsoft.AspNetCore.Mvc.ControllerBase.TryValidateModel%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase.TryValidateModel%252A) | Invokes [model validation](../mvc/models/validation.md). |

For a list of all available methods and properties, see [Microsoft.AspNetCore.Mvc.ControllerBase](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase).

## Attributes

The [Microsoft.AspNetCore.Mvc](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc) namespace provides attributes that can be used to configure the behavior of web API controllers and action methods. The following example uses attributes to specify the supported HTTP action verb and any known HTTP status codes that could be returned:

[Code example (complete source file; reference: index/samples/3.x/Controllers/PetsController.cs?name=snippet_400And201\&highlight=1-3)](../../_code/aspnetcore/web-api/index/samples/3.x/Controllers/PetsController.cs.md)

Here are some more examples of attributes that are available.

| Attribute | Notes |
| --- | --- |
| [`[Route]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.RouteAttribute) | Specifies URL pattern for a controller or action. |
| [`[Bind]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.BindAttribute) | Specifies prefix and properties to include for model binding. |
| [`[HttpGet]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.HttpGetAttribute) | Identifies an action that supports the HTTP GET action verb. |
| [`[Consumes]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ConsumesAttribute) | Specifies data types that an action accepts. |
| [`[Produces]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ProducesAttribute) | Specifies data types that an action returns. |

For a list that includes the available attributes, see the [Microsoft.AspNetCore.Mvc](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc) namespace.

## ApiController attribute

The [`[ApiController]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApiControllerAttribute) attribute can be applied to a controller class to enable the following opinionated, API-specific behaviors:

* [Attribute routing requirement](#attribute-routing-requirement)
* [Automatic HTTP 400 responses](#automatic-http-400-responses)
* [Binding source parameter inference](#binding-source-parameter-inference)
* [Multipart/form-data request inference](#multipartform-data-request-inference)
* [Problem details for error status codes](#problem-details-for-error-status-codes)

### Attribute on specific controllers

The `[ApiController]` attribute can be applied to specific controllers, as in the following example from the project template:

[Code example (complete source file; reference: index/samples/3.x/Controllers/WeatherForecastController.cs?name=snippet_ControllerSignature\&highlight=2\])](../../_code/aspnetcore/web-api/index/samples/3.x/Controllers/WeatherForecastController.cs.md)

### Attribute on multiple controllers

One approach to using the attribute on more than one controller is to create a custom base controller class annotated with the `[ApiController]` attribute. The following example shows a custom base class and a controller that derives from it:

[Code example (complete source file; reference: index/samples/3.x/Controllers/MyControllerBase.cs?name=snippet_MyControllerBase)](../../_code/aspnetcore/web-api/index/samples/3.x/Controllers/MyControllerBase.cs.md)

[Code example (complete source file; reference: index/samples/3.x/Controllers/PetsController.cs?name=snippet_Inherit)](../../_code/aspnetcore/web-api/index/samples/3.x/Controllers/PetsController.cs.md)

### Attribute on an assembly

The `[ApiController]` attribute can be applied to an assembly. Annotation in this manner applies web API behavior to all controllers in the assembly. There's no way to opt out for individual controllers. Apply the assembly-level attribute to the namespace declaration surrounding the `Startup` class:

```csharp
[assembly: ApiController]
namespace WebApiSample
{
    public class Startup
    {
        ...
    }
}
```

## Attribute routing requirement

The `[ApiController]` attribute makes attribute routing a requirement. For example:

[Code example (complete source file; reference: index/samples/3.x/Controllers/WeatherForecastController.cs?name=snippet_ControllerSignature\&highlight=2)](../../_code/aspnetcore/web-api/index/samples/3.x/Controllers/WeatherForecastController.cs.md)

Actions are inaccessible via [conventional routes](https://learn.microsoft.com/search/?terms=mvc%2Fcontrollers%2Frouting%23conventional-routing) defined by `UseEndpoints`, [Microsoft.AspNetCore.Builder.MvcApplicationBuilderExtensions.UseMvc%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.MvcApplicationBuilderExtensions.UseMvc%252A), or [Microsoft.AspNetCore.Builder.MvcApplicationBuilderExtensions.UseMvcWithDefaultRoute%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.MvcApplicationBuilderExtensions.UseMvcWithDefaultRoute%252A) in `Startup.Configure`.

## Automatic HTTP 400 responses

The `[ApiController]` attribute makes model validation errors automatically trigger an HTTP 400 response. Consequently, the following code is unnecessary in an action method:

```csharp
if (!ModelState.IsValid)
{
    return BadRequest(ModelState);
}
```

ASP.NET Core MVC uses the [Microsoft.AspNetCore.Mvc.Infrastructure.ModelStateInvalidFilter](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Infrastructure.ModelStateInvalidFilter) action filter to do the preceding check.

### Default BadRequest response

The following request body is an example of the serialized type:

```json
{
  "": [
    "A non-empty request body is required."
  ]
}
```

The default response type for an HTTP 400 response is [Microsoft.AspNetCore.Mvc.ValidationProblemDetails](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ValidationProblemDetails). The following request body is an example of the serialized type:

```json
{
  "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
  "title": "One or more validation errors occurred.",
  "status": 400,
  "traceId": "|7fb5e16a-4c8f23bbfc974667.",
  "errors": {
    "": [
      "A non-empty request body is required."
    ]
  }
}
```

The `ValidationProblemDetails` type:

* Provides a machine-readable format for specifying errors in web API responses.
* Complies with the [RFC 7807 specification](https://tools.ietf.org/html/rfc7807).

To make automatic and custom responses consistent, call the [Microsoft.AspNetCore.Mvc.ControllerBase.ValidationProblem%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase.ValidationProblem%252A) method instead of [Microsoft.AspNetCore.Mvc.ControllerBase.BadRequest%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase.BadRequest%252A). `ValidationProblem` returns a [Microsoft.AspNetCore.Mvc.ValidationProblemDetails](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ValidationProblemDetails) object as well as the automatic response.

### Log automatic 400 responses

To log automatic 400 responses, set the [Microsoft.AspNetCore.Mvc.ApiBehaviorOptions.InvalidModelStateResponseFactory%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApiBehaviorOptions.InvalidModelStateResponseFactory%252A) delegate property to perform custom processing in `Startup.ConfigureServices`. By default, `InvalidModelStateResponseFactory` uses [Microsoft.AspNetCore.Mvc.Infrastructure.ProblemDetailsFactory](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Infrastructure.ProblemDetailsFactory) to create an instance of [Microsoft.AspNetCore.Mvc.ValidationProblemDetails](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ValidationProblemDetails).

The following example shows how to retrieve an instance of [Microsoft.Extensions.Logging.ILogger%601](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.ILogger%25601) to log information about an automatic 400 response:

[Code example (complete source file; reference: index/samples/3.x/Startup.cs?name=snippet_AutomaticBadRequestLogging)](../../_code/aspnetcore/web-api/index/samples/3.x/Startup.cs.md)

### Disable automatic 400 response

To disable the automatic 400 behavior, set the [Microsoft.AspNetCore.Mvc.ApiBehaviorOptions.SuppressModelStateInvalidFilter](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApiBehaviorOptions.SuppressModelStateInvalidFilter) property to `true`. Add the following highlighted code in `Startup.ConfigureServices`:

[Code example (complete source file; reference: index/samples/3.x/Startup.cs?name=snippet_ConfigureApiBehaviorOptions\&highlight=2,6)](../../_code/aspnetcore/web-api/index/samples/3.x/Startup.cs.md)

## Binding source parameter inference

A binding source attribute defines the location at which an action parameter's value is found. The following binding source attributes exist:

| Attribute | Binding source |
| --- | --- |
| [`[FromBody]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.FromBodyAttribute) | Request body |
| [`[FromForm]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.FromFormAttribute) | Form data in the request body |
| [`[FromHeader]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.FromHeaderAttribute) | Request header |
| [`[FromQuery]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.FromQueryAttribute) | Request query string parameter |
| [`[FromRoute]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.FromRouteAttribute) | Route data from the current request |
| [`[FromServices]`](https://learn.microsoft.com/search/?terms=mvc%2Fcontrollers%2Fdependency-injection%23action-injection-with-fromservices) | The request service injected as an action parameter |

> **Warning:**
> Don't use `[FromRoute]` when values might contain `%2f` (that is `/`). `%2f` won't be unescaped to `/`. Use `[FromQuery]` if the value might contain `%2f`.

Without the `[ApiController]` attribute or binding source attributes like `[FromQuery]`, the ASP.NET Core runtime attempts to use the complex object model binder. The complex object model binder pulls data from value providers in a defined order.

In the following example, the `[FromQuery]` attribute indicates that the `discontinuedOnly` parameter value is provided in the request URL's query string:

[Code example (complete source file; reference: index/samples/3.x/Controllers/ProductsController.cs?name=snippet_BindingSourceAttributes\&highlight=3)](../../_code/aspnetcore/web-api/index/samples/3.x/Controllers/ProductsController.cs.md)

The `[ApiController]` attribute applies inference rules for the default data sources of action parameters. These rules save you from having to identify binding sources manually by applying attributes to the action parameters. The binding source inference rules behave as follows:

* `[FromBody]` is inferred for complex type parameters. An exception to the `[FromBody]` inference rule is any complex, built-in type with a special meaning, such as [Microsoft.AspNetCore.Http.IFormCollection](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IFormCollection) and [System.Threading.CancellationToken](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken). The binding source inference code ignores those special types.
* `[FromForm]` is inferred for action parameters of type [Microsoft.AspNetCore.Http.IFormFile](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IFormFile) and [Microsoft.AspNetCore.Http.IFormFileCollection](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IFormFileCollection). It's not inferred for any simple or user-defined types.
* `[FromRoute]` is inferred for any action parameter name matching a parameter in the route template. When more than one route matches an action parameter, any route value is considered `[FromRoute]`.
* `[FromQuery]` is inferred for any other action parameters.

### FromBody inference notes

`[FromBody]` isn't inferred for simple types such as `string` or `int`. Therefore, the `[FromBody]` attribute should be used for simple types when that functionality is needed.

When an action has more than one parameter bound from the request body, an exception is thrown. For example, all of the following action method signatures cause an exception:

* `[FromBody]` inferred on both because they're complex types.

  ```csharp
  [HttpPost]
  public IActionResult Action1(Product product, Order order)
  ```

* `[FromBody]` attribute on one, inferred on the other because it's a complex type.

  ```csharp
  [HttpPost]
  public IActionResult Action2(Product product, [FromBody] Order order)
  ```

* `[FromBody]` attribute on both.

  ```csharp
  [HttpPost]
  public IActionResult Action3([FromBody] Product product, [FromBody] Order order)
  ```

### Disable inference rules

To disable binding source inference, set [Microsoft.AspNetCore.Mvc.ApiBehaviorOptions.SuppressInferBindingSourcesForParameters](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApiBehaviorOptions.SuppressInferBindingSourcesForParameters) to `true`. Add the following code in `Startup.ConfigureServices`:

[Code example (complete source file; reference: index/samples/3.x/Startup.cs?name=snippet_ConfigureApiBehaviorOptions\&highlight=2,5)](../../_code/aspnetcore/web-api/index/samples/3.x/Startup.cs.md)

## Multipart/form-data request inference

The `[ApiController]` attribute applies an inference rule for action parameters of type [Microsoft.AspNetCore.Http.IFormFile](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IFormFile) and [Microsoft.AspNetCore.Http.IFormFileCollection](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IFormFileCollection). The `multipart/form-data` request content type is inferred for these types.

To disable the default behavior, set the [Microsoft.AspNetCore.Mvc.ApiBehaviorOptions.SuppressConsumesConstraintForFormFileParameters](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApiBehaviorOptions.SuppressConsumesConstraintForFormFileParameters) property to `true` in `Startup.ConfigureServices`:

[Code example (complete source file; reference: index/samples/3.x/Startup.cs?name=snippet_ConfigureApiBehaviorOptions\&highlight=2,4)](../../_code/aspnetcore/web-api/index/samples/3.x/Startup.cs.md)

## Problem details for error status codes

MVC transforms an error result (a result with status code 400 or higher) to a result with [Microsoft.AspNetCore.Mvc.ProblemDetails](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ProblemDetails). The `ProblemDetails` type is based on the [RFC 7807 specification](https://tools.ietf.org/html/rfc7807) for providing machine-readable error details in an HTTP response.

Consider the following code in a controller action:

[Code example (complete source file; reference: index/samples/3.x/Controllers/PetsController.cs?name=snippet_ProblemDetailsStatusCode)](../../_code/aspnetcore/web-api/index/samples/3.x/Controllers/PetsController.cs.md)

The `NotFound` method produces an HTTP 404 status code with a `ProblemDetails` body. For example:

```json
{
  type: "https://tools.ietf.org/html/rfc7231#section-6.5.4",
  title: "Not Found",
  status: 404,
  traceId: "0HLHLV31KRN83:00000001"
}
```

### Disable ProblemDetails response

The automatic creation of a `ProblemDetails` for error status codes is disabled when the [Microsoft.AspNetCore.Mvc.ApiBehaviorOptions.SuppressMapClientErrors%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApiBehaviorOptions.SuppressMapClientErrors%252A) property is set to `true`. Add the following code in `Startup.ConfigureServices`:


[Code example (complete source file; reference: index/samples/3.x/Startup.cs?name=snippet_ConfigureApiBehaviorOptions\&highlight=2,7)](../../_code/aspnetcore/web-api/index/samples/3.x/Startup.cs.md)

<a name="consumes"></a>

## Define supported request content types with the [Consumes] attribute

By default, an action supports all available request content types. For example, if an app is configured to support both JSON and XML [input formatters](https://learn.microsoft.com/search/?terms=mvc%2Fmodels%2Fmodel-binding%23input-formatters), an action supports multiple content types, including `application/json` and `application/xml`.

The [\[Consumes\]](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ConsumesAttribute) attribute allows an action to limit the supported request content types. Apply the `[Consumes]` attribute to an action or controller, specifying one or more content types:

```csharp
[HttpPost]
[Consumes("application/xml")]
public IActionResult CreateProduct(Product product)
```

In the preceding code, the `CreateProduct` action specifies the content type `application/xml`. Requests routed to this action must specify a `Content-Type` header of `application/xml`. Requests that don't specify a `Content-Type` header of `application/xml` result in a [415 Unsupported Media Type](https://developer.mozilla.org/docs/Web/HTTP/Status/415) response.

The `[Consumes]` attribute also allows an action to influence its selection based on an incoming request's content type by applying a type constraint. Consider the following example:

[Code example (complete source file; reference: index/samples/3.x/Controllers/ConsumesController.cs?name=snippet_Class)](../../_code/aspnetcore/web-api/index/samples/3.x/Controllers/ConsumesController.cs.md)

In the preceding code, `ConsumesController` is configured to handle requests sent to the `https://localhost:5001/api/Consumes` URL. Both of the controller's actions, `PostJson` and `PostForm`, handle POST requests with the same URL. Without the `[Consumes]` attribute applying a type constraint, an ambiguous match exception is thrown.

The `[Consumes]` attribute is applied to both actions. The `PostJson` action handles requests sent with a `Content-Type` header of `application/json`. The `PostForm` action handles requests sent with a `Content-Type` header of `application/x-www-form-urlencoded`.

## Additional resources

* [web-api/action-return-types](action-return-types.md)
* [fundamentals/error-handling-api](../fundamentals/error-handling-api.md)
* [web-api/advanced/custom-formatters](advanced/custom-formatters.md)
* [web-api/advanced/formatting](advanced/formatting.md)
* [tutorials/web-api-help-pages-using-swagger](../tutorials/web-api-help-pages-using-swagger.md)
* [mvc/controllers/routing](../mvc/controllers/routing.md)
* [Create a web API with ASP.NET Core](https://learn.microsoft.com/training/modules/build-web-api-aspnet-core/)



**Applies to: < aspnetcore-3.0**

[Code example (complete source file; reference: index/samples/2.x/2.2/Controllers/ValuesController.cs?name=snippet_ControllerSignature\&highlight=3)](../../_code/aspnetcore/web-api/index/samples/2.x/2.2/Controllers/ValuesController.cs.md)
Don't create a web API controller by deriving from the [Microsoft.AspNetCore.Mvc.Controller](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Controller) class. `Controller` derives from `ControllerBase` and adds support for views, so it's for handling web pages, not web API requests. There's an exception to this rule: if you plan to use the same controller for both views and web APIs, derive it from `Controller`.
The `ControllerBase` class provides many properties and methods that are useful for handling HTTP requests. For example, `ControllerBase.CreatedAtAction` returns a 201 status code:
[Code example (complete source file; reference: index/samples/2.x/2.2/Controllers/PetsController.cs?name=snippet_400And201\&highlight=10)](../../_code/aspnetcore/web-api/index/samples/2.x/2.2/Controllers/PetsController.cs.md)
Here are some more examples of methods that `ControllerBase` provides:

| Method | Notes |
| --- | --- |
| [Microsoft.AspNetCore.Mvc.ControllerBase.BadRequest%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase.BadRequest%252A) | Returns 400 status code. |
| [Microsoft.AspNetCore.Mvc.ControllerBase.NotFound%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase.NotFound%252A) | Returns 404 status code. |
| [Microsoft.AspNetCore.Mvc.ControllerBase.PhysicalFile%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase.PhysicalFile%252A) | Returns a file. |
| [Microsoft.AspNetCore.Mvc.ControllerBase.TryUpdateModelAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase.TryUpdateModelAsync%252A) | Invokes [model binding](../mvc/models/model-binding.md). |
| [Microsoft.AspNetCore.Mvc.ControllerBase.TryValidateModel%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase.TryValidateModel%252A) | Invokes [model validation](../mvc/models/validation.md). |

For a list of all available methods and properties, see [Microsoft.AspNetCore.Mvc.ControllerBase](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase).
## Attributes
The [Microsoft.AspNetCore.Mvc](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc) namespace provides attributes that can be used to configure the behavior of web API controllers and action methods. The following example uses attributes to specify the supported HTTP action verb and any known HTTP status codes that could be returned:
[Code example (complete source file; reference: index/samples/2.x/2.2/Controllers/PetsController.cs?name=snippet_400And201\&highlight=1-3)](../../_code/aspnetcore/web-api/index/samples/2.x/2.2/Controllers/PetsController.cs.md)
Here are some more examples of attributes that are available:

| Attribute | Notes |
| --- | --- |
| [`[Route]`](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/web-api/\[Microsoft.AspNetCore.Mvc.RouteAttribute]\(https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.RouteAttribute\)) | Specifies URL pattern for a controller or action. |
| [`[Bind]`](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/web-api/\[Microsoft.AspNetCore.Mvc.BindAttribute]\(https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.BindAttribute\)) | Specifies prefix and properties to include for model binding. |
| [`[HttpGet]`](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/web-api/\[Microsoft.AspNetCore.Mvc.HttpGetAttribute]\(https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.HttpGetAttribute\)) | Identifies an action that supports the HTTP GET action verb. |
| [`[Consumes]`](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/web-api/\[Microsoft.AspNetCore.Mvc.ConsumesAttribute]\(https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ConsumesAttribute\)) | Specifies data types that an action accepts. |
| [`[Produces]`](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/web-api/\[Microsoft.AspNetCore.Mvc.ProducesAttribute]\(https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ProducesAttribute\)) | Specifies data types that an action returns. |

For a list that includes the available attributes, see the [Microsoft.AspNetCore.Mvc](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc) namespace.
## ApiController attribute
The [`[ApiController]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApiControllerAttribute) attribute can be applied to a controller class to enable the following opinionated, API-specific behaviors:
* [Attribute routing requirement](#attribute-routing-requirement)
* [Automatic HTTP 400 responses](#automatic-http-400-responses)
* [Binding source parameter inference](#binding-source-parameter-inference)
* [Multipart/form-data request inference](#multipartform-data-request-inference)
* [Problem details for error status codes](#problem-details-for-error-status-codes)
The *Problem details for error status codes* feature requires a [compatibility version](../mvc/compatibility-version.md) of 2.2 or later. The other features require a compatibility version of 2.1 or later.
* [Attribute routing requirement](#attribute-routing-requirement)
* [Automatic HTTP 400 responses](#automatic-http-400-responses)
* [Binding source parameter inference](#binding-source-parameter-inference)
* [Multipart/form-data request inference](#multipartform-data-request-inference)
These features require a [compatibility version](../mvc/compatibility-version.md) of 2.1 or later.
### Attribute on specific controllers
The `[ApiController]` attribute can be applied to specific controllers, as in the following example from the project template:
[Code example (complete source file; reference: index/samples/2.x/2.2/Controllers/ValuesController.cs?name=snippet_ControllerSignature\&highlight=2)](../../_code/aspnetcore/web-api/index/samples/2.x/2.2/Controllers/ValuesController.cs.md)
### Attribute on multiple controllers
One approach to using the attribute on more than one controller is to create a custom base controller class annotated with the `[ApiController]` attribute. The following example shows a custom base class and a controller that derives from it:
[Code example (complete source file; reference: index/samples/2.x/2.2/Controllers/MyControllerBase.cs?name=snippet_MyControllerBase)](../../_code/aspnetcore/web-api/index/samples/2.x/2.2/Controllers/MyControllerBase.cs.md)
[Code example (complete source file; reference: index/samples/2.x/2.2/Controllers/PetsController.cs?name=snippet_Inherit)](../../_code/aspnetcore/web-api/index/samples/2.x/2.2/Controllers/PetsController.cs.md)
### Attribute on an assembly
If [compatibility version](../mvc/compatibility-version.md) is set to 2.2 or later, the `[ApiController]` attribute can be applied to an assembly. Annotation in this manner applies web API behavior to all controllers in the assembly. There's no way to opt out for individual controllers. Apply the assembly-level attribute to the namespace declaration surrounding the `Startup` class:
```csharp
[assembly: ApiController]
namespace WebApiSample
{
    public class Startup
    {
        ...
    }
}
```

## Attribute routing requirement

The `[ApiController]` attribute makes attribute routing a requirement. For example:

[Code example (complete source file; reference: index/samples/2.x/2.2/Controllers/ValuesController.cs?name=snippet_ControllerSignature\&highlight=1)](../../_code/aspnetcore/web-api/index/samples/2.x/2.2/Controllers/ValuesController.cs.md)

Actions are inaccessible via [conventional routes](https://learn.microsoft.com/search/?terms=mvc%2Fcontrollers%2Frouting%23conventional-routing) defined by [Microsoft.AspNetCore.Builder.MvcApplicationBuilderExtensions.UseMvc%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.MvcApplicationBuilderExtensions.UseMvc%252A) or [Microsoft.AspNetCore.Builder.MvcApplicationBuilderExtensions.UseMvcWithDefaultRoute%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.MvcApplicationBuilderExtensions.UseMvcWithDefaultRoute%252A) in `Startup.Configure`.

## Automatic HTTP 400 responses

The `[ApiController]` attribute makes model validation errors automatically trigger an HTTP 400 response. Consequently, the following code is unnecessary in an action method:

```csharp
if (!ModelState.IsValid)
{
    return BadRequest(ModelState);
}
```

ASP.NET Core MVC uses the [Microsoft.AspNetCore.Mvc.Infrastructure.ModelStateInvalidFilter](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Infrastructure.ModelStateInvalidFilter) action filter to do the preceding check.

### Default BadRequest response

With a compatibility version of 2.1, the default response type for an HTTP 400 response is [Microsoft.AspNetCore.Mvc.SerializableError](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.SerializableError). The following request body is an example of the serialized type:

```json
{
  "": [
    "A non-empty request body is required."
  ]
}
```

With a compatibility version of 2.2 or later, the default response type for an HTTP 400 response is [Microsoft.AspNetCore.Mvc.ValidationProblemDetails](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ValidationProblemDetails). The following request body is an example of the serialized type:

```json
{
  "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
  "title": "One or more validation errors occurred.",
  "status": 400,
  "traceId": "|7fb5e16a-4c8f23bbfc974667.",
  "errors": {
    "": [
      "A non-empty request body is required."
    ]
  }
}
```

The `ValidationProblemDetails` type:

* Provides a machine-readable format for specifying errors in web API responses.
* Complies with the [RFC 7807 specification](https://tools.ietf.org/html/rfc7807).

To make automatic and custom responses consistent, call the [Microsoft.AspNetCore.Mvc.ControllerBase.ValidationProblem%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase.ValidationProblem%252A) method instead of [System.Web.Http.ApiController.BadRequest%2A](https://learn.microsoft.com/search/?terms=System.Web.Http.ApiController.BadRequest%252A). `ValidationProblem` returns a [Microsoft.AspNetCore.Mvc.ValidationProblemDetails](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ValidationProblemDetails) object as well as the automatic response.

### Log automatic 400 responses

See [How to log automatic 400 responses on model validation errors (dotnet/AspNetCore.Docs#12157)](https://github.com/dotnet/AspNetCore.Docs/issues/12157).

### Disable automatic 400 response

To disable the automatic 400 behavior, set the [Microsoft.AspNetCore.Mvc.ApiBehaviorOptions.SuppressModelStateInvalidFilter](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApiBehaviorOptions.SuppressModelStateInvalidFilter) property to `true`. Add the following highlighted code in `Startup.ConfigureServices`:

[Code example (complete source file; reference: index/samples/2.x/2.1/Startup.cs?name=snippet_ConfigureApiBehaviorOptions\&highlight=1,5)](../../_code/aspnetcore/web-api/index/samples/2.x/2.1/Startup.cs.md)

## Binding source parameter inference

A binding source attribute defines the location at which an action parameter's value is found. The following binding source attributes exist:

| Attribute | Binding source |
| --- | --- |
| [`[FromBody]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.FromBodyAttribute) | Request body |
| [`[FromForm]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.FromFormAttribute) | Form data in the request body |
| [`[FromHeader]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.FromHeaderAttribute) | Request header |
| [`[FromQuery]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.FromQueryAttribute) | Request query string parameter |
| [`[FromRoute]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.FromRouteAttribute) | Route data from the current request |
| [`[FromServices]`](https://learn.microsoft.com/search/?terms=mvc%2Fcontrollers%2Fdependency-injection%23action-injection-with-fromservices) | The request service injected as an action parameter |

> **Warning:**
> Don't use `[FromRoute]` when values might contain `%2f` (that is `/`). `%2f` won't be unescaped to `/`. Use `[FromQuery]` if the value might contain `%2f`.
Without the `[ApiController]` attribute or binding source attributes like `[FromQuery]`, the ASP.NET Core runtime attempts to use the complex object model binder. The complex object model binder pulls data from value providers in a defined order.

In the following example, the `[FromQuery]` attribute indicates that the `discontinuedOnly` parameter value is provided in the request URL's query string:

[Code example (complete source file; reference: index/samples/2.x/2.2/Controllers/ProductsController.cs?name=snippet_BindingSourceAttributes\&highlight=3)](../../_code/aspnetcore/web-api/index/samples/2.x/2.2/Controllers/ProductsController.cs.md)

The `[ApiController]` attribute applies inference rules for the default data sources of action parameters. These rules save you from having to identify binding sources manually by applying attributes to the action parameters. The binding source inference rules behave as follows:

* `[FromBody]` is inferred for complex type parameters. An exception to the `[FromBody]` inference rule is any complex, built-in type with a special meaning, such as [Microsoft.AspNetCore.Http.IFormCollection](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IFormCollection) and [System.Threading.CancellationToken](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken). The binding source inference code ignores those special types.
* `[FromForm]` is inferred for action parameters of type [Microsoft.AspNetCore.Http.IFormFile](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IFormFile) and [Microsoft.AspNetCore.Http.IFormFileCollection](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IFormFileCollection). It's not inferred for any simple or user-defined types.
* `[FromRoute]` is inferred for any action parameter name matching a parameter in the route template. When more than one route matches an action parameter, any route value is considered `[FromRoute]`.
* `[FromQuery]` is inferred for any other action parameters.

### FromBody inference notes

`[FromBody]` isn't inferred for simple types such as `string` or `int`. Therefore, the `[FromBody]` attribute should be used for simple types when that functionality is needed.

When an action has more than one parameter bound from the request body, an exception is thrown. For example, all of the following action method signatures cause an exception:

* `[FromBody]` inferred on both because they're complex types.

  ```csharp
  [HttpPost]
  public IActionResult Action1(Product product, Order order)
  ```
* `[FromBody]` attribute on one, inferred on the other because it's a complex type.
  ```csharp
  [HttpPost]
  public IActionResult Action2(Product product, [FromBody] Order order)
  ```
* `[FromBody]` attribute on both.
  ```csharp
  [HttpPost]
  public IActionResult Action3([FromBody] Product product, [FromBody] Order order)
  ```
> **Note:**
> In ASP.NET Core 2.1, collection type parameters such as lists and arrays are incorrectly inferred as `[FromQuery]`. The `[FromBody]` attribute should be used for these parameters if they are to be bound from the request body. This behavior is corrected in ASP.NET Core 2.2 or later, where collection type parameters are inferred to be bound from the body by default.
### Disable inference rules
To disable binding source inference, set [Microsoft.AspNetCore.Mvc.ApiBehaviorOptions.SuppressInferBindingSourcesForParameters](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApiBehaviorOptions.SuppressInferBindingSourcesForParameters) to `true`. Add the following code in `Startup.ConfigureServices`:
[Code example (complete source file; reference: index/samples/2.x/2.1/Startup.cs?name=snippet_ConfigureApiBehaviorOptions\&highlight=1,4)](../../_code/aspnetcore/web-api/index/samples/2.x/2.1/Startup.cs.md)
## Multipart/form-data request inference
The `[ApiController]` attribute applies an inference rule for action parameters of type [Microsoft.AspNetCore.Http.IFormFile](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IFormFile) and [Microsoft.AspNetCore.Http.IFormFileCollection](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IFormFileCollection). The `multipart/form-data` request content type is inferred for these types.
To disable the default behavior, set the [Microsoft.AspNetCore.Mvc.ApiBehaviorOptions.SuppressConsumesConstraintForFormFileParameters](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApiBehaviorOptions.SuppressConsumesConstraintForFormFileParameters) property to `true` in `Startup.ConfigureServices`:
[Code example (complete source file; reference: index/samples/2.x/2.1/Startup.cs?name=snippet_ConfigureApiBehaviorOptions\&highlight=1,3)](../../_code/aspnetcore/web-api/index/samples/2.x/2.1/Startup.cs.md)
## Problem details for error status codes
When the compatibility version is 2.2 or later, MVC transforms an error result (a result with status code 400 or higher) to a result with [Microsoft.AspNetCore.Mvc.ProblemDetails](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ProblemDetails). The `ProblemDetails` type is based on the [RFC 7807 specification](https://tools.ietf.org/html/rfc7807) for providing machine-readable error details in an HTTP response.
Consider the following code in a controller action:
[Code example (complete source file; reference: index/samples/2.x/2.2/Controllers/PetsController.cs?name=snippet_ProblemDetailsStatusCode)](../../_code/aspnetcore/web-api/index/samples/2.x/2.2/Controllers/PetsController.cs.md)
The `NotFound` method produces an HTTP 404 status code with a `ProblemDetails` body. For example:
```json
{
  type: "https://tools.ietf.org/html/rfc7231#section-6.5.4",
  title: "Not Found",
  status: 404,
  traceId: "0HLHLV31KRN83:00000001"
}
```

### Disable ProblemDetails response

The automatic creation of a `ProblemDetails` for error status codes is disabled when the [Microsoft.AspNetCore.Mvc.ApiBehaviorOptions.SuppressMapClientErrors%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApiBehaviorOptions.SuppressMapClientErrors%252A) property is set to `true`. Add the following code in `Startup.ConfigureServices`:

<a name="consumes"></a>

## Define supported request content types with the [Consumes] attribute

By default, an action supports all available request content types. For example, if an app is configured to support both JSON and XML [input formatters](https://learn.microsoft.com/search/?terms=mvc%2Fmodels%2Fmodel-binding%23input-formatters), an action supports multiple content types, including `application/json` and `application/xml`.

The [\[Consumes\]](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/web-api/\[Microsoft.AspNetCore.Mvc.ConsumesAttribute]\(https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ConsumesAttribute\)) attribute allows an action to limit the supported request content types. Apply the `[Consumes]` attribute to an action or controller, specifying one or more content types:

```csharp
[HttpPost]
[Consumes("application/xml")]
public IActionResult CreateProduct(Product product)
```
In the preceding code, the `CreateProduct` action specifies the content type `application/xml`. Requests routed to this action must specify a `Content-Type` header of `application/xml`. Requests that don't specify a `Content-Type` header of `application/xml` result in a [415 Unsupported Media Type](https://developer.mozilla.org/docs/Web/HTTP/Status/415) response.
The `[Consumes]` attribute also allows an action to influence its selection based on an incoming request's content type by applying a type constraint. Consider the following example:
[Code example (complete source file; reference: index/samples/3.x/Controllers/ConsumesController.cs?name=snippet_Class)](../../_code/aspnetcore/web-api/index/samples/3.x/Controllers/ConsumesController.cs.md)
In the preceding code, `ConsumesController` is configured to handle requests sent to the `https://localhost:5001/api/Consumes` URL. Both of the controller's actions, `PostJson` and `PostForm`, handle POST requests with the same URL. Without the `[Consumes]` attribute applying a type constraint, an ambiguous match exception is thrown.
The `[Consumes]` attribute is applied to both actions. The `PostJson` action handles requests sent with a `Content-Type` header of `application/json`. The `PostForm` action handles requests sent with a `Content-Type` header of `application/x-www-form-urlencoded`. 
## Additional resources
* [web-api/action-return-types](action-return-types.md)
* [fundamentals/error-handling-api](../fundamentals/error-handling-api.md)
* [web-api/advanced/custom-formatters](advanced/custom-formatters.md)
* [web-api/advanced/formatting](advanced/formatting.md)
* [tutorials/web-api-help-pages-using-swagger](../tutorials/web-api-help-pages-using-swagger.md)
* [mvc/controllers/routing](../mvc/controllers/routing.md)
* [Create a web API with ASP.NET Core](https://learn.microsoft.com/training/modules/build-web-api-aspnet-core/)
