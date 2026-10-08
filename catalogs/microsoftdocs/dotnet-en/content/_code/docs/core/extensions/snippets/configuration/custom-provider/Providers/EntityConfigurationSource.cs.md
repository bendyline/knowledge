# Source code: docs/core/extensions/snippets/configuration/custom-provider/Providers/EntityConfigurationSource.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.Extensions.Configuration;

namespace CustomProvider.Example.Providers;

public sealed class EntityConfigurationSource(
    string? connectionString) : IConfigurationSource
{
    public IConfigurationProvider Build(IConfigurationBuilder builder) =>
        new EntityConfigurationProvider(connectionString);
}

```
