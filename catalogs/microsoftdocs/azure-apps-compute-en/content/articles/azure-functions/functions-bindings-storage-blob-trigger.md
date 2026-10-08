---
title: Azure Blob storage trigger for Azure Functions
description: Learn how to use Azure Function to run your custom code based on changes in an Azure Blob storage container. 
ms.topic: reference
ms.date: 08/28/2026
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

# Azure Blob storage trigger for Azure Functions

The Blob storage trigger starts a function when a new or updated blob is detected. The blob contents are provided as [input to the function](functions-bindings-storage-blob-input.md).

## Choose a Blob storage trigger implementation

Azure Functions provides two implementations of the Blob storage trigger:

- **Event-based Blob storage trigger:** Recommended because it has lower latency. The Flex Consumption plan supports only this implementation. You must use this implementation when the storage account has hierarchical namespace (HNS) enabled, such as an Azure Data Lake Storage Gen2 account.
- **Polling-based Blob storage trigger:** This implementation results in higher latency and doesn't officially support storage accounts that have HNS enabled, such as Azure Data Lake Storage Gen2 accounts.

For a comparison of these implementations and other ways to process blob changes, see [Working with blobs](storage-considerations.md#working-with-blobs).

For setup and configuration details, see the [Blob storage bindings overview](functions-bindings-storage-blob.md).

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
  


For a complete end-to-end example of using the Blob Storage trigger, see [Respond to blob storage events by using Azure Functions](scenario-blob-storage-events.md).

## Example

**Applies to: programming-language-csharp**



A C# function can be created by using one of the following C# modes:

* [Isolated worker model](dotnet-isolated-process-guide.md): Compiled C# function that runs in a worker process that's isolated from the runtime. Isolated worker process is required to support C# functions running on LTS and non-LTS versions .NET and the .NET Framework. Extensions for isolated worker process functions use `Microsoft.Azure.Functions.Worker.Extensions.*` namespaces.
* [In-process model](functions-dotnet-class-library.md): Compiled C# function that runs in the same process as the Functions runtime. In a variation of this model, Functions can be run using [C# scripting](functions-reference-csharp.md), which is supported primarily for C# portal editing. Extensions for in-process functions use `Microsoft.Azure.WebJobs.Extensions.*` namespaces.



> **Important:**
> [Support will end for the in-process model on November 10, 2026](https://aka.ms/azure-functions-retirements/in-process-model). We highly recommend that you [migrate your apps to the isolated worker model](https://learn.microsoft.com/azure/azure-functions/migrate-dotnet-to-isolated-model?tabs=net8) for full support.

# [Isolated worker model](#tab/isolated-process)

The following example is a [C# function](dotnet-isolated-process-guide.md) that runs in an isolated worker process and uses a blob trigger with both blob input and blob output blob bindings. The function is triggered by the creation of a blob in the *test-samples-trigger* container. It reads a text file from the *test-samples-input* container and creates a new text file in an output container based on the name of the triggered file.

[Code reference unavailable in this source snapshot: ~/azure-functions-dotnet-worker/samples/Extensions/Blob/BlobFunction.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-storage-blob-trigger.md)

# [In-process model](#tab/in-process)

The following example shows a [C# function](functions-dotnet-class-library.md) that writes a log when a blob is added or updated in the `samples-workitems` container.

```csharp
[FunctionName("BlobTriggerCSharp")]        
public static void Run([BlobTrigger("samples-workitems/{name}")] Stream myBlob, string name, ILogger log)
{
    log.LogInformation($"C# Blob trigger function Processed blob\n Name:{name} \n Size: {myBlob.Length} Bytes");
}
```

The string `{name}` in the blob trigger path `samples-workitems/{name}` creates a [binding expression](functions-bindings-expressions-patterns.md) that you can use in function code to access the file name of the triggering blob. For more information, see [Blob name patterns](#blob-name-patterns) later in this article.

For more information about the `BlobTrigger` attribute, see [Attributes](#attributes).

---


**Applies to: programming-language-java**


This function uses a byte array to write a log when a blob is added or updated in the `myblob` container.

Polling-based:

The following example uses the default polling trigger:

```java
@FunctionName("blobprocessor")
public void run(
  @BlobTrigger(name = "file",
               dataType = "binary",
               path = "myblob/{name}",
               connection = "MyStorageAccountAppSetting") byte[] content,
  @BindingName("name") String filename,
  final ExecutionContext context
) {
  context.getLogger().info("Name: " + filename + " Size: " + content.length + " bytes");
}
```

The following example uses an Event Grid trigger:

```java
@FunctionName("blobprocessor")
public void run(
  @BlobTrigger(name = "file",
               dataType = "binary",
               path = "myblob/{name}",
               source = "EventGrid",
               connection = "MyStorageAccountAppSetting") byte[] content,
  @BindingName("name") String filename,
  final ExecutionContext context
) {
  context.getLogger().info("Name: " + filename + " Size: " + content.length + " bytes");
}
```

This [SDK types example](functions-reference-java.md#sdk-types) uses `BlobClient` to access properties of the blob.

```java
@FunctionName("processBlob")
public void run(
        @BlobTrigger(
                name = "content",
                path = "images/{name}",
                connection = "AzureWebJobsStorage") BlobClient blob,
        @BindingName("name") String file,
        ExecutionContext ctx)
{
    ctx.getLogger().info("Size = " + blob.getProperties().getBlobSize());
}
```

This [SDK types example](functions-reference-java.md#sdk-types) uses `BlobContainerClient` to access info about blobs in the container that triggered the function.

```java
@FunctionName("containerOps")
public void run(
        @BlobTrigger(
                name = "content",
                path = "images/{name}",
                connection = "AzureWebJobsStorage") BlobContainerClient container,
        ExecutionContext ctx)
{
    container.listBlobs()
            .forEach(b -> ctx.getLogger().info(b.getName()));
}
```

This [SDK types example](functions-reference-java.md#sdk-types) uses `BlobClient` to get information from the input binding about the blob that triggered the execution. 

```java
@FunctionName("checkAgainstInputBlob")
public void run(
        @BlobInput(
                name = "inputBlob",
                path = "inputContainer/input.txt") BlobClient inputBlob,
        @BlobTrigger(
                name = "content",
                path = "images/{name}",
                connection = "AzureWebJobsStorage",
                dataType = "string") String triggerBlob,
        ExecutionContext ctx)
{
    ctx.getLogger().info("Size = " + inputBlob.getProperties().getBlobSize());
}
```


**Applies to: programming-language-typescript**


# [Model v4](#tab/nodejs-v4)


This example shows how to get the BlobClient from both a Storage Blob trigger and from the input binding on an HTTP trigger:

[Code reference unavailable in this source snapshot: ~/functions-node-sdk-bindings-blob/blobClientSdkBinding/src/functions/storageBlobTrigger.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-storage-blob-trigger.md)

This example shows how to get the `ContainerClient` from both a Storage Blob input binding using an HTTP trigger:

[Code reference unavailable in this source snapshot: ~/functions-node-sdk-bindings-blob/containerClientInputBinding/src/functions/listBlobs.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-storage-blob-trigger.md)

The following example shows a blob trigger [TypeScript code](functions-reference-node.md). The function writes a log when a blob is added or updated in the `samples-workitems` container.

The string `{name}` in the blob trigger path `samples-workitems/{name}` creates a [binding expression](functions-bindings-expressions-patterns.md) that you can use in function code to access the file name of the triggering blob. For more information, see [Blob name patterns](#blob-name-patterns) later in this article.

[Code reference unavailable in this source snapshot: ~/azure-functions-nodejs-v4/ts/src/functions/storageBlobTrigger1.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-storage-blob-trigger.md)

# [Model v3](#tab/nodejs-v3)

TypeScript samples are not documented for model v3.

---


**Applies to: programming-language-javascript**


# [Model v4](#tab/nodejs-v4)

The following example shows a blob trigger [JavaScript code](functions-reference-node.md). The function writes a log when a blob is added or updated in the `samples-workitems` container.

The string `{name}` in the blob trigger path `samples-workitems/{name}` creates a [binding expression](functions-bindings-expressions-patterns.md) that you can use in function code to access the file name of the triggering blob. For more information, see [Blob name patterns](#blob-name-patterns) later in this article.

[Code reference unavailable in this source snapshot: ~/azure-functions-nodejs-v4/js/src/functions/storageBlobTrigger1.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-storage-blob-trigger.md)

# [Model v3](#tab/nodejs-v3)

The following example shows a blob trigger binding in a *function.json* file and [JavaScript code](functions-reference-node.md) that uses the binding. The function writes a log when a blob is added or updated in the `samples-workitems` container.

Here's the *function.json* file:

```json
{
    "disabled": false,
    "bindings": [
        {
            "name": "myBlob",
            "type": "blobTrigger",
            "direction": "in",
            "path": "samples-workitems/{name}",
            "connection":"MyStorageAccountAppSetting"
        }
    ]
}
```

The string `{name}` in the blob trigger path `samples-workitems/{name}` creates a [binding expression](functions-bindings-expressions-patterns.md) that you can use in function code to access the file name of the triggering blob. For more information, see [Blob name patterns](#blob-name-patterns) later in this article.

For more information about *function.json* file properties, see the [Configuration](#configuration) section explains these properties.

Here's the JavaScript code:

```javascript
module.exports = async function(context) {
    context.log('Node.js Blob trigger function processed', context.bindings.myBlob);
};
```

---


**Applies to: programming-language-powershell**


The following example demonstrates how to create a function that runs when a file is added to `source` blob storage container.

The function configuration file (_function.json_) includes a binding with the `type` of `blobTrigger` and `direction` set to `in`.

```json
{
  "bindings": [
    {
      "name": "InputBlob",
      "type": "blobTrigger",
      "direction": "in",
      "path": "source/{name}",
      "connection": "MyStorageAccountConnectionString"
    }
  ]
}
```

Here's the associated code for the _run.ps1_ file.

```powershell
param([byte[]] $InputBlob, $TriggerMetadata)

Write-Host "PowerShell Blob trigger: Name: $($TriggerMetadata.Name) Size: $($InputBlob.Length) bytes"
```


**Applies to: programming-language-python**

# [v2](#tab/python-v2)

This example uses SDK types to directly access the underlying [`BlobClient`](https://learn.microsoft.com/python/api/azure-storage-blob/azure.storage.blob.blobclient) object provided by the Blob storage trigger: 

[Code reference unavailable in this source snapshot: ~/functions-python-extensions/azurefunctions-extensions-bindings-blob/samples/blob_samples_blobclient/function_app.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-storage-blob-trigger.md)

For examples of using other SDK types, see the [`ContainerClient`](https://github.com/Azure/azure-functions-python-extensions/blob/dev/azurefunctions-extensions-bindings-blob/samples/blob_samples_containerclient/function_app.py) and [`StorageStreamDownloader`](https://github.com/Azure/azure-functions-python-extensions/blob/dev/azurefunctions-extensions-bindings-blob/samples/blob_samples_storagestreamdownloader/function_app.py) samples. For a step-by-step tutorial on how to include SDK-type bindings in your function app, follow the [Python SDK Bindings for Blob Sample](https://github.com/Azure-Samples/azure-functions-blob-sdk-bindings-python).

To learn more, including what other SDK type bindings are supported, see [SDK type bindings](functions-reference-python.md#sdk-type-bindings).

This example logs the blob name and size from the incoming blob trigger.

```python
import logging
import azure.functions as func

app = func.FunctionApp()

@app.function_name(name="BlobTrigger1")
@app.blob_trigger(arg_name="myblob", 
                  path="samples-workitems/{name}",
                  connection="MyStorageAccountAppSetting")
def test_function(myblob: func.InputStream):
   logging.info(f"Python blob trigger function processed blob \n"
                f"Name: {myblob.name}\n"
                f"Blob Size: {myblob.length} bytes")
```

# [v1](#tab/python-v1)

The function writes a log when a blob is added or updated in the `samples-workitems` [container](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blobs-introduction.md#blob-storage-resources).
Here's the *function.json* file:

```json
{
    "scriptFile": "__init__.py",
    "disabled": false,
    "bindings": [
        {
            "name": "myblob",
            "type": "blobTrigger",
            "direction": "in",
            "path": "samples-workitems/{name}",
            "connection":"MyStorageAccountAppSetting"
        }
    ]
}
```

The string `{name}` in the blob trigger path `samples-workitems/{name}` creates a [binding expression](functions-bindings-expressions-patterns.md) that you can use in function code to access the file name of the triggering blob. For more information, see [Blob name patterns](#blob-name-patterns) later in this article.

For more information about *function.json* file properties, see the [Configuration](#configuration) section explains these properties.

Here's the Python code:

```python
import logging
import azure.functions as func


def main(myblob: func.InputStream):
    logging.info('Python Blob trigger function processed %s', myblob.name)
```


**Applies to: programming-language-go**


The following example shows a Blob Storage trigger function that processes uploaded blobs:

```go
package main

import (
	"context"
	"fmt"
	"io"
	"log"

	"github.com/Azure/azure-sdk-for-go/sdk/storage/azblob/blob"
	"github.com/azure/azure-functions-golang-worker/sdk"
	_ "github.com/azure/azure-functions-golang-worker/triggers/blob"
	"github.com/azure/azure-functions-golang-worker/worker"
)

func main() {
	app := sdk.FunctionApp()
	app.Blob("blobTrigger", processBlob,
		sdk.WithPath("samples-workitems/{name}"),
		sdk.WithConnection("AzureWebJobsStorage"),
	)
	worker.Start(app)
}

func processBlob(ctx context.Context, client *blob.Client) error {
	get, err := client.DownloadStream(ctx, nil)
	if err != nil {
		return fmt.Errorf("download error: %w", err)
	}
	data, _ := io.ReadAll(get.Body)
	get.Body.Close()
	log.Printf("Go Blob trigger function processed blob, %d bytes", len(data))
	return nil
}
```

> **Note:**
> The Blob trigger in Go provides an authenticated Azure SDK `*blob.Client` directly to your handler. You must add a blank import for `triggers/blob` to make the Blob trigger package available to the Go worker.



**Applies to: programming-language-csharp**

## Attributes

Both [in-process](functions-dotnet-class-library.md) and [isolated worker process](dotnet-isolated-process-guide.md) C# libraries use the [BlobAttribute](https://learn.microsoft.com/dotnet/api/microsoft.azure.webjobs.blobattribute) attribute to define the function. C# script instead uses a function.json configuration file as described in the [C# scripting guide](functions-reference-csharp.md#blob-trigger).

The attribute's constructor takes the following parameters:

| Parameter | Description |
| --- | --- |
| **BlobPath** | The path to the blob. |
| **Connection** | The name of an app setting or setting collection that specifies how to connect to Azure Blobs. See [Connections](#connections). |
| **Access** | Indicates whether you will be reading or writing. |
| **Source** | Sets the source of the triggering event. Use `BlobTriggerSource.EventGrid` for an [Event Grid-based blob trigger](functions-event-grid-blob-trigger.md), which provides lower latency. The default is `BlobTriggerSource.LogsAndContainerScan`, which uses the standard polling mechanism to detect changes in the container. |

# [Isolated worker model](#tab/isolated-process)

Here's an `BlobTrigger` attribute in a method signature:

[Code reference unavailable in this source snapshot: ~/azure-functions-dotnet-worker/samples/Extensions/Blob/BlobFunction.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-storage-blob-trigger.md)

# [In-process model](#tab/in-process)

In [C# class libraries](functions-dotnet-class-library.md), the attribute's constructor takes a path string that indicates the container to watch and optionally a [blob name pattern](#blob-name-patterns). Here's an example:

```csharp
[FunctionName("ResizeImage")]
public static void Run(
  [BlobTrigger("sample-images/{name}")] Stream image,
  [Blob("sample-images-md/{name}", FileAccess.Write)] Stream imageSmall)
{
  ....
}
```


While the attribute takes a `Connection` property, you can also use the [StorageAccountAttribute](https://github.com/Azure/azure-webjobs-sdk/blob/master/src/Microsoft.Azure.WebJobs/StorageAccountAttribute.cs) to specify a storage account connection. You can do this when you need to use a different storage account than other functions in the library. The constructor takes the name of an app setting that contains a storage connection string. The attribute can be applied at the parameter, method, or class level. The following example shows class level and method level:

```csharp
[StorageAccount("ClassLevelStorageAppSetting")]
public static class AzureFunctions
{
    [FunctionName("StorageTrigger")]
    [StorageAccount("FunctionLevelStorageAppSetting")]
    public static void Run( //...
{
    ...
}
```

The storage account to use is determined in the following order:

* The trigger or binding attribute's `Connection` property.
* The `StorageAccount` attribute applied to the same parameter as the trigger or binding attribute.
* The `StorageAccount` attribute applied to the function.
* The `StorageAccount` attribute applied to the class.
* The default storage account for the function app, which is defined in the `AzureWebJobsStorage` application setting.


---

When you're developing locally, add your application settings in the [local.settings.json file](functions-develop-local.md#local-settings-file) in the `Values` collection. 



**Applies to: programming-language-python**

## Decorators

_Applies only to the Python v2 programming model._

For Python v2 functions defined using decorators, the following properties on the `blob_trigger` decorator define the Blob Storage trigger:

| Property | Description |
| --- | --- |
| `arg_name` | Declares the parameter name in the function signature. When the function is triggered, this parameter's value has the contents of the queue message. |
| `path` | The [container](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blobs-introduction.md#blob-storage-resources) to monitor.  May be a [blob name pattern](#blob-name-patterns). |
| `connection` | The storage account connection string. |
| `source` | Sets the source of the triggering event. Use `EventGrid` for an [Event Grid-based blob trigger](functions-event-grid-blob-trigger.md), which provides lower latency. The default is `LogsAndContainerScan`, which uses the standard polling mechanism to detect changes in the container. |

For Python functions defined by using *function.json*, see the [Configuration](#configuration) section.

**Applies to: programming-language-java**

## Annotations

The `@BlobTrigger` attribute is used to give you access to the blob that triggered the function. Refer to the [trigger example](#example) for details. Use the `source` property to set the source of the triggering event. Use `EventGrid` for an [Event Grid-based blob trigger](functions-event-grid-blob-trigger.md), which provides lower latency. The default is `LogsAndContainerScan`, which uses the standard polling mechanism to detect changes in the container. |

**Applies to: programming-language-javascript,programming-language-typescript,programming-language-powershell,programming-language-python**

## Configuration


**Applies to: programming-language-python**

_Applies only to the Python v1 programming model._


**Applies to: programming-language-javascript,programming-language-typescript**


# [Model v4](#tab/nodejs-v4)

The following table explains the properties that you can set on the `options` object passed to the `app.storageBlob()` method.

| Property | Description |
| --- | --- |
| **path** | The [container](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blobs-introduction.md#blob-storage-resources) to monitor.  May be a [blob name pattern](#blob-name-patterns). |
| **connection** | The name of an app setting or setting collection that specifies how to connect to Azure Blobs. See [Connections](#connections). |
| **source** | Sets the source of the triggering event. Use `EventGrid` for an [Event Grid-based blob trigger](functions-event-grid-blob-trigger.md), which provides lower latency. The default is `LogsAndContainerScan`, which uses the standard polling mechanism to detect changes in the container. |

# [Model v3](#tab/nodejs-v3)

The following table explains the binding configuration properties that you set in the *function.json* file.

| Property | Description |
| --- | --- |
| **type** | Must be set to `blobTrigger`. This property is set automatically when you create the trigger in the Azure portal. |
| **direction** | Must be set to `in`. This property is set automatically when you create the trigger in the Azure portal. Exceptions are noted in the [usage](#usage) section. |
| **name** | The name of the variable that represents the blob in function code. |
| **path** | The [container](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blobs-introduction.md#blob-storage-resources) to monitor.  May be a [blob name pattern](#blob-name-patterns). |
| **connection** | The name of an app setting or setting collection that specifies how to connect to Azure Blobs. See [Connections](#connections). |
| **source** | Sets the source of the triggering event. Use `EventGrid` for an [Event Grid-based blob trigger](functions-event-grid-blob-trigger.md), which provides lower latency. The default is `LogsAndContainerScan`, which uses the standard polling mechanism to detect changes in the container. |

---


**Applies to: programming-language-powershell,programming-language-python**

The following table explains the binding configuration properties that you set in the *function.json* file.

| function.json property | Description |
| --- | --- |
| **type** | Must be set to `blobTrigger`. This property is set automatically when you create the trigger in the Azure portal. |
| **direction** | Must be set to `in`. This property is set automatically when you create the trigger in the Azure portal. Exceptions are noted in the [usage](#usage) section. |
| **name** | The name of the variable that represents the blob in function code. |
| **path** | The [container](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blobs-introduction.md#blob-storage-resources) to monitor.  May be a [blob name pattern](#blob-name-patterns). |
| **connection** | The name of an app setting or setting collection that specifies how to connect to Azure Blobs. See [Connections](#connections). |
| **source** | Sets the source of the triggering event. Use `EventGrid` for an [Event Grid-based blob trigger](functions-event-grid-blob-trigger.md), which provides lower latency. The default is `LogsAndContainerScan`, which uses the standard polling mechanism to detect changes in the container. |



See the [Example section](#example) for complete examples.

> **Tip:**
> For a complete working example that uses an Event Grid-based blob trigger with connection, source, and output binding configuration, see [Respond to blob storage events using Azure Functions](scenario-blob-storage-events.md).

**Applies to: programming-language-csharp**

## Metadata

The blob trigger provides several metadata properties. These properties can be used as part of binding expressions in other bindings or as parameters in your code. These values have the same semantics as the [Cloud​Blob](https://learn.microsoft.com/dotnet/api/microsoft.azure.storage.blob.cloudblob) type.

| Property | Type | Description |
| --- | --- | --- |
| `BlobTrigger` | `string` | The path to the triggering blob. |
| `Uri` | `System.Uri` | The blob's URI for the primary location. |
| `Properties` | [BlobProperties](https://learn.microsoft.com/dotnet/api/microsoft.azure.storage.blob.blobproperties) | The blob's system properties. |
| `Metadata` | `IDictionary<string,string>` | The user-defined metadata for the blob. |

The following example logs the path to the triggering blob, including the container:

```csharp
public static void Run(string myBlob, string blobTrigger, ILogger log)
{
    log.LogInformation($"Full blob path: {blobTrigger}");
} 
```

**Applies to: programming-language-javascript,programming-language-typescript**

## Metadata

The blob trigger provides several metadata properties. These properties can be used as part of binding expressions in other bindings or as parameters in your code. 

| Property | Description |
| --- | --- |
| `blobTrigger` | The path to the triggering blob. |
| `uri` | The blob's URI for the primary location. |
| `properties` | The blob's system properties. |
| `metadata` | The user-defined metadata for the blob. |

# [Model v4](#tab/nodejs-v4)

Metadata can be obtained from the `triggerMetadata` property of the supplied `context` object, as shown in the following example, which logs the path to the triggering blob (`blobTrigger`), including the container:

```javascript
context.log(`Full blob path: ${context.triggerMetadata.blobTrigger}`);
```

# [Model v3](#tab/nodejs-v3)

Metadata can be obtained from the `bindingData` property of the supplied `context` object, as shown in the following example, which logs the path to the triggering blob (`blobTrigger`), including the container:

```javascript
module.exports = async function (context, myBlob) {
    context.log("Full blob path:", context.bindingData.blobTrigger);
};
```

---


**Applies to: programming-language-powershell**

## Metadata

Metadata is available through the `$TriggerMetadata` parameter.


## Usage

**Applies to: programming-language-csharp**


The binding types supported by Blob trigger depend on the extension package version and the C# modality used in your function app.

# [Isolated worker model](#tab/isolated-process)


The blob trigger can bind to the following types:

| Type | Description |
| --- | --- |
| `string` | The blob content as a string. Use when the blob content is simple text. |
| `byte[]` | The bytes of the blob content. |
| JSON serializable types | When a blob contains JSON data, Functions tries to deserialize the JSON data into a plain-old CLR object (POCO) type. |
| [Stream]<sup>1</sup> | An input stream of the blob content. |
| [BlobClient]<sup>1</sup>,<br/>[BlockBlobClient]<sup>1</sup>,<br/>[PageBlobClient]<sup>1</sup>,<br/>[AppendBlobClient]<sup>1</sup>,<br/>[BlobBaseClient]<sup>1</sup> | A client connected to the blob. This set of types offers the most control for processing the blob and can be used to write back to the blob if the connection has sufficient permission. |

<sup>1</sup> To use these types, you need to reference [Microsoft.Azure.Functions.Worker.Extensions.Storage.Blobs 6.0.0 or later](https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.Storage.Blobs/) and the [common dependencies for SDK type bindings](dotnet-isolated-process-guide.md#sdk-types).

[Stream]: https://learn.microsoft.com/dotnet/api/system.io.stream

[BlobClient]: https://learn.microsoft.com/dotnet/api/azure.storage.blobs.blobclient
[BlockBlobClient]: https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.blockblobclient
[PageBlobClient]: https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.pageblobclient
[AppendBlobClient]: https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.appendblobclient
[BlobBaseClient]: https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.blobbaseclient


# [In-process model](#tab/in-process)

See [Binding types](functions-bindings-storage-blob.md?tabs=in-process#binding-types) for a list of supported types.

---

Binding to `string`, or `Byte[]` is only recommended when the blob size is small. This is recommended because the entire blob contents are loaded into memory. For most blobs, use a `Stream` or `BlobClient` type. For more information, see [Concurrency and memory usage](functions-bindings-storage-blob-trigger.md#memory-usage-and-concurrency).


You can also use the [StorageAccountAttribute](https://github.com/Azure/azure-webjobs-sdk/blob/master/src/Microsoft.Azure.WebJobs/StorageAccountAttribute.cs) to specify the storage account to use. You can do this when you need to use a different storage account than other functions in the library. The constructor takes the name of an app setting that contains a storage connection string. The attribute can be applied at the parameter, method, or class level. The following example shows class level and method level:

  ```csharp
  [StorageAccount("ClassLevelStorageAppSetting")]
  public static class AzureFunctions
  {
      [FunctionName("BlobTrigger")]
      [StorageAccount("FunctionLevelStorageAppSetting")]
      public static void Run( //...
  {
      ....
  }
  ```

The storage account to use is determined in the following order:

- The `BlobTrigger` attribute's `Connection` property.
- The `StorageAccount` attribute applied to the same parameter as the `BlobTrigger` attribute.
- The `StorageAccount` attribute applied to the function.
- The `StorageAccount` attribute applied to the class.
- The default storage account for the function app, which is defined in the `AzureWebJobsStorage` application setting.



**Applies to: programming-language-java**



>**Note:**  
>Support for binding to SDK types is currently in preview and limited to the Azure Blob Storage SDK. For more information, see [SDK types](functions-reference-java.md#sdk-types) in the Java reference article.  

**Applies to: programming-language-javascript,programming-language-typescript**

# [Model v4](#tab/nodejs-v4)

Access the blob data as the first argument to your function.

# [Model v3](#tab/nodejs-v3)

Access blob data using `context.bindings.<NAME>` where `<NAME>` matches the value defined in *function.json*.

---

**Applies to: programming-language-powershell**

Access the blob data via a parameter that matches the name designated by binding's name parameter in the _function.json_ file.

**Applies to: programming-language-python**

Access blob data via the parameter typed as [InputStream](https://learn.microsoft.com/python/api/azure-functions/azure.functions.inputstream). Refer to the [trigger example](#example) for details.
 
Functions also support Python SDK type bindings for Azure Blob storage, which lets you work with blob data using these underlying SDK types:

+ [`BlobClient`](https://learn.microsoft.com/python/api/azure-storage-blob/azure.storage.blob.blobclient)
+ [`ContainerClient`](https://learn.microsoft.com/python/api/azure-storage-blob/azure.storage.blob.containerclient)
+ [`StorageStreamDownloader`](https://learn.microsoft.com/python/api/azure-storage-blob/azure.storage.blob.storagestreamdownloader)

> **Note:**  
> Only synchronous SDK types are supported.

> **Important:**  
> SDK types support for Python is generally available and is only supported for the Python v2 programming model. For more information, see [SDK types in Python](functions-reference-python.md#sdk-type-bindings).




## Connections

The `connection` property is set to a key in application settings that returns a value used by the Functions runtime to connect to the storage account used by the extension. The value of the connection property setting depends on the type of connection: 

+ **Managed identity connection**: The `connection` property is a `<CONNECTION_NAME_PREFIX>` shared by a group of settings that together define an identity-based connection to the storage account. For more information, see [Define identity connections](manage-connections.md?pivots=functions-auth-identity\&tabs=bindings#define-connections).
+ **[Key Vault reference](https://learn.microsoft.com/azure/key-vault/general/overview)**: The `connection` property setting returns an Azure Key Vault reference to the location where the connection string is centrally maintained. For more information, see [Define Key Vault connections](manage-connections.md?pivots=functions-auth-keyvault\&tabs=bindings#define-connections).
+ **[App Configuration reference](../azure-app-configuration/quickstart-azure-functions-csharp.md)**: The `connection` property setting returns an Azure App Configuration reference that returns a connection string or a Key Vault reference. For more information, see [Azure App Configuration](manage-connections.md#azure-app-configuration) in the connections article. 
+ **Connection string**: The `connection` property setting returns the actual storage account connection string. Because the connection string contains shared secret keys, you should consider using a managed identity connection, when possible. For more information, see [Define connections](manage-connections.md?pivots=functions-auth-secret\&tabs=bindings#define-connections).

To learn more about bindings connections, see [Manage connection in Azure Functions](manage-connections.md?pivots=functions-auth-identity\&tabs=bindings). To obtain a connection string, follow the steps shown at [Manage storage account access keys](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-account-keys-manage.md).

When you set `connection` to a key or key prefix named `AzureWebJobsStorage` or to an empty string, the binding extension uses the default host storage account. For more information, see [Optimize storage performance](storage-considerations.md#optimize-storage-performance). 

## Blob name patterns

You can specify a blob name pattern in the `path` property in *function.json* or in the `BlobTrigger` attribute constructor. The name pattern can be a [filter or binding expression](functions-bindings-expressions-patterns.md). The following sections provide examples.

> **Tip:**
> A container name can't contain a resolver in the name pattern.

### Get file name and extension

The following example shows how to bind to the blob file name and extension separately:

```json
"path": "input/{blobname}.{blobextension}",
```

If the blob is named *original-Blob1.txt*, the values of the `blobname` and `blobextension` variables in function code are *original-Blob1* and *txt*.

### Filter on blob name

The following example triggers only on blobs in the `input` container that start with the string "original-":

```json
"path": "input/original-{name}",
```

If the blob name is *original-Blob1.txt*, the value of the `name` variable in function code is `Blob1.txt`.

### Filter on file type

The following example triggers only on *.png* files:

```json
"path": "samples/{name}.png",
```

### Filter on curly braces in file names

To look for curly braces in file names, escape the braces by using two braces. The following example filters for blobs that have curly braces in the name:

```json
"path": "images/{{20140101}}-{name}",
```

If the blob is named *{20140101}-soundfile.mp3*, the `name` variable value in the function code is *soundfile.mp3*.

## Polling and latency

Polling works as a hybrid between inspecting logs and running periodic container scans. Blobs are scanned in groups of 10,000 at a time with a continuation token used between intervals. If your function app is on the Consumption plan, there can be up to a 10-minute delay in processing new blobs if a function app has gone idle. 

> **Warning:**
> [Storage logs are created on a "best effort"](https://learn.microsoft.com/rest/api/storageservices/About-Storage-Analytics-Logging) basis. There's no guarantee that all events are captured. Under some conditions, logs may be missed. 

If you require faster or more reliable blob processing, you should consider switching your hosting to use an App Service plan with Always On enabled, which may result in increased costs. You might also consider using a trigger other than the classic polling blob trigger. For more information and a comparison of the various triggering options for blob storage containers, see [Trigger on a blob container](storage-considerations.md#trigger-on-a-blob-container).  

## Blob receipts

The Azure Functions runtime ensures that no blob trigger function gets called more than once for the same new or updated blob. To determine if a given blob version has been processed, it maintains *blob receipts*.

Azure Functions stores blob receipts in a container named *azure-webjobs-hosts* in the Azure storage account for your function app (defined by the app setting `AzureWebJobsStorage`). A blob receipt has the following information:

- The triggered function (`<FUNCTION_APP_NAME>.Functions.<FUNCTION_NAME>`, for example: `MyFunctionApp.Functions.CopyBlob`)
- The container name
- The blob type (`BlockBlob` or `PageBlob`)
- The blob name
- The ETag (a blob version identifier, for example: `0x8D1DC6E70A277EF`)

To force reprocessing of a blob, delete the blob receipt for that blob from the *azure-webjobs-hosts* container manually. While reprocessing might not occur immediately, it's guaranteed to occur at a later point in time. To reprocess immediately, the *scaninfo* blob in *azure-webjobs-hosts/blobscaninfo* can be updated. Any blobs with a last modified timestamp after the `LatestScan` property will be scanned again.

## Poison blobs

When a blob trigger function fails for a given blob, Azure Functions retries that function a total of five times by default.

If all five tries fail, Azure Functions adds a message to a Storage queue named *webjobs-blobtrigger-poison*. The maximum number of retries is configurable. The same MaxDequeueCount setting is used for poison blob handling and poison queue message handling. The queue message for poison blobs is a JSON object that contains the following properties:

- FunctionId (in the format `<FUNCTION_APP_NAME>.Functions.<FUNCTION_NAME>`)
- BlobType (`BlockBlob` or `PageBlob`)
- ContainerName
- BlobName
- ETag (a blob version identifier, for example: `0x8D1DC6E70A277EF`)

## Memory usage and concurrency 

**Applies to: programming-language-csharp**

When you bind to an [output type](#usage) that doesn't support streaming, such as `string`, or `Byte[]`, the runtime must load the entire blob into memory more than one time during processing. This can result in higher-than expected memory usage when processing blobs. When possible, use a stream-supporting type. Type support depends on the C# mode and extension version. For more information, see [Binding types](functions-bindings-storage-blob.md#binding-types).

**Applies to: programming-language-javascript,programming-language-typescript,programming-language-python,programming-language-powershell,programming-language-java**

At this time, the runtime must load the entire blob into memory more than one time during processing. This can result in higher-than expected memory usage when processing blobs. 

Memory usage can be further impacted when multiple function instances are concurrently processing blob data. If you are having memory issues using a Blob trigger, consider reducing the number of concurrent executions permitted. Reducing the concurrency can have the side effect of increasing the backlog of blobs waiting to be processed. The memory limits of your function app depend on the plan. For more information, see [Service limits](functions-scale.md#service-limits).  
 
The way that you can control the number of concurrent executions depends on the version of the Storage extension you are using.

### [Extension 5.x and higher](#tab/extensionv5)

When using version 5.0.0 of the Storage extension or a later version, you control trigger concurrency by using the `maxDegreeOfParallelism` setting in the [blobs configuration in host.json](functions-bindings-storage-blob.md#hostjson-settings). 

### [Pre-extension 5.x](#tab/extensionv4)

Because the blob trigger uses a queue internally, the maximum number of concurrent function invocations is controlled by the [queues configuration in host.json](functions-bindings-storage-queue.md#host-json). 

---

Limits apply separately to each function that uses a blob trigger.

## host.json properties

The [host.json](functions-host-json.md#blobs) file contains settings that control blob trigger behavior. See the [host.json settings](functions-bindings-storage-blob.md#hostjson-settings) section for details regarding available settings.

## Next steps

- [Respond to blob storage events using Azure Functions](scenario-blob-storage-events.md)
- [Read blob storage data when a function runs](functions-bindings-storage-blob-input.md)
- [Write blob storage data from a function](functions-bindings-storage-blob-output.md)
