# Source code: samples/core/Modeling/KeylessEntityTypes/DataAnnotations/Keyless.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.EntityFrameworkCore;

namespace EFModeling.KeylessEntityTypes.DataAnnotations.Keyless;

internal class BlogsContext : DbContext
{
    public DbSet<BlogPostsCount> BlogPostCounts { get; set; }
}

#region Keyless
[Keyless]
public class BlogPostsCount
{
    public string BlogName { get; set; }
    public int PostCount { get; set; }
}
#endregion
```
