---
title: Application log enricher
description: Learn how to use the application log enricher to add application-specific information to your telemetry in .NET.
ms.date: 11/12/2025
---

# Application log enricher

The application log enricher augments telemetry logs with application-specific information such as service host details and application metadata. This enricher provides essential context about your application's deployment environment, version information, and service identity that helps with monitoring, debugging, and operational visibility.

You can register the enrichers in an IoC container, and all registered enrichers are automatically picked up by respective telemetry logs, where they enrich the telemetry information.

## Prerequisites

To function properly, this enricher requires that [application metadata](../diagnostics/ambient-metadata/application-metadata.md) is configured and available. The application metadata provides the foundational information that the enricher uses to populate telemetry dimensions.

## Install the package

To get started, install the [📦 Microsoft.Extensions.Telemetry](https://www.nuget.org/packages/Microsoft.Extensions.Telemetry) NuGet package:

### [.NET CLI](#tab/dotnet-cli)

```dotnetcli
dotnet add package Microsoft.Extensions.Telemetry
```

Or, if you're using .NET 10+ SDK:

```dotnetcli
dotnet package add Microsoft.Extensions.Telemetry
```

### [PackageReference](#tab/package-reference)

```xml
<PackageReference Include="Microsoft.Extensions.Telemetry"
                  Version="*" /> <!-- Adjust version -->
```

---

## Step-by-step configuration

Follow these steps to configure the application log enricher in your application:

### 1. Configure application metadata

First, configure the [Application Metadata](../diagnostics/ambient-metadata/application-metadata.md) by calling the [Microsoft.Extensions.Hosting.ApplicationMetadataHostBuilderExtensions.UseApplicationMetadata*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.ApplicationMetadataHostBuilderExtensions.UseApplicationMetadata*) methods:

```csharp
var builder = Host.CreateApplicationBuilder(args);
builder.UseApplicationMetadata()
```

This method automatically picks up values from the [Microsoft.Extensions.Hosting.IHostEnvironment](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.IHostEnvironment) and saves them to the default configuration section `ambientmetadata:application`.

Alternatively, you can use the [Microsoft.Extensions.Configuration.ApplicationMetadataConfigurationBuilderExtensions.AddApplicationMetadata(Microsoft.Extensions.Configuration.IConfigurationBuilder,Microsoft.Extensions.Hosting.IHostEnvironment,System.String)](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Configuration.ApplicationMetadataConfigurationBuilderExtensions.AddApplicationMetadata(Microsoft.Extensions.Configuration.IConfigurationBuilder%2CMicrosoft.Extensions.Hosting.IHostEnvironment%2CSystem.String)) method, which registers a configuration provider for application metadata by picking up the values from the [Microsoft.Extensions.Hosting.IHostEnvironment](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.IHostEnvironment) and adding them to the given configuration section name. Then you use the [Microsoft.Extensions.DependencyInjection.ApplicationMetadataServiceCollectionExtensions.AddApplicationMetadata(Microsoft.Extensions.DependencyInjection.IServiceCollection,Microsoft.Extensions.Configuration.IConfigurationSection)](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.ApplicationMetadataServiceCollectionExtensions.AddApplicationMetadata(Microsoft.Extensions.DependencyInjection.IServiceCollection%2CMicrosoft.Extensions.Configuration.IConfigurationSection)) method to register the metadata in the dependency injection container, which allows you to pass [Microsoft.Extensions.Configuration.IConfigurationSection](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Configuration.IConfigurationSection) separately:

```csharp
var builder = Host.CreateApplicationBuilder(args)
    .ConfigureAppConfiguration(static (context, builder) =>
        builder.AddApplicationMetadata(context.HostingEnvironment));

builder.Services.AddApplicationMetadata(
    builder.Configuration.GetSection("ambientmetadata:application")));
```

### 2. Provide additional configuration (optional)

You can provide additional configuration via `appsettings.json`. There are two properties in the [Application Metadata](../diagnostics/ambient-metadata/application-metadata.md) that don't get values automatically: `BuildVersion` and `DeploymentRing`. If you want to use them, provide values manually:

[language="json" source="snippets/applicationlogenricher/appsettings.json" range="2-7"::: (complete source file; reference: snippets/applicationlogenricher/appsettings.json)](../../../_code/docs/core/enrichment/snippets/applicationlogenricher/appsettings.json.md)

### 3. Register the application log enricher

Register the log enricher into the dependency injection container by calling the [Microsoft.Extensions.DependencyInjection.ApplicationEnricherServiceCollectionExtensions.AddApplicationLogEnricher(Microsoft.Extensions.DependencyInjection.IServiceCollection)](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.ApplicationEnricherServiceCollectionExtensions.AddApplicationLogEnricher(Microsoft.Extensions.DependencyInjection.IServiceCollection)) method:

```csharp
serviceCollection.AddApplicationLogEnricher();
```

You can enable or disable individual options of the enricher:

```csharp
serviceCollection.AddApplicationLogEnricher(options =>
{
    options.BuildVersion = true;
    options.DeploymentRing = true;
});
```

> **Note:**
> If you're using .NET 9 or an earlier version, call the [Microsoft.Extensions.DependencyInjection.ApplicationEnricherServiceCollectionExtensions.AddServiceLogEnricher(Microsoft.Extensions.DependencyInjection.IServiceCollection)](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.ApplicationEnricherServiceCollectionExtensions.AddServiceLogEnricher(Microsoft.Extensions.DependencyInjection.IServiceCollection)) method instead.

Alternatively, configure options using `appsettings.json`:

[language="json" source="snippets/applicationlogenricher/appsettings.json" range="8-11"::: (complete source file; reference: snippets/applicationlogenricher/appsettings.json)](../../../_code/docs/core/enrichment/snippets/applicationlogenricher/appsettings.json.md)

Next, apply the configuration.

```csharp
var builder = Host.CreateApplicationBuilder(args);
builder.Services.AddApplicationLogEnricher(builder.Configuration.GetSection("ApplicationLogEnricherOptions"));
```

### `ApplicationLogEnricherOptions` configuration options

The application log enricher supports several configuration options through the [Microsoft.Extensions.Diagnostics.Enrichment.ApplicationLogEnricherOptions](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Diagnostics.Enrichment.ApplicationLogEnricherOptions) class:

| Property | Default value | Dimension name | Description |
| --- | --- | --- | --- |
| `EnvironmentName` | true | `deployment.environment` | Environment name from hosting environment or configuration |
| `ApplicationName` | true | `service.name` | Application name from hosting environment or configuration |
| `BuildVersion` | false | `service.version` | Build version from configuration |
| `DeploymentRing` | false | `DeploymentRing` | Deployment ring from configuration |

By default, the enricher includes `EnvironmentName` and `ApplicationName` in log entries. The `BuildVersion` and `DeploymentRing` properties are disabled by default and must be explicitly enabled if needed.

## Complete example

Here's a complete example showing how to set up the application log enricher:

**appsettings.json:**

[language="json" source="snippets/applicationlogenricher/appsettings.json"::: (complete source file; reference: snippets/applicationlogenricher/appsettings.json)](../../../_code/docs/core/enrichment/snippets/applicationlogenricher/appsettings.json.md)

**Program.cs:**

[language="csharp" source="snippets/applicationlogenricher/Program.cs" ::: (complete source file; reference: snippets/applicationlogenricher/Program.cs)](../../../_code/docs/core/enrichment/snippets/applicationlogenricher/Program.cs.md)

### Enriched log output

With the application log enricher configured, your log output includes service-specific dimensions:

[language="json" source="snippets/applicationlogenricher/output-full.json" highlight="8-11" ::: (complete source file; reference: snippets/applicationlogenricher/output-full.json)](../../../_code/docs/core/enrichment/snippets/applicationlogenricher/output-full.json.md)

## Next steps

- Learn about [application metadata configuration](../diagnostics/ambient-metadata/application-metadata.md)
