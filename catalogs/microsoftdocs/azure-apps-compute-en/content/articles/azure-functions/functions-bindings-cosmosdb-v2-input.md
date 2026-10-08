---
title: Azure Cosmos DB input binding for Functions 2.x and higher
description: Learn to use the Azure Cosmos DB input binding in Azure Functions.
ms.topic: reference
ms.date: 03/02/2023
ms.devlang: csharp
# ms.devlang: csharp, java, javascript, powershell, python
zone_pivot_groups: programming-languages-set-functions
ms.custom:
  - devx-track-csharp
  - devx-track-python
  - devx-track-extended-java
  - devx-track-js
  - devx-track-ts
  - build-2025
  - sfi-ropc-nochange
---

# Azure Cosmos DB input binding for Azure Functions 2.x and higher

The Azure Cosmos DB input binding uses the SQL API to retrieve one or more Azure Cosmos DB documents and passes them to the input parameter of the function. The document ID or query parameters can be determined based on the trigger that invokes the function.

For information on setup and configuration details, see the [overview](functions-bindings-cosmosdb-v2.md).

> **Note:**
> When the collection is [partitioned](https://learn.microsoft.com/azure/cosmos-db/partitioning-overview#logical-partitions), lookup operations must also specify the partition key value.
>

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



## Example

Unless otherwise noted, examples in this article target version 3.x of the [Azure Cosmos DB extension](functions-bindings-cosmosdb-v2.md). For use with extension version 4.x, you need to replace the string `collection` in property and attribute names with `container`. 

**Applies to: programming-language-go**

Go support isn't currently available for this binding.


**Applies to: programming-language-csharp**



A C# function can be created by using one of the following C# modes:

* [Isolated worker model](dotnet-isolated-process-guide.md): Compiled C# function that runs in a worker process that's isolated from the runtime. Isolated worker process is required to support C# functions running on LTS and non-LTS versions .NET and the .NET Framework. Extensions for isolated worker process functions use `Microsoft.Azure.Functions.Worker.Extensions.*` namespaces.
* [In-process model](functions-dotnet-class-library.md): Compiled C# function that runs in the same process as the Functions runtime. In a variation of this model, Functions can be run using [C# scripting](functions-reference-csharp.md), which is supported primarily for C# portal editing. Extensions for in-process functions use `Microsoft.Azure.WebJobs.Extensions.*` namespaces.



> **Important:**
> [Support will end for the in-process model on November 10, 2026](https://aka.ms/azure-functions-retirements/in-process-model). We highly recommend that you [migrate your apps to the isolated worker model](https://learn.microsoft.com/azure/azure-functions/migrate-dotnet-to-isolated-model?tabs=net8) for full support.

# [Isolated worker model](#tab/isolated-process)

This section contains examples that require version 3.x of Azure Cosmos DB extension and 5.x of Azure Storage extension. If not already present in your function app, add reference to the following NuGet packages:

  * [Microsoft.Azure.Functions.Worker.Extensions.CosmosDB](https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.CosmosDB)
  * [Microsoft.Azure.Functions.Worker.Extensions.Storage.Queues](https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.Storage.Queues/5.0.0)

* [Queue trigger, look up ID from JSON](#queue-trigger-look-up-id-from-json-isolated)

The examples refer to a simple `ToDoItem` type:
<!--
:::code language="csharp" source="~/azure-functions-dotnet-worker/samples/Extensions/CosmosDB/CosmosInputBindingFunctions.cs" range="244-264":::
-->
<a id="queue-trigger-look-up-id-from-json-isolated"></a>

### Queue trigger, look up ID from JSON

The following example shows a function that retrieves a single document. The function is triggered by a JSON message in the storage queue. The queue trigger parses the JSON into an object of type `ToDoItemLookup`, which contains the ID and partition key value to retrieve. That ID and partition key value are used to return a `ToDoItem` document from the specified database and collection.
<!--
:::code language="csharp" source="~/azure-functions-dotnet-worker/samples/Extensions/CosmosDB/CosmosInputBindingFunctions.cs" range="244-264":::
-->
# [In-process model](#tab/in-process)

This section contains the following examples for using [in-process C# class library functions](functions-dotnet-class-library.md) with extension version 3.x:

* [Queue trigger, look up ID from JSON](#queue-trigger-look-up-id-from-json-c)
* [HTTP trigger, look up ID from query string](#http-trigger-look-up-id-from-query-string-c)
* [HTTP trigger, look up ID from route data](#http-trigger-look-up-id-from-route-data-c)
* [HTTP trigger, look up ID from route data, using SqlQuery](#http-trigger-look-up-id-from-route-data-using-sqlquery-c)
* [HTTP trigger, get multiple docs, using SqlQuery](#http-trigger-get-multiple-docs-using-sqlquery-c)
* [HTTP trigger, get multiple docs, using DocumentClient](#http-trigger-get-multiple-docs-using-documentclient-c)
* [HTTP trigger, get multiple docs, using CosmosClient (v4 extension)](#http-trigger-get-multiple-docs-using-cosmosclient-c)

The examples refer to a simple `ToDoItem` type:

```cs
namespace CosmosDBSamplesV2
{
    public class ToDoItem
    {
        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("partitionKey")]
        public string PartitionKey { get; set; }

        public string Description { get; set; }
    }
}
```

<a id="queue-trigger-look-up-id-from-json-c"></a>

### Queue trigger, look up ID from JSON

The following example shows a [C# function](functions-dotnet-class-library.md) that retrieves a single document. The function is triggered by a queue message that contains a JSON object. The queue trigger parses the JSON into an object of type `ToDoItemLookup`, which contains the ID and partition key value to look up. That ID and partition key value are used to retrieve a `ToDoItem` document from the specified database and collection.

```cs
namespace CosmosDBSamplesV2
{
    public class ToDoItemLookup
    {
        public string ToDoItemId { get; set; }

        public string ToDoItemPartitionKeyValue { get; set; }
    }
}
```

```cs
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Extensions.Logging;

namespace CosmosDBSamplesV2
{
    public static class DocByIdFromJSON
    {
        [FunctionName("DocByIdFromJSON")]
        public static void Run(
            [QueueTrigger("todoqueueforlookup")] ToDoItemLookup toDoItemLookup,
            [CosmosDB(
                databaseName: "ToDoItems",
                collectionName: "Items",
                ConnectionStringSetting = "CosmosDBConnection",
                Id = "{ToDoItemId}",
                PartitionKey = "{ToDoItemPartitionKeyValue}")]ToDoItem toDoItem,
            ILogger log)
        {
            log.LogInformation($"C# Queue trigger function processed Id={toDoItemLookup?.ToDoItemId} Key={toDoItemLookup?.ToDoItemPartitionKeyValue}");

            if (toDoItem == null)
            {
                log.LogInformation($"ToDo item not found");
            }
            else
            {
                log.LogInformation($"Found ToDo item, Description={toDoItem.Description}");
            }
        }
    }
}
```

<a id="http-trigger-look-up-id-from-query-string-c"></a>

### HTTP trigger, look up ID from query string

The following example shows a [C# function](functions-dotnet-class-library.md) that retrieves a single document. The function is triggered by an HTTP request that uses a query string to specify the ID and partition key value to look up. That ID and partition key value are used to retrieve a `ToDoItem` document from the specified database and collection.

> **Note:**
> The HTTP query string parameter is case-sensitive.
>

```cs
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Extensions.Logging;

namespace CosmosDBSamplesV2
{
    public static class DocByIdFromQueryString
    {
        [FunctionName("DocByIdFromQueryString")]
        public static IActionResult Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)]
                HttpRequest req,
            [CosmosDB(
                databaseName: "ToDoItems",
                collectionName: "Items",
                ConnectionStringSetting = "CosmosDBConnection",
                Id = "{Query.id}",
                PartitionKey = "{Query.partitionKey}")] ToDoItem toDoItem,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            if (toDoItem == null)
            {
                log.LogInformation($"ToDo item not found");
            }
            else
            {
                log.LogInformation($"Found ToDo item, Description={toDoItem.Description}");
            }
            return new OkResult();
        }
    }
}
```

<a id="http-trigger-look-up-id-from-route-data-c"></a>

### HTTP trigger, look up ID from route data

The following example shows a [C# function](functions-dotnet-class-library.md) that retrieves a single document. The function is triggered by an HTTP request that uses route data to specify the ID and partition key value to look up. That ID and partition key value are used to retrieve a `ToDoItem` document from the specified database and collection.

```cs
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Extensions.Logging;

namespace CosmosDBSamplesV2
{
    public static class DocByIdFromRouteData
    {
        [FunctionName("DocByIdFromRouteData")]
        public static IActionResult Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post",
                Route = "todoitems/{partitionKey}/{id}")]HttpRequest req,
            [CosmosDB(
                databaseName: "ToDoItems",
                collectionName: "Items",
                ConnectionStringSetting = "CosmosDBConnection",
                Id = "{id}",
                PartitionKey = "{partitionKey}")] ToDoItem toDoItem,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            if (toDoItem == null)
            {
                log.LogInformation($"ToDo item not found");
            }
            else
            {
                log.LogInformation($"Found ToDo item, Description={toDoItem.Description}");
            }
            return new OkResult();
        }
    }
}
```

<a id="http-trigger-look-up-id-from-route-data-using-sqlquery-c"></a>

### HTTP trigger, look up ID from route data, using SqlQuery

The following example shows a [C# function](functions-dotnet-class-library.md) that retrieves a single document. The function is triggered by an HTTP request that uses route data to specify the ID to look up. That ID is used to retrieve a `ToDoItem` document from the specified database and collection.

The example shows how to use a binding expression in the `SqlQuery` parameter. You can pass route data to the `SqlQuery` parameter as shown, but currently [you can't pass query string values](https://github.com/Azure/azure-functions-host/issues/2554#issuecomment-392084583).

> **Note:**
> If you need to query by just the ID, it is recommended to use a lookup, like the [previous examples](#http-trigger-look-up-id-from-query-string-c), as it consumes less [request units](https://learn.microsoft.com/azure/cosmos-db/request-units). Point read operations (GET) are [more efficient](https://learn.microsoft.com/azure/cosmos-db/optimize-cost-reads-writes) than queries by ID.
>

```cs
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Host;
using System.Collections.Generic;
using Microsoft.Extensions.Logging;

namespace CosmosDBSamplesV2
{
    public static class DocByIdFromRouteDataUsingSqlQuery
    {
        [FunctionName("DocByIdFromRouteDataUsingSqlQuery")]
        public static IActionResult Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post",
                Route = "todoitems2/{id}")]HttpRequest req,
            [CosmosDB("ToDoItems", "Items",
                ConnectionStringSetting = "CosmosDBConnection",
                SqlQuery = "select * from ToDoItems r where r.id = {id}")]
                IEnumerable<ToDoItem> toDoItems,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            foreach (ToDoItem toDoItem in toDoItems)
            {
                log.LogInformation(toDoItem.Description);
            }
            return new OkResult();
        }
    }
}
```

<a id="http-trigger-get-multiple-docs-using-sqlquery-c"></a>

### HTTP trigger, get multiple docs, using SqlQuery

The following example shows a [C# function](functions-dotnet-class-library.md) that retrieves a list of documents. The function is triggered by an HTTP request. The query is specified in the `SqlQuery` attribute property.

```cs
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Host;
using System.Collections.Generic;
using Microsoft.Extensions.Logging;

namespace CosmosDBSamplesV2
{
    public static class DocsBySqlQuery
    {
        [FunctionName("DocsBySqlQuery")]
        public static IActionResult Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)]
                HttpRequest req,
            [CosmosDB(
                databaseName: "ToDoItems",
                collectionName: "Items",
                ConnectionStringSetting = "CosmosDBConnection",
                SqlQuery = "SELECT top 2 * FROM c order by c._ts desc")]
                IEnumerable<ToDoItem> toDoItems,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");
            foreach (ToDoItem toDoItem in toDoItems)
            {
                log.LogInformation(toDoItem.Description);
            }
            return new OkResult();
        }
    }
}
```

<a id="http-trigger-get-multiple-docs-using-documentclient-c"></a>

### HTTP trigger, get multiple docs, using DocumentClient

The following example shows a [C# function](functions-dotnet-class-library.md) that retrieves a list of documents. The function is triggered by an HTTP request. The code uses a `DocumentClient` instance provided by the Azure Cosmos DB binding to read a list of documents. The `DocumentClient` instance could also be used for write operations.

> **Note:**
> You can also use the [IDocumentClient](https://learn.microsoft.com/dotnet/api/microsoft.azure.documents.idocumentclient) interface to make testing easier.

```cs
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Documents.Client;
using Microsoft.Azure.Documents.Linq;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace CosmosDBSamplesV2
{
    public static class DocsByUsingDocumentClient
    {
        [FunctionName("DocsByUsingDocumentClient")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post",
                Route = null)]HttpRequest req,
            [CosmosDB(
                databaseName: "ToDoItems",
                collectionName: "Items",
                ConnectionStringSetting = "CosmosDBConnection")] DocumentClient client,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            var searchterm = req.Query["searchterm"];
            if (string.IsNullOrWhiteSpace(searchterm))
            {
                return (ActionResult)new NotFoundResult();
            }

            Uri collectionUri = UriFactory.CreateDocumentCollectionUri("ToDoItems", "Items");

            log.LogInformation($"Searching for: {searchterm}");

            IDocumentQuery<ToDoItem> query = client.CreateDocumentQuery<ToDoItem>(collectionUri)
                .Where(p => p.Description.Contains(searchterm))
                .AsDocumentQuery();

            while (query.HasMoreResults)
            {
                foreach (ToDoItem result in await query.ExecuteNextAsync())
                {
                    log.LogInformation(result.Description);
                }
            }
            return new OkResult();
        }
    }
}
```

<a id="http-trigger-get-multiple-docs-using-cosmosclient-c"></a>

### HTTP trigger, get multiple docs, using CosmosClient

The following example shows a [C# function](functions-dotnet-class-library.md) that retrieves a list of documents. The function is triggered by an HTTP request. The code uses a `CosmosClient` instance provided by the Azure Cosmos DB binding, available in [extension version 4.x](functions-bindings-cosmosdb-v2.md?tabs=extensionv4), to read a list of documents. The `CosmosClient` instance could also be used for write operations.

```csharp
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Cosmos;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;

namespace CosmosDBSamplesV2
{
    public static class DocsByUsingCosmosClient
    {  
        [FunctionName("DocsByUsingCosmosClient")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post",
                Route = null)]HttpRequest req,
            [CosmosDB(
                databaseName: "ToDoItems",
                containerName: "Items",
                Connection = "CosmosDBConnection")] CosmosClient client,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            var searchterm = req.Query["searchterm"].ToString();
            if (string.IsNullOrWhiteSpace(searchterm))
            {
                return (ActionResult)new NotFoundResult();
            }

            Container container = client.GetDatabase("ToDoItems").GetContainer("Items");

            log.LogInformation($"Searching for: {searchterm}");

            QueryDefinition queryDefinition = new QueryDefinition(
                "SELECT * FROM items i WHERE CONTAINS(i.Description, @searchterm)")
                .WithParameter("@searchterm", searchterm);
            using (FeedIterator<ToDoItem> resultSet = container.GetItemQueryIterator<ToDoItem>(queryDefinition))
            {
                while (resultSet.HasMoreResults)
                {
                    FeedResponse<ToDoItem> response = await resultSet.ReadNextAsync();
                    ToDoItem item = response.First();
                    log.LogInformation(item.Description);
                }
            }

            return new OkResult();
        }
    }
}
```

---


**Applies to: programming-language-java**


This section contains the following examples:

* [HTTP trigger, look up ID from query string - String parameter](#http-trigger-look-up-id-from-query-string---string-parameter-java)
* [HTTP trigger, look up ID from query string - POJO parameter](#http-trigger-look-up-id-from-query-string---pojo-parameter-java)
* [HTTP trigger, look up ID from route data](#http-trigger-look-up-id-from-route-data-java)
* [HTTP trigger, look up ID from route data, using SqlQuery](#http-trigger-look-up-id-from-route-data-using-sqlquery-java)
* [HTTP trigger, get multiple docs from route data, using SqlQuery](#http-trigger-get-multiple-docs-from-route-data-using-sqlquery-java)

The examples refer to a simple `ToDoItem` type:

```java
public class ToDoItem {

  private String id;
  private String description;

  public String getId() {
    return id;
  }

  public String getDescription() {
    return description;
  }

  @Override
  public String toString() {
    return "ToDoItem={id=" + id + ",description=" + description + "}";
  }
}
```

<a id="http-trigger-look-up-id-from-query-string---string-parameter-java"></a>

### HTTP trigger, look up ID from query string - String parameter

The following example shows a Java function that retrieves a single document. The function is triggered by an HTTP request that uses a query string to specify the ID and partition key value to look up. That ID and partition key value are used to retrieve a document from the specified database and collection, in String form.

```java
public class DocByIdFromQueryString {

    @FunctionName("DocByIdFromQueryString")
    public HttpResponseMessage run(
            @HttpTrigger(name = "req",
              methods = {HttpMethod.GET, HttpMethod.POST},
              authLevel = AuthorizationLevel.ANONYMOUS)
            HttpRequestMessage<Optional<String>> request,
            @CosmosDBInput(name = "database",
              databaseName = "ToDoList",
              collectionName = "Items",
              id = "{Query.id}",
              partitionKey = "{Query.partitionKeyValue}",
              connectionStringSetting = "Cosmos_DB_Connection_String")
            Optional<String> item,
            final ExecutionContext context) {

        // Item list
        context.getLogger().info("Parameters are: " + request.getQueryParameters());
        context.getLogger().info("String from the database is " + (item.isPresent() ? item.get() : null));

        // Convert and display
        if (!item.isPresent()) {
            return request.createResponseBuilder(HttpStatus.BAD_REQUEST)
                          .body("Document not found.")
                          .build();
        }
        else {
            // return JSON from Cosmos. Alternatively, we can parse the JSON string
            // and return an enriched JSON object.
            return request.createResponseBuilder(HttpStatus.OK)
                          .header("Content-Type", "application/json")
                          .body(item.get())
                          .build();
        }
    }
}
```

In the [Java functions runtime library](https://learn.microsoft.com/java/api/overview/azure/functions/runtime), use the `@CosmosDBInput` annotation on function parameters whose value would come from Azure Cosmos DB. This annotation can be used with native Java types, POJOs, or nullable values using `Optional<T>`.

<a id="http-trigger-look-up-id-from-query-string---pojo-parameter-java"></a>

### HTTP trigger, look up ID from query string - POJO parameter

The following example shows a Java function that retrieves a single document. The function is triggered by an HTTP request that uses a query string to specify the ID and partition key value to look up. That ID and partition key value used to retrieve a document from the specified database and collection. The document is then converted to an instance of the `ToDoItem` POJO previously created, and passed as an argument to the function.

```java
public class DocByIdFromQueryStringPojo {

    @FunctionName("DocByIdFromQueryStringPojo")
    public HttpResponseMessage run(
            @HttpTrigger(name = "req",
              methods = {HttpMethod.GET, HttpMethod.POST},
              authLevel = AuthorizationLevel.ANONYMOUS)
            HttpRequestMessage<Optional<String>> request,
            @CosmosDBInput(name = "database",
              databaseName = "ToDoList",
              collectionName = "Items",
              id = "{Query.id}",
              partitionKey = "{Query.partitionKeyValue}",
              connectionStringSetting = "Cosmos_DB_Connection_String")
            ToDoItem item,
            final ExecutionContext context) {

        // Item list
        context.getLogger().info("Parameters are: " + request.getQueryParameters());
        context.getLogger().info("Item from the database is " + item);

        // Convert and display
        if (item == null) {
            return request.createResponseBuilder(HttpStatus.BAD_REQUEST)
                          .body("Document not found.")
                          .build();
        }
        else {
            return request.createResponseBuilder(HttpStatus.OK)
                          .header("Content-Type", "application/json")
                          .body(item)
                          .build();
        }
    }
}
```

<a id="http-trigger-look-up-id-from-route-data-java"></a>

### HTTP trigger, look up ID from route data

The following example shows a Java function that retrieves a single document. The function is triggered by an HTTP request that uses a route parameter to specify the ID and partition key value to look up. That ID and partition key value are used to retrieve a document from the specified database and collection, returning it as an `Optional<String>`.

```java
public class DocByIdFromRoute {

    @FunctionName("DocByIdFromRoute")
    public HttpResponseMessage run(
            @HttpTrigger(name = "req",
              methods = {HttpMethod.GET, HttpMethod.POST},
              authLevel = AuthorizationLevel.ANONYMOUS,
              route = "todoitems/{partitionKeyValue}/{id}")
            HttpRequestMessage<Optional<String>> request,
            @CosmosDBInput(name = "database",
              databaseName = "ToDoList",
              collectionName = "Items",
              id = "{id}",
              partitionKey = "{partitionKeyValue}",
              connectionStringSetting = "Cosmos_DB_Connection_String")
            Optional<String> item,
            final ExecutionContext context) {

        // Item list
        context.getLogger().info("Parameters are: " + request.getQueryParameters());
        context.getLogger().info("String from the database is " + (item.isPresent() ? item.get() : null));

        // Convert and display
        if (!item.isPresent()) {
            return request.createResponseBuilder(HttpStatus.BAD_REQUEST)
                          .body("Document not found.")
                          .build();
        }
        else {
            // return JSON from Cosmos. Alternatively, we can parse the JSON string
            // and return an enriched JSON object.
            return request.createResponseBuilder(HttpStatus.OK)
                          .header("Content-Type", "application/json")
                          .body(item.get())
                          .build();
        }
    }
}
```

 <a id="http-trigger-look-up-id-from-route-data-using-sqlquery-java"></a>

### HTTP trigger, look up ID from route data, using SqlQuery

The following example shows a Java function that retrieves a single document. The function is triggered by an HTTP request that uses a route parameter to specify the ID to look up. That ID is used to retrieve a document from the specified database and collection, converting the result set to a `ToDoItem[]`, since many documents may be returned, depending on the query criteria.

> **Note:**
> If you need to query by just the ID, it is recommended to use a lookup, like the [previous examples](#http-trigger-look-up-id-from-query-string---pojo-parameter-java), as it consumes less [request units](https://learn.microsoft.com/azure/cosmos-db/request-units). Point read operations (GET) are [more efficient](https://learn.microsoft.com/azure/cosmos-db/optimize-cost-reads-writes) than queries by ID.
>

```java
public class DocByIdFromRouteSqlQuery {

    @FunctionName("DocByIdFromRouteSqlQuery")
    public HttpResponseMessage run(
            @HttpTrigger(name = "req",
              methods = {HttpMethod.GET, HttpMethod.POST},
              authLevel = AuthorizationLevel.ANONYMOUS,
              route = "todoitems2/{id}")
            HttpRequestMessage<Optional<String>> request,
            @CosmosDBInput(name = "database",
              databaseName = "ToDoList",
              collectionName = "Items",
              sqlQuery = "select * from Items r where r.id = {id}",
              connectionStringSetting = "Cosmos_DB_Connection_String")
            ToDoItem[] item,
            final ExecutionContext context) {

        // Item list
        context.getLogger().info("Parameters are: " + request.getQueryParameters());
        context.getLogger().info("Items from the database are " + item);

        // Convert and display
        if (item == null) {
            return request.createResponseBuilder(HttpStatus.BAD_REQUEST)
                          .body("Document not found.")
                          .build();
        }
        else {
            return request.createResponseBuilder(HttpStatus.OK)
                          .header("Content-Type", "application/json")
                          .body(item)
                          .build();
        }
    }
}
```

 <a id="http-trigger-get-multiple-docs-from-route-data-using-sqlquery-java"></a>

### HTTP trigger, get multiple docs from route data, using SqlQuery

The following example shows a Java function that retrieves multiple documents. The function is triggered by an HTTP request that uses a route parameter `desc` to specify the string to search for in the `description` field. The search term is used to retrieve a collection of documents from the specified database and collection, converting the result set to a `ToDoItem[]` and passing it as an argument to the function.

```java
public class DocsFromRouteSqlQuery {

    @FunctionName("DocsFromRouteSqlQuery")
    public HttpResponseMessage run(
            @HttpTrigger(name = "req",
              methods = {HttpMethod.GET},
              authLevel = AuthorizationLevel.ANONYMOUS,
              route = "todoitems3/{desc}")
            HttpRequestMessage<Optional<String>> request,
            @CosmosDBInput(name = "database",
              databaseName = "ToDoList",
              collectionName = "Items",
              sqlQuery = "select * from Items r where contains(r.description, {desc})",
              connectionStringSetting = "Cosmos_DB_Connection_String")
            ToDoItem[] items,
            final ExecutionContext context) {

        // Item list
        context.getLogger().info("Parameters are: " + request.getQueryParameters());
        context.getLogger().info("Number of items from the database is " + (items == null ? 0 : items.length));

        // Convert and display
        if (items == null) {
            return request.createResponseBuilder(HttpStatus.BAD_REQUEST)
                          .body("No documents found.")
                          .build();
        }
        else {
            return request.createResponseBuilder(HttpStatus.OK)
                          .header("Content-Type", "application/json")
                          .body(items)
                          .build();
        }
    }
}
```


**Applies to: programming-language-typescript**


This section contains the following examples that read a single document by specifying an ID value from various sources:

* [Queue trigger, look up ID from JSON](#queue-trigger-look-up-id-from-json-typescript)
* [HTTP trigger, look up ID from query string](#http-trigger-look-up-id-from-query-string-typescript)
* [HTTP trigger, look up ID from route data](#http-trigger-look-up-id-from-route-data-typescript)
* [Queue trigger, get multiple docs, using SqlQuery](#queue-trigger-get-multiple-docs-using-sqlquery-typescript)

<a id="queue-trigger-look-up-id-from-json-typescript"></a>

### Queue trigger, look up ID from JSON

The following example shows a [TypeScript function](functions-reference-node.md?tabs=typescript) that reads a single document and updates the document's text value.

# [Model v4](#tab/nodejs-v4)
<!--
:::code language="typescript" source="~/azure-functions-nodejs-v4/ts/src/functions/cosmosInput1.ts" :::
-->
# [Model v3](#tab/nodejs-v3)

TypeScript samples are not documented for model v3.

---

<a id="http-trigger-look-up-id-from-query-string-typescript"></a>

### HTTP trigger, look up ID from query string

The following example shows a [TypeScript function](functions-reference-node.md?tabs=typescript) that retrieves a single document. The function is triggered by an HTTP request that uses a query string to specify the ID and partition key value to look up. That ID and partition key value are used to retrieve a `ToDoItem` document from the specified database and collection.

# [Model v4](#tab/nodejs-v4)
<!--
:::code language="typescript" source="~/azure-functions-nodejs-v4/ts/src/functions/cosmosInput2.ts" :::
-->
# [Model v3](#tab/nodejs-v3)

TypeScript samples are not documented for model v3.

---

<a id="http-trigger-look-up-id-from-route-data-typescript"></a>

### HTTP trigger, look up ID from route data

The following example shows a [TypeScript function](functions-reference-node.md?tabs=typescript) that retrieves a single document. The function is triggered by an HTTP request that uses route data to specify the ID and partition key value to look up. That ID and partition key value are used to retrieve a `ToDoItem` document from the specified database and collection.

# [Model v4](#tab/nodejs-v4)
<!--
:::code language="typescript" source="~/azure-functions-nodejs-v4/ts/src/functions/cosmosInput3.ts" :::
-->
# [Model v3](#tab/nodejs-v3)

TypeScript samples are not documented for model v3.

---

<a id="queue-trigger-get-multiple-docs-using-sqlquery-typescript"></a>

### Queue trigger, get multiple docs, using SqlQuery

The following example shows a [TypeScript function](functions-reference-node.md?tabs=typescript) that retrieves multiple documents specified by a SQL query, using a queue trigger to customize the query parameters.

The queue trigger provides a parameter `departmentId`. A queue message of `{ "departmentId" : "Finance" }` would return all records for the finance department.

# [Model v4](#tab/nodejs-v4)
<!--
:::code language="typescript" source="~/azure-functions-nodejs-v4/ts/src/functions/cosmosInput4.ts" :::
-->
# [Model v3](#tab/nodejs-v3)

TypeScript samples are not documented for model v3.

---


**Applies to: programming-language-javascript**


This section contains the following examples that read a single document by specifying an ID value from various sources:

* [Queue trigger, look up ID from JSON](#queue-trigger-look-up-id-from-json-javascript)
* [HTTP trigger, look up ID from query string](#http-trigger-look-up-id-from-query-string-javascript)
* [HTTP trigger, look up ID from route data](#http-trigger-look-up-id-from-route-data-javascript)
* [Queue trigger, get multiple docs, using SqlQuery](#queue-trigger-get-multiple-docs-using-sqlquery-javascript)

<a id="queue-trigger-look-up-id-from-json-javascript"></a>

### Queue trigger, look up ID from JSON

The following example shows a [JavaScript function](functions-reference-node.md) that reads a single document and updates the document's text value.

# [Model v4](#tab/nodejs-v4)
<!--
:::code language="javascript" source="~/azure-functions-nodejs-v4/js/src/functions/cosmosInput1.js" :::
-->
# [Model v3](#tab/nodejs-v3)

Here's the binding data in the *function.json* file:

```json
{
    "name": "inputDocumentIn",
    "type": "cosmosDB",
    "databaseName": "MyDatabase",
    "collectionName": "MyCollection",
    "id" : "{queueTrigger_payload_property}",
    "partitionKey": "{queueTrigger_payload_property}",
    "connectionStringSetting": "MyAccount_COSMOSDB",
    "direction": "in"
},
{
    "name": "inputDocumentOut",
    "type": "cosmosDB",
    "databaseName": "MyDatabase",
    "collectionName": "MyCollection",
    "createIfNotExists": false,
    "partitionKey": "{queueTrigger_payload_property}",
    "connectionStringSetting": "MyAccount_COSMOSDB",
    "direction": "out"
}
```

The [configuration](#configuration) section explains these properties.

Here's the JavaScript code:

```javascript
    // Change input document contents using Azure Cosmos DB input binding, using context.bindings.inputDocumentOut
    module.exports = async function (context) {
        context.bindings.inputDocumentOut = context.bindings.inputDocumentIn;
        context.bindings.inputDocumentOut.text = "This was updated!";
    };
```

---

<a id="http-trigger-look-up-id-from-query-string-javascript"></a>

### HTTP trigger, look up ID from query string

The following example shows a [JavaScript function](functions-reference-node.md) that retrieves a single document. The function is triggered by an HTTP request that uses a query string to specify the ID and partition key value to look up. That ID and partition key value are used to retrieve a `ToDoItem` document from the specified database and collection.

# [Model v4](#tab/nodejs-v4)
<!--
:::code language="javascript" source="~/azure-functions-nodejs-v4/js/src/functions/cosmosInput2.js" :::
-->
# [Model v3](#tab/nodejs-v3)

Here's the *function.json* file:

```json
{
  "bindings": [
    {
      "authLevel": "anonymous",
      "name": "req",
      "type": "httpTrigger",
      "direction": "in",
      "methods": [
        "get",
        "post"
      ]
    },
    {
      "name": "$return",
      "type": "http",
      "direction": "out"
    },
    {
      "type": "cosmosDB",
      "name": "toDoItem",
      "databaseName": "ToDoItems",
      "collectionName": "Items",
      "connectionStringSetting": "CosmosDBConnection",
      "direction": "in",
      "Id": "{Query.id}",
      "PartitionKey": "{Query.partitionKeyValue}"
    }
  ],
  "disabled": false
}
```

Here's the JavaScript code:

```javascript
module.exports = async function (context, req, toDoItem) {
    context.log('JavaScript queue trigger function processed work item');
    if (!toDoItem)
    {
        context.log("ToDo item not found");
    }
    else
    {
        context.log("Found ToDo item, Description=" + toDoItem.Description);
    }
};
```
---

<a id="http-trigger-look-up-id-from-route-data-javascript"></a>

### HTTP trigger, look up ID from route data

The following example shows a [JavaScript function](functions-reference-node.md) that retrieves a single document. The function is triggered by an HTTP request that uses route data to specify the ID and partition key value to look up. That ID and partition key value are used to retrieve a `ToDoItem` document from the specified database and collection.

# [Model v4](#tab/nodejs-v4)
<!--
:::code language="javascript" source="~/azure-functions-nodejs-v4/js/src/functions/cosmosInput3.js" :::
-->
# [Model v3](#tab/nodejs-v3)

Here's the *function.json* file:

```json
{
  "bindings": [
    {
      "authLevel": "anonymous",
      "name": "req",
      "type": "httpTrigger",
      "direction": "in",
      "methods": [
        "get",
        "post"
      ],
      "route":"todoitems/{partitionKeyValue}/{id}"
    },
    {
      "name": "$return",
      "type": "http",
      "direction": "out"
    },
    {
      "type": "cosmosDB",
      "name": "toDoItem",
      "databaseName": "ToDoItems",
      "collectionName": "Items",
      "connectionStringSetting": "CosmosDBConnection",
      "direction": "in",
      "Id": "{id}",
      "PartitionKey": "{partitionKeyValue}"
    }
  ],
  "disabled": false
}
```

Here's the JavaScript code:

```javascript
module.exports = async function (context, req, toDoItem) {
    context.log('JavaScript queue trigger function processed work item');
    if (!toDoItem)
    {
        context.log("ToDo item not found");
    }
    else
    {
        context.log("Found ToDo item, Description=" + toDoItem.Description);
    }
};
```

---

<a id="queue-trigger-get-multiple-docs-using-sqlquery-javascript"></a>

### Queue trigger, get multiple docs, using SqlQuery

The following example shows a [JavaScript function](functions-reference-node.md) that retrieves multiple documents specified by a SQL query, using a queue trigger to customize the query parameters.

The queue trigger provides a parameter `departmentId`. A queue message of `{ "departmentId" : "Finance" }` would return all records for the finance department.

# [Model v4](#tab/nodejs-v4)
<!--
:::code language="javascript" source="~/azure-functions-nodejs-v4/js/src/functions/cosmosInput4.js" :::
-->
# [Model v3](#tab/nodejs-v3)

Here's the binding data in the *function.json* file:

```json
{
    "name": "documents",
    "type": "cosmosDB",
    "direction": "in",
    "databaseName": "MyDb",
    "collectionName": "MyCollection",
    "sqlQuery": "SELECT * from c where c.departmentId = {departmentId}",
    "connectionStringSetting": "CosmosDBConnection"
}
```

The [configuration](#configuration) section explains these properties.

Here's the JavaScript code:

```javascript
module.exports = async function (context, input) {
  var documents = context.bindings.documents;
  for (const document of documents) {
    // operate on each document
  }
};
```

---


**Applies to: programming-language-powershell**


* [Queue trigger, look up ID from JSON](#queue-trigger-look-up-id-from-json-ps)
* [HTTP trigger, look up ID from query string](#http-trigger-id-query-string-ps)
* [HTTP trigger, look up ID from route data](#http-trigger-id-route-data-ps)
* [Queue trigger, get multiple docs, using SqlQuery](#queue-trigger-multiple-docs-sqlquery-ps)

### Queue trigger, look up ID from JSON

The following example demonstrates how to read and update a single Azure Cosmos DB document. The document's unique identifier is provided through JSON value in a queue message.

The Azure Cosmos DB input binding is listed first in the list of bindings found in the function's configuration file (_function.json_).

<a name="queue-trigger-look-up-id-from-json-ps"></a>

```json
{
  "name": "InputDocumentIn",
  "type": "cosmosDB",
  "databaseName": "MyDatabase",
  "collectionName": "MyCollection",
  "id": "{queueTrigger_payload_property}",
  "partitionKey": "{queueTrigger_payload_property}",
  "connectionStringSetting": "CosmosDBConnection",
  "direction": "in"
},
{
  "name": "InputDocumentOut",
  "type": "cosmosDB",
  "databaseName": "MyDatabase",
  "collectionName": "MyCollection",
  "createIfNotExists": false,
  "partitionKey": "{queueTrigger_payload_property}",
  "connectionStringSetting": "CosmosDBConnection",
  "direction": "out"
}
```

The _run.ps1_ file has the PowerShell code which reads the incoming document and outputs changes.

```powershell
param($QueueItem, $InputDocumentIn, $TriggerMetadata)

$Document = $InputDocumentIn 
$Document.text = 'This was updated!'

Push-OutputBinding -Name InputDocumentOut -Value $Document  
```

<a name="http-trigger-id-query-string-ps"></a>

### HTTP trigger, look up ID from query string

The following example demonstrates how to read and update a single Azure Cosmos DB document from a web API. The document's unique identifier is provided through a querystring parameter from the HTTP request, as defined in the binding's `"Id": "{Query.Id}"` property.

The Azure Cosmos DB input binding is listed first in the list of bindings found in the function's configuration file (_function.json_).

```json
{ 
  "bindings": [ 
    { 
      "type": "cosmosDB", 
      "name": "ToDoItem", 
      "databaseName": "ToDoItems", 
      "collectionName": "Items", 
      "connectionStringSetting": "CosmosDBConnection", 
      "direction": "in", 
      "Id": "{Query.id}", 
      "PartitionKey": "{Query.partitionKeyValue}" 
    },
    { 
      "authLevel": "anonymous", 
      "name": "Request", 
      "type": "httpTrigger", 
      "direction": "in", 
      "methods": [ 
        "get", 
        "post" 
      ] 
    }, 
    { 
      "name": "Response", 
      "type": "http", 
      "direction": "out" 
    },
  ], 
  "disabled": false 
} 
```

The _run.ps1_ file has the PowerShell code which reads the incoming document and outputs changes.

```powershell
using namespace System.Net

param($Request, $ToDoItem, $TriggerMetadata)

Write-Host 'PowerShell HTTP trigger function processed a request'

if (-not $ToDoItem) { 
    Write-Host 'ToDo item not found'

    Push-OutputBinding -Name Response -Value ([HttpResponseContext]@{ 
        StatusCode = [HttpStatusCode]::NotFound 
        Body = $ToDoItem.Description 
    })

} else {

    Write-Host "Found ToDo item, Description=$($ToDoItem.Description)"

    Push-OutputBinding -Name Response -Value ([HttpResponseContext]@{ 
        StatusCode = [HttpStatusCode]::OK 
        Body = $ToDoItem.Description 
    }) 
}
```

<a name="http-trigger-id-route-data-ps"></a>

### HTTP trigger, look up ID from route data

The following example demonstrates how to read and update a single Azure Cosmos DB document from a web API. The document's unique identifier is provided through a route parameter. The route parameter is defined in the HTTP request binding's `route` property and referenced in the Azure Cosmos DB `"Id": "{Id}"` binding property.

The Azure Cosmos DB input binding is listed first in the list of bindings found in the function's configuration file (_function.json_).

```json
{ 
  "bindings": [ 
    { 
      "type": "cosmosDB", 
      "name": "ToDoItem", 
      "databaseName": "ToDoItems", 
      "collectionName": "Items", 
      "connectionStringSetting": "CosmosDBConnection", 
      "direction": "in", 
      "Id": "{id}", 
      "PartitionKey": "{partitionKeyValue}" 
    },
    { 
      "authLevel": "anonymous", 
      "name": "Request", 
      "type": "httpTrigger", 
      "direction": "in", 
      "methods": [ 
        "get", 
        "post" 
      ], 
      "route": "todoitems/{partitionKeyValue}/{id}" 
    }, 
    { 
      "name": "Response", 
      "type": "http", 
      "direction": "out" 
    }
  ], 
  "disabled": false 
} 
```

The _run.ps1_ file has the PowerShell code which reads the incoming document and outputs changes.

```powershell
using namespace System.Net

param($Request, $ToDoItem, $TriggerMetadata)

Write-Host 'PowerShell HTTP trigger function processed a request'

if (-not $ToDoItem) { 
    Write-Host 'ToDo item not found'

    Push-OutputBinding -Name Response -Value ([HttpResponseContext]@{ 
        StatusCode = [HttpStatusCode]::NotFound 
        Body = $ToDoItem.Description 
    })

} else { 
    Write-Host "Found ToDo item, Description=$($ToDoItem.Description)"

    Push-OutputBinding -Name Response -Value ([HttpResponseContext]@{ 
        StatusCode = [HttpStatusCode]::OK 
        Body = $ToDoItem.Description 
    }) 
} 
```

<a name="queue-trigger-multiple-docs-sqlquery-ps"></a>

### Queue trigger, get multiple docs, using SqlQuery

The following example demonstrates how to read multiple Azure Cosmos DB documents. The function's configuration file (_function.json_) defines the binding properties, which includes the `sqlQuery`. The SQL statement provided to the `sqlQuery` property selects the set of documents provided to the function.

```json
{ 
  "name": "Documents", 
  "type": "cosmosDB", 
  "direction": "in", 
  "databaseName": "MyDb", 
  "collectionName": "MyCollection", 
  "sqlQuery": "SELECT * from c where c.departmentId = {departmentId}", 
  "connectionStringSetting": "CosmosDBConnection" 
} 
```

The _run1.ps1_ file has the PowerShell code which reads the incoming documents.

```powershell
param($QueueItem, $Documents, $TriggerMetadata)

foreach ($Document in $Documents) { 
    # operate on each document 
} 
```


**Applies to: programming-language-python**


This section contains the following examples that read a single document by specifying an ID value from various sources:

* [Queue trigger, look up ID from JSON](#queue-trigger-look-up-id-from-json-python)
* [HTTP trigger, look up ID from query string](#http-trigger-look-up-id-from-query-string-python)
* [HTTP trigger, look up ID from route data](#http-trigger-look-up-id-from-route-data-python)
* [Queue trigger, get multiple docs, using SqlQuery](#queue-trigger-get-multiple-docs-using-sqlquery-python)

<a id="queue-trigger-look-up-id-from-json-python"></a>

The examples depend on whether you use the [v1 or v2 Python programming model](functions-reference-python.md).

### Using SDK-Type Bindings for Cosmos DB (Preview)
This example uses SDK types to directly access the underlying [`CosmosClient`](https://github.com/Azure/azure-functions-python-extensions/blob/dev/azurefunctions-extensions-bindings-cosmosdb/samples/cosmosdb_samples_cosmosclient/function_app.py) object provided by the Cosmos DB input binding:

The function loops through all the databases and logs their IDs.
```python
import logging
import azure.functions as func
import azurefunctions.extensions.bindings.cosmosdb as cosmos

app = func.FunctionApp(http_auth_level=func.AuthLevel.FUNCTION)

@app.route(route="cosmos")
@app.cosmos_db_input(arg_name="client",
                     connection="CosmosDBConnection",
                     database_name=None,
                     container_name=None)
def get_docs(req: func.HttpRequest, client: cosmos.CosmosClient):
    databases = client.list_databases()
    for db in databases:
        logging.info(f"Found database with ID: {db.get('id')}")

    return "ok"
```

For examples of using other SDK types, see the [`ContainerProxy`](https://github.com/Azure/azure-functions-python-extensions/blob/dev/azurefunctions-extensions-bindings-cosmosdb/samples/cosmosdb_samples_containerproxy/function_app.py) and [`DatabaseProxy`](https://github.com/Azure/azure-functions-python-extensions/blob/dev/azurefunctions-extensions-bindings-cosmosdb/samples/cosmosdb_samples_databaseproxy/function_app.py) samples. For a step-by-step tutorial on how to include SDK-type bindings in your function app, follow the [Python SDK Bindings for CosmosDB Sample](https://github.com/Azure-Samples/azure-functions-cosmosdb-sdk-bindings-python).

To learn more, including what other SDK type bindings are supported, see [SDK type bindings](functions-reference-python.md#sdk-type-bindings).

### Queue trigger, look up ID from JSON

The following example shows an Azure Cosmos DB input binding. The function reads a single document and updates the document's text value. 

# [v2](#tab/python-v2)

```python
import logging
import azure.functions as func

app = func.FunctionApp()

@app.queue_trigger(arg_name="msg", 
                   queue_name="outqueue", 
                   connection="AzureWebJobsStorage")
@app.cosmos_db_input(arg_name="documents", 
                     database_name="MyDatabase",
                     collection_name="MyCollection",
                     id="{msg.payload_property}",
                     partition_key="{msg.payload_property}",
                     connection_string_setting="MyAccount_COSMOSDB")
@app.cosmos_db_output(arg_name="outputDocument", 
                      database_name="MyDatabase",
                      collection_name="MyCollection",
                      connection_string_setting="MyAccount_COSMOSDB")
def test_function(msg: func.QueueMessage,
                  inputDocument: func.DocumentList, 
                  outputDocument: func.Out[func.Document]):
     doc = inputDocument[0]
     doc["text"] = "This was updated!"
     outputDocument.set(doc)
     print(f"Updated document.")
```

# [v1](#tab/python-v1)

Here's the binding data in the *function.json* file:

```json
{
    "name": "documents",
    "type": "cosmosDB",
    "databaseName": "MyDatabase",
    "collectionName": "MyCollection",
    "id" : "{queueTrigger_payload_property}",
    "partitionKey": "{queueTrigger_payload_property}",
    "connectionStringSetting": "MyAccount_COSMOSDB",
    "direction": "in"
},
{
    "name": "$return",
    "type": "cosmosDB",
    "databaseName": "MyDatabase",
    "collectionName": "MyCollection",
    "createIfNotExists": false,
    "partitionKey": "{queueTrigger_payload_property}",
    "connectionStringSetting": "MyAccount_COSMOSDB",
    "direction": "out"
}
```

The [configuration](#configuration) section explains these properties.

Here's the Python code:

```python
import azure.functions as func

def main(queuemsg: func.QueueMessage, documents: func.DocumentList) -> func.Document:
    if documents:
        document = documents[0]
        document['text'] = 'This was updated!'
        return document
```

---

<a id="http-trigger-look-up-id-from-query-string-python"></a>

### HTTP trigger, look up ID from query string

The following example shows a function that retrieves a single document. The function is triggered by an HTTP request that uses a query string to specify the ID and partition key value to look up. That ID and partition key value are used to retrieve a `ToDoItem` document from the specified database and collection.

# [v2](#tab/python-v2)

No equivalent sample for v2 at this time.

# [v1](#tab/python-v1)


Here's the *function.json* file:

```json
{
  "bindings": [
    {
      "authLevel": "anonymous",
      "name": "req",
      "type": "httpTrigger",
      "direction": "in",
      "methods": [
        "get",
        "post"
      ]
    },
    {
      "name": "$return",
      "type": "http",
      "direction": "out"
    },
    {
      "type": "cosmosDB",
      "name": "todoitems",
      "databaseName": "ToDoItems",
      "collectionName": "Items",
      "connectionStringSetting": "CosmosDBConnection",
      "direction": "in",
      "Id": "{Query.id}",
      "PartitionKey": "{Query.partitionKeyValue}"
    }
  ],
  "scriptFile": "__init__.py"
}
```

Here's the Python code:

```python
import logging
import azure.functions as func

def main(req: func.HttpRequest, todoitems: func.DocumentList) -> str:
    if not todoitems:
        logging.warning("ToDo item not found")
    else:
        logging.info("Found ToDo item, Description=%s",
                     todoitems[0]['description'])

    return 'OK'
```

---

<a id="http-trigger-look-up-id-from-route-data-python"></a>

### HTTP trigger, look up ID from route data

The following example shows a function that retrieves a single document. The function is triggered by an HTTP request that uses route data to specify the ID and partition key value to look up. That ID and partition key value are used to retrieve a `ToDoItem` document from the specified database and collection.

# [v2](#tab/python-v2)

No equivalent sample for v2 at this time.

# [v1](#tab/python-v1)

Here's the *function.json* file:

```json
{
  "bindings": [
    {
      "authLevel": "anonymous",
      "name": "req",
      "type": "httpTrigger",
      "direction": "in",
      "methods": [
        "get",
        "post"
      ],
      "route":"todoitems/{partitionKeyValue}/{id}"
    },
    {
      "name": "$return",
      "type": "http",
      "direction": "out"
    },
    {
      "type": "cosmosDB",
      "name": "todoitems",
      "databaseName": "ToDoItems",
      "collectionName": "Items",
      "connection": "CosmosDBConnection",
      "direction": "in",
      "Id": "{id}",
      "PartitionKey": "{partitionKeyValue}"
    }
  ],
  "disabled": false,
  "scriptFile": "__init__.py"
}
```

Here's the Python code:

```python
import logging
import azure.functions as func

def main(req: func.HttpRequest, todoitems: func.DocumentList) -> str:
    if not todoitems:
        logging.warning("ToDo item not found")
    else:
        logging.info("Found ToDo item, Description=%s",
                     todoitems[0]['description'])
    return 'OK'
```

---

<a id="queue-trigger-get-multiple-docs-using-sqlquery-python"></a>

### Queue trigger, get multiple docs, using SqlQuery

The following example shows an Azure Cosmos DB input binding Python function that uses the binding. The function retrieves multiple documents specified by a SQL query, using a queue trigger to customize the query parameters.

The queue trigger provides a parameter `departmentId`. A queue message of `{ "departmentId" : "Finance" }` would return all records for the finance department.

# [v2](#tab/python-v2)

No equivalent sample for v2 at this time.

# [v1](#tab/python-v1)

Here's the binding data in the *function.json* file:

```json
{
    "name": "documents",
    "type": "cosmosDB",
    "direction": "in",
    "databaseName": "MyDb",
    "collectionName": "MyCollection",
    "sqlQuery": "SELECT * from c where c.departmentId = {departmentId}",
    "connectionStringSetting": "CosmosDBConnection"
}
```

---


**Applies to: programming-language-csharp**

## Attributes

Both [in-process](functions-dotnet-class-library.md) and [isolated worker process](dotnet-isolated-process-guide.md) C# libraries use attributes to define the function. C# script instead uses a function.json configuration file as described in the [C# scripting guide](functions-reference-csharp.md#azure-cosmos-db-v2-input).

# [Extension 4.x+](#tab/extensionv4/in-process)

| Attribute property | Description |
| --- | --- |
| **Connection** | The name of an app setting or setting collection that specifies how to connect to the Azure Cosmos DB account being queried. For more information, see [Connections](#connections). |
| **DatabaseName** | The name of the Azure Cosmos DB database with the container being monitored. |
| **ContainerName** | The name of the container being monitored. |
| **PartitionKey** | Specifies the partition key value for the lookup. May include binding parameters. It is required for lookups in [partitioned](https://learn.microsoft.com/azure/cosmos-db/partitioning-overview#logical-partitions) containers. |
| **Id** | The ID of the document to retrieve. This property supports [binding expressions](functions-bindings-expressions-patterns.md). Don't set both the `Id` and `SqlQuery` properties. If you don't set either one, the entire container is retrieved. |
| **SqlQuery** | An Azure Cosmos DB SQL query used for retrieving multiple documents. The property supports runtime bindings, as in this example: `SELECT * FROM c where c.departmentId = {departmentId}`. Don't set both the `Id` and `SqlQuery` properties. If you don't set either one, the entire container is retrieved. |
| **PreferredLocations** | (Optional) Defines preferred locations (regions) for geo-replicated database accounts in the Azure Cosmos DB service. Values should be comma-separated. For example, `East US,South Central US,North Europe`. |

# [Functions 2.x+](#tab/functionsv2/in-process)

| Attribute property | Description |
| --- | --- |
| **ConnectionStringSetting** | The name of an app setting or setting collection that specifies how to connect to the Azure Cosmos DB account being monitored. For more information, see [Connections](#connections). |
| **DatabaseName** | The name of the Azure Cosmos DB database with the collection being monitored. |
| **CollectionName** | The name of the collection being monitored. |
| **PartitionKey** | Specifies the partition key value for the lookup. May include binding parameters. It is required for lookups in [partitioned](https://learn.microsoft.com/azure/cosmos-db/partitioning-overview#logical-partitions) collections. |
| **Id** | The ID of the document to retrieve. This property supports [binding expressions](functions-bindings-expressions-patterns.md). Don't set both the `Id` and `SqlQuery` properties. If you don't set either one, the entire collection is retrieved. |
| **SqlQuery** | An Azure Cosmos DB SQL query used for retrieving multiple documents. The property supports runtime bindings, as in this example: `SELECT * FROM c where c.departmentId = {departmentId}`. Don't set both the `Id` and `SqlQuery` properties. If you don't set either one, the entire collection is retrieved. |
| **PreferredLocations** | (Optional) Defines preferred locations (regions) for geo-replicated database accounts in the Azure Cosmos DB service. Values should be comma-separated. For example, "East US,South Central US,North Europe". |

# [Extension 4.x+](#tab/extensionv4/isolated-process)

| Attribute property | Description |
| --- | --- |
| **Connection** | The name of an app setting or setting collection that specifies how to connect to the Azure Cosmos DB account being queried. For more information, see [Connections](#connections). |
| **DatabaseName** | The name of the Azure Cosmos DB database with the container being monitored. |
| **ContainerName** | The name of the container being monitored. |
| **PartitionKey** | Specifies the partition key value for the lookup. May include binding parameters. It is required for lookups in [partitioned](https://learn.microsoft.com/azure/cosmos-db/partitioning-overview#logical-partitions) containers. |
| **Id** | The ID of the document to retrieve. This property supports [binding expressions](functions-bindings-expressions-patterns.md). Don't set both the `Id` and `SqlQuery` properties. If you don't set either one, the entire container is retrieved. |
| **SqlQuery** | An Azure Cosmos DB SQL query used for retrieving multiple documents. The property supports runtime bindings, as in this example: `SELECT * FROM c where c.departmentId = {departmentId}`. Don't set both the `Id` and `SqlQuery` properties. If you don't set either one, the entire container is retrieved. |
| **PreferredLocations** | (Optional) Defines preferred locations (regions) for geo-replicated database accounts in the Azure Cosmos DB service. Values should be comma-separated. For example, `East US,South Central US,North Europe`. |

# [Functions 2.x+](#tab/functionsv2/isolated-process)

| Attribute property | Description |
| --- | --- |
| **ConnectionStringSetting** | The name of an app setting or setting collection that specifies how to connect to the Azure Cosmos DB account being monitored. For more information, see [Connections](#connections). |
| **DatabaseName** | The name of the Azure Cosmos DB database with the collection being monitored. |
| **CollectionName** | The name of the collection being monitored. |
| **PartitionKey** | Specifies the partition key value for the lookup. May include binding parameters. It is required for lookups in [partitioned](https://learn.microsoft.com/azure/cosmos-db/partitioning-overview#logical-partitions) collections. |
| **Id** | The ID of the document to retrieve. This property supports [binding expressions](functions-bindings-expressions-patterns.md). Don't set both the `Id` and `SqlQuery` properties. If you don't set either one, the entire collection is retrieved. |
| **SqlQuery** | An Azure Cosmos DB SQL query used for retrieving multiple documents. The property supports runtime bindings, as in this example: `SELECT * FROM c where c.departmentId = {departmentId}`. Don't set both the `Id` and `SqlQuery` properties. If you don't set either one, the entire collection is retrieved. |
| **PreferredLocations** | (Optional) Defines preferred locations (regions) for geo-replicated database accounts in the Azure Cosmos DB service. Values should be comma-separated. For example, "East US,South Central US,North Europe". |

---



**Applies to: programming-language-python**

## Decorators

_Applies only to the Python v2 programming model._

Python v2 functions are defined using the `cosmos_db_input` decorator, which supports these properties, depending on the extension version:

### [Extension 4.x+](#tab/extensionv4)

| Property | Description |
| --- | --- |
| `arg_name` | The variable name used in function code that represents the list of documents with changes. |
| `database_name` | The name of the Azure Cosmos DB database with the collection being monitored. |
| `container_name` | The name of the Azure Cosmos DB collection being monitored. |
| `connection` | The connection string of the Azure Cosmos DB being monitored. |
| `partition_key` | The partition key of the Azure Cosmos DB being monitored. |
| `id` | The ID of the document to retrieve. |

### [Functions 2.x+](#tab/functionsv2)

| Property | Description |
| --- | --- |
| `arg_name` | The variable name used in function code that represents the list of documents with changes. |
| `database_name` | The name of the Azure Cosmos DB database with the collection being monitored. |
| `collection_name` | The name of the Azure Cosmos DB collection being monitored. |
| `connection_string_setting` | The connection string of the Azure Cosmos DB being monitored. |
| `partition_key` | The partition key of the Azure Cosmos DB being monitored. |
| `id` | The ID of the document to retrieve. |

---

For Python functions defined by using *function.json*, see the [Configuration](#configuration) section.


**Applies to: programming-language-java**

## Annotations

From the [Java functions runtime library](https://learn.microsoft.com/java/api/overview/azure/functions/runtime), use the `@CosmosDBInput` annotation on parameters that read from Azure Cosmos DB. The annotation supports the following properties:

+ [name](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.cosmosdbinput.name)
+ [connectionStringSetting](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.cosmosdbinput.connectionstringsetting)
+ [databaseName](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.cosmosdbinput.databasename)
+ [collectionName](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.cosmosdbinput.collectionname)
+ [dataType](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.cosmosdbinput.datatype)
+ [id](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.cosmosdbinput.id)
+ [partitionKey](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.cosmosdbinput.partitionkey)
+ [sqlQuery](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.cosmosdbinput.sqlquery)


**Applies to: programming-language-javascript,programming-language-typescript,programming-language-powershell,programming-language-python**

## Configuration


**Applies to: programming-language-python**

_Applies only to the Python v1 programming model._


**Applies to: programming-language-javascript,programming-language-typescript**


# [Model v4](#tab/nodejs-v4)

The following table explains the properties that you can set on the `options` object passed to the `input.cosmosDB()` method. The `type`, `direction`, and `name` properties don't apply to the v4 model.

# [Model v3](#tab/nodejs-v3)

The following table explains the binding configuration properties that you set in the *function.json* file, where properties differ by extension version:  

---


**Applies to: programming-language-powershell,programming-language-python**


The following table explains the binding configuration properties that you set in the *function.json* file, where properties differ by extension version:


**Applies to: programming-language-javascript,programming-language-typescript,programming-language-powershell,programming-language-python**


# [Extension 4.x+](#tab/extensionv4)

| function.json property | Description |
| --- | --- |
| **type** | Must be set to `cosmosDB`. |
| **direction** | Must be set to `in`. |
| **name** | The variable name used in function code that represents the list of documents with changes. |
| **connection** | The name of an app setting or setting container that specifies how to connect to the Azure Cosmos DB account being monitored. For more information, see [Connections](functions-bindings-cosmosdb-v2-input.md#connections). |
| **databaseName** | The name of the Azure Cosmos DB database with the container being monitored. |
| **containerName** | The name of the container being monitored. |
| **partitionKey** | Specifies the partition key value for the lookup. May include binding parameters. It is required for lookups in [partitioned](https://learn.microsoft.com/azure/cosmos-db/partitioning-overview#logical-partitions) containers. |
| **id** | The ID of the document to retrieve. This property supports [binding expressions](functions-bindings-expressions-patterns.md). Don't set both the `id` and `sqlQuery` properties. If you don't set either one, the entire container is retrieved. |
| **sqlQuery** | An Azure Cosmos DB SQL query used for retrieving multiple documents. The property supports runtime bindings, as in this example: `SELECT * FROM c where c.departmentId = {departmentId}`. Don't set both the `id` and `sqlQuery` properties. If you don't set either one, the entire container is retrieved. |
| **preferredLocations** | (Optional) Defines preferred locations (regions) for geo-replicated database accounts in the Azure Cosmos DB service. Values should be comma-separated. For example, `East US,South Central US,North Europe`. |


# [Functions 2.x+](#tab/functionsv2)

| function.json property | Description |
| --- | --- |
| **type** | Must be set to `cosmosDBTrigger`. |
| **direction** | Must be set to `in`. |
| **name** | The variable name used in function code that represents the list of documents with changes. |
| **connectionStringSetting** | The name of an app setting or setting collection that specifies how to connect to the Azure Cosmos DB account being monitored. For more information, see [Connections](#connections). |
| **databaseName** | The name of the Azure Cosmos DB database with the collection being monitored. |
| **collectionName** | The name of the collection being monitored. |
| **partitionKey** | Specifies the partition key value for the lookup. May include binding parameters. It is required for lookups in [partitioned](https://learn.microsoft.com/azure/cosmos-db/partitioning-overview#logical-partitions) collections. |
| **id** | The ID of the document to retrieve. This property supports [binding expressions](functions-bindings-expressions-patterns.md). Don't set both the `id` and `sqlQuery` properties. If you don't set either one, the entire collection is retrieved. |
| **sqlQuery** | An Azure Cosmos DB SQL query used for retrieving multiple documents. The property supports runtime bindings, as in this example: `SELECT * FROM c where c.departmentId = {departmentId}`. Don't set both the `id` and `sqlQuery` properties. If you don't set either one, the entire collection is retrieved. |
| **preferredLocations** | (Optional) Defines preferred locations (regions) for geo-replicated database accounts in the Azure Cosmos DB service. Values should be comma-separated. For example, `East US,South Central US,North Europe`. |

---


See the [Example section](#example) for complete examples.

## Usage

**Applies to: programming-language-csharp**


# [Extension 4.x+](#tab/extensionv4/in-process)

When the function exits successfully, any changes made to the input document are automatically persisted.

# [Functions 2.x+](#tab/functionsv2/in-process)

When the function exits successfully, any changes made to the input document are automatically persisted.

# [Extension 4.x+](#tab/extensionv4/isolated-process)

When the function exits successfully, any changes made to the input document are automatically persisted.

# [Functions 2.x+](#tab/functionsv2/isolated-process)

When the function exits successfully, any changes made to the input document are automatically persisted.

---

The parameter type supported by the Cosmos DB input binding depends on the Functions runtime version, the extension package version, and the C# modality used.

# [Extension 4.x+](#tab/extensionv4/in-process)

See [Binding types](functions-bindings-cosmosdb-v2.md?tabs=in-process%2Cextensionv4\&pivots=programming-language-csharp#binding-types) for a list of supported types.

# [Functions 2.x+](#tab/functionsv2/in-process)

See [Binding types](functions-bindings-cosmosdb-v2.md?tabs=in-process%2Cfunctionsv2\&pivots=programming-language-csharp#binding-types) for a list of supported types.

# [Extension 4.x+](#tab/extensionv4/isolated-process)


When you want the function to process a single document, the Cosmos DB input binding can bind to the following types:

| Type | Description |
| --- | --- |
| JSON serializable types | Functions attempts to deserialize the JSON data of the document into a plain-old CLR object (POCO) type. |

When you want the function to process multiple documents from a query, the Cosmos DB input binding can bind to the following types:

| Type | Description |
| --- | --- |
| `IEnumerable<T>`where `T` is a JSON serializable type | An enumeration of entities returned by the query. Each entry represents one document. |
| [CosmosClient]<sup>1</sup> | A client connected to the Cosmos DB account. |
| [Database]<sup>1</sup> | A client connected to the Cosmos DB database. |
| [Container]<sup>1</sup> | A client connected to the Cosmos DB container. |

<sup>1</sup> To use these types, you need to reference [Microsoft.Azure.Functions.Worker.Extensions.CosmosDB 4.4.0 or later](https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.CosmosDB/4.4.0) and the [common dependencies for SDK type bindings](dotnet-isolated-process-guide.md#sdk-types).

[CosmosClient]: https://learn.microsoft.com/dotnet/api/microsoft.azure.cosmos.cosmosclient
[Database]: https://learn.microsoft.com/dotnet/api/microsoft.azure.cosmos.database
[Container]: https://learn.microsoft.com/dotnet/api/microsoft.azure.cosmos.container


# [Functions 2.x+](#tab/functionsv2/isolated-process)

See [Binding types](functions-bindings-cosmosdb-v2.md?tabs=isolated-process%2Cfunctionsv2\&pivots=programming-language-csharp#binding-types) for a list of supported types.

---


<!--Any of the below pivots can be combined if the usage info is identical.-->
**Applies to: programming-language-java**

From the [Java functions runtime library](https://learn.microsoft.com/java/api/overview/azure/functions/runtime), the [@CosmosDBInput](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.cosmosdbinput) annotation exposes Azure Cosmos DB data to the function. This annotation can be used with native Java types, POJOs, or nullable values using `Optional<T>`.

**Applies to: programming-language-javascript,programming-language-typescript**


# [Model v4](#tab/nodejs-v4)

Access the document by using `context.extraInputs.get()`.

# [Model v3](#tab/nodejs-v3)

Access the document by using `context.bindings.<name>` where `<name>` is the value specified in the `name` property of *function.json*.

---


**Applies to: programming-language-powershell**

Updates to documents are not made automatically upon function exit. To update documents in a function use an [output binding](functions-bindings-cosmosdb-v2-input.md). See the [PowerShell example](#example) for more detail.

**Applies to: programming-language-python**

Data is made available to the function via a `DocumentList` parameter. Changes made to the document are not automatically persisted.
Functions also support Python SDK type bindings for Azure Cosmos, which lets you work with data using these underlying SDK types:

+ [`ContainerProxy`](https://github.com/Azure/azure-functions-python-extensions/blob/dev/azurefunctions-extensions-bindings-cosmosdb/samples/cosmosdb_samples_containerproxy/function_app.py)
+ [`CosmosClient`](https://github.com/Azure/azure-functions-python-extensions/blob/dev/azurefunctions-extensions-bindings-cosmosdb/samples/cosmosdb_samples_cosmosclient/function_app.py)
+ [`DatabaseProxy`](https://github.com/Azure/azure-functions-python-extensions/blob/dev/azurefunctions-extensions-bindings-cosmosdb/samples/cosmosdb_samples_databaseproxy/function_app.py)

> **Important:**  
> > Support for CosmosDB SDK types for Python is in Preview and is only supported for the Python v2 programming model. For more information, see [SDK types in Python](functions-reference-python.md#sdk-type-bindings).




## Connections

The `connection` and `leaseConnection` properties are set to keys in application settings that return values used by the Functions runtime to connect to the Azure Cosmos DB account endpoints used by the extension. The value of these property settings depend on the type of connection: 

+ **Managed identity connection**: The `connection` property is a `<CONNECTION_NAME_PREFIX>` shared by a group of settings that together define an identity-based connection to the account. For more information, see [Define identity connections](manage-connections.md?pivots=functions-auth-identity\&tabs=bindings#define-connections).
+ **[Key Vault reference](https://learn.microsoft.com/azure/key-vault/general/overview)**: The `connection` property setting returns an Azure Key Vault reference to the location where the connection string is centrally maintained. For more information, see [Define Key Vault connections](manage-connections.md?pivots=functions-auth-keyvault\&tabs=bindings#define-connections).
+ **[App Configuration reference](../azure-app-configuration/quickstart-azure-functions-csharp.md)**: The `connection` property setting returns an Azure App Configuration reference that returns a connection string or a Key Vault reference. For more information, see [Azure App Configuration](manage-connections.md#azure-app-configuration) in the connections article. 
+ **Connection string**: The `connection` property setting returns the actual account connection string. Because the connection string contains shared secret keys, you should consider using a managed identity connection, when possible. For more information, see [Define connections](manage-connections.md?pivots=functions-auth-secret\&tabs=bindings#define-connections).

To learn more about bindings connections, see [Manage connection in Azure Functions](manage-connections.md?pivots=functions-auth-identity\&tabs=bindings). To obtain a connection string, navigate to your Azure Cosmos DB account, select **Keys**, and then copy the **PRIMARY CONNECTION STRING** or **SECONDARY CONNECTION STRING** values. These connection strings contain shared secret keys and must be kept secure. 

In earlier versions of the extension, the connection properties were named `connectionStringSetting` and `leaseConnectionStringSetting`.



## Next steps

- [Run a function when an Azure Cosmos DB document is created or modified (Trigger)](functions-bindings-cosmosdb-v2-trigger.md)
- [Save changes to an Azure Cosmos DB document (Output binding)](functions-bindings-cosmosdb-v2-output.md)
