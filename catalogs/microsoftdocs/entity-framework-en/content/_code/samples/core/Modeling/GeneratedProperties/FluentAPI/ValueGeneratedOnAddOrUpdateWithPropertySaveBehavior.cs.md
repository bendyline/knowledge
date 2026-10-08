# Source code: samples/core/Modeling/GeneratedProperties/FluentAPI/ValueGeneratedOnAddOrUpdateWithPropertySaveBehavior.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace EFModeling.GeneratedProperties.FluentAPI.ValueGeneratedOnAddOrUpdateWithPropertySaveBehavior;

internal class MyContext : DbContext
{
    public DbSet<Blog> Blogs { get; set; }

    #region ValueGeneratedOnAddOrUpdateWithPropertySaveBehavior
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Blog>().Property(b => b.LastUpdated)
            .ValueGeneratedOnAddOrUpdate()
            .Metadata.SetAfterSaveBehavior(PropertySaveBehavior.Save);
    }
    #endregion
}

public class Blog
{
    public int BlogId { get; set; }
    public string Url { get; set; }
    public DateTime LastUpdated { get; set; }
}
```
