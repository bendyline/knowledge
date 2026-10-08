# Source code: samples/core/Modeling/IndexesAndConstraints/DataAnnotations/Index.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.EntityFrameworkCore;

namespace EFModeling.IndexesAndConstraints.DataAnnotations.Index;

internal class MyContext : DbContext
{
    public DbSet<Blog> Blogs { get; set; }
}

#region Index
[Index(nameof(Url))]
public class Blog
{
    public int BlogId { get; set; }
    public string Url { get; set; }
}
#endregion
```
