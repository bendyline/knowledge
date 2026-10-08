# Source code: samples/core/Querying/ComplexQuery/PostTag.cs

Complete source file; linked examples may select a region or line range.

```
namespace EFQuerying.ComplexQuery;

public class PostTag
{
    public int PostTagId { get; set; }

    public int PostId { get; set; }
    public Post Post { get; set; }

    public string TagId { get; set; }
    public Tag Tag { get; set; }
}
```
