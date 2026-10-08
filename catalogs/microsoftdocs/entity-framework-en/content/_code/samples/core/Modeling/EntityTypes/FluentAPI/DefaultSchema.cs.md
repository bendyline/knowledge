# Source code: samples/core/Modeling/EntityTypes/FluentAPI/DefaultSchema.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.EntityFrameworkCore;

namespace EFModeling.EntityTypes.FluentAPI.DefaultSchema;

internal class MyContext : DbContext
{
    public DbSet<Blog> Blogs { get; set; }

    #region DefaultSchema
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasDefaultSchema("blogging");
    }
    #endregion
}

public class Blog
{
    public int BlogId { get; set; }
    public string Url { get; set; }
}
```
