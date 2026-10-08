---
title: Azure Cosmos DB trigger for Functions 2.x and higher
description: Learn to use the Azure Cosmos DB trigger in Azure Functions.
ms.topic: reference
ms.date: 04/13/2026
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

# Azure Cosmos DB trigger for Azure Functions 2.x and higher

The Azure Cosmos DB Trigger uses the [Azure Cosmos DB change feed](https://learn.microsoft.com/azure/cosmos-db/change-feed) to listen for inserts and updates across partitions. The change feed publishes new and updated items, not including updates from deletions. For an end-to-end scenario that uses the Azure Cosmos DB trigger, see [Quickstart: Respond to database changes in Azure Cosmos DB using Azure Functions](scenario-database-changes-azure-cosmosdb.md).

For information on setup and configuration details, see the [overview](functions-bindings-cosmosdb-v2.md).

Cosmos DB scaling decisions for the Consumption and Premium plans are done via target-based scaling. For more information, see [Target-based scaling](functions-target-based-scaling.md).

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



For a complete end-to-end example of using the Azure Cosmos DB trigger, see [Respond to database changes in Azure Cosmos DB using Azure Functions](scenario-database-changes-azure-cosmosdb.md).

## Example

**Applies to: programming-language-csharp**


The usage of the trigger depends on the extension package version and the C# modality used in your function app, which can be one of the following:

# [Isolated worker model](#tab/isolated-process)

An isolated worker process class library compiled C# function runs in a process isolated from the runtime.

# [In-process model](#tab/in-process)


> **Important:**
> [Support will end for the in-process model on November 10, 2026](https://aka.ms/azure-functions-retirements/in-process-model). We highly recommend that you [migrate your apps to the isolated worker model](https://learn.microsoft.com/azure/azure-functions/migrate-dotnet-to-isolated-model?tabs=net8) for full support.

An in-process class library is a compiled C# function that runs in the same process as the Functions runtime.
 
---

The following examples depend on the extension version for the given C# mode.

# [Extension 4.x+](#tab/extensionv4/in-process)

Apps that use [Azure Cosmos DB extension version 4.x](functions-bindings-cosmosdb-v2.md?tabs=extensionv4) or higher use different attribute properties. This section shows those properties. The example uses app settings references and includes error handling.

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

```cs
using System;
using System.Collections.Generic;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Extensions.Logging;

namespace CosmosDBSamplesV2
{
    public static class CosmosTrigger
    {
        [FunctionName("CosmosTrigger")]
        public static void Run([CosmosDBTrigger(
            databaseName: "%COSMOS_DATABASE_NAME%",
            containerName: "%COSMOS_CONTAINER_NAME%",
            Connection = "COSMOS_CONNECTION",
            LeaseContainerName = "leases",
            CreateLeaseContainerIfNotExists = true)]IReadOnlyList<ToDoItem> documents, ILogger log)
        {
            if (documents != null && documents.Count > 0)
            {
                log.LogInformation("Documents modified: {count}", documents.Count);
                foreach (var doc in documents)
                {
                    try
                    {
                        log.LogInformation("Processing document Id: {id}", doc.id);
                        // Add your business logic here
                    }
                    catch (Exception ex)
                    {
                        log.LogError(ex, "Error processing document {id}", doc.id);
                        // Continue processing remaining documents
                    }
                }
            }
        }

        [FunctionName("health")]
        public static IActionResult HealthCheck(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "health")] HttpRequest req)
        {
            return new OkResult();
        }
    }
}
```

The preceding example uses app settings references (`%VAR_NAME%`) instead of hardcoded values.

**App settings**

Configure these application settings for identity-based connections:

| Setting | Description | Example |
| --- | --- | --- |
| `COSMOS_DATABASE_NAME` | Name of the Azure Cosmos DB database | `my-database` |
| `COSMOS_CONTAINER_NAME` | Name of the container to monitor | `my-container` |
| `COSMOS_CONNECTION__accountEndpoint` | Azure Cosmos DB account endpoint | `https://mycosmosdb.documents.azure.com:443/` |
| `COSMOS_CONNECTION__credential` | Set to `managedidentity` for UAMI | `managedidentity` |
| `COSMOS_CONNECTION__clientId` | Client ID of the user-assigned managed identity | `00000000-0000-0000-0000-000000000000` |

**Local development**

For local development, create a `local.settings.json` file:

```json
{
    "IsEncrypted": false,
    "Values": {
        "AzureWebJobsStorage": "UseDevelopmentStorage=true",
        "FUNCTIONS_WORKER_RUNTIME": "dotnet",
        "COSMOS_DATABASE_NAME": "my-database",
        "COSMOS_CONTAINER_NAME": "my-container",
        "COSMOS_CONNECTION__accountEndpoint": "https://mycosmosdb.documents.azure.com:443/"
    }
}
```

> **Tip:**
> For local development, omit `COSMOS_CONNECTION__credential` and `COSMOS_CONNECTION__clientId`. The [`DefaultAzureCredential`](https://learn.microsoft.com/dotnet/azure/sdk/authentication/credential-chains#defaultazurecredential-overview) tries multiple credentials in order, including your Azure CLI login credentials.

**Prerequisites for local development:**
- [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) with `az login` completed
- [Azurite storage emulator](https://learn.microsoft.com/azure/storage/common/storage-use-azurite) running (`azurite --silent`)

# [Functions 2.x+](#tab/functionsv2/in-process)

The following example shows a [C# function](functions-dotnet-class-library.md) that runs when inserts or updates occur in the specified database and collection.

```cs
using Microsoft.Azure.Documents;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;
using System.Collections.Generic;
using Microsoft.Extensions.Logging;

namespace CosmosDBSamplesV2
{
    public static class CosmosTrigger
    {
        [FunctionName("CosmosTrigger")]
        public static void Run([CosmosDBTrigger(
            databaseName: "ToDoItems",
            collectionName: "Items",
            ConnectionStringSetting = "CosmosDBConnection",
            LeaseCollectionName = "leases",
            CreateLeaseCollectionIfNotExists = true)]IReadOnlyList<Document> documents,
            ILogger log)
        {
            if (documents != null && documents.Count > 0)
            {
                log.LogInformation($"Documents modified: {documents.Count}");
                log.LogInformation($"First document Id: {documents[0].Id}");
            }
        }
    }
}
```

# [Extension 4.x+](#tab/extensionv4/isolated-process)

This example uses app settings references and includes error handling. First, define your model type:

```csharp
public class ToDoItem
{
    public string? Id { get; set; }
    public string? Description { get; set; }
}
```

The following function runs when inserts or updates occur in the specified database and container:

```csharp
[Function("CosmosTrigger")]
public void Run([CosmosDBTrigger(
    databaseName: "%COSMOS_DATABASE_NAME%",
    containerName: "%COSMOS_CONTAINER_NAME%",
    Connection = "COSMOS_CONNECTION",
    LeaseContainerName = "leases",
    CreateLeaseContainerIfNotExists = true)] IReadOnlyList<ToDoItem> documents,
    FunctionContext context)
{
    if (documents is not null && documents.Any())
    {
        _logger.LogInformation("Documents modified: {count}", documents.Count);
        foreach (var doc in documents)
        {
            try
            {
                _logger.LogInformation("Processing document Id: {id}", doc.Id);
                // Add your business logic here
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error processing document {id}", doc.Id);
                // Continue processing remaining documents
            }
        }
    }
}

[Function("health")]
public IActionResult HealthCheck([HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "health")] HttpRequest req)
{
    return new OkResult();
}
```

The preceding example uses app settings references (`%VAR_NAME%`) instead of hardcoded values. For configuration details, see the app settings and local development guidance in the in-process tab.

# [Functions 2.x+](#tab/functionsv2/isolated-process)

The following code defines a `MyDocument` type:
<!--
:::code language="csharp" source="~/azure-functions-dotnet-worker/samples/Extensions/CosmosDB/CosmosDBFunction.cs" range="49-58":::
-->
The following example uses an [`IReadOnlyList<T>`](https://learn.microsoft.com/dotnet/api/system.collections.generic.ireadonlylist-1) as the Azure Cosmos DB trigger binding parameter:
<!--
:::code language="csharp" source="~/azure-functions-dotnet-worker/samples/Extensions/CosmosDB/CosmosDBFunction.cs" id="docsnippet_exponential_backoff_retry_example":::
-->
This example requires the following `using` statements:
<!--
:::code language="csharp" source="~/azure-functions-dotnet-worker/samples/Extensions/CosmosDB/CosmosDBFunction.cs" range="4-7":::
-->
---


**Applies to: programming-language-java**


This function is invoked when there are inserts or updates in the specified database and container.

# [Extension 4.x+](#tab/extensionv4)

Because of schema changes in the Azure Cosmos DB SDK, version 4.x of the Azure Cosmos DB extension requires [azure-functions-java-library V3.0.0](https://central.sonatype.com/artifact/com.microsoft.azure.functions/azure-functions-java-library/3.0.0) for Java functions. 


```java
    @FunctionName("CosmosDBTriggerFunction")
    public void run(
        @CosmosDBTrigger(
            name = "items",
            databaseName = "ToDoList",
            containerName = "Items",
            leaseContainerName="leases",
            connection = "AzureCosmosDBConnection",
            createLeaseContainerIfNotExists = true
        )
        Object inputItem,
        final ExecutionContext context
    ) {
        context.getLogger().info("Items modified: " + inputItems.size());
    }
```

# [Functions 2.x+](#tab/functionsv2)

```java
    @FunctionName("cosmosDBMonitor")
    public void cosmosDbProcessor(
        @CosmosDBTrigger(name = "items",
            databaseName = "ToDoList",
            collectionName = "Items",
            leaseCollectionName = "leases",
            createLeaseCollectionIfNotExists = true,
            connectionStringSetting = "AzureCosmosDBConnection") String[] items,
            final ExecutionContext context ) {
                context.getLogger().info(items.length + "item(s) is/are changed.");
            }
```

---

In the [Java functions runtime library](https://learn.microsoft.com/java/api/overview/azure/functions/runtime), use the `@CosmosDBTrigger` annotation on parameters whose value comes from Azure Cosmos DB. Use this annotation with native Java types, plain-old Java objects (POJOs), or nullable values by using `Optional<T>`.


**Applies to: programming-language-typescript**


# [Model v4](#tab/nodejs-v4)

The following example shows an Azure Cosmos DB trigger [TypeScript function](functions-reference-node.md?tabs=typescript). The function writes log messages when Azure Cosmos DB records are added or modified.

[Code reference unavailable in this source snapshot: ~/azure-functions-nodejs-v4/ts/src/functions/cosmosDBTrigger1.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-cosmosdb-v2-trigger.md)

# [Model v3](#tab/nodejs-v3)

TypeScript samples aren't documented for model v3.

---


**Applies to: programming-language-javascript**


# [Model v4](#tab/nodejs-v4)

The following example shows an Azure Cosmos DB trigger [JavaScript function](functions-reference-node.md). The function writes log messages when Azure Cosmos DB records are added or modified.

[Code reference unavailable in this source snapshot: ~/azure-functions-nodejs-v4/js/src/functions/cosmosDBTrigger1.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-cosmosdb-v2-trigger.md)

# [Model v3](#tab/nodejs-v3)

The following example shows an Azure Cosmos DB trigger binding in a *function.json* file and a [JavaScript function](functions-reference-node.md) that uses the binding. The function writes log messages when Azure Cosmos DB records are added or modified.

Here's the binding data in the *function.json* file:


# [Functions 2.x+](#tab/functionsv2)
```json
{
    "type": "cosmosDBTrigger",
    "name": "documents",
    "direction": "in",
    "leaseCollectionName": "leases",
    "connectionStringSetting": "<connection-app-setting>",
    "databaseName": "Tasks",
    "collectionName": "Items",
    "createLeaseCollectionIfNotExists": true
}
```
# [Functions 4.x+](#tab/extensionv4)
```json
{
    "type": "cosmosDBTrigger",
    "name": "documents",
    "direction": "in",
    "leaseContainerName": "leases",
    "connection": "<connection-app-setting>",
    "databaseName": "Tasks",
    "containerName": "Items",
    "createLeaseContainerIfNotExists": true
}
```
---

Note that some of the binding attribute names changed in version 4.x of the Azure Cosmos DB extension.

Here's the JavaScript code:

```javascript
    module.exports = async function (context, documents) {
      context.log('First document Id modified : ', documents[0].id);
    }
```

---


**Applies to: programming-language-powershell**


The following example shows how to run a function as data changes in Azure Cosmos DB.


# [Functions 2.x+](#tab/functionsv2)
```json
{
    "type": "cosmosDBTrigger",
    "name": "documents",
    "direction": "in",
    "leaseCollectionName": "leases",
    "connectionStringSetting": "<connection-app-setting>",
    "databaseName": "Tasks",
    "collectionName": "Items",
    "createLeaseCollectionIfNotExists": true
}
```
# [Functions 4.x+](#tab/extensionv4)
```json
{
    "type": "cosmosDBTrigger",
    "name": "documents",
    "direction": "in",
    "leaseContainerName": "leases",
    "connection": "<connection-app-setting>",
    "databaseName": "Tasks",
    "containerName": "Items",
    "createLeaseContainerIfNotExists": true
}
```
---

Note that some of the binding attribute names changed in version 4.x of the Azure Cosmos DB extension.

In the _run.ps1_ file, you have access to the document that triggers the function via the `$Documents` parameter.

```powershell
param($Documents, $TriggerMetadata) 

Write-Host "First document Id modified : $($Documents[0].id)" 
```


**Applies to: programming-language-python**


The following example shows an Azure Cosmos DB trigger binding. The example depends on whether you use the [v1 or v2 Python programming model](functions-reference-python.md).

# [v2](#tab/python-v2)

```python
import logging
import azure.functions as func

app = func.FunctionApp()

@app.function_name(name="CosmosDBTrigger")
@app.cosmos_db_trigger(arg_name="documents", 
                       database_name="%COSMOS_DATABASE_NAME%", 
                       container_name="%COSMOS_CONTAINER_NAME%",
                       connection="COSMOS_CONNECTION",
                       lease_container_name="leases",
                       create_lease_container_if_not_exists="true")
def cosmos_trigger(documents: func.DocumentList) -> str:
    if documents:
        for doc in documents:
            try:
                logging.info('Processing document id: %s', doc['id'])
                # Add your business logic here
            except Exception as e:
                logging.error('Error processing document %s: %s', doc.get('id', 'unknown'), str(e))
                # Continue processing remaining documents

@app.function_name(name="health")
@app.route(route="health", methods=["GET"])
def health_check(req: func.HttpRequest) -> func.HttpResponse:
    """Health check endpoint for monitoring."""
    return func.HttpResponse("OK", status_code=200)
```

The preceding example uses app settings references (`%VAR_NAME%`) instead of hardcoded values.

**App settings**

Configure these application settings for identity-based connections:

| Setting | Description | Example |
| --- | --- | --- |
| `COSMOS_DATABASE_NAME` | Name of the Azure Cosmos DB database | `my-database` |
| `COSMOS_CONTAINER_NAME` | Name of the container to monitor | `my-container` |
| `COSMOS_CONNECTION__accountEndpoint` | Azure Cosmos DB account endpoint | `https://mycosmosdb.documents.azure.com:443/` |
| `COSMOS_CONNECTION__credential` | Set to `managedidentity` for UAMI | `managedidentity` |
| `COSMOS_CONNECTION__clientId` | Client ID of the user-assigned managed identity | `00000000-0000-0000-0000-000000000000` |

**Local development**

For local development, create a `local.settings.json` file:

```json
{
    "IsEncrypted": false,
    "Values": {
        "AzureWebJobsStorage": "UseDevelopmentStorage=true",
        "FUNCTIONS_WORKER_RUNTIME": "python",
        "COSMOS_DATABASE_NAME": "my-database",
        "COSMOS_CONTAINER_NAME": "my-container",
        "COSMOS_CONNECTION__accountEndpoint": "https://mycosmosdb.documents.azure.com:443/"
    }
}
```

> **Tip:**
> For local development, omit `COSMOS_CONNECTION__credential` and `COSMOS_CONNECTION__clientId`. The [`DefaultAzureCredential`](https://learn.microsoft.com/python/api/azure-identity/azure.identity.defaultazurecredential) tries multiple credentials in order, including your Azure CLI login credentials.

**Prerequisites for local development:**
- [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) with `az login` completed
- [Azurite storage emulator](https://learn.microsoft.com/azure/storage/common/storage-use-azurite) running (`azurite --silent`)

# [v1](#tab/python-v1)

The function writes log messages when Azure Cosmos DB records are modified. Here's the binding data in the *function.json* file:


# [Functions 2.x+](#tab/functionsv2)
```json
{
    "type": "cosmosDBTrigger",
    "name": "documents",
    "direction": "in",
    "leaseCollectionName": "leases",
    "connectionStringSetting": "<connection-app-setting>",
    "databaseName": "Tasks",
    "collectionName": "Items",
    "createLeaseCollectionIfNotExists": true
}
```
# [Functions 4.x+](#tab/extensionv4)
```json
{
    "type": "cosmosDBTrigger",
    "name": "documents",
    "direction": "in",
    "leaseContainerName": "leases",
    "connection": "<connection-app-setting>",
    "databaseName": "Tasks",
    "containerName": "Items",
    "createLeaseContainerIfNotExists": true
}
```
---

Note that some of the binding attribute names changed in version 4.x of the Azure Cosmos DB extension.

Here's the Python code:

```python
    import logging
    import azure.functions as func


    def main(documents: func.DocumentList) -> str:
        if documents:
            logging.info('First document Id modified: %s', documents[0]['id'])
```

---


**Applies to: programming-language-go**


The following example shows an Azure Cosmos DB trigger function that logs each changed document:

```go
package main

import (
	"context"
	"log"

	"github.com/azure/azure-functions-golang-worker/sdk"
	"github.com/azure/azure-functions-golang-worker/sdk/bindings"
	"github.com/azure/azure-functions-golang-worker/worker"
)

func main() {
	app := sdk.FunctionApp()
	app.CosmosDB("cosmosDBTrigger", processChanges,
		sdk.WithDatabase("mydb"),
		sdk.WithContainer("mycontainer"),
		sdk.WithConnection("CosmosDBConnection"),
	)
	worker.Start(app)
}

func processChanges(ctx context.Context, docs []bindings.CosmosDocument) error {
	for _, doc := range docs {
		log.Printf("Document modified: %s", doc.ID)
	}
	return nil
}
```


**Applies to: programming-language-csharp**

## Attributes

Both [in-process](functions-dotnet-class-library.md) and [isolated process](dotnet-isolated-process-guide.md) C# libraries use `CosmosDBTriggerAttribute` to define the function. C# script instead uses a function.json configuration file as described in the [C# scripting guide](functions-reference-csharp.md#azure-cosmos-db-v2-trigger).

The specific properties depend on both the process model and the extension version:

# [Extension 4.x+](#tab/extensionv4/in-process)

In-process libraries use [CosmosDBTriggerAttribute](https://github.com/Azure/azure-webjobs-sdk-extensions/blob/master/src/WebJobs.Extensions.CosmosDB/Trigger/CosmosDBTriggerAttribute.cs) from the `Microsoft.Azure.WebJobs` namespace, which defines these properties:

| Attribute property | Description |
| --- | --- |
| **Connection** | The name of an app setting or setting collection that specifies how to connect to the Azure Cosmos DB account being monitored. For more information, see [Connections](#connections). |
| **DatabaseName** | The name of the Azure Cosmos DB database with the container being monitored. |
| **ContainerName** | The name of the container being monitored. |
| **LeaseConnection** | (Optional) The name of an app setting or setting collection that specifies how to connect to the Azure Cosmos DB account that holds the lease container. <br><br> When not set, the `Connection` value is used. This parameter is automatically set when the binding is created in the portal. The connection string for the leases container must have write permissions. |
| **LeaseDatabaseName** | (Optional) The name of the database that holds the container used to store leases. When not set, the value of the `databaseName` setting is used. |
| **LeaseContainerName** | (Optional) The name of the container used to store leases. When not set, the value `leases` is used. |
| **CreateLeaseContainerIfNotExists** | (Optional) When set to `true`, the leases container is automatically created when it doesn't already exist. The default value is `false`. When using Microsoft Entra identities if you set the value to `true`, creating containers is not [an allowed operation](https://learn.microsoft.com/azure/cosmos-db/troubleshoot-forbidden#non-data-operations-are-not-allowed) and your Function won't be able to start. |
| **LeasesContainerThroughput** | (Optional) Defines the number of Request Units to assign when the leases container is created. This setting is only used when `CreateLeaseContainerIfNotExists` is set to `true`. This parameter is automatically set when the binding is created using the portal. |
| **LeaseContainerPrefix** | (Optional) When set, the value is added as a prefix to the leases created in the Lease container for this function. Using a prefix allows two separate Azure Functions to share the same Lease container by using different prefixes. |
| **FeedPollDelay** | (Optional) The time (in milliseconds) for the delay between polling a partition for new changes on the feed, after all current changes are drained. Default is 5,000 milliseconds, or 5 seconds. |
| **LeaseAcquireInterval** | (Optional) When set, it defines, in milliseconds, the interval to kick off a task to compute if partitions are distributed evenly among known host instances. Default is 13000 (13 seconds). |
| **LeaseExpirationInterval** | (Optional) When set, it defines, in milliseconds, the interval for which the lease is taken on a lease representing a partition. If the lease is not renewed within this interval, it will cause it to expire and ownership of the partition will move to another instance. Default is 60000 (60 seconds). |
| **LeaseRenewInterval** | (Optional) When set, it defines, in milliseconds, the renew interval for all leases for partitions currently held by an instance. Default is 17000 (17 seconds). |
| **MaxItemsPerInvocation** | (Optional) When set, this property sets the maximum number of items received per Function call. If operations in the monitored container are performed through stored procedures, [transaction scope](https://learn.microsoft.com/azure/cosmos-db/stored-procedures-triggers-udfs#transactions) is preserved when reading items from the change feed. As a result, the number of items received could be higher than the specified value so that the items changed by the same transaction are returned as part of one atomic batch. |
| **StartFromBeginning** | (Optional) This option tells the Trigger to read changes from the beginning of the container's change history instead of starting at the current time. Reading from the beginning only works the first time the trigger starts, as in subsequent runs, the checkpoints are already stored. Setting this option to `true` when there are leases already created has no effect. |
| **StartFromTime** | (Optional) Gets or sets the date and time from which to initialize the change feed read operation. The recommended format is ISO 8601 with the UTC designator, such as `2021-02-16T14:19:29Z`. This is only used to set the initial trigger state. After the trigger has a lease state, changing this value has no effect. |
| **PreferredLocations** | (Optional) Defines preferred locations (regions) for geo-replicated database accounts in the Azure Cosmos DB service. Values should be comma-separated. For example, "East US,South Central US,North Europe". |


# [Functions 2.x+](#tab/functionsv2/in-process)

In-process libraries use [CosmosDBTriggerAttribute](https://github.com/Azure/azure-webjobs-sdk-extensions/blob/master/src/WebJobs.Extensions.CosmosDB/Trigger/CosmosDBTriggerAttribute.cs) from the `Microsoft.Azure.WebJobs` namespace, which defines these properties:

| Attribute property | Description |
| --- | --- |
| **ConnectionStringSetting** | The name of an app setting or setting collection that specifies how to connect to the Azure Cosmos DB account being monitored. For more information, see [Connections](#connections). |
| **DatabaseName** | The name of the Azure Cosmos DB database with the collection being monitored. |
| **CollectionName** | The name of the collection being monitored. |
| **LeaseConnectionStringSetting** | (Optional) The name of an app setting or setting collection that specifies how to connect to the Azure Cosmos DB account that holds the lease collection. <br><br> When not set, the `ConnectionStringSetting` value is used. This parameter is automatically set when the binding is created in the portal. The connection string for the leases collection must have write permissions. |
| **LeaseDatabaseName** | (Optional) The name of the database that holds the collection used to store leases. When not set, the value of the `databaseName` setting is used. |
| **LeaseCollectionName** | (Optional) The name of the collection used to store leases. When not set, the value `leases` is used. |
| **CreateLeaseCollectionIfNotExists** | (Optional) When set to `true`, the leases collection is automatically created when it doesn't already exist. The default value is `false`. |
| **LeasesCollectionThroughput** | (Optional) Defines the number of Request Units to assign when the leases collection is created. This setting is only used when `CreateLeaseCollectionIfNotExists` is set to `true`. This parameter is automatically set when the binding is created using the portal. |
| **LeaseCollectionPrefix** | (Optional) When set, the value is added as a prefix to the leases created in the Lease collection for this function. Using a prefix allows two separate Azure Functions to share the same Lease collection by using different prefixes. |
| **FeedPollDelay** | (Optional) The time (in milliseconds) for the delay between polling a partition for new changes on the feed, after all current changes are drained. Default is 5,000 milliseconds, or 5 seconds. |
| **LeaseAcquireInterval** | (Optional) When set, it defines, in milliseconds, the interval to kick off a task to compute if partitions are distributed evenly among known host instances. Default is 13000 (13 seconds). |
| **LeaseExpirationInterval** | (Optional) When set, it defines, in milliseconds, the interval for which the lease is taken on a lease representing a partition. If the lease is not renewed within this interval, it will cause it to expire and ownership of the partition will move to another instance. Default is 60000 (60 seconds). |
| **LeaseRenewInterval** | (Optional) When set, it defines, in milliseconds, the renew interval for all leases for partitions currently held by an instance. Default is 17000 (17 seconds). |
| **CheckpointInterval** | (Optional) When set, it defines, in milliseconds, the interval between lease checkpoints. Default is always after each Function call. |
| **CheckpointDocumentCount** | (Optional) Customizes the amount of documents between lease checkpoints. Default is after every function call. |
| **MaxItemsPerInvocation** | (Optional) When set, this property sets the maximum number of items received per Function call. If operations in the monitored collection are performed through stored procedures, [transaction scope](https://learn.microsoft.com/azure/cosmos-db/stored-procedures-triggers-udfs#transactions) is preserved when reading items from the change feed. As a result, the number of items received could be higher than the specified value so that the items changed by the same transaction are returned as part of one atomic batch. |
| **StartFromBeginning** | (Optional) This option tells the Trigger to read changes from the beginning of the collection's change history instead of starting at the current time. Reading from the beginning only works the first time the trigger starts, as in subsequent runs, the checkpoints are already stored. Setting this option to `true` when there are leases already created has no effect. |
| **PreferredLocations** | (Optional) Defines preferred locations (regions) for geo-replicated database accounts in the Azure Cosmos DB service. Values should be comma-separated. For example, "East US,South Central US,North Europe". |
| **UseMultipleWriteLocations** | (Optional) Enables multi-region accounts for writing to the leases collection. |
| **UseDefaultJsonSerialization** | (Optional) Lets you use `JsonConvert.DefaultSettings` in the monitored collection. This setting only applies to the monitored collection and the consumer to setup the serialization used in the monitored collection. The `JsonConvert.DefaultSettings` must be set in a class derived from `CosmosDBWebJobsStartup`. |

# [Extension 4.x+](#tab/extensionv4/isolated-process)

Isolated worker process libraries use [CosmosDBTriggerAttribute](https://github.com/Azure/azure-functions-dotnet-worker/blob/main/extensions/Worker.Extensions.CosmosDB/src/CosmosDBTriggerAttribute.cs) from the `Microsoft.Azure.Functions.Worker` namespace, which defines these properties:

| Attribute property | Description |
| --- | --- |
| **Connection** | The name of an app setting or setting collection that specifies how to connect to the Azure Cosmos DB account being monitored. For more information, see [Connections](#connections). |
| **DatabaseName** | The name of the Azure Cosmos DB database with the container being monitored. |
| **ContainerName** | The name of the container being monitored. |
| **LeaseConnection** | (Optional) The name of an app setting or setting collection that specifies how to connect to the Azure Cosmos DB account that holds the lease container. <br><br> When not set, the `Connection` value is used. This parameter is automatically set when the binding is created in the portal. The connection string for the leases container must have write permissions. |
| **LeaseDatabaseName** | (Optional) The name of the database that holds the container used to store leases. When not set, the value of the `databaseName` setting is used. |
| **LeaseContainerName** | (Optional) The name of the container used to store leases. When not set, the value `leases` is used. |
| **CreateLeaseContainerIfNotExists** | (Optional) When set to `true`, the leases container is automatically created when it doesn't already exist. The default value is `false`. When using Microsoft Entra identities if you set the value to `true`, creating containers is not [an allowed operation](https://learn.microsoft.com/azure/cosmos-db/troubleshoot-forbidden#non-data-operations-are-not-allowed) and your Function won't be able to start. |
| **LeasesContainerThroughput** | (Optional) Defines the number of Request Units to assign when the leases container is created. This setting is only used when `CreateLeaseContainerIfNotExists` is set to `true`. This parameter is automatically set when the binding is created using the portal. |
| **LeaseContainerPrefix** | (Optional) When set, the value is added as a prefix to the leases created in the Lease container for this function. Using a prefix allows two separate Azure Functions to share the same Lease container by using different prefixes. |
| **FeedPollDelay** | (Optional) The time (in milliseconds) for the delay between polling a partition for new changes on the feed, after all current changes are drained. Default is 5,000 milliseconds, or 5 seconds. |
| **LeaseAcquireInterval** | (Optional) When set, it defines, in milliseconds, the interval to kick off a task to compute if partitions are distributed evenly among known host instances. Default is 13000 (13 seconds). |
| **LeaseExpirationInterval** | (Optional) When set, it defines, in milliseconds, the interval for which the lease is taken on a lease representing a partition. If the lease is not renewed within this interval, it will cause it to expire and ownership of the partition will move to another instance. Default is 60000 (60 seconds). |
| **LeaseRenewInterval** | (Optional) When set, it defines, in milliseconds, the renew interval for all leases for partitions currently held by an instance. Default is 17000 (17 seconds). |
| **MaxItemsPerInvocation** | (Optional) When set, this property sets the maximum number of items received per Function call. If operations in the monitored container are performed through stored procedures, [transaction scope](https://learn.microsoft.com/azure/cosmos-db/stored-procedures-triggers-udfs#transactions) is preserved when reading items from the change feed. As a result, the number of items received could be higher than the specified value so that the items changed by the same transaction are returned as part of one atomic batch. |
| **StartFromBeginning** | (Optional) This option tells the Trigger to read changes from the beginning of the container's change history instead of starting at the current time. Reading from the beginning only works the first time the trigger starts, as in subsequent runs, the checkpoints are already stored. Setting this option to `true` when there are leases already created has no effect. |
| **StartFromTime** | (Optional) Gets or sets the date and time from which to initialize the change feed read operation. The recommended format is ISO 8601 with the UTC designator, such as `2021-02-16T14:19:29Z`. This is only used to set the initial trigger state. After the trigger has a lease state, changing this value has no effect. |
| **PreferredLocations** | (Optional) Defines preferred locations (regions) for geo-replicated database accounts in the Azure Cosmos DB service. Values should be comma-separated. For example, "East US,South Central US,North Europe". |


# [Functions 2.x+](#tab/functionsv2/isolated-process)

Isolated worker process libraries use [CosmosDBTriggerAttribute](https://github.com/Azure/azure-functions-dotnet-worker/blob/main/extensions/Worker.Extensions.CosmosDB/src/CosmosDBTriggerAttribute.cs) from the `Microsoft.Azure.Functions.Worker` namespace, which defines these properties:

| Attribute property | Description |
| --- | --- |
| **ConnectionStringSetting** | The name of an app setting or setting collection that specifies how to connect to the Azure Cosmos DB account being monitored. For more information, see [Connections](#connections). |
| **DatabaseName** | The name of the Azure Cosmos DB database with the collection being monitored. |
| **CollectionName** | The name of the collection being monitored. |
| **LeaseConnectionStringSetting** | (Optional) The name of an app setting or setting collection that specifies how to connect to the Azure Cosmos DB account that holds the lease collection. <br><br> When not set, the `ConnectionStringSetting` value is used. This parameter is automatically set when the binding is created in the portal. The connection string for the leases collection must have write permissions. |
| **LeaseDatabaseName** | (Optional) The name of the database that holds the collection used to store leases. When not set, the value of the `databaseName` setting is used. |
| **LeaseCollectionName** | (Optional) The name of the collection used to store leases. When not set, the value `leases` is used. |
| **CreateLeaseCollectionIfNotExists** | (Optional) When set to `true`, the leases collection is automatically created when it doesn't already exist. The default value is `false`. |
| **LeasesCollectionThroughput** | (Optional) Defines the number of Request Units to assign when the leases collection is created. This setting is only used when `CreateLeaseCollectionIfNotExists` is set to `true`. This parameter is automatically set when the binding is created using the portal. |
| **LeaseCollectionPrefix** | (Optional) When set, the value is added as a prefix to the leases created in the Lease collection for this function. Using a prefix allows two separate Azure Functions to share the same Lease collection by using different prefixes. |
| **FeedPollDelay** | (Optional) The time (in milliseconds) for the delay between polling a partition for new changes on the feed, after all current changes are drained. Default is 5,000 milliseconds, or 5 seconds. |
| **LeaseAcquireInterval** | (Optional) When set, it defines, in milliseconds, the interval to kick off a task to compute if partitions are distributed evenly among known host instances. Default is 13000 (13 seconds). |
| **LeaseExpirationInterval** | (Optional) When set, it defines, in milliseconds, the interval for which the lease is taken on a lease representing a partition. If the lease is not renewed within this interval, it will cause it to expire and ownership of the partition will move to another instance. Default is 60000 (60 seconds). |
| **LeaseRenewInterval** | (Optional) When set, it defines, in milliseconds, the renew interval for all leases for partitions currently held by an instance. Default is 17000 (17 seconds). |
| **CheckpointInterval** | (Optional) When set, it defines, in milliseconds, the interval between lease checkpoints. Default is always after each Function call. |
| **CheckpointDocumentCount** | (Optional) Customizes the amount of documents between lease checkpoints. Default is after every function call. |
| **MaxItemsPerInvocation** | (Optional) When set, this property sets the maximum number of items received per Function call. If operations in the monitored collection are performed through stored procedures, [transaction scope](https://learn.microsoft.com/azure/cosmos-db/stored-procedures-triggers-udfs#transactions) is preserved when reading items from the change feed. As a result, the number of items received could be higher than the specified value so that the items changed by the same transaction are returned as part of one atomic batch. |
| **StartFromBeginning** | (Optional) This option tells the Trigger to read changes from the beginning of the collection's change history instead of starting at the current time. Reading from the beginning only works the first time the trigger starts, as in subsequent runs, the checkpoints are already stored. Setting this option to `true` when there are leases already created has no effect. |
| **PreferredLocations** | (Optional) Defines preferred locations (regions) for geo-replicated database accounts in the Azure Cosmos DB service. Values should be comma-separated. For example, "East US,South Central US,North Europe". |
| **UseMultipleWriteLocations** | (Optional) Enables multi-region accounts for writing to the leases collection. |
| **UseDefaultJsonSerialization** | (Optional) Lets you use `JsonConvert.DefaultSettings` in the monitored collection. This setting only applies to the monitored collection and the consumer to setup the serialization used in the monitored collection. The `JsonConvert.DefaultSettings` must be set in a class derived from `CosmosDBWebJobsStartup`. |

---


**Applies to: programming-language-python**

## Decorators

_Applies only to the Python v2 programming model._

For Python v2 functions defined by using a decorator, the `cosmos_db_trigger` (Extension 4.x) supports the following properties:

| Property | Description |
| --- | --- |
| `arg_name` | The variable name used in function code that represents the list of documents with changes. |
| `database_name` | The name of the Azure Cosmos DB database. Supports `%VAR_NAME%` syntax to reference app settings. |
| `container_name` | The name of the Azure Cosmos DB container being monitored. Supports `%VAR_NAME%` syntax. |
| `connection` | The name of an app setting or setting prefix for identity-based connections (for example, `COSMOS_CONNECTION` resolves to `COSMOS_CONNECTION__accountEndpoint`, and so on). |
| `lease_container_name` | The name of the container used to store leases. |
| `create_lease_container_if_not_exists` | When `true`, automatically creates the lease container if it doesn't exist. |

For Python functions defined by using *function.json*, see the [Configuration](#configuration) section.


**Applies to: programming-language-java**

## Annotations

# [Extension 4.x+](#tab/extensionv4)

Because of schema changes in the Azure Cosmos DB SDK, version 4.x of the Azure Cosmos DB extension requires [azure-functions-java-library V3.0.0](https://central.sonatype.com/artifact/com.microsoft.azure.functions/azure-functions-java-library/3.0.0) for Java functions. 


Use the `@CosmosDBTrigger` annotation on parameters that read data from Azure Cosmos DB. The annotation supports the following properties:

| Attribute property | Description |
| --- | --- |
| **connection** | The name of an app setting or setting collection that specifies how to connect to the Azure Cosmos DB account being monitored. For more information, see [Connections](#connections). |
| **name** | The name of the function. |
| **databaseName** | The name of the Azure Cosmos DB database with the container being monitored. |
| **containerName** | The name of the container being monitored. |
| **leaseConnectionStringSetting** | (Optional) The name of an app setting or setting collection that specifies how to connect to the Azure Cosmos DB account that holds the lease container. <br><br> When not set, the `connection` value is used. This parameter is automatically set when the binding is created in the portal. The connection string for the leases container must have write permissions. |
| **leaseDatabaseName** | (Optional) The name of the database that holds the container used to store leases. When not set, the value of the `databaseName` setting is used. |
| **leaseContainerName** | (Optional) The name of the container used to store leases. When not set, the value `leases` is used. |
| **createLeaseContainerIfNotExists** | (Optional) When set to `true`, the leases container is automatically created when it doesn't already exist. The default value is `false`. When using Microsoft Entra identities if you set the value to `true`, creating containers isn't [an allowed operation](https://learn.microsoft.com/azure/cosmos-db/troubleshoot-forbidden#nondata-operations-arent-allowed) and your function app isn't allowed to start. |
| **leasesContainerThroughput** | (Optional) Defines the number of Request Units to assign when the leases container is created. This setting is only used when `CreateLeaseContainerIfNotExists` is set to `true`. This parameter is automatically set when the binding is created using the portal. |
| **leaseContainerPrefix** | (Optional) When set, the value is added as a prefix to the leases created in the Lease container for this function. Using a prefix allows two separate Azure Functions to share the same Lease container by using different prefixes. |
| **feedPollDelay** | (Optional) The time (in milliseconds) for the delay between polling a partition for new changes on the feed, after all current changes are drained. Default is 5,000 milliseconds, or 5 seconds. |
| **leaseAcquireInterval** | (Optional) When set, it defines, in milliseconds, the interval to kick off a task to compute if partitions are distributed evenly among known host instances. Default is 13000 (13 seconds). |
| **leaseExpirationInterval** | (Optional) When set, it defines, in milliseconds, the interval for which the lease is taken on a lease representing a partition. If the lease isn't renewed within this interval, it expires and ownership of the partition moves to another instance. Default is 60000 (60 seconds). |
| **leaseRenewInterval** | (Optional) When set, it defines, in milliseconds, the renewal interval for all leases for partitions currently held by an instance. Default is 17000 (17 seconds). |
| **maxItemsPerInvocation** | (Optional) When set, this property sets the maximum number of items received per Function call. If operations in the monitored container are performed through stored procedures, [transaction scope](https://learn.microsoft.com/azure/cosmos-db/stored-procedures-triggers-udfs#transactions) is preserved when reading items from the change feed. As a result, the number of items received could be higher than the specified value so that the items changed by the same transaction are returned as part of one atomic batch. |
| **startFromBeginning** | (Optional) This option tells the Trigger to read changes from the beginning of the container's change history instead of starting at the current time. Reading from the beginning only works the first time the trigger starts, as in subsequent runs, the checkpoints are already stored. Setting this option to `true` when there are leases already created has no effect. |
| **preferredLocations** | (Optional) Defines preferred locations (regions) for geo-replicated database accounts in the Azure Cosmos DB service. Values should be comma-separated. For example, `East US,South Central US,North Europe`. |

# [Functions 2.x+](#tab/functionsv2)

From the [Java functions runtime library](https://learn.microsoft.com/java/api/overview/azure/functions/runtime), use the `@CosmosDBTrigger` annotation on parameters that read data from Azure Cosmos DB. The annotation supports the following properties:

+ [name](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.cosmosdbtrigger.name)
+ [connectionStringSetting](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.cosmosdbtrigger.connectionstringsetting)
+ [databaseName](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.cosmosdbtrigger.databasename)
+ [collectionName](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.cosmosdbtrigger.collectionname)
+ [leaseConnectionStringSetting](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.cosmosdbtrigger.leaseconnectionstringsetting)
+ [leaseDatabaseName](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.cosmosdbtrigger.leasedatabasename)
+ [leaseCollectionName](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.cosmosdbtrigger.leasecollectionname)
+ [createLeaseCollectionIfNotExists](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.cosmosdbtrigger.createleasecollectionifnotexists)
+ [leasesCollectionThroughput](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.cosmosdbtrigger.leasescollectionthroughput)
+ [leaseCollectionPrefix](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.cosmosdbtrigger.leasecollectionprefix)
+ [feedPollDelay](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.cosmosdbtrigger.feedpolldelay)
+ [leaseAcquireInterval](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.cosmosdbtrigger.leaseacquireinterval)
+ [leaseExpirationInterval](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.cosmosdbtrigger.leaseexpirationinterval)
+ [leaseRenewInterval](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.cosmosdbtrigger.leaserenewinterval)
+ [checkpointInterval](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.cosmosdbtrigger.checkpointinterval)
+ [checkpointDocumentCount](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.cosmosdbtrigger.checkpointdocumentcount)
+ [maxItemsPerInvocation](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.cosmosdbtrigger.maxitemsperinvocation)
+ [startFromBeginning](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.cosmosdbtrigger.startfrombeginning)
+ [preferredLocations](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.cosmosdbtrigger.preferredlocations)

---


**Applies to: programming-language-javascript,programming-language-typescript,programming-language-powershell,programming-language-python**

## Configuration


**Applies to: programming-language-python**

_Applies only to the Python v1 programming model._


**Applies to: programming-language-javascript,programming-language-typescript**


# [Model v4](#tab/nodejs-v4)

The following table explains the properties that you can set on the `options` object you pass to the `app.cosmosDB()` method. The `type`, `direction`, and `name` properties don't apply to the v4 model.

# [Model v3](#tab/nodejs-v3)

The following table explains the binding configuration properties that you set in the *function.json* file, where properties differ by extension version:  

---


**Applies to: programming-language-powershell,programming-language-python**


The following table explains the binding configuration properties that you set in the *function.json* file, where properties differ by extension version:  


**Applies to: programming-language-javascript,programming-language-typescript,programming-language-powershell,programming-language-python**


# [Extension 4.x+](#tab/extensionv4)

| function.json property | Description |
| --- | --- |
| **type** | Must be set to `cosmosDBTrigger`. |
| **direction** | Must be set to `in`. This parameter is set automatically when you create the trigger in the Azure portal. |
| **name** | The variable name used in function code that represents the list of documents with changes. |
| **connection** | The name of an app setting or setting collection that specifies how to connect to the Azure Cosmos DB account being monitored. For more information, see [Connections](functions-bindings-cosmosdb-v2-trigger.md#connections). |
| **databaseName** | The name of the Azure Cosmos DB database with the container being monitored. |
| **containerName** | The name of the container being monitored. |
| **leaseConnection** | (Optional) The name of an app setting or setting container that specifies how to connect to the Azure Cosmos DB account that holds the lease container. <br><br> When not set, the `connection` value is used. This parameter is automatically set when the binding is created in the portal. The connection string for the leases container must have write permissions. |
| **leaseDatabaseName** | (Optional) The name of the database that holds the container used to store leases. When not set, the value of the `databaseName` setting is used. |
| **leaseContainerName** | (Optional) The name of the container used to store leases. When not set, the value `leases` is used. |
| **createLeaseContainerIfNotExists** | (Optional) When set to `true`, the leases container is automatically created when it doesn't already exist. The default value is `false`. When using Microsoft Entra identities if you set the value to `true`, creating containers is not [an allowed operation](https://learn.microsoft.com/azure/cosmos-db/troubleshoot-forbidden#non-data-operations-are-not-allowed) and your Function won't be able to start. |
| **leasesContainerThroughput** | (Optional) Defines the number of Request Units to assign when the leases container is created. This setting is only used when `createLeaseContainerIfNotExists` is set to `true`. This parameter is automatically set when the binding is created using the portal. |
| **leaseContainerPrefix** | (Optional) When set, the value is added as a prefix to the leases created in the Lease container for this function. Using a prefix allows two separate Azure Functions to share the same Lease container by using different prefixes. |
| **feedPollDelay** | (Optional) The time (in milliseconds) for the delay between polling a partition for new changes on the feed, after all current changes are drained. Default is 5,000 milliseconds, or 5 seconds. |
| **leaseAcquireInterval** | (Optional) When set, it defines, in milliseconds, the interval to kick off a task to compute if partitions are distributed evenly among known host instances. Default is 13000 (13 seconds). |
| **leaseExpirationInterval** | (Optional) When set, it defines, in milliseconds, the interval for which the lease is taken on a lease representing a partition. If the lease is not renewed within this interval, it will cause it to expire and ownership of the partition will move to another instance. Default is 60000 (60 seconds). |
| **leaseRenewInterval** | (Optional) When set, it defines, in milliseconds, the renew interval for all leases for partitions currently held by an instance. Default is 17000 (17 seconds). |
| **maxItemsPerInvocation** | (Optional) When set, this property sets the maximum number of items received per Function call. If operations in the monitored container are performed through stored procedures, [transaction scope](https://learn.microsoft.com/azure/cosmos-db/stored-procedures-triggers-udfs#transactions) is preserved when reading items from the change feed. As a result, the number of items received could be higher than the specified value so that the items changed by the same transaction are returned as part of one atomic batch. |
| **startFromBeginning** | (Optional) This option tells the Trigger to read changes from the beginning of the container's change history instead of starting at the current time. Reading from the beginning only works the first time the trigger starts, as in subsequent runs, the checkpoints are already stored. Setting this option to `true` when there are leases already created has no effect. |
| **startFromTime** | (Optional) Gets or sets the date and time from which to initialize the change feed read operation. The recommended format is ISO 8601 with the UTC designator, such as `2021-02-16T14:19:29Z`. This is only used to set the initial trigger state. After the trigger has a lease state, changing this value has no effect. |
| **preferredLocations** | (Optional) Defines preferred locations (regions) for geo-replicated database accounts in the Azure Cosmos DB service. Values should be comma-separated. For example, "East US,South Central US,North Europe". |


# [Functions 2.x+](#tab/functionsv2)

| function.json property | Description |
| --- | --- |
| **type** | Must be set to `cosmosDBTrigger`. |
| **direction** | Must be set to `in`. This parameter is set automatically when you create the trigger in the Azure portal. |
| **name** | The variable name used in function code that represents the list of documents with changes. |
| **connectionStringSetting** | The name of an app setting or setting collection that specifies how to connect to the Azure Cosmos DB account being monitored. For more information, see [Connections](#connections). |
| **databaseName** | The name of the Azure Cosmos DB database with the collection being monitored. |
| **collectionName** | The name of the collection being monitored. |
| **leaseConnectionStringSetting** | (Optional) The name of an app setting or setting collection that specifies how to connect to the Azure Cosmos DB account that holds the lease collection. <br><br> When not set, the `connectionStringSetting` value is used. This parameter is automatically set when the binding is created in the portal. The connection string for the leases collection must have write permissions. |
| **leaseDatabaseName** | (Optional) The name of the database that holds the collection used to store leases. When not set, the value of the `databaseName` setting is used. |
| **leaseCollectionName** | (Optional) The name of the collection used to store leases. When not set, the value `leases` is used. |
| **createLeaseCollectionIfNotExists** | (Optional) When set to `true`, the leases collection is automatically created when it doesn't already exist. The default value is `false`. |
| **leasesCollectionThroughput** | (Optional) Defines the number of Request Units to assign when the leases collection is created. This setting is only used when `createLeaseCollectionIfNotExists` is set to `true`. This parameter is automatically set when the binding is created using the portal. |
| **leaseCollectionPrefix** | (Optional) When set, the value is added as a prefix to the leases created in the Lease collection for this function. Using a prefix allows two separate Azure Functions to share the same Lease collection by using different prefixes. |
| **feedPollDelay** | (Optional) The time (in milliseconds) for the delay between polling a partition for new changes on the feed, after all current changes are drained. Default is 5,000 milliseconds, or 5 seconds. |
| **leaseAcquireInterval** | (Optional) When set, it defines, in milliseconds, the interval to kick off a task to compute if partitions are distributed evenly among known host instances. Default is 13000 (13 seconds). |
| **leaseExpirationInterval** | (Optional) When set, it defines, in milliseconds, the interval for which the lease is taken on a lease representing a partition. If the lease is not renewed within this interval, it will cause it to expire and ownership of the partition will move to another instance. Default is 60000 (60 seconds). |
| **leaseRenewInterval** | (Optional) When set, it defines, in milliseconds, the renew interval for all leases for partitions currently held by an instance. Default is 17000 (17 seconds). |
| **checkpointInterval** | (Optional) When set, it defines, in milliseconds, the interval between lease checkpoints. Default is always after each Function call. |
| **checkpointDocumentCount** | (Optional) Customizes the amount of documents between lease checkpoints. Default is after every function call. |
| **maxItemsPerInvocation** | (Optional) When set, this property sets the maximum number of items received per Function call. If operations in the monitored collection are performed through stored procedures, [transaction scope](https://learn.microsoft.com/azure/cosmos-db/stored-procedures-triggers-udfs#transactions) is preserved when reading items from the change feed. As a result, the number of items received could be higher than the specified value so that the items changed by the same transaction are returned as part of one atomic batch. |
| **startFromBeginning** | (Optional) This option tells the Trigger to read changes from the beginning of the collection's change history instead of starting at the current time. Reading from the beginning only works the first time the trigger starts, as in subsequent runs, the checkpoints are already stored. Setting this option to `true` when there are leases already created has no effect. |
| **preferredLocations** | (Optional) Defines preferred locations (regions) for geo-replicated database accounts in the Azure Cosmos DB service. Values should be comma-separated. For example, "East US,South Central US,North Europe". |
| **useMultipleWriteLocations** | (Optional) Enables multi-region accounts for writing to the leases collection. |

---



For complete examples, see the [Example section](#example).

## Usage

The trigger requires a second collection that it uses to store _leases_ over the partitions. The trigger works only if both the collection you're monitoring and the collection that contains the leases are available.

**Applies to: programming-language-csharp**

>**Important:**
> If you configure multiple functions to use an Azure Cosmos DB trigger for the same collection, each function should use a dedicated lease collection or specify a different `LeaseCollectionPrefix` for each function. Otherwise, only one of the functions is triggered. For information about the prefix, see the [Attributes section](#attributes).

**Applies to: programming-language-java**

>**Important:**
> If you configure multiple functions to use an Azure Cosmos DB trigger for the same collection, each function should use a dedicated lease collection or specify a different `leaseCollectionPrefix` for each function. Otherwise, only one of the functions is triggered. For information about the prefix, see the [Annotations section](#annotations).

**Applies to: programming-language-javascript,programming-language-typescript,programming-language-powershell,programming-language-python**

>**Important:**
> If you configure multiple functions to use an Azure Cosmos DB trigger for the same collection, each function should use a dedicated lease collection or specify a different `leaseCollectionPrefix` for each function. Otherwise, only one of the functions is triggered. For information about the prefix, see the [Configuration section](#configuration).


The trigger doesn't indicate whether a document was updated or inserted. It just provides the document itself. If you need to handle updates and inserts differently, implement timestamp fields for insertion or update.

**Applies to: programming-language-csharp**


The parameter type supported by the Azure Cosmos DB trigger depends on the Functions runtime version, the extension package version, and the C# modality used.

# [Extension 4.x+](#tab/extensionv4/in-process)

See [Binding types](functions-bindings-cosmosdb-v2.md?tabs=in-process%2Cextensionv4\&pivots=programming-language-csharp#binding-types) for a list of supported types.

# [Functions 2.x+](#tab/functionsv2/in-process)

For a list of supported types, see [Binding types](functions-bindings-cosmosdb-v2.md?tabs=in-process%2Cfunctionsv2\&pivots=programming-language-csharp#binding-types).

# [Extension 4.x+](#tab/extensionv4/isolated-process)


When you want the function to process a single document, the Cosmos DB trigger can bind to the following types:

| Type | Description |
| --- | --- |
| JSON serializable types | Functions tries to deserialize the JSON data of the document from the Cosmos DB change feed into a plain-old CLR object (POCO) type. |

When you want the function to process a batch of documents, the Cosmos DB trigger can bind to the following types:

| Type | Description |
| --- | --- |
| `IEnumerable<T>`where `T` is a JSON serializable type | An enumeration of entities included in the batch. Each entry represents one document from the Cosmos DB change feed. |


# [Functions 2.x+](#tab/functionsv2/isolated-process)

For a list of supported types, see [Binding types](functions-bindings-cosmosdb-v2.md?tabs=isolated-process%2Cfunctionsv2\&pivots=programming-language-csharp#binding-types).

---




## Connections

The `connection` and `leaseConnection` properties are set to keys in application settings that return values used by the Functions runtime to connect to the Azure Cosmos DB account endpoints used by the extension. The value of these property settings depend on the type of connection: 

+ **Managed identity connection**: The `connection` property is a `<CONNECTION_NAME_PREFIX>` shared by a group of settings that together define an identity-based connection to the account. For more information, see [Define identity connections](manage-connections.md?pivots=functions-auth-identity\&tabs=bindings#define-connections).
+ **[Key Vault reference](https://learn.microsoft.com/azure/key-vault/general/overview)**: The `connection` property setting returns an Azure Key Vault reference to the location where the connection string is centrally maintained. For more information, see [Define Key Vault connections](manage-connections.md?pivots=functions-auth-keyvault\&tabs=bindings#define-connections).
+ **[App Configuration reference](../azure-app-configuration/quickstart-azure-functions-csharp.md)**: The `connection` property setting returns an Azure App Configuration reference that returns a connection string or a Key Vault reference. For more information, see [Azure App Configuration](manage-connections.md#azure-app-configuration) in the connections article. 
+ **Connection string**: The `connection` property setting returns the actual account connection string. Because the connection string contains shared secret keys, you should consider using a managed identity connection, when possible. For more information, see [Define connections](manage-connections.md?pivots=functions-auth-secret\&tabs=bindings#define-connections).

To learn more about bindings connections, see [Manage connection in Azure Functions](manage-connections.md?pivots=functions-auth-identity\&tabs=bindings). To obtain a connection string, navigate to your Azure Cosmos DB account, select **Keys**, and then copy the **PRIMARY CONNECTION STRING** or **SECONDARY CONNECTION STRING** values. These connection strings contain shared secret keys and must be kept secure. 

In earlier versions of the extension, the connection properties were named `connectionStringSetting` and `leaseConnectionStringSetting`.



## Next steps

- [Read an Azure Cosmos DB document (Input binding)](functions-bindings-cosmosdb-v2-input.md)
- [Save changes to an Azure Cosmos DB document (Output binding)](functions-bindings-cosmosdb-v2-output.md)

[version 4.x of the extension]: functions-bindings-cosmosdb-v2.md?tabs=extensionv4
