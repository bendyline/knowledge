# Source code: samples/core/Saving/Disconnected/Post.cs

Complete source file; linked examples may select a region or line range.

```
namespace EFSaving.Disconnected;

public class Post : EntityBase
{
    public int PostId { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }

    public int BlogId { get; set; }
    public Blog Blog { get; set; }
}
```
