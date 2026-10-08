---
author: ggailey777
ms.service: azure-functions
ms.topic: include
ms.date: 02/26/2026
ms.author: glenga
---

The following example shows the function definition after adding a [Queue Storage output binding](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-storage-queue-output.md) to an [HTTP triggered function](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-http-webhook-trigger.md):  
**Applies to: programming-language-csharp**

### [Isolated process](#tab/isolated-process)
Because an HTTP triggered function also returns an HTTP response, the function returns a `MultiResponse` object, which represents both the HTTP and queue output.

```csharp
[Function("HttpExample")]
public MultiResponse Run([HttpTrigger(AuthorizationLevel.Function, "get", "post")] HttpRequest req)
```

This example is the definition of the `MultiResponse` object that includes the output binding:

```csharp
public class MultiResponse
{
    [QueueOutput("outqueue",Connection = "AzureWebJobsStorage")]
    public string[] Messages { get; set; }
    public IActionResult HttpResponse { get; set; }
}
```

This example uses [ASP.NET Core integration](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/dotnet-isolated-process-guide.md#aspnet-core-integration). If you aren't using ASP.NET Core integration, you need to change `HttpRequest` to `HttpRequestData` and `IActionResult` to `HttpResponseData`.

### [In-process](#tab/in-process)
[Code reference unavailable in this source snapshot: ~/functions-docs-csharp/functions-add-output-binding-storage-queue-cli/HttpExample.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/includes/functions-add-output-binding-example-all-languages.md)

---
Messages are sent to the queue when the function completes. The way you define the output binding depends on your process model. For more information, including links to example binding code that you can refer to, see [Add bindings to a function](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/add-bindings-existing-function.md?tabs=csharp#manually-add-bindings-based-on-examples).  

**Applies to: programming-language-java**


[Code reference unavailable in this source snapshot: ~/functions-quickstart-java/functions-add-output-binding-storage-queue/src/main/java/com/function/Function.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/includes/functions-add-output-binding-example-all-languages.md)
  
For more information, including links to example binding code that you can refer to, see [Add bindings to a function](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/add-bindings-existing-function.md?tabs=java#manually-add-bindings-based-on-examples).  

**Applies to: programming-language-javascript**

### [v4](#tab/node-v4)

[Code reference unavailable in this source snapshot: ~/functions-docs-javascript/functions-add-output-binding-storage-queue-cli-v4-programming-model/src/functions/httpTrigger1.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/includes/functions-add-output-binding-example-all-languages.md)

### [v3](#tab/node-v3)
[Code reference unavailable in this source snapshot: ~/functions-docs-javascript/functions-add-output-binding-storage-queue-cli/HttpExample/function.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/includes/functions-add-output-binding-example-all-languages.md)

---

The way you define the output binding depends on the version of your Node.js model. For more information, including links to example binding code that you can refer to, see [Add bindings to a function](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/add-bindings-existing-function.md?tabs=javascript#manually-add-bindings-based-on-examples).   

**Applies to: programming-language-powershell**

[Code reference unavailable in this source snapshot: ~/functions-docs-powershell/functions-add-output-binding-storage-queue-cli/HttpExample/run.ps1](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/includes/functions-add-output-binding-example-all-languages.md)

For more information, including links to example binding code that you can refer to, see [Add bindings to a function](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/add-bindings-existing-function.md?tabs=powershell#manually-add-bindings-based-on-examples).   

**Applies to: programming-language-python**

### [v2](#tab/python-v2)

[Code reference unavailable in this source snapshot: ~/functions-docs-python-v2/function_app.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/includes/functions-add-output-binding-example-all-languages.md)

### [v1](#tab/python-v1)

[Code reference unavailable in this source snapshot: ~/functions-docs-javascript/functions-add-output-binding-storage-queue-cli/HttpExample/function.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/includes/functions-add-output-binding-example-all-languages.md)

---

The way you define the output binding depends on the version of your Python model. For more information, including links to example binding code that you can refer to, see [Add bindings to a function](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/add-bindings-existing-function.md?tabs=python#manually-add-bindings-based-on-examples).   

**Applies to: programming-language-typescript**

### [v4](#tab/node-v4)

[Code reference unavailable in this source snapshot: ~/functions-docs-javascript/functions-add-output-binding-storage-queue-cli-v4-programming-model-ts/src/functions/httpTrigger1.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/includes/functions-add-output-binding-example-all-languages.md)

### [v3](#tab/node-v3)

[Code reference unavailable in this source snapshot: ~/functions-docs-javascript/functions-add-output-binding-storage-queue-cli/HttpExample/function.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/includes/functions-add-output-binding-example-all-languages.md)

---

The way you define the output binding depends on the version of your Node.js model. For more information, including links to example binding code that you can refer to, see [Add bindings to a function](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/add-bindings-existing-function.md?tabs=typescript#manually-add-bindings-based-on-examples).
