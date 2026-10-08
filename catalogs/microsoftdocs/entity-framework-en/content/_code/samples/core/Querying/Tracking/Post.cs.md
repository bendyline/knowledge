# Source code: samples/core/Querying/Tracking/Post.cs

Complete source file; linked examples may select a region or line range.

```
namespace EFQuerying.Tracking;

public class Post
{
    public int PostId { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }
    public int Rating { get; set; }

    public int BlogId { get; set; }
    public Blog Blog { get; set; }
}
```
