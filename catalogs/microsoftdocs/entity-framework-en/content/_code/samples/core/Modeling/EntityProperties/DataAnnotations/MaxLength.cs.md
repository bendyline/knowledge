# Source code: samples/core/Modeling/EntityProperties/DataAnnotations/MaxLength.cs

Complete source file; linked examples may select a region or line range.

```
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace EFModeling.EntityProperties.DataAnnotations.MaxLength;

internal class MyContext : DbContext
{
    public DbSet<Blog> Blogs { get; set; }
}

#region MaxLength
public class Blog
{
    public int BlogId { get; set; }

    [MaxLength(500)]
    public string Url { get; set; }
}
#endregion
```
