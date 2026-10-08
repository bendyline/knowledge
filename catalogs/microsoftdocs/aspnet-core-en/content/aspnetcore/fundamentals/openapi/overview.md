---
title: Overview of OpenAPI support in ASP.NET Core API apps
ai-usage: ai-assisted
author: wadepickett
description: Learn how to integrate OpenAPI in ASP.NET Core API apps. Discover features, tools, and packages for generating and customizing OpenAPI documents.
monikerRange: '>= aspnetcore-6.0'
ms.author: wpickett
ms.reviewer: wpickett
ms.date: 08/28/2026
uid: fundamentals/openapi/overview
---
# OpenAPI support in ASP.NET Core API apps

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


**Applies to: \>= aspnetcore-10.0**

ASP.NET Core supports the generation of OpenAPI documents in controller-based and Minimal API apps.
The [OpenAPI specification](https://spec.openapis.org/oas/latest.html) is a programming language-agnostic standard for documenting HTTP APIs. ASP.NET Core apps support this standard through a combination of built-in APIs and open-source libraries. There are three key aspects to OpenAPI integration in an application:

* Generating information about the endpoints in the app.
* Gathering the information into a format that matches the OpenAPI schema.
* Exposing the generated OpenAPI document through a visual UI or a serialized file.

ASP.NET Core provides first-party support for generating information about endpoints in an app through the `Microsoft.AspNetCore.OpenApi` package.

The ASP.NET Core Web API template generates the following code that uses OpenAPI:

[Code example (complete source file; reference: \~/fundamentals/openapi/samples/10.x/WebMinOpenApi/Program.cs?name=snippet_default\&highlight=5,9-12)](../../../_code/aspnetcore/fundamentals/openapi/samples/10.x/WebMinOpenApi/Program.cs.md)

In the preceding highlighted code:

* `AddOpenApi` registers services required for OpenAPI document generation into the application's DI container.
* `MapOpenApi` adds an endpoint into the application for viewing the OpenAPI document serialized into JSON. The OpenAPI endpoint is restricted to the `Development` environment to minimize the risk of exposing sensitive information and reduce the vulnerabilities in production.

<a name="openapinuget"></a>

## `Microsoft.AspNetCore.OpenApi` NuGet package

The [`Microsoft.AspNetCore.OpenApi`](https://www.nuget.org/packages/Microsoft.AspNetCore.OpenApi/) package provides the following features:

* Support for generating OpenAPI documents at runtime and accessing them through an endpoint on the application.
* Support for "transformer" APIs that modify the generated document.

To use the `Microsoft.AspNetCore.OpenApi` package, add it as a PackageReference to a project file:

[Code example (complete source file; reference: \~/fundamentals/openapi/samples/10.x/WebMinOpenApi/projectFile.xml?highlight=15)](../../../_code/aspnetcore/fundamentals/openapi/samples/10.x/WebMinOpenApi/projectFile.xml.md)

To learn more about the `Microsoft.AspNetCore.OpenApi` package, see [fundamentals/openapi/aspnetcore-openapi](aspnetcore-openapi.md).

## `Microsoft.Extensions.ApiDescription.Server` NuGet package

The [`Microsoft.Extensions.ApiDescription.Server`](https://www.nuget.org/packages/Microsoft.Extensions.ApiDescription.Server/) package supports generating OpenAPI documents at build time and serializing them.

To use `Microsoft.Extensions.ApiDescription.Server`, add it as a PackageReference to a project file.
Enable document generation at build time by setting the `OpenApiGenerateDocumentsOnBuild` property to `true`.
By default, the generated OpenAPI document is saved to the `obj` directory, but you can customize
the output directory by setting the `OpenApiDocumentsDirectory` property.

[Code example (complete source file; reference: \~/fundamentals/openapi/samples/10.x/WebMinOpenApi/projectFile.xml?highlight=9-12,16-19)](../../../_code/aspnetcore/fundamentals/openapi/samples/10.x/WebMinOpenApi/projectFile.xml.md)

<!-- Include makes it trivial to move this anywhere in the doc OR add to other docs-->
## API v. API operation v. API endpoint

The following sections explain the differences between an API, an API endpoint, and an API operation in the context of ASP.NET Core and OpenAPI documentation.

### API (Application Programming Interface)

An API is a set of rules and protocols for building and interacting with software applications. It defines how different software components should communicate. In general web development, "API" typically refers to a web service that exposes functionality over HTTP.

In ASP.NET Core, an API is usually built using controllers or Minimal APIs, which handle incoming HTTP requests and return responses.

ASP.NET Core's internal naming conventions sometimes use "API" differently. For instance, in [API Explorer](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.mvc.apiexplorer), an "ApiDescription" actually represents an [API Operation](#api-operation) rather than the full API service. This distinction reflects internal naming conventions and sometimes differ from the broader definition used here.

See [Introduction to the ApiExplorer in ASP.NET Core](https://andrewlock.net/introduction-to-the-apiexplorer-in-asp-net-core/) for more information on API Explorer.

### API Operation

An API operation represents a specific action or capability that an API provides. In ASP.NET Core, this corresponds to:

* Controller action methods in MVC-style APIs
* Route handlers in Minimal APIs

Each operation is defined by its HTTP method (`GET`, `POST`, `PUT`, etc.), path, parameters, and responses.

### API Endpoint

An API endpoint is a specific URL:

* That represents a specific resource or functionality exposed by the API.
* Provides the exact address that a client needs to send an HTTP request to in order to interact with a particular API operation.

An endpoint is a combination of the API's base URL and a specific path to the desired resource, along with the supported HTTP methods:

* For controller-based APIs, endpoints combine the route template with controller and action.
* For Minimal APIs, endpoints are explicitly defined with `app.MapGet()`, `app.MapPost()`, etc.

For example, the `api/products/{id}` endpoint that supports the following operations:

* `GET /api/products/{id}`
* `PUT /api/products/{id}`
* `PATCH /api/products/{id}`
* `Delete /api/products/{id}`
* `HEAD /api/products/{id}`

Endpoints often include query parameters, for example, `GET /api/products?category=electronics&sort=price`

### OpenAPI Documentation

In the context of OpenAPI, the documentation describes the API as a whole, including all its endpoints and operations. OpenAPI provides a structured way to document APIs, making it easier for developers to understand how to interact with them.

API Operations are the primary focus of OpenAPI documentation. The [OpenAPI specification](https://spec.openapis.org/oas/latest.html) organizes documentation by operations, which are grouped by paths (endpoints). Each operation is described with details such as parameters, request bodies, responses, and more. This structured format allows tools to generate client libraries, server stubs, and interactive documentation automatically.

In an OpenAPI document:

* The entire document describes the API as a whole
* Each path item (like `/api/products/{id}`) represents an endpoint
* Under each path, the HTTP methods (`GET`, `POST`, `PUT`, etc.) define the operations
* Each operation contains details about parameters, request body, responses, etc.

Example in OpenAPI JSON format:

```JSON
json{
  "paths": {
    "/api/products/{id}": {  // This is the endpoint
      "get": {  // This is the operation
        "summary": "Get a product by ID",
        "parameters": [...],
        "responses": {...}
      },
      "put": {  // Another operation on the same endpoint
        "summary": "Update a product",
        "parameters": [...],
        "responses": {...}
      }
    }
  }
}
```

## API, API operation, and API endpoint comparison

The following table summarizes the differences between an API, an API operation, and an API endpoint.

| Concept | API Operation | API Endpoint |
| --- | --- | --- |
| **Definition** | A logical description of an API action: method + path + behavior | The actual configured HTTP route that listens for requests |
| **Level** | Conceptual, what action can happen | Concrete, what URL and method are matched |
| **Tied to** | OpenAPI API design/specification | ASP.NET Core routing at runtime |
| **Describes** | What the API does for example, "create product" | Where and how to call it, for example, `POST https://localhost:7099/api/products`,  `POST https://contoso.com/api/products` |
| **In ASP.NET Core** | Controller actions or Minimal API methods, before routing resolves | Endpoint objects resolved at runtime |


## ASP.NET Core OpenAPI source code on GitHub

* [AddOpenApi](https://github.com/dotnet/aspnetcore/blob/main/src/OpenApi/src/Extensions/OpenApiServiceCollectionExtensions.cs)
* [OpenApiDocumentService](https://github.com/dotnet/aspnetcore/blob/main/src/OpenApi/src/Services/OpenApiDocumentService.cs)
* [OpenApiOptions](https://github.com/dotnet/aspnetcore/blob/main/src/OpenApi/src/Services/OpenApiOptions.cs)

## Additional Resources

* [fundamentals/minimal-apis/security](../minimal-apis/security.md)



**Applies to: \>= aspnetcore-6.0 <= aspnetcore-8.0**

The [OpenAPI specification](https://spec.openapis.org/oas/latest.html) is a programming language-agnostic standard for documenting HTTP APIs. This standard is supported in Minimal APIs through a combination of built-in APIs and open-source libraries. There are three key aspects to OpenAPI integration in an application:

* Generating information about the endpoints in the app.
* Gathering the information into a format that matches the OpenAPI schema.
* Exposing the generated OpenAPI schema via a visual UI or a serialized file.

Minimal APIs provide built-in support for generating information about endpoints in an app via the `Microsoft.AspNetCore.OpenApi` package. Exposing the generated OpenAPI definition via a visual UI requires a third-party package.

For information about support for OpenAPI in controller-based APIs, see the [.NET 9 version of this article](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/openapi/includes?view=aspnetcore-9.0\&preserve-view=true). 



**Applies to: aspnetcore-9.0**

ASP.NET Core supports the generation of OpenAPI documents in controller-based and Minimal API apps.
The [OpenAPI specification](https://spec.openapis.org/oas/latest.html) is a programming language-agnostic standard for documenting HTTP APIs. This standard is supported in ASP.NET Core apps through a combination of built-in APIs and open-source libraries. There are three key aspects to OpenAPI integration in an application:

* Generating information about the endpoints in the app.
* Gathering the information into a format that matches the OpenAPI schema.
* Exposing the generated OpenAPI document via a visual UI or a serialized file.

ASP.NET Core provides first-party support for generating information about endpoints in an app through the `Microsoft.AspNetCore.OpenApi` package.


The following code is generated by the ASP.NET Core Web API template and uses OpenAPI:

[Code reference unavailable in this source snapshot: includes/~/fundamentals/openapi/samples/9.x/WebMinOpenApi/Program.cs?name=snippet_default\\&highlight=5,9-12](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/openapi/overview.md)

In the preceding highlighted code:

* `AddOpenApi` registers services required for OpenAPI document generation into the application's DI container.
* `MapOpenApi` adds an endpoint into the application for viewing the OpenAPI document serialized into JSON. The OpenAPI endpoint is restricted to the `Development` environment to minimize the risk of exposing sensitive information and reduce the vulnerabilities in production.

<a name="openapinuget"></a>

## `Microsoft.AspNetCore.OpenApi` NuGet package

The [`Microsoft.AspNetCore.OpenApi`](https://www.nuget.org/packages/Microsoft.AspNetCore.OpenApi/) package provides the following features:

* Support for generating OpenAPI documents at run time and accessing them via an endpoint on the application.
* Support for "transformer" APIs that modify the generated document.

To use the `Microsoft.AspNetCore.OpenApi` package, add it as a PackageReference to a project file:

[Code reference unavailable in this source snapshot: includes/~/fundamentals/openapi/samples/9.x/WebMinOpenApi/projectFile.xml?highlight=15](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/openapi/overview.md)

To learn more about the `Microsoft.AspNetCore.OpenApi` package, see [fundamentals/openapi/aspnetcore-openapi](aspnetcore-openapi.md).

## `Microsoft.Extensions.ApiDescription.Server` NuGet package

The [`Microsoft.Extensions.ApiDescription.Server`](https://www.nuget.org/packages/Microsoft.Extensions.ApiDescription.Server/) package provides support for generating OpenAPI documents at build time and serializing them.

To use `Microsoft.Extensions.ApiDescription.Server`, add it as a PackageReference to a project file.
Document generation at build time is enabled by setting the `OpenApiGenerateDocumentsOnBuild` property to `true`.
By default, the generated OpenAPI document is saved to the `obj` directory, but you can customize
the output directory by setting the `OpenApiDocumentsDirectory` property.

[Code reference unavailable in this source snapshot: includes/~/fundamentals/openapi/samples/9.x/WebMinOpenApi/projectFile.xml?highlight=9-12,16-19](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/openapi/overview.md)

<!-- Include makes it trivial to move this anywhere in the doc OR add to other docs-->
## API v. API operation v. API endpoint

The following sections explain the differences between an API, an API endpoint, and an API operation in the context of ASP.NET Core and OpenAPI documentation.

### API (Application Programming Interface)

An API is a set of rules and protocols for building and interacting with software applications. It defines how different software components should communicate. In general web development, "API" typically refers to a web service that exposes functionality over HTTP.

In ASP.NET Core, an API is usually built using controllers or Minimal APIs, which handle incoming HTTP requests and return responses.

ASP.NET Core's internal naming conventions sometimes use "API" differently. For instance, in [API Explorer](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.mvc.apiexplorer), an "ApiDescription" actually represents an [API Operation](#api-operation) rather than the full API service. This distinction reflects internal naming conventions and sometimes differ from the broader definition used here.

See [Introduction to the ApiExplorer in ASP.NET Core](https://andrewlock.net/introduction-to-the-apiexplorer-in-asp-net-core/) for more information on API Explorer.

### API Operation

An API operation represents a specific action or capability that an API provides. In ASP.NET Core, this corresponds to:

* Controller action methods in MVC-style APIs
* Route handlers in Minimal APIs

Each operation is defined by its HTTP method (`GET`, `POST`, `PUT`, etc.), path, parameters, and responses.

### API Endpoint

An API endpoint is a specific URL:

* That represents a specific resource or functionality exposed by the API.
* Provides the exact address that a client needs to send an HTTP request to in order to interact with a particular API operation.

An endpoint is a combination of the API's base URL and a specific path to the desired resource, along with the supported HTTP methods:

* For controller-based APIs, endpoints combine the route template with controller and action.
* For Minimal APIs, endpoints are explicitly defined with `app.MapGet()`, `app.MapPost()`, etc.

For example, the `api/products/{id}` endpoint that supports the following operations:

* `GET /api/products/{id}`
* `PUT /api/products/{id}`
* `PATCH /api/products/{id}`
* `Delete /api/products/{id}`
* `HEAD /api/products/{id}`

Endpoints often include query parameters, for example, `GET /api/products?category=electronics&sort=price`

### OpenAPI Documentation

In the context of OpenAPI, the documentation describes the API as a whole, including all its endpoints and operations. OpenAPI provides a structured way to document APIs, making it easier for developers to understand how to interact with them.

API Operations are the primary focus of OpenAPI documentation. The [OpenAPI specification](https://spec.openapis.org/oas/latest.html) organizes documentation by operations, which are grouped by paths (endpoints). Each operation is described with details such as parameters, request bodies, responses, and more. This structured format allows tools to generate client libraries, server stubs, and interactive documentation automatically.

In an OpenAPI document:

* The entire document describes the API as a whole
* Each path item (like `/api/products/{id}`) represents an endpoint
* Under each path, the HTTP methods (`GET`, `POST`, `PUT`, etc.) define the operations
* Each operation contains details about parameters, request body, responses, etc.

Example in OpenAPI JSON format:

```JSON
json{
  "paths": {
    "/api/products/{id}": {  // This is the endpoint
      "get": {  // This is the operation
        "summary": "Get a product by ID",
        "parameters": [...],
        "responses": {...}
      },
      "put": {  // Another operation on the same endpoint
        "summary": "Update a product",
        "parameters": [...],
        "responses": {...}
      }
    }
  }
}
```

## API, API operation, and API endpoint comparison

The following table summarizes the differences between an API, an API operation, and an API endpoint.

| Concept | API Operation | API Endpoint |
| --- | --- | --- |
| **Definition** | A logical description of an API action: method + path + behavior | The actual configured HTTP route that listens for requests |
| **Level** | Conceptual, what action can happen | Concrete, what URL and method are matched |
| **Tied to** | OpenAPI API design/specification | ASP.NET Core routing at runtime |
| **Describes** | What the API does for example, "create product" | Where and how to call it, for example, `POST https://localhost:7099/api/products`,  `POST https://contoso.com/api/products` |
| **In ASP.NET Core** | Controller actions or Minimal API methods, before routing resolves | Endpoint objects resolved at runtime |


## ASP.NET Core OpenAPI source code on GitHub

* [AddOpenApi](https://github.com/dotnet/aspnetcore/blob/main/src/OpenApi/src/Extensions/OpenApiServiceCollectionExtensions.cs)
* [OpenApiDocumentService](https://github.com/dotnet/aspnetcore/blob/main/src/OpenApi/src/Services/OpenApiDocumentService.cs)
* [OpenApiOptions](https://github.com/dotnet/aspnetcore/blob/main/src/OpenApi/src/Services/OpenApiOptions.cs)

## Additional Resources

* [fundamentals/minimal-apis/security](../minimal-apis/security.md)
