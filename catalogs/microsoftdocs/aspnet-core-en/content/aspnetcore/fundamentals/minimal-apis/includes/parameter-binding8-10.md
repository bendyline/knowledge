**Applies to: \>= aspnetcore-8.0**

Parameter binding is the process of converting request data into strongly typed parameters that are expressed by route handlers. A binding source determines where parameters are bound from. Binding sources can be explicit or inferred based on HTTP method and parameter type.

Supported binding sources:

* Route values
* Query string
* Header
* Body (as JSON)
* Form values
* Services provided by dependency injection
* Custom



**Applies to: \>= aspnetcore-11.0**

> **Note:**
> [C# union types](https://learn.microsoft.com/dotnet/csharp/language-reference/builtin-types/union) are supported only as the body (as JSON). Non-body sources—route values, query string, headers, and form values—bind string values without JSON parsing, so they can't dispatch to a union case.



**Applies to: \>= aspnetcore-8.0**

The following `GET` route handler uses some of these parameter binding sources:

[language="csharp" source="\~/fundamentals/minimal-apis/7.0-samples/WebMinAPIs/Program.cs" id="snippet_pbg" highlight="8-11"::: (complete source file; reference: \~/fundamentals/minimal-apis/7.0-samples/WebMinAPIs/Program.cs)](../../../../_code/aspnetcore/fundamentals/minimal-apis/7.0-samples/WebMinAPIs/Program.cs.md)

The following table shows the relationship between the parameters used in the preceding example and the associated binding sources.

| Parameter | Binding Source |
| --- | --- |
| `id` | route value |
| `page` | query string |
| `customHeader` | header |
| `service` | Provided by dependency injection |

The HTTP methods `GET`, `HEAD`, `OPTIONS`, and `DELETE` don't implicitly bind from body. To bind from body (as JSON) for these HTTP methods, [bind explicitly](#explicit-parameter-binding) with [`[FromBody]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.FromBodyAttribute) or read from the [Microsoft.AspNetCore.Http.HttpRequest](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpRequest).

The following example POST route handler uses a binding source of body (as JSON) for the `person` parameter:

[language="csharp" source="\~/fundamentals/minimal-apis/7.0-samples/WebMinAPIs/Program.cs" id="snippet_pbp" highlight="5"::: (complete source file; reference: \~/fundamentals/minimal-apis/7.0-samples/WebMinAPIs/Program.cs)](../../../../_code/aspnetcore/fundamentals/minimal-apis/7.0-samples/WebMinAPIs/Program.cs.md)

The parameters in the preceding examples are all bound from request data automatically. To demonstrate the convenience that parameter binding provides, the following route handlers show how to read request data directly from the request:

[language="csharp" source="\~/fundamentals/minimal-apis/7.0-samples/WebMinAPIs/Snippets/Program.cs" id="snippet_ManualRequestBinding" highlight="3-5,12"::: (complete source file; reference: \~/fundamentals/minimal-apis/7.0-samples/WebMinAPIs/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/minimal-apis/7.0-samples/WebMinAPIs/Snippets/Program.cs.md)

## Explicit Parameter Binding

Attributes can be used to explicitly declare where parameters are bound from.

<!-- TODO - finish Service  -->
[language="csharp" source="\~/fundamentals/minimal-apis/7.0-samples/WebMinAPIs/Program.cs" id="snippet_epb"::: (complete source file; reference: \~/fundamentals/minimal-apis/7.0-samples/WebMinAPIs/Program.cs)](../../../../_code/aspnetcore/fundamentals/minimal-apis/7.0-samples/WebMinAPIs/Program.cs.md)

| Parameter | Binding Source |
| --- | --- |
| `id` | route value with the name `id` |
| `page` | query string with the name `"p"` |
| `service` | Provided by dependency injection |
| `contentType` | header with the name `"Content-Type"` |

### Explicit binding from form values

The [`[FromForm]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.FromFormAttribute) attribute binds form values:

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/fundamentals/minimal-apis/samples/FormBinding/Program.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/minimal-apis/includes/parameter-binding8-10.md)

An alternative is to use the [`[AsParameters]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.AsParametersAttribute) attribute with a custom type that has properties annotated with `[FromForm]`. For example, the following code binds from form values to properties of the `NewTodoRequest` record struct:

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/fundamentals/minimal-apis/samples/FormBinding/Program.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/minimal-apis/includes/parameter-binding8-10.md)

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/fundamentals/minimal-apis/samples/FormBinding/Program.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/minimal-apis/includes/parameter-binding8-10.md)

