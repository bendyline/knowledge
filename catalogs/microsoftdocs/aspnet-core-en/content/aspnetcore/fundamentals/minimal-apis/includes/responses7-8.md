---
author: tdykstra
ms.author: tdykstra
ms.date: 08/07/2024
---

**Applies to: \>= aspnetcore-7.0 <= aspnetcore-8.0**

Minimal endpoints support the following types of return values:

1. `string` - This includes `Task<string>` and `ValueTask<string>`.
1. `T` (Any other type) - This includes `Task<T>` and `ValueTask<T>`.
1. `IResult` based - This includes `Task<IResult>` and `ValueTask<IResult>`.

## `string` return values

| Behavior | Content-Type |
| --- | --- |
| The framework writes the string directly to the response. | `text/plain` |

Consider the following route handler, which returns a `Hello world` text. 

```csharp
app.MapGet("/hello", () => "Hello World");
```

The `200` status code is returned with `text/plain` Content-Type header and the following content.

```text
Hello World
```

## `T` (Any other type) return values

| Behavior | Content-Type |
| --- | --- |
| The framework JSON-serializes the response. | `application/json` |

Consider the following route handler, which returns an anonymous type containing a `Message` string property.

```csharp
app.MapGet("/hello", () => new { Message = "Hello World" });
```

The `200` status code is returned with `application/json` Content-Type header and the following content.

```json
{"message":"Hello World"}
```

## `IResult` return values

| Behavior | Content-Type |
| --- | --- |
| The framework calls [IResult.ExecuteAsync](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IResult.ExecuteAsync%252A). | Decided by the `IResult` implementation. |

The `IResult` interface defines a contract that represents the result of an HTTP endpoint. The static [Results](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/minimal-apis/includes/\[Microsoft.AspNetCore.Http.Results]\(https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Results\)) class and the static [TypedResults](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/minimal-apis/includes/\[Microsoft.AspNetCore.Http.TypedResults]\(https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.TypedResults\)) are used to create various `IResult` objects that represent different types of responses.

### `TypedResults` versus `Results`

The [Microsoft.AspNetCore.Http.Results](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Results) and [Microsoft.AspNetCore.Http.TypedResults](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.TypedResults) static classes provide similar sets of results helpers. The `TypedResults` class is the *typed* equivalent of the `Results` class. However, the `Results` helpers' return type is [Microsoft.AspNetCore.Http.IResult](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IResult), while each `TypedResults` helper's return type is one of the `IResult` implementation types. The difference means that for `Results` helpers a conversion is needed when the concrete type is needed, for example, for unit testing. The implementation types are defined in the [Microsoft.AspNetCore.Http.HttpResults](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpResults) namespace.

Returning `TypedResults` rather than `Results` has the following advantages:

* `TypedResults` helpers return strongly typed objects, which can improve code readability, unit testing, and reduce the chance of runtime errors.
* The implementation type [automatically provides the response type metadata for OpenAPI](https://learn.microsoft.com/aspnet/core/fundamentals/openapi/aspnetcore-openapi#describe-response-types) to describe the endpoint.

Consider the following endpoint, for which a `200 OK` status code with the expected JSON response is produced.

[language="csharp" source="\~/tutorials/min-web-api/samples/7.x/todo/Program.cs" id="snippet_11b"::: (complete source file; reference: \~/tutorials/min-web-api/samples/7.x/todo/Program.cs)](../../../../_code/aspnetcore/tutorials/min-web-api/samples/7.x/todo/Program.cs.md)

In order to document this endpoint correctly the extensions method `Produces` is called. However, it's not necessary to call `Produces` if `TypedResults` is used instead of `Results`, as shown in the following code. `TypedResults` automatically provides the metadata for the endpoint.

[language="csharp" source="\~/tutorials/min-web-api/samples/7.x/todo/Program.cs" id="snippet_112b"::: (complete source file; reference: \~/tutorials/min-web-api/samples/7.x/todo/Program.cs)](../../../../_code/aspnetcore/tutorials/min-web-api/samples/7.x/todo/Program.cs.md)

For more information about describing a response type, see [OpenAPI support in Minimal APIs](https://learn.microsoft.com/aspnet/core/fundamentals/openapi/aspnetcore-openapi#describe-response-types-1).

As mentioned previously, when using `TypedResults`, a conversion is not needed. Consider the following Minimal API which returns a `TypedResults` class

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/fundamentals/minimal-apis/samples/MinApiTestsSample/WebMinRouteGroup/TodoEndpointsV1.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/minimal-apis/includes/responses7-8.md)

The following test checks for the full concrete type:

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/fundamentals/minimal-apis/samples/MinApiTestsSample/UnitTests/TodoInMemoryTests.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/minimal-apis/includes/responses7-8.md)

