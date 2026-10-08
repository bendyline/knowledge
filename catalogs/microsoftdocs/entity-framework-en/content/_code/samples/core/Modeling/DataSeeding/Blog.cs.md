# Source code: samples/core/Modeling/DataSeeding/Blog.cs

Complete source file; linked examples may select a region or line range.

```
using System.Collections.Generic;

namespace EFModeling.DataSeeding;

public class Blog
{
    public int BlogId { get; set; }
    public string Url { get; set; }

    public virtual ICollection<Post> Posts { get; set; }
}

```
