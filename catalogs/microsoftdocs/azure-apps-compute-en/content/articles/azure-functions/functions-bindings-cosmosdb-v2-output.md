---
title: Azure Cosmos DB output binding for Functions 2.x and higher
description: Learn to use the Azure Cosmos DB output binding in Azure Functions.
ms.topic: reference
ms.date: 10/05/2023
ms.devlang: csharp
# ms.devlang: csharp, java, javascript, powershell, python
zone_pivot_groups: programming-languages-set-functions
ms.custom:
  - devx-track-csharp
  - devx-track-python
  - devx-track-extended-java
  - devx-track-js
  - devx-track-ts
  - sfi-ropc-nochange
---

# Azure Cosmos DB output binding for Azure Functions 2.x and higher

The Azure Cosmos DB output binding lets you write a new document to an Azure Cosmos DB database using the SQL API.

For information on setup and configuration details, see the [overview](functions-bindings-cosmosdb-v2.md).

**Applies to: programming-language-javascript,programming-language-typescript**


> **Important:**
> This article uses tabs to support multiple versions of the Node.js programming model. The v4 model is generally available and is designed to have a more flexible and intuitive experience for JavaScript and TypeScript developers. For more details about how the v4 model works, refer to the [Azure Functions Node.js developer guide](functions-reference-node.md). To learn more about the differences between v3 and v4, refer to the [migration guide](functions-node-upgrade-v4.md). 


**Applies to: programming-language-python**

Azure Functions supports two programming models for Python. The way that you define your bindings depends on your chosen programming model.

