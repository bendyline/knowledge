---
title: JsonPatch in ASP.NET Core web API
author: wadepickett
description: "JSON Patch in ASP.NET Core web API: Learn how to handle JSON Patch requests, apply partial updates, and improve API efficiency with System.Text.Json."
monikerRange: '>= aspnetcore-3.1'
ms.author: wpickett
ms.reviewer: wpickett
ms.date: 09/23/2026
uid: web-api/jsonpatch
---
# JSON Patch support in ASP.NET Core web API

**Applies to: \>= aspnetcore-10.0**

This article explains how to handle JSON Patch requests in an ASP.NET Core web API.

JSON Patch support in ASP.NET Core web API is based on [System.Text.Json](https://learn.microsoft.com/search/?terms=System.Text.Json) serialization, and requires the [`Microsoft.AspNetCore.JsonPatch.SystemTextJson`](https://www.nuget.org/packages/Microsoft.AspNetCore.JsonPatch.SystemTextJson) NuGet package. 

## What is the JSON Patch standard?

The JSON Patch standard:

* Is a standard format for describing changes to apply to a JSON document.
* Is defined in [RFC 6902](https://datatracker.ietf.org/doc/html/rfc6902) and is widely used in RESTful APIs to perform partial updates to JSON resources.
* Describes a sequence of operations that modify a JSON document such as:
  
  * `add`
  * `remove`
  * `replace`
  * `move`
  * `copy`
  * `test`

In web apps, JSON Patch is commonly used in a PATCH operation to perform partial updates of a resource. Rather than sending the entire resource for an update, clients can send a JSON Patch document containing only the changes. Patching reduces payload size and improves efficiency.

For an overview of the JSON Patch standard, see [jsonpatch.com](https://jsonpatch.com/).

## JSON Patch support in ASP.NET Core web API

JSON Patch support in ASP.NET Core web API is based on [System.Text.Json](https://learn.microsoft.com/search/?terms=System.Text.Json) serialization, starting with .NET 10. It implements [Microsoft.AspNetCore.JsonPatch](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.JsonPatch) based on [System.Text.Json](https://learn.microsoft.com/search/?terms=System.Text.Json) serialization. This feature:

* Requires the [`Microsoft.AspNetCore.JsonPatch.SystemTextJson`](https://www.nuget.org/packages/Microsoft.AspNetCore.JsonPatch.SystemTextJson) NuGet package. 
* Aligns with modern .NET practices by leveraging the [System.Text.Json](https://learn.microsoft.com/search/?terms=System.Text.Json) library, which is optimized for .NET.
* Provides improved performance and reduced memory usage compared to the legacy `Newtonsoft.Json`-based implementation. For more information on the legacy `Newtonsoft.Json`-based implementation, see the [.NET 9 version of this article](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/web-api/jsonpatch.md?view=aspnetcore-9.0\&preserve-view=true).

> **Note:**
> The implementation of [Microsoft.AspNetCore.JsonPatch](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.JsonPatch) based on [System.Text.Json](https://learn.microsoft.com/search/?terms=System.Text.Json) serialization isn't a drop-in replacement for the legacy `Newtonsoft.Json`-based implementation. It doesn't support dynamic types, such as [System.Dynamic.ExpandoObject](https://learn.microsoft.com/search/?terms=System.Dynamic.ExpandoObject).

> **Important:**
> The JSON Patch standard has ***inherent security risks***. Since these risks are inherent to the JSON Patch standard, the ASP.NET Core implementation ***doesn't attempt to mitigate inherent security risks***. It's the responsibility of the developer to ensure that the JSON Patch document is safe to apply to the target object. For more information, see the [Mitigating Security Risks](#mitigating-security-risks) section.

## Enable JSON Patch support with [System.Text.Json](https://learn.microsoft.com/search/?terms=System.Text.Json)

To enable JSON Patch support with [System.Text.Json](https://learn.microsoft.com/search/?terms=System.Text.Json), install the [`Microsoft.AspNetCore.JsonPatch.SystemTextJson`](https://www.nuget.org/packages/Microsoft.AspNetCore.JsonPatch.SystemTextJson) NuGet package.

```dotnetcli
dotnet add package Microsoft.AspNetCore.JsonPatch.SystemTextJson
```

This package provides a [Microsoft.AspNetCore.JsonPatch.SystemTextJson.JsonPatchDocument%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.JsonPatch.SystemTextJson.JsonPatchDocument%25601) class to represent a JSON Patch document for objects of type `TModel` and custom logic for serializing and deserializing JSON Patch documents using [System.Text.Json](https://learn.microsoft.com/search/?terms=System.Text.Json). The key method of the [Microsoft.AspNetCore.JsonPatch.SystemTextJson.JsonPatchDocument%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.JsonPatch.SystemTextJson.JsonPatchDocument%25601) class is [Microsoft.AspNetCore.JsonPatch.SystemTextJson.JsonPatchDocument.ApplyTo(System.Object)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.JsonPatch.SystemTextJson.JsonPatchDocument.ApplyTo(System.Object)), which applies the patch operations to a target object of type `TModel`.

## Minimal API PATCH endpoint applying JSON Patch

In a Minimal API, a PATCH endpoint for JSON Patch:

* Uses `MapPatch` to define the route.
* Accepts a [Microsoft.AspNetCore.JsonPatch.SystemTextJson.JsonPatchDocument%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.JsonPatch.SystemTextJson.JsonPatchDocument%25601) parameter.
* Calls [Microsoft.AspNetCore.JsonPatch.SystemTextJson.JsonPatchDocument.ApplyTo(System.Object)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.JsonPatch.SystemTextJson.JsonPatchDocument.ApplyTo(System.Object)) on the patch document to apply the changes.

### Example Minimal API PATCH endpoint

[language="csharp" source="\~/web-api/jsonpatch/samples/10.x/JsonPatchSample/CustomerApi.cs" id="snippet_PatchMethod"::: (complete source file; reference: \~/web-api/jsonpatch/samples/10.x/JsonPatchSample/CustomerApi.cs)](../../_code/aspnetcore/web-api/jsonpatch/samples/10.x/JsonPatchSample/CustomerApi.cs.md)

This code from the sample app works with the following `Customer` and `Order` models:

[language="csharp" source="\~/web-api/jsonpatch/samples/10.x/JsonPatchSample/Models/Customer.cs"::: (complete source file; reference: \~/web-api/jsonpatch/samples/10.x/JsonPatchSample/Models/Customer.cs)](../../_code/aspnetcore/web-api/jsonpatch/samples/10.x/JsonPatchSample/Models/Customer.cs.md)

[language="csharp" source="\~/web-api/jsonpatch/samples/10.x/JsonPatchSample/Models/Order.cs"::: (complete source file; reference: \~/web-api/jsonpatch/samples/10.x/JsonPatchSample/Models/Order.cs)](../../_code/aspnetcore/web-api/jsonpatch/samples/10.x/JsonPatchSample/Models/Order.cs.md)

The sample PATCH endpoint's key steps:

* **Retrieve the Customer**:
  * The endpoint retrieves a `Customer` object from the database `AppDb` using the provided `id`.
  * If no `Customer` object is found, it returns a `404 Not Found` response via `TypedResults.NotFound()`.
* **Apply JSON Patch**:
  * The [Microsoft.AspNetCore.JsonPatch.SystemTextJson.JsonPatchDocument.ApplyTo(System.Object)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.JsonPatch.SystemTextJson.JsonPatchDocument.ApplyTo(System.Object)) method applies the JSON Patch operations from the `patchDoc` to the retrieved `Customer` object.
  * If errors occur during the patch application, such as invalid operations or conflicts, an error handling delegate captures them. This delegate collects error messages into a dictionary keyed by the type name of the affected object.
* **Return validation errors**:
  * If the error handling delegate captures any errors during the patch application, the endpoint returns a `ValidationProblem` response containing the error details via `TypedResults.ValidationProblem(errors)`.
* **Save and return the Updated Customer**:
  * If the patch is successfully applied with no errors, the changes are saved to the database and the endpoint returns the updated `Customer` object via `TypedResults.Ok(customer)`.

### Example error response

The following example shows the body of a validation problem response for a JSON Patch operation when the specified path is invalid:

```json
{
  "type": "https://tools.ietf.org/html/rfc9110#section-15.5.1",
  "title": "One or more validation errors occurred.",
  "status": 400,
  "errors": {
    "Customer": [
      "The target location specified by path segment 'foobar' was not found."
    ]
  }
}
```

## Apply a JSON Patch document to an object

The following examples demonstrate how to use the [Microsoft.AspNetCore.JsonPatch.SystemTextJson.JsonPatchDocument.ApplyTo(System.Object)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.JsonPatch.SystemTextJson.JsonPatchDocument.ApplyTo(System.Object)) method to apply a JSON Patch document to an object.

### Example: Apply a [Microsoft.AspNetCore.JsonPatch.SystemTextJson.JsonPatchDocument%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.JsonPatch.SystemTextJson.JsonPatchDocument%25601) to an object

The following example demonstrates:

* The `add`, `replace`, and `remove` operations.
* Operations on nested properties.
* Adding a new item to an array.
* Using a JSON String Enum Converter in a JSON patch document.

```csharp
// Original object
var person = new Person {
    FirstName = "John",
    LastName = "Doe",
    Email = "johndoe@gmail.com",
    PhoneNumbers = [new() {Number = "123-456-7890", Type = PhoneNumberType.Mobile}],
    Address = new Address
    {
        Street = "123 Main St",
        City = "Anytown",
        State = "TX"
    }
};

// Raw JSON patch document
string jsonPatch = """
[
    { "op": "replace", "path": "/FirstName", "value": "Jane" },
    { "op": "remove", "path": "/Email"},
    { "op": "add", "path": "/Address/ZipCode", "value": "90210" },
    { "op": "add", "path": "/PhoneNumbers/-", "value": { "Number": "987-654-3210",
                                                                "Type": "Work" } }
]
""";

// Deserialize the JSON patch document
var patchDoc = JsonSerializer.Deserialize<JsonPatchDocument<Person>>(jsonPatch);

// Apply the JSON patch document
patchDoc!.ApplyTo(person);

// Output updated object
Console.WriteLine(JsonSerializer.Serialize(person, serializerOptions));
```

The previous example results in the following output of the updated object:

```output
{
    "firstName": "Jane",
    "lastName": "Doe",
    "address": {
        "street": "123 Main St",
        "city": "Anytown",
        "state": "TX",
        "zipCode": "90210"
    },
    "phoneNumbers": [
        {
            "number": "123-456-7890",
            "type": "Mobile"
        },
        {
            "number": "987-654-3210",
            "type": "Work"
        }
    ]
}
```

The [Microsoft.AspNetCore.JsonPatch.SystemTextJson.JsonPatchDocument.ApplyTo(System.Object)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.JsonPatch.SystemTextJson.JsonPatchDocument.ApplyTo(System.Object)) method generally follows the conventions and options of [System.Text.Json](https://learn.microsoft.com/search/?terms=System.Text.Json) for processing the [Microsoft.AspNetCore.JsonPatch.SystemTextJson.JsonPatchDocument%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.JsonPatch.SystemTextJson.JsonPatchDocument%25601), including the behavior controlled by the following options:

* [System.Text.Json.Serialization.JsonNumberHandling](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonNumberHandling): Whether numeric properties are read from strings.
* [System.Text.Json.JsonSerializerOptions.PropertyNameCaseInsensitive](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions.PropertyNameCaseInsensitive): Whether property names are case-sensitive.

Key differences between [System.Text.Json](https://learn.microsoft.com/search/?terms=System.Text.Json) and the new [Microsoft.AspNetCore.JsonPatch.SystemTextJson.JsonPatchDocument%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.JsonPatch.SystemTextJson.JsonPatchDocument%25601) implementation:

* The runtime type of the target object, not the declared type, determines which properties [Microsoft.AspNetCore.JsonPatch.SystemTextJson.JsonPatchDocument.ApplyTo(System.Object)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.JsonPatch.SystemTextJson.JsonPatchDocument.ApplyTo(System.Object)) patches.
* [System.Text.Json](https://learn.microsoft.com/search/?terms=System.Text.Json) deserialization relies on the declared type to identify eligible properties.

### Example: Apply a JsonPatchDocument with error handling

Various errors can occur when applying a JSON Patch document. For example, the target object might not have the specified property, or the value specified might be incompatible with the property type.

JSON `Patch` supports the `test` operation, which checks if a specified value equals the target property. If it doesn't, it returns an error.

The following example demonstrates how to handle these errors gracefully.

> **Important:**
> The object passed to the [Microsoft.AspNetCore.JsonPatch.SystemTextJson.JsonPatchDocument.ApplyTo(System.Object)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.JsonPatch.SystemTextJson.JsonPatchDocument.ApplyTo(System.Object)) method is modified in place. The caller is responsible for discarding changes if any operation fails.

```csharp
// Original object
var person = new Person {
    FirstName = "John",
    LastName = "Doe",
    Email = "johndoe@gmail.com"
};

// Raw JSON patch document
string jsonPatch = """
[
    { "op": "replace", "path": "/Email", "value": "janedoe@gmail.com"},
    { "op": "test", "path": "/FirstName", "value": "Jane" },
    { "op": "replace", "path": "/LastName", "value": "Smith" }
]
""";

// Deserialize the JSON patch document
var patchDoc = JsonSerializer.Deserialize<JsonPatchDocument<Person>>(jsonPatch);

// Apply the JSON patch document, catching any errors
Dictionary<string, string[]>? errors = null;
patchDoc!.ApplyTo(person, jsonPatchError =>
    {
        errors ??= new ();
        var key = jsonPatchError.AffectedObject.GetType().Name;
        if (!errors.ContainsKey(key))
        {
            errors.Add(key, new string[] { });
        }
        errors[key] = errors[key].Append(jsonPatchError.ErrorMessage).ToArray();
    });
if (errors != null)
{
    // Print the errors
    foreach (var error in errors)
    {
        Console.WriteLine($"Error in {error.Key}: {string.Join(", ", error.Value)}");
    }
}

// Output updated object
Console.WriteLine(JsonSerializer.Serialize(person, serializerOptions));
```

The previous example results in the following output:

```output
Error in Person: The current value 'John' at path 'FirstName' is not equal 
to the test value 'Jane'.
{
    "firstName": "John",
    "lastName": "Smith",              <<< Modified!
    "email": "janedoe@gmail.com",     <<< Modified!
    "phoneNumbers": []
}
```

### Example: Construct a JSON Patch document using strongly-typed lambda expressions

In addition to specifying paths as string literals, [Microsoft.AspNetCore.JsonPatch.SystemTextJson.JsonPatchDocument%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.JsonPatch.SystemTextJson.JsonPatchDocument%25601) supports defining patch operations using strongly-typed lambda expressions. Strongly-typed lambda expressions:

* Provide compile-time verification that property paths and value types match the model.
* Eliminate runtime typographical errors, such a casing error, that can occur with string-based JSON Pointer paths.
* Automatically update property paths when renaming model properties during refactoring.

The following example demonstrates building a patch document using lambda expressions:

```csharp
var person = new Person
{
    FirstName = "John",
    LastName = "Doe",
    Email = "johndoe@example.com"
};

// Create a strongly typed JSON Patch document
var patchDoc = new JsonPatchDocument<Person>();

// Add operations using lambda expressions
patchDoc.Replace(p => p.FirstName, "Jane");
patchDoc.Replace(p => p.LastName, "Smith");
patchDoc.Replace(p => p.Email, "janesmith@example.com");

// Apply the patch document to the target object
patchDoc.ApplyTo(person);

Console.WriteLine($"{person.FirstName} {person.LastName} ({person.Email})");
```

The previous example results in the following output:

```output
Jane Smith (janesmith@example.com)
```

## Mitigating security risks

When using the `Microsoft.AspNetCore.JsonPatch.SystemTextJson` package, it's critical to understand and mitigate potential security risks. The following sections outline the identified security risks associated with JSON Patch and provide recommended mitigations to ensure secure usage of the package.

> **Important:**
> ***This is not an exhaustive list of threats.*** App developers must conduct their own threat model reviews to determine an app-specific comprehensive list and come up with appropriate mitigations as needed. For example, apps which expose collections to patch operations should consider the potential for algorithmic complexity attacks if those operations insert or remove elements at the beginning of the collection.

To minimize security risks when integrating JSON Patch functionality into their apps, developers should:

* Run comprehensive threat models for their own apps.
* Address identified threats.
* Follow the recommended mitigations in the following sections.

### Denial of Service (DoS) via memory amplification

* **Scenario**: A malicious client submits a `copy` operation that duplicates large object graphs multiple times, leading to excessive memory consumption.
* **Impact**: Potential Out-Of-Memory (OOM) conditions, causing service disruptions.
* **Mitigation**:
  * Validate incoming JSON Patch documents for size and structure before calling [Microsoft.AspNetCore.JsonPatch.SystemTextJson.JsonPatchDocument.ApplyTo(System.Object)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.JsonPatch.SystemTextJson.JsonPatchDocument.ApplyTo(System.Object)).
  * The validation must be app specific, but an example validation can look similar to the following:

```csharp
public void Validate(JsonPatchDocument<T> patch)
{
    // This is just an example. It's up to the developer to make sure that
    // this case is handled properly, based on the app needs.
    if (patch.Operations.Where(op=>op.OperationType == OperationType.Copy).Count()
                              > MaxCopyOperationsCount)
    {
        throw new InvalidOperationException();
    }
}
```

### Business logic subversion

* **Scenario**: Patch operations can manipulate fields with implicit invariants (for example, internal flags, IDs, or computed fields), violating business constraints.
* **Impact**: Data integrity issues and unintended app behavior.
* **Mitigation**:
  * Use POCOs (Plain Old CLR Objects) with explicitly defined properties that are safe to modify.
    * Avoid exposing sensitive or security-critical properties in the target object.
    * If a POCO object isn't used, validate the patched object after applying operations to ensure business rules and invariants aren't violated.

### Authentication and authorization

* **Scenario**: Unauthenticated or unauthorized clients send malicious JSON Patch requests.
* **Impact**: Unauthorized access to modify sensitive data or disrupt app behavior.
* **Mitigation**:
  * Protect endpoints that accept JSON Patch requests by using proper authentication and authorization mechanisms.
  * Restrict access to trusted clients or users with appropriate permissions.

## Get the code

[View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/web-api/jsonpatch/samples/10.x/JsonPatchSample). ([How to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample)).

To test the sample, run the app and send HTTP requests by using the included `.http` file.

## Additional resources

* [IETF RFC 5789 PATCH method specification](https://tools.ietf.org/html/rfc5789)
* [IETF RFC 6902 JSON Patch specification](https://tools.ietf.org/html/rfc6902)
* [IETF RFC 6901 JSON Pointer](https://tools.ietf.org/html/rfc6901)
* [ASP.NET Core JSON Patch source code](https://github.com/dotnet/aspnetcore/tree/main/src/Features/JsonPatch.SystemTextJson/src)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-10.0**

This article explains how to handle JSON Patch requests in an ASP.NET Core web API.

> **Important:**
> The JSON Patch standard has ***inherent security risks***. This implementation ***doesn't attempt to mitigate these inherent security risks***. It's the responsibility of the developer to ensure that the JSON Patch document is safe to apply to the target object. For more information, see the [Mitigating Security Risks](#mitigating-security-risks) section.

## Package installation

JSON Patch support in ASP.NET Core web API is based on `Newtonsoft.Json` and requires the [`Microsoft.AspNetCore.Mvc.NewtonsoftJson`](https://www.nuget.org/packages/Microsoft.AspNetCore.Mvc.NewtonsoftJson/) NuGet package. 

To enable JSON Patch support:

* Install the [`Microsoft.AspNetCore.Mvc.NewtonsoftJson`](https://www.nuget.org/packages/Microsoft.AspNetCore.Mvc.NewtonsoftJson/) NuGet package.
* Call [Microsoft.Extensions.DependencyInjection.NewtonsoftJsonMvcBuilderExtensions.AddNewtonsoftJson%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.NewtonsoftJsonMvcBuilderExtensions.AddNewtonsoftJson%252A). For example:

  [language="csharp" source="\~/web-api/jsonpatch/samples/6.x/api/Program.cs" id="snippet1" highlight="4"::: (complete source file; reference: \~/web-api/jsonpatch/samples/6.x/api/Program.cs)](../../_code/aspnetcore/web-api/jsonpatch/samples/6.x/api/Program.cs.md)

`AddNewtonsoftJson` replaces the default `System.Text.Json`-based input and output formatters used for formatting ***all*** JSON content. This extension method is compatible with the following MVC service registration methods:

* [Microsoft.Extensions.DependencyInjection.MvcServiceCollectionExtensions.AddRazorPages%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.MvcServiceCollectionExtensions.AddRazorPages%252A)
* [Microsoft.Extensions.DependencyInjection.MvcServiceCollectionExtensions.AddControllersWithViews%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.MvcServiceCollectionExtensions.AddControllersWithViews%252A)
* [Microsoft.Extensions.DependencyInjection.MvcServiceCollectionExtensions.AddControllers%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.MvcServiceCollectionExtensions.AddControllers%252A)

JsonPatch requires setting the `Content-Type` header to `application/json-patch+json`.

## Add support for JSON Patch when using System.Text.Json

The `System.Text.Json`-based input formatter doesn't support JSON Patch. To add support for JSON Patch using `Newtonsoft.Json`, while leaving the other input and output formatters unchanged:

* Install the [`Microsoft.AspNetCore.Mvc.NewtonsoftJson`](https://www.nuget.org/packages/Microsoft.AspNetCore.Mvc.NewtonsoftJson/) NuGet package.
* Update `Program.cs`:

  [language="csharp" source="\~/web-api/jsonpatch/samples/6.x/api/Program.cs" id="snippet_both" highlight="6-9"::: (complete source file; reference: \~/web-api/jsonpatch/samples/6.x/api/Program.cs)](../../_code/aspnetcore/web-api/jsonpatch/samples/6.x/api/Program.cs.md)
  [language="csharp" source="\~/web-api/jsonpatch/samples/6.x/api/MyJPIF.cs"::: (complete source file; reference: \~/web-api/jsonpatch/samples/6.x/api/MyJPIF.cs)](../../_code/aspnetcore/web-api/jsonpatch/samples/6.x/api/MyJPIF.cs.md)

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

[language="json" source="\~/web-api/jsonpatch/snippets/customer.json"::: (complete source file; reference: \~/web-api/jsonpatch/snippets/customer.json)](../../_code/aspnetcore/web-api/jsonpatch/snippets/customer.json.md)

### JSON patch example

[language="json" source="\~/web-api/jsonpatch/snippets/add.json"::: (complete source file; reference: \~/web-api/jsonpatch/snippets/add.json)](../../_code/aspnetcore/web-api/jsonpatch/snippets/add.json.md)

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

[language="csharp" source="\~/web-api/jsonpatch/samples/3.x/api/Controllers/HomeController.cs" id="snippet_PatchAction" highlight="1,3,9"::: (complete source file; reference: \~/web-api/jsonpatch/samples/3.x/api/Controllers/HomeController.cs)](../../_code/aspnetcore/web-api/jsonpatch/samples/3.x/api/Controllers/HomeController.cs.md)

This code from the sample app works with the following `Customer` model:

[language="csharp" source="\~/web-api/jsonpatch/samples/6.x/api/Models/Customer.cs"::: (complete source file; reference: \~/web-api/jsonpatch/samples/6.x/api/Models/Customer.cs)](../../_code/aspnetcore/web-api/jsonpatch/samples/6.x/api/Models/Customer.cs.md)

[language="csharp" source="\~/web-api/jsonpatch/samples/6.x/api/Models/Order.cs"::: (complete source file; reference: \~/web-api/jsonpatch/samples/6.x/api/Models/Order.cs)](../../_code/aspnetcore/web-api/jsonpatch/samples/6.x/api/Models/Order.cs.md)

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

[language="csharp" source="\~/web-api/jsonpatch/samples/6.x/api/Controllers/HomeController.cs" id="snippet_Dynamic"::: (complete source file; reference: \~/web-api/jsonpatch/samples/6.x/api/Controllers/HomeController.cs)](../../_code/aspnetcore/web-api/jsonpatch/samples/6.x/api/Controllers/HomeController.cs.md)

## The add operation

* If `path` points to an array element: inserts new element before the one specified by `path`.
* If `path` points to a property: sets the property value.
* If `path` points to a nonexistent location:
  * If the resource to patch is a dynamic object: adds a property.
  * If the resource to patch is a static object: the request fails.

The following sample patch document sets the value of `CustomerName` and adds an `Order` object to the end of the `Orders` array.

[language="json" source="\~/web-api/jsonpatch/snippets/add.json"::: (complete source file; reference: \~/web-api/jsonpatch/snippets/add.json)](../../_code/aspnetcore/web-api/jsonpatch/snippets/add.json.md)

## The remove operation

* If `path` points to an array element: removes the element.
* If `path` points to a property:
  * If resource to patch is a dynamic object: removes the property.
  * If resource to patch is a static object:
    * If the property is nullable: sets it to null.
    * If the property is non-nullable, sets it to `default<T>`.

The following sample patch document sets `CustomerName` to null and deletes `Orders[0]`:

[language="json" source="\~/web-api/jsonpatch/snippets/remove.json"::: (complete source file; reference: \~/web-api/jsonpatch/snippets/remove.json)](../../_code/aspnetcore/web-api/jsonpatch/snippets/remove.json.md)

## The replace operation

This operation is functionally the same as a `remove` followed by an `add`.

The following sample patch document sets the value of `CustomerName` and replaces `Orders[0]`with a new `Order` object:

[language="json" source="\~/web-api/jsonpatch/snippets/replace.json"::: (complete source file; reference: \~/web-api/jsonpatch/snippets/replace.json)](../../_code/aspnetcore/web-api/jsonpatch/snippets/replace.json.md)

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

[language="json" source="\~/web-api/jsonpatch/snippets/move.json"::: (complete source file; reference: \~/web-api/jsonpatch/snippets/move.json)](../../_code/aspnetcore/web-api/jsonpatch/snippets/move.json.md)

## The copy operation

This operation is functionally the same as a `move` operation without the final `remove` step.

The following sample patch document:

* Copies the value of `Orders[0].OrderName` to `CustomerName`.
* Inserts a copy of `Orders[1]` before `Orders[0]`.

[language="json" source="\~/web-api/jsonpatch/snippets/copy.json"::: (complete source file; reference: \~/web-api/jsonpatch/snippets/copy.json)](../../_code/aspnetcore/web-api/jsonpatch/snippets/copy.json.md)

## The test operation

If the value at the location indicated by `path` is different from the value provided in `value`, the request fails. In that case, the whole PATCH request fails even if all other operations in the patch document would otherwise succeed.

The `test` operation is commonly used to prevent an update when there's a concurrency conflict.

The following sample patch document has no effect if the initial value of `CustomerName` is "John", because the test fails:

[language="json" source="\~/web-api/jsonpatch/snippets/test-fail.json"::: (complete source file; reference: \~/web-api/jsonpatch/snippets/test-fail.json)](../../_code/aspnetcore/web-api/jsonpatch/snippets/test-fail.json.md)

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

[language="csharp" source="\~/web-api/jsonpatch/samples/3.x/WebApp1/Startup.cs" id="snippet"::: (complete source file; reference: \~/web-api/jsonpatch/samples/3.x/WebApp1/Startup.cs)](../../_code/aspnetcore/web-api/jsonpatch/samples/3.x/WebApp1/Startup.cs.md)

The preceding code requires the `Microsoft.AspNetCore.Mvc.NewtonsoftJson` package and the following `using` statements:

[language="csharp" source="\~/web-api/jsonpatch/samples/3.x/WebApp1/Startup.cs" id="snippet1"::: (complete source file; reference: \~/web-api/jsonpatch/samples/3.x/WebApp1/Startup.cs)](../../_code/aspnetcore/web-api/jsonpatch/samples/3.x/WebApp1/Startup.cs.md)

Use the `Newtonsoft.Json.JsonConvert.SerializeObject` method to serialize a JsonPatchDocument.

## PATCH HTTP request method

The PUT and [PATCH](https://tools.ietf.org/html/rfc5789) methods are used to update an existing resource. The difference between them is that PUT replaces the entire resource, while PATCH specifies only the changes.

## JSON Patch

[JSON Patch](https://tools.ietf.org/html/rfc6902) is a format for specifying updates to be applied to a resource. A JSON Patch document has an array of *operations*. Each operation identifies a particular type of change. Examples of such changes include adding an array element or replacing a property value.

For example, the following JSON documents represent a resource, a JSON Patch document for the resource, and the result of applying the Patch operations.

### Resource example

[language="json" source="\~/web-api/jsonpatch/snippets/customer.json"::: (complete source file; reference: \~/web-api/jsonpatch/snippets/customer.json)](../../_code/aspnetcore/web-api/jsonpatch/snippets/customer.json.md)

### JSON patch example

[language="json" source="\~/web-api/jsonpatch/snippets/add.json"::: (complete source file; reference: \~/web-api/jsonpatch/snippets/add.json)](../../_code/aspnetcore/web-api/jsonpatch/snippets/add.json.md)

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

[language="csharp" source="\~/web-api/jsonpatch/samples/3.x/api/Controllers/HomeController.cs" id="snippet_PatchAction" highlight="1,3,9"::: (complete source file; reference: \~/web-api/jsonpatch/samples/3.x/api/Controllers/HomeController.cs)](../../_code/aspnetcore/web-api/jsonpatch/samples/3.x/api/Controllers/HomeController.cs.md)

This code from the sample app works with the following `Customer` model:

[language="csharp" source="\~/web-api/jsonpatch/samples/3.x/api/Models/Customer.cs"::: (complete source file; reference: \~/web-api/jsonpatch/samples/3.x/api/Models/Customer.cs)](../../_code/aspnetcore/web-api/jsonpatch/samples/3.x/api/Models/Customer.cs.md)

[language="csharp" source="\~/web-api/jsonpatch/samples/3.x/api/Models/Order.cs"::: (complete source file; reference: \~/web-api/jsonpatch/samples/3.x/api/Models/Order.cs)](../../_code/aspnetcore/web-api/jsonpatch/samples/3.x/api/Models/Order.cs.md)

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

[language="csharp" source="\~/web-api/jsonpatch/samples/3.x/api/Controllers/HomeController.cs" id="snippet_Dynamic"::: (complete source file; reference: \~/web-api/jsonpatch/samples/3.x/api/Controllers/HomeController.cs)](../../_code/aspnetcore/web-api/jsonpatch/samples/3.x/api/Controllers/HomeController.cs.md)

## The add operation

* If `path` points to an array element: inserts new element before the one specified by `path`.
* If `path` points to a property: sets the property value.
* If `path` points to a nonexistent location:
  * If the resource to patch is a dynamic object: adds a property.
  * If the resource to patch is a static object: the request fails.

The following sample patch document sets the value of `CustomerName` and adds an `Order` object to the end of the `Orders` array.

[language="json" source="\~/web-api/jsonpatch/snippets/add.json"::: (complete source file; reference: \~/web-api/jsonpatch/snippets/add.json)](../../_code/aspnetcore/web-api/jsonpatch/snippets/add.json.md)

## The remove operation

* If `path` points to an array element: removes the element.
* If `path` points to a property:
  * If resource to patch is a dynamic object: removes the property.
  * If resource to patch is a static object:
    * If the property is nullable: sets it to null.
    * If the property is non-nullable, sets it to `default<T>`.

The following sample patch document sets `CustomerName` to null and deletes `Orders[0]`:

[language="json" source="\~/web-api/jsonpatch/snippets/remove.json"::: (complete source file; reference: \~/web-api/jsonpatch/snippets/remove.json)](../../_code/aspnetcore/web-api/jsonpatch/snippets/remove.json.md)

## The replace operation

This operation is functionally the same as a `remove` followed by an `add`.

The following sample patch document sets the value of `CustomerName` and replaces `Orders[0]`with a new `Order` object:

[language="json" source="\~/web-api/jsonpatch/snippets/replace.json"::: (complete source file; reference: \~/web-api/jsonpatch/snippets/replace.json)](../../_code/aspnetcore/web-api/jsonpatch/snippets/replace.json.md)

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

[language="json" source="\~/web-api/jsonpatch/snippets/move.json"::: (complete source file; reference: \~/web-api/jsonpatch/snippets/move.json)](../../_code/aspnetcore/web-api/jsonpatch/snippets/move.json.md)

## The copy operation

This operation is functionally the same as a `move` operation without the final `remove` step.

The following sample patch document:

* Copies the value of `Orders[0].OrderName` to `CustomerName`.
* Inserts a copy of `Orders[1]` before `Orders[0]`.

[language="json" source="\~/web-api/jsonpatch/snippets/copy.json"::: (complete source file; reference: \~/web-api/jsonpatch/snippets/copy.json)](../../_code/aspnetcore/web-api/jsonpatch/snippets/copy.json.md)

## The test operation

If the value at the location indicated by `path` is different from the value provided in `value`, the request fails. In that case, the whole PATCH request fails even if all other operations in the patch document would otherwise succeed.

The `test` operation is commonly used to prevent an update when there's a concurrency conflict.

The following sample patch document has no effect if the initial value of `CustomerName` is "John", because the test fails:

[language="json" source="\~/web-api/jsonpatch/snippets/test-fail.json"::: (complete source file; reference: \~/web-api/jsonpatch/snippets/test-fail.json)](../../_code/aspnetcore/web-api/jsonpatch/snippets/test-fail.json.md)

## Get the code

[View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/web-api/jsonpatch/samples). ([How to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample)).

To test the sample, run the app and send HTTP requests with the following settings:

* URL: `http://localhost:{port}/jsonpatch/jsonpatchwithmodelstate`
* HTTP method: `PATCH`
* Header: `Content-Type: application/json-patch+json`
* Body: Copy and paste one of the JSON patch document samples from the *JSON* project folder.
