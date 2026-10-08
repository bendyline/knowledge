---
title: Azure Blob storage input binding for Azure Functions
description: Learn how to read and work with blob data from Azure Blob storage containers in your function code using an input binding.
ms.topic: reference
ms.date: 05/12/2024
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

# Azure Blob storage input binding for Azure Functions

The input binding allows you to read blob storage data as input to an Azure Function.

For information on setup and configuration details, see the [overview](functions-bindings-storage-blob.md).

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

**Applies to: programming-language-go**

Go support isn't currently available for this binding.


**Applies to: programming-language-csharp**



A C# function can be created by using one of the following C# modes:

* [Isolated worker model](dotnet-isolated-process-guide.md): Compiled C# function that runs in a worker process that's isolated from the runtime. Isolated worker process is required to support C# functions running on LTS and non-LTS versions .NET and the .NET Framework. Extensions for isolated worker process functions use `Microsoft.Azure.Functions.Worker.Extensions.*` namespaces.
* [In-process model](functions-dotnet-class-library.md): Compiled C# function that runs in the same process as the Functions runtime. In a variation of this model, Functions can be run using [C# scripting](functions-reference-csharp.md), which is supported primarily for C# portal editing. Extensions for in-process functions use `Microsoft.Azure.WebJobs.Extensions.*` namespaces.



