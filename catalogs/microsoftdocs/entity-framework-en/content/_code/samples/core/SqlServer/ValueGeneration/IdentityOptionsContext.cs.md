# Source code: samples/core/SqlServer/ValueGeneration/IdentityOptionsContext.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.EntityFrameworkCore;

namespace SqlServer.ValueGeneration;

public class IdentityOptionsContext : DbContext
{
    public DbSet<Blog> Blogs { get; set; }

    #region IdentityOptions
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Blog>()
            .Property(b => b.BlogId)
            .UseIdentityColumn(seed: 10, increment: 10);
    }
    #endregion
}
```
