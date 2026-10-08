---
title: Azure SQL output binding for Functions
description: Learn to use the Azure SQL output binding in Azure Functions.
author: JetterMcTedder
ms.topic: reference
ms.custom: build-2023, devx-track-extended-java, devx-track-js, devx-track-python, devx-track-ts
ms.date: 6/26/2024
ms.author: bspendolini
ms.reviewer: glenga
zone_pivot_groups: programming-languages-set-functions
---

# Azure SQL output binding for Azure Functions

The Azure SQL output binding lets you write to a database.

For information on setup and configuration details, see the [overview](functions-bindings-azure-sql.md).

**Applies to: programming-language-javascript,programming-language-typescript**


> **Important:**
> This article uses tabs to support multiple versions of the Node.js programming model. The v4 model is generally available and is designed to have a more flexible and intuitive experience for JavaScript and TypeScript developers. For more details about how the v4 model works, refer to the [Azure Functions Node.js developer guide](functions-reference-node.md). To learn more about the differences between v3 and v4, refer to the [migration guide](functions-node-upgrade-v4.md). 



For a complete end-to-end example of using the Azure SQL output binding, see [Respond to Azure SQL Database changes using Azure Functions](scenario-database-changes-azure-sqldb.md).

## Examples
<a id="example"></a>

**Applies to: programming-language-go**

Go support isn't currently available for this binding.


**Applies to: programming-language-csharp**



You can create a C# function by using one of the following C# modes:

