---
title: Key storage providers in ASP.NET Core
author: tdykstra
description: Learn about key storage providers in ASP.NET Core and how to configure key storage locations.
ms.author: tdykstra
ms.date: 11/07/2025
uid: security/data-protection/implementation/key-storage-providers
---
<!-- ms.sfi.ropc: t -->
# Key storage providers in ASP.NET Core

The data protection system [employs a discovery mechanism by default](../configuration/default-settings.md) to determine where cryptographic keys should be persisted. The developer can override the default discovery mechanism and manually specify the location.

> **Warning:**
> If you specify an explicit key persistence location, the data protection system deregisters the default key encryption at rest mechanism, so keys are no longer encrypted at rest. It's recommended that you additionally [specify an explicit key encryption mechanism](key-encryption-at-rest.md) for production deployments.

## File system

To configure a file system-based key repository, call the [Microsoft.AspNetCore.DataProtection.DataProtectionBuilderExtensions.PersistKeysToFileSystem%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.DataProtection.DataProtectionBuilderExtensions.PersistKeysToFileSystem%252A) configuration routine as shown below. Provide a [System.IO.DirectoryInfo](https://learn.microsoft.com/search/?terms=System.IO.DirectoryInfo) pointing to the repository where keys should be stored:

```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddDataProtection()
        .PersistKeysToFileSystem(new DirectoryInfo(@"c:\temp-keys\"));
}
```

The `DirectoryInfo` can point to a directory on the local machine, or it can point to a folder on a network share. If pointing to a directory on the local machine (and the scenario is that only apps on the local machine require access to use this repository), consider using [Windows DPAPI](key-encryption-at-rest.md) (on Windows) to encrypt the keys at rest. Otherwise, consider using an [X.509 certificate](key-encryption-at-rest.md) to encrypt keys at rest.

## Azure Storage

The [`Azure.Extensions.AspNetCore.DataProtection.Blobs` NuGet package](https://www.nuget.org/packages/Azure.Extensions.AspNetCore.DataProtection.Blobs) provides API for storing data protection keys in Azure Blob Storage. Keys can be shared across several instances of a web app. Apps can share authentication cookies or CSRF protection across multiple servers.

> **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at [Package consumption workflow (NuGet documentation)](https://learn.microsoft.com/nuget/consume-packages/overview-and-workflow). Confirm correct package versions at [NuGet.org](https://www.nuget.org).


To interact with [Azure Key Vault](https://azure.microsoft.com/services/key-vault/) locally using developer credentials, either sign into your storage account in Visual Studio or sign in with the [Azure CLI](https://learn.microsoft.com/cli/azure/). If you haven't already installed the Azure CLI, see [How to install the Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli). You can execute the following command in the Developer PowerShell panel in Visual Studio or from a command shell when not using Visual Studio:

```azurecli
az login
```

For more information, see [Sign-in to Azure using developer tooling](https://learn.microsoft.com/dotnet/azure/sdk/authentication/local-development-dev-accounts#sign-in-to-azure-using-developer-tooling).

Configure Azure Blob Storage to maintain data protection keys:

* Create an Azure storage account.

* Create a container to hold the data protection key file.

* We recommend using Azure Managed Identity and role-based access control (RBAC) to access the key storage blob. ***You don't need to create a key file and upload it to the container of the storage account.*** The framework creates the file for you. To inspect the contents of a key file, use the context menu's **View/edit** command at the end of a key row in the portal.
  
> **Note:**
> If you plan to use a blob URI with a shared access signature (SAS) instead of a Managed Identity, use a text editor to create an XML key file on your local machine:
>
>  ```xml
>  <?xml version="1.0" encoding="utf-8"?>
>  <repository>
>  </repository>
>  ```
>
>  Upload the key file to the container of the storage account. Use the context menu's **View/edit** command at the end of the key row in the portal to confirm that the blob contains the preceding content. By creating the file manually, you're able to obtain the blob URI with SAS from the portal for configuring the app in a later step.

* Create an Azure Managed Identity (or add a role to the existing Managed Identity that you plan to use) with the **Storage Blob Data Contributor** role. Assign the Managed Identity to the Azure App Service that's hosting the deployment: **Settings** > **Identity** > **User assigned** > **Add**.

  > **Note:**
  > If you also plan to run an app locally with an authorized user for blob access using the [Azure CLI](https://learn.microsoft.com/cli/azure/) or Visual Studio's Azure Service Authentication, add your developer Azure user account in **Access Control (IAM)** with the **Storage Blob Data Contributor** role. If you want to use the Azure CLI through Visual Studio, execute the `az login` command from the Developer PowerShell panel and follow the prompts to authenticate with the tenant.

To configure the Azure Blob Storage provider, call one of the [Microsoft.AspNetCore.DataProtection.AzureDataProtectionBuilderExtensions.PersistKeysToAzureBlobStorage%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.DataProtection.AzureDataProtectionBuilderExtensions.PersistKeysToAzureBlobStorage%252A) overloads in the app. The following example uses the overload that accepts a blob URI and token credential ([Azure.Core.TokenCredential](https://learn.microsoft.com/search/?terms=Azure.Core.TokenCredential)), relying on an Azure Managed Identity for role-based access control (RBAC).

Other overloads are based on:

* A blob URI and storage shared key credential ([Azure.Storage.StorageSharedKeyCredential](https://learn.microsoft.com/search/?terms=Azure.Storage.StorageSharedKeyCredential)).
* A blob URI with a shared access signature (SAS).
* A connection string, container name, and blob name.
* A blob client ([Azure.Storage.Blobs.BlobClient](https://learn.microsoft.com/search/?terms=Azure.Storage.Blobs.BlobClient)).

For more information on the Azure SDK's API and authentication, see [Authenticate .NET apps to Azure services using the Azure Identity library](https://learn.microsoft.com/dotnet/azure/sdk/authentication/). For logging guidance, see [Logging with the Azure SDK for .NET: Logging without client registration](https://learn.microsoft.com/dotnet/azure/sdk/logging#logging-without-client-registration). For apps using dependency injection, an app can call [Microsoft.Extensions.Azure.AzureClientServiceCollectionExtensions.AddAzureClientsCore%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Azure.AzureClientServiceCollectionExtensions.AddAzureClientsCore%252A), passing `true` for `enableLogForwarding`, to create and wire up the logging infrastructure.

**Applies to: \>= aspnetcore-6.0**

In the `Program` file where services are registered:

```csharp
TokenCredential? credential;

if (builder.Environment.IsProduction())
{
    credential = new ManagedIdentityCredential("{MANAGED IDENTITY CLIENT ID}");
}
else
{
    // Local development and testing only
    DefaultAzureCredentialOptions options = new()
    {
        // Specify the tenant ID to use the dev credentials when running the app locally
        // in Visual Studio.
        VisualStudioTenantId = "{TENANT ID}",
        SharedTokenCacheTenantId = "{TENANT ID}"
    };

    credential = new DefaultAzureCredential(options);
}

builder.Services.AddDataProtection()
    .SetApplicationName("{APPLICATION NAME}")
    .PersistKeysToAzureBlobStorage(new Uri("{BLOB URI}"), credential);
```

`{MANAGED IDENTITY CLIENT ID}`: The Azure Managed Identity Client ID (GUID).

`{TENANT ID}`: Tenant ID.

`{APPLICATION NAME}`: [Microsoft.AspNetCore.DataProtection.DataProtectionBuilderExtensions.SetApplicationName%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.DataProtection.DataProtectionBuilderExtensions.SetApplicationName%252A) sets the unique name of this app within the data protection system. The value should match across deployments of the app.

`{BLOB URI}`: Full URI to the key file. The URI is generated by Azure Storage when you create the key file. Do not use a SAS.

**Alternative shared-access signature (SAS) approach**: As an alternative to using a Managed Identity for access to the key blob in Azure Blob Storage, you can call the [Microsoft.AspNetCore.DataProtection.AzureDataProtectionBuilderExtensions.PersistKeysToAzureBlobStorage%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.DataProtection.AzureDataProtectionBuilderExtensions.PersistKeysToAzureBlobStorage%252A) overload that accepts a blob URI with a SAS token:

```csharp
builder.Services.AddDataProtection()
    .SetApplicationName("{APPLICATION NAME}")
    .PersistKeysToAzureBlobStorage(new Uri("{BLOB URI WITH SAS}"));
```



**Applies to: < aspnetcore-6.0**

In `Startup.ConfigureServices`:

```csharp
TokenCredential? credential;

if (_env.IsProduction())
{
    credential = new ManagedIdentityCredential("{MANAGED IDENTITY CLIENT ID}");
}
else
{
    // Local development and testing only
    DefaultAzureCredentialOptions options = new()
    {
        // Specify the tenant ID to use the dev credentials when running the app locally
        // in Visual Studio.
        VisualStudioTenantId = "{TENANT ID}",
        SharedTokenCacheTenantId = "{TENANT ID}"
    };

    credential = new DefaultAzureCredential(options);
}

services.AddDataProtection()
    .SetApplicationName("{APPLICATION NAME}")
    .PersistKeysToAzureBlobStorage(new Uri("{BLOB URI}"), credential);
```

`{MANAGED IDENTITY CLIENT ID}`: The Azure Managed Identity Client ID (GUID).

`{TENANT ID}`: Tenant ID.

`{APPLICATION NAME}`: [Microsoft.AspNetCore.DataProtection.DataProtectionBuilderExtensions.SetApplicationName%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.DataProtection.DataProtectionBuilderExtensions.SetApplicationName%252A) sets the unique name of this app within the data protection system. The value should match across deployments of the app.

`{BLOB URI}`: Full URI to the key file. The URI is generated by Azure Storage when you create the key file. Do not use a SAS.

Example:

> https\://contoso.blob.core.windows.net/data-protection/keys.xml

**Alternative shared-access signature (SAS) approach**: As an alternative to using a Managed Identity for access to the key blob in Azure Blob Storage, you can call the [Microsoft.AspNetCore.DataProtection.AzureDataProtectionBuilderExtensions.PersistKeysToAzureBlobStorage%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.DataProtection.AzureDataProtectionBuilderExtensions.PersistKeysToAzureBlobStorage%252A) overload that accepts a blob URI with a SAS token:

```csharp
services.AddDataProtection()
    .SetApplicationName("{APPLICATION NAME}")
    .PersistKeysToAzureBlobStorage(new Uri("{BLOB URI WITH SAS}"));
```



`{APPLICATION NAME}`: [Microsoft.AspNetCore.DataProtection.DataProtectionBuilderExtensions.SetApplicationName%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.DataProtection.DataProtectionBuilderExtensions.SetApplicationName%252A) sets the unique name of this app within the data protection system. The value should match across deployments of the app.

`{BLOB URI WITH SAS}`: The full URI where the key file should be stored with the SAS token as a query string parameter. The URI is generated by Azure Storage when you request a SAS for the uploaded key file. In the following example, the container name is `data-protection`, and the storage account name is `contoso`. The key file is named `keys.xml`. The shared access signature (SAS) query string is at the end of the URI (`{SHARED ACCESS SIGNATURE}` placeholder).

Example:

> https\://contoso.blob.core.windows.net/data-protection/keys.xml{SHARED ACCESS SIGNATURE}

If the web app is running as an Azure service, a connection string can be used to authenticate to Azure Storage using [Azure.Storage.Blobs.BlobContainerClient](https://learn.microsoft.com/search/?terms=Azure.Storage.Blobs.BlobContainerClient), as seen in the following example.

> **Warning:**
> This article shows the use of connection strings. When a local database is used for development and testing, database user authentication via the connection string isn't required.
> In production environments, connection strings sometimes include a password for authenticating database access or database operations. A resource owner password credential (ROPC) in a connection string is a security risk that should be avoided in production apps. Production apps should use the most secure authentication flow available.
> For more information on authentication for apps deployed to test or production environments, see [security/index#secure-authentication-flows](https://learn.microsoft.com/search/?terms=security%2Findex%23secure-authentication-flows).


The optional call to [Azure.Storage.Blobs.BlobContainerClient.CreateIfNotExistsAsync%2A](https://learn.microsoft.com/search/?terms=Azure.Storage.Blobs.BlobContainerClient.CreateIfNotExistsAsync%252A) provisions the container automatically if it doesn't exist.

The connection string (`{CONNECTION STRING}` placeholder) to the storage account can be found in the Entra or Azure portal under the "Access Keys" section or by running the following Azure CLI command:

```azurecli
az storage account show-connection-string --name <account_name> --resource-group <resource_group>
```

**Applies to: \>= aspnetcore-6.0**

In the `Program` file where services are registered:

```csharp
string connectionString = "{CONNECTION STRING}";
string containerName = "{CONTAINER NAME}";
string blobName = "keys.xml";
var container = new BlobContainerClient(connectionString, containerName);
await container.CreateIfNotExistsAsync();
BlobClient blobClient = container.GetBlobClient(blobName);

builder.Services.AddDataProtection().PersistKeysToAzureBlobStorage(blobClient);
```



**Applies to: < aspnetcore-6.0**

In `Startup.ConfigureServices`:

```csharp
string connectionString = "{CONNECTION STRING}";
string containerName = "{CONTAINER NAME}";
string blobName = "keys.xml";
var container = new BlobContainerClient(connectionString, containerName);
await container.CreateIfNotExistsAsync();
BlobClient blobClient = container.GetBlobClient(blobName);

services.AddDataProtection().PersistKeysToAzureBlobStorage(blobClient);
```



## Redis

**Applies to: \>= aspnetcore-2.2**

The [Microsoft.AspNetCore.DataProtection.StackExchangeRedis](https://www.nuget.org/packages/Microsoft.AspNetCore.DataProtection.StackExchangeRedis/) package allows storing data protection keys in a Redis cache. Keys can be shared across several instances of a web app. Apps can share authentication cookies or CSRF protection across multiple servers.



**Applies to: < aspnetcore-2.2**

The [Microsoft.AspNetCore.DataProtection.Redis](https://www.nuget.org/packages/Microsoft.AspNetCore.DataProtection.Redis/) package allows storing data protection keys in a Redis cache. Keys can be shared across several instances of a web app. Apps can share authentication cookies or CSRF protection across multiple servers.



**Applies to: \>= aspnetcore-2.2**

To configure on Redis, call one of the [Microsoft.AspNetCore.DataProtection.StackExchangeRedisDataProtectionBuilderExtensions.PersistKeysToStackExchangeRedis%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.DataProtection.StackExchangeRedisDataProtectionBuilderExtensions.PersistKeysToStackExchangeRedis%252A) overloads:

```csharp
public void ConfigureServices(IServiceCollection services)
{
    var redis = ConnectionMultiplexer.Connect("<URI>");
    services.AddDataProtection()
        .PersistKeysToStackExchangeRedis(redis, "DataProtection-Keys");
}
```



**Applies to: < aspnetcore-2.2**

To configure on Redis, call one of the [Microsoft.AspNetCore.DataProtection.RedisDataProtectionBuilderExtensions.PersistKeysToRedis%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.DataProtection.RedisDataProtectionBuilderExtensions.PersistKeysToRedis%252A) overloads:

```csharp
public void ConfigureServices(IServiceCollection services)
{
    var redis = ConnectionMultiplexer.Connect("<URI>");
    services.AddDataProtection()
        .PersistKeysToRedis(redis, "DataProtection-Keys");
}
```



> **Warning:**
> When using Redis to persist data protection keys, be aware that Redis doesn't persist data by default when restarting. This can cause Data Protection to issue new keys, invalidating previously protected data.
> 
> You can configure Redis to enable data persistence to mitigate this: Redis documentation has information on [how to configure persistence](https://redis.io/docs/latest/operate/oss_and_stack/management/persistence/).
> If you're using [Azure Managed Redis](https://learn.microsoft.com/azure/redis/how-to-persistence), ensure you have enabled data persistence. [Azure Cache for Redis](https://learn.microsoft.com/azure/azure-cache-for-redis/cache-how-to-premium-persistence?tabs=premium) needs a premium or higher tier to enable data persistence.

For more information, see the following topics:

* [StackExchange.Redis ConnectionMultiplexer](https://github.com/StackExchange/StackExchange.Redis/blob/main/docs/Basics.md)
* [Azure Redis Cache](https://learn.microsoft.com/azure/redis/dotnet-how-to-use-azure-redis-cache)
* [ASP.NET Core DataProtection samples](https://github.com/dotnet/AspNetCore/tree/2.2.0/src/DataProtection/samples)

## Registry

**Only applies to Windows deployments.**

Sometimes the app might not have write access to the file system. Consider a scenario where an app is running as a virtual service account (such as *w3wp.exe*'s app pool identity). In these cases, the administrator can provision a registry key that's accessible by the service account identity. Call the [Microsoft.AspNetCore.DataProtection.DataProtectionBuilderExtensions.PersistKeysToRegistry%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.DataProtection.DataProtectionBuilderExtensions.PersistKeysToRegistry%252A) extension method as shown below. Provide a [Microsoft.AspNetCore.DataProtection.Repositories.RegistryXmlRepository.RegistryKey%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.DataProtection.Repositories.RegistryXmlRepository.RegistryKey%252A) pointing to the location where cryptographic keys should be stored:

```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddDataProtection()
        .PersistKeysToRegistry(Registry.CurrentUser.OpenSubKey(@"SOFTWARE\Sample\keys", true));
}
```

> **Important:**
> We recommend using [Windows DPAPI](key-encryption-at-rest.md) to encrypt the keys at rest.

**Applies to: \>= aspnetcore-2.2**

## Entity Framework Core

The [Microsoft.AspNetCore.DataProtection.EntityFrameworkCore](https://www.nuget.org/packages/Microsoft.AspNetCore.DataProtection.EntityFrameworkCore/) package provides a mechanism for storing data protection keys to a database using Entity Framework Core. The `Microsoft.AspNetCore.DataProtection.EntityFrameworkCore` NuGet package must be added to the project file, it's not part of the [Microsoft.AspNetCore.App metapackage](../../../fundamentals/metapackage-app.md).

With this package, keys can be shared across multiple instances of a web app.

To configure the EF Core provider, call the [Microsoft.AspNetCore.DataProtection.EntityFrameworkCoreDataProtectionExtensions.PersistKeysToDbContext%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.DataProtection.EntityFrameworkCoreDataProtectionExtensions.PersistKeysToDbContext%252A) method:

[Main (complete source file; reference: key-storage-providers/sample/Startup.cs?name=snippet\&highlight=13-20)](../../../../_code/aspnetcore/security/data-protection/implementation/key-storage-providers/sample/Startup.cs.md)

The generic parameter, `TContext`, must inherit from [Microsoft.EntityFrameworkCore.DbContext](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContext) and implement [Microsoft.AspNetCore.DataProtection.EntityFrameworkCore.IDataProtectionKeyContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.DataProtection.EntityFrameworkCore.IDataProtectionKeyContext):

[Main (complete source file; reference: key-storage-providers/sample/MyKeysContext.cs)](../../../../_code/aspnetcore/security/data-protection/implementation/key-storage-providers/sample/MyKeysContext.cs.md)

Create the `DataProtectionKeys` table.

# [Visual Studio](#tab/visual-studio)

Execute the following commands in the **Package Manager Console** (PMC) window:

```powershell
Add-Migration AddDataProtectionKeys -Context MyKeysContext
Update-Database -Context MyKeysContext
```

# [.NET CLI](#tab/net-cli)

Execute the following commands in a command shell:

```dotnetcli
dotnet ef migrations add AddDataProtectionKeys --context MyKeysContext
dotnet ef database update --context MyKeysContext
```

---

`MyKeysContext` is the `DbContext` defined in the preceding code sample. If you're using a `DbContext` with a different name, substitute your `DbContext` name for `MyKeysContext`.

The `DataProtectionKeys` class/entity adopts the structure shown in the following table.

| Property/Field | CLR Type | SQL Type |
| --- | --- | --- |
| `Id` | `int` | `int`, PK, `IDENTITY(1,1)`, not null |
| `FriendlyName` | `string` | `nvarchar(MAX)`, null |
| `Xml` | `string` | `nvarchar(MAX)`, null |



## Custom key repository

If the in-box mechanisms aren't appropriate, the developer can specify their own key persistence mechanism by providing a custom [Microsoft.AspNetCore.DataProtection.Repositories.IXmlRepository](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.DataProtection.Repositories.IXmlRepository).
