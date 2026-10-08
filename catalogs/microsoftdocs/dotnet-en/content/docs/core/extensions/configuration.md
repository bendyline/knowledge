---
title: Configuration
description: Learn how to use the Configuration API to configure .NET applications. Explore various inbuilt configuration providers.
ms.date: 08/27/2026
ms.topic: overview
ai-usage: ai-assisted
---

# Configuration in .NET

Configuration in .NET is performed using one or more [configuration providers](#configuration-providers). Configuration providers read configuration data from key-value pairs using various configuration sources:

- Settings files, such as *appsettings.json*
- Environment variables
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/overview)
- [Azure App Configuration](https://learn.microsoft.com/azure/azure-app-configuration/overview)
- Command-line arguments
- Custom providers (installed or created)
- Directory files
- In-memory .NET objects
- Third-party providers

> **Note:**
> For information about configuring the .NET runtime itself, see [.NET Runtime configuration settings](../runtime-config/index.md).

## Concepts and abstractions

Given one or more configuration sources, the [Microsoft.Extensions.Configuration.IConfiguration](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Configuration.IConfiguration) type provides a unified view of the configuration data. Configuration is read-only, and the configuration pattern isn't designed to be programmatically writable. The `IConfiguration` interface is a single representation of all the configuration sources, as shown in the following diagram:

The \`IConfiguration\` interface is a single representation of all the configuration sources.

## Configure console apps

.NET console apps created using the [dotnet new](../tools/dotnet-new.md) command template or Visual Studio by default *don't* expose configuration capabilities. To add configuration in a new .NET console application, [add a package reference](../tools/dotnet-package-add.md) to [📦 Microsoft.Extensions.Configuration](https://www.nuget.org/packages/Microsoft.Extensions.Configuration). This package is the foundation for configuration in .NET apps. It provides the [Microsoft.Extensions.Configuration.ConfigurationBuilder](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Configuration.ConfigurationBuilder) and related types.

[source="snippets/configuration/console-basic-builder/Program.cs"::: (complete source file; reference: snippets/configuration/console-basic-builder/Program.cs)](../../../_code/docs/core/extensions/snippets/configuration/console-basic-builder/Program.cs.md)

The preceding code:

- Creates a new [Microsoft.Extensions.Configuration.ConfigurationBuilder](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Configuration.ConfigurationBuilder) instance.
- Adds an in-memory collection of key-value pairs to the configuration builder.
- Calls the [Microsoft.Extensions.Configuration.ConfigurationBuilder.Build](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Configuration.ConfigurationBuilder.Build) method to create an [Microsoft.Extensions.Configuration.IConfiguration](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Configuration.IConfiguration) instance.
- Writes the value of the `SomeKey` key to the console.

While this example uses an in-memory configuration, there are many configuration providers available, exposing functionality for file-based, environment variables, command-line arguments, and other configuration sources. For more information, see [Configuration providers in .NET](configuration-providers.md).

## Alternative hosting approach

Commonly, your apps will do more than just read configuration. They'll likely use dependency injection, logging, and other services. The [.NET Generic Host](generic-host.md) approach is recommended for apps that use these services. Instead, consider [adding a package reference](../tools/dotnet-package-add.md) to [📦 Microsoft.Extensions.Hosting](https://www.nuget.org/packages/Microsoft.Extensions.Hosting). Modify the *Program.cs* file to match the following code:

[source="snippets/configuration/console/Program.cs" highlight="3"::: (complete source file; reference: snippets/configuration/console/Program.cs)](../../../_code/docs/core/extensions/snippets/configuration/console/Program.cs.md)

The [Microsoft.Extensions.Hosting.Host.CreateApplicationBuilder(System.String\[\])](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.Host.CreateApplicationBuilder(System.String%5B%5D)) method provides default configuration for the app in the following order, from highest to lowest priority:

1. Command-line arguments using the [Command-line configuration provider](configuration-providers.md#command-line-configuration-provider).
1. Environment variables using the [Environment Variables configuration provider](configuration-providers.md#environment-variable-configuration-provider).
1. [App secrets](https://learn.microsoft.com/aspnet/core/security/app-secrets) when the app runs in the `Development` environment.
1. *appsettings.*`Environment`*.json* using the [JSON configuration provider](configuration-providers.md#file-configuration-provider). For example, *appsettings*.***Production***.*json* and *appsettings*.***Development***.*json*.
1. *appsettings.json* using the [JSON configuration provider](configuration-providers.md#file-configuration-provider).
1. [ChainedConfigurationProvider](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Configuration.ChainedConfigurationSource) : Adds an existing `IConfiguration` as a source.

Adding a configuration provider overrides previous configuration values. For example, the [Command-line configuration provider](configuration-providers.md#command-line-configuration-provider) overrides all values from other providers because it's added last. If `SomeKey` is set in both *appsettings.json* and the environment, the environment value is used because it was added after *appsettings.json*.

## Binding

One of the key advantages of using the .NET configuration abstractions is the ability to *bind* configuration values to instances of .NET objects. For example, the JSON configuration provider can be used to map *appsettings.json* files to .NET objects and is used with [dependency injection](dependency-injection/overview.md). This enables the [options pattern](options.md), which uses classes to provide strongly typed access to groups of related settings. The default binder is reflection-based, but there's a [source generator alternative](configuration-generator.md) that's easy to enable.

.NET configuration provides various abstractions. Consider the following interfaces:

- [Microsoft.Extensions.Configuration.IConfiguration](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Configuration.IConfiguration): Represents a set of key/value application configuration properties.
- [Microsoft.Extensions.Configuration.IConfigurationRoot](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Configuration.IConfigurationRoot): Represents the root of an `IConfiguration` hierarchy.
- [Microsoft.Extensions.Configuration.IConfigurationSection](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Configuration.IConfigurationSection): Represents a section of application configuration values.

These abstractions are agnostic to their underlying configuration provider ([Microsoft.Extensions.Configuration.IConfigurationProvider](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Configuration.IConfigurationProvider)). In other words, you can use an `IConfiguration` instance to access any configuration value from multiple providers.

The binder processes configuration values in several ways:

- It uses a single configuration value directly for a `string` or `object` target, or converts it to a common .NET type, such as a numeric type, an enumeration, or a nullable type. The binder converts a Base64-encoded string to a byte array.
- It binds hierarchical configuration to an object's properties or constructor parameters.
- It binds child configuration sections to arrays, collections, sets, and dictionaries.
- It uses the matching configuration section directly when the target type is [Microsoft.Extensions.Configuration.IConfigurationSection](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Configuration.IConfigurationSection).
- It converts a single configuration value to a custom type. The default binder uses a [System.ComponentModel.TypeConverter](https://learn.microsoft.com/search/?terms=System.ComponentModel.TypeConverter) when the custom type defines one. The source-generated binder doesn't support this conversion.

> **Note:**
> The binder has a few limitations:
>
> - Properties are ignored if they have private setters or their type can't be converted.
> - Properties without corresponding configuration keys are ignored.

### Binding hierarchies

Configuration values can contain hierarchical data. Hierarchical objects are represented with the use of the `:` delimiter in the configuration keys. To access a configuration value, use the `:` character to delimit a hierarchy. For example, consider the following configuration values:

```json
{
  "Parent": {
    "FavoriteNumber": 7,
    "Child": {
      "Name": "Example",
      "GrandChild": {
        "Age": 3
      }
    }
  }
}
```

The following table represents example keys and their corresponding values for the preceding example JSON:

| Key | Value |
| --- | --- |
| `"Parent:FavoriteNumber"` | `7` |
| `"Parent:Child:Name"` | `"Example"` |
| `"Parent:Child:GrandChild:Age"` | `3` |

### Advanced binding scenarios

The configuration binder has specific behaviors and limitations when working with certain types. This section includes the following subsections:

- [Bind to dictionaries](#bind-to-dictionaries)
- [Dictionary keys with colons](#dictionary-keys-with-colons)
- [Bind to IReadOnly* types](#bind-to-ireadonly-types)
- [Exclude properties from binding](#exclude-properties-from-binding)
- [Bind with parameterized constructors](#bind-with-parameterized-constructors)

#### Bind to dictionaries

When you bind configuration to a [System.Collections.Generic.Dictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Generic.Dictionary%602) where the value is a mutable collection type (like arrays or lists), repeated binds to the same key extend the collection values instead of replacing them.

The following example demonstrates this behavior:

[language="csharp" source="snippets/configuration/binding-scenarios/DictionaryBinding/Program.cs" id="DictionaryWithCollectionValues"::: (complete source file; reference: snippets/configuration/binding-scenarios/DictionaryBinding/Program.cs)](../../../_code/docs/core/extensions/snippets/configuration/binding-scenarios/DictionaryBinding/Program.cs.md)

For more information, see [Binding config to dictionary extends values](../compatibility/extensions/7.0/config-bind-dictionary.md).

#### Dictionary keys with colons

The colon (`:`) character is reserved as a hierarchy delimiter in configuration keys. This means you can't use colons in dictionary keys when binding configuration. If your keys contain colons (such as URLs or other formatted identifiers), the configuration system interprets them as hierarchy paths rather than literal characters. Consider the following workarounds:

- Use alternative delimiter characters (such as double underscores `__`) in your configuration keys and transform them programmatically if needed.
- Manually deserialize the configuration as raw JSON using [System.Text.Json](https://learn.microsoft.com/search/?terms=System.Text.Json) or a similar library, which supports colons in keys.
- Create a custom mapping layer that translates safe keys to your desired keys with colons.

#### Bind to IReadOnly\* types

The configuration binder doesn't support binding directly to `IReadOnlyList<T>`, `IReadOnlyDictionary<TKey, TValue>`, or other read-only collection interfaces. These interfaces lack the mechanisms the binder needs to populate the collections.

To work with read-only collections, use mutable types for the properties that the binder populates, then expose them as read-only interfaces for consumers:

[language="csharp" source="snippets/configuration/binding-scenarios/DictionaryBinding/Program.cs" id="IReadOnlyCollections"::: (complete source file; reference: snippets/configuration/binding-scenarios/DictionaryBinding/Program.cs)](../../../_code/docs/core/extensions/snippets/configuration/binding-scenarios/DictionaryBinding/Program.cs.md)

The configuration class implementation:

[language="csharp" source="snippets/configuration/binding-scenarios/DictionaryBinding/Program.cs" id="SettingsWithReadOnly"::: (complete source file; reference: snippets/configuration/binding-scenarios/DictionaryBinding/Program.cs)](../../../_code/docs/core/extensions/snippets/configuration/binding-scenarios/DictionaryBinding/Program.cs.md)

This approach allows the binder to populate the mutable `List<string>` while presenting an immutable interface to consumers through `IReadOnlyList<string>`.

#### Exclude properties from binding

If you don't want the configuration binder to populate a property, apply [Microsoft.Extensions.Configuration.ConfigurationIgnoreAttribute](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Configuration.ConfigurationIgnoreAttribute) to it (available starting in .NET 11).

[language="csharp" source="snippets/configuration/binding-scenarios/ConfigurationIgnore/Program.cs" id="AppOptions"::: (complete source file; reference: snippets/configuration/binding-scenarios/ConfigurationIgnore/Program.cs)](../../../_code/docs/core/extensions/snippets/configuration/binding-scenarios/ConfigurationIgnore/Program.cs.md)

If configuration contains values for both `Endpoint` and `RuntimeValue`, the binder updates `Endpoint` and leaves `RuntimeValue` at its existing value.

#### Bind with parameterized constructors

Starting with .NET 7, the configuration binder supports binding to types with a single public parameterized constructor. This enables immutable types and records to be populated directly from configuration:

[language="csharp" source="snippets/configuration/binding-scenarios/DictionaryBinding/Program.cs" id="ParameterizedConstructor"::: (complete source file; reference: snippets/configuration/binding-scenarios/DictionaryBinding/Program.cs)](../../../_code/docs/core/extensions/snippets/configuration/binding-scenarios/DictionaryBinding/Program.cs.md)

The immutable settings class:

[language="csharp" source="snippets/configuration/binding-scenarios/DictionaryBinding/Program.cs" id="AppSettings"::: (complete source file; reference: snippets/configuration/binding-scenarios/DictionaryBinding/Program.cs)](../../../_code/docs/core/extensions/snippets/configuration/binding-scenarios/DictionaryBinding/Program.cs.md)

> **Important:**
> The binder only supports types with a single public parameterized constructor. If a type has multiple public parameterized constructors, the binder cannot determine which one to use and binding will fail. Use either a single parameterized constructor or a parameterless constructor with property setters.

## Basic example

To access configuration values in their basic form, without the assistance of the _generic host_ approach, use the [Microsoft.Extensions.Configuration.ConfigurationBuilder](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Configuration.ConfigurationBuilder) type directly.

> **Tip:**
> The [System.Configuration.ConfigurationBuilder](https://learn.microsoft.com/search/?terms=System.Configuration.ConfigurationBuilder) type is different to the [Microsoft.Extensions.Configuration.ConfigurationBuilder](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Configuration.ConfigurationBuilder) type. All of this content is specific to the `Microsoft.Extensions.*` NuGet packages and namespaces.

Consider the following C# project:

[language="xml" source="snippets/configuration/console-raw/console-raw.csproj" highlight="17-19"::: (complete source file; reference: snippets/configuration/console-raw/console-raw.csproj)](../../../_code/docs/core/extensions/snippets/configuration/console-raw/console-raw.csproj.md)

The preceding project file references several configuration NuGet packages:

- [Microsoft.Extensions.Configuration.Binder](https://www.nuget.org/packages/Microsoft.Extensions.Configuration.Binder): Functionality to bind an object to data in configuration providers for `Microsoft.Extensions.Configuration`.
- [Microsoft.Extensions.Configuration.Json](https://www.nuget.org/packages/Microsoft.Extensions.Configuration.Json): JSON configuration provider implementation for `Microsoft.Extensions.Configuration`.
- [Microsoft.Extensions.Configuration.EnvironmentVariables](https://www.nuget.org/packages/Microsoft.Extensions.Configuration.EnvironmentVariables): Environment variables configuration provider implementation for `Microsoft.Extensions.Configuration`.

Consider an example _appsettings.json_ file:

[language="json" source="snippets/configuration/console-raw/appsettings.json"::: (complete source file; reference: snippets/configuration/console-raw/appsettings.json)](../../../_code/docs/core/extensions/snippets/configuration/console-raw/appsettings.json.md)

Now, given this JSON file, here's an example consumption pattern using the configuration builder directly:

[source="snippets/configuration/console-raw/Program.cs" highlight="4-7,10"::: (complete source file; reference: snippets/configuration/console-raw/Program.cs)](../../../_code/docs/core/extensions/snippets/configuration/console-raw/Program.cs.md)

The preceding C# code:

- Instantiates a [Microsoft.Extensions.Configuration.ConfigurationBuilder](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Configuration.ConfigurationBuilder).
- Adds the `"appsettings.json"` file to be recognized by the JSON configuration provider.
- Adds environment variables as being recognized by the Environment Variable configuration provider.
- Gets the required `"Settings"` section and the corresponding `Settings` instance by using the `config` instance.

The `Settings` object is shaped as follows:

[source="snippets/configuration/console-raw/Settings.cs"::: (complete source file; reference: snippets/configuration/console-raw/Settings.cs)](../../../_code/docs/core/extensions/snippets/configuration/console-raw/Settings.cs.md)

[source="snippets/configuration/console-raw/NestedSettings.cs"::: (complete source file; reference: snippets/configuration/console-raw/NestedSettings.cs)](../../../_code/docs/core/extensions/snippets/configuration/console-raw/NestedSettings.cs.md)

## Basic example with hosting

To access the `IConfiguration` value, you can rely again on the [`Microsoft.Extensions.Hosting`](https://www.nuget.org/packages/Microsoft.Extensions.Hosting) NuGet package. Create a new console application, and paste the following project file contents into it:

[language="xml" source="snippets/configuration/console-basic/console-basic.csproj" highlight="4,11-13,17"::: (complete source file; reference: snippets/configuration/console-basic/console-basic.csproj)](../../../_code/docs/core/extensions/snippets/configuration/console-basic/console-basic.csproj.md)

The preceding project file defines that:

- The application is an executable.
- An _appsettings.json_ file is to be copied to the output directory when the project is compiled.
- The `Microsoft.Extensions.Hosting` NuGet package reference is added.

Add the _appsettings.json_ file at the root of the project with the following contents:

[language="json" source="snippets/configuration/console-basic/appsettings.json"::: (complete source file; reference: snippets/configuration/console-basic/appsettings.json)](../../../_code/docs/core/extensions/snippets/configuration/console-basic/appsettings.json.md)

Replace the contents of the _Program.cs_ file with the following C# code:

[source="snippets/configuration/console-basic/Program.cs" highlight="5,8,11-13,16-18"::: (complete source file; reference: snippets/configuration/console-basic/Program.cs)](../../../_code/docs/core/extensions/snippets/configuration/console-basic/Program.cs.md)

When you run this application, the `Host.CreateApplicationBuilder` defines the behavior to discover the JSON configuration and expose it through the `IConfiguration` instance. From the `host` instance, you can ask the service provider for the `IConfiguration` instance and then ask it for values.

> **Tip:**
> Using the raw `IConfiguration` instance in this way, while convenient, doesn't scale very well. When applications grow in complexity, and their corresponding configurations become more complex, we recommend that you use the [_options pattern_](options.md) as an alternative.

## Basic example with hosting and using the indexer API

Consider the same _appsettings.json_ file contents from the previous example:

[language="json" source="snippets/configuration/console-indexer/appsettings.json"::: (complete source file; reference: snippets/configuration/console-indexer/appsettings.json)](../../../_code/docs/core/extensions/snippets/configuration/console-indexer/appsettings.json.md)

Replace the contents of the _Program.cs_ file with the following C# code:

[source="snippets/configuration/console-indexer/Program.cs" highlight="11-15,17-22"::: (complete source file; reference: snippets/configuration/console-indexer/Program.cs)](../../../_code/docs/core/extensions/snippets/configuration/console-indexer/Program.cs.md)

The values are accessed using the indexer API where each key is a string, and the value is a string. Configuration supports properties, objects, arrays, and dictionaries.

## Configuration providers

The following table shows the configuration providers available to .NET Core apps.

| Configuration provider | Provides configuration from |
| --- | --- |
| [Azure App Configuration](https://learn.microsoft.com/azure/azure-app-configuration/quickstart-aspnet-core-app) | Azure App Configuration |
| [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/tutorial-net-virtual-machine) | Azure Key Vault |
| [Command-line](configuration-providers.md#command-line-configuration-provider) | Command-line parameters |
| [Custom](custom-configuration-provider.md) | Custom source |
| [Environment variables](configuration-providers.md#environment-variable-configuration-provider) | Environment variables |
| [File](configuration-providers.md#file-configuration-provider) | JSON, XML, and INI files |
| [Key-per-file](configuration-providers.md#key-per-file-configuration-provider) | Directory files |
| [Memory](configuration-providers.md#memory-configuration-provider) | In-memory collections |
| [App secrets (secret manager)](https://learn.microsoft.com/aspnet/core/security/app-secrets) | File in the user profile directory |

> **Tip:**
> The order in which configuration providers are added matters. When multiple configuration providers are used and more than one provider specifies the same key, the last one added is used.

For more information on various configuration providers, see [Configuration providers in .NET](configuration-providers.md).

## See also

- [Configuration providers in .NET](configuration-providers.md)
- [Implement a custom configuration provider](custom-configuration-provider.md)
- Configuration bugs should be created in the [github.com/dotnet/runtime](https://github.com/dotnet/runtime/issues) repo
- [Configuration in ASP.NET Core](https://learn.microsoft.com/aspnet/core/fundamentals/configuration)
