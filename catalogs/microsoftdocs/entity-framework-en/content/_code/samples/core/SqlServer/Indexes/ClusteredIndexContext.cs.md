# Source code: samples/core/SqlServer/Indexes/ClusteredIndexContext.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.EntityFrameworkCore;

namespace SqlServer.Indexes;

public class ClusteredIndexContext : DbContext
{
    public DbSet<Blog> Blogs { get; set; }

    #region ClusteredIndex
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Blog>().HasIndex(b => b.PublishedOn).IsClustered();
    }
    #endregion
}
```
