# Source code: samples/core/Modeling/ConcurrencyTokens/DataAnnotations/Timestamp.cs

Complete source file; linked examples may select a region or line range.

```
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace EFModeling.ConcurrencyTokens.DataAnnotations.Timestamp;

internal class MyContext : DbContext
{
    public DbSet<Blog> Blogs { get; set; }
}

#region Timestamp
public class Blog
{
    public int BlogId { get; set; }

    public string Url { get; set; }

    [Timestamp]
    public byte[] Timestamp { get; set; }
}
#endregion
```
