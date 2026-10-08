# Source code: samples/core/Modeling/DataSeeding/Post.cs

Complete source file; linked examples may select a region or line range.

```
namespace EFModeling.DataSeeding;

public class Post
{
    public int PostId { get; set; }
    public string Content { get; set; }
    public string Title { get; set; }
    public int BlogId { get; set; }
    public Blog Blog { get; set; }
}

```
