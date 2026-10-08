# Source code: samples/core/Modeling/IndexesAndConstraints/FluentAPI/Index.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.EntityFrameworkCore;

namespace EFModeling.IndexesAndConstraints.FluentAPI.Index;

internal class MyContext : DbContext
{
    public DbSet<Blog> Blogs { get; set; }

    #region Index
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Blog>()
            .HasIndex(b => b.Url);
    }
    #endregion
}

public class Blog
{
    public int BlogId { get; set; }
    public string Url { get; set; }
}
```
