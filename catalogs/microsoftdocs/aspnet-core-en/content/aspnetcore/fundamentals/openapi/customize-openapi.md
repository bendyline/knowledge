---
title: Customize OpenAPI documents
ai-usage: ai-assisted
author: wadepickett
description: Learn how to customize OpenAPI documents in an ASP.NET Core app
ms.author: wpickett
monikerRange: '>= aspnetcore-9.0'
ms.date: 08/19/2026
uid: fundamentals/openapi/customize-openapi
---
# Customize OpenAPI documents

**Applies to: \>= aspnetcore-10.0**

<a name="transformers"></a>

## OpenAPI document transformers

Transformers provide an API for modifying the OpenAPI document with user-defined customizations. Transformers are useful for scenarios like:

* Adding parameters to all operations in a document.
* Modifying descriptions for parameters or operations.
* Adding top-level information to the OpenAPI document.

Transformers fall into three categories:

* Document transformers have access to the entire OpenAPI document. These can be used to make global modifications to the document.
* Operation transformers apply to each individual operation. Each individual operation is a combination of path and HTTP method. These can be used to modify parameters or responses on endpoints.
* Schema transformers apply to each schema in the document. These can be used to modify the schema of request or response bodies, or any nested schemas.

Transformers can be registered onto the document by calling the [Microsoft.AspNetCore.OpenApi.OpenApiOptions.AddDocumentTransformer%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OpenApi.OpenApiOptions.AddDocumentTransformer%252A) method on the [Microsoft.AspNetCore.OpenApi.OpenApiOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OpenApi.OpenApiOptions) object. The following snippet shows different ways to register transformers onto the document:

* Register a document transformer using a delegate.
* Register a document transformer using an instance of [Microsoft.AspNetCore.OpenApi.IOpenApiDocumentTransformer](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OpenApi.IOpenApiDocumentTransformer).
* Register a document transformer using a DI-activated [Microsoft.AspNetCore.OpenApi.IOpenApiDocumentTransformer](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OpenApi.IOpenApiDocumentTransformer).
* Register an operation transformer using a delegate.
* Register an operation transformer using an instance of [Microsoft.AspNetCore.OpenApi.IOpenApiOperationTransformer](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OpenApi.IOpenApiOperationTransformer).
* Register an operation transformer using a DI-activated [Microsoft.AspNetCore.OpenApi.IOpenApiOperationTransformer](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OpenApi.IOpenApiOperationTransformer).
* Register a schema transformer using a delegate.
* Register a schema transformer using an instance of [Microsoft.AspNetCore.OpenApi.IOpenApiSchemaTransformer](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OpenApi.IOpenApiSchemaTransformer).
* Register a schema transformer using a DI-activated [Microsoft.AspNetCore.OpenApi.IOpenApiSchemaTransformer](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OpenApi.IOpenApiSchemaTransformer).

[Code example (complete source file; reference: \~/fundamentals/openapi/samples/10.x/WebMinOpenApi/Program.cs?name=snippet_transUse\&highlight=8-19)](../../../_code/aspnetcore/fundamentals/openapi/samples/10.x/WebMinOpenApi/Program.cs.md)

### Execution order for transformers

Transformers execute in the following order:  

* Schema transformers execute when a schema is registered to the document. They execute in the order they're added.
All schemas are added to the document before any operation processing occurs, so schema transformers execute before operation transformers.
* Operation transformers execute when an operation is added to the document. They execute in the order they're added.
All operations are added to the document before any document transformers execute.
* Document transformers execute when the document is generated. This is the final pass over the document, and all operations and schemas are added by this point.
* When an app is configured to generate multiple OpenAPI documents, transformers execute for each document independently.

For example, in the following snippet:
* `SchemaTransformer2` is executed and has access to the modifications made by `SchemaTransformer1`.
* Both `OperationTransformer1` and `OperationTransformer2` have access to the modifications made by both schema transformers for the types involved in the operation they're called to process.
* `OperationTransformer2` is executed after `OperationTransformer1`, so it has access to the modifications made by `OperationTransformer1`.
* Both `DocumentTransformer1` and `DocumentTransformer2` are executed after all operations and schemas have been added to the document, so they have access to all modifications made by the operation and schema transformers.
* `DocumentTransformer2` is executed after `DocumentTransformer1`, so it has access to the modifications made by `DocumentTransformer1`.

