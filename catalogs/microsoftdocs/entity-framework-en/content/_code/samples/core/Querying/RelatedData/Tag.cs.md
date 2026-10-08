# Source code: samples/core/Querying/RelatedData/Tag.cs

Complete source file; linked examples may select a region or line range.

```
using System.Collections.Generic;

namespace EFQuerying.RelatedData;

public class Tag
{
    public string TagId { get; set; }

    public List<PostTag> Posts { get; set; }
}
```
