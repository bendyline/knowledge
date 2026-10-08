---
title: Route handlers in Minimal API apps
author: wadepickett
description: Learn how to handle route requests in Minimal API apps, define preferred methods, bind route parameters, and process the request response.
ms.author: wpickett
monikerRange: '>= aspnetcore-7.0'
ms.date: 04/28/2026
uid: fundamentals/minimal-apis/route-handlers

# customer intent: As an ASP.NET developer, I want to use route handlers in Minimal APIs, so I can define my preferred methods to execute when a route matches.
---

# Route handlers in Minimal API apps

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


A configured `WebApplication` supports `Map{Verb}` and the [Microsoft.AspNetCore.Builder.EndpointRouteBuilderExtensions.MapMethods%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.EndpointRouteBuilderExtensions.MapMethods%252A), where `{Verb}` is a Pascal-cased HTTP method like `Get`, `Post`, `Put`, or `Delete`:

[Code example (complete source file; reference: 7.0-samples/WebMinAPIs/Program.cs?name=snippet_r1)](../../../_code/aspnetcore/fundamentals/minimal-apis/7.0-samples/WebMinAPIs/Program.cs.md)

The [System.Delegate](https://learn.microsoft.com/search/?terms=System.Delegate) arguments passed to these methods are called _route handlers_.

This article describes how to use route handlers, including examples, parameters, route groups, and route constraints.

## Work with route handlers

Route handlers are methods that execute when the route matches. Route handlers can be a lambda expression, a local function, an instance method, or a static method. Route handlers can be synchronous or asynchronous.

The following sections provide examples of different route handlers.

### Lambda expression

[Code reference unavailable in this source snapshot: includes/~/fundamentals/minimal-apis/7.0-samples/WebMinAPIs/Program.cs?name=snippet_le](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/minimal-apis/route-handlers.md)

### Local function

[Code reference unavailable in this source snapshot: includes/~/fundamentals/minimal-apis/7.0-samples/WebMinAPIs/Program.cs?name=snippet_lf](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/minimal-apis/route-handlers.md)

### Instance method

[Code reference unavailable in this source snapshot: includes/~/fundamentals/minimal-apis/7.0-samples/WebMinAPIs/Program.cs?name=snippet_im](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/minimal-apis/route-handlers.md)

### Static method

[Code reference unavailable in this source snapshot: includes/~/fundamentals/minimal-apis/7.0-samples/WebMinAPIs/Program.cs?name=snippet_sm](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/minimal-apis/route-handlers.md)

### Endpoint defined outside of Program.cs

Minimal APIs don't have to be located in the _Program.cs_ file. For example, you can set up the structure in the _Program.cs_ file, and define the endpoint in a separate file:

**Program.cs**

[Code reference unavailable in this source snapshot: includes/~/fundamentals/minimal-apis/8.0-samples/MinAPISeparateFile/Program.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/minimal-apis/route-handlers.md)

**TodoEndpoints.cs**

[Code reference unavailable in this source snapshot: includes/~/fundamentals/minimal-apis/8.0-samples/MinAPISeparateFile/TodoEndpoints.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/minimal-apis/route-handlers.md)

For more information, see the [Route groups](#route-groups) section later in this article.

### Named endpoints and link generation

You can supply a name for your endpoints to generate URLs that target the endpoint. Using a named endpoint avoids having to hard code paths in an app:

[Code reference unavailable in this source snapshot: includes/~/fundamentals/minimal-apis/samples/WebMinAPIs/Program.cs?name=snippet_nr](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/minimal-apis/route-handlers.md)

The preceding code displays the message _`The link to the hello route is /hello`_ from the `/` (forward slash) endpoint.

#### Criteria for endpoint names

Endpoint names must satisfy the following criteria:

* Endpoint names are case sensitive.
* Endpoint names must be globally unique.
* Endpoint names are used as the OpenAPI operation identifier (ID) when OpenAPI support is enabled. For more information, see [Generate OpenAPI documents](../openapi/aspnetcore-openapi.md).

### Route parameters

Route parameters can be captured as part of the route pattern definition:

[Code reference unavailable in this source snapshot: includes/~/fundamentals/minimal-apis/7.0-samples/WebMinAPIs/Program.cs?name=snippet_rp](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/minimal-apis/route-handlers.md)

The preceding code returns the message _The user id is 3 and book id is 7_ from the URI `/users/3/books/7`.

The route handler can declare the parameters to capture. When a request is made to a route with parameters declared to capture, the parameters are parsed and passed to the handler. This approach makes it easy to capture the values in a type-safe way. In the preceding code, the `userId` and `bookId` parameters are both type `int`.

In the preceding code, if either route value can't be converted to an `int`, an exception is thrown. The GET request `/users/hello/books/3` throws the following exception:

```output
BadHttpRequestException: Failed to bind parameter "int userId" from "hello".
```

### Wildcard and catch all routes

The following catch all route returns _Routing to hello_ from the `/posts/hello` endpoint:

[Code reference unavailable in this source snapshot: includes/~/fundamentals/minimal-apis/7.0-samples/WebMinAPIs/Program.cs?name=snippet_wild](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/minimal-apis/route-handlers.md)

### Route constraints

Route constraints restrict the matching behavior of a route.

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/todos/{id:int}", (int id) => db.Todos.Find(id));
app.MapGet("/todos/{text}", (string text) => db.Todos.Where(t => t.Text.Contains(text));
app.MapGet("/posts/{slug:regex(^[a-z0-9_-]+$)}", (string slug) => $"Post {slug}");

app.Run();
```

The following table demonstrates the preceding route templates and their behavior.

| Route template | Example matching URI |
| --- | --- |
| `/todos/{id:int}` | `/todos/1` |
| `/todos/{text}` | `/todos/something` |
| `/posts/{slug:regex(^[a-z0-9_-]+$)}` | `/posts/mypost` |

For more information, see [Route constraint reference](https://learn.microsoft.com/search/?terms=fundamentals%2Frouting%23route-constraints) in [fundamentals/routing](../routing.md).

### Route groups

The [Microsoft.AspNetCore.Builder.EndpointRouteBuilderExtensions.MapGroup%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.EndpointRouteBuilderExtensions.MapGroup%252A) extension method helps organize groups of endpoints with a common prefix and reduces repetitive code. Use this method to customize entire groups of endpoints with a single call to methods like [Microsoft.AspNetCore.Builder.AuthorizationEndpointConventionBuilderExtensions.RequireAuthorization%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AuthorizationEndpointConventionBuilderExtensions.RequireAuthorization%252A) and [Microsoft.AspNetCore.Builder.RoutingEndpointConventionBuilderExtensions.WithMetadata%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.RoutingEndpointConventionBuilderExtensions.WithMetadata%252A) that add [endpoint metadata](https://learn.microsoft.com/search/?terms=fundamentals%2Frouting%23endpoint-metadata).

For example, the following code creates two similar groups of endpoints:

[language="csharp" source="\~/fundamentals/minimal-apis/7.0-samples/todo-group/Program.cs" id="snippet_MapGroup"::: (complete source file; reference: \~/fundamentals/minimal-apis/7.0-samples/todo-group/Program.cs)](../../../_code/aspnetcore/fundamentals/minimal-apis/7.0-samples/todo-group/Program.cs.md)

[language="csharp" source="\~/fundamentals/minimal-apis/7.0-samples/todo-group/TodoEndpoints.cs" id="snippet_TodoEndpoints"::: (complete source file; reference: \~/fundamentals/minimal-apis/7.0-samples/todo-group/TodoEndpoints.cs)](../../../_code/aspnetcore/fundamentals/minimal-apis/7.0-samples/todo-group/TodoEndpoints.cs.md)

In this scenario, you can use a relative address for the `Location` header in the `201 Created` result:

[language="csharp" source="\~/fundamentals/minimal-apis/7.0-samples/todo-group/TodoEndpoints.cs" id="snippet_create"::: (complete source file; reference: \~/fundamentals/minimal-apis/7.0-samples/todo-group/TodoEndpoints.cs)](../../../_code/aspnetcore/fundamentals/minimal-apis/7.0-samples/todo-group/TodoEndpoints.cs.md)

The first group of endpoints matches only requests prefixed with `/public/todos` and are accessible without any authentication. The second group of endpoints matches only requests prefixed with `/private/todos` and require authentication.

`QueryPrivateTodos` is a local function that modifies the `TodoDb` parameters of the route handler, to enable them to access and store private todo data. `QueryPrivateTodos` serves as an [endpoint filter factory](min-api-filters.md).

Route groups also support nested groups and complex prefix patterns with route parameters and constraints. In the following example, the route handler mapped to the `user` group can capture the `{org}` and `{group}` route parameters defined in the outer group prefixes.

The prefix can also be empty. This approach can be useful for adding endpoint metadata or filters to a group of endpoints without changing the route pattern.

[language="csharp" source="\~/fundamentals/minimal-apis/7.0-samples/todo-group/Program.cs" id="snippet_NestedMapGroup1"::: (complete source file; reference: \~/fundamentals/minimal-apis/7.0-samples/todo-group/Program.cs)](../../../_code/aspnetcore/fundamentals/minimal-apis/7.0-samples/todo-group/Program.cs.md)

Adding filters or metadata to a group results in the same behavior as adding them individually to each endpoint (before adding extra filters or metadata that might exist in an inner group or specific endpoint).

[language="csharp" source="\~/fundamentals/minimal-apis/7.0-samples/todo-group/Program.cs" id="snippet_NestedMapGroup2"::: (complete source file; reference: \~/fundamentals/minimal-apis/7.0-samples/todo-group/Program.cs)](../../../_code/aspnetcore/fundamentals/minimal-apis/7.0-samples/todo-group/Program.cs.md)

In the preceding example, the outer filter logs the incoming request before the inner filter even though the outer filter is added second. Because the filters are applied to different groups, the order that they're added relative to each other doesn't matter. The order in which filters are added matters when applied to the same group or specific endpoint.

A request to `/outer/inner/` logs the following data:

```dotnetcli
/outer group filter
/inner group filter
MapGet filter
```



## Bind parameters in a route handler

[fundamentals/minimal-apis/parameter-binding](parameter-binding.md) describes the rules in detail for how route handler parameters are populated.

## Handle the response from the route handler

[fundamentals/minimal-apis/responses](responses.md) describes in detail how values returned from route handlers are converted into responses.

## Related content

- [Routing in ASP.NET Core](../routing.md)
- [Parameter Binding in Minimal API apps](parameter-binding.md)
- [Filters in Minimal API apps](min-api-filters.md)
