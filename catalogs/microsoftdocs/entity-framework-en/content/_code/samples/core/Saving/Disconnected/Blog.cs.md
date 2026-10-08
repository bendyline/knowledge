# Source code: samples/core/Saving/Disconnected/Blog.cs

Complete source file; linked examples may select a region or line range.

```
using System.Collections.Generic;

namespace EFSaving.Disconnected;

public class Blog : EntityBase
{
    public int BlogId { get; set; }
    public string Url { get; set; }

    public List<Post> Posts { get; set; }
}
```