> **Important:**
> [Support will end for the in-process model on November 10, 2026](https://aka.ms/azure-functions-retirements/in-process-model). We highly recommend that you [migrate your apps to the isolated worker model](https://learn.microsoft.com/azure/azure-functions/migrate-dotnet-to-isolated-model?tabs=net8) for full support.

# [Isolated process](#tab/isolated-process)

The following example is a [C# function](dotnet-isolated-process-guide.md) that runs in an isolated worker process and uses a blob trigger with both blob input and blob output blob bindings. The creation of a blob in the *test-samples-trigger* container triggers the function. It reads a text file from the *test-samples-input* container and creates a new text file in an output container based on the name of the triggered file.

[Code reference unavailable in this source snapshot: ~/azure-functions-dotnet-worker/samples/Extensions/Blob/BlobFunction.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-storage-blob-input.md)

# [In-process](#tab/in-process)

The following example is a [C# function](functions-dotnet-class-library.md) that uses a queue trigger and an input blob binding. The queue message contains the name of the blob, and the function logs the size of the blob.

```csharp

[FunctionName("BlobInput")]
public static void Run(
    [QueueTrigger("myqueue-items")] string myQueueItem,
    [Blob("samples-workitems/{queueTrigger}", FileAccess.Read)] Stream myBlob,
    ILogger log)
{
    log.LogInformation($"BlobInput processed blob\n Name:{myQueueItem} \n Size: {myBlob.Length} bytes");
}
```

---


**Applies to: programming-language-java**


This section contains the following examples:

* [HTTP trigger: look up blob name from query string](#http-trigger-look-up-blob-name-from-query-string)
* [Queue trigger: receive blob name from queue message](#queue-trigger-receive-blob-name-from-queue-message)

#### HTTP trigger, look up blob name from query string

 The following example shows a Java function that uses the `HttpTrigger` annotation to receive a parameter containing the name of a file in a blob storage container. The `BlobInput` annotation then reads the file and passes its contents to the function as a `byte[]`.

```java
  @FunctionName("getBlobSizeHttp")
  @StorageAccount("Storage_Account_Connection_String")
  public HttpResponseMessage blobSize(
    @HttpTrigger(name = "req", 
      methods = {HttpMethod.GET}, 
      authLevel = AuthorizationLevel.ANONYMOUS) 
    HttpRequestMessage<Optional<String>> request,
    @BlobInput(
      name = "file", 
      dataType = "binary", 
      path = "samples-workitems/{Query.file}") 
    byte[] content,
    final ExecutionContext context) {
      // build HTTP response with size of requested blob
      return request.createResponseBuilder(HttpStatus.OK)
        .body("The size of \"" + request.getQueryParameters().get("file") + "\" is: " + content.length + " bytes")
        .build();
  }
```

#### Queue trigger: receive blob name from queue message

 The following example shows a Java function that uses the `QueueTrigger` annotation to receive a message containing the name of a file in a blob storage container. The `BlobInput` annotation then reads the file and passes its contents to the function as a `byte[]`.

```java
  @FunctionName("getBlobSize")
  @StorageAccount("Storage_Account_Connection_String")
  public void blobSize(
    @QueueTrigger(
      name = "filename", 
      queueName = "myqueue-items-sample") 
    String filename,
    @BlobInput(
      name = "file", 
      dataType = "binary", 
      path = "samples-workitems/{queueTrigger}") 
    byte[] content,
    final ExecutionContext context) {
      context.getLogger().info("The size of \"" + filename + "\" is: " + content.length + " bytes");
  }
```

In the [Java functions runtime library](https://learn.microsoft.com/java/api/overview/azure/functions/runtime), use the `@BlobInput` annotation on parameters whose value would come from a blob. This annotation can be used with native Java types, plain old Java objects (POJOs), or nullable values using `Optional<T>`.


**Applies to: programming-language-typescript**


# [Model v4](#tab/nodejs-v4)


This example shows how to get the BlobClient from both a Storage Blob trigger and from the input binding on an HTTP trigger:

[Code reference unavailable in this source snapshot: ~/functions-node-sdk-bindings-blob/blobClientSdkBinding/src/functions/storageBlobTrigger.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-storage-blob-input.md)

This example shows how to get the `ContainerClient` from both a Storage Blob input binding using an HTTP trigger:

[Code reference unavailable in this source snapshot: ~/functions-node-sdk-bindings-blob/containerClientInputBinding/src/functions/listBlobs.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-storage-blob-input.md)

The following example shows a queue triggered [TypeScript function](functions-reference-node.md?tabs=typescript) that makes a copy of a blob. A queue message that contains the name of the blob to copy triggers the function. The new blob is named *{originalblobname}-Copy*.

[Code reference unavailable in this source snapshot: ~/azure-functions-nodejs-v4/ts/src/functions/storageBlobInputAndOutput1.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-storage-blob-input.md)

# [Model v3](#tab/nodejs-v3)

TypeScript samples are not documented for model v3.

---


**Applies to: programming-language-javascript**


# [Model v4](#tab/nodejs-v4)

The following example shows a queue triggered [JavaScript function](functions-reference-node.md) that makes a copy of a blob. A queue message that contains the name of the blob to copy triggers the function. The new blob is named *{originalblobname}-Copy*.

[Code reference unavailable in this source snapshot: ~/azure-functions-nodejs-v4/js/src/functions/storageBlobInputAndOutput1.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-storage-blob-input.md)

# [Model v3](#tab/nodejs-v3)

The following example shows blob input and output bindings in a *function.json* file and [JavaScript code](functions-reference-node.md) that uses the bindings. The function makes a copy of a blob. A queue message that contains the name of the blob to copy triggers the function. The new blob is named *{originalblobname}-Copy*.

In the *function.json* file, the `queueTrigger` metadata property is used to specify the blob name in the `path` properties:

```json
{
  "bindings": [
    {
      "queueName": "myqueue-items",
      "connection": "MyStorageConnectionAppSetting",
      "name": "myQueueItem",
      "type": "queueTrigger",
      "direction": "in"
    },
    {
      "name": "myInputBlob",
      "type": "blob",
      "path": "samples-workitems/{queueTrigger}",
      "connection": "MyStorageConnectionAppSetting",
      "direction": "in"
    },
    {
      "name": "myOutputBlob",
      "type": "blob",
      "path": "samples-workitems/{queueTrigger}-Copy",
      "connection": "MyStorageConnectionAppSetting",
      "direction": "out"
    }
  ],
  "disabled": false
}
```

The [configuration](#configuration) section explains these properties.

Here's the JavaScript code:

```javascript
module.exports = async function(context) {
    context.log('Node.js Queue trigger function processed', context.bindings.myQueueItem);
    context.bindings.myOutputBlob = context.bindings.myInputBlob;
};
```

---


**Applies to: programming-language-powershell**


The following example shows a blob input binding, defined in the _function.json_ file, which makes the incoming blob data available to the [PowerShell](functions-reference-powershell.md) function.

Here's the json configuration:

```json
{
  "bindings": [
    {
      "name": "InputBlob",
      "type": "blobTrigger",
      "direction": "in",
      "path": "source/{name}",
      "connection": "AzureWebJobsStorage"
    }
  ]
}
```

Here's the function code:

```powershell
# Input bindings are passed in via param block.
param([byte[]] $InputBlob, $TriggerMetadata)

Write-Host "PowerShell Blob trigger: Name: $($TriggerMetadata.Name) Size: $($InputBlob.Length) bytes"
```


**Applies to: programming-language-python**

# [v2](#tab/python-v2)

This example uses SDK types to directly access the underlying `BlobClient` object provided by the Blob storage input binding: 

[Code reference unavailable in this source snapshot: ~/functions-python-extensions/azurefunctions-extensions-bindings-blob/samples/blob_samples_blobclient/function_app.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-storage-blob-input.md)

For examples of using other SDK types, see the [`ContainerClient`](https://github.com/Azure/azure-functions-python-extensions/blob/dev/azurefunctions-extensions-bindings-blob/samples/blob_samples_containerclient/function_app.py) and [`StorageStreamDownloader`](https://github.com/Azure/azure-functions-python-extensions/blob/dev/azurefunctions-extensions-bindings-blob/samples/blob_samples_storagestreamdownloader/function_app.py) samples. For a step-by-step tutorial on how to include SDK-type bindings in your function app, follow the [Python SDK Bindings for Blob Sample](https://github.com/Azure-Samples/azure-functions-blob-sdk-bindings-python).

To learn more, including what other SDK type bindings are supported, see [SDK type bindings](functions-reference-python.md#sdk-type-bindings).

The code creates a copy of a blob.

```python
import logging
import azure.functions as func

app = func.FunctionApp()

@app.function_name(name="BlobOutput1")
@app.route(route="file")
@app.blob_input(arg_name="inputblob",
                path="PATH/TO/BLOB",
                connection="CONNECTION_SETTING")
@app.blob_output(arg_name="outputblob",
                path="PATH/TO/NEW/BLOB",
                connection="CONNECTION_SETTING")
def main(req: func.HttpRequest, inputblob: str, outputblob: func.Out[str]):
    logging.info(f'Python Queue trigger function processed {len(inputblob)} bytes')
    outputblob.set(inputblob)
    return "ok"
```

# [v1](#tab/python-v1)

The function makes a copy of a blob. A queue message that contains the name of the blob to copy triggers the function. The new blob is named *{originalblobname}-Copy*.

In the *function.json* file, the `queueTrigger` metadata property is used to specify the blob name in the `path` properties:

```json
{
  "bindings": [
    {
      "queueName": "myqueue-items",
      "connection": "MyStorageConnectionAppSetting",
      "name": "queuemsg",
      "type": "queueTrigger",
      "direction": "in"
    },
    {
      "name": "inputblob",
      "type": "blob",
      "dataType": "binary",
      "path": "samples-workitems/{queueTrigger}",
      "connection": "MyStorageConnectionAppSetting",
      "direction": "in"
    },
    {
      "name": "$return",
      "type": "blob",
      "path": "samples-workitems/{queueTrigger}-Copy",
      "connection": "MyStorageConnectionAppSetting",
      "direction": "out"
    }
  ],
  "disabled": false,
  "scriptFile": "__init__.py"
}
```

The [configuration](#configuration) section explains these properties.

The `dataType` property determines which binding is used. The following values are available to support different binding strategies:

| Binding value | Default | Description | Example |
| --- | --- | --- | --- |
| `string` | N | Uses generic binding and casts the input type as a `string` | `def main(input: str)` |
| `binary` | N | Uses generic binding and casts the input blob as `bytes` Python object | `def main(input: bytes)` |

If the `dataType` property is not defined in function.json, the default value is `string`.

Here's the Python code:

```python
import logging
import azure.functions as func


# The input binding field inputblob can either be 'bytes' or 'str' depends
# on dataType in function.json, 'binary' or 'string'.
def main(queuemsg: func.QueueMessage, inputblob: bytes) -> bytes:
    logging.info(f'Python Queue trigger function processed {len(inputblob)} bytes')
    return inputblob
```

---


**Applies to: programming-language-csharp**

## Attributes

Both [in-process](functions-dotnet-class-library.md) and [isolated worker process](dotnet-isolated-process-guide.md) C# libraries use attributes to define the function. C# script instead uses a function.json configuration file as described in the [C# scripting guide](functions-reference-csharp.md#blob-input).

# [Isolated process](#tab/isolated-process)

Isolated worker process defines an input binding by using a `BlobInputAttribute` attribute, which takes the following parameters:

| Parameter | Description |
| --- | --- |
| **BlobPath** | The path to the blob. |
| **Connection** | The name of an app setting or setting collection that specifies how to connect to Azure Blobs. See [Connections](#connections). |

# [In-process](#tab/in-process)

In [C# class libraries](functions-dotnet-class-library.md), use the [BlobAttribute](https://learn.microsoft.com/dotnet/api/microsoft.azure.webjobs.blobattribute), which takes the following parameters:

| Parameter | Description |
| --- | --- |
| **BlobPath** | The path to the blob. |
| **Connection** | The name of an app setting or setting collection that specifies how to connect to Azure Blobs. See [Connections](#connections). |
| **Access** | Indicates whether you will be reading or writing. |

The following example shows how the attribute's constructor takes the path to the blob and a `FileAccess` parameter indicating read for the input binding:

```csharp
[FunctionName("BlobInput")]
public static void Run(
    [QueueTrigger("myqueue-items")] string myQueueItem,
    [Blob("samples-workitems/{queueTrigger}", FileAccess.Read)] Stream myBlob,
    ILogger log)
{
    log.LogInformation($"BlobInput processed blob\n Name:{myQueueItem} \n Size: {myBlob.Length} bytes");
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

For Python v2 functions defined using decorators, the following properties on the `blob_input` and `blob_output` decorators define the Blob Storage triggers:

| Property | Description |
| --- | --- |
| `arg_name` | The name of the variable that represents the blob in function code. |
| `path` | The path to the blob  For the `blob_input` decorator, it's the blob read. For the `blob_output` decorator, it's the output or copy of the input blob. |
| `connection` | The storage account connection string. |
| `data_type` | For dynamically typed languages, specifies the underlying data type. Possible values are `string`, `binary`, or `stream`. For more detail, refer to the [triggers and bindings concepts](functions-triggers-bindings.md?tabs=python#trigger-and-binding-definitions). |

For Python functions defined by using *function.json*, see the [Configuration](#configuration) section.


**Applies to: programming-language-java**

## Annotations

The `@BlobInput` attribute gives you access to the blob that triggered the function. If you use a byte array with the attribute, set `dataType` to `binary`. Refer to the [input example](#example) for details.


**Applies to: programming-language-javascript,programming-language-typescript,programming-language-powershell,programming-language-python**

## Configuration


**Applies to: programming-language-python**

_Applies only to the Python v1 programming model._


**Applies to: programming-language-javascript,programming-language-typescript**


# [Model v4](#tab/nodejs-v4)

The following table explains the properties that you can set on the `options` object passed to the `input.storageBlob()` method.

| Property | Description |
| --- | --- |
| **path** | The path to the blob. |
| **connection** | The name of an app setting or setting collection that specifies how to connect to Azure Blobs. See [Connections](#connections). |

# [Model v3](#tab/nodejs-v3)

The following table explains the binding configuration properties that you set in the *function.json* file.

| Property | Description |
| --- | --- |
| **type** | Must be set to `blob`. |
| **direction** | Must be set to `in`. Exceptions are noted in the [usage](#usage) section. |
| **name** | The name of the variable that represents the blob in function code. |
| **path** | The path to the blob. |
| **connection** | The name of an app setting or setting collection that specifies how to connect to Azure Blobs. See [Connections](#connections). |
| **dataType** | For dynamically typed languages, specifies the underlying data type. Possible values are `string`, `binary`, or `stream`. For more detail, refer to the [triggers and bindings concepts](functions-triggers-bindings.md?tabs=python#trigger-and-binding-definitions). |

---


**Applies to: programming-language-powershell,programming-language-python**


The following table explains the binding configuration properties that you set in the *function.json* file. 

| function.json property | Description |
| --- | --- |
| **type** | Must be set to `blob`. |
| **direction** | Must be set to `in`. Exceptions are noted in the [usage](#usage) section. |
| **name** | The name of the variable that represents the blob in function code. |
| **path** | The path to the blob. |
| **connection** | The name of an app setting or setting collection that specifies how to connect to Azure Blobs. See [Connections](#connections). |
| **dataType** | For dynamically typed languages, specifies the underlying data type. Possible values are `string`, `binary`, or `stream`. For more detail, refer to the [triggers and bindings concepts](functions-triggers-bindings.md?tabs=python#trigger-and-binding-definitions). |



See the [Example section](#example) for complete examples.

## Usage

**Applies to: programming-language-csharp**


The binding types supported by Blob input depend on the extension package version and the C# modality used in your function app. 

# [Isolated process](#tab/isolated-process)


When you want the function to process a single blob, the blob input binding can bind to the following types:

| Type | Description |
| --- | --- |
| `string` | The blob content as a string. Use when the blob content is simple text. |
| `byte[]` | The bytes of the blob content. |
| JSON serializable types | When a blob contains JSON data, Functions tries to deserialize the JSON data into a plain-old CLR object (POCO) type. |
| [Stream]<sup>1</sup> | An input stream of the blob content. |
| [BlobClient]<sup>1</sup>,<br/>[BlockBlobClient]<sup>1</sup>,<br/>[PageBlobClient]<sup>1</sup>,<br/>[AppendBlobClient]<sup>1</sup>,<br/>[BlobBaseClient]<sup>1</sup> | A client connected to the blob. This set of types offers the most control for processing the blob and can be used to write back to it if the connection has sufficient permission. |

When you want the function to process multiple blobs from a container, the blob input binding can bind to the following types:

| Type | Description |
| --- | --- |
| `T[]` or `List<T>` where `T` is one of the single blob input binding types | An array or list of multiple blobs. Each entry represents one blob from the container. You can also bind to any interfaces implemented by these types, such as `IEnumerable<T>`. |
| [BlobContainerClient]<sup>1</sup> | A client connected to the container. This type offers the most control for processing the container and can be used to write to it if the connection has sufficient permission. |

<sup>1</sup> To use these types, you need to reference [Microsoft.Azure.Functions.Worker.Extensions.Storage.Blobs 6.0.0 or later](https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.Storage.Blobs/6.0.0) and the [common dependencies for SDK type bindings](dotnet-isolated-process-guide.md#sdk-types).

[Stream]: https://learn.microsoft.com/dotnet/api/system.io.stream

[BlobClient]: https://learn.microsoft.com/dotnet/api/azure.storage.blobs.blobclient
[BlockBlobClient]: https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.blockblobclient
[PageBlobClient]: https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.pageblobclient
[AppendBlobClient]: https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.appendblobclient
[BlobBaseClient]: https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.blobbaseclient
[BlobContainerClient]: https://learn.microsoft.com/dotnet/api/azure.storage.blobs.blobcontainerclient


# [In-process](#tab/in-process)

See [Binding types](functions-bindings-storage-blob.md?tabs=in-process#binding-types) for a list of supported types.

---

Binding to `string`, or `Byte[]` is only recommended when the blob size is small, since the entire blob contents are loaded into memory. For most blobs, use a `Stream` or `BlobClient` type. For more information, see [Concurrency and memory usage](functions-bindings-storage-blob-trigger.md#memory-usage-and-concurrency).


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

The `@BlobInput` attribute gives you access to the blob that triggered the function. If you use a byte array with the attribute, set `dataType` to `binary`. Refer to the [input example](#example) for details.

**Applies to: programming-language-javascript,programming-language-typescript**


# [Model v4](#tab/nodejs-v4)

Access the blob data by using `context.extraInputs.get()`.

# [Model v3](#tab/nodejs-v3)

Access the blob data by using `context.bindings.<name>` where `<name>` is the value specified in the `name` property of *function.json*.

---

**Applies to: programming-language-powershell**

Access the blob data via a parameter that matches the name designated by binding's name parameter in the _function.json_ file.

**Applies to: programming-language-python**

Access blob data via the parameter typed as [InputStream](https://learn.microsoft.com/python/api/azure-functions/azure.functions.inputstream). Refer to the [input example](#example) for details.

Functions also supports Python SDK type bindings for Azure Blob storage, which lets you work with blob data using these underlying SDK types:

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

## Next steps

- [Run a function when blob storage data changes](functions-bindings-storage-blob-trigger.md)
- [Write blob storage data from a function](functions-bindings-storage-blob-output.md)
