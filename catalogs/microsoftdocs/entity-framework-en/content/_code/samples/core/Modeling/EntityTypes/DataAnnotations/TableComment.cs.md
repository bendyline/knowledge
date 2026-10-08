# Source code: samples/core/Modeling/EntityTypes/DataAnnotations/TableComment.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.EntityFrameworkCore;

namespace EFModeling.EntityTypes.DataAnnotations.TableComment;

internal class MyContext : DbContext
{
    public DbSet<Blog> Blogs { get; set; }
}

#region TableComment
[Comment("Blogs managed on the website")]
public class Blog
{
    public int BlogId { get; set; }
    public string Url { get; set; }
}
#endregion
```
