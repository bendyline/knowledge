---
title: Implement a custom configuration provider
description: Learn how to implement a custom configuration provider in .NET apps. Explore a database configuration provider that uses Entity Framework Core.
ms.date: 10/20/2025
ms.topic: how-to
---

# Implement a custom configuration provider in .NET

There are many [configuration providers](configuration-providers.md) available for common configuration sources such as JSON, XML, and INI files. You may need to implement a custom configuration provider when one of the available providers doesn't suit your application needs. In this article, you'll learn how to implement a custom configuration provider that relies on a database as its configuration source.

## Custom configuration provider

The sample app demonstrates how to create a basic configuration provider that reads configuration key-value pairs from a database using [Entity Framework (EF) Core](https://learn.microsoft.com/ef/core).

The provider has the following characteristics:

- The EF in-memory database is used for demonstration purposes.
  - To use a database that requires a connection string, get a connection string from an interim configuration.
- The provider reads a database table into configuration at startup. The provider doesn't query the database on a per-key basis.
- Reload-on-change isn't implemented, so updating the database after the app has started will not affect the app's configuration.

Define a `Settings` record type entity for storing configuration values in the database. For example, you could add a *Settings.cs* file in your *Models* folder:

[language="csharp" source="snippets/configuration/custom-provider/Models/Settings.cs"::: (complete source file; reference: snippets/configuration/custom-provider/Models/Settings.cs)](../../../_code/docs/core/extensions/snippets/configuration/custom-provider/Models/Settings.cs.md)

For information on record types, see [Record types in C#](../../csharp/language-reference/builtin-types/record.md).

Add an `EntityConfigurationContext` to store and access the configured values.

*Providers/EntityConfigurationContext.cs*:

[language="csharp" source="snippets/configuration/custom-provider/Providers/EntityConfigurationContext.cs"::: (complete source file; reference: snippets/configuration/custom-provider/Providers/EntityConfigurationContext.cs)](../../../_code/docs/core/extensions/snippets/configuration/custom-provider/Providers/EntityConfigurationContext.cs.md)

By overriding [Microsoft.EntityFrameworkCore.DbContext.OnConfiguring(Microsoft.EntityFrameworkCore.DbContextOptionsBuilder)](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContext.OnConfiguring(Microsoft.EntityFrameworkCore.DbContextOptionsBuilder)) you can use the appropriate database connection. For example, if a connection string was provided you could connect to SQL Server, otherwise you could rely on an in-memory database.

Create a class that implements [Microsoft.Extensions.Configuration.IConfigurationSource](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Configuration.IConfigurationSource).

*Providers/EntityConfigurationSource.cs*:

[language="csharp" source="snippets/configuration/custom-provider/Providers/EntityConfigurationSource.cs"::: (complete source file; reference: snippets/configuration/custom-provider/Providers/EntityConfigurationSource.cs)](../../../_code/docs/core/extensions/snippets/configuration/custom-provider/Providers/EntityConfigurationSource.cs.md)

Create the custom configuration provider by inheriting from [Microsoft.Extensions.Configuration.ConfigurationProvider](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Configuration.ConfigurationProvider). The configuration provider initializes the database when it's empty. Since configuration keys are case-insensitive, the dictionary used to initialize the database is created with the case-insensitive comparer ([StringComparer.OrdinalIgnoreCase](https://learn.microsoft.com/search/?terms=System.StringComparer.OrdinalIgnoreCase)).

*Providers/EntityConfigurationProvider.cs*:

[language="csharp" source="snippets/configuration/custom-provider/Providers/EntityConfigurationProvider.cs"::: (complete source file; reference: snippets/configuration/custom-provider/Providers/EntityConfigurationProvider.cs)](../../../_code/docs/core/extensions/snippets/configuration/custom-provider/Providers/EntityConfigurationProvider.cs.md)

An `AddEntityConfiguration` extension method permits adding the configuration source to the underlying `ConfigurationManager` instance.

*Extensions/ConfigurationManagerExtensions.cs*:

[language="csharp" source="snippets/configuration/custom-provider/Extensions/ConfigurationManagerExtensions.cs"::: (complete source file; reference: snippets/configuration/custom-provider/Extensions/ConfigurationManagerExtensions.cs)](../../../_code/docs/core/extensions/snippets/configuration/custom-provider/Extensions/ConfigurationManagerExtensions.cs.md)

Since the [Microsoft.Extensions.Configuration.ConfigurationManager](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Configuration.ConfigurationManager) is both an implementation of [Microsoft.Extensions.Configuration.IConfigurationBuilder](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Configuration.IConfigurationBuilder) and [Microsoft.Extensions.Configuration.IConfigurationRoot](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Configuration.IConfigurationRoot), the extension method can access the connection strings configuration and add the `EntityConfigurationSource`.

The following code shows how to use the custom `EntityConfigurationProvider` in *Program.cs*:

[language="csharp" source="snippets/configuration/custom-provider/Program.cs" highlight="9"::: (complete source file; reference: snippets/configuration/custom-provider/Program.cs)](../../../_code/docs/core/extensions/snippets/configuration/custom-provider/Program.cs.md)

## Consume provider

To consume the custom configuration provider, you can use the [options pattern](options.md). With the sample app in place, define an options object to represent the widget settings.

[language="csharp" source="snippets/configuration/custom-provider/WidgetOptions.cs"::: (complete source file; reference: snippets/configuration/custom-provider/WidgetOptions.cs)](../../../_code/docs/core/extensions/snippets/configuration/custom-provider/WidgetOptions.cs.md)

A call to [Microsoft.Extensions.DependencyInjection.OptionsConfigurationServiceCollectionExtensions.Configure*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.OptionsConfigurationServiceCollectionExtensions.Configure*) registers a configuration instance, which `TOptions` binds against.

[language="csharp" source="snippets/configuration/custom-provider/Program.cs" highlight="14,16-19"::: (complete source file; reference: snippets/configuration/custom-provider/Program.cs)](../../../_code/docs/core/extensions/snippets/configuration/custom-provider/Program.cs.md)

The preceding code configures the `WidgetOptions` object from the `"WidgetOptions"` section of the configuration. This enables the options pattern, exposing a dependency injection-ready `IOptions<WidgetOptions>` representation of the EF settings. The options are ultimately provided from the custom configuration provider.

## See also

- [Configuration in .NET](configuration.md)
- [Configuration providers in .NET](configuration-providers.md)
- [Options pattern in .NET](options.md)
- [Dependency injection in .NET](dependency-injection/overview.md)