Because all methods on `Results` return `IResult` in their signature, the compiler automatically infers that as the request delegate return type when returning different results from a single endpoint. `TypedResults` requires the use of `Results<T1, TN>` from such delegates.

The following method compiles because both [`Results.Ok`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Results.Ok%252A) and [`Results.NotFound`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Results.NotFound%252A) are declared as returning `IResult`, even though the actual concrete types of the objects returned are different:

[language="csharp" source="\~/tutorials/min-web-api/samples/7.x/todo/Program.cs" id="snippet_1a"::: (complete source file; reference: \~/tutorials/min-web-api/samples/7.x/todo/Program.cs)](../../../../_code/aspnetcore/tutorials/min-web-api/samples/7.x/todo/Program.cs.md)

The following method does not compile, because `TypedResults.Ok` and `TypedResults.NotFound` are declared as returning different types and the compiler won't attempt to infer the best matching type:

[language="csharp" source="\~/tutorials/min-web-api/samples/7.x/todo/Program.cs" id="snippet_111"::: (complete source file; reference: \~/tutorials/min-web-api/samples/7.x/todo/Program.cs)](../../../../_code/aspnetcore/tutorials/min-web-api/samples/7.x/todo/Program.cs.md)

To use `TypedResults`, the return type must be fully declared, which when asynchronous requires the `Task<>` wrapper. Using `TypedResults` is more verbose, but that's the trade-off for having the type information be statically available and thus capable of self-describing to OpenAPI:

[language="csharp" source="\~/tutorials/min-web-api/samples/7.x/todo/Program.cs" id="snippet_1b"::: (complete source file; reference: \~/tutorials/min-web-api/samples/7.x/todo/Program.cs)](../../../../_code/aspnetcore/tutorials/min-web-api/samples/7.x/todo/Program.cs.md)

### Results<TResult1, TResultN>

Use [`Results<TResult1, TResultN>`](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.http.httpresults.results-2) as the endpoint handler return type instead of `IResult` when:

* Multiple `IResult` implementation types are returned from the endpoint handler. 
* The static `TypedResult` class is used to create the `IResult` objects.

This alternative is better than returning `IResult` because the generic union types automatically retain the endpoint metadata. And since the `Results<TResult1, TResultN>` union types implement implicit cast operators, the compiler can automatically convert the types specified in the generic arguments to an instance of the union type. 

This has the added benefit of providing compile-time checking that a route handler actually only returns the results that it declares it does. Attempting to return a type that isn't declared as one of the generic arguments to `Results<>` results in a compilation error.

Consider the following endpoint, for which a `400 BadRequest` status code is returned when the `orderId` is greater than `999`. Otherwise, it produces a `200 OK` with the expected content.

```csharp
app.MapGet("/orders/{orderId}", IResult (int orderId)
    => orderId > 999 ? TypedResults.BadRequest() : TypedResults.Ok(new Order(orderId)))
    .Produces(400)
    .Produces<Order>();
```

In order to document this endpoint correctly the extension method `Produces` is called. However, since the `TypedResults` helper automatically includes the metadata for the endpoint, you can return the `Results<T1, Tn>` union type instead, as shown in the following code.

```csharp
app.MapGet("/orders/{orderId}", Results<BadRequest, Ok<Order>> (int orderId) 
    => orderId > 999 ? TypedResults.BadRequest() : TypedResults.Ok(new Order(orderId)));
```

<a name="binr7"></a>

### Built-in results

