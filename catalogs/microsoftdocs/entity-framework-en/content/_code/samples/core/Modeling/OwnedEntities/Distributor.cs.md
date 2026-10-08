# Source code: samples/core/Modeling/OwnedEntities/Distributor.cs

Complete source file; linked examples may select a region or line range.

```
using System.Collections.Generic;

namespace EFModeling.OwnedEntities;

#region Distributor
public class Distributor
{
    public int Id { get; set; }
    public ICollection<StreetAddress> ShippingCenters { get; set; }
}
#endregion
```
