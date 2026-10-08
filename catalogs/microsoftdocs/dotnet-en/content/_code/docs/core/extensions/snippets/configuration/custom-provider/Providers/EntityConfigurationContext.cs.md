# Source code: docs/core/extensions/snippets/configuration/custom-provider/Providers/EntityConfigurationContext.cs

Complete source file; linked examples may select a region or line range.

```
using CustomProvider.Example.Models;
using Microsoft.EntityFrameworkCore;

namespace CustomProvider.Example.Providers;

public sealed class EntityConfigurationContext(string? connectionString) : DbContext
{
    public DbSet<Settings> Settings => Set<Settings>();

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        _ = connectionString switch
        {
            { Length: > 0 } => optionsBuilder.UseSqlServer(connectionString),
            _ => optionsBuilder.UseInMemoryDatabase("InMemoryDatabase")
        };
    }
}

```
