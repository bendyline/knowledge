**Applies to: \>= aspnetcore-6.0 < aspnetcore-10.0**

This article explains how to handle JSON Patch requests in an ASP.NET Core web API.

> **Important:**
> The JSON Patch standard has ***inherent security risks***. This implementation ***doesn't attempt to mitigate these inherent security risks***. It's the responsibility of the developer to ensure that the JSON Patch document is safe to apply to the target object. For more information, see the [Mitigating Security Risks](#mitigating-security-risks) section.

## Package installation

JSON Patch support in ASP.NET Core web API is based on `Newtonsoft.Json` and requires the [`Microsoft.AspNetCore.Mvc.NewtonsoftJson`](https://www.nuget.org/packages/Microsoft.AspNetCore.Mvc.NewtonsoftJson/) NuGet package. 

To enable JSON Patch support:

* Install the [`Microsoft.AspNetCore.Mvc.NewtonsoftJson`](https://www.nuget.org/packages/Microsoft.AspNetCore.Mvc.NewtonsoftJson/) NuGet package.
* Call [Microsoft.Extensions.DependencyInjection.NewtonsoftJsonMvcBuilderExtensions.AddNewtonsoftJson%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.NewtonsoftJsonMvcBuilderExtensions.AddNewtonsoftJson%252A). For example:

  [language="csharp" source="\~/web-api/jsonpatch/samples/6.x/api/Program.cs" id="snippet1" highlight="4"::: (complete source file; reference: \~/web-api/jsonpatch/samples/6.x/api/Program.cs)](../../../../_code/aspnetcore/web-api/jsonpatch/samples/6.x/api/Program.cs.md)

`AddNewtonsoftJson` replaces the default `System.Text.Json`-based input and output formatters used for formatting ***all*** JSON content. This extension method is compatible with the following MVC service registration methods:

* [Microsoft.Extensions.DependencyInjection.MvcServiceCollectionExtensions.AddRazorPages%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.MvcServiceCollectionExtensions.AddRazorPages%252A)
* [Microsoft.Extensions.DependencyInjection.MvcServiceCollectionExtensions.AddControllersWithViews%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.MvcServiceCollectionExtensions.AddControllersWithViews%252A)
* [Microsoft.Extensions.DependencyInjection.MvcServiceCollectionExtensions.AddControllers%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.MvcServiceCollectionExtensions.AddControllers%252A)

JsonPatch requires setting the `Content-Type` header to `application/json-patch+json`.

## Add support for JSON Patch when using System.Text.Json

The `System.Text.Json`-based input formatter doesn't support JSON Patch. To add support for JSON Patch using `Newtonsoft.Json`, while leaving the other input and output formatters unchanged:

* Install the [`Microsoft.AspNetCore.Mvc.NewtonsoftJson`](https://www.nuget.org/packages/Microsoft.AspNetCore.Mvc.NewtonsoftJson/) NuGet package.
* Update `Program.cs`:

  [language="csharp" source="\~/web-api/jsonpatch/samples/6.x/api/Program.cs" id="snippet_both" highlight="6-9"::: (complete source file; reference: \~/web-api/jsonpatch/samples/6.x/api/Program.cs)](../../../../_code/aspnetcore/web-api/jsonpatch/samples/6.x/api/Program.cs.md)
  [language="csharp" source="\~/web-api/jsonpatch/samples/6.x/api/MyJPIF.cs"::: (complete source file; reference: \~/web-api/jsonpatch/samples/6.x/api/MyJPIF.cs)](../../../../_code/aspnetcore/web-api/jsonpatch/samples/6.x/api/MyJPIF.cs.md)

The preceding code creates an instance of [Microsoft.AspNetCore.Mvc.Formatters.NewtonsoftJsonPatchInputFormatter](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Formatters.NewtonsoftJsonPatchInputFormatter) and inserts it as the first entry in the [Microsoft.AspNetCore.Mvc.MvcOptions.InputFormatters%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.MvcOptions.InputFormatters%252A) collection. This order of registration ensures that:

* `NewtonsoftJsonPatchInputFormatter` processes JSON Patch requests.
* The existing `System.Text.Json`-based input and formatters process all other JSON requests and responses.

Use the `Newtonsoft.Json.JsonConvert.SerializeObject` method to serialize a [Microsoft.AspNetCore.JsonPatch.JsonPatchDocument](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.JsonPatch.JsonPatchDocument).

## PATCH HTTP request method

The PUT and [PATCH](https://tools.ietf.org/html/rfc5789) methods are used to update an existing resource. The difference between them is that PUT replaces the entire resource, while PATCH specifies only the changes.

## JSON Patch

[JSON Patch](https://tools.ietf.org/html/rfc6902) is a format for specifying updates to be applied to a resource. A JSON Patch document has an array of *operations*. Each operation identifies a particular type of change. Examples of such changes include adding an array element or replacing a property value.

For example, the following JSON documents represent a resource, a JSON Patch document for the resource, and the result of applying the Patch operations.

### Resource example

[language="json" source="\~/web-api/jsonpatch/snippets/customer.json"::: (complete source file; reference: \~/web-api/jsonpatch/snippets/customer.json)](../../../../_code/aspnetcore/web-api/jsonpatch/snippets/customer.json.md)

### JSON patch example

[language="json" source="\~/web-api/jsonpatch/snippets/add.json"::: (complete source file; reference: \~/web-api/jsonpatch/snippets/add.json)](../../../../_code/aspnetcore/web-api/jsonpatch/snippets/add.json.md)

In the preceding JSON:

* The `op` property indicates the type of operation.
* The `path` property indicates the element to update.
* The `value` property provides the new value.

### Resource after patch

Here's the resource after applying the preceding JSON Patch document:

```json
{
  "customerName": "Barry",
  "orders": [
    {
      "orderName": "Order0",
      "orderType": null
    },
    {
      "orderName": "Order1",
      "orderType": null
    },
    {
      "orderName": "Order2",
      "orderType": null
    }
  ]
}
```

The changes made by applying a JSON Patch document to a resource are atomic. If any operation in the list fails, no operation in the list is applied.

## Path syntax

The [path](https://tools.ietf.org/html/rfc6901) property of an operation object has slashes between levels. For example, `"/address/zipCode"`.

Zero-based indexes are used to specify array elements. The first element of the `addresses` array would be at `/addresses/0`. To `add` to the end of an array, use a hyphen (`-`) rather than an index number: `/addresses/-`.

### Operations

The following table shows supported operations as defined in the [JSON Patch specification](https://tools.ietf.org/html/rfc6902).

| Operation | Notes |
| --- | --- |
| `add` | Add a property or array element. For existing property: set value. |
| `remove` | Remove a property or array element. |
| `replace` | Same as `remove` followed by `add` at same location. |
| `move` | Same as `remove` from source followed by `add` to destination using value from source. |
| `copy` | Same as `add` to destination using value from source. |
| `test` | Return success status code if value at `path` = provided `value`. |

## JSON Patch in ASP.NET Core

The ASP.NET Core implementation of JSON Patch is provided in the [Microsoft.AspNetCore.JsonPatch](https://www.nuget.org/packages/microsoft.aspnetcore.jsonpatch/) NuGet package.

## Action method code

In an API controller, an action method for JSON Patch:

* Is annotated with the `HttpPatch` attribute.
* Accepts a [Microsoft.AspNetCore.JsonPatch.JsonPatchDocument%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.JsonPatch.JsonPatchDocument%25601), typically with [`[FromBody]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.FromBodyAttribute).
* Calls [Microsoft.AspNetCore.JsonPatch.JsonPatchDocument.ApplyTo(System.Object)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.JsonPatch.JsonPatchDocument.ApplyTo(System.Object)) on the patch document to apply the changes.

Here's an example:

[language="csharp" source="\~/web-api/jsonpatch/samples/3.x/api/Controllers/HomeController.cs" id="snippet_PatchAction" highlight="1,3,9"::: (complete source file; reference: \~/web-api/jsonpatch/samples/3.x/api/Controllers/HomeController.cs)](../../../../_code/aspnetcore/web-api/jsonpatch/samples/3.x/api/Controllers/HomeController.cs.md)

This code from the sample app works with the following `Customer` model:

[language="csharp" source="\~/web-api/jsonpatch/samples/6.x/api/Models/Customer.cs"::: (complete source file; reference: \~/web-api/jsonpatch/samples/6.x/api/Models/Customer.cs)](../../../../_code/aspnetcore/web-api/jsonpatch/samples/6.x/api/Models/Customer.cs.md)

[language="csharp" source="\~/web-api/jsonpatch/samples/6.x/api/Models/Order.cs"::: (complete source file; reference: \~/web-api/jsonpatch/samples/6.x/api/Models/Order.cs)](../../../../_code/aspnetcore/web-api/jsonpatch/samples/6.x/api/Models/Order.cs.md)

The sample action method:

* Constructs a `Customer`.
* Applies the patch.
* Returns the result in the body of the response.

In a real app, the code would retrieve the data from a store such as a database and update the database after applying the patch.

### Model state

The preceding action method example calls an overload of `ApplyTo` that takes model state as one of its parameters. With this option, you can get error messages in responses. The following example shows the body of a 400 Bad Request response for a `test` operation:

```json
{
  "Customer": [
    "The current value 'John' at path 'customerName' != test value 'Nancy'."
  ]
}
```

### Dynamic objects

The following action method example shows how to apply a patch to a dynamic object:

[language="csharp" source="\~/web-api/jsonpatch/samples/6.x/api/Controllers/HomeController.cs" id="snippet_Dynamic"::: (complete source file; reference: \~/web-api/jsonpatch/samples/6.x/api/Controllers/HomeController.cs)](../../../../_code/aspnetcore/web-api/jsonpatch/samples/6.x/api/Controllers/HomeController.cs.md)

## The add operation

* If `path` points to an array element: inserts new element before the one specified by `path`.
* If `path` points to a property: sets the property value.
* If `path` points to a nonexistent location:
  * If the resource to patch is a dynamic object: adds a property.
  * If the resource to patch is a static object: the request fails.

The following sample patch document sets the value of `CustomerName` and adds an `Order` object to the end of the `Orders` array.

[language="json" source="\~/web-api/jsonpatch/snippets/add.json"::: (complete source file; reference: \~/web-api/jsonpatch/snippets/add.json)](../../../../_code/aspnetcore/web-api/jsonpatch/snippets/add.json.md)

## The remove operation

* If `path` points to an array element: removes the element.
* If `path` points to a property:
  * If resource to patch is a dynamic object: removes the property.
  * If resource to patch is a static object:
    * If the property is nullable: sets it to null.
    * If the property is non-nullable, sets it to `default<T>`.

The following sample patch document sets `CustomerName` to null and deletes `Orders[0]`:

[language="json" source="\~/web-api/jsonpatch/snippets/remove.json"::: (complete source file; reference: \~/web-api/jsonpatch/snippets/remove.json)](../../../../_code/aspnetcore/web-api/jsonpatch/snippets/remove.json.md)

## The replace operation

This operation is functionally the same as a `remove` followed by an `add`.

The following sample patch document sets the value of `CustomerName` and replaces `Orders[0]`with a new `Order` object:

[language="json" source="\~/web-api/jsonpatch/snippets/replace.json"::: (complete source file; reference: \~/web-api/jsonpatch/snippets/replace.json)](../../../../_code/aspnetcore/web-api/jsonpatch/snippets/replace.json.md)

## The move operation

* If `path` points to an array element: copies `from` element to location of `path` element, then runs a `remove` operation on the `from` element.
* If `path` points to a property: copies value of `from` property to `path` property, then runs a `remove` operation on the `from` property.
* If `path` points to a nonexistent property:
  * If the resource to patch is a static object: the request fails.
  * If the resource to patch is a dynamic object: copies `from` property to location indicated by `path`, then runs a `remove` operation on the `from` property.

The following sample patch document:

* Copies the value of `Orders[0].OrderName` to `CustomerName`.
* Sets `Orders[0].OrderName` to null.
* Moves `Orders[1]` to before `Orders[0]`.

[language="json" source="\~/web-api/jsonpatch/snippets/move.json"::: (complete source file; reference: \~/web-api/jsonpatch/snippets/move.json)](../../../../_code/aspnetcore/web-api/jsonpatch/snippets/move.json.md)

## The copy operation

This operation is functionally the same as a `move` operation without the final `remove` step.

The following sample patch document:

* Copies the value of `Orders[0].OrderName` to `CustomerName`.
* Inserts a copy of `Orders[1]` before `Orders[0]`.

[language="json" source="\~/web-api/jsonpatch/snippets/copy.json"::: (complete source file; reference: \~/web-api/jsonpatch/snippets/copy.json)](../../../../_code/aspnetcore/web-api/jsonpatch/snippets/copy.json.md)

## The test operation

If the value at the location indicated by `path` is different from the value provided in `value`, the request fails. In that case, the whole PATCH request fails even if all other operations in the patch document would otherwise succeed.

The `test` operation is commonly used to prevent an update when there's a concurrency conflict.

The following sample patch document has no effect if the initial value of `CustomerName` is "John", because the test fails:

[language="json" source="\~/web-api/jsonpatch/snippets/test-fail.json"::: (complete source file; reference: \~/web-api/jsonpatch/snippets/test-fail.json)](../../../../_code/aspnetcore/web-api/jsonpatch/snippets/test-fail.json.md)

## Get the code

[View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/web-api/jsonpatch/samples). ([How to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample)).

To test the sample, run the app and send HTTP requests with the following settings:

* URL: `http://localhost:{port}/jsonpatch/jsonpatchwithmodelstate`
* HTTP method: `PATCH`
* Header: `Content-Type: application/json-patch+json`
* Body: Copy and paste one of the JSON patch document samples from the *JSON* project folder.

## Mitigating security risks

When using the `Microsoft.AspNetCore.JsonPatch` package with the `Newtonsoft.Json`-based implementation, it's critical to understand and mitigate potential security risks. The following sections outline the identified security risks associated with JSON Patch and provide recommended mitigations to ensure secure usage of the package.

> **Important:**
> ***This is not an exhaustive list of threats.*** App developers must conduct their own threat model reviews to determine an app-specific comprehensive list and come up with appropriate mitigations as needed. For example, apps which expose collections to patch operations should consider the potential for algorithmic complexity attacks if those operations insert or remove elements at the beginning of the collection.

By running comprehensive threat models for their own apps and addressing identified threats while following the recommended mitigations below, consumers of these packages can integrate JSON Patch functionality into their apps while minimizing security risks.

### Denial of Service (DoS) via memory amplification

* **Scenario**: A malicious client submits a `copy` operation that duplicates large object graphs multiple times, leading to excessive memory consumption.
* **Impact**: Potential Out-Of-Memory (OOM) conditions, causing service disruptions.
* **Mitigation**:
  * Validate incoming JSON Patch documents for size and structure before calling `ApplyTo`.
  * The validation needs to be app specific, but an example validation can look similar to the following:

```csharp
public void Validate(JsonPatchDocument patch)
{
    // This is just an example. It's up to the developer to make sure that
    // this case is handled properly, based on the app needs.
    if (patch.Operations.Where(op => op.OperationType == OperationType.Copy).Count()
                              > MaxCopyOperationsCount)
    {
        throw new InvalidOperationException();
    }
}
```

### Business Logic Subversion

* **Scenario**: Patch operations can manipulate fields with implicit invariants (for example, internal flags, IDs, or computed fields), violating business constraints.
* **Impact**: Data integrity issues and unintended app behavior.
* **Mitigation**:
  * Use POCO objects with explicitly defined properties that are safe to modify.
  * Avoid exposing sensitive or security-critical properties in the target object.
  * If no POCO object is used, validate the patched object after applying operations to ensure business rules and invariants aren't violated.

### Authentication and authorization

* **Scenario**: Unauthenticated or unauthorized clients send malicious JSON Patch requests.
* **Impact**: Unauthorized access to modify sensitive data or disrupt app behavior.
* **Mitigation**:
  * Protect endpoints accepting JSON Patch requests with proper authentication and authorization mechanisms.
  * Restrict access to trusted clients or users with appropriate permissions.

## Additional resources

* [IETF RFC 5789 PATCH method specification](https://tools.ietf.org/html/rfc5789)
* [IETF RFC 6902 JSON Patch specification](https://tools.ietf.org/html/rfc6902)
* [IETF RFC 6901 JSON Pointer](https://tools.ietf.org/html/rfc6901)
* [ASP.NET Core JSON Patch source code](https://github.com/dotnet/AspNetCore/tree/main/src/Features/JsonPatch/src)



**Applies to: < aspnetcore-6.0**

This article explains how to handle JSON Patch requests in an ASP.NET Core web API.

> **Important:**
> The JSON Patch standard has ***inherent security risks***. Since these risks are inherent to the JSON Patch standard, this implementation ***doesn't attempt to mitigate inherent security risks***. It's the responsibility of the developer to ensure that the JSON Patch document is safe to apply to the target object. For more information, see the [Mitigating Security Risks](#mitigating-security-risks) section.

## Package installation

To enable JSON Patch support in your app, complete the following steps:

1. Install the [`Microsoft.AspNetCore.Mvc.NewtonsoftJson`](https://www.nuget.org/packages/Microsoft.AspNetCore.Mvc.NewtonsoftJson/) NuGet package.
1. Update the project's `Startup.ConfigureServices` method to call [Microsoft.Extensions.DependencyInjection.NewtonsoftJsonMvcBuilderExtensions.AddNewtonsoftJson%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.NewtonsoftJsonMvcBuilderExtensions.AddNewtonsoftJson%252A). For example:

    ```csharp
    services
        .AddControllersWithViews()
        .AddNewtonsoftJson();
    ```

`AddNewtonsoftJson` is compatible with the MVC service registration methods:

* [Microsoft.Extensions.DependencyInjection.MvcServiceCollectionExtensions.AddRazorPages%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.MvcServiceCollectionExtensions.AddRazorPages%252A)
* [Microsoft.Extensions.DependencyInjection.MvcServiceCollectionExtensions.AddControllersWithViews%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.MvcServiceCollectionExtensions.AddControllersWithViews%252A)
* [Microsoft.Extensions.DependencyInjection.MvcServiceCollectionExtensions.AddControllers%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.MvcServiceCollectionExtensions.AddControllers%252A)

## JSON Patch, AddNewtonsoftJson, and System.Text.Json

`AddNewtonsoftJson` replaces the `System.Text.Json`-based input and output formatters used for formatting **all** JSON content. To add support for JSON Patch using `Newtonsoft.Json`, while leaving the other formatters unchanged, update the project's `Startup.ConfigureServices` method as follows:

[language="csharp" source="\~/web-api/jsonpatch/samples/3.x/WebApp1/Startup.cs" id="snippet"::: (complete source file; reference: \~/web-api/jsonpatch/samples/3.x/WebApp1/Startup.cs)](../../../../_code/aspnetcore/web-api/jsonpatch/samples/3.x/WebApp1/Startup.cs.md)

The preceding code requires the `Microsoft.AspNetCore.Mvc.NewtonsoftJson` package and the following `using` statements:

[language="csharp" source="\~/web-api/jsonpatch/samples/3.x/WebApp1/Startup.cs" id="snippet1"::: (complete source file; reference: \~/web-api/jsonpatch/samples/3.x/WebApp1/Startup.cs)](../../../../_code/aspnetcore/web-api/jsonpatch/samples/3.x/WebApp1/Startup.cs.md)

Use the `Newtonsoft.Json.JsonConvert.SerializeObject` method to serialize a JsonPatchDocument.

## PATCH HTTP request method

The PUT and [PATCH](https://tools.ietf.org/html/rfc5789) methods are used to update an existing resource. The difference between them is that PUT replaces the entire resource, while PATCH specifies only the changes.

## JSON Patch

[JSON Patch](https://tools.ietf.org/html/rfc6902) is a format for specifying updates to be applied to a resource. A JSON Patch document has an array of *operations*. Each operation identifies a particular type of change. Examples of such changes include adding an array element or replacing a property value.

For example, the following JSON documents represent a resource, a JSON Patch document for the resource, and the result of applying the Patch operations.

### Resource example

[language="json" source="\~/web-api/jsonpatch/snippets/customer.json"::: (complete source file; reference: \~/web-api/jsonpatch/snippets/customer.json)](../../../../_code/aspnetcore/web-api/jsonpatch/snippets/customer.json.md)

### JSON patch example

[language="json" source="\~/web-api/jsonpatch/snippets/add.json"::: (complete source file; reference: \~/web-api/jsonpatch/snippets/add.json)](../../../../_code/aspnetcore/web-api/jsonpatch/snippets/add.json.md)

In the preceding JSON:

* The `op` property indicates the type of operation.
* The `path` property indicates the element to update.
* The `value` property provides the new value.

### Resource after patch

Here's the resource after applying the preceding JSON Patch document:

```json
{
  "customerName": "Barry",
  "orders": [
    {
      "orderName": "Order0",
      "orderType": null
    },
    {
      "orderName": "Order1",
      "orderType": null
    },
    {
      "orderName": "Order2",
      "orderType": null
    }
  ]
}
```

The changes made by applying a JSON Patch document to a resource are atomic. If any operation in the list fails, no operation in the list is applied.

## Path syntax

The [path](https://tools.ietf.org/html/rfc6901) property of an operation object has slashes between levels. For example, `"/address/zipCode"`.

Zero-based indexes are used to specify array elements. The first element of the `addresses` array would be at `/addresses/0`. To `add` to the end of an array, use a hyphen (`-`) rather than an index number: `/addresses/-`.

### Operations

The following table shows supported operations as defined in the [JSON Patch specification](https://tools.ietf.org/html/rfc6902).

| Operation | Notes |
| --- | --- |
| `add` | Add a property or array element. For existing property: set value. |
| `remove` | Remove a property or array element. |
| `replace` | Same as `remove` followed by `add` at same location. |
| `move` | Same as `remove` from source followed by `add` to destination using value from source. |
| `copy` | Same as `add` to destination using value from source. |
| `test` | Return success status code if value at `path` = provided `value`. |

## JSON Patch in ASP.NET Core

The ASP.NET Core implementation of JSON Patch is provided in the [Microsoft.AspNetCore.JsonPatch](https://www.nuget.org/packages/microsoft.aspnetcore.jsonpatch/) NuGet package.

## Action method code

In an API controller, an action method for JSON Patch:

* Is annotated with the `HttpPatch` attribute.
* Accepts a `JsonPatchDocument<T>`, typically with `[FromBody]`.
* Calls `ApplyTo` on the patch document to apply the changes.

Here's an example:

[language="csharp" source="\~/web-api/jsonpatch/samples/3.x/api/Controllers/HomeController.cs" id="snippet_PatchAction" highlight="1,3,9"::: (complete source file; reference: \~/web-api/jsonpatch/samples/3.x/api/Controllers/HomeController.cs)](../../../../_code/aspnetcore/web-api/jsonpatch/samples/3.x/api/Controllers/HomeController.cs.md)

This code from the sample app works with the following `Customer` model:

[language="csharp" source="\~/web-api/jsonpatch/samples/3.x/api/Models/Customer.cs"::: (complete source file; reference: \~/web-api/jsonpatch/samples/3.x/api/Models/Customer.cs)](../../../../_code/aspnetcore/web-api/jsonpatch/samples/3.x/api/Models/Customer.cs.md)

[language="csharp" source="\~/web-api/jsonpatch/samples/3.x/api/Models/Order.cs"::: (complete source file; reference: \~/web-api/jsonpatch/samples/3.x/api/Models/Order.cs)](../../../../_code/aspnetcore/web-api/jsonpatch/samples/3.x/api/Models/Order.cs.md)

The sample action method:

* Constructs a `Customer`.
* Applies the patch.
* Returns the result in the body of the response.

In a real app, the code would retrieve the data from a store such as a database and update the database after applying the patch.

### Model state

The preceding action method example calls an overload of `ApplyTo` that takes model state as one of its parameters. With this option, you can get error messages in responses. The following example shows the body of a 400 Bad Request response for a `test` operation:

```json
{
    "Customer": [
        "The current value 'John' at path 'customerName' is not equal to the test value 'Nancy'."
    ]
}
```

### Dynamic objects

The following action method example shows how to apply a patch to a dynamic object:

[language="csharp" source="\~/web-api/jsonpatch/samples/3.x/api/Controllers/HomeController.cs" id="snippet_Dynamic"::: (complete source file; reference: \~/web-api/jsonpatch/samples/3.x/api/Controllers/HomeController.cs)](../../../../_code/aspnetcore/web-api/jsonpatch/samples/3.x/api/Controllers/HomeController.cs.md)

## The add operation

* If `path` points to an array element: inserts new element before the one specified by `path`.
* If `path` points to a property: sets the property value.
* If `path` points to a nonexistent location:
  * If the resource to patch is a dynamic object: adds a property.
  * If the resource to patch is a static object: the request fails.

The following sample patch document sets the value of `CustomerName` and adds an `Order` object to the end of the `Orders` array.

[language="json" source="\~/web-api/jsonpatch/snippets/add.json"::: (complete source file; reference: \~/web-api/jsonpatch/snippets/add.json)](../../../../_code/aspnetcore/web-api/jsonpatch/snippets/add.json.md)

## The remove operation

* If `path` points to an array element: removes the element.
* If `path` points to a property:
  * If resource to patch is a dynamic object: removes the property.
  * If resource to patch is a static object:
    * If the property is nullable: sets it to null.
    * If the property is non-nullable, sets it to `default<T>`.

The following sample patch document sets `CustomerName` to null and deletes `Orders[0]`:

[language="json" source="\~/web-api/jsonpatch/snippets/remove.json"::: (complete source file; reference: \~/web-api/jsonpatch/snippets/remove.json)](../../../../_code/aspnetcore/web-api/jsonpatch/snippets/remove.json.md)

## The replace operation

This operation is functionally the same as a `remove` followed by an `add`.

The following sample patch document sets the value of `CustomerName` and replaces `Orders[0]`with a new `Order` object:

[language="json" source="\~/web-api/jsonpatch/snippets/replace.json"::: (complete source file; reference: \~/web-api/jsonpatch/snippets/replace.json)](../../../../_code/aspnetcore/web-api/jsonpatch/snippets/replace.json.md)

## The move operation

* If `path` points to an array element: copies `from` element to location of `path` element, then runs a `remove` operation on the `from` element.
* If `path` points to a property: copies value of `from` property to `path` property, then runs a `remove` operation on the `from` property.
* If `path` points to a nonexistent property:
  * If the resource to patch is a static object: the request fails.
  * If the resource to patch is a dynamic object: copies `from` property to location indicated by `path`, then runs a `remove` operation on the `from` property.

The following sample patch document:

* Copies the value of `Orders[0].OrderName` to `CustomerName`.
* Sets `Orders[0].OrderName` to null.
* Moves `Orders[1]` to before `Orders[0]`.

[language="json" source="\~/web-api/jsonpatch/snippets/move.json"::: (complete source file; reference: \~/web-api/jsonpatch/snippets/move.json)](../../../../_code/aspnetcore/web-api/jsonpatch/snippets/move.json.md)

## The copy operation

This operation is functionally the same as a `move` operation without the final `remove` step.

The following sample patch document:

* Copies the value of `Orders[0].OrderName` to `CustomerName`.
* Inserts a copy of `Orders[1]` before `Orders[0]`.

[language="json" source="\~/web-api/jsonpatch/snippets/copy.json"::: (complete source file; reference: \~/web-api/jsonpatch/snippets/copy.json)](../../../../_code/aspnetcore/web-api/jsonpatch/snippets/copy.json.md)

## The test operation

If the value at the location indicated by `path` is different from the value provided in `value`, the request fails. In that case, the whole PATCH request fails even if all other operations in the patch document would otherwise succeed.

The `test` operation is commonly used to prevent an update when there's a concurrency conflict.

The following sample patch document has no effect if the initial value of `CustomerName` is "John", because the test fails:

[language="json" source="\~/web-api/jsonpatch/snippets/test-fail.json"::: (complete source file; reference: \~/web-api/jsonpatch/snippets/test-fail.json)](../../../../_code/aspnetcore/web-api/jsonpatch/snippets/test-fail.json.md)

## Get the code

[View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/web-api/jsonpatch/samples). ([How to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample)).

To test the sample, run the app and send HTTP requests with the following settings:

* URL: `http://localhost:{port}/jsonpatch/jsonpatchwithmodelstate`
* HTTP method: `PATCH`
* Header: `Content-Type: application/json-patch+json`
* Body: Copy and paste one of the JSON patch document samples from the *JSON* project folder.
