# Source code: samples/core/SqlServer/Columns/SparseColumnContext.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.EntityFrameworkCore;

namespace SqlServer.Columns;

public class SparseColumnContext : DbContext
{
    public DbSet<Blog> Blogs { get; set; }
    public DbSet<RareBlog> RareBlogs { get; set; }

    #region SparseColumn
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<RareBlog>()
            .Property(b => b.RareProperty)
            .IsSparse();
    }
    #endregion
}
```
