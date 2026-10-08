---
title: Connect functions to other Azure services 
description: Learn how to add bindings that connect to other Azure services to an existing function in your Azure Functions project.
ms.topic: how-to
ms.date: 08/18/2023
ms.custom: vscode-azure-extension-update-not-needed, devx-track-extended-java, devx-track-js, devx-track-python, devx-track-ts
zone_pivot_groups: programming-languages-set-functions    
#Customer intent: As a developer, I need to know how to add a binding to an existing function so that I can integrate external services to my function.
---

# Connect functions to Azure services using bindings

When you create a function, language-specific trigger code is added in your project from a set of trigger templates. If you want to connect your function to other services by using input or output bindings, you have to add specific binding definitions in your function. To learn more about bindings, see [Azure Functions triggers and bindings concepts](functions-triggers-bindings.md).

## Local development       

When you develop functions locally, you need to update the function code to add bindings. For languages that use function.json, [Visual Studio Code](#visual-studio-code) provides tooling to add bindings to a function.  

### Manually add bindings based on examples

**Applies to: programming-language-csharp**

When adding a binding to an existing function, you need to add binding-specific attributes to the function definition in code. 

**Applies to: programming-language-java**

When adding a binding to an existing function, you need to add binding-specific annotations to the function definition in code.

**Applies to: programming-language-javascript,programming-language-powershell**

When adding a binding to an existing function, you need to update the function code and add a definition to the function.json configuration file. 

**Applies to: programming-language-python**

When adding a binding to an existing function, you need to update the function definition depending on your model:

#### [v2](#tab/python-v2)
You need to add binding-specific annotations to the function definition in code.
#### [v1](#tab/python-v1)
You need to update the function code and add a definition to the function.json configuration file.

---


**Applies to: programming-language-go**

In Go, you configure supported triggers by using the fluent registration API in your `main()` function. Each trigger type has a dedicated registration method with functional options for configuration. No separate binding configuration file is needed.

The following example shows an [HTTP triggered function](functions-bindings-http-webhook-trigger.md). If you need to write to Queue Storage from a Go function, use the Azure SDK for Go directly because Queue Storage output bindings aren't currently supported by the Go worker:

```go
package main

import (
    "encoding/json"
    "fmt"
    "net/http"

    "github.com/azure/azure-functions-golang-worker/sdk"
    "github.com/azure/azure-functions-golang-worker/worker"
)

func main() {
    app := sdk.FunctionApp()
    app.HTTP("HttpExample", httpHandler,
        sdk.WithMethods("GET", "POST"),
        sdk.WithAuth("anonymous"),
    )
    worker.Start(app)
}

func httpHandler(w http.ResponseWriter, r *http.Request) {
    name := r.URL.Query().Get("name")
    if name == "" {
        var body struct{ Name string }
        json.NewDecoder(r.Body).Decode(&body)
        name = body.Name
    }
    if name == "" {
        w.WriteHeader(http.StatusBadRequest)
        fmt.Fprint(w, "Please pass a name on the query string or in the request body.")
        return
    }
    // Queue output bindings are not yet supported in the Go worker.
    // Use the Azure SDK for Go to write to Queue Storage directly.
    fmt.Fprintf(w, "Hello, %s!", name)
}
```

> **Note:**
> The Go worker currently supports triggers only. Input and output bindings, such as Queue Storage output bindings, aren't yet available. Use the [Azure SDK for Go](https://github.com/Azure/azure-sdk-for-go) to interact with other Azure services directly from your function code.

The Go worker currently supports the following trigger types:

| Trigger type | Registration method | Examples |
| --- | --- | --- |
| [HTTP](functions-bindings-http-webhook-trigger.md) | `app.HTTP()` | [HTTP samples](https://github.com/Azure/azure-functions-golang-worker/tree/main/samples/httpTrigger) |
| [Timer](functions-bindings-timer.md) | `app.Timer()` | [Timer samples](https://github.com/Azure/azure-functions-golang-worker/tree/main/samples/timerTrigger) |
| [Azure Cosmos DB](functions-bindings-cosmosdb-v2-trigger.md) | `app.CosmosDB()` | [Cosmos DB samples](https://github.com/Azure/azure-functions-golang-worker/tree/main/samples/cosmosDBTrigger) |
| [Azure Service Bus (Queue)](functions-bindings-service-bus-trigger.md) | `app.ServiceBusQueue()` | [Service Bus queue samples](https://github.com/Azure/azure-functions-golang-worker/tree/main/samples/serviceBusQueueTrigger) |
| [Azure Service Bus (Topic)](functions-bindings-service-bus-trigger.md) | `app.ServiceBusTopic()` | [Service Bus topic samples](https://github.com/Azure/azure-functions-golang-worker/tree/main/samples/serviceBusTopicTrigger) |
| [Event Hubs](functions-bindings-event-hubs-trigger.md) | `app.EventHub()` | [Event Hubs samples](https://github.com/Azure/azure-functions-golang-worker/tree/main/samples/eventHubTrigger) |
| [Event Grid](functions-bindings-event-grid-trigger.md) | `app.EventGrid()` | [Event Grid samples](https://github.com/Azure/azure-functions-golang-worker/tree/main/samples/eventGridTrigger) |
| [Blob Storage](functions-bindings-storage-blob-trigger.md) | `app.Blob()` | [Blob samples](https://github.com/Azure/azure-functions-golang-worker/tree/main/samples/blobTrigger) |

For more information, see the [Go developer reference](functions-reference-go.md).


**Applies to: programming-language-csharp,programming-language-java,programming-language-javascript,programming-language-powershell,programming-language-python,programming-language-typescript**


The following example shows the function definition after adding a [Queue Storage output binding](functions-bindings-storage-queue-output.md) to an [HTTP triggered function](functions-bindings-http-webhook-trigger.md):  
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

This example uses [ASP.NET Core integration](dotnet-isolated-process-guide.md#aspnet-core-integration). If you aren't using ASP.NET Core integration, you need to change `HttpRequest` to `HttpRequestData` and `IActionResult` to `HttpResponseData`.

### [In-process](#tab/in-process)
[Code reference unavailable in this source snapshot: ~/functions-docs-csharp/functions-add-output-binding-storage-queue-cli/HttpExample.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/add-bindings-existing-function.md)

---
Messages are sent to the queue when the function completes. The way you define the output binding depends on your process model. For more information, including links to example binding code that you can refer to, see [Add bindings to a function](add-bindings-existing-function.md?tabs=csharp#manually-add-bindings-based-on-examples).  

**Applies to: programming-language-java**


[Code reference unavailable in this source snapshot: ~/functions-quickstart-java/functions-add-output-binding-storage-queue/src/main/java/com/function/Function.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/add-bindings-existing-function.md)
  
For more information, including links to example binding code that you can refer to, see [Add bindings to a function](add-bindings-existing-function.md?tabs=java#manually-add-bindings-based-on-examples).  

**Applies to: programming-language-javascript**

### [v4](#tab/node-v4)

[Code reference unavailable in this source snapshot: ~/functions-docs-javascript/functions-add-output-binding-storage-queue-cli-v4-programming-model/src/functions/httpTrigger1.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/add-bindings-existing-function.md)

### [v3](#tab/node-v3)
[Code reference unavailable in this source snapshot: ~/functions-docs-javascript/functions-add-output-binding-storage-queue-cli/HttpExample/function.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/add-bindings-existing-function.md)

---

The way you define the output binding depends on the version of your Node.js model. For more information, including links to example binding code that you can refer to, see [Add bindings to a function](add-bindings-existing-function.md?tabs=javascript#manually-add-bindings-based-on-examples).   

**Applies to: programming-language-powershell**

[Code reference unavailable in this source snapshot: ~/functions-docs-powershell/functions-add-output-binding-storage-queue-cli/HttpExample/run.ps1](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/add-bindings-existing-function.md)

For more information, including links to example binding code that you can refer to, see [Add bindings to a function](add-bindings-existing-function.md?tabs=powershell#manually-add-bindings-based-on-examples).   

**Applies to: programming-language-python**

### [v2](#tab/python-v2)

[Code reference unavailable in this source snapshot: ~/functions-docs-python-v2/function_app.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/add-bindings-existing-function.md)

### [v1](#tab/python-v1)

[Code reference unavailable in this source snapshot: ~/functions-docs-javascript/functions-add-output-binding-storage-queue-cli/HttpExample/function.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/add-bindings-existing-function.md)

---

The way you define the output binding depends on the version of your Python model. For more information, including links to example binding code that you can refer to, see [Add bindings to a function](add-bindings-existing-function.md?tabs=python#manually-add-bindings-based-on-examples).   

**Applies to: programming-language-typescript**

### [v4](#tab/node-v4)

[Code reference unavailable in this source snapshot: ~/functions-docs-javascript/functions-add-output-binding-storage-queue-cli-v4-programming-model-ts/src/functions/httpTrigger1.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/add-bindings-existing-function.md)

### [v3](#tab/node-v3)

[Code reference unavailable in this source snapshot: ~/functions-docs-javascript/functions-add-output-binding-storage-queue-cli/HttpExample/function.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/add-bindings-existing-function.md)

---

The way you define the output binding depends on the version of your Node.js model. For more information, including links to example binding code that you can refer to, see [Add bindings to a function](add-bindings-existing-function.md?tabs=typescript#manually-add-bindings-based-on-examples).



Use the following table to find examples of specific binding types that you can use to guide you in updating an existing function. First, choose the language tab that corresponds to your project. 


**Applies to: programming-language-csharp**

Binding code for C# depends on the [specific process model](dotnet-isolated-process-guide.md#benefits-of-the-isolated-worker-model).

### [Isolated process](#tab/isolated-process)

| Service | Examples | Samples |
| --- | --- | --- |
| Blob Storage | [Trigger](functions-bindings-storage-blob-trigger.md?tabs=isolated-process\&pivots=programming-language-csharp#example)<br/>[Input](functions-bindings-storage-blob-input.md?tabs=isolated-process\&pivots=programming-language-csharp#example)<br/>[Output](functions-bindings-storage-blob-output.md?tabs=isolated-process\&pivots=programming-language-csharp#example) | [Link](https://github.com/Azure/azure-sdk-for-net/tree/main/sdk/storage/Microsoft.Azure.WebJobs.Extensions.Storage.Blobs) |
| Azure Cosmos DB | [Trigger](functions-bindings-cosmosdb-v2-trigger.md?tabs=isolated-process\&pivots=programming-language-csharp#example)<br/>[Input](functions-bindings-cosmosdb-v2-input.md?tabs=isolated-process\&pivots=programming-language-csharp#example)<br/>[Output](functions-bindings-cosmosdb-v2-output.md?tabs=isolated-process\&pivots=programming-language-csharp#example) | [Link](https://github.com/Azure/azure-webjobs-sdk-extensions/tree/dev/sample/ExtensionsSample/Samples) |
| Azure Data Explorer | [Input](functions-bindings-azure-data-explorer-input.md?pivots=programming-language-csharp#examples)<br/>[Output](functions-bindings-azure-data-explorer-output.md?pivots=programming-language-csharp#examples) | [Link](https://github.com/Azure/Webjobs.Extensions.Kusto/tree/main/samples/samples-csharp) |
| Azure SQL | [Trigger](functions-bindings-azure-sql-trigger.md?tabs=isolated-process\&pivots=programming-language-csharp#example)<br/>[Input](functions-bindings-azure-sql-input.md?tabs=isolated-process\&pivots=programming-language-csharp#example)<br/>[Output](functions-bindings-azure-sql-output.md?tabs=isolated-process\&pivots=programming-language-csharp#example) | [Link](https://learn.microsoft.com/samples/azure-samples/azure-sql-binding-func-dotnet-todo/todo-backend-dotnet-azure-sql-bindings-azure-functions/) |
| Event Grid | [Trigger](functions-bindings-event-grid-trigger.md?tabs=isolated-process\&pivots=programming-language-csharp#example)<br/>[Output](functions-bindings-event-grid-output.md?tabs=isolated-process\&pivots=programming-language-csharp#example) | [Link](https://github.com/Azure/azure-webjobs-sdk-extensions/tree/dev/sample/ExtensionsSample/Samples) |
| Event Hubs | [Trigger](functions-bindings-event-hubs-trigger.md?tabs=isolated-process\&pivots=programming-language-csharp#example)<br/>[Output](functions-bindings-event-hubs-output.md?tabs=isolated-process\&pivots=programming-language-csharp#example) |  |
| IoT Hub | [Trigger](functions-bindings-event-iot-trigger.md?tabs=isolated-process\&pivots=programming-language-csharp#example)<br/>[Output](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-event-iot-output.md?tabs=isolated-process\&pivots=programming-language-csharp#example) |  |
| HTTP | [Trigger](functions-bindings-http-webhook-trigger.md?tabs=isolated-process\&pivots=programming-language-csharp#example) | [Link](https://github.com/Azure-Samples/functions-quickstart-dotnet-azd) |
| Model Context Protocol | [Tool Trigger](functions-bindings-mcp-tool-trigger.md?tabs=attribute\&pivots=programming-language-csharp#example)<br/>[Resource Trigger](functions-bindings-mcp-resource-trigger.md?tabs=attribute\&pivots=programming-language-csharp#example)<br/>[Prompt Trigger](functions-bindings-mcp-prompt-trigger.md?tabs=attribute\&pivots=programming-language-csharp#example) | [Link](https://github.com/Azure-Samples/remote-mcp-functions-dotnet) |
| Queue Storage | [Trigger](functions-bindings-storage-queue-trigger.md?tabs=isolated-process\&pivots=programming-language-csharp#example)<br/>[Output](functions-bindings-storage-queue-output.md?tabs=isolated-process\&pivots=programming-language-csharp#example) | [Link](https://github.com/Azure/azure-sdk-for-net/tree/main/sdk/storage/Microsoft.Azure.WebJobs.Extensions.Storage.Queues/samples/functionapp) |
| RabbitMQ | [Trigger](functions-bindings-rabbitmq-trigger.md?tabs=isolated-process\&pivots=programming-language-csharp#example)<br/>[Output](functions-bindings-rabbitmq-output.md?tabs=isolated-process\&pivots=programming-language-csharp#example) |
| SendGrid | [Output](functions-bindings-sendgrid.md?tabs=isolated-process\&pivots=programming-language-csharp#example) |  |
| Service Bus | [Trigger](functions-bindings-service-bus-trigger.md?tabs=isolated-process\&pivots=programming-language-csharp#example)<br/>[Output](functions-bindings-service-bus-output.md?tabs=isolated-process\&pivots=programming-language-csharp#example) | [Link](https://github.com/Azure/azure-sdk-for-net/tree/main/sdk/servicebus/Microsoft.Azure.WebJobs.Extensions.ServiceBus) |
| Azure SignalR Service | [Trigger](functions-bindings-signalr-service-trigger.md?tabs=isolated-process\&pivots=programming-language-csharp#example)<br/>[Input](functions-bindings-signalr-service-input.md?tabs=isolated-process\&pivots=programming-language-csharp#example)<br/>[Output](functions-bindings-signalr-service-output.md?tabs=isolated-process\&pivots=programming-language-csharp) |  |
| Table Storage | [Input](functions-bindings-storage-table-input.md?tabs=isolated-process\&pivots=programming-language-csharp)<br/>[Output](functions-bindings-storage-table-output.md?tabs=isolated-process\&pivots=programming-language-csharp) |  |
| Timer | [Trigger](functions-bindings-timer.md?tabs=isolated-process\&pivots=programming-language-csharp#example) | [Link](https://github.com/Azure/azure-webjobs-sdk-extensions/tree/dev/sample/ExtensionsSample/Samples) |
| Twilio | [Output](functions-bindings-twilio.md?tabs=isolated-process\&pivots=programming-language-csharp#example) | [Link](https://github.com/Azure/azure-webjobs-sdk-extensions/tree/dev/sample/ExtensionsSample/Samples) |
| Managed connectors | [Trigger](functions-connectors-overview.md?pivots=programming-language-csharp#connector-based-triggers) | [Link](https://github.com/Azure-Samples/functions-connectors-net) |


### [In-process](#tab/in-process)

| Service | Examples | Samples |
| --- | --- | --- |
| Blob Storage | [Trigger](functions-bindings-storage-blob-trigger.md?tabs=in-process\&pivots=programming-language-csharp#example)<br/>[Input](functions-bindings-storage-blob-input.md?tabs=in-process\&pivots=programming-language-csharp#example)<br/>[Output](functions-bindings-storage-blob-output.md?tabs=in-process\&pivots=programming-language-csharp#example) | [Link](https://github.com/Azure/azure-sdk-for-net/tree/main/sdk/storage/Microsoft.Azure.WebJobs.Extensions.Storage.Blobs) |
| Azure Cosmos DB | [Trigger](functions-bindings-cosmosdb-v2-trigger.md?tabs=in-process\&pivots=programming-language-csharp#example)<br/>[Input](functions-bindings-cosmosdb-v2-input.md?tabs=in-process\&pivots=programming-language-csharp#example)<br/>[Output](functions-bindings-cosmosdb-v2-output.md?tabs=in-process\&pivots=programming-language-csharp#example) | [Link](https://github.com/Azure/azure-webjobs-sdk-extensions/tree/dev/sample/ExtensionsSample/Samples) |
| Azure Data Explorer | [Input](functions-bindings-azure-data-explorer-input.md?pivots=programming-language-csharp#examples)<br/>[Output](functions-bindings-azure-data-explorer-output.md?pivots=programming-language-csharp#examples) | [Link](https://github.com/Azure/Webjobs.Extensions.Kusto/tree/main/samples/samples-csharp) |
| Azure SQL | [Trigger](functions-bindings-azure-sql-trigger.md?tabs=in-process\&pivots=programming-language-csharp#example)<br/>[Input](functions-bindings-azure-sql-input.md?tabs=in-process\&pivots=programming-language-csharp#example)<br/>[Output](functions-bindings-azure-sql-output.md?tabs=in-process\&pivots=programming-language-csharp#example) | [Link](https://learn.microsoft.com/samples/azure-samples/azure-sql-binding-func-dotnet-todo/todo-backend-dotnet-azure-sql-bindings-azure-functions/) |
| Event Grid | [Trigger](functions-bindings-event-grid-trigger.md?tabs=in-process\&pivots=programming-language-csharp#example)<br/>[Output](functions-bindings-event-grid-output.md?tabs=in-process\&pivots=programming-language-csharp#example) | [Link](https://github.com/Azure/azure-webjobs-sdk-extensions/tree/dev/sample/ExtensionsSample/Samples) |
| Event Hubs | [Trigger](functions-bindings-event-hubs-trigger.md?tabs=in-process\&pivots=programming-language-csharp#example)<br/>[Output](functions-bindings-event-hubs-output.md?tabs=in-process\&pivots=programming-language-csharp#example) |  |
| IoT Hub | [Trigger](functions-bindings-event-iot-trigger.md?tabs=in-process\&pivots=programming-language-csharp#example)<br/>[Output](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-event-iot-output.md?tabs=in-process\&pivots=programming-language-csharp#example) |  |
| HTTP | [Trigger](functions-bindings-http-webhook-trigger.md?tabs=in-process\&pivots=programming-language-csharp#example) | [Link](https://github.com/Azure-Samples/functions-quickstart-dotnet-azd) |
| Queue Storage | [Trigger](functions-bindings-storage-queue-trigger.md?tabs=in-process\&pivots=programming-language-csharp#example)<br/>[Output](functions-bindings-storage-queue-output.md?tabs=in-process\&pivots=programming-language-csharp#example) | [Link](https://github.com/Azure/azure-sdk-for-net/tree/main/sdk/storage/Microsoft.Azure.WebJobs.Extensions.Storage.Queues/samples/functionapp) |
| RabbitMQ | [Trigger](functions-bindings-rabbitmq-trigger.md?tabs=in-process\&pivots=programming-language-csharp#example)<br/>[Output](functions-bindings-rabbitmq-output.md?tabs=in-process\&pivots=programming-language-csharp#example) |
| SendGrid | [Output](functions-bindings-sendgrid.md?tabs=in-process\&pivots=programming-language-csharp#example) |  |
| Service Bus | [Trigger](functions-bindings-service-bus-trigger.md?tabs=in-process\&pivots=programming-language-csharp#example)<br/>[Output](functions-bindings-service-bus-output.md?tabs=in-process\&pivots=programming-language-csharp#example) | [Link](https://github.com/Azure/azure-sdk-for-net/tree/main/sdk/servicebus/Microsoft.Azure.WebJobs.Extensions.ServiceBus) |
| Azure SignalR Service | [Trigger](functions-bindings-signalr-service-trigger.md?tabs=in-process\&pivots=programming-language-csharp#example)<br/>[Input](functions-bindings-signalr-service-input.md?tabs=in-process\&pivots=programming-language-csharp#example)<br/>[Output](functions-bindings-signalr-service-output.md?tabs=in-process\&pivots=programming-language-csharp) |  |
| Table Storage | [Input](functions-bindings-storage-table-input.md?tabs=in-process\&pivots=programming-language-csharp)<br/>[Output](functions-bindings-storage-table-output.md?tabs=in-process\&pivots=programming-language-csharp) |  |
| Timer | [Trigger](functions-bindings-timer.md?tabs=in-process\&pivots=programming-language-csharp#example) | [Link](https://github.com/Azure/azure-webjobs-sdk-extensions/tree/dev/sample/ExtensionsSample/Samples) |
| Twilio | [Output](functions-bindings-twilio.md?tabs=in-process\&pivots=programming-language-csharp#example) | [Link](https://github.com/Azure/azure-webjobs-sdk-extensions/tree/dev/sample/ExtensionsSample/Samples) |

---


**Applies to: programming-language-java**

| Service | Examples | Samples |
| --- | --- | --- |
| Blob Storage | [Trigger](functions-bindings-storage-blob-trigger.md?pivots=programming-language-java#example)<br/>[Input](functions-bindings-storage-blob-input.md?pivots=programming-language-java#example)<br/>[Output](functions-bindings-storage-blob-output.md?pivots=programming-language-java#example) | [Link](https://github.com/Azure-Samples/azure-functions-samples-java/tree/master/triggers-bindings/src/main/java/com/functions) |
| Azure Cosmos DB | [Trigger](functions-bindings-cosmosdb-v2-trigger.md?pivots=programming-language-java#example)<br/>[Input](functions-bindings-cosmosdb-v2-input.md?pivots=programming-language-java#example)<br/>[Output](functions-bindings-cosmosdb-v2-output.md?pivots=programming-language-java#example) | [Link](https://github.com/Azure-Samples/java-functions-eventhub-cosmosdb) |
| Azure Data Explorer | [Input](functions-bindings-azure-data-explorer-input.md?pivots=programming-language-java#examples)<br/>[Output](functions-bindings-azure-data-explorer-output.md?pivots=programming-language-java#examples) | [Link](https://github.com/Azure/Webjobs.Extensions.Kusto/tree/main/samples/samples-java) |
| Azure SQL | [Trigger](functions-bindings-azure-sql-trigger.md?pivots=programming-language-java#example)<br/>[Input](functions-bindings-azure-sql-input.md?pivots=programming-language-java#example)<br/>[Output](functions-bindings-azure-sql-output.md?pivots=programming-language-java#example) |  |
| Event Grid | [Trigger](functions-bindings-event-grid-trigger.md?pivots=programming-language-java#example)<br/>[Output](functions-bindings-event-grid-output.md?pivots=programming-language-java#example) | [Link](https://github.com/Azure-Samples/azure-functions-samples-java/tree/master/triggers-bindings/src/main/java/com/functions) |
| Event Hubs | [Trigger](functions-bindings-event-hubs-trigger.md?pivots=programming-language-java#example)<br/>[Output](functions-bindings-event-hubs-output.md?pivots=programming-language-java#example) |  |
| IoT Hub | [Trigger](functions-bindings-event-iot-trigger.md?pivots=programming-language-java#example)<br/>[Output](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-event-iot-output.md?pivots=programming-language-java#example) |  |
| HTTP | [Trigger](functions-bindings-http-webhook-trigger.md?pivots=programming-language-java#example) | [Link](https://github.com/Azure-Samples/azure-functions-samples-java/tree/master/triggers-bindings/src/main/java/com/functions) |
| Model Context Protocol | [Tool Trigger](functions-bindings-mcp-tool-trigger.md?tabs=attribute\&pivots=programming-language-java#example)<br/>[Resource Trigger](functions-bindings-mcp-resource-trigger.md?tabs=attribute\&pivots=programming-language-java#example)<br/>[Prompt Trigger](functions-bindings-mcp-prompt-trigger.md?tabs=attribute\&pivots=programming-language-java#example) | [Link](https://github.com/Azure-Samples/remote-mcp-functions-java) |
| Queue Storage | [Trigger](functions-bindings-storage-queue-trigger.md?pivots=programming-language-java#example)<br/>[Output](functions-bindings-storage-queue-output.md?pivots=programming-language-java#example) | [Link](https://github.com/Azure-Samples/azure-functions-samples-java/tree/master/triggers-bindings/src/main/java/com/functions) |
| RabbitMQ | [Trigger](functions-bindings-rabbitmq-trigger.md?pivots=programming-language-java#example)<br/>[Output](functions-bindings-rabbitmq-output.md?pivots=programming-language-java#example) |
| SendGrid | [Output](functions-bindings-sendgrid.md?pivots=programming-language-java#example) |  |
| Service Bus | [Trigger](functions-bindings-service-bus-trigger.md?pivots=programming-language-java#example)<br/>[Output](functions-bindings-service-bus-output.md?pivots=programming-language-java#example) | [Link](https://github.com/Azure-Samples/azure-functions-samples-java/tree/master/triggers-bindings/src/main/java/com/functions) |
| Azure SignalR Service | [Trigger](functions-bindings-signalr-service-trigger.md?pivots=programming-language-java#example)<br/>[Input](functions-bindings-signalr-service-input.md?pivots=programming-language-java#example)<br/>[Output](functions-bindings-signalr-service-output.md?pivots=programming-language-java) |  |
| Table Storage | [Input](functions-bindings-storage-table-input.md?pivots=programming-language-java)<br/>[Output](functions-bindings-storage-table-output.md?pivots=programming-language-java) |  |
| Timer | [Trigger](functions-bindings-timer.md?pivots=programming-language-java#example) | [Link](https://github.com/Azure-Samples/azure-functions-samples-java/tree/master/triggers-bindings/src/main/java/com/functions) |
| Twilio | [Output](functions-bindings-twilio.md?pivots=programming-language-java#example) |  |

**Applies to: programming-language-javascript,programming-language-typescript**

| Service | Examples | Samples |
| --- | --- | --- |
| Blob Storage | [Trigger](functions-bindings-storage-blob-trigger.md?pivots=programming-language-javascript#example)<br/>[Input](functions-bindings-storage-blob-input.md?pivots=programming-language-javascript#example)<br/>[Output](functions-bindings-storage-blob-output.md?pivots=programming-language-javascript#example) | [Link](https://github.com/Azure-Samples/azure-functions-blob-sdk-bindings-nodejs) |
| Azure Cosmos DB | [Trigger](functions-bindings-cosmosdb-v2-trigger.md?pivots=programming-language-javascript#example)<br/>[Input](functions-bindings-cosmosdb-v2-input.md?pivots=programming-language-javascript#example)<br/>[Output](functions-bindings-cosmosdb-v2-output.md?pivots=programming-language-javascript#example) | [Link](https://github.com/Azure-Samples/functions-docs-javascript/tree/master/functions-add-output-binding-cosmosdb-cli-v4-programming-model) |
| Azure Data Explorer | [Input](functions-bindings-azure-data-explorer-input.md?pivots=programming-language-javascript#examples)<br/>[Output](functions-bindings-azure-data-explorer-output.md?pivots=programming-language-javascript#examples) |  |
| Azure SQL | [Trigger](functions-bindings-azure-sql-trigger.md?pivots=programming-language-javascript#example)<br/>[Input](functions-bindings-azure-sql-input.md?pivots=programming-language-javascript#example)<br/>[Output](functions-bindings-azure-sql-output.md?pivots=programming-language-javascript#example) | [Link](https://github.com/Azure/Webjobs.Extensions.Kusto/tree/main/samples/samples-node) |
| Event Grid | [Trigger](functions-bindings-event-grid-trigger.md?pivots=programming-language-javascript#example)<br/>[Output](functions-bindings-event-grid-output.md?pivots=programming-language-javascript#example) |  |
| Event Hubs | [Trigger](functions-bindings-event-hubs-trigger.md?pivots=programming-language-javascript#example)<br/>[Output](functions-bindings-event-hubs-output.md?pivots=programming-language-javascript#example) |  |
| IoT Hub | [Trigger](functions-bindings-event-iot-trigger.md?pivots=programming-language-javascript#example)<br/>[Output](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-event-iot-output.md?pivots=programming-language-javascript#example) |  |
| HTTP | [Trigger](functions-bindings-http-webhook-trigger.md?pivots=programming-language-javascript#example) | [Link](https://github.com/Azure-Samples/functions-docs-javascript/tree/master/functions-typescript) |
| Model Context Protocol | [Tool Trigger](functions-bindings-mcp-tool-trigger.md?tabs=attribute\&pivots=programming-language-typescript#example)<br/>[Resource Trigger](functions-bindings-mcp-resource-trigger.md?tabs=attribute\&pivots=programming-language-typescript#example)<br/>[Prompt Trigger](functions-bindings-mcp-prompt-trigger.md?tabs=attribute\&pivots=programming-language-typescript#example) | [Link](https://github.com/Azure-Samples/remote-mcp-functions-typescript) |
| Queue Storage | [Trigger](functions-bindings-storage-queue-trigger.md?pivots=programming-language-javascript#example)<br/>[Output](functions-bindings-storage-queue-output.md?pivots=programming-language-javascript#example) | [Link](https://github.com/Azure-Samples/functions-docs-javascript/tree/master/functions-add-output-binding-storage-queue-cli-v4-programming-model) |
| RabbitMQ | [Trigger](functions-bindings-rabbitmq-trigger.md?pivots=programming-language-javascript#example)<br/>[Output](functions-bindings-rabbitmq-output.md?pivots=programming-language-javascript#example) |
| SendGrid | [Output](functions-bindings-sendgrid.md?pivots=programming-language-javascript#example) |  |
| Service Bus | [Trigger](functions-bindings-service-bus-trigger.md?pivots=programming-language-javascript#example)<br/>[Output](functions-bindings-service-bus-output.md?pivots=programming-language-javascript#example) | [Link](https://github.com/Azure-Samples/azure-functions-servicebus-sdk-bindings-nodejs/tree/main/serviceBusSampleWithComplete) |
| Azure SignalR Service | [Trigger](functions-bindings-signalr-service-trigger.md?pivots=programming-language-javascript#example)<br/>[Input](functions-bindings-signalr-service-input.md?pivots=programming-language-javascript#example)<br/>[Output](functions-bindings-signalr-service-output.md?pivots=programming-language-javascript) |  |
| Table Storage | [Input](functions-bindings-storage-table-input.md?pivots=programming-language-javascript)<br/>[Output](functions-bindings-storage-table-output.md?pivots=programming-language-javascript) |  |
| Timer | [Trigger](functions-bindings-timer.md?pivots=programming-language-javascript#example) |  |
| Twilio | [Output](functions-bindings-twilio.md?pivots=programming-language-javascript#example) |  |
| Managed connectors | [Trigger](functions-connectors-overview.md?pivots=programming-language-typescript#connector-based-triggers) | [Link](https://github.com/Azure-Samples/functions-connectors-typescript) |

**Applies to: programming-language-powershell**

| Service | Examples | Samples |
| --- | --- | --- |
| Blob Storage | [Trigger](functions-bindings-storage-blob-trigger.md?pivots=programming-language-powershell#example)<br/>[Input](functions-bindings-storage-blob-input.md?pivots=programming-language-powershell#example)<br/>[Output](functions-bindings-storage-blob-output.md?pivots=programming-language-powershell#example) |  |
| Azure Cosmos DB | [Trigger](functions-bindings-cosmosdb-v2-trigger.md?pivots=programming-language-powershell#example)<br/>[Input](functions-bindings-cosmosdb-v2-input.md?pivots=programming-language-powershell#example)<br/>[Output](functions-bindings-cosmosdb-v2-output.md?pivots=programming-language-powershell#example) |  |
| Azure SQL | [Trigger](functions-bindings-azure-sql-trigger.md?pivots=programming-language-powershell#example)<br/>[Input](functions-bindings-azure-sql-input.md?pivots=programming-language-powershell#example)<br/>[Output](functions-bindings-azure-sql-output.md?pivots=programming-language-powershell#example) |  |
| Event Grid | [Trigger](functions-bindings-event-grid-trigger.md?pivots=programming-language-powershell#example)<br/>[Output](functions-bindings-event-grid-output.md?pivots=programming-language-powershell#example) |  |
| Event Hubs | [Trigger](functions-bindings-event-hubs-trigger.md?pivots=programming-language-powershell#example)<br/>[Output](functions-bindings-event-hubs-output.md?pivots=programming-language-powershell#example) |  |
| IoT Hub | [Trigger](functions-bindings-event-iot-trigger.md?pivots=programming-language-powershell#example)<br/>[Output](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-event-iot-output.md?pivots=programming-language-powershell#example) |  |
| HTTP | [Trigger](functions-bindings-http-webhook-trigger.md?pivots=programming-language-powershell#example) | [Link](https://github.com/Azure-Samples/functions-quickstart-powershell-azd) |
| Queue Storage | [Trigger](functions-bindings-storage-queue-trigger.md?pivots=programming-language-powershell#example)<br/>[Output](functions-bindings-storage-queue-output.md?pivots=programming-language-powershell#example) |  |
| RabbitMQ | [Trigger](functions-bindings-rabbitmq-trigger.md?pivots=programming-language-powershell#example)<br/>[Output](functions-bindings-rabbitmq-output.md?pivots=programming-language-powershell#example) |
| SendGrid | [Output](functions-bindings-sendgrid.md?pivots=programming-language-powershell#example) |  |
| Service Bus | [Trigger](functions-bindings-service-bus-trigger.md?pivots=programming-language-powershell#example)<br/>[Output](functions-bindings-service-bus-output.md?pivots=programming-language-powershell#example) |  |
| Azure SignalR Service | [Trigger](functions-bindings-signalr-service-trigger.md?pivots=programming-language-powershell#example)<br/>[Input](functions-bindings-signalr-service-input.md?pivots=programming-language-powershell#example)<br/>[Output](functions-bindings-signalr-service-output.md?pivots=programming-language-powershell) |  |
| Table Storage | [Input](functions-bindings-storage-table-input.md?pivots=programming-language-powershell)<br/>[Output](functions-bindings-storage-table-output.md?pivots=programming-language-powershell) |  |
| Timer | [Trigger](functions-bindings-timer.md?pivots=programming-language-powershell#example) |  |
| Twilio | [Output](functions-bindings-twilio.md?pivots=programming-language-powershell#example) |  |

**Applies to: programming-language-python**

Binding code for Python depends on the Python model version.

### [v2](#tab/python-v2)

| Service | Examples | Samples |
| --- | --- | --- |
| Blob Storage | [Trigger](functions-bindings-storage-blob-trigger.md?tabs=python-v2\&pivots=programming-language-python#example)<br/>[Input](functions-bindings-storage-blob-input.md?tabs=python-v2\&pivots=programming-language-python#example)<br/>[Output](functions-bindings-storage-blob-output.md?tabs=python-v2\&pivots=programming-language-python#example) | [Link](https://github.com/Azure-Samples/azure-functions-blob-sdk-bindings-python) |
| Azure Cosmos DB | [Trigger](functions-bindings-cosmosdb-v2-trigger.md?tabs=python-v2\&pivots=programming-language-python#example)<br/>[Input](functions-bindings-cosmosdb-v2-input.md?tabs=python-v2\&pivots=programming-language-python#example)<br/>[Output](functions-bindings-cosmosdb-v2-output.md?tabs=python-v2\&pivots=programming-language-python#example) | [Link](https://github.com/Azure-Samples/functions-quickstart-python-azd-cosmosdb) |
| Azure Data Explorer | [Input](functions-bindings-azure-data-explorer-input.md?pivots=programming-language-python#examples)<br/>[Output](functions-bindings-azure-data-explorer-output.md?pivots=programming-language-python#examples) |  |
| Azure SQL | [Trigger](functions-bindings-azure-sql-trigger.md?tabs=python-v2\&pivots=programming-language-python#example)<br/>[Input](functions-bindings-azure-sql-input.md?tabs=python-v2\&pivots=programming-language-python#example)<br/>[Output](functions-bindings-azure-sql-output.md?tabs=python-v2\&pivots=programming-language-python#example) | [Link](https://github.com/Azure/Webjobs.Extensions.Kusto/tree/main/samples/samples-python) |
| Event Grid | [Trigger](functions-bindings-event-grid-trigger.md?tabs=python-v2\&pivots=programming-language-python#example)<br/>[Output](functions-bindings-event-grid-output.md?tabs=python-v2\&pivots=programming-language-python#example) |  |
| Event Hubs | [Trigger](functions-bindings-event-hubs-trigger.md?tabs=python-v2\&pivots=programming-language-python#example)<br/>[Output](functions-bindings-event-hubs-output.md?tabs=python-v2\&pivots=programming-language-python#example) |  |
| IoT Hub | [Trigger](functions-bindings-event-iot-trigger.md?tabs=python-v2\&pivots=programming-language-python#example)<br/>[Output](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-event-iot-output.md?tabs=python-v2\&pivots=programming-language-python#example) |  |
| HTTP | [Trigger](functions-bindings-http-webhook-trigger.md?tabs=python-v2\&pivots=programming-language-python#example) | [Link](https://github.com/Azure-Samples/functions-quickstart-python-http-azd) |
| Model Context Protocol | [Tool Trigger](functions-bindings-mcp-tool-trigger.md?tabs=attribute\&pivots=programming-language-python#example)<br/>[Resource Trigger](functions-bindings-mcp-resource-trigger.md?tabs=attribute\&pivots=programming-language-python#example)<br/>[Prompt Trigger](functions-bindings-mcp-prompt-trigger.md?tabs=attribute\&pivots=programming-language-python#example) | [Link](https://github.com/Azure-Samples/remote-mcp-functions-python) |
| Queue Storage | [Trigger](functions-bindings-storage-queue-trigger.md?tabs=python-v2\&pivots=programming-language-python#example)<br/>[Output](functions-bindings-storage-queue-output.md?tabs=python-v2\&pivots=programming-language-python#example) |  |
| RabbitMQ | [Trigger](functions-bindings-rabbitmq-trigger.md?tabs=python-v2\&pivots=programming-language-python#example)<br/>[Output](functions-bindings-rabbitmq-output.md?tabs=python-v2\&pivots=programming-language-python#example) |
| SendGrid | [Output](functions-bindings-sendgrid.md?tabs=python-v2\&pivots=programming-language-python#example) |  |
| Service Bus | [Trigger](functions-bindings-service-bus-trigger.md?tabs=python-v2\&pivots=programming-language-python#example)<br/>[Output](functions-bindings-service-bus-output.md?tabs=python-v2\&pivots=programming-language-python#example) | [Link](https://github.com/Azure-Samples/functions-quickstart-python-azd-service-bus) |
| Azure SignalR Service | [Trigger](functions-bindings-signalr-service-trigger.md?tabs=python-v2\&pivots=programming-language-python#example)<br/>[Input](functions-bindings-signalr-service-input.md?tabs=python-v2\&pivots=programming-language-python#example)<br/>[Output](functions-bindings-signalr-service-output.md?tabs=python-v2\&pivots=programming-language-python) |  |
| Table Storage | [Input](functions-bindings-storage-table-input.md?tabs=python-v2\&pivots=programming-language-python)<br/>[Output](functions-bindings-storage-table-output.md?tabs=python-v2\&pivots=programming-language-python) |  |
| Timer | [Trigger](functions-bindings-timer.md?tabs=python-v2\&pivots=programming-language-python#example) |  |
| Twilio | [Output](functions-bindings-twilio.md?tabs=python-v2\&pivots=programming-language-python#example) |  |
| Managed connectors | [Trigger](functions-connectors-overview.md?pivots=programming-language-python#connector-based-triggers) | [Link](https://github.com/Azure-Samples/functions-connectors-python) |

### [v1](#tab/python-v1)
| Service | Examples | Samples |
| --- | --- | --- |
| Blob Storage | [Trigger](functions-bindings-storage-blob-trigger.md?tabs=python-v1\&pivots=programming-language-python#example)<br/>[Input](functions-bindings-storage-blob-input.md?tabs=python-v1\&pivots=programming-language-python#example)<br/>[Output](functions-bindings-storage-blob-output.md?tabs=python-v1\&pivots=programming-language-python#example) |  |
| Azure Cosmos DB | [Trigger](functions-bindings-cosmosdb-v2-trigger.md?tabs=python-v1\&pivots=programming-language-python#example)<br/>[Input](functions-bindings-cosmosdb-v2-input.md?tabs=python-v1\&pivots=programming-language-python#example)<br/>[Output](functions-bindings-cosmosdb-v2-output.md?tabs=python-v1\&pivots=programming-language-python#example) |  |
| Azure Data Explorer | [Input](functions-bindings-azure-data-explorer-input.md?pivots=programming-language-python#examples)<br/>[Output](functions-bindings-azure-data-explorer-output.md?pivots=programming-language-python#examples) |  |
| Azure SQL | [Trigger](functions-bindings-azure-sql-trigger.md?tabs=python-v1\&pivots=programming-language-python#example)<br/>[Input](functions-bindings-azure-sql-input.md?tabs=python-v1\&pivots=programming-language-python#example)<br/>[Output](functions-bindings-azure-sql-output.md?tabs=python-v1\&pivots=programming-language-python#example) | [Link](https://github.com/Azure/Webjobs.Extensions.Kusto/tree/main/samples/samples-python) |
| Event Grid | [Trigger](functions-bindings-event-grid-trigger.md?tabs=python-v1\&pivots=programming-language-python#example)<br/>[Output](functions-bindings-event-grid-output.md?tabs=python-v1\&pivots=programming-language-python#example) |  |
| Event Hubs | [Trigger](functions-bindings-event-hubs-trigger.md?tabs=python-v1\&pivots=programming-language-python#example)<br/>[Output](functions-bindings-event-hubs-output.md?tabs=python-v1\&pivots=programming-language-python#example) |  |
| IoT Hub | [Trigger](functions-bindings-event-iot-trigger.md?tabs=python-v1\&pivots=programming-language-python#example)<br/>[Output](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-event-iot-output.md?tabs=python-v1\&pivots=programming-language-python#example) |  |
| HTTP | [Trigger](functions-bindings-http-webhook-trigger.md?tabs=python-v1\&pivots=programming-language-python#example) |  |
| Queue Storage | [Trigger](functions-bindings-storage-queue-trigger.md?tabs=python-v1\&pivots=programming-language-python#example)<br/>[Output](functions-bindings-storage-queue-output.md?tabs=python-v1\&pivots=programming-language-python#example) |  |
| RabbitMQ | [Trigger](functions-bindings-rabbitmq-trigger.md?tabs=python-v1\&pivots=programming-language-python#example)<br/>[Output](functions-bindings-rabbitmq-output.md?tabs=python-v1\&pivots=programming-language-python#example) |
| SendGrid | [Output](functions-bindings-sendgrid.md?tabs=python-v1\&pivots=programming-language-python#example) |  |
| Service Bus | [Trigger](functions-bindings-service-bus-trigger.md?tabs=python-v1\&pivots=programming-language-python#example)<br/>[Output](functions-bindings-service-bus-output.md?tabs=python-v1\&pivots=programming-language-python#example) |  |
| Azure SignalR Service | [Trigger](functions-bindings-signalr-service-trigger.md?tabs=python-v1\&pivots=programming-language-python#example)<br/>[Input](functions-bindings-signalr-service-input.md?tabs=python-v1\&pivots=programming-language-python#example)<br/>[Output](functions-bindings-signalr-service-output.md?tabs=python-v1\&pivots=programming-language-python) |  |
| Table Storage | [Input](functions-bindings-storage-table-input.md?tabs=python-v1\&pivots=programming-language-python)<br/>[Output](functions-bindings-storage-table-output.md?tabs=python-v1\&pivots=programming-language-python) |  |
| Timer | [Trigger](functions-bindings-timer.md?tabs=python-v1\&pivots=programming-language-python#example) |  |
| Twilio | [Output](functions-bindings-twilio.md?tabs=python-v1\&pivots=programming-language-python#example) |  |

---




### Visual Studio Code

When you use Visual Studio Code to develop your function and your function uses a function.json file, the Azure Functions extension can automatically add a binding to an existing function.json file. To learn more, see [Add input and output bindings](functions-develop-vs-code.md#add-input-and-output-bindings).   

## Azure portal

When you develop your functions in the [Azure portal](https://portal.azure.com), you add input and output bindings in the **Integrate** tab for a given function. The new bindings are added to either the function.json file or to the method attributes, depending on your language. The following articles show examples of how to add bindings to an existing function in the portal:

+ [Queue storage output binding](functions-integrate-storage-queue-output-binding.md)
+ [Azure Cosmos DB output binding](functions-integrate-store-unstructured-data-cosmosdb.md)

## Next steps

+ [Azure Functions triggers and bindings concepts](functions-triggers-bindings.md)