For more information, see the section on [AsParameters](#parameter-binding-for-argument-lists-with-asparameters) later in this article.

The [complete sample code](https://github.com/dotnet/AspNetCore.Docs.Samples/tree/main/fundamentals/minimal-apis/samples/IFormFile) is in the [AspNetCore.Docs.Samples](https://github.com/dotnet/AspNetCore.Docs.Samples) repository.

### Secure binding from IFormFile and IFormFileCollection

Complex form binding is supported using [Microsoft.AspNetCore.Http.IFormFile](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IFormFile) and [Microsoft.AspNetCore.Http.IFormFileCollection](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IFormFileCollection) using the [`[FromForm]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.FromFormAttribute):

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/fundamentals/minimal-apis/samples/IFormFile/Program.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/minimal-apis/includes/parameter-binding8-10.md)

Parameters bound to the request with `[FromForm]` include an [antiforgery token](../../../security/anti-request-forgery.md). The antiforgery token is validated when the request is processed. For more information, see [Antiforgery with Minimal APIs](../../../security/anti-request-forgery.md).

For more information, see [Form binding in Minimal APIs](https://andrewlock.net/exploring-the-dotnet-8-preview-form-binding-in-minimal-apis/).

The [complete sample code](https://github.com/dotnet/AspNetCore.Docs.Samples/tree/main/fundamentals/minimal-apis/samples/FormBinding) is in the [AspNetCore.Docs.Samples](https://github.com/dotnet/AspNetCore.Docs.Samples) repository.

## Parameter binding with dependency injection

Parameter binding for Minimal APIs binds parameters through [dependency injection](../../dependency-injection.md) when the type is configured as a service. It's not necessary to explicitly apply the [`[FromServices]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.FromServicesAttribute) attribute to a parameter. In the following code, both actions return the time:

[language="csharp" source="\~/release-notes/aspnetcore-7/samples/ApiController/Program.cs" id="snippet_min" highlight="8-9"::: (complete source file; reference: \~/release-notes/aspnetcore-7/samples/ApiController/Program.cs)](../../../../_code/aspnetcore/release-notes/aspnetcore-7/samples/ApiController/Program.cs.md)

## Optional parameters

Parameters declared in route handlers are treated as required:

* If a request matches the route, the route handler only runs if all required parameters are provided in the request.
* Failure to provide all required parameters results in an error.

[language="csharp" source="\~/fundamentals/minimal-apis/7.0-samples/WebMinAPIs/Program.cs" id="snippet_op1" highlight="4"::: (complete source file; reference: \~/fundamentals/minimal-apis/7.0-samples/WebMinAPIs/Program.cs)](../../../../_code/aspnetcore/fundamentals/minimal-apis/7.0-samples/WebMinAPIs/Program.cs.md)

| URI | result |
| --- | --- |
| `/products?pageNumber=3` | 3 returned |
| `/products` | `BadHttpRequestException`: Required parameter "int pageNumber" wasn't provided from query string. |
| `/products/1` | HTTP 404 error, no matching route |

To make `pageNumber` optional, define the type as optional or provide a default value:

[language="csharp" source="\~/fundamentals/minimal-apis/7.0-samples/WebMinAPIs/Program.cs" id="snippet_op2" highlight="4,6-8"::: (complete source file; reference: \~/fundamentals/minimal-apis/7.0-samples/WebMinAPIs/Program.cs)](../../../../_code/aspnetcore/fundamentals/minimal-apis/7.0-samples/WebMinAPIs/Program.cs.md)

| URI | result |
| --- | --- |
| `/products?pageNumber=3` | 3 returned |
| `/products` | 1 returned |
| `/products2` | 1 returned |

The preceding nullable and default value applies to all sources:

[language="csharp" source="\~/fundamentals/minimal-apis/7.0-samples/WebMinAPIs/Program.cs" id="snippet_op3" highlight="4"::: (complete source file; reference: \~/fundamentals/minimal-apis/7.0-samples/WebMinAPIs/Program.cs)](../../../../_code/aspnetcore/fundamentals/minimal-apis/7.0-samples/WebMinAPIs/Program.cs.md)

The preceding code calls the method with a null product if no request body is sent.

**NOTE**: If invalid data is provided and the parameter is nullable, the route handler is ***not*** run.

[language="csharp" source="\~/fundamentals/minimal-apis/7.0-samples/WebMinAPIs/Program.cs" id="snippet_op4" highlight="4"::: (complete source file; reference: \~/fundamentals/minimal-apis/7.0-samples/WebMinAPIs/Program.cs)](../../../../_code/aspnetcore/fundamentals/minimal-apis/7.0-samples/WebMinAPIs/Program.cs.md)

| URI | result |
| --- | --- |
| `/products?pageNumber=3` | `3` returned |
| `/products` | `1` returned |
| `/products?pageNumber=two` | `BadHttpRequestException`: Failed to bind parameter `"Nullable<int> pageNumber"` from "two". |
| `/products/two` | HTTP 404 error, no matching route |

See the [Binding Failures](#bf) section for more information.

## Special types

The following types are bound without explicit attributes:

* [Microsoft.AspNetCore.Http.HttpContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpContext): The context which holds all the information about the current HTTP request or response:

  ```csharp
  app.MapGet("/", (HttpContext context) => context.Response.WriteAsync("Hello World"));
  ```

* [Microsoft.AspNetCore.Http.HttpRequest](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpRequest) and [Microsoft.AspNetCore.Http.HttpResponse](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpResponse): The HTTP request and HTTP response:

  ```csharp
  app.MapGet("/", (HttpRequest request, HttpResponse response) =>
      response.WriteAsync($"Hello World {request.Query["name"]}"));
  ```

* [System.Threading.CancellationToken](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken): The cancellation token associated with the current HTTP request:

  ```csharp
  app.MapGet("/", async (CancellationToken cancellationToken) => 
      await MakeLongRunningRequestAsync(cancellationToken));
  ```

* [System.Security.Claims.ClaimsPrincipal](https://learn.microsoft.com/search/?terms=System.Security.Claims.ClaimsPrincipal): The user associated with the request, bound from [Microsoft.AspNetCore.Http.HttpContext.User%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpContext.User%252A):

  ```csharp
  app.MapGet("/", (ClaimsPrincipal user) => user.Identity.Name);
  ```

<a name="rbs"></a>

### Bind the request body as a `Stream` or `PipeReader`

The request body can bind as a [`Stream`](https://learn.microsoft.com/dotnet/api/system.io.stream) or [`PipeReader`](https://learn.microsoft.com/dotnet/api/system.io.pipelines.pipereader) to efficiently support scenarios where the user has to process data and:

* Store the data to blob storage or enqueue the data to a queue provider.
* Process the stored data with a worker process or cloud function.

For example, the data might be enqueued to [Azure Queue storage](https://learn.microsoft.com/azure/storage/queues/storage-queues-introduction) or stored in [Azure Blob storage](https://learn.microsoft.com/azure/storage/blobs/storage-blobs-introduction).

The following code implements a background queue:

[language="csharp" source="\~/fundamentals/minimal-apis/bindStreamPipeReader/7.0-samples/PipeStreamToBackgroundQueue/BackgroundQueueService.cs" ::: (complete source file; reference: \~/fundamentals/minimal-apis/bindStreamPipeReader/7.0-samples/PipeStreamToBackgroundQueue/BackgroundQueueService.cs)](../../../../_code/aspnetcore/fundamentals/minimal-apis/bindStreamPipeReader/7.0-samples/PipeStreamToBackgroundQueue/BackgroundQueueService.cs.md)

The following code binds the request body to a `Stream`:

[language="csharp" source="\~/fundamentals/minimal-apis/bindStreamPipeReader/7.0-samples/PipeStreamToBackgroundQueue/Program.cs" id="snippet_1"::: (complete source file; reference: \~/fundamentals/minimal-apis/bindStreamPipeReader/7.0-samples/PipeStreamToBackgroundQueue/Program.cs)](../../../../_code/aspnetcore/fundamentals/minimal-apis/bindStreamPipeReader/7.0-samples/PipeStreamToBackgroundQueue/Program.cs.md)

The following code shows the complete `Program.cs` file:

[language="csharp" source="\~/fundamentals/minimal-apis/bindStreamPipeReader/7.0-samples/PipeStreamToBackgroundQueue/Program.cs" id="snippet"::: (complete source file; reference: \~/fundamentals/minimal-apis/bindStreamPipeReader/7.0-samples/PipeStreamToBackgroundQueue/Program.cs)](../../../../_code/aspnetcore/fundamentals/minimal-apis/bindStreamPipeReader/7.0-samples/PipeStreamToBackgroundQueue/Program.cs.md)

* When reading data, the `Stream` is the same object as `HttpRequest.Body`.
* The request body isn't buffered by default. After the body is read, it's not rewindable. The stream can't be read multiple times.
* The `Stream` and `PipeReader` aren't usable outside of the minimal action handler as the underlying buffers will be disposed or reused.

### File uploads using IFormFile and IFormFileCollection

File uploads using `IFormFile` and `IFormFileCollection` in Minimal APIs require `multipart/form-data` encoding. The parameter name in the route handler must match the form field name in the request. Minimal APIs don't support binding the entire request body directly to an `IFormFile` parameter without form encoding.

If you need to bind the entire request body, for example, when working with JSON, binary data, or other content types, see:

- [Bind the request body as a Stream or PipeReader](#bind-the-request-body-as-a-stream-or-pipereader)
- [Explicit Parameter Binding](#explicit-parameter-binding)

The following code uses [Microsoft.AspNetCore.Http.IFormFile](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IFormFile) and [Microsoft.AspNetCore.Http.IFormFileCollection](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IFormFileCollection) to upload file:

[language="csharp" source="\~/fundamentals/minimal-apis/iformFile/7.0-samples/MinimalApi/Program.cs" ::: (complete source file; reference: \~/fundamentals/minimal-apis/iformFile/7.0-samples/MinimalApi/Program.cs)](../../../../_code/aspnetcore/fundamentals/minimal-apis/iformFile/7.0-samples/MinimalApi/Program.cs.md)

Authenticated file upload requests are supported using an [Authorization header](https://developer.mozilla.org/docs/Web/HTTP/Headers/Authorization), a [client certificate](https://learn.microsoft.com/aspnet/core/security/authentication/certauth), or a cookie header.

<a name="bind8"></a>

### Binding to forms with IFormCollection, IFormFile, and IFormFileCollection

Binding from form-based parameters using [Microsoft.AspNetCore.Http.IFormCollection](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IFormCollection), [Microsoft.AspNetCore.Http.IFormFile](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IFormFile), and [Microsoft.AspNetCore.Http.IFormFileCollection](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IFormFileCollection) is supported. [OpenAPI](../../openapi/aspnetcore-openapi.md) metadata is inferred for form parameters to support integration with [Swagger UI](../../../tutorials/web-api-help-pages-using-swagger.md).

The following code uploads files using inferred binding from the `IFormFile` type:

[language="csharp" source="\~/fundamentals/minimal-apis/parameter-binding/samples8/Iform/Program.cs" highlight="18-23,44-50"::: (complete source file; reference: \~/fundamentals/minimal-apis/parameter-binding/samples8/Iform/Program.cs)](../../../../_code/aspnetcore/fundamentals/minimal-apis/parameter-binding/samples8/Iform/Program.cs.md)

***Warning:*** When implementing forms, the app ***must prevent*** [Cross-Site Request Forgery (XSRF/CSRF) attacks](../../../security/anti-request-forgery.md). In the preceding code, the [Microsoft.AspNetCore.Antiforgery.IAntiforgery](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Antiforgery.IAntiforgery) service is used to prevent XSRF attacks by generating and validation an antiforgery token:

[language="csharp" source="\~/fundamentals/minimal-apis/parameter-binding/samples8/Iform/Program.cs" highlight="25,45"::: (complete source file; reference: \~/fundamentals/minimal-apis/parameter-binding/samples8/Iform/Program.cs)](../../../../_code/aspnetcore/fundamentals/minimal-apis/parameter-binding/samples8/Iform/Program.cs.md)

For more information on XSRF attacks, see [Antiforgery with Minimal APIs](../../../security/anti-request-forgery.md)

For more information, see [Form binding in Minimal APIs](https://andrewlock.net/exploring-the-dotnet-8-preview-form-binding-in-minimal-apis/);

#### IFormFile collection binding behavior

The following table summarizes how different [Microsoft.AspNetCore.Http.IFormFile](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IFormFile) collection parameter types are bound in Minimal APIs. The general guidance that the parameter name in the route handler must match the form field name applies to [Microsoft.AspNetCore.Http.IFormFile](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IFormFile) and supported named file collections such as [System.Collections.Generic.IReadOnlyList%601](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IReadOnlyList%25601), but not to [Microsoft.AspNetCore.Http.IFormFileCollection](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IFormFileCollection), which binds all uploaded files.

| Parameter type | Bound value | Honors parameter name? |
| --- | --- | --- |
| [`IFormFileCollection`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IFormFileCollection) | All files in [`HttpContext.Request.Form.Files`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IFormCollection.Files) | No |
| [`IFormFile`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IFormFile) | The single file whose form field name matches the parameter name | Yes |
| [`IReadOnlyList<IFormFile>`](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IReadOnlyList%25601) | All files whose form field name matches the parameter name | Yes |
| Other [`IFormFile`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IFormFile) collection types (`IEnumerable<IFormFile>`, `List<IFormFile>`, `IFormFile[]`, etc.) | Not supported — parameter is not populated | N/A |

Use [Microsoft.AspNetCore.Http.IFormFileCollection](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IFormFileCollection) when you need all uploaded files regardless of form field name. Use [System.Collections.Generic.IReadOnlyList%601](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IReadOnlyList%25601) when you need only the files whose form field name matches the parameter name.

> **Note:**
> The [Microsoft.AspNetCore.Http.IFormFile](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IFormFile) collection binding rules in the preceding table also apply to properties on [`[AsParameters]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.AsParametersAttribute) types and form-mapped complex types, since the form-mapping layer is shared with Blazor.

<a id="bindcc"></a>

## Bind to collections and complex types from forms

Binding is supported for:

* Collections, for example [List](https://learn.microsoft.com/dotnet/api/system.collections.generic.list-1) and [Dictionary](https://learn.microsoft.com/dotnet/api/system.collections.generic.dictionary-2)
* Complex types, for example, `Todo` or `Project`

> **Warning:**
> Complex-type form mapping with [`[FromForm]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.FromFormAttribute) in Minimal APIs doesn't use MVC model binding. Attributes in the [Microsoft.AspNetCore.Mvc.ModelBinding](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ModelBinding) namespace, such as [`[BindNever]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ModelBinding.BindNeverAttribute) and [`[BindRequired]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ModelBinding.BindRequiredAttribute), aren't supported. Don't use these attributes to prevent overposting. Instead, use a dedicated input model or data transfer object (DTO) that includes only the properties clients are allowed to modify.

The following code shows:

* A minimal endpoint that binds a multi-part form input to a complex object.
* How to use the antiforgery services to support the generation and validation of antiforgery tokens.

[language="csharp" source="\~/fundamentals/minimal-apis/parameter-binding/samples8/ComplexBinding/Program.cs"::: (complete source file; reference: \~/fundamentals/minimal-apis/parameter-binding/samples8/ComplexBinding/Program.cs)](../../../../_code/aspnetcore/fundamentals/minimal-apis/parameter-binding/samples8/ComplexBinding/Program.cs.md)

In the preceding code:

* The target parameter ***must*** be annotated with the [`[FromForm]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.FromFormAttribute) attribute to disambiguate from parameters that should be read from the JSON body.
* Binding from complex or collection types is ***not*** supported for Minimal APIs that are compiled with the Request Delegate Generator.
* The markup shows an additional hidden input with a name of `isCompleted` and a value of `false`. If the `isCompleted` checkbox is checked when the form is submitted, both values `true` and `false` are submitted as values. If the checkbox is unchecked, only the hidden input value `false` is submitted. The ASP.NET Core form-mapping process reads only the first value when binding to a `bool` value, which results in `true` for checked checkboxes and `false` for unchecked checkboxes.
  
An example of the form data submitted to the preceding endpoint looks as follows:

```txt
__RequestVerificationToken: CfDJ8Bveip67DklJm5vI2PF2VOUZ594RC8kcGWpTnVV17zCLZi1yrs-CSz426ZRRrQnEJ0gybB0AD7hTU-0EGJXDU-OaJaktgAtWLIaaEWMOWCkoxYYm-9U9eLV7INSUrQ6yBHqdMEE_aJpD4AI72gYiCqc
name: Walk the dog
dueDate: 2024-04-06
isCompleted: true
isCompleted: false
```

<a name="bindar"></a>

## Bind arrays and string values from headers and query strings

The following code demonstrates binding query strings to an array of primitive types, string arrays, and [StringValues](https://learn.microsoft.com/dotnet/api/microsoft.extensions.primitives.stringvalues):

[language="csharp" source="\~/fundamentals/minimal-apis/bindingArrays/7.0-samples/todo/Program.cs" id="snippet_bqs2pa"::: (complete source file; reference: \~/fundamentals/minimal-apis/bindingArrays/7.0-samples/todo/Program.cs)](../../../../_code/aspnetcore/fundamentals/minimal-apis/bindingArrays/7.0-samples/todo/Program.cs.md)

Binding query strings or header values to an array of complex types is supported when the type has `TryParse` implemented. The following code binds to a string array and returns all the items with the specified tags:

[language="csharp" source="\~/fundamentals/minimal-apis/bindingArrays/7.0-samples/todo/Program.cs" id="snippet_bind_str_array"::: (complete source file; reference: \~/fundamentals/minimal-apis/bindingArrays/7.0-samples/todo/Program.cs)](../../../../_code/aspnetcore/fundamentals/minimal-apis/bindingArrays/7.0-samples/todo/Program.cs.md)

The following code shows the model and the required `TryParse` implementation:

[language="csharp" source="\~/fundamentals/minimal-apis/bindingArrays/7.0-samples/todo/Program.cs" id="snippet_model"::: (complete source file; reference: \~/fundamentals/minimal-apis/bindingArrays/7.0-samples/todo/Program.cs)](../../../../_code/aspnetcore/fundamentals/minimal-apis/bindingArrays/7.0-samples/todo/Program.cs.md)

The following code binds to an `int` array:

[language="csharp" source="\~/fundamentals/minimal-apis/bindingArrays/7.0-samples/todo/Program.cs" id="snippet_iaray"::: (complete source file; reference: \~/fundamentals/minimal-apis/bindingArrays/7.0-samples/todo/Program.cs)](../../../../_code/aspnetcore/fundamentals/minimal-apis/bindingArrays/7.0-samples/todo/Program.cs.md)

To test the preceding code, add the following endpoint to populate the database with `Todo` items:

[language="csharp" source="\~/fundamentals/minimal-apis/bindingArrays/7.0-samples/todo/Program.cs" id="snippet_batch"::: (complete source file; reference: \~/fundamentals/minimal-apis/bindingArrays/7.0-samples/todo/Program.cs)](../../../../_code/aspnetcore/fundamentals/minimal-apis/bindingArrays/7.0-samples/todo/Program.cs.md)

Use a tool like [`HttpRepl`](../../../web-api/http-repl/index.md) to pass the following data to the previous endpoint:

[language="csharp" source="\~/fundamentals/minimal-apis/bindingArrays/7.0-samples/todo/Program.cs" id="batch_post_payload"::: (complete source file; reference: \~/fundamentals/minimal-apis/bindingArrays/7.0-samples/todo/Program.cs)](../../../../_code/aspnetcore/fundamentals/minimal-apis/bindingArrays/7.0-samples/todo/Program.cs.md)

The following code binds to the header key `X-Todo-Id` and returns the `Todo` items with matching `Id` values:

[language="csharp" source="\~/fundamentals/minimal-apis/bindingArrays/7.0-samples/todo/Program.cs" id="snippet_getHeader"::: (complete source file; reference: \~/fundamentals/minimal-apis/bindingArrays/7.0-samples/todo/Program.cs)](../../../../_code/aspnetcore/fundamentals/minimal-apis/bindingArrays/7.0-samples/todo/Program.cs.md)

> **Note:**
> When binding a `string[]` from a query string, the absence of any matching query string value will result in an empty array instead of a null value.

<a name="asparam7"></a>

## Parameter binding for argument lists with [AsParameters]

[Microsoft.AspNetCore.Http.AsParametersAttribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.AsParametersAttribute) enables simple parameter binding to types and not complex or recursive model binding.

Consider the following code:

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/fundamentals/minimal-apis/samples/arg-lists/Program.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/minimal-apis/includes/parameter-binding8-10.md)

Consider the following `GET` endpoint:

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/fundamentals/minimal-apis/samples/arg-lists/Program.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/minimal-apis/includes/parameter-binding8-10.md)

The following `struct` can be used to replace the preceding highlighted parameters:

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/fundamentals/minimal-apis/samples/arg-lists/Models/TodoDb.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/minimal-apis/includes/parameter-binding8-10.md)

The refactored `GET` endpoint uses the preceding `struct` with the [AsParameters](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.http.asparametersattribute?view=aspnetcore-7.0\&preserve-view=true) attribute:

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/fundamentals/minimal-apis/samples/arg-lists/Program.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/minimal-apis/includes/parameter-binding8-10.md)

The following code shows additional endpoints in the app:

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/fundamentals/minimal-apis/samples/arg-lists/Program.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/minimal-apis/includes/parameter-binding8-10.md)

The following classes are used to refactor the parameter lists:

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/fundamentals/minimal-apis/samples/arg-lists/Models/TodoDb.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/minimal-apis/includes/parameter-binding8-10.md)

The following code shows the refactored endpoints using `AsParameters` and the preceding `struct` and classes:

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/fundamentals/minimal-apis/samples/arg-lists/Program.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/minimal-apis/includes/parameter-binding8-10.md)

The following [`record`](https://learn.microsoft.com/dotnet/csharp/language-reference/builtin-types/record) types can be used to replace the preceding parameters:

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/fundamentals/minimal-apis/samples/arg-lists/Models/TodoRecord.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/minimal-apis/includes/parameter-binding8-10.md)

Using a `struct` with `AsParameters` can be more performant than using a `record` type.

The [complete sample code](https://github.com/dotnet/AspNetCore.Docs.Samples/tree/main/fundamentals/minimal-apis/samples/arg-lists) in the [AspNetCore.Docs.Samples](https://github.com/dotnet/AspNetCore.Docs.Samples) repository.

## Custom Binding

There are three ways to customize parameter binding:

1. For route, query, and header binding sources, bind custom types by adding a static `TryParse` method for the type.
1. Control the binding process by implementing a `BindAsync` method on a type.
1. For advanced scenarios, implement the [Microsoft.AspNetCore.Http.IBindableFromHttpContext%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IBindableFromHttpContext%25601) interface to provide custom binding logic directly from the `HttpContext`.

### TryParse

`TryParse` has two APIs:

```csharp
public static bool TryParse(string value, out T result);
public static bool TryParse(string value, IFormatProvider provider, out T result);
```

The following code displays `Point: 12.3, 10.1` with the URI `/map?Point=12.3,10.1`:

[language="csharp" source="\~/fundamentals/minimal-apis/7.0-samples/WebMinAPIs/Program.cs" id="snippet_cb"::: (complete source file; reference: \~/fundamentals/minimal-apis/7.0-samples/WebMinAPIs/Program.cs)](../../../../_code/aspnetcore/fundamentals/minimal-apis/7.0-samples/WebMinAPIs/Program.cs.md)

### BindAsync

`BindAsync` has the following APIs:

```csharp
public static ValueTask<T?> BindAsync(HttpContext context, ParameterInfo parameter);
public static ValueTask<T?> BindAsync(HttpContext context);
```

The following code displays `SortBy:xyz, SortDirection:Desc, CurrentPage:99` with the URI `/products?SortBy=xyz&SortDir=Desc&Page=99`:

[language="csharp" source="\~/fundamentals/minimal-apis/7.0-samples/WebMinAPIs/Program.cs" id="snippet_ba"::: (complete source file; reference: \~/fundamentals/minimal-apis/7.0-samples/WebMinAPIs/Program.cs)](../../../../_code/aspnetcore/fundamentals/minimal-apis/7.0-samples/WebMinAPIs/Program.cs.md)

<a name="bf"></a>

### Custom parameter binding with `IBindableFromHttpContext`

ASP.NET Core provides support for custom parameter binding in Minimal APIs using the [Microsoft.AspNetCore.Http.IBindableFromHttpContext%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IBindableFromHttpContext%25601) interface. This interface, introduced with C# 11's static abstract members, allows you to create types that can be bound from an HTTP context directly in route handler parameters.

```csharp
public interface IBindableFromHttpContext<TSelf>
    where TSelf : class, IBindableFromHttpContext<TSelf>
{
    static abstract ValueTask<TSelf?> BindAsync(HttpContext context, ParameterInfo parameter);
}
```

By implementing the [Microsoft.AspNetCore.Http.IBindableFromHttpContext%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IBindableFromHttpContext%25601), you can create custom types that handle their own binding logic from the `HttpContext`. When a route handler includes a parameter of this type, the framework automatically calls the static `BindAsync` method to create the instance:

[language="csharp" source="\~/fundamentals/minimal-apis/10.0-samples/CustomBindingExample/Program.cs" id="snippet_IBindableFromHttpContext"::: (complete source file; reference: \~/fundamentals/minimal-apis/10.0-samples/CustomBindingExample/Program.cs)](../../../../_code/aspnetcore/fundamentals/minimal-apis/10.0-samples/CustomBindingExample/Program.cs.md)

The following is an example implementation of a custom parameter that binds from an HTTP header:

[language="csharp" source="\~/fundamentals/minimal-apis/10.0-samples/CustomBindingExample/CustomBoundParameters.cs"::: (complete source file; reference: \~/fundamentals/minimal-apis/10.0-samples/CustomBindingExample/CustomBoundParameters.cs)](../../../../_code/aspnetcore/fundamentals/minimal-apis/10.0-samples/CustomBindingExample/CustomBoundParameters.cs.md)

You can also implement validation within your custom binding logic:

[language="csharp" source="\~/fundamentals/minimal-apis/10.0-samples/CustomBindingExample/Program.cs" id="snippet_Validation"::: (complete source file; reference: \~/fundamentals/minimal-apis/10.0-samples/CustomBindingExample/Program.cs)](../../../../_code/aspnetcore/fundamentals/minimal-apis/10.0-samples/CustomBindingExample/Program.cs.md)

[View or download the sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/fundamentals/minimal-apis/10.0-samples/CustomBindingExample) ([how to download](https://learn.microsoft.com/search/?terms=index%23how-to-download-a-sample))

## Binding failures

When binding fails, the framework logs a debug message and returns various status codes to the client depending on the failure mode.

| Failure mode | Nullable Parameter Type | Binding Source | Status code |
| --- | --- | --- | --- |
| `{ParameterType}.TryParse` returns `false` | yes | route/query/header | 400 |
| `{ParameterType}.BindAsync` returns `null` | yes | custom | 400 |
| `{ParameterType}.BindAsync` throws | doesn't matter | custom | 500 |
| Failure to deserialize JSON body | doesn't matter | body | 400 |
| Wrong content type (not `application/json`) | doesn't matter | body | 415 |

## Binding Precedence

The rules for determining a binding source from a parameter:

1. Explicit attribute defined on parameter (From* attributes) in the following order:
    1. Route values: [`[FromRoute]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.FromRouteAttribute)
    1. Query string: [`[FromQuery]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.FromQueryAttribute)
    1. Header: [`[FromHeader]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.FromHeaderAttribute)
    1. Body: [`[FromBody]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.FromBodyAttribute)
    1. Form: [`[FromForm]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.FromFormAttribute)
    1. Service: [`[FromServices]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.FromServicesAttribute)
    1. Parameter values: [`[AsParameters]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.AsParametersAttribute)
1. Special types
    1. [`HttpContext`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpContext)
    1. [`HttpRequest`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpRequest) ([`HttpContext.Request`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpContext.Request))
    1. [`HttpResponse`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpResponse) ([`HttpContext.Response`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpContext.Response))
    1. [`ClaimsPrincipal`](https://learn.microsoft.com/search/?terms=System.Security.Claims.ClaimsPrincipal) ([`HttpContext.User`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpContext.User))
    1. [`CancellationToken`](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken) ([`HttpContext.RequestAborted`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpContext.RequestAborted))
    1. [`IFormCollection`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IFormCollection) ([`HttpContext.Request.Form`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IFormCollection))
    1. [`IFormFileCollection`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IFormFileCollection) ([`HttpContext.Request.Form.Files`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IFormCollection.Files))
    1. [`IFormFile`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IFormFile) ([`HttpContext.Request.Form.Files[paramName]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IFormFileCollection.Item\(System.String\)))
    1. [`Stream`](https://learn.microsoft.com/search/?terms=System.IO.Stream) ([`HttpContext.Request.Body`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpRequest.Body))
    1. [`PipeReader`](https://learn.microsoft.com/search/?terms=System.IO.Pipelines.PipeReader) ([`HttpContext.Request.BodyReader`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpRequest.BodyReader))
1. Parameter type has a valid static [`BindAsync`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IBindableFromHttpContext%25601.BindAsync%252A) method.
1. Parameter type is a string or has a valid static [`TryParse`](https://learn.microsoft.com/search/?terms=System.IParsable%25601.TryParse%252A) method.
   1. If the parameter name exists in the route template for example, `app.Map("/todo/{id}", (int id) => {});`, then it's bound from the route.
   1. Bound from the query string.
1. If the parameter type is a service provided by dependency injection, it uses that service as the source.
1. The parameter is from the body.

## Configure JSON deserialization options for body binding

The body binding source uses [System.Text.Json](https://learn.microsoft.com/search/?terms=System.Text.Json) for deserialization. It is ***not*** possible to change this default, but JSON serialization and deserialization options can be configured.

### Configure JSON deserialization options globally

Options that apply globally for an app can be configured by invoking [Microsoft.Extensions.DependencyInjection.HttpJsonServiceExtensions.ConfigureHttpJsonOptions%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.HttpJsonServiceExtensions.ConfigureHttpJsonOptions%252A). The following example includes public fields and formats JSON output.

[language="csharp" source="\~/fundamentals/minimal-apis/7.0-samples/WebMinJson/Program.cs" id="snippet_confighttpjsonoptions" highlight="3-6"::: (complete source file; reference: \~/fundamentals/minimal-apis/7.0-samples/WebMinJson/Program.cs)](../../../../_code/aspnetcore/fundamentals/minimal-apis/7.0-samples/WebMinJson/Program.cs.md)

Since the sample code configures both serialization and deserialization, it can read `NameField` and include `NameField` in the output JSON.

### Configure JSON deserialization options for an endpoint

[Microsoft.AspNetCore.Http.HttpRequestJsonExtensions.ReadFromJsonAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpRequestJsonExtensions.ReadFromJsonAsync%252A) has overloads that accept a [System.Text.Json.JsonSerializerOptions](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions) object. The following example includes public fields and formats JSON output.

[language="csharp" source="\~/fundamentals/minimal-apis/7.0-samples/WebMinJson/Program.cs" id="snippet_readfromjsonasyncwithoptions" highlight="5-8,12"::: (complete source file; reference: \~/fundamentals/minimal-apis/7.0-samples/WebMinJson/Program.cs)](../../../../_code/aspnetcore/fundamentals/minimal-apis/7.0-samples/WebMinJson/Program.cs.md)

Since the preceding code applies the customized options only to deserialization, the output JSON excludes `NameField`.

## Read the request body

Read the request body directly using a [Microsoft.AspNetCore.Http.HttpContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpContext) or [Microsoft.AspNetCore.Http.HttpRequest](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpRequest) parameter:

[language="csharp" source="\~/fundamentals/minimal-apis/7.0-samples/WebMinAPIs/Program.cs" id="snippet_fileupload"::: (complete source file; reference: \~/fundamentals/minimal-apis/7.0-samples/WebMinAPIs/Program.cs)](../../../../_code/aspnetcore/fundamentals/minimal-apis/7.0-samples/WebMinAPIs/Program.cs.md)

The preceding code:

* Accesses the request body using [Microsoft.AspNetCore.Http.HttpRequest.BodyReader](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpRequest.BodyReader).
* Copies the request body to a local file.