[Code example (complete source file; reference: \~/fundamentals/openapi/samples/10.x/WebMinOpenApi/Program.cs?name=snippet_transInOut\&highlight=6-14)](../../../_code/aspnetcore/fundamentals/openapi/samples/10.x/WebMinOpenApi/Program.cs.md)

## Use document transformers

Document transformers have access to a context object that includes:

* The name of the document being modified.
* The [Microsoft.AspNetCore.Mvc.ApiExplorer.ApiDescriptionGroupCollectionProvider.ApiDescriptionGroups](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApiExplorer.ApiDescriptionGroupCollectionProvider.ApiDescriptionGroups) associated with that document.
* The [System.IServiceProvider](https://learn.microsoft.com/search/?terms=System.IServiceProvider) used in document generation.

Document transformers can also mutate the OpenAPI document that is generated. The following example demonstrates a document transformer that adds some information about the API to the OpenAPI document.

[Code example (complete source file; reference: \~/fundamentals/openapi/samples/10.x/WebMinOpenApi/Program.cs?name=snippet_documenttransformer1)](../../../_code/aspnetcore/fundamentals/openapi/samples/10.x/WebMinOpenApi/Program.cs.md)

Service-activated document transformers can utilize instances from DI to modify the app. The following sample demonstrates a document transformer that uses the [Microsoft.AspNetCore.Authentication.IAuthenticationSchemeProvider](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.IAuthenticationSchemeProvider) service from the authentication layer. It checks if any JWT bearer-related schemes are registered in the app and adds them to the OpenAPI document's top level:

[Code example (complete source file; reference: \~/fundamentals/openapi/samples/10.x/WebMinOpenApi/Program.cs?name=snippet_documenttransformer2)](../../../_code/aspnetcore/fundamentals/openapi/samples/10.x/WebMinOpenApi/Program.cs.md)

Document transformers are unique to the document instance they're associated with. In the following example, a transformer:

* Registers authentication-related requirements to the `internal` document.
* Leaves the `public` document unmodified.

[Code example (complete source file; reference: \~/fundamentals/openapi/samples/10.x/WebMinOpenApi/Program.cs?name=snippet_multidoc_operationtransformer1)](../../../_code/aspnetcore/fundamentals/openapi/samples/10.x/WebMinOpenApi/Program.cs.md)

## Use operation transformers

Operations are unique combinations of HTTP paths and methods in an OpenAPI document. Operation transformers are helpful when a modification:

* Should be made to each endpoint in an app, or
* Conditionally applied to certain routes.

Operation transformers have access to a context object which contains:

* The name of the document the operation belongs to.
* The [Microsoft.AspNetCore.Mvc.ApiExplorer.ApiDescription](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApiExplorer.ApiDescription) associated with the operation.
* The [System.IServiceProvider](https://learn.microsoft.com/search/?terms=System.IServiceProvider) used in document generation.

For example, the following operation transformer adds `500` as a response status code supported by all operations in the document.

[Code example (complete source file; reference: \~/fundamentals/openapi/samples/10.x/WebMinOpenApi/Program.cs?name=snippet_operationtransformer1)](../../../_code/aspnetcore/fundamentals/openapi/samples/10.x/WebMinOpenApi/Program.cs.md)
 
Operation transformers can also be added to specific endpoint with the [Microsoft.AspNetCore.Builder.OpenApiEndpointConventionBuilderExtensions.AddOpenApiOperationTransformer%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.OpenApiEndpointConventionBuilderExtensions.AddOpenApiOperationTransformer%252A) API, instead of all endpoints in a document. This can be useful to change specific OpenAPI data for a specific endpoint, like adding a security scheme, response description or other OpenAPI operation properties. The following example demonstrates adding an operation transformer to a deprecated endpoint specifically, which marks the endpoint as deprecated in the OpenAPI document.

[Code example (complete source file; reference: \~/fundamentals/openapi/samples/10.x/WebMinOpenApi/Program.cs?name=snippet_operationtransformer2)](../../../_code/aspnetcore/fundamentals/openapi/samples/10.x/WebMinOpenApi/Program.cs.md)

### Conditionally applying security requirements

In some scenarios, developers may want to apply security requirements to all endpoints except those explicitly marked with the `AllowAnonymous` attribute.

Use an operation transformer, which has access to endpoint metadata through the associated [Microsoft.AspNetCore.Mvc.ApiExplorer.ApiDescription](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApiExplorer.ApiDescription).

The following example demonstrates how to skip adding a security requirement for endpoints that have the `AllowAnonymousAttribute` applied:

```csharp
internal sealed class AuthOperationTransformer : IOpenApiOperationTransformer
{
    public Task TransformAsync(
        OpenApiOperation operation,
        OpenApiOperationTransformerContext context,
        CancellationToken cancellationToken)
    {
        var hasAllowAnonymous = context.Description.ActionDescriptor.EndpointMetadata
            .OfType<AllowAnonymousAttribute>()
            .Any();

        if (hasAllowAnonymous)
        {
            return Task.CompletedTask;
        }

        operation.Security ??= new List<OpenApiSecurityRequirement>();

        operation.Security.Add(new OpenApiSecurityRequirement
        {
            [new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Id = "Bearer",
                    Type = ReferenceType.SecurityScheme
                }
            }] = Array.Empty<string>()
        });

        return Task.CompletedTask;
    }
}
```

Use this approach instead of document transformers when conditional logic based on endpoint metadata is required. This transformer adds security *requirements* per operation and assumes the security *scheme* is already registered at the document level. For an example of registering the Bearer security scheme, see the `BearerSecuritySchemeTransformer` in the [Use document transformers](#use-document-transformers) section.

## Use schema transformers

Schemas are the data models that are used in request and response bodies in an OpenAPI document. Schema transformers are useful when a modification:

* Should be made to each schema in the document, or
* Conditionally applied to certain schemas.

Schema transformers have access to a context object which contains:

* The name of the document the schema belongs to.
* The JSON type information associated with the target schema.
* The [System.IServiceProvider](https://learn.microsoft.com/search/?terms=System.IServiceProvider) used in document generation.

For example, the following schema transformer sets the `format` of decimal types to `decimal` instead of `double`:

[Code example (complete source file; reference: \~/fundamentals/openapi/samples/10.x/WebMinOpenApi/Program.cs?name=snippet_schematransformer1)](../../../_code/aspnetcore/fundamentals/openapi/samples/10.x/WebMinOpenApi/Program.cs.md)

## Support for generating OpenApiSchemas in transformers
<!-- https://github.com/dotnet/aspnetcore/pull/61050 -->

Developers can generate a schema for a C# type using the same logic as ASP.NET Core OpenAPI document generation and add it to the OpenAPI document. The schema can then be referenced from elsewhere in the OpenAPI document. This capability is available starting with .NET 10.

The context passed to document, operation, and schema transformers includes a new `GetOrCreateSchemaAsync` method that can be used to generate a schema for a type.
This method also has an optional `ApiParameterDescription` parameter to specify additional metadata for the generated schema.

To support adding the schema to the OpenAPI document, a `Document` property has been added to the Operation and Schema transformer contexts. This allows any transformer to add a schema to the OpenAPI document using the document's `AddComponent` method.

### Example

To use this feature in a document, operation, or schema transformer, create the schema using the `GetOrCreateSchemaAsync` method provided in the context and add it to the OpenAPI document using the document's `AddComponent` method.

[language="csharp" source="\~/fundamentals/openapi/samples/10.x/WebAppOpenAPI10/Program.cs" id="snippet_Generate_OpenApiSchemas_for_type" highlight="6-7"::: (complete source file; reference: \~/fundamentals/openapi/samples/10.x/WebAppOpenAPI10/Program.cs)](../../../_code/aspnetcore/fundamentals/openapi/samples/10.x/WebAppOpenAPI10/Program.cs.md)

## Customize schema reuse

After all transformers have been applied, the framework makes a pass over the document to transfer certain schemas
to the `components.schemas` section, replacing them with `$ref` references to the transferred schema.
This reduces the size of the document and makes it easier to read.

The details of this processing are complicated and might change in future versions of .NET, but in general:

* Schemas for class/record/struct types are replaced with a `$ref` to a schema in `components.schemas`
  if they appear more than once in the document.
* Schemas for primitive types and standard collections are left inline.
* Schemas for enum types are always replaced with a `$ref` to a schema in components.schemas.

Typically the name of the schema in `components.schemas` is the name of the class/record/struct type,
but in some circumstances a different name must be used.

ASP.NET Core lets you customize which schemas are replaced with a `$ref` to a schema in `components.schemas`
using the [Microsoft.AspNetCore.OpenApi.OpenApiOptions.CreateSchemaReferenceId](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OpenApi.OpenApiOptions.CreateSchemaReferenceId) property of [Microsoft.AspNetCore.OpenApi.OpenApiOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OpenApi.OpenApiOptions).
This property is a delegate that takes a [System.Text.Json.Serialization.Metadata.JsonTypeInfo](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.Metadata.JsonTypeInfo) object and returns the name of the schema
in `components.schemas` that should be used for that type.
The framework provides a default implementation of this delegate, [Microsoft.AspNetCore.OpenApi.OpenApiOptions.CreateDefaultSchemaReferenceId%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OpenApi.OpenApiOptions.CreateDefaultSchemaReferenceId%252A)
that uses the name of the type, but you can replace it with your own implementation.

As a simple example of this customization, you might choose to always inline enum schemas.
This is done by setting [Microsoft.AspNetCore.OpenApi.OpenApiOptions.CreateSchemaReferenceId](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OpenApi.OpenApiOptions.CreateSchemaReferenceId) to a delegate
that returns null for enum types, and otherwise returns the value from the default implementation.
The following code demonstrates this:

```csharp
builder.Services.AddOpenApi(options =>
{
    // Always inline enum schemas
    options.CreateSchemaReferenceId = (type) =>
        type.Type.IsEnum ? null : OpenApiOptions.CreateDefaultSchemaReferenceId(type);
});
```

> **Note:**
> Starting with .NET 10, relative JSON schema references (`$ref`) within the root schema document are resolved correctly during OpenAPI document generation.

## Additional resources

* [fundamentals/openapi/using-openapi-documents](using-openapi-documents.md)
* [OpenAPI specification](https://spec.openapis.org/oas/v3.0.3)



**Applies to: \= aspnetcore-9.0**

<a name="transformers"></a>

## OpenAPI document transformers

Transformers provide an API for modifying the OpenAPI document with user-defined customizations. Transformers are useful for scenarios like:

* Adding parameters to all operations in a document.
* Modifying descriptions for parameters or operations.
* Adding top-level information to the OpenAPI document.

Transformers fall into three categories:

* Document transformers have access to the entire OpenAPI document. These can be used to make global modifications to the document.
* Operation transformers apply to each individual operation. Each individual operation is a combination of path and HTTP method. These can be used to modify parameters or responses on endpoints.
* Schema transformers apply to each schema in the document. These can be used to modify the schema of request or response bodies, or any nested schemas.

Transformers can be registered onto the document by calling the [Microsoft.AspNetCore.OpenApi.OpenApiOptions.AddDocumentTransformer%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OpenApi.OpenApiOptions.AddDocumentTransformer%252A) method on the [Microsoft.AspNetCore.OpenApi.OpenApiOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OpenApi.OpenApiOptions) object. The following snippet shows different ways to register transformers onto the document:

* Register a document transformer using a delegate.
* Register a document transformer using an instance of [Microsoft.AspNetCore.OpenApi.IOpenApiDocumentTransformer](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OpenApi.IOpenApiDocumentTransformer).
* Register a document transformer using a DI-activated [Microsoft.AspNetCore.OpenApi.IOpenApiDocumentTransformer](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OpenApi.IOpenApiDocumentTransformer).
* Register an operation transformer using a delegate.
* Register an operation transformer using an instance of [Microsoft.AspNetCore.OpenApi.IOpenApiOperationTransformer](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OpenApi.IOpenApiOperationTransformer).
* Register an operation transformer using a DI-activated [Microsoft.AspNetCore.OpenApi.IOpenApiOperationTransformer](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OpenApi.IOpenApiOperationTransformer).
* Register a schema transformer using a delegate.
* Register a schema transformer using an instance of [Microsoft.AspNetCore.OpenApi.IOpenApiSchemaTransformer](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OpenApi.IOpenApiSchemaTransformer).
* Register a schema transformer using a DI-activated [Microsoft.AspNetCore.OpenApi.IOpenApiSchemaTransformer](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OpenApi.IOpenApiSchemaTransformer).

[Code reference unavailable in this source snapshot: includes/~/fundamentals/openapi/samples/9.x/WebMinOpenApi/Program.cs?name=snippet_transUse\\&highlight=8-19](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/openapi/customize-openapi.md)

### Execution order for transformers

Transformers are executed as follows:

* Schema transformers are executed when a schema is registered to the document. Schema transformers are executed in the order in which they were added.
All schemas are added to the document before any operation processing occurs, so all schema transformers are executed before any operation transformers.
* Operation transformers are executed when an operation is added to the document. Operation transformers are executed in the order in which they were added.
All operations are added to the document before any document transformers are executed.
* Document transformers are executed when the document is generated. This is the final pass over the document, and all operations and schemas have been add by this point.
* When an app is configured to generate multiple OpenAPI documents, transformers are executed for each document independently.

For example, in the following snippet:
* `SchemaTransformer2` is executed and has access to the modifications made by `SchemaTransformer1`.
* Both `OperationTransformer1` and `OperationTransformer2` have access to the modifications made by both schema transformers for the types involved in the operation they are called to process.
* `OperationTransformer2` is executed after `OperationTransformer1`, so it has access to the modifications made by `OperationTransformer1`.
* Both `DocumentTransformer1` and `DocumentTransformer2` are executed after all operations and schemas have been added to the document, so they have access to all modifications made by the operation and schema transformers.
* `DocumentTransformer2` is executed after `DocumentTransformer1`, so it has access to the modifications made by `DocumentTransformer1`.

[Code reference unavailable in this source snapshot: includes/~/fundamentals/openapi/samples/9.x/WebMinOpenApi/Program.cs?name=snippet_transInOut\\&highlight=6-14](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/openapi/customize-openapi.md)

## Use document transformers

Document transformers have access to a context object that includes:

* The name of the document being modified.
* The [Microsoft.AspNetCore.Mvc.ApiExplorer.ApiDescriptionGroupCollectionProvider.ApiDescriptionGroups](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApiExplorer.ApiDescriptionGroupCollectionProvider.ApiDescriptionGroups) associated with that document.
* The [System.IServiceProvider](https://learn.microsoft.com/search/?terms=System.IServiceProvider) used in document generation.

Document transformers can also mutate the OpenAPI document that is generated. The following example demonstrates a document transformer that adds some information about the API to the OpenAPI document.

[Code reference unavailable in this source snapshot: includes/~/fundamentals/openapi/samples/9.x/WebMinOpenApi/Program.cs?name=snippet_documenttransformer1](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/openapi/customize-openapi.md)

Service-activated document transformers can utilize instances from DI to modify the app. The following sample demonstrates a document transformer that uses the [Microsoft.AspNetCore.Authentication.IAuthenticationSchemeProvider](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.IAuthenticationSchemeProvider) service from the authentication layer. It checks if any JWT bearer-related schemes are registered in the app and adds them to the OpenAPI document's top level:

[Code reference unavailable in this source snapshot: includes/~/fundamentals/openapi/samples/9.x/WebMinOpenApi/Program.cs?name=snippet_documenttransformer2](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/openapi/customize-openapi.md)

Document transformers are unique to the document instance they're associated with. In the following example, a transformer:

* Registers authentication-related requirements to the `internal` document.
* Leaves the `public` document unmodified.

[Code reference unavailable in this source snapshot: includes/~/fundamentals/openapi/samples/9.x/WebMinOpenApi/Program.cs?name=snippet_multidoc_operationtransformer1](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/openapi/customize-openapi.md)

## Use operation transformers

Operations are unique combinations of HTTP paths and methods in an OpenAPI document. Operation transformers are helpful when a modification:

* Should be made to each endpoint in an app, or
* Conditionally applied to certain routes.

Operation transformers have access to a context object which contains:

* The name of the document the operation belongs to.
* The [Microsoft.AspNetCore.Mvc.ApiExplorer.ApiDescription](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApiExplorer.ApiDescription) associated with the operation.
* The [System.IServiceProvider](https://learn.microsoft.com/search/?terms=System.IServiceProvider) used in document generation.

For example, the following operation transformer adds `500` as a response status code supported by all operations in the document.

[Code reference unavailable in this source snapshot: includes/~/fundamentals/openapi/samples/9.x/WebMinOpenApi/Program.cs?name=snippet_operationtransformer1](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/openapi/customize-openapi.md)

## Use schema transformers

Schemas are the data models that are used in request and response bodies in an OpenAPI document. Schema transformers are useful when a modification:

* Should be made to each schema in the document, or
* Conditionally applied to certain schemas.

Schema transformers have access to a context object which contains:

* The name of the document the schema belongs to.
* The JSON type information associated with the target schema.
* The [System.IServiceProvider](https://learn.microsoft.com/search/?terms=System.IServiceProvider) used in document generation.

For example, the following schema transformer sets the `format` of decimal types to `decimal` instead of `double`:

[Code reference unavailable in this source snapshot: includes/~/fundamentals/openapi/samples/9.x/WebMinOpenApi/Program.cs?name=snippet_schematransformer1](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/openapi/customize-openapi.md)

## Customize schema reuse

After all transformers have been applied, the framework makes a pass over the document to transfer certain schemas
to the `components.schemas` section, replacing them with `$ref` references to the transferred schema.
This reduces the size of the document and makes it easier to read.

The details of this processing are complicated and might change in future versions of .NET, but in general:

* Schemas for class/record/struct types are replaced with a `$ref` to a schema in `components.schemas`
  if they appear more than once in the document.
* Schemas for primitive types and standard collections are left inline.
* Schemas for enum types are always replaced with a `$ref` to a schema in components.schemas.

Typically the name of the schema in `components.schemas` is the name of the class/record/struct type,
but in some circumstances a different name must be used.

ASP.NET Core lets you customize which schemas are replaced with a `$ref` to a schema in `components.schemas`
using the [Microsoft.AspNetCore.OpenApi.OpenApiOptions.CreateSchemaReferenceId](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OpenApi.OpenApiOptions.CreateSchemaReferenceId) property of [Microsoft.AspNetCore.OpenApi.OpenApiOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OpenApi.OpenApiOptions).
This property is a delegate that takes a [System.Text.Json.Serialization.Metadata.JsonTypeInfo](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.Metadata.JsonTypeInfo) object and returns the name of the schema
in `components.schemas` that should be used for that type.
The framework provides a default implementation of this delegate, [Microsoft.AspNetCore.OpenApi.OpenApiOptions.CreateDefaultSchemaReferenceId%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OpenApi.OpenApiOptions.CreateDefaultSchemaReferenceId%252A)
that uses the name of the type, but you can replace it with your own implementation.

As a simple example of this customization, you might choose to always inline enum schemas.
This is done by setting [Microsoft.AspNetCore.OpenApi.OpenApiOptions.CreateSchemaReferenceId](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OpenApi.OpenApiOptions.CreateSchemaReferenceId) to a delegate
that returns null for enum types, and otherwise returns the value from the default implementation.
The following code shows how to do this:

```csharp
builder.Services.AddOpenApi(options =>
{
    // Always inline enum schemas
    options.CreateSchemaReferenceId = (type) =>
        type.Type.IsEnum ? null : OpenApiOptions.CreateDefaultSchemaReferenceId(type);
});
```

## Additional resources

* [fundamentals/openapi/using-openapi-documents](using-openapi-documents.md)
* [OpenAPI specification](https://spec.openapis.org/oas/v3.0.3)
