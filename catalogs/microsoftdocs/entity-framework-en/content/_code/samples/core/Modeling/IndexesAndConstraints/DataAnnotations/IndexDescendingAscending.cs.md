# Source code: samples/core/Modeling/IndexesAndConstraints/DataAnnotations/IndexDescendingAscending.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.EntityFrameworkCore;

namespace EFModeling.IndexesAndConstraints.DataAnnotations.IndexDescendingAscending;

internal class MyContext : DbContext
{
    public DbSet<Blog> Blogs { get; set; }
}

#region IndexDescendingAscending
[Index(nameof(Url), nameof(Rating), IsDescending = new[] { false, true })]
public class Blog
{
    public int BlogId { get; set; }
    public string Url { get; set; }
    public int Rating { get; set; }
}
#endregion

```
