---
title: Azure SQL bindings for Functions
description: Understand how to use Azure SQL bindings in Azure Functions.
author: JetterMcTedder
ms.topic: reference
ms.custom:
  - build-2023
  - devx-track-extended-java
  - devx-track-js
  - devx-track-python
  - ignite-2023
ms.date: 12/06/2024
ms.author: bspendolini
ms.reviewer: glenga
zone_pivot_groups: programming-languages-set-functions-lang-workers
---

# Azure SQL bindings for Azure Functions overview

This set of articles explains how to work with [Azure SQL](https://learn.microsoft.com/azure/azure-sql/index) bindings in Azure Functions. Azure Functions supports input bindings, output bindings, and a function trigger for the Azure SQL and SQL Server products.

| Action | Type |
| --- | --- |
| Trigger a function when a change is detected on a SQL table | [SQL trigger](functions-bindings-azure-sql-trigger.md) |
| Read data from a database | [Input binding](functions-bindings-azure-sql-input.md) |
| Save data to a database | [Output binding](functions-bindings-azure-sql-output.md) |

**Applies to: programming-language-csharp**


## Install extension

The extension NuGet package you install depends on the C# mode you're using in your function app:

# [Isolated worker model](#tab/isolated-process)

Functions execute in an isolated C# worker process. To learn more, see [Guide for running C# Azure Functions in an isolated worker process](dotnet-isolated-process-guide.md).

Add the extension to your project by installing this [NuGet package](https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.Sql/).

```bash
dotnet add package Microsoft.Azure.Functions.Worker.Extensions.Sql
```

To use a preview version of the Microsoft.Azure.Functions.Worker.Extensions.Sql package, add the `--prerelease` flag to the command. You can view preview functionality on the [Azure Functions SQL Extensions release page](https://github.com/Azure/azure-functions-sql-extension/releases).

```bash
dotnet add package Microsoft.Azure.Functions.Worker.Extensions.Sql --prerelease
```

> **Note:**
> Breaking changes between preview releases of the Azure SQL bindings for Azure Functions requires that all Functions targeting the same database use the same version of the SQL extension package.

# [In-process model](#tab/in-process)


> **Important:**
> [Support will end for the in-process model on November 10, 2026](https://aka.ms/azure-functions-retirements/in-process-model). We highly recommend that you [migrate your apps to the isolated worker model](https://learn.microsoft.com/azure/azure-functions/migrate-dotnet-to-isolated-model?tabs=net8) for full support.

Functions execute in the same process as the Functions host. To learn more, see [Develop C# class library functions using Azure Functions](functions-dotnet-class-library.md).

Add the extension to your project by installing this [NuGet package](https://www.nuget.org/packages/Microsoft.Azure.WebJobs.Extensions.Sql).

```bash
dotnet add package Microsoft.Azure.WebJobs.Extensions.Sql
```

To use a preview version of the Microsoft.Azure.WebJobs.Extensions.Sql package, add the `--prerelease` flag to the command. You can view preview functionality on the [Azure Functions SQL Extensions release page](https://github.com/Azure/azure-functions-sql-extension/releases).

```bash
dotnet add package Microsoft.Azure.WebJobs.Extensions.Sql --prerelease
```

> **Note:**
> Breaking changes between preview releases of the Azure SQL bindings for Azure Functions requires that all Functions targeting the same database use the same version of the SQL extension package.

---




**Applies to: programming-language-javascript, programming-language-powershell,programming-language-python,programming-language-java**

 
## Install bundle

To be able to use this binding extension in your app, make sure that the *host.json* file in the root of your project contains this `extensionBundle` reference:


```json
{
    "version": "2.0",
    "extensionBundle": {
        "id": "Microsoft.Azure.Functions.ExtensionBundle",
        "version": "[4.0.0, 5.0.0)"
    }
}
```

In this example, the `version` value of `[4.0.0, 5.0.0)` instructs the Functions host to use a bundle version that is at least `4.0.0` but less than `5.0.0`, which includes all potential versions of 4.x. This notation effectively maintains your app on the latest available minor version of the v4.x extension bundle. 

When possible, you should use the latest extension bundle major version and allow the runtime to automatically maintain the latest minor version. You can view the contents of the latest bundle on the [extension bundles release page](https://github.com/Azure/azure-functions-extension-bundles/releases/latest). For more information, see [Azure Functions extension bundles](extension-bundles.md).


If your app needs to use preview functionality, you should instead reference the latest version of the preview bundle. For more information, see [Work with preview extension bundles](extension-bundles.md#work-with-preview-extension-bundles).

You can view preview functionality on the [Azure Functions SQL Extensions release page](https://github.com/Azure/azure-functions-sql-extension/releases).

> **Note:**
> Breaking changes between preview releases of the Azure SQL bindings for Azure Functions requires that all Functions targeting the same database use the same version of the SQL extension package.


**Applies to: programming-language-java**

## Update packages

Add the [Azure Functions Java SQL Types package](https://mvnrepository.com/artifact/com.microsoft.azure.functions/azure-functions-java-library-sql) to your functions project with an update to the `pom.xml` file in your project, as in this example:

```xml
<dependency>
    <groupId>com.microsoft.azure.functions</groupId>
    <artifactId>azure-functions-java-library-sql</artifactId>
    <version>2.1.0</version>
</dependency>
```





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


## Considerations

- Azure SQL binding supports version 4.x and later of the Functions runtime.
- Source code for the Azure SQL bindings can be found in [this GitHub repository](https://github.com/Azure/azure-functions-sql-extension).
- This binding requires connectivity to an Azure SQL or SQL Server database.
- Output bindings against tables with columns of data types `NTEXT`, `TEXT`, or `IMAGE` aren't supported and data upserts will fail. These types [will be removed](https://learn.microsoft.com/sql/t-sql/data-types/ntext-text-and-image-transact-sql) in a future version of SQL Server and aren't compatible with the `OPENJSON` function used by this Azure Functions binding.
- Use [managed identities](https://learn.microsoft.com/azure/synapse-analytics/sql/authentication-azure-ad-user-assigned-managed-identity) instead of usernames and passwords.
- Consider using an [Azure Key Value](https://learn.microsoft.com/azure/app-service/app-service-key-vault-references) to store application settings.

## Samples

In addition to the samples for C#, Java, JavaScript, PowerShell, and Python available in the [Azure SQL bindings GitHub repository](https://github.com/Azure/azure-functions-sql-extension/tree/main/samples), more are available in Azure Samples:

- [ToDo API sample with Azure SQL bindings (C#)](https://learn.microsoft.com/samples/azure-samples/azure-sql-binding-func-dotnet-todo/todo-backend-dotnet-azure-sql-bindings-azure-functions/)
- [Use SQL bindings in Azure Stream Analytics](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/stream-analytics/sql-database-upsert.md#option-1-update-by-key-with-the-azure-function-sql-binding)

## Next steps

- [Read data from a database (Input binding)](functions-bindings-azure-sql-input.md)
- [Save data to a database (Output binding)](functions-bindings-azure-sql-output.md)
- [Run a function when data is changed in a SQL table (Trigger)](functions-bindings-azure-sql-trigger.md)
- [Learn how to connect Azure Function to Azure SQL with managed identity](functions-identity-access-azure-sql-with-managed-identity.md)

[core tools]: functions-run-local.md
[extension bundle]: extension-bundles.md
[Azure Tools extension]: https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-node-azure-pack
