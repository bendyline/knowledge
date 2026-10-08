---
title: Connect Azure Functions to Azure Storage using command line tools
description: Learn how to connect Azure Functions to an Azure Storage queue by adding an output binding to your command line project.
ms.date: 08/19/2026
ms.topic: quickstart
ms.devlang: csharp
# ms.devlang: csharp, java, javascript, powershell, python, typescript
ms.custom: devx-track-python, mode-other, devx-track-extended-java, devx-track-js, devx-track-ts
zone_pivot_groups: programming-languages-set-functions
---

# Connect Azure Functions to Azure Storage using command line tools

In this article, you integrate an Azure Storage queue with the function and storage account you created in the previous quickstart article. Completing this article incurs no extra costs beyond the few USD cents of the previous quickstart.

**Applies to: programming-language-go**

Because the Go worker doesn't currently support output bindings, you use the Azure Queue Storage SDK for Go to write data from an HTTP request to a message in the queue.

**Applies to: programming-language-csharp,programming-language-java,programming-language-javascript,programming-language-typescript,programming-language-python,programming-language-powershell**

You achieve this integration by using an *output binding* that writes data from an HTTP request to a message in the queue. To learn more about bindings, see [Azure Functions triggers and bindings concepts](functions-triggers-bindings.md).


## Configure your local environment

**Applies to: programming-language-csharp**

Before you begin, you must complete the article, [Quickstart: Create an Azure Functions project from the command line](how-to-create-function-azure-cli.md?pivots=programming-language-csharp). If you already cleaned up resources at the end of that article, go through the steps again to recreate the function app and related resources in Azure.  

**Applies to: programming-language-javascript**

Before you begin, you must complete the article, [Quickstart: Create an Azure Functions project from the command line](how-to-create-function-azure-cli.md?pivots=programming-language-javascript). If you already cleaned up resources at the end of that article, go through the steps again to recreate the function app and related resources in Azure.  

**Applies to: programming-language-java**

Before you begin, you must complete the article, [Quickstart: Create an Azure Functions project from the command line](how-to-create-function-azure-cli.md?pivots=programming-language-java). If you already cleaned up resources at the end of that article, go through the steps again to recreate the function app and related resources in Azure.  

**Applies to: programming-language-typescript**

Before you begin, you must complete the article, [Quickstart: Create an Azure Functions project from the command line](how-to-create-function-azure-cli.md?pivots=programming-language-typescript). If you already cleaned up resources at the end of that article, go through the steps again to recreate the function app and related resources in Azure.  

**Applies to: programming-language-python**

Before you begin, you must complete the article, [Quickstart: Create an Azure Functions project from the command line](how-to-create-function-azure-cli.md?pivots=programming-language-python). If you already cleaned up resources at the end of that article, go through the steps again to recreate the function app and related resources in Azure.  

**Applies to: programming-language-powershell**

Before you begin, you must complete the article, [Quickstart: Create an Azure Functions project from the command line](how-to-create-function-azure-cli.md?pivots=programming-language-powershell). If you already cleaned up resources at the end of that article, go through the steps again to recreate the function app and related resources in Azure.  

**Applies to: programming-language-go**

Before you begin, complete the article, [Quickstart: Create an Azure Functions project from the command line](how-to-create-function-azure-cli.md?pivots=programming-language-go). If you already cleaned up resources at the end of that article, go through the steps again to recreate the function app and related resources in Azure.


### Retrieve the Azure Storage connection string

>**Important:**
>This article currently shows how to connect to your Azure Storage account by using the connection string, which contains a shared secret key. Using a connection string makes it easier for you to verify data updates in the storage account. For the best security, you should instead use managed identities when connecting to your storage account. For more information, see [Manage connections](manage-connections.md?tabs=identity).

Earlier, you created an Azure Storage account for function app's use. The connection string for this account is stored securely in app settings in Azure. By downloading the setting into the *local.settings.json* file, you can use the connection to write to a Storage queue in the same account when running the function locally.

