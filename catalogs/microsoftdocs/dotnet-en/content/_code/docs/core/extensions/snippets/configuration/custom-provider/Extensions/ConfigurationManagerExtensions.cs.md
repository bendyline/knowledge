# Source code: docs/core/extensions/snippets/configuration/custom-provider/Extensions/ConfigurationManagerExtensions.cs

Complete source file; linked examples may select a region or line range.

```
using CustomProvider.Example.Providers;

namespace Microsoft.Extensions.Configuration;

public static class ConfigurationManagerExtensions
{
    public static ConfigurationManager AddEntityConfiguration(
        this ConfigurationManager manager)
    {
        var connectionString = manager.GetConnectionString("WidgetConnectionString");

        IConfigurationBuilder configBuilder = manager;
        configBuilder.Add(new EntityConfigurationSource(connectionString));

        return manager;
    }
}

```
