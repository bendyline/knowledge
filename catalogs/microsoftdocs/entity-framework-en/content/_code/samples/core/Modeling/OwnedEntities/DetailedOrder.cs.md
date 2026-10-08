# Source code: samples/core/Modeling/OwnedEntities/DetailedOrder.cs

Complete source file; linked examples may select a region or line range.

```
namespace EFModeling.OwnedEntities;

#region DetailedOrder
public class DetailedOrder
{
    public int Id { get; set; }
    public OrderDetails OrderDetails { get; set; }
    public OrderStatus Status { get; set; }
}
#endregion
```
