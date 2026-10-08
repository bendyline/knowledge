# Source code: samples/core/Querying/ComplexQuery/Tag.cs

Complete source file; linked examples may select a region or line range.

```
using System.Collections.Generic;

namespace EFQuerying.ComplexQuery;

public class Tag
{
    public string TagId { get; set; }

    public List<PostTag> Posts { get; set; }
}
```
