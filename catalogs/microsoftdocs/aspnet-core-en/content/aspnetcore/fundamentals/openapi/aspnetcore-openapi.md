---
title: Generate OpenAPI documents
ai-usage: ai-assisted
author: wadepickett
description: Learn how to generate and customize OpenAPI documents in an ASP.NET Core app.
monikerRange: '>= aspnetcore-6.0'
ms.author: wpickett
ms.date: 09/04/2026
uid: fundamentals/openapi/aspnetcore-openapi
---
# Generate OpenAPI documents

**Applies to: \>= aspnetcore-10.0**

The [`Microsoft.AspNetCore.OpenApi`](https://www.nuget.org/packages/Microsoft.AspNetCore.OpenApi) package provides built-in support for OpenAPI document generation in ASP.NET Core. The package provides the following features:

* Support for generating [OpenAPI version 3.1](https://spec.openapis.org/oas/v3.1.1.html) documents starting with .NET 10, and [OpenAPI version 3.2](https://spec.openapis.org/oas/v3.2.0.html) documents starting with .NET 11.
* Support for [JSON Schema draft 2020-12](https://json-schema.org/specification-links#2020-12).
* Support for generating OpenAPI documents at run time and accessing them via an endpoint on the app.
* Support for "transformer" APIs that allow modifying the generated document.
* Support for generating multiple OpenAPI documents from a single app.
* Takes advantage of JSON schema support provided by [System.Text.Json](https://learn.microsoft.com/search/?terms=System.Text.Json).
* Compatible with native AoT.

Starting in .NET 11, the default OpenAPI version for generated documents is 3.2. In .NET 10, the default is 3.1. To change the version, explicitly set the [Microsoft.AspNetCore.OpenApi.OpenApiOptions.OpenApiVersion%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OpenApi.OpenApiOptions.OpenApiVersion%252A) property of the [Microsoft.AspNetCore.OpenApi.OpenApiOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OpenApi.OpenApiOptions) in the `configureOptions` delegate parameter of [Microsoft.Extensions.DependencyInjection.OpenApiServiceCollectionExtensions.AddOpenApi%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.OpenApiServiceCollectionExtensions.AddOpenApi%252A):

```csharp
builder.Services.AddOpenApi(options =>
{
    // Specify the OpenAPI version to use
    options.OpenApiVersion = Microsoft.OpenApi.OpenApiSpecVersion.OpenApi3_0;
});
```

When generating the OpenAPI document at build time, the OpenAPI version can be selected by setting the `--openapi-version` in the `OpenApiGenerateDocumentsOptions` MSBuild item.

```xml
<!-- Configure build-time OpenAPI generation to produce an OpenAPI 3.1 document -->
<OpenApiGenerateDocumentsOptions>--openapi-version OpenApi3_1</OpenApiGenerateDocumentsOptions>
```

## Package installation

Install the [`Microsoft.AspNetCore.OpenApi` package](https://www.nuget.org/packages/Microsoft.AspNetCore.OpenApi):

# [Visual Studio](#tab/visual-studio)

Run the following command from the **Package Manager Console**:

```powershell
Install-Package Microsoft.AspNetCore.OpenApi
```

# [.NET CLI](#tab/net-cli)

Run the following command in a command shell opened to the directory that contains the app's project file:

```dotnetcli
dotnet add package Microsoft.AspNetCore.OpenApi
```

---

## Configure OpenAPI document generation

The following code:

* Adds OpenAPI services using the [Microsoft.Extensions.DependencyInjection.OpenApiServiceCollectionExtensions.AddOpenApi%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.OpenApiServiceCollectionExtensions.AddOpenApi%252A) extension method on the app builder's service collection.
* Maps an endpoint for viewing the OpenAPI document in JSON format with the [Microsoft.AspNetCore.Builder.OpenApiEndpointRouteBuilderExtensions.MapOpenApi%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.OpenApiEndpointRouteBuilderExtensions.MapOpenApi%252A) extension method on the app.

[Code example (complete source file; reference: \~/fundamentals/openapi/samples/9.x/WebMinOpenApi/Program.cs?name=snippet_first\&highlight=3,9)](../../../_code/aspnetcore/fundamentals/openapi/samples/9.x/WebMinOpenApi/Program.cs.md)

Launch the app and navigate to `https://localhost:{PORT}/openapi/v1.json` to view the generated OpenAPI document, where the `{PORT}` placeholder is the port.

OpenAPI document generation applies the following behaviors:

* Unknown HTTP methods are excluded from the generated document. For example, the `QUERY` method is an HTTP method that isn't yet recognized by the OpenAPI specification, so it's gracefully excluded from the generated document.
* Numbers and dates are formatted using the invariant culture, so the generated document is consistent regardless of the server's culture settings.

## Options to Customize OpenAPI document generation

The following sections demonstrate how to customize OpenAPI document generation.

### Generate OpenAPI document in YAML format

The OpenAPI document can be generated in either JSON or YAML format. By default, the OpenAPI document is generated in JSON format. To generate the OpenAPI document in YAML format, specify the endpoint in the [Microsoft.AspNetCore.Builder.OpenApiEndpointRouteBuilderExtensions.MapOpenApi%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.OpenApiEndpointRouteBuilderExtensions.MapOpenApi%252A) call with a "`.yaml`" or "`.yml`" suffix, as shown in the following example, where the `{documentName}` placeholder is the document name:

```csharp
app.MapOpenApi("/openapi/{documentName}.yaml");
```

Generating OpenAPI documents in YAML format at build time isn't supported but planned for a future preview.

### Customize the OpenAPI document name

Each OpenAPI document in an app has a unique name. The default document name that is registered is `v1`:

```csharp
builder.Services.AddOpenApi(); // Document name is v1
```

The document name can be modified by passing the name as a parameter to the [Microsoft.Extensions.DependencyInjection.OpenApiServiceCollectionExtensions.AddOpenApi%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.OpenApiServiceCollectionExtensions.AddOpenApi%252A) call:

```csharp
builder.Services.AddOpenApi("internal"); // Document name is internal
```

The document name surfaces in several places in the OpenAPI implementation.

When fetching the generated OpenAPI document, the document name is provided as the `documentName` parameter argument in the request. The following requests resolve the `v1` and `internal` documents.

```bash
GET http://localhost:5000/openapi/v1.json
GET http://localhost:5000/openapi/internal.json
```

### Customize the OpenAPI version of a generated document

By default, OpenAPI document generation creates a document that is compliant with the OpenAPI specification. The following code demonstrates how to modify the default version of the OpenAPI document:

```csharp
builder.Services.AddOpenApi(options =>
{
    options.OpenApiVersion = OpenApiSpecVersion.OpenApi3_0;
});
```

### Customize the OpenAPI endpoint route

By default, the OpenAPI endpoint registered via a call to [Microsoft.AspNetCore.Builder.OpenApiEndpointRouteBuilderExtensions.MapOpenApi%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.OpenApiEndpointRouteBuilderExtensions.MapOpenApi%252A) exposes the document at the `/openapi/{documentName}.json` endpoint. The following code demonstrates how to customize the route at which the OpenAPI document is registered:

```csharp
app.MapOpenApi("/openapi/{documentName}/openapi.json");
```

It's possible, but not recommended, to remove the `documentName` route parameter from the endpoint route. When the `documentName` route parameter is removed from the endpoint route, the framework attempts to resolve the document name from the query parameter. Not providing the `documentName` in either the route or query can result in unexpected behavior.

### Customize the OpenAPI endpoint

Because the OpenAPI document is served via a route handler endpoint, any customization that is available to standard minimal endpoints is available to the OpenAPI endpoint.

#### Limit OpenAPI document access to authorized users

The OpenAPI endpoint doesn't enable authorization checks by default. However, authorization checks can be applied to the OpenAPI document. In the following code, access to the OpenAPI document is limited to users with the `tester` role:

[Code example (complete source file; reference: \~/fundamentals/openapi/samples/9.x/WebMinOpenApi/Program.cs?name=snippet_mapopenapiwithauth)](../../../_code/aspnetcore/fundamentals/openapi/samples/9.x/WebMinOpenApi/Program.cs.md)

#### Cache generated OpenAPI document

The OpenAPI document is regenerated every time a request to the OpenAPI endpoint is sent. Regeneration enables transformers to incorporate dynamic app state into their operation. For example, regenerating a request with details of the HTTP context. When applicable, the OpenAPI document can be cached to avoid executing the document generation pipeline on each HTTP request.

[Code example (complete source file; reference: \~/fundamentals/openapi/samples/9.x/WebMinOpenApi/Program.cs?name=snippet_mapopenapiwithcaching)](../../../_code/aspnetcore/fundamentals/openapi/samples/9.x/WebMinOpenApi/Program.cs.md)

## Generate multiple OpenAPI documents

In some scenarios, it's helpful to generate multiple OpenAPI documents with different content from a single ASP.NET Core API app. These scenarios include generating OpenAPI documentation for different:

* Audiences, such as public and internal APIs.
* Versions of an API.
* Parts of an app, such as a frontend and backend API.

To generate multiple OpenAPI documents, call the [Microsoft.Extensions.DependencyInjection.OpenApiServiceCollectionExtensions.AddOpenApi%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.OpenApiServiceCollectionExtensions.AddOpenApi%252A) extension method once for each document, specifying a different document name in the first parameter each time.

```csharp
builder.Services.AddOpenApi("v1");
builder.Services.AddOpenApi("v2");
```

Each invocation of [Microsoft.Extensions.DependencyInjection.OpenApiServiceCollectionExtensions.AddOpenApi%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.OpenApiServiceCollectionExtensions.AddOpenApi%252A) can specify its own set of options, so you can choose to use the same or different customizations for each OpenAPI document.

The framework uses the [Microsoft.AspNetCore.OpenApi.OpenApiOptions.ShouldInclude](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OpenApi.OpenApiOptions.ShouldInclude) delegate method of [Microsoft.AspNetCore.OpenApi.OpenApiOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OpenApi.OpenApiOptions) to determine which endpoints to include in each document.

For each document, the [Microsoft.AspNetCore.OpenApi.OpenApiOptions.ShouldInclude](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OpenApi.OpenApiOptions.ShouldInclude) delegate method is called for each endpoint in the app, passing the [Microsoft.AspNetCore.Mvc.ApiExplorer.ApiDescription](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApiExplorer.ApiDescription) object for the endpoint. The method returns a boolean value indicating whether the endpoint should be included in the document. The [Microsoft.AspNetCore.Mvc.ApiExplorer.ApiDescription](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApiExplorer.ApiDescription) object:

* Contains information about the endpoint, such as the HTTP method, route, and response types.
* Metadata attached to the endpoint via attributes or extension methods.

The default implementation of this delegate uses the [Microsoft.AspNetCore.Mvc.ApiExplorer.ApiDescription.GroupName](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApiExplorer.ApiDescription.GroupName) field of [Microsoft.AspNetCore.Mvc.ApiExplorer.ApiDescription](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApiExplorer.ApiDescription). The delegate is set on an endpoint using either the [Microsoft.AspNetCore.Builder.RoutingEndpointConventionBuilderExtensions.WithGroupName%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.RoutingEndpointConventionBuilderExtensions.WithGroupName%252A) extension method or the [Microsoft.AspNetCore.Routing.EndpointGroupNameAttribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Routing.EndpointGroupNameAttribute) attribute. `WithGroupName` or the `EndpointGroupName` attribute determines which endpoints to include in the document. Any endpoint that hasn't been assigned a group name is included in all OpenAPI documents.

```csharp
// Include endpoints without a group name or with a group name
// that matches the document name
ShouldInclude = (description) => description.GroupName == null || 
    description.GroupName == DocumentName;    
```

You can customize the [Microsoft.AspNetCore.OpenApi.OpenApiOptions.ShouldInclude](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OpenApi.OpenApiOptions.ShouldInclude) delegate method to include or exclude endpoints based on any criteria.

## Generate OpenAPI documents at build time

> **Note:**
> Starting with .NET 9, ASP.NET Core includes built-in OpenAPI support. The [`Microsoft.AspNetCore.OpenApi`](https://www.nuget.org/packages/Microsoft.AspNetCore.OpenApi) package provides OpenAPI document generation at runtime, and adding the [`Microsoft.Extensions.ApiDescription.Server` ](https://www.nuget.org/packages/Microsoft.Extensions.ApiDescription.Server) package enables build-time document generation. 
>
>ASP.NET Core generates OpenAPI documents only. Interactive UIs such as **Swagger UI** or **Scalar** are not included by default and must be added separately. For guidance on using these UI options, see [fundamentals/openapi/using-openapi-documents](using-openapi-documents.md).

In typical web apps, OpenAPI documents are generated at runtime and served via an HTTP request to the app server.

In some scenarios, it's helpful to generate the OpenAPI document during the app's build step. These scenarios include generating OpenAPI documentation that is:

* Committed into source control.
* Used for spec-based integration testing.
* Served statically from the web server.

To add support for generating OpenAPI documents at build time, install the [`Microsoft.Extensions.ApiDescription.Server` package](https://www.nuget.org/packages/Microsoft.Extensions.ApiDescription.Server):

# [Visual Studio](#tab/visual-studio)

Run the following command from the **Package Manager Console**:

```powershell
Install-Package Microsoft.Extensions.ApiDescription.Server
```

# [.NET CLI](#tab/net-cli)

Run the following command in a command shell opened to the directory that contains the app's project file:

```dotnetcli
dotnet add package Microsoft.Extensions.ApiDescription.Server
```

---

Upon installation, this package:

* Automatically generates the Open API documents associated with the app during build.
* Populates the Open API documents in the app's output directory.

If multiple documents are registered ***and*** the document name is ***not*** `v1`, the project name is post-fixed with the document name. Example: `{ProjectName}_{DocumentName}.json`. The `{ProjectName}` placeholder is the project name, and the `{DocumentName}` placeholder is the document name.

# [Visual Studio Code](#tab/visual-studio-code)

```powershell
dotnet build
type obj\{ProjectName}.json
```

# [.NET CLI](#tab/netcore-cli) 

```cli
dotnet build
cat obj/{ProjectName}.json
```

---

### View build-time OpenAPI logs (Terminal Logger)

When `Microsoft.Extensions.ApiDescription.Server` runs the **GetDocument** step during `dotnet build`, progress messages aren't visible with the .NET Terminal Logger at default verbosity in .NET 8 or later. To surface these messages while building, use either of the following options with the `dotnet build` command.

Set the Terminal Logger's verbosity with the `-tlp` option set to `v=d` (verbosity = detailed):

```dotnetcli
dotnet build -tlp:v=d
```

Disable the Terminal Logger and use legacy-style logs with the [`--tl` option](https://learn.microsoft.com/dotnet/core/tools/dotnet-build#options) set to `off`:

```dotnetcli
dotnet build --tl:off
```

### Customize build-time document generation

#### Modify the output directory of the generated Open API file

By default, the generated OpenAPI document is emitted to the app's output directory. To modify the location of the emitted file, set the target path in the `OpenApiDocumentsDirectory` property:

```xml
<PropertyGroup>
  <OpenApiDocumentsDirectory>.</OpenApiDocumentsDirectory>
</PropertyGroup>
```

The value of `OpenApiDocumentsDirectory` is resolved relative to the project file. Using the `.` value, as seen in the preceding example, emits the OpenAPI document in the same directory as the project file.

#### Modify the output file name

By default, the generated OpenAPI document has the same name as the app's project file. To modify the name of the emitted file, set the `--file-name` argument in the `OpenApiGenerateDocumentsOptions` property:

```xml
<PropertyGroup>
  <OpenApiGenerateDocumentsOptions>--file-name my-open-api</OpenApiGenerateDocumentsOptions>
</PropertyGroup>
```

#### Select the OpenAPI document to generate

Some apps may be configured to emit multiple OpenAPI documents. Multiple OpenAPI documents may be generated for different versions of an API or to distinguish between public and internal APIs. By default, the build-time document generator emits files for all documents that are configured in an app. To only emit for a single document name, set the `--document-name` argument in the `OpenApiGenerateDocumentsOptions` property:

```xml
<PropertyGroup>
  <OpenApiGenerateDocumentsOptions>--document-name v2</OpenApiGenerateDocumentsOptions>
</PropertyGroup>
```



**Applies to: \>= aspnetcore-11.0**

#### Select the app environment

Starting in .NET 11, set the `OpenApiGenerationEnvironment` property to select the app environment used during build-time OpenAPI document generation. The property sets the host's environment for the generation process, equivalent to setting the `ASPNETCORE_ENVIRONMENT` or `DOTNET_ENVIRONMENT` environment variable:

```xml
<PropertyGroup>
  <OpenApiGenerationEnvironment>Development</OpenApiGenerationEnvironment>
</PropertyGroup>
```

Selecting the environment enables environment-specific configuration, such as settings from `appsettings.Development.json`, and environment-dependent document transformations to affect the generated document. The property doesn't change the environment used when the app runs normally.



**Applies to: \>= aspnetcore-10.0**

### Customize runtime behavior during build-time document generation

Build-time OpenAPI document generation functions by launching the apps entrypoint with a mock server implementation. A mock server is required to produce accurate OpenAPI documents because all information in the OpenAPI document can't be statically analyzed. Because the apps entrypoint is invoked, any logic in the apps startup is invoked. This includes code that injects services into the [DI container](../dependency-injection.md) or reads from configuration. In some scenarios, it's necessary to restrict the code paths when the app's entry point is invoked from build-time document generation. These scenarios include:

* Not reading from certain configuration strings.
* Not registering database-related services.

In order to restrict invoking these code paths by the build-time generation pipeline, they can be conditioned behind a check of the entry assembly:

[language="csharp" source="\~/fundamentals/openapi/samples/9.x/AspireApp1/AspireApp1.Web/Program.cs" highlight="5-8"::: (complete source file; reference: \~/fundamentals/openapi/samples/9.x/AspireApp1/AspireApp1.Web/Program.cs)](../../../_code/aspnetcore/fundamentals/openapi/samples/9.x/AspireApp1/AspireApp1.Web/Program.cs.md)

[`AddServiceDefaults`](https://source.dot.net/#TestingAppHost1.ServiceDefaults/Extensions.cs,0f0d863053754768,references) adds common Aspire services such as service discovery, resilience, health checks, and OpenTelemetry.

## Trimming and Native AOT

OpenAPI in ASP.NET Core supports trimming and native AOT. The following steps create and publish an OpenAPI app with trimming and native AOT.

Create a new ASP.NET Core Web API (Native AOT) project:

```console
dotnet new webapiaot
```

Publish the app:

```console
dotnet publish
```



**Applies to: \> aspnetcore-6.0 <= aspnetcore-8.0**

Minimal APIs provide built-in support for generating information about endpoints in an app via the `Microsoft.AspNetCore.OpenApi` package. Exposing the generated OpenAPI definition via a visual UI requires a third-party package. For information about support for OpenAPI in controller-based APIs, see the [.NET 9 version of this article](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/openapi/includes?view=aspnetcore-9.0\&preserve-view=true).

The following code is generated by the ASP.NET Core Web API template and uses OpenAPI:

[Code reference unavailable in this source snapshot: includes/~/fundamentals/minimal-apis/7.0-samples/WebMinOpenApi/Program.cs?name=snippet\\&highlight=1,5-6,12-13,35-36](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/openapi/aspnetcore-openapi.md)

In the preceding highlighted code:

* `Microsoft.AspNetCore.OpenApi` is explained in the next section.
* [Microsoft.Extensions.DependencyInjection.EndpointMetadataApiExplorerServiceCollectionExtensions.AddEndpointsApiExplorer%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.EndpointMetadataApiExplorerServiceCollectionExtensions.AddEndpointsApiExplorer%252A) : Configures the app to use the API Explorer to discover and describe endpoints with default annotations. `WithOpenApi` overrides matching, default annotations generated by the API Explorer with those produced from the `Microsoft.AspNetCore.OpenApi` package.
* `UseSwagger`adds the [Swagger middleware](https://learn.microsoft.com/search/?terms=tutorials%2Fget-started-with-swashbuckle%23add-and-configure-swagger-middleware).
* <!--  // Protected by if (env.IsDevelopment()) -->`UseSwaggerUI` enables an embedded version of the Swagger UI tool.
* [Microsoft.AspNetCore.Builder.RoutingEndpointConventionBuilderExtensions.WithName%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.RoutingEndpointConventionBuilderExtensions.WithName%252A): The [Microsoft.AspNetCore.Routing.IEndpointNameMetadata](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Routing.IEndpointNameMetadata) on the endpoint is used for link generation and is treated as the operation ID in the given endpoint's OpenAPI specification.
* [`WithOpenApi`](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.builder.openapiendpointconventionbuilderextensions.withopenapi) is explained later in this article.

<a name="openapinuget"></a>

## `Microsoft.AspNetCore.OpenApi` NuGet package

ASP.NET Core provides the [`Microsoft.AspNetCore.OpenApi`](https://www.nuget.org/packages/Microsoft.AspNetCore.OpenApi/) package to interact with OpenAPI specifications for endpoints. The package acts as a link between the OpenAPI models that are defined in the `Microsoft.AspNetCore.OpenApi` package and the endpoints that are defined in Minimal APIs. The package provides an API that examines an endpoint's parameters, responses, and metadata to construct an OpenAPI annotation type that is used to describe an endpoint.

`Microsoft.AspNetCore.OpenApi` is added as a PackageReference to a project file:

[Code reference unavailable in this source snapshot: includes/~/fundamentals/minimal-apis/7.0-samples/WebMinOpenApi/projectFile.xml?highlight=10](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/openapi/aspnetcore-openapi.md)

When using [`Swashbuckle.AspNetCore`](https://www.nuget.org/packages/Swashbuckle.AspNetCore/) with `Microsoft.AspNetCore.OpenApi`, `Swashbuckle.AspNetCore` 6.4.0 or later must be used. [`Microsoft.OpenApi`](https://www.nuget.org/packages/Microsoft.OpenApi/) 1.4.3 or later must be used to leverage copy constructors in `WithOpenApi` invocations.

## Add OpenAPI annotations to endpoints via `WithOpenApi`

Calling [`WithOpenApi`](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.builder.openapiendpointconventionbuilderextensions.withopenapi) on the endpoint adds to the endpoint's metadata. This metadata can be:

* Consumed in third-party packages like [Swashbuckle.AspNetCore](https://www.nuget.org/packages/Swashbuckle.AspNetCore/).
* Displayed in the Swagger user interface or in YAML or JSON generated to define the API.

[Code reference unavailable in this source snapshot: includes/~/fundamentals/minimal-apis/7.0-samples/todo/Program.cs?name=snippet_withopenapi\\&highlight=9](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/openapi/aspnetcore-openapi.md)

### Modify the OpenAPI annotation in `WithOpenApi`

The [`WithOpenApi`](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.builder.openapiendpointconventionbuilderextensions.withopenapi) method accepts a function that can be used to modify the OpenAPI annotation. For example, in the following code, a description is added to the first parameter of the endpoint:

[Code reference unavailable in this source snapshot: includes/~/fundamentals/minimal-apis/7.0-samples/todo/Program.cs?name=snippet_withopenapi2\\&highlight=9-99](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/openapi/aspnetcore-openapi.md)

## Add operation IDs to OpenAPI

Operation IDs are used to uniquely identify a given endpoint in OpenAPI. The [`WithName`](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.builder.routingendpointconventionbuilderextensions.withname) extension method can be used to set the operation ID used for a method.

[Code reference unavailable in this source snapshot: includes/~/fundamentals/minimal-apis/samples/todo/Program.cs?name=snippet_name](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/openapi/aspnetcore-openapi.md)

Alternatively, the `OperationId` property can be set directly on the OpenAPI annotation.

```csharp
app.MapGet("/todos", async (TodoDb db) => await db.Todos.ToListAsync())
    .WithOpenApi(operation => new(operation)
    {
        OperationId = "GetTodos"
    });
```

## Add tags to the OpenAPI description

OpenAPI supports using [tag objects](https://swagger.io/docs/specification/grouping-operations-with-tags/) to categorize operations. These tags are typically used to group operations in the Swagger UI. These tags can be added to an operation by invoking the [WithTags](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.http.openapiroutehandlerbuilderextensions.withtags) extension method on the endpoint with the desired tags.

[Code reference unavailable in this source snapshot: includes/~/fundamentals/minimal-apis/samples/todo/Program.cs?name=snippet_grp](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/openapi/aspnetcore-openapi.md)

Alternatively, the list of `OpenApiTags` can be set on the OpenAPI annotation via the `WithOpenApi` extension method.

```csharp
app.MapGet("/todos", async (TodoDb db) => await db.Todos.ToListAsync())
    .WithOpenApi(operation => new(operation)
    {
        Tags = new List<OpenApiTag> { new() { Name = "Todos" } }
    });
```

## Add endpoint summary or description

The endpoint summary and description can be added by invoking the `WithOpenApi` extension method. In the following code, the summaries are set directly on the OpenAPI annotation.

```csharp
app.MapGet("/todoitems2", async (TodoDb db) => await db.Todos.ToListAsync())
    .WithOpenApi(operation => new(operation)
    {
        Summary = "This is a summary",
        Description = "This is a description"
    });
```

## Exclude OpenAPI description

In the following sample, the `/skipme` endpoint is excluded from generating an OpenAPI description:

[Code reference unavailable in this source snapshot: includes/~/fundamentals/minimal-apis/7.0-samples/WebMinAPIs/Program.cs?name=snippet_swag2\\&highlight=20-21](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/openapi/aspnetcore-openapi.md)

## Mark an API as obsolete

To mark an endpoint as obsolete, set the `Deprecated` property on the OpenAPI annotation.

```csharp
app.MapGet("/todos", async (TodoDb db) => await db.Todos.ToListAsync())
    .WithOpenApi(operation => new(operation)
    {
        Deprecated = true
    });
```

## Describe response types

OpenAPI supports providing a description of the responses returned from an API. Minimal APIs support three strategies for setting the response type of an endpoint:

* Via the [`Produces`](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.http.openapiroutehandlerbuilderextensions.produces) extension method on the endpoint
* Via the [`ProducesResponseType`](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.mvc.producesresponsetypeattribute) attribute on the route handler
* By returning [`TypedResults`](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.http.typedresults) from the route handler

The `Produces` extension method can be used to add `Produces` metadata to an endpoint. When no parameters are provided, the extension method populates metadata for the targeted type under a `200` status code and an `application/json` content type.

```csharp
app
    .MapGet("/todos", async (TodoDb db) => await db.Todos.ToListAsync())
    .Produces<IList<Todo>>();
```

Using [`TypedResults`](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.http.typedresults) in the implementation of an endpoint's route handler automatically includes the response type metadata for the endpoint. For example, the following code automatically annotates the endpoint with a response under the `200` status code with an `application/json` content type.

```csharp
app.MapGet("/todos", async (TodoDb db) =>
{
    var todos = await db.Todos.ToListAsync());
    return TypedResults.Ok(todos);
});
```

### Set responses for `ProblemDetails`

When setting the response type for endpoints that may return a ProblemDetails response, the [Microsoft.AspNetCore.Http.OpenApiRouteHandlerBuilderExtensions.ProducesProblem%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.OpenApiRouteHandlerBuilderExtensions.ProducesProblem%252A) extension method, [Microsoft.AspNetCore.Http.OpenApiRouteHandlerBuilderExtensions.ProducesValidationProblem%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.OpenApiRouteHandlerBuilderExtensions.ProducesValidationProblem%252A), or [`TypedResults.Problem`](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.http.typedresults.problem?) can be used to add the appropriate annotation to the endpoint's metadata. Note that the `ProducesProblem` and `ProducesValidationProblem` extension methods can't be used with [route groups](https://learn.microsoft.com/search/?terms=fundamentals%2Fminimal-apis%2Froute-handlers%23route-groups) in .NET 8 or earlier.

When there are no explicit annotations provided by one of the strategies above, the framework attempts to determine a default response type by examining the signature of the response. This default response is populated under the `200` status code in the OpenAPI definition.

### Multiple response types

If an endpoint can return different response types in different scenarios, you can provide metadata in the following ways:

* Call the [`Produces`](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.http.openapiroutehandlerbuilderextensions.produces) extension method multiple times, as shown in the following example:

  [Code reference unavailable in this source snapshot: includes/~/fundamentals/minimal-apis/samples/todo/Program.cs?name=snippet_getCustom](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/openapi/aspnetcore-openapi.md)

* Use [`Results<TResult1,TResult2,TResultN>`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpResults.Results%25606) in the signature and [`TypedResults`](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.http.typedresults) in the body of the handler, as shown in the following example:

  [Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/fundamentals/minimal-apis/samples/MultipleResultTypes/Program.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/openapi/aspnetcore-openapi.md)

  The `Results<TResult1,TResult2,TResultN>` [union types](https://en.wikipedia.org/wiki/Union_type) declare that a route handler returns multiple `IResult`-implementing concrete types, and any of those types that implement `IEndpointMetadataProvider` will contribute to the endpoint's metadata.

  The union types implement implicit cast operators. These operators enable the compiler to automatically convert the types specified in the generic arguments to an instance of the union type. This capability has the added benefit of providing compile-time checking that a route handler only returns the results that it declares it does. Attempting to return a type that isn't declared as one of the generic arguments to `Results<TResult1,TResult2,TResultN>` results in a compilation error.

## Describe request body and parameters

In addition to describing the types that are returned by an endpoint, OpenAPI also supports annotating the inputs that are consumed by an API. These inputs fall into two categories:

* Parameters that appear in the path, query string, headers, or cookies
* Data transmitted as part of the request body

The framework infers the types for request parameters in the path, query, and header string automatically based on the signature of the route handler.

To define the type of inputs transmitted as the request body, configure the properties by using the [`Accepts`](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.http.openapiroutehandlerbuilderextensions.accepts) extension method to define the object type and content type that are expected by the request handler. In the following example, the endpoint accepts a `Todo` object in the request body with an expected content-type of `application/xml`.

```csharp
app.MapPost("/todos/{id}", (int id, Todo todo) => ...)
  .Accepts<Todo>("application/xml");
```

In addition to the [`Accepts`](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.http.openapiroutehandlerbuilderextensions.accepts) extension method, A parameter type can describe its own annotation by implementing the [`IEndpointParameterMetadataProvider`](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.http.metadata.iendpointparametermetadataprovider) interface. For example, the following `Todo` type adds an annotation that requires a request body with an `application/xml` content-type.

```csharp
public class Todo : IEndpointParameterMetadataProvider
{
    public static void PopulateMetadata(ParameterInfo parameter, EndpointBuilder builder)
    {
        builder.Metadata.Add(new ConsumesAttribute(typeof(Todo), isOptional: false, "application/xml"));
    }
}
```

When no explicit annotation is provided, the framework attempts to determine the default request type if there's a request body parameter in the endpoint handler. The inference uses the following heuristics to produce the annotation:

* Request body parameters that are read from a form via the [`[FromForm]`](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.mvc.fromformattribute) attribute are described with the `multipart/form-data` content-type.
* All other request body parameters are described with the `application/json` content-type.
* The request body is treated as optional if it's nullable or if the [`AllowEmpty`](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.mvc.frombodyattribute.microsoft-aspnetcore-http-metadata-ifrombodymetadata-allowempty) property is set on the [`FromBody`](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.mvc.frombodyattribute) attribute.

## Support API versioning

Minimal APIs support API versioning via the [Asp.Versioning.Http package](https://www.nuget.org/packages/Asp.Versioning.Http). Examples of configuring versioning with Minimal APIs can be found in [the API versioning repo](https://github.com/dotnet/aspnet-api-versioning/tree/3857a332057d970ad11bac0edfdbff8a559a215d/examples/AspNetCore/WebApi).

## ASP.NET Core OpenAPI source code on GitHub

* [`WithOpenApi`](https://github.com/dotnet/aspnetcore/blob/8a4b4deb09c04134f22f8d39aae21d212282004f/src/OpenApi/src/OpenApiRouteHandlerBuilderExtensions.cs)
* [`OpenApiGenerator`](https://github.com/dotnet/aspnetcore/blob/main/src/OpenApi/src/Services/OpenApiGenerator.cs)

## Additional Resources

* [fundamentals/minimal-apis/security](../minimal-apis/security.md)



**Applies to: \= aspnetcore-6.0**

A Minimal API app can describe the [OpenAPI specification](https://swagger.io/specification/) for route handlers using [Swashbuckle](https://www.nuget.org/packages/Swashbuckle.AspNetCore/).

For information about support for OpenAPI in controller-based APIs, see the [.NET 9 version of this article](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/openapi/includes?view=aspnetcore-9.0\&preserve-view=true).

The following code is a typical ASP.NET Core app with OpenAPI support:

[Code reference unavailable in this source snapshot: includes/~/fundamentals/minimal-apis/samples/WebMinAPIs/Program.cs?name=snippet_swag](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/openapi/aspnetcore-openapi.md)

## Exclude OpenAPI description

In the following sample, the `/skipme` endpoint is excluded from generating an OpenAPI description:

[Code reference unavailable in this source snapshot: includes/~/fundamentals/minimal-apis/samples/WebMinAPIs/Program.cs?name=snippet_swag2](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/openapi/aspnetcore-openapi.md)

## Describe response types

The following example uses the built-in result types to customize the response:

[Code reference unavailable in this source snapshot: includes/~/fundamentals/minimal-apis/samples/todo/Program.cs?name=snippet_getCustom](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/openapi/aspnetcore-openapi.md)

## Add operation ids to OpenAPI

[Code reference unavailable in this source snapshot: includes/~/fundamentals/minimal-apis/samples/todo/Program.cs?name=snippet_name](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/openapi/aspnetcore-openapi.md)

## Add tags to the OpenAPI description

The following code uses an [OpenAPI grouping tag](https://swagger.io/docs/specification/grouping-operations-with-tags/):

[Code reference unavailable in this source snapshot: includes/~/fundamentals/minimal-apis/samples/todo/Program.cs?name=snippet_grp](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/openapi/aspnetcore-openapi.md)




**Applies to: \= aspnetcore-9.0**

The [`Microsoft.AspNetCore.OpenApi`](https://www.nuget.org/packages/Microsoft.AspNetCore.OpenApi) package provides built-in support for OpenAPI document generation in ASP.NET Core. The package provides the following features:

* Support for generating OpenAPI documents at run time and accessing them via an endpoint on the app.
* Support for "transformer" APIs that allow modifying the generated document.
* Support for generating multiple OpenAPI documents from a single app.
* Takes advantage of JSON schema support provided by [`System.Text.Json`](https://learn.microsoft.com/dotnet/api/system.text.json).
* Is compatible with native AoT.

## Package installation

Install the `Microsoft.AspNetCore.OpenApi` package:

### [Visual Studio](#tab/visual-studio)

Run the following command from the **Package Manager Console**:

 ```powershell
 Install-Package Microsoft.AspNetCore.OpenApi
```

### [.NET CLI](#tab/net-cli)

Run the following command:

```dotnetcli
dotnet add package Microsoft.AspNetCore.OpenApi
```
---

## Configure OpenAPI document generation

The following code:

* Adds OpenAPI services using the [Microsoft.Extensions.DependencyInjection.OpenApiServiceCollectionExtensions.AddOpenApi%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.OpenApiServiceCollectionExtensions.AddOpenApi%252A) extension method on the app builder's service collection.
* Maps an endpoint for viewing the OpenAPI document in JSON format with the [Microsoft.AspNetCore.Builder.OpenApiEndpointRouteBuilderExtensions.MapOpenApi%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.OpenApiEndpointRouteBuilderExtensions.MapOpenApi%252A) extension method on the app.

[Code reference unavailable in this source snapshot: includes/~/fundamentals/openapi/samples/9.x/WebMinOpenApi/Program.cs?name=snippet_first\\&highlight=3,9](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/openapi/aspnetcore-openapi.md)

Launch the app and navigate to `https://localhost:<port>/openapi/v1.json` to view the generated OpenAPI document.

## Options to Customize OpenAPI document generation

The following sections demonstrate how to customize OpenAPI document generation.

### Customize the OpenAPI document name

Each OpenAPI document in an app has a unique name. The default document name that is registered is `v1`.

```csharp
builder.Services.AddOpenApi(); // Document name is v1
```

The document name can be modified by passing the name as a parameter to the [Microsoft.Extensions.DependencyInjection.OpenApiServiceCollectionExtensions.AddOpenApi%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.OpenApiServiceCollectionExtensions.AddOpenApi%252A) call.

```csharp
builder.Services.AddOpenApi("internal"); // Document name is internal
```

The document name surfaces in several places in the OpenAPI implementation.

When fetching the generated OpenAPI document, the document name is provided as the `documentName` parameter argument in the request. The following requests resolve the `v1` and `internal` documents.

```bash
GET http://localhost:5000/openapi/v1.json
GET http://localhost:5000/openapi/internal.json
```

### Customize the OpenAPI version of a generated document

By default, OpenAPI document generation creates a document that is compliant with [v3.0 of the OpenAPI specification](https://spec.openapis.org/oas/v3.0.0). The following code demonstrates how to modify the default version of the OpenAPI document:

```csharp
builder.Services.AddOpenApi(options =>
{
    options.OpenApiVersion = OpenApiSpecVersion.OpenApi2_0;
});
```

### Customize the OpenAPI endpoint route

By default, the OpenAPI endpoint registered via a call to [Microsoft.AspNetCore.Builder.OpenApiEndpointRouteBuilderExtensions.MapOpenApi%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.OpenApiEndpointRouteBuilderExtensions.MapOpenApi%252A) exposes the document at the `/openapi/{documentName}.json` endpoint. The following code demonstrates how to customize the route at which the OpenAPI document is registered:

```csharp
app.MapOpenApi("/openapi/{documentName}/openapi.json");
```

It's possible, but not recommended, to remove the `documentName` route parameter from the endpoint route. When the `documentName` route parameter is removed from the endpoint route, the framework attempts to resolve the document name from the query parameter. Not providing the `documentName` in either the route or query can result in unexpected behavior.

### Customize the OpenAPI endpoint

Because the OpenAPI document is served via a route handler endpoint, any customization that is available to standard minimal endpoints is available to the OpenAPI endpoint.

#### Limit OpenAPI document access to authorized users

The OpenAPI endpoint  doesn't enable any authorization checks by default. However, authorization checks can be applied to the OpenAPI document. In the following code, access to the OpenAPI document is limited to those with the `tester` role:

[Code reference unavailable in this source snapshot: includes/~/fundamentals/openapi/samples/9.x/WebMinOpenApi/Program.cs?name=snippet_mapopenapiwithauth](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/openapi/aspnetcore-openapi.md)

#### Cache generated OpenAPI document

The OpenAPI document is regenerated every time a request to the OpenAPI endpoint is sent. Regeneration enables transformers to incorporate dynamic app state into their operation. For example, regenerating a request with details of the HTTP context. When applicable, the OpenAPI document can be cached to avoid executing the document generation pipeline on each HTTP request.

[Code reference unavailable in this source snapshot: includes/~/fundamentals/openapi/samples/9.x/WebMinOpenApi/Program.cs?name=snippet_mapopenapiwithcaching](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/openapi/aspnetcore-openapi.md)

## Generate multiple OpenAPI documents

In some scenarios, it's helpful to generate multiple OpenAPI documents with different content from a single ASP.NET Core API app. These scenarios include:

* Generating OpenAPI documentation for different audiences, such as public and internal APIs.
* Generating OpenAPI documentation for different versions of an API.
* Generating OpenAPI documentation for different parts of an app, such as a frontend and backend API.

To generate multiple OpenAPI documents, call the [Microsoft.Extensions.DependencyInjection.OpenApiServiceCollectionExtensions.AddOpenApi%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.OpenApiServiceCollectionExtensions.AddOpenApi%252A) extension method once for each document, specifying a different document name in the first parameter each time.

```csharp
builder.Services.AddOpenApi("v1");
builder.Services.AddOpenApi("v2");
```

Each invocation of [Microsoft.Extensions.DependencyInjection.OpenApiServiceCollectionExtensions.AddOpenApi%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.OpenApiServiceCollectionExtensions.AddOpenApi%252A) can specify its own set of options, so that you can choose to use the same or different customizations for each OpenAPI document.

The framework uses the [Microsoft.AspNetCore.OpenApi.OpenApiOptions.ShouldInclude](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OpenApi.OpenApiOptions.ShouldInclude) delegate method of [Microsoft.AspNetCore.OpenApi.OpenApiOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OpenApi.OpenApiOptions) to determine which endpoints to include in each document.

For each document, the [Microsoft.AspNetCore.OpenApi.OpenApiOptions.ShouldInclude](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OpenApi.OpenApiOptions.ShouldInclude) delegate method is called for each endpoint in the app, passing the [Microsoft.AspNetCore.Mvc.ApiExplorer.ApiDescription](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApiExplorer.ApiDescription) object for the endpoint. The method returns a boolean value indicating whether the endpoint should be included in the document. The [Microsoft.AspNetCore.Mvc.ApiExplorer.ApiDescription](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApiExplorer.ApiDescription) object:

* contains information about the endpoint, such as the HTTP method, route, and response types
* Metadata attached to the endpoint via attributes or extension methods.

The default implementation of this delegate uses the [Microsoft.AspNetCore.Mvc.ApiExplorer.ApiDescription.GroupName](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApiExplorer.ApiDescription.GroupName) field of [Microsoft.AspNetCore.Mvc.ApiExplorer.ApiDescription](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApiExplorer.ApiDescription). The delegate is set on an endpoint using either the [Microsoft.AspNetCore.Builder.RoutingEndpointConventionBuilderExtensions.WithGroupName%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.RoutingEndpointConventionBuilderExtensions.WithGroupName%252A) extension method or the [Microsoft.AspNetCore.Routing.EndpointGroupNameAttribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Routing.EndpointGroupNameAttribute) attribute. `WithGroupName` or the `EndpointGroupName` attribute determines which endpoints to include in the document. Any endpoint that has not been assigned a group name is included all OpenAPI documents.

```csharp
    // Include endpoints without a group name or with a group name that matches the document name
    ShouldInclude = (description) => description.GroupName == null || description.GroupName == DocumentName;    
```

You can customize the [Microsoft.AspNetCore.OpenApi.OpenApiOptions.ShouldInclude](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OpenApi.OpenApiOptions.ShouldInclude) delegate method to include or exclude endpoints based on any criteria you choose.

## Generate OpenAPI documents at build-time

In typical web apps, OpenAPI documents are generated at run-time and served via an HTTP request to the app server.

In some scenarios, it's helpful to generate the OpenAPI document during the app's build step. These scenarios include:

* Generating OpenAPI documentation that is committed into source control.
* Generating OpenAPI documentation that is used for spec-based integration testing.
* Generating OpenAPI documentation that is served statically from the web server.

To add support for generating OpenAPI documents at build time, install the `Microsoft.Extensions.ApiDescription.Server` package:

### [Visual Studio](#tab/visual-studio)

Run the following command from the **Package Manager Console**:

 ```powershell
 Install-Package Microsoft.Extensions.ApiDescription.Server
```

### [.NET CLI](#tab/net-cli)

Run the following command in the directory that contains the project file:

```dotnetcli
dotnet add package Microsoft.Extensions.ApiDescription.Server
```

---

Upon installation, this package:

* Automatically generates the Open API documents associated with the app during build.
* Populates the Open API documents in the app's output directory.

If multiple documents are registered, ***and*** document name is ***not*** `v1`, it's post-fixed with the document name. E.g., `{ProjectName}_{DocumentName}.json`.

# [Visual Studio Code](#tab/visual-studio-code)

```powershell
dotnet build
type obj\{ProjectName}.json
```

# [.NET CLI](#tab/netcore-cli) 

```cli
dotnet build
cat obj/{ProjectName}.json
```

---

### Customizing build-time document generation

#### Modifying the output directory of the generated Open API file

By default, the generated OpenAPI document will be emitted to the app's output directory. To modify the location of the emitted file, set the target path in the `OpenApiDocumentsDirectory` property.

```xml
<PropertyGroup>
  <OpenApiDocumentsDirectory>.</OpenApiDocumentsDirectory>
</PropertyGroup>
```

The value of `OpenApiDocumentsDirectory` is resolved relative to the project file. Using the `.` value above will emit the OpenAPI document in the same directory as the project file.

#### Modifying the output file name

By default, the generated OpenAPI document will have the same name as the app's project file. To modify the name of the emitted file, set the `--file-name` argument in the `OpenApiGenerateDocumentsOptions` property.

```xml
<PropertyGroup>
  <OpenApiGenerateDocumentsOptions>--file-name my-open-api</OpenApiGenerateDocumentsOptions>
</PropertyGroup>
```

#### Selecting the OpenAPI document to generate

Some apps may be configured to emit multiple OpenAPI documents. Multiple OpenAPI documents may be generated for different versions of an API or to distinguish between public and internal APIs. By default, the build-time document generator emits files for all documents that are configured in an app. To only emit for a single document name, set the `--document-name` argument in the `OpenApiGenerateDocumentsOptions` property.

```xml
<PropertyGroup>
  <OpenApiGenerateDocumentsOptions>--document-name v2</OpenApiGenerateDocumentsOptions>
</PropertyGroup>
```

### Customizing run-time behavior during build-time document generation

Build-time OpenAPI document generation functions by launching the apps entrypoint with a mock server implementation. A mock server is required to produce accurate OpenAPI documents because all information in the OpenAPI document can't be statically analyzed. Because the apps entrypoint is invoked, any logic in the apps startup is invoked. This includes code that injects services into the [DI container](../dependency-injection.md) or reads from configuration. In some scenarios, it's necessary to restrict the code paths that will run when the apps entry point is being invoked from build-time document generation. These scenarios include:

* Not reading from certain configuration strings.
* Not registering database-related services.

In order to restrict these code paths from being invoked by the build-time generation pipeline, they can be conditioned behind a check of the entry assembly:

[language="csharp" source="\~/fundamentals/openapi/samples/9.x/AspireApp1/AspireApp1.Web/Program.cs" highlight="5-8"::: (complete source file; reference: \~/fundamentals/openapi/samples/9.x/AspireApp1/AspireApp1.Web/Program.cs)](../../../_code/aspnetcore/fundamentals/openapi/samples/9.x/AspireApp1/AspireApp1.Web/Program.cs.md)

[AddServiceDefaults](https://source.dot.net/#TestingAppHost1.ServiceDefaults/Extensions.cs,0f0d863053754768,references) adds common Aspire services such as service discovery, resilience, health checks, and OpenTelemetry.

## Trimming and Native AOT

OpenAPI in ASP.NET Core supports trimming and native AOT. The following steps create and publish an OpenAPI app with trimming and native AOT:

Create a new ASP.NET Core Web API (Native AOT) project.

```console
dotnet new webapiaot
```

Add the Microsoft.AspNetCore.OpenAPI package.

```console
dotnet add package Microsoft.AspNetCore.OpenApi
```

Update `Program.cs` to enable generating OpenAPI documents.

```diff
+ builder.Services.AddOpenApi();

var app = builder.Build();

+ app.MapOpenApi();
```

Publish the app.

```console
dotnet publish
```