Common result helpers exist in the [Microsoft.AspNetCore.Http.Results](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Results) and [Microsoft.AspNetCore.Http.TypedResults](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.TypedResults) static classes. Returning `TypedResults` is preferred to returning `Results`. For more information, see [`TypedResults` versus `Results`](https://learn.microsoft.com/search/?terms=fundamentals%2Fminimal-apis%2Fresponses%23typedresults-versus-results).


The following sections demonstrate the usage of the common result helpers.

#### JSON

```csharp
app.MapGet("/hello", () => Results.Json(new { Message = "Hello World" }));
```

[Microsoft.AspNetCore.Http.HttpResponseJsonExtensions.WriteAsJsonAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpResponseJsonExtensions.WriteAsJsonAsync%252A) is an alternative way to return JSON:

[language="csharp" source="\~/fundamentals/minimal-apis/7.0-samples/WebMinJson/Program.cs" id="snippet_writeasjsonasync"::: (complete source file; reference: \~/fundamentals/minimal-apis/7.0-samples/WebMinJson/Program.cs)](../../../../_code/aspnetcore/fundamentals/minimal-apis/7.0-samples/WebMinJson/Program.cs.md)

#### Custom Status Code

```csharp
app.MapGet("/405", () => Results.StatusCode(405));
```

#### Text

```csharp
app.MapGet("/text", () => Results.Text("This is some text"));
```

<a name="stream7"></a>

#### Stream

[Code example (complete source file; reference: \~/fundamentals/minimal-apis/7.0-samples/WebMinAPIs/Program.cs?name=snippet_stream)](../../../../_code/aspnetcore/fundamentals/minimal-apis/7.0-samples/WebMinAPIs/Program.cs.md)

[`Results.Stream`](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.http.results.stream?view=aspnetcore-7.0\&preserve-view=true) overloads allow access to the underlying HTTP response stream without buffering. The following example uses [ImageSharp](https://sixlabors.com/products/imagesharp) to return a reduced size of the specified image:

[Code example (complete source file; reference: \~/fundamentals/minimal-apis/resultsStream/7.0-samples/ResultsStreamSample/Program.cs?name=snippet)](../../../../_code/aspnetcore/fundamentals/minimal-apis/resultsStream/7.0-samples/ResultsStreamSample/Program.cs.md)

The following example streams an image from [Azure Blob storage](https://learn.microsoft.com/azure/storage/blobs/storage-blobs-introduction):

[Code example (complete source file; reference: \~/fundamentals/minimal-apis/resultsStream/7.0-samples/ResultsStreamSample/Program.cs?name=snippet_abs)](../../../../_code/aspnetcore/fundamentals/minimal-apis/resultsStream/7.0-samples/ResultsStreamSample/Program.cs.md)

The following example streams a video from an Azure Blob:

[Code example (complete source file; reference: \~/fundamentals/minimal-apis/resultsStream/7.0-samples/ResultsStreamSample/Program.cs?name=snippet_video)](../../../../_code/aspnetcore/fundamentals/minimal-apis/resultsStream/7.0-samples/ResultsStreamSample/Program.cs.md)

#### Redirect

```csharp
app.MapGet("/old-path", () => Results.Redirect("/new-path"));
```

#### File

```csharp
app.MapGet("/download", () => Results.File("myfile.text"));
```

<a name="httpresultinterfaces7"></a>

### HttpResult interfaces

The following interfaces in the [Microsoft.AspNetCore.Http](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http) namespace provide a way to detect the `IResult` type at runtime, which is a common pattern in filter implementations:

* [Microsoft.AspNetCore.Http.IContentTypeHttpResult](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IContentTypeHttpResult)
* [Microsoft.AspNetCore.Http.IFileHttpResult](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IFileHttpResult)
* [Microsoft.AspNetCore.Http.INestedHttpResult](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.INestedHttpResult)
* [Microsoft.AspNetCore.Http.IStatusCodeHttpResult](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IStatusCodeHttpResult)
* [Microsoft.AspNetCore.Http.IValueHttpResult](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IValueHttpResult)
* [Microsoft.AspNetCore.Http.IValueHttpResult%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IValueHttpResult%25601)

Here's an example of a filter that uses one of these interfaces:

[language="csharp" source="\~/fundamentals/minimal-apis/7.0-samples/HttpResultInterfaces/Program.cs" id="snippet_filter"::: (complete source file; reference: \~/fundamentals/minimal-apis/7.0-samples/HttpResultInterfaces/Program.cs)](../../../../_code/aspnetcore/fundamentals/minimal-apis/7.0-samples/HttpResultInterfaces/Program.cs.md)

For more information, see [Filters in Minimal API apps](../min-api-filters.md) and [IResult implementation types](https://learn.microsoft.com/search/?terms=fundamentals%2Fminimal-apis%2Ftest-min-api%23iresult-implementation-types).

## Customizing responses

Applications can control responses by implementing a custom [Microsoft.AspNetCore.Http.IResult](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IResult) type. The following code is an example of an HTML result type:

[Code example (complete source file; reference: \~/fundamentals/minimal-apis/7.0-samples/WebMinAPIs/ResultsExtensions.cs)](../../../../_code/aspnetcore/fundamentals/minimal-apis/7.0-samples/WebMinAPIs/ResultsExtensions.cs.md)

We recommend adding an extension method to [Microsoft.AspNetCore.Http.IResultExtensions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IResultExtensions) to make these custom results more discoverable.

[Code example (complete source file; reference: \~/fundamentals/minimal-apis/7.0-samples/WebMinAPIs/Program.cs?name=snippet_xtn)](../../../../_code/aspnetcore/fundamentals/minimal-apis/7.0-samples/WebMinAPIs/Program.cs.md)

Also, a custom `IResult` type can provide its own annotation by implementing the [Microsoft.AspNetCore.Http.Metadata.IEndpointMetadataProvider](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Metadata.IEndpointMetadataProvider) interface. For example, the following code adds an annotation to the preceding `HtmlResult` type that describes the response produced by the endpoint.

[Code example (complete source file; reference: \~/fundamentals/minimal-apis/7.0-samples/WebMinAPIs/Snippets/ResultsExtensions.cs?name=snippet_IEndpointMetadataProvider\&highlight=1,17-20)](../../../../_code/aspnetcore/fundamentals/minimal-apis/7.0-samples/WebMinAPIs/Snippets/ResultsExtensions.cs.md)

The `ProducesHtmlMetadata` is an implementation of [Microsoft.AspNetCore.Http.Metadata.IProducesResponseTypeMetadata](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Metadata.IProducesResponseTypeMetadata) that defines the produced response content type `text/html` and the status code `200 OK`.

[Code example (complete source file; reference: \~/fundamentals/minimal-apis/7.0-samples/WebMinAPIs/Snippets/ResultsExtensions.cs?name=snippet_ProducesHtmlMetadata\&highlight=5,7)](../../../../_code/aspnetcore/fundamentals/minimal-apis/7.0-samples/WebMinAPIs/Snippets/ResultsExtensions.cs.md)

An alternative approach is using the [Microsoft.AspNetCore.Mvc.ProducesAttribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ProducesAttribute) to describe the produced response. The following code changes the `PopulateMetadata` method to use `ProducesAttribute`.

```csharp
public static void PopulateMetadata(MethodInfo method, EndpointBuilder builder)
{
    builder.Metadata.Add(new ProducesAttribute(MediaTypeNames.Text.Html));
}
```

## Configure JSON serialization options

By default, Minimal API apps use [`Web defaults`](https://learn.microsoft.com/dotnet/standard/serialization/system-text-json-configure-options#web-defaults-for-jsonserializeroptions) options during JSON serialization and deserialization.

### Configure JSON serialization options globally

Options can be configured globally for an app by invoking [Microsoft.Extensions.DependencyInjection.HttpJsonServiceExtensions.ConfigureHttpJsonOptions%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.HttpJsonServiceExtensions.ConfigureHttpJsonOptions%252A). The following example includes public fields and formats JSON output.

[language="csharp" source="\~/fundamentals/minimal-apis/7.0-samples/WebMinJson/Program.cs" id="snippet_confighttpjsonoptions" highlight="3-6"::: (complete source file; reference: \~/fundamentals/minimal-apis/7.0-samples/WebMinJson/Program.cs)](../../../../_code/aspnetcore/fundamentals/minimal-apis/7.0-samples/WebMinJson/Program.cs.md)

Since fields are included, the preceding code reads `NameField` and includes it in the output JSON.

### Configure JSON serialization options for an endpoint

To configure serialization options for an endpoint, invoke [Microsoft.AspNetCore.Http.Results.Json%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Results.Json%252A) and pass to it a [System.Text.Json.JsonSerializerOptions](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions) object, as shown in the following example:

[language="csharp" source="\~/fundamentals/minimal-apis/7.0-samples/WebMinJson/Program.cs" id="snippet_resultsjsonwithoptions" highlight="5-6,9"::: (complete source file; reference: \~/fundamentals/minimal-apis/7.0-samples/WebMinJson/Program.cs)](../../../../_code/aspnetcore/fundamentals/minimal-apis/7.0-samples/WebMinJson/Program.cs.md)

As an alternative, use an overload of [Microsoft.AspNetCore.Http.HttpResponseJsonExtensions.WriteAsJsonAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpResponseJsonExtensions.WriteAsJsonAsync%252A) that accepts a [System.Text.Json.JsonSerializerOptions](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions) object. The following example uses this overload to format the output JSON:

[language="csharp" source="\~/fundamentals/minimal-apis/7.0-samples/WebMinJson/Program.cs" id="snippet_writeasjsonasyncwithoptions" highlight="5-6,10"::: (complete source file; reference: \~/fundamentals/minimal-apis/7.0-samples/WebMinJson/Program.cs)](../../../../_code/aspnetcore/fundamentals/minimal-apis/7.0-samples/WebMinJson/Program.cs.md)

## Additional Resources

* [fundamentals/minimal-apis/security](../security.md)
