---
title: Filters in Minimal API apps
author: wadepickett
description: Use filters in Minimal API apps, including validation of an object with a filter, and registering a filter.
ms.author: wpickett
ms.date: 04/28/2026
monikerRange: '>= aspnetcore-7.0'
uid: fundamentals/minimal-apis/min-api-filters

# customer intent: As an ASP.NET developer, I want to use filters in Minimal APIs, so I can validate and log request and response data for my apps.
---

# Filters in Minimal API apps

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


By [Fiyaz Bin Hasan](https://github.com/fiyazbinhasan), [Martin Costello](https://twitter.com/martin_costello), and [Rick Anderson](https://twitter.com/RickAndMSFT)

Minimal API filters allow developers to implement business logic that supports the following tasks:

* Run code before and after the endpoint handler
* Inspect and modify parameters provided during an endpoint handler invocation
* Intercept the response behavior of an endpoint handler

Filters are helpful in many scenarios:

* Validate request parameters and body sent to an endpoint
* Log information about the request and response
* Validate a request targets a supported API version

This article describes how to use filters in your Minimal API apps, such as for validating request data sent to your app and logging the response.

## Work with filters

Filters are registered by providing a [Delegate](https://learn.microsoft.com/dotnet/csharp/programming-guide/delegates/) that takes a [EndpointFilterInvocationContext](https://github.com/dotnet/aspnetcore/blob/main/src/Http/Http.Abstractions/src/EndpointFilterInvocationContext.cs) and returns a [EndpointFilterDelegate](https://github.com/dotnet/aspnetcore/blob/main/src/Http/Http.Abstractions/src/EndpointFilterDelegate.cs). The `EndpointFilterInvocationContext` provides access to the `HttpContext` of the request and an `Arguments` list. The list specifies the arguments passed to the handler in the order in which they appear in the declaration of the handler.

[Code example (complete source file; reference: \~/fundamentals/minimal-apis/min-api-filters/7samples/Filters/Program.cs?name=snippet1)](../../../_code/aspnetcore/fundamentals/minimal-apis/min-api-filters/7samples/Filters/Program.cs.md)

The preceding code:

* Calls the `AddEndpointFilter` extension method to add a filter to the `/colorSelector/{color}` endpoint.
* Returns the color specified, except for the value `"Red"`.
* Returns [Results.Problem](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Results.Problem%252A) when the `/colorSelector/Red` is requested.
* Uses `next` as the `EndpointFilterDelegate` and `invocationContext` as the `EndpointFilterInvocationContext` to invoke the next filter in the pipeline, or the request delegate if the last filter is already invoked.

The filter runs before the endpoint handler. When multiple `AddEndpointFilter` invocations are made on a handler:

* The execution order of filter code called _before_ the call to `EndpointFilterDelegate` (`next`) is First In, First Out (FIFO).
* The execution order of filter code called _after_ the call to `EndpointFilterDelegate` (`next`) is First In, Last Out (FILO).

[Code example (complete source file; reference: \~/fundamentals/minimal-apis/min-api-filters/7samples/Filters/Program.cs?name=snippet_xyz)](../../../_code/aspnetcore/fundamentals/minimal-apis/min-api-filters/7samples/Filters/Program.cs.md)

In the preceding code, the filters and endpoint log the following output:

```dotnetcli
Before first filter
    Before 2nd filter
        Before 3rd filter
            Endpoint
        After 3rd filter
    After 2nd filter
After first filter
```

The following code uses filters that implement the `IEndpointFilter` interface:

[Code example (complete source file; reference: \~/fundamentals/minimal-apis/min-api-filters/7samples/Filters/Program.cs?name=snippet_abc)](../../../_code/aspnetcore/fundamentals/minimal-apis/min-api-filters/7samples/Filters/Program.cs.md)

In the preceding code, the logs for the filters and handlers show the run order:

```dotnetcli
AEndpointFilter Before next
BEndpointFilter Before next
CEndpointFilter Before next
      Endpoint
CEndpointFilter After next
BEndpointFilter After next
AEndpointFilter After next
```

Filters that implement the `IEndpointFilter` interface are shown in the following example:

[Code example (complete source file; reference: \~/fundamentals/minimal-apis/min-api-filters/7samples/Filters/EndpointFilters/AbcEndpointFilters.cs)](../../../_code/aspnetcore/fundamentals/minimal-apis/min-api-filters/7samples/Filters/EndpointFilters/AbcEndpointFilters.cs.md)

## Validate an object with a filter

Consider a filter that validates a `Todo` object:

[Code example (complete source file; reference: \~/fundamentals/minimal-apis/min-api-filters/7samples/todo/Program.cs?name=snippet_filter1)](../../../_code/aspnetcore/fundamentals/minimal-apis/min-api-filters/7samples/todo/Program.cs.md)

In the preceding code:

* The `EndpointFilterInvocationContext` object provides access to the parameters associated with a particular request issued to the endpoint via the `GetArguments` method.
* The filter is registered by using a `delegate` that takes a `EndpointFilterInvocationContext` and returns a `EndpointFilterDelegate`.

In addition to being passed as delegates, filters can be registered by implementing the `IEndpointFilter` interface. The following code shows the preceding filter encapsulated in a class that implements `IEndpointFilter`:

[Code example (complete source file; reference: \~/fundamentals/minimal-apis/min-api-filters/7samples/todo/EndpointFilters/ToDoIsValidFilter.cs?name=snippet)](../../../_code/aspnetcore/fundamentals/minimal-apis/min-api-filters/7samples/todo/EndpointFilters/ToDoIsValidFilter.cs.md)

Filters that implement the `IEndpointFilter` interface can resolve dependencies from [Dependency Injection (DI)](../dependency-injection.md), as shown in the previous code. Although filters can resolve dependencies from DI, filters themselves **can't** be resolved from DI.

The `ToDoIsValidFilter` is applied to the following endpoints:

[Code example (complete source file; reference: \~/fundamentals/minimal-apis/min-api-filters/7samples/todo/Program.cs?name=snippet_2flt\&highlight=13,21)](../../../_code/aspnetcore/fundamentals/minimal-apis/min-api-filters/7samples/todo/Program.cs.md)

The following filter validates the `Todo` object and modifies the `Name` property:

[Code example (complete source file; reference: \~/fundamentals/minimal-apis/min-api-filters/7samples/todo/EndpointFilters/ToDoIsValidFilter.cs?name=snippet2\&highlight=7)](../../../_code/aspnetcore/fundamentals/minimal-apis/min-api-filters/7samples/todo/EndpointFilters/ToDoIsValidFilter.cs.md)

## Register a filter by using an endpoint filter factory

In some scenarios, it might be necessary to cache some of the information provided in the [MethodInfo](https://learn.microsoft.com/dotnet/api/system.reflection.methodinfo) in a filter. Suppose you want to verify that the handler attached to an endpoint filter has a first parameter that evaluates to a `Todo` type.

[Code example (complete source file; reference: \~/fundamentals/minimal-apis/min-api-filters/7samples/todo/Program.cs?name=snippet_filterfactory1)](../../../_code/aspnetcore/fundamentals/minimal-apis/min-api-filters/7samples/todo/Program.cs.md)

In the preceding code:

* The `EndpointFilterFactoryContext` object provides access to the [MethodInfo](https://learn.microsoft.com/dotnet/api/system.reflection.methodinfo) associated with the endpoint's handler.
* The signature of the handler is examined by inspecting `MethodInfo` for the expected type signature. If the expected signature is found, the validation filter is registered onto the endpoint. This factory pattern is useful to register a filter that depends on the signature of the target endpoint handler.
* If a matching signature isn't found, a pass-through filter is registered.

## Register a filter on controller actions

In some scenarios, it might be necessary to apply the same filter logic for both route-handler based endpoints and controller actions. For this scenario, you can invoke `AddEndpointFilter` on `ControllerActionEndpointConventionBuilder` to support executing the same filter logic on actions and endpoints.

[Code example (complete source file; reference: \~/fundamentals/minimal-apis/min-api-filters/7samples/Filters/Program.cs?name=snippet_action_endpoint_filters)](../../../_code/aspnetcore/fundamentals/minimal-apis/min-api-filters/7samples/Filters/Program.cs.md)

## Related content

* [View or download sample code](https://github.com/aspnet/Docs/tree/main/aspnetcore/fundamentals/minimal-apis/min-api-filters/7samples) ([How to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample))
* [ValidationFilterRouteHandlerBuilderExtensions (Validation extension methods)](https://github.com/DamianEdwards/MinimalApis.Extensions/blob/main/src/MinimalApis.Extensions/Filters/ValidationFilterRouteHandlerBuilderExtensions.cs)
* [Tutorial: Create a Minimal API with ASP.NET Core](../../tutorials/min-web-api.md)
* [Authentication and authorization in Minimal APIs](security.md)
