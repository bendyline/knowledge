# Source code: samples/core/Modeling/EntityTypes/DataAnnotations/TableNameAndSchema.cs

Complete source file; linked examples may select a region or line range.

```
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace EFModeling.EntityTypes.DataAnnotations.TableNameAndSchema;

internal class MyContext : DbContext
{
    public DbSet<Blog> Blogs { get; set; }
}

#region TableNameAndSchema
[Table("blogs", Schema = "blogging")]
public class Blog
{
    public int BlogId { get; set; }
    public string Url { get; set; }
}
#endregion
```
