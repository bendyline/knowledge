# Source code: samples/core/SqlServer/Indexes/IndexOnlineContext.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.EntityFrameworkCore;

namespace SqlServer.Indexes;

public class IndexOnlineContext : DbContext
{
    public DbSet<Blog> Blogs { get; set; }

    #region IndexOnline
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Blog>().HasIndex(b => b.PublishedOn).IsCreatedOnline();
    }
    #endregion
}
```
