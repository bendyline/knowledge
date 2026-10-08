# Source code: samples/core/Modeling/Inheritance/FluentAPI/DiscriminatorMappingIncomplete.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.EntityFrameworkCore;

namespace EFModeling.Inheritance.FluentAPI.DiscriminatorMappingIncomplete;

public class MyContext : DbContext
{
    public DbSet<Blog> Blogs { get; set; }

    #region DiscriminatorMappingIncomplete
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Blog>()
            .HasDiscriminator()
            .IsComplete(false);
    }
    #endregion
}

public class Blog
{
    public int BlogId { get; set; }
    public string Url { get; set; }
}

public class RssBlog : Blog
{
    public string RssUrl { get; set; }
}
```
