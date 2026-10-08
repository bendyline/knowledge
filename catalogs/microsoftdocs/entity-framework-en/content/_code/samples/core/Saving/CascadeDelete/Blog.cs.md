# Source code: samples/core/Saving/CascadeDelete/Blog.cs

Complete source file; linked examples may select a region or line range.

```
using System.Collections.Generic;

namespace EFSaving.CascadeDelete;

public class Blog
{
    public int BlogId { get; set; }
    public string Url { get; set; }

    public List<Post> Posts { get; set; } = new List<Post>();
}
```
