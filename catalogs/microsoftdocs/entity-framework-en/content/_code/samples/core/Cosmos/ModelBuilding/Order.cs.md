# Source code: samples/core/Cosmos/ModelBuilding/Order.cs

Complete source file; linked examples may select a region or line range.

```
namespace Cosmos.ModelBuilding;

#region Order
public class Order
{
    public int Id { get; set; }
    public int? TrackingNumber { get; set; }
    public string PartitionKey { get; set; }
    public StreetAddress ShippingAddress { get; set; }
}
#endregion
```