# [v2](#tab/python-v2)
The Python v2 programming model lets you define bindings using decorators directly in your Python function code. For more information, see the [Python developer guide](functions-reference-python.md?pivots=python-mode-decorators#programming-model).

# [v1](#tab/python-v1)
The Python v1 programming model requires you to define bindings in a separate *function.json* file in the function folder. For more information, see the [Python developer guide](functions-reference-python.md?pivots=python-mode-configuration#programming-model).

---

This article supports both programming models.


**Applies to: programming-language-csharp**


A C# function can be created by using one of the following C# modes:

* [Isolated worker model](dotnet-isolated-process-guide.md): Compiled C# function that runs in a worker process that's isolated from the runtime. Isolated worker process is required to support C# functions running on LTS and non-LTS versions .NET and the .NET Framework. Extensions for isolated worker process functions use `Microsoft.Azure.Functions.Worker.Extensions.*` namespaces.
* [In-process model](functions-dotnet-class-library.md): Compiled C# function that runs in the same process as the Functions runtime. In a variation of this model, Functions can be run using [C# scripting](functions-reference-csharp.md), which is supported primarily for C# portal editing. Extensions for in-process functions use `Microsoft.Azure.WebJobs.Extensions.*` namespaces.



> **Important:**
> [Support will end for the in-process model on November 10, 2026](https://aka.ms/azure-functions-retirements/in-process-model). We highly recommend that you [migrate your apps to the isolated worker model](https://learn.microsoft.com/azure/azure-functions/migrate-dotnet-to-isolated-model?tabs=net8) for full support.

## Example

Unless otherwise noted, examples in this article target version 3.x of the [Azure Cosmos DB extension](functions-bindings-cosmosdb-v2.md). For use with extension version 4.x, you need to replace the string `collection` in property and attribute names with `container` and `connection_string_setting` with `connection`.

**Applies to: programming-language-go**

Go support isn't currently available for this binding.


**Applies to: programming-language-csharp**


# [Isolated worker model](#tab/isolated-process)

The following code defines a `MyDocument` type:
<!--
:::code language="csharp" source="~/azure-functions-dotnet-worker/samples/Extensions/CosmosDB/CosmosDBFunction.cs" range="49-58":::
-->
In the following example, the return type is an [`IReadOnlyList<T>`](https://learn.microsoft.com/dotnet/api/system.collections.generic.ireadonlylist-1), which is a modified list of documents from trigger binding parameter:
<!--
:::code language="csharp" source="~/azure-functions-dotnet-worker/samples/Extensions/CosmosDB/CosmosDBFunction.cs" range="4-47":::
-->
# [In-process model](#tab/in-process)

This section contains the following examples:

* [Queue trigger, write one doc](#queue-trigger-write-one-doc-c)
* [Queue trigger, write one doc (v4 extension)](#queue-trigger-write-one-doc-v4-c)
* [Queue trigger, write docs using IAsyncCollector](#queue-trigger-write-docs-using-iasynccollector-c)

The examples refer to a simple `ToDoItem` type:

```cs
namespace CosmosDBSamplesV2
{
    public class ToDoItem
    {
        public string id { get; set; }
        public string Description { get; set; }
    }
}
```

<a id="queue-trigger-write-one-doc-c"></a>

### Queue trigger, write one doc

The following example shows a [C# function](functions-dotnet-class-library.md) that adds a document to a database, using data provided in message from Queue storage.

```cs
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Extensions.Logging;
using System;

namespace CosmosDBSamplesV2
{
    public static class WriteOneDoc
    {
        [FunctionName("WriteOneDoc")]
        public static void Run(
            [QueueTrigger("todoqueueforwrite")] string queueMessage,
            [CosmosDB(
                databaseName: "ToDoItems",
                collectionName: "Items",
                ConnectionStringSetting = "CosmosDBConnection")]out dynamic document,
            ILogger log)
        {
            document = new { Description = queueMessage, id = Guid.NewGuid() };

            log.LogInformation($"C# Queue trigger function inserted one row");
            log.LogInformation($"Description={queueMessage}");
        }
    }
}
```

<a id="queue-trigger-write-one-doc-v4-c"></a>

### Queue trigger, write one doc (v4 extension)

Apps using [Azure Cosmos DB extension version 4.x](functions-bindings-cosmosdb-v2.md?tabs=extensionv4) or higher have different attribute properties which are shown below. The following example shows a [C# function](functions-dotnet-class-library.md) that adds a document to a database, using data provided in message from Queue storage.

```cs
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Extensions.Logging;
using System;

namespace CosmosDBSamplesV2
{
    public static class WriteOneDoc
    {
        [FunctionName("WriteOneDoc")]
        public static void Run(
            [QueueTrigger("todoqueueforwrite")] string queueMessage,
            [CosmosDB(
                databaseName: "ToDoItems",
                containerName: "Items",
                Connection = "CosmosDBConnection")]out dynamic document,
            ILogger log)
        {
            document = new { Description = queueMessage, id = Guid.NewGuid() };

            log.LogInformation($"C# Queue trigger function inserted one row");
            log.LogInformation($"Description={queueMessage}");
        }
    }
}
```

<a id="queue-trigger-write-docs-using-iasynccollector-c"></a>

### Queue trigger, write docs using IAsyncCollector

The following example shows a [C# function](functions-dotnet-class-library.md) that adds a collection of documents to a database, using data provided in a queue message JSON.

```cs
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace CosmosDBSamplesV2
{
    public static class WriteDocsIAsyncCollector
    {
        [FunctionName("WriteDocsIAsyncCollector")]
        public static async Task Run(
            [QueueTrigger("todoqueueforwritemulti")] ToDoItem[] toDoItemsIn,
            [CosmosDB(
                databaseName: "ToDoItems",
                collectionName: "Items",
                ConnectionStringSetting = "CosmosDBConnection")]
                IAsyncCollector<ToDoItem> toDoItemsOut,
            ILogger log)
        {
            log.LogInformation($"C# Queue trigger function processed {toDoItemsIn?.Length} items");

            foreach (ToDoItem toDoItem in toDoItemsIn)
            {
                log.LogInformation($"Description={toDoItem.Description}");
                await toDoItemsOut.AddAsync(toDoItem);
            }
        }
    }
}
```

---


**Applies to: programming-language-java**


* [Queue trigger, save message to database via return value](#queue-trigger-save-message-to-database-via-return-value-java)
* [HTTP trigger, save one document to database via return value](#http-trigger-save-one-document-to-database-via-return-value-java)
* [HTTP trigger, save one document to database via OutputBinding](#http-trigger-save-one-document-to-database-via-outputbinding-java)
* [HTTP trigger, save multiple documents to database via OutputBinding](#http-trigger-save-multiple-documents-to-database-via-outputbinding-java)


<a id="queue-trigger-save-message-to-database-via-return-value-java"></a>

### Queue trigger, save message to database via return value

The following example shows a Java function that adds a document to a database with data from a message in Queue storage.

```java
@FunctionName("getItem")
@CosmosDBOutput(name = "database",
  databaseName = "ToDoList",
  collectionName = "Items",
  connectionStringSetting = "AzureCosmosDBConnection")
public String cosmosDbQueryById(
    @QueueTrigger(name = "msg",
      queueName = "myqueue-items",
      connection = "AzureWebJobsStorage")
    String message,
    final ExecutionContext context)  {
     return "{ id: \"" + System.currentTimeMillis() + "\", Description: " + message + " }";
   }
```
<a id="http-trigger-save-one-document-to-database-via-return-value-java"></a>

#### HTTP trigger, save one document to database via return value

The following example shows a Java function whose signature is annotated with `@CosmosDBOutput` and has return value of type `String`. The JSON document returned by the function is automatically written to the corresponding Azure Cosmos DB collection.

```java
    @FunctionName("WriteOneDoc")
    @CosmosDBOutput(name = "database",
      databaseName = "ToDoList",
      collectionName = "Items",
      connectionStringSetting = "Cosmos_DB_Connection_String")
    public String run(
            @HttpTrigger(name = "req",
              methods = {HttpMethod.GET, HttpMethod.POST},
              authLevel = AuthorizationLevel.ANONYMOUS)
            HttpRequestMessage<Optional<String>> request,
            final ExecutionContext context) {

        // Item list
        context.getLogger().info("Parameters are: " + request.getQueryParameters());

        // Parse query parameter
        String query = request.getQueryParameters().get("desc");
        String name = request.getBody().orElse(query);

        // Generate random ID
        final int id = Math.abs(new Random().nextInt());

        // Generate document
        final String jsonDocument = "{\"id\":\"" + id + "\", " +
                                    "\"description\": \"" + name + "\"}";

        context.getLogger().info("Document to be saved: " + jsonDocument);

        return jsonDocument;
    }
```

<a id="http-trigger-save-one-document-to-database-via-outputbinding-java"></a>

### HTTP trigger, save one document to database via OutputBinding

The following example shows a Java function that writes a document to Azure Cosmos DB via an `OutputBinding<T>` output parameter. In this example, the `outputItem` parameter needs to be annotated with `@CosmosDBOutput`, not the function signature. Using `OutputBinding<T>` lets your function take advantage of the binding to write the document to Azure Cosmos DB while also allowing returning a different value to the function caller, such as a JSON or XML document.

```java
    @FunctionName("WriteOneDocOutputBinding")
    public HttpResponseMessage run(
            @HttpTrigger(name = "req",
              methods = {HttpMethod.GET, HttpMethod.POST},
              authLevel = AuthorizationLevel.ANONYMOUS)
            HttpRequestMessage<Optional<String>> request,
            @CosmosDBOutput(name = "database",
              databaseName = "ToDoList",
              collectionName = "Items",
              connectionStringSetting = "Cosmos_DB_Connection_String")
            OutputBinding<String> outputItem,
            final ExecutionContext context) {

        // Parse query parameter
        String query = request.getQueryParameters().get("desc");
        String name = request.getBody().orElse(query);

        // Item list
        context.getLogger().info("Parameters are: " + request.getQueryParameters());

        // Generate random ID
        final int id = Math.abs(new Random().nextInt());

        // Generate document
        final String jsonDocument = "{\"id\":\"" + id + "\", " +
                                    "\"description\": \"" + name + "\"}";

        context.getLogger().info("Document to be saved: " + jsonDocument);

        // Set outputItem's value to the JSON document to be saved
        outputItem.setValue(jsonDocument);

        // return a different document to the browser or calling client.
        return request.createResponseBuilder(HttpStatus.OK)
                      .body("Document created successfully.")
                      .build();
    }
```

<a id="http-trigger-save-multiple-documents-to-database-via-outputbinding-java"></a>

### HTTP trigger, save multiple documents to database via OutputBinding

The following example shows a Java function that writes multiple documents to Azure Cosmos DB via an `OutputBinding<T>` output parameter. In this example, the `outputItem` parameter is annotated with `@CosmosDBOutput`, not the function signature. The output parameter, `outputItem` has a list of `ToDoItem` objects as its template parameter type. Using `OutputBinding<T>` lets your function take advantage of the binding to write the documents to Azure Cosmos DB while also allowing returning a different value to the function caller, such as a JSON or XML document.

```java
    @FunctionName("WriteMultipleDocsOutputBinding")
    public HttpResponseMessage run(
            @HttpTrigger(name = "req",
              methods = {HttpMethod.GET, HttpMethod.POST},
              authLevel = AuthorizationLevel.ANONYMOUS)
            HttpRequestMessage<Optional<String>> request,
            @CosmosDBOutput(name = "database",
              databaseName = "ToDoList",
              collectionName = "Items",
              connectionStringSetting = "Cosmos_DB_Connection_String")
            OutputBinding<List<ToDoItem>> outputItem,
            final ExecutionContext context) {

        // Parse query parameter
        String query = request.getQueryParameters().get("desc");
        String name = request.getBody().orElse(query);

        // Item list
        context.getLogger().info("Parameters are: " + request.getQueryParameters());

        // Generate documents
        List<ToDoItem> items = new ArrayList<>();

        for (int i = 0; i < 5; i ++) {
          // Generate random ID
          final int id = Math.abs(new Random().nextInt());

          // Create ToDoItem
          ToDoItem item = new ToDoItem(String.valueOf(id), name);

          items.add(item);
        }

        // Set outputItem's value to the list of POJOs to be saved
        outputItem.setValue(items);
        context.getLogger().info("Document to be saved: " + items);

        // return a different document to the browser or calling client.
        return request.createResponseBuilder(HttpStatus.OK)
                      .body("Documents created successfully.")
                      .build();
    }
```

In the [Java functions runtime library](https://learn.microsoft.com/java/api/overview/azure/functions/runtime), use the `@CosmosDBOutput` annotation on parameters that is written to Azure Cosmos DB. The annotation parameter type should be `OutputBinding<T>`, where `T` is either a native Java type or a POJO.


**Applies to: programming-language-typescript**


# [Model v4](#tab/nodejs-v4)

The following example shows a storage queue triggered [TypeScript function](functions-reference-node.md?tabs=typescript) for a queue that receives JSON in the following format:

```json
{
    "name": "John Henry",
    "employeeId": "123456",
    "address": "A town nearby"
}
```

The function creates Azure Cosmos DB documents in the following format for each record:

```json
{
    "id": "John Henry-123456",
    "name": "John Henry",
    "employeeId": "123456",
    "address": "A town nearby"
}
```

Here's the TypeScript code:
<!--
:::code language="typescript" source="~/azure-functions-nodejs-v4/ts/src/functions/cosmosOutput1.ts" :::
-->
To output multiple documents, return an array instead of a single object. For example:
<!--
:::code language="typescript" source="~/azure-functions-nodejs-v4/ts/src/functions/cosmosOutput2.ts" id="displayInDocs" :::
-->
# [Model v3](#tab/nodejs-v3)

TypeScript samples are not documented for model v3.

---


**Applies to: programming-language-javascript**


# [Model v4](#tab/nodejs-v4)

The following example shows a storage queue triggered [JavaScript function](functions-reference-node.md) for a queue that receives JSON in the following format:

```json
{
    "name": "John Henry",
    "employeeId": "123456",
    "address": "A town nearby"
}
```

The function creates Azure Cosmos DB documents in the following format for each record:

```json
{
    "id": "John Henry-123456",
    "name": "John Henry",
    "employeeId": "123456",
    "address": "A town nearby"
}
```

Here's the JavaScript code:
<!--
:::code language="javascript" source="~/azure-functions-nodejs-v4/js/src/functions/cosmosOutput1.js" :::
-->
To output multiple documents, return an array instead of a single object. For example:
<!--
:::code language="javascript" source="~/azure-functions-nodejs-v4/js/src/functions/cosmosOutput2.js" id="displayInDocs" :::
-->
# [Model v3](#tab/nodejs-v3)

The following example shows an Azure Cosmos DB output binding in a *function.json* file and a [JavaScript function](functions-reference-node.md) that uses the binding. The function uses a queue input binding for a queue that receives JSON in the following format:

```json
{
    "name": "John Henry",
    "employeeId": "123456",
    "address": "A town nearby"
}
```

The function creates Azure Cosmos DB documents in the following format for each record:

```json
{
    "id": "John Henry-123456",
    "name": "John Henry",
    "employeeId": "123456",
    "address": "A town nearby"
}
```

Here's the binding data in the *function.json* file:

```json
{
    "name": "employeeDocument",
    "type": "cosmosDB",
    "databaseName": "MyDatabase",
    "collectionName": "MyCollection",
    "createIfNotExists": true,
    "connectionStringSetting": "MyAccount_COSMOSDB",
    "direction": "out"
}
```

The [configuration](#configuration) section explains these properties.

Here's the JavaScript code:

```javascript
    module.exports = async function (context) {

      context.bindings.employeeDocument = JSON.stringify({
        id: context.bindings.myQueueItem.name + "-" + context.bindings.myQueueItem.employeeId,
        name: context.bindings.myQueueItem.name,
        employeeId: context.bindings.myQueueItem.employeeId,
        address: context.bindings.myQueueItem.address
      });
    };
```

For bulk insert form the objects first and then, run the stringify function. Here's the JavaScript code:

```javascript
    module.exports = async function (context) {
    
        context.bindings.employeeDocument = JSON.stringify([
        {
            "id": "John Henry-123456",
            "name": "John Henry",
            "employeeId": "123456",
            "address": "A town nearby"
        },
        {
            "id": "John Doe-123457",
            "name": "John Doe",
            "employeeId": "123457",
            "address": "A town far away"
        }]);
    };
```

---


**Applies to: programming-language-powershell**


The following example shows how to write data to Azure Cosmos DB using an output binding. The binding is declared in the function's configuration file (_functions.json_), and takes data from a queue message and writes out to an Azure Cosmos DB document.

```json
{ 
  "name": "EmployeeDocument",
  "type": "cosmosDB",
  "databaseName": "MyDatabase",
  "collectionName": "MyCollection",
  "createIfNotExists": true,
  "connectionStringSetting": "MyStorageConnectionAppSetting",
  "direction": "out" 
} 
```

In the _run.ps1_ file, the object returned from the function is mapped to an `EmployeeDocument` object, which is persisted in the database.

```powershell
param($QueueItem, $TriggerMetadata) 

Push-OutputBinding -Name EmployeeDocument -Value @{ 
    id = $QueueItem.name + '-' + $QueueItem.employeeId 
    name = $QueueItem.name 
    employeeId = $QueueItem.employeeId 
    address = $QueueItem.address 
} 
```


**Applies to: programming-language-python**


The following example demonstrates how to write a document to an Azure Cosmos DB database as the output of a function. The example depends on whether you use the [v1 or v2 Python programming model](functions-reference-python.md).

# [v2](#tab/python-v2)

```python
import logging
import azure.functions as func

app = func.FunctionApp()

@app.route()
@app.cosmos_db_output(arg_name="documents", 
                      database_name="DB_NAME",
                      collection_name="COLLECTION_NAME",
                      create_if_not_exists=True,
                      connection_string_setting="CONNECTION_SETTING")
def main(req: func.HttpRequest, documents: func.Out[func.Document]) -> func.HttpResponse:
    request_body = req.get_body()
    documents.set(func.Document.from_json(request_body))
    return 'OK'
```

# [v1](#tab/python-v1)

The binding definition is defined in *function.json* where *type* is set to `cosmosDB`.

```json
{
  "scriptFile": "__init__.py",
  "bindings": [
    {
      "authLevel": "function",
      "type": "httpTrigger",
      "direction": "in",
      "name": "req",
      "methods": [
        "get",
        "post"
      ]
    },
    {
      "type": "cosmosDB",
      "direction": "out",
      "name": "doc",
      "databaseName": "demodb",
      "collectionName": "data",
      "createIfNotExists": "true",
      "connectionStringSetting": "AzureCosmosDBConnectionString"
    },
    {
      "type": "http",
      "direction": "out",
      "name": "$return"
    }
  ]
}
```

To write to the database, pass a document object to the `set` method of the database parameter.

```python
import azure.functions as func

def main(req: func.HttpRequest, doc: func.Out[func.Document]) -> func.HttpResponse:

    request_body = req.get_body()

    doc.set(func.Document.from_json(request_body))

    return 'OK'
```

---


**Applies to: programming-language-csharp**

## Attributes

Both [in-process](functions-dotnet-class-library.md) and [isolated worker process](dotnet-isolated-process-guide.md) C# libraries use attributes to define the function. C# script instead uses a function.json configuration file as described in the [C# scripting guide](functions-reference-csharp.md#azure-cosmos-db-v2-output).

# [Extension 4.x+](#tab/extensionv4/in-process)

| Attribute property | Description |
| --- | --- |
| **Connection** | The name of an app setting or setting collection that specifies how to connect to the Azure Cosmos DB account being monitored. For more information, see [Connections](#connections). |
| **DatabaseName** | The name of the Azure Cosmos DB database with the container being monitored. |
| **ContainerName** | The name of the container being monitored. |
| **CreateIfNotExists** | A boolean value to indicate whether the container is created when it doesn't exist. The default is *false* because new containers are created with reserved throughput, which has cost implications. For more information, see the [pricing page](https://azure.microsoft.com/pricing/details/cosmos-db/). |
| **PartitionKey** | When `CreateIfNotExists` is true, it defines the partition key path for the created container. May include binding parameters. |
| **ContainerThroughput** | When `CreateIfNotExists` is true, it defines the [throughput](https://learn.microsoft.com/azure/cosmos-db/set-throughput) of the created container. |
| **PreferredLocations** | (Optional) Defines preferred locations (regions) for geo-replicated database accounts in the Azure Cosmos DB service. Values should be comma-separated. For example, `East US,South Central US,North Europe`. |

# [Functions 2.x+](#tab/functionsv2/in-process)

| Attribute property | Description |
| --- | --- |
| **ConnectionStringSetting** | The name of an app setting or setting collection that specifies how to connect to the Azure Cosmos DB account being monitored. For more information, see [Connections](#connections). |
| **DatabaseName** | The name of the Azure Cosmos DB database with the collection being monitored. |
| **CollectionName** | The name of the collection being monitored. |
| **CreateIfNotExists** | A boolean value to indicate whether the collection is created when it doesn't exist. The default is *false* because new collections are created with reserved throughput, which has cost implications. For more information, see the [pricing page](https://azure.microsoft.com/pricing/details/cosmos-db/). |
| **PartitionKey** | When `CreateIfNotExists` is true, it defines the partition key path for the created collection. May include binding parameters. |
| **CollectionThroughput** | When `CreateIfNotExists` is true, it defines the [throughput](https://learn.microsoft.com/azure/cosmos-db/set-throughput) of the created collection. |
| **PreferredLocations** | (Optional) Defines preferred locations (regions) for geo-replicated database accounts in the Azure Cosmos DB service. Values should be comma-separated. For example, `East US,South Central US,North Europe`. |
| **UseMultipleWriteLocations** | (Optional) When set to `true` along with `PreferredLocations`, supports [multi-region writes](https://learn.microsoft.com/azure/cosmos-db/how-to-manage-database-account#configure-multiple-write-regions) in the Azure Cosmos DB service. |

# [Extension 4.x+](#tab/extensionv4/isolated-process)

| Attribute property | Description |
| --- | --- |
| **Connection** | The name of an app setting or setting collection that specifies how to connect to the Azure Cosmos DB account being monitored. For more information, see [Connections](#connections). |
| **DatabaseName** | The name of the Azure Cosmos DB database with the container being monitored. |
| **ContainerName** | The name of the container being monitored. |
| **CreateIfNotExists** | A boolean value to indicate whether the container is created when it doesn't exist. The default is *false* because new containers are created with reserved throughput, which has cost implications. For more information, see the [pricing page](https://azure.microsoft.com/pricing/details/cosmos-db/). |
| **PartitionKey** | When `CreateIfNotExists` is true, it defines the partition key path for the created container. May include binding parameters. |
| **ContainerThroughput** | When `CreateIfNotExists` is true, it defines the [throughput](https://learn.microsoft.com/azure/cosmos-db/set-throughput) of the created container. |
| **PreferredLocations** | (Optional) Defines preferred locations (regions) for geo-replicated database accounts in the Azure Cosmos DB service. Values should be comma-separated. For example, `East US,South Central US,North Europe`. |

# [Functions 2.x+](#tab/functionsv2/isolated-process)

| Attribute property | Description |
| --- | --- |
| **ConnectionStringSetting** | The name of an app setting or setting collection that specifies how to connect to the Azure Cosmos DB account being monitored. For more information, see [Connections](#connections). |
| **DatabaseName** | The name of the Azure Cosmos DB database with the collection being monitored. |
| **CollectionName** | The name of the collection being monitored. |
| **CreateIfNotExists** | A boolean value to indicate whether the collection is created when it doesn't exist. The default is *false* because new collections are created with reserved throughput, which has cost implications. For more information, see the [pricing page](https://azure.microsoft.com/pricing/details/cosmos-db/). |
| **PartitionKey** | When `CreateIfNotExists` is true, it defines the partition key path for the created collection. May include binding parameters. |
| **CollectionThroughput** | When `CreateIfNotExists` is true, it defines the [throughput](https://learn.microsoft.com/azure/cosmos-db/set-throughput) of the created collection. |
| **PreferredLocations** | (Optional) Defines preferred locations (regions) for geo-replicated database accounts in the Azure Cosmos DB service. Values should be comma-separated. For example, `East US,South Central US,North Europe`. |
| **UseMultipleWriteLocations** | (Optional) When set to `true` along with `PreferredLocations`, supports [multi-region writes](https://learn.microsoft.com/azure/cosmos-db/how-to-manage-database-account#configure-multiple-write-regions) in the Azure Cosmos DB service. |

---


**Applies to: programming-language-python**

## Decorators

_Applies only to the Python v2 programming model._

For Python v2 functions defined using a decorator, the following properties on the `cosmos_db_output`:

| Property | Description |
| --- | --- |
| `arg_name` | The variable name used in function code that represents the list of documents with changes. |
| `database_name` | The name of the Azure Cosmos DB database with the container being monitored. |
| `container_name` | The name of the Azure Cosmos DB container being monitored. |
| `create_if_not_exists` | A Boolean value that indicates whether the database and collection should be created if they do not exist. |
| `connection_string_setting` | The connection string of the Azure Cosmos DB being monitored. |

For Python functions defined by using *function.json*, see the [Configuration](#configuration) section.


**Applies to: programming-language-java**

## Annotations

From the [Java functions runtime library](https://learn.microsoft.com/java/api/overview/azure/functions/runtime), use the `@CosmosDBOutput` annotation on parameters that write to Azure Cosmos DB. The annotation supports the following properties:

+ [name](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.cosmosdboutput.name)
+ [connectionStringSetting](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.cosmosdboutput.connectionstringsetting)
+ [databaseName](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.cosmosdboutput.databasename)
+ [collectionName](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.cosmosdboutput.collectionname)
+ [createIfNotExists](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.cosmosdboutput.createifnotexists)
+ [dataType](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.cosmosdboutput.datatype)
+ [partitionKey](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.cosmosdboutput.partitionkey)
+ [preferredLocations](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.cosmosdboutput.preferredlocations)
+ [useMultipleWriteLocations](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.cosmosdboutput.usemultiplewritelocations)


**Applies to: programming-language-javascript,programming-language-typescript,programming-language-powershell,programming-language-python**

## Configuration


**Applies to: programming-language-python**

_Applies only to the Python v1 programming model._


**Applies to: programming-language-javascript,programming-language-typescript**


# [Model v4](#tab/nodejs-v4)

The following table explains the properties that you can set on the `options` object passed to the `output.cosmosDB()` method. The `type`, `direction`, and `name` properties don't apply to the v4 model.

# [Model v3](#tab/nodejs-v3)

The following table explains the binding configuration properties that you set in the *function.json* file, where properties differ by extension version:  

---


**Applies to: programming-language-powershell,programming-language-python**


The following table explains the binding configuration properties that you set in the *function.json* file, where properties differ by extension version:  


**Applies to: programming-language-javascript,programming-language-typescript,programming-language-powershell,programming-language-python**


# [Extension 4.x+](#tab/extensionv4)

| function.json property | Description |
| --- | --- |
| **connection** | The name of an app setting or setting collection that specifies how to connect to the Azure Cosmos DB account being monitored. For more information, see [Connections](functions-bindings-cosmosdb-v2-output.md#connections). |
| **databaseName** | The name of the Azure Cosmos DB database with the container being monitored. |
| **containerName** | The name of the container being monitored. |
| **createIfNotExists** | A boolean value to indicate whether the container is created when it doesn't exist. The default is *false* because new containers are created with reserved throughput, which has cost implications. For more information, see the [pricing page](https://azure.microsoft.com/pricing/details/cosmos-db/). |
| **partitionKey** | When `createIfNotExists` is true, it defines the partition key path for the created container. May include binding parameters. |
| **containerThroughput** | When `createIfNotExists` is true, it defines the [throughput](https://learn.microsoft.com/azure/cosmos-db/set-throughput) of the created container. |
| **preferredLocations** | (Optional) Defines preferred locations (regions) for geo-replicated database accounts in the Azure Cosmos DB service. Values should be comma-separated. For example, `East US,South Central US,North Europe`. |

# [Functions 2.x+](#tab/functionsv2)

| function.json property | Description |
| --- | --- |
| **connectionStringSetting** | The name of an app setting or setting collection that specifies how to connect to the Azure Cosmos DB account being monitored. For more information, see [Connections](#connections). |
| **databaseName** | The name of the Azure Cosmos DB database with the collection being monitored. |
| **collectionName** | The name of the collection being monitored. |
| **createIfNotExists** | A boolean value to indicate whether the collection is created when it doesn't exist. The default is *false* because new collections are created with reserved throughput, which has cost implications. For more information, see the [pricing page](https://azure.microsoft.com/pricing/details/cosmos-db/). |
| **partitionKey** | When `createIfNotExists` is true, it defines the partition key path for the created collection. May include binding parameters. |
| **collectionThroughput** | When `createIfNotExists` is true, it defines the [throughput](https://learn.microsoft.com/azure/cosmos-db/set-throughput) of the created collection. |
| **preferredLocations** | (Optional) Defines preferred locations (regions) for geo-replicated database accounts in the Azure Cosmos DB service. Values should be comma-separated. For example, `East US,South Central US,North Europe`. |
| **useMultipleWriteLocations** | (Optional) When set to `true` along with `preferredLocations`, supports [multi-region writes](https://learn.microsoft.com/azure/cosmos-db/how-to-manage-database-account#configure-multiple-write-regions) in the Azure Cosmos DB service. |

---



See the [Example section](#example) for complete examples.

## Usage

By default, when you write to the output parameter in your function, a document is created in your database. You should specify the document ID of the output document by specifying the `id` property in the JSON object passed to the output parameter.

> **Note:**  
> When you specify the ID of an existing document, it gets overwritten by the new output document.

**Applies to: programming-language-python**


The output function parameter must be defined as `func.Out[func.Document]`. Refer to the [output example](#example) for details.



**Applies to: programming-language-csharp**


The parameter type supported by the Cosmos DB output binding depends on the Functions runtime version, the extension package version, and the C# modality used.

# [Extension 4.x+](#tab/extensionv4/in-process)

See [Binding types](functions-bindings-cosmosdb-v2.md?tabs=in-process%2Cextensionv4\&pivots=programming-language-csharp#binding-types) for a list of supported types.

# [Functions 2.x+](#tab/functionsv2/in-process)

See [Binding types](functions-bindings-cosmosdb-v2.md?tabs=in-process%2Cfunctionsv2\&pivots=programming-language-csharp#binding-types) for a list of supported types.

# [Extension 4.x+](#tab/extensionv4/isolated-process)


When you want the function to write to a single document, the Cosmos DB output binding can bind to the following types:

| Type | Description |
| --- | --- |
| JSON serializable types | An object representing the JSON content of a document. Functions attempts to serialize a plain-old CLR object (POCO) type into JSON data. |

When you want the function to write to multiple documents, the Cosmos DB output binding can bind to the following types:

| Type | Description |
| --- | --- |
| `T[]` where `T` is JSON serializable type | An array containing multiple documents. Each entry represents one document. |

For other output scenarios, create and use a [CosmosClient] with other types from [Microsoft.Azure.Cosmos] directly. See [Register Azure clients](dotnet-isolated-process-guide.md#register-azure-clients) for an example of using dependency injection to create a client type from the Azure SDK.

[Microsoft.Azure.Cosmos]: https://learn.microsoft.com/dotnet/api/microsoft.azure.cosmos
[CosmosClient]: https://learn.microsoft.com/dotnet/api/microsoft.azure.cosmos.cosmosclient


# [Functions 2.x+](#tab/functionsv2/isolated-process)

See [Binding types](functions-bindings-cosmosdb-v2.md?tabs=isolated-process%2Cfunctionsv2\&pivots=programming-language-csharp#binding-types) for a list of supported types.

---




## Connections

The `connection` and `leaseConnection` properties are set to keys in application settings that return values used by the Functions runtime to connect to the Azure Cosmos DB account endpoints used by the extension. The value of these property settings depend on the type of connection: 

+ **Managed identity connection**: The `connection` property is a `<CONNECTION_NAME_PREFIX>` shared by a group of settings that together define an identity-based connection to the account. For more information, see [Define identity connections](manage-connections.md?pivots=functions-auth-identity\&tabs=bindings#define-connections).
+ **[Key Vault reference](https://learn.microsoft.com/azure/key-vault/general/overview)**: The `connection` property setting returns an Azure Key Vault reference to the location where the connection string is centrally maintained. For more information, see [Define Key Vault connections](manage-connections.md?pivots=functions-auth-keyvault\&tabs=bindings#define-connections).
+ **[App Configuration reference](../azure-app-configuration/quickstart-azure-functions-csharp.md)**: The `connection` property setting returns an Azure App Configuration reference that returns a connection string or a Key Vault reference. For more information, see [Azure App Configuration](manage-connections.md#azure-app-configuration) in the connections article. 
+ **Connection string**: The `connection` property setting returns the actual account connection string. Because the connection string contains shared secret keys, you should consider using a managed identity connection, when possible. For more information, see [Define connections](manage-connections.md?pivots=functions-auth-secret\&tabs=bindings#define-connections).

To learn more about bindings connections, see [Manage connection in Azure Functions](manage-connections.md?pivots=functions-auth-identity\&tabs=bindings). To obtain a connection string, navigate to your Azure Cosmos DB account, select **Keys**, and then copy the **PRIMARY CONNECTION STRING** or **SECONDARY CONNECTION STRING** values. These connection strings contain shared secret keys and must be kept secure. 

In earlier versions of the extension, the connection properties were named `connectionStringSetting` and `leaseConnectionStringSetting`.



## Exceptions and return codes

| Binding | Reference |
| --- | --- |
| Azure Cosmos DB | [HTTP status codes for Azure Cosmos DB](https://learn.microsoft.com/rest/api/cosmos-db/http-status-codes-for-cosmosdb) |

## Next steps

- [Run a function when an Azure Cosmos DB document is created or modified (Trigger)](functions-bindings-cosmosdb-v2-trigger.md)
- [Read an Azure Cosmos DB document (Input binding)](functions-bindings-cosmosdb-v2-input.md)
