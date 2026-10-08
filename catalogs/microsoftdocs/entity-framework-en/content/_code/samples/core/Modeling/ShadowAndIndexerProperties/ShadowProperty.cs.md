# Source code: samples/core/Modeling/ShadowAndIndexerProperties/ShadowProperty.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using Microsoft.EntityFrameworkCore;

namespace EFModeling.ShadowAndIndexerProperties.ShadowProperty;

#region ShadowProperty
internal class MyContext : DbContext
{
    public DbSet<Blog> Blogs { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Blog>()
            .Property<DateTime>("LastUpdated");
    }
}

public class Blog
{
    public int BlogId { get; set; }
    public string Url { get; set; }
}
#endregion
```
