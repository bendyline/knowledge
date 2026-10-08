---
title: Azure Tables output bindings for Azure Functions
description: Understand how to use Azure Tables output bindings in Azure Functions.
ms.topic: reference
ms.date: 09/15/2026
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

# Azure Tables output bindings for Azure Functions

Use an Azure Tables output binding to write entities to a table in [Azure Cosmos DB for Table](https://learn.microsoft.com/azure/cosmos-db/table/introduction) or [Azure Table Storage](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/tables/table-storage-overview.md).

For information on setup and configuration details, see the [overview](functions-bindings-storage-table.md)

> **Note:**
> This output binding only supports creating new entities in a table. If you need to update an existing entity from your function code, instead use an Azure Tables SDK directly.

**Applies to: programming-language-javascript,programming-language-typescript**


> **Important:**
> This article uses tabs to support multiple versions of the Node.js programming model. The v4 model is generally available and is designed to have a more flexible and intuitive experience for JavaScript and TypeScript developers. For more details about how the v4 model works, refer to the [Azure Functions Node.js developer guide](functions-reference-node.md). To learn more about the differences between v3 and v4, refer to the [migration guide](functions-node-upgrade-v4.md). 



## Example

**Applies to: programming-language-go**

Go support isn't currently available for this binding.


**Applies to: programming-language-csharp**



A C# function can be created by using one of the following C# modes:

* [Isolated worker model](dotnet-isolated-process-guide.md): Compiled C# function that runs in a worker process that's isolated from the runtime. Isolated worker process is required to support C# functions running on LTS and non-LTS versions .NET and the .NET Framework. Extensions for isolated worker process functions use `Microsoft.Azure.Functions.Worker.Extensions.*` namespaces.
* [In-process model](functions-dotnet-class-library.md): Compiled C# function that runs in the same process as the Functions runtime. In a variation of this model, Functions can be run using [C# scripting](functions-reference-csharp.md), which is supported primarily for C# portal editing. Extensions for in-process functions use `Microsoft.Azure.WebJobs.Extensions.*` namespaces.



> **Important:**
> [Support will end for the in-process model on November 10, 2026](https://aka.ms/azure-functions-retirements/in-process-model). We highly recommend that you [migrate your apps to the isolated worker model](https://learn.microsoft.com/azure/azure-functions/migrate-dotnet-to-isolated-model?tabs=net8) for full support.

# [Isolated worker model](#tab/isolated-process)

The following `MyTableData` class represents a row of data in the table: 

```csharp
public class MyTableData : Azure.Data.Tables.ITableEntity
{
    public string Text { get; set; }

    public string PartitionKey { get; set; }
    public string RowKey { get; set; }
    public DateTimeOffset? Timestamp { get; set; }
    public ETag ETag { get; set; }
}
```

The following function, which is started by a Queue Storage trigger, writes a new `MyDataTable` entity to a table named **OutputTable**.

```csharp
[Function("TableFunction")]
[TableOutput("OutputTable", Connection = "AzureWebJobsStorage")]
public static MyTableData Run(
    [QueueTrigger("table-items")] string input,
    [TableInput("MyTable", "<PartitionKey>", "{queueTrigger}")] MyTableData tableInput,
    FunctionContext context)
{
    var logger = context.GetLogger("TableFunction");

    logger.LogInformation($"PK={tableInput.PartitionKey}, RK={tableInput.RowKey}, Text={tableInput.Text}");

    return new MyTableData()
    {
        PartitionKey = "queue",
        RowKey = Guid.NewGuid().ToString(),
        Text = $"Output record with rowkey {input} created at {DateTime.Now}"
    };
}
```

# [In-process model](#tab/in-process)

The following example shows a [C# function](functions-dotnet-class-library.md) that uses an HTTP trigger to write a single table row.

```csharp
public class TableStorage
{
    public class MyPoco
    {
        public string PartitionKey { get; set; }
        public string RowKey { get; set; }
        public string Text { get; set; }
    }

    [FunctionName("TableOutput")]
    [return: Table("MyTable")]
    public static MyPoco TableOutput([HttpTrigger] dynamic input, ILogger log)
    {
        log.LogInformation($"C# http trigger function processed: {input.Text}");
        return new MyPoco { PartitionKey = "Http", RowKey = Guid.NewGuid().ToString(), Text = input.Text };
    }
}
```


---


**Applies to: programming-language-java**


The following example shows a Java function that uses an HTTP trigger to write a single table row.

```java
public class Person {
    private String PartitionKey;
    private String RowKey;
    private String Name;

    public String getPartitionKey() {return this.PartitionKey;}
    public void setPartitionKey(String key) {this.PartitionKey = key; }
    public String getRowKey() {return this.RowKey;}
    public void setRowKey(String key) {this.RowKey = key; }
    public String getName() {return this.Name;}
    public void setName(String name) {this.Name = name; }
}

public class AddPerson {

    @FunctionName("addPerson")
    public HttpResponseMessage get(
            @HttpTrigger(name = "postPerson", methods = {HttpMethod.POST}, authLevel = AuthorizationLevel.FUNCTION, route="persons/{partitionKey}/{rowKey}") HttpRequestMessage<Optional<Person>> request,
            @BindingName("partitionKey") String partitionKey,
            @BindingName("rowKey") String rowKey,
            @TableOutput(name="person", partitionKey="{partitionKey}", rowKey = "{rowKey}", tableName="%MyTableName%", connection="MyConnectionString") OutputBinding<Person> person,
            final ExecutionContext context) {

        Person outPerson = new Person();
        outPerson.setPartitionKey(partitionKey);
        outPerson.setRowKey(rowKey);
        outPerson.setName(request.getBody().get().getName());

        person.setValue(outPerson);

        return request.createResponseBuilder(HttpStatus.OK)
                        .header("Content-Type", "application/json")
                        .body(outPerson)
                        .build();
    }
}
```

The following example shows a Java function that uses an HTTP trigger to write multiple table rows.

```java
public class Person {
    private String PartitionKey;
    private String RowKey;
    private String Name;

    public String getPartitionKey() {return this.PartitionKey;}
    public void setPartitionKey(String key) {this.PartitionKey = key; }
    public String getRowKey() {return this.RowKey;}
    public void setRowKey(String key) {this.RowKey = key; }
    public String getName() {return this.Name;}
    public void setName(String name) {this.Name = name; }
}

public class AddPersons {

    @FunctionName("addPersons")
    public HttpResponseMessage get(
            @HttpTrigger(name = "postPersons", methods = {HttpMethod.POST}, authLevel = AuthorizationLevel.FUNCTION, route="persons/") HttpRequestMessage<Optional<Person[]>> request,
            @TableOutput(name="person", tableName="%MyTableName%", connection="MyConnectionString") OutputBinding<Person[]> persons,
            final ExecutionContext context) {

        persons.setValue(request.getBody().get());

        return request.createResponseBuilder(HttpStatus.OK)
                        .header("Content-Type", "application/json")
                        .body(request.getBody().get())
                        .build();
    }
}
```


**Applies to: programming-language-javascript,programming-language-typescript**


The following example shows a table output binding that writes multiple table entities.


**Applies to: programming-language-typescript**


# [Model v4](#tab/nodejs-v4)

[Code reference unavailable in this source snapshot: ~/azure-functions-nodejs-v4/ts/src/functions/tableOutput1.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-storage-table-output.md)

# [Model v3](#tab/nodejs-v3)

TypeScript samples are not documented for model v3.

---


**Applies to: programming-language-javascript**


# [Model v4](#tab/nodejs-v4)

[Code reference unavailable in this source snapshot: ~/azure-functions-nodejs-v4/js/src/functions/tableOutput1.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-storage-table-output.md)

# [Model v3](#tab/nodejs-v3)

Here's the *function.json* file:

```json
{
  "bindings": [
    {
      "name": "input",
      "type": "manualTrigger",
      "direction": "in"
    },
    {
      "tableName": "Person",
      "connection": "MyStorageConnectionAppSetting",
      "name": "tableBinding",
      "type": "table",
      "direction": "out"
    }
  ],
  "disabled": false
}
```

The [configuration](#configuration) section explains these properties.

Here's the JavaScript code:

```javascript
module.exports = async function (context) {

    context.bindings.tableBinding = [];

    for (var i = 1; i < 10; i++) {
        context.bindings.tableBinding.push({
            PartitionKey: "Test",
            RowKey: i.toString(),
            Name: "Name " + i
        });
    }
};
```

---


**Applies to: programming-language-powershell**


The following example demonstrates how to write multiple entities to a table from a function.

Binding configuration in _function.json_:

```json
{
  "bindings": [
    {
      "name": "InputData",
      "type": "manualTrigger",
      "direction": "in"
    },
    {
      "tableName": "Person",
      "connection": "MyStorageConnectionAppSetting",
      "name": "TableBinding",
      "type": "table",
      "direction": "out"
    }
  ],
  "disabled": false
}
```

PowerShell code in _run.ps1_:

```powershell
param($InputData, $TriggerMetadata)
  
foreach ($i in 1..10) {
    Push-OutputBinding -Name TableBinding -Value @{
        PartitionKey = 'Test'
        RowKey = "$i"
        Name = "Name $i"
    }
}
```


**Applies to: programming-language-python**


The following example demonstrates how to use the Table storage output binding. Configure the `table` binding in the *function.json* by assigning values to `name`, `tableName`, `partitionKey`, and `connection`:

# [v2](#tab/python-v2)
The following function generates a unique UUI for the `rowKey` value and persists the message into Table storage.

```python
import logging
import uuid
import json
import azure.functions as func

app = func.FunctionApp()

@app.route(route="table_out_binding")
@app.table_output(arg_name="message",
                  connection="AzureWebJobsStorage",
                  table_name="messages")
def table_out_binding(req: func.HttpRequest, message: func.Out[str]):
    row_key = str(uuid.uuid4())
    data = {
        "Name": "Output binding message",
        "PartitionKey": "message",
        "RowKey": row_key
    }
    table_json = json.dumps(data)
    message.set(table_json)
    return table_json
```

# [v1](#tab/python-v1)
```json
{
  "scriptFile": "__init__.py",
  "bindings": [
    {
      "name": "message",
      "type": "table",
      "tableName": "messages",
      "partitionKey": "message",
      "connection": "AzureWebJobsStorage",
      "direction": "out"
    },
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
      "type": "http",
      "direction": "out",
      "name": "$return"
    }
  ]
}
```

The following function generates a unique UUI for the `rowKey` value and persists the message into Table storage.

```python
import logging
import uuid
import json

import azure.functions as func

def main(req: func.HttpRequest, message: func.Out[str]) -> func.HttpResponse:

    rowKey = str(uuid.uuid4())

    data = {
        "Name": "Output binding message",
        "PartitionKey": "message",
        "RowKey": rowKey
    }

    message.set(json.dumps(data))

    return func.HttpResponse(f"Message created with the rowKey: {rowKey}")
```

---


**Applies to: programming-language-csharp**

## Attributes 

Both [in-process](functions-dotnet-class-library.md) and [isolated worker process](dotnet-isolated-process-guide.md) C# libraries use attributes to define the function. C# script instead uses a function.json configuration file as described in the [C# scripting guide](functions-reference-csharp.md#table-output).

# [Isolated worker model](#tab/isolated-process)

In [C# class libraries](dotnet-isolated-process-guide.md), the `TableInputAttribute` supports the following properties:

| Attribute property | Description |
| --- | --- |
| **TableName** | The name of the table to which to write. |
| **PartitionKey** | The partition key of the table entity to write. |
| **RowKey** | The row key of the table entity to write. |
| **Connection** | The name of an app setting or setting collection that specifies how to connect to the table service. See [Connections](#connections). |

# [In-process model](#tab/in-process)

In [C# class libraries](functions-dotnet-class-library.md), the `TableAttribute` supports the following properties:

| Attribute property | Description |
| --- | --- |
| **TableName** | The name of the table to which to write. |
| **PartitionKey** | The partition key of the table entity to write. |
| **RowKey** | The row key of the table entity to write. |
| **Connection** | The name of an app setting or setting collection that specifies how to connect to the table service. See [Connections](#connections). |

The attribute's constructor takes the table name. Use the attribute on an `out` parameter or on the return value of the function, as shown in the following example:

```csharp
[FunctionName("TableOutput")]
[return: Table("MyTable")]
public static MyPoco TableOutput(
    [HttpTrigger] dynamic input, 
    ILogger log)
{
    ...
}
```

You can set the `Connection` property to specify a connection to the table service, as shown in the following example:

```csharp
[FunctionName("TableOutput")]
[return: Table("MyTable", Connection = "StorageConnectionAppSetting")]
public static MyPoco TableOutput(
    [HttpTrigger] dynamic input, 
    ILogger log)
{
    ...
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


**Applies to: programming-language-java**

## Annotations

In the [Java functions runtime library](https://learn.microsoft.com/java/api/overview/azure/functions/runtime), use the [TableOutput](https://github.com/Azure/azure-functions-java-library/blob/master/src/main/java/com/microsoft/azure/functions/annotation/TableOutput.java/) annotation on parameters to write values into your tables. The attribute supports the following elements: 

| Element | Description |
| --- | --- |
| **name** | The variable name used in function code that represents the table or entity. |
| **dataType** | Defines how Functions runtime should treat the parameter value. To learn more, see [dataType](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.tableoutput.datatype). |
| **tableName** | The name of the table to which to write. |
| **partitionKey** | The partition key of the table entity to write. |
| **rowKey** | The row key of the table entity to write. |
| **connection** | The name of an app setting or setting collection that specifies how to connect to the table service. See [Connections](#connections). |


**Applies to: programming-language-javascript,programming-language-typescript**


## Configuration

# [Model v4](#tab/nodejs-v4)

The following table explains the properties that you can set on the `options` object passed to the `output.table()` method.

| Property | Description |
| --- | --- |
| **tableName** | The name of the table to which to write. |
| **partitionKey** | The partition key of the table entity to write. |
| **rowKey** | The row key of the table entity to write. |
| **connection** | The name of an app setting or setting collection that specifies how to connect to the table service. See [Connections](#connections). |

# [Model v3](#tab/nodejs-v3)

The following table explains the binding configuration properties that you set in the *function.json* file.

| Property | Description |
| --- | --- |
| **type** | Must be set to `table`. This property is set automatically when you create the binding in the Azure portal. |
| **direction** | Must be set to `out`. This property is set automatically when you create the binding in the Azure portal. |
| **name** | The variable name used in function code that represents the table or entity. Set to `$return` to reference the function return value. |
| **tableName** | The name of the table to which to write. |
| **partitionKey** | The partition key of the table entity to write. |
| **rowKey** | The row key of the table entity to write. |
| **connection** | The name of an app setting or setting collection that specifies how to connect to the table service. See [Connections](#connections). |

---


**Applies to: programming-language-powershell,programming-language-python**

## Configuration

The following table explains the binding configuration properties that you set in the *function.json* file.

| function.json property | Description |
| --- | --- |
| **type** | Must be set to `table`. This property is set automatically when you create the binding in the Azure portal. |
| **direction** | Must be set to `out`. This property is set automatically when you create the binding in the Azure portal. |
| **name** | The variable name used in function code that represents the table or entity. Set to `$return` to reference the function return value. |
| **tableName** | The name of the table to which to write. |
| **partitionKey** | The partition key of the table entity to write. |
| **rowKey** | The row key of the table entity to write. |
| **connection** | The name of an app setting or setting collection that specifies how to connect to the table service. See [Connections](#connections). |

When you're developing locally, add your application settings in the [local.settings.json file](functions-develop-local.md#local-settings-file) in the `Values` collection. 




## Connections

The `connection` property is set to a key in application settings that returns a value used by the Functions runtime to connect to the storage account used by the extension. The value of the connection property setting depends on the type of connection: 

+ **Managed identity connection**: The `connection` property is a `<CONNECTION_NAME_PREFIX>` shared by a group of settings that together define an identity-based connection to the storage account. For more information, see [Define identity connections](manage-connections.md?pivots=functions-auth-identity\&tabs=bindings#define-connections).
+ **[Key Vault reference](https://learn.microsoft.com/azure/key-vault/general/overview)**: The `connection` property setting returns an Azure Key Vault reference to the location where the connection string is centrally maintained. For more information, see [Define Key Vault connections](manage-connections.md?pivots=functions-auth-keyvault\&tabs=bindings#define-connections).
+ **[App Configuration reference](../azure-app-configuration/quickstart-azure-functions-csharp.md)**: The `connection` property setting returns an Azure App Configuration reference that returns a connection string or a Key Vault reference. For more information, see [Azure App Configuration](manage-connections.md#azure-app-configuration) in the connections article. 
+ **Connection string**: The `connection` property setting returns the actual storage account connection string. Because the connection string contains shared secret keys, you should consider using a managed identity connection, when possible. For more information, see [Define connections](manage-connections.md?pivots=functions-auth-secret\&tabs=bindings#define-connections).

To learn more about bindings connections, see [Manage connection in Azure Functions](manage-connections.md?pivots=functions-auth-identity\&tabs=bindings). To obtain a connection string, follow the steps shown at [Manage storage account access keys](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-account-keys-manage.md).

When you set `connection` to a key or key prefix named `AzureWebJobsStorage` or to an empty string, the binding extension uses the default host storage account. For more information, see [Optimize storage performance](storage-considerations.md#optimize-storage-performance). 

## Usage

**Applies to: programming-language-csharp**


The usage of the binding depends on the extension package version, and the C# modality used in your function app, which can be one of the following:

# [Isolated worker model](#tab/isolated-process)

An isolated worker process class library compiled C# function runs in a process isolated from the runtime.

# [In-process model](#tab/in-process)

An in-process class library is a compiled C# function runs in the same process as the Functions runtime.
 
---

Choose a version to see usage details for the mode and version. 

# [Azure Tables extension](#tab/table-api/in-process)

The following types are supported for `out` parameters and return types:

- A plain-old CLR object (POCO) that includes the `PartitionKey` and `RowKey` properties. You can accompany these properties by implementing `ITableEntity`.
- `ICollector<T>` or `IAsyncCollector<T>` where `T` includes the `PartitionKey` and `RowKey` properties. You can accompany these properties by implementing `ITableEntity`.

You can also bind to `TableClient` [from the Azure SDK](https://learn.microsoft.com/dotnet/api/azure.data.tables.tableclient). You can then use that object to write to the table.

# [Combined Azure Storage extension](#tab/storage-extension/in-process)

The following types are supported for `out` parameters and return types:

- A plain-old CLR object (POCO) that includes the `PartitionKey` and `RowKey` properties. You can accompany these properties by implementing `ITableEntity` or inheriting `TableEntity`.
- `ICollector<T>` or `IAsyncCollector<T>` where `T` includes the `PartitionKey` and `RowKey` properties. You can accompany these properties by implementing `ITableEntity` or inheriting `TableEntity`.

You can also bind to `CloudTable` [from the Storage SDK](https://learn.microsoft.com/dotnet/api/microsoft.azure.cosmos.table.cloudtable) as a method parameter. You can then use that object to write to the table.

# [Azure Tables extension](#tab/table-api/isolated-process)


When you want the function to write to a single entity, the Azure Tables output binding can bind to the following types:

| Type | Description |
| --- | --- |
| A JSON serializable type that implements [ITableEntity] | Functions attempts to serialize a plain-old CLR object (POCO) type as the entity. The type must implement [ITableEntity] or have a string `RowKey` property and a string `PartitionKey` property. |

When you want the function to write to multiple entities, the Azure Tables output binding can bind to the following types:

| Type | Description |
| --- | --- |
| `T[]` where `T` is one of the single entity types | An array containing multiple entities. Each entry represents one entity. |

For other output scenarios, create and use a [TableClient] with other types from [Azure.Data.Tables] directly. See [Register Azure clients](dotnet-isolated-process-guide.md#register-azure-clients) for an example of using dependency injection to create a client type from the Azure SDK.

[Azure.Data.Tables]: https://learn.microsoft.com/dotnet/api/azure.data.tables
[TableClient]: https://learn.microsoft.com/dotnet/api/azure.data.tables.tableclient


# [Combined Azure Storage extension](#tab/storage-extension/isolated-process)

Return a plain-old CLR object (POCO) with properties that can be mapped to the table entity.

---


**Applies to: programming-language-java**

There are two options for outputting a Table storage row from a function by using the [TableStorageOutput](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.tableoutput) annotation:

| Options | Description |
| --- | --- |
| **Return value** | By applying the annotation to the function itself, the return value of the function persists as a Table storage row. |
| **Imperative** | To explicitly set the table row, apply the annotation to a specific parameter of the type [`OutputBinding<T>`](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.outputbinding), where `T` includes the `PartitionKey` and `RowKey` properties. You can accompany these properties by implementing `ITableEntity` or inheriting `TableEntity`. |


**Applies to: programming-language-javascript,programming-language-typescript**

# [Model v4](#tab/nodejs-v4)

Set the output row data by returning the value or using `context.extraOutputs.set()`.

# [Model v3](#tab/nodejs-v3)

Set the output row data by using `context.bindings.<name>` where `<name>` is the value specified in the `name` property of *function.json*.

---

**Applies to: programming-language-powershell**

To write to table data, use the `Push-OutputBinding` cmdlet, set the `-Name TableBinding` parameter and `-Value` parameter equal to the row data. See the [PowerShell example](#example) for more detail.



**Applies to: programming-language-python**

There are two options for outputting a Table storage row message from a function:

| Options | Description |
| --- | --- |
| **Return value** | Set the `name` property in *function.json* to `$return`. With this configuration, the function's return value persists as a Table storage row. |
| **Imperative** | Pass a value to the [set](https://learn.microsoft.com/python/api/azure-functions/azure.functions.out#set-val--t-----none) method of the parameter declared as an [Out](https://learn.microsoft.com/python/api/azure-functions/azure.functions.out) type. The value passed to `set` is persisted as table row. |


For specific usage details, see [Example](#example). 

## Exceptions and return codes

| Binding | Reference |
| --- | --- |
| Table | [Table Error Codes](https://learn.microsoft.com/rest/api/storageservices/fileservices/table-service-error-codes) |
| Blob, Table, Queue | [Storage Error Codes](https://learn.microsoft.com/rest/api/storageservices/fileservices/common-rest-api-error-codes) |
| Blob, Table, Queue | [Troubleshooting](https://learn.microsoft.com/rest/api/storageservices/fileservices/troubleshooting-api-operations) |

## Next steps

> 
> [Learn more about Azure functions triggers and bindings](functions-triggers-bindings.md)