* [Isolated worker model](dotnet-isolated-process-guide.md): Compiled C# function that runs in a worker process that's isolated from the runtime. An isolated worker process is required to support C# functions running on long-term support (LTS) and non-LTS versions for .NET and the .NET Framework.
* [In-process model](functions-dotnet-class-library.md): Compiled C# function that runs in the same process as the Azure Functions runtime.
* [C# script](functions-reference-csharp.md): Used primarily when you create C# functions in the Azure portal.



> **Important:**
> [Support will end for the in-process model on November 10, 2026](https://aka.ms/azure-functions-retirements/in-process-model). We highly recommend that you [migrate your apps to the isolated worker model](https://learn.microsoft.com/azure/azure-functions/migrate-dotnet-to-isolated-model?tabs=net8) for full support.

# [Isolated worker model](#tab/isolated-process)

More samples for the Azure SQL output binding are available in the [GitHub repository](https://github.com/Azure/azure-functions-sql-extension/tree/main/samples/samples-outofproc).

This section contains the following examples:

* [HTTP trigger, write one record](#http-trigger-write-one-record-c-oop)
* [HTTP trigger, write to two tables](#http-trigger-write-to-two-tables-c-oop)

The examples refer to a `ToDoItem` class and a corresponding database table:

[Code reference unavailable in this source snapshot: ~/functions-sql-todo-sample/ToDoModel.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-azure-sql-output.md)

[Code reference unavailable in this source snapshot: ~/functions-sql-todo-sample/sql/create.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-azure-sql-output.md)

To return [multiple output bindings](dotnet-isolated-process-guide.md#multiple-output-bindings) in our samples, we create a custom return type:

```cs
public static class OutputType
{
    [SqlOutput("dbo.ToDo", connectionStringSetting: "SqlConnectionString")]
    public static ToDoItem ToDoItem { get; set; }
    public static HttpResponseData HttpResponse { get; set; }
}
```

<a id="http-trigger-write-one-record-c-oop"></a>

### HTTP trigger, write one record

The following example shows a [C# function](functions-dotnet-class-library.md) that adds a record to a database, using data provided in an HTTP POST request as a JSON body. The return object is the `OutputType` class we created to handle both an HTTP response and the SQL output binding.

```cs
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Microsoft.Azure.Functions.Worker.Extensions.Sql;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace AzureSQL.ToDo
{
    public static class PostToDo
    {
        // create a new ToDoItem from body object
        // uses output binding to insert new item into ToDo table
        [FunctionName("PostToDo")]
        public static async Task<OutputType> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "PostFunction")] HttpRequestData req,
                FunctionContext executionContext)
        {
            var logger = executionContext.GetLogger("PostToDo");
            logger.LogInformation("C# HTTP trigger function processed a request.");

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            ToDoItem toDoItem = JsonConvert.DeserializeObject<ToDoItem>(requestBody);

            // generate a new id for the todo item
            toDoItem.Id = Guid.NewGuid();

            // set Url from env variable ToDoUri
            toDoItem.url = Environment.GetEnvironmentVariable("ToDoUri")+"?id="+toDoItem.Id.ToString();

            // if completed is not provided, default to false
            if (toDoItem.completed == null)
            {
                toDoItem.completed = false;
            }

            return new OutputType()
            {
                ToDoItem = toDoItem,
                HttpResponse = req.CreateResponse(System.Net.HttpStatusCode.Created)
            }
        }
    }

    public static class OutputType
    {
        [SqlOutput("dbo.ToDo", connectionStringSetting: "SqlConnectionString")]
        public ToDoItem ToDoItem { get; set; }

        public HttpResponseData HttpResponse { get; set; }
    }
}
```

<a id="http-trigger-write-to-two-tables-c-oop"></a>

### HTTP trigger, write to two tables

The following example shows a [C# function](functions-dotnet-class-library.md) that adds records to a database in two different tables (`dbo.ToDo` and `dbo.RequestLog`), using data provided in an HTTP POST request as a JSON body and multiple output bindings.

```sql
CREATE TABLE dbo.RequestLog (
    Id int identity(1,1) primary key,
    RequestTimeStamp datetime2 not null,
    ItemCount int not null
)
```

To use an extra output binding, we add a class for `RequestLog` and  modify our `OutputType` class:

```cs
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Microsoft.Azure.Functions.Worker.Extensions.Sql;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace AzureSQL.ToDo
{
    public static class PostToDo
    {
        // create a new ToDoItem from body object
        // uses output binding to insert new item into ToDo table
        [FunctionName("PostToDo")]
        public static async Task<OutputType> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "PostFunction")] HttpRequestData req,
                FunctionContext executionContext)
        {
            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            ToDoItem toDoItem = JsonConvert.DeserializeObject<ToDoItem>(requestBody);

            // generate a new id for the todo item
            toDoItem.Id = Guid.NewGuid();

            // set Url from env variable ToDoUri
            toDoItem.url = Environment.GetEnvironmentVariable("ToDoUri")+"?id="+toDoItem.Id.ToString();

            // if completed is not provided, default to false
            if (toDoItem.completed == null)
            {
                toDoItem.completed = false;
            }

            requestLog = new RequestLog();
            requestLog.RequestTimeStamp = DateTime.Now;
            requestLog.ItemCount = 1;

            return new OutputType()
            {
                ToDoItem = toDoItem,
                RequestLog = requestLog,
                HttpResponse = req.CreateResponse(System.Net.HttpStatusCode.Created)
            }
        }
    }

    public class RequestLog {
        public DateTime RequestTimeStamp { get; set; }
        public int ItemCount { get; set; }
    }
    
    public static class OutputType
    {
        [SqlOutput("dbo.ToDo", connectionStringSetting: "SqlConnectionString")]
        public ToDoItem ToDoItem { get; set; }

        [SqlOutput("dbo.RequestLog", connectionStringSetting: "SqlConnectionString")]
        public RequestLog RequestLog { get; set; }

        public HttpResponseData HttpResponse { get; set; }
    }

}
```

# [In-process model](#tab/in-process)

More samples for the Azure SQL output binding are available in the [GitHub repository](https://github.com/Azure/azure-functions-sql-extension/tree/main/samples/samples-csharp).

This section contains the following examples:

* [HTTP trigger, write one record](#http-trigger-write-one-record-c)
* [HTTP trigger, write to two tables](#http-trigger-write-to-two-tables-c)
* [HTTP trigger, write records using IAsyncCollector](#http-trigger-write-records-using-iasynccollector-c)

The examples refer to a `ToDoItem` class and a corresponding database table:

[Code reference unavailable in this source snapshot: ~/functions-sql-todo-sample/ToDoModel.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-azure-sql-output.md)

[Code reference unavailable in this source snapshot: ~/functions-sql-todo-sample/sql/create.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-azure-sql-output.md)


<a id="http-trigger-write-one-record-c"></a>

### HTTP trigger, write one record

The following example shows a [C# function](functions-dotnet-class-library.md) that adds a record to a database, using data provided in an HTTP POST request as a JSON body.

[Code reference unavailable in this source snapshot: ~/functions-sql-todo-sample/PostToDo.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-azure-sql-output.md)

<a id="http-trigger-write-to-two-tables-c"></a>

### HTTP trigger, write to two tables

The following example shows a [C# function](functions-dotnet-class-library.md) that adds records to a database in two different tables (`dbo.ToDo` and `dbo.RequestLog`), using data provided in an HTTP POST request as a JSON body and multiple output bindings.

```sql
CREATE TABLE dbo.RequestLog (
    Id int identity(1,1) primary key,
    RequestTimeStamp datetime2 not null,
    ItemCount int not null
)
```


```cs
namespace AzureSQL.ToDo
{
    public static class PostToDo
    {
        // create a new ToDoItem from body object
        // uses output binding to insert new item into ToDo table
        [FunctionName("PostToDo")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "PostFunction")] HttpRequest req,
            ILogger log,
            [Sql(commandText: "dbo.ToDo", connectionStringSetting: "SqlConnectionString")] IAsyncCollector<ToDoItem> toDoItems,
            [Sql(commandText: "dbo.RequestLog", connectionStringSetting: "SqlConnectionString")] IAsyncCollector<RequestLog> requestLogs)
        {
            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            ToDoItem toDoItem = JsonConvert.DeserializeObject<ToDoItem>(requestBody);

            // generate a new id for the todo item
            toDoItem.Id = Guid.NewGuid();

            // set Url from env variable ToDoUri
            toDoItem.url = Environment.GetEnvironmentVariable("ToDoUri")+"?id="+toDoItem.Id.ToString();

            // if completed is not provided, default to false
            if (toDoItem.completed == null)
            {
                toDoItem.completed = false;
            }

            await toDoItems.AddAsync(toDoItem);
            await toDoItems.FlushAsync();
            List<ToDoItem> toDoItemList = new List<ToDoItem> { toDoItem };

            requestLog = new RequestLog();
            requestLog.RequestTimeStamp = DateTime.Now;
            requestLog.ItemCount = 1;
            await requestLogs.AddAsync(requestLog);
            await requestLogs.FlushAsync();

            return new OkObjectResult(toDoItemList);
        }
    }

    public class RequestLog {
        public DateTime RequestTimeStamp { get; set; }
        public int ItemCount { get; set; }
    }
}
```

<a id="http-trigger-write-records-using-iasynccollector-c"></a>

### HTTP trigger, write records using IAsyncCollector

The following example shows a [C# function](functions-dotnet-class-library.md) that adds a collection of records to a database, using data provided in an HTTP POST body JSON array.

```cs
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Newtonsoft.Json;
using System.IO;
using System.Threading.Tasks;

namespace AzureSQLSamples
{
    public static class WriteRecordsAsync
    {
        [FunctionName("WriteRecordsAsync")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "addtodo-asynccollector")]
            HttpRequest req,
            [Sql(commandText: "dbo.ToDo", connectionStringSetting: "SqlConnectionString")] IAsyncCollector<ToDoItem> newItems)
        {
            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            var incomingItems = JsonConvert.DeserializeObject<ToDoItem[]>(requestBody);
            foreach (ToDoItem newItem in incomingItems)
            {
                await newItems.AddAsync(newItem);
            }
            // Rows are upserted here
            await newItems.FlushAsync();

            return new CreatedResult($"/api/addtodo-asynccollector", "done");
        }
    }
}
```

---



**Applies to: programming-language-java**


More samples for the Azure SQL output binding are available in the [GitHub repository](https://github.com/Azure/azure-functions-sql-extension/tree/main/samples/samples-java).

This section contains the following examples:

* [HTTP trigger, write a record to a table](#http-trigger-write-record-to-table-java)
* [HTTP trigger, write to two tables](#http-trigger-write-to-two-tables-java)

The examples refer to a `ToDoItem` class (in a separate file `ToDoItem.java`) and a corresponding database table:

```java
package com.function;
import java.util.UUID;

public class ToDoItem {
    public UUID Id;
    public int order;
    public String title;
    public String url;
    public boolean completed;

    public ToDoItem() {
    }

    public ToDoItem(UUID Id, int order, String title, String url, boolean completed) {
        this.Id = Id;
        this.order = order;
        this.title = title;
        this.url = url;
        this.completed = completed;
    }
}
```

[Code reference unavailable in this source snapshot: ~/functions-sql-todo-sample/sql/create.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-azure-sql-output.md)

<a id="http-trigger-write-record-to-table-java"></a>
### HTTP trigger, write a record to a table

The following example shows a SQL output binding in a Java function that adds a record to a table, using data provided in an HTTP POST request as a JSON body. The function takes another dependency on the [com.google.code.gson](https://github.com/google/gson) library to parse the JSON body.

```xml
<dependency>
    <groupId>com.google.code.gson</groupId>
    <artifactId>gson</artifactId>
    <version>2.10.1</version>
</dependency>
```

```java
package com.function;

import java.util.*;
import com.microsoft.azure.functions.annotation.*;
import com.microsoft.azure.functions.*;
import com.microsoft.azure.functions.sql.annotation.SQLOutput;
import com.google.gson.Gson;

import java.util.Optional;

public class PostToDo {
    @FunctionName("PostToDo")
    public HttpResponseMessage run(
            @HttpTrigger(name = "req", methods = {HttpMethod.POST}, authLevel = AuthorizationLevel.ANONYMOUS) HttpRequestMessage<Optional<String>> request,
            @SQLOutput(
                name = "toDoItem",
                commandText = "dbo.ToDo",
                connectionStringSetting = "SqlConnectionString")
                OutputBinding<ToDoItem> output) {
        String json = request.getBody().get();
        Gson gson = new Gson();
        ToDoItem newToDo = gson.fromJson(json, ToDoItem.class);

        newToDo.Id = UUID.randomUUID();
        output.setValue(newToDo);

        return request.createResponseBuilder(HttpStatus.CREATED).header("Content-Type", "application/json").body(output).build();
    }
}
```

<a id="http-trigger-write-to-two-tables-java"></a>
### HTTP trigger, write to two tables

The following example shows a SQL output binding in a JavaS function that adds records to a database in two different tables (`dbo.ToDo` and `dbo.RequestLog`), using data provided in an HTTP POST request as a JSON body and multiple output bindings. The function takes another dependency on the [com.google.code.gson](https://github.com/google/gson) library to parse the JSON body.

```xml
<dependency>
    <groupId>com.google.code.gson</groupId>
    <artifactId>gson</artifactId>
    <version>2.10.1</version>
</dependency>
```

The second table, `dbo.RequestLog`, corresponds to the following definition:

```sql
CREATE TABLE dbo.RequestLog (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    RequestTimeStamp DATETIME2 NOT NULL DEFAULT(GETDATE()),
    ItemCount INT NOT NULL
)
```

and Java class in `RequestLog.java`:

```java
package com.function;

import java.util.Date;

public class RequestLog {
    public int Id;
    public Date RequestTimeStamp;
    public int ItemCount;

    public RequestLog() {
    }

    public RequestLog(int Id, Date RequestTimeStamp, int ItemCount) {
        this.Id = Id;
        this.RequestTimeStamp = RequestTimeStamp;
        this.ItemCount = ItemCount;
    }
}
```


```java
package com.function;

import java.util.*;
import com.microsoft.azure.functions.annotation.*;
import com.microsoft.azure.functions.*;
import com.microsoft.azure.functions.sql.annotation.SQLOutput;
import com.google.gson.Gson;

import java.util.Optional;

public class PostToDoWithLog {
    @FunctionName("PostToDoWithLog")
    public HttpResponseMessage run(
            @HttpTrigger(name = "req", methods = {HttpMethod.POST}, authLevel = AuthorizationLevel.ANONYMOUS) HttpRequestMessage<Optional<String>> request,
            @SQLOutput(
                name = "toDoItem",
                commandText = "dbo.ToDo",
                connectionStringSetting = "SqlConnectionString")
                OutputBinding<ToDoItem> output,
            @SQLOutput(
                name = "requestLog",
                commandText = "dbo.RequestLog",
                connectionStringSetting = "SqlConnectionString")
                OutputBinding<RequestLog> outputLog,
            final ExecutionContext context) {
        context.getLogger().info("Java HTTP trigger processed a request.");

        String json = request.getBody().get();
        Gson gson = new Gson();
        ToDoItem newToDo = gson.fromJson(json, ToDoItem.class);
        newToDo.Id = UUID.randomUUID();
        output.setValue(newToDo);

        RequestLog newLog = new RequestLog();
        newLog.ItemCount = 1;
        outputLog.setValue(newLog);

        return request.createResponseBuilder(HttpStatus.CREATED).header("Content-Type", "application/json").body(output).build();
    }
}
```



**Applies to: programming-language-javascript,programming-language-typescript**


More samples for the Azure SQL output binding are available in the [GitHub repository](https://github.com/Azure/azure-functions-sql-extension/tree/main/samples/samples-js).

This section contains the following examples:

* [HTTP trigger, write records to a table](#http-trigger-write-records-to-table-javascript)
* [HTTP trigger, write to two tables](#http-trigger-write-to-two-tables-javascript)

The examples refer to a database table:

[Code reference unavailable in this source snapshot: ~/functions-sql-todo-sample/sql/create.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-azure-sql-output.md)

<a id="http-trigger-write-records-to-table-javascript"></a>
### HTTP trigger, write records to a table

The following example shows a SQL output binding that adds records to a table, using data provided in an HTTP POST request as a JSON body.


**Applies to: programming-language-typescript**


# [Model v4](#tab/nodejs-v4)
<!--
:::code language="typescript" source="~/azure-functions-nodejs-v4/ts/src/functions/sqlOutput1.ts" :::
-->
# [Model v3](#tab/nodejs-v3)

TypeScript samples aren't documented for model v3.

---


**Applies to: programming-language-javascript**


# [Model v4](#tab/nodejs-v4)
<!--
:::code language="javascript" source="~/azure-functions-nodejs-v4/js/src/functions/sqlOutput1.js" :::
-->
# [Model v3](#tab/nodejs-v3)

The following is binding data in the function.json file:

```json
{
    "authLevel": "anonymous",
    "type": "httpTrigger",
    "direction": "in",
    "name": "req",
    "methods": [
        "post"
    ]
},
{
    "type": "http",
    "direction": "out",
    "name": "res"
},
{
    "name": "todoItems",
    "type": "sql",
    "direction": "out",
    "commandText": "dbo.ToDo",
    "connectionStringSetting": "SqlConnectionString"
}
```

The [configuration](#configuration) section explains these properties.

The following is sample JavaScript code:

```javascript
module.exports = async function (context, req) {
    context.log('HTTP trigger and SQL output binding function processed a request.');

    context.bindings.todoItems = req.body;
    context.res = {
        status: 201
    }
}
```
---


**Applies to: programming-language-javascript,programming-language-typescript**


<a id="http-trigger-write-to-two-tables-javascript"></a>
### HTTP trigger, write to two tables

The following example shows a SQL output binding that adds records to a database in two different tables (`dbo.ToDo` and `dbo.RequestLog`), using data provided in an HTTP POST request as a JSON body and multiple output bindings.

The second table, `dbo.RequestLog`, corresponds to the following definition:

```sql
CREATE TABLE dbo.RequestLog (
    Id int identity(1,1) primary key,
    RequestTimeStamp datetime2 not null,
    ItemCount int not null
)
```


**Applies to: programming-language-typescript**


# [Model v4](#tab/nodejs-v4)
<!--
:::code language="typescript" source="~/azure-functions-nodejs-v4/ts/src/functions/sqlOutput2.ts" :::
-->
# [Model v3](#tab/nodejs-v3)

TypeScript samples aren't documented for model v3.

---


**Applies to: programming-language-javascript**


# [Model v4](#tab/nodejs-v4)
<!--
:::code language="javascript" source="~/azure-functions-nodejs-v4/js/src/functions/sqlOutput2.js" :::
-->
# [Model v3](#tab/nodejs-v3)

The following is binding data in the function.json file:

```json
{
    "authLevel": "anonymous",
    "type": "httpTrigger",
    "direction": "in",
    "name": "req",
    "methods": [
        "post"
    ]
},
{
    "type": "http",
    "direction": "out",
    "name": "res"
},
{
    "name": "todoItems",
    "type": "sql",
    "direction": "out",
    "commandText": "dbo.ToDo",
    "connectionStringSetting": "SqlConnectionString"
},
{
    "name": "requestLog",
    "type": "sql",
    "direction": "out",
    "commandText": "dbo.RequestLog",
    "connectionStringSetting": "SqlConnectionString"
}
```

The [configuration](#configuration) section explains these properties.

The following is sample JavaScript code:

```javascript
module.exports = async function (context, req) {
    context.log('HTTP trigger and SQL output binding function processed a request.');

    const newLog = {
        RequestTimeStamp: Date.now(),
        ItemCount: 1
    };
    context.bindings.requestLog = newLog;

    context.bindings.todoItems = req.body;
    context.res = {
        status: 201
    }
}
```

---


**Applies to: programming-language-powershell**


More samples for the Azure SQL output binding are available in the [GitHub repository](https://github.com/Azure/azure-functions-sql-extension/tree/main/samples/samples-powershell).

This section contains the following examples:

* [HTTP trigger, write records to a table](#http-trigger-write-records-to-table-powershell)
* [HTTP trigger, write to two tables](#http-trigger-write-to-two-tables-powershell)

The examples refer to a database table:

[Code reference unavailable in this source snapshot: ~/functions-sql-todo-sample/sql/create.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-azure-sql-output.md)


<a id="http-trigger-write-records-to-table-powershell"></a>
### HTTP trigger, write records to a table

The following example shows a SQL output binding in a function.json file and a PowerShell function that adds records to a table, using data provided in an HTTP POST request as a JSON body.

The following is binding data in the function.json file:

```json
{
    "authLevel": "anonymous",
    "type": "httpTrigger",
    "direction": "in",
    "name": "req",
    "methods": [
        "post"
    ]
},
{
    "type": "http",
    "direction": "out",
    "name": "res"
},
{
    "name": "todoItems",
    "type": "sql",
    "direction": "out",
    "commandText": "dbo.ToDo",
    "connectionStringSetting": "SqlConnectionString"
}
```

The [configuration](#configuration) section explains these properties.

The following is sample PowerShell code for the function in the `run.ps1` file:

```powershell

```powershell
using namespace System.Net

param($Request)

Write-Host "PowerShell function with SQL Output Binding processed a request."

# Update req_body with the body of the request
$req_body = $Request.Body

# Assign the value we want to pass to the SQL Output binding. 
# The -Name value corresponds to the name property in the function.json for the binding
Push-OutputBinding -Name todoItems -Value $req_body

Push-OutputBinding -Name res -Value ([HttpResponseContext]@{
    StatusCode = [HttpStatusCode]::OK
    Body = $req_body
})
```

<a id="http-trigger-write-to-two-tables-powershell"></a>
### HTTP trigger, write to two tables

The following example shows a SQL output binding in a function.json file and a PowerShell function that adds records to a database in two different tables (`dbo.ToDo` and `dbo.RequestLog`), using data provided in an HTTP POST request as a JSON body and multiple output bindings.

The second table, `dbo.RequestLog`, corresponds to the following definition:

```sql
CREATE TABLE dbo.RequestLog (
    Id int identity(1,1) primary key,
    RequestTimeStamp datetime2 not null,
    ItemCount int not null
)
```

The following is binding data in the function.json file:

```json
{
    "authLevel": "anonymous",
    "type": "httpTrigger",
    "direction": "in",
    "name": "req",
    "methods": [
        "post"
    ]
},
{
    "type": "http",
    "direction": "out",
    "name": "res"
},
{
    "name": "todoItems",
    "type": "sql",
    "direction": "out",
    "commandText": "dbo.ToDo",
    "connectionStringSetting": "SqlConnectionString"
},
{
    "name": "requestLog",
    "type": "sql",
    "direction": "out",
    "commandText": "dbo.RequestLog",
    "connectionStringSetting": "SqlConnectionString"
}
```

The [configuration](#configuration) section explains these properties.

The following is sample PowerShell code for the function in the `run.ps1` file:

```powershell
using namespace System.Net

param($Request)

Write-Host "PowerShell function with SQL Output Binding processed a request."

# Update req_body with the body of the request
$req_body = $Request.Body
$new_log = @{
    RequestTimeStamp = [DateTime]::Now
    ItemCount = 1
}

Push-OutputBinding -Name todoItems -Value $req_body
Push-OutputBinding -Name requestLog -Value $new_log

Push-OutputBinding -Name res -Value ([HttpResponseContext]@{
    StatusCode = [HttpStatusCode]::OK
    Body = $req_body
})
```





**Applies to: programming-language-python**


More samples for the Azure SQL output binding are available in the [GitHub repository](https://github.com/Azure/azure-functions-sql-extension/tree/main/samples/samples-python).

This section contains the following examples:

* [HTTP trigger, write records to a table](#http-trigger-write-records-to-table-python)
* [HTTP trigger, write to two tables](#http-trigger-write-to-two-tables-python)

The examples refer to a database table:

[Code reference unavailable in this source snapshot: ~/functions-sql-todo-sample/sql/create.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-azure-sql-output.md)


<a id="http-trigger-write-records-to-table-python"></a>
### HTTP trigger, write records to a table

The following example shows a SQL output binding in a function.json file and a Python function that adds records to a table, using data provided in an HTTP POST request as a JSON body.

# [v2](#tab/python-v2)

The following is sample python code for the function_app.py file:

```python
import json
import logging
import azure.functions as func

app = func.FunctionApp()

@app.function_name(name="AddToDo")
@app.route(route="addtodo")
@app.sql_output(arg_name="todo",
                        command_text="[dbo].[ToDo]",
                        connection_string_setting="SqlConnectionString")
def add_todo(req: func.HttpRequest, todo: func.Out[func.SqlRow]) -> func.HttpResponse:
    body = json.loads(req.get_body())
    row = func.SqlRow.from_dict(body)
    todo.set(row)

    return func.HttpResponse(
        body=req.get_body(),
        status_code=201,
        mimetype="application/json"
    )
```

# [v1](#tab/python-v1)

The following is binding data in the function.json file:

```json
{
    "authLevel": "anonymous",
    "type": "httpTrigger",
    "direction": "in",
    "name": "req",
    "methods": [
        "post"
    ]
},
{
    "type": "http",
    "direction": "out",
    "name": "$return"
},
{
    "name": "todoItems",
    "type": "sql",
    "direction": "out",
    "commandText": "dbo.ToDo",
    "connectionStringSetting": "SqlConnectionString"
}
```

The [configuration](#configuration) section explains these properties.

The following is sample Python code:

```python
import logging
import azure.functions as func


def main(req: func.HttpRequest, todoItems: func.Out[func.SqlRow]) -> func.HttpResponse:
    logging.info('Python HTTP trigger and SQL output binding function processed a request.')

    try:
        req_body = req.get_json()
        rows = func.SqlRowList(map(lambda r: func.SqlRow.from_dict(r), req_body))
    except ValueError:
        pass

    if req_body:
        todoItems.set(rows)
        return func.HttpResponse(
            todoItems.to_json(),
            status_code=201,
            mimetype="application/json"
        )
    else:
        return func.HttpResponse(
            "Error accessing request body",
            status_code=400
        )
```

---

<a id="http-trigger-write-to-two-tables-python"></a>
### HTTP trigger, write to two tables

The following example shows a SQL output binding in a function.json file and a Python function that adds records to a database in two different tables (`dbo.ToDo` and `dbo.RequestLog`), using data provided in an HTTP POST request as a JSON body and multiple output bindings.

The second table, `dbo.RequestLog`, corresponds to the following definition:

```sql
CREATE TABLE dbo.RequestLog (
    Id int identity(1,1) primary key,
    RequestTimeStamp datetime2 not null,
    ItemCount int not null
)
```

# [v2](#tab/python-v2)

The following is sample python code for the function_app.py file:

```python
from datetime import datetime
import json
import logging
import azure.functions as func

app = func.FunctionApp()

@app.function_name(name="PostToDo")
@app.route(route="posttodo")
@app.sql_output(arg_name="todoItems",
                        command_text="[dbo].[ToDo]",
                        connection_string_setting="SqlConnectionString")
@app.sql_output(arg_name="requestLog",
                        command_text="[dbo].[RequestLog]",
                        connection_string_setting="SqlConnectionString")
def add_todo(req: func.HttpRequest, todoItems: func.Out[func.SqlRow], requestLog: func.Out[func.SqlRow]) -> func.HttpResponse:
    logging.info('Python HTTP trigger and SQL output binding function processed a request.')
    try:
        req_body = req.get_json()
        rows = func.SqlRowList(map(lambda r: func.SqlRow.from_dict(r), req_body))
    except ValueError:
        pass

    requestLog.set(func.SqlRow({
        "RequestTimeStamp": datetime.now().isoformat(),
        "ItemCount": 1
    }))

    if req_body:
        todoItems.set(rows)
        return func.HttpResponse(
            "OK",
            status_code=201,
            mimetype="application/json"
        )
    else:
        return func.HttpResponse(
            "Error accessing request body",
            status_code=400
        )
```

# [v1](#tab/python-v1)

The following is binding data in the function.json file:

```json
{
    "authLevel": "anonymous",
    "type": "httpTrigger",
    "direction": "in",
    "name": "req",
    "methods": [
        "post"
    ]
},
{
    "type": "http",
    "direction": "out",
    "name": "$return"
},
{
    "name": "todoItems",
    "type": "sql",
    "direction": "out",
    "commandText": "dbo.ToDo",
    "connectionStringSetting": "SqlConnectionString"
},
{
    "name": "requestLog",
    "type": "sql",
    "direction": "out",
    "commandText": "dbo.RequestLog",
    "connectionStringSetting": "SqlConnectionString"
}
```

The [configuration](#configuration) section explains these properties.

The following is sample Python code:

```python
import logging
from datetime import datetime
import azure.functions as func


def main(req: func.HttpRequest, todoItems: func.Out[func.SqlRow], requestLog: func.Out[func.SqlRow]) -> func.HttpResponse:
    logging.info('Python HTTP trigger and SQL output binding function processed a request.')

    try:
        req_body = req.get_json()
        rows = func.SqlRowList(map(lambda r: func.SqlRow.from_dict(r), req_body))
    except ValueError:
        pass

    requestLog.set(func.SqlRow({
        "RequestTimeStamp": datetime.now(),
        "ItemCount": 1
    }))

    if req_body:
        todoItems.set(rows)
        return func.HttpResponse(
            todoItems.to_json(),
            status_code=201,
            mimetype="application/json"
        )
    else:
        return func.HttpResponse(
            "Error accessing request body",
            status_code=400
        )
```

---




**Applies to: programming-language-csharp**

## Attributes 

The [C# library](functions-dotnet-class-library.md) uses the [SqlAttribute](https://github.com/Azure/azure-functions-sql-extension/blob/main/src/SqlAttribute.cs) attribute to declare the SQL bindings on the function, which has the following properties:

| Attribute property | Description |
| --- | --- |
| **CommandText** | Required. The name of the table being written to by the binding. |
| **ConnectionStringSetting** | Required. The name of an app setting that contains the connection string for the database to which data is being written. This value isn't the actual connection string and must instead resolve to an environment variable. |




**Applies to: programming-language-java**

## Annotations

In the [Java functions runtime library](https://learn.microsoft.com/java/api/overview/azure/functions/runtime), use the `@SQLOutput` annotation (`com.microsoft.azure.functions.sql.annotation.SQLOutput`) on parameters whose value would come from Azure SQL. This annotation supports the following elements:

| Element | Description |
| --- | --- |
| **commandText** | Required. The name of the table being written to by the binding. |
| **connectionStringSetting** | Required. The name of an app setting that contains the connection string for the database to which data is being written. This value isn't the actual connection string and must instead resolve to an environment variable. |
| **name** | Required. The unique name of the function binding. |


**Applies to: programming-language-javascript,programming-language-typescript**


## Configuration

# [Model v4](#tab/nodejs-v4)

The following table explains the properties that you can set on the `options` object passed to the `output.sql()` method.

| Property | Description |
| --- | --- |
| **commandText** | Required. The name of the table being written to by the binding. |
| **connectionStringSetting** | Required. The name of an app setting that contains the connection string for the database to which data is being written. This value isn't the actual connection string and must instead resolve to an environment variable. Optional keywords in the connection string value are [available to refine SQL bindings connectivity](functions-bindings-azure-sql.md#connections). |

# [Model v3](#tab/nodejs-v3)

The following table explains the binding configuration properties that you set in the *function.json* file.

| Property | Description |
| --- | --- |
| **type** | Required. Must be set to `sql`. |
| **direction** | Required. Must be set to `out`. |
| **name** | Required. The name of the variable that represents the entity in function code. |
| **commandText** | Required. The name of the table being written to by the binding. |
| **connectionStringSetting** | Required. The name of an app setting that contains the connection string for the database to which data is being written. This value isn't the actual connection string and must instead resolve to an environment variable. Optional keywords in the connection string value are [available to refine SQL bindings connectivity](functions-bindings-azure-sql.md#connections). |

---


**Applies to: programming-language-powershell,programming-language-python**

## Configuration

The following table explains the binding configuration properties that you set in the *function.json* file.

| function.json property | Description |
| --- | --- |
| **type** | Required. Must be set to `sql`. |
| **direction** | Required. Must be set to `out`. |
| **name** | Required. The name of the variable that represents the entity in function code. |
| **commandText** | Required. The name of the table being written to by the binding. |
| **connectionStringSetting** | Required. The name of an app setting that contains the connection string for the database to which data is being written. This value isn't the actual connection string and must instead resolve to an environment variable. Optional keywords in the connection string value are [available to refine SQL bindings connectivity](functions-bindings-azure-sql.md#connections). |



When you're developing locally, add your application settings in the [local.settings.json file](functions-develop-local.md#local-settings-file) in the `Values` collection. 


## Usage

The `CommandText` property is the name of the table where the data is to be stored. 

The output bindings use the T-SQL [MERGE](https://learn.microsoft.com/sql/t-sql/statements/merge-transact-sql) statement which requires [SELECT](https://learn.microsoft.com/sql/t-sql/statements/merge-transact-sql#permissions) permissions on the target database.

If an exception occurs when a SQL output binding is executed, then the function code stops executing. This behavior may result in an error code being returned, such as an HTTP trigger returning a 500 error code. If the `IAsyncCollector` is used in a .NET function, then the function code can handle exceptions throw by the call to `FlushAsync()`.


## Connections

The `connectionStringSetting` property is set to a key in application settings that returns a value used by the Functions runtime to connect to the Azure SQL or SQL Server database used by the extension. The value of the connection property setting depends on the type of connection: 

+ **Managed identity connection**: The `connectionStringSetting` property returns a connection string that uses `Authentication=Active Directory Managed Identity` to authenticate without secrets. You can use either a system-assigned or user-assigned managed identity. For more information, see [Connect a function app to Azure SQL with managed identity](functions-identity-access-azure-sql-with-managed-identity.md) and [Define identity connections](manage-connections.md?pivots=functions-auth-identity\&tabs=bindings#define-connections).
+ **[Key Vault reference](https://learn.microsoft.com/azure/key-vault/general/overview)**: The `connectionStringSetting` property setting returns an Azure Key Vault reference to the location where the connection string is centrally maintained. For more information, see [Define Key Vault connections](manage-connections.md?pivots=functions-auth-keyvault\&tabs=bindings#define-connections).
+ **[App Configuration reference](../azure-app-configuration/quickstart-azure-functions-csharp.md)**: The `connectionStringSetting` property setting returns an Azure App Configuration reference that returns a connection string or a Key Vault reference. For more information, see [Azure App Configuration](manage-connections.md#azure-app-configuration) in the connections article. 
+ **Connection string**: The `connectionStringSetting` property setting returns the actual SQL connection string. Because the connection string may contain credentials, you should use a managed identity connection or at least store the connection string in Key Vault. For more information, see [Define connections](manage-connections.md?pivots=functions-auth-secret\&tabs=bindings#define-connections).

To learn more about bindings connections, see [Manage connections in Azure Functions](manage-connections.md?pivots=functions-auth-identity\&tabs=bindings).

The connection string is passed to [Microsoft.Data.SqlClient](https://learn.microsoft.com/dotnet/api/microsoft.data.sqlclient.sqlconnection.connectionstring) and supports all keywords defined in the [SqlClient ConnectionString documentation](https://learn.microsoft.com/dotnet/api/microsoft.data.sqlclient.sqlconnection.connectionstring?view=sqlclient-dotnet-core-5.0\&preserve-view=true#Microsoft_Data_SqlClient_SqlConnection_ConnectionString). Notable keywords include:

- `Authentication`: Connect to Azure SQL with Microsoft Entra ID. Set to `Active Directory Managed Identity` for managed identities. For more information, see [Connect a function app to Azure SQL with managed identity](functions-identity-access-azure-sql-with-managed-identity.md).
- `Command Timeout`: Wait for a specified amount of time in seconds before terminating a query (default 30 seconds).
- `ConnectRetryCount`: Automatically make additional reconnection attempts, especially applicable to Azure SQL Database serverless tier (default 1).
- `Pooling`: Reuse connections to the database to improve performance (default `true`). Additional settings for connection pooling include `Connection Lifetime`, `Max Pool Size`, and `Min Pool Size`. Learn more in the [ADO.NET documentation](https://learn.microsoft.com/sql/connect/ado-net/sql-server-connection-pooling).


## Next steps

- [Read data from a database (Input binding)](functions-bindings-azure-sql-input.md)
- [Run a function when data is changed in a SQL table (Trigger)](functions-bindings-azure-sql-trigger.md)
- [Review ToDo API sample with Azure SQL bindings](https://learn.microsoft.com/samples/azure-samples/azure-sql-binding-func-dotnet-todo/todo-backend-dotnet-azure-sql-bindings-azure-functions/)
