# Source code: samples/core/Modeling/EntityProperties/DataAnnotations/IgnoreProperty.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace EFModeling.EntityProperties.DataAnnotations.IgnoreProperty;

internal class MyContext : DbContext
{
    public DbSet<Blog> Blogs { get; set; }
}

#region IgnoreProperty
public class Blog
{
    public int BlogId { get; set; }
    public string Url { get; set; }

    [NotMapped]
    public DateTime LoadedFromDatabase { get; set; }
}
#endregion
```
