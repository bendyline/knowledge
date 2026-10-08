---
title: Azure SQL trigger for Functions
description: Learn to use the Azure SQL trigger in Azure Functions.
author: JetterMcTedder
ms.topic: reference
ms.custom:
  - build-2023
  - devx-track-extended-java
  - devx-track-js
  - devx-track-python
  - ignite-2023
ms.date: 05/01/2026
ms.author: bspendolini
ms.reviewer: glenga
zone_pivot_groups: programming-languages-set-functions-lang-workers
---

# Azure SQL trigger for Functions

The Azure SQL trigger uses [SQL change tracking](https://learn.microsoft.com/sql/relational-databases/track-changes/about-change-tracking-sql-server) functionality to monitor a SQL table for changes and trigger a function when a row is created, updated, or deleted. For configuration details for change tracking for use with the Azure SQL trigger, see [Set up change tracking](#set-up-change-tracking-required). For information on setup details of the Azure SQL extension for Azure Functions, see the [SQL binding overview](functions-bindings-azure-sql.md).

The Azure SQL trigger scaling decisions for the [Consumption and Premium plans](functions-scale.md) are done via target-based scaling. For more information, see [Target-based scaling](functions-target-based-scaling.md) and review the [Azure Functions hosting options](functions-scale.md). 

> **Note:**
> Support for Consumption plans requires [release v3.1.284 or later](https://github.com/Azure/azure-functions-sql-extension/releases) of the [Azure SQL bindings for Azure Functions](functions-bindings-azure-sql.md).
> 

## Functionality Overview

The Azure SQL trigger binding uses a polling loop to check for changes, triggering the user function when changes are detected. At a high level, the loop looks like this:

```
while (true) {
    1. Get list of changes on table - up to a maximum number controlled by the Sql_Trigger_MaxBatchSize setting
    2. Trigger function with list of changes
    3. Wait for delay controlled by Sql_Trigger_PollingIntervalMs setting
}
```

Changes are processed in the order that their changes were made, with the oldest changes being processed first. A couple notes about change processing:

1. If changes to multiple rows are made at once the exact order that they’re sent to the function is based on the order returned by the CHANGETABLE function
2. Changes are "batched" together for a row. If multiple changes are made to a row between each iteration of the loop then only a single change entry exists for that row which will show the difference between the last processed state and the current state
3. If changes are made to a set of rows, and then another set of changes are made to half of those same rows, then the half of the rows that weren't changed a second time are processed first. This processing logic is due to the above note with the changes being batched - the trigger will only see the "last" change made and use that for the order it processes them in

> **Note:**
> Azure SQL change tracking can detect row-level changes in tables that use encryption technologies such as Always Encrypted or Transparent Data Encryption (TDE). However, the Azure SQL trigger doesn’t decrypt or expose encrypted column values in the change payload. The trigger can detect that a change occurred but can’t access the decrypted data for those columns.

For more information on change tracking and how it's used by applications such as Azure SQL triggers, see [work with change tracking](https://learn.microsoft.com/sql/relational-databases/track-changes/work-with-change-tracking-sql-server) .

For a complete end-to-end example of using the Azure SQL trigger, see [Respond to Azure SQL Database changes using Azure Functions](scenario-database-changes-azure-sqldb.md).

## Example usage
<a id="example"></a>

**Applies to: programming-language-csharp**


# [Isolated worker model](#tab/isolated-process)

More samples for the Azure SQL trigger are available in the [GitHub repository](https://github.com/Azure/azure-functions-sql-extension/tree/main/samples/samples-outofproc).


The example refers to a `ToDoItem` class and a corresponding database table:

[Code reference unavailable in this source snapshot: ~/functions-sql-todo-sample/ToDoModel.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-azure-sql-trigger.md)

[Code reference unavailable in this source snapshot: ~/functions-sql-todo-sample/sql/create.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-azure-sql-trigger.md)

[Change tracking](#set-up-change-tracking-required) is enabled on the database and on the table:

```sql
ALTER DATABASE [SampleDatabase]
SET CHANGE_TRACKING = ON
(CHANGE_RETENTION = 2 DAYS, AUTO_CLEANUP = ON);

ALTER TABLE [dbo].[ToDo]
ENABLE CHANGE_TRACKING;
```

The SQL trigger binds to a `IReadOnlyList<SqlChange<T>>`, a list of `SqlChange` objects each with two properties:
- **Item:** the item that was changed. The type of the item should follow the table schema as seen in the `ToDoItem` class.
- **Operation:** a value from `SqlChangeOperation` enum. The possible values are `Insert`, `Update`, and `Delete`.

The following example shows a [C# function](functions-dotnet-class-library.md) that is invoked when there are changes to the `ToDo` table:

```cs
using System;
using System.Collections.Generic;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Extensions.Sql;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;


namespace AzureSQL.ToDo
{
    public static class ToDoTrigger
    {
        [Function("ToDoTrigger")]
        public static void Run(
            [SqlTrigger("[dbo].[ToDo]", "SqlConnectionString")]
            IReadOnlyList<SqlChange<ToDoItem>> changes,
            FunctionContext context)
        {
            var logger = context.GetLogger("ToDoTrigger");
            foreach (SqlChange<ToDoItem> change in changes)
            {
                ToDoItem toDoItem = change.Item;
                logger.LogInformation($"Change operation: {change.Operation}");
                logger.LogInformation($"Id: {toDoItem.Id}, Title: {toDoItem.title}, Url: {toDoItem.url}, Completed: {toDoItem.completed}");
            }
        }
    }
}
```


# [In-process model](#tab/in-process)


> **Important:**
> [Support will end for the in-process model on November 10, 2026](https://aka.ms/azure-functions-retirements/in-process-model). We highly recommend that you [migrate your apps to the isolated worker model](https://learn.microsoft.com/azure/azure-functions/migrate-dotnet-to-isolated-model?tabs=net8) for full support.

More samples for the Azure SQL trigger are available in the [GitHub repository](https://github.com/Azure/azure-functions-sql-extension/tree/main/samples/samples-csharp).


The example refers to a `ToDoItem` class and a corresponding database table:

[Code reference unavailable in this source snapshot: ~/functions-sql-todo-sample/ToDoModel.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-azure-sql-trigger.md)

[Code reference unavailable in this source snapshot: ~/functions-sql-todo-sample/sql/create.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-azure-sql-trigger.md)

[Change tracking](#set-up-change-tracking-required) is enabled on the database and on the table:

```sql
ALTER DATABASE [SampleDatabase]
SET CHANGE_TRACKING = ON
(CHANGE_RETENTION = 2 DAYS, AUTO_CLEANUP = ON);

ALTER TABLE [dbo].[ToDo]
ENABLE CHANGE_TRACKING;
```

The SQL trigger binds to a `IReadOnlyList<SqlChange<T>>`, a list of `SqlChange` objects each with two properties:
- **Item:** the item that was changed. The type of the item should follow the table schema as seen in the `ToDoItem` class.
- **Operation:** a value from `SqlChangeOperation` enum. The possible values are `Insert`, `Update`, and `Delete`.

The following example shows a [C# function](functions-dotnet-class-library.md) that is invoked when there are changes to the `ToDo` table:

```cs
using System.Collections.Generic;
using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;
using Microsoft.Azure.WebJobs.Extensions.Sql;

namespace AzureSQL.ToDo
{
    public static class ToDoTrigger
    {
        [FunctionName("ToDoTrigger")]
        public static void Run(
            [SqlTrigger("[dbo].[ToDo]", "SqlConnectionString")]
            IReadOnlyList<SqlChange<ToDoItem>> changes,
            ILogger logger)
        {
            foreach (SqlChange<ToDoItem> change in changes)
            {
                ToDoItem toDoItem = change.Item;
                logger.LogInformation($"Change operation: {change.Operation}");
                logger.LogInformation($"Id: {toDoItem.Id}, Title: {toDoItem.title}, Url: {toDoItem.url}, Completed: {toDoItem.completed}");
            }
        }
    }
}
```

---



**Applies to: programming-language-java**


More samples for the Azure SQL trigger are available in the [GitHub repository](https://github.com/Azure/azure-functions-sql-extension/tree/main/samples/samples-java).


The example refers to a `ToDoItem` class, a `SqlChangeToDoItem` class, a `SqlChangeOperation` enum, and a corresponding database table:

In a separate file `ToDoItem.java`:

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

In a separate file `SqlChangeToDoItem.java`:
```java
package com.function;

public class SqlChangeToDoItem {
    public ToDoItem item;
    public SqlChangeOperation operation;

    public SqlChangeToDoItem() {
    }

    public SqlChangeToDoItem(ToDoItem Item, SqlChangeOperation Operation) {
        this.Item = Item;
        this.Operation = Operation;
    }
}
```

In a separate file `SqlChangeOperation.java`:
```java
package com.function;

import com.google.gson.annotations.SerializedName;

public enum SqlChangeOperation {
    @SerializedName("0")
    Insert,
    @SerializedName("1")
    Update,
    @SerializedName("2")
    Delete;
}
```

[Code reference unavailable in this source snapshot: ~/functions-sql-todo-sample/sql/create.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-azure-sql-trigger.md)

[Change tracking](#set-up-change-tracking-required) is enabled on the database and on the table:

```sql
ALTER DATABASE [SampleDatabase]
SET CHANGE_TRACKING = ON
(CHANGE_RETENTION = 2 DAYS, AUTO_CLEANUP = ON);

ALTER TABLE [dbo].[ToDo]
ENABLE CHANGE_TRACKING;
```

The SQL trigger binds to a `SqlChangeToDoItem[]`, an array of `SqlChangeToDoItem` objects each with two properties:
- **item:** the item that was changed. The type of the item should follow the table schema as seen in the `ToDoItem` class.
- **operation:** a value from `SqlChangeOperation` enum. The possible values are `Insert`, `Update`, and `Delete`.


The following example shows a Java function that is invoked when there are changes to the `ToDo` table:

```java
package com.function;

import com.microsoft.azure.functions.ExecutionContext;
import com.microsoft.azure.functions.annotation.FunctionName;
import com.microsoft.azure.functions.sql.annotation.SQLTrigger;
import com.function.Common.SqlChangeToDoItem;
import com.google.gson.Gson;

import java.util.logging.Level;

public class ProductsTrigger {
    @FunctionName("ToDoTrigger")
    public void run(
            @SQLTrigger(
                name = "todoItems",
                tableName = "[dbo].[ToDo]",
                connectionStringSetting = "SqlConnectionString")
                SqlChangeToDoItem[] todoItems,
            ExecutionContext context) {

        context.getLogger().log(Level.INFO, "SQL Changes: " + new Gson().toJson(changes));
    }
}
```





**Applies to: programming-language-powershell**


More samples for the Azure SQL trigger are available in the [GitHub repository](https://github.com/Azure/azure-functions-sql-extension/tree/main/samples/samples-powershell).


The example refers to a `ToDoItem` database table:

[Code reference unavailable in this source snapshot: ~/functions-sql-todo-sample/sql/create.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-azure-sql-trigger.md)

[Change tracking](#set-up-change-tracking-required) is enabled on the database and on the table:

```sql
ALTER DATABASE [SampleDatabase]
SET CHANGE_TRACKING = ON
(CHANGE_RETENTION = 2 DAYS, AUTO_CLEANUP = ON);

ALTER TABLE [dbo].[ToDo]
ENABLE CHANGE_TRACKING;
```

The SQL trigger binds to `todoChanges`, a list of objects each with two properties:
- **item:** the item that was changed. The structure of the item will follow the table schema.
- **operation:** the possible values are `Insert`, `Update`, and `Delete`.


The following example shows a PowerShell function that is invoked when there are changes to the `ToDo` table.

The following is binding data in the function.json file:

```json
{
    "name": "todoChanges",
    "type": "sqlTrigger",
    "direction": "in",
    "tableName": "dbo.ToDo",
    "connectionStringSetting": "SqlConnectionString"
}
```


The [configuration](#configuration) section explains these properties.

The following is sample PowerShell code for the function in the `run.ps1` file:

```powershell
using namespace System.Net

param($todoChanges)
# The output is used to inspect the trigger binding parameter in test methods.
# Use -Compress to remove new lines and spaces for testing purposes.
$changesJson = $todoChanges | ConvertTo-Json -Compress
Write-Host "SQL Changes: $changesJson"
```

**Applies to: programming-language-javascript**


More samples for the Azure SQL trigger are available in the [GitHub repository](https://github.com/Azure/azure-functions-sql-extension/tree/main/samples/samples-js).


The example refers to a `ToDoItem` database table:

[Code reference unavailable in this source snapshot: ~/functions-sql-todo-sample/sql/create.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-azure-sql-trigger.md)

[Change tracking](#set-up-change-tracking-required) is enabled on the database and on the table:

```sql
ALTER DATABASE [SampleDatabase]
SET CHANGE_TRACKING = ON
(CHANGE_RETENTION = 2 DAYS, AUTO_CLEANUP = ON);

ALTER TABLE [dbo].[ToDo]
ENABLE CHANGE_TRACKING;
```

The SQL trigger binds `todoChanges`, an array of objects each with two properties:
- **item:** the item that was changed. The structure of the item will follow the table schema.
- **operation:** the possible values are `Insert`, `Update`, and `Delete`.


The following example shows a JavaScript function that is invoked when there are changes to the `ToDo` table.

The following is binding data in the function.json file:

```json
{
    "name": "todoChanges",
    "type": "sqlTrigger",
    "direction": "in",
    "tableName": "dbo.ToDo",
    "connectionStringSetting": "SqlConnectionString"
}
```


The [configuration](#configuration) section explains these properties.

The following is sample JavaScript code for the function in the `index.js` file:

```javascript
module.exports = async function (context, todoChanges) {
    context.log(`SQL Changes: ${JSON.stringify(todoChanges)}`)
}
```






**Applies to: programming-language-python**


More samples for the Azure SQL trigger are available in the [GitHub repository](https://github.com/Azure/azure-functions-sql-extension/tree/main/samples/samples-python).


The example refers to a `ToDoItem` database table:


[Code reference unavailable in this source snapshot: ~/functions-sql-todo-sample/sql/create.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-azure-sql-trigger.md)

[Change tracking](#set-up-change-tracking-required) is enabled on the database and on the table:

```sql
ALTER DATABASE [SampleDatabase]
SET CHANGE_TRACKING = ON
(CHANGE_RETENTION = 2 DAYS, AUTO_CLEANUP = ON);

ALTER TABLE [dbo].[ToDo]
ENABLE CHANGE_TRACKING;
```

The SQL trigger binds to a variable `todoChanges`, a list of objects each with two properties:
- **item:** the item that was changed. The structure of the item will follow the table schema.
- **operation:** the possible values are `Insert`, `Update`, and `Delete`.


The following example shows a Python function that is invoked when there are changes to the `ToDo` table.

# [v2](#tab/python-v2)

The following is sample python code for the function_app.py file:

```python
import json
import logging
import azure.functions as func

app = func.FunctionApp()

@app.function_name(name="ToDoTrigger")
@app.sql_trigger(arg_name="todo",
                        table_name="ToDo",
                        connection_string_setting="SqlConnectionString")
def todo_trigger(todo: str) -> None:
    logging.info("SQL Changes: %s", json.loads(todo))
```

# [v1](#tab/python-v1)


The following is binding data in the function.json file:

```json
{
    "name": "todoChanges",
    "type": "sqlTrigger",
    "direction": "in",
    "tableName": "dbo.ToDo",
    "connectionStringSetting": "SqlConnectionString"
}
```


The [configuration](#configuration) section explains these properties.

The following is sample Python code for the function in the `__init__.py` file:

```python
import json
import logging

def main(changes):
    logging.info("SQL Changes: %s", json.loads(changes))
```

---






**Applies to: programming-language-csharp**


## Attributes

The [C# library](functions-dotnet-class-library.md) uses the [SqlTrigger](https://github.com/Azure/azure-functions-sql-extension/blob/main/src/TriggerBinding/SqlTriggerAttribute.cs) attribute to declare the SQL trigger on the function, which has the following properties:

| Attribute property | Description |
| --- | --- |
| **TableName** | Required. The name of the table monitored by the trigger. |
| **ConnectionStringSetting** | Required. The name of an app setting that contains the connection string for the database containing the table monitored for changes. The connection string setting name corresponds to the application setting (in `local.settings.json` for local development) that contains the [connection string](https://learn.microsoft.com/dotnet/api/microsoft.data.sqlclient.sqlconnection.connectionstring?view=sqlclient-dotnet-core-5.\&preserve-view=true#Microsoft_Data_SqlClient_SqlConnection_ConnectionString) to the Azure SQL or SQL Server instance. |
| **LeasesTableName** | Optional. Name of the table used to store leases. If not specified, the leases table name will be Leases_{FunctionId}_{TableId}. More information on how this is generated can be found [here](https://github.com/Azure/azure-functions-sql-extension/blob/main/docs/TriggerBinding.md#az_funcleasestablename). |






**Applies to: programming-language-java**

## Annotations

In the [Java functions runtime library](https://learn.microsoft.com/java/api/overview/azure/functions/runtime), use the `@SQLTrigger` annotation (`com.microsoft.azure.functions.sql.annotation.SQLTrigger`) on parameters whose value would come from Azure SQL. This annotation supports the following elements:

| Element | Description |
| --- | --- |
| **name** | Required. The name of the parameter that the trigger binds to. |
| **tableName** | Required. The name of the table monitored by the trigger. |
| **connectionStringSetting** | Required. The name of an app setting that contains the connection string for the database containing the table monitored for changes. The connection string setting name corresponds to the application setting (in `local.settings.json` for local development) that contains the [connection string](https://learn.microsoft.com/dotnet/api/microsoft.data.sqlclient.sqlconnection.connectionstring?view=sqlclient-dotnet-core-5.\&preserve-view=true#Microsoft_Data_SqlClient_SqlConnection_ConnectionString) to the Azure SQL or SQL Server instance. |
| **LeasesTableName** | Optional. Name of the table used to store leases. If not specified, the leases table name will be Leases_{FunctionId}_{TableId}. More information on how this is generated can be found [here](https://github.com/Azure/azure-functions-sql-extension/blob/main/docs/TriggerBinding.md#az_funcleasestablename). |




**Applies to: programming-language-javascript,programming-language-powershell,programming-language-python**

## Configuration

The following table explains the binding configuration properties that you set in the function.json file.

| function.json property | Description |
| --- | --- |
| **name** | Required. The name of the parameter that the trigger binds to. |
| **type** | Required. Must be set to `sqlTrigger`. |
| **direction** | Required. Must be set to `in`. |
| **tableName** | Required. The name of the table monitored by the trigger. |
| **connectionStringSetting** | Required. The name of an app setting that contains the connection string for the database containing the table monitored for changes. The connection string setting name corresponds to the application setting (in `local.settings.json` for local development) that contains the [connection string](https://learn.microsoft.com/dotnet/api/microsoft.data.sqlclient.sqlconnection.connectionstring?view=sqlclient-dotnet-core-5.\&preserve-view=true#Microsoft_Data_SqlClient_SqlConnection_ConnectionString) to the Azure SQL or SQL Server instance. |
| **LeasesTableName** | Optional. Name of the table used to store leases. If not specified, the leases table name will be Leases_{FunctionId}_{TableId}. More information on how this is generated can be found [here](https://github.com/Azure/azure-functions-sql-extension/blob/main/docs/TriggerBinding.md#az_funcleasestablename). |


## Optional Configuration

The following optional settings can be configured for the SQL trigger for local development or for cloud deployments.

### host.json


This section describes the configuration settings available for this binding in version 2.x and later. Settings in the host.json file apply to all functions in a function app instance. For more information about function app configuration settings, see [host.json reference for Azure Functions](functions-host-json.md).

| Setting | Default | Description |
| --- | --- | --- |
| **MaxBatchSize** | 100 | The maximum number of changes processed with each iteration of the trigger loop before being sent to the triggered function. |
| **PollingIntervalMs** | 1000 | The delay in milliseconds between processing each batch of changes. (1000 ms is 1 second) |
| **MaxChangesPerWorker** | 1000 | The upper limit on the number of pending changes in the user table that are allowed per application-worker. If the count of changes exceeds this limit, it might result in a scale-out. The setting only applies for Azure Function Apps with [runtime driven scaling enabled](#enable-runtime-driven-scaling). |

#### Example host.json file

Here is an example host.json file with the optional settings:

```JSON
{
  "version": "2.0",
  "extensions": {
      "Sql": {
        "MaxBatchSize": 300,
        "PollingIntervalMs": 1000,
        "MaxChangesPerWorker": 100
      }
  },
  "logging": {
    "applicationInsights": {
      "samplingSettings": {
        "isEnabled": true,
        "excludedTypes": "Request"
      }
    },
    "logLevel": {
      "default": "Trace"
    }
  }
}
```

### local.setting.json

The local.settings.json file stores app settings and settings used by local development tools. Settings in the local.settings.json file are used only when you're running your project locally. When you publish your project to Azure, be sure to also add any required settings to the app settings for the function app.

> **Important:**  
> Because the local.settings.json may contain secrets, such as connection strings, you should never store it in a remote repository. Tools that support Functions provide ways to synchronize settings in the local.settings.json file with the [app settings](functions-how-to-use-azure-function-app-settings.md#settings) in the function app to which your project is deployed.

| Setting | Default | Description |
| --- | --- | --- |
| **Sql_Trigger_BatchSize** | 100 | The maximum number of changes processed with each iteration of the trigger loop before being sent to the triggered function. |
| **Sql_Trigger_PollingIntervalMs** | 1000 | The delay in milliseconds between processing each batch of changes. (1000 ms is 1 second) |
| **Sql_Trigger_MaxChangesPerWorker** | 1000 | The upper limit on the number of pending changes in the user table that are allowed per application-worker. If the count of changes exceeds this limit, it might result in a scale-out. The setting only applies for Azure Function Apps with [runtime driven scaling enabled](#enable-runtime-driven-scaling). |

#### Example local.settings.json file

Here is an example local.settings.json file with the optional settings:

```JSON
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    "FUNCTIONS_WORKER_RUNTIME": "dotnet",
    "SqlConnectionString": "",
    "Sql_Trigger_MaxBatchSize": 300,
    "Sql_Trigger_PollingIntervalMs": 1000,
    "Sql_Trigger_MaxChangesPerWorker": 100
  }
}
```

## Set up change tracking (required)

Setting up change tracking for use with the Azure SQL trigger requires two steps.  These steps can be completed from any SQL tool that supports running queries, including [Visual Studio Code](https://learn.microsoft.com/sql/tools/visual-studio-code-extensions/mssql/mssql-extension-visual-studio-code), or [SQL Server Management Studio](https://learn.microsoft.com/sql/ssms/download-sql-server-management-studio-ssms).

1. Enable change tracking on the SQL database, substituting `your database name` with the name of the database where the table to be monitored is located:

    ```sql
    ALTER DATABASE [your database name]
    SET CHANGE_TRACKING = ON
    (CHANGE_RETENTION = 2 DAYS, AUTO_CLEANUP = ON);
    ```

    The `CHANGE_RETENTION` option specifies the time period for which change tracking information (change history) is kept.  The retention of change history by the SQL database might affect trigger functionality. For example, if the Azure Function is turned off for several days and then resumed, the database will contain the changes that occurred in past two days in the above setup example.

    The `AUTO_CLEANUP` option is used to enable or disable the clean-up task that removes old change tracking information. If a temporary problem that prevents the trigger from running, turning off auto cleanup can be useful to pause the removal of information older than the retention period until the problem is resolved.

    More information on change tracking options is available in the [SQL documentation](https://learn.microsoft.com/sql/relational-databases/track-changes/enable-and-disable-change-tracking-sql-server).

2. Enable change tracking on the table, substituting `your table name` with the name of the table to be monitored (changing the schema if appropriate):

    ```sql
    ALTER TABLE [dbo].[your table name]
    ENABLE CHANGE_TRACKING;
    ```

    The trigger needs to have read access on the table being monitored for changes and to the change tracking system tables. Each function trigger has an associated change tracking table and leases table in a schema `az_func`. These tables are created by the trigger if they don't yet exist.  More information on these data structures is available in the Azure SQL binding library [documentation](https://github.com/Azure/azure-functions-sql-extension/blob/main/docs/BindingsOverview.md#internal-state-tables).


## Grant permissions for Azure SQL trigger

When using the Azure SQL trigger with Azure Functions (including when using [managed identity](functions-identity-access-azure-sql-with-managed-identity.md)), the database principal must be granted additional permissions beyond those required for input and output bindings.

The `db_datareader` and `db_datawriter` roles used for input and output bindings aren't  sufficient for SQL triggers.

The Azure SQL trigger relies on [SQL change tracking](#set-up-change-tracking-required) to detect changes and uses internal state tables in an `az_func` schema. To function correctly, the following permissions are required:

1. Grant the identity permissions to create the schema and tables used internally by the trigger:

    ```sql
    GRANT CREATE TABLE TO [<UserOrManagedIdentity>];
    GRANT CREATE SCHEMA TO [<UserOrManagedIdentity>];
    ```

1. Grant read access and change tracking on the monitored table:

    ```sql
    GRANT SELECT ON [<TableName>] TO [<UserOrManagedIdentity>];
    GRANT VIEW CHANGE TRACKING ON [<TableName>] TO [<UserOrManagedIdentity>];
    ```

1. Create the `az_func` schema used internally by the trigger and grant permissions on it:

    ```sql
    CREATE SCHEMA az_func;
    GO
    GRANT ALTER ON SCHEMA::az_func TO [<UserOrManagedIdentity>];
    GRANT SELECT, INSERT, UPDATE, DELETE ON SCHEMA::az_func TO [<UserOrManagedIdentity>];
    ```

## Enable runtime-driven scaling

Optionally, your functions can scale automatically based on the number of changes that are pending to be processed in the user table. To allow your functions to scale properly on the Premium plan when using SQL triggers, you need to enable runtime scale monitoring.


# [Azure portal](#tab/portal)

1. In the Azure portal, in your function app, select **Configuration**.
1. On the **Function runtime settings** tab, for **Runtime Scale Monitoring**, select **On**.

   Screenshot of the Azure portal area for enabling runtime scaling.

# [Azure CLI](#tab/azure-cli)

Use the following Azure CLI command to enable runtime scale monitoring:

```azurecli-interactive
az resource update -g <RESOURCE_GROUP> -n <FUNCTION_APP_NAME>/config/web --set properties.functionsRuntimeScaleMonitoringEnabled=1 --resource-type Microsoft.Web/sites
```

---


## Retry support

Further information on the SQL trigger [retry support](https://github.com/Azure/azure-functions-sql-extension/blob/main/docs/BindingsOverview.md#retry-support-for-trigger-bindings) and [leases tables](https://github.com/Azure/azure-functions-sql-extension/blob/main/docs/TriggerBinding.md#internal-state-tables) is available in the GitHub repository.

### Startup retries
If an exception occurs during startup then the host runtime automatically attempts to restart the trigger listener with an exponential backoff strategy. These retries continue until either the listener is successfully started or the startup is canceled.

### Broken connection retries
If the function successfully starts but then an error causes the connection to break (such as the server going offline) then the function continues to try and reopen the connection until the function is either stopped or the connection succeeds. If the connection is successfully re-established then it picks up processing changes where it left off.

Note that these retries are outside the built-in idle connection retry logic that SqlClient has which can be configured with the `ConnectRetryCount` and `ConnectRetryInterval` [connection string options](https://learn.microsoft.com/dotnet/api/microsoft.data.sqlclient.sqlconnection.connectionstring?view=sqlclient-dotnet-core-5.0\&preserve-view=true#Microsoft_Data_SqlClient_SqlConnection_ConnectionString). The built-in idle connection retries are attempted first and if those fail to reconnect then the trigger binding attempts to re-establish the connection itself.

### Function exception retries
If an exception occurs in the user function when processing changes then the batch of rows currently being processed are retried again in 60 seconds. Other changes are processed as normal during this time, but the rows in the batch that caused the exception are ignored until the timeout period has elapsed.

If the function execution fails five times in a row for a given row then that row is completely ignored for all future changes. Because the rows in a batch aren't deterministic, rows in a failed batch might end up in different batches in subsequent invocations. This means that not all rows in the failed batch will necessarily be ignored. If other rows in the batch were the ones causing the exception, the "good" rows might end up in a different batch that doesn't fail in future invocations.


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
- [Save data to a database (Output binding)](functions-bindings-azure-sql-output.md)
