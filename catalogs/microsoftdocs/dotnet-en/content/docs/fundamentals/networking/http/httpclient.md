---
title: Make HTTP requests with the HttpClient
description: Learn how to make HTTP requests and handle responses with the HttpClient in .NET.
ms.date: 03/05/2026
ai-usage: ai-assisted
---

# Make HTTP requests with the HttpClient class

In this article, you learn how to make HTTP requests and handle responses with the `HttpClient` class.

> **Important:**
> All of the example HTTP requests in this article target one of the following URLs:
>
> - <https://jsonplaceholder.typicode.com>: A site that provides a free fake API platform for testing and prototyping.
> - <https://www.example.com>: A domain available for use in illustrative examples in documents.

HTTP endpoints commonly return JavaScript Object Notation (JSON) data, but not always. For convenience, the optional [System.Net.Http.Json](https://www.nuget.org/packages/System.Net.Http.Json) NuGet package provides several extension methods for `HttpClient` and `HttpContent` objects that perform automatic serialization and deserialization by using the [📦 System.Text.Json](https://www.nuget.org/packages/System.Text.Json) NuGet package. The examples in this article call attention to places where these extensions are available.

> **Tip:**
> All source code referenced in this article is available in the [GitHub: .NET Docs](https://github.com/dotnet/docs/tree/main/docs/fundamentals/networking/snippets/httpclient) repository.

## Create an HttpClient object

Most of the examples in this article reuse the same `HttpClient` instance, so you can configure the instance once and use it for the remaining examples. To create an `HttpClient` object, use the `HttpClient` class constructor. For more information, see [Guidelines for using HttpClient](httpclient-guidelines.md).

[source="../snippets/httpclient/Program.cs" id="sharedclient"::: (complete source file; reference: ../snippets/httpclient/Program.cs)](../../../../_code/docs/fundamentals/networking/snippets/httpclient/Program.cs.md)

The code completes the following tasks:

- Instantiate a new `HttpClient` instance as a `static` variable. According to the [guidelines](httpclient-guidelines.md), the recommended approach is to reuse `HttpClient` instances during the application lifecycle.
- Set the [System.Net.Http.HttpClient.BaseAddress](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient.BaseAddress) property to `"https://jsonplaceholder.typicode.com"`.

This `HttpClient` instance uses the base address to make subsequent requests. To apply other configurations, consider the following APIs:

- Set the [System.Net.Http.HttpClient.DefaultRequestHeaders](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient.DefaultRequestHeaders) property.
- Apply a nondefault [System.Net.Http.HttpClient.Timeout](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient.Timeout) property.
- Specify the [System.Net.Http.HttpClient.DefaultRequestVersion](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient.DefaultRequestVersion) property.

> **Tip:**
> Alternatively, you can create `HttpClient` instances by using a factory-pattern approach that allows you to configure any number of clients and consume them as dependency injection services. For more information, see [HTTP client factory with .NET](../../../core/extensions/httpclient-factory.md).

## Make an HTTP request

To make an HTTP request, you call any of the following API methods:

| HTTP method | API |
| --- | --- |
| `GET` | [System.Net.Http.HttpClient.GetAsync*](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient.GetAsync*) |
| `GET` | [System.Net.Http.HttpClient.GetByteArrayAsync*](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient.GetByteArrayAsync*) |
| `GET` | [System.Net.Http.HttpClient.GetStreamAsync*](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient.GetStreamAsync*) |
| `GET` | [System.Net.Http.HttpClient.GetStringAsync*](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient.GetStringAsync*) |
| `POST` | [System.Net.Http.HttpClient.PostAsync*](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient.PostAsync*) |
| `PUT` | [System.Net.Http.HttpClient.PutAsync*](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient.PutAsync*) |
| `PATCH` | [System.Net.Http.HttpClient.PatchAsync*](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient.PatchAsync*) |
| `DELETE` | [System.Net.Http.HttpClient.DeleteAsync*](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient.DeleteAsync*) |
| <sup>†</sup>`USER SPECIFIED` | [System.Net.Http.HttpClient.SendAsync*](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient.SendAsync*) |

> <sup>†</sup>A `USER SPECIFIED` request indicates that the `SendAsync` method accepts any valid [System.Net.Http.HttpMethod](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpMethod) object.

> **Warning:**
> Making HTTP requests is considered network I/O-bound work. A synchronous [System.Net.Http.HttpClient.Send*](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient.Send*) method exists, but the recommendation is to use the asynchronous APIs instead, unless you have good reason not to.

> **Note:**
> While targeting Android devices (such as with .NET MAUI development), you must add the `android:usesCleartextTraffic="true"` definition to the `<application></application>` section in the _AndroidManifest.xml_ file. This setting enables clear-text traffic, such as HTTP requests, which is otherwise disabled by default due to Android security policies. Consider the following example XML settings:
>
> ```xml
> <?xml version="1.0" encoding="utf-8"?>
> <manifest xmlns:android="http://schemas.android.com/apk/res/android">
>   <application android:usesCleartextTraffic="true"></application>
>   <!-- omitted for brevity -->
> </manifest>
> ```
>
> For more information, see [Enable clear-text network traffic for the localhost domain](https://learn.microsoft.com/dotnet/maui/data-cloud/local-web-services#enable-clear-text-network-traffic-for-the-localhost-domain).

### Understand HTTP content

The [System.Net.Http.HttpContent](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpContent) type is used to represent an HTTP entity body and corresponding content headers. For HTTP methods (or request methods) that require a body (`POST`, `PUT`, `PATCH`), you use the [System.Net.Http.HttpContent](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpContent) class to specify the body of the request. Most examples show how to prepare the  [System.Net.Http.StringContent](https://learn.microsoft.com/search/?terms=System.Net.Http.StringContent) subclass with a JSON payload, but other subclasses exist for different [content (MIME) types](https://developer.mozilla.org/docs/Web/HTTP/MIME_types).

- [System.Net.Http.ByteArrayContent](https://learn.microsoft.com/search/?terms=System.Net.Http.ByteArrayContent): Provides HTTP content based on a byte array.
- [System.Net.Http.FormUrlEncodedContent](https://learn.microsoft.com/search/?terms=System.Net.Http.FormUrlEncodedContent): Provides HTTP content for name/value tuples encoded by using the `"application/x-www-form-urlencoded"` MIME type.
- [System.Net.Http.Json.JsonContent](https://learn.microsoft.com/search/?terms=System.Net.Http.Json.JsonContent): Provides HTTP content based on JSON.
- [System.Net.Http.MultipartContent](https://learn.microsoft.com/search/?terms=System.Net.Http.MultipartContent): Provides a collection of HttpContent objects that get serialized by using the `"multipart/*"` MIME type specification.
- [System.Net.Http.MultipartFormDataContent](https://learn.microsoft.com/search/?terms=System.Net.Http.MultipartFormDataContent): Provides a container for content encoded by using the `"multipart/form-data"` MIME type.
- [System.Net.Http.ReadOnlyMemoryContent](https://learn.microsoft.com/search/?terms=System.Net.Http.ReadOnlyMemoryContent): Provides HTTP content based on an [System.ReadOnlyMemory`1](https://learn.microsoft.com/search/?terms=System.ReadOnlyMemory%601) value.
- [System.Net.Http.StreamContent](https://learn.microsoft.com/search/?terms=System.Net.Http.StreamContent): Provides HTTP content based on a stream.
- [System.Net.Http.StringContent](https://learn.microsoft.com/search/?terms=System.Net.Http.StringContent): Provides HTTP content based on a string.

The `HttpContent` class is also used to represent the response body of the [System.Net.Http.HttpResponseMessage](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpResponseMessage) class, which is accessible on the [System.Net.Http.HttpResponseMessage.Content](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpResponseMessage.Content) property.

### Use an HTTP GET request

A `GET` request shouldn't send a body. This request is used (as the method name indicates) to retrieve (or get) data from a resource. To make an HTTP `GET` request given an `HttpClient` instance and a [System.Uri](https://learn.microsoft.com/search/?terms=System.Uri) object, use the [System.Net.Http.HttpClient.GetAsync*](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient.GetAsync*) method:

[source="../snippets/httpclient/Program.Get.cs" id="get"::: (complete source file; reference: ../snippets/httpclient/Program.Get.cs)](../../../../_code/docs/fundamentals/networking/snippets/httpclient/Program.Get.cs.md)

The code completes the following tasks:

- Make a `GET` request to the `"https://jsonplaceholder.typicode.com/todos/3"` endpoint.
- Ensure the response is successful.
- Write the request details to the console.
- Read the response body as a string.
- Write the JSON response body to the console.

The `WriteRequestToConsole` method is a custom extension that isn't part of the framework. If you're curious about the implementation, consider the following C# code:

[source="../snippets/httpclient/HttpResponseMessageExtensions.cs"::: (complete source file; reference: ../snippets/httpclient/HttpResponseMessageExtensions.cs)](../../../../_code/docs/fundamentals/networking/snippets/httpclient/HttpResponseMessageExtensions.cs.md)

This functionality is used to write the request details to the console in the following form:

`<HTTP Request Method> <Request URI> <HTTP/Version>`

As an example, the `GET` request to the `"https://jsonplaceholder.typicode.com/todos/3"` endpoint outputs the following message:

```output
GET https://jsonplaceholder.typicode.com/todos/3 HTTP/1.1
```

#### Create the HTTP GET request from JSON

The <https://jsonplaceholder.typicode.com/todos> endpoint returns a JSON array of `Todo` objects. Their JSON structure resembles the following form:

```json
[
  {
    "userId": 1,
    "id": 1,
    "title": "example title",
    "completed": false
  },
  {
    "userId": 1,
    "id": 2,
    "title": "another example title",
    "completed": true
  },
]
```

The C# `Todo` object is defined as follows:

[source="../snippets/httpclient/Todo.cs"::: (complete source file; reference: ../snippets/httpclient/Todo.cs)](../../../../_code/docs/fundamentals/networking/snippets/httpclient/Todo.cs.md)

It's a `record class` type, with optional `Id`, `Title`, `Completed`, and `UserId` properties. For more information on the `record` type, see [Introduction to record types in C#](../../../csharp/fundamentals/types/records.md). To automatically deserialize `GET` requests into a strongly typed C# object, use the [System.Net.Http.Json.HttpClientJsonExtensions.GetFromJsonAsync*](https://learn.microsoft.com/search/?terms=System.Net.Http.Json.HttpClientJsonExtensions.GetFromJsonAsync*) extension method that's part of the [📦 System.Net.Http.Json](https://www.nuget.org/packages/System.Net.Http.Json) NuGet package.

[source="../snippets/httpclient/Program.GetFromJson.cs" id="getfromjson"::: (complete source file; reference: ../snippets/httpclient/Program.GetFromJson.cs)](../../../../_code/docs/fundamentals/networking/snippets/httpclient/Program.GetFromJson.cs.md)

The code completes the following tasks:

- Make a `GET` request to `"https://jsonplaceholder.typicode.com/todos?userId=1&completed=false"`.

   The query string represents the filtering criteria for the request. When the command succeeds, the response is automatically deserialized into a `List<Todo>` object.

- Write the request details to the console, along with each `Todo` object.

### Use an HTTP POST request

A `POST` request sends data to the server for processing. The `Content-Type` header of the request signifies what [MIME type](https://learn.microsoft.com/search/?terms=System.Net.Mime.ContentType) the body is sending. To make an HTTP `POST` request given an `HttpClient` instance and a [System.Uri](https://learn.microsoft.com/search/?terms=System.Uri) object, use the [System.Net.Http.HttpClient.PostAsync*](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient.PostAsync*) method:

[source="../snippets/httpclient/Program.Post.cs" id="post"::: (complete source file; reference: ../snippets/httpclient/Program.Post.cs)](../../../../_code/docs/fundamentals/networking/snippets/httpclient/Program.Post.cs.md)

The code completes the following tasks:

- Prepare a [System.Net.Http.StringContent](https://learn.microsoft.com/search/?terms=System.Net.Http.StringContent) instance with the JSON body of the request (MIME type of `"application/json"`).
- Make a `POST` request to the `"https://jsonplaceholder.typicode.com/todos"` endpoint.
- Ensure the response is successful and write the request details to the console.
- Write the response body as a string to the console.

#### Create the HTTP POST request as JSON

To automatically serialize `POST` request arguments and deserialize responses into strongly typed C# objects, use the [System.Net.Http.Json.HttpClientJsonExtensions.PostAsJsonAsync*](https://learn.microsoft.com/search/?terms=System.Net.Http.Json.HttpClientJsonExtensions.PostAsJsonAsync*) and the [System.Net.Http.Json.HttpContentJsonExtensions.ReadFromJsonAsync*](https://learn.microsoft.com/search/?terms=System.Net.Http.Json.HttpContentJsonExtensions.ReadFromJsonAsync*) extension methods, respectively, that are part of the [System.Net.Http.Json](https://www.nuget.org/packages/System.Net.Http.Json) NuGet package.

[source="../snippets/httpclient/Program.PostAsJson.cs" id="postasjson"::: (complete source file; reference: ../snippets/httpclient/Program.PostAsJson.cs)](../../../../_code/docs/fundamentals/networking/snippets/httpclient/Program.PostAsJson.cs.md)

The code completes the following tasks:

- Serialize the `Todo` instance as JSON and make a `POST` request to the `"https://jsonplaceholder.typicode.com/todos"` endpoint.
- Ensure the response is successful and write the request details to the console.
- Deserialize the response body into a `Todo` instance and write the `Todo` object to the console.

### Use an HTTP PUT request

The `PUT` request method either replaces an existing resource or creates a new one by using the request body payload. To make an HTTP `PUT` request given an `HttpClient` instance and a [System.Uri](https://learn.microsoft.com/search/?terms=System.Uri) object, use the [System.Net.Http.HttpClient.PutAsync*](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient.PutAsync*) method:

[source="../snippets/httpclient/Program.Put.cs" id="put"::: (complete source file; reference: ../snippets/httpclient/Program.Put.cs)](../../../../_code/docs/fundamentals/networking/snippets/httpclient/Program.Put.cs.md)

The code completes the following tasks:

- Prepare a [System.Net.Http.StringContent](https://learn.microsoft.com/search/?terms=System.Net.Http.StringContent) instance with the JSON body of the request (MIME type of `"application/json"`).
- Make a `PUT` request to the `"https://jsonplaceholder.typicode.com/todos/1"` endpoint.
- Ensure the response is successful and write the request details with the JSON response body to the console.

#### Create the HTTP PUT request as JSON

To automatically serialize `PUT` request arguments and deserialize responses into strongly typed C# objects, use the [System.Net.Http.Json.HttpClientJsonExtensions.PutAsJsonAsync*](https://learn.microsoft.com/search/?terms=System.Net.Http.Json.HttpClientJsonExtensions.PutAsJsonAsync*) and the
[System.Net.Http.Json.HttpContentJsonExtensions.ReadFromJsonAsync*](https://learn.microsoft.com/search/?terms=System.Net.Http.Json.HttpContentJsonExtensions.ReadFromJsonAsync*) extension methods, respectively, that are part of the [System.Net.Http.Json](https://www.nuget.org/packages/System.Net.Http.Json) NuGet package.

[source="../snippets/httpclient/Program.PutAsJson.cs" id="putasjson"::: (complete source file; reference: ../snippets/httpclient/Program.PutAsJson.cs)](../../../../_code/docs/fundamentals/networking/snippets/httpclient/Program.PutAsJson.cs.md)

The code completes the following tasks:

- Serialize the `Todo` instance as JSON and make a `PUT` request to the `"https://jsonplaceholder.typicode.com/todos/5"` endpoint.
- Ensure the response is successful and write the request details to the console.
- Deserialize the response body into a `Todo` instance and write the `Todo` objects to the console.

### Use an HTTP PATCH request

The `PATCH` request is a partial update to an existing resource. This request doesn't create a new resource and it isn't intended to replace an existing resource. Instead, this method only partially updates a resource. To make an HTTP `PATCH` request given an `HttpClient` instance and a [System.Uri](https://learn.microsoft.com/search/?terms=System.Uri) object, use the [System.Net.Http.HttpClient.PatchAsync*](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient.PatchAsync*) method:

[source="../snippets/httpclient/Program.Patch.cs" id="patch"::: (complete source file; reference: ../snippets/httpclient/Program.Patch.cs)](../../../../_code/docs/fundamentals/networking/snippets/httpclient/Program.Patch.cs.md)

The code completes the following tasks:

- Prepare a [System.Net.Http.StringContent](https://learn.microsoft.com/search/?terms=System.Net.Http.StringContent) instance with the JSON body of the request (MIME type of `"application/json"`).
- Make a `PATCH` request to the `"https://jsonplaceholder.typicode.com/todos/1"` endpoint.
- Ensure the response is successful and write the request details with the JSON response body to the console.

No extension methods exist for `PATCH` requests in the `System.Net.Http.Json` NuGet package.

### Use an HTTP DELETE request

A `DELETE` request removes an existing resource and the request is _idempotent_, but not _safe_. Multiple `DELETE` requests to the same resources yield the same result, but the request affects the state of the resource. To make an HTTP `DELETE` request given an `HttpClient` instance and a [System.Uri](https://learn.microsoft.com/search/?terms=System.Uri) object, use the [System.Net.Http.HttpClient.DeleteAsync*](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient.DeleteAsync*) method:

[source="../snippets/httpclient/Program.Delete.cs" id="delete"::: (complete source file; reference: ../snippets/httpclient/Program.Delete.cs)](../../../../_code/docs/fundamentals/networking/snippets/httpclient/Program.Delete.cs.md)

The code completes the following tasks:

- Make a `DELETE` request to the `"https://jsonplaceholder.typicode.com/todos/1"` endpoint.
- Ensure the response is successful and write the request details to the console.

> **Tip:**
> The response to a `DELETE` request (just like a `PUT` request) might or might not include a body.

### Explore the HTTP HEAD request

The `HEAD` request is similar to a `GET` request. Instead of returning the resource, this request returns only the headers associated with the resource. A response to the `HEAD` request doesn't return a body. To make an HTTP `HEAD` request given an `HttpClient` instance and a [System.Uri](https://learn.microsoft.com/search/?terms=System.Uri) object, use the [System.Net.Http.HttpClient.SendAsync*](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient.SendAsync*) method with the [System.Net.Http.HttpMethod](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpMethod) type set to `HttpMethod.Head`:

[source="../snippets/httpclient/Program.Head.cs" id="head"::: (complete source file; reference: ../snippets/httpclient/Program.Head.cs)](../../../../_code/docs/fundamentals/networking/snippets/httpclient/Program.Head.cs.md)

The code completes the following tasks:

- Make a `HEAD` request to the `"https://www.example.com/"` endpoint.
- Ensure the response is successful and write the request details to the console.
- Iterate over all of the response headers and write each header to the console.

### Explore the HTTP OPTIONS request

The `OPTIONS` request is used to identify which HTTP methods a server or endpoint supports. To make an HTTP `OPTIONS` request given an `HttpClient` instance and a [System.Uri](https://learn.microsoft.com/search/?terms=System.Uri) object, use the [System.Net.Http.HttpClient.SendAsync*](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient.SendAsync*) method with the [System.Net.Http.HttpMethod](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpMethod) type set to `HttpMethod.Options`:

[source="../snippets/httpclient/Program.Options.cs" id="options"::: (complete source file; reference: ../snippets/httpclient/Program.Options.cs)](../../../../_code/docs/fundamentals/networking/snippets/httpclient/Program.Options.cs.md)

The code completes the following tasks:

- Send an `OPTIONS` HTTP request to the `"https://www.example.com/"` endpoint.
- Ensure the response is successful and write the request details to the console.
- Iterate over all of the response content headers and write each header to the console.

### Explore the HTTP TRACE request

The `TRACE` request can be useful for debugging as it provides application-level loop-back of the request message. To make an HTTP `TRACE` request, create an [System.Net.Http.HttpRequestMessage](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpRequestMessage) by using the `HttpMethod.Trace` type:

[source="../snippets/httpclient/Program.Trace.cs" id="trace"::: (complete source file; reference: ../snippets/httpclient/Program.Trace.cs)](../../../../_code/docs/fundamentals/networking/snippets/httpclient/Program.Trace.cs.md)

> **Caution:**
> Not all HTTP servers support the `TRACE` HTTP method. This method can expose a security vulnerability if used unwisely. For more information, see [Open Web Application Security Project (OWASP): Cross Site Tracing](https://owasp.org/www-community/attacks/Cross_Site_Tracing).

## Handle an HTTP response

When you handle an HTTP response, you interact with the [System.Net.Http.HttpResponseMessage](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpResponseMessage) type. Several members are used to evaluate the validity of a response. The HTTP status code is available in the [System.Net.Http.HttpResponseMessage.StatusCode](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpResponseMessage.StatusCode) property.

Suppose you send a request given a client instance:

[source="../snippets/httpclient/Program.Responses.cs" id="request"::: (complete source file; reference: ../snippets/httpclient/Program.Responses.cs)](../../../../_code/docs/fundamentals/networking/snippets/httpclient/Program.Responses.cs.md)

To ensure the `response` is `OK` (HTTP status code 200), you can evaluate the value as shown in the following example:

[source="../snippets/httpclient/Program.Responses.cs" id="isstatuscode"::: (complete source file; reference: ../snippets/httpclient/Program.Responses.cs)](../../../../_code/docs/fundamentals/networking/snippets/httpclient/Program.Responses.cs.md)

There are other HTTP status codes that represent a successful response, such as `CREATED` (HTTP status code 201), `ACCEPTED` (HTTP status code 202), `NO CONTENT` (HTTP status code 204), and `RESET CONTENT` (HTTP status code 205). You can use the [System.Net.Http.HttpResponseMessage.IsSuccessStatusCode](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpResponseMessage.IsSuccessStatusCode) property to evaluate these codes as well, which ensures that the response status code is within the range 200-299:

[source="../snippets/httpclient/Program.Responses.cs" id="issuccessstatuscode"::: (complete source file; reference: ../snippets/httpclient/Program.Responses.cs)](../../../../_code/docs/fundamentals/networking/snippets/httpclient/Program.Responses.cs.md)

If you need to have the framework throw the [System.Net.Http.HttpRequestException](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpRequestException) error, you can call the [System.Net.Http.HttpResponseMessage.EnsureSuccessStatusCode](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpResponseMessage.EnsureSuccessStatusCode) method:

[source="../snippets/httpclient/Program.Responses.cs" id="ensurestatuscode"::: (complete source file; reference: ../snippets/httpclient/Program.Responses.cs)](../../../../_code/docs/fundamentals/networking/snippets/httpclient/Program.Responses.cs.md)

This code throws an `HttpRequestException` error if the response status code isn't within the 200-299 range.

### Explore HTTP valid content responses

With a valid response, you can access the response body by using the [System.Net.Http.HttpResponseMessage.Content](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpResponseMessage.Content) property. The body is available as an [System.Net.Http.HttpContent](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpContent) instance, which you can use to access the body as a stream, byte array, or string.

The following code uses the `responseStream` object to read the response body:

[source="../snippets/httpclient/Program.Responses.cs" id="stream"::: (complete source file; reference: ../snippets/httpclient/Program.Responses.cs)](../../../../_code/docs/fundamentals/networking/snippets/httpclient/Program.Responses.cs.md)

You can use different objects to read the response body. Use the `responseByteArray` object to read the response body:

[source="../snippets/httpclient/Program.Responses.cs" id="array"::: (complete source file; reference: ../snippets/httpclient/Program.Responses.cs)](../../../../_code/docs/fundamentals/networking/snippets/httpclient/Program.Responses.cs.md)

Use the `responseString` object to read the response body:

[source="../snippets/httpclient/Program.Responses.cs" id="string"::: (complete source file; reference: ../snippets/httpclient/Program.Responses.cs)](../../../../_code/docs/fundamentals/networking/snippets/httpclient/Program.Responses.cs.md)

When you know an HTTP endpoint returns JSON, you can deserialize the response body into any valid C# object by using the [System.Net.Http.Json](https://www.nuget.org/packages/System.Net.Http.Json) NuGet package:

[source="../snippets/httpclient/Program.Responses.cs" id="json"::: (complete source file; reference: ../snippets/httpclient/Program.Responses.cs)](../../../../_code/docs/fundamentals/networking/snippets/httpclient/Program.Responses.cs.md)

In this code, the `result` value is the response body deserialized as the type `T`.

## Use HTTP error handling

When an HTTP request fails, the system throws the [System.Net.Http.HttpRequestException](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpRequestException) object. Catching the exception alone might not be sufficient. There are other potential exceptions thrown that you might want to consider handling. For example, the calling code might use a cancellation token that was canceled before the request completed. In this scenario, you can catch the [System.Threading.Tasks.TaskCanceledException](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskCanceledException) error:

[source="../snippets/httpclient/Program.Cancellation.cs" id="cancellation"::: (complete source file; reference: ../snippets/httpclient/Program.Cancellation.cs)](../../../../_code/docs/fundamentals/networking/snippets/httpclient/Program.Cancellation.cs.md)

Likewise, when you make an HTTP request, if the server doesn't respond before the [System.Net.Http.HttpClient.Timeout](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient.Timeout) value is exceeded, the same exception is thrown. In this scenario, you can distinguish that the time-out occurred by evaluating the [System.Exception.InnerException](https://learn.microsoft.com/search/?terms=System.Exception.InnerException) property when catching the [System.Threading.Tasks.TaskCanceledException](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskCanceledException) error:

[source="../snippets/httpclient/Program.CancellationInnerTimeout.cs" id="innertimeout"::: (complete source file; reference: ../snippets/httpclient/Program.CancellationInnerTimeout.cs)](../../../../_code/docs/fundamentals/networking/snippets/httpclient/Program.CancellationInnerTimeout.cs.md)

In the code, when the inner exception is an [System.TimeoutException](https://learn.microsoft.com/search/?terms=System.TimeoutException) type, then the time-out occurred and the cancellation token doesn't cancel the request.

To evaluate the HTTP status code when you catch the [System.Net.Http.HttpRequestException](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpRequestException) object, you can evaluate the [System.Net.Http.HttpRequestException.StatusCode](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpRequestException.StatusCode) property:

[source="../snippets/httpclient/Program.CancellationStatusCode.cs" id="statuscode"::: (complete source file; reference: ../snippets/httpclient/Program.CancellationStatusCode.cs)](../../../../_code/docs/fundamentals/networking/snippets/httpclient/Program.CancellationStatusCode.cs.md)

In the code, the [System.Net.Http.HttpResponseMessage.EnsureSuccessStatusCode](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpResponseMessage.EnsureSuccessStatusCode) method is called to throw an exception if the response isn't successful. The [System.Net.Http.HttpRequestException.StatusCode](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpRequestException.StatusCode) property is then evaluated to determine if the response was a `404` (HTTP status code 404). There are several helper methods on the `HttpClient` object that implicitly call the `EnsureSuccessStatusCode` method on your behalf.

For HTTP error handing, consider the following APIs:

- [System.Net.Http.HttpClient.GetByteArrayAsync*](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient.GetByteArrayAsync*) method
- [System.Net.Http.HttpClient.GetStreamAsync*](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient.GetStreamAsync*) method
- [System.Net.Http.HttpClient.GetStringAsync*](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient.GetStringAsync*) method

> **Tip:**
> All `HttpClient` methods used to make HTTP requests that don't return an `HttpResponseMessage` type implicitly call the `EnsureSuccessStatusCode` method on your behalf.

When you call these methods, you can handle the `HttpRequestException` object and evaluate the [System.Net.Http.HttpRequestException.StatusCode](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpRequestException.StatusCode) property to determine the HTTP status code of the response:

[source="../snippets/httpclient/Program.CancellationStream.cs" id="helpers"::: (complete source file; reference: ../snippets/httpclient/Program.CancellationStream.cs)](../../../../_code/docs/fundamentals/networking/snippets/httpclient/Program.CancellationStream.cs.md)

There might be scenarios where you need to throw the [System.Net.Http.HttpRequestException](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpRequestException) object in your code. The [System.Net.Http.HttpRequestException.%23ctor](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpRequestException.%2523ctor) constructor is public and you can use it to throw an exception with a custom message:

[source="../snippets/httpclient/Program.ThrowHttpException.cs" id="throw"::: (complete source file; reference: ../snippets/httpclient/Program.ThrowHttpException.cs)](../../../../_code/docs/fundamentals/networking/snippets/httpclient/Program.ThrowHttpException.cs.md)

## Configure an HTTP proxy

An HTTP proxy can be configured in one of two ways. A default is specified on the [System.Net.Http.HttpClient.DefaultProxy](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient.DefaultProxy) property. Alternatively, you can specify a proxy on the [System.Net.Http.HttpClientHandler.Proxy](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClientHandler.Proxy) property.

### Use a global default proxy

The `HttpClient.DefaultProxy` property is a static property that determines the default proxy that all `HttpClient` instances use, if no proxy is set explicitly in the [System.Net.Http.HttpClientHandler](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClientHandler) object passed through its constructor.

The default instance returned by this property initializes according to a different set of rules depending on your platform:

- **Windows**: Read proxy configuration from environment variables, or if variables aren't defined, read from user proxy settings.
- **macOS**: Read proxy configuration from environment variables, or if variables aren't defined, read from system proxy settings.
- **Linux**: Read proxy configuration from environment variables, or if variables aren't defined, initialize a nonconfigured instance to bypass all addresses.

On Windows, when you enable **Automatically detect settings** in the proxy settings, the system typically uses the Web Proxy Auto-Discovery (WPAD) protocol. In the most common configuration, WPAD queries DNS for a host named `wpad` (and might try variants based on DNS search suffixes), then downloads a Proxy Auto-Config (PAC) file, often from a URL such as `http://wpad/wpad.dat`. Network administrators can also configure WPAD through DHCP or custom PAC URLs, so the exact discovery steps and PAC URL depend on your network configuration. The PAC file is a JavaScript file that the system evaluates to determine the correct proxy for each URL.

The `DefaultProxy` property initialization on Windows and Unix-based platforms uses the following environment variables:

- `HTTP_PROXY`: The proxy server used on HTTP requests.
- `HTTPS_PROXY`: The proxy server used on HTTPS requests.
- `ALL_PROXY`: The proxy server used on HTTP and/or HTTPS requests when the `HTTP_PROXY` and/or `HTTPS_PROXY` variables aren't defined.
- `NO_PROXY`: A comma-separated list of hostnames to exclude from proxying. Asterisks aren't supported for wildcards. Use a leading period (.) when you want to match a subdomain. Examples: `NO_PROXY=.example.com` (with leading period) matches `www.example.com`, but doesn't match `example.com`. `NO_PROXY=example.com` (without leading period) doesn't match `www.example.com`. This behavior might be revisited in the future to match other ecosystems better.

On systems where environment variables are case-sensitive, the variable names can be all lowercase or all uppercase. The lowercase names are checked first.

The proxy server can be a hostname or IP address, optionally followed by a colon and port number, or it can be an `http` URL, optionally including a username and password for proxy authentication. The URL must start with `http`, not `https`, and can't include any text after the hostname, IP, or port.

### Configure the proxy per client

The [System.Net.Http.HttpClientHandler.Proxy](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClientHandler.Proxy) property identifies the [System.Net.WebProxy](https://learn.microsoft.com/search/?terms=System.Net.WebProxy) object to use to process requests to internet resources. To specify that no proxy should be used, set the `Proxy` property to the proxy instance returned by the [System.Net.GlobalProxySelection.GetEmptyWebProxy](https://learn.microsoft.com/search/?terms=System.Net.GlobalProxySelection.GetEmptyWebProxy) method.

The local computer or application configuration file might specify that a default proxy is used. If the `Proxy` property is specified, then the proxy settings from the `Proxy` property override the local computer or application config file and the handler uses the proxy settings specified. If no proxy is specified in a config file and the `Proxy` property is unspecified, the handler uses the proxy settings inherited from the local computer. If there are no proxy settings, the request is sent directly to the server.

The [System.Net.Http.HttpClientHandler](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClientHandler) class parses a proxy bypass list with wildcard characters inherited from local computer settings. For example, the `HttpClientHandler` class parses a bypass list of `"nt*"` from browsers as a regular expression of `"nt.*"`. Therefore, a URL of `http://nt.com` bypasses the proxy by using the `HttpClientHandler` class.

The `HttpClientHandler` class supports local proxy bypass. The class considers a destination to be local if any of the following conditions are met:

- The destination contains a flat name (no periods (.) in the URL).
- The destination contains a loopback address ([System.Net.IPAddress.Loopback](https://learn.microsoft.com/search/?terms=System.Net.IPAddress.Loopback) or [System.Net.IPAddress.IPv6Loopback](https://learn.microsoft.com/search/?terms=System.Net.IPAddress.IPv6Loopback)) or the destination contains an [System.Net.IPAddress](https://learn.microsoft.com/search/?terms=System.Net.IPAddress) property assigned to the local computer.
- The domain suffix of the destination matches the local computer's domain suffix, as defined in the [System.Net.NetworkInformation.IPGlobalProperties.DomainName](https://learn.microsoft.com/search/?terms=System.Net.NetworkInformation.IPGlobalProperties.DomainName) property.

For more information about configuring a proxy, see the following APIs:

- [System.Net.WebProxy.Address](https://learn.microsoft.com/search/?terms=System.Net.WebProxy.Address) property
- [System.Net.WebProxy.BypassProxyOnLocal](https://learn.microsoft.com/search/?terms=System.Net.WebProxy.BypassProxyOnLocal) property
- [System.Net.WebProxy.BypassArrayList](https://learn.microsoft.com/search/?terms=System.Net.WebProxy.BypassArrayList) property

## Next steps

- [HTTP support in .NET](http-overview.md)
- [Guidelines for using HttpClient](httpclient-guidelines.md)
- [HTTP client factory with .NET](../../../core/extensions/httpclient-factory.md)
- [Use HTTP/3 with HttpClient](../../../core/extensions/httpclient-http3.md)
- [Test web APIs with the HttpRepl](https://learn.microsoft.com/aspnet/core/web-api/http-repl)
