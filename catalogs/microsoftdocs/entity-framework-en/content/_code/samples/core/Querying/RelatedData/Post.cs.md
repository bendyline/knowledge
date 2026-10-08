# Source code: samples/core/Querying/RelatedData/Post.cs

Complete source file; linked examples may select a region or line range.

```
using System.Collections.Generic;

namespace EFQuerying.RelatedData;

public class Post
{
    public int PostId { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }
    public int Rating { get; set; }

    public int BlogId { get; set; }
    public Blog Blog { get; set; }

    public int AuthorId { get; set; }
    public Person Author { get; set; }

    public List<PostTag> Tags { get; set; }
}
```