1. From the root of the project, run the following command, replacing `<APP_NAME>` with the name of your function app from the previous step. This command overwrites any existing values in the file.

    ```
    func azure functionapp fetch-app-settings <APP_NAME>
    ```

1. Open *local.settings.json* file and locate the value named `AzureWebJobsStorage`, which is the Storage account connection string. You use the name `AzureWebJobsStorage` and the connection string in other sections of this article.

> **Important:**
> Because the *local.settings.json* file contains secrets downloaded from Azure, always exclude this file from source control. The *.gitignore* file created with a local functions project excludes the file by default.

**Applies to: programming-language-csharp**

## Register binding extensions


**Applies to: programming-language-csharp**


Except for HTTP and timer triggers, bindings are implemented as extension packages. Run the following [dotnet add package](https://learn.microsoft.com/dotnet/core/tools/dotnet-add-package) command in the Terminal window to add the Storage extension package to your project.

# [Isolated process](#tab/isolated-process)
```bash
dotnet add package Microsoft.Azure.Functions.Worker.Extensions.Storage.Queues --prerelease
```
# [In-process](#tab/in-process) 
```bash
dotnet add package Microsoft.Azure.WebJobs.Extensions.Storage 
```
---
Now, you can add the storage output binding to your project.  



**Applies to: programming-language-csharp,programming-language-javascript,programming-language-typescript,programming-language-powershell,programming-language-python,programming-language-java**


## Add an output binding definition to the function

Although a function can have only one trigger, it can have multiple input and output bindings, which lets you connect to other Azure services and resources without writing custom integration code.


**Applies to: programming-language-javascript**

When using the [Node.js v4 programming model](functions-reference-node.md), binding attributes are defined directly in the *./src/functions/HttpExample.js* file. From the previous quickstart, your file already contains an HTTP binding defined by the `app.http` method. 

[Code reference unavailable in this source snapshot: ~/functions-docs-javascript/src/functions/httpTrigger.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-add-output-binding-storage-queue-cli.md)



**Applies to: programming-language-typescript**

When using the [Node.js v4 programming model](functions-reference-node.md), binding attributes are defined directly in the *./src/functions/HttpExample.js* file. From the previous quickstart, your file already contains an HTTP binding defined by the `app.http` method. 

[Code reference unavailable in this source snapshot: ~/functions-docs-javascript/functions-typescript/src/functions/httpTrigger1.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-add-output-binding-storage-queue-cli.md)




**Applies to: programming-language-powershell**


You declare these bindings in the *function.json* file in your function folder. From the previous quickstart, your *function.json* file in the *HttpExample* folder contains two bindings in the `bindings` collection:  

**Applies to: programming-language-python**

When using the [Python v2 programming model](functions-reference-python.md?pivots=python-mode-decorators), binding attributes are defined directly in the *function_app.py* file as decorators. From the previous quickstart, your *function_app.py* file already contains one decorator-based binding:

```python
import azure.functions as func
import logging

app = func.FunctionApp()

@app.function_name(name="HttpTrigger1")
@app.route(route="hello", auth_level=func.AuthLevel.ANONYMOUS)
```

The `route` decorator adds HttpTrigger and HttpOutput binding to the function, which enables your function be triggered when http requests hit the specified route. 

To write to an Azure Storage queue from this function, add the `queue_output` decorator to your function code:

```python
@app.queue_output(arg_name="msg", queue_name="outqueue", connection="AzureWebJobsStorage")
```

In the decorator, `arg_name` identifies the binding parameter referenced in your code, `queue_name` is name of the queue that the binding writes to, and `connection` is the name of an application setting that contains the connection string for the Storage account. In quickstarts you use the same storage account as the function app, which is in the `AzureWebJobsStorage` setting (from *local.settings.json* file). When the `queue_name` doesn't exist, the binding creates it on first use.

 <!--
::: zone pivot="programming-language-powershell"  
:::code language="json" source="~/functions-quickstart-templates/Functions.Templates/Templates/HttpTrigger-PowerShell/function.json" range="2-18":::
::: zone-end  -->
**Applies to: programming-language-javascript,programming-language-typescript**


To write to an Azure Storage queue:

* Add an `extraOutputs` property to the binding configuration

    ```typescript
    {
        methods: ['GET', 'POST'],
        extraOutputs: [sendToQueue], // add output binding to HTTP trigger
        authLevel: 'anonymous',
        handler: () => {}
    }
    ```

* Add a `output.storageQueue` function above the `app.http` call

    [Code reference unavailable in this source snapshot: ~/functions-docs-javascript/functions-add-output-binding-storage-queue-cli-v4-programming-model-ts/src/functions/httpTrigger1.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-add-output-binding-storage-queue-cli.md)


**Applies to: programming-language-powershell**

The second binding in the collection is named `res`. This `http` binding is an output binding (`out`) that is used to write the HTTP response.

To write to an Azure Storage queue from this function, add an `out` binding of type `queue` with the name `msg`, as shown in the code below:

[Code reference unavailable in this source snapshot: ~/functions-docs-powershell/functions-add-output-binding-storage-queue-cli/HttpExample/function.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-add-output-binding-storage-queue-cli.md)

**Applies to: programming-language-javascript,programming-language-powershell,programming-language-typescript**

For a `queue` type, you must specify the name of the queue in `queueName` and provide the *name* of the Azure Storage connection (from *local.settings.json* file) in `connection`. 



**Applies to: programming-language-csharp**


In a C# project, the bindings are defined as binding attributes on the function method. Specific definitions depend on whether your app runs in-process (C# class library) or in an isolated worker process.

# [Isolated worker model](#tab/isolated-process)

Open the *HttpExample.cs* project file and add the following `MultiResponse` class:

[Code reference unavailable in this source snapshot: ~/functions-docs-csharp/functions-add-output-binding-storage-queue-isolated/HttpExample.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-add-output-binding-storage-queue-cli.md)

The `MultiResponse` class allows you to write to a storage queue named `outqueue` and an HTTP success message. Multiple messages could be sent to the queue because the `QueueOutput` attribute is applied to a string array.

The `Connection` property sets the connection string for the storage account. In this case, you could omit `Connection` because you're already using the default storage account.

# [In-process model](#tab/in-process)


> **Important:**
> [Support will end for the in-process model on November 10, 2026](https://aka.ms/azure-functions-retirements/in-process-model). We highly recommend that you [migrate your apps to the isolated worker model](https://learn.microsoft.com/azure/azure-functions/migrate-dotnet-to-isolated-model?tabs=net8) for full support.

Open the *HttpExample.cs* project file and add the following parameter to the `Run` method definition:

[Code reference unavailable in this source snapshot: ~/functions-docs-csharp/functions-add-output-binding-storage-queue-cli/HttpExample.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-add-output-binding-storage-queue-cli.md)

The `msg` parameter is an `ICollector<T>` type, representing a collection of messages written to an output binding when the function completes. In this case, the output is a storage queue named `outqueue`. The `StorageAccountAttribute` sets the connection string for the storage account. This attribute indicates the setting that contains the storage account connection string and can be applied at the class, method, or parameter level. In this case, you could omit `StorageAccountAttribute` because you're already using the default storage account.

The Run method definition must now look like the following code:  

[Code reference unavailable in this source snapshot: ~/functions-docs-csharp/functions-add-output-binding-storage-queue-cli/HttpExample.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-add-output-binding-storage-queue-cli.md)

---
  

**Applies to: programming-language-java**

In a Java project, the bindings are defined as binding annotations on the function method. The *function.json* file is then autogenerated based on these annotations.

Browse to the location of your function code under _src/main/java_, open the *Function.java* project file, and add the following parameter to the `run` method definition:

```java
@QueueOutput(name = "msg", queueName = "outqueue", connection = "AzureWebJobsStorage") OutputBinding<String> msg
```

The `msg` parameter is an [`OutputBinding<T>`](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.outputbinding) type, which represents a collection of strings. These strings are written as messages to an output binding when the function completes. In this case, the output is a storage queue named `outqueue`. The connection string for the Storage account is set by the `connection` method. You pass the application setting that contains the Storage account connection string, rather than passing the connection string itself.

The `run` method definition must now look like the following example:  

```java
@FunctionName("HttpTrigger-Java")
public HttpResponseMessage run(
        @HttpTrigger(name = "req", methods = {HttpMethod.GET, HttpMethod.POST}, authLevel = AuthorizationLevel.FUNCTION)  
        HttpRequestMessage<Optional<String>> request, 
        @QueueOutput(name = "msg", queueName = "outqueue", connection = "AzureWebJobsStorage") 
        OutputBinding<String> msg, final ExecutionContext context) {
    ...
}
```


**Applies to: programming-language-go**

## Install the Azure Queue Storage SDK

From the root of your project, run the following command to install the current major version of the Azure Queue Storage SDK for Go:

```console
go get github.com/Azure/azure-sdk-for-go/sdk/storage/azqueue
```


**Applies to: programming-language-csharp,programming-language-java,programming-language-javascript,programming-language-typescript,programming-language-python,programming-language-powershell**

For more information on the details of bindings, see [Azure Functions triggers and bindings concepts](functions-triggers-bindings.md) and [queue output configuration](functions-bindings-storage-queue-output.md#configuration).


## Add code to use the output binding

**Applies to: programming-language-csharp,programming-language-java,programming-language-javascript,programming-language-typescript,programming-language-python,programming-language-powershell**

With the queue binding defined, you can now update your function to receive the `msg` output parameter and write messages to the queue.


**Applies to: programming-language-go**

Update your function to write messages directly to the queue by using the Azure Queue Storage SDK.


**Applies to: programming-language-python**


Update *HttpExample\\function_app.py* to match the following code, add the `msg` parameter to the function definition and `msg.set(name)` under the `if name:` statement:

[Code reference unavailable in this source snapshot: ~/functions-docs-python-v2/function_app.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-add-output-binding-storage-queue-cli.md)

The `msg` parameter is an instance of the [`azure.functions.Out class`](https://learn.microsoft.com/python/api/azure-functions/azure.functions.out). The `set` method writes a string message to the queue. In this case, it's the `name` passed to the function in the URL query string.




**Applies to: programming-language-javascript**


Add code that uses the output binding object on `context.extraOutputs` to create a queue message. Add this code before the return statement.

[Code reference unavailable in this source snapshot: ~/functions-docs-javascript/functions-add-output-binding-storage-queue-cli-v4-programming-model/src/functions/httpTrigger1.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-add-output-binding-storage-queue-cli.md)

At this point, your function could look as follows:

[Code reference unavailable in this source snapshot: ~/functions-docs-javascript/functions-add-output-binding-storage-queue-cli-v4-programming-model/src/functions/httpTrigger1.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-add-output-binding-storage-queue-cli.md)


**Applies to: programming-language-typescript**


Add code that uses the output binding object on `context.extraOutputs` to create a queue message. Add this code before the return statement.

[Code reference unavailable in this source snapshot: ~/functions-docs-javascript/functions-add-output-binding-storage-queue-cli-v4-programming-model-ts/src/functions/httpTrigger1.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-add-output-binding-storage-queue-cli.md)

At this point, your function could look as follows:

[Code reference unavailable in this source snapshot: ~/functions-docs-javascript/functions-add-output-binding-storage-queue-cli-v4-programming-model-ts/src/functions/httpTrigger1.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-add-output-binding-storage-queue-cli.md)


**Applies to: programming-language-powershell**


Add code that uses the `Push-OutputBinding` cmdlet to write text to the queue using the `msg` output binding. Add this code before you set the OK status in the `if` statement.

[Code reference unavailable in this source snapshot: ~/functions-docs-powershell/functions-add-output-binding-storage-queue-cli/HttpExample/run.ps1](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-add-output-binding-storage-queue-cli.md)

At this point, your function must look as follows:

[Code reference unavailable in this source snapshot: ~/functions-docs-powershell/functions-add-output-binding-storage-queue-cli/HttpExample/run.ps1](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-add-output-binding-storage-queue-cli.md)
  


**Applies to: programming-language-csharp**


# [Isolated worker model](#tab/isolated-process)

Replace the existing `Run` method with the following code:

[Code reference unavailable in this source snapshot: ~/functions-docs-csharp/functions-add-output-binding-storage-queue-isolated/HttpExample.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-add-output-binding-storage-queue-cli.md)

# [In-process model](#tab/in-process)


> **Important:**
> [Support will end for the in-process model on November 10, 2026](https://aka.ms/azure-functions-retirements/in-process-model). We highly recommend that you [migrate your apps to the isolated worker model](https://learn.microsoft.com/azure/azure-functions/migrate-dotnet-to-isolated-model?tabs=net8) for full support.

Add code that uses the `msg` output binding object to create a queue message. Add this code before the method returns.

[Code reference unavailable in this source snapshot: ~/functions-docs-csharp/functions-add-output-binding-storage-queue-cli/HttpExample.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-add-output-binding-storage-queue-cli.md)

At this point, your function must look as follows:

[Code reference unavailable in this source snapshot: ~/functions-docs-csharp/functions-add-output-binding-storage-queue-cli/HttpExample.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-add-output-binding-storage-queue-cli.md)

---


**Applies to: programming-language-java**

Now, you can use the new `msg` parameter to write to the output binding from your function code. Add the following line of code before the success response to add the value of `name` to the `msg` output binding.

[Code reference unavailable in this source snapshot: ~/functions-quickstart-java/functions-add-output-binding-storage-queue/src/main/java/com/function/Function.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-add-output-binding-storage-queue-cli.md)

When you use an output binding, you don't have to use the Azure Storage SDK code for authentication, getting a queue reference, or writing data. The Functions runtime and queue output binding do those tasks for you.

Your `run` method must now look like the following example:

[Code reference unavailable in this source snapshot: ~/functions-quickstart-java/functions-add-output-binding-storage-queue/src/main/java/com/function/Function.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-add-output-binding-storage-queue-cli.md)


## Update the tests

Because the archetype also creates a set of tests, you need to update these tests to handle the new `msg` parameter in the `run` method signature.  

Browse to the location of your test code under _src/test/java_, open the *Function.java* project file, and replace the line of code under `//Invoke` with the following code:

[Code reference unavailable in this source snapshot: ~/functions-quickstart-java/functions-add-output-binding-storage-queue/src/test/java/com/function/FunctionTest.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-add-output-binding-storage-queue-cli.md)



**Applies to: programming-language-go**

Replace the contents of *main.go* with the following code. This implementation reads the `AzureWebJobsStorage` connection string, creates the `outqueue` queue if it doesn't exist, and writes a message by using the Azure Queue Storage SDK:

```go
package main

import (
    "encoding/json"
    "fmt"
    "net/http"
    "os"

    "github.com/Azure/azure-sdk-for-go/sdk/storage/azqueue"
    "github.com/azure/azure-functions-golang-worker/sdk"
    "github.com/azure/azure-functions-golang-worker/worker"
)

func HTTPTriggerHandler(w http.ResponseWriter, r *http.Request) {
    name := r.URL.Query().Get("name")
    if name == "" {
        var body struct{ Name string }
        if err := json.NewDecoder(r.Body).Decode(&body); err == nil {
            name = body.Name
        }
    }
    if name == "" {
        http.Error(w, "Pass a name in the query string or request body.", http.StatusBadRequest)
        return
    }

    queueClient, err := azqueue.NewQueueClientFromConnectionString(
        os.Getenv("AzureWebJobsStorage"),
        "outqueue",
        nil,
    )
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    if _, err := queueClient.Create(r.Context(), nil); err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    message := "Name passed to the function: " + name
    if _, err := queueClient.EnqueueMessage(r.Context(), message, nil); err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    fmt.Fprintf(w, "Hello, %s!", name)
}

func main() {
    app := sdk.FunctionApp()
    app.HTTP("HttpExample", HTTPTriggerHandler,
        sdk.WithMethods("GET", "POST"),
        sdk.WithAuth("anonymous"),
    )
    worker.Start(app)
}
```


**Applies to: programming-language-csharp,programming-language-java,programming-language-javascript,programming-language-typescript,programming-language-python,programming-language-powershell**

Observe that you *don't* need to write any code for authentication, obtain a queue reference, or write data. All these integration tasks are conveniently handled in the Azure Functions runtime and queue output binding.



## Run the function locally

1. Run your function by starting the local Azure Functions runtime host from the *LocalFunctionProj* folder.

    ```console
    func start
    ```

    Toward the end of the output, the following lines must appear:

    Screenshot of terminal window output when running function locally.
    
    >**Note:**  
    > If HttpExample doesn't appear as shown above, you likely started the host from outside the root folder of the project. In that case, use **Ctrl**+**C** to stop the host, go to the project's root folder, and run the previous command again.

1. Copy the URL of your HTTP function from this output to a browser and append the query string `?name=<YOUR_NAME>`, making the full URL like `http://localhost:7071/api/HttpExample?name=Functions`. The browser should display a response message that echoes back your query string value. The terminal in which you started your project also shows log output as you make requests.

1. When you're done, press <kbd>Ctrl + C</kbd> and type `y` to stop the functions host.


## View the message in the Azure Storage queue

You can view the queue in the [Azure portal](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/queues/storage-quickstart-queues-portal.md) or in the  [Microsoft Azure Storage Explorer](https://storageexplorer.com/). You can also view the queue in the Azure CLI, as described in the following steps:

1. Open the function project's *local.setting.json* file and copy the connection string value. In a terminal or command window, run the following command to create an environment variable named `AZURE_STORAGE_CONNECTION_STRING`, and paste your specific connection string in place of `<MY_CONNECTION_STRING>`. (This environment variable means you don't need to supply the connection string to each subsequent command using the `--connection-string` argument.)

    # [bash](#tab/bash)
    
    ```bash
    export AZURE_STORAGE_CONNECTION_STRING="<MY_CONNECTION_STRING>"
    ```
    
    # [PowerShell](#tab/powershell)
    
    ```powershell
    $env:AZURE_STORAGE_CONNECTION_STRING = "<MY_CONNECTION_STRING>"
    ```
    
    # [Azure CLI](#tab/cmd)
    
    ```azurecli
    set AZURE_STORAGE_CONNECTION_STRING="<MY_CONNECTION_STRING>"
    ```
    
    ---
    
1. (Optional) Use the [`az storage queue list`](https://learn.microsoft.com/cli/azure/storage/queue#az-storage-queue-list) command to view the Storage queues in your account. The output from this command must include a queue named `outqueue`, which was created when the function wrote its first message to that queue.
    
    ```azurecli
    az storage queue list --output tsv
    ```


1. Use the [`az storage message get`](https://learn.microsoft.com/cli/azure/storage/message#az-storage-message-get) command to read the message from this queue, which should be the value you supplied when testing the function earlier. The command reads and removes the first message from the queue. 

    # [bash](#tab/bash)
    
    ```azurecli
    echo `echo $(az storage message get --queue-name outqueue -o tsv --query '[].{Message:content}') | base64 --decode`
    ```
    
    # [PowerShell](#tab/powershell)
    
    ```azurecli
    [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String($(az storage message get --queue-name outqueue -o tsv --query '[].{Message:content}')))
    ```
    
    # [Azure CLI](#tab/cmd)
    
    ```azurecli
    az storage message get --queue-name outqueue -o tsv --query [].{Message:content} > %TEMP%out.b64 && certutil -decode -f %TEMP%out.b64 %TEMP%out.txt > NUL && type %TEMP%out.txt && del %TEMP%out.b64 %TEMP%out.txt /q
    ```

    This script uses certutil to decode the base64-encoded message collection from a local temp file. If there's no output, try removing `> NUL` from the script to stop suppressing certutil output, in case there's an error.
    
    ---
    
    Because the message body is stored [base64 encoded](functions-bindings-storage-queue-trigger.md#encoding), the message must be decoded before it's displayed. After you execute `az storage message get`, the message is removed from the queue. If there was only one message in `outqueue`, you won't retrieve a message when you run this command a second time and instead get an error.


## Redeploy the project to Azure

After you verify locally that the function wrote a message to the Azure Storage queue, you can redeploy your project to update the endpoint running on Azure.

**Applies to: programming-language-go,programming-language-javascript,programming-language-typescript,programming-language-python,programming-language-powershell,programming-language-csharp**

From the root folder of your local project, use the [`func azure functionapp publish`](functions-run-local.md#project-file-deployment) command to redeploy the project. Replace `<APP_NAME>` with the name of your app.

```
func azure functionapp publish <APP_NAME>
```


**Applies to: programming-language-java**


In the local project folder, use the following Maven command to republish your project:
```
mvn azure-functions:deploy
```


## Verify in Azure

1. As in the previous quickstart, use a browser or CURL to test the redeployed function.

    # [Browser](#tab/browser)
    
    Copy the complete **Invoke URL** shown in the output of the publish command into a browser address bar, appending the query parameter `&name=Functions`. The browser should display the same output as when you ran the function locally.

    # [curl](#tab/curl)
    
    Run [`curl`](https://curl.haxx.se/) with the **Invoke URL**, appending the parameter `&name=Functions`. The output should be the same as when you ran the function locally.

    ---

1. Examine the Storage queue again, as described in the previous section, to verify that it contains the new message written to the queue.

## Clean up resources

After you finish, use the following command to delete the resource group and all its contained resources to avoid incurring further costs.

```azurecli
az group delete --name AzureFunctionsQuickstart-rg
```

## Next steps

You've updated your HTTP triggered function to write data to a Storage queue. Now you can learn more about developing Functions from the command line using Core Tools and Azure CLI:

+ [Work with Azure Functions Core Tools](functions-run-local.md)  

+ [Azure Functions triggers and bindings](functions-triggers-bindings.md)

**Applies to: programming-language-csharp**

+ [Examples of complete Function projects in C#](https://learn.microsoft.com/samples/browse/?products=azure-functions\&languages=csharp).

+ [Azure Functions C# developer reference](functions-dotnet-class-library.md)  

[previous-quickstart]: how-to-create-function-azure-cli.md?pivots=programming-language-csharp


**Applies to: programming-language-javascript**

+ [Examples of complete Function projects in JavaScript](https://learn.microsoft.com/samples/browse/?products=azure-functions\&languages=javascript).

+ [Azure Functions JavaScript developer guide](functions-reference-node.md?tabs=javascript)  

[previous-quickstart]: how-to-create-function-azure-cli.md?pivots=programming-language-javascript

**Applies to: programming-language-typescript**

+ [Examples of complete Function projects in TypeScript](https://learn.microsoft.com/samples/browse/?products=azure-functions\&languages=typescript).

+ [Azure Functions TypeScript developer guide](functions-reference-node.md?tabs=typescript)  

[previous-quickstart]: how-to-create-function-azure-cli.md?pivots=programming-language-typescript

**Applies to: programming-language-python**

+ [Examples of complete Function projects in Python](https://learn.microsoft.com/samples/browse/?products=azure-functions\&languages=python).

+ [Azure Functions Python developer guide](functions-reference-python.md)  

[previous-quickstart]: how-to-create-function-azure-cli.md?pivots=programming-language-python

**Applies to: programming-language-powershell**

+ [Examples of complete Function projects in PowerShell](https://learn.microsoft.com/samples/browse/?products=azure-functions\&languages=azurepowershell).

+ [Azure Functions PowerShell developer guide](functions-reference-powershell.md) 

[previous-quickstart]: how-to-create-function-azure-cli.md?pivots=programming-language-powershell

**Applies to: programming-language-go**

+ [Azure Functions Go developer reference](functions-reference-go.md)

+ [Azure Queue Storage SDK for Go](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/storage/azqueue)

[previous-quickstart]: how-to-create-function-azure-cli.md?pivots=programming-language-go
