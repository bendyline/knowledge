# Source code: samples/core/Modeling/EntityProperties/FluentAPI/IgnoreProperty.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using Microsoft.EntityFrameworkCore;

namespace EFModeling.EntityProperties.FluentAPI.IgnoreProperty;

internal class MyContext : DbContext
{
    public DbSet<Blog> Blogs { get; set; }

    #region IgnoreProperty
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Blog>()
            .Ignore(b => b.LoadedFromDatabase);
    }
    #endregion
}

public class Blog
{
    public int BlogId { get; set; }
    public string Url { get; set; }

    public DateTime LoadedFromDatabase { get; set; }
}
```
