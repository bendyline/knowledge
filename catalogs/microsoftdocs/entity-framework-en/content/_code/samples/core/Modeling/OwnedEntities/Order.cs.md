# Source code: samples/core/Modeling/OwnedEntities/Order.cs

Complete source file; linked examples may select a region or line range.

```
namespace EFModeling.OwnedEntities;

#region Order
public class Order
{
    public int Id { get; set; }
    public StreetAddress ShippingAddress { get; set; }
}
#endregion
```
