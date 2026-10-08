# Source code: samples/core/Saving/Basics/Blog.cs

Complete source file; linked examples may select a region or line range.

```
using System.Collections.Generic;

namespace EFSaving.Basics;

public class Blog
{
    public int BlogId { get; set; }
    public string Url { get; set; }

    public List<Post> Posts { get; set; }
}
```
