# Source code: samples/core/Modeling/OwnedEntities/StreetAddress.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.EntityFrameworkCore;

namespace EFModeling.OwnedEntities;

#region StreetAddress
[Owned]
public class StreetAddress
{
    public string Street { get; set; }
    public string City { get; set; }
}
#endregion
```
