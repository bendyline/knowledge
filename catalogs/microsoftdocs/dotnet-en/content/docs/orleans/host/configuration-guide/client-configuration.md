---
title: Client configuration
description: Learn about client configurations in .NET Orleans.
ms.date: 01/21/2026
ms.topic: how-to
zone_pivot_groups: orleans-version
ms.custom: sfi-ropc-nochange
---

# Client configuration

**Applies to: orleans-7-0,orleans-8-0,orleans-9-0,orleans-10-0**


Configure a client for connecting to a cluster of silos and sending requests to grains programmatically via an [Microsoft.Extensions.Hosting.IHostBuilder](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.IHostBuilder) and several supplemental option classes. Like silo options, client option classes follow the [Options pattern in .NET](../../../core/extensions/options.md).



**Applies to: orleans-3-x**


Configure a client for connecting to a cluster of silos and sending requests to grains programmatically via an [Orleans.ClientBuilder](https://learn.microsoft.com/search/?terms=Orleans.ClientBuilder) and several supplemental option classes. Like silo options, client option classes follow the [Options pattern in .NET](../../../core/extensions/options.md).



> **Tip:**
> If you just want to start a local silo and a local client for development purposes, see [Local development configuration](local-development-configuration.md).

**Applies to: orleans-8-0,orleans-9-0,orleans-10-0**


> **Tip:**
> If you're using [Aspire](../aspire-integration.md), client configuration is handled automatically. Aspire injects [Orleans.Configuration.ClusterOptions.ClusterId](https://learn.microsoft.com/search/?terms=Orleans.Configuration.ClusterOptions.ClusterId), [Orleans.Configuration.ClusterOptions.ServiceId](https://learn.microsoft.com/search/?terms=Orleans.Configuration.ClusterOptions.ServiceId), and clustering provider settings via environment variables, so you can use the simpler parameterless [Microsoft.Extensions.Hosting.OrleansClientGenericHostExtensions.UseOrleansClient*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.OrleansClientGenericHostExtensions.UseOrleansClient*) method. See [Orleans and Aspire integration](../aspire-integration.md) for the recommended approach.



Add the [Microsoft.Orleans.Clustering.AzureStorage](https://www.nuget.org/packages/Microsoft.Orleans.Clustering.AzureStorage) NuGet package to your client project.

There are several key aspects of client configuration:

- Orleans clustering information
- Clustering provider
- Application parts

Example of a client configuration:

**Applies to: orleans-7-0,orleans-8-0,orleans-9-0,orleans-10-0**


### [Microsoft Entra ID (recommended)](#tab/entra-id)

Using a `TokenCredential` with a service URI is the recommended approach. This pattern avoids storing secrets in configuration and leverages Microsoft Entra ID for secure authentication.

[Azure.Identity.DefaultAzureCredential](https://learn.microsoft.com/search/?terms=Azure.Identity.DefaultAzureCredential) provides a credential chain that works seamlessly across local development and production environments. During development, it uses your Azure CLI or Visual Studio credentials. In production on Azure, it automatically uses the managed identity assigned to your resource.

<!-- Azure credential chain guidance -->

> **Tip:**
> [Azure.Identity.DefaultAzureCredential](https://learn.microsoft.com/search/?terms=Azure.Identity.DefaultAzureCredential) works seamlessly across local development and production. In development, it uses your Azure CLI or Visual Studio credentials. In production on Azure, it automatically uses the resource's managed identity. For improved performance and debuggability in production, consider replacing it with a specific credential like [Azure.Identity.ManagedIdentityCredential](https://learn.microsoft.com/search/?terms=Azure.Identity.ManagedIdentityCredential). For more information, see [Usage guidance for DefaultAzureCredential](../../../azure/sdk/authentication/credential-chains.md#usage-guidance-for-defaultazurecredential).


```csharp
using Azure.Identity;

var builder = Host.CreateApplicationBuilder(args);
builder.UseOrleansClient(clientBuilder =>
{
    clientBuilder.Configure<ClusterOptions>(options =>
    {
        options.ClusterId = "my-first-cluster";
        options.ServiceId = "MyOrleansService";
    })
    .UseAzureStorageClustering(options =>
    {
        options.ConfigureTableServiceClient(
            new Uri("https://<your-storage-account>.table.core.windows.net"),
            new DefaultAzureCredential());
    });
});

using var host = builder.Build();
await host.StartAsync();
```

### [Connection string](#tab/connection-string)

```csharp
var builder = Host.CreateApplicationBuilder(args);
builder.UseOrleansClient(clientBuilder =>
{
    clientBuilder.Configure<ClusterOptions>(options =>
    {
        options.ClusterId = "my-first-cluster";
        options.ServiceId = "MyOrleansService";
    })
    .UseAzureStorageClustering(
        options => options.ConfigureTableServiceClient(
            builder.Configuration["ORLEANS_AZURE_STORAGE_CONNECTION_STRING"]));
});

using var host = builder.Build();
await host.StartAsync();
```

---



**Applies to: orleans-3-x**


[language="csharp" source="snippets-v3/client-config/Configuration.cs" id="full_client_config"::: (complete source file; reference: snippets-v3/client-config/Configuration.cs)](../../../../_code/docs/orleans/host/configuration-guide/snippets-v3/client-config/Configuration.cs.md)



Let's break down the steps used in this sample:

## Orleans clustering information

```csharp
    .Configure<ClusterOptions>(options =>
    {
        options.ClusterId = "orleans-docker";
        options.ServiceId = "AspNetSampleApp";
    })
```

Here, we set two things:

- The [Orleans.Configuration.ClusterOptions.ClusterId](https://learn.microsoft.com/search/?terms=Orleans.Configuration.ClusterOptions.ClusterId) to `"my-first-cluster"`: This is a unique ID for the Orleans cluster. All clients and silos using this ID can directly talk to each other. Some might choose to use a different [Orleans.Configuration.ClusterOptions.ClusterId](https://learn.microsoft.com/search/?terms=Orleans.Configuration.ClusterOptions.ClusterId) for each deployment, for example.
- The [Orleans.Configuration.ClusterOptions.ServiceId](https://learn.microsoft.com/search/?terms=Orleans.Configuration.ClusterOptions.ServiceId) to `"AspNetSampleApp"`: This is a unique ID for your application, used by some providers (e.g., persistence providers). This ID should remain stable across deployments.

## Clustering provider

**Applies to: orleans-7-0,orleans-8-0,orleans-9-0,orleans-10-0**


### [Microsoft Entra ID (recommended)](#tab/entra-id)

<!-- Azure credential chain guidance -->

> **Tip:**
> [Azure.Identity.DefaultAzureCredential](https://learn.microsoft.com/search/?terms=Azure.Identity.DefaultAzureCredential) works seamlessly across local development and production. In development, it uses your Azure CLI or Visual Studio credentials. In production on Azure, it automatically uses the resource's managed identity. For improved performance and debuggability in production, consider replacing it with a specific credential like [Azure.Identity.ManagedIdentityCredential](https://learn.microsoft.com/search/?terms=Azure.Identity.ManagedIdentityCredential). For more information, see [Usage guidance for DefaultAzureCredential](../../../azure/sdk/authentication/credential-chains.md#usage-guidance-for-defaultazurecredential).


```csharp
clientBuilder.UseAzureStorageClustering(options =>
{
    options.ConfigureTableServiceClient(
        new Uri("https://<your-storage-account>.table.core.windows.net"),
        new DefaultAzureCredential());
});
```

### [Connection string](#tab/connection-string)

```csharp
.UseAzureStorageClustering(
    options => options.ConfigureTableServiceClient(connectionString));
```

---



**Applies to: orleans-3-x**


[language="csharp" source="snippets-v3/client-config/Configuration.cs" id="azure_clustering"::: (complete source file; reference: snippets-v3/client-config/Configuration.cs)](../../../../_code/docs/orleans/host/configuration-guide/snippets-v3/client-config/Configuration.cs.md)



The client discovers all available gateways in the cluster using this provider. Several providers are available; here, we use the Azure Table provider.

For more information, see [Server configuration](server-configuration.md).

**Applies to: orleans-3-x**


## Application parts

[language="csharp" source="snippets-v3/client-config/Configuration.cs" id="application_parts"::: (complete source file; reference: snippets-v3/client-config/Configuration.cs)](../../../../_code/docs/orleans/host/configuration-guide/snippets-v3/client-config/Configuration.cs.md)

For more information, see [Server configuration](server-configuration.md).
