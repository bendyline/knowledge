---
title: Azure Functions HTTP output bindings
description: Learn how to return HTTP responses in Azure Functions.
ms.topic: reference
ms.custom: devx-track-extended-java, devx-track-js, devx-track-python, devx-track-ts
ms.date: 09/15/2026
zone_pivot_groups: programming-languages-set-functions
---

# Azure Functions HTTP output bindings

HTTP-triggered functions use HTTP output to respond to the HTTP request sender. In most languages, this output is represented as an HTTP output binding. In Go, HTTP responses are written directly with the `http.ResponseWriter` passed to your HTTP trigger handler rather than with a separate output binding configuration.

The default return value for an HTTP-triggered function is `HTTP 204 No Content` with an empty body.

**Applies to: programming-language-csharp**

## Attribute

# [Isolated worker model](#tab/isolated-process)

A return value attribute isn't required when using [HttpResponseData]. However, when using a [ASP.NET Core integration](dotnet-isolated-process-guide.md#aspnet-core-integration) and [multi-binding output objects](dotnet-isolated-process-guide.md#multiple-output-bindings), the `[HttpResultAttribute]` attribute should be applied to the object property. The attribute takes no parameters. To learn more, see [Usage](#usage).

# [In-process model](#tab/in-process)


> **Important:**
> [Support will end for the in-process model on November 10, 2026](https://aka.ms/azure-functions-retirements/in-process-model). We highly recommend that you [migrate your apps to the isolated worker model](https://learn.microsoft.com/azure/azure-functions/migrate-dotnet-to-isolated-model?tabs=net8) for full support.

A return value attribute isn't required for a [class library](functions-dotnet-class-library.md). C# script instead uses a function.json configuration file as described in the [C# scripting guide](functions-reference-csharp.md#http-output). To learn more, see [Usage](#usage).

---


**Applies to: programming-language-java**

## Annotations

In the [Java functions runtime library](https://learn.microsoft.com/java/api/overview/azure/functions/runtime), use the [HttpOutput](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.httpoutput) annotation to define an output variable other than the default variable returned by the function. This annotation supports the following settings:

+ [dataType](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.httpoutput.datatype)
+ [name](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.httpoutput.name)


**Applies to: programming-language-javascript,programming-language-typescript**


> **Important:**
> This article uses tabs to support multiple versions of the Node.js programming model. The v4 model is generally available and is designed to have a more flexible and intuitive experience for JavaScript and TypeScript developers. For more details about how the v4 model works, refer to the [Azure Functions Node.js developer guide](functions-reference-node.md). To learn more about the differences between v3 and v4, refer to the [migration guide](functions-node-upgrade-v4.md). 


## Configuration

# [Model v4](#tab/nodejs-v4)

The `options` object passed to the `output.http()` method currently doesn't support any properties for model v4.

# [Model v3](#tab/nodejs-v3)

The following table explains the binding configuration properties that you set in the *function.json* file.

| Property | Description |
| --- | --- |
| **type** | Must be set to `http`. |
| **direction** | Must be set to `out`. |
| **name** | The variable name used in function code for the response, or `$return` to use the return value. |

---


**Applies to: programming-language-python,programming-language-powershell**

## Configuration

The following table explains the binding configuration properties that you set in the *function.json* file.

| Property | Description |
| --- | --- |
| **type** | Must be set to `http`. |
| **direction** | Must be set to `out`. |
| **name** | The variable name used in function code for the response, or `$return` to use the return value. |


**Applies to: programming-language-go**


In Go, HTTP output is handled through the standard `http.ResponseWriter` that's passed to your HTTP trigger handler. You write your response directly using the writer. No separate output binding configuration is needed.

```go
func hello(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusOK)
    fmt.Fprintf(w, `{"message": "Hello from Go!"}`)
}
```



## Usage

To send an HTTP response, use the language-standard response patterns. 

**Applies to: programming-language-csharp**


In .NET, the response type depends on the C# mode:

# [Isolated worker model](#tab/isolated-process)

The HTTP triggered function returns an object of one of the following types:

- [IActionResult]<sup>1</sup> (or `Task<IActionResult>`)
- [HttpResponse]<sup>1</sup> (or `Task<HttpResponse>`)
- [HttpResponseData] (or `Task<HttpResponseData>`)
- JSON serializable types representing the response body for a `200 OK` response.

<sup>1</sup> This type is only available when using  [ASP.NET Core integration](dotnet-isolated-process-guide.md#aspnet-core-integration).

When one of these types is used as part of [multi-binding output objects](dotnet-isolated-process-guide.md#multiple-output-bindings), the `[HttpResult]` attribute should be applied to the object property. The attribute takes no parameters.

[IActionResult]: https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.mvc.iactionresult
[HttpResponse]: https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.http.httpresponse

# [In-process model](#tab/in-process)

The HTTP triggered function returns a type of [IActionResult] or `Task<IActionResult>`.

---


**Applies to: programming-language-java**


For Java, use an [HttpResponseMessage.Builder](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.httpresponsemessage.builder) to create a response to the HTTP trigger. To learn more, see [HttpRequestMessage and HttpResponseMessage](functions-reference-java.md#httprequestmessage-and-httpresponsemessage).



For example responses, see the [trigger examples](functions-bindings-http-webhook-trigger.md#example).

## Next steps

- [Run a function from an HTTP request](functions-bindings-http-webhook-trigger.md)

[HttpResponseData]: https://learn.microsoft.com/dotnet/api/microsoft.azure.functions.worker.http.httpresponsedata
